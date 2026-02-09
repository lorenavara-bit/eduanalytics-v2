/**
 * INTEGRACIÓN DE GENERADORES 4º PRIMARIA
 * Conecta los generadores deterministas (Matemáticas e Inglés)
 * con el sistema de fichas existente
 * 
 * ✨ Actualizado para usar el sistema COMPLETO de integración
 */

import { generarFichaMatematicasCompleta } from './math-integracion-4primaria.js';
import { generarFichaInglesCompleta } from './english-integration-4primaria.js';
import { getKhanExercises, adaptKhanToQuestions } from './khan/khan-fetcher.js';


/**
 */
export function shouldUseDeterministicGenerator(subject, gradeLevel, topic) {
    // Solo para 4º Primaria (Normalizar entrada)
    const is4thGrade = gradeLevel === '4' || gradeLevel === '4º' || gradeLevel?.toString().toLowerCase().includes('4');
    if (!is4thGrade) return false;

    // Matemáticas 4º
    if (subject.toLowerCase().includes('matemática')) {
        return true;
    }

    // Inglés 4º
    if (subject.toLowerCase().includes('inglés') || subject.toLowerCase().includes('ingles')) {
        return true;
    }

    // Lengua 4º
    if (subject.toLowerCase().includes('lengua') || subject.toLowerCase().includes('castellano')) {
        return true;
    }

    return false;
}

/**
 * Genera ficha usando generador determinista
 */
export async function generateDeterministicWorksheet(config) {
    const { subject } = config;

    const subjectName = subject.name.toLowerCase();

    // Matemáticas 4º Primaria
    if (subjectName.includes('matemática')) {
        return generateMathWorksheet(config);
    }

    // Inglés 4º Primaria
    if (subjectName.includes('inglés') || subjectName.includes('ingles')) {
        return generateEnglishWorksheet(config);
    }

    // Lengua 4º Primaria
    if (subjectName.includes('lengua') || subjectName.includes('castellano')) {
        return generateLenguaWorksheet(config);
    }

    throw new Error('No hay generador determinista disponible para esta asignatura');
}

/**
 * Genera ficha de Lengua 4º Primaria usando el Banco de Preguntas (Santillana)
 */
