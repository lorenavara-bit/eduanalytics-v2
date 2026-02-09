// MOTOR DE IA LOMLOE-AWARE - Multi-Provider (Gemini + OpenRouter + SambaNova)
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractTextFromUrl, pdfToImagePayload } from './fileHelpers';
import { supabase } from '../supabaseClient';
import { normalizeSubject, normalizeGrade } from './curriculumNormalizer';
import { getEnv } from './appEnv';

const getGeminiKey = () => localStorage.getItem('GEMINI_API_KEY') || getEnv('VITE_GEMINI_API_KEY');
const getSambaNovaKey = () => localStorage.getItem('SAMBANOVA_API_KEY') || getEnv('VITE_SAMBANOVA_API_KEY') || "54017650-0863-4436-a868-93409238101e";
const getOpenRouterKey = () => localStorage.getItem('OPENROUTER_API_KEY') || getEnv('VITE_OPENROUTER_API_KEY');

// Helper to get Gemini Client dynamically
const getGeminiClient = () => {
    const key = getGeminiKey();
    if (!key) return null;
    console.log(`🔑 Usando Gemini Key: ${key.substring(0, 6)}...`);
    return new GoogleGenerativeAI(key, { apiVersion: 'v1' });
};

// Helper for OpenAI-compatible clients
const getOpenAIClient = (provider) => {
    const key = provider === 'SAMBANOVA' ? getSambaNovaKey() : getOpenRouterKey();
    if (!key) return null;

    if (provider === 'SAMBANOVA') {
        // Direct connection to avoid local proxy issues
        console.log("🔌 Initializing SambaNova Client with Key:", key ? "PRESENT" : "MISSING");
        return new OpenAI({
            apiKey: key,
            baseURL: 'https://api.sambanova.ai/v1',
            dangerouslyAllowBrowser: true
        });
    } else {
        return new OpenAI({
            apiKey: key,
            baseURL: 'https://openrouter.ai/api/v1',
            dangerouslyAllowBrowser: true,
            defaultHeaders: {
                'HTTP-Referer': window.location.origin,
                'X-Title': 'EduAnalytics V2'
            }
        });
    }
};

// ========== HELPERS: CARGA DE DATOS LOMLOE ==========

async function loadSaberesBasicos(asignatura, curso) {
    try {
        // Normalizar nombres para match exacto con base de datos
        const normalizedAsignatura = normalizeSubject(asignatura);
        const normalizedCurso = normalizeGrade(curso);

        console.log(`🔍 Buscando saberes: ${normalizedAsignatura} - ${normalizedCurso}`);

        const { data, error } = await supabase
            .from('saberes_basicos')
            .select('*')
            .eq('asignatura', normalizedAsignatura)
            .eq('curso', normalizedCurso);

        if (error) throw error;

        console.log(`✅ Saberes encontrados: ${data?.length || 0}`);
        return data || [];
    } catch (e) {
        console.warn("No se pudieron cargar saberes básicos:", e);
        return [];
    }
}

async function loadCriteriosEvaluacion(asignatura, curso) {
    try {
        // Normalizar nombres para match exacto con base de datos
        const normalizedAsignatura = normalizeSubject(asignatura);
        const normalizedCurso = normalizeGrade(curso);

        console.log(`🔍 Buscando criterios: ${normalizedAsignatura} - ${normalizedCurso}`);

        const { data, error } = await supabase
            .from('criterios_evaluacion')
            .select('*')
            .eq('asignatura', normalizedAsignatura)
            .eq('curso', normalizedCurso);

        if (error) throw error;

        console.log(`✅ Criterios encontrados: ${data?.length || 0}`);
        return data || [];
    } catch (e) {
        console.warn("No se pudieron cargar criterios:", e);
        return [];
    }
}

async function loadCompetencias() {
    try {
        const { data, error } = await supabase
            .from('competencias_clave')
            .select('*');

        if (error) throw error;
        return data || [];
    } catch (e) {
        console.warn("No se pudieron cargar competencias:", e);
        return [];
    }
}

