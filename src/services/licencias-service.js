// Filtra contenido según sus restricciones de licencia

import { getEnv } from '../utils/appEnv';

/**
 * TIPOS DE LICENCIA SOPORTADOS
 */
export const TIPOS_LICENCIA = {
    // Creative Commons
    'CC-BY': {
        nombre: 'Creative Commons Attribution',
        comercial: true,
        descripcion: 'Permitido uso comercial con atribución'
    },
    'CC-BY-SA': {
        nombre: 'Creative Commons Attribution-ShareAlike',
        comercial: true,
        descripcion: 'Permitido uso comercial con atribución y compartir igual'
    },
    'CC-BY-NC': {
        nombre: 'Creative Commons Attribution-NonCommercial',
        comercial: false,
        descripcion: 'NO permitido uso comercial'
    },
    'CC-BY-NC-SA': {
        nombre: 'Creative Commons Attribution-NonCommercial-ShareAlike',
        comercial: false,
        descripcion: 'NO permitido uso comercial, compartir igual'
    },
    'CC-BY-ND': {
        nombre: 'Creative Commons Attribution-NoDerivatives',
        comercial: true,
        descripcion: 'Permitido uso comercial sin modificaciones'
    },
    'CC-BY-NC-ND': {
        nombre: 'Creative Commons Attribution-NonCommercial-NoDerivatives',
        comercial: false,
        descripcion: 'NO permitido uso comercial ni modificaciones'
    },
    'CC0': {
        nombre: 'Creative Commons Zero - Dominio Público',
        comercial: true,
        descripcion: 'Dominio público, sin restricciones'
    },

    // Licencias educativas
    'EDUCATIONAL': {
        nombre: 'Solo Uso Educativo',
        comercial: false,
        descripcion: 'Solo para uso educativo no comercial'
    },
    'CUSTOM': {
        nombre: 'Licencia Personalizada',
        comercial: null, // Depende de los términos específicos
        descripcion: 'Verificar términos específicos'
    },
    'PROPRIETARY': {
        nombre: 'Contenido Propietario',
        comercial: true,
        descripcion: 'Contenido propio, todos los derechos reservados'
    }
};

/**
 * CONFIGURACIÓN DEL ENTORNO
 */
const ENTORNO_COMERCIAL = getEnv('VITE_COMMERCIAL') === 'true' ||
    getEnv('REACT_APP_COMMERCIAL') === 'true' ||
    getEnv('PROD');

/**
 * Verificar si una licencia permite uso comercial
 */
export function esLicenciaComercial(licencia) {
    if (!licencia) {
        // Sin licencia especificada = contenido propietario = permitido
        return true;
    }

    // Normalizar licencia
    const licenciaNormalizada = licencia.toUpperCase().trim();

    // Si contiene 'NC' (No Comercial) → NO permitido
    if (licenciaNormalizada.includes('NC') ||
        licenciaNormalizada.includes('NON-COMMERCIAL') ||
        licenciaNormalizada.includes('NONCOMMERCIAL')) {
        return false;
    }

    // Verificar en tipos conocidos
    const tipo = TIPOS_LICENCIA[licenciaNormalizada];
    if (tipo) {
        return tipo.comercial !== false;
    }

    // Si contiene 'EDUCATIONAL' → NO permitido en comercial
    if (licenciaNormalizada.includes('EDUCATIONAL') ||
        licenciaNormalizada.includes('EDUCATIVO')) {
        return false;
    }

    // Por defecto, permitir (asumiendo contenido propietario)
    return true;
}

/**
 * Filtrar ejercicios según licencia
 */
export function filtrarPorLicencia(ejercicios, modoComercial = ENTORNO_COMERCIAL) {
    if (!modoComercial) {
        // En modo no comercial (educativo), permitir todo
        console.log('🎓 Modo educativo: mostrando todo el contenido');
        return ejercicios;
    }

    if (!Array.isArray(ejercicios)) {
        return ejercicios;
    }

    const filtrados = ejercicios.filter(ejercicio => {
        const licencia = ejercicio.licencia || ejercicio.license;

        if (!licencia) {
            // Sin licencia = contenido propietario = permitido
            return true;
        }

        const permitido = esLicenciaComercial(licencia);

        if (!permitido) {
            console.log(`⚠️ Ejercicio filtrado por licencia ${licencia}: "${ejercicio.ejercicio || ejercicio.pregunta}"`);
        }

        return permitido;
    });

    const filtradosCount = ejercicios.length - filtrados.length;
    if (filtradosCount > 0) {
        console.log(`🔒 ${filtradosCount} ejercicio(s) filtrado(s) por restricciones de licencia`);
    }

    return filtrados;
}

