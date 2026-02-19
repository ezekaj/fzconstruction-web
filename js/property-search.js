/**
 * Property Search Script
 * Handles property search functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize property search
    initPropertySearch();
    
    // Setup sorting
    setupSorting();
    
    // Setup pagination
    setupPagination();
});

/**
 * Initialize property search
 */
function initPropertySearch() {
    const searchForm = document.getElementById('propertySearchForm');
    
    if (!searchForm) return;
    
    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const propertyType = document.getElementById('propertyType').value;
        const location = document.getElementById('location').value;
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const minArea = document.getElementById('minArea').value;
        const maxArea = document.getElementById('maxArea').value;
        
        // Get selected features
        const featureCheckboxes = document.querySelectorAll('input[name="features"]:checked');
        const features = Array.from(featureCheckboxes).map(checkbox => checkbox.value);
        
        // Filter properties
        filterProperties(propertyType, location, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, features);
    });
    
    // Handle form reset
    searchForm.addEventListener('reset', function() {
        // Reset filters after a short delay to allow form to reset
        setTimeout(() => {
            filterProperties('', '', '', '', '', '', '', '', []);
        }, 10);
    });
}

/**
 * Filter properties based on search criteria
 * @param {string} propertyType - Property type
 * @param {string} location - Location
 * @param {string} minPrice - Minimum price
 * @param {string} maxPrice - Maximum price
 * @param {string} bedrooms - Minimum bedrooms
 * @param {string} bathrooms - Minimum bathrooms
 * @param {string} minArea - Minimum area
 * @param {string} maxArea - Maximum area
 * @param {Array} features - Selected features
 */
