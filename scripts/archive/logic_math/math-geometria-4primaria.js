/**
 * GENERADOR DE GEOMETRÍA (ÁNGULOS) 4º PRIMARIA - CON VARIEDAD
 * Genera ejercicios deterministas (100% precisos) sin usar IA
 * 
 * Temas implementados (CONCEPTUAL - sin imágenes):
 * - Clasificación de ángulos (agudo, recto, obtuso, llano)
 * - Medida de ángulos
 * - Operaciones con ángulos
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
// CLASIFICACIÓN DE ÁNGULOS CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Clasificar por medida
 */
function generarClasificacionPorMedida(nivel = 'facil') {
    const tipos = [
        { nombre: 'agudo', min: 1, max: 89 },
        { nombre: 'recto', medida: 90 },
        { nombre: 'obtuso', min: 91, max: 179 },
        { nombre: 'llano', medida: 180 }
    ];

    let tipoSeleccionado, medida;

    if (nivel === 'facil') {
        // Casos claros
        const tipoSimple = tipos[Math.floor(Math.random() * tipos.length)];
        if (tipoSimple.medida) {
            medida = tipoSimple.medida;
        } else {
            const rangos = tipoSimple.nombre === 'agudo'
                ? [30, 45, 60]
                : [120, 135, 150];
            medida = rangos[Math.floor(Math.random() * rangos.length)];
        }
        tipoSeleccionado = tipoSimple.nombre;
    } else if (nivel === 'medio') {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        if (tipo.medida) {
            medida = tipo.medida;
        } else {
            medida = Math.floor(Math.random() * (tipo.max - tipo.min + 1)) + tipo.min;
        }
        tipoSeleccionado = tipo.nombre;
    } else {
        // Casos límite
        const casos = [
            { tipo: 'agudo', medida: 89 },
            { tipo: 'agudo', medida: 1 },
            { tipo: 'obtuso', medida: 91 },
            { tipo: 'obtuso', medida: 179 }
        ];
        const seleccion = casos[Math.floor(Math.random() * casos.length)];
        medida = seleccion.medida;
        tipoSeleccionado = seleccion.tipo;
    }

    return {
        tipo: 'geometria',
        subtipo: 'clasificacion_por_medida',
        pregunta: `Un ángulo de ${medida}° es un ángulo:`,
        operacion: `Clasificar ${medida}°`,
        opciones: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
        correcta: tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1),
        explicacion: `Un ángulo de ${medida}° es ${tipoSeleccionado} porque ${tipoSeleccionado === 'agudo' ? 'mide menos de 90°' :
                tipoSeleccionado === 'recto' ? 'mide exactamente 90°' :
                    tipoSeleccionado === 'obtuso' ? 'mide entre 90° y 180°' :
                        'mide exactamente 180°'
            }`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Identificar rango
 */
function generarClasificacionRango(nivel = 'facil') {
    const tipos = [
        { nombre: 'agudo', rango: 'entre 0° y 90°' },
        { nombre: 'recto', rango: 'exactamente 90°' },
        { nombre: 'obtuso', rango: 'entre 90° y 180°' },
        { nombre: 'llano', rango: 'exactamente 180°' }
    ];

    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    const opciones = tipos.map(t => t.rango);

    return {
        tipo: 'geometria',
        subtipo: 'clasificacion_rango',
        pregunta: `Un ángulo ${tipo.nombre} mide:`,
        operacion: `Rango de ángulo ${tipo.nombre}`,
        opciones: opciones.sort(() => Math.random() - 0.5),
        correcta: tipo.rango,
        explicacion: `Un ángulo ${tipo.nombre} mide ${tipo.rango}`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Múltiple selección (verdadero/falso)
 */
function generarClasificacionVerdaderoFalso(nivel = 'facil') {
    const afirmaciones = {
        facil: [
            { texto: 'Un ángulo recto mide 90°', correcta: true },
            { texto: 'Un ángulo agudo mide más de 90°', correcta: false },
            { texto: 'Un ángulo llano mide 180°', correcta: true },
            { texto: 'Un ángulo obtuso mide menos de 90°', correcta: false }
        ],
        medio: [
            { texto: 'Un ángulo de 45° es agudo', correcta: true },
            { texto: 'Un ángulo de 100° es obtuso', correcta: true },
            { texto: 'Un ángulo de 90° es agudo', correcta: false },
            { texto: 'Un ángulo llano es mayor que un obtuso', correcta: true }
        ],
        dificil: [
            { texto: 'Un ángulo de 89° es obtuso', correcta: false },
            { texto: 'Un ángulo de 91° es agudo', correcta: false },
            { texto: 'Dos ángulos rectos suman un ángulo llano', correcta: true },
            { texto: 'Un ángulo de 1° es obtuso', correcta: false }
        ]
    };

    const lista = afirmaciones[nivel];
    const afirmacion = lista[Math.floor(Math.random() * lista.length)];

    return {
        tipo: 'geometria',
        subtipo: 'clasificacion_verdadero_falso',
        pregunta: `¿Es VERDADERO o FALSO?: "${afirmacion.texto}"`,
        operacion: 'Verificar afirmación',
        opciones: ['Verdadero', 'Falso'],
        correcta: afirmacion.correcta ? 'Verdadero' : 'Falso',
        explicacion: `Esta afirmación es ${afirmacion.correcta ? 'verdadera' : 'falsa'}`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Comparar ángulos
 */
function generarClasificacionComparar(nivel = 'facil') {
    let angulo1, angulo2, nombre1, nombre2;

    if (nivel === 'facil') {
        const casos = [
            { a1: 45, n1: 'agudo', a2: 90, n2: 'recto' },
            { a1: 90, n1: 'recto', a2: 120, n2: 'obtuso' },
            { a1: 60, n1: 'agudo', a2: 150, n2: 'obtuso' }
        ];
        const caso = casos[Math.floor(Math.random() * casos.length)];
        angulo1 = caso.a1;
        nombre1 = caso.n1;
        angulo2 = caso.a2;
        nombre2 = caso.n2;
    } else if (nivel === 'medio') {
        angulo1 = Math.floor(Math.random() * 170) + 10;
        angulo2 = Math.floor(Math.random() * 170) + 10;
        while (angulo1 === angulo2) angulo2 = Math.floor(Math.random() * 170) + 10;

        nombre1 = angulo1 < 90 ? 'agudo' : angulo1 === 90 ? 'recto' : angulo1 < 180 ? 'obtuso' : 'llano';
        nombre2 = angulo2 < 90 ? 'agudo' : angulo2 === 90 ? 'recto' : angulo2 < 180 ? 'obtuso' : 'llano';
    } else {
        // Casos límite
        const casos = [
            { a1: 89, a2: 91 },
            { a1: 45, a2: 135 },
            { a1: 90, a2: 180 }
        ];
        const caso = casos[Math.floor(Math.random() * casos.length)];
        angulo1 = caso.a1;
        angulo2 = caso.a2;

        nombre1 = angulo1 < 90 ? 'agudo' : angulo1 === 90 ? 'recto' : angulo1 < 180 ? 'obtuso' : 'llano';
        nombre2 = angulo2 < 90 ? 'agudo' : angulo2 === 90 ? 'recto' : angulo2 < 180 ? 'obtuso' : 'llano';
    }

    const mayor = angulo1 > angulo2 ? angulo1 : angulo2;

    return {
        tipo: 'geometria',
        subtipo: 'clasificacion_comparar',
        pregunta: `¿Qué ángulo es MAYOR?: ${angulo1}° o ${angulo2}°`,
        operacion: `${angulo1}° vs ${angulo2}°`,
        opciones: [`${angulo1}°`, `${angulo2}°`, 'Son iguales'],
        correcta: `${mayor}°`,
        explicacion: `${angulo1}° ${angulo1 > angulo2 ? '>' : '<'} ${angulo2}°, por tanto ${mayor}° es mayor`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema contextual
 */
function generarClasificacionProblema(nivel = 'facil') {
    const problemas = {
        facil: [
            {
                pregunta: 'Las manecillas del reloj a las 3 en punto forman un ángulo recto (90°). ¿Qué tipo de ángulo es?',
                correcta: 'Recto',
                explicacion: 'Un ángulo de 90° es un ángulo recto'
            },
            {
                pregunta: 'Una puerta abierta completamente forma un ángulo de 180°. ¿Qué tipo de ángulo es?',
                correcta: 'Llano',
                explicacion: 'Un ángulo de 180° es un ángulo llano'
            },
            {
                pregunta: 'Una esquina de una hoja de papel forma un ángulo de 90°. ¿Qué tipo de ángulo es?',
                correcta: 'Recto',
                explicacion: 'Un ángulo de 90° es un ángulo recto'
            }
        ],
        medio: [
            {
                pregunta: 'Si un ángulo mide 45°, ¿es agudo, recto u obtuso?',
                correcta: 'Agudo',
                explicacion: 'Un ángulo de 45° es agudo porque mide menos de 90°'
            },
            {
                pregunta: 'Las agujas del reloj a las 5 forman un ángulo de aproximadamente 150°. ¿Qué tipo de ángulo es?',
                correcta: 'Obtuso',
                explicacion: 'Un ángulo de 150° es obtuso porque está entre 90° y 180°'
            },
            {
                pregunta: 'Una rampa tiene una inclinación de 30°. ¿Qué tipo de ángulo forma con el suelo?',
                correcta: 'Agudo',
                explicacion: 'Un ángulo de 30° es agudo porque es menor que 90°'
            }
        ],
        dificil: [
            {
                pregunta: 'Si dos líneas perpendiculares se cruzan, ¿qué tipo de ángulo forman?',
                correcta: 'Recto',
                explicacion: 'Líneas perpendiculares forman ángulos de 90° (rectos)'
            },
            {
                pregunta: 'Un ángulo de casi una vuelta completa (179°) es:',
                correcta: 'Obtuso',
                explicacion: 'Un ángulo de 179° es obtuso porque está entre 90° y 180°'
            },
            {
                pregunta: 'Si abres un libro completamente plano, el ángulo entre las páginas es de 180°. ¿Qué tipo es?',
                correcta: 'Llano',
                explicacion: 'Un ángulo de 180° es un ángulo llano'
            }
        ]
    };

    const lista = problemas[nivel];
    const problema = lista[Math.floor(Math.random() * lista.length)];

    return {
        tipo: 'geometria',
        subtipo: 'clasificacion_problema',
        pregunta: problema.pregunta,
        operacion: 'Clasificar ángulo en contexto',
        opciones: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
        correcta: problema.correcta,
        explicacion: problema.explicacion,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de CLASIFICACIÓN DE ÁNGULOS con VARIEDAD
 */
export function generarClasificacionAngulo(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarClasificacionPorMedida(nivel);
    }

    const tipos = [
        { tipo: 'por_medida', peso: 30 },
        { tipo: 'rango', peso: 25 },
        { tipo: 'verdadero_falso', peso: 20 },
        { tipo: 'comparar', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'por_medida':
            return generarClasificacionPorMedida(nivel);
        case 'rango':
            return generarClasificacionRango(nivel);
        case 'verdadero_falso':
            return generarClasificacionVerdaderoFalso(nivel);
        case 'comparar':
            return generarClasificacionComparar(nivel);
        case 'problema':
            return generarClasificacionProblema(nivel);
        default:
            return generarClasificacionPorMedida(nivel);
    }
}

// ==========================================
// MEDIDA DE ÁNGULOS CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Leer medida directa
 */
function generarMedidaDirecta(nivel = 'facil') {
    let medida;

    if (nivel === 'facil') {
        const opciones = [30, 45, 60, 90, 120, 135, 150, 180];
        medida = opciones[Math.floor(Math.random() * opciones.length)];
    } else if (nivel === 'medio') {
        medida = Math.floor(Math.random() * 17) * 10 + 10; // 10, 20, ..., 170
    } else {
        medida = Math.floor(Math.random() * 179) + 1;
    }

    const descripcion = medida < 90 ? 'agudo' : medida === 90 ? 'recto' : medida < 180 ? 'obtuso' : 'llano';

    return {
        tipo: 'geometria',
        subtipo: 'medida_directa',
        pregunta: `Si un ángulo ${descripcion} mide ${medida} grados, ¿cuál es su medida?`,
        operacion: `Leer ${medida}°`,
        opciones: [
            `${medida}°`,
            `${medida + 10}°`,
            `${medida - 10}°`,
            `${180 - medida}°`
        ].filter((v, i, arr) => arr.indexOf(v) === i && parseInt(v) > 0),
        correcta: `${medida}°`,
        explicacion: `El ángulo mide ${medida}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Calcular ángulo complementario
 */
function generarMedidaComplementario(nivel = 'facil') {
    let angulo, complementario;

    if (nivel === 'facil') {
        const opciones = [30, 45, 60];
        angulo = opciones[Math.floor(Math.random() * opciones.length)];
        complementario = 90 - angulo;
    } else if (nivel === 'medio') {
        angulo = Math.floor(Math.random() * 8) * 10 + 10; // 10, 20, ..., 80
        complementario = 90 - angulo;
    } else {
        angulo = Math.floor(Math.random() * 89) + 1;
        complementario = 90 - angulo;
    }

    return {
        tipo: 'geometria',
        subtipo: 'medida_complementario',
        pregunta: `Si un ángulo mide ${angulo}°, ¿cuánto mide su complementario? (Los ángulos complementarios suman 90°)`,
        operacion: `90° - ${angulo}°`,
        opciones: [
            `${complementario}°`,
            `${complementario + 10}°`,
            `${complementario - 10}°`,
            `${180 - angulo}°`
        ].filter((v, i, arr) => arr.indexOf(v) === i && parseInt(v) > 0),
        correcta: `${complementario}°`,
        explicacion: `El complementario de ${angulo}° es 90° - ${angulo}° = ${complementario}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Calcular ángulo suplementario
 */
function generarMedidaSuplementario(nivel = 'facil') {
    let angulo, suplementario;

    if (nivel === 'facil') {
        const opciones = [60, 90, 120];
        angulo = opciones[Math.floor(Math.random() * opciones.length)];
        suplementario = 180 - angulo;
    } else if (nivel === 'medio') {
        angulo = Math.floor(Math.random() * 16) * 10 + 10; // 10, 20, ..., 160
        suplementario = 180 - angulo;
    } else {
        angulo = Math.floor(Math.random() * 179) + 1;
        suplementario = 180 - angulo;
    }

    return {
        tipo: 'geometria',
        subtipo: 'medida_suplementario',
        pregunta: `Si un ángulo mide ${angulo}°, ¿cuánto mide su suplementario? (Los ángulos suplementarios suman 180°)`,
        operacion: `180° - ${angulo}°`,
        opciones: [
            `${suplementario}°`,
            `${suplementario + 10}°`,
            `${suplementario - 10}°`,
            `${90 - angulo}°`
        ].filter((v, i, arr) => arr.indexOf(v) === i && parseInt(v) > 0 && parseInt(v) <= 180),
        correcta: `${suplementario}°`,
        explicacion: `El suplementario de ${angulo}° es 180° - ${angulo}° = ${suplementario}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Estimar medida
 */
function generarMedidaEstimar(nivel = 'medio') {
    const descripciones = [
        { texto: 'un ángulo muy pequeño', rango: '0° y 30°', correcta: '15°' },
        { texto: 'un ángulo de casi un cuarto de vuelta', rango: '60° y 90°', correcta: '75°' },
        { texto: 'un ángulo obtuso grande', rango: '120° y 170°', correcta: '145°' },
        { texto: 'la mitad de un ángulo recto', rango: '40° y 50°', correcta: '45°' }
    ];

    const desc = descripciones[Math.floor(Math.random() * descripciones.length)];

    return {
        tipo: 'geometria',
        subtipo: 'medida_estimar',
        pregunta: `La medida de ${desc.texto} está entre:`,
        operacion: 'Estimar rango',
        opciones: [
            desc.rango,
            '0° y 30°',
            '60° y 90°',
            '120° y 170°'
        ].filter((v, i, arr) => arr.indexOf(v) === i),
        correcta: desc.rango,
        explicacion: `${desc.texto} está entre ${desc.rango}`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Problema de medida
 */
function generarMedidaProblema(nivel = 'facil') {
    const problemas = {
        facil: [
            {
                pregunta: 'Las agujas del reloj a las 3 en punto forman un ángulo recto. ¿Cuántos grados mide?',
                correcta: '90°',
                explicacion: 'Un ángulo recto mide 90°'
            },
            {
                pregunta: 'Una vuelta completa tiene 360°. ¿Cuántos grados tiene media vuelta?',
                correcta: '180°',
                explicacion: 'Media vuelta es 360° ÷ 2 = 180°'
            },
            {
                pregunta: 'Si divides un ángulo recto (90°) en dos partes iguales, ¿cuánto mide cada parte?',
                correcta: '45°',
                explicacion: '90° ÷ 2 = 45°'
            }
        ],
        medio: [
            {
                pregunta: 'Si un triángulo tiene dos ángulos de 60°, ¿cuánto mide el tercer ángulo? (Los ángulos de un triángulo suman 180°)',
                correcta: '60°',
                explicacion: '180° - 60° - 60° = 60°'
            },
            {
                pregunta: 'Tres ángulos iguales suman 180°. ¿Cuánto mide cada uno?',
                correcta: '60°',
                explicacion: '180° ÷ 3 = 60°'
            },
            {
                pregunta: 'Si restas 30° a un ángulo recto, ¿qué medida obtienes?',
                correcta: '60°',
                explicacion: '90° - 30° = 60°'
            }
        ],
        dificil: [
            {
                pregunta: 'Dos ángulos son complementarios. Si uno mide 37°, ¿cuánto mide el otro?',
                correcta: '53°',
                explicacion: '90° - 37° = 53°'
            },
            {
                pregunta: 'Dos ángulos son suplementarios. Si uno mide 125°, ¿cuánto mide el otro?',
                correcta: '55°',
                explicacion: '180° - 125° = 55°'
            },
            {
                pregunta: 'Si sumas un ángulo de 45° con otro de 75°, ¿qué medida obtienes?',
                correcta: '120°',
                explicacion: '45° + 75° = 120°'
            }
        ]
    };

    const lista = problemas[nivel];
    const problema = lista[Math.floor(Math.random() * lista.length)];

    // Generar opciones basadas en la correcta
    const valorCorrecto = parseInt(problema.correcta);
    const opciones = [
        problema.correcta,
        `${valorCorrecto + 10}°`,
        `${valorCorrecto - 10}°`,
        `${valorCorrecto + 20}°`
    ].filter((v, i, arr) => arr.indexOf(v) === i && parseInt(v) > 0);

    return {
        tipo: 'geometria',
        subtipo: 'medida_problema',
        pregunta: problema.pregunta,
        operacion: 'Calcular medida',
        opciones: opciones,
        correcta: problema.correcta,
        explicacion: problema.explicacion,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de MEDIDA DE ÁNGULOS con VARIEDAD
 */
export function generarMedidaAngulo(nivel = 'facil', conVariedad = true) {
    if (!conVariedad) {
        return generarMedidaDirecta(nivel);
    }

    const tipos = [
        { tipo: 'directa', peso: 30 },
        { tipo: 'complementario', peso: 25 },
        { tipo: 'suplementario', peso: 20 },
        { tipo: 'estimar', peso: 15 },
        { tipo: 'problema', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'directa':
            return generarMedidaDirecta(nivel);
        case 'complementario':
            return generarMedidaComplementario(nivel);
        case 'suplementario':
            return generarMedidaSuplementario(nivel);
        case 'estimar':
            return generarMedidaEstimar(nivel);
        case 'problema':
            return generarMedidaProblema(nivel);
        default:
            return generarMedidaDirecta(nivel);
    }
}

// ==========================================
// OPERACIONES CON ÁNGULOS CON VARIEDAD
// ==========================================

/**
 * TIPO 1: Suma de ángulos
 */
function generarOperacionSuma(nivel = 'facil') {
    let angulo1, angulo2, resultado;

    if (nivel === 'facil') {
        const opciones = [30, 45, 60, 90];
        angulo1 = opciones[Math.floor(Math.random() * opciones.length)];
        angulo2 = opciones[Math.floor(Math.random() * opciones.length)];
        resultado = angulo1 + angulo2;
    } else if (nivel === 'medio') {
        angulo1 = Math.floor(Math.random() * 9) * 10 + 10;
        angulo2 = Math.floor(Math.random() * 9) * 10 + 10;
        resultado = angulo1 + angulo2;
    } else {
        angulo1 = Math.floor(Math.random() * 89) + 1;
        angulo2 = Math.floor(Math.random() * 89) + 1;
        resultado = angulo1 + angulo2;
    }

    const opciones = [
        resultado,
        resultado + 10,
        resultado - 10,
        Math.abs(angulo1 - angulo2)
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0);

    return {
        tipo: 'geometria',
        subtipo: 'operacion_suma',
        pregunta: `¿Cuánto es ${angulo1}° + ${angulo2}°?`,
        operacion: `${angulo1}° + ${angulo2}°`,
        opciones: opciones.slice(0, 4).map(o => `${o}°`),
        correcta: `${resultado}°`,
        explicacion: `${angulo1}° + ${angulo2}° = ${resultado}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 2: Resta de ángulos
 */
function generarOperacionResta(nivel = 'facil') {
    let angulo1, angulo2, resultado;

    if (nivel === 'facil') {
        const opciones = [90, 120, 150, 180];
        angulo1 = opciones[Math.floor(Math.random() * opciones.length)];
        angulo2 = Math.floor(Math.random() * (angulo1 / 2)) + 20;
        resultado = angulo1 - angulo2;
    } else if (nivel === 'medio') {
        angulo1 = Math.floor(Math.random() * 16) * 10 + 30;
        angulo2 = Math.floor(Math.random() * Math.floor(angulo1 / 10)) * 10 + 10;
        resultado = angulo1 - angulo2;
    } else {
        angulo1 = Math.floor(Math.random() * 170) + 10;
        angulo2 = Math.floor(Math.random() * angulo1) + 1;
        resultado = angulo1 - angulo2;
    }

    const opciones = [
        resultado,
        resultado + 10,
        resultado - 10,
        angulo1 + angulo2
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0);

    return {
        tipo: 'geometria',
        subtipo: 'operacion_resta',
        pregunta: `¿Cuánto es ${angulo1}° - ${angulo2}°?`,
        operacion: `${angulo1}° - ${angulo2}°`,
        opciones: opciones.slice(0, 4).map(o => `${o}°`),
        correcta: `${resultado}°`,
        explicacion: `${angulo1}° - ${angulo2}° = ${resultado}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 3: Ángulos en un triángulo
 */
function generarOperacionTriangulo(nivel = 'medio') {
    let angulo1, angulo2, angulo3;

    if (nivel === 'facil' || nivel === 'medio') {
        const opciones = [[60, 60, 60], [90, 45, 45], [90, 60, 30], [70, 70, 40]];
        const seleccion = opciones[Math.floor(Math.random() * opciones.length)];
        [angulo1, angulo2, angulo3] = seleccion;
    } else {
        angulo1 = Math.floor(Math.random() * 80) + 20;
        angulo2 = Math.floor(Math.random() * (160 - angulo1)) + 10;
        angulo3 = 180 - angulo1 - angulo2;
    }

    // Preguntar por uno de los ángulos
    const preguntarPor = Math.floor(Math.random() * 3);
    let anguloDesconocido, angulo2Conocido, angulo3Conocido;

    if (preguntarPor === 0) {
        anguloDesconocido = angulo1;
        angulo2Conocido = angulo2;
        angulo3Conocido = angulo3;
    } else if (preguntarPor === 1) {
        anguloDesconocido = angulo2;
        angulo2Conocido = angulo1;
        angulo3Conocido = angulo3;
    } else {
        anguloDesconocido = angulo3;
        angulo2Conocido = angulo1;
        angulo3Conocido = angulo2;
    }

    const opciones = [
        anguloDesconocido,
        anguloDesconocido + 10,
        anguloDesconocido - 10,
        90
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0);

    return {
        tipo: 'geometria',
        subtipo: 'operacion_triangulo',
        pregunta: `En un triángulo, dos ángulos miden ${angulo2Conocido}° y ${angulo3Conocido}°. ¿Cuánto mide el tercer ángulo? (Los ángulos de un triángulo suman 180°)`,
        operacion: `180° - ${angulo2Conocido}° - ${angulo3Conocido}°`,
        opciones: opciones.slice(0, 4).map(o => `${o}°`),
        correcta: `${anguloDesconocido}°`,
        explicacion: `180° - ${angulo2Conocido}° - ${angulo3Conocido}° = ${anguloDesconocido}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 4: Doble de un ángulo
 */
function generarOperacionDoble(nivel = 'facil') {
    let angulo, doble;

    if (nivel === 'facil') {
        const opciones = [30, 45, 60, 90];
        angulo = opciones[Math.floor(Math.random() * opciones.length)];
        doble = angulo * 2;
    } else if (nivel === 'medio') {
        angulo = Math.floor(Math.random() * 9) * 10 + 10;
        doble = angulo * 2;
    } else {
        angulo = Math.floor(Math.random() * 89) + 1;
        doble = angulo * 2;
    }

    const opciones = [
        doble,
        doble + 10,
        doble - 10,
        angulo + 10
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0);

    return {
        tipo: 'geometria',
        subtipo: 'operacion_doble',
        pregunta: `¿Cuánto mide el DOBLE de un ángulo de ${angulo}°?`,
        operacion: `${angulo}° × 2`,
        opciones: opciones.slice(0, 4).map(o => `${o}°`),
        correcta: `${doble}°`,
        explicacion: `${angulo}° × 2 = ${doble}°`,
        dificultad: nivel
    };
}

/**
 * TIPO 5: Mitad de un ángulo
 */
function generarOperacionMitad(nivel = 'facil') {
    let angulo, mitad;

    if (nivel === 'facil') {
        const opciones = [60, 90, 120, 180];
        angulo = opciones[Math.floor(Math.random() * opciones.length)];
        mitad = angulo / 2;
    } else if (nivel === 'medio') {
        angulo = Math.floor(Math.random() * 9) * 20 + 20; // 20, 40, 60, ..., 180
        mitad = angulo / 2;
    } else {
        angulo = Math.floor(Math.random() * 89) * 2 + 2; // Par
        mitad = angulo / 2;
    }

    const opciones = [
        mitad,
        mitad + 10,
        mitad - 10,
        angulo - 10
    ].filter((v, i, arr) => arr.indexOf(v) === i && v > 0);

    return {
        tipo: 'geometria',
        subtipo: 'operacion_mitad',
        pregunta: `¿Cuánto mide la MITAD de un ángulo de ${angulo}°?`,
        operacion: `${angulo}° ÷ 2`,
        opciones: opciones.slice(0, 4).map(o => `${o}°`),
        correcta: `${mitad}°`,
        explicacion: `${angulo}° ÷ 2 = ${mitad}°`,
        dificultad: nivel
    };
}

/**
 * Genera ejercicio de OPERACIONES CON ÁNGULOS con VARIEDAD
 */
export function generarOperacionAngulo(nivel = 'medio', conVariedad = true) {
    if (!conVariedad) {
        return generarOperacionSuma(nivel);
    }

    const tipos = [
        { tipo: 'suma', peso: 30 },
        { tipo: 'resta', peso: 25 },
        { tipo: 'triangulo', peso: 20 },
        { tipo: 'doble', peso: 15 },
        { tipo: 'mitad', peso: 10 }
    ];

    const tipoElegido = elegirPorPeso(tipos);

    switch (tipoElegido) {
        case 'suma':
            return generarOperacionSuma(nivel);
        case 'resta':
            return generarOperacionResta(nivel);
        case 'triangulo':
            return generarOperacionTriangulo(nivel);
        case 'doble':
            return generarOperacionDoble(nivel);
        case 'mitad':
            return generarOperacionMitad(nivel);
        default:
            return generarOperacionSuma(nivel);
    }
}

// ==========================================
// EXPORTACIONES
// ==========================================

export default {
    generarClasificacionAngulo,
    generarMedidaAngulo,
    generarOperacionAngulo
};
