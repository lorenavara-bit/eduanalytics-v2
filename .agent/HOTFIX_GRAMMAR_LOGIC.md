# 🚑 HOTFIX: Lógica Gramatical Estabilizada
> Fecha: 2026-02-03
> Estado: APLICADO

Se han corregido 3 vulnerabilidades críticas en el motor de evaluación (`evaluacion-service.js`) que causaban feedback incorrecto o confuso.

## 1. corrección del "Bug Gooder 🎉" (Amnistía Visual)
**Problema:** El sistema marcaba como CORRECTAS respuestas erróneas (ej: "gooder", "biger") simplemente porque la explicación del error contenía un emoji de fiesta (🎉) usado para motivar.
**Solución:** Se ha endurecido la detección de éxito benigno. Ahora solo se considera éxito si el mensaje EMPIEZA explícitamente con `🎉` o `🌟`, y se bloquea si contiene frases como "la respuesta correcta es".

## 2. Corrección del "Fantasma del For" (Tiempos Verbales)
**Problema:** Frases con la palabra "formar" o instrucciones similares disparaban falsamente la detección del "Present Perfect" porque el sistema buscaba la partícula "for" dentro de otras palabras.
**Solución:** Se implementó una búsqueda estricta con **Límites de Palabra (Regex `\b`)** para las Time Signals. Ahora "formar" no activa "for".

## 3. Desbloqueo de Artículos Aislados (Safety Net)
**Problema:** En ejercicios de rellenar huecos donde la respuesta era solo "a" (ej: "She is __ vet"), el sistema bloqueaba la respuesta correcta por considerarla una "palabra trivial" (Stop Word), impidiendo la coincidencia parcial.
**Solución:** Se ha relajado la regla de palabras triviales. Ahora **se permiten coincidencias de palabras cortas** (como "a", "an", "the") si la respuesta correcta esperada es muy breve (<= 2 palabras).

---
**Archivos Afectados:**
- `src/services/evaluacion-service.js` (Líneas ~2780, ~3770, ~3800)
