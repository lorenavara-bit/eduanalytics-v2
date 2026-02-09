# 🎯 CONFIGURACIÓN: BETA vs. VERSIÓN DE PAGO

## 📋 ESTADO ACTUAL

**Actualmente en:** FASE BETA (Gratuita)  
**Filtrado de licencias:** ❌ DESACTIVADO (muestra todo el contenido)

---

## 🔄 FASES DEL PROYECTO

### **FASE 1: BETA (ACTUAL)** 🎓

**Objetivo:** Pruebas con usuarios, feedback, mejoras

**Configuración:**
```env
REACT_APP_COMMERCIAL=false
```

**Comportamiento:**
- ✅ TODO el contenido disponible
- ✅ Ejercicios con licencia NC (No Comercial) se muestran
- ✅ Ejercicios educativos se muestran
- ✅ Sin restricciones de licencia
- 🎓 Consola muestra: "Modo educativo: mostrando todo el contenido"

**Usuarios:** Profesores, padres, estudiantes beta testers

---

### **FASE 2: VERSIÓN DE PAGO (FUTURA)** 💰

**Objetivo:** Monetización, cumplimiento legal de licencias

**Configuración:**
```env
REACT_APP_COMMERCIAL=true
```

**Comportamiento:**
- ✅ Solo contenido con licencia comercial
- ❌ Ejercicios NC (No Comercial) se filtran automáticamente
- ❌ Ejercicios solo educativos se filtran
- 🔒 Consola muestra filtrado de ejercicios
- 📊 Menos ejercicios disponibles, pero legalmente seguros

**Usuarios:** Clientes de pago, instituciones, empresas

---

## ⚙️ CÓMO CONFIGURAR

### **Para BETA (Actual):**

1. **Copiar archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Verificar que `.env` contenga:**
   ```env
   REACT_APP_COMMERCIAL=false
   ```

3. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

4. **Verificar en consola del navegador:**
   ```
   🎓 Modo educativo: mostrando todo el contenido
   ```

---

### **Para VERSIÓN DE PAGO (Futuro):**

1. **Modificar `.env`:**
   ```env
   REACT_APP_COMMERCIAL=true
   ```

2. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

3. **Verificar en consola del navegador:**
   ```
   🔒 Filtradas X preguntas por restricciones de licencia
   ```

4. **ANTES de activar, asegúrate de:**
   - ✅ Revisar todas las licencias del contenido
   - ✅ Agregar campo `licencia` a todos los ejercicios
   - ✅ Hacer auditoría legal
   - ✅ Tener alternativas para contenido filtrado

---

## 📊 COMPARACIÓN

| Aspecto | BETA (Actual) | PAGO (Futuro) |
|---------|---------------|---------------|
| **Modo comercial** | ❌ Desactivado | ✅ Activado |
| **Ejercicios NC** | ✅ Se muestran | ❌ Se filtran |
| **Total ejercicios** | ~600 | ~450-500* |
| **Cumplimiento legal** | ⚠️ Beta/educativo | ✅ Comercial seguro |
| **Usuario target** | Testers gratuitos | Clientes de pago |
| **Configuración** | `COMMERCIAL=false` | `COMMERCIAL=true` |

*Estimación basada en cuánto contenido tenga licencia NC

---

## 🛠️ TAREAS ANTES DE LANZAR VERSIÓN DE PAGO

### **Checklist de Preparación:**

- [ ] **Auditar todo el contenido existente:**
  - [ ] Revisar fuentes de cada ejercicio
  - [ ] Agregar campo `licencia` a todos
  - [ ] Identificar ejercicios NC
  - [ ] Buscar alternativas para ejercicios NC populares

- [ ] **Preparar contenido propietario:**
  - [ ] Crear ejercicios originales para reemplazar NC
  - [ ] Licenciar contenido de terceros correctamente
  - [ ] Documentar todas las licencias

- [ ] **Revisar legal:**
  - [ ] Consultar con abogado de propiedad intelectual
  - [ ] Preparar términos de servicio
  - [ ] Crear página de atribuciones

- [ ] **Probar filtrado:**
  - [ ] Activar `COMMERCIAL=true` en desarrollo
  - [ ] Generar fichas de todos los temas
  - [ ] Verificar que haya suficiente contenido
  - [ ] Ajustar si algún tema queda sin ejercicios

- [ ] **Documentar para usuarios:**
  - [ ] Explicar qué contenido está disponible
  - [ ] Crear FAQ sobre licencias
  - [ ] Preparar comunicación de cambios

---

## 🚨 ADVERTENCIA IMPORTANTE

### **NO activar modo comercial hasta:**

1. ✅ Completar auditoría de licencias
2. ✅ Tener aprobación legal
3. ✅ Verificar que hay suficiente contenido después del filtrado
4. ✅ Preparar contenido alternativo para lo filtrado
5. ✅ Comunicar cambios a usuarios

### **Consecuencias de activar prematuramente:**

- ⚠️ Menos ejercicios disponibles sin preparación
- ⚠️ Temas pueden quedar sin contenido
- ⚠️ Usuarios pueden reportar "bugs" (en realidad es filtrado)
- ⚠️ Necesitas explicar por qué hay menos contenido

---

## 📝 NOTAS PARA EL EQUIPO

### **Contenido Actual:**

La mayoría del contenido Santillana está marcado como `PROPRIETARY` o sin licencia, lo que significa que:
- ✅ Es contenido propietario tuyo o licenciado correctamente
- ✅ Se mostrará en ambos modos (beta y pago)
- ✅ No hay problema de licencias

### **Contenido de Ejemplo:**

El archivo `EJEMPLO-EJERCICIOS-NC.js`:
- ⚠️ Es solo para demostración
- ⚠️ NO está integrado en la app real
- ⚠️ Solo muestra cómo marcar ejercicios NC

### **Próximos Pasos:**

1. **Continuar en modo BETA** (`COMMERCIAL=false`)
2. Agregar más contenido propietario
3. Cuando estés listo para monetizar:
   - Hacer auditoría completa
   - Consultar legal
   - Activar `COMMERCIAL=true`

---

## 🔍 VERIFICACIÓN RÁPIDA

### **¿Cómo saber en qué modo estoy?**

Abre la consola del navegador al generar una ficha:

**Modo BETA (actual):**
```
🎓 Modo educativo: mostrando todo el contenido
🎯 TOTAL combinado: 42 preguntas de todas las fuentes
```

**Modo PAGO (futuro):**
```
⚠️ Ejercicio filtrado por licencia CC-BY-NC: "..."
🔒 Filtradas 3 preguntas por restricciones de licencia
🎯 TOTAL combinado: 39 preguntas (después de filtrado)
```

---

## 📞 SOPORTE

Si necesitas ayuda para configurar el modo comercial en el futuro:

1. Revisa `SISTEMA_LICENCIAS.md` (documentación completa)
2. Verifica ejemplos en `EJEMPLO-EJERCICIOS-NC.js`
3. Consulta el servicio `licencias-service.js`

---

## ✅ RESUMEN EJECUTIVO

| Configuración Actual | Valor |
|---------------------|-------|
| **Modo** | BETA (Educativo) |
| **Variable de entorno** | `REACT_APP_COMMERCIAL=false` |
| **Filtrado de licencias** | ❌ Desactivado |
| **Contenido disponible** | TODO (~600 ejercicios) |
| **Apropiado para** | Pruebas, beta testers, desarrollo |
| **Cambiar a pago cuando** | Hayas completado auditoría legal |

---

*Última actualización: 2025-12-15*  
*Mantener en modo BETA hasta lanzamiento comercial* ⚠️
