-- ---------------------------------------------------------------
-- import_revision.sql
-- Importa revision_pendiente.csv a la tabla "ejercicios" de Supabase
-- ---------------------------------------------------------------

-- 1️⃣  Crear tabla staging (temporal) con la misma estructura que el CSV
CREATE TEMP TABLE staging_revision (
    id                TEXT PRIMARY KEY,
    pregunta          TEXT,
    asignatura        TEXT,
    curso             TEXT,
    tema              TEXT,
    foco_auto         TEXT,
    criterio_auto     TEXT,
    confianza         NUMERIC,
    foco_final        TEXT,
    criterio_final    TEXT,
    verificado        BOOLEAN,
    notas_revisor     TEXT
);

-- 2️⃣  Cargar el CSV desde el cliente psql (\copy lee el archivo local)
\copy staging_revision FROM 'revision_pendiente.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- 3️⃣  Normalizar los datos según lo que necesita la tabla "ejercicios"
--    - licencia_final = BETA_ONLY (cuando la licencia original era PROPRIETARY)
--    - criterio_final = COALESCE(criterio_final, criterio_auto)
--    - foco_final    = COALESCE(foco_final, foco_auto)
--    - notas         = COALESCE(notas_revisor, '')

INSERT INTO ejercicios (
    id,
    pregunta,
    asignatura,
    curso,
    tema,
    foco_pedagogico,
    criterio_lomloe_id,
    licencia,
    verificado,
    notas
)
SELECT
    s.id,
    s.pregunta,
    s.asignatura,
    s.curso,
    s.tema,
    COALESCE(s.foco_final, s.foco_auto)          AS foco_pedagogico,
    COALESCE(s.criterio_final, s.criterio_auto)  AS criterio_lomloe_id,
    CASE WHEN s.licencia_auto = 'PROPRIETARY' THEN 'BETA_ONLY' ELSE s.licencia_auto END AS licencia,
    s.verificado,
    COALESCE(s.notas_revisor, '')                AS notas
FROM staging_revision s
ON CONFLICT (id) DO UPDATE SET
    pregunta          = EXCLUDED.pregunta,
    asignatura        = EXCLUDED.asignatura,
    curso             = EXCLUDED.curso,
    tema              = EXCLUDED.tema,
    foco_pedagogico  = EXCLUDED.foco_pedagogico,
    criterio_lomloe_id = EXCLUDED.criterio_lomloe_id,
    licencia          = EXCLUDED.licencia,
    verificado        = EXCLUDED.verificado,
    notas             = EXCLUDED.notas;

-- 4️⃣  Limpiar la tabla temporal (opcional, se eliminará al cerrar la sesión)
DROP TABLE IF EXISTS staging_revision;

-- ---------------------------------------------------------------
-- FIN DEL SCRIPT
-- ---------------------------------------------------------------
