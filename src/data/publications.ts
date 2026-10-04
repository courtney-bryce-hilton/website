import type { Publication } from "../types.ts";
import publication_data from "./publications.json" with { type: "json" };

// Edit publications.json; the list is sorted by year (newest first) on render.
// Drop the PDF into public/pdfs/ and reference it as "/pdfs/<file>.pdf".
export const publications: Publication[] = publication_data;
