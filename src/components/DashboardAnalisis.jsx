import React, { useState, useEffect } from 'react';
import {
    TrendingUp, TrendingDown, Target, Award, AlertCircle,
    Brain, LineChart, BarChart3, Clock, Calendar,
    AlertTriangle, CheckCircle2, ArrowUp, ArrowDown,
    Zap, Star, Trophy, BookOpen
} from 'lucide-react';
import { analizarTendencias, generarResumenProgreso } from '../services/analisis-historico-service';

/**
 * DASHBOARD DE ANÁLISIS HISTÓRICO
 * Muestra el progreso del estudiante a lo largo del tiempo
 */
const DashboardAnalisis = ({ evaluaciones, nombreEstudiante }) => {
    const [analisis, setAnalisis] = useState(null);
    const [vistaActual, setVistaActual] = useState('resumen'); // 'resumen' | 'tendencias' | 'patrones' | 'alertas'

    useEffect(() => {
        if (evaluaciones && evaluaciones.length > 0) {
            const resultado = analizarTendencias(evaluaciones);
            setAnalisis(resultado);
        }
    }, [evaluaciones]);

    if (!analisis || !analisis.hayDatos) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
                    <Clock className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-yellow-900 mb-2">
                        Aún no hay datos históricos
                    </h2>
                    <p className="text-yellow-700">
                        Realiza al menos 2 evaluaciones para ver tu progreso y tendencias
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8" />
                    Dashboard de Progreso
                </h1>
                <p className="text-indigo-100">
                    {nombreEstudiante ? `Análisis de ${nombreEstudiante}` : 'Análisis de Progreso'} • {analisis.totalEvaluaciones} evaluaciones
                </p>

                {/* Tabs */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => setVistaActual('resumen')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${vistaActual === 'resumen'
                            ? 'bg-white text-indigo-600'
                            : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                            }`}
                    >
                        📊 Resumen
                    </button>
                    <button
                        onClick={() => setVistaActual('tendencias')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${vistaActual === 'tendencias'
                            ? 'bg-white text-indigo-600'
                            : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                            }`}
                    >
                        📈 Evolución
                    </button>
                    <button
                        onClick={() => setVistaActual('patrones')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${vistaActual === 'patrones'
                            ? 'bg-white text-indigo-600'
                            : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                            }`}
                    >
                        🧠 Patrones
                    </button>
                    <button
                        onClick={() => setVistaActual('alertas')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${vistaActual === 'alertas'
                            ? 'bg-white text-indigo-600'
                            : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                            }`}
                    >
                        ⚠️ Alertas {analisis.alertas.length > 0 && `(${analisis.alertas.length})`}
                    </button>
                </div>
            </div>

            {/* Contenido según vista */}
            {vistaActual === 'resumen' && <VistaResumen analisis={analisis} />}
            {vistaActual === 'tendencias' && <VistaTendencias analisis={analisis} />}
            {vistaActual === 'patrones' && <VistaPatrones analisis={analisis} />}
            {vistaActual === 'alertas' && <VistaAlertas analisis={analisis} />}
        </div>
    );
};

/**
 * VISTA RESUMEN
 */
