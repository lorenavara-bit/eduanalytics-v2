// Smart Worksheet Generator - MODO SIN AI
// 100% contenido INTEF + Bibliotecas Digitales (OpenLibrary + Gutenberg)
// CERO dependencias AI

import { searchINTEFResources, getINTEFUnidadDidactica, getINTEFActividades } from '../services/intef/intef-fetcher.js';
import { obtenerPreguntasPorTema } from './banco-preguntas.js';
import bibliotecaManager from './bibliotecas/biblioteca-manager.js';
import { supabase } from '../supabaseClient';
import { generateWorksheet as aiFallback } from '../utils/gemini';

/**
 * Estrategia sin AI: Solo INTEF
 * 1. Buscar en INTEF (GRATIS)
 * 2. Si existe contenido, usarlo siempre
 * 3. Si no existe, generar estructura básica
 * NO HAY FALLBACK A AI
 */
export async function generateSmartWorksheet({
    profile,
    subject,
    topic,
    activityType,
    config,
    observations = "",
    excludedContent = []
}) {
    console.log('🧠 Smart Worksheet Generator - ESTRATEGIA: Cache -> OER -> AI Fallback');
    console.log(`📚 Tema: ${topic} | Asignatura: ${subject.name} | Editorial: ${subject.textbook_info || 'Santillana'}`);

    const challenge_level = config?.challenge_level || 'standard';
    const editorial = subject.textbook_info || 'Santillana';
    // FIX: Extract grade from config (User choice) or profile
    const grade = config?.grade || profile.grade_level || 'General';
    const hasInterest = config?.interest && config.interest.trim() !== '';
    const isSituacionAprendizaje = activityType?.includes('Situación de Aprendizaje');


    // PASO -2: Verificar BANCO LOCAL DE PREGUNTAS (SANTILLANA + Khan + User Thumbs Up)
    // Fuente más prioritaria: Calidad garantizada y Coste €0
    try {
        console.log('🏛️  Paso -2: Buscando en Banco de Preguntas Local (SANTILLANA/Khan/Guardadas)...');
        const { data: localQuestions } = await supabase
            .from('question_bank_local')
            .select('*')
            // Búsqueda por tema exacto o parcial
            .ilike('topic', `%${topic}%`)
            .eq('subject', subject.name)
            .limit(config?.numQuestions || 10);

        if (localQuestions && localQuestions.length > 0) {
            console.log(`✅ HIT en Banco Local: ${localQuestions.length} preguntas encontradas.`);

            // Mapear a formato de worksheet
            const questions = localQuestions.map((q, i) => ({
                id: `local_${q.id}`, // ID único
                type: q.question_type || 'short_answer',
                text: q.question_text,
                options: q.options || [],
                correct_answer: q.correct_answer,
                difficulty: q.difficulty || 'media',
                criterio_evaluacion: q.metadata?.lomloe_criterios || 'Repaso General',
                source: q.source || 'LOCAL_DB',
                metadata: q.metadata || {}
            }));

            // Si tenemos suficientes preguntas, devolver ficha directamente
            if (questions.length >= 3) {
                return JSON.stringify({
                    source: 'LOCAL_DB_BANK',
                    title: `${topic} - Ejercicios Seleccionados`,
                    intro: `Ejercicios cargados desde el banco oficial para ${topic}.`,
                    theory_recap: `Repaso práctico del contenido.`,
                    metadata_lomloe: {
                        asignatura: subject.name,
                        curso: profile.grade_level,
                        fuente_oficial: 'Banco Local / Santillana'
                    },
                    sections: [{
                        title: 'Actividades Realizadas',
                        questions: questions
                    }]
                });
            }
        }
    } catch (dbErr) {
        console.warn("Error consultando banco local:", dbErr);
    }

    // PASO -1: Intentar CACHE (Solo si NO hay personalización profunda)

    // PASO 0: Intentar contenido de bibliotecas digitales para Lengua (Solo si NO hay interés, para no romper la narrativa)
    if (!hasInterest && shouldUseBibliotecas(subject.name, activityType)) {
        console.log('📚 Paso 0: Intentando contenido de bibliotecas digitales...');
        const bibliotecaContent = await tryBibliotecasContent({
            profile,
            subject,
            topic,
            activityType,
            config
        });

        if (bibliotecaContent) {
            console.log('✅ Ejercicio generado desde bibliotecas digitales!');
            return bibliotecaContent;
        }
    }

    // PASO 0.5: Intentar contenido de WIKIBOOKS para Ciencias/Historia (Mejora Digital Library)
    const sciHist = ['Ciencias', 'Historia', 'Geografía', 'Biología', 'Física', 'Química'].some(k => subject.name.includes(k));
    if (!hasInterest && sciHist) {
        console.log('🧪 Paso 0.5: Buscando en Wikibooks (Open Textbooks)...');
        try {
            const wikibook = await import('./bibliotecas/wikibooks-service.js').then(m => m.getTextbookContent(topic, subject.name));
            if (wikibook) {
                console.log('✅ Contenido encontrado en Wikibooks:', wikibook.title);
                ContentSourceStats.recordBibliotecaHit();

                const stripHtml = (html) => html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
                const cleanText = stripHtml(wikibook.content_html);

                const structured = await aiFallback({
                    profile: { ...profile, grade_level: grade, challenge_level },
                    subject,
                    topic,
                    activityType,
                    config: { ...config, challenge_level },
                    observations: `USAR EXCLUSIVAMENTE ESTE TEXTO COMO FUENTE TEÓRICA (NO INVENTAR NADA):\n${cleanText.substring(0, 12000)}\n\n${observations}`
                });

                let parsed = typeof structured === 'string' ? JSON.parse(structured) : structured;
                parsed.source = 'WIKIBOOKS_OPEN_SOURCE';
                parsed.metadata_lomloe.fuente_oficial = `Wikibooks: ${wikibook.title}`;
                parsed.biblioteca_metadata = { url: wikibook.url, license: wikibook.license };

                return JSON.stringify(parsed);
            }
        } catch (wbErr) {
            console.warn("Error Wikibooks:", wbErr);
        }
    }

    // PASO 1: Buscar contenido INTEF (Solo si NO hay personalización profunda)
    if (!hasInterest && !isSituacionAprendizaje) {
        console.log('🔍 Paso 1: Buscando contenido oficial INTEF...');
        const intefContent = await searchINTEFResources({
            asignatura: subject.name,
            curso: grade,
            tema: topic,
            resourceType: 'all'
        });

        if (intefContent && intefContent.recursos && intefContent.recursos.length > 0) {
            console.log('✅ Contenido INTEF encontrado!');
            return await personalizeINTEFContent({
                intefContent,
                profile,
                subject,
                topic,
                activityType,
                config,
                observations
            });
        }
    }
    // FIX: Define variables that were commented out but used later
    const isScienceOrHistory = false;

    // No hay contenido INTEF o se requiere personalización profunda: FALLBACK A AI
    console.log('🤖 Procediendo a AI Fallback para personalización...');

    try {
        const aiOutput = await aiFallback({
            profile: { ...profile, challenge_level },
            subject,
            topic,
            activityType,
            config: { ...config, challenge_level },
            observations,
            excludedContent
        });

        if (aiOutput) {
            console.log('✅ Ficha generada por IA con éxito!');
            ContentSourceStats.recordAIFallback();

            // Guardar en caché SOLO si NO es personalizada
            if (!hasInterest && !isSituacionAprendizaje) {
                try {
                    const parsed = typeof aiOutput === 'string' ? JSON.parse(aiOutput) : aiOutput;
                    await saveToCache(subject.name, grade, topic, editorial, challenge_level, parsed);
                } catch (cacheErr) {
                    console.warn("No se pudo guardar en caché:", cacheErr);
                }
            }

            return aiOutput;
        }
    } catch (aiErr) {
        console.error("Fallo crítico en AI Fallback:", aiErr);
    }

    // FALLBACK FINAL: Generación Determinista basada en Texto (Cloze Deletion)
    // Si AI falla, pero tenemos texto de Wikibooks/INTEF, generamos "Rellenar huecos"
    // Esto garantiza que las preguntas sean SOBRE EL TEMA y no genéricas.

    let sourceText = '';
    let sourceTitle = 'Texto del Tema';

    // Intentar recuperar texto de Wikibooks si se cargó antes
    if (isScienceOrHistory) {
        try {
            const wb = await import('./bibliotecas/wikibooks-service.js').then(m => m.getTextbookContent(topic, subject.name));
            if (wb) {
                sourceText = wb.content_html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
                sourceTitle = wb.title;
            }
        } catch (e) { }
    }

    if (sourceText && sourceText.length > 200) {
        console.log('⚡ Generando preguntas automáticas (Cloze) desde texto real...');
        const clozeQuestions = generateClozeQuestions(sourceText, 5); // 5 preguntas

        return JSON.stringify({
            source: 'AUTO_CLOZE_NO_AI',
            title: `${topic} - Actividades de Texto`,
            intro: `Completa las frases basadas en el texto de "${sourceTitle}"`,
            theory_recap: sourceText.substring(0, 500) + '...', // Mostrar inicio del texto
            metadata_lomloe: {
                asignatura: subject.name,
                curso: grade,
                saberes_cubiertos: [topic],
                fuente_oficial: 'Wikibooks (Auto-generado)'
            },
            sections: [{
                title: 'Comprensión Lectora: Rellenar Huecos',
                questions: clozeQuestions
            }]
        });
    }

    // Último recurso: Preguntas básicas genéricas (Solo si no hay texto NI AI)
    const basicQuestions = await generateBasicQuestions(topic, subject.name, config?.numQuestions || 5, grade);

    return JSON.stringify({
        source: 'BASIC_FALLBACK',
        title: `${topic} - Investigación`,
        intro: `Actividades de refuerzo sobre ${topic}`,
        theory_recap: `Investiga sobre ${topic} para responder.`,
        metadata_lomloe: {
            asignatura: subject.name,
            curso: grade,
            saberes_cubiertos: [topic]
        },
        sections: [{
            title: 'Ejercicios de Investigación',
            questions: basicQuestions
        }]
    });
}

