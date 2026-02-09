// CONTENIDO 5º PRIMARIA - MATEMÁTICAS
// Para niños de 10-11 años

export const QUINTO_PRIMARIA_MATEMATICAS = {
    'Matemáticas': {
        'Números decimales': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué representa el número 3.45?', respuesta: '3 unidades, 4 décimas y 5 centésimas', explicacion: 'En 3.45, el 3 son unidades, el 4 son décimas (4/10) y el 5 son centésimas (5/100)' },
                { tipo: 'Ordenar', ejercicio: 'Ordena de menor a mayor: 2.3, 2.03, 2.33, 2.303', respuesta: '2.03, 2.3, 2.303, 2.33', explicacion: 'Compara primero las unidades, luego las décimas, luego las centésimas' },
                { tipo: 'Suma', ejercicio: 'Calcula: 5.6 + 3.25', respuesta: '8.85', explicacion: 'Alinea las comas y suma: 5.60 + 3.25 = 8.85' },
                { tipo: 'Resta', ejercicio: 'Resuelve: 7.8 - 2.35', respuesta: '5.45', explicacion: 'Alinea las comas: 7.80 - 2.35 = 5.45' },
                { tipo: 'Multiplicación', ejercicio: 'Multiplica: 2.5 × 4', respuesta: '10', explicacion: '2.5 × 4 = 10.0 = 10' },
                { tipo: 'División', ejercicio: 'Divide: 15.6 ÷ 3', respuesta: '5.2', explicacion: 'Divide como números enteros y coloca la coma: 156 ÷ 3 = 52, entonces 15.6 ÷ 3 = 5.2' },
                { tipo: 'Conversión', ejercicio: 'Convierte a fracción: 0.75', respuesta: '3/4', explicacion: '0.75 = 75/100 = 3/4 (simplificando)' },
                { tipo: 'Redondeo', ejercicio: 'Redondea 5.678 a las décimas', respuesta: '5.7', explicacion: 'El 6 en las centésimas hace que redondemos hacia arriba' },
                { tipo: 'Problema', ejercicio: 'Si un libro cuesta 12.50€ y tienes un descuento de 2.25€, ¿cuánto pagarás?', respuesta: '10.25€', explicacion: '12.50 - 2.25 = 10.25€' },
                { tipo: 'Comparación', ejercicio: '¿Cuál es mayor: 0.8 o 0.79?', respuesta: '0.8', explicacion: '0.8 = 0.80, que es mayor que 0.79' }
            ]
        },

        'Porcentajes': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué significa 50%?', respuesta: 'La mitad, 50 de cada 100', explicacion: '50% significa 50 de cada 100, es decir, la mitad' },
                { tipo: 'Cálculo básico', ejercicio: 'Calcula el 10% de 200', respuesta: '20', explicacion: '10% de 200 = 200 × 0.10 = 20' },
                { tipo: 'Cálculo medio', ejercicio: 'Calcula el 25% de 80', respuesta: '20', explicacion: '25% de 80 = 80 × 0.25 = 20' },
                { tipo: 'Descuento', ejercicio: 'Si un pantalón de 40€ tiene un descuento del 25%, ¿cuánto ahorras?', respuesta: '10€', explicacion: '25% de 40 = 40 × 0.25 = 10€' },
                { tipo: 'Conversión', ejercicio: 'Convierte 1/4 a porcentaje', respuesta: '25%', explicacion: '1/4 = 0.25 = 25%' },
                { tipo: 'Problema', ejercicio: 'En una clase de 20 alumnos, 5 son niñas. ¿Qué porcentaje son niñas?', respuesta: '25%', explicacion: '5/20 = 1/4 = 25%' },
                { tipo: 'Cálculo', ejercicio: 'Si apruebo el 75% de 8 exámenes, ¿cuántos apruebo?', respuesta: '6', explicacion: '75% de 8 = 8 × 0.75 = 6 exámenes' },
                { tipo: 'Conversión decimal', ejercicio: 'Convierte 0.2 a porcentaje', respuesta: '20%', explicacion: '0.2 × 100 = 20%' },
                { tipo: 'Aumento', ejercicio: 'Un producto de 60€ sube un 10%. ¿Cuál es el nuevo precio?', respuesta: '66€', explicacion: '10% de 60 = 6€, entonces 60 + 6 = 66€' },
                { tipo: 'Comparación', ejercicio: '¿Qué es mayor: 30% de 100 o 50% de 50?', respuesta: '30% de 100', explicacion: '30% de 100 = 30; 50% de 50 = 25, entonces 30 > 25' }
            ]
        },

        'Múltiplos y divisores': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Múltiplos', ejercicio: 'Escribe los 5 primeros múltiplos de 3', respuesta: '3, 6, 9, 12, 15', explicacion: 'Múltiplos de 3: 3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15' },
                { tipo: 'Divisores', ejercicio: 'Escribe todos los divisores de 12', respuesta: '1, 2, 3, 4, 6, 12', explicacion: 'Los números que dividen exactamente a 12' },
                { tipo: 'Primo', ejercicio: '¿Es 7 un número primo?', respuesta: 'Sí', explicacion: '7 solo es divisible por 1 y por 7' },
                { tipo: 'Compuesto', ejercicio: '¿Es 9 un número primo o compuesto?', respuesta: 'Compuesto', explicacion: '9 es divisible por 1, 3 y 9, por tanto es compuesto' },
                { tipo: 'MCM', ejercicio: 'Calcula el mínimo común múltiplo (m.c.m.) de 4 y 6', respuesta: '12', explicacion: 'Múltiplos de 4: 4, 8, 12... Múltiplos de 6: 6, 12... El menor común es 12' },
                { tipo: 'MCD', ejercicio: 'Calcula el máximo común divisor (M.C.D.) de 12 y 18', respuesta: '6', explicacion: 'Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. El mayor común es 6' },
                { tipo: 'Criterio 2', ejercicio: '¿Es 348 divisible por 2?', respuesta: 'Sí', explicacion: 'Termina en número par (8), por tanto es divisible por 2' },
                { tipo: 'Criterio 3', ejercicio: '¿Es 123 divisible por 3?', respuesta: 'Sí', explicacion: '1+2+3=6, que es múltiplo de 3, por tanto 123 es divisible por 3' },
                { tipo: 'Criterio 5', ejercicio: '¿Es 145 divisible por 5?', respuesta: 'Sí', explicacion: 'Termina en 5, por tanto es divisible por 5' },
                { tipo: 'Problema', ejercicio: 'Quiero repartir 24 caramelos en bolsas iguales. ¿De cuántas formas puedo hacerlo?', respuesta: '8 formas (1×24, 2×12, 3×8, 4×6, 6×4, 8×3, 12×2, 24×1)', explicacion: 'Tantas formas como divisores tiene 24' }
            ]
        },

        'Área y perímetro': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Rectángulo área', ejercicio: 'Calcula el área de un rectángulo de 8 cm de largo y 5 cm de ancho', respuesta: '40 cm²', explicacion: 'Área = largo × ancho = 8 × 5 = 40 cm²' },
                { tipo: 'Cuadrado perímetro', ejercicio: 'Calcula el perímetro de un cuadrado de lado 7 cm', respuesta: '28 cm', explicacion: 'Perímetro = 4 × lado = 4 × 7 = 28 cm' },
                { tipo: 'Triángulo área', ejercicio: 'Un triángulo tiene base 10 cm y altura 6 cm. Calcula su área', respuesta: '30 cm²', explicacion: 'Área = (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²' },
                { tipo: 'Círculo área', ejercicio: 'Calcula el área de un círculo de radio 5 cm (usa π ≈ 3.14)', respuesta: '78.5 cm²', explicacion: 'Área = π × r² = 3.14 × 5² = 3.14 × 25 = 78.5 cm²' },
                { tipo: 'Jardín', ejercicio: 'Un jardín rectangular de 12 m × 8 m. ¿Cuántos metros de valla se necesitan para cercarlo?', respuesta: '40 m', explicacion: 'Perímetro = 2 × (12 + 8) = 2 × 20 = 40 m' },
                { tipo: 'Duplicar', ejercicio: 'Si duplico el lado de un cuadrado, ¿qué pasa con su área?', respuesta: 'Se cuadruplica (×4)', explicacion: 'Si lado=2, área=4. Si lado=4, área=16. Es 4 veces mayor' },
                { tipo: 'Triángulo perímetro', ejercicio: 'Calcula el perímetro de un triángulo equilátero de lado 9 cm', respuesta: '27 cm', explicacion: 'Perímetro = 3 × lado = 3 × 9 = 27 cm' },
                { tipo: 'Inversa', ejercicio: 'Tengo un rectángulo de área 48 cm² y base 8 cm. ¿Cuál es su altura?', respuesta: '6 cm', explicacion: 'Altura = Área ÷ Base = 48 ÷ 8 = 6 cm' },
                { tipo: 'Paralelogramo', ejercicio: 'Calcula el área de un paralelogramo de base 10 cm y altura 4 cm', respuesta: '40 cm²', explicacion: 'Área = base × altura = 10 × 4 = 40 cm²' },
                { tipo: 'Cuadrados', ejercicio: '¿Cuántos cuadrados de 1 cm² caben en un rectángulo de 6 cm × 5 cm?', respuesta: '30', explicacion: 'Área del rectángulo = 6 × 5 = 30 cm²' }
            ]
        },

        'Unidades de medida': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Longitud', ejercicio: 'Convierte 3 km a metros', respuesta: '3000 m', explicacion: '1 km = 1000 m, entonces 3 km = 3 × 1000 = 3000 m' },
                { tipo: 'Masa', ejercicio: 'Convierte 5 kg a gramos', respuesta: '5000 g', explicacion: '1 kg = 1000 g, entonces 5 kg = 5 × 1000 = 5000 g' },
                { tipo: 'Capacidad', ejercicio: 'Convierte 2 litros a mililitros', respuesta: '2000 ml', explicacion: '1 L = 1000 ml, entonces 2 L = 2 × 1000 = 2000 ml' },
                { tipo: 'Centímetros', ejercicio: '¿Cuántos centímetros hay en 5 metros?', respuesta: '500 cm', explicacion: '1 m = 100 cm, entonces 5 m = 5 × 100 = 500 cm' },
                { tipo: 'Toneladas', ejercicio: 'Convierte 2 toneladas a kilogramos', respuesta: '2000 kg', explicacion: '1 tonelada = 1000 kg, entonces 2 t = 2000 kg' },
                { tipo: 'Suma medidas', ejercicio: 'Suma: 2 m 35 cm + 1 m 80 cm', respuesta: '4 m 15 cm', explicacion: '2m 35cm + 1m 80cm = 3m 115cm = 4m 15cm' },
                { tipo: 'Resta medidas', ejercicio: 'Resta: 5 kg 200 g - 2 kg 750 g', respuesta: '2 kg 450 g', explicacion: '5kg 200g - 2kg 750g = 4kg 1200g - 2kg 750g = 2kg 450g' },
                { tipo: 'Problema litros', ejercicio: 'Si una botella tiene 500 ml, ¿cuántas necesito para llenar un recipiente de 2 litros?', respuesta: '4 botellas', explicacion: '2 L = 2000 ml. 2000 ÷ 500 = 4 botellas' },
                { tipo: 'Tiempo', ejercicio: '¿Cuántos minutos son 2 horas y 30 minutos?', respuesta: '150 minutos', explicacion: '2 horas = 120 minutos. 120 + 30 = 150 minutos' },
                { tipo: 'Superficie', ejercicio: '¿Cuántos metros cuadrados son 50000 cm²?', respuesta: '5 m²', explicacion: '1 m² = 10000 cm², entonces 50000 cm² = 5 m²' }
            ]
        }
    }
};

export default { QUINTO_PRIMARIA_MATEMATICAS };
