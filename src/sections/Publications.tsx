import { useMemo, useState } from "react";
import { publications } from "../data/publications.ts";
import { filterIndexed, indexPublications } from "../lib/search.ts";
import { PinnedList } from "../components/PinnedList.tsx";
import { PublicationItem } from "../components/PublicationItem.tsx";
import { ScrollCue } from "../components/ScrollCue.tsx";
import { SearchBox } from "../components/SearchBox.tsx";

// Data is static, so sort and index once at module load rather than per render.
const sorted = [...publications].sort((a, b) => b.year - a.year);
const index = indexPublications(sorted);

export function Publications() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterIndexed(index, query), [query]);
  const searching = query.trim().length > 0;

  return (
    <PinnedList
      id="publications"
      heading="Publications"
      watch={results}
      controls={
        <SearchBox
          id="pub-search"
          value={query}
          onChange={setQuery}
          placeholder="Search by title, author, or year (^ indicates co-first authorship)"
          status={searching ? `${results.length} of ${sorted.length}` : ""}
        />
      }
      header={
        <div className="cues cues--top">
          <ScrollCue target="about" label="Home" direction="up" />
        </div>
      }
      footer={
        <div className="cues">
          <ScrollCue target="media" label="Media Coverage" />
        </div>
      }
    >
      {results.length > 0 ? (
        <ul className="list">
          {results.map((pub) => (
            <PublicationItem key={pub.id} publication={pub} />
          ))}
        </ul>
      ) : (
        <p className="empty">
          Nothing matches “{query.trim()}”. Try fewer words or a different
          spelling.
        </p>
      )}
    </PinnedList>
  );
}
