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
    </div>
  );
};

export default Index;
