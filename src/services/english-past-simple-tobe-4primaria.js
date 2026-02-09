/**
 * GENERADOR DE PAST SIMPLE (TO BE) - 4º PRIMARIA
 * 
 * Cubre:
 * - Afirmativo (I was, They were)
 * - Negativo (I wasn't, They weren't)
 * - Interrogativo (Was she?, Were they?)
 * 
 * Reglas:
 * - I, He, She, It -> WAS / WASN'T
 * - You, We, They -> WERE / WEREN'T
 */

import vocabularyData from '../data/english-4primaria.json';

// ==========================================
// DATOS: SUJETOS Y CONTEXTOS
// ==========================================

const SUBJECTS = {
    singular_1: { pronoun: 'I', form: 'was', neg: 'wasn\'t', spanish: 'Yo' },
    singular_3_he: { pronoun: 'He', form: 'was', neg: 'wasn\'t', spanish: 'Él' },
    singular_3_she: { pronoun: 'She', form: 'was', neg: 'wasn\'t', spanish: 'Ella' },
    singular_3_it: { pronoun: 'It', form: 'was', neg: 'wasn\'t', spanish: 'Ello' },
    singular_3_name_m: { pronoun: 'John', form: 'was', neg: 'wasn\'t', spanish: 'John' },
    singular_3_name_f: { pronoun: 'Mary', form: 'was', neg: 'wasn\'t', spanish: 'Mary' },

    plural_1: { pronoun: 'We', form: 'were', neg: 'weren\'t', spanish: 'Nosotros' },
    plural_2: { pronoun: 'You', form: 'were', neg: 'weren\'t', spanish: 'Tú/Vosotros' },
    plural_3: { pronoun: 'They', form: 'were', neg: 'weren\'t', spanish: 'Ellos' },
    plural_3_names: { pronoun: 'Tom and Jerry', form: 'were', neg: 'weren\'t', spanish: 'Tom y Jerry' }
};

const CONTEXTS = [
    { text: 'at home yesterday', spanish: 'en casa ayer' },
    { text: 'at school last week', spanish: 'en el colegio la semana pasada' },
    { text: 'happy last night', spanish: 'feliz anoche' },
    { text: 'in the park on Sunday', spanish: 'en el parque el domingo' },
    { text: 'sad yesterday morning', spanish: 'triste ayer por la mañana' },
    { text: 'hungry', spanish: 'hambriento' },
    { text: 'cold', spanish: 'con frío' },
    { text: 'tired', spanish: 'cansado' },
    { text: 'in London last year', spanish: 'en Londres el año pasado' }
];

