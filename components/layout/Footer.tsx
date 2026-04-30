"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ASSET_VERSION, LOGO_PATH, SITE_DATA } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const WA_LINK =
  `https://wa.me/${SITE_DATA.whatsapp}?text=${encodeURIComponent("Hola, ¿hay espacio disponible?")}`

const NAV_LINKS = [
  { label: "Servicios",       id: "servicios" },
  { label: "El Equipo",       id: "equipo"    },
  { label: "Nuestro Trabajo", id: "trabajo"   },
  { label: "Visítanos",       id: "visita"    },
]

function InstagramIcon() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
              className="h-8"
              style={{ objectFit: "contain", width: "auto" }}
            />
          )}
        </button>

        <div className="flex items-center gap-5">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888888] transition-colors duration-200 hover:text-[#25D366]"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
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
      </div>

      {/* ── Row 2: Nav links ── */}
      <nav
        className="flex flex-nowrap justify-center gap-4 py-8 md:gap-8"
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
            className="font-body flex min-h-[44px] items-center text-[9px] uppercase tracking-widest text-[#888888] transition-colors duration-200 hover:text-white md:text-xs"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* ── Row 3: Copyright ── */}
      <div className="flex flex-col items-center gap-1 pt-8 text-xs text-[#555555] sm:flex-row sm:justify-between sm:gap-0">
        <span>© 2026 Barber Club. Todos los derechos reservados.</span>
        <div className="flex items-center gap-4">
          <Link
            href="/privacidad"
            className="transition-colors duration-200 hover:text-white"
          >
            Privacidad
          </Link>
          <span>Heredia, Costa Rica</span>
        </div>
      </div>
    </footer>
  )
}
