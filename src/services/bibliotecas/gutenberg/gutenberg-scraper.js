// Proyecto Gutenberg Scraper
// Acceso a 70,000+ libros de dominio público

const GUTENBERG_BASE_URL = 'https://www.gutenberg.org';
const GUTENBERG_FILES_URL = 'https://www.gutenberg.org/files';
const GUTENBERG_CACHE_URL = 'https://www.gutenberg.org/cache/epub';

/**
 * Scraper para Proyecto Gutenberg
 * Nota: Gutenberg no tiene API oficial, usamos scraping ligero y RSS
 */
class GutenbergScraper {
    constructor() {
        this.baseURL = GUTENBERG_BASE_URL;
        this.timeout = 15000; // 15 segundos
    }

    /**
     * Buscar libros en español
     * @param {Object} params - Parámetros de búsqueda
     * @param {string} params.query - Término de búsqueda
     * @param {number} params.limit - Límite de resultados
     * @returns {Promise<Array>} Resultados de búsqueda
     */
    async search(params = {}) {
        try {
            const { query = '', limit = 10 } = params;

            console.log('🔍 Gutenberg search:', query);

            // Construir URL de búsqueda (búsqueda en español por defecto)
            const searchParams = new URLSearchParams({
                query: query,
                submit_search: 'Go!',
                'query': query ? `${query} lang:es` : 'lang:es' // Forzar español
            });

            const searchURL = `${this.baseURL}/ebooks/search/?${searchParams}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(searchURL, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'EduAnalytics/1.0 (Educational App)',
                    'Accept': 'text/html'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Gutenberg error: ${response.status}`);
            }

            const html = await response.text();

            // Parsear resultados básicos del HTML
            const books = this.parseSearchResults(html, limit);

