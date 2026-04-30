"use client"

import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">

      {/* Barber pole — top decoration */}
      <div className="absolute left-0 top-0 h-1 w-full" style={{
        background: "repeating-linear-gradient(to right, #cc2222 0px, #cc2222 33%, #ffffff 33%, #ffffff 66%, #1432a6 66%, #1432a6 100%)",
        backgroundSize: "60px 4px",
      }} />

      {/* Logo */}
      <div className="mb-10 opacity-60">
        <Image
          src="/images/logo.png"
          alt="Barber Club"
          width={120}
          height={40}
          unoptimized
          style={{ objectFit: "contain", width: "auto", height: 36 }}
        />
      </div>

      {/* 404 */}
      <h1
        className="font-display leading-none text-white select-none"
        style={{ fontSize: "clamp(120px, 30vw, 220px)", opacity: 0.07, lineHeight: 1 }}
        aria-hidden
      >
        404
      </h1>

      {/* Message */}
      <div className="-mt-8 flex flex-col items-center gap-4 md:-mt-12">
        <p className="font-body text-xs uppercase tracking-widest text-[#888888]">
          Página no encontrada
        </p>
        <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white md:text-5xl">
          Este corte no existe
        </h2>
        <p className="font-body mt-2 max-w-xs text-sm text-[#555555]">
          La página que buscás no está disponible. Volvé al inicio para encontrar lo que necesitás.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="font-body mt-10 inline-flex min-h-[44px] items-center gap-3 border border-white/20 px-8 py-3 text-xs uppercase tracking-widest text-white/60 transition-colors duration-200 hover:border-white/50 hover:text-white"
      >
        Volver al inicio
      </Link>

      {/* Barber pole — bottom decoration */}
      <div className="absolute bottom-0 left-0 h-1 w-full" style={{
        background: "repeating-linear-gradient(to right, #cc2222 0px, #cc2222 33%, #ffffff 33%, #ffffff 66%, #1432a6 66%, #1432a6 100%)",
        backgroundSize: "60px 4px",
      }} />

    </main>
  )
}
