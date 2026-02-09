/**
 * GENERADOR DE QUANTIFIERS MIX (A, AN, SOME, ANY) - 4º PRIMARIA
 * 
 * Generador dedicado para practicar intensivamente:
 * - A vs AN (Singular countable)
 * - SOME (Affirmative plural/uncountable)
 * - ANY (Negative/Question plural/uncountable)
 */

import vocabularyData from '../data/english-4primaria.json';

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

// Get flattened items from JSON
function getItems() {
    const items = [];

    // Add logic to extract from all categories
    const categories = Object.keys(vocabularyData.vocabulary);

    // Manual mapping of countability is tricky with just raw JSON lists.
    // We will use a safe subset or heuristic.
    // For this specific robust generator, let's use a curated internal list ENRICHED by dynamic lookups if possible,
    // or just a robust internal list to guarantee grammar accuracy (Countable vs Uncountable needs metadata).

    // Internal curated list to ensure C/U correctness
    const CORE_ITEMS = [
        // Countable (Singular / Plural)
        { w: 'apple', p: 'apples', type: 'C', es: 'manzana' },
        { w: 'elephant', p: 'elephants', type: 'C', es: 'elefante' },
        { w: 'orange', p: 'oranges', type: 'C', es: 'naranja' },
        { w: 'umbrella', p: 'umbrellas', type: 'C', es: 'paraguas' },
        { w: 'egg', p: 'eggs', type: 'C', es: 'huevo' },
        { w: 'dog', p: 'dogs', type: 'C', es: 'perro' },
        { w: 'cat', p: 'cats', type: 'C', es: 'gato' },
        { w: 'book', p: 'books', type: 'C', es: 'libro' },
        { w: 'pen', p: 'pens', type: 'C', es: 'boli' },
        { w: 'car', p: 'cars', type: 'C', es: 'coche' },
        { w: 'banana', p: 'bananas', type: 'C', es: 'plátano' },

        // Uncountable (Singular only usually)
        { w: 'water', type: 'U', es: 'agua' },
        { w: 'milk', type: 'U', es: 'leche' },
        { w: 'bread', type: 'U', es: 'pan' },
        { w: 'cheese', type: 'U', es: 'queso' },
        { w: 'sugar', type: 'U', es: 'azúcar' },
        { w: 'rain', type: 'U', es: 'lluvia' },
        { w: 'money', type: 'U', es: 'dinero' },
        { w: 'hair', type: 'U', es: 'pelo' }
    ];

    return CORE_ITEMS;
}

const ITEMS = getItems();
let ejerciciosUsados = new Set();

// ==========================================
// NIVEL FÁCIL: A vs AN
// ==========================================

function generarAorAn() {
    // Filter only Countables
    const pool = ITEMS.filter(i => i.type === 'C');
    const item = getRandomItem(pool);

    // Always affirmative singular context for level 1
    const sentence = `It is ___ ${item.w}.`;

    // Check vowel
    const firstChar = item.w[0].toLowerCase();
    const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstChar);
    const correct = isVowel ? 'an' : 'a';

    return {
        tipo: 'grammar',
        subtipo: 'quantifiers_a_an',
        question_type: 'multiple_choice',
        pregunta: `Elige A o AN: "${sentence}"`,
        opciones: shuffleArray(['a', 'an', 'some', 'any']),
        correcta: correct,
        explicacion: `"${item.w}" empieza por ${isVowel ? 'vocal (usamos an)' : 'consonante (usamos a)'}.`,
        dificultad: 'facil',
        gramatica: 'articles_basic'
    };
}

// ==========================================
// NIVEL MEDIO: SOME vs ANY
// ==========================================

