import React from 'react';

/**
 * Placeholder component for Raven's Progressive Matrices test.
 * In a real implementation this would render the matrix items and collect answers.
 * Here we simply provide a button that simulates completion with a dummy score.
 */
const RavenMatrixGame = ({ onComplete }) => {
    const handleFinish = () => {
        // Simulated result: score out of 12 (higher is better)
        const result = { score: 9, total: 12 };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Raven’s Progressive Matrices</h3>
            <p className="mb-4">Prueba de razonamiento abstracto (12 ítems).</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default RavenMatrixGame;
