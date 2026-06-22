<div align="center">

# YG-Auditors Website

**Professional accounting & auditing firm website — bilingual (EN/AR), animated, built with Astro v6.**

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![Build](https://github.com/Ebrahim-Muhammed/yg-auditors-website/actions/workflows/build.yml/badge.svg)](https://github.com/Ebrahim-Muhammed/yg-auditors-website/actions/workflows/build.yml)

_Last updated: 2026-06-22_

</div>

---

## Features

- **Bilingual (EN / AR)** — full English and Arabic content with RTL layout support
- **GSAP scroll animations** — entrance and parallax effects on every section via ScrollTrigger
- **Living Earth globe** — reusable canvas-rendered spinning globe (`LivingEarth.astro`) used as both the Hero background and the Services panel; Egyptian city names appear one-by-one at random positions across the sphere and fade in/out independently, draggable by mouse/touch
- **Animated process timeline** — `Process.astro` renders a zigzag SVG path with a continuously flowing light effect and pulsing dots; each dot sits exactly on the curve, shows its step name underneath, and reveals the full description on hover/tap
- **Component architecture** — every page section is an isolated Astro component with scoped CSS
- **Data-driven content** — copy, services, team, and industry data managed in `src/data/` JSON files
- **No-code content editing** — [Decap CMS](https://decapcms.org) admin panel at `/admin` lets non-technical editors update page sections, team members, and contact info without touching code; changes commit straight to this repo
- **Self-hosted GitHub OAuth** — Netlify Functions handle the CMS login flow (`auth` → GitHub → `callback`), so no third-party auth provider is needed
- **Email-invite admin access** — `invite` function + `/admin/invite` page let an existing admin add new CMS editors by email; invited users accept via `/accept-invite`
- **Dark theme** — unified dark palette (`#08091A`) with purple accent throughout
- **Static output** — zero server runtime for the site itself; deploys to Netlify with two small serverless functions for the CMS

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Astro 6.4 (static output) |
| **Language** | TypeScript 5 |
| **Styling** | Scoped component CSS + Tailwind CSS 4 (via `@tailwindcss/vite`) |
| **Animations** | GSAP 3.15 + ScrollTrigger, AOS, Motion |
| **Canvas** | Native Canvas 2D API (globe) |
| **Content** | Astro Content Collections (`src/content.config.ts`, Zod-validated) |
| **CMS** | Decap CMS (`public/admin`), self-hosted GitHub OAuth backend |
| **Backend** | Netlify Functions (`netlify/functions/*.mts`) — OAuth + admin invite |
| **Fonts** | Inter (EN), Cairo (AR) |
| **Build tool** | Vite (via Astro) |
| **CI** | GitHub Actions (build check + README auto-update) |
| **Hosting** | Netlify |

---

## Project Structure

```
yg-auditors-website/
├── .github/
│   └── workflows/
│       ├── build.yml             # Builds the site on every push/PR (status badge above)
│       └── update-readme.yml     # Auto-commits the "Last updated" date on push to master
├── netlify/
│   └── functions/                # Netlify Functions (CMS backend)
│       ├── auth.mts              # Starts the GitHub OAuth flow for Decap CMS login
│       ├── callback.mts          # GitHub OAuth callback, exchanges code for token
│       └── invite.mts            # Admin-only: invites a new CMS editor by email
├── public/
│   ├── admin/
│   │   ├── index.html            # Decap CMS entry point — served at /admin
│   │   └── config.yml            # CMS collections/fields config (maps to src/content/*)
│   └── images/                   # Static image assets
├── src/
│   ├── components/                # One file per page section
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── TrustBanner.astro
│   │   ├── LogoMarquee.astro
│   │   ├── Services.astro         # Uses LivingEarth (panel variant)
│   │   ├── LivingEarth.astro      # Reusable canvas globe (hero + panel variants)
│   │   ├── Process.astro          # Animated zigzag process timeline
│   │   ├── Industries.astro
│   │   ├── Qualifications.astro
│   │   ├── Team.astro
│   │   ├── Consultant.astro       # Free consultation form
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── content/                   # CMS-editable content (Decap writes here)
│   │   ├── sections/               # hero.json, about.json, services.json, etc. — one per page section
│   │   ├── team/                   # One JSON file per team member (e.g. youssef-galal.json)
│   │   └── contact-info.json       # Address, phones, working hours, social links
│   ├── content.config.ts          # Astro Content Collections + Zod schemas for everything above
│   ├── data/                       # Static (non-CMS) site data as JSON
│   │   ├── brand.json
│   │   ├── company.json
│   │   ├── services.json
│   │   ├── industries.json
│   │   └── team.json
│   ├── layouts/
│   │   └── Layout.astro           # Root HTML shell, global fonts
│   ├── pages/
│   │   ├── index.astro            # English homepage
│   │   ├── index-a.astro          # Arabic homepage
│   │   ├── accept-invite.astro    # Invited editors set up CMS access here
│   │   └── admin/
│   │       └── invite.astro       # Admin-only page to send a new editor invite
│   └── styles/
│       └── global.css             # CSS custom properties, resets, shared utilities
├── astro.config.mjs                # i18n (en/ar), Tailwind Vite plugin, site URL
├── netlify.toml                    # Build command, publish dir, functions dir
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js 22.12+ (required by Astro 6), npm 9+

```bash
git clone <repo-url>
cd yg-auditors-website
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # outputs to dist/
npm run preview    # preview production build
```

---

## Internationalization

| Page | Language | Direction |
|------|----------|-----------|
| `/index.html` | English | LTR |
| `/index-a.html` | Arabic | RTL |

Each component accepts a `lang` prop (`"en"` or `"ar"`) and renders the matching content from its inline content object or the JSON data files.

---

## Deployment

The site is deployed on **Netlify**, connected directly to this GitHub repository.

### Site build

- `netlify.toml` sets the build command (`npm run build`), publish directory (`dist`),
  and the Netlify Functions directory (`netlify/functions`)
- Every push to `master` triggers a Netlify build + deploy automatically
- `astro.config.mjs` sets the canonical `site` URL and i18n locales used at build time

### Content editor (Decap CMS)

The CMS at **`/admin`** lets a non-technical editor update page text, team members,
and contact info without touching code — every save is committed straight to this
GitHub repo (to `src/content/...`), which then re-triggers a Netlify build.

Decap CMS originally used Netlify Identity for login; it was switched to a
**self-hosted GitHub OAuth** backend so editors log in with their GitHub account
directly, with no third-party identity service involved:

1. Editor visits `/admin` → CMS redirects to the `auth` function
2. `netlify/functions/auth.mts` redirects to GitHub's OAuth authorize screen
3. GitHub redirects back to `netlify/functions/callback.mts`, which exchanges the
   code for an access token and hands it back to the CMS
4. CMS uses that token to read/write content files via the GitHub API

This requires two environment variables, set in the Netlify site's
**Site settings → Environment variables** (also in `.env` for local CMS testing):

| Variable | Purpose |
|----------|---------|
| `OAUTH_CLIENT_ID` | GitHub OAuth App client ID |
| `OAUTH_CLIENT_SECRET` | GitHub OAuth App client secret |

The GitHub OAuth App's callback URL must point to
`https://<your-netlify-site>/.netlify/functions/callback`.

### Inviting new editors

An existing admin can invite a new CMS editor by email from **`/admin/invite`**.
That calls `netlify/functions/invite.mts` (checks the caller has the `admin` role),
and the invited person finishes setup at **`/accept-invite`**.

### CI

- **`.github/workflows/build.yml`** — runs `npm ci && npm run build` on every push/PR
  to `master` as a sanity check independent of Netlify; status shown by the badge at
  the top of this README
- **`.github/workflows/update-readme.yml`** — after a successful push to `master`,
  refreshes the "Last updated" date in this README and commits it back (skipped for
  its own commits to avoid looping)
