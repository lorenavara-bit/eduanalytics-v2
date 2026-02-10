import { supabase } from '../supabaseClient';

// Importación de Generadores Deterministas
import { generarVocabulario, resetearPalabrasUsadas as resetVocab } from './english-vocabulary-4primaria.js';
import { generarTranslationChallenge as generarTranslation, resetearEjerciciosUsados as resetTrans } from './english-translation-challenge-4primaria.js';
import { generarMixedTenses, resetearEjerciciosUsados as resetMixed } from './english-mixed-tenses-4primaria.js';
import { generarPresentSimple, resetearEjerciciosUsados as resetPres } from './english-present-simple-4primaria.js';
import { generarPresentContinuous } from './english-present-continuous-4primaria.js';
import { generarPastSimpleVerbs } from './english-past-simple-verbs-4primaria.js';
import { generarVerbToBe } from './english-verb-tobe-4primaria.js';
import { generarHaveGot } from './english-have-got-4primaria.js';
import { generarThereIsAre } from './english-there-is-are-4primaria.js';
import { generarPrepositions } from './english-prepositions-4primaria.js';
import { generarComparatives } from './english-comparatives-4primaria.js';
import { generarModals } from './english-modals-4primaria.js';
import { generarCountableUncountable } from './english-countable-uncountable-4primaria.js';
import { generarSentenceBuilding } from './english-sentence-building-4primaria.js';
import { generarOddOneOut } from './english-odd-one-out-4primaria.js';
import { generarRoleplay } from './english-roleplay-4primaria.js';
import { generarArticles } from './english-articles-4primaria.js';
import { generarQuantifiersMix } from './english-quantifiers-mix-4primaria.js';

const GENERADORES = {
    vocabulary: generarVocabulario,
    translation_practice: generarTranslation,
    mixed_tenses: generarMixedTenses,
    present_simple: generarPresentSimple,
    present_continuous: generarPresentContinuous,
    past_simple_verbs: generarPastSimpleVerbs,
    verb_to_be: generarVerbToBe,
    have_got: generarHaveGot,
    there_is_are: generarThereIsAre,
    prepositions: generarPrepositions,
    comparatives: generarComparatives,
    modals: generarModals,
    countable_uncountable: generarCountableUncountable,
    sentence_building: generarSentenceBuilding,
    odd_one_out: generarOddOneOut,
    roleplay: generarRoleplay,
    articles: generarArticles,
    quantifiers_mix: generarQuantifiersMix
};


export const CONFIGURACIONES_PREDEFINIDAS = {
    'present_simple': {
        titulo: 'Present Simple Mastery',
        tipos: ['present_simple'],
        numQuestions: 15
    },
    'daily_routines': {
        titulo: 'Daily Routines & Time',
        tipos: ['vocabulary', 'present_simple'],
        numQuestions: 15,
        categoria: 'daily_routines'
    }
};

/**
 * Generador Universal de Fichas de Inglés para 4º Primaria
 * 🛡️ PROTOCOLO DE CUARENTENA PARA SANTILLANA GO FAR! 4
 * 
 * Este generador prioriza los datos de la base de datos local
 * y asegura una experiencia VIP (Word Order, Fill Blanks).
 */
