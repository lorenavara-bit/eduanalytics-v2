
import { supabase } from '../supabaseClient.js';

/**
 * MOTOR DE EVALUACIÓN "FEEDBACK DIAMANTE"
 * Basado en niveles Bronce, Plata y Oro vinculados a reglas gramaticales.
 */

export const FeedbackDiamante = {
    /**
     * Evalúa una respuesta de vocabulario.
     * Si falla, simplemente muestra la correcta y marca para repaso.
     */
    evaluateVocab: (userInput, correctAnswer, variations = []) => {
        const cleanUser = (userInput || '').trim().toLowerCase();
        const allCorrect = [correctAnswer, ...variations].map(v => v.trim().toLowerCase());

        const isCorrect = allCorrect.includes(cleanUser);

        return {
            isCorrect,
            feedback: isCorrect ? '¡Excelente vocabulario!' : `Incorrecto. Se dice: **${correctAnswer}**`,
            needsReview: !isCorrect,
            level: 'bronze' // El vocabulario no suele escalar a Oro pedagógico
        };
    },

    evaluateFragment: async (userInput, correctAnswer, variations = [], studentId, ruleId, manualExplanation) => {
        const clean = (str) => (str || '')
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const userClean = clean(userInput);
        const allCorrect = [correctAnswer, ...variations].map(v => clean(v));

        if (allCorrect.includes(userClean)) {
            return { isCorrect: true, feedback: '¡Perfecto!', level: 'diamante' };
        }

        // Si falla, buscamos feedback experto
        const feedbackData = await getAdvancedFeedback(studentId, ruleId, manualExplanation);

        return {
            isCorrect: false,
            feedback: feedbackData.message,
            level: 'diamante',
            ruleId: ruleId
        };
    },

    /**
     * Evalúa una respuesta por voz (Oral/Dictado).
     */
    evaluateOral: async (userSpeech, correctAnswer, processData = null) => {
        if (!userSpeech) {
            return { isCorrect: false, feedback: 'No he podido escuchar nada. ¡Vuelve a intentarlo!', level: 'bronze' };
        }

        const normalize = (s) => (s || '').toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const cleanUser = normalize(userSpeech);
        const cleanTarget = normalize(correctAnswer);

        const isCorrect = cleanUser === cleanTarget;

        if (isCorrect) {
            // Analizar fluidez (Latencia oral)
            const slow = processData && processData.oralLatency > 5000;
            let feedback = '¡Excelente pronunciación! Te he entendido perfectamente.';

            if (slow) {
                feedback = '¡Muy bien! Lo has dicho correctamente, aunque has tardado un poquito en empezar. ¡Sigue practicando para ganar fluidez!';
            }

            return { isCorrect: true, feedback, level: 'none' };
        }

        // Si no es correcto, analizar si hay parecido (tolerancia ortográfica de voz)
        return {
            isCorrect: false,
            feedback: `He escuchado "${userSpeech}", pero la respuesta correcta es "${correctAnswer}". Intenta vocalizar un poco más.`,
            level: 'bronze'
        };
    },

    /**
     * Evalúa un escaneo de texto (Detective/Highlighter).
     */
    evaluateScanner: async (userWords = [], correctWords = [], processData = null) => {
        if (!userWords || userWords.length === 0) {
            return { isCorrect: false, feedback: 'No has marcado ninguna palabra en el texto.', level: 'bronze' };
        }

        const clean = (w) => (w || '').toLowerCase().trim();
        const targets = correctWords.map(w => clean(w));
        const selected = userWords.map(w => clean(w));

        const hits = selected.filter(w => targets.includes(w)).length;
        const misses = targets.length - hits;
        const extra = selected.filter(w => !targets.includes(w)).length;

        const isCorrect = hits === targets.length && extra === 0;

        if (isCorrect) {
            // Analizar telemetría de escaneo
            const isSequential = processData && processData.clickPath &&
                processData.clickPath.every((val, i, arr) => i === 0 || val >= arr[i - 1]);

            let feedback = '¡Excelente! Has encontrado todas las palabras correctamente.';
            if (isSequential) {
                feedback = '¡Impresionante! Has seguido un orden de lectura perfecto para encontrar las palabras. Tienes una gran capacidad de concentración.';
            }
            return { isCorrect: true, feedback, level: 'none' };
        }

        let feedback = '';
        if (hits > 0) {
            feedback = `Has encontrado ${hits} de las ${targets.length} palabras. `;
            if (extra > 0) feedback += `Ojo, has marcado ${extra} palabras que no correspondían. `;
            feedback += "¡Sigue buscando!";
        } else {
            feedback = "No has encontrado ninguna de las palabras clave. Lee el texto despacio una vez más.";
        }

        return {
            isCorrect: false,
            feedback,
            level: hits < targets.length / 2 ? 'silver' : 'bronze'
        };
    },

    /**
     * Evalúa una unión de parejas (Bridges/Connector).
     */
    evaluateConnector: async (userConnections, correctPairs, processData = null) => {
        if (!userConnections || !Array.isArray(userConnections)) {
            return { isCorrect: false, feedback: 'No se han establecido conexiones.', level: 'bronze' };
        }

        let correctCount = 0;
        const totalNeeded = correctPairs.length;

        userConnections.forEach(conn => {
            const isMatch = correctPairs.some(p => p.left === conn.from && p.right === conn.to);
            if (isMatch) correctCount++;
        });

        const isCorrect = correctCount === totalNeeded && userConnections.length === totalNeeded;

        if (isCorrect) {
            const hesitating = processData && processData.attempts > totalNeeded + 2;
            let feedback = '¡Excelente! Has unido todas las parejas correctamente.';
            if (hesitating) {
                feedback = '¡Muy bien! Has completado todas las uniones, aunque parece que has tenido que rectificar algunas. ¡La perseverancia es la clave!';
            }
            return { isCorrect: true, feedback, level: 'none' };
        }

        let feedback = '';
        if (userConnections.length < totalNeeded) {
            feedback = `Aún te faltan parejas por unir. ¡Busca las piezas que encajen!`;
        } else {
            feedback = `Algunas conexiones no son correctas (${correctCount}/${totalNeeded} aciertos). Revisa bien la relación entre los conceptos.`;
        }

        return {
            isCorrect: false,
            feedback,
            level: correctCount < totalNeeded / 2 ? 'silver' : 'bronze'
        };
    },

    /**
     * Evalúa una clasificación interactiva (Items -> Buckets).
     */
    evaluateClassification: async (userAssignments, correctAssignments, processData = null) => {
        if (!userAssignments || typeof userAssignments !== 'object') {
            return { isCorrect: false, feedback: 'No se han completado las clasificaciones.', level: 'bronze' };
        }

        const items = Object.keys(correctAssignments);
        let errors = 0;
        let missing = 0;

        items.forEach(item => {
            if (!userAssignments[item]) missing++;
            else if (userAssignments[item] !== correctAssignments[item]) errors++;
        });

        const isCorrect = errors === 0 && missing === 0;

        if (isCorrect) {
            // Check process behavior
            const hesitating = processData && (processData.hesitationCount > 2 || processData.swapCount > 2);
            let feedback = '¡Perfecto! Has clasificado todo correctamente.';

            if (hesitating) {
                feedback = '¡Muy bien! Lo has conseguido, aunque se nota que has dudado en algunos conceptos. ¡Sigue practicando para ganar seguridad!';
            }

            return { isCorrect: true, feedback, level: 'none' };
        }

        // Feedback pedagógico según el tipo de error
        let feedback = '';
        if (missing > 0) {
            feedback = `Te faltan ${missing} elementos por clasificar. ¡No dejes ninguno fuera!`;
        } else {
            feedback = `Hay ${errors} elementos que no están en su lugar correcto. Revisa bien la diferencia entre las categorías.`;
        }

        return {
            isCorrect: false,
            feedback,
            level: errors > 2 ? 'silver' : 'bronze'
        };
    },

    /**
     * Evalúa la sintaxis (Word Order).
     */
    evaluateSyntax: async (userString, correctString, studentId, ruleId, manualExplanation) => {
        // Normalización para evitar fallos por puntuación o mayúsculas
        const clean = (str) => (str || '')
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const isCorrect = clean(userString) === clean(correctString);

        if (isCorrect) {
            return { isCorrect, feedback: '¡Frase perfecta!', level: 'diamante' };
        }

        const feedbackData = await getAdvancedFeedback(studentId, ruleId, manualExplanation);

        return {
            isCorrect: false,
            feedback: feedbackData.message,
            level: 'diamante',
            ruleId: ruleId
        };
    },

    /**
     * Evalúa traducciones con capas LOMLOE y tolerancia inteligente.
     */
    evaluateTranslation: async (userInput, correctAnswer, studentId, ruleIds = [], course = '4º Primaria') => {
        const user = (userInput || '').trim();
        const target = (correctAnswer || '').trim();

        // 1. Coincidencia Perfecta
        if (user === target) {
            return { isCorrect: true, feedback: '¡Perfecto! Has respetado incluso las mayúsculas y la puntuación.', level: 'none' };
        }

        // 2. Coincidencia Normalizada (Tolerancia a mayúsculas/puntuación)
        const normalize = (s) => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").trim();

        if (normalize(user) === normalize(target)) {
            return {
                isCorrect: true,
                feedback: '¡Muy bien! La traducción es correcta, pero recuerda usar mayúsculas y puntos al final de la frase.',
                level: 'silver' // Silver aquí indica "Correcto con observación"
            };
        }

        // 3. Fallo - Buscar Feedback Diamante por reglas
        const feedbackData = await getAdvancedFeedback(studentId, ruleIds, user);

        return {
            isCorrect: false,
            feedback: feedbackData.message,
            level: feedbackData.level,
            ruleId: feedbackData.ruleId
        };
    }
};

