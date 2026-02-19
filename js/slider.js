document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slider
    function initSlider() {
        // Set first slide as active
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // Start auto-sliding
        startSlideInterval();
    }
    
    // Start auto-sliding
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Reset interval
        resetInterval();
    }
    
    // Go to next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        
        // Loop back to first slide if at the end
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        
        goToSlide(nextIndex);
    }
    
    // Go to previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        
        // Loop to last slide if at the beginning
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        
        goToSlide(prevIndex);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize slider
    initSlider();
});
