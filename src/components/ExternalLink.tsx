import type { AnchorHTMLAttributes } from "react";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
>;

/** A link that opens in a new tab, and says so to screen readers. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
