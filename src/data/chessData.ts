// Chess learning roadmap data with curated resources

export const beginnerTopics = [
  {
    id: 'chess-basics',
    title: 'Chess Basics',
    description: 'Learn how pieces move, rules, and notation',
    timeEstimate: '1-2 weeks',
    difficulty: 'Beginner',
    prerequisites: [],
    skills: ['Piece movement', 'Special rules', 'Chess notation', 'Board setup'],
    resources: [
      {
        title: 'Chess.com Learn Chess',
        description: 'Interactive lessons covering all chess basics with visual demonstrations',
        url: 'https://www.chess.com/learn-how-to-play-chess',
        type: 'website' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Bobby Fischer Teaches Chess',
        description: 'Classic chess book perfect for absolute beginners',
        url: 'https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153',
        type: 'book' as const,
        difficulty: 'beginner' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Lichess Learn',
        description: 'Free interactive chess tutorial covering all basics',
        url: 'https://lichess.org/learn',
        type: 'website' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Saint Louis Chess Club - Chess Basics',
        description: 'Comprehensive video series on chess fundamentals',
        url: 'https://www.youtube.com/playlist?list=PLVWaFpMwtaGiBxi79IUqnqn67WF5g5PR4',
        type: 'video' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 4
      }
    ]
  },
  {
    id: 'basic-tactics',
    title: 'Basic Tactics',
    description: 'Master fundamental tactical patterns',
    timeEstimate: '2-3 weeks',
    difficulty: 'Beginner',
    prerequisites: ['Basic piece movement', 'Chess notation'],
    skills: ['Pin', 'Fork', 'Skewer', 'Discovery', 'Deflection'],
    resources: [
      {
        title: 'ChessTempo Tactics',
        description: 'Thousands of tactical puzzles with adaptive difficulty',
        url: 'https://chesstempo.com/',
        type: 'website' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Tactics Time! by Tim Brennan',
        description: 'Collection of 1001 chess tactics for beginners',
        url: 'https://www.amazon.com/Tactics-Time-Chess-Tactics-Beginners/dp/1477624848',
        type: 'book' as const,
        difficulty: 'beginner' as const,
        free: false,
        rating: 4
      },
      {
        title: 'Chess.com Tactics Trainer',
        description: 'Daily tactical puzzles with explanations',
        url: 'https://www.chess.com/puzzles',
        type: 'website' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 5
      },
      {
        title: 'GothamChess - Beginner Tactics',
        description: 'Popular YouTube series on basic tactical patterns',
        url: 'https://www.youtube.com/playlist?list=PLBRObSmbZluTUg3UJCGXeEI3LBKtJavLu',
        type: 'video' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 4
      }
    ]
  },
  {
    id: 'basic-checkmates',
    title: 'Basic Checkmates',
    description: 'Learn essential mating patterns',
    timeEstimate: '1-2 weeks',
    difficulty: 'Beginner',
    prerequisites: ['Chess basics', 'Basic tactics'],
    skills: ['Queen mate', 'Rook mate', 'Two rooks mate', 'Back rank mate'],
    resources: [
      {
        title: 'Lichess Practice - Basic Checkmates',
        description: 'Interactive practice for essential mating patterns',
        url: 'https://lichess.org/practice',
        type: 'website' as const,
        difficulty: 'beginner' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Back to Basics: Checkmates by Dan Heisman',
        description: 'Comprehensive guide to basic mating patterns',
        url: 'https://www.amazon.com/Back-Basics-Checkmates-Dan-Heisman/dp/0979148324',
        type: 'book' as const,
        difficulty: 'beginner' as const,
        free: false,
        rating: 4
      },
      {
        title: 'Chess King Learn',
        description: 'Interactive chess training app with checkmate courses',
        url: 'https://www.chess-king.com/',
        type: 'app' as const,
        difficulty: 'beginner' as const,
        free: false,
        rating: 4
      }
    ]
  }
];

