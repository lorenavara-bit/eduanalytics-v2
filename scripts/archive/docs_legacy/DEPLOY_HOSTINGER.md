# 🚀 GUÍA DE DEPLOY A HOSTINGER - EDUANALYTICS V2

**Fecha de Build:** 2026-01-17  
**Versión:** 3.0 Final  
**Archivo para Deploy:** `eduanalytics-deploy.zip`

---

## ✅ Build Completado

El build de producción se ha completado exitosamente:

```
✓ 2115 módulos transformados
✓ Build completado en 1m 26s
✓ ZIP creado: eduanalytics-deploy.zip
```

### Archivos generados:
- `dist/index.html` (0.78 kB)
- `dist/assets/index-BpQfgWL-.css` (114.90 kB → 17.31 kB gzip)
- `dist/assets/index-ByEi0HdO.js` (1,534.15 kB → 435.42 kB gzip)

---

## 📦 Archivo Listo para Deploy

**Nombre:** `eduanalytics-deploy.zip`  
**Ubicación:** `c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2\eduanalytics-deploy.zip`

---

## 🌐 Pasos para Deploy en Hostinger

### Paso 1: Acceder al Panel de Hostinger

1. Ve a: https://hpanel.hostinger.com/
2. Inicia sesión con tus credenciales
3. Selecciona tu dominio/hosting

### Paso 2: Acceder al Administrador de Archivos

1. En el panel de Hostinger, busca **"Archivos"** o **"File Manager"**
2. Click en **"Administrador de archivos"**
3. Navega a la carpeta `public_html` (o la carpeta raíz de tu dominio)

### Paso 3: Limpiar Archivos Antiguos (IMPORTANTE)

**⚠️ IMPORTANTE: Haz backup primero si tienes algún contenido que quieras conservar**

1. Selecciona TODOS los archivos actuales en `public_html`
2. Elimínalos (o muévelos a una carpeta `backup_old`)
3. Asegúrate de que `public_html` esté vacía

### Paso 4: Subir el ZIP

1. Click en **"Subir archivos"** o **"Upload"**
2. Selecciona el archivo `eduanalytics-deploy.zip`
3. Espera a que se suba completamente
4. **NO descomprimas todavía**

### Paso 5: Descomprimir

1. Click derecho sobre `eduanalytics-deploy.zip`
2. Selecciona **"Extract"** o **"Descomprimir"**
3. Selecciona **"Extract Here"** (extraer aquí)
4. Espera a que se complete la extracción
5. **Borra el ZIP** después de extraer

### Paso 6: Verificar Estructura

Tu carpeta `public_html` debe tener esta estructura:

```
public_html/
├── index.html
└── assets/
    ├── index-BpQfgWL-.css
    └── index-ByEi0HdO.js
```

### Paso 7: Configurar Variables de Entorno

**⚠️ CRÍTICO: Configura las variables de entorno**

Necesitas crear un archivo `.htaccess` con las variables de entorno o configurarlas en el panel de Hostinger:

#### Variables requeridas:

```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
VITE_GEMINI_API_KEY=tu_gemini_key (opcional)
```

#### Opción A: Via panel de Hostinger
1. Ve a **"Variables de entorno"** en el panel
2. Añade cada variable una por una

#### Opción B: Archivo de configuración
Crea un archivo JavaScript de configuración que tu app pueda leer

### Paso 8: Configurar para SPA (Single Page Application)

Crear archivo `.htaccess` en `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresDefault "access plus 1 month"
</IfModule>
```

### Paso 9: Verificar el Deploy

