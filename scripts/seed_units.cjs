const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function seedUnits() {
    console.log('🌱 Sembrando ejercicios Unit 3 y Unit 5...');

    const exercises = [
        // UNIT 3: JOBS
        {
            topic: 'Unit 3: Jobs & Workplaces',
            subject: 'Inglés',
            grade_level: '4º Primaria',
            question_type: 'multiple_choice',
            question_text: 'Where does a doctor work?',
            correct_answer: 'In a hospital',
            options: ['In a hospital', 'In a school', 'In a fire station'],
            difficulty: 'media',
            source: 'SANTILLANA_SEED',
            metadata: { unit: 'U3', tipo: 'Vocabulary' }
        },
        {
            topic: 'Unit 3: Jobs & Workplaces',
            subject: 'Inglés',
            grade_level: '4º Primaria',
            question_type: 'word_order',
            question_text: 'a / firefighter / is / He',
            correct_answer: 'He is a firefighter',
            difficulty: 'media',
            source: 'SANTILLANA_SEED',
            metadata: { unit: 'U3', tipo: 'Grammar' }
        },
        // UNIT 5: COMPARATIVES
        {
            topic: 'Unit 5: Comparatives',
            subject: 'Inglés',
            grade_level: '4º Primaria',
            question_type: 'fill_blanks',
            question_text: 'An elephant is ___ (big) than a mouse.',
            correct_answer: 'bigger',
            difficulty: 'media',
            source: 'SANTILLANA_SEED',
            metadata: { unit: 'U5', tipo: 'Grammar', explicacionDiamante: 'Para adjetivos cortos C-V-C, dobla la última letra: big -> bigger.' }
        },
        {
            topic: 'Unit 5: Comparatives',
            subject: 'Inglés',
            grade_level: '4º Primaria',
            question_type: 'fill_blanks',
            question_text: 'A car is ___ (fast) than a bike.',
            correct_answer: 'faster',
            difficulty: 'media',
            source: 'SANTILLANA_SEED',
            metadata: { unit: 'U5', tipo: 'Grammar' }
        }
    ];

    const { error } = await supabase.from('question_bank_local').insert(exercises);
    if (error) console.error('❌ Error seeding:', error.message);
    else console.log('✅ Ejercicios de Unit 3 y 5 integrados.');
}

seedUnits();
