/**
 * Gallery Script for FZ Construction
 * Handles gallery filtering, pagination, and lightbox
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox
    initLightbox();
    
    // Setup gallery filtering
    setupGalleryFilter();
    
    // Setup gallery pagination
    setupGalleryPagination();
    
    // Load gallery items from CMS
    loadGalleryItems();
});

/**
 * Initialize lightbox
 */
function initLightbox() {
    const galleryElement = document.getElementById('lightgallery');
    
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
 * Setup gallery filtering
 */
function setupGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // Add animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 1000);
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset pagination to first page
            const paginationButtons = document.querySelectorAll('.pagination-btn');
            if (paginationButtons.length) {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                paginationButtons[0].classList.add('active');
            }
        });
    });
}

/**
 * Setup gallery pagination
 */
function setupGalleryPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemsPerPage = 6;
    
    if (!paginationButtons.length || !galleryItems.length) return;
    
    // Initially show only first page items
    showPage(1, galleryItems, itemsPerPage);
    
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
                        showPage(pageNumber, galleryItems, itemsPerPage);
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
                showPage(pageNumber, galleryItems, itemsPerPage);
            });
        }
    });
}

/**
 * Show specific page of gallery items
 * @param {number} pageNumber - Page number to show
 * @param {NodeList} items - Gallery items
 * @param {number} itemsPerPage - Number of items per page
 */
function showPage(pageNumber, items, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Get current filter
    const activeFilter = document.querySelector('.filter-btn.active');
    const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    
    // Filter and paginate items
    let visibleCount = 0;
    
    items.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const isVisible = filter === 'all' || category === filter;
        
        if (isVisible) {
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

/**
 * Load gallery items from CMS
 */
function loadGalleryItems() {
    // In a real app, this would fetch from the API
    // For now, we'll use the static items already in the HTML
    
    // Example of how to add a new gallery item dynamically:
    /*
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (galleryGrid) {
        const newItem = document.createElement('a');
        newItem.href = 'images/gallery/new-image.jpg';
        newItem.className = 'gallery-item';
        newItem.setAttribute('data-category', 'residential');
        newItem.setAttribute('data-src', 'images/gallery/new-image.jpg');
        
        newItem.innerHTML = `
            <img src="images/gallery/new-image-thumb.jpg" alt="New Project" class="gallery-img">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>New Project</h3>
                    <p>Residential Building</p>
                    <span class="view-icon"><i class="fas fa-search-plus"></i></span>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(newItem);
    }
    */
}
