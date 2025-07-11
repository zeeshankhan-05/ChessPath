import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-chess-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="h-12 w-12 flex items-center justify-center rounded bg-chess-gold transition-transform group-hover:scale-105">
              <span className="text-5xl font-bold text-chess-dark flex items-center justify-center w-full h-full -mt-2">
                ♔
              </span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              ChessPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/roadmap"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Roadmap
            </Link>
            <Link
              to="/resources"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-chess-gold transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/roadmap"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Roadmap
              </Link>
              <Link
                to="/resources"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
