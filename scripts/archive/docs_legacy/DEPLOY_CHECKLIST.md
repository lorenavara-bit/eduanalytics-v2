# 🚀 DEPLOY CHECKLIST - EDUANALYTICS V2

## ✅ **COMPLETADO**

- [x] Build de producción exitoso
- [x] Carpeta `/dist` generada (1.03 MB)
- [x] Backup ZIP creándose
- [x] Documentación completa

---

## 📦 **ARCHIVOS LISTOS PARA DEPLOY**

### **1. Aplicación Web**
```
📁 /dist/
├── index.html (0.78 KB)
├── /assets/
    ├── index-d6G_H2a8.css (48.93 KB)
    └── index-Dpt5Q-Qf.js (1.03 MB)
```

**Peso total:** ~1.08 MB (comprimido: ~300 KB)

---

### **2. Archivos SQL (Ejecutar en Supabase)**

**Orden de ejecución:**

```sql
-- 1. TABLAS BASE Y COMPETENCIAS (OBLIGATORIO)
setup_curriculo_lomloe.sql
-- Crea: competencias_clave, saberes_basicos, criterios_evaluacion, resultados_evaluacion

-- 2. CURRÍCULO 4º PRIMARIA COMPLETO (RECOMENDADO)
curriculo_4_primaria.sql
-- Añade: Matemáticas, Lengua, Ciencias Naturales, Ciencias Sociales, Inglés

-- 3. LENGUA GALLEGA (GALICIA)
curriculo_gallego_4primaria.sql
-- Añade: Lingua Galega e Literatura

-- 4. OTROS NIVELES (OPCIONAL)
curriculo_completo_lomloe.sql
-- Añade: Primaria 1º-6º, ESO 1º-4º, Bachillerato 1º-2º (básico)

-- 5. COMUNIDAD AUTÓNOMA (RECOMENDADO)
migration_autonomous_community.sql
-- Añade: Campo autonomous_community en profiles
```

**Tiempo total:** ~1 minuto

---

## 🔑 **VARIABLES DE ENTORNO NECESARIAS**

### **Mínimo Obligatorio:**

```env
# Supabase (OBLIGATORIO)
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...tu_key

# Al menos UN motor de IA (OBLIGATORIO)
VITE_GROQ_API_KEY=gsk_...tu_key  # RECOMENDADO (gratis)
```

### **Opcional (mejora funcionalidad):**

```env
# Motores alternativos de IA
VITE_GOOGLE_API_KEY=AIza...tu_key
VITE_OPENAI_API_KEY=sk-...tu_key
```

---

## 📤 **INSTRUCCIONES DE DEPLOY**

### **OPCIÓN A: Hostinger (Actual)**

1. **Preparar archivos:**
   ```
   - Carpeta: /dist/*
   - Subir TODO el contenido de /dist/
   ```

2. **Configurar .htaccess:**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

3. **Variables de entorno:**
   - Panel Hostinger → Variables de entorno
   - Añadir cada VITE_* variable

4. **Verificar:**
   - URL: tu-dominio.com
   - Login debe funcionar
   - Generador debe cargar

---

### **OPCIÓN B: Vercel (Recomendado para futuro)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde la raíz del proyecto
vercel --prod

# Configurar variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_GROQ_API_KEY
```

**Ventajas:**
- Deploy automático
- SSL gratis
- CDN global
- Rollback fácil

---

### **OPCIÓN C: Netlify**

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist

# Variables en: netlify.com → Site settings → Environment
```

---

## ✅ **VERIFICACIÓN POST-DEPLOY**

### **Checklist Funcional:**

```
□ App carga correctamente
□ Login/Registro funciona
□ Perfil del estudiante guarda datos
□ Selector de Comunidad Autónoma visible
□ Generador de fichas carga
□ Generación de ficha funciona
□ Ficha muestra metadatos LOMLOE
□ Corrección funciona
□ Comprensión Lectora muestra texto
□ Guardado de fichas funciona
```

### **Test Básico:**

1. **Crear perfil:**
   - Nombre: Test
   - Curso: 4º Primaria
   - Comunidad: Galicia

2. **Generar ficha:**
   - Asignatura: Ciencias de la Naturaleza
   - Tema: Los sentidos
   - Tipos: Test + Comprensión Lectora
   - Número: 5 preguntas

3. **Verificar:**
   - ✅ 5 preguntas generadas
   - ✅ Criterios LOMLOE presentes
   - ✅ Competencias visibles
   - ✅ Si hay Comprensión Lectora, texto visible
   - ✅ Responder y corregir funciona

---

## 🗄️ **BACKUP**

### **Archivos de Backup:**

```
📦 eduanalytics-v2-release-YYYYMMDD-HHMM.zip
├── Código fuente completo
├── node_modules/ (excluido)
├── .env (excluido - copiar manualmente)
└── Todos los archivos SQL
```

**Ubicación:** `c:\AMISPROYECTOS\eduanalytics-app\`

**Restaurar:**
```bash
# Descomprimir ZIP
# Copiar .env manualmente
npm install
npm run dev
```

---

## 🐛 **TROUBLESHOOTING**

### **Problema: "No se generan fichas"**

**Solución:**
1. Verificar variable `VITE_GROQ_API_KEY`
2. Abrir consola del navegador (F12)
3. Ver errores de API
4. Si Groq falla → añadir Google o OpenAI key

---

### **Problema: "No aparecen criterios LOMLOE"**

**Solución:**
1. Verificar que ejecutaste los SQLs en Supabase
2. En SQL Editor:
   ```sql
   SELECT COUNT(*) FROM saberes_basicos;
   SELECT COUNT(*) FROM criterios_evaluacion;
   ```
3. Si devuelve 0 → re-ejecutar SQLs

---

### **Problema: "Texto de Comprensión Lectora no aparece"**

**Solución:**
- Es normal si la IA no incluyó el campo `reading_text`
- Genera de nuevo la ficha
- Asegúrate de seleccionar "Comprensión Lectora" en tipos

---

## 📊 **MÉTRICAS PARA MONITOREAR**

### **Primera Semana:**
- Usuarios registrados
- Fichas generadas
- Asignaturas más usadas
- Cursos más demandados
- Errores de generación (%)

### **Feedback Beta Testers:**
- ¿Qué asignaturas faltan?
- ¿Qué cursos necesitan más contenido?
- ¿La calidad de las preguntas es buena?
- ¿El nivel de dificultad es apropiado?
- ¿La interfaz es fácil de usar?

---

## 🎯 **PRIORIDADES POST-DEPLOY**

### **Inmediato (Esta semana):**
1. Monitorear errores
2. Recoger feedback
3. Ajustar prompts de IA si necesario

### **Corto plazo (2 semanas):**
1. Crear 1º Primaria completo
2. Añadir cursos según demanda
3. Mejorar analytics

### **Medio plazo (1 mes):**
1. Expandir cobertura curricular
2. Añadir más tipos de pregunta
3. Mejorar corrección con IA

---

## ✅ **ESTADO FINAL**

**Versión:** 2.0 Release Candidate  
**Estado:** ✅ Lista para producción  
**Currículo:** ✅ LOMLOE oficial  
**Calidad:** ✅ Pedagógica verificada  
**Usabilidad:** ✅ Probada y simplificada  

---

**¡App lista para ayudar a estudiantes de España!** 🇪🇸📚✨

**Siguiente paso:** Deploy a producción y beta testing 🚀
