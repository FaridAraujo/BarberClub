"use client"

import React, { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { ASSET_VERSION, SITE_DATA, BARBERS } from "@/lib/constants"
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
    imgSize: 26,
  },
  {
    id: "waze",
    name: "Waze",
    url: `https://waze.com/ul?ll=${LAT},${LON}&navigate=yes`,
    logo: "/images/logos/waze.webp",
    imgSize: 32,
  },
  {
    id: "uber",
    name: "Uber",
    url: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${LAT}&dropoff[longitude]=${LON}&dropoff[nickname]=Barber%20Club`,
    logo: "/images/logos/uber.webp",
    imgSize: 38,
    imgAlign: "flex-start",
  },
  {
    id: "apple",
    name: "Apple Maps",
    url: `https://maps.apple.com/?q=${LAT},${LON}`,
    logo: "/images/logos/applemaps.webp",
    imgSize: 32,
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
      {/* Backdrop — full screen on all sizes */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[60] bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet — bottom on mobile, centered card on desktop */}
      <motion.div
        key="sheet"
        className="fixed bottom-0 left-0 right-0 z-[61] max-h-[90dvh] overflow-hidden md:bottom-auto md:left-1/2 md:top-1/2 md:w-80 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg"
        style={{ backgroundColor: "#111111", borderTop: "1px solid #2a2a2a" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
      >
        {/* Handle (mobile only) */}
        <div className="flex justify-center pb-1 pt-3 md:hidden">
          <div className="h-1 w-10 rounded-full bg-[#444444]" />
        </div>

        {/* Title */}
        <p className="font-body px-6 pb-4 pt-4 text-center text-[10px] uppercase tracking-widest text-[#666666]">
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
              className={`font-body flex min-h-[52px] items-center gap-4 px-3 py-2.5 text-sm text-white transition-colors active:bg-white/5 ${i < apps.length - 1 ? "border-b border-[#1e1e1e]" : ""}`}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "imgAlign" in app ? app.imgAlign : "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={app.logo} alt="" style={{ width: app.imgSize, height: app.imgSize, objectFit: "contain" }} />
              </div>
              {app.name}
            </a>
          ))}
        </div>

        {/* Cancel */}
        <div className="px-4 pb-6">
          <button
            onClick={onClose}
            className="font-body w-full border border-[#2a2a2a] py-3.5 text-xs uppercase tracking-widest text-[#888888] transition-colors active:bg-white/5"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── WhatsApp barber picker ───────────────────────────────────────────────────

