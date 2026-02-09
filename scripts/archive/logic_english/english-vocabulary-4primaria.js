/**
 * GENERADOR DE VOCABULARIO INGLÉS 4º PRIMARIA - CON NIVELES DE DIFICULTAD REALES
 * 
 * ✨ NIVELES DE DIFICULTAD:
 * - FÁCIL: Opción múltiple (reconocimiento)
 * - MEDIO: Ordenar palabras, banco de palabras (aplicación)
 * - DIFÍCIL: Texto libre, formar frases (producción)
 * 
 * Vocabulario acumulativo: 350+ palabras
 */

import vocabularyData from '../data/english-4primaria.json';

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
// TIPOS DE EJERCICIO POR NIVEL
// ==========================================

/**
 * Devuelve los tipos de ejercicio según el nivel de dificultad
 * 
 * TEMPORAL: Todos usan opción múltiple hasta que la UI soporte nuevos tipos
 */
/**
 * Devuelve los tipos de ejercicio (SIMPLIFICADO)
 * Ignoramos la complejidad de frases. Nos centramos en vocabulario puro.
 */


// ==========================================
// NIVEL FÁCIL - OPCIÓN MÚLTIPLE
// ==========================================

// Variable para llevar registro de palabras usadas en esta sesión
let palabrasUsadasEnSesion = new Set();

function generarTraduccionEspIngMultiple(categoria = null) {
    const categorias = categoria ? [categoria] : Object.keys(vocabularyData.vocabulary);
    const catSeleccionada = categorias[Math.floor(Math.random() * categorias.length)];
    const palabras = vocabularyData.vocabulary[catSeleccionada];

    if (!palabras || palabras.length === 0) {
        throw new Error(`No hay palabras en la categoría: ${catSeleccionada}`);
    }

    // Filtrar palabras ya usadas
    let palabrasDisponibles = palabras.filter(p => !palabrasUsadasEnSesion.has(p.english));

    // Si ya usamos todas, resetear el conjunto
    if (palabrasDisponibles.length === 0) {
        palabrasUsadasEnSesion.clear();
        palabrasDisponibles = palabras;
    }

    // Seleccionar palabra aleatoria de las disponibles
    const palabra = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)];

    // Marcar como usada
    palabrasUsadasEnSesion.add(palabra.english);

    // Generar opciones incorrectas DE LA MISMA CATEGORÍA (Evitar contaminación)
    const opciones = [palabra.english];

    // Intentar llenar con palabras de la misma categoría
    let safeCounter = 0;
    while (opciones.length < 4 && safeCounter < 50) {
        const otra = palabras[Math.floor(Math.random() * palabras.length)];
        if (!opciones.includes(otra.english)) {
            opciones.push(otra.english);
        }
        safeCounter++;
    }

    // Si la categoría es muy pequeña (<4 palabras), permitimos duplicados o rellenamos con 'None' en el peor caso,
    // pero evitamos sacar palabras de OTROS temas para no confundir al estudiante.
    // (En la práctica, la mayoría de categorías tienen >4 palabras).

    return {
        tipo: 'vocabulary',
        subtipo: 'traduccion_esp_ing_multiple',
        question_type: 'multiple_choice',
        pregunta: `¿Cómo se dice "${palabra.spanish}" en inglés?`,
        operacion: `${palabra.spanish} → ?`,
        opciones: shuffleArray(opciones),
        correcta: palabra.english,
        explicacion: `"${palabra.spanish}" en inglés es "${palabra.english}"`,
        dificultad: 'facil',
        categoria: catSeleccionada
    };
}

function generarTraduccionIngEspMultiple(categoria = null) {
    const categorias = categoria ? [categoria] : Object.keys(vocabularyData.vocabulary);
    const catSeleccionada = categorias[Math.floor(Math.random() * categorias.length)];
    const palabras = vocabularyData.vocabulary[catSeleccionada];

    if (!palabras || palabras.length === 0) {
        throw new Error(`No hay palabras en la categoría: ${catSeleccionada}`);
    }

    // Filtrar palabras ya usadas
    let palabrasDisponibles = palabras.filter(p => !palabrasUsadasEnSesion.has(p.english));

    // Si ya usamos todas, resetear
    if (palabrasDisponibles.length === 0) {
        palabrasUsadasEnSesion.clear();
        palabrasDisponibles = palabras;
    }

    // Seleccionar palabra aleatoria de las disponibles
    const palabra = palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)];

    // Marcar como usada
    palabrasUsadasEnSesion.add(palabra.english);

    const opciones = [palabra.spanish];

    // Intentar llenar con palabras de la misma categoría
    let safeCounter = 0;
    while (opciones.length < 4 && safeCounter < 50) {
        const otra = palabras[Math.floor(Math.random() * palabras.length)];
        if (!opciones.includes(otra.spanish)) {
            opciones.push(otra.spanish);
        }
        safeCounter++;
    }

    return {
        tipo: 'vocabulary',
        subtipo: 'traduccion_ing_esp_multiple',
        question_type: 'multiple_choice',
        pregunta: `¿Qué significa "${palabra.english}" en español?`,
        operacion: `${palabra.english} → ?`,
        opciones: shuffleArray(opciones),
        correcta: palabra.spanish,
        explicacion: `"${palabra.english}" significa "${palabra.spanish}"`,
        dificultad: 'facil',
        categoria: catSeleccionada
    };
}






