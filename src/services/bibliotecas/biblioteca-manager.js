// Biblioteca Manager - Orquestador Principal
// Gestiona OpenLibrary + Gutenberg de forma unificada

import openLibraryAPI from './openlibrary/openlibrary-api.js';
import openLibraryAdapter from './openlibrary/openlibrary-adapter.js';
import gutenbergScraper from './gutenberg/gutenberg-scraper.js';
import gutenbergAdapter from './gutenberg/gutenberg-adapter.js';
import { supabase } from '../../supabaseClient.js';

/**
 * Gestor centralizado de bibliotecas digitales
 * Coordina OpenLibrary y Gutenberg con sistema de caché
 */
class BibliotecaManager {
    constructor() {
        this.openLibrary = openLibraryAPI;
        this.gutenberg = gutenbergScraper;
        this.olAdapter = openLibraryAdapter;
        this.gutAdapter = gutenbergAdapter;

        // Configuración de caché
        this.cacheEnabled = true;
        this.cacheDuration = 7 * 24 * 60 * 60 * 1000; // 7 días en ms

        // Prioridad de fuentes
        this.priority = ['gutenberg', 'openlibrary']; // Gutenberg primero (dominio público)
    }

    /**
     * Buscar libros y recursos en todas las bibliotecas
     * @param {Object} params - Parámetros de búsqueda
     * @param {string} params.query - Término de búsqueda
     * @param {string} params.asignatura - Asignatura
     * @param {string} params.nivel - Nivel educativo
     * @param {string} params.tema - Tema específico
     * @param {number} params.limit - Número de resultados
     * @param {Array} params.fuentes - Fuentes a usar ['openlibrary', 'gutenberg']
     * @returns {Promise<Array>} Resultados unificados
     */
    async search(params = {}) {
        try {
            const {
                query = '',
                asignatura = '',
                nivel = '',
                tema = '',
                limit = 10,
                fuentes = ['gutenberg', 'openlibrary']
            } = params;

            console.log('🔍 BibliotecaManager búsqueda:', { query, asignatura, nivel, tema });

            // Verificar caché primero
            if (this.cacheEnabled) {
                const cached = await this.getFromCache({ query, asignatura, nivel, tema });
                if (cached && cached.length > 0) {
                    console.log('✅ Resultados desde caché');
                    return cached.slice(0, limit);
                }
            }

            const resultados = [];

            // Buscar en cada fuente según prioridad
            for (const fuente of this.priority) {
                if (!fuentes.includes(fuente)) continue;

                try {
                    let libros = [];

                    if (fuente === 'gutenberg') {
                        libros = await this.searchGutenberg({ query, asignatura, nivel, limit });
                    } else if (fuente === 'openlibrary') {
                        libros = await this.searchOpenLibrary({ query, asignatura, nivel, tema, limit });
                    }

                    resultados.push(...libros);

                    // Si ya tenemos suficientes resultados, parar
                    if (resultados.length >= limit) break;

                } catch (error) {
                    console.error(`❌ Error buscando en ${fuente}:`, error);
                    // Continuar con siguiente fuente
                }
            }

            // Guardar en caché
            if (this.cacheEnabled && resultados.length > 0) {
                await this.saveToCache({ query, asignatura, nivel, tema }, resultados);
            }

            console.log(`✅ BibliotecaManager: ${resultados.length} resultados totales`);
            return resultados.slice(0, limit);

        } catch (error) {
            console.error('❌ Error en BibliotecaManager.search:', error);
            return [];
        }
    }

    /**
     * Buscar en Gutenberg
     */
    async searchGutenberg(params) {
        try {
            const { query, asignatura, nivel, limit } = params;

            let libros = [];

            // Si hay query específica, buscar
            if (query) {
                const results = await this.gutenberg.search({ query, limit });

                // Enriquecer con detalles
                const enriched = await Promise.all(
                    results.slice(0, 5).map(async (book) => {
                        try {
                            const details = await this.gutenberg.getBookDetails(book.gutenberg_id || book.id);
                            return { ...book, ...details };
                        } catch {
                            return book;
                        }
                    })
                );

                libros = enriched;
            } else {
                // Sin query, usar catálogo español
                libros = await this.gutenberg.getSpanishBooks(limit);
            }

            // Filtrar por nivel si se especifica
            if (nivel) {
                libros = libros.filter(libro => {
                    const nivelInferido = this.gutAdapter.inferEducationalLevel(libro);
                    return nivelInferido.some(n => n.includes(nivel) || nivel.includes(n));
                });
            }

            // Normalizar
            return this.gutAdapter.normalizeMany(libros);

        } catch (error) {
            console.error('Error en searchGutenberg:', error);
            return [];
        }
    }

