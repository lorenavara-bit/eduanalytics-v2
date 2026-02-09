-- =====================================================
-- CURRÍCULO COMPLETO 2º DE ESO
-- Real Decreto 217/2022 - Enseñanzas Mínimas ESO
-- =====================================================
-- Adaptado a estudiantes de 13-14 años
-- Segundo curso de Educación Secundaria Obligatoria
-- =====================================================

-- =====================================================
-- 1. MATEMÁTICAS - 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Matemáticas', '2º ESO', 'Sentido numérico', 'Potencias de exponente entero y raíces cuadradas. Notación científica.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido numérico', 'Números racionales e irracionales: representación y operaciones.', ARRAY['CMCT', 'CCL']),
('Matemáticas', '2º ESO', 'Sentido numérico', 'Proporcionalidad directa e inversa. Porcentajes y variaciones.', ARRAY['CMCT', 'CE']),
('Matemáticas', '2º ESO', 'Sentido algebraico', 'Ecuaciones de primer grado con una incógnita: resolución y aplicaciones.', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '2º ESO', 'Sentido algebraico', 'Sistemas de ecuaciones lineales: métodos de resolución (sustitución, igualación, reducción).', ARRAY['CMCT', 'CPSAA']),
('Matemáticas', '2º ESO', 'Sentido algebraico', 'Operaciones con polinomios: suma, resta, multiplicación.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido espacial', 'Teorema de Pitágoras: aplicaciones a problemas geométricos.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido espacial', 'Semejanza: figuras semejantes, teorema de Tales.', ARRAY['CMCT']),
('Matemáticas', '2º ESO', 'Sentido de la medida', 'Escalas y proporcionalidad: planos, mapas y maquetas.', ARRAY['CMCT', 'CE']),
('Matemáticas', '2º ESO', 'Sentido funcional', 'Funciones: concepto, dominio, recorrido, representación gráfica.', ARRAY['CMCT', 'CD']),
('Matemáticas', '2º ESO', 'Sentido funcional', 'Funciones lineales y afines: características y aplicaciones.', ARRAY['CMCT', 'CD']),
('Matemáticas', '2º ESO', 'Sentido estocástico', 'Estadística: parámetros de centralización y dispersión (media, mediana, moda, rango).', ARRAY['CMCT', 'CD'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.MAT.2E.1', 'Matemáticas', '2º ESO', 1, 'Operar con potencias y raíces aplicando la notación científica.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2E.2', 'Matemáticas', '2º ESO', 2, 'Resolver ecuaciones de primer grado y sistemas de ecuaciones.', ARRAY['CMCT', 'CPSAA'], 'Aplicar'),
('CE.MAT.2E.3', 'Matemáticas', '2º ESO', 3, 'Aplicar el teorema de Pitágoras y el de Tales a problemas geométricos.', ARRAY['CMCT'], 'Aplicar'),
('CE.MAT.2E.4', 'Matemáticas', '2º ESO', 4, 'Resolver problemas de proporcionalidad directa e inversa.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.2E.5', 'Matemáticas', '2º ESO', 5, 'Utilizar escalas y proporciones en contextos reales.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.MAT.2E.6', 'Matemáticas', '2º ESO', 6, 'Representar e interpretar funciones lineales y afines.', ARRAY['CMCT', 'CD'], 'Analizar'),
('CE.MAT.2E.7', 'Matemáticas', '2º ESO', 7, 'Calcular parámetros estadísticos e interpretar su significado.', ARRAY['CMCT', 'CD'], 'Aplicar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. LENGUA CASTELLANA Y LITERATURA - 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Lengua Castellana y Literatura', '2º ESO', 'Comunicación oral', 'Exposiciones orales formales: estructura, recursos y técnicas.', ARRAY['CCL', 'CD', 'CPSAA']),
('Lengua Castellana y Literatura', '2º ESO', 'Comunicación oral', 'Debate: argumentación y refutación.', ARRAY['CCL', 'CPSAA', 'CC']),
('Lengua Castellana y Literatura', '2º ESO', 'Comprensión lectora', 'Textos periodísticos: noticia, crónica, reportaje.', ARRAY['CCL', 'CD']),
('Lengua Castellana y Literatura', '2º ESO', 'Comprensión lectora', 'Análisis crítico de textos argumentativos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '2º ESO', 'Producción escrita', 'Redacción de textos expositivos y argumentativos.', ARRAY['CCL', 'CPSAA']),
('Lengua Castellana y Literatura', '2º ESO', 'Producción escrita', 'Coherencia, cohesión y adecuación textual.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º ESO', 'Reflexión sobre la lengua', 'Análisis sintáctico: oración simple completa (todos los complementos).', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º ESO', 'Reflexión sobre la lengua', 'Tipos de predicado: nominal y verbal.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º ESO', 'Reflexión sobre la lengua', 'Clases de oraciones según la naturaleza del predicado.', ARRAY['CCL']),
('Lengua Castellana y Literatura', '2º ESO', 'Educación literaria', 'Literatura del Renacimiento: características, Garcilaso de la Vega, Lazarillo de Tormes.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º ESO', 'Educación literaria', 'El teatro: elementos y estructura dramática.', ARRAY['CCL', 'CCEC']),
('Lengua Castellana y Literatura', '2º ESO', 'Educación literaria', 'La narración: estructura, personajes, narrador.', ARRAY['CCL', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.LCL.2E.1', 'Lengua Castellana y Literatura', '2º ESO', 1, 'Realizar exposiciones orales formales bien estructuradas.', ARRAY['CCL', 'CD'], 'Crear'),
('CE.LCL.2E.2', 'Lengua Castellana y Literatura', '2º ESO', 2, 'Participar en debates argumentando y refutando.', ARRAY['CCL', 'CPSAA', 'CC'], 'Evaluar'),
('CE.LCL.2E.3', 'Lengua Castellana y Literatura', '2º ESO', 3, 'Redactar textos expositivos y argumentativos coherentes.', ARRAY['CCL', 'CPSAA'], 'Crear'),
('CE.LCL.2E.4', 'Lengua Castellana y Literatura', '2º ESO', 4, 'Realizar análisis sintáctico completo de oraciones simples.', ARRAY['CCL'], 'Analizar'),
('CE.LCL.2E.5', 'Lengua Castellana y Literatura', '2º ESO', 5, 'Analizar textos periodísticos y argumentativos.', ARRAY['CCL', 'CD'], 'Analizar'),
('CE.LCL.2E.6', 'Lengua Castellana y Literatura', '2º ESO', 6, 'Conocer características del Renacimiento literario.', ARRAY['CCL', 'CCEC'], 'Comprender'),
('CE.LCL.2E.7', 'Lengua Castellana y Literatura', '2º ESO', 7, 'Identificar elementos de la narración y el teatro.', ARRAY['CCL', 'CCEC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. GEOGRAFÍA E HISTORIA - 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Geografía e Historia', '2º ESO', 'Geografía', 'La población mundial: distribución, crecimiento y movimientos migratorios.', ARRAY['CC', 'CMCT']),
('Geografía e Historia', '2º ESO', 'Geografía', 'Población de España: evolución y distribución.', ARRAY['CC', 'CMCT', 'CCL']),
('Geografía e Historia', '2º ESO', 'Geografía', 'El sector primario: agricultura, ganadería, pesca y minería.', ARRAY['CC', 'CE']),
('Geografía e Historia', '2º ESO', 'Geografía', 'El sector secundario: industria y energía.', ARRAY['CC', 'CE', 'CMCT']),
('Geografía e Historia', '2º ESO', 'Geografía', 'El sector terciario: comercio, transporte, turismo.', ARRAY['CC', 'CE']),
('Geografía e Historia', '2º ESO', 'Historia', 'Edad Media: el feudalismo y la sociedad estamental.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '2º ESO', 'Historia', 'Al-Ándalus: evolución política, economía y cultura.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '2º ESO', 'Historia', 'Los reinos cristianos medievales: formación y expansión.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '2º ESO', 'Historia', 'El arte medieval: románico y gótico.', ARRAY['CC', 'CCEC']),
('Geografía e Historia', '2º ESO', 'Historia', 'El fin de la Edad Media: crisis del siglo XIV.', ARRAY['CC', 'CCEC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.GH.2E.1', 'Geografía e Historia', '2º ESO', 1, 'Analizar la distribución de la población mundial.', ARRAY['CC', 'CMCT'], 'Analizar'),
('CE.GH.2E.2', 'Geografía e Historia', '2º ESO', 2, 'Describir las actividades de los tres sectores económicos.', ARRAY['CC', 'CE'], 'Comprender'),
('CE.GH.2E.3', 'Geografía e Historia', '2º ESO', 3, 'Explicar las características del feudalismo.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.2E.4', 'Geografía e Historia', '2º ESO', 4, 'Comparar Al-Ándalus y los reinos cristianos medievales.', ARRAY['CC', 'CCEC'], 'Analizar'),
('CE.GH.2E.5', 'Geografía e Historia', '2º ESO', 5, 'Identificar características del arte románico y gótico.', ARRAY['CC', 'CCEC'], 'Comprender'),
('CE.GH.2E.6', 'Geografía e Historia', '2º ESO', 6, 'Analizar los movimientos migratorios actuales.', ARRAY['CC', 'CMCT'], 'Analizar'),
('CE.GH.2E.7', 'Geografía e Historia', '2º ESO', 7, 'Valorar el legado cultural de la Edad Media.', ARRAY['CC', 'CCEC'], 'Evaluar')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. FÍSICA Y QUÍMICA - 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Física y Química', '2º ESO', 'La materia', 'Propiedades de la materia: masa, volumen, densidad.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'La materia', 'Estados de agregación y cambios de estado.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'La materia', 'Mezclas y sustancias puras. Métodos de separación.', ARRAY['CMCT', 'CE']),
('Física y Química', '2º ESO', 'La materia', 'Estructura atómica: modelo atómico básico, partículas subatómicas.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Química', 'La tabla periódica: organización de los elementos.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Química', 'Enlace químico: iónico y covalente.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Química', 'Reacciones químicas: reactivos y productos.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Física', 'El movimiento: trayectoria, velocidad y aceleración.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Física', 'Las fuerzas: efectos y tipos.', ARRAY['CMCT']),
('Física y Química', '2º ESO', 'Energía', 'Formas de energía y transformaciones energéticas.', ARRAY['CMCT', 'CE', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.FQ.2E.1', 'Física y Química', '2º ESO', 1, 'Calcular densidades y explicar cambios de estado.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.2E.2', 'Física y Química', '2º ESO', 2, 'Diferenciar mezclas y sustancias puras y separarlas.', ARRAY['CMCT', 'CE'], 'Aplicar'),
('CE.FQ.2E.3', 'Física y Química', '2º ESO', 3, 'Describir la estructura atómica básica.', ARRAY['CMCT'], 'Comprender'),
('CE.FQ.2E.4', 'Física y Química', '2º ESO', 4, 'Utilizar la tabla periódica para obtener información.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.2E.5', 'Física y Química', '2º ESO', 5, 'Explicar los tipos de enlace químico.', ARRAY['CMCT'], 'Comprender'),
('CE.FQ.2E.6', 'Física y Química', '2º ESO', 6, 'Describir el movimiento usando velocidad y aceleración.', ARRAY['CMCT'], 'Aplicar'),
('CE.FQ.2E.7', 'Física y Química', '2º ESO', 7, 'Identificar transformaciones energéticas.', ARRAY['CMCT', 'CE'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 5. INGLÉS (LENGUA EXTRANJERA) - 2º ESO
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
('Inglés', '2º ESO', 'Comprensión oral', 'Comprensión de discursos orales sobre temas variados y actuales.', ARRAY['CP', 'CCL']),
('Inglés', '2º ESO', 'Comprensión oral', 'Identificación de actitudes y opiniones en textos orales.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '2º ESO', 'Producción oral', 'Expresión de opiniones y argumentos en conversaciones.', ARRAY['CP', 'CPSAA', 'CC']),
('Inglés', '2º ESO', 'Producción oral', 'Presentaciones orales sobre temas de interés.', ARRAY['CP', 'CCL', 'CD']),
('Inglés', '2º ESO', 'Comprensión lectora', 'Lectura de textos literarios adaptados y auténticos.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '2º ESO', 'Comprensión lectora', 'Lectura de textos informativos y argumentativos.', ARRAY['CP', 'CCL']),
('Inglés', '2º ESO', 'Producción escrita', 'Redacción de textos argumentativos y de opinión.', ARRAY['CP', 'CCL', 'CPSAA']),
('Inglés', '2º ESO', 'Producción escrita', 'Escritura creativa: historias, diálogos.', ARRAY['CP', 'CCL', 'CCEC']),
('Inglés', '2º ESO', 'Gramática', 'Presente perfecto: uso y diferencias con pasado simple.', ARRAY['CP', 'CCL']),
('Inglés', '2º ESO', 'Gramática', 'Verbos modales: can, could, should, must.', ARRAY['CP', 'CCL']),
('Inglés', '2º ESO', 'Vocabulario', 'Vocabulario avanzado: medio ambiente, salud, tecnología, sociedad.', ARRAY['CP', 'CD', 'CC']),
('Inglés', '2º ESO', 'Cultura', 'Literatura anglófona: autores y obras representativas.', ARRAY['CP', 'CCEC', 'CC'])
ON CONFLICT DO NOTHING;

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
('CE.ING.2E.1', 'Inglés', '2º ESO', 1, 'Comprender información y opiniones en textos orales.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.2E.2', 'Inglés', '2º ESO', 2, 'Expresar opiniones y argumentos en conversaciones.', ARRAY['CP', 'CPSAA', 'CC'], 'Aplicar'),
('CE.ING.2E.3', 'Inglés', '2º ESO', 3, 'Leer y comprender textos literarios y argumentativos.', ARRAY['CP', 'CCL'], 'Comprender'),
('CE.ING.2E.4', 'Inglés', '2º ESO', 4, 'Escribir textos argumentativos y creativos.', ARRAY['CP', 'CCL', 'CPSAA'], 'Crear'),
('CE.ING.2E.5', 'Inglés', '2º ESO', 5, 'Usar correctamente el presente perfecto y verbos modales.', ARRAY['CP', 'CCL'], 'Aplicar'),
('CE.ING.2E.6', 'Inglés', '2º ESO', 6, 'Conocer autores y obras de la literatura anglófona.', ARRAY['CP', 'CCEC', 'CC'], 'Comprender')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESUMEN - 2º ESO
-- =====================================================

-- TOTAL: 56 saberes básicos + 34 criterios de evaluación
-- 5 asignaturas principales de 2º ESO
-- Nivel: 13-14 años
-- Base legal: Real Decreto 217/2022

SELECT 'Currículo completo de 2º ESO cargado correctamente - 5 asignaturas' AS status;
