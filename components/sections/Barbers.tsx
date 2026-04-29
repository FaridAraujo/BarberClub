"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BARBERS } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function BarberInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  // Aspect ratio is set on the parent container — this just fills it.
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: "#111111" }}
    >
      <span className="font-display text-4xl" style={{ color: "#333333" }}>
        {initials}
      </span>
    </div>
  )
}

interface BarberCardProps {
  barber: (typeof BARBERS)[number]
  index: number
}

function BarberCard({ barber, index }: BarberCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError]   = useState(false)

  return (
    <div
      className="b-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="b-photo relative w-full overflow-hidden aspect-square md:aspect-[3/4]">
        {imgError ? (
          <BarberInitials name={barber.name} />
        ) : (
          <Image
            src={barber.photo}
            alt={barber.name}
            width={400}
            height={533}
            unoptimized
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
            style={{
              filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
              transition: "filter 0.4s ease",
            }}
          />
        )}

        {/* Gradient overlay — mobile only */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 45%, transparent 70%)" }}
        />

        {/* Name + WA over photo — mobile only */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:hidden">
          <h3 className="font-display mb-2 text-2xl uppercase leading-none tracking-tight text-white">
            {barber.name}
          </h3>
          <div className="mb-3 h-px w-full bg-white/20" />
          <a
            href={`https://wa.me/${barber.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
          >
            <WhatsAppIcon />
            Escribir
          </a>
        </div>
      </div>

      {/* Text below photo — desktop only */}
      <div className="hidden md:flex md:flex-col md:gap-4 md:pt-4">
        <h3
          className="font-display text-2xl uppercase leading-none tracking-tight"
          style={{
            color: hovered ? "#cc2222" : "#ffffff",
            transition: "color 0.25s ease",
          }}
        >
          {barber.name}
        </h3>
        <div className="h-px w-full bg-[#333333]" />
        <a
          href={`https://wa.me/${barber.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body flex min-h-[44px] items-center gap-2 text-sm text-[#888888] transition-colors duration-200 hover:text-white"
        >
          <WhatsAppIcon />
          Escribir
        </a>
      </div>
    </div>
  )
}

export default function Barbers() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef)

      gsap.from(q(".b-header"), {
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

      gsap.from(q(".b-card"), {
        opacity: 0,
        y: 50,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".b-card")[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(q(".b-photo"), {
        scale: 1.05,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".b-card")[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="equipo"
      ref={containerRef}
      className="bg-background pb-20 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">

        {/* ── Header ── */}
        <div className="b-header mb-10 md:mb-20">
          <p className="font-body mb-5 text-xs uppercase tracking-widest text-[#888888]">
            El equipo
          </p>
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
            Conocé al equipo
          </h2>
        </div>

        {/* ── Barbers grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {BARBERS.map((barber, i) => (
            <BarberCard key={barber.id} barber={barber} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
