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
        realtime: "ws://localhost:8080/ws"
    },
    production: {
        auth: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-auth`,
        content: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-content`,
        assessment: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-assessment`,
        personalization: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-personalization`,
        admin: `${CLOUD_FUNCTIONS_BASE}/agenticlearn-admin`,
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
    USE_CLOUD_FUNCTIONS_ASSESSMENT: false, // Still use Railway/local
    USE_CLOUD_FUNCTIONS_PERSONALIZATION: false, // Still use Railway/local
    USE_CLOUD_FUNCTIONS_ADMIN: false, // Still use Railway/local
    USE_FIREBASE_REALTIME: false // Still use WebSocket
};

// Get endpoint with feature flag support
export function getEndpoint(service) {
    const endpoints = getAPIEndpoints();
    const flagKey = `USE_CLOUD_FUNCTIONS_${service.toUpperCase()}`;
    
    if (FEATURE_FLAGS[flagKey] && getCurrentEnvironment() === 'production') {
        return endpoints[service];
    }
    
    // Fallback to Railway for services not yet migrated
    const railwayEndpoints = {
        auth: "https://agenticlearn-backend-production.up.railway.app/api/v1/auth",
        content: "https://agenticlearn-backend-production.up.railway.app/api/v1/learning",
        assessment: "https://agenticlearn-backend-production.up.railway.app/api/v1/learning/assessment",
        personalization: "https://agenticlearn-backend-production.up.railway.app/api/v1/personalization",
        admin: "https://agenticlearn-backend-production.up.railway.app/api/v1/admin"
    };
    
    return getCurrentEnvironment() === 'development' ? endpoints[service] : railwayEndpoints[service];
}

// Migration status tracking
export const MIGRATION_STATUS = {
    auth: "✅ Migrated to Cloud Functions",
    content: "✅ Migrated to Cloud Functions", 
    assessment: "🔄 Placeholder deployed, needs implementation",
    personalization: "🔄 Placeholder deployed, needs implementation",
    admin: "🔄 Placeholder deployed, needs implementation",
    realtime: "📋 Needs Firebase integration"
};

// Deployment information
export const DEPLOYMENT_INFO = {
    cloudFunctions: {
        region: "asia-southeast1",
        runtime: "go121",
        memory: "512Mi",
        timeout: "60s",
        minInstances: 0,
        maxInstances: 100
    },
    railway: {
        url: "https://agenticlearn-backend-production.up.railway.app",
        status: "active",
        backup: true
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
