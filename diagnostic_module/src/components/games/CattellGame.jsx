import React from 'react';

/**
 * Placeholder component for Cattell Culture‑Fair test.
 * Simulates completion with a dummy score.
 */
const CattellGame = ({ onComplete }) => {
    const handleFinish = () => {
        const result = { score: 8, total: 12 };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Cattell Culture‑Fair Test</h3>
            <p className="mb-4">Razonamiento sin sesgo cultural (12 ítems).</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default CattellGame;
