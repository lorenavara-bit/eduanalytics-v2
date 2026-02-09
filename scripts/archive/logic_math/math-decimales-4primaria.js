/**
 * GENERADOR DE NÚMEROS DECIMALES 4º PRIMARIA - CON VARIEDAD
 * Genera ejercicios deterministas (100% precisos) sin usar IA
 * 
 * Temas implementados:
 * - Suma de decimales (décimas, centésimas)
 * - Resta de decimales
 * - Comparación de decimales
 * - Redondeo de decimales
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
// SUMA DE DECIMALES CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Suma directa de décimas
 */
function generarSumaDecimalDirecta(nivel = 'facil') {
    let a, b, resultado, decimales;

    if (nivel === 'facil') {
        // Solo décimas
        decimales = 1;
        a = (Math.floor(Math.random() * 90) + 10) / 10;  // 1.0 - 9.9
        b = (Math.floor(Math.random() * 90) + 10) / 10;
        resultado = Math.round((a + b) * 10) / 10;
    } else if (nivel === 'medio') {
        // Décimas y centésimas
        decimales = Math.random() > 0.5 ? 1 : 2;
        if (decimales === 1) {
            a = (Math.floor(Math.random() * 190) + 10) / 10;  // 1.0 - 19.9
            b = (Math.floor(Math.random() * 190) + 10) / 10;
            resultado = Math.round((a + b) * 10) / 10;
        } else {
            a = (Math.floor(Math.random() * 900) + 100) / 100;  // 1.00 - 9.99
            b = (Math.floor(Math.random() * 900) + 100) / 100;
            resultado = Math.round((a + b) * 100) / 100;
        }
    } else {
        // Centésimas mixtas
        decimales = 2;
        a = (Math.floor(Math.random() * 1900) + 100) / 100;  // 1.00 - 19.99
        b = (Math.floor(Math.random() * 1900) + 100) / 100;
        resultado = Math.round((a + b) * 100) / 100;
    }

    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 0.1) * factor) / factor,
        Math.round((resultado - 0.1) * factor) / factor,
        Math.round((Math.floor(a) + Math.floor(b)) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'suma_directa',
        pregunta: `¿Cuánto es ${a} + ${b}?`,
        operacion: `${a} + ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} + ${b} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Suma con llevadas (décimas → unidades)
 */
function generarSumaDecimalLlevada(nivel = 'facil') {
    let a, b, resultado, decimales;

    if (nivel === 'facil') {
        decimales = 1;
        a = (Math.floor(Math.random() * 5) + 5) / 10;  // 0.5 - 0.9
        b = (Math.floor(Math.random() * 5) + 5) / 10;  // Suma > 1
        resultado = Math.round((a + b) * 10) / 10;
    } else if (nivel === 'medio') {
        decimales = 1;
        a = (Math.floor(Math.random() * 40) + 60) / 10;  // 6.0 - 9.9
        b = (Math.floor(Math.random() * 40) + 60) / 10;
        resultado = Math.round((a + b) * 10) / 10;
    } else {
        decimales = 2;
        a = (Math.floor(Math.random() * 400) + 600) / 100;  // 6.00 - 9.99
        b = (Math.floor(Math.random() * 400) + 600) / 100;
        resultado = Math.round((a + b) * 100) / 100;
    }

    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 1) * factor) / factor,
        Math.round((resultado - 1) * factor) / factor,
        Math.round((a + b - 1) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'suma_llevada',
        pregunta: `Calcula: ${a} + ${b}`,
        operacion: `${a} + ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} + ${b} = ${resultado} (hay llevada a las unidades)`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Suma en contexto (problema)
 */
function generarSumaDecimalProblema(nivel = 'facil') {
    let precio1, precio2, resultado;

    if (nivel === 'facil') {
        precio1 = (Math.floor(Math.random() * 40) + 10) / 10;  // 1.0 - 4.9 €
        precio2 = (Math.floor(Math.random() * 40) + 10) / 10;
        resultado = Math.round((precio1 + precio2) * 10) / 10;
    } else if (nivel === 'medio') {
        precio1 = (Math.floor(Math.random() * 90) + 10) / 10;  // 1.0 - 9.9 €
        precio2 = (Math.floor(Math.random() * 90) + 10) / 10;
        resultado = Math.round((precio1 + precio2) * 10) / 10;
    } else {
        precio1 = (Math.floor(Math.random() * 1400) + 100) / 100;  // 1.00 - 14.99 €
        precio2 = (Math.floor(Math.random() * 1400) + 100) / 100;
        resultado = Math.round((precio1 + precio2) * 100) / 100;
    }

    const contextos = [
        {
            plantilla: `María compra un cuaderno por ${precio1}€ y un bolígrafo por ${precio2}€. ¿Cuánto gasta en total?`,
            unidad: '€'
        },
        {
            plantilla: `Un libro cuesta ${precio1}€ y una revista ${precio2}€. ¿Cuánto cuestan juntos?`,
            unidad: '€'
        },
        {
            plantilla: `Juan compra ${precio1} kg de manzanas y ${precio2} kg de peras. ¿Cuántos kg compra en total?`,
            unidad: 'kg'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 0.1) * factor) / factor,
        Math.round((resultado - 0.1) * factor) / factor,
        Math.round((precio1 - precio2) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'suma_problema',
        pregunta: contexto.plantilla,
        operacion: `${precio1} + ${precio2}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${contexto.unidad}`),
        correcta: `${resultado} ${contexto.unidad}`,
        explicacion: `${precio1} + ${precio2} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Completar suma
 */
