import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { getTutorResponse } from '../../services/ai-service';
import {
    getOrCreateActiveSession,
    addMessageToSession,
    getSessionMessages,
    startNewSession,
    createTutorSession,
} from '../../services/tutor-service';
import { generateLOMOLEContext } from '../../services/curriculum-service';
import './TutorAI.css';

// Parser de comandos de juegos [GAME:type|param:value|...]
const parseGameCommand = (content) => {
    const gameMatch = content.match(/\[GAME:(\w+)\|(.+?)\]/);
    if (!gameMatch) return null;

    const [_, gameType, paramsStr] = gameMatch;
    const gameData = {};

    paramsStr.split('|').forEach(param => {
        const [key, value] = param.split(':');
        if (key && value) {
            gameData[key] = value;
        }
    });

    return { gameType, gameData, rawCommand: gameMatch[0] };
};

const TutorAI = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [session, setSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState(null);
    const [learningProfile, setLearningProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [showNewSessionModal, setShowNewSessionModal] = useState(false);

    const messagesEndRef = useRef(null);
    const hasFetched = useRef(false);

    // Cargar usuario y estudiantes
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            loadUserAndStudents();
        }
    }, []);

    // Cargar datos del estudiante seleccionado
    useEffect(() => {
        if (selectedStudent) {
            loadStudentData();
        }
    }, [selectedStudent]);

    // Cargar sesión activa
    useEffect(() => {
        if (student) {
            loadSession();
        }
    }, [student]);

    // Auto-scroll al último mensaje
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadUserAndStudents = async () => {
        try {
            setIsInitializing(true);
            const { data: { user: authUser } } = await supabase.auth.getUser();

            if (!authUser) {
                setError('Debes iniciar sesión para usar el tutor IA.');
                setIsInitializing(false);
                return;
            }

            setUser(authUser);

            // Cargar estudiantes del padre
            const { data: kids, error: kidsError } = await supabase
                .from('students')
                .select(`
                    *,
                    learning_profiles (
                        vark_dominant,
                        vark_scores,
                        fs_active_reflective,
                        fs_sensing_intuitive,
                        fs_visual_verbal,
                        fs_sequential_global,
                        ai_summary
                    )
                `)
                .eq('parent_id', authUser.id);

            if (kidsError) throw kidsError;

            if (kids && kids.length > 0) {
                const formattedKids = kids.map(k => ({
                    ...k,
                    learning_profile: (k.learning_profiles && k.learning_profiles.length > 0)
                        ? k.learning_profiles[0]
                        : null
                }));

                setStudents(formattedKids);
                setSelectedStudent(formattedKids[0]);
            } else {
                setError('No se encontraron estudiantes. Por favor, crea un perfil de estudiante primero.');
            }

            setIsInitializing(false);
        } catch (e) {
            console.error('Error cargando usuario y estudiantes:', e);
            setError(e.message);
            setIsInitializing(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadStudentData = async () => {
        try {
            console.log('🔍 Cargando datos del estudiante:', selectedStudent.id);

            // El estudiante ya está cargado desde loadUserAndStudents
            setStudent(selectedStudent);
            console.log('✅ Estudiante cargado:', selectedStudent.name);

            // Cargar perfil de aprendizaje (opcional)
            try {
                const { data: profileData } = await supabase
                    .from('learning_profiles')
                    .select('*')
                    .eq('student_id', selectedStudent.id)
                    .single();

                setLearningProfile(profileData);
                console.log('✅ Perfil de aprendizaje cargado');
            } catch (profileError) {
                console.warn('⚠️ No se pudo cargar perfil de aprendizaje (puede no existir)', profileError);
            }
        } catch (error) {
            console.error('❌ Error crítico cargando datos del estudiante:', error);
            setError(error.message);
            setIsInitializing(false);
        }
    };

    const loadSession = async () => {
        try {
            console.log('🔄 Cargando sesión del tutor...');

            const activeSession = await getOrCreateActiveSession(selectedStudent.id);

            if (!activeSession) {
                throw new Error('No se pudo crear o recuperar la sesión del tutor.');
            }

            console.log('✅ Sesión activa:', activeSession.id);
            setSession(activeSession);

            const sessionMessages = await getSessionMessages(activeSession.id);
            console.log(`✅ Mensajes cargados: ${sessionMessages.length}`);
            setMessages(sessionMessages);

            // Si es nueva sesión, enviar mensaje de bienvenida
            if (sessionMessages.length === 0) {
                await sendWelcomeMessage(activeSession.id);
            }

            setIsInitializing(false);
        } catch (error) {
            console.error('❌ Error cargando sesión del tutor:', error);

            // Determinar el tipo de error
            let errorMessage = error.message;

            if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
                errorMessage = '⚠️ Las tablas del tutor no existen en Supabase. Por favor, ejecuta el SQL de migración: migration/05_tutor_ia_tables.sql';
            } else if (error.message?.includes('permission denied')) {
                errorMessage = '🔒 Error de permisos (RLS). Verifica las políticas de seguridad en Supabase.';
            } else if (error.message?.includes('Failed to fetch')) {
                errorMessage = '🌐 Error de conexión con Supabase. Verifica tu conexión a internet.';
            }

            setError(errorMessage);
            setIsInitializing(false);
        }
    };

    const sendWelcomeMessage = async (sessionId) => {
        const welcomeMessage = `¡Hola ${student.name}! 👋 Soy tu tutor personal de IA. Estoy aquí para ayudarte con tus estudios.

¿En qué asignatura quieres trabajar hoy? Puedo ayudarte con:
- Matemáticas
- Lengua Castellana
- Inglés
- Conocimiento del Medio
- Ciencias Naturales
- Geografía (con mapas interactivos! 🗺️)
- Y más...

También puedo resolver dudas, explicar conceptos o crear ejercicios personalizados para ti. ¿Qué necesitas?`;

        const welcomeMsg = await addMessageToSession(sessionId, 'assistant', welcomeMessage);
        setMessages([welcomeMsg]);
    };

    const handleGameAnswer = async (result) => {
        // Enviar respuesta del juego al tutor
        const gameAnswerText = result.isCorrect
            ? `Hice click en ${result.answer} ✅`
            : `Hice click en ${result.answer} pero era incorrecto ❌`;

        const userMsg = await addMessageToSession(session.id, 'user', gameAnswerText);
        setMessages(prev => [...prev, userMsg]);

        // Obtener feedback del tutor
        setIsLoading(true);
        try {
            const systemPrompt = await buildSystemPrompt();
            const conversationHistory = messages.map((msg) => ({
                role: msg.role,
                content: msg.content.replace(/\[GAME:.*?\]/g, ''), // Limpiar comandos
            }));

            const response = await getTutorResponse(
                systemPrompt,
                conversationHistory,
                gameAnswerText
            );

            const assistantMsg = await addMessageToSession(session.id, 'assistant', response);
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error('Error en handleGameAnswer:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputMessage.trim() || isLoading) return;

        const userMessageText = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        try {
            // Añadir mensaje del usuario a la BD y UI
            const userMsg = await addMessageToSession(session.id, 'user', userMessageText);
            setMessages(prev => [...prev, userMsg]);

            // Preparar contexto del prompt
            const systemPrompt = await buildSystemPrompt();

            // Convertir mensajes a formato de la IA
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content.replace(/\[GAME:.*?\]/g, ''), // Limpiar comandos de juegos
            }));

            // Obtener respuesta del tutor
            const response = await getTutorResponse(
                systemPrompt,
                conversationHistory,
                userMessageText
            );

            // Añadir respuesta del tutor a la BD y UI
            const assistantMsg = await addMessageToSession(session.id, 'assistant', response);
            setMessages(prev => [...prev, assistantMsg]);

        } catch (error) {
            console.error('Error enviando mensaje:', error);

            // Mensaje de error para el usuario
            const errorMsg = {
                role: 'assistant',
                content: '❌ Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentarlo de nuevo?',
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const buildSystemPrompt = async () => {
        let prompt = `Eres un tutor personal de IA especializado en educación primaria en España.

📋 INFORMACIÓN DEL ESTUDIANTE:
- Nombre: ${student.name}
- Curso: ${student.grade_level || 'No especificado'}
- Comunidad Autónoma: ${student.autonomous_community || 'España'}
`;

        // Añadir perfil de aprendizaje si existe
        if (learningProfile) {
            prompt += `\n🎨 ESTILO DE APRENDIZAJE:
- Dominancia VARK: ${learningProfile.vark_dominant || 'No evaluado'}
`;

            if (learningProfile.vark_dominant === 'V') {
                prompt += `- El estudiante aprende mejor con IMÁGENES, DIAGRAMAS y GRÁFICOS.\n`;
            } else if (learningProfile.vark_dominant === 'A') {
                prompt += `- El estudiante aprende mejor ESCUCHANDO y con EXPLICACIONES VERBALES.\n`;
            } else if (learningProfile.vark_dominant === 'R') {
                prompt += `- El estudiante aprende mejor LEYENDO y con TEXTOS ESCRITOS.\n`;
            } else if (learningProfile.vark_dominant === 'K') {
                prompt += `- El estudiante aprende mejor PRACTICANDO y con ACTIVIDADES MANUALES.\n`;
            }
        }

        // Añadir contexto curricular si se especificó asignatura
        if (session.subject && student.grade_level) {
            const curriculumContext = await generateLOMOLEContext(
                session.subject,
                student.grade_level,
                session.topic
            );
            prompt += `\n${curriculumContext}\n`;
        }

        // ============================================================
        // JUEGOS DESHABILITADOS TEMPORALMENTE
        // Los juegos se están desarrollando y serán activados cuando
        // estén completamente funcionales
        // ============================================================

        /* COMENTADO TEMPORALMENTE - JUEGOS EN DESARROLLO
        // Instrucciones sobre juegos interactivos
        prompt += `\n🎮 JUEGOS INTERACTIVOS DISPONIBLES:
Puedes mostrar actividades interactivas usando este formato: [GAME:tipo|param:valor]

JUEGOS DISPONIBLES:
1. **spain_provinces** - Mapa de provincias de España
   Sintaxis: [GAME:spain_provinces|mode:identify|target:NombreProvincia]
   Ejemplo: [GAME:spain_provinces|mode:identify|target:Sevilla]
   
2. **andalucia_provinces** - Mapa de Andalucía (próximamente)
3. **solar_system** - Sistema Solar interactivo (próximamente)
4. **water_cycle** - Ciclo del agua (próximamente)

USA JUEGOS cuando:
- El estudiante necesite practicar geografía
- Pida ayuda con mapas, provincias o regiones
- Quiera "ver" algo visual
- Su estilo VARK sea "V" (Visual)

IMPORTANTE: Coloca el comando [GAME:...] AL FINAL de tu mensaje de texto.
`;
        */

        // Instrucciones generales del tutor
        prompt += `\n🎯 TU MISIÓN:
1. Usa SIEMPRE el nombre del estudiante (${student.name}) en tus mensajes
2. Sé empático, motivador y paciente
3. Explica conceptos de forma clara y adaptada a su edad
4. Da feedback constructivo con el formato: ✅ Qué hizo bien → ⚠️ Qué mejorar → 💡 Cómo hacerlo
5. Adapta el contenido según el currículo LOMLOE español
6. Detecta si el estudiante está frustrado y cambia el enfoque
7. Haz preguntas para verificar comprensión

🧠 TU ROL ES EXPLICAR, NO EVALUAR:
- Eres un tutor conversacional que EXPLICA conceptos
- Tu trabajo es ayudar a entender y motivar
- NO generes quiz ni ejercicios formales
- Si necesitan practicar → Dirige al "Generador de Fichas"

🚫 NO HAGAS:
- Dar respuestas directas sin explicar
- Usar lenguaje muy técnico
- Abrumar con información excesiva
- Juzgar o criticar negativamente
- Usar comandos de juegos [GAME:...] (están en desarrollo)
- Crear quiz o ejercicios de evaluación (para eso está el Generador)

¡Adelante, ${student.name} cuenta contigo! 💪`;

        return prompt;
    };

    const handleNewSession = () => {
        // Mostrar modal de confirmación en lugar de crear directamente
        setShowNewSessionModal(true);
    };

    const handleSaveAndCreateNew = async () => {
        if (!session) return;

        try {
            // Guardar sesión actual (marca como is_active: false)
            const newSession = await startNewSession(session.id, selectedStudent.id);
            setSession(newSession);
            setMessages([]);
            await sendWelcomeMessage(newSession.id);
            setShowNewSessionModal(false);
            console.log('✅ Sesión anterior guardada, nueva sesión creada');
        } catch (error) {
            console.error('Error creando nueva sesión:', error);
        }
    };

    const handleDeleteAndCreateNew = async () => {
        if (!session) return;

        try {
            console.log('🗑️ Borrando sesión actual:', session.id);

            // 1. Borrar todos los mensajes de la sesión
            const { error: messagesError } = await supabase
                .from('tutor_messages')
                .delete()
                .eq('session_id', session.id);

            if (messagesError) {
                console.error('Error borrando mensajes:', messagesError);
                throw messagesError;
            }

            // 2. Borrar la sesión
            const { error: sessionError } = await supabase
                .from('tutor_sessions')
                .delete()
                .eq('id', session.id);

            if (sessionError) {
                console.error('Error borrando sesión:', sessionError);
                throw sessionError;
            }

            console.log('✅ Sesión y mensajes borrados');

            // 3. Crear nueva sesión
            const newSession = await createTutorSession(selectedStudent.id);
            setSession(newSession);
            setMessages([]);
            await sendWelcomeMessage(newSession.id);
            setShowNewSessionModal(false);
            console.log('✅ Nueva sesión creada');
        } catch (error) {
            console.error('Error en handleDeleteAndCreateNew:', error);
            alert('Hubo un error al borrar la sesión. Intenta recargar la página.');
        }
    };

    // Mostrar error si existe
    if (error) {
        return (
            <div className="tutor-ai-container">
                <div className="tutor-error" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem'
                    }}>❌</div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#dc2626'
                    }}>Error del Tutor IA</h2>
                    <p style={{
                        maxWidth: '600px',
                        marginBottom: '2rem',
                        color: '#64748b',
                        lineHeight: '1.6'
                    }}>{error}</p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            🔄 Reintentar
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#94a3b8',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            🏠 Volver al Inicio
                        </button>
                    </div>
                    <details style={{
                        marginTop: '2rem',
                        textAlign: 'left',
                        maxWidth: '600px',
                        padding: '1rem',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '0.5rem'
                    }}>
                        <summary style={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                        }}>Detalles Técnicos</summary>
                        <pre style={{
                            fontSize: '0.8rem',
                            overflow: 'auto',
                            padding: '0.5rem',
                            backgroundColor: 'white',
                            borderRadius: '0.25rem'
                        }}>{JSON.stringify({
                            selectedStudentId: selectedStudent?.id,
                            error: error,
                            supabaseUrl: import.meta.env.VITE_SUPABASE_URL
                        }, null, 2)}</pre>
                    </details>
                </div>
            </div>
        );
    }

    if (isInitializing || !student || !session) {
        return (
            <div className="tutor-loading">
                <div className="spinner"></div>
                <p>Cargando tutor...</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Conectando con Supabase...</p>
            </div>
        );
    }

    return (
        <div className="tutor-ai-container">
            <div className="tutor-header">
                <div className="tutor-title">
                    <h1>💬 Tutor IA</h1>
                    <p className="student-name">Ayudando a {student.name}</p>
                </div>

                {/* Selector de Estudiante */}
                {students.length > 1 && (
                    <div className="student-selector" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '1rem',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        {students.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setSelectedStudent(s);
                                    setSession(null);
                                    setMessages([]);
                                }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backgroundColor: selectedStudent?.id === s.id ? '#6366f1' : 'transparent',
                                    color: selectedStudent?.id === s.id ? 'white' : '#94a3b8',
                                    boxShadow: selectedStudent?.id === s.id ? '0 2px 4px rgba(99, 102, 241, 0.3)' : 'none'
                                }}
                            >
                                👤 {s.full_name?.split(' ')[0] || s.name || 'Estudiante'}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    className="new-session-btn"
                    onClick={handleNewSession}
                    title="Iniciar nueva conversación"
                >
                    ➕ Nueva conversación
                </button>
            </div>

            <div className="tutor-chat">
                {messages.map((msg, index) => {
                    // JUEGOS DESHABILITADOS: No parsear comandos de juego
                    const gameCommand = null; // parseGameCommand(msg.content);
                    const cleanContent = msg.content; // No need to clean if no games

                    return (
                        <div
                            key={msg.id || index}
                            className={`message message-${msg.role}`}
                        >
                            <div className="message-avatar">
                                {msg.role === 'user' ? '👤' : '🤖'}
                            </div>
                            <div className="message-content">
                                <div className="message-text">
                                    {cleanContent}
                                </div>

                                {/* JUEGOS DESHABILITADOS - Comentado temporalmente
                                {gameCommand && msg.role === 'assistant' && (
                                    <div className="message-game">
                                        <InteractiveGame
                                            type={gameCommand.gameType}
                                            data={gameCommand.gameData}
                                            onAnswer={handleGameAnswer}
                                        />
                                    </div>
                                )}
                                */}

                                <div className="message-time">
                                    {new Date(msg.created_at).toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {isLoading && (
                    <div className="message message-assistant">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form className="tutor-input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="tutor-input"
                    placeholder={`Pregúntale algo a tu tutor, ${student.name}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="send-btn"
                    disabled={isLoading || !inputMessage.trim()}
                >
                    {isLoading ? '⏳' : '📤'}
                </button>
            </form>

            {/* Modal de Confirmación Nueva Sesión */}
            {showNewSessionModal && (
                <div className="modal-overlay" onClick={() => setShowNewSessionModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">🔄 Iniciar Nueva Conversación</h2>

                        <div className="modal-info">
                            <p>Tienes una conversación activa:</p>
                            <div className="session-info">
                                <span className="info-icon">📝</span>
                                <span className="info-text">{session?.title || 'Nueva conversación'}</span>
                            </div>
                            <div className="session-info">
                                <span className="info-icon">💬</span>
                                <span className="info-text">{messages.length} mensaje{messages.length !== 1 ? 's' : ''}</span>
                            </div>
                        </div>

                        <p className="modal-question">¿Qué quieres hacer con ella?</p>

                        <div className="modal-actions">
                            <button
                                className="modal-btn save-btn"
                                onClick={handleSaveAndCreateNew}
                            >
                                <span className="btn-icon">💾</span>
                                <span className="btn-text">
                                    <strong>Guardar</strong>
                                    <small>y Crear Nueva</small>
                                </span>
                            </button>

                            <button
                                className="modal-btn delete-btn"
                                onClick={handleDeleteAndCreateNew}
                            >
                                <span className="btn-icon">🗑️</span>
                                <span className="btn-text">
                                    <strong>Borrar</strong>
                                    <small>y Crear Nueva</small>
                                </span>
                            </button>
                        </div>

                        <button
                            className="modal-btn cancel-btn"
                            onClick={() => setShowNewSessionModal(false)}
                        >
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorAI;
