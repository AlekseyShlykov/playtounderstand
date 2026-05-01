export function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
  analyticsEvent,
  analyticsLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  analyticsEvent?: string;
  analyticsLabel?: string;
}) {
  return (
    <a
      className={className ?? 'link'}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      data-analytics-event={analyticsEvent}
      data-analytics-label={analyticsLabel}
    >
      {children}
    </a>
  );
}

