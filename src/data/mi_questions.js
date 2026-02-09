// Cuestionario del Profesor para Diagnosticar Inteligencias Múltiples en Primaria (Armstrong 2001)
export const MI_QUESTIONS = [
    // Inteligencia Lingüística
    { id: 'L1', text: "Escribe mejor que el promedio de su edad.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L2', text: "Cuenta historias, relatos, cuentos y chistes con precisión.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L3', text: "Tiene buena memoria para nombres, plazos, fechas...", category: 'Lingüística', type: 'evaluation' },
    { id: 'L4', text: "Disfruta con los juegos de palabras.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L5', text: "Disfruta con los juegos de lectura.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L6', text: "Pronuncia las palabras de forma precisa (por encima de la media).", category: 'Lingüística', type: 'evaluation' },
    { id: 'L7', text: "Aprecia rimas sin sentido, juegos de palabras...", category: 'Lingüística', type: 'evaluation' },
    { id: 'L8', text: "Disfruta al escuchar.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L9', text: "Se comunica con otros de manera verbal en un nivel alto.", category: 'Lingüística', type: 'evaluation' },
    { id: 'L10', text: "Compara, valora, resume y saca conclusiones con facilidad.", category: 'Lingüística', type: 'evaluation' },

    // Inteligencia Lógico – Matemática
    { id: 'M1', text: "Hace muchas preguntas sobre cómo funcionan las cosas.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M2', text: "Resuelve rápidamente problemas aritméticos en su cabeza.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M3', text: "Disfruta de las clases de matemáticas.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M4', text: "Encuentra interesante los juegos matemáticos.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M5', text: "Disfruta jugando al ajedrez u otros juegos de estrategia.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M6', text: "Disfruta trabajando en puzzles lógicos.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M7', text: "Disfruta categorizando o estableciendo jerarquías.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M8', text: "Le gusta trabajar en tareas que revelan claramente procesos superiores.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M9', text: "Piensa de una forma abstracta o conceptual superior al resto.", category: 'Lógico-Matemática', type: 'evaluation' },
    { id: 'M10', text: "Tiene un buen sentido del proceso causa – efecto con relación a su edad.", category: 'Lógico-Matemática', type: 'evaluation' },

    // Inteligencia Espacial
    { id: 'S1', text: "Lee mapas, diagramas, etc, fácilmente.", category: 'Espacial', type: 'evaluation' },
    { id: 'S2', text: "Sueña despierto más que sus iguales.", category: 'Espacial', type: 'evaluation' },
    { id: 'S3', text: "Disfruta de las actividades artísticas.", category: 'Espacial', type: 'evaluation' },
    { id: 'S4', text: "Dibuja figuras avanzadas para su edad.", category: 'Espacial', type: 'evaluation' },
    { id: 'S5', text: "Le gusta ver filminas, películas u otras presentaciones visuales.", category: 'Espacial', type: 'evaluation' },
    { id: 'S6', text: "Disfruta haciendo puzzles, laberintos o actividades visuales semejantes.", category: 'Espacial', type: 'evaluation' },
    { id: 'S7', text: "Hace construcciones tridimensionales interesantes para su edad.", category: 'Espacial', type: 'evaluation' },
    { id: 'S8', text: "Muestra facilidad para localizar en el espacio, imaginar movimientos, etc...", category: 'Espacial', type: 'evaluation' },
    { id: 'S9', text: "Muestra facilidad para localizar el tiempo.", category: 'Espacial', type: 'evaluation' },
    { id: 'S10', text: "Informa de imágenes visuales claras.", category: 'Espacial', type: 'evaluation' },

    // Inteligencia Corporal – Kinestésica
    { id: 'K1', text: "Sobresale en uno o más deportes.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K2', text: "Mueve, golpea o lleva el ritmo cuando está sentado en un lugar.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K3', text: "Imita inteligentemente los gestos o posturas de otras personas.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K4', text: "Le gusta mover las cosas y cambiarlas frecuentemente.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K5', text: "Frecuentemente toca lo que ve.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K6', text: "Disfruta corriendo, saltando, o realizando actividades semejantes.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K7', text: "Muestra habilidad en la coordinación viso-motora.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K8', text: "Tiene una manera dramática de expresarse.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K9', text: "Informa de diferentes sensaciones físicas mientras piensa o trabaja.", category: 'Corporal-Kinestésica', type: 'evaluation' },
    { id: 'K10', text: "Disfruta trabajando con experiencias táctiles.", category: 'Corporal-Kinestésica', type: 'evaluation' },

    // Inteligencia Musical
    { id: 'Mu1', text: "Recuerda con facilidad melodías y canciones.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu2', text: "Tiene buena voz para cantar.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu3', text: "Toca un instrumento musical o canta en un coro o en otro grupo.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu4', text: "Tiene una manera rítmica de hablar y de moverse.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu5', text: "Tararea para sí mismo de forma inconsciente.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu6', text: "Golpetea rítmicamente sobre la mesa o pupitre mientras trabaja.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu7', text: "Es sensible a los ruidos ambientales.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu8', text: "Responde favorablemente cuando suena una melodía musical.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu9', text: "Canta canciones aprendidas fuera del colegio.", category: 'Musical', type: 'evaluation' },
    { id: 'Mu10', text: "Tiene facilidad para identificar sonidos diferentes y percibir matices.", category: 'Musical', type: 'evaluation' },

    // Inteligencia Naturalista
    { id: 'N1', text: "Disfruta con las clases de Conocimiento del Medio.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N2', text: "Es curioso, le gusta formular preguntas y busca información adicional.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N3', text: "Compara y clasifica objetos, materiales y cosas atendiendo a sus propiedades físicas y materiales.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N4', text: "Suele predecir el resultado de las experiencias antes de realizarlas.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N5', text: "Le gusta hacer experimentos y observar los cambios que se producen en la naturaleza.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N6', text: "Tiene buenas habilidades a la hora de establecer relaciones causa-efecto.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N7', text: "Detalla sus explicaciones sobre el funcionamiento de las cosas.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N8', text: "A menudo se pregunta qué pasaría si... (por ejemplo, ¿qué pasaría si mezclo agua y aceite?).", category: 'Naturalista', type: 'evaluation' },
    { id: 'N9', text: "Le gusta manipular materiales novedosos en el aula y fuera de ella.", category: 'Naturalista', type: 'evaluation' },
    { id: 'N10', text: "Posee un gran conocimiento sobre temas relacionados con las Ciencias Naturales.", category: 'Naturalista', type: 'evaluation' },

    // Inteligencia Interpersonal
    { id: 'Inter1', text: "Disfruta de la convivencia con los demás.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter2', text: "Parece ser un líder natural.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter3', text: "Aconseja a los iguales que tienen problemas.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter4', text: "Parece comportarse muy inteligentemente en la calle.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter5', text: "Pertenece a clubes, comités y otras organizaciones parecidas.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter6', text: "Disfruta de enseñar informalmente a otros.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter7', text: "Le gusta jugar con los otros compañeros.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter8', text: "Tiene dos o más amigos íntimos.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter9', text: "Tiene un buen sentido de la empatía y del interés por los otros.", category: 'Interpersonal', type: 'evaluation' },
    { id: 'Inter10', text: "Los compañeros buscan su compañía.", category: 'Interpersonal', type: 'evaluation' },

    // Inteligencia Intrapersonal
    { id: 'Intra1', text: "Manifiesta gran sentido de la independencia.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra2', text: "Tiene un sentido realista de sus fuerzas y debilidades.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra3', text: "Lo hace bien cuando se queda sólo para trabajar o estudiar.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra4', text: "Tiene un hobby o afición del que no habla mucho con los demás.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra5', text: "Tiene un buen sentido de la auto-dirección.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra6', text: "Prefiere trabajar sólo a trabajar con otros.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra7', text: "Expresa con precisión cómo se siente.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra8', text: "Es capaz de aprender de sus fracasos y éxitos en la vida.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra9', text: "Tiene una alta autoestima.", category: 'Intrapersonal', type: 'evaluation' },
    { id: 'Intra10', text: "Manifiesta gran fuerza de voluntad y capacidad para automotivarse.", category: 'Intrapersonal', type: 'evaluation' }
];

export const calculateMIScore = (score, total) => {
    // Scoring logic as per document:
    // 0-2: Bajo
    // 2.5-4: Medio-bajo
    // 4.5-6: Medio
    // 6.5-8: Medio-alto
    // 8.5-10: Alto
    // Score is already calculated per category (sum)

    if (score <= 2) return 'Bajo';
    if (score <= 4) return 'Medio-Bajo';
    if (score <= 6) return 'Medio';
    if (score <= 8) return 'Medio-Alto';
    return 'Alto';
};
