/**
 * GENERADOR DE ARTÍCULOS (A, AN, THE, -) - 4º PRIMARIA
 * 
 * Cubre:
 * - A vs AN (Regla fonética básica y excepciones comunes H/U)
 * - THE vs A/AN (Especificidad)
 * - THE vs NO ARTICLE (Generalizaciones)
 */

// ==========================================
// DATOS
// ==========================================

const ITEMS = [
    // Basic A (Consonant)
    { word: 'car', article: 'a', type: 'consonant', spanish: 'coche' },
    { word: 'dog', article: 'a', type: 'consonant', spanish: 'perro' },
    { word: 'book', article: 'a', type: 'consonant', spanish: 'libro' },
    { word: 'house', article: 'a', type: 'consonant', spanish: 'casa' },
    { word: 'banana', article: 'a', type: 'consonant', spanish: 'plátano' },
    { word: 'teacher', article: 'a', type: 'consonant', spanish: 'profesor' },

    // Basic AN (Vowel)
    { word: 'apple', article: 'an', type: 'vowel', spanish: 'manzana' },
    { word: 'elephant', article: 'an', type: 'vowel', spanish: 'elefante' },
    { word: 'orange', article: 'an', type: 'vowel', spanish: 'naranja' },
    { word: 'ice cream', article: 'an', type: 'vowel', spanish: 'helado' },
    { word: 'umbrella', article: 'an', type: 'vowel', spanish: 'paraguas' },
    { word: 'egg', article: 'an', type: 'vowel', spanish: 'huevo' },

    // Tricky (H silent, U vowel sound)
    { word: 'hour', article: 'an', type: 'silent_h', spanish: 'hora' },
    { word: 'honest man', article: 'an', type: 'silent_h', spanish: 'hombre honesto' },
    { word: 'university', article: 'a', type: 'u_sound', spanish: 'universidad' },
    { word: 'uniform', article: 'a', type: 'u_sound', spanish: 'uniforme' },
    { word: 'euro', article: 'a', type: 'u_sound', spanish: 'euro' }
];

const GENERAL_VS_SPECIFIC = [
    { general: 'I like cats', specific: 'The cats are sleeping', noun: 'cats' },
    { general: 'Milk is white', specific: 'The milk is in the fridge', noun: 'milk' },
    { general: 'Birds can fly', specific: 'The birds used to sing', noun: 'birds' },
    { general: 'I love music', specific: 'The music is loud', noun: 'music' }
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

// ==========================================
// NIVEL FÁCIL: A vs AN
// ==========================================

function generarAorAnChoice() {
    // 80% Basic, 20% Tricky
    const isTricky = Math.random() > 0.8;
    const pool = ITEMS.filter(i => isTricky ? (i.type === 'silent_h' || i.type === 'u_sound') : (i.type === 'consonant' || i.type === 'vowel'));

    const item = getRandomItem(pool);

    return {
        tipo: 'grammar',
        subtipo: 'articles_a_an',
        question_type: 'multiple_choice',
        pregunta: `Elige 'a' o 'an': "It is ___ ${item.word}."`,
        opciones: shuffleArray(['a', 'an', 'the']),
        correcta: item.article,
        explicacion: `Usamos "${item.article}" con "${item.word}" (${item.type === 'vowel' || item.type === 'silent_h' ? 'sonido vocal' : 'sonido consonante'}).`,
        dificultad: 'facil',
        gramatica: 'articles_indefinite',
        scope: ['GRAMMAR_ARTICLES']
    };
}

// ==========================================
// NIVEL MEDIO: THE vs A/AN (First mention)
// ==========================================

function generarDefiniteIndefinite() {
    // Regla: A para primera mención, THE para segunda.
    // "I saw ___ boy. ___ boy was happy."
    const item = getRandomItem(ITEMS.filter(i => i.type !== 'silent_h' && i.type !== 'u_sound')); // Keep it simple phonetically

    // Choose which part to blank
    const blankFirst = Math.random() > 0.5;

    let question, correct, explanation;

    if (blankFirst) {
        question = `I have ___ ${item.word}. The ${item.word} is blue.`;
        correct = item.article;
        explanation = `Primera vez que mencionamos "${item.word}", usamos el indefinido (${item.article}).`;
    } else {
        question = `I have ${item.article} ${item.word}. ___ ${item.word} is blue.`;
        correct = 'The';
        explanation = `Segunda vez que mencionamos "${item.word}", ya es específico, usamos "The".`;
    }

    return {
        tipo: 'grammar',
        subtipo: 'articles_context',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase: "${question}"`,
        opciones: shuffleArray(['A', 'An', 'The', '-']), // - es nada
        correcta: correct,
        correct_variations: [correct, correct.toLowerCase()],
        explicacion: explanation,
        dificultad: 'medio',
        gramatica: 'articles_context',
        scope: ['GRAMMAR_ARTICLES']
    };
}

// ==========================================
// NIVEL DIFÍCIL: ZERO ARTICLE vs THE (General vs Specific)
// ==========================================

function generarZeroArticle() {
    const item = getRandomItem(GENERAL_VS_SPECIFIC);
    const isGeneral = Math.random() > 0.5;

    let question, correct, explanation;

    if (isGeneral) {
        // I love music.
        question = `I love ___ ${item.noun}. (General)`;
        correct = '-';
        explanation = `Estamos hablando de ${item.noun} en general, no llevas artículo (Zero Article).`;
    } else {
        // The music is loud.
        question = `___ ${item.noun} here is very good. (Específico)`;
        correct = 'The';
        explanation = `Hablamos de un ${item.noun} específico (el de aquí), usamos "The".`;
    }

    return {
        tipo: 'grammar',
        subtipo: 'articles_zero',
        question_type: 'multiple_choice',
        pregunta: `Elige el artículo (o '-' si no lleva): "${question}"`,
        opciones: shuffleArray(['The', 'A', 'An', '-']),
        correcta: correct,
        explicacion: explanation,
        dificultad: 'dificil',
        gramatica: 'articles_zero',
        scope: ['GRAMMAR_ARTICLES']
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarArticles(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarAorAnChoice, peso: 100 }
        ],
        medio: [
            { func: generarDefiniteIndefinite, peso: 60 },
            { func: generarAorAnChoice, peso: 40 }
        ],
        dificil: [
            { func: generarZeroArticle, peso: 50 },
            { func: generarDefiniteIndefinite, peso: 50 }
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
    generarArticles,
    resetearEjerciciosUsados
};