export async function generarFichaInglesCompleta(config = {}) {
    // =================================================================================
    // 💀 PROTOCOLO DE CUARENTENA (MODO SANTILLANA GO FAR!)
    // =================================================================================
    const { topic, numQuestions = 20 } = config;

    const isSantillanaTarget = topic && (
        topic.startsWith('Unit') ||
        topic.includes('Unit') ||
        topic.includes('Present Simple (Unit 1)') ||
        topic.toLowerCase().includes('santillana')
    );

    if (isSantillanaTarget) {
        console.group("🚨 [ENGLISH] MODO SANTILLANA ACTIVO");

        // 1. IDENTIFICACIÓN DE UNIDAD (U2, U3, etc.)
        const unitMatch = topic.match(/Unit (\d+)/i);
        const unitId = unitMatch ? `U${unitMatch[1]}` : null;
        let topicName = topic.includes(':') ? topic.split(':')[1].trim() : topic;

        // Limpiar para búsqueda más efectiva
        topicName = topicName.replace(/\(.*\)/, '').trim();

        console.log(`📡 Buscando para: UnitId=${unitId}, TopicName=${topicName}`);

        // 2. CONSULTA INTEGRAL (Traemos el pool de la unidad)
        const { data: dbQuestions, error } = await supabase
            .from('question_bank_local')
            .select('*')
            // Filtrado estricto por asignatura y curso para evitar contaminación
            .eq('subject', 'Inglés')
            .eq('grade_level', '4º Primaria')
            .or(`topic.ilike.%${topicName}%,topic.ilike.%${topic}%,metadata->>unit.ilike.%${unitId || 'NONE'}%`)
            .limit(150);

        if (error || !dbQuestions || dbQuestions.length === 0) {
            console.groupEnd();
            // 🚨 AGGRESSIVE PURGE: No hay fallback a IA para Santillana 4º
            throw new Error(`🚫 CONTENIDO OFICIAL REQUERIDO: No hay ejercicios de Santillana en la DB para "${topic}". Por favor, sube el CSV correspondiente en el Panel de Admin.`);
        }

        // 3. DESDUPLICACIÓN EN MEMORIA
        const uniqueQuestions = [];
        const seenTexts = new Set();

        dbQuestions.forEach(q => {
            const text = (q.question_text || '').trim().toLowerCase();
            if (!seenTexts.has(text)) {
                seenTexts.add(text);
                uniqueQuestions.push(q);
            }
        });

        console.log(`📊 Ejercicios únicos en pool: ${uniqueQuestions.length}`);

        // 4. SELECCIÓN ALEATORIA
        const shuffled = [...uniqueQuestions].sort(() => Math.random() - 0.5);
        const finalSelection = shuffled.slice(0, numQuestions);

        // 5. RENDERIZACIÓN A FORMATO ESTÁNDAR PARA INTERACTIVEWORKSHEET
        const cleanExercises = finalSelection.map((ex, idx) => {
            let text = (ex.question_text || '');

            // 🧼 LIMPIEZA DE IDs DE CUARENTENA:
            const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
            text = text.replace(uuidRegex, '');
            text = text.replace(/^[0-9a-fA-F-]{8,}\s*/, '');
            text = text.replace(/<[^>]*>/g, '').trim();

            const lowerText = text.toLowerCase();
            const dbType = (ex.question_type || '').toLowerCase();
            const metaType = (ex.metadata?.tipo || '').toLowerCase();
            const normalizedText = text.replace(/_{3,}/g, '___');

            // Parse metadata (handle string or object)
            let meta = ex.metadata || {};
            if (typeof meta === 'string') {
                try { meta = JSON.parse(meta); } catch (e) { meta = {}; }
            }

            // Parse correct_answer for classification (could be JSON string)
            let correctAnswer = ex.correct_answer || '';
            if (dbType === 'classification' && typeof correctAnswer === 'string' && correctAnswer.startsWith('{')) {
                try { correctAnswer = JSON.parse(correctAnswer); } catch (e) { /* keep as string */ }
            }

            // Parse options (pipe-separated string from CSV → array)
            let rawOptions = ex.options || '';
            let optionsArray = [];
            if (typeof rawOptions === 'string' && rawOptions.includes('|')) {
                optionsArray = rawOptions.split('|').map(o => o.trim()).filter(Boolean);
            } else if (Array.isArray(rawOptions)) {
                optionsArray = rawOptions;
            }

            // ==========================================
            // 🎙️ VOICE - Early exit
            // ==========================================
            if (dbType === 'voice') {
                return {
                    id: ex.id,
                    type: 'voice',
                    text: text,
                    question_text: text,
                    correct_answer: ex.correct_answer,
                    difficulty: ex.difficulty || 'media',
                    explanation: meta.explicacionDiamante || ex.explanation || 'Practica tu pronunciación.',
                    competencias: ['CP', 'CPSAA'],
                    criterio_evaluacion: meta.criterio || 'Expresión Oral',
                    metadata: { ...meta, source: 'Santillana DB', unit: meta.unit || (ex.topic || '').match(/Unit (\d+)/i)?.[1] ? `U${(ex.topic || '').match(/Unit (\d+)/i)?.[1]}` : null }
                };
            }

            // ==========================================
            // 🗂️ CLASSIFICATION - Early exit
            // ==========================================
            if (dbType === 'classification') {
                return {
                    id: ex.id,
                    type: 'classification',
                    text: text,
                    question_text: text,
                    correct_answer: correctAnswer,
                    items: optionsArray,
                    buckets: meta.buckets || [],
                    options: optionsArray,
                    difficulty: ex.difficulty || 'media',
                    explanation: meta.explicacionDiamante || ex.explanation || 'Clasifica correctamente cada elemento.',
                    competencias: ['CP', 'CPSAA'],
                    criterio_evaluacion: meta.criterio || 'Comunicación Escrita',
                    metadata: { ...meta, source: 'Santillana DB' }
                };
            }

            // ==========================================
            // 🔗 CONNECTOR - Early exit
            // ==========================================
            if (dbType === 'connector') {
                return {
                    id: ex.id,
                    type: 'connector',
                    text: text,
                    question_text: text,
                    correct_answer: ex.correct_answer,
                    pairs: meta.pairs || [],
                    difficulty: ex.difficulty || 'media',
                    explanation: meta.explicacionDiamante || ex.explanation || 'Une las parejas correctas.',
                    competencias: ['CP', 'CPSAA'],
                    criterio_evaluacion: meta.criterio || 'Comunicación Escrita',
                    metadata: { ...meta, source: 'Santillana DB' }
                };
            }

            // ==========================================
            // 🔍 SCANNER - Early exit
            // ==========================================
            if (dbType === 'scanner') {
                return {
                    id: ex.id,
                    type: 'scanner',
                    text: text,
                    question_text: text,
                    correct_answer: ex.correct_answer,
                    difficulty: ex.difficulty || 'media',
                    explanation: meta.explicacionDiamante || ex.explanation || 'Busca las palabras clave.',
                    competencias: ['CP', 'CPSAA'],
                    criterio_evaluacion: meta.criterio || 'Comprensión Lectora',
                    metadata: { ...meta, source: 'Santillana DB' }
                };
            }

            // ==========================================
            // BELOW: word_order, fill_blanks, multiple_choice, text_input
            // ==========================================
            const isOrder = dbType === 'word_order' || metaType.includes('order') || lowerText.includes('order') || lowerText.includes('orden');
            const hasGaps = normalizedText.includes('___');
            const hasOptions = /\((\w+)\/(\w+)\)/.test(normalizedText);
            const hasVerbBracket = /\(\w+\)/.test(normalizedText) && !hasOptions;

            let isFillBlanks = dbType === 'fill_blanks' || hasGaps || hasOptions || hasVerbBracket;
            let uiType = dbType || 'text_input';
            let words = [];
            let displayText = normalizedText;

            // 1. LÓGICA WORD ORDER
            if (isOrder) {
                uiType = 'word_order';
                if (text.includes('/')) {
                    const cleanText = text.replace(/^(order|orden|ordena):\s*/i, '');
                    words = cleanText.split('/').map(w => w.trim());
                } else {
                    const answer = (ex.correct_answer || '').trim();
                    if (answer) {
                        words = answer.split(' ').filter(w => w.length > 0).sort(() => Math.random() - 0.5);
                    } else {
                        uiType = 'text_input';
                    }
                }
                displayText = 'Ordena las palabras para formar la frase correcta:';
            }
            // 2. LÓGICA FILL BLANKS
            else if (isFillBlanks) {
                uiType = 'fill_blanks';
                if (hasOptions) {
                    const match = normalizedText.match(/\((\w+)\/(\w+)\)/);
                    if (match) words = [match[1], match[2]].sort(() => Math.random() - 0.5);
                    displayText = normalizedText.replace(/\(\w+\/\w+\)/g, hasGaps ? '' : '___').trim();
                } else {
                    const rawBank = meta.word_bank || ex.correct_answer?.split(',').map(s => s.trim()) || [];
                    words = rawBank.length > 0 ? [...rawBank] : [];

                    // 🎯 INYECCIÓN DE DISTRACTORES SI FALTA BANCO
                    if (words.length <= 1) {
                        const correct = (words[0] || ex.correct_answer || '').toLowerCase().trim();
                        if (correct) {
                            const distractors = new Set();
                            if (correct.endsWith('s')) {
                                distractors.add(correct.endsWith('es') ? correct.replace(/es$/, '') : correct.replace(/s$/, ''));
                                if (correct === 'does') distractors.add('do');
                                if (correct === 'goes') distractors.add('go');
                            } else {
                                distractors.add(correct + 's');
                                if (correct === 'do') distractors.add('does');
                                if (correct === 'go') distractors.add('goes');
                                if (correct === 'have') distractors.add('has');
                            }
                            const auxPool = ['am', 'is', 'are'];
                            if (auxPool.includes(correct)) {
                                auxPool.filter(v => v !== correct).forEach(v => distractors.add(v));
                            }
                            distractors.forEach(d => { if (d && d !== correct) { if (words.length < 3) words.push(d); } });
                        }
                    }

                    if (words.length === 0) {
                        uiType = 'text_input';
                    } else {
                        words = words.sort(() => Math.random() - 0.5);
                        if (hasVerbBracket) displayText = normalizedText.replace(/\(\w+\)/g, hasGaps ? '' : '___').trim();
                    }
                }
            }
            // 3. LÓGICA AUTO-MULTIPLE CHOICE
            else if (dbType === 'multiple_choice' || metaType.includes('vocab') || lowerText.includes('phrase:') || lowerText.includes('adverb:') || lowerText.includes('significa') || lowerText.includes('translate')) {
                uiType = 'multiple_choice';
                const correct = ex.correct_answer;

                if (optionsArray.length > 0) {
                    words = optionsArray;
                } else {
                    // 🧠 PEDAGOGICAL DISTRACTOR ENGINE
                    const correctLow = correct.toLowerCase().trim();
                    const pedagogicalDistractors = new Set();

                    // 1. Morphological distractors (for short words/verbs)
                    if (correctLow.length < 15) {
                        if (correctLow.endsWith('s')) {
                            const root = correctLow.endsWith('es') ? correctLow.replace(/es$/, '') : correctLow.replace(/s$/, '');
                            pedagogicalDistractors.add(root);
                        } else if (!correctLow.includes(' ')) {
                            pedagogicalDistractors.add(correctLow + 's');
                            pedagogicalDistractors.add(correctLow + 'es');
                        }

                        // Targeted daily routines (User's specific case)
                        if (correctLow.includes('get dressed')) {
                            pedagogicalDistractors.add(correctLow.replace('get dressed', 'dressed'));
                            pedagogicalDistractors.add(correctLow.replace('get dressed', 'dress'));
                        }
                        if (correctLow.includes('wake up')) pedagogicalDistractors.add(correctLow.replace('wake up', 'woke up'));

                        // Auxiliary/Verb confusion
                        if (correctLow.includes('have')) {
                            pedagogicalDistractors.add(correctLow.replace(/\bhave\b/g, 'has'));
                            pedagogicalDistractors.add(correctLow.replace(/\bhave\b/g, 'having'));
                        }
                        if (correctLow.includes('has')) pedagogicalDistractors.add(correctLow.replace(/\bhas\b/g, 'have'));
                        if (correctLow.includes('do')) pedagogicalDistractors.add(correctLow.replace(/\bdo\b/g, 'does'));
                        if (correctLow.includes('does')) pedagogicalDistractors.add(correctLow.replace(/\bdoes\b/g, 'do'));

                        // Verb To Be
                        if (correctLow.includes(' am ')) pedagogicalDistractors.add(correctLow.replace(/\bam\b/g, 'is'));
                        if (correctLow.includes(' is ')) pedagogicalDistractors.add(correctLow.replace(/\bis\b/g, 'are'));
                        if (correctLow.includes(' are ')) pedagogicalDistractors.add(correctLow.replace(/\bare\b/g, 'is'));
                    }

                    // 2. Pool-based distractors (Filtered by word count similarity)
                    const correctWordCount = correct.split(' ').length;
                    const otherAnswers = uniqueQuestions
                        .filter(q => q.correct_answer && q.correct_answer !== correct && q.correct_answer.length < 50)
                        .map(q => q.correct_answer.split(',')[0].trim())
                        .filter(ans => {
                            const ansWords = ans.split(' ').length;
                            return Math.abs(ansWords - correctWordCount) <= 1;
                        });

                    const poolDistractors = [...new Set(otherAnswers)].sort(() => Math.random() - 0.5);

                    const finalDistractors = new Set([...pedagogicalDistractors]);
                    poolDistractors.forEach(d => {
                        if (finalDistractors.size < 3 && d.toLowerCase() !== correctLow) {
                            finalDistractors.add(d);
                        }
                    });

                    // Fallback to fill up to 3 distractors
                    const fallbackPool = ['I go to school', 'It is ten o\'clock', 'He plays Art', 'She likes Science'];
                    fallbackPool.sort(() => Math.random() - 0.5).forEach(f => {
                        if (finalDistractors.size < 3 && f.toLowerCase() !== correctLow) {
                            finalDistractors.add(f);
                        }
                    });

                    words = [correct, ...finalDistractors].sort(() => Math.random() - 0.5);
                }
            }

            return {
                id: ex.id,
                type: uiType,
                text: displayText,
                question_text: text,
                correct_answer: ex.correct_answer,
                options: words,
                words: words,
                items: [],
                buckets: [],
                pairs: [],
                difficulty: ex.difficulty || 'media',
                explanation: meta.explicacionDiamante || ex.explanation || 'Repasa este contenido.',
                criterio_evaluacion: meta.criterio || 'Comunicación Escrita y Expresión',
                competencias: ['CP', 'CPSAA'],
                metadata: {
                    ...meta,
                    type: dbType || metaType,
                    source: 'Santillana DB',
                    is_scramble: isOrder
                }
            };

        });


        console.groupEnd();

        return {
            titulo: topic,
            descripcion: `Santillana Go Far! 4 - ${topic}`,
            asignatura: 'Inglés',
            curso: '4º Primaria',
            ejercicios: cleanExercises,
            generadoPor: 'Santillana Gold Engine',
            metadatos: { quarantineMode: true },
            fecha: new Date().toISOString()
        };
    }

    // =================================================================================
    // ⬇️ LÓGICA HÍBRIDA (Generadores Deterministas) - DESACTIVADA PARA 4º PRIMARIA
    // ==========================================
    const curso = config.profile?.grade_level || '4º Primaria';
    if (curso === '4º Primaria') {
        console.warn("⚠️ [PURGE] Intento de usar generador híbrido en 4º Primaria bloqueado.");
        return await generarFichaInglesCompleta({ ...config, topic: topic || 'Unit 1: Back to school' });
    }

    const { tipos = ['vocabulary'], dificultad = 'medio', categoria } = config;

    console.log(`🛠️ [ENGLISH] Generando modo Determinista: tipos=[${tipos}], dificultad=${dificultad}`);

    // Resetear estados
    resetVocab();
    resetTrans();
    resetMixed();
    resetPres();

    const ejercicios = [];
    for (let i = 0; i < numQuestions; i++) {
        const tipoActual = tipos[i % tipos.length];
        const generador = GENERADORES[tipoActual];

        if (generador) {
            try {
                // El generador de vocabulario acepta categoría
                const ej = tipoActual === 'vocabulary'
                    ? generador(dificultad, categoria)
                    : generador(dificultad);

                if (ej) {
                    ejercicios.push({
                        ...ej,
                        id: ej.id || `det_${i}`,
                        id_pregunta: ej.id || `det_${i}`
                    });
                }
            } catch (err) {
                console.error(`Error en generador ${tipoActual}:`, err);
            }
        }
    }

    return {
        titulo: topic || 'English Challenge',
        descripcion: `Ficha de Inglés - 4º Primaria`,
        asignatura: 'Inglés',
        curso: '4º Primaria',
        ejercicios: ejercicios,
        generadoPor: 'Deterministic English Engine v2.0',
        fecha: new Date().toISOString()
    };

}

export function obtenerTiposDisponibles() {
    return Object.keys(GENERADORES);
}

export function obtenerConfiguracionesPredefinidas() {
    return CONFIGURACIONES_PREDEFINIDAS;
}

export default {
    generarFichaInglesCompleta,
    obtenerTiposDisponibles,
    obtenerConfiguracionesPredefinidas
};
