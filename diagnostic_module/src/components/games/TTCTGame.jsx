import React from 'react';

/**
 * Placeholder component for Torrance Tests of Creative Thinking (TTCT).
 * Simulates completion with a dummy score.
 */
const TTCTGame = ({ onComplete }) => {
    const handleFinish = () => {
        const result = { score: 7, total: 10 };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">TTCT (Creatividad)</h3>
            <p className="mb-4">Evalúa pensamiento divergente (10 ítems).</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default TTCTGame;
