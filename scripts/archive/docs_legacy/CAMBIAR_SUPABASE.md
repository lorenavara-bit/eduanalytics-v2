# 🔧 CAMBIAR CREDENCIALES SUPABASE

## ✅ GUÍA PASO A PASO

---

## 📋 PASO 1: CONSEGUIR NUEVAS CREDENCIALES

### **1.1. Ir a tu proyecto Supabase:**
1. Ve a: https://app.supabase.com
2. Login
3. Selecciona tu proyecto (el que tiene los 12 cursos cargados)

### **1.2. Conseguir las credenciales:**
1. Ve a: **Settings** (⚙️ abajo izquierda)
2. Click en: **API**
3. Encontrarás:

   **Project URL:**
   ```
   https://xxx.supabase.co
   ```
   
   **Project API Keys:**
   - `anon` `public` (esta es la que necesitas)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### **1.3. Copiar ambos valores**
- Project URL
- anon key (la pública)

---

## 📝 PASO 2: CREAR ARCHIVO .env

### **2.1. Crear archivo `.env` en la raíz del proyecto:**

Ubicación: `c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2\.env`

**Contenido:**
```env
# Supabase
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TU_ANON_KEY_COMPLETA

# Groq (IA principal - gratis)
VITE_GROQ_API_KEY=gsk_TU_GROQ_KEY_AQUI

# Gemini (IA alternativa - gratis) - OPCIONAL
VITE_GEMINI_API_KEY=TU_GEMINI_KEY

# OpenAI (IA alternativa - de pago) - OPCIONAL
VITE_OPENAI_API_KEY=sk-TU_OPENAI_KEY
```

**Reemplaza:**
- `TU-PROYECTO` con tu URL real
- `TU_ANON_KEY_COMPLETA` con la key completa de Supabase
- `TU_GROQ_KEY_AQUI` con tu key de Groq

---

## 🔑 PASO 3: CONSEGUIR GROQ API KEY (GRATIS)

Si no tienes:

1. **Ir a:** https://console.groq.com
2. **Signup/Login** (gratis)
3. **API Keys** → **Create API Key**
4. **Copiar** la key (empieza con `gsk_`)
5. **Pegar** en `.env`

**Groq es GRATIS y muy rápido** ⚡

---

## 🔄 PASO 4: REBUILD CON NUEVAS CREDENCIALES

### **4.1. Borrar build anterior:**
```bash
rm -r dist
```

o simplemente elimina la carpeta `dist/`

### **4.2. Rebuild:**
```bash
npm run build
```

Esto creará nuevo `dist/` con las credenciales correctas

---

## ✅ PASO 5: VERIFICAR QUE FUNCIONA LOCAL

### **5.1. Probar en desarrollo:**
```bash
npm run dev
```

Abre: `http://localhost:5173`

### **5.2. Verificar:**
- [ ] Login funciona
- [ ] Perfil carga
- [ ] Generador de fichas funciona
- [ ] No hay errores en consola (F12)

### **5.3. Si funciona:**
✅ Las credenciales son correctas
✅ Puedes hacer deploy

---

## 🚀 PASO 6: DEPLOY A HOSTINGER

Ahora con las credenciales correctas:

1. **Build realizado** (Paso 4.2)
2. **Subir a Hostinger:**
   - Todo el contenido de `dist/`
   - A `public_html/`

---

## 🔍 VERIFICAR QUÉ PROYECTO SUPABASE TIENES

### **Método 1: Ver datos en Supabase**

1. Ve a tu proyecto Supabase
2. **Table Editor**
3. Busca tabla `saberes_basicos`
4. **Ejecuta:**
   ```sql
   SELECT COUNT(*) FROM saberes_basicos;
   ```

**Resultado esperado:**
- Si dice `~870` → ✅ Es el correcto (12 cursos)
- Si dice `0` o menos → ❌ Es el antiguo

