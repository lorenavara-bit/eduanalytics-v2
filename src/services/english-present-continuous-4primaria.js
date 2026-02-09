/**
 * GENERADOR DE PRESENT CONTINUOUS - 4º PRIMARIA
 * 
 * Cubre:
 * - Afirmativo (I am playing, She is playing)
 * - Negativo (I am not playing, She isn't playing)
 * - Interrogativo (Are you playing?, Is she playing?)
 * - Reglas de gerundio (-ing rules):
 *   1. General: +ing (play -> playing)
 *   2. Silent 'e': remove 'e' + ing (dance -> dancing, make -> making)
 *   3. CVC (Consonant-Vowel-Consonant): double consonant + ing (run -> running, swim -> swimming)
 */

import vocabularyData from '../data/english-4primaria.json';

// ==========================================
// DATOS: VERBOS Y SUJETOS
// ==========================================

const SUBJECTS = {
    first_person_singular: { pronoun: 'I', spanish: 'Yo', auxiliary: 'am' },
    second_person: { pronoun: 'You', spanish: 'Tú', auxiliary: 'are' },
    third_person_singular_he: { pronoun: 'He', spanish: 'Él', auxiliary: 'is' },
    third_person_singular_she: { pronoun: 'She', spanish: 'Ella', auxiliary: 'is' },
    third_person_singular_it: { pronoun: 'It', spanish: 'Ello', auxiliary: 'is' },
    first_person_plural: { pronoun: 'We', spanish: 'Nosotros', auxiliary: 'are' },
    third_person_plural: { pronoun: 'They', spanish: 'Ellos', auxiliary: 'are' }
};

function getDynamicVerbs() {
    const verbs = [
        // Rule 1: General (+ing)
        { infinitive: 'play', gerund: 'playing', rule: 'general', spanish: 'jugando', complements: ['football', 'tennis', 'games'] },
        { infinitive: 'read', gerund: 'reading', rule: 'general', spanish: 'leyendo', complements: ['a book', 'a comic', 'the news'] },
        { infinitive: 'cook', gerund: 'cooking', rule: 'general', spanish: 'cocinando', complements: ['dinner', 'pasta', 'lunch'] },
        { infinitive: 'watch', gerund: 'watching', rule: 'general', spanish: 'viendo', complements: ['TV', 'a film', 'cartoons'] },
        { infinitive: 'listen', gerund: 'listening', rule: 'general', spanish: 'escuchando', complements: ['to music', 'to the radio'] },
        { infinitive: 'clean', gerund: 'cleaning', rule: 'general', spanish: 'limpiando', complements: ['the house', 'my room', 'the car'] },
        { infinitive: 'sleep', gerund: 'sleeping', rule: 'general', spanish: 'durmiendo', complements: ['in the bed', 'on the sofa', 'now'] },
        { infinitive: 'study', gerund: 'studying', rule: 'general', spanish: 'estudiando', complements: ['English', 'maths', 'for the exam'] },
        { infinitive: 'eat', gerund: 'eating', rule: 'general', spanish: 'comiendo', complements: ['an apple', 'pizza', 'breakfast'] },

        // Rule 2: Silent 'e' (remove e + ing)
        { infinitive: 'dance', gerund: 'dancing', rule: 'silent_e', spanish: 'bailando', complements: ['in the party', 'ballet', 'salsa'] },
        { infinitive: 'write', gerund: 'writing', rule: 'silent_e', spanish: 'escribiendo', complements: ['a letter', 'an email', 'a story'] },
        { infinitive: 'make', gerund: 'making', rule: 'silent_e', spanish: 'haciendo', complements: ['a cake', 'the bed', 'noise'] },
        { infinitive: 'ride', gerund: 'riding', rule: 'silent_e', spanish: 'montando', complements: ['a bike', 'a horse'] },
        { infinitive: 'drive', gerund: 'driving', rule: 'silent_e', spanish: 'conduciendo', complements: ['a car', 'a bus', 'fast'] },

        // Rule 3: CVC (double consonant)
        { infinitive: 'run', gerund: 'running', rule: 'double_consonant', spanish: 'corriendo', complements: ['in the park', 'fast', 'a marathon'] },
        { infinitive: 'swim', gerund: 'swimming', rule: 'double_consonant', spanish: 'nadando', complements: ['in the pool', 'in the sea'] },
        { infinitive: 'sit', gerund: 'sitting', rule: 'double_consonant', spanish: 'sentándose', complements: ['on the chair', 'on the floor'] },
        { infinitive: 'put', gerund: 'putting', rule: 'double_consonant', spanish: 'poniendo', complements: ['the book on the table', 'on my shoes'] }
    ];

    // Enhance complements with vocabulary
    verbs.forEach(v => {
        if (v.infinitive === 'eat' && vocabularyData.vocabulary['food']) {
            vocabularyData.vocabulary['food'].forEach(f => { if (!v.complements.includes(f.english)) v.complements.push(f.english); });
        }
        if (v.infinitive === 'drive' && vocabularyData.vocabulary['transport']) {
            vocabularyData.vocabulary['transport'].forEach(t => {
                const comp = `a ${t.english}`.replace('a a', 'an a'); // simple fix check
                if (!v.complements.includes(comp)) v.complements.push(comp);
            });
        }
        if (v.infinitive === 'ride' && vocabularyData.vocabulary['transport']) {
            // ride bike, motorbike, horse. Not car.
            const rideables = ['bike', 'motorbike', 'horse'];
            vocabularyData.vocabulary['transport'].forEach(t => {
                if (rideables.includes(t.english)) v.complements.push(`a ${t.english}`);
            });
        }
    });

    return verbs;
}

