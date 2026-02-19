/**
 * Property Page Script
 * Handles property page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize property gallery
    initPropertyGallery();
    
    // Initialize floor plan tabs
    initFloorPlanTabs();
    
    // Initialize property map
    initPropertyMap();
    
    // Initialize property contact form
    initPropertyContactForm();
    
    // Initialize share button
    initShareButton();
});

/**
 * Initialize property gallery with lightbox
 */
function initPropertyGallery() {
    const galleryElement = document.getElementById('propertyGallery');
    
    if (galleryElement) {
        lightGallery(galleryElement, {
            selector: '.gallery-item',
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
 * Initialize floor plan tabs
 */
function initFloorPlanTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize property map
 */
function initPropertyMap() {
    const mapElement = document.getElementById('propertyMap');
    
    if (mapElement) {
        // Tirana coordinates (approximate location for property)
        const lat = 41.3275;
        const lng = 19.8187;
        
        // Create map
        const map = L.map('propertyMap').setView([lat, lng], 15);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add marker
        const marker = L.marker([lat, lng]).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <strong>Green Terrace Complex</strong><br>
            Tirana, Albania<br>
            <a href="tel:+35568206202">+355 68 2066 202</a>
        `).openPopup();
        
        // Make map responsive
        window.addEventListener('resize', function() {
            map.invalidateSize();
        });
    }
}

/**
 * Initialize property contact form
 */
function initPropertyContactForm() {
    const contactForm = document.getElementById('propertyContactForm');
    const successModal = document.getElementById('successModal');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // In a real application, you would send the form data to the server here
            // For demo purposes, we'll just show the success message
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Property inquiry submitted:', formObject);
            
            // Show success message
            if (successModal) {
                successModal.classList.add('active');
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Thank you for your interest! We will contact you shortly.');
                
                // Reset form
                contactForm.reset();
            }
        }
    });
    
    // Close success modal
    if (successModal) {
        const closeButtons = successModal.querySelectorAll('.close-modal, .close-success-btn');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                successModal.classList.remove('active');
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
}

/**
 * Validate contact form
 * @returns {boolean} True if form is valid
 */
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');
    
    let isValid = true;
    
    // Reset error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    }
    
    // Validate privacy checkbox
    if (!privacy.checked) {
        showError(privacy, 'You must agree to the privacy policy');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show error message for form field
 * @param {HTMLElement} element - Form field element
 * @param {string} message - Error message
 */
function showError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Add error message after the element or its label
    if (element.type === 'checkbox') {
        element.parentNode.appendChild(errorElement);
    } else {
        element.parentNode.appendChild(errorElement);
    }
    
    // Add error class to element
    element.classList.add('error');
    
    // Remove error class on input
    element.addEventListener('input', function() {
        element.classList.remove('error');
        const error = element.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize share button
 */
function initShareButton() {
    const shareBtn = document.querySelector('.share-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if Web Share API is supported
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                // Fallback for browsers that don't support Web Share API
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = window.location.href;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                alert('Link copied to clipboard!');
            }
        });
    }
}
