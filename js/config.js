// AgenticLearn Configuration for Cloud Functions
// Updated with actual deployed backend

const PROJECT_ID = "agenticai-462517"; // ✅ Updated with actual project ID

// Cloud Functions Configuration - Updated to actual deployed endpoint
const CLOUD_FUNCTIONS_BASE = `https://asia-southeast2-${PROJECT_ID}.cloudfunctions.net/domyid`;

// Environment-based API Configuration
export const API_CONFIG = {
    development: {
        base: "http://localhost:8080",
        auth: "http://localhost:8080/api/agenticlearn/auth",
        content: "http://localhost:8080/api/agenticlearn",
        assessment: "http://localhost:8080/api/agenticlearn",
        personalization: "http://localhost:8080/api/agenticlearn",
        admin: "http://localhost:8080/api/agenticlearn",
        aria: "http://localhost:8080/api/agenticlearn/aria",
        health: "http://localhost:8080/api/agenticlearn/health"
    },
    production: {
        base: CLOUD_FUNCTIONS_BASE,
        auth: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn/auth`,
        content: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn`,
        assessment: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn`,
        personalization: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn`,
        admin: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn`,
        aria: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn/aria`,
        health: `${CLOUD_FUNCTIONS_BASE}/api/agenticlearn/health`
    }
};

// Get current environment
export function getCurrentEnvironment() {
    return window.location.hostname.includes('localhost') ? 'development' : 'production';
}

// Get API endpoints for current environment
export function getAPIEndpoints() {
    const env = getCurrentEnvironment();
    return API_CONFIG[env];
}

// Get endpoint for specific service
export function getEndpoint(service = 'base') {
    const endpoints = getAPIEndpoints();
    return endpoints[service] || endpoints.base;
}

// Feature flags for AgenticLearn backend
export const FEATURE_FLAGS = {
    USE_AGENTICLEARN_AUTH: true,
    USE_AGENTICLEARN_CONTENT: true,
    USE_AGENTICLEARN_PROGRESS: true,
    USE_AGENTICLEARN_ARIA: true,
    USE_CARBON_TRACKING: true,
    USE_PERFORMANCE_MONITORING: true
};

// API endpoint helpers
export const API_ENDPOINTS = {
    // Authentication
    REGISTER: '/api/agenticlearn/auth/register',
    LOGIN: '/api/agenticlearn/auth/login',
    PROFILE: '/api/agenticlearn/auth/profile',
    
    // Content
    COURSES: '/api/agenticlearn/courses',
    COURSE_BY_ID: (id) => `/api/agenticlearn/courses/${id}`,
    MODULES: (courseId) => `/api/agenticlearn/courses/${courseId}/modules`,
    LESSONS: (moduleId) => `/api/agenticlearn/modules/${moduleId}/lessons`,
    LESSON_BY_ID: (id) => `/api/agenticlearn/lessons/${id}`,
    
    // Progress
    PROGRESS: '/api/agenticlearn/progress',
    COURSE_PROGRESS: (courseId) => `/api/agenticlearn/progress/${courseId}`,
    
    // AI Features
    ARIA_CHAT: '/api/agenticlearn/aria/chat',
    ARIA_RECOMMENDATIONS: '/api/agenticlearn/aria/recommendations',
    
    // Health
    HEALTH: '/api/agenticlearn/health'
};

// Console logging for debugging
console.log("�� AgenticLearn Config loaded:", {
    environment: getCurrentEnvironment(),
    projectId: PROJECT_ID,
    baseURL: getEndpoint('base'),
    endpoints: getAPIEndpoints()
});

// Export for backward compatibility
export { PROJECT_ID, CLOUD_FUNCTIONS_BASE };
