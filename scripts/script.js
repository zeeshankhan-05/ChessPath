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

    