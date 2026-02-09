# Diseño del "Robot Etiquetador" (AI Auto-Tagger)

Este script automatizado procesará cada pregunta de tu base de datos y le asignará las etiquetas avanzadas.

## 1. El Prompt Maestro (Lo que le diremos a la IA)

Para cada pregunta, la IA recibirá estas instrucciones estrictas:

```text
ANALIZA ESTA PREGUNTA EDUCATIVA:
"{texto_pregunta}"

1. CLASIFICACIÓN FOCO PEDAGÓGICO:
   - Es CONCEPTO si pide definir, explicar, identificar.
   - Es PROCEDIMIENTO si pide calcular, resolver, ejecutar pasos.
   - Es APLICACIÓN si plantea un problema de la vida real o contexto.

2. CLASIFICACIÓN VARK (Elige los que apliquen):
   - VISUAL: Si menciona "gráficos", "dibujar", "diagramas", "colores", "mapas".
   - AURAL: Si pide "debata", "explique oralmente", "escuche". (Menos común en texto)
   - READ_WRITE: Si pide "escribir", "listar", "definir", "leer texto".
   - KINESTHETIC: Si pide "construir", "experimentar", "usar objetos", "medir en casa".

3. INTELIGENCIAS MÚLTIPLES:
   - Lógico-Matemática (Cálculo, lógica)
   - Lingüística (Palabras, idiomas)
   - Espacial (Visualización 3D, mapas)
   - Naturalista (Medio ambiente, biología)
   - Intrapersonal (Reflexión propia)
   
DEVUELVE SOLO JSON.
```

## 2. Ejemplos de Resultados Esperados

### Caso A: "Dibuja un triángulo isósceles"
- **Foco:** `procedimiento` (Acción de dibujar)
- **VARK:** `['visual', 'kinesthetic']` (Dibujar es visual y motor)
- **Inteligencia:** `['espacial']`

### Caso B: "Explica con tus palabras qué es la fotosíntesis"
- **Foco:** `concepto`
- **VARK:** `['read_write']`
- **Inteligencia:** `['lingüistica', 'naturalista']`

### Caso C: "Calcula cuántas manzanas quedan si tenías 5 y comes 2"
- **Foco:** `aplicacion` (Contexto real simple)
- **VARK:** `['logical']` (Aunque VARK puro, aquí es lógico-matemático)
- **Inteligencia:** `['logico_matematica']`

## 3. Plan de Ejecución

1. **Leer** todas las preguntas de `question_bank_local` (y de `banco-preguntas.js`).
2. **Enviar** en lotes de 20 a la IA (para ahorrar tiempo).
3. **Actualizar** la base de datos con las nuevas columnas.
```
