import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import {
    FileText,
    Download,
    Share2,
    Brain,
    CheckCircle,
    AlertTriangle,
    Info
} from 'lucide-react';

const DiagnosticReport = () => {
    const navigate = useNavigate();
    // Mock data - in real app, fetch from Supabase 'nee_screenings' table
    const reportData = {
        studentName: "Alex García",
        date: new Date().toLocaleDateString(),
        overallScore: 85,
        summary: "El perfil cognitivo muestra una alta capacidad de razonamiento lógico y creatividad, con algunas áreas de mejora en atención sostenida.",
        areas: [
            { name: "Razonamiento Lógico (AACC)", score: 92, status: "Alta Capacidad", color: "text-purple-600", bg: "bg-purple-50" },
            { name: "Lectoescritura (Dislexia)", score: 78, status: "Sin Riesgo", color: "text-green-600", bg: "bg-green-50" },
            { name: "Atención (TDAH)", score: 45, status: "Riesgo Moderado", color: "text-yellow-600", bg: "bg-yellow-50" },
            { name: "Creatividad (TTCT)", score: 88, status: "Muy Alto", color: "text-pink-600", bg: "bg-pink-50" },
        ],
        recommendations: [
            "Implementar descansos activos cada 25 minutos (Técnica Pomodoro).",
            "Utilizar organizadores gráficos para estructurar tareas complejas.",
            "Fomentar actividades de enriquecimiento curricular en matemáticas."
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <button onClick={() => navigate('/diagnostic')} className="text-gray-500 hover:text-gray-900 font-medium">
                        ← Volver al Panel
                    </button>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                            <Share2 className="w-4 h-4" /> Compartir
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 shadow-sm shadow-indigo-200">
                            <Download className="w-4 h-4" /> Descargar PDF
                        </button>
                    </div>
                </div>

                {/* Report Paper */}
                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">

                    {/* Paper Header */}
                    <div className="bg-slate-900 text-white p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <FileText className="w-40 h-40" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Brain className="w-6 h-6 text-indigo-300" />
                                </div>
                                <span className="text-indigo-200 font-mono text-sm tracking-widest uppercase">Informe Neuroeducativo</span>
                            </div>
                            <h1 className="text-4xl font-bold mb-2">{reportData.studentName}</h1>
                            <p className="text-slate-400">Fecha de evaluación: {reportData.date}</p>
                        </div>
                    </div>

                    <div className="p-12 space-y-12">

                        {/* Executive Summary */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Resumen Ejecutivo</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {reportData.summary}
                            </p>
                        </section>

                        {/* Cognitive Profile Grid */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Perfil Cognitivo Detallado</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {reportData.areas.map((area, idx) => (
                                    <div key={idx} className={`p-6 rounded-2xl border border-gray-100 ${area.bg} flex items-center justify-between group hover:shadow-md transition-all`}>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{area.name}</h4>
                                            <span className={`text-sm font-bold ${area.color} flex items-center gap-1.5`}>
                                                <Info className="w-3 h-3" /> {area.status}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-black text-gray-400 group-hover:text-gray-600 transition-colors">
                                            {area.score}/100
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recommendations */}
                        <section className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Plan de Acción Recomendado
                            </h3>
                            <ul className="space-y-4">
                                {reportData.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-indigo-800 leading-relaxed">{rec}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Disclaimer */}
                        <div className="text-xs text-gray-400 text-center italic border-t border-gray-100 pt-8">
                            Este informe es una herramienta de orientación educativa basada en algoritmos de IA y pruebas estandarizadas. No sustituye un diagnóstico clínico profesional.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticReport;
