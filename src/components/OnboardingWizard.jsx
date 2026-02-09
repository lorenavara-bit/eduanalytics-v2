import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { generateWorksheet } from '../utils/gemini';
import RadarChart from './RadarChart';
import {
    Sparkles, ArrowRight, Brain, Zap,
    MessageSquare, BookOpen, Crown, Rocket, AlertCircle, CheckCircle
} from 'lucide-react';

const OnboardingWizard = ({ studentId, onComplete }) => {
    const [step, setStep] = useState('welcome'); // welcome, name, visual-quiz, villain, generating, success
    const [chartData, setChartData] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        learningStyle: '',
        examBlock: '',
        villainSubject: '',
        grade: '' // Nuevo campo Curso
    });

    const GRADES = [
        "1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria", "5º Primaria", "6º Primaria",
        "1º ESO", "2º ESO", "3º ESO", "4º ESO",
        "1º Bachillerato", "2º Bachillerato"
    ];

    // --- STEP 1: NOMBRE Y CURSO ---
    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (userData.name.trim() && userData.grade) {
            setStep('visual-quiz');
        }
    };

    // --- STEP 2: ESTILO (QUIZ) ---
    const quizOptions = [
        { id: 'visual', label: 'Hacer dibujos en los márgenes', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50' },
        { id: 'auditory', label: 'Hablar con el compañero de al lado', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'kinesthetic', label: 'Mover el boli o la pierna sin parar', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'reading', label: 'Leer el libro por mi cuenta', icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ];

    const selectStyle = (styleId) => {
        setUserData(prev => ({ ...prev, learningStyle: styleId }));
        setStep('exam-quiz');
    };

    // --- STEP 3: BLOQUEO EXAMEN (NUEVO) ---
    const examOptions = [
        { id: 'nerves', label: 'Me quedo en blanco por los nervios', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
        { id: 'time', label: 'No me da tiempo a acabar', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'confusion', label: 'Confundo conceptos y me lío', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    const selectExamBlock = (blockId) => {
        setUserData(prev => ({ ...prev, examBlock: blockId }));
        setStep('villain');
    };

    // --- STEP 3: VILLANO ---
    const handleVillainSubmit = async (e) => {
        e.preventDefault();
        if (userData.villainSubject.trim()) {
            setStep('generating');
            // Little delay to show animation
            setTimeout(() => finishValidating(), 100);
        }
    };

    // --- STEP 4: GENERACIÓN MÁGICA ---
    // --- STEP 4: GENERACIÓN MÁGICA ---
    const finishValidating = async () => {
        // 0. PREPARAR DATOS VISUALES (Hacerlo antes para evitar "mapa blanco" si falla la DB)
        let varkStyle = 'Visual';
        if (userData.learningStyle === 'auditory') varkStyle = 'Auditivo';
        if (userData.learningStyle === 'kinesthetic') varkStyle = 'Kinestésico';
        if (userData.learningStyle === 'reading') varkStyle = 'Lectoescritura';

        const newChartData = [
            { label: 'Visual', value: varkStyle === 'Visual' ? 90 : 40 },
            { label: 'Auditivo', value: varkStyle === 'Auditivo' ? 90 : 40 },
            { label: 'Lector', value: varkStyle === 'Lectoescritura' ? 90 : 40 },
            { label: 'Kinest.', value: varkStyle === 'Kinestésico' ? 90 : 40 },
            { label: 'Global', value: 75 }
        ];
        console.log("📊 Setting Chart Data Early:", newChartData);
        setChartData(newChartData);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            // 1. Auto-Creación / Actualización de Estudiante
            let targetId = studentId;

            if (!targetId) {
                // Modo "Nuevo Usuario": Crear estudiante silenciosamente
                // Primero verificamos si ya existe uno (por si acaso)
                const { data: existing } = await supabase.from('students').select('id').eq('parent_id', user.id).maybeSingle();

                if (existing) {
                    targetId = existing.id;
                    await supabase.from('students').update({ first_name: userData.name, full_name: userData.name }).eq('id', targetId);
                } else {
                    // Crear nuevo
                    const { data: newStudent, error: createError } = await supabase.from('students').insert({
                        parent_id: user.id,
                        first_name: userData.name,
                        full_name: userData.name,
                        grade_level: '4º Primaria', // Default seguro
                        education_level: 'primaria',
                        challenge_level: 'standard',
                        editorial_math: 'Santillana', // Default popular
                        learning_style: userData.learningStyle // Semilla inicial
                    }).select().single();

                    if (createError) throw createError;
                    targetId = newStudent.id;
                }
            } else {
                // Modo Edición: Actualizar existente
                await supabase.from('students').update({ first_name: userData.name, full_name: userData.name }).eq('id', targetId);
            }

            // 2. Guardar Learning Profile (Estilo)
            const { error: lpError } = await supabase
                .from('learning_profiles')
                .upsert({
                    student_id: targetId,
                    vark_dominant: varkStyle,
                    vark_scores: null,
                    last_updated: new Date().toISOString()
                }, { onConflict: 'student_id' });

            if (lpError) console.error("Error saving LP:", lpError);

            // 3. GENERAR EL REGALO (Primer Recurso)
            let blockAdvice = "";
            if (userData.examBlock === 'nerves') blockAdvice = "Incluye una técnica de respiración o gestión emocional (SEL) al principio.";
            if (userData.examBlock === 'time') blockAdvice = "Enfócate en la velocidad y gestión del tiempo (Pomodoro).";
            if (userData.examBlock === 'confusion') blockAdvice = "Usa la técnica Feynman para clarificar conceptos básicos.";

            // Fallback content
            let generatedContent = {
                title: `Plan Anti-Villano para ${userData.villainSubject}`,
                intro: `Hola ${userData.name}. He diseñado esto pensando en tu estilo ${varkStyle}.`,
                theory_recap: `Para tu bloqueo (${userData.examBlock}), te recomiendo: ${blockAdvice}`,
                type: "ROADMAP",
                sections: [
                    {
                        title: "Misión Inicial",
                        questions: [{ text: "¿Qué es lo más difícil de este tema?", feedback: "Identificar el problema es el primer paso." }]
                    }
                ]
            };

            // Generar contenido personalizado con IA
            const prompt = `
                ACTÚA COMO: Un Mentor de Superhéroes Educativo.
                CLIENTE: Estudiante de ${userData.grade} llamado ${userData.name}.
                MISIÓN: Vencer a la asignatura villana "${userData.villainSubject}".
                PERFIL: Estilo de aprendizaje ${varkStyle}.
                DEBILIDAD: En los exámenes sufre de "${userData.examBlock}" (${blockAdvice}).

                TAREA: Genera UN SOLO JSON con 3 REGALOS DISTINTOS:
                1. "gift_theory": Una Guía de Estudio (Chear Sheet).
                2. "gift_quiz": Un pequeño examen de 3 preguntas.
                3. "gift_strategy": La estrategia psicopedagógica personalizada.

                JSON SCHEMA STRICTO:
                {
                   "gift_theory": {
                        "title": "Hoja de Trucos: [Villano]",
                        "content": "Markdown visual con emojis y listas explicando un tema clave de [Villano] para [Curso].",
                        "tags": ["Teoría", "Visual"]
                   },
                   "gift_quiz": {
                        "title": "Reto Rápido: [Villano]",
                        "questions": [
                            {"text": "¿Pregunta?", "options": ["A","B","C"], "correct": 0, "feedback": "Explicación"}
                        ],
                        "tags": ["Práctica", "Quiz"]
                   },
                   "gift_strategy": {
                       "title": "Manual Secreto de [Nombre]",
                       "content": "Markdown explicando:\n1. Cómo usar el estilo ${varkStyle} (Visual/Auditivo/etc).\n2. Cómo vencer el bloqueo ${userData.examBlock}.\n3. Truco final.",
                       "tags": ["Estrategia", "Personal"]
                   }
                }
            `;

            try {
                const aiResult = await generateWorksheet({
                    profile: { grade_level: userData.grade },
                    subject: { name: userData.villainSubject },
                    topic: 'Técnicas de Estudio',
                    activityType: 'Estrategia',
                    config: { difficulty: 'Media', numQuestions: 1 }, // Fix: Mínimo 1 para evitar errores
                    observations: prompt
                });

                // Intentar parsear
                let parsedAI = null;
                try {
                    parsedAI = JSON.parse(aiResult);
                } catch (e) {
                    const jsonMatch = aiResult.match(/\{[\s\S]*\}/);
                    if (jsonMatch) parsedAI = JSON.parse(jsonMatch[0]);
                }

                if (parsedAI && parsedAI.title) {
                    generatedContent = parsedAI;
                } else {
                    throw new Error("JSON IA incompleto");
                }

            } catch (aiErr) {
                console.warn("⚠️ AI Failed. Using Smart Fallback:", aiErr.message);

                // --- SMART FALLBACK (PLAN B PERSONALIZADO) ---
                // Si la IA falla, usamos plantillas locales pero CON LOS DATOS REALES.
                generatedContent = {
                    title: `Plan Maestro contra ${userData.villainSubject}`,
                    intro: `¡Hola ${userData.name}! He analizado tu perfil de ${userData.grade}.`,
                    theory_recap: `
### 🧠 Tu Superpoder: ${varkStyle}
He detectado que aprendes mejor conectando conceptos. Como dijiste que tu villano es **${userData.villainSubject}**, aquí tienes mi estrategia:

### ⚔️ Arma Secreta (Modo ${varkStyle})
No intentes memorizar todo de golpe. Usa ${varkStyle === 'Visual' ? 'colores y mapas mentales' : (varkStyle === 'Auditivo' ? 'grabaciones de voz explicando el tema' : 'ejemplos prácticos y movimientos')} para hackear tu cerebro.

### 🛡️ Escudo Anti-Bloqueo
Para vencer ese "${userData.examBlock}", divide el estudio en misiones de 15 minutos. Si te atascas, cambia de tarea inmediatamente.

---\n
**¿Probamos esto ahora?**
[CREAR MI ARMA PARA ${userData.villainSubject.toUpperCase()}](/generator?subject=${encodeURIComponent(userData.villainSubject)}&grade=${encodeURIComponent(userData.grade)})`,
                    type: "STRATEGY",
                    sections: []
                };
            }

            // 4. ADAPTADOR TRIPLE REGALO (Mochila 'Wow')
            let giftsToSave = [];

            if (generatedContent.gift_theory) {
                // Caso A: La IA generó los 3 regalos correctamente
                giftsToSave = [
                    { ...generatedContent.gift_theory, type: 'STUDY_GUIDE', topic: 'Teoría' },
                    { ...generatedContent.gift_quiz, type: 'QUIZ', topic: 'Práctica' },
                    { ...generatedContent.gift_strategy, type: 'STRATEGY', topic: 'Estrategia' }
                ];
            } else {
                // Caso B: Fallback o Formato Antiguo -> Generamos los 3 regalos manualmente para asegurar el Wow
                giftsToSave = [
                    {
                        title: `Hoja de Trucos: ${userData.villainSubject}`,
                        content: { intro: `### 🚀 Resumen Rápido para ${userData.grade}\n\nAquí tienes lo básico para aprobar.\n\n* **Punto Clave 1:** Recuerda siempre las bases.\n* **Punto Clave 2:** Usa colores para diferenciar términos.\n\n> "El éxito es la suma de pequeños esfuerzos."`, sections: [] },
                        type: 'STUDY_GUIDE',
                        topic: 'Teoría',
                        tags: ['Resumen', 'Básico']
                    },
                    {
                        title: `Mini-Reto: ${userData.villainSubject}`,
                        questions: [
                            { id: "q1", text: `¿Estás listo para aprobar ${userData.villainSubject}?`, options: ["¡Sí!", "Claro que sí", "Por supuesto"], correct: 0, feedback: "Esa es la actitud." },
                            { id: "q2", text: `Pregunta de prueba nivel ${userData.grade}`, options: ["Opción A", "Opción correcta", "Opción C"], correct: 1, feedback: "¡Correcto!" },
                            { id: "q3", text: `¿Cuál es el truco para sacar un 10?`, options: ["Estudiar", "Dormir", "Comer"], correct: 0, feedback: "Exacto." }
                        ],
                        type: 'QUIZ',
                        topic: 'Práctica',
                        tags: ['Quiz', 'Inicio']
                    },
                    {
                        title: `Estrategia Secreta de ${userData.name}`,
                        content: generatedContent, // Usamos el contenido estratégico que ya teníamos (generado o fallback)
                        type: 'STRATEGY',
                        topic: 'Estrategia',
                        tags: ['Personal', 'Mentoring']
                    }
                ];
            }

            console.log("🎁 Guardando 3 Regalos:", giftsToSave);

            const savePromises = giftsToSave.map(gift => {
                // Preparar payload según tipo (Quiz usa 'questions', otros 'content')
                let finalContent = gift.content;
                if (gift.type === 'QUIZ') {
                    finalContent = { sections: [{ title: 'Quiz Inicial', questions: gift.questions }] };
                }

                return supabase.from('resource_library').insert({
                    student_id: targetId,
                    title: gift.title,
                    description: gift.content?.intro || `Regalo personalizado de bienvenida`,
                    resource_type: gift.type,
                    subject: userData.villainSubject,
                    topic: gift.topic || 'General',
                    content: finalContent,
                    is_public: false,
                    is_curated: false,
                    user_engagement_score: 1
                });
            });

            try {
                await Promise.all(savePromises);
                console.log("✅ Pack de Bienvenida guardado correctamente.");
            } catch (saveErr) {
                console.error("Error guardando regalos:", saveErr);
                // No bloqueamos el éxito, el usuario ya está dentro
            }
            // Alert para confirmar que el código llegó aquí
            // alert(`✅ REGALO GUARDADO CORRECTAMENTE\nStudent ID: ${targetId}`);

            // TODO OK
            setStep('success');

        } catch (error) {
            console.error("Wizard Critical Error:", error);
            // Mostrar error real para debugging
            alert(`Error de Conexión: ${error.message || JSON.stringify(error)}`);
            // Seguimos intentando mostrar success
            setStep('success');
        }
    };


    // --- RENDERIZADO ---

    if (step === 'welcome') return (
        <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(99,102,241,0.5)] animate-bounce">
                <Rocket className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                ¡Hola! Soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">EduAnalytics</span>.
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mb-8 leading-relaxed">
                Soy tu copulito de aprendizaje. Necesito conocerte un poco para calibrar mis sensores.
            </p>

            <form onSubmit={handleNameSubmit} className="w-full max-w-md space-y-4 bg-slate-800/50 p-6 rounded-[32px] border border-slate-700 backdrop-blur-sm shadow-2xl">
                <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">¿Cómo te llamas?</label>
                    <input
                        type="text"
                        placeholder="Ej: Sofía"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-900/80 border-2 border-slate-700 text-xl font-bold text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
                        autoFocus
                    />
                </div>

                <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">¿En qué curso estás?</label>
                    <select
                        value={userData.grade}
                        onChange={(e) => setUserData({ ...userData, grade: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-900/80 border-2 border-slate-700 text-lg font-bold text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled className="text-slate-500">Selecciona tu curso...</option>
                        {GRADES.map(g => (
                            <option key={g} value={g} className="text-slate-900 bg-white">{g}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!userData.name.trim() || !userData.grade}
                    className="w-full py-5 mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-lg uppercase tracking-widest hover:scale-[1.02] hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-xl"
                >
                    Comenzar Aventura
                </button>
            </form>
        </div>
    );

    if (step === 'visual-quiz') return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                Encantado, <span className="text-indigo-600 decoration-4 underline decoration-indigo-200">{userData.name}</span>.
            </h2>
            <p className="text-lg text-slate-500 mb-12 max-w-xl">
                Vamos a calibrar el sistema para tu cerebro. <br />
                <b>Pregunta Rápida:</b> Estás en clase y el tema es un poco aburrido... ¿Qué sueles hacer instintivamente?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {quizOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => selectStyle(opt.id)}
                        className={`group relative p-8 rounded-[32px] border-2 border-slate-100 hover:border-${opt.color.split('-')[1]}-200 ${opt.bg} hover:shadow-xl hover:-translate-y-1 transition-all text-left flex items-center gap-6`}
                    >
                        <div className={`p-4 bg-white rounded-2xl shadow-sm ${opt.color}`}>
                            <opt.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                {opt.label}
                            </h3>
                        </div>
                        <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6 text-slate-400" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    if (step === 'exam-quiz') return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                Una cosa más...
            </h2>
            <p className="text-lg text-slate-500 mb-12 max-w-xl">
                ¿Cuál es tu peor pesadilla en un examen?
            </p>

            <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
                {examOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => selectExamBlock(opt.id)}
                        className={`group relative p-6 rounded-[32px] border-2 border-slate-100 hover:border-${opt.color.split('-')[1]}-200 ${opt.bg} hover:shadow-xl hover:-translate-y-1 transition-all text-left flex items-center gap-6`}
                    >
                        <div className={`p-4 bg-white rounded-2xl shadow-sm ${opt.color}`}>
                            <opt.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-black transition-colors">
                                {opt.label}
                            </h3>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    if (step === 'villain') return (
        <div className="fixed inset-0 z-[200] bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white animate-in slide-in-from-right duration-500">
            <div className="max-w-2xl w-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-500/30">
                    <Crown className="w-4 h-4" /> Último Paso
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                    ¿Cuál es tu "Villano Final"?
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    Dime esa asignatura o tema que se te resiste. <br />
                    Voy a preparar un <b>Plan Secreto</b> para que la domines.
                </p>

                <form onSubmit={handleVillainSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Ej: Matemáticas, Historia, Física..."
                        value={userData.villainSubject}
                        onChange={(e) => setUserData({ ...userData, villainSubject: e.target.value })}
                        className="w-full px-8 py-6 rounded-[24px] bg-white/10 backdrop-blur-md border-2 border-white/10 text-center text-3xl font-bold text-white placeholder:text-white/20 focus:border-emerald-400 focus:outline-none focus:bg-white/20 transition-all"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!userData.villainSubject.trim()}
                        className="w-full py-5 rounded-full bg-emerald-500 text-white font-black text-lg uppercase tracking-widest hover:bg-emerald-400 hover:scale-[1.02] shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                    >
                        <Sparkles className="w-6 h-6" />
                        Generar Mi Estrategia
                    </button>
                </form>
            </div>
        </div>
    );

    if (step === 'generating') return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-32 h-32 relative mb-12">
                <div className="absolute inset-0 border-8 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-indigo-600 animate-pulse" />
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-4 animate-pulse">
                Diseñando Estrategia para {userData.villainSubject}...
            </h2>
            <div className="space-y-4 text-slate-500 font-medium">
                <p className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Optimizando para perfil {userData.learningStyle}...
                </p>
                <p className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000">
                    <Crown className="w-4 h-4 text-amber-500" />
                    Consultando estrategias de Alto Rendimiento...
                </p>
                <p className="flex items-center justify-center gap-2 text-indigo-600 font-bold animate-in fade-in slide-in-from-bottom-2 duration-700 delay-2000">
                    <Rocket className="w-4 h-4" />
                    ¡Ya casi está! Llenando tu mochila...
                </p>
            </div>
        </div>
    );

    if (step === 'success') return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
            <div className="bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Perfil Sincronizado
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">
                ¡Análisis Completado!
            </h2>
            <p className="text-slate-500 mb-8 max-w-lg">
                Hemos generado tu <b>Mapa de Poderes</b> inicial.
                <br />Tu estrategia secreta ya está en tu mochila.
            </p>

            <div className="mb-10 p-8 bg-white rounded-[40px] shadow-xl border border-indigo-50 hover:scale-105 transition-transform">
                <RadarChart data={chartData} size={280} />
            </div>

            <button
                onClick={() => onComplete({
                    topic: userData.villainSubject,
                    block: userData.examBlock
                })}
                className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg uppercase tracking-widest hover:bg-indigo-500 hover:scale-105 shadow-xl shadow-indigo-500/30 transition-all flex items-center gap-3"
            >
                <BookOpen className="w-6 h-6" />
                ABRIR MOCHILA SECRETA
            </button>
            <p className="mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest opacity-60">
                Paso Final
            </p>
        </div>
    );

    return null;
};

export default OnboardingWizard;
