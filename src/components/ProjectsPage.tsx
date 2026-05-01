import { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import type { CanonicalTag } from './TagsSection';

function toSnakeCaseLabel(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseFiltersFromHash(): { tag: CanonicalTag | null; duration: string | null } {
  const hash = window.location.hash || '';
  const idx = hash.indexOf('?');
  if (idx === -1) return { tag: null, duration: null };
  const q = new URLSearchParams(hash.slice(idx + 1));
  const rawTag = q.get('tag');
  const duration = q.get('duration');
  if (
    rawTag === 'ethics' ||
    rawTag === 'philosophy' ||
    rawTag === 'history' ||
    rawTag === 'biology' ||
    rawTag === 'psychology'
  ) {
    return { tag: rawTag, duration };
  }
  return { tag: null, duration };
}

export function ProjectsPage() {
  const initial = (() => {
    if (typeof window === 'undefined') return null;
    return parseFiltersFromHash();
  })();

  const [activeTag, setActiveTag] = useState<CanonicalTag | null>(initial?.tag ?? null);
  const [activeDuration, setActiveDuration] = useState<string | null>(initial?.duration ?? null);

  const durations = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      if (p.status === 'coming-soon') continue;
      if (p.duration) set.add(p.duration);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (activeDuration && p.duration !== activeDuration) return false;
      return true;
    });
  }, [activeDuration, activeTag]);

  return (
    <main className="main">
      <section className="section" aria-labelledby="projects-page-title">
        <div className="containerNarrow">
          <div className="sectionHeader">
            <a
              className="h2 projectsHomeLink"
              id="projects-page-title"
              href="/#/"
              data-analytics-event="button_click"
              data-analytics-label="projects_home_link"
            >
              Home
            </a>
            <p className="sectionSub">
              Short. Playable. One sitting. New ones about once a month.
            </p>
          </div>

          <div className="filterRow" aria-label="Filters">
            <button
              type="button"
              className={
                activeTag === null && activeDuration === null
                  ? 'filterPill filterPillActive'
                  : 'filterPill'
              }
              onClick={() => {
                setActiveTag(null);
                setActiveDuration(null);
              }}
              data-analytics-event="button_click"
              data-analytics-label="projects_filter_all_button"
            >
              all
            </button>
            {(['ethics', 'philosophy', 'history', 'biology', 'psychology'] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={activeTag === t ? 'filterPill filterPillActive' : 'filterPill'}
                onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
                data-analytics-event="button_click"
                data-analytics-label={`projects_filter_tag_${t}_button`}
              >
                {t}
              </button>
            ))}
            {durations.map((d) => (
              <button
                key={d}
                type="button"
                className={
                  activeDuration === d ? 'filterPill filterPillActive' : 'filterPill'
                }
                onClick={() => setActiveDuration((prev) => (prev === d ? null : d))}
                data-analytics-event="button_click"
                data-analytics-label={`projects_filter_duration_${toSnakeCaseLabel(d)}_button`}
              >
                {d}
              </button>
            ))}

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

