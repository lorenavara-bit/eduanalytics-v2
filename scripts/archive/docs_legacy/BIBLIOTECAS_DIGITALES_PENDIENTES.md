# 📚 BIBLIOTECAS DIGITALES DE LIBRE ACCESO - PLAN DE INTEGRACIÓN

## 🎯 OBJETIVO
Completar la integración de bibliotecas digitales gratuitas para reducir dependencia de APIs de IA y proporcionar contenido educativo de calidad sin costos.

---

## ✅ YA IMPLEMENTADO

### INTEF/Procomún
- **Estado**: ✅ Implementado
- **Ubicación**: `src/services/intef/`
- **Archivos**:
  - `intef-fetcher.js` - Sistema de obtención de recursos
  - `intef-scraper.js` - Scraper web para Procomún
  - `intef-config.js` - Configuración y mapeo curricular
- **Contenido**: 74.000+ recursos educativos, 300 itinerarios, 100.000+ multimedia CC
- **Cumplimiento**: LOMLOE + INTEF oficial

---

## 📋 PENDIENTES DE IMPLEMENTAR

### 1️⃣ OpenLibrary (openlibrary.org)
**Priority**: 🔥 ALTA

**Características**:
- **API**: `https://openlibrary.org/api/`
- **Contenido**: 30+ millones de libros, muchos de dominio público
- **Licencia**: Dominio público + Creative Commons
- **Idioma**: Español disponible
- **Uso educativo**: Lecturas complementarias, comprensión lectora

**API Endpoints clave**:
```javascript
// Búsqueda por tema
GET https://openlibrary.org/subjects/{subject}.json

// Búsqueda general
GET https://openlibrary.org/search.json?q={query}&language=spa

// Obtener libro específico
GET https://openlibrary.org/works/{work_id}.json

// Obtener ediciones
GET https://openlibrary.org/works/{work_id}/editions.json
```

**Ejemplo de integración**:
```javascript
// Buscar libros para 4º Primaria sobre naturaleza
const response = await fetch(
  'https://openlibrary.org/search.json?q=naturaleza&language=spa&limit=10'
);
```

**Casos de uso en EduAnalytics**:
- ✅ Lecturas recomendadas por tema curricular
- ✅ Fragmentos para comprensión lectora
- ✅ Referencias bibliográficas para proyectos
- ✅ Material complementario (Lengua, Ciencias Sociales)

---

### 2️⃣ Proyecto Gutenberg (gutenberg.org)
**Priority**: 🔥 ALTA

**Características**:
- **Catálogo**: 70.000+ libros de dominio público
- **API**: No oficial, pero RSS feeds disponibles
- **Licencia**: Dominio público
- **Idioma**: Español disponible
- **Formato**: TXT, HTML, EPUB, PDF

**Acceso programático**:
```javascript
// Búsqueda por autor/título (web scraping)
const gutenbergSearchURL = `https://www.gutenberg.org/ebooks/search/?query=${query}&submit_search=Go%21`;

// RSS de libros en español
const spanishBooksRSS = 'https://www.gutenberg.org/ebooks/search/?query=lang%3Aes&submit_search=Go%21&format=rss';

// Descarga directa
const bookURL = `https://www.gutenberg.org/files/{book_id}/{book_id}-h/{book_id}-h.htm`;
```

**Casos de uso**:
- ✅ Clásicos literarios adaptados (Lengua Castellana)
- ✅ Fragmentos de obras clásicas para análisis
- ✅ Historia y contexto cultural (Ciencias Sociales)
- ✅ Lectura extensiva (Premium)

---

### 3️⃣ Biblioteca Virtual Cervantes (cervantesvirtual.com)
**Priority**: 🔥 ALTA (específico de España)

**Características**:
- **Enfoque**: Literatura en español e hispanoamericana
- **Contenido**: Obras clásicas, poesía, teatro
- **Licencia**: Acceso libre, algunos derechos reservados
- **Idioma**: Español nativo
- **Especial para**: Lengua Castellana y Literatura

**Acceso**:
```javascript
// Base URL
const cervantesBiblioteca = 'http://www.cervantesvirtual.com/';

