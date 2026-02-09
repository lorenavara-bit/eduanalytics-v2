-- ═══════════════════════════════════════════════════════════
-- EDUANALYTICS - ESTRUCTURA DE BASE DE DATOS COMPLETA
-- Sistema de Perfiles y Control de Acceso para Alertas NEE
-- ═══════════════════════════════════════════════════════════

-- IMPORTANTE: Este esquema cumple con GDPR/LOPD
-- Incluye Row Level Security (RLS) para protección de datos sensibles

-- ────────────────────────────────────────────────────────────
-- 1. TABLA USUARIOS (Identidad y Login)
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS usuarios (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ESTUDIANTE', 'PADRE_TUTOR', 'PROFESOR', 'ADMIN')),
    nombre_completo VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    activo BOOLEAN DEFAULT TRUE,
    
    -- Índices para optimización
    CONSTRAINT usuarios_email_idx UNIQUE (email)
);

-- Índices adicionales
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_activo ON usuarios(activo);

COMMENT ON TABLE usuarios IS 'Tabla principal de autenticación y roles de usuario';
COMMENT ON COLUMN usuarios.rol IS 'Define los permisos: ESTUDIANTE, PADRE_TUTOR, PROFESOR, ADMIN';

-- ────────────────────────────────────────────────────────────
-- 2. TABLA PERFILES_ESTUDIANTES (Datos Pedagógicos)
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS perfiles_estudiantes (
    estudiante_id UUID PRIMARY KEY REFERENCES usuarios(user_id) ON DELETE CASCADE,
    nivel_actual VARCHAR(50) NOT NULL, -- Ej: '4º Primaria', '1º ESO'
    curso_academico VARCHAR(20), -- Ej: '2024-2025'
    
    -- Personalización de aprendizaje
    estilo_aprendizaje VARCHAR(20) CHECK (estilo_aprendizaje IN ('VISUAL', 'AUDITIVO', 'KINESTESICO')),
    
    -- Perfil de competencias (JSON)
    perfil_competencia JSONB DEFAULT '{}',
    -- Ejemplo: {"EC": 0.2, "EP": 0.5, "EAC": 0.2, "ETF": 0.1}
    
    -- Alertas NEE (CRÍTICO - Datos sensibles)
    alerta_activa_nee BOOLEAN DEFAULT FALSE,
    tipo_alerta_nee VARCHAR(50), -- 'AACC', 'TDAH', 'DISLEXIA'
    fecha_ultima_alerta TIMESTAMP WITH TIME ZONE,
    alerta_revisada BOOLEAN DEFAULT FALSE,
    fecha_revision_alerta TIMESTAMP WITH TIME ZONE,
    
    -- Metadatos
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT perfil_estudiante_nivel CHECK (nivel_actual IS NOT NULL)
    );

-- Índices
CREATE INDEX idx_perfiles_nivel ON perfiles_estudiantes(nivel_actual);
CREATE INDEX idx_perfiles_estilo ON perfiles_estudiantes(estilo_aprendizaje);
CREATE INDEX idx_perfiles_alerta_activa ON perfiles_estudiantes(alerta_activa_nee);

COMMENT ON TABLE perfiles_estudiantes IS 'Datos pedagógicos y perfil de aprendizaje del estudiante';
COMMENT ON COLUMN perfiles_estudiantes.perfil_competencia IS 'Vector de rendimiento por patrón de error (JSON)';
COMMENT ON COLUMN perfiles_estudiantes.alerta_activa_nee IS 'TRUE si hay alerta NEE pendiente de revisión por tutor';

-- ────────────────────────────────────────────────────────────
-- 3. TABLA RELACION_TUTOR (Vínculo Seguro Tutor-Estudiante)
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS relacion_tutor (
    relacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tutor_id UUID NOT NULL REFERENCES usuarios(user_id) ON DELETE CASCADE,
    estudiante_id UUID NOT NULL REFERENCES perfiles_estudiantes(estudiante_id) ON DELETE CASCADE,
    
    -- Control de acceso a información sensible (GDPR/LOPD)
    permiso_alertas_nee BOOLEAN DEFAULT FALSE, -- Debe aceptar explícitamente
    fecha_consentimiento_nee TIMESTAMP WITH TIME ZONE,
    
    -- Tipo de relación (para futura expansión)
    tipo_relacion VARCHAR(50) DEFAULT 'PADRE_MADRE', 
    -- Valores: 'PADRE_MADRE', 'TUTOR_LEGAL', 'FAMILIAR_AUTORIZADO'
    
    -- Estado de la relación
    activo BOOLEAN DEFAULT TRUE,
    fecha_vinculacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_desvinculacion TIMESTAMP WITH TIME ZONE,
    
    -- Restricción: un tutor no puede vincularse consigo mismo
    CONSTRAINT tutor_no_estudiante CHECK (tutor_id != estudiante_id),
    
    -- Restricción: combinación única tutor-estudiante
    CONSTRAINT tutor_estudiante_unico UNIQUE (tutor_id, estudiante_id)
);

