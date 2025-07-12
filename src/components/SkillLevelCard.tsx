import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  title: string;
  description: string;
  url: string;
  type: "video" | "website";
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  difficulty: string;
  prerequisites: string[];
  resources: Resource[];
  skills: string[];
}

interface SkillLevelCardProps {
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  eloRange: string;
  description: string;
  topics: Topic[];
  colorScheme: {
    primary: string;
    background: string;
    border: string;
    shadow: string;
  };
}

const getResourceTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return "🎥";
    case "website":
      return "🌐";
    default:
      return "📝";
  }
};

const SkillLevelCard = ({
  level,
  title,
  eloRange,
  description,
  topics,
  colorScheme,
}: SkillLevelCardProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <Card
      className={cn(
        "p-6 border-2 transition-all duration-500 hover:scale-105 animate-slide-up",
        colorScheme.border,
        colorScheme.background,
        colorScheme.shadow
      )}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <Badge
          variant="secondary"
          className={cn("mb-3", `bg-${level}/20 text-${level}`)}
        >
          {eloRange}
        </Badge>
        <h3 className={cn("text-2xl font-bold mb-2", `text-${level}`)}>
          {title}
        </h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <Card
            key={topic.id}
            className="bg-white/5 border-white/10 p-4 transition-all duration-300 hover:bg-white/10"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full text-left flex items-center justify-between group"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-chess-gold transition-colors">
                  {topic.title}
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  {topic.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-xs text-foreground/50">
                    <Clock className="h-3 w-3 mr-1" />
                    {topic.timeEstimate}
                  </div>
                  <div className="flex items-center text-xs text-foreground/50">
                    <Target className="h-3 w-3 mr-1" />
                    {topic.difficulty}
                  </div>
                </div>
              </div>
              {expandedTopics.has(topic.id) ? (
                <ChevronUp className="h-5 w-5 text-foreground/50 group-hover:text-chess-gold transition-colors" />
              ) : (
                <ChevronDown className="h-5 w-5 text-foreground/50 group-hover:text-chess-gold transition-colors" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedTopics.has(topic.id) && (
              <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                {/* Skills */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-foreground/80 mb-2">
                    Skills You'll Learn:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {topic.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-white/5 border-white/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                {topic.prerequisites.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-foreground/80 mb-2">
                      Prerequisites:
                    </h5>
                    <ul className="text-sm text-foreground/60 space-y-1">
                      {topic.prerequisites.map((prereq, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-chess-gold rounded-full mr-2 flex-shrink-0" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Resources */}
                <div>
                  <h5 className="text-sm font-medium text-foreground/80 mb-3">
                    Recommended Resources:
                  </h5>
                  <div className="space-y-3">
                    {topic.resources.map((resource, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">
                                {getResourceTypeIcon(resource.type)}
                              </span>
                              <h6 className="font-medium text-foreground text-sm">
                                {resource.title}
                              </h6>
                              <div className="flex items-center gap-1">
                                {resource.free && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-500/20 text-green-400 border-green-500/30"
                                  >
                                    Free
                                  </Badge>
                                )}
                                <div className="flex items-center text-xs text-chess-gold">
                                  {"★".repeat(Math.floor(resource.rating))}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-foreground/60 mb-2">
                              {resource.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="ml-2 bg-transparent border-white/20 hover:bg-white/10"
                            onClick={() => window.open(resource.url, "_blank")}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Level CTA */}
      <div className="mt-6 text-center">
        <Link to="/roadmap">
          <Button
            className={cn(
              "w-full font-semibold transition-all hover:scale-105",
              `bg-${level} text-${level}-foreground hover:bg-${level}/90`
            )}
          >
            Start {title} Path
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SkillLevelCard;
