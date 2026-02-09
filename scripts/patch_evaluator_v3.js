import fs from 'fs';
import path from 'path';

const fp = path.resolve('src/services/evaluacion-service.js');
console.log('Patching:', fp);
let c = fs.readFileSync(fp, 'utf8');

const sM = 'export function evaluarRespuesta(pregunta, respuestaUsuario, respuestaCorrecta, contexto = {}) {';
const eM = 'function generarMensajeMotivador() {';
const sI = c.indexOf(sM);
const eI = c.indexOf(eM);

if (sI === -1 || eI === -1) { console.error('No match'); process.exit(1); }
const rE = c.lastIndexOf('/**', eI);

const nF = \`export function evaluarRespuesta(pregunta, respuestaUsuario, respuestaCorrecta, contexto = {}) {
    const userAnswer = normalizarTexto(respuestaUsuario);
    const correctAnswer = normalizarTexto(respuestaCorrecta);
    const uLower = userAnswer.toLowerCase();
    const cLower = correctAnswer.toLowerCase();

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

    // --- DIAMOND EXPERT V3 ---
    const pId = (pregunta.metadata?.success_pattern_id || pregunta.success_pattern_id || '').toUpperCase();
    let feedback = '';
    const qText = (pregunta.pregunta || '').toLowerCase();

    const isComp = pId.includes('_ER_') || pId.includes('_MORE_') || qText.includes('than') || (pregunta.tema || '').toLowerCase().includes('comparativ');
    const isSup = pId.includes('_EST_') || pId.includes('_MOST_') || (pregunta.tema || '').toLowerCase().includes('superlative');

    if (isComp || isSup) {
        if (cLower.includes('better') || cLower.includes('best'))
            feedback = \\\`💡 Good / Well: Es un adjetivo irregular. La forma correcta es BETTER (comparativo) o BEST (superlativo).\\\`;
        else if (cLower.includes('worse') || cLower.includes('worst'))
             feedback = \\\`💡 Bad / Badly: Irregular detectado: usa WORSE o WORST.\\\`;
        else if (cLower.includes('farther') || cLower.includes('further'))
             feedback = \\\`💡 Far: Para distancia, la forma correcta es FARTHER o FURTHER.\\\`;
        else if ((cLower.includes('more') || cLower.includes('most')) && (pId.includes('MUCH') || qText.includes('much')))
             feedback = \\\`💡 Much / Little: Usa MORE/MOST para much y LESS/LEAST para little.\\\`;
        else if ((cLower.includes('less') || cLower.includes('least')) && (pId.includes('LITTLE') || qText.includes('little')))
             feedback = \\\`💡 Much / Little: Usa MORE/MOST para much y LESS/LEAST para little.\\\`;
        
        else if (pId.includes('CVC'))
             feedback = \\\`💡 Este adjetivo sigue la regla CVC. Debes doblar la última consonante antes de añadir la terminación (ej: thin -> thinner).\\\`;
        else if (pId.includes('_Y') || cLower.endsWith('ier') || cLower.endsWith('iest'))
             feedback = \\\`💡 Al terminar en Y, la regla exige cambiarla por una i y añadir -ier o -iest.\\\`;
        else if (pId.includes('_E_') || ['nice', 'large', 'late', 'wide', 'fine', 'close', 'safe'].some(a => qText.includes(a)))
             feedback = \\\`💡 Como termina en E, solo añadimos -r o -st (ej: nice -> nicer).\\\`;
        else if (pId.includes('_MORE_') || pId.includes('LONG_') || cLower.includes('more ') || cLower.includes('most '))
             feedback = \\\`💡 Este es un adjetivo largo. No añadimos nada al final; usamos MORE o MOST delante.\\\`;
        else if (pId.includes('SHORT') || uLower.includes('more ') || uLower.includes('most '))
             feedback = \\\`💡 Este es un adjetivo corto (1 sílaba). Añadimos -er para comparar o -est para el superlativo.\\\`;
        
        if (!feedback) {
             if (isComp && !uLower.includes('than') && cLower.includes('than'))
                 feedback = \\\`💡 Recuerda siempre usar THAN en comparativos y el artículo THE en superlativos.\\\`;
             if (isSup && !uLower.includes('the') && cLower.includes('the'))
                 feedback = \\\`💡 Recuerda siempre poner THE delante del adjetivo superlativo.\\\`; 
        }
    }

    if (!feedback) {
        if (pId.includes('ARTICLE') || pId.includes('_ART_')) {
             feedback = \\\`💡 Has puesto "\${userAnswer}". Recuerda: A va ante consonante y AN ante sonido de vocal para que no choquen al hablar.\\\`;
        } else if (pId.includes('PREP')) {
             feedback = \\\`💡 Has puesto "\${userAnswer}", pero la regla correcta es "\${correctAnswer}" porque places of work llevan AT, ciudades/interiores IN.\\\`;
        } else if (pId.includes('3RD_PERSON') || pId.includes('VERB_S')) {
             feedback = \\\`💡 Has puesto "\${userAnswer}", pero la regla correcta es "\${correctAnswer}" porque con He/She/It añadimos -S al verbo.\\\`;
        }
    }

    if (!feedback) feedback = pregunta.explicacionDiamante || pregunta.explicacion || pregunta.explanation;

    if (!feedback) {
        feedback = \\\`¡Uy! Has puesto "\${userAnswer}", pero la regla correcta es "\${correctAnswer}". ¡Fíjate bien!\\\`;
        console.warn('MISSING FEEDBACK', qText);
    }

    return { status: 'error', feedback: feedback, correcta: false, puntos: 0 };
}\`;

const newC = c.substring(0, sI) + nF + '\\\\n\\\\n' + c.substring(rE);
fs.writeFileSync(fp, newC, 'utf8');
console.log('Patch V3 Done');
