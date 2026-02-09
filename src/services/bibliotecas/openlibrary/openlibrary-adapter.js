// OpenLibrary Adapter
// Convierte los datos de OpenLibrary a un formato unificado

/**
 * Adaptador para normalizar respuestas de OpenLibrary al formato interno
 */
class OpenLibraryAdapter {

    /**
     * Normalizar resultado de búsqueda
     * @param {Object} book - Libro crudo de OpenLibrary
     * @returns {Object} Libro en formato unificado
     */
    normalize(book) {
        return {
            id: this.extractId(book.key),
            fuente: 'openlibrary',
            tipo: 'libro',

            // Información básica
            titulo: book.title || 'Sin título',
            autor: this.extractAuthors(book.author_name),
            descripcion: book.first_sentence ? book.first_sentence.join(' ') : '',

            // Metadatos
            idioma: this.extractLanguage(book.language),
            fecha_publicacion: book.first_publish_year?.toString() || null,
            isbn: book.isbn ? book.isbn[0] : null,

            // Clasificación educativa
            nivel_educativo: this.inferEducationalLevel(book),
            temas: this.extractSubjects(book.subject),

            // Licencia y disponibilidad
            licencia: this.inferLicense(book),
            disponible_online: !!book.ia || book.availability?.status === 'open',

            // URLs y recursos
            url_acceso: this.getAccessURL(book),
            url_lectura: this.getReadingURL(book),
            imagen_portada: this.getCoverURL(book.cover_i),

            // Internet Archive
            ia_id: book.ia ? book.ia[0] : null,

            // Metadata LOMLOE (inferida)
            lomloe: this.inferLOMLOE(book),

            // Raw data para referencia
            _raw: {
                key: book.key,
                cover_id: book.cover_i,
                edition_count: book.edition_count
            }
        };
    }

    /**
     * Normalizar múltiples resultados
     * @param {Array} books - Array de libros
     * @returns {Array} Libros normalizados
     */
    normalizeMany(books) {
        return books.map(book => this.normalize(book));
    }

    /**
     * Extraer ID limpio del key
     */
    extractId(key) {
        if (!key) return null;
        return key.replace('/works/', '').replace('/books/', '');
    }

    /**
     * Extraer autores
     */
    extractAuthors(authorNames) {
        if (!authorNames || !Array.isArray(authorNames)) return 'Autor desconocido';
        return authorNames.join(', ');
    }

    /**
     * Extraer y normalizar idioma
     */
    extractLanguage(languages) {
        if (!languages || !Array.isArray(languages)) return 'es';

        const langMap = {
            'spa': 'es',
            'eng': 'en',
            'fre': 'fr',
            'ger': 'de',
            'glg': 'gl' // Gallego
        };

        const primaryLang = languages[0];
        return langMap[primaryLang] || primaryLang || 'es';
    }

    /**
     * Extraer y filtrar temas/subjects
     */
    extractSubjects(subjects) {
        if (!subjects || !Array.isArray(subjects)) return [];

        // Filtrar y limpiar subjects
        return subjects
            .slice(0, 10) // Limitar a 10 temas
            .map(s => s.toLowerCase())
            .filter(s => {
                // Filtrar temas demasiado genéricos o técnicos
                const blacklist = ['accessible book', 'protected daisy', 'in library', 'lending library'];
                return !blacklist.some(b => s.includes(b));
            });
    }

    /**
     * Inferir nivel educativo basado en temas y metadatos
     */
    inferEducationalLevel(book) {
        const subjects = book.subject || [];
        const subjectsStr = subjects.join(' ').toLowerCase();

        // Patrones para diferentes niveles
        if (subjectsStr.includes('children') || subjectsStr.includes('juvenile')) {
            if (subjectsStr.includes('picture book') || subjectsStr.includes('early reader')) {
                return ['1º Primaria', '2º Primaria', '3º Primaria'];
            }
            return ['4º Primaria', '5º Primaria', '6º Primaria'];
        }

        if (subjectsStr.includes('young adult')) {
            return ['1º ESO', '2º ESO', '3º ESO', '4º ESO'];
        }

        if (subjectsStr.includes('fiction') && !subjectsStr.includes('adult fiction')) {
            return ['4º Primaria', '5º Primaria', '6º Primaria', '1º ESO', '2º ESO'];
        }

        // Por defecto, secundaria
        return ['ESO', 'Bachillerato'];
    }

