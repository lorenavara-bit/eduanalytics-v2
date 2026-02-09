/**
 * INTEGRACIÓN COMPLETA - GENERADOR DE MATEMÁTICAS 4º PRIMARIA
 * 
 * Este archivo integra TODOS los generadores de matemáticas en un sistema unificado.
 * Permite generar fichas completas con cualquier combinación de temas.
 * 
 * Módulos integrados:
 * - Operaciones básicas (suma, resta, multiplicación, división)
 * - Propiedades matemáticas (conmutativa, asociativa, distributiva)
 * - Medidas (longitud, tiempo)
 * - Números decimales (suma, resta, comparación, redondeo)
 * - Geometría (ángulos)
 * - Fracciones, operaciones combinadas, problemas
 */

// ==========================================
// IMPORTACIONES DE MÓDULOS
// ==========================================

// Operaciones básicas
import {
    generarSuma,
    generarResta,
    generarMultiplicacion,
    generarDivision,
    generarFraccion,
    generarOperacionCombinada,
    generarProblema
} from './math-generator-4primaria.js';

// Propiedades matemáticas
import {
    generarPropiedadConmutativa,
    generarPropiedadAsociativa,
    generarPropiedadDistributiva
} from './math-propiedades-4primaria.js';

// Medidas
import {
    generarMedidaLongitud,
    generarMedidaTiempo
} from './math-medidas-4primaria.js';

// Decimales
import {
    generarSumaDecimal,
    generarRestaDecimal,
    generarComparacionDecimal,
    generarRedondeoDecimal
} from './math-decimales-4primaria.js';

// Geometría
import {
    generarClasificacionAngulo,
    generarMedidaAngulo,
    generarOperacionAngulo
} from './math-geometria-4primaria.js';

// ==========================================
// CATÁLOGO DE GENERADORES
// ==========================================

const GENERADORES = {
    // Operaciones básicas
    'suma': generarSuma,
    'resta': generarResta,
    'multiplicacion': generarMultiplicacion,
    'division': generarDivision,

    // Fracciones, combinadas y problemas
    'fraccion': generarFraccion,
    'combinada': generarOperacionCombinada,
    'problema': generarProblema,

    // Propiedades
    'propiedad_conmutativa': generarPropiedadConmutativa,
    'propiedad_asociativa': generarPropiedadAsociativa,
    'propiedad_distributiva': generarPropiedadDistributiva,

    // Medidas
    'medida_longitud': generarMedidaLongitud,
    'medida_tiempo': generarMedidaTiempo,

    // Decimales
    'suma_decimal': generarSumaDecimal,
    'resta_decimal': generarRestaDecimal,
    'comparacion_decimal': generarComparacionDecimal,
    'redondeo_decimal': generarRedondeoDecimal,

    // Geometría
    'clasificacion_angulo': generarClasificacionAngulo,
    'medida_angulo': generarMedidaAngulo,
    'operacion_angulo': generarOperacionAngulo
};

// ==========================================
// CONFIGURACIONES PREDEFINIDAS
// ==========================================

