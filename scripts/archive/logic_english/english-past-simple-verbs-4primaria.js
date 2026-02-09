/**
 * GENERADOR DE PAST SIMPLE (VERBOS DE ACCIÓN) - 4º/5º PRIMARIA
 * 
 * Cubre:
 * 1. Verbos Regulares (+ed): play-played, watch-watched
 * 2. Verbos Irregulares Básicos: go-went, see-saw, eat-ate
 * 3. Afirmativa, Negativa y Preguntas (Did...)
 * 4. Time expressions: yesterday, last week, 2 days ago.
 */

import vocabularyData from '../data/english-4primaria.json' with { type: 'json' };

// ==========================================
// DATOS
// ==========================================

// Lista base de verbos clave para Primaria
const VERBS = [
    // Regulares
    { inf: 'play', past: 'played', es: 'jugar', type: 'reg' },
    { inf: 'watch', past: 'watched', es: 'mirar/ver', type: 'reg' },
    { inf: 'visit', past: 'visited', es: 'visitar', type: 'reg' },
    { inf: 'listen', past: 'listened', es: 'escuchar', type: 'reg' },
    { inf: 'cook', past: 'cooked', es: 'cocinar', type: 'reg' },
    { inf: 'walk', past: 'walked', es: 'caminar', type: 'reg' },
    { inf: 'paint', past: 'painted', es: 'pintar', type: 'reg' },

    // Irregulares (Top priority for Primary)
    { inf: 'go', past: 'went', es: 'ir', type: 'irreg' },
    { inf: 'see', past: 'saw', es: 'ver', type: 'irreg' },
    { inf: 'eat', past: 'ate', es: 'comer', type: 'irreg' },
    { inf: 'have', past: 'had', es: 'tener', type: 'irreg' },
    { inf: 'do', past: 'did', es: 'hacer', type: 'irreg' },
    { inf: 'buy', past: 'bought', es: 'comprar', type: 'irreg' },
    { inf: 'make', past: 'made', es: 'hacer/fabricar', type: 'irreg' },
    { inf: 'come', past: 'came', es: 'venir', type: 'irreg' }
];

const TIME_EXPRESSIONS = [
    { en: 'yesterday', es: 'ayer' },
    { en: 'last week', es: 'la semana pasada' },
    { en: 'last night', es: 'anoche' },
    { en: 'last summer', es: 'el verano pasado' },
    { en: 'two days ago', es: 'hace dos días' }
];

const SUBJECTS = ['I', 'You', 'He', 'She', 'We', 'They', 'My friend', 'The dog'];

let ejerciciosUsados = new Set();

// ==========================================
// HELPERS
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
// NIVEL FÁCIL: REGULAR vs IRREGULAR ID
// ==========================================

