import type { Metadata } from "next"
import { Bebas_Neue, DM_Sans } from "next/font/google"
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

const SITE_URL = "https://barberclub.cr" // update when domain is live

export const metadata: Metadata = {
  title: "Barber Club — Barbería en Heredia, Costa Rica",
  description:
    "Barbería en Heredia, Costa Rica. Cortes, fades y barba con los mejores barberos. Sin citas, solo llegá. Lunes a sábado en el centro de Heredia.",
  keywords: [
    "barbería Heredia",
    "barber Heredia",
    "corte de cabello Heredia",
    "barbería Costa Rica",
    "fades Heredia",
    "barba Heredia",
    "Barber Club",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Barber Club — Barbería en Heredia, Costa Rica",
    description:
      "Cortes, fades y barba. Sin citas, solo llegá. Los mejores barberos de Heredia.",
    url: SITE_URL,
    siteName: "Barber Club",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/team.webp",
        width: 800,
        height: 600,
        alt: "Barber Club — equipo de barberos en Heredia, Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barber Club — Barbería en Heredia, Costa Rica",
    description: "Cortes, fades y barba. Sin citas, solo llegá.",
    images: ["/images/team.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/team-mobile.webp?v5" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/images/team.webp?v5" media="(min-width: 768px)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarberShop",
              name: "Barber Club",
              description:
                "Barbería en Heredia, Costa Rica. Cortes, fades y barba. Sin citas, solo llegá.",
              url: "https://barberclub.cr",
              telephone: "+50660451251",
              image: "https://barberclub.cr/images/team.webp",
              priceRange: "₡₡",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Heredia",
                addressCountry: "CR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.9906133,
                longitude: -84.1351361,
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
              sameAs: [
                "https://instagram.com/barber_club__",
                "https://www.google.com/maps?q=9.9906133,-84.1351361",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "4",
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
