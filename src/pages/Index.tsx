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
          Disclaimer: All rights to the resources referenced on this site belong to their respective owners. This website is a compiled list for educational purposes only.
        </span>
      </div>
    </div>
  );
};

export default Index;
