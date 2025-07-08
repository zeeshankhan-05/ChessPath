import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-chess-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-chess-gold flex items-center justify-center">
              <span className="text-sm font-bold text-chess-dark">♔</span>
            </div>
            <span className="text-xl font-bold text-foreground">ChessPath</span>
            <Badge variant="secondary" className="bg-chess-gold/20 text-chess-gold">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#roadmap" className="text-foreground/80 hover:text-foreground transition-colors">
              Roadmap
            </a>
            <a href="#resources" className="text-foreground/80 hover:text-foreground transition-colors">
              Resources
            </a>
            <div className="relative group">
              <button className="flex items-center text-foreground/80 hover:text-foreground transition-colors">
                Levels
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-chess-dark border border-white/10 rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#beginner" className="block px-4 py-2 text-beginner hover:bg-beginner-muted transition-colors">
                  Beginner (0-1200)
                </a>
                <a href="#intermediate" className="block px-4 py-2 text-intermediate hover:bg-intermediate-muted transition-colors">
                  Intermediate (1200-1800)
                </a>
                <a href="#advanced" className="block px-4 py-2 text-advanced hover:bg-advanced-muted transition-colors">
                  Advanced (1800+)
                </a>
              </div>
            </div>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-foreground hover:bg-white/10">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-medium">
              Start Learning
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-chess-gold transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#roadmap" className="text-foreground/80 hover:text-foreground transition-colors">
                Roadmap
              </a>
              <a href="#resources" className="text-foreground/80 hover:text-foreground transition-colors">
                Resources
              </a>
              <a href="#beginner" className="text-beginner hover:text-beginner/80 transition-colors pl-4">
                Beginner Level
              </a>
              <a href="#intermediate" className="text-intermediate hover:text-intermediate/80 transition-colors pl-4">
                Intermediate Level
              </a>
              <a href="#advanced" className="text-advanced hover:text-advanced/80 transition-colors pl-4">
                Advanced Level
              </a>
              <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
                About
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent border-white/20 text-foreground hover:bg-white/10">
                  <Search className="h-4 w-4 mr-2" />
                  Search Resources
                </Button>
                <Button className="w-full bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-medium">
                  Start Learning
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;