function generarPossessivesChoice() {
    const tipos = [
        { text: 'I have a book. It is ___ book.', answer: 'my', options: ['your', 'his', 'her'] },
        { text: 'You have a pen. It is ___ pen.', answer: 'your', options: ['my', 'his', 'its'] },
        { text: 'He has a dog. It is ___ dog.', answer: 'his', options: ['her', 'my', 'your'] },
        { text: 'She has a cat. It is ___ cat.', answer: 'her', options: ['his', 'my', 'its'] },
        { text: 'We have a car. It is ___ car.', answer: 'our', options: ['your', 'their', 'us'] },
        { text: 'They have a house. It is ___ house.', answer: 'their', options: ['our', 'your', 'his'] },
        { text: 'The dog has a bone. It is ___ bone.', answer: 'its', options: ['his', 'her', 'my'] }
    ];

    const ejercicio = tipos[Math.floor(Math.random() * tipos.length)];

    return {
        tipo: 'vocabulary',
        subtipo: 'possessives_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa con el posesivo correcto: "${ejercicio.text}"`,
        operacion: "Gramática",
        opciones: shuffleArray([ejercicio.answer, ...ejercicio.options]),
        correcta: ejercicio.answer,
        explicacion: `El posesivo correcto es "${ejercicio.answer}"`,
        dificultad: 'facil',
        categoria: 'possessives'
    };
}

function generarDemonstrativesChoice() {
    const tipos = [
        { text: '___ is a book (aquí/cerca).', answer: 'This', options: ['That', 'These', 'Those'] },
        { text: '___ is a plane (allí/lejos).', answer: 'That', options: ['This', 'These', 'Those'] },
        { text: '___ are my pens (aquí/cerca).', answer: 'These', options: ['Those', 'This', 'That'] },
        { text: '___ are birds (allí/lejos).', answer: 'Those', options: ['These', 'This', 'That'] },
        { text: 'Look at ___ car over there.', answer: 'that', options: ['this', 'these', 'those'] },
        { text: '___ flowers here are beautiful.', answer: 'These', options: ['Those', 'That', 'This'] }
    ];

    const ejercicio = tipos[Math.floor(Math.random() * tipos.length)];

    return {
        tipo: 'vocabulary',
        subtipo: 'demonstratives_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige el demostrativo correcto: "${ejercicio.text}"`,
        operacion: "Gramática",
        opciones: shuffleArray([ejercicio.answer, ...ejercicio.options]),
        correcta: ejercicio.answer,
        explicacion: `Respuesta correcta: ${ejercicio.answer}`,
        dificultad: 'facil',
        categoria: 'demonstratives'
    };
}

function generarAdjectivesChoice() {
    // Generar preguntas de opuestos o definición básica
    const pairs = [
        { adj: 'big', opp: 'small', text: 'The opposite of big is ___' },
        { adj: 'hot', opp: 'cold', text: 'The opposite of hot is ___' },
        { adj: 'happy', opp: 'sad', text: 'The opposite of happy is ___' },
        { adj: 'fast', opp: 'slow', text: 'The opposite of fast is ___' },
        { adj: 'old', opp: 'new', text: 'The opposite of old is ___' },
        { adj: 'tall', opp: 'short', text: 'The opposite of tall is ___' },
        { adj: 'good', opp: 'bad', text: 'The opposite of good is ___' }
    ];

    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    // Encontrar incorrectas aleatorias
    const distractors = pairs.filter(p => p.opp !== pair.opp).map(p => p.opp).slice(0, 3);

    return {
        tipo: 'vocabulary',
        subtipo: 'adjectives_choice',
        question_type: 'multiple_choice',
        pregunta: `Completa la frase: "${pair.text}"`,
        operacion: "Opuestos",
        opciones: shuffleArray([pair.opp, ...distractors].slice(0, 4)), // ensure 4 options
        correcta: pair.opp,
        explicacion: `Lo contrario de ${pair.adj} es ${pair.opp}.`,
        dificultad: 'facil',
        categoria: 'adjectives'
    };
}

function generarAdverbsChoice() {
    // Adverbios de frecuencia (orden) o modo (adj -> adv)
    const types = [
        { text: 'He runs ___ (rápido)', answer: 'quickly', options: ['quick', 'quicks', 'quicker'] },
        { text: 'She sings ___ (bien)', answer: 'well', options: ['good', 'goodly', 'bad'] },
        { text: 'They play ___ (mal)', answer: 'badly', options: ['bad', 'badder', 'wrong'] },
        { text: 'Please speak ___ (bajo)', answer: 'quietly', options: ['quiet', 'quiets', 'loudly'] },
        { text: 'I ___ play football (siempre)', answer: 'always', options: ['never', 'sometimes', 'yesterday'] }
    ];

    const ex = types[Math.floor(Math.random() * types.length)];

    return {
        tipo: 'vocabulary',
        subtipo: 'adverbs_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la opción correcta: "${ex.text}"`,
        operacion: "Gramática",
        opciones: shuffleArray([ex.answer, ...ex.options]),
        correcta: ex.answer,
        explicacion: `La forma adverbial correcta es "${ex.answer}".`,
        dificultad: 'facil',
        categoria: 'adverbs'
    };
}

