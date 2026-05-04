"use client"

import React, { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
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

const REVIEWS = [
  {
    id: 1,
    name: "Ricardo Nu Cz",
    badge: "Local Guide",
    text: "El servicio es rápido!! Le cortaron el pelo a mi hijo de 5 años, y tenían lo necesario para atenderlo perfectamente, el corte que sugerí se lo hicieron tal cual!",
  },
  {
    id: 2,
    name: "Josué Choso Rojas",
    badge: "Local Guide",
    text: "Una de las mejores barberías de Heredia junto a uno de los mejores barberos como es Dylan.",
  },
  { id: 3, name: "Alejandro LN",  badge: null, text: null },
  { id: 4, name: "David Vargas",  badge: null, text: null },
]

const GOOGLE_MAPS_URL   = "https://www.google.com/maps?q=9.9906133,-84.1351361"
const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/u4AwTaSoG2NxSH3fA"

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
  const imgRefs       = useRef<(HTMLImageElement | null)[]>([])
  const autoRef       = useRef<ReturnType<typeof setInterval> | null>(null)
  const cardWidthRef  = useRef(0)
  const activeRef     = useRef(0)

  // Keep refs in sync so interval callbacks don't get stale values
  useEffect(() => { cardWidthRef.current = cardWidth }, [cardWidth])
  useEffect(() => { activeRef.current = active }, [active])

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

  // Auto-slide every 4 s — pauses while user is dragging
  function startAuto() {
    stopAuto()
    autoRef.current = setInterval(() => {
      const cw   = cardWidthRef.current
      const next = (activeRef.current + 1) % LOCAL_PHOTOS.length
      if (!cw) return
      activeRef.current = next
      setActive(next)
      animate(x, -next * (cw + CARD_GAP), { type: "spring", stiffness: 300, damping: 35 })
    }, 4000)
  }

  function stopAuto() {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null }
  }

  useEffect(() => {
    if (!cardWidth) return
    startAuto()
    return () => stopAuto()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth])

  // Snap with 25% threshold + velocity so a short swipe is enough
  function onDragEnd(_e: MouseEvent | TouchEvent | PointerEvent, info: { velocity: { x: number }; offset: { x: number } }) {
    setDragging(false)
    startAuto()
    if (!cardWidth) return
    const THRESHOLD = cardWidth * 0.25
    const { x: velX } = info.velocity
    const { x: offX } = info.offset
    let next = activeRef.current
    if (offX < -THRESHOLD || velX < -300) next = Math.min(next + 1, LOCAL_PHOTOS.length - 1)
    else if (offX > THRESHOLD || velX > 300) next = Math.max(next - 1, 0)
    goTo(next)
  }

  function goTo(i: number) {
    if (!cardWidthRef.current) return
    setActive(i)
    activeRef.current = i
    animate(x, -i * (cardWidthRef.current + CARD_GAP), {
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
        <div className="relative">
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
            onDragStart={() => { setDragging(true); stopAuto() }}
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

        {/* Prev arrow — overlaid on left edge */}
        <button
          onClick={() => { goTo(Math.max(active - 1, 0)); startAuto() }}
          aria-label="Foto anterior"
          disabled={active === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:border-white/30"
          style={{ borderRadius: 4, opacity: active === 0 ? 0 : 1, pointerEvents: active === 0 ? "none" : "auto" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>

        {/* Next arrow — overlaid on right edge */}
        <button
          onClick={() => { goTo(Math.min(active + 1, LOCAL_PHOTOS.length - 1)); startAuto() }}
          aria-label="Siguiente foto"
          disabled={active === LOCAL_PHOTOS.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:border-white/30"
          style={{ borderRadius: 4, opacity: active === LOCAL_PHOTOS.length - 1 ? 0 : 1, pointerEvents: active === LOCAL_PHOTOS.length - 1 ? "none" : "auto" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>

        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {LOCAL_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startAuto() }}
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

// ─── Reviews modal ────────────────────────────────────────────────────────────

function StarRow({ count = 5, size = 11 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1.5" aria-hidden
          style={{ color: i < count ? "#f5c518" : "#333" }}
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function ReviewsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  const textReviews   = REVIEWS.filter((r) => r.text)
  const silentReviews = REVIEWS.filter((r) => !r.text)

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="reviews-backdrop"
        className="fixed inset-0 z-[70]"
        style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <motion.div
        key="reviews-panel"
        className="fixed inset-0 z-[71] flex flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex-shrink-0 px-5 pt-5 pb-0 md:px-10 md:pt-7"
          style={{ backgroundColor: "#080808" }}
        >
          {/* Top row: eyebrow + close */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-[10px] uppercase tracking-widest text-[#444]">
              Barber Club · Heredia
            </p>
            <button
              onClick={onClose}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-[#2a2a2a] text-[#555] transition-colors duration-200 hover:border-white hover:text-white"
              aria-label="Cerrar reseñas"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white md:text-5xl">
            Opiniones
          </h2>

          {/* Score row */}
          <div className="mt-4 mb-5 flex items-center gap-3">
            <span
              className="font-display leading-none"
              style={{
                fontSize: "1.75rem",
                backgroundImage: "linear-gradient(90deg, #888, #e0e0e0, #aaa, #d0d0d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              5.0
            </span>
            <StarRow size={12} />
            <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
              {REVIEWS.length} reseñas · Google
            </span>
          </div>

          {/* Barber-pole line — red · white · blue */}
          <div className="h-[2px]" style={{ background: "linear-gradient(to right, #cc2222, #b0b0b0 50%, #1432a6)" }} />
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#080808" }}>
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-10 md:py-14">

            {/* Text reviews */}
            {textReviews.map((review, i) => (
              <div key={review.id}>
                {i === 0 && <div className="h-px bg-[#1a1a1a]" />}
                <div
                  className="grid grid-cols-1 gap-5 py-8 md:grid-cols-[180px_1fr] md:gap-10 md:py-10"
                  style={{
                    opacity: 0,
                    animation: `galleryFadeIn 0.4s ease forwards`,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Author */}
                  <div className="flex flex-col gap-2">
                    <span className="font-body text-sm text-white">{review.name}</span>
                    {review.badge && (
                      <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
                        {review.badge} · Google
                      </span>
                    )}
                    <div className="mt-1">
                      <StarRow size={10} />
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex flex-col justify-center">
                    <p className="font-body text-sm leading-relaxed text-[#888]">
                      "{review.text}"
                    </p>
                  </div>
                </div>
                <div className="h-px bg-[#1a1a1a]" />
              </div>
            ))}

            {/* Silent reviews — compact two-column row */}
            {silentReviews.length > 0 && (
              <div
                className="flex"
                style={{
                  opacity: 0,
                  animation: `galleryFadeIn 0.4s ease forwards`,
                  animationDelay: `${textReviews.length * 80}ms`,
                }}
              >
                {silentReviews.map((review, i) => (
                  <div
                    key={review.id}
                    className="flex flex-1 items-center justify-between py-5"
                    style={{
                      paddingLeft:  i === 0 ? 0 : 24,
                      paddingRight: i === 0 ? 24 : 0,
                      borderRight:  i === 0 ? "1px solid #1a1a1a" : "none",
                    }}
                  >
                    <span className="font-body text-sm text-[#555]">{review.name}</span>
                    <StarRow size={10} />
                  </div>
                ))}
              </div>
            )}
            {silentReviews.length > 0 && <div className="h-px bg-[#1a1a1a]" />}

            {/* Google CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#555] transition-colors duration-200 hover:text-white"
              >
                Ver en Google Maps
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                  <path d="M2 8L8 2M8 2H4M8 2V6" />
                </svg>
              </a>

              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-1.5 border border-[#2a2a2a] px-4 py-2 text-xs uppercase tracking-widest text-[#888] transition-all duration-200 hover:border-[#555] hover:text-white"
                style={{ borderRadius: 4 }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#f5c518", flexShrink: 0 }} aria-hidden>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                Dejá tu opinión
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Visit() {
  const containerRef   = useRef<HTMLElement>(null)
  const leftRef        = useRef<HTMLDivElement>(null)
  const rightRef       = useRef<HTMLDivElement>(null)
  const [isIOS,         setIsIOS]        = useState(false)
  const [showReviews,   setShowReviews]  = useState(false)

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
    <>
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

        {/* ── Opiniones ── */}
        <div className="mt-12 md:mt-16">

          {/* Barber-pole accent line — same as modal header */}
          <div className="h-[2px]" style={{ background: "linear-gradient(to right, #cc2222, #b0b0b0 50%, #1432a6)" }} />

          <div className="pt-8 pb-0 md:pt-10">

            {/* Header: eyebrow + heading / score block */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-body mb-3 text-xs uppercase tracking-widest text-[#555]">
                  ¿Querés venir?
                </p>
                <h3 className="font-display text-2xl uppercase leading-none tracking-tight lg:text-3xl">
                  Mirá lo que dicen
                </h3>
              </div>

              {/* Score */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className="font-display leading-none"
                  style={{
                    fontSize: "2.5rem",
                    backgroundImage: "linear-gradient(90deg, #888, #e8e8e8, #aaa, #d0d0d0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  5.0
                </span>
                <StarRow size={12} />
                <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
                  4 reseñas · Google
                </span>
              </div>
            </div>

            {/* Featured review — barber-pole left stripe + full-width quote */}
            <div className="flex gap-5">
              {/* Barber-pole vertical stripe */}
              <div
                className="w-[3px] flex-shrink-0 self-stretch rounded-full"
                style={{ background: "linear-gradient(to bottom, #cc2222, #b0b0b0, #1432a6)" }}
              />

              {/* Quote + author */}
              <div className="flex flex-col gap-4">
                <p className="font-body text-sm leading-relaxed text-[#aaaaaa] md:text-base">
                  &ldquo;{REVIEWS[0].text}&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-body text-sm text-white">{REVIEWS[0].name}</span>
                  {REVIEWS[0].badge && (
                    <span className="font-body text-[10px] uppercase tracking-widest text-[#444]">
                      {REVIEWS[0].badge} · Google
                    </span>
                  )}
                  <StarRow size={10} />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-[#1a1a1a] pt-5">
              <button
                onClick={() => setShowReviews(true)}
                className="font-body inline-flex items-center gap-2 border border-[#2a2a2a] bg-[#111] px-4 py-2.5 text-xs uppercase tracking-widest text-white transition-all duration-200 hover:border-[#444] hover:bg-[#1a1a1a]"
                style={{ borderRadius: 4 }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#f5c518", flexShrink: 0 }} aria-hidden>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                Opiniones
              </button>

              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#555] transition-colors duration-200 hover:text-white"
              >
                Dejá tu opinión en Google
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                  <path d="M2 8L8 2M8 2H4M8 2V6" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* ── Local photo carousel ── */}
        <LocalCarousel />

      </div>
    </section>

    {/* Reviews modal — portal to escape section stacking context */}
    {showReviews && createPortal(
      <ReviewsModal onClose={() => setShowReviews(false)} />,
      document.body
    )}
    </>
  )
}
