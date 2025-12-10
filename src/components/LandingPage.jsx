import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Sparkles, Brain, TrendingUp, Users, Upload, CheckCircle, Star } from 'lucide-react';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(false); // Default to Register for Landing Page
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            if (isLogin) {
                // LOGIN
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Login always returns a session if successful
                navigate('/profile');
            } else {
                // REGISTER
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                // Check if session exists (Auto Confirm might be off)
                if (data.session) {
                    navigate('/profile');
                } else {
                    // Email confirmation required
                    setSuccessMsg('¡Consulta tu correo! Te hemos enviado un enlace de confirmación para activar tu cuenta.');
                    setIsLogin(true); // Switch to login mode
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Análisis de Aprendizaje",
            description: "Detecta si tu hijo aprende mejor de forma visual o práctica, y adapta el contenido automáticamente.",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Progreso Continuo",
            description: "Guarda un histórico detallado. Identifica fortalezas y alerta sobre áreas que necesitan refuerzo antes del examen.",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Acompañamiento Real",
            description: "No solo genera fichas. Es un tutor que conoce el historial escolar completo y crece con el estudiante.",
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-100"
        }
    ];

    const steps = [
        {
            icon: <Upload className="w-8 h-8" />,
            title: "Sube Materiales Escolares",
            description: "PDF, Word, imágenes - cualquier material de clase",
            color: "from-blue-500 to-blue-600",
            step: "1"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "IA Analiza el Contenido",
            description: "Comprende automáticamente temas y nivel de dificultad clave",
            color: "from-purple-500 to-purple-600",
            step: "2"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Genera Exámenes Personalizados",
            description: "Ejercicios adaptados al nivel e intereses de tu hijo",
            color: "from-pink-500 to-pink-600",
            step: "3"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Seguimiento de Progreso",
            description: "Visualiza el crecimiento en cada asignatura",
            color: "from-green-500 to-green-600",
            step: "4"
        }
    ];

    const benefits = [
        "Genera ejercicios ilimitados en segundos",
        "Personalizado según el nivel de tu hijo",
        "Ahorra €100+ al mes vs tutores privados",
        "Disponible 24/7 desde cualquier dispositivo",
        "Seguimiento multi-año de progreso"
    ];

    const testimonials = [
        {
            text: "Mi hija tiene altas capacidades y se aburría con los ejercicios estándar. Ahora puedo generar problemas de matemáticas sobre dinosaurios y está motivadísima.",
            author: "María González",
            role: "Madre de Alexia, 10 años",
            rating: 5
        },
        {
            text: "Como padre sin formación pedagógica finalmente tengo una herramienta que me ayuda a apoyar a mi hija efectivamente. Los exámenes generados son de calidad profesional.",
            author: "Carlos Fernández",
            role: "Padre de Lucía, 8 años",
            rating: 5
        },
        {
            text: "Gestiono el aprendizaje de mis dos hijas desde una sola plataforma. El seguimiento multi-año es invaluable para ver su evolución.",
            author: "Ana Martín",
            role: "Madre de 2 hijas",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section with Auth */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
                {/* Animated background blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Hero content */}
                        <div className="text-white">
                            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                                Ayuda a tu hijo a <span className="text-cyan-300">alcanzar su potencial</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                                Genera ejercicios personalizados, exámenes y material de estudio adaptado a los intereses y nivel de tu hijo. Todo con inteligencia artificial.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {["✓ Sin compromiso", "✓ Cancela cuando quieras", "✓ Soporte en español"].map((item, i) => (
                                    <span key={i} className="text-sm font-medium text-blue-100">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right side - Auth Card */}
                        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">

                            {/* Auth Tabs */}
                            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                <button
                                    onClick={() => { setIsLogin(false); setError(null); }}
                                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Registrarse
                                </button>
                                <button
                                    onClick={() => { setIsLogin(true); setError(null); }}
                                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Iniciar Sesión
                                </button>
                            </div>

                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 shadow-lg">
                                    <Sparkles className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta gratis'}
                                </h2>
                                <p className="mt-2 text-sm text-gray-600 font-medium">
                                    {isLogin ? 'Accede a tu panel de aprendizaje' : 'Únete a cientos de familias que mejoran sus notas'}
                                </p>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-4">
                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            className="appearance-none rounded-xl relative block w-full px-4 py-3.5 pl-12 border-2 border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            className="appearance-none rounded-xl relative block w-full px-4 py-3.5 pl-12 pr-12 border-2 border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {isLogin && (
                                    <div className="flex items-center justify-end">
                                        <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fade-in-up">
                                        <div className="flex items-center gap-2 text-red-700 font-medium">
                                            <span className="text-lg">⚠️</span>
                                            <p className="text-sm">{error}</p>
                                        </div>
                                    </div>
                                )}

                                {successMsg && (
                                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-fade-in-up">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-100 p-1 rounded-full"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                                            <div>
                                                <h4 className="text-sm font-bold text-green-800">¡Cuenta creada!</h4>
                                                <p className="text-sm text-green-700 mt-1">{successMsg}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5" />
                                            <span>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta Gratis'}</span>
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
                            Un aprendizaje que evoluciona contigo
                        </h2>
                        <p className="text-xl text-gray-600">
                            Cuanto más lo usas, mejor te conoce.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                                    <div className="text-white">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
                            ¿Cómo Funciona?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Tan simple que lo usarás todos los días
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative">
                                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-300 h-full">
                                    <div className="relative mb-4">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
                            ¿Por Qué Elegir EduAnalytics?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
                            Lo Que Dicen los Padres
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
                        Empieza Hoy Mismo
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Únete a cientos de familias que están ayudando a sus hijos a alcanzar su potencial
                    </p>
                    <button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            document.getElementById('email').focus();
                        }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
                    >
                        Comenzar Gratis
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="mt-6 text-sm text-blue-100">
                        ✓ Sin compromiso • ✓ Cancela cuando quieras • ✓ Soporte en español
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-lg">EduAnalytics</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                Educación personalizada con IA para cada niño
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Producto</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Capacidades</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Casos de Uso</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Recursos</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Guías</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>© 2025 EduAnalytics. Hecho con ❤️ en Galicia, España • GDPR Compliant • Datos Protegidos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