            console.log(`✅ Gutenberg: ${books.length} libros encontrados`);
            return books;

        } catch (error) {
            console.error('❌ Error en Gutenberg search:', error);
            if (error.name === 'AbortError') {
                console.warn('⚠️ Gutenberg timeout');
            }
            return [];
        }
    }

    /**
     * Parsear resultados de búsqueda del HTML
     * @param {string} html - HTML de la página de resultados
     * @param {number} limit - Número máximo de resultados
     * @returns {Array} Libros parseados
     */
    parseSearchResults(html, limit = 10) {
        const books = [];

        try {
            // Regex básico para extraer IDs de libros de los enlaces
            // Formato típico: /ebooks/12345
            const ebookRegex = /\/ebooks\/(\d+)"/g;
            const matches = [...html.matchAll(ebookRegex)];

            // Extraer IDs únicos
            const uniqueIds = [...new Set(matches.map(m => m[1]))];

            // Limitar resultados
            const limitedIds = uniqueIds.slice(0, limit);

            // Para cada ID, crear objeto básico
            // Nota: necesitaríamos otra request para obtener detalles completos
            limitedIds.forEach(id => {
                books.push({
                    id: id,
                    url: `${this.baseURL}/ebooks/${id}`,
                    gutenberg_id: id
                });
            });

        } catch (error) {
            console.error('❌ Error parseando Gutenberg HTML:', error);
        }

        return books;
    }

    /**
     * Obtener catálogo de libros en español más populares
     * @param {number} limit - Número de libros
     * @returns {Promise<Array>} Libros en español
     */
    async getSpanishBooks(limit = 20) {
        try {
            console.log('📚 Obteniendo catálogo español de Gutenberg...');

            // Usar RSS feed de libros en español
            const rssURL = `${this.baseURL}/ebooks/search/?query=lang%3Aes&submit_search=Go%21&format=rss`;

            const response = await fetch(rssURL);
            if (!response.ok) {
                throw new Error('Error obteniendo RSS de Gutenberg');
            }

            const xml = await response.text();

            // Parsear XML básico (sin librerías externas)
            const books = this.parseRSS(xml, limit);

            console.log(`✅ Gutenberg catálogo español: ${books.length} libros`);
            return books;

        } catch (error) {
            console.error('❌ Error obteniendo catálogo español:', error);
            return this.getFallbackSpanishBooks(limit);
        }
    }

    /**
     * Parsear RSS feed
     * @param {string} xml - XML del feed
     * @param {number} limit - Límite de resultados
     * @returns {Array} Libros parseados
     */
    parseRSS(xml, limit) {
        const books = [];

        try {
            // Regex para extraer items del RSS
            const itemRegex = /<item>([\s\S]*?)<\/item>/g;
            const items = [...xml.matchAll(itemRegex)];

            for (let i = 0; i < Math.min(items.length, limit); i++) {
                const itemXML = items[i][1];

                const title = this.extractXMLTag(itemXML, 'title');
                const link = this.extractXMLTag(itemXML, 'link');
                const description = this.extractXMLTag(itemXML, 'description');

                // Extraer ID del link
                const idMatch = link.match(/\/ebooks\/(\d+)/);
                const id = idMatch ? idMatch[1] : null;

                if (id) {
                    books.push({
                        id: id,
                        gutenberg_id: id,
                        title: title,
                        description: description,
                        url: link
                    });
                }
            }
        } catch (error) {
            console.error('❌ Error parseando RSS:', error);
        }

        return books;
    }

    /**
     * Extraer contenido de una tag XML
     */
    extractXMLTag(xml, tagName) {
        const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 's');
        const match = xml.match(regex);
        return match ? match[1].trim() : '';
    }

    /**
     * Obtener libros clásicos españoles (fallback curado manualmente)
     */
    getFallbackSpanishBooks(limit = 20) {
        console.log('📖 Usando catálogo curado de clásicos españoles...');

        const clasicos = [
            { id: '2000', title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', nivel: ['ESO', 'Bachillerato'] },
            { id: '6996', title: 'La Celestina', author: 'Fernando de Rojas', nivel: ['ESO', 'Bachillerato'] },
            { id: '50485', title: 'Lazarillo de Tormes', author: 'Anónimo', nivel: ['ESO'] },
            { id: '16972', title: 'Platero y yo', author: 'Juan Ramón Jiménez', nivel: ['Primaria', 'ESO'] },
            { id: '28055', title: 'Rimas y leyendas', author: 'Gustavo Adolfo Bécquer', nivel: ['ESO'] },
            { id: '16328', title: 'Cuentos de la Alhambra', author: 'Washington Irving', nivel: ['Primaria', 'ESO'] },
            { id: '3296', title: 'Fábulas', author: 'Esopo', nivel: ['Primaria'] },
            { id: '140', title: 'Eneida', author: 'Virgilio', nivel: ['Bachillerato'] },
            { id: '1232', title: 'El Príncipe', author: 'Maquiavelo', nivel: ['Bachillerato'] },
            { id: '2413', title: 'Fuenteovejuna', author: 'Lope de Vega', nivel: ['ESO', 'Bachillerato'] },
            { id: '1497', title: 'Odisea', author: 'Homero', nivel: ['ESO', 'Bachillerato'] },
            { id: '5200', title: 'Metamorfosis', author: 'Ovidio', nivel: ['Bachillerato'] },
            { id: '17182', title: 'Antología poética', author: 'Antonio Machado', nivel: ['ESO', 'Bachillerato'] },
            { id: '15532', title: 'Campos de Castilla', author: 'Antonio Machado', nivel: ['ESO', 'Bachillerato'] },
            { id: '244', title: 'Iliada', author: 'Homero', nivel: ['ESO', 'Bachillerato'] },
        ];

        return clasicos.slice(0, limit).map(libro => ({
            ...libro,
            gutenberg_id: libro.id,
            url: `${this.baseURL}/ebooks/${libro.id}`,
            _curated: true
        }));
    }

    /**
     * Obtener detalles completos de un libro
     * @param {string} bookId - ID del libro en Gutenberg
     * @returns {Promise<Object>} Detalles del libro
     */
    async getBookDetails(bookId) {
        try {
            const url = `${this.baseURL}/ebooks/${bookId}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Book ${bookId} not found`);
            }

            const html = await response.text();

            // Parsear detalles básicos del HTML
            const details = {
                id: bookId,
                gutenberg_id: bookId,
                title: this.extractTitle(html),
                author: this.extractAuthor(html),
                language: this.extractLanguage(html),
                subjects: this.extractSubjects(html),
                url: url,
                download_urls: this.getDownloadURLs(bookId)
            };

            return details;

        } catch (error) {
            console.error(`❌ Error obteniendo detalles de libro ${bookId}:`, error);
            return null;
        }
    }

    /**
     * Extraer título del HTML
     */
    extractTitle(html) {
        const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
        return match ? match[1].trim() : 'Sin título';
    }

    /**
     * Extraer autor del HTML
     */
    extractAuthor(html) {
        const match = html.match(/by\s+<a[^>]*>([^<]+)<\/a>/);
        return match ? match[1].trim() : 'Autor desconocido';
    }

    /**
     * Extraer idioma del HTML
     */
    extractLanguage(html) {
        if (html.includes('Language: Spanish')) return 'es';
        if (html.includes('Language: English')) return 'en';
        return 'unknown';
    }

    /**
     * Extraer temas/subjects del HTML
     */
    extractSubjects(html) {
        const subjects = [];
        const regex = /<a[^>]*class="[^"]*subject[^"]*"[^>]*>([^<]+)<\/a>/g;
        let match;

        while ((match = regex.exec(html)) !== null) {
            subjects.push(match[1].trim());
        }

        return subjects;
    }

    /**
     * Obtener URLs de descarga disponibles
     * @param {string} bookId - ID del libro
     * @returns {Object} URLs por formato
     */
    getDownloadURLs(bookId) {
        return {
            html: `${GUTENBERG_FILES_URL}/${bookId}/${bookId}-h/${bookId}-h.htm`,
            txt: `${GUTENBERG_FILES_URL}/${bookId}/${bookId}-0.txt`,
            epub: `${GUTENBERG_CACHE_URL}/${bookId}/pg${bookId}.epub`,
            pdf: `${GUTENBERG_CACHE_URL}/${bookId}/pg${bookId}.pdf`,
            // URL alternativa para HTML
            html_alt: `${GUTENBERG_CACHE_URL}/${bookId}/pg${bookId}-images.html`
        };
    }

    /**
     * Obtener fragmento de texto de un libro
     * @param {string} bookId - ID del libro
     * @param {number} maxLength - Longitud máxima del fragmento
     * @returns {Promise<string|null>} Fragmento de texto
     */
    async getTextFragment(bookId, maxLength = 800) {
        try {
            console.log(`📄 Obteniendo fragmento del libro ${bookId}...`);

            // Intentar obtener versión TXT
            const txtURL = `${GUTENBERG_FILES_URL}/${bookId}/${bookId}-0.txt`;

            const response = await fetch(txtURL);
            if (!response.ok) {
                console.warn(`⚠️ TXT no disponible para libro ${bookId}`);
                return null;
            }

            const fullText = await response.text();

            // Buscar inicio del contenido (después del header de Gutenberg)
            const startMarkers = ['*** START OF', 'START OF THE PROJECT'];
            let startIndex = 0;

            for (const marker of startMarkers) {
                const index = fullText.indexOf(marker);
                if (index !== -1) {
                    startIndex = fullText.indexOf('\n', index) + 1;
                    break;
                }
            }

            // Extraer fragmento
            const content = fullText.slice(startIndex, startIndex + maxLength * 2);

            // Limpiar y cortar en párrafo completo
            const paragraphs = content.split('\n\n');
            let fragment = '';

            for (const para of paragraphs) {
                if (fragment.length + para.length > maxLength) break;
                fragment += para + '\n\n';
            }

            return fragment.trim() || null;

        } catch (error) {
            console.error(`❌ Error obteniendo fragmento de ${bookId}:`, error);
            return null;
        }
    }

    /**
     * Verificar si un libro está disponible para descarga
     * @param {string} bookId - ID del libro
     * @returns {Promise<boolean>} True si está disponible
     */
    async isAvailable(bookId) {
        try {
            const txtURL = `${GUTENBERG_FILES_URL}/${bookId}/${bookId}-0.txt`;
            const response = await fetch(txtURL, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Singleton
const gutenbergScraper = new GutenbergScraper();

export default gutenbergScraper;
export { GutenbergScraper };
