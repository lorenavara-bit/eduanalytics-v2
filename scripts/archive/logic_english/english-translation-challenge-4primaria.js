import { generarIdentificadorUnico, seleccionarElementoAleatorio } from './english-utils.js';
import { generarPresentSimple } from './english-present-simple-4primaria.js';

// ==========================================
// BANCO DE FRASES PARA TRADUCCIÓN (Español -> Inglés)
// ==========================================
// Estructura: { id, es: "Español", en: "English", level: "facil"|"medio"|"dificil", grammar: "tipo" }

const FRASES_TRANSLATION = [
    // --- NIVEL FÁCIL (Present Simple, Verb To Be, Can) ---
    { es: "Yo soy un estudiante.", en: "I am a student.", level: "facil", grammar: "verb_to_be" },
    { es: "Ella es mi hermana.", en: "She is my sister.", level: "facil", grammar: "verb_to_be" },
    { es: "Ellos están felices.", en: "They are happy.", level: "facil", grammar: "verb_to_be" },
    { es: "Me gustan las manzanas.", en: "I like apples.", level: "facil", grammar: "present_simple" },
    { es: "Él juega al fútbol.", en: "He plays football.", level: "facil", grammar: "present_simple" },
    { es: "Nosotros vivimos en una casa grande.", en: "We live in a big house.", level: "facil", grammar: "present_simple" },
    { es: "Yo puedo nadar.", en: "I can swim.", level: "facil", grammar: "modal_can" },
    { es: "Ella puede cantar muy bien.", en: "She can sing very well.", level: "facil", grammar: "modal_can" },
    { es: "Tengo un perro.", en: "I have got a dog.", level: "facil", grammar: "have_got" },
    { es: "Ella tiene un gato.", en: "She has got a cat.", level: "facil", grammar: "have_got" },
    { es: "¿Tienes un perro?", en: "Have you got a dog?", level: "facil", grammar: "have_got_quest" },
    { es: "¿Eres feliz?", en: "Are you happy?", level: "facil", grammar: "verb_to_be_quest" },
    { es: "¿Puedes nadar?", en: "Can you swim?", level: "facil", grammar: "modal_can_quest" },

    // --- NIVEL MEDIO (Present Continuous, Prepositions, Adverbs, Negatives) ---
    { es: "Estoy leyendo un libro ahora.", en: "I am reading a book now.", level: "medio", grammar: "present_continuous" },
    { es: "Ella no está durmiendo.", en: "She isn't sleeping.", level: "medio", grammar: "present_continuous" },
    { es: "¿Estás jugando?", en: "Are you playing?", level: "medio", grammar: "present_continuous" },
    { es: "El gato está debajo de la mesa.", en: "The cat is under the table.", level: "medio", grammar: "prepositions" },
    { es: "Siempre desayuno a las ocho.", en: "I always have breakfast at eight o'clock.", level: "medio", grammar: "routines" },
    { es: "Ella no le gusta el queso.", en: "She doesn't like cheese.", level: "medio", grammar: "present_simple_neg" },
    { es: "Nosotros no vamos al colegio los domingos.", en: "We don't go to school on Sundays.", level: "medio", grammar: "present_simple_neg" },
    { es: "Hay tres manzanas en la mesa.", en: "There are three apples on the table.", level: "medio", grammar: "there_is_are" },
    { es: "No hay leche en la nevera.", en: "There isn't any milk in the fridge.", level: "medio", grammar: "there_is_are" },
    { es: "¿Qué hora es?", en: "What time is it?", level: "medio", grammar: "time_quest" },
    { es: "¿A dónde vas?", en: "Where are you going?", level: "medio", grammar: "present_continuous_quest" },
    { es: "¿Hay algún libro aquí?", en: "Is there any book here?", level: "medio", grammar: "there_is_are_quest" },

    // --- NIVEL DIFÍCIL (Past Simple, Questions, Comparatives, Complex) ---
    { es: "Ayer fui al parque.", en: "I went to the park yesterday.", level: "dificil", grammar: "past_simple" },
    { es: "Ella estaba cansada anoche.", en: "She was tired last night.", level: "dificil", grammar: "past_simple_tobe" },
    { es: "¿Viste la película?", en: "Did you see the film?", level: "dificil", grammar: "past_simple_quest" },
    { es: "Mi hermano es más alto que yo.", en: "My brother is taller than me.", level: "dificil", grammar: "comparatives" },
    { es: "Este es el libro más interesante.", en: "This is the most interesting book.", level: "dificil", grammar: "superlatives" },
    { es: "¿Dónde estabas ayer?", en: "Where were you yesterday?", level: "dificil", grammar: "past_simple_quest" },
    { es: "No comí pizza ayer.", en: "I didn't eat pizza yesterday.", level: "dificil", grammar: "past_simple_neg" },
    { es: "¿Qué estás haciendo?", en: "What are you doing?", level: "dificil", grammar: "present_continuous_quest" },
    { es: "Tengo que hacer mis deberes.", en: "I must do my homework.", level: "dificil", grammar: "modal_must" },
    { es: "A veces voy al cine con mis amigos.", en: "I sometimes go to the cinema with my friends.", level: "dificil", grammar: "adverbs_frequency" }
];

