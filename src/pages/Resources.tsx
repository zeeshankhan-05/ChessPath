import Header from "@/components/Header";
import { useState, useMemo, useEffect } from "react";
import { skillLevels } from "@/data/chessData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const typeIcons: Record<string, JSX.Element> = {
  website: (
    <span role="img" aria-label="Website">
      🌐
    </span>
  ),
  video: (
    <span role="img" aria-label="Video">
      🎥
    </span>
  ),
};

const allowedResourceTypes = ["website", "video"];
const getAllResourceTypes = () => allowedResourceTypes;

const getAllDifficulties = () => skillLevels.map((l) => l.level);

interface Resource {
  title: string;
  description: string;
  url: string;
  type: string;
  difficulty: string;
  topic: string;
  topicId: string;
  skillLevel: string;
  skillLevelTitle: string;
}

const flattenResources = () => {
  const resources: Resource[] = [];
  skillLevels.forEach((level) => {
    level.topics.forEach((topic) => {
      topic.resources.forEach((res) => {
        if (allowedResourceTypes.includes(res.type)) {
          resources.push({
            ...res,
            topic: topic.title,
            topicId: topic.id,
            skillLevel: level.level,
            skillLevelTitle: level.title,
          });
        }
      });
    });
  });
  return resources;
};

const resourceTypes = getAllResourceTypes();
const difficulties = getAllDifficulties();
const allResources = flattenResources();

// Map skill level to colorScheme
const skillLevelMap = skillLevels.reduce((acc, level) => {
  acc[level.level] = level;
  return acc;
}, {} as Record<string, (typeof skillLevels)[number]>);

// Helper to get topics for a skill level
const getTopicsForLevel = (level: string) => {
  return skillLevelMap[level]?.topics || [];
};

const Resources = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]); // topic ids

  // Filtering logic
  const filteredResources = useMemo(() => {
    return allResources.filter((res) => {
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(res.type);
      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(res.skillLevel);
      const matchesTopic =
        selectedTopics.length === 0 || selectedTopics.includes(res.topicId);
      const matchesSearch =
        search.trim() === "" ||
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.description.toLowerCase().includes(search.toLowerCase()) ||
        res.topic.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesDifficulty && matchesTopic && matchesSearch;
    });
  }, [search, selectedTypes, selectedDifficulties, selectedTopics]);

  // UI Handlers
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  // Improved: Ensure topic removal is handled correctly with functional update
  const toggleDifficulty = (level: string) => {
    setSelectedDifficulties((prev) => {
      if (prev.includes(level)) {
        // Remove level and its topics
        const newLevels = prev.filter((l) => l !== level);
        const levelTopicIds = getTopicsForLevel(level).map((t) => t.id);
        setSelectedTopics((prevTopics) =>
          prevTopics.filter((id) => !levelTopicIds.includes(id))
        );
        return newLevels;
      } else {
        return [...prev, level];
      }
    });
  };
  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };
  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedDifficulties([]);
    setSelectedTopics([]);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-chess-dark text-white">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Chess Learning <span className="text-yellow-400">Resources</span>
        </h1>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover curated chess learning materials from across the web. Filter
          by type, difficulty, and search to find exactly what you need.
        </p>
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <Input
            placeholder="Search resources, topics, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-900 border-gray-700 text-white"
          />
          <Button
            variant="outline"
            onClick={clearFilters}
            className="whitespace-nowrap"
          >
            Clear All
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
          {/* Skill Level Filters */}
          {difficulties.map((level) => {
            const color = skillLevelMap[level]?.colorScheme.primary || "";
            const isSelected = selectedDifficulties.includes(level);
            return (
              <div key={level} className="flex items-center gap-1">
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => toggleDifficulty(level)}
                  className={`cursor-pointer px-3 py-1 text-base capitalize transition-colors duration-150 ${color} ${
                    isSelected
                      ? "bg-white/10 border-white/40 ring-2 ring-white/30"
                      : "hover:bg-white/5"
                  }`}
                >
                  {level}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-1 h-7 w-7 border border-white text-white bg-transparent hover:bg-white/10 shadow"
                      aria-label={`Filter topics for ${level}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by Topic</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {getTopicsForLevel(level).map((topic) => (
                      <DropdownMenuCheckboxItem
                        key={topic.id}
                        checked={selectedTopics.includes(topic.id)}
                        onCheckedChange={() => toggleTopic(topic.id)}
                      >
                        {topic.title}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
        {/* Resource Cards */}
        <div className="mb-4 text-gray-400 text-sm">
          Showing {filteredResources.length} of {allResources.length} resources
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res, i) => {
            const color =
              skillLevelMap[res.skillLevel]?.colorScheme.primary || "";
            return (
              <Card
                key={res.url + i}
                className="bg-gray-900 border-gray-800 shadow-lg flex flex-col h-full pt-3 pb-6 px-6 animate-slide-up"
                style={{ animationDelay: `${i * 0.005}s` }}
              >
                {/* Resource Title - remove source prefix */}
                <div className="font-semibold text-base md:text-lg mb-1 text-white">
                  {res.title
                    .replace(/^YouTube:\s*/i, "")
                    .replace(/^Chess\.com\s*-\s*/i, "")
                    .replace(/^Lichess\.org\s*-\s*/i, "")
                    .replace(/^Chess Strategy Online\s*-\s*/i, "")
                    .replace(/^Chess Tempo\s*-\s*/i, "")
                    .replace(/^Chessable\s*-\s*/i, "")}
                </div>
                <div className="text-gray-400 text-sm mb-2 flex-1">
                  {res.description}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`capitalize border border-gray-500 rounded-full px-3 py-1 text-xs ${color}`}
                  >
                    {res.skillLevel}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border border-gray-500 rounded-full px-3 py-1 text-xs"
                  >
                    {typeIcons[res.type] || null}
                    {res.type.charAt(0).toUpperCase() + res.type.slice(1)}
                  </Badge>
                </div>
                {/* Topic indicator styled as a badge */}
                <div className="mb-2.5">
                  <span className="inline-block rounded-full border border-gray-500 px-3 py-1 text-xs font-semibold text-white bg-transparent">
                    <span className="font-bold">Topic:</span> {res.topic}
                  </span>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded px-4 py-2 text-center transition-colors duration-150"
                >
                  Access Resource
                </a>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resources;
