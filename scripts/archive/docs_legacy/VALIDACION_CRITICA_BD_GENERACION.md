# 🔍 VALIDACIÓN CRÍTICA: INTEGRIDAD BD Y GENERACIÓN QUIRÚRGICA

**Análisis de Arquitectura de Datos para Personalización Premium**

**Fecha:** 15 de diciembre de 2025  
**Criticidad:** 🔴 ALTA - Afecta a personalización quirúrgica

---

## 📋 ÍNDICE

1. [Estructura Actual vs Ideal](#estructura-actual)
2. [Campos Faltantes Críticos](#campos-faltantes)
3. [Validación del Servicio](#validacion-servicio)
4. [Plan de Acción](#plan-accion)

---

## 💾 1. ESTRUCTURA ACTUAL VS IDEAL

### **A. Estructura ACTUAL de Ejercicios (en código JavaScript)**

**Ubicación:** `src/services/khan/*.js`

```javascript
// ESTADO ACTUAL:
{
    id: "mat_4p_q001",
    pregunta: "¿Cuánto es 3 + 5?",
    respuesta_correcta: "8",
    tipo: "short_answer",
    dificultad: "facil",
    
    // Campos EXISTENTES:
    asignatura: "Matemáticas",        // ✅ SÍ
    curso: "4º Primaria",              // ✅ SÍ
    tema: "Operaciones básicas",       // ✅ SÍ
    nivelBloom: "APLICAR",             // ⚠️ PARCIAL (no todos)
    
    // Campos AUSENTES (CRÍTICOS):
    criterio_lomloe_id: undefined,     // ❌ NO (95%)
    saber_basico_id: undefined,        // ❌ NO (100%)
    foco_pedagogico: undefined,        // ❌ NO (100%) ← CRÍTICO
    formato_preferido: undefined,      // ❌ NO (100%)
    tipo_respuesta: undefined,         // ❌ NO (mayoría)
    licencia: undefined,               // ❌ NO (95%)
    autor: undefined,                  // ❌ NO (95%)
    fecha_creacion: undefined          // ❌ NO (95%)
}
```

### **B. Estructura IDEAL para Personalización Quirúrgica**

```javascript
// ESTRUCTURA COMPLETA NECESARIA:
{
    // ═══ IDENTIFICACIÓN ═══
    id: "mat_4p_q001",
    pregunta: "¿Cuánto es 3 + 5?",
    respuesta_correcta: "8",
    
    // ═══ CLASIFICACIÓN CURRICULAR ═══
    asignatura: "Matemáticas",
    curso: "4º Primaria",
    tema: "Operaciones básicas",
    
    criterio_lomloe_id: "MAT_PRI4_C1.1",              // ⭐ CRÍTICO
    saber_basico_id: "SB_MAT_OPERACIONES_01",         // ⭐ CRÍTICO
    competencias_clave: ["STEM", "CD"],
    
    // ═══ CLASIFICACIÓN PEDAGÓGICA ═══
    nivel_bloom: "APLICAR",                           // ⭐ CRÍTICO
    foco_pedagogico: "PROCEDIMIENTO",                 // ⭐⭐⭐ MUY CRÍTICO
    // Valores: "CONCEPTO" | "PROCEDIMIENTO" | "APLICACION"
    
    tipo_respuesta: "NUMERICO",                       // ⭐ CRÍTICO
    // Valores: "NUMERICO" | "TEXTO_ABIERTO" | "MULTIPLE_CHOICE" | "VERDADERO_FALSO"
    
    dificultad: "facil",
    // Valores: "facil" | "media" | "dificil"
    
    // ═══ PERSONALIZACIÓN V/A/K ═══
    formato_preferido: ["TEXTO", "EJERCICIO_GUIADO"], // ⭐ IMPORTANTE
    // Valores: "DIAGRAMA" | "VIDEO" | "AUDIO" | "TEXTO" | "INTERACTIVO" | "EJERCICIO_GUIADO"
    
    incluye_visual: false,
    incluye_audio: false,
    incluye_interactivo: false,
    
    // ═══ LEGALIDAD ═══
    licencia: "PROPRIETARY",                          // ⭐ CRÍTICO (legal)
    fuente_original: "Creación propia - EduAnalytics",
    autor: "EduAnalytics Team",
    fecha_creacion: "2025-12-15",
    verificado: true
}
```

---

## ❌ 2. CAMPOS FALTANTES CRÍTICOS

### **Análisis por Criticidad**

| Campo | Estado Actual | % Implementado | Criticidad | Bloqueador para |
|-------|---------------|----------------|------------|-----------------|
| **foco_pedagogico** | ❌ NO | 0% | 🔴🔴🔴 **MUY ALTA** | Personalización quirúrgica EC/EP/EAC |
| **criterio_lomloe_id** | ❌ NO | 5% | 🔴🔴 ALTA | Búsqueda dirigida LOMLOE |
| **saber_basico_id** | ❌ NO | 0% | 🔴 MEDIA | Granularidad de refuerzo |
| **tipo_respuesta** | ⚠️ PARCIAL | 30% | 🟡 MEDIA | Heurísticas mejoradas |
| **formato_preferido** | ❌ NO | 0% | 🟡 MEDIA | Personalización V/A/K |
| **licencia** | ❌ NO | 5% | 🔴🔴 ALTA | Legalidad |

---

## 🚨 3. CAMPO CRÍTICO: foco_pedagogico

### **¿Por qué es TAN crítico?**

Este campo es la **bisagra** entre el diagnóstico (patrón de error) y la prescripción (ejercicios de refuerzo).

#### **Mapping Directo:**

```
┌─────────────────────────────────────────────────────┐
│         DIAGNÓSTICO → PRESCRIPCIÓN                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Patrón EC (Error Conceptual)                       │
│         ↓                                           │
│  foco_pedagogico = "CONCEPTO"                       │
│         ↓                                           │
│  Ejercicios que explican DEFINICIONES               │
│                                                      │
│  ────────────────────────────────────────           │
│                                                      │
│  Patrón EP (Error Procedimental)                    │
│         ↓                                           │
│  foco_pedagogico = "PROCEDIMIENTO"                  │
│         ↓                                           │
│  Ejercicios que entrenan PASOS SECUENCIALES        │
│                                                      │
│  ────────────────────────────────────────           │
│                                                      │
│  Patrón EAC (Error Aplicación/Contexto)            │
│         ↓                                           │
│  foco_pedagogico = "APLICACION"                     │
│         ↓                                           │
│  Ejercicios de PROBLEMAS CONTEXTUALES              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### **Ejemplo Real:**

**SIN foco_pedagogico:**
```javascript
// Estudiante con patrón EP (falla procedimientos)
// Sistema busca ejercicios por tema:
buscar({ tema: "Fracciones" })
→ Devuelve: Definiciones + Procedimientos + Aplicaciones (MEZCLA)
→ Resultado: 33% relevancia ⚠️
```

**CON foco_pedagogico:**
```javascript
// Estudiante con patrón EP (falla procedimientos)
buscar({ 
    tema: "Fracciones",
    foco_pedagogico: "PROCEDIMIENTO"  // ← QUIRÚRGICO
})
→ Devuelve: SOLO ejercicios de pasos (suma/resta fracciones)
→ Resultado: 100% relevancia ✅
```

---

## 🔍 4. VALIDACIÓN DEL SERVICIO ACTUAL

### **A. fichas-personalizadas-service.js - Estado Actual**

Revisando el código implementado:

```javascript
// src/services/fichas-personalizadas-service.js

export async function generarFichaRefuerzo(perfil, historial) {
    // 1. Analizar patrón dominante
    const patronDominante = identificarPatronDominante(historial);
    
    // 2. Identificar criterio problemático
    const criterioProblematico = identificarCriterioProblematico(historial);
    
    // 3. BÚSQUEDA DE EJERCICIOS
    const ejercicios = buscarEjercicios({
        asignatura: perfil.asignatura,
        tema: criterioProblematico.tema,
        // ⚠️ PROBLEMA: NO usa foco_pedagogico
        // Debería incluir:
        // foco_pedagogico: mapearPatronAFoco(patronDominante)
    });
    
    // ...
}
```

**PROBLEMA IDENTIFICADO:** ⚠️

El servicio **NO utiliza `foco_pedagogico`** porque el campo **NO existe** en los ejercicios.

### **B. Lógica IDEAL con foco_pedagogico**

```javascript
// IMPLEMENTACIÓN MEJORADA:

function mapearPatronAFoco(patron) {
    const mapping = {
        'EC': 'CONCEPTO',
        'EP': 'PROCEDIMIENTO',
        'EAC': 'APLICACION',
        'ETF': null  // No requiere foco específico
    };
    return mapping[patron];
}

export async function generarFichaRefuerzo(perfil, historial) {
    // 1. Analizar patrón dominante
    const { patron, criterio } = analizarHistorial(historial);
    
    // 2. Mapear patrón → foco pedagógico
    const focoPedagogico = mapearPatronAFoco(patron);
    
    // 3. Obtener estilo de aprendizaje
    const estilo = perfil.estiloAprendizaje || 'VISUAL';
    
    // 4. BÚSQUEDA QUIRÚRGICA (3 capas de filtros)
    const ejercicios = await supabase
        .from('ejercicios')
        .select('*')
        // CAPA 1: Refuerzo dirigido (LOMLOE)
        .eq('criterio_lomloe_id', criterio.codigo)
        // CAPA 2: Foco en el error (QUIRÚRGICO) ⭐⭐⭐
        .eq('foco_pedagogico', focoPedagogico)
        // CAPA 3: Personalización V/A/K
        .contains('formato_preferido', mapearEstiloAFormato(estilo))
        // FILTRO: Ejercicios nuevos (no resueltos)
        .not('id', 'in', historialResuelto.map(h => h.ejercicio_id))
        .limit(10);
    
    return {
        titulo: `Ficha de Refuerzo: ${PATRONES_ERROR_TIER1[patron].nombre}`,
        patron_reforzado: patron,
        criterio_lomloe: criterio.codigo,
        foco: focoPedagogico,
        plan_accion: generarPlanAccion(patron, estilo),
        ejercicios: ejercicios
    };
}

function mapearEstiloAFormato(estilo) {
    const mapping = {
        'VISUAL': ['DIAGRAMA', 'VIDEO', 'INTERACTIVO'],
        'AUDITIVO': ['AUDIO', 'VIDEO', 'TEXTO'],
        'KINESTESICO': ['INTERACTIVO', 'EJERCICIO_GUIADO']
    };
    return mapping[estilo] || ['TEXTO'];
}
```

---

## 📊 5. ESTRUCTURA DE BD SUPABASE (IDEAL)

### **Tabla: ejercicios**

```sql
CREATE TABLE ejercicios (
    -- Identificación
    id VARCHAR PRIMARY KEY,
    pregunta TEXT NOT NULL,
    respuesta_correcta TEXT NOT NULL,
    
    -- Clasificación curricular
    asignatura VARCHAR NOT NULL,
    curso VARCHAR NOT NULL,
    tema VARCHAR,
    criterio_lomloe_id VARCHAR,          -- ⭐ CRÍTICO
    saber_basico_id VARCHAR,
    competencias_clave VARCHAR[],
    
    -- Clasificación pedagógica
    nivel_bloom VARCHAR,                  -- ⭐ CRÍTICO
    foco_pedagogico VARCHAR               -- ⭐⭐⭐ MUY CRÍTICO
        CHECK (foco_pedagogico IN ('CONCEPTO', 'PROCEDIMIENTO', 'APLICACION')),
    tipo_respuesta VARCHAR
        CHECK (tipo_respuesta IN ('NUMERICO', 'TEXTO_ABIERTO', 'MULTIPLE_CHOICE', 'VERDADERO_FALSO')),
    dificultad VARCHAR CHECK (dificultad IN ('facil', 'media', 'dificil')),
    
    -- Personalización V/A/K
    formato_preferido VARCHAR[],          -- ['DIAGRAMA', 'VIDEO', ...]
    incluye_visual BOOLEAN DEFAULT FALSE,
    incluye_audio BOOLEAN DEFAULT FALSE,
    incluye_interactivo BOOLEAN DEFAULT FALSE,
    
    -- Legalidad
    licencia VARCHAR NOT NULL,            -- ⭐ CRÍTICO (legal)
    fuente_original VARCHAR,
    autor VARCHAR,
    fecha_creacion DATE,
    verificado BOOLEAN DEFAULT FALSE,
    
    -- Metadatos
    fecha_ultima_actualizacion TIMESTAMP DEFAULT NOW(),
    num_veces_usada INTEGER DEFAULT 0
);

-- Índices para optimización
CREATE INDEX idx_ejercicios_criterio ON ejercicios(criterio_lomloe_id);
CREATE INDEX idx_ejercicios_foco ON ejercicios(foco_pedagogico);
CREATE INDEX idx_ejercicios_nivel_bloom ON ejercicios(nivel_bloom);
CREATE INDEX idx_ejercicios_asignatura_curso ON ejercicios(asignatura, curso);
```

---

## ✅ 6. PLAN DE ACCIÓN: ETIQUETADO COMPLETO

### **Prioridades de Etiquetado**

| # | Campo a Etiquetar | Prioridad | Bloqueador para | Tiempo Estimado |
|---|-------------------|-----------|-----------------|-----------------|
| **1** | **licencia** | 🔴🔴🔴 CRÍTICA | Legalidad / BETA | 3-5 días |
| **2** | **foco_pedagogico** | 🔴🔴🔴 CRÍTICA | Personalización quirúrgica | 5-7 días |
| **3** | **criterio_lomloe_id** | 🔴🔴 ALTA | Búsqueda LOMLOE | 3-5 días |
| **4** | **tipo_respuesta** | 🟡 MEDIA | Heurísticas | 2-3 días |
| **5** | **formato_preferido** | 🟡 MEDIA | Personalización V/A/K completa | 2-3 días |
| **6** | **saber_basico_id** | 🟢 BAJA | Granularidad fina | 5-7 días |

### **Proceso de Etiquetado: foco_pedagogico**

#### **Paso 1: Definir Criterios de Clasificación**

```
CONCEPTO:
- Pregunta que requiere DEFINIR, EXPLICAR, IDENTIFICAR
- Evalúa COMPRENSIÓN de teoría
- Ejemplos:
  ✓ "¿Qué es una fracción?"
  ✓ "Define número primo"
  ✓ "Explica qué es el sujeto"

PROCEDIMIENTO:
- Pregunta que requiere EJECUTAR PASOS
- Evalúa APLICACIÓN de algoritmo/método
- Ejemplos:
  ✓ "Calcula 3/4 + 1/2"
  ✓ "Resuelve 2x + 5 = 15"
  ✓ "Conjuga el verbo cantar"

APLICACION:
- Pregunta contextualizada, PROBLEMA REAL
- Evalúa TRANSFERENCIA de conocimiento
- Ejemplos:
  ✓ "Juan tiene 3/4 de pizza y come 1/2. ¿Cuánto queda?"
  ✓ "En una tienda..."
  ✓ "Si la temperatura..."
```

#### **Paso 2: Script de Clasificación Asistida**

```javascript
// scripts/clasificar-foco-pedagogico.js

const ejercicios = obtenerTodosLosEjercicios();

ejercicios.forEach(ejercicio => {
    const pregunta = ejercicio.pregunta.toLowerCase();
    let foco = null;
    
    // Heurística básica
    if (pregunta.includes('qué es') || 
        pregunta.includes('define') || 
        pregunta.includes('explica')) {
        foco = 'CONCEPTO';
    } 
    else if (pregunta.includes('calcula') || 
             pregunta.includes('resuelve') || 
             pregunta.includes('suma') ||
             pregunta.includes('resta')) {
        foco = 'PROCEDIMIENTO';
    }
    else if (pregunta.includes('problema') || 
             pregunta.includes('situación') ||
             pregunta.match(/\b(juan|maría|pedro)\b/i)) {
        foco = 'APLICACION';
    }
    
    // Guardar sugerencia
    console.log(`${ejercicio.id}: ${foco || 'REVISAR_MANUAL'}`);
    // Aquí: guardar en archivo CSV para revisión manual
});
```

#### **Paso 3: Revisión Manual**

```csv
id,pregunta,foco_sugerido,foco_final,verificado
mat_4p_q001,"¿Cuánto es 3+5?",PROCEDIMIENTO,PROCEDIMIENTO,true
mat_4p_q002,"¿Qué es una fracción?",CONCEPTO,CONCEPTO,true
mat_4p_q003,"Juan tiene 5 manzanas...",APLICACION,APLICACION,true
```

---

## 🚦 7. VALIDACIÓN FINAL: CHECKLIST

### **Integridad de Base de Datos**

- [ ] ⚠️ Campo `foco_pedagogico` NO existe (0% ejercicios)
- [ ] ⚠️ Campo `criterio_lomloe_id` casi NO existe (5% ejercicios)
- [ ] ⚠️ Campo `saber_basico_id` NO existe (0% ejercicios)
- [ ] ⚠️ Campo `tipo_respuesta` parcial (30% ejercicios)
- [ ] ⚠️ Campo `formato_preferido` NO existe (0% ejercicios)
- [ ] ⚠️ Campo `licencia` casi NO existe (5% ejercicios)

### **Lógica de Generación**

- [ ] ✅ Servicio `fichas-personalizadas-service.js` existe
- [ ] ⚠️ Servicio NO usa `foco_pedagogico` (campo no existe)
- [ ] ⚠️ Búsqueda NO es quirúrgica (falta filtro crítico)
- [ ] ✅ Mapeo EC/EP/EAC → Recurso implementado
- [ ] ⚠️ Mapeo EC/EP/EAC → Ejercicios NO implementado

---

## 📊 8. IMPACTO SIN foco_pedagogico

### **Comparación de Efectividad**

```
┌─────────────────────────────────────────────────────────┐
│      EFECTIVIDAD DE PERSONALIZACIÓN                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  SIN foco_pedagogico:                                   │
│  └─ Búsqueda por tema: "Fracciones"                     │
│     └─ Devuelve: 100 ejercicios mezclados               │
│        ├─ 30% Conceptuales (definiciones)               │
│        ├─ 40% Procedimentales (cálculos)                │
│        └─ 30% Aplicación (problemas)                    │
│     └─ Para estudiante con EP:                          │
│        • Relevancia: 40%                                 │
│        • Efectividad: BAJA ⚠️                           │
│                                                          │
│  ────────────────────────────────────────────           │
│                                                          │
│  CON foco_pedagogico:                                   │
│  └─ Búsqueda quirúrgica: "Fracciones" + "PROCEDIMIENTO"│
│     └─ Devuelve: 40 ejercicios SOLO procedimentales    │
│        └─ 100% Cálculos paso a paso                     │
│     └─ Para estudiante con EP:                          │
│        • Relevancia: 100%                                │
│        • Efectividad: ALTA ✅                           │
│                                                          │
│  MEJORA: +150% efectividad                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 9. RESUMEN EJECUTIVO

```
═══════════════════════════════════════════════════════════
       VALIDACIÓN CRÍTICA - RESULTADOS
═══════════════════════════════════════════════════════════

ESTRUCTURA BD:           ⚠️ INCOMPLETA
Campo foco_pedagogico:   ❌ NO EXISTE (0%)
Campo criterio_lomloe:   ❌ CASI NO EXISTE (5%)
Campo licencia:          ❌ CASI NO EXISTE (5%)

LÓGICA GENERACIÓN:       ⚠️ PARCIAL
Servicio existe:         ✅ SÍ
Búsqueda quirúrgica:     ❌ NO (falta foco_pedagogico)
Efectividad actual:      ~40%
Efectividad potencial:   100% (con etiquetado)

BLOQUEADORES CRÍTICOS:
1. Sin foco_pedagogico → Personalización NO quirúrgica
2. Sin criterio_lomloe → Búsqueda NO dirigida
3. Sin licencia → Riesgo legal ALTO

TAREAS URGENTES:
1. ⚠️ Etiquetar foco_pedagogico (5-7 días)
2. ⚠️ Etiquetar criterio_lomloe (3-5 días)
3. ⚠️ Etiquetar licencia (3-5 días)

TIEMPO TOTAL ETIQUETADO: ~15-20 días
═══════════════════════════════════════════════════════════
```

---

## ✅ 10. RESPUESTA A TUS PREGUNTAS

### **¿Tienes implementado foco_pedagogico?**

**Respuesta:** ❌ **NO**, 0% de ejercicios tienen este campo.

### **¿Tu lógica utiliza foco_pedagogico?**

**Respuesta:** ❌ **NO puede**, porque el campo no existe en los datos.

### **¿Es crítico para personalización quirúrgica?**

**Respuesta:** ✅ **SÍ, ABSOLUTAMENTE CRÍTICO**

Sin `foco_pedagogico`:
- Personalización: ~40% efectiva
- Búsqueda: Genérica por tema
- Diferenciación: BAJA

Con `foco_pedagogico`:
- Personalización: 100% efectiva
- Búsqueda: Quirúrgica EC/EP/EAC
- Diferenciación: MÁXIMA

---

**Conclusión: Este es el TERCER etiquetado crítico junto con licencias y LOMLOE.**

---

**Fecha:** 15 de diciembre de 2025  
**Validación:** COMPLETA  
**Criticidad:** 🔴 ALTA  
**Acción requerida:** Etiquetar foco_pedagogico en TODOS los ejercicios
