import { Bio } from "./sections/Bio.tsx";
import { Media } from "./components/Media.tsx";
import { Publications } from "./components/Publications.tsx";

export default function App() {
  return (
    <main>
      <Bio />
      <Publications />
      <Media />
    </main>
  );
}
