import { Fragment, type ReactNode } from "react";

const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** Turn "**bold**" and "*italic*" segments into <strong> and <em>. */
function renderEmphasis(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

/**
 * Render a citation string without dangerouslySetInnerHTML. Supports:
 *   [text](https://…)  a link, always opened in a new tab
 *   **text**           bold
 *   *text*             italic (also works inside a link's text)
 */
export function renderCitation(citation: string): ReactNode[] {
  // With two capture groups, split yields [text, label, url, text, label, url, …, text].
  const parts = citation.split(LINK);
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    out.push(<Fragment key={`t${i}`}>{renderEmphasis(parts[i])}</Fragment>);
    if (i + 2 < parts.length) {
      out.push(
        <a
          key={`l${i}`}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderEmphasis(parts[i + 1])}
        </a>,
      );
    }
  }
  return out;
}
