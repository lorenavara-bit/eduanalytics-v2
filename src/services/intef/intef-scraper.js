// INTEF/Procomún Real Web Scraper
// Extrae contenido educativo oficial del Ministerio de Educación de España

import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scraper principal para INTEF/Procomún
 * URLs principales:
 * - https://procomun.intef.es - Repositorio de recursos
 * - https://cedec.intef.es - Centro de desarrollo curricular
 */

const INTEF_URLS = {
    procomun_base: 'https://procomun.intef.es',
    procomun_search: 'https://procomun.intef.es/buscador',
    cedec_base: 'https://cedec.intef.es',
    recursos_base: 'https://intef.es/recursos-educativos'
};

/**
 * Construir URL de búsqueda en Procomún
 */
export function buildProComunSearchURL({ asignatura, nivel, tema, tags = [] }) {
    const baseURL = 'https://procomun.intef.es/buscador';
    const params = new URLSearchParams();

    // Query principal
    const query = `${tema} ${asignatura} ${nivel}`.trim();
    params.append('q', query);

    // Filtros adicionales
    if (nivel) {
        params.append('nivel', nivel.toLowerCase());
    }

    if (tags.length > 0) {
        params.append('tags', tags.join(','));
    }

    return `${baseURL}?${params.toString()}`;
}

/**
 * Scrape recursos de Procomún
 * NOTA: Procomún puede requerir JavaScript para cargar contenido
 * Esta versión básica parsea HTML estático
 */
export async function scrapeProComun({ asignatura, nivel, tema, tags = [] }) {
    try {
        const searchURL = buildProComunSearchURL({ asignatura, nivel, tema, tags });
        console.log(`🔍 Scraping Procomún: ${searchURL}`);

        const response = await axios.get(searchURL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml',
                'Accept-Language': 'es-ES,es;q=0.9'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const recursos = [];

        // Selector para recursos en Procomún
        // NOTA: Estos selectores son APROXIMADOS y pueden necesitar ajuste
        // basado en la estructura real del HTML de Procomún
        $('.recurso, .resource-item, .resultado-busqueda').each((index, element) => {
            const $recurso = $(element);

            const titulo = $recurso.find('.titulo, .title, h3, h4').first().text().trim();
            const descripcion = $recurso.find('.descripcion, .description, p').first().text().trim();
            const enlace = $recurso.find('a').first().attr('href');
            const tipo = $recurso.find('.tipo, .type, .resource-type').text().trim();
            const nivel_educativo = $recurso.find('.nivel, .level').text().trim();
            const autor = $recurso.find('.autor, .author').text().trim();

            // Solo agregar si tiene al menos título y enlace
            if (titulo && enlace) {
                recursos.push({
                    titulo,
                    descripcion: descripcion || '',
                    url: enlace.startsWith('http') ? enlace : `${INTEF_URLS.procomun_base}${enlace}`,
                    tipo: tipo || 'recurso_educativo',
                    nivel_educativo: nivel_educativo || nivel || '',
                    autor: autor || 'INTEF',
                    fuente: 'Procomún',
                    fecha_scraping: new Date().toISOString()
                });
            }
        });

        console.log(`✅ Encontrados ${recursos.length} recursos en Procomún`);
        return recursos;

    } catch (error) {
        console.error('Error scraping Procomún:', error.message);

        // Si falla el scraping, retornar vacío (fallback a AI)
        if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
            console.warn('⚠️ Procomún no accesible, usando fallback');
        }

        return [];
    }
}

/**
 * Scrape detalle de un recurso individual
 */
