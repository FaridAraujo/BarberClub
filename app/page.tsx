import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Servicios from "@/components/sections/Servicios"
import Barbers from "@/components/sections/Barbers"
import Work from "@/components/sections/Work"
import Reviews from "@/components/sections/Reviews"
import Visit from "@/components/sections/Visit"
import { ASSET_VERSION } from "@/lib/constants"

function SectionDivider({ red = false }: { red?: boolean }) {
  if (red) {
    return <div className="h-[2px] w-full" style={{ backgroundColor: "#cc2222" }} />
  }
  return (
    <div className="flex items-center px-6 py-0 md:px-12" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="h-px flex-1" style={{ backgroundColor: "#1a1a1a" }} />
      <span className="px-4 text-[9px]" style={{ color: "#2a2a2a" }}>◆</span>
      <div className="h-px flex-1" style={{ backgroundColor: "#1a1a1a" }} />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero logoSrc={`/images/logo.png?${ASSET_VERSION}`} />
      <Servicios />
      <SectionDivider />
      <Barbers />
      <SectionDivider />
      <Work />
      {/* <SectionDivider />
      <Reviews /> */}
      <SectionDivider />
      <Visit />
      <Footer />
    </>
  )
}
