# 📋 GUÍA DE REVISIÓN MANUAL - DÍA 2-5

**Plan de Choque: Revisión de 214 Ejercicios (25.3%)**

---

**Fecha:** 15 de diciembre de 2025  
**Objetivo:** Completar campos faltantes y validar clasificación automática  
**Tiempo estimado:** 3-4 días (214 ejercicios × 1.5 min = ~5 horas)

---

## 📊 ANÁLISIS DE LA MUESTRA

### ✅ **Ejercicios de Alta Confianza (31.2% - 264 ej)**

**Estado:** ✅ Clasificación automática correcta

**Ejemplo:**
```
Pregunta: "¿Qué pasó con las colonias americanas en el siglo XIX?"
Asignatura: Ciencias Sociales | Curso: 5º Primaria
Tema: La Edad Contemporánea en España
Foco auto: APLICACION
Criterio auto: SOC_PRI5_C2.1
Licencia auto: PROPRIETARY
Confianza: 0.86
```

**Acción:** ✓ Opcional validar, están listos para usar

---

### 🟡 **Ejercicios de Confianza Media (43.5% - 368 ej)**

**Estado:** Mayoría correcta, validación rápida

**Ejemplo:**
```
Pregunta: "¿Qué son las palabras agudas? Da 2 ejemplos"
Foco auto: PROCEDIMIENTO  ← Debería ser CONCEPTO
Criterio auto: LEN_PRI5_C1.1
Confianza: 0.80
```

**Acción:** ✓ Revisar foco_pedagogico si es pregunta conceptual

---

### 🔴 **Ejercicios de Baja Confianza (25.3% - 214 ej)**

**Problema identificado:** Asignatura = "Sin especificar"

**Ejemplo:**
```
Pregunta: "¿Qué fracción representa la mitad?"
Asignatura: Sin especificar  ← PROBLEMA
Tema: Fracciones
Foco auto: PROCEDIMIENTO
Criterio auto: ❌ FALTA
Confianza: 0.44
```

**Causa raíz:** Archivo `cuarto-primaria-galicia-*.js` no tiene asignatura en nombre

**Solución:** Inferir asignatura desde el tema

---

## 🔧 SOLUCIÓN RÁPIDA: MEJORAR INFERENCIA

Voy a mejorar el script para inferir asignatura desde el tema cuando el nombre del archivo no es claro.

### **Mapeo Tema → Asignatura**

```
Fracciones, División, Sumas → Matemáticas
Gramática, Ortografía → Lengua
Clima, Historia → Ciencias Sociales
El Cuerpo Humano, La Materia → Ciencias Naturales
```

---

## 📝 PROCESO DE REVISIÓN MANUAL

### **Herramienta: Excel / Google Sheets**

1. **Abrir CSV:**
   - Archivo: `ejercicios_qa_consolidado.csv`
   - Importar en Excel o Google Sheets

2. **Filtrar por confianza:**
   ```
   Ordenar por columna "confianza" (ascendente)
   → Los ejercicios con menor confianza aparecen primero
   ```

3. **Revisar cada fila:**
   - Si `foco_auto` es incorrecto → Corregir en `foco_final`
   - Si `criterio_auto` está vacío → Buscar en tabla y poner en `criterio_final`
   - Si `licencia_auto` es dudosa → Corregir en `licencia_final`
   - Marcar `verificado = true`

---

## 🎯 CAMPOS A REVISAR

### **1. foco_pedagogico**

**Regla de oro:**

```
¿La pregunta pide DEFINIR/EXPLICAR un concepto?
→ CONCEPTO

¿La pregunta pide EJECUTAR pasos/calcular?
→ PROCEDIMIENTO

¿La pregunta es un PROBLEMA contextualizado?
→ APLICACION
```

**Ejemplos:**

| Pregunta | Foco Correcto |
|----------|---------------|
| "¿Qué es una fracción?" | CONCEPTO |
| "¿Qué son las palabras agudas?" | CONCEPTO |
| "Calcula 3/4 + 1/2" | PROCEDIMIENTO |
| "Pon tilde donde corresponda: ..." | PROCEDIMIENTO |
| "Juan tiene 3/4 de pizza y come 1/2..." | APLICACION |

---

### **2. criterio_lomloe_id**

**Tabla de referencia rápida:**

#### **Matemáticas 4º Primaria**
- Operaciones, División, Sumas → `MAT_PRI4_C1.1`
- Fracciones → `MAT_PRI4_C1.2`
- Decimales → `MAT_PRI4_C1.3`
- Geometría, Ángulos → `MAT_PRI4_C2.1`
- Medidas → `MAT_PRI4_C2.2`

#### **Lengua 4º Primaria**
- Gramática, Sustantivos, Verbos → `LEN_PRI4_C1.1`
- Ortografía → `LEN_PRI4_C1.2`
- Comprensión lectora → `LEN_PRI4_C2.1`
- Redacción → `LEN_PRI4_C2.2`

#### **Ciencias Sociales 4º Primaria**
- Geografía, Clima, Localidad → `SOC_PRI4_C1.1`
- Población → `SOC_PRI4_C1.2`
- Historia, Prehistoria → `SOC_PRI4_C2.1`
- Economía → `SOC_PRI4_C3.1`

#### **Ciencias Naturales 4º Primaria**
- Animales, Seres vivos → `NAT_PRI4_C1.1`
- Cuerpo humano → `NAT_PRI4_C1.2`
- Ecosistemas → `NAT_PRI4_C1.3`
- Materia → `NAT_PRI4_C2.1`
- Energía → `NAT_PRI4_C2.2`

---

### **3. licencia**

**Reglas:**

```
Santillana → PROPRIETARY
Khan Academy → CC-BY-NC-SA
Creación propia → PROPRIETARY
Dudoso → PROPRIETARY (con nota)
```

---

## ⚡ OPTIMIZACIÓN: SCRIPT MEJORADO

Voy a crear un script que:
1. Infiere asignatura desde el tema (para archivos "galicia")
2. Regenera el CSV con mejor clasificación
3. Reduce aún más los ejercicios que requieren revisión manual

---

## 📊 ESTIMACIÓN DE TIEMPO

### **Escenario Actual (sin mejorar script):**
```
214 ejercicios × 1.5 min = 321 min (5.4 horas)
```

### **Escenario Mejorado (con inferencia tema→asignatura):**
```
~50 ejercicios × 1.5 min = 75 min (1.25 horas)
```

**Ahorro:** ~4 horas

---

## ✅ PRÓXIMOS PASOS

### **Opción A: Mejorar script primero (RECOMENDADO)**
1. Añadir mapeo tema → asignatura
2. Regenerar CSV
3. Reducir ejercicios de baja confianza de 214 a ~50
4. Revisar solo esos 50 manualmente

### **Opción B: Revisar manualmente ahora**
1. Abrir CSV en Excel
2. Revisar 214 ejercicios (5 horas)
3. Completar campos faltantes

---

## 🎯 RECOMENDACIÓN

**Mejorar el script primero** para ahorrar 4 horas de trabajo manual.

¿Procedo con la mejora del script?
- ✅ Sí → Ahorramos 75% del trabajo de revisión
- ❌ No → Empezamos revisión manual ahora

---

**El CSV actual ya es utilizable**, pero podemos optimizarlo aún más.

**Estado:** 75% de ejercicios listos, 25% requieren atención
