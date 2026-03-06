import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Manifesto from './components/Manifesto';
import Collection from './components/Collection';
import Footer from './components/Footer';

function App() {
  return (
    <main className="relative bg-brand-bg text-brand-text min-h-screen overflow-x-hidden w-full font-sans antialiased">
      <Navbar />
      <Hero />
      <Dashboard />
      <Manifesto />
      <Collection />
      <Footer />
    </main>
  );
}

export default App;
