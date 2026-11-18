# Deploying the site (manual upload)

Automated FTP deploy is on hold (the host's FTP passive ports are firewalled off
from GitHub Actions — see "FTP via GitHub Actions" in README.md for the details
and what would need to change on the host's side to revisit it). Until then,
every update goes out by hand. This is the checklist.

## 1. Build

```bash
cd portfolio
npm ci            # only needed if node_modules is missing or package.json changed
npm run check     # type check — must report 0 errors
npm run build     # writes the static site to dist/
```

If you changed anything that affects the resume page's content (experience,
skills, projects, contact details), also regenerate the PDF before zipping:

```bash
npm run resume:pdf   # requires a Playwright install resolvable via NODE_PATH
```

## 2. Zip

```bash
cd dist
zip -qr ../../portfolio-upload.zip .
cd ../..
```

This produces `portfolio-upload.zip` one level above the `portfolio` repo
folder. Zip the *contents* of `dist/`, not the `dist` folder itself — the
files need to land directly in the web root, not inside a `dist/` subfolder.

## 3. Upload

1. Log in to the hosting file manager.
2. Open `public_html` (the web root for `ahmed-rajab-developer.com`).
3. Upload `portfolio-upload.zip` and extract it there, overwriting existing
   files.
4. Turn on "show hidden files" in the file manager and confirm `.htaccess`
   extracted alongside `index.html` — some file managers hide dotfiles by
   default and silently skip them on extract.
5. Confirm `index.html`, `_astro/`, `projects/`, `blog/`, `resume.pdf` and
   `og.png` all sit directly in `public_html` (not nested one level deeper
   inside an extracted folder).

## 4. Verify

Open https://ahmed-rajab-developer.com and spot-check:

- Home page loads, nav links work.
- One project detail page (e.g. `/projects/bookslot`) renders its diagram.
- `/resume` loads and the "Download PDF" link serves the current PDF.
- `/blog` and one post render.

## If the file manager login fails with a quota error

The hosting account's disk quota is full — the file manager can't even open a
session. This isn't a bug in the site; it's hosting account storage. Clear
space first, via FTP (not the panel, which is locked out) or ask the host's
support. See the "FTP via GitHub Actions" README section for the FTP account
details already in use.

## When the FTP/SSH host issue is eventually resolved

If the host ever opens its FTP passive port range (or SSH becomes available
through a plan upgrade — not a workaround), the existing
`.github/workflows/deploy.yml` can take over this whole process automatically
on every push to `main`. Nothing in this file needs to change for that; the
GitHub Actions secrets documented in README.md are what to set up again.
