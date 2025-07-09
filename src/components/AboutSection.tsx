import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-chess-dark to-chess-dark/90"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About
            <span className="block text-chess-gold">ChessPath</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            ChessPath is a roadmap for chess improvement, designed to guide
            players from complete beginners to advanced players. Our carefully
            curated resources and structured approach ensure you learn
            efficiently and effectively. Our goal is to provide a clear
            learning path that connects players with quality educational
            resources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
