import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, CheckCircle2, AlertCircle, Sparkles, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * COMPONENTE VIP: CLASSIFICATION (CUBOS MAGNÉTICOS)
 * 
 * Interfaz de élite para clasificar elementos en categorías (buckets).
 * Incluye telemetría avanzada para Feedback Diamante.
 */
const ClassificationVip = ({
    questionId,
    items = [], // Ej: ["veintidós", "sexto", "cien"]
    buckets = [], // Ej: ["Cardinales", "Ordinales"]
    onAnswerChange,
    disabled = false,
    initialValue = {} // { item: bucketName }
}) => {
    // Estado de las clasificaciones: { "veintidós": "Cardinales", ... }
    const [assignments, setAssignments] = useState(initialValue || {});
    const [selectedItem, setSelectedItem] = useState(null);

    // Telemetría
    const [stats, setStats] = useState({
        startTime: Date.now(),
        hesitations: 0,
        swaps: 0,
        timePerItem: {}
    });
    const lastActionTime = useRef(Date.now());

    // Inicializar
    useEffect(() => {
        if (Object.keys(initialValue).length > 0) {
            setAssignments(initialValue);
        }
    }, [initialValue]);

    // Comunicar cambios al padre
    useEffect(() => {
        if (onAnswerChange) {
            // Transformamos a un formato más legible para la corrección si es necesario
            onAnswerChange(questionId, assignments, {
                hesitationCount: stats.hesitations,
                swapCount: stats.swaps,
                duration: Date.now() - stats.startTime
            });
        }
    }, [assignments]);

    const handleItemClick = (item) => {
        if (disabled) return;

        // Si ya está seleccionado, deseleccionar
        if (selectedItem === item) {
            setSelectedItem(null);
            return;
        }

        setSelectedItem(item);

        // Tracking de duda (si tarda más de 3s en seleccionar el siguiente)
        const now = Date.now();
        if (now - lastActionTime.current > 3000) {
            setStats(prev => ({ ...prev, hesitations: prev.hesitations + 1 }));
        }
        lastActionTime.current = now;
    };

    const handleBucketClick = (bucketName) => {
        if (disabled || !selectedItem) return;

        // Si ya estaba en otro bucket, es un "swap" (cambio de opinión)
        if (assignments[selectedItem] && assignments[selectedItem] !== bucketName) {
            setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
        }

        const newAssignments = { ...assignments, [selectedItem]: bucketName };
        setAssignments(newAssignments);
        setSelectedItem(null); // Limpiar selección tras asignar

        lastActionTime.current = Date.now();
    };

    // Helper para ver qué items tiene cada cubo
    const getItemsInBucket = (bucketName) => {
        return Object.entries(assignments)
            .filter(([_, b]) => b === bucketName)
            .map(([item, _]) => item);
    };

    const unassignedItems = items.filter(item => !assignments[item]);

    return (
        <div className="space-y-8 py-4 select-none">
            {/* 1. Banco de Items (Palabras voladoras) */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 shadow-inner">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Brain className="w-3.5 h-3.5" /> Conceptos por Clasificar
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                    <AnimatePresence>
                        {unassignedItems.map((item) => (
                            <motion.button
                                key={item}
                                layoutId={`item-${item}`}
                                onClick={() => handleItemClick(item)}
                                disabled={disabled}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm border-2 ${selectedItem === item
                                        ? 'bg-indigo-600 border-indigo-700 text-white shadow-indigo-200 scale-110'
                                        : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-300'
                                    }`}
                            >
                                {item}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {unassignedItems.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-emerald-600 font-bold text-sm py-2"
                        >
                            <Sparkles className="w-4 h-4" /> ¡Todo organizado!
                        </motion.div>
                    )}
                </div>
            </div>

            {/* 2. Cubos Magnéticos (Buckets) */}
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(buckets.length, 3)} gap-6`}>
                {buckets.map((bucket, idx) => {
                    const itemsInThisBucket = getItemsInBucket(bucket);
                    const isTarget = selectedItem !== null;

                    return (
                        <div
                            key={bucket}
                            onClick={() => handleBucketClick(bucket)}
                            className={`relative group min-h-[160px] p-6 rounded-[2.5rem] border-4 transition-all duration-300 cursor-pointer ${isTarget
                                    ? 'border-indigo-400 bg-indigo-50/50 scale-[1.02] shadow-xl'
                                    : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                                }`}
                        >
                            {/* Decoración Estilo Santillana */}
                            <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${idx % 2 === 0 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {idx + 1}
                            </div>

                            <h4 className="text-lg font-black text-slate-800 mb-4 pr-10 uppercase tracking-tight">
                                {bucket}
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                <AnimatePresence>
                                    {itemsInThisBucket.map((item) => (
                                        <motion.div
                                            key={item}
                                            layoutId={`item-${item}`}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="px-3 py-1.5 bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
                                        >
                                            {item}
                                            {!disabled && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newAss = { ...assignments };
                                                        delete newAss[item];
                                                        setAssignments(newAss);
                                                    }}
                                                    className="hover:text-red-500 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {isTarget && itemsInThisBucket.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-indigo-400 text-xs font-black uppercase tracking-widest animate-pulse">
                                        Soltar aquí
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Micro-Feedback de Proceso (Sólo visible para depuración o si queremos motivar) */}
            {stats.swaps > 2 && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 w-fit mx-auto animate-bounce">
                    <AlertCircle className="w-3 h-3" />
                    "¡Meditalo bien! Estás cambiando de opinión a menudo."
                </div>
            )}
        </div>
    );
};

export default ClassificationVip;
