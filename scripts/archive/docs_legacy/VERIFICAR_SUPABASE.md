# 🔍 Verificar Estado de Supabase

## ⚠️ PROBLEMA DETECTADO
Tu proyecto Supabase no está respondiendo:
- **URL**: https://kbgkgoxwwlpszyfidufa.supabase.co
- **Error**: ERR_NAME_NOT_RESOLVED (DNS no encuentra el servidor)

---

## ✅ PASOS PARA SOLUCIONAR

### 1️⃣ Verificar Estado del Proyecto

1. Abre: **https://supabase.com/dashboard**
2. Busca tu proyecto: `kbgkgoxwwlpszyfidufa`
3. Revisa el estado:

   - ✅ **ACTIVO**: Si está activo, pasa al paso 2
   - ⏸️ **PAUSADO**: Haz clic en "Resume Project" / "Reanudar Proyecto"
   - ❌ **NO EXISTE**: Pasa al paso 3 para crear uno nuevo

---

### 2️⃣ Si el Proyecto Está PAUSADO

En proyectos gratuitos de Supabase, se pausan automáticamente después de 1 semana de inactividad.

**Solución:**
1. En el dashboard, haz clic en **"Resume Project"**
2. Espera 2-3 minutos a que se reactive
3. Reinicia el dev server: `npm run dev`

---

### 3️⃣ Si el Proyecto NO EXISTE (fue borrado)

Necesitarás crear un nuevo proyecto:

#### A. Crear Nuevo Proyecto en Supabase

1. Ve a: https://supabase.com/dashboard
2. Clic en **"New Project"**
3. Configura:
   - **Name**: eduanalytics-v2
   - **Database Password**: (guarda esto - lo necesitarás)
   - **Region**: Europe (Frankfurt o Madrid)
   - **Plan**: Free

4. Espera 2-3 minutos a que se cree

#### B. Obtener Nuevas Credenciales

1. En tu nuevo proyecto, ve a **Settings** → **API**
2. Copia:
   - **Project URL**: (algo como `https://xxxxx.supabase.co`)
   - **anon/public key**: (una clave JWT larga)

#### C. Actualizar tu `.env`

Edita el archivo `.env` en la raíz del proyecto:

```env
# SUPABASE
VITE_SUPABASE_URL=https://TU-NUEVO-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=TU_NUEVA_ANON_KEY_AQUI

# AI KEYS DESACTIVADAS - MODO SIN AI
```

#### D. Ejecutar Scripts de Base de Datos

Necesitarás recrear las tablas en tu nuevo proyecto:

**EN EL EDITOR SQL DE SUPABASE:**

1. Ve a **SQL Editor** en tu dashboard de Supabase
2. Ejecuta estos scripts **en orden**:

```sql
-- 1. Schema básico
<contenido de database_schema.sql>

-- 2. Currículum LOMLOE
<contenido de setup_curriculo_lomloe.sql>

-- 3. Cache de bibliotecas
<contenido de setup_bibliotecas_cache.sql>

-- 4. Cache INTEF
<contenido de setup_intef_cache.sql>

-- 5. Storage (si usas subida de archivos)
<contenido de setup_storage.sql>
```

3. Después, si quieres datos de ejemplo, ejecuta los archivos `curriculo_*.sql`

---

### 4️⃣ Probar la Conexión

Después de cualquiera de las soluciones:

1. **Reinicia el dev server**:
   ```bash
   npm run dev
   ```

2. **Abre la consola del navegador** (F12)

3. **Intenta hacer login/registro**

4. **No deberías ver más errores** de `ERR_NAME_NOT_RESOLVED`

---

## 🆘 ¿Qué encontraste?

Por favor, dime qué ves en tu dashboard de Supabase:

- [ ] ✅ Mi proyecto existe y está ACTIVO
- [ ] ⏸️ Mi proyecto está PAUSADO - lo reactivé
- [ ] ❌ Mi proyecto NO EXISTE - necesito crear uno nuevo
- [ ] 🔐 No puedo acceder a Supabase
- [ ] 🌐 Otro problema

---

## 📞 Siguiente Paso

Una vez que sepas el estado, dime qué encontraste y te ayudaré con el siguiente paso específico.