function generarWhQuestionsChoice() {
    const tipos = [
        { text: '___ is your name? (Qué/Cómo)', answer: 'What', options: ['Where', 'Who', 'When'] },
        { text: '___ do you live? (Dónde)', answer: 'Where', options: ['What', 'Who', 'Why'] },
        { text: '___ is that boy? (Quién)', answer: 'Who', options: ['What', 'Where', 'When'] },
        { text: '___ is your birthday? (Cuándo)', answer: 'When', options: ['Where', 'What', 'Who'] },
        { text: '___ are you sad? (Por qué)', answer: 'Why', options: ['Where', 'What', 'Who'] },
        { text: '___ old are you? (Cuántos/Cómo)', answer: 'How', options: ['What', 'Where', 'Who'] }
    ];

    const ejercicio = tipos[Math.floor(Math.random() * tipos.length)];

    return {
        tipo: 'vocabulary',
        subtipo: 'wh_questions_choice',
        question_type: 'multiple_choice',
        pregunta: `Elige la palabra interrogativa correcta: "${ejercicio.text}"`,
        operacion: "Gramática",
        opciones: shuffleArray([ejercicio.answer, ...ejercicio.options]),
        correcta: ejercicio.answer,
        explicacion: `Respuesta correcta: ${ejercicio.answer}`,
        dificultad: 'facil',
        categoria: 'wh_questions'
    };
}



// ==========================================
// NIVEL MEDIO - ORDENAR Y BANCO
// ==========================================

// (Eliminadas funciones de frases complejas: Completar, Ordenar, Banco)

// Función para resetear el registro de palabras usadas (llamar al inicio de cada ficha)
export function resetearPalabrasUsadas() {
    palabrasUsadasEnSesion.clear();
}

export default {
    generarVocabulario,
    resetearPalabrasUsadas
};

function generarTraduccionTextoLibre(categoria = null) {
    const categorias = categoria ? [categoria] : Object.keys(vocabularyData.vocabulary);
    const catSeleccionada = categorias[Math.floor(Math.random() * categorias.length)];
    const palabras = vocabularyData.vocabulary[catSeleccionada];

    if (!palabras || palabras.length === 0) {
        throw new Error(`No hay palabras en la categoría: ${catSeleccionada}`);
    }

    const palabra = palabras[Math.floor(Math.random() * palabras.length)];

    // Variaciones aceptadas (errores comunes de ortografía)
    const variations = [
        palabra.english.toLowerCase(),
        palabra.english,
        palabra.english.charAt(0).toUpperCase() + palabra.english.slice(1)
    ];

    return {
        tipo: 'vocabulary',
        subtipo: 'traduccion_texto_libre',
        question_type: 'text_input',
        pregunta: `Escribe "${palabra.spanish}" en inglés:`,
        correcta: palabra.english,
        accept_variations: variations,
        case_sensitive: false,
        explicacion: `Respuesta: "${palabra.english}"`,
        dificultad: 'dificil',
        categoria: catSeleccionada
    };
}

// (Eliminadas funciones de frases complejas: Formar frase, Traducir frase)

// ==========================================
// FUNCIÓN PRINCIPAL SIMPLIFICADA
// ==========================================

export function generarVocabulario(nivel = 'facil', conVariedad = true, categoria = null) {
    // Ignoramos el nivel de dificultad para Vocabulario puro.
    // Usamos una mezcla equilibrada de ejercicios efectivos.

    console.log('🎯 [VOCAB] Generando ejercicio para categoría:', categoria);

    // Tipos de ejercicios permitidos (60% Escritura / 40% Selección)
    const tipos = [
        { func: generarTraduccionEspIngMultiple, peso: 20 }, // Simple Choice
        { func: generarTraduccionIngEspMultiple, peso: 20 }, // Simple Choice Reverse
        { func: generarTraduccionTextoLibre, peso: 60 },     // Text Input (Spelling)
    ];

    // Manejo de categorías especiales (Gramática disfrazada de vocabulario)
    if (categoria === 'possessives') return generarPossessivesChoice();
    if (categoria === 'demonstratives') return generarDemonstrativesChoice();
    if (categoria === 'adjectives') return generarAdjectivesChoice();
    if (categoria === 'adverbs') return generarAdverbsChoice();
    if (categoria === 'wh_questions') return generarWhQuestionsChoice();

    // Selección aleatoria por peso
    const totalPeso = tipos.reduce((acc, t) => acc + t.peso, 0);
    let rand = Math.random() * totalPeso;

    let funcionElegida = tipos[0].func;
    for (const t of tipos) {
        rand -= t.peso;
        if (rand <= 0) {
            funcionElegida = t.func;
            break;
        }
    }

    return funcionElegida(categoria);
}

// (Eliminado Odd One Out)
