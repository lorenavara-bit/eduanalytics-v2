# 🔒 SISTEMA DE FILTRADO DE LICENCIAS

## 🎯 OBJETIVO

Implementar un sistema que automáticamente filtre ejercicios con licencias no comerciales (NC) cuando la aplicación se ejecute en modo comercial.

---

## ⚖️ REGLA PRINCIPAL

```
SI licencia contiene "NC" (No Comercial)
ENTONCES no mostrar en webapp comercial
```

---

## 📁 ARCHIVOS CREADOS

### **1. `licencias-service.js`** - Motor de Filtrado
Funcionalidades:
- ✅ Detección automática de licencias NC
- ✅ Soporte para Creative Commons completo
- ✅ Filtrado automático según entorno
- ✅ Estadísticas de licencias
- ✅ Logging detallado

### **2. Configuración en `banco-preguntas.js`**
- ✅ Importación del servicio de licencias
- ✅ Filtrado automático después de combinar fuentes
- ✅ Logging de ejercicios filtrados

### **3. Ejemplo en `santillana-4-primaria-SOCIALES.js`**
- ✅ Ejercicios marcados como PROPRIETARY (permitidos)

### **4. `EJEMPLO-EJERCICIOS-NC.js`**
- ✅ Ejemplos de ejercicios NC (filtrados en comercial)

---

## 🏷️ TIPOS DE LICENCIA SOPORTADOS

### **Creative Commons (Permitidas en Comercial):**

| Código | Nombre | Comercial | Descripción |
|--------|--------|-----------|-------------|
| `CC-BY` | Attribution | ✅ SÍ | Con atribución |
| `CC-BY-SA` | Attribution-ShareAlike | ✅ SÍ | Con atribución y compartir igual |
| `CC-BY-ND` | Attribution-NoDerivatives | ✅ SÍ | Sin modificaciones |
| `CC0` | Dominio Público | ✅ SÍ | Sin restricciones |

### **Creative Commons (NO Permitidas en Comercial):**

| Código | Nombre | Comercial | Descripción |
|--------|--------|-----------|-------------|
| `CC-BY-NC` | NonCommercial | ❌ NO | **NO** uso comercial |
| `CC-BY-NC-SA` | NC-ShareAlike | ❌ NO | **NO** comercial, compartir igual |
| `CC-BY-NC-ND` | NC-NoDerivatives | ❌ NO | **NO** comercial ni modificaciones |

### **Otras Licencias:**

| Código | Nombre | Comercial |
|--------|--------|-----------|
| `EDUCATIONAL` | Solo Educativo | ❌ NO |
| `PROPRIETARY` | Contenido Propietario | ✅ SÍ |
| `CUSTOM` | Personalizada | ⚠️ Verificar |
| Sin licencia | (vacío) | ✅ SÍ (asume propietario) |

---

## 🔧 CONFIGURACIÓN DE ENTORNO

### **Variable de Entorno:**

Crea o modifica `.env`:

```env
# Modo Comercial (filtra contenido NC)
REACT_APP_COMMERCIAL=true

# Modo Educativo/Desarrollo (muestra todo)
REACT_APP_COMMERCIAL=false
```

### **Detección Automática:**

```javascript
// En licencias-service.js
const ENTORNO_COMERCIAL = 
    process.env.REACT_APP_COMMERCIAL === 'true' || 
    process.env.NODE_ENV === 'production';
```

**Comportamiento:**
- **Producción** → Automáticamente comercial
- **Desarrollo** → Muestra todo (educativo)
- **`.env` configurado** → Sigue configuración

---

## 💡 CÓMO FUNCIONA

### **1. Al agregar ejercicios:**

```javascript
// Agregar campo de licencia
{
    source: 'Santillana 4º Primaria',
    nivel: '4º Primaria',
    licencia: 'PROPRIETARY',  // ✅ Permitido
    ejercicios: [...]
}

// O marcar como no comercial
{
    source: 'Recurso Educativo',
    licencia: 'CC-BY-NC',  // ❌ Filtrado en comercial
    ejercicios: [...]
}
```

### **2. Filtrado Automático:**

```javascript
// En obtenerPreguntasPorTema()
const todasLasPreguntas = [...]; // Combina todas las fuentes

// Filtrar por licencia
const preguntasFiltradas = filtrarPorLicencia(todasLasPreguntas);
// ↑ Automáticamente remueve ejercicios NC si COMERCIAL=true

// Aleatorizar
const preguntasAleatorias = shuffleArray(preguntasFiltradas);
```

### **3. Logging en Consola:**

