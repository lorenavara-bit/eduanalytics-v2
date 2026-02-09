/**
 * Servicio para gestionar sesiones y mensajes del Tutor IA
 * Interactúa con las tablas: tutor_sessions, tutor_messages
 */

import { supabase } from '../supabaseClient';

/**
 * Crea una nueva sesión del tutor para un estudiante
 * @param {string} studentId - UUID del estudiante
 * @param {Object} options - {title, mode, subject, topic}
 * @returns {Promise<Object>} - Sesión creada
 */
export async function createTutorSession(studentId, options = {}) {
    const {
        title = 'Nueva conversación',
        mode = 'academic', // 'onboarding' | 'academic' | 'profile'
        subject = null,
        topic = null,
    } = options;

    const { data, error } = await supabase
        .from('tutor_sessions')
        .insert({
            student_id: studentId,
            title,
            mode,
            subject,
            topic,
            is_active: true,
            message_count: 0,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creando sesión:', error);
        throw error;
    }

    return data;
}

/**
 * Obtiene la sesión activa de un estudiante o crea una nueva
 * @param {string} studentId - UUID del estudiante
 * @returns {Promise<Object>} - Sesión activa
 */
export async function getOrCreateActiveSession(studentId) {
    // Buscar sesión activa
    const { data: activeSessions, error } = await supabase
        .from('tutor_sessions')
        .select('*')
        .eq('student_id', studentId)
        .eq('is_active', true)
        .order('last_message_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error buscando sesión activa:', error);
        throw error;
    }

    // Si existe, devolverla
    if (activeSessions && activeSessions.length > 0) {
        return activeSessions[0];
    }

    // Si no, crear una nueva
    return await createTutorSession(studentId);
}

/**
 * Obtiene el historial de sesiones de un estudiante
 * @param {string} studentId - UUID del estudiante
 * @param {number} limit - Número máximo de sesiones
 * @returns {Promise<Array>} - Array de sesiones
 */
export async function getStudentSessions(studentId, limit = 20) {
    const { data, error } = await supabase
        .from('tutor_sessions')
        .select('*')
        .eq('student_id', studentId)
        .order('last_message_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error obteniendo sesiones:', error);
        throw error;
    }

    return data || [];
}

/**
 * Añade un mensaje a una sesión
 * @param {string} sessionId - UUID de la sesión
 * @param {string} role - 'user' | 'assistant'
 * @param {string} content - Contenido del mensaje
 * @param {Object} metadata - Metadata adicional (opcional)
 * @returns {Promise<Object>} - Mensaje creado
 */
export async function addMessageToSession(sessionId, role, content, metadata = null) {
    console.log('📝 Intentando añadir mensaje:', { sessionId, role, contentLength: content?.length, metadata });

    const { data, error } = await supabase
        .from('tutor_messages')
        .insert({
            session_id: sessionId,
            role,
            content,
            message_type: 'text',
            metadata,
        })
        .select()
        .single();

    if (error) {
        console.error('❌ Error añadiendo mensaje:', error);
        console.error('📋 Detalles del error:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        });
        throw error;
    }

    console.log('✅ Mensaje añadido correctamente:', data.id);
    return data;
}

/**
 * Obtiene todos los mensajes de una sesión
 * @param {string} sessionId - UUID de la sesión
 * @returns {Promise<Array>} - Array de mensajes ordenados cronológicamente
 */
export async function getSessionMessages(sessionId) {
    const { data, error } = await supabase
        .from('tutor_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error obteniendo mensajes:', error);
        throw error;
    }

    return data || [];
}

/**
 * Marca una sesión como inactiva y crea una nueva
 * @param {string} sessionId - UUID de la sesión actual
 * @param {string} studentId - UUID del estudiante
 * @returns {Promise<Object>} - Nueva sesión creada
 */
export async function startNewSession(sessionId, studentId) {
    // Marcar sesión actual como inactiva
    const { error: updateError } = await supabase
        .from('tutor_sessions')
        .update({ is_active: false })
        .eq('id', sessionId);

    if (updateError) {
        console.error('Error cerrando sesión:', updateError);
    }

    // Crear nueva sesión
    return await createTutorSession(studentId);
}

/**
 * Actualiza el título de una sesión
 * @param {string} sessionId - UUID de la sesión
 * @param {string} title - Nuevo título
 */
export async function updateSessionTitle(sessionId, title) {
    const { error } = await supabase
        .from('tutor_sessions')
        .update({ title })
        .eq('id', sessionId);

    if (error) {
        console.error('Error actualizando título:', error);
        throw error;
    }
}

/**
 * Registra un error del estudiante
 * @param {string} studentId - UUID del estudiante
 * @param {string} sessionId - UUID de la sesión
 * @param {Object} errorData - {subject, topic, question_text, student_answer, error_type, feedback}
 */
export async function logStudentError(studentId, sessionId, errorData) {
    const {
        subject,
        topic,
        question_text,
        student_answer,
        expected_answer = null,
        error_type,
        error_description = null,
        feedback = null,
    } = errorData;

    const { error } = await supabase
        .from('student_error_log')
        .insert({
            student_id: studentId,
            session_id: sessionId,
            subject,
            topic,
            question_text,
            student_answer,
            expected_answer,
            error_type,
            error_description,
            feedback,
        });

    if (error) {
        console.error('Error registrando error del estudiante:', error);
    }

    // Actualizar o crear patrón de error
    await updateErrorPattern(studentId, error_type, subject, topic);
}

/**
 * Actualiza o crea un patrón de error
 * @param {string} studentId - UUID del estudiante
 * @param {string} errorType - Tipo de error
 * @param {string} subject - Asignatura
 * @param {string} topic - Tema
 */
async function updateErrorPattern(studentId, errorType, subject, topic) {
    // Buscar si existe el patrón
    const { data: existing } = await supabase
        .from('student_error_patterns')
        .select('*')
        .eq('student_id', studentId)
        .eq('error_type', errorType)
        .eq('subject', subject)
        .eq('topic', topic)
        .single();

    if (existing) {
        // Incrementar frecuencia
        await supabase
            .from('student_error_patterns')
            .update({
                frequency: existing.frequency + 1,
                last_occurrence: new Date().toISOString(),
            })
            .eq('id', existing.id);
    } else {
        // Crear nuevo patrón
        await supabase
            .from('student_error_patterns')
            .insert({
                student_id: studentId,
                error_type: errorType,
                subject,
                topic,
                frequency: 1,
                is_active: true,
            });
    }
}

/**
 * Obtiene los patrones de error activos de un estudiante
 * @param {string} studentId - UUID del estudiante
 * @returns {Promise<Array>} - Array de patrones de error
 */
export async function getStudentErrorPatterns(studentId) {
    const { data, error } = await supabase
        .from('student_error_patterns')
        .select('*')
        .eq('student_id', studentId)
        .eq('is_active', true)
        .order('frequency', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error obteniendo patrones de error:', error);
        return [];
    }

    return data || [];
}

export default {
    createTutorSession,
    getOrCreateActiveSession,
    getStudentSessions,
    addMessageToSession,
    getSessionMessages,
    startNewSession,
    updateSessionTitle,
    logStudentError,
    getStudentErrorPatterns,
};
