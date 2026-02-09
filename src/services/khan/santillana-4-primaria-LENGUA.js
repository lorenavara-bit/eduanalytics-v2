// CONTENIDO SANTILLANA 4º PRIMARIA - LENGUA CASTELLANA
// Estructura oficial de unidades para Santillana
// Basado en el Proyecto Construyendo Mundos / Saber Hacer

export const SANTILLANA_LENGUA_4 = {
    'Lengua Castellana': {
        'Unidad 1: ¡A jugar! (Sinónimos, la comunicación, punto y coma)': {
            source: 'Santillana 4º Primaria - Unidad 1',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Sinónimos: palabras que significan lo mismo (Ej: alegre/contento).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">La comunicación y el lenguaje. Uso del punto y la coma.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Sinónimos', ejercicio: 'Escribe un sinónimo de "contento"', respuesta: 'alegre, feliz', explicacion: 'Los sinónimos son palabras con significado igual o parecido.' }
            ]
        },
        'Unidad 2: Un lugar para vivir (Antónimos, la oración, letras b y v)': {
            source: 'Santillana 4º Primaria - Unidad 2',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Antónimos: palabras con significado contrario (Ej: rápido/lento).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">La oración (sujeto y predicado). Uso de la B y la V.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Antónimos', ejercicio: 'Escribe un antónimo de "rápido"', respuesta: 'lento', explicacion: 'Los antónimos son palabras con significado opuesto.' }
            ]
        },
        'Unidad 3: El mundo animal (Palabras polisémicas, clases de oraciones, letra h)': {
            source: 'Santillana 4º Primaria - Unidad 3',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Polisemia: palabras con varios significados (Ej: banco).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">Clases de oraciones (enunciativas, interrogativas...). Uso de la H.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Polisemia', ejercicio: 'Escribe dos significados de la palabra "banco"', respuesta: 'Asiento / Lugar donde se guarda dinero / Grupo de peces', explicacion: 'Las palabras polisémicas tienen varios significados.' }
            ]
        },
        'Unidad 4: Historias de ayer y de hoy (Palabras homónimas, el sustantivo, letra g)': {
            source: 'Santillana 4º Primaria - Unidad 4',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Homónimos: se pronuncian igual (Ej: valla/vaya).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">El Sustantivo (género y número). Uso de la G.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Sustantivos', ejercicio: 'Identifica el sustantivo en: "El niño corre"', respuesta: 'niño', explicacion: 'El sustantivo nombra personas, animales o cosas.' }
            ]
        },
        'Unidad 5: Prefijos, Numerales y Adjetivos con V': {
            source: 'Santillana 4º Primaria - Unidad 5',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Prefijos sub- (debajo) e inter- (en medio).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática</h4>
                        <p class="text-xs">Numerales (cardinal/ordinal) e indefinidos (algunos, varios).</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Prefijos de lugar', ejercicio: '¿Qué significa el prefijo "sub-"?', respuesta: 'Debajo de', explicacion: 'Ejemplo: subterráneo (debajo de la tierra).' },
                { tipo: 'Prefijo inter-', ejercicio: '¿Qué significa el prefijo "inter-"?', respuesta: 'En medio de o entre', explicacion: 'Ejemplo: internacional (entre naciones).' },
                { tipo: 'Añadir prefijo', ejercicio: 'Añade un prefijo de lugar a "marino"', respuesta: 'submarino', explicacion: 'Sub- indica que está debajo del mar.' },
                { tipo: 'Numerales cardinales', ejercicio: '¿Qué indican los numerales cardinales?', respuesta: 'Cantidad exacta', explicacion: 'Ejemplos: uno, dos, tres, diez...' },
                { tipo: 'Numerales ordinales', ejercicio: '¿Qué indican los numerales ordinales?', respuesta: 'Orden o posición', explicacion: 'Ejemplos: primero, segundo, décimo...' },
                { tipo: 'Clasificar numeral', ejercicio: '¿Qué tipo de numeral es "quinto"?', respuesta: 'Ordinal', explicacion: 'Indica orden.' },
                { tipo: 'Indefinidos', ejercicio: '¿Qué son los determinantes indefinidos?', respuesta: 'Indican una cantidad imprecisa o indeterminada', explicacion: 'Ejemplos: algunos, varios, muchos, ningún.' },
                { tipo: 'Identificar indefinido', ejercicio: 'En "Varios niños juegan", ¿cuál es el indefinido?', respuesta: 'Varios', explicacion: 'No dice exactamente cuántos.' },
                { tipo: 'Ortografía V 1', ejercicio: '¿Cómo terminan los adjetivos que se escriben con v?', respuesta: 'En -ave, -avo, -eva, -evo, -iva, -ivo...', explicacion: 'Ejemplos: suave, octavo, nueva, activo.' },
                { tipo: 'Adjetivo con V', ejercicio: 'Completa: Una fiesta que es de alegría es una fiesta fest___', respuesta: 'festiva', explicacion: 'Termina en -iva, se escribe con v.' },
                { tipo: 'Expresión: Solicitud', ejercicio: '¿Para qué sirve una solicitud?', respuesta: 'Para pedir algo a una persona o institución de forma oficial', explicacion: 'Lleva datos personales, qué se pide y firma.' },
                {
                    tipo: 'fill_blanks',
                    tipo_detalle: 'fill_blanks',
                    ejercicio: '12. Completa este texto sobre los prefijos y numerales usando el banco de palabras:',
                    text: 'El capitán del ___marino divisó una isla ___nacional. Al llegar, vio que era el ___ pasajero en desembarcar y traía ___ regalos para todos.',
                    word_bank: ['sub', 'inter', 'primer', 'muchos'],
                    respuesta: 'sub, inter, primer, muchos',
                    explicacion: 'Usamos prefijos de lugar (sub-, inter-) y determinantes (numeral ordinal e indefinido).'
                },
                {
                    tipo: 'connector',
                    tipo_detalle: 'connector',
                    ejercicio: '13. Une cada prefijo con su significado correcto:',
                    pairs: [
                        { from: 'Prefijo SUB-', to: 'Significa "debajo de"' },
                        { from: 'Prefijo INTER-', to: 'Significa "en medio de"' },
                        { from: 'Prefijo PRE-', to: 'Significa "antes de"' }
                    ],
                    explicacion: 'Los prefijos se añaden al principio de la palabra para cambiar su significado.'
                }
            ]
        },
        'Unidad 6: Sufijos, Verbos y Ger/Gir': {
            source: 'Santillana 4º Primaria - Unidad 6',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Sufijos de profesión (-ero, -ista) y lugar (-ería).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática</h4>
                        <p class="text-xs">El Verbo: infinitivo, conjugación, raíz y desinencia.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                { tipo: 'Sufijos de profesión', ejercicio: '¿Qué sufijo añadirías a "camión" para la profesión?', respuesta: '-ero (camionero)', explicacion: 'Los sufijos se ponen al final de la palabra.' },
                { tipo: 'Sufijos de lugar', ejercicio: '¿Cuál es el sufijo de "pastelería"?', respuesta: '-ería', explicacion: 'Indica el lugar donde se hace o vende algo.' },
                { tipo: 'Formar palabras', ejercicio: 'Forma una palabra con sufijo para "bombón"', respuesta: 'bombonero, bombonera o bombonería', explicacion: 'Usamos sufijos para crear palabras de la misma familia.' },
                { tipo: 'Ortografía ger/gir', ejercicio: '¿Con qué letra se escriben los verbos acabados en -ger o -gir?', respuesta: 'Con G', explicacion: 'Ejemplos: recoger, mugir, dirigir.' },
                { tipo: 'Excepciones ger/gir', ejercicio: '¿Qué dos verbos terminan en -er/-ir y se escriben con J?', respuesta: 'Tejer y crujir', explicacion: 'Son las excepciones a la regla.' },
                { tipo: 'Cambio G/J', ejercicio: '¿Cómo se escribe "Yo (recoger)"?', respuesta: 'recojo', explicacion: 'Cambiamos G por J delante de A u O para que suene fuerte.' },
                { tipo: 'El Verbo: Concepto', ejercicio: '¿Qué palabras indican acciones o estados?', respuesta: 'Los verbos', explicacion: 'Ejemplos: saltar, comer, vivir, estar.' },
                { tipo: 'Infinitivo', ejercicio: '¿Qué es el infinitivo de un verbo?', respuesta: 'Es el nombre del verbo, termina en -ar, -er o -ir', explicacion: 'Ejemplo: cantamos -> cantar.' },
                { tipo: 'Conjugaciones', ejercicio: '¿A qué conjugación pertenece "escribir"?', respuesta: 'Tercera conjugación (-ir)', explicacion: '1ª -ar, 2ª -er, 3ª -ir.' },
                { tipo: 'Raíz y desinencia', ejercicio: 'En el verbo "comíamos", ¿cuál es la raíz?', respuesta: 'com-', explicacion: 'Quitamos -er al infinitivo "comer".' },
                {
                    tipo: 'Expresión: El Cómic', ejercicio: '¿Cómo se llaman los globos donde hablan los personajes de un cómic?', respuesta: 'Bocadillos', explicacion: 'Dentro de ellos se escribe el texto.'
                },
                {
                    tipo: 'classification',
                    tipo_detalle: 'classification',
                    ejercicio: '12. ¡Clasifica estos verbos! Arrástralos a su cubo según su conjugación:',
                    buckets: ['1ª Conjugación (-AR)', '2ª Conjugación (-ER)', '3ª Conjugación (-IR)'],
                    items: ['saltear', 'beber', 'partir', 'pintar', 'leer', 'dormir'],
                    respuesta: {
                        'saltear': '1ª Conjugación (-AR)',
                        'pintar': '1ª Conjugación (-AR)',
                        'beber': '2ª Conjugación (-ER)',
                        'leer': '2ª Conjugación (-ER)',
                        'partir': '3ª Conjugación (-IR)',
                        'dormir': '3ª Conjugación (-IR)'
                    },
                    explicacion: 'La conjugación depende de la terminación del infinitivo.'
                },
                {
                    tipo: 'scanner',
                    tipo_detalle: 'scanner',
                    ejercicio: '13. ¡Modo Detective! Lee este diálogo de cómic y subraya los 3 verbos que indican acción:',
                    text: '¡Mira esa nube! Mañana lloverá mucho, así que nos quedaremos en casa a leer tebeos.',
                    respuesta: ['Mira', 'lloverá', 'quedaremos'],
                    explicacion: 'Los verbos son las palabras que indican acciones o estados en el cómic.'
                }
            ]
        },
        'Unidad 7: Un viaje por el espacio (Familias de palabras, persona y número, letra j)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Familias de palabras: comparten la misma raíz (Ej: pan, panadero, panadería).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">Persona y número del verbo (singular/plural). Uso de la J.</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Unidad 8: Cuidamos el planeta (Palabras derivadas, el adverbio, la coma)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Palabras derivadas: se forman añadiendo prefijos o sufijos (Ej: flor → florero).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">El Adverbio (tiempo, lugar, modo). Uso de la coma en enumeraciones.</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Unidad 9: El mundo en verso (Palabras compuestas, los enlaces, punto y coma)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Palabras compuestas: unión de dos palabras (Ej: saca + puntas = sacapuntas).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">Los enlaces (preposiciones y conjunciones). Uso del punto y coma.</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Unidad 10: ¡Pasen y vean! (Frases hechas, sujeto y predicado, letra x)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Frases hechas: expresiones con significado especial (Ej: estar en las nubes).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática y Ortografía</h4>
                        <p class="text-xs">Sujeto y Predicado de la oración. Uso de la letra X.</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Unidad 11: Máquinas e inventos (Campo semántico, núcleo del sujeto y predicado)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Campo semántico: palabras que comparten un tema (Ej: coche, tren, avión → transportes).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática</h4>
                        <p class="text-xs">Núcleo del sujeto (sustantivo) y núcleo del predicado (verbo).</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Unidad 12: Tiempo de recuerdos (Campo asociativo, la oración compuesta)': {
            source: 'Santillana 4º Primaria',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Vocabulario</h4>
                        <p class="text-xs">Campo asociativo: palabras relacionadas por la realidad (Ej: escuela, tiza, aprender).</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 Gramática</h4>
                        <p class="text-xs">La oración compuesta: oraciones con más de un verbo.</p>
                    </div>
                </div>
            `,
            ejercicios: []
        },
        'Repaso Examen Mañana: Temas 5 y 6': {
            source: 'Santillana 4º Primaria - Refuerzo Premium',
            nivel: '4º Primaria',
            resumen: `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-bold text-indigo-700">📌 Repaso Temas 5 y 6</h4>
                        <p class="text-xs">Prefijos (sub-, inter-), sufijos de profesión, numerales e indefinidos.</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-blue-700">📌 El Verbo y Ortografía</h4>
                        <p class="text-xs">Infinitivos, conjugaciones y el uso de la V en adjetivos.</p>
                    </div>
                </div>
            `,
            ejercicios: [
                // BLOQUE 1: VOCABULARIO (Prefijos y Sufijos)
                {
                    tipo: 'multi_input',
                    tipo_detalle: 'multi_input',
                    ejercicio: '1. Escribe el prefijo de lugar <b>SUB-</b> a estas palabras:',
                    items: [
                        { prefix: 'sub-', placeholder: 'marino', root: 'marino' },
                        { prefix: 'sub-', placeholder: 'suelo', root: 'suelo' },
                        { prefix: 'sub-', placeholder: 'terráneo', root: 'terráneo' }
                    ],
                    respuesta: ['submarino', 'subsuelo', 'subterráneo'],
                    explicacion: 'El prefijo sub- significa "debajo de".'
                },
                {
                    tipo: 'multi_input',
                    tipo_detalle: 'multi_input',
                    ejercicio: '2. Forma nombres de profesiones usando los sufijos <b>-ero/-era</b> o <b>-ista</b>:',
                    items: [
                        { prefix: 'Fruta ->', placeholder: 'frutero', root: 'fruta' },
                        { prefix: 'Tenis ->', placeholder: 'tenista', root: 'tenis' },
                        { prefix: 'Reloj ->', placeholder: 'relojero', root: 'reloj' }
                    ],
                    respuesta: ['frutero', 'tenista', 'relojero'],
                    explicacion: 'Los sufijos se añaden al final para crear nuevas palabras.'
                },

                // BLOQUE 2: ORTOGRAFÍA (La V y los Verbos)
                {
                    tipo: 'multi_input',
                    tipo_detalle: 'multi_input',
                    ejercicio: '3. Completa estos adjetivos con la letra <b>V</b>:',
                    items: [
                        { suffix: 'gra_e', placeholder: 'v' },
                        { suffix: 'le_e', placeholder: 'v' },
                        { suffix: 'intensi_o', placeholder: 'v' },
                        { suffix: 'creati_a', placeholder: 'v' }
                    ],
                    respuesta: ['grave', 'leve', 'intensivo', 'creativa'],
                    explicacion: 'Los adjetivos llanos terminados en -ave, -eve, -ivo/a se escriben con v.'
                },
                {
                    tipo: 'multi_input',
                    tipo_detalle: 'multi_input',
                    ejercicio: '4. Escribe el infinitivo y la conjugación de estas formas verbales:',
                    items: [
                        { prefix: 'recojo ->', placeholder: 'recoger (2ª)' },
                        { prefix: 'conocéis ->', placeholder: 'conocer (2ª)' },
                        { prefix: 'competimos ->', placeholder: 'competir (3ª)' }
                    ],
                    respuesta: ['recoger (2ª)', 'conocer (2ª)', 'competir (3ª)'],
                    explicacion: '1ª (-ar), 2ª (-er), 3ª (-ir).'
                },

                // BLOQUE 3: GRAMÁTICA (Numerales e Indefinidos)
                {
                    tipo: 'multiple_choice',
                    ejercicio: '5. ¿En qué oración la palabra <b>sueño</b> funciona como un VERBO?',
                    options: ['Yo sueño con tener un perro', 'El sueño de Ana es ser piloto'],
                    respuesta: 'Yo sueño con tener un perro',
                    explicacion: 'En "Yo sueño" es la acción que realiza el sujeto.'
                },
                {
                    tipo: 'classification',
                    tipo_detalle: 'classification',
                    ejercicio: '6. Clasifica los siguientes numerales en sus cubos correspondientes:',
                    buckets: ['Cardinales (Cantidad)', 'Ordinales (Orden)'],
                    items: ['veintidós', 'sexto', 'cien', 'vigésimo', 'mil', 'primero'],
                    respuesta: {
                        'veintidós': 'Cardinales (Cantidad)',
                        'cien': 'Cardinales (Cantidad)',
                        'mil': 'Cardinales (Cantidad)',
                        'sexto': 'Ordinales (Orden)',
                        'vigésimo': 'Ordinales (Orden)',
                        'primero': 'Ordinales (Orden)'
                    },
                    explicacion: 'Los cardinales indican cantidad (uno, dos...) y los ordinales indican orden (primero, segundo...).'
                },
                {
                    tipo: 'scanner',
                    tipo_detalle: 'scanner',
                    ejercicio: '7. ¡Modo Detective! Subraya todos los verbos acabados en -ger o -gir que encuentres en el texto:',
                    text: 'Es importante recoger la basura y corregir nuestros errores para proteger el medio ambiente.',
                    respuesta: ['recoger', 'corregir', 'proteger'],
                    explicacion: 'Los verbos acabados en -ger y -gir se escriben siempre con G, excepto tejer y crujir.'
                },
                {
                    tipo: 'voice',
                    tipo_detalle: 'voice',
                    ejercicio: '8. Dictado Oral: Pulsa el micro y di la siguiente frase: "No olvides recoger tu cuarto"',
                    respuesta: 'no olvides recoger tu cuarto',
                    explicacion: 'Estamos practicando la pronunciación y la ortografía del verbo recoger (con G).'
                }
            ]
        }
    }
};

export default { SANTILLANA_LENGUA_4 };
