import { ExternalLink } from './ExternalLink';

export function ButtonLink({
  href,
  children,
  variant,
  external,
  analyticsEvent,
  analyticsLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
  external?: boolean;
  analyticsEvent?: string;
  analyticsLabel?: string;
}) {
  const cls =
    variant === 'primary'
      ? 'btn btnPrimary'
      : variant === 'secondary'
        ? 'btn btnSecondary'
        : 'btn btnTertiary';

  if (external) {
    return (
      <ExternalLink
        className={cls}
        href={href}
        ariaLabel="External link"
        analyticsEvent={analyticsEvent}
        analyticsLabel={analyticsLabel}
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <a
      className={cls}
      href={href}
      data-analytics-event={analyticsEvent}
      data-analytics-label={analyticsLabel}
    >
      {children}
    </a>
  );
}