async function generateLenguaWorksheet(config) {
    const { topic, numQuestions = 10, difficulty = 'medio', grade = '4º Primaria' } = config;

    console.log(`📚 [LENGUA] Generando ficha determinística: ${topic} (${grade})`);

    // Intentar obtener ejercicios de Santillana/Khan
    const khanData = await getKhanExercises({
        asignatura: 'Lengua Castellana',
        tema: topic,
        cantidad: numQuestions,
        curso: grade
    });

    if (!khanData || !khanData.ejercicios || khanData.ejercicios.length === 0) {
        console.warn(`⚠️ No se encontraron ejercicios para el tema: ${topic}`);
        // Fallback a un objeto vacío con título para evitar crash
        return {
            title: topic,
            subtitle: "Lengua Castellana - 4º Primaria",
            sections: [{ title: topic, questions: [] }],
            metadata: { tipo: 'determinista_vacio' },
            totalQuestions: 0
        };
    }

    // Adaptar formato y agrupar en secciones
    const preguntas = adaptKhanToQuestions(khanData);

    // Crear secciones lógicas estilo Santillana
    const sections = [];
    const categorias = {
        'Vocabulario': preguntas.filter(p => p.pregunta.includes('prefijo') || p.pregunta.includes('sufijo') || (p.tipo_ejercicio && p.tipo_ejercicio.toLowerCase().includes('vocabulario'))),
        'Ortografía': preguntas.filter(p => !p.pregunta.includes('prefijo') && !p.pregunta.includes('sufijo') && (p.pregunta.includes('letra') || p.pregunta.includes('grave') || p.pregunta.includes(' V ') || (p.tipo_ejercicio && p.tipo_ejercicio.toLowerCase().includes('ortografía')))),
        'Gramática': preguntas.filter(p => !p.pregunta.includes('prefijo') && !p.pregunta.includes('sufijo') && !p.pregunta.includes('letra') && !p.pregunta.includes('grave') && !p.pregunta.includes(' V '))
    };

    Object.entries(categorias).forEach(([catTitle, catQuestions]) => {
        if (catQuestions.length > 0) {
            sections.push({
                title: catTitle.toUpperCase(),
                questions: catQuestions.map((p, idx) => ({
                    id: `q_${sections.length}_${idx}`,
                    number: idx + 1,
                    text: p.pregunta,
                    type: p.tipo_detalle || (p.tipo === 'multiple_choice' ? 'multiple_choice' : 'short_answer'),
                    options: p.opciones,
                    buckets: p.buckets, // Para ClassificationVip
                    pairs: p.pairs, // Para ConnectorVip
                    word_bank: p.word_bank, // Para FragmentVip/FillBlanks
                    correct_answer: p.respuesta_correcta,
                    explanation: p.explicacion,
                    difficulty: p.dificultad || difficulty.toLowerCase(),
                    metadata: {
                        tipo_ejercicio: p.tipo_ejercicio,
                        fuente: p.fuente
                    }
                }))
            });
        }
    });

    return {
        title: topic,
        subtitle: `Ficha de Refuerzo Santillana - 4º Primaria`,
        intro: `Practica los contenidos de la ${topic} para mejorar tus resultados.`,
        theory_recap: khanData.resumen || `
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-bold text-indigo-700">📌 Conceptos Clave</h4>
                    <p className="text-xs">Repasa los contenidos del libro para completar con éxito esta ficha.</p>
                </div>
            </div>
        `,
        metadata_lomloe: {
            asignatura: 'Lengua Castellana',
            curso: grade,
            nivel: '4º Primaria'
        },
        sections: sections,
        metadata: {
            generadoPor: 'DeterministicBank_Santillana_Vip',
            fiabilidad: '100%',
            tipo: 'determinista',
            fuente: khanData.url_oficial
        },
        totalQuestions: preguntas.length
    };
}

/**
 * Genera ficha de Matemáticas 4º Primaria
 * ✨ Actualizado para incluir TODOS los temas
 */
