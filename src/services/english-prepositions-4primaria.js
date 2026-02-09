/**
 * GENERADOR DE PREPOSICIONES (PLACE & TIME) - 4º PRIMARIA
 * 
 * Lógica dinámica para Preposiciones de Lugar y Tiempo.
 * 
 * TIME Rules:
 * - AT: Horas (at 5 o'clock), momentos (at night, at the weekend, at Christmas).
 * - ON: Días (on Monday), fechas (on May 5th), partes del día específicas (on Monday morning).
 * - IN: Meses (in May), estaciones (in summer), años (in 2024), partes del día (in the morning/afternoon/evening).
 * 
 * PLACE Concepts (Spatial):
 * - IN (dentro), ON (sobre), UNDER (debajo), BEHIND (detrás), NEXT TO (al lado), BETWEEN (entre).
 */

// ==========================================
// DATOS: TIME
// ==========================================

const TIME_ITEMS = [
    // AT
    { text: "___ 5 o'clock", answer: "at", type: "time" },
    { text: "___ half past three", answer: "at", type: "time" },
    { text: "___ night", answer: "at", type: "moment" },
    { text: "___ the weekend", answer: "at", type: "moment" },
    { text: "___ Christmas", answer: "at", type: "festival" },
    { text: "___ bedtime", answer: "at", type: "moment" },

    // ON
    { text: "___ Monday", answer: "on", type: "day" },
    { text: "___ Tuesday morning", answer: "on", type: "day_part" },
    { text: "___ my birthday", answer: "on", type: "special_day" },
    { text: "___ 5th May", answer: "on", type: "date" },
    { text: "___ New Year's Day", answer: "on", type: "special_day" },
    { text: "___ Sunday", answer: "on", type: "day" },

    // IN
    { text: "___ the morning", answer: "in", type: "part_day" },
    { text: "___ the afternoon", answer: "in", type: "part_day" },
    { text: "___ the evening", answer: "in", type: "part_day" },
    { text: "___ September", answer: "in", type: "month" },
    { text: "___ summer", answer: "in", type: "season" },
    { text: "___ 2025", answer: "in", type: "year" },
    { text: "___ the winter", answer: "in", type: "season" }
];

// ==========================================
// DATOS: PLACE
// ==========================================

const PLACE_RELATIONS_GENERIC = [
    { text: "The cat is ___ the box (dentro)", answer: "in", es: "dentro" },
    { text: "The book is ___ the table (sobre)", answer: "on", es: "sobre" },
    { text: "The dog is ___ the table (debajo)", answer: "under", es: "debajo" },
    { text: "The mouse is ___ the door (detrás)", answer: "behind", es: "detrás" },
    { text: "The ball is ___ the boxes (entre dos)", answer: "between", es: "entre" },
    { text: "The poster is ___ the wall (en/sobre)", answer: "on", es: "en la pared" },
    { text: "The fish is ___ the water (dentro)", answer: "in", es: "dentro" }
];

const PLACE_RELATIONS_CITY = [
    { text: "The bank is ___ the supermarket (al lado)", answer: "next to", es: "al lado" },
    { text: "The park is ___ the school (detrás)", answer: "behind", es: "detrás" },
    { text: "The bus stop is ___ the cinema (delante)", answer: "in front of", es: "delante" },
    { text: "The library is ___ the museum and the bank (entre)", answer: "between", es: "entre" },
    { text: "The hospital is ___ the station (cerca)", answer: "near", es: "cerca" },
    { text: "The car is ___ the street (en)", answer: "in", es: "en" }
];

