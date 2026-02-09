// CONTENIDO 5º PRIMARIA - LENGUA CASTELLANA
// Para niños de 10-11 años

export const QUINTO_PRIMARIA_LENGUA = {
    'Lengua Castellana': {
        'Ortografía y acentuación': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Agudas', ejercicio: '¿Qué son las palabras agudas? Da 2 ejemplos', respuesta: 'Palabras con sílaba tónica en la última. Ejemplos: cafÉ, colibrÍ, canción', explicacion: 'Llevan tilde si terminan en n, s o vocal' },
                { tipo: 'Llanas', ejercicio: '¿Qué son las palabras llanas? Da 2 ejemplos', respuesta: 'Palabras con sílaba tónica en la penúltima. Ejemplos: LÁpiz, ÁRbol', explicacion: 'Llevan tilde si NO terminan en n, s o vocal' },
                { tipo: 'Esdrújulas', ejercicio: '¿Qué son las palabras esdrújulas?', respuesta: 'Palabras con sílaba tónica en la antepenúltima. Ejemplos: MÉdico, pájaro', explicacion: 'SIEMPRE llevan tilde' },
                { tipo: 'Tildar', ejercicio: 'Pon tilde donde corresponda: "El medico opero al paciente en el quirofano"', respuesta: 'El médico operó al paciente en el quirófano', explicacion: 'Médico, quirófano (esdrújulas), operó (aguda terminada en vocal)' },
                { tipo: 'Diptongo', ejercicio: '¿Qué es un diptongo? Da un ejemplo', respuesta: 'Unión de dos vocales en la misma sílaba. Ejemplo: cua-derno, pien-so', explicacion: 'Vocal fuerte + débil, o débil + débil' },
                { tipo: 'Hiato', ejercicio: '¿Qué es un hiato? Da un ejemplo', respuesta: 'Separación de dos vocales en sílabas distintas. Ejemplo: ma-íz, le-ón', explicacion: 'Dos vocales fuertes, o débil tónica + fuerte' },
                { tipo: 'Homófonas', ejercicio: 'Diferencia entre "tuvo" y "tubo"', respuesta: 'Tuvo (verbo tener), tubo (cilindro)', explicacion: 'Tuvo = él/ella tuvo algo. Tubo = objeto cilíndrico' },
                { tipo: 'Mayúsculas', ejercicio: '¿Cuándo usamos mayúscula inicial?', respuesta: 'Al empezar una oración, nombres propios, después de punto', explicacion: 'También en títulos, nombres de lugares, etc.' },
                { tipo: 'B/V', ejercicio: '¿Cuándo se escribe "b" antes de consonante?', respuesta: 'Siempre se escribe "b" antes de consonante', explicacion: 'Ejemplos: blanco, brazo, obsequio, obvio' },
                { tipo: 'H', ejercicio: 'Di 3 palabras que empiecen por "hie-" o "hue-"', respuesta: 'Hierba, hierro, hielo, huevo, hueso, huerto', explicacion: 'Las palabras que empiezan con estos diptongos llevan h' }
            ]
        },

        'Gramática: Clases de palabras': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Sustantivo', ejercicio: '¿Qué es un sustantivo? Da 3 ejemplos', respuesta: 'Palabra que nombra personas, animales o cosas. Ejemplos: niño, perro, mesa', explicacion: 'También llamados nombres' },
                { tipo: 'Adjetivo', ejercicio: '¿Qué es un adjetivo? Da 3 ejemplos', respuesta: 'Palabra que describe o califica al sustantivo. Ejemplos: grande, azul, inteligente', explicacion: 'Acompaña al sustantivo' },
                { tipo: 'Verbo', ejercicio: '¿Qué es un verbo? Da 3 ejemplos', respuesta: 'Palabra que expresa acción o estado. Ejemplos: correr, saltar, ser', explicacion: 'Indica lo que se hace o cómo se está' },
                { tipo: 'Determinante', ejercicio: '¿Qué es un determinante? Da ejemplos', respuesta: 'Palabra que acompaña al sustantivo. Ejemplos: el, la, un, mi, este', explicacion: 'Artículos, posesivos, demostrativos, etc.' },
                { tipo: 'Pronombre', ejercicio: '¿Qué es un pronombre? Da 3 ejemplos', respuesta: 'Palabra que sustituye al nombre. Ejemplos: yo, tú, él, nosotros', explicacion: 'Evita repetir el sustantivo' },
                { tipo: 'Adverbio', ejercicio: '¿Qué es un adverbio? Da 3 ejemplos', respuesta: 'Palabra que modifica al verbo, adjetivo u otro adverbio. Ejemplos: bien, rápido, muy', explicacion: 'Indica lugar, tiempo, modo, cantidad...' },
                { tipo: 'Preposición', ejercicio: 'Di 5 preposiciones', respuesta: 'a, ante, bajo, con, contra, de, desde, en, entre, para, por, sin, sobre', explicacion: 'Palabras invariables que relacionan otras palabras' },
                { tipo: 'Conjunción', ejercicio: '¿Qué es una conjunción? Da 3 ejemplos', respuesta: 'Palabra que une otras palabras u oraciones. Ejemplos: y, o, pero', explicacion: 'Sirven para conectar ideas' },
                { tipo: 'Identificar', ejercicio: 'En "El perro negro corre rápido", ¿cuál es el adjetivo?', respuesta: 'negro', explicacion: 'Negro describe al sustantivo perro' },
                { tipo: 'Identificar 2', ejercicio: 'En "María come manzanas", ¿cuál es el verbo?', respuesta: 'come', explicacion: 'Come expresa la acción que realiza María' }
            ]
        },

        'Sintaxis: La oración': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Sujeto', ejercicio: 'Identifica el sujeto en: "Los niños juegan en el parque"', respuesta: 'Los niños', explicacion: 'El sujeto es quien realiza la acción del verbo' },
                { tipo: 'Predicado', ejercicio: 'Identifica el predicado en: "María estudia matemáticas"', respuesta: 'estudia matemáticas', explicacion: 'El predicado es lo que se dice del sujeto' },
                { tipo: 'C. Directo', ejercicio: '¿Qué es el complemento directo? Identifícalo en: "Juan come pan"', respuesta: 'El objeto que recibe la acción. C.D. = pan', explicacion: 'Responde a "¿qué come Juan?" → pan' },
                { tipo: 'C. Indirecto', ejercicio: 'Identifica el C.I. en: "María da un regalo a su madre"', respuesta: 'a su madre', explicacion: 'Responde a "¿a quién da el regalo?" → a su madre' },
                { tipo: 'C. Circunstancial', ejercicio: 'Identifica el C.C. de lugar en: "Jugamos en el patio"', respuesta: 'en el patio', explicacion: 'Indica dónde se realiza la acción' },
                { tipo: 'Núcleo sujeto', ejercicio: '¿Cuál es el núcleo del sujeto en: "El perro grande ladra"?', respuesta: 'perro', explicacion: 'El núcleo es la palabra principal del sujeto (sustantivo o pronombre)' },
                { tipo: 'Núcleo predicado', ejercicio: '¿Cuál es el núcleo del predicado en: "Los niños corren rápido"?', respuesta: 'corren', explicacion: 'El núcleo del predicado es el verbo' },
                { tipo: 'Oración simple', ejercicio: '¿Qué es una oración simple?', respuesta: 'Oración con un solo verbo', explicacion: 'Ejemplo: "María lee un libro"' },
                { tipo: 'Análisis', ejercicio: 'Analiza: "El gato duerme en el sofá" (sujeto y predicado)', respuesta: 'Sujeto: El gato / Predicado: duerme en el sofá', explicacion: 'Identificamos quién hace la acción y qué se dice de él' },
                { tipo: 'Concordancia', ejercicio: 'Corrige: "Los niño juega"', respuesta: 'Los niños juegan', explicacion: 'Debe haber concordancia en número: plural con plural' }
            ]
        },

        'Comprensión lectora': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Idea principal', ejercicio: '¿Qué es la idea principal de un texto?', respuesta: 'El tema central o mensaje más importante del texto', explicacion: 'Resume de qué trata el texto principalmente' },
                { tipo: 'Ideas secundarias', ejercicio: '¿Qué son las ideas secundarias?', respuesta: 'Ideas que apoyan o desarrollan la idea principal', explicacion: 'Aportan detalles, ejemplos o explicaciones' },
                { tipo: 'Resumen', ejercicio: '¿Qué debe incluir un buen resumen?', respuesta: 'Las ideas principales del texto, con tus propias palabras, de forma breve', explicacion: 'Sin detalles innecesarios, solo lo esencial' },
                { tipo: 'Inferir', ejercicio: '¿Qué significa "inferir" en un texto?', respuesta: 'Deducir información que no está explícita en el texto', explicacion: 'Sacar conclusiones basándose en pistas del texto' },
                { tipo: 'Vocabulario', ejercicio: '¿Qué estrategias usas para entender palabras desconocidas?', respuesta: 'Contexto, diccionario, descomponerla en partes (prefijos, raíces)', explicacion: 'El contexto suele dar pistas sobre el significado' },
                { tipo: 'Causa-efecto', ejercicio: '¿Qué es una relación causa-efecto?', respuesta: 'Cuando una acción (causa) provoca una consecuencia (efecto)', explicacion: 'Ejemplo: Estudié mucho (causa) → saqué buena nota (efecto)' },
                { tipo: 'Narrador', ejercicio: '¿Qué es el narrador en 1ª persona?', respuesta: 'Cuando quien cuenta la historia es un personaje (usa "yo")', explicacion: 'Ejemplo: "Yo fui al parque"' },
                { tipo: 'Narrador 3ª', ejercicio: '¿Qué es el narrador en 3ª persona?', respuesta: 'Cuando quien cuenta la historia está fuera de ella (usa "él", "ella")', explicacion: 'Ejemplo: "Juan fue al parque"' },
                { tipo: 'Personajes', ejercicio: '¿Qué es el personaje principal?', respuesta: 'El protagonista, el más importante de la historia', explicacion: 'La historia gira en torno a él' },
                { tipo: 'Estructura', ejercicio: '¿Cuáles son las partes de un cuento?', respuesta: 'Inicio (presentación), nudo (desarrollo/conflicto), desenlace (final)', explicacion: 'Estructura básica narrativa' }
            ]
        },

        'Expresión escrita': {
            source: '5º Primaria',
            nivel: '5º Primaria',
            ejercicios: [
                { tipo: 'Descripción', ejercicio: '¿Qué debe incluir una buena descripción?', respuesta: 'Características físicas, cualidades, detalles sensoriales (cómo es, cómo huele, suena...)', explicacion: 'Usar adjetivos y comparaciones' },
                { tipo: 'Narración', ejercicio: '¿Qué elementos debe tener una narración?', respuesta: 'Personajes, lugar, tiempo, acciones ordenadas', explicacion: 'Contar qué pasó, a quién, dónde y cuándo' },
                { tipo: 'Diálogo', ejercicio: '¿Cómo se escribe un diálogo?', respuesta: 'Con guion (—) para cada intervención y en línea aparte', explicacion: 'Ejemplo: —Hola, ¿cómo estás? —Bien, gracias' },
                { tipo: 'Carta', ejercicio: '¿Cuáles son las partes de una carta?', respuesta: 'Fecha, saludo, cuerpo, despedida, firma', explicacion: 'Estructura formal de una carta' },
                { tipo: 'Noticia', ejercicio: '¿Qué preguntas debe responder una noticia?', respuesta: '¿Qué? ¿Quién? ¿Cuándo? ¿Dónde? ¿Cómo? ¿Por qué?', explicacion: 'Las 6W del periodismo' },
                { tipo: 'Conectores', ejercicio: 'Di 3 conectores para ordenar una narración', respuesta: 'Primero, después, finalmente / Al principio, luego, por último', explicacion: 'Ayudan a seguir el orden de los hechos' },
                { tipo: 'Sinónimos', ejercicio: '¿Para qué sirven los sinónimos en un texto?', respuesta: 'Para evitar repeticiones y enriquecer el vocabulario', explicacion: 'Ejemplo: bonito, hermoso, bello' },
                { tipo: 'Párrafo', ejercicio: '¿Qué es un párrafo?', respuesta: 'Conjunto de oraciones sobre una misma idea', explicacion: 'Empieza con mayúscula y termina en punto y aparte' },
                { tipo: 'Borrador', ejercicio: '¿Para qué sirve hacer un borrador?', respuesta: 'Para organizar ideas antes de escribir el texto final', explicacion: 'Permite corregir y mejorar antes de la versión definitiva' },
                { tipo: 'Revisar', ejercicio: '¿Qué debes revisar en un texto antes de entregarlo?', respuesta: 'Ortografía, puntuación, coherencia, presentación', explicacion: 'Siempre leer y corregir el texto' }
            ]
        }
    }
};

export default { QUINTO_PRIMARIA_LENGUA };
