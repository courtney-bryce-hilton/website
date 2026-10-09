import type { MediaItem as MediaItemData } from "../types.ts";
import { ExternalLink } from "./ExternalLink.tsx";

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

interface MediaItemProps {
  item: MediaItemData;
}

export function MediaItem({ item }: MediaItemProps) {
  const { title, outlet, date, url } = item;

  return (
    <li className="list__item list__item--media">
      <ExternalLink className="media-link" href={url}>
        <span className="media-link__title">{title}</span>
        <span className="media-link__meta">
          <span className="media-link__outlet">{outlet}</span>,{" "}
          {formatDate(date)}
        </span>
      </ExternalLink>
      <span className="list__actions" aria-hidden="true">
        ↗
      </span>
    </li>
  );
}
