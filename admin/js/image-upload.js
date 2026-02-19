/**
 * Image Upload Script
 * Handles image uploads and management for FZ Construction
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dropzone
    initDropzone();
    
    // Initialize category-subcategory relationship
    initCategories();
    
    // Initialize image gallery
    loadImages();
    
    // Initialize event listeners
    initEventListeners();
});

/**
 * Initialize Dropzone for image uploads
 */
function initDropzone() {
    // Disable auto discover
    Dropzone.autoDiscover = false;
    
    // Initialize dropzone
    const myDropzone = new Dropzone("#imageUpload", {
        url: "upload.php", // This would be your server-side upload handler
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 5, // MB
        maxFiles: 10,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictRemoveFile: "Remove",
        autoProcessQueue: false,
        thumbnailWidth: 120,
        thumbnailHeight: 120
    });
    
    // Process uploads button
    document.getElementById('processUpload').addEventListener('click', function() {
        // Get category and subcategory
        const category = document.getElementById('uploadCategory').value;
        const subcategory = document.getElementById('uploadSubcategory').value;
        
        // Add category and subcategory to each file
        myDropzone.files.forEach(file => {
            file.category = category;
            file.subcategory = subcategory;
        });
        
        // Process the queue
        myDropzone.processQueue();
    });
    
    // Cancel uploads button
    document.getElementById('cancelUpload').addEventListener('click', function() {
        myDropzone.removeAllFiles(true);
    });
    
    // Handle upload success
    myDropzone.on("success", function(file, response) {
        console.log("File uploaded successfully:", file.name);
        
        // In a real implementation, you would parse the response from the server
        // and add the new image to the gallery
        
        // For demo purposes, we'll just add a mock image card
        addImageToGallery({
            id: Date.now(),
            name: file.name,
            path: URL.createObjectURL(file),
            category: file.category,
            subcategory: file.subcategory,
            date: new Date().toISOString()
        });
    });
    
    // Handle all files uploaded
    myDropzone.on("queuecomplete", function() {
        // Reload images
        loadImages();
        
        // Clear dropzone
        setTimeout(() => {
            myDropzone.removeAllFiles(true);
        }, 2000);
    });
}

/**
 * Initialize category-subcategory relationship
 */
function initCategories() {
    const categories = {
        properties: ["Green Terrace", "Forest Villas", "Corner Building"],
        gallery: ["Exteriors", "Interiors", "Construction"],
        team: ["Management", "Staff", "Partners"],
        slider: ["Home", "About", "Projects"],
        testimonials: ["Clients"]
    };
    
    const categorySelect = document.getElementById('uploadCategory');
    const subcategorySelect = document.getElementById('uploadSubcategory');
    
    // Update subcategories when category changes
    categorySelect.addEventListener('change', function() {
        const category = this.value;
        const subcategories = categories[category] || [];
        
        // Clear subcategory select
        subcategorySelect.innerHTML = '<option value="all">All</option>';
        
        // Add subcategories
        subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory.toLowerCase().replace(/\s+/g, '-');
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    });
    
    // Trigger change event to populate subcategories
    categorySelect.dispatchEvent(new Event('change'));
}

/**
 * Load images from server
 */
function loadImages() {
    // In a real implementation, you would fetch images from the server
    // For demo purposes, we'll just use the existing images
    
    const imageGrid = document.getElementById('imageGrid');
    const filterCategory = document.getElementById('filterCategory').value;
    
    // Clear image grid
    // imageGrid.innerHTML = '';
    
    // In a real implementation, you would fetch images from the server based on the filter
    // For demo purposes, we'll just keep the existing images
}

/**
 * Add image to gallery
 * @param {Object} image - Image data
 */
function addImageToGallery(image) {
    const imageGrid = document.getElementById('imageGrid');
    
    // Create image card
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';
    imageCard.dataset.id = image.id;
    imageCard.dataset.category = image.category;
    imageCard.dataset.subcategory = image.subcategory;
    
    // Image preview
    const imagePreview = document.createElement('div');
    imagePreview.className = 'image-preview';
    const img = document.createElement('img');
    img.src = image.path;
    img.alt = image.name;
    imagePreview.appendChild(img);
    
    // Image info
    const imageInfo = document.createElement('div');
    imageInfo.className = 'image-info';
    const imageName = document.createElement('p');
    imageName.className = 'image-name';
    imageName.textContent = image.name;
    const imageCategory = document.createElement('p');
    imageCategory.className = 'image-category';
    imageCategory.textContent = image.category;
    imageInfo.appendChild(imageName);
    imageInfo.appendChild(imageCategory);
    
    // Image actions
    const imageActions = document.createElement('div');
    imageActions.className = 'image-actions';
    
    // Copy URL button
    const copyUrlBtn = document.createElement('button');
    copyUrlBtn.className = 'btn-icon copy-url';
    copyUrlBtn.title = 'Copy URL';
    copyUrlBtn.innerHTML = '<i class="fas fa-link"></i>';
    copyUrlBtn.addEventListener('click', function() {
        copyImageUrl(image.path);
    });
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete-image';
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', function() {
        deleteImage(image.id);
    });
    
    imageActions.appendChild(copyUrlBtn);
    imageActions.appendChild(deleteBtn);
    
    // Append all elements
    imageCard.appendChild(imagePreview);
    imageCard.appendChild(imageInfo);
    imageCard.appendChild(imageActions);
    
    // Add to grid
    imageGrid.prepend(imageCard);
}

/**
 * Copy image URL to clipboard
 * @param {string} url - Image URL
 */
function copyImageUrl(url) {
    // Create temporary input
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    
    // Select and copy
    input.select();
    document.execCommand('copy');
    
    // Remove temporary input
    document.body.removeChild(input);
    
    // Show notification
    showNotification('URL copied to clipboard!');
}

/**
 * Delete image
 * @param {string} id - Image ID
 */
function deleteImage(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this image?')) {
        // In a real implementation, you would send a request to the server to delete the image
        // For demo purposes, we'll just remove the image card
        
        const imageCard = document.querySelector(`.image-card[data-id="${id}"]`);
        if (imageCard) {
            imageCard.remove();
            showNotification('Image deleted successfully!');
        }
    }
}

/**
 * Show notification
 * @param {string} message - Notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove notification after animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Filter category change
    document.getElementById('filterCategory').addEventListener('change', function() {
        loadImages();
    });
}
