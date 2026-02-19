/**
 * CMS Content Loader
 * Loads content from the CMS and populates the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load content from CMS
    loadContent();
});

/**
 * Load content from CMS
 */
async function loadContent() {
    try {
        // In a real app with a server, this would fetch from the API
        // For now, we'll use a static JSON file
        const response = await fetch('/includes/cms/content.json');
        const content = await response.json();
        
        // Populate site metadata
        populateSiteMetadata(content.site);
        
        // Populate navigation
        populateNavigation(content.navigation);
        
        // Populate home page content (if on home page)
        if (isHomePage()) {
            populateHomeContent(content.home);
        }
        
        // Populate footer
        populateFooter(content.footer);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

/**
 * Check if current page is home page
 * @returns {boolean} True if home page
 */
function isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path === '/index.html' || path.endsWith('/');
}

/**
 * Populate site metadata
 * @param {Object} siteData - Site metadata
 */
function populateSiteMetadata(siteData) {
    if (!siteData) return;
    
    // Set page title
    document.title = siteData.title || document.title;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && siteData.description) {
        metaDescription.setAttribute('content', siteData.description);
    } else if (siteData.description) {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', siteData.description);
        document.head.appendChild(newMetaDescription);
    }
    
    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && siteData.keywords) {
        metaKeywords.setAttribute('content', siteData.keywords);
    } else if (siteData.keywords) {
        const newMetaKeywords = document.createElement('meta');
        newMetaKeywords.setAttribute('name', 'keywords');
        newMetaKeywords.setAttribute('content', siteData.keywords);
        document.head.appendChild(newMetaKeywords);
    }
    
    // Set contact info
    if (siteData.contact) {
        const phoneElements = document.querySelectorAll('.phone, .contact-info a[href^="tel:"]');
        const emailElements = document.querySelectorAll('.email, .contact-info a[href^="mailto:"]');
        
        phoneElements.forEach(element => {
            if (siteData.contact.phone) {
                element.textContent = siteData.contact.phone;
                if (element.tagName === 'A') {
                    element.href = `tel:${siteData.contact.phone.replace(/\s+/g, '')}`;
                }
            }
        });
        
        emailElements.forEach(element => {
            if (siteData.contact.email) {
                element.textContent = siteData.contact.email;
                if (element.tagName === 'A') {
                    element.href = `mailto:${siteData.contact.email}`;
                }
            }
        });
    }
    
    // Set social links
    if (siteData.social) {
        const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');
        
        socialLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href.includes('facebook') && siteData.social.facebook) {
                link.href = siteData.social.facebook;
            } else if (href.includes('instagram') && siteData.social.instagram) {
                link.href = siteData.social.instagram;
            }
            // Add more social platforms as needed
        });
    }
}

/**
 * Populate navigation
 * @param {Object} navigationData - Navigation data
 */
function populateNavigation(navigationData) {
    if (!navigationData || !navigationData.main) return;
    
    const navContainer = document.querySelector('.main-nav ul');
    if (!navContainer) return;
    
    // Clear existing navigation
    navContainer.innerHTML = '';
    
    // Add navigation items
    navigationData.main.forEach(item => {
        const li = document.createElement('li');
        
        if (item.dropdown) {
            li.classList.add('dropdown');
            
            const a = document.createElement('a');
            a.href = item.url;
            a.classList.add('nav-link');
            if (item.active) a.classList.add('active');
            a.innerHTML = `${item.text} <i class="fas fa-chevron-down"></i>`;
            
            const ul = document.createElement('ul');
            ul.classList.add('dropdown-menu');
            
            item.dropdown.forEach(dropdownItem => {
                const dropdownLi = document.createElement('li');
                const dropdownA = document.createElement('a');
                dropdownA.href = dropdownItem.url;
                dropdownA.textContent = dropdownItem.text;
                
                dropdownLi.appendChild(dropdownA);
                ul.appendChild(dropdownLi);
            });
            
            li.appendChild(a);
            li.appendChild(ul);
        } else {
            const a = document.createElement('a');
            a.href = item.url;
            a.classList.add('nav-link');
            if (item.active) a.classList.add('active');
            a.textContent = item.text;
            
            li.appendChild(a);
        }
        
        navContainer.appendChild(li);
    });
    
    // Add agent portal link
    const agentLi = document.createElement('li');
    const agentA = document.createElement('a');
    agentA.href = '#';
    agentA.classList.add('nav-link', 'agent-login');
    agentA.textContent = 'AGENT PORTAL';
    
    agentLi.appendChild(agentA);
    navContainer.appendChild(agentLi);
}

