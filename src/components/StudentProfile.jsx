import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
    Camera, Save, Loader2, User, BookOpen, Brain,
    MoreHorizontal, LogOut, Star, Sparkles, Plus, Trash2,
    Search, TrendingUp, Heart, ThumbsUp, ThumbsDown, MessageSquare,
    Settings, Layout, UserCircle, X, Key
} from 'lucide-react';
import EarlyDetectionPrimary from './EarlyDetectionPrimary';
import EarlyDetectionSecondary from './EarlyDetectionSecondary';
import EarlyDetectionGames from './EarlyDetectionGames';
import StudentInsightsDashboard from './StudentInsightsDashboard';
import RadarChart from './RadarChart';
import OnboardingWizard from './OnboardingWizard';

const StudentProfile = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [screeningView, setScreeningView] = useState(null);
    const fileInputRef = useRef(null);
    const [apiKeys, setApiKeys] = useState({
        GEMINI_API_KEY: localStorage.getItem('GEMINI_API_KEY') || '',
        SAMBANOVA_API_KEY: localStorage.getItem('SAMBANOVA_API_KEY') || '',
        OPENROUTER_API_KEY: localStorage.getItem('OPENROUTER_API_KEY') || ''
    });

    const [learningProfile, setLearningProfile] = useState({
        vark_scores: { v: 0.25, a: 0.25, r: 0.25, k: 0.25 },
        multiple_intelligences: {
            linguistic: 0.5, logical: 0.5, spatial: 0.5, kinesthetic: 0.5,
            musical: 0.5, interpersonal: 0.5, intrapersonal: 0.5, naturalistic: 0.5
        },
        cognitive_traits: {
            attention: 'normal',
            processing_speed: 'normal',
            persistence: 'normal'
        },
        confidence_score: 0.5
    });

    // Alias to maintain compatibility with existing code using userData
    const userData = selectedStudent;
    const setUserData = setSelectedStudent;

    const navigate = useNavigate();

    const isSoft = selectedStudent?.education_level === 'primaria' || !selectedStudent;
    const isRobust = selectedStudent?.education_level === 'eso' || selectedStudent?.education_level === 'bachillerato';

    const theme = {
        card: isSoft
            ? 'rounded-[50px] shadow-2xl shadow-indigo-100/50 border-none bg-white overflow-hidden'
            : 'rounded-[40px] border border-slate-200 shadow-xl overflow-hidden bg-white',
        accent: 'bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900',
        bg: isSoft ? 'bg-indigo-50/20' : 'bg-slate-50',
        input: isSoft
            ? 'rounded-3xl bg-white border border-indigo-100/50 shadow-sm focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-sm'
            : 'rounded-2xl bg-white border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all font-bold text-sm'
    };

    const educationLevels = [
        { id: 'primaria', label: 'Primaria' },
        { id: 'eso', label: 'ESO' },
        { id: 'bachillerato', label: 'Bachillerato' }
    ];

    const gradesByLevel = {
        'primaria': ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
        'eso': ['1º ESO', '2º ESO', '3º ESO', '4º ESO'],
        'bachillerato': ['1º Bachillerato', '2º Bachillerato']
    };

    const learningStyles = [
        { id: 'visual', label: 'Canal Visual', desc: 'Retención mediante imágenes y esquemas', icon: '👁️' },
        { id: 'auditivo', label: 'Canal Auditivo', desc: 'Procesamiento por escucha activa', icon: '👂' },
        { id: 'kinestesico', label: 'Lógica Vivencial', desc: 'Aprendizaje por acción y experiencia', icon: '✋' },
        { id: 'lectura', label: 'Análisis Lector', desc: 'Comprensión profunda por texto', icon: '📖' }
    ];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { navigate('/'); return; }

            const { data: studentsData, error } = await supabase.from('students').select('*').eq('parent_id', user.id);
            if (error) throw error;

            if (studentsData && studentsData.length > 0) {
                setStudents(studentsData);
                const firstStudent = studentsData[0];
                if (!selectedStudent) {
                    setSelectedStudent(firstStudent);
                    fetchLearningProfile(firstStudent.id);
                }
            } else {
                setStudents([]);
                setSelectedStudent(null);
                // No configuramos modo manual, dejamos que el Wizard salte en el render
                // setIsEditing(true); 
            }
        } catch (error) {
            console.error('Error in fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLearningProfile = async (studentId) => {
        try {
            const { data, error } = await supabase
                .from('learning_profiles')
                .select('*')
                .eq('student_id', studentId)
                .maybeSingle();

            if (data) {
                setLearningProfile({
                    ...learningProfile,
                    ...data
                });
            }
        } catch (err) {
            console.error("Error fetching learning profile:", err);
        }
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setSaving(true);
            const reader = new FileReader();
            reader.onload = (uploadEvent) => {
                setSelectedStudent({ ...selectedStudent, avatar_url: uploadEvent.target.result });
                setSaving(false);
            };
            reader.readAsDataURL(file);

            // Si quieres guardar permanentemente en Supabase, necesitaríamos un bucket
            // Por ahora lo guardamos como Base64 para que funcione inmediato
        } catch (err) {
            console.error(err);
            setSaving(false);
        }
    };

    const guessLevel = (grade) => {
        if (!grade) return 'primaria';
        if (grade.includes('Primaria')) return 'primaria';
        if (grade.includes('ESO')) return 'eso';
        if (grade.includes('Bachillerato')) return 'bachillerato';
        return 'primaria';
    };

    const handleDelete = async (studentId, studentName) => {
        if (!window.confirm(`¿Seguro que quieres borrar el perfil de ${studentName}? Esta acción no se puede deshacer.`)) return;

        try {
            setSaving(true);
            console.log('🗑️ Intentando borrar estudiante:', studentId);
            const { error } = await supabase.from('students').delete().eq('id', studentId);

            if (error) {
                console.error('❌ Error de Supabase al borrar:', error);
                throw error;
            }

            console.log('✅ Estudiante borrado con éxito');
            alert('Perfil borrado correctamente.');
            fetchProfile();
        } catch (error) {
            console.error('❌ Fallo en handleDelete:', error);
            alert('Error al borrar: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No hay sesión de usuario");

            // 1. Guardar Estudiante
            const { data: savedStudent, error: studentError } = await supabase
                .from('students')
                .upsert({
                    ...selectedStudent,
                    parent_id: user.id
                })
                .select()
                .single();

            if (studentError) throw studentError;

            // 2. Guardar Perfil de Aprendizaje Profundo
            const { error: profileError } = await supabase
                .from('learning_profiles')
                .upsert({
                    student_id: savedStudent.id,
                    vark_scores: learningProfile.vark_scores,
                    vark_dominant: selectedStudent.learning_style,
                    multiple_intelligences: learningProfile.multiple_intelligences,
                    cognitive_traits: learningProfile.cognitive_traits,
                    confidence_score: learningProfile.confidence_score,
                    last_updated: new Date().toISOString()
                }, { onConflict: 'student_id' });

            if (profileError) {
                console.warn("Error saving learning profile (did you run expand_learning_profile.sql?):", profileError);
            }

            // 3. Guardar Keys
            localStorage.setItem('GEMINI_API_KEY', apiKeys.GEMINI_API_KEY);
            localStorage.setItem('SAMBANOVA_API_KEY', apiKeys.SAMBANOVA_API_KEY);
            localStorage.setItem('OPENROUTER_API_KEY', apiKeys.OPENROUTER_API_KEY);

            alert('¡Configuración completa de ' + (savedStudent.full_name || 'tu hijo') + ' guardada! 🧠');
            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            alert(error.message);
        } finally { setSaving(false); }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
    );

    return (
        <div className={`min-h-screen ${theme.bg} pb-20 font-sans`}>
            {/* Header Hero (ResourceHub Style) */}
            <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white py-20 px-6 overflow-hidden relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="mb-8 md:mb-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Panel de Control</span>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-4">NeuroPerfil</h1>
                        <p className="text-xl text-blue-100/80 max-w-xl font-medium leading-relaxed">
                            Administra los perfiles de tus hijos y configura su experiencia de aprendizaje personalizada.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {isEditing ? (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                            >
                                Volver a la lista
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setSelectedStudent({
                                        full_name: '',
                                        education_level: 'primaria',
                                        grade_level: '',
                                        editorial_math: 'Santillana',
                                        editorial_language: 'Santillana',
                                        editorial_science: 'Santillana',
                                        editorial_english: 'Go Far',
                                        challenge_level: 'standard',
                                        interests: '',
                                        learning_style: 'visual',
                                        avatar_url: null
                                    });
                                    setIsEditing(true);
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                            >
                                <Plus className="w-4 h-4" /> Añadir Hijo
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {console.log('👥 RENDER ESTUDIANTES:', students)}
            <div className="max-w-6xl mx-auto px-4 -mt-6">
                {students.length === 0 && !loading ? (
                    <OnboardingWizard onComplete={(meta) => {
                        // Al terminar, recargamos el perfil para que encuentre al nuevo estudiante creado
                        fetchProfile();

                        // Default params
                        let params = new URLSearchParams();
                        params.set('tab', 'library');
                        params.set('new_user', 'true');

                        if (meta) {
                            if (meta.topic) params.set('topic', meta.topic);
                            if (meta.block) params.set('block', meta.block);
                        }

                        window.location.href = `/hub?${params.toString()}`;
                    }} />
                ) : !isEditing ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {students.map(child => (
                            <div key={child.id} className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-center group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <User className="w-20 h-20" />
                                </div>
                                <div className="w-24 h-24 rounded-[35px] bg-indigo-50 flex items-center justify-center mb-6 overflow-hidden">
                                    {child.avatar_url ? (
                                        <img src={child.avatar_url} alt={child.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserCircle className="w-12 h-12 text-indigo-400" />
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-1">{child.full_name}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-6">
                                    {child.grade_level}
                                </p>
                                <div className="w-full grid grid-cols-2 gap-3 mb-8">
                                    <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                        <p className="text-[8px] font-black text-slate-400 uppercase">Editorial</p>
                                        <p className="text-xs font-bold text-slate-700">{child.editorial_math}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-2xl text-center">
                                        <p className="text-[8px] font-black text-slate-400 uppercase">Nivel</p>
                                        <p className="text-xs font-bold text-slate-700 capitalize">{child.challenge_level}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-3">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedStudent(child);
                                                setIsEditing(true);
                                            }}
                                            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <TrendingUp className="w-4 h-4" /> Dashboard
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(child.id, child.full_name);
                                            }}
                                            className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all"
                                            title="Borrar Perfil"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => navigate('/tutor')}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        <MessageSquare className="w-4 h-4" /> 🤖 Tutor IA
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-10">
                        {/* 1. SECCIÓN PRINCIPAL: IDENTIDAD */}
                        <div className={`bg-white ${theme.card} relative overflow-hidden`}>
                            <div className="p-8 md:p-12">
                                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                                    <div className="lg:col-span-12 flex flex-col md:flex-row items-start gap-10">
                                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                            <div className="w-36 h-36 rounded-[50px] overflow-hidden shadow-2xl border-4 border-white bg-gray-50 flex items-center justify-center">
                                                {selectedStudent?.avatar_url ? (
                                                    <img src={selectedStudent.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserCircle className="w-20 h-20 text-indigo-200" />
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-black/20 rounded-[50px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Camera className="text-white w-8 h-8" />
                                            </div>
                                            <p className="text-center text-[8px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Cambiar Foto</p>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                            />
                                        </div>

                                        <div className="flex-1 space-y-6 w-full">
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    placeholder="Nombre de tu hijo/a"
                                                    value={selectedStudent?.full_name || ''}
                                                    onChange={e => setSelectedStudent({ ...selectedStudent, full_name: e.target.value })}
                                                    className="w-full bg-transparent border-none text-4xl font-black text-gray-900 focus:ring-0 placeholder-gray-200 p-0"
                                                />
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <select
                                                        value={selectedStudent.education_level}
                                                        onChange={e => setSelectedStudent({ ...selectedStudent, education_level: e.target.value })}
                                                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl text-xs font-black uppercase tracking-widest border-none cursor-pointer"
                                                    >
                                                        {educationLevels.map(lvl => <option key={lvl.id} value={lvl.id}>{lvl.label}</option>)}
                                                    </select>
                                                    <select
                                                        value={selectedStudent.grade_level}
                                                        onChange={e => setSelectedStudent({ ...selectedStudent, grade_level: e.target.value })}
                                                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl text-xs font-black uppercase tracking-widest border-none cursor-pointer"
                                                    >
                                                        <option value="">Seleccionar curso</option>
                                                        {gradesByLevel[selectedStudent.education_level]?.map(g => <option key={g} value={g}>{g}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Nuevo: Lo que más le gusta y lo que más le cuesta */}
                                            <div className="grid md:grid-cols-2 gap-4 pt-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                                        <ThumbsUp className="w-4 h-4" /> Lo que más le gusta
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedStudent?.favorite_subjects || ''}
                                                        onChange={e => setSelectedStudent({ ...selectedStudent, favorite_subjects: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-2xl bg-emerald-50 border-2 border-emerald-100 text-sm font-bold text-emerald-900 placeholder:text-emerald-300 focus:border-emerald-500 focus:ring-0 transition-all"
                                                        placeholder="Ej: Educación Física, Arte..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                                                        <ThumbsDown className="w-4 h-4" /> Lo que más le cuesta
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedStudent?.least_favorite_subjects || ''}
                                                        onChange={e => setSelectedStudent({ ...selectedStudent, least_favorite_subjects: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-2xl bg-amber-50 border-2 border-amber-100 text-sm font-bold text-amber-900 placeholder:text-amber-300 focus:border-amber-500 focus:ring-0 transition-all"
                                                        placeholder="Ej: Matemáticas, Lengua..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* 2. DASHBOARD INTEGRADO */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <StudentInsightsDashboard studentId={selectedStudent?.id} onNavigate={setScreeningView} />
                        </div>

                        {/* Botones de acción finales */}
                        <div className="flex justify-end gap-4 pt-10">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-5 rounded-2xl bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                                Volver a la lista
                            </button>
                            <button type="submit" disabled={saving} className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-blue-500/30">
                                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-5 h-5" />}
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                )
                }
            </div >


            {/* MODALS PERSISTENTES */}
            {
                screeningView && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/80 backdrop-blur-xl flex items-start justify-center p-4 py-10">
                        <div className="w-full max-w-[95vw] relative">
                            <div className="relative">
                                <button
                                    onClick={() => setScreeningView(null)}
                                    className="absolute -top-12 right-0 md:-right-12 text-white p-3 hover:bg-white/20 rounded-full transition-all bg-white/10 backdrop-blur-md shadow-lg"
                                    title="Volver al perfil"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="bg-transparent">
                                    {screeningView === 'QUESTIONNAIRE' ? (
                                        userData.education_level === 'primaria' ? (
                                            <EarlyDetectionPrimary studentId={userData.id} onComplete={(a) => a === 'GAMES' ? setScreeningView('GAMES') : setScreeningView(null)} />
                                        ) : (
                                            <EarlyDetectionSecondary studentId={userData.id} onComplete={() => setScreeningView(null)} />
                                        )
                                    ) : screeningView === 'GAMES' ? (
                                        <EarlyDetectionGames studentId={userData.id} onBack={() => setScreeningView('QUESTIONNAIRE')} />
                                    ) : (
                                        <StudentInsightsDashboard studentId={userData.id} onNavigate={setScreeningView} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default StudentProfile;
