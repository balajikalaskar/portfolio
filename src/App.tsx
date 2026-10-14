import { useState } from 'react';
import HeroSection from './components/hero/HeroSection';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem('portfolio-theme');
  return savedTheme === 'light' ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('portfolio-theme', nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="min-h-screen bg-[color:var(--page-background)] text-[color:var(--text-primary)]" data-theme={theme}>
      <HeroSection theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