/**
 * Populate home page content
 * @param {Object} homeData - Home page data
 */
function populateHomeContent(homeData) {
    if (!homeData) return;
    
    // Populate slider
    populateSlider(homeData.slider);
    
    // Populate about section
    populateAboutSection(homeData.about);
    
    // Populate features section
    populateFeatures(homeData.features);
    
    // Populate projects section
    populateProjects(homeData.projects);
    
    // Populate values section
    populateValues(homeData.values);
}

/**
 * Populate slider
 * @param {Array} sliderData - Slider data
 */
function populateSlider(sliderData) {
    if (!sliderData || !sliderData.length) return;
    
    const sliderContainer = document.querySelector('.slider-container');
    const sliderDots = document.querySelector('.slider-dots');
    
    if (!sliderContainer || !sliderDots) return;
    
    // Clear existing slides and dots
    sliderContainer.innerHTML = '';
    sliderDots.innerHTML = '';
    
    // Add slides and dots
    sliderData.forEach((slide, index) => {
        // Create slide
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide${index === 0 ? ' active' : ''}`;
        
        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}">
            <div class="slide-content">
                <h2 class="slide-in-right">${slide.title}</h2>
                <h3 class="slide-in-right">${slide.subtitle}</h3>
                <a href="${slide.link}" class="btn btn-primary pulse">${slide.buttonText}</a>
            </div>
        `;
        
        sliderContainer.appendChild(slideDiv);
        
        // Create dot
        const dot = document.createElement('span');
        dot.className = `dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('data-slide', index);
        
        sliderDots.appendChild(dot);
    });
}

/**
 * Populate about section
 * @param {Object} aboutData - About section data
 */
function populateAboutSection(aboutData) {
    if (!aboutData) return;
    
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const titleElement = aboutSection.querySelector('.section-title');
    const subtitleElement = aboutSection.querySelector('.section-subtitle');
    const descriptionElement = aboutSection.querySelector('.about-text p');
    const pointsList = aboutSection.querySelector('.about-text ol');
    const imageElement = aboutSection.querySelector('.about-image img');
    const buttonElement = aboutSection.querySelector('.btn.btn-secondary');
    
    if (titleElement) titleElement.textContent = aboutData.title;
    if (subtitleElement) subtitleElement.textContent = aboutData.subtitle;
    if (descriptionElement) descriptionElement.textContent = aboutData.description;
    
    if (pointsList) {
        pointsList.innerHTML = '';
        
        aboutData.points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            pointsList.appendChild(li);
        });
    }
    
    if (imageElement) imageElement.src = aboutData.image;
    
    if (buttonElement) {
        buttonElement.textContent = aboutData.buttonText;
        buttonElement.href = aboutData.buttonLink;
    }
}

/**
 * Populate features section
 * @param {Array} featuresData - Features data
 */
function populateFeatures(featuresData) {
    if (!featuresData || !featuresData.length) return;
    
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;
    
    // Clear existing features
    featuresGrid.innerHTML = '';
    
    // Add features
    featuresData.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card scale-in';
        
        featureCard.innerHTML = `
            <div class="feature-icon">
                <img src="${feature.icon}" alt="${feature.title}">
            </div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        featuresGrid.appendChild(featureCard);
    });
}

/**
 * Populate projects section
 * @param {Object} projectsData - Projects data
 */
