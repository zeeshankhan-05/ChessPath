document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node');

    const nodeInfo = {
        fundamentals: {
            title: "Chess Fundamentals",
            description: "The foundation of chess knowledge. Learn how the game works and the basic concepts that will guide your chess journey.",
            elo: "0-800",
            content: [
                "Board setup and piece movement",
                "Basic rules (check, checkmate, stalemate)",
                "Piece values and basic principles",
                "Capturing and special moves (castling, en passant)",
                "Setting up a chess board correctly"
            ],
            resources: [
                "Chess.com's How to Play",
                "Lichess Learn Chess",
                "Chess for Beginners by Magnus Carlsen"
            ]
        },
        rules: {
            title: "Rules & Setup",
            description: "Master the complete rules of chess including special moves and tournament regulations.",
            elo: "0-800",
            content: [
                "Special moves in detail (castling, promotion, en passant)",
                "Draw rules (50-move rule, 3-fold repetition)",
                "Tournament rules and etiquette",
                "Chess clocks and time controls",
                "Chess variants (bughouse, crazyhouse, etc.)"
            ],
            resources: [
                "FIDE Rules of Chess",
                "Chess.com's Articles on Rules",
                "Bobby Fischer Teaches Chess"
            ]
        },
        tactics: {
            title: "Basic Tactics",
            description: "Learn fundamental tactical patterns that form the building blocks of chess combinations.",
            elo: "800-1200",
            content: [
                "Forks and double attacks",
                "Pins and skewers",
                "Discovered attacks",
                "Basic checkmate patterns (back rank, scholar's)",
                "Simple sacrifices for material gain"
            ],
            resources: [
                "Chess Tactics for Beginners",
                "Lichess Training Puzzles",
                "Chess.com's Tactics Trainer"
            ]
        },
        notation: {
            title: "Chess Notation",
            description: "Learn to read and write chess moves in standard algebraic notation.",
            elo: "800-1200",
            content: [
                "Algebraic notation basics",
                "Reading and writing moves",
                "Annotation symbols (!, ?, ±)",
                "Scoresheets and game recording",
                "Digital notation and PGN format"
            ],
            resources: [
                "Chess Notation Guide",
                "Annotated Games Collection",
                "ChessBase tutorials"
            ]
        },
        openings: {
            title: "Opening Principles",
            description: "Understand the fundamental principles that guide the first phase of the game.",
            elo: "800-1400",
            content: [
                "Control the center",
                "Develop pieces efficiently",
                "King safety and castling",
                "Pawn structure basics",
                "Common opening mistakes"
            ],
            resources: [
                "Logical Chess: Move by Move",
                "Chess Openings for Beginners",
                "John Bartholomew's Opening Videos"
            ]
        },
        endgames: {
            title: "Basic Endgames",
            description: "Master the fundamental endgame techniques that every chess player must know.",
            elo: "1000-1400",
            content: [
                "King and pawn vs king",
                "Queen vs pawn endgames",
                "Rook endgames fundamentals",
                "Opposition and zugzwang",
                "Basic checkmating patterns (K+Q vs K, K+R vs K)"
            ],
            resources: [
                "Silman's Complete Endgame Course",
                "100 Endgames You Must Know",
                "ChessTempo Endgame Training"
            ]
        },
        patterns: {
            title: "Pattern Recognition",
            description: "Develop your ability to recognize common patterns and motifs across all phases of the game.",
            elo: "1200-1600",
            content: [
                "Tactical patterns in different openings",
                "Common mating patterns",
                "Recurring strategic themes",
                "Piece coordination patterns",
                "Pattern-based calculation"
            ],
            resources: [
                "The Woodpecker Method",
                "Chess Pattern Recognition",
                "Puzzle Rush on Chess.com"
            ]
        },
        strategies: {
            title: "Strategic Concepts",
            description: "Learn the strategic elements that guide long-term planning in chess.",
            elo: "1400-1800",
            content: [
                "Pawn structure strategy",
                "Bishop vs Knight imbalances",
                "Open vs closed positions",
                "Creating and exploiting weaknesses",
                "Piece activity and coordination"
            ],
            resources: [
                "My System by Aron Nimzowitsch",
                "The Reassess Your Chess Workbook",
                "Chess Structures: A Grandmaster Guide"
            ]
        },
        calculation: {
            title: "Calculation",
            description: "Sharpen your ability to visualize and evaluate variations accurately.",
            elo: "1400-1800",
            content: [
                "Calculation methodology",
                "Candidate moves selection",
                "Visualization techniques",
                "Evaluation of positions",
                "Blunder checking"
            ],
            resources: [
                "Perfect Your Chess",
                "Calculate Like a Grandmaster",
                "Rapid Chess Improvement"
            ]
        },
        "advanced-openings": {
            title: "Opening Repertoire",
            description: "Build a personalized opening repertoire for both white and black.",
            elo: "1600-2000",
            content: [
                "Personalized white repertoire",
                "Responses as black to 1.e4 and 1.d4",
                "Opening transpositions",
                "Move order subtleties",
                "Opening preparation methodology"
            ],
            resources: [
                "Lifetime Repertoires on Chessable",
                "Opening Encyclopaedia",
                "GM opening preparation videos"
            ]
        },
        middlegame: {
            title: "Middlegame Plans",
            description: "Develop strategic planning skills and understanding of typical middlegame positions.",
            elo: "1600-2000",
            content: [
                "Planning in different pawn structures",
                "Attacking the king",
                "Defensive techniques",
                "Improving piece placement",
                "Transition to favorable endgames"
            ],
            resources: [
                "The Middlegame in Chess",
                "Mastering Chess Strategy",
                "Positional Chess Handbook"
            ]
        },
        "complex-endgames": {
            title: "Complex Endgames",
            description: "Master advanced endgame techniques and theoretical positions.",
            elo: "1600-2000",
            content: [
                "Complex rook endgames",
                "Bishop endgames",
                "Knight endgames",
                "Queen vs minor pieces",
                "Multi-piece endgames"
            ],
            resources: [
                "Dvoretsky's Endgame Manual",
                "Endgame Challenge by Nunn",
                "ChessTempo Endgame Studies"
            ]
        },
        "positional-play": {
            title: "Positional Play",
            description: "Develop deep positional understanding and prophylactic thinking.",
            elo: "1800-2200",
            content: [
                "Prophylactic thinking",
                "Long-term planning",
                "Pawn structure mastery",
                "Piece maneuvering in closed positions",
                "Strategic sacrifices"
            ],
            resources: [
                "Positional Decision Making in Chess",
                "Judgment and Planning in Chess",
                "Strategic Play by McDonald"
            ]
        },
        attack: {
            title: "Attack & Defense",
            description: "Master the art of attacking and defending in complex positions.",
            elo: "1800-2200",
            content: [
                "Attacking the castled king",
                "Piece sacrifices for attack",
                "Defensive resources",
                "Counterattacking techniques",
                "Evaluating attacks"
            ],
            resources: [
                "Art of Attack in Chess",
                "Practical Chess Defence",
                "Fire on Board (Shirov)"
            ]
        },
        theory: {
            title: "Opening Theory",
            description: "Study deep opening theory and stay current with theoretical developments.",
            elo: "2000+",
            content: [
                "Critical lines analysis",
                "Modern theory in main openings",
                "Novelty preparation",
                "Computer analysis of openings",
                "Opening trends at top level"
            ],
            resources: [
                "New In Chess Yearbooks",
                "ChessBase Magazine",
                "Current GM Games Analysis"
            ]
        },
        "dynamic-play": {
            title: "Dynamic Play",
            description: "Master the art of unbalanced, dynamic positions and complex calculations.",
            elo: "2000+",
            content: [
                "Complex sacrifices",
                "Dynamic imbalances",
                "Initiative and momentum",
                "Intuitive play",
                "Risk management"
            ],
            resources: [
                "Dynamic Chess Strategy",
                "Secrets of Dynamic Chess",
                "My Great Predecessors (Kasparov)"
            ]
        },
        psychology: {
            title: "Chess Psychology",
            description: "Understand the psychological aspects of chess competition.",
            elo: "2000+",
            content: [
                "Tournament psychology",
                "Handling pressure",
                "Time management",
                "Opponent-specific preparation",
                "Mental training"
            ],
            resources: [
                "Psychology of Chess",
                "Mental Toughness in Chess",
                "Chess for Zebras"
            ]
        },
        mastery: {
            title: "Chess Mastery",
            description: "Refine all aspects of your chess to reach master level.",
            elo: "2200+",
            content: [
                "Personal weaknesses elimination",
                "Deep analysis methods",
                "Computer-assisted training",
                "Competition strategies",
                "Continuous improvement"
            ],
            resources: [
                "Quality Chess Publications",
                "Personal coaching",
                "Study of world champions' games"
            ]
        }
    };

    // Create a modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);

    // Add click event listener to each node
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const nodeId = node.id;
            const info = nodeInfo[nodeId];
            
            if (info) {
                // Create modal content
                const modalContent = `
                    <div class="modal-header">
                        <h2>${info.title}</h2>
                        <span class="elo-range">ELO: ${info.elo}</span>
                        <span class="close-btn">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p class="description">${info.description}</p>
                        <h3>What You'll Learn:</h3>
                        <ul class="content-list">
                            ${info.content.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <h3>Recommended Resources:</h3>
                        <ul class="resources-list">
                            ${info.resources.map(resource => `<li>${resource}</li>`).join('')}
                        </ul>
                    </div>
                `;
                
                // Update modal container
                modalContainer.innerHTML = `<div class="modal">${modalContent}</div>`;
                modalContainer.style.display = 'flex';
                
                // Add close functionality
                const closeBtn = document.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    modalContainer.style.display = 'none';
                });
                
                // Close when clicking outside
                modalContainer.addEventListener('click', (e) => {
                    if (e.target === modalContainer) {
                        modalContainer.style.display = 'none';
                    }
                });
            }
        });
    });

    