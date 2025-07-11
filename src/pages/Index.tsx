import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickStartSection from "@/components/QuickStartSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-chess-dark">
      <Header />
      <HeroSection showResourcesButton />
      <QuickStartSection />
    </div>
  );
};

export default Index;
