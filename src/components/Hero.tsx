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

function MicroscopeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M9.2 2.6a2.2 2.2 0 0 1 3.1 0l2 2a2.2 2.2 0 0 1 0 3.1l-1.1 1.1 1.5 1.5c1.5 1.5 2.3 3.4 2.3 5.5V17h1a2 2 0 0 1 2 2v1H4v-1a2 2 0 0 1 2-2h7v-1.2c0-1.5-.6-2.8-1.6-3.9l-1.5-1.5-1.1 1.1a2.2 2.2 0 0 1-3.1 0l-2-2a2.2 2.2 0 0 1 0-3.1l5.5-5.5Zm1.5 1.4L5.2 9.5a.2.2 0 0 0 0 .3l2 2a.2.2 0 0 0 .3 0l5.5-5.5a.2.2 0 0 0 0-.3l-2-2a.2.2 0 0 0-.3 0Z"
        fill="currentColor"
      />
      <path d="M6 21h14v1H6v-1Z" fill="currentColor" opacity=".18" />
    </svg>
  );
}

export function Hero({ onOpenSubscribe }: { onOpenSubscribe: () => void }) {
  const [pouring, setPouring] = useState(false);

  useEffect(() => {
    if (!pouring) return;
    const t = window.setTimeout(() => setPouring(false), 8000);
    return () => window.clearTimeout(t);
  }, [pouring]);

  return (
    <header className="hero">
      <div className="containerNarrow">
        <div
          className={[
            'heroCopy',
            pouring ? 'heroCopyPouring' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="brandRow">
            <h1 className="heroTitle">Play to Understand</h1>
            <div className="brandTools" aria-label="Playful controls">
              <button
                type="button"
                className={pouring ? 'flaskBtn flaskBtnActive' : 'flaskBtn'}
                onClick={() => setPouring(true)}
                aria-label="Pour a little color"
                title="Pour a little color"
                data-analytics-event="button_click"
                data-analytics-label="hero_pour_color_button"
              >
                <FlaskIcon />
              </button>
            </div>
          </div>
          <p className="heroSubtitle">A small hub for learning through play.</p>

          <p className="sectionSub heroBody">
            New games drop about once a month — not more, sometimes less, because
            life is not a content calendar. Subscribe if you want a heads-up.
          </p>

          <div className="heroCtas">
            <ButtonLink
              href="#games"
              variant="primary"
              analyticsEvent="button_click"
              analyticsLabel="hero_see_games_button"
            >
              See games →
            </ButtonLink>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={onOpenSubscribe}
              data-analytics-event="button_click"
              data-analytics-label="hero_subscribe_button"
            >
              <span className="btnIconMobile" aria-hidden="true">
                <MicroscopeIcon />
              </span>
              Subscribe to new games (free)
            </button>
            <ButtonLink
              href="https://patreon.com/buildtounderstand"
              variant="secondary"
              external
              analyticsEvent="click_patreon"
              analyticsLabel="hero_patreon_button"
            >
              Support on Patreon ↗
            </ButtonLink>
          </div>

          <p className="small muted heroFinePrint">
            Try clicking the buttons. There are a few hidden easter eggs around here.
          </p>
        </div>
      </div>
    </header>
  );
}
