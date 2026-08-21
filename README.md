# Shuo Xu — Academic Homepage

An English, light-first academic homepage for Shuo Xu, a Ph.D. student at
Peking University. The site is a lean PRISM-inspired implementation built with
Next.js and exported as static files for GitHub Pages.

## Local development

Node.js 22 or later is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before committing or publishing, run the complete verification pipeline:

```bash
npm run verify
```

This command runs ESLint, TypeScript, configuration tests, content and component
tests, public-asset checks, the static build, and exported-route validation.

## Editing content

Approved facts are kept separate from the page components:

- Identity, affiliation, advisor, links, research interests, and navigation:
  `src/content/site.ts`
- Education: `src/content/education.ts`
- News: `src/content/news.ts`
- Publications: `src/content/publications.ts`
- Projects and video metadata: `src/content/projects.ts`

Page components live under `src/app/` and reusable components under
`src/components/`.

## Public assets

- Paper PDF: `public/papers/fma-cbf-paper.pdf`
- Research videos and posters: `public/media/`

The paper and videos are intended to be publicly downloadable from the website.

## GitHub Pages

The intended repository name is:

```text
shuo456.github.io
```

To publish:

1. Create the public repository `shuo456.github.io` under the `shuo456`
   GitHub account.
2. Push this repository's `main` branch.
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and confirm the `Deploy academic homepage` workflow
   succeeds.

The workflow in `.github/workflows/pages.yml` installs locked dependencies,
runs the full verification pipeline, uploads `out/`, and deploys it to GitHub
Pages.

## Design reference

The visual direction and static, configuration-driven architecture were
inspired by [PRISM](https://github.com/xyjoey/PRISM). This site is a reduced,
English-only implementation tailored to the approved academic content. See
`NOTICE.md` for attribution.