function generarPastFormChoice() {
    const v = getRandomItem(VERBS);
    const sub = getRandomItem(SUBJECTS);
    const time = getRandomItem(TIME_EXPRESSIONS);

    // Frase afirmativa
    const sentence = `${sub} ___ (${v.inf}) ${time.en}.`;

    // Distractores
    const dist1 = v.inf + 'ed'; // Trampa para irregulares (go -> goed)
    const dist2 = v.inf + 's';  // Presente
    const dist3 = v.inf + 'ing'; // Continuo

    // Si es regular, la trampa v.inf+'ed' es la correcta, así que generamos otra trampa
    let opciones;
    if (v.type === 'reg') {
        opciones = [v.past, v.inf, v.inf + 's', v.inf + 'ing'];
    } else {
        opciones = [v.past, v.inf + 'ed', v.inf, v.inf + 's']; // 'goed', 'eated' son trampas muy buenas
    }

    // Generate Feedback Map
    const feedbackMap = {};

    // Logic for feedback based on distractors
    const isRegular = v.type === 'reg';

    // 1. Distractor: irregular + ed (goed)
    if (!isRegular) {
        feedbackMap[v.inf + 'ed'] = `¡Cuidado! "${v.inf}" es un verbo irregular, no sigue la regla de añadir -ed.`;
    }

    // 2. Distractor: Present Simple + s (plays/goes)
    feedbackMap[v.inf + 's'] = `Esa terminación (-s) se usa para el Presente, no para el Pasado.`;
    if (v.inf.endsWith('o')) feedbackMap[v.inf + 'es'] = `Esa terminación (-es) se usa para el Presente, no para el Pasado.`;

    // 3. Distractor: Gerund (playing/going)
    feedbackMap[v.inf + 'ing'] = `La terminación -ing es para "estar haciendo" (Continuo), no para el Pasado Simple.`;

    // 4. Distractor: Base form (play/go)
    feedbackMap[v.inf] = `"${v.inf}" es la forma base (infinitivo). Para hablar de "ayer", necesitas el Pasado.`;

    return {
        tipo: 'grammar',
        subtipo: 'past_simple_form',
        question_type: 'multiple_choice',
        pregunta: `Elige el pasado correcto: "${sentence}"`,
        opciones: shuffleArray(opciones),
        correcta: v.past,
        feedback_map: feedbackMap,
        explicacion: `El pasado de "${v.inf}" es "${v.past}" (${v.type === 'reg' ? 'Regular' : 'Irregular'}).`,
        dificultad: 'facil',
        gramatica: 'past_simple_verbs',
        scope: ['GRAMMAR_PAST_SIMPLE']
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVE & QUESTIONS (DID)
// ==========================================

function generarNegative() {
    const v = getRandomItem(VERBS);
    const sub = getRandomItem(SUBJECTS);

    // I didn't go (NOT I didn't went)
    const sentence = `${sub} ___ (${v.inf}) yesterday. (Negativo)`;
    const correct = "didn't " + v.inf;

    const dist1 = "didn't " + v.past; // Very common error: didn't went
    const dist2 = "don't " + v.inf; // Present error
    const dist3 = "not " + v.past; // "not went"

    const feedbackMap = {
        [dist1]: `¡Casi! Pero recuerda: con "didn't", el verbo vuelve a su forma base (infinitivo). No pongas el verbo en pasado dos veces.`,
        [dist2]: `"Don't" es para el Presente (hoy). Para indicar Pasado (ayer), usamos "Didn't".`,
        [dist3]: `En inglés necesitamos un verbo auxiliar para negar. No basta con poner "not". Usa "didn't".`
    };

    return {
        tipo: 'grammar',
        subtipo: 'past_simple_negative',
        question_type: 'multiple_choice',
        pregunta: `Completa en negativo: "${sentence}"`,
        opciones: shuffleArray([correct, dist1, dist2, dist3]),
        correcta: correct,
        feedback_map: feedbackMap,
        explicacion: `En negativo usamos "didn't" + Infinitivo (el verbo NO cambia).`,
        dificultad: 'medio',
        gramatica: 'past_simple_negative',
        scope: ['GRAMMAR_PAST_SIMPLE']
    };
}

function generarQuestionOrder() {
    const v = getRandomItem(VERBS);
    const sub = getRandomItem(SUBJECTS);
    const time = getRandomItem(TIME_EXPRESSIONS);

    // Did you go yesterday?
    const correct = `Did ${sub.toLowerCase()} ${v.inf} ${time.en}?`;
    const words = ['Did', sub.toLowerCase(), v.inf, ...time.en.split(' '), '?'];
    if (sub === 'I') words[1] = 'I';

    return {
        tipo: 'grammar',
        subtipo: 'past_simple_question_order',
        question_type: 'word_order',
        pregunta: `Ordena la pregunta en pasado:`,
        words: shuffleArray(words),
        correcta: correct,
        correct_variations: [correct],
        explicacion: `Estructura: Did + Sujeto + Verbo (Infinitivo) + ...?`,
        dificultad: 'medio',
        gramatica: 'past_simple_question',
        scope: ['GRAMMAR_PAST_SIMPLE']
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRANSLATION (FULL SENTENCES)
// ==========================================

function generarTraducir() {
    const v = getRandomItem(VERBS);
    const sub = getRandomItem(SUBJECTS);
    const time = getRandomItem(TIME_EXPRESSIONS);
    const isNegative = Math.random() > 0.4; // 40% negative phrases

    // Translate subjects simply
    let subEs = sub === 'I' ? 'Yo' : (sub === 'She' ? 'Ella' : (sub === 'He' ? 'Él' : (sub === 'We' ? 'Nosotros' : (sub === 'They' ? 'Ellos' : sub))));
    if (sub === 'You') subEs = 'Tú';
    if (sub === 'My friend') subEs = 'Mi amigo';
    if (sub === 'The dog') subEs = 'El perro';

    let es, en;

    if (isNegative) {
        // Yo no fui ayer
        es = `${subEs} no ${v.es.split('/')[0]} ${time.es}`; // Simplificar 'ver/mirar' a 'ver'
        // Fix spanish verb conjugation approx (hard to do perfectly automatically, but readable context)
        // Let's use generic past indicator: "Yo no comí ayer"
        // Heuristic: "no [verbo]" works ok for prompts, but better: "no comió/jugó"
        // Let's keep it simple: "Translate: Yo no [infinitivo] ayer" -> Student understands past context from prompt
        es = `${subEs} no ${v.es.split('/')[0]} (pasado) ${time.es}`;

        en = `${sub} didn't ${v.inf} ${time.en}`;
    } else {
        // Yo fui ayer
        es = `${subEs} ${v.es.split('/')[0]} (pasado) ${time.es}`;
        en = `${sub} ${v.past} ${time.en}`;
    }

    return {
        tipo: 'grammar',
        subtipo: 'past_simple_translate',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${es}"`,
        correcta: en,
        accept_variations: [en, en + '.', en.replace("didn't", 'did not')],
        case_sensitive: false,
        explicacion: `Respuesta: ${en}`,
        dificultad: 'dificil',
        gramatica: 'past_simple_translate',
        scope: ['GRAMMAR_PAST_SIMPLE']
    };
}

// ==========================================
// EXPORT
// ==========================================

export function generarPastSimpleVerbs(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarPastFormChoice, peso: 100 }
        ],
        medio: [
            { func: generarNegative, peso: 50 },
            { func: generarQuestionOrder, peso: 50 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    // Anti-repeat
    let selectedFunc = tipos[0].func;
    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) {
            selectedFunc = t.func;
            break;
        }
    }

    for (let i = 0; i < 10; i++) {
        const ex = selectedFunc();
        const key = `${ex.pregunta}|${ex.correcta}`;
        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }
    return selectedFunc();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarPastSimpleVerbs,
    resetearEjerciciosUsados
};
