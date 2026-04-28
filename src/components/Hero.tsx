import { ButtonLink } from './ui/ButtonLink';

export function Hero() {
  return (
    <header className="hero">
      <div className="containerNarrow">
        <div className="heroCopy">
          <h1 className="heroTitle">Play to Understand</h1>
          <p className="heroSubtitle">A small hub for learning through play.</p>

          <p className="lede heroLede">
            Small games about big ideas.{' '}
            <span className="muted">(Yes, like the explorables hub. Smaller. Slower.)</span>
          </p>
          <p className="sectionSub heroBody">
            New games drop about once a month — not more, sometimes less, because
            life is not a content calendar. Subscribe if you want a heads-up.
          </p>

          <div className="ritual" aria-label="How it works">
            <p className="kicker ritualKicker">The ritual</p>
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

          <p className="aside">Probably better than doomscrolling.</p>

          <div className="heroCtas">
            <ButtonLink href="/#/projects" variant="primary">
              See games →
            </ButtonLink>
            <ButtonLink href="#subscribe" variant="secondary">
              Subscribe (monthly‑ish)
            </ButtonLink>
            <ButtonLink
              href="https://patreon.com/buildtounderstand"
              variant="tertiary"
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
