import React, { useState, useEffect } from 'react';
import {
    Target, Sparkles, BookOpen, Brain, TrendingUp,
    CheckCircle2, AlertCircle, Zap, Award, FileText,
    Play, Download, Printer
} from 'lucide-react';
import { sugerirFichas, generarFichaPersonalizada } from '../services/fichas-personalizadas-service';
import { analizarTendencias } from '../services/analisis-historico-service';

/**
 * COMPONENTE DE FICHAS PERSONALIZADAS
 * Muestra sugerencias y genera fichas enfocadas en las necesidades del estudiante
 */
const FichasPersonalizadas = ({ historialEvaluaciones, asignatura, curso, onGenerarFicha }) => {
    const [sugerencias, setSugerencias] = useState([]);
    const [fichaGenerada, setFichaGenerada] = useState(null);
    const [generando, setGenerando] = useState(false);

    useEffect(() => {
        if (historialEvaluaciones && historialEvaluaciones.length > 0 && asignatura && curso) {
            const analisis = analizarTendencias(historialEvaluaciones);
            if (analisis.hayDatos) {
                const sugerenciasGeneradas = sugerirFichas(analisis, asignatura, curso);
                setSugerencias(sugerenciasGeneradas);
            }
        }
    }, [historialEvaluaciones, asignatura, curso]);

    const handleGenerarFicha = async (sugerencia, tema = 'General') => {
        setGenerando(true);
        try {
            const configuracion = {
                ...sugerencia.configuracion,
                tema: tema,
                numPreguntas: 10
            };

            const ficha = await generarFichaPersonalizada(
                historialEvaluaciones,
                configuracion
            );

            setFichaGenerada(ficha);

            if (onGenerarFicha) {
                onGenerarFicha(ficha);
            }
        } catch (error) {
            console.error('Error generando ficha:', error);
        } finally {
            setGenerando(false);
        }
    };

    if (!historialEvaluaciones || historialEvaluaciones.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
                    <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">
                        Fichas Personalizadas
                    </h2>
                    <p className="text-blue-700 mb-4">
                        Completa algunas evaluaciones para recibir fichas personalizadas
                        según tus necesidades específicas
                    </p>
                    <div className="text-sm text-blue-600 bg-white rounded-lg p-4 inline-block">
                        💡 El sistema analizará tu progreso y patrones de error para
                        crear fichas enfocadas en lo que más necesitas practicar
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    Fichas Personalizadas
                </h1>
                <p className="text-purple-100">
                    Ejercicios adaptados a tus necesidades específicas
                </p>
            </div>

            {/* Sugerencias */}
            {sugerencias.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Target className="w-6 h-6 text-purple-600" />
                        Fichas Recomendadas Para Ti
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {sugerencias.map((sugerencia, idx) => (
                            <TarjetaSugerencia
                                key={idx}
                                sugerencia={sugerencia}
                                onGenerar={handleGenerarFicha}
                                generando={generando}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Ficha Generada */}
            {fichaGenerada && (
                <VistaFichaGenerada
                    ficha={fichaGenerada}
                    onCerrar={() => setFichaGenerada(null)}
                />
            )}

            {/* Info adicional */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    ¿Cómo funciona la personalización?
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                            <span className="text-2xl">📊</span>
                            Análisis
                        </div>
                        <p className="text-gray-700">
                            Analizamos tus evaluaciones anteriores para identificar patrones de error
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            Enfoque
                        </div>
                        <p className="text-gray-700">
                            Seleccionamos ejercicios específicos para tu tipo de error más frecuente
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            Progreso
                        </div>
                        <p className="text-gray-700">
                            Las fichas se adaptan según mejores y te desafían progresivamente
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Tarjeta de sugerencia individual
 */
const TarjetaSugerencia = ({ sugerencia, onGenerar, generando }) => {
    const [temaSeleccionado, setTemaSeleccionado] = useState('');

    const getPrioridadColor = () => {
        switch (sugerencia.prioridad) {
            case 1: return 'border-red-300 bg-red-50';
            case 2: return 'border-orange-300 bg-orange-50';
            default: return 'border-blue-300 bg-blue-50';
        }
    };

    const getPrioridadBadge = () => {
        switch (sugerencia.prioridad) {
            case 1: return { text: 'URGENTE', color: 'bg-red-500 text-white' };
            case 2: return { text: 'RECOMENDADO', color: 'bg-orange-500 text-white' };
            default: return { text: 'OPCIONAL', color: 'bg-blue-500 text-white' };
        }
    };

    const badge = getPrioridadBadge();

    return (
        <div className={`rounded-xl border-2 p-6 ${getPrioridadColor()} transition-all hover:shadow-lg`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{sugerencia.icono}</span>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {sugerencia.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {sugerencia.descripcion}
                        </p>
                    </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-bold ${badge.color}`}>
                    {badge.text}
                </span>
            </div>

            {/* Input de tema (opcional) */}
            <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Tema específico (opcional):
                </label>
                <input
                    type="text"
                    value={temaSeleccionado}
                    onChange={(e) => setTemaSeleccionado(e.target.value)}
                    placeholder="Ej: Fracciones, El Clima, etc."
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
            </div>

            {/* Botón generar */}
            <button
                onClick={() => onGenerar(sugerencia, temaSeleccionado || 'General')}
                disabled={generando}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${generando
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
            >
                {generando ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generando...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Generar Ficha
                    </>
                )}
            </button>
        </div>
    );
};

/**
 * Vista de ficha generada
 */
const VistaFichaGenerada = ({ ficha, onCerrar }) => {
    return (
        <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-2xl p-6">
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            ¡Ficha Generada!
                        </h2>
                    </div>
                    <h3 className="text-xl text-purple-600 font-semibold">
                        {ficha.titulo}
                    </h3>
                </div>
                <button
                    onClick={onCerrar}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>
            </div>

            {/* Descripción */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                <div className="whitespace-pre-line text-gray-700">
                    {ficha.descripcion}
                </div>
            </div>

            {/* Metadata */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Preguntas</div>
                    <div className="text-2xl font-bold text-blue-600">
                        {ficha.preguntas.length}
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Dificultad</div>
                    <div className="text-2xl font-bold text-purple-600 capitalize">
                        {ficha.enfoque.dificultadSugerida}
                    </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Prioridad</div>
                    <div className="text-2xl font-bold text-pink-600">
                        {ficha.enfoque.prioridad}
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Tipo</div>
                    <div className="text-sm font-bold text-green-600">
                        {ficha.enfoque.tipo.replace('_', ' ').toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Preguntas preview */}
            <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Vista Previa (primeras 3 preguntas):
                </h4>
                <div className="space-y-3">
                    {ficha.preguntas.slice(0, 3).map((pregunta, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                            <div className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                        {pregunta.pregunta || pregunta.text}
                                    </div>
                                    {pregunta.dificultad && (
                                        <div className="mt-1 text-xs text-gray-500">
                                            Dificultad: {pregunta.dificultad}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {ficha.preguntas.length > 3 && (
                        <div className="text-sm text-gray-500 text-center py-2">
                            ... y {ficha.preguntas.length - 3} preguntas más
                        </div>
                    )}
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Comenzar Ficha
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Descargar
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                    Imprimir
                </button>
            </div>
        </div>
    );
};

export default FichasPersonalizadas;
