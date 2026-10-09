import { useEffect, type RefObject } from "react";

// How far short of fully landed (as a fraction of viewport height) the cues
// start to fade in. 0 waits for the section to land exactly; keep it well below 0.5.
const LEAD = 0.25;

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/**
 * Fade each section's scroll cues as the page moves between sections.
 *
 * Each child of `container` gets two signals:
 * - `--cue-opacity`, linked to the scroll position: the cues fade out over the
 *   first half of a transition away from the section.
 * - `data-landed`, set once the section fills the viewport and cleared when it
 *   has mostly gone. CSS fades the cues in (after a short delay) when it is set,
 *   so they only appear once the section has been landed on.
 */
export function useCueFade(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sections = Array.from(container.current?.children ?? []).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const half = window.innerHeight / 2;
      for (const el of sections) {
        const { top, bottom } = el.getBoundingClientRect();
        el.style.setProperty(
          "--cue-opacity",
          String(clamp((bottom - half) / half)),
        );
        const lead = window.innerHeight * LEAD + 1;
        if (top <= lead && bottom >= window.innerHeight - lead) {
          el.dataset.landed = "";
        } else if (top >= half || bottom <= half) {
          delete el.dataset.landed;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [container]);
}
