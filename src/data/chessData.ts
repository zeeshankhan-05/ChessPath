export const beginnerTopics = [
  {
    id: 'rules-piece-knowledge',
    title: 'Rules & Piece Knowledge',
    description: 'Learn legal moves, castling, en passant, promotion, piece value, coordination, and basic checkmates.',
    timeEstimate: '1-2 weeks',
    difficulty: 'Beginner',
    skills: [
      'Legal moves',
      'Castling',
      'En passant',
      'Promotion',
      'Piece value',
      'Piece coordination',
      'Basic checkmates (K+Q, K+R)'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Chess.com Learn Chess',
        description: 'Interactive lessons covering all chess basics with visual demonstrations',
        url: 'https://www.chess.com/learn-how-to-play-chess',
        type: 'website',
        difficulty: 'Beginner',
      },
      {
        title: 'Lichess Learn',
        description: 'Free interactive chess tutorial covering all basics',
        url: 'https://lichess.org/learn',
        type: 'website',
        difficulty: 'Beginner',
      },
      {
        title: 'Saint Louis Chess Club - Chess Basics',
        description: 'Comprehensive video series on chess fundamentals',
        url: 'https://www.youtube.com/playlist?list=PLVWaFpMwtaGiBxi79IUqnqn67WF5g5PR4',
        type: 'video',
        difficulty: 'Beginner',
      }
    ]
  },
  {
    id: 'opening-principles',
    title: 'Opening Principles',
    description: 'Control the center, develop pieces, castle early, and avoid common opening mistakes.',
    timeEstimate: '1 week',
    difficulty: 'Beginner',
    skills: [
      'Center control',
      'Piece development',
      'King safety',
      'Avoiding early queen/edge pawns'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Chess.com Opening Principles',
        description: 'Guide to opening principles and common mistakes',
        url: 'https://www.chess.com/article/view/the-principles-of-the-opening',
        type: 'website',
        difficulty: 'Beginner',
      }
    ]
  },
  {
    id: 'tactical-training',
    title: 'Tactical Training (Daily)',
    description: 'Practice tactics like hanging pieces, forks, pins, skewers, double attacks, and discovered checks.',
    timeEstimate: 'Ongoing',
    difficulty: 'Beginner',
    skills: [
      'Hanging pieces',
      'Forks',
      'Pins',
      'Skewers',
      'Double attacks',
      'Discovered checks'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Lichess Tactics Trainer',
        description: 'Practice tactics with puzzles and explanations',
        url: 'https://lichess.org/training',
        type: 'website',
        difficulty: 'Beginner',
      },
      {
        title: 'Chess.com Puzzles',
        description: 'Daily tactical puzzles with explanations',
        url: 'https://www.chess.com/puzzles',
        type: 'website',
        difficulty: 'Beginner',
      }
    ]
  },
  {
    id: 'basic-endgames',
    title: 'Basic Endgames',
    description: 'Learn king and pawn vs king, king activity, opposition, and basic checkmate patterns.',
    timeEstimate: '1 week',
    difficulty: 'Beginner',
    skills: [
      'King and pawn vs king',
      'King activity',
      'Opposition',
      'Ladder mate',
      'Back rank mate'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Lichess Practice - Basic Endgames',
        description: 'Interactive practice for essential endgame patterns',
        url: 'https://lichess.org/practice',
        type: 'website',
        difficulty: 'Beginner',
      }
    ]
  },
  {
    id: 'thinking-process',
    title: 'Thinking Process',
    description: 'Develop a disciplined thinking process to avoid blunders and spot threats.',
    timeEstimate: 'Ongoing',
    difficulty: 'Beginner',
    skills: [
      'Blunder check',
      'Threat recognition',
      'Checks, captures, threats',
      'Avoiding one-move blunders'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Chess.com - How to Avoid Blunders',
        description: 'Tips and exercises to avoid blunders and improve your thinking process',
        url: 'https://www.chess.com/article/view/how-to-avoid-blunders',
        type: 'website',
        difficulty: 'Beginner',
      }
    ]
  },
  {
    id: 'tournament-essentials',
    title: 'Tournament Essentials',
    description: 'Coming soon: Learn the basics of playing in tournaments, etiquette, and rules.',
    timeEstimate: 'TBD',
    difficulty: 'Beginner',
    skills: [],
    prerequisites: [],
    resources: []
  }
];

