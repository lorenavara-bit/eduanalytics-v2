// Gutenberg Adapter
// Convierte datos de Gutenberg a formato unificado

/**
 * Adaptador para normalizar respuestas de Gutenberg al formato interno
 */
class GutenbergAdapter {

    /**
     * Normalizar libro de Gutenberg
     * @param {Object} book - Libro crudo de Gutenberg
     * @param {Object} details - Detalles adicionales (opcional)
     * @returns {Object} Libro en formato unificado
     */
    normalize(book, details = null) {
        const combined = { ...book, ...details };

        return {
            id: `gutenberg_${combined.gutenberg_id || combined.id}`,
            fuente: 'gutenberg',
            tipo: 'libro',

            // Información básica
            titulo: combined.title || 'Sin título',
            autor: combined.author || 'Autor clásico',
            descripcion: combined.description || `Texto clásico disponible en Proyecto Gutenberg`,

            // Metadatos
            idioma: combined.language || 'es',
            fecha_publicacion: combined.publication_year || 'Clásico',

            // Clasificación educativa
            nivel_educativo: combined.nivel || this.inferEducationalLevel(combined),
            temas: combined.subjects || this.inferSubjects(combined),

            // Licencia (siempre dominio público en Gutenberg)
            licencia: 'dominio_publico',
            disponible_online: true,

            // URLs y recursos
            url_acceso: combined.url || `https://www.gutenberg.org/ebooks/${combined.gutenberg_id || combined.id}`,
            url_lectura: this.getReadingURL(combined),
            download_urls: combined.download_urls || this.getDownloadURLs(combined.gutenberg_id || combined.id),

            // Gutenberg específico
            gutenberg_id: combined.gutenberg_id || combined.id,

            // Metadata LOMLOE
            lomloe: this.inferLOMLOE(combined),

            // Indicador de contenido curado manualmente
            curated: combined._curated || false,

            // Raw data
            _raw: {
                original: book
            }
        };
    }

    /**
     * Normalizar múltiples libros
     */
    normalizeMany(books) {
        return books.map(book => this.normalize(book));
    }

    /**
     * Inferir nivel educativo basado en título/autor/temas
     */
    inferEducationalLevel(book) {
        const title = (book.title || '').toLowerCase();
        const subjects = (book.subjects || []).map(s => s.toLowerCase());
        const author = (book.author || '').toLowerCase();

        // Libros infantiles/juveniles
        const juvenileKeywords = ['fábula', 'cuento', 'aventura', 'niños', 'juvenile', 'children'];
        if (juvenileKeywords.some(kw => title.includes(kw) || subjects.some(s => s.includes(kw)))) {
            return ['4º Primaria', '5º Primaria', '6º Primaria'];
        }

        // Clásicos literarios españoles
        const clasicosEspanoles = ['cervantes', 'lope de vega', 'quevedo', 'góngora', 'machado', 'bécquer'];
        if (clasicosEspanoles.some(autor => author.includes(autor))) {
            return ['ESO', 'Bachillerato'];
        }

        // Poesía
        if (title.includes('poesía') || title.includes('rimas') ||
            subjects.some(s => s.includes('poetry') || s.includes('poesía'))) {
            return ['4º Primaria', '5º Primaria', '6º Primaria', 'ESO'];
        }

        // Filosofía/ensayo
        if (subjects.some(s => s.includes('philosophy') || s.includes('essay'))) {
            return ['Bachillerato'];
        }

        // Historia
        if (subjects.some(s => s.includes('history') || s.includes('historia'))) {
            return ['ESO', 'Bachillerato'];
        }

        // Por defecto: ESO y Bachillerato
        return ['ESO', 'Bachillerato'];
    }

    /**
     * Inferir temas del libro
     */
    inferSubjects(book) {
        const subjects = [];
        const title = (book.title || '').toLowerCase();

        // Mapear títulos comunes a temas
        if (title.includes('quijote')) {
            subjects.push('literatura española', 'novela', 'aventura');
        } else if (title.includes('fábula')) {
            subjects.push('fábulas', 'moral', 'animales');
        } else if (title.includes('poesía') || title.includes('rimas')) {
            subjects.push('poesía', 'literatura');
        } else if (title.includes('historia')) {
            subjects.push('historia', 'sociedad');
        } else {
            subjects.push('literatura clásica');
        }

        // Agregar subjects existentes
        if (book.subjects && Array.isArray(book.subjects)) {
            subjects.push(...book.subjects.map(s => s.toLowerCase()));
        }

        return [...new Set(subjects)]; // Eliminar duplicados
    }

    /**
     * Obtener URL de lectura online
     */
    getReadingURL(book) {
        const id = book.gutenberg_id || book.id;
        // Priorizar HTML porque es más fácil de mostrar en web
        return `https://www.gutenberg.org/files/${id}/${id}-h/${id}-h.htm`;
    }

    /**
     * Obtener URLs de descarga
     */
    getDownloadURLs(bookId) {
        return {
            html: `https://www.gutenberg.org/files/${bookId}/${bookId}-h/${bookId}-h.htm`,
            txt: `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`,
            epub: `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.epub`,
            pdf: `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.pdf`
        };
    }

