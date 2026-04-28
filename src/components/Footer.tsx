import { useEffect, useState } from 'react';
import { ExternalLink } from './ui/ExternalLink';

function RampIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M4 18h16v2H4v-2Zm2.2-2 11-8.4a2 2 0 0 1 3.2 1.6V16H6.2Z"
        fill="currentColor"
      />
      <path
        d="M7.4 16h12V9.2c0-.5-.6-.8-1-.5L7.4 16Z"
        fill="currentColor"
        opacity=".18"
      />
    </svg>
  );
}

export function Footer() {
  const [tilting, setTilting] = useState(false);

  useEffect(() => {
    if (!tilting) return;
    const t = window.setTimeout(() => setTilting(false), 4200);
    return () => window.clearTimeout(t);
  }, [tilting]);

  return (
    <footer className="footer">
      <div className="containerNarrow footerInner">
        <div className={tilting ? 'footerBrandBlock footerBrandBlockTilt' : 'footerBrandBlock'}>
          <div className="footerBrandRow">
            <p className="footerBrand">Play to Understand</p>
            <button
              type="button"
              className={tilting ? 'iconBtn iconBtnActive' : 'iconBtn'}
              onClick={() => setTilting(true)}
              aria-label="Tilt"
              title="Tilt"
            >
              <RampIcon />
            </button>
          </div>
          <p className="small muted footerTagline">Small games. Big ideas. Slightly stubborn.</p>
        </div>
        <nav className="footerLinks" aria-label="Elsewhere">
          <ExternalLink
            href="https://patreon.com/buildtounderstand"
            ariaLabel="Patreon: Build to Understand"
          >
            Patreon
          </ExternalLink>
          <ExternalLink
            href="https://buildtounderstand.substack.com/"
            ariaLabel="Blog (Substack)"
          >
            Blog
          </ExternalLink>
          <a href="/#/projects">Games</a>
        </nav>
        <p className="small muted footerCopy">
          © {new Date().getFullYear()} — made slowly, with too much tea!
        </p>
      </div>
    </footer>
  );
}
