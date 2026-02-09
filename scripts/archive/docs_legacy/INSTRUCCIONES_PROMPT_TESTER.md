# Cómo Usar el Prompt Tester

## 🎯 Acceso Rápido

Abre tu navegador y ve a:
```
http://localhost:5173/test-prompt
```

## ✅ Lo que Hace

El **PromptTester** es un componente temporal que te permite probar conversaciones con el Tutor IA **antes** de implementar el sistema completo.

### Funcionalidades:

1. **Carga automática de contexto:**
   - Perfil del primer estudiante encontrado
   - Saberes básicos LOMLOE de Matemáticas (ejemplo)
   - Criterios de evaluación oficiales
   - Competencias clave

2. **Construcción del prompt con LOMLOE:**
   - Incluye TODO el contexto curricular
   - Adaptaciones según perfil VARK
   - Adaptaciones NEE si existen
   - Libro de texto si está registrado

3. **Chat funcional:**
   - Envía mensajes al Tutor IA
   - Recibe respuestas usando SambaNova
   - Mantiene historial de conversación
   - Respeta el contexto del estudiante

4. **Vista de contexto:**
   - Click en "Ver Contexto" para ver toda la información cargada
   - Puedes expandir "Ver Prompt Sistema Completo" para ver el prompt exacto
   - Útil para depurar y entender qué información tiene la IA

## 📝 Cómo Probar

### Prueba 1: Estudiante con necesidad vaga
```
Tú escribes: "tengo examen mañana"
Observa: ¿La IA hace preguntas clarificadoras? ¿Son apropiadas?
```

### Prueba 2: Solicitud directa
```
Tú escribes: "explícame las fracciones"
Observa: ¿La explicación usa el contexto LOMLOE? ¿Menciona saberes básicos?
```

### Prueba 3: Generación de ejercicios
```
Tú escribes: "ponme 5 ejercicios de matemáticas"
Observa: ¿Avisa antes de generar? ¿Pregunta por tema/dificultad?
```

### Prueba 4: Evaluación de respuesta
```
Tú escribes: "quiero practicar sumas"
IA genera ejercicios
Tú respondes mal a propósito
Observa: ¿El feedback es constructivo? ¿Usa formato ✅ ⚠️ 💡?
```

## 🔍 Qué Verificar

### Tono
- [ ] ¿Es amigable pero no condescendiente?
- [ ] ¿Usa lenguaje apropiado para la edad del estudiante?
- [ ] ¿Los mensajes son cortos (3-4 párrafos máximo)?

### Comportamiento
- [ ] ¿Hace preguntas clarificadoras cuando no está seguro?
- [ ] ¿Confirma antes de generar contenido?
- [ ] ¿Muestra empatía si detectas frustración?

### Contexto LOMLOE
- [ ] ¿Las explicaciones mencionan saberes básicos cuando es relevante?
- [ ] ¿El feedback evalúa según criterios oficiales?
- [ ] ¿Se adapta al perfil VARK del estudiante?

### Adaptaciones NEE
Si el estudiante tiene TDAH:
- [ ] ¿Los mensajes son más cortos?
- [ ] ¿Usa más bullet points?

Si el estudiante es Visual:
- [ ] ¿Sugiere dibujar o esquematizar?
- [ ] ¿Usa descripciones visuales?

## ⚙️ Configuración

### Cambiar Asignatura a Probar
Edita `PromptTester.jsx` línea ~60:
```javascript
await loadCurriculumContext('Lengua Castellana', student.grade_level);
// En lugar de 'Matemáticas'
```

### Cambiar Modelo de IA
Edita línea ~195:
```javascript
model: "Meta-Llama-3.1-8B-Instruct",  // Más rápido
// o
model: "Meta-Llama-3.1-70B-Instruct", // Más calidad
```

### Ajustar Longitud de Respuesta
Edita línea ~200:
```javascript
max_tokens: 500,  // Respuestas más cortas
// o
max_tokens: 1500, // Respuestas más largas
```

## 🐛 Troubleshooting

### Error: "No hay perfil de estudiante cargado"
**Solución:** Crea al menos un estudiante en NeuroPerfil primero.

### Error: "No AI Engine available"
**Solución:** Verifica que tienes la API key de SambaNova en localStorage o .env:
```javascript
localStorage.setItem('SAMBANOVA_API_KEY', 'tu-key-aqui');
```

### La IA responde en inglés
**Solución:** El prompt necesita enfatizar más el idioma. Añade al inicio del prompt:
```
IDIOMA OBLIGATORIO: ESPAÑOL
TODAS las respuestas DEBEN ser en español.
```

### Los mensajes son muy largos
**Solución:** Reduce `max_tokens` o añade al prompt:
```
IMPORTANTE: Máximo 2-3 párrafos por mensaje. Sé conciso.
```

## 📊 Iteración del Prompt

Después de probar varias conversaciones:

1. **Identifica problemas** (tono inapropiado, respuestas muy largas, etc.)
2. **Edita** `PROMPT_MAESTRO_TUTOR_IA.md` con ajustes
3. **Actualiza** la función `buildSystemPrompt()` en `PromptTester.jsx`
4. **Prueba de nuevo** con los mismos casos

Repite este ciclo hasta que el comportamiento sea perfecto.

## 🎯 Objetivos de Testing

Al final de esta fase de pruebas deberías poder responder SÍ a:

- [ ] El tutor hace preguntas apropiadas cuando no entiende
- [ ] El feedback es constructivo y educativo
- [ ] El tono es adecuado para niños/adolescentes
- [ ] Las explicaciones usan el contexto LOMLOE correctamente
- [ ] Se adapta visiblemente al perfil VARK
- [ ] Los mensajes no son abrumadoramente largos
- [ ] El tutor NO genera contenido sin confirmar primero
- [ ] Tus hijos se sentirían cómodos interactuando con este tutor

## 🗑️ Eliminación

**IMPORTANTE:** Este componente es TEMPORAL.

Una vez que tengas el prompt refinado y funcionando:
1. Guarda el prompt final en `PROMPT_MAESTRO_TUTOR_IA.md`
2. Documenta los ajustes que hiciste
3. **ELIMINA** `PromptTester.jsx` y su ruta en `App.jsx`
4. Implementa el Tutor IA real en las siguientes fases

---

**Este componente te ahorrará semanas de desarrollo ajustando prompts después de implementar todo el sistema completo.**