function generateMathWorksheet(config) {
    const { topic, numQuestions = 10, difficulty = 'medio' } = config;

    // Mapear dificultad (puede venir como "Medio" del UI)
    const dificultadNormalizada = difficulty.toLowerCase();

    // Detectar tipo específico de ejercicios según el tema
    let tipos = ['suma', 'resta', 'multiplicacion', 'division', 'combinada', 'fraccion', 'problema'];

    const topicLower = topic.toLowerCase();

    // Operaciones básicas
    if (topicLower.includes('suma') && !topicLower.includes('decimal')) {
        tipos = ['suma'];
    } else if (topicLower.includes('resta') && !topicLower.includes('decimal')) {
        tipos = ['resta'];
    } else if (topicLower.includes('multiplicaci')) {
        tipos = ['multiplicacion'];
    } else if (topicLower.includes('divisi')) {
        tipos = ['division'];
    } else if (topicLower.includes('fracci')) {
        tipos = ['fraccion'];
    } else if (topicLower.includes('problema')) {
        tipos = ['problema'];
    } else if (topicLower.includes('operaciones combinadas')) {
        tipos = ['combinada'];
    }

    // ✨ DECIMALES
    else if (topicLower.includes('decimal')) {
        if (topicLower.includes('suma')) {
            tipos = ['suma_decimal'];
        } else if (topicLower.includes('resta')) {
            tipos = ['resta_decimal'];
        } else if (topicLower.includes('comparaci') || topicLower.includes('ordenar')) {
            tipos = ['comparacion_decimal'];
        } else if (topicLower.includes('redonde')) {
            tipos = ['redondeo_decimal'];
        } else {
            // Tema genérico "decimales" → todos los tipos
            tipos = ['suma_decimal', 'resta_decimal', 'comparacion_decimal', 'redondeo_decimal'];
        }
    }

    // ✨ MEDIDAS
    else if (topicLower.includes('medida') || topicLower.includes('longitud') || topicLower.includes('tiempo') ||
        topicLower.includes('metro') || topicLower.includes('kilómetro') || topicLower.includes('hora')) {
        if (topicLower.includes('longitud') || topicLower.includes('metro') || topicLower.includes('kilómetro') ||
            topicLower.includes('cm') || topicLower.includes('distancia')) {
            tipos = ['medida_longitud'];
        } else if (topicLower.includes('tiempo') || topicLower.includes('hora') || topicLower.includes('minuto')) {
            tipos = ['medida_tiempo'];
        } else {
            // Tema genérico "medidas" → ambos tipos
            tipos = ['medida_longitud', 'medida_tiempo'];
        }
    }

    // ✨ ÁNGULOS / GEOMETRÍA
    else if (topicLower.includes('ángulo') || topicLower.includes('angulo') || topicLower.includes('geometr')) {
        if (topicLower.includes('clasificaci') || topicLower.includes('tipo')) {
            tipos = ['clasificacion_angulo'];
        } else if (topicLower.includes('medida') || topicLower.includes('medir') || topicLower.includes('grados')) {
            tipos = ['medida_angulo'];
        } else if (topicLower.includes('operaci') || topicLower.includes('suma') || topicLower.includes('resta')) {
            tipos = ['operacion_angulo'];
        } else {
            // Tema genérico "ángulos" → todos los tipos
            tipos = ['clasificacion_angulo', 'medida_angulo', 'operacion_angulo'];
        }
    }

    // ✨ PROPIEDADES
    else if (topicLower.includes('propiedad')) {
        if (topicLower.includes('conmutativa')) {
            tipos = ['propiedad_conmutativa'];
        } else if (topicLower.includes('asociativa')) {
            tipos = ['propiedad_asociativa'];
        } else if (topicLower.includes('distributiva')) {
            tipos = ['propiedad_distributiva'];
        } else {
            // Tema genérico "propiedades" → todas
            tipos = ['propiedad_conmutativa', 'propiedad_asociativa', 'propiedad_distributiva'];
        }
    }

    // Generar ficha usando el SISTEMA COMPLETO DE INTEGRACIÓN
    const ficha = generarFichaMatematicasCompleta({
        numPreguntas: numQuestions,
        tipos: tipos,
        dificultad: dificultadNormalizada,
        variedad: true
    });

    // Convertir al formato esperado por el WorksheetGenerator
    return convertMathToWorksheetFormat(ficha);
}


/**
 * Convierte formato de Matemáticas al formato estándar de WorksheetGenerator
 */
function convertMathToWorksheetFormat(ficha) {
    const sections = [{
        title: ficha.titulo,
        questions: ficha.ejercicios.map((ej, idx) => ({
            id: ej.id,
            number: idx + 1,
            text: ej.pregunta,
            type: 'multiple_choice',
            options: ej.opciones,
            correct_answer: ej.correcta,
            explanation: ej.explicacion,
            difficulty: ej.dificultad,
            metadata: {
                tipo_ejercicio: ej.tipo,
                subtipo: ej.subtipo || null,
                tema: ej.tema || null,
                operacion: ej.operacion
            }
        }))
    }];

    return {
        title: ficha.titulo,
        subtitle: ficha.descripcion || `${ficha.asignatura} - ${ficha.curso}`,
        sections: sections,
        metadata: {
            generadoPor: ficha.generadoPor,
            fiabilidad: '100%',
            fecha: ficha.fecha,
            tipo: 'determinista',
            variedad: ficha.metadatos?.variedad || true,
            numTemas: ficha.metadatos?.numTemas || 1,
            temas: ficha.metadatos?.temas || []
        },
        totalQuestions: ficha.ejercicios.length
    };
}

/**
 * Genera ficha de Inglés 4º Primaria
 */
