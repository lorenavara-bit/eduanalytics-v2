/**
 * GENERADOR DE FECHAS Y TIEMPO ATMOSFÉRICO (Calendar & Weather)
 * Nivel: 3º-4º Primaria (LOMLOE)
 * 
 * Cubre:
 * - Days of the week (Monday, Tuesday...)
 * - Months of the year (January, February...)
 * - Ordinal Numbers (1st, 2nd, 3rd...) for dates.
 * - Weather (Sunny, Rainy, Cloudy...)
 * - Seasons (Spring, Summer...)
 */

const DAYS = [
    { en: 'Monday', es: 'lunes' },
    { en: 'Tuesday', es: 'martes' },
    { en: 'Wednesday', es: 'miércoles' },
    { en: 'Thursday', es: 'jueves' },
    { en: 'Friday', es: 'viernes' },
    { en: 'Saturday', es: 'sábado' },
    { en: 'Sunday', es: 'domingo' }
];

const MONTHS = [
    { en: 'January', es: 'enero' },
    { en: 'February', es: 'febrero' },
    { en: 'March', es: 'marzo' },
    { en: 'April', es: 'abril' },
    { en: 'May', es: 'mayo' },
    { en: 'June', es: 'junio' },
    { en: 'July', es: 'julio' },
    { en: 'August', es: 'agosto' },
    { en: 'September', es: 'septiembre' },
    { en: 'October', es: 'octubre' },
    { en: 'November', es: 'noviembre' },
    { en: 'December', es: 'diciembre' }
];

const WEATHER = [
    { en: 'sunny', es: 'soleado' },
    { en: 'rainy', es: 'lluvioso' },
    { en: 'cloudy', es: 'nublado' },
    { en: 'windy', es: 'ventoso' },
    { en: 'snowy', es: 'nevado' },
    { en: 'stormy', es: 'tormentoso' },
    { en: 'hot', es: 'caluroso' },
    { en: 'cold', es: 'frío' }
];

const SEASONS = [
    { en: 'Spring', es: 'primavera' },
    { en: 'Summer', es: 'verano' },
    { en: 'Autumn', es: 'otoño' },
    { en: 'Winter', es: 'invierno' }
];

let ejerciciosUsados = new Set();

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

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ==========================================
// NIVEL FÁCIL: VOCABULARIO BÁSICO
// ==========================================

function generarDaysMonthsTranslation() {
    const isDay = Math.random() > 0.5;
    const item = isDay ? getRandomItem(DAYS) : getRandomItem(MONTHS);

    return {
        tipo: 'vocabulary',
        subtipo: 'date_translation',
        question_type: 'text_input',
        pregunta: `Traduce al inglés: "${item.es}" (Recuerda poner mayúscula)`, // Days/Months are capitalized in English
        correcta: item.en,
        accept_variations: [item.en, item.en.toLowerCase()],
        case_sensitive: false, // Although grammar asks for caps, we accept lowercase logic usually unless strict
        explicacion: `En inglés los días y meses van en mayúscula: ${item.en}.`,
        dificultad: 'facil',
        gramatica: 'vocabulary_date'
    };
}

function generarWeatherImageChoice() {
    // Conceptual: text choice based on description
    const w = getRandomItem(WEATHER);
    const correct = `It's ${w.en}`;

    // Distractors
    const others = shuffleArray(WEATHER.filter(x => x.en !== w.en)).slice(0, 3);
    const options = shuffleArray([correct, ...others.map(x => `It's ${x.en}`)]);

    return {
        tipo: 'vocabulary',
        subtipo: 'weather_choice',
        question_type: 'multiple_choice',
        pregunta: `¿Cómo se dice "${w.es}" en inglés?`,
        opciones: options,
        correcta: correct,
        explicacion: `"${w.es}" se dice "${correct}".`,
        dificultad: 'facil',
        gramatica: 'vocabulary_weather'
    };
}

// ==========================================
// NIVEL MEDIO: ORDINALES Y FECHAS
// ==========================================

function generarOrdinalNumber() {
    const num = Math.floor(Math.random() * 31) + 1; // 1 to 31 (dates)
    const ordinal = getOrdinal(num); // 1st, 2nd...

    // Question: "Escribe el número ordinal para 3" -> "3rd" or "third"
    // Let's stick to short form for now or multiple choice spelling

    const spellingMap = {
        1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 12: 'twelfth', 20: 'twentieth', 21: 'twenty-first', 31: 'thirty-first'
    };

    // If we have spelling, ask for spelling choice, else simple conversion
    if (spellingMap[num] || num <= 10) {
        const correctSpelling = spellingMap[num] || ordinal; // fallback
        // Not fully implemented spoken numerals for all, lets do short form check
    }

    return {
        tipo: 'grammar',
        subtipo: 'ordinal_numbers',
        question_type: 'multiple_choice',
        pregunta: `Elige el número ordinal correcto para: ${num}`,
        opciones: shuffleArray([ordinal, num + 'th', num + 'rd', num + 'st'].filter((v, i, a) => a.indexOf(v) === i && v !== ordinal ? true : false).concat([ordinal]).slice(0, 4)), // Quick dirty distractors
        correcta: ordinal,
        explicacion: `El ordinal de ${num} es ${ordinal}.`,
        dificultad: 'medio',
        gramatica: 'grammar_ordinals'
    };
}

// ==========================================
// NIVEL DIFÍCIL: ESCRIBIR LA FECHA
// ==========================================

function generarFullDate() {
    const day = getRandomItem(DAYS);
    const month = getRandomItem(MONTHS);
    const num = Math.floor(Math.random() * 30) + 1;
    const ordinal = getOrdinal(num);

    // "Lunes, 3 de mayo"
    const spanishDate = `${day.es}, ${num} de ${month.es}`;

    // English: "Monday, 3rd of May" or "Monday, May 3rd"
    // British standard: Day Month (Monday, 3rd May)
    const correct = `${day.en}, ${num} ${month.en}`; // Simplified
    const correctFull = `${day.en}, ${ordinal} of ${month.en}`;
    const correctUS = `${day.en}, ${month.en} ${ordinal}`;

    return {
        tipo: 'grammar',
        subtipo: 'date_writing',
        question_type: 'text_input',
        pregunta: `Escribe la fecha en inglés (Ej: Monday, 3rd of May): "${spanishDate}"`,
        correcta: correctFull,
        accept_variations: [correctFull, correctUS, `${day.en}, ${num} of ${month.en}`],
        explicacion: `Formato habitual: ${correctFull}`,
        dificultad: 'dificil',
        gramatica: 'grammar_date_writing'
    };
}


export function generarCalendarWeather(nivel = 'facil') {
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const tiposPorNivel = {
        facil: [
            { func: generarDaysMonthsTranslation, peso: 50 },
            { func: generarWeatherImageChoice, peso: 50 }
        ],
        medio: [
            { func: generarOrdinalNumber, peso: 100 }
        ],
        dificil: [
            { func: generarFullDate, peso: 100 }
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
    generarCalendarWeather,
    resetearEjerciciosUsados
};