// ========== GENERACIÓN DE PROMPTS LOMLOE ==========

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
    // REDUCED DEFAULT: 5 questions to save output tokens and avoid timeouts.
    const numQ = config?.numQuestions || 5;
    console.log(`🔢 PROMPT REQUEST: ${numQ} questions (From Config: ${config?.numQuestions})`);
    const qTypes = config?.questionTypes?.join(', ') || 'Variado';

    let structureHint = "";
    if (qTypes.includes('Variado') || !config?.questionTypes || config.questionTypes.length === 0) {
        if (numQ >= 16) {
            structureHint = `⚠️ ESTRUCTURA DE ALTA DIVERSIDAD (${numQ} Preguntas):
             - 15% Conceptuales (Definiciones rápidas)
             - 15% Verdadero/Falso (Justificado)
             - 30% Prácticas (Problemas, aplicaciones)
             - 20% Visuales/Creativas (Diagramas, dibujos, mapas)
             - 20% Análisis Complejo (Casos de estudio, síntesis)
             IMPORTANTE: Cambia de tipo cada 3 preguntas.`;
        } else if (numQ >= 11) {
            structureHint = `⚠️ ESTRUCTURA DIVERSA (${numQ} Preguntas):
             - 20% Conceptuales
             - 20% Verdadero/Falso
             - 30% Prácticas
             - 30% Visuales/Creativas (Relacionar, completar esquemas)`;
        } else if (numQ >= 5) {
            structureHint = `⚠️ ESTRUCTURA BÁSICA (${numQ} Preguntas):
             - 30% Conceptuales
             - 30% Verdadero/Falso
             - 40% Prácticas`;
        }
    }

    const textbook = subject?.textbook_info || "Material estándar";

    const learningStyleTips = {
        'visual': 'Usa diagramas, esquemas, colores. Incluye referencias visuales.',
        'auditivo': 'Usa explicaciones narrativas. Sugiere leer en voz alta.',
        'kinestesico': 'Propón ejercicios prácticos, manipulativos.',
        'lectura': 'Usa textos bien estructurados. Incluye resúmenes.'
    };

    const styleHint = profile.learning_profile
        ? `ESTILO AVANCEDO: Domina el canal ${profile.learning_profile.vark_dominant}. 
           Dimensiones Felder-Silverman: 
           - ${profile.learning_profile.fs_active_reflective > 0 ? 'Activo (aprende haciendo)' : 'Reflectivo (aprende pensando)'}
           - ${profile.learning_profile.fs_sensing_intuitive > 0 ? 'Sensorial (datos concretos)' : 'Intuitivo (teorías/conceptos)'}
           - ${profile.learning_profile.fs_visual_verbal > 0 ? 'Visual (imágenes/esquemas)' : 'Verbal (texto/palabras)'}
           - ${profile.learning_profile.fs_sequential_global > 0 ? 'Secuencial (paso a paso)' : 'Global (visión de conjunto)'}
           RECOMENDACIÓN IA: ${profile.learning_profile.ai_summary}`
        : (learningStyleTips[profile.learning_style] || 'Adapta al nivel del estudiante.');

    const neurodiversityContext = (() => {
        // 1. Gather all tests (History > Legacy)
        const history = profile.all_screenings || (profile.nee_data ? [profile.nee_data] : []) || [];
        if (history.length === 0) return "";

        // 2. Identify Latest Test per Type
        const latestByType = {};
        history.forEach(t => {
            if (!t || !t.type) return;
            const ts = new Date(t.created_at || t.timestamp || 0).getTime();
            if (!latestByType[t.type] || ts > latestByType[t.type].ts) {
                latestByType[t.type] = { data: t, ts };
            }
        });

        let context = "";

        // 3. CHAEA
        if (latestByType['CHAEA']) {
            const t = latestByType['CHAEA'].data;
            if (t.data?.scores) {
                const scores = t.data.scores;
                const maxScore = Math.max(...Object.values(scores));
                const dominants = Object.keys(scores).filter(k => scores[k] === maxScore);
                context += `\n🧠 PERFIL CHAEA: ${dominants.join(' y ').toUpperCase()}\n`;
                if (dominants.includes('Activo')) context += `- ACTIVO: Retos inmediatos, variedad, novedades.\n`;
                if (dominants.includes('Reflexivo')) context += `- REFLEXIVO: Tiempo para pensar, análisis previo.\n`;
                if (dominants.includes('Teórico')) context += `- TEÓRICO: Estructura lógica, precisión, por qué.\n`;
                if (dominants.includes('Pragmático')) context += `- PRAGMÁTICO: Aplicación real y práctica.\n`;
            }
        }

        // 4. VARK
        if (latestByType['VARK']) {
            const t = latestByType['VARK'].data;
            if (t.data?.scores) {
                const scores = t.data.scores;
                const maxScore = Math.max(...Object.values(scores));
                const dominants = Object.keys(scores).filter(k => scores[k] === maxScore);
                const map = { V: 'Visual', A: 'Auditivo', R: 'Lectura', K: 'Kinestésico' };
                context += `\n🧠 PERFIL VARK: ${dominants.map(d => map[d]).join('+')}\n`;
                if (dominants.includes('V')) context += `- VISUAL: Diagramas, colores, mapas mentales.\n`;
                if (dominants.includes('A')) context += `- AUDITIVO: Explicaciones verbales, lectura en voz alta.\n`;
                if (dominants.includes('R')) context += `- LECTURA: Textos estructurados, listas.\n`;
                if (dominants.includes('K')) context += `- KINESTÉSICO: Aprender haciendo, movimiento, simulaciones.\n`;
            }
        }

        // 5. Multiple Intelligences
        if (latestByType['MULTIPLE_INTELLIGENCES']) {
            const t = latestByType['MULTIPLE_INTELLIGENCES'].data;
            if (t.data?.scores) {
                const highSkills = Object.entries(t.data.scores)
                    .filter(([_, d]) => d.level === 'Alto' || d.level === 'Medio-Alto')
                    .map(([cat]) => cat);
                if (highSkills.length > 0) {
                    context += `\n🧠 INTELIGENCIAS MÚLTIPLES: ${highSkills.join(', ')}\n`;
                    if (highSkills.includes('Lingüística')) context += `- LINGÜÍSTICA: Storytelling, juegos de palabras.\n`;
                    if (highSkills.includes('Lógico-Matemática')) context += `- LÓGICA: Patrones, secuencias, deducción.\n`;
                    if (highSkills.includes('Espacial')) context += `- ESPACIAL: Metáforas visuales, diseño.\n`;
                    if (highSkills.includes('Corporal-Kinestésica')) context += `- CORPORAL: Movimiento, manipulación.\n`;
                    if (highSkills.includes('Musical')) context += `- MUSICAL: Ritmos, rimas.\n`;
                    if (highSkills.includes('Naturalista')) context += `- NATURALISTA: Clasificación, entorno.\n`;
                    if (highSkills.includes('Interpersonal') ? '- INTERPERSONAL: Trabajo grupal, empatía.\n' : '');
                    if (highSkills.includes('Intrapersonal') ? '- INTRAPERSONAL: Reflexión, metas propias.\n' : '');
                }
            }
        }

        // 6. Neuro Screening (Combined Logic)
        const allRecs = history.flatMap(h => h.recommendations || []);
        const riskLevel = history.find(h => h.risk_level === 'HIGH')?.risk_level || 'LOW';

        if (allRecs.length > 0) {
            context += `\n🧠 NEURODIVERSIDAD (Cribado):\n`;
            const uniqueCats = [...new Set(allRecs.map(r => r.category))];

            if (riskLevel === 'HIGH') context += `⚠️ RIESGO ALTO: Necesidad de adaptación significativa.\n`;

            uniqueCats.forEach(cat => {
                if (cat === 'DISLEXIA') context += `- DISLEXIA: Enunciados cortos, apoyo visual, evitar densidad.\n`;
                if (cat === 'TDAH') context += `- TDAH: Cambios frecuentes, recordatorios de foco, tareas cortas.\n`;
                if (cat === 'AACC') context += `- ALTAS CAPACIDADES: Retos de pensamiento lateral, profundidad, conexiones complejas.\n`;
                if (cat === 'TEA') context += `- TEA: Estructura predecible, lenguaje literal, evitar ambigüedades.\n`;
            });
        }

        return context;
    })();

    const interestContext = config?.interest
        ? `🌟 AMBIENTACIÓN (Flavor Text): El estudiante ama "${config.interest}".
           INSTRUCCIONES DE USO DE INTERÉS (SEGURIDAD CURRICULAR):
           1. SKINNING ONLY: Usa el interés SOLO para nombres de personajes, objetos o escenarios. (Ej: "Steve tiene 5 manzanas", no "Steve craftea manzanas").
           2. CURRICULUM FIRST: El problema debe ser resoluble AL 100% sin saber nada de "${config.interest}".
           3. FORBIDDEN ZONE: NO alteres hechos científicos, históricos o definiciones para encajar el interés. (Ej: NO digas "Los romanos usaban sables de luz").
           4. SUTILEZA: Es un "condimento", no el plato principal.`
        : "";

    const situacionAprendizajeHint = activityType.includes('Situación de Aprendizaje')
        ? `🚀 MODO SITUACIÓN DE APRENDIZAJE (LOMLOE):
           - No hagas ejercicios aislados. Crea un RETO o MISIÓN inicial.
           - Ejemplo: "Eres el jefe de expedición en el Amazonas y debes..."
           - Conecta el tema (${topic}) con un problema real o narrativo.
           - Las secciones de la ficha deben ser fases de la misión.`
        : "";

    const curriculumContext = saberes.length > 0
        ? `\n📚 SABERES BÁSICOS OFICIALES (LOMLOE):\n${saberes.map((s, i) => `${i + 1}. ${s.saber} [Bloque: ${s.bloque || 'General'}]`).join('\n')}\n`
        : "⚠️ No hay datos curriculares oficiales para esta asignatura/curso. Usa el currículo LOMLOE estándar.";

    const criteriosContext = criterios.length > 0
        ? `\n🎯 CRITERIOS DE EVALUACIÓN:\n${criterios.map(c => `- ${c.id}: ${c.descripcion} [${c.competencias?.join(', ')}]`).join('\n')}\n`
        : "";

    const competenciasInfo = competencias.length > 0
        ? `\n💎 COMPETENCIAS CLAVE LOMLOE:\n${competencias.map(c => `- ${c.id}: ${c.nombre}`).join('\n')}\n`
        : "";

    const observationsContext = observations?.trim()
        ? `\n✏️ INSTRUCCIONES ESPECÍFICAS DEL PROFESOR/PADRE:\n"${observations}"\n\n⚠️ CRÍTICO: ESTAS OBSERVACIONES SON PRIORITARIAS.\nGenera SOLO contenido relacionado con lo especificado aquí.\nNO incluyas temas que no se mencionan.\n`
        : "";

    const autonomyInfo = profile.autonomous_community
        ? `\n🇪🇸 COMUNIDAD AUTÓNOMA: ${profile.autonomous_community}\n⚠️ IMPORTANTE: Adapta el contenido al currículo autonómico de ${profile.autonomous_community}.\nCualquier especificidad regional debe respetarse.\n`
        : "\n🇪🇸 Usando currículo nacional LOMLOE (mínimos comunes).\n";

    const rawChallenge = config?.challenge_level || profile.challenge_level || 'standard';
    const challengeLevel = rawChallenge.toLowerCase();

    const challengeHint = {
        'refuerzo': '⚠️ NIVEL REFUERZO: Simplifica conceptos. Usa lenguaje muy claro. Divide problemas complejos en pasos pequeños. Prioriza saberes básicos mínimos.',
        'standard': 'NIVEL ESTÁNDAR: Sigue el currículo oficial del curso sin desviaciones.',
        'adaptado': 'NIVEL ESTÁNDAR: Sigue el currículo oficial del curso sin desviaciones.',
        'ampliacion': '🚀 NIVEL AMPLIACIÓN/RETO: Desafía al estudiante. Usa "Criterios de Evaluación por Desempeño" avanzados. Propón problemas de lógica, deducción y pensamiento crítico. Conecta con otros temas.',
        'reto': '🚀 NIVEL AMPLIACIÓN/RETO: Desafía al estudiante. Usa "Criterios de Evaluación por Desempeño" avanzados. Propón problemas de lógica, deducción y pensamiento crítico.'
    }[challengeLevel] || 'NIVEL ESTÁNDAR: Sigue el currículo oficial.';

    // Detección de idioma para clases de lengua extranjera
    const isEnglishClass = subject.name.toLowerCase().includes('inglés') ||
        subject.name.toLowerCase().includes('ingles') ||
        subject.name.toLowerCase().includes('english');

    const languageInstruction = isEnglishClass
        ? `\n🚨🚨🚨 CRITICAL INSTRUCTION - ENGLISH CLASS 🚨🚨🚨\n
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIS IS AN ENGLISH LANGUAGE CLASS
ALL CONTENT MUST BE GENERATED IN ENGLISH
NO EXCEPTIONS - THIS IS MANDATORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUIREMENTS:
✓ Questions: Write IN ENGLISH
✓ Answers: Write IN ENGLISH  
✓ Feedback: Write IN ENGLISH
✓ Hints: Write IN ENGLISH
✓ Instructions: Write IN ENGLISH

WRONG ❌: "¿Cuál es la forma correcta de 'to be'?"
RIGHT  ✅: "What is the correct form of 'to be'?"

WRONG ❌: "Completa: Yo ___ estudiante"
RIGHT  ✅: "Complete: I ___ a student"

Level: ${profile.grade_level || 'General'}
Use vocabulary appropriate for this level in ENGLISH.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
        : '';

    // --- MODOS ESPECÍFICOS DE ACTIVIDAD (NUEVA ARQUITECTURA) ---
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
        OBJETIVO: Ejercicios para asentar conocimientos.
        ESTILO: Amigable, con pistas ("hint") útiles.
        FEEDBACK: Explicativo y educativo.`,

        'examen': `
        MODE: ⏱️ EXAMEN (Test Mode)
        OBJETIVO: Evaluar conocimiento real.
        ESTILO: Formal, académico, estricto.
        RESTRICCIONES:
        - NO incluyas "hints".
        - Mezcla dificultades (20% Fácil, 50% Media, 30% Difícil).
        - El feedback debe ser solo la corrección técnica.`,

        'proyecto': `
        MODE: 🚀 PROYECTO (Real World Mission)
        OBJETIVO: Aprendizaje Basado en Proyectos (ABP).
        NARRATIVA: Sitúa al alumno en un rol profesional (Ingeniero, Detectiva, Explorador).
        ESTRUCTURA:
        - FASE 1: Planning (Preguntas de organización)
        - FASE 2: Ejecución (Cálculos/Trabajo)
        - FASE 3: Conclusión (Análisis de resultados)
        FORMATO: Las secciones deben ser las FASES del proyecto.`
    };

    const selectedModeInstruction = modeInstructions[activityType] || modeInstructions['practicar'];

    // ... (rest of the prompt construction)

    const baseJsonFormat = `
{
  "title": "Título del Recurso",
  "intro": "Contexto o Narrativa",
  "theory_recap": "Resumen teórico (Muy detallado si es modo APRENDER)",
  "sections": [
    {
      "title": "Nombre de la Sección (o Fase)",
      // EN MODO 'APRENDER':
      "content_blocks": [
         { "type": "text", "content": "Explicación..." },
         { "type": "list", "items": ["Item 1", "Item 2"] },
         { "type": "mermaid", "content": "graph TD; A-->B;" } 
      ],
      // EN OTROS MODOS:
      "questions": [
        {
          "id": "q1",
          "type": "multiple_choice",
          "text": "Pregunta...",
          "options": ["Opción A", "Opción B"],
          "correct_answer": "Opción A",
          "hint": "Pista (solo si no es examen)"
        }
      ]
    }
  ]
}
`;

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
   - Si es 'aprender', PRIORIZA explicaciones y mapas mentales.
   - Si es 'proyecto', PRIORIZA narrativa y pasos lógicos.
