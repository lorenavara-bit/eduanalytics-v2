import React, { useState } from 'react';
import {
    Puzzle,
    Lightbulb,
    ChevronRight,
    Trophy,
    Brain,
    Timer,
    Star,
    Layers,
    ArrowRight
} from 'lucide-react';

const CHALLENGES = [
    {
        id: 1,
        question: '¿Qué figura completa la serie?',
        pattern: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'],
        options: ['🔴', '🔵', '🟢', '🟡'],
        correct: '🔵',
        difficulty: 'EASY'
    },
    {
        id: 2,
        question: 'Busca la lógica del tamaño:',
        pattern: ['🐁', '🐕', '🐎', '🐘', '🐳', '?'],
        options: ['🐜', '🐈', '🦒', '🏢'],
        correct: '🦒', // Or 🏢? Let's use giraffe as it's an animal
        difficulty: 'EASY'
    },
    {
        id: 3,
        question: 'Sigue el patrón de formas:',
        pattern: ['▲', '■', '▲', '■', '▲', '?'],
        options: ['▲', '■', '●', '★'],
        correct: '■',
        difficulty: 'EASY'
    },
    {
        id: 4,
        question: 'Matriz lógica (A-1, B-2, C-3, D-?):',
        pattern: ['A1', 'B2', 'C3', 'D?'],
        options: ['4', '5', 'E', 'D'],
        correct: '4',
        difficulty: 'MEDIUM'
    },
    {
        id: 5,
        question: '¿Cuál falta en esta rotación?',
        pattern: ['⬆️', '➡️', '⬇️', '?'],
        options: ['⬆️', '➡️', '⬅️', '⬇️'],
        correct: '⬅️',
        difficulty: 'MEDIUM'
    }
];

const LogicaGame = ({ onComplete }) => {
    const [gameState, setGameState] = useState('START');
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState([]);
    const [startTime, setStartTime] = useState(null);

    const startChallenge = () => {
        setGameState('PLAYING');
        setCurrentStep(0);
        setScore(0);
        setStartTime(Date.now());
    };

    const handleAnswer = (option) => {
        const timeSpent = (Date.now() - startTime) / 1000;
        const currentChallenge = CHALLENGES[currentStep];
        const isCorrect = option === currentChallenge.correct;

        if (isCorrect) setScore(prev => prev + 1);

        const result = {
            id: currentChallenge.id,
            difficulty: currentChallenge.difficulty,
            isCorrect,
            timeSpent
        };

        setResults(prev => [...prev, result]);

        if (currentStep < CHALLENGES.length - 1) {
            setCurrentStep(prev => prev + 1);
            setStartTime(Date.now());
        } else {
            setGameState('RESULTS');
        }
    };

    if (gameState === 'START') {
        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-purple-100 max-w-xl mx-auto">
                <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto">
                    <Puzzle className="w-12 h-12 text-purple-600" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Detective de Patrones</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        ¡Hola, detective! Tu cerebro es experto en encontrar reglas ocultas. ¿Podrás resolver todos estos misterios?
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center">
                        <Lightbulb className="w-6 h-6 text-yellow-500 mb-2" />
                        <span className="text-xs font-bold text-purple-700 uppercase">Observación</span>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center">
                        <Brain className="w-6 h-6 text-purple-600 mb-2" />
                        <span className="text-xs font-bold text-purple-700 uppercase">Razonamiento</span>
                    </div>
                </div>

                <button
                    onClick={startChallenge}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-3 text-lg"
                >
                    Aceptar Desafío
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        );
    }

    if (gameState === 'PLAYING') {
        const challenge = CHALLENGES[currentStep];
        const progress = ((currentStep + 1) / CHALLENGES.length) * 100;

        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white p-5 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                        <Layers className="text-purple-600 w-5 h-5" />
                        <span className="font-black text-gray-700">Nivel {currentStep + 1}/{CHALLENGES.length}</span>
                    </div>
                    <div className="flex-grow mx-8 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
                        <span className="font-bold text-gray-700">{score}</span>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] shadow-2xl p-10 text-center border border-gray-100 space-y-10">
                    <div className="space-y-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${challenge.difficulty === 'EASY' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {challenge.difficulty === 'EASY' ? 'Fácil' : 'Intermedio'}
                        </span>
                        <h3 className="text-2xl font-black text-gray-900">{challenge.question}</h3>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-4 text-4xl md:text-6xl flex-wrap">
                        {challenge.pattern.map((item, idx) => (
                            <div key={idx} className={`w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center ${item === '?' ? 'border-orange-300 border-2 bg-orange-50 animate-pulse text-orange-500 font-black' : ''}`}>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {challenge.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className="aspect-square bg-white border-2 border-gray-100 hover:border-purple-400 hover:bg-purple-50 rounded-3xl text-3xl md:text-4xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg shadow-gray-100"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'RESULTS') {
        const avgTime = results.reduce((a, b) => a + b.timeSpent, 0) / results.length;

        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-purple-100 max-w-2xl mx-auto animate-in zoom-in duration-500">
                <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-10 rounded-[40px] text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                        <Trophy className="w-10 h-10 text-yellow-300" />
                    </div>
                    <h2 className="text-3xl font-black mb-2">¡Caso Resuelto!</h2>
                    <p className="opacity-90">Tu mente lógica es increíble.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
                        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-yellow-500" />
                        <span className="block text-4xl font-black text-gray-900">{score}/{CHALLENGES.length}</span>
                        <span className="text-xs font-bold text-gray-500 uppercase">Aciertos</span>
                    </div>
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <Timer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <span className="block text-4xl font-black text-gray-900">{avgTime.toFixed(1)}s</span>
                        <span className="text-xs font-bold text-gray-500 uppercase">Tiempo Medio</span>
                    </div>
                </div>

                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl text-left">
                    <h4 className="font-black text-indigo-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-indigo-600" />
                        Perfil Lógico-Deductivo
                    </h4>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                        {score >= 4
                            ? "Muestras un pensamiento abstracto muy desarrollado. Eres capaz de identificar leyes lógicas complejas con gran velocidad."
                            : "Buen trabajo encontrando patrones. Con la práctica tu mente será capaz de ver conexiones cada vez más rápidas."}
                    </p>
                </div>

                <button
                    onClick={() => onComplete && onComplete(results)}
                    className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                    Guardar Evidencias y Continuar
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return null;
};

export default LogicaGame;
