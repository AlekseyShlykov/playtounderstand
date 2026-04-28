import { ExternalLink } from './ui/ExternalLink';

export function SubscribeSection() {
  return (
    <section
      className="section sectionAlt"
      id="subscribe"
      aria-labelledby="subscribe-title"
    >
      <div className="containerNarrow">
        <div className="subscribeCard">
          <div className="subscribeCopy">
            <p className="kicker">Stay in the loop</p>
            <h2 className="h2" id="subscribe-title">
              Get the next game by email.
            </h2>
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
        </div>
      </div>
    </section>
  );
}
