import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="fixed bottom-8 right-8 z-50 rounded-full border border-line bg-white p-3 text-heading shadow-lg transition-transform hover:scale-105">
      
      {theme === 'dark' ?
      <SunIcon className="h-5 w-5" aria-hidden="true" /> :

      <MoonIcon className="h-5 w-5" aria-hidden="true" />
      }
    </button>);

}