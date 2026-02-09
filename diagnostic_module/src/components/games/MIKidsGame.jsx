import React from 'react';

/**
 * Placeholder component for Multiple Intelligences Survey (MI‑Kids).
 * Returns an array with the dominant intelligences.
 */
const MIKidsGame = ({ onComplete }) => {
    const handleFinish = () => {
        // Simulamos que el alumno destaca en lingüística y espacial
        const result = { dominantIntelligences: ['linguistic', 'spatial'] };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Multiple Intelligences (MI‑Kids)</h3>
            <p className="mb-4">Identifica tus inteligencias predominantes.</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default MIKidsGame;
