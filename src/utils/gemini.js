// MOTOR DE IA LOMLOE-AWARE - Versión Corregida
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import OpenAI from "openai";
import { extractTextFromUrl, pdfToImagePayload } from './fileHelpers';
import { supabase } from '../supabaseClient';

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

let googleGenAI = null;
if (GOOGLE_KEY) googleGenAI = new GoogleGenerativeAI(GOOGLE_KEY);

let groq = null;
if (GROQ_KEY) groq = new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true });

let openai = null;
if (OPENAI_KEY) openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });

// ========== HELPERS: CARGA DE DATOS LOMLOE ==========

async function loadSaberesBasicos(asignatura, curso) {
    try {
        const { data, error } = await supabase
            .from('saberes_basicos')
            .select('*')
            .eq('asignatura', asignatura)
            .eq('curso', curso);

        if (error) throw error;
        return data || [];
    } catch (e) {
        console.warn("No se pudieron cargar saberes básicos:", e);
        return [];
    }
}

async function loadCriteriosEvaluacion(asignatura, curso) {
    try {
        const { data, error } = await supabase
            .from('criterios_evaluacion')
            .select('*')
            .eq('asignatura', asignatura)
            .eq('curso', curso);

        if (error) throw error;
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

    const styleHint = learningStyleTips[profile.learning_style] || 'Adapta al nivel del estudiante.';

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

    return `
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

4. 🧠 CALIDAD PEDAGÓGICA:
   - Usa nivel cognitivo de Bloom apropiado
   - Proporciona feedback constructivo
   - Hints útiles sin dar la respuesta

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
     * La pregunta en "text" se basa en ese texto
     * Usa multiple_choice, short_answer o true_false según convenga
     * Ejemplo estructura:
       {
         "id": "q1",
         "type": "multiple_choice",
         "reading_text": "Había una vez un pequeño ratón gris que vivía...",
         "text": "¿De qué color era el ratón?",
         "options": ["Blanco", "Gris", "Negro", "Marrón"],
         "correct_answer": "Gris"
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

    const [saberes, criterios, competencias] = await Promise.all([
        loadSaberesBasicos(subject.name, profile.grade_level),
        loadCriteriosEvaluacion(subject.name, profile.grade_level),
        loadCompetencias()
    ]);

    console.log(`📚 Currículo: ${saberes.length} saberes, ${criterios.length} criterios`);

    // Select AI Engine (prefer Groq for simplicity, fallback to others)
    let engine = 'GROQ';
    if (!groq && googleGenAI) engine = 'GEMINI';
    else if (!groq && !googleGenAI && openai) engine = 'OPENAI';

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
                    const model = googleGenAI.getGenerativeModel({
                        model: "gemini-1.5-flash",
                        generationConfig: { responseMimeType: "application/json" }
                    });

                    const result = await model.generateContent(systemPrompt);
                    rawResponse = result.response.text();

                } else if (engine === 'OPENAI') {
                    const completion = await openai.chat.completions.create({
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: "Genera la ficha ahora" }
                        ],
                        model: "gpt-4o",
                        response_format: { type: "json_object" }
                    });
                    rawResponse = completion.choices[0].message.content;

                } else {
                    // GROQ (default)
                    const completion = await groq.chat.completions.create({
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: "Genera la ficha ahora" }
                        ],
                        model: "llama-3.3-70b-versatile",
                        temperature: 0.6,
                        response_format: { type: "json_object" }
                    });
                    rawResponse = completion.choices[0]?.message?.content || "{}";
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

        // Fallback to Groq if quota error
        if ((e.message.includes('429') || e.message.includes('quota')) && engine !== 'GROQ' && groq) {
            console.warn("⚠️ Quota excedida. Fallback a Groq...");
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: "Genera la ficha ahora" }
                    ],
                    model: "llama-3.3-70b-versatile",
                    response_format: { type: "json_object" }
                });
                return completion.choices[0]?.message?.content || "{}";
            } catch (fbError) {
                throw new Error("Quota & Fallback Failed");
            }
        }

        throw new Error("Fallo en IA: " + e.message);
    }
};

// ========== GUARDAR RESULTADOS ==========

export async function saveEvaluationResults(studentId, worksheetId, results) {
    try {
        const records = results.map(r => ({
            student_id: studentId,
            worksheet_id: worksheetId,
            question_id: r.questionId,
            criterio_evaluacion: r.criterio,
            competencias: r.competencias,
            es_correcto: r.isCorrect,
            nivel_desempeno: r.nivelDesempeno || null,
            respuesta_estudiante: r.studentAnswer,
            respuesta_correcta: r.correctAnswer,
            feedback_ia: r.feedback,
            tiempo_respuesta_segundos: r.timeSeconds || null
        }));

        const { error } = await supabase
            .from('resultados_evaluacion')
            .insert(records);

        if (error) throw error;
        console.log(`✅ ${records.length} resultados guardados`);
        return true;
    } catch (e) {
        console.error("Error guardando:", e);
        return false;
    }
}
