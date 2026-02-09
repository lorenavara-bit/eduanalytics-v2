# 🎯 SISTEMA DE PRIORIDADES - FUENTES DE CONTENIDO

## 📊 DIAGRAMA DE FLUJO COMPLETO

```
┌─────────────────────────────────────────────┐
│  Usuario solicita generar ficha/examen      │
│  (Asignatura, Nivel, Tema, Tipo)            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ ¿Es Lengua Castellana      │◄─── PASO 0: BIBLIOTECAS DIGITALES
    │ o Galego?                  │     (Solo para materias literarias)
    └─┬──────────────────────┬───┘
      │ SÍ                   │ NO
      ▼                      │
┌──────────────────────┐     │
│ BIBLIOTECAS DIGITALES│     │
│ (OpenLibrary +       │     │
│  Gutenberg)          │     │
└──┬───────────────────┘     │
   │                         │
   ▼                         │
¿Encontró fragmento          │
literario?                   │
   │                         │
   ├─ SÍ → Generar ejercicio │
   │        de comprensión   │
   │        lectora          │
   │        ✅ FIN           │
   │                         │
   └─ NO ───────┬────────────┘
                │
                ▼
       ┌────────────────┐
       │ PASO 1: INTEF  │◄─── PRIORIDAD 1: Contenido Oficial
       │ (incluye CEDEC)│     (Ministerio de Educación)
       └──┬─────────────┘
          │
          ▼
    ¿Encontró recursos
    en INTEF/Procomún?
          │
          ├─ SÍ → Usar contenido INTEF
          │        + Generar preguntas
          │        (ver flujo B)
          │        ✅ FIN
          │
          └─ NO
             │
             ▼
    ┌────────────────────┐
    │ PASO 2: BANCO DE   │◄─── FALLBACK: Contenido Curado
    │ PREGUNTAS          │
    │ (Khan → Custom)    │
    └──┬─────────────────┘
       │
       │ (ver flujo C)
       │
       ✅ FIN
```

---

## 🔄 FLUJO B: Generación de Preguntas (cuando hay INTEF)

```
Contenido INTEF encontrado
         │
         ▼
   ┌──────────────────────┐
   │ obtenerPreguntasPor   │◄─── Función de banco-preguntas.js
   │ Tema()                │
   └──┬───────────────────┘
      │
      ▼
 ┌────────────────────┐
 │ ¿Hay Khan Academy? │◄─── PRIORIDAD 1 en preguntas
 │ para este tema?    │
 └─┬────────────────┬─┘
   │ SÍ             │ NO
   ▼                │
Khan Academy        │
ejercicios          │
✅ FIN              │
                    ▼
              ┌──────────────┐
              │ ¿Hay preguntas│◄─── PRIORIDAD 2
              │ en banco      │
              │ custom?       │
              └─┬──────────┬─┘
                │ SÍ       │ NO
                ▼          ▼
            Banco Custom   Preguntas
                          Default
                ✅ FIN    ✅ FIN
```

---

## 🔄 FLUJO C: Banco de Preguntas (Fallback INTEF)

```
No hay contenido INTEF
         │
         ▼
   obtenerPreguntasPorTema()
         │
         ▼
    ┌────────────────────┐
    │ ¿Es STEM?          │◄─── Matemáticas, Ciencias
    │ (Matemáticas,      │
    │  Ciencias)         │
    └─┬────────────────┬─┘
      │ SÍ             │ NO
      ▼                │
┌──────────────────┐   │
│ KHAN ACADEMY     │   │
│ (30+ ejercicios) │   │
└──────────────────┘   │
      ✅ FIN           │
                       ▼
                 ┌─────────────────┐
                 │ ¿Hay preguntas  │◄─── Lengua, Ciencias Sociales
                 │ en banco custom?│
                 └─┬──────────┬────┘
                   │ SÍ       │ NO
                   ▼          ▼
              Banco Custom    Preguntas
              (100+ pregs)    Default (10)
                ✅ FIN       ✅ FIN
```

---

## 📋 PRIORIDADES POR TIPO DE CONTENIDO

### **Tipo 1: Bibliotecas Digitales** (NUEVA - Más alta para Lengua)

#### Cuándo se usa:
- ✅ Asignatura: Lengua Castellana, Galego, Literatura
- ✅ Tipo de actividad: Comprensión lectora, Análisis de texto
- ✅ Cualquier curso/nivel

#### Fuentes:
1. **Proyecto Gutenberg** (prioridad 1)
   - 15 clásicos españoles curados
   - Dominio público garantizado
   - Fragmentos de alta calidad
   
