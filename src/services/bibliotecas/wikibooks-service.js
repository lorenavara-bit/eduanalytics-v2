// Servicio para obtener contenido educativo de Wikibooks (Libros de texto abiertos)
// API: https://es.wikibooks.org/w/api.php

const API_BASE = 'https://es.wikibooks.org/w/api.php';

/**
 * Busca un capítulo de libro de texto en Wikibooks
 */
export async function searchWikibooks(query) {
    try {
        const params = new URLSearchParams({
            action: 'query',
            list: 'search',
            srsearch: `${query} incategory:Libros_de_texto`, // Priorizar libros de texto
            format: 'json',
            origin: '*'
        });

        const response = await fetch(`${API_BASE}?${params.toString()}`);
        const data = await response.json();

        return data.query?.search || [];
    } catch (error) {
        console.warn("Wikibooks Search Error:", error);
        return [];
    }
}

/**
 * Obtiene el contenido de una página específica
 */
export async function getWikibooksPage(pageId) {
    try {
        const params = new URLSearchParams({
            action: 'parse',
            pageid: pageId,
            prop: 'text|sections',
            format: 'json',
            origin: '*' // CORS
        });

        const response = await fetch(`${API_BASE}?${params.toString()}`);
        const data = await response.json();

        if (!data.parse) return null;

        return {
            title: data.parse.title,
            htmlContent: data.parse.text['*'],
            sections: data.parse.sections || []
        };

    } catch (error) {
        console.error("Wikibooks Fetch Error:", error);
        return null;
    }
}

/**
 * Función principal: Busca y extrae un resumen limpio del tema
 */
export async function getTextbookContent(topic, subject) {
    console.log(`📚 Wikibooks: Buscando material para ${subject} - ${topic}...`);

    // 1. Buscar páginas relevantes
    const searchResults = await searchWikibooks(`${subject} ${topic}`);

    if (!searchResults || searchResults.length === 0) {
        // Intento fallback solo con el tema
        const fallbackResults = await searchWikibooks(topic);
        if (!fallbackResults || fallbackResults.length === 0) return null;
        return processResult(fallbackResults[0]);
    }

    // 2. Procesar el mejor resultado
    const bestMatch = searchResults[0];
    return await processResult(bestMatch);
}

async function processResult(result) {
    const pageData = await getWikibooksPage(result.pageid);
    if (!pageData) return null;

    // Limpieza básica de HTML (muy simplificada)
    // En un entorno real usaríamos librerías como cheerio o DOMParser, 
    // pero aquí extraemos solo texto crudo para el prompt o visualización simple.

    return {
        source: 'WIKIBOOKS',
        title: pageData.title,
        content_html: pageData.htmlContent, // Para renderizar si se quiere
        url: `https://es.wikibooks.org/wiki/${encodeURIComponent(pageData.title.replace(/ /g, '_'))}`,
        license: 'CC BY-SA 3.0'
    };
}

export default {
    getTextbookContent
};