```
🎓 Buscando en Khan Academy/Santillana...
✅ 12 preguntas de Khan Academy/Santillana
📖 Buscando en Banco de Preguntas...
✅ 30 preguntas del Banco de Preguntas
🎯 TOTAL combinado: 42 preguntas de todas las fuentes
⚠️ Ejercicio filtrado por licencia CC-BY-NC: "¿Quién descubrió América?"
🔒 Filtradas 3 preguntas por restricciones de licencia
🎯 39 preguntas disponibles después del filtrado
```

---

## 📊 EJEMPLO PRÁCTICO

### **Escenario: Webapp Comercial**

```javascript
// .env
REACT_APP_COMMERCIAL=true

// Ejercicios disponibles:
const ejercicios = [
    { pregunta: 'Q1', licencia: 'PROPRIETARY' },      // ✅ se muestra
    { pregunta: 'Q2', licencia: 'CC-BY' },            // ✅ se muestra
    { pregunta: 'Q3', licencia: 'CC-BY-NC' },         // ❌ FILTRADO
    { pregunta: 'Q4', licencia: 'EDUCATIONAL' },      // ❌ FILTRADO
    { pregunta: 'Q5' }  // sin licencia               // ✅ se muestra
];

// Resultado después del filtro:
// [Q1, Q2, Q5]  (3 ejercicios)
```

### **Escenario: Modo Educativo (desarrollo)**

```javascript
// .env
REACT_APP_COMMERCIAL=false

// Mismo conjunto de ejercicios
const ejercicios = [...];

// Resultado:
// [Q1, Q2, Q3, Q4, Q5]  (todos - 5 ejercicios)
```

---

## 🔍 FUNCIONES DISPONIBLES

### **1. `esLicenciaComercial(licencia)`**

Verifica si una licencia permite uso comercial:

```javascript
esLicenciaComercial('CC-BY')       // → true
esLicenciaComercial('CC-BY-NC')    // → false
esLicenciaComercial('PROPRIETARY') // → true
esLicenciaComercial(null)          // → true (asume propietario)
```

### **2. `filtrarPorLicencia(ejercicios, modoComercial)`**

Filtra un array de ejercicios:

```javascript
const ejerciciosFiltrados = filtrarPorLicencia(ejercicios);
// Automáticamente usa ENTORNO_COMERCIAL

// O forzar modo:
const todoEjercicios = filtrarPorLicencia(ejercicios, false);
```

### **3. `filtrarEjerciciosPorTema(ejerciciosPorTema)`**

Filtra un objeto completo:

```javascript
const temasFiltrados = filtrarEjerciciosPorTema({
    'Tema 1': { ejercicios: [...] },
    'Tema 2': { ejercicios: [...] }
});
```

### **4. `obtenerEstadisticasLicencias(ejercicios)`**

Obtiene estadísticas:

```javascript
const stats = obtenerEstadisticasLicencias(ejercicios);
// {
//   total: 50,
//   comercialPermitido: 45,
//   comercialRestringido: 5,
//   porTipo: { 'CC-BY-NC': 3, 'EDUCATIONAL': 2 }
// }
```

### **5. `generarReporteLicencias(ejercicios)`**

Genera reporte en consola:

```javascript
generarReporteLicencias(ejercicios);

// Output:
// 📊 REPORTE DE LICENCIAS:
//    Total ejercicios: 50
//    ✅ Comercial permitido: 45
//    🔒 Comercial restringido: 5
//    Desglose por tipo:
//       - CC-BY-NC: 3
//       - EDUCATIONAL: 2
```

---

## 🚦 ESTADOS Y COMPORTAMIENTO

### **Modo Producción (Comercial):**
```
REACT_APP_COMMERCIAL=true  o  NODE_ENV=production

✅ Muestra: PROPRIETARY, CC-BY, CC-BY-SA, CC0, sin licencia
❌ Oculta: CC-BY-NC, CC-BY-NC-SA, EDUCATIONAL, cualquier NC
🔒 Filtrado activo
⚠️ Logs de ejercicios filtrados
```

### **Modo Desarrollo (Educativo):**
```
REACT_APP_COMMERCIAL=false  y  NODE_ENV=development

✅ Muestra: TODO el contenido
🎓 Sin filtrado
ℹ️ Log: "Modo educativo: mostrando todo el contenido"
```

---

## ⚙️ INTEGRACIÓN EN LA APLICACIÓN

### **Ya integrado en:**

1. ✅ `banco-preguntas.js` - Función `obtenerPreguntasPorTema()`
   - Filtra automáticamente después de combinar fuentes
   
2. ✅ Santillana Sociales - Ejemplo con licencia PROPRIETARY

