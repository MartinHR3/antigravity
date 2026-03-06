import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Biografia from './pages/Biografia';
import Calendario from './pages/Calendario';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Controlo el scroll al top al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className="relative bg-brand-bg text-brand-text min-h-screen overflow-x-hidden w-full font-sans antialiased">
        <Preloader />
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/biografia" element={<><Navbar /><Biografia /><Footer /></>} />
          <Route path="/calendario" element={<><Navbar /><Calendario /><Footer /></>} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
