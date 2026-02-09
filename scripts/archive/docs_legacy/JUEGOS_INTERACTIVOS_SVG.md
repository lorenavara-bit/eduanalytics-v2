# 🎮 Sistema de Juegos Interactivos SVG - Documentación

## ¿Qué hemos creado?

Un sistema modular de actividades interactivas que el **Tutor IA** puede invocar durante las conversaciones para hacer el aprendizaje más visual y práctico.

---

## 📂 Estructura de Archivos

```
src/components/interactive/
├── InteractiveGame.jsx          # Wrapper principal (gestiona todos los juegos)
├── InteractiveGame.css          # Estilos del wrapper
├── InteractiveSpainMap.jsx      # Mapa de provincias de España (✅ COMPLETO)
└── InteractiveSpainMap.css      # Estilos del mapa
```

---

## 🗺️ Juegos Disponibles

### 1. **Mapa de Provincias de España** ✅ FUNCIONAL

**Tipo:** `spain_provinces`

**Modos:**
- **`identify`** - El tutor pregunta una provincia y el estudiante hace click
- **`explore`** - Modo libre donde puede ver nombres al hacer click

**Ejemplo de uso:**

```jsx
<InteractiveGame 
  type="spain_provinces"
  data={{
    mode: 'identify',
    targetProvince: 'Sevilla' // La que debe encontrar
  }}
  onAnswer={(result) => {
    console.log(result);
    // { type, isCorrect, answer, expected }
  }}
/>
```

**Provincias incluidas:** 47 provincias españolas con posición aproximada

---

## 🔮 Juegos Futuros (Próximamente)

### 2. **Mapa de Andalucía**
- Tipo: `andalucia_provinces`
- 8 provincias andaluzas con más detalle

### 3. **Mapa de Europa**
- Tipo: `europe_countries`
- Países europeos interactivos

### 4. **Sistema Solar**
- Tipo: `solar_system`
- Planetas, órbitas, datos astronómicos

### 5. **Ciclo del Agua**
- Tipo: `water_cycle`
- Etapas del ciclo con animación

### 6. **Cuerpo Humano**
- Tipo: `human_body`
- Órganos y sistemas

---

## 🎯 Cómo el Tutor IA Usa Los Juegos

### Flujo de Conversación:

```
Usuario: "Necesito practicar las provincias de España"

Tutor IA:
1. Detecta intención → provincias de España
2. Genera mensaje con metadata especial
3. El frontend renderiza el juego interactivo
4. Usuario interactúa
5. Respuesta se envía de vuelta al tutor
6. Tutor evalúa y da feedback
```

### Formato del Mensaje del Tutor:

```json
{
  "role": "assistant",
  "content": "¡Genial! Voy a mostrarte un mapa de España. Haz click en la provincia de **Sevilla**.",
  "metadata": {
    "interactive": true,
    "game_type": "spain_provinces",
    "game_data": {
      "mode": "identify",
      "targetProvince": "Sevilla"
    }
  }
}
```

---

## 🔧 Integración con el Tutor IA

### PASO 1: Actualizar `TutorAI.jsx`

Añadir lógica para detectar mensajes con juegos:

```jsx
// En el componente TutorAI.jsx
import InteractiveGame from '../interactive/InteractiveGame';

// Al renderizar mensajes:
{msg.metadata?.interactive && (
  <InteractiveGame 
    type={msg.metadata.game_type}
    data={msg.metadata.game_data}
    onAnswer={(result) => handleGameAnswer(result, msg.id)}
  />
)}
```

### PASO 2: Actualizar el Prompt del Tutor

En `buildSystemPrompt()`, añadir:

```
JUEGOS INTERACTIVOS DISPONIBLES:
- **spain_provinces**: Mapa de provincias de España
  Uso: Cuando el estudiante necesite practicar geografía española
  Ejemplo: "Haz click en Sevilla en el mapa."

Para invocar un juego, DEBES incluir esta metadata en tu respuesta:
[GAME:spain_provinces|mode:identify|target:Sevilla]

El sistema interpretará esto y mostrará el juego automáticamente.
```

### PASO 3: Parser de Comandos del Tutor

Crear función que detecte comandos `[GAME:...]`:

```javascript
function parseGameCommand(content) {
  const gameMatch = content.match(/\[GAME:(\w+)\|(.+?)\]/);
  if (!gameMatch) return null;

  const [_, gameType, params] = gameMatch;
  const gameData = {};
  
  params.split('|').forEach(param => {
    const [key, value] = param.split(':');
    gameData[key] = value;
  });

  return { gameType, gameData };
}
```

---

## 💡 Ejemplo Completo de Uso

### Conversación:

**Usuario:** "Ayúdame a estudiar las provincias de Andalucía"

**Tutor IA (respuesta):**
```
¡Claro! Vamos a practicar con un mapa interactivo de España.

¿Puedes hacer click en la provincia de **Sevilla**?

[GAME:spain_provinces|mode:identify|target:Sevilla]
```

**Sistema:**
1. Detecta `[GAME:...]`
2. Extrae: `type = spain_provinces`, `data = {mode: 'identify', target: 'Sevilla'}`
3. Renderiza `<InteractiveGame type="spain_provinces" data={...} />`
4. Muestra el mapa con las 47 provincias
5. Usuario hace click en una provincia
6. `onAnswer()` se dispara con: `{ isCorrect: true/false, answer: 'Sevilla', ... }`
7. Se envía como nuevo mensaje al tutor
8. Tutor responde con feedback

**Tutor IA (después del click):**
```
¡Muy bien! 🎉 Has encontrado Sevilla correctamente.
Sevilla es la capital de Andalucía y está en el suroeste de España.

¿Probamos con otra? Haz click en **Granada**.

[GAME:spain_provinces|mode:identify|target:Granada]
```

---

## 🚀 Próximos Pasos

### Para que funcione al 100%:

1. ✅ Componentes SVG creados
2. ⏳ Actualizar `TutorAI.jsx` para renderizar juegos
3. ⏳ Añadir parser de comandos `[GAME:...]`
4. ⏳ Actualizar prompt del tutor para que sepa cuándo usar juegos
5. ⏳ Crear más juegos (Andalucía, Europa, Sistema Solar, etc.)

---

## 📝 Cómo Añadir Más Juegos

### Template para nuevo juego:

1. Crear archivo: `src/components/interactive/InteractiveMyGame.jsx`
2. Implementar lógica SVG interactiva
3. Añadir en `InteractiveGame.jsx`:

```jsx
case 'my_game':
  return (
    <InteractiveMyGame
      mode={data.mode}
      onAnswer={(result) => onAnswer( result)}
    />
  );
```

4. Documentar en el prompt del tutor

--- 

## 🎨 Ventajas de Este Sistema

✅ **Modular** - Fácil añadir nuevos juegos  
✅ **Reutilizable** - Un componente = múltiples usos  
✅ **Interactivo** - El estudiante aprende haciendo  
✅ **Gratis** - Solo SVG, no APIs externas  
✅ **Offline** - Funciona sin conexión  
✅ **Educativo** - Feedback inmediato  

---

¿Quieres que ahora **integre esto en el Tutor IA** para que funcione automáticamente? 🚀
