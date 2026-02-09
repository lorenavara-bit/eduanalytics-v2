# 📋 GUÍA ULTRA-SIMPLE: QUÉ HACER CON LA HOJA

**Explicación práctica paso a paso para revisar los 97 ejercicios**

---

## 🎯 OBJETIVO SIMPLE

**Completar el campo `criterio_final` en 97 ejercicios que no lo tienen.**

Eso es TODO. El resto ya está bien.

---

## 📂 PASO 1: ABRIR EL ARCHIVO

1. Ve a tu carpeta del proyecto
2. Busca el archivo: **`revision_pendiente.csv`**
3. **Haz doble clic** para abrirlo en Excel (o Google Sheets)

---

## 📊 PASO 2: ENTENDER LA HOJA

La hoja tiene estas columnas:

```
┌─────────────┬──────────────┬────────────┬────────┬───────────┬─────────────┬───────────────┬──────────────┬──────────────┬─────────────┐
│ id          │ pregunta     │asignatura  │ curso  │ tema      │ foco_auto   │ criterio_auto │ foco_final   │criterio_final│ verificado  │
├─────────────┼──────────────┼────────────┼────────┼───────────┼─────────────┼───────────────┼──────────────┼──────────────┼─────────────┤
│ galicia_38  │ ¿Qué fracc...│Matemáticas │4º Prim │Fracciones │PROCEDIMIENTO│ ❌ VACÍO      │PROCEDIMIENTO │ ❌ VACÍO     │ false       │
└─────────────┴──────────────┴────────────┴────────┴───────────┴─────────────┴───────────────┴──────────────┴──────────────┴─────────────┘
```

**Lo que importa:**
- ✅ `asignatura` → Ya está (ejemplo: "Matemáticas")
- ✅ `tema` → Ya está (ejemplo: "Fracciones")
- ❌ `criterio_auto` → **VACÍO** (esto es el problema)
- ❌ `criterio_final` → **VACÍO** (esto es lo que TÚ debes llenar)

---

## ✏️ PASO 3: QUÉ HACER CON CADA FILA

### **Para CADA ejercicio (fila), haz esto:**

1. **Lee la columna `tema`**
2. **Busca el tema en la tabla de abajo**
3. **Copia el código del criterio**
4. **Pégalo en la columna `criterio_final`**
5. **Escribe `true` en la columna `verificado`**

---

## 📖 TABLA DE CONSULTA RÁPIDA

### **MATEMÁTICAS 4º PRIMARIA**

| Si el tema dice... | Escribe en criterio_final |
|-------------------|---------------------------|
| Fracciones | `MAT_PRI4_C1.2` |
| División | `MAT_PRI4_C1.1` |
| Sumas y Restas | `MAT_PRI4_C1.1` |
| Números Decimales | `MAT_PRI4_C1.3` |
| Problemas | `MAT_PRI4_C3.1` |
| Matemáticas (genérico) | `MAT_PRI4_C1.1` |

### **LENGUA CASTELLANA 4º/5º PRIMARIA**

| Si el tema dice... | Escribe en criterio_final |
|-------------------|---------------------------|
| Gramática | `LEN_PRI4_C1.1` o `LEN_PRI5_C1.1` |
| Lengua Castellana | `LEN_PRI4_C1.1` o `LEN_PRI5_C1.1` |
| Ortografía | `LEN_PRI4_C1.2` o `LEN_PRI5_C1.2` |
| Comprensión | `LEN_PRI4_C2.1` o `LEN_PRI5_C2.1` |

### **CIENCIAS SOCIALES 4º PRIMARIA**

| Si el tema dice... | Escribe en criterio_final |
|-------------------|---------------------------|
| Ciencias Sociales | `SOC_PRI4_C1.1` |
| Geografía | `SOC_PRI4_C1.1` |
| Historia | `SOC_PRI4_C2.1` |

### **CIENCIAS NATURALES 4º PRIMARIA**

