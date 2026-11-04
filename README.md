# Anders Aaboe Jensen — engineering portfolio

A portable, static Astro website. Project content lives in Markdown; there is no database, account system or external content service to maintain. This project is ready to open in VS Code and publish from your own public GitHub repository.

## Run and build

Use Node.js 24 or newer. The included `.nvmrc` and GitHub workflow select Node.js 24.

```bash
npm ci
npm run dev
npm run build
npm run check:site
```

`npm run dev` opens the development server. `npm run build` creates the complete website in `dist/`. Deploy that directory on a static host. Its address is configured as `https://andersaaboe.dk/`, served by GitHub Pages from `Aaboe97/engineering-portfolio`.

## Edit the content

| Change | File |
| --- | --- |
| Public address and deployment prefix | `site.config.mjs` |
| Email, LinkedIn, CV, location | `src/data/profile.ts` |
| Project text, tools, dates and pictures (one folder per project) | `src/content/projects/<project-name>/` |
| Original reports, raw photos, videos (never published) | `data/` |
| Logos and portrait | `src/assets/general/` |
| Home introduction and approach | `src/pages/index.astro` |
| Education, employment and personal timeline | `src/pages/about.astro` |
| Colours, spacing, type and responsive styles | `src/styles/global.css` |
| Reusable project cards | `src/components/ProjectCard.astro` |
| Full case-study layout | `src/pages/projects/[slug].astro` |
| Content schema and required fields | `src/content.config.ts` |


## Add a project

Create a folder `src/content/projects/descriptive-project-name/` containing an `index.md`. The folder name becomes the project's web address (`/projects/descriptive-project-name/`). Put the pictures for the project in the same folder. Keep the original material in `data/projects/descriptive-project-name/`.

```yaml
---
projectId: P17
title: A descriptive project title
shortTitle: A short editorial title.
description: A concise description of the challenge and engineering work.
period: '2027'
type: Personal build
team: false
tags: [mechanical, electronics]
technologies: [Onshape, Python, Arduino]
order: 17
stage: case-study
visual: battery
cover:
  src: ./cover.jpg
  alt: Describe what is visible and technically relevant.
  caption: Describe the component, setup or stage of development.
gallery:
  - src: ./assembly.jpg
    alt: Assembly of the component.
    caption: Explain the relevant engineering detail.
documents:
  - title: Technical report (PDF)
    href: /documents/reports/descriptive-project-name.pdf
---

## Engineering challenge

Explain the purpose, requirements and constraints.

## My involvement

Describe the work undertaken, identifying collaborative projects.

## Approach and implementation

Describe the methods, design choices, hardware or experiments.

## Results and limitations

Distinguish measured results, predictions, design work and planned tests.
```

Use `stage: overview` for a short project that opens as an accessible overview dialog in the catalogue. Use `stage: case-study` for a full page. The body is Markdown in both cases. Catalogue entries are included automatically; there is no list of routes to update.

Valid discipline tags: `aerodynamics`, `mechanical`, `numerical`, `experiments`, `electronics`, `energy`. A project can have several tags. Define additional filters in `src/data/profile.ts` if the portfolio expands.

`period` is optional. Omit uncertain dates until verified. `team` defaults to false; identify collaborative projects explicitly. `order` controls the catalogue order.

## Change featured work

Add `featureOrder: 1` (or another positive number) to a project's frontmatter. Featured projects appear on the homepage in that order. Remove this field to remove a project from the homepage. Six projects are featured initially.

## Add photographs and reports

1. Keep full-size originals in `data/projects/<project-name>/`. That folder is git-ignored and never published.
2. Copy the pictures you want on the site into `src/content/projects/<project-name>/` and reference them from `index.md` with a relative path, such as `./cover.jpg`. Pictures can also be used in the Markdown body: `![Description](./photo.jpg)`.
3. The build checks that every referenced picture exists and creates resized, compressed WebP versions automatically. Use JPG for photographs and PNG only for diagrams that need sharp lines.
4. The build also publishes the original file, so keep copies in the project folder reasonably sized: about 2000–2500 pixels on the long side and a few hundred KB, not the 3–4 MB straight from a phone.
5. Include useful alternative text and captions. Gallery images support enlargement.
6. Downloadable reports go in `public/documents/reports/` and are listed under `documents` in the frontmatter.
7. Run the build and link checker before deployment.

Select pictures that explain the engineering work rather than adding every photograph.

The current drawings are labelled concept schematics. Adding a `cover` automatically replaces the schematic in a card and full project header.

## Update the CV

Replace `public/documents/anders-aaboe-jensen-cv.pdf` with the current PDF. The download links use this stable path. Update `profile.cv` if the filename changes. Update About independently when employment or qualifications change.

## GitHub Pages and your own domain

The included workflow installs locked dependencies, builds the website, checks its links, and deploys on every push to `main` after Pages is enabled.

`site.config.mjs` contains the public website address. Its value is `https://andersaaboe.dk/`. The domain and deployment prefix are derived from this one setting.

After configuring your own domain in GitHub Pages and DNS, change the address to `https://andersaaboe.dk/`. Internal navigation, media URLs, the CV download, canonical links, robots file and sitemap will follow the new address when you rebuild. You do not need to edit each page.

For another static host, set the relevant public address, run `npm ci`, `npm run build`, and `npm run check:site`, then publish `dist/` at the configured path. A build-time `SITE_URL` environment variable can temporarily override the address for verification.

Use `withBase()` from `src/lib/urls.ts` for new page links and assets in Astro components. Project pictures use relative paths (`./cover.jpg`) and site-wide images are imported from `src/assets/general/`, so neither depends on the deployment prefix. Root-relative links in Markdown bodies are prefixed during Markdown rendering; external links and anchor links remain unchanged.

## Checks

The production build checks the project metadata against its schema. `npm run check:site` checks internal links and assets, heading and metadata presence, duplicate IDs, sitemap destinations and filtering behaviour. Browser review should cover desktop and mobile, filter combinations, the no-results state, overview dialogs, menu navigation, case-study section links and the CV download.

Respect reduced-motion preferences. Keep essential content available without animation. Do not add tracking, forms, libraries or external services without a concrete need.
