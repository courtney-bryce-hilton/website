import type { Publication } from '../types.ts';

/** Lower-case, strip diacritics and citation markup so "Müller" matches "muller". */
export function normalise(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [title](url) -> title, so URLs aren't searchable
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\*/g, '')
    .toLowerCase();
}

export interface Indexed<T> {
  item: T;
  haystack: string;
}

/** Build the searchable text once per publication, not once per keystroke. */
export function indexPublications(pubs: Publication[]): Indexed<Publication>[] {
  return pubs.map((item) => ({
    item,
    haystack: normalise(
      [item.citation, String(item.year), item.doi ?? '', ...(item.keywords ?? [])].join(' '),
    ),
  }));
}

/**
 * Every whitespace-separated term must appear somewhere (AND semantics), in any order.
 * "lifespan 2026" narrows; it doesn't widen.
 */
export function filterIndexed<T>(index: Indexed<T>[], query: string): T[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return index.map((entry) => entry.item);
  return index
    .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
    .map((entry) => entry.item);
}
