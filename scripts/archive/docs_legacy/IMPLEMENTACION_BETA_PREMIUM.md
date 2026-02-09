# ✅ ESTRUCTURA BETA/PREMIUM IMPLEMENTADA

## 🎉 **YA ESTÁ LISTA LA ESTRUCTURA BÁSICA**

---

## 📁 **ARCHIVOS CREADOS:**

1. **`migrations/add_plan_field.sql`**
   - SQL para agregar campo `plan` a la base de datos

2. **`src/utils/plans.js`**
   - Definición de planes Beta y Premium
   - Funciones helper para verificar características

3. **`src/hooks/usePlan.js`**
   - Hook React para detectar plan del usuario
   - Funciones para cambiar plan (testing)

4. **`src/components/PlanBadge.jsx`**
   - Componente de ejemplo
   - Muestra el plan del usuario con estilo

---

## 🚀 **PASO 1: EJECUTAR MIGRACIÓN EN SUPABASE**

### **Ve a Supabase:**
1. Abre https://supabase.com/dashboard
2. Selecciona tu proyecto EduAnalytics
3. Ve a **SQL Editor** (icono de base de datos)
4. Click en **"New query"**
5. Copia y pega TODO el contenido de:
   ```
   migrations/add_plan_field.sql
   ```
6. Click **"Run"**
7. Deberías ver: "Success. No rows returned"

### **Verificar que funcionó:**
1. En Supabase, ve a **Table Editor**
2. Selecciona tabla `profiles`
3. Deberías ver una nueva columna llamada `plan`
4. Todos los usuarios tendrán `plan = 'beta'` por defecto

---

## 🧪 **PASO 2: PROBAR EL SISTEMA**

### **A) Usar el componente PlanBadge:**

```jsx
// En cualquier componente, importa y usa:
import PlanBadge from './components/PlanBadge';

function App() {
  return (
    <div>
      <h1>Mi App</h1>
      <PlanBadge />  {/* Muestra badge del plan */}
    </div>
  );
}
```

### **B) Usar el hook usePlan:**

```jsx
import { usePlan } from './hooks/usePlan';

function WorksheetGenerator() {
  const { 
    plan,        // 'beta' o 'premium'
    isPremium,   // true/false
    canUse,      // función para verificar características
    planFeatures // lista de características
  } = usePlan();
  
  return (
    <div>
      <h2>Generador {isPremium ? '💎' : '🆓'}</h2>
      
      {/* Campos comunes */}
      <select name="subject">Asignatura</select>
      <input name="topic" placeholder="Tema" />
      
      {/* Campos PREMIUM (solo si tiene premium) */}
      {isPremium && (
        <div className="premium-section">
          <h3>✨ Opciones Premium</h3>
          <select name="difficulty">Dificultad</select>
          <select name="textbook">Libro del cole</select>
        </div>
      )}
      
      {/* Banner UPGRADE (solo si es beta) */}
      {!isPremium && (
        <div className="upgrade-banner">
          <h3>💎 Desbloquea Premium</h3>
          <ul>
            {planFeatures.slice(0, 3).map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <button>Probar Premium Gratis</button>
        </div>
      )}
    </div>
  );
}
```

### **C) Verificar características:**

```jsx
const { canUse } = usePlan();

// Verificar si puede usar corrección con AI
if (canUse('aiCorrection')) {
  // Usuario premium - usar AI
  const result = await correctWithAI(answers);
} else {
  // Usuario beta - corrección simple
  const result = correctSimple(answers);
}
```

---

## 🔧 **PASO 3: CAMBIAR PLAN MANUALMENTE (TESTING)**

### **Opción A: Desde Supabase (Recomendado):**

1. Ve a **Table Editor** → `profiles`
2. Encuentra tu usuario
3. Click en la celda `plan`
4. Cambia de `beta` a `premium`
5. Guarda
6. Recarga la app
7. Deberías ver el badge Premium 💎

### **Opción B: Desde código (Development):**

```jsx
import { usePlan } from './hooks/usePlan';

function DevTools() {
  const { plan, changePlan } = usePlan();
  
  return (
    <div className="dev-tools">
      <p>Plan actual: {plan}</p>
      <button onClick={() => changePlan('beta')}>
        Cambiar a Beta
      </button>
      <button onClick={() => changePlan('premium')}>
        Cambiar a Premium
      </button>
    </div>
  );
}
```