export const intermediateTopics = [
  {
    id: 'opening-repertoire',
    title: 'Opening Repertoire',
    description: 'Learn 1–2 openings as White and Black, understand mainlines, traps, and plans.',
    timeEstimate: '2-3 weeks',
    difficulty: 'Intermediate',
    skills: [
      'Opening mainlines',
      'Traps',
      'Opening plans',
      'Repertoire building'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Chess.com Opening Explorer',
        description: 'Database of opening moves with statistics and theory',
        url: 'https://www.chess.com/openings',
        type: 'website',
        difficulty: 'Intermediate',
      }
    ]
  },
  {
    id: 'intermediate-tactics',
    title: 'Intermediate Tactics',
    description: 'Practice overloading, deflection, attraction, zwischenzug, and mating nets.',
    timeEstimate: '2-3 weeks',
    difficulty: 'Intermediate',
    skills: [
      'Overloading',
      'Deflection',
      'Attraction',
      'Zwischenzug',
      'Mating nets',
      '3–5 move calculation'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'ChessTempo Tactics',
        description: 'Thousands of tactical puzzles with adaptive difficulty',
        url: 'https://chesstempo.com/',
        type: 'website',
        difficulty: 'Intermediate',
      }
    ]
  },
  {
    id: 'strategic-concepts',
    title: 'Strategic Concepts',
    description: 'Learn pawn structures, outposts, open files, and trading pieces based on position.',
    timeEstimate: '3-4 weeks',
    difficulty: 'Intermediate',
    skills: [
      'Pawn structure',
      'Outposts',
      'Open files',
      'Trading pieces',
      'Strong/weak squares'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'IM John Bartholomew - Chess Fundamentals',
        description: 'YouTube series on middlegame concepts and strategy',
        url: 'https://www.youtube.com/c/JohnBartholomewChess',
        type: 'video',
        difficulty: 'Intermediate',
      }
    ]
  },
  {
    id: 'positional-play',
    title: 'Positional Play',
    description: 'Plan around weaknesses, improve worst-placed piece, prophylactic moves, and recognize when to attack.',
    timeEstimate: '2-3 weeks',
    difficulty: 'Intermediate',
    skills: [
      'Planning',
      'Prophylaxis',
      'Piece improvement',
      'Attack vs consolidate'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Hanging Pawns - Positional Play',
        description: 'YouTube channel focused on positional chess concepts',
        url: 'https://www.youtube.com/c/HangingPawns',
        type: 'video',
        difficulty: 'Intermediate',
      }
    ]
  },
  {
    id: 'endgames-that-win',
    title: 'Endgames that Win Games',
    description: 'Learn Lucena and Philidor positions, opposition, triangulation, and practical king and pawn races.',
    timeEstimate: '2-3 weeks',
    difficulty: 'Intermediate',
    skills: [
      'Lucena position',
      'Philidor position',
      'Opposition',
      'Triangulation',
      'King and pawn races',
      'Converting small advantages'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Lichess Endgame Studies',
        description: 'Practice endgame positions with tablebase support',
        url: 'https://lichess.org/practice',
        type: 'website',
        difficulty: 'Intermediate',
      }
    ]
  }
];

