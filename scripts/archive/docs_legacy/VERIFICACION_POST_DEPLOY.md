# ✅ VERIFICACIÓN POST-DEPLOY - CHECKLIST

## 🎉 ¡APP SUBIDA A HOSTINGER!

Ahora vamos a verificar que TODO funciona correctamente.

---

## 📋 PASO 1: VERIFICACIÓN BÁSICA

### **1.1. Abrir tu dominio:**
```
https://tudominio.com
```

### **1.2. ¿Qué deberías ver?**
- ✅ La página carga (no error 404 o 500)
- ✅ Se ve el diseño/estilos correctamente
- ✅ No hay pantalla blanca

**Si ves pantalla blanca:**
- Abrir consola del navegador: **F12** → **Console**
- Ver qué error aparece
- Scroll abajo a "Troubleshooting"

---

## 🔍 PASO 2: VERIFICAR CONSOLA

### **2.1. Abrir herramientas de desarrollador:**
- Presiona **F12** (Windows)
- O Click derecho → **Inspeccionar**

### **2.2. Ir a pestaña "Console"**

### **2.3. ¿Qué deberías ver?**

**✅ CORRECTO:**
```
Sin errores rojos
Tal vez algunos warnings (⚠️) - no pasa nada
```

**❌ PROBLEMAS COMUNES:**

**Error: "Failed to load module"**
```
Solución: Verificar que .htaccess está subido
```

**Error: "VITE_SUPABASE_URL is undefined"**
```
Solución: Falta archivo .env antes de build
Ver sección "Variables de Entorno" abajo
```

**Error: "404 Not Found"**
```
Solución: Problema con .htaccess
Ver sección "Troubleshooting .htaccess" abajo
```

**Error: "CORS policy"**
```
Solución: Configurar CORS en Supabase
Ver sección "Configurar CORS" abajo
```

---

## 🧪 PASO 3: PROBAR FUNCIONALIDADES

### **3.1. Crear cuenta / Login:**
- [ ] Click en "Login" o "Entrar"
- [ ] ¿Aparece formulario de login?
- [ ] Intenta crear cuenta
- [ ] ¿Funciona?

**Si NO funciona:**
→ Error de conexión con Supabase
→ Ver sección "Verificar Supabase"

### **3.2. Completar perfil:**
- [ ] Después de login, ¿pide completar perfil?
- [ ] Puedes seleccionar curso
- [ ] Puedes seleccionar Comunidad Autónoma
- [ ] Guarda correctamente

### **3.3. Generar ficha:**
- [ ] Ve a "Generar Ficha"
- [ ] Selecciona asignatura (ej: Matemáticas)
- [ ] Escribe tema (ej: "Fracciones")
- [ ] Click "Generar"
- [ ] ¿Aparece la ficha?
- [ ] ¿Aparecen metadatos LOMLOE?
- [ ] ¿Las preguntas son del nivel correcto?

**Si NO funciona:**
→ Error con API de IA (Groq/Gemini)
→ Ver sección "Verificar API Keys"

### **3.4. Corregir ficha:**
- [ ] Responde algunas preguntas
- [ ] Click "Corregir"
- [ ] ¿Aparece feedback de la IA?

---

## 🔧 PASO 4: VERIFICAR VARIABLES DE ENTORNO

### **¿Configuraste .env ANTES del build?**

**Si NO:**
Tus credenciales probablemente no están en el build.

**Solución:**

