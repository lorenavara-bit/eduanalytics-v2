

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Try loading .env.local first, then .env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://kbgkgoxwwlpszyfidufa.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZ2tnb3h3d2xwc3p5ZmlkdWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMDQ4ODcsImV4cCI6MjA4MDY4MDg4N30.hcjw1Lob5x4Hb084x5Up0oLdZjTuCTIryUVCX4eSkhk';
// Using DeepSeek Key for OpenAI compatible call? 
// The original script used GoogleGenerativeAI. If the user only has DeepSeek, I should use an OpenAI client pointing to Deepseek?
// OR does the user have a Gemini Key somewhere?
// The user previously mentioned Gemini Nano in Chrome.
// Let's assume for now we might need to ask the user for a key if it's missing.
// I see VITE_GEMINI_API_KEY in the original script but it was missing in the env.
// I will trust the user provided keys. If I don't see a Gemini Key, I can't run Gemini logic.
// I will check if I can use the DeepSeek key with an OpenAI client instead.
// CONFIGURACIÓN DE IA - SAMBANOVA (Llama 3.1)
// Priority: Env Var > Hardcoded Fallback
const sambaNovaKey = process.env.VITE_SAMBANOVA_API_KEY || "54017650-0863-4436-a868-93409238101e";

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Faltan credenciales de Supabase.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Setup AI Model (SambaNova via Fetch)
const generateResponse = async (prompt) => {
    try {
        const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sambaNovaKey}`
            },
            body: JSON.stringify({
                model: "Meta-Llama-3.1-8B-Instruct",
                messages: [
                    { role: "system", content: "You are a helpful education assistant. Output strictly in valid JSON format." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`SambaNova Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (e) {
        console.error("AI Fetch Error:", e);
        throw e; // Rethrow to handle in main loop
    }
};



async function autoTagQuestions() {
    console.log("🚀 Iniciando el Robot Etiquetador de Neuro-Educación...");

    // 1. Obtener preguntas sin etiquetar (donde foco_pedagogico es NULL)
    // Nota: Limitamos a 50 para prueba inicial
    const { data: questions, error } = await supabase
        .from('question_bank_local')
        .select('id, question_text, topic, subject')
        .is('foco_pedagogico', null)
        .limit(20);

    if (error) {
        console.error("❌ Error obteniendo preguntas:", error);
        return;
    }

    if (!questions || questions.length === 0) {
        console.log("✅ No hay preguntas pendientes de etiquetar.");
        return;
    }

    console.log(`📋 Procesando lote de ${questions.length} preguntas...`);

    for (const q of questions) {
        try {
            console.log(`\n🔍 Analizando ID ${q.id}: "${q.question_text.substring(0, 50)}..."`);

            const prompt = `
            Actúa como un experto en Neuro-Educación y Pedagogía. Analiza esta pregunta escolar y devuélveme sus etiquetas en formato JSON estricto.

            PREGUNTA: "${q.question_text}"
            TEMA: ${q.topic}
            ASIGNATURA: ${q.subject}

            CLASIFICALA EN ESTOS 3 EJES:

            1. FOCO_PEDAGOGICO (Elige UNO):
               - "concepto": Si pide definir, explicar, identificar qué es algo.
               - "procedimiento": Si pide calcular, operar, resolver pasos, reglas ortográficas específicas.
               - "aplicacion": Si es un problema contextualizado, caso práctico o uso en la vida real.

            2. VARK_STYLES (Array, máximo 2):
               - "visual": Si usa gráficos, mapas, diagramas, colores, o pide visualizar/observar.
               - "aural": Si implica escuchar, debatir, explicar oralmente (raro en texto escrito, pero posible).
               - "read_write": Si es puramente texto, lectura, definiciones, escritura. (El más común por defecto).
               - "kinesthetic": Si implica hacer, construir, medir objetos reales, experimentos.

            3. MULTIPLE_INTELLIGENCES (Array, máximo 2):
               - "linguistic": Uso del lenguaje, vocabulario, redacción.
               - "logical_mathematical": Lógica, cálculo, razonamiento abstracto.
               - "spatial": Mapas, geometría, arte, visualización.
               - "bodily_kinesthetic": Movimiento, construcción.
               - "musical": Ritmo, sonidos.
               - "interpersonal": Social, empatía, grupos.
               - "intrapersonal": Auto-reflexión.
               - "naturalistic": Naturaleza, biología, entorno físico.

            FORMATO JSON RESPUESTA:
            {
                "foco_pedagogico": "...",
                "vark_styles": ["..."],
                "multiple_intelligences": ["..."]
            }
            `;

            const text = await generateResponse(prompt);


            // Limpieza básica del JSON
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const tags = JSON.parse(jsonStr);

            // Validar estructura básica antes de guardar
            if (!tags.foco_pedagogico || !tags.vark_styles || !tags.multiple_intelligences) {
                console.warn(`⚠️ Respuesta AI incompleta para ${q.id}, saltando.`);
                continue;
            }

            console.log(`✅ Etiquetas generadas: Foco=${tags.foco_pedagogico} | VARK=${tags.vark_styles} | MI=${tags.multiple_intelligences}`);

            // Actualizar DB
            const { error: updateError } = await supabase
                .from('question_bank_local')
                .update({
                    foco_pedagogico: tags.foco_pedagogico,
                    vark_styles: tags.vark_styles,
                    multiple_intelligences: tags.multiple_intelligences
                })
                .eq('id', q.id);

            if (updateError) {
                console.error(`❌ Error actualizando DB para ${q.id}:`, updateError);
            } else {
                console.log(`💾 Guardado en DB.`);
            }

        } catch (err) {
            console.error(`❌ Error procesando pregunta ${q.id}:`, err);
        }

        // Pequeña pausa para no saturar el API (opcional)
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log("\n🏁 Lote finalizado.");
}

autoTagQuestions();
