"use client"

import React, { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SITE_DATA, REVIEWS } from "@/lib/constants"

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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


const GOOGLE_MAPS_URL   = "https://www.google.com/maps?q=9.9906133,-84.1351361"
const GOOGLE_REVIEW_URL = "https://g.page/r/CeBRUzR_CAmwEBM/review"

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
                  loading="lazy"
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

// ─── Marquee ──────────────────────────────────────────────────────────────────

type TextReview = (typeof REVIEWS)[number] & { text: string }

function MarqueeCard({ review }: { review: TextReview }) {
  return (
    <div
      style={{
        width: 272,
        flexShrink: 0,
        backgroundColor: "#0d0d0d",
        border: "1px solid #1e1e1e",
        borderRadius: 4,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <p
        className="font-body"
        style={{
          fontSize: "0.8125rem",
          lineHeight: 1.65,
          color: "#888888",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flexGrow: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ paddingTop: 10, borderTop: "1px solid #141414" }}>
        <span
          className="font-display"
          style={{ fontSize: "1.05rem", letterSpacing: "0.05em", color: "#cccccc", display: "block", lineHeight: 1 }}
        >
          {review.name}
        </span>
        {review.badge && (
          <span
            className="font-body"
            style={{ fontSize: "0.5625rem", color: "#444444", display: "block", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.12em" }}
          >
            {review.badge}
          </span>
        )}
      </div>
    </div>
  )
}

// Fila individual del marquee — draggable en mobile y desktop
function MarqueeRow({
  reviews,
  duration,
  reverse = false,
  style: outerStyle,
}: {
  reviews:    TextReview[]
  duration:   number
  reverse?:   boolean
  style?:     React.CSSProperties
}) {
  const x        = useMotionValue(0)
  const rowRef   = useRef<HTMLDivElement>(null)
  const halfRef  = useRef(0)
  const loopRef  = useRef<ReturnType<typeof animate> | null>(null)
  const dragging = useRef(false)

  // Normaliza x al rango [-half, 0] para el loop seamless.
  // Caso especial: -h % h === 0 en JS, pero -h y 0 son posiciones distintas;
  // si val != 0 y n sale 0, significa que val es múltiplo negativo de h → debe volver a -h.
  function norm(val: number): number {
    const h = halfRef.current
    if (!h) return val
    let n = val % h
    if (n > 0) n -= h
    if (n === 0 && val !== 0) n = -h
    return n
  }

  function startLoop(fromX: number) {
    loopRef.current?.stop()
    const h = halfRef.current
    if (!h || dragging.current) return

    const from = norm(fromX)
    x.set(from)
    const end  = reverse ? 0 : -h
    const dur  = (Math.abs(end - from) / h) * duration

    loopRef.current = animate(x, end, {
      duration: dur,
      ease: "linear",
      onComplete: () => {
        x.set(reverse ? -h : 0)
        startLoop(reverse ? -h : 0)
      },
    })
  }

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      const h = el.scrollWidth / 2
      halfRef.current = h
      startLoop(reverse ? -h : 0)
    })
    return () => { cancelAnimationFrame(id); loopRef.current?.stop() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length])

  return (
    <div style={{ overflow: "hidden", ...outerStyle }}>
      <motion.div
        ref={rowRef}
        style={{ x, display: "flex", gap: 10, width: "max-content", cursor: "grab", userSelect: "none", touchAction: "pan-y" }}
        drag="x"
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => { dragging.current = true; loopRef.current?.stop() }}
        onDragEnd={(_e, info) => {
          dragging.current = false
          // Coast un poco, luego reanuda el loop
          animate(x, norm(x.get()) + info.velocity.x * 0.06, {
            duration: 0.35,
            ease: "easeOut",
            onComplete: () => startLoop(x.get()),
          })
        }}
        onHoverStart={() => { if (!dragging.current) loopRef.current?.stop() }}
        onHoverEnd={()  => { if (!dragging.current) startLoop(x.get()) }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {[...reviews, ...reviews].map((r, i) => <MarqueeCard key={i} review={r} />)}
      </motion.div>
    </div>
  )
}

function ReviewMarquee() {
  const all  = REVIEWS.filter((r): r is TextReview => Boolean(r.text))
  const mid  = Math.ceil(all.length / 2)
  const row1 = all.slice(0, mid)
  const row2 = all.slice(mid)

  return (
    <div
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <MarqueeRow reviews={row1} duration={44} style={{ marginBottom: 10 }} />
      <MarqueeRow reviews={row2} duration={52} reverse />
    </div>
  )
}

// ─── Barber pole CTA button ───────────────────────────────────────────────────

function ReviewCTA() {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center overflow-hidden transition-opacity duration-200 hover:opacity-70"
      style={{ borderRadius: 4, whiteSpace: "nowrap" }}
    >
      {/* Barber pole sidebar */}
      <span
        aria-hidden
        style={{
          display: "block",
          width: 8,
          alignSelf: "stretch",
          flexShrink: 0,
          background: "repeating-linear-gradient(-45deg, #cc2222 0px, #cc2222 6px, #d4d4d4 6px, #d4d4d4 12px, #1432a6 12px, #1432a6 18px, #d4d4d4 18px, #d4d4d4 24px)",
        }}
      />
      {/* Text area */}
      <span
        className="font-display inline-flex items-center gap-2.5 text-white"
        style={{
          padding: "9px 16px",
          fontSize: "1rem",
          letterSpacing: "0.06em",
          background: "#0d0d0d",
        }}
      >
        Dejá tu opinión
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M2 8L8 2M8 2H4M8 2V6" />
        </svg>
      </span>
    </a>
  )
}

