/**
 * GENERADOR DE GENITIVO SAJÓN (Saxon Genitive) - 4º PRIMARIA
 * 
 * Cubre:
 * - Uso del apóstrofe 's para posesión (Singular): Tom's cat
 * - Uso del apóstrofe ' para plurales terminados en s: The boys' ball
 * - Preguntas con "Whose" (¿De quién?)
 */

// ==========================================
// DATOS
// ==========================================

import vocabularyData from '../data/english-4primaria.json' with { type: 'json' };

// ==========================================
// DATOS
// ==========================================

const FAMILY_TREE_LOGIC = [
    { rel1: 'mother', rel2: 'sister', result: 'aunt', es1: 'madre', es2: 'hermana', res_es: 'tía' },
    { rel1: 'father', rel2: 'brother', result: 'uncle', es1: 'padre', es2: 'hermano', res_es: 'tío' },
    { rel1: 'father', rel2: 'father', result: 'grandfather', es1: 'padre', es2: 'padre', res_es: 'abuelo' },
    { rel1: 'mother', rel2: 'mother', result: 'grandmother', es1: 'madre', es2: 'madre', res_es: 'abuela' },
    { rel1: 'aunt', rel2: 'son', result: 'cousin', es1: 'tía', es2: 'hijo', res_es: 'primo' },
    { rel1: 'uncle', rel2: 'daughter', result: 'cousin', es1: 'tío', es2: 'hija', res_es: 'prima' },
    { rel1: 'sister', rel2: 'son', result: 'nephew', es1: 'hermana', es2: 'hijo', res_es: 'sobrino' }, // Maybe advanced for 4th grade? Keeping basics.
    { rel1: 'brother', rel2: 'daughter', result: 'niece', es1: 'hermano', es2: 'hija', res_es: 'sobrina' }
];

const POSSESSORS = [
    { name: 'Tom', type: 'singular_name', spanish: 'Tom' },
    { name: 'Mary', type: 'singular_name', spanish: 'Mary' },
    { name: 'my dad', type: 'singular_noun', spanish: 'mi papá' },
    { name: 'my mum', type: 'singular_noun', spanish: 'mi mamá' },
    { name: 'the teacher', type: 'singular_noun', spanish: 'el profesor' },
    { name: 'the dog', type: 'singular_noun', spanish: 'el perro' },
    { name: 'the cat', type: 'singular_noun', spanish: 'el gato' },

    // Plurales
    { name: 'the brothers', type: 'plural_s', spanish: 'los hermanos' },
    { name: 'my friends', type: 'plural_s', spanish: 'mis amigos' }
];

// Helper to get Family Members dynamic
function getFamilyMembers() {
    if (vocabularyData.vocabulary.family) {
        return vocabularyData.vocabulary.family.map(m => m.english);
    }
    return ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'aunt', 'uncle', 'cousin'];
}

const OBJECTS = [
    { en: 'car', es: 'coche' },
    { en: 'book', es: 'libro' },
    { en: 'house', es: 'casa' },
    { en: 'ball', es: 'pelota' },
    { en: 'pencil', es: 'lápiz' },
    { en: 'bike', es: 'bici' },
    { en: 'room', es: 'habitación' },
    { en: 'computer', es: 'ordenador' }
];

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

function getGenitiveForm(possessor) {
    if (possessor.type === 'plural_s') {
        return possessor.name + "'"; // friends'
    }
    return possessor.name + "'s"; // Tom's
}

// ==========================================
// NIVEL FÁCIL: ELEGIR LA FORMA CORRECTA
// ==========================================

/**
 * Elige la opción correcta del genitivo: Tom's vs Toms vs Toms'
 */
function generarGenitiveChoice() {
    const p = getRandomItem(POSSESSORS);
    const o = getRandomItem(OBJECTS);

    const correct = getGenitiveForm(p);

    // Distractores
    let options = [correct];

    if (p.type === 'plural_s') {
        options.push(p.name + "s"); // friendss (incorrecto)
        options.push(p.name + "'s"); // friends's (técnicamente posible a veces pero evitado en 4º por regla simple)
        options.push(p.name.slice(0, -1) + "'s"); // friend's (singular warning)
    } else {
        options.push(p.name + "s"); // Toms (plural)
        options.push(p.name + "'"); // Tom' (missing s)
        // options.push(p.name + " is"); // Tom is (confusion)
    }

    // Rellenamos hasta 3
    if (options.length < 3) options.push(p.name);

    const sentence = `It is ___ ${o.en}. (${o.es} de ${p.spanish})`;

    return {
        tipo: 'grammar',
        subtipo: 'genitive_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la forma correcta para completar: "${sentence}"`,
        opciones: shuffleArray(options.slice(0, 4)),
        correcta: correct,
        explicacion: `Usamos 's para posesión: ${correct} ${o.en}.`,
        dificultad: 'facil',
        gramatica: 'genitive_saxon'
    };
}

