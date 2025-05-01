// Lesson-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    initLessonPage();
});

/**
 * Initialize the lessons page functionality
 */
function initLessonPage() {
    const levelFilter = document.getElementById('level-filter');
    const topicFilter = document.getElementById('topic-filter');
    const searchInput = document.getElementById('lesson-search');
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    // Define ELO ranges for levels to match roadmap
    const eloRanges = {
        beginner: [0, 1200],
        intermediate: [1200, 1800],
        advanced: [1800, 2200],
        master: [2200, Infinity]
    };

    if (levelFilter) {
        levelFilter.addEventListener('change', applyFilters);
    }
    
    if (topicFilter) {
        topicFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Initialize lesson card click events
    lessonCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('lesson-link') || 
                e.target.closest('.lesson-link')) {
                return;
            }
            
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
            
            // Match based on level, topic, and search text
            const levelMatch = level === 'all' || cardLevel === level;
            const topicMatch = topic === 'all' || cardTopic === topic;
            const searchMatch = searchText === '' || 
                              cardTitle.includes(searchText) || 
                              cardDescription.includes(searchText);
            
            if (levelMatch && topicMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update the count of displayed lessons
        updateLessonCount();
    }
    
    /**
     * Update the count of displayed lessons
     */
    function updateLessonCount() {
        const level = levelFilter ? levelFilter.value : 'all';
        const topic = topicFilter ? topicFilter.value : 'all';
        
        const levelText = level !== 'all' ? `${level.charAt(0).toUpperCase() + level.slice(1)} Level` : 'All Levels';
        const topicText = topic !== 'all' ? `${topic.charAt(0).toUpperCase() + topic.slice(1)}` : 'All Topics';
        
        const headerTitle = document.querySelector('.lessons-header h1');
        if (headerTitle) {
            headerTitle.textContent = `${levelText} - ${topicText}`;
        }
    }

    // Track lesson progress
    const lessonLinks = document.querySelectorAll('.lesson-link');
    lessonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const lessonCard = link.closest('.lesson-card');
            if (lessonCard) {
                const lessonTitle = lessonCard.querySelector('h3').textContent;
                const level = lessonCard.dataset.level;
                const topic = lessonCard.dataset.topic;
                
                // Save progress to localStorage
                const progress = JSON.parse(localStorage.getItem('chessLessonProgress') || '{}');
                if (!progress[level]) progress[level] = {};
                if (!progress[level][topic]) progress[level][topic] = [];
                
                if (!progress[level][topic].includes(lessonTitle)) {
                    progress[level][topic].push(lessonTitle);
                    localStorage.setItem('chessLessonProgress', JSON.stringify(progress));
                }
                
                e.preventDefault();
                alert(`Starting lesson: "${lessonTitle}"`);
            }
        });
    });
    
    // Initialize lesson count
    updateLessonCount();
}