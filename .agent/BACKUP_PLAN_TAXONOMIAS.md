# 🛡️ BACKUP Y PLAN DE SEGURIDAD - TAXONOMÍAS PEDAGÓGICAS
**Fecha:** 02/02/2026 - 12:13h  
**Objetivo:** Reescribir mensajes técnicos → pedagógicos para niños de 10 años  
**Archivo afectado:** `english-error-taxonomy-4primaria.json`

---

## ✅ PASO 0: BACKUP COMPLETADO

### **Archivo de Backup Creado:**
```
📁 src/data/english-error-taxonomy-4primaria.BACKUP_2026-02-02.json
```

**Detalles:**
- ✅ Tamaño: 11,261 bytes
- ✅ Fecha: 02/02/2026
- ✅ Contenido: Copia exacta del original

**Cómo restaurar si algo falla:**
```powershell
Copy-Item "src\data\english-error-taxonomy-4primaria.BACKUP_2026-02-02.json" `
          -Destination "src\data\english-error-taxonomy-4primaria.json" `
          -Force
```

---

## 📋 PLAN COMPLETO (5 PASOS)

### **PASO 0: BACKUP** ✅ COMPLETADO
- [x] Copia de seguridad creada
- [x] Tamaño verificado (11,261 bytes)
- [x] Comando de rollback documentado

### **PASO 1: GUÍA DE ESTILO** ⏸️ PENDIENTE
- [ ] Definir tono y vocabulario
- [ ] Establecer estructura de mensajes
- [ ] Crear plantilla de ejemplo
- [ ] Validar con 1 mensaje de prueba

### **PASO 2: PILOTO (1 ERROR)** ⏸️ PENDIENTE
- [ ] Reescribir `COMPARATIVE_MORE_ER` completo
- [ ] Validar JSON (jsonlint.com)
- [ ] Testing: npm run dev
- [ ] Testing: Browser (escribir "more tall")

### **PASO 3: BATCH PROGRESIVO** ⏸️ PENDIENTE
- [ ] Batch 1: COMPARATIVE_MORE_ER + COMP_SPELLING_HAPPY_Y
- [ ] Batch 2: Añadir COMP_SPELLING_CVC + COMP_LONG_ADJ_ER
- [ ] Batch 3: Otros errores relacionados
- [ ] Testing después de cada batch

### **PASO 4: VALIDACIÓN FINAL** ⏸️ PENDIENTE
- [ ] JSON válido
- [ ] npm run dev sin warnings
- [ ] Testing manual de 3-5 errores
- [ ] Mensajes legibles en UI

### **PASO 5: DOCUMENTACIÓN** ⏸️ PENDIENTE
- [ ] Registrar cambios realizados
- [ ] Listar nuevos IDs de error añadidos
- [ ] Documentar guía de estilo para futuro

---

## 🎯 PRÓXIMO PASO: GUÍA DE ESTILO

**Objetivo:** Definir cómo escribir mensajes pedagógicos consistentes.

**Elementos a definir:**
1. **Tono:** Cercano, motivador, paciente
2. **Vocabulario:** Términos simples para 10 años
3. **Estructura:** 5 partes (empatía, explicación, regla, ejemplo, acción)
4. **Longitud:** 40-60 / 60-90 / 80-120 palabras por nivel
5. **Formato:** Uso de \n, emojis, negrita, comillas

---

## 📊 SEGURIDAD

**Nivel de Riesgo:** 🟢 BAJO

**Archivos afectados:** 1
- `english-error-taxonomy-4primaria.json` (11,261 bytes)

**Archivos de respaldo:** 1
- `english-error-taxonomy-4primaria.BACKUP_2026-02-02.json` ✅

**Código afectado:** NINGUNO
- Solo cambiamos CONTENIDO (strings), no LÓGICA

**Tiempo estimado:** 1h 45min
- Guía: 10min
- Piloto: 15min
- Batch 1-3: 60min
- Validación: 20min

---

## ⚠️ CHECKLIST DE SEGURIDAD

Antes de cada cambio:
- [ ] Guardar archivo actual
- [ ] Validar JSON después de edición
- [ ] Verificar npm run dev sin errores
- [ ] Testing manual de 1-2 casos

Si algo falla:
- [ ] Parar inmediatamente
- [ ] Restaurar desde backup
- [ ] Analizar qué salió mal
- [ ] Ajustar estrategia

---

**Estado actual:** ✅ **BACKUP SEGURO, LISTO PARA PASO 1**
