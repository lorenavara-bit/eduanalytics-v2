# 🧠 SISTEMA DE DETECCIÓN NEE - IMPLEMENTADO

## ⚠️ DISCLAIMER LEGAL IMPORTANTE

**Este sistema NO realiza diagnósticos médicos ni psicológicos.**

Es una **herramienta de cribado educativo** que identifica patrones de desempe ño académico que sugieren la necesidad de evaluación profesional externa por especialistas cualificados (psicólogos, neuropsicólogos, logopedas, psicopedagogos).

---

## 🎯 OBJETIVO DEL SISTEMA

Actuar como **sistema de alerta temprana** para padres y educadores, identificando patrones que podrían indicar:
- 🎯 **Altas Capacidades (AACC)**
- ⚡ **TDAH (Trastorno por Déficit de Atención)**
- 📝 **Dislexia u otras DEA**

---

## 📊 NECESIDADES EDUCATIVAS DETECTABLES

### **1. ALTAS CAPACIDADES (AACC)** 🎯

**Patrón clave:** Eficiencia extrema y variabilidad cualitativa

#### **Criterios Analíticos:**

| Criterio | Métrica | Peso |
|----------|---------|------|
| **Alto Ritmo Cognitivo** | Tiempo < percentil 10 | 3 |
| **EC por Aburrimiento** | EC en temas dominados (falta atención) | 2 |
| **Disincronía Bloom** | Alto ANALIZAR/EVALUAR, bajo RECORDAR | 3 |
| **Variabilidad Cualitativa** | Alto en complejo, bajo en trivial | 2 |

**Umbral de activación:** 2 criterios cumplidos

#### **Ejemplo de Detección:**

```javascript
Evaluaciones estudiante:
- Matemáticas (ANALIZAR): 95%
- Matemáticas (RECORDAR): 65%
- Tiempo promedio: 45s (percentil 5)
- Errores EC en ejercicios simples por distracción

→ ALERTA AACC (85% confianza)
```

**Mensaje a padres:**
```
🎯 Altas Capacidades

Patrón de alto ritmo cognitivo y eficiencia extrema detectado

Evidencias:
1. Tiempo promedio: 45s vs percentil 10: 120s
2. Rendimiento ANALIZAR: 95% vs RECORDAR: 65% (diferencia: 30%)
3. 25% de evaluaciones con alto rendimiento tienen EC (posible falta de atención)

Recomendación: Se recomienda evaluación psicopedagógica para determinar 
si el estudiante podría beneficiarse de un programa de enriquecimiento 
o adaptación curricular.
```

---

### **2. TDAH** ⚡

**Patrón clave:** Inconsistencia y variabilidad temporal

#### **Criterios Analíticos:**

| Criterio | Métrica | Peso |
|----------|---------|------|
| **Inconsistencia Atencional** | Desv. estándar tiempos >200% media | 3 |
| **Impulsividad/Despiste** | ETF >40% con EP/EC <30% | 3 |
| **Necesidad de Refuerzo** | Uso frecuente pistas/feedback | 2 |
| **Saltos de Atención** | Cambios bruscos >30% consecutivos | 2 |

**Umbral de activación:** 2 criterios cumplidos

#### **Ejemplo de Detección:**

```javascript
Evaluaciones:
Eval 1: 85%, tiempo: 60s
Eval 2: 55%, tiempo: 180s
Eval 3: 90%, tiempo: 45s
Eval 4: 50%, tiempo: 200s

Errores:
- ETF: 45%
- EC: 15%
- EP: 20%

→ ALERTA TDAH (90% confianza)
```

**Mensaje a padres:**
```
⚡ Patrón TDAH

Patrón de inconsistencia atencional y variabilidad temporal detectado

Evidencias:
1. Variabilidad temporal extrema: 220% (normal: <100%)
2. 45% errores de forma/despiste vs 35% errores conceptuales/procedimentales
3. 8 saltos significativos de rendimiento entre evaluaciones consecutivas

Recomendación: Se recomienda evaluación neuropsicológica por un profesional 
especializado en atención y función ejecutiva para descartar o confirmar TDAH 
y establecer apoyos apropiados.
```

---

### **3. DISLEXIA** 📝

**Patrón clave:** Discrepancia entre conocimiento y expresión escrita

#### **Criterios Analíticos:**

| Criterio | Métrica | Peso |
|----------|---------|------|
| **Dificultad Fonológica** | ETF con omisión/sustitución/inversión | 3 |
| **Brecha Verbal/Lógica** | Matemáticas/Ciencias > Lengua (+25%) | 3 |
| **Sobreesfuerzo Lectoescritor** | Tiempo lectura >> tiempo cálculo | 2 |
| **Comprensión OK, Ortografía NO** | Bajo EC lengua, alto ETF ortográfico | 2 |

