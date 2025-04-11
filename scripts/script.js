// Common functionality shared across pages
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements that exist on all pages
    initNavigation();
    
    // Check if hero section exists and initialize
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        initHero();
    }
    
    // Add chess pattern background to certain elements
    addChessPatterns();
    
    // Get all nodes and other DOM elements
    const nodes = document.querySelectorAll('.node');
    const roadmap = document.querySelector('.roadmap');
    const svg = document.querySelector('.connections');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');
    
    // Variable to store checkboxes state
    let userProgress = JSON.parse(localStorage.getItem('chessRoadmapProgress')) || {};
    
    // Zoom functionality
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX, startY;
    const scaleStep = 0.1;
    const minScale = 0.5;
    const maxScale = 2;
    
    // Initialize the transform
    applyTransform();
    
    // Zoom in button
    zoomInBtn.addEventListener('click', () => {
        if (scale < maxScale) {
            scale += scaleStep;
            applyTransform();
        }
    });
    
    // Zoom out button
    zoomOutBtn.addEventListener('click', () => {
        if (scale > minScale) {
            scale -= scaleStep;
            applyTransform();
        }
    });
    
    // Reset view button
    resetViewBtn.addEventListener('click', () => {
        scale = 1;
        offsetX = 0;
        offsetY = 0;
        applyTransform();
    });
    
    // Mouse wheel zoom
    document.querySelector('.roadmap-container').addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0 && scale < maxScale) {
            // Zoom in
            scale += scaleStep;
        } else if (e.deltaY > 0 && scale > minScale) {
            // Zoom out
            scale -= scaleStep;
        }
        applyTransform();
    });
    
    // Drag functionality
    roadmap.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        roadmap.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        applyTransform();
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        roadmap.style.cursor = 'grab';
    });
    
    // Touch support for mobile
    roadmap.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - offsetX;
        startY = e.touches[0].clientY - offsetY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        offsetX = e.touches[0].clientX - startX;
        offsetY = e.touches[0].clientY - startY;
        applyTransform();
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Apply transform to roadmap
    function applyTransform() {
        roadmap.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
        drawConnections();
    }
    
    // Draw SVG connections between nodes
    function drawConnections() {
        // Clear previous connections
        svg.innerHTML = '';
        
        // Parent-child relationships to visualize
        const relationships = [
            { parent: 'fundamentals', children: ['rules', 'tactics'] },
            { parent: 'rules', children: ['notation'] },
            { parent: 'tactics', children: ['openings', 'endgames'] },
            { parent: 'notation', children: ['patterns'] },
            { parent: 'endgames', children: ['patterns'] },
            { parent: 'patterns', children: ['strategies', 'calculation'] },
            { parent: 'strategies', children: ['advanced-openings', 'middlegame'] },
            { parent: 'calculation', children: ['complex-endgames'] },
            { parent: 'advanced-openings', children: ['positional-play'] },
            { parent: 'middlegame', children: ['attack'] },
            { parent: 'complex-endgames', children: ['positional-play', 'attack'] },
            { parent: 'positional-play', children: ['theory', 'dynamic-play'] },
            { parent: 'attack', children: ['psychology'] },
            { parent: 'theory', children: ['mastery'] },
            { parent: 'dynamic-play', children: ['mastery'] },
            { parent: 'psychology', children: ['mastery'] }
        ];
        
        // Draw each connection
        relationships.forEach(rel => {
            const parentEl = document.getElementById(rel.parent);
            if (!parentEl) return;
            
            const parentRect = parentEl.getBoundingClientRect();
            const containerRect = roadmap.getBoundingClientRect();
            
            rel.children.forEach(childId => {
                const childEl = document.getElementById(childId);
                if (!childEl) return;
                
                const childRect = childEl.getBoundingClientRect();
                
                // Calculate start and end points relative to the SVG
                const startX = (parentRect.left + parentRect.width / 2 - containerRect.left) / scale;
                const startY = (parentRect.bottom - containerRect.top) / scale;
                const endX = (childRect.left + childRect.width / 2 - containerRect.left) / scale;
                const endY = (childRect.top - containerRect.top) / scale;
                
                // Create path
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                
                // Calculate control points for a curved line
                const midY = startY + (endY - startY) / 2;
                
                // Create a smooth bezier curve
                path.setAttribute('d', `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`);
                path.classList.add('connector');
                
                svg.appendChild(path);
            });
        });
    }

    // Call once on load
    drawConnections();
    
    // Node descriptions and content for modals with learning resources
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
                { name: "Chess.com's How to Play", url: "https://www.chess.com/learn-how-to-play-chess" },
                { name: "Lichess Learn Chess", url: "https://lichess.org/learn" },
                { name: "Chess for Beginners by Magnus Carlsen", url: "https://www.chess.com/lessons/magnus-carlsen" }
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
                { name: "FIDE Rules of Chess", url: "https://www.fide.com/FIDE/handbook/LawsOfChess.pdf" },
                { name: "Chess.com's Articles on Rules", url: "https://www.chess.com/article/view/chess-rules" },
                { name: "Bobby Fischer Teaches Chess", url: "https://www.amazon.com/Bobby-Fischer-Teaches-Chess/dp/0553263153" }
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
                { name: "Chess Tactics for Beginners", url: "https://www.chess.com/puzzles/learning" },
                { name: "Lichess Training Puzzles", url: "https://lichess.org/training" },
                { name: "Chess.com's Tactics Trainer", url: "https://www.chess.com/puzzles" }
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
                { name: "Chess Notation Guide", url: "https://www.chess.com/article/view/chess-notation" },
                { name: "Annotated Games Collection", url: "https://www.chessgames.com/" },
                { name: "ChessBase tutorials", url: "https://en.chessbase.com/post/chessbase-tutorial-algebraic-notation" }
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
                { name: "Logical Chess: Move by Move", url: "https://www.amazon.com/Logical-Chess-Every-Explained-Algebraic/dp/0713484640" },
                { name: "Chess Openings for Beginners", url: "https://www.chess.com/article/view/the-best-chess-openings-for-beginners" },
                { name: "John Bartholomew's Opening Videos", url: "https://www.youtube.com/playlist?list=PLl9uuRYQ-6MDGwb5Jk5rI8iomKxF4y2Az" }
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
                { name: "Silman's Complete Endgame Course", url: "https://www.amazon.com/Silmans-Complete-Endgame-Course-Beginner/dp/1890085103" },
                { name: "100 Endgames You Must Know", url: "https://www.amazon.com/100-Endgames-You-Must-Know/dp/9056916173" },
                { name: "ChessTempo Endgame Training", url: "https://chesstempo.com/chess-endgames/" }
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
                { name: "The Woodpecker Method", url: "https://www.amazon.com/Woodpecker-Method-Axel-Smith/dp/1784830542" },
                { name: "Chess Pattern Recognition", url: "https://www.chessable.com/pattern-recognition/s/2464/" },
                { name: "Puzzle Rush on Chess.com", url: "https://www.chess.com/puzzles/rush" }
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
                { name: "My System by Aron Nimzowitsch", url: "https://www.amazon.com/My-System-Chess-Treatise-Century/dp/1880673851" },
                { name: "The Reassess Your Chess Workbook", url: "https://www.amazon.com/Reassess-Your-Chess-Workbook-Silman/dp/1890085057" },
                { name: "Chess Structures: A Grandmaster Guide", url: "https://www.amazon.com/Chess-Structures-Grandmaster-Mauricio-Flores/dp/1784830003" }
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
                { name: "Perfect Your Chess", url: "https://www.amazon.com/Perfect-Your-Chess-Andrei-Volokitin/dp/9056912186" },
                { name: "Calculate Like a Grandmaster", url: "https://www.amazon.com/Calculate-Like-Grandmaster-Learn-Modern/dp/178194536X" },
                { name: "Calculation Training on Chess.com", url: "https://www.chess.com/vision" }
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
                { name: "Lifetime Repertoires on Chessable", url: "https://www.chessable.com/courses/all/opening/" },
                { name: "Opening Encyclopaedia", url: "https://www.chessable.com/opening-encyclopedia/s/2464/" },
                { name: "GM opening preparation videos", url: "https://www.chess.com/lessons/guide#openings" }
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
                { name: "The Middlegame in Chess", url: "https://www.amazon.com/Art-Middlegame-Dover-Chess/dp/0486261549" },
                { name: "Mastering Chess Strategy", url: "https://www.amazon.com/Mastering-Chess-Strategy-Johan-Hellsten/dp/1857445007" },
                { name: "Prophylactic Thinking", url: "https://www.chess.com/lessons/prophylactic-thinking" }
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
                { name: "Dvoretsky's Endgame Manual", url: "https://www.amazon.com/Dvoretskys-Endgame-Manual-Mark-Dvoretsky/dp/1936490137" },
                { name: "Endgame Challenge by Nunn", url: "https://www.amazon.com/John-Nunns-Chess-Endgame-Challenge/dp/1906454272" },
                { name: "ChessTempo Endgame Studies", url: "https://chesstempo.com/chess-endgames/" }
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
                { name: "Positional Decision Making in Chess", url: "https://www.amazon.com/Positional-Decision-Making-Chess-Gelfand/dp/1784830054" },
                { name: "Judgment and Planning in Chess", url: "https://www.amazon.com/Judgment-Planning-Chess-First-Collection/dp/4871874990" },
                { name: "Strategic Play by McDonald", url: "https://www.amazon.com/Chess-Strategy-Advanced-Neil-McDonald/dp/1904600182" }
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
                { name: "Art of Attack in Chess", url: "https://www.amazon.com/Art-Attack-Chess-Vladimir-Vukovic/dp/1857444000" },
                { name: "Practical Chess Defence", url: "https://www.amazon.com/Practical-Chess-Defence-Jacob-Aagaard/dp/1904600824" },
                { name: "How to Attack Without Sacrificing", url: "https://www.chess.com/lessons/how-to-attack-without-sacrificing" }
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
                { name: "New In Chess Yearbooks", url: "https://www.newinchess.com/yearbook" },
                { name: "ChessBase Magazine", url: "https://shop.chessbase.com/en/categories/magazine" },
                { name: "Current GM Games Analysis", url: "https://lichess.org/study" }
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
                { name: "Dynamic Chess Strategy", url: "https://www.amazon.com/Dynamic-Chess-Strategy-Mihai-Suba/dp/1901983498" },
                { name: "Secrets of Dynamic Chess", url: "https://www.newinchess.com/the-secrets-of-modern-chess-strategy" },
                { name: "My Great Predecessors (Kasparov)", url: "https://www.amazon.com/My-Great-Predecessors-Part-1/dp/1781943761" }
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
                { name: "Psychology of Chess", url: "https://www.amazon.com/Psychology-Chess-Player-Reuben-Fine/dp/4871875407" },
                { name: "Mental Toughness in Chess", url: "https://www.amazon.com/When-Life-Chess-Mental-Toughness/dp/1936490382" },
                { name: "Chess for Zebras", url: "https://www.amazon.com/Chess-Zebras-Jonathan-Rowson/dp/1901983854" }
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
                { name: "Quality Chess Publications", url: "https://www.qualitychess.co.uk/" },
                { name: "Personal coaching", url: "https://www.chess.com/coaches" },
                { name: "Study of world champions' games", url: "https://www.chessgames.com/perl/chessplayer?pid=15940" }
            ]
        }
    };