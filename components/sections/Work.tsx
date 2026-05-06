"use client"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GALLERY_IMAGES, GALLERY_ALL, SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

// Instagram brand gradient — yellow → orange → pink → purple → blue
const IG_GRADIENT =
  "linear-gradient(45deg, #feda75 0%, #fa7e1e 15%, #d62976 45%, #962fbf 75%, #4f5bd5 100%)"

type GalleryImage = (typeof GALLERY_IMAGES)[number]

interface CellConfig {
  colSpan: string
  rowSpan: string
  mobileColSpan: string
}

const CELL_CONFIG: CellConfig[] = [
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", mobileColSpan: "col-span-2" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", mobileColSpan: "col-span-1" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", mobileColSpan: "col-span-1" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", mobileColSpan: "col-span-1" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", mobileColSpan: "col-span-1" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", mobileColSpan: "col-span-1" },
]

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GalleryCell({
  image,
  config,
  index,
  instagramHref,
}: {
  image: GalleryImage
  config: CellConfig
  index: number
  instagramHref: string
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.a
      href={instagramHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`g-cell relative overflow-hidden bg-surface pointer-events-none md:pointer-events-auto ${config.colSpan} ${config.rowSpan} ${config.mobileColSpan} ${index === 0 ? "min-h-[320px] md:min-h-[260px] lg:min-h-[380px]" : "min-h-[135px] md:min-h-[130px] lg:min-h-[190px]"} ${index === 5 ? "hidden md:block" : ""}`}
      whileHover="hover"
      initial="rest"
    >
      {imgError ? (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: "#111111", minHeight: "inherit" }}
        >
          <span className="font-display text-2xl" style={{ color: "#333333" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${image.zoom})`,
            transformOrigin: "center center",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            onError={() => setImgError(true)}
            style={{
              objectFit: image.objectFit,
              objectPosition: image.objectPosition,
            }}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.5 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Instagram icon on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          rest: { opacity: 0, scale: 0.85 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.3 }}
      >
        <InstagramIcon size={28} />
      </motion.div>

      {/* Image scale on hover */}
      <motion.div
        className="absolute inset-0"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
    </motion.a>
  )
}

// ─── Gallery modal ────────────────────────────────────────────────────────────

function GalleryModal({ onClose }: { onClose: () => void }) {
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

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="gallery-backdrop"
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
        key="gallery-panel"
        className="fixed inset-0 z-[71] flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="relative flex-shrink-0 px-5 pb-0 pt-6 md:px-10 md:pt-8"
          style={{ backgroundColor: "#080808" }}
        >
          <div className="flex items-end justify-between">
            {/* Left: title */}
            <div>
              <p className="font-body mb-2 text-[10px] uppercase tracking-widest text-[#444]">
                Barber Club · Heredia
              </p>
              <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white md:text-5xl">
                El Trabajo
              </h2>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="group flex flex-shrink-0 items-center gap-2.5 text-[#888] transition-colors duration-200 hover:text-white"
              aria-label="Cerrar galería"
            >
              <span className="font-body text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Cerrar
              </span>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 2l14 14M16 2L2 16" />
              </svg>
            </button>
          </div>

          {/* Barber-pole accent line — full width */}
          <div className="mt-5 h-[2px] -mx-5 md:-mx-10" style={{ background: "linear-gradient(to right, #cc2222, #b0b0b0 50%, #1432a6)" }} />
        </div>

        {/* ── Grid ── */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "#080808" }}>
          <div className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4" style={{ backgroundColor: "#111" }}>
            {GALLERY_ALL.map((photo, i) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden bg-[#0d0d0d]"
                style={{
                  aspectRatio: "3/4",
                  opacity: 0,
                  animation: `galleryFadeIn 0.4s ease forwards`,
                  animationDelay: `${Math.min(i * 28, 560)}ms`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                    transition: "transform 0.5s ease",
                  }}
                  className="group-hover:scale-[1.04]"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/45" />

                {/* Large number watermark */}
                <span
                  className="font-display pointer-events-none absolute bottom-2 right-2 select-none leading-none opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    color: "rgba(255,255,255,0.12)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(photo.id).padStart(2, "0")}
                </span>

                {/* Red bottom slide-in line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "#cc2222" }}
                />
              </div>
            ))}
          </div>
          <div className="h-12" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── More tile ────────────────────────────────────────────────────────────────
// Replaces the 6th gallery cell. Big "+N" display number + small label,
// with a barber-pole accent line that slides in on hover.

function MoreTile({
  config,
  remaining,
  onClick,
}: {
  config: CellConfig
  remaining: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Ver toda la galería — ${remaining} fotos más`}
      className={`g-cell group relative flex flex-col items-center justify-center overflow-hidden ${config.colSpan} ${config.rowSpan} col-span-2 md:col-span-1 min-h-[135px] md:min-h-[130px] lg:min-h-[190px]`}
      style={{ backgroundColor: "#070707", border: "1px solid #161616" }}
    >
      {/* Big number */}
      <span
        className="font-display leading-none text-white/85 transition-all duration-500 ease-out group-hover:text-white group-hover:tracking-[-0.02em]"
        style={{
          fontSize: "clamp(2.4rem, 7vw, 3.75rem)",
          letterSpacing: "-0.04em",
        }}
      >
        +{remaining}
      </span>

      {/* Label */}
      <span className="font-body mt-2 text-[10px] uppercase tracking-[0.22em] text-[#555] transition-colors duration-300 group-hover:text-[#bbb]">
        Más trabajos
      </span>

      {/* Barber-pole accent — slides in on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full"
        style={{ background: "linear-gradient(to right, #cc2222, #b0b0b0 50%, #1432a6)" }}
      />

      {/* Subtle vignette glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
    </button>
  )
}

// ─── Instagram CTA button ─────────────────────────────────────────────────────
// Gradient border via 1px-padded wrapper + gradient text via background-clip.
// Hover fills the interior with the same gradient and switches text to white.
// Framer Motion can't animate CSS gradients, so hover state is managed in JS.

function InstagramCTA({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false)

  const borderStyle = `linear-gradient(#0a0a0a, #0a0a0a) padding-box, ${IG_GRADIENT} border-box`

  const gradientTextStyle = {
    background: IG_GRADIENT,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="font-body relative inline-flex min-h-[44px] cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-xs uppercase tracking-widest md:gap-3 md:px-8 md:py-3 md:text-sm"
      style={{ background: borderStyle, border: "1px solid transparent" }}
    >
      {/* Gradient fill layer — fades in on hover */}
      <span
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: IG_GRADIENT,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* Icon */}
      <span style={{ position: "relative", display: "flex", color: hovered ? "#ffffff" : "#d62976", transition: "color 0.45s ease" }}>
        <InstagramIcon size={16} />
      </span>

      {/* Label */}
      <span style={hovered ? { position: "relative", color: "#ffffff", transition: "color 0.45s ease" } : { position: "relative", ...gradientTextStyle }}>
        Ver en Instagram
      </span>
    </a>
  )
}

