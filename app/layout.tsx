import type { Metadata, Viewport } from "next"
import { Bebas_Neue, DM_Sans } from "next/font/google"
import { REVIEWS, SITE_DATA } from "@/lib/constants"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
})

const dmSans = DM_Sans({
  variable: "--font-body",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
})

const SITE_URL = "https://barberclubcr.com"

export const metadata: Metadata = {
  title: "Barber Club CR | Barbería en Heredia, Costa Rica",
  description:
    "Barbería en Heredia, Costa Rica especializada en fades, cortes modernos y arreglo de barba. Atención profesional sin cita previa en el centro de Heredia.",
  keywords: [
    "barbería Heredia",
    "barber Heredia",
    "corte de cabello Heredia",
    "barbería Costa Rica",
    "fades Heredia",
    "barba Heredia",
    "Barber Club CR",
    "barbería centro Heredia",
    "cortes modernos Heredia",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Barber Club CR | Barbería en Heredia, Costa Rica",
    description:
      "Fades, cortes modernos y barba. Sin cita previa. Los mejores barberos en el centro de Heredia, Costa Rica.",
    url: SITE_URL,
    siteName: "Barber Club CR",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Barber Club CR — equipo de barberos en Heredia, Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barber Club CR | Barbería en Heredia, Costa Rica",
    description: "Fades, cortes modernos y barba. Sin cita previa en Heredia.",
    images: ["/images/og-image.webp"],
  },
  verification: {
    google: "x_T5IvegqxY8H5OZ7KU5PmPi-Fo3Mx6v09G53dz_ccs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CR" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/team-mobile.webp?v5" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/images/team.webp?v5" media="(min-width: 768px)" />
        <link rel="me" href="https://instagram.com/barber_club__" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Barbershop",
              name: "Barber Club CR",
              description:
                "Barbería en Heredia, Costa Rica especializada en fades, cortes modernos y arreglo de barba. Sin cita previa.",
              url: SITE_URL,
              telephone: "+50660451251",
              image: `${SITE_URL}/images/team.webp`,
              logo: `${SITE_URL}/images/logo.png`,
              priceRange: "$$",
              currenciesAccepted: "CRC",
              paymentAccepted: "Cash, Credit Card, SINPE Móvil",
              areaServed: "Heredia, Costa Rica",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Heredia",
                addressRegion: "Heredia",
                addressCountry: "CR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.9906133,
                longitude: -84.1351361,
              },
              hasMap: "https://www.google.com/maps?q=9.9906133,-84.1351361",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: `https://wa.me/${SITE_DATA.whatsapp}`,
                availableLanguage: { "@type": "Language", name: "Spanish" },
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "09:30",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday"],
                  opens: "08:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de barbería",
                itemListElement: SITE_DATA.services.map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s.name },
                  price: String(s.price),
                  priceCurrency: "CRC",
                })),
              },
              sameAs: [
                "https://instagram.com/barber_club__",
                SITE_DATA.tiktok,
                "https://www.google.com/maps?q=9.9906133,-84.1351361",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: String(REVIEWS.length),
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
