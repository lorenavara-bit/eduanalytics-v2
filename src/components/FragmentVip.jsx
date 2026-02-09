import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Brain, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * COMPONENTE VIP: FRAGMENT (CUIDADO: PALABRAS VOLADORAS)
 * 
 * Interfaz de élite para completar huecos en un texto.
 * Las palabras vuelan literalmente desde el banco hasta su posición.
 * Trackeo de proceso para Feedback Diamante.
 */
const FragmentVip = ({
    questionId,
    text = '',
    wordBank = [],
    onAnswerChange,
    disabled = false,
    initialValue = []
}) => {
    // gapAnswers: [{ id: uniqueId, word: string | null }]
    const [gapAnswers, setGapAnswers] = useState([]);
    const [availableWords, setAvailableWords] = useState([]);

    // Telemetría
    const [stats, setStats] = useState({
        startTime: Date.now(),
        backspaces: 0,
        timePerGap: []
    });
    const lastActionTime = useRef(Date.now());

    // Dividimos el texto por el patrón "___"
    const fragments = text.split('___');
    const numGaps = fragments.length - 1;

    // Inicializar
    useEffect(() => {
        // Creamos IDs únicos para los huecos para el layoutId de framer-motion
        const initialGaps = new Array(numGaps).fill(null).map((_, i) => ({
            id: `gap-${questionId}-${i}`,
            word: initialValue && initialValue[i] ? initialValue[i] : null
        }));

        setGapAnswers(initialGaps);

        // Banco de palabras filtrado si hay initialValue
        let tempBank = [...wordBank].map((w, i) => ({ id: `word-${questionId}-${i}`, text: w }));
        if (initialValue && initialValue.length > 0) {
            initialValue.forEach(usedWord => {
                if (usedWord) {
                    const idx = tempBank.findIndex(b => b.text === usedWord);
                    if (idx > -1) tempBank.splice(idx, 1);
                }
            });
        }
        setAvailableWords(tempBank.sort(() => Math.random() - 0.5));
    }, [text, wordBank]);

    useEffect(() => {
        if (onAnswerChange) {
            const rawAnswers = gapAnswers.map(g => g.word);
            onAnswerChange(questionId, rawAnswers, {
                backspaces: stats.backspaces,
                timePerGap: stats.timePerGap,
                duration: Date.now() - stats.startTime
            });
        }
    }, [gapAnswers]);

    const handleWordClick = (wordObj) => {
        if (disabled) return;

        const firstEmptyIdx = gapAnswers.findIndex(g => g.word === null);
        if (firstEmptyIdx === -1) return;

        const now = Date.now();
        const elapsed = now - lastActionTime.current;
        lastActionTime.current = now;

        setStats(prev => ({
            ...prev,
            timePerGap: [...prev.timePerGap, elapsed]
        }));

        setGapAnswers(prev => {
            const next = [...prev];
            next[firstEmptyIdx] = { ...next[firstEmptyIdx], word: wordObj.text, wordId: wordObj.id };
            return next;
        });

        setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
    };

    const handleRemove = (gapIdx) => {
        if (disabled || !gapAnswers[gapIdx].word) return;

        const removedWord = {
            id: gapAnswers[gapIdx].wordId,
            text: gapAnswers[gapIdx].word
        };

        setStats(prev => ({ ...prev, backspaces: prev.backspaces + 1 }));

        setGapAnswers(prev => {
            const next = [...prev];
            next[gapIdx] = { ...next[gapIdx], word: null, wordId: null };
            return next;
        });

        setAvailableWords(prev => [...prev, removedWord]);
        lastActionTime.current = Date.now();
    };

    const handleReset = () => {
        if (disabled) return;
        setGapAnswers(prev => prev.map(g => ({ ...g, word: null, wordId: null })));
        setAvailableWords([...wordBank].map((w, i) => ({ id: `word-${questionId}-${i}`, text: w })).sort(() => Math.random() - 0.5));
        setStats(prev => ({ ...prev, backspaces: prev.backspaces + 1 }));
    };

    const isHesitating = stats.timePerGap.some(t => t > 7000) || stats.backspaces > 3;

    return (
        <div className="space-y-8 py-4 select-none">
            {/* 1. Texto con Huecos Mágicos */}
            <div className="relative p-10 bg-white border-2 border-slate-100 rounded-[3rem] shadow-sm transition-all hover:shadow-indigo-100/50">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                    <Wand2 className="w-4 h-4" /> Texto para Completar
                </div>

                <div className="text-xl text-slate-700 leading-[3rem] font-medium">
                    {fragments.map((fragment, idx) => (
                        <React.Fragment key={idx}>
                            <span dangerouslySetInnerHTML={{ __html: fragment }} />
                            {idx < numGaps && (
                                <span className="inline-block px-1 relative top-[-2px]">
                                    <button
                                        onClick={() => handleRemove(idx)}
                                        disabled={disabled || !gapAnswers[idx]?.word}
                                        className={`min-w-[120px] h-11 px-4 rounded-2xl border-2 transition-all flex items-center justify-center relative ${gapAnswers[idx]?.word
                                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold scale-105 shadow-sm'
                                                : 'bg-slate-50 border-dashed border-slate-300'
                                            }`}
                                    >
                                        <AnimatePresence mode="popLayout">
                                            {gapAnswers[idx]?.word ? (
                                                <motion.span
                                                    key={gapAnswers[idx].wordId}
                                                    layoutId={gapAnswers[idx].wordId}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                >
                                                    {gapAnswers[idx].word}
                                                </motion.span>
                                            ) : (
                                                <span className="text-slate-300 font-black">...</span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {!disabled && gapAnswers.some(g => g.word) && (
                    <button
                        onClick={handleReset}
                        className="absolute top-6 right-6 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* 2. Banco de Palabras Voladoras */}
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 shadow-inner">
                <div className="flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Brain className="w-4 h-4" /> Vocabulario Disponible
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <AnimatePresence>
                        {availableWords.map((word) => (
                            <motion.button
                                key={word.id}
                                layoutId={word.id}
                                onClick={() => handleWordClick(word)}
                                disabled={disabled}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                            >
                                {word.text}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {availableWords.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-emerald-600 font-bold bg-white px-6 py-3 rounded-2xl border-2 border-emerald-100"
                        >
                            <Sparkles className="w-4 h-4" /> ¡Excelente! Texto completado.
                        </motion.div>
                    )}
                </div>
            </div>

            {/* 3. Micro-Tutoring */}
            {isHesitating && !disabled && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center"
                >
                    <div className="flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-xs font-bold">
                        <Sparkles className="w-4 h-4" />
                        "Usa el contexto de la frase para elegir la mejor opción."
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default FragmentVip;
