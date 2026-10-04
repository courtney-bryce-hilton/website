import type { Publication } from "../types.ts";
import { renderCitation } from "../lib/citation.tsx";
import { ExternalLink } from "./ExternalLink.tsx";

// Accept either a bare DOI ("10.1000/xyz") or a full https://doi.org/ URL.
// const doiUrl = (doi: string) =>
//   /^https?:\/\//.test(doi) ? doi : `https://doi.org/${doi}`;

interface PublicationItemProps {
  publication: Publication;
}

export function PublicationItem({ publication }: PublicationItemProps) {
  const { citation, pdf, code, data } = publication;

  // Order here is the display order; missing links are dropped.
  const actions = [
    { label: "PDF", href: pdf },
    // { label: "DOI", href: doi && doiUrl(doi) },
    { label: "Code", href: code },
    { label: "Data", href: data },
  ];

  return (
    <li className="list__item">
      <p className="list__citation">{renderCitation(citation)}</p>
      <div className="list__actions">
        {actions.map(
          ({ label, href }) =>
            href && (
              <ExternalLink key={label} href={href}>
                {label}
              </ExternalLink>
            ),
        )}
      </div>
    </li>
  );
}
