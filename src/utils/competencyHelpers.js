export const getCompetencyName = (code) => {
    const MAPA_COMPETENCIAS = {
        'CCL': 'Comunicación Lingüística',
        'CP': 'Competencia Plurilingüe',
        'STEM': 'Matemática y C.T.',
        'CD': 'Competencia Digital',
        'CPSAA': 'Personal, Social y de Aprender a Aprender',
        'CC': 'Competencia Ciudadana',
        'CE': 'Competencia Emprendedora',
        'CCEC': 'Conciencia y Expresión Culturales'
    };
    return MAPA_COMPETENCIAS[code] || code;
};
