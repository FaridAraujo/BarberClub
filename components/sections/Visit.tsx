"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const MAPS_QUERY = "9.9906133,-84.1351361"
const WHATSAPP_LINK =
  `https://wa.me/${SITE_DATA.whatsapp}?text=${encodeURIComponent("Hola Barber Club, ¿hay espacio disponible?")}`
const MAPS_LINK = `https://www.google.com/maps?q=${MAPS_QUERY}`
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 11 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5.5 1C3.015 1 1 3.015 1 5.5C1 8.75 5.5 13 5.5 13S10 8.75 10 5.5C10 3.015 7.985 1 5.5 1Z" />
      <circle cx="5.5" cy="5.5" r="1.5" />
    </svg>
  )
}

export default function Visit() {
  const containerRef = useRef<HTMLElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const st = {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }

      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: st,
      })

      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: st,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="visita"
      ref={containerRef}
      className="bg-background pb-20 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="mb-10 md:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Encuéntranos
          </p>
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
            Visítanos
          </h2>
        </div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">

          {/* ── Left: schedule + WhatsApp ── */}
          <div ref={leftRef} className="flex flex-col">

            <p className="font-body mb-6 text-xs uppercase tracking-widest text-[#888888]">
              Horario
            </p>

            <div className="flex flex-col">
              {SITE_DATA.schedule.map((row, i) => (
                <div key={row.days}>
                  <div className="flex items-center justify-between py-4">
                    <span className="font-body text-sm text-white">
                      {row.days}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: row.hours === "Cerrado" ? "#cc2222" : "#888888" }}
                    >
                      {row.hours}
                    </span>
                  </div>
                  {i < SITE_DATA.schedule.length - 1 && (
                    <div className="h-px w-full bg-[#1a1a1a]" />
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 border-t border-[#333333] pt-8">
              <p className="font-body mb-4 text-sm text-[#888888]">
                ¿Querés saber si hay espacio?
              </p>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex min-h-[44px] cursor-pointer items-center gap-3 border bg-transparent px-6 py-3 text-sm uppercase tracking-widest"
                style={{ borderColor: "#25D366", color: "#25D366" }}
                whileHover={{ backgroundColor: "#25D366", color: "#000000" }}
                transition={{ duration: 0.3 }}
              >
                <WhatsAppIcon />
                Preguntá por WhatsApp
              </motion.a>
            </div>
          </div>

          {/* ── Right: map ── */}
          <div ref={rightRef} className="flex flex-col gap-4">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              style={{
                border: "none",
                borderRadius: 4,
                filter: "grayscale(100%)",
                display: "block",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Barber Club"
              className="h-[250px] md:h-[400px]"
            />
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body flex items-center gap-2 text-sm text-[#888888] transition-colors duration-200 hover:text-white"
            >
              <PinIcon />
              Abrir en Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