function filterProperties(propertyType, location, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, features) {
    const propertyCards = document.querySelectorAll('.property-card');
    const resultCount = document.getElementById('resultCount');
    
    if (!propertyCards.length) return;
    
    let visibleCount = 0;
    
    propertyCards.forEach(card => {
        // Get property data
        const cardType = card.getAttribute('data-type');
        const cardLocation = card.getAttribute('data-location');
        const cardPrice = parseInt(card.getAttribute('data-price'));
        const cardBedrooms = parseInt(card.getAttribute('data-bedrooms'));
        const cardBathrooms = parseInt(card.getAttribute('data-bathrooms'));
        const cardArea = parseInt(card.getAttribute('data-area'));
        const cardFeatures = card.getAttribute('data-features').split(',');
        
        // Check if property matches filters
        let isMatch = true;
        
        // Property type filter
        if (propertyType && cardType !== propertyType) {
            isMatch = false;
        }
        
        // Location filter
        if (location && cardLocation !== location) {
            isMatch = false;
        }
        
        // Price filters
        if (minPrice && cardPrice < parseInt(minPrice)) {
            isMatch = false;
        }
        
        if (maxPrice && cardPrice > parseInt(maxPrice)) {
            isMatch = false;
        }
        
        // Bedroom filter
        if (bedrooms && cardBedrooms < parseInt(bedrooms)) {
            isMatch = false;
        }
        
        // Bathroom filter
        if (bathrooms && cardBathrooms < parseInt(bathrooms)) {
            isMatch = false;
        }
        
        // Area filters
        if (minArea && cardArea < parseInt(minArea)) {
            isMatch = false;
        }
        
        if (maxArea && cardArea > parseInt(maxArea)) {
            isMatch = false;
        }
        
        // Features filter
        if (features.length > 0) {
            for (const feature of features) {
                if (!cardFeatures.includes(feature)) {
                    isMatch = false;
                    break;
                }
            }
        }
        
        // Show or hide property
        if (isMatch) {
            card.style.display = 'block';
            visibleCount++;
            
            // Add animation
            card.classList.add('fade-in');
            setTimeout(() => {
                card.classList.remove('fade-in');
            }, 1000);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update result count
    if (resultCount) {
        resultCount.textContent = `(${visibleCount})`;
    }
    
    // Show no results message if no properties match
    const resultsGrid = document.getElementById('searchResults');
    const noResultsMessage = document.querySelector('.no-results');
    
    if (visibleCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.innerHTML = `
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria to find more properties.</p>
                <button class="btn btn-primary" id="resetFiltersBtn">Reset Filters</button>
            `;
            
            resultsGrid.parentNode.insertBefore(message, resultsGrid.nextSibling);
            
            // Add event listener to reset button
            document.getElementById('resetFiltersBtn').addEventListener('click', function() {
                document.getElementById('propertySearchForm').reset();
                filterProperties('', '', '', '', '', '', '', '', []);
            });
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
    
    // Reset pagination to first page
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    if (paginationButtons.length) {
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        paginationButtons[0].classList.add('active');
    }
}

/**
 * Setup sorting functionality
 */
function setupSorting() {
    const sortSelect = document.getElementById('sortBy');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const resultsGrid = document.getElementById('searchResults');
        
        if (!resultsGrid) return;
        
        // Get all visible property cards
        const propertyCards = Array.from(resultsGrid.querySelectorAll('.property-card')).filter(
            card => card.style.display !== 'none'
        );
        
        // Sort property cards
        propertyCards.sort((a, b) => {
            if (sortValue === 'price-asc') {
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            } else if (sortValue === 'price-desc') {
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            } else if (sortValue === 'date-desc') {
                // For demo purposes, we'll just use the current order as "newest first"
                return 0;
            } else if (sortValue === 'area-desc') {
                return parseInt(b.getAttribute('data-area')) - parseInt(a.getAttribute('data-area'));
            }
            
            return 0;
        });
        
        // Reorder property cards in the DOM
        propertyCards.forEach(card => {
            resultsGrid.appendChild(card);
            
            // Add animation
            card.classList.add('fade-in');
            setTimeout(() => {
                card.classList.remove('fade-in');
            }, 1000);
        });
    });
}

/**
 * Setup pagination functionality
 */
function setupPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    const itemsPerPage = 6;
    
    if (!paginationButtons.length || !propertyCards.length) return;
    
    // Initially show only first page items
    showPage(1, propertyCards, itemsPerPage);
    
    paginationButtons.forEach(button => {
        if (button.classList.contains('next')) {
            // Next button
            button.addEventListener('click', function() {
                const activePage = document.querySelector('.pagination-btn.active:not(.next)');
                if (activePage) {
                    const nextPage = activePage.nextElementSibling;
                    if (nextPage && !nextPage.classList.contains('next')) {
                        activePage.classList.remove('active');
                        nextPage.classList.add('active');
                        
                        const pageNumber = parseInt(nextPage.textContent);
                        showPage(pageNumber, propertyCards, itemsPerPage);
                    }
                }
            });
        } else {
            // Number buttons
            button.addEventListener('click', function() {
                paginationButtons.forEach(btn => {
                    if (!btn.classList.contains('next')) {
                        btn.classList.remove('active');
                    }
                });
                
                this.classList.add('active');
                
                const pageNumber = parseInt(this.textContent);
                showPage(pageNumber, propertyCards, itemsPerPage);
            });
        }
    });
}

/**
 * Show specific page of property cards
 * @param {number} pageNumber - Page number to show
 * @param {NodeList} items - Property cards
 * @param {number} itemsPerPage - Number of items per page
 */
function showPage(pageNumber, items, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Get current filters
    const propertyType = document.getElementById('propertyType').value;
    const location = document.getElementById('location').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const minArea = document.getElementById('minArea').value;
    const maxArea = document.getElementById('maxArea').value;
    
    const featureCheckboxes = document.querySelectorAll('input[name="features"]:checked');
    const features = Array.from(featureCheckboxes).map(checkbox => checkbox.value);
    
    // Filter and paginate items
    let visibleCount = 0;
    
    items.forEach(item => {
        // Get property data
        const cardType = item.getAttribute('data-type');
        const cardLocation = item.getAttribute('data-location');
        const cardPrice = parseInt(item.getAttribute('data-price'));
        const cardBedrooms = parseInt(item.getAttribute('data-bedrooms'));
        const cardBathrooms = parseInt(item.getAttribute('data-bathrooms'));
        const cardArea = parseInt(item.getAttribute('data-area'));
        const cardFeatures = item.getAttribute('data-features').split(',');
        
        // Check if property matches filters
        let isMatch = true;
        
        // Property type filter
        if (propertyType && cardType !== propertyType) {
            isMatch = false;
        }
        
        // Location filter
        if (location && cardLocation !== location) {
            isMatch = false;
        }
        
        // Price filters
        if (minPrice && cardPrice < parseInt(minPrice)) {
            isMatch = false;
        }
        
        if (maxPrice && cardPrice > parseInt(maxPrice)) {
            isMatch = false;
        }
        
        // Bedroom filter
        if (bedrooms && cardBedrooms < parseInt(bedrooms)) {
            isMatch = false;
        }
        
        // Bathroom filter
        if (bathrooms && cardBathrooms < parseInt(bathrooms)) {
            isMatch = false;
        }
        
        // Area filters
        if (minArea && cardArea < parseInt(minArea)) {
            isMatch = false;
        }
        
        if (maxArea && cardArea > parseInt(maxArea)) {
            isMatch = false;
        }
        
        // Features filter
        if (features.length > 0) {
            for (const feature of features) {
                if (!cardFeatures.includes(feature)) {
                    isMatch = false;
                    break;
                }
            }
        }
        
        if (isMatch) {
            visibleCount++;
            
            if (visibleCount > startIndex && visibleCount <= endIndex) {
                item.style.display = 'block';
                
                // Add animation
                item.classList.add('fade-in');
                setTimeout(() => {
                    item.classList.remove('fade-in');
                }, 1000);
            } else {
                item.style.display = 'none';
            }
        } else {
            item.style.display = 'none';
        }
    });
}
