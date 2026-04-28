import type { Project } from '../data/projects';

function svgToDataUrl(svg: string) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

export function ProjectCard({ project }: { project: Project }) {
  const isComingSoon = project.status === 'coming-soon';
  const imgSrc = project.image || (project.imageSvg ? svgToDataUrl(project.imageSvg) : '');

  const content = (
    <>
      <div className="cardMedia" aria-hidden="true">
        <img className="cardImg" src={imgSrc} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="cardBody">
        <div className="cardTop">
          <h3 className="h3">{project.title}</h3>
          {project.duration ? (
            <span className="badge" aria-label="Estimated duration">
              {project.duration}
            </span>
          ) : null}
        </div>

        <p className="cardDesc">{project.description}</p>

        <ul className="tagRow" aria-label="Topics">
          {project.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        {isComingSoon ? (
          <div className="cardActions">
            <span className="muted">Placeholder for now.</span>
          </div>
        ) : null}
      </div>
    </>
  );

  if (isComingSoon) {
    return (
      <article className="card" aria-label={project.title}>
        {content}
      </article>
    );
  }

  return (
    <a
      className="card cardLink"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
    >
      {content}
    </a>
  );
}

