/**
 * GENERADOR DE MATEMÁTICAS 4º PRIMARIA - V3 CON VARIEDAD COMPLETA
 * Genera ejercicios deterministas (100% precisos) sin usar IA
 * Basado en currículo LOMLOE 4º Primaria
 * 
 * ✨ V3: Variedad en TODAS las operaciones (División, Suma, Resta, Multiplicación)
 */

/**
 * Utilidad: Elegir elemento según pesos
 */
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
// MULTIPLICACIÓN CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Multiplicación Directa (clásica)
 */
function generarMultiplicacionDirecta(nivel = 'medio') {
    let num1, num2;

    if (nivel === 'facil') {
        // Tablas del 2 al 5 (muy básicas para inicio de 4º)
        num1 = Math.floor(Math.random() * 4) + 2;  // 2-5
        num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else if (nivel === 'medio') {
        // Tablas del 2 al 10 (estándar para 4º primaria)
        num1 = Math.floor(Math.random() * 9) + 2;  // 2-10
        num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else {
        // Multiplicación por 2 cifras (final de 4º / ampliación)
        num1 = Math.floor(Math.random() * 40) + 10; // 10-49
        num2 = Math.floor(Math.random() * 10) + 2;  // 2-11
    }

    const resultado = num1 * num2;

    const opciones = [
        resultado,
        resultado + num1,
        resultado - num2,
        resultado + num2
    ].sort(() => Math.random() - 0.5);

    return {
        tipo: 'multiplicacion',
        subtipo: 'directa',
        pregunta: `¿Cuánto es ${num1} × ${num2}?`,
        operacion: `${num1} × ${num2}`,
        opciones: opciones.map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${num1} × ${num2} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Factor Oculto (inversa)
 */
function generarFactorOculto(nivel = 'medio') {
    let num1, num2;

    if (nivel === 'facil') {
        num1 = Math.floor(Math.random() * 4) + 2;  // 2-5
        num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else if (nivel === 'medio') {
        num1 = Math.floor(Math.random() * 9) + 2;  // 2-10
        num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else {
        num1 = Math.floor(Math.random() * 20) + 10; // 10-29
        num2 = Math.floor(Math.random() * 9) + 2;   // 2-10
    }

    const resultado = num1 * num2;
    const ocultar = Math.random() > 0.5 ? 'primero' : 'segundo';

    let pregunta, correcta, opciones;

    if (ocultar === 'primero') {
        pregunta = `¿Qué número falta? ? × ${num2} = ${resultado}`;
        correcta = num1;
        opciones = [num1, num1 + 1, num1 - 1, num1 + 2];
    } else {
        pregunta = `¿Qué número falta? ${num1} × ? = ${resultado}`;
        correcta = num2;
        opciones = [num2, num2 + 1, num2 - 1, num2 + 2];
    }

    opciones = opciones.filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'multiplicacion',
        subtipo: 'factor_oculto',
        pregunta: pregunta,
        operacion: `? = ${correcta}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: correcta.toString(),
        explicacion: `${num1} × ${num2} = ${resultado}, por lo tanto el número que falta es ${correcta}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Problema de Palabras
 */
function generarProblemaMultiplicacion(nivel = 'medio') {
    let num1, num2;

    if (nivel === 'facil') {
        num1 = Math.floor(Math.random() * 4) + 2;  // 2-5
        num2 = Math.floor(Math.random() * 7) + 2;  // 2-8
    } else if (nivel === 'medio') {
        num1 = Math.floor(Math.random() * 7) + 3;  // 3-9
        num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else {
        num1 = Math.floor(Math.random() * 15) + 10; // 10-24
        num2 = Math.floor(Math.random() * 8) + 2;   // 2-9
    }

    const resultado = num1 * num2;

    const contextos = [
        { texto: `María tiene ${num1} cajas con ${num2} manzanas cada una`, unidad: 'manzanas' },
        { texto: `Pedro compró ${num1} paquetes de ${num2} cromos`, unidad: 'cromos' },
        { texto: `En la clase hay ${num1} mesas con ${num2} sillas cada una`, unidad: 'sillas' },
        { texto: `Un cine tiene ${num1} filas con ${num2} asientos cada una`, unidad: 'asientos' },
        { texto: `Hay ${num1} jarrones con ${num2} flores cada uno`, unidad: 'flores' }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + num1,
        resultado - num2,
        num1 + num2  // Error común: sumar en vez de multiplicar
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'multiplicacion',
        subtipo: 'problema',
        pregunta: `${contexto.texto}. ¿Cuántas ${contexto.unidad} hay en total?`,
        operacion: `${num1} × ${num2}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${num1} × ${num2} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparación
 */
function generarComparacionMultiplicacion(nivel = 'medio') {
    let a, b, c, d;

    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 4) + 2;  // 2-5
        b = Math.floor(Math.random() * 7) + 2;  // 2-8
        c = Math.floor(Math.random() * 4) + 2;  // 2-5
        d = Math.floor(Math.random() * 7) + 2;  // 2-8
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 9) + 2;  // 2-10
        b = Math.floor(Math.random() * 9) + 2;  // 2-10
        c = Math.floor(Math.random() * 9) + 2;  // 2-10
        d = Math.floor(Math.random() * 9) + 2;  // 2-10
    } else {
        a = Math.floor(Math.random() * 30) + 10; // 10-39
        b = Math.floor(Math.random() * 8) + 2;   // 2-9
        c = Math.floor(Math.random() * 30) + 10; // 10-39
        d = Math.floor(Math.random() * 8) + 2;   // 2-9
    }

    const res1 = a * b;
    const res2 = c * d;

    let correcta, opciones;

    if (res1 > res2) {
        correcta = `${a} × ${b}`;
        opciones = [`${a} × ${b}`, `${c} × ${d}`, 'Son iguales'];
    } else if (res2 > res1) {
        correcta = `${c} × ${d}`;
        opciones = [`${a} × ${b}`, `${c} × ${d}`, 'Son iguales'];
    } else {
        correcta = 'Son iguales';
        opciones = [`${a} × ${b}`, `${c} × ${d}`, 'Son iguales'];
    }

    const e = Math.floor(Math.random() * 10) + 2;
    const f = Math.floor(Math.random() * 10) + 2;
    opciones.push(`${e} × ${f}`);

    return {
        tipo: 'multiplicacion',
        subtipo: 'comparacion',
        pregunta: `¿Qué resultado es MAYOR?`,
        operacion: `${a}×${b}=${res1} vs ${c}×${d}=${res2}`,
        opciones: opciones.slice(0, 4),
        correcta: correcta,
        explicacion: `${a} × ${b} = ${res1} y ${c} × ${d} = ${res2}. Por lo tanto, ${correcta} es mayor.`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Serie/Patrón
 */
function generarSerieMultiplicacion(nivel = 'medio') {
    let tabla;

    if (nivel === 'facil') {
        tabla = Math.floor(Math.random() * 4) + 2;  // Tablas 2-5
    } else if (nivel === 'medio') {
        tabla = Math.floor(Math.random() * 9) + 2;  // Tablas 2-10
    } else {
        tabla = Math.floor(Math.random() * 10) + 3; // Tablas 3-12
    }

    const inicio = Math.floor(Math.random() * 3) + 1; // Empieza en 1, 2 o 3
    const serie = [
        tabla * inicio,
        tabla * (inicio + 1),
        tabla * (inicio + 2),
        '?',
        tabla * (inicio + 4)
    ];

    const correcta = tabla * (inicio + 3);

    const opciones = [
        correcta,
        correcta + tabla,
        correcta - tabla,
        correcta + Math.floor(Math.random() * 5) + 1
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'multiplicacion',
        subtipo: 'serie',
        pregunta: `Completa la serie (tabla del ${tabla}): ${serie.join(', ')}`,
        operacion: `Serie de ${tabla}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: correcta.toString(),
        explicacion: `La serie es la tabla del ${tabla}. El número que falta es ${correcta}`,
        dificultad: nivel
    };
}

/**
 * Genera multiplicación con VARIEDAD de formatos
 */
export function generarMultiplicacion(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarMultiplicacionDirecta(nivel);
    }

    // Distribución de tipos
    const tipos = [
        { tipo: 'directa', peso: 35 },
        { tipo: 'inversa', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'comparacion', peso: 10 },
        { tipo: 'serie', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarMultiplicacionDirecta(nivel);
        case 'inversa':
            return generarFactorOculto(nivel);
        case 'problema':
            return generarProblemaMultiplicacion(nivel);
        case 'comparacion':
            return generarComparacionMultiplicacion(nivel);
        case 'serie':
            return generarSerieMultiplicacion(nivel);
        default:
            return generarMultiplicacionDirecta(nivel);
    }
}

// ==========================================
// DIVISIÓN CON VARIEDAD
// ==========================================

/**
 * TIPO 1: División Directa
 */
function generarDivisionDirecta(nivel = 'medio') {
    let dividendo, divisor, cociente;

    if (nivel === 'facil') {
        // Tablas inversas (fácil)
        divisor = Math.floor(Math.random() * 8) + 2;  // 2-9
        cociente = Math.floor(Math.random() * 9) + 2; // 2-10
        dividendo = divisor * cociente;
    } else if (nivel === 'medio') {
        // Divisor 1 cifra, dividendo 2-3 cifras
        divisor = Math.floor(Math.random() * 8) + 2;  // 2-9
        cociente = Math.floor(Math.random() * 90) + 10; // 10-99
        dividendo = divisor * cociente;
    } else {
        // Divisor 2 cifras
        divisor = Math.floor(Math.random() * 40) + 10; // 10-49
        cociente = Math.floor(Math.random() * 20) + 2;  // 2-21
        dividendo = divisor * cociente;
    }

    const opciones = [
        cociente,
        cociente + 1,
        cociente - 1,
        cociente + Math.floor(Math.random() * 5) + 2
    ].sort(() => Math.random() - 0.5);

    return {
        tipo: 'division',
        subtipo: 'directa',
        pregunta: `¿Cuánto es ${dividendo.toLocaleString('es-ES')} ÷ ${divisor}?`,
        operacion: `${dividendo} ÷ ${divisor}`,
        opciones: opciones.map(o => o.toString()),
        correcta: cociente.toString(),
        explicacion: `${dividendo} ÷ ${divisor} = ${cociente}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: División Inversa (factor oculto)
 */
function generarDivisionInversa(nivel = 'medio') {
    let dividendo, divisor, cociente;

    if (nivel === 'facil') {
        divisor = Math.floor(Math.random() * 8) + 2;
        cociente = Math.floor(Math.random() * 9) + 2;
        dividendo = divisor * cociente;
    } else if (nivel === 'medio') {
        divisor = Math.floor(Math.random() * 8) + 2;
        cociente = Math.floor(Math.random() * 40) + 10;
        dividendo = divisor * cociente;
    } else {
        divisor = Math.floor(Math.random() * 30) + 10;
        cociente = Math.floor(Math.random() * 15) + 5;
        dividendo = divisor * cociente;
    }

    const ocultar = Math.random() > 0.5 ? 'dividendo' : 'divisor';

    let pregunta, correcta, opciones;

    if (ocultar === 'dividendo') {
        pregunta = `¿Qué número dividido entre ${divisor} da ${cociente}?`;
        correcta = dividendo;
        opciones = [dividendo, dividendo + divisor, dividendo - divisor, dividendo + (divisor * 2)];
    } else {
        pregunta = `Si ${dividendo} ÷ ? = ${cociente}, ¿cuál es el divisor?`;
        correcta = divisor;
        opciones = [divisor, divisor + 1, divisor - 1, divisor + 2];
    }

    opciones = opciones.filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'division',
        subtipo: 'inversa',
        pregunta: pregunta,
        operacion: `? = ${correcta}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: correcta.toString(),
        explicacion: `${dividendo} ÷ ${divisor} = ${cociente}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Problema de División
 */
function generarProblemaDivision(nivel = 'medio') {
    let total, grupos, porGrupo;

    if (nivel === 'facil') {
        grupos = Math.floor(Math.random() * 7) + 2;  // 2-8
        porGrupo = Math.floor(Math.random() * 8) + 2; // 2-9
        total = grupos * porGrupo;
    } else if (nivel === 'medio') {
        grupos = Math.floor(Math.random() * 8) + 3;   // 3-10
        porGrupo = Math.floor(Math.random() * 20) + 5; // 5-24
        total = grupos * porGrupo;
    } else {
        grupos = Math.floor(Math.random() * 20) + 10; // 10-29
        porGrupo = Math.floor(Math.random() * 15) + 5; // 5-19
        total = grupos * porGrupo;
    }

    const contextos = [
        { texto: `Hay ${total} manzanas que se reparten en ${grupos} cajas`, unidad: 'manzanas por caja' },
        { texto: `${total} niños se dividen en ${grupos} equipos`, unidad: 'niños por equipo' },
        { texto: `Se reparten ${total} € entre ${grupos} personas`, unidad: '€ por persona' },
        { texto: `${total} cromos se organizan en ${grupos} sobres`, unidad: 'cromos por sobre' },
        { texto: `Un total de ${total} sillas se colocan en ${grupos} filas`, unidad: 'sillas por fila' }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        porGrupo,
        porGrupo + 1,
        porGrupo - 1,
        Math.floor(total / (grupos + 1))
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'division',
        subtipo: 'problema',
        pregunta: `${contexto.texto}. ¿Cuántas ${contexto.unidad}?`,
        operacion: `${total} ÷ ${grupos}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: porGrupo.toString(),
        explicacion: `${total} ÷ ${grupos} = ${porGrupo} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparación de Divisiones
 */
function generarComparacionDivision(nivel = 'medio') {
    let div1_dividendo, div1_divisor, div1_cociente;
    let div2_dividendo, div2_divisor, div2_cociente;

    if (nivel === 'facil') {
        div1_divisor = Math.floor(Math.random() * 6) + 2;
        div1_cociente = Math.floor(Math.random() * 8) + 2;
        div1_dividendo = div1_divisor * div1_cociente;

        div2_divisor = Math.floor(Math.random() * 6) + 2;
        div2_cociente = Math.floor(Math.random() * 8) + 2;
        div2_dividendo = div2_divisor * div2_cociente;
    } else {
        div1_divisor = Math.floor(Math.random() * 8) + 2;
        div1_cociente = Math.floor(Math.random() * 20) + 5;
        div1_dividendo = div1_divisor * div1_cociente;

        div2_divisor = Math.floor(Math.random() * 8) + 2;
        div2_cociente = Math.floor(Math.random() * 20) + 5;
        div2_dividendo = div2_divisor * div2_cociente;
    }

    let correcta;
    if (div1_cociente > div2_cociente) {
        correcta = `${div1_dividendo} ÷ ${div1_divisor}`;
    } else if (div2_cociente > div1_cociente) {
        correcta = `${div2_dividendo} ÷ ${div2_divisor}`;
    } else {
        correcta = 'Son iguales';
    }

    const opciones = [
        `${div1_dividendo} ÷ ${div1_divisor}`,
        `${div2_dividendo} ÷ ${div2_divisor}`,
        'Son iguales'
    ];

    // Añadir una opción extra
    const extra_divisor = Math.floor(Math.random() * 8) + 2;
    const extra_cociente = Math.floor(Math.random() * 15) + 3;
    opciones.push(`${extra_divisor * extra_cociente} ÷ ${extra_divisor}`);

    return {
        tipo: 'division',
        subtipo: 'comparacion',
        pregunta: `¿Qué división da un resultado MAYOR?`,
        operacion: `${div1_dividendo}÷${div1_divisor}=${div1_cociente} vs ${div2_dividendo}÷${div2_divisor}=${div2_cociente}`,
        opciones: opciones.slice(0, 4),
        correcta: correcta,
        explicacion: `${div1_dividendo} ÷ ${div1_divisor} = ${div1_cociente} y ${div2_dividendo} ÷ ${div2_divisor} = ${div2_cociente}. ${correcta} da el mayor resultado.`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Verificación de División
 */
function generarVerificacionDivision(nivel = 'medio') {
    let dividendo, divisor, cociente, cocienteIncorrecto;

    if (nivel === 'facil') {
        divisor = Math.floor(Math.random() * 8) + 2;
        cociente = Math.floor(Math.random() * 9) + 2;
        dividendo = divisor * cociente;
        cocienteIncorrecto = cociente + (Math.random() > 0.5 ? 1 : -1);
    } else {
        divisor = Math.floor(Math.random() * 8) + 2;
        cociente = Math.floor(Math.random() * 30) + 10;
        dividendo = divisor * cociente;
        cocienteIncorrecto = cociente + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1);
    }

    const esIncorrecto = Math.random() > 0.5;
    const preguntaCociente = esIncorrecto ? cocienteIncorrecto : cociente;

    return {
        tipo: 'division',
        subtipo: 'verificacion',
        pregunta: `¿Es correcto que ${dividendo} ÷ ${divisor} = ${preguntaCociente}?`,
        operacion: `${dividendo} ÷ ${divisor}`,
        opciones: ['Sí, es correcto', 'No, es incorrecto'],
        correcta: esIncorrecto ? 'No, es incorrecto' : 'Sí, es correcto',
        explicacion: `${dividendo} ÷ ${divisor} = ${cociente}. ${esIncorrecto ? `Por tanto, ${preguntaCociente} es incorrecto.` : 'Por tanto, es correcto.'}`,
        dificultad: nivel
    };
}

/**
 * Genera división con VARIEDAD
 */
export function generarDivision(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarDivisionDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 35 },
        { tipo: 'inversa', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'comparacion', peso: 10 },
        { tipo: 'verificacion', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarDivisionDirecta(nivel);
        case 'inversa':
            return generarDivisionInversa(nivel);
        case 'problema':
            return generarProblemaDivision(nivel);
        case 'comparacion':
            return generarComparacionDivision(nivel);
        case 'verificacion':
            return generarVerificacionDivision(nivel);
        default:
            return generarDivisionDirecta(nivel);
    }
}

// ==========================================
// SUMA CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Suma Directa
 */
function generarSumaDirecta(nivel = 'medio') {
    const rangos = {
        facil: { min: 10, max: 99 },      // 2 cifras
        medio: { min: 100, max: 999 },    // 3 cifras
        dificil: { min: 1000, max: 9999 } // 4 cifras
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const resultado = num1 + num2;

    const opciones = [
        resultado,
        resultado + Math.floor(Math.random() * 10) + 1,
        resultado - Math.floor(Math.random() * 10) - 1,
        resultado + Math.floor(Math.random() * 50) + 10
    ].sort(() => Math.random() - 0.5);

    return {
        tipo: 'suma',
        subtipo: 'directa',
        pregunta: `¿Cuánto es ${num1.toLocaleString('es-ES')} + ${num2.toLocaleString('es-ES')}?`,
        operacion: `${num1} + ${num2}`,
        opciones: opciones.map(o => o.toLocaleString('es-ES')),
        correcta: resultado.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} + ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Sumando Oculto
 */
function generarSumaInversa(nivel = 'medio') {
    const rangos = {
        facil: { min: 10, max: 99 },
        medio: { min: 100, max: 999 },
        dificil: { min: 1000, max: 5000 }
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const resultado = num1 + num2;

    const ocultar = Math.random() > 0.5 ? 'primero' : 'segundo';

    let pregunta, correcta, opciones;

    if (ocultar === 'primero') {
        pregunta = `¿Qué número sumado a ${num2.toLocaleString('es-ES')} da ${resultado.toLocaleString('es-ES')}?`;
        correcta = num1;
        opciones = [num1, num1 + 10, num1 - 10, num1 + 50];
    } else {
        pregunta = `Si ${num1.toLocaleString('es-ES')} + ? = ${resultado.toLocaleString('es-ES')}, ¿cuál es el número que falta?`;
        correcta = num2;
        opciones = [num2, num2 + 10, num2 - 10, num2 + 50];
    }

    opciones = opciones.filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'suma',
        subtipo: 'inversa',
        pregunta: pregunta,
        operacion: `? = ${correcta}`,
        opciones: opciones.slice(0, 4).map(o => o.toLocaleString('es-ES')),
        correcta: correcta.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} + ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Problema de Suma
 */
function generarProblemaSuma(nivel = 'medio') {
    const rangos = {
        facil: { min: 10, max: 99 },
        medio: { min: 100, max: 500 },
        dificil: { min: 500, max: 2000 }
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const resultado = num1 + num2;

    const contextos = [
        { texto: `María tiene ${num1.toLocaleString('es-ES')} € y su hermano le da ${num2.toLocaleString('es-ES')} €`, unidad: '€' },
        { texto: `Juan tiene ${num1.toLocaleString('es-ES')} cromos y compra ${num2.toLocaleString('es-ES')} más`, unidad: 'cromos' },
        { texto: `En una biblioteca hay ${num1.toLocaleString('es-ES')} libros y llegan ${num2.toLocaleString('es-ES')} nuevos`, unidad: 'libros' },
        { texto: `Un cine vendió ${num1.toLocaleString('es-ES')} entradas el sábado y ${num2.toLocaleString('es-ES')} el domingo`, unidad: 'entradas' }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + 100,
        resultado - 100,
        num1 + num2 + 50
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'suma',
        subtipo: 'problema',
        pregunta: `${contexto.texto}. ¿Cuántos ${contexto.unidad} tiene en total?`,
        operacion: `${num1} + ${num2}`,
        opciones: opciones.slice(0, 4).map(o => o.toLocaleString('es-ES')),
        correcta: resultado.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} + ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Estimación/Comparación
 */
function generarComparacionSuma(nivel = 'medio') {
    const rangos = {
        facil: { min: 20, max: 99 },
        medio: { min: 100, max: 500 },
        dificil: { min: 500, max: 2000 }
    };

    const rango = rangos[nivel];

    const a = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const b = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const c = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const d = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;

    const suma1 = a + b;
    const suma2 = c + d;

    let correcta;
    if (suma1 > suma2) {
        correcta = `${a.toLocaleString('es-ES')} + ${b.toLocaleString('es-ES')}`;
    } else if (suma2 > suma1) {
        correcta = `${c.toLocaleString('es-ES')} + ${d.toLocaleString('es-ES')}`;
    } else {
        correcta = 'Son iguales';
    }

    const opciones = [
        `${a.toLocaleString('es-ES')} + ${b.toLocaleString('es-ES')}`,
        `${c.toLocaleString('es-ES')} + ${d.toLocaleString('es-ES')}`,
        'Son iguales'
    ];

    return {
        tipo: 'suma',
        subtipo: 'comparacion',
        pregunta: `¿Qué suma da un resultado MAYOR?`,
        operacion: `${a}+${b}=${suma1} vs ${c}+${d}=${suma2}`,
        opciones: opciones,
        correcta: correcta,
        explicacion: `${a.toLocaleString('es-ES')} + ${b.toLocaleString('es-ES')} = ${suma1.toLocaleString('es-ES')} y ${c.toLocaleString('es-ES')} + ${d.toLocaleString('es-ES')} = ${suma2.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Serie
 */
function generarSerieSuma(nivel = 'medio') {
    let inicio, incremento;

    if (nivel === 'facil') {
        inicio = Math.floor(Math.random() * 50) + 10;
        incremento = [5, 10, 20, 25, 50][Math.floor(Math.random() * 5)];
    } else if (nivel === 'medio') {
        inicio = Math.floor(Math.random() * 100) + 50;
        incremento = [10, 25, 50, 100][Math.floor(Math.random() * 4)];
    } else {
        inicio = Math.floor(Math.random() * 500) + 100;
        incremento = [50, 100, 200, 250][Math.floor(Math.random() * 4)];
    }

    const serie = [
        inicio,
        inicio + incremento,
        inicio + (incremento * 2),
        '?',
        inicio + (incremento * 4)
    ];

    const correcta = inicio + (incremento * 3);

    const opciones = [
        correcta,
        correcta + incremento,
        correcta - incremento,
        correcta + (incremento / 2)
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'suma',
        subtipo: 'serie',
        pregunta: `Completa la serie: ${serie.map(n => typeof n === 'number' ? n.toLocaleString('es-ES') : n).join(', ')}`,
        operacion: `+${incremento}`,
        opciones: opciones.slice(0, 4).map(o => o.toLocaleString('es-ES')),
        correcta: correcta.toLocaleString('es-ES'),
        explicacion: `La serie aumenta de ${incremento.toLocaleString('es-ES')} en ${incremento.toLocaleString('es-ES')}. El número que falta es ${correcta.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * Genera suma con VARIEDAD
 */
export function generarSuma(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarSumaDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 35 },
        { tipo: 'inversa', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'comparacion', peso: 10 },
        { tipo: 'serie', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarSumaDirecta(nivel);
        case 'inversa':
            return generarSumaInversa(nivel);
        case 'problema':
            return generarProblemaSuma(nivel);
        case 'comparacion':
            return generarComparacionSuma(nivel);
        case 'serie':
            return generarSerieSuma(nivel);
        default:
            return generarSumaDirecta(nivel);
    }
}

// ==========================================
// RESTA CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Resta Directa
 */
function generarRestaDirecta(nivel = 'medio') {
    const rangos = {
        facil: { min: 20, max: 99 },      // 2 cifras
        medio: { min: 200, max: 999 },    // 3 cifras
        dificil: { min: 2000, max: 9999 } // 4 cifras
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * num1); // Asegurar que num2 < num1
    const resultado = num1 - num2;

    const opciones = [
        resultado,
        resultado + Math.floor(Math.random() * 10) + 1,
        resultado - Math.floor(Math.random() * 10) - 1,
        Math.abs(resultado - Math.floor(Math.random() * 20) - 5)
    ].sort(() => Math.random() - 0.5);

    return {
        tipo: 'resta',
        subtipo: 'directa',
        pregunta: `¿Cuánto es ${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')}?`,
        operacion: `${num1} - ${num2}`,
        opciones: opciones.map(o => o.toLocaleString('es-ES')),
        correcta: resultado.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Resta Inversa (minuendo o sustraendo oculto)
 */
function generarRestaInversa(nivel = 'medio') {
    const rangos = {
        facil: { min: 20, max: 99 },
        medio: { min: 200, max: 999 },
        dificil: { min: 2000, max: 5000 }
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * num1);
    const resultado = num1 - num2;

    const ocultar = Math.random() > 0.5 ? 'minuendo' : 'sustraendo';

    let pregunta, correcta, opciones;

    if (ocultar === 'minuendo') {
        pregunta = `Si ? - ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')}, ¿cuál es el número que falta?`;
        correcta = num1;
        opciones = [num1, num1 + 50, num1 - 50, num1 + 100];
    } else {
        pregunta = `Si ${num1.toLocaleString('es-ES')} - ? = ${resultado.toLocaleString('es-ES')}, ¿cuál es el número que falta?`;
        correcta = num2;
        opciones = [num2, num2 + 20, num2 - 20, num2 + 50];
    }

    opciones = opciones.filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'resta',
        subtipo: 'inversa',
        pregunta: pregunta,
        operacion: `? = ${correcta}`,
        opciones: opciones.slice(0, 4).map(o => o.toLocaleString('es-ES')),
        correcta: correcta.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Problema de Resta
 */
function generarProblemaResta(nivel = 'medio') {
    const rangos = {
        facil: { min: 50, max: 99 },
        medio: { min: 200, max: 500 },
        dificil: { min: 1000, max: 3000 }
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * (num1 - rango.min)) + Math.floor(rango.min / 2);
    const resultado = num1 - num2;

    const contextos = [
        { texto: `Juan tenía ${num1.toLocaleString('es-ES')} € y se gastó ${num2.toLocaleString('es-ES')} €`, unidad: '€' },
        { texto: `María tenía ${num1.toLocaleString('es-ES')} cromos y regaló ${num2.toLocaleString('es-ES')}`, unidad: 'cromos' },
        { texto: `En un cine había ${num1.toLocaleString('es-ES')} personas y se fueron ${num2.toLocaleString('es-ES')}`, unidad: 'personas' },
        { texto: `Había ${num1.toLocaleString('es-ES')} libros en la biblioteca y se prestaron ${num2.toLocaleString('es-ES')}`, unidad: 'libros' }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + 50,
        resultado - 50,
        num1 - num2 - 100
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'resta',
        subtipo: 'problema',
        pregunta: `${contexto.texto}. ¿Cuántos ${contexto.unidad} le quedan?`,
        operacion: `${num1} - ${num2}`,
        opciones: opciones.slice(0, 4).map(o => o.toLocaleString('es-ES')),
        correcta: resultado.toLocaleString('es-ES'),
        explicacion: `${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')} = ${resultado.toLocaleString('es-ES')} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparación de Restas
 */
function generarComparacionResta(nivel = 'medio') {
    const rangos = {
        facil: { min: 50, max: 99 },
        medio: { min: 200, max: 500 },
        dificil: { min: 1000, max: 3000 }
    };

    const rango = rangos[nivel];

    const a = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const b = Math.floor(Math.random() * (a - rango.min / 2)) + Math.floor(rango.min / 2);
    const c = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const d = Math.floor(Math.random() * (c - rango.min / 2)) + Math.floor(rango.min / 2);

    const resta1 = a - b;
    const resta2 = c - d;

    let correcta;
    if (resta1 > resta2) {
        correcta = `${a.toLocaleString('es-ES')} - ${b.toLocaleString('es-ES')}`;
    } else if (resta2 > resta1) {
        correcta = `${c.toLocaleString('es-ES')} - ${d.toLocaleString('es-ES')}`;
    } else {
        correcta = 'Son iguales';
    }

    const opciones = [
        `${a.toLocaleString('es-ES')} - ${b.toLocaleString('es-ES')}`,
        `${c.toLocaleString('es-ES')} - ${d.toLocaleString('es-ES')}`,
        'Son iguales'
    ];

    return {
        tipo: 'resta',
        subtipo: 'comparacion',
        pregunta: `¿Qué resta da un resultado MAYOR?`,
        operacion: `${a}-${b}=${resta1} vs ${c}-${d}=${resta2}`,
        opciones: opciones,
        correcta: correcta,
        explicacion: `${a.toLocaleString('es-ES')} - ${b.toLocaleString('es-ES')} = ${resta1.toLocaleString('es-ES')} y ${c.toLocaleString('es-ES')} - ${d.toLocaleString('es-ES')} = ${resta2.toLocaleString('es-ES')}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Verificación
 */
function generarVerificacionResta(nivel = 'medio') {
    const rangos = {
        facil: { min: 50, max: 99 },
        medio: { min: 200, max: 500 },
        dificil: { min: 1000, max: 3000 }
    };

    const rango = rangos[nivel];
    const num1 = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const num2 = Math.floor(Math.random() * (num1 - rango.min / 2)) + Math.floor(rango.min / 2);
    const resultadoCorrecto = num1 - num2;
    const resultadoIncorrecto = resultadoCorrecto + (Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : -Math.floor(Math.random() * 50) - 10);

    const esIncorrecto = Math.random() > 0.5;
    const resultadoMostrado = esIncorrecto ? resultadoIncorrecto : resultadoCorrecto;

    return {
        tipo: 'resta',
        subtipo: 'verificacion',
        pregunta: `¿Es correcto que ${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')} = ${resultadoMostrado.toLocaleString('es-ES')}?`,
        operacion: `${num1} - ${num2}`,
        opciones: ['Sí, es correcto', 'No, es incorrecto'],
        correcta: esIncorrecto ? 'No, es incorrecto' : 'Sí, es correcto',
        explicacion: `${num1.toLocaleString('es-ES')} - ${num2.toLocaleString('es-ES')} = ${resultadoCorrecto.toLocaleString('es-ES')}. ${esIncorrecto ? `Por tanto, ${resultadoMostrado.toLocaleString('es-ES')} es incorrecto.` : 'Por tanto, es correcto.'}`,
        dificultad: nivel
    };
}

/**
 * Genera resta con VARIEDAD
 */
export function generarResta(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarRestaDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 35 },
        { tipo: 'inversa', peso: 25 },
        { tipo: 'problema', peso: 20 },
        { tipo: 'comparacion', peso: 10 },
        { tipo: 'verificacion', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarRestaDirecta(nivel);
        case 'inversa':
            return generarRestaInversa(nivel);
        case 'problema':
            return generarProblemaResta(nivel);
        case 'comparacion':
            return generarComparacionResta(nivel);
        case 'verificacion':
            return generarVerificacionResta(nivel);
        default:
            return generarRestaDirecta(nivel);
    }
}

// ==========================================
// OPERACIONES COMBINADAS CON VARIEDAD (FASE 2)
// ==========================================

/**
 * TIPO 1: Multiplicación + Suma/Resta (clásica)
 */
function generarCombinadaMultSumaResta(nivel = 'medio') {
    const tipoOperacion = Math.random() > 0.5 ? 'suma' : 'resta';

    if (nivel === 'facil') {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 2;
        const producto = a * b;
        const c = Math.floor(Math.random() * 10) + 1;

        if (tipoOperacion === 'suma') {
            const resultado = producto + c;
            const opciones = [
                resultado,
                a * b + c + 1,
                a + b + c,
                (a + b) * c
            ].sort(() => Math.random() - 0.5);

            return {
                tipo: 'combinada',
                subtipo: 'mult_suma',
                pregunta: `¿Cuánto es (${a} × ${b}) + ${c}?`,
                operacion: `(${a} × ${b}) + ${c}`,
                opciones: opciones.map(o => o.toString()),
                correcta: resultado.toString(),
                explicacion: `Primero: ${a} × ${b} = ${producto}. Luego: ${producto} + ${c} = ${resultado}`,
                dificultad: nivel
            };
        } else {
            const resultado = producto - c;
            const opciones = [
                resultado,
                producto - c + 1,
                a + b - c,
                (a - b) * c
            ].sort(() => Math.random() - 0.5);

            return {
                tipo: 'combinada',
                subtipo: 'mult_resta',
                pregunta: `¿Cuánto es (${a} × ${b}) - ${c}?`,
                operacion: `(${a} × ${b}) - ${c}`,
                opciones: opciones.map(o => o.toString()),
                correcta: resultado.toString(),
                explicacion: `Primero: ${a} × ${b} = ${producto}. Luego: ${producto} - ${c} = ${resultado}`,
                dificultad: nivel
            };
        }
    } else {
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * 9) + 2;
        const c = Math.floor(Math.random() * 9) + 2;
        const d = Math.floor(Math.random() * 9) + 2;

        const prod1 = a * b;
        const prod2 = c * d;
        const resultado = prod1 + prod2;

        const opciones = [
            resultado,
            (a + c) * (b + d),
            prod1 + c * d + 1,
            a * b + c + d
        ].sort(() => Math.random() - 0.5);

        return {
            tipo: 'combinada',
            subtipo: 'mult_mult',
            pregunta: `¿Cuánto es (${a} × ${b}) + (${c} × ${d})?`,
            operacion: `(${a} × ${b}) + (${c} × ${d})`,
            opciones: opciones.map(o => o.toString()),
            correcta: resultado.toString(),
            explicacion: `Primero: ${a} × ${b} = ${prod1}. Luego: ${c} × ${d} = ${prod2}. Finalmente: ${prod1} + ${prod2} = ${resultado}`,
            dificultad: nivel
        };
    }
}

/**
 * TIPO 2: División + Suma/Resta
 */
function generarCombinadaDivSumaResta(nivel = 'medio') {
    const tipoOperacion = Math.random() > 0.5 ? 'suma' : 'resta';

    let divisor, cociente, dividendo, c;

    if (nivel === 'facil') {
        divisor = Math.floor(Math.random() * 5) + 2;
        cociente = Math.floor(Math.random() * 8) + 2;
        dividendo = divisor * cociente;
        c = Math.floor(Math.random() * 10) + 1;
    } else {
        divisor = Math.floor(Math.random() * 8) + 2;
        cociente = Math.floor(Math.random() * 15) + 5;
        dividendo = divisor * cociente;
        c = Math.floor(Math.random() * 20) + 1;
    }

    if (tipoOperacion === 'suma') {
        const resultado = cociente + c;
        const opciones = [
            resultado,
            cociente + c + 1,
            dividendo + c,
            cociente - c
        ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
            .sort(() => Math.random() - 0.5);

        return {
            tipo: 'combinada',
            subtipo: 'div_suma',
            pregunta: `¿Cuánto es (${dividendo} ÷ ${divisor}) + ${c}?`,
            operacion: `(${dividendo} ÷ ${divisor}) + ${c}`,
            opciones: opciones.slice(0, 4).map(o => o.toString()),
            correcta: resultado.toString(),
            explicacion: `Primero: ${dividendo} ÷ ${divisor} = ${cociente}. Luego: ${cociente} + ${c} = ${resultado}`,
            dificultad: nivel
        };
    } else {
        const resultado = cociente - c;
        if (resultado < 1) {
            // Si el resultado es negativo, cambiamos a suma
            return generarCombinadaDivSumaResta(nivel);
        }

        const opciones = [
            resultado,
            resultado + 1,
            cociente + c,
            dividendo - c
        ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
            .sort(() => Math.random() - 0.5);

        return {
            tipo: 'combinada',
            subtipo: 'div_resta',
            pregunta: `¿Cuánto es (${dividendo} ÷ ${divisor}) - ${c}?`,
            operacion: `(${dividendo} ÷ ${divisor}) - ${c}`,
            opciones: opciones.slice(0, 4).map(o => o.toString()),
            correcta: resultado.toString(),
            explicacion: `Primero: ${dividendo} ÷ ${divisor} = ${cociente}. Luego: ${cociente} - ${c} = ${resultado}`,
            dificultad: nivel
        };
    }
}

/**
 * TIPO 3: Operaciones con Paréntesis (Suma/Resta primero)
 */
function generarCombinadaConParentesis(nivel = 'medio') {
    let a, b, c;

    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 10) + 5;
        b = Math.floor(Math.random() * 5) + 1;
        c = Math.floor(Math.random() * 5) + 2;
    } else {
        a = Math.floor(Math.random() * 20) + 10;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 8) + 2;
    }

    const operacionInterior = Math.random() > 0.5 ? 'suma' : 'resta';

    if (operacionInterior === 'suma') {
        const interior = a + b;
        const resultado = interior * c;

        const opciones = [
            resultado,
            a + b * c,  // Error común: no respetar paréntesis
            (a + b) * c + 1,
            a * c + b
        ].filter((v, i, a) => a.indexOf(v) === i)
            .sort(() => Math.random() - 0.5);

        return {
            tipo: 'combinada',
            subtipo: 'parentesis_suma',
            pregunta: `¿Cuánto es (${a} + ${b}) × ${c}?`,
            operacion: `(${a} + ${b}) × ${c}`,
            opciones: opciones.slice(0, 4).map(o => o.toString()),
            correcta: resultado.toString(),
            explicacion: `Primero resolvemos el paréntesis: ${a} + ${b} = ${interior}. Luego: ${interior} × ${c} = ${resultado}`,
            dificultad: nivel
        };
    } else {
        if (a <= b) {
            // Evitar resultados negativos
            return generarCombinadaConParentesis(nivel);
        }

        const interior = a - b;
        const resultado = interior * c;

        const opciones = [
            resultado,
            a - b * c,  // Error común: no respetar paréntesis
            (a - b) * c + 1,
            a * c - b
        ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
            .sort(() => Math.random() - 0.5);

        return {
            tipo: 'combinada',
            subtipo: 'parentesis_resta',
            pregunta: `¿Cuánto es (${a} - ${b}) × ${c}?`,
            operacion: `(${a} - ${b}) × ${c}`,
            opciones: opciones.slice(0, 4).map(o => o.toString()),
            correcta: resultado.toString(),
            explicacion: `Primero resolvemos el paréntesis: ${a} - ${b} = ${interior}. Luego: ${interior} × ${c} = ${resultado}`,
            dificultad: nivel
        };
    }
}

/**
 * TIPO 4: Tres Operaciones Diferentes
 */
function generarCombinadaTresOperaciones(nivel = 'medio') {
    let a, b, c, d;

    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 5) + 2;
        b = Math.floor(Math.random() * 5) + 2;
        c = Math.floor(Math.random() * 10) + 5;
        d = Math.floor(Math.random() * 5) + 1;
    } else {
        a = Math.floor(Math.random() * 8) + 2;
        b = Math.floor(Math.random() * 8) + 2;
        c = Math.floor(Math.random() * 20) + 10;
        d = Math.floor(Math.random() * 10) + 1;
    }

    const producto = a * b;
    const suma = producto + c;
    const resultado = suma - d;

    if (resultado < 1) {
        return generarCombinadaTresOperaciones(nivel);
    }

    const opciones = [
        resultado,
        a * b + c - d + 1,
        (a * b + c) - d + 1,
        a * (b + c) - d
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'combinada',
        subtipo: 'tres_operaciones',
        pregunta: `¿Cuánto es ${a} × ${b} + ${c} - ${d}?`,
        operacion: `${a} × ${b} + ${c} - ${d}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `Paso 1: ${a} × ${b} = ${producto}. Paso 2: ${producto} + ${c} = ${suma}. Paso 3: ${suma} - ${d} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema de Operaciones Combinadas
 */
function generarProblemaOperacionesCombinadas(nivel = 'medio') {
    let cantidad, precio, extra;

    if (nivel === 'facil') {
        cantidad = Math.floor(Math.random() * 5) + 2;
        precio = Math.floor(Math.random() * 5) + 2;
        extra = Math.floor(Math.random() * 10) + 5;
    } else {
        cantidad = Math.floor(Math.random() * 8) + 3;
        precio = Math.floor(Math.random() * 10) + 5;
        extra = Math.floor(Math.random() * 20) + 10;
    }

    const contextos = [
        {
            plantilla: `María compra ${cantidad} libros a ${precio}€ cada uno y luego gasta ${extra}€ más en material escolar. ¿Cuánto gasta en total?`,
            unidad: '€'
        },
        {
            plantilla: `Juan tiene ${cantidad} cajas con ${precio} cromos cada una. Si su hermano le da ${extra} cromos más, ¿cuántos cromos tiene en total?`,
            unidad: 'cromos'
        },
        {
            plantilla: `En una tienda hay ${cantidad} estantes con ${precio} libros cada uno. Si llegan ${extra} libros más, ¿cuántos libros hay en total?`,
            unidad: 'libros'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];
    const resultado = (cantidad * precio) + extra;

    const opciones = [
        resultado,
        cantidad + precio + extra,  // Error común: sumar todo
        (cantidad + precio) * extra,
        cantidad * (precio + extra)
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'combinada',
        subtipo: 'problema',
        pregunta: contexto.plantilla,
        operacion: `(${cantidad} × ${precio}) + ${extra}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `Primero: ${cantidad} × ${precio} = ${cantidad * precio}. Luego: ${cantidad * precio} + ${extra} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * Genera operación combinada con VARIEDAD
 */
export function generarOperacionCombinada(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarCombinadaMultSumaResta(nivel);
    }

    const tipos = [
        { tipo: 'mult_suma_resta', peso: 30 },
        { tipo: 'div_suma_resta', peso: 20 },
        { tipo: 'parentesis', peso: 20 },
        { tipo: 'tres_operaciones', peso: 15 },
        { tipo: 'problema', peso: 15 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'mult_suma_resta':
            return generarCombinadaMultSumaResta(nivel);
        case 'div_suma_resta':
            return generarCombinadaDivSumaResta(nivel);
        case 'parentesis':
            return generarCombinadaConParentesis(nivel);
        case 'tres_operaciones':
            return generarCombinadaTresOperaciones(nivel);
        case 'problema':
            return generarProblemaOperacionesCombinadas(nivel);
        default:
            return generarCombinadaMultSumaResta(nivel);
    }
}

// ==========================================
// FRACCIONES CON VARIEDAD (FASE 2)
// ==========================================

/**
 * TIPO 1: Fracción de Cantidad (clásica)
 */
function generarFraccionCantidad(nivel = 'facil') {
    const fracciones = {
        facil: [
            { texto: '1/2', numerador: 1, denominador: 2, nombre: 'un medio' },
            { texto: '1/4', numerador: 1, denominador: 4, nombre: 'un cuarto' },
            { texto: '1/3', numerador: 1, denominador: 3, nombre: 'un tercio' },
            { texto: '2/4', numerador: 2, denominador: 4, nombre: 'dos cuartos' }
        ],
        medio: [
            { texto: '3/4', numerador: 3, denominador: 4, nombre: 'tres cuartos' },
            { texto: '2/3', numerador: 2, denominador: 3, nombre: 'dos tercios' },
            { texto: '1/5', numerador: 1, denominador: 5, nombre: 'un quinto' },
            { texto: '3/5', numerador: 3, denominador: 5, nombre: 'tres quintos' }
        ],
        dificil: [
            { texto: '2/5', numerador: 2, denominador: 5, nombre: 'dos quintos' },
            { texto: '4/5', numerador: 4, denominador: 5, nombre: 'cuatro quintos' },
            { texto: '5/6', numerador: 5, denominador: 6, nombre: 'cinco sextos' },
            { texto: '3/8', numerador: 3, denominador: 8, nombre: 'tres octavos' }
        ]
    };

    const lista = fracciones[nivel];
    const fraccion = lista[Math.floor(Math.random() * lista.length)];

    const cantidad = nivel === 'facil'
        ? [4, 8, 12, 16, 20][Math.floor(Math.random() * 5)]
        : nivel === 'medio'
            ? [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)]
            : [20, 24, 30, 40, 50][Math.floor(Math.random() * 5)];

    const resultado = Math.floor((cantidad * fraccion.numerador) / fraccion.denominador);

    const opciones = [
        resultado,
        resultado + 1,
        resultado - 1,
        Math.floor(cantidad / 2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    while (opciones.length < 4) {
        const nueva = resultado + Math.floor(Math.random() * 5) - 2;
        if (!opciones.includes(nueva) && nueva > 0) {
            opciones.push(nueva);
        }
    }

    return {
        tipo: 'fraccion',
        subtipo: 'cantidad',
        pregunta: `Si tienes ${cantidad} caramelos y das ${fraccion.nombre} (${fraccion.texto}), ¿cuántos caramelos das?`,
        operacion: `${fraccion.texto} de ${cantidad}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${fraccion.nombre} de ${cantidad} es ${cantidad} × ${fraccion.numerador} ÷ ${fraccion.denominador} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Comparación de Fracciones
 */
function generarComparacionFracciones(nivel = 'facil') {
    const fracciones = {
        facil: [
            { texto: '1/2', valor: 0.5, nombre: 'un medio' },
            { texto: '1/4', valor: 0.25, nombre: 'un cuarto' },
            { texto: '1/3', valor: 0.33, nombre: 'un tercio' },
            { texto: '3/4', valor: 0.75, nombre: 'tres cuartos' }
        ],
        medio: [
            { texto: '2/3', valor: 0.67, nombre: 'dos tercios' },
            { texto: '3/4', valor: 0.75, nombre: 'tres cuartos' },
            { texto: '1/5', valor: 0.2, nombre: 'un quinto' },
            { texto: '2/5', valor: 0.4, nombre: 'dos quintos' },
            { texto: '3/5', valor: 0.6, nombre: 'tres quintos' }
        ],
        dificil: [
            { texto: '5/6', valor: 0.83, nombre: 'cinco sextos' },
            { texto: '3/8', valor: 0.375, nombre: 'tres octavos' },
            { texto: '5/8', valor: 0.625, nombre: 'cinco octavos' },
            { texto: '4/5', valor: 0.8, nombre: 'cuatro quintos' }
        ]
    };

    const lista = fracciones[nivel];
    const frac1 = lista[Math.floor(Math.random() * lista.length)];
    let frac2;
    do {
        frac2 = lista[Math.floor(Math.random() * lista.length)];
    } while (frac2.texto === frac1.texto);

    let correcta;
    if (frac1.valor > frac2.valor) {
        correcta = frac1.texto;
    } else if (frac2.valor > frac1.valor) {
        correcta = frac2.texto;
    } else {
        correcta = 'Son iguales';
    }

    const opciones = [frac1.texto, frac2.texto, 'Son iguales'];

    return {
        tipo: 'fraccion',
        subtipo: 'comparacion',
        pregunta: `¿Cuál fracción es MAYOR?`,
        operacion: `${frac1.texto} vs ${frac2.texto}`,
        opciones: opciones,
        correcta: correcta,
        explicacion: `${frac1.texto} (${frac1.nombre}) = ${frac1.valor} y ${frac2.texto} (${frac2.nombre}) = ${frac2.valor}. ${correcta} es mayor.`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Fracciones Equivalentes
 */
function generarFraccionesEquivalentes(nivel = 'facil') {
    const equivalencias = {
        facil: [
            { base: '1/2', equivalentes: ['2/4', '3/6', '4/8'], factor: [2, 3, 4] },
            { base: '1/3', equivalentes: ['2/6', '3/9', '4/12'], factor: [2, 3, 4] },
            { base: '1/4', equivalentes: ['2/8', '3/12', '4/16'], factor: [2, 3, 4] }
        ],
        medio: [
            { base: '2/3', equivalentes: ['4/6', '6/9', '8/12'], factor: [2, 3, 4] },
            { base: '3/4', equivalentes: ['6/8', '9/12', '12/16'], factor: [2, 3, 4] },
            { base: '2/5', equivalentes: ['4/10', '6/15', '8/20'], factor: [2, 3, 4] }
        ],
        dificil: [
            { base: '3/5', equivalentes: ['6/10', '9/15', '12/20'], factor: [2, 3, 4] },
            { base: '4/5', equivalentes: ['8/10', '12/15', '16/20'], factor: [2, 3, 4] },
            { base: '5/6', equivalentes: ['10/12', '15/18', '20/24'], factor: [2, 3, 4] }
        ]
    };

    const lista = equivalencias[nivel];
    const eq = lista[Math.floor(Math.random() * lista.length)];
    const correcta = eq.equivalentes[Math.floor(Math.random() * eq.equivalentes.length)];

    // Generar opciones incorrectas
    const opciones = [correcta];
    const todasEquivalentes = equivalencias[nivel].flatMap(e => e.equivalentes);
    while (opciones.length < 4) {
        const incorrecta = todasEquivalentes[Math.floor(Math.random() * todasEquivalentes.length)];
        if (!opciones.includes(incorrecta) && incorrecta !== correcta) {
            opciones.push(incorrecta);
        }
    }

    return {
        tipo: 'fraccion',
        subtipo: 'equivalente',
        pregunta: `¿Cuál fracción es EQUIVALENTE a ${eq.base}?`,
        operacion: `${eq.base} = ?`,
        opciones: opciones.sort(() => Math.random() - 0.5),
        correcta: correcta,
        explicacion: `${eq.base} es equivalente a ${correcta} porque ambas representan la misma cantidad.`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Suma de Fracciones con Igual Denominador
 */
function generarSumaFracciones(nivel = 'facil') {
    let denominador, num1, num2;

    if (nivel === 'facil') {
        denominador = [2, 4, 8][Math.floor(Math.random() * 3)];
        num1 = Math.floor(Math.random() * (denominador - 1)) + 1;
        num2 = Math.floor(Math.random() * (denominador - num1));
    } else if (nivel === 'medio') {
        denominador = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
        num1 = Math.floor(Math.random() * (denominador - 1)) + 1;
        num2 = Math.floor(Math.random() * (denominador - num1)) + 1;
    } else {
        denominador = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
        num1 = Math.floor(Math.random() * (denominador - 2)) + 1;
        num2 = Math.floor(Math.random() * (denominador - num1)) + 1;
    }

    const resultadoNumerador = num1 + num2;
    const resultadoTexto = `${resultadoNumerador}/${denominador}`;

    const opciones = [
        resultadoTexto,
        `${resultadoNumerador + 1}/${denominador}`,
        `${resultadoNumerador - 1}/${denominador}`,
        `${num1 + num2}/${denominador * 2}`
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'fraccion',
        subtipo: 'suma',
        pregunta: `¿Cuánto es ${num1}/${denominador} + ${num2}/${denominador}?`,
        operacion: `${num1}/${denominador} + ${num2}/${denominador}`,
        opciones: opciones.slice(0, 4),
        correcta: resultadoTexto,
        explicacion: `${num1}/${denominador} + ${num2}/${denominador} = ${resultadoNumerador}/${denominador} (sumamos los numeradores y mantenemos el denominador)`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Fracción de una Fracción (problema)
 */
function generarFraccionDeFraccion(nivel = 'facil') {
    const contextos = [
        { texto: 'pizza', accion: 'come', plural: 'porciones' },
        { texto: 'tarta', accion: 'reparte', plural: 'pedazos' },
        { texto: 'chocolate', accion: 'da', plural: 'partes' }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    let totalPartes, primeraFraccion, segundaFraccion;

    if (nivel === 'facil') {
        totalPartes = [4, 8][Math.floor(Math.random() * 2)];
        primeraFraccion = { num: 1, den: 2, nombre: 'la mitad' };
        segundaFraccion = { num: 1, den: 2, nombre: 'la mitad' };
    } else if (nivel === 'medio') {
        totalPartes = 12;
        primeraFraccion = { num: 2, den: 3, nombre: 'dos tercios' };
        segundaFraccion = { num: 1, den: 2, nombre: 'la mitad' };
    } else {
        totalPartes = 20;
        primeraFraccion = { num: 3, den: 4, nombre: 'tres cuartos' };
        segundaFraccion = { num: 1, den: 3, nombre: 'un tercio' };
    }

    const primerResultado = Math.floor((totalPartes * primeraFraccion.num) / primeraFraccion.den);
    const resultadoFinal = Math.floor((primerResultado * segundaFraccion.num) / segundaFraccion.den);

    const opciones = [
        resultadoFinal,
        resultadoFinal + 1,
        primerResultado,
        Math.floor(totalPartes / 2)
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'fraccion',
        subtipo: 'problema_complejo',
        pregunta: `Tienes una ${contexto.texto} de ${totalPartes} ${contexto.plural}. Si ${contexto.accion}s ${primeraFraccion.nombre} y luego regalas ${segundaFraccion.nombre} de lo que ${contexto.accion}ste, ¿cuántas ${contexto.plural} regalas?`,
        operacion: `${primeraFraccion.num}/${primeraFraccion.den} de ${totalPartes}, luego ${segundaFraccion.num}/${segundaFraccion.den}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultadoFinal.toString(),
        explicacion: `Primero: ${primeraFraccion.num}/${primeraFraccion.den} de ${totalPartes} = ${primerResultado}. Luego: ${segundaFraccion.num}/${segundaFraccion.den} de ${primerResultado} = ${resultadoFinal}`,
        dificultad: nivel
    };
}

/**
 * Genera fracción con VARIEDAD
 */
export function generarFraccion(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarFraccionCantidad(nivel);
    }

    const tipos = [
        { tipo: 'cantidad', peso: 30 },
        { tipo: 'comparacion', peso: 20 },
        { tipo: 'equivalente', peso: 20 },
        { tipo: 'suma', peso: 20 },
        { tipo: 'problema_complejo', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'cantidad':
            return generarFraccionCantidad(nivel);
        case 'comparacion':
            return generarComparacionFracciones(nivel);
        case 'equivalente':
            return generarFraccionesEquivalentes(nivel);
        case 'suma':
            return generarSumaFracciones(nivel);
        case 'problema_complejo':
            return generarFraccionDeFraccion(nivel);
        default:
            return generarFraccionCantidad(nivel);
    }
}

// ==========================================
// PROBLEMAS CON VARIEDAD (FASE 2)
// ==========================================

/**
 * TIPO 1: Problema de Suma
 */
function generarProblemaSumaVariado(nivel = 'medio') {
    const rangos = {
        facil: { min: 10, max: 50 },
        medio: { min: 20, max: 100 },
        dificil: { min: 50, max: 200 }
    };

    const rango = rangos[nivel];
    const a = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const b = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const resultado = a + b;

    const contextos = [
        {
            plantilla: `María tiene ${a} cromos y su hermano le da ${b} más. ¿Cuántos cromos tiene ahora?`,
            unidad: 'cromos'
        },
        {
            plantilla: `Un autobús lleva ${a} pasajeros. En la siguiente parada suben ${b} personas. ¿Cuántos pasajeros hay ahora?`,
            unidad: 'pasajeros'
        },
        {
            plantilla: `En una librería hay ${a} libros. Llegan ${b} libros nuevos. ¿Cuántos libros hay en total?`,
            unidad: 'libros'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + Math.floor(Math.random() * 5) + 1,
        resultado - Math.floor(Math.random() * 5) - 1,
        a - b < 0 ? resultado + 10 : Math.abs(a - b)  // Confusión suma/resta
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'problema',
        subtipo: 'suma',
        pregunta: contexto.plantilla,
        operacion: `${a} + ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} + ${b} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Problema de Resta
 */
function generarProblemaRestaVariado(nivel = 'medio') {
    const rangos = {
        facil: { min: 20, max: 100 },
        medio: { min: 50, max: 200 },
        dificil: { min: 100, max: 500 }
    };

    const rango = rangos[nivel];
    const a = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const b = Math.floor(Math.random() * a);  // Asegurar que b < a
    const resultado = a - b;

    const contextos = [
        {
            plantilla: `Juan tenía ${a} € y se gastó ${b} € en un libro. ¿Cuánto dinero le queda?`,
            unidad: '€'
        },
        {
            plantilla: `En un árbol había ${a} manzanas. Se cayeron ${b} manzanas. ¿Cuántas manzanas quedan?`,
            unidad: 'manzanas'
        },
        {
            plantilla: `María tenía ${a} cromos y regaló ${b} a su amigo. ¿Cuántos cromos le quedan?`,
            unidad: 'cromos'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + Math.floor(Math.random() * 10) + 1,
        resultado - Math.floor(Math.random() * 10) - 1,
        a + b  // Confusión suma/resta
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'problema',
        subtipo: 'resta',
        pregunta: contexto.plantilla,
        operacion: `${a} - ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} - ${b} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Problema de Multiplicación
 */
function generarProblemaMultiplicacionVariado(nivel = 'medio') {
    const rangos = {
        facil: { min: 2, max: 8 },
        medio: { min: 3, max: 12 },
        dificil: { min: 5, max: 20 }
    };

    const rango = rangos[nivel];
    const a = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const b = Math.floor(Math.random() * (rango.max - rango.min + 1)) + rango.min;
    const resultado = a * b;

    const contextos = [
        {
            plantilla: `En una clase hay ${a} filas de ${b} pupitres cada una. ¿Cuántos pupitres hay en total?`,
            unidad: 'pupitres'
        },
        {
            plantilla: `María tiene ${a} cajas con ${b} manzanas cada una. ¿Cuántas manzanas tiene en total?`,
            unidad: 'manzanas'
        },
        {
            plantilla: `Un cine tiene ${a} filas con ${b} asientos cada una. ¿Cuántos asientos hay en total?`,
            unidad: 'asientos'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        resultado + a,
        resultado - b,
        a + b  // Error común: sumar en vez de multiplicar
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'problema',
        subtipo: 'multiplicacion',
        pregunta: contexto.plantilla,
        operacion: `${a} × ${b}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `${a} × ${b} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Problema de División
 */
function generarProblemaDivisionVariado(nivel = 'medio') {
    let grupos, porGrupo, total;

    if (nivel === 'facil') {
        grupos = Math.floor(Math.random() * 7) + 2;  // 2-8
        porGrupo = Math.floor(Math.random() * 8) + 2; // 2-9
        total = grupos * porGrupo;
    } else if (nivel === 'medio') {
        grupos = Math.floor(Math.random() * 8) + 3;   // 3-10
        porGrupo = Math.floor(Math.random() * 15) + 5; // 5-19
        total = grupos * porGrupo;
    } else {
        grupos = Math.floor(Math.random() * 15) + 5; // 5-19
        porGrupo = Math.floor(Math.random() * 20) + 5; // 5-24
        total = grupos * porGrupo;
    }

    const contextos = [
        {
            plantilla: `Hay ${total} galletas que se reparten entre ${grupos} niños. ¿Cuántas galletas recibe cada niño?`,
            unidad: 'galletas'
        },
        {
            plantilla: `Se reparten ${total} € entre ${grupos} personas. ¿Cuántos € recibe cada persona?`,
            unidad: '€'
        },
        {
            plantilla: `${total} sillas se colocan en ${grupos} filas. ¿Cuántas sillas hay en cada fila?`,
            unidad: 'sillas por fila'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        porGrupo,
        porGrupo + 1,
        porGrupo - 1,
        Math.floor(total / (grupos + 1))
    ].filter((v, i, a) => a.indexOf(v) === i && v > 0)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'problema',
        subtipo: 'division',
        pregunta: contexto.plantilla,
        operacion: `${total} ÷ ${grupos}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: porGrupo.toString(),
        explicacion: `${total} ÷ ${grupos} = ${porGrupo} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema de Dos Pasos
 */
function generarProblemaDosPasos(nivel = 'medio') {
    let a, b, c;

    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 5) + 2;
        b = Math.floor(Math.random() * 5) + 2;
        c = Math.floor(Math.random() * 10) + 5;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 10) + 3;
        b = Math.floor(Math.random() * 8) + 2;
        c = Math.floor(Math.random() * 20) + 10;
    } else {
        a = Math.floor(Math.random() * 15) + 5;
        b = Math.floor(Math.random() * 12) + 3;
        c = Math.floor(Math.random() * 30) + 15;
    }

    const paso1 = a * b;
    const resultado = paso1 + c;

    const contextos = [
        {
            plantilla: `Ana compra ${a} cajas de ${b} lápices cada una. Si tenía ${c} lápices en casa, ¿cuántos lápices tiene en total?`,
            unidad: 'lápices'
        },
        {
            plantilla: `Un granjero tiene ${a} gallineros con ${b} gallinas cada uno. Si compra ${c} gallinas más, ¿cuántas gallinas tiene en total?`,
            unidad: 'gallinas'
        },
        {
            plantilla: `En una tienda hay ${a} estantes con ${b} libros cada uno. Si llegan ${c} libros nuevos, ¿cuántos libros hay en total?`,
            unidad: 'libros'
        }
    ];

    const contexto = contextos[Math.floor(Math.random() * contextos.length)];

    const opciones = [
        resultado,
        a + b + c,  // Error: sumar todo
        a * b,  // Solo el primer paso
        (a + c) * b  // Orden incorrecto
    ].filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'problema',
        subtipo: 'dos_pasos',
        pregunta: contexto.plantilla,
        operacion: `(${a} × ${b}) + ${c}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `Paso 1: ${a} × ${b} = ${paso1}. Paso 2: ${paso1} + ${c} = ${resultado} ${contexto.unidad}`,
        dificultad: nivel
    };
}

/**
 * Genera problema con VARIEDAD
 */
export function generarProblema(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarProblemaSumaVariado(nivel);
    }

    const tipos = [
        { tipo: 'suma', peso: 20 },
        { tipo: 'resta', peso: 20 },
        { tipo: 'multiplicacion', peso: 20 },
        { tipo: 'division', peso: 20 },
        { tipo: 'dos_pasos', peso: 20 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'suma':
            return generarProblemaSumaVariado(nivel);
        case 'resta':
            return generarProblemaRestaVariado(nivel);
        case 'multiplicacion':
            return generarProblemaMultiplicacionVariado(nivel);
        case 'division':
            return generarProblemaDivisionVariado(nivel);
        case 'dos_pasos':
            return generarProblemaDosPasos(nivel);
        default:
            return generarProblemaSumaVariado(nivel);
    }
}

/**
 * Genera una ficha completa de matemáticas
 * ✨ CON VARIEDAD activada por defecto
 */
export function generarFichaMatematicas(config = {}) {
    const {
        numPreguntas = 10,
        tipos = ['suma', 'resta', 'multiplicacion', 'division', 'combinada', 'fraccion', 'problema'],
        dificultad = 'medio',
        variedad = true  // ← NUEVO: Activar variedad por defecto
    } = config;

    const ejercicios = [];
    const generadores = {
        suma: (nivel) => generarSuma(nivel, variedad),
        resta: (nivel) => generarResta(nivel, variedad),
        multiplicacion: (nivel) => generarMultiplicacion(nivel, variedad),
        division: (nivel) => generarDivision(nivel, variedad),
        combinada: (nivel) => generarOperacionCombinada(nivel, variedad),
        fraccion: (nivel) => generarFraccion(nivel, variedad),
        problema: (nivel) => generarProblema(nivel, variedad)
    };

    for (let i = 0; i < numPreguntas; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const generador = generadores[tipo];
        const ejercicio = generador(dificultad);
        ejercicios.push({
            id: `mat_${i + 1}`,
            ...ejercicio
        });
    }

    return {
        titulo: `Matemáticas 4º Primaria - ${dificultad.charAt(0).toUpperCase() + dificultad.slice(1)}`,
        asignatura: 'Matemáticas',
        curso: '4º Primaria',
        ejercicios: ejercicios,
        generadoPor: 'Código determinista (100% fiable) con variedad de formatos',
        metadatos: {
            variedad: variedad,
            tipos_disponibles: variedad ? 5 : 1,
            distribucion: variedad ? '35% directa, 25% inversa, 20% problema, 10% comparación, 10% serie' : '100% directa'
        },
        fecha: new Date().toISOString()
    };
}

export default {
    generarSuma,
    generarResta,
    generarMultiplicacion,
    generarDivision,
    generarOperacionCombinada,
    generarFraccion,
    generarProblema,
    generarFichaMatematicas
};
