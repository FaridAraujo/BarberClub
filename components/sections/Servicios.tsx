"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { SITE_DATA, ASSET_VERSION, LOGO_PATH } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Corte":
    "Corte a tijera o máquina, aplicación de productos y arreglo de cejas incluido.",
  "Corte con barba":
    "Corte completo con perfilado y arreglo de barba, aplicación de productos y arreglo de cejas incluido.",
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

      gsap.from(q(".s-cta"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".s-cta")[0],
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
      className="relative overflow-hidden bg-background pb-32 pt-16"
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
              <Image
                src={LOGO_SRC}
                alt=""
                width={120}
                height={60}
                unoptimized
                style={{ opacity: 0.04, objectFit: "contain", width: 120, height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── All content above the pattern ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="s-header mb-0">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Servicios
          </p>
          <h2 className="font-display mb-4 text-5xl uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
            Lo que hacemos
          </h2>
          <p className="font-body text-sm text-[#888888]">
            Todos los servicios incluyen productos y arreglo de cejas.
          </p>
        </div>

        {/* ── Barber pole separator: red · white · blue ── */}
        <div className="my-12 flex justify-center">
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
                  ? "mt-12 border-t border-t-[#333333] pt-12 md:mt-0 md:border-t-0 md:pt-0"
                  : ""
              }`}
            >
              {/* Top rule */}
              <div className="mb-6 h-px w-full bg-[#333333]" />

              {/* Name */}
              <h3 className="font-display mb-4 text-4xl uppercase leading-none tracking-tight md:text-5xl">
                {service.name}
              </h3>

              {/* Description */}
              <p className="font-body mb-6 text-sm font-light leading-relaxed text-[#888888]">
                {SERVICE_DESCRIPTIONS[service.name] ?? ""}
              </p>

              {/* Bottom rule */}
              <div className="mb-6 h-px w-full bg-[#333333]" />

              {/* Price */}
              <div className="flex flex-col gap-2">
                <span className="font-display text-5xl font-bold leading-none text-white md:text-6xl">
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
        <div className="s-payment mt-14 border-t border-t-[#333333] pt-8">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Métodos de pago
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {/* Tarjeta */}
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3.5" width="14" height="9" rx="1.5" />
                <line x1="1" y1="6.5" x2="15" y2="6.5" />
              </svg>
              <span className="font-body text-sm text-[#888888]">Tarjeta</span>
            </div>
            {/* SINPE Móvil */}
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4.5" y="1" width="7" height="14" rx="1.5" />
                <line x1="4.5" y1="11.5" x2="11.5" y2="11.5" />
                <circle cx="8" cy="13.2" r="0.6" fill="#888888" />
              </svg>
              <span className="font-body text-sm text-[#888888]">SINPE Móvil</span>
            </div>
            {/* Efectivo */}
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="14" height="8" rx="1" />
                <circle cx="8" cy="8" r="2" />
                <line x1="4" y1="4" x2="4" y2="12" />
                <line x1="12" y1="4" x2="12" y2="12" />
              </svg>
              <span className="font-body text-sm text-[#888888]">Efectivo</span>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="s-cta mt-10 flex flex-col items-start gap-5 md:mt-14">
          <p className="font-body text-xs uppercase tracking-widest text-[#888888]">
            ¿Listo para tu corte?
          </p>
          <motion.button
            className="font-body min-h-[44px] cursor-pointer border border-white bg-transparent px-8 py-3 text-sm uppercase tracking-widest text-white"
            whileHover={{ backgroundColor: "#ffffff", color: "#0a0a0a" }}
            transition={{ duration: 0.3 }}
            onClick={() =>
              document.getElementById("equipo")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Conoce al equipo
          </motion.button>
        </div>

      </div>
    </section>
  )
}
