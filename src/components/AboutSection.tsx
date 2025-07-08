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
            ChessPath is the definitive roadmap for chess improvement, designed
            to guide players from complete beginners to advanced masters. Our
            carefully curated resources and structured approach ensure you learn
            efficiently and effectively.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="bg-white/5 border-white/10 p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-chess-gold mb-4">
                Our Mission
              </h3>
              <p className="text-foreground/80 text-lg leading-relaxed">
                To democratize chess education by providing a clear, structured
                learning path that connects players with quality educational
                resources.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
