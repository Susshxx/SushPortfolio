import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';
import { ThemeToggle } from './components/ThemeToggle';
import { WelcomeScreen } from './components/WelcomeScreen';

export function App() {
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const preventDevTools = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventDevTools);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventDevTools);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAdmin = () => {
    window.location.href = '/admin';
  };

  return (
    <>
      <WelcomeScreen />
      <div className="min-h-screen w-full bg-white">
        <CursorTrail />
        <Header onOpenAdminPanel={handleOpenAdmin} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </>
  );
}