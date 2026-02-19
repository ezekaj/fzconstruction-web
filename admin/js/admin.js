/**
 * Admin Panel Main Script
 * Handles common functionality across the admin panel
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Setup logout functionality
    setupLogout();
    
    // Setup tab navigation
    setupTabs();
});

/**
 * Check if user is authenticated
 * Redirects to login page if not authenticated
 */
function checkAuth() {
    const adminAuth = sessionStorage.getItem('adminAuth');
    const isLoginPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname.endsWith('/admin/');
    
    if (!adminAuth && !isLoginPage) {
        // Redirect to login page
        window.location.href = 'index.html';
        return;
    }
    
    if (adminAuth && !isLoginPage) {
        // Update UI with user info
        const auth = JSON.parse(adminAuth);
        const usernameElement = document.querySelector('.admin-username');
        
        if (usernameElement) {
            usernameElement.textContent = auth.name;
        }
    }
}

/**
 * Setup logout functionality
 */
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear authentication
            sessionStorage.removeItem('adminAuth');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
}

/**
 * Setup tab navigation
 */
function setupTabs() {
    const tabNavItems = document.querySelectorAll('.tab-nav li');
    
    if (tabNavItems.length) {
        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all tabs
                tabNavItems.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding tab content
                const tabId = this.getAttribute('data-tab');
                const tabPanes = document.querySelectorAll('.tab-pane');
                
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    
                    if (pane.id === tabId) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, warning, info)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Setup close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * Handle image upload preview
 * @param {HTMLElement} input - File input element
 * @param {HTMLElement} preview - Image preview element
 */
function handleImageUpload(input, preview) {
    input.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                preview.src = e.target.result;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}

/**
 * Create repeater item
 * @param {string} containerSelector - Container selector
 * @param {Function} itemTemplate - Function that returns item HTML
 * @param {string} addBtnSelector - Add button selector
 */
function setupRepeater(containerSelector, itemTemplate, addBtnSelector) {
    const container = document.querySelector(containerSelector);
    const addBtn = document.querySelector(addBtnSelector);
    
    if (!container || !addBtn) return;
    
    // Add new item
    addBtn.addEventListener('click', function() {
        const itemCount = container.children.length;
        const newItem = itemTemplate(itemCount + 1);
        
        // Create element from HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newItem;
        const itemElement = tempDiv.firstElementChild;
        
        // Add to container
        container.appendChild(itemElement);
        
        // Setup delete button
        const deleteBtn = itemElement.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                itemElement.remove();
            });
        }
        
        // Setup move buttons
        setupMoveButtons(itemElement);
    });
    
    // Setup existing delete buttons
    const deleteButtons = container.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.repeater-item, .slide-item, .feature-item, .project-item, .stat-item');
            item.remove();
        });
    });
    
    // Setup existing move buttons
    const items = container.children;
    for (let i = 0; i < items.length; i++) {
        setupMoveButtons(items[i]);
    }
}

/**
 * Setup move up/down buttons for an item
 * @param {HTMLElement} item - Item element
 */
function setupMoveButtons(item) {
    const moveUpBtn = item.querySelector('.move-up-btn');
    const moveDownBtn = item.querySelector('.move-down-btn');
    
    if (moveUpBtn) {
        moveUpBtn.addEventListener('click', function() {
            const prevItem = item.previousElementSibling;
            if (prevItem) {
                item.parentNode.insertBefore(item, prevItem);
            }
        });
    }
    
    if (moveDownBtn) {
        moveDownBtn.addEventListener('click', function() {
            const nextItem = item.nextElementSibling;
            if (nextItem) {
                item.parentNode.insertBefore(nextItem, item);
            }
        });
    }
}