-- Índices para optimización de consultas
CREATE INDEX idx_relacion_tutor ON relacion_tutor(tutor_id);
CREATE INDEX idx_relacion_estudiante ON relacion_tutor(estudiante_id);
CREATE INDEX idx_relacion_activo ON relacion_tutor(activo);
CREATE INDEX idx_relacion_permiso_nee ON relacion_tutor(permiso_alertas_nee);

COMMENT ON TABLE relacion_tutor IS 'Vínculo seguro entre tutores y estudiantes con control de permisos';
COMMENT ON COLUMN relacion_tutor.permiso_alertas_nee IS 'CRÍTICO: TRUE solo si el tutor acepta expresamente ver alertas NEE (GDPR)';

-- ────────────────────────────────────────────────────────────
-- 4. TABLA EVALUACIONES_HISTORICAS (Historial de Evaluaciones)
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS evaluaciones_historicas (
    evaluacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES perfiles_estudiantes(estudiante_id) ON DELETE CASCADE,
    
    -- Datos de la evaluación
    asignatura VARCHAR(100) NOT NULL,
    tema VARCHAR(255),
    fecha_evaluacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Resultados
    total_preguntas INTEGER NOT NULL,
    correctas INTEGER NOT NULL,
    incorrectas INTEGER NOT NULL,
    porcentaje DECIMAL(5,2) NOT NULL,
    
    -- Tiempos (CRÍTICO para detección NEE)
    tiempo_total_segundos INTEGER, -- Tiempo total de la evaluación
    tiempo_promedio_por_pregunta DECIMAL(10,2), -- Promedio en segundos
    
    -- Patrones de error (JSON)
    errores_por_patron JSONB DEFAULT '{}',
    -- Ejemplo: {"EC": 2, "EP": 3, "EAC": 1, "ETF": 0}
    
    -- Criterios LOMLOE afectados (array)
    criterios_afectados TEXT[],
    
    -- Nivel Bloom dominante
    nivel_bloom_dominante VARCHAR(20),
    
    -- Detalle completo (JSON) - para análisis profundo
    detalle_respuestas JSONB,
    
    -- Metadatos
    dispositivo VARCHAR(50), -- 'web', 'mobile', 'tablet'
    ip_address INET
);

-- Índices
CREATE INDEX idx_eval_estudiante ON evaluaciones_historicas(estudiante_id);
CREATE INDEX idx_eval_fecha ON evaluaciones_historicas(fecha_evaluacion DESC);
CREATE INDEX idx_eval_asignatura ON evaluaciones_historicas(asignatura);
CREATE INDEX idx_eval_porcentaje ON evaluaciones_historicas(porcentaje);

COMMENT ON TABLE evaluaciones_historicas IS 'Registro completo de todas las evaluaciones para análisis histórico y detección NEE';
COMMENT ON COLUMN evaluaciones_historicas.tiempo_total_segundos IS 'Usado para detectar variabilidad temporal (TDAH)';

