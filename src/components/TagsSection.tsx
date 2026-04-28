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

export function TagsSection() {
  return (
    <section className="section" id="tags" aria-labelledby="tags-title">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="h2" id="tags-title">
            Tags
          </h2>
          <p className="sectionSub">Pick one.</p>
        </div>

        <nav className="tagList" aria-label="Tags">
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
      </div>
    </section>
  );
}

