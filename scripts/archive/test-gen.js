
import { getKhanExercises, adaptKhanToQuestions } from './src/services/khan/khan-fetcher.js';

async function test() {
    console.log("🧪 Iniciando test de generación de Lengua...");

    try {
        const config = {
            asignatura: 'Lengua Castellana',
            tema: 'Repaso Examen Mañana: Temas 5 y 6',
            cantidad: 10,
            curso: '4º Primaria'
        };

        const result = await getKhanExercises(config);

        if (!result || !result.ejercicios || result.ejercicios.length === 0) {
            console.error("❌ ERROR: No se generaron ejercicios.");
            process.exit(1);
        }

        console.log(`✅ ÉXITO: Se generaron ${result.ejercicios.length} ejercicios.`);

        // Verificar contenido específico
        const titulos = result.ejercicios.map(e => e.ejercicio);
        const tieneSuenio = titulos.some(t => t.includes('sueño'));
        const tieneClasificar = titulos.some(t => t.includes('veintidós'));

        if (tieneSuenio && tieneClasificar) {
            console.log("✅ Verificación de contenido: EXCELENTE. Las preguntas de Santillana están presentes.");
        } else {
            console.warn("⚠️ Advertencia: Algunos ejercicios específicos no se encontraron en la muestra.");
        }

        console.log("\n--- Ejemplo de Pregunta ---");
        console.log(result.ejercicios[3].ejercicio);
        console.log("--------------------------");

    } catch (error) {
        console.error("❌ Fallo crítico en el test:", error);
        process.exit(1);
    }
}

test();