async function generateEnglishWorksheet(config) {
    const { topic, numQuestions = 10, difficulty = 'facil' } = config;

    console.log('🔍 [ENGLISH] Config recibida:', { topic, numQuestions, difficulty });

    // Mapear dificultad
    const dificultadNormalizada = difficulty.toLowerCase();

    console.log('🔍 [ENGLISH] Dificultad normalizada:', dificultadNormalizada);

    // Detectar tipo específico de ejercicios según el tema
    let tipos = ['vocabulary'];
    let categoria = null; // Categoría específica de vocabulario

    const topicLower = topic.toLowerCase();

    // Detectar categoría específica de vocabulario
    // --- MASTER TOPIC MAP --
    // Definición declarativa de temas para evitar colisiones y "guessing" errors.
    // keys de categoria deben COINCIDIR EXACTAMENTE con las claves de 'english-4primaria.json'

    // --- MASTER TOPIC MAP --
    // Definición declarativa de temas 1:1 para máxima precisión.
    const TOPIC_MAP = {
        // --- GO FAR! 4 UNITS (New Curriculum) ---
        // MUST MATCH KEYS IN santillana-4-primaria-INGLES.js STRICTLY
        'Present Simple (Unit 1)': { types: ['present_simple'] },
        'Unit 2: Daily Routines': { types: ['vocabulary', 'grammar_routines'], category: 'daily_routines' },
        'Unit 3: Jobs & Workplaces': { types: ['vocabulary', 'grammar_present_simple'], category: 'professions' },
        'Unit 4: Health & Feelings': { types: ['vocabulary'], category: 'body' },
        'Unit 5: Comparatives': { types: ['comparatives'] },
        'Unit 6: Past Simple (Was/Were)': { types: ['past_simple_tobe'] },
        'Unit 7: Final Boss (The Big Mix)': { types: ['mixed_review'], category: 'review' },

        // --- VOCABULARY (Strict 1:1) ---
        'Vocabulary: Sports': { types: ['vocabulary'], category: 'sports' },
        'Vocabulary: Hobbies': { types: ['vocabulary'], category: 'hobbies' },
        'Vocabulary: Colors': { types: ['vocabulary'], category: 'colors' },
        'Vocabulary: Family': { types: ['vocabulary'], category: 'family' },
        'Vocabulary: Body': { types: ['vocabulary'], category: 'body' },
        'Vocabulary: Animals': { types: ['vocabulary'], category: 'animals' },
        'Vocabulary: School': { types: ['vocabulary'], category: 'school' },
        'Vocabulary: Food': { types: ['vocabulary'], category: 'food' },
        'Vocabulary: House': { types: ['vocabulary'], category: 'house' },
        'Vocabulary: Clothes': { types: ['vocabulary'], category: 'clothes' },
        'Vocabulary: Nature': { types: ['vocabulary'], category: 'nature' },
        'Vocabulary: Transport': { types: ['vocabulary'], category: 'transport' },
        'Vocabulary: Numbers': { types: ['vocabulary'], category: 'numbers' },
        'Vocabulary: Time': { types: ['vocabulary'], category: 'time' },
        'Vocabulary: Daily Routines': { types: ['vocabulary'], category: 'daily_routines' },
        'Vocabulary: City': { types: ['vocabulary'], category: 'city' },
        'Vocabulary: Professions': { types: ['vocabulary'], category: 'professions' },

        // --- GRAMMAR (Mapping to generators) ---
        'Grammar: Present Simple': { types: ['present_simple'] },
        'Grammar: Present Continuous': { types: ['present_continuous'] },
        'Grammar: Past Simple (Was/Were & Verbs)': { types: ['past_simple_tobe', 'past_simple_verbs'] },
        'Grammar: Verb To Be (Am/Is/Are)': { types: ['verb_to_be'] },
        'Grammar: Verb Have Got': { types: ['have_got'] },
        'Grammar: There is / There are': { types: ['there_is_are'] },
        'Grammar: Prepositions (Place & Time)': { types: ['prepositions'] },
        'Grammar: Adjectives (Comparatives & Superlatives)': { types: ['comparatives'] },
        'Grammar: Modals (Can/Must)': { types: ['modals'] },
        'Grammar: Countable & Uncountable': { types: ['countable_uncountable'] },
        'Grammar: Articles & Quantifiers': { types: ['articles', 'quantifiers_mix'] },
        'Grammar: Possessives & Saxon Genitive': { types: ['genitive', 'possessives'] },
        'Grammar: Question Words (Wh-)': { types: ['wh_questions'] },

        // --- SKILLS ---
        'Skill: Sentence Building (Word Order)': { types: ['sentence_building'] },
        'Skill: Mixed Tenses Challenge': { types: ['mixed_tenses'] },
        'Skill: Translation Practice (Reverse)': { types: ['translation_practice'] }
    };

    // 0. EMERGENCY FIX: Disable Procedural Vocab for Units
    let disableProceduralVocab = false;
    if (topic.includes('Unit') || topic.includes('Present Simple (Unit 1)')) { // Adjusted for Unit 1 name
        disableProceduralVocab = true;
    }

    // 1. Intentar buscar Match Exacto o Fuzzy en el Map para obtener la CLAVE CANÓNICA
    let mapConfig = null;
    let canonicalTopic = topic; // Default to input

    // First try exact match
    if (TOPIC_MAP[topic]) {
        mapConfig = TOPIC_MAP[topic];
        canonicalTopic = topic;
        console.log(`🎯 [TOPIC MAP] Match EXACTO: "${topic}"`);
    } else {
        // Fuzzy match: Find key in MAP that matches the input topic string
        for (const [key, val] of Object.entries(TOPIC_MAP)) {
            // Check if Input contains Key OR Key contains 'Unit' part of Input
            if (topic.includes(key) || key.includes(topic)) {
                mapConfig = val;
                canonicalTopic = key; // IMPORTANTE: Usar la clave del Mapa (que coincide con Santillana)
                console.log(`🎯 [TOPIC MAP] Match Fuzzy: Input="${topic}" -> Canonical="${key}"`);
                break;
            }
        }
    }

    // Fallback specific for "Unit X" generic strings to try to find the full key
    if (!mapConfig && topic.startsWith('Unit')) {
        const unitNum = topic.match(/Unit \d+/)?.[0];
        if (unitNum) {
            const foundKey = Object.keys(TOPIC_MAP).find(k => k.includes(unitNum));
            if (foundKey) {
                mapConfig = TOPIC_MAP[foundKey];
                canonicalTopic = foundKey;
                console.log(`🎯 [TOPIC MAP] Match Unit Number: "${unitNum}" -> "${foundKey}"`);
            }
        }
    }


    if (mapConfig) {
        tipos = mapConfig.types;
        categoria = mapConfig.category || null;
        console.log(`🎯 [TOPIC MAP] Configuración aplicada: Tipos=[${tipos}], Categoria=[${categoria}]`);
    } else {
        // Si es una Unit y no encontramos config, es crítico según instrucciones
        if (topic.startsWith('Unit')) {
            console.error(`ERROR CRÍTICO: No se encuentran datos para [${topic}] en el Mapa Determinista.`);
            // Dejamos que falle, o lanzamos error aquí también?
            // El usuario pidió error en english-integration, pero aquí definimos tipos.
            // Si no hay tipos, english-integration fallará.
        }

        // Mantener comportamiento previo para otros temas
    }

    // --- KEYWORD DETECTION (Robustness Fallback) ---
    if (!mapConfig) {
        if ((topicLower.includes('mixed') || topicLower.includes('mezcla')) && (topicLower.includes('tense') || topicLower.includes('tiempo'))) {
            tipos = ['mixed_tenses'];
        } else if (topicLower.includes('translation') || topicLower.includes('traducción')) {
            tipos = ['translation_practice'];
        } else if (topicLower.includes('there is') || topicLower.includes('there are')) {
            tipos = ['there_is_are'];
        } else if (topicLower.includes('preposition') || topicLower.includes('preposición')) {
            tipos = ['prepositions'];
        } else if (topicLower.includes('odd one out')) {
            tipos = ['odd_one_out'];
        } else if (topicLower.includes('roleplay') || topicLower.includes('role play')) {
            tipos = ['roleplay'];
        } else if (topicLower.includes('sentence building') || topicLower.includes('word order') || topicLower.includes('formar frase') || topicLower.includes('ordenar')) {
            tipos = ['sentence_building'];
        }
    }


    // --- FINAL CLEANUP: Ensure uniqueness ---
    tipos = [...new Set(tipos)];

    console.log(`🎯 [ENGLISH] Configuración Final: Tipos=${JSON.stringify(tipos)}, Cat=${JSON.stringify(categoria)}, Topic="${canonicalTopic}"`);


    // Generar ficha usando el SISTEMA COMPLETO DE INTEGRACIÓN
    const ficha = await generarFichaInglesCompleta({
        numPreguntas: numQuestions,
        tipos: tipos,
        dificultad: dificultadNormalizada,
        variedad: true,
        categoria: categoria,
        topic: canonicalTopic, // CRÍTICO: Pasar la clave canónica que coincide con Santillana
        disableProceduralVocab: disableProceduralVocab // Pasar flag aunque isUnitTopic lo maneja
    });

    // Convertir al formato esperado por el WorksheetGenerator
    return convertEnglishToWorksheetFormat(ficha);
}

