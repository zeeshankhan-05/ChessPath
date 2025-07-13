# ChessPath

ChessPath is a modern, interactive web application designed to guide users through the journey of learning and mastering chess. It provides a structured roadmap, curated resources, and skill-based progression to help players of all levels improve their chess abilities.

## Features

- **Interactive Roadmap:** Visualize your chess learning journey with a clear, step-by-step roadmap.
- **Skill Level Cards:** Explore content tailored to different skill levels, from beginner to advanced.
- **Curated Resources:** Access high-quality chess resources, tutorials, and guides.
- **Quick Start Section:** Get started with chess fundamentals quickly and easily.
- **Responsive Design:** Enjoy a seamless experience across devices, powered by Tailwind CSS.

## Demo

Check out the live app here: [https://chess-path-eta.vercel.app/](https://chess-path-eta.vercel.app/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ChessPath.git
   cd ChessPath
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
ChessPath/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and media
│   ├── components/        # Reusable UI components
│   │   └── ui/            # UI primitives (buttons, cards, etc.)
│   ├── data/              # Chess-related data and content
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Application pages (Home, Roadmap, Resources, etc.)
│   └── App.tsx            # Main app component
├── index.html             # HTML entry point
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please follow the established coding standards and include clear documentation for any new features or changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_ChessPath – Your journey to chess mastery starts here!_
