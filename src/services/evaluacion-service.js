/**
 * SERVICIO DE EVALUACIÓN "FEEDBACK DIAMANTE"
 * 
 * Este servicio centraliza el análisis de respuestas utilizando los evaluadores
 * especializados y el sistema de tracking de niveles (Bronce, Plata, Oro).
 */
import { FeedbackDiamante } from './FeedbackDiamante';
import { supabase } from '../supabaseClient';

export async function analizarFichaCompleta(preguntas, respuestas, studentId = null) {
    const resultados = {
        totalPreguntas: preguntas.length,
        correctas: 0,
        parciales: 0,
        incorrectas: 0,
        puntuacion: 0,
        porcentaje: 0,
        analisisDetallado: [],
        mensajeEstudiante: "",
        mensajePadres: "",
        fortalezas: [],
        debilidades: [],
        recomendacionesGenerales: [],
        erroresGraves: [],
        erroresPorPatron: {}, // Mantenido vacío para compatibilidad
        porDificultad: {
            facil: { total: 0, correctas: 0, porcentaje: 0 },
            medio: { total: 0, correctas: 0, porcentaje: 0 },
            dificil: { total: 0, correctas: 0, porcentaje: 0 }
        }
    };

    // Procesar cada pregunta
    const analisisPromises = preguntas.map(async (p) => {
        const rawResp = respuestas[p.id];
        const respUsuario = typeof rawResp === 'string' ? rawResp.trim() : rawResp;
        const processMetadata = respuestas[`${p.id}_process`] || null;
        const asignatura = (p.subject || '').toLowerCase();
        const isEnglish = asignatura.includes('ingl') || asignatura.includes('english') || asignatura.includes('esl');

        let isCorrect = false;
        let feedback = "";
        let level = 'none';
        let ruleId = null;

        if (isEnglish) {
            // --- EVALUACIÓN SIMPLIFICADA "SANTILLANA GOLD" ---
            const type = p.exercise_type || p.type || 'fill_blanks';
            const correctAnswer = p.correct_answer || p.respuesta || '';
            const variations = p.accepted_variations || p.accept_variations || [];

            // Unificamos rule_id (priorizando el nuevo estándar)
            const targetRuleId = p.metadata?.rule_id || p.metadata?.success_pattern_id || (Array.isArray(p.linked_rules) ? p.linked_rules[0] : null);
            const manualExp = p.metadata?.explicacionDiamante || p.explanation;

            let result;
            if (p.type === 'classification' || p.tipo_detalle === 'classification') {
                let correctAnswer = p.correct_answer || p.respuesta;
                if (typeof correctAnswer === 'string' && correctAnswer.startsWith('{')) {
                    try { correctAnswer = JSON.parse(correctAnswer); } catch (e) { console.error("Error parsing classification target:", e); }
                }
                result = await FeedbackDiamante.evaluateClassification(respUsuario, correctAnswer, processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
            } else if (p.type === 'voice' || p.tipo_detalle === 'voice') {
                result = await FeedbackDiamante.evaluateOral(respUsuario, p.correct_answer || p.respuesta, processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
            } else if (p.type === 'scanner' || p.tipo_detalle === 'scanner') {
                result = await FeedbackDiamante.evaluateScanner(respUsuario, p.correct_answer || p.respuesta || [], processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
            } else if (p.type === 'connector' || p.tipo_detalle === 'connector') {
                result = await FeedbackDiamante.evaluateConnector(respUsuario, p.pairs || [], processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
            } else {
                switch (type) {
                    case 'vocabulary':
                        result = FeedbackDiamante.evaluateVocab(respUsuario, correctAnswer, variations);
                        break;
                    case 'word_order':
                        result = await FeedbackDiamante.evaluateSyntax(respUsuario, correctAnswer, studentId, targetRuleId, manualExp);
                        break;
                    case 'fill_blanks':
                    case 'text_input':
                        result = await FeedbackDiamante.evaluateFragment(respUsuario, correctAnswer, variations, studentId, targetRuleId, manualExp);
                        break;
                    case 'translation':
                        result = await FeedbackDiamante.evaluateTranslation(respUsuario, correctAnswer, studentId, [targetRuleId]);
                        break;
                    default:
                        result = await FeedbackDiamante.evaluateFragment(respUsuario, correctAnswer, variations, studentId, targetRuleId, manualExp);
                }
                isCorrect = result.isCorrect;
                feedback = result.feedback;
                ruleId = result.ruleId || targetRuleId;
            }
            level = result.level || 'diamante';
        } else {
            // --- EVALUACIÓN BÁSICA / INTERACTIVA (OTRAS ASIGNATURAS) ---
            if (p.type === 'classification' || p.tipo_detalle === 'classification') {
                let correctAnswer = p.correct_answer || p.respuesta;
                if (typeof correctAnswer === 'string' && correctAnswer.startsWith('{')) {
                    try { correctAnswer = JSON.parse(correctAnswer); } catch (e) { console.error("Error parsing classification target:", e); }
                }
                const result = await FeedbackDiamante.evaluateClassification(respUsuario, correctAnswer, processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
                level = result.level;
            } else if (p.type === 'voice' || p.tipo_detalle === 'voice') {

                const result = await FeedbackDiamante.evaluateOral(respUsuario, p.correct_answer || p.respuesta, processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
                level = result.level;
            } else if (p.type === 'scanner' || p.tipo_detalle === 'scanner') {
                const result = await FeedbackDiamante.evaluateScanner(respUsuario, p.correct_answer || p.respuesta || [], processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
                level = result.level;
            } else if (p.type === 'connector' || p.tipo_detalle === 'connector') {
                const result = await FeedbackDiamante.evaluateConnector(respUsuario, p.pairs || [], processMetadata);
                isCorrect = result.isCorrect;
                feedback = result.feedback;
                level = result.level;
            } else {
                const rawResp = respuestas[p.id];
                const cleanUser = typeof rawResp === 'string' ? rawResp.toLowerCase().replace(/[^\w\sñáéíóúü]/g, '').trim() : '';
                let correctasPosibles = [];
                if (typeof p.respuesta === 'string') correctasPosibles.push(p.respuesta);
                if (typeof p.correcta === 'string') correctasPosibles.push(p.correcta);
                if (typeof p.correct_answer === 'string') correctasPosibles.push(p.correct_answer);

                const cleanCorrects = correctasPosibles.map(c =>
                    c.toLowerCase().replace(/[^\w\sñáéíóúü]/g, '').trim()
                );

                isCorrect = cleanCorrects.some(c => c === cleanUser);
                if (!isCorrect && cleanUser.length > 0) {
                    isCorrect = cleanCorrects.some(c => c.replace(/\s/g, '') === cleanUser.replace(/\s/g, ''));
                }
                feedback = isCorrect ? "¡Correcto!" : "Respuesta incorrecta.";
            }
        }

        return {
            id: p.id,
            pregunta: p.pregunta || p.text,
            respuestaUsuario: respUsuario,
            respuestaCorrecta: p.correct_answer || p.respuesta,
            correcta: isCorrect,
            puntos: isCorrect ? 1 : 0,
            feedback: feedback,
            level: level,
            ruleId: ruleId,
            dificultad: p.dificultad || 'medio',
            metadata: processMetadata // Capturamos la telemetría VIP
        };
    });

    const results = await Promise.all(analisisPromises);

    // --- 4. AGREGACIÓN DE RESULTADOS Y TELEMETRÍA ---
    resultados.metricasAvanzadas = {
        totalInseguridad: 0, // Swaps, backspaces, retries
        latenciaMediaVoz: 0,
        vocesDetectadas: 0,
        puntosConcentracion: 0, // Basado en clickPath
        totalDudas: 0
    };

    results.forEach(r => {
        if (r.correcta) {
            resultados.correctas++;
            resultados.puntuacion += r.puntos;
            resultados.porDificultad[r.dificultad] = resultados.porDificultad[r.dificultad] || { total: 0, correctas: 0, porcentaje: 0 };
            resultados.porDificultad[r.dificultad].correctas++;
        } else {
            resultados.incorrectas++;
        }

        // Procesar Telemetría VIP
        if (r.metadata) {
            const m = r.metadata;
            resultados.metricasAvanzadas.totalInseguridad += (m.swapCount || 0) + (m.backspaces || 0) + (m.attempts || 0);
            resultados.metricasAvanzadas.totalDudas += (m.hesitationCount || 0);
            if (m.wasOral) {
                resultados.metricasAvanzadas.latenciaMediaVoz += (m.oralLatency || 0);
                resultados.metricasAvanzadas.vocesDetectadas++;
            }
            if (m.clickPath) {
                // Cálculo simple de linealidad (concentración)
                const isLinear = m.clickPath.every((v, i, a) => i === 0 || v >= a[i - 1]);
                if (isLinear) resultados.metricasAvanzadas.puntosConcentracion += 10;
            }
        }

        resultados.porDificultad[r.dificultad] = resultados.porDificultad[r.dificultad] || { total: 0, correctas: 0, porcentaje: 0 };
        resultados.porDificultad[r.dificultad].total++;
    });

    if (resultados.metricasAvanzadas.vocesDetectadas > 0) {
        resultados.metricasAvanzadas.latenciaMediaVoz /= resultados.metricasAvanzadas.vocesDetectadas;
    }

    resultados.porcentaje = Math.round((resultados.puntuacion / preguntas.length) * 100);
    resultados.analisisDetallado = results;

    // --- 5. GENERAR PERFIL COGNITIVO VIP ---
    const { totalInseguridad, totalDudas, latenciaMediaVoz } = resultados.metricasAvanzadas;

    // Perfil por defecto
    resultados.perfilCognitivo = {
        nombre: "Explorador Activo",
        descripcion: "El alumno muestra una actitud positiva y resuelve los retos con fluidez.",
        consejoPadres: "¡Buen trabajo! Seguid fomentando la lectura diaria para mantener esta agilidad.",
        tags: ["Fluidez", "Confianza"]
    };

    if (totalInseguridad > 5 || totalDudas > 4) {
        resultados.perfilCognitivo = {
            nombre: "Reflexivo / Inseguro",
            descripcion: "Se han detectado múltiples rectificaciones y pausas antes de responder. El alumno entiende los conceptos pero le falta seguridad para aplicarlos.",
            consejoPadres: "Animadle a confiar en su primera intuición. Practicad con juegos de velocidad para ganar seguridad.",
            tags: ["Alta Reflexión", "Duda Recurrente"]
        };
    }

    if (latenciaMediaVoz > 4000) {
        resultados.perfilCognitivo.tags.push("Procesamiento Oral Lento");
        resultados.perfilCognitivo.descripcion += " También se observa una latencia mayor de lo habitual en las respuestas orales.";
    }

    if (resultados.incorrectas > 0) {
        const goldErrors = results.filter(r => r.level === 'gold').length;
        if (goldErrors > 0) {
            resultados.perfilCognitivo.nombre = "Necesita Refuerzo Estructural";
            resultados.perfilCognitivo.tags.push("Bloqueo Teórico");
        }
    }

    return resultados;
}

export async function analizarRespuesta(p, u, c, i, scope) {
    const res = await analizarFichaCompleta([{ ...p, id: 'temp' }], { 'temp': u });
    return res.analisisDetallado[0];
}

export default { analizarFichaCompleta, analizarRespuesta };