function generarSomeOrAny() {
    const item = getRandomItem(ITEMS);
    const isNegative = Math.random() > 0.5;

    let sentence, correct, displayWord;

    if (item.type === 'C') {
        // Countable -> Use Plural for Some/Any
        displayWord = item.p;
        if (isNegative) {
            sentence = `There aren't ___ ${displayWord}.`;
            correct = 'any';
        } else {
            sentence = `There are ___ ${displayWord}.`;
            correct = 'some';
        }
    } else {
        // Uncountable
        displayWord = item.w;
        if (isNegative) {
            sentence = `There isn't ___ ${displayWord}.`;
            correct = 'any';
        } else {
            sentence = `There is ___ ${displayWord}.`;
            correct = 'some';
        }
    }

    return {
        tipo: 'grammar',
        subtipo: 'quantifiers_some_any',
        question_type: 'multiple_choice',
        pregunta: `Elige SOME o ANY: "${sentence}"`,
        opciones: shuffleArray(['some', 'any', 'a', 'an']),
        correcta: correct,
        explicacion: `${isNegative ? 'Negativo' : 'Afirmativo'} + ${item.type === 'C' ? 'Plural' : 'Incontable'} = ${correct}.`,
        dificultad: 'medio',
        gramatica: 'quantifiers_some_any'
    };
}

// ==========================================
// NIVEL DIFÍCIL: MIX COMPLETE (A/AN/SOME/ANY)
// ==========================================

function generarMixComplete() {
    const item = getRandomItem(ITEMS);
    // Determine context randomly: Singular(C), Plural(C), Uncountable(U)
    // Determine polarity: Aff, Neg.

    // Valid states:
    // 1. C-Sing-Aff: There is A cat.
    // 2. C-Sing-Neg: There isn't A cat. (ANY is possible "isn't any cat" but strict grammar usually prefers "isn't a cat" for singular countables, or "aren't any cats"). Let's stick to "isn't a cat".
    // 3. C-Plural-Aff: There are SOME cats.
    // 4. C-Plural-Neg: There aren't ANY cats.
    // 5. U-Aff: There is SOME water.
    // 6. U-Neg: There isn't ANY water.

    let text, correct;

    const contextType = item.type === 'C' ? (Math.random() > 0.4 ? 'PLURAL' : 'SINGULAR') : 'UNCOUNTABLE';
    const isNegative = Math.random() > 0.5;

    if (contextType === 'SINGULAR') {
        // A / AN
        const verb = isNegative ? "There isn't" : "There is";
        text = `${verb} ___ ${item.w}.`;

        const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(item.w[0].toLowerCase());
        correct = isVowel ? 'an' : 'a';

    } else if (contextType === 'PLURAL') {
        // SOME / ANY
        const verb = isNegative ? "There aren't" : "There are";
        text = `${verb} ___ ${item.p}.`;
        correct = isNegative ? 'any' : 'some';

    } else {
        // UNCOUNTABLE
        // SOME / ANY
        const verb = isNegative ? "There isn't" : "There is";
        text = `${verb} ___ ${item.w}.`;
        correct = isNegative ? 'any' : 'some';
    }

    return {
        tipo: 'grammar',
        subtipo: 'quantifiers_mix_hard',
        question_type: 'multiple_choice',
        pregunta: `Elige la opción correcta (a/an/some/any): "${text}"`,
        opciones: shuffleArray(['a', 'an', 'some', 'any']),
        correcta: correct,
        explicacion: `Regla: ${contextType} + ${isNegative ? 'Negativo' : 'Afirmativo'}`,
        dificultad: 'dificil',
        gramatica: 'quantifiers_mix'
    };
}

// ==========================================
// MAIN EXPORT
// ==========================================

export function generarQuantifiersMix(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarAorAn, peso: 100 }
        ],
        medio: [
            { func: generarSomeOrAny, peso: 100 }
        ],
        dificil: [ // Corrected key from 'dificultad'
            { func: generarMixComplete, peso: 100 }
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

    // Anti-repeat loop
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
    generarQuantifiersMix,
    resetearEjerciciosUsados
};
