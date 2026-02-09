import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Zap,
    Target,
    AlertTriangle,
    Timer,
    Play,
    Star,
    Ghost,
    Moon,
    Sun,
    Cloud,
    Trophy,
    ArrowRight
} from 'lucide-react';

const SYMBOLS = [
    { id: 'star', icon: Star, color: 'text-yellow-500', isTarget: true },
    { id: 'ghost', icon: Ghost, color: 'text-purple-400', isTarget: false },
    { id: 'moon', icon: Moon, color: 'text-blue-400', isTarget: false },
    { id: 'sun', icon: Sun, color: 'text-orange-400', isTarget: false },
    { id: 'cloud', icon: Cloud, color: 'text-gray-400', isTarget: false }
];

const TOTAL_ROUNDS = 20;
const DISPLAY_DURATION = 1000; // 1 second
const INTERVAL_DURATION = 800; // 0.8 seconds between symbols

const AtencionGame = ({ onComplete }) => {
    const [gameState, setGameState] = useState('START'); // START, PLAYING, RESULTS
    const [currentSymbol, setCurrentSymbol] = useState(null);
    const [roundsCount, setRoundsCount] = useState(0);
    const [results, setResults] = useState({
        hits: 0,
        misses: 0,
        commissions: 0,
        reactionTimes: [],
        totalTargets: 0
    });
    const [showSymbol, setShowSymbol] = useState(false);
    const [hasPressed, setHasPressed] = useState(false);
    const [startTime, setStartTime] = useState(null);

    const timerRef = useRef(null);
    const hideTimerRef = useRef(null);

    const spawnSymbol = useCallback(() => {
        if (roundsCount >= TOTAL_ROUNDS) {
            setGameState('RESULTS');
            return;
        }

        // Randomly pick a symbol (35% chance for target)
        const isTargetRound = Math.random() < 0.35;
        let symbol;
        if (isTargetRound) {
            symbol = SYMBOLS[0];
            setResults(prev => ({ ...prev, totalTargets: prev.totalTargets + 1 }));
        } else {
            symbol = SYMBOLS[Math.floor(Math.random() * (SYMBOLS.length - 1)) + 1];
        }

        setCurrentSymbol(symbol);
        setShowSymbol(true);
        setHasPressed(false);
        setStartTime(Date.now());

        // Hide symbol after duration
        hideTimerRef.current = setTimeout(() => {
            setShowSymbol(false);
        }, DISPLAY_DURATION);

        // Schedule next round increment
        timerRef.current = setTimeout(() => {
            setRoundsCount(prev => prev + 1);
        }, DISPLAY_DURATION + INTERVAL_DURATION);
    }, [roundsCount]);

    const startGame = () => {
        setGameState('PLAYING');
        setRoundsCount(0);
        setResults({ hits: 0, misses: 0, commissions: 0, reactionTimes: [], totalTargets: 0 });
        setCurrentSymbol(null);
        setShowSymbol(false);
    };

    // Effect to handle round transitions
    useEffect(() => {
        if (gameState === 'PLAYING') {
            if (roundsCount < TOTAL_ROUNDS) {
                spawnSymbol();
            } else {
                setGameState('RESULTS');
            }
        }
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, [roundsCount, gameState]);

    const handlePress = () => {
        if (!showSymbol || hasPressed || gameState !== 'PLAYING') return;

        setHasPressed(true);
        const reactionTime = (Date.now() - startTime) / 1000;

        if (currentSymbol.isTarget) {
            setResults(prev => ({
                ...prev,
                hits: prev.hits + 1,
                reactionTimes: [...prev.reactionTimes, reactionTime]
            }));
        } else {
            setResults(prev => ({
                ...prev,
                commissions: prev.commissions + 1
            }));
        }

        // Visual feedback
        setShowSymbol(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    if (gameState === 'START') {
        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-orange-100 max-w-xl mx-auto">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Zap className="w-12 h-12 text-orange-600" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ojo de Águila: Misión Espacial</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        ¡Piloto! Debes estar muy atento. Solo presiona el botón cuando aparezca la <span className="text-yellow-600 font-bold">Estrella Galáctica</span>.
                    </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-left space-y-3">
                    <p className="font-bold text-orange-900 flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-600" />
                        Reglas de la misión:
                    </p>
                    <ul className="text-sm text-orange-800 space-y-2">
                        <li className="flex items-center gap-2">✅ Presiona si ves la <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /></li>
                        <li className="flex items-center gap-2">❌ NO presiones con otros símbolos (fantasmas, nubes...)</li>
                        <li className="flex items-center gap-2">⚡ ¡Sé lo más rápido que puedas!</li>
                    </ul>
                </div>

                <button
                    onClick={startGame}
                    className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-2xl shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                >
                    <Play className="w-6 h-6 fill-white" />
                    Iniciar Motor
                </button>
            </div>
        );
    }

    if (gameState === 'PLAYING') {
        const remaining = Math.max(0, TOTAL_ROUNDS - roundsCount);
        const progress = (roundsCount / TOTAL_ROUNDS) * 100;

        return (
            <div className="max-w-xl mx-auto space-y-12 select-none" onClick={handlePress}>
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-2xl">
                            <Target className="text-green-600 w-6 h-6" />
                        </div>
                        <div>
                            <span className="block text-xl font-black text-gray-800">{results.hits}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Aciertos</span>
                        </div>
                    </div>

                    <div className="flex-grow mx-8 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                        <div>
                            <span className="block text-xl font-black text-gray-800">{remaining}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Restantes</span>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-2xl">
                            <Timer className="text-orange-600 w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="h-[400px] bg-slate-900 rounded-[50px] shadow-2xl flex items-center justify-center relative overflow-hidden border-8 border-slate-800 group active:scale-[0.98] transition-transform cursor-pointer">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white/5 rounded-full animate-ping"></div>
                        <div className="absolute w-48 h-48 border-2 border-white/10 rounded-full"></div>
                    </div>

                    {showSymbol && currentSymbol && (
                        <div className="relative z-10 animate-in zoom-in duration-150">
                            <currentSymbol.icon className={`w-32 h-32 ${currentSymbol.color} filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`} />
                        </div>
                    )}

                    {!showSymbol && (
                        <div className="text-white/20 text-xs font-bold uppercase tracking-[0.5em] animate-pulse">
                            Escaneando...
                        </div>
                    )}
                </div>

                <div className="text-center text-gray-400 font-bold text-sm">
                    💡 Toca en cualquier parte de la pantalla oscura para pulsar el botón
                </div>
            </div>
        );
    }

    if (gameState === 'RESULTS') {
        const avgReactionTime = results.reactionTimes.length > 0
            ? results.reactionTimes.reduce((a, b) => a + b, 0) / results.reactionTimes.length
            : 0;

        return (
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-orange-100 max-w-2xl mx-auto animate-in zoom-in duration-500">
                <div className="bg-gradient-to-br from-orange-600 to-red-700 p-8 rounded-2xl text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                    <h2 className="text-3xl font-black mb-2">¡Misión Finalizada!</h2>
                    <p className="opacity-90">Análisis de rendimiento atencional completado.</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                        <span className="block text-2xl font-black text-green-700">{results.hits}</span>
                        <span className="text-[10px] font-bold text-green-600 uppercase">Aciertos</span>
                    </div>
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <span className="block text-2xl font-black text-red-700">{results.commissions}</span>
                        <span className="text-[10px] font-bold text-red-600 uppercase">Falsas Alarmas</span>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <span className="block text-2xl font-black text-blue-700">{avgReactionTime.toFixed(2)}s</span>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Velocidad</span>
                    </div>
                </div>

                <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl text-left">
                    <h4 className="font-black text-orange-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Perfil Atencional Detectado
                    </h4>
                    <p className="text-sm text-orange-800 leading-relaxed">
                        {results.commissions > 3
                            ? "Se detecta un patrón de alta impulsividad. El explorador tiende a pulsar antes de procesar el símbolo."
                            : (results.hits < results.totalTargets * 0.6
                                ? "Se detecta un patrón de inatención. Es posible que el explorador se distraiga fácilmente."
                                : "Excelente control inhibitorio y atención sostenida.")}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={startGame}
                        className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        Reintentar Misión
                    </button>
                    <button
                        onClick={() => onComplete && onComplete(results)}
                        className="flex-[2] py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                        Registrar Misión y Continuar
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default AtencionGame;
