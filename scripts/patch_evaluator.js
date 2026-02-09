import fs from 'fs';
import path from 'path';

// Use absolute path based on known structure or relative to CWD
const filePath = path.resolve('src/services/evaluacion-service.js');
console.log('Patching file:', filePath);

let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'export function evaluarRespuesta(pregunta, respuestaUsuario, respuestaCorrecta, contexto = {}) {';
// Look for the next function to define the end of the block to replace
const endMarker = 'function generarMensajeMotivador() {';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error(`Markers not found! Start: ${startIdx}, End: ${endIdx}`);
    process.exit(1);
}

// Find the start of the JSDoc comment block for generarMensajeMotivador to avoid cutting it off
// We search backwards from endMarker for '/**'
const realEndIdx = content.lastIndexOf('/**', endIdx);

if (realEndIdx === -1 || realEndIdx < startIdx) {
    console.error('Could not safely find the end boundary (JSDoc)');
    process.exit(1);
}

// The new "Linguistic Expert" Logic
// Note: Backticks inside this template literal are escaped with backslash to be preserved in the output file
const newFunction = `export function evaluarRespuesta(pregunta, respuestaUsuario, respuestaCorrecta, contexto = {}) {
    const userAnswer = normalizarTexto(respuestaUsuario);
    const correctAnswer = normalizarTexto(respuestaCorrecta);

    // 1. Detección de Acierto
    const isCorrect = (userAnswer === correctAnswer) ||
        (pregunta.accept_variations && pregunta.accept_variations.some(v => normalizarTexto(v) === userAnswer));

    if (isCorrect) {
        return {
            status: 'success',
            feedback: generarMensajeMotivador(),
            correcta: true,
            puntos: 1
        };
    }

    // --- MOTOR DE LINGÜISTA EXPERTO (DIAMOND 2.0) ---
    const patternId = (pregunta.metadata?.success_pattern_id || pregunta.success_pattern_id || '').toUpperCase();
    let feedback = '';

    // A. DETECCIÓN DE CONTEXTO
    const isComparative = patternId.includes('_ER_') || patternId.includes('_MORE_') || pregunta.pregunta.toLowerCase().includes('than') || (pregunta.tema || '').toLowerCase().includes('comparativ');
    const isSuperlative = patternId.includes('_EST_') || patternId.includes('_MOST_') || (pregunta.tema || '').toLowerCase().includes('superlative');

    // B. LÓGICA DE COMPARATIVOS Y SUPERLATIVOS
    if (isComparative || isSuperlative) {
         // 1. Irregulares Diamante
         if (correctAnswer.toLowerCase().includes('better') || correctAnswer.toLowerCase().includes('best')) {
             feedback = \`💡 ¡Cuidado! Good/Well es irregular. No se dice "gooder", se dice BETTER (comparativo) o BEST (superlativo).\`;
         } else if (correctAnswer.toLowerCase().includes('worse') || correctAnswer.toLowerCase().includes('worst')) {
             feedback = \`💡 Irregular detectado: Bad es especial. La forma correcta es WORSE (peor) o WORST (el peor).\`;
         } else if (correctAnswer.toLowerCase().includes('farther') || correctAnswer.toLowerCase().includes('further')) {
             feedback = \`💡 Para distancia, Far cambia a FARTHER o FURTHER.\`;
         }
         // 2. Reglas Fonéticas y Ortográficas
         else if (patternId.includes('_SHORT') || patternId.includes('ER_SHORT')) {
             feedback = \`💡 Regla de 1 Sílaba: Este es un adjetivo corto. Añadimos -er para comparar o -est para el superlativo.\`;
         } else if (patternId.includes('CVC')) {
             feedback = \`💡 Regla CVC: Este adjetivo sigue la regla Consonante-Vocal-Consonante. Debes doblar la última consonante (ej: thin -> thinner).\`;
         } else if (patternId.includes('_Y') || patternId.includes('SPELL_Y')) {
             feedback = \`💡 Regla de la Y: Como termina en Y, la regla dice que debemos cambiarla por una i y añadir -ier o -iest.\`;
         } else if (patternId.includes('_MORE_') || patternId.includes('LONG_')) {
             feedback = \`💡 Adjetivo Largo: Este adjetivo tiene 2+ sílabas. No añadimos nada al final; usamos MORE o MOST delante.\`;
         }
         
         // 3. Partículas Olvidadas
         if (!feedback) {
             if (isComparative && !userAnswer.includes('than') && correctAnswer.includes('than')) {
                 feedback = \`💡 Recuerda siempre usar THAN después del adjetivo en las comparaciones.\`;
             }
             if (isSuperlative && !userAnswer.includes('the') && correctAnswer.includes('the')) {
                 feedback = \`💡 Recuerda siempre poner THE delante del adjetivo superlativo.\`;
             }
         }
    }

    // C. OTRAS REGLAS GRAMATICALES (PREP, ARTICULOS, ETC)
    if (!feedback) {
        if (patternId.includes('PREP')) {
            feedback = \`💡 Has usado "\${userAnswer}", pero recuerda: para LUGARES DE TRABAJO usamos siempre AT. (Para ciudades o dentro de cajas usamos IN).\`;
        } else if (patternId.includes('ARTICLE') || patternId.includes('_ART_')) {
            const firstLetter = correctAnswer.replace(/an? /i, '').trim().charAt(0);
            const isVowel = 'aeiou'.includes(firstLetter.toLowerCase());
            feedback = \`💡 Has puesto "\${userAnswer}", pero como la palabra empieza por \${isVowel ? 'vocal' : 'consonante'}, usamos \${isVowel ? 'AN' : 'A'} para que no choquen los sonidos.\`;
        } else if (patternId.includes('ORDER')) {
             feedback = \`💡 ¡Casi! En inglés, el orden suele ser: Persona + Acción + Lugar/Tiempo. Revisa dónde has puesto el lugar.\`;
        } else if (patternId.includes('3RD_PERSON') || patternId.includes('VERB_S') || patternId.includes('HAVE_HAS')) {
            feedback = \`💡 ¡Ojo! Con He, She o It, el verbo siempre necesita una -S al final. Has escrito "\${userAnswer}" y debería ser "\${correctAnswer}".\`;
        } else if (patternId.includes('DO_DOES')) {
            feedback = \`💡 ¿Do o Does? Recuerda: She/He/It = DOES. I/You/We/They = DO.\`;
        }
    }

    // D. TEXTO EXPLÍCITO (DATA-DRIVEN)
    if (!feedback) {
        feedback = pregunta.explicacionDiamante || pregunta.explicacion || pregunta.explanation;
    }

    // E. FALLBACK TUTORÍA (NO "CORRECT ANSWER")
    if (!feedback) {
        console.warn(\`🚨 MISSING DIAMOND FEEDBACK: "\${pregunta.pregunta}" (ID: \${patternId})\`);
        
        feedback = \`¡Uy! No he encontrado el truco para esta, pero fíjate bien: la respuesta es "\${correctAnswer}". ¡Inténtalo otra vez!\`;
    }

    return {
        status: 'error',
        feedback: feedback, 
        correcta: false,
        puntos: 0
    };
}`;

const finalContent = content.substring(0, startIdx) + newFunction + '\n\n' + content.substring(realEndIdx);

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('✅ Update Successful!');
