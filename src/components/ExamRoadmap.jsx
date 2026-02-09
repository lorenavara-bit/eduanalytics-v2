import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { generateExamRoadmap } from '../utils/gemini';
import {
    Calendar, BookOpen, Sparkles, CheckCircle, Clock,
    Plus, Trash2, Brain, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';

const ExamRoadmap = ({ preSelectedStudent }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // New Exam Form State
    const [newExam, setNewExam] = useState({
        subject: '',
        topic: '',
        examDate: ''
    });

    useEffect(() => {
        if (preSelectedStudent) {
            setStudents([preSelectedStudent]);
            setSelectedStudent(preSelectedStudent);
            // Ensure loading is set to false after fetching
            fetchRoadmaps(preSelectedStudent.id).finally(() => setLoading(false));
        } else {
            fetchStudents();
        }
    }, [preSelectedStudent]);

    const fetchStudents = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('parent_id', user.id);

            if (error) throw error;
            setStudents(data || []);
            if (data?.length > 0 && !preSelectedStudent) {
                setSelectedStudent(data[0]);
                fetchRoadmaps(data[0].id);
            }
        } catch (err) {
            console.error("Error fetching students:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoadmaps = async (studentId) => {
        try {
            const { data, error } = await supabase
                .from('resource_library') // Unified Table
                .select('*')
                .eq('student_id', studentId)
                .eq('resource_type', 'ROADMAP')
                .order('created_at', { ascending: true }); // Using created_at or we need to extract date from json

            if (error) throw error;

            // Map result to match expected UI structure if needed, or adjust UI
            // Here we basically treat 'content' as the 'study_plan' + metadata
            setRoadmaps(data || []);
        } catch (err) {
            console.error("Error fetching roadmaps:", err);
        }
    };

    const handleCreateRoadmap = async (e) => {
        e.preventDefault();
        if (!selectedStudent || !newExam.subject || !newExam.topic || !newExam.examDate) return;

        setGenerating(true);
        try {
            const { data: learningProfile } = await supabase
                .from('learning_profiles')
                .select('*')
                .eq('student_id', selectedStudent.id)
                .maybeSingle();

            const roadmapPlan = await generateExamRoadmap({
                profile: selectedStudent,
                learningProfile,
                subject: newExam.subject,
                topic: newExam.topic,
                examDate: newExam.examDate
            });

            // Save to Unified Library
            const { error: dbError } = await supabase
                .from('resource_library')
                .insert({
                    student_id: selectedStudent.id,
                    title: `Plan de Examen: ${newExam.topic}`, // Human readable title
                    description: `Ruta de estudio para ${newExam.subject}. Examen: ${newExam.examDate}`,
                    resource_type: 'ROADMAP',
                    topic: newExam.topic,
                    subject: newExam.subject,
                    content: {
                        ...roadmapPlan,
                        exam_date: newExam.examDate,
                        subject: newExam.subject,
                        topic: newExam.topic
                    }, // Store full plan + meta in content
                    is_public: false,
                    user_engagement_score: 1
                });

            if (dbError) throw dbError;

            setNewExam({ subject: '', topic: '', examDate: '' });
            setShowAddForm(false);
            fetchRoadmaps(selectedStudent.id);
        } catch (err) {
            console.error("Error creating roadmap:", err);
            alert("No se pudo generar el plan. " + err.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este plan de estudio?")) return;
        try {
            const { error } = await supabase.from('resource_library').delete().eq('id', id);
            if (error) throw error;
            setRoadmaps(roadmaps.filter(r => r.id !== id));
        } catch (err) {
            console.error("Error deleting roadmap:", err);
        }
    };

    const toggleStepStatus = async (roadmapId, stepIndex) => {
        const roadmap = roadmaps.find(r => r.id === roadmapId);
        if (!roadmap) return;

        // Deep copy of content
        const updatedContent = JSON.parse(JSON.stringify(roadmap.content));

        // Toggle status
        updatedContent.steps[stepIndex].status =
            updatedContent.steps[stepIndex].status === 'completed' ? 'pending' : 'completed';

        try {
            const { error } = await supabase
                .from('resource_library') // Unified Table
                .update({ content: updatedContent })
                .eq('id', roadmapId);

            if (error) throw error;
            fetchRoadmaps(selectedStudent.id);
        } catch (err) {
            console.error("Error updating step:", err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className={`max-w-7xl mx-auto ${preSelectedStudent ? 'py-4' : 'px-4 py-12 bg-slate-50 min-h-screen'} font-sans`}>
            {/* Header Section (Only show if standalone) */}
            {!preSelectedStudent && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Calendar className="w-10 h-10 text-indigo-600" />
                            Rutas de Examen
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Planificación inteligente basada en neuroeducación.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={selectedStudent?.id || ''}
                            onChange={(e) => {
                                const student = students.find(s => s.id === e.target.value);
                                setSelectedStudent(student);
                                fetchRoadmaps(student.id);
                            }}
                            className="bg-white border-2 border-slate-200 rounded-2xl px-6 py-3 font-bold text-slate-700 shadow-sm focus:border-indigo-500 outline-none transition-all"
                        >
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.full_name}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Añadir Examen
                        </button>
                    </div>
                </div>
            )}

            {/* Embedded Header Actions */}
            {preSelectedStudent && (
                <div className="flex justify-end mb-8">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-purple-200 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Planificar Nuevo Examen
                    </button>
                </div>
            )}

            {/* Formulario Añadir Examen */}
            {showAddForm && (
                <div className="mb-12 bg-white rounded-[40px] p-10 shadow-2xl border-4 border-slate-900 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                        <Sparkles className="text-indigo-500" />
                        Configurar Nuevo Roadmap
                    </h2>
                    <form onSubmit={handleCreateRoadmap} className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Asignatura</label>
                            <input
                                type="text"
                                value={newExam.subject}
                                onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                                placeholder="Ej: Matemáticas"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold focus:border-indigo-500 outline-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Tema / Contenido</label>
                            <input
                                type="text"
                                value={newExam.topic}
                                onChange={(e) => setNewExam({ ...newExam, topic: e.target.value })}
                                placeholder="Ej: Las Fracciones"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold focus:border-indigo-500 outline-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Fecha del Examen</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={newExam.examDate}
                                    onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold focus:border-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-3 flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-8 py-4 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={generating}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50"
                            >
                                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                                Generar Plan con IA
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Listado de Roadmaps */}
            <div className="grid lg:grid-cols-2 gap-10">
                {roadmaps.length === 0 ? (
                    <div className="lg:col-span-2 py-20 bg-white rounded-[50px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">No tienes rutas de estudio activas</h3>
                        <p className="text-slate-500 mt-2 max-w-xs">Añade tu próximo examen para que la IA diseñe el mejor camino hacia el éxito.</p>
                    </div>
                ) : (
                    roadmaps.map(rm => (
                        <div key={rm.id} className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 group">
                            {/* Roadmap Header */}
                            <div className="p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(rm.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="px-3 py-1 bg-indigo-500 rounded-lg text-[10px] font-black uppercase tracking-widest italic">
                                        {rm.subject}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(rm.content?.exam_date || rm.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                    {rm.topic}
                                </h3>
                                <p className="text-sm text-indigo-100/70 italic font-medium">
                                    "{rm.content?.summary}"
                                </p>

                                {/* Progress Bar (Gamification) */}
                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-1 text-xs font-black uppercase tracking-widest text-indigo-200">
                                        <span>Nivel de Preparación</span>
                                        <span className={Math.round((rm.content?.steps?.filter(s => s.status === 'completed').length / (rm.content?.steps?.length || 1)) * 100) > 75 ? 'text-emerald-400' : 'text-white'}>
                                            {Math.round((rm.content?.steps?.filter(s => s.status === 'completed').length / (rm.content?.steps?.length || 1)) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-800/50 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-1000 ${Math.round((rm.content?.steps?.filter(s => s.status === 'completed').length / (rm.content?.steps?.length || 1)) * 100) > 75
                                                ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                                                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                }`}
                                            style={{ width: `${Math.round((rm.content?.steps?.filter(s => s.status === 'completed').length / (rm.content?.steps?.length || 1)) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Roadmap Steps */}
                            <div className="p-8 space-y-6 flex-grow">
                                {rm.content?.steps?.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group/step">
                                        <div className="flex flex-col items-center shrink-0">
                                            <button
                                                onClick={() => toggleStepStatus(rm.id, idx)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step.status === 'completed'
                                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200'
                                                    : 'bg-white border-slate-200 text-slate-200 hover:border-indigo-400 hover:text-indigo-400'
                                                    }`}
                                            >
                                                {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                                            </button>
                                            {idx !== rm.content?.steps?.length - 1 && (
                                                <div className="w-0.5 h-full bg-slate-100 my-1"></div>
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className={`font-black text-sm uppercase tracking-wide ${step.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                                    {step.title}
                                                </h4>
                                                <span className="text-[10px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full font-bold">
                                                    {new Date(step.suggested_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                            <p className={`text-xs ${step.status === 'completed' ? 'text-slate-300' : 'text-slate-500'} leading-relaxed`}>
                                                {step.description}
                                            </p>
                                            {step.vark_activity && (
                                                <div className="mt-2 flex items-center gap-2 text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 shadow-sm">
                                                    <Brain className="w-3 h-3" />
                                                    RECOMENDADO: {step.vark_activity}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cognitive Tip */}
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                                        <AlertCircle className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tip de Carga Cognitiva</h5>
                                        <p className="text-xs text-slate-700 font-bold italic leading-relaxed">
                                            "{rm.content?.cognitive_load_tip}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExamRoadmap;
