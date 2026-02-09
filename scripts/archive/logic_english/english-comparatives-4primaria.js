/**
 * GENERADOR DE COMPARATIVOS Y SUPERLATIVOS - 4º PRIMARIA
 * 
 * Reglas cubiertas:
 * 1. General: +er / +est (tall -> taller, tallest)
 * 2. Acabados en 'e': +r / +st (large -> larger, largest)
 * 3. Acabados en 'y': y -> i + er / est (happy -> happier, happiest)
 * 4. CVC (Doble consonante): big -> bigger, biggest
 * 5. Irregulares: good -> better, best / bad -> worse, worst
 * 6. Largos (Introducción): more ... / the most ...
 */

const ADJECTIVES = [
    // Rule 1: General
    { adj: 'tall', comp: 'taller', sup: 'the tallest', rule: 'general', spanish: 'alto' },
    { adj: 'short', comp: 'shorter', sup: 'the shortest', rule: 'general', spanish: 'bajo' },
    { adj: 'fast', comp: 'faster', sup: 'the fastest', rule: 'general', spanish: 'rápido' },
    { adj: 'slow', comp: 'slower', sup: 'the slowest', rule: 'general', spanish: 'lento' },
    { adj: 'old', comp: 'older', sup: 'the oldest', rule: 'general', spanish: 'viejo' },
    { adj: 'young', comp: 'younger', sup: 'the youngest', rule: 'general', spanish: 'joven' },
    { adj: 'long', comp: 'longer', sup: 'the longest', rule: 'general', spanish: 'largo' },

    // Rule 2: Ends in 'e'
    { adj: 'large', comp: 'larger', sup: 'the largest', rule: 'silent_e', spanish: 'grande' },
    { adj: 'nice', comp: 'nicer', sup: 'the nicest', rule: 'silent_e', spanish: 'agradable' },
    { adj: 'late', comp: 'later', sup: 'the latest', rule: 'silent_e', spanish: 'tarde' },

    // Rule 3: Ends in 'y'
    { adj: 'happy', comp: 'happier', sup: 'the happiest', rule: 'y_rule', spanish: 'feliz' },
    { adj: 'funny', comp: 'funnier', sup: 'the funniest', rule: 'y_rule', spanish: 'divertido' },
    { adj: 'heavy', comp: 'heavier', sup: 'the heaviest', rule: 'y_rule', spanish: 'pesado' },
    { adj: 'easy', comp: 'easier', sup: 'the easiest', rule: 'y_rule', spanish: 'fácil' },

    // Rule 4: Double consonant (CVC)
    { adj: 'big', comp: 'bigger', sup: 'the biggest', rule: 'double_cons', spanish: 'grande' },
    { adj: 'hot', comp: 'hotter', sup: 'the hottest', rule: 'double_cons', spanish: 'caluroso' },
    { adj: 'fat', comp: 'fatter', sup: 'the fattest', rule: 'double_cons', spanish: 'gordo' },
    { adj: 'thin', comp: 'thinner', sup: 'the thinnest', rule: 'double_cons', spanish: 'delgado' },
    { adj: 'sad', comp: 'sadder', sup: 'the saddest', rule: 'double_cons', spanish: 'triste' },

    // Rule 5: Irregular
    { adj: 'good', comp: 'better', sup: 'the best', rule: 'irregular', spanish: 'bueno' },
    { adj: 'bad', comp: 'worse', sup: 'the worst', rule: 'irregular', spanish: 'malo' },

    // Rule 6: Long (Intro)
    { adj: 'beautiful', comp: 'more beautiful', sup: 'the most beautiful', rule: 'long', spanish: 'bonito' },
    { adj: 'expensive', comp: 'more expensive', sup: 'the most expensive', rule: 'long', spanish: 'caro' },
    { adj: 'interesting', comp: 'more interesting', sup: 'the most interesting', rule: 'long', spanish: 'interesante' }
];

