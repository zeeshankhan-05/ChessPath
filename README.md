# Chess Roadmap

A modern, interactive web application designed to help chess players progress from beginner to advanced levels through structured learning paths.

![Chess Roadmap Logo](assets/logo.png)

## Features

- **Interactive Learning Path**: Follow a carefully structured progression from basic concepts to advanced chess strategies
- **Skill-Based Levels**: Content organized into Beginner (800-1200 ELO), Intermediate (1200-1800 ELO), and Advanced (1800+ ELO) levels
- **Comprehensive Lesson Library**: Access a wide range of chess lessons covering:
  - Opening principles
  - Tactical patterns
  - Strategic concepts
  - Endgame theory
  - Position analysis
- **Progress Tracking**: Monitor your improvement with built-in progress tracking for each topic
- **Filtered Learning**: Sort lessons by difficulty level and topic to customize your learning experience

## Technology Stack

- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox, and CSS Variables)
- JavaScript (Vanilla)
- SVG for interactive diagrams

## Project Structure

```
ChessRoadmap/
├── index.html              # Main landing page
├── styles/
│   ├── styles.css         # Main stylesheet
│   ├── chess-theme.css    # Chess-specific styling
│   └── roadmap.css        # Roadmap page styling
├── scripts/
│   ├── script.js          # Main JavaScript file
│   ├── lesson-plan.js     # Lesson functionality
│   └── roadmap-functions.js # Roadmap interactivity
└── lessons/
    ├── chess-lessons.html # Lesson library page
    └── lesson-roadmap.html # Interactive roadmap page
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ChessRoadmap.git
   ```

2. Open the project in your preferred code editor

3. Launch the website using a local server:

   ```bash
   # Using Python 3
   python -m http.server

   # Using Node.js
   npx serve
   ```

4. Visit `http://localhost:8000` in your web browser

## Development

### CSS Architecture

- Uses CSS custom properties (variables) for consistent theming
- Responsive design with mobile-first approach
- Modular CSS structure with separate files for different components

### JavaScript Components

- Modular JavaScript files for different functionalities
- Progress tracking system
- Interactive roadmap with SVG connections
- Dynamic lesson filtering

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Chess piece icons from Unicode chess symbols
- Gradient patterns inspired by modern web design trends
- Interactive learning path concept based on proven educational methodologies

## Contact

Zeeshan Khan - [@zeeshankhan-05](https://www.linkedin.com/in/zeeshankhan05/)

Project Link: [https://github.com/zeeshankhan-05/ChessRoadmap](https://github.com/zeeshankhan-05/ChessRoadmap)
