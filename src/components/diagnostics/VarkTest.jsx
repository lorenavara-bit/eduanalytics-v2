import React, { useState } from 'react';
import { VARK_QUESTIONS } from '../../data/vark_questions';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const VarkTest = ({ studentId, onComplete, onCancel }) => {
    // Stores which options are selected for each question. 
    // VARK allows multiple selections, so answers[qId] is an array of style codes ['V', 'A']
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [finalResults, setFinalResults] = useState(null);

    const STYLE_DESCRIPTIONS = {
        V: { title: 'Visual', desc: 'Tu cerebro procesa mejor la información a través de imágenes, gráficos, mapas mentales y colores. Necesitas "ver" para entender.', color: 'text-blue-600 bg-blue-50' },
        A: { title: 'Auditivo', desc: 'Aprendes mejor escuchando. Las explicaciones orales, debates y podcasts son tus mejores aliados. Te beneficia leer en voz alta.', color: 'text-yellow-600 bg-yellow-50' },
        R: { title: 'Lectura/Escritura', desc: 'Prefieres la información en forma de palabras. Leer libros, tomar apuntes detallados y hacer resúmenes es tu superpoder.', color: 'text-green-600 bg-green-50' },
        K: { title: 'Kinestésico', desc: 'Aprendes haciendo. Necesitas moverte, tocar y aplicar la teoría en la práctica. Los ejemplos reales son vitales para ti.', color: 'text-red-600 bg-red-50' }
    };

    const toggleOption = (qId, style) => {
        setAnswers(prev => {
            const currentSelected = prev[qId] || [];
            if (currentSelected.includes(style)) {
                return { ...prev, [qId]: currentSelected.filter(s => s !== style) };
            } else {
                return { ...prev, [qId]: [...currentSelected, style] };
            }
        });
    };

    const calculateResults = () => {
        const scores = {
            V: 0,
            A: 0,
            R: 0,
            K: 0
        };

        Object.values(answers).forEach(selectedStyles => {
            selectedStyles.forEach(style => {
                if (scores[style] !== undefined) {
                    scores[style] += 1;
                }
            });
        });

        return scores;
    };

    const handleSubmit = async () => {
        // Validate almost all answered (soft validation since user can leave blank per instructions)
        if (Object.keys(answers).length < VARK_QUESTIONS.length - 2) {
            if (!window.confirm(`Has contestado ${Object.keys(answers).length} de ${VARK_QUESTIONS.length} preguntas. ¿Seguro que quieres terminar?`)) {
                return;
            }
        }

        setSubmitting(true);
        const results = calculateResults();

        // Calculate Dominant Style
        const maxScore = Math.max(results.V, results.A, results.R, results.K);
        // Find all styles with maxScore (could be multimodal)
        const dominantStyles = Object.keys(results).filter(key => results[key] === maxScore);
        // Map codes to full names for saving (optional, but 'Visual' etc is better for UI)
        const styleNames = { V: 'Visual', A: 'Auditivo', R: 'Lectura/Escritura', K: 'Kinestésico' };
        const dominantLabel = dominantStyles.map(s => styleNames[s]).join(' + ');

        // Normalize scores for profile (0.0 - 1.0 approx, assuming max possible is 16 questions? No, multiselect makes it strictly count based. 
        // Let's just use raw scores relative to total marks or just raw. The profile expects 'vark_scores' json.
        // We will normalize by total answers to get a 'preference distribution' (0.0-1.0)
        const totalMarks = (results.V + results.A + results.R + results.K) || 1;
        const normalizedScores = {
            v: Number((results.V / totalMarks).toFixed(2)),
            a: Number((results.A / totalMarks).toFixed(2)),
            r: Number((results.R / totalMarks).toFixed(2)),
            k: Number((results.K / totalMarks).toFixed(2))
        };

        try {
            if (studentId !== 'guest') {
                // 1. Save historical record (Screening) - CRITICAL
                const { error: screeningError } = await supabase
                    .from('nee_screenings')
                    .insert({
                        student_id: studentId,
                        type: 'VARK',
                        source: 'STUDENT_TEST',
                        data: { answers, scores: results }, // Raw scores here
                        risk_level: 'LOW'
                    });

                if (screeningError) throw new Error("Error guardando el test: " + screeningError.message);

                // 2. Update Student Learning Profile (Current State) - SECONDARY / BEST EFFORT
                try {
                    const { error: profileError } = await supabase
                        .from('learning_profiles')
                        .upsert({
                            student_id: studentId,
                            vark_scores: normalizedScores, // Normalized 0-1
                            vark_dominant: dominantLabel,
                            last_updated: new Date().toISOString()
                        }, { onConflict: 'student_id' }); // Upsert by student_id

                    if (profileError) {
                        console.warn("Profile update failed (non-critical):", profileError);
                        // We do NOT throw here to allow the test to complete even if profile sync fails
                    }
                } catch (profErr) {
                    console.warn("Profile upsert logic error:", profErr);
                }
            }

            setFinalResults(results);
            setShowResults(true);
        } catch (error) {
            console.error('Error details:', error);
            alert(error.message || 'Error desconocido al guardar.');
        } finally {
            setSubmitting(false);
        }
    };

    if (showResults && finalResults) {
        const total = (finalResults.V + finalResults.A + finalResults.R + finalResults.K) || 1;
        const maxScore = Math.max(finalResults.V, finalResults.A, finalResults.R, finalResults.K);
        // Ordenamos los estilos por puntuación
        const sortedStyles = Object.entries(finalResults)
            .sort(([, a], [, b]) => b - a);

        const dominant = sortedStyles[0][0];

        return (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center">
                    <Check className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full p-3 backdrop-blur-sm" />
                    <h2 className="text-3xl font-black mb-2">¡Análisis Completado!</h2>
                    <p className="text-emerald-100 text-lg">Hemos descifrado tu código de aprendizaje.</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Tu estilo dominante es</span>
                        <h3 className={`text-4xl font-black mt-2 mb-4 ${STYLE_DESCRIPTIONS[dominant].color.split(' ')[0]}`}>
                            {STYLE_DESCRIPTIONS[dominant].title}
                        </h3>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            {STYLE_DESCRIPTIONS[dominant].desc}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {sortedStyles.map(([style, score]) => (
                            <div key={style} className={`p-4 rounded-xl border ${score === maxScore ? 'border-2 border-indigo-600 bg-indigo-50' : 'border-gray-100 bg-gray-50'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-gray-700">{STYLE_DESCRIPTIONS[style].title}</span>
                                    <span className="font-mono font-bold text-gray-500">{score} pts</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${score === maxScore ? 'bg-indigo-600' : 'bg-gray-400'}`}
                                        style={{ width: `${(score / total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => onComplete(finalResults)}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg text-lg"
                    >
                        Continuar al Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const progress = Math.round((Object.keys(answers).length / VARK_QUESTIONS.length) * 100);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sticky top-0 z-10 flex justify-between items-center shadow-md">
                <div>
                    <h2 className="text-2xl font-bold">Cuestionario VARK</h2>
                    <p className="text-blue-100 text-sm">¿Cómo aprendo mejor? - 16 Preguntas</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold">{progress}%</div>
                    <div className="text-xs opacity-75">Completado</div>
                </div>
            </div>

            <div className="p-6 bg-blue-50 border-b border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Instrucciones:</strong> Elija la respuesta que mejor explique su preferencia. Puede seleccionar <strong>más de una opción</strong> si una sola no se ajusta a su percepción. Deje en blanco si ninguna aplica.
                </p>
            </div>

            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                {VARK_QUESTIONS.map((q, index) => (
                    <div key={q.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="mb-4 flex gap-3">
                            <span className="font-bold text-indigo-200 text-xl font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                            <h3 className="text-lg font-medium text-gray-900">{q.text}</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 pl-8">
                            {q.options.map((opt) => {
                                const isSelected = (answers[q.id] || []).includes(opt.style);
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => toggleOption(q.id, opt.style)}
                                        className={`text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 group ${isSelected
                                            ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600 options-selected'
                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'
                                            }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-600'}`}>
                                            {opt.text}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center sticky bottom-0 z-10 backdrop-blur-md bg-opacity-95">
                <button
                    onClick={onCancel}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitting || Object.keys(answers).length === 0}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <Save className="w-5 h-5" />
                    {submitting ? 'Guardando...' : 'Guardar Resultados'}
                </button>
            </div>
        </div>
    );
};

export default VarkTest;
