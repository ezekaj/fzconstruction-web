/**
 * Admin Login Script
 * Handles authentication for the admin panel
 */

document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple demo authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                // Store authentication in session storage (for demo purposes only)
                // In a real app, this would use secure cookies or tokens
                sessionStorage.setItem('adminAuth', JSON.stringify({
                    username: username,
                    role: 'admin',
                    name: 'Admin User'
                }));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password. Try admin/admin123');
            }
        });
    }
});
