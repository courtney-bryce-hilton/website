interface ScrollCueProps {
  target: string;
  label: string;
  /** Which way the section lies; sets the arrow. */
  direction?: "up" | "down";
}

export function ScrollCue({
  target,
  label,
  direction = "down",
}: ScrollCueProps) {
  return (
    <a className="cue" href={`#${target}`}>
      {direction === "up" && <span aria-hidden="true">↑ </span>}
      {label}
      {direction === "down" && <span aria-hidden="true"> ↓</span>}
    </a>
  );
}
