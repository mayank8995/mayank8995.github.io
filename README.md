# Mayank Gupta: portfolio (Eleventy)

My personal portfolio, built with [Eleventy](https://www.11ty.dev/) (11ty), a static site generator.
Every page is plain HTML generated at build time, so it loads fast, works without JavaScript and is easy for search engines to read.

## Where to edit things

| What | File |
|------|------|
| Name, headline, intro, terminal card, impact metrics, experience timeline, expertise, about, "How I work", contact links, résumé | `src/_data/site.json` |
| Projects (one file each, also gets its own page) | `src/projects/*.md` |
| Screenshots and other images | `src/assets/images/` |
| Colors and styling (dark/light theme vars at the top) | `src/assets/style.css` |
| Page layout | `src/index.njk`, `src/_includes/base.njk`, `src/_includes/project.njk` |
| Animations, filters, theme toggle, mobile menu | `src/assets/main.js` |

## Add a project

Create `src/projects/my-new-app.md`:

```md
---
title: My New App
description: What it does in one or two sentences.
tags: [React, Firebase]
role: Frontend lead                   # shown above the title
year: 2025
impact: [{ value: "-40%", label: "p95 latency" }, { value: "2M", label: "users" }]
live: https://my-new-app.vercel.app   # "" hides the Live demo button
code: https://github.com/mayank8995/my-new-app   # "" hides the Code button
image: /assets/images/my-new-app.png  # optional, "" shows initials
featured: true                        # optional badge
order: 1                              # lower comes first
draft: false                          # true hides it from the site
---

## The problem
Write the story of the project here in Markdown.
It becomes the page at /projects/my-new-app/.
```

With more than 3 projects, tag filter buttons appear automatically.

## Add a job to the experience timeline

In `src/_data/site.json`, copy one `{ ... }` block inside `"experience"` (newest first) and edit `role`, `company`, `period`, `location`, `summary`, `highlights` and `stack`.
Lead each highlight with a result and a number where you can, for example "Cut p95 latency by 42%".

## Résumé

Put `resume.pdf` in `src/` and set `"resumeUrl": "/resume.pdf"` in `src/_data/site.json`. The "Hire me" button in the top bar then becomes "Résumé".

## Run it locally

Needs Node.js 18 or newer.

```bash
npm install
npm start        # live-reloading preview at http://localhost:8080
npm run build    # writes the finished site to _site/
```

## Deploy free on GitHub Pages

A workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a public repo named **`mayank8995.github.io`** and push this folder to it (the `.github` folder must be included).
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push (or run the workflow from the Actions tab). The site goes live at **https://mayank8995.github.io**.

Using a different repo name, such as `portfolio`? That works too: the workflow sets the path prefix automatically and the site lives at `https://mayank8995.github.io/portfolio/`. Update `url` in `site.json` to match.

Netlify, Vercel and Cloudflare Pages also work: build command `npm run build`, output folder `_site`.
