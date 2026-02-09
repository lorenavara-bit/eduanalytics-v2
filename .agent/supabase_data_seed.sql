-- AUTOMATICALLY GENERATED DATA SEED

-- 1. GRAMMAR RULES
INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PC_AM_IS_ARE_MISSING',
    'Present Continuous',
    'GRAMMAR_PRESENT_CONTINUOUS',
    '\bI\s+[a-z]+ing\b|\b(He|She|It)\s+[a-z]+ing\b',
    '[{"intento":1,"pista":"Falta una palabra pequeña antes del verbo. I ___ playing.","mostrar_solucion":false},{"intento":2,"pista":"Necesitas el verbo TO BE (am/is/are).","scaffolding":"I [am/is/are] playing...","mostrar_solucion":false},{"intento":3,"pista":"Solución: I AM playing.","explicacion_analitica":"Para cosas de ''ahora mismo'', usa siempre TO BE.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PC_ING_MISSING',
    'Present Continuous',
    'GRAMMAR_PRESENT_CONTINUOUS',
    '\b(am|is|are)\s+[a-z]+(?<!ing)\b',
    '[{"intento":1,"pista":"¡Tienes el auxiliar (am/is/are)! Pero al verbo le falta algo al final.","mostrar_solucion":false},{"intento":2,"pista":"Añade -ING al verbo de acción.","scaffolding":"I am play___","mostrar_solucion":false},{"intento":3,"pista":"Solución: I am playING.","explicacion_analitica":"Sin el -ING, la frase está incompleta.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'DESC_HAVE_AGE',
    'Description (Age)',
    'GRAMMAR_GENERAL',
    '\bI\s+have\s+\d+\b|\b(He|She)\s+has\s+\d+\b',
    '[{"intento":1,"pista":"¡Casi! ¿Seguro que en inglés ''tenemos'' los años? 🤔","mostrar_solucion":false},{"intento":2,"pista":"Usa el verbo TO BE, no Have.","scaffolding":"I ___ 9 years old.","mostrar_solucion":false},{"intento":3,"pista":"En inglés ''SOMOS'' años viejos. Solución: I AM 9.","explicacion_analitica":"Regla de oro: Edad = To Be.","mostrar_solucion":true}]'::jsonb,
    'CP, CPSAA'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'DESC_BE_HAIR_EYES',
    'Description (Physical)',
    'GRAMMAR_GENERAL',
    '\bI\s+am\s+(brown|blue|green|long)\s+(hair|eyes)\b',
    '[{"intento":1,"pista":"¡Cuidado! Estás diciendo que tú ERES un pelo marrón. 😂","mostrar_solucion":false},{"intento":2,"pista":"Para cosas del cuerpo (ojos, pelo), usa el verbo TENER.","scaffolding":"I ____ ____ brown hair.","mostrar_solucion":false},{"intento":3,"pista":"Usa HAVE GOT. Solución: I have got brown hair.","explicacion_analitica":"Tú no eres el pelo, el pelo es tuyo.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PREP_CONFUSION_AT_IN',
    'Prepositions (At/In)',
    'GRAMMAR_PREPOSITIONS',
    '\b(at|in)\b',
    '[{"intento":1,"pista":"¡Uy! ¿Estás DENTRO de una caja 📦 o EN UN PUNTO del mapa 📍? 🤔\n\nFíjate bien:\n- IN = DENTRO (espacios cerrados, países, ciudades)\n- AT = EN (un punto específico, edificios concretos)\n\nPiensa: ¿Estás ''dentro'' del hospital (in) o ''en'' el hospital (trabajando allí, at)?","mostrar_solucion":false},{"intento":2,"pista":"Regla de Oro AT vs IN:\n\n📍 USA AT para:\n• Lugares específicos (At school, At home)\n• La hora (At 5 o''clock)\n\n📦 USA IN para:\n• Espacios cerrados 3D (In a room, In a box)\n• Ciudades y Países (In London, In Spain)\n• Meses y Años (In May, In 2024)\n\nTruquito: Si puedes cerrar la puerta, suele ser IN. Si es un punto en Google Maps, suele ser AT.","scaffolding":"She works ___ the hospital","mostrar_solucion":false},{"intento":3,"pista":"Solución:\n• A nurse works IN a hospital (dentro del edificio).\n• A receptionist works AT the entrance (en un punto).\n\n¡OJO! A veces depende del matiz, pero normalmente:\n- Trabajos > IN a bank, IN a factory, IN a school.\n- Ubicaciones > AT school, AT work, AT home.","explicacion_analitica":"Prepositions logic: IN for enclosed spaces/containers. AT for specific points/locations.","mostrar_solucion":true}]'::jsonb,
    'CP, STEM'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'LIKE_MISSING_ING',
    'Likes & Preferences',
    'GRAMMAR_GENERAL',
    '\b(like|love|hate|likes|loves)\s+[a-z]+(?<!ing)\b',
    '[{"intento":1,"pista":"Después de LIKE/LOVE, al verbo le gusta disfrazarse.","mostrar_solucion":false},{"intento":2,"pista":"Añade -ING al segundo verbo.","scaffolding":"I like play___.","mostrar_solucion":false},{"intento":3,"pista":"Solución: I like playING.","explicacion_analitica":"Verbos de preferencia siempre van seguidos de -ING (Gerundio).","mostrar_solucion":true}]'::jsonb,
    'CP, CPSAA'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PS_HE_SHE_S_MISSING',
    'Present Simple (3rd Person S)',
    'GRAMMAR_PRESENT_SIMPLE',
    '\b(He|She|It|My mom|My dad|The dog)\s+[a-z]+(?<!s)\b',
    '[{"intento":1,"pista":"¡Sssssh! 🐍 Falta un sonido de serpiente al final del verbo.\n\nCuando hablamos de ÉL (He), ELLA (She) o ESO (It), el verbo necesita compañía.\n\nFíjate:\n- I play (Yo juego) 😐\n- She playS (Ella juega) 🎉\n\n¡Ponle la ''S'' superpoderosa al final!","mostrar_solucion":false},{"intento":2,"pista":"Regla de la SUPER S (3ª Persona): 🦸‍♂️\n\nSiempre, siempre, siempre... si el sujeto es ONE person (uno solo) que no eres tú ni yo:\n\n• HE (El) + Verbo-S\n• SHE (Ella) + Verbo-S\n• IT (El perro, la cosa) + Verbo-S\n\nEjemplos:\n• He eats ✅\n• She runs ✅\n• It jumps ✅\n\n¡Arrgla tu verbo añadiendo la S!","scaffolding":"He play_.","mostrar_solucion":false},{"intento":3,"pista":"Solución: Añade S al final.\n\n• Play -> PLAYS\n• Work -> WORKS\n• Live -> LIVES\n\n¡Nunca olvides la serpiente de la 3ª persona! 🐍","explicacion_analitica":"Regla gramatical fundamental: Present Simple 3rd Person Singular añade -S.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PS_ES_MISSING',
    'Present Simple (Spelling -ES)',
    'GRAMMAR_PRESENT_SIMPLE',
    '\b(watchs|teachs|washs|fixs|gos|dos|boxs|buzzs|kiss)\b',
    '[{"intento":1,"pista":"¡Uy! Has puesto una ''S'', pero suena fatal... 😖\n\nIntenta decir ''Teachs'' o ''Watchs''. ¿A que cuesta pronunciar ese choque de consonantes?\n\nCuando una palabra termina en sonido de SILBIDO (sh, ch, x, ss), necesitamos una vocal de ayuda para poder respirar.\n\nRegla: Añade una ''E'' antes de la ''S''.\n- Teach -> Teach-ES ✅","mostrar_solucion":false},{"intento":2,"pista":"Regla del SILBIDO (-ES): 🌬️\n\nSi el verbo termina en:\n🔹 -CH (watch)\n🔹 -SH (wash)\n🔹 -X (fix)\n🔹 -SS (kiss)\n🔹 -O (go, do)\n\n¡Añadimos -ES! (No solo S)\n\nEjemplos:\n• Watch → WatchES ✅\n• Go → GoES ✅\n• Fix → FixES ✅\n\nCorrige tu verbo añadiendo la E que falta.","scaffolding":"Teach -> Teach__","mostrar_solucion":false},{"intento":3,"pista":"Solución: TEACHES / WATCHES / GOES.\n\nNecesitas -ES para separar los sonidos.\n¡Así suena mucho mejor! 🎶","explicacion_analitica":"Spelling Rule: Verbs ending in -ch, -sh, -x, -ss, -o add -ES in 3rd person.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'NEGATION_NO_VS_DONT',
    'Negation',
    'GRAMMAR_GENERAL',
    '\bI\s+no\s+like\b|\bShe\s+no\s+likes\b|\bHe\s+no\s+likes\b',
    '[{"intento":1,"pista":"¡Alto ahí! 🛑 En inglés el ''NO'' es un poco vago y no le gusta trabajar solo con verbos.\n\nNecesita un guardaespaldas fuerte: DO o DOES.\n\n❌ I no like (Suena a indio)\n✅ I DON''T like\n\n¡Llama al guardaespaldas!","mostrar_solucion":false},{"intento":2,"pista":"Usa los AUXILIARES NEGATIVOS:\n\n👮‍♂️ DON''T (Do not) → Para I, You, We, They\n👮‍♂️ DOESN''T (Does not) → Para He, She, It (¡La S de 3ª persona se va aquí!)\n\nEjemplos:\n• I don''t play.\n• She doesn''t play (sin S final).\n\nCorrige tu frase.","scaffolding":"I ____ like.","mostrar_solucion":false},{"intento":3,"pista":"Solución: DON''T o DOESN''T.\n\n• I DON''T like pizza.\n• She DOESN''T like pizza.\n\n¡El ''NO'' solo sirve para respuestas cortas!","explicacion_analitica":"Grammar: Present Simple Negation uses Don''t/Doesn''t + Bare Infinitive.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'FALSE_FRIENDS_LIBRARY',
    'Vocabulary',
    'GRAMMAR_GENERAL',
    '\blibreria\b',
    '[{"intento":1,"pista":"¡False Friend! Library es donde lees gratis, no donde compras.","mostrar_solucion":false},{"intento":2,"pista":"Para tienda de libros, usa BOOK + SHOP.","mostrar_solucion":false},{"intento":3,"pista":"Solución: Bookshop.","explicacion_analitica":"Library = Biblioteca. Bookshop = Librería.","mostrar_solucion":true}]'::jsonb,
    'CP, CCEC'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMPARATIVE_MORE_ER',
    'Comparatives',
    'GRAMMAR_COMPARATIVES',
    '\bmore\s+(big|small|tall|short|old|young|fast|slow|long|high|hot|cold|weak|strong|nice|safe|cute)\b',
    '[{"intento":1,"pista":"¡Uy! Casi lo tienes, pero hay un pequeño truquito que no conocías. 😊\n\nFíjate: has escrito ''more'' con una palabra muy cortita. En inglés, cuando una palabra es de 1 palmada (prueba a dar una palmada mientras la dices), NO usamos ''more'' delante.\n\nEn vez de eso, hacemos que la palabra crezca un poquito añadiéndole -ER al final. Es como si la palabra se estirara para decir ''más'':\n- Tall (alto) → Taller (más alto) ✅\n- Big (grande) → Bigger (más grande) ✅\n- NO ''more tall'' ❌\n\n¿Lo ves? Ahora prueba tú: escribe la palabra sin ''more'' y añade -ER al final. ¡Tú puedes!","mostrar_solucion":false},{"intento":2,"pista":"Vale, te voy a enseñar la REGLA DE LAS PALMADAS para que nunca más la olvides. 🎯\n\nPASO 1: Da palmadas diciendo la palabra:\n- ''Tall'' → 1 palmada\n- ''Ex-pen-sive'' → 3 palmadas\n\nPASO 2: Aplica la regla:\n\n🔹 Si tiene 1 palmada → Añade -ER\n   • Tall → Taller ✅\n   • Fast → Faster ✅\n   • Old → Older ✅\n\n🔹 Si tiene 2+ palmadas → Usa MORE delante\n   • Expensive → More expensive ✅\n   • Beautiful → More beautiful ✅\n\nTu palabra tiene solo 1 palmada, así que le toca -ER.\n\nTruquito para recordar: -ER es pequeñito y solo cabe en palabras de 1 palmada. MORE es grande y necesita palabras largas. 😊","scaffolding":"Tall + ER = ?","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta depende de la palabra que usaste, pero te doy el patrón:\n\nSi escribiste ''more tall'' → La respuesta es: Taller\nSi escribiste ''more big'' → La respuesta es: Bigger\n\nTe voy a dar la TABLA COMPLETA para que la guardes en tu cabeza:\n\n📊 REGLA SEGÚN PALMADAS:\n\n🔹 1 PALMADA (tall, big, old):\n   Añade -ER → Taller, Bigger, Older ✅\n\n🔹 2 PALMADAS terminando en -Y (happy, easy):\n   Cambia Y por I, luego añade -ER → Happier, Easier ✅\n\n🔹 2-3+ PALMADAS normales (famous, expensive):\n   Usa MORE delante → More famous, More expensive ✅\n\nEjemplos para practicar en casa:\n- Fast (1 palmada) → Faster\n- Strong (1 palmada) → Stronger\n- Intelligent (4 palmadas) → More intelligent\n\n¡Ahora ya dominas la regla de las palmadas! 🎉","explicacion_analitica":"Regla de Oro: Adjetivos de 1 palmada (1 sílaba) usan -ER. Adjetivos de 2+ palmadas usan MORE. Excepción: Si termina en -Y (happy), cambia Y→I antes de añadir -ER.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_SPELLING_HAPPY_Y',
    'Comparatives (Spelling)',
    'GRAMMAR_COMPARATIVES',
    '\b(happyer|easyer|sillyer|heavyer|dirtyer|funnyer|prettyer|lazyer|crazyer|tidyer)\b',
    '[{"intento":1,"pista":"¡Uy! Casi perfecto, pero hay un truquito especial con las palabras que terminan en Y. 😊\n\nFíjate: cuando una palabra termina en Y (como HappY, EasY, DirtY), esa Y es un poco rebelde y no le gusta juntarse directamente con -ER.\n\nEl truco: Antes de añadir -ER, tienes que cambiar la Y por una I latina.\n\nMira cómo funciona:\n- HappY → Cambia Y por I → HappIER ✅\n- NO ''happyer'' ❌\n\nEs como si la Y dijera: ''¡Yo no quiero estar ahí! ¡Que vaya mi amiga I!''.\n\nDa palmadas: HAP-PY (2 palmadas). Las palabras de 2 palmadas que terminan en Y siempre hacen este cambio.\n\n¡Prueba de nuevo cambiando la Y por I antes de -ER!","mostrar_solucion":false},{"intento":2,"pista":"Te voy a enseñar la REGLA DE LA Y REBELDE para que nunca la olvides. 🎯\n\nPASO 1: Cuenta las palmadas\nDa palmadas diciendo la palabra:\n- HAP-PY → 2 palmadas ✅\n\nPASO 2: Mira la última letra\n¿Termina en Y? → SÍ ✅\n\nPASO 3: Haz el cambio mágico\nCambia Y por I antes de añadir -ER:\n- HappY → Happi-ER ✅\n\nOtros ejemplos con la misma regla:\n• EasY (2 palmadas, -Y) → EasiER ✅\n• DirtY (2 palmadas, -Y) → DirtiER ✅\n• FunnY (2 palmadas, -Y) → FunniER ✅\n\nIMPORTANTE: Solo las palabras de 2 palmadas terminadas en Y hacen este cambio.\n\nPalabras de 1 palmada como ''tall'' o ''big'' no tienen Y, así que solo añaden -ER normal.\n\nEscribe la palabra cambiando Y por I y añadiendo -ER.","scaffolding":"Happ_ER = ?","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta depende de tu palabra:\n\n• Happyer → Happier ✅\n• Easyer → Easier ✅\n• Funnyer → Funnier ✅\n\nTe voy a dar una TABLA para que veas cuándo cambiar la Y:\n\n📊 ¿CUÁNDO CAMBIAR Y POR I?\n\n✅ SÍ cambias (Consonante + Y):\n   • HappY (p + Y) → HappiER ✅\n   • EasY (s + Y) → EasiER ✅\n   • DirtY (t + Y) → DirtiER ✅\n   • FunnY (n + Y) → FunniER ✅\n\n❌ NO cambias (Vocal + Y):\n   • GrAY (a + Y) → GrayER ✅ (sin cambio)\n   • PlAY (a + Y) → PlayER ✅ (jugador)\n\nTruquito: Mira la letra ANTES de la Y. Si es consonante (b, p, t, d, s, n...), haz el cambio. Si es vocal (a, e, o...), déjalo.\n\nPractica en casa:\n• Silly → ?\n• Lazy → ?\n• Gay (vocal + Y) → ?\n\nRespuestas: Sillier, Lazier, Gayer\n\n¡Regla de la Y Rebelde dominada! 🎉","explicacion_analitica":"Regla de ortografía: Si la palabra de 2 sílabas termina en Consonante + Y, cambia Y → I antes de añadir -ER. Si termina en Vocal + Y, no cambies nada.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_HYPER_CORRECTION',
    'Comparatives (Spelling)',
    'GRAMMAR_COMPARATIVES',
    '\b(fastter|oldder|talller|smalller|coldder|longger|strongger|lightter|darkker)\b',
    '[{"intento":1,"pista":"¡Ups! Te has pasado de fuerza 💪. Has doblado la última letra, pero esta palabra no lo necesita.\n\nRecuerda: SOLO doblamos cuando la palabra termina en SÁNDWICH (Consonante-Vocal-Consonante) y tiene 1 sola consonante al final.\n\nMira tu palabra:\n- FAST → Termina en ST (2 consonantes) ❌ NO dobla\n- OLD → Termina en LD (2 consonantes) ❌ NO dobla\n\nSi ya termina con dos consonantes juntas, ¡no necesita más ayuda! Solo añade -ER.","mostrar_solucion":false},{"intento":2,"pista":"Regla para NO doblar:\nSi ves DOS consonantes juntas al final (st, ld, ll, ng...), NO dobles nada.\n\n• Fast (S-T) → Faster ✅ (No fastter)\n• Old (L-D) → Older ✅ (No oldder)\n• Tall (L-L) → Taller ✅ (No talller)\n\n¡Borra esa letra extra y listo!","scaffolding":"Fas__er","mostrar_solucion":false},{"intento":3,"pista":"Solución: Escribe la palabra normal + ER.\n\n• Fastter → FASTER\n• Oldder → OLDER\n• Talller → TALLER\n\n¡Menos es más! 😉","explicacion_analitica":"No se dobla la consonante final si la palabra ya termina en dos consonantes (st, ld, ng) o si termina en vocal + w/y/x.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_SPELLING_CVC',
    'Comparatives (Spelling)',
    'GRAMMAR_COMPARATIVES',
    '\b(biger|hoter|sader|fater|thiner|weter|reder|hiter)\b',
    '[{"intento":1,"pista":"¡Ojo! Cuando una palabra corta termina de una forma especial, tienes que doblar la última letra antes de añadir -ER. 😊\n\nMira las últimas 3 letras de tu palabra:\n- BIG → B-I-G\n- Tipo: Consonante-Vocal-Consonante (lo llamamos ''Sándwich'')\n\nLA REGLA DEL SÁNDWICH:\nCuando una palabra de 1 sílaba (palmada) hace este ''sándwich'' de letras, doblas la última:\n- Big → Bi**GG**er ✅ (dobla la G)\n- NO ''biger'' ❌\n\nOtros ejemplos:\n• Hot (H-O-T = sándwich) → Ho**TT**er ✅\n• Sad (S-A-D = sándwich) → Sa**DD**er ✅\n\n¿Ves el patrón? La letra del medio necesita más compañía antes de crecer con -ER.\n\n¡Prueba otra vez doblando la última letra!","mostrar_solucion":false},{"intento":2,"pista":"Te voy a enseñar la REGLA DEL SÁNDWICH CVC paso a paso. 🎯\n\nPASO 1: Identifica el patrón\nMira las últimas 3 letras de la palabra:\n- BIG → B-I-G\n- Tipo de letra: Consonante-Vocal-Consonante ✅\n\nPASO 2: Comprueba las sílabas\n- BIG → 1 sílaba ✅\n\nPASO 3: Si cumple las 2 condiciones (CVC + 1 sílaba), dobla la última letra:\n- Big → Bi**GG**er ✅\n\nMás ejemplos:\n• Hot (H-O-T, 1 sílaba) → Hotter ✅ (dobla T)\n• Fat (F-A-T, 1 sílaba) → Fatter ✅ (dobla T)\n• Wet (W-E-T, 1 sílaba) → Wetter ✅ (dobla T)\n\nPERO NO doblas si:\n• Fast (F-A-S-T) → tiene 2 consonantes al final → Faster ✅ (sin doblar)\n• Tall (T-A-L-L) → ya tiene doble L → Taller ✅ (sin doblar)\n\nEscribe la palabra doblando la última letra antes de -ER.","scaffolding":"Bi__er = ?","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta depende de tu palabra:\n\n• Biger → Bigger ✅\n• Hoter → Hotter ✅\n• Sader → Sadder ✅\n\nREGLA DEL DOBLEZ (Super importante):\n\n📊 ¿CUÁNDO DOBLAR LA ÚLTIMA LETRA?\n\n✅ SÍ doblas si cumple TODO:\n   1. Palabra de 1 sílaba (palmada) ✅\n   2. Termina en CVC (Consonante-Vocal-Consonante) ✅\n   \n   Ejemplos:\n   • Big (1 sílaba, B-I-G = CVC) → Bi**gg**er ✅\n   • Hot (1 sílaba, H-O-T = CVC) → Ho**tt**er ✅\n   • Thin (1 sílaba, TH-I-N = CVC) → Thi**nn**er ✅\n\n❌ NO doblas si:\n   • Tiene 2 consonantes al final: Fast → Faster ✅\n   • Ya tiene letra doble: Tall → Taller ✅\n   • Termina en vocal: Nice → Nicer ✅\n\nTruquito visual: Si la palabra hace ''sándwich'' (consonante-relleno-consonante), necesita más relleno antes de -ER. 🥪\n\nPractica en casa:\n• Sad → ?\n• Red → ?\n• Long (L-O-N-G pero tiene NG al final) → ?\n\nRespuestas: Sadder, Redder, Longer (no dobla, 2 consonantes)\n\n¡Ley del Doblez dominada! 🎉","explicacion_analitica":"Regla CVC: Si una palabra de 1 sílaba termina en Consonante-Vocal-Consonante (big, hot, sad), dobla la última consonante antes de añadir -ER. No doblar si ya tiene 2 consonantes al final (fast, long).","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_LONG_ADJ_ER',
    'Comparatives',
    'GRAMMAR_COMPARATIVES',
    '\b(expensiver|beautifuler|dangerousser|intelligenter|comfortabler|interestinger|difficultier)\b',
    '[{"intento":1,"pista":"¡Uy! Esta palabra es demasiado larga para llevar -ER al final. 😊\n\nCuenta las sílabas mientras dices la palabra:\n- EX-PEN-SIVE → 3 sílabas ✅\n\nLA REGLA:\nCuando una palabra tiene 3 o más sílabas (como expensive, beautiful, dangerous), NO le añadimos -ER. ¡Sería como intentar meter un elefante en una caja pequeña! 🐘📦\n\nEn vez de eso, ponemos MORE delante de la palabra:\n- Expensive → MORE expensive ✅\n- NO ''expensiver'' ❌\n\nOtros ejemplos:\n• Beautiful (3 sílabas) → More beautiful ✅\n• Dangerous (3 sílabas) → More dangerous ✅\n\n¿Lo ves? MORE es para palabras largas. -ER es solo para palabras cortitas de 1 sílaba.\n\n¡Prueba de nuevo usando MORE delante en vez de -ER al final!","mostrar_solucion":false},{"intento":2,"pista":"Te voy a enseñar la REGLA COMPLETA para que nunca te confundas. 🎯\n\nPASO 1: Cuenta las sílabas de tu palabra\n- EX-PEN-SIVE → 3 sílabas\n\nPASO 2: Aplica la regla correcta:\n\n📊 TABLA DE DECISIÓN:\n\n🔹 1 SÍLABA → Añade -ER:\n   • Tall → Taller ✅\n   • Big → Bigger ✅\n   • Fast → Faster ✅\n\n🔹 2 SÍLABAS + termina en -Y → Cambia Y por I, añade -ER:\n   • Happy → Happier ✅\n   • Easy → Easier ✅\n\n🔹 2-3+ SÍLABAS (normales) → Usa MORE delante:\n   • Famous (2 sílabas) → More famous ✅\n   • Expensive (3 sílabas) → More expensive ✅\n   • Intelligent (4 sílabas) → More intelligent ✅\n\nTu palabra tiene 3+ sílabas, así que necesita MORE delante.\n\nTruquito: Si la palabra es tan larga que se te cansa la lengua, usa MORE. 😊\n\nEscribe: MORE + tu palabra (sin cambiarla).","scaffolding":"MORE + expensive = ?","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta depende de tu palabra:\n\n• Expensiver → More expensive ✅\n• Beautifuler → More beautiful ✅\n• Dangerousser → More dangerous ✅\n\nREGLA DE ORO COMPLETA:\n\n📊 ¿-ER o MORE?\n\n✅ USA -ER con palabras de 1 sílaba:\n   • Old → Older\n   • Strong → Stronger\n   • Nice → Nicer\n\n✅ USA MORE con palabras de 2+ sílabas:\n   • Famous → More famous\n   • Expensive → More expensive\n   • Beautiful → More beautiful\n   • Comfortable → More comfortable\n\n⚠️ EXCEPCIÓN: Palabras de 2 sílabas que terminan en -Y:\n   • Happy → Happier (cambia Y por I + ER)\n   • Easy → Easier\n\nTruquito para recordar:\n🔸 Palabras MINI (1 sílaba) = -ER\n🔸 Palabras MEGA (2+ sílabas) = MORE\n🔸 Palabras -Y (happy) = Cambia Y→I + ER\n\nPractica en casa:\n• Difficult (3 sílabas) → ?\n• Interesting (4 sílabas) → ?\n• Funny (2 sílabas, -Y) → ?\n\nRespuestas: More difficult, More interesting, Funnier\n\n¡Ahora ya sabes cuándo usar MORE! 🎉","explicacion_analitica":"Regla de longitud: Adjetivos de 3+ sílabas SIEMPRE usan MORE delante, nunca -ER. Adjetivos de 1 sílaba usan -ER. Excepción: 2 sílabas terminadas en -Y cambian Y→I y añaden -ER.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_MISSING_THAN',
    'Comparatives',
    'GRAMMAR_COMPARATIVES',
    '\b(taller|bigger|faster|slower|older|younger|happier|more\s+\w+)\s+(?!than)\w',
    '[{"intento":1,"pista":"¡Casi perfecto! Has formado bien el comparativo, pero falta una palabra muy importante. 😊\n\nCuando comparamos DOS cosas, necesitamos una palabra especial para conectarlas:\n\n❌ Incompleto: ''I am taller my brother''\n✅ Completo: ''I am taller THAN my brother''\n\nTHAN significa ''QUE'' en español:\n- Soy más alto QUE mi hermano\n- I am taller THAN my brother\n\n¿Ves? THAN es el puente que conecta las dos cosas que comparas:\n\n[COSA 1] + comparativo + THAN + [COSA 2]\n\nEjemplos:\n• She is faster THAN me ✅\n• This is bigger THAN that ✅\n• NO ''She is faster me'' ❌\n\n¡Añade THAN para conectar las dos cosas que estás comparando!","mostrar_solucion":false},{"intento":2,"pista":"Te voy a enseñar la ESTRUCTURA COMPLETA de los comparativos. 🎯\n\nFÓRMULA MÁGICA:\n[Sujeto] + [verbo] + [COMPARATIVO] + THAN + [con quién/qué comparas]\n\nEjemplos paso a paso:\n\n1️⃣ ''I am tall'' (Yo soy alto) → Solo descripción\n2️⃣ ''I am taller'' (Yo soy más alto) → Comparativo, ¿pero más alto QUE QUIÉN?\n3️⃣ ''I am taller THAN my brother'' (Yo soy más alto QUE mi hermano) → ¡COMPLETO! ✅\n\nMás ejemplos:\n• This car is more expensive THAN that one ✅\n• She is happier THAN yesterday ✅\n• Dogs are bigger THAN cats ✅\n\nIMPORTANTE: Siempre que uses -ER o MORE, necesitas THAN después (excepto si la frase termina ahí: ''I want something bigger'').\n\nEscribe tu frase completa con THAN en medio.","scaffolding":"I am taller ___ my brother","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta debe incluir THAN:\n\n• ''I am taller my brother'' → ''I am taller THAN my brother'' ✅\n• ''She is faster me'' → ''She is faster THAN me'' ✅\n• ''This is more expensive that'' → ''This is more expensive THAN that'' ✅\n\nREGLA DEL THAN:\n\n📊 ¿CUÁNDO USAR THAN?\n\n✅ USA THAN cuando:\n   • Comparas 2 cosas diferentes\n   • Usas comparativo (-ER o MORE)\n   • Quieres decir ''QUE'' en español\n\nESTRUCTURA:\n[COSA 1] es [COMPARATIVO] THAN [COSA 2]\n\nEjemplos:\n• Elephants are bigger THAN mice ✅\n• Winter is colder THAN summer ✅\n• This book is more interesting THAN that one ✅\n\n❌ NO USES THAN cuando:\n   • Solo describes (sin comparar): ''She is tall'' ✅\n   • Usas superlativo (THE...EST): ''She is THE tallest'' ✅\n\n⚠️ ERROR COMÚN:\nNo confundas THAN con THEN:\n• THAN = QUE (para comparar)\n• THEN = ENTONCES (para tiempo)\n\nPractica:\n• I am older ___ you → ?\n• She is THE tallest ___ the class → ?\n• He is smarter ___ me → ?\n\nRespuestas: THAN you, IN the class (no THAN con superlativo), THAN me\n\n¡Regla del THAN dominada! 🎉","explicacion_analitica":"Regla estructural: Los comparativos (-ER o MORE + adjetivo) requieren THAN cuando se especifica el segundo elemento de la comparación. THAN = ''que'' en español. No confundir con THEN (entonces).","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'MODAL_SYNTAX_TO',
    'Modals',
    'GRAMMAR_MODALS',
    '\b(can|could|should|must|will|would|might)\s+to\s+\w+\b',
    '[{"intento":1,"pista":"¡Sobran palabras! ✂️ Los verbos modales (Can, Must, Should) son muy fuertes y no necesitan ayudas.\n\nFíjate: ''I can to go'' ❌ suena tropezado.\nQuítale la partícula ''TO''.","mostrar_solucion":false},{"intento":2,"pista":"Regla de los MODALES PUROS: 🛡️\nNunca llevan ''TO'' después.\n\n• I can swim ✅ (No ''can to swim'')\n• You must study ✅ (No ''must to study'')\n\nBorra el ''TO'' y la frase será perfecta.","scaffolding":"I can ___ (sin to)","mostrar_solucion":false},{"intento":3,"pista":"Solución: I CAN GO / I MUST DO.\n\nRecuerda: Modal + Verbo Base (Bare Infinity).","explicacion_analitica":"Modal Verbs are followed by Bare Infinitive (without ''to'').","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'MODAL_SYNTAX_S',
    'Modals',
    'GRAMMAR_MODALS',
    '\b(cans|coulds|shoulds|musts|mights|wills)\b',
    '[{"intento":1,"pista":"¡Cuidado! 🛑 Los verbos modales son especiales: ¡Son INVISIBLES a la 3ª persona!\n\nNo les afecta la regla de la ''S''. Ellos nunca cambian, sea quien sea el sujeto.","mostrar_solucion":false},{"intento":2,"pista":"Regla Invariable:\n• I can\n• You can\n• She CAN ✅ (No ''cans'')\n\nLos modales no llevan S, ni ING, ni ED. Son siempre iguales.\nQuítale esa ''S'' extra.","scaffolding":"She ____ swim.","mostrar_solucion":false},{"intento":3,"pista":"Solución: SHE CAN / HE MUST.\n\nSin ''S'' final. Son verbos rebeldes que no cambian.","explicacion_analitica":"Modal verbs are invariable. They do not add -s in the 3rd person singular.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'ARTICLE_A_AN_MISMATCH',
    'Articles',
    'GRAMMAR_ARTICLES',
    '\b(a\s+[aeiou]\w+|an\s+[bcdfghjklmnpqrstvwxyz]\w+)\b',
    '[{"intento":1,"pista":"¡Choque de sonidos! 💥\nEscucha tu frase. ¿Suena fluido?\n\nRecuerda la regla de la amistad:\n- Vocal con Vocal se pelean (A Apple ❌)\n- Consonante con Consonante se aburren.","mostrar_solucion":false},{"intento":2,"pista":"Regla A vs AN: 🍎\n\n🔹 Usa AN si la siguiente palabra empieza por VOCAL (a,e,i,o,u): An apple, An elephant.\n🔹 Usa A si la siguiente palabra empieza por CONSONANTE: A car, A dog.\n\nEs para que suene bonito y ligado.","scaffolding":"Its ___ apple.","mostrar_solucion":false},{"intento":3,"pista":"Solución: AN apple / A car.\n\n• A + Consonante\n• AN + Vocal\n(¡Cuidado con la H muda!: An hour).","explicacion_analitica":"Use AN before vowel sounds, A before consonant sounds.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'QUANTIFIERS_MUCH_MANY',
    'Quantifiers',
    'GRAMMAR_GENERAL',
    '\b(much\s+(cars|apples|people|books|friends|days)|many\s+(water|money|sugar|time|love|milk))\b',
    '[{"intento":1,"pista":"¡Espera! ✋ ¿Puedes contar eso con los dedos? (1, 2, 3...)\n\nSi se puede contar (1 manzana, 2 manzanas), NO uses la palabra que has puesto.\nSi es un líquido o algo que no se cuenta (dinero, tiempo), necesitas cambiar el cuantificador.","mostrar_solucion":false},{"intento":2,"pista":"Regla MUCH vs MANY:\n\n🍔 MANY = Contables (Se pueden contar)\n(Many burgers, Many friends)\n\n💧 MUCH = Incontables (Líquidos, conceptos)\n(Much water, Much money)\n\nTruco: Si puedes ponerle un número delante, usa MANY.","scaffolding":"How ____ apples?","mostrar_solucion":false},{"intento":3,"pista":"Solución:\n• Countable (plural) → MANY\n• Uncountable (singular) → MUCH\n\nEjemplo: Many coins 🪙 vs Much money 💰.","explicacion_analitica":"Many + Countable Plural. Much + Uncountable.","mostrar_solucion":true}]'::jsonb,
    'CP, STEM'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'THERE_IS_ARE_AGREEMENT',
    'There is/are',
    'GRAMMAR_GENERAL',
    '\b(there\s+is\s+(two|three|many|some)\s+\w+s|there\s+are\s+(a|one|an)\s+\w+)\b',
    '[{"intento":1,"pista":"¡Ojo al número! 🔢 Mira lo que viene después.\n\n¿Es UNA sola cosa o son VARIAS?\n\n- Una cosa = IS\n- Varias cosas = ARE","mostrar_solucion":false},{"intento":2,"pista":"Regla de Existencia:\n\n👉 THERE IS + Singular (Un perro, una casa)\n👉 THERE ARE + Plural (Dos gatos, muchos niños)\n\nSi ves una ''S'' al final de la cosa (catS), casi seguro es ARE.","scaffolding":"There ____ two cats.","mostrar_solucion":false},{"intento":3,"pista":"Solución:\n• There IS a cat.\n• There ARE two cats.\n\nSingular vs Plural.","explicacion_analitica":"Agreement rule: ''Is'' for singular nouns, ''Are'' for plural nouns.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PAST_DID_BASE_FORM',
    'Past Simple',
    'GRAMMAR_PAST_SIMPLE',
    '\b(didn''t|did\s+not|did\s+you|did\s+he)\s+(\w+ed|went|saw|ate|had|made|wrote)\b',
    '[{"intento":1,"pista":"¡Ups! 🕰️ Ya has usado la máquina del tiempo con ''DID''.\n\nNo necesitas volver a poner el verbo en pasado. ¡Sería viajar al pasado dos veces! 😵\nCuando DID/DIDN''T está presente, el verbo principal se relaja en su forma normal.","mostrar_solucion":false},{"intento":2,"pista":"Regla DEL AUXILIAR LADRÓN: 🦹\n\nEl auxiliar ''DID'' le roba el pasado al verbo principal.\n\n❌ I didn''t went (Doble pasado)\n✅ I didn''t GO (Did lleva el pasado, Go se queda norma)\n\nPon el verbo en infinitivo.","scaffolding":"I didn''t ____ (go/went?)","mostrar_solucion":false},{"intento":3,"pista":"Solución: DIDN''T GO / DID YOU SEE.\n\nEl verbo vuelve a su forma base porque DID ya hace el trabajo gramatical.","explicacion_analitica":"After auxiliary DID, always use the Bare Infinitive.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'GENITIVE_OF_STRUCTURE',
    'Saxon Genitive',
    'GRAMMAR_GENERAL',
    '\bthe\s+(\w+)\s+of\s+(my|the|a)\s+(\w+)\b',
    '[{"intento":1,"pista":"Suena muy español... 🇪🇸 ''El coche de mi padre''.\n\nEn inglés, a los dueños (personas/animales) les gusta ponerse primero y agarrar su objeto con una ''S'' mágica.\n\nIntenta darle la vuelta a la frase.","mostrar_solucion":false},{"intento":2,"pista":"Usa el GENITIVO SAJÓN (''s): 🇬🇧\n\nOrden:\n1. El DUEÑO (My dad)\n2. ''s\n3. La COSA (car)\n\n❌ The car of my dad\n✅ My dad''S car\n\n¡Pruébalo!","scaffolding":"My dad__ car.","mostrar_solucion":false},{"intento":3,"pista":"Solución: MY DAD''S CAR / TOM''S HOUSE.\n\nUsamos OF para cosas (The leg of the table), pero ''S para personas.","explicacion_analitica":"Saxon Genitive (''s) is preferred for people/animals possessing objects.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_IRREGULAR',
    'Comparatives & Superlatives (Irregular)',
    'GRAMMAR_COMPARATIVES',
    '\b(gooder|badder|goodest|baddest|farrer|farer)\b',
    '[{"intento":1,"pista":"¡Stop! 🛑 Has encontrado a los REBELDES del inglés.\n\nFíjate bien: has escrito algo como ''gooder'' o ''badder''.\nPero las palabras GOOD (bueno) y BAD (malo) son especiales. ¡No les gusta seguir las reglas de los demás!\n\nEllas no quieren llevar -ER al final. Tienen sus propias formas secretas que cambian completamente:\n\n- Good → NO es ''gooder'' ❌\n- Bad → NO es ''badder'' ❌\n\n¿Te acuerdas de cómo se dicen ''mejor'' y ''peor''? ¡Piénsalo un segundo!","mostrar_solucion":false},{"intento":2,"pista":"Aquí tienes la TABLA DE LOS REBELDES para que te la aprendas de memoria (¡es corta!). 🧠\n\n🔹 GOOD (Bueno):\n   • Comparativo: BETTER (Mejor) ✅\n   • Superlativo: THE BEST (El mejor) ✅\n\n🔹 BAD (Malo):\n   • Comparativo: WORSE (Peor) ✅\n   • Superlativo: THE WORST (El peor) ✅\n\n🔹 FAR (Lejos):\n   • Comparativo: FURTHER / FARTHER (Más lejos) ✅\n   \nSi querías decir ''más bueno'', escribe BETTER.\nSi querías decir ''más malo'', escribe WORSE.\n\n¡Inténtalo de nuevo con la forma correcta!","scaffolding":"Good -> Better, Bad -> Worse","mostrar_solucion":false},{"intento":3,"pista":"La respuesta correcta es uno de estos rebeldes:\n\n• Si pusiste Gooder → Es BETTER\n• Si pusiste Badder → Es WORSE\n• Si pusiste Goodest → Es THE BEST\n• Si pusiste Baddest → Es THE WORST\n\nTruquito para recordar:\n- Good y Better empiezan por letras diferentes, ¡cambio total!\n- Bad y Worse se parecen muy poco.\n- The Best (el mejor) es el que usas cuando dices ''Best Friends''. 😉\n\n¡Guarda estos 3 rebeldes en tu memoria para siempre! 🎉","explicacion_analitica":"Adjetivos Irregulares: Good->Better->Best, Bad->Worse->Worst, Far->Farther/Further->Farthest/Furthest. Nunca usan -ER/-EST.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'SUP_ERRORS',
    'Superlatives',
    'GRAMMAR_COMPARATIVES',
    '\b(most\s+tall|most\s+big|most\s+fast|most\s+old|most\s+strong|happyest|easyest|bigest|hotest|saddest)\b',
    '[{"intento":1,"pista":"¡Uy! Estás haciendo un superlativo (el más...), pero hay un detallito que corregir. 🧐\n\nPosibles despistes:\n1. Si usaste ''MOST'' con una palabra corta (most tall): Recuerda que las palabras cortas prefieren llevar corona (-EST) al final.\n2. Si escribiste ''happyest'' o ''bigest'': ¡Ojo a las letras! A veces hay que cambiar la Y o doblar letras.\n\nRegla rápida:\n- Palabras de 1 sílaba → THE ...-EST (The tallest)\n- Palabras que terminan en Y → THE ...-IEST (The happiest)\n\n¡Revisa tu palabra y dale otra vuelta!","mostrar_solucion":false},{"intento":2,"pista":"Vamos a arreglar ese superlativo con la TABLA DE SUPERLATIVOS. 🏆\n\n🔹 CORTAS (1 sílaba): Añade THE ...-EST\n   • Tall → The tallEST ✅ (No ''most tall'')\n   • Big → The biGGest ✅ (¡Dobla la G! Sándwich CVC)\n\n🔹 TERMINADAS EN Y (2 sílabas):\n   • Happy → The happIEst ✅ (Cambia Y por I)\n   • Funny → The funnIEst ✅\n\n🔹 LARGAS (2+ sílabas): Usa THE MOST ...\n   • Famous → The MOST famous ✅\n\nMira tu palabra:\n- Si es ''most tall'' → cámbialo a Tallest.\n- Si es ''bigest'' → dóblale la letra: Biggest.\n- Si es ''happyest'' → cambia la Y: Happiest.\n\n¡Tú puedes!","scaffolding":"The + Palabra + EST","mostrar_solucion":false},{"intento":3,"pista":"Aquí tienes la solución exacta según tu error:\n\n• Most tall → The TALLEST (palabra corta usa -est)\n• Bigest → The BIGGEST (dobla la G)\n• Happyest → The HAPPIEST (cambia Y por I)\n• Most old → The OLDEST\n\nResumen Superlativo:\n👑 EL MÁS (The...)\n1. Cortas: The ...-EST\n2. Largas: The MOST ...\n3. Spelling: Cuidado con la Y (happiest) y dobles (biggest).\n\n¡Ahora ya eres un experto en superlativos! 🌟","explicacion_analitica":"Superlativos: Adjetivos cortos añaden -EST (the tallest). Largos usan THE MOST. Reglas de ortografía iguales al comparativo (Y->I, doblar consonante).","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PLURAL_IRREGULAR_COMMON',
    'Plurals',
    'GRAMMAR_GENERAL',
    '\b(mans|womans|childs|foots|tooths|gooses|mouses|persons|sheeps|dishs)\b',
    '[{"intento":1,"pista":"¡Stop! 🛑 Esta palabra es un REBELDE. No acepta la ''S'' de plural.\n\nCambia de forma completamente (como un Pokémon evolucionando). 🦄","mostrar_solucion":false},{"intento":2,"pista":"Regla de los IRREGULARES:\n\n• Man → MIN... no, MEN.\n• Woman → WOMEN.\n• Child → CHILDREN.\n• Foot → FEET.\n• Tooth → TEETH.\n• Mouse → MICE.\n\n¡No uses la S!","scaffolding":"One child, two ____","mostrar_solucion":false},{"intento":3,"pista":"Solución: CHILDREN / FEET / MEN.\n\nSon excepciones que hay que memorizar. ¡Nada de S!","explicacion_analitica":"Irregular Plurals do not take -s. They change vowels or form (Man->Men, Foot->Feet).","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_MISSING_ER_BASE',
    'Comparatives',
    'GRAMMAR_COMPARATIVES',
    '^(tall|short|big|small|fast|slow|old|young|strong|weak|long|high|cool|dark|warm)$',
    '[{"intento":1,"pista":"¡Vas bien! Has acertado la palabra... pero falta ''fuerza''. 💪\n\nEstás COMPARANDO dos cosas.\nPara decir ''máz...'', necesitas añadir algo al final de la palabra.","mostrar_solucion":false},{"intento":2,"pista":"Regla de 1 PALMADA: 👏\n\nSi la palabra es cortita (Tall, Old, Fast), añádele -ER al final para comparar.\n\n• Tall (Alto) → TallER (Más alto) ✅\n\n¡Dale vitaminas a tu palabra!","scaffolding":"[Palabra] + er","mostrar_solucion":false},{"intento":3,"pista":"Solución: Añade -ER.\n\n• Tall → TALLER\n• Old → OLDER\n\nSin -ER, solo estás describiendo, no comparando.","explicacion_analitica":"Comparative form for short adjectives requires -ER suffix.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'COMP_MISSING_MORE_BASE',
    'Comparatives',
    'GRAMMAR_COMPARATIVES',
    '^(expensive|beautiful|dangerous|intelligent|comfortable|interesting|difficult|famous)$',
    '[{"intento":1,"pista":"¡Esta palabra es muy larga! 📏 le falta su acompañante.\n\nPara comparar con palabras largas, necesitamos poner ''ALGO'' delante.","mostrar_solucion":false},{"intento":2,"pista":"Regla de PALABRAS LARGAS: 🐘\n\nSi tiene 2 o más sílabas (y no termina en Y), usa la palabra MORE delante.\n\n• Expensive → MORE expensive.\n• Beautiful → MORE beautiful.\n\n¡Ponle el ''MORE'' delante!","scaffolding":"More ____","mostrar_solucion":false},{"intento":3,"pista":"Solución: MORE + Adjetivo.\n\n• MORE beautiful\n• MORE dangerous\n\nLas palabras largas no cambian, solo añaden MORE.","explicacion_analitica":"Long adjectives (2+ syllables) require MORE before the adjective.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'FUTURE_GOING_TO_AUX',
    'Future Plans (Be Going To)',
    'GRAMMAR_GENERAL',
    '\bI\s+going\s+to\b|\b(He|She|It)\s+going\s+to\b|\b(We|They|You)\s+going\s+to\b',
    '[{"intento":1,"pista":"¡Te falta el motor del futuro! 🚀\n''Going to'' no puede ir solo. Necesita su ayudante inseparable al principio.","mostrar_solucion":false},{"intento":2,"pista":"Regla del FUTURO PLANEADO:\nSujeto + TO BE + GOING TO + Verbo.\n\n• I AM going to...\n• She IS going to...\n• We ARE going to...\n\n¡No te olvides del AM, IS o ARE!","scaffolding":"I ____ going to...","mostrar_solucion":false},{"intento":3,"pista":"Solución: I AM going to / She IS going to.\n\nSin el verbo To Be, el plan se cae. 🏗️","explicacion_analitica":"Future ''Be Going To'' structure always requires the conjugated verb To Be (am/is/are).","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'IMPERATIVE_SUBJECT_ERROR',
    'Imperatives',
    'GRAMMAR_IMPERATIVES',
    '^(You|He|She)\s+(open|close|sit|stand|look|listen)\b.*!?',
    '[{"intento":1,"pista":"¡Hey! 👋 Si es una orden o instrucción, no necesitas decir a QUIÉN se lo dices.\nEs directo: ¡Hazlo!","mostrar_solucion":false},{"intento":2,"pista":"Regla del JEFE 👔 (Imperativo):\nLas órdenes empiezan DIRECTAMENTE por el verbo.\n\n❌ You open the door.\n✅ Open the door!\n\nBorra el sujeto (''You'') y empieza por la acción.","scaffolding":"____ the door!","mostrar_solucion":false},{"intento":3,"pista":"Solución: OPEN / CLOSE / LISTEN.\n\nEn imperativo, el sujeto ''You'' es invisible. 👻","explicacion_analitica":"Imperatives do not use an explicit subject. Start with the verb.","mostrar_solucion":true}]'::jsonb,
    'CP, CPSAA'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'CONNECTOR_BUT_VS_AND',
    'Connectors',
    'GRAMMAR_CONNECTORS',
    '\bI\s+like\s+\w+\s+and\s+I\s+don''t\s+like\b',
    '[{"intento":1,"pista":"¡Cuidado! 🚦 Estás diciendo una cosa buena y luego una mala.\n''AND'' es para sumar cosas iguales (+++). Aquí necesitas una palabra que marque un giro.","mostrar_solucion":false},{"intento":2,"pista":"Regla del GIRO 🔄 (BUT):\nUsa BUT (pero) cuando cambies de opinión o contrastes:\n\n• I like apples 🟢 BUT I don''t like pears 🔴.\n\nAND es solo para sumar (🟢 + 🟢).","scaffolding":"...liked it ___ I didn''t...","mostrar_solucion":false},{"intento":3,"pista":"Solución: BUT.\n\n''Pero'' en inglés. Úsalo para conectar ideas opuestas (+/-).","explicacion_analitica":"Use ''BUT'' to contrast positive and negative clauses. ''AND'' adds similar information.","mostrar_solucion":true}]'::jsonb,
    'CP, CCL'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PS_DO_DOES_AGREEMENT',
    'Present Simple (Do/Does)',
    'GRAMMAR_PRESENT_SIMPLE',
    '\\b(he|she|it|my\\s+(mum|dad|brother|sister|teacher|cat|dog)|the\\s+(boy|girl|cat|dog))\\s+do\\b',
    '[{"intento":1,"pista":"🐍 ¡Ssssh! Recuerda la Serpiente S.\nCon HE, SHE, IT... la serpiente siempre aparece.","mostrar_solucion":false},{"intento":2,"pista":"Regla de la Serpiente (3ª Persona):\n\n• I do\n• You do\n👉 HE DOES (¡Lleva S!)\n👉 SHE DOES\n\nSi hablas de una sola persona (que no eres tú), usa DOES.","scaffolding":"Does he...?","mostrar_solucion":false},{"intento":3,"pista":"Solución: DOES.\n\nEs la 3ª persona del singular. La ''S'' ''siempre acompaña a He/She/It.","explicacion_analitica":"Third person singular (He/She/It) uses DOES, not DO.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PS_DOES_DO_AGREEMENT',
    'Present Simple (Do/Does)',
    'GRAMMAR_PRESENT_SIMPLE',
    '\\b(i|you|we|they|the\\s+(boys|girls|cats|dogs|children|people))\\s+does\\b',
    '[{"intento":1,"pista":"✋ ¡Alto! La Serpiente S solo sale con He/She/It.\nCon ''I'', ''You'' o Plurales, la serpiente se esconde.","mostrar_solucion":false},{"intento":3,"pista":"Solución: DO.\n\nSolo usamos DOES con Él (He) o Ella (She). Para el resto, usa DO.","explicacion_analitica":"I/You/We/They use DO. DOES is only for 3rd person singular.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'PS_HAVE_HAS_AGREEMENT',
    'Have/Has',
    'GRAMMAR_POSSESSION',
    '\\b(he|she|it|my\\s+(mum|dad|brother|sister|teacher)|the\\s+(boy|girl))\\s+have\\b',
    '[{"intento":1,"pista":"🐍 ¡La Serpiente S ataca de nuevo!\nEl verbo HAVE cambia totalmente con He/She/It. Se vuelve corto y con S.","mostrar_solucion":false},{"intento":2,"pista":"Regla del HAVE/HAS:\n\n• I have\n👉 SHE HAS\n👉 HE HAS\n\nCon la 3ª persona, Have se transforma en HAS.","scaffolding":"He ____ got a car.","mostrar_solucion":false},{"intento":3,"pista":"Solución: HAS.\n\nEs irregular: He HAS, She HAS.","explicacion_analitica":"Third person singular uses HAS, not HAVE.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'SHORT_ANSWER_AGREEMENT',
    'Short Answers',
    'GRAMMAR_GENERAL',
    '\\byes,? ?(he|she|it)\\s+do\\b|\\bno,? ?(he|she|it)\\s+don''?t\\b',
    '[{"intento":1,"pista":"En las respuestas cortas, el auxiliar debe coincidir con el sujeto.\nSi preguntan con ''Does'', respondes con...","mostrar_solucion":false},{"intento":2,"pista":"Regla del Espejo 🪞:\nSi la pregunta empieza por DOES (Does he...?), la respuesta termina en DOES (Yes, he does).\n¡No cambies al auxiliar DO!","mostrar_solucion":false},{"intento":3,"pista":"Solución: DOES (o DOESN''T si es No).\n\nHe/She siempre va con DOES.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'AUX_STEALS_S',
    'Auxiliary Verbs',
    'GRAMMAR_GENERAL',
    '\\bdoes\\s+(he|she|it|\\w+)\\s+\\w+s\\b',
    '[{"intento":1,"pista":"🕵️‍♂️ ¡Alerta de Robo!\nEl auxiliar DOES es un ladrón. ¡Le ha robado la ''S'' al verbo principal!","mostrar_solucion":false},{"intento":2,"pista":"Regla del Auxiliar Ladrón:\nCuando aparece DOES, el verbo principal se queda ''desnudo'' (sin S).\n\n❌ Does he plays?\n✅ Does he PLAY?\n\n¡La S ya está en doeS!","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

