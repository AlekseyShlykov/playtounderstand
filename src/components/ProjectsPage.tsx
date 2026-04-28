import { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import type { CanonicalTag } from './TagsSection';
import { ButtonLink } from './ui/ButtonLink';

function parseTagFromHash(): CanonicalTag | null {
  const hash = window.location.hash || '';
  const idx = hash.indexOf('?');
  if (idx === -1) return null;
  const q = new URLSearchParams(hash.slice(idx + 1));
  const raw = q.get('tag');
  if (
    raw === 'ethics' ||
    raw === 'philosophy' ||
    raw === 'history' ||
    raw === 'biology' ||
    raw === 'psychology'
  ) {
    return raw;
  }
  return null;
}

export function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<CanonicalTag | null>(() => {
    if (typeof window === 'undefined') return null;
    return parseTagFromHash();
  });

  const filtered = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <main className="main">
      <section className="section" aria-labelledby="projects-page-title">
        <div className="containerNarrow">
          <div className="sectionHeader">
            <h2 className="h2" id="projects-page-title">
              Games
            </h2>
            <p className="sectionSub">
              Short. Playable. One sitting. New ones about once a month.
            </p>
          </div>

          <div className="filterRow" aria-label="Filter by tag">
            <button
              type="button"
              className={activeTag === null ? 'filterPill filterPillActive' : 'filterPill'}
              onClick={() => setActiveTag(null)}
            >
              all
            </button>
            {(['ethics', 'philosophy', 'history', 'biology', 'psychology'] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={activeTag === t ? 'filterPill filterPillActive' : 'filterPill'}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}

            <div className="filterRight">
              <ButtonLink href="/#/" variant="tertiary">
                Back home
              </ButtonLink>
            </div>
          </div>

          <div className="projectGrid">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

