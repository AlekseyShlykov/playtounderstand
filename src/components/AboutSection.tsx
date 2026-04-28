import { ExternalLink } from './ui/ExternalLink';

export function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="containerNarrow">
        <p className="kicker">About</p>
        <h2 className="h2" id="about-title">
          Hi, I’m Alex Shlykov.
        </h2>
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
    </section>
  );
}
