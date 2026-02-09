// Khan Academy Content Fetcher
// Obtiene ejercicios de Khan Academy usando contenido embebido
// PRIORIDAD: Por curso → Por tema general

import { KHAN_ACADEMY_CONFIG, buildKhanURL, generateKhanCacheKey } from './khan-config.js';
import { getKhanExercisesPorCurso, hasKhanContentPorCurso } from './khan-por-curso.js';


/**
 * Banco de ejercicios de Khan Academy
 * Contenido curado manualmente de Khan Academy en español
 * Dado que la API pública es limitada, usamos contenido conocido
 */

export const KHAN_EXERCISES = {
    'Matemáticas': {
        'Fracciones': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/arithmetic/fraction-arithmetic',
            ejercicios: [
                {
                    tipo: 'Sumar fracciones con mismo denominador',
                    ejercicio: 'Calcula: 2/5 + 1/5',
                    respuesta: '3/5',
                    explicacion: 'Cuando las fracciones tienen el mismo denominador, sumamos los numeradores: 2 + 1 = 3, y mantenemos el denominador: 5'
                },
                {
                    tipo: 'Restar fracciones con mismo denominador',
                    ejercicio: 'Calcula: 4/7 - 2/7',
                    respuesta: '2/7',
                    explicacion: 'Restamos los numeradores: 4 - 2 = 2, mantenemos el denominador: 7'
                },
                {
                    tipo: 'Sumar fracciones con distinto denominador',
                    ejercicio: 'Calcula: 1/2 + 1/3',
                    respuesta: '5/6',
                    explicacion: 'Buscamos denominador común (6): 3/6 + 2/6 = 5/6'
                },
                {
                    tipo: 'Multiplicar fracciones',
                    ejercicio: 'Calcula: 2/3 × 3/4',
                    respuesta: '6/12 = 1/2',
                    explicacion: 'Multiplicamos numeradores (2×3=6) y denominadores (3×4=12), luego simplificamos'
                },
                {
                    tipo: 'Dividir fracciones',
                    ejercicio: 'Calcula: 3/4 ÷ 2/3',
                    respuesta: '9/8',
                    explicacion: 'Multiplicamos por la inversa: 3/4 × 3/2 = 9/8'
                },
                {
                    tipo: 'Simplificar fracciones',
                    ejercicio: 'Simplifica: 8/12',
                    respuesta: '2/3',
                    explicacion: 'Dividimos numerador y denominador por el MCD (4): 8÷4=2, 12÷4=3'
                },
                {
                    tipo: 'Fracciones equivalentes',
                    ejercicio: 'Encuentra una fracción equivalente a 1/2 con denominador 10',
                    respuesta: '5/10',
                    explicacion: 'Multiplicamos numerador y denominador por 5'
                },
                {
                    tipo: 'Comparar fracciones',
                    ejercicio: '¿Qué es mayor: 3/4 o 2/3?',
                    respuesta: '3/4',
                    explicacion: 'Convertimos a decimales o buscamos denominador común: 9/12 > 8/12'
                },
                {
                    tipo: 'Convertir fracción a decimal',
                    ejercicio: 'Convierte 3/5 a decimal',
                    respuesta: '0.6',
                    explicacion: 'Dividimos 3 ÷ 5 = 0.6'
                },
                {
                    tipo: 'Problemas con fracciones',
                    ejercicio: 'Si comes 1/4 de una pizza y luego 1/3, ¿cuánta pizza has comido en total?',
                    respuesta: '7/12',
                    explicacion: '1/4 + 1/3 = 3/12 + 4/12 = 7/12'
                },
                {
                    tipo: 'Fracción de un número',
                    ejercicio: 'Calcula 2/5 de 30',
                    respuesta: '12',
                    explicacion: '(2/5) × 30 = 60/5 = 12'
                },
                {
                    tipo: 'Números mixtos',
                    ejercicio: 'Convierte 7/3 a número mixto',
                    respuesta: '2 1/3',
                    explicacion: '7 ÷ 3 = 2 con resto 1, entonces 2 1/3'
                }
            ]
        },
        'Ecuaciones': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/algebra/one-variable-linear-equations',
            ejercicios: [
                {
                    tipo: 'Ecuaciones simples',
                    ejercicio: 'Resuelve: x + 7 = 15',
                    respuesta: 'x = 8',
                    explicacion: 'Restamos 7 a ambos lados: x = 15 - 7 = 8'
                },
                {
                    tipo: 'Ecuaciones con multiplicación',
                    ejercicio: 'Resuelve: 5x = 20',
                    respuesta: 'x = 4',
                    explicacion: 'Dividimos ambos lados por 5: x = 20/5 = 4'
                },
                {
                    tipo: 'Ecuaciones con dos operaciones',
                    ejercicio: 'Resuelve: 2x + 3 = 11',
                    respuesta: 'x = 4',
                    explicacion: 'Restamos 3: 2x = 8, luego dividimos por 2: x = 4'
                },
                {
                    tipo: 'Ecuaciones con paréntesis',
                    ejercicio: 'Resuelve: 3(x - 2) = 12',
                    respuesta: 'x = 6',
                    explicacion: 'Dividimos por 3: x - 2 = 4, sumamos 2: x = 6'
                },
                {
                    tipo: 'Ecuaciones con x en ambos lados',
                    ejercicio: 'Resuelve: 5x - 2 = 3x + 6',
                    respuesta: 'x = 4',
                    explicacion: 'Restamos 3x: 2x - 2 = 6, sumamos 2: 2x = 8, dividimos: x = 4'
                },
                {
                    tipo: 'Ecuaciones con fracciones',
                    ejercicio: 'Resuelve: x/4 = 5',
                    respuesta: 'x = 20',
                    explicacion: 'Multiplicamos ambos lados por 4: x = 20'
                },
                {
                    tipo: 'Problemas con ecuaciones',
                    ejercicio: 'El doble de un número más 5 es 17. ¿Qué número es?',
                    respuesta: '6',
                    explicacion: '2x + 5 = 17, entonces 2x = 12, x = 6'
                },
                {
                    tipo: 'Verificar soluciones',
                    ejercicio: '¿Es x = 3 solución de 4x - 2 = 10?',
                    respuesta: 'Sí',
                    explicacion: '4(3) - 2 = 12 - 2 = 10 ✓'
                }
            ]
        },
        'Geometría': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/geometry',
            ejercicios: [
                {
                    tipo: 'Área de rectángulo',
                    ejercicio: 'Calcula el área de un rectángulo de 6cm × 4cm',
                    respuesta: '24 cm²',
                    explicacion: 'Área = base × altura = 6 × 4 = 24 cm²'
                },
                {
                    tipo: 'Perímetro de cuadrado',
                    ejercicio: 'Un cuadrado tiene lado 5cm. ¿Cuál es su perímetro?',
                    respuesta: '20 cm',
                    explicacion: 'Perímetro = 4 × lado = 4 × 5 = 20 cm'
                },
                {
                    tipo: 'Área de triángulo',
                    ejercicio: 'Triángulo con base 8cm y altura 5cm. ¿Área?',
                    respuesta: '20 cm²',
                    explicacion: 'Área = (base × altura) / 2 = (8 × 5) / 2 = 20 cm²'
                },
                {
                    tipo: 'Área de círculo',
                    ejercicio: 'Círculo con radio 3cm. ¿Área? (π = 3.14)',
                    respuesta: '28.26 cm²',
                    explicacion: 'Área = π × r² = 3.14 × 9 = 28.26 cm²'
                },
                {
                    tipo: 'Perímetro de círculo',
                    ejercicio: 'Círculo con radio 4cm. ¿Perímetro? (π = 3.14)',
                    respuesta: '25.12 cm',
                    explicacion: 'Perímetro = 2 × π × r = 2 × 3.14 × 4 = 25.12 cm'
                },
                {
                    tipo: 'Ángulos en triángulos',
                    ejercicio: 'Un triángulo tiene ángulos de 50° y 60°. ¿Cuánto mide el tercer ángulo?',
                    respuesta: '70°',
                    explicacion: 'La suma de ángulos internos es 180°. 180 - 50 - 60 = 70°'
                },
                {
                    tipo: 'Clasificación de triángulos',
                    ejercicio: 'Un triángulo con lados 5, 5 y 5 cm es...',
                    respuesta: 'Equilátero',
                    explicacion: 'Todos los lados iguales = equilátero'
                },
                {
                    tipo: 'Volumen de cubo',
                    ejercicio: 'Cubo con arista 3cm. ¿Volumen?',
                    respuesta: '27 cm³',
                    explicacion: 'Volumen = lado³ = 3³ = 27 cm³'
                }
            ]
        }
    },
    'Ciencias Naturales': {
        'Biología': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/science/biology',
            ejercicios: [
                {
                    tipo: 'Células',
                    ejercicio: '¿Cuál es la diferencia principal entre célula animal y vegetal?',
                    respuesta: 'La célula vegetal tiene pared celular y cloroplastos',
                    explicacion: 'Las células vegetales tienen pared celular rígida y cloroplastos para fotosíntesis'
                },
                {
                    tipo: 'Fotosíntesis',
                    ejercicio: '¿Qué producen las plantas durante la fotosíntesis?',
                    respuesta: 'Glucosa y oxígeno',
                    explicacion: 'Las plantas usan luz, CO₂ y agua para producir glucosa y oxígeno'
                },
                {
                    tipo: 'ADN',
                    ejercicio: '¿Qué significan las siglas ADN?',
                    respuesta: 'Ácido Desoxirribonucleico',
                    explicacion: 'El ADN es la molécula que contiene la información genética'
                }
            ]
        }
    }
};

