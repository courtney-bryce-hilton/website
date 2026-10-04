interface ScrollCueProps {
  target: string;
  label: string;
}

export function ScrollCue({ target, label }: ScrollCueProps) {
  return (
    <a className="cue" href={`#${target}`}>
      {label} <span aria-hidden="true">↓</span>
    </a>
  );
}
