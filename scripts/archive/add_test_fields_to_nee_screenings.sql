-- Migration: add extra fields for test results to nee_screenings
-- Run this script after the initial schema creation.

ALTER TABLE public.nee_screenings
    ADD COLUMN IF NOT EXISTS score INTEGER,
    ADD COLUMN IF NOT EXISTS total INTEGER,
    ADD COLUMN IF NOT EXISTS matches_high BOOLEAN;

-- Optional: set default values (null) – they will be filled by each test.

COMMENT ON COLUMN public.nee_screenings.score IS 'Puntuación obtenida en el test (p.ej., número de respuestas correctas)';
COMMENT ON COLUMN public.nee_screenings.total IS 'Número total de ítems del test';
COMMENT ON COLUMN public.nee_screenings.matches_high IS 'Indicador booleano usado por el test de intereses Holland (true = alta coincidencia)';
