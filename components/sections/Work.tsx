"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GALLERY_IMAGES, SITE_DATA } from "@/lib/constants"

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
}: {
  image: GalleryImage
  config: CellConfig
  index: number
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className={`g-cell relative overflow-hidden bg-surface ${config.colSpan} ${config.rowSpan} ${config.mobileColSpan} ${index === 0 ? "min-h-[280px] md:min-h-[400px]" : "min-h-[160px] md:min-h-[200px]"}`}
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
            unoptimized
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
    </motion.div>
  )
}

// ─── Instagram CTA button ─────────────────────────────────────────────────────
// Gradient border via 1px-padded wrapper + gradient text via background-clip.
// Hover fills the interior with the same gradient and switches text to white.
// Framer Motion can't animate CSS gradients, so hover state is managed in JS.

function InstagramCTA({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false)

  const gradientTextStyle: React.CSSProperties = {
    background: IG_GRADIENT,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  }

  // Outer div: gradient background with 1px padding = gradient border
  return (
    <div style={{ background: IG_GRADIENT, padding: 1, display: "inline-flex" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="font-body inline-flex min-h-[44px] cursor-pointer items-center gap-3 px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300"
        style={{ background: hovered ? IG_GRADIENT : "#0a0a0a" }}
      >
        {/* Icon — separate span so currentColor resolves correctly */}
        <span
          style={{ display: "flex", color: hovered ? "#ffffff" : "#d62976" }}
        >
          <InstagramIcon size={16} />
        </span>

        {/* Label — gradient text by default, white on hover */}
        <span style={hovered ? { color: "#ffffff" } : gradientTextStyle}>
          Ver en Instagram
        </span>
      </a>
    </div>
  )
}

export default function Work() {
  const containerRef = useRef<HTMLElement>(null)

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
    <section
      id="trabajo"
      ref={containerRef}
      className="bg-background pb-20 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="w-header mb-10 md:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            El trabajo
          </p>
          <h2 className="font-display mb-4 text-4xl uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
            Así quedás
          </h2>
          <p className="font-body text-sm text-[#888888]">
            El trabajo habla solo. Seguinos para ver más.
          </p>
        </div>

        {/* ── Gallery grid ── */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:grid-rows-3 md:gap-3">
          {GALLERY_IMAGES.map((image, i) => (
            <GalleryCell
              key={image.id}
              image={image}
              config={CELL_CONFIG[i]}
              index={i}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="w-cta mt-12">
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
  )
}
