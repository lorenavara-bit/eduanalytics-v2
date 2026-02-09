// CONTENIDO SANTILLANA 4º PRIMARIA - MATEMÁTICAS
// Basado en el temario típico de Santillana
// Creado para niños de 9 años

export const SANTILLANA_MATEMATICAS_4 = {
    'Matemáticas': {
        'Propiedad Conmutativa': {
            source: 'Santillana 4º Primaria - Tema 3',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué dice la propiedad conmutativa de la multiplicación?', respuesta: 'El orden de los factores no altera el producto', explicacion: 'Da igual el orden al multiplicar: 3 × 4 = 4 × 3 = 12' },
                { tipo: 'Aplicar', ejercicio: 'Completa: 5 × 7 = 7 × ?', respuesta: '5', explicacion: 'Por la propiedad conmutativa: 5 × 7 = 7 × 5' },
                { tipo: 'Verdadero/Falso', ejercicio: '¿Es cierto que 8 × 6 = 6 × 8?', respuesta: 'Verdadero', explicacion: 'Sí, ambas dan 48 (propiedad conmutativa)' },
                { tipo: 'Calcular', ejercicio: 'Si 9 × 4 = 36, ¿cuánto es 4 × 9?', respuesta: '36', explicacion: 'Es lo mismo por la propiedad conmutativa' },
                { tipo: 'Ejemplo real', ejercicio: 'Tienes 3 cajas con 5 lápices cada una. ¿Es lo mismo que 5 cajas con 3 lápices?', respuesta: 'Sí, en ambos casos hay 15 lápices', explicacion: '3 × 5 = 5 × 3 = 15' },
                { tipo: 'Identificar', ejercicio: '¿Cuál usa la propiedad conmutativa: "7 × 2 = 14" o "7 × 2 = 2 × 7"?', respuesta: '7 × 2 = 2 × 7', explicacion: 'Muestra que cambiar el orden da el mismo resultado' },
                { tipo: 'Completar', ejercicio: 'Completa: 6 × 3 = 18, entonces 3 × 6 = ?', respuesta: '18', explicacion: 'Por la propiedad conmutativa, ambos dan 18' },
                { tipo: 'Comparar propiedades', ejercicio: '¿La suma también tiene propiedad conmutativa? Da un ejemplo', respuesta: 'Sí. Ejemplo: 5 + 3 = 3 + 5 = 8', explicacion: 'Tanto suma como multiplicación son conmutativas' },
                { tipo: 'Problema', ejercicio: 'En una estantería hay 4 filas con 6 libros cada una. Si reorganizas en 6 filas con 4 libros, ¿cambias la cantidad total?', respuesta: 'No, siguen siendo 24 libros', explicacion: '4 × 6 = 6 × 4 = 24' },
                { tipo: 'Error común', ejercicio: '¿La resta tiene propiedad conmutativa? Justifica con un ejemplo', respuesta: 'NO. Ejemplo: 10 - 3 = 7, pero 3 - 10 = -7', explicacion: 'La resta NO es conmutativa, el orden importa' },
                { tipo: 'Desafío', ejercicio: '¿Qué operaciones tienen propiedad conmutativa: suma, resta, multiplicación, división?', respuesta: 'Suma y multiplicación', explicacion: 'Resta y división NO son conmutativas' },
                { tipo: 'Aplicación', ejercicio: 'Si sabes que 12 × 5 = 60, ¿cómo calculas 5 × 12 rápidamente?', respuesta: 'Es 60, por la propiedad conmutativa', explicacion: 'No hace falta calcular de nuevo' }
            ]
        },

        'Propiedad Asociativa': {
            source: 'Santillana 4º Primaria - Tema 3',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué dice la propiedad asociativa?', respuesta: 'Al multiplicar tres números, da igual cómo los agrupes', explicacion: '(2 × 3) × 4 = 2 × (3 × 4) = 24' },
                { tipo: 'Aplicar', ejercicio: 'Completa: (5 × 2) × 3 = 5 × (? × 3)', respuesta: '2', explicacion: 'Propiedad asociativa: cambiamos los paréntesis' },
                { tipo: 'Calcular fácil', ejercicio: 'Calcula de la forma más fácil: 2 × 5 × 7', respuesta: '70. Primero 2 × 5 = 10, luego 10 × 7 = 70', explicacion: 'Agrupamos los más fáciles primero' },
                { tipo: 'Estrategia', ejercicio: 'Para calcular 4 × 3 × 5, ¿qué es más fácil: (4 × 3) × 5 o 4 × (3 × 5)?', respuesta: '4 × (3 × 5), porque 3 × 5 = 15 y 4 × 15 = 60', explicacion: 'Elegimos agrupar para que sea más fácil' },
                { tipo: 'Problema', ejercicio: 'Hay 2 cajas. Cada caja tiene 4 paquetes. Cada paquete tiene 3 galletas. ¿Cuántas galletas hay en total?', respuesta: '24 galletas', explicacion: '2 × 4 × 3 = (2 × 4) × 3 = 8 × 3 = 24' },
                { tipo: 'Ejemplo real', ejercicio: 'Una clase tiene 5 filas de 2 mesas. Cada mesa tiene 4 sillas. ¿Cuántas sillas hay?', respuesta: '40 sillas', explicacion: '5 × 2 × 4 = 5 × (2 × 4) = 5 × 8 = 40' },
                { tipo: 'Verdadero/Falso', ejercicio: '¿(6 × 2) × 5 = 6 × (2 × 5)?', respuesta: 'Verdadero, ambos dan 60', explicacion: 'Por la propiedad asociativa' },
                { tipo: 'Mejor forma', ejercicio: '¿Cómo calcularías 8 × 2 × 5 de forma más rápida?', respuesta: '8 × (2 × 5) = 8 × 10 = 80', explicacion: '2 × 5 = 10 es fácil, luego multiplicar por 10' },
                { tipo: 'Con suma', ejercicio: '¿La suma también tiene propiedad asociativa? Ejemplo: (2 + 3) + 4', respuesta: 'Sí. (2 + 3) + 4 = 2 + (3 + 4) = 9', explicacion: 'La suma también es asociativa' },
                { tipo: 'Comparar', ejercicio: '¿Cuál es más fácil: (7 × 2) × 5 o 7 × (2 × 5)?', respuesta: '7 × (2 × 5), porque 2 × 5 = 10', explicacion: 'Siempre busca hacer 10 primero, es más fácil' },
                { tipo: 'Error común', ejercicio: '¿La resta tiene propiedad asociativa? Prueba con (10 - 5) - 2 y 10 - (5 - 2)', respuesta: 'NO. (10-5)-2=3 pero 10-(5-2)=7', explicacion: 'La resta NO es asociativa' },
                { tipo: 'Desafío', ejercicio: 'Calcula de la forma más rápida: 25 × 4 × 3', respuesta: '300', explicacion: '25 × 4 = 100, luego 100 × 3 = 300' }
            ]
        },

        'Propiedad Distributiva': {
            source: 'Santillana 4º Primaria - Tema 3',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué dice la propiedad distributiva?', respuesta: 'Para multiplicar un número por una suma, multiplicas por cada sumando', explicacion: '3 × (4 + 2) = (3 × 4) + (3 × 2) = 12 + 6 = 18' },
                { tipo: 'Aplicar', ejercicio: 'Aplica distributiva: 5 × (3 + 2) = ?', respuesta: '(5 × 3) + (5 × 2) = 15 + 10 = 25', explicacion: 'Multiplicamos 5 por cada sumando' },
                { tipo: 'Calcular', ejercicio: 'Calcula usando distributiva: 7 × (10 + 2)', respuesta: '(7 × 10) + (7 × 2) = 70 + 14 = 84', explicacion: 'Separamos para que sea más fácil' },
                { tipo: 'Estrategia mental', ejercicio: 'Para calcular 6 × 12, piensa en 12 como 10 + 2. ¿Cuánto es?', respuesta: '72', explicacion: '6 × 12 = 6 × (10+2) = 60 + 12 = 72' },
                { tipo: 'Problema', ejercicio: 'Compras 3 paquetes. Cada paquete tiene 5 chicles y 4 caramelos. ¿Cuántas golosinas tienes?', respuesta: '27 golosinas', explicacion: '3 × (5+4) = 3 × 9 = 27, o (3×5) + (3×4) = 15+12 = 27' },
                { tipo: 'Descomponer', ejercicio: 'Calcula 8 × 15 pensando en 15 como 10 + 5', respuesta: '120', explicacion: '8 × 15 = 8 × (10+5) = 80 + 40 = 120' },
                { tipo: 'Verdadero/Falso', ejercicio: '¿4 × (5 + 3) = (4 × 5) + (4 × 3)?', respuesta: 'Verdadero', explicacion: 'Eso es exactamente la propiedad distributiva' },
                { tipo: 'Al revés', ejercicio: 'Si (6 × 7) + (6 × 3) = 60, ¿a qué es igual usando distributiva?', respuesta: '6 × (7 + 3) = 6 × 10 = 60', explicacion: 'factor común fuera del paréntesis' },
                { tipo: 'Ejemplo real', ejercicio: 'En 4 mesas hay 6 niños y 2 niñas en cada una. ¿Cuántos niños hay en total?', respuesta: '32 niños', explicacion: '4 × (6+2) = 4 × 8 = 32' },
                { tipo: 'Trucomental', ejercicio: 'Para calcular 9 × 11, piensa en 11 como 10 + 1. ¿Resultado?', respuesta: '99', explicacion: '9 × 11 = 9 × (10+1) = 90 + 9 = 99' },
                { tipo: 'Con resta', ejercicio: '¿También funciona con resta? Calcula: 5 × (8 - 3)', respuesta: '25', explicacion: '5 × (8-3) = (5×8) - (5×3) = 40 - 15 = 25' },
                { tipo: 'Desafío', ejercicio: 'Usa distributiva para calcular 12 × 23', respuesta: '276', explicacion: '12 × 23 = 12 × (20+3) = 240 + 36 = 276' }
            ]
        },

        'Números de 5 y 6 cifras': {
            source: 'Santillana 4º Primaria - Tema 1',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Leer números', ejercicio: '¿Cómo se lee 45.678?', respuesta: 'Cuarenta y cinco mil seiscientos setenta y ocho', explicacion: '45 mil + 678' },
                { tipo: 'Escribir números', ejercicio: 'Escribe en cifras: Treinta y dos mil quinientos cuarenta y uno', respuesta: '32.541', explicacion: '32 mil + 541' },
                { tipo: 'Valor posicional', ejercicio: 'En el número 56.234, ¿qué valor tiene el 6?', respuesta: '6.000 (seis mil)', explicacion: 'El 6 está en la posición de los millares' },
                { tipo: 'Descomponer', ejercicio: 'Descompone 87.456', respuesta: '80.000 + 7.000 + 400 + 50 + 6', explicacion: 'Separamos según valor posicional' },
                { tipo: 'Componer', ejercicio: '¿Qué número es: 90.000 + 3.000 + 200 + 10 + 5?', respuesta: '93.215', explicacion: 'Sumamos todas las posiciones' },
                { tipo: 'Comparar', ejercicio: '¿Cuál es mayor: 45.678 o 54.876?', respuesta: '54.876', explicacion: '54 mil es mayor que 45 mil' },
                { tipo: 'Ordenar', ejercicio: 'Ordena de menor a mayor: 12.345, 21.543, 12.354', respuesta: '12.345, 12.354, 21.543', explicacion: 'Comparamos desde la izquierda' },
                { tipo: 'Anterior/Posterior', ejercicio: '¿Qué número va antes de 30.000?', respuesta: '29.999', explicacion: 'Restamos 1 a 30.000' },
                { tipo: 'Redondeo', ejercicio: 'Redondea 47.238 a la unidad de millar más cercana', respuesta: '47.000', explicacion: '238 es menos de 500, redondeamos hacia abajo' },
                { tipo: 'Problema', ejercicio: 'Un estadio tiene 52.345 asientos. Hay 48.129 personas. ¿Cuántos asientos quedan libres?', respuesta: '4.216 asientos', explicacion: '52.345 - 48.129 = 4.216' },
                { tipo: '6 cifras', ejercicio: '¿Cómo se lee 234.567?', respuesta: 'Doscientos treinta y cuatro mil quinientos sesenta y siete', explicacion: '234 mil + 567' },
                { tipo: 'Mayor de 6 cifras', ejercicio: '¿Qué número es mayor: 234.567 o 243.567?', respuesta: '243.567', explicacion: 'Comparamos: 243 mil \u003e 234 mil' }
            ]
        },

        'Números Decimales': {
            source: 'Santillana 4º Primaria - Tema 7',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Leer decimales', ejercicio: '¿Cómo se lee 2,5?', respuesta: 'Dos unidades y cinco décimas', explicacion: '2 enteros + 5 décimas' },
                { tipo: 'Escribir decimales', ejercicio: 'Escribe en cifras: Tres unidades y siete décimas', respuesta: '3,7', explicacion: '3 entero, 7 después de la coma' },
                { tipo: 'Centésimas', ejercicio: '¿Cómo se lee 4,25?', respuesta: 'Cuatro unidades y veinticinco centésimas', explicacion: '4 enteros + 25 centésimas' },
                { tipo: 'Valor posicional', ejercicio: 'En 5,38, ¿qué valor tiene el 3?', respuesta: '3 décimas o 0,3', explicacion: 'El 3 está en la posición las décimas' },
                { tipo: 'Comparar', ejercicio: '¿Qué es mayor: 3,7 o 3,5?', respuesta: '3,7', explicacion: '7 décimas \u003e 5 décimas' },
                { tipo: 'Ordenar', ejercicio: 'Ordena de menor a mayor: 2,8 - 2,5 - 2,9', respuesta: '2,5 - 2,8 - 2,9', explicacion: 'Comparamos las décimas' },
                { tipo: 'Suma decimal', ejercicio: 'Calcula: 3,5 + 2,3', respuesta: '5,8', explicacion: '3 + 2 = 5, y 5 décimas + 3 décimas = 8 décimas' },
                { tipo: 'Resta decimal', ejercicio: 'Calcula: 5,9 - 2,4', respuesta: '3,5', explicacion: '5 - 2 = 3, y 9 décimas - 4 décimas = 5 décimas' },
                { tipo: 'Problema dinero', ejercicio: 'Compras pan por 1,50€ y leche por 0,85€. ¿Cuánto gastas?', respuesta: '2,35€', explicacion: '1,50 + 0,85 = 2,35' },
                { tipo: 'Problema real', ejercicio: 'Mides 1,35 m. Tu hermano mide 1,28 m. ¿Cuánto más alto eres?', respuesta: '0,07 m = 7 cm', explicacion: '1,35 - 1,28 = 0,07' },
                { tipo: 'Equivalencias', ejercicio: '¿Cuántas décimas hay en 3,4?', respuesta: '34 décimas', explicacion: '3 unidades = 30 décimas, + 4 décimas = 34' },
                { tipo: 'Redondeo', ejercicio: 'Redondea 4,68 a las décimas', respuesta: '4,7', explicacion: '8 centésimas \u003e 5, redondeamos hacia arriba' }
            ]
        },

        'Medidas de Longitud': {
            source: 'Santillana 4º Primaria - Tema 8',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Unidades básicas', ejercicio: '¿Cuántos centímetros tiene 1 metro?', respuesta: '100 cm', explicacion: '1 m = 100 cm' },
                { tipo: 'Conversión m a cm', ejercicio: '¿Cuántos centímetros son 3 metros?', respuesta: '300 cm', explicacion: '3 × 100 = 300 cm' },
                { tipo: 'Conversión cm a m', ejercicio: '¿Cuántos metros son 250 cm?', respuesta: '2,5 m o 2 m y 50 cm', explicacion: '250 ÷ 100 = 2,5 m' },
                { tipo: 'Kilómetro', ejercicio: '¿Cuántos metros tiene 1 kilómetro?', respuesta: '1.000 m', explicacion: '1 km = 1.000 m' },
                { tipo: 'Sumar medidas', ejercicio: 'Suma: 2 m y 35 cm + 1 m y 50 cm', respuesta: '3 m y 85 cm', explicacion: '2 m + 1 m = 3 m, y 35 cm + 50 cm = 85 cm' },
                { tipo: 'Restar medidas', ejercicio: 'Resta: 5 m - 2 m y 40 cm', respuesta: '2 m y 60 cm', explicacion: '5 m = 4 m y 100 cm, luego 4 m 100 cm - 2 m 40 cm' },
                { tipo: 'Problema real', ejercicio: 'Tu clase mide 8 m de largo. ¿Cuántos centímetros es?', respuesta: '800 cm', explicacion: '8 × 100 = 800 cm' },
                { tipo: 'Comparar', ejercicio: '¿Qué es mayor: 3 m o 250 cm?', respuesta: '3 m', explicacion: '3 m = 300 cm, y 300 \u003e 250' },
                { tipo: 'Problema distancia', ejercicio: 'Caminas 500 m para ir al cole y 500 m de vuelta. ¿Cuántos km andas en total?', respuesta: '1 km', explicacion: '500 + 500 = 1.000 m = 1 km' },
                { tipo: 'Milímetro', ejercicio: '¿Cuántos milímetros tiene 1 centímetro?', respuesta: '10 mm', explicacion: '1 cm = 10 mm' },
                { tipo: 'Orden de unidades', ejercicio: 'Ordena de menor a mayor: km, m, cm, mm', respuesta: 'mm, cm, m, km', explicacion: 'Del más pequeño al más grande' },
                { tipo: 'Desafío', ejercicio: 'Tu lápiz mide 15 cm. ¿Cuántos lápices iguales necesitas para hacer 1 metro?', respuesta: '7 lápices (quedan 5 cm)', explicacion: '100 ÷ 15 = 6 con resto 10, necesitas 7' }
            ]
        },

        'Medidas de Tiempo': {
            source: 'Santillana 4º Primaria - Tema 10',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Horas y minutos', ejercicio: '¿Cuántos minutos tiene 1 hora?', respuesta: '60 minutos', explicacion: '1 h = 60 min' },
                { tipo: 'Conversión', ejercicio: '¿Cuántas horas son 120 minutos?', respuesta: '2 horas', explicacion: '120 ÷ 60 = 2 h' },
                { tipo: 'Leer reloj', ejercicio: 'Si el reloj marca las 3:45, ¿cuántos minutos faltan para las 4?', respuesta: '15 minutos', explicacion: 'De 3:45 a 4:00 hay 15 min' },
                { tipo: 'Sumar tiempo', ejercicio: 'Una película dura 1 hora y 30 minutos. Si empieza a las 5:00, ¿a qué hora termina?', respuesta: '6:30', explicacion: '5:00 + 1h 30min = 6:30' },
                { tipo: 'Restar tiempo', ejercicio: 'Llegas al cole a las 9:00. Si tardaste 25 minutos, ¿a qué hora saliste de casa?', respuesta: '8:35', explicacion: '9:00 - 25 min = 8:35' },
                { tipo: 'Días', ejercicio: '¿Cuántas horas tiene 1 día?', respuesta: '24 horas', explicacion: '1 día = 24 h' },
                { tipo: 'Semanas', ejercicio: '¿Cuántos días tienen 2 semanas?', respuesta: '14 días', explicacion: '1 semana = 7 días, 2 semanas = 14 días' },
                { tipo: 'Problema', ejercicio: 'Tu cumpleaños es en 10 días. ¿Cuántas semanas y días faltan?', respuesta: '1 semana y 3 días', explicacion: '10 = 7 + 3' },
                { tipo: 'Comparar', ejercicio: '¿Qué es más: 90 minutos o 1 hora?', respuesta: '90 minutos', explicacion: '90 min \u003e 60 min (1 hora)' },
                { tipo: 'Calcular duración', ejercicio: 'Sales de casa a las 8:15 y llegas al cole a las 8:40. ¿Cuántos minutos tardaste?', respuesta: '25 minutos', explicacion: 'De 8:15 a 8:40 = 25 min' },
                { tipo: 'Segundos', ejercicio: '¿Cuántos segundos tiene 1 minuto?', respuesta: '60 segundos', explicacion: '1 min = 60 seg' },
                { tipo: 'Desafío', ejercicio: 'Si duermes 8 horas al día, ¿cuántas horas duermes en una semana?', respuesta: '56 horas', explicacion: '8 h × 7 días = 56 h' }
            ]
        },

        'Ángulos': {
            source: 'Santillana 4º Primaria - Tema 11',
            nivel: '4º Primaria',
            ejercicios: [
                { tipo: 'Concepto', ejercicio: '¿Qué es un ángulo?', respuesta: 'La abertura entre dos rectas que se unen en un punto', explicacion: 'Un ángulo es una abertura formada por dos rectas' },
                { tipo: 'Partes del ángulo', ejercicio: '¿Cómo se llama el punto donde se juntan dos rectas de un ángulo?', respuesta: 'Vértice', explicacion: 'El vértice es el punto de unión' },
                { tipo: 'Ángulo recto', ejercicio: '¿Cuántos grados tiene un ángulo recto?', respuesta: '90 grados', explicacion: 'El ángulo recto mide 90°' },
                { tipo: 'Identificar recto', ejercicio: '¿Qué ángulo forman las esquinas de un cuaderno?', respuesta: 'Ángulos rectos (90°)', explicacion: 'Las esquinas son ángulos de 90°' },
                { tipo: 'Ángulo agudo', ejercicio: '¿Cómo es un ángulo agudo?', respuesta: 'Menor que un ángulo recto (menos de 90°)', explicacion: 'Agudo = estrecho, menos de 90°' },
                { tipo: 'Ángulo obtuso', ejercicio: '¿Cómo es un ángulo obtuso?', respuesta: 'Mayor que un ángulo recto (más de 90°)', explicacion: 'Obtuso = abierto, más de 90°' },
                { tipo: 'Clasificar', ejercicio: 'Un ángulo mide 45°. ¿Es agudo, recto u obtuso?', respuesta: 'Agudo', explicacion: '45° \u003c 90°, es agudo' },
                { tipo: 'Clasificar 2', ejercicio: 'Un ángulo mide 120°. ¿Es agudo, recto u obtuso?', respuesta: 'Obtuso', explicacion: '120° \u003e 90°, es obtuso' },
                { tipo: 'Circulo completo', ejercicio: '¿Cuántos grados tiene un giro completo?', respuesta: '360 grados', explicacion: 'Una vuelta entera = 360°' },
                { tipo: 'Problema', ejercicio: 'Si das media vuelta, ¿cuántos grados giras?', respuesta: '180 grados', explicacion: 'Media vuelta = 360° ÷ 2 = 180°' },
                { tipo: 'Ejemplo real', ejercicio: '¿Qué tipo de ángulo forman las manecillas del reloj a las 3:00?', respuesta: 'Ángulo recto (90°)', explicacion: 'A las 3:00 forman un ángulo de 90°' },
                { tipo: 'Desafío', ejercicio: '¿Cuántos ángulos rectos caben en un giro completo?', respuesta: '4 ángulos rectos', explicacion: '360° ÷ 90° = 4' }
            ]
        }
    }
};

export default { SANTILLANA_MATEMATICAS_4 };
