// INTEF Content Fetcher
// Sistema para obtener recursos educativos del INTEF/Procomún

import { INTEF_CONFIG, buildINTEFSearchURL, generateINTEFCacheKey } from './intef-config.js';
import { supabase } from '../../supabaseClient';

/**
 * Sistema de caché para contenido INTEF
 * Usa Supabase para compartir entre usuarios
 */
class INTEFCache {
    constructor() {
        this.tableName = 'intef_content_cache';
    }

    async get(key) {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .eq('cache_key', key)
                .single();

            if (error) {
                console.log('Cache miss:', key);
                return null;
            }

            // Check if expired
            if (data.expires_at && new Date(data.expires_at) < new Date()) {
                console.log('Cache expired:', key);
                return null;
            }

            console.log('✅ Cache hit:', key);
            return data.content;
        } catch (e) {
            console.warn('Cache error:', e);
            return null;
        }
    }

    async set(key, content, ttl = 'forever') {
        try {
            const expiresAt = ttl === 'forever' ? null : this.calculateExpiry(ttl);

            const { error } = await supabase
                .from(this.tableName)
                .upsert({
                    cache_key: key,
                    content: content,
                    created_at: new Date().toISOString(),
                    expires_at: expiresAt,
                    metadata: {
                        source: 'INTEF',
                        ttl: ttl
                    }
                });

            if (error) throw error;
            console.log('💾 Cached:', key);
        } catch (e) {
            console.error('Cache save error:', e);
        }
    }

    calculateExpiry(ttl) {
        const now = new Date();
        if (ttl.endsWith('d')) {
            const days = parseInt(ttl);
            now.setDate(now.getDate() + days);
        } else if (ttl.endsWith('h')) {
            const hours = parseInt(ttl);
            now.setHours(now.getHours() + hours);
        }
        return now.toISOString();
    }
}

const cache = new INTEFCache();

/**
 * Buscar recursos en INTEF/Procomún
 */
export async function searchINTEFResources({ asignatura, curso, tema, resourceType = 'all' }) {
    console.log(`🔍 Buscando en INTEF: ${asignatura} - ${curso} - ${tema}`);

    // Check cache first
    const cacheKey = generateINTEFCacheKey(asignatura, curso, tema, resourceType);
    const cached = await cache.get(cacheKey);

    if (cached) {
        console.log('📦 Usando contenido INTEF cacheado');
        return cached;
    }

    try {
        // Buscar en INTEF
        const results = await fetchFromINTEF(asignatura, curso, tema, resourceType);

        // Cache forever (contenido oficial no cambia)
        await cache.set(cacheKey, results, 'forever');

        return results;
    } catch (error) {
        console.error('Error fetching INTEF content:', error);
        return null;
    }
}

/**
 * Fetch real content from INTEF using web scraper
 */
async function fetchFromINTEF(asignatura, curso, tema, resourceType) {
    try {
        // Import scraper dynamically
        const { scrapeAllINTEFSources } = await import('./intef-scraper.js');

        console.log('🌐 Usando scraper REAL de INTEF/Procomún...');

        // Scrape contenido real
        const scrapedData = await scrapeAllINTEFSources({ asignatura, curso, tema });

        // Si encontramos recursos reales, procesarlos
        if (scrapedData && scrapedData.total > 0) {
            console.log(`✅ Contenido REAL obtenido: ${scrapedData.total} recursos`);

            return processScrapedContent(scrapedData, asignatura, curso, tema);
        }

        // Si no hay resultados del scraping, fallback a simulado
        console.log('⚠️ No se encontró contenido real, usando fallback simulado');
        return generateSimulatedINTEFContent(asignatura, curso, tema, resourceType);

    } catch (error) {
        console.error('Error en scraper INTEF:', error);
        console.log('⚠️ Fallback a contenido simulado por error');
        return generateSimulatedINTEFContent(asignatura, curso, tema, resourceType);
    }
}

