import { skillLevels } from "@/data/chessData";
import SkillLevelCard from "./SkillLevelCard";

const RoadmapSection = () => {
  return (
    <section
      id="roadmap"
      className="py-20 bg-gradient-to-b from-chess-dark to-chess-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Chess Learning
            <span className="block text-chess-gold">Roadmap</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Follow our structured path from complete beginner to advanced
            player. Each level builds on the previous, ensuring you develop a
            solid foundation before moving to more complex concepts.
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillLevels.map((skillLevel, index) => (
            <div
              key={skillLevel.level}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <SkillLevelCard
                level={skillLevel.level}
                title={skillLevel.title}
                eloRange={skillLevel.eloRange}
                description={skillLevel.description}
                topics={skillLevel.topics}
                colorScheme={skillLevel.colorScheme}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Not sure where to start?
            </h3>
            <p className="text-foreground/70 mb-6">
              Browse our resources to find your current skill level and get
              personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("resources")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                Browse All Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
