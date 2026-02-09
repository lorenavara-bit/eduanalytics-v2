import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link2, Sparkles, Brain, MousePointer2 } from 'lucide-react';

/**
 * COMPONENTE VIP: CONNECTOR (PUENTES MAGNÉTICOS)
 * 
 * Interfaz premium para unir parejas mediante líneas dinámicas.
 * Ideal para Sinónimos/Antónimos, Vocabulario o Mates.
 */
const ConnectorVip = ({
    questionId,
    pairs = [], // [{ left: "Saltar", right: "Jump" }, ...]
    onAnswerChange,
    disabled = false,
    initialValue = [] // [{ from: "Saltar", to: "Jump" }]
}) => {
    const [connections, setConnections] = useState(initialValue || []);
    const [activeSource, setActiveSource] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Mezclar las columnas para que no coincidan en línea recta
    const [leftItems] = useState(() => pairs.map(p => p.left).sort(() => Math.random() - 0.5));
    const [rightItems] = useState(() => pairs.map(p => p.right).sort(() => Math.random() - 0.5));

    // Telemetría
    const [stats, setStats] = useState({
        startTime: Date.now(),
        attempts: 0,
        misconnects: 0
    });

    useEffect(() => {
        if (onAnswerChange) {
            onAnswerChange(questionId, connections, {
                attempts: stats.attempts,
                misconnects: stats.misconnects,
                duration: Date.now() - stats.startTime
            });
        }
    }, [connections]);

    const handleMouseMove = (e) => {
        if (!activeSource || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleLeftClick = (item) => {
        if (disabled) return;

        // Si ya está conectado, borrar conexión antigua
        setConnections(prev => prev.filter(c => c.from !== item));

        setActiveSource(item);
    };

    const handleRightClick = (item) => {
        if (disabled || !activeSource) return;

        // Si el destino ya estaba conectado, borrar esa conexión
        setConnections(prev => prev.filter(c => c.to !== item));

        const newConnection = { from: activeSource, to: item };
        setConnections(prev => [...prev, newConnection]);

        setStats(prev => ({ ...prev, attempts: prev.attempts + 1 }));
        setActiveSource(null);
    };

    // Helper para obtener coordenadas de un elemento por su ID/Texto
    const getPos = (text, isLeft) => {
        const el = document.getElementById(`conn-${isLeft ? 'L' : 'R'}-${text}`);
        if (!el || !containerRef.current) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
            x: isLeft ? rect.right - containerRect.left : rect.left - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
        };
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 select-none overflow-hidden"
        >
            <div className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <Link2 className="w-3.5 h-3.5" /> Une con puentes magnéticos
            </div>

            <div className="grid grid-cols-2 gap-24 relative z-10">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                    {leftItems.map((item) => (
                        <motion.button
                            key={item}
                            id={`conn-L-${item}`}
                            onClick={() => handleLeftClick(item)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-2xl font-bold text-sm transition-all text-left flex justify-between items-center ${activeSource === item
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105'
                                    : connections.find(c => c.from === item)
                                        ? 'bg-white border-2 border-indigo-100 text-slate-700 shadow-sm'
                                        : 'bg-white border-2 border-transparent text-slate-600 hover:border-slate-200 shadow-sm'
                                }`}
                        >
                            {item}
                            <div className={`w-3 h-3 rounded-full border-2 ${activeSource === item ? 'bg-white border-indigo-400 animate-pulse' : 'bg-slate-100 border-slate-200'}`} />
                        </motion.button>
                    ))}
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                    {rightItems.map((item) => (
                        <motion.button
                            key={item}
                            id={`conn-R-${item}`}
                            onClick={() => handleRightClick(item)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-2xl font-bold text-sm transition-all text-right flex justify-between items-center ${connections.find(c => c.to === item)
                                    ? 'bg-white border-2 border-indigo-100 text-slate-700 shadow-sm'
                                    : 'bg-white border-2 border-transparent text-slate-600 hover:border-slate-200 shadow-sm'
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full border-2 ${activeSource ? 'bg-indigo-50 border-indigo-200 animate-bounce' : 'bg-slate-100 border-slate-200'}`} />
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* SVG Layer para las líneas */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full">
                {/* Conexiones establecidas */}
                {connections.map((conn, i) => {
                    const start = getPos(conn.from, true);
                    const end = getPos(conn.to, false);
                    return (
                        <motion.path
                            key={i}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            d={`M ${start.x} ${start.y} C ${start.x + 40} ${start.y}, ${end.x - 40} ${end.y}, ${end.x} ${end.y}`}
                            stroke="#6366f1"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Línea activa mientras se arrastra/selecciona */}
                {activeSource && (
                    <path
                        d={`M ${getPos(activeSource, true).x} ${getPos(activeSource, true).y} C ${getPos(activeSource, true).x + 40} ${getPos(activeSource, true).y}, ${mousePos.x - 40} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`}
                        stroke="#818cf8"
                        strokeWidth="3"
                        strokeDasharray="8,8"
                        fill="none"
                        className="animate-dash"
                    />
                )}
            </svg>

            {connections.length === pairs.length && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-white px-4 py-2 rounded-full border border-indigo-100 shadow-sm animate-bounce">
                        <Sparkles className="w-3 h-3" /> ¡Puentes completados!
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectorVip;