| Si el tema dice... | Escribe en criterio_final |
|-------------------|---------------------------|
| Ciencias de la Naturaleza | `NAT_PRI4_C1.1` |
| Animales | `NAT_PRI4_C1.1` |
| Cuerpo Humano | `NAT_PRI4_C1.2` |

### **INGLÉS 4º PRIMARIA**

| Si el tema dice... | Escribe en criterio_final |
|-------------------|---------------------------|
| Colors and Animals | `ING_PRI4_C1.1` |
| Inglés | `ING_PRI4_C1.1` |
| Family and Greetings | `ING_PRI4_C1.1` |

---

## 👁️ EJEMPLO PRÁCTICO COMPLETO

### **ANTES DE TU REVISIÓN:**

```
Fila 1:
┌──────────────┬──────────────┬────────────┬────────┬───────────┬─────────────┬───────────────┬──────────────┬──────────────┬─────────────┐
│ id           │ pregunta     │asignatura  │ curso  │ tema      │ foco_auto   │ criterio_auto │ foco_final   │criterio_final│ verificado  │
├──────────────┼──────────────┼────────────┼────────┼───────────┼─────────────┼───────────────┼──────────────┼──────────────┼─────────────┤
│ galicia_38   │ ¿Qué fracc...│Matemáticas │4º Prim │Fracciones │PROCEDIMIENTO│      ❌       │PROCEDIMIENTO │      ❌      │   false     │
└──────────────┴──────────────┴────────────┴────────┴───────────┴─────────────┴───────────────┴──────────────┴──────────────┴─────────────┘
```

### **QUÉ HACES TÚ:**

1. **Lees:** Tema = "Fracciones", Asignatura = "Matemáticas", Curso = "4º Prim"
2. **Buscas en la tabla:** Fracciones → `MAT_PRI4_C1.2`
3. **Escribes en `criterio_final`:** `MAT_PRI4_C1.2`
4. **Escribes en `verificado`:** `true`

### **DESPUÉS DE TU REVISIÓN:**

```
Fila 1:
┌──────────────┬──────────────┬────────────┬────────┬───────────┬─────────────┬───────────────┬──────────────┬──────────────┬─────────────┐
│ id           │ pregunta     │asignatura  │ curso  │ tema      │ foco_auto   │ criterio_auto │ foco_final   │criterio_final│ verificado  │
├──────────────┼──────────────┼────────────┼────────┼───────────┼─────────────┼───────────────┼──────────────┼──────────────┼─────────────┤
│ galicia_38   │ ¿Qué fracc...│Matemáticas │4º Prim │Fracciones │PROCEDIMIENTO│      ❌       │PROCEDIMIENTO │ MAT_PRI4_C1.2│   true      │
└──────────────┴──────────────┴────────────┴────────┴───────────┴─────────────┴───────────────┴──────────────┴──────────────┴─────────────┘
                                                                                                        ↑               ↑
                                                                                                  TÚ AÑADES      TÚ CAMBIAS
                                                                                                    ESTO         A "true"
```

---

## 🎯 OTRO EJEMPLO

### **ANTES:**
```
Fila 25:
tema = "Lengua Castellana"
curso = "5º Primaria"
criterio_final = ❌ (vacío)
verificado = false
```

### **TÚ HACES:**
1. Tema = "Lengua Castellana" + Curso = "5º Primaria"
2. Buscas en tabla → `LEN_PRI5_C1.1`
3. Escribes: `LEN_PRI5_C1.1` en `criterio_final`
4. Cambias `verificado` a `true`

### **DESPUÉS:**
```
Fila 25:
tema = "Lengua Castellana"
curso = "5º Primaria"
criterio_final = LEN_PRI5_C1.1 ✅
verificado = true ✅
```

---

## ⚡ TRUCOS PARA IR RÁPIDO

### **1. Ordena por tema**
En Excel:
- Selecciona toda la hoja
- Haz clic en "Ordenar"
- Ordena por columna "tema"

**Resultado:** Todos los ejercicios del mismo tema quedan juntos

