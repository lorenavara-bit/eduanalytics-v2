// COMPONENTE DE CONSENTIMIENTO GDPR/LOPD PARA ALERTAS NEE
// Cumple con Art. 6 y Art. 9 del RGPD

import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import './ConsentimientoNEE.css';

/**
 * Componente ConsentimientoNEE
 * Gestiona el consentimiento explícito para activación de alertas NEE
 * 
 * Props:
 * - tutorId: UUID del tutor/padre
 * - estudianteId: UUID del estudiante
 * - onConsentimientoChange: Callback cuando cambia el estado
 */
const ConsentimientoNEE = ({ tutorId, estudianteId, onConsentimientoChange }) => {
    const [estadoConsentimiento, setEstadoConsentimiento] = useState(null); // null, true, false
    const [cargando, setCargando] = useState(true);
    const [aceptado, setAceptado] = useState(false); // Checkbox
    const [mostrarRevocacion, setMostrarRevocacion] = useState(false);
    const [procesando, setProcesando] = useState(false);

    // ═══════════════════════════════════════════════════════════
    // EFECTO: Verificar estado del consentimiento al montar
    // ═══════════════════════════════════════════════════════════

    useEffect(() => {
        verificarConsentimiento();
    }, [tutorId, estudianteId]);

    /**
     * Verificar si el tutor ya ha dado consentimiento
     */
    const verificarConsentimiento = async () => {
        try {
            setCargando(true);

            // Consultar tabla relacion_tutor
            const { data, error } = await supabase
                .from('relacion_tutor')
                .select('permiso_alertas_nee, fecha_consentimiento_nee')
                .eq('tutor_id', tutorId)
                .eq('estudiante_id', estudianteId)
                .eq('activo', true)
                .single();

            if (error) {
                console.error('[CONSENTIMIENTO] Error al verificar:', error);
                setEstadoConsentimiento(false);
                return;
            }

            if (data) {
                setEstadoConsentimiento(data.permiso_alertas_nee || false);
                console.log('[CONSENTIMIENTO] Estado:', data.permiso_alertas_nee);
            } else {
                // No existe relación tutor-estudiante
                console.warn('[CONSENTIMIENTO] No existe relación tutor-estudiante');
                setEstadoConsentimiento(false);
            }

        } catch (error) {
            console.error('[CONSENTIMIENTO] Error:', error);
            setEstadoConsentimiento(false);
        } finally {
            setCargando(false);
        }
    };

    /**
     * Activar consentimiento (Aceptar)
     */
    const activarConsentimiento = async () => {
        if (!aceptado) {
            alert('Debe marcar la casilla de aceptación para continuar');
            return;
        }

        try {
            setProcesando(true);

            // Actualizar tabla relacion_tutor
            const { data, error } = await supabase
                .from('relacion_tutor')
                .update({
                    permiso_alertas_nee: true,
                    fecha_consentimiento_nee: new Date().toISOString()
                })
                .eq('tutor_id', tutorId)
                .eq('estudiante_id', estudianteId)
                .select();

            if (error) {
                console.error('[CONSENTIMIENTO] Error al activar:', error);
                alert('Error al activar el servicio. Por favor, inténtelo de nuevo.');
                return;
            }

            console.log('[CONSENTIMIENTO] Activado correctamente:', data);
            setEstadoConsentimiento(true);

            // Callback al componente padre
            if (onConsentimientoChange) {
                onConsentimientoChange(true);
            }

            // Feedback al usuario
            alert('✅ Servicio de Alertas NEE activado correctamente.\n\nAhora puede acceder al Informe de Patrones de Desempeño.');

        } catch (error) {
            console.error('[CONSENTIMIENTO] Error:', error);
            alert('Error inesperado. Por favor, contacte con soporte.');
        } finally {
            setProcesando(false);
        }
    };

    /**
     * Revocar consentimiento (Derecho de oposición GDPR)
     */
    const revocarConsentimiento = async () => {
        const confirmacion = window.confirm(
            '¿Está seguro de que desea desactivar el servicio de Alertas NEE?\n\n' +
            'Esta acción:\n' +
            '• Ocultará inmediatamente todos los informes de patrones\n' +
            '• No eliminará los datos históricos ya generados\n' +
            '• Puede reactivar el servicio en cualquier momento\n\n' +
            '¿Desea continuar?'
        );

        if (!confirmacion) return;

        try {
            setProcesando(true);

            // Actualizar tabla relacion_tutor
            const { data, error } = await supabase
                .from('relacion_tutor')
                .update({
                    permiso_alertas_nee: false
                    // NO eliminamos fecha_consentimiento_nee para auditoría
                })
                .eq('tutor_id', tutorId)
                .eq('estudiante_id', estudianteId)
                .select();

            if (error) {
                console.error('[CONSENTIMIENTO] Error al revocar:', error);
                alert('Error al desactivar el servicio. Por favor, inténtelo de nuevo.');
                return;
            }

            console.log('[CONSENTIMIENTO] Revocado correctamente:', data);
            setEstadoConsentimiento(false);
            setMostrarRevocacion(false);

            // Callback al componente padre
            if (onConsentimientoChange) {
                onConsentimientoChange(false);
            }

            // Feedback al usuario
            alert('✅ Servicio de Alertas NEE desactivado.\n\nLa información ya no es visible en su panel.');

        } catch (error) {
            console.error('[CONSENTIMIENTO] Error:', error);
            alert('Error inesperado. Por favor, contacte con soporte.');
        } finally {
            setProcesando(false);
        }
    };

    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════

    if (cargando) {
        return (
            <div className="consentimiento-nee loading">
                <div className="spinner"></div>
                <p>Verificando estado del servicio...</p>
            </div>
        );
    }

    // SI YA ESTÁ ACTIVADO: Mostrar estado y opción de revocación
    if (estadoConsentimiento === true) {
        return (
            <div className="consentimiento-nee activado">
                <div className="estado-header">
                    <span className="icono">✅</span>
                    <h3>Servicio de Alertas NEE Activado</h3>
                </div>

                <p className="descripcion">
                    El servicio de cribado de patrones de desempeño está activo.
                    Puede acceder al informe completo en la sección "Análisis Educativo".
                </p>

                <div className="info-consentimiento">
                    <p><strong>Datos que se analizan:</strong></p>
                    <ul>
                        <li>Tiempos de respuesta y variabilidad temporal</li>
                        <li>Patrones de error (EC, EP, EAC, ETF)</li>
                        <li>Rendimiento por asignatura y nivel Bloom</li>
                        <li>Tendencias históricas de desempeño</li>
                    </ul>
                </div>

                {!mostrarRevocacion ? (
                    <button
                        onClick={() => setMostrarRevocacion(true)}
                        className="btn-secondary"
                    >
                        ⚙️ Gestionar Consentimiento
                    </button>
                ) : (
                    <div className="revocacion-container">
                        <div className="warning-box">
                            <span className="icono-warning">⚠️</span>
                            <p>
                                <strong>Derecho de oposición (GDPR Art. 21)</strong><br />
                                Puede revocar su consentimiento en cualquier momento.
                                Los informes de alertas dejarán de ser visibles inmediatamente.
                            </p>
                        </div>

                        <div className="botones-revocacion">
                            <button
                                onClick={revocarConsentimiento}
                                disabled={procesando}
                                className="btn-danger"
                            >
                                {procesando ? 'Procesando...' : 'Revocar Consentimiento'}
                            </button>
                            <button
                                onClick={() => setMostrarRevocacion(false)}
                                className="btn-secondary"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // SI NO ESTÁ ACTIVADO: Mostrar formulario de consentimiento
    return (
        <div className="consentimiento-nee desactivado">
            <div className="estado-header">
                <span className="icono">🔒</span>
                <h3>Activar Servicio de Cribado de Patrones de Desempeño (NEE)</h3>
            </div>

            <div className="disclaimer-legal">
                <h4>⚖️ Información Legal Importante</h4>

                <div className="disclaimer-box">
                    <p className="destacado">
                        <strong>Este servicio NO es un diagnóstico médico ni psicológico.</strong>
                    </p>

                    <p>
                        EduAnalytics utiliza análisis estadístico de datos pedagógicos
                        (tiempos de respuesta, patrones de error, rendimiento histórico)
                        para identificar <strong>indicadores tempranos</strong> que <strong>sugieren</strong>
                        la necesidad de evaluación profesional externa.
                    </p>

                    <p>
                        Los patrones detectados incluyen:
                    </p>
                    <ul>
                        <li><strong>Altas Capacidades (AACC):</strong> Alto ritmo cognitivo y eficiencia extrema</li>
                        <li><strong>TDAH:</strong> Inconsistencia atencional y variabilidad temporal</li>
                        <li><strong>Dislexia:</strong> Discrepancia entre comprensión y expresión escrita</li>
                    </ul>
                </div>
            </div>

            <div className="datos-procesados">
                <h4>📊 Datos que Serán Analizados</h4>
                <p>Al activar este servicio, usted autoriza el procesamiento de:</p>
                <ul>
                    <li>Tiempos de respuesta en evaluaciones</li>
                    <li>Variabilidad temporal entre ejercicios</li>
                    <li>Patrones de error clasificados (EC, EP, EAC, ETF)</li>
                    <li>Rendimiento por asignatura y competencia</li>
                    <li>Historial de evaluaciones (mínimo 10 para análisis confiable)</li>
                </ul>
            </div>

            <div className="base-legal">
                <h4>📋 Base Legal (RGPD)</h4>
                <p>
                    El tratamiento de estos datos se realiza conforme al <strong>Art. 6.1.a</strong>
                    (Consentimiento del interesado) y <strong>Art. 9.2.a</strong> (Datos de salud/educación)
                    del Reglamento General de Protección de Datos (RGPD).
                </p>
            </div>

            <div className="derechos-usuario">
                <h4>✅ Sus Derechos</h4>
                <ul>
                    <li><strong>Acceso:</strong> Puede consultar todos los informes generados</li>
                    <li><strong>Rectificación:</strong> Puede corregir datos incorrectos</li>
                    <li><strong>Oposición:</strong> Puede revocar este consentimiento en cualquier momento</li>
                    <li><strong>Limitación:</strong> Los datos solo se usan para este fin específico</li>
                    <li><strong>Portabilidad:</strong> Puede exportar todos sus datos</li>
                </ul>
            </div>

            <div className="consentimiento-checkbox">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={aceptado}
                        onChange={(e) => setAceptado(e.target.checked)}
                        disabled={procesando}
                    />
                    <span className="checkmark"></span>
                    <span className="texto-consentimiento">
                        <strong>He leído y comprendo</strong> que este servicio realiza un
                        <strong> cribado educativo</strong>, NO un diagnóstico médico, y que los
                        patrones detectados son indicadores que <strong>sugieren una evaluación
                            profesional externa</strong>. Autorizo el análisis de datos pedagógicos
                        para generar alertas tempranas según lo descrito.
                    </span>
                </label>
            </div>

            <div className="botones-accion">
                <button
                    onClick={activarConsentimiento}
                    disabled={!aceptado || procesando}
                    className="btn-primary"
                >
                    {procesando ? 'Activando...' : '✅ Acepto Activar el Servicio de Alertas NEE'}
                </button>
            </div>

            <div className="nota-final">
                <p className="texto-pequeno">
                    <strong>Nota:</strong> Al aceptar, se activará el análisis automático de
                    patrones en las próximas evaluaciones. Las alertas solo serán visibles
                    para usted (padre/tutor), nunca para el estudiante. Puede revocar este
                    consentimiento en cualquier momento desde la configuración de su cuenta.
                </p>
            </div>
        </div>
    );
};

export default ConsentimientoNEE;
