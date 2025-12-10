import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Loader2, Wand2, Book, Settings, Trash2, Plus, Save, Check, Printer, Download, AlertCircle, Sparkles } from 'lucide-react';
import { generateWorksheet } from '../utils/gemini';
import InteractiveWorksheet from './InteractiveWorksheet';
import AuthPage from './AuthPage';

const WorksheetGenerator = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [addingSubject, setAddingSubject] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [textbook, setTextbook] = useState('');

    const [topic, setTopic] = useState('');
    const [observations, setObservations] = useState('');
    const [generating, setGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [saving, setSaving] = useState(false);

    const [activityType, setActivityType] = useState('Ficha de Repaso');
    const [difficulty, setDifficulty] = useState('Medio');
    const [numQuestions, setNumQuestions] = useState(10);
    const [questionTypes, setQuestionTypes] = useState(['Test', 'Respuesta Corta']);

    const hasFetched = useRef(false);

    const ACTIVITY_TYPES = ['Ficha de Repaso', 'Examen', 'Resumen Teórico', 'Esquema'];
    const DIFFICULTIES = ['Fácil', 'Medio', 'Difícil'];
    const QUESTION_OPTIONS = [
        { id: 'Test', label: 'Tipo Test' },
        { id: 'Respuesta Corta', label: 'Preguntas Cortas' },
        { id: 'Verdadero/Falso', label: 'Verdadero/Falso' },
        { id: 'Rellenar Huecos', label: 'Rellenar Huecos' },
        { id: 'Comprensión Lectora', label: '📖 Comprensión Lectora' },
        { id: 'Relacionar', label: 'Relacionar/Unir' },
        { id: 'Mapas', label: 'Mapas / Geografía' },
        { id: 'Diagramas', label: 'Diagramas' },
        { id: 'Problemas', label: 'Problemas Matemáticos' },
        { id: 'Casos Reales', label: 'Casos Reales' },
        { id: 'Definiciones', label: 'Definiciones' }
    ];

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (selectedSubject) {
            setTextbook(selectedSubject.textbook_info || '');
        }
    }, [selectedSubject]);

    const guessLevel = (grade) => {
        if (!grade) return 'eso';
        const g = grade.toLowerCase();
        if (g.includes('primaria')) return 'primaria';
        if (g.includes('eso')) return 'eso';
        if (g.includes('bachillerato')) return 'bachillerato';
        return 'eso';
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: { user: currentUser } } = await supabase.auth.getUser();

            if (!currentUser) {
                console.warn("No user found.");
                return;
            }
            setUser(currentUser);

            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
            setProfile(profileData);

            const { data: subjectsData, error: subjectsError } = await supabase.from('user_subjects').select('*').eq('user_id', currentUser.id).order('name');

            if (subjectsError) {
                setSubjects([]);
            } else if (subjectsData && subjectsData.length > 0) {
                setSubjects(subjectsData);
                setSelectedSubject(subjectsData[0]);
            } else {
                const level = guessLevel(profileData?.grade_level);
                await initializeSubjects(currentUser.id, level);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const initializeSubjects = async (userId, level) => {
        let defaults = [];
        const normLevel = (level || '').toLowerCase();
        if (normLevel.includes('primaria')) defaults = ['Matemáticas', 'Lengua Castellana', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés'];
        else if (normLevel.includes('eso')) defaults = ['Matemáticas', 'Geografía e Historia', 'Lengua Castellana', 'Biología y Geología', 'Física y Química', 'Inglés', 'Tecnología'];
        else defaults = ['Matemáticas', 'Historia', 'Lengua Castellana', 'Inglés', 'Filosofía', 'Física', 'Química'];

        const toInsert = defaults.map(name => ({ user_id: userId, name, education_level: level, is_custom: false }));
        try {
            const { data, error } = await supabase.from('user_subjects').insert(toInsert).select();
            if (error) throw error;
            if (data && data.length > 0) {
                setSubjects(data);
                setSelectedSubject(data[0]);
            }
        } catch (e) { console.error("Init Error", e); }
    };

    const handleAddSubject = async () => {
        if (!user) return alert("Debes iniciar sesión primero.");
        if (!newSubjectName.trim()) return;
        try {
            const { data, error } = await supabase.from('user_subjects').insert({
                user_id: user.id, name: newSubjectName.trim(), education_level: guessLevel(profile?.grade_level), is_custom: true
            }).select().single();
            if (error) throw error;
            setSubjects(prev => [...prev, data]);
            setSelectedSubject(data); setNewSubjectName(''); setAddingSubject(false);
        } catch (error) { alert("Error al añadir asignatura: " + error.message); }
    };

    const handleDeleteSubject = async (e, subjectId) => {
        e.stopPropagation();
        if (!confirm("¿Borrar esta asignatura?")) return;
        try {
            const { error } = await supabase.from('user_subjects').delete().eq('id', subjectId);
            if (error) throw error;
            setSubjects(prev => prev.filter(s => s.id !== subjectId));
            if (selectedSubject?.id === subjectId) setSelectedSubject(null);
        } catch (err) {
            alert("Error al borrar: " + err.message);
        }
    };

    const handleUpdateTextbook = async () => {
        if (!user) return alert("Debes iniciar sesión.");
        if (!selectedSubject) return alert("Selecciona una asignatura primero.");
        try {
            const { error } = await supabase.from('user_subjects').update({ textbook_info: textbook }).eq('id', selectedSubject.id);
            if (error) throw error;
            const updated = { ...selectedSubject, textbook_info: textbook };
            setSubjects(prev => prev.map(s => s.id === selectedSubject.id ? updated : s));
            setSelectedSubject(updated);
            alert("Libro guardado correctamente ✅");
        } catch (e) { alert("Error guardando libro: " + e.message); }
    };

    const handleGenerate = async () => {
        if (!user) return alert("Inicia sesión.");
        if (!topic || !selectedSubject) return alert("Completa el tema y selecciona asignatura.");

        setGenerating(true);
        setGeneratedContent(null);

        try {
            console.log(`🚀 Generando ficha: ${topic}`);

            const rawOutput = await generateWorksheet({
                profile: profile || { grade_level: 'General' },
                subject: { ...selectedSubject, textbook_info: textbook },
                topic,
                activityType,
                files: [], // No files anymore!
                config: { difficulty, questionTypes, numQuestions },
                observations // Pass observations to AI
            });

            let parsedContent = rawOutput;
            if (typeof rawOutput === 'string') {
                try {
                    const jsonStr = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
                    parsedContent = JSON.parse(jsonStr);
                } catch (e) {
                    console.warn("Parse warning", e);
                }
            }
            setGeneratedContent(parsedContent);
        } catch (error) {
            console.error(error);
            alert("Error generando ficha: " + error.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleSaveWorksheet = async () => {
        if (!user) return alert("Inicia sesión.");
        if (!generatedContent || !selectedSubject) return;
        setSaving(true);
        try {
            const { error } = await supabase.from('worksheets').insert({
                student_id: user.id,
                subject_id: selectedSubject.id,
                topic: topic,
                title: generatedContent.title || topic,
                difficulty_level: difficulty.toLowerCase(),
                content: generatedContent,
                config: { activityType, textbook, questionTypes, numQuestions, observations }
            });
            if (error) throw error;
            alert("¡Ficha guardada en tu biblioteca! 📚");
        } catch (error) { alert("Error al guardar: " + error.message); } finally { setSaving(false); }
    };

    const handleLocalCorrection = async (userAnswers, setCorrectionResult, timeSpent) => {
        let score = 0; let total = 0; const corrections = {};
        generatedContent.sections?.forEach(sec => {
            sec.questions?.forEach(q => {
                total++;
                const userAns = (userAnswers[q.id] || '').toString().trim().toLowerCase();
                const correctAns = (q.correct_answer || '').toString().trim().toLowerCase();
                let isCorrect = userAns === correctAns;
                if (q.type !== 'multiple_choice' && q.type !== 'true_false' && correctAns.length > 2) {
                    isCorrect = correctAns.includes(userAns) || userAns.includes(correctAns);
                }
                if (isCorrect) score++;
                corrections[q.id] = { correct: isCorrect, feedback: q.feedback || `Respuesta: ${q.correct_answer}` };
            });
        });
        await new Promise(r => setTimeout(r, 800));
        const percentage = (score / total) * 100;
        const summaryMessage =
            percentage === 100 ? "¡Perfecto! 🎉 ¡Lo has clavado!" :
                percentage >= 80 ? "¡Excelente trabajo! 🌟" :
                    percentage >= 60 ? "¡Buen esfuerzo! 👍 Sigue practicando" :
                        "No te rindas 💪 Repasa e inténtalo de nuevo";

        setCorrectionResult({ score, total, corrections, summary: summaryMessage });
    };

    const toggleQuestionType = (typeId) => { setQuestionTypes(prev => prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]); };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600 w-8 h-8" /></div>;

    if (!user) return <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center"><AlertCircle className="w-12 h-12 text-red-500 mb-4" /><h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Requerido</h2><AuthPage /></div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2 flex items-center justify-center gap-3">
                        <Sparkles className="w-10 h-10 text-purple-500" />
                        Generador Mágico de Fichas
                    </h1>
                    {profile && <p className="text-gray-600 text-lg">¡Hola, {profile.full_name || 'Estudiante'}! Vamos a estudiar 📚</p>}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* LEFT: Subject Selector */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
                                <h2 className="font-bold text-white flex items-center gap-2"><Book className="w-5 h-5" /> Asignatura</h2>
                                <button onClick={() => setAddingSubject(true)} className="p-1.5 rounded-full hover:bg-white/20 text-white"><Plus className="w-5 h-5" /></button>
                            </div>
                            {addingSubject && (
                                <div className="p-3 bg-purple-50 flex gap-2">
                                    <input autoFocus type="text" value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} className="flex-1 p-2 text-sm border rounded-lg" placeholder="Nombre..." onKeyDown={e => e.key === 'Enter' && handleAddSubject()} />
                                    <button onClick={handleAddSubject} className="p-2 bg-purple-600 text-white rounded"><Check className="w-4 h-4" /></button>
                                </div>
                            )}
                            <div className="p-2 max-h-[300px] overflow-y-auto">
                                {subjects.map(sub => (
                                    <div key={sub.id} className={`group flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all ${selectedSubject?.id === sub.id ? 'bg-blue-50 border-blue-200 border-2' : 'hover:bg-gray-50 border-2 border-transparent'}`}>
                                        <div onClick={() => setSelectedSubject(sub)} className="flex-1 flex justify-between items-center">
                                            <span className={`font-medium ${selectedSubject?.id === sub.id ? 'text-blue-700' : 'text-gray-700'}`}>{sub.name}</span>
                                            {selectedSubject?.id === sub.id && <Check className="w-5 h-5 text-blue-500 mr-2" />}
                                        </div>
                                        <button onClick={(e) => handleDeleteSubject(e, sub.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {subjects.length === 0 && <div className="p-4 text-center text-gray-500 text-sm">No hay asignaturas</div>}
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                IA con Currículo LOMLOE
                            </h3>
                            <p className="text-sm leading-relaxed text-white/90">
                                Esta app usa el <strong>currículo oficial de España</strong> 🇪🇸 para generar fichas de máxima calidad pedagógica adaptadas al nivel de tu hijo.
                            </p>
                            <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs">
                                💡 <strong>Tip:</strong> Mientras más específico seas en "Observaciones", mejor será la ficha generada.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Generator */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-6 text-xl"><Settings className="text-purple-600 w-6 h-6" /> Configuración de la Ficha</h2>

                            <div className="space-y-6">
                                {/* Textbook */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📚 Libro de Texto (Opcional)</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={textbook} onChange={e => setTextbook(e.target.value)} className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Ej: Santillana 4º Primaria Ciencias Naturales" />
                                        <button onClick={handleUpdateTextbook} disabled={!selectedSubject || textbook === (selectedSubject.textbook_info || '')} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                            <Save className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Indica el libro que usas en clase para mejor precisión</p>
                                </div>

                                {/* Observations */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📝 Observaciones / Instrucciones (Opcional)</label>
                                    <textarea
                                        value={observations}
                                        onChange={e => setObservations(e.target.value)}
                                        className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[100px]"
                                        placeholder="Ej: Tema 2, páginas 24-30. Enfocarse en los 5 sentidos y sus órganos. Incluir ejemplos prácticos y experimentos sencillos."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">💡 Especifica tema, páginas, conceptos clave, o enfoque especial</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Activity Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tipo</label>
                                        <select value={activityType} onChange={e => setActivityType(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500">
                                            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    {/* Difficulty */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dificultad</label>
                                        <div className="flex bg-gray-100 p-1 rounded-lg">
                                            {DIFFICULTIES.map(d => (
                                                <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${difficulty === d ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                                    {d}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Num Questions */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nº Preguntas ({numQuestions})</label>
                                        <input type="range" min="5" max="15" step="1" value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                                    </div>
                                </div>

                                {/* Question Types */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tipos de Pregunta</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {QUESTION_OPTIONS.slice(0, 6).map(opt => (
                                            <div key={opt.id} onClick={() => toggleQuestionType(opt.id)} className={`cursor-pointer text-xs p-2.5 rounded-lg border-2 transition-all text-center ${questionTypes.includes(opt.id) ? 'bg-blue-50 border-blue-400 text-blue-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Topic */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📖 Tema a Trabajar <span className="text-red-500">*</span></label>
                                    <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-medium" placeholder="Ej: Los sentidos y sus órganos" />
                                </div>

                                <button onClick={handleGenerate} disabled={generating || !topic || !selectedSubject} className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Wand2 className={`w-6 h-6 ${generating ? 'animate-spin' : 'animate-pulse'}`} />
                                    {generating ? 'Creando con IA...' : '✨ Generar Ficha Mágica'}
                                </button>
                            </div>
                        </div>

                        {/* RESULT */}
                        {generatedContent && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
                                <InteractiveWorksheet data={generatedContent} onCorrect={handleLocalCorrection} />
                                <div className="mt-8 flex gap-4 border-t border-gray-200 pt-6">
                                    <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-all">
                                        <Printer className="w-5 h-5" /> Imprimir
                                    </button>
                                    <button onClick={handleSaveWorksheet} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 ml-auto font-medium transition-all disabled:opacity-50">
                                        {saving ? <Loader2 className='animate-spin w-5 h-5' /> : <Save className="w-5 h-5" />}
                                        {saving ? 'Guardando...' : '💾 Guardar en Biblioteca'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorksheetGenerator;
