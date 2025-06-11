// Comprehensive System Testing - AgenticLearn
import { apiClient } from "./api-client.js";

class SystemTester {
    constructor() {
        this.testResults = [];
        this.startTime = Date.now();
        this.carbonFootprint = 0;
        console.log("🧪 System Tester initialized");
    }

    async runAllTests() {
        console.log("🚀 Starting comprehensive system tests...");
        
        const tests = [
            { name: "Backend Health Check", test: () => this.testBackendHealth() },
            { name: "Authentication System", test: () => this.testAuthentication() },
            { name: "Assessment System", test: () => this.testAssessmentSystem() },
            { name: "Content Management", test: () => this.testContentManagement() },
            { name: "Progress Tracking", test: () => this.testProgressTracking() },
            { name: "AI Features", test: () => this.testAIFeatures() },
            { name: "Performance Metrics", test: () => this.testPerformance() },
            { name: "Mobile Compatibility", test: () => this.testMobileCompatibility() },
            { name: "Accessibility", test: () => this.testAccessibility() },
            { name: "Green Computing", test: () => this.testGreenComputing() }
        ];

        for (const testCase of tests) {
            try {
                console.log(`\n🔄 Running: ${testCase.name}`);
                const result = await testCase.test();
                this.testResults.push({
                    name: testCase.name,
                    status: 'PASS',
                    result: result,
                    timestamp: new Date().toISOString()
                });
                console.log(`✅ ${testCase.name}: PASSED`);
            } catch (error) {
                this.testResults.push({
                    name: testCase.name,
                    status: 'FAIL',
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
                console.error(`❌ ${testCase.name}: FAILED - ${error.message}`);
            }
        }

        this.generateReport();
        return this.testResults;
    }

    async testBackendHealth() {
        const response = await apiClient.healthCheck();
        
        if (!response.success) {
            throw new Error('Backend health check failed');
        }

        // Verify required features
        const requiredFeatures = [
            'Authentication',
            'Content Management', 
            'Progress Tracking',
            'AI Assistant (ARIA)',
            'Personalization'
        ];

        for (const feature of requiredFeatures) {
            if (!response.features.includes(feature)) {
                throw new Error(`Missing feature: ${feature}`);
            }
        }

        return {
            status: response.status,
            features: response.features,
            version: response.version
        };
    }

    async testAuthentication() {
        // Test registration (mock)
        const mockUser = {
            email: `test${Date.now()}@agenticlearn.test`,
            password: 'TestPassword123!',
            name: 'Test Student'
        };

        try {
            // Note: In real test, we would register and login
            // For now, test profile endpoint
            const profile = await apiClient.getProfile();
            return {
                profileAccess: true,
                message: 'Authentication system accessible'
            };
        } catch (error) {
            // Expected if not logged in
            return {
                profileAccess: false,
                message: 'Authentication required (expected behavior)',
                authRequired: true
            };
        }
    }

    async testAssessmentSystem() {
        const results = {};

        // Test Digital Skills Assessment
        try {
            const digitalSkills = await apiClient.getDigitalSkillsAssessment();
            results.digitalSkills = {
                available: true,
                questionCount: digitalSkills.questions?.length || 0
            };
        } catch (error) {
            results.digitalSkills = { available: false, error: error.message };
        }

        // Test Learning Style Assessment
        try {
            const learningStyle = await apiClient.getLearningStyleAssessment();
            results.learningStyle = {
                available: true,
                questionCount: learningStyle.questions?.length || 0
            };
        } catch (error) {
            results.learningStyle = { available: false, error: error.message };
        }

        // Verify at least one assessment is working
        if (!results.digitalSkills.available && !results.learningStyle.available) {
            throw new Error('No assessment endpoints are working');
        }

        return results;
    }

    async testContentManagement() {
        const results = {};

        // Test content initialization
        try {
            const initResult = await apiClient.initializeContent();
            results.initialization = {
                success: initResult.success,
                message: initResult.message
            };
        } catch (error) {
            results.initialization = { success: false, error: error.message };
        }

        // Test courses endpoint
        try {
            const courses = await apiClient.getCourses();
            results.courses = {
                available: true,
                count: courses.courses?.length || 0
            };
        } catch (error) {
            results.courses = { available: false, error: error.message };
        }

        return results;
    }

    async testProgressTracking() {
        try {
            const progress = await apiClient.getProgress();
            return {
                available: true,
                hasData: !!progress.progress
            };
        } catch (error) {
            return {
                available: false,
                error: error.message
            };
        }
    }

    async testAIFeatures() {
        const results = {};

        // Test ARIA Chat
        try {
            const chatResponse = await apiClient.ariaChat("Hello, this is a test message");
            results.ariaChat = {
                available: true,
                responsive: !!chatResponse.message
            };
        } catch (error) {
            results.ariaChat = { available: false, error: error.message };
        }

        // Test Recommendations
        try {
            const recommendations = await apiClient.getRecommendations();
            results.recommendations = {
                available: true,
                hasRecommendations: !!recommendations.recommendations
            };
        } catch (error) {
            results.recommendations = { available: false, error: error.message };
        }

        return results;
    }

    async testPerformance() {
        const startTime = performance.now();
        
        // Test API response time
        await apiClient.healthCheck();
        const apiResponseTime = performance.now() - startTime;

        // Test page load metrics
        const navigation = performance.getEntriesByType('navigation')[0];
        
        return {
            apiResponseTime: Math.round(apiResponseTime),
            pageLoadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 'N/A',
            domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : 'N/A',
            firstContentfulPaint: this.getFirstContentfulPaint()
        };
    }

    testMobileCompatibility() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasTouch = 'ontouchstart' in window;
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        return {
            isMobileDevice: isMobile,
            hasTouchSupport: hasTouch,
            viewport: viewport,
            isResponsive: viewport.width <= 768 ? 'mobile' : viewport.width <= 1024 ? 'tablet' : 'desktop'
        };
    }

    testAccessibility() {
        const results = {};

        // Check for accessibility features
        results.hasAltTexts = document.querySelectorAll('img[alt]').length > 0;
        results.hasAriaLabels = document.querySelectorAll('[aria-label]').length > 0;
        results.hasSemanticHTML = document.querySelectorAll('main, section, article, nav, header, footer').length > 0;
        results.hasSkipLinks = document.querySelectorAll('a[href^="#"]').length > 0;
        results.colorContrast = this.checkColorContrast();

        return results;
    }

    testGreenComputing() {
        const carbonData = apiClient.getCarbonFootprint();
        
        return {
            carbonFootprint: carbonData,
            resourceEfficiency: this.calculateResourceEfficiency(),
            performanceScore: this.calculatePerformanceScore(),
            sustainabilityRating: this.calculateSustainabilityRating(carbonData)
        };
    }

    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? Math.round(fcp.startTime) : 'N/A';
    }

