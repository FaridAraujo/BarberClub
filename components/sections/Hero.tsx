"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ASSET_VERSION, SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

// ── Open/closed check — Costa Rica is UTC-6, no DST ───────────────────────────
function getCostaRicaMinutes(): { day: number; minutes: number } {
  const now = new Date()
  const utc  = now.getTime() + now.getTimezoneOffset() * 60_000
  const cr   = new Date(utc - 6 * 60 * 60_000)
  return { day: cr.getDay(), minutes: cr.getHours() * 60 + cr.getMinutes() }
}

function checkIsOpen(): boolean {
  const { day, minutes } = getCostaRicaMinutes()
  if (day === 0) return false                                       // Domingo: cerrado
  if (day === 6) return minutes >= 8 * 60     && minutes < 18 * 60 // Sábado: 8am–6pm
  if (day === 5) return minutes >= 8 * 60     && minutes < 19 * 60 // Viernes: 8am–7pm
  return             minutes >= 9 * 60 + 30  && minutes < 19 * 60 // Lun–Jue: 9:30am–7pm
}

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
  const [isOpen, setIsOpen] = useState<boolean | null>(() => checkIsOpen())

  useEffect(() => {
    // Re-check every minute in case the page stays open across opening/closing time
    const interval = setInterval(() => setIsOpen(checkIsOpen()), 60_000)
    return () => clearInterval(interval)
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
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* ── Background image — native img for LCP priority ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/team.webp?${ASSET_VERSION}`}
        alt=""
        fetchPriority="high"
        decoding="sync"
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full"
        style={{ objectFit: "contain", objectPosition: "center" }}
      />

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
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
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

          {/* Location link */}
          <a
            href="https://www.google.com/maps?q=9.9906133,-84.1351361"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body group inline-flex min-h-[44px] items-center gap-2.5 px-2 py-2 text-sm text-[#888888] transition-colors duration-300 hover:text-white"
          >
            <span className="relative flex shrink-0 items-center justify-center">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#cc2222] opacity-40" />
              <PinIcon />
            </span>
            Heredia, Costa Rica
            <span className="text-xs opacity-30 transition-opacity duration-300 group-hover:opacity-100">↗</span>
          </a>
        </div>

        {/* ── CTA — WhatsApp ── */}
        <div ref={ctaWrapRef}>
          <motion.a
            href={HERO_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex min-h-[44px] cursor-pointer items-center gap-3 border bg-transparent px-8 py-3 text-sm uppercase tracking-widest"
            style={{ borderColor: "#25D366", color: "#25D366" }}
            whileHover={{ backgroundColor: "#25D366", color: "#000000" }}
            transition={{ duration: 0.3 }}
          >
            <WhatsAppIcon size={15} />
            Preguntar disponibilidad
          </motion.a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 z-20 flex flex-col items-center gap-2">
        <div style={{ width: "1px", height: "40px", backgroundColor: "#888888" }} />
        <span className="font-body text-xs uppercase tracking-widest text-[#888888]">SCROLL</span>
      </div>
    </section>
  )
}