2. PERSONALIZA según el perfil del alumno (VARK/Intereses).
3. RIGOR CURRICULAR (LOMLOE).

FORMATO JSON ESPERADO (Sintaxis Estricta):
${baseJsonFormat}

¡GENERA EL RECURSO AHORA!
`;
}

// ========== FUNCIÓN PRINCIPAL ==========

// Internal function for single batch generation
const generateSingleBatch = async ({ profile, subject, topic, activityType, config, observations = "", excludedContent = [] }) => {
    console.log(`🚀 Generador LOMLOE: ${topic}`);

    const [saberes, criterios, competencias, learningProfile] = await Promise.all([
        loadSaberesBasicos(subject.name, profile.grade_level),
        loadCriteriosEvaluacion(subject.name, profile.grade_level),
        loadCompetencias(),
        supabase.from('learning_profiles').select('*').eq('student_id', profile.id).single()
    ]);

    // Inyectar el perfil detallado si existe
    if (learningProfile?.data) {
        profile.learning_profile = learningProfile.data;
    }

    console.log(`📚 Currículo: ${saberes.length} saberes, ${criterios.length} criterios`);



    // Select AI Engine - Priority: SambaNova (Quality) > Chrome AI (Local) > Ollama (Local) > Gemini/OpenRouter
    let engine = null;
    let aiClient = null;
    let geminiAI = getGeminiClient();
    let openrouter = getOpenAIClient('OPENROUTER');
    let sambanova = getOpenAIClient('SAMBANOVA');

    // 1. SAMBANOVA (Highest Quality Free Tier)
    if (sambanova) {
        engine = 'SAMBANOVA';
        aiClient = sambanova;
        console.log('✅ Using SambaNova AI (Llama 3.1 405B) - HIGH QUALITY');
    }

    // 2. CHROME AI (Gemini Nano)
    // Only check if SambaNova is missing (or user prefers local)
    if (!engine && typeof window !== 'undefined' && window.ai && window.ai.languageModel) {
        try {
            const capabilities = await window.ai.languageModel.capabilities();
            if (capabilities.available === 'readily') {
                engine = 'CHROME_AI';
                console.log('✅ Using Chrome Built-in AI (Gemini Nano)');
            }
        } catch (e) {
            console.warn('⚠️ Error checking Chrome AI capabilities:', e);
        }
    }

    // 3. OLLAMA (Local Llama)
    if (!engine) {
        // Detect if Ollama is running
        try {
            const up = await checkOllamaStatus();
            if (up) {
                engine = 'OLLAMA';
                console.log('✅ Using Ollama (Localhost) - Llama Model');
            }
        } catch (e) {
            console.log("Ollama not detected.");
        }
    }

    // 4. LEGACY FALLBACKS
    if (!engine && geminiAI) {
        engine = 'GEMINI';
        console.log('✅ Using Google Gemini AI (Cloud)');
    } else if (!engine && openrouter) {
        engine = 'OPENROUTER';
        aiClient = openrouter;
        console.log('✅ Using OpenRouter (Multi-Model Gateway)');
    }

    if (!engine) {
        console.warn("⚠️ No AI Engine found. (Enable SambaNova, Chrome AI, or Ollama)");
        // Note: Logic continues, but will fail in try/catch block below, triggering the Cloze fallback.
    }

    console.log(`🤖 Motor seleccionado: ${engine}`);

    let systemPrompt = buildLOMLOEPrompt({
        profile, subject, topic, activityType, config,
        saberes, criterios, competencias,
        observations,
        fileContext: "" // No files
    });

    // EXECUTE WITH RETRY
    try {
        let attempt = 0;
        const maxAttempts = 3;

        while (attempt < maxAttempts) {
            attempt++;
            console.log(`🔄 Intento ${attempt}/${maxAttempts}...`);

            try {
                let rawResponse = null;

                if (engine === 'SAMBANOVA') {
                    // Smart Fallback Strategy - OPTIMIZED FOR FREE TIER RELIABILITY
                    let modelName = "Meta-Llama-3.1-8B-Instruct"; // Default: 8B (Fast, Reliable, Available)
                    if (attempt === 2) modelName = "Meta-Llama-3.1-8B-Instruct"; // Fallback 1: Same model (retry)
                    if (attempt === 3) modelName = "Meta-Llama-3.1-8B-Instruct";  // Fallback 2: Same model (last try)

                    console.log(`🔌 Connecting to SambaNova API... (Model: ${modelName})`);

                    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getSambaNovaKey()}`
                        },
                        body: JSON.stringify({
                            model: modelName,
                            messages: [
                                { role: "system", content: "You are a helpful education assistant. Output strictly in JSON." },
                                { role: "user", content: systemPrompt + "\n\nGenera la ficha JSON ahora." }
                            ],
                            temperature: 0.7,
                            max_tokens: 4000,
                            response_format: { type: "json_object" }
                        })
                    });

                    if (!response.ok) {
                        const errText = await response.text();
                        console.warn(`⚠️ Model ${modelName} failed (Status ${response.status}). Switching model...`);
                        throw new Error(`SambaNova Error ${response.status}: ${errText}`);
                    }

                    const data = await response.json();
                    rawResponse = data.choices[0].message.content;

                } else if (engine === 'OLLAMA') {
                    rawResponse = await callOllama(systemPrompt);

                } else if (engine === 'CHROME_AI') {
                    // Chrome Built-in AI Implementation
                    console.log('🤖 Model: Gemini Nano (Local)');
                    const session = await window.ai.languageModel.create({
                        systemPrompt: "You are a helpful JSON generator. Output valid JSON only."
                    });
                    const fullPrompt = systemPrompt + "\n\nRESPONSE (JSON ONLY):";
                    rawResponse = await session.prompt(fullPrompt);

                } else if (engine === 'GEMINI') {
                    // Google Gemini API (native SDK)
                    console.log('🤖 Model: Gemini 1.5 Flash (Free)');
                    const model = geminiAI.getGenerativeModel({
                        model: "gemini-1.5-flash",
                        generationConfig: {
                            temperature: 0.7,
                            responseMimeType: "application/json",
                            maxOutputTokens: 8192
                        }
                    });
                    const result = await model.generateContent(systemPrompt + "\n\nGenera la ficha ahora");
                    rawResponse = result.response.text();

                } else if (engine === 'OPENROUTER') {
                    console.log('🤖 Model: GPT-4 Turbo (via OpenRouter)');
                    const completion = await aiClient.chat.completions.create({
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: "Genera la ficha ahora" }
                        ],
                        model: "meta-llama/llama-3.1-8b-instruct:free", // Update formatting
                        response_format: { type: "json_object" },
                        temperature: 0.7,
                        max_tokens: 8192, // FORCE MAX TOKENS
                    });
                    console.log("📨 Prompt Tokens Sent. Config:", config?.numQuestions);
                    rawResponse = completion.choices[0].message.content;

                } else {
                    throw new Error("No AI Engine available (Enable Chrome AI, Ollama, or Add Key)");
                }

                // VALIDATE JSON
                if (rawResponse) {
                    try {
                        // Clean markdown fences just in case Nano adds them
                        const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
                        let parsed = JSON.parse(cleaned);

                        // DEDUPLICATE QUESTIONS (Auto-Cleanup)
                        if (parsed.sections) {
                            const seen = new Set();
                            parsed.sections.forEach(s => {
                                if (s.questions) {
                                    s.questions = s.questions.filter(q => {
                                        if (!q.text) return false;
                                        // Normalize: lowercase + strip weird chars
                                        const key = q.text.toLowerCase().trim().replace(/[^a-z0-9ñáéíóúü]/g, '');
                                        // If key is too short (<5 chars), allow it (might be "2+2")
                                        if (key.length < 5) return true;

                                        if (seen.has(key)) {
                                            console.warn("⚠️ Duplicate Question removed:", q.text);
                                            return false;
                                        }
                                        seen.add(key);
                                        return true;
                                    });
                                }
                            });
                        }

                        console.log("✅ JSON válido y deduplicado");
                        return JSON.stringify(parsed);
                    } catch (parseError) {
                        console.warn(`⚠️ Intento ${attempt} JSON inválido`);
                        console.log("Raw Response:", rawResponse.substring(0, 200) + "...");
                        if (attempt >= maxAttempts) {
                            throw new Error(`JSON inválido: ${parseError.message}`);
                        }
                        systemPrompt += "\n\n⚠️ CRÍTICO: Intento anterior falló. REVISA todas las comillas y comas.";
                    }
                }

            } catch (genError) {
                console.error(`Error intento ${attempt}:`, genError);
                if (attempt >= maxAttempts) throw genError;
            }
        }

        throw new Error("No se pudo generar JSON válido");

    } catch (e) {
        console.error("AI Error:", e);
        throw new Error(`Fallo en IA (${engine}): ` + e.message);
    }
};