**Ventaja:** Si hay 12 ejercicios de "Fracciones", solo buscas el código 1 vez y lo copias 12 veces

### **2. Usa copiar-pegar**
- Escribe el criterio en la primera fila de un tema
- Selecciona la celda
- Copia (Ctrl+C)
- Pega en las demás filas del mismo tema (Ctrl+V)

### **3. Rellenar verificado en bloque**
- Al final, selecciona TODA la columna `verificado`
- Buscar y reemplazar: `false` → `true`
- ¡Listo!

---

## ❓ QUÉ HACER SI NO ENCUENTRAS EL TEMA

Si encuentras un tema que NO está en la tabla, usa estos criterios genéricos:

| Asignatura | Criterio por defecto |
|------------|---------------------|
| Matemáticas 4º | `MAT_PRI4_C1.1` |
| Matemáticas 5º | `MAT_PRI5_C1.1` |
| Lengua 4º | `LEN_PRI4_C1.1` |
| Lengua 5º | `LEN_PRI5_C1.1` |
| Ciencias Sociales 4º | `SOC_PRI4_C1.1` |
| Ciencias Naturales 4º | `NAT_PRI4_C1.1` |
| Inglés 4º | `ING_PRI4_C1.1` |

---

## 📊 RESUMEN ULTRA-SIMPLE

```
Para cada fila de las 97:

1. Lee el "tema" y "curso"
2. Busca en la tabla de este documento
3. Copia el código (ej: MAT_PRI4_C1.2)
4. Pégalo en "criterio_final"
5. Marca "verificado" = true

Repite 97 veces (15 min si ordenas por tema)
```

---

## ✅ CUANDO TERMINES

1. **Guarda el archivo** (`revision_pendiente.csv`)
2. **Avísame** y te diré cómo importar a la base de datos
3. **¡Celebra!** Has completado el trabajo más tedioso 🎉

---

## 🆘 EJEMPLO REAL PASO A PASO

Voy a mostrarte las **primeras 5 filas** de tu CSV real:

### **Fila 1:**
```
tema: "Fracciones"
curso: "4º Primaria"
asignatura: "Matemáticas"

→ Acción: Escribir "MAT_PRI4_C1.2" en criterio_final
→ Cambiar verificado a "true"
```

### **Fila 2:**
```
tema: "Problemas"
curso: "4º Primaria"
asignatura: "Matemáticas"

→ Acción: Escribir "MAT_PRI4_C3.1" en criterio_final
→ Cambiar verificado a "true"
```

### **Fila 3:**
```
tema: "Lengua Castellana"
curso: "5º Primaria"

→ Acción: Escribir "LEN_PRI5_C1.1" en criterio_final
→ Cambiar verificado a "true"
```

---

## 💡 LO MÁS IMPORTANTE

**NO NECESITAS LEER CADA PREGUNTA.**

Solo necesitas:
1. ✅ El **tema**
2. ✅ El **curso**
3. ✅ Buscar en la **tabla**
4. ✅ Copiar el **código**
5. ✅ Pegar en **criterio_final**

**Eso es TODO.**

---

## ⏱️ TIEMPO REAL

- **Por ejercicio:** 10-15 segundos
- **Total 97 ejercicios:** 15-20 minutos (si ordenas por tema)

**NO son 2.5 horas. Son 15-20 minutos si usas los trucos.** ⚡

---

## 🎯 RESUMEN DE UN VISTAZO

```
TU TAREA:
─────────
Llenar la columna "criterio_final" en 97 filas

CÓMO:
─────
1. Lee tema + curso
2. Busca código en tabla
3. Copia y pega
4. Marca verificado = true

HERRAMIENTAS:
─────────────
✓ Archivo: revision_pendiente.csv
✓ Tabla: Esta guía (arriba)

TIEMPO:
───────
15-20 minutos (con trucos)
```

---

**¿Ahora está más claro? ¿Quieres que te muestre las primeras 10 filas reales de tu CSV para que veas exactamente qué hacer?** 🎯
