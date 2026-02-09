import React from 'react';

/**
 * Placeholder component for WISC‑V / WAIS‑IV sub‑tests (perceptual reasoning).
 * Simulates completion with a dummy score out of a total.
 */
const WiscWaistGame = ({ onComplete }) => {
    const handleFinish = () => {
        const result = { score: 10, total: 12 };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">WISC‑V / WAIS‑IV</h3>
            <p className="mb-4">Subpruebas de razonamiento perceptual (12 ítems).</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default WiscWaistGame;