// ========== ESTRATEGIA DE BATCHING (GENERACIÓN POR LOTES) ==========
// Wrapper para manejar >10 preguntas dividiendo en llamadas paralelas/secuenciales
export const generateWorksheet = async (args) => {
    const totalQ = args.config?.numQuestions || 5;

    // 1. Camino Directo (<= 10 preguntas)
    if (totalQ <= 10) {
        return generateSingleBatch(args);
    }

    // 2. Estrategia Batching (> 10 preguntas)
    // Reduce riesgo de truncamiento de tokens y alucinaciones por contexto largo
    console.log(`📦 BATCH MODE ACTIVATED: Generating ${totalQ} questions in 2 batches...`);

    const BATCH_SIZE = 10;
    const numBatches = Math.ceil(totalQ / BATCH_SIZE);

    try {
        const results = [];

        for (let i = 0; i < numBatches; i++) {
            const isLast = i === numBatches - 1;
            const size = isLast ? (totalQ - (i * BATCH_SIZE)) : BATCH_SIZE;
            if (size <= 0) continue;

            // Variaciones para forzar diversidad
            let topicVariant = args.topic;
            const obsVariant = (args.observations || "") + `\nBATCH INFO: Grupo ${i + 1}/${numBatches}. Genera ${size} preguntas únicas.`;

            if (i === 1) topicVariant += " (Aplicación Práctica)";
            if (i === 2) topicVariant += " (Análisis y Casos)";
            if (i === 3) topicVariant += " (Creatividad y Visual)";
            if (i >= 4) topicVariant += " (Síntesis y Evaluación)";

            const batchConfig = { ...args.config, numQuestions: size };

            console.log(`🔹 Processing Batch ${i + 1}/${numBatches} (${size} Qs)...`);

            try {
                // SEQUENTIAL EXECUTION
                const batchResult = await generateSingleBatch({
                    ...args,
                    config: batchConfig,
                    topic: topicVariant,
                    observations: obsVariant,
                    excludedContent: args.excludedContent || []
                });

                results.push(batchResult);

                // Rate Limit Mitigation (2s delay)
                if (!isLast) {
                    console.log("⏳ Cooling down (2s)...");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            } catch (err) {
                console.error(`❌ Batch ${i + 1} failed:`, err);
                // Continue with other batches if one fails? Or throw?
                // Throwing ensures we don't return partial garbage.
                throw err;
            }
        }

        // Fusión
        const merged = { ...results[0] }; // Base metadata
        const allQuestions = results.flatMap(r => r.sections?.flatMap(s => s.questions || []) || []);

        // Re-indexar IDs
        allQuestions.forEach((q, i) => {
            q.id = `q${i + 1}`;
        });

        merged.sections = [{
            title: `Batería de ${allQuestions.length} Ejercicios (IA)`,
            questions: allQuestions
        }];

        console.log(`✅ BATCH COMPLETE: Merged ${allQuestions.length} questions successfully.`);
        return JSON.stringify(merged);

    } catch (batchError) {
        console.error("❌ Batching failed.", batchError);
        throw batchError;
    }
};

// ========== GUARDAR RESULTADOS ==========

// ========== ANÁLISIS DE ESTILOS DE APRENDIZAJE ==========

export const analyzeLearningStyle = async (answers) => {
    console.log("🧠 Analizando estilo de aprendizaje...");

    const geminiAI = getGeminiClient();
    if (!geminiAI) throw new Error("IA no configurada. Por favor, añade tu Gemini API Key en el perfil.");

    const prompt = `
    ROL: Psicopedagogo experto en neuroeducación y modelos de aprendizaje (VARK, Felder-Silverman, Inteligencias Múltiples de Gardner y Ciclo de Kolb).
    
    OBJETIVO: Analizar las respuestas y los cálculos preliminares de un estudiante para generar un perfil psicopedagógico profundo.
    
    DATOS DEL CUESTIONARIO Y CÁLCULOS PRELIMINARES:
    ${JSON.stringify(answers, null, 2)}
    
    INSTRUCCIONES:
    1. Valida y expande la tendencia dominante en VARK.
    2. Analiza las Inteligencias Múltiples dominantes basándote en las preferencias expresadas.
    3. Interpreta el estilo del Ciclo de Kolb (Divergente, Asimilador, Convergente o Acomodador).
    4. Genera un resumen narrativo de alto valor para padres y profesores.
    5. Proporciona 3 consejos estratégicos de estudio (reales y accionables) que utilicen las fortalezas detectadas.
    
    FORMATO JSON (ESTRICTO):
    {
       "ai_summary": "Resumen narrativo motivador",
       "personalization_tips": ["Consejo 1", "Consejo 2", "Consejo 3"]
    }
    `;

    try {
        const model = geminiAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Versión estable v1
            generationConfig: {
                temperature: 0.4,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return JSON.parse(response);
    } catch (e) {
        console.error("Error analizando estilo:", e);
        throw e;
    }
};


// ========== GENERACIÓN DE ROADMAP DE ESTUDIO ==========

export const generateExamRoadmap = async ({ profile, learningProfile, subject, topic, examDate }) => {
    console.log("📅 Generando Roadmap de Estudio con IA...");

    const geminiAI = getGeminiClient();
    if (!geminiAI) throw new Error("IA no configurada.");

    // Preparar contexto pedagógico
    let pedagogicalContext = "";
    if (learningProfile) {
        pedagogicalContext = `
        - Estilo Dominante: ${learningProfile.vark_dominant}
        - Inteligencias: ${Object.entries(learningProfile.multiple_intelligences || {})
                .sort(([, a], [, b]) => b - a).slice(0, 2).map(([k]) => k).join(', ')}
        - Rasgos: Atención ${learningProfile.cognitive_traits?.attention || 'normal'}.
        `;
    }

    const prompt = `
    ROL: Tutor Pedagógico Experto y Planificador de Estudios.
    
    OBJETIVO: Crear un calendario de estudio (Roadmap) para un examen de "${subject}" sobre el tema "${topic}" con fecha ${examDate}.
    
    PERFIL DEL ESTUDIANTE:
    - Nivel: ${profile.education_level} - ${profile.grade_level}
    - Reto: ${profile.challenge_level}
    ${pedagogicalContext}
    
    INSTRUCCIONES:
    1. Divide el tema en 3-5 bloques lógicos (micro-learning para evitar sobrecarga cognitiva).
    2. Para cada bloque, asigna una fecha sugerida (empezando desde hoy hasta el examen).
    3. Para cada bloque, sugiere una "Actividad Estrella" basada en su estilo VARK/Inteligencias.
    4. Incluye un consejo de "Carga Cognitiva": cómo estudiar este tema sin saturarse.
    
    FORMATO JSON (ESTRICTO):
    {
       "summary": "Breve descripción motivadora del plan",
       "steps": [
          {
             "title": "Nombre del Bloque",
             "description": "Qué debe estudiar",
             "suggested_date": "YYYY-MM-DD",
             "vark_activity": "Actividad específica para su estilo",
             "status": "pending"
          }
       ],
       "cognitive_load_tip": "Consejo para no saturarse"
    }
    `;

    try {
        const model = geminiAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { temperature: 0.5, responseMimeType: "application/json" }
        });

        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    } catch (e) {
        console.error("Error generando roadmap:", e);
        throw e;
    }
};

