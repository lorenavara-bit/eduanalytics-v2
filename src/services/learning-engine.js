/**
 * LEARNING ENGINE V1 - EduAnalytics Advanced Intelligence
 * Implementa el "Comprehensive Learning Style Detection Algorithm"
 */

export const MODALITIES = {
    VISUAL: 'V',
    AURAL: 'A',
    READ_WRITE: 'R',
    KINESTHETIC: 'K'
};

export const INTELLIGENCES = {
    LINGUISTIC: 'linguistic',
    LOGICAL: 'logical',
    SPATIAL: 'spatial',
    KINESTHETIC: 'kinesthetic',
    MUSICAL: 'musical',
    INTERPERSONAL: 'interpersonal',
    INTRAPERSONAL: 'intrapersonal',
    NATURALISTIC: 'naturalistic'
};

/**
 * Fase 2: Algoritmo de Evaluación VARK
 */
export function calculateVARKProfile(responses) {
    const scores = { [MODALITIES.VISUAL]: 0, [MODALITIES.AURAL]: 0, [MODALITIES.READ_WRITE]: 0, [MODALITIES.KINESTHETIC]: 0 };

    // Contar respuestas (asumiendo que responses es un array de claves V, A, R, K)
    responses.forEach(choice => {
        if (scores[choice] !== undefined) scores[choice]++;
    });

    const total = responses.length;
    const threshold = total * 0.25;
    const maxScore = Math.max(...Object.values(scores));

    const primaryStyles = Object.keys(scores).filter(s => scores[s] >= maxScore * 0.85);
    const strongStyles = Object.keys(scores).filter(s => scores[s] >= threshold);

    return {
        scores,
        primary: primaryStyles,
        multimodal: strongStyles.length > 1,
        strongStyles,
        dominant: primaryStyles[0],
        strength: maxScore / Math.max(total, 1)
    };
}

/**
 * Fase 4: Algoritmo de Inteligencias Múltiples
 */
export function calculateMIProfile(activityData, selfAssessment) {
    const finalScores = {};

    Object.keys(INTELLIGENCES).forEach(key => {
        const id = INTELLIGENCES[key];
        const activityScore = activityData?.[id] || 0;
        const selfScore = selfAssessment?.[id] || 0;

        // Ponderación: 60% evidencia (actividades), 40% autopercepción
        finalScores[id] = (activityScore * 0.6) + (selfScore * 0.4);
    });

    const sorted = Object.entries(finalScores)
        .sort(([, a], [, b]) => b - a)
        .map(([id, score]) => ({ id, score }));

    return {
        scores: finalScores,
        topThree: sorted.slice(0, 3)
    };
}

/**
 * Fase 5: Ciclo de Kolb (Experiencial)
 */
export function calculateKolbProfile(responses) {
    // EC: Experiencia Concreta, OR: Observación Reflexiva, CT: Conceptualización Abstracta, EA: Experimentación Activa
    const scores = { EC: 0, OR: 0, CA: 0, EA: 0 };

    responses.forEach(r => {
        if (scores[r] !== undefined) scores[r]++;
    });

    // Determinar cuadrantes
    const perception = scores.CA - scores.EC; // Eje vertical
    const processing = scores.EA - scores.OR; // Eje horizontal

    let style = '';
    if (perception >= 0 && processing >= 0) style = 'Convergente';
    else if (perception >= 0 && processing < 0) style = 'Asimilador';
    else if (perception < 0 && processing < 0) style = 'Divergente';
    else style = 'Acomodador';

    return {
        scores,
        perception,
        processing,
        dominant: style,
        description: getKolbDescription(style)
    };
}

function getKolbDescription(style) {
    const descriptions = {
        'Divergente': 'Combina experiencia concreta y observación reflexiva. Destaca en imaginación y conciencia de valores.',
        'Asimilador': 'Combina conceptualización abstracta y observación reflexiva. Destaca en la creación de modelos teóricos.',
        'Convergente': 'Combina conceptualización abstracta y experimentación activa. Destaca en la aplicación práctica de ideas.',
        'Acomodador': 'Combina experiencia concreta y experimentación activa. Destaca en llevar a cabo planes y experimentos.'
    };
    return descriptions[style] || '';
}

/**
 * Fase 6: Motor Adaptativo - Sugerencias de contenido
 */
export function getAdaptations(profile, performance) {
    const adaptations = [];
    const { dominant: varkDominant } = profile.vark || {};
    const { dominant: kolbDominant } = profile.kolb || {};

    // Adaptación por Modalidad VARK
    if (varkDominant === MODALITIES.VISUAL) {
        adaptations.push('visual_scaffolding');
        adaptations.push('concept_maps');
    }
    if (varkDominant === MODALITIES.KINESTHETIC) {
        adaptations.push('learning_by_doing');
        adaptations.push('role_play');
    }

    // Adaptación por Ciclo de Kolb
    if (kolbDominant === 'Divergente') {
        adaptations.push('brainstorming_tasks');
        adaptations.push('multiple_perspectives');
    } else if (kolbDominant === 'Convergente') {
        adaptations.push('problem_solving_practical');
        adaptations.push('technical_simulations');
    }

    // Adaptación por Desempeño (Dificultad Dinámica)
    if (performance?.avgScore > 0.85) {
        adaptations.push('complexity_boost');
        adaptations.push('peer_teaching_prep');
    } else if (performance?.avgScore < 0.5) {
        adaptations.push('micro_learning');
        adaptations.push('error_scaffolding');
    }

    return adaptations;
}

/**
 * Generador de Resumen Pedagógico para la IA
 */
export function generateAIPedagogicalContext(fullProfile) {
    const { vark, mi, kolb, traits } = fullProfile;

    let context = "CONTEXTO PEDAGÓGICO DEL ESTUDIANTE:\n";

    if (vark?.dominant) {
        context += `- Estilo VARK: ${vark.dominant} (${vark.multimodal ? 'Multimodal' : 'Unimodal'}).\n`;
    }

    if (kolb?.dominant) {
        context += `- Estilo de Aprendizaje (Kolb): ${kolb.dominant}.\n`;
    }

    if (mi?.topThree) {
        context += `- Inteligencias Dominantes: ${mi.topThree.map(t => t.id).join(', ')}.\n`;
    }

    if (traits) {
        context += `- Rasgos Cognitivos: Atención ${traits.attention || 'normal'}, Velocidad ${traits.processing_speed || 'normal'}.\n`;
    }

    context += "\nINSTRUCCIÓN: Adapta el tono, la estructura y el tipo de actividades basándote en este perfil.";

    return context;
}

export default {
    calculateVARKProfile,
    calculateMIProfile,
    calculateKolbProfile,
    getAdaptations,
    generateAIPedagogicalContext,
    MODALITIES,
    INTELLIGENCES
};
