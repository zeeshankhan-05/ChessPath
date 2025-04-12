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