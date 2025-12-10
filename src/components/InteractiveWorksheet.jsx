import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare, Send, Loader2, Lightbulb, Award, Target, Brain } from 'lucide-react';

const InteractiveWorksheet = ({ data, onCorrect, studentId, worksheetId }) => {
    const [answers, setAnswers] = useState({});
    const [correctionResult, setCorrectionResult] = useState(null);
    const [correcting, setCorrecting] = useState(false);
    const [revealedHints, setRevealedHints] = useState({});
    const [startTime] = useState(Date.now());

    const handleAnswerChange = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const toggleHint = (qId) => {
        setRevealedHints(prev => ({ ...prev, [qId]: !prev[qId] }));
    };

    const handleSubmit = async () => {
        setCorrecting(true);
        try {
            const endTime = Date.now();
            const timeSpent = Math.round((endTime - startTime) / 1000); // segundos
            await onCorrect(answers, setCorrectionResult, timeSpent);
        } catch (e) {
            alert("Error correcting: " + e.message);
        } finally {
            setCorrecting(false);
        }
    };

    if (!data) return <div>No data</div>;

    // Calcular estadísticas LOMLOE
    const competenciasSet = new Set();
    const criteriosSet = new Set();

    data.sections?.forEach(section => {
        section.questions?.forEach(q => {
            if (q.competencias) q.competencias.forEach(c => competenciasSet.add(c));
            if (q.criterio_evaluacion) criteriosSet.add(q.criterio_evaluacion);
        });
    });

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in print:p-0">
            {/* Header */}
            <div className="text-center mb-8 border-b pb-6">
                <h1 className="text-3xl font-extrabold text-blue-700 mb-2">{data.title}</h1>
                <p className="text-gray-600">{data.intro}</p>

                {/* LOMLOE Metadata Pills */}
                {data.metadata_lomloe && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {data.metadata_lomloe.asignatura} - {data.metadata_lomloe.curso}
                        </div>
                        {competenciasSet.size > 0 && (
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                Competencias: {Array.from(competenciasSet).join(', ')}
                            </div>
                        )}
                        {criteriosSet.size > 0 && (
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                {criteriosSet.size} Criterio{criteriosSet.size > 1 ? 's' : ''} LOMLOE
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Theory Summary */}
            {data.theory_recap && (
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mb-8 shadow-sm print:shadow-none">
                    <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💡</span> Resumen Teórico
                    </h3>
                    <div className="prose prose-purple text-sm" dangerouslySetInnerHTML={{ __html: data.theory_recap }} />
                </div>
            )}

            {/* Sections & Questions */}
            <div className="space-y-10">
                {data.sections?.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6">
                        {section.title && <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">{section.title}</h2>}

                        <div className="space-y-6">
                            {section.questions?.map((q, qIdx) => {
                                const isCorrect = correctionResult?.corrections?.[q.id]?.correct;
                                const isWrong = correctionResult?.corrections?.[q.id]?.correct === false;

                                return (
                                    <div key={q.id || `${sIdx}-${qIdx}`} className={`bg-white p-6 rounded-xl border-2 transition-all ${isCorrect ? 'border-green-200 bg-green-50' : isWrong ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-blue-200 shadow-sm'}`}>
                                        {/* Question Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="font-medium text-lg text-gray-800 flex gap-3 flex-1">
                                                <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0">{q.id}</span>
                                                <div className="flex-1">
                                                    {/* Reading Text (for reading comprehension) */}
                                                    {q.reading_text && (
                                                        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-2xl">📖</span>
                                                                <h4 className="font-bold text-blue-900">Lee el siguiente texto:</h4>
                                                            </div>
                                                            <div className="text-gray-800 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: q.reading_text }} />
                                                        </div>
                                                    )}

                                                    <div dangerouslySetInnerHTML={{ __html: q.text }} />

                                                    {/* LOMLOE Metadata for Question */}
                                                    {(q.criterio_evaluacion || q.competencias || q.nivel_bloom) && (
                                                        <div className="mt-2 flex flex-wrap gap-1">
                                                            {q.criterio_evaluacion && (
                                                                <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200" title="Criterio de Evaluación LOMLOE">
                                                                    📋 {q.criterio_evaluacion}
                                                                </span>
                                                            )}
                                                            {q.competencias && q.competencias.length > 0 && (
                                                                <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200" title="Competencias Clave">
                                                                    🎯 {q.competencias.join(', ')}
                                                                </span>
                                                            )}
                                                            {q.nivel_bloom && (
                                                                <span className="text-[10px] px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200" title="Nivel Cognitivo (Bloom)">
                                                                    🧠 {q.nivel_bloom}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Correction Status Icon */}
                                            {isCorrect && <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />}
                                            {isWrong && <XCircle className="w-6 h-6 text-red-600 shrink-0" />}
                                        </div>

                                        {/* Inputs based on Type */}
                                        <div className="pl-11">
                                            {/* Multiple Choice & True/False */}
                                            {(q.type === 'multiple_choice' || q.type === 'true_false') && q.options && q.options.length > 0 && (
                                                <div className="space-y-3">
                                                    {q.options.map((opt, oIdx) => (
                                                        <label key={oIdx} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/50 border border-transparent hover:border-gray-200 transition-colors">
                                                            <input
                                                                type="radio"
                                                                name={`q-${q.id}`}
                                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                                                checked={answers[q.id] === opt}
                                                                onChange={() => handleAnswerChange(q.id, opt)}
                                                                disabled={!!correctionResult}
                                                            />
                                                            <span className="text-gray-700">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Short Answer, Fill Gaps, or any text-based type */}
                                            {(q.type === 'short_answer' || q.type === 'fill_gaps' ||
                                                (!q.options || q.options.length === 0)) && (
                                                    <textarea
                                                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 bg-white transition-all text-lg"
                                                        rows={3}
                                                        placeholder="Escribe tu respuesta aquí..."
                                                        value={answers[q.id] || ''}
                                                        onChange={e => handleAnswerChange(q.id, e.target.value)}
                                                        disabled={!!correctionResult}
                                                    />
                                                )}

                                            {/* Hint Button */}
                                            {q.hint && !correctionResult && (
                                                <button
                                                    onClick={() => toggleHint(q.id)}
                                                    className="mt-3 flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                                                >
                                                    <Lightbulb className="w-4 h-4" />
                                                    {revealedHints[q.id] ? 'Ocultar Pista' : 'Necesito una Pista'}
                                                </button>
                                            )}

                                            {/* Hint Display */}
                                            {revealedHints[q.id] && q.hint && !correctionResult && (
                                                <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
                                                    💡 <strong>Pista:</strong> {q.hint}
                                                </div>
                                            )}

                                            {/* Feedback (After Correction) */}
                                            {correctionResult && correctionResult.corrections[q.id] && (
                                                <div className={`mt-4 p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                                                    <p className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                                        {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                                                    </p>
                                                    <p className="text-sm text-gray-700">{correctionResult.corrections[q.id].feedback}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            {!correctionResult && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={correcting || Object.keys(answers).length === 0}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {correcting ? <Loader2 className="animate-spin w-6 h-6" /> : <Send className="w-6 h-6" />}
                        {correcting ? 'Corrigiendo...' : 'Corregir Ejercicio'}
                    </button>
                </div>
            )}

            {/* Results Summary */}
            {correctionResult && (
                <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">📊 Resultado Final</h3>
                        <div className="text-5xl font-extrabold text-blue-600 mb-2">
                            {correctionResult.score} / {correctionResult.total}
                        </div>
                        <p className="text-lg text-gray-600">{correctionResult.summary}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-1000"
                            style={{ width: `${(correctionResult.score / correctionResult.total) * 100}%` }}
                        />
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        {Math.round((correctionResult.score / correctionResult.total) * 100)}% de aciertos
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveWorksheet;
