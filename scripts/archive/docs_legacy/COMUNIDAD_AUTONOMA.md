# 🇪🇸 ADAPTACIÓN POR COMUNIDAD AUTÓNOMA

## ✅ CAMBIO IMPLEMENTADO

Tu hijo estudia en **Galicia**, así que ahora la app puede adaptar el contenido al currículo autonómico específico.

---

## 🎯 LO QUE SE HA AÑADIDO

### **1. Campo en el Perfil del Estudiante**

**Ubicación:** Perfil del Estudiante → Sección Académica

```
📚 Curso / Grado: 4º Primaria
🇪🇸 Comunidad Autónoma: [Selector con 19 CCAA]
    💡 Importante para generar contenido adaptado al currículo autonómico
```

**Opciones disponibles:**
- Andalucía
- Aragón
- Asturias
- Baleares
- Canarias
- Cantabria
- Castilla-La Mancha
- Castilla y León
- Cataluña
- Comunidad Valenciana
- Extremadura
- **Galicia** ← Para tu hijo
- La Rioja
- Madrid
- Murcia
- Navarra
- País Vasco
- Ceuta
- Melilla

---

### **2. Integración con la IA**

Ahora cuando generes una ficha, la IA recibirá esta información:

**ANTES:**
```
Asignatura: Ciencias de la Naturaleza
Curso: 4º Primaria
Libro: Santillana
```

**AHORA:**
```
Asignatura: Ciencias de la Naturaleza
Curso: 4º Primaria
Libro: Santillana
🇪🇸 COMUNIDAD AUTÓNOMA: Galicia

⚠️ IMPORTANTE: Adapta el contenido al currículo autonómico de Galicia.
Cualquier especificidad regional debe respetarse.
```

---

## 📋 **CÓMO USAR**

### **Paso 1: Configurar el Perfil**

1. Ve a **Perfil del Estudiante**
2. En la sección "Detalles Académicos", selecciona:
   - Nivel: **Primaria**
   - Curso: **4º Primaria**
   - 🇪🇸 Comunidad Autónoma: **Galicia**
3. Guarda el perfil

---

### **Paso 2: Generar Contenido Adaptado**

La IA ahora tendrá en cuenta:

#### **Para Galicia específicamente:**

- **Decreto 155/2022** (currículo gallego)
- **Lengua Gallega** como asignatura propia
- **Orientaciones pedagógicas** gallegas
- **Contenidos contextualizados** a Galicia

#### **Ejemplo de generación:**

```
Asignatura: Ciencias Sociales
Comunidad: Galicia
Tema: Las comunidades autónomas de España

Resultado esperado:
✅ Énfasis en Galicia (geografía, capitales, cultura)
✅ Ríos gallegos (Miño, Sil, etc.)
✅ Referencias al patrimonio gallego
✅ Contenido adaptado al decreto autonómico
```

---

## 🎓 **EJEMPLOS PRÁCTICOS**

### **Ejemplo 1: Ciencias Naturales**

**Sin Comunidad:**
```
Genera preguntas sobre el relieve de España
→ Meseta Central, Sistema Central, Pirineos...
```

**Con Galicia:**
```
Genera preguntas sobre el relieve de España
→ Meseta Central general + ÉNFASIS en:
   - Sierras gallegas (Ancares, Courel)
   - Rías Baixas y Altas
   - Monte Pindo, Cabo Fisterra
   - Costa atlántica gallega
```

---

### **Ejemplo 2: Lengua Castellana**

**Sin Comunidad:**
```
Tema: El adjetivo
→ Ejemplos genéricos
```

**Con Galicia:**
```
Tema: El adjetivo
→ Ejemplos contextualizados:
   "Las verdes montañas gallegas"
   "El frío Océano Atlántico"
   "Los hermosos pazos gallegos"
```

---

### **Ejemplo 3: Ciencias Sociales**

**Sin Comunidad:**
```
Tema: Actividades económicas
→ Agricultura, ganadería, pesca...
```

**Con Galicia:**
```
Tema: Actividades económicas
→ + Pesca en las rías
→ + Mejillón gallego
→ + Sector forestal
→ + Puertos de Vigo y A Coruña
→ + Industria conservera
```

---

## 🔄 **FUTURO: Currículos Autonómicos Específicos**

### **Roadmap (Fases Futuras)**

#### **FASE 1 (ACTUAL) ✅**
- Selector de comunidad autónoma
- IA adapta contexto general
- Ejemplos regionalizados

#### **FASE 2 (Próxima)**
- Cargar **Decreto 155/2022 de Galicia** en BD
- Saberes básicos específicos gallegos
- Criterios de evaluación autonómicos

#### **FASE 3 (Avanzada)**
- Asignatura **Lengua Gallega**
- Contenido bilingüe castellano-gallego
- Patrimonio cultural gallego integrado

---

## 📊 **COMPARATIVA**

| Aspecto | Sin CCAA | Con Galicia |
|---------|----------|-------------|
| **Currículo** | Solo LOMLOE nacional | LOMLOE + Decreto Gallego |
| **Ejemplos** | Genéricos España | Contextualizados Galicia |
| **Geografía** | General España | Énfasis en Galicia |
| **Cultura** | Cultura española | Cultura gallega incluida |
| **Lenguas** | Solo castellano | Castellano + referencias gallego |

---

## 🎯 **PARA TU HIJO (4º Primaria en Galicia)**

### **Configuración Recomendada:**

```
Perfil:
- Nombre: [Tu hijo]
- Curso: 4º Primaria
- 🇪🇸 Comunidad: Galicia
- Intereses: [Sus hobbies]
- Estilo: [Su estilo de aprendizaje]

Generación:
- Asignatura: Ciencias Naturales / Sociales
- Libro: Santillana 4º Primaria
- Observaciones:
  "Tema X del libro.
   Incluir ejemplos de Galicia cuando sea apropiado.
   Adaptar al currículo gallego."
```

**Resultado:**
✅ Contenido LOMLOE oficial  
✅ Adaptado a Galicia  
✅ Ejemplos locales  
✅ Calidad pedagógica  

---

## 📝 **NOTAS IMPORTANTES**

### **1. Base LOMLOE se Mantiene**
- Los **criterios oficiales** siguen siendo LOMLOE
- Las **competencias clave** son nacionales
- La **estructura** es la misma

### **2. Adaptación es Contextual**
- Ejemplos se contextualizan a Galicia
- Referencias geográficas/culturales locales
- Vocabulario adaptado cuando corresponda

### **3. Preparado para el Futuro**
- Sistema diseñado para cargar decretos autonómicos
- Tablas preparadas para saberes básicos gallegos
- Escalable a otras CCAA

---

## ✅ **QUÉ HACER AHORA**

1. **Ejecuta la migración SQL:**
   ```sql
   -- En Supabase SQL Editor:
   -- Ejecuta: migration_autonomous_community.sql
   ```

2. **Configura el perfil:**
   - Entra en "Perfil del Estudiante"
   - Selecciona "Galicia"
   - Guarda

3. **Prueba una generación:**
   - Tema: "Os ríos de Galicia" o "Las comunidades autónomas"
   - Observa cómo la IA contextualiza a Galicia

4. **Feedback:**
   - Prueba varias fichas
   - Observa si el contenido está bien adaptado
   - Ajusta observaciones si es necesario

---

**¡Tu app ahora habla gallego (contextualmente)!** 🇪🇸🎓✨
