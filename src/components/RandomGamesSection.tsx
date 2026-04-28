import { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

function shuffled<T>(arr: readonly T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function RandomGamesSection() {
  const [seed, setSeed] = useState(0);
  const picks = useMemo(() => {
    const live = projects.filter((p) => p.status !== 'coming-soon');
    return shuffled(live).slice(0, 2);
    // Stable for the session, fresh on each page load.
  }, [seed]);

  const gridClass =
    picks.length === 2
      ? 'projectGrid projectGridTwo'
      : 'projectGrid projectGridCompact';

  return (
    <section
      className="section"
      id="games"
      aria-labelledby="random-games-title"
    >
      <div className="containerNarrow">
        <div className="sectionHeader">
          <div>
            <p className="kicker">Two picks, served warm</p>
            <h2 className="h2" id="random-games-title">
              2 random games
            </h2>
          </div>
          <div className="sectionHeaderActions">
            <p className="sectionSub">
              (The algorithm is <code className="codeNote">Math.random()</code>. No
              personalisation.)
            </p>
            <button
              type="button"
              className="linkButton"
              onClick={() => setSeed((s) => s + 1)}
            >
              Refresh
            </button>
          </div>
        </div>

        <div className={gridClass}>
          {picks.map((p) => (
            <ProjectCard key={`random-${p.title}`} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
