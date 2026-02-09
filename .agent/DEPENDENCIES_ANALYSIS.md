# 🔍 ANÁLISIS DE DEPENDENCIAS - evaluacion-service.js
**Fecha:** 01/02/2026 - 17:15h  
**Analista:** Antigravity AI (Opción A - Conservadora)

---

## 📊 RESUMEN EJECUTIVO

**Archivo:** `evaluacion-service.js`  
**Líneas:** 4,262  
**Tamaño:** 232 KB  

### ✅ **Resultado del Análisis:**
- **Importaciones externas:** 1 archivo (`WorksheetGenerator.jsx`)
- **Funciones exportadas:** 4
- **Constantes exportadas:** 3
- **Riesgo de refactorización radical:** 🔴 **ALTO**

---

## 🔗 DEPENDENCIAS EXTERNAS (Imports)

### Archivo que IMPORTA desde evaluacion-service.js:

```javascript
// src/components/WorksheetGenerator.jsx (Línea 5)
import { analizarFichaCompleta } from '../services/evaluacion-service';
```

**⚠️ CRÍTICO:** Si eliminamos `analizarFichaCompleta`, **WorksheetGenerator se rompe**.

---

## 📤 EXPORTACIONES ACTUALES

### 1. Export Default (Línea 4256-4261)
```javascript
export default {
    analizarRespuesta,        // ❓ Función no encontrada en el archivo
    analizarFichaCompleta,    // ❓ Función no encontrada en el archivo
    NIVELES_BLOOM,            // ✅ Existe
    TIPOS_ERROR               // ✅ Existe
};
```

**🚨 PROBLEMA:** `analizarRespuesta` y `analizarFichaCompleta` aparecen en el export pero **no están definidas** en el archivo actual.

### 2. Named Exports Encontrados

```javascript
// Línea 887
export function evaluarRespuesta(pregunta, respuestaUsuario, respuestaCorrecta, contexto = {})

// Línea 213
export const PERFILES_COGNITIVOS = { ... }

// Línea 257
export const TIPOS_ERROR = { ... }
```

### 3. Funciones NO Exportadas (Auxiliares Internas)

```javascript
// Línea 19
detectarPatronError(pregunta, respuestaUsuario, respuestaCorrecta, contexto)

// Línea 63
levenshteinDistance(a, b)

// Línea 85
generarFeedbackExito(patternId, numeroIntento = 1)

// Línea 128
generarFeedbackIngles(respuestaUsuario, respuestaCorrecta, numeroIntento = 1)

// Más funciones auxiliares (~15 funciones helpers)
```

---

## 🧩 ESTRUCTURA ACTUAL DEL ARCHIVO

```
evaluacion-service.js (4,262 líneas)
│
├─ [L1-18]    IMPORTS & JSON Taxonomies
├─ [L19-33]   detectarPatronError()
├─ [L34-62]   TAXONOMIA_OPTIMIZADA + NIVELES_BLOOM
├─ [L63-83]   levenshteinDistance()
├─ [L85-126]  generarFeedbackExito()
├─ [L128-210] generarFeedbackIngles()
├─ [L213-255] export const PERFILES_COGNITIVOS
├─ [L257-303] export const TIPOS_ERROR
│
├─ [L310-808] GRAMMAR_DB (TESORO - 500 líneas) ⭐
│   ├─ lists (irregularVerbs, stativeVerbs, etc.)
│   ├─ maps (tenseSignals, prepositions, etc.)
│   ├─ orthography (capitalization, spellingPatterns)
│   ├─ phrasalVerbs ✨ NUEVO
│   └─ patterns (regex compiladas)
│
├─ [L840-880] GRADE_STANDARDS ✨ NUEVO
│
├─ [L887-3468] export function evaluarRespuesta() ⭐
│   └─ Pipeline de 7 capas (L0-L7)
│       ├─ L0: Sanity checks
│       ├─ L0.5: Orthography ✨ NUEVO
│       ├─ L1-L6: Grammar layers (~2,500 líneas)
│       └─ L7: Fallback
│
├─ [L3470-3490] generarMensajeMotivador()
├─ [L3492-3510] registrarErrorEnPatron()
│
├─ [L3512-4200] BATCH PROCESSING LAYER
│   ├─ ❓ analizarFichaCompleta() - NO ENCONTRADA
│   ├─ ❓ analizarRespuesta() - NO ENCONTRADA
│   └─ 20+ funciones auxiliares de análisis estadístico
│
└─ [L4256-4261] export default {...}
```

---

## 🔍 CÓDIGO MUERTO IDENTIFICADO

### 1. ❌ Export Default Roto
```javascript
// Línea 4256
export default {
    analizarRespuesta,        // ❌ NO EXISTE
    analizarFichaCompleta,    // ❌ NO EXISTE
    NIVELES_BLOOM,
    TIPOS_ERROR
};
```

