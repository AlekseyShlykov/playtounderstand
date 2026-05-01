type OutboundEventName = 'patreon_click' | 'substack_click';

function isAnchor(el: Element | null): el is HTMLAnchorElement {
  return !!el && el.tagName === 'A';
}

function getAnchorFromEventTarget(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const a = target.closest('a');
  return isAnchor(a) ? a : null;
}

function getHostname(href: string): string | null {
  try {
    return new URL(href, window.location.href).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function getLinkText(a: HTMLAnchorElement): string {
  const text = (a.innerText || a.textContent || a.getAttribute('aria-label') || '').trim();
  return text || '—';
}

function isPatreonLink(a: HTMLAnchorElement): boolean {
  const host = getHostname(a.href);
  return !!host && (host === 'patreon.com' || host.endsWith('.patreon.com'));
}

function isSubstackLink(a: HTMLAnchorElement): boolean {
  const host = getHostname(a.href);
  return !!host && (host === 'substack.com' || host.endsWith('.substack.com'));
}

function shouldLetBrowserOpenImmediately(e: MouseEvent, a: HTMLAnchorElement): boolean {
  // New-tab intents: don't delay navigation.
  if (a.target === '_blank') return true;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return true;
  if (e.button && e.button !== 0) return true; // middle/right click
  return false;
}

const RECENT_CLICK_WINDOW_MS = 1200;
const recentClicks = new Map<string, number>();

export function trackOutboundClick(eventName: OutboundEventName, element: HTMLAnchorElement) {
  const href = element.href;
  const key = `${eventName}::${href}`;
  const now = Date.now();
  const last = recentClicks.get(key) ?? 0;
  if (now - last < RECENT_CLICK_WINDOW_MS) return;
  recentClicks.set(key, now);

  window.gtag?.('event', eventName, {
    link_url: href,
    link_text: getLinkText(element),
  });
}

export function initOutboundClickTracking() {
  const handler = (e: MouseEvent) => {
    const a = getAnchorFromEventTarget(e.target);
    if (!a) return;

    let eventName: OutboundEventName | null = null;
    if (isPatreonLink(a)) eventName = 'patreon_click';
    else if (isSubstackLink(a)) eventName = 'substack_click';
    else return;

    // If we can rely on a new tab (or modified click), just fire-and-forget.
    if (shouldLetBrowserOpenImmediately(e, a)) {
      trackOutboundClick(eventName, a);
      return;
    }

    // Same-tab navigation: prevent default and use GA callback + small delay.
    e.preventDefault();
    const href = a.href;

    const navigate = () => {
      window.location.href = href;
    };

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      navigate();
    };

    window.gtag?.('event', eventName, {
      link_url: href,
      link_text: getLinkText(a),
      event_callback: finish,
    });

    window.setTimeout(finish, 180);
  };

  // Capture phase helps ensure we run before navigation.
  document.addEventListener('click', handler, { capture: true });

  return () => document.removeEventListener('click', handler, { capture: true } as any);
}