// ==========================================
// NIVEL MEDIO: WHOSE E IDENTIFICACIÓN
// ==========================================

/**
 * Preguntas con Whose
 */
function generarWhoseChoice() {
    const p = getRandomItem(POSSESSORS);
    const o = getRandomItem(OBJECTS);

    const correct = `It's ${getGenitiveForm(p)}`;

    return {
        tipo: 'grammar',
        subtipo: 'genitive_whose',
        question_type: 'multiple_choice',
        pregunta: `Answer the question: "Whose ${o.en} is this?" (${p.spanish})`,
        opciones: shuffleArray([
            correct,
            `It's of ${p.name}`, // Spanglish
            `It's ${p.name}`, // Missing 's
            `It's the ${o.en} of ${p.name}` // Long form (grammatically ok sometimes but not genitive focus)
        ]),
        correcta: correct,
        explicacion: `A la pregunta "Whose...?" (¿De quién...?) respondemos con Possessive 's: "${correct}".`,
        dificultad: 'medio',
        gramatica: 'genitive_whose'
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN (DE... A GENITIVO)
// ==========================================

// ==========================================
// NIVEL DIFÍCIL / EXPERTO: PUZZLES LÓGICOS FAMILIARES
// ==========================================

function generarFamilyLogicPuzzle() {
    // Puzzle: My mother's sister is my... (aunt)

    // Select logic chain
    // Filter advanced ones if needed
    const logic = getRandomItem(FAMILY_TREE_LOGIC);

    const question = `My ${logic.rel1}'s ${logic.rel2} is my...`;
    const hint = `(La ${logic.es2} de mi ${logic.es1} es mi...)`;

    const correct = logic.result;

    // Distractors from family vocabulary
    const allFamily = getFamilyMembers();
    const wrong = shuffleArray(allFamily.filter(f => f !== correct && f !== logic.rel1 && f !== logic.rel2)).slice(0, 3);

    return {
        tipo: 'logic',
        subtipo: 'genitive_family_puzzle',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase lógica: "${question}" ${hint}`,
        opciones: shuffleArray([correct, ...wrong]),
        correcta: correct,
        explicacion: `My ${logic.rel1}'s ${logic.rel2} = ${correct} (${logic.res_es}).`,
        dificultad: 'dificil', // or 'experto'
        gramatica: 'genitive_logic'
    };
}

// ==========================================
// TRADUCCIÓN (DE... A GENITIVO)
// ==========================================

function generarTraducirGenitivo() {
    const p = getRandomItem(POSSESSORS);
    const o = getRandomItem(OBJECTS);

    const spanishPhrase = `El ${o.es} de ${p.spanish}`;
    const englishPhrase = `${getGenitiveForm(p)} ${o.en}`; // Tom's car

    return {
        tipo: 'grammar',
        subtipo: 'genitive_translate',
        question_type: 'text_input',
        pregunta: `Traduce usando 's (Genitivo Sajón): "${spanishPhrase}"`,
        correcta: englishPhrase,
        accept_variations: [englishPhrase, englishPhrase.toLowerCase(), `the ${o.en} of ${p.name}`],
        case_sensitive: false,
        explicacion: `Solución: ${englishPhrase}`,
        dificultad: 'medio', // Downgraded to medium as logic puzzles are harder
        gramatica: 'genitive_translate'
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarGenitive(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarGenitiveChoice, peso: 100 }
        ],
        medio: [
            { func: generarWhoseChoice, peso: 50 },
            { func: generarGenitiveChoice, peso: 50 } // Refuerzo
        ],
        dificil: [
            { func: generarFamilyLogicPuzzle, peso: 70 },
            { func: generarTraducirGenitivo, peso: 30 }
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
    generarGenitive,
    resetearEjerciciosUsados
};
