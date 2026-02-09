const fs = require('fs');
const path = require('path');

// RUTAS DE ARCHIVOS
const JSON_PATH = path.join(__dirname, '../src/data/english-error-taxonomy-4primaria.json');
const JS_PATH = path.join(__dirname, '../src/services/khan/santillana-4-primaria-INGLES.js');
const OUTPUT_FILE = path.join(__dirname, '../.agent/supabase_data_seed.sql');

// 1. MAPPING DE SCOPES
function inferScopeFromTopic(topic) {
    const t = topic.toLowerCase();
    if (t.includes('comparative') || t.includes('superlative')) return 'GRAMMAR_COMPARATIVES';
    if (t.includes('present continuous')) return 'GRAMMAR_PRESENT_CONTINUOUS';
    if (t.includes('past simple') || t.includes('was/were')) return 'GRAMMAR_PAST_SIMPLE';
    if (t.includes('present simple') || t.includes('routines') || t.includes('do/does')) return 'GRAMMAR_PRESENT_SIMPLE';
    if (t.includes('have') || t.includes('got')) return 'GRAMMAR_POSSESSION';
    if (t.includes('modal') || t.includes('should') || t.includes('can')) return 'GRAMMAR_MODALS';
    if (t.includes('article') || t.includes('a/an')) return 'GRAMMAR_ARTICLES';
    if (t.includes('preposition')) return 'GRAMMAR_PREPOSITIONS';
    if (t.includes('connector')) return 'GRAMMAR_CONNECTORS';
    if (t.includes('imperative')) return 'GRAMMAR_IMPERATIVES';
    return 'GRAMMAR_GENERAL';
}

function getScopesForUnit(unitName) {
    const u = unitName.toLowerCase();
    const scopes = ['GLOBAL_SPELLING', 'GLOBAL_SYNTAX'];

    if (u.includes('unit 1') || u.includes('present simple')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE', 'GRAMMAR_ARTICLES');
    }
    if (u.includes('unit 2') || u.includes('routines')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE', 'GRAMMAR_PREPOSITIONS');
    }
    if (u.includes('unit 3') || u.includes('jobs')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE', 'GRAMMAR_ARTICLES', 'GRAMMAR_PREPOSITIONS');
    }
    if (u.includes('unit 4') || u.includes('health')) {
        scopes.push('GRAMMAR_POSSESSION', 'GRAMMAR_MODALS');
    }
    if (u.includes('unit 5') || u.includes('comparatives')) {
        scopes.push('GRAMMAR_COMPARATIVES');
    }
    if (u.includes('unit 6') || u.includes('past')) {
        scopes.push('GRAMMAR_PAST_SIMPLE');
    }
    if (u.includes('unit 7') || u.includes('mix') || u.includes('boss')) {
        scopes.push('GRAMMAR_PRESENT_SIMPLE', 'GRAMMAR_PRESENT_CONTINUOUS', 'GRAMMAR_PAST_SIMPLE', 'GRAMMAR_COMPARATIVES', 'GRAMMAR_POSSESSION', 'GRAMMAR_MODALS', 'GRAMMAR_ARTICLES', 'GRAMMAR_PREPOSITIONS');
    }
    return [...new Set(scopes)];
}

// FIX: Only escape single quotes for SQL. Do not double escape backslashes for JSON.
function escapeSql(str) {
    if (!str && str !== '') return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

function generateSQL() {
    let sqlOutput = "-- AUTOMATICALLY GENERATED DATA SEED\n\n";

    // PART A: GRAMMAR RULES
    try {
        const rulesData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
        sqlOutput += "-- 1. GRAMMAR RULES\n";
        rulesData.forEach(rule => {
            const scope = inferScopeFromTopic(rule.tema);
            const levelsJson = JSON.stringify(rule.niveles);
            // Replace escaped backslashes in JSON string if necessary, but usually JSON.stringify is enough.
            // However, we want strict JSON in the DB.

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

    // PART B: EXERCISES
    try {
        const jsContent = fs.readFileSync(JS_PATH, 'utf8');
        const lines = jsContent.split('\n');
        let currentUnit = 'Unknown Unit';

        sqlOutput += "-- 2. EXERCISES\n";

        lines.forEach(line => {
            const trimmed = line.trim();
            const unitHeaderMatch = trimmed.match(/^'([^']+)'\s*:\s*\{/);
            if (unitHeaderMatch) {
                currentUnit = unitHeaderMatch[1];
            }

            if (trimmed.startsWith('{') && trimmed.includes('tipo:') && trimmed.includes('ejercicio:')) {
                try {
                    // FIX: Improved Regex to handle escaped quotes inside the value
                    // Matches 'value' OR "value"
                    const extract = (key) => {
                        // Look for key: '...' or key: "..."
                        // (?:[^'\\]|\\.)* matches any character that is not ' or \, OR an escaped char
                        const regex = new RegExp(`${key}\\s*:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`);
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
                        const pgArr = `'{${scopes.map(s => `"${s}"`).join(',')}}'`;

                        // We need to unescape the extracted string because we will re-stringify it.
                        // Wait, no. 'I don\'t' extracted is 'I don\'t'.
                        // We want to store 'I don't' in the JSON object.
                        // So we should replace \\' with ' logic?
                        // Actually, let's keep it simple. If we pass the string WITH backslashes to JSON.stringify,
                        // JSON.stringify will escape the backslash: "I don\\'t".
                        // This preserves the original "source code" look, which is okay.
                        // OR we try to clean it.

                        // Let's implement a simple unescape for single quotes (common case)
                        const cleanStr = (s) => s ? s.replace(/\\'/g, "'").replace(/\\"/g, '"') : '';

                        const metaJson = JSON.stringify({
                            legacy_expl: cleanStr(oldMetadata),
                            legacy_id: cleanStr(oldSuccessId)
                        });

                        sqlOutput += `INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    ${escapeSql(currentUnit)},
    ${escapeSql(cleanStr(tipo))},
    ${escapeSql(cleanStr(prompt))},
    ${escapeSql(cleanStr(respuesta))},
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
