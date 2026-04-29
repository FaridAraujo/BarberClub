# Barber Club — Barbershop Website

> Production-ready website built for a local barbershop in Heredia, Costa Rica.
> Designed and developed as a portfolio project with the goal of delivering a real product to a real client.

## Live Demo
[barber-club-omega.vercel.app](https://barber-club-omega.vercel.app)

## Features

- Animated hero with GSAP scroll-triggered reveals and parallax effects
- Real-time open/closed status badge — pure client-side UTC-6 timezone logic, updates every minute
- Services section with pricing and payment methods (Card / SINPE Móvil / Cash)
- Team section with individual WhatsApp links per barber
- Asymmetric photo gallery showcasing real haircut work
- Embedded Google Maps with custom grayscale styling
- Business hours display and WhatsApp availability CTA
- Sticky header with scroll-aware logo transition and active section detection
- Mobile hamburger menu with live status, full schedule, and social links
- Responsive images via `<picture>` — mobile-specific crop generated with Sharp at build time
- Custom animated barber pole (CSS + GSAP) used as a decorative separator
- Fully responsive — mobile-first design optimized for 375px viewports

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| Microinteractions | Framer Motion |
| Fonts | next/font (Google Fonts) |
| Image optimization | Sharp (custom build script → WebP) |
| Deployment | Vercel (Hobby) |

## Lighthouse Scores (Desktop)

| Metric | Score |
|---|---|
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

## Screenshots

> Hero section
<img width="1365" height="623" alt="image" src="https://github.com/user-attachments/assets/0dd850fd-f3cc-4cda-9d7d-8a98a5d6a7f1" />

> Services
<img width="1365" height="626" alt="image" src="https://github.com/user-attachments/assets/27b3f7e3-d1b6-42c5-a7f1-af25c6ddddc7" />

> Team
<img width="1365" height="635" alt="image" src="https://github.com/user-attachments/assets/66c4c865-458c-48a6-a41c-cfc16ada17ca" />

> Gallery
<img width="1365" height="627" alt="image" src="https://github.com/user-attachments/assets/2e9cf3b8-7630-4685-8670-5b41fa9a527c" />

> Visit
<img width="1365" height="626" alt="image" src="https://github.com/user-attachments/assets/b1ac886b-1c48-4323-86e0-dc54802ac2b5" />

## Run Locally

```bash
git clone https://github.com/FaridAraujo/barber-club
cd barber-club
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

To regenerate optimized images after replacing source files:

```bash
node scripts/optimize-images.mjs
```

## What I Learned

- Implementing scroll-based animations with GSAP ScrollTrigger in a Next.js App Router (client component) setup
- Responsive image strategy with `<picture>` + `<source media>`: serving a landscape crop on desktop and an attention-cropped portrait on mobile, both generated via a custom Sharp script
- Timezone-aware business logic without a backend — computing Costa Rica UTC-6 time client-side to display a real-time open/closed badge
- Mobile UX optimization: diagnosing infinite-scroll feel, reducing perceived page length, and adapting layouts (horizontal cards, hero height, section padding) per breakpoint
- Achieving perfect Lighthouse Accessibility and SEO scores from the ground up
- Building a complete client-facing product with real content, real photos, and real business logic
- Structuring a Next.js project for maintainability with a centralized `constants.ts` and shared utility modules