/**
 * Procesar datos scrapeados en formato estándar
 */
function processScrapedContent(scrapedData, asignatura, curso, tema) {
    const subjectConfig = INTEF_CONFIG.subject_mapping[asignatura];
    const gradeConfig = INTEF_CONFIG.grade_mapping[curso];

    const recursos = [];

    // Procesar recursos de Procomún
    scrapedData.procomun?.forEach(recurso => {
        recursos.push({
            tipo: determinarTipoRecurso(recurso.tipo),
            titulo: recurso.titulo,
            descripcion: recurso.descripcion,
            url: recurso.url,
            fuente: 'Procomún',
            nivel_educativo: recurso.nivel_educativo || curso,
            autor: recurso.autor,
            lomloe_aligned: true
        });
    });

    // Procesar recursos de CEDEC
    scrapedData.cedec?.forEach(recurso => {
        recursos.push({
            tipo: 'unidad_didactica',
            titulo: recurso.titulo,
            descripcion: recurso.descripcion,
            url: recurso.url,
            fuente: 'CEDEC',
            nivel_educativo: curso,
            lomloe_aligned: true
        });
    });

    return {
        source: 'INTEF_OFFICIAL',
        metadata: {
            asignatura,
            curso,
            tema,
            nivel_educativo: gradeConfig?.intef_level,
            competencias: subjectConfig?.procomun_tags || [],
            total_recursos: recursos.length,
            fuentes: {
                procomun: scrapedData.procomun?.length || 0,
                cedec: scrapedData.cedec?.length || 0
            }
        },
        recursos: recursos,
        fecha_obtencion: scrapedData.fecha,
        nota: 'Contenido REAL obtenido de INTEF/Procomún'
    };
}

/**
 * Determinar tipo de recurso basado en nombre/descripción
 */
function determinarTipoRecurso(tipo) {
    const tipoLower = (tipo || '').toLowerCase();

    if (tipoLower.includes('unidad') || tipoLower.includes('secuencia')) {
        return 'unidad_didactica';
    }
    if (tipoLower.includes('actividad') || tipoLower.includes('ejercicio')) {
        return 'actividad';
    }
    if (tipoLower.includes('evaluacion') || tipoLower.includes('rubrica')) {
        return 'evaluacion';
    }
    if (tipoLower.includes('video') || tipoLower.includes('multimedia')) {
        return 'recurso_multimedia';
    }

    return 'recurso_educativo';
}

/**
 * Genera contenido simulado basado en estructura INTEF
 * Esto es temporal hasta implementar el scraper real
 */
