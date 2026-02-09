/**
 * SERVICIO DE MATEMÁTICAS (Placeholder)
 * 
 * Este servicio se implementará completamente más adelante.
 * Por ahora, exporta una función vacía para evitar errores de importación.
 */

export function generarFichaMatematicas(tema, nivel) {
    console.warn("Generador de Matemáticas aún no implementado completamente.");
    return {
        title: `Matemáticas: ${tema}`,
        sections: [
            {
                title: "Ejercicio de Ejemplo",
                questions: [
                    {
                        id: "math_placeholder_1",
                        type: "short_answer",
                        text: "¿Cuánto es 2 + 2?",
                        correct_answer: "4"
                    }
                ]
            }
        ]
    };
}
