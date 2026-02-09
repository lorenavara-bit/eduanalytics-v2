import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { analyzeLearningStyle } from '../utils/gemini';
import {
    Brain, Sparkles, ArrowRight, ArrowLeft, CheckCircle,
    Target, Lightbulb, Award, Loader2, Star
} from 'lucide-react';
import LearningEngine from '../services/learning-engine';

const questions = [
    // --- SECCIÓN 1: VARK (Canales de Percepción) ---
    {
        id: 'vark1',
        section: 'VARK',
        text: 'Cuando quieres aprender cómo funciona algo nuevo, ¿qué prefieres?',
        options: [
            { id: 'V', text: 'Ver un vídeo con diagramas y esquemas.', category: 'vark' },
            { id: 'A', text: 'Que alguien me lo explique de viva voz.', category: 'vark' },
            { id: 'R', text: 'Leer el manual o instrucciones escritas.', category: 'vark' },
            { id: 'K', text: 'Empezar a tocarlo y probar cómo funciona.', category: 'vark' }
        ]
    },
    {
        id: 'vark2',
        section: 'VARK',
        text: 'Si tienes que dar indicaciones para llegar a tu casa, ¿qué haces?',
        options: [
            { id: 'V', text: 'Dibujo un mapa sencillo.', category: 'vark' },
            { id: 'A', text: 'Digo las instrucciones en voz alta.', category: 'vark' },
            { id: 'R', text: 'Escribo una lista de pasos.', category: 'vark' },
            { id: 'K', text: 'Le digo que me siga o le acompaño.', category: 'vark' }
        ]
    },
    // --- SECCIÓN 2: INTELIGENCIAS MÚLTIPLES ---
    {
        id: 'mi1',
        section: 'Inteligencias',
        text: '¿En qué tipo de actividades te sientes más "en tu salsa"?',
        options: [
            { id: 'logical', text: 'Resolviendo acertijos, juegos de lógica o mates.', category: 'mi' },
            { id: 'spatial', text: 'Dibujando, diseñando o creando cosas visuales.', category: 'mi' },
            { id: 'linguistic', text: 'Escribiendo historias o leyendo libros.', category: 'mi' },
            { id: 'musical', text: 'Tocando un instrumento o siguiendo ritmos.', category: 'mi' }
        ]
    },
    {
        id: 'mi2',
        section: 'Inteligencias',
        text: 'Cuando trabajas en un proyecto, prefieres...',
        options: [
            { id: 'interpersonal', text: 'Trabajar con otros y liderar el equipo.', category: 'mi' },
            { id: 'intrapersonal', text: 'Trabajar solo y a mi propio ritmo.', category: 'mi' },
            { id: 'kinesthetic', text: 'Hacer algo físico, como una maqueta.', category: 'mi' },
            { id: 'naturalistic', text: 'Relacionarlo con la naturaleza o animales.', category: 'mi' }
        ]
    },
    // --- SECCIÓN 3: CICLO DE KOLB (Cómo procesas) ---
    {
        id: 'kolb1',
        section: 'Procesamiento',
        text: 'Ante un problema nuevo, tu primera reacción es...',
        options: [
            { id: 'EC', text: 'Sentirlo y dejarme llevar por la intuición.', category: 'kolb' }, // Experiencia Concreta
            { id: 'OR', text: 'Observar con cuidado antes de hacer nada.', category: 'kolb' }, // Observación Reflexiva
            { id: 'CA', text: 'Analizarlo lógicamente y buscar teorías.', category: 'kolb' }, // Conceptualización Abstracta
            { id: 'EA', text: 'Probar cosas rápido para ver qué pasa.', category: 'kolb' }   // Experimentación Activa
        ]
    },
    // --- SECCIÓN 4: RASGOS COGNITIVOS ---
    {
        id: 'trait1',
        section: 'Concentración',
        text: '¿Cómo es tu atención cuando estudias algo difícil?',
        options: [
            { id: 'high', text: 'Me concentro muy a fondo y olvido el tiempo.', category: 'attention' },
            { id: 'medium', text: 'Me concentro bien, pero necesito descansos.', category: 'attention' },
            { id: 'low', text: 'Me distraigo con facilidad con ruidos o ideas.', category: 'attention' }
        ]
    }
];

