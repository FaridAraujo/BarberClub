"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const LAT  = "9.9906133"
const LNG  = "-84.1351361"

const MAPS_EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&output=embed`

const NAV_APPS = [
  {
    id:      "google",
    label:   "Google Maps",
    href:    `https://www.google.com/maps?q=${LAT},${LNG}`,
    logo:    "/images/logos/googlemaps.webp",
    size:    26,
    iosOnly: false,
  },
  {
    id:      "uber",
    label:   "Uber",
    href:    `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${LAT}&dropoff[longitude]=${LNG}&dropoff[nickname]=Barber%20Club`,
    logo:    "/images/logos/uber.webp",
    size:    38,
    iosOnly: false,
  },
  {
    id:      "waze",
    label:   "Waze",
    href:    `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`,
    logo:    "/images/logos/waze.webp",
    size:    32,
    iosOnly: false,
  },
  {
    id:      "apple",
    label:   "Apple Maps",
    href:    `https://maps.apple.com/?q=${LAT},${LNG}`,
    logo:    "/images/logos/applemaps.webp",
    size:    32,
    iosOnly: true,
  },
] as const

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

// ─── Map with click-to-load on mobile, always-on on desktop ─────────────────
// Single iframe — src only activates when ready, so no network request fires
// on mobile until the user taps. On desktop, a useEffect sets loaded=true
// immediately after mount so the map loads normally.

function MobileMap({ embedSrc }: { embedSrc: string }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Auto-load on desktop (≥768px); mobile waits for the user to tap.
    if (window.matchMedia("(min-width: 768px)").matches) {
      setLoaded(true)
    }
  }, [])

  return (
    <div>
      {/* Placeholder — mobile only, gone after tap */}
      {!loaded && (
        <button
          onClick={() => setLoaded(true)}
          className="flex h-[250px] w-full flex-col items-center justify-center gap-3 border border-[#2a2a2a] bg-[#111111] md:hidden"
          style={{ borderRadius: 4 }}
          aria-label="Cargar mapa"
        >
          <PinIcon />
          <span className="font-body text-xs uppercase tracking-widest text-[#666666]">
            Tocar para ver el mapa
          </span>
        </button>
      )}

      {/* Single iframe — src is only set once loaded=true */}
      <iframe
        src={loaded ? embedSrc : undefined}
        width="100%"
        style={{ border: "none", borderRadius: 4, filter: "grayscale(100%)" }}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        title="Ubicación Barber Club"
        className={`h-[250px] md:h-[400px] ${loaded ? "block" : "hidden"}`}
      />
    </div>
  )
}

const LOCAL_PHOTOS = [
  { src: "/images/local-1.webp", alt: "Barber Club — interior",   position: "center 60%" },
  { src: "/images/local-3.webp", alt: "Barber Club — ambiente",   position: "center" },
  { src: "/images/local-2.webp", alt: "Barber Club — estaciones", position: "center" },
  { src: "/images/local-4.webp", alt: "Barber Club — detalle",    position: "center" },
  { src: "/images/local-5.webp", alt: "Barber Club — local",      position: "center" },
  { src: "/images/local-6.webp", alt: "Barber Club — espacio",    position: "center" },
]

const CARD_GAP = 16

