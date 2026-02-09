# 🎓 CÓMO AMPLIAR CONTENIDO DE KHAN ACADEMY

## 📚 3 ESTRATEGIAS PARA EXPANDIR

---

## **OPCIÓN 1: Manual (RECOMENDADO) ✅**

### **Ventajas:**
- ✅ Calidad garantizada
- ✅ Contenido validado
- ✅ Sin dependencias
- ✅ Gratis
- ✅ Rápido (5-10 min por tema)

### **Cómo hacerlo:**

#### **Paso 1: Navegar Khan Academy en español**
```
https://es.khanacademy.org/math
```

Busca el tema que quieres agregar (ej: "Potencias")

#### **Paso 2: Ver ejercicios**
Khan Academy muestra:
- Título del ejercicio
- Problema ejemplo
- Solución paso a paso
- Explicación

#### **Paso 3: Copiar estructura al código**

Edita: `src/services/khan/khan-fetcher.js`

```javascript
export const KHAN_EXERCISES = {
    'Matemáticas': {
        // AGREGAR NUEVO TEMA AQUÍ ↓
        'Potencias': {
            source: 'Khan Academy',
            url: 'https://es.khanacademy.org/math/algebra/exponents',
            ejercicios: [
                {
                    tipo: 'Potencias básicas',
                    ejercicio: 'Calcula: 2³',
                    respuesta: '8',
                    explicacion: '2³ = 2 × 2 × 2 = 8'
                },
                {
                    tipo: 'Potencias con base negativa',
                    ejercicio: 'Calcula: (-3)²',
                    respuesta: '9',
                    explicacion: '(-3)² = (-3) × (-3) = 9'
                },
                {
                    tipo: 'Potencias de 10',
                    ejercicio: 'Escribe 1000 como potencia de 10',
                    respuesta: '10³',
                    explicacion: '1000 = 10 × 10 × 10 = 10³'
                },
                // Agregar hasta 10-15 ejercicios
            ]
        },
        
        // Temas existentes...
        'Fracciones': { /* ... */ }
    }
};
```

#### **Paso 4: Guardar y listo**
El sistema automáticamente detecta el nuevo tema.

---

## **OPCIÓN 2: Semi-automática (scraping) 🤖**

### **Ventajas:**
- Más ejercicios automáticamente
- Menos trabajo manual

### **Desventajas:**
- Requiere scraper específico
- Khan Academy puede cambiar HTML
- Necesita mantenimiento

### **Cómo implementar:**

#### **1. Instalar dependencias:**
```bash
npm install puppeteer
```

#### **2. Crear scraper:**

`src/services/khan/khan-scraper.js`:

```javascript
import puppeteer from 'puppeteer';

export async function scrapeKhanTopic(topicURL) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(topicURL, { waitUntil: 'networkidle0' });
    
    // Esperar que carguen los ejercicios
    await page.waitForSelector('.exercise-card');
    
    // Extraer ejercicios
    const ejercicios = await page.evaluate(() => {
        const cards = document.querySelectorAll('.exercise-card');
        return Array.from(cards).map(card => ({
            titulo: card.querySelector('.exercise-title')?.textContent,
            descripcion: card.querySelector('.exercise-description')?.textContent,
            url: card.querySelector('a')?.href
        }));
    });
    
    await browser.close();
    return ejercicios;
}

// Uso:
const ejercicios = await scrapeKhanTopic('https://es.khanacademy.org/math/algebra');
```

**⚠️ LIMITACIONES:**
- Khan Academy puede bloquear scraping masivo
- HTML puede cambiar
- Más complejo de mantener

---

## **OPCIÓN 3: API de Khan Academy (limitada) 🔌**

### **API pública:**
```
https://www.khanacademy.org/api/v1
```

### **Endpoints útiles:**

#### **1. Listar topics:**
```
GET /topictree
```

#### **2. Ejercicios de un topic:**
```
GET /topic/{topic_slug}/exercises
```

### **Código ejemplo:**