### **Método 2: Ver qué cursos tienes**

```sql
SELECT 
    CASE 
        WHEN curso LIKE '%Primaria%' THEN 'PRIMARIA'
        WHEN curso LIKE '%ESO%' THEN 'ESO'
        WHEN curso LIKE '%Bachillerato%' THEN 'BACHILLERATO'
    END as etapa,
    COUNT(DISTINCT curso) as cursos
FROM saberes_basicos
GROUP BY etapa;
```

**Resultado esperado:**
```
PRIMARIA:      6 cursos
ESO:           4 cursos
BACHILLERATO:  2 cursos
```

---

## 🆕 OPCIÓN: CREAR NUEVO PROYECTO SUPABASE

Si tu proyecto actual está mezclado con el antiguo:

### **Crear proyecto limpio:**

1. **Ir a Supabase:** https://app.supabase.com
2. **New Project**
3. **Nombre:** `eduanalytics-v2-final`
4. **Database Password:** (guárda la!)
5. **Region:** `Central EU` (más cerca de España)
6. **Create Project** (tarda 2 minutos)

### **Ejecutar SQLs en orden:**

1. `setup_curriculo_lomloe_LIMPIO.sql`
2. Todos los `curriculo_X_primaria.sql` (6)
3. Todos los `curriculo_gallego_Xprimaria.sql` (6)
4. Todos los `curriculo_X_eso.sql` (4)
5. Todos los `curriculo_gallego_Xeso.sql` (4)
6. Todos los `curriculo_X_bachillerato.sql` (2)
7. Todos los `curriculo_gallego_Xbachillerato.sql` (2)
8. `migration_autonomous_community.sql`

**Total: 26 archivos SQL**

### **Verificar:**
```sql
SELECT COUNT(*) FROM saberes_basicos;
-- Debe dar ~870
```

### **Actualizar .env:**
```env
VITE_SUPABASE_URL=https://NUEVO-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=nueva_anon_key
```

---

## 📊 COMPARATIVA

| Opción | Ventajas | Desventajas |
|--------|----------|-------------|
| **Usar proyecto existente** | Ya tienes datos | Puede tener cosas viejas |
| **Crear proyecto nuevo** | Limpio 100% | Tienes que ejecutar 26 SQLs |

**Recomendación:** 
- Si tu proyecto actual tiene los 870 saberes → **Usar existente**
- Si tiene menos o datos mezclados → **Crear nuevo**

---

## 🐛 TROUBLESHOOTING

### **Error: "No se conecta a Supabase"**

**Solución:**
1. Verificar URL en `.env`
2. Verificar anon key completa
3. Rebuild: `npm run build`

### **Error: "Failed to fetch"**

**Solución:**
1. Verificar proyecto Supabase está activo
2. Verificar CORS en Supabase:
   - Settings → API → Allowed Origins
   - Añadir: `http://localhost:5173`
   - Añadir: `https://tudominio.com`

### **Error: "Table not found"**

**Solución:**
1. Ejecutar `setup_curriculo_lomloe_LIMPIO.sql`
2. Verificar tablas creadas en Table Editor

---

## ✅ CHECKLIST FINAL

```
[ ] Proyecto Supabase identificado
[ ] Credenciales copiadas (URL + anon key)
[ ] Archivo .env creado
[ ] Groq API key conseguida
[ ] npm run build ejecutado
[ ] Probado en localhost:5173
[ ] Login funciona
[ ] Datos se cargan correctamente
[ ] Listo para deploy
```

---

## 💡 TIP PRO

**Mantén dos archivos:**

`.env` - Para desarrollo local
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_GROQ_API_KEY=xxx
```

`.env.production` - Para producción (mismo contenido)

Vite usará automáticamente el correcto según el comando:
- `npm run dev` → usa `.env`
- `npm run build` → usa `.env.production` (o `.env` si no existe)

---

**¿Necesitas ayuda con algún paso?** 🚀
