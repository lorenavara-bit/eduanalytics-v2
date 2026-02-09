/**
 * GENERADOR DE MATEMÁTICAS 4º PRIMARIA - FASE 2 CON VARIEDAD
 * Fracciones, Operaciones Combinadas y Problemas con VARIEDAD
 */

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
    let cantidad, precio, personas, extra;

    if (nivel === 'facil') {
        cantidad = Math.floor(Math.random() * 5) + 2;
        precio = Math.floor(Math.random() * 5) + 2;
        personas = Math.floor(Math.random() * 3) + 2;
        extra = Math.floor(Math.random() * 10) + 5;
    } else {
        cantidad = Math.floor(Math.random() * 8) + 3;
        precio = Math.floor(Math.random() * 10) + 5;
        personas = Math.floor(Math.random() * 4) + 2;
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
