// Roadmap-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize roadmap functionality
    initRoadmap();
    initNodeInteractions();
});

/**
 * Initialize the interactive roadmap
 */
function initRoadmap() {
    // Get elements
    const roadmap = document.querySelector('.roadmap');
    const svg = document.querySelector('.connections');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');
    const nodes = document.querySelectorAll('.node');
    
    // Load user progress from localStorage
    let userProgress = JSON.parse(localStorage.getItem('chessRoadmapProgress')) || {};
    
    // Zoom functionality variables
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;
    let lastTouchDistance = 0;
    const scaleStep = 0.1;
    const minScale = 0.5;
    const maxScale = 2;
    
    // Initialize transform
    applyTransform();
    
    // Zoom in button
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (scale < maxScale) {
                scale += scaleStep;
                applyTransform();
            }
        });
    }
    
    // Zoom out button
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (scale > minScale) {
                scale -= scaleStep;
                applyTransform();
            }
        });
    }
    
    // Reset view button
    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', () => {
            scale = 1;
            translateX = 0;
            translateY = 0;
            applyTransform();
        });
    }
    
    // Scroll to specific section if URL has hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView();
            }, 500);
        }
    }
    
    // Mouse wheel zoom
    const roadmapContainer = document.querySelector('.roadmap-container');
    if (roadmapContainer) {
        roadmapContainer.addEventListener('wheel', (e) => {
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
    }
    
    // Drag functionality
    if (roadmap) {
        roadmap.addEventListener('mousedown', (e) => {
            if (e.target.closest('.node')) return; // Don't initiate drag when clicking nodes
            
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            roadmap.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            applyTransform();
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            if (roadmap) roadmap.style.cursor = 'grab';
        });
        
        // Touch support for mobile
        roadmap.addEventListener('touchstart', (e) => {
            if (e.target.closest('.node')) return; // Don't initiate drag when tapping nodes
            
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            } else if (e.touches.length === 2) {
                // Handle pinch zoom
                lastTouchDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });
        
        roadmap.addEventListener('touchmove', (e) => {
            e.preventDefault();
            
            if (e.touches.length === 1 && isDragging) {
                translateX = e.touches[0].clientX - startX;
                translateY = e.touches[0].clientY - startY;
                applyTransform();
            } else if (e.touches.length === 2) {
                // Handle pinch zoom
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                
                if (lastTouchDistance > 0) {
                    if (currentDistance > lastTouchDistance) {
                        // Pinch out - zoom in
                        scale = Math.min(2, scale + 0.01);
                    } else {
                        // Pinch in - zoom out
                        scale = Math.max(0.5, scale - 0.01);
                    }
                    applyTransform();
                }
                
                lastTouchDistance = currentDistance;
            }
        });
        
        roadmap.addEventListener('touchend', () => {
            isDragging = false;
            lastTouchDistance = 0;
        });
    }
    
    // Apply transform to roadmap
    function applyTransform() {
        if (!roadmap) return;
        roadmap.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        drawConnections();
    }

    // Draw connections between nodes using SVG paths
    function drawConnections() {
        const svg = document.getElementById('connections');
        if (!svg) return;
        
        svg.innerHTML = ''; // Clear existing connections
        
        // Define connections (nodeId → parentNodeIds)
        const connections = {
            'rules': ['fundamentals'],
            'notation': ['fundamentals'],
            'tactics': ['rules', 'notation'],
            'openings': ['notation', 'tactics'],
            'endgames': ['tactics'],
            'strategies': ['openings', 'endgames'],
            'advanced-openings': ['openings', 'strategies'],
            'mastery': ['strategies', 'advanced-openings']
        };
        
        const userProgress = JSON.parse(localStorage.getItem('chessRoadmapProgress')) || {};
        
        // Create connections
        for (const [childId, parentIds] of Object.entries(connections)) {
            const childNode = document.getElementById(childId);
            
            if (!childNode) continue;
            
            for (const parentId of parentIds) {
                const parentNode = document.getElementById(parentId);
                
                if (!parentNode) continue;
                
                // Get the positions of the nodes
                const parentRect = parentNode.getBoundingClientRect();
                const childRect = childNode.getBoundingClientRect();
                
                // Get roadmap container position for offset calculation
                const containerRect = document.querySelector('.roadmap-container').getBoundingClientRect();
                
                // Calculate center points relative to the SVG
                const px = parentRect.left + parentRect.width/2 - containerRect.left;
                const py = parentRect.top + parentRect.height/2 - containerRect.top;
                const cx = childRect.left + childRect.width/2 - containerRect.left;
                const cy = childRect.top + childRect.height/2 - containerRect.top;
                
                // Create the path
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                
                // Calculate control points for curved paths
                // Determine if the connection is within the same stage or between stages
                const parentStage = parentNode.closest('.roadmap-stage');
                const childStage = childNode.closest('.roadmap-stage');
                const isSameStage = parentStage === childStage;
                
                let pathData;
                
                if (isSameStage) {
                    // Vertical connection within the same stage
                    const midY = (py + cy) / 2;
                    const controlX1 = px + (Math.sign(cx - px) * 40);
                    const controlX2 = cx - (Math.sign(cx - px) * 40);
                    
                    pathData = `M ${px} ${py} C ${controlX1} ${py}, ${controlX2} ${cy}, ${cx} ${cy}`;
                } else {
                    // Horizontal connection between stages 
                    const midX = (px + cx) / 2;
                    
                    // If child is above or below parent, adjust control points
                    if (Math.abs(cy - py) > Math.abs(cx - px) * 0.5) {
                        pathData = `M ${px} ${py} C ${px + (cx-px)*0.2} ${py}, ${cx - (cx-px)*0.2} ${cy}, ${cx} ${cy}`;
                    } else {
                        pathData = `M ${px} ${py} C ${midX} ${py}, ${midX} ${cy}, ${cx} ${cy}`;
                    }
                }
                
                path.setAttribute('d', pathData);
                path.classList.add('connector');
                path.dataset.parent = parentId;
                path.dataset.child = childId;
                
                // Check if both nodes are completed
                if (userProgress[parentId]?.completed && userProgress[childId]?.completed) {
                    path.classList.add('completed');
                }
                
                svg.appendChild(path);
            }
        }
    }

    // Calculate progress percentage for a node
    function calculateProgress(nodeId) {
        if (!userProgress[nodeId]) return 0;
        
        const totalItems = userProgress[nodeId].completed.length + userProgress[nodeId].resourcesVisited.length;
        const completedItems = 
            userProgress[nodeId].completed.filter(Boolean).length + 
            userProgress[nodeId].resourcesVisited.filter(Boolean).length;
        
        return Math.round((completedItems / totalItems) * 100);
    }
    
    // Initialize progress bars
    function updateProgressBars() {
        Object.keys(userProgress).forEach(nodeId => {
            updateProgressBar(nodeId);
        });
    }
    
    // Update progress bar for a specific node
    function updateProgressBar(nodeId) {
        const progressBar = document.querySelector(`#${nodeId} .progress`);
        if (!progressBar || !userProgress[nodeId]) return;
        
        const percentage = calculateProgress(nodeId);
        progressBar.style.width = `${percentage}%`;
        
        // Change color based on progress
        if (percentage === 100) {
            progressBar.style.background = 'linear-gradient(90deg, #00e676, #00c853)';
        } else if (percentage > 50) {
            progressBar.style.background = 'linear-gradient(90deg, #ffee58, #fdd835)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
        }
    }
    
    // Initialize progress bars on load
    updateProgressBars();
    
    // Window resize event to redraw connections
    window.addEventListener('resize', drawConnections);
}

// Initialize all node interactions
function initNodeInteractions() {
    const nodes = document.querySelectorAll('.node');
    
    nodes.forEach(node => {
        // Add event listeners for highlighting connections
        node.addEventListener('mouseenter', () => highlightConnections(node.id));
        node.addEventListener('mouseleave', () => resetHighlights());
        
        // Add event listener for opening the node modal
        node.addEventListener('click', (e) => {
            if (!e.target.closest('.checkbox')) {
                const nodeId = node.id;
                openNodeModal(nodeId);
            }
        });
    });
}

// Highlight connections for a specific node
function highlightConnections(nodeId) {
    // Dim all nodes and connections first
    document.querySelectorAll('.roadmap-node').forEach(n => {
        n.classList.add('dimmed');
    });
    
    document.querySelectorAll('.connector').forEach(c => {
        c.classList.add('dimmed');
    });
    
    // Highlight the current node
    const currentNode = document.getElementById(nodeId);
    if (currentNode) {
        currentNode.classList.remove('dimmed');
        currentNode.classList.add('highlighted');
    }
    
    // Highlight direct connections
    document.querySelectorAll(`.connector[data-parent="${nodeId}"], .connector[data-child="${nodeId}"]`).forEach(conn => {
        conn.classList.remove('dimmed');
        conn.classList.add('highlighted');
        
        // Highlight the nodes connected to this one
        const parentId = conn.dataset.parent;
        const childId = conn.dataset.child;
        
        const connectedNodeId = (parentId === nodeId) ? childId : parentId;
        const connectedNode = document.getElementById(connectedNodeId);
        
        if (connectedNode) {
            connectedNode.classList.remove('dimmed');
            connectedNode.classList.add('connected');
        }
    });
}

// Reset all highlights
function resetHighlights() {
    document.querySelectorAll('.roadmap-node').forEach(n => {
        n.classList.remove('dimmed', 'highlighted', 'connected');
    });
    
    document.querySelectorAll('.connector').forEach(c => {
        c.classList.remove('dimmed', 'highlighted');
    });
}

// Node information and resources
const nodeInfo = {
    fundamentals: {
        title: "Chess Fundamentals",
        description: "Build a solid foundation by learning how each piece moves and understanding the basic concepts of chess.",
        elo: "0-800",
        content: [
            "Board layout and starting position",
            "Learning piece names and movements",
            "Understanding check, checkmate, and stalemate",
            "Basic piece values and material counting",
            "Basic chess terminology"
        ],
        resources: [
            { name: "ChessKid Beginner Videos", url: "https://www.chesskid.com/videos/beginner" },
            { name: "Chess.com Learn Page", url: "https://www.chess.com/learn" },
            { name: "Basic Chess Rules Guide", url: "https://www.chess.com/learn-how-to-play-chess" }
        ]
    },
    rules: {
        title: "Rules & Setup",
        description: "Master all the chess rules and special moves to play the game correctly.",
        elo: "800-1000",
        content: [
            "Special moves (castling, en passant)",
            "Draw conditions and rules",
            "Tournament rules and etiquette",
            "Chess clock usage",
            "Recording moves"
        ],
        resources: [
            { name: "FIDE Laws of Chess", url: "https://handbook.fide.com/chapter/E012018" },
            { name: "Special Chess Rules", url: "https://www.chess.com/article/view/chess-rules--special-moves" },
            { name: "Chess Tournament Guide", url: "https://www.chess.com/article/view/chess-tournament-rules" }
        ]
    },
    notation: {
        title: "Chess Notation",
        description: "Learn how to read and write chess moves using algebraic notation.",
        elo: "0-1200",
        content: [
            "Algebraic notation basics",
            "Descriptive notation",
            "Reading chess books and articles",
            "Writing down your games",
            "Using notation software"
        ],
        resources: [
            { name: "Chess.com Notation Guide", url: "https://www.chess.com/article/view/chess-notation" },
            { name: "Learn Chess Notation", url: "https://www.chesskid.com/article/view/chess-notation" }
        ]
    },
    tactics: {
        title: "Tactics Training",
        description: "Sharpen your tactical skills by solving puzzles and studying common tactical motifs.",
        elo: "400-1600",
        content: [
            "Forks, pins, and skewers",
            "Discovered attacks",
            "Double checks",
            "Removing the defender",
            "Tactical motifs in your games"
        ],
        resources: [
            { name: "Chess.com Tactics Trainer", url: "https://www.chess.com/tactics" },
            { name: "CT-ART 4.0", url: "http://www.chessking.com/chess_tactics/" },
            { name: "Chess Tempo", url: "https://chesstempo.com/" }
        ]
    },
    openings: {
        title: "Opening Principles",
        description: "Understand the basic principles of opening play and develop your opening repertoire.",
        elo: "600-1800",
        content: [
            "Controlling the center",
            "Developing pieces effectively",
            "King safety and pawn structure",
            "Opening traps and pitfalls",
            "Studying opening theory"
        ],
        resources: [
            { name: "Chess.com Opening Trainer", url: "https://www.chess.com/openings" },
            { name: "Opening Principles", url: "https://www.chesskid.com/article/view/opening-principles" }
        ]
    },
    endgames: {
        title: "Endgame Techniques",
        description: "Learn essential endgame techniques and improve your ability to convert advantages into wins.",
        elo: "800-2000",
        content: [
            "King and pawn endings",
            "Basic checkmates (e.g., king and queen vs. king)",
            "Opposition and triangulation",
            "Rook endings",
            "Using the 50-move rule"
        ],
        resources: [
            { name: "Endgame Simulator", url: "https://www.chess.com/endgames" },
            { name: "Endgame Basics", url: "https://www.chess.com/article/view/endgame-basics" }
        ]
    },
    strategies: {
        title: "Strategic Planning",
        description: "Develop a strategic mindset and learn to create long-term plans in your games.",
        elo: "1000-2200",
        content: [
            "Weak squares and strongholds",
            "Open files and diagonals",
            "Pawn majorities and minorities",
            "Outposts for knights",
            "Strategic planning in the middlegame"
        ],
        resources: [
            { name: "Chess.com Strategy Guide", url: "https://www.chess.com/article/view/chess-strategy" },
            { name: "The Complete Chess Course", url: "https://www.chess.com/article/view/the-complete-chess-course" }
        ]
    },
    'advanced-openings': {
        title: "Advanced Opening Concepts",
        description: "Dive deeper into opening theory and learn about advanced concepts and variations.",
        elo: "1200-2400",
        content: [
            "Understanding opening traps",
            "Transpositions and move orders",
            "Opening sacrifices",
            "Studying grandmaster games",
            "Preparing openings with an engine"
        ],
        resources: [
            { name: "Opening Explorer", url: "https://www.chess.com/opening_explorer" },
            { name: "ChessBase", url: "https://www.chessbase.com/" }
        ]
    },
    mastery: {
        title: "Mastery and Beyond",
        description: "Achieve a deep understanding of chess and strive for mastery.",
        elo: "2000+",
        content: [
            "Analyzing your own games",
            "Identifying and fixing weaknesses",
            "Playing regularly and reviewing games",
            "Studying advanced tactics and strategies",
            "Contributing to chess communities"
        ],
        resources: [
            { name: "FIDE Master Titles", url: "https://www.fide.com/fide/handbook.html?id=208" },
            { name: "USCF Membership", url: "https://new.uschess.org/join-us-chess" }
        ]
    },
    'positional-play': {
        title: "Advanced Positional Play",
        description: "Master complex positional concepts and strategic planning at the highest level.",
        elo: "2200+",
        content: [
            "Prophylactic thinking",
            "Transformation of advantages",
            "Piece placement optimization",
            "Playing with/against isolated pawns",
            "Strategic fortresses"
        ],
        resources: [
            { name: "Positional Play by Jacob Aagaard", url: "https://www.qualitychess.co.uk/products/1/92/positional_play_by_jacob_aagaard/" },
            { name: "GM Lecture Series - Positional Chess", url: "https://www.ichess.net/shop/positional-chess-masterclass/" }
        ]
    },
    'attack': {
        title: "Advanced Attack & Defense",
        description: "Learn sophisticated attacking patterns and defensive techniques used by top grandmasters.",
        elo: "2200+",
        content: [
            "Attack preparation",
            "Defensive resources",
            "Sacrifice evaluation",
            "King safety dynamics",
            "Counter-attacking techniques"
        ],
        resources: [
            { name: "GM Attacking Manual", url: "https://www.amazon.com/Grandmaster-Repertoire-15-French-Defence/dp/1784830008" },
            { name: "Defense Masterclass", url: "https://www.chessable.com/defense-masterclass/course/45717/" }
        ]
    },
    'theory': {
        title: "Modern Opening Theory",
        description: "Stay current with theoretical developments and build a sophisticated opening repertoire.",
        elo: "2200+",
        content: [
            "Critical line analysis",
            "Novelty preparation",
            "Opening trends",
            "Computer-aided preparation",
            "Tournament-specific preparation"
        ],
        resources: [
            { name: "ChessBase Mega Database", url: "https://shop.chessbase.com/en/products/mega_database_2023" },
            { name: "New In Chess Yearbook", url: "https://www.newinchess.com/yearbook/" }
        ]
    },
    'dynamic-play': {
        title: "Dynamic Chess",
        description: "Master the art of dynamic play and complex calculations in critical positions.",
        elo: "2200+",
        content: [
            "Concrete calculation",
            "Initiative evaluation",
            "Dynamic sacrifices",
            "Time pressure handling",
            "Critical position analysis"
        ],
        resources: [
            { name: "Calculate Like a Grandmaster", url: "https://www.chessable.com/calculate-like-a-grandmaster/course/84635/" },
            { name: "Dynamic Decision Making", url: "https://www.chess.com/lessons/dynamic-chess" }
        ]
    },
    'psychology': {
        title: "Chess Psychology",
        description: "Develop mental toughness and psychological preparation for high-level competition.",
        elo: "2300+",
        content: [
            "Tournament psychology",
            "Stress management",
            "Time management",
            "Opponent preparation",
            "Recovery after losses"
        ],
        resources: [
            { name: "Psychology in Chess", url: "https://www.amazon.com/Psychology-Chess-Player-Reuben-Fine/dp/4871875407" },
            { name: "Mental Toughness in Chess", url: "https://www.chessable.com/mental-toughness-in-chess/course/79641/" }
        ]
    }
};

// Open the node modal with details
function openNodeModal(nodeId) {
    const node = document.getElementById(nodeId);
    if (!node) return;
    
    const modal = document.getElementById('node-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalElo = document.getElementById('modal-elo');
    const contentList = document.getElementById('content-list');
    const resourcesList = document.getElementById('resources-list');
    const progressBar = document.getElementById('modal-progress-bar');
    const progressText = document.getElementById('modal-progress-text');
    
    if (!modal || !modalTitle || !modalDescription || !contentList || !resourcesList) return;
    
    const info = nodeInfo[nodeId];
    if (!info) return;
    
    // Load saved progress
    let userProgress = JSON.parse(localStorage.getItem('chessRoadmapProgress')) || {};
    if (!userProgress[nodeId]) {
        userProgress[nodeId] = {
            content: new Array(info.content.length).fill(false),
            resources: new Array(info.resources.length).fill(false)
        };
    }
    
    // Populate modal content
    modalTitle.textContent = info.title;
    modalDescription.textContent = info.description;
    modalElo.textContent = `ELO: ${info.elo}`;
    
    // Create content checklist
    contentList.innerHTML = info.content.map((item, index) => `
        <div class="checkbox-container" data-type="content" data-index="${index}">
            <div class="custom-checkbox ${userProgress[nodeId].content[index] ? 'checked' : ''}"></div>
            <span class="checkbox-label">${item}</span>
        </div>
    `).join('');
    
    // Create resources list with checkboxes
    resourcesList.innerHTML = info.resources.map((resource, index) => `
        <div class="checkbox-container" data-type="resources" data-index="${index}">
            <div class="custom-checkbox ${userProgress[nodeId].resources[index] ? 'checked' : ''}"></div>
            <a href="${resource.url}" class="resource-link" target="_blank">${resource.name}</a>
        </div>
    `).join('');
    
    // Calculate and display progress
    updateModalProgress(nodeId, userProgress[nodeId]);
    
    // Add checkbox event listeners
    const checkboxes = modal.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const container = checkbox.closest('.checkbox-container');
            const type = container.dataset.type;
            const index = parseInt(container.dataset.index);
            
            checkbox.classList.toggle('checked');
            userProgress[nodeId][type][index] = checkbox.classList.contains('checked');
            
            // Update progress display
            updateModalProgress(nodeId, userProgress[nodeId]);
        });
    });
    
    // Add save button functionality
    const saveBtn = modal.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('chessRoadmapProgress', JSON.stringify(userProgress));
            updateNodeProgress(nodeId, userProgress[nodeId]);
            
            // Show feedback
            saveBtn.textContent = 'Progress Saved!';
            setTimeout(() => {
                saveBtn.textContent = 'Save Progress';
            }, 2000);
        });
    }
    
    // Show modal with animation
    modal.classList.add('show');
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.classList.remove('show');
        };
    }
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Update progress display in the modal
function updateModalProgress(nodeId, progress) {
    const progressBar = document.getElementById('modal-progress-bar');
    const progressText = document.getElementById('modal-progress-text');
    
    if (!progressBar || !progressText) return;
    
    const totalItems = progress.content.length + progress.resources.length;
    const completedItems = 
        progress.content.filter(Boolean).length + 
        progress.resources.filter(Boolean).length;
    
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
    
    // Update progress bar color based on completion
    if (percentage === 100) {
        progressBar.style.background = 'linear-gradient(90deg, #00e676, #00c853)';
    } else if (percentage > 50) {
        progressBar.style.background = 'linear-gradient(90deg, #ffee58, #fdd835)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
    }
}

// Update node progress display in the roadmap
function updateNodeProgress(nodeId, progress) {
    const node = document.getElementById(nodeId);
    if (!node) return;
    
    const progressBar = node.querySelector('.progress');
    if (!progressBar) return;
    
    const totalItems = progress.content.length + progress.resources.length;
    const completedItems = 
        progress.content.filter(Boolean).length + 
        progress.resources.filter(Boolean).length;
    
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    progressBar.style.width = `${percentage}%`;
    
    // Update connections if node is completed
    if (percentage === 100) {
        node.classList.add('completed');
        updateConnections(nodeId);
    } else {
        node.classList.remove('completed');
        updateConnections(nodeId);
    }
}