import { projects } from '../data/projects';

export type CanonicalTag =
  | 'ethics'
  | 'philosophy'
  | 'history'
  | 'biology'
  | 'psychology';

const tags: { tag: CanonicalTag; label: string }[] = [
  { tag: 'ethics', label: 'ethics' },
  { tag: 'philosophy', label: 'philosophy' },
  { tag: 'history', label: 'history' },
  { tag: 'biology', label: 'biology' },
  { tag: 'psychology', label: 'psychology' },
];

function uniqueDurations(): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    if (p.status === 'coming-soon') continue;
    if (p.duration) set.add(p.duration);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function TagsSection() {
  const durations = uniqueDurations();
  return (
    <section className="section" id="tags" aria-labelledby="tags-title">
      <div className="containerNarrow">
        <div className="sectionHeader">
          <div>
            <h2 className="h2" id="tags-title">
              Tags
            </h2>
            <p className="sectionSub">Pick one.</p>
          </div>
          <a className="btn btnSecondary" href="/#/projects">
            See all games →
          </a>
        </div>

        <nav className="tagList" aria-label="Topic tags">
          {tags.map((t) => (
            <a
              key={t.tag}
              className={`tagChip tagChip-${t.tag}`}
              href={`/#/projects?tag=${t.tag}`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <nav className="tagList tagListSecondary" aria-label="Time tags">
          {durations.map((d) => (
            <a
              key={d}
              className="tagChip tagChipTime"
              href={`/#/projects?duration=${encodeURIComponent(d)}`}
            >
              {d}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

