import React, { useState, useEffect } from 'react';
import { CHAEA_QUESTIONS } from '../../data/chaea_questions';
import { ArrowLeft, Save, Check, Clock } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const ChaeaTest = ({ studentId, onComplete, onCancel }) => {
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [draftId, setDraftId] = useState(null);
    const [loadingDraft, setLoadingDraft] = useState(true);

    useEffect(() => {
        if (studentId && studentId !== 'guest') {
            checkDraft();
        } else {
            setLoadingDraft(false);
        }
    }, [studentId]);

    const checkDraft = async () => {
        try {
            const { data, error } = await supabase
                .from('nee_screenings')
                .select('*')
                .eq('student_id', studentId)
                .eq('type', 'CHAEA')
                .eq('risk_level', 'IN_PROGRESS')
                .maybeSingle();

            if (data && data.data?.answers) {
                setAnswers(data.data.answers);
                setDraftId(data.id);
                console.log('Borrador recuperado:', data.id);
            }
        } catch (err) {
            console.error('Error loading draft:', err);
        } finally {
            setLoadingDraft(false);
        }
    };

    const handleAnswer = (id, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const calculateResults = () => {
        const scores = {
            Activo: 0,
            Reflexivo: 0,
            Teórico: 0,
            Pragmático: 0
        };

        CHAEA_QUESTIONS.forEach(q => {
            if (answers[q.id] === '+') {
                scores[q.style] += 1;
            }
        });

        return scores;
    };

    const handleSaveProgress = async () => {
        if (studentId === 'guest') {
            alert('Los invitados no pueden guardar progreso.');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                student_id: studentId,
                type: 'CHAEA',
                source: 'STUDENT_TEST',
                data: { answers, progress: Object.keys(answers).length },
                risk_level: 'IN_PROGRESS'
            };

            let error;
            if (draftId) {
                const { error: updateError } = await supabase
                    .from('nee_screenings')
                    .update(payload)
                    .eq('id', draftId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('nee_screenings')
                    .insert(payload);
                error = insertError;
            }

            if (error) throw error;
            alert('Progreso guardado correctamente. Puedes continuar más tarde.');
            onCancel();
        } catch (err) {
            console.error('Error saving progress:', err);
            alert('Error al guardar el progreso.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        // Validate all answered
        if (Object.keys(answers).length < CHAEA_QUESTIONS.length) {
            alert(`Por favor conteste a todas las preguntas (${Object.keys(answers).length}/${CHAEA_QUESTIONS.length})`);
            return;
        }

        setSubmitting(true);
        const results = calculateResults();

        try {
            if (studentId !== 'guest') {
                const payload = {
                    student_id: studentId,
                    type: 'CHAEA',
                    source: 'STUDENT_TEST',
                    data: { answers, scores: results },
                    risk_level: 'INFO' // CHAEA is informational, not really risk
                };

                let error;
                if (draftId) {
                    const { error: updateError } = await supabase
                        .from('nee_screenings')
                        .update(payload)
                        .eq('id', draftId);
                    error = updateError;
                } else {
                    const { error: insertError } = await supabase
                        .from('nee_screenings')
                        .insert(payload);
                    error = insertError;
                }

                if (error) throw error;

                // Sync to learning_profiles
                const { error: profileError } = await supabase
                    .from('learning_profiles')
                    .upsert({
                        student_id: studentId,
                        chaea_results: { ...results, dominant: Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b) },
                        last_updated: new Date().toISOString()
                    }, { onConflict: 'student_id' });

                if (profileError) console.warn('Profile sync error:', profileError);
            }

            onComplete(results);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error al guardar los resultados.');
        } finally {
            setSubmitting(false);
        }
    };

    const progress = Math.round((Object.keys(answers).length / CHAEA_QUESTIONS.length) * 100);

    if (loadingDraft) return <div className="p-10 text-center">Cargando progreso...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-6 text-white sticky top-0 z-10 flex justify-between items-center shadow-md">
                <div>
                    <h2 className="text-2xl font-bold">Cuestionario CHAEA</h2>
                    <p className="text-blue-100 text-sm">Estilos de Aprendizaje - 80 Preguntas</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold">{progress}%</div>
                    <div className="text-xs opacity-75">Completado</div>
                </div>
            </div>

            <div className="p-6 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                <p className="text-sm text-gray-700">
                    <strong>Instrucciones:</strong> Si está más de acuerdo que en desacuerdo seleccione
                    <span className="font-bold text-green-600 mx-1">(+)</span>.
                    Si está más en desacuerdo, seleccione
                    <span className="font-bold text-red-500 mx-1">(-)</span>.
                </p>
                {studentId !== 'guest' && (
                    <button
                        onClick={handleSaveProgress}
                        disabled={submitting}
                        className="text-xs flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-lg font-bold border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        <Clock className="w-3 h-3" /> Guardar y Continuar Luego
                    </button>
                )}
            </div>

            <div className="p-8 space-y-2 max-h-[60vh] overflow-y-auto">
                {CHAEA_QUESTIONS.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg flex items-start gap-4 transition-colors ${answers[q.id] ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                        <span className="font-mono text-gray-400 mt-1 w-6">{q.id}.</span>
                        <p className="flex-grow text-gray-800 leading-relaxed pt-1">{q.text}</p>
                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={() => handleAnswer(q.id, '+')}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${answers[q.id] === '+'
                                    ? 'bg-green-600 border-green-600 text-white shadow-lg scale-110'
                                    : 'border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-600'
                                    }`}
                            >
                                +
                            </button>
                            <button
                                onClick={() => handleAnswer(q.id, '-')}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${answers[q.id] === '-'
                                    ? 'bg-red-500 border-red-500 text-white shadow-lg scale-110'
                                    : 'border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500'
                                    }`}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button
                    onClick={onCancel}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Cancelar
                </button>
                <div className="text-sm text-gray-500">
                    {80 - Object.keys(answers).length} preguntas restantes
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < 80 || submitting}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-5 h-5" />
                    {submitting ? 'Guardando...' : 'Finalizar y Guardar'}
                </button>
            </div>
        </div>
    );
};

export default ChaeaTest;
