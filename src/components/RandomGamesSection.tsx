import { useEffect, useMemo, useRef, useState } from 'react';
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

function pickTwo(live: typeof projects) {
  return shuffled(live).slice(0, 2);
}

function tileImgSrc(p: (typeof projects)[number]) {
  return p.image;
}

export function RandomGamesSection() {
  const live = useMemo(
    () => projects.filter((p) => p.status !== 'coming-soon'),
    [],
  );
  const [picks, setPicks] = useState(() => pickTwo(live));
  const [shuffling, setShuffling] = useState(false);
  const [reel, setReel] = useState(() => shuffled(live).concat(shuffled(live)));
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const gridClass =
    picks.length === 2
      ? 'projectGrid projectGridTwo'
      : 'projectGrid projectGridCompact';

  function onShuffle() {
    if (shuffling) return;
    setShuffling(true);

    // Build a fast-moving reel (duplicates allowed).
    const nextReel = Array.from({ length: 10 }, () => live[Math.floor(Math.random() * live.length)]);
    setReel(nextReel);

    timeoutRef.current = window.setTimeout(() => {
      setPicks(pickTwo(live));
      setShuffling(false);
    }, 1100);
  }

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
              onClick={onShuffle}
              disabled={shuffling}
            >
              Shuffle
            </button>
          </div>
        </div>

        <div className="shuffleStage">
          {shuffling ? (
            <div className="shuffleReel" aria-hidden="true">
              {reel.map((p, idx) => (
                <div key={`${p.title}-${idx}`} className="shuffleTile">
                  <img className="shuffleTileImg" src={tileImgSrc(p)} alt="" />
                  <div className="shuffleTileMeta">
                    <div className="shuffleTileTitle">{p.title}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className={shuffling ? `${gridClass} shuffleDim` : gridClass}>
            {picks.map((p) => (
              <ProjectCard key={`random-${p.title}`} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
