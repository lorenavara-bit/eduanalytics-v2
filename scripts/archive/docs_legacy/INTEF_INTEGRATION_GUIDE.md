# 🇪🇸 INTEF Integration - Sistema de Contenido Educativo Oficial

## ✅ ¿QUÉ HEMOS CONSTRUIDO?

Un sistema inteligente que **prioriza contenido oficial** del Ministerio de Educación español sobre generación AI.

---

## 🏗️ ARQUITECTURA

```
┌──────────────────────────────────────────────┐
│      USER: "Genera worksheet Fracciones"    │
└───────────────────┬──────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  SMART GENERATOR     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   CHECK CACHE        │ ← Supabase
         │   (intef_content_    │
         │    cache table)      │
         └──────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        │ CACHE HIT?            │
        └───┬───────────────┬───┘
            │ YES           │ NO
            ▼               ▼
    ┌───────────────┐  ┌────────────────┐
    │ RETURN        │  │ FETCH INTEF    │
    │ CACHED        │  │ (simulated     │
    │ CONTENT       │  │  for now)      │
    │               <──┤                │
    │ COST: $0      │  │ SAVE TO CACHE  │
    └───────┬───────┘  └────────────────┘
            │
            ▼
    ┌───────────────────┐
    │ INTEF CONTENT?    │
    └───┬───────────┬───┘
        │ YES       │ NO
        ▼           ▼
┌───────────────┐  ┌────────────────────┐
│ PERSONALIZE   │  │ FALLBACK:          │
│ (AI mínimo    │  │ AI GENERATION      │
│  ~100 tokens) │  │ (full generation)  │
│               │  │                    │
│ COST: ~$0     │  │ COST: ~$0.02      │
└───────┬───────┘  └──────────┬─────────┘
        │                     │
        └──────────┬──────────┘
                   ▼
      ┌────────────────────────┐
      │  RETURN WORKSHEET      │
      │  Track savings         │
      └────────────────────────┘
```

---

## 📁 ARCHIVOS CREADOS

### 1. **Configuration**
`src/services/intef/intef-config.js`
- Mapeo de asignaturas a categorías INTEF
- Niveles educativos (Primaria, ESO, Bachillerato)
- Tipos de recursos (unidades, actividades, rúbricas)
- Config de caché agresivo

### 2. **Content Fetcher**
`src/services/intef/intef-fetcher.js`
- Sistema de búsqueda en INTEF/Procomún
- Caché en Supabase (compartido entre usuarios)
- Por ahora: contenido simulado
- TODO: Implementar scraper real

### 3. **Smart Generator**
`src/services/smart-worksheet-generator.js`
- Lógica inteligente: INTEF primero, AI fallback
- Tracking de ahorros de costes
- Adaptación de contenido INTEF a formato app

### 4. **Database Schema**
`setup_intef_cache.sql`
- Tabla `intef_content_cache`
- Índices optimizados
- RLS policies
- Funciones de utilidad

---

## 🎯 ESTRATEGIA DE CONTENIDO

### Prioridad 1: **INTEF (GRATIS)**
```javascript
// Buscar contenido oficial
const content = await searchINTEFResources({
  asignatura: 'Matemáticas',
  curso: '1º ESO',
  tema: 'Fracciones'
});

// Si existe → $0 coste
// Cache forever → próximas veces $0
```

### Prioridad 2: **AI Mínimo (casi GRATIS)**
```javascript
// Solo personalizar para estudiante específico
// Prompt: ~100 tokens vs 2000+ en generación completa
// Ahorro: 95%
```

### Fallback: **AI Completo** (cuando sea necesario)
```javascript
// Solo si no hay contenido INTEF
// Cuesta ~$0.02 pero genera contenido de calidad
```

---

## 💰 AHORRO DE COSTES

### Antes (100% AI):
```
100 worksheets × $0.02 = $2.00/mes
```

### Ahora (INTEF Smart):

**Caso Optimista** (80% INTEF hits):
```
80 worksheets INTEF  × $0.00 = $0.00
20 worksheets AI     × $0.02 = $0.40
Total: $0.40/mes
Ahorro: 80% ($1.60)
```

**Caso Realista** (50% INTEF hits):
```
50 worksheets INTEF  × $0.00 = $0.00
50 worksheets AI     × $0.02 = $1.00
Total: $1.00/mes
Ahorro: 50% ($1.00)
```

**Caso Pesimista** (20% INTEF hits):
```
20 worksheets INTEF  × $0.00 = $0.00
80 worksheets AI     × $0.02 = $1.60
Total: $1.60/mes
Ahorro: 20% ($0.40)
```

---

## 🚀 PRÓXIMOS PASOS

### Fase 1: ✅ COMPLETADA
- [x] Arquitectura definida
- [x] Config system
- [x] Cache en Supabase
- [x] Smart generator
- [x] Contenido simulado

### Fase 2: 📋 PENDIENTE
**Implementar Scraper Real de INTEF**

Opciones:

