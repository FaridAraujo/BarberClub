"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ASSET_VERSION, LOGO_PATH } from "@/lib/constants"

const NAV_LINKS = [
  { label: "Servicios",       id: "servicios" },
  { label: "El Equipo",       id: "equipo"    },
  { label: "Nuestro Trabajo", id: "trabajo"   },
  { label: "Visítanos",       id: "visita"    },
] as const

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [logoError,  setLogoError]  = useState(false)
  const [activeId,   setActiveId]   = useState<string | null>(null)
  const [hoveredId,  setHoveredId]  = useState<string | null>(null)

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
          // First section that is visible in document order wins
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

  // ── Link colour: hover > active > default ────────────────────────────────────
  // Inline style is used for base colour so we resolve it fully in JS,
  // avoiding the inline-vs-Tailwind specificity conflict.
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

              {/* Active indicator — thin red line below the label */}
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
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[6px] md:hidden"
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

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 px-6 pb-12 pt-24"
            style={{ backgroundColor: "#0a0a0a", zIndex: 49 }}
          >
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  onClick={() => scrollTo(link.id)}
                  className="font-display py-3 text-left text-2xl uppercase tracking-tight transition-colors duration-200"
                  style={{ color: activeId === link.id ? "#cc2222" : "#ffffff" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
