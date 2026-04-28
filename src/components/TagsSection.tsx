import { projects } from '../data/projects';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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

function MagnetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M7 2h4v7a1 1 0 0 1-2 0V4H7V2Zm6 0h4v2h-2v5a1 1 0 0 1-2 0V2Z"
        fill="currentColor"
      />
      <path
        d="M7 10v3a5 5 0 0 0 10 0v-3h2v3a7 7 0 0 1-14 0v-3h2Z"
        fill="currentColor"
      />
      <path
        d="M6.5 10h5v2h-5v-2Zm6 0h5v2h-5v-2Z"
        fill="currentColor"
        opacity=".18"
      />
    </svg>
  );
}

type Chip = {
  id: string;
  label: string;
  href: string;
  className: string;
};

function shuffle<T>(arr: readonly T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function TagsSection() {
  const durations = uniqueDurations();
  const chips: Chip[] = useMemo(() => {
    const topicChips: Chip[] = tags.map((t) => ({
      id: `topic:${t.tag}`,
      label: t.label,
      href: `/#/projects?tag=${t.tag}`,
      className: `tagChip tagChip-${t.tag}`,
    }));

    const timeChips: Chip[] = durations.map((d) => ({
      id: `time:${d}`,
      label: d,
      href: `/#/projects?duration=${encodeURIComponent(d)}`,
      className: `tagChip tagChipTime`,
    }));

    return [...topicChips, ...timeChips];
  }, [durations]);

  const [order, setOrder] = useState<string[]>(() => chips.map((c) => c.id));
  const [repelling, setRepelling] = useState(false);
  const [motion, setMotion] = useState<Record<string, { x: number; y: number; r: number }>>({});
  const [flip, setFlip] = useState<Record<string, { x: number; y: number }>>({});
  const [flipping, setFlipping] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const flipTimeoutRef = useRef<number | null>(null);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastRects = useRef<Record<string, DOMRect>>({});
  const pendingFlip = useRef<null | { nextOrder: string[]; prevRects: Record<string, DOMRect> }>(
    null,
  );
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Keep order in sync if new time tags appear.
    setOrder((prev) => {
      const ids = chips.map((c) => c.id);
      const prevSet = new Set(prev);
      const next = [...prev.filter((id) => ids.includes(id)), ...ids.filter((id) => !prevSet.has(id))];
      return next;
    });
  }, [chips]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (flipTimeoutRef.current) window.clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  function startMagnet() {
    if (repelling) return;
    setRepelling(true);

    const ids = chips.map((c) => c.id);
    const navEl = navRef.current;
    const navRect = navEl?.getBoundingClientRect();

    // Explode away from the tag-cloud center.
    const cx = navRect ? navRect.left + navRect.width / 2 : window.innerWidth / 2;
    const cy = navRect ? navRect.top + navRect.height / 2 : window.innerHeight / 2;

    const next: Record<string, { x: number; y: number; r: number }> = {};
    for (const id of ids) {
      const el = refs.current[id];
      const rect = el?.getBoundingClientRect();
      const ex = rect ? rect.left + rect.width / 2 : cx;
      const ey = rect ? rect.top + rect.height / 2 : cy;

      let vx = ex - cx;
      let vy = ey - cy;
      const len = Math.hypot(vx, vy) || 1;
      vx /= len;
      vy /= len;

      // Add a tiny random wobble so paths differ.
      const wobble = 0.35;
      vx += (Math.random() - 0.5) * wobble;
      vy += (Math.random() - 0.5) * wobble;
      const len2 = Math.hypot(vx, vy) || 1;
      vx /= len2;
      vy /= len2;

      const dist = 180 + Math.random() * 220; // “pretty far”, still on screen after clamping
      let dx = vx * dist;
      let dy = vy * dist;

      // Clamp to viewport bounds so chips stay visible.
      if (rect) {
        const pad = 10;
        const dxMin = -rect.left + pad;
        const dxMax = window.innerWidth - rect.right - pad;
        const dyMin = -rect.top + pad;
        const dyMax = window.innerHeight - rect.bottom - pad;
        dx = Math.max(dxMin, Math.min(dxMax, dx));
        dy = Math.max(dyMin, Math.min(dyMax, dy));
      }

      const r = (Math.random() - 0.5) * 8;
      next[id] = { x: dx, y: dy, r };
    }

    setMotion(next);

    // Phase 1: repel out & back (CSS). Phase 2: FLIP to shuffled order.
    timeoutRef.current = window.setTimeout(() => {
      const prevRects: Record<string, DOMRect> = {};
      for (const id of order) {
        const el = refs.current[id];
        if (el) prevRects[id] = el.getBoundingClientRect();
      }

      const nextOrder = shuffle(order);
      pendingFlip.current = { nextOrder, prevRects };
      setOrder(nextOrder);
      setMotion({});
      setRepelling(false);
    }, 1550);
  }

  // Measure current rects for FLIP bookkeeping.
  useLayoutEffect(() => {
    const rects: Record<string, DOMRect> = {};
    for (const id of order) {
      const el = refs.current[id];
      if (el) rects[id] = el.getBoundingClientRect();
    }
    lastRects.current = rects;
  }, [order]);

  // After order changes (shuffled), animate from previous positions to new positions.
  useLayoutEffect(() => {
    const pending = pendingFlip.current;
    if (!pending) return;
    pendingFlip.current = null;

    const nextRects: Record<string, DOMRect> = {};
    for (const id of pending.nextOrder) {
      const el = refs.current[id];
      if (el) nextRects[id] = el.getBoundingClientRect();
    }

    const inv: Record<string, { x: number; y: number }> = {};
    for (const id of pending.nextOrder) {
      const prev = pending.prevRects[id];
      const next = nextRects[id];
      if (!prev || !next) continue;
      inv[id] = { x: prev.left - next.left, y: prev.top - next.top };
    }

    setFlipping(true);
    setFlip(inv);

    // Next frame: remove transforms so it animates into the new places.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlip({});
        flipTimeoutRef.current = window.setTimeout(() => setFlipping(false), 1500);
      });
    });
  }, [order]);

  const chipsById = useMemo(() => {
    const map = new Map(chips.map((c) => [c.id, c] as const));
    return (id: string) => map.get(id);
  }, [chips]);

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
          <div className="sectionHeaderActions">
            <button
              type="button"
              className={repelling ? 'iconBtn iconBtnActive' : 'iconBtn'}
              onClick={startMagnet}
              aria-label="Repel tags"
              title="Repel tags"
            >
              <MagnetIcon />
            </button>
            <a className="btn btnSecondary" href="/#/projects">
              See all games →
            </a>
          </div>
        </div>

        <nav
          ref={(el) => {
            navRef.current = el;
          }}
          className={[
            'tagList',
            repelling ? 'tagListRepel' : '',
            flipping ? 'tagListFlip' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label="Tags"
        >
          {order.map((id) => {
            const chip = chipsById(id);
            if (!chip) return null;
            const m = motion[id];
            const f = flip[id];
            const style = m || f
              ? ({
                  ['--dx' as any]: `${m?.x ?? 0}px`,
                  ['--dy' as any]: `${m?.y ?? 0}px`,
                  ['--dr' as any]: `${m?.r ?? 0}deg`,
                  ['--fx' as any]: `${f?.x ?? 0}px`,
                  ['--fy' as any]: `${f?.y ?? 0}px`,
                } as React.CSSProperties)
              : undefined;
            return (
              <a
                key={chip.id}
                ref={(el) => {
                  refs.current[chip.id] = el;
                }}
                className={chip.className}
                href={chip.href}
                style={style}
              >
                {chip.label}
              </a>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

