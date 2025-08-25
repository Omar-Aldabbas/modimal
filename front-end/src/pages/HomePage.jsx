import { HeroGallery } from "../components/HeroGallery"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { TopSellersSection } from "../components/TopSellersSection"


export const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <TopSellersSection/>
    </div>
  )
}