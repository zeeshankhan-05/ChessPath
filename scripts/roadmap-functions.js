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