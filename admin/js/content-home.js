/**
 * Home Page Content Editor
 * Handles editing of home page content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Setup slider section
    setupSliderSection();
    
    // Setup about section
    setupAboutSection();
    
    // Setup features section
    setupFeaturesSection();
    
    // Setup projects section
    setupProjectsSection();
    
    // Setup values section
    setupValuesSection();
    
    // Setup save buttons
    setupSaveButtons();
});

/**
 * Setup slider section
 */
function setupSliderSection() {
    // Setup repeater for slides
    setupRepeater('#slidesContainer', createSlideTemplate, '#addSlideBtn');
    
    // Setup image uploads
    const slideImages = document.querySelectorAll('#slidesContainer .image-preview img');
    const slideImageInputs = document.querySelectorAll('#slidesContainer input[type="file"]');
    
    for (let i = 0; i < slideImages.length; i++) {
        if (slideImageInputs[i]) {
            handleImageUpload(slideImageInputs[i], slideImages[i]);
        }
    }
}

/**
 * Create slide template
 * @param {number} index - Slide index
 * @returns {string} Slide HTML
 */
function createSlideTemplate(index) {
    return `
        <div class="slide-item">
            <div class="slide-header">
                <h4>Slide ${index}</h4>
                <div class="slide-actions">
                    <button class="btn btn-sm btn-icon move-up-btn"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-icon move-down-btn"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-icon delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="slide-content">
                <div class="form-row">
                    <div class="form-group">
                        <label for="slide${index}-title">Title</label>
                        <input type="text" id="slide${index}-title" name="slide${index}-title" value="New Slide">
                    </div>
                    <div class="form-group">
                        <label for="slide${index}-subtitle">Subtitle</label>
                        <input type="text" id="slide${index}-subtitle" name="slide${index}-subtitle" value="">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="slide${index}-link">Link</label>
                        <input type="text" id="slide${index}-link" name="slide${index}-link" value="#">
                    </div>
                    <div class="form-group">
                        <label for="slide${index}-button">Button Text</label>
                        <input type="text" id="slide${index}-button" name="slide${index}-button" value="VISIT">
                    </div>
                </div>
                <div class="form-group">
                    <label for="slide${index}-image">Image</label>
                    <div class="image-upload-container">
                        <div class="image-preview">
                            <img src="https://via.placeholder.com/800x500" alt="Slide ${index}">
                        </div>
                        <div class="image-upload-controls">
                            <input type="file" id="slide${index}-image" name="slide${index}-image" accept="image/*">
                            <button class="btn btn-sm btn-secondary">Choose Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup about section
 */
function setupAboutSection() {
    // Setup repeater for about points
    setupRepeater('#aboutPointsContainer', createAboutPointTemplate, '#addAboutPointBtn');
    
    // Setup image upload
    const aboutImage = document.querySelector('#about .image-preview img');
    const aboutImageInput = document.querySelector('#about-image');
    
    if (aboutImage && aboutImageInput) {
        handleImageUpload(aboutImageInput, aboutImage);
    }
}

/**
 * Create about point template
 * @param {number} index - Point index
 * @returns {string} Point HTML
 */
function createAboutPointTemplate(index) {
    return `
        <div class="repeater-item">
            <input type="text" name="about-point-${index}" value="New point">
            <button class="btn btn-sm btn-icon delete-btn"><i class="fas fa-times"></i></button>
        </div>
    `;
}

/**
 * Setup features section
 */
function setupFeaturesSection() {
    // Setup repeater for features
    setupRepeater('#featuresContainer', createFeatureTemplate, '#addFeatureBtn');
    
    // Setup image uploads
    const featureIcons = document.querySelectorAll('#featuresContainer .image-preview img');
    const featureIconInputs = document.querySelectorAll('#featuresContainer input[type="file"]');
    
    for (let i = 0; i < featureIcons.length; i++) {
        if (featureIconInputs[i]) {
            handleImageUpload(featureIconInputs[i], featureIcons[i]);
        }
    }
}

/**
 * Create feature template
 * @param {number} index - Feature index
 * @returns {string} Feature HTML
 */
function createFeatureTemplate(index) {
    return `
        <div class="feature-item">
            <div class="feature-header">
                <h4>Feature ${index}</h4>
                <div class="feature-actions">
                    <button class="btn btn-sm btn-icon move-up-btn"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-icon move-down-btn"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-icon delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="feature-content">
                <div class="form-group">
                    <label for="feature${index}-title">Title</label>
                    <input type="text" id="feature${index}-title" name="feature${index}-title" value="New Feature">
                </div>
                <div class="form-group">
                    <label for="feature${index}-description">Description</label>
                    <textarea id="feature${index}-description" name="feature${index}-description" rows="2">Feature description goes here</textarea>
                </div>
                <div class="form-group">
                    <label for="feature${index}-icon">Icon</label>
                    <div class="image-upload-container">
                        <div class="image-preview">
                            <img src="https://via.placeholder.com/100" alt="Feature ${index} Icon">
                        </div>
                        <div class="image-upload-controls">
                            <input type="file" id="feature${index}-icon" name="feature${index}-icon" accept="image/*">
                            <button class="btn btn-sm btn-secondary">Choose Icon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup projects section
 */
function setupProjectsSection() {
    // Setup repeater for projects
    setupRepeater('#projectsContainer', createProjectTemplate, '#addProjectBtn');
    
    // Setup image uploads
    const projectImages = document.querySelectorAll('#projectsContainer .image-preview img');
    const projectImageInputs = document.querySelectorAll('#projectsContainer input[type="file"]');
    
    for (let i = 0; i < projectImages.length; i++) {
        if (projectImageInputs[i]) {
            handleImageUpload(projectImageInputs[i], projectImages[i]);
        }
    }
}

/**
 * Create project template
 * @param {number} index - Project index
 * @returns {string} Project HTML
 */
function createProjectTemplate(index) {
    return `
        <div class="project-item">
            <div class="project-header">
                <h4>New Project</h4>
                <div class="project-actions">
                    <button class="btn btn-sm btn-icon move-up-btn"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-icon move-down-btn"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-icon delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="project-content">
                <div class="form-group">
                    <label for="project${index}-title">Title</label>
                    <input type="text" id="project${index}-title" name="project${index}-title" value="New Project">
                </div>
                <div class="form-group">
                    <label for="project${index}-link">Link</label>
                    <input type="text" id="project${index}-link" name="project${index}-link" value="#">
                </div>
                <div class="form-group">
                    <label for="project${index}-image">Image</label>
                    <div class="image-upload-container">
                        <div class="image-preview">
                            <img src="https://via.placeholder.com/400x300" alt="Project Image">
                        </div>
                        <div class="image-upload-controls">
                            <input type="file" id="project${index}-image" name="project${index}-image" accept="image/*">
                            <button class="btn btn-sm btn-secondary">Choose Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup values section
 */
function setupValuesSection() {
    // Setup repeater for stats
    setupRepeater('#statsContainer', createStatTemplate, '#addStatBtn');
}

/**
 * Create stat template
 * @param {number} index - Stat index
 * @returns {string} Stat HTML
 */
function createStatTemplate(index) {
    return `
        <div class="stat-item">
            <div class="stat-header">
                <h4>New Statistic</h4>
                <div class="stat-actions">
                    <button class="btn btn-sm btn-icon move-up-btn"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-icon move-down-btn"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-icon delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="stat-content">
                <div class="form-row">
                    <div class="form-group">
                        <label for="stat${index}-value">Value</label>
                        <input type="number" id="stat${index}-value" name="stat${index}-value" value="100">
                    </div>
                    <div class="form-group">
                        <label for="stat${index}-unit">Unit</label>
                        <input type="text" id="stat${index}-unit" name="stat${index}-unit" value="%">
                    </div>
                </div>
                <div class="form-group">
                    <label for="stat${index}-title">Title</label>
                    <input type="text" id="stat${index}-title" name="stat${index}-title" value="New Statistic">
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup save buttons
 */
function setupSaveButtons() {
    // Slider save button
    const saveSliderBtn = document.getElementById('saveSliderBtn');
    if (saveSliderBtn) {
        saveSliderBtn.addEventListener('click', function() {
            // In a real app, this would save to the server
            showNotification('Slider content saved successfully!', 'success');
        });
    }
    
    // About save button
    const saveAboutBtn = document.getElementById('saveAboutBtn');
    if (saveAboutBtn) {
        saveAboutBtn.addEventListener('click', function() {
            // In a real app, this would save to the server
            showNotification('About section saved successfully!', 'success');
        });
    }
    
    // Features save button
    const saveFeaturesBtn = document.getElementById('saveFeaturesBtn');
    if (saveFeaturesBtn) {
        saveFeaturesBtn.addEventListener('click', function() {
            // In a real app, this would save to the server
            showNotification('Features section saved successfully!', 'success');
        });
    }
    
    // Projects save button
    const saveProjectsBtn = document.getElementById('saveProjectsBtn');
    if (saveProjectsBtn) {
        saveProjectsBtn.addEventListener('click', function() {
            // In a real app, this would save to the server
            showNotification('Projects section saved successfully!', 'success');
        });
    }
    
    // Values save button
    const saveValuesBtn = document.getElementById('saveValuesBtn');
    if (saveValuesBtn) {
        saveValuesBtn.addEventListener('click', function() {
            // In a real app, this would save to the server
            showNotification('Values section saved successfully!', 'success');
        });
    }
}
