/**
 * GENERADOR DE PROPIEDADES MATEMÁTICAS 4º PRIMARIA - CON VARIEDAD
 * Genera ejercicios deterministas (100% precisos) sin usar IA
 * 
 * Propiedades implementadas:
 * - Conmutativa (suma y multiplicación)
 * - Asociativa (suma y multiplicación)
 * - Distributiva (multiplicación sobre suma/resta)
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
// PROPIEDAD CONMUTATIVA CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Verificación directa (¿Es cierto?)
 */
function generarConmutativaVerificacion(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 9) + 2;  // 2-10
        b = Math.floor(Math.random() * 9) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 18) + 3; // 3-20
        b = Math.floor(Math.random() * 18) + 3;
    } else {
        a = Math.floor(Math.random() * 48) + 3; // 3-50
        b = Math.floor(Math.random() * 48) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';
    const nombreOp = operacion === 'suma' ? 'suma' : 'multiplicación';

    return {
        tipo: 'propiedad',
        subtipo: 'conmutativa_verificacion',
        pregunta: `¿Es cierto que ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}?`,
        operacion: `${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        opciones: ['Sí', 'No'],
        correcta: 'Sí',
        explicacion: `Por la propiedad conmutativa de la ${nombreOp}, el orden de los números no altera el resultado: ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Completar ecuación
 */
function generarConmutativaCompletar(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 9) + 2;
        b = Math.floor(Math.random() * 9) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 18) + 3;
        b = Math.floor(Math.random() * 18) + 3;
    } else {
        a = Math.floor(Math.random() * 48) + 3;
        b = Math.floor(Math.random() * 48) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';
    const correcta = b;

    const opciones = [
        correcta,
        correcta + 1,
        correcta - 1,
        a
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'propiedad',
        subtipo: 'conmutativa_completar',
        pregunta: `Completa usando la propiedad conmutativa: ${a} ${simbolo} ${b} = ? ${simbolo} ${a}`,
        operacion: `${a} ${simbolo} ${b} = ? ${simbolo} ${a}`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: correcta.toString(),
        explicacion: `Por la propiedad conmutativa: ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Identificar propiedad
 */
function generarConmutativaIdentificar(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 9) + 2;
        b = Math.floor(Math.random() * 9) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 18) + 3;
        b = Math.floor(Math.random() * 18) + 3;
    } else {
        a = Math.floor(Math.random() * 48) + 3;
        b = Math.floor(Math.random() * 48) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';

    return {
        tipo: 'propiedad',
        subtipo: 'conmutativa_identificar',
        pregunta: `La igualdad ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a} usa la propiedad:`,
        operacion: `${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        opciones: ['Conmutativa', 'Asociativa', 'Distributiva', 'Elemento neutro'],
        correcta: 'Conmutativa',
        explicacion: `Esta igualdad usa la propiedad CONMUTATIVA porque cambia el orden de los factores pero el resultado no cambia.`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Problema aplicado
 */
function generarConmutativaProblema(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 15) + 3;
        b = Math.floor(Math.random() * 15) + 3;
    } else {
        a = Math.floor(Math.random() * 30) + 5;
        b = Math.floor(Math.random() * 30) + 5;
    }

    let problema, nombreOp, simbolo;

    if (operacion === 'suma') {
        simbolo = '+';
        nombreOp = 'suma';
        problema = `Ana tiene ${a} cromos y Marta tiene ${b} cromos. ¿Es lo mismo calcular ${a} + ${b} que ${b} + ${a}?`;
    } else {
        simbolo = '×';
        nombreOp = 'multiplicación';
        problema = `Juan tiene ${a} cajas con ${b} lápices cada una. ¿Es lo mismo que tener ${b} cajas con ${a} lápices?`;
    }

    return {
        tipo: 'propiedad',
        subtipo: 'conmutativa_problema',
        pregunta: problema,
        operacion: `${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        opciones: ['Sí, por la propiedad conmutativa', 'No, da resultados diferentes', 'Solo si son números pares', 'Depende de la operación'],
        correcta: 'Sí, por la propiedad conmutativa',
        explicacion: `Sí, gracias a la propiedad conmutativa de la ${nombreOp}, ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Comparación - ¿Cuál usa conmutativa?
 */
function generarConmutativaComparacion(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 9) + 2;
        b = Math.floor(Math.random() * 9) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 18) + 3;
        b = Math.floor(Math.random() * 18) + 3;
    } else {
        a = Math.floor(Math.random() * 48) + 3;
        b = Math.floor(Math.random() * 48) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';
    const resultado = operacion === 'suma' ? a + b : a * b;

    const opciones = [
        `${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,  // Correcta (conmutativa)
        `(${a} ${simbolo} ${b}) = ${resultado}`,        // Solo cálculo
        `${a} ${simbolo} ${b} = ${resultado}`,          // Resultado directo
        `${a} ${simbolo} (${b} ${simbolo} 1)`          // Otra propiedad
    ];

    return {
        tipo: 'propiedad',
        subtipo: 'conmutativa_comparacion',
        pregunta: `¿Cuál de estas igualdades muestra la propiedad CONMUTATIVA?`,
        operacion: 'Identificar conmutativa',
        opciones: opciones,
        correcta: `${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        explicacion: `La propiedad conmutativa se muestra cuando cambiamos el orden de los números: ${a} ${simbolo} ${b} = ${b} ${simbolo} ${a}`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de propiedad CONMUTATIVA con VARIEDAD
 */
export function generarPropiedadConmutativa(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarConmutativaVerificacion(nivel);
    }

    const tipos = [
        { tipo: 'verificacion', peso: 30 },
        { tipo: 'completar', peso: 25 },
        { tipo: 'identificar', peso: 20 },
        { tipo: 'problema', peso: 15 },
        { tipo: 'comparacion', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'verificacion':
            return generarConmutativaVerificacion(nivel);
        case 'completar':
            return generarConmutativaCompletar(nivel);
        case 'identificar':
            return generarConmutativaIdentificar(nivel);
        case 'problema':
            return generarConmutativaProblema(nivel);
        case 'comparacion':
            return generarConmutativaComparacion(nivel);
        default:
            return generarConmutativaVerificacion(nivel);
    }
}

// ==========================================
// PROPIEDAD ASOCIATIVA CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Verificación directa
 */
function generarAsociativaVerificacion(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        c = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 3;
        b = Math.floor(Math.random() * 13) + 3;
        c = Math.floor(Math.random() * 13) + 3;
    } else {
        a = Math.floor(Math.random() * 28) + 3;
        b = Math.floor(Math.random() * 28) + 3;
        c = Math.floor(Math.random() * 28) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';
    const nombreOp = operacion === 'suma' ? 'suma' : 'multiplicación';

    return {
        tipo: 'propiedad',
        subtipo: 'asociativa_verificacion',
        pregunta: `¿Es cierto que (${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})?`,
        operacion: `(${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})`,
        opciones: ['Sí', 'No'],
        correcta: 'Sí',
        explicacion: `Por la propiedad asociativa de la ${nombreOp}, podemos agrupar los números de diferentes formas sin que cambie el resultado.`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Calcular agrupando
 */
function generarAsociativaCalcular(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        c = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 3;
        b = Math.floor(Math.random() * 13) + 3;
        c = Math.floor(Math.random() * 13) + 3;
    } else {
        a = Math.floor(Math.random() * 28) + 3;
        b = Math.floor(Math.random() * 28) + 3;
        c = Math.floor(Math.random() * 28) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';
    const paso1 = operacion === 'suma' ? b + c : b * c;
    const resultado = operacion === 'suma' ? a + paso1 : a * paso1;

    const opciones = [
        resultado,
        resultado + 1,
        resultado - 1,
        operacion === 'suma' ? a + b + c + 1 : a * b * c + 1
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'propiedad',
        subtipo: 'asociativa_calcular',
        pregunta: `Calcula agrupando primero los dos últimos: ${a} ${simbolo} ${b} ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})`,
        operacion: `${a} ${simbolo} (${b} ${simbolo} ${c})`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: resultado.toString(),
        explicacion: `Primero: ${b} ${simbolo} ${c} = ${paso1}. Luego: ${a} ${simbolo} ${paso1} = ${resultado}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Identificar propiedad
 */
function generarAsociativaIdentificar(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        c = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 3;
        b = Math.floor(Math.random() * 13) + 3;
        c = Math.floor(Math.random() * 13) + 3;
    } else {
        a = Math.floor(Math.random() * 28) + 3;
        b = Math.floor(Math.random() * 28) + 3;
        c = Math.floor(Math.random() * 28) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';

    return {
        tipo: 'propiedad',
        subtipo: 'asociativa_identificar',
        pregunta: `La igualdad (${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c}) usa la propiedad:`,
        operacion: `(${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})`,
        opciones: ['Asociativa', 'Conmutativa', 'Distributiva', 'Elemento neutro'],
        correcta: 'Asociativa',
        explicacion: `Esta igualdad usa la propiedad ASOCIATIVA porque agrupa los números de forma diferente pero el resultado no cambia.`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Problema aplicado
 */
function generarAsociativaProblema(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        c = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 3;
        b = Math.floor(Math.random() * 13) + 3;
        c = Math.floor(Math.random() * 13) + 3;
    } else {
        a = Math.floor(Math.random() * 28) + 3;
        b = Math.floor(Math.random() * 28) + 3;
        c = Math.floor(Math.random() * 28) + 3;
    }

    let problema, simbolo;

    if (operacion === 'suma') {
        simbolo = '+';
        problema = `María tiene ${a} cromos, Ana ${b} y Luis ${c}. ¿Da lo mismo sumar primero (${a} + ${b}) + ${c} que ${a} + (${b} + ${c})?`;
    } else {
        simbolo = '×';
        problema = `Juan tiene ${a} cajas, cada caja tiene ${b} paquetes y cada paquete ${c} galletas. ¿Da lo mismo calcular (${a} × ${b}) × ${c} que ${a} × (${b} × ${c})?`;
    }

    return {
        tipo: 'propiedad',
        subtipo: 'asociativa_problema',
        pregunta: problema,
        operacion: `(${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})`,
        opciones: ['Sí, por la propiedad asociativa', 'No, da resultados diferentes', 'Solo si usamos paréntesis', 'Depende del orden'],
        correcta: 'Sí, por la propiedad asociativa',
        explicacion: `Sí, por la propiedad asociativa podemos agrupar de diferentes formas y el resultado es el mismo.`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Elegir agrupación correcta
 */
function generarAsociativaElegir(nivel = 'medio') {
    const operacion = Math.random() > 0.5 ? 'suma' : 'multiplicacion';

    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 2;
        c = Math.floor(Math.random() * 7) + 2;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 3;
        b = Math.floor(Math.random() * 13) + 3;
        c = Math.floor(Math.random() * 13) + 3;
    } else {
        a = Math.floor(Math.random() * 28) + 3;
        b = Math.floor(Math.random() * 28) + 3;
        c = Math.floor(Math.random() * 28) + 3;
    }

    const simbolo = operacion === 'suma' ? '+' : '×';

    const opciones = [
        `${a} ${simbolo} (${b} ${simbolo} ${c})`,      // Correcta (asociativa)
        `${b} ${simbolo} ${a} ${simbolo} ${c}`,        // Conmutativa
        `(${a} ${simbolo} ${c}) ${simbolo} ${b}`,      // Otra agrupación
        `${a} ${simbolo} ${b}`                         // Incompleta
    ];

    return {
        tipo: 'propiedad',
        subtipo: 'asociativa_elegir',
        pregunta: `¿Cuál es equivalente a (${a} ${simbolo} ${b}) ${simbolo} ${c} por la propiedad ASOCIATIVA?`,
        operacion: `(${a} ${simbolo} ${b}) ${simbolo} ${c}`,
        opciones: opciones,
        correcta: `${a} ${simbolo} (${b} ${simbolo} ${c})`,
        explicacion: `Por la propiedad asociativa: (${a} ${simbolo} ${b}) ${simbolo} ${c} = ${a} ${simbolo} (${b} ${simbolo} ${c})`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de propiedad ASOCIATIVA con VARIEDAD
 */
export function generarPropiedadAsociativa(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarAsociativaVerificacion(nivel);
    }

    const tipos = [
        { tipo: 'verificacion', peso: 30 },
        { tipo: 'calcular', peso: 25 },
        { tipo: 'identificar', peso: 20 },
        { tipo: 'problema', peso: 15 },
        { tipo: 'elegir', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'verificacion':
            return generarAsociativaVerificacion(nivel);
        case 'calcular':
            return generarAsociativaCalcular(nivel);
        case 'identificar':
            return generarAsociativaIdentificar(nivel);
        case 'problema':
            return generarAsociativaProblema(nivel);
        case 'elegir':
            return generarAsociativaElegir(nivel);
        default:
            return generarAsociativaVerificacion(nivel);
    }
}

// ==========================================
// PROPIEDAD DISTRIBUTIVA CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Aplicación directa
 */
function generarDistributivaAplicar(nivel = 'medio') {
    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 1;
        c = Math.floor(Math.random() * 7) + 1;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 2;
        b = Math.floor(Math.random() * 13) + 1;
        c = Math.floor(Math.random() * 13) + 1;
    } else {
        a = Math.floor(Math.random() * 28) + 2;
        b = Math.floor(Math.random() * 28) + 1;
        c = Math.floor(Math.random() * 28) + 1;
    }

    // a × (b + c) = a×b + a×c
    const suma = b + c;
    const resultado = a * suma;
    const opcion1 = a * b;
    const opcion2 = a * c;
    const distribuido = opcion1 + opcion2;

    const opciones = [
        distribuido,
        resultado + a,
        a + b + c,
        a * b * c
    ].filter((v, i, arr) => arr.indexOf(v) === i)
        .sort(() => Math.random() - 0.5);

    return {
        tipo: 'propiedad',
        subtipo: 'distributiva_aplicar',
        pregunta: `Aplica la propiedad distributiva: ${a} × (${b} + ${c}) = ?`,
        operacion: `${a} × (${b} + ${c})`,
        opciones: opciones.slice(0, 4).map(o => o.toString()),
        correcta: distribuido.toString(),
        explicacion: `Por la propiedad distributiva: ${a} × (${b} + ${c}) = (${a} × ${b}) + (${a} × ${c}) = ${opcion1} + ${opcion2} = ${distribuido}`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Forma expandida (completar)
 */
function generarDistributivaExpandir(nivel = 'medio') {
    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 1;
        c = Math.floor(Math.random() * 7) + 1;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 2;
        b = Math.floor(Math.random() * 13) + 1;
        c = Math.floor(Math.random() * 13) + 1;
    } else {
        a = Math.floor(Math.random() * 28) + 2;
        b = Math.floor(Math.random() * 28) + 1;
        c = Math.floor(Math.random() * 28) + 1;
    }

    const opciones = [
        `(${a} × ${b}) + (${a} × ${c})`,    // Correcta
        `${a} × ${b} × ${c}`,                // Error común
        `${a} + ${b} + ${c}`,                // Suma incorrecta
        `(${a} + ${b}) × ${c}`               // Orden incorrecto
    ];

    return {
        tipo: 'propiedad',
        subtipo: 'distributiva_expandir',
        pregunta: `¿Cómo se expande ${a} × (${b} + ${c}) usando la propiedad distributiva?`,
        operacion: `${a} × (${b} + ${c})`,
        opciones: opciones,
        correcta: `(${a} × ${b}) + (${a} × ${c})`,
        explicacion: `La propiedad distributiva dice que ${a} × (${b} + ${c}) = (${a} × ${b}) + (${a} × ${c})`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Identificar propiedad
 */
function generarDistributivaIdentificar(nivel = 'medio') {
    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 1;
        c = Math.floor(Math.random() * 7) + 1;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 2;
        b = Math.floor(Math.random() * 13) + 1;
        c = Math.floor(Math.random() * 13) + 1;
    } else {
        a = Math.floor(Math.random() * 28) + 2;
        b = Math.floor(Math.random() * 28) + 1;
        c = Math.floor(Math.random() * 28) + 1;
    }

    return {
        tipo: 'propiedad',
        subtipo: 'distributiva_identificar',
        pregunta: `La igualdad ${a} × (${b} + ${c}) = (${a} × ${b}) + (${a} × ${c}) usa la propiedad:`,
        operacion: `${a} × (${b} + ${c}) = (${a} × ${b}) + (${a} × ${c})`,
        opciones: ['Distributiva', 'Conmutativa', 'Asociativa', 'Elemento neutro'],
        correcta: 'Distributiva',
        explicacion: `Esta igualdad usa la propiedad DISTRIBUTIVA porque distribuye la multiplicación sobre la suma.`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Problema aplicado
 */
function generarDistributivaProblema(nivel = 'medio') {
    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 1;
        c = Math.floor(Math.random() * 7) + 1;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 2;
        b = Math.floor(Math.random() * 13) + 1;
        c = Math.floor(Math.random() * 13) + 1;
    } else {
        a = Math.floor(Math.random() * 28) + 2;
        b = Math.floor(Math.random() * 28) + 1;
        c = Math.floor(Math.random() * 28) + 1;
    }

    const suma = b + c;
    const resultado = a * suma;

    return {
        tipo: 'propiedad',
        subtipo: 'distributiva_problema',
        pregunta: `En una tienda hay ${a} estantes. En cada estante hay ${b} libros de cuentos y ${c} libros de aventuras. ¿Cuántos libros hay en total?`,
        operacion: `${a} × (${b} + ${c})`,
        opciones: [
            `${resultado} libros`,
            `${a + b + c} libros`,
            `${a * b} libros`,
            `${b + c} libros`
        ],
        correcta: `${resultado} libros`,
        explicacion: `Usamos la distributiva: ${a} × (${b} + ${c}) = ${a} × ${suma} = ${resultado} libros`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Forma inversa (factorizar)
 */
function generarDistributivaFactorizar(nivel = 'medio') {
    let a, b, c;
    if (nivel === 'facil') {
        a = Math.floor(Math.random() * 7) + 2;
        b = Math.floor(Math.random() * 7) + 1;
        c = Math.floor(Math.random() * 7) + 1;
    } else if (nivel === 'medio') {
        a = Math.floor(Math.random() * 13) + 2;
        b = Math.floor(Math.random() * 13) + 1;
        c = Math.floor(Math.random() * 13) + 1;
    } else {
        a = Math.floor(Math.random() * 28) + 2;
        b = Math.floor(Math.random() * 28) + 1;
        c = Math.floor(Math.random() * 28) + 1;
    }

    const opciones = [
        `${a} × (${b} + ${c})`,              // Correcta (factorizada)
        `${a} + ${b} + ${c}`,                // Suma incorrecta
        `${a} × ${b} × ${c}`,                // Multiplicación incorrecta
        `(${a} × ${b}) - (${a} × ${c})`     // Resta incorrecta
    ];

    return {
        tipo: 'propiedad',
        subtipo: 'distributiva_factorizar',
        pregunta: `¿Cómo se escribe (${a} × ${b}) + (${a} × ${c}) de forma FACTORIZADA usando la propiedad distributiva?`,
        operacion: `(${a} × ${b}) + (${a} × ${c})`,
        opciones: opciones,
        correcta: `${a} × (${b} + ${c})`,
        explicacion: `Sacamos factor común ${a}: (${a} × ${b}) + (${a} × ${c}) = ${a} × (${b} + ${c})`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de propiedad DISTRIBUTIVA con VARIEDAD
 */
export function generarPropiedadDistributiva(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarDistributivaAplicar(nivel);
    }

    const tipos = [
        { tipo: 'aplicar', peso: 30 },
        { tipo: 'expandir', peso: 25 },
        { tipo: 'identificar', peso: 20 },
        { tipo: 'problema', peso: 15 },
        { tipo: 'factorizar', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'aplicar':
            return generarDistributivaAplicar(nivel);
        case 'expandir':
            return generarDistributivaExpandir(nivel);
        case 'identificar':
            return generarDistributivaIdentificar(nivel);
        case 'problema':
            return generarDistributivaProblema(nivel);
        case 'factorizar':
            return generarDistributivaFactorizar(nivel);
        default:
            return generarDistributivaAplicar(nivel);
    }
}

// ==========================================
// EXPORTACIONES
// ==========================================

export default {
    generarPropiedadConmutativa,
    generarPropiedadAsociativa,
    generarPropiedadDistributiva
};