function WaPickerSheet({ onClose }: { onClose: () => void }) {
  const WA_TEXT = encodeURIComponent("Hola, ¿hay espacio disponible?")

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="wa-backdrop"
        className="fixed inset-0 z-[60] bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet — bottom on mobile, centered on desktop */}
      <motion.div
        key="wa-sheet"
        className="fixed bottom-0 left-0 right-0 z-[61] max-h-[90dvh] overflow-hidden md:bottom-auto md:left-1/2 md:top-1/2 md:w-[560px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg"
        style={{ backgroundColor: "#111111", borderTop: "1px solid #2a2a2a" }}
        initial={{ y: "100%", opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
      >
        {/* Handle (mobile only) */}
        <div className="flex justify-center pb-1 pt-3 md:hidden">
          <div className="h-1 w-10 rounded-full bg-[#444444]" />
        </div>

        {/* Title */}
        <p className="font-body px-6 pb-4 pt-4 text-center text-[10px] uppercase tracking-widest text-[#666666]">
          ¿Con quién querés hablar?
        </p>

        {/* Barber cards — horizontal grid */}
        <div className="grid grid-cols-3 gap-3 px-5 pb-4">
          {BARBERS.map((barber) => (
            <a
              key={barber.id}
              href={`https://wa.me/${barber.whatsapp}?text=${WA_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group flex flex-col overflow-hidden rounded border border-[#1e1e1e] transition-colors hover:border-[#444]"
            >
              {/* Photo */}
              <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: "#1a1a1a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={barber.photo}
                  alt={barber.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.3s ease" }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Name + icon */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="font-display text-2xl uppercase leading-none" style={{ letterSpacing: "0.06em" }}>
                  {barber.name}
                </span>
                <span style={{ color: "#25D366" }}>
                  <WhatsAppIcon size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Cancel */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="font-body w-full border border-[#2a2a2a] py-3.5 text-xs uppercase tracking-widest text-[#888888] transition-colors hover:border-[#444] active:bg-white/5"
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
  const bgImageRef         = useRef<HTMLElement>(null)
  const logoWrapRef        = useRef<HTMLDivElement>(null)
  const bladeLeftRef       = useRef<HTMLDivElement>(null)
  const bladeRightRef      = useRef<HTMLDivElement>(null)
  const headlineRef        = useRef<HTMLHeadingElement>(null)
  const wordRefs           = useRef<(HTMLSpanElement | null)[]>([])
  const hLineRef           = useRef<HTMLDivElement>(null)
  const locationGroupRef   = useRef<HTMLDivElement>(null)
  const ctaWrapRef         = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // null = not yet computed (avoids SSR mismatch)
  const [isOpen,        setIsOpen]        = useState<boolean | null>(() => checkIsOpen())
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [showWaPicker,  setShowWaPicker]  = useState(false)
  const [waBtnHovered,  setWaBtnHovered]  = useState(false)
  const [isIOS,         setIsIOS]         = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setIsOpen(checkIsOpen()), 60_000)
    return () => clearInterval(interval)
  }, [])

  // Lock body scroll whenever either picker is open
  useEffect(() => {
    const anyOpen = showMapPicker || showWaPicker
    if (!anyOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [showMapPicker, showWaPicker])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)),
    )
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // 0. Ken Burns — image subtly expands while content enters
      gsap.from(bgImageRef.current, {
        scale: 1.06, duration: 2.2, ease: "power1.out",
      })

      // 1. Logo — drops in quickly from top
      tl.from(logoWrapRef.current, { opacity: 0, y: -16, duration: 0.45 })

      // 2. Razors — simultaneous, punchy
      tl.from(
        [bladeLeftRef.current, bladeRightRef.current],
        { scale: 0, opacity: 0, transformOrigin: "center center", stagger: 0.05, duration: 0.35, ease: "back.out(2)" },
        "-=0.2",
      )

      // 3. Headline — mask reveal: words slide up from below their overflow-hidden parent
      //    No opacity needed — the parent clip handles visibility.
      tl.from(
        wordRefs.current.filter((el): el is HTMLSpanElement => el !== null),
        { y: "110%", stagger: 0.07, duration: 0.55, ease: "power4.out" },
        "-=0.15",
      )

      // 4. Separator — fast draw
      tl.from(hLineRef.current, { width: 0, duration: 0.45, ease: "power2.out" }, "-=0.2")

      // 5. Status + location
      tl.from(locationGroupRef.current, { opacity: 0, y: 8, duration: 0.4 }, "-=0.25")

      // 6. CTA — slides up, no scale bounce
      tl.from(ctaWrapRef.current, { opacity: 0, y: 10, duration: 0.35 }, "-=0.25")

      // Scroll indicator — pulsing loop, starts after content settles
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0.3, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8,
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
    <>
    <section
      id="inicio"
      ref={containerRef}
      className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background pt-16 md:pt-20"
    >
      {/* ── Background image — native <picture> for LCP priority. ── */}
      {/* On mobile, image fills only top 65vh; below that the section's bg-background
          shows through, giving the team photo room to breathe (avoids hyper-cropping
          a wide landscape source on a tall portrait viewport). The black/75 overlay
          and bottom-fading gradient still cover the full hero, so the seam is
          imperceptible. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture ref={bgImageRef as React.Ref<HTMLElement>} className="absolute inset-x-0 top-0 z-0 h-[65vh] w-full md:inset-0 md:h-full">
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
          style={{ objectFit: "cover", objectPosition: "50% 59%" }}
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
      <div ref={logoWrapRef} className="absolute top-6 z-20 flex items-center md:top-8">
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
              style={isOpen ? { animationDuration: "2.5s" } : undefined}
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
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#cc2222] opacity-40" style={{ animationDuration: "2.5s" }} />
              <PinIcon />
            </span>
            Heredia, Costa Rica
          </a>
        </div>

        {/* ── CTA — WhatsApp picker ── */}
        <div ref={ctaWrapRef}>
          <motion.button
            onClick={() => setShowWaPicker(true)}
            onHoverStart={() => setWaBtnHovered(true)}
            onHoverEnd={() => setWaBtnHovered(false)}
            className="font-body inline-flex min-h-[44px] cursor-pointer items-center gap-3 border border-white/30 bg-transparent px-8 py-3 text-sm uppercase tracking-widest text-white/70"
            whileHover={{ backgroundColor: "#25D366", borderColor: "#25D366", color: "#000000" }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ color: waBtnHovered ? "#000000" : "#25D366", transition: "color 0.3s" }}>
              <WhatsAppIcon size={15} />
            </span>
            Preguntar disponibilidad
          </motion.button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 z-20 flex flex-col items-center gap-2">
        <div style={{ width: "1px", height: "40px", backgroundColor: "#888888" }} />
        <span className="font-body text-xs uppercase tracking-widest text-[#888888]">SCROLL</span>
      </div>

    </section>

      {/* ── Sheets — rendered at body level via portal to escape overflow:hidden + GSAP transforms ── */}
      {showMapPicker && createPortal(
        <MapPickerSheet isIOS={isIOS} onClose={() => setShowMapPicker(false)} />,
        document.body
      )}
      {showWaPicker && createPortal(
        <WaPickerSheet onClose={() => setShowWaPicker(false)} />,
        document.body
      )}
    </>
  )
}
