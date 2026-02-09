const fs = require('fs');
const path = require('path');

// RUTAS DE ARCHIVOS
const JSON_PATH = path.join(__dirname, '../src/data/english-error-taxonomy-4primaria.json');
const JS_PATH = path.join(__dirname, '../src/services/khan/santillana-4-primaria-INGLES.js');
const OUTPUT_FILE = path.join(__dirname, '../.agent/supabase_data_seed.sql');

// 1. MAPPING DE SCOPES (Inteligencia de Negocio)
// Asigna scopes basada en el "tema" del JSON.
function inferScopeFromTopic(topic) {
    const t = topic.toLowerCase();
    if (t.includes('comparative') || t.includes('superlative')) return 'GRAMMAR_COMPARATIVES';
    if (t.includes('present continuous')) return 'GRAMMAR_PRESENT_CONTINUOUS';
    if (t.includes('past simple') || t.includes('was/were')) return 'GRAMMAR_PAST_SIMPLE';
    if (t.includes('present simple') || t.includes('routines') || t.includes('do/does')) return 'GRAMMAR_PRESENT_SIMPLE';
    if (t.includes('have') || t.includes('got')) return 'GRAMMAR_POSSESSION'; // Have got
    if (t.includes('modal') || t.includes('should') || t.includes('can')) return 'GRAMMAR_MODALS';
    if (t.includes('article') || t.includes('a/an')) return 'GRAMMAR_ARTICLES';
    if (t.includes('preposition')) return 'GRAMMAR_PREPOSITIONS';
    if (t.includes('connector')) return 'GRAMMAR_CONNECTORS';
    if (t.includes('imperative')) return 'GRAMMAR_IMPERATIVES';
    // Default fallback
    return 'GRAMMAR_GENERAL';
}

// 2. MAPPING PARA EJERCICIOS (Unit -> Scopes)
function getScopesForUnit(unitName) {
    const u = unitName.toLowerCase();
    const scopes = ['GLOBAL_SPELLING', 'GLOBAL_SYNTAX']; // Siempre activos

    if (u.includes('unit 1') || u.includes('present simple')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE');
        scopes.push('GRAMMAR_ARTICLES'); // Often used
    }
    if (u.includes('unit 2') || u.includes('routines')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE');
        scopes.push('GRAMMAR_PREPOSITIONS'); // at 7:00, in the morning
    }
    if (u.includes('unit 3') || u.includes('jobs')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE'); // Works, plays...
        scopes.push('GRAMMAR_ARTICLES'); // A doctor
        scopes.push('GRAMMAR_PREPOSITIONS'); // in a hospital
    }
    if (u.includes('unit 4') || u.includes('health')) {
        scopes.push('GRAMMAR_POSSESSION'); // Have got
        scopes.push('GRAMMAR_MODALS'); // Should
    }
    if (u.includes('unit 5') || u.includes('comparatives')) {
        scopes.push('GRAMMAR_COMPARATIVES');
    }
    if (u.includes('unit 6') || u.includes('past')) {
        scopes.push('GRAMMAR_PAST_SIMPLE');
    }
    if (u.includes('unit 7') || u.includes('mix') || u.includes('boss')) {
        // Final Boss: Activamos TODO
        scopes.push('GRAMMAR_PRESENT_SIMPLE', 'GRAMMAR_PRESENT_CONTINUOUS', 'GRAMMAR_PAST_SIMPLE', 'GRAMMAR_COMPARATIVES', 'GRAMMAR_POSSESSION', 'GRAMMAR_MODALS', 'GRAMMAR_ARTICLES', 'GRAMMAR_PREPOSITIONS');
    }

    // De-duplicate
    return [...new Set(scopes)];
}

function escapeSql(str) {
    if (!str) return 'NULL';
    // Escapar comillas simples duplicándolas
    return "'" + str.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
}