-- ────────────────────────────────────────────────────────────
-- 5. TABLA ALERTAS_NEE (Registro de Alertas Generadas)
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS alertas_nee (
    alerta_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES perfiles_estudiantes(estudiante_id) ON DELETE CASCADE,
    
    -- Tipo de alerta
    tipo_nee VARCHAR(50) NOT NULL CHECK (tipo_nee IN ('AACC', 'TDAH', 'DISLEXIA')),
    
    -- Datos de la alerta
    confianza DECIMAL(3,2) NOT NULL, -- 0.00 a 1.00
    gravedad VARCHAR(20) NOT NULL CHECK (gravedad IN ('BAJA', 'MEDIA', 'ALTA', 'INFORMATIVA')),
    
    -- Criterios cumplidos (JSON)
    criterios_cumplidos JSONB NOT NULL,
    -- Ejemplo: [{"id": "velocidad_alta", "evidencia": "..."}]
    
    -- Mensaje y recomendación
    mensaje TEXT NOT NULL,
    recomendacion TEXT NOT NULL,
    
    -- Estado de la alerta
    estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'VISTA', 'EN_PROCESO', 'RESUELTA', 'DESCARTADA')),
    fecha_generacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_vista TIMESTAMP WITH TIME ZONE,
    fecha_resolucion TIMESTAMP WITH TIME ZONE,
    
    -- Notas del tutor/profesional
    notas_tutor TEXT,
    accion_tomada TEXT,
    
    -- Evaluación profesional externa (si se realizó)
    evaluacion_externa BOOLEAN DEFAULT FALSE,
    fecha_evaluacion_externa TIMESTAMP WITH TIME ZONE,
    resultado_evaluacion_externa TEXT
);

-- Índices
CREATE INDEX idx_alertas_estudiante ON alertas_nee(estudiante_id);
CREATE INDEX idx_alertas_tipo ON alertas_nee(tipo_nee);
CREATE INDEX idx_alertas_estado ON alertas_nee(estado);
CREATE INDEX idx_alertas_fecha ON alertas_nee(fecha_generacion DESC);

COMMENT ON TABLE alertas_nee IS 'Registro completo de alertas NEE generadas con seguimiento de estado';
COMMENT ON COLUMN alertas_nee.confianza IS 'Nivel de confianza del patrón detectado (0.00-1.00)';

-- ────────────────────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY (RLS) - SEGURIDAD CRÍTICA
-- ────────────────────────────────────────────────────────────

-- Activar RLS en todas las tablas sensibles
ALTER TABLE perfiles_estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE relacion_tutor ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones_historicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas_nee ENABLE ROW LEVEL SECURITY;

-- POLÍTICA 1: Estudiantes pueden ver solo su propio perfil (SIN alertas NEE)
CREATE POLICY "estudiantes_ver_propio_perfil" ON perfiles_estudiantes
    FOR SELECT
    USING (
        estudiante_id = auth.uid() AND
        (SELECT rol FROM usuarios WHERE user_id = auth.uid()) = 'ESTUDIANTE'
    );

-- POLÍTICA 2: Estudiantes NO pueden ver sus alertas NEE
CREATE POLICY "estudiantes_no_ver_alertas_nee" ON alertas_nee
    FOR SELECT
    USING (FALSE); -- Explícitamente FALSE para estudiantes

-- POLÍTICA 3: Tutores pueden ver alertas SOLO si tienen permiso explícito
CREATE POLICY "tutores_ver_alertas_con_permiso" ON alertas_nee
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM relacion_tutor rt
            WHERE rt.estudiante_id = alertas_nee.estudiante_id
            AND rt.tutor_id = auth.uid()
            AND rt.permiso_alertas_nee = TRUE
            AND rt.activo = TRUE
        )
        AND (SELECT rol FROM usuarios WHERE user_id = auth.uid()) = 'PADRE_TUTOR'
    );

-- POLÍTICA 4: Tutores pueden ver evaluaciones de sus estudiantes vinculados
CREATE POLICY "tutores_ver_evaluaciones_vinculadas" ON evaluaciones_historicas
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM relacion_tutor rt
            WHERE rt.estudiante_id = evaluaciones_historicas.estudiante_id
            AND rt.tutor_id = auth.uid()
            AND rt.activo = TRUE
        )
    );

-- POLÍTICA 5: Profesores y admins pueden ver todo (con auditoría)
CREATE POLICY "profesores_ver_todo" ON alertas_nee
    FOR SELECT
    USING (
        (SELECT rol FROM usuarios WHERE user_id = auth.uid()) IN ('PROFESOR', 'ADMIN')
    );

-- ────────────────────────────────────────────────────────────
-- 7. FUNCIONES AUXILIARES PARA CONTROL DE ACCESO
-- ────────────────────────────────────────────────────────────

