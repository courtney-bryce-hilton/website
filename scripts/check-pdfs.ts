/**
 * Fails the build if any publication points at a PDF that isn't in public/,
 * and warns about PDFs in public/pdfs/ that nothing references.
 * Files in public/ are copied verbatim by Vite, so nothing else catches a typo:
 * the link would just 404 in production.
 *
 * Runs with Node's built-in type stripping (Node ≥ 22.18), no extra tooling.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { publications } from '../src/data/publications.ts';

const publicDir = join(import.meta.dirname, '..', 'public');
const pdfDir = join(publicDir, 'pdfs');

const referenced = new Set<string>();
const missing: string[] = [];

for (const pub of publications) {
  if (!pub.pdf) continue;
  referenced.add(pub.pdf.replace(/^\//, ''));
  if (!existsSync(join(publicDir, pub.pdf))) missing.push(`  ${pub.id}: ${pub.pdf}`);
}

const ids = publications.map((p) => p.id);
const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);

const onDisk = existsSync(pdfDir)
  ? readdirSync(pdfDir).filter((f) => f.toLowerCase().endsWith('.pdf'))
  : [];
const orphans = onDisk.filter((f) => !referenced.has(`pdfs/${f}`));

if (orphans.length) {
  console.warn(`Unreferenced PDFs in public/pdfs/ (still deployed):\n  ${orphans.join('\n  ')}`);
}
if (duplicateIds.length) {
  console.error(`Duplicate publication ids: ${[...new Set(duplicateIds)].join(', ')}`);
}
if (missing.length) {
  console.error(`Publications pointing at PDFs that don't exist:\n${missing.join('\n')}`);
}
if (missing.length || duplicateIds.length) process.exit(1);

console.log(`check-pdfs: ${referenced.size} PDF path(s) OK across ${publications.length} publications.`);
