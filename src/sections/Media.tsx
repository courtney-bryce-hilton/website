import { media } from "../data/media.ts";
import { MediaItem } from "../components/MediaItem.tsx";
import { PinnedList } from "../components/PinnedList.tsx";

const items = [...media].sort((a, b) => b.date.localeCompare(a.date));

export function Media() {
  return (
    <PinnedList id="media" heading="Media coverage">
      <ul className="list">
        {items.map((item) => (
          <MediaItem key={item.url + item.title} item={item} />
        ))}
      </ul>
    </PinnedList>
  );
}
