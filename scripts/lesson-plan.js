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

    /**
     * Apply all filters to lesson cards
     */
    function applyFilters() {
        const level = levelFilter ? levelFilter.value : 'all';
        const topic = topicFilter ? topicFilter.value : 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase() : '';
        
        lessonCards.forEach(card => {
            const cardLevel = card.dataset.level;
            const cardTopic = card.dataset.topic;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            
            // Check if card matches all filters
            const levelMatch = level === 'all' || cardLevel === level;
            const topicMatch = topic === 'all' || cardTopic === topic;
            const searchMatch = searchText === '' || 
                               cardTitle.includes(searchText) || 
                               cardDescription.includes(searchText);
            
            // Show or hide card based on filters
            if (levelMatch && topicMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update the count of displayed lessons
        updateLessonCount();
    }