// AgenticLearn API Client untuk Backend Baru
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { getEndpoint, getCurrentEnvironment, API_ENDPOINTS } from "./config.js";

export class AgenticAPIClient {
    constructor() {
        this.baseURL = getEndpoint('base');
        this.carbonFootprint = 0;
        this.requestCount = 0;
        console.log(`🌱 API Client initialized: ${this.baseURL}`);
        console.log(`📍 Environment: ${getCurrentEnvironment()}`);
    }

    async request(endpoint, options = {}) {
        const startTime = performance.now();
        this.requestCount++;

        const token = getCookie("access_token") || getCookie("login");
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await fetch(url, {
                method: options.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                    "X-User-ID": getCookie("user_id") || "", // Temporary auth
                    "X-Carbon-Efficient": "true",
                    "X-JSCroot": "optimized",
                    "X-AgenticLearn": "v1.0",
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : undefined
            });

            const data = await response.json();
            
            const duration = performance.now() - startTime;
            const carbonImpact = this.calculateCarbon(duration, JSON.stringify(data).length);
            this.carbonFootprint += carbonImpact;

            console.log(`🌱 API ${endpoint}: ${duration.toFixed(2)}ms, ${carbonImpact.toFixed(6)}g CO2`);

            if (!response.ok) {
                throw new Error(data.message || `HTTP ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API Error ${endpoint}:`, error);
            throw error;
        }
    }

    // Authentication methods
    async register(userData) {
        return this.request(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            body: userData
        });
    }

    async login(credentials) {
        return this.request(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            body: credentials
        });
    }

    async getProfile() {
        return this.request(API_ENDPOINTS.PROFILE);
    }

    async updateProfile(profileData) {
        return this.request(API_ENDPOINTS.PROFILE, {
            method: 'PUT',
            body: profileData
        });
    }

    // Content methods
    async getCourses() {
        return this.request(API_ENDPOINTS.COURSES);
    }

    async getCourse(courseId) {
        return this.request(API_ENDPOINTS.COURSE_BY_ID(courseId));
    }

    async getModules(courseId) {
        return this.request(API_ENDPOINTS.MODULES(courseId));
    }

    async getLessons(moduleId) {
        return this.request(API_ENDPOINTS.LESSONS(moduleId));
    }

    async getLesson(lessonId) {
        return this.request(API_ENDPOINTS.LESSON_BY_ID(lessonId));
    }

    // Progress methods
    async getProgress() {
        return this.request(API_ENDPOINTS.PROGRESS);
    }

    async updateProgress(progressData) {
        return this.request(API_ENDPOINTS.PROGRESS, {
            method: 'POST',
            body: progressData
        });
    }

    async getCourseProgress(courseId) {
        return this.request(API_ENDPOINTS.COURSE_PROGRESS(courseId));
    }

    // Assessment methods
    async getDigitalSkillsAssessment() {
        return this.request(API_ENDPOINTS.ASSESSMENT_DIGITAL_SKILLS);
    }

    async submitDigitalSkillsAssessment(responses) {
        return this.request(API_ENDPOINTS.ASSESSMENT_DIGITAL_SKILLS, {
            method: 'POST',
            body: { responses }
        });
    }

    async getLearningStyleAssessment() {
        return this.request(API_ENDPOINTS.ASSESSMENT_LEARNING_STYLE);
    }

    async submitLearningStyleAssessment(responses) {
        return this.request(API_ENDPOINTS.ASSESSMENT_LEARNING_STYLE, {
            method: 'POST',
            body: { responses }
        });
    }

    async getTechComfortSurvey() {
        return this.request(API_ENDPOINTS.ASSESSMENT_TECH_COMFORT);
    }

    async submitTechComfortSurvey(responses) {
        return this.request(API_ENDPOINTS.ASSESSMENT_TECH_COMFORT, {
            method: 'POST',
            body: { responses }
        });
    }

    // AI methods
    async ariaChat(message, context = '') {
        return this.request(API_ENDPOINTS.ARIA_CHAT, {
            method: 'POST',
            body: { message, context }
        });
    }

    async getRecommendations() {
        return this.request(API_ENDPOINTS.ARIA_RECOMMENDATIONS);
    }

    // Content management
    async initializeContent() {
        return this.request(API_ENDPOINTS.CONTENT_INITIALIZE, {
            method: 'POST'
        });
    }

    // Health check
    async healthCheck() {
        return this.request(API_ENDPOINTS.HEALTH);
    }

    // Carbon calculation
    calculateCarbon(duration, dataSize) {
        // Simple carbon calculation: duration + data transfer
        const processingCarbon = duration * 0.000001; // 1μg per ms
        const transferCarbon = dataSize * 0.000000006; // 6ng per byte
        return processingCarbon + transferCarbon;
    }

    // Get carbon footprint
    getCarbonFootprint() {
        return {
            total: this.carbonFootprint,
            requests: this.requestCount,
            average: this.carbonFootprint / this.requestCount || 0
        };
    }

    // Test connection
    async testConnection() {
        try {
            const response = await this.healthCheck();
            console.log("✅ Backend connection successful:", response);
            return true;
        } catch (error) {
            console.error("❌ Backend connection failed:", error);
            return false;
        }
    }
}

// Export singleton instance
export const apiClient = new AgenticAPIClient();

// Backward compatibility
export default AgenticAPIClient;
