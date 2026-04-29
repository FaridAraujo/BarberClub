import type { Metadata } from "next"
import { Bebas_Neue, DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"

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

export const metadata: Metadata = {
  title: "Barber Club | Heredia",
  description: "Barbería en Heredia, Costa Rica. Sin citas, solo llegá.",
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
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
