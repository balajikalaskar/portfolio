import ArrowUpRightIcon from '../ui/ArrowUpRightIcon';

export default function HeroContent() {
  return (
    <main className="relative z-20 flex max-w-5xl flex-col justify-center px-6 pb-12 pt-8 sm:px-10 md:px-28 lg:px-28 lg:pb-20 lg:pt-6">
      <div className="mb-2 flex items-center space-x-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[color:var(--text-muted)]">[ 01 ]</span>
      </div>

      <div className="flex flex-col leading-[0.88]">
        <h1 className="m-0 flex flex-col text-[clamp(4.25rem,8vw,9rem)] font-black uppercase tracking-[-0.04em]">
          <span className="block text-[color:var(--text-primary)]">BALAJI</span>
          <span className="accent-text mt-1 block drop-shadow-[0_4px_24px_rgba(217,255,56,0.12)]">KALASKAR</span>
        </h1>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="h-px w-10 shrink-0 bg-[color:var(--text-muted)]" />
        <p className="whitespace-nowrap text-sm font-mono font-medium uppercase tracking-[0.24em] text-[color:var(--text-secondary)]">FULL-STACK DEVELOPER</p>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4 max-[480px]:flex-col max-[480px]:items-start">
        <a
          href="#work"
          className="btn-neon inline-flex min-h-12 min-w-[205px] items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.14em] text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9FF38]"
        >
          <span>EXPLORE MY WORK</span>
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>

        <a
          href="#contact"
          className="btn-outline inline-flex min-h-12 min-w-[205px] items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[color:var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9FF38]"
        >
          <span>LET'S CONNECT</span>
          <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-[color:var(--text-muted)]" />
        </a>
      </div>
    </main>
  );
}
