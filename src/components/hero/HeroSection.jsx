import SiteHeader from '../layout/SiteHeader';
import TechnicalRail from './TechnicalRail';
import HeroContent from './HeroContent';
import WireframeHorizon from './WireframeHorizon';

export default function HeroSection({ theme, activeSection, onToggleTheme }) {
  return (
    <section id="home" aria-label="Introduction" className="hero-surface relative mx-auto flex h-[min(900px,100svh)] min-h-[700px] w-full max-w-[1440px] overflow-hidden max-[480px]:min-h-[620px]">
      <div className="bg-tech-grid absolute inset-0 opacity-70" />

      <WireframeHorizon />

      <div className="relative z-30 flex w-full flex-col justify-between">
        <SiteHeader theme={theme} activeSection={activeSection} onToggleTheme={onToggleTheme} />
        <TechnicalRail />
        <HeroContent />
        <div className="h-6" />
      </div>
    </section>
  );
}