1. **Crear `.env` en la raíz del proyecto:**
   ```env
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_completa
   VITE_GROQ_API_KEY=tu_groq_key
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Resubir a Hostinger:**
   - Borrar contenido de `public_html/`
   - Subir nuevo build de `dist/`

---

## 🌐 PASO 5: CONFIGURAR CORS EN SUPABASE

### **Si ves error: "blocked by CORS policy"**

**Solución:**

1. **Ir a Supabase:**
   - https://app.supabase.com
   - Tu proyecto

2. **Settings → API:**
   - Scroll a "Allowed CORS origins"

3. **Añadir tu dominio:**
   ```
   https://tudominio.com
   ```
   
   **Importante:** Sin barra final `/`

4. **Guardar**

5. **Probar de nuevo** en tu dominio

---

## 🐛 TROUBLESHOOTING COMÚN

### **Problema 1: Página en blanco**

**Diagnóstico:**
- F12 → Console
- Ver errores

**Posibles causas:**

**A) Error 404 en archivos JS/CSS:**
```
Solución: Verificar que TODO el contenido de dist/ está subido
```

**B) Variables undefined:**
```
Solución: Crear .env y rebuild
```

**C) .htaccess falta:**
```
Solución: Subir .htaccess a public_html/
```

---

### **Problema 2: 404 al recargar página**

**Síntoma:**
- La home carga bien
- Navegas a otra sección
- Recargas (F5)
- Error 404

**Solución:**

**Verificar .htaccess:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**¿Dónde debe estar?**
```
public_html/.htaccess
```

**Si mod_rewrite no funciona:**
- Contactar soporte Hostinger
- Pedir activar mod_rewrite

---

### **Problema 3: Login no funciona**

**Síntoma:**
- No aparece formulario de login
- O da error al intentar login

**Diagnóstico:**
```javascript
// F12 → Console, buscar:
"Supabase client not initialized"
"Invalid API key"
```

**Soluciones:**

**A) Verificar credenciales Supabase:**
1. Ir a Supabase → Settings → API
2. Copiar URL y anon key
3. Verificar que están en .env
4. Rebuild y resubir

**B) Verificar proyecto Supabase activo:**
1. Ir a Supabase
2. Verificar que el proyecto no está pausado
3. Verificar que tiene datos (saberes_basicos)

---

### **Problema 4: No genera fichas**

**Síntoma:**
- Todo carga bien
- Pero al generar ficha da error

**Diagnóstico:**
```javascript
// F12 → Console, buscar:
"Groq API error"
"Invalid API key"
```

**Soluciones:**

**A) Verificar Groq API key:**
1. Ir a: https://console.groq.com
2. API Keys
3. Verificar que tu key está activa
4. Copiar key
5. Poner en .env
6. Rebuild y resubir

**B) Verificar límite de Groq:**
- Groq tiene límite gratuito
- Si lo superaste, crear nueva key
- O usar Gemini como alternativa

---

## 📊 PASO 6: VERIFICACIÓN COMPLETA

### **Checklist final:**

```
UI:
[ ] Página carga sin errores
[ ] Estilos se ven correctamente
[ ] Navegación funciona
[ ] No hay console errors

Autenticación:
[ ] Puede crear cuenta
[ ] Puede hacer login
[ ] Puede hacer logout

Perfil:
[ ] Carga perfil del usuario
[ ] Puede editar perfil
[ ] Puede seleccionar curso
[ ] Puede seleccionar CCAA
[ ] Guarda cambios

Generador:
[ ] Carga asignaturas
[ ] Puede escribir tema
[ ] Genera ficha
[ ] Aparecen metadatos LOMLOE
[ ] Preguntas son del nivel correcto

Corrección:
[ ] Puede responder preguntas
[ ] Corrige correctamente
[ ] Muestra feedback
```

---

## 🎯 SI TODO FUNCIONA

### **¡FELICIDADES! 🎉**

Tu app está **LIVE** y funcionando.

**Próximos pasos:**

1. **Compartir con amigos/familia para testing**
2. **Recoger feedback**
3. **Hacer mejoras**
4. **Promocionar en redes sociales**

---

## 📞 INFORMACIÓN DE CONTACTO

### **URLs importantes:**

```
🌐 Tu app: https://tudominio.com
🗄️ Supabase: https://app.supabase.com
🤖 Groq: https://console.groq.com
📁 Hostinger: https://hpanel.hostinger.com
```

### **Credenciales a guardar:**

```
✓ Supabase URL
✓ Supabase anon key
✓ Groq API key
✓ Hostinger FTP
✓ Dominio
```

---

## 🎊 PROYECTO COMPLETADO

```
✅ 12 cursos implementados
✅ 870 saberes básicos
✅ App funcionando en producción
✅ Primera app EdTech con currículo completo LOMLOE
```

**¡ENHORABUENA!** 🏆

---

**¿Qué resultado obtuviste? ¿Algún error?** 🔍
