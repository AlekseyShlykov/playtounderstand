import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from './ui/ExternalLink';

function FlashlightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M10 2h4v2h-1v4.2l4.8 6.4c.8 1.1 0 2.4-1.3 2.4H7.5c-1.3 0-2.1-1.3-1.3-2.4L11 8.2V4h-1V2Zm2 8.2-4.1 5.5h8.2L12 10.2Z"
        fill="currentColor"
      />
      <path
        d="M9 19h6v3H9v-3Z"
        fill="currentColor"
        opacity=".18"
      />
      <path
        d="M12 20.2c2.3 0 4.5-.6 6-1.6v1.2c-1.5 1-3.7 1.6-6 1.6s-4.5-.6-6-1.6v-1.2c1.5 1 3.7 1.6 6 1.6Z"
        fill="currentColor"
        opacity=".25"
      />
    </svg>
  );
}

export function AboutSection() {
  const [spotlight, setSpotlight] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function startSpotlight() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setSpotlight(true);
    timeoutRef.current = window.setTimeout(() => setSpotlight(false), 4000);
  }

  return (
    <section
      className={spotlight ? 'section aboutSpotlightOn' : 'section'}
      id="about"
      aria-labelledby="about-title"
      style={
        spotlight
          ? ({
              ['--spot-x' as any]: `${pos.x}px`,
              ['--spot-y' as any]: `${pos.y}px`,
            } as React.CSSProperties)
          : undefined
      }
      onMouseMove={(e) => {
        if (!spotlight) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onClick={(e) => {
        if (!spotlight) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onTouchStart={(e) => {
        if (!spotlight) return;
        const t = e.touches[0];
        if (!t) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: t.clientX - rect.left, y: t.clientY - rect.top });
      }}
    >
      <div className="containerNarrow">
        <p className="kicker">About</p>
        <div className="aboutTitleRow">
          <h2 className="h2" id="about-title">
            Hi, I’m Alex Shlykov.
          </h2>
          <button
            type="button"
            className={spotlight ? 'iconBtn iconBtnActive' : 'iconBtn'}
            onClick={(e) => {
              e.stopPropagation();
              startSpotlight();
            }}
            aria-label="Flashlight mode"
            title="Flashlight mode"
          >
            <FlashlightIcon />
          </button>
        </div>
        <p className="lede aboutLede">
          I build small interactive projects that help people understand
          complicated ideas through play.
        </p>
        <p className="aboutBody">
          Most of these start as notes from a book, lecture, or a question I
          can’t stop thinking about. Then I turn them into something you can
          click through, test, and feel — instead of just read about. It’s a
          one‑person operation, which is mostly the point.
        </p>
        <p className="aboutBody">
          Elsewhere on the internet:{' '}
          <ExternalLink
            href="https://patreon.com/buildtounderstand"
            ariaLabel="Patreon: Build to Understand"
          >
            Patreon
          </ExternalLink>{' '}
          (back new games),{' '}
          <ExternalLink
            href="https://buildtounderstand.substack.com/"
            ariaLabel="Blog (Substack)"
          >
            Blog
          </ExternalLink>{' '}
          (occasional notes).
        </p>
      </div>
      {spotlight ? <div className="aboutSpotlightOverlay" aria-hidden="true" /> : null}
    </section>
  );
}