export const advancedTopics = [
  {
    id: 'advanced-opening-prep',
    title: 'Advanced Opening Prep',
    description: 'Prepare against specific lines, know transpositions, analyze your games, and use engines wisely.',
    timeEstimate: 'Ongoing',
    difficulty: 'Advanced',
    skills: [
      'Line preparation',
      'Transpositions',
      'Game analysis',
      'Engine use'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'ChessBase Mega Database',
        description: 'Complete database of chess games for opening research',
        url: 'https://shop.chessbase.com/en/products/mega_database_2024',
        type: 'website',
        difficulty: 'Advanced',
      }
    ]
  },
  {
    id: 'strategic-depth',
    title: 'Strategic Depth',
    description: 'Long-term planning, deep pawn break understanding, dynamic vs static advantages, and counterplay.',
    timeEstimate: '3-4 weeks',
    difficulty: 'Advanced',
    skills: [
      'Long-term planning',
      'Pawn breaks',
      'Dynamic/static advantages',
      'Counterplay'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'ChessNetwork - Advanced Strategy',
        description: 'YouTube playlist on advanced chess strategy and planning',
        url: 'https://www.youtube.com/user/ChessNetwork',
        type: 'video',
        difficulty: 'Advanced',
      }
    ]
  },
  {
    id: 'calculation-visualization',
    title: 'Calculation & Visualization',
    description: 'Train 4–6 move calculations, blindfold puzzles, and candidate move trees.',
    timeEstimate: 'Ongoing',
    difficulty: 'Advanced',
    skills: [
      'Deep calculation',
      'Visualization',
      'Candidate moves',
      'Forcing vs quiet moves'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Chess.com Calculation Training',
        description: 'Advanced calculation puzzles and visualization exercises',
        url: 'https://www.chess.com/puzzles',
        type: 'website',
        difficulty: 'Advanced',
      }
    ]
  },
  {
    id: 'advanced-tactics-sacrifices',
    title: 'Advanced Tactics & Sacrifices',
    description: 'Learn exchange sacrifices, Greek gift, clearance, interference, and complex attacking schemes.',
    timeEstimate: '3-4 weeks',
    difficulty: 'Advanced',
    skills: [
      'Exchange sacrifices',
      'Greek gift',
      'Clearance',
      'Interference',
      'Positional sacrifices',
      'King hunts'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Hanging Pawns - Advanced Tactics',
        description: 'YouTube channel focused on advanced tactics and sacrifices',
        url: 'https://www.youtube.com/c/HangingPawns',
        type: 'video',
        difficulty: 'Advanced',
      }
    ]
  },
  {
    id: 'high-level-endgames',
    title: 'High-Level Endgames',
    description: 'Master complex endgames: rook + 2 pawns vs rook, Vancura, bishop vs knight, fortresses, and queen endgames.',
    timeEstimate: '3-4 weeks',
    difficulty: 'Advanced',
    skills: [
      'Rook + 2 pawns vs rook',
      'Vancura position',
      'Bishop vs knight',
      'Fortresses',
      'Queen endgames'
    ],
    prerequisites: [],
    resources: [
      {
        title: 'Lichess Endgame Studies',
        description: 'Practice high-level endgame positions with tablebase support',
        url: 'https://lichess.org/practice',
        type: 'website',
        difficulty: 'Advanced',
      }
    ]
  }
];

export const skillLevels = [
  {
    level: 'beginner' as const,
    title: 'Beginner Level',
    eloRange: '0-1200 ELO',
    description: 'Master the fundamentals and build a solid foundation',
    topics: beginnerTopics,
    colorScheme: {
      primary: 'text-beginner',
      background: 'bg-beginner-muted',
      border: 'border-beginner/30',
      shadow: 'shadow-[0_10px_30px_-10px_hsl(var(--beginner)/0.3)]'
    }
  },
  {
    level: 'intermediate' as const,
    title: 'Intermediate Level',
    eloRange: '1200-1800 ELO',
    description: 'Develop strategic understanding and tactical aptitude',
    topics: intermediateTopics,
    colorScheme: {
      primary: 'text-intermediate',
      background: 'bg-intermediate-muted',
      border: 'border-intermediate/30',
      shadow: 'shadow-[0_10px_30px_-10px_hsl(var(--intermediate)/0.3)]'
    }
  },
  {
    level: 'advanced' as const,
    title: 'Advanced Level',
    eloRange: '1800+ ELO',
    description: 'Achieve mastery through theoretical knowledge',
    topics: advancedTopics,
    colorScheme: {
      primary: 'text-advanced',
      background: 'bg-advanced-muted',
      border: 'border-advanced/30',
      shadow: 'shadow-[0_10px_30px_-10px_hsl(var(--advanced)/0.3)]'
    }
  }
];