import React, { useState } from 'react';

/**
 * Real implementation of the Concept‑Comprehension Checklist (CC‑C).
 * Consists of 5 statements; the user answers True / False.
 * The score is the number of correct answers out of 5.
 */
const items = [
    { id: 1, text: 'Los números pares siempre terminan en 0, 2, 4, 6 o 8.', answer: true },
    { id: 2, text: 'El agua hierve a 90 °C al nivel del mar.', answer: false },
    { id: 3, text: 'Un triángulo puede tener tres lados de distinta longitud.', answer: true },
    { id: 4, text: 'La gravedad hace que los objetos suban.', answer: false },
    { id: 5, text: 'Los planetas giran alrededor del Sol.', answer: true },
];

const ConceptComprehensionGame = ({ onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (selected) => {
        const correct = items[current].answer;
        const newScore = selected === correct ? score + 1 : score;
        setScore(newScore);

        if (current + 1 < items.length) {
            setCurrent((c) => c + 1);
        } else {
            // finished – send result
            onComplete({ score: newScore, total: items.length });
        }
    };

    const item = items[current];

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">Concept‑Comprehension Checklist</h3>
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

export default ConceptComprehensionGame;