// Estado local para evitar repeticiones inmediatas
let frasesUsadas = [];

export const resetearEjerciciosUsados = () => {
    frasesUsadas = [];
    console.log("🔄 Historial de traducciones reseteado.");
};

// Generador de distractores inteligentes (Common Mistakes)
const generarDistractores = (fraseCorrecta, grammarType) => {
    const distractores = [];

    // Función auxiliar para confundir personas (I/You/He/She)
    // Función auxiliar para confundir verbos (am/is/are, do/does)
    // Función auxiliar para confundir orden (SVO vs VSO)

    // Vamos a crear variaciones manuales basadas en errores comunes para cada tipo
    // O generar variaciones algorítmicas simples

    const words = fraseCorrecta.split(' ');

    // 1. Distractor de Tiempos/Verbos (muy común)
    if (grammarType.includes('present_continuous')) {
        // Error: Usar presente simple o olvidar el verbo to be
        distractores.push(fraseCorrecta.replace(/ing/g, '')); // "I am read a book"
        distractores.push(fraseCorrecta.replace(/am |is |are /g, '')); // "I reading a book"
    } else if (grammarType.includes('present_simple')) {
        // Error: Olvidar 's' en 3a persona o usar 'ing' sin to be
        if (fraseCorrecta.includes('s ') || fraseCorrecta.endsWith('s')) {
            distractores.push(fraseCorrecta.replace(/s\b/g, '')); // "He play football"
        }
        distractores.push(fraseCorrecta.replace(/ /g, ' ing ')); // Muy burdo, mejor algo específico
    } else if (grammarType.includes('past_simple')) {
        // Error: Usar presente
        // Esto es difícil de automatizar genéricamente sin un mapa de verbos.
    }

    // 2. Distractor de Orden de Palabras (Word Order)
    // Intercambiar sujeto y verbo o adjetivo y sustantivo
    if (words.length > 3) {
        const d2 = [...words];
        [d2[1], d2[2]] = [d2[2], d2[1]]; // Swap 2nd and 3rd words
        distractores.push(d2.join(' '));
    }

    // 3. Fallback: Distractores genéricos si no se generaron suficientes
    // (En una implementación real, lo ideal es tener distractores definidos manualmente o una lógica más robusta)

    // Para simplificar y asegurar calidad, generaremos variaciones simples:
    // a) Cambiar el pronombre (She -> He)
    // b) Cambiar el verbo auxiliar (is -> are)
    // c) Cambiar orden

    const variaciones = [
        fraseCorrecta.replace(/\bis\b/g, 'are').replace(/\bam\b/g, 'is'), // Wrong To Be
        fraseCorrecta.replace(/don't/g, "doesn't").replace(/doesn't/g, "don't"), // Wrong Aux
        fraseCorrecta.replace(/play/g, "playing").replace(/read/g, "reading"), // Wrong form
        fraseCorrecta.replace(/my/g, "your").replace(/his/g, "her"), // Wrong possessive
    ];

    // Filtrar variaciones que sean iguales a la correcta o no tengan sentido (simple check)
    const validVars = variaciones.filter(v => v !== fraseCorrecta && v.length > 5);

    // Seleccionar hasta 3 únicos
    for (let v of validVars) {
        if (!distractores.includes(v)) distractores.push(v);
    }

    // Rellenar si faltan
    while (distractores.length < 3) {
        // Shuffle words radically
        const shuffled = [...words].sort(() => Math.random() - 0.5).join(' ');
        if (shuffled !== fraseCorrecta && !distractores.includes(shuffled)) {
            distractores.push(shuffled);
        } else {
            distractores.push("Error loading option."); // Fallback ultimo recurso
            break;
        }
    }

    return distractores.slice(0, 3);
};


export const generarTranslationChallenge = (nivel = 'medio') => {
    // Normalizar nivel (quitar acentos): difícil → dificil
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 1. Filtrar frases por nivel
    let frasesCandidatas = FRASES_TRANSLATION.filter(f => f.level === nivelNormalizado);

    // MIX: En nivel difícil, mezclamos frases estáticas con generación dinámica (30% probabilidad)
    if (nivelNormalizado === 'dificil' && Math.random() > 0.7) {
        // Usar el generador de Present Simple (que ya tiene la conjugación arreglada)
        const dynamicEx = generarPresentSimple('dificil');
        if (dynamicEx && dynamicEx.subtipo === 'present_simple_traducir') {
            return {
                id: generarIdentificadorUnico(),
                ...dynamicEx, // Heredar propiedades (pregunta, correcta, explicación)
                gramatica: 'translation', // Sobrescribir para este contexto
                feedback_card: {
                    title: "Dynamic Translation",
                    content: "Remember to conjugate the verb in Spanish correctly!"
                }
            };
        }
    }

    // Fallback si no hay suficientes de ese nivel
    if (frasesCandidatas.length === 0) {
        frasesCandidatas = FRASES_TRANSLATION;
    }

    // 2. Seleccionar frase no usada recientemente
    let fraseObj = seleccionarElementoAleatorio(frasesCandidatas, frasesUsadas);
    if (!fraseObj) {
        resetearEjerciciosUsados();
        fraseObj = seleccionarElementoAleatorio(frasesCandidatas, []);
    }
    frasesUsadas.push(fraseObj);

    // 3. Generar Opciones según el nivel
    if (nivelNormalizado === 'dificil') {
        return {
            id: generarIdentificadorUnico(),
            tipo: 'grammar',
            subtipo: 'translation',
            question_type: 'text_input',
            pregunta: `Translate into English: "${fraseObj.es}"`,
            correcta: fraseObj.en,
            accept_variations: [fraseObj.en, fraseObj.en.toLowerCase(), fraseObj.en.replace(/\.$/, '')],
            case_sensitive: false,
            explicacion: `Correct translation: **"${fraseObj.en}"**.\n\nKey grammar point: ${fraseObj.grammar.replace(/_/g, ' ')}.`,
            dificultad: nivelNormalizado,
            gramatica: 'translation',
            feedback_card: {
                title: "Translation Tip",
                content: "Pay attention to the **subject** (who?), the **verb** (action/tense), and the **word order** (Subject + Verb + Object)."
            }
        };
    }

    // Nivel Fácil/Medio: Multiple Choice
    const distractores = generarDistractores(fraseObj.en, fraseObj.grammar);

    const options = [
        { text: fraseObj.en, correct: true },
        { text: distractores[0], correct: false },
        { text: distractores[1], correct: false },
        { text: distractores[2], correct: false }
    ];

    // Barajar opciones
    options.sort(() => Math.random() - 0.5);

    return {
        id: generarIdentificadorUnico(),
        tipo: 'grammar',
        subtipo: 'translation',
        question_type: 'multiple_choice',
        pregunta: `Translate into English: "${fraseObj.es}"`,
        opciones: options.map(o => o.text),
        correcta: fraseObj.en,
        explicacion: `Correct translation: **"${fraseObj.en}"**.\n\nKey grammar point: ${fraseObj.grammar.replace(/_/g, ' ')}.`,
        dificultad: nivel,
        gramatica: 'translation',
        feedback_card: {
            title: "Translation Tip",
            content: "Pay attention to the **subject** (who?), the **verb** (action/tense), and the **word order** (Subject + Verb + Object)."
        }
    };
};
