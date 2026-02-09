import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles, Brain, Loader2, AlertCircle } from 'lucide-react';

/**
 * COMPONENTE VIP: VOICE ACTIVE (MODO ORAL / DICTADO)
 * 
 * Interfaz de vanguardia que utiliza la API de Reconocimiento de Voz del navegador.
 * Ideal para dictados, práctica oral de vocabulario y fluidez.
 */
const VoiceActiveVip = ({
    questionId,
    instruction = "Dime la palabra correctamente:",
    correctAnswer = "",
    onAnswerChange,
    disabled = false,
    initialValue = ""
}) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState(initialValue || "");
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);

    // Telemetría
    const [stats, setStats] = useState({
        startTime: Date.now(),
        attempts: 0,
        silencePauses: 0,
        latency: null
    });

    const recognitionRef = useRef(null);

    useEffect(() => {
        // Verificar soporte del navegador
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'es-ES';

        recognitionRef.current.onresult = (event) => {
            const current = event.resultIndex;
            const result = event.results[current][0].transcript;
            setTranscript(result);

            if (event.results[current].isFinal) {
                setStats(prev => ({
                    ...prev,
                    latency: Date.now() - prev.startTime,
                    attempts: prev.attempts + 1
                }));
            }
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Speech error", event.error);
            setError(event.error);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    useEffect(() => {
        if (onAnswerChange && transcript) {
            onAnswerChange(questionId, transcript, {
                voiceAttempts: stats.attempts,
                oralLatency: stats.latency,
                wasOral: true
            });
        }
    }, [transcript]);

    const toggleListening = () => {
        if (disabled || !isSupported) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setError(null);
            setTranscript("");
            recognitionRef.current.start();
            setIsListening(true);
            setStats(prev => ({ ...prev, startTime: Date.now() }));
        }
    };

    if (!isSupported) {
        return (
            <div className="p-6 bg-red-50 border-2 border-red-100 rounded-3xl text-red-600 text-sm font-bold flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                Tu navegador no soporta reconocimiento de voz. Por favor, usa Chrome o Edge.
            </div>
        );
    }

    return (
        <div className="relative p-10 bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border-4 border-slate-800">
            {/* Fondo Animado de Aura de Voz */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-indigo-500 rounded-full blur-[100px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* 1. Indicador Visual de Micro */}
                <div className="relative">
                    <motion.button
                        onClick={toggleListening}
                        disabled={disabled}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isListening
                                ? 'bg-red-500 shadow-red-500/50'
                                : 'bg-indigo-600 shadow-indigo-600/50 hover:bg-indigo-500'
                            }`}
                    >
                        {isListening ? (
                            <Mic className="w-10 h-10 text-white animate-pulse" />
                        ) : (
                            <Mic className="w-10 h-10 text-white" />
                        )}
                    </motion.button>

                    {/* Ondas de choque visuales */}
                    <AnimatePresence>
                        {isListening && [1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.4 }}
                                className="absolute inset-0 border-2 border-white/30 rounded-full pointer-events-none"
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* 2. Texto de Transscripción Inmediata */}
                <div className="text-center space-y-4 max-w-md">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
                        {isListening ? "Escuchando ahora..." : instruction}
                    </p>

                    <div className="min-h-[60px] flex flex-col items-center justify-center">
                        {transcript ? (
                            <motion.h3
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-2xl font-black text-white px-6 py-2 bg-slate-800 rounded-2xl border border-white/5"
                            >
                                "{transcript}"
                            </motion.h3>
                        ) : (
                            <p className="text-slate-600 italic text-sm">Prueba a decir la respuesta en voz alta...</p>
                        )}
                    </div>
                </div>

                {/* 3. Feedback de Estado */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <Brain className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IA de Voz Activada</span>
                    </div>
                    {error && (
                        <div className="text-xs text-red-400 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Error de micro
                        </div>
                    )}
                </div>
            </div>

            {/* Micro-Tutorial Flotante */}
            {!transcript && !isListening && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-6 right-10 flex items-center gap-2 text-indigo-400/50"
                >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Habla claro y fuerte</span>
                </motion.div>
            )}
        </div>
    );
};

export default VoiceActiveVip;
