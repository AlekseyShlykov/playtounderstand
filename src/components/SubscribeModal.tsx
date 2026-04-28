import { useEffect, useRef } from 'react';

export function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe"
      >
        <div className="modalHeader">
          <p className="modalTitle">New game alerts</p>
          <button
            ref={closeRef}
            type="button"
            className="modalClose"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modalBody">
          <iframe
            title="Subscribe via Substack"
            src="https://buildtounderstand.substack.com/embed"
            width="480"
            height="320"
            loading="lazy"
            className="substackFrame"
          />
          <p className="small muted modalNote">
            About once a month. Sometimes less. Never more. Also includes my
            notes on the games.
          </p>
        </div>
      </div>
    </div>
  );
}