**Umbral de activación:** 2 criterios cumplidos

#### **Ejemplo de Detección:**

```javascript
Rendimiento por asignatura:
- Matemáticas: 85%
- Ciencias: 82%
- Lengua: 55%

Errores en Lengua:
- ETF: 40
- EC: 12

Tiempos:
- Lengua: 180s
- Matemáticas: 90s

→ ALERTA DISLEXIA (85% confianza)
```

**Mensaje a padres:**
```
📝 Patrón Dislexia

Patrón de discrepancia entre conocimiento y expresión escrita detectado

Evidencias:
1. Rendimiento lógico-matemático: 84% vs verbal: 55% (diferencia: 29%)
2. En Lengua: 40 errores de forma vs 12 errores conceptuales 
   (comprensión preservada)
3. Tiempo medio Lengua: 180s vs Matemáticas: 90s (100% más lento)

Recomendación: Se recomienda evaluación especializada en lectoescritura 
por un logopeda o psicopedagogo para valorar posibles dificultades 
específicas de aprendizaje en el área verbal.
```

---

## 🔍 ALGORITMO DE DETECCIÓN

```
┌────────────────────────────────────────────┐
│   SISTEMA DE DETECCIÓN NEE                 │
├────────────────────────────────────────────┤
│                                             │
│ 1. Recolectar Datos (mínimo 10 evaluaciones)│
│    ↓                                        │
│ 2. Analizar Altas Capacidades               │
│    └─ Velocidad                             │
│    └─ Disincronía Bloom                     │
│    └─ EC por aburrimiento                   │
│    ↓                                        │
│ 3. Analizar TDAH                            │
│    └─ Variabilidad temporal                 │
│    └─ Alto ETF con bajo EC/EP               │
│    └─ Saltos de atención                    │
│    ↓                                        │
│ 4. Analizar Dislexia                        │
│    └─ Discrepancia verbal/lógica            │
│    └─ Sobreesfuerzo lectoescritor           │
│    └─ ETF ortográfico alto                  │
│    ↓                                        │
│ 5. Generar Alertas (si ≥2 criterios)        │
│    ↓                                        │
│ 6. Informe para PADRES (nunca alumnos)     │
│                                             │
└────────────────────────────────────────────┘
```

---

## 📊 DATOS NECESARIOS

### **Datos que YA se capturan:**
- ✅ Patrón de error (EC/EP/EAC/ETF)
- ✅ Porcentaje de acierto
- ✅ Asignatura
- ✅ Criterio LOMLOE
- ✅ Nivel Bloom (si está en pregunta)

### **Datos que DEBEN añadirse:**
- ⚠️ **Tiempo de respuesta** por pregunta
- ⚠️ **Tiempo total** de evaluación
- ⚠️ **Tipo de error ETF** (para dislexia):
  - Omisión de letras
  - Sustitución de letras
  - Inversión de letras
  - Error ortográfico simple

---

## 🔧 INTEGRACIÓN EN EL SISTEMA

### **1. Captura de Tiempo**

```javascript
// En InteractiveWorksheet.jsx
const [tiempoInicio, setTiempoInicio] = useState(Date.now());
const [tiemposPorPregunta, setTiemposPorPregunta] = useState([]);

const handleRespuesta = (pregunta, respuesta) => {
    const tiempoRespuesta = (Date.now() - tiempoInicio) / 1000; // segundos
    
    setTiemposPorPregunta([
        ...tiemposPorPregunta,
        { preguntaId: pregunta.id, tiempo: tiempoRespuesta }
    ]);
    
    setTiempoInicio(Date.now()); // Reset para siguiente pregunta
};

// Al finalizar:
const tiempoPromedio = tiemposPorPregunta.reduce((a, b) => a + b.tiempo, 0) 
                       / tiemposPorPregunta.length;
```

### **2. Análisis NEE en Dashboard**

```jsx
// En Dashboard de Padres/Tutores
import { generarAlertasNEE, generarInformeNEEParaPadres } from './services/deteccion-nee-service';

const DashboardPadres = ({ historialEvaluaciones }) => {
    const alertasNEE = generarAlertasNEE(historialEvaluaciones);
    const informeNEE = generarInformeNEEParaPadres(alertasNEE.alertas);

    return (
        <div>
            {/* Dashboard normal */}
            
            {/* Sección NEE (solo visible para padres/tutores) */}
            {informeNEE.hayAlertas && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mt-6">
                    <h2>⚠️ Patrones de Atención</h2>
                    <p>{informeNEE.informe}</p>
                </div>
            )}
        </div>
    );
};
```

---

## 🎯 EJEMPLO COMPLETO DE USO

