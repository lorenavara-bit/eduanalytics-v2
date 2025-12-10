import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, User, Wand2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import StudentProfile from './components/StudentProfile';
import WorksheetGenerator from './components/WorksheetGenerator';

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
            <Link to="/generator" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/generator')}`}>
              <Wand2 size={18} className={location.pathname === '/generator' ? 'text-purple-600' : ''} /> Generador IA
            </Link>
            <Link to="/profile" className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isActive('/profile')}`}>
              <User size={18} /> Perfil
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
            <Link to="/generator" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/generator')}`}>Generador IA</Link>
            <Link to="/profile" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium ${isActive('/profile')}`}>Perfil</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/generator" element={<WorksheetGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
