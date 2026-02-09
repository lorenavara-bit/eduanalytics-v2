/**
 * Servicio de IA para el Tutor Conversacional
 * Conecta con SambaNova Cloud API
 */

const SAMBANOVA_API_URL = 'https://api.sambanova.ai/v1/chat/completions';

// Obtener API Key desde localStorage (prioridad) o .env como fallback
const getAPIKey = () => {
    return localStorage.getItem('SAMBANOVA_API_KEY') || import.meta.env.VITE_SAMBANOVA_API_KEY || "54017650-0863-4436-a868-93409238101e";
};

const MODEL = 'Meta-Llama-3.1-8B-Instruct'; // Modelo rápido y confiable (mismo que AI Generator)

/**
 * Envía un mensaje al modelo de IA y obtiene respuesta
 * @param {Array} messages - Array de mensajes [{role: 'user'|'assistant', content: string}]
 * @param {Object} options - Opciones adicionales (temperature, max_tokens, etc.)
 * @returns {Promise<string>} - Respuesta del modelo
 */
export async function sendMessageToAI(messages, options = {}) {
    const API_KEY = getAPIKey();

    if (!API_KEY) {
        throw new Error('⚠️ API Key de SambaNova no configurada. Ve a NeuroPerfil → Configuración para añadirla.');
    }

    const {
        temperature = 0.7,
        max_tokens = 2000,
        model = MODEL,
    } = options;

    try {
        console.log('🤖 Enviando petición a SambaNova:', {
            endpoint: SAMBANOVA_API_URL,
            model,
            messageCount: messages.length,
            hasAPIKey: !!API_KEY
        });

        const response = await fetch(SAMBANOVA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                max_tokens,
            }),
        });

        console.log('📡 Respuesta de SambaNova:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        });

        if (!response.ok) {
            // Clonar la respuesta para poder leerla varias veces
            const clonedResponse = response.clone();
            let errorMessage = response.statusText;

            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
                console.error('❌ Error JSON de SambaNova:', errorData);
            } catch (e) {
                // Si no es JSON, leer como texto del clon
                try {
                    const errorText = await clonedResponse.text();
                    errorMessage = errorText || response.statusText;
                    console.error('❌ Error TEXTO de SambaNova:', errorText);
                } catch (err) {
                    console.error('❌ No se pudo leer el error:', err);
                }
            }

            throw new Error(`SambaNova API Error (${response.status}): ${errorMessage}`);
        }

        const data = await response.json();

        // Extraer contenido de la respuesta
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            console.error('❌ Respuesta sin contenido:', data);
            throw new Error('Respuesta vacía del modelo de IA');
        }

        console.log('✅ Respuesta recibida correctamente');
        return content;
    } catch (error) {
        console.error('💥 Error en sendMessageToAI:', error);
        throw error;
    }
}

/**
 * Genera una respuesta del Tutor IA con contexto completo
 * @param {string} systemPrompt - Prompt del sistema (instrucciones del tutor)
 * @param {Array} conversationHistory - Historial [{role, content}]
 * @param {string} userMessage - Mensaje actual del usuario
 * @returns {Promise<string>} - Respuesta del tutor
 */
export async function getTutorResponse(systemPrompt, conversationHistory, userMessage) {
    // Construir array de mensajes con formato correcto
    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage },
    ];

    return await sendMessageToAI(messages, {
        temperature: 0.8, // Más creativo y empático
        max_tokens: 1500,
    });
}

/**
 * Analiza la respuesta de un estudiante para detectar errores
 * @param {string} question - Pregunta original
 * @param {string} studentAnswer - Respuesta del estudiante
 * @param {string} expectedAnswer - Respuesta esperada (opcional)
 * @param {string} subject - Asignatura
 * @returns {Promise<Object>} - {hasError: boolean, errorType: string, feedback: string}
 */
export async function analyzeStudentAnswer(question, studentAnswer, expectedAnswer, subject) {
    const analysisPrompt = `Eres un tutor experto evaluando una respuesta de un estudiante.

PREGUNTA: ${question}
RESPUESTA DEL ESTUDIANTE: ${studentAnswer}
${expectedAnswer ? `RESPUESTA ESPERADA: ${expectedAnswer}` : ''}
ASIGNATURA: ${subject}

Analiza si la respuesta es correcta o tiene errores. Responde SOLO con este formato JSON:
{
  "hasError": true/false,
  "errorType": "conceptual" | "cálculo" | "interpretación" | "ninguno",
  "feedback": "Explicación breve del error o felicitación si es correcto"
}`;

    try {
        const response = await sendMessageToAI([
            { role: 'system', content: 'Eres un evaluador de respuestas educativas. Responde SOLO con JSON válido.' },
            { role: 'user', content: analysisPrompt },
        ], {
            temperature: 0.3, // Más determinista para evaluación
            max_tokens: 300,
        });

        // Extraer JSON de la respuesta (puede venir con ```json o texto extra)
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Respuesta no válida del modelo');
        }

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error('Error en analyzeStudentAnswer:', error);
        // Fallback en caso de error
        return {
            hasError: false,
            errorType: 'ninguno',
            feedback: 'No pude analizar la respuesta en este momento.',
        };
    }
}

/**
 * Genera un resumen del perfil de aprendizaje con IA
 * @param {Object} profileData - Datos del perfil (VARK, MI, CHAEA)
 * @returns {Promise<string>} - Resumen en lenguaje natural
 */
export async function generateProfileSummary(profileData) {
    const { vark_dominant, vark_scores, mi_scores, chaea_scores } = profileData;

    const prompt = `Genera un resumen breve (2-3 frases) del perfil de aprendizaje de un estudiante:

- Estilo VARK dominante: ${vark_dominant || 'No evaluado'}
- Puntuaciones VARK: ${JSON.stringify(vark_scores || {})}
- Inteligencias Múltiples: ${JSON.stringify(mi_scores || {})}
- CHAEA: ${JSON.stringify(chaea_scores || {})}

Escribe un resumen amigable y motivador que explique cómo aprende mejor este estudiante.`;

    try {
        return await sendMessageToAI([
            { role: 'system', content: 'Eres un psicopedagogo experto en estilos de aprendizaje.' },
            { role: 'user', content: prompt },
        ], {
            temperature: 0.7,
            max_tokens: 200,
        });
    } catch (error) {
        console.error('Error en generateProfileSummary:', error);
        return 'Perfil de aprendizaje en construcción.';
    }
}

export default {
    sendMessageToAI,
    getTutorResponse,
    analyzeStudentAnswer,
    generateProfileSummary,
};