const LearningStyleQuiz = ({ user, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnswer = (questionId, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));

        if (currentStep < questions.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300);
        }
    };

    const finishQuiz = async () => {
        setLoading(true);
        try {
            // 1. Cálculo Híbrido (Local + IA)

            // Extraer respuestas por categorías para el motor local
            const varkAnswers = Object.values(answers).filter(a => a.category === 'vark').map(a => a.id);
            const miAnswers = Object.values(answers).filter(a => a.category === 'mi').reduce((acc, a) => {
                acc[a.id] = (acc[a.id] || 0) + 1;
                return acc;
            }, {});
            const kolbAnswers = Object.values(answers).filter(a => a.category === 'kolb').map(a => a.id);
            const traitAnswers = Object.values(answers).find(a => a.category === 'attention')?.id;

            const localVark = LearningEngine.calculateVARKProfile(varkAnswers);
            const localMI = LearningEngine.calculateMIProfile({}, miAnswers); // Activity data vacío por ahora
            const localKolb = LearningEngine.calculateKolbProfile(kolbAnswers);

            // 2. Analizar con IA para obtener feedback cualitativo
            const fullAnswersForAI = {
                ...answers,
                local_results: {
                    vark: localVark,
                    mi: localMI,
                    kolb: localKolb
                }
            };

            const aiAnalysis = await analyzeLearningStyle(fullAnswersForAI);

            // 3. Consolidar Perfil Final
            const finalProfile = {
                student_id: user.id,
                vark_scores: localVark.scores,
                vark_dominant: localVark.dominant,
                multiple_intelligences: localMI.scores,
                kolb_cycle: {
                    dominant: localKolb.dominant,
                    scores: localKolb.scores
                },
                cognitive_traits: {
                    attention: traitAnswers,
                    processing_speed: 'normal', // Default por ahora
                    persistence: 'normal'
                },
                ai_summary: aiAnalysis.ai_summary,
                personalization_tips: aiAnalysis.personalization_tips,
                confidence_score: 0.85,
                last_updated: new Date().toISOString()
            };

            // 4. Guardar en Supabase
            const { error: dbError } = await supabase
                .from('learning_profiles')
                .upsert(finalProfile);

            if (dbError) throw dbError;

            setResult(finalProfile);
        } catch (err) {
            console.error("❌ Error en el test:", err);
            alert("No pudimos procesar el test. Por favor reintenta.\n" + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-fade-in">
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-slate-900">
                    <div className="bg-slate-900 p-10 text-white text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-500 rounded-3xl mb-6 rotate-3">
                            <Brain className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Perfil de Aprendizaje Generado</h2>
                        <p className="text-slate-400 font-bold">Inteligencia Adaptativa: {Math.round(result.confidence_score * 100)}% de precisión</p>
                    </div>

                    <div className="p-10 space-y-10">
                        {/* Grid de Resultados */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-indigo-50 p-8 rounded-[32px] border-2 border-indigo-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block">VARK</span>
                                <h3 className="text-2xl font-black text-slate-900 border-b-4 border-indigo-200 pb-2 mb-4">
                                    {result.vark_dominant}
                                </h3>
                                <p className="text-sm font-bold text-slate-600">Procesas mejor mediante estímulos visuales y esquemas.</p>
                            </div>

                            <div className="bg-purple-50 p-8 rounded-[32px] border-2 border-purple-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2 block">KOLB</span>
                                <h3 className="text-2xl font-black text-slate-900 border-b-4 border-purple-200 pb-2 mb-4">
                                    {result.kolb_cycle.dominant}
                                </h3>
                                <p className="text-sm font-bold text-slate-600">Tu forma de resolver problemas es práctica y directa.</p>
                            </div>

                            <div className="bg-emerald-50 p-8 rounded-[32px] border-2 border-emerald-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2 block">TALENTO</span>
                                <h3 className="text-2xl font-black text-slate-900 border-b-4 border-emerald-200 pb-2 mb-4 text-xs">
                                    {Object.entries(result.multiple_intelligences || {})
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 1)
                                        .map(([k]) => k.toUpperCase())}
                                </h3>
                                <p className="text-sm font-bold text-slate-600">Destacas especialmente en esta área del conocimiento.</p>
                            </div>
                        </div>

                        {/* IA FEEDBACK */}
                        <div className="bg-slate-50 p-10 rounded-[40px] border-2 border-slate-100 relative overflow-hidden">
                            <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-slate-200 opacity-50" />
                            <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                                <span className="bg-slate-900 text-white p-2 rounded-lg"><Star className="w-4 h-4" /></span>
                                Análisis del Psicopedagogo IA
                            </h3>
                            <p className="text-slate-700 font-bold leading-relaxed italic z-10 relative">
                                "{result.ai_summary}"
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                                <Lightbulb className="w-6 h-6 text-yellow-500" />
                                Consejos Personalizados para Estudiar
                            </h3>
                            <div className="space-y-3">
                                {result.personalization_tips.map((tip, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-yellow-100 p-2 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <p className="text-gray-700 font-medium">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => onComplete && onComplete(result)}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            Ir a generar mis fichas adaptadas
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto p-6 animate-fade-in">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                        className={`p-2 rounded-full transition-colors ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        disabled={currentStep === 0}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                        <span className="text-sm font-bold text-purple-600 border border-purple-200 px-3 py-1 rounded-full bg-purple-50">
                            Paso {currentStep + 1} de {questions.length}
                        </span>
                    </div>
                    <div className="w-10"></div> {/* Spacer */}
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 min-h-[400px] flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-purple-600 font-bold mb-6 text-sm uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    Descubre tu Estilo
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                    {currentQuestion.text}
                </h2>

                <div className="grid gap-4">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(currentQuestion.id, option)}
                            className={`p-5 rounded-2xl text-left transition-all duration-200 border-2 flex items-center justify-between group
                                ${answers[currentQuestion.id]?.id === option.id
                                    ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-200'
                                    : 'border-gray-100 hover:border-purple-300 hover:bg-gray-50'
                                }`}
                        >
                            <span className={`text-lg font-medium ${answers[currentQuestion.id]?.id === option.id ? 'text-purple-700' : 'text-gray-700'}`}>
                                {option.text}
                            </span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${answers[currentQuestion.id]?.id === option.id
                                    ? 'border-purple-500 bg-purple-500 text-white'
                                    : 'border-gray-300 group-hover:border-purple-400'
                                }`}>
                                {answers[currentQuestion.id]?.id === option.id && <CheckCircle className="w-4 h-4" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-8 flex justify-end">
                {currentStep === questions.length - 1 && answers[currentQuestion.id] && (
                    <button
                        onClick={finishQuiz}
                        disabled={loading}
                        className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 group disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Analizando tu estilo...</span>
                            </>
                        ) : (
                            <>
                                <span>Finalizar y Descubrir</span>
                                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LearningStyleQuiz;
