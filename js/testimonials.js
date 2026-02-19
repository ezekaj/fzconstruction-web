/**
 * Testimonials Slider Script
 * Handles testimonials slider functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Load testimonials from CMS
    loadTestimonials();
});

/**
 * Initialize testimonials slider
 */
function initTestimonialsSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!testimonialItems.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Start auto-sliding
    startSlideInterval();
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // Dot click
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
    }
    
    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    function goToSlide(index) {
        // Remove active class from all slides and dots
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Reset interval
        resetInterval();
    }
    
    /**
     * Go to next slide
     */
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        
        // Loop back to first slide if at the end
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        
        goToSlide(nextIndex);
    }
    
    /**
     * Go to previous slide
     */
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        
        // Loop to last slide if at the beginning
        if (prevIndex < 0) {
            prevIndex = testimonialItems.length - 1;
        }
        
        goToSlide(prevIndex);
    }
    
    /**
     * Start auto-sliding
     */
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    /**
     * Reset interval when manually changing slides
     */
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Pause auto-sliding when hovering over slider
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            startSlideInterval();
        });
    }
}

/**
 * Load testimonials from CMS
 */
function loadTestimonials() {
    // In a real app, this would fetch from the API
    // For now, we'll use the static testimonials already in the HTML
    
    // Example of how to add a new testimonial dynamically:
    /*
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialsDots = document.querySelector('.testimonials-dots');
    
    if (testimonialsContainer && testimonialsDots) {
        // Create new testimonial item
        const newTestimonial = document.createElement('div');
        newTestimonial.className = 'testimonial-item';
        
        newTestimonial.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">
                    New testimonial text goes here.
                </p>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="images/testimonials/new-client.jpg" alt="New Client">
                    </div>
                    <div class="author-info">
                        <h4>New Client</h4>
                        <p>Client Position</p>
                    </div>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(newTestimonial);
        
        // Create new dot
        const newDot = document.createElement('span');
        newDot.className = 'dot';
        newDot.setAttribute('data-slide', testimonialsContainer.children.length - 1);
        
        testimonialsDots.appendChild(newDot);
        
        // Reinitialize slider
        initTestimonialsSlider();
    }
    */
}
