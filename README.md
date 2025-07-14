# ChessPath

ChessPath is a modern, interactive web application designed to guide users through the journey of learning and mastering chess. It provides a structured roadmap, curated resources, and skill-based progression to help players of all levels improve their chess abilities.

## Features

- **Tech Stack:** Built with React and TypeScript for robust, type-safe development. Uses Vite for lightning-fast builds and hot module reloading, and Tailwind CSS for utility-first, responsive styling. UI components are crafted with shadcn/ui and Radix UI for accessibility and consistency. Deployed seamlessly on Vercel for global performance and reliability.
- **Interactive Roadmap:** Visualize your chess learning journey with a clear, step-by-step roadmap powered by dynamic React components.
- **Skill Level Cards:** Explore content tailored to different skill levels, from beginner to advanced, with visually distinct cards and smooth transitions.
- **Curated Resources:** Access high-quality chess resources, tutorials, and guides, organized for easy discovery and continuous learning.
- **Quick Start Section:** Get started with chess fundamentals quickly and easily, leveraging intuitive UI and guided content.
- **Responsive Design:** Enjoy a seamless experience across devices, with adaptive layouts and mobile-friendly interactions enabled by Tailwind CSS and Radix UI primitives.
- **Performance & Accessibility:** Optimized for speed, accessibility, and best practices, ensuring a smooth and inclusive user experience.
- **Vercel Deployment:** Hosted and deployed on Vercel, providing fast, secure, and reliable access worldwide with zero-config continuous deployment.

## Demo

Check out the live app here: [https://chess-path-eta.vercel.app/](https://chess-path-eta.vercel.app/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zeeshankhan-05/ChessPath.git
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
   Visit [http://localhost:8080](http://localhost:8080) to view the app.

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

I'm always looking for quality resources to add to ChessPath. Feel free to create pull requests or contact me with your suggestions!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_ChessPath – Your journey to chess mastery starts here!_
