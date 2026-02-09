// MOTOR DE IA LOMLOE-AWARE - Multi-Provider (Gemini + OpenRouter + SambaNova)
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractTextFromUrl, pdfToImagePayload } from './fileHelpers';
import { supabase } from '../supabaseClient';
import { normalizeSubject, normalizeGrade } from './curriculumNormalizer';
import { getEnv } from './appEnv';

const getGeminiKey = () => localStorage.getItem('GEMINI_API_KEY') || getEnv('VITE_GEMINI_API_KEY');
const getSambaNovaKey = () => localStorage.getItem('SAMBANOVA_API_KEY') || getEnv('VITE_SAMBANOVA_API_KEY');
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
        const baseURL = getEnv('DEV')
            ? 'http://localhost:5174/api/sambanova'
            : 'https://api.sambanova.ai/v1';
        return new OpenAI({ apiKey: key, baseURL, dangerouslyAllowBrowser: true });
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
    fileContext = ""
}) {
    const diff = config?.difficulty || 'Medio';
    const numQ = config?.numQuestions || 10;
    const qTypes = config?.questionTypes?.join(', ') || 'Variado';
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

    const neurodiversityContext = profile.nee_data ? `
🧠 PERFIL DE NEURODIVERSIDAD (Cribado Temprano):
Nivel de Riesgo General: ${profile.nee_data.risk_level}
RECOMENDACIONES ESPECÍFICAS DE ADAPTACIÓN:
${profile.nee_data.recommendations?.map(r => `- ${r.category}: ${r.message}`).join('\n')}

⚠️ INSTRUCCIONES DE DISEÑO PEDAGÓGICO:
${profile.nee_data.risk_level === 'HIGH' ? '- PRIORIDAD ABSOLUTA: Adapta el ritmo. Divide TODAS las tareas en micro-pasos.' : ''}
${profile.nee_data.recommendations?.some(r => r.category === 'DISLEXIA') ? '- MODO DISLEXIA: Usa enunciados cortos, directos y evita textos excesivamente densos. Prioriza el apoyo visual.' : ''}
${profile.nee_data.recommendations?.some(r => r.category === 'TDAH') ? '- MODO TDAH: Incluye recordatorios de enfoque. Cambia el tipo de actividad cada 2-3 preguntas para mantener el interés.' : ''}
${profile.nee_data.recommendations?.some(r => r.category === 'AACC') ? '- MODO ALTAS CAPACIDADES: No te limites al curso. Propón retos de pensamiento lateral y conexiones interdisciplinares profundas.' : ''}
` : "";

    const interestContext = config?.interest
        ? `🌟 INTERÉS ESPECIAL: El estudiante ama "${config.interest}". 
           - Explica la teoría usando analogías de "${config.interest}".
           - Ambientación: Si es "Minecraft", el mundo es de cubos. Si es "Espacio", estamos en una misión.
           - Los nombres de los personajes en los problemas deben ser de ese mundo.`
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

    const challengeLevel = profile.challenge_level || config?.challenge_level || 'standard';
    const challengeHint = {
        'refuerzo': '⚠️ NIVEL REFUERZO: Simplifica conceptos. Usa lenguaje muy claro. Divide problemas complejos en pasos pequeños. Prioriza saberes básicos mínimos.',
        'standard': 'NIVEL ESTÁNDAR: Sigue el currículo oficial del curso sin desviaciones.',
        'ampliacion': '🚀 NIVEL AMPLIACIÓN/RETO: Desafía al estudiante. Usa "Criterios de Evaluación por Desempeño" avanzados. Propón problemas de lógica, deducción y pensamiento crítico. Conecta con otros temas.'
    }[challengeLevel];

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

    return `
${languageInstruction}
ROL: PROFESOR EXPERTO EN CURRÍCULO LOMLOE

⚠️ MISIÓN CRÍTICA: Generar contenido SOLO del tema solicitado, adaptado EXACTAMENTE al nivel del estudiante.

Asignatura: ${subject.name}
Curso: ${profile.grade_level || 'No especificado'}
Libro de Texto: ${textbook}
${autonomyInfo}

${competenciasInfo}
${curriculumContext}
${criteriosContext}
${observationsContext}

TEMA: "${topic}"

${fileContext ? `📎 MATERIAL DIDÁCTICO:\n${fileContext}\n` : ''}

PERFIL DEL ESTUDIANTE:
- Nivel: ${profile.grade_level || 'General'}
- Estilo: ${profile.learning_style || 'General'} → ${styleHint}
${neurodiversityContext}
- Intereses: ${profile.interests || 'No especificados'}
- Áreas difíciles: ${profile.least_favorite_subjects || 'No especificadas'}

CONFIGURACIÓN:
- Tipo: ${activityType}
- Número: ${numQ} preguntas
- Dificultad: ${diff}
- Tipos: ${qTypes}

INSTRUCCIONES CRÍTICAS (CUMPLIR ESTRICTAMENTE):

1. 🎯 CIÑETE AL TEMA: 
   - Genera SOLO contenido del tema "${topic}"
   - NO añadas subtemas no mencionados
   - Si hay OBSERVACIONES, esas son la GUÍA EXACTA

2. 📚 USA CURRÍCULO OFICIAL:
   - Basa las preguntas en los SABERES BÁSICOS listados
   - Vincula CADA pregunta a un CRITERIO específico
   - Indica COMPETENCIAS trabajadas

3. 🎓 ADAPTA AL NIVEL:
   - Nivel "${profile.grade_level || 'General'}"
   - Vocabulario apropiado para la edad
   - NO uses conceptos de niveles superiores

4. 🧠 CALIDAD PEDAGÓGICA Y RETO:
   - Nivel de Reto: ${challengeLevel.toUpperCase()}
   - ${challengeHint}
   - Usa nivel cognitivo de Bloom apropiado (Crear/Evaluar para Ampliación, Recordar/Comprender para Refuerzo).
   - Proporciona feedback constructivo.
   - Hints útiles sin dar la respuesta.

5. ❤️ PERSONALIZACIÓN:
   - Si el estudiante es ${profile.learning_style || 'general'}, adáptalo
   - Conecta con intereses cuando sea natural
   - Usa ejemplos de la vida real

6. ✅ TIPOS DE PREGUNTA VÁLIDOS:
   - "multiple_choice" (con array "options")
   - "true_false" (con options: ["Verdadero", "Falso"])
   - "short_answer" (sin options)
   - "fill_gaps" (sin options)
   - "reading_comprehension" (con campo "reading_text")
   
   
   IMPORTANTE: 
   - Si usas multiple_choice o true_false, DEBES incluir "options"
   - Si usas short_answer o fill_gaps, NO incluyas "options"
   - Si usas reading_comprehension:
     * Añade campo "reading_text" con el texto a leer (puede ser HTML)
     * LONGITUD MÍNIMA DEL TEXTO según nivel:
       → 1º-3º Primaria: 80-120 palabras
       → 4º-6º Primaria: 150-200 palabras  
       → 1º-2º ESO: 200-250 palabras
       → 3º-4º ESO: 250-300 palabras
       → Bachillerato: 300-400 palabras
     * El texto debe ser INTERESANTE, EDUCATIVO y apropiado al tema
     * Hacer 3-5 preguntas sobre el texto
     * La pregunta en "text" se basa en ese texto
     * Usa multiple_choice, short_answer o true_false según convenga
     * Ejemplo estructura:
       {
         "id": "q1",
         "type": "multiple_choice",
         "reading_text": "El sistema nervioso es como una red de comunicación en nuestro cuerpo. Está formado por dos partes principales: el sistema nervioso central, que incluye el cerebro y la médula espinal, y el sistema nervioso periférico, que conecta el resto del cuerpo. El cerebro es el órgano más importante del sistema nervioso central. Controla todo lo que hacemos, desde pensar y recordar hasta mover los músculos...",
         "text": "¿Cuáles son las dos partes principales del sistema nervioso?",
         "options": ["Central y periférico", "Cerebro y corazón", "Médula y nervios", "Sensorial y motor"],
         "correct_answer": "Central y periférico"
       }

FORMATO JSON (CRÍTICO - SINTAXIS PERFECTA):

EVITA estos errores:
- ❌ Comillas sin cerrar
- ❌ Comas al final de arrays
- ❌ Saltos de línea sin escapar
- ❌ Preguntas multiple_choice sin "options"

Estructura EXACTA:
{
  "title": "Título específico del tema",
  "intro": "Intro motivadora breve", 
  "theory_recap": "Resumen SOLO del tema especificado (HTML básico permitido)",
  "metadata_lomloe": {
    "asignatura": "${subject.name}",
    "curso": "${profile.grade_level}",
    "criterios_trabajados": ["CE.X.1"],
    "competencias_trabajadas": ["CMCT"],
    "saberes_cubiertos": ["Saber específico del tema"]
  },
  "sections": [
    {
      "title": "Sección 1",
      "questions": [
        {
          "id": "q1",
          "type": "multiple_choice",
          "text": "Pregunta clara",
          "options": ["Opción A","Opción B","Opción C","Opción D"],
          "correct_answer": "Opción A",
          "criterio_evaluacion": "CE.X.1",
          "competencias": ["CMCT"],
          "nivel_bloom": "Recordar",
          "feedback": "Explicación pedagógica clara",
          "hint": "Pista sin revelar respuesta"
        }
      ]
    }
  ]
}

⚠️ RECUERDA: 
- Genera SOLO ${numQ} preguntas
- Todo el contenido debe ser sobre "${topic}" específicamente  
- Nivel ${profile.grade_level || 'adecuado'}
- JSON 100% válido sin errores de sintaxis

¡GENERA LA FICHA AHORA!
`;
}

