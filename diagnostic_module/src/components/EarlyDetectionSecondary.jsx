import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import {
    ClipboardCheck,
    Brain,
    Zap,
    Trophy,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    AlertCircle,
    BookOpen,
    Layout,
    Clock,
    Target
} from 'lucide-react';

const CATEGORIES = {
    DISLEXIA: {
        id: 'DISLEXIA',
        title: 'Procesamiento Lectoescritor',
        icon: BookOpen,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200'
    },
    TDAH: {
        id: 'TDAH',
        title: 'Funciones Ejecutivas (Atención/Organización)',
        icon: Layout,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
    },
    AACC: {
        id: 'AACC',
        title: 'Potencial Cognitivo (Altas Capacidades)',
        icon: Target,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    }
};

const QUESTIONS = [
    // DISLEXIA SECUNDARIA
    {
        id: 'd1',
        category: 'DISLEXIA',
        text: '¿Sientes que necesitas mucho más tiempo que los demás para leer un tema completo?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'd2',
        category: 'DISLEXIA',
        text: '¿Te cuesta extraer la idea principal de textos largos o entender enunciados complejos?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'd3',
        category: 'DISLEXIA',
        text: '¿Cometes faltas de ortografía frecuentes a pesar de conocer las reglas?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'd4',
        category: 'DISLEXIA',
        text: '¿Te resulta especialmente difícil aprender y pronunciar palabras en inglés u otros idiomas?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },

    // TDAH SECUNDARIA (Foco en Funciones Ejecutivas)
    {
        id: 't1',
        category: 'TDAH',
        text: '¿Sueles dejar las tareas o el estudio para el último momento (procrastinación)?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 't2',
        category: 'TDAH',
        text: '¿Te cuesta horrores mantener tus apuntes, carpetas o habitación organizada?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 't3',
        category: 'TDAH',
        text: '¿Te distraes con tus propios pensamientos incluso cuando no hay ruidos externos?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 't4',
        category: 'TDAH',
        text: '¿Olvidas con frecuencia fechas de exámenes, entregas o materiales necesarios?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },

    // AACC SECUNDARIA
    {
        id: 'a1',
        category: 'AACC',
        text: '¿Te aburres con frecuencia en clase porque sientes que el ritmo es demasiado lento?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'a2',
        category: 'AACC',
        text: '¿Cuestionas las normas o la autoridad si no te parecen lógicas o razonables?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'a3',
        category: 'AACC',
        text: '¿Tienes intereses muy profundos y complejos que investigas por tu cuenta fuera del cole?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    },
    {
        id: 'a4',
        category: 'AACC',
        text: '¿Prefieres trabajar solo porque sientes que los demás no siguen tu ritmo de pensamiento?',
        options: ['Rara vez', 'A veces', 'A menudo', 'Casi siempre']
    }
];

const EarlyDetectionSecondary = ({ studentId, onComplete }) => {
    const [step, setStep] = useState(0);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnswer = (optionIdx) => {
        const question = QUESTIONS[currentQuestionIdx];
        setAnswers(prev => ({ ...prev, [question.id]: optionIdx }));

        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            setStep(2);
            processResults();
        }
    };

    const processResults = async () => {
        setLoading(true);
        const scores = { DISLEXIA: 0, TDAH: 0, AACC: 0 };

        Object.entries(answers).forEach(([qId, val]) => {
            const question = QUESTIONS.find(q => q.id === qId);
            scores[question.category] += val;
        });

        const risks = [];
        Object.entries(scores).forEach(([cat, score]) => {
            let risk = 'LOW';
            if (score >= 9) risk = 'HIGH';
            else if (score >= 5) risk = 'MEDIUM';
            risks.push({ category: cat, score, risk_level: risk });
        });

        const finalResult = {
            student_id: studentId,
            risks: risks,
            timestamp: new Date().toISOString()
        };

        try {
            const { error } = await supabase
                .from('nee_screenings')
                .insert({
                    student_id: studentId,
                    type: 'GENERAL_SECONDARY',
                    source: 'STUDENT_SELF_REPORT',
                    data: { answers, scores },
                    risk_level: risks.some(r => r.risk_level === 'HIGH') ? 'HIGH' : (risks.some(r => r.risk_level === 'MEDIUM') ? 'MEDIUM' : 'LOW'),
                    recommendations: generateRecommendations(risks)
                });

            if (error) throw error;
            setResult(finalResult);
        } catch (err) {
            console.error('Error saving screening:', err);
        } finally {
            setLoading(false);
        }
    };

    const generateRecommendations = (risks) => {
        const recs = [];
        risks.forEach(r => {
            if (r.risk_level === 'HIGH' || r.risk_level === 'MEDIUM') {
                recs.push({
                    category: r.category,
                    message: r.risk_level === 'HIGH'
                        ? `Sugiere un perfil claro de ${CATEGORIES[r.category].title}. Sería beneficioso consultar con el departamento de orientación.`
                        : `Se observan indicadores en el área de ${CATEGORIES[r.category].title}. Un seguimiento de técnicas de estudio específicas sería recomendable.`
                });
            }
        });
        return recs;
    };

    if (step === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
                <div className="p-8 text-center bg-gray-900 text-white">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Radar de Potencial</h2>
                    <p className="text-gray-400 opacity-90 leading-relaxed text-sm">
                        Responde con sinceridad para conocer mejor tu perfil de aprendizaje en secundaria.
                        Este radar te ayudará a entender por qué algunas tareas te cuestan más o por qué te aburren otras.
                    </p>
                </div>
                <div className="p-10 space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Tiempo</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Energía</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Foco</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(1)}
                        className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group shadow-lg"
                    >
                        Empezar Radar
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        );
    }

    if (step === 1) {
        const question = QUESTIONS[currentQuestionIdx];
        const category = CATEGORIES[question.category];
        const progress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <button
                        onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)}
                        className="text-gray-400 hover:text-gray-800 flex items-center gap-1 transition-colors text-xs font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>
                    <div className="h-1.5 flex-grow mx-4 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{currentQuestionIdx + 1}/{QUESTIONS.length}</span>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`p-4 ${category.bgColor} ${category.color} border-b ${category.borderColor} flex items-center gap-3`}>
                        <category.icon className="w-4 h-4" />
                        <span className="font-black text-[10px] uppercase tracking-widest">{category.title}</span>
                    </div>

                    <div className="p-10 space-y-8">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">
                            {question.text}
                        </h3>

                        <div className="grid gap-3">
                            {question.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="p-5 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 text-left transition-all group flex items-center justify-between"
                                >
                                    <span className="font-bold text-gray-700 group-hover:text-emerald-900">{option}</span>
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-emerald-400 transition-colors"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
                {loading ? (
                    <div className="bg-white rounded-3xl p-20 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <h2 className="text-2xl font-black text-gray-900">Procesando tu perfil...</h2>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gray-900 p-8 text-white flex flex-col md:flex-row items-center gap-6">
                                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <div className="text-center md:text-left flex-grow">
                                    <h2 className="text-3xl font-black mb-1">Informe de Radar</h2>
                                    <p className="text-gray-400 text-sm">Tu forma de aprender bajo el microscopio</p>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {result?.risks.map((risk) => {
                                        const cat = CATEGORIES[risk.category];
                                        const riskColor = risk.risk_level === 'HIGH' ? 'text-red-500 bg-red-50' : (risk.risk_level === 'MEDIUM' ? 'text-orange-500 bg-orange-50' : 'text-emerald-500 bg-emerald-50');
                                        return (
                                            <div key={risk.category} className={`p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center`}>
                                                <cat.icon className={`w-8 h-8 mb-4 ${cat.color}`} />
                                                <h4 className="font-bold text-gray-800 text-xs mb-2 leading-tight uppercase tracking-widest">{cat.id}</h4>
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${riskColor}`}>
                                                    {risk.risk_level === 'HIGH' ? 'ALTA PROB.' : (risk.risk_level === 'MEDIUM' ? 'OBSERVACIÓN' : 'NORMAL')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-6 shadow-xl">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-emerald-600" />
                                <h3 className="text-xl font-black text-gray-900 leading-tight">Análisis para tu carrera académica</h3>
                            </div>

                            <div className="space-y-4">
                                {result?.risks.map(r => (
                                    r.risk_level !== 'LOW' && (
                                        <div key={r.category} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <h5 className="font-black text-gray-900 mb-2 uppercase text-xs tracking-widest">{CATEGORIES[r.category].title}</h5>
                                            <p className="text-sm text-gray-600 leading-relaxed italic">
                                                {r.risk_level === 'HIGH'
                                                    ? "Tus respuestas coinciden con perfiles que suelen necesitar adaptaciones metodológicas. No te frustres, es una gran oportunidad para aprender a estudiar diferente."
                                                    : "Existen algunos roces en este área. Prueba con técnicas de estudio visuales o agendas digitales."}
                                            </p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={onComplete}
                            className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg"
                        >
                            Finalizar y Volver
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default EarlyDetectionSecondary;
