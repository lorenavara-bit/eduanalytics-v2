# 🐛 PROBLEMAS DETECTADOS Y SOLUCIONES

## ❌ PROBLEMAS REPORTADOS:

1. **Metadatos LOMLOE no aparecen**
2. **Preguntas de Inglés en español** (deberían estar en inglés)
3. **Comprensión lectora mal**
4. **Duda sobre conexión Supabase**

---

## 🔍 PROBLEMA 1: METADATOS LOMLOE NO APARECEN

### **¿Qué son los metadatos LOMLOE?**

Son información educativa oficial que debería aparecer después de generar una ficha:

```
📚 METADATOS LOMLOE:
━━━━━━━━━━━━━━━━━━━━
Competencias Clave: CCL, CMCT, CD
Saberes Básicos:
- Números decimales: operaciones
- Fracciones equivalentes

Criterios de Evaluación:
- CE.MAT.5P.3: Resolver problemas con fracciones
```

### **¿Por qué no aparecen?**

**CAUSA:** Probablemente **Supabase NO está conectado**

**Verificación:**
1. Abrir tu app
2. F12 → Console
3. Buscar errores como:
   ```
   "Failed to fetch"
   "Supabase client error"
   "Invalid API key"
   ```

### **SOLUCIÓN:**

#### **Opción A: Verificar que .env estaba antes del build**

¿Creaste el archivo `.env` ANTES de hacer `npm run build`?

**Si NO:**

1. **Crear `.env` EN LA RAÍZ del proyecto:**
   ```
   c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2\.env
   ```

2. **Contenido:**
   ```env
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...TU_KEY_COMPLETA  
   VITE_GROQ_API_KEY=gsk_TU_GROQ_KEY
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

4. **Resubir TODO el contenido de dist/ a Hostinger**

---

## 🌐 PROBLEMA 2: INGLÉS EN ESPAÑOL

### **Síntoma:**
Seleccionas "Inglés" pero las preguntas salen en español.

### **CAUSA:**
El prompt de la IA no está recibiendo correctamente que debe generar en inglés.

### **VERIFICACIÓN:**

Abre el archivo: `src/utils/gemini.js`

Busca la función `buildLOMLOEPrompt`

**Debería tener algo como:**
```javascript
if (subject.name === 'Inglés' || subject.name.includes('English')) {
    // Instrucciones para generar EN INGLÉS
}
```

### **SOLUCIÓN TEMPORAL:**

Modificar `src/utils/gemini.js`:

```javascript
// Añadir al inicio del prompt:
const languageInstruction = subject.name.toLowerCase().includes('inglés') || 
                            subject.name.toLowerCase().includes('english')
    ? '\n⚠️ CRITICAL: Generate ALL questions, answers, and feedback IN ENGLISH. This is an English language class.\n'
    : '';

return `
${languageInstruction}
ROL: PROFESOR EXPERTO EN CURRÍCULO LOMLOE
...
```

**Luego:**
1. `npm run build`
2. Resubir a Hostinger

---

## 📖 PROBLEMA 3: COMPRENSIÓN LECTORA MAL

### **¿Qué debería pasar?**

Al seleccionar "Comprensión Lectora" debería:
1. Generar un texto de lectura
2. Hacer preguntas sobre ese texto
3. Mostrar el texto en un recuadro destacado

### **Verificación:**

**Abrir:** `src/components/InteractiveWorksheet.jsx`

**Buscar:**
```javascript
{question.type === 'reading_comprehension' && question.reading_text && (
    <div className="reading-text">
        {question.reading_text}
    </div>
)}
```

**Si NO está:** La funcionalidad no se renderiza correctamente

### **SOLUCIÓN:**

Ver el archivo completo `InteractiveWorksheet.jsx` líneas 98-105 para verificar que está el código de comprensión lectora.

---

## 🔗 PROBLEMA 4: VERIFICAR CONEXIÓN SUPABASE

### **Test rápido:**

**Abrir tu app** → **F12** → **Console**

**Escribir:**
```javascript
// Ver si Supabase está configurado
console.log(import.meta.env.VITE_SUPABASE_URL);
```

**Resultado:**
- Si sale `undefined` → ❌ NO está configurado
- Si sale la URL → ✅ Está configurado

### **Test de conexión:**

**En Console escribir:**
```javascript
// Test de Supabase
fetch('https://TU-PROYECTO.supabase.co/rest/v1/saberes_basicos?select=count', {
    headers: {
        'apikey': 'TU_ANON_KEY',
        'Content-Type': 'application/json'
    }
}).then(r => r.json()).then(d => console.log(d));
```

**Resultado:**
- Si sale `{count: 870}` → ✅ Supabase conecta
- Si sale error → ❌ NO conecta

---

## ✅ SOLUCIÓN COMPLETA PASO A PASO

### **1. Verificar/Crear .env:**

```env
# c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2\.env

VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_GROQ_API_KEY=gsk_...
```

### **2. Fix Inglés en gemini.js:**

Añadir detección de idioma en el prompt

### **3. Verificar InteractiveWorksheet.jsx:**

Que tenga el código de comprensión lectora

### **4. Rebuild:**

```bash
cd c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2
npm run build
```

### **5. Resubir a Hostinger:**

- Borrar todo en `public_html/`
- Subir TODO el contenido de `dist/`
- Verificar que `.htaccess` está ahí

### **6. Configurar CORS en Supabase:**

1. Ir a: https://app.supabase.com
2. Tu proyecto → Settings → API
3. Allowed CORS origins → Añadir:
   ```
   https://saddlebrown-cassowary-435759.hostingersite.com
   ```
4. Guardar

### **7. Limpiar caché del navegador:**

```
Ctrl + Shift + R
```

O modo incógnito para probar

---

## 🎯 PRIORIDAD DE ACCIONES:

### **URGENTE:**

1. ✅ Crear `.env` con credenciales correctas
2. ✅ `npm run build`
3. ✅ Resubir a Hostinger
4. ✅ Configurar CORS en Supabase

### **IMPORTANTE:**

5. ✅ Fix del idioma inglés
6. ✅ Verificar comprensión lectora

---

## 📊 CHECKLIST DE VERIFICACIÓN:

```
[ ] .env existe y tiene credenciales correctas
[ ] npm run build ejecutado DESPUÉS de crear .env
[ ] Contenido de dist/ subido a public_html/
[ ] .htaccess presente en public_html/
[ ] CORS configurado en Supabase
[ ] Caché del navegador limpiado
[ ] Probado en modo incógnito
```

---

## 🆘 SI NADA FUNCIONA:

**Compartir:**
1. Captura de pantalla de Console (F12)
2. Captura de Network tab mostrando llamadas fallidas
3. El contenido de tu archivo `.env` (SIN las keys reales)

---

**¿Empezamos por crear el .env y hacer rebuild?** 🔧
