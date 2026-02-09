// Generador de preguntas educativas por tema
// Banco de preguntas predefinidas por asignatura y tema
// Con integración de Khan Academy para STEM

import { getKhanExercises, adaptKhanToQuestions, hasKhanContent } from './khan/khan-fetcher.js';
import { filtrarPorLicencia, generarReporteLicencias } from './licencias-service.js';
import { supabase } from '../supabaseClient';


export const PREGUNTAS_BANCO = {
    'Matemáticas': {
        'Fracciones': [
            { pregunta: '¿Qué es una fracción? Explica sus partes (numerador y denominador)', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Simplifica la fracción 12/16 hasta su forma irreducible', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Resuelve: 2/3 + 1/4. Muestra todo el procedimiento', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Convierte 3/4 a número decimal', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Ordena de menor a mayor: 1/2, 3/5, 2/3', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Resuelve: 5/6 - 1/3', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Multiplica: 2/3 × 3/4', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Divide: 4/5 ÷ 2/3', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Encuentra una fracción equivalente a 3/5 multiplicando por 2', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Si tienes 3/4 de pizza y comes 1/2 de esa cantidad, ¿cuánta pizza comiste?', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: '¿Qué fracción es mayor: 5/8 o 3/5? Justifica tu respuesta', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Representa gráficamente la fracción 2/3', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Calcula 1/2 + 1/4 + 1/8', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Convierte el número mixto 2 1/3 a fracción impropia', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Si una caja tiene 24 bombones y te comes 1/6, ¿cuántos bombones quedan?', dificultad: 'media', tipo: 'short_answer' }
        ],
        'Ecuaciones': [
            { pregunta: 'Resuelve: x + 5 = 12', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Despeja x: 3x - 7 = 11', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Resuelve: 2(x + 3) = 14', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es una ecuación de primer grado?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Resuelve: 5x + 2 = 3x + 10', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Plantea y resuelve: El doble de un número más 5 es igual a 17', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Resuelve: x/4 = 3', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Despeja x: 2x - 5 = x + 3', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Resuelve: 3(x - 2) + 4 = 2x + 5', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Verifica si x = 4 es solución de 3x - 2 = 10', dificultad: 'fácil', tipo: 'short_answer' }
        ],
        'Geometría': [
            { pregunta: 'Calcula el área de un rectángulo de base 8 cm y altura 5 cm', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Calcula el perímetro de un cuadrado de lado 6 cm', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Cuántos grados suma los ángulos internos de un triángulo?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Calcula el área de un círculo de radio 4 cm (π = 3.14)', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Define qué es un ángulo recto', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Clasifica un triángulo con lados 5, 5 y 8 cm', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Calcula el perímetro de un círculo de radio 3 cm', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es un polígono regular?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Calcula el área de un triángulo de base 10 cm y altura 6 cm', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Un pentágono tiene _____ lados', dificultad: 'fácil', tipo: 'short_answer' }
        ]
    },
    'Lengua Castellana': {
        'Ortografía': [
            { pregunta: 'Escribe 3 palabras que lleven tilde diacrítica', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Cuándo se usa "b" en vez de "v"? Da una regla', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Corrige: "Ayer fue al parke"', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Explica la diferencia entre "tuvo" y "tubo"', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Pon tilde donde corresponda: "El medico opero al paciente"', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué son las palabras agudas? Da 2 ejemplos', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Escribe una oración usando "haya" y otra usando "halla"', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Cuándo usamos mayúscula inicial?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Divide en sílabas: "murciélago"', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué palabras llevan siempre tilde en interrogativos?', dificultad: 'media', tipo: 'short_answer' }
        ],
        'Sintaxis': [
            { pregunta: '¿Qué es un sujeto? Identifícalo en: "María come manzanas"', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Identifica el predicado en: "Los niños juegan en el parque"', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Clasifica la oración: "¡Qué bonito día!"', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es un complemento directo? Da un ejemplo', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Transforma a voz pasiva: "El gato persigue al ratón"', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Identifica los sustantivos en: "El perro ladra fuerte"', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué diferencia hay entre oración simple y compuesta?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Analiza sintácticamente: "Juan compró flores"', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: '¿Qué es un adverbio? Da 3 ejemplos', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Identifica el complemento circunstancial en: "Comí ayer en casa"', dificultad: 'media', tipo: 'short_answer' }
        ]
    },
    'Ciencias Naturales': {
        'Los seres vivos': [
            { pregunta: '¿Cuáles son las 5 funciones vitales de los seres vivos?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Diferencia entre célula animal y vegetal', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es la fotosíntesis?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra los 5 reinos de los seres vivos', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué animales son vertebrados? Da 3 ejemplos', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Explica qué es un ecosistema', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es la cadena alimentaria?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Diferencia entre herbívoro, carnívoro y omnívoro', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué órganos forman el aparato respiratorio?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Explica la función del corazón', dificultad: 'media', tipo: 'short_answer' }
        ]
    },
    'Ciencias Sociales': {
        'El Clima de España': [
            // Preguntas tradicionales
            { pregunta: '¿Qué tipo de clima tiene tu comunidad autónoma?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra 3 provincias de España que tengan clima mediterráneo', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿En qué se diferencia el clima oceánico del clima mediterráneo?', dificultad: 'media', tipo: 'short_answer' },

            // Verdadero/Falso
            { pregunta: 'VERDADERO O FALSO: En el clima mediterráneo llueve mucho en verano', respuesta_correcta: 'Falso', explicacion: 'Los veranos mediterráneos son secos', dificultad: 'fácil', tipo: 'true_false' },
            { pregunta: 'VERDADERO O FALSO: Galicia tiene clima oceánico', respuesta_correcta: 'Verdadero', dificultad: 'fácil', tipo: 'true_false' },
            { pregunta: 'VERDADERO O FALSO: El clima y el tiempo atmosférico son lo mismo', respuesta_correcta: 'Falso', explicacion: 'El tiempo es de un día, el clima es el promedio de años', dificultad: 'media', tipo: 'true_false' },

            // Rellenar huecos
            { pregunta: 'Completa: El clima ________ es típico de Andalucía (mediterráneo/oceánico/continental)', respuesta_correcta: 'mediterráneo', dificultad: 'fácil', tipo: 'fill_blank' },
            { pregunta: 'Completa: El instrumento que mide la temperatura se llama ________', respuesta_correcta: 'termómetro', dificultad: 'fácil', tipo: 'fill_blank' },
            { pregunta: 'Completa: Las Islas Canarias tienen clima ________ (subtropical/mediterráneo/oceánico)', respuesta_correcta: 'subtropical', dificultad: 'media', tipo: 'fill_blank' },


            // Mapas (con imagen real)
            { pregunta: 'Señala en el mapa de España las zonas con clima oceánico', dificultad: 'media', tipo: 'map_exercise', imagen: '/images/clima/mapa_espana_climas.png' },
            { pregunta: 'Observa el mapa. ¿De qué color están las zonas de clima oceánico? ¿Y el mediterráneo?', dificultad: 'media', tipo: 'map_exercise', imagen: '/images/clima/mapa_espana_climas.png' },

            // Con imágenes (paisajes reales)
            { pregunta: 'Observa estas dos fotografías. La primera muestra un paisaje verde y húmedo. La segunda es seca y soleada. ¿Cuál corresponde al clima oceánico y cuál al mediterráneo?', dificultad: 'fácil', tipo: 'image_question', imagenes: ['/images/clima/paisaje_oceanico.png', '/images/clima/paisaje_mediterraneo.png'], respuesta_correcta: 'Primera: Oceánico, Segunda: Mediterráneo' },

            // Gráficos (climograma real)
            { pregunta: 'Observa el climograma de Madrid. ¿En qué meses llueve más?', dificultad: 'media', tipo: 'chart_interpretation', imagen: '/images/clima/climograma_madrid.png', respuesta_correcta: 'Abril-Mayo y Octubre-Noviembre' },

            // Relacionar
            { pregunta: 'Relaciona: Clima mediterráneo → ?, Clima oceánico → ?, Clima continental → ? (Opciones: Veranos secos/Lluvia todo el año/Inviernos fríos)', dificultad: 'media', tipo: 'match_columns' },
            { pregunta: 'Relaciona cada comunidad con su clima: Galicia → ?, Andalucía → ?, Canarias → ? (Opciones: Oceánico/Mediterráneo/Subtropical)', dificultad: 'media', tipo: 'match_columns' },

            // Aplicación práctica
            { pregunta: 'Vas de vacaciones a Málaga en agosto. ¿Qué clima te encontrarás? ¿Qué ropa deberías llevar?', dificultad: 'media', tipo: 'practical_application' },
            { pregunta: 'Tu familia quiere cultivar naranjos. ¿En qué zona climática de España sería mejor? ¿Por qué?', dificultad: 'difícil', tipo: 'practical_application' },

            // Causa-efecto
            { pregunta: '¿Por qué en Galicia hay más ríos caudalosos que en Almería?', respuesta_correcta: 'Porque en Galicia llueve mucho (clima oceánico) y en Almería poco', dificultad: 'media', tipo: 'cause_effect' },
            { pregunta: '¿Qué zonas de España tienen clima de montaña?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Describe las temperaturas y lluvias del clima mediterráneo', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Por qué llueve más en Galicia que en Andalucía?', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: 'Completa: El clima subtropical se encuentra en las Islas _____', respuesta_correcta: 'Canarias', dificultad: 'fácil', tipo: 'fill_blank' },
            { pregunta: '¿Qué río español tiene más agua: el Miño o el Segura? ¿Por qué?', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: '¿Cuál es la diferencia entre tiempo meteorológico y clima?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Nombra 2 ciudades españolas con clima continental', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿En qué estación del año llueve más en clima mediterráneo?', respuesta_correcta: 'Otoño y primavera', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué cultivos se dan mejor en clima mediterráneo?', respuesta_correcta: 'Olivos, naranjos, vid', dificultad: 'media', tipo: 'short_answer' },

            // Investigación
            { pregunta: '[INVESTIGACIÓN] Averigua cuál es el clima de tu localidad y completa: temperaturas en verano, en invierno, cuándo llueve más', dificultad: 'media', tipo: 'research' },

            // Esquemas
            { pregunta: '[ESQUEMA] Completa el esquema: CLIMA → Temperatura (instrumento: ?), Precipitaciones (instrumento: ?), Viento (instrumento: ?)', dificultad: 'media', tipo: 'diagram' }
        ],
        'Geografía de España': [
            { pregunta: 'Nombra las 5 cordilleras más importantes de España', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué océano y qué mar bañan las costas españolas?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Cuál es el pico más alto de España? ¿Dónde está?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Nombra 4 ríos españoles y en qué vertiente desembocan', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué son las comunidades autónomas? ¿Cuántas hay?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Cuál es la capital de España? ¿Y de tu comunidad?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra las 4 provincias de Galicia', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué islas forman el archipiélago balear?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿En qué continente está España?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Describe el relieve de la Meseta Central', dificultad: 'media', tipo: 'short_answer' }
        ],
        'Historia de España': [
            { pregunta: '¿Quiénes fueron los romanos? ¿Qué dejaron en España?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Nombra 3 monumentos romanos que aún existen en España', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué lenguas de España vienen del latín?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Quiénes fueron los Reyes Católicos?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿En qué año descubrió Colón América?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra 2 pueblos que vivieron en España antes de los romanos', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es un acueducto romano? Nombra uno famoso', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué construyeron los árabes en España? Da 2 ejemplos', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Cuántos años estuvieron los romanos en España aproximadamente?', dificultad: 'difícil', tipo: 'short_answer' },
            { pregunta: '¿Qué es la Alhambra de Granada?', dificultad: 'fácil', tipo: 'short_answer' }
        ],
        'La población': [
            { pregunta: '¿Qué significa que una zona está densamente poblada?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra 3 ciudades españolas con más de 500.000 habitantes', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es la emigración? ¿Y la inmigración?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Por qué hay más población en las costas que en el interior?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Diferencia entre pueblo y ciudad', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué servicios hay en una ciudad grande?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Nombra 3 pueblos de tu provincia', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Cuántos habitantes tiene aproximadamente tu municipio?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué es un censo de población?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué provincias españolas tienen menos habitantes?', dificultad: 'difícil', tipo: 'short_answer' }
        ],
        'Los sectores económicos': [
            { pregunta: '¿Qué es el sector primario? Da 3 ejemplos de trabajos', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué es el sector secundario? Nombra 3 industrias', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Qué trabajos pertenecen al sector terciario o de servicios?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué cultivos son importantes en España?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: 'Nombra 3 productos que España exporta a otros países', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es la ganadería? Nombra tipos de ganado', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿Por qué es importante el turismo en España?', dificultad: 'media', tipo: 'short_answer' },
            { pregunta: '¿Qué es una fábrica? ¿Qué producen?', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: 'Describe el trabajo de un agricultor', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '¿En qué sector trabajan tus padres?', dificultad: 'fácil', tipo: 'short_answer' }
        ]
    },
    'default': [
        // FALLBACK ACADÉMICO (En caso de fallo de IA/Base de Datos)
        // Estas tareas requieren estudio activo, no son "preguntas de opinión".
        { pregunta: 'Investigación: Busca la definición oficial de este concepto en el diccionario de la RAE o Wikipedia', dificultad: 'media', tipo: 'short_answer' },
        { pregunta: 'Síntesis: Escribe un resumen técnico de 5 líneas sobre este tema (usa vocabulario preciso)', dificultad: 'difícil', tipo: 'short_answer' },
        { pregunta: 'Fuentes: Identifica 3 fuentes fiables (libros o webs oficiales) para estudiar este tema', dificultad: 'media', tipo: 'short_answer' },
        { pregunta: 'Glosario: Crea un glosario con los 3 términos técnicos más importantes de este tema y defínelos', dificultad: 'media', tipo: 'short_answer' },
        { pregunta: 'Aplicación: Explica por qué este tema es importante en la vida real (da 2 ejemplos concretos)', dificultad: 'media', tipo: 'short_answer' },
        { pregunta: 'Metacognición Activa: Formula 3 preguntas de examen tipo test que le pondrías a un alumno sobre este tema', dificultad: 'difícil', tipo: 'short_answer' },
        { pregunta: 'Esquema: Crea una lista ordenada de los pasos o componentes principales de este tema', dificultad: 'media', tipo: 'short_answer' },
        { pregunta: 'Conexión: ¿Con qué otro tema de la asignatura se relaciona directamente? Explica la conexión', dificultad: 'difícil', tipo: 'short_answer' },
        { pregunta: 'Lectura Crítica: Lee el título del tema. ¿Qué crees que vamos a estudiar? (Hipótesis basada en conocimientos previos)', dificultad: 'fácil', tipo: 'short_answer' },
        { pregunta: 'Vocabulario: Identifica la palabra más difícil de este tema y busca su etimología u origen', dificultad: 'difícil', tipo: 'short_answer' }
    ]
};

/**
 * Fisher-Yates shuffle - Algoritmo de aleatorización perfecta
 * Garantiza que cada permutación tenga la misma probabilidad
 */
function shuffleArray(array) {
    const shuffled = [...array]; // Crear copia
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Obtener preguntas específicas para un tema
 * NUEVA ESTRATEGIA: COMBINAR TODAS LAS FUENTES
 * - Khan Academy/Santillana
 * - Banco de Preguntas específico
 * - Default (solo si no hay nada)
 * 
 * Esto da máxima variedad y cantidad de preguntas
 */
export async function obtenerPreguntasPorTema(asignatura, tema, numPreguntas = 10, curso = null, options = {}) {
    console.log(`📚 Obteniendo preguntas: ${asignatura} - ${tema}${curso ? ` (${curso})` : ''}`);

    const todasLasPreguntas = [];

    // FUENTE 1: Khan Academy/Santillana
    console.log('🎓 Buscando en Khan Academy/Santillana...');
    try {
        const khanData = await getKhanExercises({ asignatura, tema, cantidad: 100, curso }); // Pedir todas
        if (khanData && khanData.ejercicios && khanData.ejercicios.length > 0) {
            const preguntasKhan = adaptKhanToQuestions(khanData);
            todasLasPreguntas.push(...preguntasKhan);
            console.log(`✅ ${preguntasKhan.length} preguntas de Khan Academy/Santillana`);
        }
    } catch (error) {
        console.warn('⚠️ Error obteniendo Khan Academy/Santillana:', error);
    }

    // FUENTE 2: Banco de Preguntas (Supabase - NEURO-ENHANCED)
    console.log('📖 Buscando en Banco de Preguntas (Supabase)...');

    try {
        let query = supabase
            .from('question_bank_local')
            .select('*')
            .ilike('topic', `%${tema}%`);

        // Filtro por asignatura (si existe)
        if (asignatura) {
            // Normalizar un poco para evitar fallos tontos (Matemáticas vs Matematicas)
            const subj = asignatura.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            query = query.ilike('subject', `%${subj}%`);
        }

        // --- FILTRO QUIRÚRGICO (NEURO-EDUCACIÓN) ---
        // 1. Foco Pedagógico basado en Nivel de Reto
        const challenge = options?.challenge_level || 'standard';

        if (challenge === 'refuerzo') {
            // Refuerzo = Conceptos/Procedimientos + Dificultad Baja/Media
            query = query.in('foco_pedagogico', ['concepto', 'procedimiento'])
                .in('difficulty', ['fácil', 'facil', 'media']);
            console.log('🎯 Filtro Quirúrgico: REFUERZO (Conceptos/Proc + Fácil/Media)');
        } else if (challenge === 'ampliacion' || challenge === 'reto') {
            // Ampliación = Aplicación + Dificultad Media/Alta
            query = query.eq('foco_pedagogico', 'aplicacion')
                .in('difficulty', ['media', 'difícil', 'dificil']);
            console.log('🎯 Filtro Quirúrgico: AMPLIACIÓN (Aplicación + Media/Difícil)');
        } else {
            // Estándar (Default) = Evitar dificultad 'difícil' excesiva, centrado en currículo regular (Media/Fácil)
            // No filtramos foco, pero limitamos la dificultad para asegurar accesibilidad base
            query = query.in('difficulty', ['fácil', 'facil', 'media']);
            console.log('🎯 Filtro Quirúrgico: ESTÁNDAR (Fácil/Media)');
        }

        // 2. Estilo de Aprendizaje (VARK) - ESTRATEGIA "MIX & MATCH"
        // En lugar de filtrar solo por el dominante, buscamos coincidencia con los 2 estilos principales
        // Esto evita el "Estereotipo" y ofrece variedad (balanceada hacia sus fortalezas)
        let targetStyles = [];

        if (options?.vark_scores) {
            // Si tenemos puntuaciones detalladas, cogemos las 2 más altas
            // Ejemplo: { visual: 10, aural: 8, kinesthetic: 2, read_write: 5 } -> ['visual', 'aural']
            targetStyles = Object.entries(options.vark_scores)
                .sort(([, a], [, b]) => b - a) // Ordenar por puntuación desc
                .slice(0, 2) // Top 2
                .map(([style]) => style);

            console.log(`🎯 Filtro Quirúrgico: Estilos Top 2 Multi-modal (${targetStyles.join('+')})`);
        } else if (options?.learning_style) {
            // Fallback a solo dominante si no hay scores
            targetStyles = [options.learning_style.toLowerCase()];
            console.log(`🎯 Filtro Quirúrgico: Estilo Dominante (${targetStyles[0]})`);
        }

        if (targetStyles.length > 0) {
            // Postgres array overlap: match ANY of the target styles
            // Si el niño es Visual+Kinestésico, nos valen preguntas visuales O kinestésicas
            query = query.overlaps('vark_styles', targetStyles);
        }

        const { data: dbQuestions, error } = await query.limit(50);

        if (error) throw error;

        if (dbQuestions && dbQuestions.length > 0) {
            const adaptedDB = dbQuestions.map(q => ({
                pregunta: q.question_text,
                tipo: q.question_type || 'short_answer',
                dificultad: q.difficulty || 'media',
                fuente: 'LOCAL_DB',
                // Preserve Neuro Tags for UI debug
                tags: {
                    foco: q.foco_pedagogico,
                    vark: q.vark_styles,
                    mi: q.multiple_intelligences
                }
            }));
            todasLasPreguntas.push(...adaptedDB);
            console.log(`✅ ${dbQuestions.length} preguntas de Supabase (Neuro-Tagged)`);
        }
    } catch (err) {
        console.error("❌ Error consultando Supabase:", err);
        // Fallback to hardcoded if DB fails
        const preguntasAsignatura = PREGUNTAS_BANCO[asignatura] || {};
        let preguntasBanco = preguntasAsignatura[tema];
        if (preguntasBanco) todasLasPreguntas.push(...preguntasBanco);
    }


    // FUENTE 3: Default (DESACTIVADO: Preferimos devolver array vacío para desencadenar AI Fallback)
    /*
    if (todasLasPreguntas.length === 0) {
        console.log('⚠️ No hay preguntas específicas, usando default');
        todasLasPreguntas.push(...PREGUNTAS_BANCO['default']);
    }
    */

    console.log(`🎯 TOTAL combinado: ${todasLasPreguntas.length} preguntas de todas las fuentes`);

    // FILTRAR POR LICENCIA (remover contenido NC en entorno comercial)
    const preguntasFiltradas = filtrarPorLicencia(todasLasPreguntas);

    if (preguntasFiltradas.length < todasLasPreguntas.length) {
        console.log(`🔒 Filtradas ${todasLasPreguntas.length - preguntasFiltradas.length} preguntas por restricciones de licencia`);
    }

    // ALEATORIZAR TODO con Fisher-Yates
    const preguntasAleatorias = shuffleArray(preguntasFiltradas);

    // FIX: Si no hay preguntas, devolver vacío (Evitar división por cero/NaN en módulo)
    if (preguntasAleatorias.length === 0) {
        return [];
    }

    // Tomar las preguntas necesarias
    const resultado = [];
    for (let i = 0; i < numPreguntas; i++) {
        const pregunta = preguntasAleatorias[i % preguntasAleatorias.length];
        resultado.push({
            ...pregunta,
            numero: i + 1
        });
    }

    return resultado;
}

