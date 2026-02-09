import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, Send, Trash2, Loader2, Database, User, BookOpen } from 'lucide-react';
import { generateWorksheet } from '../utils/gemini';

const PromptTester = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [studentProfile, setStudentProfile] = useState(null);
    const [curriculumContext, setCurriculumContext] = useState(null);
    const [promptVersion, setPromptVersion] = useState('v2');
    const [showContext, setShowContext] = useState(false);

    useEffect(() => {
        loadStudentProfile();
    }, []);

    const loadStudentProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Buscar primer estudiante del usuario
            const { data: students } = await supabase
                .from('students')
                .select('*')
                .eq('parent_id', user.id)
                .limit(1);

            if (students && students.length > 0) {
                const student = students[0];

                // Cargar perfil de aprendizaje
                const { data: learningProfile } = await supabase
                    .from('learning_profiles')
                    .select('*')
                    .eq('student_id', student.id)
                    .single();

                setStudentProfile({ ...student, learning_profile: learningProfile });

                // Cargar contexto curricular (ejemplo: Matemáticas)
                await loadCurriculumContext('Matemáticas', student.grade_level);
            }
        } catch (error) {
            console.error('Error cargando perfil:', error);
        }
    };

    const loadCurriculumContext = async (subject, gradeLevel) => {
        try {
            const { data: saberes } = await supabase
                .from('saberes_basicos')
                .select('*')
                .eq('asignatura', subject)
                .eq('curso', gradeLevel)
                .limit(5);

            const { data: criterios } = await supabase
                .from('criterios_evaluacion')
                .select('*')
                .eq('asignatura', subject)
                .eq('curso', gradeLevel)
                .limit(3);

            const { data: competencias } = await supabase
                .from('competencias_clave')
                .select('*')
                .limit(8);

            setCurriculumContext({
                saberes: saberes || [],
                criterios: criterios || [],
                competencias: competencias || []
            });
        } catch (error) {
            console.error('Error cargando contexto LOMLOE:', error);
        }
    };

    const buildSystemPrompt = () => {
        if (!studentProfile) return getBasePrompt();

        const profile = studentProfile;
        const varkDominant = profile.learning_profile?.vark_dominant || 'general';
        const neurodiversityFlags = profile.learning_profile?.ai_summary || '';

        let prompt = `ROL: TUTOR PERSONAL IA - ALINEADO CON LOMLOE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🇪🇸 CONTEXTO CURRICULAR OFICIAL (LOMLOE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMUNIDAD AUTÓNOMA: ${profile.autonomous_community || 'Nacional'}

`;

        if (curriculumContext && curriculumContext.saberes.length > 0) {
            prompt += `📚 SABERES BÁSICOS OFICIALES:\n`;
            curriculumContext.saberes.forEach(s => {
                prompt += `- ${s.bloque}: ${s.saber}\n`;
            });
            prompt += `\n⚠️ TODO contenido que generes DEBE estar alineado con estos saberes.\n\n`;
        }

        if (curriculumContext && curriculumContext.criterios.length > 0) {
            prompt += `🎯 CRITERIOS DE EVALUACIÓN:\n`;
            curriculumContext.criterios.forEach(c => {
                prompt += `- ${c.id}: ${c.descripcion}\n`;
            });
            prompt += `\nTu feedback debe evaluar según ESTOS criterios oficiales.\n\n`;
        }

        if (curriculumContext && curriculumContext.competencias.length > 0) {
            prompt += `💎 COMPETENCIAS CLAVE LOMLOE:\n`;
            curriculumContext.competencias.forEach(comp => {
                prompt += `- ${comp.id}: ${comp.nombre}\n`;
            });
            prompt += `\n`;
        }

        prompt += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERFIL DEL ESTUDIANTE:
- Nombre: [Sin definir - preguntar en onboarding]
- Curso: ${profile.grade_level}
- Estilo VARK: ${varkDominant.toUpperCase()}
- Perfil: ${neurodiversityFlags}

ADAPTACIONES ESPECÍFICAS:
`;

        if (varkDominant === 'visual') {
            prompt += `- Este estudiante aprende mejor con IMÁGENES y DIAGRAMAS\n`;
            prompt += `- Usa descripciones visuales frecuentemente\n`;
            prompt += `- Sugiere que dibuje o esquematice conceptos\n\n`;
        } else if (varkDominant === 'kinestesico') {
            prompt += `- Este estudiante aprende mejor HACIENDO y MOVIÉNDOSE\n`;
            prompt += `- Propón ejercicios prácticos inmediatamente\n`;
            prompt += `- Divide teoría en pequeñas dosis seguidas de práctica\n\n`;
        }

        prompt += `PRINCIPIOS FUNDAMENTALES:
1. EMPATÍA - Nunca hagas sentir mal al estudiante por no saber algo
2. CLARIDAD - Frases cortas y directas, hablas con un estudiante no con un adulto
3. PREGUNTAS CLARIFICADORAS - Si no entiendes qué necesita, pregunta amablemente
4. FEEDBACK CONSTRUCTIVO - Formato: ✅ Lo que hizo bien → ⚠️ Dónde mejorar → 💡 Cómo hacerlo

TONO:
- Amigable pero profesional
- Motivador sin ser condescendiente  
- Paciente infinitamente
- Máximo 3-4 párrafos por mensaje (no abrumes)

AHORA ESTÁS LISTO PARA INTERACTUAR CON EL ESTUDIANTE.
RECUERDA: Si es la primera vez (dice "hola"), inicia el onboarding preguntando su nombre.
`;

        return prompt;
    };

    const getBasePrompt = () => {
        return `ROL: TUTOR PERSONAL IA

Eres un tutor paciente y experto. Ayudas a estudiantes de 6-18 años.

PRINCIPIOS:
1. Empatía y validación
2. Claridad y concisión
3. Preguntas clarificadoras
4. Feedback constructivo tipo: ✅ Bien → ⚠️ Mejorar → 💡 Cómo

TONO: Amigable, motivador, paciente. Máximo 3 párrafos.
`;
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const systemPrompt = buildSystemPrompt();

            // Construir historial de conversación
            const conversationHistory = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
            }));

            // Llamar a la IA (usando SambaNova directamente)
            const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('SAMBANOVA_API_KEY') || '54017650-0863-4436-a868-93409238101e'}`
                },
                body: JSON.stringify({
                    model: "Meta-Llama-3.1-8B-Instruct",
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...conversationHistory,
                        { role: "user", content: input }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            const assistantMessage = {
                role: 'assistant',
                content: data.choices[0].message.content
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ Error: ${error.message}. Verifica que la API de SambaNova esté funcionando.`
            }]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                                <MessageSquare className="w-8 h-8 text-indigo-600" />
                                Prompt Tester - Tutor IA
                            </h1>
                            <p className="text-slate-600 mt-2">
                                Prueba conversaciones con el Tutor IA usando prompts personalizados
                            </p>
                        </div>
                        <button
                            onClick={() => setShowContext(!showContext)}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-200 transition-colors"
                        >
                            {showContext ? 'Ocultar' : 'Ver'} Contexto
                        </button>
                    </div>
                </div>

                {/* Context Panel */}
                {showContext && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5 text-indigo-600" />
                            Contexto Cargado
                        </h3>

                        {studentProfile ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-4 h-4 text-blue-600" />
                                        <span className="font-bold text-blue-900">Perfil del Estudiante</span>
                                    </div>
                                    <div className="text-sm text-blue-800 space-y-1">
                                        <p><strong>Nombre:</strong> {studentProfile.name}</p>
                                        <p><strong>Curso:</strong> {studentProfile.grade_level}</p>
                                        <p><strong>VARK:</strong> {studentProfile.learning_profile?.vark_dominant || 'No definido'}</p>
                                    </div>
                                </div>

                                {curriculumContext && (
                                    <div className="bg-green-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-4 h-4 text-green-600" />
                                            <span className="font-bold text-green-900">Contexto LOMLOE</span>
                                        </div>
                                        <div className="text-sm text-green-800 space-y-1">
                                            <p><strong>Saberes Básicos:</strong> {curriculumContext.saberes.length} cargados</p>
                                            <p><strong>Criterios Evaluación:</strong> {curriculumContext.criterios.length} cargados</p>
                                            <p><strong>Competencias:</strong> {curriculumContext.competencias.length} cargadas</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-slate-500">No hay perfil de estudiante cargado</p>
                        )}

                        <details className="mt-4">
                            <summary className="font-semibold cursor-pointer text-slate-700 hover:text-indigo-600">
                                Ver Prompt Sistema Completo
                            </summary>
                            <pre className="mt-2 bg-slate-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-96">
                                {buildSystemPrompt()}
                            </pre>
                        </details>
                    </div>
                )}

                {/* Chat Area */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center text-slate-400">
                                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">Inicia una conversación con el Tutor IA</p>
                                    <p className="text-sm mt-2">Ejemplos:</p>
                                    <div className="mt-4 space-y-2 text-left max-w-md mx-auto">
                                        <p className="bg-slate-50 p-2 rounded">• "No entiendo las fracciones"</p>
                                        <p className="bg-slate-50 p-2 rounded">• "Tengo examen de mates mañana"</p>
                                        <p className="bg-slate-50 p-2 rounded">• "Ponme ejercicios de ecuaciones"</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-100 text-slate-800'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))
                        )}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Pensando...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-slate-200 p-4 bg-slate-50">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Enviar
                            </button>
                            <button
                                onClick={clearChat}
                                className="px-4 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                                title="Limpiar chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="font-bold text-amber-900 mb-2">💡 Instrucciones de Uso</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Este componente carga automáticamente el perfil del primer estudiante encontrado</li>
                        <li>• Se carga contexto curricular LOMLOE (saberes, criterios, competencias)</li>
                        <li>• El prompt se construye dinámicamente con toda la información</li>
                        <li>• Cada mensaje enviado incluye el historial de conversación</li>
                        <li>• Usa "Ver Contexto" para ver qué información tiene el tutor</li>
                        <li>• Este componente es TEMPORAL para testing, se eliminará en producción</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PromptTester;
