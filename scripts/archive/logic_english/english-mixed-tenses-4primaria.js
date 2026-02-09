/**
 * GENERADOR DE MIXED TENSES CHALLENGE - 4º PRIMARIA
 * 
 * Mezcla inteligente de Tiempos Verbales:
 * - Present Simple (Every day, always)
 * - Present Continuous (Now, at the moment)
 * - Past Simple (Yesterday, last week)
 * 
 * El alumno debe decidir el tiempo correcto basándose en la "Signal Word".
 */

import { generarPresentSimple } from './english-present-simple-4primaria.js';
import { generarPresentContinuous } from './english-present-continuous-4primaria.js';
import { generarPastSimpleVerbs } from './english-past-simple-verbs-4primaria.js';
import { generarIdentificadorUnico } from './english-utils.js';

// ==========================================
// DATOS: PALABRAS CLAVE (SIGNAL WORDS)
// ==========================================

const SIGNALS = {
    present_simple: ['Every day', 'Always', 'Usually', 'On Mondays', 'Sometimes', 'Never', 'Every morning'],
    present_continuous: ['Now', 'At the moment', 'Right now', 'Look!', 'Listen!', 'Today'],
    past_simple: ['Yesterday', 'Last week', 'Last night', 'In 2010', 'Two days ago', 'Last year']
};

const VERBS = [
    { base: 'play', ps: 'plays', pc: 'playing', past: 'played' },
    { base: 'watch', ps: 'watches', pc: 'watching', past: 'watched' },
    { base: 'eat', ps: 'eats', pc: 'eating', past: 'ate' },
    { base: 'go', ps: 'goes', pc: 'going', past: 'went' },
    { base: 'study', ps: 'studies', pc: 'studying', past: 'studied' },
    { base: 'read', ps: 'reads', pc: 'reading', past: 'read' },
    { base: 'write', ps: 'writes', pc: 'writing', past: 'wrote' },
    { base: 'run', ps: 'runs', pc: 'running', past: 'ran' },
    { base: 'sleep', ps: 'sleeps', pc: 'sleeping', past: 'slept' }
];

const SUBJECTS = ['I', 'You', 'He', 'She', 'We', 'They', 'My friend', 'The cat'];

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==========================================
// GENERADOR DE PREGUNTAS (MIXED)
// ==========================================

