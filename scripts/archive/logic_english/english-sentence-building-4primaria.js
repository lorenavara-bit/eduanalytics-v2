import { generarIdentificadorUnico } from './english-utils.js';

/**
 * GENERADOR DE SENTENCE BUILDING - 4º PRIMARIA
 * 
 * Ejercicios de ordenación de frases ("Word Order").
 * Enfocado en la estructura S-V-O y variaciones (Preguntas, Negativas).
 */

const SENTENCE_STRUCTURES = [
    { type: 'affirmative', pattern: 'SVO', label: 'Afirmativa' },
    { type: 'negative', pattern: 'S-Neg-V-O', label: 'Negativa' },
    { type: 'question', pattern: 'Aux-S-V-O?', label: 'Pregunta' }
];

const FRASES_BASE = [
    // AFIRMATIVAS (SVO)
    { words: ['The', 'cat', 'is', 'black'], correct: 'The cat is black', type: 'affirmative' },
    { words: ['I', 'play', 'football', 'every', 'day'], correct: 'I play football every day', type: 'affirmative' },
    { words: ['She', 'likes', 'pizza'], correct: 'She likes pizza', type: 'affirmative' },
    { words: ['My', 'brother', 'has', 'got', 'a', 'dog'], correct: 'My brother has got a dog', type: 'affirmative' },
    { words: ['We', 'are', 'watching', 'TV'], correct: 'We are watching TV', type: 'affirmative' },
    { words: ['Use', 'your', 'pencil'], correct: 'Use your pencil', type: 'imperative' },
    { words: ['Open', 'the', 'window'], correct: 'Open the window', type: 'imperative' },
    { words: ['There', 'is', 'a', 'book'], correct: 'There is a book', type: 'affirmative' },
    { words: ['He', 'can', 'swim', 'fast'], correct: 'He can swim fast', type: 'affirmative' },

    // NEGATIVAS
    { words: ['I', 'don\'t', 'like', 'broccoli'], correct: 'I don\'t like broccoli', type: 'negative' },
    { words: ['She', 'doesn\'t', 'play', 'tennis'], correct: 'She doesn\'t play tennis', type: 'negative' },
    { words: ['They', 'aren\'t', 'listening'], correct: 'They aren\'t listening', type: 'negative' },
    { words: ['It', 'isn\'t', 'sunny'], correct: 'It isn\'t sunny', type: 'negative' },
    { words: ['I', 'haven\'t', 'got', 'a', 'car'], correct: 'I haven\'t got a car', type: 'negative' },

    // PREGUNTAS
    { words: ['Do', 'you', 'like', 'apples', '?'], correct: 'Do you like apples?', type: 'question' },
    { words: ['Where', 'is', 'the', 'cat', '?'], correct: 'Where is the cat?', type: 'question' },
    { words: ['Can', 'you', 'speak', 'English', '?'], correct: 'Can you speak English?', type: 'question' },
    { words: ['Is', 'he', 'your', 'brother', '?'], correct: 'Is he your brother?', type: 'question' },
    { words: ['What', 'time', 'is', 'it', '?'], correct: 'What time is it?', type: 'question' }
];

let ejerciciosUsados = new Set();

// ==========================================
// UTILIDADES
// ==========================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==========================================
// GENERADOR
// ==========================================

function generarSentenceQuestion(nivel) {
    // Filtrar por nivel si fuera necesario (fácil: cortas, difícil: largas)
    let pool = FRASES_BASE;
    if (nivel === 'facil') {
        pool = FRASES_BASE.filter(f => f.words.length <= 4);
    } else if (nivel === 'dificil') {
        pool = FRASES_BASE.filter(f => f.words.length > 5);
    }

    if (pool.length === 0) pool = FRASES_BASE;

    const selected = pool[Math.floor(Math.random() * pool.length)];

    // Barajar palabras
    const shuffledWords = shuffleArray(selected.words);

    return {
        id: generarIdentificadorUnico(),
        tipo: 'grammar', // or 'skill'
        subtipo: 'sentence_building',
        question_type: 'word_order', // This triggers drag & drop or click-to-order UI
        pregunta: 'Ordena las palabras para formar una frase correcta:',
        words: shuffledWords,
        correcta: selected.correct,
        explicacion: `El orden correcto es: "${selected.correct}"`,
        dificultad: nivel,
        gramatica: 'sentence_structure',
        feedback_card: {
            title: "Orden de las Palabras",
            rules: [
                { label: "AFIRMATIVA", explanation: "Sujeto + Verbo + Resto", icon: "🟢" },
                { label: "NEGATIVA", explanation: "Sujeto + Don't/Doesn't + Verbo", icon: "🔴" },
                { label: "PREGUNTA", explanation: "(Wh) + Auxiliar + Sujeto + Verbo?", icon: "❓" }
            ],
            info: "Recuerda: En inglés el orden es muy estricto."
        }
    };
}

// ==========================================
// EXPORT
// ==========================================

export function generarSentenceBuilding(nivel) {
    for (let i = 0; i < 10; i++) {
        const ex = generarSentenceQuestion(nivel);
        if (!ejerciciosUsados.has(ex.correcta)) {
            ejerciciosUsados.add(ex.correcta);
            return ex;
        }
    }
    return generarSentenceQuestion(nivel);
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}
