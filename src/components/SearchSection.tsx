import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { skillLevels } from '@/data/chessData';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    type: string[];
    difficulty: string[];
    free: boolean | null;
  }>({
    type: [],
    difficulty: [],
    free: null
  });

  // Extract all resources from all topics
  const allResources = useMemo(() => {
    const resources: any[] = [];
    skillLevels.forEach(level => {
      level.topics.forEach(topic => {
        topic.resources.forEach(resource => {
          resources.push({
            ...resource,
            topicTitle: topic.title,
            topicId: topic.id,
            skillLevel: level.level
          });
        });
      });
    });
    return resources;
  }, []);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = selectedFilters.type.length === 0 || 
        selectedFilters.type.includes(resource.type);

      // Difficulty filter
      const matchesDifficulty = selectedFilters.difficulty.length === 0 || 
        selectedFilters.difficulty.includes(resource.difficulty);

      // Free filter
      const matchesFree = selectedFilters.free === null || 
        resource.free === selectedFilters.free;

      return matchesSearch && matchesType && matchesDifficulty && matchesFree;
    });
  }, [allResources, searchQuery, selectedFilters]);

  const toggleFilter = (category: 'type' | 'difficulty', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({ type: [], difficulty: [], free: null });
    setSearchQuery('');
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return '📚';
      case 'video': return '🎥';
      case 'website': return '🌐';
      case 'app': return '📱';
      case 'course': return '🎓';
      default: return '📝';
    }
  };

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-chess-dark/95 to-chess-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Chess Learning
            <span className="block text-chess-gold">Resources</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Discover curated chess learning materials from across the web. Filter by type, difficulty, and cost to find exactly what you need.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search resources, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Resource Type Filters */}
            <div className="flex flex-wrap gap-2">
              {['book', 'video', 'website', 'app', 'course'].map(type => (
                <Button
                  key={type}
                  variant={selectedFilters.type.includes(type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter('type', type)}
                  className="capitalize"
                >
                  {getResourceTypeIcon(type)} {type}
                </Button>
              ))}
            </div>

            {/* Difficulty Filters */}
            <div className="flex gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedFilters.difficulty.includes(difficulty) ? difficulty as any : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter('difficulty', difficulty)}
                  className="capitalize"
                >
                  {difficulty}
                </Button>
              ))}
            </div>

            {/* Clear Filters */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-foreground/60 hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-foreground/60">
            Showing {filteredResources.length} of {allResources.length} resources
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Card
              key={`${resource.topicId}-${index}`}
              className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getResourceTypeIcon(resource.type)}</span>
                  <Badge variant="outline" className={`bg-${resource.skillLevel}/20 text-${resource.skillLevel} border-${resource.skillLevel}/30`}>
                    {resource.skillLevel}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {resource.free && (
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      Free
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-chess-gold">
                    {'★'.repeat(Math.floor(resource.rating))}
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
              <p className="text-sm text-foreground/60 mb-3">{resource.description}</p>
              
              <div className="mb-4">
                <Badge variant="outline" className="text-xs bg-white/5 border-white/20">
                  From: {resource.topicTitle}
                </Badge>
              </div>

              <Button
                className="w-full bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-medium"
                onClick={() => window.open(resource.url, '_blank')}
              >
                Access Resource
              </Button>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-foreground/60">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;