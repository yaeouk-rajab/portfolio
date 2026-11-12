# Ahmed Rajab, portfolio

Static portfolio site built with [Astro](https://astro.build) 7, Tailwind CSS 4 and TypeScript.
Dark, terminal-flavoured design using system font stacks only (no external font CDN).

## Run

Requires Node 22.23.4 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # astro check (types in .astro files and TS)
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/site.ts` | Site config: name, tagline, email, nav, social links, featured slugs. **CV data (summary, experience, shipped work, skills, award) and socials live here.** |
| `src/data/projects.json`, `templates.json` | Content. Their shape is relied on by `src/lib/content.ts`; do not change it casually. |
| `src/lib/content.ts` | Typed access to the JSON files, featured selection, technology counts. |
| `src/layouts/Base.astro` | `<head>`, SEO/OG tags, skip link, nav, footer. |
| `src/components/` | `Nav`, `Footer`, `SocialLinks`, `Section`, `ProjectCard`, `TemplateCard`, `TagChip`. |
| `src/content/blog/*.md` | Blog posts. Schema in `src/content.config.ts`: `title`, `description`, `date`, `tags`, `draft`. |
| `src/lib/blog.ts` | Published posts (drafts excluded), newest first; used by the index, post pages and RSS. |
| `src/styles/global.css` | Tailwind import, colour tokens (CSS variables), cursor, focus, skip link. |
| `src/pages/` | `index`, `projects`, `templates`, `blog/` (index and `[slug]`), `contact`, `resume`, `rss.xml`, `404`. |

Tailwind 4 is configured in CSS (`@theme` in `global.css`), so there is no `tailwind.config.js`.
Colours are defined once as variables on `:root`; Tailwind utilities such as `bg-surface` and
`text-accent` read them.

## Writing a blog post

Add `src/content/blog/<slug>.md` with the frontmatter above. The file name becomes the URL
(`/blog/<slug>/`). Set `draft: true` to keep a post out of the index, its page, the sitemap and
the RSS feed. Build and check with `npm run build` and `npm run check`.

## Owner content and generated assets

Content the owner must supply:

- **Resume PDF:** `public/resume.pdf` is generated from `/resume` with `npm run resume:pdf`
  (`scripts/build-resume-pdf.mjs`). Re-run it after any content change. Playwright is not a site
  dependency: the script uses an already-installed `playwright` (e.g. global, via `NODE_PATH`).
- **Hidden socials:** X is in `src/data/site.ts` with `enabled: false`; it appears nowhere until a URL
  is filled in and `enabled` is set to `true`. There is no YouTube entry.
- **Languages spoken, location, availability:** not in the CV, so not shown.
- **Privacy:** the owner approved publishing the phone number (+963 962 296 144, also WhatsApp) and the
  second email ahmad.rajab@windowslive.com, in addition to the primary `info@ahmed-rajab-developer.com`
  (used by the mailto helper). They appear on /contact, /resume, the footer and the JSON-LD Person.
- **OG image:** `public/og.png` (1200x630) is rendered from `scripts/og.html` with `npm run og:image`.
- **Blog content:** two starter posts are written from `projects.json`/`templates.json` facts.
  Replace or extend them as needed.

## Deploy

The build is plain static files in `dist/`, so any static host works.

- **Cloudflare Pages / Netlify / Vercel:** build command `npm run build`, output directory `dist`.
  Set `SITE_URL` to the production origin so canonical, OG and sitemap URLs are correct.
- **GitHub Pages:** publish `dist/` with the `withastro/action` workflow. For a project page
  (not a user/custom-domain root) also set `base` in `astro.config.mjs`.
- `robots.txt`, `sitemap-index.xml` and `rss.xml` are generated at build time from `site`.
