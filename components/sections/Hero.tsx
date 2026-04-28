"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ASSET_VERSION } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_WORDS = ["EL", "ESTILO", "ES", "UNA", "ACTITUD"]

// ─── Decorative Elements ─────────────────────────────────────────────────────

// Drop /images/razor.webp into public/images/ — the right razor is mirrored via CSS.
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

      {/* All elements share H=22 so overflow:hidden on the GSAP wrapper never clips vertically */}
      <div style={{ display: "flex", alignItems: "center" }}>

        {/* ── Left dome ── */}
        <div style={{
          width: 11,
          height: 22,
          flexShrink: 0,
          borderRadius: "50% 0 0 50%",
          background: "radial-gradient(ellipse at 30% 35%, #ffffff 0%, #cccccc 20%, #888888 48%, #555555 72%, #303030 100%)",
          boxShadow: "inset -1px 0 3px rgba(0,0,0,0.4)",
        }} />

        {/* ── Left collar ── */}
        <div style={{
          width: 7,
          height: 22,
          flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />

        {/* ── Cylinder ── */}
        <div style={{
          width: 120,
          height: 22,
          position: "relative",
          overflow: "hidden",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.45), inset 0 -1px 2px rgba(0,0,0,0.45)",
        }}>
          {/* Rotating stripes — horizontal gradient inside a 45°-rotated box.
              This makes the seamless-loop math trivial: animate exactly one
              stripe period (32px) horizontally — no √2 / sub-pixel drift. */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 220,
            height: 220,
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
          {/* Cylindrical sheen */}
          <div style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom," +
              " rgba(255,255,255,0.6)  0%," +
              " rgba(255,255,255,0.15) 22%," +
              " rgba(255,255,255,0.0)  40%," +
              " rgba(0,0,0,0.0)        58%," +
              " rgba(0,0,0,0.2)        80%," +
              " rgba(0,0,0,0.38)      100%)",
            pointerEvents: "none",
          }} />
          {/* Specular crown line */}
          <div style={{
            position: "absolute",
            top: 1,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.7)",
            pointerEvents: "none",
          }} />
        </div>

        {/* ── Right collar ── */}
        <div style={{
          width: 7,
          height: 22,
          flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />

        {/* ── Right dome ── */}
        <div style={{
          width: 11,
          height: 22,
          flexShrink: 0,
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
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
        <Image
          src={logoSrc}
          alt="Barber Club logo"
          fill
          unoptimized
          style={{ objectFit: "contain" }}
        />
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
  // Refs on the INNER (pre-rotation) div so scaleY operates in local space
  const bladeLeftRef       = useRef<HTMLDivElement>(null)
  const bladeRightRef      = useRef<HTMLDivElement>(null)
  const headlineRef        = useRef<HTMLHeadingElement>(null)
  const wordRefs           = useRef<(HTMLSpanElement | null)[]>([])
  const hLineRef           = useRef<HTMLDivElement>(null)
  const subRef             = useRef<HTMLParagraphElement>(null)
  const locationRef        = useRef<HTMLAnchorElement>(null)
  const ctaWrapRef         = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // 1. Logo wrapper
      tl.from(logoWrapRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      })

      // 1b. Razors — scale + fade from center, stagger left→right
      tl.from(
        [bladeLeftRef.current, bladeRightRef.current],
        {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        ">+0.1"
      )

      // 2. Headline words
      tl.from(
        wordRefs.current.filter((el): el is HTMLSpanElement => el !== null),
        {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          ease: "power4.out",
          duration: 0.8,
        },
        "-=0.5"
      )

      // 3. Barber separator — width 0 → natural (reveals red → diamond → blue)
      tl.from(
        hLineRef.current,
        {
          width: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )

      // 4. Subheadline
      tl.from(
        subRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

      // 5. Location link
      tl.from(
        locationRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

      // 6. CTA
      tl.from(
        ctaWrapRef.current,
        {
          scale: 0.85,
          opacity: 0,
          ease: "back.out(1.7)",
          duration: 0.6,
        },
        "-=0.4"
      )

      // Scroll indicator — starts after entrance animations, loops forever
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0.3,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3,
      })

      // ScrollTrigger: hero fades out on scroll
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
      })

      // ScrollTrigger: headline parallax
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -60,
      })
    },
    { scope: containerRef }
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

      {/* ── Overlay 1: flat dark base ── */}
      <div className="absolute inset-0 z-10 bg-black/75" />

      {/* ── Overlay 2: gradient bottom → up ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)",
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 z-10 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Logo — pinned to top center ── */}
      <div
        ref={logoWrapRef}
        className="absolute top-6 z-20 flex items-center gap-0"
      >
        <div ref={bladeLeftRef} className="-mr-3.5 md:-mr-[22px]">
          <RazorIcon />
        </div>

        <LogoBadge logoSrc={logoSrc} />

        <div ref={bladeRightRef} className="-ml-3.5 md:-ml-[22px]">
          <RazorIcon flip />
        </div>
      </div>

      {/* ── Main content — centered in viewport ── */}
      <div className="relative z-20 flex w-full flex-col items-center gap-8 px-4 md:gap-10">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="flex w-full flex-wrap justify-center gap-x-2 gap-y-0 font-display text-5xl uppercase tracking-normal md:gap-x-4 md:text-8xl md:flex-nowrap lg:text-9xl"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="overflow-hidden">
              <span
                ref={(el) => { wordRefs.current[i] = el }}
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Barber separator — inline-flex so GSAP reads content width correctly */}
        <div
          ref={hLineRef}
          style={{ display: "inline-flex", overflow: "hidden" }}
        >
          <BarberSeparator />
        </div>

        {/* Location group */}
        <div className="flex flex-col items-center gap-3">
          <p
            ref={subRef}
            className="font-body text-sm uppercase tracking-widest text-[#888888]"
          >
            Barber Club · Heredia, Costa Rica
          </p>
          <a
            ref={locationRef}
            href="https://www.google.com/maps?q=9.9906133,-84.1351361"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex items-center gap-1.5 text-sm text-[#888888] transition-colors duration-200 hover:text-white hover:underline"
          >
            <PinIcon />
            Heredia, Costa Rica
          </a>
        </div>

        {/* CTA */}
        <div ref={ctaWrapRef}>
          <motion.button
            className="font-body min-h-[44px] cursor-pointer border border-white bg-transparent px-8 py-3 text-sm uppercase tracking-widest text-white"
            whileHover={{ backgroundColor: "#ffffff", color: "#0a0a0a" }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              document.getElementById("servicios")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
          >
            Ver servicios
          </motion.button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-2"
      >
        <div
          style={{ width: "1px", height: "40px", backgroundColor: "#888888" }}
        />
        <span className="font-body text-xs uppercase tracking-widest text-[#888888]">
          SCROLL
        </span>
      </div>
    </section>
  )
}
