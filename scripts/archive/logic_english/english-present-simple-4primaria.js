/**
 * GENERADOR DE PRESENT SIMPLE - 4º PRIMARIA
 * 
 * Cubre:
 * - Afirmativo (I play, She plays)
 * - Negativo (I don't play, She doesn't play)
 * - Interrogativo (Do you play?, Does she play?)
 * - 3 niveles de dificultad reales
 * - 3 niveles de dificultad reales
 */

import vocabularyData from '../data/english-4primaria.json' with { type: 'json' };

// ==========================================
// DATOS: VERBOS Y SUJETOS
// ==========================================

const SUBJECTS = {
    first_person_singular: { pronoun: 'I', spanish: 'Yo', auxiliary: 'do' },
    second_person: { pronoun: 'You', spanish: 'Tú', auxiliary: 'do' },
    third_person_singular: { pronoun: 'He', spanish: 'Él', auxiliary: 'does' },
    third_person_singular_she: { pronoun: 'She', spanish: 'Ella', auxiliary: 'does' },
    third_person_singular_it: { pronoun: 'It', spanish: 'Ello', auxiliary: 'does' },
    first_person_plural: { pronoun: 'We', spanish: 'Nosotros', auxiliary: 'do' },
    third_person_plural: { pronoun: 'They', spanish: 'Ellos', auxiliary: 'do' }
};

// Helper to get verbs from JSON if available, else static
function getDynamicVerbs() {
    // Start with core static list which has robust conjugation logic (thirdPerson)
    const verbs = [
        { infinitive: 'play', spanish: 'jugar', thirdPerson: 'plays', complements: ['football', 'basketball', 'tennis', 'videogames'] },
        { infinitive: 'study', spanish: 'estudiar', thirdPerson: 'studies', complements: ['English', 'Spanish', 'Maths', 'Science'] },
        { infinitive: 'work', spanish: 'trabajar', thirdPerson: 'works', complements: ['at home', 'at school', 'in an office', 'every day'] },
        { infinitive: 'live', spanish: 'vivir', thirdPerson: 'lives', complements: ['in Madrid', 'in London', 'in Spain', 'in a house'] },
        { infinitive: 'like', spanish: 'gustar', thirdPerson: 'likes', complements: ['pizza', 'chocolate', 'music', 'sports'] },
        { infinitive: 'watch', spanish: 'ver', thirdPerson: 'watches', complements: ['TV', 'films', 'videos', 'YouTube', 'the stars', 'the moon'] },
        { infinitive: 'study', spanish: 'estudiar', thirdPerson: 'studies', complements: ['English', 'Spanish', 'Maths', 'Science', 'the planets', 'space'] },
        { infinitive: 'go', spanish: 'ir', thirdPerson: 'goes', complements: ['to school', 'to work', 'home', 'to the park', 'to the moon'] },
        { infinitive: 'have', spanish: 'tener', thirdPerson: 'has', complements: ['a dog', 'a cat', 'breakfast', 'two brothers'] }
    ];

    // Enhance complements with dynamic vocabulary
    const enhanceComplements = (vb, cat) => {
        if (vocabularyData.vocabulary[cat]) {
            vocabularyData.vocabulary[cat].forEach(w => {
                if (!vb.complements.includes(w.english)) {
                    vb.complements.push(w.english);
                }
            });
        }
    };

    // Link verbs to new vocab categories
    verbs.forEach(v => {
        if (v.infinitive === 'eat' && vocabularyData.vocabulary['food']) enhanceComplements(v, 'food');
        if (v.infinitive === 'drink' && vocabularyData.vocabulary['food']) enhanceComplements(v, 'food'); // Filter liquids? Simplified: assume food/drink mix is ok for drill
        if (v.infinitive === 'play' && vocabularyData.vocabulary['sports']) enhanceComplements(v, 'sports');
        // Add Transport: "drive" (new verb needed?) -> let's stick to core verbs but use transport for 'go by...'
        if (v.infinitive === 'go') {
            if (vocabularyData.vocabulary['transport']) {
                vocabularyData.vocabulary['transport'].forEach(t => v.complements.push(`by ${t.english}`));
            }
        }
        // Link Space to watch/study
        if ((v.infinitive === 'watch' || v.infinitive === 'study') && vocabularyData.vocabulary['space']) {
            vocabularyData.vocabulary['space'].forEach(s => {
                // "watch the moon", "study planets"
                v.complements.push(`the ${s.english}`);
            });
        }
    });

    return verbs;
}