---

## 📊 **EJEMPLOS DE USO REAL**

### **1. Mostrar/Ocultar características:**

```jsx
const { isPremium } = usePlan();

return (
  <div>
    {/* Todos ven esto */}
    <button onClick={generateWorksheet}>Generar</button>
    
    {/* Solo Premium ve esto */}
    {isPremium && (
      <button onClick={analyzeWithAI}>Analizar con AI</button>
    )}
  </div>
);
```

### **2. Desbloquear funcionalidades:**

```jsx
const { canUse } = usePlan();

async function handleCorrection() {
  if (canUse('aiCorrection')) {
    return await aiCorrection(answers);  // Premium
  } else {
    return simpleCorrection(answers);     // Beta
  }
}
```

### **3. Mostrar precios:**

```jsx
import { PLANS } from './utils/plans';

function PricingPage() {
  return (
    <div>
      <div className="plan-card">
        <h3>{PLANS.BETA.name}</h3>
        <p>{PLANS.BETA.price === 0 ? 'Gratis' : `€${PLANS.BETA.price}`}</p>
        <ul>
          {PLANS.BETA.features.map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
      
      <div className="plan-card premium">
        <h3>{PLANS.PREMIUM.name}</h3>
        <p>€{PLANS.PREMIUM.price}/mes</p>
        <ul>
          {PLANS.PREMIUM.features.map(f => <li key={f}>{f}</li>)}
        </ul>
       <button>Probar {PLANS.PREMIUM.trialDays} días gratis</button>
      </div>
    </div>
  );
}
```

---

## ✅ **CHECKLIST DE IMPLEMENTACIÓN**

### **Ahora mismo:**
- [ ] Ejecutar migración SQL en Supabase
- [ ] Verificar que columna `plan` existe en tabla `profiles`
- [ ] Reiniciar servidor de desarrollo (Ctrl+C y `npm run dev`)

### **Para probar:**
- [ ] Importar `usePlan` en un componente
- [ ] Ver que muestra `plan: 'beta'`
- [ ] Cambiar a `premium` en Supabase
- [ ] Verificar que cambia en la app

### **Para usar:**
- [ ] Agregar `PlanBadge` en el header de la app
- [ ] Usar condicional `{isPremium &&}` para características premium
- [ ] Mostrar banner "Upgrade" para usuarios beta

---

## 🎯 **PRÓXIMOS PASOS (Cuando quieras)**

### **Ahora tienes:**
✅ Sistema de planes funcionando
✅ Hook para detectar plan
✅ Funciones para verificar características

### **Cuando lo necesites:**
1. **Crear página de Pricing** - Comparar Beta vs Premium
2. **Integrar Stripe** - Para pagos reales
3. **Dashboard Premium** - Características avanzadas con AI
4. **Informes** - Análisis de progreso

---

## 💡 **TIPS**

### **En desarrollo:**
```javascript
// Cambiar fácilmente entre planes para probar
const DEV_MODE = true;

if (DEV_MODE) {
  // Muestra botones para cambiar plan
  <DevTools />
}
```

### **En producción:**
```javascript
// Plan se maneja por Stripe
// No se puede cambiar manualmente
const { plan } = usePlan();
// plan viene de Supabase, actualizado por webhook de Stripe
```

---

## ❓ **FAQ**

### **¿Todos los usuarios son beta por defecto?**
✅ SÍ - Es seguro, nadie paga sin querer

### **¿Puedo cambiar el plan manualmente?**
✅ SÍ - En development/testing
❌ NO - En producción (se usa Stripe)

### **¿Qué pasa si falla la carga del plan?**
✅ Fallback a 'beta' automáticamente

### **¿Cómo pruebo características premium sin pagar?**
✅ Cambia `plan` a `'premium'` en Supabase

---

## 🎉 **¡LISTO!**

Ya tienes la **estructura completa** para Beta/Premium.

**Ahora puedes:**
1. ✅ Detectar si el usuario es Beta o Premium
2. ✅ Mostrar/ocultar características según plan
3. ✅ Mostrar badges y banners
4. ✅ Verificar permisos antes de usar características

**Siguiente paso:** Ejecutar la migración SQL y probar! 🚀