// Búsqueda
const searchURL = `http://www.cervantesvirtual.com/obra-visor/buscar/?q=${query}`;

// Portal infantil
const portalInfantil = 'http://www.cervantesvirtual.com/portales/literatura_infantil_juvenil/';
```

**Casos de uso**:
- ✅ Literatura clásica española
- ✅ Poesía para primaria/secundaria
- ✅ Cuentos tradicionales
- ✅ Contexto cultural español

---

### 4️⃣ Europeana (europeana.eu)
**Priority**: 🟡 MEDIA

**Características**:
- **API**: `https://api.europeana.eu/record/v2/`
- **Contenido**: 50+ millones de items culturales (arte, libros, fotos, vídeos)
- **Licencia**: Varios (CC, dominio público)
- **Idioma**: Multilingüe, español disponible
- **Requiere**: API Key gratuita

**API Endpoints**:
```javascript
// Búsqueda
GET https://api.europeana.eu/record/v2/search.json?wskey={API_KEY}&query={query}

// Item específico
GET https://api.europeana.eu/record/v2/{record_id}.json?wskey={API_KEY}
```

**Casos de uso**:
- ✅ Recursos multimedia (Ciencias Sociales, Arte)
- ✅ Historia europea
- ✅ Material visual para proyectos
- ✅ Patrimonio cultural

---

### 5️⃣ Wikisource (es.wikisource.org)
**Priority**: 🟡 MEDIA

**Características**:
- **API**: MediaWiki API completa
- **Contenido**: Textos de fuente primaria verificados
- **Licencia**: CC-BY-SA
- **Idioma**: Español
- **Ideal para**: Textos históricos, documentos originales

**API Endpoints**:
```javascript
// Búsqueda
const wikiAPI = 'https://es.wikisource.org/w/api.php';
const params = {
  action: 'query',
  list: 'search',
  srsearch: query,
  format: 'json'
};

// Obtener contenido de página
const pageParams = {
  action: 'parse',
  page: pageTitle,
  format: 'json'
};
```

**Casos de uso**:
- ✅ Documentos históricos originales
- ✅ Constituciones, leyes (Ciencias Sociales)
- ✅ Textos científicos históricos
- ✅ Análisis de fuentes primarias

---

### 6️⃣ Biblioteca Digital Hispánica (BNE)
**Priority**: 🟡 MEDIA

**Características**:
- **Institución**: Biblioteca Nacional de España
- **URL**: `http://www.bne.es/es/Catalogos/BibliotecaDigitalHispanica/`
- **Contenido**: Patrimonio bibliográfico español
- **Licencia**: Dominio público + CC
- **Formato**: Imágenes digitalizadas, algunos OCR

**Acceso**:
```javascript
// OAI-PMH protocol
const oaiURL = 'http://www.bne.es/OAI-PMH/';

// Búsqueda en catálogo
const catalogoURL = 'http://catalogo.bne.es/uhtbin/webcat';
```

**Casos de uso**:
- ✅ Fuentes históricas españolas
- ✅ Manuscritos y documentos antiguos
- ✅ Material para Historia de España
- ✅ Proyectos de investigación (Secundaria/Bachillerato)

---

### 7️⃣ Digital Public Library of America (DPLA)
**Priority**: 🟢 BAJA

**Características**:
- **API**: `https://api.dp.la/v2/`
- **Contenido**: Millones de items de bibliotecas estadounidenses
- **Licencia**: Variada
- **Idioma**: Principalmente inglés
- **Uso**: Recursos para Inglés como lengua extranjera

---

## 🏗️ PROPUESTA DE ARQUITECTURA