/**
 * Función centralizada de Feedback Experto (Sin niveles)
 */
async function getAdvancedFeedback(studentId, ruleId, manualExplanation) {
    // 1. Prioridad Absoluta: El texto manual que tú pongas en el CSV
    if (manualExplanation) {
        return {
            message: manualExplanation,
            level: 'diamante',
            ruleId: ruleId
        };
    }

    // 2. Prioridad Secundaria: La explicación detallada de la DB
    if (ruleId) {
        try {
            const { data: rule } = await supabase
                .from('grammar_rules')
                .select('feedback_gold, name')
                .eq('id', ruleId)
                .single();

            if (rule) {
                // Registrar el fallo silenciosamente para el reforzador dinámico
                updateTracking(studentId, ruleId, false);

                return {
                    message: rule.feedback_gold,
                    level: 'diamante',
                    ruleId: ruleId
                };
            }
        } catch (e) {
            console.warn('Error al buscar regla gramatical:', ruleId);
        }
    }

    // 3. Fallback: Mensaje de ánimo genérico
    return {
        message: '¡Casi! Revisa bien la estructura. Tú puedes con ello.',
        level: 'diamante',
        ruleId: null
    };
}

async function updateTracking(studentId, ruleId, isSuccess) {
    try {
        const { data: existing } = await supabase
            .from('student_tracking')
            .select('*')
            .eq('student_id', studentId)
            .eq('rule_id', ruleId)
            .single();

        if (existing) {
            await supabase
                .from('student_tracking')
                .update({
                    fail_count: isSuccess ? existing.fail_count : existing.fail_count + 1,
                    success_count: isSuccess ? existing.success_count + 1 : existing.success_count,
                    last_interaction: new Date().toISOString()
                })
                .eq('id', existing.id);
        } else {
            await supabase
                .from('student_tracking')
                .insert([{
                    student_id: studentId,
                    rule_id: ruleId,
                    fail_count: isSuccess ? 0 : 1,
                    success_count: isSuccess ? 1 : 0
                }]);
        }
    } catch (e) {
        console.warn('Silent fail updating tracking:', e);
    }
}
