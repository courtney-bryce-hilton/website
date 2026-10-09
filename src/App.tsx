import { Bio } from "./sections/Bio.tsx";
import { Media } from "./sections/Media.tsx";
import { Publications } from "./sections/Publications.tsx";

export default function App() {
  return (
    <main>
      <Bio />
      <Publications />
      <Media />
    </main>
  );
}
