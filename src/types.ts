export type ProfileLinkIcon = "github" | "bluesky" | "email" | "scholar" | "cv";

export interface Profile {
  name: string;
  /** One line under the name, e.g. field and institution. */
  affiliation: string;
  /** Bio paragraphs, rendered in order. */
  bio: string[];
  /** Path to an image in /public, e.g. "/photo.jpg". Omit to hide the photo. */
  photo?: string;
  /** Describe the photo for screen readers, e.g. "Portrait of Courtney". */
  photoAlt?: string;
  /**
   * Icon links under the bio. `label` is the hover text and screen-reader name;
   * `icon` picks the Font Awesome icon.
   */
  links: { label: string; href: string; icon: ProfileLinkIcon }[];
}

export interface Publication {
  /** Stable, unique key, e.g. "smith2024". Also a sensible PDF filename stem. */
  id: string;
  /**
   * Pre-formatted citation string. Wrap text in *asterisks* to italicise it
   * (journal names, volume numbers).
   */
  citation: string;
  year: number;
  /** Path under /public, e.g. "/pdfs/smith2024.pdf". Checked at build time. */
  pdf?: string;
  /** Bare DOI, e.g. "10.1000/xyz123". Rendered as a doi.org link. */
  doi?: string;
  /** Full URL to the code repository, e.g. "https://github.com/user/repo". */
  code?: string;
  /** Full URL to the dataset, e.g. "https://osf.io/abc12". */
  data?: string;
  /** Extra search terms that are matched but never displayed. */
  keywords?: string[];
}

export interface MediaItem {
  title: string;
  outlet: string;
  /** "YYYY-MM" or "YYYY-MM-DD". */
  date: string;
  url: string;
}
