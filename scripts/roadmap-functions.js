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