### Estructura de directorios
```
src/services/
├── bibliotecas/
│   ├── openlibrary/
│   │   ├── openlibrary-api.js      # Cliente API
│   │   ├── openlibrary-adapter.js  # Adaptador a formato interno
│   │   └── openlibrary-config.js   # Configuración
│   ├── gutenberg/
│   │   ├── gutenberg-scraper.js
│   │   └── gutenberg-adapter.js
│   ├── cervantes/
│   │   ├── cervantes-scraper.js
│   │   └── cervantes-adapter.js
│   ├── europeana/
│   │   └── europeana-api.js
│   ├── wikisource/
│   │   └── wikisource-api.js
│   └── biblioteca-manager.js       # Orquestador principal
```

### Sistema de caché (Supabase)
```sql
-- Nueva tabla para caché de bibliotecas
CREATE TABLE bibliotecas_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fuente TEXT NOT NULL, -- 'openlibrary', 'gutenberg', etc.
  tipo_recurso TEXT NOT NULL, -- 'libro', 'fragmento', 'articulo'
  query TEXT NOT NULL,
  contenido JSONB NOT NULL,
  metadatos JSONB,
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  
  -- Índices para búsqueda rápida
  CONSTRAINT unique_cache_entry UNIQUE(fuente, tipo_recurso, query)
);

CREATE INDEX idx_bibliotecas_fuente ON bibliotecas_cache(fuente);
CREATE INDEX idx_bibliotecas_tipo ON bibliotecas_cache(tipo_recurso);
CREATE INDEX idx_bibliotecas_expires ON bibliotecas_cache(expires_at);
```

### Formato unificado de respuesta
```javascript
{
  id: "unique_id",
  fuente: "openlibrary",
  tipo: "libro",
  titulo: "Don Quijote de la Mancha",
  autor: "Miguel de Cervantes",
  descripcion: "...",
  idioma: "es",
  nivel_educativo: ["4º Primaria", "ESO"],
  temas: ["literatura", "aventura"],
  licencia: "dominio_publico",
  formato: ["html", "pdf", "epub"],
  url_acceso: "https://...",
  fecha_publicacion: "1605",
  imagen_portada: "https://...",
  fragmento_muestra: "En un lugar de la Mancha...",
  
  // Metadatos educativos
  lomloe: {
    competencias: ["CCL", "CCEC"],
    criterios_evaluacion: [...],
    saberes_basicos: [...]
  }
}
```

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### FASE 1: OpenLibrary + Gutenberg (Prioridad máxima)
**Tiempo estimado**: 2-3 días

**Tareas**:
1. ✅ Crear `src/services/bibliotecas/` estructura
2. ✅ Implementar `openlibrary-api.js`
   - Búsqueda por tema/nivel educativo
   - Filtrado por idioma español
   - Obtención de fragmentos
3. ✅ Implementar `gutenberg-scraper.js`
   - Catálogo español
   - Descarga de fragmentos HTML
   - Procesamiento de texto
4. ✅ Crear `biblioteca-manager.js` (orquestador)
   - Búsqueda unificada
   - Sistema de prioridad
   - Caché en Supabase
5. ✅ Integrar con `smart-worksheet-generator.js`
   - Nueva fuente: Bibliotecas
   - Prioridad después de Khan Academy
6. ✅ Testing básico

**Resultado esperado**:
- Sistema funcional para búsqueda de libros/fragmentos
- Integración en generador de fichas
- Cache funcionando

---

### FASE 2: Cervantes + Wikisource
**Tiempo estimado**: 2 días

**Tareas**:
1. ✅ Implementar `cervantes-scraper.js`
2. ✅ Implementar `wikisource-api.js`
3. ✅ Ampliar `biblioteca-manager.js`
4. ✅ Testing

---

### FASE 3: Europeana + BNE (Opcional)
**Tiempo estimado**: 2-3 días

