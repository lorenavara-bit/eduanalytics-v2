import React from 'react';

/**
 * Placeholder component for the Fundación Telefónica test (detecta altas capacidades).
 * Simula la finalización con una puntuación dummy.
 */
const TelefonicaAACCGame = ({ onComplete }) => {
    const handleFinish = () => {
        const result = { score: 9, total: 12 };
        onComplete(result);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Test Fundación Telefónica</h3>
            <p className="mb-4">Detecta altas capacidades (12 ítems).</p>
            <button
                onClick={handleFinish}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Simular finalización
            </button>
        </div>
    );
};

export default TelefonicaAACCGame;