    /**
     * Buscar en OpenLibrary
     */
    async searchOpenLibrary(params) {
        try {
            const { query, asignatura, nivel, tema, limit } = params;

            let data;

            if (tema) {
                // Buscar por tema/subject
                data = await this.openLibrary.searchBySubject(tema, { limit, language: 'spa' });
                const libros = data.works || [];
                return this.olAdapter.normalizeMany(libros);
            } else if (nivel && asignatura) {
                // Buscar por nivel educativo
                const libros = await this.openLibrary.getBooksForGradeLevel(nivel, asignatura, limit);
                return this.olAdapter.normalizeMany(libros);
            } else if (query) {
                // Búsqueda general
                data = await this.openLibrary.search({ q: query, limit });
                const libros = data.docs || [];
                return this.olAdapter.normalizeMany(libros);
            }

            return [];

        } catch (error) {
            console.error('Error en searchOpenLibrary:', error);
            return [];
        }
    }

    /**
     * Obtener libro específico con fragmento de texto
     * @param {Object} libro - Libro normalizado
     * @param {number} fragmentLength - Longitud del fragmento
     * @returns {Promise<Object>} Libro con fragmento
     */
    async getBookWithFragment(libro, fragmentLength = 800) {
        try {
            console.log(`📖 Obteniendo fragmento de "${libro.titulo}"...`);

            let fragmento = null;

            if (libro.fuente === 'gutenberg') {
                fragmento = await this.gutenberg.getTextFragment(libro.gutenberg_id, fragmentLength);
            } else if (libro.fuente === 'openlibrary' && libro.ia_id) {
                fragmento = await this.openLibrary.getTextFragment(libro.ia_id);
            }

            return {
                ...libro,
                fragmento: fragmento,
                tiene_fragmento: !!fragmento
            };

        } catch (error) {
            console.error('Error obteniendo fragmento:', error);
            return libro;
        }
    }

    /**
     * Crear ejercicio de comprensión lectora
     * @param {string} nivel - Nivel educativo
     * @param {string} asignatura - Asignatura (Lengua, etc.)
     * @param {string} tema - Tema opcional
     * @returns {Promise<Object|null>} Ejercicio completo
     */
    async createReadingExercise(nivel, asignatura, tema = null) {
        try {
            console.log(`📝 Creando ejercicio de comprensión para ${nivel}...`);

            // Buscar libros apropiados
            const libros = await this.search({
                asignatura,
                nivel,
                tema,
                limit: 5
            });

            if (libros.length === 0) {
                console.warn('⚠️ No se encontraron libros para este nivel/asignatura');
                return null;
            }

            // Seleccionar libro aleatorio
            const libroSeleccionado = libros[Math.floor(Math.random() * libros.length)];

            // Obtener fragmento
            const libroConFragmento = await this.getBookWithFragment(libroSeleccionado, 600);

            if (!libroConFragmento.fragmento) {
                console.warn(`⚠️ No se pudo obtener fragmento de "${libroSeleccionado.titulo}"`);
                return null;
            }

            // Crear ejercicio según la fuente
            let ejercicio;
            if (libroSeleccionado.fuente === 'gutenberg') {
                ejercicio = this.gutAdapter.createReadingExercise(
                    libroConFragmento,
                    libroConFragmento.fragmento
                );
            } else {
                ejercicio = this.olAdapter.createReadingExercise(
                    libroConFragmento,
                    libroConFragmento.fragmento
                );
            }

            console.log(`✅ Ejercicio creado: "${ejercicio.fuente.titulo}"`);
            return ejercicio;

        } catch (error) {
            console.error('❌ Error creando ejercicio:', error);
            return null;
        }
    }

    /**
     * Obtener recomendaciones de libros
     * @param {string} nivel - Nivel educativo
     * @param {string} asignatura - Asignatura
     * @param {number} limit - Número de recomendaciones
     * @returns {Promise<Array>} Libros recomendados
     */
    async getRecommendations(nivel, asignatura, limit = 10) {
        try {
            console.log(`💡 Generando recomendaciones para ${nivel} - ${asignatura}...`);

            const resultados = await this.search({
                asignatura,
                nivel,
                limit: limit * 2 // Buscar más para filtrar
            });

            // Filtrar solo los que tienen buena metadata
            const filtered = resultados.filter(libro => {
                return libro.titulo &&
                    libro.autor !== 'Autor desconocido' &&
                    libro.disponible_online;
            });

            // Priorizar libros curados
            filtered.sort((a, b) => {
                if (a.curated && !b.curated) return -1;
                if (!a.curated && b.curated) return 1;
                return 0;
            });

            return filtered.slice(0, limit);

        } catch (error) {
            console.error('Error obteniendo recomendaciones:', error);
            return [];
        }
    }

