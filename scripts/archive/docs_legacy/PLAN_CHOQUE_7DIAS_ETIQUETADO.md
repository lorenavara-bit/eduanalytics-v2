# 🚀 PLAN DE CHOQUE 7 DÍAS: SOLUCIÓN AL "DILEMA DEL 40%"

**Etiquetado Consolidado de 3 Campos Críticos Simultáneos**

---

**Fecha de inicio:** 16 de diciembre de 2025  
**Duración:** 7 días laborables  
**Objetivo:** Pasar de 40% a 100% efectividad en personalización  
**Equipo:** 1 desarrollador + 1-2 revisores pedagógicos

---

## 📋 ÍNDICE

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Los 3 Bloqueadores](#tres-bloqueadores)
3. [Estrategia Consolidada](#estrategia-consolidada)
4. [Plan Día a Día](#plan-dia-dia)
5. [Scripts de Automatización](#scripts-automatizacion)
6. [Proceso de Revisión Manual](#revision-manual)
7. [Validación Final](#validacion-final)
8. [Criterios de Éxito](#criterios-exito)

---

## 1. RESUMEN EJECUTIVO

### El Problema: "Dilema del 40%"

```
╔═══════════════════════════════════════════════════════════╗
║              SITUACIÓN ACTUAL                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  CÓDIGO:           ✅ 100% Implementado (10,500 líneas)  ║
║  FUNCIONALIDAD:    ✅ Lógica quirúrgica completa         ║
║                                                           ║
║  DATOS:            ❌ Campos críticos ausentes           ║
║  └─ foco_pedagogico:     0% etiquetado                   ║
║  └─ criterio_lomloe_id:  5% etiquetado                   ║
║  └─ licencia:            5% etiquetado                   ║
║                                                           ║
║  RESULTADO:                                               ║
║  └─ Búsqueda genérica → 40% efectividad                 ║
║  └─ Valor premium NO operativo                           ║
║  └─ Lanzamiento BETA bloqueado                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### La Solución: Plan de Choque 7 Días

**En lugar de etiquetar un campo a la vez (15-20 días), etiquetamos los 3 simultáneamente en 7 días.**

**Estrategia:**
- ✅ Script automatizado para 70% de ejercicios
- ✅ CSV único con los 3 campos para revisión
- ✅ Revisión manual del 30% restante
- ✅ Validación con fichas de prueba

**Resultado esperado:**
```
Día 7: 100% ejercicios con 3 campos → 100% efectividad
```

---

## 2. LOS 3 BLOQUEADORES

### 2.1 BLOQUEADOR #1: foco_pedagogico

| Aspecto | Detalle |
|---------|---------|
| **Estado** | ❌ NO existe (0% ejercicios) |
| **Criticidad** | 🔴🔴🔴 MÁXIMA |
| **Bloquea** | Personalización quirúrgica (diferenciación premium) |
| **Valores** | `CONCEPTO` \| `PROCEDIMIENTO` \| `APLICACION` |
| **Impacto** | Sin él: 40% efectividad. Con él: 100% |

**Mapping:**
```
EC → CONCEPTO
EP → PROCEDIMIENTO
EAC → APLICACION
```

---

### 2.2 BLOQUEADOR #2: criterio_lomloe_id

| Aspecto | Detalle |
|---------|---------|
| **Estado** | ❌ 5% etiquetado |
| **Criticidad** | 🔴🔴 ALTA |
| **Bloquea** | Validez curricular oficial |
| **Valores** | `MAT_PRI4_C1.1`, `LEN_ESO1_C2.3`, etc. |
| **Impacto** | Sin él: Búsqueda no dirigida a objetivos LOMLOE |

**Ejemplo:**
```
Tema: "Fracciones" 
→ criterio_lomloe_id: "MAT_PRI4_C1.1"
   (Resuelve problemas con operaciones básicas)
```

---

### 2.3 BLOQUEADOR #3: licencia

| Aspecto | Detalle |
|---------|---------|
| **Estado** | ❌ 5% etiquetado |
| **Criticidad** | 🔴🔴 ALTA (legal) |
| **Bloquea** | Lanzamiento BETA seguro |
| **Valores** | `PROPRIETARY` \| `CC-BY` \| `CC-BY-SA` \| `PD` |
| **Impacto** | Sin él: Riesgo legal alto, no se puede lanzar |

**Asignación:**
```
Si fuente_original = "Creación propia" → PROPRIETARY
Si fuente_original = "Khan Academy" → CC-BY-NC-SA
Si fuente_original = "Santillana" → PROPRIETARY (con permiso)
```

---

## 3. ESTRATEGIA CONSOLIDADA

### 3.1 Enfoque Híbrido: Automatización + Revisión

```
┌─────────────────────────────────────────────────────────┐
│         PROCESO DE ETIQUETADO CONSOLIDADO              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FASE 1: AUTOMATIZACIÓN (Días 1-2)                     │
│  └─ Script clasifica automáticamente ~70%              │
│     ├─ foco_pedagogico: Por palabras clave             │
│     ├─ criterio_lomloe: Por asignatura + tema          │
│     └─ licencia: Por fuente_original                   │
│                                                          │
│  FASE 2: REVISIÓN MANUAL (Días 3-5)                    │
│  └─ CSV único con 3 campos para validar                │
│     ├─ Revisar confianza < 0.75                        │
│     ├─ Corregir clasificaciones erróneas               │
│     └─ Completar campos faltantes                      │
│                                                          │
│  FASE 3: INTEGRACIÓN (Días 6-7)                        │
│  └─ Importar CSV → Base de datos                       │
│  └─ Validar con fichas de prueba                       │
│  └─ Verificar 100% efectividad                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

### 3.2 CSV de QA (Calidad Asegurada)

**Estructura del CSV:**

```csv
id,pregunta,asignatura,curso,tema,foco_auto,criterio_auto,licencia_auto,confianza,foco_final,criterio_final,licencia_final,verificado,notas
mat_4p_q001,"¿Cuánto es 3+5?",Matemáticas,4º Primaria,Operaciones,PROCEDIMIENTO,MAT_PRI4_C1.1,PROPRIETARY,0.85,PROCEDIMIENTO,MAT_PRI4_C1.1,PROPRIETARY,true,OK
mat_4p_q002,"¿Qué es fracción?",Matemáticas,4º Primaria,Fracciones,CONCEPTO,MAT_PRI4_C1.2,PROPRIETARY,0.90,CONCEPTO,MAT_PRI4_C1.2,PROPRIETARY,true,OK
mat_4p_q003,"Juan tiene 5...",Matemáticas,4º Primaria,Problemas,APLICACION,MAT_PRI4_C2.1,PROPRIETARY,0.80,APLICACION,MAT_PRI4_C2.1,PROPRIETARY,true,OK
```

**Columnas clave:**
- `foco_auto`, `criterio_auto`, `licencia_auto` → Clasificación automática
- `confianza` → Nivel de confianza (0.00-1.00)
- `foco_final`, `criterio_final`, `licencia_final` → Clasificación validada
- `verificado` → Marca de QA humano

---

## 4. PLAN DÍA A DÍA

### **DÍA 1: Preparación y Automatización** (Desarrollador)

#### **Mañana (4h):**

```
□ 09:00-11:00 | Desarrollar script consolidado de clasificación
  └─ Heurísticas para foco_pedagogico
  └─ Mapeo tema → criterio_lomloe
  └─ Asignación licencia por fuente

□ 11:00-13:00 | Testing del script
  └─ Probar con 100 ejercicios muestra
  └─ Validar precisión esperada ~70%
  └─ Ajustar heurísticas si necesario
```

**Entregable:** Script `clasificador-consolidado.js` funcional

#### **Tarde (4h):**

```
□ 14:00-16:00 | Ejecutar script sobre TODOS los ejercicios
  └─ Procesar ~1,000-2,000 ejercicios
  └─ Clasificar automáticamente los 3 campos
  └─ Calcular confianza por ejercicio

□ 16:00-18:00 | Generar CSV de QA
  └─ Exportar con clasificación automática
  └─ Ordenar por confianza (bajos primero)
  └─ Marcar ejercicios para revisión manual
```

**Entregable:** `ejercicios_qa_consolidado.csv` generado

---

### **DÍA 2: Análisis y Preparación de Revisión** (Desarrollador + Revisor)

#### **Mañana (4h):**

```
□ 09:00-11:00 | Análisis estadístico del CSV
  └─ % de ejercicios por confianza
  └─ Distribución foco_pedagogico
  └─ Distribución criterios LOMLOE
  └─ Distribución licencias

□ 11:00-13:00 | Preparar guía de revisión
  └─ Ejemplos de cada foco_pedagogico
  └─ Tabla de criterios LOMLOE por tema
  └─ Reglas de asignación de licencias
```

**Entregable:** 
- Informe estadístico
- Guía de revisión para equipo pedagógico

#### **Tarde (4h):**

```
□ 14:00-16:00 | Revisión de casos extremos
  └─ Revisar ejercicios con confianza < 0.50
  └─ Corregir clasificaciones obviamente incorrectas
  └─ Preparar dudas para equipo pedagógico

□ 16:00-18:00 | Capacitación del equipo revisor
  └─ Explicar estructura del CSV
  └─ Demostrar proceso de revisión
  └─ Asignar lotes de trabajo
```

**Entregable:** Equipo capacitado y listo para revisar

---

### **DÍA 3: Revisión Manual - Primera Ronda** (Equipo Revisor)

#### **Todo el día (8h):**

```
┌──────────────────────────────────────────────────────┐
│  OBJETIVO: Revisar ~30% ejercicios (300-600)       │
│  PRIORIDAD: Confianza < 0.75                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  □ 09:00-13:00 | Revisión intensiva (4h)            │
│    └─ Lote 1: Confianza 0.00-0.50 (~100 ejercicios)│
│    └─ Lote 2: Confianza 0.50-0.75 (~200 ejercicios)│
│                                                      │
│  □ 14:00-18:00 | Revisión continua (4h)             │
│    └─ Lote 3: Confianza 0.75-0.85 (~300 ejercicios)│
│    └─ Validar casos dudosos con desarrollador      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Proceso de revisión por ejercicio:**

```
Para cada fila del CSV:

1. Leer pregunta

2. Validar foco_pedagogico:
   ¿Es CONCEPTO/PROCEDIMIENTO/APLICACION?
   Si no → Corregir en foco_final

3. Validar criterio_lomloe:
   ¿El criterio corresponde al tema?
   Si no → Buscar criterio correcto y asignar

4. Validar licencia:
   ¿La fuente es correcta?
   ¿La licencia es apropiada?
   Si dudoso → Marcar en notas

5. Marcar verificado = true

6. Siguiente ejercicio
```

**Métricas esperadas:**
- Ejercicios revisados: ~300
- Tiempo por ejercicio: ~1.5 min
- Correcciones necesarias: ~20-30%

---

### **DÍA 4: Revisión Manual - Segunda Ronda** (Equipo Revisor)

#### **Todo el día (8h):**

```
□ 09:00-13:00 | Revisión de ejercicios medio-alta confianza
  └─ Lote 4: Confianza 0.85-0.90 (validación rápida)
  └─ Enfoque: Detectar errores sutiles

□ 14:00-18:00 | Revisión aleatoria de alta confianza
  └─ Sample aleatorio de ejercicios con confianza > 0.90
  └─ Validar que clasificación automática es precisa
  └─ Objetivo: QA de calidad del script
```

**Métricas esperadas:**
- Ejercicios revisados: ~400
- Total acumulado: ~700
- Cobertura: ~35% del total

---

### **DÍA 5: Finalización de Revisión** (Equipo Revisor)

#### **Mañana (4h):**

```
□ 09:00-13:00 | Completar revisión de ejercicios pendientes
  └─ Revisión de todos los ejercicios con verificado=false
  └─ Priorizar ejercicios de asignaturas core (Matemáticas, Lengua)
  └─ Resolver casos dudosos pendientes
```

#### **Tarde (4h):**

```
□ 14:00-16:00 | Segunda pasada QA
  └─ Revisar ejercicios marcados con notas
  └─ Validar consistencia de criterios LOMLOE
  └─ Asegurar 0 ejercicios sin licencia

□ 16:00-18:00 | Preparar CSV final
  └─ Verificar que todos tienen verificado=true
  └─ Exportar versión final del CSV
  └─ Generar informe de revisión
```

**Entregable:** CSV final con 100% revisado y validado

**Métricas finales esperadas:**
- Total ejercicios: ~2,000
- Revisados manualmente: ~30% (600)
- Validados automáticamente: ~70% (1,400)
- Cobertura de verificación: 100%

---

### **DÍA 6: Integración a Base de Datos** (Desarrollador)

#### **Mañana (4h):**

```
□ 09:00-11:00 | Script de importación
  └─ Desarrollar script import-csv-to-db.js
  └─ Validaciones antes de importar:
     • Todos los ejercicios tienen foco_final
     • Todos tienen criterio_final
     • Todos tienen licencia_final
     • verificado = true

□ 11:00-13:00 | Testing de importación
  └─ Importar 100 ejercicios de prueba
  └─ Verificar estructura en BD
  └─ Validar datos correctos
```

#### **Tarde (4h):**

```
□ 14:00-15:00 | Importación completa
  └─ Ejecutar script sobre CSV final
  └─ Importar TODOS los ejercicios
  └─ Actualizar campos foco_pedagogico, criterio_lomloe_id, licencia

□ 15:00-17:00 | Verificación post-importación
  └─ Query BD: SELECT COUNT(*) WHERE foco_pedagogico IS NULL
     Resultado esperado: 0
  └─ Query BD: SELECT COUNT(*) WHERE criterio_lomloe_id IS NULL
     Resultado esperado: 0
  └─ Query BD: SELECT COUNT(*) WHERE licencia IS NULL
     Resultado esperado: 0

□ 17:00-18:00 | Estadísticas y métricas
  └─ Distribución de foco_pedagogico
  └─ Distribución de criterios LOMLOE
  └─ Distribución de licencias
```

**Entregable:** Base de datos 100% actualizada

**Queries de validación:**

```sql
-- Verificar 100% tienen foco_pedagogico
SELECT COUNT(*) AS total, 
       COUNT(foco_pedagogico) AS con_foco,
       (COUNT(foco_pedagogico) * 100.0 / COUNT(*)) AS porcentaje
FROM ejercicios;
-- Esperado: porcentaje = 100%

-- Distribución de foco_pedagogico
SELECT foco_pedagogico, COUNT(*) AS cantidad,
       (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM ejercicios)) AS porcentaje
FROM ejercicios
GROUP BY foco_pedagogico;
-- Esperado:
-- CONCEPTO: 25-30%
-- PROCEDIMIENTO: 40-50%
-- APLICACION: 20-30%

-- Verificar licencias
SELECT licencia, COUNT(*) AS cantidad
FROM ejercicios
GROUP BY licencia;
-- Esperado: Solo valores válidos (PROPRIETARY, CC-BY, etc.)
```

---

### **DÍA 7: Validación y Testing Final** (Desarrollador + Revisor)

#### **Mañana (4h):**

```
□ 09:00-11:00 | Actualizar servicio de generación
  └─ Modificar fichas-personalizadas-service.js
  └─ Añadir filtros por foco_pedagogico
  └─ Añadir filtros por criterio_lomloe_id
  └─ Testing unitario del servicio

□ 11:00-13:00 | Generar fichas de prueba (EC)
  └─ Crear perfil de estudiante con patrón EC dominante
  └─ Generar ficha de refuerzo
  └─ VALIDAR: 100% ejercicios son foco="CONCEPTO"
  └─ VALIDAR: Criterio LOMLOE correcto
```

#### **Tarde (4h):**

```
□ 14:00-15:00 | Generar fichas de prueba (EP)
  └─ Crear perfil con patrón EP dominante
  └─ Generar ficha de refuerzo
  └─ VALIDAR: 100% ejercicios son foco="PROCEDIMIENTO"

□ 15:00-16:00 | Generar fichas de prueba (EAC)
  └─ Crear perfil con patrón EAC dominante
  └─ Generar ficha de refuerzo
  └─ VALIDAR: 100% ejercicios son foco="APLICACION"

□ 16:00-17:00 | Testing de búsqueda quirúrgica
  └─ Búsqueda: tema="Fracciones" + foco="PROCEDIMIENTO"
     Resultado: Solo ejercicios procedimentales
  └─ Búsqueda: criterio="MAT_PRI4_C1.1" + foco="CONCEPTO"
     Resultado: Solo conceptuales de ese criterio

□ 17:00-18:00 | Informe final y cierre
  └─ Documentar proceso completado
  └─ Métricas finales de efectividad
  └─ Celebrar 🎉
```

**Entregable:** Sistema 100% operativo con efectividad máxima

---

## 5. SCRIPTS DE AUTOMATIZACIÓN

### 5.1 Script Principal: clasificador-consolidado.js

```javascript
// scripts/clasificador-consolidado.js

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════
// FUNCIONES DE CLASIFICACIÓN
// ═══════════════════════════════════════════════════════════

/**
 * Clasifica foco_pedagogico basado en heurísticas
 */
function clasificarFocoPedagogico(ejercicio) {
    const pregunta = ejercicio.pregunta.toLowerCase();
    
    // HEURÍSTICA 1: CONCEPTO (palabras clave)
    const palabrasConcepto = [
        'qué es', 'define', 'explica', 'cuál es la definición',
        'identifica', 'señala', 'indica qué', 'a qué se refiere'
    ];
    
    for (const palabra of palabrasConcepto) {
        if (pregunta.includes(palabra)) {
            return { foco: 'CONCEPTO', confianza: 0.90 };
        }
    }
    
    // HEURÍSTICA 2: PROCEDIMIENTO (palabras clave)
    const palabrasProcedimiento = [
        'calcula', 'resuelve', 'suma', 'resta', 'multiplica', 'divide',
        'conjuga', 'aplica', 'ejecuta', 'realiza', 'haz', 'completa'
    ];
    
    for (const palabra of palabrasProcedimiento) {
        if (pregunta.includes(palabra)) {
            return { foco: 'PROCEDIMIENTO', confianza: 0.85 };
        }
    }
    
    // HEURÍSTICA 3: APLICACION (contexto/problema)
    const palabrasAplicacion = [
        'problema', 'situación', 'historia', 'caso',
        'juan', 'maría', 'pedro', 'ana',  // Nombres comunes
        'en una tienda', 'en un', 'si tenemos'
    ];
    
    for (const palabra of palabrasAplicacion) {
        if (pregunta.includes(palabra)) {
            return { foco: 'APLICACION', confianza: 0.80 };
        }
    }
    
    // HEURÍSTICA 4: Por tipo de respuesta
    if (ejercicio.tipo_respuesta === 'NUMERICO') {
        return { foco: 'PROCEDIMIENTO', confianza: 0.70 };
    }
    
    // HEURÍSTICA 5: Por tipo de ejercicio
    if (ejercicio.tipo === 'definition') {
        return { foco: 'CONCEPTO', confianza: 0.75 };
    }
    
    // NO SE PUEDE CLASIFICAR CON CONFIANZA
    return { foco: null, confianza: 0.00 };
}

/**
 * Mapea tema → criterio LOMLOE
 */
function mapearCriterioLOMLOE(ejercicio) {
    const { asignatura, curso, tema } = ejercicio;
    
    // TABLA DE MAPEO (simplificada, expandir según necesidad)
    const mapeo = {
        'Matemáticas': {
            '4º Primaria': {
                'Operaciones básicas': 'MAT_PRI4_C1.1',
                'Fracciones': 'MAT_PRI4_C1.2',
                'Decimales': ' MAT_PRI4_C1.3',
                'Geometría': 'MAT_PRI4_C2.1',
                'Medidas': 'MAT_PRI4_C2.2',
                'Problemas': 'MAT_PRI4_C3.1'
            },
            '5º Primaria': {
                'Operaciones': 'MAT_PRI5_C1.1',
                // ...
            }
        },
        'Lengua Castellana': {
            '4º Primaria': {
                'Gramática': 'LEN_PRI4_C1.1',
                'Ortografía': 'LEN_PRI4_C1.2',
                'Comprensión lectora': 'LEN_PRI4_C2.1',
                'Expresión escrita': 'LEN_PRI4_C2.2'
            }
        }
        // ... más asignaturas
    };
    
    try {
        const criterio = mapeo[asignatura]?.[curso]?.[tema];
        
        if (criterio) {
            return { criterio, confianza: 0.85 };
        }
        
        // Fallback: Buscar tema similar
        const cursoMap = mapeo[asignatura]?.[curso] || {};
        for (const [temaKey, criterioValue] of Object.entries(cursoMap)) {
            if (tema.toLowerCase().includes(temaKey.toLowerCase()) ||
                temaKey.toLowerCase().includes(tema.toLowerCase())) {
                return { criterio: criterioValue, confianza: 0.70 };
            }
        }
        
        return { criterio: null, confianza: 0.00 };
    } catch (error) {
        return { criterio: null, confianza: 0.00 };
    }
}

/**
 * Asigna licencia basado en fuente_original
 */
function asignarLicencia(ejercicio) {
    const fuente = (ejercicio.fuente_original || '').toLowerCase();
    
    // Reglas de asignación
    if (!fuente || fuente.includes('creación propia') || fuente.includes('eduanalytics')) {
        return { licencia: 'PROPRIETARY', confianza: 0.95 };
    }
    
    if (fuente.includes('khan') || fuente.includes('khan academy')) {
        return { licencia: 'CC-BY-NC-SA', confianza: 0.90 };
    }
    
    if (fuente.includes('santillana') || fuente.includes('sm') || fuente.includes('anaya')) {
        return { licencia: 'PROPRIETARY', confianza: 0.85 };
    }
    
    if (fuente.includes('público') || fuente.includes('dominio público')) {
        return { licencia: 'PD', confianza: 0.90 };
    }
    
    if (fuente.includes('creative commons') || fuente.includes('cc-by')) {
        return { licencia: 'CC-BY', confianza: 0.85 };
    }
    
    // Por defecto, asumir propietary (requiere revisión manual)
    return { licencia: 'PROPRIETARY', confianza: 0.50 };
}

/**
 * Clasificación consolidada de un ejercicio
 */
function clasificarEjercicio(ejercicio) {
    const resultadoFoco = clasificarFocoPedagogico(ejercicio);
    const resultadoCriterio = mapearCriterioLOMLOE(ejercicio);
    const resultadoLicencia = asignarLicencia(ejercicio);
    
    // Confianza general (promedio ponderado)
    const confianzaGeneral = (
        resultadoFoco.confianza * 0.4 +
        resultadoCriterio.confianza * 0.4 +
        resultadoLicencia.confianza * 0.2
    );
    
    return {
        foco_auto: resultadoFoco.foco,
        criterio_auto: resultadoCriterio.criterio,
        licencia_auto: resultadoLicencia.licencia,
        confianza: parseFloat(confianzaGeneral.toFixed(2)),
        confianza_foco: resultadoFoco.confianza,
        confianza_criterio: resultadoCriterio.confianza,
        confianza_licencia: resultadoLicencia.confianza
    };
}

// ═══════════════════════════════════════════════════════════
// PROCESAMIENTO PRINCIPAL
// ═══════════════════════════════════════════════════════════

function procesarTodosLosEjercicios() {
    console.log('🚀 Iniciando clasificación consolidada...\n');
    
    // 1. Obtener todos los ejercicios
    const ejercicios = obtenerTodosLosEjercicios();
    console.log(`📊 Total ejercicios a procesar: ${ejercicios.length}\n`);
    
    // 2. Clasificar cada ejercicio
    const resultados = ejercicios.map((ejercicio, index) => {
        if (index % 100 === 0) {
            console.log(`Procesando ejercicio ${index + 1}/${ejercicios.length}...`);
        }
        
        const clasificacion = clasificarEjercicio(ejercicio);
        
        return {
            // Datos originales
            id: ejercicio.id,
            pregunta: ejercicio.pregunta,
            asignatura: ejercicio.asignatura,
            curso: ejercicio.curso,
            tema: ejercicio.tema,
            
            // Clasificación automática
            foco_auto: clasificacion.foco_auto,
            criterio_auto: clasificacion.criterio_auto,
            licencia_auto: clasificacion.licencia_auto,
            confianza: clasificacion.confianza,
            
            // Para revisión manual
            foco_final: clasificacion.foco_auto,      // Inicialmente igual
            criterio_final: clasificacion.criterio_auto,
            licencia_final: clasificacion.licencia_auto,
            verificado: false,                         // Requiere verificación
            notas: ''
        };
    });
    
    // 3. Ordenar por confianza (bajos primero para revisión)
    resultados.sort((a, b) => a.confianza - b.confianza);
    
    // 4. Estadísticas
    console.log('\n📊 ESTADÍSTICAS DE CLASIFICACIÓN:\n');
    
    const stats = {
        total: resultados.length,
        alta_confianza: resultados.filter(r => r.confianza >= 0.85).length,
        media_confianza: resultados.filter(r => r.confianza >= 0.70 && r.confianza < 0.85).length,
        baja_confianza: resultados.filter(r => r.confianza < 0.70).length,
        
        foco_concepto: resultados.filter(r => r.foco_auto === 'CONCEPTO').length,
        foco_procedimiento: resultados.filter(r => r.foco_auto === 'PROCEDIMIENTO').length,
        foco_aplicacion: resultados.filter(r => r.foco_auto === 'APLICACION').length,
        foco_null: resultados.filter(r => !r.foco_auto).length
    };
    
    console.log(`Total ejercicios: ${stats.total}`);
    console.log(`\nPor confianza:`);
    console.log(`  Alta (≥0.85):   ${stats.alta_confianza} (${(stats.alta_confianza/stats.total*100).toFixed(1)}%)`);
    console.log(`  Media (0.70-0.85): ${stats.media_confianza} (${(stats.media_confianza/stats.total*100).toFixed(1)}%)`);
    console.log(`  Baja (<0.70):   ${stats.baja_confianza} (${(stats.baja_confianza/stats.total*100).toFixed(1)}%)`);
    
    console.log(`\nPor foco_pedagogico:`);
    console.log(`  CONCEPTO:       ${stats.foco_concepto} (${(stats.foco_concepto/stats.total*100).toFixed(1)}%)`);
    console.log(`  PROCEDIMIENTO:  ${stats.foco_procedimiento} (${(stats.foco_procedimiento/stats.total*100).toFixed(1)}%)`);
    console.log(`  APLICACION:     ${stats.foco_aplicacion} (${(stats.foco_aplicacion/stats.total*100).toFixed(1)}%)`);
    console.log(`  Sin clasificar: ${stats.foco_null} (${(stats.foco_null/stats.total*100).toFixed(1)}%)`);
    
    // 5. Exportar a CSV
    exportarCSV(resultados, 'ejercicios_qa_consolidado.csv');
    
    console.log('\n✅ Proceso completado!');
    console.log(`📄 CSV generado: ejercicios_qa_consolidado.csv`);
    console.log(`\n🔍 Revisar manualmente ejercicios con confianza < 0.75\n`);
    
    return resultados;
}

// ═══════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════

function obtenerTodosLosEjercicios() {
    // Leer todos los archivos de ejercicios en src/services/khan/
    const ejercicios = [];
    
    const archivos = fs.readdirSync(path.join(__dirname, '../src/services/khan'));
    
    archivos.forEach(archivo => {
        if (!archivo.endsWith('.js')) return;
        
        try {
            const modulo = require(path.join(__dirname, '../src/services/khan', archivo));
            const ejerciciosArchivo = modulo.preguntas || modulo.ejercicios || [];
            ejercicios.push(...ejerciciosArchivo);
        } catch (error) {
            console.warn(`⚠️  No se pudo leer ${archivo}:`, error.message);
        }
    });
    
    return ejercicios;
}

function exportarCSV(data, filename) {
    const csvHeader = [
        'id', 'pregunta', 'asignatura', 'curso', 'tema',
        'foco_auto', 'criterio_auto', 'licencia_auto', 'confianza',
        'foco_final', 'criterio_final', 'licencia_final',
        'verificado', 'notas'
    ].join(',');
    
    const csvRows = data.map(row => {
        return [
            row.id,
            `"${row.pregunta.replace(/"/g, '""')}"`,  // Escapar comillas
            row.asignatura,
            row.curso,
            row.tema,
            row.foco_auto || '',
            row.criterio_auto || '',
            row.licencia_auto || '',
            row.confianza,
            row.foco_final || '',
            row.criterio_final || '',
            row.licencia_final || '',
            row.verificado,
            `"${row.notas}"`
        ].join(',');
    });
    
    const csv = [csvHeader, ...csvRows].join('\n');
    
    fs.writeFileSync(filename, csv, 'utf8');
}

// Ejecutar
procesarTodosLosEjercicios();
```

**Uso:**
```bash
node scripts/clasificador-consolidado.js
```

---

### 5.2 Script de Importación: import-csv-to-db.js

```javascript
// scripts/import-csv-to-db.js

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parser');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY  // Service key para bypass RLS
);

async function importarCSV(filename) {
    console.log(`🚀 Importando ${filename} a Supabase...\n`);
    
    const ejercicios = [];
    
    // Leer CSV
    await new Promise((resolve, reject) => {
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (row) => {
                if (row.verificado === 'true') {  // Solo importar verificados
                    ejercicios.push({
                        id: row.id,
                        foco_pedagogico: row.foco_final,
                        criterio_lomloe_id: row.criterio_final,
                        licencia: row.licencia_final
                    });
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });
    
    console.log(`📊 Ejercicios a actualizar: ${ejercicios.length}\n`);
    
    // Actualizar en lotes de 100
    const BATCH_SIZE = 100;
    let procesados = 0;
    
    for (let i = 0; i < ejercicios.length; i += BATCH_SIZE) {
        const batch = ejercicios.slice(i, i + BATCH_SIZE);
        
        // Actualizar cada ejercicio
        for (const ej of batch) {
            const { error } = await supabase
                .from('ejercicios')
                .update({
                    foco_pedagogico: ej.foco_pedagogico,
                    criterio_lomloe_id: ej.criterio_lomloe_id,
                    licencia: ej.licencia
                })
                .eq('id', ej.id);
            
            if (error) {
                console.error(`❌ Error actualizando ${ej.id}:`, error.message);
            } else {
                procesados++;
            }
        }
        
        console.log(`Procesados ${Math.min(i + BATCH_SIZE, ejercicios.length)}/${ejercicios.length}...`);
    }
    
    console.log(`\n✅ Importación completada!`);
    console.log(`📊 Ejercicios actualizados: ${procesados}/${ejercicios.length}\n`);
    
    // Verificar 100%
    await verificarIntegridad();
}

async function verificarIntegridad() {
    console.log('🔍 Verificando integridad de datos...\n');
    
    const { data, error } = await supabase
        .from('ejercicios')
        .select('id, foco_pedagogico, criterio_lomloe_id, licencia');
    
    if (error) {
        console.error('❌ Error al verificar:', error.message);
        return;
    }
    
    const total = data.length;
    const conFoco = data.filter(e => e.foco_pedagogico).length;
    const conCriterio = data.filter(e => e.criterio_lomloe_id).length;
    const conLicencia = data.filter(e => e.licencia).length;
    
    console.log(`Total ejercicios: ${total}`);
    console.log(`Con foco_pedagogico: ${conFoco} (${(conFoco/total*100).toFixed(1)}%)`);
    console.log(`Con criterio_lomloe: ${conCriterio} (${(conCriterio/total*100).toFixed(1)}%)`);
    console.log(`Con licencia: ${conLicencia} (${(conLicencia/total*100).toFixed(1)}%)`);
    
    if (conFoco === total && conCriterio === total && conLicencia === total) {
        console.log('\n✅ ¡100% COMPLETADO!\n');
    } else {
        console.log('\n⚠️  Aún hay ejercicios sin completar\n');
    }
}

// Ejecutar
const filename = process.argv[2] || 'ejercicios_qa_consolidado.csv';
importarCSV(filename);
```

**Uso:**
```bash
node scripts/import-csv-to-db.js ejercicios_qa_consolidado.csv
```

---

## 6. PROCESO DE REVISIÓN MANUAL

### 6.1 Guía de Revisión para Equipo Pedagógico

```
╔═══════════════════════════════════════════════════════════╗
║         GUÍA DE REVISIÓN MANUAL (Equipo Pedagógico)     ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  OBJETIVO: Validar clasificación automática de 3 campos  ║
║                                                           ║
║  PROCESO POR EJERCICIO:                                   ║
║  1. Leer pregunta completa                                ║
║  2. Validar foco_pedagogico                               ║
║  3. Validar criterio_lomloe_id                            ║
║  4. Validar licencia                                      ║
║  5. Marcar verificado = true                              ║
║                                                           ║
║  PRIORIDAD: Ejercicios con confianza < 0.75              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

#### **Validación de foco_pedagogico:**

**Pregunta 1:** ¿La pregunta pide DEFINIR/EXPLICAR un concepto?
→ SÍ: foco = `CONCEPTO`

**Pregunta 2:** ¿La pregunta pide EJECUTAR pasos/calcular?
→ SÍ: foco = `PROCEDIMIENTO`

**Pregunta 3:** ¿La pregunta es un PROBLEMA CONTEXTUALIZADO?
→ SÍ: foco = `APLICACION`

**Ejemplos:**

| Pregunta | foco_pedagogico |
|----------|-----------------|
| "¿Qué es una fracción?" | CONCEPTO |
| "Define número primo" | CONCEPTO |
| "Calcula 3/4 + 1/2" | PROCEDIMIENTO |
| "Resuelve 2x + 5 = 15" | PROCEDIMIENTO |
| "Juan tiene 3/4 de pizza y come 1/2. ¿Cuánto queda?" | APLICACION |

---

#### **Validación de criterio_lomloe_id:**

**Tabla de Referencia:**

| Asignatura | Curso | Tema | Criterio |
|------------|-------|------|----------|
| Matemáticas | 4º Primaria | Operaciones básicas | MAT_PRI4_C1.1 |
| Matemáticas | 4º Primaria | Fracciones | MAT_PRI4_C1.2 |
| Matemáticas | 4º Primaria | Geometría | MAT_PRI4_C2.1 |
| Lengua | 4º Primaria | Gramática | LEN_PRI4_C1.1 |
| Lengua | 4º Primaria | Ortografía | LEN_PRI4_C1.2 |

(Expandir tabla completa en documento separado)

**Proceso:**
1. Identificar asignatura + curso + tema
2. Buscar en tabla de referencia
3. Asignar criterio correspondiente
4. Si no está en tabla → Marcar en notas para revisión

---

#### **Validación de licencia:**

**Reglas de asignación:**

| Fuente original | Licencia |
|-----------------|----------|
| "Creación propia" / "EduAnalytics" | PROPRIETARY |
| "Khan Academy" | CC-BY-NC-SA |
| "Santillana" / "SM" / "Anaya" | PROPRIETARY |
| "Dominio público" | PD |
| Sin fuente / Dudoso | PROPRIETARY + nota |

**Si hay duda:** Marcar en columna "notas" para revisión adicional

---

### 6.2 Casos Especiales y Resolución de Dudas

#### **Caso 1: Pregunta mixta (concepto + procedimiento)**

**Ejemplo:**
```
"Define fracción y calcula 3/4 + 1/2"
```

**Solución:** Dividir en 2 ejercicios:
- Ejercicio 1: "Define fracción" → CONCEPTO
- Ejercicio 2: "Calcula 3/4 + 1/2" → PROCEDIMIENTO

**Acción:** Marcar en notas para desarrollador

---

#### **Caso 2: Criterio LOMLOE no encontrado**

**Ejemplo:**
```
Asignatura: Matemáticas
Curso: 5º Primaria
Tema: "Probabilidad"
→ No está en tabla de referencia
```

**Solución:**
1. Buscar tema similar (ej: "Estadística")
2. Si no hay similar → Dejar en blanco
3. Marcar en notas: "REVISAR - criterio no encontrado"

---

#### **Caso 3: Licencia dudosa**

**Ejemplo:**
```
fuente_original: "Adaptado de ejercicio de internet"
```

**Solución:**
1. Asignar: licencia = PROPRIETARY
2. Marcar en notas: "VERIFICAR - fuente dudosa"
3. Requiere investigación adicional

---

## 7. VALIDACIÓN FINAL

### 7.1 Testing de Búsqueda Quirúrgica

**Test 1: Búsqueda por foco_pedagogico**

```javascript
// Buscar solo ejercicios procedimentales de fracciones
const ejercicios = await supabase
    .from('ejercicios')
    .select('*')
    .eq('tema', 'Fracciones')
    .eq('foco_pedagogico', 'PROCEDIMIENTO');

// VALIDAR:
// - Todos los ejercicios devueltos son de cálculo/pasos
// - 0 ejercicios conceptuales o de aplicación
```

**Test 2: Búsqueda por criterio LOMLOE**

```javascript
// Buscar ejercicios de criterio específico
const ejercicios = await supabase
    .from('ejercicios')
    .select('*')
    .eq('criterio_lomloe_id', 'MAT_PRI4_C1.1');

// VALIDAR:
// - Todos corresponden a "Resuelve problemas con operaciones básicas"
// - Tema coherente con criterio
```

**Test 3: Búsqueda combinada (quirúrgica)**

```javascript
// Búsqueda máxima precisión
const ejercicios = await supabase
    .from('ejercicios')
    .select('*')
    .eq('criterio_lomloe_id', 'MAT_PRI4_C1.2')  // Fracciones
    .eq('foco_pedagogico', 'PROCEDIMIENTO');     // Solo cálculo

// VALIDAR:
// - 100% relevantes para estudiante con EP en fracciones
// - Máxima efectividad de refuerzo
```

---

### 7.2 Generación de Fichas de Prueba

**Prueba 1: Estudiante con patrón EC**

```javascript
const perfil = {
    estudiante_id: 'test_001',
    nombre: 'Estudiante Test EC',
    estiloAprendizaje: 'VISUAL'
};

const historial = [
    { patron: 'EC', criterio: 'MAT_PRI4_C1.2' },  // Error conceptual en fracciones
    { patron: 'EC', criterio: 'MAT_PRI4_C1.2' },
    { patron: 'EC', criterio: 'MAT_PRI4_C1.2' }
];

const ficha = await generarFichaRefuerzo(perfil, historial);

// VALIDAR:
console.assert(ficha.patron_reforzado === 'EC');
console.assert(ficha.foco === 'CONCEPTO');
console.assert(ficha.ejercicios.every(ej => ej.foco_pedagogico === 'CONCEPTO'));
console.assert(ficha.ejercicios.every(ej => ej.criterio_lomloe_id === 'MAT_PRI4_C1.2'));

console.log('✅ Test EC: PASSED');
```

**Prueba 2: Estudiante con patrón EP**

```javascript
const historial = [
    { patron: 'EP', criterio: 'MAT_PRI4_C1.2' },  // Error procedimental
    { patron: 'EP', criterio: 'MAT_PRI4_C1.2' },
    { patron: 'EP', criterio: 'MAT_PRI4_C1.2' }
];

const ficha = await generarFichaRefuerzo(perfil, historial);

// VALIDAR:
console.assert(ficha.foco === 'PROCEDIMIENTO');
console.assert(ficha.ejercicios.every(ej => ej.foco_pedagogico === 'PROCEDIMIENTO'));

console.log('✅ Test EP: PASSED');
```

**Prueba 3: Estudiante con patrón EAC**

```javascript
const historial = [
    { patron: 'EAC', criterio: 'MAT_PRI4_C2.1' },  // Error aplicación
    { patron: 'EAC', criterio: 'MAT_PRI4_C2.1' },
    { patron: 'EAC', criterio: 'MAT_PRI4_C2.1' }
];

const ficha = await generarFichaRefuerzo(perfil, historial);

// VALIDAR:
console.assert(ficha.foco === 'APLICACION');
console.assert(ficha.ejercicios.every(ej => ej.foco_pedagogico === 'APLICACION'));

console.log('✅ Test EAC: PASSED');
```

---

## 8. CRITERIOS DE ÉXITO

### 8.1 Checklist de Finalización

#### **Etiquetado Completo:**
- [ ] 100% ejercicios tienen foco_pedagogico
- [ ] 100% ejercicios tienen criterio_lomloe_id
- [ ] 100% ejercicios tienen licencia
- [ ] Distribución foco_pedagogico razonable:
  - [ ] CONCEPTO: 25-30%
  - [ ] PROCEDIMIENTO: 40-50%
  - [ ] APLICACION: 20-30%

#### **Calidad de Datos:**
- [ ] ≥70% clasificados automáticamente con confianza >0.75
- [ ] 100% ejercicios verificados manualmente o automáticamente
- [ ] 0 ejercicios con campos NULL
- [ ] 0 licencias desconocidas/dudosas sin resolver

#### **Funcionalidad:**
- [ ] Servicio fichas-personalizadas usa foco_pedagogico
- [ ] Búsqueda quirúrgica devuelve 100% relevantes
- [ ] Test EC genera ficha 100% conceptual
- [ ] Test EP genera ficha 100% procedimental
- [ ] Test EAC genera ficha 100% aplicación

#### **Métricas Finales:**
- [ ] Efectividad de personalización: 100% (vs 40% antes)
- [ ] Tiempo de generación ficha: <2 segundos
- [ ] Satisfacción usuario (test): >90%

---

### 8.2 Métricas de Éxito Cuantificables

```
╔═══════════════════════════════════════════════════════════╗
║              RESULTADO ESPERADO DÍA 7                    ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  DATOS:                                                    ║
║  ├─ Ejercicios con foco_pedagogico:     100% ✅          ║
║  ├─ Ejercicios con criterio_lomloe_id:  100% ✅          ║
║  ├─ Ejercicios con licencia:            100% ✅          ║
║  └─ Licencias sin resolver:             0 ✅             ║
║                                                           ║
║  CALIDAD:                                                  ║
║  ├─ Precisión clasificación automática: ≥70% ✅          ║
║  ├─ Ejercicios revisados manualmente:   ≥30% ✅          ║
║  └─ Ejercicios con errores corregidos:  <5% ✅           ║
║                                                           ║
║  FUNCIONALIDAD:                                            ║
║  ├─ Búsqueda quirúrgica operativa:      SÍ ✅            ║
║  ├─ Relevancia fichas generadas:        100% ✅          ║
║  ├─ Tests EC/EP/EAC passed:             3/3 ✅           ║
║  └─ Efectividad vs antes:               +150% ✅         ║
║                                                           ║
║  LANZAMIENTO:                                              ║
║  ├─ Bloqueador legal resuelto:          SÍ ✅            ║
║  ├─ Bloqueador valor premium:           SÍ ✅            ║
║  ├─ Bloqueador LOMLOE:                  SÍ ✅            ║
║  └─ Listo para BETA:                    SÍ ✅            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 9. CONCLUSIÓN Y PRÓXIMOS PASOS

### Resumen del Plan

Este plan de choque de **7 días** resuelve simultáneamente los **3 bloqueadores críticos**:

1. ✅ **foco_pedagogico** → Personalización quirúrgica 100%
2. ✅ **criterio_lomloe_id** → Validez curricular oficial
3. ✅ **licencia** → Lanzamiento legal seguro

**Ventajas del enfoque consolidado:**
- ⏱️ **Ahorra tiempo:** 7 días vs 15-20 días (3 campos separados)
- 📋 **Proceso único:** Un solo CSV para los 3 campos
- 🎯 **Eficiencia:** Revisor valida 3 campos por ejercicio en una sola pasada
- ✅ **Calidad:** Consistencia en clasificación

### Próximos Pasos (Después del Día 7)

**Día 8-14: Preparar Lanzamiento BETA**
```
□ Testing integral con usuarios internos
□ Corrección de bugs encontrados
□ Preparar materiales de onboarding
□ Definir KPIs de BETA
```

**Día 15-30: Lanzamiento BETA**
```
□ Lanzar a primeros 50 usuarios
□ Recoger feedback continuo
□ Iterar según uso real
□ Medir efectividad de personalización
```

**Mes 2-3: Preparar Premium**
```
□ Implementar pasarela de pago
□ Activar RLS en Supabase
□ Integrar captura de tiempos
□ Preparar lanzamiento v2.0
```

---

### Llamada a la Acción

```
╔═══════════════════════════════════════════════════════════╗
║                    ¡LISTO PARA EJECUTAR!                 ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  DÍA 1:  Desarrollar script                               ║
║  DÍA 2:  Generar CSV                                      ║
║  DÍA 3-5: Revisión manual                                 ║
║  DÍA 6:  Importar a BD                                    ║
║  DÍA 7:  Validar y celebrar 🎉                           ║
║                                                           ║
║  RESULTADO: Sistema 40% → 100% efectividad               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**El código está listo. Los scripts están definidos. El proceso está documentado.**

**Solo falta ejecutar. ¿Empezamos mañana?** 🚀

---

**Fecha de creación:** 15 de diciembre de 2025  
**Documento:** Plan de Choque 7 Días  
**Estado:** ✅ Listo para Ejecución  
**Próxima acción:** Iniciar Día 1 (Desarrollar script)
