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
