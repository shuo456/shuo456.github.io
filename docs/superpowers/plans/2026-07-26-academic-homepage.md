# Shuo Xu Academic Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish-ready an English, light-first academic homepage for Shuo Xu at `shuo456.github.io`, including the approved biography, publication, FMA-CBF project media, education, news, travel route, and CV.

**Architecture:** Reimplement a lean “PRISM Slim” site with the same core choices as PRISM—Next.js static export, React, Tailwind CSS, `next-themes`, config-driven content, and GitHub Pages—but omit multilingual support, analytics, social metrics, dense dashboards, and filtering. Typed content modules feed reusable server components; only theme controls are client-side. All routes export to plain HTML and use repository-local media.

**Tech Stack:** Next.js 16.2.12, React 19.2.8, TypeScript 5, Tailwind CSS 4, `next-themes` 0.4.6, Lucide React 0.515, Vitest, Testing Library, GitHub Actions, GitHub Pages

## Global Constraints

- Keep the site English-only and light-first, with a user-selectable dark theme.
- Use warm off-white, deep navy, and a restrained low-saturation Peking University red accent.
- Use a blank 4:5 profile placeholder without a personal photograph.
- Do not invent biography, research, teaching, awards, service, travel, publication, or project facts.
- Keep Teaching, Awards, Academic Service, and Travels accessible even when their approved content is currently empty.
- Treat the supplied PDF and two MP4 files as public website assets.
- Use static export with trailing slashes and unoptimized local images for GitHub Pages compatibility.
- Keep all content editable from typed files under `src/content/`.
- Include the PRISM MIT attribution in the repository documentation because its design and architecture are the starting reference.
- Never commit secrets, analytics identifiers, private drafts, or environment files.

## File Map

| Area | Files | Responsibility |
|---|---|---|
| Tooling | `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts` | Static-export application, linting, type checking, unit/component tests |
| App shell | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/site-header.tsx`, `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`, `src/components/profile-sidebar.tsx`, `src/components/page-shell.tsx` | Global metadata, navigation, theme, typography, responsive layout |
| Content | `src/lib/types.ts`, `src/content/site.ts`, `src/content/publications.ts`, `src/content/news.ts`, `src/content/education.ts`, `src/content/projects.ts` | Single typed source of truth for approved facts |
| Home | `src/app/page.tsx`, `src/components/publication-card.tsx`, `src/components/news-list.tsx` | About, selected publication, news |
| Research routes | `src/app/publications/page.tsx`, `src/app/projects/page.tsx`, `src/app/projects/fma-cbf/page.tsx`, `src/components/video-demo.tsx` | Publication list, project index, FMA-CBF detail and media |
| Personal routes | `src/app/travels/page.tsx`, `src/app/cv/page.tsx`, `src/components/education-timeline.tsx` | Travel route and web CV |
| Empty academic routes | `src/app/teaching/page.tsx`, `src/app/awards/page.tsx`, `src/app/service/page.tsx`, `src/components/empty-state.tsx` | Honest empty states without fabricated achievements |
| Public assets | `public/papers/fma-cbf-paper.pdf`, `public/media/ifac-case2-comparison.mp4`, `public/media/quadrotor-gate-comparison.mp4`, `public/media/unicycle-poster.png`, `public/media/quadrotor-poster.png` | Approved paper, videos, and poster frames |
| Verification | `tests/config.test.mjs`, `tests/content.test.ts`, `tests/components.test.tsx`, `scripts/validate-assets.mjs`, `scripts/validate-export.mjs` | Configuration, content, UI, media, and exported-route checks |
| Publishing | `.github/workflows/pages.yml`, `.gitignore`, `README.md`, `NOTICE.md` | GitHub Pages workflow and maintainer documentation |

---

## Task 1: Scaffold the PRISM Slim Static-Export Foundation

**Files:**
- Create: `tests/config.test.mjs`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `.gitignore`

- [ ] **Step 1: Write the failing configuration test**

```js
// tests/config.test.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Next exports a GitHub Pages-compatible static site", async () => {
  const source = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(source, /output:\s*["']export["']/);
  assert.match(source, /trailingSlash:\s*true/);
  assert.match(source, /unoptimized:\s*true/);
});

