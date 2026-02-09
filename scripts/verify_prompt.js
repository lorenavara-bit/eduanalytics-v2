
// Mock logic from src/utils/gemini.js to verify prompt generation

function buildLOMLOEPrompt({
    profile,
    subject,
    topic,
    activityType,
    config,
    saberes = [],
    criterios = [],
    competencias = [],
    observations = "",
    fileContext = "",
    excludedContent = []
}) {
    const diff = config?.difficulty || 'Medio';
    const numQ = config?.numQuestions || 5;
    const qTypes = config?.questionTypes?.join(', ') || 'Variado';

    let structureHint = "";
    // (Simplified structure hint logic for test)
    structureHint = "ESTRUCTURA MOCK";

    const textbook = subject?.textbook_info || "Material estándar";
    const styleHint = "Visual Style Hint Mock";

    // NEURODIVERSITY MOCK
    const neurodiversityContext = "Neuro Context Mock";

    // INTEREST CONTEXT (The Logic we want to test)
    const interestContext = config?.interest
        ? `🌟 AMBIENTACIÓN (Flavor Text): El estudiante ama "${config.interest}".
           INSTRUCCIONES DE USO DE INTERÉS (SEGURIDAD CURRICULAR):
           1. SKINNING ONLY: Usa el interés SOLO para nombres de personajes, objetos o escenarios. (Ej: "Steve tiene 5 manzanas", no "Steve craftea manzanas").
           2. CURRICULUM FIRST: El problema debe ser resoluble AL 100% sin saber nada de "${config.interest}".
           3. FORBIDDEN ZONE: NO alteres hechos científicos, históricos o definiciones para encajar el interés. (Ej: NO digas "Los romanos usaban sables de luz").
           4. SUTILEZA: Es un "condimento", no el plato principal.`
        : "";

    // MODE INSTRUCTIONS (The Logic we want to test)
    const modeInstructions = {
        'aprender': `
        MODE: 🧠 APRENDER (Study Mode)
        OBJETIVO: Crear un MATERIAL DE ESTUDIO, no un examen.
        ESTRUCTURA:
        1. Resumen Teórico claro y visual.
        2. Mapa Mental descrito textualmente (nodos principales).
        3. Reglas Mnemotécnicas para memorizar.
        4. Ejemplos resueltos paso a paso.
        FORMATO JSON: Usa "content_blocks" en lugar de "questions".`,

        'practicar': `
        MODE: ✏️ PRACTICAR (Worksheet Mode)
        OBJETIVO: Ejercicios para asentar conocimientos.`,

        'examen': `
        MODE: ⏱️ EXAMEN (Test Mode)
        OBJETIVO: Evaluar conocimiento real.`,

        'proyecto': `
        MODE: 🚀 PROYECTO (Real World Mission)
        OBJETIVO: Aprendizaje Basado en Proyectos (ABP).`
    };

    const selectedModeInstruction = modeInstructions[activityType] || modeInstructions['practicar'];
    const languageInstruction = "";
    const autonomyInfo = "";
    const competenciasInfo = "";
    const curriculumContext = "";
    const criteriosContext = "";
    const observationsContext = "";
    const challengeLevel = "Standard";
    const challengeHint = "";


    return `
${languageInstruction}
ROL: PROFESOR EXPERTO EN CURRÍCULO LOMLOE & ESPECIALISTA EN NEUROEDUCACIÓN.

⚠️ MODO ACTIVADO: ${activityType.toUpperCase()}
${selectedModeInstruction}

Asignatura: ${subject.name}
Curso: ${profile.grade_level || 'No especificado'}
Libro de Texto: ${textbook}
${autonomyInfo}

${competenciasInfo}
${curriculumContext}
${criteriosContext}
${observationsContext}

TEMA: "${topic}"

PERFIL DEL ESTUDIANTE (Personalización):
- Nivel: ${profile.grade_level || 'General'}
- Estilo: ${profile.learning_style || 'General'} → ${styleHint}
${neurodiversityContext}
- Intereses: ${profile.interests || 'No especificados'}

CONFIGURACIÓN:
- Cantidad: ${numQ} items/preguntas.
- Dificultad: ${diff}
${structureHint}

INSTRUCCIONES CRÍTICAS:
1. ADAPTA EL CONTENIDO AL MODO SELECCIONADO (${activityType}).
2. PERSONALIZA según el perfil del alumno (VARK/Intereses).
   ${interestContext}
3. RIGOR CURRICULAR (LOMLOE).

FORMATO JSON ESPERADO (Sintaxis Estricta):
(JSON Format Mock)

¡GENERA EL RECURSO AHORA!
`;
}

// TEST CASES
console.log("---------------------------------------------------");
console.log("🐛 TEST 1: STUDY MODE + MINECRAFT (Safety Check)");
console.log("---------------------------------------------------");

const prompt1 = buildLOMLOEPrompt({
    profile: { grade_level: '4º Primaria', learning_style: 'Visual' },
    subject: { name: 'Matemáticas' },
    topic: 'Fracciones',
    activityType: 'aprender',
    config: { interest: 'Minecraft' }
});

console.log(prompt1);

console.log("\n---------------------------------------------------");
console.log("🐛 TEST 2: EXAM MODE + NO INTEREST");
console.log("---------------------------------------------------");

const prompt2 = buildLOMLOEPrompt({
    profile: { grade_level: '2º Bachillerato' },
    subject: { name: 'Historia' },
    topic: 'Guerra Civil',
    activityType: 'examen',
    config: { interest: '' }
});

console.log(prompt2);
