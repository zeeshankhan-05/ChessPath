import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RoadmapSection from "@/components/RoadmapSection";
import SearchSection from "@/components/SearchSection";
import QuickStartSection from "@/components/QuickStartSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-chess-dark">
      <Header />
      <AboutSection />
      <HeroSection />
      <QuickStartSection />
      <RoadmapSection />
      <SearchSection />
      <Footer />
    </div>
  );
};

export default Index;
