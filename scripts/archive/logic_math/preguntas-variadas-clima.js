// PREGUNTAS VARIADAS PARA "EL CLIMA DE ESPAÑA" - 4º PRIMARIA
// Incluye diferentes tipos de ejercicios del currículum español

export const CLIMA_ESPANA_VARIADO = {
    'Ciencias Sociales': {
        'El Clima de España - Ampliado': [
            // ========== VERDADERO/FALSO ==========
            {
                tipo: 'true_false',
                pregunta: 'En el clima mediterráneo llueve mucho en verano',
                respuesta: false,
                explicacion: 'En el clima mediterráneo los veranos son secos, llueve en otoño y primavera',
                dificultad: 'fácil'
            },
            {
                tipo: 'true_false',
                pregunta: 'Galicia tiene clima oceánico',
                respuesta: true,
                explicacion: 'Galicia está en el norte de España y tiene clima oceánico atlántico',
                dificultad: 'fácil'
            },
            {
                tipo: 'true_false',
                pregunta: 'El clima y el tiempo atmosférico son lo mismo',
                respuesta: false,
                explicacion: 'El tiempo es de un día, el clima es el promedio de muchos años',
                dificultad: 'media'
            },

            // ========== RELLENAR HUECOS ==========
            {
                tipo: 'fill_blank',
                pregunta: 'El clima ________ es típico de Andalucía y la costa este de España.',
                respuesta: 'mediterráneo',
                opciones: ['mediterráneo', 'oceánico', 'continental', 'subtropical'],
                explicacion: 'El mediterráneo es el clima de la costa este',
                dificultad: 'fácil'
            },
            {
                tipo: 'fill_blank',
                pregunta: 'El instrumento que mide la temperatura se llama ________.',
                respuesta: 'termómetro',
                opciones: ['termómetro', 'pluviómetro', 'barómetro', 'anemómetro'],
                explicacion: 'El termómetro mide la temperatura',
                dificultad: 'fácil'
            },
            {
                tipo: 'fill_blank',
                pregunta: 'Las Islas Canarias tienen clima ________, con temperaturas suaves todo el año.',
                respuesta: 'subtropical',
                opciones: ['subtropical', 'mediterráneo', 'oceánico', 'continental'],
                explicacion: 'Canarias tiene clima subtropical por su ubicación',
                dificultad: 'media'
            },

            // ========== RELACIONAR COLUMNAS ==========
            {
                tipo: 'match_columns',
                pregunta: 'Relaciona cada tipo de clima con su característica:',
                columna_a: [
                    'Clima mediterráneo',
                    'Clima oceánico',
                    'Clima continental',
                    'Clima subtropical'
                ],
                columna_b: [
                    'Veranos secos y calurosos',
                    'Llueve todo el año',
                    'Veranos calurosos e inviernos fríos',
                    'Temperaturas suaves siempre'
                ],
                respuestas_correctas: {
                    'Clima mediterráneo': 'Veranos secos y calurosos',
                    'Clima oceánico': 'Llueve todo el año',
                    'Clima continental': 'Veranos calurosos e inviernos fríos',
                    'Clima subtropical': 'Temperaturas suaves siempre'
                },
                dificultad: 'media'
            },
            {
                tipo: 'match_columns',
                pregunta: 'Relaciona cada comunidad autónoma con su clima:',
                columna_a: [
                    'Galicia',
                    'Andalucía',
                    'Castilla y León',
                    'Canarias'
                ],
                columna_b: [
                    'Oceánico',
                    'Mediterráneo',
                    'Continental',
                    'Subtropical'
                ],
                respuestas_correctas: {
                    'Galicia': 'Oceánico',
                    'Andalucía': 'Mediterráneo',
                    'Castilla y León': 'Continental',
                    'Canarias': 'Subtropical'
                },
                dificultad: 'media'
            },

            // ========== MAPA/IMAGEN ==========
            {
                tipo: 'map_exercise',
                pregunta: 'Observa el mapa de España. Colorea de AZUL las zonas con clima oceánico, de AMARILLO las de clima mediterráneo y de ROJO las de clima continental.',
                imagen: 'mapa_espana_mudo.png',
                instrucciones: 'Usa los colores indicados para señalar cada zona climática',
                respuesta_imagen: 'mapa_espana_climas_solucion.png',
                dificultad: 'media',
                tipo_evaluacion: 'visual'
            },
            {
                tipo: 'image_question',
                pregunta: 'Observa estas dos fotografías. ¿Cuál corresponde a un paisaje de clima oceánico y cuál a clima mediterráneo?',
                imagenes: ['paisaje_verde_lluvia.png', 'paisaje_seco_sol.png'],
                respuesta: 'Imagen 1: Oceánico (verde, húmedo), Imagen 2: Mediterráneo (seco, cálido)',
                explicacion: 'El clima oceánico tiene paisajes verdes por la abundante lluvia',
                dificultad: 'fácil'
            },

            // ========== GRÁFICOS ==========
            {
                tipo: 'chart_interpretation',
                pregunta: 'Observa el climograma de Madrid. ¿En qué meses llueve más?',
                imagen: 'climograma_madrid.png',
                opciones: ['Enero-Febrero', 'Abril-Mayo', 'Julio-Agosto', 'Octubre-Noviembre'],
                respuesta: 'Abril-Mayo',
                explicacion: 'En Madrid (clima continental) llueve más en primavera',
                dificultad: 'media'
            },

            // ========== ORDENAR SECUENCIAS ==========
            {
                tipo: 'order_sequence',
                pregunta: 'Ordena estas comunidades de más lluviosa a menos lluviosa:',
                elementos: ['Galicia', 'Madrid', 'Andalucía', 'Murcia'],
                orden_correcto: ['Galicia', 'Madrid', 'Andalucía', 'Murcia'],
                explicacion: 'Galicia (oceánico) es la más lluviosa, Murcia (mediterráneo seco) la menos',
                dificultad: 'media'
            },

            // ========== COMPARAR ==========
            {
                tipo: 'compare',
                pregunta: 'Completa la tabla comparando el clima oceánico y el mediterráneo:',
                tabla: {
                    headers: ['Característica', 'Clima Oceánico', 'Clima Mediterráneo'],
                    filas: [
                        ['Temperaturas en verano', '______', '______'],
                        ['Lluvias', '______', '______'],
                        ['Ejemplo de ciudad', '______', '______']
                    ]
                },
                respuestas: {
                    'Temperaturas en verano': ['Suaves (20-25°C)', 'Calurosas (>30°C)'],
                    'Lluvias': ['Abundantes todo el año', 'Escasas en verano'],
                    'Ejemplo de ciudad': ['A Coruña', 'Valencia']
                },
                dificultad: 'difícil'
            },

            // ========== DEFINICIONES ==========
            {
                tipo: 'definition',
                pregunta: 'Define con tus palabras qué es una "precipitación"',
                palabras_clave: ['agua', 'cielo', 'lluvia', 'nieve', 'granizo'],
                ejemplo_respuesta: 'Agua que cae del cielo en forma de lluvia, nieve o granizo',
                dificultad: 'fácil'
            },

            // ========== APLICACIÓN PRÁCTICA ==========
            {
                tipo: 'practical_application',
                pregunta: 'Vas a ir de vacaciones a Málaga en agosto. ¿Qué clima te encontrarás? ¿Qué ropa debes llevar?',
                respuesta: 'Clima mediterráneo con mucho calor y sol. Llevar ropa ligera, gorro y protector solar',
                explicacion: 'Málaga tiene clima mediterráneo, los veranos son muy calurosos y secos',
                dificultad: 'media'
            },
            {
                tipo: 'practical_application',
                pregunta: 'Tu familia quiere cultivar naranjos. ¿En qué zona climática de España sería mejor?',
                respuesta: 'En zona de clima mediterráneo (Valencia, Andalucía)',
                explicacion: 'Los naranjos necesitan mucho sol y calor, típico del mediterráneo',
                dificultad: 'difícil'
            },

            // ========== CAUSA-EFECTO ==========
            {
                tipo: 'cause_effect',
                pregunta: '¿Por qué en Galicia hay más ríos caudalosos que en Almería?',
                respuesta: 'Porque en Galicia llueve mucho (clima oceánico) y en Almería llueve poco (clima mediterráneo seco)',
                explicacion: 'La cantidad de lluvia determina el caudal de los ríos',
                dificultad: 'media'
            },

            // ========== INVESTIGACIÓN ==========
            {
                tipo: 'research',
                pregunta: 'Investiga cuál es el clima de tu localidad. Pregunta a tus familiares o busca en internet:',
                puntos_investigar: [
                    '¿Cómo son las temperaturas en verano?',
                    '¿Y en invierno?',
                    '¿Llueve mucho o poco?',
                    '¿En qué época del año llueve más?'
                ],
                dificultad: 'media',
                tipo_evaluacion: 'abierta'
            },

            // ========== ESQUEMAS ==========
            {
                tipo: 'diagram',
                pregunta: 'Completa este esquema sobre los elementos del clima:',
                esquema: `
                    CLIMA
                    ├── Temperatura → Instrumento: _______
                    ├── Precipitaciones → Instrumento: _______
                    └── Viento → Instrumento: _______
                `,
                respuestas: {
                    'Temperatura': 'Termómetro',
                    'Precipitaciones': 'Pluviómetro',
                    'Viento': 'Anemómetro'
                },
                dificultad: 'media'
            }
        ]
    }
};

export default { CLIMA_ESPANA_VARIADO };
