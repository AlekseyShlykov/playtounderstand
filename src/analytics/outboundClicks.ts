type OutboundEventName = 'patreon_click' | 'substack_click';

function getOutboundEventName(anchor: HTMLAnchorElement): OutboundEventName | null {
  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (host === 'patreon.com' || host.endsWith('.patreon.com')) return 'patreon_click';
  if (host === 'substack.com' || host.endsWith('.substack.com')) return 'substack_click';
  return null;
}

export function trackOutboundClick(eventName: OutboundEventName, element: HTMLAnchorElement) {
  const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
  if (typeof gtagFn !== 'function') return;

  const link_url = element.href;
  const link_text = (element.textContent ?? '').trim();

  gtagFn('event', eventName, {
    link_url,
    link_text,
  });
}

function shouldDelayNavigation(e: MouseEvent, anchor: HTMLAnchorElement) {
  if (e.defaultPrevented) return false;
  if (e.button !== 0) return false; // not a left click
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false; // user intends new tab/window/etc

  const target = (anchor.getAttribute('target') || '').toLowerCase();
  if (target === '_blank') return false;

  return true;
}

export function initOutboundClickTracking() {
  const w = window as any;
  if (w.__outboundClickTrackingInstalled) return;
  w.__outboundClickTrackingInstalled = true;

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const eventName = getOutboundEventName(anchor);
      if (!eventName) return;

      const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
      if (typeof gtagFn !== 'function') return;

      const link_url = anchor.href;
      const link_text = (anchor.textContent ?? '').trim();

      if (!shouldDelayNavigation(e, anchor)) {
        gtagFn('event', eventName, { link_url, link_text });
        return;
      }

      // Ensure the hit is sent before navigating away.
      e.preventDefault();
      let navigated = false;
      const href = anchor.href;

      const navigate = () => {
        if (navigated) return;
        navigated = true;
        window.location.assign(href);
      };

      const fallback = window.setTimeout(navigate, 180);

      gtagFn('event', eventName, {
        link_url,
        link_text,
        event_callback: () => {
          window.clearTimeout(fallback);
          navigate();
        },
      });
    },
    { capture: true },
  );
}

