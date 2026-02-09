# Plan de Implementación: Generador de Fichas/Exámenes con IA (LOMLOE)

Este documento detalla la arquitectura y funcionalidad del nuevo Generador, diseñado para hiper-personalizar el contenido basándose en el Perfil del Estudiante y el currículo español LOMLOE.

## 1. Flujo de Trabajo del Usuario (UX)

El usuario verá un "Panel de Mando" dividido en 3 fases claras:

### Fase 1: Contexto de la Asignatura
*   **Selector Dinámico:** Se mostrarán automáticamente las asignaturas correspondientes al nivel del estudiante (ej. Primaria -> Mates, Lengua...).
    *   *Funcionalidad:* Al seleccionar una asignatura (ej. Matemáticas), se cargará su contexto específico.
*   **Libro de Texto:** Un campo para indicar qué libro usan (ej. "Santillana Saber Hacer"). Esto ayuda a la IA a alinear el estilo.
*   **Añadir Personalizada:** Botón para añadir asignaturas regionales u optativas (ej. "Gallego", "Robótica").

### Fase 2: Mochila Digital (Archivos y Apuntes)
*   **Subida Inteligente:** Posibilidad de subir fotos de apuntes, PDFs de temas o ejercicios anteriores.
*   **Selector de Contexto:** Checkboxes ("Incluir") junto a cada archivo subido. 
    *   *Ejemplo:* Si subes "Apuntes T4.pdf", marcas la casilla para que la IA genere el examen BASADO en ese archivo específico.

### Fase 3: Configuración de la Generación
*   **Tema Específico (CRUCIAL):** Un campo de texto obligatoria: "¿Sobre qué es la ficha?" (Ej. "Las fracciones algebraicas" o "La fotosíntesis").
*   **Tipo de Actividad:**
    *   Selector: `Ficha de Repaso` vs `Examen/Simulacro`.
*   **Formatos de Pregunta (Multi-selección):**
    *   [x] Test (Multiple Choice)
    *   [ ] Unir con flechas / Relacionar conceptos
    *   [ ] Rellenar huecos (Fill in the blanks)
    *   [ ] Respuesta Corta / Definiciones
    *   [ ] Diagramas/Dibujos (La IA describirá qué dibujar o analizar)
    *   [ ] Comprensión Lectora
    *   [ ] Resolución de Problemas (Matemáticas/Física)
*   **Nivel de Dificultad:** Fácil, Medio, Difícil (Se ajustará automáticamente según la edad, pero esto permite forzar un reto mayor).

## 2. El "Cerebro" de la IA (Lógica Interna)

El prompt que enviaremos a Gemini 2.0 será una obra de ingeniería que combinará:

1.  **Perfil del Estudiante (Inyectado Automáticamente):**
    *   *"El estudiante tiene X años, es [Visual/Auditivo]. Le gusta [Fútbol, Minecraft] (¡Usar esto para ejemplos!). Le cuesta [Asignatura Menos Favorita]."*
2.  **Marco Legal (LOMLOE):**
    *   Daremos instrucciones estrictas: *"Debes actuar como un profesor experto en el currículo español LOMLOE. Evalúa las competencias clave y saberes básicos."*
3.  **Material de Base:**
    *   Si se seleccionan archivos, se pasarán a la IA para que el contenido salga *literalmente* de lo que el alumno estudia.
4.  **Personalización de Salida:**
    *   Si el alumno es **Visual**: *"Incluye descripciones de diagramas o pide que dibuje."*
    *   Si es **Kinestésico**: *"Propón ejercicios prácticos o de relacionar."*

## 3. Estructura de Base de Datos Necesaria (SQL)

Necesitaremos crear 2 nuevas tablas principales para soportar esto:

1.  **`user_subjects`**: Para guardar sus asignaturas personalizadas y el libro que usan en cada una.
2.  **`study_materials`**: Para guardar los archivos subidos (PDFs, imágenes) y vincularlos a una asignatura.
3.  **`generated_content`**: Historial de fichas creadas para poder "Guardar", "Ver después" o "Imprimir".

## 4. Sugerencias de Mejora (Añadido al Plan)

Para maximizar la calidad, sugiero añadir:

1.  **Campo "Tema/Concepto Clave":** Como mencioné en la Fase 3, es vital saber QUÉ evaluar.
2.  **Generación de Solucionario:** Opción para que la IA genere, en una página separada (oculta para el alumno), las respuestas correctas explicadas para los padres.
3.  **Modo "Corrección":** (Futuro) Posibilidad de subir una foto de la ficha hecha por el alumno y que la IA la corrija.

## Resumen
Crearemos una herramienta profesional, estructurada pero flexible, donde el "Input" del padre (archivos + temas) se mezcla con la "Inteligencia" del perfil del alumno para crear material de estudio infinito y perfecto.
