export default function TechnicalRail() {
  return (
    <aside className="pointer-events-none absolute left-3 top-0 z-20 flex h-full w-20 flex-col items-center justify-between py-12 md:left-6 lg:left-10">
      <div />

      <div className="flex flex-col items-center space-y-7 pointer-events-auto">
        <div className="mb-5 flex h-44 items-center justify-center">
          <div className="origin-center -rotate-90 whitespace-nowrap">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
              FULL-STACK DEVELOPER
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 text-[10px] font-mono uppercase text-[color:var(--text-muted)]">
          <span className="text-[color:var(--text-primary)]">01</span>
          {/* Active dot — uses accent-text (lime dark / olive light) */}
          <div
            className="h-2 w-2 rounded-[1.5px] bg-[color:var(--accent-text)]"
            style={{ boxShadow: '0 0 8px var(--accent-text)' }}
          />
          {/* Dividers — rail-divider uses var(--border) token */}
          <div className="rail-divider h-3" />
          <span>02</span>
          <div className="rail-divider h-3" />
          <span>03</span>
          <div className="rail-divider h-3" />
          <span>04</span>
        </div>
      </div>

      <div className="pointer-events-auto flex flex-col items-center space-y-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          SCROLL
        </span>
        {/* Scroll track — rail-scroll-track uses var(--border) token */}
        <div className="rail-scroll-track relative flex h-8 w-[2px] justify-center rounded-full">
          <div
            className="absolute top-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent-text)]"
            style={{ boxShadow: '0 0 7px var(--accent-text)' }}
          />
        </div>
      </div>
    </aside>
  );
}