const CONFIGURACIONES_PREDEFINIDAS = {
    // Configuración completa (todos los temas)
    'completa': {
        nombre: 'Ficha Completa',
        descripcion: 'Incluye todos los temas del currículo LOMLOE 4º Primaria',
        tipos: Object.keys(GENERADORES),
        dificultad: 'medio',
        variedad: true
    },

    // Solo operaciones básicas
    'operaciones_basicas': {
        nombre: 'Operaciones Básicas',
        descripcion: 'Suma, resta, multiplicación y división',
        tipos: ['suma', 'resta', 'multiplicacion', 'division'],
        dificultad: 'medio',
        variedad: true
    },

    // Propiedades matemáticas
    'propiedades': {
        nombre: 'Propiedades Matemáticas',
        descripcion: 'Conmutativa, asociativa y distributiva',
        tipos: ['propiedad_conmutativa', 'propiedad_asociativa', 'propiedad_distributiva'],
        dificultad: 'medio',
        variedad: true
    },

    // Medidas
    'medidas': {
        nombre: 'Medidas',
        descripcion: 'Longitud y tiempo',
        tipos: ['medida_longitud', 'medida_tiempo'],
        dificultad: 'medio',
        variedad: true
    },

    // Decimales
    'decimales': {
        nombre: 'Números Decimales',
        descripcion: 'Operaciones y comparación de decimales',
        tipos: ['suma_decimal', 'resta_decimal', 'comparacion_decimal', 'redondeo_decimal'],
        dificultad: 'facil',
        variedad: true
    },

    // Geometría
    'geometria': {
        nombre: 'Geometría (Ángulos)',
        descripcion: 'Clasificación, medida y operaciones con ángulos',
        tipos: ['clasificacion_angulo', 'medida_angulo', 'operacion_angulo'],
        dificultad: 'facil',
        variedad: true
    },

    // Repaso general
    'repaso': {
        nombre: 'Repaso General',
        descripcion: 'Selección equilibrada de todos los temas',
        tipos: [
            'suma', 'resta', 'multiplicacion', 'division',
            'fraccion', 'combinada', 'problema',
            'propiedad_conmutativa',
            'medida_longitud',
            'suma_decimal',
            'clasificacion_angulo'
        ],
        dificultad: 'medio',
        variedad: true
    },

    // Nivel fácil
    'nivel_facil': {
        nombre: 'Nivel Fácil',
        descripcion: 'Ejercicios básicos para comenzar',
        tipos: [
            'suma', 'resta', 'multiplicacion', 'division',
            'fraccion', 'medida_longitud', 'clasificacion_angulo'
        ],
        dificultad: 'facil',
        variedad: true
    },

    // Nivel difícil
    'nivel_dificil': {
        nombre: 'Nivel Difícil',
        descripcion: 'Ejercicios avanzados de 4º Primaria',
        tipos: [
            'division', 'combinada', 'problema',
            'propiedad_distributiva',
            'suma_decimal', 'resta_decimal',
            'operacion_angulo'
        ],
        dificultad: 'dificil',
        variedad: true
    }
};

// ==========================================
// FUNCIÓN PRINCIPAL DE INTEGRACIÓN
// ==========================================

/**
 * Genera una ficha completa de matemáticas con múltiples temas
 * 
 * @param {Object} config - Configuración de la ficha
 * @param {number} config.numPreguntas - Número de preguntas (por defecto 10)
 * @param {string[]} config.tipos - Array de tipos de ejercicios a incluir
 * @param {string} config.dificultad - Nivel: 'facil', 'medio', 'dificil'
 * @param {boolean} config.variedad - Usar variedad en los ejercicios (por defecto true)
 * @param {string} config.configuracion - Nombre de configuración predefinida (opcional)
 * @param {Object} config.distribucion - Distribución personalizada de tipos (opcional)
 * 
 * @returns {Object} Ficha completa con ejercicios
 */
