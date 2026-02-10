import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import Papa from 'papaparse';

// Cargar variables de entorno
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // O SERVICE_ROLE_KEY si tienes problemas de RLS

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidos en el .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CSV_FILE = './SANTILLANA_UNIT1_GOFAR4.csv';

async function ingest() {
    console.log('--- Iniciando Ingesta Directa a Supabase ---');

    if (!fs.existsSync(CSV_FILE)) {
        console.error(`Error: No se encuentra el archivo ${CSV_FILE}`);
        return;
    }

    const csvContent = fs.readFileSync(CSV_FILE, 'utf8');

    Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            const data = results.data;
            console.log(`Leídas ${data.length} filas del CSV.`);

            const formattedData = data.map(row => {
                let metadata = {};
                try {
                    if (row.metadata_json) {
                        metadata = JSON.parse(row.metadata_json);
                    }
                } catch (e) {
                    console.warn('Error parseando metadata_json para:', row.question_text);
                }

                return {
                    topic: row.topic || 'Sin tema',
                    grade_level: row.grade_level || '4º Primaria',
                    subject: row.subject || 'Inglés',
                    question_type: row.question_type || 'short_answer',
                    question_text: row.question_text || '',
                    correct_answer: row.correct_answer || '',
                    difficulty: row.difficulty || 'media',
                    source: row.source || 'SANTILLANA_DIRECT',
                    options: row.options ? row.options.split('|').map(s => s.trim()) : [],
                    metadata: metadata
                };
            });

            console.log('Enviando datos a Supabase...');

            const { error, count } = await supabase
                .from('question_bank_local')
                .insert(formattedData);

            if (error) {
                console.error('Error al insertar en Supabase:', error.message);
                console.error('Detalles:', error.details);
            } else {
                console.log('¡Éxito! Datos insertados correctamente.');
            }
        },
        error: (error) => {
            console.error('Error al procesar CSV:', error.message);
        }
    });
}

ingest();
