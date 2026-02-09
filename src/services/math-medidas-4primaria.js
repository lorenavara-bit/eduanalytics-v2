/**
 * GENERADOR DE MEDIDAS 4º PRIMARIA - CON VARIEDAD
 * Genera ejercicios deterministas (100% precisos) sin usar IA
 * 
 * Temas implementados:
 * - Medidas de Longitud (mm, cm, dm, m, km)
 * - Medidas de Tiempo (s, min, h, días)
 */

// ==========================================
// UTILIDAD: Elegir por peso
// ==========================================

function elegirPorPeso(tipos) {
    const pool = [];
    tipos.forEach(t => {
        for (let i = 0; i < t.peso; i++) {
            pool.push(t.tipo);
        }
    });
    return pool[Math.floor(Math.random() * pool.length)];
}

// ==========================================
// MEDIDAS DE LONGITUD CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Conversión directa (mayor → menor)
 */
function generarLongitudConversionDirecta(nivel = 'medio') {
    const conversiones = {
        facil: [
            { de: 'km', a: 'm', factor: 1000, cantidad: [1, 2, 3, 4, 5] },
            { de: 'm', a: 'cm', factor: 100, cantidad: [1, 2, 3, 4, 5] },
            { de: 'dm', a: 'cm', factor: 10, cantidad: [1, 2, 3, 4, 5] }
        ],
        medio: [
            { de: 'km', a: 'm', factor: 1000, cantidad: [2, 3, 5, 7, 10] },
            { de: 'm', a: 'cm', factor: 100, cantidad: [10, 15, 20, 25] },
            { de: 'cm', a: 'mm', factor: 10, cantidad: [5, 10, 15, 20, 25] }
        ],
        dificil: [
            { de: 'km', a: 'm', factor: 1000, cantidad: [12, 15, 25, 50] },
            { de: 'm', a: 'mm', factor: 1000, cantidad: [5, 10, 15] },
            { de: 'dm', a: 'mm', factor: 100, cantidad: [3, 5, 7, 10] }
        ]
    };

    const lista = conversiones[nivel];
    const conv = lista[Math.floor(Math.random() * lista.length)];
    const cantidad = conv.cantidad[Math.floor(Math.random() * conv.cantidad.length)];
    const resultado = cantidad * conv.factor;

    const opciones = [
        resultado,
        resultado + conv.factor,
        resultado - conv.factor,
        cantidad + conv.factor
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'longitud_conversion_directa',
        pregunta: `¿Cuántos ${conv.a} son ${cantidad} ${conv.de}?`,
        operacion: `${cantidad} ${conv.de} → ${conv.a}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${conv.a}`),
        correcta: `${resultado} ${conv.a}`,
        explicacion: `${cantidad} ${conv.de} = ${cantidad} × ${conv.factor} = ${resultado} ${conv.a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Conversión inversa (menor → mayor)
 */
function generarLongitudConversionInversa(nivel = 'medio') {
    const conversiones = {
        facil: [
            { de: 'm', a: 'km', factor: 1000, cantidad: [1000, 2000, 3000] },
            { de: 'cm', a: 'm', factor: 100, cantidad: [100, 200, 300] },
            { de: 'cm', a: 'dm', factor: 10, cantidad: [10, 20, 30, 50] }
        ],
        medio: [
            { de: 'm', a: 'km', factor: 1000, cantidad: [2500, 5000, 7500] },
            { de: 'cm', a: 'm', factor: 100, cantidad: [150, 250, 350, 450] },
            { de: 'mm', a: 'cm', factor: 10, cantidad: [50, 100, 150, 200] }
        ],
        dificil: [
            { de: 'm', a: 'km', factor: 1000, cantidad: [12500, 25000, 37500] },
            { de: 'mm', a: 'm', factor: 1000, cantidad: [5000, 10000, 15000] },
            { de: 'mm', a: 'dm', factor: 100, cantidad: [500, 1000, 1500] }
        ]
    };

    const lista = conversiones[nivel];
    const conv = lista[Math.floor(Math.random() * lista.length)];
    const cantidad = conv.cantidad[Math.floor(Math.random() * conv.cantidad.length)];
    const resultado = cantidad / conv.factor;

    const opciones = [
        resultado,
        resultado + 1,
        resultado - 1,
        cantidad / (conv.factor / 10)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'longitud_conversion_inversa',
        pregunta: `¿Cuántos ${conv.a} son ${cantidad} ${conv.de}?`,
        operacion: `${cantidad} ${conv.de} → ${conv.a}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${conv.a}`),
        correcta: `${resultado} ${conv.a}`,
        explicacion: `${cantidad} ${conv.de} = ${cantidad} ÷ ${conv.factor} = ${resultado} ${conv.a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Suma con conversión
 */
function generarLongitudSumaConversion(nivel = 'medio') {
    let cantidad1, cantidad2, unidad1, unidad2, factorConversion;

    if (nivel === 'facil') {
        unidad1 = 'm';
        unidad2 = 'cm';
        factorConversion = 100;
        cantidad1 = Math.floor(Math.random() * 5) + 1;  // 1-5 m
        cantidad2 = Math.floor(Math.random() * 90) + 10; // 10-99 cm
    } else if (nivel === 'medio') {
        const opciones = [
            { u1: 'km', u2: 'm', factor: 1000 },
            { u1: 'm', u2: 'cm', factor: 100 }
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        unidad2 = seleccion.u2;
        factorConversion = seleccion.factor;
        cantidad1 = Math.floor(Math.random() * 8) + 2;
        cantidad2 = Math.floor(Math.random() * (factorConversion * 0.8)) + (factorConversion * 0.1);
    } else {
        const opciones = [
            { u1: 'km', u2: 'm', factor: 1000 },
            { u1: 'm', u2: 'mm', factor: 1000 }
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        unidad2 = seleccion.u2;
        factorConversion = seleccion.factor;
        cantidad1 = Math.floor(Math.random() * 15) + 5;
        cantidad2 = Math.floor(Math.random() * (factorConversion * 0.9)) + (factorConversion * 0.1);
    }

    // Convertir todo a la unidad menor
    const total = cantidad1 * factorConversion + cantidad2;

    const opciones = [
        total,
        total + factorConversion,
        total - factorConversion,
        cantidad1 + cantidad2
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'longitud_suma_conversion',
        pregunta: `¿Cuántos ${unidad2} son en total: ${cantidad1} ${unidad1} + ${cantidad2} ${unidad2}?`,
        operacion: `${cantidad1} ${unidad1} + ${cantidad2} ${unidad2} → ${unidad2}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${unidad2}`),
        correcta: `${total} ${unidad2}`,
        explicacion: `${cantidad1} ${unidad1} = ${cantidad1 * factorConversion} ${unidad2}. Luego: ${cantidad1 * factorConversion} + ${cantidad2} = ${total} ${unidad2}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparación
 */
function generarLongitudComparacion(nivel = 'medio') {
    let medida1, medida2, unidad1, unidad2, valor1, valor2;

    if (nivel === 'facil') {
        // Comparar en misma unidad
        unidad1 = unidad2 = ['m', 'cm', 'km'][Math.floor(Math.random() * 3)];
        valor1 = Math.floor(Math.random() * 50) + 10;
        valor2 = Math.floor(Math.random() * 50) + 10;
        while (valor1 === valor2) {
            valor2 = Math.floor(Math.random() * 50) + 10;
        }
    } else if (nivel === 'medio') {
        // Comparar unidades diferentes (fácil)
        const opciones = [
            { u1: 'km', v1: 2, u2: 'm', v2: 1500 },      // 2 km vs 1500 m
            { u1: 'm', v1: 5, u2: 'cm', v2: 450 },       // 5 m vs 450 cm
            { u1: 'km', v1: 3, u2: 'm', v2: 3500 }       // 3 km vs 3500 m
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        valor1 = seleccion.v1;
        unidad2 = seleccion.u2;
        valor2 = seleccion.v2;
    } else {
        // Comparar unidades diferentes (difícil)
        const opciones = [
            { u1: 'km', v1: 5, u2: 'm', v2: 4850 },
            { u1: 'm', v1: 12, u2: 'cm', v2: 1250 },
            { u1: 'dm', v1: 45, u2: 'cm', v2: 480 }
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        valor1 = seleccion.v1;
        unidad2 = seleccion.u2;
        valor2 = seleccion.v2;
    }

    // Normalizar a metros para comparar
    const factores = { mm: 0.001, cm: 0.01, dm: 0.1, m: 1, km: 1000 };
    const metros1 = valor1 * factores[unidad1];
    const metros2 = valor2 * factores[unidad2];

    const correcta = metros1 > metros2
        ? `${valor1} ${unidad1}`
        : metros2 > metros1
            ? `${valor2} ${unidad2}`
            : 'Son iguales';

    return {
        tipo: 'medida',
        subtipo: 'longitud_comparacion',
        pregunta: `¿Qué es mayor: ${valor1} ${unidad1} o ${valor2} ${unidad2}?`,
        operacion: `${valor1} ${unidad1} vs ${valor2} ${unidad2}`,
        opciones: [`${valor1} ${unidad1}`, `${valor2} ${unidad2}`, 'Son iguales'],
        correcta: correcta,
        explicacion: `${valor1} ${unidad1} = ${metros1} m y ${valor2} ${unidad2} = ${metros2} m. Por tanto, ${correcta}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema contextual
 */
function generarLongitudProblema(nivel = 'medio') {
    let distancia1, distancia2, unidad, resultado;

    if (nivel === 'facil') {
        unidad = 'm';
        distancia1 = Math.floor(Math.random() * 100) + 50;
        distancia2 = Math.floor(Math.random() * 100) + 50;
        resultado = distancia1 + distancia2;
    } else if (nivel === 'medio') {
        unidad = Math.random() > 0.5 ? 'km' : 'm';
        if (unidad === 'km') {
            distancia1 = Math.floor(Math.random() * 10) + 2;
            distancia2 = Math.floor(Math.random() * 10) + 2;
        } else {
            distancia1 = Math.floor(Math.random() * 500) + 100;
            distancia2 = Math.floor(Math.random() * 500) + 100;
        }
        resultado = distancia1 + distancia2;
    } else {
        unidad = 'km';
        distancia1 = (Math.floor(Math.random() * 40) + 10) / 10; // 1.0 - 5.0
        distancia2 = (Math.floor(Math.random() * 40) + 10) / 10;
        resultado = Math.round((distancia1 + distancia2) * 10) / 10;
    }

    const contextos = [
        {
            plantilla: `Ana camina ${distancia1} ${unidad} por la mañana y ${distancia2} ${unidad} por la tarde. ¿Cuántos ${unidad} camina en total?`,
            unidad: unidad
        },
        {
            plantilla: `Un ciclista recorre ${distancia1} ${unidad} el lunes y ${distancia2} ${unidad} el martes. ¿Qué distancia recorre en total?`,
            unidad: unidad
        },
        {
            plantilla: `La distancia de casa al colegio es ${distancia1} ${unidad} y del colegio al parque ${distancia2} ${unidad}. ¿Cuál es la distancia total?`,
            unidad: unidad
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + (unidad === 'km' ? 1 : 10),
        resultado - (unidad === 'km' ? 1 : 10),
        Math.abs(distancia1 - distancia2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'longitud_problema',
        pregunta: contexto.plantilla,
        operacion: `${distancia1} + ${distancia2} ${unidad}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${unidad}`),
        correcta: `${resultado} ${unidad}`,
        explicacion: `${distancia1} + ${distancia2} = ${resultado} ${unidad}`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de MEDIDA DE LONGITUD con VARIEDAD
 */
export function generarMedidaLongitud(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarLongitudConversionDirecta(nivel);
    }

    const tipos = [
        { tipo: 'conversion_directa', peso: 30 },
        { tipo: 'conversion_inversa', peso: 25 },
        { tipo: 'suma_conversion', peso: 20 },
        { tipo: 'comparacion', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'conversion_directa':
            return generarLongitudConversionDirecta(nivel);
        case 'conversion_inversa':
            return generarLongitudConversionInversa(nivel);
        case 'suma_conversion':
            return generarLongitudSumaConversion(nivel);
        case 'comparacion':
            return generarLongitudComparacion(nivel);
        case 'problema':
            return generarLongitudProblema(nivel);
        default:
            return generarLongitudConversionDirecta(nivel);
    }
}

// ==========================================
// MEDIDAS DE TIEMPO CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Conversión directa (mayor → menor)
 */
function generarTiempoConversionDirecta(nivel = 'medio') {
    const conversiones = {
        facil: [
            { de: 'h', a: 'min', factor: 60, cantidad: [1, 2, 3, 4, 5] },
            { de: 'min', a: 's', factor: 60, cantidad: [1, 2, 3, 5, 10] },
            { de: 'días', a: 'h', factor: 24, cantidad: [1, 2, 3] }
        ],
        medio: [
            { de: 'h', a: 'min', factor: 60, cantidad: [2, 3, 5, 8, 12] },
            { de: 'min', a: 's', factor: 60, cantidad: [5, 10, 15, 20, 30] },
            { de: 'días', a: 'h', factor: 24, cantidad: [2, 3, 5, 7] }
        ],
        dificil: [
            { de: 'h', a: 's', factor: 3600, cantidad: [1, 2, 3] },
            { de: 'días', a: 'min', factor: 1440, cantidad: [1, 2] },
            { de: 'h', a: 'min', factor: 60, cantidad: [12, 24, 48] }
        ]
    };

    const lista = conversiones[nivel];
    const conv = lista[Math.floor(Math.random() * lista.length)];
    const cantidad = conv.cantidad[Math.floor(Math.random() * conv.cantidad.length)];
    const resultado = cantidad * conv.factor;

    const opciones = [
        resultado,
        resultado + conv.factor,
        resultado - conv.factor,
        cantidad + conv.factor
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'tiempo_conversion_directa',
        pregunta: `¿Cuántos ${conv.a} son ${cantidad} ${conv.de}?`,
        operacion: `${cantidad} ${conv.de} → ${conv.a}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${conv.a}`),
        correcta: `${resultado} ${conv.a}`,
        explicacion: `${cantidad} ${conv.de} = ${cantidad} × ${conv.factor} = ${resultado} ${conv.a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Conversión inversa (menor → mayor)
 */
function generarTiempoConversionInversa(nivel = 'medio') {
    const conversiones = {
        facil: [
            { de: 'min', a: 'h', factor: 60, cantidad: [60, 120, 180] },
            { de: 's', a: 'min', factor: 60, cantidad: [60, 120, 180, 300] },
            { de: 'h', a: 'días', factor: 24, cantidad: [24, 48] }
        ],
        medio: [
            { de: 'min', a: 'h', factor: 60, cantidad: [90, 150, 240, 360] },
            { de: 's', a: 'min', factor: 60, cantidad: [90, 150, 240, 420] },
            { de: 'h', a: 'días', factor: 24, cantidad: [48, 72, 96] }
        ],
        dificil: [
            { de: 's', a: 'h', factor: 3600, cantidad: [3600, 7200, 10800] },
            { de: 'min', a: 'días', factor: 1440, cantidad: [1440, 2880] },
            { de: 'min', a: 'h', factor: 60, cantidad: [450, 600, 900] }
        ]
    };

    const lista = conversiones[nivel];
    const conv = lista[Math.floor(Math.random() * lista.length)];
    const cantidad = conv.cantidad[Math.floor(Math.random() * conv.cantidad.length)];
    const resultado = cantidad / conv.factor;

    const opciones = [
        resultado,
        resultado + 1,
        resultado - 1,
        cantidad / (conv.factor / 2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'tiempo_conversion_inversa',
        pregunta: `¿Cuántos ${conv.a} son ${cantidad} ${conv.de}?`,
        operacion: `${cantidad} ${conv.de} → ${conv.a}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${conv.a}`),
        correcta: `${resultado} ${conv.a}`,
        explicacion: `${cantidad} ${conv.de} = ${cantidad} ÷ ${conv.factor} = ${resultado} ${conv.a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Suma de tiempos
 */
function generarTiempoSuma(nivel = 'medio') {
    let tiempo1, tiempo2, unidad, resultado;

    if (nivel === 'facil') {
        unidad = ['min', 's', 'h'][Math.floor(Math.random() * 3)];
        if (unidad === 'h') {
            tiempo1 = Math.floor(Math.random() * 3) + 1;
            tiempo2 = Math.floor(Math.random() * 3) + 1;
        } else if (unidad === 'min') {
            tiempo1 = Math.floor(Math.random() * 30) + 10;
            tiempo2 = Math.floor(Math.random() * 30) + 10;
        } else {
            tiempo1 = Math.floor(Math.random() * 50) + 10;
            tiempo2 = Math.floor(Math.random() * 50) + 10;
        }
        resultado = tiempo1 + tiempo2;
    } else if (nivel === 'medio') {
        unidad = ['min', 'h'][Math.floor(Math.random() * 2)];
        if (unidad === 'h') {
            tiempo1 = Math.floor(Math.random() * 8) + 2;
            tiempo2 = Math.floor(Math.random() * 8) + 2;
        } else {
            tiempo1 = Math.floor(Math.random() * 50) + 20;
            tiempo2 = Math.floor(Math.random() * 50) + 20;
        }
        resultado = tiempo1 + tiempo2;
    } else {
        unidad = 'min';
        tiempo1 = Math.floor(Math.random() * 90) + 30;
        tiempo2 = Math.floor(Math.random() * 90) + 30;
        resultado = tiempo1 + tiempo2;
    }

    const opciones = [
        resultado,
        resultado + 10,
        resultado - 10,
        Math.abs(tiempo1 - tiempo2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'tiempo_suma',
        pregunta: `Si dedicas ${tiempo1} ${unidad} a una tarea y ${tiempo2} ${unidad} a otra, ¿cuánto tiempo dedicas en total?`,
        operacion: `${tiempo1} + ${tiempo2} ${unidad}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${unidad}`),
        correcta: `${resultado} ${unidad}`,
        explicacion: `${tiempo1} + ${tiempo2} = ${resultado} ${unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparación de tiempos
 */
function generarTiempoComparacion(nivel = 'medio') {
    let tiempo1, tiempo2, unidad1, unidad2, valor1, valor2;

    if (nivel === 'facil') {
        // Misma unidad
        unidad1 = unidad2 = ['min', 's', 'h'][Math.floor(Math.random() * 3)];
        valor1 = Math.floor(Math.random() * 50) + 10;
        valor2 = Math.floor(Math.random() * 50) + 10;
        while (valor1 === valor2) {
            valor2 = Math.floor(Math.random() * 50) + 10;
        }
    } else if (nivel === 'medio') {
        const opciones = [
            { u1: 'h', v1: 2, u2: 'min', v2: 100 },
            { u1: 'min', v1: 3, u2: 's', v2: 150 },
            { u1: 'días', v1: 1, u2: 'h', v2: 20 }
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        valor1 = seleccion.v1;
        unidad2 = seleccion.u2;
        valor2 = seleccion.v2;
    } else {
        const opciones = [
            { u1: 'h', v1: 3, u2: 'min', v2: 175 },
            { u1: 'días', v1: 2, u2: 'h', v2: 45 },
            { u1: 'min', v1: 5, u2: 's', v2: 280 }
        ];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        unidad1 = seleccion.u1;
        valor1 = seleccion.v1;
        unidad2 = seleccion.u2;
        valor2 = seleccion.v2;
    }

    // Normalizar a minutos para comparar
    const factores = { s: 1 / 60, min: 1, h: 60, días: 1440 };
    const minutos1 = valor1 * factores[unidad1];
    const minutos2 = valor2 * factores[unidad2];

    const correcta = minutos1 > minutos2
        ? `${valor1} ${unidad1}`
        : minutos2 > minutos1
            ? `${valor2} ${unidad2}`
            : 'Son iguales';

    return {
        tipo: 'medida',
        subtipo: 'tiempo_comparacion',
        pregunta: `¿Qué tiempo es mayor: ${valor1} ${unidad1} o ${valor2} ${unidad2}?`,
        operacion: `${valor1} ${unidad1} vs ${valor2} ${unidad2}`,
        opciones: [`${valor1} ${unidad1}`, `${valor2} ${unidad2}`, 'Son iguales'],
        correcta: correcta,
        explicacion: `${valor1} ${unidad1} = ${minutos1} min y ${valor2} ${unidad2} = ${minutos2} min. Por tanto, ${correcta}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema contextual
 */
function generarTiempoProblema(nivel = 'medio') {
    let duracion1, duracion2, unidad, resultado;

    if (nivel === 'facil') {
        unidad = 'min';
        duracion1 = Math.floor(Math.random() * 40) + 20;
        duracion2 = Math.floor(Math.random() * 40) + 20;
        resultado = duracion1 + duracion2;
    } else if (nivel === 'medio') {
        unidad = Math.random() > 0.5 ? 'h' : 'min';
        if (unidad === 'h') {
            duracion1 = Math.floor(Math.random() * 4) + 1;
            duracion2 = Math.floor(Math.random() * 4) + 1;
        } else {
            duracion1 = Math.floor(Math.random() * 60) + 30;
            duracion2 = Math.floor(Math.random() * 60) + 30;
        }
        resultado = duracion1 + duracion2;
    } else {
        unidad = 'h';
        duracion1 = Math.floor(Math.random() * 8) + 2;
        duracion2 = Math.floor(Math.random() * 8) + 2;
        resultado = duracion1 + duracion2;
    }

    const contextos = [
        {
            plantilla: `María estudia ${duracion1} ${unidad} de matemáticas y ${duracion2} ${unidad} de lengua. ¿Cuánto tiempo estudia en total?`,
            unidad: unidad
        },
        {
            plantilla: `Un partido de fútbol dura ${duracion1} ${unidad} y el descanso ${duracion2} ${unidad}. ¿Cuánto tiempo dura todo?`,
            unidad: unidad
        },
        {
            plantilla: `Juan tarda ${duracion1} ${unidad} en ir al colegio y ${duracion2} ${unidad} en volver. ¿Cuánto tiempo dedica en total?`,
            unidad: unidad
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + (unidad === 'h' ? 1 : 10),
        resultado - (unidad === 'h' ? 1 : 10),
        Math.abs(duracion1 - duracion2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'medida',
        subtipo: 'tiempo_problema',
        pregunta: contexto.plantilla,
        operacion: `${duracion1} + ${duracion2} ${unidad}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${unidad}`),
        correcta: `${resultado} ${unidad}`,
        explicacion: `${duracion1} + ${duracion2} = ${resultado} ${unidad}`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de MEDIDA DE TIEMPO con VARIEDAD
 */
export function generarMedidaTiempo(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarTiempoConversionDirecta(nivel);
    }

    const tipos = [
        { tipo: 'conversion_directa', peso: 30 },
        { tipo: 'conversion_inversa', peso: 25 },
        { tipo: 'suma', peso: 20 },
        { tipo: 'comparacion', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'conversion_directa':
            return generarTiempoConversionDirecta(nivel);
        case 'conversion_inversa':
            return generarTiempoConversionInversa(nivel);
        case 'suma':
            return generarTiempoSuma(nivel);
        case 'comparacion':
            return generarTiempoComparacion(nivel);
        case 'problema':
            return generarTiempoProblema(nivel);
        default:
            return generarTiempoConversionDirecta(nivel);
    }
}

// ==========================================
// EXPORTACIONES
// ==========================================

export default {
    generarMedidaLongitud,
    generarMedidaTiempo
};
