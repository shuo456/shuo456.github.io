# Shuo Xu Academic Homepage Design

Date: 2026-07-26

## Objective

Create an English-language academic personal homepage for Shuo Xu, a Ph.D. student at Peking University. The site should sit between an extremely minimal academic page and a feature-heavy portfolio: visually polished, academically credible, easy to scan, and straightforward to maintain.

The site will use a simplified PRISM design system and content model, deploy for free through GitHub Pages, and be published at:

- Repository: `shuo456/shuo456.github.io`
- Public URL: `https://shuo456.github.io`

## Design Direction

The implementation will follow a "PRISM Slim" approach:

- Use PRISM as the visual and architectural starting point.
- Retain responsive layout, theme switching, static export, and content-driven pages.
- Remove likes, multilingual content, complex analytics, dense dashboards, and unnecessary filters.
- Default to a light theme while preserving an optional dark theme.
- Keep interactions restrained and suitable for an academic audience.

## Confirmed Identity and Contact Details

- Display name: Shuo Xu
- Role: Ph.D. Student
- Affiliation: School of Advanced Manufacturing and Robotics, Peking University
- Location: Beijing, China
- Email: `sxu25@stu.pku.edu.cn`
- GitHub: `https://github.com/shuo456`
- Research interests:
  - Robotics
  - Safety-Critical Control
  - Multi-Agent Systems
- Advisor: Prof. Zhiyong Sun
- Advisor link: `https://www.coe.pku.edu.cn/teaching/yongforeign/13424.html`

## Education

### Peking University

- Ph.D. student
- School of Advanced Manufacturing and Robotics
- 2025-Present

### National University of Defense Technology

- B.Eng. in Artificial Intelligence
- College of Intelligence Science and Technology
- 2021-2025

## Information Architecture

### Primary Navigation

- About
- Publications
- Projects
- Travels
- CV
- More

The `More` menu contains:

- Teaching
- Awards
- Academic Service

This prevents the primary navigation from becoming crowded while retaining the requested sections.

### Home Page

The desktop home page uses a two-column layout.

Left column:

- Blank 4:5 portrait placeholder
- Name
- Role and affiliation
- Research interest tags
- Email and GitHub links

Right column:

- About
- Selected Publication
- News

On small screens, the portrait placeholder and identity block move above the main content.

### Publications

The initial publication list contains one real entry:

**Analysis of Feasibility Margin as a Control Barrier Function under Input Constraints**

- Authors: Shuo Xu, Zhengning Gong, Yicheng Lin, and Zhiyong Sun
- Venue/status: To appear in IFAC 2026
- Keywords:
  - Safety-Critical Control
  - Control Barrier Functions
  - Feasibility Margin
  - Input Constraints
- Public PDF: copied from the supplied local paper file
- Project/Demo link: points to the FMA-CBF project page

No example or fictional publications will be shown.

### Projects

The initial project is FMA-CBF.

Its project page contains:

- Paper title and author list
- IFAC 2026 status
- Abstract
- Research motivation and concise contribution summary
- Keywords
- Public PDF link
- Embedded Unicycle obstacle-avoidance comparison video
- Embedded Quadrotor gate-crossing comparison video
- Accessible poster images for both videos
- Fallback text and direct-download links if inline playback fails

Source media:

- Paper PDF: `presentation/fma_cbf_share_site/output/fma-cbf-cloudbase-static/fma-cbf-paper.pdf`
- Unicycle video: `presentation/ifac_case_2_video/output/ifac_case2_comparison.mp4`
- Quadrotor video: `presentation/fma_cbf_share_site/public/quadrotor-gate-comparison.mp4`

Only one copy of each unique media file will be added to the site.

### Travels

Travels uses editorial photo cards containing:

- Location
- Year
- Photograph
- One-sentence English note

No travel photographs are available for the initial release. The route and navigation item will remain visible and show:

> Stories coming soon.

The profile placeholder will not be reused as a travel image.

### CV

The initial CV is a web page rather than a downloadable PDF. It contains:

- Education
- Research interests
- Publication
- Contact details

No empty PDF download button will be shown.

### Teaching, Awards, and Academic Service

These routes and content structures will exist, but no fictional entries will be added. They will be accessible from the `More` menu and use a concise empty state until real content is supplied. Empty sections will not be repeated on the home page.