export const intermediateTopics = [
  {
    id: 'opening-principles',
    title: 'Opening Principles',
    description: 'Develop your opening repertoire',
    timeEstimate: '3-4 weeks',
    difficulty: 'Intermediate',
    prerequisites: ['Chess basics', 'Basic tactics'],
    skills: ['Development', 'Center control', 'King safety', 'Repertoire building'],
    resources: [
      {
        title: 'Logical Chess Move by Move by Irving Chernev',
        description: 'Classic book explaining chess principles through complete games',
        url: 'https://www.amazon.com/Logical-Chess-Irving-Chernev/dp/0486205121',
        type: 'book' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Chess.com Opening Explorer',
        description: 'Database of opening moves with statistics and theory',
        url: 'https://www.chess.com/openings',
        type: 'website' as const,
        difficulty: 'intermediate' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Chessable Opening Courses',
        description: 'Interactive spaced repetition learning for openings',
        url: 'https://www.chessable.com/',
        type: 'course' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Saint Louis Chess Club - Opening Principles',
        description: 'Video lectures on opening theory and principles',
        url: 'https://www.youtube.com/c/SaintLouisChessClub',
        type: 'video' as const,
        difficulty: 'intermediate' as const,
        free: true,
        rating: 4
      }
    ]
  },
  {
    id: 'middlegame-strategy',
    title: 'Middlegame Strategy',
    description: 'Master positional play and planning',
    timeEstimate: '4-6 weeks',
    difficulty: 'Intermediate',
    prerequisites: ['Opening principles', 'Basic tactics'],
    skills: ['Pawn structures', 'Piece activity', 'Weaknesses', 'Planning'],
    resources: [
      {
        title: 'The Amateur\'s Mind by Jeremy Silman',
        description: 'Essential guide to middlegame thinking and planning',
        url: 'https://www.amazon.com/Amateurs-Mind-Turning-Chess-Misconceptions/dp/1890085022',
        type: 'book' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 5
      },
      {
        title: 'My System by Aaron Nimzowitsch',
        description: 'Classic work on positional chess principles',
        url: 'https://www.amazon.com/My-System-Aaron-Nimzowitsch/dp/4871878023',
        type: 'book' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 5
      },
      {
        title: 'IM John Bartholomew - Chess Fundamentals',
        description: 'YouTube series on middlegame concepts and strategy',
        url: 'https://www.youtube.com/c/JohnBartholomewChess',
        type: 'video' as const,
        difficulty: 'intermediate' as const,
        free: true,
        rating: 5
      }
    ]
  },
  {
    id: 'advanced-tactics',
    title: 'Advanced Tactics',
    description: 'Complex combinations and calculations',
    timeEstimate: '3-4 weeks',
    difficulty: 'Intermediate',
    prerequisites: ['Basic tactics', 'Pattern recognition'],
    skills: ['Complex combinations', 'Calculation', 'Sacrifices', 'Advanced patterns'],
    resources: [
      {
        title: 'Combination Challenge by Lou Hays',
        description: '300 advanced tactical positions for serious improvement',
        url: 'https://www.amazon.com/Combination-Challenge-Lou-Hays/dp/1936490692',
        type: 'book' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 4
      },
      {
        title: 'Chess.com Advanced Tactics',
        description: 'Higher difficulty tactical puzzles with detailed solutions',
        url: 'https://www.chess.com/puzzles',
        type: 'website' as const,
        difficulty: 'intermediate' as const,
        free: true,
        rating: 5
      },
      {
        title: 'Tactics Time 2 by Tim Brennan',
        description: 'Intermediate to advanced tactical patterns',
        url: 'https://www.amazon.com/Tactics-Time-Intermediate-Advanced-Problems/dp/1484817656',
        type: 'book' as const,
        difficulty: 'intermediate' as const,
        free: false,
        rating: 4
      }
    ]
  }
];