-- Función: Verificar si un tutor tiene permiso para ver alertas NEE
CREATE OR REPLACE FUNCTION tiene_permiso_alertas_nee(
    p_tutor_id UUID,
    p_estudiante_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM relacion_tutor
        WHERE tutor_id = p_tutor_id
        AND estudiante_id = p_estudiante_id
        AND permiso_alertas_nee = TRUE
        AND activo = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION tiene_permiso_alertas_nee IS 'Verifica si un tutor tiene permiso explícito para ver alertas NEE de un estudiante';

-- Función: Registrar acceso a alerta NEE (auditoría)
CREATE OR REPLACE FUNCTION registrar_acceso_alerta_nee(
    p_alerta_id UUID,
    p_usuario_id UUID
)
RETURNS VOID AS $$
BEGIN
    -- Actualizar fecha de vista si es la primera vez
    UPDATE alertas_nee
    SET fecha_vista = COALESCE(fecha_vista, NOW()),
        estado = CASE WHEN estado = 'PENDIENTE' THEN 'VISTA' ELSE estado END
    WHERE alerta_id = p_alerta_id;
    
    -- Aquí podrías insertar en una tabla de auditoría si fuera necesario
    -- INSERT INTO auditoria_accesos (usuario_id, recurso_id, accion, fecha) ...
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Activar alerta NEE en perfil estudiante
CREATE OR REPLACE FUNCTION activar_alerta_nee(
    p_estudiante_id UUID,
    p_tipo_alerta VARCHAR
)
RETURNS VOID AS $$
BEGIN
    UPDATE perfiles_estudiantes
    SET alerta_activa_nee = TRUE,
        tipo_alerta_nee = p_tipo_alerta,
        fecha_ultima_alerta = NOW(),
        alerta_revisada = FALSE
    WHERE estudiante_id = p_estudiante_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ────────────────────────────────────────────────────────────
-- 8. TRIGGERS PARA MANTENIMIENTO AUTOMÁTICO
-- ────────────────────────────────────────────────────────────

-- Trigger: Actualizar fecha_actualizacion en perfiles
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_perfil
    BEFORE UPDATE ON perfiles_estudiantes
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_modificacion();

-- Trigger: Actualizar ultimo_acceso en usuarios
CREATE OR REPLACE FUNCTION actualizar_ultimo_acceso()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE usuarios
    SET ultimo_acceso = NOW()
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────
-- 9. DATOS DE EJEMPLO (DESARROLLO/TESTING)
-- ────────────────────────────────────────────────────────────

-- Comentario: Descomentar solo en entorno de desarrollo

/*
-- Usuario estudiante
INSERT INTO usuarios (user_id, email, rol, nombre_completo) VALUES
('11111111-1111-1111-1111-111111111111', 'juan.perez@example.com', 'ESTUDIANTE', 'Juan Pérez García');

-- Usuario padre/tutor
INSERT INTO usuarios (user_id, email, rol, nombre_completo) VALUES
('22222222-2222-2222-2222-222222222222', 'maria.garcia@example.com', 'PADRE_TUTOR', 'María García López');

-- Perfil estudiante
INSERT INTO perfiles_estudiantes (estudiante_id, nivel_actual, estilo_aprendizaje) VALUES
('11111111-1111-1111-1111-111111111111', '4º Primaria', 'VISUAL');

-- Relación tutor-estudiante CON permiso para alertas NEE
INSERT INTO relacion_tutor (tutor_id, estudiante_id, permiso_alertas_nee, fecha_consentimiento_nee) VALUES
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', TRUE, NOW());
*/

-- ────────────────────────────────────────────────────────────
-- 10. ÍNDICES COMPUESTOS PARA OPTIMIZACIÓN
-- ────────────────────────────────────────────────────────────

CREATE INDEX idx_relacion_tutor_estudiante_activo 
ON relacion_tutor(tutor_id, estudiante_id, activo);

CREATE INDEX idx_evaluaciones_estudiante_fecha 
ON evaluaciones_historicas(estudiante_id, fecha_evaluacion DESC);

CREATE INDEX idx_alertas_estudiante_estado 
ON alertas_nee(estudiante_id, estado);

-- ════════════════════════════════════════════════════════════
-- FIN DEL ESQUEMA DE BASE DE DATOS
-- ════════════════════════════════════════════════════════════

-- Para aplicar este esquema en Supabase:
-- 1. Copia todo este código
-- 2. Ve a tu proyecto Supabase → SQL Editor
-- 3. Pega y ejecuta
-- 4. Verifica que todas las tablas se crearon correctamente
-- 5. Verifica que RLS está activo en las tablas sensibles
