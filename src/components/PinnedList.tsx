import { useRef, type ReactNode } from "react";
import { usePinnedScroll } from "../lib/usePinnedScroll.ts";

interface PinnedListProps {
  id: string;
  heading: string;
  /** Changes whenever the list's contents do (e.g. search results). */
  watch?: unknown;
  /** Rendered between the heading and the list, e.g. a search box. */
  controls?: ReactNode;
  /** Rendered below the list, e.g. a scroll cue. */
  footer?: ReactNode;
  /** The list itself (or an empty-state message). */
  children: ReactNode;
}

/** A full-height section whose list scrolls while the heading stays pinned. */
export function PinnedList({
  id,
  heading,
  watch,
  controls,
  footer,
  children,
}: PinnedListProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  usePinnedScroll(sectionRef, listRef, watch);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="pin"
      aria-labelledby={`${id}-heading`}
    >
      <div className="pin__stage">
        <div className="container">
          <h2 id={`${id}-heading`} className="section__heading">
            {heading}
          </h2>
          {controls}
          <div ref={listRef} className="list-pinned">
            {children}
          </div>
          {footer}
        </div>
      </div>
    </section>
  );
}