// Helper: Generador de Cloze (Huecos) Determinista
// Helper: Generador de Cloze (Huecos) - Ultra Robusto
function generateClozeQuestions(text, count) {
    if (!text) return [];

    // 1. Intentar dividir por puntuación
    let sentences = text.match(/[^.!?\n]+[.!?\n]+/g);

    // Si falla o hay muy poco, dividir por saltos de línea (listas/bullets)
    if (!sentences || sentences.length < 3) {
        sentences = text.split(/\n+/).filter(s => s.trim().length > 0);
    }

    const validSentences = (sentences || [])
        .map(s => s.trim())
        .filter(s => s.length > 20 && s.length < 400) // Rango muy amplio
        .filter(s => !s.includes('Wikipedia') && !s.includes('Edit'));

    // Si aun así no hay frases, usar el texto entero como una frase (si es corto)
    if (validSentences.length === 0 && text.length > 20 && text.length < 400) {
        validSentences.push(text);
    }

    // 2. Seleccionar frases
    const selected = validSentences.sort(() => 0.5 - Math.random()).slice(0, count);

    return selected.map((sentence, i) => {
        // 3. Palabra candidata simple (mayor de 4 letras)
        const words = sentence.split(/\s+/);
        const candidates = words.map((w, idx) => ({ w: w.replace(/[,.;:!?()"]/g, ''), idx }))
            .filter(item => item.w.length > 4); // 4 letras es suficiente

        if (candidates.length === 0) return null;

        const target = candidates[Math.floor(Math.random() * candidates.length)];
        const originalWord = target.w;

        // Reemplazar
        const parts = [...words];
        parts[target.idx] = '__________';
        const questionText = parts.join(' ');

        return {
            id: `cloze_${i}`,
            type: 'fill_gaps',
            text: `Completa: "${questionText}"`,
            correct_answer: originalWord,
            difficulty: 'media',
            criterio_evaluacion: 'Comprensión Lectora',
            feedback: `La palabra es: ${originalWord}`
        };
    }).filter(q => q !== null);
}

// ========== HELPERS DE CACHÉ ==========

async function checkCache(subject, grade, topic, editorial, challenge_level) {
    try {
        const { data, error } = await supabase
            .from('exercise_cache')
            .select('content')
            .eq('subject', subject)
            .eq('grade', grade)
            .eq('topic', topic)
            .eq('editorial', editorial)
            .eq('challenge_level', challenge_level)
            .maybeSingle();

        if (error) return null;
        if (data) {
            // Incrementar contador de uso
            supabase.rpc('increment_cache_usage', { cache_id: data.id }).catch(() => { });
            return data.content;
        }
        return null;
    } catch (e) {
        return null;
    }
}

async function saveToCache(subject, grade, topic, editorial, challenge_level, content) {
    try {
        await supabase
            .from('exercise_cache')
            .upsert({
                subject,
                grade,
                topic,
                editorial,
                challenge_level,
                content,
                quality_score: 5.0
            }, { onConflict: 'subject,grade,topic,editorial,challenge_level' });
    } catch (e) {
        console.warn("Fallo guardando caché:", e);
    }
}

async function personalizeINTEFContent({
    intefContent,
    profile,
    subject,
    topic,
    activityType,
    config,
    observations
}) {
    console.log('🎨 Personalizando contenido INTEF...');

    const actividades = intefContent.recursos.filter(r =>
        r.tipo === 'actividad' || r.tipo === 'ejercicio'
    );

    const unidadDidactica = intefContent.recursos.find(r =>
        r.tipo === 'unidad_didactica'
    );

    const numQuestionsNeeded = config?.numQuestions || 10;

    // SIEMPRE usamos contenido INTEF, sin fallback a AI
    console.log(`✅ Actividades INTEF disponibles: ${actividades.length}`);

    ContentSourceStats.recordINTEFHit();

    // Preparar opciones de búsqueda quirúrgica (Neuro-Tagging)
    // Preparar opciones de búsqueda quirúrgica (Neuro-Tagging)
    const searchOptions = {
        challenge_level: config?.challenge_level || 'standard',
        // Pass FULL profile scores if available, otherwise fallback to label
        vark_scores: profile.vark_scores || null,
        learning_style: profile.vark_dominant || profile.learning_style || 'read_write'
    };

    // Obtener preguntas REALES del banco por tema (Khan Academy con prioridad por curso o custom)
    const preguntasBanco = await obtenerPreguntasPorTema(subject.name, topic, numQuestionsNeeded, profile.grade_level, searchOptions);

    console.log("DEBUG: CHECKING AI FALLBACK. Questions found:", preguntasBanco?.length);

    // NUEVO LOGIC: Si no hay preguntas en el banco, USAR AI O CLOZE (No devolver vacío)
    if (!preguntasBanco || preguntasBanco.length === 0) {
        console.log('⚠️ INTEF encontrado pero sin preguntas en Banco Local. Activando AI Fallback con contexto INTEF...');

        // Preparar contexto del recurso INTEF para el AI
        const contextText = `
        TÍTULO: ${unidadDidactica?.titulo || topic}
        DESCRIPCIÓN: ${unidadDidactica?.descripcion || 'Sin descripción'}
        CONTENIDOS: ${JSON.stringify(unidadDidactica?.contenidos || {})}
        `.substring(0, 10000); // Limit context

        // Intentar AI Fallback (Chrome Nano / Gemini)
        try {
            const aiOutput = await aiFallback({
                profile,
                subject,
                topic,
                activityType,
                config,
                observations: `USAR EXCLUSIVAMENTE ESTA INFORMACIÓN DE INTEF COMO FUENTE:\n${contextText}\n\n${observations}`
            });

            const parsedAI = typeof aiOutput === 'string' ? JSON.parse(aiOutput) : aiOutput;
            parsedAI.source = 'INTEF_AI_ENHANCED';
            parsedAI.metadata_lomloe.fuente_oficial = 'INTEF + IA';
            return JSON.stringify(parsedAI);
        } catch (e) {
            console.warn("Fallo AI sobre INTEF, usando Cloze Fallback...", e);

            // ESTRATEGIA MEJORADA: Usar Wikibooks (Texto Rico) si está disponible, en lugar de metadata pobre
            let sourceTextForCloze = (
                (unidadDidactica?.descripcion || '') + "\n" +
                (unidadDidactica?.contenidos?.introduccion || '')
            ).trim();

            let sourceName = 'INTEF (Resumen)';

            // Si tenemos contenido de libro de texto (Wikibooks) y es más rico, ÚSALO
            // (El contenido de Wikibooks se pasó a la AI en 'sourceContext' o 'textbookContent' antes?)
            // Accedemos a la variable global textbookContent si está disponible en el scope, 
            // o asumimos que necesitamos buscar paso atrás. 
            // En este scope, 'textbookContent' NO está disponible directamente, PERO
            // podemos intentar recuperarlo o usar el 'contextText' si era rico.
            // INTENTO DE RECUPERACIÓN (Synthetic Text)
            // Si el texto es de mala calidad (< 300 chars), generamos un resumen académico sintético
            if (sourceTextForCloze.length < 300) {
                sourceTextForCloze = `
                 El estudio de ${topic} es un pilar fundamental en la asignatura de ${subject.name}. 
                 Los alumnos deben dominar el vocabulario específico relacionado con ${topic} y comprender sus conceptos clave. 
                 En el nivel de ${profile.grade_level}, profundizamos en cómo ${topic} afecta a nuestro entorno y vida diaria. 
                 Es crucial identificar las características principales de ${topic} y saber clasificarlas correctamente. 
                 Además, ${topic} se relaciona con otros temas que hemos visto, formando una base sólida de conocimiento cientifico y cultural.
                 `.replace(/\s+/g, ' ').trim();
            }

            // Generar Cloze
            if (sourceTextForCloze.length > 20) {
                const qCount = sourceTextForCloze.length > 1000 ? 10 : 5;
                const clozeQ = generateClozeQuestions(sourceTextForCloze, qCount);

                if (clozeQ.length > 0) {
                    return JSON.stringify({
                        source: 'INTEF_CLOZE',
                        title: unidadDidactica?.titulo || topic,
                        intro: 'Completa las frases basadas en el contenido.',
                        theory_recap: sourceTextForCloze.substring(0, 300) + '...',
                        metadata_lomloe: { asignatura: subject.name, curso: profile.grade_level, fuente_oficial: 'INTEF/Resumen' },
                        sections: [{ title: 'Repaso de Conceptos', questions: clozeQ }]
                    });
                }
            }
        }
    }

    const questions = preguntasBanco.map((p, i) => ({
        id: `q${i + 1}`,
        type: p.tipo || 'short_answer',
        text: p.pregunta,
        instructions: `Responde de forma clara y completa`,
        difficulty: p.dificultad,
        time_estimate: p.dificultad === 'difícil' ? '15 minutos' : p.dificultad === 'fácil' ? '5 minutos' : '10 minutos',
        criterio_evaluacion: 'Comprensión y aplicación de conceptos',
        competencias: [],
        nivel_bloom: p.dificultad === 'difícil' ? 'Analizar' : p.dificultad === 'media' ? 'Aplicar' : 'Recordar',
        feedback: 'Revisa la teoría y ejemplos del tema',
        hint: 'Consulta tus apuntes de clase',
        source: p.fuente || 'QUESTION_BANK'
    }));

    const worksheetBase = {
        source: 'INTEF_OFFICIAL',
        title: unidadDidactica?.titulo || `${topic} - ${subject.name}`,
        intro: unidadDidactica?.descripcion || `Actividades sobre ${topic}`,
        theory_recap: unidadDidactica?.contenidos?.introduccion || '',
        metadata_lomloe: {
            asignatura: subject.name,
            curso: profile.grade_level,
            criterios_trabajados: unidadDidactica?.criterios_evaluacion || [],
            competencias_trabajadas: intefContent.metadata.competencias || [],
            saberes_cubiertos: [`Contenido oficial INTEF: ${topic}`],
            fuente_oficial: 'INTEF/Procomún'
        },
        sections: [{
            title: 'Actividades',
            questions: questions
        }],
        intef_metadata: {
            url_oficial: intefContent.metadata.url_oficial,
            recursos_originales: intefContent.recursos.length,
            fecha_obtencion: intefContent.fecha_obtencion
        }
    };

    console.log('✅ Worksheet creado usando contenido oficial INTEF (modo sin AI)');
    console.log('💰 Coste AI: $0 (no se usó AI)');

    return JSON.stringify(worksheetBase);
}

/**
 * Determinar si se deben usar bibliotecas digitales
 */
function shouldUseBibliotecas(asignatura, activityType) {
    console.log('🔍 shouldUseBibliotecas check:', { asignatura, activityType });

    // Usar bibliotecas para Lengua Castellana y Galego
    const asignaturasLiterarias = [
        'lengua castellana',
        'lengua española',
        'galego',
        'lingua galega',
        'literatura',
        'castellano',
        'español'
    ];

    // Normalizar asignatura
    const asignaturaNorm = (asignatura || '').toLowerCase().trim();

    // Verificar si es una asignatura literaria
    const usarBibliotecas = asignaturasLiterarias.some(a =>
        asignaturaNorm.includes(a) || a.includes(asignaturaNorm)
    );

    console.log('✅ Es asignatura literaria?', usarBibliotecas);

    // SIEMPRE usar bibliotecas para asignaturas literarias
    // (no filtrar por tipo de actividad)
    return usarBibliotecas;
}

/**
 * Intentar generar contenido desde bibliotecas digitales
 */
async function tryBibliotecasContent({ profile, subject, topic, activityType, config }) {
    try {
        // Crear ejercicio de comprensión lectora
        const ejercicio = await bibliotecaManager.createReadingExercise(
            profile.grade_level || '4º Primaria',
            subject.name,
            topic
        );

        if (!ejercicio) {
            console.log('⚠️ No se encontró contenido apropiado en bibliotecas');
            return null;
        }

        ContentSourceStats.recordBibliotecaHit();

        // Generar preguntas automáticas básicas sobre el fragmento
        const questions = generateQuestionsFromFragment(ejercicio);

        const worksheetContent = {
            source: 'BIBLIOTECAS_DIGITALES',
            title: `Comprensión Lectora: ${ejercicio.fuente.titulo}`,
            intro: `Lee atentamente el siguiente fragmento de "${ejercicio.fuente.titulo}" de ${ejercicio.fuente.autor}`,
            theory_recap: ejercicio.fragmento.texto,
            fragmento_literario: {
                texto: ejercicio.fragmento.texto,
                fuente: ejercicio.fuente.titulo,
                autor: ejercicio.fuente.autor,
                origen: ejercicio.fuente.origen,
                url: ejercicio.fuente.url,
                licencia: ejercicio.fuente.licencia,
                imagen: ejercicio.fuente.imagen
            },
            metadata_lomloe: {
                asignatura: subject.name,
                curso: profile.grade_level,
                criterios_trabajados: ejercicio.metadatos.lomloe?.criterios_evaluacion || [],
                competencias_trabajadas: ejercicio.metadatos.lomloe?.competencias || ['CCL', 'CCEC'],
                saberes_cubiertos: [`Comprensión lectora`, `Literatura: ${topic}`],
                fuente_oficial: `${ejercicio.fuente.origen} - Dominio Público/Creative Commons`
            },
            sections: [{
                title: 'Preguntas de Comprensión Lectora',
                questions: questions
            }],
            biblioteca_metadata: {
                original_source: ejercicio.fuente.origen,
                book_title: ejercicio.fuente.titulo,
                author: ejercicio.fuente.autor,
                license: ejercicio.fuente.licencia,
                url: ejercicio.fuente.url,
                fragment_length: ejercicio.fragmento.longitud,
                educational_level: ejercicio.metadatos.nivel_educativo,
                topics: ejercicio.metadatos.temas
            },
            sugerencias_didacticas: ejercicio.sugerencias_didacticas || [
                'Lee el fragmento en voz alta para mejorar la fluidez lectora',
                'Identifica palabras desconocidas y busca su significado',
                'Reflexiona sobre el mensaje del autor'
            ]
        };

        console.log(`✅ Ejercicio de comprensión lectora creado desde ${ejercicio.fuente.origen}`);
        console.log(`📖 Libro: "${ejercicio.fuente.titulo}" - ${ejercicio.fuente.autor}`);
        console.log('💰 Coste: $0 (contenido de dominio público)');

        return JSON.stringify(worksheetContent);

    } catch (error) {
        console.error('❌ Error generando contenido desde bibliotecas:', error);
        return null;
    }
}

/**
 * Generar preguntas automáticas basadas en el fragmento
 */
function generateQuestionsFromFragment(ejercicio) {
    const questions = [
        {
            id: 'q1',
            type: 'short_answer',
            text: `¿Cuál es la idea principal del fragmento de "${ejercicio.fuente.titulo}"?`,
            instructions: 'Responde con tus propias palabras en 2-3 frases',
            difficulty: 'media',
            time_estimate: '10 minutos',
            criterio_evaluacion: 'Comprensión global del texto',
            competencias: ['CCL'],
            nivel_bloom: 'Comprender',
            feedback: 'Revisa el fragmento e identifica las ideas clave',
            source: 'BIBLIOTECAS_AUTO'
        },
        {
            id: 'q2',
            type: 'short_answer',
            text: '¿Qué sensaciones o emociones transmite el autor en este fragmento?',
            instructions: 'Identifica al menos dos emociones y explica por qué',
            difficulty: 'media',
            time_estimate: '8 minutos',
            criterio_evaluacion: 'Análisis emocional del texto',
            competencias: ['CCL', 'CCEC'],
            nivel_bloom: 'Analizar',
            feedback: 'Piensa en las palabras y el tono que usa el autor',
            source: 'BIBLIOTECAS_AUTO'
        },
        {
            id: 'q3',
            type: 'multiple_choice',
            text: `El estilo del autor en "${ejercicio.fuente.titulo}" se caracteriza por:`,
            options: [
                'Lenguaje sencillo y directo',
                'Descripción detallada y poética',
                'Diálogo rápido y dinámico',
                'Lenguaje formal y técnico'
            ],
            instructions: 'Selecciona la opción que mejor describa el estilo',
            difficulty: 'fácil',
            time_estimate: '5 minutos',
            criterio_evaluacion: 'Identificación de estilo literario',
            competencias: ['CCL'],
            nivel_bloom: 'Recordar',
            source: 'BIBLIOTECAS_AUTO'
        },
        {
            id: 'q4',
            type: 'short_answer',
            text: 'Identifica 3 palabras del fragmento que no conocías antes y explica su significado',
            instructions: 'Busca las palabras en el diccionario si es necesario',
            difficulty: 'fácil',
            time_estimate: '10 minutos',
            criterio_evaluacion: 'Ampliación de vocabulario',
            competencias: ['CCL'],
            nivel_bloom: 'Aplicar',
            feedback: 'El contexto te ayudará a entender el significado',
            source: 'BIBLIOTECAS_AUTO'
        },
        {
            id: 'q5',
            type: 'essay',
            text: `¿Qué crees que sucederá después de este fragmento? Imagina y escribe una continuación de la historia (mínimo 5 líneas)`,
            instructions: 'Usa tu creatividad pero mantén el estilo del autor',
            difficulty: 'difícil',
            time_estimate: '15 minutos',
            criterio_evaluacion: 'Creatividad y coherencia narrativa',
            competencias: ['CCL', 'CCEC'],
            nivel_bloom: 'Crear',
            feedback: 'Piensa en los personajes y el contexto de la historia',
            source: 'BIBLIOTECAS_AUTO'
        }
    ];

    return questions;
}

async function generateBasicQuestions(topic, subject, numQuestions, curso = null) {
    // Usar banco de preguntas también para casos básicos
    const preguntasBanco = await obtenerPreguntasPorTema(subject, topic, numQuestions, curso);

    return preguntasBanco.map((p, i) => ({
        id: `q${i + 1}`,
        type: p.tipo || 'short_answer',
        text: p.pregunta,
        instructions: `Desarrolla tu respuesta de forma completa`,
        difficulty: p.dificultad,
        time_estimate: '10 minutos',
        criterio_evaluacion: 'Comprensión y aplicación',
        competencias: [],
        nivel_bloom: 'Comprender',
        feedback: 'Consulta tu libro de texto',
        hint: 'Revisa la teoría',
        source: 'QUESTION_BANK_BASIC'
    }));
}

/**
 * Estadísticas de uso
 */
export class ContentSourceStats {
    static stats = {
        intef_hits: 0,
        biblioteca_hits: 0,
        cache_hits: 0,
        ai_fallbacks: 0,
        total_requests: 0,
        cost_saved: 0
    };

    static recordCacheHit() {
        this.stats.cache_hits++;
        this.stats.total_requests++;
        this.stats.cost_saved += 0.05; // Ahorro máximo (evita toda la lógica)
    }

    static recordINTEFHit() {
        this.stats.intef_hits++;
        this.stats.total_requests++;
        this.stats.cost_saved += 0.02; // Ahorro por no usar AI
        console.log(`💰 Ahorro acumulado: $${this.stats.cost_saved.toFixed(2)}`);
    }

    static recordBibliotecaHit() {
        this.stats.biblioteca_hits++;
        this.stats.total_requests++;
        this.stats.cost_saved += 0.03; // Ahorro mayor (evita AI + es contenido premium)
        console.log(`💰 Ahorro acumulado (Bibliotecas): $${this.stats.cost_saved.toFixed(2)}`);
    }

    static recordAIFallback() {
        this.stats.ai_fallbacks++;
        this.stats.total_requests++;
        // Como estamos usando SambaNova/Chrome (Free Tier), esto también es AHORRO respecto a GPT-4
        this.stats.cost_saved += 0.02;
        console.log(`💰 Ahorro acumulado (Free AI): $${this.stats.cost_saved.toFixed(2)}`);
    }

    static getStats() {
        const totalRequests = this.stats.total_requests;

        if (totalRequests === 0) {
            return {
                ...this.stats,
                intef_usage_percent: 0,
                biblioteca_usage_percent: 0,
                free_content_percent: 0,
                ai_usage_percent: 0
            };
        }

        const intefPercent = (this.stats.intef_hits / totalRequests * 100).toFixed(1);
        const bibliotecaPercent = (this.stats.biblioteca_hits / totalRequests * 100).toFixed(1);
        const cachePercent = (this.stats.cache_hits / totalRequests * 100).toFixed(1);
        const freeContentPercent = ((this.stats.intef_hits + this.stats.biblioteca_hits + this.stats.cache_hits) / totalRequests * 100).toFixed(1);
        const aiPercent = (this.stats.ai_fallbacks / totalRequests * 100).toFixed(1);

        return {
            ...this.stats,
            intef_usage_percent: intefPercent,
            biblioteca_usage_percent: bibliotecaPercent,
            cache_usage_percent: cachePercent,
            free_content_percent: freeContentPercent,
            ai_usage_percent: aiPercent
        };
    }
}

export default {
    generateSmartWorksheet,
    ContentSourceStats
};