function generateSQL() {
    let sqlOutput = "-- AUTOMATICALLY GENERATED DATA SEED\n\n";

    // ─────────────────────────────────────────────────────────────────────────────
    // PART A: GRAMMAR RULES (From JSON)
    // ─────────────────────────────────────────────────────────────────────────────
    try {
        const rulesData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

        sqlOutput += "-- 1. GRAMMAR RULES\n";

        rulesData.forEach(rule => {
            const scope = inferScopeFromTopic(rule.tema);
            const levelsJson = JSON.stringify(rule.niveles);

            sqlOutput += `INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    ${escapeSql(rule.id_error)},
    ${escapeSql(rule.tema)},
    ${escapeSql(scope)},
    ${escapeSql(rule.patron_detectado.regex)},
    ${escapeSql(levelsJson)}::jsonb,
    ${escapeSql(rule.competencia_lomloe || '')}
) ON CONFLICT (rule_code) DO NOTHING;\n\n`;
        });

    } catch (e) {
        console.error("Error processing JSON rules:", e);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // PART B: EXERCISES (From JS File)
    // ─────────────────────────────────────────────────────────────────────────────
    // Hacky parse: Leer el archivo, buscar el objeto SANTILLANA_INGLES_4
    // Como es JS, vamos a extraer el texto del objeto y usar eval (sandbox) o regex básica.
    // Dado que es complejo, usaremos una estrategia de "Extracción de bloques".

    try {
        const jsContent = fs.readFileSync(JS_PATH, 'utf8');

        // Estrategia: Buscar bloques de ejercicios dentro de 'ejercicios: [' ... ']'
        // Esto es frágil. Mejor opción: Importar el módulo si pudiéramos.
        // Opción B: Convertir el JS a JSON temporalmente regex-reemplazando.

        // Vamos a asumir que el usuario prefiere un script robusto.
        // Simplemente voy a extraer el contenido de los arrays de ejercicios.

        // Regex para encontrar nombre de unidad y su array de ejercicios
        // E.g. 'Unit 1...': { ... ejercicios: [ ... ] }

        // 1. Encontrar todas las claves de unidad
        const unitRegex = /'([^']+)'\s*:\s*\{\s*source/g;
        let match;
        const units = [];

        // Nota: Este parsing es difícil sin ejecutar el JS.
        // Voy a intentar una aproximación más segura:
        // Leeremos TODO el archivo y buscaremos los bloques `ejercicios: [...]`.
        // Asociaremos cada bloque a la unidad que está "encima".

        const lines = jsContent.split('\n');
        let currentUnit = 'Unknown Unit';

        sqlOutput += "-- 2. EXERCISES\n";

        let insideExercises = false;

        lines.forEach(line => {
            const trimmed = line.trim();

            // Detectar cabecera de unidad (heuristic: key con 'Unit' o 'Simple')
            if (trimmed.includes("': {") && trimmed.includes("source:")) {
                // Unit detections
                const unitMatch = trimmed.match(/'([^']+)'/);
                if (unitMatch) currentUnit = unitMatch[1];
            }
            if (trimmed.includes("Unit ") && trimmed.includes(":") && trimmed.includes("{")) {
                const unitMatch = trimmed.match(/'([^']+)'/);
                if (unitMatch) currentUnit = unitMatch[1];
            }

            // Detectar ejercicios individuales (objetos JS)
            // { tipo: 'Grammar', ejercicio: '...', respuesta: '...', ... }
            if (trimmed.startsWith('{') && trimmed.includes('tipo:') && trimmed.includes('ejercicio:')) {
                // Parsear la línea como "JSON relajado"
                try {
                    // Convertir JS object syntax a JSON (comillas en keys, comillas dobles)
                    // Esto es tricky. Vamos a usar regex para extraer valores.

                    const extract = (key) => {
                        const regex = new RegExp(`${key}\\s*:\\s*(?:'([^']*)'|"([^"]*)")`);
                        const m = trimmed.match(regex);
                        return m ? (m[1] || m[2]) : '';
                    };

                    const tipo = extract('tipo');
                    const prompt = extract('ejercicio');
                    const respuesta = extract('respuesta');
                    const oldMetadata = extract('explicacionDiamante');
                    const oldSuccessId = extract('success_pattern_id');

                    if (prompt && respuesta) {
                        const scopes = getScopesForUnit(currentUnit);
                        // Convertir array scopes a formato Postgres array string: '{"A", "B"}'
                        const pgArr = `'{${scopes.map(s => `"${s}"`).join(',')}}'`;

                        const metaJson = JSON.stringify({
                            legacy_expl: oldMetadata,
                            legacy_id: oldSuccessId
                        });

                        sqlOutput += `INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    ${escapeSql(currentUnit)},
    ${escapeSql(tipo)},
    ${escapeSql(prompt)},
    ${escapeSql(respuesta)},
    ${pgArr},
    ${escapeSql(metaJson)}::jsonb
);\n`;
                    }

                } catch (err) {
                    console.log("Skipping line parse error:", trimmed);
                }
            }
        });

    } catch (e) {
        console.error("Error reading JS file:", e);
    }

    fs.writeFileSync(OUTPUT_FILE, sqlOutput);
    console.log(`✅ SQL Seed generated at: ${OUTPUT_FILE}`);
}

generateSQL();
