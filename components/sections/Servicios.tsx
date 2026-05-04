"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE_DATA, ASSET_VERSION, LOGO_PATH } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Corte":
    "Tijera o máquina, como vos querás. Productos y cejas incluidas.",
  "Corte con barba":
    "El combo completo: corte, barba perfilada, productos y cejas. Todo en una visita.",
}

const formatPrice = (price: number): string =>
  `₡${price.toLocaleString("en-US")}`

const LOGO_SRC = `${LOGO_PATH}?${ASSET_VERSION}`

export default function Servicios() {
  const containerRef = useRef<HTMLElement>(null)
  const redLineRef   = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef)

      gsap.from(q(".s-header"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Red separator line: width 0 → 40px
      gsap.from(redLineRef.current, {
        width: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: redLineRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(q(".s-service"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".s-services-row")[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(q(".s-payment"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".s-payment")[0],
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })

    },
    { scope: containerRef }
  )

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="relative overflow-hidden bg-background pb-14 pt-8 md:pb-14 md:pt-8 lg:pb-28 lg:pt-16"
    >
      {/* ── Logo pattern background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          style={{
            transform: "rotate(-15deg) scale(1.4)",
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
            alignContent: "space-around",
            padding: "48px",
          }}
        >
          {Array.from({ length: 16 }).map((_, idx) => (
            <div
              key={idx}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_SRC}
                alt=""
                width={120}
                loading="lazy"
                style={{ opacity: 0.04, objectFit: "contain", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── All content above the pattern ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="s-header mb-0 flex items-start justify-between gap-8">
          <div>
            <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
              Servicios
            </p>
            <h2 className="font-display mb-4 text-4xl uppercase leading-none tracking-tight lg:text-6xl xl:text-7xl">
              Los cortes
            </h2>
            <p className="font-body text-sm text-[#888888]">
              Todo incluido: productos y cejas.
            </p>
          </div>

          {/* Modality — top right, desktop only */}
          <div className="hidden shrink-0 text-right md:block">
            <p className="font-body text-xs uppercase tracking-widest text-[#888888]">
              Modalidad
            </p>
            <p className="font-body mt- max-w-[220px] text-right text-xs normal-case tracking-normal text-[#555]">
              Por orden de llegada, sin citas ni reservas. Para casos especiales, consultá con tu barbero.
            </p>
          </div>
        </div>

        {/* ── Barber pole separator: red · white · blue ── */}
        <div className="my-5 flex justify-center md:my-8 lg:my-12">
          <div
            ref={redLineRef}
            style={{ display: "flex", flexDirection: "row", gap: 3, width: 40, overflow: "hidden" }}
          >
            <div style={{ flex: 1, height: 1, backgroundColor: "#cc2222" }} />
            <div style={{ flex: 1, height: 1, backgroundColor: "#ffffff" }} />
            <div style={{ flex: 1, height: 1, backgroundColor: "#1432a6" }} />
          </div>
        </div>

        {/* ── Services row ── */}
        <div className="s-services-row grid grid-cols-1 gap-0 md:grid-cols-2">
          {SITE_DATA.services.map((service, i) => (
            <div
              key={service.name}
              className={`s-service flex flex-col gap-0 ${
                i === 0
                  ? "md:border-r md:border-r-[#333333] md:pr-12"
                  : "md:pl-12"
              } ${
                i > 0
                  ? "mt-8 border-t border-t-[#333333] pt-8 md:mt-0 md:border-t-0 md:pt-0"
                  : ""
              }`}
            >
              {/* Top rule */}
              <div className="mb-4 h-px w-full bg-[#333333] md:mb-6" />

              {/* Name */}
              <h3 className="font-display mb-3 text-3xl uppercase leading-none tracking-tight md:mb-4 lg:text-5xl">
                {service.name}
              </h3>

              {/* Description — hidden on mobile (already summarised in section subtitle) */}
              <p className="font-body mb-4 hidden text-sm font-light leading-relaxed text-[#888888] md:mb-6 md:block">
                {SERVICE_DESCRIPTIONS[service.name] ?? ""}
              </p>

              {/* Bottom rule */}
              <div className="mb-4 h-px w-full bg-[#333333] md:mb-6" />

              {/* Price */}
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-display text-3xl font-bold leading-none text-white md:text-4xl lg:text-6xl">
                  {formatPrice(service.price)}
                </span>
                <span className="font-body text-xs uppercase tracking-widest text-[#888888]">
                  Incluye productos + cejas
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Payment methods ── */}
        <div className="s-payment mt-10 border-t border-t-[#333333] pt-6 md:mt-14">
          <p className="font-body text-xs uppercase tracking-widest text-[#888888]">
            Métodos de pago
            <span className="ml-3 normal-case tracking-normal">· Tarjeta · SINPE Móvil · Efectivo</span>
          </p>
        </div>

      </div>
    </section>
  )
}
