import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../supabaseClient';
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    AlertCircle,
    Trash2,
    Save,
    Download,
    Eye,
    ChevronDown,
    ChevronUp,
    Library
} from 'lucide-react';


const AdminIngestPanel = () => {
    const [csvData, setCsvData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [showPreview, setShowPreview] = useState(false);
    const [availableCriteria, setAvailableCriteria] = useState([]);

    // Cargar criterios disponibles para referencia
    useEffect(() => {
        const fetchCriteria = async () => {
            const { data } = await supabase
                .from('criterios_evaluacion')
                .select('id, descripcion')
                .eq('asignatura', 'Inglés')
                .eq('curso', '4º Primaria');
            if (data) setAvailableCriteria(data);
        };
        fetchCriteria();
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setLoading(true);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Validación básica de JSON en el CSV
                const validatedData = results.data.map(row => {
                    let metadata = {};
                    try {
                        if (row.metadata_json) metadata = JSON.parse(row.metadata_json);
                    } catch (e) {
                        console.warn('Error parsing metadata_json for row:', row);
                    }
                    return { ...row, metadata };
                });

                setCsvData(validatedData);
                setLoading(false);
                setStatus({ type: 'success', message: `${results.data.length} filas leídas correctamente.` });
                setShowPreview(true);
            },
            error: (err) => {
                setLoading(false);
                setStatus({ type: 'error', message: `Error al procesar CSV: ${err.message}` });
            }
        });
    };

    const saveToSupabase = async () => {
        if (csvData.length === 0) return;

        setLoading(true);
        setStatus({ type: 'info', message: 'Guardando en base de datos...' });

        try {
            const formattedData = csvData.map(row => ({
                topic: row.topic || 'Sin tema',
                grade_level: row.grade_level || '4º Primaria',
                subject: row.subject || 'Inglés',
                question_type: row.question_type || 'short_answer',
                question_text: row.question_text || '',
                correct_answer: row.correct_answer || '',
                difficulty: row.difficulty || 'media',
                source: row.source || 'SANTILLANA_INGEST',
                options: row.options ? row.options.split('|').map(s => s.trim()) : [],
                metadata: row.metadata || {}
            }));

            const { error } = await supabase
                .from('question_bank_local')
                .insert(formattedData);

            if (error) throw error;

            setStatus({ type: 'success', message: `¡Éxito! ${formattedData.length} ejercicios de Santillana integrados.` });
            setCsvData([]);
            setFileName('');
            setShowPreview(false);
        } catch (err) {
            console.error('Error saving data:', err);
            setStatus({ type: 'error', message: `Error al guardar: ${err.message}` });
        } finally {
            setLoading(false);
        }
    };

    const downloadTemplate = () => {
        const template = [
            {
                topic: "Unit 3: Jobs",
                grade_level: "4º Primaria",
                subject: "Inglés",
                question_type: "voice",
                question_text: "Dime qué hace un 'Firefighter'",
                correct_answer: "Puts out fires",
                options: "",
                difficulty: "media",
                source: "SANTILLANA",
                metadata_json: '{"rule_id": "RULES_ENG_G4_U3_JOBS_VERBS", "explicacionDiamante": "Los bomberos (Firefighters) apagan fuegos (put out fires)."}'
            },
            {
                topic: "Unit 3: Jobs",
                grade_level: "4º Primaria",
                subject: "Inglés",
                question_type: "classification",
                question_text: "Clasifica estos trabajos",
                correct_answer: '{"Firefighter": "Emergency", "Teacher": "Education", "Doctor": "Emergency"}',
                options: "Firefighter | Teacher | Doctor",
                difficulty: "media",
                source: "SANTILLANA",
                metadata_json: '{"buckets": ["Emergency", "Education"], "rule_id": "RULES_ENG_G4_U3_JOBS_VOCAB", "explicacionDiamante": "Divide las profesiones por su área de servicio."}'
            }
        ];

        const csv = Papa.unparse(template);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "plantilla_ejercicios_edu.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Upload className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Panel de Ingesta Masiva</h2>
                            <p className="text-slate-500 font-medium">Sube contenido Santillana / OER mediante CSV</p>
                        </div>
                    </div>
                    <button
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm"
                    >
                        <Download className="w-4 h-4" /> Bajar Plantilla
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left: Criteria Reference */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-[30px] p-6 shadow-md border border-slate-100">
                            <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Library className="w-4 h-4" /> IDs Crit. LOMLOE (4º)
                            </h5>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {availableCriteria.map(c => (
                                    <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                                        <code className="text-[10px] font-bold text-indigo-600 mb-1 block">{c.id}</code>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{c.descripcion}</p>
                                    </div>
                                ))}
                                {availableCriteria.length === 0 && <p className="text-[10px] text-slate-400 italic">No hay criterios cargados.</p>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Upload Zone & Preview */}
                    <div className="lg:col-span-3 space-y-8">
                        {!fileName ? (
                            <label className="group relative bg-white border-4 border-dashed border-indigo-100 rounded-[40px] p-20 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 transition-all min-h-[400px]">
                                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileSpreadsheet className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800">Suelta tu CSV aquí</h3>
                                <p className="text-slate-400 font-medium mt-2">Sigue el estándar definido en ESTANDAR_INGESTA_SANTILLANA.md</p>
                                <div className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
                                    Seleccionar Archivo
                                </div>
                            </label>
                        ) : (
                            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                            <FileSpreadsheet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{fileName}</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{csvData.length} Ejercicios detectados</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setCsvData([]); setFileName(''); setStatus({ type: '', message: '' }); }}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setShowPreview(!showPreview)}
                                            className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2 text-sm"
                                        >
                                            {showPreview ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {showPreview ? 'Ocultar Vista Previa' : 'Ver Vista Previa'}
                                        </button>
                                        <button
                                            onClick={saveToSupabase}
                                            disabled={loading}
                                            className="px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black uppercase tracking-widest shadow-xl shadow-indigo-200 hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
                                            Subir a Santillana DB
                                        </button>
                                    </div>
                                </div>

                                {/* Status Message */}
                                {status.message && (
                                    <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                        status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' :
                                            'bg-blue-50 text-blue-700 border border-blue-100'
                                        }`}>
                                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                        {status.message}
                                    </div>
                                )}

                                {/* Preview Table */}
                                {showPreview && (
                                    <div className="border border-slate-100 rounded-[30px] overflow-hidden shadow-inner">
                                        <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead className="bg-slate-50 sticky top-0 z-20">
                                                    <tr>
                                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400 border-b border-slate-100">Tipo</th>
                                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400 border-b border-slate-100">Enunciado</th>
                                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400 border-b border-slate-100">Respuesta</th>
                                                        <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400 border-b border-slate-100">Lomloe</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {csvData.slice(0, 50).map((row, i) => (
                                                        <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                                                            <td className="p-4">
                                                                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md font-bold text-[10px] uppercase">
                                                                    {row.question_type}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 font-medium text-slate-700 max-w-xs">{row.question_text}</td>
                                                            <td className="p-4 font-bold text-slate-900 border-l border-slate-50">{row.correct_answer}</td>
                                                            <td className="p-4">
                                                                {row.metadata?.lomloe_criterios?.map(tag => (
                                                                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[9px] font-black mr-1">{tag}</span>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminIngestPanel;
