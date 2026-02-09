// OpenLibrary API Client
// Documentación: https://openlibrary.org/dev/docs/api

const OPENLIBRARY_BASE_URL = 'https://openlibrary.org';
const DEFAULT_TIMEOUT = 10000; // 10 segundos

/**
 * Cliente para OpenLibrary API
 * Proporciona acceso a 30+ millones de libros, muchos de dominio público
 */
class OpenLibraryAPI {
    constructor() {
        this.baseURL = OPENLIBRARY_BASE_URL;
        this.timeout = DEFAULT_TIMEOUT;
    }

    /**
     * Búsqueda general de libros
     * @param {Object} params - Parámetros de búsqueda
     * @param {string} params.q - Query general
     * @param {string} params.title - Título del libro
     * @param {string} params.author - Autor
     * @param {string} params.subject - Tema/materia
     * @param {string} params.language - Código de idioma (es, en, etc.)
     * @param {number} params.limit - Número de resultados (max 100)
     * @param {number} params.offset - Offset para paginación
     * @returns {Promise<Object>} Resultados de búsqueda
     */
    async search(params = {}) {
        try {
            const {
                q = '',
                title = '',
                author = '',
                subject = '',
                language = 'spa', // Español por defecto
                limit = 10,
                offset = 0
            } = params;

            // Construir query
            let query = q;
            if (title) query += ` title:${title}`;
            if (author) query += ` author:${author}`;
            if (subject) query += ` subject:${subject}`;

            const searchParams = new URLSearchParams({
                q: query.trim(),
                language: language,
                limit: limit.toString(),
                offset: offset.toString(),
                fields: 'key,title,author_name,first_publish_year,isbn,cover_i,subject,language,availability,ia'
            });

            const url = `${this.baseURL}/search.json?${searchParams}`;
            console.log('🔍 OpenLibrary search:', url);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EduAnalytics/1.0 (Educational App)'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`OpenLibrary API error: ${response.status}`);
            }

            const data = await response.json();
            console.log(`✅ OpenLibrary: ${data.docs?.length || 0} resultados`);

            return data;
        } catch (error) {
            console.error('❌ Error en OpenLibrary search:', error);
            if (error.name === 'AbortError') {
                throw new Error('OpenLibrary timeout - la API tardó demasiado');
            }
            throw error;
        }
    }

    /**
     * Buscar por materia/tema
     * @param {string} subject - Tema (matemáticas, naturaleza, historia, etc.)
     * @param {Object} options - Opciones adicionales
     * @returns {Promise<Object>} Libros del tema
     */
    async searchBySubject(subject, options = {}) {
        try {
            const { limit = 12, language = 'spa' } = options;

            const url = `${this.baseURL}/subjects/${encodeURIComponent(subject.toLowerCase())}.json?limit=${limit}`;
            console.log('📚 OpenLibrary subject search:', subject);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn(`⚠️ Subject "${subject}" no encontrado en OpenLibrary`);
                return { works: [] };
            }

            const data = await response.json();

            // Filtrar por idioma si es posible
            if (data.works && language) {
                data.works = data.works.filter(work => {
                    return !work.language || work.language.includes(language) || work.language.includes('spa');
                });
            }

            console.log(`✅ OpenLibrary subject: ${data.works?.length || 0} libros`);
            return data;
        } catch (error) {
            console.error('❌ Error en searchBySubject:', error);
            return { works: [] };
        }
    }

    /**
     * Obtener detalles de un libro específico
     * @param {string} workId - ID de la obra (ej: "/works/OL45804W")
     * @returns {Promise<Object>} Detalles del libro
     */
    async getWork(workId) {
        try {
            // Asegurar que empiece con /works/
            const cleanId = workId.startsWith('/works/') ? workId : `/works/${workId}`;
            const url = `${this.baseURL}${cleanId}.json`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Work not found: ${workId}`);
            }

            return await response.json();
        } catch (error) {
            console.error('❌ Error obteniendo work:', error);
            throw error;
        }
    }

    /**
     * Obtener ediciones de un libro
     * @param {string} workId - ID de la obra
     * @returns {Promise<Object>} Ediciones disponibles
     */
    async getEditions(workId) {
        try {
            const cleanId = workId.startsWith('/works/') ? workId : `/works/${workId}`;
            const url = `${this.baseURL}${cleanId}/editions.json`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Editions not found: ${workId}`);
            }

            return await response.json();
        } catch (error) {
            console.error('❌ Error obteniendo ediciones:', error);
            return { entries: [] };
        }
    }

    /**
     * Obtener URL de portada
     * @param {number} coverId - ID de portada
     * @param {string} size - Tamaño (S, M, L)
     * @returns {string} URL de la imagen
     */
    getCoverURL(coverId, size = 'M') {
        if (!coverId) return null;
        return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
    }

    /**
     * Obtener libros apropiados para un nivel educativo
     * @param {string} nivelEducativo - Nivel (ej: "4º Primaria")
     * @param {string} asignatura - Asignatura (ej: "Lengua Castellana")
     * @param {number} limit - Número de resultados
     * @returns {Promise<Array>} Libros recomendados
     */
    async getBooksForGradeLevel(nivelEducativo, asignatura, limit = 10) {
        try {
            // Mapear nivel educativo a temas apropiados
            const temasPorNivel = {
                '4º Primaria': ['childrens', 'juvenile', 'adventure', 'animals', 'nature', 'science'],
                '5º Primaria': ['childrens', 'juvenile', 'history', 'geography', 'science'],
                '6º Primaria': ['juvenile', 'young adult', 'history', 'science', 'biography'],
                '1º ESO': ['young adult', 'adventure', 'science', 'history'],
                '2º ESO': ['young adult', 'classic literature', 'history', 'science'],
                '3º ESO': ['young adult', 'literature', 'philosophy', 'history'],
                '4º ESO': ['literature', 'philosophy', 'history', 'science']
            };

            // Mapear asignatura a temas
            const temasPorAsignatura = {
                'Lengua Castellana': ['spanish literature', 'poetry', 'stories', 'grammar'],
                'Ciencias Naturales': ['nature', 'biology', 'animals', 'plants', 'environment'],
                'Ciencias Sociales': ['history', 'geography', 'culture', 'society'],
                'Matemáticas': ['mathematics', 'numbers', 'geometry'],
                'Inglés': ['english language', 'stories'],
                'Galego': ['galician literature', 'galicia']
            };

            const temas = [
                ...(temasPorNivel[nivelEducativo] || temasPorNivel['4º Primaria']),
                ...(temasPorAsignatura[asignatura] || [])
            ];

            // Buscar por varios temas y combinar resultados
            const resultados = [];

            for (const tema of temas.slice(0, 3)) { // Limitar a 3 temas
                try {
                    const data = await this.searchBySubject(tema, { limit: 5, language: 'spa' });
                    if (data.works) {
                        resultados.push(...data.works);
                    }
                } catch (err) {
                    console.warn(`⚠️ Error buscando tema "${tema}":`, err.message);
                }
            }

            // Eliminar duplicados y limitar
            const unique = Array.from(new Map(resultados.map(item => [item.key, item])).values());
            return unique.slice(0, limit);

        } catch (error) {
            console.error('❌ Error en getBooksForGradeLevel:', error);
            return [];
        }
    }

    /**
     * Verificar si un libro está disponible para lectura online
     * @param {Object} book - Datos del libro de búsqueda
     * @returns {boolean|string} URL de lectura o false
     */
    getReadingURL(book) {
        // Internet Archive disponible
        if (book.ia && book.ia.length > 0) {
            return `https://archive.org/details/${book.ia[0]}`;
        }

        // Disponibilidad para préstamo
        if (book.availability?.status === 'open') {
            return `${this.baseURL}${book.key}`;
        }

        return false;
    }

    /**
     * Obtener fragmento de texto de un libro (si está disponible)
     * @param {string} iaId - ID de Internet Archive
     * @returns {Promise<string|null>} Fragmento de texto
     */
    async getTextFragment(iaId) {
        try {
            // Intentar obtener texto de Internet Archive
            const url = `https://archive.org/stream/${iaId}/${iaId}_djvu.txt`;

            const response = await fetch(url);
            if (!response.ok) return null;

            const fullText = await response.text();

            // Extraer primeros 500 caracteres como fragmento
            const fragment = fullText.slice(0, 500).trim();
            return fragment || null;

        } catch (error) {
            console.warn('⚠️ No se pudo obtener fragmento de texto:', error.message);
            return null;
        }
    }
}

// Singleton
const openLibraryAPI = new OpenLibraryAPI();

export default openLibraryAPI;
export { OpenLibraryAPI };
