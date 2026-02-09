-- Script para verificar qué tablas existen actualmente en Supabase
-- Ejecuta este script en el SQL Editor de Supabase

SELECT 
    table_name,
    table_type
FROM 
    information_schema.tables
WHERE 
    table_schema = 'public'
    AND table_type = 'BASE TABLE'
ORDER BY 
    table_name;
