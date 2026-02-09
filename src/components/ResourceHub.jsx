import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
    Library, Sparkles, Brain, Lightbulb, Compass,
    BookOpen, Heart, MessageSquare, Anchor, Info,
    ArrowRight, Loader2, Download, ExternalLink, Shield,
    Trophy, Zap, Bookmark, Save, Trash2, Gamepad2
} from 'lucide-react';
import { generateWorksheet } from '../utils/gemini';

const ResourceHub = () => {
    const [resources, setResources] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    // View State: 'hub' (Catalog) or 'library' (Saved Items)
    const [view, setView] = useState('hub');
    const [libraryItems, setLibraryItems] = useState([]);

    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [currentGuide, setCurrentGuide] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null); // Para modal de topic
    const [userTopic, setUserTopic] = useState('');
    const [showBalloon, setShowBalloon] = useState(false);
    const [balloonContext, setBalloonContext] = useState({ topic: '', block: '' });

    // Handle Deep Linking (e.g. from Onboarding)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('tab') === 'library') {
            setView('library');
        }
        if (params.get('new_user') === 'true') {
            setShowBalloon(true);
            // Capture context from URL
            setBalloonContext({
                topic: params.get('topic') || '',
                block: params.get('block') || ''
            });
            // Force refresh library after a moment to ensure gift appears
            setTimeout(() => fetchLibrary(), 1000);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
        fetchResources();
    }, []);

    // Load Library when tab changes
    useEffect(() => {
        if (view === 'library') {
            fetchLibrary();
        }
    }, [view]);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(data);
                const { data: lp } = await supabase.from('learning_profiles').select('*').eq('student_id', user.id).maybeSingle();
                if (lp) data.learning_profile = lp;
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchLibrary = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // FIX: Resolve the correct Student ID. 
            // The Resource Library is linked to the 'students' table ID, not necessarily the Auth User ID.
            let targetStudentId = user.id;

            const { data: students } = await supabase
                .from('students')
                .select('id')
                .eq('parent_id', user.id)
                .limit(1);

            if (students && students.length > 0) {
                targetStudentId = students[0].id;
                console.log("🎒 Loaded Backpack for Student:", targetStudentId);
            }

            const { data, error } = await supabase
                .from('resource_library')
                .select('*')
                .eq('student_id', targetStudentId)
                .order('created_at', { ascending: false });

            if (data) setLibraryItems(data);
        } catch (error) {
            console.error("Error loading library:", error);
        }
    };

    const saveCurrentGuide = async () => {
        if (!currentGuide || !profile) return;
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase.from('resource_library').insert({
                student_id: user.id,
                title: currentGuide.title,
                description: currentGuide.intro,
                resource_type: currentGuide.type || 'WORKSHOP',
                topic: userTopic, // Store the topic
                content: currentGuide,
                is_public: false, // Default private
                user_engagement_score: 1 // First save point
            });

            if (error) throw error;
            alert("¡Recurso guardado en tu Mochila!");
            // Update saved state in current guide to hide save button
            setCurrentGuide(prev => ({ ...prev, savedId: 'temp-id' }));
            fetchLibrary(); // Refresh info
        } catch (e) {
            alert("Error al guardar: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const deleteResource = async (id, e) => {
        e.stopPropagation();
        if (!confirm("¿Estás seguro de borrar este recurso?")) return;

        try {
            await supabase.from('resource_library').delete().eq('id', id);
            setLibraryItems(prev => prev.filter(i => i.id !== id));
        } catch (e) {
            console.error("Error deleting:", e);
        }
    };

    const openSavedResource = (item) => {
        // Restore the guide view with saved content
        setCurrentGuide({ ...item.content, savedId: item.id });
        setUserTopic(item.topic || '');
    };

    const fetchResources = async () => {
        // 1. RECURSOS ESTÁTICOS DE ALTO VALOR (CATÁLOGO "POWER CARDS")
        const STATIC_RESOURCES = [
            // --- TÉCNICAS DE ESTUDIO Y PRODUCTIVIDAD (STUDY) ---
            {
                id: 'static-pomodoro',
                titulo: 'Técnica Pomodoro',
                desc: 'Estudia sin quemarte. Alterna focos de 25 min con descansos.',
                tags: ['METODOLOGIA'],
                tagCategory: 'STUDY',
                icon: Zap,
                prompt_ia: "Genera una sesión de estudio Pomodoro para el tema '{tema_usuario}'. Divide el contenido en bloques de 25 minutos con objetivos claros para cada uno y sugiere qué hacer en los descansos de 5 min."
            },
            {
                id: 'static-feynman',
                titulo: 'Técnica Feynman',
                desc: '¿Crees que lo entiendes? Demuéstralo explicándolo simple.',
                tags: ['METODOLOGIA'],
                tagCategory: 'STUDY',
                icon: MessageSquare,
                prompt_ia: `Aplica la Técnica Feynman al tema '{tema_usuario}' siguiendo los 4 pasos clásicos:

PASO 1 - CONOCER EL CONCEPTO: Genera una pregunta que evalúe si el estudiante puede explicar el concepto básico con sus propias palabras.

PASO 2 - IDENTIFICAR LAGUNAS: Genera preguntas que revelen dónde hay confusión o desconocimiento (ej: "¿Qué pasaría si...?", "¿Por qué crees que...?").

PASO 3 - SIMPLIFICAR: Pide al estudiante que explique el concepto como si fuera a un niño de 10 años, sin tecnicismos.

PASO 4 - REVISAR Y REFORZAR: Genera una pregunta que consolide el aprendizaje con un ejemplo práctico o analogía.

Asegúrate de generar AL MENOS 1 pregunta concreta por cada paso.`
            },
            {
                id: 'static-cornell',
                titulo: 'Método Cornell',
                desc: 'Tus apuntes, ordenados de verdad. Notas, claves y resumen.',
                tags: ['METODOLOGIA'],
                tagCategory: 'STUDY',
                icon: BookOpen,
                prompt_ia: "Crea una plantilla del Método Cornell para el tema '{tema_usuario}'. Genera las 'Ideas Clave' (columna izquierda), un 'Cuerpo de Notas' esquemático (derecha) y un 'Resumen' final."
            },
            {
                id: 'static-mindmap',
                titulo: 'Mapas Mentales',
                desc: 'Conecta ideas visualmente. Perfecto para ver el "Big Picture".',
                tags: ['VISUAL'],
                tagCategory: 'STUDY',
                icon: Brain,
                prompt_ia: "Crea la estructura textual jerárquica de un Mapa Mental para '{tema_usuario}'. Empieza con el nodo central y desglosa en ramas principales y secundarias."
            },
            {
                id: 'static-sq3r',
                titulo: 'Método SQ3R',
                desc: 'Lectura comprensiva extrema: Explorar, Preguntar, Leer, Recitar, Repasar.',
                tags: ['LECTURA'],
                tagCategory: 'STUDY',
                icon: Compass,
                prompt_ia: "Guíame por el método SQ3R para estudiar '{tema_usuario}'. 1. Survey (Vistazo), 2. Question (Preguntas clave), 3. Read (Puntos a leer), 4. Recite (Claves a memorizar), 5. Review (Resumen)."
            },
            {
                id: 'static-eisenhower',
                titulo: 'Matriz de Eisenhower',
                desc: 'Prioriza como un CEO. Distingue lo Urgente de lo Importante.',
                tags: ['PRODUCTIVIDAD'],
                tagCategory: 'STUDY',
                icon: Trophy,
                prompt_ia: "Ayúdame a organizar mis tareas de estudio sobre '{tema_usuario}' usando la Matriz de Eisenhower. Clasifica las tareas posibles en: 1. Hacer ya (Urgente/Importante), 2. Planificar (Importante/No Urgente), 3. Delegar/Minimizar y 4. Eliminar. (Dame los resultados en JSON válido)."
            },

            // --- PENSAMIENTO CRÍTICO (CRITICAL) ---
            {
                id: 'static-6hats',
                titulo: '6 Sombreros para Pensar',
                desc: 'Analiza problemas desde 6 perspectivas: Emoción, Datos, Crítica, Optimismo...',
                tags: ['CRITICO'],
                tagCategory: 'CRITICAL',
                icon: Brain,
                prompt_ia: "Aplica la técnica de los 6 Sombreros de De Bono al tema '{tema_usuario}'. Analízalo bajo el sombrero Blanco (Datos), Rojo (Emociones), Negro (Riesgos), Amarillo (Beneficios), Verde (Creatividad) y Azul (Gestión)."
            },
            {
                id: 'static-detective',
                titulo: 'Detective de la Verdad',
                desc: 'Analiza noticias y textos para detectar falacias, sesgos y mentiras.',
                tags: ['CRITICO'],
                tagCategory: 'CRITICAL',
                icon: Shield,
                prompt_ia: "Actúa como un verificador de hechos. Voy a presentarte una afirmación o texto sobre '{tema_usuario}' y quiero que analices posibles sesgos, falacias lógicas o falta de evidencia. Enséñame a ser escéptico."
            },
            {
                id: 'static-devil',
                titulo: 'Abogado del Diablo',
                desc: 'Defiende lo indefendible. Entrena tu argumentación y flexibilidad.',
                tags: ['CRITICO'],
                tagCategory: 'CRITICAL',
                icon: MessageSquare,
                prompt_ia: "Vamos a debatir sobre '{tema_usuario}'. Quiero que tomes la postura contraria a la mía o una postura impopular y me obligues a argumentar con lógica sólida. Cuestiona mis premisas."
            },
            {
                id: 'static-5whys',
                titulo: 'Los 5 Porqués',
                desc: 'Laboratorio de causas. Encuentra la raíz profunda de cualquier problema.',
                tags: ['CRITICO'],
                tagCategory: 'CRITICAL',
                icon: Compass,
                prompt_ia: "Apliquemos los 5 Porqués al problema o tema '{tema_usuario}'. Pregúntame '¿Por qué?' secuencialmente 5 veces para profundizar desde el síntoma superficial hasta la causa raíz."
            },

            // --- INTELIGENCIA EMOCIONAL (SEL) ---
            {
                id: 'static-growth',
                titulo: 'Growth Mindset',
                desc: 'El poder del "Todavía". Convierte errores en gasolina para aprender.',
                tags: ['EMOCIONAL'],
                tagCategory: 'SEL',
                icon: Sparkles,
                prompt_ia: "Ayúdame a replantear mis frustraciones con '{tema_usuario}' usando Mentalidad de Crecimiento. Transforma frases como 'No se me da bien' en 'Estoy aprendiendo a...'. Dame estrategias para persistir."
            },
            {
                id: 'static-dilemas',
                titulo: 'Simulador de Dilemas',
                desc: 'Roleplay de situaciones difíciles. Entrena tu empatía y resolución.',
                tags: ['EMOCIONAL'],
                tagCategory: 'SEL',
                icon: Heart,
                prompt_ia: "Plantéame un dilema social o ético relacionado con el contexto de '{tema_usuario}' (o un conflicto escolar típico). Guíame a través de opciones de respuesta y analiza las consecuencias emocionales de cada una."
            },
            {
                id: 'static-journal',
                titulo: 'Espejo de Emociones',
                desc: 'Diario guiado. Ponle nombre a lo que sientes para dominarlo.',
                tags: ['EMOCIONAL'],
                tagCategory: 'SEL',
                icon: BookOpen,
                prompt_ia: "Actúa como un diario reflexivo. Hazme preguntas sobre cómo me siento respecto a '{tema_usuario}' o mi día en general. Ayúdame a etiquetar mis emociones con precisión (Granulariedad Emocional) y valídalas."
            },
            {
                id: 'static-assertive',
                titulo: 'Comunicación Asertiva & Límites',
                desc: 'Expresa tus necesidades y defiende tus límites sin culpa ni agresividad.',
                tags: ['EMOCIONAL'],
                tagCategory: 'SEL',
                icon: MessageSquare,
                prompt_ia: `Actúa como coach de comunicación asertiva y límites saludables. 

MÓDULO 1 - ASERTIVIDAD BÁSICA:
Entrena al usuario a expresar opiniones, necesidades y sentimientos de forma clara y respetuosa usando la técnica del Sándwich: Empatía + Hechos/Sentimientos + Propuesta.

MÓDULO 2 - LÍMITES SALUDABLES:
Ayuda al usuario a:
1. Identificar sus límites personales (físicos, emocionales, tiempo, energía)
2. Reconocer cuándo un límite está siendo violado (señales de malestar)
3. Practicar decir "no" sin culpa usando frases asertivas
4. Distinguir entre límites sanos vs autoprotección excesiva

EJERCICIO PRÁCTICO:
Usa el tema '{tema_usuario}' como contexto. Presenta situaciones donde el usuario necesite:
- Expresar una opinión difícil (asertividad)
- Defender un límite personal (decir "no", poner distancia, etc.)

Guía con preguntas reflexivas y valida sus respuestas. Ofrece alternativas de frases asertivas específicas.`
            }
        ];

        try {
            // 2. ENFORCE CURATED LIST (Evitar duplicados de DB)
            // Usamos exclusivamente el catálogo estático validado por el usuario.
            setResources(STATIC_RESOURCES);
        } catch (e) {
            console.log('Error fetching resources', e);
            setResources(STATIC_RESOURCES);
        } finally {
            setDbLoading(false);
        }
    };

    const getResourcesForCard = (cardId) => {
        if (!resources.length) return [];
        return resources.filter(r => r.tagCategory === cardId);
    };

    const handleGenerateClick = (resource) => {
        setSelectedResource(resource);
        setUserTopic('');
        setCurrentGuide(null);
    };

    const confirmGeneration = async () => {
        if (!selectedResource || !userTopic) return;
        setGenerating(true);
        setSelectedResource(null);

        try {
            const activityType = `Guía Interactiva: ${selectedResource.titulo}`;
            const specificInstruction = selectedResource.prompt_ia.replace('{tema_usuario}', userTopic);

            const result = await generateWorksheet({
                profile: profile || { grade_level: '4º Primaria' },
                subject: { name: 'Desarrollo Personal', textbook_info: 'Metodología Educativa' },
                topic: userTopic,
                activityType,
                config: { difficulty: 'Medio', numQuestions: 4 },
                observations: `
                    ACTÚA COMO UN MENTOR EXPERTO (${selectedResource.titulo}).
                    TU OBJETIVO: Generar una guía práctica sobre "${selectedResource.titulo}" aplicada al tema "${userTopic}".
                    
                    INSTRUCCIÓN ESPECÍFICA:
                    ${specificInstruction}
                    
                    REGLAS FUNDAMENTALES:
                    1. TODOS los pasos (sections) DEBEN tener al menos 1-2 preguntas/ejercicios concretos
                    2. NO dejes ningún paso vacío
                    3. Las preguntas deben ser específicas al tema "${userTopic}"
                    4. El feedback debe ser constructivo y educativo
                    
                    FORMATO DE SALIDA (JSON Obligatorio):
                    {
                        "title": "${selectedResource.titulo} - ${userTopic}",
                        "intro": "Breve introducción motivadora (max 2 lineas).",
                        "theory_recap": "Resumen muy breve de la técnica (1 parrafo).",
                        "type": "${selectedResource.id}", 
                        "sections": [
                            {
                                "title": "Paso 1: [título descriptivo]",
                                "questions": [
                                    { "text": "Pregunta/Ejercicio concreto", "feedback": "Feedback detallado y educativo" }
                                ]
                            },
                            {
                                "title": "Paso 2: [título descriptivo]",
                                "questions": [
                                    { "text": "Pregunta/Ejercicio concreto", "feedback": "Feedback detallado y educativo" }
                                ]
                            }
                        ]
                    }
                    
                    IMPORTANTE: Genera entre 3-4 pasos (sections) completos. Cada paso debe tener contenido útil.
                `
            });

            // Parse result safely
            let parsed;
            try {
                parsed = JSON.parse(result);
                console.log("✅ JSON Parseado:", parsed);
                console.log("📋 Secciones generadas:", parsed.sections?.length || 0);
                parsed.sections?.forEach((sec, idx) => {
                    console.log(`  Paso ${idx + 1}: "${sec.title}" - ${sec.questions?.length || 0} preguntas`);
                });
            } catch (jsonErr) {
                console.warn("⚠️ Error al parsear JSON directo, intentando fallback...");
                // Fallback simple
                const jsonMatch = result.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    parsed = JSON.parse(jsonMatch[0]);
                    console.log("✅ JSON recuperado con fallback:", parsed);
                } else {
                    throw new Error("Formato JSON inválido");
                }
            }
            setCurrentGuide(parsed);
        } catch (e) {
            alert("Error al generar la guía: " + e.message);
        } finally {
            setGenerating(false);
        }
    };

    // Componente de Renderizado
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Cargando recursos...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
            {/* Header Hero */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-16 px-6 overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-lg">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Biblioteca Inteligente</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
                        Hub de Aprendizaje
                    </h1>
                    <p className="text-lg text-blue-100/70 max-w-2xl mx-auto font-medium">
                        Talleres interactivos de IA para estudiar mejor, pensar con lógica y sentir con inteligencia.
                    </p>

                    {/* View Switcher Tabs */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => { setView('hub'); setCurrentGuide(null); }}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${view === 'hub' ? 'bg-white text-indigo-900 shadow-xl scale-105' : 'bg-white/10 text-blue-200 hover:bg-white/20'}`}
                        >
                            <Compass className="w-4 h-4" /> Explorar Herramientas
                        </button>
                        <button
                            onClick={() => setView('library')}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${view === 'library' ? 'bg-white text-indigo-900 shadow-xl scale-105' : 'bg-white/10 text-blue-200 hover:bg-white/20'}`}
                        >
                            <Bookmark className="w-4 h-4" /> Mi Mochila
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                {currentGuide ? (
                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-500 space-y-6">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setCurrentGuide(null)}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-colors"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" /> Volver
                            </button>

                            {/* Save Button */}
                            {!currentGuide.savedId && (
                                <button
                                    onClick={saveCurrentGuide}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition-all disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Guardando...' : 'Guardar en Mochila'}
                                </button>
                            )}
                        </div>

                        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
                            {/* Header de la Guía */}
                            <div className="p-10 bg-gradient-to-r from-indigo-700 via-blue-800 to-indigo-900 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-black mb-4 leading-tight">{currentGuide.title}</h2>
                                    <p className="text-blue-100/90 text-lg leading-relaxed max-w-3xl font-medium italic">
                                        "{currentGuide.intro}"
                                    </p>
                                </div>
                            </div>

                            {/* Contenido de la Guía */}
                            <div className="p-10 md:p-16 space-y-12">
                                <div className="prose prose-indigo max-w-none text-slate-600 leading-relaxed text-lg">
                                    <h3 className="flex items-center gap-2 font-black text-slate-800"><Info className="w-5 h-5 text-indigo-500" /> Fundamentos</h3>
                                    <p>{currentGuide.theory_recap}</p>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-10">
                                    {currentGuide.sections?.map((section, idx) => (
                                        <div key={idx} className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                                            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-200">
                                                    {idx + 1}
                                                </div>
                                                {section.title}
                                            </h4>
                                            <div className="space-y-6">
                                                {section.questions && section.questions.length > 0 ? (
                                                    section.questions.map((q, qIdx) => (
                                                        <div key={qIdx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group/q">
                                                            <p className="font-bold text-slate-800 mb-4 group-hover/q:text-indigo-600 transition-colors">
                                                                {q.text}
                                                            </p>
                                                            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Zap className="w-3 h-3 text-indigo-600" />
                                                                    <span className="font-black text-indigo-600 uppercase text-[9px] tracking-widest">Feedback IA</span>
                                                                </div>
                                                                <p className="text-slate-600 text-xs italic">
                                                                    {q.feedback}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                                                        <p className="text-amber-700 text-sm font-medium">
                                                            ⚠️ Este paso no generó contenido. Por favor, regenera la guía.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* VIEW: LIBRARY (MOCHILA - ORGANIZACIÓN COGNITIVA) */}
                        {view === 'library' && (
                            <div className="animate-in fade-in duration-500 space-y-12">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-800">Mi Mochila Cognitiva</h2>
                                        <p className="text-slate-500 font-medium text-sm">Tus recursos organizados por función cerebral.</p>
                                    </div>
                                    <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {libraryItems.length} Items Total
                                    </span>
                                </div>

                                {/* NEW USER BALLOON CTA */}
                                {showBalloon && (
                                    <div className="relative mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-[32px] shadow-2xl flex items-center justify-between text-white animate-in slide-in-from-top-4 duration-700">
                                        <div>
                                            <h3 className="text-2xl font-black mb-2">¡Tu Mochila ha comenzado!</h3>
                                            <p className="text-indigo-100 max-w-lg">Ya tienes tu "Plan Anti-Villano". Pero esto es solo el principio.</p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    // Map onboarding block to generator settings
                                                    // nerves -> reinforcement (facil)
                                                    // time -> standard
                                                    // confusion -> reinforcement
                                                    let diff = 'Standard';
                                                    if (balloonContext.block === 'nerves' || balloonContext.block === 'confusion') diff = 'Refuerzo';

                                                    const query = new URLSearchParams({
                                                        topic: balloonContext.topic,
                                                        difficulty: diff,
                                                        source: 'onboarding'
                                                    }).toString();
                                                    window.location.href = `/generator?${query}`;
                                                }}
                                                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg animate-pulse"
                                            >
                                                ⚡ Crea tu propia arma
                                            </button>
                                            {/* BALLOON POINTER */}
                                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-white text-slate-800 p-3 rounded-xl shadow-xl z-50 text-center border-4 border-yellow-400 rotate-2">
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b-4 border-r-4 border-yellow-400"></div>
                                                <p className="text-xs font-black">
                                                    ¡Siguiente Paso! 👇
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {libraryItems.length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                                        <Bookmark className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-slate-400">Tu mochila está vacía</h3>
                                        <p className="text-slate-400 text-sm mt-2">Crea guías, exámenes o planes y guárdalos aquí.</p>
                                        <button onClick={() => setView('hub')} className="mt-6 text-indigo-600 font-bold hover:underline">Ir a Explorar</button>

                                        {/* DEBUG INFO (SOLO DEV) */}
                                        <div className="mt-8 p-4 bg-slate-100 rounded-xl text-xs text-left text-slate-400 font-mono overflow-auto max-w-xs mx-auto opacity-50 hover:opacity-100 transition-opacity">
                                            <p><strong>DEBUG:</strong></p>
                                            <p>User ID: {profile?.id?.slice(0, 8)}...</p>
                                            <p>Library Count: {libraryItems.length}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-16">
                                        {/* SECCIÓN 1: ESTRATEGIA (Brújula) */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                                    <Compass className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800">Estrategia & Planificación</h3>
                                            </div>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {libraryItems.filter(i => ['ROADMAP', 'POMODORO', 'EISENHOWER'].includes(i.resource_type) || i.title.includes('Plan')).map((item) => (
                                                    <div key={item.id} className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all border-l-8 border-amber-400 group cursor-pointer relative" onClick={() => openSavedResource(item)}>
                                                        <button
                                                            onClick={(e) => deleteResource(item.id, e)}
                                                            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-full transition-colors z-10"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.location.href = `/generator?remix=${encodeURIComponent(JSON.stringify({
                                                                    subject: item.subject,
                                                                    topic: item.topic || item.title,
                                                                    type: item.resource_type
                                                                }))}`;
                                                            }}
                                                            className="absolute top-4 right-14 p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 rounded-full transition-colors z-10"
                                                            title="Remix con IA"
                                                        >
                                                            <Sparkles className="w-4 h-4" />
                                                        </button>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 block">{item.subject || 'GENERAL'}</span>
                                                        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{item.title}</h3>
                                                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                                                        {item.resource_type === 'ROADMAP' && item.content?.steps && (
                                                            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                                                                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${Math.round((item.content.steps.filter(s => s.status === 'completed').length / item.content.steps.length) * 100)}%` }}></div>
                                                            </div>
                                                        )}
                                                        <div className="text-xs font-bold text-amber-600 flex items-center gap-1">Ver Plan <ArrowRight className="w-3 h-3" /></div>
                                                    </div>
                                                ))}
                                                {libraryItems.filter(i => ['ROADMAP', 'POMODORO', 'EISENHOWER'].includes(i.resource_type) || i.title.includes('Plan')).length === 0 && (
                                                    <p className="text-sm text-slate-400 italic col-span-full">No tienes planes estratégicos aún.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* SECCIÓN 2: PRÁCTICA (Pesa/Músculo) */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                                                    <Trophy className="w-6 h-6" /> {/* Usando Trophy como Pesa metafórica */}
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800">Entrenamiento & Práctica</h3>
                                            </div>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {libraryItems.filter(i => ['WORKSHEET', 'EXAM', 'QUIZ'].includes(i.resource_type)).map((item) => (
                                                    <div key={item.id} className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all border-l-8 border-emerald-500 group cursor-pointer relative" onClick={() => openSavedResource(item)}>
                                                        <button
                                                            onClick={(e) => deleteResource(item.id, e)}
                                                            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-full transition-colors z-10"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.location.href = `/generator?remix=${encodeURIComponent(JSON.stringify({
                                                                    subject: item.subject,
                                                                    topic: item.topic || item.title,
                                                                    type: item.resource_type
                                                                }))}`;
                                                            }}
                                                            className="absolute top-4 right-14 p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 rounded-full transition-colors z-10"
                                                            title="Remix con IA"
                                                        >
                                                            <Sparkles className="w-4 h-4" />
                                                        </button>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">{item.subject || 'GENERAL'}</span>
                                                        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{item.title}</h3>
                                                        <div className="flex gap-2 mb-4">
                                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg uppercase">{item.content?.difficulty_level || 'MEDIO'}</span>
                                                            <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg uppercase">{item.content?.sections?.length || 0} Ejercicios</span>
                                                        </div>
                                                        <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">Entrenar Ahora <ArrowRight className="w-3 h-3" /></div>
                                                    </div>
                                                ))}
                                                {libraryItems.filter(i => ['WORKSHEET', 'EXAM', 'QUIZ'].includes(i.resource_type)).length === 0 && (
                                                    <p className="text-sm text-slate-400 italic col-span-full">No tienes fichas de práctica guardadas.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* SECCIÓN 3: COMPRENSIÓN (Bombilla) */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                                    <Lightbulb className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800">Comprensión Profunda</h3>
                                            </div>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {/* Filtramos todo lo que NO sea de los otros dos grupos */}
                                                {libraryItems.filter(i => !['ROADMAP', 'POMODORO', 'EISENHOWER', 'WORKSHEET', 'EXAM', 'QUIZ'].includes(i.resource_type) && !i.title.includes('Plan')).map((item) => (
                                                    <div key={item.id} className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all border-l-8 border-indigo-500 group cursor-pointer relative" onClick={() => openSavedResource(item)}>
                                                        <button
                                                            onClick={(e) => deleteResource(item.id, e)}
                                                            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-full transition-colors z-10"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.location.href = `/generator?remix=${encodeURIComponent(JSON.stringify({
                                                                    subject: item.subject,
                                                                    topic: item.topic || item.title,
                                                                    type: item.resource_type
                                                                }))}`;
                                                            }}
                                                            className="absolute top-4 right-14 p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 rounded-full transition-colors z-10"
                                                            title="Remix con IA"
                                                        >
                                                            <Sparkles className="w-4 h-4" />
                                                        </button>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.subject || 'GENERAL'}</span>
                                                        </div>
                                                        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 line-clamp-3 mb-4">{item.description}</p>

                                                        <div className="mt-auto flex items-center gap-1 text-xs font-bold text-indigo-500">
                                                            Repasar Técnica <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                ))}
                                                {libraryItems.filter(i => !['ROADMAP', 'POMODORO', 'EISENHOWER', 'WORKSHEET', 'EXAM', 'QUIZ'].includes(i.resource_type) && !i.title.includes('Plan')).length === 0 && (
                                                    <p className="text-sm text-slate-400 italic col-span-full">No tienes guías de comprensión (Feynman, Mapas, etc).</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VIEW: HUB (CATALOG) */}
                        {view === 'hub' && (
                            <div className="animate-in fade-in duration-500 space-y-24">
                                {/* SECCIONES DE HERRAMIENTAS */}
                                {['STUDY', 'CRITICAL', 'SEL'].map((catId) => {
                                    const catResources = getResourcesForCard(catId);
                                    if (!catResources.length) return null;
                                    const meta = {
                                        STUDY: { title: 'Técnicas de Estudio', desc: 'Métodos para memorizar, estructurar y priorizar.', color: 'emerald' },
                                        CRITICAL: { title: 'Pensamiento Crítico', desc: 'Herramientas para analizar la verdad y argumentar.', color: 'amber' },
                                        SEL: { title: 'Inteligencia Emocional', desc: 'Habilidades para la vida, empatía y resiliencia.', color: 'rose' }
                                    }[catId];

                                    return (
                                        <div key={catId} className="space-y-8">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 pt-4">
                                                <div className="space-y-2">
                                                    <h2 className="text-3xl font-black text-slate-800">{meta.title}</h2>
                                                    <p className="text-slate-500 font-medium text-base">{meta.desc}</p>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full bg-${meta.color}-100 text-${meta.color}-700 text-xs font-black uppercase tracking-widest`}>
                                                    {catResources.length} Herramientas
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {catResources.map((r, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleGenerateClick(r)}
                                                        className="group text-left bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${meta.color}-500/5 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                                                        <div className="flex items-start justify-between mb-6">
                                                            <div className={`p-3 rounded-2xl bg-${meta.color}-50 text-${meta.color}-600 group-hover:bg-${meta.color}-500 group-hover:text-white transition-colors duration-300`}>
                                                                <r.icon className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-indigo-500 transition-colors">
                                                                Crear <ArrowRight className="w-3 h-3" />
                                                            </div>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                                                            {r.titulo}
                                                        </h3>
                                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                                            {r.desc}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal de Input Topic */}
            {selectedResource && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-1">Configura tu Taller</h3>
                                <p className="text-slate-500 font-medium text-sm">Vas a aplicar: <span className="text-indigo-600 font-bold">{selectedResource.titulo}</span></p>
                            </div>
                            <button onClick={() => setSelectedResource(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <ArrowRight className="w-5 h-5 rotate-45" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                    ¿Sobre qué estás estudiando o trabajando?
                                </label>
                                <input
                                    type="text"
                                    value={userTopic}
                                    onChange={(e) => setUserTopic(e.target.value)}
                                    placeholder="Ej: El ciclo del agua, La Guerra Civil, Ecuaciones..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    autoFocus
                                />
                                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                                    La IA generará el taller basándose en este tema.
                                </p>
                            </div>
                            <button
                                onClick={confirmGeneration}
                                disabled={!userTopic.trim()}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-lg"
                            >
                                <Sparkles className="w-5 h-5" /> Generar Guía Personalizada
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estado de Carga (Overlay) */}
            {generating && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-white/90 backdrop-blur-md">
                    <div className="text-center max-w-md p-8">
                        <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-8 shadow-2xl shadow-indigo-500/40 animate-spin flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-4 animate-pulse">Diseñando Taller...</h3>
                        <p className="text-slate-500 text-lg">
                            Consultando la base de conocimiento y adaptando el contenido a tu perfil.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceHub;