/**
 * Convierte formato de Inglés al formato estándar de WorksheetGenerator
 */
function convertEnglishToWorksheetFormat(ficha) {
    const subtitleRaw = ficha.descripcion || `${ficha.asignatura} - ${ficha.curso}`;
    const safeSubtitle = (subtitleRaw === ficha.titulo) ? `${ficha.asignatura} - ${ficha.curso}` : subtitleRaw;

    const sections = [{
        title: ficha.titulo,
        questions: ficha.ejercicios.map((ej, idx) => {
            const baseQuestion = {
                id: ej.id,
                number: idx + 1,
                // ...
                text: ej.pregunta || ej.text,
                explanation: ej.explanation || ej.explicacion || 'Revisa este contenido.',
                difficulty: ej.difficulty || ej.dificultad || 'media',
                metadata: {
                    tipo_ejercicio: ej.question_type || ej.type,
                    tema: ej.tema,
                    source: ej.metadata?.source || 'Santillana DB'
                }
            };

            // Determinar el tipo de pregunta y añadir campos específicos
            const questionType = ej.question_type || ej.type || 'multiple_choice';

            switch (questionType) {
                case 'multiple_choice':
                    return {
                        ...baseQuestion,
                        type: 'multiple_choice',
                        options: ej.options || ej.opciones || [],
                        correct_answer: ej.correcta
                    };

                case 'text_input':
                    return {
                        ...baseQuestion,
                        type: 'text_input',
                        correct_answer: ej.correcta,
                        accept_variations: ej.accept_variations || [ej.correcta],
                        case_sensitive: ej.case_sensitive !== undefined ? ej.case_sensitive : false,
                        keywords_required: ej.keywords_required || null,
                        sample_answer: ej.sample_answer || null,
                        min_words: ej.min_words || null
                    };

                case 'word_order':
                    return {
                        ...baseQuestion,
                        type: 'word_order',
                        words: ej.words,
                        correct_answer: ej.correcta,
                        correct_variations: ej.correct_variations || [ej.correcta]
                    };

                case 'fill_blanks':
                    return {
                        ...baseQuestion,
                        type: 'fill_blanks',
                        text: ej.text,
                        word_bank: ej.word_bank,
                        correct_answer: ej.correcta,
                        accept_any_order: ej.accept_any_order !== undefined ? ej.accept_any_order : false
                    };

                default:
                    // Fallback a multiple choice
                    return {
                        ...baseQuestion,
                        type: 'multiple_choice',
                        options: ej.opciones || [],
                        correct_answer: ej.correcta
                    };
            }
        })
    }];

    return {
        title: ficha.titulo,
        subtitle: safeSubtitle,
        sections: sections,
        metadata: {
            generadoPor: ficha.generadoPor,
            fiabilidad: '100%',
            fecha: ficha.fecha,
            tipo: 'determinista',
            variedad: ficha.metadatos?.variedad || true,
            numTemas: ficha.metadatos?.numTemas || 1,
            temas: ficha.metadatos?.temas || []
        },
        totalQuestions: ficha.ejercicios.length
    };
}

export default {
    shouldUseDeterministicGenerator,
    generateDeterministicWorksheet
};

