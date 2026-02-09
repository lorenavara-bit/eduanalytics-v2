# 🚀 INSTRUCCIONES DE ACTIVACIÓN - BIBLIOTECAS DIGITALES

## ✅ IMPLEMENTACIÓN COMPLETADA

Has implementado exitosamente **OpenLibrary + Proyecto Gutenberg** como fuentes gratuitas de contenido literario.

---

## 📋 PASOS PARA ACTIVAR

### PASO 1: Ejecutar SQL en Supabase ⚡

1. Abre tu proyecto Supabase
2. Ve a **SQL Editor**
3. Copia y pega el contenido del archivo: `setup_bibliotecas_cache.sql`
4. Ejecuta el script (Run)

**Verificación**:
```sql
-- Deberías ver este output:
✅ Tabla bibliotecas_cache creada correctamente
✅ 6 índices creados
✅ 4 políticas RLS
✅ Vista de estadísticas disponible: bibliotecas_cache_stats
```

---

### PASO 2: Probar la Funcionalidad 🧪

#### Opción A: Desde la Aplicación (Recomendado)

1. Inicia tu aplicación: `npm run dev`
2. Navega al **Generador de Fichas**
3. Selecciona:
   - **Asignatura**: Lengua Castellana
   - **Tema**: Cualquier tema relacionado con literatura
   - **Nivel**: 4º Primaria (o el que prefieras)
4. Genera la ficha
5. **Resultado esperado**: Deberías ver un fragmento literario de un clásico y 5 preguntas automáticas

**Indicadores de éxito en consola**:
```
📚 Paso 0: Intentando contenido de bibliotecas digitales...
🔍 BibliotecaManager búsqueda: { asignatura, nivel, tema }
✅ Ejercicio de comprensión lectora creado desde Proyecto Gutenberg
📖 Libro: "Platero y yo" - Juan Ramón Jiménez
💰 Coste: $0 (contenido de dominio público)
```

#### Opción B: Testing Manual (Avanzado)

```javascript
// En consola del navegador (DevTools)
import bibliotecaManager from './services/bibliotecas/biblioteca-manager.js';

// Test 1: Búsqueda
const libros = await bibliotecaManager.search({
  asignatura: "Lengua Castellana",
  nivel: "4º Primaria",
  limit: 5
});
console.log('📚 Libros encontrados:', libros);

// Test 2: Crear ejercicio
const ejercicio = await bibliotecaManager.createReadingExercise(
  "4º Primaria",
  "Lengua Castellana",
  "literatura"
);
console.log('📝 Ejercicio:', ejercicio);

// Test 3: Estadísticas
const stats = await bibliotecaManager.getStats();
console.log('📊 Stats:', stats);
```

---

### PASO 3: Verificar el Caché 💾

Después de generar algunas fichas, verifica que el caché funciona:

```sql
-- En Supabase SQL Editor
SELECT 
  query_params->>'asignatura' as asignatura,
  query_params->>'nivel' as nivel,
  fuentes,
  num_resultados,
  cached_at,
  access_count
FROM bibliotecas_cache
ORDER BY cached_at DESC
LIMIT 10;
```

**Deberías ver**:
- Entradas con `fuentes` = `{gutenberg}` o `{openlibrary}` 
- `num_resultados` > 0
- `cached_at` con fecha reciente
- `access_count` incrementándose con el uso

---

## 🎯 CASOS DE USO

### Caso 1: Comprensión Lectora (Primaria)

**Entrada**:
- Asignatura: Lengua Castellana
- Nivel: 4º Primaria
- Tema: Cuentos / Literatura infantil

**Salida esperada**:
- Fragmento de "Platero y yo" o "Fábulas"
- 5 preguntas automáticas sobre comprensión
- Competencias: CCL (Comunicación Lingüística)
- Fuente: Proyecto Gutenberg (dominio público)

### Caso 2: Análisis Literario (Secundaria)

**Entrada**:
- Asignatura: Lengua Castellana
- Nivel: ESO
- Tema: Literatura clásica / Novela

**Salida esperada**:
- Fragmento de "Don Quijote" o "Lazarillo de Tormes"
- Preguntas de análisis y reflexión
- Competencias: CCL + CCEC (Cultural y Artística)
- Sugerencias didácticas incluidas

### Caso 3: Poesía (Todos los niveles)

**Entrada**:
- Asignatura: Lengua Castellana
- Nivel: Cualquiera
- Tema: Poesía

**Salida esperada**:
- Fragmento de Bécquer, Machado, etc.
- Análisis de estilo y emociones
- Identificación de figuras literarias

---

## 📊 MONITOREO Y ESTADÍSTICAS

### Ver Estadísticas de Uso

```sql
-- Estadísticas generales
SELECT * FROM get_bibliotecas_stats();

-- Uso por fuente
SELECT * FROM bibliotecas_cache_stats;

-- Detalle completo
SELECT 
  fuentes,
  COUNT(*) as total_entradas,
  SUM(access_count) as total_accesos,
  AVG(num_resultados) as promedio_libros,
  MAX(cached_at) as ultima_actualizacion
FROM bibliotecas_cache
GROUP BY fuentes;
```

### Limpiar Caché Expirado

