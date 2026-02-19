document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Animation System
    initCountUpAnimation();
    initParallaxEffects();
    initScrollAnimations();
    initTiltEffects();
    initTypewriterEffects();
    initStaggeredAnimations();
    initHoverAnimations();
    initRippleEffects();
    initAnimatedBackgrounds();

    /**
     * Initialize Count Up Animation for Statistics
     */
    function initCountUpAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');

        function animateCountUp(element, target, duration) {
            // Get any suffix (like + or %)
            const text = element.textContent;
            const suffix = text.replace(/[0-9]/g, '');

            let start = 0;
            const increment = target / (duration / 16);

            function updateCount() {
                start += increment;

                if (start >= target) {
                    element.textContent = target + suffix;
                    return;
                }

                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCount);
            }

            updateCount();
        }

        function handleCountUpAnimation() {
            statNumbers.forEach(statNumber => {
                const elementTop = statNumber.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100 && !statNumber.classList.contains('animated')) {
                    // Extract the number from the text
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));

                    animateCountUp(statNumber, number, 2000);
                    statNumber.classList.add('animated');
                }
            });
        }

        // Initial check
        handleCountUpAnimation();

        // Check on scroll
        window.addEventListener('scroll', handleCountUpAnimation);
    }

    /**
     * Initialize Parallax Effects
     */
    function initParallaxEffects() {
        // Hero Section Parallax
        const heroSection = document.querySelector('.hero-slider');

        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                const parallaxSpeed = 0.5;

                // Apply parallax effect to active slide
                const activeSlide = heroSection.querySelector('.slide.active img');
                if (activeSlide) {
                    activeSlide.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
                }
            });
        }

        // General Parallax Elements
        const parallaxElements = document.querySelectorAll('.parallax-element');

        if (parallaxElements.length) {
            window.addEventListener('scroll', function() {
                parallaxElements.forEach(element => {
                    const scrollPosition = window.pageYOffset;
                    const elementTop = element.offsetTop;
                    const elementHeight = element.offsetHeight;
                    const windowHeight = window.innerHeight;

                    // Check if element is in viewport
                    if (scrollPosition + windowHeight > elementTop &&
                        scrollPosition < elementTop + elementHeight) {

                        const distance = (scrollPosition + windowHeight - elementTop) / windowHeight;
                        const speed = element.getAttribute('data-parallax-speed') || 0.2;

                        element.style.transform = `translateY(${distance * 100 * speed}px)`;
                    }
                });
            });

            // Mouse movement parallax
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;

                parallaxElements.forEach(element => {
                    if (element.classList.contains('mouse-parallax')) {
                        const speed = element.getAttribute('data-mouse-speed') || 20;
                        element.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
                    }
                });
            });
        }
    }

    /**
     * Initialize Scroll Animations
     */
    function initScrollAnimations() {
        // All elements with animation classes
        const animationClasses = [
            '.fade-in', '.fade-in-up', '.fade-in-down', '.fade-in-left', '.fade-in-right',
            '.slide-in-right', '.slide-in-left', '.scale-in', '.rotate-in', '.rotate-in-x',
            '.rotate-in-y', '.flip-in', '.flip-in-x', '.zoom-in', '.zoom-in-rotate'
        ];

        const animatedElements = document.querySelectorAll(animationClasses.join(', '));

        // Elements with scroll-triggered animations
        const scrollAnimationElements = document.querySelectorAll('.animate-on-scroll');

        function checkElementsInView() {
            // Check regular animated elements
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 50) {
                    element.style.animationPlayState = 'running';
                }
            });

            // Check scroll-triggered elements
            scrollAnimationElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                // Element is in viewport
                if (elementTop < windowHeight - 50 && elementBottom > 0) {
                    element.classList.add('visible');
                } else if (element.classList.contains('animate-once')) {
                    // Keep the animation if it should only animate once
                    // Do nothing
                } else {
                    // Reset the animation when out of viewport
                    element.classList.remove('visible');
                }
            });
        }

        // Set initial state to paused for elements not in initial view
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop >= windowHeight - 50) {
                element.style.animationPlayState = 'paused';
            }
        });

        // Check on scroll with throttling for performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    checkElementsInView();
                    scrollTimeout = null;
                }, 10);
            }
        });

        // Initial check
        checkElementsInView();
    }

    /**
     * Initialize 3D Tilt Effects
     */
    function initTiltEffects() {
        const tiltElements = document.querySelectorAll('.tilt-effect');

        tiltElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const tiltX = (y - centerY) / centerY * 10;
                const tiltY = (centerX - x) / centerX * 10;

                element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            element.addEventListener('mouseleave', function() {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * Initialize Typewriter Effects
     */
    function initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter');

        typewriterElements.forEach(element => {
            // Store the original text
            const originalText = element.textContent;
            element.setAttribute('data-text', originalText);
            element.textContent = '';

            // Create a function to start the typewriter effect
            function startTypewriter() {
                const text = element.getAttribute('data-text');
                element.textContent = '';
                element.style.width = '0';

                // Reset animation
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.animation = `typewriter ${text.length * 0.1}s steps(${text.length}, end) forwards, blinkCursor 0.75s step-end infinite`;

                // Set the text after animation starts
                setTimeout(() => {
                    element.textContent = text;
                }, 100);
            }

            // Start typewriter when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startTypewriter();
                        // Only trigger once
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    /**
     * Initialize Staggered Animations
     */
    function initStaggeredAnimations() {
        const staggerGroups = document.querySelectorAll('.stagger-group');

        staggerGroups.forEach(group => {
            const children = group.children;
            const animationClass = group.getAttribute('data-animation') || 'fade-in';

            // Apply animation class to all children
            Array.from(children).forEach(child => {
                child.classList.add(animationClass);
            });

            // Create observer to trigger animations when group is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start animations
                        Array.from(children).forEach(child => {
                            child.style.animationPlayState = 'running';
                        });
                        // Only trigger once
                        observer.unobserve(group);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(group);
        });
    }

    /**
     * Initialize Hover Animations
     */
    function initHoverAnimations() {
        // Button animations
        const animatedButtons = document.querySelectorAll('.btn-animated');

        animatedButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });

            button.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });

        // Hover lift effect
        const hoverLiftElements = document.querySelectorAll('.hover-lift');

        hoverLiftElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    /**
     * Initialize Ripple Effects
     */
    function initRippleEffects() {
        const rippleButtons = document.querySelectorAll('.btn-ripple');

        rippleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    /**
     * Initialize Animated Backgrounds
     */
    function initAnimatedBackgrounds() {
        // Gradient backgrounds are handled by CSS

        // Particle backgrounds
        const particleContainers = document.querySelectorAll('.particle-bg');

        particleContainers.forEach(container => {
            const particleCount = container.getAttribute('data-particles') || 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';

                // Random size
                const size = Math.random() * 5 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';

                // Random animation duration
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = duration + 's';

                // Random animation delay
                const delay = Math.random() * 5;
                particle.style.animationDelay = delay + 's';

                container.appendChild(particle);
            }
        });
    }
});
