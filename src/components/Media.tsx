import { useRef } from "react";
import { media } from "../data/media.ts";
import { usePinnedScroll } from "../lib/usePinnedScroll.ts";

const monthYear = new Intl.DateTimeFormat("en-AU", {
  month: "long",
  year: "numeric",
});

function formatDate(date: string): string {
  // Append a day so "2026-03" parses; noon UTC avoids timezone rollover.
  const parsed = new Date(
    `${date.length === 7 ? `${date}-01` : date}T12:00:00Z`,
  );
  return Number.isNaN(parsed.getTime()) ? date : monthYear.format(parsed);
}

export function Media() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  usePinnedScroll(sectionRef, listRef);
  const items = [...media].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section
      ref={sectionRef}
      id="media"
      className="pin"
      aria-labelledby="media-heading"
    >
      <div className="pin__stage">
        <div className="container">
          <h2 id="media-heading" className="section__heading">
            Media coverage
          </h2>
          <div ref={listRef} className="list-pinned">
            <ul className="list">
              {items.map((item) => (
                <li
                  key={item.url + item.title}
                  className="list__item list__item--media"
                >
                  <a
                    className="media-link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="media-link__title">{item.title}</span>
                    <span className="media-link__meta">
                      {item.outlet}, {formatDate(item.date)}
                    </span>
                    <span className="visually-hidden">
                      {" "}
                      (opens in a new tab)
                    </span>
                  </a>
                  <span className="list__actions" aria-hidden="true">
                    ↗
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
