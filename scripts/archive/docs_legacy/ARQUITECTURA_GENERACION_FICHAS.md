# 🏗️ ARQUITECTURA DEL SISTEMA DE GENERACIÓN DE FICHAS

## 📋 Índice
1. [Flujo de Generación](#flujo-de-generación)
2. [Prioridad de Fuentes](#prioridad-de-fuentes)
3. [Archivos de Configuración](#archivos-de-configuración)
4. [Cómo Agregar Nuevos Cursos](#cómo-agregar-nuevos-cursos)
5. [Diagrama de Flujo](#diagrama-de-flujo)

---

## 🔄 FLUJO DE GENERACIÓN

Cuando un usuario genera una ficha, el sistema sigue este orden:

```
Usuario solicita ficha
    │
    ▼
┌─────────────────────────────────────────┐
│ WorksheetGenerator.jsx                  │ ← Componente React principal
│ - Recibe: asignatura, tema, curso       │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ smart-worksheet-generator.js             │ ← ORQUESTADOR PRINCIPAL
│                                          │
│ PASO 0: ¿Es Lengua/Literatura?          │
│    SÍ → tryBibliotecasContent()          │
│         └─→ biblioteca-manager.js        │
│              └─→ OpenLibrary/Gutenberg   │
│                                          │
│ PASO 1: Buscar contenido INTEF          │
│    └─→ searchINTEFResources()           │
│         └─→ intef-fetcher.js            │
│              └─→ Procomún/CEDEC         │
│                                          │
│ PASO 2: Si tiene INTEF:                 │
│    └─→ obtenerPreguntasPorTema()        │
│         └─→ banco-preguntas.js          │
│              ├─→ Khan Academy (STEM)     │
│              ├─→ Santillana (por curso)  │
│              ├─→ Banco específico        │
│              └─→ Default (fallback)      │
└──────────────┬──────────────────────────┘
               │
               ▼
         Worksheet JSON
```

---

## 🎯 PRIORIDAD DE FUENTES

### 1️⃣ **Bibliotecas Digitales** (SOLO para Lengua/Literatura)
- **Archivo:** `src/services/bibliotecas/biblioteca-manager.js`
- **Fuentes:** OpenLibrary + Project Gutenberg
- **Cuándo:** Solo si `asignatura` contiene "lengua", "literatura", "galego", etc.
- **Costo:** $0 (dominio público)

### 2️⃣ **INTEF/Procomún** (Contenido Oficial)
- **Archivo:** `src/services/intef/intef-fetcher.js`
- **Fuentes:** Portal Procomún + CEDEC
- **Cuándo:** SIEMPRE se intenta primero
- **Caché:** Supabase tabla `intef_content_cache`
- **Costo:** $0 (oficial y gratuito)

### 3️⃣ **Preguntas - Prioridad en banco-preguntas.js:**

#### A) **Khan Academy** (para STEM - Matemáticas, Ciencias)
- **Archivo:** `src/services/khan/khan-fetcher.js`
- **Prioriza por curso:** `khan-por-curso.js`
- **Ejemplo:** Para **4º Primaria + Matemáticas + Fracciones**
  ```
  1. Busca en: KHAN_EXERCISES_POR_CURSO['4º Primaria']['Matemáticas']['Fracciones']
  2. Si no coincide exacto, busca coincidencia parcial (fuzzy matching)
  ```

#### B) **Santillana** (integrado en Khan por curso)
- **Archivos:** 
  - `santillana-4-primaria-MATES.js`
  - `santillana-4-primaria-LENGUA.js`
  - `santillana-4-primaria-NATURALES.js`
  - `santillana-4-primaria-SOCIALES.js`
  - `santillana-4-primaria-GALEGO.js`
  - `santillana-4-primaria-INGLES.js`
- **Cuándo:** Automático si `curso = '4º Primaria'`

#### C) **Banco de Preguntas Específico**
- **Archivo:** `src/services/banco-preguntas.js`
- **Contenido:** Preguntas organizadas por asignatura y tema
- **Ejemplo:**
  ```javascript
  'Ciencias Sociales': {
      'El Clima de España': [ /* 15 preguntas */ ],
      'Geografía de España': [ /* 10 preguntas */ ],
      // ...
  }
  ```

#### D) **Default (Fallback genérico)**
- **Cuando:** No hay coincidencia en ningún banco
- **Preguntas:** 10 preguntas genéricas apropiadas para niños

---

## 📁 ARCHIVOS DE CONFIGURACIÓN

### **Sistema de Generación**
```
src/services/
│
├── smart-worksheet-generator.js     ← ORQUESTADOR PRINCIPAL
│   └── Decide qué fuente usar
│
├── banco-preguntas.js               ← BANCO DE PREGUNTAS
│   ├── Preguntas por asignatura/tema
│   └── Llama a Khan Academy si es STEM
│
├── intef/
│   ├── intef-fetcher.js             ← Obtiene contenido INTEF
│   ├── intef-config.js              ← Mapeos asignatura/curso → INTEF
│   └── intef-scraper.js             ← Scraper de Procomún/CEDEC
│
├── khan/
│   ├── khan-fetcher.js              ← BUSCA ejercicios Khan
│   ├── khan-por-curso.js            ← ÍNDICE por curso (4º Primaria, 1º ESO...)
│   ├── cuarto-primaria-galicia-PARTE1.js
│   ├── cuarto-primaria-galicia-PARTE2.js
│   ├── santillana-4-primaria-MATES.js
│   ├── santillana-4-primaria-LENGUA.js
│   ├── santillana-4-primaria-NATURALES.js
│   ├── santillana-4-primaria-SOCIALES.js
│   ├── santillana-4-primaria-GALEGO.js
│   └── santillana-4-primaria-INGLES.js
│
└── bibliotecas/
    ├── biblioteca-manager.js        ← Gestiona bibliotecas digitales
    ├── openlibrary-client.js
    └── gutenberg-client.js
```

### **Configuración por Curso**

**Archivo:** `src/services/khan/khan-por-curso.js`

```javascript
export const KHAN_EXERCISES_POR_CURSO = {
    '4º Primaria': {
        'Matemáticas': { /* ejercicios */ },
        'Lengua Castellana': { /* ejercicios */ },
        'Ciencias Sociales': { /* ejercicios */ },
        // ...
    },
    
    '1º ESO': {
        'Matemáticas': { /* ejercicios */ },
        // Agregar más asignaturas aquí
    }
    
    // ⚠️ AQUÍ AGREGARÍAS NUEVOS CURSOS
};
```

---

## ➕ CÓMO AGREGAR NUEVOS CURSOS

### **Opción 1: Agregar Curso Completo (Recomendado)**

#### **Paso 1:** Crear archivos por asignatura

Crea archivos en `src/services/khan/`:

```javascript
// quinto-primaria-matematicas.js
export const QUINTO_PRIMARIA_MATEMATICAS = {
    'Matemáticas': {
        'Números decimales': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/...',
            nivel: '5º Primaria',
            ejercicios: [
                { 
                    pregunta: '¿Qué es un número decimal?',
                    dificultad: 'fácil',
                    tipo: 'short_answer'
                },
                // ... más ejercicios
            ]
        },
        'Porcentajes': {
            // ...
        }
    }
};
```

#### **Paso 2:** Importar en `khan-por-curso.js`

```javascript
// Importar en la parte superior
import { QUINTO_PRIMARIA_MATEMATICAS } from './quinto-primaria-matematicas.js';
import { QUINTO_PRIMARIA_LENGUA } from './quinto-primaria-lengua.js';
// ... más asignaturas

// Agregar al objeto principal
export const KHAN_EXERCISES_POR_CURSO = {
    '4º Primaria': COMPLETO_4_PRIMARIA,
    
    '5º Primaria': {
        ...QUINTO_PRIMARIA_MATEMATICAS,
        ...QUINTO_PRIMARIA_LENGUA,
        // ... más asignaturas
    },
    
    '1º ESO': {
        // ...
    }
};
```

### **Opción 2: Agregar Solo en Banco de Preguntas**

Si no tienes ejercicios específicos estilo Khan Academy, agrega directamente en `banco-preguntas.js`:

```javascript
// src/services/banco-preguntas.js
export const PREGUNTAS_BANCO = {
    'Matemáticas': {
        'Fracciones': [ /* ejercicios */ ],
        // ➕ AGREGAR NUEVO TEMA AQUÍ
        'Números decimales': [
            { pregunta: '...', dificultad: 'fácil', tipo: 'short_answer' },
            { pregunta: '...', dificultad: 'media', tipo: 'short_answer' },
            // ... mínimo 10 preguntas
        ]
    },
    
    // ➕ AGREGAR NUEVA ASIGNATURA AQUÍ
    'Historia': {
        'Edad Media': [
            { pregunta: '...', dificultad: 'fácil', tipo: 'short_answer' },
            // ...
        ]
    }
};
```

### **Opción 3: Configurar INTEF para Nuevo Curso**

**Archivo:** `src/services/intef/intef-config.js`

```javascript
export const INTEF_CONFIG = {
    grade_mapping: {
        '4º Primaria': {
            intef_level: 'Educación Primaria (4º)',
            age_range: '9-10 años',
            procomun_query: 'educación primaria cuarto'
        },
        
        // ➕ AGREGAR AQUÍ
        '5º Primaria': {
            intef_level: 'Educación Primaria (5º)',
            age_range: '10-11 años',
            procomun_query: 'educación primaria quinto'
        },
        
        '1º ESO': {
            intef_level: 'Educación Secundaria (1º ESO)',
            age_range: '12-13 años',
            procomun_query: 'eso primero secundaria'
        }
    },
    
    subject_mapping: {
        'Matemáticas': {
            intef_key: 'matematicas',
            procomun_tags: ['CMCT', 'Razonamiento matemático']
        },
        
        // ➕ AGREGAR NUEVAS ASIGNATURAS
        'Historia': {
            intef_key: 'historia',
            procomun_tags: ['CCEC', 'Conciencia histórica']
        }
    }
};
```

---

## 📊 DIAGRAMA DE FLUJO COMPLETO

```
┌────────────────────────────────────────────────────┐
│  USUARIO GENERA FICHA                              │
│  - Asignatura: Ciencias Sociales                   │
│  - Tema: El Clima de España                        │
│  - Curso: 4º Primaria                              │
└──────────────────┬─────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────┐
│  PASO 0: ¿Es asignatura literaria?                 │
│  (Lengua, Literatura, Galego)                      │
└──────┬──────────────────────────────────┬──────────┘
       │ SÍ                                │ NO
       ▼                                   │
┌─────────────────────────┐               │
│ biblioteca-manager.js   │               │
│ - OpenLibrary           │               │
│ - Gutenberg             │               │
│ → Fragmento + Preguntas │               │
└─────────────────────────┘               │
                                          ▼
                   ┌────────────────────────────────────┐
                   │  PASO 1: INTEF                     │
                   │  intef-fetcher.js                  │
                   ├────────────────────────────────────┤
                   │  1. Busca en caché Supabase        │
                   │  2. Si no hay, scraping Procomún   │
                   │  3. Genera estructura con 17 act.  │
                   └──────────┬─────────────────────────┘
                              │
                              ▼
                   ┌─────────────────────────────────────┐
                   │  PASO 2: Preguntas                  │
                   │  obtenerPreguntasPorTema()          │
                   │  (con curso = '4º Primaria')        │
                   └──────────┬──────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐   ┌─────────────────┐   ┌──────────────────┐
│ Khan Academy │   │ Banco Preguntas │   │ Default          │
│              │   │                 │   │                  │
│ - Matemáticas│   │ PREGUNTAS_BANCO │   │ 10 preguntas     │
│ - Ciencias   │   │ ['Ciencias      │   │ genéricas        │
│              │   │   Sociales']    │   │                  │
│ Por curso:   │   │ ['El Clima de   │   │                  │
│ 4º Primaria  │   │   España']      │   │                  │
│   + tema     │   │                 │   │                  │
│              │   │ ✅ 15 preguntas │   │                  │
│ Incluye:     │   │ específicas     │   │                  │
│ - Santillana │   │                 │   │                  │
└──────────────┘   └─────────────────┘   └──────────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ▼
                   ┌─────────────────────────────────────┐
                   │  WORKSHEET FINAL                    │
                   ├─────────────────────────────────────┤
                   │  source: "INTEF_OFFICIAL"           │
                   │  title: "El Clima de España"        │
                   │  intro: Descripción INTEF           │
                   │  theory_recap: Contenido teórico    │
                   │  metadata_lomloe: {...}             │
                   │  sections: [                        │
                   │    {                                │
                   │      title: "Actividades",          │
                   │      questions: [15 preguntas]      │
                   │    }                                │
                   │  ]                                  │
                   │  cost: $0.00                        │
                   │  savings: €0.02                     │
                   └─────────────────────────────────────┘
```

---

## 🎯 RESUMEN RÁPIDO

### **¿De dónde vienen las preguntas?**

| Asignatura | Prioridad 1 | Prioridad 2 | Prioridad 3 |
|------------|-------------|-------------|-------------|
| **Lengua/Literatura** | Bibliotecas Digitales | Banco Preguntas | Default |
| **Matemáticas** | Khan Academy (por curso) | Banco Preguntas | Default |
| **Ciencias** | Banco Preguntas | Khan Academy | Default |
| **Ciencias Sociales** | Banco Preguntas específico | Default | - |
| **Historia** | Banco Preguntas | Default | - |

### **¿Qué archivos editar?**

| Objetivo | Archivo a Editar |
|----------|------------------|
| Agregar preguntas tema específico | `src/services/banco-preguntas.js` |
| Agregar curso completo (Khan) | `src/services/khan/khan-por-curso.js` + crear archivos nuevos |
| Agregar contenido Santillana | Crear `santillana-[nivel]-[asignatura].js` |
| Configurar INTEF nuevo curso | `src/services/intef/intef-config.js` |
| Cambiar prioridad fuentes | `src/services/smart-worksheet-generator.js` |

---

## 💡 CONSEJOS

1. **Siempre agregar mínimo 10 preguntas** por tema para evitar repeticiones
2. **Usar coincidencia parcial** - El sistema busca "clima" dentro de "El Clima de España"
3. **Priorizar Khan Academy para STEM** - Matemáticas y Ciencias
4. **Priorizar Banco Preguntas para Humanidades** - Sociales, Historia, Lengua
5. **El contenido INTEF se cachea forever** - No se vuelve a descargar

---

## 🔧 PRÓXIMOS PASOS RECOMENDADOS

1. ✅ **Completar banco de preguntas** para todos los temas de 4º Primaria
2. ⏳ **Agregar 5º Primaria** siguiendo la estructura de 4º
3. ⏳ **Agregar 1º ESO** con contenido más avanzado
4. ⏳ **Implementar scraper real INTEF** (actualmente usa contenido simulado)

---

*Última actualización: 2025-12-14*
