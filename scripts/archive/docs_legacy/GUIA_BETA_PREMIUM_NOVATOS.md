# 🎓 CÓMO HACER BETA/PREMIUM - GUÍA PARA NOVATOS

## ✅ **NO NECESITAS DOS INTERFACES**

Solo necesitas **UN componente con lógica condicional**. Es más simple de lo que parece!

---

## 📱 **CONCEPTO: Una sola interfaz, características on/off**

```javascript
// CONCEPTO SIMPLE:
if (usuario.esPremium) {
  // Mostrar características premium
} else {
  // Mostrar solo beta gratis
}
```

---

## 🏗️ **ARQUITECTURA SIMPLE**

### **1. Tabla de usuarios en Supabase:**

```sql
-- Agregar campo a tabla profiles:
ALTER TABLE profiles ADD COLUMN plan TEXT DEFAULT 'beta';
-- Valores posibles: 'beta' o 'premium'
```

### **2. Un solo componente con secciones:**

```jsx
function WorksheetGenerator() {
  const [userPlan, setUserPlan] = useState('beta'); // o 'premium'
  
  return (
    <div className="generator">
      {/* PARTE COMÚN (Beta + Premium) */}
      <div className="common-section">
        <select name="subject">Asignatura</select>
        <input name="topic">Tema</input>
        <select name="numQuestions">Cantidad</select>
      </div>
      
      {/* PARTE PREMIUM (solo si tiene plan premium) */}
      {userPlan === 'premium' && (
        <div className="premium-section">
          <h3>🌟 Características Premium</h3>
          <select name="difficulty">Dificultad adaptativa</select>
          <select name="textbook">Libro del cole</select>
        </div>
      )}
      
      {/* BANNER UPGRADE (solo si es beta) */}
      {userPlan === 'beta' && (
        <div className="upgrade-banner">
          <p>💎 ¿Quieres análisis con AI y corrección inteligente?</p>
          <button onClick={handleUpgrade}>Probar Premium</button>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 **EJEMPLO VISUAL**

### **Usuario BETA ve:**
```
┌────────────────────────────────┐
│  📝 Generar Ejercicios        │
├────────────────────────────────┤
│  Asignatura: [Matemáticas  ▼] │
│  Tema: [Multiplicación]        │
│  Cantidad: [10 ▼]              │
│                                │
│      [  Generar Ficha  ]       │
│                                │
├────────────────────────────────┤
│  💎 Prueba Premium             │
│  ✨ Corrección con AI          │
│  📊 Análisis de progreso       │
│  📈 Informes para padres       │
│                                │
│    [Probar Premium Gratis]     │
│    (7 días gratis)             │
└────────────────────────────────┘
```

### **Usuario PREMIUM ve:**
```
┌────────────────────────────────┐
│  📝 Generar Ejercicios 💎      │
├────────────────────────────────┤
│  Asignatura: [Matemáticas  ▼] │
│  Tema: [Multiplicación]        │
│  Cantidad: [10 ▼]              │
│                                │
│  ✨ Personalización Premium:   │
│  Dificultad: [Adaptativa   ▼] │
│  Libro: [SM Savia          ▼] │
│                                │
│      [  Generar Ficha  ]       │
│                                │
│  ✅ Premium Activo             │
│  Tu plan: €7.99/mes            │
└────────────────────────────────┘
```

---

## 💻 **CÓDIGO PASO A PASO**

### **PASO 1: Crear sistema de planes**

```javascript
// src/utils/plans.js

export const PLANS = {
  BETA: {
    id: 'beta',
    name: 'Beta Gratuita',
    price: 0,
    features: [
      'Ejercicios ilimitados',
      'Todas las asignaturas',
      '216+ ejercicios de calidad',
      'Modo Test/Ejercicio',
      'Historial básico'
    ],
    limits: {
      aiCorrection: false,
      progressAnalysis: false,
      parentReports: false,
      adaptiveDifficulty: false,
      textbookAdaptation: false
    }
  },
  
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 7.99,
    features: [
      'Todo de Beta +',
      '✨ Corrección con AI',
      '📊 Análisis de progreso',
      '📈 Informes para padres',
      '🎯 Dificultad adaptativa',
      '📚 Adaptación a libro del cole',
      '🔍 Detección de patrones',
      '💡 Recomendaciones personalizadas'
    ],
    limits: {
      aiCorrection: true,
      progressAnalysis: true,
      parentReports: true,
      adaptiveDifficulty: true,
      textbookAdaptation: true
    }
  }
};

