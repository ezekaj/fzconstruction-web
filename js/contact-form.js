/**
 * Contact Form Script
 * Handles contact form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        initContactForm();
    }
});

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    // Form submission
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
            
            console.log('Form submitted with data:', formObject);
            
            // Show success message
            if (successModal) {
                successModal.classList.add('active');
                
                // Reset form
                contactForm.reset();
            } else {
                alert('Thank you for your message! We will get back to you soon.');
                
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
