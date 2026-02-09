# 🚀 TESTING DEL TUTOR IA - INSTRUCCIONES RÁPIDAS

## ✅ PASO 1: Ejecutar Script de Datos de Prueba

1. **Abre Supabase** → Tu proyecto nuevo: https://baauzvcqlajsyqzhzlot.supabase.co
2. **Ve a SQL Editor**
3. **Copia y pega** el contenido de: `migration/02_datos_prueba_tutor.sql`
4. **Click en RUN** ▶️

Esto creará:
- Estudiante: **Alex Prueba** (4º Primaria, Andalucía)
- Perfil VARK: **Visual dominante**
- ID fijo: `11111111-1111-1111-1111-111111111111`

---

## ✅ PASO 2: Iniciar Servidor de Desarrollo

```bash
cd c:\AMISPROYECTOS\eduanalytics-app\eduanalytics-v2
npm run dev
```

---

## ✅ PASO 3: Acceder al Tutor IA

### **Opción A: Botón de Testing** ⭐ RECOMENDADO
1. Ve a: http://localhost:5173
2. Haz click en el botón amarillo: **🧪 TESTING: Probar Tutor IA**

### **Opción B: URL Directa**
Ve directamente a:
```
http://localhost:5173/tutor/11111111-1111-1111-1111-111111111111
```

---

## 🎮 CÓMO PROBAR LOS JUEGOS INTERACTIVOS

Una vez dentro del Tutor IA, prueba estos mensajes:

### **1. Mapa de España**
```
Ayúdame a estudiar las provincias de España
```

El tutor debería responder con algo como:
```
¡Claro Alex! Voy a mostrarte un mapa interactivo.
Haz click en la provincia de Sevilla.

[GAME:spain_provinces|mode:identify|target:Sevilla]
```

### **2. Mapa de Andalucía**
```  
Quiero practicar las provincias de Andalucía
```

### **3. Sistema Solar**
```
Enséñame el sistema solar
```

---

## 🐛 TROUBLESHOOTING

### **Error: "Student not found"**
→ Ejecuta el script `02_datos_prueba_tutor.sql` en Supabase

### **Error: "VITE_SAMBANOVA_API_KEY not configured"**
→ Verifica que `.env.local` existe y tiene tu API key

### **El mapa no se muestra**
→ Revisa la consola del navegador (F12) para ver errores

### **El tutor no responde**
→ Verifica que tu API key de SambaNova es correcta

---

## 📝 NOTAS IMPORTANTES

- **ID del estudiante de prueba:** `11111111-1111-1111-1111-111111111111`
- **Nombre:** Alex Prueba
- **Curso:** 4º Primaria
- **Perfil VARK:** Visual (le gustan mapas e imágenes)
- **Asignaturas configuradas:** Matemáticas, Conocimiento del Medio, Inglés

---

## 🎯 SIGUIENTE PASO

Una vez que funcione el testing, podemos:
1. Crear selector de estudiantes real
2. Implementar onboarding con Test VARK
3. Añadir más juegos interactivos
4. Mejorar el prompt del tutor

---

¡Listo para probar! 🚀