function populateProjects(projectsData) {
    if (!projectsData || !projectsData.items || !projectsData.items.length) return;
    
    const projectsSection = document.querySelector('.projects-section');
    if (!projectsSection) return;
    
    const titleElement = projectsSection.querySelector('.section-title');
    const subtitleElement = projectsSection.querySelector('.section-subtitle');
    const projectsGrid = projectsSection.querySelector('.projects-grid');
    
    if (titleElement) titleElement.textContent = projectsData.title;
    if (subtitleElement) subtitleElement.textContent = projectsData.subtitle;
    
    if (projectsGrid) {
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        // Add projects
        projectsData.items.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            
            projectCard.innerHTML = `
                <a href="${project.link}" class="project-link">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                        <div class="project-overlay">
                            <span class="view-project">View Project</span>
                        </div>
                    </div>
                </a>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
}

/**
 * Populate values section
 * @param {Object} valuesData - Values data
 */
function populateValues(valuesData) {
    if (!valuesData) return;
    
    const valuesSection = document.querySelector('.values-section');
    if (!valuesSection) return;
    
    const titleElement = valuesSection.querySelector('.section-title');
    const textElement = valuesSection.querySelector('.values-text');
    const statsContainer = valuesSection.querySelector('.values-stats');
    
    if (titleElement) titleElement.textContent = valuesData.title;
    if (textElement) textElement.textContent = valuesData.description;
    
    if (statsContainer && valuesData.stats && valuesData.stats.length) {
        // Clear existing stats
        statsContainer.innerHTML = '';
        
        // Add stats
        valuesData.stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item count-up';
            
            statItem.innerHTML = `
                <div class="stat-circle">
                    <span class="stat-number">${stat.value}</span><span>${stat.unit}</span>
                </div>
                <h4 class="stat-title">${stat.title}</h4>
            `;
            
            statsContainer.appendChild(statItem);
        });
    }
}

/**
 * Populate footer
 * @param {Object} footerData - Footer data
 */
function populateFooter(footerData) {
    if (!footerData) return;
    
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const footerColumns = footer.querySelectorAll('.footer-column');
    const copyrightElement = footer.querySelector('.footer-bottom p');
    
    if (footerColumns.length && footerData.columns && footerData.columns.length) {
        footerData.columns.forEach((column, index) => {
            if (index >= footerColumns.length) return;
            
            const titleElement = footerColumns[index].querySelector('.footer-title');
            
            if (titleElement) titleElement.textContent = column.title;
            
            // Handle different column types
            if (column.content) {
                // Text content column
                const contentElement = footerColumns[index].querySelector('p');
                if (contentElement) contentElement.textContent = column.content;
            } else if (column.links) {
                // Links column
                const linksList = footerColumns[index].querySelector('ul');
                
                if (linksList) {
                    // Clear existing links
                    linksList.innerHTML = '';
                    
                    // Add links
                    column.links.forEach(link => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = link.url;
                        a.textContent = link.text;
                        
                        li.appendChild(a);
                        linksList.appendChild(li);
                    });
                }
            } else if (column.social) {
                // Social links column
                const socialContainer = footerColumns[index].querySelector('.footer-social');
                
                if (socialContainer) {
                    // Clear existing social links
                    socialContainer.innerHTML = '';
                    
                    // Add social links
                    column.social.forEach(social => {
                        const a = document.createElement('a');
                        a.href = social.url;
                        a.target = '_blank';
                        
                        const i = document.createElement('i');
                        i.className = `fab fa-${social.platform}`;
                        
                        a.appendChild(i);
                        socialContainer.appendChild(a);
                    });
                }
            } else if (column.address || column.phone || column.email) {
                // Contact info column
                const addressElement = footerColumns[index].querySelector('p:nth-of-type(1)');
                const phoneElement = footerColumns[index].querySelector('p:nth-of-type(2) a');
                const emailElement = footerColumns[index].querySelector('p:nth-of-type(3) a');
                
                if (addressElement && column.address) addressElement.textContent = column.address;
                
                if (phoneElement && column.phone) {
                    phoneElement.textContent = column.phone;
                    phoneElement.href = `tel:${column.phone.replace(/\s+/g, '')}`;
                }
                
                if (emailElement && column.email) {
                    emailElement.textContent = column.email;
                    emailElement.href = `mailto:${column.email}`;
                }
            }
        });
    }
    
    if (copyrightElement && footerData.copyright) {
        copyrightElement.textContent = footerData.copyright;
    }
}
