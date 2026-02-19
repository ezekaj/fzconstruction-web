document.addEventListener('DOMContentLoaded', function() {
    // API Key Management
    const API_KEYS = {
        // These would typically be stored securely on the server
        // and accessed via authenticated endpoints
        PROPERTY_LISTINGS: 'pk_property_12345',
        CUSTOMER_DATA: 'pk_customer_67890',
        ANALYTICS: 'pk_analytics_54321',
        MARKETING: 'pk_marketing_09876'
    };
    
    // Agent roles and permissions
    const AGENT_ROLES = {
        ADMIN: {
            name: 'Administrator',
            permissions: ['view_properties', 'edit_properties', 'view_customers', 'edit_customers', 'view_analytics', 'send_marketing']
        },
        SALES_AGENT: {
            name: 'Sales Agent',
            permissions: ['view_properties', 'view_customers', 'view_analytics']
        },
        MARKETING_AGENT: {
            name: 'Marketing Agent',
            permissions: ['view_properties', 'view_analytics', 'send_marketing']
        },
        CUSTOMER_SERVICE: {
            name: 'Customer Service',
            permissions: ['view_properties', 'view_customers']
        }
    };
    
    // Mock agent database (would be stored on server)
    const AGENTS = {
        'admin@fzconstruction.com': {
            name: 'Admin User',
            role: 'ADMIN',
            password: 'admin123' // In a real app, this would be hashed
        },
        'sales@fzconstruction.com': {
            name: 'Sales Agent',
            role: 'SALES_AGENT',
            password: 'sales123'
        },
        'marketing@fzconstruction.com': {
            name: 'Marketing Agent',
            role: 'MARKETING_AGENT',
            password: 'marketing123'
        },
        'support@fzconstruction.com': {
            name: 'Support Agent',
            role: 'CUSTOMER_SERVICE',
            password: 'support123'
        }
    };
    
    // Agent authentication function
    function authenticateAgent(email, password) {
        const agent = AGENTS[email];
        
        if (!agent) {
            return { success: false, message: 'Agent not found' };
        }
        
        if (agent.password !== password) {
            return { success: false, message: 'Invalid password' };
        }
        
        return {
            success: true,
            agent: {
                name: agent.name,
                email: email,
                role: agent.role
            }
        };
    }
    
    // Get API keys based on agent permissions
    function getAgentApiKeys(agentRole) {
        const role = AGENT_ROLES[agentRole];
        const keys = {};
        
        if (!role) {
            return keys;
        }
        
        if (role.permissions.includes('view_properties') || role.permissions.includes('edit_properties')) {
            keys.PROPERTY_LISTINGS = API_KEYS.PROPERTY_LISTINGS;
        }
        
        if (role.permissions.includes('view_customers') || role.permissions.includes('edit_customers')) {
            keys.CUSTOMER_DATA = API_KEYS.CUSTOMER_DATA;
        }
        
        if (role.permissions.includes('view_analytics')) {
            keys.ANALYTICS = API_KEYS.ANALYTICS;
        }
        
        if (role.permissions.includes('send_marketing')) {
            keys.MARKETING = API_KEYS.MARKETING;
        }
        
        return keys;
    }
    
    // Agent login form handler
    const agentLoginForm = document.getElementById('agentLoginForm');
    
    if (agentLoginForm) {
        agentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('agentEmail').value;
            const password = document.getElementById('agentPassword').value;
            
            // Authenticate agent
            const authResult = authenticateAgent(email, password);
            
            if (authResult.success) {
                // Get API keys for agent
                const apiKeys = getAgentApiKeys(authResult.agent.role);
                
                // In a real app, you would store the authentication token in a secure way
                // and redirect to the agent dashboard
                console.log('Agent authenticated:', authResult.agent);
                console.log('API Keys available:', apiKeys);
                
                // Store agent info in session storage (for demo purposes only)
                // In a real app, you would use secure cookies or tokens
                sessionStorage.setItem('agentInfo', JSON.stringify({
                    name: authResult.agent.name,
                    email: authResult.agent.email,
                    role: authResult.agent.role
                }));
                
                // Show success message and redirect
                alert(`Welcome, ${authResult.agent.name}! You are logged in as a ${AGENT_ROLES[authResult.agent.role].name}.`);
                
                // Close modal
                document.getElementById('agentPortal').classList.remove('active');
                
                // In a real app, redirect to dashboard
                // window.location.href = 'agent-dashboard.html';
            } else {
                // Show error message
                alert(`Login failed: ${authResult.message}`);
            }
        });
    }
    
    // Check if agent is logged in (for demo purposes)
    function checkAgentLogin() {
        const agentInfo = sessionStorage.getItem('agentInfo');
        
        if (agentInfo) {
            const agent = JSON.parse(agentInfo);
            console.log('Agent already logged in:', agent);
            
            // Update UI to show logged in state
            const agentLoginBtn = document.querySelector('.agent-login');
            
            if (agentLoginBtn) {
                agentLoginBtn.textContent = `${agent.name} (${AGENT_ROLES[agent.role].name})`;
                agentLoginBtn.classList.add('logged-in');
                
                // Change click behavior to logout
                agentLoginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Clear session storage
                    sessionStorage.removeItem('agentInfo');
                    
                    // Reload page
                    window.location.reload();
                });
            }
        }
    }
    
    // Check if agent is logged in on page load
    checkAgentLogin();
});
