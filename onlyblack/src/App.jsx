import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Manifesto from './components/Manifesto';
import Collection from './components/Collection';
import Plans from './components/Plans';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-fondo text-texto selection:bg-acento selection:text-texto">
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <Manifesto />
        <Collection />
        <Plans />
      </main>
      <Footer />
    </div>
  );
}

export default App;
