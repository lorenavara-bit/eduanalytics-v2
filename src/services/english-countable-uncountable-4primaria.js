/**
 * GENERADOR DE COUNTABLE / UNCOUNTABLE - 4º PRIMARIA
 * 
 * Includes:
 * - Identification: Is it Countable or Uncountable?
 * - Quantifiers: How much vs How many.
 * - Articles/Quantifiers: A/An/Some/Any check (complementing There Is/Are).
 */

// ==========================================
// DATOS
// ==========================================

const NOUNS = [
    // Countable
    { word: 'apple', type: 'C', es: 'manzana', plural: 'apples' },
    { word: 'car', type: 'C', es: 'coche', plural: 'cars' },
    { word: 'dog', type: 'C', es: 'perro', plural: 'dogs' },
    { word: 'book', type: 'C', es: 'libro', plural: 'books' },
    { word: 'pencil', type: 'C', es: 'lápiz', plural: 'pencils' },
    { word: 'student', type: 'C', es: 'estudiante', plural: 'students' },
    { word: 'banana', type: 'C', es: 'plátano', plural: 'bananas' },
    { word: 'chair', type: 'C', es: 'silla', plural: 'chairs' },

    // Uncountable
    { word: 'water', type: 'U', es: 'agua' },
    { word: 'milk', type: 'U', es: 'leche' },
    { word: 'money', type: 'U', es: 'dinero' },
    { word: 'sugar', type: 'U', es: 'azúcar' },
    { word: 'bread', type: 'U', es: 'pan' },
    { word: 'cheese', type: 'U', es: 'queso' },
    { word: 'chocolate', type: 'U', es: 'chocolate' }, // Can be both, usually U in this context
    { word: 'rain', type: 'U', es: 'lluvia' },
    { word: 'snow', type: 'U', es: 'nieve' },
    { word: 'music', type: 'U', es: 'música' }
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
// NIVEL FÁCIL: IDENTIFICATION & HOW MUCH/MANY
// ==========================================

function generarIdentificationChoice() {
    const item = getRandomItem(NOUNS);

    return {
        tipo: 'grammar',
        subtipo: 'count_uncount_id',
        question_type: 'multiple_choice',
        pregunta: `¿"${item.word}" (${item.es}) es Contable o Incontable?`,
        opciones: shuffleArray(['Countable', 'Uncountable']),
        correcta: item.type === 'C' ? 'Countable' : 'Uncountable',
        explicacion: `"${item.word}" es ${item.type === 'C' ? 'contable (puedes contar 1, 2...)' : 'incontable (no puedes decir "un agua")'}.`,
        dificultad: 'facil',
        gramatica: 'countable_uncountable_id'
    };
}

function generarHowMuchManyChoice() {
    const item = getRandomItem(NOUNS);

    // How ___ apples...? How ___ water...?
    const nounDisplay = item.type === 'C' ? item.plural : item.word;
    const sentence = `How ___ ${nounDisplay} do you have?`;
    const correct = item.type === 'C' ? 'many' : 'much';

    return {
        tipo: 'grammar',
        subtipo: 'how_much_many_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige: "${sentence}"`,
        opciones: shuffleArray(['many', 'much', 'some', 'any']),
        correcta: correct,
        explicacion: `Usamos "${correct}" para ${item.type === 'C' ? 'contables' : 'incontables'}.`,
        dificultad: 'facil',
        gramatica: 'how_much_many'
    };
}

// ==========================================
// NIVEL MEDIO: A/AN/SOME/ANY
// ==========================================

function generarQuantifierChoice() {
    const item = getRandomItem(NOUNS);

    // Rules:
    // C Singular: a/an
    // C Plural: some (aff) / any (neg)
    // U: some (aff) / any (neg) - NEVER a/an

    const isNegative = Math.random() > 0.5;
    let sentence, correct;

    if (item.type === 'C') {
        const isSingular = Math.random() > 0.5;
        if (isSingular) {
            // I have ___ apple.
            sentence = `I have ___ ${item.word}.`;
            const vowel = ['a', 'e', 'i', 'o', 'u'].includes(item.word[0].toLowerCase());
            correct = vowel ? 'an' : 'a';
        } else {
            // I have / I don't have ___ apples.
            if (isNegative) {
                sentence = `I haven't got ___ ${item.plural}.`;
                correct = 'any';
            } else {
                sentence = `I have got ___ ${item.plural}.`;
                correct = 'some';
            }
        }
    } else {
        // Uncountable
        if (isNegative) {
            sentence = `I haven't got ___ ${item.word}.`;
            correct = 'any';
        } else {
            sentence = `I have got ___ ${item.word}.`;
            correct = 'some';
        }
    }

    // Filter valid distractors dependent on correct answer
    // If correct is 'a', distractors shouldn't be 'one' (technically correct)

    return {
        tipo: 'grammar',
        subtipo: 'count_quantifier',
        question_type: 'multiple_choice',
        pregunta: `Elige la opción correcta: "${sentence}"`,
        opciones: shuffleArray(['a', 'an', 'some', 'any']),
        correcta: correct,
        explicacion: `Respuesta correcta: ${correct}`,
        dificultad: 'medio',
        gramatica: 'quantifiers_general'
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN
// ==========================================

function generarTraducir() {
    const item = getRandomItem(NOUNS);
    const isQuestion = Math.random() > 0.5;

    if (isQuestion) {
        // ¿Cuánta/Cuántos...?
        const es = item.type === 'C' ? `¿Cuántos ${item.es}s tienes?` : `¿Cuánto ${item.es} tienes?`; // Simplified plural es
        // Fix es plural manually/heurisitcally if needed, usually adding 's' works for simple words
        // "Cuántos coches"

        const en = item.type === 'C'
            ? `How many ${item.plural} do you have?`
            : `How much ${item.word} do you have?`;

        return {
            tipo: 'grammar',
            subtipo: 'count_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${es}"`,
            correcta: en,
            accept_variations: [en, en.replace('do you have', 'have you got'), en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${en}`,
            dificultad: 'dificil',
            gramatica: 'how_much_many_translation'
        };
    } else {
        // I want some water / I want an apple
        const es = item.type === 'C' ? `Quiero un/una ${item.es}` : `Quiero ${item.es}`;
        const vowel = ['a', 'e', 'i', 'o', 'u'].includes(item.word[0].toLowerCase());
        const article = item.type === 'C' ? (vowel ? 'an' : 'a') : 'some'; // Want 'some' water naturally

        const en = `I want ${article} ${item.word}`;

        // Uncountable Spanish often implies 'un poco de' or just 'agua'.
        // "Quiero agua" -> "I want water" or "I want some water".
        // Let's stick to "some" for U in English as 'correct' grammar drill.

        return {
            tipo: 'grammar',
            subtipo: 'count_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${es}"`,
            correcta: en,
            accept_variations: [en, `I want ${item.word}`, en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${en}`,
            dificultad: 'dificil',
            gramatica: 'count_article_translation'
        };
    }
}

// ==========================================
// PRINCIPAL
// ==========================================

export function generarCountableUncountable(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarIdentificationChoice, peso: 40 },
            { func: generarHowMuchManyChoice, peso: 60 }
        ],
        medio: [
            { func: generarQuantifierChoice, peso: 100 }
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
    generarCountableUncountable,
    resetearEjerciciosUsados
};
