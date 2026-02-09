import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Calendar, FileText, ChevronRight, Activity } from 'lucide-react';

const ResultsDashboard = ({ studentId }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, [studentId]);

    const fetchResults = async () => {
        try {
            const { data, error } = await supabase
                .from('nee_screenings')
                .select('*')
                .eq('student_id', studentId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setResults(data || []);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Cargando historial...</div>;

    if (results.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sin resultados aún</h3>
                <p className="text-gray-500">Completa un test para ver tu perfil aquí.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {results.map((result) => (
                <div key={result.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${result.type === 'CHAEA' ? 'bg-indigo-100 text-indigo-600' :
                        result.type === 'VARK' ? 'bg-blue-100 text-blue-600' :
                            result.type === 'MULTIPLE_INTELLIGENCES' ? 'bg-orange-100 text-orange-600' :
                                result.type === 'RAVEN' ? 'bg-purple-100 text-purple-600' :
                                    'bg-gray-100 text-gray-600'
                        }`}>
                        <Activity className="w-7 h-7" />
                    </div>

                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-lg text-gray-900">{getTestName(result.type)}</h4>
                            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                                {new Date(result.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                            {formatResultSummary(result)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const getTestName = (type) => {
    const names = {
        CHAEA: 'Estilos de Aprendizaje (CHAEA)',
        RAVEN: 'Matrices Progresivas (Raven)',
        VARK: 'Modelo VAK/VARK',
        MULTIPLE_INTELLIGENCES: 'Inteligencias Múltiples (Gardner/Armstrong)'
    };
    return names[type] || type;
};

const formatResultSummary = (result) => {
    if (result.type === 'CHAEA') {
        const scores = result.data.scores || {};
        const maxScore = Math.max(...Object.values(scores));
        const dominants = Object.keys(scores).filter(k => scores[k] === maxScore);
        return `Estilo Dominante: ${dominants.join(' y ')}`;
    }

    if (result.type === 'VARK') {
        const scores = result.data.scores || {};
        const maxScore = Math.max(...Object.values(scores));
        const dominants = Object.keys(scores).filter(k => scores[k] === maxScore);
        const mapStyle = { V: 'Visual', A: 'Auditivo', R: 'Lectura/Escritura', K: 'Kinestésico' };
        return `Preferencia: ${dominants.map(d => mapStyle[d]).join(' + ')}`;
    }

    if (result.type === 'MULTIPLE_INTELLIGENCES') {
        const scores = result.data.scores || {};
        // Find high level skills
        const highSkills = Object.entries(scores)
            .filter(([_, data]) => data.level === 'Alto' || data.level === 'Medio-Alto')
            .map(([cat]) => cat);

        if (highSkills.length > 0) return `Destacado en: ${highSkills.join(', ')}`;
        return 'Perfil equilibrado / En desarrollo';
    }

    if (result.type === 'RAVEN') {
        return `Puntuación: ${result.data.score}/${result.data.total} (${result.data.accuracy}%)`;
    }
    return 'Resultado guardado.';
};

export default ResultsDashboard;
