"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ASSET_VERSION, LOGO_PATH, SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: "Servicios",       id: "servicios" },
  { label: "El Equipo",       id: "equipo"    },
  { label: "Nuestro Trabajo", id: "trabajo"   },
  { label: "Visítanos",       id: "visita"    },
]

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
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

export default function Footer() {
  const footerRef              = useRef<HTMLElement>(null)
  const [logoError, setLogoError] = useState(false)

  useGSAP(
    () => {
      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: footerRef }
  )

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer
      ref={footerRef}
      className="px-6 py-12 md:px-12"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      {/* ── Row 1: Logo + Instagram ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Ir al inicio"
        >
          {logoError ? (
            <span className="font-body text-sm font-bold uppercase tracking-widest text-white">
              Barber Club
            </span>
          ) : (
            <Image
              src={`${LOGO_PATH}?${ASSET_VERSION}`}
              alt="Barber Club"
              width={100}
              height={32}
              unoptimized
              onError={() => setLogoError(true)}
              className="h-8 w-auto"
              style={{ objectFit: "contain" }}
            />
          )}
        </button>

        <a
          href={SITE_DATA.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#888888] transition-colors duration-200 hover:text-white"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      </div>

      {/* ── Row 2: Nav links ── */}
      <nav
        className="flex flex-wrap justify-center gap-8 py-8"
        style={{
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          marginTop: "2rem",
        }}
        aria-label="Navegación footer"
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="font-body flex min-h-[44px] items-center text-xs uppercase tracking-widest text-[#888888] transition-colors duration-200 hover:text-white"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* ── Row 3: Copyright ── */}
      <div className="flex flex-col items-center gap-1 pt-8 text-xs text-[#555555] sm:flex-row sm:justify-between sm:gap-0">
        <span>© 2025 Barber Club. Todos los derechos reservados.</span>
        <span>Heredia, Costa Rica</span>
      </div>
    </footer>
  )
}