export function generarFichaMatematicasCompleta(config = {}) {
    // Si se especifica una configuración predefinida, usarla
    if (config.configuracion && CONFIGURACIONES_PREDEFINIDAS[config.configuracion]) {
        const preconf = CONFIGURACIONES_PREDEFINIDAS[config.configuracion];
        config = {
            ...preconf,
            ...config, // Permitir sobrescribir valores
            nombre: preconf.nombre,
            descripcion: preconf.descripcion
        };
    }

    const {
        numPreguntas = 10,
        tipos = ['suma', 'resta', 'multiplicacion', 'division'],
        dificultad = 'medio',
        variedad = true,
        distribucion = null // Distribución personalizada (opcional)
    } = config;

    const ejercicios = [];

    // Validar que los tipos existen
    const tiposValidos = tipos.filter(tipo => GENERADORES[tipo]);
    if (tiposValidos.length === 0) {
        throw new Error('No se especificaron tipos válidos de ejercicios');
    }

    // Generar ejercicios
    for (let i = 0; i < numPreguntas; i++) {
        let tipo;

        // Si hay distribución personalizada, usarla
        if (distribucion) {
            tipo = elegirPorDistribucion(distribucion);
        } else {
            // Selección aleatoria equitativa
            tipo = tiposValidos[Math.floor(Math.random() * tiposValidos.length)];
        }

        const generador = GENERADORES[tipo];

        if (!generador) {
            console.warn(`Generador no encontrado para tipo: ${tipo}`);
            continue;
        }

        try {
            const ejercicio = generador(dificultad, variedad);
            ejercicios.push({
                id: `mat_${i + 1}`,
                tema: tipo,
                ...ejercicio
            });
        } catch (error) {
            console.error(`Error generando ejercicio de tipo ${tipo}:`, error);
        }
    }

    return {
        titulo: config.nombre || `Matemáticas 4º Primaria - ${dificultad.charAt(0).toUpperCase() + dificultad.slice(1)}`,
        descripcion: config.descripcion || 'Ficha de ejercicios variados',
        asignatura: 'Matemáticas',
        curso: '4º Primaria',
        ejercicios: ejercicios,
        generadoPor: 'Sistema determinista integrado (100% fiable)',
        metadatos: {
            variedad: variedad,
            numTemas: tiposValidos.length,
            temas: tiposValidos,
            dificultad: dificultad,
            totalEjercicios: ejercicios.length
        },
        fecha: new Date().toISOString()
    };
}

/**
 * Función auxiliar para elegir según distribución personalizada
 */
function elegirPorDistribucion(distribucion) {
    const pool = [];
    Object.entries(distribucion).forEach(([tipo, peso]) => {
        for (let i = 0; i < peso; i++) {
            pool.push(tipo);
        }
    });
    return pool[Math.floor(Math.random() * pool.length)];
}

// ==========================================
// FUNCIONES DE UTILIDAD
// ==========================================

/**
 * Obtiene la lista de todos los tipos de ejercicios disponibles
 */
export function obtenerTiposDisponibles() {
    return Object.keys(GENERADORES).map(key => ({
        id: key,
        nombre: formatearNombreTipo(key),
        categoria: obtenerCategoria(key)
    }));
}

/**
 * Obtiene las configuraciones predefinidas disponibles
 */
export function obtenerConfiguracionesPredefinidas() {
    return Object.entries(CONFIGURACIONES_PREDEFINIDAS).map(([key, config]) => ({
        id: key,
        ...config
    }));
}

/**
 * Genera un ejercicio individual de un tipo específico
 */
export function generarEjercicioIndividual(tipo, dificultad = 'medio', variedad = true) {
    const generador = GENERADORES[tipo];
    if (!generador) {
        throw new Error(`Tipo de ejercicio no encontrado: ${tipo}`);
    }
    return generador(dificultad, variedad);
}

/**
 * Valida una configuración antes de generar la ficha
 */
export function validarConfiguracion(config) {
    const errores = [];

    if (config.numPreguntas && (config.numPreguntas < 1 || config.numPreguntas > 100)) {
        errores.push('numPreguntas debe estar entre 1 y 100');
    }

    if (config.dificultad && !['facil', 'medio', 'dificil'].includes(config.dificultad)) {
        errores.push('dificultad debe ser: facil, medio o dificil');
    }

    if (config.tipos) {
        const tiposInvalidos = config.tipos.filter(t => !GENERADORES[t]);
        if (tiposInvalidos.length > 0) {
            errores.push(`Tipos inválidos: ${tiposInvalidos.join(', ')}`);
        }
    }

    return {
        valida: errores.length === 0,
        errores: errores
    };
}

/**
 * Función auxiliar: Formatear nombre de tipo
 */
