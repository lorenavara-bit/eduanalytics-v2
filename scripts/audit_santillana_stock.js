
// Scripts to audit Santillana content stock
import { SANTILLANA_INGLES_4 } from '../src/services/khan/santillana-4-primaria-INGLES.js';

// Config
const TARGET_TOTAL = 50;
const TARGET_GRAMMAR = 20;
const TARGET_WORD_ORDER = 15;
const TARGET_VOCAB = 15;

console.log("=========================================");
console.log("📊 SANTILLANA CONTENT AUDIT (TARGET 50)");
console.log("=========================================\n");

let report = [];

// 1. Audit Stock
Object.keys(SANTILLANA_INGLES_4['Inglés']).forEach(unitKey => {
    const unit = SANTILLANA_INGLES_4['Inglés'][unitKey];
    const exercises = unit.ejercicios || [];

    const buckets = {
        grammar: [],
        wordOrder: [],
        vocab: []
    };

    exercises.forEach(ex => {
        const type = (ex.tipo || '').toLowerCase();
        const text = (ex.ejercicio || '').toLowerCase();
        if (type.includes('order') || text.includes('order') || text.includes('orden')) {
            buckets.wordOrder.push(ex);
        } else if (type.includes('vocab') || type.includes('tradu') || type.includes('def') || type.includes('match') || type.includes('emoji')) {
            buckets.vocab.push(ex);
        } else {
            buckets.grammar.push(ex);
        }
    });

    const grammarCount = buckets.grammar.length;
    const orderCount = buckets.wordOrder.length;
    const vocabCount = buckets.vocab.length;
    const totalCount = exercises.length;

    const grammarStatus = grammarCount >= TARGET_GRAMMAR ? "✅" : `❌ (Missing ${TARGET_GRAMMAR - grammarCount})`;
    const orderStatus = orderCount >= TARGET_WORD_ORDER ? "✅" : `❌ (Missing ${TARGET_WORD_ORDER - orderCount})`;
    const vocabStatus = vocabCount >= TARGET_VOCAB ? "✅" : `❌ (Missing ${TARGET_VOCAB - vocabCount})`;
    const totalStatus = totalCount >= TARGET_TOTAL ? "✅" : `⚠️ (Total ${totalCount}/50 - Will Repet)`;

    console.log(`Unit: ${unitKey}`);
    console.log(`  - Grammar:    ${grammarCount.toString().padEnd(3)} ${grammarStatus}`);
    console.log(`  - Word Order: ${orderCount.toString().padEnd(3)} ${orderStatus}`);
    console.log(`  - Vocab:      ${vocabCount.toString().padEnd(3)} ${vocabStatus}`);
    console.log(`  - TOTAL:      ${totalCount.toString().padEnd(3)} ${totalStatus}\n`);

    report.push({
        unit: unitKey,
        buckets,
        total: totalCount
    });
});

// 2. Dry Run Simulation (Unit 3)
console.log("=========================================");
console.log("🎲 DRY RUN SIMULATION: Unit 3 (Target 50)");
console.log("=========================================");

const unit3Data = report.find(r => r.unit === 'Unit 3: Jobs & Workplaces');

if (!unit3Data) {
    console.error("Critical: Unit 3 not found!");
} else {
    // Simulate Logic
    const configNumQuestions = 50;

    // Shuffle helper
    const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

    let buckets = {
        grammar: shuffle([...unit3Data.buckets.grammar]),
        wordOrder: shuffle([...unit3Data.buckets.wordOrder]),
        vocab: shuffle([...unit3Data.buckets.vocab])
    };

    let selection = [];

    // Prioridad (Mock 0 injections for clean test)
    // ...

    // Fase 2: Relleno Estándar
    // Targets for 50
    const targetGrammar = 20; // 40%
    const targetOrder = 15;   // 30%
    const targetVocab = 15;   // 30%

    // Take Initial
    const takenGrammar = buckets.grammar.slice(0, targetGrammar);
    const takenOrder = buckets.wordOrder.slice(0, targetOrder);
    const takenVocab = buckets.vocab.slice(0, targetVocab);

    selection.push(...takenGrammar);
    selection.push(...takenOrder);
    selection.push(...takenVocab);

    console.log(`Initial Fill: ${selection.length} questions`);
    console.log(` - Grammar: ${takenGrammar.length}/${targetGrammar}`);
    console.log(` - Order:   ${takenOrder.length}/${targetOrder}`);
    console.log(` - Vocab:   ${takenVocab.length}/${targetVocab}`);

    // Fase 3: Backfill (Use spares)
    let remainingNeeded = configNumQuestions - selection.length;

    if (remainingNeeded > 0) {
        console.log(`Backfill Needed: ${remainingNeeded}`);
        const spares = [
            ...buckets.grammar.slice(takenGrammar.length),
            ...buckets.wordOrder.slice(takenOrder.length),
            ...buckets.vocab.slice(takenVocab.length)
        ];

        const shuffledSpares = shuffle(spares);
        const backfill = shuffledSpares.slice(0, remainingNeeded);
        selection.push(...backfill);
        console.log(` - Backfilled: ${backfill.length} unique spares`);
    }

    // Fase 4: Force Fill (Duplicates)
    remainingNeeded = configNumQuestions - selection.length;
    if (remainingNeeded > 0) {
        console.log(`Force Fill Needed: ${remainingNeeded}`);
        // Flatten all original for duplicate source
        const allExercises = [
            ...unit3Data.buckets.grammar,
            ...unit3Data.buckets.wordOrder,
            ...unit3Data.buckets.vocab
        ];

        const forceFillSource = shuffle(allExercises);
        for (let i = 0; i < remainingNeeded; i++) {
            // Mock adding duplicate (adding string id for trace)
            selection.push({
                ...forceFillSource[i % forceFillSource.length],
                _isDuplicate: true
            });
        }
        console.log(` - Force Filled: ${remainingNeeded} duplicates`);
    }

    // Validate Distribution of Final Selection
    let finalGrammar = 0;
    let finalOrder = 0;
    let finalVocab = 0;

    selection.forEach(ex => {
        const type = (ex.tipo || '').toLowerCase();
        const text = (ex.ejercicio || '').toLowerCase();
        if (type.includes('order') || text.includes('order') || text.includes('orden')) finalOrder++;
        else if (type.includes('vocab') || type.includes('tradu') || type.includes('def') || type.includes('match') || type.includes('emoji')) finalVocab++;
        else finalGrammar++;
    });

    console.log("\n📊 FINAL DISTRIBUTION CHECK:");
    console.log(`Total: ${selection.length}`);
    console.log(`Grammar:    ${finalGrammar} (Target 20+)`);
    console.log(`Word Order: ${finalOrder} (Target 15+)`);
    console.log(`Vocab:      ${finalVocab} (Target 15+)`);

    console.log("\nSAMPLE IDs (First 5):");
    selection.slice(0, 5).forEach(ex => console.log(` - ${ex.success_pattern_id || ex.ejercicio.substring(0, 20)}...`));
}
