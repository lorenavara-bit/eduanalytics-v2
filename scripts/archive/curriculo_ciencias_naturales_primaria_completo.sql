-- =====================================================
-- CURRÍCULO COMPLEMENTARIO - CIENCIAS NATURALES PRIMARIA
-- Contenido científico especializado complementario a Conocimiento del Medio
-- =====================================================
-- Saberes científicos profundizados (1º a 6º Primaria)
-- Total: 90+ saberes básicos especializados
-- =====================================================
-- NOTA: Este currículo complementa Conocimiento del Medio,
-- enfocándose en aspectos puramente científicos y experimentales
-- =====================================================

-- =====================================================
-- 1º-2º PRIMARIA - CIENCIAS NATURALES (Ciclo Inicial)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Seres vivos profundizado
('Ciencias Naturales', '1º-2º Primaria', 'Seres vivos', 'Observación detallada: partes de una planta (raíz, tallo, hojas, flor, fruto, semilla).', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Seres vivos', 'Germinación: experimento de plantar semillas y observar crecimiento.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '1º-2º Primaria', 'Seres vivos', 'Animales: clasificación por cubierta corporal (pelo, plumas, escamas).', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Seres vivos', 'Ciclo vital: nacimiento, crecimiento, reproducción, muerte.', ARRAY['STEM']),

-- Cuerpo humano
('Ciencias Naturales', '1º-2º Primaria', 'Cuerpo humano', 'Los cinco sentidos: vista, oído, olfato, gusto, tacto y sus órganos.', ARRAY['STEM', 'CPSAA ']),
('Ciencias Naturales', '1º-2º Primaria', 'Cuerpo humano', 'Higiene personal: lavado de manos, dientes, ducha.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '1º-2º Primaria', 'Cuerpo humano', 'Alimentación saludable: frutas, verduras, proteínas, lácteos.', ARRAY['STEM', 'CPSAA']),

-- Materia y energía
('Ciencias Naturales', '1º-2º Primaria', 'Materia y energía', 'Propiedades: duro/blando, áspero/suave, transparente/opaco.', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Materia y energía', 'Flotación: objetos que flotan vs. se hunden (experimento).', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Materia y energía', 'El agua: estados (líquido, sólido), importancia para la vida.', ARRAY['STEM', 'CC']),

-- Tierra y Universo
('Ciencias Naturales', '1º-2º Primaria', 'Tierra y Universo', 'El Sol como fuente de luz y calor.', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Tierra y Universo', 'Día y noche: rotación de la Tierra (concepto muy simple).', ARRAY['STEM']),
('Ciencias Naturales', '1º-2º Primaria', 'Tierra y Universo', 'Las estaciones del año: cambios en la naturaleza.', ARRAY['STEM', 'CCEC']);

-- =====================================================
-- 3º-4º PRIMARIA - CIENCIAS NATURALES (Ciclo Medio)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Seres vivos profundizado
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Fotosíntesis: proceso por el que las plantas producen alimento.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Respiración de plantas y animales: intercambio de gases.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Reproducción: sexual (semillas, huevos) y asexual (esquejes).', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Adaptaciones animales: camuflaje, hibernación, migración.', ARRAY['STEM', 'CCEC']),
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Ecosistemas: productores, consumidores, descomponedores.', ARRAY['STEM', 'CC']),
('Ciencias Naturales', '3º-4º Primaria', 'Seres vivos', 'Cadenas y redes alimentarias.', ARRAY['STEM']),

-- Cuerpo humano
('Ciencias Naturales', '3º-4º Primaria', 'Cuerpo humano', 'Aparato digestivo: órganos y función (boca, estómago, intestinos).', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '3º-4º Primaria', 'Cuerpo humano', 'Aparato respiratorio: pulmones, intercambio de O2 y CO2.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '3º-4º Primaria', 'Cuerpo humano', 'Aparato circulatorio: corazón, sangre, vasos sanguíneos.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '3º-4º Primaria', 'Cuerpo humano', 'Sistema locomotor: huesos, músculos, articulaciones.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '3º-4º Primaria', 'Cuerpo humano', 'Hábitos saludables: ejercicio, descanso, postura correcta.', ARRAY['STEM', 'CPSAA']),

-- Materia y energía
('Ciencias Naturales', '3º-4º Primaria', 'Materia y energía', 'Estados de la materia: sólido, líquido, gas y cambios de estado.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Materia y energía', 'El ciclo del agua: evaporación, condensación, precipitación, infiltración.', ARRAY['STEM', 'CC']),
('Ciencias Naturales', '3º-4º Primaria', 'Materia y energía', 'Mezclas: homogéneas y heterogéneas (agua con sal, agua con arena).', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Materia y energía', 'Energía: formas (lumínica, térmica, cinética) y transformaciones.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Materia y energía', 'Fuentes de energía renovables (solar, eólica) y no renovables (carbón, petróleo).', ARRAY['STEM', 'CC']),

-- Tierra y Universo
('Ciencias Naturales', '3º-4º Primaria', 'Tierra y Universo', 'Sistema Solar: Sol, planetas, satélites (Luna).', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Tierra y Universo', 'Movimientos de la Tierra: rotación (día/noche) y traslación (año).', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Tierra y Universo', 'Fases de la Luna: nueva, creciente, llena, menguante.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Tierra y Universo', 'Capas de la Tierra: corteza, manto, núcleo.', ARRAY['STEM']),
('Ciencias Naturales', '3º-4º Primaria', 'Tierra y Universo', 'Atmósfera: composición y función protectora.', ARRAY['STEM', 'CC']);

-- =====================================================
-- 5º-6º PRIMARIA - CIENCIAS NATURALES (Ciclo Superior)
-- =====================================================

INSERT INTO saberes_basicos (asignatura, curso, bloque, saber, competencias_relacionadas) VALUES
-- Seres vivos profundizado
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Célula: estructura básica (núcleo, membrana, citoplasma).', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Células procariotas y eucariotas, vegetales y animales.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Clasificación de seres vivos: cinco reinos (Monera, Protoctista, Fungi, Plantae, Animalia).', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Microorganismos: bacterias, virus, hongos - beneficiosos y perjudiciales.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Biodiversidad: importancia y amenazas (extinción, pérdida de hábitat).', ARRAY['STEM', 'CC']),
('Ciencias Naturales', '5º-6º Primaria', 'Seres vivos', 'Relaciones entre seres vivos: mutualismo, parasitismo, competencia.', ARRAY['STEM']),

-- Cuerpo humano
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Sistema nervioso: cerebro, médula espinal, nervios - control del cuerpo.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Sistema endocrino: hormonas y glándulas (introducción).', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Aparato excretor: riñones, eliminación de desechos.', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Aparato reproductor: diferencias entre masculino y femenino (nivel básico).', ARRAY['STEM', 'CPSAA']),
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Pubertad y cambios físicos (educación afectivo-sexual básica).', ARRAY['STEM', 'CPSAA', 'CC']),
('Ciencias Naturales', '5º-6º Primaria', 'Cuerpo humano', 'Prevención de enfermedades: vacunas, higiene, alimentación.', ARRAY['STEM', 'CPSAA']),

-- Materia y energía
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Propiedades de la materia: masa, volumen, densidad.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Cambios químicos vs. físicos: combustión, oxidación, disolución.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Reacciones químicas cotidianas: fermentación, fotosíntesis.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'La luz: propagación, reflexión, refracción.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'El sonido: ondas, propagación, eco.', ARRAY['STEM', 'CCEC']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Electricidad: circuitos simples, conductores y aislantes.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Magnetismo: polos magnéticos, brújula, electroimanes.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Fuerzas: gravedad, rozamiento, fuerza magnética.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Materia y energía', 'Máquinas simples: palanca, polea, plano inclinado - ventaja mecánica.', ARRAY['STEM']),

-- Tierra y Universo
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Universo: galaxias, estrellas, planetas, cometas.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Exploración espacial: telescopios, sondas, astronautas.', ARRAY['STEM', 'CD']),
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Rocas y minerales: clasificación, propiedades.', ARRAY['STEM']),
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Erosión, sedimentación y formación del suelo.', ARRAY['STEM', 'CC']),
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Cambio climático: causas y consecuencias.', ARRAY['STEM', 'CC']),
('Ciencias Naturales', '5º-6º Primaria', 'Tierra y Universo', 'Energías limpias y sostenibilidad ambiental.', ARRAY['STEM', 'CC', 'CE']);

INSERT INTO criterios_evaluacion (id, asignatura, curso, numero, descripcion, competencias, nivel_cognitivo) VALUES
-- Criterios generales ciclo inicial
('CE.CN.1-2P.1', 'Ciencias Naturales', '1º-2º Primaria', 1, 'Identificar las partes de una planta y explicar sus funciones básicas.', ARRAY['STEM'], 'Comprender'),
('CE.CN.1-2P.2', 'Ciencias Naturales', '1º-2º Primaria', 2, 'Reconocer los cinco sentidos y asociar cada uno con su órgano correspondiente.', ARRAY['STEM', 'CPSAA'], 'Recordar'),

-- Criterios ciclo medio
('CE.CN.3-4P.1', 'Ciencias Naturales', '3º-4º Primaria', 1, 'Explicar el proceso de fotosíntesis y su importancia para la vida.', ARRAY['STEM'], 'Comprender'),
('CE.CN.3-4P.2', 'Ciencias Naturales', '3º-4º Primaria', 2, 'Describir el funcionamiento básico de los principales aparatos del cuerpo humano.', ARRAY['STEM', 'CPSAA'], 'Comprender'),
('CE.CN.3-4P.3', 'Ciencias Naturales', '3º-4º Primaria', 3, 'Identificar los planetas del Sistema Solar y explicar los movimientos de la Tierra.', ARRAY['STEM'], 'Recordar'),

-- Criterios ciclo superior
('CE.CN.5-6P.1', 'Ciencias Naturales', '5º-6º Primaria', 1, 'Explicar la estructura y función básica de una célula.', ARRAY['STEM'], 'Comprender'),
('CE.CN.5-6P.2', 'Ciencias Naturales', '5º-6º Primaria', 2, 'Diferenciar cambios físicos y químicos de la materia con ejemplos.', ARRAY['STEM'], 'Analizar'),
('CE.CN.5-6P.3', 'Ciencias Naturales', '5º-6º Primaria', 3, 'Diseñar y construir un circuito eléctrico simple explicando su funcionamiento.', ARRAY['STEM'], 'Crear'),
('CE.CN.5-6P.4', 'Ciencias Naturales', '5º-6º Primaria', 4, 'Argumentar sobre la importancia de la biodiversidad y las energías renovables.', ARRAY['STEM', 'CC'], 'Evaluar');

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

SELECT 'Currículo de Ciencias Naturales Primaria cargado correctamente' AS status;
SELECT COUNT(*) AS total_saberes FROM saberes_basicos WHERE asignatura = 'Ciencias Naturales';
SELECT COUNT(*) AS total_criterios FROM criterios_evaluacion WHERE asignatura = 'Ciencias Naturales';
