type OutboundEventName = 'patreon_click' | 'substack_click';

function isAnchor(el: Element | null): el is HTMLAnchorElement {
  return !!el && el.tagName === 'A';
}

function getBlock(el: Element): string {
  const block =
    el.closest<HTMLElement>('[data-block]')?.dataset.block ??
    el.closest<HTMLElement>('section[id]')?.id ??
    el.closest<HTMLElement>('[data-analytics-label]')?.dataset.analyticsLabel ??
    'unknown';
  return block || 'unknown';
}

function getAnchorFromEventTarget(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const a = target.closest('a');
  return isAnchor(a) ? a : null;
}

function getSubstackCtaFromEventTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>('[data-substack-cta]');
}

function getHostname(href: string): string | null {
  try {
    return new URL(href, window.location.href).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function getLinkText(el: Element): string {
  const a = isAnchor(el) ? el : null;
  const text = (
    (el as HTMLElement).innerText ||
    el.textContent ||
    a?.getAttribute('aria-label') ||
    el.getAttribute('aria-label') ||
    ''
  ).trim();
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

export function trackSubstackClick(element: Element, linkUrl: string) {
  const key = `substack_click::${linkUrl}`;
  const now = Date.now();
  const last = recentClicks.get(key) ?? 0;
  if (now - last < RECENT_CLICK_WINDOW_MS) return;
  recentClicks.set(key, now);

  const payload = {
    link_url: linkUrl,
    link_text: getLinkText(element),
    block: getBlock(element),
  };

  // Temporary debugging (remove once validated in GA4 Realtime).
  // eslint-disable-next-line no-console
  console.log('[analytics] substack_click', payload);

  window.gtag?.('event', 'substack_click', payload);
}

export function initOutboundClickTracking() {
  const handler = (e: MouseEvent) => {
    const a = getAnchorFromEventTarget(e.target);
    if (!a) {
      // Non-link CTAs that open the subscription form (e.g. modal open buttons).
      const cta = getSubstackCtaFromEventTarget(e.target);
      if (!cta) return;
      const url =
        cta.dataset.substackUrl ||
        (cta instanceof HTMLAnchorElement ? cta.href : '') ||
        window.location.href;
      trackSubstackClick(cta, url);
      return;
    }

    const isPatreon = isPatreonLink(a);
    const isSubstack = isSubstackLink(a) || a.href.toLowerCase().includes('substack');
    if (!isPatreon && !isSubstack) return;

    const eventName: OutboundEventName = isPatreon ? 'patreon_click' : 'substack_click';

    // If we can rely on a new tab (or modified click), just fire-and-forget.
    if (shouldLetBrowserOpenImmediately(e, a)) {
      if (eventName === 'substack_click') trackSubstackClick(a, a.href);
      else trackOutboundClick(eventName, a);
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

    if (eventName === 'substack_click') {
      const payload = {
        link_url: href,
        link_text: getLinkText(a),
        block: getBlock(a),
        event_callback: finish,
      };
      // eslint-disable-next-line no-console
      console.log('[analytics] substack_click', {
        link_url: payload.link_url,
        link_text: payload.link_text,
        block: payload.block,
      });
      window.gtag?.('event', 'substack_click', payload);
    } else {
      window.gtag?.('event', eventName, {
        link_url: href,
        link_text: getLinkText(a),
        event_callback: finish,
      });
    }

    window.setTimeout(finish, 180);
  };

  // Capture phase helps ensure we run before navigation.
  document.addEventListener('click', handler, { capture: true });

  return () => document.removeEventListener('click', handler, { capture: true } as any);
}