// Sujetos y objetos para frases de contexto
// Sujetos y objetos para frases de contexto CLASIFICADOS
const CONTEXTS = [
    // ANIMALS
    { s: 'The elephant', o: 'the mouse', adj_types: ['big', 'heavy', 'large'], category: ['animals', 'nature'] },
    { s: 'The mouse', o: 'the elephant', adj_types: ['small', 'light', 'short'], category: ['animals', 'nature'] },
    { s: 'The cheetah', o: 'the turtle', adj_types: ['fast'], category: ['animals', 'nature'] },
    { s: 'The turtle', o: 'the cheetah', adj_types: ['slow'], category: ['animals', 'nature'] },

    // NATURE / WEATHER
    { s: 'Summer', o: 'winter', adj_types: ['hot'], category: ['nature', 'weather'] },
    { s: 'Winter', o: 'summer', adj_types: ['cold'], category: ['nature', 'weather'] },

    // FAMILY / PEOPLE
    { s: 'My grandfather', o: 'my baby brother', adj_types: ['old'], category: ['family', 'people'] },
    { s: 'The baby', o: 'the grandfather', adj_types: ['young'], category: ['family', 'people'] },

    // TRANSPORT
    { s: 'A plane', o: 'a car', adj_types: ['fast', 'expensive'], category: ['transport'] },
    { s: 'A car', o: 'a bike', adj_types: ['fast', 'expensive'], category: ['transport'] },

    // SCHOOL / SUBJECTS
    { s: 'English', o: 'Maths', adj_types: ['easy', 'interesting', 'fun'], category: ['school'] }
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
// NIVEL FÁCIL: SELECTOR DE FORMA CORRECTA
// ==========================================

/**
 * Elige la forma comparativa correcta del adjetivo dado.
 * Ej: Comparative of 'happy': happyer, happier, more happy
 */
function generarFormaComparativaChoice() {
    const item = getRandomItem(ADJECTIVES);

    // Distractores comunes
    let options = [item.comp];

    // Generar errores típicos según regla
    if (item.rule === 'y_rule') options.push(item.adj + 'er'); // happyer
    else if (item.rule === 'double_cons') options.push(item.adj + 'er'); // biger
    else if (item.rule === 'long') options.push(item.adj + 'er'); // beautifuler
    else if (item.rule === 'irregular') options.push(item.adj + 'er'); // gooder/badder

    // Generic error: more + short adj
    if (item.rule !== 'long') options.push('more ' + item.adj);

    // Generic spelling error or superlative as distractor
    options.push(item.sup.replace('the ', ''));

    // Asegurar 3-4 opciones únicas
    options = [...new Set(options)].slice(0, 4);
    if (options.length < 3) options.push(item.adj);

    return {
        tipo: 'grammar',
        subtipo: 'comparative_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige el comparativo correcto de "${item.adj}" (${item.spanish}):`,
        opciones: shuffleArray(options),
        correcta: item.comp,
        explicacion: `El comparativo de ${item.adj} es "${item.comp}".`,
        dificultad: 'facil',
        gramatica: 'comparatives_spelling',
        scope: ['GRAMMAR_COMPARATIVES']
    };
}

/**
 * Elige la forma superlativa correcta
 */
function generarFormaSuperlativaChoice() {
    const item = getRandomItem(ADJECTIVES);

    let options = [item.sup];

    // Errores comunes (sin 'the', spelling, etc)
    const supWord = item.sup.replace('the ', '');

    options.push(supWord); // falta 'the'

    if (item.rule === 'y_rule') options.push('the ' + item.adj + 'est'); // the happyest
    else if (item.rule === 'double_cons') options.push('the ' + item.adj + 'est'); // the bigest
    else if (item.rule === 'irregular') options.push('the ' + item.adj + 'est'); // the goodest

    if (item.rule !== 'long') options.push('the most ' + item.adj);

    options = [...new Set(options)].slice(0, 4);

    return {
        tipo: 'grammar',
        subtipo: 'superlative_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige el superlativo correcto de "${item.adj}" (${item.spanish}):`,
        opciones: shuffleArray(options),
        correcta: item.sup,
        explicacion: `El superlativo de ${item.adj} es "${item.sup}".`,
        dificultad: 'facil',
        gramatica: 'superlatives_spelling',
        scope: ['GRAMMAR_SUPERLATIVES']
    };
}

// ==========================================
// NIVEL MEDIO: COMPLETAR FRASES Y ORDENAR
// ==========================================

/**
 * Completar frase con Comparativo: "A dog is ___ than a mouse."
 */
/**
 * Completar frase con Comparativo: "A dog is ___ than a mouse."
 * AHORA FILTRADO POR CATEGORÍA
 */
function generarCompletarFraseComp(categoria = null) {
    // 1. Filtrar contextos válidos para la categoría
    let validContexts = CONTEXTS;
    if (categoria) {
        // Buscamos contextos que incluyan la categoría recibida
        // Ojo: categoria puede ser string ('animals') o array si el caller lo maneja así.
        // Asumimos string simple por ahora o check includes.
        validContexts = CONTEXTS.filter(c => c.category && c.category.includes(categoria));
    }

    // 2. Si no hay contextos válidos para esta categoría (ej: 'clothes'), 
    // NO generamos frases absurdas. Devolvemos un ejercicio de gramática pura (Write Comparative).
    if (validContexts.length === 0) {
        return generarEscribirComparativo();
    }

    // 3. Generar frase válida
    const con = getRandomItem(validContexts);

    // Filtrar adjetivos que estén en la lista de tipos del contexto
    const validAdjs = ADJECTIVES.filter(a => con.adj_types && con.adj_types.includes(a.adj));
    const adj = validAdjs.length > 0 ? getRandomItem(validAdjs) : getRandomItem(ADJECTIVES); // Fallback interno si falla array


    const sentence = `${con.s} is ___ than ${con.o}. (${adj.spanish})`;
    const correct = adj.comp;

    return {
        tipo: 'grammar',
        subtipo: 'comparative_sentence',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase comparativa: "${sentence}"`,
        opciones: shuffleArray([correct, adj.sup, adj.adj, `more ${adj.adj}`]),
        correcta: correct,
        explicacion: `COMPARATIVO: ${con.s} is ${correct} than ${con.o}.`,
        dificultad: 'medio',
        gramatica: 'comparatives_sentence',
        scope: ['GRAMMAR_COMPARATIVES']
    };
}

/**
 * Completar frase con Superlativo: "The cheetah is the ___ animal."
 */
function generarCompletarFraseSup() {
    // Ejemplos genéricos de superlativos
    const items = [
        { s: 'The cheetah', group: 'animal', adj: 'fast' },
        { s: 'The tortoise', group: 'animal', adj: 'slow' },
        { s: 'The blue whale', group: 'animal', adj: 'big' },
        { s: 'My grandfather', group: 'person in my family', adj: 'old' },
        { s: 'Mount Everest', group: 'mountain', adj: 'high' }, // High not in list, fallback needed? Added simple ones
        { s: 'Summer', group: 'season', adj: 'hot' },
        { s: 'Winter', group: 'season', adj: 'cold' }
    ];

    // Tratamos de matchear con nuestro diccionario para obtener las formas correctas
    const ctx = getRandomItem(items);
    let adjObj = ADJECTIVES.find(a => a.adj === ctx.adj);

    // Fallback si no está (e.g. high)
    if (!adjObj) {
        // Mock simple regular object
        adjObj = { adj: ctx.adj, comp: ctx.adj + 'er', sup: 'the ' + ctx.adj + 'est', spanish: ctx.adj };
    }

    const sentence = `${ctx.s} is ___ ${ctx.group}. (${adjObj.spanish})`;
    const correct = adjObj.sup; // Includes 'the' usually, but check sentence structure

    // Si la frase ya tiene 'the' antes del hueco, ajustamos.
    // En este template: "is ___ group", no hay 'the'.

    return {
        tipo: 'grammar',
        subtipo: 'superlative_sentence',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase superlativa: "${sentence}"`,
        opciones: shuffleArray([correct, adjObj.comp, adjObj.adj, correct.replace('the ', '')]),
        correcta: correct,
        explicacion: `SUPERLATIVO: ${ctx.s} is ${correct} ${ctx.group}.`,
        dificultad: 'medio',
        gramatica: 'superlatives_sentence',
        scope: ['GRAMMAR_SUPERLATIVES']
    };
}

// ==========================================
// NIVEL DIFÍCIL: ESCRIBIR FRASES
// ==========================================

function generarEscribirComparativo() {
    const item = getRandomItem(ADJECTIVES);
    return {
        tipo: 'grammar',
        subtipo: 'write_comparative',
        question_type: 'text_input',
        pregunta: `Escribe el COMPARATIVO de: "${item.adj}"`,
        correcta: item.comp,
        accept_variations: [item.comp, item.comp.toLowerCase()],
        case_sensitive: false,
        explicacion: `${item.adj} -> ${item.comp}`,
        dificultad: 'dificil',
        gramatica: 'comparatives_write',
        scope: ['GRAMMAR_COMPARATIVES']
    };
}

function generarEscribirSuperlativo() {
    const item = getRandomItem(ADJECTIVES);
    return {
        tipo: 'grammar',
        subtipo: 'write_superlative',
        question_type: 'text_input',
        pregunta: `Escribe el SUPERLATIVO de: "${item.adj}" (No olvides 'the')`,
        correcta: item.sup,
        accept_variations: [item.sup, item.sup.toLowerCase()],
        case_sensitive: false,
        explicacion: `${item.adj} -> ${item.sup}`,
        dificultad: 'dificil',
        gramatica: 'superlatives_write',
        scope: ['GRAMMAR_SUPERLATIVES']
    };
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarComparatives(nivel = 'facil', variedad = true, categoria = null) {
    console.log(`🎯 [COMPARATIVES] Generando con Categoria: ${categoria}`);

    // Si la categoría NO tiene contextos definidos (ej: clothes, food),
    // forzamos ejercicios de GRAMÁTICA PURA (spelling/writing) para evitar "The pizza is faster than soup".
    const categoryHasContext = categoria && CONTEXTS.some(c => c.category.includes(categoria));

    if (categoria && !categoryHasContext) {
        // Modo Seguro: Solo ejercicios de formación de palabras
        const tiposSeguros = [generarFormaComparativaChoice, generarFormaSuperlativaChoice, generarEscribirComparativo];
        return getRandomItem(tiposSeguros)();
    }

    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: (cat) => generarFormaComparativaChoice(cat), peso: 50 },
            { func: (cat) => generarFormaSuperlativaChoice(cat), peso: 50 }
        ],
        medio: [
            { func: (cat) => generarCompletarFraseComp(cat), peso: 50 },
            { func: (cat) => generarCompletarFraseSup(cat), peso: 50 }
        ],
        dificil: [
            { func: (cat) => generarEscribirComparativo(cat), peso: 50 },
            { func: (cat) => generarEscribirSuperlativo(cat), peso: 50 }
        ]
    };

    const tipos = tiposPorNivel[nivelNormalizado] || tiposPorNivel.facil;

    const total = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * total;

    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) return t.func(categoria);
    }
    return tipos[0].func(categoria);
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarComparatives,
    resetearEjerciciosUsados
};