INSERT INTO uge_grammar_rules (rule_code, topic, scope_tag, regex_pattern, pedagogy_data, lomloe_ref) VALUES (
    'AUX_QUESTION_AGREEMENT',
    'Questions (Do/Does)',
    'GRAMMAR_PRESENT_SIMPLE',
    '\\b(do\\s+(he|she|it|the\\s+boy)|does\\s+(i|you|we|they|the\\s+boys))\\b',
    '[{"intento":1,"pista":"🐍 La regla de la Serpiente S también vale para preguntas.\n¿Quién es el sujeto? ¿''He/She'' o ''You/We''?","mostrar_solucion":false},{"intento":2,"pista":"Regla de Preguntas:\n\n👉 DOES he/she/it...?\n👉 DO you/we/they...?\n\nSi el sujeto es ''You'', la serpiente S no puede estar.","mostrar_solucion":true}]'::jsonb,
    'CP'
) ON CONFLICT (rule_code) DO NOTHING;

-- 2. EXERCISES
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Concepto',
    'What is the Present Simple?',
    'A verb tense for habits and routines',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Recuerda: Usamos el Present Simple para cosas que hacemos todos los días (Rutinas).","legacy_id":"G4_U1_CONCEPT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Afirmativa',
    'Complete: I ____ (play) football every day',
    'play',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 I play (Sin S). Solo He/She/It llevan S.","legacy_id":"G4_U1_AFFIRMATIVE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'He/She/It',
    'Complete: She ____ (play) tennis',
    'plays',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 He/She/It + Verbo con S. (She plays).","legacy_id":"G4_U1_3RD_PERSON_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Negativa',
    'Make negative: I like pizza',
    'I don''t like pizza',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has puesto ''I no like''? En inglés usamos DON''T (I don''t like).","legacy_id":"G4_U1_NEG_INFINITIVE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    '____ (Do/Does) you like Maths?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has puesto Does? Recuerda: DO you / we / they. DOES he / she.","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    '____ (Do/Does) she like Science?',
    'Does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has puesto Do? Recuerda: DOES she (3ª persona).","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    '____ (Do/Does) they walk to school?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 DO they (plural).","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    '____ (Do/Does) your brother play football?',
    'Does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has puesto Do? Your brother = HE, así que usamos DOES.","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    '____ (Do/Does) cats eat fish?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Cats (Ellos/as) -> DO.","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'I ____ (live) in Madrid.',
    'live',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 I live (Sin S).","legacy_id":"G4_U1_LIVE_WORK"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'She ____ (live) in London.',
    'lives',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has olvidado la S? She lives (3ª persona).","legacy_id":"G4_U1_LIVE_WORK"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'Where ____ (do/does) you live?',
    'do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Where DO you live?","legacy_id":"G4_U1_WH_DO"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'Where ____ (do/does) he live?',
    'does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Where DOES he live?","legacy_id":"G4_U1_WH_DO"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'I ____ (like) PE.',
    'like',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 I like.","legacy_id":"G4_U1_LIKE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'He ____ (not like) Music.',
    'doesn''t like',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Has puesto \"no like\"? En negativo es DOESN''T LIKE.","legacy_id":"G4_U1_NEG_LIKE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'We ____ (love) English.',
    'love',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 We love.","legacy_id":"G4_U1_LIKE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'She ____ (hate) Maths.',
    'hates',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 She hates (Con S).","legacy_id":"G4_U1_LIKE_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'Do you like Art? Yes, I ____.',
    'do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Short answer: Yes, I do.","legacy_id":"G4_U1_SHORT_ANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'Does he like History? No, he ____.',
    'doesn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Short answer: No, he doesn''t.","legacy_id":"G4_U1_SHORT_ANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Grammar',
    'My dog ____ (run) fast.',
    'runs',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 My dog = It -> Runs (Con S).","legacy_id":"G4_U1_3RD_PERSON_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: live / you / where / do / ?',
    'Where do you live?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Wh + do + subject + verb?","legacy_id":"G4_U1_ORDER_WH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: in / lives / she / Paris',
    'She lives in Paris',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Subject + Verb + Place.","legacy_id":"G4_U1_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: like / I / Maths',
    'I like Maths',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Subject + Verb + Object.","legacy_id":"G4_U1_ORDER_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: not / do / like / I / spiders',
    'I do not like spiders',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 I do not like...","legacy_id":"G4_U1_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: football / play / they / day / every',
    'They play football every day',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Place/Activity before Time.","legacy_id":"G4_U1_ORDER_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: does / where / work / she / ?',
    'Where does she work?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Wh + does + subj + verb?","legacy_id":"G4_U1_ORDER_WH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: chocolate / likes / John',
    'John likes chocolate',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Subject + Likes + Object.","legacy_id":"G4_U1_ORDER_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: school / to / walk / we',
    'We walk to school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 We walk to place.","legacy_id":"G4_U1_ORDER_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: often / play / I / tennis',
    'I often play tennis',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Adverb goes BEFORE the verb (Example: I often play).","legacy_id":"G4_U1_ORDER_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: never / eat / we / sweets',
    'We never eat sweets',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Adverb before verb.","legacy_id":"G4_U1_ORDER_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: brother / my / likes / dogs',
    'My brother likes dogs',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Subject + Likes + Object.","legacy_id":"G4_U1_ORDER_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: speak / English / do / you / ?',
    'Do you speak English?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Do + Subj + Verb + Obj?","legacy_id":"G4_U1_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: works / she / at / school / a',
    'She works at a school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 She works at a place.","legacy_id":"G4_U1_ORDER_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: breakfast / 8 / have / I / at',
    'I have breakfast at 8',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Time goes at the end.","legacy_id":"G4_U1_ORDER_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Word Order',
    'order: don''t / cats / like / I',
    'I don''t like cats',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 I don''t like...","legacy_id":"G4_U1_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Subject: Numbers and calculation.',
    'Maths',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Maths (Matemáticas).","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Subject: Plants, animals and body.',
    'Science',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Science (Ciencias).","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Subject: Running, jumping and sports.',
    'PE',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 PE = Physical Education.","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Subject: Drawing and painting.',
    'Art',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Art (Plástica).","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Subject: Playing instruments.',
    'Music',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Music (Música).","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Verb: To reside.',
    'Live',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Live (Vivir).","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Verb: To do a job.',
    'Work',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Work (Trabajar).","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Translate: Yo vivo en Barcelona.',
    'I live in Barcelona',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Live = Vivir.","legacy_id":"G4_U1_TRANS_LIVE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Person: Someone who teaches.',
    'Teacher',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Teach -> Teacher.","legacy_id":"G4_U1_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Action: To go on foot.',
    'Walk',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Walk (Caminar).","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Action: To ingest food.',
    'Eat',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Eat (Comer).","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Action: To learn at school.',
    'Study',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Study (Estudiar).","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Time: 7 days.',
    'Week',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Week (Semana).","legacy_id":"G4_U1_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Time: Saturday and Sunday.',
    'Weekend',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 Weekend (Fin de semana).","legacy_id":"G4_U1_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Present Simple (Unit 1)',
    'Vocabulario',
    'Activity: Homework.',
    'Do homework',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES"}',
    '{"legacy_expl":"💡 We say DO homework, not make.","legacy_id":"G4_U1_VOCAB_COLLOC"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (wake) up at 7:00.',
    'wake',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I wake up (Simple Present rutinario).","legacy_id":"G4_U2_ROUTINE_I"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'She ____ (wake) up at 8:00.',
    'wakes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Has olvidado la S? She wakes up.","legacy_id":"G4_U2_ROUTINE_3RD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (have) breakfast in the kitchen.',
    'have',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I have breakfast (No I eat breakfast).","legacy_id":"G4_U2_COLLOCATIONS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'He ____ (have) a shower.',
    'has',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Has puesto have? Recuerda: He HAS a shower.","legacy_id":"G4_U2_HAVE_HAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'They ____ (go) to school by bus.',
    'go',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 They go.","legacy_id":"G4_U2_GO_WENT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'She ____ (go) to school on foot.',
    'goes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Has puesto go? She goes (termina en ES).","legacy_id":"G4_U2_GOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (do) my homework.',
    'do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I do my homework.","legacy_id":"G4_U2_DO"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'He ____ (do) his homework.',
    'does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 He does (irregular 3ª persona).","legacy_id":"G4_U2_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (brush) my teeth.',
    'brush',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I brush.","legacy_id":"G4_U2_BRUSH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'She ____ (brush) her teeth.',
    'brushes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 She brushes (termina en ES).","legacy_id":"G4_U2_BRUSHES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'What time ____ (is) it?',
    'is',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 What time IS it?","legacy_id":"G4_U2_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'It ____ (is) half past four.',
    'is',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 It IS.","legacy_id":"G4_U2_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I go to school ____ (at/in) 9 o''clock.',
    'at',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Para horas usamos siempre AT (At 9:00).","legacy_id":"G4_U2_PREP_AT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I do homework ____ (at/in) the afternoon.',
    'in',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Para partes del día usamos IN (In the morning/afternoon/evening).","legacy_id":"G4_U2_PREP_IN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'She sleeps ____ (at/in) night.',
    'at',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Excepción: Decimos AT night.","legacy_id":"G4_U2_PREP_AT_NIGHT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (always/never) eat spiders.',
    'never',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Never = Nunca.","legacy_id":"G4_U2_ADVERBS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'I ____ (usually/never) go to school on Monday.',
    'usually',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Usually = Normalmente.","legacy_id":"G4_U2_ADVERBS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'He ____ (play) video games after school.',
    'plays',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 He plays (Con S).","legacy_id":"G4_U2_ROUTINE_3RD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'We ____ (watch) TV in the evening.',
    'watch',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 We watch.","legacy_id":"G4_U2_ROUTINE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Grammar',
    'Translate: Me visto.',
    'I get dressed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Get dressed.","legacy_id":"G4_U2_TRANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: up / wake / I / 7 / at',
    'I wake up at 7',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Subject + Verb + Time.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: face / my / wash / I',
    'I wash my face',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I wash my face.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: breakfast / has / she / kitchen / the / in',
    'She has breakfast in the kitchen',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 She has breakfast + place.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: to / goes / she / school / 9 / at',
    'She goes to school at 9',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 She goes + destination + time.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: homework / do / my / I / afternoon / the / in',
    'I do my homework in the afternoon',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I do homework + time.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: teeth / brush / my / I',
    'I brush my teeth',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 I brush my teeth.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: bed / to / go / I',
    'I go to bed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Go to bed.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: time / what / it / is / ?',
    'What time is it?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Question: What time...?","legacy_id":"G4_U2_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: is / past / half / four / it',
    'It is half past four',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 It is + time.","legacy_id":"G4_U2_ORDER_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: o''clock / it / ten / is',
    'It is ten o''clock',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 It is + time.","legacy_id":"G4_U2_ORDER_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: always / milk / drink / I',
    'I always drink milk',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Adverb (Always) before verb.","legacy_id":"G4_U2_ORDER_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: never / eats / pizza / she',
    'She never eats pizza',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Adverb (Never) before verb.","legacy_id":"G4_U2_ORDER_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: lunch / have / I / 2 / at',
    'I have lunch at 2',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Have lunch + time.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: dressed / get / I',
    'I get dressed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Get dressed.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Word Order',
    'order: school / finish / I / 5 / at',
    'I finish school at 5',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Finish school + time.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Stop sleeping.',
    'Wake up',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Wake up (Despertarse).","legacy_id":"G4_U2_VOCAB_PHRASE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Exit the bed.',
    'Get up',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Get up (Levantarse).","legacy_id":"G4_U2_VOCAB_PHRASE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Clean your body with water.',
    'Have a shower',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Have a shower (Ducharse).","legacy_id":"G4_U2_VOCAB_PHRASE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Clean your teeth.',
    'Brush your teeth',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Brush teeth (Lavarse los dientes).","legacy_id":"G4_U2_VOCAB_PHRASE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Put on clothes.',
    'Get dressed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Get dressed (Vestirse).","legacy_id":"G4_U2_VOCAB_PHRASE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Morning meal.',
    'Breakfast',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Breakfast (Desayuno).","legacy_id":"G4_U2_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Midday meal.',
    'Lunch',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Lunch (Comida).","legacy_id":"G4_U2_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Phrase: Evening meal.',
    'Dinner',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Dinner (Cena).","legacy_id":"G4_U2_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Time: 12:00.',
    'Twelve o''clock',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 O''clock (En punto).","legacy_id":"G4_U2_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Time: 12:30.',
    'Half past twelve',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Half past (Y media).","legacy_id":"G4_U2_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Time: 12:15.',
    'Quarter past twelve',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Quarter past (Y cuarto).","legacy_id":"G4_U2_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Time: 11:45.',
    'Quarter to twelve',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Quarter TO (Menos cuarto).","legacy_id":"G4_U2_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Adverb: 100% of the time.',
    'Always',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Always (Siempre).","legacy_id":"G4_U2_VOCAB_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Adverb: 0% of the time.',
    'Never',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Never (Nunca).","legacy_id":"G4_U2_VOCAB_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 2: Daily Routines',
    'Vocabulario',
    'Adverb: 50% of the time.',
    'Sometimes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Sometimes (A veces).","legacy_id":"G4_U2_VOCAB_ADV"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'He is ____ (a/an) artist.',
    'an artist',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Artist starts with a vowel (A) -> AN.","legacy_id":"G4_U3_ART_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'She is ____ (a/an) doctor.',
    'a doctor',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Doctor starts with consonant -> A.","legacy_id":"G4_U3_ART_A"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'My dad is ____ (a/an) engineer.',
    'an engineer',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Engineer starts with vowel (E) -> AN.","legacy_id":"G4_U3_ART_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'I want to be ____ (a/an) actor.',
    'an actor',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Actor starts with vowel (A) -> AN.","legacy_id":"G4_U3_ART_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'He is ____ (a/an) vet.',
    'a vet',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Vet starts with consonant -> A.","legacy_id":"G4_U3_ART_A"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: He is a architect.',
    'He is an architect',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 Has usado A, pero Architect empieza por vocal. Usamos AN.","legacy_id":"G4_U3_ERR_A_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: She is an teacher.',
    'She is a teacher',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 Has usado AN, pero Teacher empieza por consonante. Usamos A.","legacy_id":"G4_U3_ERR_A_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A nurse works ____ (at/in) a hospital.',
    'in',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 IN a hospital (inside).","legacy_id":"G4_U3_PREP_IN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A chef works ____ (at/in) a restaurant.',
    'in',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 IN a restaurant.","legacy_id":"G4_U3_PREP_IN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'He works ____ (at/in) the airport.',
    'at',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 AT the airport (location).","legacy_id":"G4_U3_PREP_AT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'She works ____ (at/in) a police station.',
    'at',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 AT the station.","legacy_id":"G4_U3_PREP_AT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A farmer works ____ (on/in) a farm.',
    'on',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 ON a farm (surface).","legacy_id":"G4_U3_PREP_ON"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: He works in the airport.',
    'He works at the airport',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 Has puesto IN, pero para lugares como Airport/Station preferimos AT.","legacy_id":"G4_U3_ERR_PREP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: She works at a farm.',
    'She works on a farm',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 Para granjas decimos ON a farm.","legacy_id":"G4_U3_ERR_PREP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A doctor ____ (help) sick people.',
    'helps',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Doctor (He/She) -> Helps.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A vet ____ (help) animals.',
    'helps',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Vet (He/She) -> Helps.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A teacher ____ (teach) students.',
    'teaches',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Teacher -> Teaches.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A firefighter ____ (stop) fires.',
    'stops',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Firefighter -> Stops.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A chef ____ (cook) food.',
    'cooks',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Chef -> Cooks.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A driver ____ (drive) a bus.',
    'drives',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Driver -> Drives.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'An artist ____ (paint) pictures.',
    'paints',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Artist -> Paints.","legacy_id":"G4_U3_VERB_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'A pilot ____ (fly) planes.',
    'flies',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Pilot -> Flies (y->ies).","legacy_id":"G4_U3_VERB_IES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: A doctor help people.',
    'A doctor helps people',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 ¡Cuidado! He/She necesita la S final (HELPS).","legacy_id":"G4_U3_ERR_NO_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: She fly a plane.',
    'She flies a plane',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 Fly termina en Y -> FLIES.","legacy_id":"G4_U3_ERR_SPELL_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Correct: He work in a bank.',
    'He works in a bank',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💎 He WORKS (con S).","legacy_id":"G4_U3_ERR_NO_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    '____ (Do/Does) a vet work with animals?',
    'Does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Vet = He/She -> DOES.","legacy_id":"G4_U3_DOES_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    '____ (Do/Does) teachers work in schools?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Teachers = They -> DO.","legacy_id":"G4_U3_DOES_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'Where ____ (do/does) a chef work?',
    'does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 Chef = He/She -> DOES.","legacy_id":"G4_U3_DOES_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    'What ____ (do/does) you want to be?',
    'do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 YOU -> DO.","legacy_id":"G4_U3_DOES_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Grammar',
    '____ (Do/Does) he like his job?',
    'Does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"💡 HE -> DOES.","legacy_id":"G4_U3_DOES_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: works / a / chef / restaurant / in / a',
    'A chef works in a restaurant',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + works + in + place.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: is / mum / my / vet / a',
    'My mum is a vet',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + is + a + job.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: work / does / he / school / in / a / ?',
    'Does he work in a school?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Does + subj + work + place?","legacy_id":"G4_U3_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: an / aunt / artist / is / my',
    'My aunt is an artist',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + is + AN + job.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: people / helps / doctor / a / sick',
    'A doctor helps sick people',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + helps + obj.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: where / work / firefighter / a / does / ?',
    'Where does a firefighter work?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Wh + does + subj + work?","legacy_id":"G4_U3_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: station / at / works / he / a / police',
    'He works at a police station',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + works + at + place.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: planes / flies / pilot / a',
    'A pilot flies planes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + flies + obj.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: want / to / be / teacher / a / I',
    'I want to be a teacher',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"I want to be...","legacy_id":"G4_U3_ORDER_WANT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: do / what / do / you / ?',
    'What do you do?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Standard question.","legacy_id":"G4_U3_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: animals / helps / vet / a',
    'A vet helps animals',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + helps + obj.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: school / works / a / in / teacher / a',
    'A teacher works in a school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + works + in + place.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: uniform / wear / nurses / a',
    'Nurses wear a uniform',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + wear + obj.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: not / he / work / does / a / bank / in',
    'He does not work in a bank',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Negative sentence.","legacy_id":"G4_U3_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Word Order',
    'order: taxi / drives / a / driver / taxi / a',
    'A taxi driver drives a taxi',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Subj + drives + obj.","legacy_id":"G4_U3_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Drives a bus 🚌.',
    'Bus driver',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Bus driver (Conductor).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Works in a shop 🏪.',
    'Shop assistant',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Shop assistant (Dependiente).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Stops fires 🚒.',
    'Firefighter',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Firefighter (Bombero).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Helps doctors 🏥.',
    'Nurse',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Nurse (Enfermero/a).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Cooks food 👨‍🍳.',
    'Chef',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Chef (Cocinero).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Design houses 🏠.',
    'Architect',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Architect (Arquitecto).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Catches bad people 👮.',
    'Police officer',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Police officer (Policía).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Grows food 🚜.',
    'Farmer',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Farmer (Granjero).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Job: Flies planes ✈️.',
    'Pilot',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Pilot (Piloto).","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where firefighters work 🚒.',
    'Fire station',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Fire station.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where doctors work 🏥.',
    'Hospital',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Hospital.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where teachers work 🏫.',
    'School',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"School.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where planes depart ✈️.',
    'Airport',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Airport.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where police work 🚓.',
    'Police station',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Police station.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 3: Jobs & Workplaces',
    'Vocabulario',
    'Place: Where you buy food 🛒.',
    'Supermarket',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"Supermarket.","legacy_id":"G4_U3_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'She ____ (have got) a cold.',
    'has got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 She + HAS got.","legacy_id":"G4_U4_HAS_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'I ____ (have got) a temperature.',
    'have got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 I + HAVE got.","legacy_id":"G4_U4_HAVE_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'He ____ (have got) a broken leg.',
    'has got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 He + HAS got.","legacy_id":"G4_U4_HAS_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'They ____ (have got) a cough.',
    'have got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 They + HAVE got.","legacy_id":"G4_U4_HAVE_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'My mum ____ (have got) a headache.',
    'has got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 My mum (She) + HAS got.","legacy_id":"G4_U4_HAS_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'You ____ (have got) a stomachache.',
    'have got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 You + HAVE got.","legacy_id":"G4_U4_HAVE_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'You have a cold. You ____ (should/shouldn''t) go to school.',
    'shouldn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Shouldn''t = No deberías.","legacy_id":"G4_U4_SHOULD_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'I have a headache. I ____ (should/shouldn''t) take some medicine.',
    'should',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Should = Deberías.","legacy_id":"G4_U4_SHOULD_POS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'He has a broken leg. He ____ (should/shouldn''t) play football.',
    'shouldn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 With a broken leg, NO football.","legacy_id":"G4_U4_SHOULD_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'She is tired. She ____ (should/shouldn''t) go to bed.',
    'should',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Tired -> Go to bed.","legacy_id":"G4_U4_SHOULD_POS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'They are hungry. They ____ (should/shouldn''t) eat fruit.',
    'should',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Hungry -> Eat.","legacy_id":"G4_U4_SHOULD_POS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'You have a toothache. You ____ (should/shouldn''t) eat sweets.',
    'shouldn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Toothache -> NO sweets.","legacy_id":"G4_U4_SHOULD_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'I am thirsty. I ____ (should/shouldn''t) drink water.',
    'should',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Thirsty -> Drink water.","legacy_id":"G4_U4_SHOULD_POS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Make negative: I have got a cold.',
    'I haven''t got a cold',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Negative: Haven''t got.","legacy_id":"G4_U4_HAVE_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Make negative: She has got a cough.',
    'She hasn''t got a cough',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Negative: Hasn''t got.","legacy_id":"G4_U4_HAS_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Does your head hurt? Yes, I ____ got a headache.',
    'have',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"I + have got.","legacy_id":"G4_U4_HAVE_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    '____ (Do/Does) you have a stomachache?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Do you have...?","legacy_id":"G4_U4_DO_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'My tummy hurts. I have a ______-ache.',
    'stomach',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Stomach + ache.","legacy_id":"G4_U4_STOMACH_SPELL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Complete: I feel ____ (dizzy/broken).',
    'dizzy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Feel dizzy (mareado).","legacy_id":"G4_U4_FEEL_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Translate: Me duele la cabeza.',
    'I have a headache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"I have a headache.","legacy_id":"G4_U4_TRANS_HEADACHE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Translate: Deberías ir al médico.',
    'You should go to the doctor',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Should + verb.","legacy_id":"G4_U4_TRANS_SHOULD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Translate: Ella tiene tos.',
    'She has got a cough',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"She has got.","legacy_id":"G4_U4_TRANS_COUGH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Correct: I has got a cold.',
    'I have got a cold',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"I HAVE, not has.","legacy_id":"G4_U4_ERR_HAVE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Correct: She should goes to bed.',
    'She should go to bed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Should + Infinitive (NO S).","legacy_id":"G4_U4_ERR_SHOULD_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Correct: I am thirst.',
    'I am thirsty',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"ThirstY (adjective).","legacy_id":"G4_U4_ERR_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Correct: He haven''t got a cold.',
    'He hasn''t got a cold',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"He HASN''T.","legacy_id":"G4_U4_ERR_HASNT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Grammar',
    'Preposition: I have a pain ___ my leg.',
    'in',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Pain IN my leg.","legacy_id":"G4_U4_PREP_PAIN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: throat / a / sore / have / I / got',
    'I have got a sore throat',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + have got + ailment","legacy_id":"G4_U4_ORDER_1"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: she / headache / a / has / got',
    'She has got a headache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + has got + ailment","legacy_id":"G4_U4_ORDER_2"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: should / bed / go / you / to',
    'You should go to bed',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + should + verb","legacy_id":"G4_U4_ORDER_3"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: dentist / the / to / go / should / he',
    'He should go to the dentist',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + should + go to...","legacy_id":"G4_U4_ORDER_4"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: stomachache / a / got / they / have',
    'They have got a stomachache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + have got + ailment","legacy_id":"G4_U4_ORDER_5"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: water / drink / should / I',
    'I should drink water',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + should + verb","legacy_id":"G4_U4_ORDER_6"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: sweets / eat / shouldn''t / you',
    'You shouldn''t eat sweets',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + shouldn''t + verb","legacy_id":"G4_U4_ORDER_7"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: wrong / what / ? / is',
    'What is wrong?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Question phrase.","legacy_id":"G4_U4_ORDER_8"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: matter / the / what / is / ?',
    'What is the matter?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Standard question.","legacy_id":"G4_U4_ORDER_9"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: feel / I / sick',
    'I feel sick',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + feel + adj","legacy_id":"G4_U4_ORDER_10"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: broken / he / leg / a / has',
    'He has a broken leg',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + has + obj","legacy_id":"G4_U4_ORDER_11"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: cut / finger / my / I',
    'I cut my finger',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + verb + obj","legacy_id":"G4_U4_ORDER_12"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: earache / got / an / have / you',
    'You have got an earache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"You have got AN earache.","legacy_id":"G4_U4_ORDER_13"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: medicine / take / she / should',
    'She should take medicine',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Subject + should + verb","legacy_id":"G4_U4_ORDER_14"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Word Order',
    'order: matter / with / you / ? / what''s',
    'What''s the matter with you?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Standard phrase.","legacy_id":"G4_U4_ORDER_15"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 🤒 (High temperature)',
    'Fever',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Fever = Fiebre.","legacy_id":"G4_U4_VOCAB_FEVER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 🦷💥 (Tooth pain)',
    'Toothache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Tooth + ache.","legacy_id":"G4_U4_VOCAB_TOOTH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 👂💥 (Ear pain)',
    'Earache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Ear + ache.","legacy_id":"G4_U4_VOCAB_EAR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 🥣🤢 (Stomach pain)',
    'Stomachache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Stomach + ache.","legacy_id":"G4_U4_VOCAB_STOMACH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 🤧 (Sneeze/Runny nose)',
    'Cold',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Cold = Resfriado.","legacy_id":"G4_U4_VOCAB_COLD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Emoji Definition: 🗣️💥 (Throat pain)',
    'Sore throat',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Sore throat.","legacy_id":"G4_U4_VOCAB_THROAT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Opposite: Healthy',
    'Unhealthy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Unhealthy = No saludable.","legacy_id":"G4_U4_VOCAB_OPP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Feeling: I want water. I am ____.',
    'Thirsty',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Thirsty = Sediento.","legacy_id":"G4_U4_VOCAB_FEEL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Feeling: I want food. I am ____.',
    'Hungry',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Hungry = Hambriento.","legacy_id":"G4_U4_VOCAB_FEEL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Feeling: I want to sleep. I am ____.',
    'Tired',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Tired = Cansado.","legacy_id":"G4_U4_VOCAB_FEEL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Feeling: I am spinning. I feel ____.',
    'Dizzy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Dizzy = Mareado.","legacy_id":"G4_U4_VOCAB_FEEL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Definition: A place with doctors.',
    'Hospital',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Hospital.","legacy_id":"G4_U4_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Definiton: You take this when you are sick.',
    'Medicine',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"Medicine.","legacy_id":"G4_U4_VOCAB_MED"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Definition: You put this on a cut.',
    'Plaster',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Plaster = Tirita.","legacy_id":"G4_U4_VOCAB_PLASTER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 4: Health & Feelings',
    'Vocabulario',
    'Definition: White material for broken bones 🏥.',
    'Bandage',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_POSSESSION","GRAMMAR_MODALS"}',
    '{"legacy_expl":"💡 Bandage (Venda).","legacy_id":"G4_U4_VOCAB_MED"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'A simple car is ____ (cheap) than a Ferrari.',
    'cheaper',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Cheap -> Cheaper.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'This box is ____ (light) than that one.',
    'lighter',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Light -> Lighter.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'My dog is ____ (fast) than your cat.',
    'faster',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Fast -> Faster.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'You are ____ (tall) than me.',
    'taller',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Tall -> Taller.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Winter is ____ (cold) than summer.',
    'colder',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Cold -> Colder.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Correct: It is more big.',
    'It is bigger',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💎 Has puesto MORE BIG, pero si el adjetivo es corto, añadimos -ER (BIGGER).","legacy_id":"G4_U5_ERR_MORE_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Correct: She is more tall.',
    'She is taller',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💎 Adjetivo corto (Tall) -> TALLER (No usamos more).","legacy_id":"G4_U5_ERR_MORE_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'I am ____ (happy) than yesterday.',
    'happier',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Happy -> Happier.","legacy_id":"G4_U5_SPELL_Y"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'This exam was ____ (easy) than the last one.',
    'easier',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Easy -> Easier.","legacy_id":"G4_U5_SPELL_Y"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'My bag is ____ (heavy) than yours.',
    'heavier',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Heavy -> Heavier.","legacy_id":"G4_U5_SPELL_Y"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Correct: He is happyer.',
    'He is happier',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💎 Has escrito HAPPYER, pero si termina en Y, la cambiamos por I (HAPPIER).","legacy_id":"G4_U5_ERR_Y_SPELL"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'An elephant is ____ (big) than a mouse.',
    'bigger',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Big -> Bigger (Double G).","legacy_id":"G4_U5_SPELL_DOUBLE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Spain is ____ (hot) than the UK.',
    'hotter',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Hot -> Hotter (Double T).","legacy_id":"G4_U5_SPELL_DOUBLE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'My cat is ____ (fat) than my dog.',
    'fatter',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Fat -> Fatter (Double T).","legacy_id":"G4_U5_SPELL_DOUBLE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'A lion is ____ (dangerous) than a rabbit.',
    'more dangerous',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Dangerous -> More dangerous.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'This game is ____ (exciting) than homework.',
    'more exciting',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Exciting -> More exciting.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Gold is ____ (expensive) than silver.',
    'more expensive',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Expensive -> More expensive.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'She is ____ (intelligent) than him.',
    'more intelligent',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Intelligent -> More intelligent.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'My painting is ____ (beautiful) than yours.',
    'more beautiful',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Beautiful -> More beautiful.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'A cheetah is ____ (fast) than a leopard.',
    'faster',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Fast -> Faster.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Russia is ____ (big) than Spain.',
    'bigger',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Big -> Bigger (double G).","legacy_id":"G4_U5_SPELL_DOUBLE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'A snake is ____ (dangerous) than a rabbit.',
    'more dangerous',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Dangerous -> More dangerous.","legacy_id":"G4_U5_LONG_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'A giraffe is ____ (tall) than a zebra.',
    'taller',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Tall -> Taller.","legacy_id":"G4_U5_ER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Correct: He is taller me.',
    'He is taller than me',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💎 Has olvidado THAN. En comparativos siempre ponemos THAN entre los dos elementos (A is taller THAN B).","legacy_id":"G4_U5_ERR_THAN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Correct: It is more expensive silver.',
    'It is more expensive than silver',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💎 Has olvidado THAN (more expensive THAN silver).","legacy_id":"G4_U5_ERR_THAN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'My marks are ____ (good) than yours.',
    'better',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Good -> Better (irregular).","legacy_id":"G4_U5_IRR_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'This pizza is ____ (good) than that one.',
    'better',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Good -> BETTER, not \"gooder\".","legacy_id":"G4_U5_IRR_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'Today the weather is ____ (bad) than yesterday.',
    'worse',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Bad -> Worse (irregular).","legacy_id":"G4_U5_IRR_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Grammar',
    'This film is ____ (bad) than that one.',
    'worse',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"💡 Bad -> WORSE, not \"badder\".","legacy_id":"G4_U5_IRR_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: faster / a / cheetah / is / than / a / lion',
    'A cheetah is faster than a lion',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + is + faster + than + object.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: whale / a / is / bigger / shark / a / than',
    'A whale is bigger than a shark',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + is + bigger + than + object.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: than / smaller / mouse / a / is / cat / a',
    'A mouse is smaller than a cat',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A is smaller than B.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: more / dangerous / sharks / than / dolphins / are',
    'Sharks are more dangerous than dolphins',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Long comparative structure.","legacy_id":"G4_U5_ORDER_LONG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: intelligent / are / dolphins / very',
    'Dolphins are very intelligent',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + verb + adj.","legacy_id":"G4_U5_ORDER_BASIC"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: a / faster / cheetah / than / is / lion / a',
    'A cheetah is faster than a lion',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A is faster than B.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: bigger / whale / than / a / shark / a / is',
    'A whale is bigger than a shark',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A is bigger than B.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: dangerous / more / mosquito / a / than / is / fly / a',
    'A mosquito is more dangerous than a fly',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A is more dangerous than B.","legacy_id":"G4_U5_ORDER_LONG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: better / he / at / is / than / football / me',
    'He is better than me at football',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"He is better than me.","legacy_id":"G4_U5_ORDER_IRR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: than / longer / Nile / the / Amazon / is / the',
    'The Nile is longer than the Amazon',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A is longer than B.","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: not / is / snake / a / legs / with / animal / an',
    'A snake is an animal with not legs',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"A snake...","legacy_id":"G4_U5_ORDER_MIX"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: snake / a / legs / got / hasn''t',
    'A snake hasn''t got legs',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + hasn''t got + obj.","legacy_id":"G4_U5_ORDER_MIX"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: can / eagles / fly / high',
    'Eagles can fly high',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + can + verb.","legacy_id":"G4_U5_ORDER_MIX"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: swim / can / sharks / fast',
    'Sharks can swim fast',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Subject + can + verb.","legacy_id":"G4_U5_ORDER_MIX"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Word Order',
    'order: than / better / dogs / cats / are',
    'Dogs are better than cats',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Good -> Better","legacy_id":"G4_U5_ORDER_COMP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: King of the jungle 🦁',
    'Lion',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Lion (León).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: Big fish with big teeth 🦈',
    'Shark',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Shark (Tiburón).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: Very big animal in the sea 🐋',
    'Whale',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Whale (Ballena).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: Very fast cat with spots 🐆',
    'Cheetah',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Cheetah (Guepardo).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: Bird that flies high 🦅',
    'Eagle',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Eagle (Águila).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: Small reptile 🦎',
    'Lizard',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Lizard (Lagartija).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: It has no legs and hisses 🐍',
    'Snake',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Snake (Serpiente).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Animal: It swims and is intelligent 🐬',
    'Dolphin',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Dolphin (Delfín).","legacy_id":"G4_U5_VOCAB_ANIM"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Opposite: Slow 🐢',
    'Fast',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Fast (Rápido).","legacy_id":"G4_U5_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Opposite: Weak',
    'Strong',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Strong (Fuerte).","legacy_id":"G4_U5_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Opposite: Heavy 🏋️',
    'Light',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Light (Ligero).","legacy_id":"G4_U5_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Opposite: Safe',
    'Dangerous',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Dangerous (Peligroso).","legacy_id":"G4_U5_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Opposite: Ugly',
    'Beautiful',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Beautiful (Bello).","legacy_id":"G4_U5_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Translate: Peor',
    'Worse',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Bad -> Worse.","legacy_id":"G4_U5_VOCAB_IRR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 5: Comparatives',
    'Vocabulario',
    'Translate: Mejor (comparativo)',
    'Better',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_COMPARATIVES"}',
    '{"legacy_expl":"Good -> Better.","legacy_id":"G4_U5_VOCAB_IRR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'I ____ (be) happy yesterday.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 I -> WAS.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'He ____ (be) at the cinema.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 He -> WAS.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'She ____ (be) my teacher last year.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 She -> WAS.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'It ____ (be) sunny yesterday.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 It -> WAS.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'My dad ____ (be) angry.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 My dad (He) -> WAS.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'We ____ (be) at the park.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 We -> WERE.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'You ____ (be) late for school.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 You -> WERE.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'They ____ (be) best friends.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 They -> WERE.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'The dogs ____ (be) hungry.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 The dogs (They) -> WERE.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Tom and Jerry ____ (be) enemies.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 Plural -> WERE.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'I ____ (not be) sad.',
    'wasn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 I wasn''t.","legacy_id":"G4_U6_WASNT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'She ____ (not be) at home.',
    'wasn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 She wasn''t.","legacy_id":"G4_U6_WASNT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'We ____ (not be) tired.',
    'weren''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 We weren''t.","legacy_id":"G4_U6_WERENT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'They ____ (not be) in the kitchen.',
    'weren''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 They weren''t.","legacy_id":"G4_U6_WERENT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Correct: You was my friend.',
    'You were my friend',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💎 Has usado WAS para YOU. Recuerda: You/We/They van con el equipo WERE.","legacy_id":"G4_U6_ERR_TEAM_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Correct: She were happy.',
    'She was happy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💎 Has usado WERE para SHE. Recuerda: I/He/She/It van con el equipo WAS.","legacy_id":"G4_U6_ERR_TEAM_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    '____ (Was/Were) she sick?',
    'Was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 WAS she...?","legacy_id":"G4_U6_Q_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    '____ (Was/Were) they at school?',
    'Were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 WERE they...?","legacy_id":"G4_U6_Q_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    '____ (Was/Were) it cold?',
    'Was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 WAS it...?","legacy_id":"G4_U6_Q_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Where ____ (was/were) you?',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 Where WERE you?","legacy_id":"G4_U6_Q_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Was he tired? Yes, he ____.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 Yes, he was.","legacy_id":"G4_U6_SHORT_ANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Were they famous? No, they ____.',
    'weren''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 No, they weren''t.","legacy_id":"G4_U6_SHORT_ANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Today it is sunny, but yesterday it ____ (be) rainy.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 Yesterday -> Was.","legacy_id":"G4_U6_CONTRAST"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Now I am happy, but last night I ____ (be) sad.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 Last night -> Was.","legacy_id":"G4_U6_CONTRAST"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'They are at home now. They ____ (be) at school this morning.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💡 This morning (Past) -> Were.","legacy_id":"G4_U6_CONTRAST"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Correct: Yesterday I is tired.',
    'Yesterday I was tired',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💎 Has puesto IS, pero la frase dice YESTERDAY (Ayer). El pasado de IS es WAS.","legacy_id":"G4_U6_ERR_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Correct: He no was happy.',
    'He wasn''t happy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💎 Has escrito NO WAS. En inglés el pasado se niega con N''T al final: WASN''T.","legacy_id":"G4_U6_ERR_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Grammar',
    'Correct: We no were at home.',
    'We weren''t at home',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"💎 No digas NO WERE. Usa WEREN''T.","legacy_id":"G4_U6_ERR_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: yesterday / was / I / happy',
    'I was happy yesterday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Subject + was + adj + time.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: at / were / they / cinema / the / night / last',
    'They were at the cinema last night',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Subj + were + place + time.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: sick / she / was / ?',
    'Was she sick?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Was + subj + adj?","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: not / was / he / school / at',
    'He was not at school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"He was not...","legacy_id":"G4_U6_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: were / we / tired / very',
    'We were very tired',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"We were + adj.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: born / you / where / were / ?',
    'Where were you born?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Wh + were + subj + born?","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: sunny / it / was / Sunday / last',
    'It was sunny last Sunday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"It was + adj + time.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: friends / were / my / they',
    'They were my friends',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Subject + were + noun.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: wasn''t / it / cold / yesterday',
    'It wasn''t cold yesterday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Negative sentence.","legacy_id":"G4_U6_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: were / why / sad / you / ?',
    'Why were you sad?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Why + were + subj + adj?","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: zoo / the / at / was / I',
    'I was at the zoo',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"I was at the place.","legacy_id":"G4_U6_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: good / film / the / was / ?',
    'Was the film good?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Was + noun + adj?","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: very / weren''t / hungry / we',
    'We weren''t very hungry',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Negative sentence.","legacy_id":"G4_U6_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: yesterday / where / she / was / ?',
    'Where was she yesterday?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Wh + was + subj + time?","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Word Order',
    'order: party / the / at / weren''t / you',
    'You weren''t at the party',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Negative structure.","legacy_id":"G4_U6_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Time: The day before today.',
    'Yesterday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Yesterday (Ayer).","legacy_id":"G4_U6_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Time: The night before today.',
    'Last night',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Last night (Anoche).","legacy_id":"G4_U6_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Time: 7 days ago.',
    'Last week',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Last week (La semana pasada).","legacy_id":"G4_U6_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Time: 365 days ago.',
    'Last year',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Last year (El año pasado).","legacy_id":"G4_U6_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Time: Two days ____ (past marker).',
    'ago',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Ago (Hace...).","legacy_id":"G4_U6_VOCAB_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Place: Where you watch films (C _ _ _ _ _).',
    'Cinema',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Cinema.","legacy_id":"G4_U6_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Place: Where you learn (S _ _ _ _ _).',
    'School',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"School.","legacy_id":"G4_U6_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Place: Where you sleep (H _ _ _).',
    'Home',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Home.","legacy_id":"G4_U6_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Place: Where you see animals (Z _ _).',
    'Zoo',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Zoo.","legacy_id":"G4_U6_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Place: Where you play outside (P _ _ _).',
    'Park',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Park.","legacy_id":"G4_U6_VOCAB_PLACE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Feeling: Not happy.',
    'Sad',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Sad (Triste).","legacy_id":"G4_U6_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Feeling: Not feeling well 🤢.',
    'Sick',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Sick (Enfermo).","legacy_id":"G4_U6_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Feeling: Needing to sleep 😴.',
    'Tired',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Tired (Cansado).","legacy_id":"G4_U6_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Feeling: Not interested 😑.',
    'Bored',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"Bored (Aburrido).","legacy_id":"G4_U6_VOCAB_ADJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 6: Past Simple (Was/Were)',
    'Vocabulario',
    'Translate: Estuve enfermo.',
    'I was sick',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PAST_SIMPLE"}',
    '{"legacy_expl":"I was sick.","legacy_id":"G4_U6_TRANS_SENTENCE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Vocabulary: Food and Drinks',
    'Frutas',
    'Name 3 fruits in English',
    'Apple, banana, orange, strawberry...',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX"}',
    '{"legacy_expl":"Common fruits","legacy_id":"G4_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Vocabulary: Food and Drinks',
    'Verduras',
    'Name 3 vegetables in English',
    'Carrot, tomato, lettuce, potato...',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX"}',
    '{"legacy_expl":"Common vegetables","legacy_id":"G4_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Vocabulary: Food and Drinks',
    'Comida sana',
    'Is an apple healthy or unhealthy?',
    'Healthy',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX"}',
    '{"legacy_expl":"Fruit is healthy","legacy_id":"G4_VOCAB_FOOD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    '____ (Do/Does) you like chocolate?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Do you...?","legacy_id":"G4_U1_DO_DOES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'She ____ (play) tennis on Sundays.',
    'plays',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: She plays (3rd person).","legacy_id":"G4_U1_3RD_PERSON_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'They ____ (not/walk) to school.',
    'don''t walk',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: They don''t walk.","legacy_id":"G4_U1_NEG_INFINITIVE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'Does he like Pizza? Yes, he ____.',
    'does',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Yes, he does.","legacy_id":"G4_U1_SHORT_ANS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'My cat ____ (sleep) a lot.',
    'sleeps',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: It sleeps.","legacy_id":"G4_U1_3RD_PERSON_S"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: you / live / do / where / ?',
    'Where do you live?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Question order.","legacy_id":"G4_U1_ORDER_WH"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: maths / like /  I / don''t',
    'I don''t like Maths',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Negative order.","legacy_id":"G4_U1_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: works / she / a / bank / in',
    'She works in a bank',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Affirmative order.","legacy_id":"G4_U1_ORDER_AFF"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Subject: Numbers (+ - x).',
    'Maths',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Maths.","legacy_id":"G4_U1_VOCAB_SUBJ"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Verb: To perform a job.',
    'Work',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U1: Work.","legacy_id":"G4_U1_VOCAB_VERB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'I ____ (wake) up at 7:00.',
    'wake',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: I wake up.","legacy_id":"G4_U2_ROUTINE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'She ____ (have) a shower.',
    'has',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: She has.","legacy_id":"G4_U2_HAS_SHOWER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'He ____ (go) to bed late.',
    'goes',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: He goes (es).","legacy_id":"G4_U2_GOES_ES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'I ____ (do) my homework.',
    'do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Do homework.","legacy_id":"G4_U2_DO_HW"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'It is half ____ (past/to) four (4:30).',
    'past',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Half past four.","legacy_id":"G4_U2_TIME"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: up / get / I / at / eight',
    'I get up at eight',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Routine order.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: goes / to / she / school',
    'She goes to school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Routine order.","legacy_id":"G4_U2_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: is / time / what / it / ?',
    'What time is it?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Time question.","legacy_id":"G4_U2_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Action: Eating at midday.',
    'Have lunch',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Lunch.","legacy_id":"G4_U2_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Action: Cleaning your teeth.',
    'Brush teeth',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U2: Brush teeth.","legacy_id":"G4_U2_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'He is ____ (a/an) architect.',
    'an architect',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: An + Vowel.","legacy_id":"G4_U3_ART_AN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'She is ____ (a/an) vet.',
    'a vet',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: A + Consonant.","legacy_id":"G4_U3_ART_A"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'A doctor works ____ (at/in) a hospital.',
    'in',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: IN a hospital.","legacy_id":"G4_U3_PREP_IN"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'A police officer works ____ (at/in) a police station.',
    'at',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: AT a station.","legacy_id":"G4_U3_PREP_AT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'A pilot ____ (fly) planes.',
    'flies',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: Flies (y->ies).","legacy_id":"G4_U3_VERB_IES"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: teacher / a / works / school / in / a',
    'A teacher works in a school',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: Subject + Verb + Place.","legacy_id":"G4_U3_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: want / to / I / be / artist / an',
    'I want to be an artist',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: I want to be...","legacy_id":"G4_U3_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: does / where / he / work / ?',
    'Where does he work?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: Job question.","legacy_id":"G4_U3_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Job: Helps sick people.',
    'Doctor',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: Doctor.","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Job: Cooks in a restaurant.',
    'Chef',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U3: Chef.","legacy_id":"G4_U3_VOCAB_JOB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'I ____ (have got) a cold.',
    'have got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: I have got.","legacy_id":"G4_U4_HAVE_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'She ____ (have got) a headache.',
    'has got',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: She has got.","legacy_id":"G4_U4_HAS_GOT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'You have a cough. You ____ (should/shouldn''t) drink water.',
    'should',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Advice (Good).","legacy_id":"G4_U4_SHOULD"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'He has a broken leg. He ____ (should/shouldn''t) play football.',
    'shouldn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Advice (Bad).","legacy_id":"G4_U4_SHOULD_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    '____ (Do/Does) you have a tummy ache?',
    'Do',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Do you have...?","legacy_id":"G4_U4_DO_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: matter / the / what / is / ?',
    'What is the matter?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Health question.","legacy_id":"G4_U4_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: got / I / earache / an / have',
    'I have got an earache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: I have got...","legacy_id":"G4_U4_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: medicine / take / should / she',
    'She should take medicine',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Advice order.","legacy_id":"G4_U4_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Ailment: Hot body temperature.',
    'Fever',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Fever.","legacy_id":"G4_U4_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Ailment: Pain in your head.',
    'Headache',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U4: Headache.","legacy_id":"G4_U4_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'A lion is ____ (big) than a cat.',
    'bigger',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Bigger (double g).","legacy_id":"G4_U5_COMP_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'A shark is ____ (dangerous) than a fish.',
    'more dangerous',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: More dangerous (long).","legacy_id":"G4_U5_COMP_LONG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'The cheetah is the ____ (fast) animal.',
    'fastest',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: The fastest (superlative).","legacy_id":"G4_U5_SUPER_SHORT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'I am ____ (good) than you at tennis.',
    'better',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Good -> Better.","legacy_id":"G4_U5_IRR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'This is the ____ (bad) film.',
    'worst',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Bad -> Worst.","legacy_id":"G4_U5_IRR"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: is / than / faster / car / bike / a / a',
    'A car is faster than a bike',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Comparison order.","legacy_id":"G4_U5_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: animal / is / the / blue / biggest / whale / the',
    'The blue whale is the biggest animal',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Superlative order.","legacy_id":"G4_U5_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: are / dolphins / intelligent / very',
    'Dolphins are very intelligent',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Adjective order.","legacy_id":"G4_U5_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Animal: King of the jungle.',
    'Lion',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Lion.","legacy_id":"G4_U5_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Opposite: Heavy.',
    'Light',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U5: Heavy <-> Light.","legacy_id":"G4_U5_VOCAB_OPP"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'I ____ (be) happy yesterday.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: I was.","legacy_id":"G4_U6_WAS"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'They ____ (be) at the park.',
    'were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: They were.","legacy_id":"G4_U6_WERE"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'She ____ (not be) hungry.',
    'wasn''t',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: She wasn''t.","legacy_id":"G4_U6_WASNT"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    '____ (Was/Were) you tired?',
    'Were',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Were you...?","legacy_id":"G4_U6_WERE_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Grammar',
    'Today is Sunday, yesterday ____ (be) Saturday.',
    'was',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Yesterday was.","legacy_id":"G4_U6_CONTRAST"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: was / I / school / at / yesterday',
    'I was at school yesterday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Past order.","legacy_id":"G4_U6_ORDER"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: where / yesterday / were / you / ?',
    'Where were you yesterday?',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Past question.","legacy_id":"G4_U6_ORDER_Q"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Word Order',
    'order: weren''t / we / home / at',
    'We weren''t at home',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Negative order.","legacy_id":"G4_U6_ORDER_NEG"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Time: The day before today.',
    'Yesterday',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Yesterday.","legacy_id":"G4_U6_VOCAB"}'::jsonb
);
INSERT INTO uge_exercises (source_unit, question_type, prompt, correct_answer, valid_scopes, legacy_metadata) VALUES (
    'Unit 7: Final Boss (The Big Mix)',
    'Vocabulario',
    'Place: Where you see films.',
    'Cinema',
    '{"GLOBAL_SPELLING","GLOBAL_SYNTAX","GRAMMAR_PRESENT_SIMPLE","GRAMMAR_PRESENT_CONTINUOUS","GRAMMAR_PAST_SIMPLE","GRAMMAR_COMPARATIVES","GRAMMAR_POSSESSION","GRAMMAR_MODALS","GRAMMAR_ARTICLES","GRAMMAR_PREPOSITIONS"}',
    '{"legacy_expl":"U6: Cinema.","legacy_id":"G4_U6_VOCAB"}'::jsonb
);