function formatearNombreTipo(tipo) {
    const nombres = {
        'suma': 'Suma',
        'resta': 'Resta',
        'multiplicacion': 'Multiplicación',
        'division': 'División',
        'fraccion': 'Fracciones',
        'combinada': 'Operaciones Combinadas',
        'problema': 'Problemas',
        'propiedad_conmutativa': 'Propiedad Conmutativa',
        'propiedad_asociativa': 'Propiedad Asociativa',
        'propiedad_distributiva': 'Propiedad Distributiva',
        'medida_longitud': 'Medidas de Longitud',
        'medida_tiempo': 'Medidas de Tiempo',
        'suma_decimal': 'Suma de Decimales',
        'resta_decimal': 'Resta de Decimales',
        'comparacion_decimal': 'Comparación de Decimales',
        'redondeo_decimal': 'Redondeo de Decimales',
        'clasificacion_angulo': 'Clasificación de Ángulos',
        'medida_angulo': 'Medida de Ángulos',
        'operacion_angulo': 'Operaciones con Ángulos'
    };
    return nombres[tipo] || tipo;
}

/**
 * Función auxiliar: Obtener categoría del tipo
 */
function obtenerCategoria(tipo) {
    if (['suma', 'resta', 'multiplicacion', 'division'].includes(tipo)) {
        return 'Operaciones Básicas';
    }
    if (tipo.startsWith('propiedad_')) {
        return 'Propiedades Matemáticas';
    }
    if (tipo.startsWith('medida_')) {
        return 'Medidas';
    }
    if (tipo.includes('decimal')) {
        return 'Números Decimales';
    }
    if (tipo.includes('angulo')) {
        return 'Geometría';
    }
    if (['fraccion', 'combinada', 'problema'].includes(tipo)) {
        return 'Avanzadas';
    }
    return 'Otros';
}

// ==========================================
// EXPORTACIONES
// ==========================================

export default {
    // Función principal
    generarFichaMatematicasCompleta,

    // Utilidades
    obtenerTiposDisponibles,
    obtenerConfiguracionesPredefinidas,
    generarEjercicioIndividual,
    validarConfiguracion,

    // Generadores individuales (re-exportados para conveniencia)
    generadores: GENERADORES,

    // Configuraciones
    configuraciones: CONFIGURACIONES_PREDEFINIDAS
};

// ==========================================
// EJEMPLOS DE USO
// ==========================================

/*
// Ejemplo 1: Ficha con configuración predefinida
const ficha1 = generarFichaMatematicasCompleta({
    configuracion: 'completa',
    numPreguntas: 15
});

// Ejemplo 2: Ficha personalizada
const ficha2 = generarFichaMatematicasCompleta({
    numPreguntas: 20,
    tipos: ['suma', 'resta', 'multiplicacion', 'propiedad_conmutativa'],
    dificultad: 'medio',
    variedad: true
});

// Ejemplo 3: Ficha con distribución personalizada
const ficha3 = generarFichaMatematicasCompleta({
    numPreguntas: 10,
    tipos: ['suma', 'resta', 'fraccion'],
    dificultad: 'facil',
    distribucion: {
        'suma': 40,        // 40% sumas
        'resta': 40,       // 40% restas
        'fraccion': 20     // 20% fracciones
    }
});

// Ejemplo 4: Ejercicio individual
const ejercicio = generarEjercicioIndividual('suma_decimal', 'medio', true);

// Ejemplo 5: Validar configuración
const validacion = validarConfiguracion({
    numPreguntas: 15,
    tipos: ['suma', 'resta'],
    dificultad: 'medio'
});
console.log(validacion); // { valida: true, errores: [] }

// Ejemplo 6: Obtener tipos disponibles
const tipos = obtenerTiposDisponibles();
console.log(tipos);
// [
//   { id: 'suma', nombre: 'Suma', categoria: 'Operaciones Básicas' },
//   { id: 'resta', nombre: 'Resta', categoria: 'Operaciones Básicas' },
//   ...
// ]
*/