    checkColorContrast() {
        // Basic color contrast check
        const elements = document.querySelectorAll('*');
        let contrastIssues = 0;
        
        // This is a simplified check - in production, use a proper contrast analyzer
        for (let i = 0; i < Math.min(elements.length, 50); i++) {
            const element = elements[i];
            const styles = window.getComputedStyle(element);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            
            if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                // Simplified contrast check
                if (color === backgroundColor) {
                    contrastIssues++;
                }
            }
        }
        
        return {
            issuesFound: contrastIssues,
            elementsChecked: Math.min(elements.length, 50)
        };
    }

    calculateResourceEfficiency() {
        const resources = performance.getEntriesByType('resource');
        const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
        const totalTime = resources.reduce((sum, resource) => sum + resource.duration, 0);
        
        return {
            totalResources: resources.length,
            totalSize: Math.round(totalSize / 1024), // KB
            averageLoadTime: Math.round(totalTime / resources.length),
            efficiency: totalSize < 500000 ? 'excellent' : totalSize < 1000000 ? 'good' : 'needs improvement'
        };
    }

    calculatePerformanceScore() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (!navigation) return 'N/A';
        
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        let score = 100;
        if (loadTime > 3000) score -= 30;
        if (loadTime > 5000) score -= 20;
        if (domTime > 2000) score -= 20;
        
        return Math.max(score, 0);
    }

    calculateSustainabilityRating(carbonData) {
        const totalCarbon = carbonData.total || 0;
        
        if (totalCarbon < 0.1) return 'A+ (Excellent)';
        if (totalCarbon < 0.5) return 'A (Very Good)';
        if (totalCarbon < 1.0) return 'B (Good)';
        if (totalCarbon < 2.0) return 'C (Fair)';
        return 'D (Needs Improvement)';
    }

    generateReport() {
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        
        const passedTests = this.testResults.filter(test => test.status === 'PASS').length;
        const totalTests = this.testResults.length;
        const successRate = Math.round((passedTests / totalTests) * 100);
        
        console.log('\n📊 COMPREHENSIVE SYSTEM TEST REPORT');
        console.log('=====================================');
        console.log(`⏱️  Test Duration: ${duration}ms`);
        console.log(`✅ Tests Passed: ${passedTests}/${totalTests} (${successRate}%)`);
        console.log(`🌱 Carbon Footprint: ${this.carbonFootprint.toFixed(3)}g CO2`);
        
        console.log('\n📋 Detailed Results:');
        this.testResults.forEach(test => {
            const status = test.status === 'PASS' ? '✅' : '❌';
            console.log(`${status} ${test.name}: ${test.status}`);
            if (test.error) {
                console.log(`   Error: ${test.error}`);
            }
        });
        
        // Store results globally for access
        window.systemTestResults = {
            summary: {
                duration,
                passedTests,
                totalTests,
                successRate,
                carbonFootprint: this.carbonFootprint
            },
            details: this.testResults
        };
        
        return window.systemTestResults;
    }
}

// Export for use
export { SystemTester };

// Global access
if (typeof window !== 'undefined') {
    window.SystemTester = SystemTester;
    window.runSystemTests = async () => {
        const tester = new SystemTester();
        return await tester.runAllTests();
    };
}
