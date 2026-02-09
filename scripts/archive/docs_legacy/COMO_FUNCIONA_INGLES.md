# 🇬🇧 Sistema de Generación de Inglés (4º Primaria)
## Documentación Técnica y Pedagógica

Este documento detalla la arquitectura, lógica pedagógica y funcionamiento técnico del módulo de Inglés de EduAnalytics v2.

---

## 1. Visión General: El Concepto "Smart Mix" 🧠

A diferencia de los generadores tradicionales que crean ejercicios aislados (solo vocabulario O solo gramática), nuestro sistema implementa una **Integración Contextual Inteligente ("Smart Mix")**.

### ¿Qué significa esto?
Si un estudiante quiere practicar el tema **"Comida" (Food)**, el sistema no solo le preguntará vocabulario de alimentos. Automáticamente detectará que pedagógicamente tiene sentido practicar también:
*   **Verb Like:** "I like apples" (Expresar gustos).
*   **Verb Can:** "Can I have an orange?" (Pedir cosas).
*   **Countable/Uncountable:** "How much milk?" (Cantidades).

El sistema "mezcla" inteligentemente estos conceptos para crear una experiencia de aprendizaje inmersiva y coherente.

---

## 2. Arquitectura del Sistema

El sistema funciona mediante una cascada de decisiones deterministas:

### A. El Cerebro (`deterministic-integration.js`)
Es el punto de entrada. Analiza lo que el usuario escribe en el campo "Tema" y decide la estrategia:
1.  **Detecta el Tópico:** Traduce entradas como "deportes", "sports", "jugar" a una categoría interna (`sports`).
2.  **Detecta Gramática Implícita:** Si el usuario pide "Food", el sistema añade a la cola de generación `verb_like`, `verb_can` y `countable_uncountable`.
3.  **Configura la Ficha:** Determina la dificultad y tipos de ejercicios.

### B. El Orquestador (`english-integration-4primaria.js`)
Recibe la configuración y llama a los sub-generadores específicos. Se encarga de:
*   Gestionar el número de preguntas.
*   Evitar repeticiones.
*   Distribuir los tipos de ejercicios equitativamente.
*   **Pasar el Contexto (Categoría):** Envía la etiqueta `food` o `animals` a los generadores de gramática.

### C. Los Generadores Especializados
Son scripts independientes para cada punto gramatical. Tienen una **Mejora Clave**: Aceptan un parámetro `categoria` para personalizar sus frases.

*   `english-vocabulary-4primaria.js`: Genera ejercicios de vocabulario puro.
*   `english-verb-like-4primaria.js`: Si recibe `categoria='food'`, generará frases como *"I like pizza"* en lugar de *"I like football"*.
*   `english-have-got-4primaria.js`: Si recibe `categoria='school_objects'`, generará *"I have got a pencil"* en lugar de *"I have got a car"*.
*   `english-verb-tobe-4primaria.js`: Adapta los atributos y objetos al contexto.

### D. Fuente de Datos (`english-4primaria.json`)
Base de datos centralizada de vocabulario categorizado (Sports, Food, Animals, Clothes, etc.).

---

## 3. Niveles de Dificultad (Progresión Pedagógica)

El sistema adapta el **formato** del ejercicio según el nivel, siguiendo la Taxonomía de Bloom simplificada:

| Nivel | Enfoque Cognitivo | Tipo de Ejercicio | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Fácil** | **Reconocimiento** | Test (Opción Múltiple) | _¿Cómo se dice "Manzana"?_ [Apple] [Pear] |
| **Medio** | **Estructuración** | Ordenar Palabras / Rellenar Huecos | _Ordena: is / apple / The / red_ |
| **Difícil** | **Producción** | Traducción Inversa / Texto Libre | _Traduce: "A ella le gusta el fútbol"_ |

---

## 4. Cobertura Curricular (LOMLOE 4º Primaria)

El sistema cubre la totalidad del currículo de 4º de Primaria:

### Vocabulario
*   Animals, Food, Sports, Hobbies, School, House, City, Professions, Clothes, Nature, Transport, Family, Body.

### Gramática
1.  **Verbos Principales:**
    *   To Be (Present & Past)
    *   Have Got
    *   Like / Likes
    *   Can / Must (Modales)
2.  **Tiempos Verbales:**
    *   Present Simple
    *   Present Continuous
    *   Past Simple (Regular/Irregular)
3.  **Estructuras:**
    *   There is / There are
    *   Wh- Questions (Who, What, Where...)
    *   Saxon Genitive ('s)
    *   Possessives & Demonstratives
    *   Comparatives & Superlatives
    *   Countable / Uncountable (Some, Any, Much, Many)
    *   Prepositions (Time & Place)

---

## 5. Flujo de Datos Técnico

1.  **Frontend (`WorksheetGenerator.jsx`):** Usuario pide "Animales".
2.  **Middleware (`deterministic-integration.js`):**
    *   Detecta `category: animals`.
    *   Añade "Smart Mix": `comparatives` ("The lion is faster than...") y `verb_can` ("A bird can fly").
3.  **Backend Logic:**
    *   Llama a `generarVocabulario('animals')`.
    *   Llama a `generarComparatives('animals')`.
    *   Llama a `generarModals('animals')`.
4.  **Generadores:** Crean ejercicios únicos usando arrays dinámicos y lógica aleatoria.
5.  **Renderizado (`InteractiveWorksheet.jsx`):** Muestra los ejercicios con validación inmediata, pistas y feedback explicativo.

---

## 6. Mantenimiento y Extensión

Para añadir un nuevo tema:
1.  Añadir palabras a `english-4primaria.json`.
2.  (Opcional) Si requiere lógica gramatical especial, crear `english-NUEVOTEMA-4primaria.js`.
3.  Registrarlo en `english-integration-4primaria.js`.
4.  Añadir palabras clave de detección en `deterministic-integration.js`.

---
*Documento generado automáticamente por Antigravity tras revisión de código.*
