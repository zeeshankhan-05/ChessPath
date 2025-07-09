import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickStartSection from "@/components/QuickStartSection";
// import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-chess-dark">
      <Header />
      <HeroSection showResourcesButton />
      <QuickStartSection />
      {/* Footer removed */}
    </div>
  );
};

export default Index;
