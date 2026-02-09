// Bibliotecas Digitales - Index
// Punto de entrada centralizado para OpenLibrary + Gutenberg

export { default as bibliotecaManager } from './biblioteca-manager.js';
export { default as openLibraryAPI, OpenLibraryAPI } from './openlibrary/openlibrary-api.js';
export { default as openLibraryAdapter, OpenLibraryAdapter } from './openlibrary/openlibrary-adapter.js';
export { default as gutenbergScraper, GutenbergScraper } from './gutenberg/gutenberg-scraper.js';
export { default as gutenbergAdapter, GutenbergAdapter } from './gutenberg/gutenberg-adapter.js';

/**
 * Exportación simplificada para uso común
 * 
 * Ejemplo de uso:
 * 
 * import { bibliotecaManager } from './services/bibliotecas';
 * 
 * const libros = await bibliotecaManager.search({
 *   asignatura: "Lengua Castellana",
 *   nivel: "4º Primaria",
 *   limit: 10
 * });
 * 
 * const ejercicio = await bibliotecaManager.createReadingExercise(
 *   "4º Primaria",
 *   "Lengua Castellana",
 *   "literatura"
 * );
 */

export default bibliotecaManager;
