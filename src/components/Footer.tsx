import { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from './ui/ExternalLink';

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M3 9h10.8a2.2 2.2 0 1 0-2.1-2.7h2a.2.2 0 1 1 .1 0c0 .9-.7 1.7-1.7 1.7H3V6.5h8.8A3.7 3.7 0 1 1 15 11H3V9Zm0 6h13.5a2.4 2.4 0 1 0-2.3-3h2a.4.4 0 1 1 .3.1c0 1.3-1.1 2.4-2.4 2.4H3v-1.5Z"
        fill="currentColor"
      />
      <path d="M3 12h11.5" stroke="currentColor" strokeWidth="1.5" opacity=".22" />
    </svg>
  );
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function RollingText({
  text,
  active,
  run,
  className,
}: {
  text: string;
  active: boolean;
  run: number;
  className: string;
}) {
  const parts = useMemo(() => {
    const rand = mulberry32(
      (run + 1) * 1337 + text.length * 17,
    );
    return [...text].map((ch, idx) => {
      const r1 = rand();
      const r2 = rand();
      const r3 = rand();
      return { ch, idx, r1, r2, r3 };
    });
  }, [run, text]);

  return (
    <span
      className={active ? `${className} rollLine rollLineActive` : `${className} rollLine`}
      aria-label={text}
    >
      {parts.map((p) => (
        <span
          key={`${p.idx}-${p.ch}`}
          className="rollChar"
          style={
            {
              ['--i' as any]: p.idx,
              ['--r1' as any]: p.r1,
              ['--r2' as any]: p.r2,
              ['--r3' as any]: p.r3,
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
  const [blowing, setBlowing] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!blowing) return;
    const t = window.setTimeout(() => setBlowing(false), 4200);
    return () => window.clearTimeout(t);
  }, [blowing]);

  return (
    <footer className="footer">
      <div className="containerNarrow footerInner">
        <div className={blowing ? 'footerBrandBlock footerBrandBlockWind' : 'footerBrandBlock'}>
          <div className="footerBrandRow">
            <p className="footerBrand">
              <RollingText
                text="Play to Understand"
                active={blowing}
                run={run}
                className="footerBrandText"
              />
            </p>
            <button
              type="button"
              className={blowing ? 'iconBtn iconBtnActive' : 'iconBtn'}
              onClick={() => {
                setRun((r) => r + 1);
                setBlowing(true);
              }}
              aria-label="Wind"
              title="Wind"
            >
              <WindIcon />
            </button>
          </div>
          <p className="small muted footerTagline">
            <RollingText
              text="Small games. Big ideas. Slightly stubborn."
              active={blowing}
              run={run + 11}
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
