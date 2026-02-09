# 📘 Estándar de Ingesta Masiva: EduAnalytics V2

Este documento define el formato CSV necesario para que el **Admin Panel** convierta tu contenido de Santillana en ejercicios VIP interactivos automáticamente.

## 📥 Estructura del CSV (Columnas)

| Columna | Descripción | Valores permitidos |
| :--- | :--- | :--- |
| `topic` | Nombre del Tema / Unidad | Ej: `Unit 3: Jobs` |
| `subject` | Asignatura | `Inglés`, `Matemáticas`, `Lengua` |
| `grade_level` | Curso | `1º Primaria` ... `6º Primaria` |
| `question_type` | Tipo de Ejercicio VIP | `voice`, `classification`, `connector`, `word_order`, `fill_blanks`, `scanner` |
| `question_text` | Enunciado claro para el alumno | Texto libre |
| `correct_answer` | La solución (ver formatos abajo) | Texto o JSON String |
| `options` | Opciones separadas por barra `|` | Ej: `Firefighter | Doctor | Nurse` |
| `metadata_json` | Configuración avanzada de lógica | JSON String (ver ejemplos) |

---

## 🛠️ Formatos según tipo de ejercicio

### 1. Clasificación (`classification`)
- **correct_answer**: Un JSON que asigne cada item a su categoría.
  - Ej: `{"Firefighter": "Emergency", "Doctor": "Emergency", "Teacher": "Education"}`
- **metadata_json**: Define los nombres de las categorías.
  - Ej: `{"buckets": ["Emergency", "Education"]}`

### 2. Parejas / Conectores (`connector`)
- **correct_answer**: Un JSON con los pares correctos.
  - Ej: `[{"left": "Firefighter", "right": "Fire station"}, {"left": "Doctor", "right": "Hospital"}]`
- **options**: No se usa.

### 3. Voz / Pronunciación (`voice`)
- **correct_answer**: El texto exacto que el alumno debe decir.
  - Ej: `Firefighter`
- **metadata_json**: Puede incluir la regla gramatical vinculada.
  - Ej: `{"rule_ids": ["RULES_ENG_G4_U3_VOCAB"]}`

### 4. Orden de Palabras (`word_order`)
- **correct_answer**: La frase en el orden correcto.
  - Ej: `He is a firefighter`
- **question_text**: Las palabras desordenadas.
  - Ej: `a / is / He / firefighter`

---

## 🧠 Metadatos Maestros (Metadata JSON)
Para que el motor de feedback sea una herramienta pedagógica real, usa estos campos en tu `metadata_json`:

- **`rule_id`**: El ID de la regla gramatical que quieres vincular (ej: `RULES_ENG_G4_U1_3RD_PERSON_S`).
- **`explicacionDiamante`**: Tu voz como profesor. Si escribes aquí, el sistema mostrará este mensaje exacto si el alumno falla. **Es la prioridad absoluta.**

### Ejemplo de Metadata JSON:
```json
{
  "rule_id": "RULES_ENG_G4_V_CAN",
  "explicacionDiamante": "Recuerda que con 'can' no añadimos 's' al verbo, ¡incluso si es He o She!",
  "lomloe_criterios": ["CE.ING.4P.1"]
}
```

---

## 🚦 Tipos de Ejercicios VIP

1. **`voice`**: El alumno debe responder hablando.
2. **`classification`**: Arrastrar elementos a categorías (requiere `"buckets"` en metadata).
3. **`connector`**: Unir con flechas (requiere parejas en `correct_answer`).
4. **`word_order`**: Ordenar palabras (usa `/` en `question_text`).
5. **`fill_blanks`**: Rellenar huecos (usa `___` o paréntesis).

---

## 🚀 Cómo Inyectar
1. Prepara tu Excel siguiendo este formato.
2. Expórtalo como **CSV (delimitado por comas)**.
3. Súbelo en `/admin/ingest` dentro de la App.
4. ¡Listo! El generador ahora usará estos ejercicios antes de preguntar a la IA.