const VERBS = getDynamicVerbs();

// Helper: Obtener complemento coherente para un verbo
function getComplement(verb) {
    if (verb.complements && verb.complements.length > 0) {
        return getRandomItem(verb.complements);
    }
    return 'every day'; // fallback
}

// Variable anti-repetición
let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubject(excludeThirdPerson = false) {
    const keys = Object.keys(SUBJECTS);
    let availableKeys = excludeThirdPerson
        ? keys.filter(k => !k.includes('third_person_singular'))
        : keys;

    const key = getRandomItem(availableKeys);
    return SUBJECTS[key];
}

function getThirdPersonSubject() {
    const thirdPersonKeys = Object.keys(SUBJECTS).filter(k => k.includes('third_person_singular'));
    return SUBJECTS[getRandomItem(thirdPersonKeys)];
}

function conjugateVerb(verb, subject) {
    // Para tercera persona singular (he, she, it)
    if (subject.auxiliary === 'does') {
        return verb.thirdPerson;
    }
    return verb.infinitive;
}

function conjugateSpanish(verb, subject) {
    // 1. Check for irregular conjugation in our JSON (Dynamic Data)
    const irregulars = vocabularyData.irregular_verbs || [];
    const foundIrregular = irregulars.find(iv => iv.english === verb.infinitive || iv.spanish === verb.spanish);

    if (foundIrregular && foundIrregular.conjugation) {
        // Map subject to conjugation key (yo, tu, el, nosotros, ellos)
        const mapKeys = {
            'I': 'yo',
            'You': 'tu',
            'He': 'el', 'She': 'el', 'It': 'el',
            'We': 'nosotros',
            'They': 'ellos'
        };
        const key = mapKeys[subject.pronoun];
        if (key && foundIrregular.conjugation[key]) {
            return foundIrregular.conjugation[key];
        }
    }

    // 2. Fallback: Simple Regular Conjugation Rules
    const s = verb.spanish;
    const p = subject.pronoun;

    // Remove ending (ar/er/ir)
    let root = s.slice(0, -2);
    const ending = s.slice(-2);

    if (ending === 'ar') {
        if (p === 'I') return root + 'o';
        if (p === 'You') return root + 'as';
        if (p === 'He' || p === 'She' || p === 'It') return root + 'a';
        if (p === 'We') return root + 'amos';
        if (p === 'They') return root + 'an';
    } else if (ending === 'er') {
        if (p === 'I') return root + 'o';
        if (p === 'You') return root + 'es';
        if (p === 'He' || p === 'She' || p === 'It') return root + 'e';
        if (p === 'We') return root + 'emos';
        if (p === 'They') return root + 'en';
    } else if (ending === 'ir') {
        if (p === 'I') return root + 'o';
        if (p === 'You') return root + 'es';
        if (p === 'He' || p === 'She' || p === 'It') return root + 'e';
        if (p === 'We') return root + 'imos';
        if (p === 'They') return root + 'en';
    }

    return s; // Fail-safe: return infinitive
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
// NIVEL FÁCIL: OPCIÓN MÚLTIPLE
// ==========================================

/**
 * FÁCIL: Completar con la forma correcta del verbo (afirmativo)
 */
function generarCompletarAfirmativo() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const correctForm = conjugateVerb(verb, subject);
    const sentence = `${subject.pronoun} ___ ${complement}`;

    // Generar opciones
    const options = [correctForm];

    // Añadir forma incorrecta (invertida)
    if (subject.auxiliary === 'does') {
        options.push(verb.infinitive); // play en vez de plays
    } else {
        options.push(verb.thirdPerson); // plays en vez de play
    }

    // Añadir otras formas verbales
    const otherVerb = getRandomItem(VERBS.filter(v => v !== verb));
    options.push(conjugateVerb(otherVerb, subject));
    options.push(otherVerb.infinitive);

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_afirmativo',
        question_type: 'multiple_choice',
        pregunta: `Completa con la forma correcta: "${sentence}"`,
        opciones: shuffleArray(options).slice(0, 4),
        correcta: correctForm,
        explicacion: `${subject.pronoun} ${correctForm} ${complement}`,
        dificultad: 'facil',
        gramatica: 'present_simple_affirmative',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

/**
 * FÁCIL: Identificar si la frase es correcta o incorrecta
 */
function generarIdentificarCorrecta() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const isCorrect = Math.random() > 0.5;
    const verbForm = isCorrect
        ? conjugateVerb(verb, subject)
        : (subject.auxiliary === 'does' ? verb.infinitive : verb.thirdPerson);

    const sentence = `${subject.pronoun} ${verbForm} ${complement}`;

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_identificar',
        question_type: 'multiple_choice',
        pregunta: `¿Es correcta esta frase? "${sentence}"`,
        opciones: ['Correcta', 'Incorrecta'],
        correcta: isCorrect ? 'Correcta' : 'Incorrecta',
        explicacion: isCorrect
            ? `Correcto: ${subject.pronoun} necesita "${conjugateVerb(verb, subject)}"`
            : `Incorrecto: ${subject.pronoun} necesita "${conjugateVerb(verb, subject)}", no "${verbForm}"`,
        dificultad: 'facil',
        gramatica: 'present_simple_affirmative',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVO E INTERROGATIVO
// ==========================================

/**
 * MEDIO: Formar negativo (don't/doesn't)
 */
function generarFormarNegativo() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const correctAnswer = `${subject.pronoun} ${subject.auxiliary}n't ${verb.infinitive} ${complement}`;
    const sentence = `${subject.pronoun} ${conjugateVerb(verb, subject)} ${complement}`;

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_negativo',
        question_type: 'multiple_choice',
        pregunta: `Forma el negativo de: "${sentence}"`,
        opciones: shuffleArray([
            correctAnswer,
            `${subject.pronoun} not ${conjugateVerb(verb, subject)} ${complement}`,
            `${subject.pronoun} don't ${conjugateVerb(verb, subject)} ${complement}`,
            `${subject.pronoun} doesn't ${conjugateVerb(verb, subject)} ${complement}`
        ]),
        correcta: correctAnswer,
        explicacion: `Negativo: ${correctAnswer}`,
        dificultad: 'medio',
        gramatica: 'present_simple_negative',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

/**
 * MEDIO: Ordenar palabras para formar pregunta
 */
function generarOrdenarPregunta() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const correctAnswer = `${subject.auxiliary.charAt(0).toUpperCase() + subject.auxiliary.slice(1)} ${subject.pronoun.toLowerCase()} ${verb.infinitive} ${complement}?`;

    const words = [
        subject.auxiliary.charAt(0).toUpperCase() + subject.auxiliary.slice(1),
        subject.pronoun.toLowerCase(),
        verb.infinitive,
        complement + '?'
    ];

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_interrogativo',
        question_type: 'word_order',
        pregunta: `Ordena las palabras para formar una pregunta:`,
        words: shuffleArray([...words]),
        correcta: correctAnswer,
        correct_variations: [correctAnswer, correctAnswer.toLowerCase()],
        explicacion: `Pregunta: ${correctAnswer}`,
        dificultad: 'medio',
        gramatica: 'present_simple_question',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

/**
 * MEDIO: Completar con do/does
 */
function generarCompletarDoDoes() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const sentence = `___ ${subject.pronoun.toLowerCase()} ${verb.infinitive} ${complement}?`;
    const correctAnswer = subject.auxiliary.charAt(0).toUpperCase() + subject.auxiliary.slice(1);

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_auxiliar',
        question_type: 'multiple_choice',
        pregunta: `Completa con el auxiliar correcto: "${sentence}"`,
        opciones: ['Do', 'Does', 'Don\'t', 'Doesn\'t'],
        correcta: correctAnswer,
        explicacion: `${correctAnswer} ${subject.pronoun.toLowerCase()} ${verb.infinitive} ${complement}?`,
        dificultad: 'medio',
        gramatica: 'present_simple_auxiliary',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

// ==========================================
// NIVEL DIFÍCIL: TEXTO LIBRE
// ==========================================

/**
 * DIFÍCIL: Escribir pregunta completa
 */
function generarEscribirPregunta() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const correctAnswer = `${subject.auxiliary.charAt(0).toUpperCase() + subject.auxiliary.slice(1)} ${subject.pronoun.toLowerCase()} ${verb.infinitive} ${complement}?`;

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_escribir_pregunta',
        question_type: 'text_input',
        pregunta: `Forma una pregunta con: ${subject.pronoun} / ${verb.infinitive} / ${complement}`,
        correcta: correctAnswer,
        accept_variations: [
            correctAnswer,
            correctAnswer.toLowerCase(),
            correctAnswer.replace('?', '')
        ],
        case_sensitive: false,
        explicacion: `Respuesta: ${correctAnswer}`,
        dificultad: 'dificil',
        gramatica: 'present_simple_question',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

/**
 * DIFÍCIL: Escribir negativo completo
 */
function generarEscribirNegativo() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);
    const complement = getComplement(verb);

    const afirmativo = `${subject.pronoun} ${conjugateVerb(verb, subject)} ${complement}`;
    const correctAnswer = `${subject.pronoun} ${subject.auxiliary}n't ${verb.infinitive} ${complement}`;

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_escribir_negativo',
        question_type: 'text_input',
        pregunta: `Escribe el negativo de: "${afirmativo}"`,
        correcta: correctAnswer,
        accept_variations: [
            correctAnswer,
            correctAnswer.replace("n't", " not"),
            `${subject.pronoun} ${subject.auxiliary} not ${verb.infinitive} ${complement}`
        ],
        case_sensitive: false,
        explicacion: `Respuesta: ${correctAnswer}`,
        dificultad: 'dificil',
        gramatica: 'present_simple_negative',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

