import { useEffect, useState } from 'react';
import { ExternalLink } from './ui/ExternalLink';

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

export function SubscribeSection() {
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    if (!zooming) return;
    const t = window.setTimeout(() => setZooming(false), 2000);
    return () => window.clearTimeout(t);
  }, [zooming]);

  return (
    <section
      className="section sectionAlt"
      id="subscribe"
      aria-labelledby="subscribe-title"
    >
      <div className="containerNarrow">
        <div className={zooming ? 'subscribeCard subscribeCardZooming' : 'subscribeCard'}>
          <div className="subscribeCopy">
            <div className="subscribeTitleRow">
              <h2 className="h2" id="subscribe-title">
                Get the next game by email.
              </h2>
              <button
                type="button"
                className={zooming ? 'microBtn microBtnActive' : 'microBtn'}
                onClick={() => setZooming(true)}
                aria-label="Zoom in (100×)"
                title="Zoom in (100×)"
              >
                <MicroscopeIcon />
              </button>
            </div>
            <p className="lede">
              About once a month. Sometimes less. Never more.
            </p>
            <p className="sectionSub">
              Drop your email and I’ll send the next game when it’s actually
              done. Or if you’d rather throw a few coins, the project lives on{' '}
              <ExternalLink
                href="https://patreon.com/buildtounderstand"
                ariaLabel="Patreon: Build to Understand"
              >
                Patreon
              </ExternalLink>
              .
            </p>
            <ul className="promiseList">
              <li>One email per game. Sometimes none.</li>
              <li>Also: my notes on the games (the parts I couldn’t fit in).</li>
              <li>No drip funnel. No “you forgot something”.</li>
              <li>Two clicks to unsubscribe. Always.</li>
            </ul>
          </div>

          <div className="subscribeEmbed">
            <div className="substackWrap">
              <iframe
                title="Subscribe via Substack"
                src="https://buildtounderstand.substack.com/embed"
                width="480"
                height="320"
                loading="lazy"
                className="substackFrame"
              />
            </div>
            <p className="small muted subscribeFootnote">
              Substack also has my notes on the games. Patreon has behind the
              scenes + the longer version of whatever the game is about.
            </p>
          </div>

          {zooming ? (
            <div className="microLens" aria-hidden="true">
              <div className="microLensInner">
                <div className="microLabel">100×</div>
                <div className="microOrg microOrgA" />
                <div className="microOrg microOrgB" />
                <div className="microOrg microOrgC" />
                <div className="microOrg microOrgD" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
