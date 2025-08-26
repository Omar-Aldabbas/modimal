import { CollectionsSection } from "../components/CollectionsSection";
import { FollowSection } from "../components/FollowSection";
import { HeroGallery } from "../components/HeroGallery";
import { HeroSection } from "../components/HeroSection";
import { ModiSeasonSection } from "../components/ModiSeasonSection";
import { Navbar } from "../components/Navbar";
import { SustainabilitySection } from "../components/SustainabilitySection";
import { TopSellersSection } from "../components/TopSellersSection";

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopSellersSection />
      <CollectionsSection />
      <ModiSeasonSection />
      <SustainabilitySection />
      <FollowSection />
    </div>
  );
};