const PLACE_RELATIONS_SCHOOL = [
    { text: "The teacher is ___ the board (delante)", answer: "in front of", es: "delante" },
    { text: "The pencil is ___ the pencil case (dentro)", answer: "in", es: "dentro" },
    { text: "The ruler is ___ the desk (sobre)", answer: "on", es: "sobre" },
    { text: "I sit ___ Maria (al lado)", answer: "next to", es: "al lado" },
    { text: "The rubber is ___ the chair (debajo)", answer: "under", es: "debajo" }
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
// NIVEL FÁCIL: TIME PREPOSITIONS (AT/IN/ON)
// ==========================================

function generarTimePrepChoice() {
    const item = getRandomItem(TIME_ITEMS);

    // I go to school ___ 8 o'clock.
    // Or simpler: ___ Monday.
    // Let's use simpler phrases or full sentences if possible.
    // Mix approaches.

    let sentence = Math.random() > 0.5 ? `I go to school ${item.text}.` : `It is cold ${item.text}.`;
    if (item.type === 'day' || item.type === 'month') sentence = `See you ${item.text}.`;

    // Fallback to simple fragment if sentence logic is weak
    const display = Math.random() > 0.3 ? sentence : item.text;

    return {
        tipo: 'grammar',
        subtipo: 'prepositions_time',
        question_type: 'multiple_choice',
        pregunta: `Elige la preposición de TIEMPO correcta: "${display}"`,
        opciones: shuffleArray(['in', 'on', 'at']),
        correcta: item.answer,
        explicacion: `Usamos "${item.answer}" para ${item.type === 'time' ? 'horas' : (item.type === 'day' ? 'días' : 'meses/partes del día')}.`,
        dificultad: 'facil',
        gramatica: 'prepositions_time',
        scope: ['PREP_TIME']
    };
}

// ==========================================
// NIVEL MEDIO: PLACE PREPOSITIONS
// ==========================================

function generarPlacePrepChoice(dummyNivel, dummyVariedad, categoria) { // Recibe categoría
    let pool = PLACE_RELATIONS_GENERIC;

    // Selección de pool según categoría
    if (categoria === 'city' || categoria === 'places' || categoria === 'transport') {
        pool = PLACE_RELATIONS_CITY;
    } else if (categoria === 'school_objects' || categoria === 'school' || categoria === 'daily_routines') {
        pool = PLACE_RELATIONS_SCHOOL;
    }

    const item = getRandomItem(pool);

    // Distractores lógicos
    const distractors = ['in', 'on', 'under', 'behind', 'next to', 'between', 'in front of'].filter(p => p !== item.answer);
    const options = shuffleArray([item.answer, distractors[0], distractors[1], distractors[2]]);

    return {
        tipo: 'grammar',
        subtipo: 'prepositions_place',
        question_type: 'multiple_choice',
        pregunta: `Elige la preposición de LUGAR correcta: "${item.text}"`,
        opciones: options,
        correcta: item.answer,
        explicacion: `"${item.es}" se dice "${item.answer}".`,
        dificultad: 'medio',
        gramatica: 'prepositions_place',
        feedback_card: {
            title: "Preposiciones de Lugar",
            rules: [
                { label: "IN", explanation: "DENTRO de algo.", icon: "📦" },
                { label: "ON", explanation: "ENCIMA de algo.", icon: "桌" },
                { label: "NEXT TO", explanation: "AL LADO de algo.", icon: "👉" },
                { label: "BETWEEN", explanation: "ENTRE dos cosas.", icon: "↔️" }
            ],
            info: "Fíjate en dónde está el objeto respecto al otro."
        },
        scope: ['PREP_PLACE']
    };
}

// ==========================================
// NIVEL DIFÍCIL: MIXED & WRITE
// ==========================================

function generarTraducir() {
    const isTime = Math.random() > 0.5;

    if (isTime) {
        // En lunes -> On Monday
        const item = getRandomItem(TIME_ITEMS);
        const textClean = item.text.replace('___ ', '');
        let esPrefix = '';

        switch (item.answer) {
            case 'on': esPrefix = 'El'; break; // El lunes
            case 'in': esPrefix = 'En'; break; // En mayo
            case 'at': esPrefix = 'A las/En'; break; // A las 5
        }

        // Manual mapping for 'perfect' spanish requires a map. Using heuristic.
        // Let's force a specific known phrase.
        const set = [
            { es: 'El lunes', en: 'On Monday' },
            { es: 'A las 5', en: 'At 5 o\'clock' }, // simplified text match
            { es: 'En verano', en: 'In summer' },
            { es: 'Por la mañana', en: 'In the morning' },
            { es: 'El fin de semana', en: 'At the weekend' }
        ];
        const phrase = getRandomItem(set);

        return {
            tipo: 'grammar',
            subtipo: 'prep_translate',
            question_type: 'text_input',
            pregunta: `Traduce: "${phrase.es}"`,
            correcta: phrase.en,
            accept_variations: [phrase.en, phrase.en.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${phrase.en}`,
            dificultad: 'dificil',
            gramatica: 'prepositions_translate',
            scope: ['PREP_TIME']
        };
    } else {
        // Place translation
        const item = getRandomItem(PLACE_RELATIONS);
        // "Where is the cat? (debajo de la mesa)" -> "under the table"
        // Simplify: "debajo de la mesa" -> "under the table"

        // Extract noun from text: "The book is ___ the table" -> "the table"
        const obj = item.text.split('___ ')[1].split(' (')[0];
        const esPrep = item.es;

        const correct = `${item.answer} ${obj}`;

        return {
            tipo: 'grammar',
            subtipo: 'prep_translate',
            question_type: 'text_input',
            pregunta: `Escribe en inglés: "${esPrep} ${obj.replace('the ', 'la/el ')}"`, // "debajo de la mesa"
            correcta: correct,
            accept_variations: [correct, correct.toLowerCase()],
            case_sensitive: false,
            explicacion: `Respuesta: ${correct}`,
            dificultad: 'dificil',
            gramatica: 'prepositions_translate',
            scope: ['PREP_PLACE']
        };
    }
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

export function generarPrepositions(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarTimePrepChoice, peso: 100 }
        ],
        medio: [
            { func: generarPlacePrepChoice, peso: 60 },
            { func: generarTimePrepChoice, peso: 40 }
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

    return executeWithRetry(selectedFunc);
}

// WRAPPERS ESPECÍFICOS PARA RUTADO ESTRICTO
export function generarPrepositionsTime(nivel) {
    // Si piden solo tiempo, forzamos la función de tiempo
    return executeWithRetry(generarTimePrepChoice);
}

export function generarPrepositionsPlace(nivel, variedad, categoria) {
    // Si piden solo lugar, forzamos la función de lugar CON categoría
    // Nota: El generador executeWithRetry espera funciones sin argumentos, así que usamos arrow function/closure
    return executeWithRetry(() => generarPlacePrepChoice(nivel, variedad, categoria));
}

function executeWithRetry(func) {
    for (let i = 0; i < 10; i++) {
        const ex = func();
        const key = `${ex.pregunta}|${ex.correcta}`;
        if (!ejerciciosUsados.has(key)) {
            ejerciciosUsados.add(key);
            return ex;
        }
    }
    return func();
}

export function resetearEjerciciosUsados() {
    ejerciciosUsados.clear();
}

export default {
    generarPrepositions,
    generarPrepositionsTime,
    generarPrepositionsPlace,
    resetearEjerciciosUsados
};
