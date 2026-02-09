import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
    Brain,
    Target,
    Zap,
    TrendingUp,
    ShieldCheck,
    AlertTriangle,
    Info,
    ChevronRight,
    Trophy,
    Activity,
    Compass,
    Sparkles,
    BookOpen,
    Calendar,
    CheckCircle,
    Trash2
} from 'lucide-react';
import RadarChart from './RadarChart';
import ChaeaTest from './diagnostics/ChaeaTest';
import VarkTest from './diagnostics/VarkTest';
import MITest from './diagnostics/MITest';

import OnboardingWizard from './OnboardingWizard';

const StudentInsightsDashboard = ({ studentId, onNavigate }) => {
    const [screenings, setScreenings] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [roadmaps, setRoadmaps] = useState([]);
    const [testView, setTestView] = useState(null);
    const [learningProfile, setLearningProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('OVERVIEW'); // OVERVIEW, COGNITIVE, PROGRESS
    const [showWizard, setShowWizard] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, [studentId]);

    const fetchAllData = async () => {
        try {
            setLoading(true);

            const [screeningsRes, evaluationsRes, profileRes, roadmapsRes] = await Promise.all([
                supabase
                    .from('nee_screenings')
                    .select('*')
                    .eq('student_id', studentId)
                    .order('created_at', { ascending: false }),
                supabase
                    .from('resultados_evaluacion')
                    .select('*')
                    .eq('student_id', studentId)
                    .order('created_at', { ascending: false }),
                supabase
                    .from('learning_profiles')
                    .select('*')
                    .eq('student_id', studentId)
                    .maybeSingle(),
                supabase
                    .from('exam_roadmaps')
                    .select('*')
                    .eq('student_id', studentId)
                    .order('created_at', { ascending: false })
            ]);

            setScreenings(screeningsRes.data || []);
            setEvaluations(evaluationsRes.data || []);
            setLearningProfile(profileRes.data || null);
            setRoadmaps(roadmapsRes.data || []);

            // Trigger Onboarding if no learning profile exists
            if (!profileRes.data) {
                setShowWizard(true);
            }

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="p-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 font-bold">Generando Mapa de Inteligencia...</p>
        </div>
    );

    if (showWizard) {
        return <OnboardingWizard studentId={studentId} onComplete={() => {
            setShowWizard(false);
            fetchAllData();
            setShowSuccessModal(true);
        }} />;
    }

    if (testView) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <button
                    onClick={() => setTestView(null)}
                    className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                >
                    <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                </button>
                <div className="bg-white rounded-[40px] shadow-xl p-8 border border-slate-100">
                    {testView === 'CHAEA' && (
                        <ChaeaTest
                            studentId={studentId}
                            onComplete={() => { fetchAllData(); setTestView(null); }}
                            onCancel={() => setTestView(null)}
                        />
                    )}
                    {testView === 'VARK' && (
                        <VarkTest
                            studentId={studentId}
                            onComplete={() => { fetchAllData(); setTestView(null); }}
                            onCancel={() => setTestView(null)}
                        />
                    )}
                    {testView === 'MI' && (
                        <MITest
                            studentId={studentId}
                            onComplete={() => { fetchAllData(); setTestView(null); }}
                            onCancel={() => setTestView(null)}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Lógica para consolidar riesgos
    // Lógica para consolidar riesgos
    const getLatestRisk = (type) => {
        // 1. Buscamos test específico (Detailed Game/Test)
        const specific = screenings.find(s => s.type === type);
        if (specific) return specific.risk_level;

        // 2. Si no, buscamos en la Entrevista General (General Primary/Secondary)
        const general = screenings.find(s => s.type.includes('GENERAL'));
        if (general && general.data && general.data.scores) {
            // Mapeo de claves: Dashboard uses DYSLEXIA, DB/Questions uses DISLEXIA
            const dbKey = type === 'DYSLEXIA' ? 'DISLEXIA' : type;
            const score = general.data.scores[dbKey] || 0;

            // Umbrales definidos en EarlyDetectionPrimary (9 = High, 5 = Medium)
            if (score >= 9) return 'HIGH';
            if (score >= 5) return 'MEDIUM';
        }
        return 'LOW';
    };

    const riskLevels = {
        DYSLEXIA: getLatestRisk('DYSLEXIA'),
        TDAH: getLatestRisk('TDAH'),
        AACC: getLatestRisk('AACC')
    };

    // Calcular estadísticas para el Radar Chart
    const getCognitiveStats = () => {
        // Valores por defecto
        const stats = {
            atencion: 70,
            logica: 65,
            lenguaje: 75,
            memoria: 60,
            creatividad: 80
        };

        if (screenings.length > 0) {
            screenings.forEach(s => {
                if (s.type === 'TDAH' || s.type === 'GENERAL_PRIMARY' || s.type === 'GENERAL_SECONDARY') {
                    // Ajustamos atención inversamente al riesgo
                    if (s.risk_level === 'HIGH') stats.atencion = 40;
                    else if (s.risk_level === 'MEDIUM') stats.atencion = 60;
                }
                if (s.type === 'AACC') {
                    if (s.risk_level === 'HIGH') stats.logica = 95;
                    else if (s.risk_level === 'MEDIUM') stats.logica = 85;
                }
                if (s.type === 'DYSLEXIA') {
                    if (s.risk_level === 'HIGH') stats.lenguaje = 40;
                    else if (s.risk_level === 'MEDIUM') stats.lenguaje = 60;
                }
                // Si es un juego, los datos están en s.data
                if (s.source === 'STUDENT_GAME' && s.data) {
                    if (s.type === 'AACC') stats.logica = Math.min(100, (s.data.score / 5) * 100);
                    if (s.type === 'DYSLEXIA') stats.lenguaje = s.data.accuracy || stats.lenguaje;
                    if (s.type === 'TDAH') stats.atencion = Math.max(20, 100 - (s.data.commissions * 10));
                }
            });
        }

        return [
            { label: 'Atención', value: stats.atencion },
            { label: 'Lógica', value: stats.logica },
            { label: 'Lenguaje', value: stats.lenguaje },
            { label: 'Memoria', value: stats.memoria },
            { label: 'Creatividad', value: stats.creatividad }
        ];
    };

    const getMIRadarData = () => {
        if (!learningProfile?.multiple_intelligences) return [];
        const mi = learningProfile.multiple_intelligences;
        return [
            { label: 'LING', value: (mi.linguistic || 0.5) * 100 },
            { label: 'LOG', value: (mi.logical || 0.5) * 100 },
            { label: 'ESP', value: (mi.spatial || 0.5) * 100 },
            { label: 'KIN', value: (mi.kinesthetic || 0.5) * 100 },
            { label: 'MUS', value: (mi.musical || 0.5) * 100 },
            { label: 'NAT', value: (mi.naturalistic || 0.5) * 100 },
            { label: 'INTER', value: (mi.interpersonal || 0.5) * 100 },
            { label: 'INTRA', value: (mi.intrapersonal || 0.5) * 100 }
        ];
    };

    const radarData = getCognitiveStats();
    const miRadarData = getMIRadarData();

    // Combine and deduplicate events (Aggressive Filtering)
    const combinedEvents = [
        ...screenings.map(s => ({ ...s, eventType: 'SCREENING' })),
        ...roadmaps.map(r => ({ ...r, eventType: 'ROADMAP', created_at: r.created_at || r.exam_date }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .filter((v, i, a) => {
            // Filter out ALL Screenings (Interviews/Games) from the timeline list
            // because they are now properly displayed in the "Evaluación Inteligente" Grid above.
            // This prevents the "2x" redundancy.
            if (v.eventType === 'SCREENING') return false;

            // Generamos una "firma" única para cada evento
            // Si es ROADMAP: Tipo + Tema + Fecha (Ej: ROADMAP-Matemáticas-Mon Dec 30 2024)
            const getKey = (item) => {
                const dateStr = new Date(item.created_at).toDateString();
                const typeStr = item.eventType;
                const contentStr = item.eventType === 'ROADMAP' ? item.topic : item.source;
                return `${typeStr}-${contentStr}-${dateStr}`;
            };
            return a.findIndex(t => getKey(t) === getKey(v)) === i;
        });

    const handleTestClick = (testType) => {
        if (!learningProfile) {
            setTestView(testType);
            return;
        }

        let resultData = null;
        let title = '';
        let scores = {};
        let analysis = '';

        if (testType === 'CHAEA' && learningProfile.chaea_results) {
            title = 'Test CHAEA (Estilos de Aprendizaje)';
            scores = learningProfile.chaea_results;
            analysis = `Estilo dominante: ${learningProfile.chaea_results.dominant || 'N/A'}`;
            resultData = learningProfile.chaea_results;
        } else if (testType === 'VARK' && learningProfile.vark_scores) {
            title = 'Test VARK (Canales Sensoriales)';
            scores = learningProfile.vark_scores;
            analysis = `Canal dominante: ${learningProfile.vark_dominant}`;
            resultData = learningProfile.vark_scores;
        } else if (testType === 'MI' && learningProfile.multiple_intelligences) {
            title = 'Inteligencias Múltiples';
            scores = learningProfile.multiple_intelligences;
            analysis = 'Distribución de inteligencias según Gardner.';
            resultData = learningProfile.multiple_intelligences;
        }

        if (resultData) {
            setSelectedScreening({
                type: title,
                created_at: learningProfile.last_updated || new Date().toISOString(),
                ai_analysis: analysis,
                data: { scores: scores },
                recommendations: [
                    { category: 'Resultado', message: 'Prueba completada y registrada en tu perfil de aprendizaje.' }
                ]
            });
        } else {
            setTestView(testType);
        }
    };

    return (
        <div className="bg-slate-50 w-full p-6 md:p-8 space-y-8 font-sans">
            {/* Header: El "Cerebro" del Estudiante */}
            {/* Header: El "Cerebro" del Estudiante */}
            <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 rounded-[40px] shadow-2xl p-8 border border-slate-800 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -ml-32 -mb-32 opacity-20 blur-3xl"></div>

                <div className="relative z-10 w-32 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-[35px] flex items-center justify-center shadow-xl rotate-3">
                    <Brain className="w-16 h-16 text-white" />
                </div>

                <div className="relative z-10 flex-grow text-center md:text-left space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight">Mapa de Potencial Educativo</h2>
                    <p className="text-indigo-100 max-w-lg leading-relaxed">
                        Visualización avanzada de patrones cognitivos, riesgos de aprendizaje y fortalezas detectadas mediante IA.
                    </p>
                </div>

                <div className="relative z-10 flex gap-4">
                    <div className="px-6 py-3 bg-white/10 text-white rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                        <span className="block text-2xl font-black">{screenings.length}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Cribados</span>
                    </div>
                    <div className="px-6 py-3 bg-white/10 text-white rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                        <span className="block text-2xl font-black">{evaluations.length}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Sesiones</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Lateral: Estados de Alerta (Modern Card Design) */}
                <div className="md:col-span-4 space-y-6">


                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2">Monitor de Atención Temprana</h3>

                    {[
                        { id: 'DYSLEXIA', label: 'Lectoescritura', icon: Brain, color: 'blue' },
                        { id: 'TDAH', label: 'Funciones Ejecutivas', icon: Zap, color: 'orange' },
                        { id: 'AACC', label: 'Habilidades Complejas', icon: Trophy, color: 'purple' }
                    ].map(item => (
                        <div
                            key={item.id}
                            onClick={() => {
                                // Find the screening source for this risk (Priority: Specific Test -> General Screening)
                                const sourceScreening = screenings.find(s => s.type === item.id) || screenings.find(s => s.type.includes('GENERAL'));
                                if (sourceScreening) setSelectedScreening(sourceScreening);
                            }}
                            className="bg-white rounded-[32px] p-6 shadow-lg border border-gray-50 flex items-center justify-between hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer group"
                            title="Ver informe detallado"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 bg-${item.color}-100 text-${item.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-indigo-500 transition-colors">{item.id}</span>
                                </div>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${riskLevels[item.id] === 'HIGH' ? 'bg-red-50 text-red-600 border-red-100' :
                                (riskLevels[item.id] === 'MEDIUM' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-emerald-600 border-green-100')
                                }`}>
                                {riskLevels[item.id] === 'HIGH' ? 'RECOM. EVALUACIÓN' : (riskLevels[item.id] === 'MEDIUM' ? 'SEGUIMIENTO' : 'ESTABLE')}
                            </div>
                        </div>
                    ))}

                    {/* ⭐ NUEVO: RADAR COGNITIVO ⭐ */}
                    <div className="bg-white rounded-[32px] p-8 shadow-xl border border-indigo-50 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-4">
                            <Brain className="w-4 h-4 text-indigo-500" />
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Mapa de Poderes</h4>
                        </div>
                        <RadarChart data={radarData} size={260} />
                        <div className="mt-4 text-center">
                            <p className="text-[10px] text-gray-400 font-medium max-w-[200px] leading-relaxed italic">
                                Este mapa visualiza el equilibrio de procesos cognitivos detectado.
                            </p>
                        </div>
                    </div>



                    <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[32px] text-white space-y-4">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                            <Compass className="w-4 h-4" /> Adaptación Pedagógica Activa
                        </div>
                        <div className="space-y-3">
                            {riskLevels.TDAH !== 'LOW' && (
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0"></div>
                                    <p className="text-[11px] text-gray-300"><b>Modo Enfoque:</b> La IA inserta pausas activas y recordatorios.</p>
                                </div>
                            )}
                            {riskLevels.DYSLEXIA !== 'LOW' && (
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                    <p className="text-[11px] text-gray-300"><b>Lectura Amigable:</b> Se priorizan enunciados cortos y fuentes claras.</p>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                                <p className="text-[11px] text-gray-300"><b>Micro-pasos:</b> Conceptos divididos para evitar saturación cognitiva.</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-indigo-300 italic pt-2 border-t border-white/10 text-center">
                            "Adaptación basada en el perfil actual"
                        </p>
                    </div>
                </div>

                {/* Main Content: La Línea de Vida (Timeline) */}
                <div className="md:col-span-8 space-y-8">
                    <div className="bg-white rounded-[40px] shadow-xl p-8 border border-gray-100 min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                <Activity className="text-indigo-600" /> Evaluación Inteligente
                            </h3>
                            <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                                <button
                                    onClick={() => setActiveTab('OVERVIEW')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'OVERVIEW' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                                >
                                    Diagnóstico
                                </button>
                                <button
                                    onClick={() => setActiveTab('PROGRESS')}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'PROGRESS' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                                >
                                    Resultados
                                </button>
                            </div>
                        </div>

                        {activeTab === 'OVERVIEW' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {/* 1. Entrevista */}
                                {(() => {
                                    const interviewScreening = screenings.find(s => s.type.includes('GENERAL'));
                                    return (
                                        <div onClick={() => interviewScreening ? setSelectedScreening(interviewScreening) : onNavigate('QUESTIONNAIRE')} className="cursor-pointer border border-indigo-50 bg-indigo-50/30 p-4 rounded-3xl hover:bg-indigo-50 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm"><Activity className="w-5 h-5" /></div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-800">Entrevista Familiar</h4>
                                                    <p className="text-[10px] text-slate-500 font-medium">Contexto y Antecedentes</p>
                                                </div>
                                            </div>
                                            {interviewScreening ?
                                                <div className="bg-green-100 text-green-700 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div> :
                                                <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-600" />
                                            }
                                        </div>
                                    );
                                })()}
                                {/* 2. CHAEA */}
                                <div onClick={() => handleTestClick('CHAEA')} className="cursor-pointer border border-blue-50 bg-blue-50/30 p-4 rounded-3xl hover:bg-blue-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><BookOpen className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800">Test CHAEA</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Estilos de Aprendizaje</p>
                                        </div>
                                    </div>
                                    {learningProfile?.chaea_results ?
                                        <div className="bg-green-100 text-green-700 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div> :
                                        <ChevronRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600" />
                                    }
                                </div>
                                {/* 3. VARK */}
                                <div onClick={() => handleTestClick('VARK')} className="cursor-pointer border border-purple-50 bg-purple-50/30 p-4 rounded-3xl hover:bg-purple-50 transition-colors flex items-center justify-between group relative">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl text-purple-600 shadow-sm"><Zap className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800">Test VARK</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Canal Sensorial</p>
                                        </div>
                                    </div>
                                    {learningProfile?.vark_scores ? (
                                        <div className="relative group/check">
                                            <div className="bg-green-100 text-green-700 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div>
                                            <div className="absolute right-0 -top-8 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-lg opacity-0 group-hover/check:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none z-10">
                                                {learningProfile.vark_dominant || 'Completado'}
                                            </div>
                                        </div>
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-purple-300 group-hover:text-purple-600" />
                                    )}
                                </div>
                                {/* 4. IM */}
                                <div onClick={() => handleTestClick('MI')} className="cursor-pointer border border-emerald-50 bg-emerald-50/30 p-4 rounded-3xl hover:bg-emerald-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl text-emerald-600 shadow-sm"><Brain className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800">Inteligencias Múlt.</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Talentos de Gardner</p>
                                        </div>
                                    </div>
                                    {learningProfile?.multiple_intelligences ?
                                        <div className="bg-green-100 text-green-700 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div> :
                                        <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-600" />
                                    }
                                </div>
                            </div>
                        )}

                        {activeTab === 'OVERVIEW' ? (
                            combinedEvents.length === 0 ? (
                                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                                        <Info className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-400 font-medium">No hay suficientes datos para generar un historial.</p>
                                    <button onClick={() => onNavigate && onNavigate('QUESTIONNAIRE')} className="text-indigo-600 font-black text-sm hover:underline">Iniciar primera evaluación</button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {combinedEvents.map((item, idx) => (
                                        <div key={idx} className="flex gap-6 group">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-4 h-4 rounded-full ${item.eventType === 'ROADMAP' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : (item.risk_level === 'HIGH' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]')} group-hover:scale-125 transition-transform`}></div>
                                                {idx !== combinedEvents.length - 1 && <div className="flex-grow w-0.5 bg-gray-100 my-2"></div>}
                                            </div>
                                            <div className="flex-grow pb-8">
                                                {item.eventType === 'ROADMAP' ? (
                                                    <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100 group-hover:bg-white group-hover:border-purple-200 group-hover:shadow-lg transition-all">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</span>
                                                                <h5 className="font-black text-gray-900">{item.topic}</h5>
                                                            </div>
                                                            <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-white text-purple-700 border border-purple-100 flex items-center gap-1">
                                                                <BookOpen className="w-3 h-3" /> Plan de Estudio
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mb-4 truncate italic">
                                                            {item.steps?.length || 0} pasos planificados para el examen del {new Date(item.exam_date).toLocaleDateString()}.
                                                        </p>
                                                        <button
                                                            onClick={() => window.location.href = '/generator'}
                                                            className="flex items-center gap-1 text-[10px] font-black text-purple-600 uppercase hover:gap-2 transition-all">
                                                            Ver Plan <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</span>
                                                                <h5 className="font-black text-gray-900">{item.source === 'STUDENT_GAME' ? 'Sesión de Juego Cognitivo' : 'Entrevista Inicial'}</h5>
                                                            </div>
                                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg ${item.risk_level === 'HIGH' ? 'bg-red-100 text-red-700' : (item.risk_level === 'MEDIUM' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700')}`}>
                                                                {item.risk_level}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mb-4 truncate italic">
                                                            {item.ai_analysis || "Patrón detectado correctamente compatible con el rango del estudiante."}
                                                        </p>
                                                        <button
                                                            onClick={() => {
                                                                if (onNavigate) {
                                                                    onNavigate(item.source === 'STUDENT_GAME' ? 'GAMES' : 'QUESTIONNAIRE');
                                                                } else {
                                                                    window.location.href = item.source === 'STUDENT_GAME' ? '/diagnostic/games' : '/diagnostic';
                                                                }
                                                            }}
                                                            className="flex items-center gap-1 text-[10px] font-black text-indigo-600 uppercase hover:gap-2 transition-all">
                                                            Ver detalles <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* Quick Launch Pad - Always visible at bottom of feed */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                                        <button
                                            onClick={() => window.location.href = '/hub?tab=library'}
                                            className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <BookOpen className="w-16 h-16 text-indigo-500" />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                    <BookOpen className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <h4 className="font-bold text-slate-800">Mochila Secreta</h4>
                                                <p className="text-xs text-slate-500 mt-1">Ver tus planes guardados</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => window.location.href = '/generator'}
                                            className="relative p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all text-left group overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Sparkles className="w-16 h-16 text-white" />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                                <h4 className="font-bold text-white">Crear Nueva Arma</h4>
                                                <p className="text-xs text-indigo-100 mt-1">Generar ficha con IA</p>
                                            </div>

                                            {/* TOUR TOOLTIP */}
                                            {showTour && (
                                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 bg-white text-slate-800 p-2 rounded-xl shadow-xl z-50 animate-bounce text-center border-2 border-indigo-500">
                                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-indigo-500 rotate-45 transform"></div>
                                                    <p className="text-[10px] font-bold">
                                                        ¡Aquí! Pulsa para crear tu primera ficha de refuerzo.
                                                    </p>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="space-y-6">
                                {evaluations.length === 0 ? (
                                    <div className="text-center p-20">
                                        <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-400">No hay evaluaciones guardadas aún.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(
                                            evaluations.reduce((acc, curr) => {
                                                const sub = curr.subject_name || "General";
                                                if (!acc[sub]) acc[sub] = { total: 0, score: 0 };
                                                acc[sub].total++;
                                                acc[sub].score += curr.score;
                                                return acc;
                                            }, {})
                                        ).map(([subject, stats]) => (
                                            <div key={subject} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">{subject}</h4>
                                                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black">
                                                        {Math.round((stats.score / stats.total))} / 10
                                                    </div>
                                                </div>
                                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-500 h-full" style={{ width: `${(stats.score / stats.total) * 10}%` }}></div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-2">Basado en {stats.total} fichas completadas</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Insights Footer */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[32px] p-6 text-white shadow-xl shadow-blue-100">
                            <TrendingUp className="w-8 h-8 opacity-50 mb-4" />
                            <h5 className="font-bold text-lg">Curva de Mejora</h5>
                            <p className="text-xs text-blue-100 opacity-80 mt-1">Has mejorado un 15% en atención este mes.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[32px] p-6 text-white shadow-xl shadow-purple-100">
                            <Trophy className="w-8 h-8 opacity-50 mb-4" />
                            <h5 className="font-bold text-lg">Logro Desbloqueado</h5>
                            <p className="text-xs text-purple-100 opacity-80 mt-1">Detective de Patrones Nivel 5.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ NUEVO DISEÑO: PERFIL DE APRENDIZAJE PLANO (2 COLUMNAS) ⭐ */}
            {learningProfile && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* TARJETA 1: ESTILOS Y PROCESAMIENTO */}
                    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-indigo-50 space-y-8 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-gray-900">Estilos de Aprendizaje</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Cómo procesa la información</p>
                            </div>
                        </div>

                        {/* VARK */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100">
                            <h4 className="text-xs font-black text-indigo-800 uppercase tracking-widest mb-4">Modelo VARK Dominante: {learningProfile.vark_dominant}</h4>

                            {learningProfile.vark_scores ? (
                                <div className="flex gap-2 h-24 items-end">
                                    {Object.entries(learningProfile.vark_scores).map(([key, score]) => (
                                        <div key={key} className="flex-1 flex flex-col items-center gap-2 group">
                                            <div className="w-full bg-white rounded-t-xl relative overflow-hidden h-full flex items-end">
                                                <div className="w-full bg-indigo-500 transition-all group-hover:bg-purple-500" style={{ height: `${score * 100}%` }}></div>
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-gray-400">{key[0]}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-xs text-indigo-400 mb-3 italic">Perfil preliminar basado en test rápido.</p>
                                    <button
                                        onClick={() => handleTestClick('VARK')}
                                        className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-transform border border-indigo-100"
                                    >
                                        Refinar Precisión ⚡
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Kolb Cycle */}
                        {learningProfile.kolb_cycle && (
                            <div className="flex-grow bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Compass className="w-4 h-4 text-slate-500" />
                                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">Ciclo de Kolb</h4>
                                </div>
                                <p className="text-sm font-bold text-slate-900 mb-1">{learningProfile.kolb_cycle.dominant}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Su proceso de aprendizaje se centra en la {learningProfile.kolb_cycle.dominant === 'Divergente' ? 'imaginación y resolución creativa' : 'aplicación práctica y técnica'}.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* TARJETA 2: INTELIGENCIAS Y RESUMEN */}
                    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-emerald-50 space-y-8 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-gray-900">Talentos Naturales</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Inteligencias Múltiples</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {learningProfile.multiple_intelligences && (
                                <div className="shrink-0">
                                    <RadarChart data={miRadarData} size={200} />
                                </div>
                            )}
                            <div className="flex-grow space-y-2 w-full">
                                {learningProfile.multiple_intelligences && Object.entries(learningProfile.multiple_intelligences)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 4)
                                    .map(([key, score], idx) => (
                                        <div key={key} className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl w-full">
                                            <span className="text-[10px] font-black uppercase text-slate-500">{key}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full" style={{ width: `${score * 100}%` }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600">{(score * 100).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 mt-auto">
                            <p className="text-xs text-slate-600 italic leading-relaxed text-center">
                                "{learningProfile.ai_summary}"
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {selectedScreening && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedScreening(null)}
                >
                    <div
                        className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Informe de Resultados</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                                        {selectedScreening.type.includes('GENERAL') ? 'Entrevista' : selectedScreening.type}
                                    </span>
                                    <span className="text-gray-400 text-xs font-medium">
                                        {new Date(selectedScreening.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedScreening(null)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors font-bold text-gray-600">
                                ✕
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="grid gap-4">
                                <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-500" /> Observaciones y Recomendaciones
                                </h4>
                                <div className="grid gap-3">
                                    {selectedScreening.recommendations && Array.isArray(selectedScreening.recommendations) && selectedScreening.recommendations.length > 0 ? (
                                        selectedScreening.recommendations.map((rec, i) => (
                                            <div key={i} className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm text-indigo-900/80 leading-relaxed">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-2 h-2 rounded-full ${rec.category?.includes('DISLEXIA') || rec.category?.includes('DYSLEXIA') ? 'bg-blue-400' : (rec.category?.includes('TDAH') ? 'bg-orange-400' : 'bg-purple-400')}`}></div>
                                                    <span className="font-black text-[10px] uppercase tracking-widest opacity-70">{rec.category || 'Observación'}</span>
                                                </div>
                                                {rec.message}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                                            <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2 opacity-50" />
                                            <p className="text-gray-400 text-sm">No se han detectado riesgos significativos.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {selectedScreening.ai_analysis && (
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-purple-500" /> Análisis de IA
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{selectedScreening.ai_analysis}</p>
                                </div>
                            )}

                            {selectedScreening.data && selectedScreening.data.scores && (
                                <div className="grid grid-cols-3 gap-4">
                                    {Object.entries(selectedScreening.data.scores).map(([k, v]) => (
                                        <div key={k} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                                            <span className="block text-[10px] font-bold text-gray-400 uppercase">{k}</span>
                                            <span className="block text-lg font-black text-gray-800">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-[32px]">
                            <button onClick={() => setSelectedScreening(null)} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg">
                                Cerrar Informe
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[48px] p-8 max-w-2xl w-full text-center relative shadow-2xl animate-in zoom-in-95 border-4 border-indigo-500/30 overflow-hidden">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50 to-transparent"></div>

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-1">¡Estrategia Desplegada!</h3>
                            <p className="text-slate-500 font-medium mb-6">He analizado tus respuestas y generado tu perfil inicial.</p>

                            {/* Power Map Preview */}
                            <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 flex flex-col md:flex-row items-center gap-6 text-left relative overflow-hidden group">
                                <div className="absolute top-2 right-2 px-3 py-1 bg-white rounded-full text-[10px] font-bold text-indigo-400 shadow-sm uppercase tracking-widest border border-indigo-50">
                                    Vista Previa
                                </div>
                                <div className="shrink-0 relative">
                                    <RadarChart data={radarData} size={180} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-indigo-500" /> Tu Mapa de Poderes
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        Este gráfico muestra tus fortalezas actuales. <br />
                                        <span className="text-indigo-600 font-bold">¡Lo he guardado en tu Dashboard!</span>
                                        Busca esta misma tarjeta abajo para ver tu evolución.
                                    </p>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                        <Compass className="w-3 h-3" /> Visible siempre en Panel Principal
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => window.location.href = '/hub?tab=library'}
                                    className="col-span-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] hover:shadow-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" /> Abrir Mochila
                                    </div>
                                    <span className="text-[10px] opacity-70 font-normal normal-case">Ver Plan Anti-Villano</span>
                                </button>

                                <button
                                    onClick={() => window.location.href = '/generator'}
                                    className="col-span-1 py-4 bg-white border-2 border-amber-100 text-amber-600 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-50 hover:border-amber-200 transition-all flex flex-col items-center justify-center gap-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" /> Crear Arma
                                    </div>
                                    <span className="text-[10px] opacity-70 font-normal normal-case">Generar nuevo recurso IA</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest mt-6"
                            >
                                Entendido, ir al Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* DEBUG RESET BUTTON */}
            <button
                onClick={async () => {
                    if (confirm('☠️ MODO DEV: ¿Borrar Perfil y Reiniciar Wizard?')) {
                        await supabase.from('learning_profiles').delete().eq('student_id', studentId);
                        window.location.reload();
                    }
                }}
                className="fixed bottom-4 right-4 p-4 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all z-[9999] opacity-50 hover:opacity-100 font-bold flex items-center gap-2"
                title="Reset Onboarding"
            >
                <Trash2 className="w-5 h-5" />
                <span className="text-xs">RESET</span>
            </button>
        </div>
    );
};

export default StudentInsightsDashboard;