// ─── Reviews modal ────────────────────────────────────────────────────────────

// Sharp 5-pointed star — long elegant points (inner r=3, outer r=10)
// Much more refined than the default emoji star
const SHARP_STAR = "M12,2 L13.76,9.57 L21.51,8.91 L14.85,12.93 L17.88,20.09 L12,15 L6.12,20.09 L9.15,12.93 L2.49,8.91 L10.24,9.57 Z"

function StarRow({ count = 5, size = 11 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-[4px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d={SHARP_STAR}
            fill={i < count ? "#c8a96e" : "none"}
            stroke={i < count ? "#c8a96e" : "#2e2e2e"}
            strokeWidth={i < count ? 0 : 1.2}
          />
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
              className="group flex flex-shrink-0 items-center gap-2.5 text-[#888] transition-colors duration-200 hover:text-white"
              aria-label="Cerrar reseñas"
            >
              <span className="font-body text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Cerrar
              </span>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 2l14 14M16 2L2 16" />
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

            {/* Google review CTA — featured */}
            <div
              className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border border-[#1e1e1e] px-5 py-4"
              style={{ borderRadius: 4, background: "linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)" }}
            >
              <div>
                <p className="font-body text-[10px] uppercase tracking-widest text-[#444] mb-1">
                  ¿Ya nos visitaste?
                </p>
                <p className="font-body text-sm text-[#888]">
                  Contanos tu experiencia en Google
                </p>
              </div>
              <ReviewCTA />
            </div>

            {/* Text reviews — card grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {textReviews.map((review, i) => (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: "#0d0d0d",
                    border: "1px solid #1e1e1e",
                    borderRadius: 4,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    opacity: 0,
                    animation: `galleryFadeIn 0.4s ease forwards`,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <StarRow size={10} />
                  <p
                    className="font-body"
                    style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "#888888", flexGrow: 1 }}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div style={{ paddingTop: 12, borderTop: "1px solid #141414" }}>
                    <span className="font-body" style={{ fontSize: "0.75rem", color: "#cccccc", display: "block" }}>
                      {review.name}
                    </span>
                    {review.badge && (
                      <span
                        className="font-body"
                        style={{ fontSize: "0.625rem", color: "#444444", display: "block", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.12em" }}
                      >
                        {review.badge} · Google
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

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

            {/* Google Maps link — minimal footer */}
            <div className="mt-8">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#444] transition-colors duration-200 hover:text-[#888]"
              >
                Ver en Google Maps
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                  <path d="M2 8L8 2M8 2H4M8 2V6" />
                </svg>
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

        {/* ── Opiniones — header ── */}
        <div className="mt-12 md:mt-16">
          {/* Barber-pole accent line */}
          <div className="h-[2px]" style={{ background: "linear-gradient(to right, #cc2222, #b0b0b0 50%, #1432a6)" }} />

          <div className="pt-8">
            {/* Header: eyebrow + heading / score block */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-body mb-3 text-xs uppercase tracking-widest text-[#555]">
                  ¿Querés venir?
                </p>
                <h3 className="font-display text-2xl uppercase leading-none tracking-tight lg:text-3xl">
                  Mirá lo que dicen
                </h3>
              </div>

              {/* Score — clickable, opens modal */}
              <button
                onClick={() => setShowReviews(true)}
                className="group flex flex-col items-end gap-1.5 shrink-0 transition-opacity duration-200 hover:opacity-70"
                aria-label="Ver opiniones"
              >
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
                  {REVIEWS.length} reseñas · Google
                </span>
                <span className="font-body inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#555] group-hover:text-[#999] transition-colors duration-200" style={{ textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "#333" }}>
                  Ver opiniones
                  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M2 8L8 2M8 2H4M8 2V6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>{/* ── Review marquee — full-width ── */}
      <div className="overflow-hidden py-8">
        <ReviewMarquee />
      </div>

      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* CTA */}
        <div className="flex justify-center border-t border-[#1a1a1a] pt-6">
          <ReviewCTA />
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
