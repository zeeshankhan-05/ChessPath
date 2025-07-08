import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, BookOpen, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: 'Structured Learning Path',
      description: 'Follow a proven roadmap from beginner to master, with clear milestones and prerequisites.'
    },
    {
      icon: BookOpen,
      title: 'Curated Resources',
      description: 'Access hand-picked learning materials from the best chess educators and platforms worldwide.'
    },
    {
      icon: Users,
      title: 'Community Proven',
      description: 'Resources tested and recommended by thousands of chess players at every skill level.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with our skill-based progression system and time estimates.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Curated Resources' },
    { number: '15+', label: 'Learning Topics' },
    { number: '3', label: 'Skill Levels' },
    { number: '100%', label: 'Free to Use' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-chess-dark to-chess-dark/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About
            <span className="block text-chess-gold">ChessPath</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            ChessPath is the definitive roadmap for chess improvement, designed to guide players from complete beginners 
            to advanced masters. Our carefully curated resources and structured approach ensure you learn efficiently 
            and effectively.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="bg-white/5 border-white/10 p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-chess-gold mb-4">Our Mission</h3>
              <p className="text-foreground/80 text-lg leading-relaxed">
                To democratize chess education by providing a clear, structured learning path that connects players 
                with the best educational resources available. We believe that with the right guidance and resources, 
                anyone can master the royal game.
              </p>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-white/5 border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-chess-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-chess-gold" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-chess-gold mb-2">{stat.number}</div>
              <div className="text-foreground/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">How ChessPath Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-beginner/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-beginner">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Assess Your Level</h4>
              <p className="text-foreground/70 text-sm">Start by identifying your current skill level using our ELO-based system.</p>
            </div>
            <div className="text-center">
              <div className="bg-intermediate/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-intermediate">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Follow the Path</h4>
              <p className="text-foreground/70 text-sm">Work through topics in order, building skills progressively.</p>
            </div>
            <div className="text-center">
              <div className="bg-advanced/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-advanced">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Master the Game</h4>
              <p className="text-foreground/70 text-sm">Advance through all levels to achieve chess mastery.</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center">
          <Card className="bg-white/5 border-white/10 p-6 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 bg-chess-gold/20 text-chess-gold border-chess-gold/30">
              Important Note
            </Badge>
            <p className="text-foreground/70 text-sm">
              ChessPath is a resource directory and learning guide. We curate and organize the best chess educational 
              content from across the web, but we are not affiliated with the resource providers. All external links 
              lead to their respective creators and platforms.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;