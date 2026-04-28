import { ExternalLink } from './ExternalLink';

export function ButtonLink({
  href,
  children,
  variant,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
  external?: boolean;
}) {
  const cls =
    variant === 'primary'
      ? 'btn btnPrimary'
      : variant === 'secondary'
        ? 'btn btnSecondary'
        : 'btn btnTertiary';

  if (external) {
    return (
      <ExternalLink className={cls} href={href} ariaLabel="External link">
        {children}
      </ExternalLink>
    );
  }

  return (
    <a className={cls} href={href}>
      {children}
    </a>
  );
}