    /**
     * Verificar disponibilidad de una biblioteca
     * @param {string} fuente - 'openlibrary' o 'gutenberg'
     * @returns {Promise<boolean>} True si está disponible
     */
    async checkAvailability(fuente) {
        try {
            if (fuente === 'openlibrary') {
                const result = await this.openLibrary.search({ q: 'test', limit: 1 });
                return result.docs && result.docs.length > 0;
            } else if (fuente === 'gutenberg') {
                const available = await this.gutenberg.isAvailable('2000'); // Don Quijote
                return available;
            }
            return false;
        } catch {
            return false;
        }
    }

    // ==================== SISTEMA DE CACHÉ ====================

    /**
     * Obtener resultados desde caché de Supabase
     */
    async getFromCache(params) {
        try {
            const cacheKey = this.generateCacheKey(params);

            const { data, error } = await supabase
                .from('bibliotecas_cache')
                .select('contenido, cached_at')
                .eq('query_hash', cacheKey)
                .single();

            if (error || !data) return null;

            // Verificar si el caché ha expirado
            const cachedTime = new Date(data.cached_at).getTime();
            const now = Date.now();

            if (now - cachedTime > this.cacheDuration) {
                console.log('⏰ Caché expirado');
                return null;
            }

            return data.contenido;

        } catch (error) {
            console.error('Error obteniendo caché:', error);
            return null;
        }
    }

    /**
     * Guardar resultados en caché
     */
    async saveToCache(params, resultados) {
        try {
            const cacheKey = this.generateCacheKey(params);
            const expiresAt = new Date(Date.now() + this.cacheDuration);

            const { error } = await supabase
                .from('bibliotecas_cache')
                .upsert({
                    query_hash: cacheKey,
                    fuentes: ['openlibrary', 'gutenberg'],
                    tipo_recurso: 'libro',
                    query_params: params,
                    contenido: resultados,
                    cached_at: new Date().toISOString(),
                    expires_at: expiresAt.toISOString()
                });

            if (error) {
                console.error('Error guardando caché:', error);
            } else {
                console.log('💾 Resultados guardados en caché');
            }

        } catch (error) {
            console.error('Error en saveToCache:', error);
        }
    }

    /**
     * Generar clave única para caché
     */
    generateCacheKey(params) {
        const normalized = {
            query: params.query || '',
            asignatura: params.asignatura || '',
            nivel: params.nivel || '',
            tema: params.tema || ''
        };

        const str = JSON.stringify(normalized);

        // Hash simple (para producción, usar algo más robusto)
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        return `bibliotecas_${Math.abs(hash)}`;
    }

    /**
     * Limpiar caché expirado
     */
    async cleanExpiredCache() {
        try {
            const { error } = await supabase
                .from('bibliotecas_cache')
                .delete()
                .lt('expires_at', new Date().toISOString());

            if (error) {
                console.error('Error limpiando caché:', error);
            } else {
                console.log('🧹 Caché expirado limpiado');
            }
        } catch (error) {
            console.error('Error en cleanExpiredCache:', error);
        }
    }

    // ==================== ESTADÍSTICAS ====================

    /**
     * Obtener estadísticas de uso
     */
    async getStats() {
        try {
            const { data, error } = await supabase
                .from('bibliotecas_cache')
                .select('fuentes, tipo_recurso, cached_at');

            if (error || !data) {
                return {
                    total_cached: 0,
                    por_fuente: {},
                    mas_reciente: null
                };
            }

            const stats = {
                total_cached: data.length,
                por_fuente: {},
                mas_reciente: data[0]?.cached_at || null
            };

            // Contar por fuente
            data.forEach(item => {
                item.fuentes.forEach(fuente => {
                    stats.por_fuente[fuente] = (stats.por_fuente[fuente] || 0) + 1;
                });
            });

            return stats;

        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            return { total_cached: 0, por_fuente: {}, mas_reciente: null };
        }
    }
}

// Singleton
const bibliotecaManager = new BibliotecaManager();

export default bibliotecaManager;
export { BibliotecaManager };
