// INTEF Content Integration Configuration
// Material educativo oficial del Ministerio de Educación de España

export const INTEF_CONFIG = {
    // URLs principales de recursos INTEF
    sources: {
        procomun: {
            base_url: 'https://procomun.intef.es',
            search_url: 'https://procomun.intef.es/buscador',
            api_url: 'https://procomun.intef.es/api/v1', // Si existe
            description: 'Repositorio de recursos educativos abiertos'
        },
        cedec: {
            base_url: 'https://cedec.intef.es',
            description: 'Centro de Desarrollo Curricular'
        },
        recursos_tic: {
            base_url: 'https://intef.es/recursos-educativos',
            description: 'Recursos TIC del INTEF'
        }
    },

    // Mapeo de asignaturas LOMLOE a categorías INTEF
    subject_mapping: {
        'Matemáticas': {
            intef_category: 'matematicas',
            keywords: ['matemáticas', 'álgebra', 'geometría', 'aritmética'],
            procomun_tags: ['MAT', 'STEM']
        },
        'Lengua Castellana y Literatura': {
            intef_category: 'lengua',
            keywords: ['lengua', 'literatura', 'gramática', 'ortografía'],
            procomun_tags: ['LCL', 'CCL']
        },
        'Inglés': {
            intef_category: 'idiomas',
            keywords: ['inglés', 'english', 'idiomas'],
            procomun_tags: ['ING', 'CCL', 'idiomas']
        },
        'Ciencias Naturales': {
            intef_category: 'ciencias',
            keywords: ['ciencias', 'biología', 'física', 'química'],
            procomun_tags: ['CN', 'STEM', 'CMCT']
        },
        'Ciencias Sociales': {
            intef_category: 'sociales',
            keywords: ['historia', 'geografía', 'sociales'],
            procomun_tags: ['CS', 'CC', 'historia']
        },
        'Geografía e Historia': {
            intef_category: 'sociales',
            keywords: ['geografía', 'historia'],
            procomun_tags: ['GH', 'cultura']
        },
        'Física y Química': {
            intef_category: 'ciencias',
            keywords: ['física', 'química', 'ciencias'],
            procomun_tags: ['FYQ', 'STEM']
        },
        'Biología y Geología': {
            intef_category: 'ciencias',
            keywords: ['biología', 'geología', 'ciencias'],
            procomun_tags: ['BG', 'STEM']
        },
        'Tecnología': {
            intef_category: 'tecnologia',
            keywords: ['tecnología', 'programación', 'robótica'],
            procomun_tags: ['TEC', 'STEM', 'CD']
        },
        'Educación Física': {
            intef_category: 'educacion-fisica',
            keywords: ['educación física', 'deporte', 'salud'],
            procomun_tags: ['EF']
        },
        'Música': {
            intef_category: 'musica',
            keywords: ['música', 'arte'],
            procomun_tags: ['MUS', 'CCEC']
        },
        'Plástica': {
            intef_category: 'plastica',
            keywords: ['plástica', 'arte', 'dibujo'],
            procomun_tags: ['PLA', 'CCEC']
        }
    },

    // Mapeo de niveles educativos
    grade_mapping: {
        '1º Primaria': { intef_level: 'primaria', intef_curso: '1', age: '6-7' },
        '2º Primaria': { intef_level: 'primaria', intef_curso: '2', age: '7-8' },
        '3º Primaria': { intef_level: 'primaria', intef_curso: '3', age: '8-9' },
        '4º Primaria': { intef_level: 'primaria', intef_curso: '4', age: '9-10' },
        '5º Primaria': { intef_level: 'primaria', intef_curso: '5', age: '10-11' },
        '6º Primaria': { intef_level: 'primaria', intef_curso: '6', age: '11-12' },
        '1º ESO': { intef_level: 'eso', intef_curso: '1', age: '12-13' },
        '2º ESO': { intef_level: 'eso', intef_curso: '2', age: '13-14' },
        '3º ESO': { intef_level: 'eso', intef_curso: '3', age: '14-15' },
        '4º ESO': { intef_level: 'eso', intef_curso: '4', age: '15-16' },
        '1º Bachillerato': { intef_level: 'bachillerato', intef_curso: '1', age: '16-17' },
        '2º Bachillerato': { intef_level: 'bachillerato', intef_curso: '2', age: '17-18' }
    },

    // Tipos de recursos disponibles en INTEF
    resource_types: {
        unidad_didactica: {
            id: 'unidad_didactica',
            name: 'Unidad Didáctica',
            description: 'Secuencia completa de aprendizaje',
            cache_duration: 'forever' // Contenido oficial no cambia
        },
        actividad: {
            id: 'actividad',
            name: 'Actividad',
            description: 'Actividad individual',
            cache_duration: 'forever'
        },
        ejercicio: {
            id: 'ejercicio',
            name: 'Ejercicio',
            description: 'Ejercicio práctico',
            cache_duration: 'forever'
        },
        evaluacion: {
            id: 'evaluacion',
            name: 'Evaluación',
            description: 'Instrumento de evaluación',
            cache_duration: 'forever'
        },
        rubrica: {
            id: 'rubrica',
            name: 'Rúbrica',
            description: 'Rúbrica de evaluación',
            cache_duration: 'forever'
        },
        recurso_multimedia: {
            id: 'multimedia',
            name: 'Recurso Multimedia',
            description: 'Vídeos, imágenes, audio',
            cache_duration: '90d'
        }
    },

    // Competencias clave LOMLOE
    competencias_clave: {
        'CCL': 'Competencia en comunicación lingüística',
        'CP': 'Competencia plurilingüe',
        'STEM': 'Competencia matemática y competencia en ciencia, tecnología e ingeniería',
        'CD': 'Competencia digital',
        'CPSAA': 'Competencia personal, social y de aprender a aprender',
        'CC': 'Competencia ciudadana',
        'CE': 'Competencia emprendedora',
        'CCEC': 'Competencia en conciencia y expresión culturales'
    },

    // Configuración de caché
    cache_config: {
        enabled: true,
        default_ttl: 'forever', // Contenido oficial raramente cambia
        refresh_strategy: 'lazy', // Solo actualizar cuando se solicite
        storage: 'supabase' // Guardar en Supabase para compartir entre usuarios
    }
};

// Helper para construir URLs de búsqueda
export function buildINTEFSearchURL(asignatura, curso, tema) {
    const subjectConfig = INTEF_CONFIG.subject_mapping[asignatura];
    const gradeConfig = INTEF_CONFIG.grade_mapping[curso];

    if (!subjectConfig || !gradeConfig) {
        console.warn(`No INTEF config for ${asignatura} - ${curso}`);
        return null;
    }

    // Construir query de búsqueda
    const query = encodeURIComponent(`${tema} ${gradeConfig.intef_level}`);
    const tags = subjectConfig.procomun_tags.join(',');

    return `${INTEF_CONFIG.sources.procomun.search_url}?q=${query}&tags=${tags}&nivel=${gradeConfig.intef_level}`;
}

// Helper para generar cache key
export function generateINTEFCacheKey(asignatura, curso, tema, resourceType = 'all') {
    return `intef_${asignatura}_${curso}_${tema}_${resourceType}`.toLowerCase().replace(/\s+/g, '_');
}
