/**
 * Servicio para consultar el currículo LOMLOE
 * Obtiene saberes básicos y criterios de evaluación para personalizar el Tutor IA
 */

import { supabase } from '../supabaseClient';

/**
 * Obtiene saberes básicos filtrados por asignatura y curso
 * @param {string} subject - Nombre de la asignatura
 * @param {string} grade - Curso (ej: "3º Primaria")
 * @param {number} limit - Número máximo de saberes
 * @returns {Promise<Array>} - Array de saberes básicos
 */
export async function getSaberesBySubjectAndGrade(subject, grade, limit = 20) {
    const { data, error } = await supabase
        .from('saberes_basicos')
        .select('*')
        .eq('asignatura', subject)
        .eq('curso', grade)
        .limit(limit);

    if (error) {
        console.error('Error obteniendo saberes básicos:', error);
        return [];
    }

    return data || [];
}

/**
 * Obtiene criterios de evaluación por asignatura y curso
 * @param {string} subject - Nombre de la asignatura
 * @param {string} grade - Curso
 * @returns {Promise<Array>} - Array de criterios
 */
export async function getCriteriosBySubjectAndGrade(subject, grade) {
    const { data, error } = await supabase
        .from('criterios_evaluacion')
        .select('*')
        .eq('asignatura', subject)
        .eq('curso', grade);

    if (error) {
        console.error('Error obteniendo criterios:', error);
        return [];
    }

    return data || [];
}

/**
 * Genera un contexto LOMLOE para el prompt del tutor
 * @param {string} subject - Asignatura
 * @param {string} grade - Curso
 * @param {string} topic - Tema específico (opcional)
 * @returns {Promise<string>} - Texto con saberes y criterios relevantes
 */
export async function generateLOMOLEContext(subject, grade, topic = null) {
    const saberes = await getSaberesBySubjectAndGrade(subject, grade, 10);
    const criterios = await getCriteriosBySubjectAndGrade(subject, grade);

    if (saberes.length === 0 && criterios.length === 0) {
        return `Asignatura: ${subject} - Curso: ${grade}`;
    }

    let context = `## CONTEXTO CURRICULAR LOMLOE\n\n`;
    context += `**Asignatura:** ${subject}\n`;
    context += `**Curso:** ${grade}\n`;

    if (topic) {
        context += `**Tema:** ${topic}\n`;
    }

    context += `\n### SABERES BÁSICOS QUE DEBEN TRABAJARSE:\n`;
    saberes.forEach((saber, index) => {
        context += `${index + 1}. ${saber.saber}\n`;
        if (saber.bloque) {
            context += `   (Bloque: ${saber.bloque})\n`;
        }
    });

    if (criterios.length > 0) {
        context += `\n### CRITERIOS DE EVALUACIÓN:\n`;
        criterios.slice(0, 5).forEach((criterio, index) => {
            context += `${index + 1}. ${criterio.descripcion}\n`;
        });
    }

    context += `\n**IMPORTANTE:** Tus explicaciones y ejercicios deben estar alineados con estos saberes oficiales del currículo español.\n`;

    return context;
}

/**
 * Obtiene competencias clave de la LOMLOE
 * @returns {Promise<Array>} - Array de competencias
 */
export async function getCompetenciasClave() {
    const { data, error } = await supabase
        .from('competencias_clave')
        .select('*');

    if (error) {
        console.error('Error obteniendo competencias:', error);
        return [];
    }

    return data || [];
}

/**
 * Busca saberes básicos por palabra clave
 * @param {string} keyword - Palabra clave a buscar
 * @param {string} subject - Asignatura (opcional)
 * @param {string} grade - Curso (opcional)
 * @returns {Promise<Array>} - Array de saberes que coinciden
 */
export async function searchSaberes(keyword, subject = null, grade = null) {
    let query = supabase
        .from('saberes_basicos')
        .select('*')
        .ilike('saber', `%${keyword}%`);

    if (subject) {
        query = query.eq('asignatura', subject);
    }

    if (grade) {
        query = query.eq('curso', grade);
    }

    const { data, error } = await query.limit(15);

    if (error) {
        console.error('Error buscando saberes:', error);
        return [];
    }

    return data || [];
}

/**
 * Obtiene un resumen de asignaturas y cursos disponibles
 * @returns {Promise<Object>} - {asignaturas: Array, cursos: Array}
 */
export async function getAvailableSubjectsAndGrades() {
    // Obtener asignaturas únicas
    const { data: subjectsData } = await supabase
        .from('saberes_basicos')
        .select('asignatura')
        .order('asignatura');

    // Obtener cursos únicos
    const { data: gradesData } = await supabase
        .from('saberes_basicos')
        .select('curso')
        .order('curso');

    const subjects = [...new Set(subjectsData?.map(s => s.asignatura) || [])];
    const grades = [...new Set(gradesData?.map(g => g.curso) || [])];

    return { subjects, grades };
}

export default {
    getSaberesBySubjectAndGrade,
    getCriteriosBySubjectAndGrade,
    generateLOMOLEContext,
    getCompetenciasClave,
    searchSaberes,
    getAvailableSubjectsAndGrades,
};