export const saveEvaluationResults = async (studentId, worksheetInfo, results) => {
    try {
        if (!studentId || !results || results.length === 0) return false;
        console.log("💾 Guardando analítica para estudiante:", studentId);

        // 1. Calcular resumen de la sesión
        const correctCount = results.filter(r => r.isCorrect).length;
        const totalCount = results.length;
        const score = (correctCount / totalCount) * 10;
        const totalTime = results.reduce((acc, curr) => acc + (curr.timeSeconds || 0), 0);

        // 2. Insertar en la tabla de Resumen (resultados_evaluacion)
        const { data: summaryData, error: summaryError } = await supabase
            .from('resultados_evaluacion')
            .insert({
                student_id: studentId,
                subject_name: worksheetInfo.subjectName || 'General',
                topic: worksheetInfo.topic || 'General',
                score: score,
                total_questions: totalCount,
                correct_questions: correctCount,
                time_spent_seconds: totalTime,
                perfil_cognitivo_id: worksheetInfo.perfilCognitivoId || null,
                advanced_metrics: worksheetInfo.advancedMetrics || null // Persistencia de telemetría neuro-pedagógica
            })
            .select()
            .single();

        if (summaryError) throw summaryError;

        // 3. Insertar detalles (evaluacion_detallada)
        const detailedRecords = results.map(r => ({
            resultado_id: summaryData.id,
            student_id: studentId,
            question_id: r.questionId,
            criterio_evaluacion: r.criterio,
            competencias: r.competencias,
            es_correcto: r.isCorrect,
            respuesta_estudiante: r.studentAnswer,
            respuesta_correcta: r.correctAnswer,
            feedback_ia: r.feedback,
            tiempo_respuesta_segundos: r.timeSeconds || null,
            // Guardamos los tags neuro-educativos para análisis futuro (VARK/Foco)
            tags: r.tags || null
        }));

        const { error: detailError } = await supabase
            .from('evaluacion_detallada')
            .insert(detailedRecords);

        if (detailError) throw detailError;

        console.log(`✅ Sesión guardada con éxito (${correctCount}/${totalCount} aciertos)`);
        return true;
    } catch (e) {
        console.error("❌ Error en saveEvaluationResults:", e);
        return false;
    }
};

// --- OLLAMA HELPER FUNCTIONS ---

async function checkOllamaStatus() {
    try {
        const res = await fetch('http://localhost:11434/api/tags');
        return res.ok;
    } catch (e) { return false; }
}

async function callOllama(prompt) {
    console.log("🦙 Calling Ollama (Llama 3)...");
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            prompt: prompt + "\n\nRESPOND ONLY WITH VALID JSON. NO MARKDOWN.",
            stream: false,
            format: 'json',
            options: { temperature: 0.7 }
        })
    });
    const data = await response.json();
    return data.response;
}
