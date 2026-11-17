import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BioOverview from "@/components/BioOverview";
import RealPhotosGallery from "@/components/RealPhotosGallery";
import FiveContinentsScrollytelling from "@/components/FiveContinentsScrollytelling";
import StoriesSection from "@/components/StoriesSection";
import ResistanceSection from "@/components/ResistanceSection";
import Footer from "@/components/Footer";
import { getRealPhotos, getJourney, getStories, getResistanceHistory } from "@/lib/data-service";

export default async function HomePage() {
  const [photos, journey, stories, resistanceHistory] = await Promise.all([
    getRealPhotos(),
    getJourney(),
    getStories(),
    getResistanceHistory(),
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-[#12100E] text-[#EDE8DF]">
      <Navbar />
      <HeroSection />
      <BioOverview />
      <RealPhotosGallery photos={photos} />
      <FiveContinentsScrollytelling journey={journey} />
      <StoriesSection stories={stories} />
      <ResistanceSection resistanceHistory={resistanceHistory} />
      <Footer />
    </main>
  );
}