**Tareas**:
1. ✅ Solicitar API keys
2. ✅ Implementar clientes API
3. ✅ Integración multimedia
4. ✅ Testing

---

## 🎯 CASOS DE USO ESPECÍFICOS

### Para Lengua Castellana (4º Primaria)
**Fuentes**: OpenLibrary + Gutenberg + Cervantes

**Ejercicios posibles**:
- ✅ Comprensión lectora con fragmentos de cuentos clásicos
- ✅ Análisis de personajes (con extractos)
- ✅ Identificación de tipos de texto (narrativo, descriptivo)
- ✅ Vocabulario en contexto

**Ejemplo de pregunta generada**:
```javascript
{
  tipo: "comprension_lectora",
  fragmento: {
    texto: "En un lugar de la Mancha...",
    fuente: "Don Quijote - Proyecto Gutenberg",
    autor: "Miguel de Cervantes"
  },
  preguntas: [
    {
      enunciado: "¿Dónde vivía Don Quijote?",
      opciones: ["En La Mancha", "En Madrid", "En Barcelona"],
      correcta: 0
    }
  ]
}
```

### Para Ciencias Sociales (4º Primaria)
**Fuentes**: Wikisource + BNE + Europeana

**Ejercicios posibles**:
- ✅ Análisis de documentos históricos
- ✅ Mapas antiguos
- ✅ Fotos históricas con contexto
- ✅ Líneas de tiempo con fuentes primarias

### Para Inglés (Primaria/ESO)
**Fuentes**: OpenLibrary (inglés) + DPLA

**Ejercicios posibles**:
- ✅ Lecturas graduadas por nivel
- ✅ Comprensión con cuentos clásicos
- ✅ Vocabulario temático

---

## 💰 REDUCCIÓN DE COSTOS

### Antes (con IA)
```
Generación de fragmento de lectura: €0.005
Corrección de comprensión: €0.002
Total por ejercicio: €0.007
100 ejercicios/mes = €0.70/usuario
```

### Después (con bibliotecas digitales)
```
Llamada API OpenLibrary: €0 (gratuita)
Cache en Supabase: €0 (incluido en tier gratuito)
Procesamiento local: €0
Total por ejercicio: €0.00
100 ejercicios/mes = €0.00/usuario
```

**Ahorro anual** (100 usuarios): **€840**

---

## ✅ CRITERIOS DE ÉXITO

### Técnicos
- ✅ Integración funcional de al menos 3 bibliotecas
- ✅ Sistema de caché eficiente (\<500ms respuesta)
- ✅ Fallback automático si una fuente falla
- ✅ Formato unificado de respuestas

### Pedagógicos
- ✅ Contenido apropiado para nivel educativo
- ✅ Cumplimiento LOMLOE
- ✅ Calidad superior a generación con IA genérica
- ✅ Diversidad de fuentes y formatos

### Negocio
- ✅ Reducción 100% de costos de contenido
- ✅ Mayor credibilidad (fuentes oficiales)
- ✅ Escalabilidad sin costos variables
- ✅ Diferenciador de mercado

---

## 📝 NOTAS IMPORTANTES

### Legales
- ✅ Verificar licencias específicas por recurso
- ✅ Atribución adecuada de fuentes
- ✅ Cumplir términos de uso de APIs
- ✅ Política de privacidad clara

### Técnicas
- ✅ Rate limiting en APIs externas
- ✅ Timeout adecuado (5-10s máx)
- ✅ Retry con backoff exponencial
- ✅ Monitoreo de disponibilidad

### UX
- ✅ Indicar fuente del contenido al usuario
- ✅ Mostrar portadas/imágenes cuando disponible
- ✅ Links a recursos completos
- ✅ Recomendaciones personalizadas

---

**Última actualización**: 2025-12-14
**Estado**: Pendiente de aprobación e implementación
**Próximo paso**: Decidir qué bibliotecas priorizar