export async function scrapeRecursoDetalle(url) {
    try {
        console.log(`📄 Obteniendo detalle: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);

        // Extraer contenido del recurso
        const detalle = {
            titulo: $('h1, .titulo-principal').first().text().trim(),
            descripcion_completa: $('.descripcion-completa, .content-description').text().trim(),
            objetivos: [],
            contenidos: [],
            actividades: [],
            criterios_evaluacion: [],
            competencias: [],
            materiales: [],
            duracion: $('[class*="duracion"], [class*="duration"]').text().trim(),
            nivel: $('[class*="nivel"], [class*="level"]').text().trim()
        };

        // Extraer objetivos
        $('[class*="objetivo"], .objectives li, [class*="objective"] li').each((i, el) => {
            const texto = $(el).text().trim();
            if (texto) detalle.objetivos.push(texto);
        });

        // Extraer contenidos
        $('[class*="contenido"], .contents li').each((i, el) => {
            const texto = $(el).text().trim();
            if (texto) detalle.contenidos.push(texto);
        });

        // Extraer actividades
        $('[class*="actividad"], .activity, .activities li').each((i, el) => {
            const texto = $(el).text().trim();
            if (texto) detalle.actividades.push(texto);
        });

        // Extraer criterios de evaluación
        $('[class*="criterio"], .evaluation-criteria li').each((i, el) => {
            const texto = $(el).text().trim();
            if (texto) detalle.criterios_evaluacion.push(texto);
        });

        // Extraer competencias clave
        $('[class*="competencia"], .competencies li, .key-competences li').each((i, el) => {
            const texto = $(el).text().trim();
            if (texto) detalle.competencias.push(texto);
        });

        return detalle;

    } catch (error) {
        console.error('Error obteniendo detalle:', error.message);
        return null;
    }
}

/**
 * Scrape CEDEC (Centro de Desarrollo Curricular)
 * Recursos didácticos más estructurados
 */
export async function scrapeCEDEC({ asignatura, nivel, tema }) {
    try {
        // CEDEC tiene una estructura diferente
        // Por ahora, búsqueda básica
        const searchURL = `${INTEF_URLS.cedec_base}/?s=${encodeURIComponent(tema)}`;
        console.log(`🔍 Scraping CEDEC: ${searchURL}`);

        const response = await axios.get(searchURL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);
        const recursos = [];

        // CEDEC usa estructura de blog de WordPress
        $('.post, article, .entry').each((index, element) => {
            const $post = $(element);

            const titulo = $post.find('h2, h3, .entry-title').first().text().trim();
            const descripcion = $post.find('.entry-summary, .excerpt, p').first().text().trim();
            const enlace = $post.find('a').first().attr('href');

            if (titulo && enlace) {
                recursos.push({
                    titulo,
                    descripcion: descripcion || '',
                    url: enlace,
                    tipo: 'unidad_didactica_cedec',
                    fuente: 'CEDEC',
                    fecha_scraping: new Date().toISOString()
                });
            }
        });

        console.log(`✅ Encontrados ${recursos.length} recursos en CEDEC`);
        return recursos;

    } catch (error) {
        console.error('Error scraping CEDEC:', error.message);
        return [];
    }
}

/**
 * Agregar recursos educativos de múltiples fuentes INTEF
 */
export async function scrapeAllINTEFSources({ asignatura, curso, tema }) {
    console.log(`🔍 Iniciando scraping INTEF completo para: ${tema}`);

    const resultados = {
        procomun: [],
        cedec: [],
        total: 0,
        fuente: 'INTEF_REAL',
        fecha: new Date().toISOString()
    };

    // Mapear curso a nivel educativo
    const nivel = curso.includes('Primaria') ? 'primaria'
        : curso.includes('ESO') ? 'eso'
            : curso.includes('Bachillerato') ? 'bachillerato'
                : '';

    try {
        // Scrape Procomún (paralelo)
        const [procomun, cedec] = await Promise.allSettled([
            scrapeProComun({ asignatura, nivel, tema }),
            scrapeCEDEC({ asignatura, nivel, tema })
        ]);

        if (procomun.status === 'fulfilled') {
            resultados.procomun = procomun.value;
        }

        if (cedec.status === 'fulfilled') {
            resultados.cedec = cedec.value;
        }

        resultados.total = resultados.procomun.length + resultados.cedec.length;

        console.log(`✅ Scraping INTEF completado: ${resultados.total} recursos`);
        return resultados;

    } catch (error) {
        console.error('Error en scraping INTEF:', error);
        return resultados;
    }
}

/**
 * Helper: Verificar si una URL es accesible
 */
export async function testINTEFAccess() {
    try {
        const response = await axios.get(INTEF_URLS.procomun_base, { timeout: 5000 });
        return response.status === 200;
    } catch {
        return false;
    }
}

export default {
    scrapeProComun,
    scrapeCEDEC,
    scrapeRecursoDetalle,
    scrapeAllINTEFSources,
    testINTEFAccess,
    buildProComunSearchURL
};
