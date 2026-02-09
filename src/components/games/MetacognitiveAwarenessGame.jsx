import React, { useState } from 'react';

/**
 * Real implementation of the Metacognitive Awareness Inventory (MAI).
 * Consists of 10 true/false statements. The score is the number of correct
 * answers (higher score = better metacognitive regulation).
 */
const items = [
    { id: 1, text: 'Planifico cómo abordaré una tarea antes de empezarla.', answer: true },
    { id: 2, text: 'Me cuesta identificar cuándo no entiendo algo.', answer: false },
    { id: 3, text: 'Reviso mis respuestas antes de entregarlas.', answer: true },
    { id: 4, text: 'Rara vez pienso en cómo aprendí algo después de terminar.', answer: false },
    { id: 5, text: 'Me pregunto si hay una forma más eficiente de resolver un problema.', answer: true },
    { id: 6, text: 'No me doy tiempo para reflexionar sobre mis errores.', answer: false },
    { id: 7, text: 'Uso estrategias diferentes según la dificultad de la tarea.', answer: true },
    { id: 8, text: 'No presto atención a mis pensamientos mientras estudio.', answer: false },
    { id: 9, text: 'Evalúo mi nivel de comprensión al final de cada sesión.', answer: true },
    { id: 10, text: 'Me resulta difícil monitorear mi progreso.', answer: false },
];

const MetacognitiveAwarenessGame = ({ onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (selected) => {
        const correct = items[current].answer;
        const newScore = selected === correct ? score + 1 : score;
        setScore(newScore);

        if (current + 1 < items.length) {
            setCurrent((c) => c + 1);
        } else {
            onComplete({ score: newScore, total: items.length });
        }
    };

    const item = items[current];

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Metacognitive Awareness Inventory (MAI)</h3>
            <p className="mb-2">Ítem {current + 1} de {items.length}</p>
            <p className="mb-4">{item.text}</p>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => handleAnswer(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Verdadero
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Falso
                </button>
            </div>
        </div>
    );
};

export default MetacognitiveAwarenessGame;
