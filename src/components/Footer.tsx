import { ExternalLink } from './ui/ExternalLink';

export function Footer() {
  return (
    <footer className="footer">
      <div className="containerNarrow footerInner">
        <div>
          <p className="footerBrand">Play to Understand</p>
          <p className="small muted">Small games. Big ideas. Slightly stubborn.</p>
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
