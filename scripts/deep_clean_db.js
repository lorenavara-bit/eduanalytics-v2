import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Cargar .env.local prioritariamente
const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
console.log(`📡 Usando configuración de: ${envFile}`);
dotenv.config({ path: envFile });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Error: No se encontraron las credenciales de Supabase en .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function deepSweep() {
    console.log("🧹 Iniciando limpieza profunda de base de datos...");

    try {
        // 1. Limpiar caché de ejercicios
        console.log("🔹 Vaciando exercise_cache...");
        const { error: err1 } = await supabase.from('exercise_cache').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (err1) console.warn("⚠️ Nota: Error al vaciar cache (quizás ya está vacía o no hay permisos):", err1.message);
        else console.log("✅ Cache vaciado.");

        // 2. Limpiar metadatos del banco de preguntas
        console.log("🔹 Limpiando metadatos legacy en question_bank_local...");
        // Intentamos una actualización de metadatos (postgres jsonb removal)
        // Nota: El cliente JS tiene limitaciones para operaciones jsonb complejas directamente, 
        // pero podemos obtener, limpiar y guardar.

        const { data: questions, error: fetchErr } = await supabase
            .from('question_bank_local')
            .select('id, metadata');

        if (fetchErr) {
            console.error("❌ Error obteniendo preguntas:", fetchErr.message);
        } else if (questions) {
            let updatedCount = 0;
            for (const q of questions) {
                if (q.metadata) {
                    const keysToDelete = ['explanation', 'explicacion', 'feedback_map', 'feedback_card', 'hint', 'explicacionDiamante'];
                    let changed = false;
                    const newMetadata = { ...q.metadata };

                    keysToDelete.forEach(key => {
                        if (newMetadata[key]) {
                            delete newMetadata[key];
                            changed = true;
                        }
                    });

                    if (changed) {
                        await supabase.from('question_bank_local').update({ metadata: newMetadata }).eq('id', q.id);
                        updatedCount++;
                    }
                }
            }
            console.log(`✅ Metadatos limpiados en ${updatedCount} preguntas.`);
        }

        console.log("\n✨ LIMPIEZA COMPLETADA CON ÉXITO.");
        console.log("Ahora puedes generar una ficha nueva sin rastro del pasado.");

    } catch (e) {
        console.error("❌ Error inesperado durante el sweep:", e.message);
    }
}

deepSweep();