```sql
-- Manual
SELECT clean_expired_bibliotecas_cache();

-- Verificar cuánto se eliminó
-- Output: "Eliminadas X entradas de caché expiradas"
```

---

## ⚙️ CONFIGURACIÓN OPCIONAL

### Cambiar Duración del Caché

Edita `src/services/bibliotecas/biblioteca-manager.js`:

```javascript
constructor() {
  // ...
  // Por defecto: 7 días
  this.cacheDuration = 7 * 24 * 60 * 60 * 1000;
  
  // Cambiar a 14 días:
  this.cacheDuration = 14 * 24 * 60 * 60 * 1000;
}
```

### Cambiar Prioridad de Fuentes

```javascript
constructor() {
  // ...
  // Por defecto: Gutenberg primero (dominio público)
  this.priority = ['gutenberg', 'openlibrary'];
  
  // Cambiar a OpenLibrary primero:
  this.priority = ['openlibrary', 'gutenberg'];
}
```

### Habilitar/Deshabilitar Caché

```javascript
constructor() {
  // ...
  // Habilitar
  this.cacheEnabled = true;
  
  // Deshabilitar (útil para testing)
  this.cacheEnabled = false;
}
```

---

## 🐛 TROUBLESHOOTING

### Problema: "bibliotecas_cache table does not exist"

**Causa**: No se ejecutó el SQL setup  
**Solución**: Ejecuta `setup_bibliotecas_cache.sql` en Supabase

### Problema: No se generan fragmentos literarios

**Causa 1**: Asignatura incorrecta  
**Solución**: Solo funciona para Lengua Castellana, Galego, Literatura

**Causa 2**: APIs externas caídas  
**Solución**: El sistema tiene fallback a otras fuentes automáticamente

**Verificar disponibilidad**:
```javascript
const gutenbergOK = await bibliotecaManager.checkAvailability('gutenberg');
const openlibraryOK = await bibliotecaManager.checkAvailability('openlibrary');
console.log('Gutenberg:', gutenbergOK, 'OpenLibrary:', openlibraryOK);
```

### Problema: RLS Policy Error

**Causa**: Políticas RLS no configuradas  
**Solución**: Re-ejecuta la sección de RLS del SQL setup

```sql
-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'bibliotecas_cache';
-- Deberías ver 4 políticas
```

---

## 📈 MÉTRICAS DE ÉXITO

### Indicadores Clave

✅ **Búsquedas exitosas**: \>80%  
✅ **Hit rate de caché**: \>70%  
✅ **Tiempo de respuesta**: \<2 segundos  
✅ **Fragmentos obtenidos**: \>80%  
✅ **Ahorro de costos**: €0.03/ejercicio

### Verificar en Producción

```javascript
// En consola de la app
const stats = ContentSourceStats.getStats();
console.log('Estadísticas globales:', stats);

// Deberías ver:
// biblioteca_hits: N
// biblioteca_usage_percent: X%
// cost_saved: $Y
```

---

## 🎓 PRÓXIMOS PASOS OPCIONALES

### Fase 2: Más Bibliotecas

Si quieres expandir más allá de OpenLibrary y Gutenberg:

1. **Biblioteca Virtual Cervantes** (literatura española específica)
2. **Wikisource** (documentos históricos verificados)
3. **Europeana** (recursos multimedia educativos)

📍 Ver `BIBLIOTECAS_DIGITALES_PENDIENTES.md` para detalles

### Mejoras de UX

- [ ] Mostrar portada del libro en la ficha
- [ ] Link directo a la obra completa
- [ ] Opción de descargar en PDF/EPUB
- [ ] Recomendaciones de lectura relacionadas

### Analytics Avanzados

- [ ] Tracking de libros más usados
- [ ] Preferencias de estudiantes
- [ ] A/B testing de fuentes
- [ ] Dashboards de uso

---

## 📚 RECURSOS

### Documentación
- `BIBLIOTECAS_DIGITALES_IMPLEMENTADO.md` - Documentación completa
- `BIBLIOTECAS_DIGITALES_PENDIENTES.md` - Plan de futuras ampliaciones
- `setup_bibliotecas_cache.sql` - Setup de base de datos

### Código
- `src/services/bibliotecas/` - Todo el código de bibliotecas
- `src/services/smart-worksheet-generator.js` - Integración en generador

### APIs Externas
- OpenLibrary Docs: https://openlibrary.org/dev/docs/api
- Gutenberg Help: https://www.gutenberg.org/help/

---

## ✅ CHECKLIST FINAL

Antes de considerar completado:

- [ ] SQL script ejecutado en Supabase
- [ ] Tabla `bibliotecas_cache` existe
- [ ] Generada al menos 1 ficha de Lengua Castellana
- [ ] Fragmento literario visible en la ficha
- [ ] Caché tiene al menos 1 entrada
- [ ] Estadísticas muestran biblioteca_hits > 0
- [ ] No hay errores en consola del navegador

---

**¿Todo funciona?** 🎉  
¡Felicidades! Ahora tienes acceso a **30M+ libros gratis** para enriquecer tus fichas educativas.

**¿Problemas?**  
Revisa la sección Troubleshooting o contacta al equipo de desarrollo.

---

**Última actualización**: 2025-12-14  
**Versión**: 1.0.0  
**Mantenedor**: EduAnalytics Team
