import Header from './components/layout/Header';
import HeroSection from './components/home/HeroSection';
import AnalyzerPanel from './components/analyzer/AnalyzerPanel';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-navy)] selection:bg-[var(--color-brand-accent)] selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <AnalyzerPanel />
      </main>
    </div>
  );
}

export default App;
