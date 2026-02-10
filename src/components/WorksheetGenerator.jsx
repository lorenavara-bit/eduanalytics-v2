import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Loader2, Wand2, Book, Settings, Trash2, Plus, Save, Check, Printer, Download, AlertCircle, Sparkles, Calendar, User } from 'lucide-react';
import { analizarFichaCompleta } from '../services/evaluacion-service'; // Importar servicio de evaluaciÃ³n
import { generateSmartWorksheet, ContentSourceStats } from '../services/smart-worksheet-generator';
import { generateWorksheet as generateWithAIFallback, saveEvaluationResults } from '../utils/gemini';


// --- GENERADORES DE FICHA ---
import { generarFichaMatematicas } from '../services/matematicas-service';
import { shouldUseDeterministicGenerator, generateDeterministicWorksheet } from '../services/deterministic-integration';
import InteractiveWorksheet from './InteractiveWorksheet';
import AuthPage from './AuthPage';
import ExamRoadmap from './ExamRoadmap'; // Import integrated component
import vocabularyData from '../data/english-4primaria.json'; // Importar datos reales para contar palabras
import { GamificationService } from '../services/gamification-service';
import { getCompetencyName } from '../utils/competencyHelpers'; // Servicio de GamificaciÃ³n
import { ProgresoService } from '../services/progreso-service'; // Persistencia local
import { getTemasDisponiblesPorCurso } from '../services/khan/khan-por-curso.js'; // Importar temas dinÃ¡micos

import { getEnv } from '../utils/appEnv';

