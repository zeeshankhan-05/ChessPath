import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickStartSection from "@/components/QuickStartSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div className="min-h-screen bg-chess-dark">
      <Header />
      <HeroSection showResourcesButton />
      <QuickStartSection />
      <div className="text-xs text-gray-400 text-center mt-10 mb-4 px-4">
        <span>
          This website does not host or store any original video content. All videos and resources are embedded or linked directly from their original sources. All rights to the content belong to their respective creators. This site exists purely for educational purposes—to organize and share publicly available resources that help players improve at chess
        </span>
      </div>
    </div>
  );
};

export default Index;
