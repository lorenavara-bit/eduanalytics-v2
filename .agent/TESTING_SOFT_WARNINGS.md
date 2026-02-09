# 🧪 CASOS DE PRUEBA - HOTFIX QA SOFT WARNINGS
**Fecha:** 01/02/2026 - 17:52h  
**Hotfix:** Soft Warnings para 4º Primaria  
**Bug Corregido:** #1 (normalizarTexto destructiva)

---

## 🎯 OBJETIVO DEL TESTING

Verificar que los niños de 4º Primaria **reciben feedback pedagógico** sobre mayúsculas y puntos cuando su contenido es correcto, sin ser penalizados.

---

## 📋 CASOS DE PRUEBA

### **CASO 1: Mayúsculas + Punto**
```javascript
// INPUT
pregunta = { ejercicio: "Complete: ___ name is Peppa." }
respuestaUsuario = "my name is peppa"
respuestaCorrecta = "My name is Peppa."
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "success",
  "correcta": true,
  "puntos": 1,
  "feedback": "🎉 ¡Muy bien! Tu respuesta es correcta.\n\n💡 Recuerda empezar con mayúscula.\n💡 No olvides el punto final."
}

// RAZÓN
- Contenido normalizado: "my name is peppa" === "my name is peppa" ✅
- strict.case = false → No penaliza mayúsculas
- strict.dot = false → No penaliza puntos
- PERO genera soft warnings pedagógicos
```

---

### **CASO 2: Solo Palabra Clave (I)**
```javascript
// INPUT
pregunta = { ejercicio: "Translate 'yo': ___" }
respuestaUsuario = "i"
respuestaCorrecta = "I"
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "success",
  "correcta": true,
  "puntos": 1,
  "feedback": "🎉 ¡Muy bien! Tu respuesta es correcta.\n\n💡 \"i\" siempre va con mayúscula: \"I\"."
}

// RAZÓN
- Contenido normalizado: "i" === "i" ✅
- GRAMMAR_DB.orthography.capitalization.always incluye "i"
- Genera soft warning específico
```

---

### **CASO 3: Día de la Semana**
```javascript
// INPUT
pregunta = { ejercicio: "What day is today? ___" }
respuestaUsuario = "today is monday"
respuestaCorrecta = "Today is Monday."
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "success",
  "correcta": true,
  "puntos": 1,
  "feedback": "🎉 ¡Muy bien! Tu respuesta es correcta.\n\n💡 Recuerda empezar con mayúscula.\n💡 \"monday\" siempre va con mayúscula: \"Monday\".\n💡 No olvides el punto final."
}

// RAZÓN
- Contenido: "today is monday" === "today is monday" ✅
- Detecta 3 problemas de formato:
  1. No empieza con T mayúscula
  2. "monday" debe ser "Monday" (capitalWords)
  3. Falta punto final
```

---

### **CASO 4: Error Gramatical (NO debe aprobar)**
```javascript
// INPUT
pregunta = { ejercicio: "He ___ (run) fast." }
respuestaUsuario = "he runing"
respuestaCorrecta = "He is running."
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "error",
  "correcta": false,
  "puntos": 0,
  "feedback": "💡 ¡Casi! La palabra \"runing\" necesita doblar la última letra. Regla: CVC Rule... → Correcto: \"He is running.\""
}

// RAZÓN
- Contenido normalizado: "he runing" !== "he is running" ❌
- NO entra en soft warnings
- Pasa al pipeline L0.5.2 (Spelling Check)
- Detecta error de double consonant
```

---

### **CASO 5: Respuesta Parcial (L6.9 Benevolent)**
```javascript
// INPUT
pregunta = { ejercicio: "What color is the sky? ___" }
respuestaUsuario = "blue"
respuestaCorrecta = "It is blue."
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "success",
  "correcta": true,
  "puntos": 1,
  "feedback": "🎉 ¡Correcto! Has acertado la parte clave \"blue\". (Para nota 10: intenta escribir la frase completa \"It is blue.\")."
}

// RAZÓN
- Contenido: "blue" !== "it is blue" ❌
- NO entra en FASE 1 (soft warnings)
- Pasa al pipeline → L6.9 (Benevolent Safety Net)
- Detecta palabra clave → Aprueba con sugerencia
```