    /**
     * Inferir licencia basada en disponibilidad
     */
    inferLicense(book) {
        // Si está en Internet Archive, probablemente dominio público
        if (book.ia && book.ia.length > 0) {
            return 'dominio_publico';
        }

        // Si está disponible para lectura abierta
        if (book.availability?.status === 'open') {
            return 'creative_commons';
        }

        // Si tiene fecha de publicación antigua
        if (book.first_publish_year && book.first_publish_year < 1923) {
            return 'dominio_publico';
        }

        return 'derechos_reservados';
    }

    /**
     * Obtener URL de acceso al libro
     */
    getAccessURL(book) {
        if (!book.key) return null;
        return `https://openlibrary.org${book.key}`;
    }

    /**
     * Obtener URL de lectura online
     */
    getReadingURL(book) {
        // Prioridad a Internet Archive
        if (book.ia && book.ia.length > 0) {
            return `https://archive.org/details/${book.ia[0]}`;
        }

        // Si está disponible para préstamo
        if (book.availability?.status === 'open' && book.key) {
            return `https://openlibrary.org${book.key}`;
        }

        return null;
    }

    /**
     * Obtener URL de portada
     */
    getCoverURL(coverId, size = 'M') {
        if (!coverId) return null;
        return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
    }

    /**
     * Inferir metadatos LOMLOE basados en temas
     */
    inferLOMLOE(book) {
        const subjects = (book.subject || []).map(s => s.toLowerCase());
        const subjectsStr = subjects.join(' ');

        const lomloe = {
            competencias: [],
            criterios_evaluacion: [],
            saberes_basicos: [],
            asignaturas_aplicables: []
        };

        // Competencia en Comunicación Lingüística (CCL)
        if (subjectsStr.includes('literature') || subjectsStr.includes('poetry') ||
            subjectsStr.includes('fiction') || subjectsStr.includes('language')) {
            lomloe.competencias.push('CCL');
            lomloe.asignaturas_aplicables.push('Lengua Castellana');
        }

        // Competencia Cultural y Artística (CCEC)
        if (subjectsStr.includes('art') || subjectsStr.includes('culture') ||
            subjectsStr.includes('music') || subjectsStr.includes('history')) {
            lomloe.competencias.push('CCEC');
            lomloe.asignaturas_aplicables.push('Ciencias Sociales');
        }

        // Competencia Matemática y en Ciencia (STEM)
        if (subjectsStr.includes('science') || subjectsStr.includes('mathematics') ||
            subjectsStr.includes('nature') || subjectsStr.includes('biology')) {
            lomloe.competencias.push('STEM');
            lomloe.asignaturas_aplicables.push('Ciencias Naturales', 'Matemáticas');
        }

        // Competencia Personal, Social y Aprender a Aprender (CPSAA)
        if (subjectsStr.includes('biography') || subjectsStr.includes('self-help') ||
            subjectsStr.includes('psychology')) {
            lomloe.competencias.push('CPSAA');
        }

        // Competencia Ciudadana (CC)
        if (subjectsStr.includes('society') || subjectsStr.includes('citizenship') ||
            subjectsStr.includes('politics') || subjectsStr.includes('geography')) {
            lomloe.competencias.push('CC');
            lomloe.asignaturas_aplicables.push('Ciencias Sociales');
        }

        return lomloe;
    }

    /**
     * Crear fragmento para ejercicio de comprensión lectora
     * @param {Object} book - Libro normalizado
     * @param {string} fullText - Texto completo (opcional)
     * @returns {Object} Fragmento listo para usar en ejercicio
     */
    createReadingExercise(book, fullText = null) {
        return {
            tipo: 'comprension_lectora',
            fuente: {
                titulo: book.titulo,
                autor: book.autor,
                origen: 'OpenLibrary',
                url: book.url_lectura,
                licencia: book.licencia,
                imagen: book.imagen_portada
            },
            fragmento: {
                texto: fullText || book.descripcion || 'Fragmento no disponible',
                longitud: fullText ? fullText.length : (book.descripcion?.length || 0)
            },
            metadatos: {
                nivel_educativo: book.nivel_educativo,
                temas: book.temas,
                lomloe: book.lomloe
            }
        };
    }
}

// Singleton
const openLibraryAdapter = new OpenLibraryAdapter();

export default openLibraryAdapter;
export { OpenLibraryAdapter };
