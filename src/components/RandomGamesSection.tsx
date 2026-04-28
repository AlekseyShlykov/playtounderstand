import { useMemo } from 'react';
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
  const picks = useMemo(() => {
    const live = projects.filter((p) => p.status !== 'coming-soon');
    return shuffled(live).slice(0, 3);
    // Stable for the session, fresh on each page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section" aria-labelledby="random-games-title">
      <div className="container">
        <div className="sectionHeader">
          <div>
            <p className="kicker">Three picks, served warm</p>
            <h2 className="h2" id="random-games-title">
              3 random games
            </h2>
          </div>
          <p className="sectionSub">
            Refresh the page for a different trio. (The algorithm is{' '}
            <code className="codeNote">Math.random()</code>. No personalisation.)
          </p>
        </div>

        <div className="projectGrid projectGridCompact">
          {picks.map((p) => (
            <ProjectCard key={`random-${p.title}`} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
