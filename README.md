# Academic site

Vite + React + TypeScript. One page, three scroll-snapped sections: bio, publications (searchable), media coverage.

## Run locally

Requires Node 22.18 or later (`node --version`); the PDF check script relies on Node's built-in TypeScript type stripping.

```bash
npm install
npm run dev          # http://localhost:5173, hot-reloads on save
```

Before deploying:

```bash
npm run build        # checks PDFs, type-checks, bundles to dist/
npm run preview      # serves dist/ exactly as it will be deployed
```

## Where things live

| To change…              | Edit                              |
| ----------------------- | --------------------------------- |
| Name, bio, links, photo | `src/data/profile.ts`             |
| Publications            | `src/data/publications.ts`        |
| Media coverage          | `src/data/media.ts`               |
| Colours, type, spacing  | tokens at the top of `src/index.css` |
| Page title, link previews | `index.html`                    |
| Photo                   | replace `public/photo.svg` (or add `public/photo.jpg` and update `profile.photo`) |
| PDFs                    | `public/pdfs/`                    |

### Adding a publication

1. Drop the PDF in `public/pdfs/`, e.g. `public/pdfs/smith2026.pdf`.
2. Add an entry to `src/data/publications.ts`:

```ts
{
  id: 'smith2026',
  citation: 'Smith, J., & Doe, A. (2026). Title. *Journal Name, 12*(3), 45–67.',
  year: 2026,
  pdf: '/pdfs/smith2026.pdf',
  doi: '10.1234/abcd',          // optional
  keywords: ['DTI', 'lifespan'], // optional: searchable, not shown
},
```

Text between `*asterisks*` renders in italics. `npm run build` fails if a `pdf` path doesn't exist or an `id` is duplicated, and warns about PDFs nothing links to.

## Notes

- Scroll snapping is `mandatory` by default. If it feels too forceful on a trackpad, set `--snap: y proximity;` in `src/index.css`.
- Remove the placeholder `public/pdfs/example.pdf` once you've added real papers.
