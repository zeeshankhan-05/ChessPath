// Lesson-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lesson page functionality
    initLessonPage();
});

/**
 * Initialize the lessons page functionality
 */
function initLessonPage() {
    // Initialize filters
    const levelFilter = document.getElementById('level-filter');
    const topicFilter = document.getElementById('topic-filter');
    const searchInput = document.getElementById('lesson-search');
    const lessonCards = document.querySelectorAll('.lesson-card');
    const paginationButtons = document.querySelectorAll('.page-btn');
    
    // Apply filters when changed
    if (levelFilter) {
        levelFilter.addEventListener('change', applyFilters);
    }
    
    if (topicFilter) {
        topicFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    // Initialize pagination
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // In a real implementation, this would load the next page of lessons
                console.log('Load page: ' + e.target.textContent);
            });
        });
    }
    
    // Initialize lesson card click events
    lessonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent click if clicking on the link
            if (e.target.classList.contains('lesson-link') || 
                e.target.closest('.lesson-link')) {
                return;
            }
            
            // Get the link element and trigger click
            const link = card.querySelector('.lesson-link');
            if (link) {
                link.click();
            }
        });
    });