export function getPlanFeatures(planId) {
  return PLANS[planId.toUpperCase()] || PLANS.BETA;
}

export function canUseFeature(userPlan, feature) {
  const plan = getPlanFeatures(userPlan);
  return plan.limits[feature];
}
```

---

### **PASO 2: Hook para detectar plan del usuario**

```javascript
// src/hooks/usePlan.js

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { getPlanFeatures, canUseFeature } from '../utils/plans';

export function usePlan() {
  const [plan, setPlan] = useState('beta');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadUserPlan();
  }, []);
  
  async function loadUserPlan() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();
        
        setPlan(data?.plan || 'beta');
      }
    } catch (error) {
      console.error('Error loading plan:', error);
      setPlan('beta'); // Default a beta si hay error
    } finally {
      setLoading(false);
    }
  }
  
  return {
    plan,
    planFeatures: getPlanFeatures(plan),
    isPremium: plan === 'premium',
    isBeta: plan === 'beta',
    canUse: (feature) => canUseFeature(plan, feature),
    loading
  };
}
```

---

### **PASO 3: Usar en el componente**

```javascript
// src/components/WorksheetGenerator.jsx

import { usePlan } from '../hooks/usePlan';

function WorksheetGenerator() {
  const { plan, isPremium, canUse, planFeatures } = usePlan();
  
  return (
    <div className="generator">
      <h2>📝 Generar Ejercicios {isPremium && '💎'}</h2>
      
      {/* CAMPOS COMUNES (BETA + PREMIUM) */}
      <div className="common-fields">
        <select name="subject">
          <option>Matemáticas</option>
          <option>Lengua Castellana</option>
          {/* más asignaturas */}
        </select>
        
        <input 
          type="text" 
          name="topic" 
          placeholder="ej: Multiplicación" 
        />
        
        <select name="numQuestions">
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </div>
      
      {/* CAMPOS PREMIUM (solo si tiene premium) */}
      {isPremium && (
        <div className="premium-fields">
          <h3>✨ Personalización Premium</h3>
          
          {canUse('adaptiveDifficulty') && (
            <select name="difficulty">
              <option>Adaptativa (AI ajusta)</option>
              <option>Fácil</option>
              <option>Media</option>
              <option>Difícil</option>
            </select>
          )}
          
          {canUse('textbookAdaptation') && (
            <select name="textbook">
              <option value="">-- Elige libro del cole --</option>
              <option>SM Savia</option>
              <option>Santillana</option>
              <option>Anaya</option>
              <option>Edelvives</option>
            </select>
          )}
        </div>
      )}
      
      {/* BANNER UPGRADE (solo para BETA) */}
      {!isPremium && (
        <div className="upgrade-banner">
          <h3>💎 Desbloquea Premium</h3>
          <ul>
            {planFeatures.features.slice(0, 5).map(f => (
              <li key={f}>✨ {f}</li>
            ))}
          </ul>
          <button onClick={() => navigate('/upgrade')}>
            Probar Premium Gratis (7 días)
          </button>
        </div>
      )}
      
      <button onClick={handleGenerate}>
        Generar Ficha
      </button>
    </div>
  );
}
```

---

### **PASO 4: Lógica de generación según plan**

```javascript
async function handleGenerate() {
  const { plan, canUse } = usePlan();
  
  // Generar ejercicios (común para todos)
  const worksheet = await generateSmartWorksheet({
    profile,
    subject,
    topic,
    config: { numQuestions }
  });
  
  setWorksheet(worksheet);
  
  // Si es premium, hacer análisis extra
  if (canUse('progressAnalysis')) {
    await analyzeProgress(worksheet, userHistory);
  }
}

async function handleCorrection(answers) {
  const { canUse } = usePlan();
  
  if (canUse('aiCorrection')) {
    // Corrección con AI (Premium)
    const aiResult = await correctWithAI(answers);
    setCorrectionResult(aiResult);
  } else {
    // Corrección simple (Beta)
    const simpleResult = correctSimple(answers);
    setCorrectionResult(simpleResult);
  }
}
```

---

## 🎨 **COMPONENTE DE UPGRADE**

```javascript
// src/components/UpgradePage.jsx

