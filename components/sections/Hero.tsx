"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { ASSET_VERSION, SITE_DATA } from "@/lib/constants"
import { checkIsOpen } from "@/lib/schedule"

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_WORDS = ["EL", "CLUB", "DEL", "ESTILO"]

const HERO_WA_URL =
  `https://wa.me/${SITE_DATA.whatsapp}?text=${encodeURIComponent("Hola, ¿hay espacio disponible?")}`

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── Decorative Elements ──────────────────────────────────────────────────────

function RazorIcon({ flip = false }: { flip?: boolean }) {
  return (
    <div style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <Image
        src={`/images/razor.webp?${ASSET_VERSION}`}
        alt=""
        width={52}
        height={52}
        unoptimized
        loading="eager"
        style={{ objectFit: "contain" }}
      />
    </div>
  )
}

function BarberSeparator() {
  return (
    <>
      <style>{`
        @keyframes barber-spin {
          from { background-position: 0 0; }
          to   { background-position: -32px 0; }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Left dome */}
        <div style={{
          width: 11, height: 22, flexShrink: 0,
          borderRadius: "50% 0 0 50%",
          background: "radial-gradient(ellipse at 30% 35%, #ffffff 0%, #cccccc 20%, #888888 48%, #555555 72%, #303030 100%)",
          boxShadow: "inset -1px 0 3px rgba(0,0,0,0.4)",
        }} />

        {/* Left collar */}
        <div style={{
          width: 7, height: 22, flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />

        {/* Cylinder */}
        <div style={{ width: 120, height: 22, position: "relative", overflow: "hidden", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.45), inset 0 -1px 2px rgba(0,0,0,0.45)" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 220, height: 220,
            transform: "translate(-50%, -50%) rotate(45deg)",
            transformOrigin: "center center",
            backgroundImage:
              "repeating-linear-gradient(to right," +
              " #d01010 0px,  #d01010 8px," +
              " #ebebeb 8px,  #ebebeb 16px," +
              " #1432a6 16px, #1432a6 24px," +
              " #ebebeb 24px, #ebebeb 32px)",
            animation: "barber-spin 1.5s linear infinite",
          }} />
          {/* Sheen */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "linear-gradient(to bottom," +
              " rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 22%," +
              " rgba(255,255,255,0.0) 40%, rgba(0,0,0,0.0) 58%," +
              " rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.38) 100%)",
          }} />
          {/* Crown line */}
          <div style={{ position: "absolute", top: 1, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.7)", pointerEvents: "none" }} />
        </div>

        {/* Right collar */}
        <div style={{
          width: 7, height: 22, flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />

        {/* Right dome */}
        <div style={{
          width: 11, height: 22, flexShrink: 0,
          borderRadius: "0 50% 50% 0",
          background: "radial-gradient(ellipse at 70% 35%, #ffffff 0%, #cccccc 20%, #888888 48%, #555555 72%, #303030 100%)",
          boxShadow: "inset 1px 0 3px rgba(0,0,0,0.4)",
        }} />
      </div>
    </>
  )
}

function PinIcon() {
  return (
    <svg
      width="11" height="14" viewBox="0 0 11 14"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M5.5 1C3.015 1 1 3.015 1 5.5C1 8.75 5.5 13 5.5 13S10 8.75 10 5.5C10 3.015 7.985 1 5.5 1Z" />
      <circle cx="5.5" cy="5.5" r="1.5" />
    </svg>
  )
}

// ─── Map picker — mobile bottom sheet ────────────────────────────────────────

const LAT = 9.9906133
const LON = -84.1351361

const MAP_APPS = [
  {
    id: "google",
    name: "Google Maps",
    url: `https://www.google.com/maps?q=${LAT},${LON}`,
    logo: "/images/logos/googlemaps.webp",
  },
  {
    id: "waze",
    name: "Waze",
    url: `https://waze.com/ul?ll=${LAT},${LON}&navigate=yes`,
    logo: "/images/logos/waze.webp",
  },
  {
    id: "uber",
    name: "Uber",
    url: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${LAT}&dropoff[longitude]=${LON}&dropoff[nickname]=Barber%20Club`,
    logo: "https://www.google.com/s2/favicons?domain=uber.com&sz=64",
  },
  {
    id: "apple",
    name: "Apple Maps",
    url: `https://maps.apple.com/?q=${LAT},${LON}`,
    logo: "https://www.google.com/s2/favicons?domain=maps.apple.com&sz=64",
    iosOnly: true,
  },
]

function MapPickerSheet({
  isIOS,
  onClose,
}: {
  isIOS: boolean
  onClose: () => void
}) {
  const apps = MAP_APPS.filter((a) => !a.iosOnly || isIOS)

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[60] bg-black/70 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet */}
      <motion.div
        key="sheet"
        className="fixed bottom-0 left-0 right-0 z-[61] overflow-hidden md:hidden"
        style={{ backgroundColor: "#111111", borderTop: "1px solid #2a2a2a" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-[#444444]" />
        </div>

        {/* Title */}
        <p className="font-body px-6 pb-4 pt-2 text-center text-[10px] uppercase tracking-widest text-[#666666]">
          Abrir ubicación en
        </p>

        {/* App list */}
        <div className="flex flex-col px-4 pb-4">
          {apps.map((app, i) => (
            <a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={`font-body flex min-h-[56px] items-center gap-4 px-3 py-3 text-sm text-white transition-colors active:bg-white/5 ${i < apps.length - 1 ? "border-b border-[#1e1e1e]" : ""}`}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={app.logo} alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "cover" }} />
              </div>
              {app.name}
            </a>
          ))}
        </div>

        {/* Cancel */}
        <div className="px-4 pb-8">
          <button
            onClick={onClose}
            className="font-body w-full border border-[#2a2a2a] py-4 text-xs uppercase tracking-widest text-[#888888] transition-colors active:bg-white/5"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function LogoBadge({ logoSrc }: { logoSrc?: string }) {
  if (logoSrc) {
    return (
      <div className="relative h-[54px] w-[200px] md:h-[70px] md:w-[260px]">
        <Image src={logoSrc} alt="Barber Club logo" fill unoptimized style={{ objectFit: "contain" }} />
      </div>
    )
  }
  return (
    <div className="border border-white px-7 py-5">
      <span className="text-4xl font-black tracking-widest text-white">BC</span>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

interface HeroProps {
  logoSrc?: string
}

export default function Hero({ logoSrc }: HeroProps) {
  const containerRef       = useRef<HTMLElement>(null)
  const logoWrapRef        = useRef<HTMLDivElement>(null)
  const bladeLeftRef       = useRef<HTMLDivElement>(null)
  const bladeRightRef      = useRef<HTMLDivElement>(null)
  const headlineRef        = useRef<HTMLHeadingElement>(null)
  const wordRefs           = useRef<(HTMLSpanElement | null)[]>([])
  const hLineRef           = useRef<HTMLDivElement>(null)
  // Status + location merged into one ref for a single clean animation step
  const locationGroupRef   = useRef<HTMLDivElement>(null)
  const ctaWrapRef         = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // null = not yet computed (avoids SSR mismatch)
  const [isOpen,        setIsOpen]        = useState<boolean | null>(() => checkIsOpen())
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [isIOS,         setIsIOS]         = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setIsOpen(checkIsOpen()), 60_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!showMapPicker) return
    const handleScroll = () => setShowMapPicker(false)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showMapPicker])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)),
    )
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // 1. Logo wrapper
      tl.from(logoWrapRef.current, { opacity: 0, y: -30, duration: 1, ease: "power3.out" })

      // 2. Razors
      tl.from(
        [bladeLeftRef.current, bladeRightRef.current],
        { scale: 0, opacity: 0, transformOrigin: "center center", stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" },
        ">+0.1",
      )

      // 3. Headline words
      tl.from(
        wordRefs.current.filter((el): el is HTMLSpanElement => el !== null),
        { y: 60, opacity: 0, stagger: 0.12, ease: "power4.out", duration: 0.8 },
        "-=0.5",
      )

      // 4. Barber separator
      tl.from(hLineRef.current, { width: 0, duration: 0.8, ease: "power2.out" }, "-=0.3")

      // 5. Status + Location group (single step — cleaner than two separate animations)
      tl.from(locationGroupRef.current, { opacity: 0, y: 12, duration: 0.8, ease: "power2.out" }, "-=0.5")

      // 6. CTA
      tl.from(ctaWrapRef.current, { scale: 0.85, opacity: 0, ease: "back.out(1.7)", duration: 0.6 }, "-=0.4")

      // Scroll indicator — pulsing loop
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0.3, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 3,
      })

      // Hero fades out on scroll
      gsap.to(containerRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
        opacity: 0,
      })

      // Headline parallax
      gsap.to(headlineRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
        y: -60,
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative flex h-[75vh] flex-col items-center justify-center overflow-hidden bg-background md:h-screen"
    >
      {/* ── Background image — native <picture> for LCP priority. ── */}
      {/* On mobile, image fills only top 65vh; below that the section's bg-background
          shows through, giving the team photo room to breathe (avoids hyper-cropping
          a wide landscape source on a tall portrait viewport). The black/75 overlay
          and bottom-fading gradient still cover the full hero, so the seam is
          imperceptible. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture className="absolute inset-x-0 top-0 z-0 h-[65vh] w-full md:inset-0 md:h-full">
        <source
          media="(max-width: 767px)"
          srcSet={`/images/team-mobile.webp?${ASSET_VERSION}`}
        />
        <img
          src={`/images/team.webp?${ASSET_VERSION}`}
          alt=""
          fetchPriority="high"
          decoding="sync"
          aria-hidden="true"
          className="h-full w-full"
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </picture>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-black/75" />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)" }} />
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Logo + razors — pinned to top ── */}
      <div ref={logoWrapRef} className="absolute top-6 z-20 flex items-center">
        <div ref={bladeLeftRef} className="-mr-3.5 md:-mr-[22px]">
          <RazorIcon />
        </div>
        <LogoBadge logoSrc={logoSrc} />
        <div ref={bladeRightRef} className="-ml-3.5 md:-ml-[22px]">
          <RazorIcon flip />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 flex w-full flex-col items-center gap-8 px-4 md:gap-10">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="flex w-full flex-wrap justify-center gap-x-2 gap-y-0 font-display text-5xl uppercase tracking-normal md:gap-x-4 md:flex-nowrap md:text-8xl lg:text-9xl"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="overflow-hidden">
              <span ref={(el) => { wordRefs.current[i] = el }} className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Barber separator */}
        <div ref={hLineRef} style={{ display: "inline-flex", overflow: "hidden" }}>
          <BarberSeparator />
        </div>

        {/* ── Status + Location — single horizontal row ── */}
        <div
          ref={locationGroupRef}
          className="flex flex-col items-center justify-center gap-y-2"
        >
          {/* Open/closed badge — fades in after JS hydrates (avoids SSR flash) */}
          <div
            className="flex items-center gap-2 transition-opacity duration-700"
            style={{ opacity: isOpen !== null ? 1 : 0 }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-[#cc2222]"}`}
            />
            <span className="font-body text-xs uppercase tracking-widest text-[#888888]">
              {isOpen ? "Abierto ahora" : "Cerrado"}
            </span>
          </div>

          {/* Divider */}
          <span
            className="text-xs text-[#2a2a2a] transition-opacity duration-700"
            style={{ opacity: isOpen !== null ? 1 : 0 }}
          >
            ·
          </span>

          {/* Location link — opens map picker on mobile, Google Maps on desktop */}
          <a
            href={`https://www.google.com/maps?q=${LAT},${LON}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (window.innerWidth < 768) {
                e.preventDefault()
                setShowMapPicker(true)
              }
            }}
            className="font-body group inline-flex min-h-[44px] items-center gap-2.5 px-2 py-2 text-sm text-[#888888] transition-colors duration-300 hover:text-white"
          >
            <span className="relative flex shrink-0 items-center justify-center">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#cc2222] opacity-40" />
              <PinIcon />
            </span>
            Heredia, Costa Rica
          </a>
        </div>

        {/* ── CTA — WhatsApp ── */}
        <div ref={ctaWrapRef}>
          <motion.a
            href={HERO_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex min-h-[44px] cursor-pointer items-center gap-3 border border-white/30 bg-transparent px-8 py-3 text-sm uppercase tracking-widest text-white/70"
            whileHover={{ backgroundColor: "#25D366", borderColor: "#25D366", color: "#000000" }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon stays green — the only hint it's WhatsApp */}
            <span style={{ color: "#25D366" }}>
              <WhatsAppIcon size={15} />
            </span>
            Preguntar disponibilidad
          </motion.a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 z-20 flex flex-col items-center gap-2">
        <div style={{ width: "1px", height: "40px", backgroundColor: "#888888" }} />
        <span className="font-body text-xs uppercase tracking-widest text-[#888888]">SCROLL</span>
      </div>

      {/* ── Map picker — mobile only ── */}
      {showMapPicker && (
        <MapPickerSheet isIOS={isIOS} onClose={() => setShowMapPicker(false)} />
      )}
    </section>
  )
}
