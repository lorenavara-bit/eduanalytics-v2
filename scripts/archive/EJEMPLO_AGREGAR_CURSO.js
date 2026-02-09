// EJEMPLO: Contenido para 5º Primaria - Matemáticas
// Archivo: src/services/khan/quinto-primaria-matematicas.js

export const QUINTO_PRIMARIA_MATEMATICAS = {
    'Matemáticas': {
        'Números decimales': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/arithmetic/decimals',
            nivel: '5º Primaria',
            ejercicios: [
                {
                    pregunta: '¿Qué representa el número 3.45?',
                    opciones: [
                        '3 unidades y 45 décimas',
                        '3 unidades, 4 décimas y 5 centésimas',
                        '34 unidades y 5 centésimas',
                        '345 milésimas'
                    ],
                    respuesta_correcta: 1,
                    explicacion: 'En 3.45, el 3 son unidades, el 4 son décimas (4/10) y el 5 son centésimas (5/100)',
                    dificultad: 'media',
                    tipo: 'multiple_choice'
                },
                {
                    pregunta: 'Ordena de menor a mayor: 2.3, 2.03, 2.33, 2.303',
                    dificultad: 'media',
                    tipo: 'short_answer',
                    pista: 'Compara primero las unidades, luego las décimas, luego las centésimas'
                },
                {
                    pregunta: 'Calcula: 5.6 + 3.25',
                    respuesta_correcta: '8.85',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Resuelve: 7.8 - 2.35',
                    respuesta_correcta: '5.45',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Multiplica: 2.5 × 4',
                    respuesta_correcta: '10',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Convierte a fracción: 0.75',
                    opciones: ['3/4', '7/5', '75/10', '75/100'],
                    respuesta_correcta: 0,
                    explicacion: '0.75 = 75/100 = 3/4 (simplificando)',
                    dificultad: 'media',
                    tipo: 'multiple_choice'
                },
                {
                    pregunta: 'Redondea 5.678 a las décimas',
                    respuesta_correcta: '5.7',
                    explicacion: 'El 6 en las centésimas hace que redondemos hacia arriba',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Si un libro cuesta 12.50€ y tienes un descuento de 2.25€, ¿cuánto pagarás?',
                    respuesta_correcta: '10.25',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Divide: 15.6 ÷ 3',
                    respuesta_correcta: '5.2',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: '¿Cuál es mayor: 0.8 o 0.79?',
                    opciones: ['0.8', '0.79', 'Son iguales'],
                    respuesta_correcta: 0,
                    explicacion: '0.8 = 0.80, que es mayor que 0.79',
                    dificultad: 'fácil',
                    tipo: 'multiple_choice'
                }
            ]
        },

        'Porcentajes': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/arithmetic/percentages',
            nivel: '5º Primaria',
            ejercicios: [
                {
                    pregunta: '¿Qué significa 50%?',
                    opciones: ['La mitad', 'El doble', 'Un tercio', 'Un cuarto'],
                    respuesta_correcta: 0,
                    explicacion: '50% significa 50 de cada 100, es decir, la mitad',
                    dificultad: 'fácil',
                    tipo: 'multiple_choice'
                },
                {
                    pregunta: 'Calcula el 10% de 200',
                    respuesta_correcta: '20',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Si un pantalón de 40€ tiene un descuento del 25%, ¿cuánto ahorras?',
                    respuesta_correcta: '10',
                    explicacion: '25% de 40 = 40 × 0.25 = 10€',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Convierte 1/4 a porcentaje',
                    respuesta_correcta: '25',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'En una clase de 20 alumnos, 5 son niñas. ¿Qué porcentaje son niñas?',
                    respuesta_correcta: '25',
                    explicacion: '5/20 = 1/4 = 25%',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Calcula el 50% de 80',
                    respuesta_correcta: '40',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Si apruebo el 75% de 8 exámenes, ¿cuántos apruebo?',
                    respuesta_correcta: '6',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: '¿Qué es mayor: 30% de 100 o 50% de 50?',
                    opciones: ['30% de 100', '50% de 50', 'Son iguales'],
                    respuesta_correcta: 1,
                    explicacion: '30% de 100 = 30; 50% de 50 = 25',
                    dificultad: 'difícil',
                    tipo: 'multiple_choice'
                },
                {
                    pregunta: 'Convierte 0.2 a porcentaje',
                    respuesta_correcta: '20',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Un producto de 60€ sube un 10%. ¿Cuál es el nuevo precio?',
                    respuesta_correcta: '66',
                    explicacion: '10% de 60 = 6€, entonces 60 + 6 = 66€',
                    dificultad: 'difícil',
                    tipo: 'short_answer'
                }
            ]
        },

        'Geometría: Área y perímetro': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/geometry/area-perimeter',
            nivel: '5º Primaria',
            ejercicios: [
                {
                    pregunta: 'Calcula el área de un rectángulo de 8 cm de largo y 5 cm de ancho',
                    respuesta_correcta: '40',
                    unidad: 'cm²',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Calcula el perímetro de un cuadrado de lado 7 cm',
                    respuesta_correcta: '28',
                    unidad: 'cm',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Un triángulo tiene base 10 cm y altura 6 cm. Calcula su área',
                    respuesta_correcta: '30',
                    explicacion: 'Área del triángulo = (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Calcula el área de un círculo de radio 5 cm (usa π ≈ 3.14)',
                    respuesta_correcta: '78.5',
                    explicacion: 'Área = π × r² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²',
                    dificultad: 'difícil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Un jardín rectangular de 12 m × 8 m. ¿Cuántos metros de valla se necesitan para cercarlo?',
                    respuesta_correcta: '40',
                    explicacion: 'Perímetro = 2 × (12 + 8) = 2 × 20 = 40 m',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Si duplico el lado de un cuadrado, ¿qué pasa con su área?',
                    opciones: [
                        'Se duplica',
                        'Se cuadruplica',
                        'Se triplica',
                        'No cambia'
                    ],
                    respuesta_correcta: 1,
                    explicacion: 'Si lado = 2, área = 4. Si lado = 4, área = 16. Es 4 veces mayor.',
                    dificultad: 'difícil',
                    tipo: 'multiple_choice'
                },
                {
                    pregunta: 'Calcula el perímetro de un triángulo equilátero de lado 9 cm',
                    respuesta_correcta: '27',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Tengo un rectángulo de área 48 cm² y base 8 cm. ¿Cuál es su altura?',
                    respuesta_correcta: '6',
                    explicacion: 'Altura = Área ÷ Base = 48 ÷ 8 = 6 cm',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: 'Calcula el área de un paralelogramo de base 10 cm y altura 4 cm',
                    respuesta_correcta: '40',
                    explicacion: 'Área = base × altura = 10 × 4 = 40 cm²',
                    dificultad: 'media',
                    tipo: 'short_answer'
                },
                {
                    pregunta: '¿Cuántos cuadrados de 1 cm² caben en un rectángulo de 6 cm × 5 cm?',
                    respuesta_correcta: '30',
                    dificultad: 'media',
                    tipo: 'short_answer'
                }
            ]
        }
    }
};
