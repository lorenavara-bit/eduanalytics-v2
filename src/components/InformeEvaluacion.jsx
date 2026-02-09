import React, { useState } from 'react';
import {
    TrendingUp, TrendingDown, Target, Award, AlertCircle,
    CheckCircle2, XCircle, Brain, BookOpen, Users,
    Download, Printer, Share2, Mail, Star, Trophy,
    BarChart3, PieChart, LineChart, Clock, Calendar
} from 'lucide-react';

/**
 * COMPONENTE DE INFORME DE EVALUACIÓN
 * Muestra análisis detallado con feedback para estudiante y padres
 */
const InformeEvaluacion = ({ resultados, nombreEstudiante, nombreFicha }) => {
    const [vistaActual, setVistaActual] = useState('estudiante'); // 'estudiante' | 'padres' | 'detallado'

    if (!resultados) {
        return <div className="text-gray-500">Cargando resultados...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header con selector de vista */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <h1 className="text-3xl font-bold mb-2">📊 Informe de Evaluación</h1>
                <p className="text-blue-100 mb-4">{nombreFicha || 'Ficha de Trabajo'}</p>

                {/* Tabs para cambiar vista */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                    <button
                        onClick={() => setVistaActual('estudiante')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${vistaActual === 'estudiante'
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500/30 hover:bg-blue-500/50'
                            }`}
                    >
                        👨‍🎓 Para el Estudiante
                    </button>
                    <button
                        onClick={() => setVistaActual('padres')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${vistaActual === 'padres'
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500/30 hover:bg-blue-500/50'
                            }`}
                    >
                        👨‍👩‍👧 Para los Padres
                    </button>
                    <button
                        onClick={() => setVistaActual('cognitiva')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${vistaActual === 'cognitiva'
                            ? 'bg-white text-purple-600 shadow-lg'
                            : 'bg-purple-500/30 hover:bg-purple-500/50'
                            }`}
                    >
                        🧠 Cerebro Cognitivo
                    </button>
                    <button
                        onClick={() => setVistaActual('detallado')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${vistaActual === 'detallado'
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500/30 hover:bg-blue-500/50'
                            }`}
                    >
                        📋 Análisis Detallado
                    </button>
                </div>
            </div>

            {/* Tarjeta de Puntuación Principal */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Puntuación visual */}
                    <div className="text-center">
                        <div className="relative inline-block">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="#e5e7eb"
                                    strokeWidth="16"
                                    fill="none"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke={getColorPorcentaje(resultados.porcentaje)}
                                    strokeWidth="16"
                                    fill="none"
                                    strokeDasharray={`${(resultados.porcentaje / 100) * 502.65} 502.65`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-5xl font-bold" style={{ color: getColorPorcentaje(resultados.porcentaje) }}>
                                    {resultados.porcentaje}%
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {resultados.correctas}/{resultados.totalPreguntas}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <div>
                                <div className="font-semibold text-green-900">Correctas</div>
                                <div className="text-2xl font-bold text-green-600">{resultados.correctas}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-orange-600" />
                            <div>
                                <div className="font-semibold text-orange-900">Parcialmente correctas</div>
                                <div className="text-2xl font-bold text-orange-600">{resultados.parciales}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600" />
                            <div>
                                <div className="font-semibold text-red-900">Incorrectas</div>
                                <div className="text-2xl font-bold text-red-600">{resultados.incorrectas}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido según vista seleccionada */}
            {vistaActual === 'estudiante' && <VistaEstudiante resultados={resultados} />}
            {vistaActual === 'padres' && <VistaPadres resultados={resultados} nombreEstudiante={nombreEstudiante} />}
            {vistaActual === 'cognitiva' && <VistaCognitiva resultados={resultados} />}
            {vistaActual === 'detallado' && <VistaDetallada resultados={resultados} />}

            {/* Botones de acción */}
            <div className="flex gap-4 justify-center print:hidden">
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Printer className="w-5 h-5" />
                    Imprimir Informe
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-5 h-5" />
                    Descargar PDF
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Mail className="w-5 h-5" />
                    Enviar por Email
                </button>
            </div>
        </div>
    );
};

/**
 * VISTA PARA EL ESTUDIANTE
 */
const VistaEstudiante = ({ resultados }) => {
    return (
        <div className="space-y-6">
            {/* Mensaje personalizado */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Star className="w-7 h-7" />
                    Tu Resultado
                </h2>
                <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {resultados.mensajeEstudiante}
                </div>
            </div>

            {/* Fortalezas */}
            {resultados.fortalezas.length > 0 && (
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        Tus Fortalezas
                    </h3>
                    <div className="space-y-3">
                        {resultados.fortalezas.map((fortaleza, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                                <span className="text-3xl">{fortaleza.icono}</span>
                                <div>
                                    <div className="font-semibold text-green-900">{fortaleza.titulo}</div>
                                    <div className="text-sm text-gray-600">{fortaleza.descripcion}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Áreas de mejora */}
            {resultados.debilidades.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6" />
                        ¿Dónde puedes mejorar?
                    </h3>
                    <div className="space-y-3">
                        {resultados.debilidades.map((debilidad, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                                <span className="text-3xl">{debilidad.icono}</span>
                                <div className="flex-1">
                                    <div className="font-semibold text-blue-900">{debilidad.titulo}</div>
                                    <div className="text-sm text-gray-600 mb-2">{debilidad.descripcion}</div>
                                    <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
                                        💡 {debilidad.accion}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recomendaciones */}
            <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Próximos Pasos
                </h3>
                <div className="space-y-3">
                    {resultados.recomendacionesGenerales.map((rec, idx) => (
                        <div key={idx} className={`p-4 rounded-lg ${getPrioridadColor(rec.prioridad)}`}>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{rec.icono}</span>
                                <div>
                                    <div className="font-semibold mb-1">{rec.mensaje}</div>
                                    <div className="text-sm bg-white/70 px-3 py-1 rounded">
                                        📌 {rec.accion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * VISTA PARA LOS PADRES
 */
const VistaPadres = ({ resultados, nombreEstudiante }) => {
    return (
        <div className="space-y-6">
            {/* Resumen ejecutivo */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-7 h-7 text-blue-600" />
                    Informe para Padres/Tutores
                </h2>
                <div className="prose max-w-none whitespace-pre-line text-gray-700">
                    {resultados.mensajePadres}
                </div>
            </div>

            {/* Gráfico de rendimiento por dificultad */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    Rendimiento por Nivel de Dificultad
                </h3>
                <div className="space-y-4">
                    {Object.entries(resultados.porDificultad).map(([nivel, data]) => (
                        <div key={nivel} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold capitalize">{nivel}</span>
                                <span className="text-gray-600">{data.correctas}/{data.total} ({data.porcentaje}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all duration-1000 ${getColorBarra(data.porcentaje)}`}
                                    style={{ width: `${data.porcentaje}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Errores que requieren atención */}
            {resultados.erroresGraves && resultados.erroresGraves.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        Atención Especial Requerida
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                        Se han detectado errores conceptuales que requieren intervención inmediata:
                    </p>
                    <div className="space-y-3">
                        {resultados.erroresGraves.map((error, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg">
                                <div className="font-semibold text-red-900 mb-1">Tema: {error.tema}</div>
                                <div className="text-sm text-gray-600 mb-2">Pregunta: "{error.pregunta}"</div>
                                <div className="text-sm bg-red-100 text-red-800 px-3 py-2 rounded">
                                    💡 <strong>Recomendación:</strong> {error.recomendacion}
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
 * VISTA COGNITIVA (THE BRAIN)
 */
const VistaCognitiva = ({ resultados }) => {
    const perfil = resultados.perfilCognitivo || {
        nombre: "Explorador en formación",
        descripcion: "Analizando patrones de aprendizaje...",
        tags: ["En proceso"]
    };

    const metricas = resultados.metricasAvanzadas || {
        totalInseguridad: 0,
        totalDudas: 0,
        latenciaMediaVoz: 0,
        puntosConcentracion: 0
    };

    return (
        <div className="space-y-6">
            {/* Perfil del Aprendiz */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        <Brain className="w-4 h-4" /> Diagnóstico de Proceso
                    </div>
                    <h2 className="text-3xl font-black mb-4">Perfil: {perfil.nombre}</h2>
                    <p className="text-slate-300 leading-relaxed mb-6 max-w-2xl">
                        {perfil.descripcion}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {perfil.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Decoración abstracta */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Nivel de Inseguridad (Swaps/Correcciones) */}
                <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-rose-500" /> Inseguridad de Selección
                    </h3>
                    <div className="flex items-end gap-1 mb-4 h-24">
                        {[5, 12, 8, 15, 20, metricas.totalInseguridad].map((val, i) => (
                            <div
                                key={i}
                                className={`flex-1 rounded-t-lg transition-all duration-1000 ${i === 5 ? 'bg-indigo-600' : 'bg-slate-100'}`}
                                style={{ height: `${Math.min(100, val * 5)}%` }}
                            />
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-sm text-slate-500">
                        {metricas.totalInseguridad > 5
                            ? "Se observa una tendencia alta a rectificar respuestas ya marcadas."
                            : "El alumno muestra una toma de decisiones firme y decidida."}
                    </div>
                </div>

                {/* Concentración de Lectura (Linealidad) */}
                <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-500" /> Concentración en Escaneo
                    </h3>
                    <div className="flex flex-col items-center justify-center h-24 mb-4">
                        <div className="text-4xl font-black text-slate-800">{metricas.puntosConcentracion}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Puntos de Foco</div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${Math.min(100, metricas.puntosConcentracion * 2)}%` }}
                        />
                    </div>
                    <p className="mt-4 text-[11px] text-slate-400 font-medium">
                        Mide la capacidad de encontrar palabras siguiendo un orden lógico de lectura.
                    </p>
                </div>

                {/* Fluidez Oral (Voz) */}
                {resultados.metricasAvanzadas?.vocesDetectadas > 0 && (
                    <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm md:col-span-2">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-500" /> Latencia de Respuesta Oral
                        </h3>
                        <div className="flex items-center gap-6">
                            <div className="text-3xl font-black text-indigo-600">
                                {Math.round(metricas.latenciaMediaVoz)}ms
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                    <span>Fluidez Alta</span>
                                    <span>Bloqueo</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                                    <div
                                        className={`h-full transition-all duration-1000 ${metricas.latenciaMediaVoz > 4000 ? 'bg-amber-400' : 'bg-indigo-500'}`}
                                        style={{ width: `${Math.min(100, (metricas.latenciaMediaVoz / 8000) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Consejo AI */}
            <div className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-6">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Consejo del Tutor AI para Padres:
                </h4>
                <p className="text-indigo-800 text-sm italic">
                    {perfil.consejoPadres}
                </p>
            </div>
        </div>
    );
};

/**
 * VISTA DETALLADA
 */
const VistaDetallada = ({ resultados }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Brain className="w-7 h-7 text-purple-600" />
                    Análisis Pregunta por Pregunta
                </h2>
                <div className="space-y-4">
                    {resultados.analisisDetallado.map((analisis, idx) => (
                        <div
                            key={idx}
                            className={`p-5 rounded-xl border-2 ${analisis.correcta
                                ? 'bg-green-50 border-green-200'
                                : analisis.puntos > 0
                                    ? 'bg-orange-50 border-orange-200'
                                    : 'bg-red-50 border-red-200'
                                }`}
                        >
                            {/* Pregunta */}
                            <div className="flex items-start gap-3 mb-3">
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${analisis.correcta ? 'bg-green-600' : analisis.puntos > 0 ? 'bg-orange-600' : 'bg-red-600'
                                    }`}>
                                    {idx + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 mb-2">{analisis.pregunta}</div>

                                    {/* Respuestas */}
                                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                                        <div className="bg-white p-3 rounded-lg">
                                            <div className="text-xs text-gray-500 mb-1">Tu respuesta:</div>
                                            <div className="text-sm font-medium text-gray-800">
                                                {analisis.respuestaUsuario || <span className="text-gray-400 italic">Sin responder</span>}
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <div className="text-xs text-gray-500 mb-1">Respuesta correcta:</div>
                                            <div className="text-sm font-medium text-green-700">
                                                {analisis.respuestaCorrecta}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="bg-white/70 p-3 rounded-lg text-sm">
                                        <div className="font-semibold mb-1">📝 Feedback:</div>
                                        <div className="text-gray-700 whitespace-pre-line">{analisis.feedback}</div>
                                    </div>

                                    {/* Recomendación tradicional */}
                                    {analisis.recomendacion && !analisis.patronError && (
                                        <div className="mt-2 bg-blue-100 text-blue-800 p-3 rounded-lg text-sm">
                                            <div className="font-semibold mb-1">💡 Recomendación:</div>
                                            <div>{analisis.recomendacion}</div>
                                        </div>
                                    )}

                                    {/* Metadatos */}
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                            📊 Nivel Bloom: {analisis.nivelBloom}
                                        </span>
                                        {analisis.tipoError && !analisis.patronError && (
                                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                                                ⚠️ Tipo error: {analisis.tipoError}
                                            </span>
                                        )}
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            ⭐ Puntos: {analisis.puntos}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * FUNCIONES AUXILIARES
 */
function getColorPorcentaje(porcentaje) {
    if (porcentaje >= 90) return '#10b981'; // green-500
    if (porcentaje >= 70) return '#3b82f6'; // blue-500
    if (porcentaje >= 50) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
}

function getColorBarra(porcentaje) {
    if (porcentaje >= 80) return 'bg-green-500';
    if (porcentaje >= 60) return 'bg-blue-500';
    if (porcentaje >= 40) return 'bg-orange-500';
    return 'bg-red-500';
}

function getPrioridadColor(prioridad) {
    const colores = {
        'alta': 'bg-red-100 border-l-4 border-red-500',
        'media': 'bg-orange-100 border-l-4 border-orange-500',
        'baja': 'bg-blue-100 border-l-4 border-blue-500',
        'info': 'bg-green-100 border-l-4 border-green-500'
    };
    return colores[prioridad] || colores.info;
}

export default InformeEvaluacion;
