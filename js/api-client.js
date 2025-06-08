// AgenticLearn Shared API Client dengan JSCroot
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";

export class AgenticAPIClient {
    constructor(baseURL = "https://agenticlearn-api-production.up.railway.app/api/v1") {
        this.baseURL = baseURL;
        this.carbonFootprint = 0;
        this.requestCount = 0;
    }

    async request(endpoint, options = {}) {
        const startTime = performance.now();
        this.requestCount++;

        const token = getCookie("login");
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await fetch(url, {
                method: options.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                    "X-Carbon-Efficient": "true",
                    "X-JSCroot": "optimized",
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