function generarSumaDecimalCompletar(nivel = 'facil') {
    let a, suma, b;

    if (nivel === 'facil') {
        a = (Math.floor(Math.random() * 40) + 10) / 10;
        suma = (Math.floor(Math.random() * 50) + 30) / 10;
        b = Math.round((suma - a) * 10) / 10;
    } else if (nivel === 'medio') {
        a = (Math.floor(Math.random() * 90) + 10) / 10;
        suma = (Math.floor(Math.random() * 100) + 50) / 10;
        b = Math.round((suma - a) * 10) / 10;
    } else {
        a = (Math.floor(Math.random() * 900) + 100) / 100;
        suma = (Math.floor(Math.random() * 1000) + 500) / 100;
        b = Math.round((suma - a) * 100) / 100;
    }

    if (b <= 0) b = 0.1; // Asegurar resultado positivo

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        b,
        Math.round((b + 0.1) * factor) / factor,
        Math.round((b - 0.1) * factor) / factor,
        Math.round((suma - b) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'suma_completar',
        pregunta: `Completa: ${a} + ? = ${suma}`,
        operacion: `${a} + ? = ${suma}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: b.toString(),
        explicacion: `${suma} - ${a} = ${b}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Suma de tres decimales
 */
function generarSumaDecimalTres(nivel = 'facil') {
    let a, b, c, resultado;

    if (nivel === 'facil') {
        a = (Math.floor(Math.random() * 30) + 10) / 10;
        b = (Math.floor(Math.random() * 30) + 10) / 10;
        c = (Math.floor(Math.random() * 30) + 10) / 10;
        resultado = Math.round((a + b + c) * 10) / 10;
    } else if (nivel === 'medio') {
        a = (Math.floor(Math.random() * 60) + 10) / 10;
        b = (Math.floor(Math.random() * 60) + 10) / 10;
        c = (Math.floor(Math.random() * 60) + 10) / 10;
        resultado = Math.round((a + b + c) * 10) / 10;
    } else {
        a = (Math.floor(Math.random() * 600) + 100) / 100;
        b = (Math.floor(Math.random() * 600) + 100) / 100;
        c = (Math.floor(Math.random() * 600) + 100) / 100;
        resultado = Math.round((a + b + c) * 100) / 100;
    }

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 0.1) * factor) / factor,
        Math.round((resultado - 0.1) * factor) / factor,
        Math.round((a + b) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'suma_tres',
        pregunta: `¿Cuánto es ${a} + ${b} + ${c}?`,
        operacion: `${a} + ${b} + ${c}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} + ${b} + ${c} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de SUMA DE DECIMALES con VARIEDAD
 */
export function generarSumaDecimal(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarSumaDecimalDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 30 },
        { tipo: 'llevada', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'completar', peso: 15 },
        { tipo: 'tres', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarSumaDecimalDirecta(nivel);
        case 'llevada':
            return generarSumaDecimalLlevada(nivel);
        case 'problema':
            return generarSumaDecimalProblema(nivel);
        case 'completar':
            return generarSumaDecimalCompletar(nivel);
        case 'tres':
            return generarSumaDecimalTres(nivel);
        default:
            return generarSumaDecimalDirecta(nivel);
    }
}

// ==========================================
// RESTA DE DECIMALES CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Resta directa
 */
function generarRestaDecimalDirecta(nivel = 'facil') {
    let a, b, resultado, decimales;

    if (nivel === 'facil') {
        decimales = 1;
        a = (Math.floor(Math.random() * 80) + 20) / 10;  // 2.0 - 9.9
        b = (Math.floor(Math.random() * Math.floor(a * 10)) + 10) / 10;
        resultado = Math.round((a - b) * 10) / 10;
    } else if (nivel === 'medio') {
        decimales = Math.random() > 0.5 ? 1 : 2;
        if (decimales === 1) {
            a = (Math.floor(Math.random() * 180) + 20) / 10;
            b = (Math.floor(Math.random() * Math.floor(a * 10)) + 10) / 10;
            resultado = Math.round((a - b) * 10) / 10;
        } else {
            a = (Math.floor(Math.random() * 800) + 200) / 100;
            b = (Math.floor(Math.random() * Math.floor(a * 100)) + 50) / 100;
            resultado = Math.round((a - b) * 100) / 100;
        }
    } else {
        decimales = 2;
        a = (Math.floor(Math.random() * 1800) + 200) / 100;
        b = (Math.floor(Math.random() * Math.floor(a * 100)) + 100) / 100;
        resultado = Math.round((a - b) * 100) / 100;
    }

    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 0.1) * factor) / factor,
        Math.round((resultado - 0.1) * factor) / factor,
        Math.round((a + b) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'resta_directa',
        pregunta: `¿Cuánto es ${a} - ${b}?`,
        operacion: `${a} - ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} - ${b} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Resta con "préstamo"
 */
function generarRestaDecimalPrestamo(nivel = 'facil') {
    let a, b, resultado;

    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 8) + 2;  // 2 - 9 (entero)
        b = (Math.floor(Math.random() * 9) + 1) / 10;  // 0.1 - 0.9
        resultado = Math.round((a - b) * 10) / 10;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 18) + 2;
        b = (Math.floor(Math.random() * 40) + 10) / 10;  // 1.0 - 4.9
        resultado = Math.round((a - b) * 10) / 10;
    } else {
        a = Math.floor(Math.random() * 40) + 5;
        b = (Math.floor(Math.random() * 400) + 100) / 100;  // 1.00 - 4.99
        resultado = Math.round((a - b) * 100) / 100;
    }

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 1) * factor) / factor,
        Math.round((resultado - 1) * factor) / factor,
        Math.round((a + b) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'resta_prestamo',
        pregunta: `Calcula: ${a} - ${b}`,
        operacion: `${a} - ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} - ${b} = ${resultado} (necesitamos "prestar" de las unidades)`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Resta en contexto (problema)
 */
function generarRestaDecimalProblema(nivel = 'facil') {
    let total, gasto, resultado;

    if (nivel === 'facil') {
        total = (Math.floor(Math.random() * 40) + 30) / 10;  // 3.0 - 6.9
        gasto = (Math.floor(Math.random() * Math.floor(total * 10 - 10)) + 10) / 10;
        resultado = Math.round((total - gasto) * 10) / 10;
    } else if (nivel === 'medio') {
        total = (Math.floor(Math.random() * 90) + 30) / 10;
        gasto = (Math.floor(Math.random() * Math.floor(total * 10 - 10)) + 10) / 10;
        resultado = Math.round((total - gasto) * 10) / 10;
    } else {
        total = (Math.floor(Math.random() * 1400) + 500) / 100;
        gasto = (Math.floor(Math.random() * Math.floor(total * 100 - 100)) + 100) / 100;
        resultado = Math.round((total - gasto) * 100) / 100;
    }

    const contextos = [
        {
            plantilla: `María tenía ${total}€ y gastó ${gasto}€. ¿Cuánto dinero le queda?`,
            unidad: '€'
        },
        {
            plantilla: `Un paquete pesa ${total} kg. Si retiro ${gasto} kg, ¿cuánto pesa ahora?`,
            unidad: 'kg'
        },
        {
            plantilla: `Juan tenía ${total} litros de agua y usó ${gasto} litros. ¿Cuántos litros le quedan?`,
            unidad: 'litros'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        resultado,
        Math.round((resultado + 0.1) * factor) / factor,
        Math.round((resultado - 0.1) * factor) / factor,
        Math.round((total + gasto) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'resta_problema',
        pregunta: contexto.plantilla,
        operacion: `${total} - ${gasto}`,
        opciones: opciones.slice(0, 4).map(o => `${o} ${contexto.unidad}`),
        correcta: `${resultado} ${contexto.unidad}`,
        explicacion: `${total} - ${gasto} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Completar resta
 */
function generarRestaDecimalCompletar(nivel = 'facil') {
    let a, diferencia, b;

    if (nivel === 'facil') {
        diferencia = (Math.floor(Math.random() * 40) + 10) / 10;
        b = (Math.floor(Math.random() * 30) + 10) / 10;
        a = Math.round((diferencia + b) * 10) / 10;
    } else if (nivel === 'medio') {
        diferencia = (Math.floor(Math.random() * 80) + 20) / 10;
        b = (Math.floor(Math.random() * 50) + 10) / 10;
        a = Math.round((diferencia + b) * 10) / 10;
    } else {
        diferencia = (Math.floor(Math.random() * 800) + 200) / 100;
        b = (Math.floor(Math.random() * 500) + 100) / 100;
        a = Math.round((diferencia + b) * 100) / 100;
    }

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        b,
        Math.round((b + 0.1) * factor) / factor,
        Math.round((b - 0.1) * factor) / factor,
        Math.round((a - diferencia - 0.1) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'resta_completar',
        pregunta: `Completa: ${a} - ? = ${diferencia}`,
        operacion: `${a} - ? = ${diferencia}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: b.toString(),
        explicacion: `${a} - ${diferencia} = ${b}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Diferencia de precios
 */
function generarRestaDecimalDiferencia(nivel = 'facil') {
    let precio1, precio2, diferencia;

    if (nivel === 'facil') {
        precio1 = (Math.floor(Math.random() * 60) + 30) / 10;
        precio2 = (Math.floor(Math.random() * 40) + 10) / 10;
        diferencia = Math.abs(Math.round((precio1 - precio2) * 10) / 10);
    } else if (nivel === 'medio') {
        precio1 = (Math.floor(Math.random() * 100) + 50) / 10;
        precio2 = (Math.floor(Math.random() * 80) + 20) / 10;
        diferencia = Math.abs(Math.round((precio1 - precio2) * 10) / 10);
    } else {
        precio1 = (Math.floor(Math.random() * 1500) + 500) / 100;
        precio2 = (Math.floor(Math.random() * 1000) + 200) / 100;
        diferencia = Math.abs(Math.round((precio1 - precio2) * 100) / 100);
    }

    const mayor = Math.max(precio1, precio2);
    const menor = Math.min(precio1, precio2);

    const decimales = nivel === 'dificil' ? 2 : 1;
    const factor = Math.pow(10, decimales);
    const opciones = [
        diferencia,
        Math.round((diferencia + 0.1) * factor) / factor,
        Math.round((diferencia - 0.1) * factor) / factor,
        Math.round((precio1 + precio2) * factor) / factor
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'resta_diferencia',
        pregunta: `Un libro cuesta ${precio1}€ y una revista ${precio2}€. ¿Cuál es la diferencia de precio?`,
        operacion: `${mayor} - ${menor}`,
        opciones: opciones.slice(0, 4).map(o => `${o} €`),
        correcta: `${diferencia} €`,
        explicacion: `${mayor} - ${menor} = ${diferencia} €`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de RESTA DE DECIMALES con VARIEDAD
 */
export function generarRestaDecimal(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarRestaDecimalDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 30 },
        { tipo: 'prestamo', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'completar', peso: 15 },
        { tipo: 'diferencia', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarRestaDecimalDirecta(nivel);
        case 'prestamo':
            return generarRestaDecimalPrestamo(nivel);
        case 'problema':
            return generarRestaDecimalProblema(nivel);
        case 'completar':
            return generarRestaDecimalCompletar(nivel);
        case 'diferencia':
            return generarRestaDecimalDiferencia(nivel);
        default:
            return generarRestaDecimalDirecta(nivel);
    }
}

// ==========================================
// COMPARACIÓN DE DECIMALES CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Comparación simple (mayor/menor)
 */
function generarComparacionDecimalSimple(nivel = 'facil') {
    let a, b;

    if (nivel === 'facil') {
        a = (Math.floor(Math.random() * 90) + 10) / 10;
        b = (Math.floor(Math.random() * 90) + 10) / 10;
        while (a === b) b = (Math.floor(Math.random() * 90) + 10) / 10;
    } else if (nivel === 'medio') {
        a = (Math.floor(Math.random() * 900) + 100) / 100;
        b = (Math.floor(Math.random() * 900) + 100) / 100;
        while (a === b) b = (Math.floor(Math.random() * 900) + 100) / 100;
    } else {
        // Números parecidos (difícil)
        a = (Math.floor(Math.random() * 900) + 100) / 100;
        b = Math.round((a + (Math.random() > 0.5 ? 0.01 : -0.01)) * 100) / 100;
    }

    const mayor = a > b ? a : b;
    const opciones = [mayor, a, b, 'Son iguales'].filter((v, i, arr) => arr.indexOf(v) === i);

    return {
        tipo: 'decimal',
        subtipo: 'comparacion_simple',
        pregunta: `¿Cuál número es MAYOR?`,
        operacion: `${a} vs ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: mayor.toString(),
        explicacion: `${a} ${a > b ? '>' : '<'} ${b}, por tanto ${mayor} es mayor`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Ordenar decimales
 */
function generarComparacionDecimalOrdenar(nivel = 'facil') {
    let nums, ordenados;

    if (nivel === 'facil') {
        nums = [
            (Math.floor(Math.random() * 40) + 10) / 10,
            (Math.floor(Math.random() * 40) + 20) / 10,
            (Math.floor(Math.random() * 40) + 30) / 10
        ];
        ordenados = [...nums].sort((a, b) => a - b);
    } else if (nivel === 'medio') {
        nums = [
            (Math.floor(Math.random() * 200) + 100) / 100,
            (Math.floor(Math.random() * 200) + 200) / 100,
            (Math.floor(Math.random() * 200) + 300) / 100,
            (Math.floor(Math.random() * 200) + 400) / 100
        ];
        ordenados = [...nums].sort((a, b) => a - b);
    } else {
        // Números muy parecidos
        const base = (Math.floor(Math.random() * 400) + 200) / 100;
        nums = [
            base,
            Math.round((base + 0.01) * 100) / 100,
            Math.round((base + 0.02) * 100) / 100,
            Math.round((base - 0.01) * 100) / 100
        ];
        ordenados = [...nums].sort((a, b) => a - b);
    }

    // Mezclar
    const desordenados = [...nums].sort(() => Math.random() - 0.5);
    const correcta = ordenados.join(', ');

    // Generar opciones incorrectas
    const opcionesIncorrectas = [
        [...nums].sort((a, b) => b - a).join(', '),  // Descendente
        desordenados.join(', '),  // Desordenada
        [...nums].reverse().join(', ')  // Inversa
    ];

    const opciones = [correcta, ...opcionesIncorrectas]
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .slice(0, 4);

    return {
        tipo: 'decimal',
        subtipo: 'comparacion_ordenar',
        pregunta: `Ordena de MENOR a MAYOR: ${nums.join(', ')}`,
        operacion: 'Ordenar decimales',
        opciones: opciones,
        correcta: correcta,
        explicacion: `Ordenados de menor a mayor: ${correcta}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Identificar entre (rango)
 */
function generarComparacionDecimalRango(nivel = 'facil') {
    let min, max, opciones;

    if (nivel === 'facil') {
        min = (Math.floor(Math.random() * 30) + 10) / 10;
        max = (Math.floor(Math.random() * 30) + 40) / 10;
        opciones = [
            Math.round((min + max) / 2 * 10) / 10,  // Correcta (entre)
            Math.round((min - 0.5) * 10) / 10,      // Menor
            Math.round((max + 0.5) * 10) / 10,      // Mayor
            Math.round(min * 10) / 10               // Igual al mínimo
        ];
    } else if (nivel === 'medio') {
        min = (Math.floor(Math.random() * 300) + 100) / 100;
        max = (Math.floor(Math.random() * 300) + 400) / 100;
        opciones = [
            Math.round((min + max) / 2 * 100) / 100,
            Math.round((min - 0.5) * 100) / 100,
            Math.round((max + 0.5) * 100) / 100,
            Math.round(max * 100) / 100
        ];
    } else {
        min = (Math.floor(Math.random() * 500) + 200) / 100;
        max = (Math.floor(Math.random() * 500) + 700) / 100;
        opciones = [
            Math.round((min + max) / 2 * 100) / 100,
            Math.round((min - 0.05) * 100) / 100,
            Math.round((max + 0.05) * 100) / 100,
            Math.round((min + 0.01) * 100) / 100
        ];
    }

    const correcta = opciones[0];
    opciones.sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'comparacion_rango',
        pregunta: `¿Qué número está ENTRE ${min} y ${max}?`,
        operacion: `${min} < ? < ${max}`,
        opciones: opciones.map(o => o.toString()),
        correcta: correcta.toString(),
        explicacion: `${correcta} está entre ${min} y ${max}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparar con símbolo (>, <, =)
 */
function generarComparacionDecimalSimbolo(nivel = 'facil') {
    let a, b, simbolo;

    if (nivel === 'facil') {
        a = (Math.floor(Math.random() * 80) + 10) / 10;
        b = (Math.floor(Math.random() * 80) + 10) / 10;
    } else if (nivel === 'medio') {
        a = (Math.floor(Math.random() * 800) + 100) / 100;
        b = (Math.floor(Math.random() * 800) + 100) / 100;
    } else {
        // Muy parecidos
        a = (Math.floor(Math.random() * 800) + 100) / 100;
        b = Math.round((a + (Math.random() > 0.5 ? 0.01 : -0.01)) * 100) / 100;
    }

    simbolo = a > b ? '>' : a < b ? '<' : '=';

    return {
        tipo: 'decimal',
        subtipo: 'comparacion_simbolo',
        pregunta: `¿Qué símbolo va entre ${a} _ ${b}?`,
        operacion: `${a} _ ${b}`,
        opciones: ['>', '<', '='],
        correcta: simbolo,
        explicacion: `${a} ${simbolo} ${b}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema de comparación
 */
function generarComparacionDecimalProblema(nivel = 'facil') {
    let peso1, peso2, nombre1, nombre2;

    const nombres = ['Ana', 'Juan', 'María', 'Pedro', 'Lucía', 'Carlos'];
    nombre1 = nombres[Math.floor(Math.random() * nombres.length)];
    nombre2 = nombres.filter(n => n !== nombre1)[Math.floor(Math.random() * 5)];

    if (nivel === 'facil') {
        peso1 = (Math.floor(Math.random() * 40) + 20) / 10;
        peso2 = (Math.floor(Math.random() * 40) + 20) / 10;
        while (peso1 === peso2) peso2 = (Math.floor(Math.random() * 40) + 20) / 10;
    } else if (nivel === 'medio') {
        peso1 = (Math.floor(Math.random() * 400) + 200) / 100;
        peso2 = (Math.floor(Math.random() * 400) + 200) / 100;
        while (peso1 === peso2) peso2 = (Math.floor(Math.random() * 400) + 200) / 100;
    } else {
        peso1 = (Math.floor(Math.random() * 800) + 200) / 100;
        peso2 = Math.round((peso1 + (Math.random() > 0.5 ? 0.05 : -0.05)) * 100) / 100;
    }

    const respuesta = peso1 > peso2 ? nombre1 : nombre2;

    return {
        tipo: 'decimal',
        subtipo: 'comparacion_problema',
        pregunta: `${nombre1} pesa ${peso1} kg y ${nombre2} pesa ${peso2} kg. ¿Quién pesa MÁS?`,
        operacion: `${peso1} vs ${peso2}`,
        opciones: [nombre1, nombre2, 'Pesan lo mismo'],
        correcta: respuesta,
        explicacion: `${peso1} ${peso1 > peso2 ? '>' : '<'} ${peso2}, por tanto ${respuesta} pesa más`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de COMPARACIÓN DE DECIMALES con VARIEDAD
 */
export function generarComparacionDecimal(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarComparacionDecimalSimple(nivel);
    }

    const tipos = [
        { tipo: 'simple', peso: 30 },
        { tipo: 'ordenar', peso: 25 },
        { tipo: 'rango', peso: 20 },
        { tipo: 'simbolo', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'simple':
            return generarComparacionDecimalSimple(nivel);
        case 'ordenar':
            return generarComparacionDecimalOrdenar(nivel);
        case 'rango':
            return generarComparacionDecimalRango(nivel);
        case 'simbolo':
            return generarComparacionDecimalSimbolo(nivel);
        case 'problema':
            return generarComparacionDecimalProblema(nivel);
        default:
            return generarComparacionDecimalSimple(nivel);
    }
}

// ==========================================
// REDONDEO DE DECIMALES CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Redondeo a unidades
 */
function generarRedondeoDecimalUnidades(nivel = 'facil') {
    let numero, redondeado;

    if (nivel === 'facil') {
        numero = (Math.floor(Math.random() * 90) + 10) / 10;
        redondeado = Math.round(numero);
    } else if (nivel === 'medio') {
        numero = (Math.floor(Math.random() * 900) + 100) / 100;
        redondeado = Math.round(numero);
    } else {
        numero = (Math.floor(Math.random() * 9000) + 1000) / 1000;
        redondeado = Math.round(numero);
    }

    const opciones = [
        redondeado,
        redondeado + 1,
        redondeado - 1,
        Math.floor(numero)
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'redondeo_unidades',
        pregunta: `Redondea ${numero} a las UNIDADES`,
        operacion: `${numero} → unidades`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: redondeado.toString(),
        explicacion: `${numero} redondeado a las unidades es ${redondeado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Redondeo a décimas
 */
function generarRedondeoDecimalDecimas(nivel = 'medio') {
    let numero, redondeado;

    if (nivel === 'facil' || nivel === 'medio') {
        numero = (Math.floor(Math.random() * 900) + 100) / 100;
        redondeado = Math.round(numero * 10) / 10;
    } else {
        numero = (Math.floor(Math.random() * 9000) + 1000) / 1000;
        redondeado = Math.round(numero * 10) / 10;
    }

    const opciones = [
        redondeado,
        Math.round((redondeado + 0.1) * 10) / 10,
        Math.round((redondeado - 0.1) * 10) / 10,
        Math.floor(numero * 10) / 10
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'redondeo_decimas',
        pregunta: `Redondea ${numero} a las DÉCIMAS`,
        operacion: `${numero} → décimas`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: redondeado.toString(),
        explicacion: `${numero} redondeado a las décimas es ${redondeado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Identificar redondeo correcto
 */
function generarRedondeoDecimalIdentificar(nivel = 'facil') {
    let numero, redondeadoCorrecto;

    if (nivel === 'facil') {
        numero = (Math.floor(Math.random() * 90) + 10) / 10;
        redondeadoCorrecto = Math.round(numero);
    } else if (nivel === 'medio') {
        numero = (Math.floor(Math.random() * 900) + 100) / 100;
        redondeadoCorrecto = Math.round(numero * 10) / 10;
    } else {
        numero = (Math.floor(Math.random() * 9000) + 1000) / 1000;
        redondeadoCorrecto = Math.round(numero * 10) / 10;
    }

    const unidad = nivel === 'facil' ? 'unidades' : 'décimas';

    return {
        tipo: 'decimal',
        subtipo: 'redondeo_identificar',
        pregunta: `${numero} redondeado a las ${unidad} es:`,
        operacion: `Redondear ${numero}`,
        opciones: [
            redondeadoCorrecto.toString(),
            (redondeadoCorrecto + (unidad === 'unidades' ? 1 : 0.1)).toString(),
            Math.floor(numero).toString(),
            Math.ceil(numero).toString()
        ],
        correcta: redondeadoCorrecto.toString(),
        explicacion: `${numero} redondeado a las ${unidad} es ${redondeadoCorrecto}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Regla de redondeo
 */
function generarRedondeoDecimalRegla(nivel = 'medio') {
    const decimales = [
        { num: 3.4, regla: 'menor que 5', redondea: 'abajo', resultado: 3 },
        { num: 3.7, regla: 'mayor o igual a 5', redondea: 'arriba', resultado: 4 },
        { num: 2.5, regla: 'mayor o igual a 5', redondea: 'arriba', resultado: 3 },
        { num: 8.3, regla: 'menor que 5', redondea: 'abajo', resultado: 8 }
    ];

    const seleccion = decimales[Math.floor(Math.random() * decimales.length)];

    return {
        tipo: 'decimal',
        subtipo: 'redondeo_regla',
        pregunta: `Si la parte decimal es ${seleccion.regla}, ¿hacia dónde redondeamos ${seleccion.num}?`,
        operacion: `Regla de redondeo`,
        opciones: [
            `${seleccion.redondea} (${seleccion.resultado})`,
            seleccion.redondea === 'arriba' ? `abajo (${seleccion.resultado - 1})` : `arriba (${seleccion.resultado + 1})`,
            'Se mantiene igual',
            'Depende del número'
        ],
        correcta: `${seleccion.redondea} (${seleccion.resultado})`,
        explicacion: `Como la decimal es ${seleccion.regla}, redondeamos ${seleccion.redondea} a ${seleccion.resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema de redondeo
 */
function generarRedondeoDecimalProblema(nivel = 'facil') {
    let precio, redondeado;

    if (nivel === 'facil') {
        precio = (Math.floor(Math.random() * 90) + 10) / 10;
        redondeado = Math.round(precio);
    } else if (nivel === 'medio') {
        precio = (Math.floor(Math.random() * 900) + 100) / 100;
        redondeado = Math.round(precio);
    } else {
        precio = (Math.floor(Math.random() * 1400) + 500) / 100;
        redondeado = Math.round(precio);
    }

    const opciones = [
        redondeado,
        redondeado + 1,
        redondeado - 1,
        Math.floor(precio)
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'decimal',
        subtipo: 'redondeo_problema',
        pregunta: `Un producto cuesta ${precio}€. Si redondeamos a euros enteros, ¿cuánto pagarías?`,
        operacion: `Redondear ${precio}€`,
        opciones: opciones.slice(0, 4).map(o => `${o} €`),
        correcta: `${redondeado} €`,
        explicacion: `${precio}€ redondeado es ${redondeado}€`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de REDONDEO DE DECIMALES con VARIEDAD
 */
export function generarRedondeoDecimal(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarRedondeoDecimalUnidades(nivel);
    }

    const tipos = [
        { tipo: 'unidades', peso: 30 },
        { tipo: 'decimas', peso: 25 },
        { tipo: 'identificar', peso: 20 },
        { tipo: 'regla', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'unidades':
            return generarRedondeoDecimalUnidades(nivel);
        case 'decimas':
            return generarRedondeoDecimalDecimas(nivel);
        case 'identificar':
            return generarRedondeoDecimalIdentificar(nivel);
        case 'regla':
            return generarRedondeoDecimalRegla(nivel);
        case 'problema':
            return generarRedondeoDecimalProblema(nivel);
        default:
            return generarRedondeoDecimalUnidades(nivel);
    }
}

// ==========================================
// EXPORTACIONES
// ==========================================

export default {
    generarSumaDecimal,
    generarRestaDecimal,
    generarComparacionDecimal,
    generarRedondeoDecimal
};
