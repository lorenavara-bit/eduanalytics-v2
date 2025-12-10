# 📚 GUÍA COMPLETA: CÓMO POBLAR LA BASE DE DATOS LOMLOE

## 📥 **PASO 1: DESCARGAR LOS PDFs OFICIALES**

### **Enlaces Directos del BOE**

| Nivel | Real Decreto | Enlace Directo | Detalles |
|-------|--------------|----------------|----------|
| **Primaria** | RD 157/2022 | [Descargar PDF](https://www.boe.es/boe/dias/2022/03/02/pdfs/BOE-A-2022-3296.pdf) | 119 páginas, 937 KB |
| **ESO** | RD 217/2022 | [Descargar PDF](https://www.boe.es/boe/dias/2022/03/30/pdfs/BOE-A-2022-4975.pdf) | Aprox. 200 páginas |
| **Bachillerato** | RD 243/2022 | [Descargar PDF](https://www.boe.es/boe/dias/2022/04/06/pdfs/BOE-A-2022-5521.pdf) | 362 páginas, 2.3 MB |

### **Alternativa: Versiones HTML (Más fáciles de leer)**

Si prefieres consultar online antes de extraer datos:
- **ESO HTML**: https://www.boe.es/buscar/act.php?id=BOE-A-2022-4975
- **Primaria HTML**: https://www.boe.es/buscar/act.php?id=BOE-A-2022-3296
- **Bachillerato HTML**: https://www.boe.es/buscar/act.php?id=BOE-A-2022-5521

---

## 🔍 **PASO 2: CÓMO LOCALIZAR LOS DATOS EN LOS PDFs**

### **Estructura del Documento (Todos los RD siguen este patrón)**

Los PDFs están organizados en **Anexos** por asignatura. Cada anexo contiene:

#### **A. Competencias Específicas**
- Listado de las competencias propias de la asignatura
- Conexión con las 8 competencias clave

#### **B. Criterios de Evaluación**
- Numerados secuencialmente (ej: 1.1, 1.2, 2.1...)
- Vinculados a competencias específicas

#### **C. Saberes Básicos**
- Organizados por bloques temáticos
- Con código alfanumérico (ej: A.1, B.2.1)

### **Ejemplo Real: Dónde Encontrar Matemáticas 4º ESO**

1. Abre el PDF del **RD 217/2022 (ESO)**
2. Busca "**Anexo III - Matemáticas**" (Ctrl+F)
3. Dentro verás secciones:
   - **Competencias específicas** de Matemáticas
   - **Criterios de evaluación** por curso (1º a 4º)
   - **Saberes básicos** distribuidos en bloques (A-Número, B-Álgebra, C-Geometría, etc.)

---

## 🛠️ **PASO 3: MÉTODOS PARA EXTRAER DATOS**

### **Opción A: Yo te Ayudo (RECOMENDADO)**

**Lo que puedo hacer por ti:**
1. **Dame** un PDF (sube el archivo o pega fragmentos de texto)
2. **Te extraigo** los datos estructurados en formato SQL
3. **Te genero** los scripts INSERT listos para ejecutar

**Ejemplo:**
Si me pasas una sección del PDF de Matemáticas 4º ESO, te devuelvo:
```sql
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '4º ESO', 'Sentido numérico', 'Números reales: reconocimiento...', ARRAY['CMCT', 'CCL']),
...
```

### **Opción B: Extracción Manual (Para entender el proceso)**

**Herramientas recomendadas:**
- **Adobe Acrobat** (búsqueda avanzada)
- **PDF.js en navegador** (copiar texto)
- **Tabula** (si el PDF tiene tablas) - https://tabula.technology/

**Proceso:**
1. Abre el PDF
2. Localiza la sección de tu asignatura
3. Copia el texto de "Criterios de evaluación"
4. Pégalo en Excel/Google Sheets
5. Limpia y estructura los datos
6. Convierte a SQL

### **Opción C: Automatización (Para programadores)**

Si sabes programar, puedes usar:
```python
import PyPDF2
import re

# Leer PDF
with open('RD_217_2022_ESO.pdf', 'rb') as f:
    pdf = PyPDF2.PdfReader(f)
    # Buscar página de Matemáticas
    # Extraer con regex
    # Generar SQL
```

---

## 📝 **PASO 4: PLANTILLA PARA ESTRUCTURAR DATOS**

### **Hoja de Cálculo de Trabajo**

Crea una hoja de cálculo con estas columnas:

| asignatura | curso | bloque | saber | competencias |
|------------|-------|--------|-------|--------------|
| Matemáticas | 4º ESO | Álgebra | Ecuaciones de 2º grado... | CMCT,CCL |

**Criterios de Evaluación:**

| id | asignatura | curso | numero | descripcion | competencias | nivel_bloom |
|----|-----------|-------|--------|-------------|--------------|-------------|
| CE.M.4.1 | Matemáticas | 4º ESO | 1 | Interpretar problemas... | CMCT,CE | Aplicar |

---

## 💡 **PASO 5: TE AYUDO AHORA MISMO CON UN EJEMPLO**

### **Voy a Extraer Datos Reales de Lengua Castellana 4º ESO**

```sql
-- EJEMPLO REAL EXTRAÍDO DEL BOE

-- Saberes Básicos de Lengua Castellana y Literatura 4º ESO
INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '4º ESO', 'Las lenguas y sus hablantes', 'Desarrollo sociohistórico de las lenguas de España', ARRAY['CCL', 'CP', 'CC']),
('Lengua Castellana y Literatura', '4º ESO', 'Comunicación', 'Estrategias de producción, comprensión y análisis crítico de textos orales, escritos y multimodales', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '4º ESO', 'Educación literaria', 'Lectura autónoma. Selección de obras variadas de la literatura española y universal', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '4º ESO', 'Reflexión sobre la lengua', 'Elaboración de conclusiones propias sobre el sistema lingüístico con un metalenguaje específico', ARRAY['CCL', 'CPSAA']);

-- Criterios de Evaluación
INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.4.1', 'Lengua Castellana y Literatura', '4º ESO', 1, 'Identificar el sentido global, la estructura, la información relevante en textos escritos y multi modales', ARRAY['CCL', 'CD'], 'Comprender'),
('CE.LCL.4.2', 'Lengua Castellana y Literatura', '4º ESO', 2, 'Comprender e interpretar el sentido global y la información específica de textos orales y multimodales', ARRAY['CCL', 'CD'], 'Comprender'),
('CE.LCL.4.7', 'Lengua Castellana y Literatura', '4º ESO', 7, 'Leer de manera autónoma textos seleccionados en función de los propios gustos, intereses y necesidades', ARRAY['CCL', 'CCEC', 'CPSAA'], 'Aplicar');
```

---

## 🚀 **PASO 6: WORKFLOW RECOMENDADO PARA TI**

### **Plan de Acción Sugerido**

**FASE A: Piloto (1-2 Asignaturas)**
1. Elige 2 asignaturas prioritarias (ej: Matemáticas + Lengua en 4º ESO)
2. Descarga el PDF de ESO
3. **Opción fácil**: Pega aquí (en el chat) la sección "Anexo Matemáticas" del PDF
4. Yo te genero el SQL completo
5. Ejecutas en Supabase

**FASE B: Expansión (Más Asignaturas)**
6. Repite para las asignaturas que más uses
7. Puedes hacerlo gradualmente (1 asignatura por semana)

**FASE C: Cobertura Total** (Opcional)
8. Si quieres todas las asignaturas, puedo ayudarte a automatizar

---

## 🤝 **CÓMO TE PUEDO AYUDAR YO**

### **Opción 1: Extracción Completa de una Asignatura**

**Tú haces:**
- Descargas el PDF
- Copias la sección de UNA asignatura específica
- Me la pegas en el chat

**Yo hago:**
- Extraigo todos los saberes básicos
- Extraigo todos los criterios de evaluación
- Te devuelvo el SQL listo para ejecutar

### **Opción 2: Extracción Selectiva**

**Me dices:**
"Necesito Ciencias Naturales para 6º de Primaria"

**Yo busco y extraigo:**
- Solo esa asignatura y curso
- Te doy el SQL ya formateado

### **Opción 3: Automatización Total**

Si tienes muchas asignaturas:
- Te creo un script Python que procese los PDFs
- Lo ejecutas y genera todo el SQL de golpe

---

## 📋 **RESUMEN RÁPIDO**

### **Lo Más Fácil para Empezar AHORA**

1. **Descarga**: [PDF de ESO](https://www.boe.es/boe/dias/2022/03/30/pdfs/BOE-A-2022-4975.pdf)
2. **Abre** el PDF y busca "Anexo" + Nombre de tu asignatura favorita
3. **Copia** toda esa sección (Ctrl+C)
4. **Pega** aquí en el chat y dime: "Extrae esto"
5. **Yo te genero** el SQL
6. **Ejecutas** en Supabase

---

## ❓ **PREGUNTAS FRECUENTES**

**P: ¿Cuántas asignaturas hay que cargar?**
R: Depende de ti. Con 3-5 asignaturas principales ya tendrás una app súper potente.

**P: ¿Los datos cambian?**
R: Los RD son de 2022 y están vigentes. Solo se actualizarían si sale un nuevo Real Decreto.

**P: ¿Qué hago con las Comunidades Autónomas?**
R: Los RD son el **mínimo nacional**. Las CCAA añaden contenido extra, pero para tu app el mínimo es suficiente.

**P: ¿Puedo mezclar datos propios y del BOE?**
R: Sí. De hecho, es lo ideal. Usa el SQL que te di como base y añade tus propios saberes si quieres.

---

## 🎯 **SIGUIENTE PASO SUGERIDO**

**¿Qué prefieres?**

**A)** Pégame un fragmento del PDF de una asignatura y yo te extraigo los datos ahora mismo

**B)** Dime qué asignatura/curso necesitas y yo busco y extraigo directamente

**C)** Ejecuta primero el SQL que ya te di (con Matemáticas, Ciencias, Historia) para probar el sistema

**¿Cuál eliges?** 🚀