```javascript
export async function getKhanExercisesFromAPI(topicSlug) {
    const url = `https://www.khanacademy.org/api/v1/topic/${topicSlug}/exercises`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data.map(exercise => ({
        name: exercise.name,
        display_name: exercise.display_name,
        description: exercise.description,
        ka_url: exercise.ka_url
    }));
}
```

**⚠️ LIMITACIONES:**
- API limitada (no todos los datos)
- No incluye problemas específicos
- Rate limiting
- Documentación incompleta

---

## 🎯 **RECOMENDACIÓN: OPCIÓN 1 (Manual)**

### **Por qué:**
1. **Calidad**: Tú eliges los mejores ejercicios
2. **Control**: Sabes exactamente qué hay
3. **Mantenimiento**: No se rompe si KA cambia
4. **Rápido**: 10 min por tema
5. **Gratis**: Sin APIs ni scraping

### **Flujo de trabajo eficiente:**

#### **1. Elegir tema (2 min)**
Visita: https://es.khanacademy.org/
Busca tema que necesites

#### **2. Recopilar 10-15 ejercicios (5 min)**
Anota:
- Tipo de ejercicio
- Problema
- Respuesta
- Explicación breve

#### **3. Agregar al código (3 min)**
Copiar-pegar en `khan-fetcher.js`

**Total: ~10 minutos por tema**

---

## 📋 **PLANTILLA PARA AGREGAR TEMAS**

Copia esto en `khan-fetcher.js`:

```javascript
'NuevoTema': {
    source: 'Khan Academy',
    url: 'https://es.khanacademy.org/...',
    ejercicios: [
        {
            tipo: 'Descripción corta del tipo',
            ejercicio: 'Enunciado del problema',
            respuesta: 'Respuesta correcta',
            explicacion: 'Paso a paso de cómo resolverlo'
        },
        {
            tipo: 'Otro tipo',
            ejercicio: '¿Pregunta?',
            respuesta: 'Respuesta',
            explicacion: 'Explicación'
        },
        // ... hasta 10-15 ejercicios
    ]
}
```

---

## 🚀 **TEMAS PRIORITARIOS A AGREGAR**

### **Matemáticas:**
- ✅ Fracciones (12) ← Ya tienes
- ✅ Ecuaciones (8) ← Ya tienes
- ✅ Geometría (8) ← Ya tienes
- ⭐ **Potencias** (0) ← Añadir
- ⭐ **Raíces** (0) ← Añadir
- ⭐ **Porcentajes** (0) ← Añadir
- ⭐ **Probabilidad** (0) ← Añadir
- ⭐ **Estadística** (0) ← Añadir
- ⭐ **Funciones** (0) ← Añadir

### **Ciencias:**
- ✅ Biología (3) ← Ya tienes
- ⭐ **Física** (0) ← Añadir
- ⭐ **Química** (0) ← Añadir

### **Otros:**
- ⭐ **Programación** (0) ← Añadir
- ⭐ **Economía** (0) ← Añadir

---

## 💡 **EJEMPLO COMPLETO: Agregar "Potencias"**

### **Paso a paso:**

#### **1. Ve a Khan Academy:**
```
https://es.khanacademy.org/math/algebra/exponents-radicals
```

#### **2. Mira ejercicios y anota:**

**Ejercicio 1:**
- Tipo: Potencias básicas
- Problema: Calcula 5²
- Respuesta: 25
- Explicación: 5² = 5 × 5 = 25

**Ejercicio 2:**
- Tipo: Potencias negativas
- Problema: Calcula (-2)³
- Respuesta: -8
- Explicación: (-2)³ = (-2) × (-2) × (-2) = -8

... (hasta 10-15)

#### **3. Agrega al código:**

Abre: `src/services/khan/khan-fetcher.js`

Busca: `export const KHAN_EXERCISES = {`

Agrega después de Geometría:

```javascript
'Potencias': {
    source: 'Khan Academy',
    url: 'https://es.khanacademy.org/math/algebra/exponents-radicals',
    ejercicios: [
        {
            tipo: 'Potencias básicas',
            ejercicio: 'Calcula: 5²',
            respuesta: '25',
            explicacion: '5² = 5 × 5 = 25'
        },
        {
            tipo: 'Potencias con exponente negativo',
            ejercicio: 'Calcula: (-2)³',
            respuesta: '-8',
            explicacion: '(-2)³ = (-2) × (-2) × (-2) = -8'
        },
        {
            tipo: 'Potencias de 10',
            ejercicio: 'Expresa 10000 como potencia de 10',
            respuesta: '10⁴',
            explicacion: '10000 = 10 × 10 × 10 × 10 = 10⁴'
        },
        {
            tipo: 'Multiplicación de potencias',
            ejercicio: 'Simplifica: 2³ × 2²',
            respuesta: '2⁵ = 32',
            explicacion: '2³ × 2² = 2^(3+2) = 2⁵ = 32'
        },
        {
            tipo: 'División de potencias',
            ejercicio: 'Simplifica: 3⁵ ÷ 3²',
            respuesta: '3³ = 27',
            explicacion: '3⁵ ÷ 3² = 3^(5-2) = 3³ = 27'
        },
        {
            tipo: 'Potencia de potencia',
            ejercicio: 'Simplifica: (2²)³',
            respuesta: '2⁶ = 64',
            explicacion: '(2²)³ = 2^(2×3) = 2⁶ = 64'
        },
        {
            tipo: 'Potencia cero',
            ejercicio: 'Calcula: 7⁰',
            respuesta: '1',
            explicacion: 'Cualquier número elevado a 0 es 1'
        },
        {
            tipo: 'Potencia uno',
            ejercicio: 'Calcula: 15¹',
            respuesta: '15',
            explicacion: 'Cualquier número elevado a 1 es él mismo'
        },
        {
            tipo: 'Base fraccionaria',
            ejercicio: 'Calcula: (1/2)³',
            respuesta: '1/8',
            explicacion: '(1/2)³ = 1/2 × 1/2 × 1/2 = 1/8'
        },
        {
            tipo: 'Comparar potencias',
            ejercicio: '¿Qué es mayor: 2⁴ o 4²?',
            respuesta: 'Son iguales (16)',
            explicacion: '2⁴ = 16 y 4² = 16'
        }
    ]
}
```

#### **4. Guardar**
Vite recarga automáticamente.

#### **5. Probar:**
1. Matemáticas
2. "Potencias"
3. Generar

**¡Funciona!** 🎉

---

## 📊 **ESTADÍSTICAS ACTUALES**

| Asignatura | Temas | Ejercicios | Estado |
|------------|-------|------------|--------|
| Matemáticas | 3 | 28 | ✅ Básico |
| Ciencias | 1 | 3 | ⚠️ Muy limitado |
| **Total** | **4** | **31** | 📈 Expandible |

### **Meta sugerida:**
| Asignatura | Temas objetivo | Ejercicios objetivo |
|------------|----------------|---------------------|
| Matemáticas | 10-15 | 100-150 |
| Ciencias | 5-8 | 50-80 |
| Programación | 3-5 | 30-50 |
| **Total** | **20+** | **200+** |

**Tiempo estimado:** 3-4 horas de trabajo (20 temas × 10 min/tema)

---

## 🎯 **ACCIÓN INMEDIATA**

### **Opción A: Yo te ayudo ahora**
Dime qué tema quieres agregar y lo agrego contigo en vivo.

Ejemplos:
- "Potencias"
- "Probabilidad"
- "Física - Fuerzas"
- "Química - Átomos"

### **Opción B: Tú lo haces después**
1. Usa la plantilla de arriba
2. Ve a es.khanacademy.org
3. Copia 10 ejercicios
4. Pega en khan-fetcher.js
5. Listo!

---

## 💡 **TIPS**

1. **Calidad > Cantidad**: Mejor 10 ejercicios buenos que 50 malos
2. **Variedad**: Diferentes tipos y dificultades
3. **Explicaciones claras**: Paso a paso
4. **Probar siempre**: Genera worksheet para verificar
5. **Progresión**: Fácil → Media → Difícil

---

**¿Qué tema quieres agregar primero?** 🎓

Te ayudo a expandir el contenido ahora mismo! 🚀

