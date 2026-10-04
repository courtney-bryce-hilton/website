import { useMemo, useRef, useState } from "react";
import { publications } from "../data/publications.ts";
import { filterIndexed, indexPublications } from "../lib/search.ts";
import { renderCitation } from "../lib/citation.tsx";
import { usePinnedScroll } from "../lib/usePinnedScroll.ts";
import { ScrollCue } from "./ScrollCue.tsx";

// Data is static, so sort and index once at module load rather than per render.
const sorted = [...publications].sort((a, b) => b.year - a.year);
const index = indexPublications(sorted);

// Accept either a bare DOI ("10.1000/xyz") or a full https://doi.org/ URL.
// const doiUrl = (doi: string) =>
//   /^https?:\/\//.test(doi) ? doi : `https://doi.org/${doi}`;

export function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterIndexed(index, query), [query]);
  usePinnedScroll(sectionRef, listRef, results);
  const searching = query.trim().length > 0;

  return (
    <section
      ref={sectionRef}
      id="publications"
      className="pin"
      aria-labelledby="publications-heading"
    >
      <div className="pin__stage">
        <div className="container">
          <h2 id="publications-heading">Publications</h2>

          <div className="search">
            <input
              id="pub-search"
              className="search__input"
              type="search"
              placeholder="Search by title, author, or year (^ indicates co-first authorship)"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p className="search__count" aria-live="polite">
              {searching ? `${results.length} of ${sorted.length}` : ""}
            </p>
          </div>

          <div ref={listRef} className="list-pinned">
            {results.length > 0 ? (
              <ul className="list">
                {results.map((pub) => (
                  <li key={pub.id} className="list__item">
                    <p className="list__citation">
                      {renderCitation(pub.citation)}
                    </p>
                    <div className="list__actions">
                      {pub.pdf && (
                        <a
                          href={pub.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          PDF
                        </a>
                      )}
                      {/* {pub.doi && (
                        <a
                          href={doiUrl(pub.doi)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          DOI
                        </a>
                      )} */}
                      {pub.code && (
                        <a
                          href={pub.code}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code
                        </a>
                      )}
                      {pub.data && (
                        <a
                          href={pub.data}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Data
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">
                Nothing matches “{query.trim()}”. Try fewer words or a different
                spelling.
              </p>
            )}
          </div>

          <ScrollCue target="media" label="Media coverage" />
        </div>
      </div>
    </section>
  );
}
