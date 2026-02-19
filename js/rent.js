/**
 * Rent Page Script
 * Handles rental property functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize property details modal
    initPropertyDetailsModal();
});

/**
 * Initialize property details modal
 */
function initPropertyDetailsModal() {
    const detailButtons = document.querySelectorAll('.property-details-btn');
    const modal = document.getElementById('propertyDetailsModal');
    const modalBody = modal ? modal.querySelector('.property-modal-body') : null;
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    
    if (!detailButtons.length || !modal || !modalBody) return;
    
    // Property details data
    const propertyDetails = {
        'apartment-1': {
            title: 'Green Terrace Apartment',
            location: 'Tirana, Albania',
            price: '€800/month',
            description: 'Modern furnished apartment in the Green Terrace Complex with a balcony and parking space. This bright and spacious apartment features 2 bedrooms, 1 bathroom, a fully equipped kitchen, and a comfortable living area. The apartment is located in a secure building with 24/7 security and offers easy access to public transportation, shopping centers, and restaurants.',
            features: [
                'Furnished',
                '2 Bedrooms',
                '1 Bathroom',
                '85 m²',
                'Balcony',
                'Parking Space',
                'Elevator',
                'Security',
                'Air Conditioning',
                'Heating',
                'Fully Equipped Kitchen',
                'Washing Machine'
            ],
            images: [
                'images/properties/apartment-rent-1.jpg',
                'images/properties/apartment-rent-1-living.jpg',
                'images/properties/apartment-rent-1-kitchen.jpg',
                'images/properties/apartment-rent-1-bedroom.jpg'
            ],
            availability: 'Available Now',
            minStay: '12 months',
            deposit: '2 months rent',
            utilities: 'Not included',
            pets: 'Not allowed',
            contactName: 'John Smith',
            contactPhone: '+355 68 2066 202',
            contactEmail: 'rentals@fz-construction.com'
        },
        'villa-1': {
            title: 'Forest Villa',
            location: 'Tirana, Albania',
            price: '€2,500/month',
            description: 'Luxury furnished villa in the Forest Villas complex with garden and security. This elegant villa offers 4 bedrooms, 3 bathrooms, a spacious living and dining area, a fully equipped modern kitchen, and a private garden. The villa is located in a secure gated community with 24/7 security and offers a peaceful living environment surrounded by nature.',
            features: [
                'Furnished',
                '4 Bedrooms',
                '3 Bathrooms',
                '250 m²',
                'Private Garden',
                'Parking Space',
                'Security',
                'Air Conditioning',
                'Heating',
                'Fully Equipped Kitchen',
                'Washing Machine',
                'Dishwasher',
                'Fireplace'
            ],
            images: [
                'images/properties/villa-rent-1.jpg',
                'images/properties/villa-rent-1-living.jpg',
                'images/properties/villa-rent-1-kitchen.jpg',
                'images/properties/villa-rent-1-bedroom.jpg'
            ],
            availability: 'Available from July 1, 2023',
            minStay: '12 months',
            deposit: '2 months rent',
            utilities: 'Not included',
            pets: 'Allowed with deposit',
            contactName: 'Maria Johnson',
            contactPhone: '+355 68 2066 202',
            contactEmail: 'rentals@fz-construction.com'
        },
        'office-1': {
            title: 'Corner Building Office',
            location: 'Tirana, Albania',
            price: '€1,200/month',
            description: 'Modern office space in the Corner Building with parking and security. This professional office space offers an open floor plan with 150 m² of usable space, a reception area, a meeting room, and a kitchenette. The office is located in a prime business district with easy access to public transportation, restaurants, and other amenities.',
            features: [
                'Open Floor Plan',
                '1 Meeting Room',
                '1 Bathroom',
                '150 m²',
                'Reception Area',
                'Kitchenette',
                'Parking Space',
                'Elevator',
                'Security',
                'Air Conditioning',
                'Heating',
                'High-Speed Internet Ready'
            ],
            images: [
                'images/properties/office-rent-1.jpg',
                'images/properties/office-rent-1-interior.jpg',
                'images/properties/office-rent-1-meeting.jpg',
                'images/properties/office-rent-1-reception.jpg'
            ],
            availability: 'Available Now',
            minStay: '12 months',
            deposit: '2 months rent',
            utilities: 'Not included',
            contactName: 'Robert Williams',
            contactPhone: '+355 68 2066 202',
            contactEmail: 'rentals@fz-construction.com'
        }
    };
    
    // Open modal when detail button is clicked
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const propertyId = this.getAttribute('data-property');
            const property = propertyDetails[propertyId];
            
            if (property) {
                // Generate modal content
                modalBody.innerHTML = generatePropertyModalContent(property);
                
                // Show modal
                modal.classList.add('active');
                
                // Prevent scrolling on body
                document.body.style.overflow = 'hidden';
                
                // Initialize image slider
                initImageSlider();
            }
        });
    });
    
    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closePropertyModal();
        });
    }
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePropertyModal();
        }
    });
    
    // Close modal when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePropertyModal();
        }
    });
    
    /**
     * Generate property modal content
     * @param {Object} property - Property data
     * @returns {string} Modal content HTML
     */
    function generatePropertyModalContent(property) {
        // Generate image slider HTML
        let imagesHTML = '';
        if (property.images && property.images.length) {
            imagesHTML = `
                <div class="property-images">
                    <div class="image-slider">
                        <div class="slider-container">
                            ${property.images.map((image, index) => `
                                <div class="slider-slide${index === 0 ? ' active' : ''}">
                                    <img src="${image}" alt="${property.title} - Image ${index + 1}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                        <button class="slider-prev"><i class="fas fa-chevron-left"></i></button>
                        <button class="slider-next"><i class="fas fa-chevron-right"></i></button>
                    </div>
                    <div class="slider-dots">
                        ${property.images.map((_, index) => `
                            <span class="slider-dot${index === 0 ? ' active' : ''}" data-slide="${index}"></span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Generate features HTML
        let featuresHTML = '';
        if (property.features && property.features.length) {
            featuresHTML = `
                <div class="property-features-list">
                    <h3>Features</h3>
                    <ul>
                        ${property.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Generate details HTML
        let detailsHTML = '';
        if (property.availability) {
            detailsHTML += `
                <div class="property-detail-item">
                    <span class="detail-label">Availability:</span>
                    <span class="detail-value">${property.availability}</span>
                </div>
            `;
        }
        
        if (property.minStay) {
            detailsHTML += `
                <div class="property-detail-item">
                    <span class="detail-label">Minimum Stay:</span>
                    <span class="detail-value">${property.minStay}</span>
                </div>
            `;
        }
        
        if (property.deposit) {
            detailsHTML += `
                <div class="property-detail-item">
                    <span class="detail-label">Deposit:</span>
                    <span class="detail-value">${property.deposit}</span>
                </div>
            `;
        }
        
        if (property.utilities) {
            detailsHTML += `
                <div class="property-detail-item">
                    <span class="detail-label">Utilities:</span>
                    <span class="detail-value">${property.utilities}</span>
                </div>
            `;
        }
        
        if (property.pets) {
            detailsHTML += `
                <div class="property-detail-item">
                    <span class="detail-label">Pets:</span>
                    <span class="detail-value">${property.pets}</span>
                </div>
            `;
        }
        
        // Generate contact HTML
        let contactHTML = '';
        if (property.contactName || property.contactPhone || property.contactEmail) {
            contactHTML = `
                <div class="property-contact-info">
                    <h3>Contact Information</h3>
                    ${property.contactName ? `<p><strong>Contact:</strong> ${property.contactName}</p>` : ''}
                    ${property.contactPhone ? `<p><strong>Phone:</strong> <a href="tel:${property.contactPhone.replace(/\s+/g, '')}">${property.contactPhone}</a></p>` : ''}
                    ${property.contactEmail ? `<p><strong>Email:</strong> <a href="mailto:${property.contactEmail}">${property.contactEmail}</a></p>` : ''}
                    <button class="btn btn-primary contact-btn">Request Viewing</button>
                </div>
            `;
        }
        
        // Return complete modal content
        return `
            <div class="property-modal-header">
                <h2>${property.title}</h2>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-price">${property.price}</div>
            </div>
            
            ${imagesHTML}
            
            <div class="property-modal-content-grid">
                <div class="property-description-container">
                    <h3>Description</h3>
                    <p>${property.description}</p>
                    
                    <div class="property-details-container">
                        <h3>Details</h3>
                        <div class="property-details-list">
                            ${detailsHTML}
                        </div>
                    </div>
                </div>
                
                <div class="property-sidebar">
                    ${featuresHTML}
                    ${contactHTML}
                </div>
            </div>
        `;
    }
    
    /**
     * Close property modal
     */
    function closePropertyModal() {
        modal.classList.remove('active');
        
        // Re-enable scrolling on body
        document.body.style.overflow = '';
        
        // Clear modal content after animation
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    }
    
    /**
     * Initialize image slider
     */
    function initImageSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const slides = document.querySelectorAll('.slider-slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (!sliderContainer || !slides.length) return;
        
        let currentSlide = 0;
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Dot click
        if (dots.length) {
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
        }
        
        /**
         * Go to specific slide
         * @param {number} index - Slide index
         */
        function goToSlide(index) {
            // Handle index bounds
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
    }
}