const VistaResumen = ({ analisis }) => {
    return (
        <div className="space-y-6">
            {/* Tarjetas de métricas principales */}
            <div className="grid md:grid-cols-4 gap-4">
                {/* Tendencia General */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
                    <div className="text-4xl mb-2">{analisis.tendenciaGeneral.icono}</div>
                    <div className="text-sm text-gray-600 mb-1">Tendencia</div>
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                        {analisis.tendenciaGeneral.tipo.replace('_', ' ')}
                    </div>
                </div>

                {/* Promedio */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-sm text-gray-600 mb-1">Promedio General</div>
                    <div className="text-2xl font-bold text-blue-600">
                        {analisis.evolucionPuntuacion.promedio}%
                    </div>
                </div>

                {/* Mejor Resultado */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-sm text-gray-600 mb-1">Mejor Resultado</div>
                    <div className="text-2xl font-bold text-green-600">
                        {analisis.evolucionPuntuacion.mejor}%
                    </div>
                </div>

                {/* Velocidad de Mejora */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-sm text-gray-600 mb-1">Velocidad de Mejora</div>
                    <div className="text-2xl font-bold text-purple-600">
                        {analisis.velocidadMejora.valor}%/eval
                    </div>
                </div>
            </div>

            {/* Mensaje de tendencia */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    ¿Cómo voy?
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                    {analisis.tendenciaGeneral.mensaje}
                </p>
                <p className="text-sm text-gray-600">
                    {analisis.velocidadMejora.mensaje}
                </p>
            </div>

            {/* Fortalezas Consistentes */}
            {analisis.fortalezasConsistentes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                    <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        Tus Fortalezas Consistentes
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {analisis.fortalezasConsistentes.map((fortaleza, idx) => (
                            <div key={idx} className="bg-green-50 p-4 rounded-lg">
                                <div className="text-3xl mb-2">{fortaleza.icono}</div>
                                <div className="font-semibold text-green-900 mb-1">
                                    {fortaleza.titulo}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {fortaleza.descripcion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Predicciones */}
            {analisis.predicciones.disponible && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        Predicción
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-600 mb-2">Próximo resultado estimado:</div>
                            <div className="text-4xl font-bold text-purple-600">
                                {analisis.predicciones.proximaPuntuacion}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Confianza: {analisis.predicciones.confianza}
                            </div>
                        </div>
                        {analisis.predicciones.evaluacionesHasta90 && (
                            <div>
                                <div className="text-sm text-gray-600 mb-2">Para alcanzar 90%:</div>
                                <div className="text-4xl font-bold text-purple-600">
                                    {analisis.predicciones.evaluacionesHasta90}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    evaluaciones más (aproximadamente)
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Recomendaciones Principales */}
            {analisis.recomendaciones.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
                    <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        Recomendaciones Basadas en Tu Historial
                    </h3>
                    <div className="space-y-3">
                        {analisis.recomendaciones.slice(0, 3).map((rec, idx) => (
                            <div key={idx} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{rec.icono}</span>
                                    <div className="flex-1">
                                        <div className="font-semibold text-orange-900 mb-1">
                                            {rec.titulo}
                                        </div>
                                        <div className="text-sm text-gray-700 mb-2">
                                            {rec.descripcion}
                                        </div>
                                        <div className="text-xs bg-white px-3 py-1 rounded inline-block">
                                            💡 {rec.accion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * VISTA TENDENCIAS
 */
const VistaTendencias = ({ analisis }) => {
    const datos = analisis.evolucionPuntuacion.datos;
    const maxPuntuacion = Math.max(...datos.map(d => d.puntuacion));

    return (
        <div className="space-y-6">
            {/* Gráfico de evolución */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <LineChart className="w-6 h-6 text-blue-600" />
                    Evolución de Puntuación
                </h3>

                {/* Gráfico simple con barras */}
                <div className="space-y-3">
                    {datos.map((punto, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-700">
                                    {new Date(punto.fecha).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'short'
                                    })}
                                </span>
                                <span className="font-bold text-gray-900">
                                    {punto.puntuacion}% ({punto.correctas}/{punto.total})
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-6 relative">
                                <div
                                    className="h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-2 text-xs font-bold text-white"
                                    style={{
                                        width: `${punto.puntuacion}%`,
                                        backgroundColor: punto.puntuacion >= 80 ? '#10b981' :
                                            punto.puntuacion >= 60 ? '#3b82f6' :
                                                punto.puntuacion >= 40 ? '#f59e0b' : '#ef4444'
                                    }}
                                >
                                    {punto.puntuacion === maxPuntuacion && '🏆'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Estadísticas */}
                <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t-2">
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Promedio</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {analisis.evolucionPuntuacion.promedio}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Mejor</div>
                        <div className="text-2xl font-bold text-green-600">
                            {analisis.evolucionPuntuacion.mejor}%
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600">Mejora Total</div>
                        <div className="text-2xl font-bold flex items-center justify-center gap-2"
                            style={{ color: analisis.evolucionPuntuacion.mejoria >= 0 ? '#10b981' : '#ef4444' }}>
                            {analisis.evolucionPuntuacion.mejoria >= 0 ? <ArrowUp /> : <ArrowDown />}
                            {Math.abs(analisis.evolucionPuntuacion.mejoria)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Análisis de velocidad */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Velocidad de Mejora
                </h3>
                <div className="text-center">
                    <div className="text-5xl font-bold text-purple-600 mb-2">
                        {analisis.velocidadMejora.valor}%
                    </div>
                    <div className="text-lg text-gray-700 mb-4">
                        por evaluación
                    </div>
                    <p className="text-gray-600">
                        {analisis.velocidadMejora.mensaje}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * VISTA PATRONES
 */
const VistaPatrones = ({ analisis }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-purple-600" />
                    Patrones de Error
                </h3>

                <div className="text-center py-8 text-gray-500">
                    <p>Análisis de patrones avanzados desactivado.</p>
                </div>
            </div>
        </div>
    );
};

/**
 * VISTA ALERTAS
 */
const VistaAlertas = ({ analisis }) => {
    return (
        <div className="space-y-6">
            {analisis.alertas.length === 0 ? (
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 text-center">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                        ¡Todo bien!
                    </h3>
                    <p className="text-green-700">
                        No hay alertas activas. Tu progreso es positivo.
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                        <h3 className="text-xl font-bold text-yellow-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" />
                            {analisis.alertas.length} Alerta{analisis.alertas.length > 1 ? 's' : ''} Activa{analisis.alertas.length > 1 ? 's' : ''}
                        </h3>
                        <p className="text-sm text-yellow-700">
                            Estas alertas requieren tu atención para mantener o mejorar tu progreso
                        </p>
                    </div>

                    <div className="space-y-4">
                        {analisis.alertas.map((alerta, idx) => (
                            <div key={idx} className={`p-6 rounded-xl border-2 ${alerta.gravedad === 'ALTA' ? 'bg-red-50 border-red-300' :
                                alerta.gravedad === 'MEDIA' ? 'bg-orange-50 border-orange-300' :
                                    'bg-yellow-50 border-yellow-300'
                                }`}>
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{alerta.icono}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`text-xl font-bold ${alerta.gravedad === 'ALTA' ? 'text-red-900' :
                                                alerta.gravedad === 'MEDIA' ? 'text-orange-900' :
                                                    'text-yellow-900'
                                                }`}>
                                                {alerta.titulo}
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded ${alerta.gravedad === 'ALTA' ? 'bg-red-200 text-red-900' :
                                                alerta.gravedad === 'MEDIA' ? 'bg-orange-200 text-orange-900' :
                                                    'bg-yellow-200 text-yellow-900'
                                                }`}>
                                                {alerta.gravedad}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-3">
                                            {alerta.mensaje}
                                        </p>
                                        <div className="bg-white p-3 rounded-lg">
                                            <strong className="text-sm">💡 Acción recomendada:</strong>
                                            <p className="text-sm mt-1">{alerta.accion}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardAnalisis;