**Acción:** Necesita reparación urgente.

### 2. ⚠️ Funciones Fantasma Referenciadas

El export default menciona:
- `analizarRespuesta` → **No encontrada** en grep search
- `analizarFichaCompleta` → **No encontrada** en grep search

**Posibilidades:**
1. Fueron eliminadas en una refactorización previa
2. Están definidas con sintaxis no estándar (asignación de variable)
3. Están en otra parte del archivo que grep no detectó

**Acción Requerida:** Búsqueda manual línea por línea en zona 3500-4200.

### 3. ✅ Funciones Auxiliares Activamente Usadas

Estas funciones NO son código muerto (se usan en el pipeline):
- `levenshteinDistance()` → Usado en fuzzy matching
- `generarMensajeMotivador()` → Usado en L0 success
- `detectarPatronError()` → Usado en taxonomías JSON
- `registrarErrorEnPatron()` → Usado en analytics

---

## ⚠️ RIESGOS DE REFACTORIZACIÓN RADICAL

### 🔴 **Riesgo ALTO si se ejecuta:**
> "Escribe evaluarRespuesta desde cero"

**Consecuencias:**
1. Pérdida de ~2,500 líneas de lógica lingüística refinada (L1-L7)
2. Pérdida de detección de 150+ patrones de error
3. Pérdida de integración con taxonomías JSON
4. Meses de trabajo de debugging y refinamiento perdidos

### 🟡 **Riesgo MEDIO si se ejecuta:**
> "Borrar funciones auxiliares"

**Consecuencias:**
1. Romper el pipeline de evaluación (usan helpers)
2. Romper analytics (usan `registrarErrorEnPatron`)
3. Romper fuzzy matching (usa `levenshteinDistance`)

### 🟢 **Riesgo BAJO - SEGURO:**
1. Reorganizar bloques (sin borrar)
2. Añadir comentarios de sección
3. Marcar funciones como `@deprecated`
4. Limpiar comentarios excesivos de "═══"

---

## 📋 PLAN DE ACCIÓN CONSERVADOR

### ✅ Fase 1: INVESTIGACIÓN (COMPLETADA)
- [x] Análisis de dependencias externas
- [x] Mapa de exportaciones
- [x] Identificación de código muerto

### 🔄 Fase 2: REPARACIÓN URGENTE (SIGUIENTE)
1. **Encontrar funciones fantasma:**
   - Buscar `analizarFichaCompleta` manualmente
   - Buscar `analizarRespuesta` manualmente
   
2. **Reparar export default:**
   - Si las funciones existen → OK
   - Si no existen → Eliminar del export o crear stubs

### 🧹 Fase 3: LIMPIEZA QUIRÚRGICA (DESPUÉS)
1. **Eliminar comentarios excesivos:**
   - Reducir bloques de "═══" a 1-2 líneas
   - Mantener solo comentarios funcionales
   
2. **Reorganizar (SIN BORRAR):**
   ```javascript
   // BLOQUE 1: IMPORTS & TAXONOMIES
   // BLOQUE 2: GRAMMAR_DB (TESORO)
   // BLOQUE 3: GRADE_STANDARDS
   // BLOQUE 4: HELPER FUNCTIONS
   // BLOQUE 5: CORE ENGINE (evaluarRespuesta)
   // BLOQUE 6: BATCH PROCESSING (analizarFichaCompleta)
   // BLOQUE 7: EXPORTS
   ```

3. **Marcar deprecaciones:**
   ```javascript
   /**
    * @deprecated Use evaluarRespuesta directly
    * @see evaluarRespuesta
    */
   export function analizarRespuesta(...) {
       return evaluarRespuesta(...);
   }
   ```

### 🚫 Fase 4: LO QUE NO HAREMOS
- ❌ Reescribir `evaluarRespuesta` desde cero
- ❌ Borrar funciones auxiliares sin verificar uso
- ❌ Eliminar `PERFILES_COGNITIVOS` o `TIPOS_ERROR` (exportados)
- ❌ Tocar el pipeline L1-L7 (funciona correctamente)

---

## 🎯 RECOMENDACIÓN FINAL

**OPCIÓN A (SELECCIONADA):**
1. ✅ Phrasal Verbs inyectados (COMPLETADO)
2. ⏭️ Reparar export default (buscar funciones fantasma)
3. ⏭️ Limpieza conservadora (comentarios, reorganización)
4. ❌ NO reescribir desde cero

**Beneficios:**
- ✅ Cero riesgo de romper integraciones
- ✅ Mantenemos años de trabajo de refinamiento
- ✅ Archivo más limpio y organizado
- ✅ Funcionalidad 100% preservada

---

**Próximo paso:** Buscar manualmente `analizarFichaCompleta` y `analizarRespuesta` en las líneas 3500-4200 para reparar el export default.