### **Próximamente (si es necesario):**

- [ ] `khan-fetcher.js` - Filtrar en origen
- [ ] Componente de ficha - Mostrar icono de licencia
- [ ] Admin panel - Ver estadísticas de licencias
- [ ] Configuración por usuario - Sobrescribir modo

---

## 📋 CHECKLIST PARA AGREGAR CONTENIDO NUEVO

Al agregar nuevos ejercicios, sigue estos pasos:

### **1. Contenido Propietario (tuyo o con derechos):**
```javascript
{
    source: 'Mi Editorial',
    licencia: 'PROPRIETARY',  // ✅ Uso comercial permitido
    ejercicios: [...]
}
```

### **2. Contenido de Terceros:**

**Verifica la licencia original:**

- Wikipedia, OpenStreetMap → Generalmente `CC-BY-SA`
- Khan Academy → Generalmente `CC-BY-NC-SA` (¡cuidado!)
- Material educativo gubernamental → Verificar, puede ser libre o restringido
- Recursos de profesores → Pedir permiso o marcar `CC-BY-NC`

```javascript
{
    source: 'Wikipedia',
    licencia: 'CC-BY-SA',  // ✅ Comercial OK con atribución
    ejercicios: [...]
}
```

### **3. Sin Certeza:**

Si no estás seguro:
```javascript
{
    source: 'Fuente Desconocida',
    licencia: 'CC-BY-NC',  // ⚠️ Por seguridad, marcar como NC
    ejercicios: [...]
}
```

### **4. No Especificar:**

Si no especificas licencia, **se asume PROPRIETARY** (contenido propietario, uso comercial permitido).

---

## 🧪 CÓMO PROBAR

### **1. Modo Comercial:**

```bash
# En .env
REACT_APP_COMMERCIAL=true

# Ejecutar app
npm run dev

# Verificar consola:
# Deberías ver logs de filtrado si hay contenido NC
```

### **2. Modo Educativo:**

```bash
# En .env
REACT_APP_COMMERCIAL=false

# Ejecutar app
npm run dev

# Verificar consola:
# "🎓 Modo educativo: mostrando todo el contenido"
```

### **3. Comparar:**

Genera la misma ficha en ambos modos y cuenta las preguntas. Si hay contenido NC, en modo comercial habrá menos preguntas.

---

## ⚠️ ADVERTENCIAS LEGALES

### **Importante:**

1. **Revisar cada licencia:** Este sistema filtra automáticamente, pero **tú eres responsable** de verificar que las licencias estén correctamente asignadas.

2. **Atribución:** Algunas licencias (CC-BY, CC-BY-SA) requieren dar crédito. Considera agregar un campo `atribucion`:
   ```javascript
   {
       licencia: 'CC-BY-SA',
       atribucion: 'Material de Wikipedia, CC-BY-SA 3.0'
   }
   ```

3. **Dominio Público:** Contenido muy antiguo o gubernamental puede estar en dominio público (`CC0`).

4. **Consultar abogado:** Para uso comercial serio, consulta con un abogado especializado en propiedad intelectual.

---

## 📈 ESTADÍSTICAS Y MONITOREO

```javascript
import { generarReporteLicencias } from './licencias-service';

// En componente o script
const stats = generarReporteLicencias(todosLosEjercicios);

console.log(stats);
// {
//   total: 500,
//   comercialPermitido: 450,
//   comercialRestringido: 50,
//   sinLicencia: 100,
//   porTipo: {
//     'PROPRIETARY': 350,
//     'CC-BY': 50,
//     'CC-BY-SA': 50,
//     'CC-BY-NC': 30,
//     'EDUCATIONAL': 20
//   }
// }
```

---

## ✅ RESUMEN

| Característica | Estado |
|----------------|--------|
| Servicio de licencias | ✅ Creado |
| Detección de NC | ✅ Implementado |
| Filtrado automático | ✅ Integrado |
| Configuración por entorno | ✅ Funcional |
| Logging detallado | ✅ Activo |
| Ejemplos | ✅ Incluidos |
| Documentación | ✅ Completa |

---

## 🚀 PRÓXIMOS PASOS

1. **Revisar contenido existente:** Agregar campo `licencia` a todos los ejercicios actuales
2. **Crear política interna:** Definir qué licencias aceptar
3. **Panel de administración:** Interfaz para ver estadísticas
4. **Exportar atribuciones:** Generar documento con todos los créditos necesarios
5. **Auditoría legal:** Revisar con abogado antes de lanzar comercialmente

---

*Sistema implementado: 2025-12-15*  
*Listo para uso en producción* ✅