function getDynamicContexts() {
    const dynamicContexts = [...CONTEXTS];

    // Add Places (City)
    if (vocabularyData.vocabulary.city) {
        vocabularyData.vocabulary.city.forEach(place => {
            dynamicContexts.push({
                text: `in the ${place.english} yesterday`,
                spanish: `en el/la ${place.spanish} ayer`
            });
        });
    }

    // Add Adjectives (Feelings/Qualities)
    if (vocabularyData.adjectives) {
        const adjs = [...(vocabularyData.adjectives.feelings || []), ...(vocabularyData.adjectives.qualities || [])];
        adjs.forEach(adj => {
            dynamicContexts.push({
                text: `${adj.english} last week`,
                spanish: `${adj.spanish} la semana pasada`
            });
        });
    }

    return dynamicContexts;
}

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    if (array === CONTEXTS) {
        const fullList = getDynamicContexts();
        return fullList[Math.floor(Math.random() * fullList.length)];
    }
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubject() {
    const keys = Object.keys(SUBJECTS);
    const key = getRandomItem(keys);
    return SUBJECTS[key];
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
// NIVEL FÁCIL: WAS vs WERE
// ==========================================

/**
 * Elegir entre Was y Were para una frase afirmativa
 */
function generarWasWereChoice() {
    const subject = getRandomSubject();
    const context = getRandomItem(CONTEXTS);

    const sentence = `${subject.pronoun} ___ ${context.text}.`;
    const correct = subject.form;
    const incorrect = subject.form === 'was' ? 'were' : 'was';

    return {
        tipo: 'grammar',
        subtipo: 'past_tobe_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con Was o Were: "${sentence}"`,
        opciones: shuffleArray([correct, incorrect, 'is', 'are']), // Distractores extra de presente
        correcta: correct,
        explicacion: `"${subject.pronoun}" va con "${correct}".`,
        dificultad: 'facil',
        gramatica: 'past_simple_tobe'
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVO E INTERROGATIVO
// ==========================================

/**
 * Elegir el negativo correcto (Wasn't / Weren't)
 */
function generarNegativeChoice() {
    const subject = getRandomSubject();
    const context = getRandomItem(CONTEXTS);

    // Frase: I wasn't at home.
    const sentence = `___ ${subject.pronoun} ${context.text}? No, ${subject.pronoun.toLowerCase()} ___ composed_negative_check_skip`;
    // Mejor estructura simple de completar negativo: "I ___ happy."

    const qText = `${subject.pronoun} ___ ${context.text} (Negativo).`;
    const correct = subject.neg;
    const incorrect1 = subject.form === 'was' ? 'weren\'t' : 'wasn\'t';
    const incorrect2 = 'not ' + subject.form; // not was (error común)

    return {
        tipo: 'grammar',
        subtipo: 'past_tobe_negative',
        question_type: 'multiple_choice',
        pregunta: `Completa en negativo: "${qText}"`,
        opciones: shuffleArray([correct, incorrect1, incorrect2, subject.form]),
        correcta: correct,
        explicacion: `El negativo de "${subject.form}" es "${correct}".`,
        dificultad: 'medio',
        gramatica: 'past_simple_tobe_negative'
    };
}

/**
 * Ordenar pregunta: Was she at home?
 */
function generarOrdenarPregunta() {
    const subject = getRandomSubject();
    const context = getRandomItem(CONTEXTS);

    // Was/Were + Subject + Complement?
    const capForm = subject.form.charAt(0).toUpperCase() + subject.form.slice(1);
    const correct = `${capForm} ${subject.pronoun.toLowerCase()} ${context.text}?`;
    // Cuidado con nombres propios (John) que no deben ir en minúscula
    const subjText = (subject.pronoun === 'I' || ['John', 'Mary', 'Tom and Jerry'].includes(subject.pronoun))
        ? subject.pronoun
        : subject.pronoun.toLowerCase();

    const correccionFinal = `${capForm} ${subjText} ${context.text}?`;

    const words = [capForm, subjText, ...context.text.split(' ')];
    // Añadimos '?' al último
    words[words.length - 1] += '?';

    return {
        tipo: 'grammar',
        subtipo: 'past_tobe_question_order',
        question_type: 'word_order',
        pregunta: `Ordena para formar una pregunta:`,
        words: shuffleArray(words),
        correcta: correccionFinal,
        correct_variations: [correccionFinal],
        explicacion: `Pregunta: ${correccionFinal}`,
        dificultad: 'medio',
        gramatica: 'past_simple_tobe_question'
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN Y COMPLETAR
// ==========================================

function generarTraducir() {
    const subject = getRandomSubject();
    const context = getRandomItem(CONTEXTS);

    const es = `${subject.spanish} estaba/estuvo ${context.spanish}.`;
    // A veces 'era/fue', pero con los contextos dados (at home, happy) 'estaba' encaja casi siempre o 'era' para adjetivos.
    // Simplificamos: "Yo estuve en casa"
    const en = `${subject.pronoun} ${subject.form} ${context.text}`;

    return {
        tipo: 'grammar',
        subtipo: 'past_tobe_translate',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${subject.spanish} ${subject.form === 'was' ? 'estaba/era' : 'estaban/eran'} ${context.spanish}"`,
        correcta: en,
        accept_variations: [en, en + '.'],
        case_sensitive: false,
        explicacion: `Respuesta: ${en}`,
        dificultad: 'dificil',
        gramatica: 'past_simple_tobe_translation'
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarPastSimpleToBe(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarWasWereChoice, peso: 100 }
        ],
        medio: [
            { func: generarNegativeChoice, peso: 50 },
            { func: generarOrdenarPregunta, peso: 50 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    let selectedFunc = tipos[0].func;

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
    generarPastSimpleToBe,
    resetearEjerciciosUsados
};
