import { navigation } from '../../config/site';

type SiteHeaderProps = {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
};

export default function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  return (
    /*
     * Three independent groups — NO shared outer pill:
     *   LEFT   → BK/ wordmark (bare, no background)
     *   CENTRE → .nav-pill wraps ONLY the 4 nav links
     *   RIGHT  → RESUME.PDF + theme toggle (bare, no background)
     */
    <header className="relative z-30 flex w-full items-center justify-between px-6 pt-6 pb-5 md:px-10 lg:px-14 lg:pt-9">

      {/* ── LEFT: BK/ brand — no pill, no background ── */}
      <a
        href="#home"
        className="group flex shrink-0 cursor-pointer items-center gap-0.5"
        aria-label="Balaji Kalaskar home"
      >
        <span className="text-2xl font-black tracking-tight text-[color:var(--text-primary)] transition-opacity group-hover:opacity-70">
          BK
        </span>
        <span className="text-2xl font-black text-[color:var(--accent-text)] transition-transform duration-150 group-hover:translate-x-0.5">
          /
        </span>
      </a>

      {/* ── CENTRE: ONLY the 4 nav links inside the glass pill ── */}
      <nav
        className="nav-pill hidden text-[10px] font-mono uppercase tracking-[0.16em] min-[640px]:flex min-[900px]:text-[11px] min-[900px]:tracking-[0.18em]"
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={[
              'relative py-0.5 transition-colors',
              item.active
                ? 'font-semibold text-[color:var(--accent-text)]'
                : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]',
            ].join(' ')}
          >
            {item.active ? (
              <>
                {/* Active dot — lime dark / olive light via accent-text */}
                <span className="nav-glow absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[color:var(--accent-text)]" />
                <span>{item.label}</span>
                {/* Active underline — nav-active-bar uses accent-text */}
                <span className="nav-active-bar absolute -bottom-1.5 left-1/2 h-[2px] w-8 -translate-x-1/2" />
              </>
            ) : (
              <span>{item.label}</span>
            )}
          </a>
        ))}
      </nav>

      {/* ── RIGHT: Resume + theme toggle — outside the pill ── */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <a
          href="#resume"
          className="resume-control flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[10px] font-mono uppercase tracking-[0.16em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-text)]"
          aria-label="Open resume PDF"
        >
          <span>RESUME.PDF</span>
          <svg
            className="h-2.5 w-2.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>

        <button
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'light'}
          onClick={onToggleTheme}
          className="theme-control flex h-9 w-9 items-center justify-center rounded-full border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-text)]"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {theme === 'dark' ? (
              <>
                <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M6.34 17.66l-1.41-1.41" />
                <path d="M19.07 4.93l-1.41-1.41" />
              </>
            ) : (
              <>
                <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
                <path d="m16.5 4 .5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}