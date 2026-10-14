import Crosshair from '../ui/Crosshair';
import SiteHeader from '../layout/SiteHeader';
import TechnicalRail from './TechnicalRail';
import HeroContent from './HeroContent';
import WireframeHorizon from './WireframeHorizon';

type HeroSectionProps = {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

export default function HeroSection({ theme, onToggleTheme }: HeroSectionProps) {
  return (
    <section id="home" className="hero-surface relative mx-auto flex h-[min(900px,100svh)] min-h-[700px] w-full max-w-[1440px] overflow-hidden border shadow-2xl max-[480px]:min-h-[620px]">
      <div className="bg-tech-grid absolute inset-0 opacity-70" />

      <div className="ambient-glow -left-32 -top-32" />
      <div className="ambient-glow bottom-0 right-0" style={{ background: 'radial-gradient(circle, rgba(217, 255, 56, 0.03) 0%, transparent 70%)' }} />

      <Crosshair className="top-[270px] right-[180px]" />
      <Crosshair className="top-[620px] right-[180px]" />
      <Crosshair className="left-[260px] top-[200px] opacity-40" />

      <WireframeHorizon />

      <div className="relative z-30 flex w-full flex-col justify-between">
        <SiteHeader theme={theme} onToggleTheme={onToggleTheme} />
        <TechnicalRail />
        <HeroContent />
        <div className="h-6" />
      </div>
    </section>
  );
}