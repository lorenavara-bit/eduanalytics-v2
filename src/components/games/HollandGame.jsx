import React from 'react';

/**
 * Placeholder component for Inventario de intereses de Holland.
 * Simula la finalización devolviendo si el estudiante tiene coincidencias altas.
 */
const HollandGame = ({ onComplete }) => {
    const handleFinish = () => {
        // Simular que el estudiante tiene intereses alineados (matchesHigh = true)
        const result = { matchesHigh: true };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Inventario Holland</h3>
            <p className="mb-4">Intereses y motivación académica.</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default HollandGame;
