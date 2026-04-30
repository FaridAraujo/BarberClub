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
    text: "El servicio es rápido!! Pero de igual forma ir con tiempo porque tienen buena clientela!! Le cortaron el pelo a mi hijo de 5 años, y tenían lo necesario para atenderlo perfectamente, el corte que sugerí se lo hicieron tal cual! A la par hay donde comer y eso le suma puntos porque se puede comer algo mientras se espera!!",
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
  { id: 3, name: "Alejandro LN",  stars: 5 },
  { id: 4, name: "David Vargas",  stars: 5 },
]

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#cc2222" : "none"} stroke="#cc2222" strokeWidth="1.5" aria-hidden>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < count} />
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
        opacity: 0, y: 36, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: q(".r-grid")[0], start: "top 82%", toggleActions: "play none none none" },
      })

      gsap.from(q(".r-silent"), {
        opacity: 0, y: 12, duration: 0.5, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: q(".r-silent")[0], start: "top 90%", toggleActions: "play none none none" },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="resenas"
      ref={containerRef}
      className="bg-background pb-20 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="r-header mb-10 md:mb-16">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Reseñas
          </p>
          <div className="flex items-end gap-5">
            <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
              Lo que dicen
            </h2>
            {/* Rating badge */}
            <div className="mb-1 flex items-center gap-2 md:mb-2">
              <Stars count={5} />
              <span className="font-body text-xs text-[#888888]">
                5.0 · 4 reseñas en Google
              </span>
            </div>
          </div>
        </div>

        {/* ── Review cards ── */}
        <div className="r-grid grid grid-cols-1 gap-px bg-[#1a1a1a] md:grid-cols-2">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="r-card flex flex-col gap-5 bg-background p-6 md:p-8"
            >
              {/* Quote mark */}
              <span
                className="font-display leading-none text-[#cc2222] select-none"
                style={{ fontSize: 64, lineHeight: 1, opacity: 0.4 }}
                aria-hidden
              >
                "
              </span>

              {/* Text */}
              <p className="font-body flex-1 text-sm leading-relaxed text-[#cccccc]">
                {review.text}
              </p>

              {/* Footer */}
              <div className="border-t border-[#1a1a1a] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-sm font-medium text-white">
                      {review.name}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-widest text-[#555555]">
                      {review.badge} · {review.date}
                    </span>
                  </div>
                  <Stars count={review.stars} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Silent 5-star reviews ── */}
        <div className="mt-px grid grid-cols-2 gap-px bg-[#1a1a1a]">
          {SILENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="r-silent flex items-center justify-between bg-background px-6 py-4 md:px-8"
            >
              <span className="font-body text-sm text-[#666666]">
                {review.name}
              </span>
              <Stars count={review.stars} />
            </div>
          ))}
        </div>

        {/* ── Google CTA ── */}
        <div className="mt-8 flex justify-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#555555] transition-colors duration-200 hover:text-white"
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
