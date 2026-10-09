import { useRef } from "react";
import { Bio } from "./sections/Bio.tsx";
import { Media } from "./sections/Media.tsx";
import { Publications } from "./sections/Publications.tsx";
import { useCueFade } from "./lib/useCueFade.ts";

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  useCueFade(mainRef);

  return (
    <main ref={mainRef}>
      <Bio />
      <Publications />
      <Media />
    </main>
  );
}
