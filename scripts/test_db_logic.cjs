const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

// Configuración manual si .env falla (Fallback visual para el usuario)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Error: No se encontraron las variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY.");
    console.log("Asegúrate de tener un archivo .env en la raíz del proyecto.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runTest() {
    console.log("🔌 Conectando a Supabase...");
    console.log(`Target URL: ${SUPABASE_URL}`);

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 1: Buscar el ejercicio problemático "badder"
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n🔎 TEST 1: Buscando ejercicio 'Final Boss' (Bad -> Worst)...");

    // Buscamos por una parte del prompt conocida
    const { data: exercises, error: exError } = await supabase
        .from('uge_exercises')
        .select('*')
        .ilike('prompt', '%bad%film%')
        .limit(1);

    if (exError) {
        console.error("❌ Error fetching exercises:", exError);
        return;
    }

    if (!exercises || exercises.length === 0) {
        console.error("❌ No se encontró el ejercicio 'This is the ____ (bad) film.'. Asegúrate de haber ejecutado el Seed.");
        return;
    }

    const targetExercise = exercises[0];
    console.log("✅ Ejercicio encontrado:");
    console.log(`   ID: ${targetExercise.id}`);
    console.log(`   Pregunta: "${targetExercise.prompt}"`);
    console.log(`   Respuesta correcta: "${targetExercise.correct_answer}"`);
    console.log(`   SCOPES ACTIVOS: [${targetExercise.valid_scopes.join(', ')}]`);

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 2: Simular "Motor de Evaluación" (Scope Guarding)
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n🛡️ TEST 2: Simulando Scope Guarding...");
    console.log(`   Buscando reglas solo para los scopes: ${targetExercise.valid_scopes.join(', ')}`);

    const { data: rules, error: ruleError } = await supabase
        .from('uge_grammar_rules')
        .select('rule_code, topic, regex_pattern')
        .in('scope_tag', targetExercise.valid_scopes);

    if (ruleError) {
        console.error("❌ Error fetching rules:", ruleError);
        return;
    }

    console.log(`✅ Reglas cargadas: ${rules.length}`);

    // ─────────────────────────────────────────────────────────────────────────────
    // TEST 3: ¿Tenemos la regla de comparativos irregulares?
    // ─────────────────────────────────────────────────────────────────────────────
    const irregularRule = rules.find(r => r.rule_code === 'COMP_IRREGULAR');

    if (irregularRule) {
        console.log("\n✨ ÉXITO: La regla 'COMP_IRREGULAR' está presente en el contexto.");
        console.log(`   Regex: ${irregularRule.regex_pattern}`);
        console.log("   --> El sistema detectaría 'badder' correctamente y daría el feedback específico.");
    } else {
        console.error("\n⚠️ ALERTA: No se encontró la regla COMP_IRREGULAR en los scopes activos.");
        console.log("   Esto podría causar que el error 'badder' no se detecte específicamente.");
    }

    // Verificación extra: ¿Está la regla de "More" que causaba falsos positivos?
    const moreRule = rules.find(r => r.rule_code === 'COMPARATIVE_MORE_ER');
    if (moreRule) {
        console.log("   (Nota: La regla standard 'COMPARATIVE_MORE_ER' también está activa, pero el regex específico debería ganar prioridad).");
    }

}

runTest();