/**
 * Obtener ejercicios de Khan Academy para un tema
 * PRIORIDAD: Contenido por curso → Contenido por tema general
 */
export async function getKhanExercises({ asignatura, tema, cantidad = 10, curso = null }) {
    console.log(`🎓 Buscando ejercicios de Khan Academy: ${asignatura} - ${tema}${curso ? ` (${curso})` : ''}`);

    // PRIORIDAD 1: Buscar por CURSO específico
    if (curso) {
        const porCurso = await getKhanExercisesPorCurso({ curso, asignatura, tema, cantidad });
        if (porCurso && porCurso.ejercicios && porCurso.ejercicios.length > 0) {
            console.log(`✅ Usando ejercicios específicos de ${curso}`);
            return porCurso;
        }
    }

    // PRIORIDAD 2: Buscar en banco general por tema
    const ejerciciosAsignatura = KHAN_EXERCISES[asignatura] || {};
    const ejerciciosTema = ejerciciosAsignatura[tema];

    if (!ejerciciosTema) {
        console.log('⚠️ No hay ejercicios de Khan Academy para este tema');
        return null;
    }

    console.log(`✅ Encontrados ${ejerciciosTema.ejercicios.length} ejercicios de Khan Academy (generales)`);

    // Tomar los ejerciciosecesarios
    const ejerciciosSeleccionados = ejerciciosTema.ejercicios.slice(0, cantidad);

    return {
        source: 'KHAN_ACADEMY',
        url_oficial: ejerciciosTema.url,
        total_disponibles: ejerciciosTema.ejercicios.length,
        ejercicios: ejerciciosSeleccionados,
        metadata: {
            asignatura,
            tema,
            cantidad: ejerciciosSeleccionados.length
        }
    };
}

