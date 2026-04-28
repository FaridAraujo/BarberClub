import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Servicios from "@/components/sections/Servicios"
import Barbers from "@/components/sections/Barbers"
import Work from "@/components/sections/Work"
import Visit from "@/components/sections/Visit"
import { ASSET_VERSION } from "@/lib/constants"

export default function Home() {
  return (
    <>
      <Hero logoSrc={`/images/logo.png?${ASSET_VERSION}`} />
      <Servicios />
      <Barbers />
      <Work />
      <Visit />
      <Footer />
    </>
  )
}
