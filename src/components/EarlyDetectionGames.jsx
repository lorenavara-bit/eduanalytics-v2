import React, { useState } from 'react';
import {
    Brain,
    Zap,
    BookOpen,
    History,
    LayoutGrid,
    ArrowLeft,
    CheckCircle,
    Sparkles
} from 'lucide-react';
import ChaeaTest from './diagnostics/ChaeaTest';
import VarkTest from './diagnostics/VarkTest';
import MITest from './diagnostics/MITest';
import ResultsDashboard from './diagnostics/ResultsDashboard';

const EarlyDetectionGames = ({ studentId, onBack }) => {
    const [view, setView] = useState('DASHBOARD'); // DASHBOARD, CHAEA, VARK, MI
    const [activeTab, setActiveTab] = useState('TESTS'); // TESTS, RESULTS

    if (view === 'CHAEA') {
        return (
            <div className="py-8">
                <ChaeaTest
                    studentId={studentId}
                    onComplete={() => {
                        setView('DASHBOARD');
                        setActiveTab('RESULTS');
                    }}
                    onCancel={() => setView('DASHBOARD')}
                />
            </div>
        );
    }

    if (view === 'VARK') {
        return (
            <div className="py-8">
                <VarkTest
                    studentId={studentId}
                    onComplete={() => {
                        setView('DASHBOARD');
                        setActiveTab('RESULTS');
                    }}
                    onCancel={() => setView('DASHBOARD')}
                />
            </div>
        );
    }

    if (view === 'MI') {
        return (
            <div className="py-8">
                <MITest
                    studentId={studentId}
                    onComplete={() => {
                        setView('DASHBOARD');
                        setActiveTab('RESULTS');
                    }}
                    onCancel={() => setView('DASHBOARD')}
                />
            </div>
        );
    }

    // Placeholder for other tests if strictly needed, or just keep them as cards in dashboard

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Diagnóstico Neuro-Educativo</h2>
                    <p className="text-gray-500">Evalúa tus estilos y capacidades para potenciar tu aprendizaje.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-5 py-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors font-medium border border-gray-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Inicio
                </button>
            </div>

            {/* Analogy Section */}
            <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-indigo-100 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-48 h-32 bg-indigo-50 rounded-2xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400 to-transparent animate-pulse" />
                        <div className="z-10 bg-white p-4 rounded-full shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" /></svg>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">¿Por qué evaluamos? La Analogía de la Radio 📻</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Evaluar el aprendizaje es como <strong>sintonizar una radio</strong>.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs h-fit mt-1">Estilos (CHAEA/VARK)</span>
                            <span className="text-gray-600">Nos ayudan a encontrar la <strong>frecuencia correcta</strong> para que el mensaje llegue con claridad y sin interferencias.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded text-xs h-fit mt-1">Inteligencias Múltiples</span>
                            <span className="text-gray-600">Nos dicen qué <strong>"emisoras" (temas)</strong> disfrutará más escuchar tu hijo/a.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded text-xs h-fit mt-1">Ritmo de Aprendizaje</span>
                            <span className="text-gray-600">Indica el <strong>volumen y velocidad</strong> adecuados para que pueda apreciar cada nota.</span>
                        </li>
                    </ul>
                    <div className="pt-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                            <Sparkles className="w-4 h-4" />
                            <span>La IA usará estos resultados para personalizar sus fichas automáticamente.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8 w-fit mx-auto md:mx-0">
                <button
                    onClick={() => setActiveTab('TESTS')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'TESTS'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <LayoutGrid className="w-4 h-4" />
                    Tests Disponibles
                </button>
                <button
                    onClick={() => setActiveTab('RESULTS')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'RESULTS'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <History className="w-4 h-4" />
                    Mis Resultados
                </button>
            </div>

            {/* Content */}
            {activeTab === 'TESTS' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CHAEA Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-100 hover:border-indigo-300 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-indigo-200 shadow-lg">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cuestionario CHAEA</h3>
                            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mb-4 w-fit">
                                Estilos de Aprendizaje
                            </div>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Identifica tu estilo predominante (Activo, Reflexivo, Teórico o Pragmático) para adaptar tus técnicas de estudio.
                            </p>
                            <button
                                onClick={() => setView('CHAEA')}
                                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                            >
                                Iniciar Test <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>

                    {/* VARK Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:border-blue-300 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-blue-200 shadow-lg">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Modelo VAK/VARK</h3>
                            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-4 w-fit">
                                Canales Sensoriales
                            </div>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Descubre si aprendes mejor viendo (Visual), escuchando (Auditivo) o haciendo (Kinestésico).
                            </p>
                            <button
                                onClick={() => setView('VARK')}
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                            >
                                Iniciar Test <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>

                    {/* Multiple Intelligences Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:border-orange-300 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-orange-200 shadow-lg">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Inteligencias Múltiples</h3>
                            <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded mb-4 w-fit">
                                Talentos Naturales
                            </div>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Evalúa tus fortalezas en 8 áreas distintas según la teoría de Howard Gardner.
                            </p>
                            <button
                                onClick={() => setView('MI')}
                                className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                            >
                                Iniciar Test <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <ResultsDashboard studentId={studentId} />
            )}
        </div>
    );
};

export default EarlyDetectionGames;
