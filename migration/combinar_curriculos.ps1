# Script PowerShell para Combinar Todos los Currículos
# Ejecutar en PowerShell: .\combinar_curriculos.ps1

Write-Host "🔄 Combinando archivos de currículo..." -ForegroundColor Cyan

# Crear archivo consolidado
$outputFile = "curriculo_consolidado_completo.sql"

# Limpiar archivo si existe
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Header
@"
-- ============================================================================
-- CURRÍCULO LOMLOE CONSOLIDADO - TODAS LAS ASIGNATURAS DISPONIBLES
-- ============================================================================
-- Generado automáticamente: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
-- ============================================================================
-- Incluye:
-- - Matemáticas (Primaria, ESO, Bachillerato)
-- - Lengua Castellana y Literatura (Primaria, ESO, Bachillerato)
-- - Geografía e Historia (ESO, Bachillerato)
-- - Lingua Galega e Literatura (Primaria, ESO, Bachillerato)
-- ============================================================================

-- Insertar Competencias Clave
INSERT INTO competencias_clave (id, nombre, descripcion) VALUES
('CCL', 'Competencia en comunicación lingüística', 'Habilidad para expresarse e interpretar pensamientos, sentimientos y hechos.'),
('CP', 'Competencia plurilingüe', 'Capacidad de utilizar distintas lenguas de forma apropiada.'),
('CMCT', 'Competencia matemática y en ciencia, tecnología e ingeniería', 'Comprensión del mundo utilizando métodos científicos.'),
('STEM', 'Competencia matemática y en ciencia, tecnología e ingeniería', 'Alias de CMCT.'),
('CD', 'Competencia digital', 'Uso seguro, crítico y responsable de las tecnologías digitales.'),
('CPSAA', 'Competencia personal, social y de aprender a aprender', 'Capacidad de reflexionar sobre uno mismo.'),
('CC', 'Competencia ciudadana', 'Participación activa y democrática en la vida social.'),
('CE', 'Competencia emprendedora', 'Desarrollo de ideas y oportunidades para crear valor.'),
('CCEC', 'Competencia en conciencia y expresión culturales', 'Comprensión y respeto de ideas expresadas de forma creativa.')
ON CONFLICT (id) DO NOTHING;

"@ | Out-File -FilePath $outputFile -Encoding UTF8

# Lista de archivos a combinar
$archivos = @(
    "curriculo_completo_lomloe.sql",
    "curriculo_gallego_1primaria.sql",
    "curriculo_gallego_2primaria.sql",
    "curriculo_gallego_3primaria.sql",
    "curriculo_gallego_4primaria.sql",
    "curriculo_gallego_5primaria.sql",
    "curriculo_gallego_6primaria.sql",
    "curriculo_gallego_1eso.sql",
    "curriculo_gallego_2eso.sql",
    "curriculo_gallego_3eso.sql",
    "curriculo_gallego_4eso.sql",
    "curriculo_gallego_1bachillerato.sql",
    "curriculo_gallego_2bachillerato.sql"
)

$contador = 0
foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        $contador++
        Write-Host "  [$contador/13] Añadiendo $archivo..." -ForegroundColor Yellow
        
        # Añadir separador
        "`n-- ============================================================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
        "-- ARCHIVO: $archivo" | Out-File -FilePath $outputFile -Append -Encoding UTF8
        "-- ============================================================================`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8
        
        # Añadir contenido del archivo (saltando comentarios iniciales repetitivos)
        Get-Content $archivo -Encoding UTF8 | 
            Where-Object { $_ -notmatch "^-- =====" } |
            Where-Object { $_ -notmatch "^-- Decreto" } |
            Where-Object { $_ -notmatch "^-- Real Decreto" } |
            Out-File -FilePath $outputFile -Append -Encoding UTF8
    } else {
        Write-Host "  ⚠️  No encontrado: $archivo" -ForegroundColor Red
    }
}

# Footer con verificación
@"

-- ============================================================================
-- VERIFICACIÓN POST-IMPORTACIÓN
-- ============================================================================

SELECT 'Total Saberes Básicos:' as concepto, COUNT(*)::text as cantidad FROM saberes_basicos;
SELECT 'Total Criterios Evaluación:' as concepto, COUNT(*)::text as cantidad FROM criterios_evaluacion;
SELECT 'Total Competencias:' as concepto, COUNT(*)::text as cantidad FROM competencias_clave;

-- Asignaturas disponibles por etapa
SELECT 
    asignatura,
    COUNT(DISTINCT curso) as cursos_disponibles,
    COUNT(*) as total_saberes
FROM saberes_basicos 
GROUP BY asignatura 
ORDER BY asignatura;

SELECT '✅ IMPORTACIÓN COMPLETADA' as estado;
"@ | Out-File -FilePath $outputFile -Append -Encoding UTF8

Write-Host "`n✅ Archivo consolidado creado: $outputFile" -ForegroundColor Green
Write-Host "📋 Total archivos combinados: $contador de 13" -ForegroundColor Cyan
Write-Host "`n▶️  Ahora copia TODO el contenido de '$outputFile' y ejecútalo en Supabase SQL Editor" -ForegroundColor White