test("the project exposes verification scripts", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  for (const name of ["lint", "typecheck", "test", "build", "verify"]) {
    assert.equal(typeof pkg.scripts[name], "string");
  }
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/config.test.mjs`

Expected: FAIL because `next.config.ts` and `package.json` do not exist.

- [ ] **Step 3: Add the minimal application and test dependencies**

Use these production dependencies:

```json
{
  "clsx": "^2.1.1",
  "lucide-react": "^0.515.0",
  "next": "16.2.12",
  "next-themes": "^0.4.6",
  "react": "19.2.8",
  "react-dom": "19.2.8"
}
```

Use TypeScript 5, Tailwind CSS 4, ESLint 9, Vitest, jsdom, and Testing Library as development dependencies. Define:

```json
{
  "dev": "next dev --turbopack",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "build": "next build",
  "validate:assets": "node scripts/validate-assets.mjs",
  "validate:export": "node scripts/validate-export.mjs",
  "verify": "npm run lint && npm run typecheck && npm run test && npm run validate:assets && npm run build && npm run validate:export"
}
```

- [ ] **Step 4: Configure static export**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

Add strict TypeScript, Tailwind PostCSS, flat ESLint configuration, jsdom-based Vitest, and `@testing-library/jest-dom/vitest` setup.

- [ ] **Step 5: Install dependencies and rerun the configuration test**

Run: `npm install`

Run: `node --test tests/config.test.mjs`

Expected: 2 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts .gitignore tests/config.test.mjs
git commit -m "chore: scaffold static academic site"
```

---

## Task 2: Encode All Approved Academic Content

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/content/site.ts`
- Create: `src/content/publications.ts`
- Create: `src/content/news.ts`
- Create: `src/content/education.ts`
- Create: `src/content/projects.ts`
- Create: `tests/content.test.ts`

- [ ] **Step 1: Write failing content-contract tests**

```ts
// tests/content.test.ts
import { describe, expect, it } from "vitest";
import { education } from "@/content/education";
import { news } from "@/content/news";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

describe("approved site content", () => {
  it("uses Shuo Xu's exact identity and contact links", () => {
    expect(site.name).toBe("Shuo Xu");
    expect(site.email).toBe("sxu25@stu.pku.edu.cn");
    expect(site.github).toBe("https://github.com/shuo456");
    expect(site.advisor.name).toBe("Prof. Zhiyong Sun");
  });

  it("contains only the approved education entries", () => {
    expect(education.map((entry) => entry.period)).toEqual([
      "2025–Present",
      "2021–2025",
    ]);
  });

  it("uses the approved IFAC status and both demos", () => {
    expect(publications[0].status).toBe("To appear in IFAC 2026");
    expect(projects[0].videos.map((video) => video.label)).toEqual([
      "Unicycle comparison",
      "Quadrotor gate comparison",
    ]);
  });

  it("contains the two approved news items", () => {
    expect(news).toHaveLength(2);
    expect(news.map((item) => item.year)).toEqual([2026, 2025]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- tests/content.test.ts`

Expected: FAIL because the content modules do not exist.

- [ ] **Step 3: Define shared types**

```ts
// src/lib/types.ts
export type NavItem = {
  label: string;
  href?: string;
  children?: readonly { label: string; href: string }[];
};

export type Publication = {
  slug: string;
  title: string;
  authors: readonly string[];
  status: string;
  abstract: string;
  keywords: readonly string[];
  paperHref: string;
  projectHref: string;
};

export type ProjectVideo = {
  label: string;
  description: string;
  src: string;
  poster: string;
};
```

- [ ] **Step 4: Add the exact identity and navigation**

`src/content/site.ts` must contain:

- `Shuo Xu`
- `Ph.D. Student`
- `School of Advanced Manufacturing and Robotics, Peking University`
- Research interests: `Robotics`, `Safety-Critical Control`, `Multi-Agent Systems`
- Advisor `Prof. Zhiyong Sun` linked to `https://www.coe.pku.edu.cn/teaching/yongforeign/13424.html`
- Email and GitHub links
- Main navigation: About, Publications, Projects, Travels, CV
- More navigation: Teaching, Awards, Academic Service

- [ ] **Step 5: Add publication, project, news, and education records**

Use the paper title and authors exactly:

```ts
{
  title: "Analysis of Feasibility Margin as a Control Barrier Function under Input Constraints",
  authors: ["Shuo Xu", "Zhengning Gong", "Yicheng Lin", "Zhiyong Sun"],
  status: "To appear in IFAC 2026",
  paperHref: "/papers/fma-cbf-paper.pdf",
  projectHref: "/projects/fma-cbf/"
}
```

Copy the abstract and keywords verbatim from the supplied paper source into the typed publication record. Add the two approved news sentences and both education entries without adding dates, honors, laboratories, or degree details that the user did not provide.

- [ ] **Step 6: Run content tests**

Run: `npm test -- tests/content.test.ts`

Expected: 4 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib src/content tests/content.test.ts
git commit -m "feat: add typed academic content"
```

---

## Task 3: Build the Global Shell, Theme, Navigation, and Profile

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/theme-provider.tsx`
- Create: `src/components/theme-toggle.tsx`
- Create: `src/components/site-header.tsx`
- Create: `src/components/profile-sidebar.tsx`
- Create: `src/components/page-shell.tsx`
- Create: `tests/components.test.tsx`

- [ ] **Step 1: Write failing shell component tests**

```tsx
// tests/components.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { SiteHeader } from "@/components/site-header";

describe("global academic shell", () => {
  it("renders core navigation and the More menu", () => {
    render(<SiteHeader />);
    for (const label of ["About", "Publications", "Projects", "Travels", "CV", "More"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders verified identity, research interests, and contact links", () => {
    render(<ProfileSidebar />);
    expect(screen.getByRole("heading", { name: "Shuo Xu" })).toBeInTheDocument();
    expect(screen.getByText("Safety-Critical Control")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:sxu25@stu.pku.edu.cn",
    );
  });
});
```

- [ ] **Step 2: Run the component tests and confirm they fail**

Run: `npm test -- tests/components.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the theme boundary**

Make `ThemeProvider` and `ThemeToggle` the only client components. Use `next-themes` with:

```tsx
<NextThemesProvider
  attribute="data-theme"
  defaultTheme="light"
  enableSystem={false}
  disableTransitionOnChange
>
  {children}
</NextThemesProvider>
```

Give the theme button a stable accessible name that changes between “Switch to dark theme” and “Switch to light theme”.

- [ ] **Step 4: Implement the accessible responsive navigation**

Desktop navigation shows the five primary routes plus a keyboard-operable More dropdown. Mobile navigation wraps into a compact second row rather than hiding routes behind a JavaScript-only drawer. Apply `aria-current="page"` only in a small client route helper if active-route styling is needed; otherwise omit it.

- [ ] **Step 5: Implement the reusable profile sidebar**

Render a blank 4:5 profile placeholder, identity, affiliation, advisor link, research chips, email, and GitHub.

- [ ] **Step 6: Establish the design tokens and document metadata**

Define CSS custom properties for light and dark themes, including:

```css
:root {
  --background: #f7f5ef;
  --surface: #fffdf8;
  --text: #162338;
  --muted: #667085;
  --border: #ddd8cd;
  --accent: #8b3a45;
}
```

Use a serif display face from the system stack for headings and a clean system sans stack for body text. Set metadata title to `Shuo Xu | Robotics and Safety-Critical Control` and provide an accurate description.

- [ ] **Step 7: Run component tests**

Run: `npm test -- tests/components.test.tsx`

Expected: 2 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components tests/components.test.tsx
git commit -m "feat: build academic site shell"
```

---

## Task 4: Build the Home and Publications Pages

**Files:**
- Create: `src/components/section-heading.tsx`
- Create: `src/components/publication-card.tsx`
- Create: `src/components/news-list.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/publications/page.tsx`
- Modify: `tests/components.test.tsx`

- [ ] **Step 1: Add failing tests for home research content**

Append tests that render `PublicationCard` and `NewsList`, asserting:

- The paper title is a heading.
- `Shuo Xu` is visually designated as the owner author without changing the author string.
- Paper and Project links have the correct URLs.
- News items appear in descending year order.

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run: `npm test -- tests/components.test.tsx`

Expected: FAIL because publication and news components do not exist.

- [ ] **Step 3: Implement the publication card and news list**

The card should present title, authors, status badge, and two restrained action links. The home version is compact; the publications-page version additionally exposes the abstract and keywords.

- [ ] **Step 4: Implement the two-column home page**

Use `PageShell` so desktop shows the profile sidebar beside:

1. About
2. Selected Publication
3. News

The About copy should say that Shuo Xu is a Ph.D. student at Peking University and is interested in robotics, safety-critical control, and multi-agent systems. Do not assert a specific lab, research group, city, scholarship, or biography beyond the approved facts.

- [ ] **Step 5: Implement the publications route**

Render the single publication in a calm list layout with abstract, keywords, PDF, and project links. Structure the page to accept additional publication records later without a redesign.

- [ ] **Step 6: Run tests**

Run: `npm test -- tests/components.test.tsx`

Expected: all component tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/app/publications src/components tests/components.test.tsx
git commit -m "feat: add home and publications pages"
```

---

## Task 5: Import Approved Assets and Build the FMA-CBF Project

**Files:**
- Create: `public/papers/fma-cbf-paper.pdf`
- Create: `public/media/ifac-case2-comparison.mp4`
- Create: `public/media/quadrotor-gate-comparison.mp4`
- Create: `public/media/unicycle-poster.png`
- Create: `public/media/quadrotor-poster.png`
- Create: `src/components/video-demo.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/fma-cbf/page.tsx`
- Create: `scripts/validate-assets.mjs`
- Modify: `tests/components.test.tsx`

- [ ] **Step 1: Write failing media component and asset tests**

Add a `VideoDemo` test asserting that it renders:

- A heading from the supplied label
- A `<video controls preload="metadata">`
- MP4 source and poster attributes
- Fallback text with a direct video link

Create `scripts/validate-assets.mjs` to assert that all six public asset files exist and are non-empty. Also assert that the two MP4 files have distinct paths.

- [ ] **Step 2: Run focused validation and confirm it fails**

Run: `npm test -- tests/components.test.tsx`

Run: `node scripts/validate-assets.mjs`

Expected: FAIL because the component and public assets do not exist.

- [ ] **Step 3: Copy only approved source assets**

Copy these exact sources:

```text
D:\desktop\仿真实验\presentation\fma_cbf_share_site\output\fma-cbf-cloudbase-static\fma-cbf-paper.pdf
  -> public/papers/fma-cbf-paper.pdf

D:\desktop\仿真实验\presentation\ifac_case_2_video\output\ifac_case2_comparison.mp4
  -> public/media/ifac-case2-comparison.mp4

D:\desktop\仿真实验\presentation\fma_cbf_share_site\public\quadrotor-gate-comparison.mp4
  -> public/media/quadrotor-gate-comparison.mp4

D:\desktop\仿真实验\presentation\ifac_case_2_video\qa\midframe-polished.png
  -> public/media/unicycle-poster.png

D:\desktop\仿真实验\presentation\fma_cbf_share_site\public\quadrotor-gate-final-frame.png
  -> public/media/quadrotor-poster.png
```

Verify the poster sources visually before using them. If either source is missing or unsuitable, extract a deterministic frame from its corresponding video; do not generate scientific imagery.

- [ ] **Step 4: Implement the reusable video block**

```tsx
export function VideoDemo({ video }: { video: ProjectVideo }) {
  return (
    <figure className="videoDemo">
      <video controls preload="metadata" poster={video.poster}>
        <source src={video.src} type="video/mp4" />
        Your browser does not support embedded video.{" "}
        <a href={video.src}>Open the MP4 file.</a>
      </video>
      <figcaption>
        <h3>{video.label}</h3>
        <p>{video.description}</p>
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 5: Implement Projects and FMA-CBF routes**

The index shows one project card. The detail page includes:

- Paper title
- Status `To appear in IFAC 2026`
- Authors
- Abstract and keywords
- Download Paper link
- Unicycle comparison video
- Quadrotor gate comparison video

Descriptions must remain observational and limited to labels present in the approved project assets or paper; do not claim performance gains beyond the paper.

- [ ] **Step 6: Run component and asset validation**

Run: `npm test -- tests/components.test.tsx`

Run: `node scripts/validate-assets.mjs`

Expected: both commands PASS.

- [ ] **Step 7: Commit**

```bash
git add public src/app/projects src/components/video-demo.tsx scripts/validate-assets.mjs tests/components.test.tsx
git commit -m "feat: add FMA-CBF paper and demos"
```

---

## Task 6: Build Travels, CV, and Honest Empty Academic Routes

**Files:**
- Create: `src/components/education-timeline.tsx`
- Create: `src/components/empty-state.tsx`
- Create: `src/app/travels/page.tsx`
- Create: `src/app/cv/page.tsx`
- Create: `src/app/teaching/page.tsx`
- Create: `src/app/awards/page.tsx`
- Create: `src/app/service/page.tsx`
- Modify: `tests/components.test.tsx`

- [ ] **Step 1: Write failing secondary-page component tests**

Test that:

- Education entries render in reverse chronological order.
- The Ph.D. entry says `2025–Present`.
- The B.Eng. entry names National University of Defense Technology and says `2021–2025`.
- Empty-state copy does not invent items or render fake list elements.

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `npm test -- tests/components.test.tsx`

Expected: FAIL because the timeline and empty state do not exist.

- [ ] **Step 3: Implement the web CV**

Include:

- Profile summary
- Research interests
- Education
- Publication
- Contact

Do not include a PDF CV button, photo gallery, phone number, postal address, awards, skills rating, or experience not supplied by the user.

- [ ] **Step 4: Implement the Travels route**

Use a clean editorial-page introduction and the exact launch-state message `Stories coming soon.` Keep the markup ready for future photo-story cards without rendering sample destinations.

- [ ] **Step 5: Implement Teaching, Awards, and Academic Service**

Each route gets a page heading and concise empty state such as `Updates will be added here.` Avoid phrases that imply the user has unlisted achievements.

- [ ] **Step 6: Run component tests**

Run: `npm test -- tests/components.test.tsx`

Expected: all component tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/travels src/app/cv src/app/teaching src/app/awards src/app/service src/components tests/components.test.tsx
git commit -m "feat: add cv travels and academic routes"
```

---

## Task 7: Finish Responsive Styling and Accessibility

**Files:**
- Modify: `src/app/globals.css`
- Modify: all route and component files as required by accessibility findings

- [ ] **Step 1: Establish visual acceptance sizes**

Check at minimum:

- 1440 × 1000 desktop
- 1024 × 768 tablet
- 390 × 844 mobile
- 360 × 800 narrow mobile

- [ ] **Step 2: Tune the approved visual hierarchy**

Desktop home:

- Left profile column approximately 280–320 px
- Right reading column no wider than approximately 760 px
- 4:5 avatar with visible face and cartoon graduate
- Calm section spacing and thin separators

Mobile:

- Identity summary first
- Navigation remains fully reachable
- No horizontal overflow
- Videos use `width: 100%` and retain aspect ratio

- [ ] **Step 3: Verify keyboard and motion behavior**

Confirm:

- Visible focus rings
- More menu reachable and closable by keyboard
- Theme button has an accessible name
- Links are distinguishable without relying only on color
- `prefers-reduced-motion` removes nonessential transitions

- [ ] **Step 4: Verify theme contrast and media behavior**

Check light and dark modes manually. Confirm posters display before playback, videos do not autoplay, and direct fallback links work.

- [ ] **Step 5: Run lint, type checks, and tests**

Run: `npm run lint`

Run: `npm run typecheck`

Run: `npm test`

Expected: all commands PASS with no warnings promoted to errors.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "style: refine responsive academic design"
```

---

## Task 8: Add GitHub Pages Publishing and Final Verification

**Files:**
- Create: `scripts/validate-export.mjs`
- Create: `.github/workflows/pages.yml`
- Create: `README.md`
- Create: `NOTICE.md`

- [ ] **Step 1: Write the failing exported-route validator**

`scripts/validate-export.mjs` must assert the existence of:

```text
out/index.html
out/publications/index.html
out/projects/index.html
out/projects/fma-cbf/index.html
out/travels/index.html
out/cv/index.html
out/teaching/index.html
out/awards/index.html
out/service/index.html
```

It must also scan exported HTML for accidental `TODO`, `TBD`, `example.com`, `lorem ipsum`, and template identity strings.

- [ ] **Step 2: Confirm validation fails before a build**

Run: `node scripts/validate-export.mjs`

Expected: FAIL because `out/` has not been built.

- [ ] **Step 3: Add the GitHub Pages workflow**

Use official actions with pinned major versions:

1. `actions/checkout`
2. `actions/setup-node` with Node 22 and npm cache
3. `npm ci`
4. `npm run verify`
5. `actions/configure-pages`
6. `actions/upload-pages-artifact` with `./out`
7. `actions/deploy-pages`

Set Pages permissions to `contents: read`, `pages: write`, and `id-token: write`; serialize deployments with a `pages` concurrency group.

- [ ] **Step 4: Document local editing and publishing**

README must explain:

- Node 22 requirement
- `npm install`, `npm run dev`, and `npm run verify`
- Where identity, publication, project, and news data live
- Where approved media live
- GitHub Pages repository name `shuo456.github.io`
- Repository Settings → Pages → Source: GitHub Actions
- PRISM inspiration and link to `https://github.com/xyjoey/PRISM`

`NOTICE.md` must state that the site design and architecture were inspired by PRISM, which is available under the MIT License, without implying endorsement.

- [ ] **Step 5: Run the complete verification pipeline**

Run: `npm run verify`

Expected:

- ESLint PASS
- TypeScript PASS
- Vitest PASS
- Asset validation PASS
- Next.js static export PASS
- Exported-route validation PASS

- [ ] **Step 6: Inspect the actual export**

Serve `out/` locally and inspect all routes at desktop and mobile sizes. Verify:

- No broken internal links
- Advisor, email, GitHub, paper, and video links work
- No missing images or console errors
- Light theme is the initial render
- Dark theme persists after navigation/reload
- Profile placeholder and video posters render correctly
- Both videos play and remain distinguishable

- [ ] **Step 7: Review the repository diff**

Run: `git status --short`

Run: `git diff --check`

Run: `git log --oneline --decorate -10`

Expected: only intended site, documentation, workflow, test, and public-asset files are changed; whitespace check is clean.

- [ ] **Step 8: Commit**

```bash
git add .github scripts README.md NOTICE.md
git commit -m "ci: prepare site for GitHub Pages"
```

- [ ] **Step 9: Stop before external publication**

Report that the repository is publish-ready. Do not create the remote repository, push commits, change GitHub Pages settings, or publish the site unless the user explicitly authorizes those external changes.