const VERBS = getDynamicVerbs();

// Helper: Obtener complemento coherente
function getComplement(verb) {
    if (verb.complements && verb.complements.length > 0) {
        return getRandomItem(verb.complements);
    }
    return 'now';
}

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
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
// NIVEL FÁCIL
// ==========================================

/**
 * FÁCIL: Identificar el gerundio correcto (Spelling)
 * Focus: Reglas de -ing
 */
function generarSpellingChoice() {
    // Filtramos verbos interesantes (con reglas especiales)
    const verb = getRandomItem(VERBS);

    // Generamos distractores basados en errores comunes
    let options = [verb.gerund];

    // Distractor 1: Añadir solo ing sin quitar e (danceing) o sin doblar (runing)
    if (verb.rule === 'silent_e') {
        options.push(verb.infinitive + 'ing'); // danceing
    } else if (verb.rule === 'double_consonant') {
        options.push(verb.infinitive + 'ing'); // runing
    } else {
        // En general, quitar una letra (playng) o doblar cuando no toca (cookking)
        if (verb.infinitive.length > 3) options.push(verb.infinitive.slice(0, -1) + 'ing');
        else options.push(verb.infinitive + verb.infinitive.slice(-1) + 'ing');
    }

    // Distractor 2: Infinitivo
    options.push(verb.infinitive);

    // Rellenar hasta 3 o 4
    if (options.length < 3) options.push(verb.infinitive + 's');

    return {
        tipo: 'grammar',
        subtipo: 'present_continuous_spelling',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma correcta del gerundio (-ing) para: "${verb.infinitive}"`,
        opciones: shuffleArray(options),
        correcta: verb.gerund,
        explicacion: `Se escribe "${verb.gerund}". Regla: ${getRuleExplanation(verb.rule)}`,
        dificultad: 'facil',
        gramatica: 'present_continuous_gerund',
        scope: ['GRAMMAR_PRESENT_CONTINUOUS']
    };
}

function getRuleExplanation(rule) {
    if (rule === 'silent_e') return 'Si acaba en "e", quitamos la "e" y añadimos -ing.';
    if (rule === 'double_consonant') return 'Si acaba en Consonante-Vocal-Consonante, doblamos la última letra.';
    return 'Añadimos -ing al verbo.';
}

/**
 * FÁCIL: Completar con Am/Is/Are + Verbo-ing
 */
function generarCompletarAfirmativo() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const sentence = `${subject.pronoun} ___ ${verb.gerund} ${complement}.`;
    const correctAnswer = subject.auxiliary;

    // Options: am, is, are
    const options = ['am', 'is', 'are'];

    return {
        tipo: 'grammar',
        subtipo: 'present_continuous_be',
        question_type: 'multiple_choice',
        pregunta: `Completa con el verbo To Be correcto: "${sentence}"`,
        opciones: shuffleArray(options),
        correcta: correctAnswer,
        explicacion: `${subject.pronoun} va con "${correctAnswer}".`,
        dificultad: 'facil',
        gramatica: 'present_continuous_affirmative',
        scope: ['GRAMMAR_PRESENT_CONTINUOUS']
    };
}

// ==========================================
// NIVEL MEDIO
// ==========================================

/**
 * MEDIO: Formar negativo o elegir negativo correcto
 */
function generarFormarNegativo() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const fullAuxNeg = subject.auxiliary === 'am' ? 'am not' : (subject.auxiliary + "n't"); // isn't, aren't
    const sentence = `${subject.pronoun} ${fullAuxNeg} ${verb.gerund} ${complement}.`;

    // Generamos una frase afirmativa para pedir su negativo
    const affirmative = `${subject.pronoun} ${subject.auxiliary} ${verb.gerund} ${complement}.`;

    return {
        tipo: 'grammar',
        subtipo: 'present_continuous_negative',
        question_type: 'multiple_choice',
        pregunta: `Elige el negativo correcto de: "${affirmative}"`,
        opciones: shuffleArray([
            sentence, // Correcta
            `${subject.pronoun} not ${subject.auxiliary} ${verb.gerund} ${complement}.`, // Incorrect order
            `${subject.pronoun} no ${verb.gerund} ${complement}.`, // Spanglish
            `${subject.pronoun} ${subject.auxiliary} not ${verb.gerund} ${complement}.` // Correct but specific contraction logic preferred usually, keeping full form ok
            // To avoid ambiguity if contraction is not provided, make sure options are distinct.
        ]),
        correcta: sentence,
        correct_variations: [`${subject.pronoun} ${subject.auxiliary} not ${verb.gerund} ${complement}.`], // Allow full not
        explicacion: `Negativo: ${sentence}`,
        dificultad: 'medio',
        gramatica: 'present_continuous_negative',
        scope: ['GRAMMAR_PRESENT_CONTINUOUS']
    };
}

/**
 * MEDIO: Ordenar frase (Preguntas o Afirmativas)
 */
function generarOrdenarFrase() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);
    const isQuestion = Math.random() > 0.5;

    let correctAnswer, words;

    if (isQuestion) {
        // Are you playing?
        correctAnswer = `${capitalize(subject.auxiliary)} ${subject.pronoun.toLowerCase()} ${verb.gerund} ${complement}?`;
        words = [capitalize(subject.auxiliary), subject.pronoun.toLowerCase(), verb.gerund, complement + '?'];
    } else {
        // I am playing.
        correctAnswer = `${subject.pronoun} ${subject.auxiliary} ${verb.gerund} ${complement}.`;
        words = [subject.pronoun, subject.auxiliary, verb.gerund, complement + '.'];
    }

    return {
        tipo: 'grammar',
        subtipo: 'present_continuous_ordenar',
        question_type: 'word_order',
        pregunta: `Ordena las palabras ${isQuestion ? '(Pregunta)' : '(Afirmativa)'}:`,
        words: shuffleArray(words),
        correcta: correctAnswer,
        correct_variations: [correctAnswer],
        explicacion: `Solución: ${correctAnswer}`,
        dificultad: 'medio',
        gramatica: 'present_continuous_structure',
        scope: ['GRAMMAR_PRESENT_CONTINUOUS']
    };
}

// ==========================================
// NIVEL DIFÍCIL
// ==========================================

/**
 * DIFÍCIL: Escribir frase completa (Traducción o desde infinitivo)
 * "Yo estoy comiendo pizza" -> "I am eating pizza"
 */
function generarTraducir() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    // Simplificamos la traducción del complemento si es complejo, 
    // pero idealmente deberíamos tener traducciones. 
    // Usaremos un mapeo básico o estructura fija para evitar errores.
    // Para simplificar ahora, damos el vocabulario del complemento si es difícil.

    // Generar prompt
    // Conjugate Estar for Spanish prompt
    const sPro = subject.pronoun;
    let estarEs = 'está'; // default
    if (sPro === 'I') estarEs = 'estoy';
    if (sPro === 'You') estarEs = 'estás';
    if (sPro === 'We') estarEs = 'estamos';
    if (sPro === 'They') estarEs = 'están';

    // Generar prompt
    const preguntaSpanish = `${subject.spanish} ${estarEs} ${verb.spanish} ${complement} (ahora).`;
    const correctAnswer = `${subject.pronoun} ${subject.auxiliary} ${verb.gerund} ${complement}`;

    return {
        tipo: 'grammar',
        subtipo: 'present_continuous_traducir',
        question_type: 'text_input',
        pregunta: `Escribe esta frase en Presente Continuo: "${preguntaSpanish}"`,
        correcta: correctAnswer,
        accept_variations: [correctAnswer, correctAnswer + '.', correctAnswer + ' now', correctAnswer + ' now.'], // Aceptar variantes
        case_sensitive: false,
        explicacion: `Respuesta: ${correctAnswer}`,
        dificultad: 'dificil',
        gramatica: 'present_continuous_translation',
        scope: ['GRAMMAR_PRESENT_CONTINUOUS']
    };
}


function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarPresentContinuous(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarSpellingChoice, peso: 50 },
            { func: generarCompletarAfirmativo, peso: 50 }
        ],
        medio: [
            { func: generarFormarNegativo, peso: 50 },
            { func: generarOrdenarFrase, peso: 50 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    // Selección ponderada
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

    // Loop anti-repetición
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
    generarPresentContinuous,
    resetearEjerciciosUsados
};
