import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Brain, Highlighter } from 'lucide-react';

/**
 * COMPONENTE VIP: SCANNER (EL DETECTIVE)
 * 
 * Interfaz premium para encontrar y subrayar palabras clave dentro de un texto.
 * Ideal para Ortografía, Gramática (buscar verbos) y Comprensión Lectora.
 */
const ScannerVip = ({
    questionId,
    text = "",
    onAnswerChange,
    disabled = false,
    initialValue = [] // ["palabra1", "palabra2"]
}) => {
    // Dividimos el texto en palabras individuales, manteniendo signos de puntuación pegados
    const tokens = text.split(/(\s+)/);
    const [selectedIndices, setSelectedIndices] = useState(() => {
        if (!initialValue || initialValue.length === 0) return [];
        // Intentar reconstruir índices a partir de palabras (heurística simple)
        const indices = [];
        tokens.forEach((token, idx) => {
            if (initialValue.includes(token.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""))) {
                indices.push(idx);
            }
        });
        return indices;
    });

    // Telemetría
    const [stats, setStats] = useState({
        startTime: Date.now(),
        clickPath: [], // Secuencia de clics para ver si el niño "escanea" o clica al azar
        firstDiscoveryTime: null
    });

    useEffect(() => {
        if (onAnswerChange) {
            const selectedWords = selectedIndices.map(idx =>
                tokens[idx].trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            ).filter(w => w.length > 0);

            onAnswerChange(questionId, selectedWords, {
                clickPath: stats.clickPath,
                duration: Date.now() - stats.startTime,
                discoveryTime: stats.firstDiscoveryTime ? stats.firstDiscoveryTime - stats.startTime : null
            });
        }
    }, [selectedIndices]);

    const handleTokenClick = (idx, word) => {
        if (disabled || !word.trim()) return;

        const cleanWord = word.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        if (!cleanWord) return;

        setStats(prev => ({
            ...prev,
            clickPath: [...prev.clickPath.slice(-10), idx],
            firstDiscoveryTime: prev.firstDiscoveryTime || Date.now()
        }));

        setSelectedIndices(prev => {
            if (prev.includes(idx)) {
                return prev.filter(i => i !== idx);
            } else {
                return [...prev, idx];
            }
        });
    };

    return (
        <div className="relative p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm select-none overflow-hidden">
            {/* Cabecera Estilo Detective */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Highlighter className="w-3.5 h-3.5 text-yellow-500" /> Modo Subrayador / Detective
                </div>
                <div className="text-[10px] font-bold text-slate-400">
                    {selectedIndices.length} palabras marcadas
                </div>
            </div>

            {/* Area de Texto */}
            <div className="relative z-10 leading-relaxed text-lg font-medium text-slate-700">
                {tokens.map((token, idx) => {
                    const isSelected = selectedIndices.includes(idx);
                    const isWord = token.trim().length > 0;

                    if (!isWord) return <span key={idx}>{token}</span>;

                    return (
                        <motion.span
                            key={idx}
                            onClick={() => handleTokenClick(idx, token)}
                            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
                            className={`inline-block relative cursor-pointer px-1 rounded-md transition-all duration-300 ${isSelected
                                    ? 'text-indigo-900 font-bold'
                                    : 'hover:bg-slate-50'
                                }`}
                        >
                            {/* El "Subrayado" Visual */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.span
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: '100%', opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="absolute bottom-0 left-0 h-[60%] bg-yellow-300/60 -z-10 rounded-sm"
                                        style={{ transform: 'rotate(-1deg) translateY(2px)' }}
                                    />
                                )}
                            </AnimatePresence>
                            {token}
                        </motion.span>
                    );
                })}
            </div>

            {/* Efecto decorativo de lupa al fondo */}
            <div className="absolute top-[-20px] right-[-20px] opacity-[0.03] pointer-events-none">
                <Search size={200} />
            </div>

            {selectedIndices.length > 0 && !disabled && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-center"
                >
                    <button
                        onClick={() => setSelectedIndices([])}
                        className="text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                    >
                        Borrar todas las marcas
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default ScannerVip;
