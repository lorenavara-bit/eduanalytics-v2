# 🎯 DIAGRAMA SIMPLE - ¿DE DÓNDE VIENEN LOS EJERCICIOS?

## 📊 FLUJO VISUAL RÁPIDO

```
┌─────────────────────────────────────────────────────────┐
│         USUARIO GENERA FICHA/EXAMEN                     │
│    Selecciona: Asignatura, Nivel, Tema                 │
└───────────────────┬─────────────────────────────────────┘
                    │
     ┌──────────────┴──────────────┐
     │                             │
  ¿LENGUA?                    ¿MATES/CIENCIAS?
     │                             │
     ▼                             ▼
┌─────────────┐              ┌─────────────┐
│📚 PASO 0    │              │📖 PASO 1    │
│BIBLIOTECAS  │              │INTEF/CEDEC  │
│(Gutenberg + │              │(Ministerio) │
│ OpenLibrary)│              └──────┬──────┘
└──────┬──────┘                     │
       │                            │
    ¿Funcionó?                   ¿Funcionó?
       │                            │
    SÍ│  NO                      SÍ│  NO
       │  │                         │  │
       ✅ └──────┬──────────────────┘  │
                 ▼                     │
          ┌──────────────┐             │
          │📝 PASO 2     │             │
          │KHAN ACADEMY  │◄────────────┘
          │o BANCO CUSTOM│
          └──────┬───────┘
                 │
              ✅ FIN
```

---

## 🎯 RESUMEN DE 3 PASOS

### PASO 0: Bibliotecas Digitales 📚
**Solo para Lengua/Galego**

- Gutenberg (15 clásicos españoles)
- OpenLibrary (30M+ libros)
- **Genera**: Fragmento literario + 5 preguntas
- **Costo**: €0

### PASO 1: INTEF/CEDEC 📖
**Para todas las asignaturas**

- Procomún (74K recursos)
- CEDEC (proyectos didácticos)
- **Genera**: Unidades didácticas oficiales
- **Costo**: €0

### PASO 2: Banco de Preguntas 📝
**Fallback o complemento**

- Khan Academy (30+ ejercicios STEM)
- Banco Custom (100+ preguntas manuales)
- Default (10 genéricas)
- **Costo**: €0

---

## 📋 CHEAT SHEET: ¿QUÉ USA CADA ASIGNATURA?

| Asignatura | Fuente Principal | Ejemplo |
|------------|-----------------|---------|
| **Lengua** | 📚 Bibliotecas → 📖 INTEF → 📝 Custom | "Don Quijote" (Gutenberg) |
| **Galego** | 📚 Bibliotecas → 📖 INTEF → 📝 Custom | Clásicos gallegos |
| **Matemáticas** | 📖 INTEF → 🎓 Khan Academy | "Fracciones" (Khan) |
| **Ciencias** | 📖 INTEF → 🎓 Khan Academy | "Fotosíntesis" (Khan) |
| **Sociales** | 📖 INTEF → 📝 Custom → Default | CEDEC recursos |
| **Inglés** | 📖 INTEF → 📝 Custom | Banco manual |

---

## 💰 TODOS LOS EJERCICIOS CUESTAN: **€0.00**

```
┌────────────────────────────────────┐
│ 100% CONTENIDO GRATUITO            │
│ ================================   │
│ ✅ 0 APIs de pago                  │
│ ✅ 0 dependencias de IA costosa    │
│ ✅ ∞ escalabilidad sin costos      │
└────────────────────────────────────┘
```

---

## ⚠️ IMPORTANTE: ¿QUÉ HACE FALTA?

Para que **Bibliotecas** funcione:

```bash
✅ 1. Ejecutar en Supabase: setup_bibliotecas_cache.sql
✅ 2. Generar ficha de Lengua para probar
✅ 3. Verificar fragmento literario aparece
```

**Lo demás YA FUNCIONA**:
- ✅ Khan Academy (activo)
- ✅ INTEF/CEDEC (activo)
- ✅ Banco Custom (activo)

---

**¿Confundido?** Lee `SISTEMA_PRIORIDADES.md` para detalles técnicos completos.
