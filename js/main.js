document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.header');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-active');
        });
    }

    // Mobile Dropdown Toggle
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to your server
            console.log('Form submitted with data:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }

    // Agent Portal Modal
    const agentLoginBtn = document.querySelector('.agent-login');
    const agentPortal = document.getElementById('agentPortal');
    const closeModal = document.querySelector('.close-modal');
    
    if (agentLoginBtn && agentPortal) {
        agentLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            agentPortal.classList.add('active');
        });
        
        closeModal.addEventListener('click', function() {
            agentPortal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === agentPortal) {
                agentPortal.classList.remove('active');
            }
        });
    }

    // Agent Login Form
    const agentLoginForm = document.getElementById('agentLoginForm');
    
    if (agentLoginForm) {
        agentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('agentEmail').value;
            const password = document.getElementById('agentPassword').value;
            
            // Here you would typically authenticate with your server
            console.log('Agent login attempt:', { email, password });
            
            // For demo purposes, redirect to a dashboard
            alert('Login successful! Redirecting to agent dashboard...');
            // window.location.href = 'agent-dashboard.html';
        });
    }
});
