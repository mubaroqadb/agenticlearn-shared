// AgenticLearn Configuration for Cloud Functions
// Update PROJECT_ID with your actual Google Cloud Project ID

const PROJECT_ID = "agenticlearn-project"; // 🔧 UPDATE THIS WITH YOUR PROJECT ID

// Cloud Functions Configuration
const CLOUD_FUNCTIONS_BASE = `https://asia-southeast1-${PROJECT_ID}.cloudfunctions.net`;

// Environment-based API Configuration
export const API_CONFIG = {
    development: {
        auth: "http://localhost:8080/api/v1/auth",
        content: "http://localhost:8080/api/v1/learning",
        assessment: "http://localhost:8080/api/v1/learning/assessment",
        personalization: "http://localhost:8080/api/v1/personalization",
        admin: "http://localhost:8080/api/v1/admin",
        aria: "http://localhost:8080/api/v1/aria",
        realtime: "ws://localhost:8080/ws"
    },
    production: {
        auth: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-auth`,
        content: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-content`,
        assessment: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-assessment`,
        personalization: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-personalization`,
        admin: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-admin`,
        aria: `${CLOUD_FUNCTIONS_BASE}/aria-function`,
        realtime: null // Will use Firebase for real-time features
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

// Feature flags for gradual migration
export const FEATURE_FLAGS = {
    USE_CLOUD_FUNCTIONS_AUTH: true,
    USE_CLOUD_FUNCTIONS_CONTENT: true,
    USE_CLOUD_FUNCTIONS_ASSESSMENT: true, // Will use Google Cloud
    USE_CLOUD_FUNCTIONS_PERSONALIZATION: true, // Will use Google Cloud
    USE_CLOUD_FUNCTIONS_ADMIN: true, // Will use Google Cloud
    USE_CLOUD_FUNCTIONS_ARIA: true, // ARIA AI Tutor ready for Cloud Functions
    USE_FIREBASE_REALTIME: false // Still use WebSocket
};

// Get endpoint with feature flag support
export function getEndpoint(service) {
    const endpoints = getAPIEndpoints();
    const flagKey = `USE_CLOUD_FUNCTIONS_${service.toUpperCase()}`;
    
    if (FEATURE_FLAGS[flagKey] && getCurrentEnvironment() === 'production') {
        return endpoints[service];
    }
    
    // Fallback to Google Cloud for services not yet migrated
    const googleCloudEndpoints = {
        auth: "https://api.agenticlearn.com/api/v1/auth",
        content: "https://api.agenticlearn.com/api/v1/learning",
        assessment: "https://api.agenticlearn.com/api/v1/learning/assessment",
        personalization: "https://api.agenticlearn.com/api/v1/personalization",
        admin: "https://api.agenticlearn.com/api/v1/admin",
        aria: "https://api.agenticlearn.com/api/v1/aria"
    };

    return getCurrentEnvironment() === 'development' ? endpoints[service] : googleCloudEndpoints[service];
}

// Migration status tracking
export const MIGRATION_STATUS = {
    auth: "✅ Ready for Google Cloud",
    content: "✅ Ready for Google Cloud",
    assessment: "✅ Ready for Google Cloud",
    personalization: "✅ Ready for Google Cloud",
    admin: "✅ Ready for Google Cloud",
    aria: "✅ Ready for Google Cloud",
    realtime: "📋 Planned - WebSocket to Firebase"
};

// Deployment information
export const DEPLOYMENT_INFO = {
    googleCloud: {
        region: "asia-southeast1",
        runtime: "go121",
        memory: "512Mi",
        timeout: "60s",
        minInstances: 0,
        maxInstances: 100,
        url: "https://api.agenticlearn.com",
        status: "planned"
    }
};

// Health check endpoints
export function getHealthEndpoints() {
    const endpoints = getAPIEndpoints();
    return {
        auth: `${endpoints.auth}/health`,
        content: `${endpoints.content}/health`,
        assessment: `${endpoints.assessment}/health`,
        personalization: `${endpoints.personalization}/health`,
        admin: `${endpoints.admin}/health`
    };
}

// Console logging for debugging
console.log("🌱 AgenticLearn Config loaded:", {
    environment: getCurrentEnvironment(),
    projectId: PROJECT_ID,
    endpoints: getAPIEndpoints(),
    featureFlags: FEATURE_FLAGS,
    migrationStatus: MIGRATION_STATUS
});
