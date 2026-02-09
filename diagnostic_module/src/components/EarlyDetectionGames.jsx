import React, { useState } from 'react';
import { calculateRiskFromGame } from '../services/riskCalculator';
import { supabase } from '../supabaseClient';
import PseudopalabrasGame from './games/PseudopalabrasGame';
import AtencionGame from './games/AtencionGame';
import LogicaGame from './games/LogicaGame';
import ConceptComprehensionGame from './games/ConceptComprehensionGame';
import VarkGame from './games/VarkGame';
import MetacognitiveAwarenessGame from './games/MetacognitiveAwarenessGame';
import MIKidsGame from './games/MIKidsGame';
import RavenMatrixGame from './games/RavenMatrixGame';
import CattellGame from './games/CattellGame';
import WiscWaistGame from './games/WiscWaistGame';
import TelefonicaAACCGame from './games/TelefonicaAACCGame';
import TTCTGame from './games/TTCTGame';
import HollandGame from './games/HollandGame';
import {
    Gamepad2,
    Brain,
    Zap,
    Puzzle,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    Info
} from 'lucide-react';

const EarlyDetectionGames = ({ studentId, onBack }) => {
    const [activeGame, setActiveGame] = useState(null); // 'DYSLEXIA', 'ADHD', 'AACC', null

    const handleGameComplete = async (type, results) => {
        try {
            // Guardar resultados del juego en Supabase
            const { error } = await supabase
                .from('nee_screenings')
                .insert({
                    student_id: studentId,
                    type: type,
                    source: 'STUDENT_GAME',
                    data: results,
                    risk_level: calculateRiskFromGame(type, results)
                });

            if (error) throw error;

            // Volver al selector de juegos
            setActiveGame(null);
            alert('¡Resultado guardado correctamente! Misión cumplida.');
        } catch (err) {
            console.error('Error saving game results:', err);
        }
    };



    if (activeGame === 'DYSLEXIA') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <PseudopalabrasGame onComplete={(res) => handleGameComplete('DYSLEXIA', res)} />
            </div>
        );
    }

    if (activeGame === 'ADHD') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <AtencionGame onComplete={(res) => handleGameComplete('TDAH', res)} />
            </div>
        );
    }

    if (activeGame === 'AACC') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <LogicaGame onComplete={(res) => handleGameComplete('AACC', res)} />
            </div>
        );
    }

    // New test renderings
    if (activeGame === 'VARK') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <VarkGame onComplete={(res) => handleGameComplete('VARK', res)} />
            </div>
        );
    }
    if (activeGame === 'CC') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <ConceptComprehensionGame onComplete={(res) => handleGameComplete('CC', res)} />
            </div>
        );
    }
    if (activeGame === 'MAI') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <MetacognitiveAwarenessGame onComplete={(res) => handleGameComplete('MAI', res)} />
            </div>
        );
    }
    if (activeGame === 'MIKIDS') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <MIKidsGame onComplete={(res) => handleGameComplete('MIKIDS', res)} />
            </div>
        );
    }



    // New test renderings
    if (activeGame === 'RAVEN') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <RavenMatrixGame onComplete={(res) => handleGameComplete('RAVEN', res)} />
            </div>
        );
    }
    if (activeGame === 'CATTELL') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <CattellGame onComplete={(res) => handleGameComplete('CATTELL', res)} />
            </div>
        );
    }
    if (activeGame === 'WISC') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <WiscWaistGame onComplete={(res) => handleGameComplete('WISC', res)} />
            </div>
        );
    }
    if (activeGame === 'TELEFONICA') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <TelefonicaAACCGame onComplete={(res) => handleGameComplete('TELEFONICA', res)} />
            </div>
        );
    }
    if (activeGame === 'TTCT') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <TTCTGame onComplete={(res) => handleGameComplete('TTCT', res)} />
            </div>
        );
    }
    if (activeGame === 'HOLLAND') {
        return (
            <div className="py-8">
                <button onClick={() => setActiveGame(null)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Abandonar misión
                </button>
                <HollandGame onComplete={(res) => handleGameComplete('HOLLAND', res)} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-10">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-200">
                    <Gamepad2 className="w-4 h-4" />
                    Zona de Desafíos Cognitivos
                </div>
                <h2 className="text-4xl font-black text-gray-900">Misiones para Exploradores</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Supera estos desafíos gamificados para ayudar al sistema a entender mejor tu forma de procesar la información.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Dyslexia Card */}
                <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                        <Brain className="w-20 h-20 text-blue-600" />
                    </div>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                        <Brain className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black text-gray-900">Laberinto de Palabras</h4>
                        <p className="text-sm text-gray-500">¿Eres capaz de detectar las palabras marcianas?</p>
                    </div>
                    <button
                        onClick={() => setActiveGame('DYSLEXIA')}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        Jugar Ahora
                    </button>
                </div>

                {/* ADHD Card */}
                <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                        <Zap className="w-20 h-20 text-orange-600" />
                    </div>
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black text-gray-900">Ojo de Águila</h4>
                        <p className="text-sm text-gray-500">Pon a prueba tus reflejos y tu concentración espacial.</p>
                    </div>
                    <button
                        onClick={() => setActiveGame('ADHD')}
                        className="w-full py-3 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
                    >
                        Jugar Ahora
                    </button>
                </div>

                {/* AACC Card */}
                <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                        <Puzzle className="w-20 h-20 text-purple-600" />
                    </div>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform">
                        <Puzzle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black text-gray-900">Detective de Patrones</h4>
                        <h4 className="text-xl font-black text-gray-900">Detective de Patrones</h4>
                        <p className="text-sm text-gray-500">Resuelve enigmas lógicos cada vez más difíciles.</p>
                    </div>
                    <button
                        onClick={() => setActiveGame('AACC')}
                        className="w-full py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
                    >
                        Jugar Ahora
                    </button>
                </div>
            </div>
            {/* New Test Cards */}
            {/* Raven Matrix Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Brain className="w-20 h-20 text-indigo-600" />
                </div>
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                    <Brain className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">Raven’s Matrices</h4>
                    <p className="text-sm text-gray-500">Evalúa razonamiento abstracto.</p>
                </div>
                <button
                    onClick={() => setActiveGame('RAVEN')}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    Jugar Ahora
                </button>
            </div>
            {/* Cattell Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Puzzle className="w-20 h-20 text-purple-600" />
                </div>
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform">
                    <Puzzle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">Cattell Culture‑Fair</h4>
                    <p className="text-sm text-gray-500">Razonamiento sin sesgo cultural.</p>
                </div>
                <button
                    onClick={() => setActiveGame('CATTELL')}
                    className="w-full py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
                >
                    Jugar Ahora
                </button>
            </div>
            {/* WISC/WAIS Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Zap className="w-20 h-20 text-orange-600" />
                </div>
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
                    <Zap className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">WISC‑V / WAIS‑IV</h4>
                    <p className="text-sm text-gray-500">Subpruebas de razonamiento perceptual.</p>
                </div>
                <button
                    onClick={() => setActiveGame('WISC')}
                    className="w-full py-3 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
                >
                    Jugar Ahora
                </button>
            </div>
            {/* Telefónica AACC Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Gamepad2 className="w-20 h-20 text-blue-600" />
                </div>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                    <Gamepad2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">Test Fundación Telefónica</h4>
                    <p className="text-sm text-gray-500">Detecta altas capacidades.</p>
                </div>
                <button
                    onClick={() => setActiveGame('TELEFONICA')}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    Jugar Ahora
                </button>
            </div>
            {/* TTCT Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Sparkles className="w-20 h-20 text-pink-600" />
                </div>
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-3xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">TTCT (Creatividad)</h4>
                    <p className="text-sm text-gray-500">Evalúa pensamiento divergente.</p>
                </div>
                <button
                    onClick={() => setActiveGame('TTCT')}
                    className="w-full py-3 bg-pink-600 text-white font-bold rounded-2xl hover:bg-pink-700 transition-all shadow-lg shadow-pink-100"
                >
                    Jugar Ahora
                </button>
            </div>
            {/* Holland Interests Card */}
            <div className="group bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                    <Info className="w-20 h-20 text-gray-600" />
                </div>
                <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                    <Info className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900">Inventario Holland</h4>
                    <p className="text-sm text-gray-500">Intereses y motivación académica.</p>
                </div>
                <button
                    onClick={() => setActiveGame('HOLLAND')}
                    className="w-full py-3 bg-gray-600 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all shadow-lg shadow-gray-100"
                >
                    Jugar Ahora
                </button>
            </div>

            <div className="p-6 bg-gray-900 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="flex-grow space-y-1 text-center md:text-left">
                    <h5 className="font-bold">Privacidad y Diversión</h5>
                    <p className="text-sm text-gray-400">Los resultados son confidenciales y se usan para adaptar tus próximas fichas de estudio.</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-8 py-3 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
                >
                    Volver
                </button>
            </div>

            <div className="flex items-center gap-2 justify-center text-gray-400 text-sm italic">
                <Info className="w-4 h-4" />
                Recomendamos jugar con el acompañamiento de un adulto para explicar las reglas.
            </div>
        </div>
    );
};

export default EarlyDetectionGames;
