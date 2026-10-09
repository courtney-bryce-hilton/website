import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Pin a section to the viewport while the page scrolls through its list.
 *
 * The section is made `100svh + overflow` tall, with a sticky stage inside it.
 * As the page scrolls through that extra height, the list's own scrollTop is
 * driven to match, so the heading and search stay put while the entries glide
 * past. Once the list has reached its end the stage unpins and the page moves on.
 *
 * `watch` should change whenever the list's contents do (e.g. search results).
 */
export function usePinnedScroll(
  section: RefObject<HTMLElement | null>,
  list: RefObject<HTMLElement | null>,
  watch?: unknown,
) {
  // When the list's contents change (a new search), the section's height changes
  // too. If the page is scrolled partway through the pinned stretch, shrinking the
  // section would make the browser clamp the scroll position and the content jump.
  // Instead, return to the start of the section first, so the new results show
  // from their top, and the height can change without anything moving.
  const mounted = useRef(false);
  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const top = section.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top, behavior: "instant" });
  }, [section, watch]);

  useLayoutEffect(() => {
    const sectionEl = section.current;
    const listEl = list.current;
    if (!sectionEl || !listEl) return;

    let overflow = 0;
    let frame = 0;

    const progress = () =>
      Math.min(Math.max(-sectionEl.getBoundingClientRect().top, 0), overflow);

    let synced = -1;

    const sync = () => {
      frame = 0;
      listEl.scrollTop = progress();
      synced = listEl.scrollTop;
    };

    const measure = () => {
      overflow = Math.max(0, listEl.scrollHeight - listEl.clientHeight);
      sectionEl.style.height = `calc(100svh + ${overflow}px)`;
      sync();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    // Keyboard focus can scroll the (overflow: hidden) list on its own; move the
    // page by the same amount so the two stay in step.
    const onListScroll = () => {
      if (listEl.scrollTop === synced) return;
      const diff = listEl.scrollTop - progress();
      if (Math.abs(diff) > 1)
        window.scrollBy({ top: diff, behavior: "instant" });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(listEl);
    if (listEl.firstElementChild) observer.observe(listEl.firstElementChild);

    window.addEventListener("scroll", onScroll, { passive: true });
    listEl.addEventListener("scroll", onListScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      listEl.removeEventListener("scroll", onListScroll);
      cancelAnimationFrame(frame);
    };
  }, [section, list, watch]);
}
