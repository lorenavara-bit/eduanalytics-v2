import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Brain, Sparkles } from 'lucide-react';

/**
 * COMPONENTE VIP: WORD ORDER
 * 
 * Implementa una interfaz táctil de "Word Bank" con tracking de proceso
 * para la evaluación avanzada Feedback Diamante.
 */
const WordOrderVip = ({
    questionId,
    words = [],
    onAnswerChange,
    disabled = false,
    initialValue = ''
}) => {
    const [selectedWords, setSelectedWords] = useState([]);
    const [availableWords, setAvailableWords] = useState([]);
    const [processData, setProcessData] = useState({
        timePerWord: [],
        backspaces: 0,
        startTime: Date.now()
    });

    const lastWordTime = useRef(Date.now());

    // Inicializar palabras disponibles
    useEffect(() => {
        // Barajamos solo al inicio o si cambia la pregunta
        setAvailableWords([...words].sort(() => Math.random() - 0.5));

        // Si hay una respuesta previa (reintentar), restaurar el estado
        if (initialValue) {
            const initialList = initialValue.split(' ').filter(w => w);
            setSelectedWords(initialList);

            // Reconstruir banco disponible
            let tempAvailable = [...words];
            initialList.forEach(w => {
                const idx = tempAvailable.indexOf(w);
                if (idx > -1) tempAvailable.splice(idx, 1);
            });
            setAvailableWords(tempAvailable);
        } else {
            setSelectedWords([]);
        }
    }, [words, initialValue]);

    // Comunicar cambios al padre
    useEffect(() => {
        const value = selectedWords.join(' ');
        if (onAnswerChange) {
            onAnswerChange(questionId, value, {
                timePerWord: processData.timePerWord,
                backspaces: processData.backspaces
            });
        }
    }, [selectedWords]);

    const handleWordClick = (word, index) => {
        if (disabled) return;

        const now = Date.now();
        const elapsed = now - lastWordTime.current;
        lastWordTime.current = now;

        setProcessData(prev => ({
            ...prev,
            timePerWord: [...prev.timePerWord, elapsed]
        }));

        setSelectedWords([...selectedWords, word]);
        setAvailableWords(availableWords.filter((_, i) => i !== index));
    };

    const handleRemoveWord = (index) => {
        if (disabled) return;

        const word = selectedWords[index];
        setProcessData(prev => ({
            ...prev,
            backspaces: prev.backspaces + 1
        }));

        setAvailableWords([...availableWords, word]);
        setSelectedWords(selectedWords.filter((_, i) => i !== index));
        lastWordTime.current = Date.now(); // Reset timer to avoid huge gap
    };

    const handleReset = () => {
        if (disabled) return;
        setAvailableWords([...words].sort(() => Math.random() - 0.5));
        setSelectedWords([]);
        setProcessData(prev => ({
            timePerWord: [],
            backspaces: prev.backspaces + 1,
            startTime: Date.now()
        }));
        lastWordTime.current = Date.now();
    };

    // Auditoría VIP: ¿Hay algo sospechoso? (Hesitación detectada)
    const isHesitating = processData.timePerWord.some(t => t > 5000) || processData.backspaces > 3;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* 1. Sentence Builder Area */}
            <div className="relative group">
                <div className={`min-h-[100px] p-6 bg-white border-2 border-dashed rounded-3xl flex flex-wrap gap-2 items-center transition-all ${selectedWords.length > 0 ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-200 shadow-inner bg-slate-50/50'}`}>
                    {selectedWords.length === 0 && (
                        <p className="text-slate-400 italic text-sm w-full text-center select-none font-medium">
                            Construye la frase pulsando las palabras del banco...
                        </p>
                    )}
                    {selectedWords.map((word, idx) => (
                        <button
                            key={`${word}-${idx}`}
                            onClick={() => handleRemoveWord(idx)}
                            disabled={disabled}
                            className={`px-5 py-2.5 bg-white border-2 border-indigo-200 text-indigo-900 font-bold rounded-2xl shadow-sm hover:border-rose-400 hover:text-rose-600 hover:scale-95 transition-all animate-in zoom-in-90 ${disabled ? 'cursor-default opacity-90' : 'cursor-pointer scale-100 hover:shadow-md'}`}
                        >
                            {word}
                        </button>
                    ))}

                    {selectedWords.length > 0 && !disabled && (
                        <button
                            onClick={handleReset}
                            className="absolute -top-3 -right-3 p-3 bg-white border-2 border-slate-100 rounded-full text-slate-400 hover:text-rose-500 hover:shadow-lg transition-all sm:flex hidden"
                            title="Reiniciar frase"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* 2. Word Bank Area */}
            <div className="bg-slate-100/50 p-8 rounded-[2rem] border border-slate-200/50 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500/70">
                    <Brain className="w-3.5 h-3.5" /> Word Bank
                </div>
                <div className="flex flex-wrap gap-3">
                    {availableWords.map((word, idx) => (
                        <button
                            key={`${word}-${idx}`}
                            onClick={() => handleWordClick(word, idx)}
                            disabled={disabled}
                            className={`px-5 py-3 bg-white border-2 border-slate-200 text-slate-800 font-bold rounded-2xl shadow-[0_5px_0_#e2e8f0] hover:shadow-[0_2px_0_#e2e8f0] hover:translate-y-[3px] active:translate-y-[5px] active:shadow-none transition-all ${disabled ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:border-indigo-500 hover:text-indigo-600'}`}
                        >
                            {word}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. VIP Real-time Feedback (Micro-tutoring) */}
            {isHesitating && !disabled && selectedWords.length < words.length && (
                <div className="flex items-center gap-3 px-5 py-3 bg-amber-50/50 rounded-2xl border border-amber-100 animate-in bounce-in duration-700">
                    <div className="bg-amber-100 p-2 rounded-full">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-xs font-bold text-amber-800 italic leading-tight">
                        "Great effort! Concentrating on the structure is the best way to learn."
                    </span>
                </div>
            )}
        </div>
    );
};

export default WordOrderVip;
