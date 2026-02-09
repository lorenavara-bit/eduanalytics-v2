/**
 * GENERADOR DE POSESIVOS Y DEMOSTRATIVOS - 4º PRIMARIA
 * 
 * Includes:
 * - Possessive Adjectives: My, Your, His, Her, Its, Our, Their.
 * - Demonstratives: This, That (Singular) / These, Those (Plural).
 */

// ==========================================
// DATOS
// ==========================================

const POSSESSIVES = [
    { subject: 'I', poss: 'my', es: 'mi' },
    { subject: 'You', poss: 'your', es: 'tu' },
    { subject: 'He', poss: 'his', es: 'su (de él)' },
    { subject: 'She', poss: 'her', es: 'su (de ella)' },
    { subject: 'It', poss: 'its', es: 'su (animal/cosa)' },
    { subject: 'We', poss: 'our', es: 'nuestro' },
    { subject: 'They', poss: 'their', es: 'su (de ellos)' }
];

const DEMONSTRATIVES = [
    { word: 'This', type: 'near', number: 'singular', es: 'Este/Esta' },
    { word: 'That', type: 'far', number: 'singular', es: 'Ese/Esa/Aquel' },
    { word: 'These', type: 'near', number: 'plural', es: 'Estos/Estas' },
    { word: 'Those', type: 'far', number: 'plural', es: 'Esos/Esas/Aquellos' }
];

const OBJECTS = [
    { s: 'book', p: 'books', es: 'libro' },
    { s: 'cat', p: 'cats', es: 'gato' },
    { s: 'apple', p: 'apples', es: 'manzana' },
    { s: 'car', p: 'cars', es: 'coche' },
    { s: 'flower', p: 'flowers', es: 'flor' }
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
// NIVEL FÁCIL: CHOICE
// ==========================================

function generarPossChoice() {
    const item = getRandomItem(POSSESSIVES);
    const obj = getRandomItem(OBJECTS);

    // I have a book. It is ___ book.
    const sentence = `${item.subject} have a ${obj.s}. It is ___ ${obj.s}.`;

    // Distractores: subjetos, otros posesivos
    const options = shuffleArray([item.poss, item.subject, 'me', 'you']);

    return {
        tipo: 'grammar',
        subtipo: 'possessive_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con el Posesivo correcto: "${sentence}"`,
        opciones: options.slice(0, 4),
        correcta: item.poss,
        explicacion: `El posesivo de ${item.subject} es "${item.poss}".`,
        dificultad: 'facil',
        gramatica: 'possessives_basic',
        scope: ['GRAMMAR_POSSESSIVES']
    };
}

function generarDemoChoice() {
    const demo = getRandomItem(DEMONSTRATIVES);
    const obj = getRandomItem(OBJECTS);

    const noun = demo.number === 'singular' ? obj.s : obj.p;
    const verb = demo.number === 'singular' ? 'is' : 'are';

    // ___ is a book (near).
    // Context clues: (aquí/cerca) vs (allí/lejos)
    const clue = demo.type === 'near' ? 'cerca / here' : 'lejos / there';

    const sentence = `___ ${verb} ${demo.number === 'singular' ? 'a' : ''} ${noun}. (${clue})`;
    const options = ['This', 'That', 'These', 'Those'];

    return {
        tipo: 'grammar',
        subtipo: 'demonstrative_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige el Demostrativo correcto: "${sentence}"`,
        opciones: shuffleArray(options),
        correcta: demo.word,
        explicacion: `Usamos "${demo.word}" para ${demo.number} y ${demo.type === 'near' ? 'cerca' : 'lejos'}.`,
        dificultad: 'facil',
        gramatica: 'demonstratives_basic',
        scope: ['GRAMMAR_DEMONSTRATIVES']
    };
}

// ==========================================
// NIVEL MEDIO: COMPLETAR
// ==========================================

function generarPossContext() {
    // Contexto: Is this YOUR book? No, it's MY book.
    // Question: Is that ___ (she) bag?
    const person = getRandomItem(POSSESSIVES.filter(p => p.subject !== 'I' && p.subject !== 'It'));
    const obj = getRandomItem(OBJECTS);

    const sentence = `Is that ${person.poss} ${obj.s}? (${person.es})`;

    return {
        tipo: 'grammar',
        subtipo: 'possessive_context',
        question_type: 'multiple_choice',
        pregunta: `Elige el posesivo: "${sentence}"`,
        opciones: shuffleArray([person.poss, person.subject, 'my', 'your']),
        correcta: person.poss,
        explicacion: `${person.subject} -> ${person.poss}`,
        dificultad: 'medio',
        gramatica: 'possessives_context',
        scope: ['GRAMMAR_POSSESSIVES']
    };
}

// ==========================================
// NIVEL DIFÍCIL: TRADUCCIÓN
// ==========================================

function generarTraducir() {
    const isPoss = Math.random() > 0.5;

    if (isPoss) {
        const item = getRandomItem(POSSESSIVES);
        const obj = getRandomItem(OBJECTS);
        const es = `${item.subject === 'I' ? 'Mi' : (item.subject === 'You' ? 'Tu' : 'Su')} ${obj.es}`; // Simplificado
        // Mejor usar el campo 'es' del objeto item
        // "Nuestro coche"
        const esFull = `${item.es.split(' ')[0]} ${obj.es}`; // "nuestro coche" (ignoring gender match for now, simple approach)
        // Correction: 'Nuestra manzana'. Logic is complex for gender.
        // Let's use simple phrase: "My name" -> "Mi nombre".

        const phraseEn = `${item.poss} name`;
        const phraseEs = `${item.es.split(' ')[0]} nombre`;
        if (item.subject === 'I') {
            return {
                tipo: 'grammar',
                subtipo: 'poss_translate',
                question_type: 'text_input',
                pregunta: `Traduce: "Mi ${obj.es}"`,
                correcta: `my ${obj.s}`,
                accept_variations: [`my ${obj.s}`, `my ${obj.s}.`],
                case_sensitive: false,
                explicacion: `Mi -> My`,
                dificultad: 'dificil',
                gramatica: 'possessives_translate',
                scope: ['GRAMMAR_POSSESSIVES']
            };
        }

        // Default difficult -> Demonstratives
        const demo = getRandomItem(DEMONSTRATIVES);
        const o = getRandomItem(OBJECTS);
        const n = demo.number === 'singular' ? o.s : o.p;

        const esDemo = `${demo.es.split('/')[0]} ${o.es}`; // Este libro
        const enDemo = `${demo.word} ${n}`;

        return {
            tipo: 'grammar',
            subtipo: 'demo_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${demo.es.split('/')[0]} ${demo.number === 'singular' ? o.es : o.es + 's'}"`, // Este libro
            correcta: enDemo,
            accept_variations: [enDemo, enDemo.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${enDemo}`,
            dificultad: 'dificil',
            gramatica: 'demonstratives_translate',
            scope: ['GRAMMAR_DEMONSTRATIVES']
        };
    }

    // Fallback logic
    return generarTraducir();
}

// ==========================================
// PRINCIPAL
// ==========================================

export function generarPossDemonstratives(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarPossChoice, peso: 50 },
            { func: generarDemoChoice, peso: 50 }
        ],
        medio: [
            { func: generarPossContext, peso: 60 },
            { func: generarDemoChoice, peso: 40 }
        ],
        dificil: [
            { func: generarTraducir, peso: 100 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) return t.func();
    }
    return tipos[0].func();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarPossDemonstratives,
    resetearEjerciciosUsados
};
