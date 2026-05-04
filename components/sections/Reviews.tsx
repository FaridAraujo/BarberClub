"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const GOOGLE_MAPS_URL = "https://www.google.com/maps?q=9.9906133,-84.1351361"

const REVIEWS = [
  {
    id: 1,
    name: "Ricardo Nu Cz",
    badge: "Local Guide",
    stars: 5,
    text: "El servicio es rápido!! Pero de igual forma ir con tiempo porque tienen buena clientela!! Le cortaron el pelo a mi hijo de 5 años, y tenían lo necesario para atenderlo perfectamente, el corte que sugerí se lo hicieron tal cual!",
    date: "Hace 2 meses",
  },
  {
    id: 2,
    name: "Josué Choso Rojas",
    badge: "Local Guide",
    stars: 5,
    text: "Una de las mejores barberías de Heredia junto a uno de los mejores barberos como es Dylan.",
    date: "Hace 2 años",
  },
]

const SILENT_REVIEWS = [
  { id: 3, name: "Alejandro LN", stars: 5 },
  { id: 4, name: "David Vargas",  stars: 5 },
]

function Stars({ count, size = 11 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1.5" aria-hidden
          style={{ color: i < count ? "#ffffff" : "#333333" }}
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef)

      gsap.from(q(".r-header"), {
        opacity: 0, y: 20, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
      })

      gsap.from(q(".r-card"), {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: q(".r-card")[0], start: "top 85%", toggleActions: "play none none none" },
      })

      gsap.from(q(".r-footer"), {
        opacity: 0, y: 12, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: q(".r-footer")[0], start: "top 90%", toggleActions: "play none none none" },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="resenas"
      ref={containerRef}
      className="bg-background pb-14 pt-8 md:pb-14 md:pt-8 lg:pb-28 lg:pt-16"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="r-header mb-6 md:mb-8 lg:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Reseñas
          </p>

          {/* Title row — heading left, score right */}
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl uppercase leading-none tracking-tight lg:text-6xl xl:text-7xl">
              Lo que dicen
            </h2>

            {/* Score block */}
            <div className="flex flex-col items-end gap-1.5 pb-1">
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  background: "linear-gradient(90deg, #666, #e0e0e0, #999, #d4d4d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                5.0
              </span>
              <Stars count={5} size={12} />
              <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
                4 reseñas · Google
              </span>
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="flex flex-col">
          {REVIEWS.map((review, i) => (
            <div key={review.id} className="r-card">
              {i === 0 && <div className="h-px w-full bg-[#1a1a1a]" />}
              <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-[200px_1fr] md:gap-12 md:py-10">

                {/* Left — author */}
                <div className="flex flex-col gap-2">
                  <span className="font-body text-sm text-white">{review.name}</span>
                  <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
                    {review.badge} · {review.date}
                  </span>
                  <div className="hidden md:block mt-1">
                    <Stars count={review.stars} />
                  </div>
                </div>

                {/* Right — text */}
                <div className="flex flex-col justify-center">
                  <p className="font-body text-sm leading-relaxed text-[#888888]">
                    {review.text}
                  </p>
                  <div className="mt-4 md:hidden">
                    <Stars count={review.stars} />
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-[#1a1a1a]" />
            </div>
          ))}

          {/* Silent reviews */}
          <div className="flex">
            {SILENT_REVIEWS.map((review, i) => (
              <div
                key={review.id}
                className="flex flex-1 items-center justify-between py-5 md:py-6"
                style={{
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === 0 ? 24 : 0,
                  borderRight: i === 0 ? "1px solid #1a1a1a" : "none",
                }}
              >
                <span className="font-body text-sm text-[#555]">{review.name}</span>
                <Stars count={review.stars} />
              </div>
            ))}
          </div>
          <div className="h-px w-full bg-[#1a1a1a]" />
        </div>

        {/* ── Google CTA ── */}
        <div className="r-footer mt-8">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#555] transition-colors duration-200 hover:text-white"
          >
            Ver en Google Maps
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M2 8L8 2M8 2H4M8 2V6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
