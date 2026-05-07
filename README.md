# Barber Club — Barbershop Website

> Production-ready website built for a local barbershop in Heredia, Costa Rica.
> Designed and developed as a portfolio project with the goal of delivering a real product to a real client.

## Live Demo
[barberclubcr.com](https://barberclubcr.com)

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
- WhatsApp barber picker — bottom sheet con foto, nombre y link directo a cada barbero
- Multi-app navigation picker — abre Google Maps, Waze, Uber o Apple Maps (iOS-only) según el dispositivo
- Local photo carousel — drag/swipe con Framer Motion, indicadores con degradado bandera de Costa Rica
- Local SEO — Schema JSON-LD tipo `BarberShop` con horarios, geo-coordenadas y rating
- Custom 404 page and Privacy Policy page (`/privacidad`)
- React portals — modals renderizados en `document.body` para escapar el stacking context creado por GSAP transforms
- Reviews section with modal — Google reviews with star ratings, featured quote, and direct Google review CTA
- Google review CTA in hero — social proof badge (★ 5.0) anchored in the hero section

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
<img width="1365" height="628" alt="image" src="https://github.com/user-attachments/assets/1d489e28-fbb9-4d3d-8ba6-62f9f8a14f58" />

> Services
<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/f6b48989-63b3-4257-9c95-37bee08aa393" />

> Team
<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/65ae4496-5171-435a-8325-2e3c00dd82b4" />

> Gallery
<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/2963f64b-45bb-4447-b18b-d6cf2e977ea7" />

> Visit
<img width="1363" height="624" alt="image" src="https://github.com/user-attachments/assets/492fc91d-febb-44cc-bf54-54b99dc1aa73" />

> **Note:** Screenshots show the desktop layout. The site includes interactive elements not captured here — a WhatsApp barber picker sheet, a multi-app navigation picker (Google Maps / Waze / Uber / Apple Maps), and a local photo carousel with drag/swipe. On mobile, the layout adapts significantly: hero height, section padding, and card orientation all change, and the sticky header becomes a full-screen hamburger menu with live open/closed status, full schedule, and navigation app shortcuts.

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
- Using `ReactDOM.createPortal` to render modals outside GSAP-animated ancestors — `position: fixed` breaks when any ancestor has `transform` applied, which GSAP does on scroll; portaling to `document.body` solves this cleanly
- Local SEO with Schema JSON-LD: structuring `BarberShop` schema with opening hours, geo-coordinates, and social links for Google rich results
- Building a drag carousel with Framer Motion `useMotionValue` and dynamic card sizing based on container `clientWidth`
- Mobile viewport height stability — `100dvh` changes value as the browser chrome shows/hides on scroll, causing background images to stretch; `100svh` (small viewport height) locks to the stable minimum and eliminates the jump
