import Header from "@/components/Header";
import RoadmapSection from "@/components/RoadmapSection";
import { useEffect } from "react";

const Roadmap = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div className="min-h-screen bg-chess-dark">
      <Header />
      <RoadmapSection />
    </div>
  );
};

export default Roadmap;