```javascript
// 1. Recopilar historial (últimas 20 evaluaciones)
const historia = obtenerHistorialEstudiante(estudianteId, 20);

// 2. Generar alertas NEE
const resultadoNEE = generarAlertasNEE(historial);

// Resultado:
{
    hayDatos: true,
    totalEvaluaciones: 20,
    alertas: [
        {
            tipo: 'TDAH',
            nombre: 'Patrón TDAH',
            icono: '⚡',
            gravedad: 'ALTA',
            confianza: 0.90,
            criteriosCumplidos: [
                {
                    id: 'variabilidad_tiempo',
                    cumple: true,
                    evidencia: 'Variabilidad temporal extrema: 220%'
                },
                {
                    id: 'alto_etf',
                    cumple: true,
                    evidencia: '45% errores de despiste vs 35% conceptuales'
                }
            ],
            mensaje: 'Patrón de inconsistencia atencional detectado',
            recomendacion: 'Evaluación neuropsicológica recomendada',
            visiblePara: ['padres', 'tutores']
        }
    ],
    disclaimer: 'IMPORTANTE: Estos patrones sugieren evaluación profesional, NO son diagnósticos.'
}

// 3. Generar informe para padres
const informe = generarInformeNEEParaPadres(resultadoNEE.alertas);

// informe.informe contiene el texto formateado en Markdown
// para mostrar a padres/tutores
```

---

## 🚨 CONSIDERACIONES ÉTICAS Y LEGALES

### **1. Privacidad**
- ✅ Alertas **SOLO visibles** para padres/tutores
- ✅ **NUNCA** mostrar al alumno
- ✅ Datos sensibles protegidos

### **2. Comunicación**
- ✅ Lenguaje **no estigmatizante**
- ✅ Enfoque en **fortalezas** y **apoyos**
- ✅ Evitar terminología médica definitiva

### **3. Limitaciones Claras**
- ✅ Disclaimer visible en **todos** los informes
- ✅ Indicar que es **cribado**, no diagnóstico
- ✅ Recomendar siempre evaluación profesional

---

## 📈 VALOR PREMIUM DEL SISTEMA

```
═══════════════════════════════════════════
    DETECCIÓN NEE - VALOR DIFERENCIAL
═══════════════════════════════════════════

Competencia Básica:
→ "Tu hijo tiene un 75% de promedio"

EduAnalytics Premium:
→ "Hemos detectado un patrón de alta eficiencia 
   cognitiva combinado con bajo rendimiento en 
   tareas repetitivas. Esto podría sugerir altas 
   capacidades con posible aburrimiento.
   
   Recomendamos consultar con un psicopedagogo 
   especializado en AACC para valorar programa 
   de enriquecimiento."

IMPACTO:
- Detección temprana (años antes del diagnóstico formal)
- Intervención apropiada
- Mejor pronóstico académico
═══════════════════════════════════════════
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [x] Servicio `deteccion-nee-service.js` creado
- [x] Constantes `CRITERIOS_NEE` definidas
- [x] Función `generarAlertasNEE()` implementada
  - [x] Detección AACC
  - [x] Detección TDAH
  - [x] Detección Dislexia
- [x] Función `generarInformeNEEPara Padres()` implementada
- [x] Funciones auxiliares (percentil, desviación, etc.)
- [x] Disclaimers legales incluidos

- [ ] **PENDIENTE:** Captura de tiempos de respuesta
- [ ] **PENDIENTE:** Clasificación detallada de ETF
- [ ] **PENDIENTE:** Integración en Dashboard Padres
- [ ] **PENDIENTE:** Tests con datos reales

---

## 🔮 MEJORAS FUTURAS

### **Fase 2 (Opcional):**

1. **Machine Learning para detección**
   - Modelo entrenado con datos reales
   - Mayor precisión (>95%)
   - Detección de patrones complejos

2. **Análisis de respuestas cualitativas**
   - NLP para detectar patrones en texto libre
   - Análisis grafológico digital
   - Patrones de reformulación

3. **Tracking longitudinal**
   - Evolución de patrones a lo largo del año
   - Efectividad de intervenciones
   - Ajuste dinámico de umbrales

---

## 📊 RESUMEN

```
═══════════════════════════════════════════
   SISTEMA DETECCIÓN NEE IMPLEMENTADO
═══════════════════════════════════════════

✅ 3 Patrones detectables (AACC/TDAH/Dislexia)
✅ 10 Criterios analíticos totales
✅ Sistema de puntuación ponderada
✅ Informes para padres/tutores
✅ Disclaimers legales completos
✅ Enfoque ético y responsable

Estado: ✅ IMPLEMENTADO
Pending: Captura de tiempos y testing
Valor: PREMIUM+++
═══════════════════════════════════════════
```

---

**Fecha de implementación:** 2025-12-15  
**Versión:** 3.0 (Detección NEE)  
**Estado:** ✅ Backend completo, pendiente integración UI  
**Nivel:** **PROFESIONAL AVANZADO** 🏆
