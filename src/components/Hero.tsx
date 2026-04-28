import { useEffect, useState } from 'react';
import { ButtonLink } from './ui/ButtonLink';

function FlaskIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 2h6v2h-1v5.2l4.86 7.77A3.2 3.2 0 0 1 16.15 22H7.85a3.2 3.2 0 0 1-2.71-5.03L10 9.2V4H9V2Zm3 8.1-5.16 8.25A1.2 1.2 0 0 0 7.85 20h8.3a1.2 1.2 0 0 0 1.01-1.85L12 10.1Z"
        fill="currentColor"
      />
      <path
        d="M8.6 16.2h6.8c.9 0 1.5.9 1.1 1.7-.8 1.5-2.4 2.1-4.5 2.1s-3.7-.6-4.5-2.1c-.4-.8.2-1.7 1.1-1.7Z"
        fill="currentColor"
        opacity=".18"
      />
    </svg>
  );
}

export function Hero({ onOpenSubscribe }: { onOpenSubscribe: () => void }) {
  const [pouring, setPouring] = useState(false);

  useEffect(() => {
    if (!pouring) return;
    const t = window.setTimeout(() => setPouring(false), 2400);
    return () => window.clearTimeout(t);
  }, [pouring]);

  return (
    <header className="hero">
      <div className="containerNarrow">
        <div className={pouring ? 'heroCopy heroCopyPouring' : 'heroCopy'}>
          <div className="brandRow">
            <h1 className="heroTitle">Play to Understand</h1>
            <button
              type="button"
              className={pouring ? 'flaskBtn flaskBtnActive' : 'flaskBtn'}
              onClick={() => setPouring(true)}
              aria-label="Pour a little color"
              title="Pour a little color"
            >
              <FlaskIcon />
            </button>
          </div>
          <p className="heroSubtitle">A small hub for learning through play.</p>

          <p className="sectionSub heroBody">
            New games drop about once a month — not more, sometimes less, because
            life is not a content calendar. Subscribe if you want a heads-up.
          </p>

          <div className="ritual" aria-label="How it works">
            <p className="kicker ritualKicker">Extremely complicated process</p>
            <ol className="ritualList">
              <li>
                <span className="ritualNum" aria-hidden="true">1</span>
                <span>Pick a game.</span>
              </li>
              <li>
                <span className="ritualNum" aria-hidden="true">2</span>
                <span>Play for 10–20 minutes.</span>
              </li>
              <li>
                <span className="ritualNum" aria-hidden="true">3</span>
                <span>Leave with a clearer idea (or, fine, a clearer question).</span>
              </li>
            </ol>
          </div>

          <div className="heroCtas">
            <ButtonLink href="#games" variant="primary">
              See games →
            </ButtonLink>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={onOpenSubscribe}
            >
              New game alerts
            </button>
            <ButtonLink
              href="https://patreon.com/buildtounderstand"
              variant="secondary"
              external
            >
              Support on Patreon ↗
            </ButtonLink>
          </div>

          <p className="small muted heroFinePrint">
            No popups. No newsletter pop-up. No “you forgot something in your cart”.
          </p>
        </div>
      </div>
    </header>
  );
}
