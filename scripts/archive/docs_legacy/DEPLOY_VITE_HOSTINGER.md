# 🚀 DEPLOY VITE A HOSTINGER - PASO A PASO

## ✅ GUÍA COMPLETA PARA HOSTINGER

---

## 📋 PASO 1: BUILD DE PRODUCCIÓN

### **1.1. Abrir terminal en tu proyecto:**
```bash
cd c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2
```

### **1.2. Hacer el build:**
```bash
npm run build
```

**Esto crea la carpeta `dist/`** con tu app optimizada.

**✅ Verifica que se creó:**
- Mira en tu proyecto
- Debe haber una carpeta `dist/`
- Dentro: `index.html`, `assets/`, etc.

---

## 📁 PASO 2: PREPARAR ARCHIVOS

### **2.1. Crear archivo `.htaccess`**

**Crear un archivo nuevo llamado `.htaccess`** (nota el punto al inicio) con este contenido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # No reescribir archivos o directorios existentes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redirigir todo a index.html
  RewriteRule . /index.html [L]
</IfModule>

# Comprimir archivos para mejor rendimiento
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
</IfModule>
```

**Guardar este archivo `.htaccess` DENTRO de la carpeta `dist/`**

---

## 🌐 PASO 3: SUBIR A HOSTINGER

### **Opción A: File Manager (Más fácil)**

#### **3.1. Entrar a Hostinger:**
1. Ve a: https://www.hostinger.com
2. Login con tu cuenta
3. Ve a: **Hosting** → **Administrar**

#### **3.2. Abrir File Manager:**
1. En el panel de Hostinger
2. Click en **File Manager**
3. Se abrirá una nueva pestaña

#### **3.3. Navegar a la carpeta correcta:**
- Si tu dominio es el principal: `public_html`
- Si es un subdominio: `public_html/subdominio`
- Si es una carpeta: `public_html/eduanalytics`

**IMPORTANTE:** Limpia la carpeta primero:
- Selecciona todo lo que haya
- Click derecho → **Delete**
- Confirma

#### **3.4. Subir los archivos:**

**Método 1: Upload múltiple**
1. Click en **Upload**
2. Arrastra TODOS los archivos de `dist/` (NO la carpeta dist, solo su contenido)
3. Espera a que suban todos

**Método 2: Upload ZIP**
1. Comprime el CONTENIDO de `dist/` en un ZIP
2. Sube el ZIP
3. Click derecho → **Extract**
4. Borra el ZIP

**Tu estructura debe quedar así:**
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── (otros archivos)
```

---

### **Opción B: FTP (Más rápido para archivos grandes)**

#### **3.1. Conseguir datos FTP:**
1. En Hostinger → **Hosting** → **Administrar**
2. Busca sección **FTP Accounts**
3. Anota:
   - Hostname (ej: `ftp.tudominio.com`)
   - Username (ej: `u123456789`)
   - Password (créalo si no tienes)
   - Port: `21`

#### **3.2. Usar cliente FTP:**

**Con FileZilla (recomendado):**
1. Descargar: https://filezilla-project.org/
2. Instalar
3. Conectar:
   - Host: `ftp.tudominio.com`
   - Usuario: `u123456789`
   - Contraseña: la que creaste
   - Puerto: `21`
4. En panel derecho: navegar a `public_html`
5. En panel izquierdo: navegar a tu carpeta `dist/`
6. Seleccionar TODO el contenido de `dist/`
7. Arrastrar al panel derecho
8. Esperar a que suba

---

## 🔑 PASO 4: CONFIGURAR VARIABLES DE ENTORNO

**PROBLEMA:** Vite usa variables de entorno que no se suben al build.

**SOLUCIÓN:** Hay 2 opciones:

### **Opción A: Hardcodear en el código (NO recomendado pero funciona)**

1. Abrir `src/utils/gemini.js` (o donde uses las env vars)
2. Reemplazar:
   ```javascript
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
   ```
   Por:
   ```javascript
   const SUPABASE_URL = "https://tu-proyecto.supabase.co";
   ```

3. Rebuild: `npm run build`
4. Subir de nuevo

### **Opción B: Usar .env.production (Recomendado)**