const WorksheetGenerator = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('WORKSHEET'); // 'WORKSHEET' | 'ROADMAP'
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [addingSubject, setAddingSubject] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [textbook, setTextbook] = useState('Santillana');

    const [topic, setTopic] = useState('');

    const [generating, setGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [saving, setSaving] = useState(false);

    const [activityType, setActivityType] = useState('practica');
    const [difficulty, setDifficulty] = useState('Medio');
    const [challengeLevel, setChallengeLevel] = useState('standard');
    const [numQuestions, setNumQuestions] = useState(20);

    const [questionTypes, setQuestionTypes] = useState(['Test', 'Respuesta Corta']);

    // ConfiguraciÃ³n de Entrenamiento
    const [enableTimer, setEnableTimer] = useState(false);
    const [hideHints, setHideHints] = useState(false);

    // GamificaciÃ³n State
    const [gamificationProfile, setGamificationProfile] = useState(null);

    const hasFetched = useRef(false);


    const DIFFICULTIES = []; // Eliminado
    const QUESTION_OPTIONS = [
        { id: 'Test', label: 'Tipo Test' },
        { id: 'Respuesta Corta', label: 'Preguntas Cortas' },
        { id: 'Verdadero/Falso', label: 'Verdadero/Falso' },
        { id: 'Rellenar Huecos', label: 'Rellenar Huecos' },
        { id: 'ComprensiÃ³n Lectora', label: 'ðŸ“– ComprensiÃ³n Lectora' },
        { id: 'Relacionar', label: 'Relacionar/Unir' },
        { id: 'Mapas', label: 'Mapas / GeografÃ­a' },
        { id: 'Diagramas', label: 'Diagramas' },
        { id: 'Problemas', label: 'Problemas MatemÃ¡ticos' },
        { id: 'Casos Reales', label: 'Casos Reales' },
        { id: 'Definiciones', label: 'Definiciones' }
    ];

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (!authUser) {
                setLoading(false);
                return;
            }

            setUser(authUser);

            // 1. Fetch children with RICH PROFILE (Tests & Screenings)
            const { data: kids, error: kidsError } = await supabase.from('students')
                .select(`
                    *,
                    learning_profiles (
                        vark_dominant,
                        vark_scores,
                        fs_active_reflective,
                        fs_sensing_intuitive,
                        fs_visual_verbal,
                        fs_sequential_global,
                        ai_summary
                    ),
                    nee_screenings (
                        risk_level,
                        recommendations,
                        created_at,
                        type
                    )
                `)
                .eq('parent_id', authUser.id);

            if (kidsError) throw kidsError;

            if (kids && kids.length > 0) {
                // Format joined data (Supabase returns arrays for 1:N)
                const formattedKids = kids.map(k => ({
                    ...k,
                    learning_profile: (k.learning_profiles && k.learning_profiles.length > 0) ? k.learning_profiles[0] : null,
                    nee_data: (k.nee_screenings && k.nee_screenings.length > 0)
                        ? k.nee_screenings.sort((a, b) => new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp))[0]
                        : null,
                    all_screenings: k.nee_screenings || [] // Pass complete history for multi-test context
                }));

                setStudents(formattedKids);
                const initialStudent = formattedKids[0];
                setSelectedStudent(initialStudent);
                setChallengeLevel(initialStudent.challenge_level || 'standard');
                setTextbook(initialStudent.editorial_math || 'Santillana');
            }

            // 2. Fetch subjects (user_subjects)
            const { data: subjectsData, error: subjectsError } = await supabase.from('user_subjects')
                .select('*')
                .eq('user_id', authUser.id)
                .order('name');

            if (subjectsError || !subjectsData || subjectsData.length === 0) {
                // If no subjects, initialize based on first kid's level or default
                const level = kids?.[0]?.education_level || 'eso';
                await initializeSubjects(authUser.id, level);
            } else {
                setSubjects(subjectsData);
                setSelectedSubject(subjectsData[0]);
            }

        } catch (e) {
            console.error('Error in fetchData:', e);
        } finally {
            setLoading(false);
        }
    };



    // REMIX LOGIC: Auto-fill from URL params
    useEffect(() => {
        if (!loading && subjects.length > 0) {
            const params = new URLSearchParams(window.location.search);
            const remixData = params.get('remix');

            // 1. Remix Complex Object
            if (remixData) {
                try {
                    const parsed = JSON.parse(decodeURIComponent(remixData));
                    if (parsed.subject) {
                        const matched = subjects.find(s => s.name.toLowerCase() === parsed.subject.toLowerCase())
                            || subjects.find(s => s.name.toLowerCase().includes(parsed.subject.toLowerCase()));
                        if (matched) setSelectedSubject(matched);
                    }
                    if (parsed.topic) setTopic(parsed.topic);
                    if (parsed.type) {
                        if (parsed.type === 'ROADMAP') setMode('ROADMAP');
                        else setMode('WORKSHEET');
                    }
                } catch (e) { console.error("Bad remix data", e); }
            }

            // 2. Simple Params (e.g. from Onboarding Balloon)
            const paramTopic = params.get('topic');
            const paramDiff = params.get('difficulty');

            if (paramTopic) {
                // Set the topic text
                setTopic(paramTopic);

                // Try to auto-select the subject if the topic matches a subject name (e.g. "MatemÃ¡ticas")
                const matchedSubject = subjects.find(s =>
                    s.name.toLowerCase() === paramTopic.toLowerCase() ||
                    paramTopic.toLowerCase().includes(s.name.toLowerCase())
                );

                if (matchedSubject) {
                    setSelectedSubject(matchedSubject);
                } else if (!selectedSubject) {
                    // Default to first subject if none selected
                    setSelectedSubject(subjects[0]);
                }
            }

            if (paramDiff) {
                const mapDiff = {
                    'Refuerzo': 'FÃ¡cil',
                    'Standard': 'Medio',
                    'Ampliacion': 'DifÃ­cil'
                };
                if (mapDiff[paramDiff]) setDifficulty(mapDiff[paramDiff]);

                // Also set challenge level context
                if (paramDiff === 'Refuerzo') setChallengeLevel('refuerzo');
                if (paramDiff === 'Standard') setChallengeLevel('standard');
            }

            // Clean URL if we applied params
            if (remixData || paramTopic) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }

        }
    }, [loading, subjects]);

    // NUEVO: Cargar insights del estudiante (VARK + Neurodiversidad)
    useEffect(() => {
        if (selectedStudent?.id) {
            fetchStudentInsights(selectedStudent.id);
        }
    }, [selectedStudent?.id]);

    const fetchStudentInsights = async (studentId) => {
        try {
            // 0. Fetch Gamification Profile
            const gami = await GamificationService.getProfile(studentId);
            setGamificationProfile(gami);

            // 1. Fetch Learning Profile
            const { data: lp } = await supabase
                .from('learning_profiles')
                .select('*')
                .eq('student_id', studentId)
                .single();

            // 2. Fetch Latest Neurodiversity Screening
            const { data: nee } = await supabase
                .from('nee_screenings')
                .select('*')
                .eq('student_id', studentId)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            setSelectedStudent(prev => ({
                ...prev,
                learning_profile: lp || null,
                nee_data: nee || null
            }));
        } catch (err) {
            console.log("No insights found for student yet:", studentId);
        }
    };

    const initializeSubjects = async (userId, level) => {
        let defaults = [];
        const normLevel = (level || '').toLowerCase();
        if (normLevel.includes('primaria')) defaults = ['MatemÃ¡ticas', 'Lengua Castellana', 'Ciencias Naturales', 'Ciencias Sociales', 'InglÃ©s'];
        else if (normLevel.includes('eso')) defaults = ['MatemÃ¡ticas', 'GeografÃ­a e Historia', 'Lengua Castellana', 'BiologÃ­a y GeologÃ­a', 'FÃ­sica y QuÃ­mica', 'InglÃ©s', 'TecnologÃ­a'];
        else defaults = ['MatemÃ¡ticas', 'Historia', 'Lengua Castellana', 'InglÃ©s', 'FilosofÃ­a', 'FÃ­sica', 'QuÃ­mica'];

        const toInsert = defaults.map(name => ({ user_id: userId, name, education_level: level, is_custom: false }));
        try {
            const { data, error } = await supabase.from('user_subjects').insert(toInsert).select();
            if (error) throw error;
            if (data && data.length > 0) {
                setSubjects(data);
                setSelectedSubject(data[0]);
            }
        } catch (e) { console.error("Init Error", e); }
    };

    const guessLevel = (val) => {
        if (!val) return 'primaria';
        const low = val.toLowerCase();
        if (low.includes('primaria')) return 'primaria';
        if (low.includes('eso')) return 'eso';
        if (low.includes('bachillerato')) return 'bachillerato';
        return 'primaria';
    };

    const handleAddSubject = async () => {
        if (!user) return alert("Debes iniciar sesiÃ³n primero.");
        if (!newSubjectName.trim()) return;
        try {
            const level = selectedStudent?.education_level || guessLevel(selectedStudent?.grade_level);
            const { data, error } = await supabase.from('user_subjects').insert({
                user_id: user.id,
                name: newSubjectName.trim(),
                education_level: level,
                is_custom: true
            }).select().single();
            if (error) throw error;
            setSubjects(prev => [...prev, data]);
            setSelectedSubject(data); setNewSubjectName(''); setAddingSubject(false);
        } catch (error) { alert("Error al aÃ±adir asignatura: " + error.message); }
    };

    const handleDeleteSubject = async (e, subjectId) => {
        e.stopPropagation();
        if (!confirm("Â¿Borrar esta asignatura?")) return;
        try {
            const { error } = await supabase.from('user_subjects').delete().eq('id', subjectId);
            if (error) throw error;
            setSubjects(prev => prev.filter(s => s.id !== subjectId));
            if (selectedSubject?.id === subjectId) setSelectedSubject(null);
        } catch (err) {
            alert("Error al borrar: " + err.message);
        }
    };

    const handleUpdateTextbook = async () => {
        if (!user) return alert("Debes iniciar sesiÃ³n.");
        if (!selectedSubject) return alert("Selecciona una asignatura primero.");
        try {
            const { error } = await supabase.from('user_subjects').update({ textbook_info: textbook }).eq('id', selectedSubject.id);
            if (error) throw error;
            const updated = { ...selectedSubject, textbook_info: textbook };
            setSubjects(prev => prev.map(s => s.id === selectedSubject.id ? updated : s));
            setSelectedSubject(updated);
            alert("Libro guardado correctamente âœ…");
        } catch (e) { alert("Error guardando libro: " + e.message); }
    };

    const handleGenerate = async () => {
        if (!user) return alert("Inicia sesiÃ³n.");
        if (!topic || !selectedSubject) return alert("Completa el tema y selecciona asignatura.");

        console.log('ðŸ” DEBUG - activityType:', activityType);
        console.log('ðŸ” DEBUG - topic:', topic);
        console.log('ðŸ” DEBUG - selectedSubject:', selectedSubject.name);
        console.log('ðŸ” DEBUG - numQuestions:', numQuestions);

        setGenerating(true);
        setGeneratedContent(null);

        try {
            // âœ¨ DETECTAR SI DEBE USAR GENERADOR DETERMINISTA (4Âº Primaria)
            const gradeLevel = selectedStudent?.grade_level || '';
            const useDeterministic = shouldUseDeterministicGenerator(
                selectedSubject.name,
                gradeLevel,
                topic
            );

            if (useDeterministic) {
                console.log('ðŸŽ¯ Usando generador DETERMINISTA (100% fiable)');

                // Generar con cÃ³digo puro (MatemÃ¡ticas o GeografÃ­a 4Âº Primaria)
                const deterministicResult = await generateDeterministicWorksheet({
                    subject: selectedSubject,
                    topic: topic,
                    numQuestions: numQuestions,
                    difficulty: difficulty,
                    gradeLevel: gradeLevel
                });

                setGeneratedContent(deterministicResult);
                console.log('ðŸ“¦ DEBUG - Contenido generado:', deterministicResult);
                console.log('ðŸ“Š DEBUG - Secciones:', deterministicResult?.sections);
                console.log('ðŸ“‹ DEBUG - Primera pregunta:', deterministicResult?.sections?.[0]?.questions?.[0]);

                // Guardar en banco de preguntas local
                if (deterministicResult?.sections) {
                    const newRows = [];
                    deterministicResult.sections.forEach(s => {
                        s.questions?.forEach(q => {
                            newRows.push({
                                topic: topic,
                                subject: selectedSubject.name,
                                grade_level: gradeLevel,
                                question_text: q.text,
                                question_type: q.type || 'multiple_choice',
                                options: q.options || [],
                                correct_answer: q.correct_answer,
                                difficulty: difficulty.toLowerCase(),
                                source: 'DETERMINISTIC_GENERATOR',
                                metadata: {
                                    generated_at: new Date().toISOString(),
                                    fiabilidad: '100%'
                                }
                            });
                        });
                    });

                    if (newRows.length > 0) {
                        supabase.from('question_bank_local').insert(newRows)
                            .then(({ error }) => {
                                if (error) console.error("âŒ Auto-save failed:", error);
                                else console.log(`âœ… Saved ${newRows.length} qs (deterministic) to bank.`);
                            });
                    }
                }

                console.log('âœ… GeneraciÃ³n determinÃ­stica completada');
                return; // Salir, no usar AI
            }

            // ========================
            // GENERACIÃ“N CON AI (Caso normal)
            // ========================
            console.log(`ðŸ§  GeneraciÃ³n inteligente: ${topic}`);

            // ðŸ›¡ï¸ DEDUPLICACIÃ“N: Verificar banco local
            let excluded = [];
            try {
                const { data: dbQs } = await supabase
                    .from('question_bank_local')
                    .select('question_text')
                    .eq('topic', topic)
                    .ilike('subject', selectedSubject.name)
                    .limit(100);
                if (dbQs) excluded = dbQs.map(q => q.question_text);
                console.log(`ðŸ›¡ï¸ Deduplication: Found ${excluded.length} previous questions in DB.`);
            } catch (dberr) { console.warn("Dedupe check ignored:", dberr); }

            console.log(`ðŸ“Š Estrategia: INTEF primero â†’ AI fallback`);

            // Usar Smart Generator (Cache -> OER -> AI)
            const rawOutput = await generateSmartWorksheet({
                profile: selectedStudent || { grade_level: '4Âº Primaria' },
                subject: { ...selectedSubject, textbook_info: textbook },
                topic,
                activityType,
                config: {
                    difficulty,
                    questionTypes,
                    numQuestions,
                    challenge_level: challengeLevel
                },
                observations: "",
                excludedContent: excluded
            });

            let parsedContent = rawOutput;
            if (typeof rawOutput === 'string') {
                try {
                    const jsonStr = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
                    parsedContent = JSON.parse(jsonStr);
                } catch (e) {
                    console.warn("Parse warning", e);
                }
            }

            setGeneratedContent(parsedContent);

            // ðŸ’¾ AUTO-SAVE: Guardar en Banco de Preguntas Local
            if (parsedContent?.sections) {
                const newRows = [];
                parsedContent.sections.forEach(s => {
                    s.questions?.forEach(q => {
                        newRows.push({
                            topic: topic,
                            subject: selectedSubject.name,
                            grade_level: selectedStudent?.grade_level || 'General',
                            question_text: q.text,
                            question_type: q.type || 'short_answer',
                            options: q.options || [],
                            correct_answer: q.correct_answer || q.answer,
                            difficulty: difficulty.toLowerCase(),
                            source: 'AI_GENERATED',
                            metadata: { generated_at: new Date().toISOString() }
                        });
                    });
                });

                if (newRows.length > 0) {
                    supabase.from('question_bank_local').insert(newRows)
                        .then(({ error }) => {
                            if (error) console.error("âŒ Auto-save failed:", error);
                            else console.log(`âœ… Saved ${newRows.length} qs to question_bank_local.`);
                        });
                }
            }

            // Mostrar estadÃ­sticas de ahorro
            const stats = ContentSourceStats.getStats();
            console.log(`
                ðŸ“Š ESTADÃSTICAS DE CONTENIDO:
                - Uso Cache: ${stats.cache_usage_percent}%
                - Uso INTEF: ${stats.intef_usage_percent}%
                - Uso AI: ${stats.ai_usage_percent}%
                - ðŸ’° Ahorro total estimado: â‚¬${(stats.cost_saved * 0.9).toFixed(2)}
            `);

        } catch (error) {
            console.error(error);
            alert("Error generando ficha: " + error.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleSaveWorksheet = async () => {
        if (!user) return alert("Inicia sesiÃ³n.");
        if (!generatedContent || !selectedSubject) return;
        setSaving(true);
        try {
            // Determinar tipo de recurso para la LibrerÃ­a Unificada
            let type = 'WORKSHEET'; // Default
            if (activityType.toLowerCase().includes('examen')) type = 'EXAM';

            // Guardar en la nueva Mochila Universal (resource_library)
            const { error } = await supabase.from('resource_library').insert({
                student_id: user.id,
                title: generatedContent.title || `${activityType} de ${topic}`,
                description: `Ficha generada para ${selectedSubject.name}. Dificultad: ${difficulty}`,
                resource_type: type,
                topic: topic,
                subject: selectedSubject.name,
                content: {
                    ...generatedContent,
                    config: { activityType, textbook, questionTypes, numQuestions },
                    difficulty_level: difficulty // Guardamos dificultad original
                },
                is_public: false,
                is_curated: false,
                user_engagement_score: 1
            });

            if (error) throw error;
            alert("Â¡Guardado en tu Mochila Universal! ðŸŽ’ Puedes verlo en el Hub.");
        } catch (error) {
            console.error(error);
            alert("Error al guardar: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleLocalCorrection = async (userAnswers, setCorrectionResult, timeSpent) => {
        // Preparar las preguntas para el servicio de evaluaciÃ³n
        const allQuestions = [];
        generatedContent.sections?.forEach(sec => {
            sec.questions?.forEach(q => {
                allQuestions.push({
                    ...q,
                    subject: selectedSubject.name, // CRÃTICO: Para activar "Modo InglÃ©s"
                    pregunta: q.text,
                    respuesta_correcta: q.correct_answer || q.respuesta,
                    dificultad: difficulty.toLowerCase()
                });
            });
        });

        // Realizar anÃ¡lisis avanzado (Async Update) con ID de estudiante para tracking
        const result = await analizarFichaCompleta(allQuestions, userAnswers, selectedStudent?.id);

        // Simular retardo para feedback visual
        await new Promise(r => setTimeout(r, 800));

        // Adaptar resultado al formato esperado por InteractiveWorksheet
        const formattedResult = {
            score: result.puntuacion,
            total: result.totalPreguntas,
            summary: result.mensajeEstudiante,
            mensajePadres: result.mensajePadres,
            perfilCognitivo: result.perfilCognitivo,
            corrections: {}
        };

        // Mapear correcciones individuales
        result.analisisDetallado.forEach((item, index) => {
            const qId = allQuestions[index].id;
            formattedResult.corrections[qId] = {
                correct: item.correcta,
                feedback: item.feedbackExcelencia || item.feedback
            };
        });

        setCorrectionResult(formattedResult);

        // NUEVO: Guardar en base de datos para Analytics
        if (selectedStudent?.id) {
            const evaluationData = result.analisisDetallado.map((item, index) => {
                // Enriquecer competencias con lo detectado por el motor de errores inglÃ©s
                let dynamicCompetencias = [...(allQuestions[index].competencias || [])];

                // Si el motor de errores detectÃ³ una competencia especÃ­fica (ej. CP por error de plurales)
                if (item.feedbackEstructurado?.competencia) {
                    const compsDetectadas = item.feedbackEstructurado.competencia.split(',').map(c => c.trim());
                    // AÃ±adir sin duplicados
                    compsDetectadas.forEach(c => {
                        if (!dynamicCompetencias.includes(c)) dynamicCompetencias.push(c);
                    });
                }

                return {
                    questionId: allQuestions[index].id,
                    criterio: allQuestions[index].criterio_evaluacion || 'General',
                    competencias: dynamicCompetencias, // Guardamos la lista enriquecida
                    isCorrect: item.correcta,
                    studentAnswer: item.respuestaUsuario,
                    correctAnswer: item.respuestaCorrecta,
                    feedback: item.feedbackExcelencia || item.feedback,
                    timeSeconds: timeSpent / allQuestions.length, // Tiempo estimado por pregunta
                    tags: allQuestions[index].tags || null, // Pasar TAGS reales
                    errorPatternId: item.patronError || null // Guardamos el ID del patrÃ³n si existe (ej. DESC_HAVE_AGE)
                };
            });

            // Usamos metadatos de la ficha
            const worksheetInfo = {
                subjectName: selectedSubject?.name,
                topic: topic,
                perfilCognitivoId: result.perfilCognitivo?.id,
                advancedMetrics: result.metricasAvanzadas // Pasar la telemetrÃ­a neuro-pedagÃ³gica
            };

            saveEvaluationResults(selectedStudent.id, worksheetInfo, evaluationData)
                .then(() => console.log("ðŸ“Š Datos de evaluaciÃ³n guardados para Analytics"))
                .catch(err => console.error("âŒ Error guardando analytics:", err));

            // --- GAMIFICATION TRIGGER ---
            try {
                // Calcular XP: 10 XP por acierto
                const correctCount = result.analisisDetallado.filter(x => x.correcta).length;
                const xpBase = correctCount * 10;
                const xpBonus = (result.puntuacion >= 80) ? 50 : 20; // Bonus por aprobar/excelencia
                const totalXp = xpBase + xpBonus;

                const xpResult = await GamificationService.addXp(selectedStudent.id, totalXp, 'completed_worksheet', { topic, subject: selectedSubject.name });
                await GamificationService.updateStreak(selectedStudent.id);

                // Refrescar perfil local para actualizar barra
                setGamificationProfile(prev => ({
                    ...prev,
                    total_xp: xpResult.newXp,
                    current_level: xpResult.newLevel
                }));

                // Inyectar datos de gamificaciÃ³n en el resultado visual
                setCorrectionResult(prev => ({
                    ...prev,
                    gamification: {
                        xpEarned: totalXp,
                        leveledUp: xpResult.leveledUp,
                        newLevel: xpResult.newLevel,
                        streak: (gamificationProfile?.current_streak || 0) + 1
                    }
                }));

            } catch (err) {
                console.error("Error updating gamification:", err);
            }

            // --- REPORTING COMPETENCIAL ("Magia Negra") ---
            // Calculamos el % de Ã©xito por competencia usando los datos enriquecidos
            const competencyStats = {};

            evaluationData.forEach(item => {
                // Iterar sobre las competencias de esta pregunta
                if (item.competencias && item.competencias.length > 0) {
                    item.competencias.forEach(comp => {
                        if (!competencyStats[comp]) {
                            competencyStats[comp] = { total: 0, correct: 0, examples: [] };
                        }
                        competencyStats[comp].total++;
                        if (item.isCorrect) {
                            competencyStats[comp].correct++;
                        }
                    });
                }
            });

            // Transformar a array para el frontend
            const competencyReport = Object.keys(competencyStats).map(comp => {
                const stats = competencyStats[comp];
                const percentage = Math.round((stats.correct / stats.total) * 100);
                return {
                    code: comp,
                    name: getCompetencyName(comp), // Helper function needed
                    percentage: percentage,
                    count: stats.total
                };
            }).filter(c => c.count > 0).sort((a, b) => b.percentage - a.percentage); // Ordenar por Ã©xito

            // --- MISSION SUMMARY (DIPLOMA) ---
            const missionSummary = {
                medallas: { gold: 0, silver: 0, bronze: 0 },
                temasDominados: [],
                temasParaRepasar: [],
                mensajePersonalizado: ""
            };

            result.analisisDetallado.forEach((res, idx) => {
                // Contar medallas si existen en el feedback estructurado
                if (res.feedbackEstructurado && res.feedbackEstructurado.nivel) {
                    const nivel = res.feedbackEstructurado.nivel; // 'gold', 'silver', 'bronze'
                    if (missionSummary.medallas[nivel] !== undefined) {
                        missionSummary.medallas[nivel]++;
                    }

                    // Clasificar temas
                    const tema = res.feedbackEstructurado.tema || res.feedbackEstructurado.competencia || "General";
                    if (nivel === 'gold') {
                        missionSummary.temasDominados.push(tema);
                    } else if (nivel === 'bronze') {
                        missionSummary.temasParaRepasar.push(tema);
                    }
                } else if (!res.correcta) {
                    // Si fallÃ³ y no hay medalla (error normal), es tema a repasar
                    const tema = allQuestions[idx].competencias?.[0] || "General";
                    missionSummary.temasParaRepasar.push(tema);
                }
            });

            // Limpiar duplicados
            missionSummary.temasDominados = [...new Set(missionSummary.temasDominados)];
            missionSummary.temasParaRepasar = [...new Set(missionSummary.temasParaRepasar)];

            // ðŸ’¾ PERSISTENCIA: Guardar progreso cumulativo localmente
            const totalXpMision = (result.puntuacion || 0) * 10;
            const progresoTotal = ProgresoService.guardarSesion(totalXpMision, missionSummary.medallas);

            // --- CÃLCULO DE NIVELES (BARRA XP) ---
            const infoNivel = ProgresoService.calcularNivelActual(progresoTotal.puntosTotales);

            // Detectar si hubo LEVEL UP (calculando el nivel ANTES de sumar los puntos de hoy)
            const xpAntes = progresoTotal.puntosTotales - totalXpMision;
            const infoNivelAntes = ProgresoService.calcularNivelActual(xpAntes);
            const huboLevelUp = infoNivel.nivel > infoNivelAntes.nivel;

            // AÃ±adir info al reporte de misiÃ³n
            missionSummary.nivelInfo = infoNivel;
            missionSummary.levelup = huboLevelUp ? { nuevoNivel: infoNivel.nombre, nivelAnterior: infoNivelAntes.nombre } : null;

            // Mensaje Personalizado ("Toque de Genio")
            const totalMedallas = missionSummary.medallas.gold + missionSummary.medallas.silver + missionSummary.medallas.bronze;

            // Usamos el progreso TOTAL para motivar si es posible
            if (huboLevelUp) {
                missionSummary.mensajePersonalizado = `Â¡ðŸŽ‰ LEVEL UP! Ahora eres un ${infoNivel.nombre}. Â¡IncreÃ­ble! ðŸš€`;
            } else if (missionSummary.medallas.gold > totalMedallas * 0.8 && totalMedallas > 0) {
                missionSummary.mensajePersonalizado = `Â¡WOW! Has volado mÃ¡s allÃ¡ de las estrellas. Â¡Eres un 'Go Far!' Master! ðŸš€ðŸŒŸ (XP: ${progresoTotal.puntosTotales})`;
            } else if (missionSummary.medallas.silver > missionSummary.medallas.bronze) {
                missionSummary.mensajePersonalizado = `Â¡Subida de nivel! EstÃ¡s convirtiendo el bronce en plata. Â¡Sigue asÃ­! ðŸ’ª (XP: ${progresoTotal.puntosTotales})`;
            } else {
                missionSummary.mensajePersonalizado = `Â¡MisiÃ³n cumplida! Cada error es una pista para mejorar. ðŸ›¡ï¸ (XP: ${progresoTotal.puntosTotales})`;
            }

            // Inyectar en el resultado visual
            setCorrectionResult(prev => ({
                ...prev,
                competencyReport: competencyReport,
                missionReport: missionSummary
            }));
        }
    };

    const toggleQuestionType = (typeId) => { setQuestionTypes(prev => prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]); };

    // Get available topics for selected subject
    const getAvailableTopics = () => {
        if (!selectedSubject) return [];

        // Import topic lists from khan-por-curso
        // Helper para contar palabras de categorÃ­as
        const getVocabCount = (keys) => {
            if (!vocabularyData || !vocabularyData.vocabulary) return 0;
            let count = 0;
            keys.forEach(k => {
                // Mapeo flexible por si acaso el nombre en UI difiere ligeramente de JSON
                // UI: "Food & Drinks" -> JSON: "food" (Drinks no existe como key, estÃ¡ en Food?)
                // Ajustamos keys segÃºn 'deterministic-integration.js'
                let jsonKey = k;
                if (k === 'school_objects') jsonKey = 'school';
                if (k.includes('routines')) jsonKey = 'daily_routines';

                if (vocabularyData.vocabulary[jsonKey]) {
                    count += vocabularyData.vocabulary[jsonKey].length;
                }
            });
            return count;
        };

        const KHAN_EXERCISES_POR_CURSO = {
            '4Âº Primaria': {
                'MatemÃ¡ticas': ['MultiplicaciÃ³n', 'DivisiÃ³n', 'Sumas y Restas', 'Fracciones', 'Problemas', 'Propiedad Conmutativa', 'Propiedad Asociativa', 'Propiedad Distributiva', 'NÃºmeros de 5 y 6 cifras', 'NÃºmeros Decimales', 'Medidas de Longitud', 'Medidas de Tiempo', 'Ãngulos'],
                'Lengua Castellana': ['OrtografÃ­a', 'ComprensiÃ³n Lectora', 'GramÃ¡tica', 'Palabras Agudas, Llanas y EsdrÃºjulas', 'El Verbo - Tiempos Verbales', 'Sustantivos y Adjetivos', 'La OraciÃ³n Simple', 'Tipos de Texto', 'Unidad 5: Prefijos, Numerales y Adjetivos con V', 'Unidad 6: Sufijos, Verbos y Ger/Gir', 'Repaso Examen MaÃ±ana: Temas 5 y 6'],
                'Lingua Galega': ['OrtografÃ­a galega', 'Vocabulario galego', 'ComprensiÃ³n Lectora en Galego', 'GramÃ¡tica Galega', 'OrtografÃ­a da Lingua Galega', 'Vocabulario Galego Avanzado', 'RedacciÃ³n e ExpresiÃ³n en Galego', 'Cultura Galega'],
                'Ciencias de la Naturaleza': ['Los Seres Vivos', 'El Cuerpo Humano', 'La Materia', 'Las Plantas', 'Los Animales Vertebrados', 'Los Animales Invertebrados', 'Los Ecosistemas', 'La EnergÃ­a', 'Las MÃ¡quinas'],
                'Ciencias Naturales': ['El cuerpo humano: La relaciÃ³n', 'Los sentidos y el sistema nervioso', 'El aparato locomotor', 'La salud y la enfermedad', 'Los seres vivos: Las plantas', 'Los ecosistemas', 'La materia y las fuerzas', 'La energÃ­a', 'La luz y el calor', 'Las mÃ¡quinas'],
                'Ciencias Sociales': ['Galicia', 'Mi Localidad', 'EspaÃ±a: Relieve y RÃ­os', 'El Clima de EspaÃ±a', 'La PoblaciÃ³n de EspaÃ±a', 'Los Sectores EconÃ³micos', 'La Historia: Prehistoria y Edad Antigua', 'La Edad Media en EspaÃ±a'],
                'Inglés': [
                    // 📘 SANTILLANA GO FAR! 4 - OFFICIAL CURRICULUM
                    'Unit 1: Back to school',
                    'Unit 2: Daily routines',
                    'Unit 3: Jobs',
                    'Unit 4: Free time',
                    'Unit 5: Food',
                    'Unit 6: Animals',
                    'Unit 7: Places',
                    'Unit 8: Holidays'
                ]

            }
        };

        const curso = selectedStudent?.grade_level || '4Âº Primaria';
        const asignatura = selectedSubject.name;

        return getTemasDisponiblesPorCurso(curso, selectedSubject.name) || ['Repaso General'];
    };



    const VITE_GEMINI_API_KEY = getEnv('VITE_GEMINI_API_KEY');
    const hasAIKey = localStorage.getItem('GEMINI_API_KEY') || localStorage.getItem('OPENROUTER_API_KEY') || VITE_GEMINI_API_KEY;

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600 w-8 h-8" /></div>;

    if (!user) return <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center"><AlertCircle className="w-12 h-12 text-red-500 mb-4" /><h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Requerido</h2><AuthPage /></div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">

            {/* Header Hero (Unified Style) */}
            <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white py-20 px-6 overflow-hidden relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>

                <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Generador IA</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                        <div className="p-5 bg-white shadow-2xl shadow-indigo-500/20 rounded-3xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Wand2 className="w-10 h-10 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Estudio Inteligente</h1>
                            <p className="text-xl text-blue-100/80 max-w-2xl font-medium leading-relaxed">
                                Crea fichas de estudio personalizadas y planes de examen adaptados al perfil cognitivo de tu hijo/a.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header & Mode Switcher */}
                {/* Header: Title + Unified Controls */}
                <div className="max-w-6xl mx-auto px-6 -mt-10 mb-10 relative z-20 flex flex-col items-center gap-6">

                    {/* Unified Control Row: Students + Modes */}
                    <div className="bg-white p-2 rounded-[20px] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2 md:gap-6">

                        {/* Student Selector Group */}
                        {students.length > 0 && (
                            <div className="flex items-center gap-2 p-1 bg-slate-50/50 rounded-xl">
                                {students.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setSelectedStudent(s);
                                            setChallengeLevel(s.challenge_level || 'standard');
                                            setTextbook(s.editorial_math || 'Santillana');
                                        }}
                                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${selectedStudent?.id === s.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-white hover:shadow-sm'}`}
                                    >
                                        <User className="w-3 h-3" />
                                        {s.full_name?.split(' ')[0] || 'Estudiante'}
                                        {selectedStudent?.id === s.id && gamificationProfile && (
                                            <span className="ml-1 bg-yellow-400 text-indigo-900 px-1.5 py-0.5 rounded text-[10px] shadow-sm">
                                                LVL {gamificationProfile.current_level}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>


                    {/* GAMIFICATION STATUS (New) */}
                    {gamificationProfile && (
                        <>
                            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center gap-4 px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-200">
                                {/* Level Badge */}
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-md border-2 border-white">
                                        {gamificationProfile.current_level || 1}
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-slate-500 bg-white px-1.5 rounded-full shadow-sm border border-slate-100">
                                        LVL
                                    </div>
                                </div>

                                {/* XP Bar */}
                                <div className="flex flex-col gap-1 w-32">
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                                        <span>XP</span>
                                        <span>{gamificationProfile.total_xp || 0}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                                            style={{ width: `${Math.min(((gamificationProfile.total_xp % 1000) / 1000) * 100, 100)}%` }} // Simplified percentage logic
                                        ></div>
                                    </div>
                                </div>

                                {/* Streak */}
                                <div className="flex items-center gap-1 text-orange-500 font-black text-sm">
                                    <span className="text-lg">ðŸ”¥</span>
                                    <span>{gamificationProfile.current_streak || 0}</span>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                {mode === 'ROADMAP' ? (

                    <div>
                        <ExamRoadmap key={selectedStudent?.id || 'no-student'} preSelectedStudent={selectedStudent} />
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* LEFT: Subject Selector */}
                        <div className="lg:col-span-4 space-y-6">


                            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
                                    <h2 className="font-bold text-white flex items-center gap-2"><Book className="w-5 h-5" /> Asignatura</h2>
                                    <button onClick={() => setAddingSubject(true)} className="p-1.5 rounded-full hover:bg-white/20 text-white"><Plus className="w-5 h-5" /></button>
                                </div>
                                {addingSubject && (
                                    <div className="p-3 bg-purple-50 flex gap-2">
                                        <input autoFocus type="text" value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} className="flex-1 p-2 text-sm border rounded-lg" placeholder="Nombre..." onKeyDown={e => e.key === 'Enter' && handleAddSubject()} />
                                        <button onClick={handleAddSubject} className="p-2 bg-purple-600 text-white rounded"><Check className="w-4 h-4" /></button>
                                    </div>
                                )}
                                <div className="p-2 max-h-[400px] overflow-y-auto">
                                    {subjects
                                        .filter(sub => sub.education_level === selectedStudent?.education_level || !selectedStudent)
                                        .map(sub => (
                                            <div key={sub.id} className={`group flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all ${selectedSubject?.id === sub.id ? 'bg-blue-50 border-blue-200 border-2' : 'hover:bg-gray-50 border-2 border-transparent'}`}>
                                                <div onClick={() => {
                                                    setSelectedSubject(sub);
                                                    setTextbook(sub.textbook_info || '');
                                                }} className="flex-1 flex justify-between items-center">
                                                    <span className={`font-medium ${selectedSubject?.id === sub.id ? 'text-blue-700' : 'text-gray-700'}`}>{sub.name}</span>
                                                    {selectedSubject?.id === sub.id && <Check className="w-5 h-5 text-blue-500 mr-2" />}
                                                </div>
                                                <button onClick={(e) => handleDeleteSubject(e, sub.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    {subjects.filter(sub => sub.education_level === selectedStudent?.education_level || !selectedStudent).length === 0 && (
                                        <div className="p-8 text-center">
                                            <Loader2 className="animate-spin w-6 h-6 mx-auto text-slate-300 mb-2" />
                                            <p className="text-slate-400 text-[10px] uppercase font-bold">Cargando asignaturas...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Libro de Texto Card */}
                            {selectedSubject && (
                                <div className="bg-white rounded-2xl shadow-sm border border-indigo-200 p-6">
                                    <label className="block text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                        ðŸ“š Libro de Texto
                                    </label>
                                    <input
                                        type="text"
                                        value={textbook}
                                        onChange={e => setTextbook(e.target.value)}
                                        placeholder="Ej: Santillana, SM, Go Far..."
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium mb-3"
                                    />
                                    <button
                                        onClick={handleUpdateTextbook}
                                        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Guardar Libro
                                    </button>
                                    <p className="text-xs text-slate-500 mt-2 italic">
                                        Se guardarÃ¡ para esta asignatura y se usarÃ¡ automÃ¡ticamente.
                                    </p>
                                </div>
                            )}

                            {/* Info Card: LOMLOE Guarantee */}
                            <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-6">
                                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="text-xl">âš–ï¸</span>
                                    GarantÃ­a Curricular LOMLOE
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Todo el contenido generado se adapta rigurosamente a los <strong>Saberes BÃ¡sicos</strong> y <strong>Criterios de EvaluaciÃ³n</strong> de la ley educativa vigente en EspaÃ±a.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Generator */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                                <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-6 text-xl"><Settings className="text-purple-600 w-6 h-6" /> Configurar Entrenamiento</h2>

                                <div className="space-y-6">
                                    {/* Topic Dropdown */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">ðŸ“– Tema a Trabajar <span className="text-red-500">*</span></label>
                                        {selectedSubject ? (
                                            <select
                                                value={topic}
                                                onChange={e => setTopic(e.target.value)}
                                                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-medium cursor-pointer"
                                            >
                                                <option value="">-- Selecciona un tema --</option>
                                                {(() => {
                                                    const topics = getAvailableTopics();
                                                    // Detect if we have grouped structure (Strings starting with prefix)
                                                    const hasGroups = topics.some(t => t.includes(': '));

                                                    if (hasGroups) {
                                                        const groups = {};
                                                        topics.forEach(t => {
                                                            const parts = t.split(': ');
                                                            const group = parts.length > 1 ? parts[0] : 'General';
                                                            if (!groups[group]) groups[group] = [];
                                                            groups[group].push(t);
                                                        });

                                                        return Object.entries(groups).map(([groupName, groupTopics]) => (
                                                            <optgroup key={groupName} label={groupName.toUpperCase()}>
                                                                {groupTopics.map(t => (
                                                                    <option key={t} value={t}>{t.split(': ')[1] || t}</option>
                                                                ))}
                                                            </optgroup>
                                                        ));
                                                    } else {
                                                        // Default flat rendering
                                                        return topics.map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ));
                                                    }
                                                })()}
                                            </select>
                                        ) : (
                                            <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-xl text-gray-400 text-lg">
                                                Primero selecciona una asignatura
                                            </div>
                                        )}
                                    </div>



                                    {/* ConfiguraciÃ³n de Entrenamiento */}
                                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                        <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                            âš™ï¸ Opciones de Entrenamiento
                                        </label>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Timer Toggle */}
                                            <div
                                                onClick={() => setEnableTimer(!enableTimer)}
                                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${enableTimer ? 'bg-white border-purple-500 shadow-md' : 'bg-white/50 border-purple-200 hover:border-purple-300'}`}
                                            >
                                                <div className={`p-2 rounded-full ${enableTimer ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    <span className="text-xl">â±ï¸</span>
                                                </div>
                                                <div>
                                                    <span className={`block font-bold ${enableTimer ? 'text-purple-900' : 'text-gray-600'}`}>CronÃ³metro</span>
                                                    <span className="text-xs text-gray-500">Mide tu velocidad</span>
                                                </div>
                                                <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${enableTimer ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}>
                                                    {enableTimer && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>

                                            {/* Hints Toggle */}
                                            <div
                                                onClick={() => setHideHints(!hideHints)}
                                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${hideHints ? 'bg-white border-orange-500 shadow-md' : 'bg-white/50 border-orange-200 hover:border-orange-300'}`}
                                            >
                                                <div className={`p-2 rounded-full ${hideHints ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    <span className="text-xl">ðŸ™ˆ</span>
                                                </div>
                                                <div>
                                                    <span className={`block font-bold ${hideHints ? 'text-orange-900' : 'text-gray-600'}`}>Sin Pistas</span>
                                                    <span className="text-xs text-gray-500">Modo desafÃ­o (Examen)</span>
                                                </div>
                                                <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${hideHints ? 'bg-orange-600 border-orange-600' : 'border-gray-300'}`}>
                                                    {hideHints && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Link to Tutor IA */}
                                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                        <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                                            <span className="text-xl">ðŸ’¡</span>
                                            <span>Â¿No entiendes el tema? <button onClick={() => window.location.href = '/tutor'} className="font-bold underline hover:text-blue-600">Pregunta al Tutor IA</button></span>
                                        </p>
                                    </div>







                                    {/* Num Questions - PRESETS */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">ðŸŽ¯ NÃºmero de Ejercicios</label>
                                        <div className="grid grid-cols-4 gap-3">
                                            {[
                                                { value: 10, label: 'RÃ¡pido', desc: '10 ejercicios' },
                                                { value: 20, label: 'Normal', desc: '20 ejercicios' },
                                                { value: 30, label: 'Completo', desc: '30 ejercicios' },
                                                { value: 50, label: 'Intensivo', desc: '50 ejercicios' }
                                            ].map(preset => (
                                                <button
                                                    key={preset.value}
                                                    onClick={() => setNumQuestions(preset.value)}
                                                    className={`p-3 border-2 rounded-xl transition-all text-center ${numQuestions === preset.value
                                                        ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-200 ring-offset-1'
                                                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow-md'
                                                        }`}
                                                >
                                                    <div className={`font-black text-lg mb-1 ${numQuestions === preset.value ? 'text-purple-700' : 'text-slate-700'}`}>{preset.value}</div>
                                                    <div className="font-bold text-[10px] uppercase tracking-wider opacity-80">{preset.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={generating || !topic || !selectedSubject}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Wand2 className={`w-6 h-6 ${generating ? 'animate-spin' : 'animate-pulse'}`} />
                                        {generating ? 'Preparando Entrenamiento...' : 'âœ¨ Comenzar Entrenamiento'}
                                    </button>

                                    {selectedSubject && (
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                            <p className="text-sm text-blue-800">
                                                <span className="font-bold">Asignatura seleccionada:</span> {selectedSubject.name}
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">
                                                ðŸ’¡ Los ejercicios se generarÃ¡n especÃ­ficamente para esta asignatura
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RESULT */}
                            {generatedContent && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
                                    {/* Source Badge */}
                                    {generatedContent.source === 'INTEF_OFFICIAL' && (
                                        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xl">ðŸ‡ªðŸ‡¸</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-green-800">Contenido Oficial INTEF</p>
                                                <p className="text-xs text-green-600">Recursos del Ministerio de EducaciÃ³n â€¢ CurrÃ­culo LOMLOE</p>
                                            </div>
                                            <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                                ðŸ’° Coste: â‚¬0
                                            </div>
                                        </div>
                                    )}
                                    {generatedContent.source !== 'INTEF_OFFICIAL' && (
                                        <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl flex items-center gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-purple-800">Generado con IA</p>
                                                <p className="text-xs text-purple-600">Contenido personalizado con AI â€¢ Basado en LOMLOE</p>
                                            </div>
                                        </div>
                                    )}

                                    <InteractiveWorksheet
                                        data={generatedContent}
                                        onCorrect={handleLocalCorrection}
                                        enableTimer={enableTimer}
                                        hideHints={hideHints}
                                    />
                                    <div className="mt-8 flex gap-4 border-t border-gray-200 pt-6">
                                        <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-all">
                                            <Printer className="w-5 h-5" /> Imprimir
                                        </button>
                                        <button onClick={handleSaveWorksheet} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 ml-auto font-medium transition-all disabled:opacity-50">
                                            {saving ? <Loader2 className='animate-spin w-5 h-5' /> : <Save className="w-5 h-5" />}
                                            {saving ? 'Guardando...' : 'ðŸ’¾ Guardar en Biblioteca'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );


};

export default WorksheetGenerator;
