/**
 * Project Gallery Script
 * Handles project gallery functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox
    initLightbox();
    
    // Initialize project tabs
    initProjectTabs();
});

/**
 * Initialize lightbox
 */
function initLightbox() {
    const galleryElement = document.getElementById('lightgallery');
    
    if (galleryElement) {
        lightGallery(galleryElement, {
            selector: '.gallery-item.active',
            speed: 500,
            download: false,
            counter: true,
            mousewheel: true,
            backdropDuration: 400,
            thumbnail: true
        });
    }
}

/**
 * Initialize project tabs
 */
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const projectDescriptions = document.querySelectorAll('.project-description');
    
    if (!tabButtons.length || !galleryItems.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get project value
            const project = this.getAttribute('data-project');
            
            // Hide all project descriptions
            projectDescriptions.forEach(desc => {
                desc.classList.remove('active');
            });
            
            // Show selected project description
            const selectedDescription = document.getElementById(`${project}-description`);
            if (selectedDescription) {
                selectedDescription.classList.add('active');
            }
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (item.getAttribute('data-project') === project) {
                    item.classList.add('active');
                    item.style.display = 'block';
                    
                    // Add animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 1000);
                } else {
                    item.classList.remove('active');
                    item.style.display = 'none';
                }
            });
            
            // Reinitialize lightbox with new active items
            if (window.lgData) {
                const keys = Object.keys(window.lgData);
                keys.forEach(key => {
                    const instance = window.lgData[key];
                    if (instance && instance.destroy) {
                        instance.destroy();
                    }
                });
            }
            
            initLightbox();
        });
    });
}