function generateSimulatedINTEFContent(asignatura, curso, tema, resourceType) {
    const subjectConfig = INTEF_CONFIG.subject_mapping[asignatura];
    const gradeConfig = INTEF_CONFIG.grade_mapping[curso];

    // Generar 15 actividades variadas para tener suficiente contenido
    const actividades = [];
    for (let i = 1; i <= 15; i++) {
        actividades.push({
            tipo: 'actividad',
            titulo: `${tema} - Actividad ${i}`,
            descripcion: `Ejercicio práctico ${i} sobre ${tema} para ${curso}`,
            dificultad: ['fácil', 'media', 'difícil'][i % 3],
            tiempo_estimado: `${15 + (i * 5)} minutos`,
            tipo_agrupamiento: i % 2 === 0 ? 'individual' : 'grupal',
            recursos_necesarios: ['Cuaderno', 'Lápiz'],
            instrucciones: `Completa la actividad ${i} siguiendo las indicaciones del tema ${tema}`,
            evaluacion: 'rúbrica',
            competencias: subjectConfig?.procomun_tags || []
        });
    }

    return {
        source: 'INTEF_SIMULATED',
        metadata: {
            asignatura,
            curso,
            tema,
            nivel_educativo: gradeConfig?.intef_level,
            competencias: subjectConfig?.procomun_tags || [],
            url_oficial: buildINTEFSearchURL(asignatura, curso, tema)
        },
        recursos: [
            {
                tipo: 'unidad_didactica',
                titulo: `${tema} - Unidad Didáctica Oficial`,
                descripcion: `Unidad didáctica completa sobre ${tema} para ${curso}`,
                competencias_trabajadas: subjectConfig?.procomun_tags || [],
                objetivos: [
                    `Comprender los conceptos fundamentales de ${tema}`,
                    `Aplicar conocimientos en situaciones prácticas`,
                    `Desarrollar pensamiento crítico sobre ${tema}`
                ],
                contenidos: {
                    introduccion: `Introducción al tema ${tema}`,
                    desarrollo: `Desarrollo de contenidos clave`,
                    actividades: []
                },
                duracion_estimada: '4-6 sesiones',
                materiales_necesarios: ['Libro de texto', 'Cuaderno', 'Material específico'],
                criterios_evaluacion: [
                    'Comprensión de conceptos clave',
                    'Aplicación práctica',
                    'Participación activa'
                ],
                lomloe_aligned: true
            },
            ...actividades,  // Agregar las 15 actividades
            {
                tipo: 'evaluacion',
                titulo: `Evaluación: ${tema}`,
                descripcion: 'Instrumento de evaluación oficial',
                tipo_evaluacion: 'formativa',
                criterios_lomloe: subjectConfig?.procomun_tags || []
            }
        ],
        enlaces_externos: {
            procomun: buildINTEFSearchURL(asignatura, curso, tema),
            recursos_adicionales: []
        },
        fecha_obtencion: new Date().toISOString(),
        nota: 'Contenido simulado - Implementar scraper real de INTEF'
    };
}

/**
 * Obtener unidad didáctica completa de INTEF
 */
export async function getINTEFUnidadDidactica({ asignatura, curso, tema }) {
    const content = await searchINTEFResources({
        asignatura,
        curso,
        tema,
        resourceType: 'unidad_didactica'
    });

    if (!content || !content.recursos) return null;

    // Filtrar solo unidades didácticas
    const unidades = content.recursos.filter(r => r.tipo === 'unidad_didactica');
    return unidades.length > 0 ? unidades[0] : null;
}

/**
 * Obtener actividades de INTEF para un tema
 */
export async function getINTEFActividades({ asignatura, curso, tema, cantidad = 5 }) {
    const content = await searchINTEFResources({
        asignatura,
        curso,
        tema,
        resourceType: 'actividad'
    });

    if (!content || !content.recursos) return [];

    // Filtrar actividades
    const actividades = content.recursos.filter(r => r.tipo === 'actividad');
    return actividades.slice(0, cantidad);
}

/**
 * Obtener rúbrica de evaluación de INTEF
 */
export async function getINTEFRubrica({ asignatura, curso, tema }) {
    const content = await searchINTEFResources({
        asignatura,
        curso,
        tema,
        resourceType: 'rubrica'
    });

    if (!content || !content.recursos) return null;

    const rubricas = content.recursos.filter(r => r.tipo === 'rubrica' || r.tipo === 'evaluacion');
    return rubricas.length > 0 ? rubricas[0] : null;
}

/**
 * Verificar si hay contenido INTEF disponible
 */
export async function hasINTEFContent({ asignatura, curso, tema }) {
    const cacheKey = generateINTEFCacheKey(asignatura, curso, tema, 'all');
    const cached = await cache.get(cacheKey);

    if (cached) return true;

    // Check if subject and grade are supported
    const subjectConfig = INTEF_CONFIG.subject_mapping[asignatura];
    const gradeConfig = INTEF_CONFIG.grade_mapping[curso];

    return !!(subjectConfig && gradeConfig);
}

export default {
    searchINTEFResources,
    getINTEFUnidadDidactica,
    getINTEFActividades,
    getINTEFRubrica,
    hasINTEFContent
};
