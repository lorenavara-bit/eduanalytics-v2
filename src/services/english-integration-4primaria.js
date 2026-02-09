import { supabase } from '../supabaseClient';

// Importación de Generadores Deterministas
import { generarVocabulary, resetearVocabularioUsado } from './english-vocabulary-4primaria.js';
import { generarTranslation, resetearTraduccionesUsadas } from './english-translation-challenge-4primaria.js';
import { generarMixedTenses, resetearEjerciciosUsados as resetMixed } from './english-mixed-tenses-4primaria.js';
import { generarPresentSimple, resetearPresenteUsado } from './english-present-simple-4primaria.js';
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
    vocabulary: generarVocabulary,
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
            throw new Error(`🚫 CONTENIDO NO DISPONIBLE: No hay ejercicios oficiales para "${topic}" en la DB. Cárgalos vía AdminPanel.`);
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
            const text = (ex.question_text || '');
            const lowerText = text.toLowerCase();
            const dbType = (ex.question_type || '').toLowerCase(); // Nuevo: Prioridad columna DB
            const metaType = (ex.metadata?.tipo || '').toLowerCase();

            // Detección inteligente de Tipos VIP
            const isOrder = dbType === 'word_order' || metaType.includes('order') || lowerText.includes('order') || lowerText.includes('orden');
            const normalizedText = text.replace(/_{3,}/g, '___');
            const hasGaps = normalizedText.includes('___');
            const hasOptions = /\((\w+)\/(\w+)\)/.test(normalizedText);
            const hasVerbBracket = /\(\w+\)/.test(normalizedText) && !hasOptions;

            let isFillBlanks = dbType === 'fill_blanks' || hasGaps || hasOptions || hasVerbBracket;
            let uiType = dbType || 'text_input'; // Por defecto usamos el tipo de la DB
            let words = [];
            let displayText = normalizedText;

            // 1. LÓGICA WORD ORDER
            if (isOrder) {
                uiType = 'word_order';
                if (text.includes('/')) {
                    const cleanText = text.replace(/^(order|orden|ordena):\s*/i, '');
                    words = cleanText.split('/').map(w => w.trim());
                } else {
                    const answer = ex.correct_answer || '';
                    words = answer.split(' ').filter(w => w.length > 0).sort(() => Math.random() - 0.5);
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
                    const rawBank = ex.metadata?.word_bank || ex.correct_answer?.split(',').map(s => s.trim()) || [];
                    words = rawBank.length > 0 ? [...rawBank] : [];

                    // 🎯 INYECCIÓN DE DISTRACTORES INTELIGENTES
                    if (words.length === 1) {
                        const correct = words[0].toLowerCase();
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
                        const prepPool = ['at', 'in', 'on', 'to', 'for', 'the'];
                        if (prepPool.includes(correct)) {
                            prepPool.filter(p => p !== correct).sort(() => Math.random() - 0.5).slice(0, 2).forEach(p => distractors.add(p));
                        }
                        distractors.forEach(d => { if (d && d !== correct) words.push(d); });
                    }
                    words = words.sort(() => Math.random() - 0.5);
                    if (hasVerbBracket) displayText = normalizedText.replace(/\(\w+\)/g, hasGaps ? '' : '___').trim();
                }
            }
            // 3. LÓGICA AUTO-MULTIPLE CHOICE (Para vocabulario sin huecos)
            else if (dbType === 'multiple_choice' || metaType.includes('vocab') || lowerText.includes('phrase:') || lowerText.includes('adverb:') || lowerText.includes('significa') || lowerText.includes('translate')) {
                uiType = 'multiple_choice';
                const correct = ex.correct_answer;

                // Si la DB ya trae opciones, las usamos
                if (ex.options && ex.options.length > 0) {
                    words = ex.options;
                } else {
                    // Sacar distractores de otras respuestas de la misma unidad
                    const otherAnswers = uniqueQuestions
                        .filter(q => q.correct_answer && q.correct_answer !== correct && q.correct_answer.length < 25)
                        .map(q => q.correct_answer.split(',')[0].trim());

                    const distractors = [...new Set(otherAnswers)].sort(() => Math.random() - 0.5).slice(0, 3);
                    words = [correct, ...distractors].sort(() => Math.random() - 0.5);
                }
            }

            // 4. LÓGICA VIP (classification, connector, voice, scanner)
            if (['classification', 'connector', 'voice', 'scanner'].includes(dbType)) {
                uiType = dbType;
                if (dbType === 'classification') {
                    displayText = text;
                    words = ex.options || []; // Buckets/Items
                }
                if (dbType === 'connector') {
                    // El componente connector espera pares en correct_answer o metadata
                    words = ex.metadata?.pairs || [];
                }
            }

            return {
                id: ex.id,
                type: uiType,
                text: displayText,
                question_text: text,
                correct_answer: ex.correct_answer,
                options: words,
                words: words, // Por compatibilidad
                items: dbType === 'classification' ? (ex.options || []) : [],
                buckets: dbType === 'classification' ? (ex.metadata?.buckets || []) : [],
                pairs: dbType === 'connector' ? (ex.metadata?.pairs || []) : [],
                difficulty: ex.difficulty || 'media',
                explanation: ex.metadata?.explicacionDiamante || ex.explanation || `Repasa la estructura de la ${unitId || 'lección'}.`,
                criterio_evaluacion: ex.metadata?.criterio || 'Comunicación Escrita y Expresión',
                competencias: ['CP', 'CPSAA'],
                metadata: {
                    ...ex.metadata,
                    unit: ex.metadata?.unit || unitId,
                    type: dbType || metaType,
                    source: 'Santillana DB',
                    is_scramble: isOrder,
                    success_pattern_id: ex.metadata?.success_pattern_id,
                    unit: unitId
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
    // ⬇️ LÓGICA HÍBRIDA (Generadores Deterministas)
    // ==========================================
    const { tipos = ['vocabulary'], dificultad = 'medio', categoria } = config;

    console.log(`🛠️ [ENGLISH] Generando modo Determinista: tipos=[${tipos}], dificultad=${dificultad}`);

    // Resetear estados
    resetearVocabularioUsado();
    resetearTraduccionesUsadas();
    resetMixed();
    resetearPresenteUsado();

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