export default function Work() {
  const containerRef  = useRef<HTMLElement>(null)
  const [showGallery, setShowGallery] = useState(false)

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef)

      gsap.from(q(".w-header"), {
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

      gsap.from(q(".g-cell"), {
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".g-cell")[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(q(".w-cta"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".w-cta")[0],
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <>
    <section
      id="trabajo"
      ref={containerRef}
      className="pb-14 pt-8 md:pb-14 md:pt-8 lg:pb-28 lg:pt-16"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="w-header mb-6 md:mb-8 lg:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            El trabajo
          </p>
          <h2 className="font-display mb-4 text-4xl uppercase leading-none tracking-tight lg:text-6xl xl:text-7xl">
            Así quedás
          </h2>
          <p className="font-body text-sm text-[#888888]">
            El trabajo habla solo. Seguinos para ver más.
          </p>
        </div>

        {/* ── Gallery grid ── */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:grid-rows-3 md:gap-3">
          {GALLERY_IMAGES.map((image, i) => {
            if (i === 5) {
              return (
                <MoreTile
                  key="more-tile"
                  config={CELL_CONFIG[i]}
                  remaining={GALLERY_ALL.length - GALLERY_IMAGES.length}
                  onClick={() => setShowGallery(true)}
                /> 
              )
            }

            return (
            <GalleryCell
              key={image.id}
              image={image}
              config={CELL_CONFIG[i]}
              index={i}
              instagramHref={SITE_DATA.instagram}
            />
            )
          })}
        </div>

        {/* ── CTA ── */}
        <div className="w-cta mt-12">

          {/* Divider + Instagram — identical structure to original */}
          <div className="mb-12 h-px w-full bg-[#333333]" />
          <div className="flex flex-col items-center gap-4">
            <p className="font-body text-xs uppercase tracking-widest text-[#888888]">
              ¿Querés ver más?
            </p>
            <InstagramCTA href={SITE_DATA.instagram} />
          </div>
        </div>

      </div>
    </section>

    {/* Gallery modal — portal to escape section stacking context */}
    {showGallery && createPortal(
      <GalleryModal onClose={() => setShowGallery(false)} />,
      document.body
    )}
    </>
  )
}
