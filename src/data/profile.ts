import type { Profile } from "../types.ts";

export const profile: Profile = {
  name: "Courtney B. Hilton",
  affiliation: "ARC DECRA Fellow in Psychology, University of Melbourne",
  bio: [
    "G'day! I am a cognitive scientist. My research asks how the world we grow up in shapes the way we perceive, think, and behave. I also specialise in collecting global datasets with citizen science.",
    "While grounded in cognitive psychology, my work spans disciplines including developmental science, social psychology, neuroscience, anthropology, human-computer interaction, and data science.",
  ],
  photo: "/courtney-headshot.jpg",
  photoAlt: "Headshot photo of Courtney B. Hilton",
  links: [
    {
      icon: "email",
      label: "Email",
      href: "mailto:courtney.hilton@unimelb.edu.au",
    },
    {
      icon: "scholar",
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=egRtkI0AAAAJ&hl",
    },
    {
      icon: "github",
      label: "GitHub",
      href: "https://github.com/courtney-bryce-hilton",
    },
    {
      icon: "bluesky",
      label: "Bluesky",
      href: "https://bsky.app/profile/courtneybhilton.bsky.social",
    },
    { icon: "cv", label: "CV", href: "/cv.pdf" },
  ],
};
