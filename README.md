# ✂️ Barber Club — Barbershop Website

> Production-ready website built for a local barbershop in Heredia, Costa Rica.
> Designed and developed as a portfolio project with the goal of delivering a real product to a real client.

## 🚀 Live Demo
[barber-club-omega.vercel.app](https://barber-club-omega.vercel.app)

## 📋 Features

- Animated hero section with GSAP scroll-triggered reveals and parallax effects
- Services section with pricing and payment methods (Card / SINPE Móvil / Cash)
- Team section with individual WhatsApp links per barber
- Asymmetric photo gallery showcasing real haircut work
- Embedded Google Maps with custom grayscale styling
- Business hours display and availability CTA via WhatsApp
- Sticky header with scroll-aware logo transition
- Custom barber pole CSS scrollbar
- Fully responsive — mobile, tablet, and desktop

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| Microinteractions | Framer Motion |
| Components | shadcn/ui |
| Fonts | next/font (Google Fonts) |
| Images | next/image |
| Deployment | Vercel (Hobby) |

## 📊 Lighthouse Scores (Desktop)

| Metric | Score |
|---|---|
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

## 📸 Screenshots

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




## ⚙️ Run Locally

```bash
git clone https://github.com/FaridAraujo/barber-club
cd barber-club
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 What I Learned

- Implementing scroll-based animations with GSAP ScrollTrigger on a Next.js App Router setup
- Optimizing images for production: converting to WebP and resizing for real display dimensions
- Achieving perfect Lighthouse Accessibility and SEO scores from the ground up
- Building a complete client-facing product with real content, real photos, and real business logic
- Structuring a Next.js project for maintainability using a centralized `constants.ts` for all site data
