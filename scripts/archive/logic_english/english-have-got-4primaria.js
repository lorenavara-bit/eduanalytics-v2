/**
 * GENERADOR DE HAVE GOT - 4º PRIMARIA
 * 
 * Lógica dinámica para Have Got / Has Got.
 * 
 * Estructuras:
 * - Afirmativo: Suejto + have got / has got + Objeto
 * - Negativo: Sujeto + haven't got / hasn't got + Objeto
 * - Interrogativo: Have/Has + Sujeto + got + Objeto?
 */

// ==========================================
// DATOS
// ==========================================

const SUBJECTS = {
    // Have Got
    i: { pronoun: 'I', form: 'have got', aux: 'Have', neg: 'haven\'t got', spanish: 'Yo' },
    you: { pronoun: 'You', form: 'have got', aux: 'Have', neg: 'haven\'t got', spanish: 'Tú' },
    we: { pronoun: 'We', form: 'have got', aux: 'Have', neg: 'haven\'t got', spanish: 'Nosotros' },
    they: { pronoun: 'They', form: 'have got', aux: 'Have', neg: 'haven\'t got', spanish: 'Ellos' },

    // Has Got
    he: { pronoun: 'He', form: 'has got', aux: 'Has', neg: 'hasn\'t got', spanish: 'Él' },
    she: { pronoun: 'She', form: 'has got', aux: 'Has', neg: 'hasn\'t got', spanish: 'Ella' },
    it: { pronoun: 'It', form: 'has got', aux: 'Has', neg: 'hasn\'t got', spanish: 'Ello' },
    my_mum: { pronoun: 'My mum', form: 'has got', aux: 'Has', neg: 'hasn\'t got', spanish: 'Mi mamá' }
};

const OBJECTS = [
    { en: 'a car', es: 'un coche' },
    { en: 'a dog', es: 'un perro' },
    { en: 'blue eyes', es: 'ojos azules' },
    { en: 'long hair', es: 'pelo largo' },
    { en: 'a new bike', es: 'una bici nueva' },
    { en: 'a sister', es: 'una hermana' },
    { en: 'many friends', es: 'muchos amigos' }
];

function getDynamicObjects(categoria = null) {
    if (!categoria) return OBJECTS;

    const dynObjects = [];

    // Categories that make sense for possession
    const validCats = ['school_objects', 'toys', 'clothes', 'food', 'animals', 'house', 'transport'];

    if (validCats.includes(categoria) && vocabularyData.vocabulary[categoria]) {
        vocabularyData.vocabulary[categoria].forEach(wd => {
            const article = ['a', 'e', 'i', 'o', 'u'].includes(wd.english[0].toLowerCase()) ? 'an' : 'a';

            // Heuristic for uncountable food -> remove article
            const isUncountable = ['food', 'drink'].includes(categoria) && ['water', 'milk', 'cheese', 'bread', 'pasta', 'rice', 'soup'].includes(wd.english);

            if (isUncountable) {
                dynObjects.push({ en: `some ${wd.english}`, es: `algo de ${wd.spanish}` });
            } else {
                dynObjects.push({ en: `${article} ${wd.english}`, es: `un/a ${wd.spanish}` });
            }
        });
    }

    return dynObjects.length > 0 ? dynObjects : OBJECTS;
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
// NIVEL FÁCIL: HAVE vs HAS
// ==========================================

function generarHaveHasChoice(categoria) {
    const s = getRandomSubject();
    const o = getRandomItem(getDynamicObjects(categoria));

    // I ___ got a car.
    const sentence = `${s.pronoun} ___ got ${o.en}.`;
    const correct = s.form.split(' ')[0]; // have or has

    return {
        tipo: 'grammar',
        subtipo: 'havegot_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con Have o Has: "${sentence}"`,
        opciones: shuffleArray(['have', 'has', 'is', 'are']),
        correcta: correct,
        explicacion: `"${s.pronoun}" va con "${correct} got".`,
        dificultad: 'facil',
        gramatica: 'verb_havegot_affirmative'
    };
}

// ==========================================
// NIVEL MEDIO: NEGATIVO E INTERROGATIVO
// ==========================================

function generarNegativoChoice(categoria) {
    const s = getRandomSubject();
    const o = getRandomItem(getDynamicObjects(categoria));

    const sentence = `${s.pronoun} ___ ${o.en}. (Negativo)`;
    const correct = s.neg; // haven't got

    // Distractores
    const error1 = s.neg.replace('got', ''); // haven't (missing got - common mistake in "have got" structure exercises)
    const error2 = s.aux + ' no got'; // Have no got
    const error3 = s.aux === 'Have' ? 'hasn\'t got' : 'haven\'t got'; // Wrong person

    return {
        tipo: 'grammar',
        subtipo: 'havegot_negative',
        question_type: 'multiple_choice',
        pregunta: `Elige el negativo correcto: "${sentence}"`,
        opciones: shuffleArray([correct, error1, error2, error3]),
        correcta: correct,
        explicacion: `Negativo de "${s.form}" es "${correct}".`,
        dificultad: 'medio',
        gramatica: 'verb_havegot_negative'
    };
}

function generarOrdenarPregunta(categoria) {
    const s = getRandomSubject();
    const o = getRandomItem(getDynamicObjects(categoria));

    // Have you got a car?
    const correct = `${s.aux} ${s.pronoun.toLowerCase()} got ${o.en}?`;

    const words = [s.aux, s.pronoun.toLowerCase(), 'got', o.en, '?'];
    if (s.pronoun === 'I') words[1] = 'I';

    return {
        tipo: 'grammar',
        subtipo: 'havegot_question',
        question_type: 'word_order',
        pregunta: `Ordena la pregunta:`,
        words: shuffleArray(words),
        correcta: correct,
        correct_variations: [correct],
        explicacion: `Estructura: Have/Has + Sujeto + Got + Objeto?`,
        dificultad: 'medio',
        gramatica: 'verb_havegot_question'
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN
// ==========================================

function generarTraducir(categoria) {
    const s = getRandomSubject();
    const o = getRandomItem(getDynamicObjects(categoria));

    const es = `${s.spanish} tiene ${o.es}`;
    const en = `${s.pronoun} ${s.form} ${o.en}`;

    return {
        tipo: 'grammar',
        subtipo: 'havegot_translate',
        question_type: 'text_input',
        pregunta: `Traduce usando Have Got / Has Got: "${es}"`,
        correcta: en,
        accept_variations: [en, en + '.'],
        case_sensitive: false,
        explicacion: `Respuesta: ${en}`,
        dificultad: 'dificil',
        gramatica: 'verb_havegot_translation'
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarHaveGot(nivel = 'facil', variedad = true, categoria = null) {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarHaveHasChoice, peso: 100 }
        ],
        medio: [
            { func: generarNegativoChoice, peso: 50 },
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

    // Loop anti-repetición
    for (let i = 0; i < 10; i++) {
        const ex = selectedFunc(categoria);
        const key = `${ex.pregunta}|${ex.correcta}`;
        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }
    return selectedFunc(categoria);
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarHaveGot,
    resetearEjerciciosUsados
};
