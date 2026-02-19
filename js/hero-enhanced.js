/**
 * Enhanced Hero Section Script
 * Implements advanced animations and effects for the hero slider
 */

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedHero();
});

/**
 * Initialize enhanced hero section
 */
function initEnhancedHero() {
    const heroSlider = document.querySelector('.hero-slider');
    
    if (!heroSlider) return;
    
    // Add 3D container for floating elements
    const container3D = document.createElement('div');
    container3D.className = 'hero-3d-container';
    heroSlider.prepend(container3D);
    
    // Add floating elements
    createFloatingElements(container3D);
    
    // Add letterbox effect
    createLetterboxEffect(heroSlider);
    
    // Add glitch effect
    createGlitchEffect(heroSlider);
    
    // Add spotlight effect
    createSpotlightEffect(heroSlider);
    
    // Add scroll indicator
    createScrollIndicator(heroSlider);
    
    // Initialize mouse movement effect
    initMouseMovement(heroSlider);
    
    // Add cinematic effect on load
    setTimeout(() => {
        heroSlider.classList.add('cinematic');
        
        // Remove cinematic effect after 2 seconds
        setTimeout(() => {
            heroSlider.classList.remove('cinematic');
        }, 2000);
    }, 500);
}

/**
 * Create floating 3D elements
 * @param {HTMLElement} container - Container element
 */
function createFloatingElements(container) {
    const shapes = ['', 'square', 'triangle'];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        element.className = `floating-element ${shape}`;
        
        // Random size
        const size = Math.random() * 100 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        element.style.opacity = Math.random() * 0.1 + 0.05;
        
        // Random animation delay
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
    }
}

/**
 * Create letterbox effect
 * @param {HTMLElement} container - Container element
 */
function createLetterboxEffect(container) {
    const letterboxTop = document.createElement('div');
    letterboxTop.className = 'letterbox-effect letterbox-top';
    
    const letterboxBottom = document.createElement('div');
    letterboxBottom.className = 'letterbox-effect letterbox-bottom';
    
    container.appendChild(letterboxTop);
    container.appendChild(letterboxBottom);
}

/**
 * Create glitch effect
 * @param {HTMLElement} container - Container element
 */
function createGlitchEffect(container) {
    const glitchEffect = document.createElement('div');
    glitchEffect.className = 'glitch-effect';
    container.appendChild(glitchEffect);
}

/**
 * Create spotlight effect
 * @param {HTMLElement} container - Container element
 */
function createSpotlightEffect(container) {
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    container.appendChild(spotlight);
}

/**
 * Create scroll indicator
 * @param {HTMLElement} container - Container element
 */
function createScrollIndicator(container) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    scrollIndicator.innerHTML = `
        <p>Scroll Down</p>
        <div class="mouse"></div>
    `;
    
    container.appendChild(scrollIndicator);
    
    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.8';
        }
    });
}

/**
 * Initialize mouse movement effect
 * @param {HTMLElement} container - Container element
 */
function initMouseMovement(container) {
    const slides = container.querySelectorAll('.slide');
    
    container.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Move active slide content
        const activeSlide = container.querySelector('.slide.active');
        if (activeSlide) {
            const content = activeSlide.querySelector('.slide-content');
            if (content) {
                content.style.transform = `translateY(-50%) translateX(${x * 20}px)`;
            }
            
            // Parallax effect on image
            const img = activeSlide.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.1) translateX(${x * -30}px) translateY(${y * -30}px)`;
            }
        }
        
        // Move floating elements
        const floatingElements = container.querySelectorAll('.floating-element');
        floatingElements.forEach(element => {
            const speed = Math.random() * 30 + 10;
            element.style.transform = `translateZ(0) translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
        
        // Move spotlight
        const spotlight = container.querySelector('.spotlight');
        if (spotlight) {
            spotlight.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)`;
        }
    });
}

/**
 * Enhanced slider functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hero-slider');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-slide');
    const nextBtn = slider.querySelector('.next-slide');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;
    
    // Initialize slider
    function initSlider() {
        // Set first slide as active
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // Start auto slide
        startSlideInterval();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Add dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Pause auto slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume auto slide on mouse leave
        slider.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Add swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                prevSlide();
            }
        }
    }
    
    // Start auto slide interval
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Reset interval
        clearInterval(slideInterval);
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle index bounds
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Restart interval
        startSlideInterval();
    }
    
    // Initialize slider
    initSlider();
});