/**
 * Verificar si hay contenido de Khan Academy para un tema
 * PRIORIDAD: Contenido por curso → Contenido general
 */
export function hasKhanContent(asignatura, tema, curso = null) {
    // PRIORIDAD 1: Verificar contenido específico por curso (Santillana)
    if (curso && hasKhanContentPorCurso(curso, asignatura, tema)) {
        console.log(`✅ hasKhanContent: Encontrado contenido de ${curso} para ${asignatura} - ${tema}`);
        return true;
    }

    // PRIORIDAD 2: Verificar contenido general
    const ejerciciosAsignatura = KHAN_EXERCISES[asignatura] || {};
    const hasGeneral = !!ejerciciosAsignatura[tema];

    if (hasGeneral) {
        console.log(`✅ hasKhanContent: Encontrado contenido general para ${asignatura} - ${tema}`);
    }

    return hasGeneral;
}

/**
 * Adaptar ejercicios de Khan/Santillana a formato de preguntas
 * Maneja tanto formato Khan Academy como formato Santillana
 */
export function adaptKhanToQuestions(khanData) {
    if (!khanData || !khanData.ejercicios) return [];

    return khanData.ejercicios.map((ej, index) => {
        // Santillana usa 'ejercicio', Khan Academy también
        const preguntaTexto = ej.ejercicio || ej.pregunta || ej.text || 'Pregunta sin texto';

        // Determinar tipo basado en los campos disponibles
        let tipoPregunta = 'short_answer';
        if (ej.opciones && Array.isArray(ej.opciones)) {
            tipoPregunta = 'multiple_choice';
        } else if (ej.tipo === 'multiple_choice' || ej.tipo === 'essay') {
            tipoPregunta = ej.tipo;
        }

        // Determinar dificultad
        let dificultad = ej.dificultad || 'media';

        return {
            pregunta: preguntaTexto,
            tipo: tipoPregunta,
            tipo_detalle: ej.tipo_detalle, // Para tipos especializados como multi_input
            respuesta_correcta: ej.respuesta || ej.respuesta_correcta,
            opciones: ej.opciones || undefined,
            items: ej.items || undefined, // Para multi_input
            buckets: ej.buckets || undefined, // Para classification
            pairs: ej.pairs || undefined, // Para connector
            word_bank: ej.word_bank || undefined, // Para fill_blanks
            explicacion: ej.explicacion,
            dificultad: dificultad,
            fuente: khanData.source || 'Khan Academy/Santillana',
            numero: index + 1,
            // Campos adicionales de Santillana
            tipo_ejercicio: ej.tipo // El tipo original del ejercicio (ej: "Meseta", "Cordilleras")
        };
    });
}

export default {
    getKhanExercises,
    hasKhanContent,
    adaptKhanToQuestions,
    KHAN_EXERCISES
};