2. **OpenLibrary** (prioridad 2)
   - 30M+ libros
   - Filtrado por español + nivel
   - Fallback si Gutenberg falla

#### Qué genera:
- Fragmento literario auténtico (600-800 caracteres)
- 5 preguntas automáticas de comprensión
- Metadatos LOMLOE (CCL, CCEC)
- Sugerencias didácticas

#### Costo:
**€0.00** (todo dominio público)

---

### **Tipo 2: INTEF/Procomún** (Oficial - Alta prioridad)

#### Cuándo se usa:
- ✅ Cualquier asignatura
- ✅ Cuando bibliotecas no aplican (o fallaron)
- ✅ Todos los niveles educativos

#### Qué incluye:
- **Procomún**: 74,000+ recursos educativos
- **CEDEC** (incluido en INTEF): Proyectos didácticos, REAs
- **Multimedia**: 100,000+ imágenes/vídeos CC

#### Qué genera:
- Unidades didácticas completas
- Actividades oficiales
- Criterios de evaluación LOMLOE
- Competencias trabajadas

#### Para preguntas usa:
→ Pasa a **Banco de Preguntas** (Khan → Custom → Default)

#### Costo:
**€0.00** (contenido oficial gratuito)

---

### **Tipo 3: Banco de Preguntas** (Fallback o complemento)

Usado cuando:
- ❌ No hay bibliotecas (asignatura no literaria)
- ❌ No hay INTEF disponible
- ✅ O como complemento a INTEF

#### Prioridad interna:

**3.1. Khan Academy** (Máxima para STEM)
- **Cuándo**: Matemáticas, Ciencias
- **Contenido**: 30+ ejercicios por tema
- **Niveles**: Todos (organizado por curso)
- **Características**:
  - Ejercicios interactivos
  - Progresión pedagógica
  - Calidad probada mundialmente
- **Costo**: €0.00 (contenido embebido)

**Ejemplo de temas con Khan**:
- Matemáticas: Fracciones, Álgebra, Geometría, Ecuaciones
- Ciencias: Biología, Física, Química

**3.2. Banco Custom** (Medio - Contenido curado)
- **Cuándo**: Asignaturas sin Khan
- **Contenido**: 100+ preguntas manuales
- **Asignaturas**:
  - Lengua Castellana (Ortografía, Sintaxis)
  - Ciencias Naturales
  - Ciencias Sociales
  - Galego
- **Características**:
  - Curadas manualmente
  - Alineadas con LOMLOE
  - Variedad de dificultades
- **Costo**: €0.00 (contenido propio)

**3.3. Default** (Último recurso)
- **Cuándo**: No hay nada específico
- **Contenido**: 10 preguntas genéricas
- **Características**:
  - Aplicables a cualquier tema
  - Nivel medio
  - Tipo reflexivo/genérico
- **Costo**: €0.00

---

## 🎯 MATRIZ DE DECISIÓN POR ASIGNATURA

| Asignatura | 1ª Opción | 2ª Opción | 3ª Opción | 4ª Opción |
|------------|-----------|-----------|-----------|-----------|
| **Lengua Castellana** | 📚 Bibliotecas Digitales | 📖 INTEF/CEDEC | 📝 Banco Custom | 📋 Default |
| **Galego** | 📚 Bibliotecas Digitales | 📖 INTEF/CEDEC | 📝 Banco Custom | 📋 Default |
| **Matemáticas** | 📖 INTEF/CEDEC | 🎓 Khan Academy | 📝 Banco Custom | 📋 Default |
| **Ciencias Naturales** | 📖 INTEF/CEDEC | 🎓 Khan Academy | 📝 Banco Custom | 📋 Default |
| **Ciencias Sociales** | 📖 INTEF/CEDEC | 📝 Banco Custom | 📋 Default | - |
| **Inglés** | 📖 INTEF/CEDEC | 📝 Banco Custom | 📋 Default | - |

### Leyenda:
- 📚 **Bibliotecas Digitales**: OpenLibrary + Gutenberg
- 📖 **INTEF/CEDEC**: Contenido oficial Ministerio
- 🎓 **Khan Academy**: Ejercicios STEM curados
- 📝 **Banco Custom**: Preguntas manuales propias
- 📋 **Default**: Preguntas genéricas

---

## 💡 EJEMPLOS PRÁCTICOS

### Ejemplo 1: Lengua 4º Primaria - "Cuentos"

