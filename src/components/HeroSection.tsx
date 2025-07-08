import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star, Users, BookOpen, Trophy } from 'lucide-react';
import heroImage from '@/assets/chess-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(33, 41, 60, 0.9), rgba(33, 41, 60, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Chess pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent 75%),
            linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-chess-gold/20 text-chess-gold border border-chess-gold/30">
            ✨ Complete Chess Learning System
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Chess Mastery
            <span className="block text-chess-gold">Roadmap</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your complete guide from beginner to master. Follow our structured learning path with curated resources, 
            practice recommendations, and skill assessments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-semibold text-lg px-8 py-6 group"
            >
              Start Your Chess Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="bg-transparent border-white/20 text-foreground hover:bg-white/10 font-semibold text-lg px-8 py-6"
            >
              Take Skill Assessment
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/5 backdrop-blur border-white/10 p-6 text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-full bg-beginner/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-beginner" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-foreground/70">Curated Resources</div>
            </Card>

            <Card className="bg-white/5 backdrop-blur border-white/10 p-6 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-full bg-intermediate/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-intermediate" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-foreground/70">Active Learners</div>
            </Card>

            <Card className="bg-white/5 backdrop-blur border-white/10 p-6 text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-full bg-advanced/20 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-advanced" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-foreground/70">Skill Levels</div>
            </Card>

            <Card className="bg-white/5 backdrop-blur border-white/10 p-6 text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center mb-2">
                <div className="h-10 w-10 rounded-full bg-chess-gold/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-chess-gold" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-sm text-foreground/70">Average Rating</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating chess pieces */}
      <div className="absolute top-20 left-10 text-6xl text-white/10 animate-float">♖</div>
      <div className="absolute top-40 right-20 text-4xl text-white/10 animate-float" style={{ animationDelay: '1s' }}>♗</div>
      <div className="absolute bottom-40 left-20 text-5xl text-white/10 animate-float" style={{ animationDelay: '2s' }}>♘</div>
      <div className="absolute bottom-20 right-10 text-3xl text-white/10 animate-float" style={{ animationDelay: '3s' }}>♙</div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;