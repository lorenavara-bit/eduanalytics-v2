# Especificación Completa: Tutor IA Conversacional

**Fecha:** 13 de Enero 2026  
**Versión:** 1.0  
**Propósito:** Especificación técnica y funcional completa del Tutor IA conversacional de EduAnalytics V2

---

## 📋 Índice

1. [Visión General](#visión-general)
2. [Arquitectura de Modos](#arquitectura-de-modos)
3. [Flujo de Usuario Completo](#flujo-de-usuario-completo)
4. [Especificación por Modo](#especificación-por-modo)
5. [Sistema de Perfilado Progresivo](#sistema-de-perfilado-progresivo)
6. [Integración con LOMLOE](#integración-con-lomloe)
7. [Casos de Uso Detallados](#casos-de-uso-detallados)
8. [Requisitos Técnicos](#requisitos-técnicos)
9. [Plan de Implementación](#plan-de-implementación)

---

## 🎯 Visión General

### Objetivos del Tutor IA

**Misión:** Crear un tutor conversacional que conoce profundamente a cada estudiante y adapta su enseñanza a su forma única de aprender, cumpliendo con el currículo oficial LOMLOE.

**Diferenciadores Clave:**

1. **Perfilado Progresivo Inteligente**
   - No requiere 80 preguntas de golpe
   - Aprende del estudiante mientras lo usa
   - Perfil mejora automáticamente con el tiempo

2. **Contexto Curricular LOMLOE**
   - Acceso a saberes básicos oficiales
   - Criterios de evaluación por curso/asignatura
   - Competencias clave integradas

3. **Detección Temprana NEE**
   - Monitorización pasiva de patrones TDAH, Dislexia, AACC
   - Sugerencias a padres cuando detecta señales
   - No invasivo ni obligatorio

4. **Feedback Constructivo Educativo**
   - Nunca solo "correcto/incorrecto"
   - Formato: ✅ Lo que hizo bien → ⚠️ Dónde mejorar → 💡 Cómo hacerlo
   - Detecta patrones de error para personalizar futuras explicaciones

5. **Memoria Persistente**
   - Recuerda conversaciones pasadas
   - Conoce temas donde el estudiante tiene dificultades
   - Adapta según historial de errores

---

## 🏗️ Arquitectura de Modos

El Tutor IA es un **chat único que cambia de modo según el contexto**.

### Modos Operativos

```
┌─────────────────────────────────────────────────────────┐
│                    TUTOR IA ÚNICO                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │  MODO ONBOARDING │  │  MODO TUTOR      │           │
│  │  (Primera vez)   │─→│  ACADÉMICO       │           │
│  │                  │  │  (Uso normal)    │           │
│  └──────────────────┘  └──────────────────┘           │
│                               ↕                         │
│                        ┌──────────────────┐            │
│                        │  MODO PERFIL     │            │
│                        │  (Opcional)      │            │
│                        └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

**Criterios de Cambio de Modo:**

- **Onboarding** → Activado si `student.onboarding_completed = false`
- **Tutor Académico** → Modo por defecto una vez completado onboarding
- **Modo Perfil** → Activado si usuario escribe "quiero hacer test" o accede desde menú

---

## 📊 Flujo de Usuario Completo

### Primera Vez (Usuario Nuevo)

```
Usuario abre Tutor IA por primera vez
    ↓
[MODO ONBOARDING - FASE 1: Info Básica]
    │
    ├→ IA: "¡Hola! Soy tu tutor personal. ¿Cómo te llamas?"
    ├→ Usuario: "María"
    ├→ IA: "¡Encantado María! ¿En qué curso estás?"
    ├→ Usuario: "4º primaria"
    ├→ Sistema guarda: student.name, student.grade_level
    ↓
[MODO ONBOARDING - FASE 2: Test VARK Gamificado]
    │
    ├→ IA: "Ahora vamos a descubrir tu SUPERPODER de aprendizaje 🦸‍♀️
    │      Te haré 12 preguntas divertidas.
    │      Al final sabrás si eres Visual, Kinestésico, Auditivo o Lector.
    │      ¿Lista?"
    │
    ├→ [4 preguntas VARK - Bloque 1]
    ├→ IA: "¡Primeros resultados! Parece que eres 60% VISUAL..."
    │
    ├→ [4 preguntas VARK - Bloque 2]
    ├→ IA: "¡Actualización! 70% Visual + 30% Kinestésico..."
    │
    ├→ [4 preguntas VARK - Bloque 3]
    ├→ IA: "🎉 RESULTADO FINAL: VISUAL-KINESTÉSICO
    │      
    │      Esto significa que aprendes mejor:
    │      ✅ Viendo diagramas y esquemas
    │      ✅ Haciendo ejercicios prácticos
    │      ✅ Dibujando mapas mentales
    │      
    │      Voy a adaptar TODAS mis explicaciones a tu estilo."
    │
    ├→ Sistema guarda: learning_profile.vark_dominant = 'visual-kinestesico'
    ├→ Sistema marca: student.onboarding_completed = true
    ↓
[MODO ONBOARDING - FASE 3: Test NEE (Solo para Padres)]
    │
    ├→ Notificación a padre/madre (no al niño):
    │  "Para personalizar mejor el aprendizaje de María,
    │   ¿has notado alguna de estas señales?
    │   □ Dificultades de lectura/escritura
    │   □ Problemas de atención/concentración
    │   □ Altas capacidades intelectuales
    │   
    │   Puedes hacer un test de detección temprana (opcional)
    │   en la sección Diagnóstico."
    │
    ├→ Si padre acepta → Redirige a módulo Diagnóstico
    ├→ Si padre declina → Skip (se monitorizará pasivamente)
    ↓
[TRANSICIÓN A TUTOR ACADÉMICO]
    │
    └→ IA: "Perfecto María, ya te conozco. Ahora dime: 
           ¿en qué puedo ayudarte hoy? ¿Tienes algún examen,
           necesitas que te explique algo, o quieres practicar?"
```

### Uso Normal (Estudiante Conocido)

```
Usuario abre Tutor IA (segunda vez en adelante)
    ↓
Sistema verifica: onboarding_completed = true
    ↓
[MODO TUTOR ACADÉMICO]
    │
    ├→ Sistema carga:
    │  - Conversaciones anteriores (historial)
    │  - Perfil de aprendizaje actual
    │  - Patrones de error detectados
    │  - Saberes básicos LOMLOE del curso
    │  - Criterios de evaluación
    │  - Competencias clave
    │
    ├→ IA: "¡Hola María! 👋 ¿En qué puedo ayudarte hoy?"
    │
    ├→ Usuario: "tengo examen de mates el viernes"
    │
    ├→ IA clarifica necesidad:
    │  "Entiendo María. ¿Qué temas entran en el examen?"
    │
    ├→ Usuario: "ecuaciones y geometría"
    │
    ├→ IA: "¿Cómo te sientes con estos temas? ¿Los entiendes
    │       o prefieres que te explique primero? O ¿quieres
    │       practicar con ejercicios?"
    │
    ├→ Usuario: "quiero practicar ecuaciones"
    │
    ├→ IA: "Perfecto. Voy a generarte ejercicios adaptados
    │       a tu estilo (visual-kinestésico) y nivel (4º Primaria).
    │       Tardará 10 segundos. ¿Listo?"
    │
    ├→ [GENERACIÓN DE EJERCICIOS]
    │  - Llama a generateWorksheet()
    │  - Incluye contexto LOMLOE
    │  - Adapta a perfil VARK
    │  - Considera patrones de error previos
    │
    ├→ IA muestra ejercicios en el chat
    │
    ├→ Usuario resuelve ejercicios
    │
    ├→ IA evalúa cada respuesta con feedback constructivo:
    │  "✅ Lo que hiciste bien: Aplicaste correctamente la fórmula.
    │   ⚠️ Dónde mejorar: En el cálculo final, 12x3 es 36, no 32.
    │   💡 Intenta esto: Haz los cálculos paso a paso en papel."
    │
    ├→ Sistema detecta patrón: errores de cálculo aritmético
    │  - Guarda en student_error_patterns
    │  - Próxima vez, enfatizará cuidado en cálculos
    │
    └→ PARALELAMENTE - Perfilado Pasivo:
       - Después de 5 ejercicios, IA pregunta estratégicamente:
         "Por cierto María, cuando resuelves problemas,
          ¿prefieres hacerlo paso a paso o ver el panorama completo?"
       - Sistema identifica: Felder-Silverman Sequential/Global
       - Actualiza learning_profile sin que sienta como "test"
```

### Acceso a Modo Perfil (Opcional)

```
Usuario entra a sección "Mi Perfil" o escribe "quiero hacer test"
    ↓
[MODO PERFIL]
    │
    ├→ IA muestra estado actual del perfil:
    │  "María, tu perfil actual es:
    │   ✅ VARK: Visual-Kinestésico (Completo)
    │   ⚠️ Inteligencias Múltiples: 40% completado
    │   ⚠️ CHAEA: 25% completado
    │   
    │   ¿Quieres completar algún test específico?
    │   A) Inteligencias Múltiples (20 preguntas restantes)
    │   B) CHAEA (60 preguntas restantes)
    │   C) Déjalo, que la IA lo complete mientras uso el tutor"
    │
    ├→ Si elige A o B → Test completo conversacional
    ├→ Si elige C → Vuelve a Modo Tutor Académico
    │
    └→ Al completar test manual:
       - Actualiza learning_profile
       - Muestra resultados completos
       - Explica implicaciones prácticas
```

---

## 🔍 Especificación por Modo

### MODO 1: Onboarding

**Objetivo:** Recoger información mínima esencial y crear perfil básico funcional en 5-7 minutos.

#### Fase 1: Información Básica (2 min)

**Preguntas obligatorias:**
1. Nombre del estudiante
2. Curso (con validación y normalización)
3. Comunidad autónoma (opcional, para LOMLOE regional)

**Validaciones:**
- Nombre: al menos 2 caracteres, no números
- Curso: normalizar "4 primaria" → "4º Primaria", "2 eso" → "2º ESO"
- Si da respuesta ambigua, clarificar: "¿4º de Primaria o 4º de ESO?"

**Guardado:**
```sql
INSERT INTO students (parent_id, name, grade_level, autonomous_community)
VALUES (auth.uid(), 'María', '4º Primaria', 'Galicia');
```

#### Fase 2: Test VARK Gamificado (3 min)

**Estructura:**
- **12 preguntas** divididas en 3 bloques de 4
- Feedback intermedio después de cada bloque
- Resultado final completo al terminar

**Preguntas VARK (Banco de 15, seleccionar 12):**

*Bloque 1 (Detección inicial):*
1. "Cuando aprendes algo nuevo, ¿qué prefieres?
    A) Ver un video o dibujo
    B) Que te lo expliquen hablando
    C) Leer sobre ello
    D) Intentarlo tú mismo"

2. "Para recordar una palabra nueva, ¿qué haces?
    A) La escribo varias veces
    B) La repito en voz alta
    C) La leo varias veces
    D) La uso en una frase práctica"

3. "En clase, prestas más atención cuando:
    A) El profesor dibuja en la pizarra
    B) El profesor explica hablando
    C) Lees el libro de texto
    D) Haces experimentos o actividades"

4. "Cuando estudias, te ayuda más:
    A) Hacer esquemas o dibujos
    B) Escuchar explicaciones grabadas
    C) Leer resúmenes
    D) Hacer ejercicios prácticos"

*Feedback Intermedio 1:*
"¡Primeros resultados! 📊
 Parece que eres 60% VISUAL. Sigamos para confirmar..."

*Bloque 2 (Confirmación):*
5. "Recuerdas mejor a las personas por:
    A) Su cara
    B) Su voz o nombre
    C) Lo que leíste sobre ellas
    D) Cosas que hiciste con ellas"

6. "Cuando tienes que armar algo, prefieres:
    A) Ver fotos o diagramas
    B) Que alguien te diga qué hacer
    C) Leer las instrucciones
    D) Intentarlo sin instrucciones"

7. "Te concentras mejor:
    A) En un lugar ordenado y visual
    B) Con música o sonido de fondo
    C) En silencio leyendo
    D) Mientras te mueves o tocas cosas"

8. "Para repasar un examen, prefieres:
    A) Mirar tus apuntes con colores
    B) Explicárselo a alguien en voz alta
    C) Releer el tema varias veces
    D) Hacer ejercicios de práctica"

*Feedback Intermedio 2:*
"¡Actualización! 📈
 Ahora veo 70% Visual + 30% Kinestésico. Solo 4 más..."

*Bloque 3 (Refinamiento):*
9. "Aprendes mejor las matemáticas:
    A) Con gráficos o diagramas
    B) Escuchando explicaciones
    C) Leyendo la teoría
    D) Haciendo problemas prácticos"

10. "Para memorizar información:
     A) Uso colores y dibujos
     B) Me la repito en voz alta
     C) Leo y releo
     D) Escribo y practico"

11. "En un museo, te gusta más:
     A) Ver las exposiciones y fotos
     B) Escuchar las audio-guías
     C) Leer los textos explicativos
     D) Tocar las exhibiciones interactivas"

12. "Al dar indicaciones, dices:
     A) Gira donde ves el semáforo rojo
     B) Sigue recto hasta que oigas el mercado
     C) Son dos calles más adelante
     D) Ven, te enseño el camino"

**Cálculo de Resultado:**
```javascript
const varkScores = {
    V: contarRespuestas('A'),
    A: contarRespuestas('B'),
    R: contarRespuestas('C'),
    K: contarRespuestas('D')
};

const maxScore = Math.max(...Object.values(varkScores));
const dominantes = Object.keys(varkScores).filter(k => varkScores[k] === maxScore);

// Ejemplo: V=7, A=2, R=1, K=2 → VISUAL dominante
```

**Resultado Final:**
```
🎉 ¡RESULTADO FINAL!

Tu perfil de aprendizaje es: VISUAL-KINESTÉSICO

Esto significa que aprendes mejor:
✅ Viendo diagramas, esquemas y colores
✅ Haciendo ejercicios prá ticos y experimentando
✅ Dibujando mientras estudias

Desde ahora, adaptaré todas mis explicaciones a tu estilo.
¿Listo para empezar a estudiar?
```

**Guardado:**
```sql
INSERT INTO learning_profiles (
    student_id, 
    vark_dominant, 
    vark_scores,
    profile_completion_percentage,
    last_updated
) VALUES (
    student_id,
    'visual-kinestesico',
    '{"V": 7, "A": 2, "R": 1, "K": 2}',
    30,  -- VARK = 30% del perfil total
    NOW()
);

UPDATE students 
SET onboarding_completed = true 
WHERE id = student_id;
```

#### Fase 3: Sugerencia Test NEE (Solo Padres)

**Trigger:** Después de completar VARK, mostrar notificación a padres (NO al niño).

**Mensaje a Padres:**
```
Para personalizar mejor el aprendizaje de María, 
¿has notado alguna de estas señales?

□ Dificultades de lectura/escritura
□ Problemas de atención/concentración
□ Altas capacidades intelectuales
□ Ninguna de las anteriores

Si marcaste alguna, puedes hacer un test de detección 
temprana (5 min) en la sección Diagnóstico.

Esto NO es un diagnóstico médico, pero ayuda a adaptar 
mejor el contenido.
```

**Flujos:**
- Si acepta → Redirige a `/diagnostic` 
- Si declina → Marca `nee_screening_declined = true`, monitorizará pasivamente
- Si ignora → Después de 5 sesiones del niño, pregunta de nuevo

---

### MODO 2: Tutor Académico

**Objetivo:** Ayudar con estudios adaptándose al perfil del estudiante y currículo LOMLOE.

#### Comportamiento General

**Contexto Cargado al Inicio:**
```javascript
const tutorContext = {
    student: {
        name: 'María',
        grade_level: '4º Primaria',
        autonomous_community: 'Galicia'
    },
    learning_profile: {
        vark_dominant: 'visual-kinestesico',
        vark_scores: { V: 7, A: 2, R: 1, K: 2 },
        mi_scores: { /* parcial */ },
        chaea_scores: { /* parcial */ },
        profile_completion: 45  // %
    },
    error_patterns: [
        { type: 'cálculo_aritmético', frequency: 5, last_occurrence: '2026-01-10' },
        { type: 'ortografía_h', frequency: 3, last_occurrence: '2026-01-09' }
    ],
    lomloe_context: {
        saberes_basicos: [ /* del curso actual */ ],
        criterios_evaluacion: [ /* del curso actual */ ],
        competencias_clave: [ /* las 8 */ ]
    },
    conversation_history: [ /* últimos 20 mensajes */ ],
    upcoming_exams: [ /* de la tabla exam_roadmaps */ ]
};
```

#### Detección de Necesidades

**5 Tipos de Necesidad:**

1. **EXPLICACIÓN**
   - Señales: "no entiendo X", "explícame Y", "¿qué es Z?"
   - Acción: Genera guía explicativa adaptada a VARK
   - Usa saberes básicos LOMLOE como referencia

2. **PRÁCTICA**
   - Señales: "quiero practicar", "ponme ejercicios", "entrenar"
   - Acción: Genera ejercicios con generateWorksheet()
   - Incluye feedback constructivo por pregunta

3. **EXAMEN**
   - Señales: "tengo examen el/mañana/viernes", "control de mates"
   - Acción: Crea ruta de estudio día a día hasta el examen
   - Distribuye temas, incluye simulacros

4. **METODOLOGÍA**
   - Señales: "técnica feynman", "mapa mental", "método cornell"
   - Acción: Aplica metodología específica al tema dado
   - Reutiliza código del Hub de Aprendizaje

5. **APOYO EMOCIONAL**
   - Señales: "estoy estresado", "no puedo", "muy difícil"
   - Acción: Modo coaching, valida emoción, luego ayuda académica
   - No genera contenido inmediatamente

#### Flujo de Clarificación

**Máximo 3 preguntas clarificadoras:**

```
Usuario: "tengo examen"
IA: "Entiendo María. ¿De qué asignatura es el examen?"

Usuario: "mates"
IA: "Ok, examen de Matemáticas. ¿Cuándo es?"

Usuario: "viernes"
IA: "Perfecto, el viernes. ¿Qué temas entran?"

Usuario: "ecuaciones"
IA: "Entendido. ¿Cómo te sientes con ecuaciones? 
     ¿Los entiendes o necesitas que te explique primero?
     O ¿prefieres practicar directamente?"
```

Si después de 3 preguntas no está claro, ofrece opciones:

```
IA: "No estoy seguro de entender exactamente, María.
     ¿Quieres que:
     A) Te explique el tema de ecuaciones
     B) Te ponga ejercicios para practicar
     C) Te ayude a planificar el estudio hasta el viernes
     D) Otra cosa (dime qué)"
```

#### Generación de Contenido

**Antes de generar, SIEMPRE confirmar y avisar:**

```
IA: "Perfecto María. Voy a generarte 10 ejercicios de ecuaciones
     adaptados a tu nivel (4º Primaria) y estilo (visual-kinestésico).
     
     Tardará unos 15 segundos. ¿Lista?"

Usuario: "sí"

[LLAMADA A generateWorksheet()]
```

**Construcción del Prompt para IA:**

```javascript
const systemPrompt = buildTutorPrompt({
    mode: 'generate_exercises',
    student_profile: tutorContext.student,
    learning_profile: tutorContext.learning_profile,
    lomloe_saberes: tutorContext.lomloe_context.saberes_basicos,
    lomloe_criterios: tutorContext.lomloe_context.criterios_evaluacion,
    error_patterns: tutorContext.error_patterns,
    topic: 'Ecuaciones de primer grado',
    num_questions: 10,
    difficulty: 'medio'
});
```

#### Evaluación y Feedback Constructivo

**Cuando el estudiante responde:**

```javascript
async function evaluateAnswer(question, studentAnswer, expectedAnswer) {
    const evaluationPrompt = `
    PREGUNTA: ${question}
    RESPUESTA ESPERADA: ${expectedAnswer}
    RESPUESTA DEL ESTUDIANTE: ${studentAnswer}
    
    Evalúa y genera feedback en formato:
    ✅ Lo que hizo bien: [menciona algo positivo]
    ⚠️ Dónde mejorar: [explica el error específicamente]
    💡 Intenta esto: [paso concreto para mejorar]
    `;
    
    const feedback = await callAI(evaluationPrompt);
    
    // Detectar tipo de error
    const errorType = analyzeErrorType(studentAnswer, expectedAnswer);
    
    // Guardar en historial
    await saveError({
        student_id,
        question,
        student_answer: studentAnswer,
        error_type: errorType,
        feedback
    });
    
    return feedback;
}
```

**Detección de Patrones:**

Después de cada sesión, analiza errores:

```javascript
async function detectErrorPatterns(student_id) {
    const recentErrors = await getErrorsLast30Days(student_id);
    
    const patterns = {};
    recentErrors.forEach(error => {
        if (!patterns[error.error_type]) {
            patterns[error.error_type] = 0;
        }
        patterns[error.error_type]++;
    });
    
    // Si un tipo aparece 3+ veces, es patrón
    const significantPatterns = Object.entries(patterns)
        .filter(([type, count]) => count >= 3);
    
    // Guardar en BD
    for (const [type, frequency] of significantPatterns) {
        await upsertErrorPattern(student_id, type, frequency);
    }
}
```

#### Perfilado Pasivo Inteligente

**Trigger:** Después de cada 5 interacciones exitosas

**Banco de Preguntas Estratégicas:**

*Inteligencias Múltiples:*
- "Cuando tienes un problema, ¿prefieres pensarlo solo o hablarlo con otros?"
- "¿Te gustan más las actividades con números/lógica o con palabras/historias?"
- "¿Prefieres actividades en la naturaleza o en interiores?"

*CHAEA:*
- "Cuando aprendes algo nuevo, ¿prefieres probarlo de inmediato o pensar primero?"
- "¿Te gusta seguir instrucciones paso a paso o improvisar?"
- "¿Prefieres teoría y conceptos o ejemplos prácticos?"

**Implementación:**

```javascript
let interactionCount = 0;

async function afterSuccessfulInteraction() {
    interactionCount++;
    
    if (interactionCount % 5 === 0) {
        // Identificar qué perfil está menos completo
        const profile = await getLearningProfile(student_id);
        
        if (profile.mi_completion < 100) {
            // Hacer pregunta de Inteligencias Múltiples
            const question = getStrategicMIQuestion(profile.mi_scores);
            await askPassiveQuestion(question, 'MI');
        } else if (profile.chaea_completion < 100) {
            // Hacer pregunta de CHAEA
            const question = getStrategicCHAEAQuestion(profile.chaea_scores);
            await askPassiveQuestion(question, 'CHAEA');
        }
    }
}

async function askPassiveQuestion(question, type) {
    const response = await aiSay(
        `Por cierto María, una pregunta rápida: ${question}`
    );
    
    // Guardar respuesta
    await saveProfileAnswer(student_id, type, question, response);
    
    // Actualizar perfil
    await updateProfileFromAnswer(student_id, type, response);
}
```

---

### MODO 3: Modo Perfil

**Objetivo:** Permitir completar tests específicos manualmente si el estudiante/padre lo desea.

#### Acceso

**Triggers:**
- Usuario escribe "quiero hacer test", "test de inteligencias", etc.
- Accede desde menú "Mi Perfil de Aprendizaje"
- Padre accede desde dashboard

#### Pantalla Inicial

```
┌─────────────────────────────────────────────────────┐
│        TU PERFIL DE APRENDIZAJE                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ VARK (Canales Sensoriales)                     │
│     Visual-Kinestésico | COMPLETO (100%)           │
│                                                     │
│  ⚠️ Inteligencias Múltiples                        │
│     Lingüística: Alta | Lógica: Media              │
│     PARCIAL (45%) - 22 preguntas restantes         │
│     [Completar Test] [Dejar que IA lo complete]    │
│                                                     │
│  ⚠️ CHAEA (Estilos de Aprendizaje)                │
│     Activo detectado                               │
│     PARCIAL (18%) - 65 preguntas restantes         │
│     [Completar Test] [Dejar que IA lo complete]    │
│                                                     │
│  ℹ️ NEE (Detección Temprana)                       │
│     No realizado                                    │
│     [Hacer Test] [No es necesario]                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Flujo de Test Manual

Si usuario elige "Completar Test":

```
IA: "Perfecto María. Voy a hacerte las 22 preguntas que faltan
     de Inteligencias Múltiples.
     
     Tardaremos unos 8 minutos. Puedes pausar cuando quieras
     y continuar después. ¿Empezamos?"

Usuario: "sí"

[Preguntas conversacionales una por una]

IA: "11 de 22 - Vas por la mitad. ¿Seguimos o descanso?"

Usuario: "descanso"

IA: "Sin problema. He guardado tu progreso. Cuando quieras
     continuar, dime 'seguir test' y empezamos donde lo dejaste."

[Sistema guarda: mi_test_progress = 50%]
```

---

## 🧠 Sistema de Perfilado Progresivo

### Estructura del Perfil Completo

**Componentes del Perfil (100%):**

- VARK (30%) - 12 preguntas
- Inteligencias Múltiples (35%) - 40 preguntas
- CHAEA (25%) - 80 preguntas (pero solo 20 clave seleccionadas)
- NEE (10%) - Screening si aplica

### Estrategia de Completitud

**Ruta Rápida (Onboarding):**
- VARK completo → 30% inmediato

**Ruta Pasiva (Durante uso):**
- 1 pregunta estratégica cada 5 interacciones
- IA selecciona pregunta según mayor vacío en perfil
- Estudiante no nota que está siendo perfilado

**Ruta Manual (Opcional):**
- Usuario puede completar tests completos cuando quiera
- Progreso se guarda, puede pausar y continuar

### Algoritmo de Selección de Preguntas Estratégicas

```javascript
function selectStrategicQuestion(profile) {
    // Identificar área menos completa
    const completion = {
        MI: profile.mi_completion,
        CHAEA: profile.chaea_completion
    };
    
    const leastComplete = Object.entries(completion)
        .sort((a, b) => a[1] - b[1])[0][0];
    
    if (leastComplete === 'MI') {
        // Seleccionar pregunta MI que aporte más información
        return selectMostInformativeMIQuestion(profile.mi_scores);
    } else {
        return selectMostInformativeCHAEAQuestion(profile.chaea_scores);
    }
}

function selectMostInformativeMIQuestion(currentScores) {
    // Identificar inteligencias con menos datos
    const uncertainAreas = Object.entries(currentScores)
        .filter(([int, data]) => !data || data.confidence < 0.7)
        .map(([int]) => int);
    
    if (uncertainAreas.length === 0) return null;
    
    // Elegir pregunta que discrimine mejor en esa área
    const targetInt = uncertainAreas[0];
    return getMIQuestionBank(targetInt)[0];
}
```

---

## 🎓 Integración con LOMLOE

### Carga de Contexto Curricular

**Al iniciar cualquier conversación académica:**

```javascript
async function loadLOMLOEContext(subject, gradeLevel) {
    const saberes = await supabase
        .from('saberes_basicos')
        .select('*')
        .eq('asignatura', normalizeSubject(subject))
        .eq('curso', normalizeGrade(gradeLevel));
    
    const criterios = await supabase
        .from('criterios_evaluacion')
        .select('*')
        .eq('asignatura', normalizeSubject(subject))
        .eq('curso', normalizeGrade(gradeLevel));
    
    const competencias = await supabase
        .from('competencias_clave')
        .select('*');
    
    return { saberes, criterios, competencias };
}
```

### Uso en Prompts de IA

**Prompt Sistema con LOMLOE:**

```
ROL: TUTOR PERSONAL IA - ALINEADO CON LOMLOE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🇪🇸 CONTEXTO CURRICULAR OFICIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMUNIDAD AUTÓNOMA: ${autonomousCommunity}

📚 SABERES BÁSICOS DE ${subject} - ${gradeLevel}:
${saberes.map(s => `- ${s.bloque}: ${s.saber}`).join('\n')}

⚠️ TODO contenido que generes DEBE alinears con estos saberes.

🎯 CRITERIOS DE EVALUACIÓN OFICIALES:
${criterios.map(c => `- ${c.id}: ${c.descripcion}`).join('\n')}

Tu feedback debe evaluar según ESTOS criterios, no criterios arbitrarios.

💎 COMPETENCIAS CLAVE A TRABAJAR:
${competencias.map(c => `- ${c.id}: ${c.nombre}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERFIL DEL ESTUDIANTE:
- Nombre: ${student.name}
- Curso: ${gradeLevel}
- Estilo VARK: ${vark}
${neurodiversityAdaptations}

[... resto del prompt ...]
```

### Validación de Contenido Generado

**Después de generar ejercicios/guías:**

```javascript
async function validateLOMLOEAlignment(generatedContent, subject, gradeLevel) {
    const lomloe = await loadLOMLOEContext(subject, gradeLevel);
    
    // Verificar que menciona saberes básicos relevantes
    const mentionsSaberes = lomloe.saberes.some(saber => 
        generatedContent.toLowerCase().includes(saber.saber.toLowerCase())
    );
    
    if (!mentionsSaberes) {
        console.warn('⚠️ Contenido generado no menciona saberes básicos LOMLOE');
    }
    
    return mentionsSaberes;
}
```

---

## 📱 Casos de Uso Detallados

### Caso 1: Estudiante Nuevo - Primera Sesión Completa

**Actor:** María (9 años, 4º Primaria)
**Contexto:** Primera vez que abre el Tutor IA
**Duración:** 7 minutos

**Flujo:**

1. María abre la app, click en "Tutor IA"
2. Sistema detecta: onboarding_completed = false
3. IA: "¡Hola! Soy tu tutor personal. ¿Cómo te llamas?"
4. María: "maría"
5. Sistema normaliza: "María" (capitalize)
6. IA: "¡Encantado María! ¿En qué curso estás?"
7. María: "4 primaria"
8. Sistema normaliza: "4º Primaria"
9. Sistema INSERT en `students` tabla
10. IA: "Ahora vamos a descubrir tu SUPERPODER de aprendizaje..."
11. [12 preguntas VARK con feedback intermedio]
12. Sistema calcula: Visual=7, Kinestésico=2 → Visual dominante
13. Sistema INSERT en `learning_profiles`
14. IA muestra resultado final gamificado
15. Sistema UPDATE: onboarding_completed = true
16. IA: "¿En qué puedo ayudarte hoy?"
17. María puede empezar a usar el tutor normalmente

**Resultado:**
- ✅ Perfil básico creado (30% completitud)
- ✅ Puede usar tutor inmediatamente
- ✅ Experiencia fluida sin interrupciones

### Caso 2: Preparación de Examen con Ruta Personalizada

**Actor:** María (ya conocida por el sistema)
**Contexto:** Tiene examen de Matemáticas en 4 días
**Duración:** 15 minutos inicial + uso diario

**Flujo:**

1. María: "hola"
2. Sistema carga perfil completo + historial
3. IA: "¡Hola María! ¿En qué puedo ayudarte hoy?"
4. María: "tengo examen de mates el viernes"
5. IA: "Entiendo. ¿Qué temas entran en el examen?"
6. María: "ecuaciones y fracciones"
7. IA verifica en BD: detecta patrón de errores en fracciones
8. IA: "Ok. Veo que las ecuaciones las dominas bien, pero 
        en fracciones a veces te cuesta. ¿Quieres que nos 
        centremos más en fracciones o equitativo?"
9. María: "más en fracciones"
10. IA: "Perfecto. Hoy es lunes, examen el viernes. Te voy
         a crear un plan día a día. ¿Lista?"
11. Sistema genera ruta:
    - Lunes: Repasar teoría de fracciones (visual)
    - Martes: Practicar suma/resta fracciones (15 ejercicios)
    - Miércoles: Practicar multiplicación/división (15 ejercicios)
    - Jueves: Simulacro completo (20 preguntas mixtas)
    - Viernes mañana: Repaso rápido de errores comunes
12. IA muestra plan completo
13. María: "vale"
14. IA: "¿Empezamos con el lunes ahora? Te genero la guía
         de fracciones adaptada a tu estilo visual."
15. Sistema llama generateWorksheet() con:
    - Tipo: guía explicativa
    - Tema: fracciones
    - Perfil: visual-kinestésico
    - Saberes LOMLOE de 4º Primaria
    - Énfasis en errores detectados previamente
16. IA muestra guía con diagramas y esquemas visuales
17. María estudia y puede hacer preguntas dentro del chat
18. Sistema guarda sesión en BD para continuar mañana

**Resultado:**
- ✅ Ruta personalizada creada
- ✅ Contenido adaptado a VARK y patrones de error
- ✅ Progreso trackeado día a día
- ✅ Puede continuar donde dejó en próximas sesiones

### Caso 3: Perfilado Pasivo Durante Uso Normal

**Actor:** María (3ª semana usando el tutor)
**Contexto:** Ha completado 15 sesiones desde onboarding
**Duración:** Parte de sesión normal

**Flujo:**

1. María está resolviendo ejercicios de Lengua
2. Sistema cuenta: 15 interacciones exitosas desde último perfil
3. Sistema verifica: mi_completion = 35%
4. Sistema identifica: Inteligencia Lingüística sin datos suficientes
5. Sistema selecciona pregunta estratégica de MI
6. María termina ejercicio correctamente
7. IA da feedback positivo
8. IA: "¡Muy bien María! Por cierto, una pregunta rápida:
        cuando tienes que aprender algo, ¿prefieres leer
        sobre ello o que te expliquen hablando?"
9. María: "leer"
10. Sistema analiza: +1 punto Inteligencia Lingüística
11. Sistema actualiza learning_profile:
    - mi_completion: 35% → 40%
    - mi_scores.Lingüística.nivel: "Alto"
    - mi_scores.Lingüística.confidence: 0.75
12. IA: "Perfecto, lo tengo en cuenta. ¿Seguimos con 
         los ejercicios?"
13. María continúa normalmente sin darse cuenta del perfilado

**Resultado:**
- ✅ Perfil mejorado sin test formal
- ✅ Estudiante no siente interrupción
- ✅ Datos más precisos para futuras adaptaciones

### Caso 4: Detección de Patrón de ERROR y Adaptación

**Actor:** María
**Contexto:** Ha fallado 4 de 5 ejercicios de resta con llevada
**Duración:** Durante sesión de ejercicios

**Flujo:**

1. María resuelve ejercicio: "345 - 178 = ?"
2. responde: "233" (incorrecto, debería ser 167)
3. Sistema evalúa con IA
4. IA analiza: error en manejo de "llevar" en restas
5. IA da feedback:
   "✅ Lo que hiciste bien: Identificaste que es una resta.
    ⚠️ Dónde mejorar: Al restar 8 de 5, no puedes. Necesitas
        'pedir prestado' una decena del 4.
    💡 Intenta así: 
        - 15 - 8 = 7 (pedimos 1 al 4, queda 3)
        - 30 - 70 no se puede, pedimos 1 al 3, queda 2
        - 200 - 100 = 100
        - Resultado: 167"
6. Sistema guarda error: type="resta_con_llevada"
7. María continúa, falla otros 3 con el mismo patrón
8. Sistema detecta: 4 errores del mismo tipo en 10 min
9. Sistema marca: error_pattern detectado
10. IA: "María, he notado que las restas con 'llevar' te 
         cuestan un poco. Es normal, es de lo más difícil
         de 4º Primaria. ¿Quieres que te explique el truco
         con un dibujo?"
11. María: "sí"
12. IA genera explicación visual especial:
    - Usa diagrama de bloques (VARK visual)
    - Paso a paso numerado (secuencial)
    - Ejemplos prácticos (kinestésico)
13. María practica con método nuevo
14. Próxima sesión de mates: IA enfatiza restas con llevada
     automáticamente sin que María lo pida

**Resultado:**
- ✅ Error detectado y explicado inmediatamente
- ✅ Patrón identificado para futuras sesiones
- ✅ Contenido futuro adaptado automáticamente
- ✅ Estudiante recibe ayuda justo cuando la necesita

---

## ⚙️ Requisitos Técnicos

### Frontend (React)

**Componentes Principales:**

1. **TutorAI.jsx** (Componente único)
   - Maneja los 3 modos (Onboarding, Académico, Perfil)
   - Vista de chat con mensajes
   - Input de texto (+ futuro: input de voz)
   - Área de contenido generado (guías, ejercicios)

2. **MessageBubble.jsx**
   - Renderiza mensajes de usuario y IA
   - Soporte para contenido enriquecido (markdown, emojis)
   - Timestamp y autor

3. **GeneratedContent.jsx**
   - Renderiza guías/ejercicios dentro del chat
   - Componentes interactivos (responder ejercicios)
   - Botones de acción (guardar, regenerar)

4. **ProfileProgress.jsx**
   - Barra de progreso del perfil
   - Desglose por tipo de test
   - Acceso a Modo Perfil

**Estado de la Aplicación:**

```javascript
const [currentMode, setCurrentMode] = useState('onboarding');
const [messages, setMessages] = useState([]);
const [studentProfile, setStudentProfile] = useState(null);
const [learningProfile, setLearningProfile] = useState(null);
const [lomloeContext, setLomloeContext] = useState(null);
const [isGenerating, setIsGenerating] = useState(false);
const [currentSession, setCurrentSession] = useState(null);
```

### Backend (Supabase + Servicios)

**Servicios Principales:**

1. **tutorService.js**
   - `sendMessage(sessionId, message)` - Envía mensaje y obtiene respuesta IA
   - `startNewSession(studentId)` - Crea nueva sesión de chat
   - `loadSessionHistory(sessionId)` - Carga historial de conversación
   - `detectNeedType(message)` - Clasifica tipo de necesidad (explicación, práctica, etc.)

2. **profileService.js**
   - `loadCompleteProfile(studentId)` - Carga perfil completo del estudiante
   - `updateVARKScores(studentId, scores)` - Actualiza resultados VARK
   - `addPassiveAnswer(studentId, type, question, answer)` - Guarda respuesta perfilado pasivo
   - `calculateProfileCompletion(studentId)` - Calcula % completitud perfil

3. **errorAnalysisService.js**
   - `saveStudentError(studentId, error)` - Guarda error en BD
   - `detectPatterns(studentId)` - Analiza patrones en últimos 30 días
   - `getActivePatterns(studentId)` - Obtiene patrones actuales

4. **lomloeService.js**
   - `loadSaberesBasicos(subject, grade)` - Carga saberes del currículo
   - `loadCriteriosEvaluacion(subject, grade)` - Carga criterios
   - `loadCompetenciasClave()` - Carga las 8 competencias

### Inteligencia Artificial

**Modelos Utilizados:**

- **SambaNova (Meta-Llama-3.1-8B-Instruct)** - Principal
- **Fallbacks:** Gemini, OpenRouter, Chrome AI, Ollama

**Arquitectura de Prompts:**

```
Prompt Sistema Base (inmutable)
    +
Contexto LOMLOE (dinámico según asignatura)
    +
Perfil del Estudiante (dinámico según BD)
    +
Historial de Conversación (últimos 10 mensajes)
    +
Instrucción Específica del Modo (onboarding/académico/perfil)
    ↓
Prompt Completo Enviado a IA
```

**Límites de Tokens:**

- Input: ~3000 tokens (prompt + historial)
- Output: ~1000 tokens (respuesta)
- Total por petición: ~4000 tokens

### Base de Datos (Ver documento separado)

Diseño completo en `ESQUEMA_BD_TUTOR_IA.md`

---

## 📅 Plan de Implementación

### Fase 0: Preparación (COMPLETADO)
- ✅ Documentación de estado actual
- ✅ Prompts maestros definidos
- ✅ Componente de testing (PromptTester)
- ⏳ Esquema de BD (siguiente documento)
- ⏳ Refinamiento de prompts

### Fase 1: MVP del Tutor (2-3 semanas)

**Sprint 1: Chat Básico (1 semana)**
- Componente TutorAI.jsx con UI de chat
- Sistema de mensajes (enviar/recibir)
- Conexión con SambaNova
- Guardado de sesiones en BD
- Sin generación de contenido todavía

**Sprint 2: Modo Onboarding (1 semana)**
- Flujo de nombre + curso
- Test VARK gamificado (12 preguntas)
- Cálculo y guardado de resultados
- Pantalla de resultado final
- Transición a modo académico

**Sprint 3: Tutor Académico Básico (1 semana)**
- Detección de necesidades
- Preguntas clarificadoras
- Integración con generateWorksheet() existente
- Mostrar contenido generado en chat
- Guardar en Mochila

### Fase 2: Perfilado Inteligente (2 semanas)

**Sprint 4: Error Analysis (1 semana)**
- Sistema de evaluación con IA
- Feedback constructivo formato ✅⚠️💡
- Guardado de errores en BD
- Detección de patrones básica

**Sprint 5: Perfilado Pasivo (1 semana)**
- Banco de preguntas MI y CHAEA
- Lógica de selección estratégica
- Actualización automática de perfil
- Modo Perfil (acceso manual a tests)

### Fase 3: Integración LOMLOE (1 semana)

**Sprint 6: Contexto Curricular**
- Carga de saberes básicos
- Carga de criterios de evaluación
- Integración en prompts de IA
- Validación de contenido generado

### Fase 4: Pulido y Optimización (1 semana)

**Sprint 7: UX y Performance**
- Animaciones de typing
- Loading states elegantes
- Optimización de queries BD
- Manejo de errores robusto
- Testing con usuarios reales (familia)

### Fase 5: Features Avanzadas (Futuro)

**Posibles Mejoras:**
- Input por voz (Web Speech API)
- Output por voz (TTS)
- Exportar conversaciones a PDF
- Compartir guías generadas
- Modo colaborativo (varios estudiantes)
- Analytics para padres

---

## ✅ Criterios de Éxito

**Para considerar el Tutor IA exitoso:**

1. **Usabilidad**
   - [ ] Un niño de 9 años puede usarlo sin ayuda de adultos
   - [ ] Menos de 5% de conversaciones resultan en confusión
   - [ ] Tasa de abandono en onboarding < 10%

2. **Efectividad Pedagógica**
   - [ ] Estudiantes mejoran en temas donde practican (medible por ejercicios)
   - [ ] Feedback recibido por padres es positivo (encuesta)
   - [ ] Estudiantes reportan entender mejor después de usar el tutor

3. **Perfilado**
   - [ ] 100% de usuarios completan VARK en onboarding
   - [ ] 80% alcanzan 60%+ completitud perfil en 1 mes de uso
   - [ ] Perfilado pasivo funciona sin que usuarios lo noten

4. **Técnico**
   - [ ] 95% de peticiones a IA exitosas (< 5% error rate)
   - [ ] Tiempo de respuesta promedio < 5 segundos
   - [ ] Contenido generado cumple LOMLOE en > 90% casos

5. **Engagement**
   - [ ] Usuarios vuelven al menos 3 veces por semana
   - [ ] Sesión promedio > 10 minutos
   - [ ] 70%+ de usuarios activos después de 1 mes

---

**FIN DE LA ESPECIFICACIÓN**

*Siguiente documento: Esquema de Base de Datos Completo*
