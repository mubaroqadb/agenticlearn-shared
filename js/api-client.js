// AgenticLearn Shared API Client dengan JSCroot + Cloud Functions
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { getEndpoint, getCurrentEnvironment } from "./config.js";

export class AgenticAPIClient {
    constructor() {
        this.carbonFootprint = 0;
        this.requestCount = 0;
        console.log(`🌱 API Client initialized for ${getCurrentEnvironment()} environment`);
    }

    async request(service, endpoint, options = {}) {
        const startTime = performance.now();
        this.requestCount++;

        const token = getCookie("access_token") || getCookie("login");
        const baseURL = getEndpoint(service);
        const url = `${baseURL}${endpoint}`;

        try {
            const response = await fetch(url, {
                method: options.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                    "X-Carbon-Efficient": "true",
                    "X-JSCroot": "optimized",
                    "X-Cloud-Functions": "true",
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : undefined
            });

            const data = await response.json();
            
            const duration = performance.now() - startTime;
            const carbonImpact = this.calculateCarbon(duration, JSON.stringify(data).length);
            this.carbonFootprint += carbonImpact;

            console.log(`🌱 API ${service}${endpoint}: ${duration.toFixed(2)}ms, ${carbonImpact.toFixed(6)}g CO2`);

            if (!response.ok) {
                throw new Error(data.message || `HTTP ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API Error ${service}${endpoint}:`, error);
            throw error;
        }
    }

    // Convenience methods for each service
    async auth(endpoint, options = {}) {
        return this.request('auth', endpoint, options);
    }

    async content(endpoint, options = {}) {
        return this.request('content', endpoint, options);
    }

    async assessment(endpoint, options = {}) {
        return this.request('assessment', endpoint, options);
    }

    async personalization(endpoint, options = {}) {
        return this.request('personalization', endpoint, options);
    }

    async admin(endpoint, options = {}) {
        return this.request('admin', endpoint, options);
    }

    calculateCarbon(duration, dataSize) {
        const processingCarbon = (duration / 1000) * 0.0001;
        const dataCarbon = (dataSize / 1024) * 0.000006;
        return processingCarbon + dataCarbon;
    }

    getCarbonMetrics() {
        return {
            totalRequests: this.requestCount,
            totalCarbon: this.carbonFootprint,
            averageCarbon: this.carbonFootprint / this.requestCount,
            efficiency: this.requestCount > 0 ? (1 / (this.carbonFootprint / this.requestCount)) : 0
        };
    }
}

export const apiClient = new AgenticAPIClient();
