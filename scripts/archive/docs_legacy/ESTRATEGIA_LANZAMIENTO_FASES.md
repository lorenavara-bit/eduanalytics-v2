# 🚀 ESTRATEGIA DE LANZAMIENTO POR FASES - EDUANALYTICS

**Roadmap de Producto: De BETA a ENTERPRISE**

**Fecha:** 15 de diciembre de 2025  
**Versión Actual Implementada:** v3.3 (Código completo)  
**Estrategia:** Lanzamiento escalonado por valor y riesgo

---

## 📋 ÍNDICE

1. [Visión General](#visión-general)
2. [Estrategia de Fases](#estrategia-fases)
3. [FASE 1: BETA Gratuita](#fase-1-beta)
4. [FASE 2: v2.0 Premium](#fase-2-premium)
5. [FASE 3: v3.0 Enterprise](#fase-3-enterprise)
6. [Modelo de Negocio](#modelo-negocio)
7. [Roadmap Visual](#roadmap-visual)
8. [Plan de Acción Inmediato](#plan-accion)

---

## 🎯 VISIÓN GENERAL

### Objetivo Estratégico

Lanzar EduAnalytics en **3 fases escalonadas** que permiten:
1. **Validar** el producto con usuarios beta (gratis)
2. **Monetizar** las funcionalidades premium (pago)
3. **Liderar** el mercado con capacidades enterprise únicas (premium+)

### Principios de la Estrategia

- ✅ **Gestión de Riesgo Legal:** Empezar con funcionalidades de bajo riesgo
- ✅ **Validación de Mercado:** Beta gratuita para feedback temprano
- ✅ **Monetización Progresiva:** Introducir valor de pago gradualmente
- ✅ **Diferenciación Única:** NEE como funcionalidad exclusiva final

---

## 📊 ESTRATEGIA DE FASES - TABLA RESUMEN

| Fase | Nombre Comercial | Objetivo | Funcionalidades Clave | Riesgo Legal | Precio |
|------|------------------|----------|----------------------|--------------|--------|
| **1** | **BETA Gratuita** | Validar core pedagógico | EC/EP/ETF + LOMLOE + Fichas básicas | **ALTO** | Gratis |
| **2** | **v2.0 Premium Básico** | Monetizar diagnóstico | Heurísticas mejoradas + V/A/K + Tendencias | **MEDIO** | €9.99/mes |
| **3** | **v3.0 Enterprise** | Liderazgo de mercado | NEE + GDPR + Seguridad total | **BAJO** | €29.99/mes |

---

## 🥇 FASE 1: BETA GRATUITA (MVP)

### **Periodo:** Enero - Febrero 2026 (2 meses)

### **Objetivo Principal**

Validar el **core pedagógico** y obtener feedback de usuarios reales sin riesgo legal alto.

### **Funcionalidades Incluidas**

```
✅ CORE PEDAGÓGICO:
├─ Taxonomía de Errores (EC/EP/ETF básicos)
├─ Alineación LOMLOE (etiquetado en código)
├─ Feedback básico (3 dimensiones)
└─ Generación de Fichas (sin personalización)

✅ UI BÁSICA:
├─ InteractiveWorksheet (sin tiempos)
├─ Informe de Evaluación (vista estudiante)
└─ Dashboard simple

❌ NO INCLUIDO:
├─ Personalización V/A/K
├─ Análisis histórico avanzado
├─ Detección NEE
└─ Captura de tiempos
```

### **Tareas Críticas PENDIENTES (Antes de lanzar BETA)**

| # | Tarea | Dependencia | Estado | Prioridad |
|---|-------|-------------|--------|-----------|
| **1** | **Etiquetar TODAS las licencias** | Ninguna | ⚠️ **URGENTE** | 🔴 CRÍTICA |
| **2** | **Etiquetar criterios LOMLOE** | #1 | ⚠️ Pendiente | 🔴 CRÍTICA |
| **3** | Verificar funcionamiento fichas | #1, #2 | ✅ Código OK | 🟡 Media |
| **4** | Testing con 10-20 usuarios | #1, #2, #3 | ⚠️ Pendiente | 🟢 Baja |

### **Implementación Detallada**

#### **TAREA 1: Etiquetar Licencias (CRÍTICO)**

**Problema actual:** 95% de ejercicios sin licencia especificada

**Solución:**

```javascript
// Añadir a CADA ejercicio en khan-por-curso.js:

{
    id: "mat_4p_q001",
    pregunta: "¿Cuánto es 3 + 5?",
    respuesta_correcta: "8",
    
    // AÑADIR OBLIGATORIAMENTE:
    licencia: "PROPRIETARY",  // O "CC-BY", "CC-BY-SA", "PD"
    fuente_original: "Creación propia - EduAnalytics",
    autor: "EduAnalytics Team",
    fecha_creacion: "2025-12-15",
    verificado: true
}
```

**Script de conversión masiva:**

```javascript
// scripts/etiquetar-licencias.js

const fs = require('fs');
const path = require('path');

// Leer todos los archivos de ejercicios
const archivos = fs.readdirSync('./src/services/khan/');

archivos.forEach(archivo => {
    if (!archivo.endsWith('.js')) return;
    
    let contenido = fs.readFileSync(`./src/services/khan/${archivo}`, 'utf8');
    
    // Buscar ejercicios sin licencia
    const regex = /{\s*id:\s*['"]([^'"]+)['"]/g;
    
    // Añadir campos
    // (Lógica de transformación)
    
    fs.writeFileSync(`./src/services/khan/${archivo}`, contenido);
});

console.log('✅ Licencias etiquetadas');
```

#### **TAREA 2: Etiquetar Criterios LOMLOE**

**Opción A (IDEAL):** Base de datos relacional

```sql
CREATE TABLE criterios_lomloe (...);
CREATE TABLE ejercicios (...);
```

**Opción B (MÁS RÁPIDO):** Etiquetado en JSON

```javascript
{
    id: "mat_4p_q001",
    pregunta: "¿Cuánto es 3 + 5?",
    
    // AÑADIR:
    criterio_lomloe: "MAT_PRI4_C1.1",
    saberes_basicos: ["Operaciones básicas"],
    competencias_clave: ["STEM", "CD"],
    nivel_bloom: "APLICAR"
}
```

**Recomendación:** Opción B para BETA, migrar a Opción A en v2.0

### **Criterios de Éxito FASE 1**

```
✅ 100% ejercicios con licencia tag
✅ 100% ejercicios con criterio LOMLOE
✅ Sistema genera fichas correctamente
✅ Feedback EP/EC/ETF funciona
✅ 50+ usuarios beta activos
✅ Feedback positivo (>70% satisfacción)
✅ 0 violaciones de copyright detectadas
```

### **Modelo de Negocio BETA**

- **Precio:** Gratis
- **Usuarios objetivo:** 100-200 beta testers
- **Objetivo:** Feedback y validación
- **Duración:** 2 meses

---

## 🥈 FASE 2: v2.0 PREMIUM BÁSICO

### **Periodo:** Marzo - Mayo 2026 (3 meses)

### **Objetivo Principal**

**Monetizar el diagnóstico avanzado** introduciendo el primer pago y alertas de tendencia.

### **Funcionalidades NUEVAS**

```
✅ HEURÍSTICAS MEJORADAS (+15% precisión):
├─ calcularSimilitud()
├─ mismoTipoDato()
└─ detectarPatronError() mejorado

✅ PERSONALIZACIÓN V/A/K:
├─ ESTILOS_APRENDIZAJE
├─ seleccionarRecurso()
└─ Feedback personalizado

✅ ANÁLISIS HISTÓRICO:
├─ Dashboard de tendencias
├─ Detección patrones recurrentes
├─ Alertas EC crítica
└─ Predicciones simples

✅ CAPTURA DE TIEMPOS:
├─ gestor-tiempos-service.js
├─ Integración InteractiveWorksheet
└─ Almacenamiento en BD

❌ TODAVÍA NO:
├─ Detección NEE
└─ Consentimiento GDPR UI
```

### **Tareas Críticas PENDIENTES**

| # | Tarea | Dependencia | Estado | Prioridad |
|---|-------|-------------|--------|-----------|
| **3** | **Integrar captura de tiempos** | BETA OK | ⚠️ Pendiente | 🔴 ALTA |
| **4** | Migrar LOMLOE a BD (opcional) | BETA OK | ⚠️ Opcional | 🟡 Media |
| **5** | Desplegar en producción | #3 | ⚠️ Pendiente | 🔴 ALTA |
| **6** | Implementar pasarela de pago | #5 | ⚠️ Pendiente | 🔴 ALTA |

### **Implementación Detallada**

#### **TAREA 3: Integrar Captura de Tiempos**

**Archivo a modificar:** `src/components/InteractiveWorksheet.jsx`

**Cambios necesarios:**

```jsx
// 1. Importar hook
import { useGestorTiempos } from '../services/gestor-tiempos-service';

// 2. Usar en componente
const tiempos = useGestorTiempos();

// 3. Iniciar al montar pregunta
useEffect(() => {
    tiempos.iniciar(preguntaId);
}, [preguntaActual]);

// 4. Finalizar al enviar
const handleSubmit = () => {
    const datos = tiempos.finalizar(preguntaId);
    // Guardar datos.tiempoActivo en BD
};
```

**Actualizar BD:**

```sql
ALTER TABLE evaluaciones_historicas
ADD COLUMN tiempo_total_segundos INTEGER,
ADD COLUMN tiempo_promedio_por_pregunta DECIMAL;
```

#### **TAREA 6: Pasarela de Pago**

**Opciones:**

1. **Stripe** (Recomendado)
   - Fácil integración
   - Soporte suscripciones
   - Cumplimiento PCI

2. **PayPal**
   - Mayor reconocimiento
   - Menos confiado por empresas

**Implementación Stripe:**

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

```jsx
// components/Checkout.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

const Checkout = () => {
    // Lógica de pago
};
```

### **Criterios de Éxito FASE 2**

```
✅ Tiempos capturados correctamente
✅ Heurísticas mejoradas activas (+15% precisión)
✅ Personalización V/A/K funcional
✅ Dashboard histórico operativo
✅ Pasarela de pago implementada
✅ 500+ usuarios suscritos
✅ Tasa de conversión >5%
✅ NPS >40
```

### **Modelo de Negocio v2.0**

- **Precio:** €9.99/mes o €99/año
- **Incluye:**
  - Todo de BETA
  - Heurísticas mejoradas
  - Personalización V/A/K
  - Análisis histórico
  - Fichas ilimitadas
- **Objetivo:** 500 suscriptores en 3 meses
- **Ingresos proyectados:** €5,000/mes

---

## 🥉 FASE 3: v3.0 ENTERPRISE (NEE)

### **Periodo:** Junio - Agosto 2026 (3 meses)

### **Objetivo Principal**

**Liderazgo de mercado** activando el máximo valor y seguridad empresarial.

### **Funcionalidades NUEVAS**

```
✅ DETECCIÓN NEE COMPLETA:
├─ generarAlertasNEE()
├─ Detección AACC
├─ Detección TDAH
├─ Detección Dislexia
└─ Informes para padres

✅ CONSENTIMIENTO GDPR:
├─ ConsentimientoNEE.jsx
├─ Activación/Revocación
└─ UI de permisos

✅ ARQUITECTURA SEGURIDAD:
├─ RLS 100% activo
├─ Auditoría de accesos
├─ Roles y permisos
└─ Encriptación datos sensibles

✅ DASHBOARD PADRES:
├─ Vista alertas NEE
├─ Gestión consentimiento
├─ Seguimiento evolución
└─ Exportación informes
```

### **Tareas Críticas PENDIENTES**

| # | Tarea | Dependencia | Estado | Prioridad |
|---|-------|-------------|--------|-----------|
| **7** | **Activar RLS en Supabase** | v2.0 OK | ⚠️ Pendiente | 🔴 CRÍTICA |
| **8** | Integrar ConsentimientoNEE.jsx | #7 | ✅ Código OK | 🔴 ALTA |
| **9** | Dashboard Padres completo | #7, #8 | ⚠️ Pendiente | 🔴 ALTA |
| **10** | Testing NEE con datos reales | #7, #8, #9 | ⚠️ Pendiente | 🟡 Media |
| **11** | Auditoría legal GDPR | #7-#10 | ⚠️ Pendiente | 🔴 CRÍTICA |

### **Implementación Detallada**

#### **TAREA 7: Activar RLS en Supabase**

**Pasos:**

1. **Ejecutar esquema SQL completo**

```bash
# En Supabase SQL Editor
# Copiar y ejecutar: database/ESQUEMA_COMPLETO_BD.sql
```

2. **Verificar RLS activo**

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Resultado esperado:
-- alertas_nee           | true
-- perfiles_estudiantes  | true
-- relacion_tutor        | true
-- evaluaciones_historicas | true
```

3. **Verificar políticas**

```sql
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Debe mostrar mínimo 5 políticas
```

4. **Testing de permisos**

```javascript
// Test 1: Estudiante NO ve alertas
const { data } = await supabase
    .from('alertas_nee')
    .select('*');
// Esperado: [] (vacío)

// Test 2: Tutor SIN permiso NO ve alertas
const { data } = await supabase
    .from('alertas_nee')
    .select('*')
    .eq('estudiante_id', 'xxx');
// Esperado: [] (vacío)

// Test 3: Tutor CON permiso SÍ ve alertas
// (Después de activar permiso_alertas_nee = true)
const { data } = await supabase
    .from('alertas_nee')
    .select('*')
    .eq('estudiante_id', 'xxx');
// Esperado: [{alerta}] (con datos)
```

#### **TAREA 9: Dashboard Padres**

**Componente nuevo:** `src/components/DashboardPadres.jsx`

```jsx
const DashboardPadres = () => {
    const [consentimiento, setConsentimiento] = useState(false);
    const [alertas, setAlertas] = useState([]);

    return (
        <div>
            <h1>Panel de Control - Padre/Tutor</h1>

            {/* Sección 1: Consentimiento */}
            <section>
                <ConsentimientoNEE 
                    tutorId={user.id}
                    estudianteId={estudiante.id}
                    onConsentimientoChange={setConsentimiento}
                />
            </section>

            {/* Sección 2: Alertas (solo si consentimiento) */}
            {consentimiento && (
                <section>
                    <h2>📊 Análisis de Patrones Educativos</h2>
                    <AlertasNEEView alertas={alertas} />
                </section>
            )}

            {/* Sección 3: Rendimiento general */}
            <section>
                <h2>📈 Rendimiento Académico</h2>
                <DashboardAnalisis />
            </section>
        </div>
    );
};
```

#### **TAREA 11: Auditoría Legal GDPR**

**Checklist de cumplimiento:**

```
□ Política de Privacidad actualizada
□ Términos de Servicio actualizados
□ Cookie consent implementado
□ DPO (Data Protection Officer) designado
□ Registro de actividades de tratamiento
□ Análisis de impacto (DPIA) para NEE
□ Procedimiento de brechas de seguridad
□ Procedimiento de solicitud de derechos
□ Contratos con procesadores (Supabase)
□ Training de equipo en GDPR
```

**Recomendación:** Contratar asesor legal especializado en GDPR antes del lanzamiento v3.0

### **Criterios de Éxito FASE 3**

```
✅ RLS activo y verificado 100%
✅ Consentimiento GDPR funcional
✅ Detección NEE operativa
✅ Dashboard Padres completo
✅ Auditoría legal aprobada
✅ 1,000+ usuarios premium
✅ 50+ usuarios enterprise
✅ NPS >50
✅ 0 incidencias de seguridad
✅ 0 quejas GDPR
```

### **Modelo de Negocio v3.0**

- **Precio:** €29.99/mes o €299/año
- **Incluye:**
  - Todo de v2.0
  - Detección NEE completa
  - Informes para padres
  - Dashboard avanzado
  - Soporte prioritario
  - Cumplimiento GDPR total
- **Objetivo:** 1,000 premium + 50 enterprise
- **Ingresos proyectados:** €30,000/mes

---

## 💰 MODELO DE NEGOCIO COMPLETO

### **Estructura de Precios**

| Plan | Precio/Mes | Precio/Año | Funcionalidades | Público Objetivo |
|------|------------|------------|-----------------|------------------|
| **BETA** | Gratis | Gratis | Core pedagógico | Beta testers |
| **Premium** | €9.99 | €99 | + Heurísticas + V/A/K | Familias conscientes |
| **Enterprise** | €29.99 | €299 | + NEE + GDPR | Familias premium / Colegios |

### **Proyección de Ingresos (12 meses)**

```
Mes 1-2 (BETA):        €0/mes      (100 usuarios gratis)
Mes 3-5 (v2.0):        €5,000/mes  (500 x €9.99)
Mes 6-12 (v3.0):       €30,000/mes (950 x €9.99 + 50 x €29.99)

TOTAL AÑO 1:           €200,000
```

### **Costos Estimados**

```
Infraestructura (Supabase):  €500/mes
Pasarela pago (Stripe):      2.9% + €0.25/transacción
Asesoría legal GDPR:         €3,000 (una vez)
Marketing:                   €2,000/mes
Desarrollador part-time:     €2,000/mes

TOTAL COSTOS/MES:            ~€5,000
```

### **Punto de Equilibrio**

```
500 usuarios @ €9.99 = €5,000/mes
BREAK-EVEN: Mes 3 (lanzamiento v2.0)
```

---

## 📅 ROADMAP VISUAL

```
2026
│
├─ ENE ────────────────────────────┐
│                                   │ FASE 1: BETA GRATUITA
├─ FEB ────────────────────────────┤ • Etiquetar licencias
│                                   │ • Etiquetar LOMLOE
│                                   │ • 100 beta testers
├─ MAR ────────────────────────────┘
│
├─ ABR ────────────────────────────┐
│                                   │ FASE 2: v2.0 PREMIUM
├─ MAY ────────────────────────────┤ • Captura tiempos
│                                   │ • Personalización V/A/K
│                                   │ • Pasarela pago
│                                   │ • 500 suscriptores
├─ JUN ────────────────────────────┘
│
├─ JUL ────────────────────────────┐
│                                   │ FASE 3: v3.0 ENTERPRISE
├─ AGO ────────────────────────────┤ • Detección NEE
│                                   │ • GDPR completo
│                                   │ • Dashboard Padres
│                                   │ • 1,000+ usuarios
├─ SEP ────────────────────────────┘
│
├─ OCT ─────────────────────────────  EXPANSIÓN
├─ NOV                                • Nuevas asignaturas
├─ DIC                                • Integración colegios
```

---

## ✅ PLAN DE ACCIÓN INMEDIATO

### **PRÓXIMOS 30 DÍAS (Preparar BETA)**

#### **Semana 1-2: Legalidad**

```
□ Día 1-3:   Script de etiquetado masivo de licencias
□ Día 4-7:   Etiquetar 100% ejercicios con licencias
□ Día 8-10:  Verificar NO hay contenido sin licencia
□ Día 11-14: Etiquetar criterios LOMLOE (Opción B: JSON)
```

#### **Semana 3: Testing**

```
□ Día 15-17: Testing generación de fichas
□ Día 18-19: Testing feedback EP/EC/ETF
□ Día 20-21: Corrección de bugs críticos
```

#### **Semana 4: Lanzamiento BETA**

```
□ Día 22-23: Desplegar a staging
□ Día 24-25: Testing final
□ Día 26-27: Lanzamiento BETA a 50 usuarios
□ Día 28-30: Recoger feedback inicial
```

### **DÍAS 31-90 (BETA en curso)**

```
□ Mes 2:  Iterar según feedback beta
□ Mes 3:  Preparar pasarela de pago (Stripe)
□ Mes 3:  Integrar captura de tiempos
□ Fin Mes 3: Lanzamiento v2.0
```

---

## 📊 RESUMEN EJECUTIVO

```
═══════════════════════════════════════════════════════════
              EDUANALYTICS - ESTRATEGIA DE LANZAMIENTO
═══════════════════════════════════════════════════════════

CÓDIGO ACTUAL:      100% Implementado (v3.3)
ESTADO:             Listo para despliegue escalonado

FASE 1 (BETA):      Gratis | 2 meses | Validación
FASE 2 (Premium):   €9.99  | 3 meses | Monetización
FASE 3 (Enterprise): €29.99 | 3 meses | Liderazgo

TAREAS CRÍTICAS PENDIENTES:
1. ⚠️ Etiquetar licencias (95% contenido)
2. ⚠️ Etiquetar criterios LOMLOE (100% contenido)
3. ⚠️ Integrar captura tiempos en UI
4. ⚠️ Activar RLS en Supabase
5. ⚠️ Auditoría legal GDPR

PROYECCIÓN AÑO 1:   €200,000 ingresos
BREAK-EVEN:         Mes 3

═══════════════════════════════════════════════════════════
PRÓXIMO PASO:       Etiquetar licencias (URGENTE)
OBJETIVO:           Lanzar BETA en 30 días
═══════════════════════════════════════════════════════════
```

---

**Fecha de creación:** 15 de diciembre de 2025  
**Versión:** 1.0  
**Estado:** Plan Estratégico Aprobado  
**Próxima revisión:** Tras lanzamiento BETA

---

*Documento final de la sesión de implementación v3.3*
