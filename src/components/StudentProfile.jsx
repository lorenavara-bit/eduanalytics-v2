import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Camera, Save, Loader2, User, Calendar, BookOpen, Brain, MoreHorizontal, LogOut, Upload, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState({
        id: '',
        full_name: '',
        birthdate: '',
        education_level: '', // 'primaria', 'eso', 'bachillerato'
        grade_level: '',
        autonomous_community: '', // New: Comunidad Autónoma
        interests: '', // Changed to string for textarea
        favorite_subjects: '', // Changed to string for textarea
        least_favorite_subjects: '', // New field default
        learning_style: '', // New field default
        observations: '',
        avatar_url: null
    });
    const navigate = useNavigate();

    // Configuration Lists
    const educationLevels = [
        { id: 'primaria', label: 'Primaria' },
        { id: 'eso', label: 'ESO' },
        { id: 'bachillerato', label: 'Bachillerato' },
        { id: 'fp', label: 'Formación Profesional' }
    ];

    const gradesByLevel = {
        'primaria': ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
        'eso': ['1º ESO', '2º ESO', '3º ESO', '4º ESO'],
        'bachillerato': ['1º Bachillerato', '2º Bachillerato'],
        'fp': ['Grado Medio', 'Grado Superior']
    };

    const autonomousCommunities = [
        'Andalucía', 'Aragón', 'Asturias', 'Baleares', 'Canarias',
        'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña',
        'Comunidad Valenciana', 'Extremadura', 'Galicia', 'La Rioja',
        'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Ceuta', 'Melilla'
    ];

    const commonSubjects = ['Matemáticas', 'Lengua Castellana', 'Inglés', 'Física', 'Química', 'Biología', 'Historia', 'Geografía', 'Filosofía', 'Economía', 'Latín', 'Griego', 'Música', 'Tecnología'];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
                return;
            }

            // Always set the ID so we can Save (Upsert) even if profile doesn't exist yet
            setUserData(prev => ({ ...prev, id: user.id }));

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows" error

            if (data) {
                setUserData(prev => ({
                    ...prev,
                    full_name: data.full_name || '',
                    birthdate: data.birthdate || '',
                    education_level: data.grade_level ? guessLevel(data.grade_level) : '',
                    grade_level: data.grade_level || '',
                    autonomous_community: data.autonomous_community || '',
                    // Ensure these are strings for the TextAreas
                    interests: Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
                    favorite_subjects: Array.isArray(data.favorite_subjects) ? data.favorite_subjects.join(', ') : (data.favorite_subjects || ''),
                    least_favorite_subjects: Array.isArray(data.least_favorite_subjects) ? data.least_favorite_subjects.join(', ') : (data.least_favorite_subjects || ''),
                    observations: data.observations || '',
                    learning_style: data.learning_style || '',
                    avatar_url: data.avatar_url || null
                }));
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const guessLevel = (grade) => {
        if (!grade) return 'eso';
        if (grade.includes('Primaria')) return 'primaria';
        if (grade.includes('ESO')) return 'eso';
        if (grade.includes('Bachillerato')) return 'bachillerato';
        return 'eso'; // Default
    };

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${userData.id}/${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setUserData(prev => ({ ...prev, avatar_url: publicUrl }));

        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Using UPSERT to handle both Create and Update
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: userData.id, // Mandatory for Upsert
                    full_name: userData.full_name,
                    birthdate: userData.birthdate ? userData.birthdate : null, // Handle empty date string
                    grade_level: userData.grade_level,
                    autonomous_community: userData.autonomous_community,
                    interests: userData.interests,
                    favorite_subjects: userData.favorite_subjects,
                    least_favorite_subjects: userData.least_favorite_subjects,
                    observations: userData.observations,
                    learning_style: userData.learning_style,
                    avatar_url: userData.avatar_url,
                    updated_at: new Date()
                });

            if (error) throw error;
            // Maybe show a nice toast here
            alert('Perfil guardado correctamente');
        } catch (error) {
            alert('Error saving profile: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const calculateAge = (birthdate) => {
        if (!birthdate) return '-';
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const toggleList = (listName, item) => {
        setUserData(prev => {
            const list = prev[listName] || [];
            if (list.includes(item)) {
                return { ...prev, [listName]: list.filter(i => i !== item) };
            } else {
                return { ...prev, [listName]: [...list, item] };
            }
        });
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header / Title */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-gray-900">Perfil del Estudiante</h1>
                        <p className="text-gray-500 mt-1">Personaliza la información para adaptar la IA a tus necesidades.</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Top Section: Avatar & Basic Info */}
                    <div className="p-8 border-b border-white/10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                        {/* Animated background blobs */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">

                            {/* Avatar Uploader */}
                            <div className="flex-shrink-0 relative group mx-auto md:mx-0">
                                <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white">
                                    {userData.avatar_url ? (
                                        <img src={userData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{userData.full_name ? userData.full_name.charAt(0).toUpperCase() : <User size={48} className="text-white/80" />}</span>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 p-2.5 bg-white text-purple-600 rounded-full hover:bg-gray-100 cursor-pointer shadow-lg transition-transform hover:scale-110 active:scale-95">
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>

                            {/* Name & Age */}
                            <div className="flex-grow space-y-6 w-full">
                                <div>
                                    <label className="block text-sm font-bold text-blue-100 mb-2">Nombre Completo</label>
                                    <input
                                        type="text"
                                        value={userData.full_name}
                                        onChange={e => setUserData({ ...userData, full_name: e.target.value })}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-white placeholder-blue-200 backdrop-blur-sm"
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-blue-100 mb-2">Fecha de Nacimiento</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={userData.birthdate}
                                                onChange={e => setUserData({ ...userData, birthdate: e.target.value })}
                                                className="w-full p-3 pl-10 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 transition-all text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                            />
                                            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-blue-200 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-blue-100 mb-2">Edad</label>
                                        <div className="p-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium backdrop-blur-sm">
                                            {calculateAge(userData.birthdate)} años
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="p-8 space-y-8">

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nivel Educativo</label>
                                <select
                                    value={userData.education_level}
                                    onChange={e => {
                                        setUserData({
                                            ...userData,
                                            education_level: e.target.value,
                                            grade_level: '' // Reset grade when level changes
                                        });
                                    }}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    <option value="">Seleccionar nivel...</option>
                                    {educationLevels.map(lvl => (
                                        <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Curso / Grado</label>
                                <select
                                    value={userData.grade_level}
                                    onChange={e => setUserData({ ...userData, grade_level: e.target.value })}
                                    disabled={!userData.education_level}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-400"
                                >
                                    <option value="">{userData.education_level ? 'Seleccionar curso...' : 'Selecciona un nivel primero'}</option>
                                    {userData.education_level && gradesByLevel[userData.education_level].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Autonomous Community */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                🇪🇸 Comunidad Autónoma
                                <span className="text-xs font-normal text-gray-500">(para adaptar currículo)</span>
                            </label>
                            <select
                                value={userData.autonomous_community}
                                onChange={e => setUserData({ ...userData, autonomous_community: e.target.value })}
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option value="">Seleccionar comunidad...</option>
                                {autonomousCommunities.map(cc => (
                                    <option key={cc} value={cc}>{cc}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                💡 Importante para generar contenido adaptado al currículo autonómico
                            </p>
                        </div>

                        {/* Subjects */}
                        {/* Learning Style */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Brain className="text-purple-600 w-5 h-5" />
                                <h3 className="font-bold text-gray-900">Estilo de Aprendizaje</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { id: 'visual', label: 'Visual', icon: '👁️', desc: 'Aprende viendo imágenes y gráficos.' },
                                    { id: 'auditivo', label: 'Auditivo', icon: '👂', desc: 'Aprende escuchando explicaciones.' },
                                    { id: 'kinestesico', label: 'Kinestésico', icon: '✋', desc: 'Aprende tocando y haciendo.' },
                                    { id: 'lectura', label: 'Lectura/Escritura', icon: '📖', desc: 'Aprende leyendo y tomando notas.' }
                                ].map((style) => (
                                    <div
                                        key={style.id}
                                        onClick={() => setUserData({ ...userData, learning_style: style.id })}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${userData.learning_style === style.id
                                            ? 'border-purple-600 bg-purple-50'
                                            : 'border-gray-100 bg-white hover:border-purple-200'}`}
                                    >
                                        <div className="text-2xl mb-2">{style.icon}</div>
                                        <div className="font-bold text-gray-900">{style.label}</div>
                                        <div className="text-xs text-gray-500 leading-tight mt-1">{style.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subjects (Text Areas) */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="text-blue-600 w-4 h-4" />
                                    <label className="font-bold text-gray-900">Asignaturas Favoritas</label>
                                </div>
                                <textarea
                                    value={userData.favorite_subjects}
                                    onChange={e => setUserData({ ...userData, favorite_subjects: e.target.value })}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm min-h-[100px]"
                                    placeholder="Ej: Matemáticas, Educación Física..."
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="text-red-500 w-4 h-4" />
                                    <label className="font-bold text-gray-900">Asignaturas Menos Favoritas</label>
                                </div>
                                <textarea
                                    value={userData.least_favorite_subjects || ''} // Handle potential null
                                    onChange={e => setUserData({ ...userData, least_favorite_subjects: e.target.value })}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all text-sm min-h-[100px]"
                                    placeholder="Ej: Historia, Inglés..."
                                />
                            </div>
                        </div>

                        {/* Interests & Observations */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="text-yellow-500 w-4 h-4" />
                                    <label className="font-bold text-gray-900">Intereses y Hobbies</label>
                                </div>
                                <textarea
                                    value={userData.interests} // Now expecting a string
                                    onChange={e => setUserData({ ...userData, interests: e.target.value })}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all text-sm min-h-[100px]"
                                    placeholder="Ej: Fútbol, Videojuegos, Pintura, Dinosaurios..."
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="text-green-600 w-4 h-4" />
                                    <label className="font-bold text-gray-900">Observaciones Generales</label>
                                </div>
                                <textarea
                                    value={userData.observations || ''}
                                    onChange={e => setUserData({ ...userData, observations: e.target.value })}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 transition-all text-sm min-h-[100px]"
                                    placeholder="Ej: Se distrae fácilmente, necesita ejemplos visuales..."
                                />
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setUserData({ ...userData /* reset logic could go here */ })}
                            className="px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-200 rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Guardar Cambios
                        </button>
                    </div>

                </form>
            </div >
        </div >
    );
};

export default StudentProfile;
