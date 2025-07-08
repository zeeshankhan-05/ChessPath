import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Learning Path': [
      { name: 'Beginner Guide', href: '#beginner' },
      { name: 'Intermediate Path', href: '#intermediate' },
      { name: 'Advanced Study', href: '#advanced' },
      { name: 'All Resources', href: '#resources' }
    ],
    'Popular Resources': [
      { name: 'Chess.com', href: 'https://chess.com', external: true },
      { name: 'Lichess', href: 'https://lichess.org', external: true },
      { name: 'ChessTempo', href: 'https://chesstempo.com', external: true },
      { name: 'Chessable', href: 'https://chessable.com', external: true }
    ],
    'Community': [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: 'mailto:hello@chesspath.com', external: true },
      { name: 'Contribute', href: '#contribute' },
      { name: 'Feedback', href: '#feedback' }
    ]
  };

  return (
    <footer className="bg-chess-dark border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-chess-gold flex items-center justify-center">
                <span className="text-sm font-bold text-chess-dark">♔</span>
              </div>
              <span className="text-xl font-bold text-foreground">ChessPath</span>
            </div>
            <p className="text-foreground/70 text-sm mb-4">
              The complete roadmap for chess improvement. From beginner to master, we guide your journey.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-foreground hover:bg-white/10">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-foreground hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-foreground hover:bg-white/10">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-chess-gold transition-colors text-sm flex items-center"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                      {link.external && <ExternalLink className="h-3 w-3 ml-1" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-foreground/70 text-sm mb-4">
              Get notified when we add new resources and features
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-foreground placeholder:text-foreground/50 text-sm"
              />
              <Button className="bg-chess-gold text-chess-dark hover:bg-chess-gold/90 font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm mb-4 md:mb-0">
            © 2024 ChessPath. All rights reserved. Built with ❤️ for the chess community.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#privacy" className="text-foreground/60 hover:text-chess-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-foreground/60 hover:text-chess-gold transition-colors">
              Terms of Service
            </a>
            <a href="#contribute" className="text-foreground/60 hover:text-chess-gold transition-colors">
              Contribute
            </a>
          </div>
        </div>

        {/* Attribution */}
        <div className="border-t border-white/10 pt-4 mt-4 text-center">
          <p className="text-foreground/50 text-xs">
            ChessPath is a resource directory. We curate and organize chess educational content from across the web. 
            All external resources belong to their respective creators and platforms.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;