---

### **CASO 6: Todo Perfecto (Sin Warnings)**
```javascript
// INPUT
pregunta = { ejercicio: "Complete: My name is ___" }
respuestaUsuario = "Peppa."
respuestaCorrecta = "Peppa."
contexto = { grade: '4_primaria' }

// ESPERADO
{
  "status": "success",
  "correcta": true,
  "puntos": 1,
  "feedback": "¡Brillante! 💎"  // Mensaje aleatorio motivador
}

// RAZÓN
- Contenido: "peppa" === "peppa" ✅
- Formato perfecto: empieza con mayúscula, termina en punto
- warnings.length === 0 → No soft warnings
- Devuelve mensaje motivador aleatorio
```

---

### **CASO 7: Curso Estricto (2º ESO)**
```javascript
// INPUT
pregunta = { ejercicio: "Complete: ___ name is Ana." }
respuestaUsuario = "my name is ana"
respuestaCorrecta = "My name is Ana."
contexto = { grade: '2_eso' }

// ESPERADO
{
  "status": "error",
  "correcta": false,
  "puntos": 0,
  "feedback": "¡Uy! Has puesto \"my name is ana\", pero la respuesta correcta es \"My name is Ana.\". ¡Revísalo!"
}

// RAZÓN
- Contenido: "my name is ana" === "my name is ana" ✅
- PERO strict.case = true (2º ESO es estricto)
- strict.dot = true
- La condición `if (!strict.case || !strict.dot)` es FALSE
- NO entra en soft warnings
- Comparación exacta (sin normalización)... ❌ ESPERA
```

**🚨 PROBLEMA DETECTADO EN CASO 7:**

El código actual compara `userAnswer === correctAnswer` (normalizados), lo que **aprueba** incluso en cursos estrictos.

**NECESITA AJUSTE:**

---

## 🔧 AJUSTE NECESARIO

Para cursos estrictos (2º ESO), necesitamos comparar **SIN normalización**:

```javascript
if (isContentCorrect) {
    const warnings = [];
    
    // Solo verificar formato si el curso NO es estricto
    if (!strict.case || !strict.dot) {
        // ... soft warnings ...
        
        if (warnings.length > 0) {
            return { success with warnings };
        }
        
        return { success perfect };
    } else {
        // CURSO ESTRICTO: Comparar exacto (RAW)
        if (uRaw === cRaw) {
            return { success perfect };
        }
        // Si no coincide exacto, continuar al pipeline
    }
}
```

---

## ✅ RESUMEN DE COMPORTAMIENTO ESPERADO

| Caso | Contenido | Formato | 4º Primaria | 2º ESO |
|------|-----------|---------|-------------|--------|
| "my name is peppa" vs "My name is Peppa." | ✅ Correcto | ❌ Faltan caps/dot | ✅ Con warnings | ❌ Error |
| "i" vs "I" | ✅ Correcto | ❌ Falta mayúscula | ✅ Con warning | ❌ Error |
| "Peppa." vs "Peppa." | ✅ Correcto | ✅ Perfecto | ✅ Sin warnings | ✅ Sin warnings |
| "he runing" vs "He is running." | ❌ Error gramática | N/A | ❌ Error (L0.5.2) | ❌ Error (L0.5.2) |
| "blue" vs "It is blue." | ❌ Parcial | N/A | ✅ Benevolent (L6.9) | ✅ Benevolent (L6.9) |

---

## 🚀 PRÓXIMO PASO

**Ajustar el código para detectar cursos estrictos y NO aprobar con normalización.**

¿Proceder con el ajuste?
