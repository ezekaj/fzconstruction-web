/**
 * Videos Page Script
 * Handles videos page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize videos filter
    initVideosFilter();
    
    // Initialize video modal
    initVideoModal();
});

/**
 * Initialize videos filter
 */
function initVideosFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (!filterButtons.length || !videoItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter video items
            videoItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // Add animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 1000);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize video modal
 */
function initVideoModal() {
    const playButtons = document.querySelectorAll('.play-button');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.video-modal .close-modal');
    
    if (!playButtons.length || !videoModal || !videoFrame) return;
    
    // Video URLs for each video ID
    const videoUrls = {
        'VIDEO_ID_1': 'https://www.youtube.com/embed/VIDEO_ID_1?autoplay=1',
        'VIDEO_ID_2': 'https://www.youtube.com/embed/VIDEO_ID_2?autoplay=1',
        'VIDEO_ID_3': 'https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1',
        'VIDEO_ID_4': 'https://www.youtube.com/embed/VIDEO_ID_4?autoplay=1',
        'VIDEO_ID_5': 'https://www.youtube.com/embed/VIDEO_ID_5?autoplay=1',
        'VIDEO_ID_6': 'https://www.youtube.com/embed/VIDEO_ID_6?autoplay=1'
    };
    
    // Open modal when play button is clicked
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoUrl = videoUrls[videoId];
            
            if (videoUrl) {
                videoFrame.src = videoUrl;
                videoModal.classList.add('active');
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeVideoModal();
        });
    }
    
    // Close modal when clicking outside the video
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close modal when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    /**
     * Close video modal and reset video
     */
    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        
        // Re-enable scrolling on body
        document.body.style.overflow = '';
    }
}
