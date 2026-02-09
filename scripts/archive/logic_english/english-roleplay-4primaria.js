import { generarIdentificadorUnico, seleccionarElementoAleatorio } from './english-utils.js';

// ==========================================
// ROLEPLAY & DAILY SITUATIONS GENERATOR
// ==========================================
// Scenarios: Restaurant, Shop, School, Doctor, Asking Directions

const SITUATIONS = [
    // --- RESTAURANT ---
    {
        id: "rest_1",
        situation: "At a Restaurant",
        speaker_a: "Waiter: May I take your order?",
        speaker_b: "Customer: Yes, please. I ___________ the chicken salad.",
        options: ["would like", "liking", "am like", "wants"],
        answer: "would like",
        level: "medio"
    },
    {
        id: "rest_2",
        situation: "At a Restaurant",
        speaker_a: "Customer: How much is the pizza?",
        speaker_b: "Waiter: It ___________ 10 euros.",
        options: ["is", "are", "have", "cost"],
        answer: "is",
        level: "facil"
    },
    {
        id: "rest_3",
        situation: "At a Restaurant",
        speaker_a: "Waiter: Would you like anything to drink?",
        speaker_b: "Customer: Just water, ___________.",
        options: ["please", "thanks", "yes", "sorry"],
        answer: "please",
        level: "facil"
    },

    // --- SHOPPING ---
    {
        id: "shop_1",
        situation: "Clothing Shop",
        speaker_a: "Shop Assistant: Can I help you?",
        speaker_b: "Customer: Yes, I am ___________ for a red t-shirt.",
        options: ["looking", "look", "watching", "seeing"],
        answer: "looking",
        level: "medio"
    },
    {
        id: "shop_2",
        situation: "Clothing Shop",
        speaker_a: "Customer: Can I try it on?",
        speaker_b: "Shop Assistant: Yes, the changing rooms are over ___________.",
        options: ["there", "their", "they're", "here's"],
        answer: "there",
        level: "medio"
    },
    {
        id: "shop_3",
        situation: "Supermarket",
        speaker_a: "Cashier: That's 20 euros, please.",
        speaker_b: "Customer: Here ___________ are.",
        options: ["you", "your", "they", "we"],
        answer: "you",
        level: "medio"
    },

    // --- ASKING DIRECTIONS ---
    {
        id: "dir_1",
        situation: "In the Street",
        speaker_a: "Tourist: Excuse me, where is the library?",
        speaker_b: "Local: Go straight on and turn ___________.",
        options: ["left", "up", "down", "front"],
        answer: "left",
        level: "medio"
    },
    {
        id: "dir_2",
        situation: "In the Street",
        speaker_a: "Tourist: Is there a bank near here?",
        speaker_b: "Local: Yes, there is one ___________ the cinema.",
        options: ["next to", "next", "near to", "between"],
        answer: "next to",
        level: "dificil"
    },

    // --- SCHOOL ---
    {
        id: "school_1",
        situation: "In the Classroom",
        speaker_a: "Teacher: Be quiet, please. Open your books ___________ page 10.",
        speaker_b: "Student: Sorry, I don't have my book.",
        options: ["at", "in", "on", "to"],
        answer: "at",
        level: "medio" // 'at page X' or 'on page X'? 'open books at page X' is common, 'on page X' is location. 
        // Actually "Open your books TO page 10" or "AT page 10". 
        // Let's change options to be clearer: "on" (location in page), "at" (point). 
        // Usually "Open to page..." or "Open at page...".
        // Let's use a simpler one.
    },
    {
        id: "school_simple",
        situation: "In the Classroom",
        speaker_a: "Teacher: May I borrow your pen?",
        speaker_b: "Student: Yes, ___________ you are.",
        options: ["here", "where", "there", "this"],
        answer: "here",
        level: "facil"
    }
];

// Fix for school_1 to be unambiguous
SITUATIONS.find(s => s.id === "school_1").options = ["at", "in", "under", "between"];
SITUATIONS.find(s => s.id === "school_1").answer = "at"; // Simplification for 4th grade

let ejerciciosUsados = [];

export const resetearEjerciciosUsados = () => {
    ejerciciosUsados = [];
    console.log("🔄 Historial de ROLEPLAY reseteado.");
};

export const generarRoleplay = (nivel = 'medio') => {
    // Normalizar nivel
    const nivelNormalizado = nivel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 1. Filtrar por nivel (aprox)
    // Para simplificar, usaremos todos si no hay suficientes
    let candidatos = SITUATIONS.filter(s => s.level === nivelNormalizado);
    if (candidatos.length < 2) candidatos = SITUATIONS;

    // 2. Select
    let situation = seleccionarElementoAleatorio(candidatos, ejerciciosUsados);
    if (!situation) {
        resetearEjerciciosUsados();
        situation = seleccionarElementoAleatorio(candidatos, []);
    }
    ejerciciosUsados.push(situation);

    // 3. Generar pregunta según nivel
    if (nivelNormalizado === 'dificil') {
        return {
            id: generarIdentificadorUnico(),
            tipo: 'grammar',
            subtipo: 'roleplay',
            question_type: 'text_input',
            pregunta: `Complete the dialogue (${situation.situation}):<br/><br/><strong>${situation.speaker_a}</strong><br/><strong>${situation.speaker_b}</strong>`,
            correcta: situation.answer,
            accept_variations: [situation.answer, situation.answer.toLowerCase(), situation.answer + '.', situation.answer.toLowerCase() + '.'],
            case_sensitive: false,
            explicacion: `In this context, the correct phrase is **"${situation.answer}"**.`,
            dificultad: nivelNormalizado,
            gramatica: 'roleplay',
            feedback_card: {
                title: "Conversation Tip",
                content: `Pay attention to polite expressions like **"Would you like..."** and answers like **"Here you are"**.`
            }
        };
    }

    // Nivel Fácil/Medio: Multiple Choice
    const options = situation.options.map(opt => ({
        text: opt,
        correct: opt === situation.answer
    })).sort(() => Math.random() - 0.5);

    return {
        id: generarIdentificadorUnico(),
        tipo: 'grammar',
        subtipo: 'roleplay',
        question_type: 'multiple_choice',
        pregunta: `Complete the dialogue (${situation.situation}):<br/><br/><strong>${situation.speaker_a}</strong><br/><strong>${situation.speaker_b}</strong>`,
        opciones: options.map(o => o.text),
        correcta: situation.answer,
        explicacion: `In this context, the correct phrase is **"${situation.answer}"**.`,
        dificultad: nivelNormalizado,
        gramatica: 'roleplay',
        feedback_card: {
            title: "Conversation Tip",
            content: `Pay attention to polite expressions like **"Would you like..."** and answers like **"Here you are"**.`
        }
    };
};
