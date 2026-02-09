// scripts/actualizar-licencia-beta.cjs
// Actualiza la columna licencia_final y notas para ejercicios con licencia PROPRIETARY
// Marca los ejercicios como solo válidos para la versión beta

const fs = require('fs');
const csv = require('csv-parser');

const INPUT_CSV = 'revision_pendiente.csv';
const OUTPUT_CSV = 'revision_pendiente_actualizado.csv';

const rows = [];

fs.createReadStream(INPUT_CSV)
    .pipe(csv({ separator: ',', mapHeaders: ({ header }) => header.trim() }))
    .on('data', (row) => {
        // Si la licencia es PROPRIETARY, actualizamos
        if (row.licencia_auto && row.licencia_auto.toUpperCase() === 'PROPRIETARY') {
            // Copiamos el mismo valor a licencia_final (o lo cambiamos a BETA_ONLY)
            row.licencia_final = 'BETA_ONLY'; // marca explícita
            // Añadimos una nota para que quede claro
            const existingNote = row.notas ? row.notas.trim() : '';
            const note = 'Solo beta – licencia PROPRIETARY';
            row.notas = existingNote ? `${existingNote}; ${note}` : note;
        }
        // También nos aseguramos de que la columna verificado sea true (para indicar revisado)
        row.verificado = 'true';
        rows.push(row);
    })
    .on('end', () => {
        if (rows.length === 0) {
            console.error('⚠️ No se encontraron filas en el CSV');
            return;
        }
        // Construir encabezado a partir de la primera fila (preservar orden original)
        const header = Object.keys(rows[0]);
        const csvLines = [];
        csvLines.push(header.join(','));
        rows.forEach((r) => {
            const line = header.map((h) => {
                // Escapar comillas y comas si es necesario
                const val = r[h] !== undefined ? String(r[h]) : '';
                if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                    // Escapar comillas dobles
                    const escaped = val.replace(/"/g, '""');
                    return `"${escaped}"`;
                }
                return val;
            }).join(',');
            csvLines.push(line);
        });
        const finalContent = csvLines.join('\n');
        fs.writeFileSync(OUTPUT_CSV, finalContent, 'utf8');
        console.log(`✅ CSV actualizado creado: ${OUTPUT_CSV}`);
        console.log(`   Total filas procesadas: ${rows.length}`);
        console.log('   Licencia PROPRIETARY → BETA_ONLY y notas añadidas');
    });