export const advancedTopics = [
  {
    id: 'strategic-concepts',
    title: 'Strategic Concepts',
    description: 'Deep positional understanding',
    timeEstimate: '6-8 weeks',
    difficulty: 'Advanced',
    prerequisites: ['Middlegame strategy', 'Pawn structures'],
    skills: ['Prophylaxis', 'Piece coordination', 'Weak squares', 'Dynamic factors'],
    resources: [
      {
        title: 'Positional Decision Making by Boris Gelfand',
        description: 'World-class insights into high-level positional play',
        url: 'https://www.amazon.com/Positional-Decision-Making-Chess-Gelfand/dp/1784830003',
        type: 'book' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      },
      {
        title: 'How to Reassess Your Chess by Jeremy Silman',
        description: 'Advanced guide to positional evaluation and planning',
        url: 'https://www.amazon.com/How-Reassess-Your-Chess-4th/dp/1890085138',
        type: 'book' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      },
      {
        title: 'ChessBase Master Class Series',
        description: 'Video courses by world champions and top GMs',
        url: 'https://shop.chessbase.com/',
        type: 'course' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      }
    ]
  },
  {
    id: 'complex-endgames',
    title: 'Complex Endgames',
    description: 'Master theoretical endgame positions',
    timeEstimate: '8-10 weeks',
    difficulty: 'Advanced',
    prerequisites: ['Basic endgames', 'Strategic concepts'],
    skills: ['Rook endgames', 'Queen endgames', 'Minor piece endgames', 'Pawn endgames'],
    resources: [
      {
        title: 'Dvoretsky\'s Endgame Manual by Mark Dvoretsky',
        description: 'The definitive guide to practical endgames',
        url: 'https://www.amazon.com/Dvoretskys-Endgame-Manual-Mark-Dvoretsky/dp/1936490110',
        type: 'book' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Practical Chess Endings by Paul Keres',
        description: 'Classic work on essential endgame knowledge',
        url: 'https://www.amazon.com/Practical-Chess-Endings-Paul-Keres/dp/0713484394',
        type: 'book' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Lichess Endgame Studies',
        description: 'Practice endgame positions with tablebase support',
        url: 'https://lichess.org/practice',
        type: 'website' as const,
        difficulty: 'advanced' as const,
        free: true,
        rating: 4
      }
    ]
  },
  {
    id: 'opening-theory',
    title: 'Advanced Opening Theory',
    description: 'Deep preparation and theoretical knowledge',
    timeEstimate: 'Ongoing',
    difficulty: 'Advanced',
    prerequisites: ['Opening principles', 'Strategic concepts'],
    skills: ['Theoretical lines', 'Novelties', 'Preparation', 'Transpositions'],
    resources: [
      {
        title: 'Modern Chess Openings (MCO-15)',
        description: 'Comprehensive opening reference and theory',
        url: 'https://www.amazon.com/Modern-Chess-Openings-15th/dp/0812936655',
        type: 'book' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 4
      },
      {
        title: 'ChessBase Mega Database',
        description: 'Complete database of chess games for opening research',
        url: 'https://shop.chessbase.com/en/products/mega_database_2024',
        type: 'website' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
      },
      {
        title: 'Chess24 Masters Series',
        description: 'Opening courses by top grandmasters',
        url: 'https://chess24.com/',
        type: 'course' as const,
        difficulty: 'advanced' as const,
        free: false,
        rating: 5
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
    description: 'Develop strategic understanding and tactical sharpness',
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
    description: 'Achieve mastery through deep study and theoretical knowledge',
    topics: advancedTopics,
    colorScheme: {
      primary: 'text-advanced',
      background: 'bg-advanced-muted',
      border: 'border-advanced/30',
      shadow: 'shadow-[0_10px_30px_-10px_hsl(var(--advanced)/0.3)]'
    }
  }
];