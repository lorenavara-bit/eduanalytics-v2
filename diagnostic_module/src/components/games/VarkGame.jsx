import React, { useState } from 'react';

/**
 * Real VARK Learning Styles Questionnaire (short version).
 * 8 items, each with 4 options (Visual, Auditory, Read/Write, Kinesthetic).
 * The result is the style(s) with the highest count.
 */
const items = [
    { id: 1, text: 'Prefiero aprender mediante diagramas y mapas.' },
    { id: 2, text: 'Me resulta más fácil entender una explicación oral.' },
    { id: 3, text: 'Disfruto leer manuales y tomar notas.' },
    { id: 4, text: 'Aprendo mejor haciendo actividades prácticas.' },
    { id: 5, text: 'Me ayudo con colores y símbolos para organizar información.' },
    { id: 6, text: 'Recuerdo mejor una conversación que una lectura.' },
    { id: 7, text: 'Me gusta subrayar y escribir resúmenes.' },
    { id: 8, text: 'Prefiero usar objetos o modelos para comprender conceptos.' },
];

const options = [
    { key: 'V', label: 'Visual' },
    { key: 'A', label: 'Auditory' },
    { key: 'R', label: 'Read/Write' },
    { key: 'K', label: 'Kinesthetic' },
];

const VarkGame = ({ onComplete }) => {
    const [answers, setAnswers] = useState({}); // {itemId: optionKey}
    const [current, setCurrent] = useState(0);

    const handleSelect = (optionKey) => {
        setAnswers((prev) => ({ ...prev, [items[current].id]: optionKey }));
        if (current + 1 < items.length) setCurrent((c) => c + 1);
        else calculateResult({ ...answers, [items[current].id]: optionKey });
    };

    const calculateResult = (finalAnswers) => {
        const counts = { V: 0, A: 0, R: 0, K: 0 };
        Object.values(finalAnswers).forEach((k) => counts[k]++);
        const max = Math.max(...Object.values(counts));
        const dominant = Object.entries(counts)
            .filter(([, v]) => v === max)
            .map(([k]) => k);
        onComplete({ style: dominant, counts });
    };

    const item = items[current];

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Cuestionario VARK</h3>
            <p className="mb-2">Ítem {current + 1} de {items.length}</p>
            <p className="mb-4">{item.text}</p>
            <div className="grid grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt.key}
                        onClick={() => handleSelect(opt.key)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VarkGame;
