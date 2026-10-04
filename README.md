# My personal / academic website

Made with Vite + React + TypeScript. Currently hosted as `https://courtney-b-hilton.netlify.app/` but I should probably actually just pay for a proper domain.

## Run locally

Requires Node 22.18 or later (the PDF check script relies on Node's built-in TypeScript type stripping).

To run locally:

```bash
npm install
npm run dev
```

Test before deploying:

```bash
npm run build        # checks PDFs, type-checks, bundles to dist/
npm run preview      # serves dist/ exactly as it will be deployed
```

### Adding / updating publications

As usual, all the data for this is based on my `cv_data` Google Sheet. NOTE: I shoudl probably better automate / streamline the updating process here at some point.

1. Update `cv_data` Google Sheet with all relevant fields
2. Drop PDF in `public/pdfs/`, and make sure this matches the `pdf_file` field in Google Sheets (e.g., `public/pdfs/Hilton2027.pdf`)
3. Rerun my `prepare_data_for_website.R` script in my `cv` repo.
4. Manually drag across the updated `publications.json` and `media.json` files as necessary to `src/data/`

## Notes

- Text between `*asterisks*` renders in italics. `npm run build` fails if a `pdf` path doesn't exist or an `id` is duplicated, and warns about PDFs nothing links to.