// ========== FUNCIÓN PRINCIPAL ==========

export const generateWorksheet = async ({ profile, subject, topic, activityType, config, observations = "" }) => {
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



    // Select AI Engine - Prioritize Gemini (Free & Fast)
    let engine = null;
    let aiClient = null;
    let geminiAI = getGeminiClient();
    let openrouter = getOpenAIClient('OPENROUTER');
    let sambanova = getOpenAIClient('SAMBANOVA');

    if (geminiAI) {
        engine = 'GEMINI';
        aiClient = null; // Gemini uses different API
        console.log('✅ Using Google Gemini AI');
    } else if (openrouter) {
        engine = 'OPENROUTER';
        aiClient = openrouter;
        console.log('✅ Using OpenRouter (Multi-Model Gateway)');
    } else if (sambanova) {
        engine = 'SAMBANOVA';
        aiClient = sambanova;
        console.log('✅ Using SambaNova AI');
    } else {
        throw new Error('No hay ninguna IA configurada. Por favor, añade tu API Key en la configuración de tu perfil.');
    }

    console.log(`🤖 Motor: ${engine}`);

    let systemPrompt = buildLOMLOEPrompt({
        profile, subject, topic, activityType, config,
        saberes, criterios, competencias,
        observations,
        fileContext: "" // No files
    });

    // EXECUTE WITH RETRY
    try {
        let attempt = 0;
        const maxAttempts = 2;

        while (attempt < maxAttempts) {
            attempt++;
            console.log(`🔄 Intento ${attempt}...`);

            try {
                let rawResponse = null;

                if (engine === 'GEMINI') {
                    // Google Gemini API (native SDK)
                    console.log('🤖 Model: Gemini 2.0 Flash (Free)');

                    const model = geminiAI.getGenerativeModel({
                        model: "gemini-1.5-flash",
                        generationConfig: {
                            temperature: 0.7,
                            responseMimeType: "application/json"
                        }
                    });

                    const result = await model.generateContent(systemPrompt + "\n\nGenera la ficha ahora");
                    rawResponse = result.response.text();

                } else {
                    // OpenAI-compatible APIs (OpenRouter, SambaNova)
                    let model;
                    if (engine === 'OPENROUTER') {
                        model = "openai/gpt-4-turbo";
                        console.log('🤖 Model: GPT-4 Turbo (via OpenRouter)');
                    } else {
                        model = "Meta-Llama-3.1-405B-Instruct";
                        console.log('🤖 Model: Llama 3.1 405B (via SambaNova)');
                    }

                    const completion = await aiClient.chat.completions.create({
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: "Genera la ficha ahora" }
                        ],
                        model: model,
                        response_format: { type: "json_object" },
                        temperature: 0.7
                    });
                    rawResponse = completion.choices[0].message.content;
                }

                // VALIDATE JSON
                if (rawResponse) {
                    try {
                        JSON.parse(rawResponse);
                        console.log("✅ JSON válido");
                        return rawResponse;
                    } catch (parseError) {
                        console.warn(`⚠️ Intento ${attempt} JSON inválido`);
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
                perfil_cognitivo_id: worksheetInfo.perfilCognitivoId || null
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
            tiempo_respuesta_segundos: r.timeSeconds || null
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
