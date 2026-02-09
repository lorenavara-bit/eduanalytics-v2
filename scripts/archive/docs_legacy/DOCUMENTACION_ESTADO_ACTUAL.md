# Documentación del Estado Actual de EduAnalytics V2

**Fecha:** 12 de Enero 2026  
**Propósito:** Documentar el funcionamiento actual del Generador IA, Hub de Aprendizaje y Mochila antes de implementar el Tutor IA conversacional.

---

## 📋 Índice

1. [Arquitectura General](#arquitectura-general)
2. [Generador IA](#generador-ia)
3. [Hub de Aprendizaje](#hub-de-aprendizaje)
4. [Mochila (Resource Library)](#mochila-resource-library)
5. [Motor de IA (gemini.js)](#motor-de-ia-geminijs)
6. [Base de Datos](#base-de-datos)
7. [Flujos de Usuario](#flujos-de-usuario)

---

## Arquitectura General

### Estructura de Navegación Principal

```
EduAnalytics V2
├── Inicio (Dashboard)
├── NeuroPerfil
├── Diagnóstico
├── Generador IA  ← DOCUMENTADO AQUÍ
├── Hub de Aprendizaje ← DOCUMENTADO AQUÍ
├── Exámenes
└── Mochila ← Integrada en Hub, DOCUMENTADA AQUÍ
```

### Stack Técnico
- **Frontend:** React 18 + Vite
- **UI Library:** Lucide React (iconos)
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **IA:** Multi-provider (SambaNova prioritario → Gemini → OpenRouter → Chrome AI → Ollama)
- **Estado:** React Hooks (useState, useEffect)

---

## Generador IA

### 📁 Ubicación del Código
- **Componente Principal:** `/src/components/WorksheetGenerator.jsx` (904 líneas)
- **Servicio de IA:** `/src/utils/gemini.js`
- **Normalizador:** `/src/utils/curriculumNormalizer.js`

### 🎯 Propósito
Permitir a padres/profesores generar fichas de ejercicios, exámenes o material de estudio personalizado utilizando IA con enfoque en el currículum LOMLOE español.

### 🔧 Funcionalidades Clave

#### 1. Selección de Estudiante
```javascript
// Función: fetchData() - Línea 66
// Carga estudiantes vinculados al usuario autenticado
const { data: students } = await supabase
    .from('students')
    .select('*')
    .eq('parent_id', user.id);
```

#### 2. Configuración de la Ficha
**Parámetros configurables:**
- **Estudiante:** Selección de perfil (carga automáticamente curso y estilo de aprendizaje)
- **Asignatura:** Lista personalizable de asignaturas por usuario
- **Tema:** Input de texto libre + sugerencias basadas en libro de texto
- **Libro de texto:** Opcional, guardado en `user_subjects.textbook_info`
- **Tipo de actividad:** Aprender, Practicar, Examen, Proyecto
- **Dificultad:** Refuerzo, Estándar, Ampliación
- **Número de preguntas:** 1-50 (con estrategia de batching si >10)
- **Tipos de preguntas:** Multiple choice, Open, Verdadero/Falso, etc.
- **Interés temático:** Opcional (ej: "Minecraft" para personalizar contextos)

#### 3. Generación con IA
```javascript
// Función: handleGenerate() - Línea 314
const resultJson = await generateWorksheet({
    profile: selectedProfile,
    subject: selectedSubject,
    topic,
    activityType,
    config: {
        difficulty,
        numQuestions,
        questionTypes,
        interest
    },
    observations: customInstructions
});
```

**Flujo de generación:**
1. Valida que todos los campos requeridos estén completos
2. Carga el perfil completo del estudiante (incluye VARK, NEE, inteligencias múltiples)
3. Llama a `generateWorksheet()` de gemini.js
4. Recibe JSON estructurado con ejercicios
5. Muestra en componente `InteractiveWorksheet`

#### 4. Guardado de Fichas
```javascript
// Función: handleSaveWorksheet() - Línea 415
const { error } = await supabase.from('resource_library').insert({
    student_id: selectedProfile.id,
    title: `${worksheet.title}`,
    description: worksheet.intro || '',
    resource_type: 'WORKSHEET',
    subject: selectedSubject.name,
    topic,
    difficulty_level: difficulty,
    content: worksheet,
    metadata: {
        activityType,
        numQuestions,
        questionTypes,
        generatedAt: new Date().toISOString()
    }
});
```

#### 5. Corrección Local con IA
```javascript
// Función: handleLocalCorrection() - Línea 453
// Evalúa respuestas del estudiante usando IA
// Genera feedback personalizado por pregunta
// Guarda resultados en `resultados_evaluacion`
```

### 📊 Tablas de Base de Datos Utilizadas

#### `user_subjects`
```sql
CREATE TABLE user_subjects (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    subject_name TEXT,
    grade_level TEXT,
    textbook_info TEXT,
    is_active BOOLEAN DEFAULT true
);
```

#### `study_materials` (Archivos subidos)
```sql
CREATE TABLE study_materials (
    id UUID PRIMARY KEY,
    user_id UUID,
    student_id UUID,
    subject_id UUID,
    file_name TEXT,
    file_url TEXT,
    file_type TEXT,
    extracted_text TEXT
);
```

#### `generated_worksheets` (Historial)
```sql
CREATE TABLE generated_worksheets (
    id UUID PRIMARY KEY,
    user_id UUID,
    student_id UUID,
    subject TEXT,
    topic TEXT,
    content JSONB,
    created_at TIMESTAMP
);
```

#### `resource_library` (Almacenamiento unificado)
```sql
CREATE TABLE resource_library (
    id UUID PRIMARY KEY,
    student_id UUID,
    title TEXT,
    description TEXT,
    resource_type TEXT, -- 'WORKSHEET', 'EXAM', 'ROADMAP', 'WORKSHOP'
    subject TEXT,
    topic TEXT,
    difficulty_level TEXT,
    content JSONB,
    metadata JSONB,
    created_at TIMESTAMP
);
```

### 🔄 Servicios Llamados

1. **`generateWorksheet()`** - Motor de IA (gemini.js)
2. **`normalizeSubject()`** - Normalización de nombres de asignaturas
3. **`normalizeGrade()`** - Normalización de niveles educativos
4. **Supabase:** Queries a `students`, `user_subjects`, `resource_library`, `learning_profiles`

### 📝 Prompts Utilizados
Los prompts se construyen dinámicamente en `gemini.js` función `buildLOMLOEPrompt()`. Incluyen:

- Contexto del estudiante (curso, estilo de aprendizaje VARK, NEE)
- Saberes básicos LOMLOE de la asignatura
- Criterios de evaluación oficiales
- Competencias clave
- Instrucciones específicas por tipo de actividad
- Libro de texto de referencia
- Intereses del estudiante para contextualización

---

## Hub de Aprendizaje

### 📁 Ubicación del Código
- **Componente Principal:** `/src/components/ResourceHub.jsx` (889 líneas)
- **Servicio de IA:** `/src/utils/gemini.js` (reutiliza mismo servicio que Generador)

### 🎯 Propósito
Catálogo de metodologías de estudio, pensamiento crítico e inteligencia emocional que genera guías interactivas personalizadas usando IA.

### 🧩 Técnicas Disponibles (13 total)

#### **Técnicas de Estudio (6)**
1. **Técnica Pomodoro** - Sesiones de 25 min con descansos
2. **Técnica Feynman** - Explicar conceptos de forma simple
3. **Método Cornell** - Sistema de notas estructurado
4. **Mapas Mentales** - Organización visual de ideas
5. **Método SQ3R** - Lectura comprensiva (Survey, Question, Read, Recite, Review)
6. **Matriz de Eisenhower** - Priorización de tareas

#### **Pensamiento Crítico (4)**
7. **6 Sombreros para Pensar** - Análisis multiperspectiva
8. **Detective de la Verdad** - Detección de sesgos y falacias
9. **Abogado del Diablo** - Debate y argumentación
10. **Los 5 Porqués** - Análisis de causas raíz

#### **Inteligencia Emocional (3)**
11. **Growth Mindset** - Mentalidad de crecimiento
12. **Simulador de Dilemas** - Resolución de conflictos
13. **Espejo de Emociones** - Diario emocional guiado

### 🔧 Funcionalidades Clave

#### 1. Catálogo Estático
```javascript
// Función: fetchResources() - Línea 153
const STATIC_RESOURCES = [
    {
        id: 'static-feynman',
        titulo: 'Técnica Feynman',
        desc: '¿Crees que lo entiendes? Demuéstralo explicándolo simple.',
        tags: ['METODOLOGIA'],
        tagCategory: 'STUDY',
        icon: MessageSquare,
        prompt_ia: `Aplica la Técnica Feynman al tema '{tema_usuario}'...`
    },
    // ... 12 técnicas más
];
```

**Estructura de cada recurso:**
- `id`: Identificador único
- `titulo`: Nombre de la técnica
- `desc`: Descripción breve motivadora
- `tags`: Categorización
- `tagCategory`: STUDY, CRITICAL, SEL
- `icon`: Componente de icono Lucide
- `prompt_ia`: Template del prompt para IA (con placeholder `{tema_usuario}`)

#### 2. Flujo de Generación de Guía

**Paso 1:** Usuario elige una técnica (ej: Técnica Feynman)
```javascript
// Función: handleGenerateClick() - Línea 333
const handleGenerateClick = (resource) => {
    setSelectedResource(resource);
    setUserTopic(''); // Abre modal para introducir tema
};
```

**Paso 2:** Usuario introduce tema (ej: "el ciclo del agua")

**Paso 3:** Generación con IA
```javascript
// Función: confirmGeneration() - Línea 339
const specificInstruction = selectedResource.prompt_ia.replace('{tema_usuario}', userTopic);

const result = await generateWorksheet({
    profile: profile || { grade_level: '4º Primaria' },
    subject: { name: 'Desarrollo Personal', textbook_info: 'Metodología Educativa' },
    topic: userTopic,
    activityType: `Guía Interactiva: ${selectedResource.titulo}`,
    config: { difficulty: 'Medio', numQuestions: 4 },
    observations: `
        ACTÚA COMO UN MENTOR EXPERTO (${selectedResource.titulo}).
        TU OBJETIVO: Generar una guía práctica sobre "${selectedResource.titulo}" 
        aplicada al tema "${userTopic}".
        
        INSTRUCCIÓN ESPECÍFICA:
        ${specificInstruction}
        
        FORMATO DE SALIDA (JSON Obligatorio):
        {
            "title": "${selectedResource.titulo} - ${userTopic}",
            "intro": "Breve introducción motivadora (max 2 lineas).",
            "theory_recap": "Resumen muy breve de la técnica (1 parrafo).",
            "type": "${selectedResource.id}", 
            "sections": [
                {
                    "title": "Paso 1: [título descriptivo]",
                    "questions": [
                        { "text": "Pregunta/Ejercicio concreto", 
                          "feedback": "Feedback detallado y educativo" }
                    ]
                }
            ]
        }
    `
});
```

**Paso 4:** Renderizado de la guía generada
- Se muestra en pantalla completa dentro del Hub
- Formato bonito con gradientes, secciones colapsables
- Cada paso tiene preguntas con feedback pre-generado de IA

**Paso 5:** Guardado en Mochila
```javascript
// Función: saveCurrentGuide() - Línea 106
const { error } = await supabase.from('resource_library').insert({
    student_id: user.id,
    title: currentGuide.title,
    description: currentGuide.intro,
    resource_type: currentGuide.type || 'WORKSHOP',
    topic: userTopic,
    content: currentGuide,
    is_public: false
});
```

#### 3. Vista de Mochila (Dentro del Hub)
```javascript
// Función: fetchLibrary() - Línea 74
// Carga recursos guardados del estudiante
const { data } = await supabase
    .from('resource_library')
    .select('*')
    .eq('student_id', targetStudentId)
    .order('created_at', { ascending: false });
```

**Organización visual:**
- **Estrategia & Planificación** (ROADMAPs, Plans)
- **Entrenamiento & Práctica** (WORKSHEETs, EXAMs)
- **Comprensión Profunda** (Guides, Workshops)

### 📊 Tablas de Base de Datos Utilizadas

#### `resource_library` (Misma tabla que Generador IA)
```sql
-- Almacena tanto fichas generadas como guías del Hub
resource_type: 'WORKSHEET' | 'EXAM' | 'ROADMAP' | 'WORKSHOP' | 'static-feynman' | etc.
```

#### `profiles` y `learning_profiles`
```sql
-- Carga perfil del estudiante para personalizar guías
SELECT * FROM profiles WHERE id = user.id;
SELECT * FROM learning_profiles WHERE student_id = user.id;
```

### 🔄 Servicios Llamados

1. **`generateWorksheet()`** - Mismo motor de IA que Generador
2. **Supabase:** Queries a `profiles`, `learning_profiles`, `resource_library`

### 📝 Prompts Específicos por Técnica

Cada técnica tiene un prompt personalizado. Ejemplo:

**Técnica Feynman:**
```
Aplica la Técnica Feynman al tema '{tema_usuario}' siguiendo los 4 pasos clásicos:

PASO 1 - CONOCER EL CONCEPTO: Genera una pregunta que evalúe si el estudiante 
puede explicar el concepto básico con sus propias palabras.

PASO 2 - IDENTIFICAR LAGUNAS: Genera preguntas que revelen dónde hay confusión
o desconocimiento (ej: "¿Qué pasaría si...?").

PASO 3 - SIMPLIFICAR: Pide al estudiante que explique el concepto como si fuera
a un niño de 10 años, sin tecnicismos.

PASO 4 - REVISAR Y REFORZAR: Genera una pregunta que consolide el aprendizaje 
con un ejemplo práctico o analogía.

Asegúrate de generar AL MENOS 1 pregunta concreta por cada paso.
```

---

## Mochila (Resource Library)

### 🎯 Propósito
Repositorio unificado de todos los recursos generados: fichas, exámenes, guías de técnicas, rutas de estudio.

### 📁 Ubicación
- **Integrada dentro de:** ResourceHub.jsx (pestaña "Mi Mochila")
- **También accesible desde:** Generador IA (al guardar fichas)

### 🔧 Funcionalidades

#### 1. Visualización Organizada
```javascript
// Categorización automática por tipo
libraryItems.filter(i => ['ROADMAP', 'POMODORO'].includes(i.resource_type))
libraryItems.filter(i => ['WORKSHEET', 'EXAM'].includes(i.resource_type))
libraryItems.filter(i => !['ROADMAP', 'WORKSHEET', 'EXAM'].includes(i.resource_type))
```

#### 2. Acciones sobre Recursos
- **Abrir:** Ver contenido completo
- **Eliminar:** Borrar de la biblioteca
- **Remix con IA:** Regenerar con variaciones
- **Exportar:** (Funcionalidad planificada)

#### 3. Búsqueda y Filtrado
- Por asignatura
- Por tipo de recurso
- Por fecha de creación
- Por tema

### 📊 Esquema de Datos

```javascript
// Estructura típica de un item en la Mochila
{
    id: 'uuid',
    student_id: 'uuid',
    title: 'Técnica Feynman - El ciclo del agua',
    description: 'Guía interactiva para...',
    resource_type: 'static-feynman',
    subject: 'Ciencias Naturales',
    topic: 'El ciclo del agua',
    difficulty_level: 'Medio',
    content: {
        title: '...',
        intro: '...',
        theory_recap: '...',
        sections: [
            {
                title: 'Paso 1: Conocer el concepto',
                questions: [
                    { text: '...', feedback: '...' }
                ]
            }
        ]
    },
    metadata: { ... },
    created_at: '2026-01-12T...',
    user_engagement_score: 1
}
```

---

## Motor de IA (gemini.js)

### 📁 Ubicación
`/src/utils/gemini.js` (982 líneas)

### 🎯 Propósito
Servicio centralizado para todas las generaciones de contenido educativo con IA, con soporte multi-provider y enfoque LOMLOE.

### 🔧 Arquitectura

#### 1. Selección Inteligente de Proveedor de IA

**Prioridad:**
1. **SambaNova** (si hay API key) - Mayor calidad, free tier generoso
2. **Chrome AI** (Gemini Nano local) - Si está disponible en navegador
3. **Ollama** (Local) - Si está corriendo en localhost
4. **Gemini** (Google Cloud) - Fallback clásico
5. **OpenRouter** (Multi-model gateway) - Último recurso

```javascript
// Línea 482-537
let engine = null;
if (sambanova) {
    engine = 'SAMBANOVA';
    console.log('✅ Using SambaNova AI (Llama 3.1 405B)');
} else if (chromeAI) {
    engine = 'CHROME_AI';
} // ... más fallbacks
```

#### 2. Carga de Datos LOMLOE

```javascript
// Funciones: loadSaberesBasicos(), loadCriteriosEvaluacion(), loadCompetencias()
// Líneas 49-109

// Consulta saberes básicos del currículum oficial
const { data } = await supabase
    .from('saberes_basicos')
    .select('*')
    .eq('asignatura', normalizedAsignatura)
    .eq('curso', normalizedCurso);
```

**Tablas curriculares consultadas:**
- `competencias_clave` - 8 competencias LOMLOE
- `saberes_basicos` - Contenidos oficiales por asignatura/curso
- `criterios_evaluacion` - Estándares de evaluación

#### 3. Construcción del Prompt Maestro

```javascript
// Función: buildLOMLOEPrompt() - Línea 113-458
```

**Componentes del prompt:**

**a) Contexto del estudiante:**
- Curso y nivel educativo
- Estilo de aprendizaje (VARK)
- Perfiles Felder-Silverman (Activo/Reflectivo, Visual/Verbal, etc.)
- Inteligencias múltiples dominantes
- Perfil de neurodiversidad (TDAH, Dislexia, AACC, TEA)
- Intereses personales

**b) Contexto curricular:**
- Comunidad autónoma (adaptaciones regionales)
- Saberes básicos oficiales del tema
- Criterios de evaluación LOMLOE
- Competencias clave a trabajar
- Libro de texto de referencia

**c) Configuración de la actividad:**
- Tipo: Aprender, Practicar, Examen, Proyecto
- Dificultad: Refuerzo, Estándar, Ampliación
- Número de preguntas/ítems
- Tipos de preguntas preferidas
- Observaciones específicas del profesor/padre

**d) Instrucciones especiales:**
- Detección automática de clases de idiomas (genera en inglés si aplica)
- Modo situación de aprendizaje (narrativa inmersiva)
- Uso de intereses para "skinning" sin alterar rigor académico
- Estructura diferenciada según tipo de actividad

**Ejemplo de prompt generado:**
```
ROL: PROFESOR EXPERTO EN CURRÍCULO LOMLOE & ESPECIALISTA EN NEUROEDUCACIÓN.

MODE: ✏️ PRACTICAR (Worksheet Mode)
OBJETIVO: Ejercicios para asentar conocimientos.

Asignatura: Matemáticas
Curso: 4º Primaria
Libro de Texto: Santillana Saber Hacer Contigo

📚 SABERES BÁSICOS OFICIALES (LOMLOE):
1. Estrategias de cálculo mental con números naturales [Bloque: Sentido Numérico]
2. Propiedades de las operaciones aritméticas [Bloque: Sentido Numérico]

🎯 CRITERIOS DE EVALUACIÓN:
- CE.MAT.1.1: Resolver problemas cotidianos aplicando operaciones básicas

TEMA: "Multiplicaciones de dos cifras"

PERFIL DEL ESTUDIANTE:
- Nivel: 4º Primaria
- Estilo: Visual → Usa diagramas, esquemas, colores
- VARK: Visual + Kinestésico → Aprender haciendo, movimiento
- TDAH: Tareas cortas, cambios frecuentes, recordatorios de foco

CONFIGURACIÓN:
- Cantidad: 5 preguntas
- Dificultad: Estándar

¡GENERA EL RECURSO AHORA EN FORMATO JSON!
```

#### 4. Generación por Lotes (Batching)

```javascript
// Función: generateWorksheet() - Línea 698-780
// Si numQuestions > 10, divide en batches
```

**Estrategia:**
- Batches de 10 preguntas máximo
- Generación secuencial (no paralela) para evitar rate limits
- 2 segundos de delay entre batches
- Fusión final de resultados
- Re-indexación de IDs

#### 5. Manejo de Errores y Reintentos

```javascript
// Línea 549-688
let attempt = 0;
const maxAttempts = 3;

while (attempt < maxAttempts) {
    try {
        // Intento 1: Modelo 70B
        // Intento 2: Modelo 8B (más rápido)
        // Intento 3: Modelo 8B again
        
        // Validación de JSON
        // Deduplicación automática de preguntas
        // Limpieza de markdown fences
        
    } catch (error) {
        if (attempt >= maxAttempts) throw error;
    }
}
```

#### 6. Post-procesamiento

**Deduplicación automática:**
```javascript
// Línea 647-668
// Elimina preguntas duplicadas comparando texto normalizado
const seen = new Set();
s.questions = s.questions.filter(q => {
    const key = q.text.toLowerCase().trim().replace(/[^a-z0-9ñáéíóúü]/g, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
});
```

### 📊 Tablas Consultadas

1. `learning_profiles` - Perfil de aprendizaje del estudiante
2. `saberes_basicos` - Contenidos curriculares oficiales
3. `criterios_evaluacion` - Estándares de evaluación
4. `competencias_clave` - Competencias LOMLOE

### 🔑 API Keys

```javascript
const getGeminiKey = () => localStorage.getItem('GEMINI_API_KEY') || getEnv('VITE_GEMINI_API_KEY');

const getSambaNovaKey = () => localStorage.getItem('SAMBANOVA_API_KEY') || 
    getEnv('VITE_SAMBANOVA_API_KEY') || 
    "54017650-0863-4436-a868-93409238101e"; // Hardcoded fallback

const getOpenRouterKey = () => localStorage.getItem('OPENROUTER_API_KEY') || 
    getEnv('VITE_OPENROUTER_API_KEY');
```

### 📝 Formato de Salida

**JSON Estructurado:**
```json
{
  "title": "Multiplicaciones de Dos Cifras - Práctica",
  "intro": "Vamos a practicar multiplicaciones paso a paso",
  "theory_recap": "Para multiplicar 23 x 45, primero multiplicamos...",
  "sections": [
    {
      "title": "Ejercicios Básicos",
      "questions": [
        {
          "id": "q1",
          "type": "multiple_choice",
          "text": "¿Cuánto es 12 x 13?",
          "options": ["156", "146", "166", "136"],
          "correct_answer": "156",
          "hint": "Multiplica primero 12 x 3, luego 12 x 10...",
          "feedback": "¡Correcto! 12 x 10 = 120, 12 x 3 = 36, suma = 156"
        }
      ]
    }
  ],
  "difficulty_level": "Medio",
  "estimated_time": "15 minutos"
}
```

---

## Base de Datos

### 🗄️ Esquema Principal Unificado

#### Tabla: `resource_library`
**Propósito:** Almacenamiento unificado de todos los recursos generados (fichas, guías, rutas, etc.)

```sql
CREATE TABLE resource_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    
    -- Metadata básica
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL, -- 'WORKSHEET', 'EXAM', 'ROADMAP', 'WORKSHOP', 'static-feynman', etc.
    
    -- Contexto académico
    subject TEXT,  -- 'Matemáticas', 'Lengua', etc.
    topic TEXT,    -- 'Multiplicaciones', 'Ciclo del agua', etc.
    difficulty_level TEXT, -- 'Refuerzo', 'Estándar', 'Ampliación'
    
    -- Contenido
    content JSONB NOT NULL, -- Estructura completa de la ficha/guía
    metadata JSONB, -- Datos adicionales (numQuestions, questionTypes, etc.)
    
    -- Engagement
    user_engagement_score INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_resource_library_student ON resource_library(student_id);
CREATE INDEX idx_resource_library_type ON resource_library(resource_type);
CREATE INDEX idx_resource_library_subject ON resource_library(subject);
```

#### Tabla: `students`
```sql
CREATE TABLE students (
    id UUID PRIMARY KEY,
    parent_id UUID REFERENCES auth.users(id),
    name TEXT,
    grade_level TEXT,  -- '4º Primaria', '2º ESO', etc.
    autonomous_community TEXT,
    created_at TIMESTAMP
);
```

#### Tabla: `learning_profiles`
```sql
CREATE TABLE learning_profiles (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES students(id) UNIQUE,
    
    -- VARK
    vark_dominant TEXT, -- 'visual', 'auditivo', 'lectura', 'kinestesico'
    vark_scores JSONB,
    
    -- Felder-Silverman
    fs_active_reflective INTEGER,
    fs_sensing_intuitive INTEGER,
    fs_visual_verbal INTEGER,
    fs_sequential_global INTEGER,
    
    -- Inteligencias Múltiples
    mi_scores JSONB,
    
    -- Resumen IA
    ai_summary TEXT,
    
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### Tabla: `user_subjects`
```sql
CREATE TABLE user_subjects (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    subject_name TEXT,
    grade_level TEXT,
    textbook_info TEXT, -- "Santillana Saber Hacer Contigo"
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
);
```

#### Tablas Curriculares LOMLOE

**`competencias_clave`**
```sql
CREATE TABLE competencias_clave (
    id TEXT PRIMARY KEY, -- 'CCL', 'CP', 'STEM', 'CD', 'CPSAA', 'CC', 'CE', 'CCEC'
    nombre TEXT,
    descripcion TEXT
);
```

**`saberes_basicos`**
```sql
CREATE TABLE saberes_basicos (
    id UUID PRIMARY KEY,
    asignatura TEXT, -- 'Matemáticas', 'Lengua Castellana', etc.
    curso TEXT,      -- '4º Primaria', '2º ESO', etc.
    bloque TEXT,     -- 'Sentido Numérico', 'Comunicación', etc.
    saber TEXT,      -- Contenido específico
    competencias TEXT[] -- Array de IDs de competencias
);
```

**`criterios_evaluacion`**
```sql
CREATE TABLE criterios_evaluacion (
    id TEXT PRIMARY KEY, -- 'CE.MAT.1.1'
    asignatura TEXT,
    curso TEXT,
    descripcion TEXT,
    competencias TEXT[]
);
```

---

## Flujos de Usuario

### 🔄 Flujo 1: Generar Ficha de Ejercicios

1. Usuario abre **Generador IA**
2. Selecciona **estudiante** (ej: "María")
   - Sistema carga automáticamente: curso, estilo de aprendizaje VARK, NEE
3. Selecciona **asignatura** (ej: "Matemáticas")
4. Introduce **tema** (ej: "Multiplicaciones de dos cifras")
5. Opcionalmente introduce **libro de texto** (auto-completado si ya está guardado)
6. Configura parámetros:
   - Tipo: Practicar
   - Dificultad: Estándar
   - Número de preguntas: 10
   - Tipos de preguntas: Variado
7. Click en **"Generar con IA"**
8. Sistema:
   - Consulta saberes básicos LOMLOE de "Matemáticas 4º Primaria"
   - Consulta criterios de evaluación
   - Construye prompt personalizado con perfil de María
   - Llama a SambaNova API (o fallback)
   - Valida JSON retornado
   - Renderiza en componente InteractiveWorksheet
9. Usuario revisa ejercicios generados
10. Click en **"Guardar en Mochila"**
11. Sistema:
    - Inserta en `resource_library` con `resource_type: 'WORKSHEET'`
    - Confirma "Guardado correctamente"
12. Usuario puede:
    - Resolver ejercicios interactivamente
    - Pedir corrección con IA
    - Descargar PDF (exportar)

### 🔄 Flujo 2: Crear Guía de Técnica de Estudio

1. Usuario abre **Hub de Aprendizaje**
2. Ve catálogo de 13 técnicas organizadas por categoría:
   - Técnicas de Estudio
   - Pensamiento Crítico
   - Inteligencia Emocional
3. Click en **"Técnica Feynman"**
4. Sistema abre modal pidiendo:
   - "¿Sobre qué tema quieres aplicar esta técnica?"
5. Usuario escribe: **"El ciclo del agua"**
6. Click en **"Generar Guía Personalizada"**
7. Sistema:
   - Toma prompt específico de Técnica Feynman
   - Reemplaza `{tema_usuario}` con "El ciclo del agua"
   - Construye prompt completo con instrucciones de 4 pasos
   - Llama a generateWorksheet() con tipo 'Guía Interactiva'
   - Parsea JSON con logging detallado
8. Renderiza guía con:
   - Título: "Técnica Feynman - El ciclo del agua"
   - Introducción motivadora
   - Fundamentos de la técnica
   - 4 Pasos con preguntas y feedback IA
9. Usuario revisa contenido
10. Click en **"Guardar en Mochila"**
11. Sistema:
    - Inserta en `resource_library` con `resource_type: 'static-feynman'`
    - Refresca vista de Mochila
12. Usuario puede:
    - Volver a consultar la guía desde Mochila
    - Compartirla (futuro)
    - Generar nueva variación (remix)

### 🔄 Flujo 3: Consultar Mochila

1. Usuario abre **Hub de Aprendizaje**
2. Click en pestaña **"Mi Mochila"**
3. Sistema:
   - Identifica si es padre/estudiante
   - Si es padre con hijos registrados, carga recursos del primer hijo
   - Query a `resource_library` ordenado por fecha
4. Muestra recursos organizados en 3 secciones:
   - **Estrategia & Planificación** (ROADMAPs, planes de estudio)
   - **Entrenamiento & Práctica** (Fichas, exámenes)
   - **Comprensión Profunda** (Guías Feynman, mapas mentales, etc.)
5. Usuario puede:
   - **Abrir** cualquier recurso para verlo completo
   - **Eliminar** recursos que no necesita (confirmación previa)
   - **Remix** para regenerar con variaciones
   - **Filtrar** por asignatura, tipo, fecha

---

## 🔐 Seguridad y Permisos

### Row Level Security (RLS)

Todas las tablas principales tienen políticas RLS habilitadas:

**Política: Solo ver propios recursos**
```sql
CREATE POLICY "Users can view own resources"
ON resource_library FOR SELECT
USING (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR
    student_id = auth.uid() -- Si el estudiante accede directamente
);
```

**Política: Solo insertar propios recursos**
```sql
CREATE POLICY "Users can insert own resources"
ON resource_library FOR INSERT
WITH CHECK (
    student_id IN (
        SELECT id FROM students WHERE parent_id = auth.uid()
    )
    OR
    student_id = auth.uid()
);
```

---

## 📊 Métricas y Analytics

### Datos Registrados (para futuro análisis)

1. **Frecuencia de generación:**
   - Cuántas fichas/guías se generan por día
   - Qué técnicas son más populares
   - Qué asignaturas se trabajan más

2. **Engagement:**
   - Campo `user_engagement_score` en `resource_library`
   - Se incrementa cada vez que se abre un recurso
   - Permite identificar contenido más útil

3. **Patrones de uso:**
   - Temas más consultados
   - Dificultades más solicitadas
   - Correlación entre perfil VARK y tipo de ejercicios generados

---

## 🚀 Próximos Pasos (Fase 0 para Tutor IA)

### Documentación Completada ✅

Este documento cubre:
- [x] Funcionamiento del Generador IA
- [x] Funcionamiento del Hub de Aprendizaje
- [x] Sistema de Mochila
- [x] Motor de IA (gemini.js)
- [x] Estructura de base de datos
- [x] Flujos de usuario completos
- [x] Servicios y prompts utilizados

### Preparación para Tutor IA

**Reutilizable:**
- Motor de IA completo (generateWorksheet)
- Sistema de perfiles y personalización
- Tablas curriculares LOMLOE
- Tabla `resource_library` (guardado de sesiones)

**A crear:**
- Tabla `tutor_sessions` para conversaciones
- Tabla `tutor_messages` para historial de chat
- Componente `TutorAI.jsx` para interfaz conversacional
- Servicio `tutorService.js` para lógica de chat

---

## 📞 Notas Técnicas Importantes

### Limitaciones Conocidas

1. **No hay sincronización en tiempo real** entre navegadores
2. **Límite de 50 preguntas** por ficha (batching mitiga pero tiene límites de tiempo)
3. **Dependencia de calidad de IA** - Errores en JSON ocasionales
4. **No hay versionado** de recursos guardados (sobrescritura)

### Buenas Prácticas Implementadas

1. **Normalización de nombres** de asignaturas y cursos
2. **Validación de JSON** con reintentos automáticos
3. **Deduplicación automática** de preguntas
4. **Logging exhaustivo** en consola para debugging
5. **Fallbacks múltiples** de proveedores de IA
6. **Personalización profunda** basada en perfiles reales

---

**Fin de la Documentación**

*Este documento sirve como referencia completa para entender el estado actual antes de implementar el Tutor IA conversacional en las siguientes fases.*
