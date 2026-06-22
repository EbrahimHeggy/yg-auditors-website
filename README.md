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
- **Dark theme** — unified dark palette (`#08091A`) with purple accent throughout
- **Static output** — zero server runtime; deploys to any static host

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Astro 6.4 (static output) |
| **Language** | TypeScript 5 |
| **Styling** | Scoped component CSS + CSS custom properties |
| **Animations** | GSAP 3.15 + ScrollTrigger |
| **Canvas** | Native Canvas 2D API (globe) |
| **Fonts** | Inter (EN), Cairo (AR) |
| **Build tool** | Vite (via Astro) |
| **Deploy target** | Static hosting (Netlify, Vercel, cPanel) |

---

## Project Structure

```
yg-auditors-website/
├── src/
│   ├── components/           # One file per page section
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── TrustBanner.astro
│   │   ├── LogoMarquee.astro
│   │   ├── Services.astro    # Uses LivingEarth (panel variant)
│   │   ├── LivingEarth.astro # Reusable canvas globe (hero + panel variants)
│   │   ├── Process.astro     # Animated zigzag process timeline
│   │   ├── Industries.astro
│   │   ├── Qualifications.astro
│   │   ├── Team.astro
│   │   ├── Consultant.astro  # Free consultation form
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/                 # Site content as JSON
│   │   ├── brand.json
│   │   ├── company.json
│   │   ├── services.json
│   │   ├── industries.json
│   │   ├── team.json
│   │   └── contact.json
│   ├── layouts/
│   │   └── Layout.astro      # Root HTML shell, global fonts
│   ├── pages/
│   │   ├── index.astro       # English
│   │   └── index-a.astro     # Arabic
│   └── styles/
│       └── global.css        # CSS custom properties, resets, shared utilities
├── public/                   # Static assets (images, favicon, PDF)
├── astro.config.mjs
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

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

After `npm run build`, upload the `dist/` folder to any static host:

- **Netlify / Vercel** — connect repo; build command `npm run build`, publish dir `dist`
- **cPanel / shared hosting** — upload contents of `dist/` to `public_html`