function generarMixedTenseQuestion() {
    // 1. Elegir un tiempo objetivo aleatorio
    const tenseType = getRandomItem(['present_simple', 'present_continuous', 'past_simple']);
    const verb = getRandomItem(VERBS);
    const subject = getRandomItem(SUBJECTS);
    const signal = getRandomItem(SIGNALS[tenseType]);

    let question = "";
    let correct = "";
    let options = [];
    let explanation = "";

    // Construir la forma verbal correcta según sujeto y tiempo
    let verbForm = "";

    // LÓGICA DE CONJUGACIÓN
    if (tenseType === 'present_simple') {
        // Needs 3rd person conjugation check
        if (['He', 'She', 'My friend', 'The cat'].includes(subject)) {
            verbForm = verb.ps; // plays
        } else {
            verbForm = verb.base; // play
        }
    } else if (tenseType === 'present_continuous') {
        // Needs BE + ING
        let be = 'am';
        if (['He', 'She', 'My friend', 'The cat'].includes(subject)) be = 'is';
        if (['You', 'We', 'They'].includes(subject)) be = 'are';
        verbForm = `${be} ${verb.pc}`;
    } else if (tenseType === 'past_simple') {
        verbForm = verb.past;
    }

    // CONSTRUIR PREGUNTA
    // Structure: Signal + Subject + ____ + ... OR Subject + ____ + ... + Signal
    const structure = Math.random() > 0.5 ? 'start' : 'end';

    if (structure === 'start') {
        question = `${signal}, ${subject} _______ football.`; // Generic complement for simplicity or need specific?
        // Let's attach complements or keep it simple.
        // Better: Use specific complements per verb if possible, but for mixed drill, the focus is the Verb Form.
        // Let's use a placeholder complement related to verb to avoid nonsense.
        // Simplification: just use (...) or simple complement.
        const comp = getComplement(verb.base);
        question = `${signal}, ${subject} _______ ${comp}.`;
    } else {
        const comp = getComplement(verb.base);
        question = `${subject} _______ ${comp} ${signal.toLowerCase()}.`;
    }

    correct = verbForm;

    // GENERAR DISTRACTORES INTELIGENTES
    // 1. Wrong Tense 1
    // 2. Wrong Tense 2
    // 3. Wrong Conjugation (e.g. 'playing' without 'is', or 'plays' for 'I')

    let distractor1, distractor2, distractor3;

    // Distractor 1: Present Simple form (if target is not PS, or wrong person if target IS PS)
    if (tenseType === 'present_simple') {
        // Distractor: Continuous form
        if (['He', 'She'].includes(subject)) distractor1 = `is ${verb.pc}`;
        else distractor1 = `am ${verb.pc}`;
        // Or just bare 'playing' which is a common error
        distractor2 = verb.pc; // playing
        distractor3 = verb.past; // played
    } else if (tenseType === 'present_continuous') {
        // Distractor: Simple form
        distractor1 = verb.base; // play
        if (['He', 'She'].includes(subject)) distractor2 = verb.ps; // plays
        else distractor2 = `${verb.base}s`; // wrong fake conjugation
        distractor3 = verb.past; // played
    } else { // Past Simple
        // Distractor: Present
        distractor1 = verb.base; // play
        if (['He', 'She'].includes(subject)) distractor2 = verb.ps; // plays
        else distractor2 = `is ${verb.pc}`; // is playing
        distractor3 = verb.pc; // playing
    }

    // Clean up duplicates in options
    const rawOptions = [correct, distractor1, distractor2, distractor3 || 'play'];
    const uniqueOptions = [...new Set(rawOptions)].filter(o => o !== undefined);

    // Ensure we have at least 3 options
    while (uniqueOptions.length < 3) {
        uniqueOptions.push('plays'); // fallback
    }

    options = shuffleArray(uniqueOptions).slice(0, 4);

    // EXPLICACIÓN
    if (tenseType === 'present_simple') {
        explanation = `Usamos Present Simple para rutinas. Pista: "${signal}".`;
    } else if (tenseType === 'present_continuous') {
        explanation = `Usamos Present Continuous para acciones AHORA. Pista: "${signal}".`;
    } else {
        explanation = `Usamos Past Simple para acciones acabadas. Pista: "${signal}".`;
    }

    return {
        id: generarIdentificadorUnico(),
        tipo: 'grammar',
        subtipo: 'mixed_tenses',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma correcta: "${question}"`,
        opciones: options,
        correcta: correct,
        explicacion: explanation,
        dificultad: 'medio', // Mixed is inherently medium/hard
        gramatica: 'mixed_tenses',
        feedback_card: {
            title: "Guía de Tiempos",
            rules: [
                { label: "RUTINA", explanation: "Every day, Always -> Play/Plays", icon: "📅" },
                { label: "AHORA", explanation: "Now, At the moment -> Is/Are Playing", icon: "⚡" },
                { label: "PASADO", explanation: "Yesterday, Last week -> Played/Went", icon: "🔙" }
            ],
            info: "Busca la 'Palabra Pista' (Signal Word) para saber qué tiempo usar."
        }
    };
}

function getComplement(verb) {
    const map = {
        'play': 'football',
        'watch': 'TV',
        'eat': 'pizza',
        'go': 'to school',
        'study': 'Maths',
        'read': 'a book',
        'write': 'a letter',
        'run': 'in the park',
        'sleep': 'in the bed'
    };
    return map[verb] || 'it';
}

// ==========================================
// EXPORT
// ==========================================

export function generarMixedTenses(nivel) {
    // Nivel can adjust complexity, but for now we keep it standard mixed logic
    // Facil could expose clearer signals. Dificil could remove signals?
    // Let's stick to standard mechanic for now.

    for (let i = 0; i < 10; i++) {
        const ex = generarMixedTenseQuestion();
        const key = `${ex.pregunta}|${ex.correcta}`;
        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }
    return generarMixedTenseQuestion();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}
