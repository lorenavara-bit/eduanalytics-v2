import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { CheckCircle, XCircle, MessageSquare, Send, Loader2, Lightbulb, Award, Target, Brain, Compass, HelpCircle, Heart, ThumbsUp, RefreshCw, BookOpen, Clock } from 'lucide-react';
import WordOrderVip from './WordOrderVip';
import FragmentVip from './FragmentVip';
import ClassificationVip from './ClassificationVip';
import ConnectorVip from './ConnectorVip';
import ScannerVip from './ScannerVip';
import VoiceActiveVip from './VoiceActiveVip';

const InteractiveWorksheet = ({ data, onCorrect, studentId, worksheetId, enableTimer, hideHints }) => {
    const [answers, setAnswers] = useState({});
    const [correctionResult, setCorrectionResult] = useState(null);
    const [correcting, setCorrecting] = useState(false);
    const [revealedHints, setRevealedHints] = useState({});
    const [savedQuestions, setSavedQuestions] = useState({});
    const [retryingIds, setRetryingIds] = useState([]);

    const [startTime] = useState(Date.now());
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Timer Logic
    React.useEffect(() => {
        let interval;
        if (enableTimer && !correctionResult) {
            interval = setInterval(() => {
                setElapsedSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [enableTimer, correctionResult]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const saveQuestionToBank = async (question) => {
        try {
            const { error } = await supabase.from('question_bank_local').insert({
                source: 'AI_SAVED',
                topic: data.title || 'General',
                grade_level: data.metadata_lomloe?.curso || 'General',
                subject: data.metadata_lomloe?.asignatura || 'General',
                question_text: question.text,
                question_type: question.type || 'short_answer',
                options: question.options || [],
                correct_answer: question.correct_answer || '',
                difficulty: question.difficulty || 'media',
                image_url: question.imagen || null,
                metadata: {
                    ...question,
                    saved_at: new Date().toISOString(),
                    lomloe_criterios: question.criterio_evaluacion
                }
            });

            if (error) throw error;
            setSavedQuestions(prev => ({ ...prev, [question.id]: true }));
        } catch (e) {
            console.error("Error saving question:", e.message);
            alert("Error guardando pregunta: " + e.message);
        }
    };

    const handleRetryErrors = () => {
        if (!correctionResult) return;
        const wrongIds = Object.keys(correctionResult.corrections).filter(
            id => correctionResult.corrections[id].correct === false
        );
        if (wrongIds.length === 0) return;
        setRetryingIds(wrongIds);
        setAnswers(prev => {
            const next = { ...prev };
            wrongIds.forEach(id => delete next[id]);
            return next;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    const hasQuestions = data.sections?.some(s => s.questions && s.questions.length > 0);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in print:p-0 font-sans">
            {/* Santillana Workbook Style Header */}
            <div className="relative overflow-hidden bg-white rounded-3xl border-2 border-slate-100 shadow-xl mb-10">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                                Ficha de Refuerzo Santillana
                            </span>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                {data.title}
                            </h1>
                        </div>
                        <div className="hidden sm:block">
                            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-200">
                                4º
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-500 text-lg max-w-2xl border-l-2 border-slate-100 pl-4">{data.intro || 'Practica los contenidos clave para tu examen.'}</p>

                    <div className="mt-8 flex flex-wrap gap-4 items-center pt-6 border-t border-slate-50">
                        {enableTimer && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-mono font-bold shadow-md">
                                <Clock className="w-4 h-4 text-red-500" />
                                {formatTime(elapsedSeconds)}
                            </div>
                        )}

                        {data.metadata_lomloe && (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm">
                                    <BookOpen className="w-4 h-4" />
                                    {data.metadata_lomloe.asignatura}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-bold text-sm">
                                    <Target className="w-4 h-4" />
                                    Unidad 5 y 6
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Theory Summary - Premium Design */}
            {data.theory_recap && (
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-1 rounded-[2.5rem] shadow-2xl overflow-hidden">
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[2.4rem]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Puntos Clave</h3>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Lo que debes saber para empezar</p>
                            </div>
                        </div>
                        <div className="prose prose-blue max-w-none text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: data.theory_recap }} />
                    </div>
                </div>
            )}

            {/* Sections & Questions */}
            <div className="space-y-10">
                {data.sections?.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-6">
                        {section.title && <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">{section.title}</h2>}

                        {/* STUDY MODE: Content Blocks */}
                        {section.content_blocks && (
                            <div className="space-y-4 mb-8">
                                {section.content_blocks.map((block, bIdx) => (
                                    <div key={bIdx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                                        {block.type === 'text' && (
                                            <p className="text-gray-700 leading-relaxed text-lg">{block.content}</p>
                                        )}
                                        {block.type === 'list' && (
                                            <ul className="list-disc pl-5 space-y-2">
                                                {block.items?.map((item, i) => (
                                                    <li key={i} className="text-gray-700">{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {block.type === 'mermaid' && (
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-xs overflow-x-auto">
                                                <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold uppercase text-[10px]">
                                                    <Brain className="w-4 h-4" /> Estructura Mental (Diagrama)
                                                </div>
                                                <pre>{block.content}</pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-6">
                            {section.questions?.map((q, qIdx) => {
                                const isCorrect = correctionResult?.corrections?.[q.id]?.correct;
                                const isWrong = correctionResult?.corrections?.[q.id]?.correct === false;

                                return (
                                    <div key={q.id || `${sIdx}-${qIdx}`} className={`bg-white p-6 rounded-xl border-2 transition-all ${isCorrect ? 'border-green-200 bg-green-50' : isWrong ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-blue-200 shadow-sm'}`}>
                                        {/* Question Header */}
                                        <div className="font-medium text-lg text-gray-800 flex gap-3 flex-1">
                                            <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0 shadow-md">
                                                {qIdx + 1}
                                            </span>
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

                                                {/* Single Image (maps, charts, single photos) */}
                                                {q.imagen && (
                                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                                                        <img
                                                            src={q.imagen}
                                                            alt="Material educativo"
                                                            className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                                                        />
                                                    </div>
                                                )}

                                                {/* Multiple Images (comparison, image questions) */}
                                                {q.imagenes && Array.isArray(q.imagenes) && q.imagenes.length > 0 && (
                                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {q.imagenes.map((img, idx) => (
                                                                <div key={idx} className="text-center">
                                                                    <img
                                                                        src={img}
                                                                        alt={`Imagen ${idx + 1}`}
                                                                        className="w-full rounded-lg shadow-md mb-2"
                                                                    />
                                                                    <span className="text-sm font-semibold text-gray-600">Imagen {idx + 1}</span>
                                                                </div>
                                                            ))}
                                                        </div>
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

                                        {/* Action Buttons: Correction Status + Save to Bank */}
                                        <div className="flex flex-col items-center gap-2 shrink-0">
                                            {isCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                                            {isWrong && <XCircle className="w-6 h-6 text-red-600" />}

                                            {/* Save Button (Teacher-in-the-Loop) */}
                                            <button
                                                onClick={() => saveQuestionToBank(q)}
                                                className={`p-1.5 rounded-full transition-all ${savedQuestions[q.id] ? 'bg-yellow-100 text-yellow-600' : 'text-gray-300 hover:bg-gray-100 hover:text-blue-500'}`}
                                                title={savedQuestions[q.id] ? "Guardada en Banco de Preguntas" : "Guardar pregunta en mi Banco Local"}
                                                disabled={savedQuestions[q.id]}
                                            >
                                                <ThumbsUp className={`w-5 h-5 ${savedQuestions[q.id] ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                        {/* Inputs based on Type */ }
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
                                                        disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                                    />
                                                    <span className="text-gray-700">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {/* Text Input - Nivel DIFÍCIL */}
                                    {q.type === 'text_input' && (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                autofocus
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 bg-white transition-all text-lg font-semibold text-slate-800 shadow-sm"
                                                placeholder="Escribe tu respuesta aquí..."
                                                value={answers[q.id] || ''}
                                                onChange={e => handleAnswerChange(q.id, e.target.value)}
                                                disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            />
                                            {q.sample_answer && !correctionResult && (
                                                <p className="text-xs text-slate-400 font-medium italic pl-1">
                                                    💡 Ejemplo sugerido: "{q.sample_answer}"
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Word Order - Nivel VIP (Diamante) */}
                                    {q.type === 'word_order' && q.words && (
                                        <WordOrderVip
                                            questionId={q.id}
                                            words={q.words}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                // Guardamos la respuesta y adjuntamos metadatos de proceso para el evaluador
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Fill Blanks - Nivel MEDIO / VIP */}
                                    {q.type === 'fill_blanks' && q.word_bank && (
                                        <FragmentVip
                                            questionId={q.id}
                                            text={q.text}
                                            wordBank={q.word_bank}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Voice Active - VIP Oral Mode */}
                                    {q.type === 'voice' && (
                                        <VoiceActiveVip
                                            questionId={q.id}
                                            instruction={q.ejercicio}
                                            correctAnswer={q.correct_answer || q.respuesta}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Scanner - VIP Detective Highlighter */}
                                    {q.type === 'scanner' && q.text && (
                                        <ScannerVip
                                            questionId={q.id}
                                            text={q.text}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Connector - VIP Magnetic Bridges */}
                                    {q.type === 'connector' && q.pairs && (
                                        <ConnectorVip
                                            questionId={q.id}
                                            pairs={q.pairs}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Classification - VIP Magnetic Cubes */}
                                    {q.type === 'classification' && q.items && q.buckets && (
                                        <ClassificationVip
                                            questionId={q.id}
                                            items={q.items}
                                            buckets={q.buckets}
                                            initialValue={answers[q.id]}
                                            disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                            onAnswerChange={(id, val, metadata) => {
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [id]: val,
                                                    [`${id}_process`]: metadata
                                                }));
                                            }}
                                        />
                                    )}

                                    {/* Multi Input - Para listas de palabras (Santillana Style) */}
                                    {q.type === 'multi_input' && q.items && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {q.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <span className="font-bold text-gray-700">{item.prefix || ''}</span>
                                                    <input
                                                        type="text"
                                                        className="flex-1 p-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 bg-white text-sm"
                                                        placeholder={item.placeholder || '...'}
                                                        value={(answers[q.id] && answers[q.id][idx]) || ''}
                                                        onChange={e => {
                                                            const current = answers[q.id] || new Array(q.items.length).fill('');
                                                            const next = [...current];
                                                            next[idx] = e.target.value;
                                                            handleAnswerChange(q.id, next);
                                                        }}
                                                        disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                                    />
                                                    <span className="font-bold text-gray-700">{item.suffix || ''}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Short Answer, Fill Gaps, or any text-based type (fallback) */}
                                    {(q.type === 'short_answer' || q.type === 'fill_gaps' ||
                                        (!q.options || q.options.length === 0)) && q.type !== 'text_input' && q.type !== 'word_order' && q.type !== 'fill_blanks' && (
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 bg-white transition-all text-lg font-semibold text-slate-800 shadow-sm"
                                                    placeholder="Escribe tu respuesta aquí..."
                                                    value={answers[q.id] || ''}
                                                    onChange={e => handleAnswerChange(q.id, e.target.value)}
                                                    disabled={!!correctionResult && !retryingIds.includes(q.id)}
                                                />
                                            </div>
                                        )}

                                    {/* Hint Button (Conditionally Rendered) */}
                                    {q.hint && !correctionResult && !hideHints && (
                                        <button
                                            onClick={() => toggleHint(q.id)}
                                            className="mt-3 flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
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
                                    {correctionResult && correctionResult.corrections[q.id] && !retryingIds.includes(q.id) && (
                                        <div className={`mt-4 p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                                            <p className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                                {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                                            </p>

                                            {/* Intelligent Feedback Logic */}
                                            {/* [RESET] Forced Unified Feedback: Ignoramos mapas y tarjetas antiguas para empezar de cero */}
                                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-lg">💡</span>
                                                    <div>
                                                        <p className="text-xs font-bold text-blue-800 uppercase mb-1">Explicación</p>
                                                        <p className="text-sm text-blue-900 leading-relaxed font-medium">
                                                            {correctionResult.corrections[q.id].feedback}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
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

            {/* Submit Button */ }
    {
        hasQuestions && (!correctionResult || retryingIds.length > 0) && (
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
        )
    }

    {/* Results Summary */ }
    {
        correctionResult && retryingIds.length === 0 && (
            <div className="mt-8 space-y-6">

                {/* GAMIFICATION REWARD CARD */}
                {correctionResult.gamification && (
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-2xl border-2 border-yellow-300 shadow-md animate-in zoom-in-95 duration-500">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                            {/* XP EARNED */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-400 rounded-full text-white shadow-sm animate-bounce">
                                    <Award className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">¡Recompensa!</p>
                                    <div className="text-3xl font-black text-amber-800 flex items-center gap-2">
                                        +{correctionResult.gamification.xpEarned} <span className="text-sm text-amber-600">XP</span>
                                    </div>
                                </div>
                            </div>

                            {/* STREAK */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-xl">
                                <span className="text-2xl">🔥</span>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">Racha</p>
                                    <p className="text-xl font-black text-orange-600">{correctionResult.gamification.streak} días</p>
                                </div>
                            </div>

                            {/* LEVEL UP? */}
                            {correctionResult.gamification.leveledUp && (
                                <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg animate-pulse">
                                    <p className="text-xs font-bold opacity-80 uppercase text-center">¡Nuevo Nivel!</p>
                                    <p className="text-2xl font-black text-center">NIVEL {correctionResult.gamification.newLevel}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
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

                    <div className="text-center text-sm text-gray-600 mb-8">
                        {Math.round((correctionResult.score / correctionResult.total) * 100)}% de aciertos
                    </div>

                    {correctionResult.score < correctionResult.total && (
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={handleRetryErrors}
                                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-200 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" /> Reintentar Fallos
                            </button>
                        </div>
                    )}

                    {/* ⭐ NUEVO: SECCIÓN BRÚJULA PARA PADRES ⭐ */}
                    {correctionResult.perfilCognitivo && (
                        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-indigo-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Compass className="w-32 h-32 text-indigo-600" />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-600 rounded-xl text-white">
                                            <Compass className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-black text-gray-900 tracking-tight">La Brújula del Aprendizaje</h4>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-indigo-700 font-bold uppercase text-[10px] tracking-widest">
                                                <Brain className="w-3 h-3" /> Perfil de Procesamiento
                                            </div>
                                            <h5 className="text-lg font-bold text-gray-800">{correctionResult.perfilCognitivo.nombre}</h5>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {correctionResult.perfilCognitivo.descripcion}
                                            </p>
                                        </div>
                                        <div className="space-y-3 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-50">
                                            <div className="flex items-center gap-2 text-rose-600 font-bold uppercase text-[10px] tracking-widest">
                                                <Heart className="w-3 h-3" /> Para evitar la frustración
                                            </div>
                                            <p className="text-sm text-indigo-900 font-medium italic">
                                                "{correctionResult.perfilCognitivo.consejoPadres}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => alert(correctionResult.mensajePadres)}
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                                        >
                                            <MessageSquare className="w-3 h-3" /> Ver informe detallado para padres
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center text-gray-400 text-[10px] italic">
                                <HelpCircle className="w-3 h-3" />
                                Basado en patrones de error y niveles cognitivos detectados en esta sesión.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
        </div >
    );
};

export default InteractiveWorksheet;
