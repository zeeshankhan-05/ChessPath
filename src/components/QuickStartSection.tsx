import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, PlayCircle, BookOpen, Target } from "lucide-react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const QuickStartSection = () => {
  const [selectedElo, setSelectedElo] = useState<string | null>(null);
  const studyPlanRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const eloRanges = [
    {
      range: "0-800",
      level: "beginner",
      title: "Complete Beginner",
      description: "New to chess or just learning the basics",
      quickStart: {
        priority: "Learn piece movement and basic rules",
        timeCommitment: "15-30 minutes daily",
        weeklyGoal: "Play 3-5 games daily, solve 10 tactics",
      },
    },
    {
      range: "800-1200",
      level: "beginner",
      title: "Developing Beginner",
      description: "Know the rules, working on fundamentals",
      quickStart: {
        priority: "Master basic tactical patterns",
        timeCommitment: "30-45 minutes daily",
        weeklyGoal: "Solve 50+ tactics, play 10+ games",
      },
    },
    {
      range: "1200-1500",
      level: "intermediate",
      title: "Early Intermediate",
      description: "Solid tactics, learning strategy",
      quickStart: {
        priority: "Study opening principles and middlegame strategy",
        timeCommitment: "45-60 minutes daily",
        weeklyGoal: "Study 2-3 master games, solve 100+ tactics",
      },
    },
    {
      range: "1500-1800",
      level: "intermediate",
      title: "Solid Intermediate",
      description: "Good positional understanding, refining skills",
      quickStart: {
        priority: "Develop opening repertoire and endgame knowledge",
        timeCommitment: "60-90 minutes daily",
        weeklyGoal: "Analyze your games, study specific openings",
      },
    },
    {
      range: "1800+",
      level: "advanced",
      title: "Advanced Player",
      description: "Strong player looking to reach expert level",
      quickStart: {
        priority: "Strengthen deep theoretical study and game analysis",
        timeCommitment: "90+ minutes daily",
        weeklyGoal: "Intensive analysis, theoretical preparation",
      },
    },
  ];

  const studyPlans = {
    "30min": {
      title: "30-Minute Daily Plan",
      breakdown: [
        { activity: "Tactical puzzles", time: "10 min", icon: Target },
        { activity: "Play one game", time: "15 min", icon: PlayCircle },
        { activity: "Game analysis", time: "5 min", icon: BookOpen },
      ],
    },
    "60min": {
      title: "60-Minute Daily Plan",
      breakdown: [
        { activity: "Tactical training", time: "10 min", icon: Target },
        { activity: "Theory study", time: "20 min", icon: BookOpen },
        { activity: "Play one game", time: "20 min", icon: PlayCircle },
        { activity: "Analysis", time: "10 min", icon: BookOpen },
      ],
    },
    "90min": {
      title: "90-Minute Daily Plan",
      breakdown: [
        { activity: "Tactical training", time: "20 min", icon: Target },
        { activity: "Theory study", time: "25 min", icon: BookOpen },
        { activity: "Play one game", time: "30 min", icon: PlayCircle },
        { activity: "Analysis", time: "15 min", icon: BookOpen },
      ],
    },
  };

  // Helper to determine the best plan key for a level
  const getBestPlanKey = (level: string) => {
    if (level === "advanced") return "90min";
    if (level === "intermediate") return "60min";
    return "30min";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-chess-dark/90 to-chess-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Quick Start
            <span className="block text-chess-gold">Your Journey</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Select your current skill level and get personalized recommendations
            and study plans.
          </p>
        </div>

        {/* ELO Assessment */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            What's your current playing strength?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {eloRanges.map((range, index) => (
              <Card
                key={range.range}
                className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedElo === range.range
                    ? `bg-${range.level}/20 border-${range.level}/50 ${
                        range.level === "beginner"
                          ? "shadow-[0_10px_30px_-10px_hsl(var(--beginner)/0.3)]"
                          : range.level === "intermediate"
                          ? "shadow-[0_10px_30px_-10px_hsl(var(--intermediate)/0.3)]"
                          : "shadow-[0_10px_30px_-10px_hsl(var(--advanced)/0.3)]"
                      }`
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
                onClick={() => {
                  setSelectedElo(range.range);
                  setTimeout(() => {
                    if (studyPlanRef.current) {
                      studyPlanRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }, 100);
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <Badge
                    variant="outline"
                    className={`mb-3 ${
                      selectedElo === range.range
                        ? `bg-${range.level}/30 text-${range.level} border-${range.level}/50`
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {range.range} ELO
                  </Badge>
                  <h4
                    className={`font-semibold mb-2 ${
                      selectedElo === range.range
                        ? `text-${range.level}`
                        : "text-foreground"
                    }`}
                  >
                    {range.title}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {range.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        {selectedElo && (
          <div className="animate-fade-in" ref={studyPlanRef}>
            {(() => {
              const selected = eloRanges.find((r) => r.range === selectedElo)!;
              return (
                <Card
                  className={`bg-${selected.level}/10 border-${selected.level}/30 p-8 mb-8`}
                >
                  <div className="text-center mb-8">
                    <h3
                      className={`text-2xl font-bold text-${selected.level} mb-4`}
                    >
                      Your Personalized Study Plan
                    </h3>
                    <p className="text-foreground/80">
                      Based on your skill level:{" "}
                      <span className={`text-${selected.level} font-bold`}>
                        {selected.title}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Start Guide */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <PlayCircle className="h-5 w-5 mr-2 text-chess-gold" />
                        Get Started Today
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="font-medium text-foreground mb-1">
                            Priority
                          </div>
                          <div className="text-foreground/80 text-sm">
                            {selected.quickStart.priority}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="font-medium text-foreground mb-1">
                            Daily Commitment
                          </div>
                          <div className="text-foreground/80 text-sm">
                            {selected.quickStart.timeCommitment}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="font-medium text-foreground mb-1">
                            Weekly Goal
                          </div>
                          <div className="text-foreground/80 text-sm">
                            {selected.quickStart.weeklyGoal}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Study Plans */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-chess-gold" />
                        Daily Study Structure
                      </h4>
                      <div className="space-y-4">
                        {Object.entries(studyPlans).map(([key, plan]) => {
                          const isBest = key === getBestPlanKey(selected.level);
                          return (
                            <div
                              key={key}
                              className={`rounded-lg p-4 ${
                                isBest
                                  ? `border-2 border-${selected.level} bg-${selected.level}/10`
                                  : "bg-white/5"
                              } ${isBest ? "shadow-lg" : ""}`}
                            >
                              <div
                                className={`font-medium mb-3 ${
                                  isBest
                                    ? `text-${selected.level}`
                                    : "text-foreground"
                                }`}
                              >
                                {plan.title}{" "}
                                {isBest && (
                                  <span
                                    className={`ml-2 text-xs px-2 py-1 rounded bg-${selected.level}/20 text-${selected.level}`}
                                  >
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2">
                                {plan.breakdown.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <div className="flex items-center">
                                      <item.icon
                                        className={`h-4 w-4 mr-2 ${
                                          isBest
                                            ? `text-${selected.level}`
                                            : "text-chess-gold"
                                        }`}
                                      />
                                      <span className="text-foreground/80">
                                        {item.activity}
                                      </span>
                                    </div>
                                    <span className="text-foreground/60">
                                      {item.time}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button
                      className={`bg-${selected.level} text-${selected.level}-foreground hover:bg-${selected.level}/90 font-semibold`}
                      onClick={() => navigate("/roadmap")}
                    >
                      Start {selected.title} Path
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Link to="/resources">
                      <Button
                        variant="outline"
                        className="bg-transparent border-white/20 hover:bg-white/10 text-white hover:text-white"
                      >
                        View All Resources
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickStartSection;
