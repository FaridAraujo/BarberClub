import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Política de Privacidad — Barber Club",
  description: "Política de privacidad de Barber Club, Heredia, Costa Rica.",
  robots: { index: false, follow: false },
}

const LAST_UPDATED = "30 de abril de 2026"

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-background">

      {/* Barber pole top */}
      <div className="h-1 w-full" style={{
        background: "repeating-linear-gradient(to right, #cc2222 0px, #cc2222 33%, #ffffff 33%, #ffffff 66%, #1432a6 66%, #1432a6 100%)",
        backgroundSize: "60px 4px",
      }} />

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">

        {/* Back + Logo */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-body flex items-center gap-2 text-xs uppercase tracking-widest text-[#555555] transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M9 2L4 7l5 5" />
            </svg>
            Inicio
          </Link>
          <Image
            src="/images/logo.png"
            alt="Barber Club"
            width={100}
            height={32}
            unoptimized
            style={{ objectFit: "contain", width: "auto", height: 28, opacity: 0.6 }}
          />
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-[#1a1a1a] pb-8">
          <p className="font-body mb-4 text-xs uppercase tracking-widest text-[#888888]">
            Legal
          </p>
          <h1 className="font-display mb-3 text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
            Política de Privacidad
          </h1>
          <p className="font-body text-xs text-[#555555]">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 font-body text-sm leading-relaxed text-[#888888]">

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              1. Quiénes somos
            </h2>
            <p>
              Barber Club es una barbería ubicada en Heredia, Costa Rica. Este sitio web
              es de carácter informativo y no recopila datos personales a través de
              formularios, registros ni suscripciones.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              2. Datos que recopilamos
            </h2>
            <p>
              Este sitio <strong className="text-[#aaaaaa]">no recopila ni almacena</strong> datos
              personales de sus visitantes. No existen formularios de contacto, cuentas de
              usuario ni sistemas de suscripción.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              3. Servicios de terceros
            </h2>
            <p>
              El sitio utiliza los siguientes servicios externos, cada uno con su propia
              política de privacidad:
            </p>
            <ul className="flex flex-col gap-2 border-l border-[#1a1a1a] pl-4">
              <li>
                <span className="text-[#aaaaaa]">Google Maps</span> — para mostrar la
                ubicación de la barbería. Google puede establecer cookies propias.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#555555] underline transition-colors hover:text-white">
                  Ver política de Google.
                </a>
              </li>
              <li>
                <span className="text-[#aaaaaa]">Waze</span> — enlace de navegación que
                redirige a la app de Waze. Aplican las políticas de Google.
              </li>
              <li>
                <span className="text-[#aaaaaa]">Uber</span> — enlace que redirige a la
                app de Uber para solicitar un viaje. Aplican las políticas de Uber.{" "}
                <a href="https://www.uber.com/legal/en/document/?name=privacy-notice" target="_blank" rel="noopener noreferrer" className="text-[#555555] underline transition-colors hover:text-white">
                  Ver política de Uber.
                </a>
              </li>
              <li>
                <span className="text-[#aaaaaa]">Apple Maps</span> — enlace de navegación
                visible únicamente en dispositivos iOS. Aplican las políticas de Apple.{" "}
                <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#555555] underline transition-colors hover:text-white">
                  Ver política de Apple.
                </a>
              </li>
              <li>
                <span className="text-[#aaaaaa]">WhatsApp</span> — los enlaces de
                contacto redirigen al WhatsApp personal de cada barbero. Al hacer clic
                salís de este sitio y aplican las políticas de Meta.{" "}
                <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#555555] underline transition-colors hover:text-white">
                  Ver política de WhatsApp.
                </a>
              </li>
              <li>
                <span className="text-[#aaaaaa]">Instagram</span> — el link al perfil
                redirige a Instagram. Aplican las políticas de Meta.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              4. Cookies
            </h2>
            <p>
              Este sitio no utiliza cookies propias. Google Maps, al cargarse, puede
              establecer cookies de terceros sujetas a la política de privacidad de Google.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              5. Cambios a esta política
            </h2>
            <p>
              Cualquier actualización a esta política será publicada en esta misma página
              con la fecha de modificación actualizada.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-body text-xs font-medium uppercase tracking-widest text-white">
              6. Contacto
            </h2>
            <p>
              Para consultas relacionadas con privacidad podés contactarnos por WhatsApp
              directamente con cualquiera de los barberos a través de los enlaces
              disponibles en el sitio.
            </p>
          </section>

        </div>

        {/* Footer line */}
        <div className="mt-16 border-t border-[#1a1a1a] pt-6">
          <p className="font-body text-xs text-[#333333]">
            © 2026 Barber Club · Heredia, Costa Rica
          </p>
        </div>

      </div>
    </main>
  )
}
