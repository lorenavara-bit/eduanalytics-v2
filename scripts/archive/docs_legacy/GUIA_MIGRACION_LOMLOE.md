# 🚀 GUÍA DE MIGRACIÓN: LOMLOE AL SUPABASE VIEJO

## ✅ ESTADO ACTUAL:
- `.env.local` → Apuntando al Supabase VIEJO ✅
- Tablas del Tutor IA → Creadas ✅
- Currículo LOMLOE → Pendiente de migrar ⏳

---

## 📋 PASOS DE MIGRACIÓN

### **PASO 1: Crear Tablas LOMLOE**
📁 Archivo: `migration/04_lomloe_al_supabase_viejo.sql`
🔗 Ejecutar en: https://kbgkgoxwwlpszyfidufa.supabase.co

**Resultado esperado:**
- Tablas creadas: `competencias_clave`, `saberes_basicos`, `criterios_evaluacion`
- 8 competencias insertadas

---

### **PASO 2: Importar Currículo (EN ORDEN)**

#### **2.1. Matemáticas, Lengua, Geografía**
📁 `curriculo_completo_lomloe.sql`

#### **2.2. Gallego (TODOS estos archivos):**
- `curriculo_gallego_1primaria.sql`
- `curriculo_gallego_2primaria.sql`
- `curriculo_gallego_3primaria.sql`
- `curriculo_gallego_4primaria.sql`
- `curriculo_gallego_5primaria.sql`
- `curriculo_gallego_6primaria.sql`

#### **2.3. Conocimiento del Medio**
📁 `curriculo_conocimiento_medio_primaria_completo.sql`

#### **2.4. Inglés**
📁 `curriculo_ingles_primaria_completo.sql`

#### **2.5. Ciencias Naturales**
📁 `curriculo_ciencias_naturales_primaria_completo.sql`

---

### **PASO 3: Verificar**

Ejecuta en Supabase SQL Editor:

```sql
-- Contar saberes por asignatura
SELECT asignatura, COUNT(*) as total_saberes
FROM saberes_basicos
GROUP BY asignatura
ORDER BY asignatura;

-- Debería mostrar ~453 saberes en total
SELECT COUNT(*) as total_saberes FROM saberes_basicos;
```

**Resultado esperado:**
```
Matemáticas: ~80
Lengua Castellana: ~70
Lingua Galega: ~60
Conocimiento del Medio: ~80
Inglés: ~60
Ciencias Naturales: ~60
Geografía e Historia: ~40
TOTAL: ~453
```

---

## 🎯 DESPUÉS DE LA MIGRACIÓN

1. **Refresca el navegador**: http://localhost:5173
2. **Ve al Tutor con Jax**: http://localhost:5173/tutor/ID_DE_JAX
3. **Prueba escribir**: "Ayúdame con las provincias de España"

El tutor debería:
- Cargar correctamente ✅
- Responder con contexto LOMLOE ✅
- Mostrar juegos interactivos (mapa de España) ✅

---

## ⏱️ TIEMPO ESTIMADO
- Paso 1: 1 minuto
- Paso 2: 5-10 minutos (depende de cuántos archivos ejecutes)
- Paso 3: 30 segundos

**TOTAL: ~10-15 minutos**

---

¿Empezamos con el Paso 1? 🚀
