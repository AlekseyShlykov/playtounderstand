import { useEffect, useMemo, useState } from 'react';
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

function RollingText({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className: string;
}) {
  const parts = useMemo(() => {
    // Stable per mount, but “random enough”.
    return [...text].map((ch, idx) => {
      const r = (Math.sin(idx * 999) + 1) / 2; // 0..1 deterministic
      return { ch, idx, r };
    });
  }, [text]);

  return (
    <span className={active ? `${className} rollLine rollLineActive` : `${className} rollLine`} aria-label={text}>
      {parts.map((p) => (
        <span
          key={`${p.idx}-${p.ch}`}
          className="rollChar"
          style={
            {
              ['--i' as any]: p.idx,
              ['--r' as any]: p.r,
            } as React.CSSProperties
          }
        >
          {p.ch === ' ' ? '\u00A0' : p.ch}
        </span>
      ))}
    </span>
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
            <p className="footerBrand">
              <RollingText text="Play to Understand" active={tilting} className="footerBrandText" />
            </p>
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
          <p className="small muted footerTagline">
            <RollingText
              text="Small games. Big ideas. Slightly stubborn."
              active={tilting}
              className="footerTaglineText"
            />
          </p>
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