function UpgradePage() {
  const { plan } = usePlan();
  
  if (plan === 'premium') {
    return <div>¡Ya eres Premium! 🎉</div>;
  }
  
  return (
    <div className="upgrade-page">
      <h1>💎 Actualiza a Premium</h1>
      
      <div className="comparison">
        <div className="plan-card beta">
          <h2>Beta Gratuita</h2>
          <p className="price">€0/mes</p>
          <ul>
            {PLANS.BETA.features.map(f => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <button disabled>Plan Actual</button>
        </div>
        
        <div className="plan-card premium">
          <h2>Premium</h2>
          <p className="price">€7.99/mes</p>
          <ul>
            {PLANS.PREMIUM.features.map(f => (
              <li key={f}>✨ {f}</li>
            ))}
          </ul>
          <button onClick={handleSubscribe}>
            Probar 7 días gratis
          </button>
        </div>
      </div>
      
      <div className="faq">
        <h3>Preguntas frecuentes</h3>
        <details>
          <summary>¿Puedo cancelar cuando quiera?</summary>
          <p>Sí, cancela en cualquier momento sin compromiso.</p>
        </details>
        {/* más FAQs */}
      </div>
    </div>
  );
}
```

---

## 💳 **PASO 5: Sistema de pago (Futuro)**

```javascript
// src/utils/ stripe.js (cuando lo necesites)

// Por ahora, solo cambiar el plan manualmente:
async function upgradeManually(userId) {
  const { error } = await supabase
    .from('profiles')
    .update({ plan: 'premium' })
    .eq('id', userId);
  
  if (!error) {
    alert('¡Ahora eres Premium! 🎉');
  }
}

// En el futuro con Stripe:
async function createSubscription() {
  // Integración con Stripe
  const session = await stripe.checkout.sessions.create({
    price: 'price_xxx', // Tu price ID de Stripe
    success_url: '/success',
    cancel_url: '/upgrade'
  });
  
  window.location.href = session.url;
}
```

---

## 📊 **RESUMEN: UN SOLO CÓDIGO, MÚLTIPLES PLANES**

### **Ventajas:**
✅ **Un solo componente** - Fácil de mantener
✅ **Código limpio** - Lógica clara con `if/else`
✅ **Escalable** - Fácil agregar más planes
✅ **Testeable** - Cambias el plan en base de datos

### **Estructura:**
```
src/
├── components/
│   ├── WorksheetGenerator.jsx  ← UN SOLO componente
│   └── UpgradePage.jsx         ← Página de upgrade
├── hooks/
│   └── usePlan.js              ← Hook para detectar plan
├── utils/
│   └── plans.js                ← Definición de planes
└── supabaseClient.js
```

---

## 🧪 **CÓMO PROBAR AHORA (Sin implementar pago)**

### **1. Agregar campo plan a tu usuario:**
```sql
-- En Supabase SQL Editor:
ALTER TABLE profiles ADD COLUMN plan TEXT DEFAULT 'beta';
```

### **2. Cambiar manualmente entre beta/premium:**
```sql
-- Hacerte premium:
UPDATE profiles SET plan = 'premium' WHERE id = 'tu-user-id';

-- Volver a beta:
UPDATE profiles SET plan = 'beta' WHERE id = 'tu-user-id';
```

### **3. Probar la interfaz:**
- Con `plan='beta'` → No verás campos premium
- Con `plan='premium'` → Verás todos los campos

---

## 🎯 **LO QUE HARÍAS AHORA**

### **Fase 1: Beta gratis (Ya casi está):**
1. ✅ Ejercicios funcionando
2. ✅ 216 ejercicios de calidad
3. ⏳ Agregar campo `plan` a base de datos
4. ⏳ Crear hook `usePlan()`
5. ⏳ Mostrar banner "Upgrade a Premium"

### **Fase 2: Premium (Futuro):**
1. Integrar Stripe para pagos
2. Activar características con AI
3. Dashboard de análisis
4. Informes para padres

---

## ❓ **PREGUNTAS SIMPLES**

### **¿Necesito dos apps?**
❌ NO, una sola app con lógica `if (premium)`

### **¿Necesito dos bases de datos?**
❌ NO, una tabla con campo `plan`

### **¿Es complicado?**
❌ NO, solo añadir `if/else` en el código

### **¿Puedo probarlo sin pagar?**
✅ SÍ, cambias el `plan` manualmente en base de datos

---

## 🚀 **¿QUIERES QUE IMPLEMENTE ESTO AHORA?**

**Opción A:** Implemento la estructura básica (campo plan + hook + mostrar/ocultar)
**Opción B:** Primero prueba con tu hijo la versión actual
**Opción C:** Explicación suficiente, lo haces tú cuando quieras

**¡Dime y seguimos!** 🎯