/**
 * Filtrar un objeto completo de ejercicios por tema
 */
export function filtrarEjerciciosPorTema(ejerciciosPorTema, modoComercial = ENTORNO_COMERCIAL) {
    if (!modoComercial) {
        return ejerciciosPorTema;
    }

    const resultado = {};

    Object.keys(ejerciciosPorTema).forEach(tema => {
        const ejercicios = ejerciciosPorTema[tema];

        if (Array.isArray(ejercicios)) {
            resultado[tema] = filtrarPorLicencia(ejercicios, modoComercial);
        } else if (ejercicios && typeof ejercicios === 'object') {
            // Si es un objeto con estructura más compleja
            resultado[tema] = {
                ...ejercicios,
                ejercicios: filtrarPorLicencia(ejercicios.ejercicios || [], modoComercial)
            };
        } else {
            resultado[tema] = ejercicios;
        }
    });

    return resultado;
}

/**
 * Añadir información de licencia a ejercicios
 */
export function agregarInfoLicencia(ejercicio) {
    const licencia = ejercicio.licencia || ejercicio.license;

    if (!licencia) {
        return ejercicio;
    }

    const licenciaNormalizada = licencia.toUpperCase().trim();
    const tipoLicencia = TIPOS_LICENCIA[licenciaNormalizada];

    return {
        ...ejercicio,
        licenciaInfo: {
            codigo: licencia,
            nombre: tipoLicencia?.nombre || licencia,
            comercial: tipoLicencia?.comercial ?? esLicenciaComercial(licencia),
            descripcion: tipoLicencia?.descripcion || 'Verificar términos de la licencia'
        }
    };
}

/**
 * Verificar si el entorno actual es comercial
 */
export function esEntornoComercial() {
    return ENTORNO_COMERCIAL;
}

/**
 * Obtener estadísticas de licencias en un conjunto de ejercicios
 */
export function obtenerEstadisticasLicencias(ejercicios) {
    const stats = {
        total: ejercicios.length,
        sinLicencia: 0,
        comercialPermitido: 0,
        comercialRestringido: 0,
        porTipo: {}
    };

    ejercicios.forEach(ejercicio => {
        const licencia = ejercicio.licencia || ejercicio.license;

        if (!licencia) {
            stats.sinLicencia++;
            stats.comercialPermitido++;
        } else {
            const licenciaNorm = licencia.toUpperCase().trim();

            if (esLicenciaComercial(licencia)) {
                stats.comercialPermitido++;
            } else {
                stats.comercialRestringido++;
            }

            stats.porTipo[licenciaNorm] = (stats.porTipo[licenciaNorm] || 0) + 1;
        }
    });

    return stats;
}

/**
 * Generar reporte de licencias
 */
export function generarReporteLicencias(ejercicios) {
    const stats = obtenerEstadisticasLicencias(ejercicios);

    console.log('📊 REPORTE DE LICENCIAS:');
    console.log(`   Total ejercicios: ${stats.total}`);
    console.log(`   ✅ Comercial permitido: ${stats.comercialPermitido}`);
    console.log(`   🔒 Comercial restringido: ${stats.comercialRestringido}`);
    console.log(`   ⚠️ Sin licencia especificada: ${stats.sinLicencia}`);

    if (Object.keys(stats.porTipo).length > 0) {
        console.log('   Desglose por tipo:');
        Object.entries(stats.porTipo).forEach(([tipo, count]) => {
            console.log(`      - ${tipo}: ${count}`);
        });
    }

    return stats;
}

export default {
    TIPOS_LICENCIA,
    esLicenciaComercial,
    filtrarPorLicencia,
    filtrarEjerciciosPorTema,
    agregarInfoLicencia,
    esEntornoComercial,
    obtenerEstadisticasLicencias,
    generarReporteLicencias
};
