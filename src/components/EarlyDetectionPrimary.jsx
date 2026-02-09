import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import {
    Gamepad2,
    ClipboardCheck,
    Brain,
    Search,
    Zap,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Save,
    Waves,
    ShieldCheck,
    Stethoscope,
    MessageSquare,
    Trophy,
    Info
} from 'lucide-react';

const CATEGORIES = {
    DISLEXIA: {
        id: 'DISLEXIA',
        title: 'Lectoescritura (Posible Dislexia)',
        icon: Brain,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    TDAH: {
        id: 'TDAH',
        title: 'Atención e Impulsividad (Posible TDAH)',
        icon: Zap,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
    },
    AACC: {
        id: 'AACC',
        title: 'Desarrollo Cognitivo (Posible AACC)',
        icon: Trophy,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    }
};

const QUESTIONS = [
    // DISLEXIA
    {
        id: 'd1',
        category: 'DISLEXIA',
        text: '¿Tiene dificultades notables para leer palabras nuevas o desconocidas (pseudopalabras)?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'd2',
        category: 'DISLEXIA',
        text: '¿Suele omitir, añadir o sustituir letras al leer o escribir (ej: "lapa" por "pala")?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'd3',
        category: 'DISLEXIA',
        text: '¿Su lectura es lenta, forzada y con silabeo constante a pesar de su edad?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'd4',
        category: 'DISLEXIA',
        text: '¿Muestra una fuerte resistencia o cansancio extremo ante tareas que implican lectura prolongada?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },

    // TDAH
    {
        id: 't1',
        category: 'TDAH',
        text: '¿Se distrae con facilidad ante ruidos o estímulos externos mientras hace tareas?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 't2',
        category: 'TDAH',
        text: '¿Le cuesta organizar sus tareas, pierde materiales o se olvida de lo que tiene que llevar a clase?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 't3',
        category: 'TDAH',
        text: '¿Tiene dificultades para mantenerse sentado o tranquilo cuando la situación lo requiere?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 't4',
        category: 'TDAH',
        text: '¿Interrumpe a los demás o le cuesta esperar su turno en juegos o conversaciones?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },

    // AACC
    {
        id: 'a1',
        category: 'AACC',
        text: '¿Muestra un vocabulario inusualmente amplio y sofisticado para su edad?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'a2',
        category: 'AACC',
        text: '¿Aprende conceptos nuevos con una rapidez sorprendente, necesitando muy pocas repeticiones?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'a3',
        category: 'AACC',
        text: '¿Muestra una curiosidad insaciable, haciendo preguntas profundas sobre cómo funcionan las cosas?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    },
    {
        id: 'a4',
        category: 'AACC',
        text: '¿Se aburre con facilidad en clase cuando se explican temas que ya domina o tareas repetitivas?',
        options: ['Nunca', 'A veces', 'Frecuentemente', 'Casi siempre']
    }
];

const EarlyDetectionPrimary = ({ studentId, onComplete }) => {
    const [step, setStep] = useState(0); // 0: Welcome, 1: Quiz, 2: Analysis
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnswer = (optionIdx) => {
        const question = QUESTIONS[currentQuestionIdx];
        setAnswers(prev => ({
            ...prev,
            [question.id]: optionIdx
        }));

        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            setStep(2);
            processResults();
        }
    };

    const processResults = async () => {
        setLoading(true);

        // Simulación de análisis (esto luego se puede mejorar con Gemini o lógica de scoring)
        const scores = {
            DISLEXIA: 0,
            TDAH: 0,
            AACC: 0
        };

        Object.entries(answers).forEach(([qId, val]) => {
            const question = QUESTIONS.find(q => q.id === qId);
            scores[question.category] += val; // val es 0, 1, 2, 3
        });

        // Máximo score por categoría es 4 preguntas * 3 = 12
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
            // Guardar en Supabase
            const { error } = await supabase
                .from('nee_screenings')
                .insert({
                    student_id: studentId,
                    type: 'GENERAL_PRIMARY',
                    source: 'PARENT_QUESTIONNAIRE',
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
                        ? `Se recomienda encarecidamente una evaluación especializada para ${CATEGORIES[r.category].title}.`
                        : `Se sugiere observar la evolución en el área de ${CATEGORIES[r.category].title} y consultar con el tutor.`
                });
            }
        });
        return recs;
    };

    if (step === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
                <div className="p-8 text-center bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                        <ClipboardCheck className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Entrevista de Contexto Familiar</h2>
                    <p className="text-blue-100 opacity-90 leading-relaxed">
                        Ayúdanos a personalizar la experiencia de aprendizaje respondiendo unas breves preguntas sobre el día a día.
                    </p>
                </div>
                <div className="p-10 space-y-6">
                    <div className="flex gap-4 items-start p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                            <strong>Nota Informativa:</strong> Esto nos ayuda a configurar la IA de EduAnalytics. No es un diagnóstico médico.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                            <p className="text-gray-700">Responde 12 preguntas basadas en el día a día de tu hijo/a.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                            <p className="text-gray-700">El sistema analizará los patrones y generará un informe preliminar.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                            <p className="text-gray-700">Recibirás recomendaciones precisas sobre los siguientes pasos a seguir.</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep(1)}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-200"
                    >
                        Comenzar Evaluación (12 Preguntas)
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
                        className="text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>
                    <div className="text-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pregunta {currentQuestionIdx + 1} de {QUESTIONS.length}</span>
                    </div>
                </div>

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`p-4 ${category.bgColor} ${category.color} border-b ${category.borderColor} flex items-center gap-3`}>
                        <category.icon className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">{category.title}</span>
                    </div>

                    <div className="p-10 space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                            {question.text}
                        </h3>

                        <div className="grid gap-3">
                            {question.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="p-4 rounded-2xl border-2 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-left transition-all group flex items-center justify-between"
                                >
                                    <span className="font-medium text-gray-700 group-hover:text-indigo-900">{option}</span>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 transition-colors"></div>
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
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-indigo-100 rounded-full animate-pulse"></div>
                            <Brain className="absolute inset-0 m-auto w-10 h-10 text-indigo-600 animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Analizando patrones...</h2>
                        <p className="text-gray-500">Estamos cruzando la información para generar tu informe personalizado.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Summary Header */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-indigo-600 p-8 text-white relative flex flex-col md:flex-row items-center gap-6">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-1">Resultado del Cribado</h2>
                                    <p className="text-indigo-100 opacity-90">Evaluación temprana para Educación Primaria</p>
                                </div>
                                <button className="md:ml-auto p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                                    <Save className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {result?.risks.map((risk) => {
                                        const cat = CATEGORIES[risk.category];
                                        return (
                                            <div key={risk.category} className={`p-6 rounded-2xl border ${risk.risk_level === 'HIGH' ? 'bg-red-50 border-red-100' : (risk.risk_level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-100' : 'bg-green-50 border-green-100')}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <cat.icon className={`w-6 h-6 ${risk.risk_level === 'HIGH' ? 'text-red-600' : (risk.risk_level === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600')}`} />
                                                    <h4 className="font-bold text-gray-800 text-sm leading-tight">{cat.id}</h4>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-2xl font-black ${risk.risk_level === 'HIGH' ? 'text-red-700' : (risk.risk_level === 'MEDIUM' ? 'text-yellow-700' : 'text-green-700')}`}>
                                                        {risk.risk_level === 'HIGH' ? 'ALTA' : (risk.risk_level === 'MEDIUM' ? 'MEDIA' : 'BAJA')}
                                                    </span>
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Prioridad</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                <Stethoscope className="w-6 h-6 text-indigo-600" />
                                Siguientes Pasos Recomendados
                            </h3>

                            <div className="space-y-4">
                                {result?.risks.map((risk) => {
                                    if (risk.risk_level === 'LOW') return null;
                                    const cat = CATEGORIES[risk.category];
                                    return (
                                        <div key={risk.category} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                                            <div className={`p-3 rounded-xl ${risk.risk_level === 'HIGH' ? 'bg-red-100' : 'bg-yellow-100'} shrink-0`}>
                                                <AlertCircle className={`w-6 h-6 ${risk.risk_level === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}`} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900 mb-1">{cat.title}</h5>
                                                <p className="text-gray-600 text-sm">
                                                    {risk.risk_level === 'HIGH'
                                                        ? `Los patrones detectados sugieren una alta probabilidad de dificultades en esta área. Recomendamos programar una cita con el tutor y solicitar una evaluación psicopedagógica formal.`
                                                        : `Se observan algunos indicadores que requieren seguimiento. Comparte este informe con el centro educativo para contrastar observaciones.`}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {result?.risks.every(r => r.risk_level === 'LOW') && (
                                    <div className="flex gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
                                        <div className="p-3 rounded-xl bg-green-100 shrink-0">
                                            <ShieldCheck className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-green-900 mb-1">¡Todo en orden!</h5>
                                            <p className="text-green-800 text-sm">No se han detectado patrones de riesgo significativos. Sigue fomentando el hábito de estudio positivo y consulta al tutor si notas cambios repentinos.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => onComplete()} // Data is already saved in processResults
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Guardar Informe
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default EarlyDetectionPrimary;
