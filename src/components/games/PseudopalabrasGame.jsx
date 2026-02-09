import React, { useState, useEffect } from 'react';
import {
    Gamepad2,
    Check,
    X,
    Timer,
    Star,
    Rocket,
    Brain,
    Trophy,
    ArrowRight
} from 'lucide-react';

const WORDS_DATA = [
    { text: 'CASA', type: 'REAL' },
    { text: 'LAPA', type: 'PSEUDO' },
    { text: 'PERRO', type: 'REAL' },
    { text: 'MITA', type: 'PSEUDO' },
    { text: 'SOL', type: 'REAL' },
    { text: 'NURA', type: 'PSEUDO' },
    { text: 'LUNA', type: 'REAL' },
    { text: 'BLOPA', type: 'PSEUDO' },
    { text: 'MESA', type: 'REAL' },
    { text: 'TRISTO', type: 'PSEUDO' },
    { text: 'FLOR', type: 'REAL' },
    { text: 'PLINO', type: 'PSEUDO' },
    { text: 'GATO', type: 'REAL' },
    { text: 'SULO', type: 'PSEUDO' },
    { text: 'LIBRO', type: 'REAL' }
];

const PseudopalabrasGame = ({ onComplete }) => {
    const [gameState, setGameState] = useState('START'); // START, PLAYING, RESULTS
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'CORRECT', 'WRONG'

    const startGame = () => {
        setGameState('PLAYING');
        setCurrentIndex(0);
        setResults([]);
        setScore(0);
        setStartTime(Date.now());
    };

    const handleAnswer = (answerType) => {
        const endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000;
        const currentWord = WORDS_DATA[currentIndex];
        const isCorrect = currentWord.type === answerType;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('CORRECT');
        } else {
            setFeedback('WRONG');
        }

        const result = {
            word: currentWord.text,
            type: currentWord.type,
            userAnswer: answerType,
            isCorrect,
            reactionTime
        };

        setResults(prev => [...prev, result]);

        setTimeout(() => {
            setFeedback(null);
            if (currentIndex < WORDS_DATA.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setStartTime(Date.now());
            } else {
                setGameState('RESULTS');
            }
        }, 600);
    };

    if (gameState === 'START') {
        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-purple-100 max-w-xl mx-auto">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-inner">
                    <Gamepad2 className="w-12 h-12 text-purple-600" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Misión: El Laberinto de Palabras</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        ¡Hola, explorador! Algunas palabras son reales y otras son de un idioma inventado de Marte (Pseudopalabras).
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                        <span className="block text-2xl mb-2">🏠</span>
                        <span className="font-bold text-green-700">REAL</span>
                        <p className="text-xs text-green-600 mt-1">Palabras que sí existen en nuestro idioma.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <span className="block text-2xl mb-2">👽</span>
                        <span className="font-bold text-orange-700">MARCIANA</span>
                        <p className="text-xs text-orange-600 mt-1">Palabras inventadas que suenan parecido.</p>
                    </div>
                </div>

                <button
                    onClick={startGame}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
                >
                    <Rocket className="w-6 h-6" />
                    ¡Empezar Misión!
                </button>
            </div>
        );
    }

    if (gameState === 'PLAYING') {
        const progress = ((currentIndex + 1) / WORDS_DATA.length) * 100;
        const currentWord = WORDS_DATA[currentIndex];

        return (
            <div className="max-w-xl mx-auto space-y-8">
                <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
                        <span className="font-black text-gray-700">{score} puntos</span>
                    </div>
                    <div className="flex-grow mx-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Timer className="text-purple-500 w-5 h-5" />
                        <span className="font-bold text-gray-700">{currentIndex + 1}/{WORDS_DATA.length}</span>
                    </div>
                </div>

                <div className={`bg-white rounded-[40px] shadow-2xl p-16 text-center border-4 transition-all duration-300 ${feedback === 'CORRECT' ? 'border-green-400 scale-105' : (feedback === 'WRONG' ? 'border-red-400 shake' : 'border-purple-100')}`}>
                    <h3 className="text-6xl font-black text-gray-900 tracking-widest uppercase mb-12">
                        {currentWord.text}
                    </h3>

                    <div className="grid grid-cols-2 gap-6">
                        <button
                            disabled={feedback !== null}
                            onClick={() => handleAnswer('REAL')}
                            className="group py-8 bg-green-500 hover:bg-green-600 text-white font-black rounded-[30px] shadow-lg hover:shadow-green-200 transition-all flex flex-col items-center gap-2 active:scale-95"
                        >
                            <span className="text-4xl group-hover:scale-125 transition-transform">🏠</span>
                            ES REAL
                        </button>
                        <button
                            disabled={feedback !== null}
                            onClick={() => handleAnswer('PSEUDO')}
                            className="group py-8 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-[30px] shadow-lg hover:shadow-orange-200 transition-all flex flex-col items-center gap-2 active:scale-95"
                        >
                            <span className="text-4xl group-hover:scale-125 transition-transform">👽</span>
                            MARCIANA
                        </button>
                    </div>
                </div>

                {feedback === 'CORRECT' && (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-green-500 text-white p-6 rounded-full animate-ping-once">
                            <Check className="w-12 h-12" />
                        </div>
                    </div>
                )}
                {feedback === 'WRONG' && (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-red-500 text-white p-6 rounded-full animate-ping-once">
                            <X className="w-12 h-12" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (gameState === 'RESULTS') {
        const avgReactionTime = results.reduce((a, b) => a + b.reactionTime, 0) / results.length;
        const accuracy = (score / WORDS_DATA.length) * 100;

        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-purple-100 max-w-2xl mx-auto animate-in zoom-in duration-500">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                    <h2 className="text-3xl font-black mb-2">¡Misión Cumplida!</h2>
                    <p className="opacity-90">Has analizado {WORDS_DATA.length} palabras estelares.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <span className="block text-3xl font-black text-gray-900">{accuracy.toFixed(0)}%</span>
                        <span className="text-xs font-bold text-gray-500 uppercase">Precisión</span>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <Timer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <span className="block text-3xl font-black text-gray-900">{avgReactionTime.toFixed(2)}s</span>
                        <span className="text-xs font-bold text-gray-500 uppercase">Velocidad</span>
                    </div>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-left">
                    <h4 className="font-black text-blue-900 mb-2 flex items-center gap-2">
                        <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
                        Análisis del Explorador
                    </h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        {accuracy >= 80
                            ? "Tu capacidad de decodificación es excelente. ¡Tienes un ojo muy agudo para las palabras!"
                            : "Buen intento. Seguir practicando con palabras marcianas te ayudará a ser un súper lector."}
                    </p>
                </div>

                <button
                    onClick={() => onComplete && onComplete({ results, score, accuracy, avgReactionTime })}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                    Guardar Informe y Continuar
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return null;
};

export default PseudopalabrasGame;
