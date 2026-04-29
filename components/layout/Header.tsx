"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ASSET_VERSION, LOGO_PATH, SITE_DATA } from "@/lib/constants"
import { checkIsOpen } from "@/lib/schedule"

const NAV_LINKS = [
  { label: "Servicios",       id: "servicios", desc: "Cortes y precios"     },
  { label: "El Equipo",       id: "equipo",    desc: "Quiénes te atienden"  },
  { label: "Nuestro Trabajo", id: "trabajo",   desc: "Galería de cortes"    },
  { label: "Visítanos",       id: "visita",    desc: "Horario y ubicación"  },
] as const

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

const WA_LINK =
  `https://wa.me/${SITE_DATA.whatsapp}?text=${encodeURIComponent("Hola, ¿hay espacio disponible?")}`
const MAPS_LINK = "https://www.google.com/maps?q=9.9906133,-84.1351361"

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 11 14"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
    >
      <path d="M5.5 1C3.015 1 1 3.015 1 5.5C1 8.75 5.5 13 5.5 13S10 8.75 10 5.5C10 3.015 7.985 1 5.5 1Z" />
      <circle cx="5.5" cy="5.5" r="1.5" />
    </svg>
  )
}

// ─── Decorative razor (matches the hero's logo composition) ───────────────────

function RazorIcon({ flip = false, size = 36 }: { flip?: boolean; size?: number }) {
  return (
    <div style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <Image
        src={`/images/razor.webp?${ASSET_VERSION}`}
        alt=""
        width={size}
        height={size}
        unoptimized
        loading="lazy"
        style={{ objectFit: "contain", width: size, height: size }}
      />
    </div>
  )
}

// ─── Animated barber pole — same as hero's separator, slightly smaller ────────

