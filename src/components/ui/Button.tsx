export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn btnPrimary" {...props}>
      {children}
    </button>
  );
}