1. **Crear archivo `.env.production` en la raíz:**
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   VITE_GROQ_API_KEY=tu_groq_key
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```
   Esto compilará las variables EN el build

3. **Subir el nuevo dist/**

---

## ✅ PASO 5: VERIFICAR QUE FUNCIONA

### **5.1. Abrir tu dominio:**
```
https://tudominio.com
```

### **5.2. Checklist:**
- [ ] La página carga (no error 404 o 500)
- [ ] No hay errores en consola (F12 → Console)
- [ ] Los estilos se ven bien
- [ ] Las imágenes cargan
- [ ] Puedes navegar entre páginas

### **5.3. Si ves "white screen" (pantalla blanca):**

**Abrir consola (F12) y buscar errores:**

**Error común: "Failed to load module"**
```
Solución: Verificar que .htaccess está subido
```

**Error: "VITE_SUPABASE_URL is undefined"**
```
Solución: Configurar variables de entorno (Paso 4)
```

**Error: "404 Not Found" al recargar**
```
Solución: Verificar .htaccess y mod_rewrite
```

---

## 🐛 TROUBLESHOOTING

### **Problema 1: Página en blanco**

**Solución:**
1. Abrir consola (F12)
2. Ver qué error aparece
3. Verificar que:
   - `.htaccess` está en `public_html/`
   - Variables de entorno configuradas
   - Archivos subidos correctamente

### **Problema 2: 404 al recargar**

**Solución:**
1. Verificar `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

2. Si mod_rewrite no está activado:
   - Contactar soporte Hostinger
   - Pedir activar mod_rewrite

### **Problema 3: Estilos no cargan**

**Solución:**
1. Verificar ruta en `index.html`
2. Si usa rutas absolutas (`/assets/...`), debe funcionar
3. Si usa rutas relativas, cambiar a absolutas

### **Problema 4: Supabase no conecta**

**Solución:**
1. Verificar variables de entorno
2. Abrir consola (F12) → Network
3. Ver llamadas a Supabase
4. Verificar CORS en Supabase:
   - Settings → API → Allowed Origins
   - Añadir: `https://tudominio.com`

---

## 📊 PASO 6: VERIFICACIÓN FINAL

### **Checklist completo:**

```
✅ Build realizado (npm run build)
✅ Carpeta dist/ creada
✅ .htaccess creado y subido
✅ Archivos subidos a public_html/
✅ Variables de entorno configuradas
✅ Página carga en tudominio.com
✅ No hay errores en consola
✅ Navegación funciona
✅ Login funciona
✅ Géneration de fichas funciona
✅ Supabase conecta correctamente
```

---

## 🎯 EJEMPLO COMPLETO

### **Tu estructura en Hostinger debe ser:**

```
public_html/
├── index.html                    ← Archivo principal
├── .htaccess                     ← Configuración Apache
├── vite.svg                      ← Favicon
├── assets/
│   ├── index-abc123.js           ← JavaScript compilado
│   ├── index-def456.css          ← CSS compilado
│   └── logo-xyz789.png           ← Imágenes
└── (otros archivos del build)
```

**NO debe haber:**
- ❌ Carpeta `dist/`
- ❌ Carpeta `src/`
- ❌ Carpeta `node_modules/`
- ❌ Archivos `.jsx`
- ❌ `package.json`

---

## 🚀 COMANDOS RÁPIDOS

### **Rebuild y resubir:**
```bash
# 1. Rebuild
npm run build

# 2. Subir por FTP o File Manager
# (copiar contenido de dist/ a public_html/)
```

### **Verificar build local:**
```bash
# Previsualizar el build
npm run preview
```
Abre: `http://localhost:4173`

---

## 💡 TIPS PRO

### **1. Usar subdominio para testing:**
```
Crear: test.tudominio.com
Probar ahí primero
Luego mover a dominio principal
```

### **2. Mantener backups:**
```
Antes de subir nuevo build:
1. Descargar actual por FTP
2. Guardar en carpeta "backups"
3. Subir nuevo
```

### **3. Caché del navegador:**
```
Si no ves cambios:
Ctrl + Shift + R (hard refresh)
O modo incógnito
```

---

## ⏱️ TIEMPO ESTIMADO

- Build: **1-2 minutos**
- Subir archivos: **3-5 minutos** (FTP) o **5-10 min** (File Manager)
- Configuración: **2-3 minutos**
- Verificación: **5 minutos**

**TOTAL: ~15-20 minutos** ⚡

---

## 📞 SOPORTE HOSTINGER

Si tienes problemas:
1. **Chat en vivo:** Disponible 24/7
2. **Tickets:** Desde el panel
3. **Knowledge Base:** https://support.hostinger.com

Pregunta común: **"¿Cómo activar mod_rewrite?"**

---

## ✅ CHECKLIST FINAL

```
[ ] Build realizado
[ ] .htaccess creado
[ ] Variables de entorno configuradas
[ ] Archivos subidos a Hostinger
[ ] Página carga sin errores
[ ] Todas las funciones probadas
[ ] CORS configurado en Supabase
[ ] Backup del código realizado
```

---

## 🎉 ¡LISTO!

Tu app Vite ya está en Hostinger y funcionando.

**URL:** `https://tudominio.com`

**¡A DISFRUTAR!** 🚀🎊

---

**Última actualización:** 10 diciembre 2025  
**Versión:** Vite + Hostinger  
**Estado:** ✅ FUNCIONAL
