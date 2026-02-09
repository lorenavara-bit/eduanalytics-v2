import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import StudentProfile from './components/StudentProfile';
import WorksheetGenerator from './components/WorksheetGenerator';
import ResourceHub from './components/ResourceHub';
import ExamRoadmap from './components/ExamRoadmap';
import DiagnosticDashboard from './components/diagnostic/DiagnosticDashboard';
import DiagnosticReport from './components/diagnostic/DiagnosticReport';
import EarlyDetectionPrimary from './components/EarlyDetectionPrimary';
import EarlyDetectionGames from './components/EarlyDetectionGames';
import PromptTester from './components/PromptTester';
import TutorAI from './components/tutor/TutorAI';
import AdminIngestPanel from './components/admin/AdminIngestPanel';
import { Home, User, Wand2, Library, Menu, X, Calendar, Activity, MessageSquare } from 'lucide-react';

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-blue-600 bg-blue-50 font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50';

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                EduAnalytics
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/')}`}>
              <Home size={18} /> Inicio
            </Link>
            <Link to="/profile" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/profile')}`}>
              <User size={18} /> NeuroPerfil
            </Link>
            <Link to="/tutor" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/tutor')}`}>
              <MessageSquare size={18} className={location.pathname.includes('/tutor') ? 'text-green-600' : ''} /> Tutor IA
            </Link>
            <Link to="/generator" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/generator')}`}>
              <Wand2 size={18} className={location.pathname === '/generator' ? 'text-purple-600' : ''} /> Generador IA
            </Link>
            <Link to="/hub" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/hub')}`}>
              <Library size={18} /> Hub de Aprendizaje
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full z-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/')}`}>Inicio</Link>
            <Link to="/profile" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/profile')}`}>NeuroPerfil</Link>
            <Link to="/tutor" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/tutor')}`}>Tutor IA</Link>
            <Link to="/generator" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/generator')}`}>Generador IA</Link>
            <Link to="/hub" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/hub')}`}>Hub de Aprendizaje</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

import ResetOnboarding from './components/ResetOnboarding';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Navbar />
        <ResetOnboarding />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/generator" element={<WorksheetGenerator />} />
            <Route path="/hub" element={<ResourceHub />} />
            <Route path="/exams" element={<ExamRoadmap />} />

            {/* Diagnostic Module Routes */}
            <Route path="/diagnostic" element={<DiagnosticDashboard />} />
            {/* Note: In a real app, these would be nested routes or protected */}
            <Route path="/diagnostic/screening" element={<EarlyDetectionPrimary studentId="guest" onComplete={(action) => {
              if (action === 'GAMES') {
                window.location.href = '/diagnostic/games';
              } else {
                window.location.href = '/diagnostic';
              }
            }} />} />
            <Route path="/diagnostic/games" element={<EarlyDetectionGames studentId="guest" onBack={() => window.location.href = '/diagnostic'} />} />
            <Route path="/diagnostic/report" element={<DiagnosticReport />} />

            {/* Tutor IA Route */}
            <Route path="/tutor" element={<TutorAI />} />

            {/* Testing Route - TEMPORAL */}
            <Route path="/test-prompt" element={<PromptTester />} />

            {/* Admin Routes - HIDDEN */}
            <Route path="/admin/ingest" element={<AdminIngestPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