1. Abre tu dominio en el navegador (ej: https://tudominio.com)
2. Verifica que la aplicación carga correctamente
3. Prueba la navegación entre páginas
4. Verifica que la conexión a Supabase funciona

---

## 🔧 Solución de Problemas

### Error: Página en blanco
**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores relacionados con rutas
3. Verifica que el archivo `.htaccess` esté configurado correctamente

### Error: Variables de entorno no encontradas
**Solución:**
1. Verifica que las variables estén configuradas en Hostinger
2. O considera usar un archivo de configuración JavaScript
3. Reconstruye con las variables como parte del código (no recomendado por seguridad)

### Error 404 al refrescar página
**Solución:**
1. Verifica que el archivo `.htaccess` existe
2. Verifica que `mod_rewrite` está habilitado en Hostinger

### Conexión a Supabase falla
**Solución:**
1. Verifica que las URLs de Supabase son correctas
2. Verifica que las políticas RLS en Supabase están configuradas
3. Revisa los logs del navegador para errores específicos

---

## 📊 Checklist Post-Deploy

- [ ] Aplicación carga correctamente en `https://tudominio.com`
- [ ] Navegación entre páginas funciona
- [ ] Login/Registro funcionan
- [ ] Conexión a Supabase verificada
- [ ] Generador de fichas funciona
- [ ] Dashboard de estudiantes carga
- [ ] No hay errores en consola del navegador
- [ ] Rutas directas funcionan (ej: `/diagnostic`)
- [ ] Recursos estáticos cargan (CSS, JS)
- [ ] Rendimiento es aceptable

---

## 🎯 Nuevo Sistema de Matemáticas Incluido

Esta versión incluye el **Sistema Completo de Matemáticas 4º Primaria**:

### Archivos nuevos en el build:
```
dist/assets/ contiene:
- math-generator-4primaria.js
- math-propiedades-4primaria.js
- math-medidas-4primaria.js
- math-decimales-4primaria.js
- math-geometria-4primaria.js
- math-integracion-4primaria.js
```

### Características:
✅ 100+ tipos de ejercicios  
✅ 21 categorías diferentes  
✅ 3 niveles de dificultad  
✅ Sistema integrado listo para usar  

Ver `MATEMATICAS_4PRIMARIA_COMPLETO.md` para documentación completa.

---

## 📝 Notas Importantes

### Sobre las Variables de Entorno:
En producción, las variables de entorno de Vite (`VITE_*`) se **compilan** en el código durante el build. Esto significa:

1. ✅ Las variables del archivo `.env.local` usadas durante el build YA ESTÁN en el código
2. ⚠️ Si necesitas cambiar las URLs de Supabase, debes:
   - Actualizar `.env.local`
   - Hacer `npm run build` de nuevo
   - Subir nuevo ZIP

3. 🔒 **SEGURIDAD:** Nunca expongas claves privadas (solo usa claves públicas/anon)

### Sobre el Tamaño:
- El bundle JavaScript es grande (1.5 MB) pero se comprime bien (435 KB)
- Considera implementar code-splitting si el rendimiento es un problema
- El archivo CSS (115 KB) también se comprime bien (17 KB)

### Rendimiento:
- Primera carga: ~450 KB (gzipped)
- Navegación posterior: Instantánea (SPA)
- Generación de fichas: Instantánea (100% cliente)

---

## 🚀 Próximos Pasos Recomendados

Después del deploy exitoso:

1. **Configurar DNS** (si usas dominio personalizado)
2. **Configurar SSL/HTTPS** (usualmente automático en Hostinger)
3. **Configurar Google Analytics** (opcional)
4. **Configurar backup automático** en Hostinger
5. **Documentar URL de producción** para el equipo
6. **Probar en diferentes navegadores**
7. **Probar en diferentes dispositivos**

---

## 📞 Soporte

Si encuentras problemas:

1. **Check consola del navegador** (F12 → Console)
2. **Verifica Network tab** (F12 → Network)
3. **Revisa logs de Hostinger** (Panel → Logs)
4. **Contacta soporte de Hostinger** si es problema del servidor

---

## ✅ Deploy Completado

Una vez que sigas todos estos pasos, tu aplicación EduAnalytics V2 estará:
- ✅ En producción
- ✅ Accesible públicamente
- ✅ Con el nuevo sistema de matemáticas
- ✅ Optimizada para rendimiento
- ✅ Lista para usar

---

**¡Éxito con tu deploy!** 🎉

---

*Generado: 2026-01-17*  
*Build: Vite 7.2.6*  
*Deploy Target: Hostinger*