    /**
     * Inferir competencias LOMLOE
     */
    inferLOMLOE(book) {
        const subjects = (book.subjects || []).map(s => s.toLowerCase());
        const title = (book.title || '').toLowerCase();

        const lomloe = {
            competencias: ['CCL'], // Todos los libros tienen competencia lingüística
            criterios_evaluacion: [],
            saberes_basicos: [],
            asignaturas_aplicables: ['Lengua Castellana']
        };

        // Competencia Cultural y Artística
        if (subjects.some(s => s.includes('literature') || s.includes('poetry') || s.includes('art'))) {
            lomloe.competencias.push('CCEC');
        }

        // Competencia Ciudadana
        if (subjects.some(s => s.includes('history') || s.includes('politics') || s.includes('society'))) {
            lomloe.competencias.push('CC');
            lomloe.asignaturas_aplicables.push('Ciencias Sociales');
        }

        // Competencia Personal y Social
        if (subjects.some(s => s.includes('biography') || s.includes('philosophy'))) {
            lomloe.competencias.push('CPSAA');
        }

        // Saberes básicos según nivel
        const niveles = this.inferEducationalLevel(book);
        if (niveles.includes('4º Primaria') || niveles.includes('Primaria')) {
            lomloe.saberes_basicos.push(
                'Comprensión lectora',
                'Vocabulario',
                'Análisis de textos narrativos'
            );
        } else if (niveles.includes('ESO')) {
            lomloe.saberes_basicos.push(
                'Análisis literario',
                'Contexto histórico',
                'Figuras retóricas',
                'Comprensión crítica'
            );
        } else if (niveles.includes('Bachillerato')) {
            lomloe.saberes_basicos.push(
                'Literatura clásica',
                'Análisis crítico',
                'Contexto cultural',
                'Intertextualidad'
            );
        }

        // Eliminar duplicados
        lomloe.competencias = [...new Set(lomloe.competencias)];
        lomloe.asignaturas_aplicables = [...new Set(lomloe.asignaturas_aplicables)];

        return lomloe;
    }

    /**
     * Crear ejercicio de comprensión lectora
     * @param {Object} book - Libro normalizado
     * @param {string} fragmento - Fragmento de texto
     * @returns {Object} Ejercicio listo para usar
     */
    createReadingExercise(book, fragmento) {
        return {
            tipo: 'comprension_lectora',
            fuente: {
                titulo: book.titulo,
                autor: book.autor,
                origen: 'Proyecto Gutenberg',
                url: book.url_lectura,
                licencia: 'dominio_publico',
                download_urls: book.download_urls
            },
            fragmento: {
                texto: fragmento,
                longitud: fragmento.length
            },
            metadatos: {
                nivel_educativo: book.nivel_educativo,
                temas: book.temas,
                lomloe: book.lomloe,
                clasificacion: 'clásico literario'
            },
            sugerencias_didacticas: this.generateTeachingSuggestions(book)
        };
    }

    /**
     * Generar sugerencias didácticas automáticas
     */
    generateTeachingSuggestions(book) {
        const suggestions = [];

        // Sugerencias generales
        suggestions.push('Leer el fragmento en voz alta para mejorar la fluidez lectora');
        suggestions.push('Identificar palabras desconocidas y buscar su significado');
        suggestions.push('Reflexionar sobre el mensaje del autor');

        // Sugerencias específicas por tipo
        if (book.temas.some(t => t.includes('poesía'))) {
            suggestions.push('Identificar la rima y la métrica del poema');
            suggestions.push('Analizar las figuras literarias utilizadas');
        } else if (book.temas.some(t => t.includes('fábula'))) {
            suggestions.push('Identificar la moraleja del cuento');
            suggestions.push('Relacionar la historia con situaciones actuales');
        } else if (book.temas.some(t => t.includes('novela') || t.includes('aventura'))) {
            suggestions.push('Describir los personajes principales');
            suggestions.push('Imaginar cómo continuará la historia');
        }

        // Sugerencias por nivel
        if (book.nivel_educativo.includes('Primaria')) {
            suggestions.push('Hacer un dibujo del fragmento leído');
            suggestions.push('Contar la historia con tus propias palabras');
        } else if (book.nivel_educativo.includes('ESO')) {
            suggestions.push('Analizar el contexto histórico de la obra');
            suggestions.push('Comparar con obras contemporáneas');
        } else if (book.nivel_educativo.includes('Bachillerato')) {
            suggestions.push('Analizar el estilo literario del autor');
            suggestions.push('Investigar la influencia de esta obra en la literatura posterior');
        }

        return suggestions;
    }

    /**
     * Preparar libro para banco de preguntas
     * @param {Object} book - Libro normalizado
     * @param {string} fragmento - Fragmento de texto
     * @returns {Object} Pregunta lista para insertar en banco
     */
    prepareForQuestionBank(book, fragmento) {
        return {
            tipo_ejercicio: 'comprension_lectora',
            asignatura: 'Lengua Castellana',
            nivel: book.nivel_educativo[0] || 'ESO',
            tema: 'Literatura Clásica',

            enunciado: `Lee el siguiente fragmento de "${book.titulo}" de ${book.autor}:`,

            contenido_adicional: {
                fragmento: fragmento,
                fuente: book.titulo,
                autor: book.autor,
                url: book.url_lectura
            },

            // Las preguntas específicas se generarían con AI o manualmente
            preguntas_sugeridas: [
                '¿Cuál es la idea principal del fragmento?',
                '¿Qué características tiene el personaje principal?',
                '¿En qué época crees que se desarrolla la historia?',
                '¿Qué sentimientos transmite el autor?'
            ],

            metadatos_lomloe: book.lomloe,
            origen: 'gutenberg',
            fuente_id: book.gutenberg_id
        };
    }
}

// Singleton
const gutenbergAdapter = new GutenbergAdapter();

export default gutenbergAdapter;
export { GutenbergAdapter };