#### Opción A: **Puppeteer/Playwright**
```bash
npm install puppeteer
```
```javascript
// Scraper para https://procomun.intef.es
async function scrapeINTEF(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.evaluate(() => {
    // Extract content
  });
  return content;
}
```

**Pros**: Control total
**Contras**: Necesita browser, más pesado

#### Opción B: **Cheerio (HTML parsing)**
```bash
npm install cheerio axios
```
```javascript
// Más ligero, parsea HTML
const $ = cheerio.load(html);
const content = $('.recurso').map((i, el) => {
  return { titulo: $(el).find('.titulo').text() };
}).get();
```

**Pros**: Ligero, rápido
**Contras**: No ejecuta JavaScript

#### Opción C: **API Oficial** (si existe)
Investigar si INTEF tiene API pública no documentada

### Fase 3: 📋 EXPANDIR
- [ ] Gutenberg integration
- [ ] Khan Academy API
- [ ] Cambridge English resources
- [ ] Caché multi-nivel (memory + Supabase)

---

## 🔧 CÓMO USAR

### Setup Database:

```bash
# Ejecutar SQL en Supabase
# Ir a: SQL Editor en dashboard de Supabase
# Copiar contenido de: setup_intef_cache.sql
# Ejecutar
```

### En tu app:

```javascript
import { generateSmartWorksheet } from './services/smart-worksheet-generator';

// Usar en vez de generateWorksheet normal
const worksheet = await generateSmartWorksheet({
  profile: studentProfile,
  subject: { name: 'Matemáticas' },
  topic: 'Fracciones',
  activityType: 'exercise',
  config: { numQuestions: 10, difficulty: 'Medio' },
  observations: 'Especial atención a suma de fracciones'
});

// Worksheet vendrá de INTEF si existe
// Si no, se genera con AI
// El usuario no nota la diferencia!
```

### Ver estadísticas:

```javascript
import { ContentSourceStats } from './services/smart-worksheet-generator';

const stats = ContentSourceStats.getStats();
console.log(`
  📊 ESTADÍSTICAS DE CONTENIDO:
  - Total requests: ${stats.total_requests}
  - INTEF hits: ${stats.intef_hits} (${stats.intef_usage_percent}%)
  - AI fallbacks: ${stats.ai_fallbacks} (${stats.ai_usage_percent}%)
  - 💰 Ahorro: $${stats.cost_saved.toFixed(2)}
`);
```

---

## 📊 CONTENIDO INTEF SOPORTADO

### Asignaturas:
- ✅ Matemáticas
- ✅ Lengua Castellana y Literatura
- ✅ Inglés
- ✅ Ciencias Naturales
- ✅ Ciencias Sociales
- ✅ Geografía e Historia
- ✅ Física y Química
- ✅ Biología y Geología
- ✅ Tecnología
- ✅ Educación Física
- ✅ Música
- ✅ Plástica

### Niveles:
- ✅ Primaria (1º-6º)
- ✅ ESO (1º-4º)
- ✅ Bachillerato (1º-2º)

### Tipos de Recursos:
- ✅ Unidades Didácticas
- ✅ Actividades
- ✅ Ejercicios
- ✅ Evaluaciones
- ✅ Rúbricas
- ✅ Recursos Multimedia

---

## ⚠️ ESTADO ACTUAL

### ✅ Funcionando:
- Sistema de caché en Supabase
- Lógica de priorización INTEF vs AI
- Estructura de contenido simulado
- Mapeo de asignaturas/niveles
- Tracking de ahorros

### ⚠️ Simulado (por ahora):
- Fetch de contenido INTEF real
- Necesita scraper/API real

### 📋 TODO:
- Implementar scraper de INTEF/Procomún
- Integrar con UI (WorksheetGenerator component)
- Testing con contenido real
- Optimizar caché

---

## 🎯 VALOR AÑADIDO

### Para Profesores:
✅ Contenido oficial del Ministerio
✅ 100% alineado con LOMLOE
✅ Validado pedagógicamente
✅ Rúbricas de evaluación oficiales

### Para Estudiantes:
✅ Material de calidad garantizada
✅ Apropiado para su nivel
✅ Competencias clave oficiales

### Para el Negocio:
✅ Costes AI reducidos 50-80%
✅ Escalable (caché compartido)
✅ Sostenible económicamente
✅ Diferenciador: Contenido oficial español

---

## 💡 PRÓXIMO PASO INMEDIATO

**DECIDIR:**

### Opción 1: **Implementar scraper real ahora**
- Puppeteer para extraer contenido real INTEF
- 2-3 días de desarrollo
- Valor inmediato

### Opción 2: **Conectar a UI primero**
- Integrar smart generator en WorksheetGenerator
- Ver funcionar con contenido simulado
- Feedback visual
- 1 día

### Opción 3: **Otras integraciones**
- Khan Academy (más fácil, tiene API)
- Gutenberg (libros, API simple)
- Validar arquitectura con otras fuentes

**¿Qué prefieres hacer primero?** 🤔