function BarberPole({ width = 100 }: { width?: number }) {
  return (
    <>
      <style>{`
        @keyframes barber-spin-h {
          from { background-position: 0 0; }
          to   { background-position: -32px 0; }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Left dome */}
        <div style={{
          width: 9, height: 18, flexShrink: 0,
          borderRadius: "50% 0 0 50%",
          background: "radial-gradient(ellipse at 30% 35%, #ffffff 0%, #cccccc 20%, #888888 48%, #555555 72%, #303030 100%)",
          boxShadow: "inset -1px 0 3px rgba(0,0,0,0.4)",
        }} />
        {/* Left collar */}
        <div style={{
          width: 5, height: 18, flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />
        {/* Cylinder */}
        <div style={{ width, height: 18, position: "relative", overflow: "hidden", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.45), inset 0 -1px 2px rgba(0,0,0,0.45)" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 200, height: 200,
            transform: "translate(-50%, -50%) rotate(45deg)",
            backgroundImage:
              "repeating-linear-gradient(to right," +
              " #d01010 0px,  #d01010 8px," +
              " #ebebeb 8px,  #ebebeb 16px," +
              " #1432a6 16px, #1432a6 24px," +
              " #ebebeb 24px, #ebebeb 32px)",
            animation: "barber-spin-h 1.5s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "linear-gradient(to bottom," +
              " rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 22%," +
              " rgba(255,255,255,0.0) 40%, rgba(0,0,0,0.0) 58%," +
              " rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.38) 100%)",
          }} />
        </div>
        {/* Right collar */}
        <div style={{
          width: 5, height: 18, flexShrink: 0,
          background: "linear-gradient(to bottom, #f0f0f0 0%, #bebebe 15%, #808080 38%, #505050 50%, #808080 62%, #bebebe 85%, #f0f0f0 100%)",
        }} />
        {/* Right dome */}
        <div style={{
          width: 9, height: 18, flexShrink: 0,
          borderRadius: "0 50% 50% 0",
          background: "radial-gradient(ellipse at 70% 35%, #ffffff 0%, #cccccc 20%, #888888 48%, #555555 72%, #303030 100%)",
          boxShadow: "inset 1px 0 3px rgba(0,0,0,0.4)",
        }} />
      </div>
    </>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [logoError,  setLogoError]  = useState(false)
  const [activeId,   setActiveId]   = useState<string | null>(null)
  const [hoveredId,  setHoveredId]  = useState<string | null>(null)
  const [isOpen,     setIsOpen]     = useState<boolean | null>(null)

  // ── Open/closed status (only computed when menu actually opens — saves work) ──
  useEffect(() => {
    if (!menuOpen) return
    setIsOpen(checkIsOpen())
    const interval = setInterval(() => setIsOpen(checkIsOpen()), 60_000)
    return () => clearInterval(interval)
  }, [menuOpen])

  // ── Background toggle on scroll ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Active section via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting)
          const current = SECTION_IDS.find((sid) => visible.get(sid)) ?? null
          setActiveId(current)
        },
        { threshold: 0.25 },
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // ── Lock body scroll while mobile menu is open ───────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  function scrollTo(id: string) {
    const wasOpen = menuOpen
    setMenuOpen(false)
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      wasOpen ? 300 : 0,
    )
  }

  // Inline-resolved colour: hover > active > scrolled > default
  function linkColor(id: string): string {
    if (hoveredId === id || activeId === id) return "#ffffff"
    return scrolled ? "#888888" : "rgba(255,255,255,0.7)"
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-colors duration-300 md:h-20 md:px-12"
        style={{
          backgroundColor: scrolled ? "#0a0a0a" : "transparent",
          backdropFilter:  scrolled ? "blur(8px)" : "none",
          borderBottom:    scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        }}
      >
        {/* ── Logo — hidden at top, visible on scroll ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Ir al inicio"
          className="transition-opacity duration-300"
          style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
        >
          {logoError ? (
            <span className="font-body text-sm font-bold uppercase tracking-widest text-white">
              Barber Club
            </span>
          ) : (
            <Image
              src={`${LOGO_PATH}?${ASSET_VERSION}`}
              alt="Barber Club"
              width={120}
              height={40}
              unoptimized
              onError={() => setLogoError(true)}
              className="h-8 w-auto md:h-10"
              style={{ objectFit: "contain" }}
            />
          )}
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="font-body relative text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: linkColor(link.id) }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px bg-[#cc2222] transition-all duration-300"
                style={{ width: activeId === link.id ? "100%" : "0%" }}
                aria-hidden
              />
            </button>
          ))}
        </nav>

        {/* ── Hamburger ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[60] flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[6px] md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span
            className="block bg-white transition-all duration-300"
            style={{
              width: 20, height: 1,
              transformOrigin: "center",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block bg-white transition-all duration-300"
            style={{ width: 20, height: 1, opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block bg-white transition-all duration-300"
            style={{
              width: 20, height: 1,
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </motion.header>

      {/* ── Mobile menu — barbershop drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 overflow-y-auto px-6 pb-10 pt-20"
            style={{ backgroundColor: "#0a0a0a", zIndex: 49 }}
          >
            {/* ── Logo block + razors (matches hero composition) ── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="-mr-2.5">
                <RazorIcon size={32} />
              </div>
              {!logoError ? (
                <div className="relative h-[44px] w-[170px]">
                  <Image
                    src={`${LOGO_PATH}?${ASSET_VERSION}`}
                    alt="Barber Club"
                    fill
                    unoptimized
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <span className="font-display text-2xl tracking-widest text-white">
                  BARBER CLUB
                </span>
              )}
              <div className="-ml-2.5">
                <RazorIcon size={32} flip />
              </div>
            </motion.div>

            {/* ── Animated barber pole ── */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-10 flex justify-center"
              style={{ transformOrigin: "center" }}
            >
              <BarberPole width={120} />
            </motion.div>

            {/* ── Numbered nav ── */}
            <nav className="mb-10 flex flex-col" aria-label="Navegación móvil">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                  onClick={() => scrollTo(link.id)}
                  className="group relative flex items-baseline gap-4 border-b border-[#1a1a1a] py-4 text-left transition-colors"
                >
                  {/* Label + description */}
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span
                      className="font-display text-2xl uppercase leading-none tracking-tight"
                      style={{ color: activeId === link.id ? "#cc2222" : "#ffffff" }}
                    >
                      {link.label}
                    </span>
                    <span className="font-body text-[11px] text-[#666666]">
                      {link.desc}
                    </span>
                  </span>

                  {/* Arrow */}
                  <span className="font-body text-lg text-[#444444] transition-all group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* ── Status + abbreviated schedule ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mb-8"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-[#cc2222]"}`}
                />
                <span className="font-body text-[10px] uppercase tracking-widest text-[#888888]">
                  {isOpen === null ? "—" : isOpen ? "Abierto ahora" : "Cerrado ahora"}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {SITE_DATA.schedule.map((row) => (
                  <div key={row.days} className="flex items-baseline justify-between">
                    <span className="font-body text-xs text-[#888888]">{row.days}</span>
                    <span
                      className="font-body text-xs"
                      style={{ color: row.hours === "Cerrado" ? "#cc2222" : "#dddddd" }}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Contact icons row ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center justify-center gap-3 border-t border-[#1a1a1a] pt-6"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center text-[#888888] transition-colors hover:text-[#25D366]"
              >
                <WhatsAppIcon size={20} />
              </a>
              <span className="text-[#222]">·</span>
              <a
                href={SITE_DATA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-[#888888] transition-colors hover:text-[#d62976]"
              >
                <InstagramIcon size={20} />
              </a>
              <span className="text-[#222]">·</span>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver en Google Maps"
                className="flex h-11 w-11 items-center justify-center text-[#888888] transition-colors hover:text-white"
              >
                <PinIcon size={18} />
              </a>
            </motion.div>

            {/* ── Footer tagline ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="font-body mt-6 text-center text-[10px] uppercase tracking-widest text-[#444444]"
            >
              {SITE_DATA.slogan}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
