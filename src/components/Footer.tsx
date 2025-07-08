import { ExternalLink } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Learning Path": [
      { name: "Beginner Guide", href: "#beginner" },
      { name: "Intermediate Path", href: "#intermediate" },
      { name: "Advanced Study", href: "#advanced" },
      { name: "All Resources", href: "#resources" },
    ],
    "Popular Resources": [
      { name: "Chess.com", href: "https://chess.com", external: true },
      { name: "Lichess", href: "https://lichess.org", external: true },
      { name: "ChessTempo", href: "https://chesstempo.com", external: true },
      { name: "Chessable", href: "https://chessable.com", external: true },
    ],
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
              <span className="text-xl font-bold text-foreground">
                ChessPath
              </span>
            </div>
            <p className="text-foreground/70 text-sm mb-4">
              The complete roadmap for chess improvement. From beginner to
              master, we guide your journey.
            </p>
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
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
