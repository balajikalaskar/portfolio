import { useEffect, useState } from 'react';
import HeroSection from './components/hero/HeroSection';
import SiteFooter from './components/layout/SiteFooter';
import PortfolioSections from './components/portfolio/PortfolioSections';
import { navigation } from './config/site';
import { useActiveSection } from './hooks/useActiveSection';
import './components/portfolio/portfolio.css';


const sectionIds = navigation.map((item) => item.id);
const themeColors = { dark: '#08090b', light: '#F0F0E8' };

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme]);
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('portfolio-theme', nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="min-h-screen bg-[color:var(--page-background)] text-[color:var(--text-primary)]" data-theme={theme}>
      <main>
        <HeroSection theme={theme} activeSection={activeSection} onToggleTheme={toggleTheme} />
        <PortfolioSections />
      </main>
      <SiteFooter />
    </div>
  );
}