```
PASO 0: Bibliotecas Digitales
├─ Es Lengua Castellana? → SÍ
├─ Buscar en Gutenberg: "cuentos" + "4º Primaria"
├─ Encontrado: "Platero y yo" (Juan Ramón Jiménez)
├─ Fragmento extraído: 650 caracteres
└─ Preguntas generadas: 5 automáticas
   ✅ FIN - COSTO: €0.00
```

### Ejemplo 2: Matemáticas 5º Primaria - "Fracciones"

```
PASO 0: Bibliotecas
├─ Es Lengua? → NO
└─ Saltar a PASO 1

PASO 1: INTEF
├─ Buscar "Fracciones" en Procomún
├─ ❌ No encontrado (o timeout)
└─ Pasar a Banco de Preguntas

obtenerPreguntasPorTema():
├─ ¿Hay Khan Academy para "Fracciones"? → SÍ ✅
├─ Obtener ejercicios Khan
└─ 15 ejercicios interactivos devueltos
   ✅ FIN - COSTO: €0.00
```

### Ejemplo 3: Ciencias Sociales 3º ESO - "Revolución Francesa"

```
PASO 0: Bibliotecas
├─ Es Lengua? → NO
└─ Saltar a PASO 1

PASO 1: INTEF
├─ Buscar en CEDEC/Procomún
├─ ✅ Encontrado: Unidad didáctica CEDEC
├─ Recursos: 3 actividadesObtener preguntas con obtenerPreguntasPorTema():
├─ ¿Khan para "Revolución Francesa"? → NO
├─ ¿Banco Custom? → NO (tema histórico específico)
└─ Usar Default (10 preguntas genéricas adaptables)
   ✅ FIN - COSTO: €0.00
```

---

## 📊 ESTADÍSTICAS DE USO (Proyectadas)

### Por Fuente

| Fuente | % Uso Esperado | Asignaturas Principales | Costo/ejercicio |
|--------|---------------|------------------------|-----------------|
| **Bibliotecas** | 20% | Lengua, Galego | €0.00 |
| **INTEF/CEDEC** | 30% | Todas | €0.00 |
| **Khan Academy** | 35% | Matemáticas, Ciencias | €0.00 |
| **Banco Custom** | 10% | Lengua, Sociales | €0.00 |
| **Default** | 5% | Temas raros | €0.00 |

### Ahorro Total

Con **100% contenido gratuito**:
- Costo actual: **€0.00/ejercicio**
- vs IA (OpenAI): **€0.03/ejercicio**
- **Ahorro**: 100%

---

## 🔧 CONFIGURACIÓN AVANZADA

### Cambiar Prioridad de Bibliotecas

Edita `src/services/bibliotecas/biblioteca-manager.js`:

```javascript
// Por defecto: Gutenberg primero (dominio público)
this.priority = ['gutenberg', 'openlibrary'];

// Para priorizar OpenLibrary (más variedad):
this.priority = ['openlibrary', 'gutenberg'];
```

### Desactivar Bibliotecas Temporalmente

Edita `src/services/smart-worksheet-generator.js`:

```javascript
// Línea 28: Comentar para desactivar
// if (shouldUseBibliotecas(subject.name, activityType)) {
//    ...
// }
```

### Forzar Solo INTEF (Sin Khan ni Bibliotecas)

```javascript
// En smart-worksheet-generator.js
// Comentar PASO 0 (bibliotecas)
// Y en banco-preguntas.js, comentar PRIORIDAD 1 (Khan)
```

---

## 🚀 ¿QUÉ HACE FALTA PARA ACTIVAR?

### Fuentes Ya Activas ✅
- [x] Khan Academy (embebido, funcional)
- [x] Banco Custom (100+ preguntas manuales)
- [x] INTEF/Procomún (API integrada)
- [x] CEDEC (incluido en INTEF automático)
- [x] Bibliotecas Digitales (código implementado)

### Pendiente de Activación ⏳
- [ ] **Ejecutar SQL**: `setup_bibliotecas_cache.sql` en Supabase
- [ ] Testing de bibliotecas con ficha de Lengua
- [ ] Verificación de cache funcionando

---

## 🎓 MEJORAS FUTURAS (Opcional)

### Fase 2: Más Bibliotecas
- [ ] Biblioteca Virtual Cervantes (literatura española)
- [ ] Wikisource (documentos históricos)
- [ ] Europeana (multimedia educativo)

### Fase 3: IA Selectiva (Premium)
- [ ] IA solo para corrección (no generación)
- [ ] IA para feedback personalizado
- [ ] IA para adaptación de dificultad

---

**Última actualización**: 2025-12-14  
**Sistema**: 100% Contenido Gratuito  
**Costo operativo**: €0.00  
**Escalabilidad**: ∞