function LocalCarousel() {
  const trackRef      = useRef<HTMLDivElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const x             = useMotionValue(0)
  const [active,      setActive]      = useState(0)
  const [dragging,    setDragging]    = useState(false)
  const [cardWidth,   setCardWidth]   = useState(0)
  const [cardMaxH,    setCardMaxH]    = useState(700)
  const [maxDrag,     setMaxDrag]     = useState(0)
  const [states, setStates] = useState<Array<"idle" | "loaded" | "error">>(
    LOCAL_PHOTOS.map(() => "idle")
  )
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  // Card = full container width; recalculate on mount and resize
  useEffect(() => {
    function calc() {
      if (!containerRef.current) return
      const cw = containerRef.current.clientWidth
      const vh = window.innerHeight
      setCardWidth(cw)
      setCardMaxH(Math.min(700, Math.round(vh * 1.2)))
      setMaxDrag((LOCAL_PHOTOS.length - 1) * (cw + CARD_GAP))
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  // Check for already-cached images (onLoad won't fire for these)
  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el || !el.complete) return
      setPhotoState(i, el.naturalWidth > 0 ? "loaded" : "error")
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Snap to card when drag ends
  function onDragEnd() {
    setDragging(false)
    if (!cardWidth) return
    const cur     = x.get()
    const nearest = Math.round(-cur / (cardWidth + CARD_GAP))
    const clamped = Math.max(0, Math.min(nearest, LOCAL_PHOTOS.length - 1))
    setActive(clamped)
    animate(x, -clamped * (cardWidth + CARD_GAP), {
      type: "spring", stiffness: 300, damping: 35,
    })
  }

  function goTo(i: number) {
    if (!cardWidth) return
    setActive(i)
    animate(x, -i * (cardWidth + CARD_GAP), {
      type: "spring", stiffness: 300, damping: 35,
    })
  }

  function setPhotoState(i: number, state: "loaded" | "error") {
    setStates((prev) => prev.map((s, idx) => idx === i ? state : s))
  }

  const CARD_H = cardWidth ? `${Math.min(Math.round(cardWidth * 1.6), cardMaxH)}px` : "520px"

  return (
    <div className="mt-12 md:mt-20">
      <div className="h-px w-full bg-[#1a1a1a]" />

      <div className="mt-10 md:mt-14">
        {/* Overflow container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          <motion.div
            ref={trackRef}
            style={{ x, display: "flex", gap: CARD_GAP, width: "max-content" }}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
          >
            {LOCAL_PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                style={{
                  width:           cardWidth || "100vw",
                  height:          CARD_H,
                  flexShrink:      0,
                  borderRadius:    4,
                  overflow:        "hidden",
                  position:        "relative",
                  backgroundColor: "#111111",
                  border:          "1px solid #1a1a1a",
                }}
              >
                {/* Placeholder — visible until image loads */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                  style={{ opacity: states[i] === "loaded" ? 0 : 1, pointerEvents: "none" }}
                >
                  <p className="font-body text-[10px] uppercase tracking-widest text-[#2a2a2a]">
                    {states[i] === "error" ? "Foto próximamente" : "Barber Club · Heredia"}
                  </p>
                </div>

                {/* Image — always rendered so onLoad fires even when cached */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  ref={(el) => { imgRefs.current[i] = el }}
                  onLoad={()  => setPhotoState(i, "loaded")}
                  onError={() => setPhotoState(i, "error")}
                  style={{
                    width:          "100%",
                    height:         "100%",
                    objectFit:      "cover",
                    objectPosition: photo.position,
                    userSelect:     "none",
                    pointerEvents:  "none",
                    opacity:       states[i] === "loaded" ? 1 : 0,
                    transition:    "opacity 0.5s ease",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots with barber pole gradient */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {LOCAL_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1}`}
              style={{
                width:        active === i ? 20 : 6,
                height:       6,
                borderRadius: 3,
                background:   "linear-gradient(to right, #cc2222, #ffffff, #1432a6)",
                opacity:      active === i ? 1 : 0.2,
                transition:   "width 0.3s ease, opacity 0.3s ease",
                border:       "none",
                padding:      0,
                cursor:       "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Visit() {
  const containerRef = useRef<HTMLElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent))
    )
  }, [])

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
      className="bg-background pb-14 pt-8 md:pb-14 md:pt-8 lg:pb-28 lg:pt-16"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="mb-6 md:mb-8 lg:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            Encuéntranos
          </p>
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight lg:text-6xl xl:text-7xl">
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

            {/* ── Parking notice ── */}
            <div className="mt-6 flex items-start gap-3 border border-[#1a1a1a] px-4 py-3" style={{ borderRadius: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
                <polygon points="22,12 17,3.3 7,3.3 2,12 7,20.7 17,20.7" />
                <path d="M9 15.5V8.5h3.5a2.5 2.5 0 0 1 0 5h-3.5" />
              </svg>
              <span className="font-body text-xs text-[#888888] leading-relaxed">
                Contamos con <span className="text-white">parqueo disponible</span> para nuestros clientes.
              </span>
            </div>

          </div>

          {/* ── Right: map ── */}
          <div ref={rightRef} className="flex flex-col gap-4">

            {/* Mobile: click-to-load placeholder (avoids loading ~2MB of Maps JS on page load) */}
            <MobileMap embedSrc={MAPS_EMBED} />

            {/* ── Nav app links ── */}
            <div className="border-t border-t-[#1a1a1a] pt-5">
              <p className="font-body mb-3 text-xs uppercase tracking-widest text-[#555]">
                Cómo llegar
              </p>
              <div className="flex flex-wrap gap-2">
                {NAV_APPS.filter((app) => !app.iosOnly || isIOS).map((app) => (
                  <a
                    key={app.id}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center gap-2 border border-[#2a2a2a] px-3 py-2 text-xs text-[#aaaaaa] transition-all duration-200 hover:border-[#555] hover:text-white"
                    style={{ borderRadius: 4 }}
                  >
                    <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: app.id === "uber" ? "flex-start" : "center", overflow: "hidden", borderRadius: 3, flexShrink: 0 }}>
                      <img src={app.logo} alt="" width={app.id === "google" ? 13 : app.id === "uber" ? 20 : 16} height={app.id === "google" ? 13 : app.id === "uber" ? 20 : 16} style={{ objectFit: "contain", flexShrink: 0 }} />
                    </div>
                    {app.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Local photo carousel ── */}
        <LocalCarousel />

      </div>
    </section>
  )
}
