import React, { useState, useEffect } from 'react';
import { MI_QUESTIONS, calculateMIScore } from '../../data/mi_questions';
import { ArrowLeft, Save, Check, HelpCircle, X, Clock } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const MITest = ({ studentId, onComplete, onCancel }) => {
    const [answers, setAnswers] = useState({});
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [draftId, setDraftId] = useState(null);
    const [loadingDraft, setLoadingDraft] = useState(true);

    // Group questions by category for paginated view
    const categories = [...new Set(MI_QUESTIONS.map(q => q.category))];
    const categoryQuestions = MI_QUESTIONS.filter(q => q.category === categories[currentCategoryIndex]);

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
                .eq('type', 'MULTIPLE_INTELLIGENCES')
                .eq('risk_level', 'IN_PROGRESS')
                .maybeSingle();

            if (data && data.data?.answers) {
                setAnswers(data.data.answers);
                setDraftId(data.id);
                console.log('Borrador MI recuperado:', data.id);
            }
        } catch (err) {
            console.error('Error loading draft:', err);
        } finally {
            setLoadingDraft(false);
        }
    };

    const handleAnswer = (qId, value) => {
        setAnswers(prev => ({
            ...prev,
            [qId]: value
        }));
    };

    const calculateResults = () => {
        const scores = {};

        categories.forEach(cat => {
            const catQuestions = MI_QUESTIONS.filter(q => q.category === cat);
            let rawScore = 0;

            catQuestions.forEach(q => {
                // Yes = 1, Al = 0.5, No = 0
                const val = answers[q.id];
                if (val === 'SI') rawScore += 1;
                if (val === 'AL') rawScore += 0.5;
            });

            scores[cat] = {
                raw: rawScore,
                level: calculateMIScore(rawScore)
            };
        });

        return scores;
    };

    const handleNext = () => {
        if (currentCategoryIndex < categories.length - 1) {
            setCurrentCategoryIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        if (currentCategoryIndex > 0) {
            setCurrentCategoryIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
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
                type: 'MULTIPLE_INTELLIGENCES',
                source: 'TEACHER_OBSERVATION',
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
        // Validation: Ensure all questions in current category are answered (optional stricter validation)
        const currentQIds = categoryQuestions.map(q => q.id);
        const missing = currentQIds.some(id => answers[id] === undefined);

        if (missing && !window.confirm('Hay preguntas sin responder en esta sección. ¿Continuar igualmente?')) {
            return;
        }

        setSubmitting(true);
        const results = calculateResults();

        // Normalize scores for learning_profiles (0.0 - 1.0)
        const normalizedMI = {};
        Object.keys(results).forEach(cat => {
            let key = cat.toLowerCase();
            if (key.includes('ling')) key = 'linguistic';
            else if (key.includes('lóg')) key = 'logical';
            else if (key.includes('esp')) key = 'spatial';
            else if (key.includes('kin')) key = 'kinesthetic';
            else if (key.includes('mus')) key = 'musical';
            else if (key.includes('nat')) key = 'naturalistic';
            else if (key.includes('intra')) key = 'intrapersonal';
            else if (key.includes('inter')) key = 'interpersonal';

            normalizedMI[key] = Math.min(1, results[cat].raw / 10);
        });

        try {
            if (studentId !== 'guest') {
                const payload = {
                    student_id: studentId,
                    type: 'MULTIPLE_INTELLIGENCES',
                    source: 'TEACHER_OBSERVATION', // Since it's usually teacher/parent filled
                    data: { answers, scores: results },
                    risk_level: 'INFO'
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

                // 2. Update Profile State
                const { error: profileError } = await supabase
                    .from('learning_profiles')
                    .upsert({
                        student_id: studentId,
                        multiple_intelligences: normalizedMI,
                        last_updated: new Date().toISOString()
                    }, { onConflict: 'student_id' }); // Upsert

                if (profileError) console.warn("Profile sync error:", profileError);
            }

            onComplete(results);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error al guardar los resultados.');
        } finally {
            setSubmitting(false);
        }
    };

    const progress = Math.round((Object.keys(answers).length / MI_QUESTIONS.length) * 100);

    if (loadingDraft) return <div className="p-10 text-center">Cargando test...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white sticky top-0 z-10 flex justify-between items-center shadow-md">
                <div>
                    <h2 className="text-2xl font-bold">Inteligencias Múltiples</h2>
                    <p className="text-orange-100 text-sm">
                        {categories[currentCategoryIndex]} ({currentCategoryIndex + 1}/{categories.length})
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold">{progress}%</div>
                    <div className="text-xs opacity-75">Global</div>
                </div>
            </div>

            <div className="p-6 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
                <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Instrucciones:</strong> Observe al estudiante y marque la frecuencia de cada comportamiento.
                    <br />
                    <span className="inline-block mt-2 font-mono text-xs bg-white px-2 py-1 rounded border">SI = Habitual</span>
                    <span className="inline-block mt-2 ml-2 font-mono text-xs bg-white px-2 py-1 rounded border">NO = Rara vez</span>
                    <span className="inline-block mt-2 ml-2 font-mono text-xs bg-white px-2 py-1 rounded border">AL = Algunas veces</span>
                </p>
                {studentId !== 'guest' && (
                    <button
                        onClick={handleSaveProgress}
                        disabled={submitting}
                        className="text-xs flex items-center gap-2 bg-white text-orange-600 px-3 py-1.5 rounded-lg font-bold border border-orange-200 hover:bg-orange-50 transition-colors shadow-sm"
                    >
                        <Clock className="w-3 h-3" /> Guardar y Continuar Luego
                    </button>
                )}
            </div>

            <div className="p-8 space-y-6">
                {categoryQuestions.map((q, index) => (
                    <div key={q.id} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 transition-colors shadow-sm">
                        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
                            <h3 className="text-gray-900 font-medium text-lg w-full md:w-2/3">{q.text}</h3>

                            <div className="flex gap-2 shrink-0">
                                {[
                                    { val: 'SI', label: 'SI', icon: Check, color: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' },
                                    { val: 'NO', label: 'NO', icon: X, color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' },
                                    { val: 'AL', label: 'A veces', icon: HelpCircle, color: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200' }
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        onClick={() => handleAnswer(q.id, opt.val)}
                                        className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all flex items-center gap-2 ${answers[q.id] === opt.val
                                            ? 'ring-2 ring-offset-1 ring-orange-500 ' + opt.color.replace('hover:', '')
                                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                    >
                                        <opt.icon className="w-4 h-4" />
                                        <span className="hidden md:inline">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center sticky bottom-0 z-10 backdrop-blur-md bg-opacity-95">
                <div className="flex gap-3">
                    <button
                        onClick={currentCategoryIndex === 0 ? onCancel : handlePrev}
                        className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        {currentCategoryIndex === 0 ? 'Cancelar' : 'Anterior'}
                    </button>
                </div>

                <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-mono self-center mr-4">
                        {Object.keys(answers).length} / {MI_QUESTIONS.length} respondidas
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={submitting}
                        className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {currentCategoryIndex === categories.length - 1
                            ? (submitting ? 'Guardando...' : 'Finalizar Test')
                            : 'Siguiente Sección'
                        }
                        {!submitting && <ArrowLeft className="w-5 h-5 rotate-180" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MITest;
