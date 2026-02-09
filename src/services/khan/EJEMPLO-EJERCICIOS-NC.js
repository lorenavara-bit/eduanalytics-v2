// EJEMPLO: EJERCICIOS CON LICENCIA NO COMERCIAL (NC)
// Estos ejercicios NO se mostrarán en la versión comercial de la webapp

export const EJERCICIOS_EJEMPLO_NC = {
    'Ciencias Sociales': {
        'Historia de España - Material Educativo': {
            source: 'Recurso Educativo Libre',
            nivel: '4º Primaria',
            licencia: 'CC-BY-NC', // ❌ NO COMERCIAL - Se filtrará en webapp comercial
            ejercicios: [
                {
                    tipo: 'Concepto',
                    ejercicio: '¿Quién descubrió América?',
                    respuesta: 'Cristóbal Colón en 1492',
                    explicacion: 'Este recurso tiene licencia Creative Commons No Comercial',
                    licencia: 'CC-BY-NC'
                },
                {
                    tipo: 'Concepto',
                    ejercicio: '¿Cuál fue la primera civilización de la Península Ibérica?',
                    respuesta: 'Los íberos y celtas',
                    explicacion: 'Material educativo con restricciones comerciales',
                    licencia: 'CC-BY-NC-SA'
                }
            ]
        },

        'Geografía - Material Libre': {
            source: 'OpenEdu',
            nivel: '4º Primaria',
            licencia: 'EDUCATIONAL', // ❌ Solo uso educativo no comercial
            ejercicios: [
                {
                    tipo: 'Concepto',
                    ejercicio: '¿Cuál es el río más largo de España?',
                    respuesta: 'El río Tajo',
                    explicacion: 'Contenido exclusivo para uso educativo',
                    licencia: 'EDUCATIONAL'
                }
            ]
        }
    },

    'Matemáticas': {
        'Fracciones - Recurso Educativo': {
            source: 'Matemáticas Libres',
            nivel: '4º Primaria',
            licencia: 'CC-BY-NC-ND', // ❌ NO comercial, NO modificaciones
            ejercicios: [
                {
                    tipo: 'Cálculo',
                    ejercicio: '¿Cuánto es 1/2 + 1/4?',
                    respuesta: '3/4',
                    explicacion: 'Recurso con licencia NC',
                    licencia: 'CC-BY-NC-ND'
                }
            ]
        }
    }
};

export default EJERCICIOS_EJEMPLO_NC;
