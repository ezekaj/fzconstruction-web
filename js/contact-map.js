/**
 * Contact Map Script
 * Initializes and configures the Leaflet map on the contact page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if map element exists
    const mapElement = document.getElementById('contactMap');
    
    if (mapElement) {
        initMap();
    }
});

/**
 * Initialize Leaflet map
 */
function initMap() {
    // Tirana coordinates (approximate location for FZ Construction)
    const lat = 41.3275;
    const lng = 19.8187;
    
    // Create map
    const map = L.map('contactMap').setView([lat, lng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker
    const marker = L.marker([lat, lng]).addTo(map);
    
    // Add popup
    marker.bindPopup(`
        <strong>FZ Construction</strong><br>
        Rr. Hamdi Sina, near Liqeni i Thate<br>
        Administrative Unit Farke, Tirana<br>
        <a href="tel:+35568206202">+355 68 2066 202</a>
    `).openPopup();
    
    // Make map responsive
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
}