## Initial English Copy

### About

The home-page introduction will state that Shuo Xu is a Ph.D. student in the School of Advanced Manufacturing and Robotics at Peking University, advised by Prof. Zhiyong Sun. It will describe his research interests as robotics, safety-critical control, and multi-agent systems.

The advisor name will link to the supplied official Peking University faculty page.

### News

The initial news list contains:

- 2026 - Our paper will appear at IFAC 2026.
- 2025 - I started my Ph.D. at Peking University.

## Visual System

### Theme

Default light palette:

- Background: warm off-white
- Primary text: deep navy
- Secondary text: desaturated slate
- Accent: restrained Peking University red
- Borders: pale blue-gray
- Cards: near-white with subtle borders and minimal shadow

Dark mode remains available through a top-right theme toggle. It must not be the default.

### Typography

- Academic headings: restrained serif family
- Body and interface text: readable sans-serif family
- Mathematical or code content: system monospace when needed

Typography must remain legible without relying on external font loading. System fallbacks are required.

### Profile Placeholder

The profile area uses a blank 4:5 placeholder:

- Preserve the subject's upper body.
- Retain both the face and the cartoon graduate above it where practical.
- Do not reuse the placeholder in Travels.
- Provide descriptive alternative text.

### Cards and Motion

- Consistent card geometry across publications, projects, and future travel entries
- Moderate corner radius
- Thin borders
- Minimal shadow
- Subtle hover emphasis only
- No large entrance animations, parallax, counters, or dashboard charts

## Content and Component Boundaries

The project will keep content separate from rendering components.

Content sources:

- Site identity, navigation, and social links: central configuration
- About, news, and education: structured content files
- Publications: BibTeX as the canonical bibliography, with a small typed metadata layer for display-only fields such as selection state, project URL, and media
- Projects: independent project content files
- Travels: independent travel content files
- Media: public asset directories

Components:

- Site header and responsive navigation
- Identity sidebar
- About block
- News list
- Publication card
- Project card and project detail layout
- Video demo component with poster and fallback
- Travel card and empty state
- Web CV sections
- Theme toggle
- Footer

Each component has one primary responsibility and receives content through typed data rather than embedding personal information in the component.

## Deployment

The site will use static export and GitHub Pages.

- Production branch: `main`
- GitHub Actions builds the static site on each push.
- The workflow publishes the generated output to GitHub Pages.
- Asset paths must work at the user-site root URL.
- The repository name must be `shuo456.github.io`.
- No paid services, database, server runtime, or API key is required.

The local workspace currently has no authenticated GitHub CLI session. Local implementation and verification can proceed independently. Publishing requires authenticating the user's GitHub account or using the GitHub web interface at deployment time.

## Error Handling and Fallbacks

- The profile area remains a neutral blank placeholder.
- Video components show a poster, readable title, and direct file link if playback is unavailable.
- Missing optional content does not render blank cards.
- Teaching, Awards, Academic Service, and Travels use explicit restrained empty states.
- External links open safely and identify their destination.
- PDF and video URLs are validated during the production build.

## Accessibility and Responsive Behavior

- Semantic headings and landmarks
- Keyboard-accessible navigation and theme toggle
- Visible focus states
- Sufficient color contrast in both themes
- Alternative text for meaningful images
- Captions or concise textual descriptions for simulation videos
- Responsive layout for desktop, tablet, and mobile
- No information conveyed by color alone
- Respect `prefers-reduced-motion`

## Verification

Implementation is complete only after:

- Production build succeeds.
- GitHub Pages workflow configuration validates.
- Desktop and mobile layouts are visually inspected.
- Default light theme and optional dark theme both render correctly.
- All internal navigation routes work.
- Advisor, email, and GitHub links are correct.
- The paper PDF opens from the published asset path.
- Both simulation videos load, play, and expose fallback links.
- No fictional academic content or placeholder names remain.
- Empty-state pages are intentional and visually polished.
- Browser console has no material errors.
- Basic accessibility checks pass.

## Out of Scope for the Initial Release

- Chinese localization
- Blog
- Likes or comments
- Visitor analytics
- Google Scholar citation synchronization
- Search
- CMS
- Travel map
- Downloadable CV PDF
- Additional publications or projects not supplied by the user