/**
 * DIFÍCIL: Traducir frase completa
 */
function generarTraducirFrase() {
    const subject = getRandomSubject();
    const verb = getRandomItem(VERBS);

    const fraseSpanish = `${subject.spanish} ${conjugateSpanish(verb, subject)} todos los días`;
    const fraseEnglish = `${subject.pronoun} ${conjugateVerb(verb, subject)} every day`;

    return {
        tipo: 'grammar',
        subtipo: 'present_simple_traducir',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${fraseSpanish}"`,
        correcta: fraseEnglish,
        accept_variations: [fraseEnglish, fraseEnglish.toLowerCase()],
        case_sensitive: false,
        explicacion: `Respuesta: ${fraseEnglish}`,
        dificultad: 'dificil',
        gramatica: 'present_simple_affirmative',
        scope: ['GRAMMAR_PRESENT_SIMPLE']
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarPresentSimple(nivel = 'facil') {
    // Normalizar nivel
    const nivelNormalizado = nivel
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Tipos de ejercicio por nivel
    const tiposPorNivel = {
        facil: [
            { func: generarCompletarAfirmativo, peso: 60 },
            { func: generarIdentificarCorrecta, peso: 40 }
        ],
        medio: [
            { func: generarFormarNegativo, peso: 35 },
            { func: generarOrdenarPregunta, peso: 35 },
            { func: generarCompletarDoDoes, peso: 30 }
        ],
        dificil: [
            { func: generarEscribirPregunta, peso: 35 },
            { func: generarEscribirNegativo, peso: 35 },
            { func: generarTraducirFrase, peso: 30 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    // Elegir tipo por peso
    const totalPeso = tipos.reduce((sum, t) => sum + t.peso, 0);
    let random = Math.random() * totalPeso;

    let selectedFunc = tipos[0].func;
    for (const t of tipos) {
        random -= t.peso;
        if (random <= 0) {
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
    generarPresentSimple,
    resetearEjerciciosUsados
};
