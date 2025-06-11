// Performance Monitor - Green Computing Analytics
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: {},
            apiCalls: [],
            userInteractions: [],
            carbonFootprint: 0,
            resourceUsage: {},
            accessibility: {},
            mobileOptimization: {}
        };
        
        this.observers = {};
        this.startTime = performance.now();
        this.isMonitoring = true;
        
        console.log("📊 Performance Monitor initialized");
        this.init();
    }

    init() {
        this.setupPerformanceObservers();
        this.trackPageLoad();
        this.trackResourceUsage();
        this.trackUserInteractions();
        this.trackAccessibility();
        this.trackMobileOptimization();
        this.startCarbonTracking();
    }

    setupPerformanceObservers() {
        // Performance Observer for navigation timing
        if ('PerformanceObserver' in window) {
            try {
                this.observers.navigation = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.processNavigationEntry(entry);
                    }
                });
                this.observers.navigation.observe({ entryTypes: ['navigation'] });

                // Resource timing observer
                this.observers.resource = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.processResourceEntry(entry);
                    }
                });
                this.observers.resource.observe({ entryTypes: ['resource'] });

                // Paint timing observer
                this.observers.paint = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.processPaintEntry(entry);
                    }
                });
                this.observers.paint.observe({ entryTypes: ['paint'] });

            } catch (error) {
                console.warn("Performance Observer not fully supported:", error);
            }
        }
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.pageLoad = {
                        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                        loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                        firstByte: Math.round(navigation.responseStart - navigation.fetchStart),
                        domInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
                        timestamp: new Date().toISOString()
                    };
                    
                    this.calculatePerformanceScore();
                    console.log("📊 Page Load Metrics:", this.metrics.pageLoad);
                }
            }, 100);
        });
    }

    trackResourceUsage() {
        // Track memory usage if available
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.resourceUsage = {
                    memoryUsed: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024), // MB
                    memoryTotal: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024), // MB
                    memoryLimit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024), // MB
                    timestamp: new Date().toISOString()
                };
            }, 5000);
        }

        // Track network usage
        if ('connection' in navigator) {
            this.metrics.networkInfo = {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
    }

    trackUserInteractions() {
        const interactionTypes = ['click', 'touch', 'scroll', 'keydown'];
        
        interactionTypes.forEach(type => {
            document.addEventListener(type, (event) => {
                this.recordInteraction(type, event);
            }, { passive: true });
        });
    }

    trackAccessibility() {
        // Check for accessibility features
        this.metrics.accessibility = {
            hasAltTexts: document.querySelectorAll('img[alt]').length,
            hasAriaLabels: document.querySelectorAll('[aria-label]').length,
            hasSemanticHTML: document.querySelectorAll('main, section, article, nav, header, footer').length,
            hasSkipLinks: document.querySelectorAll('a[href^="#"]').length,
            colorContrast: this.checkColorContrast(),
            keyboardNavigation: this.checkKeyboardNavigation(),
            timestamp: new Date().toISOString()
        };
    }

    trackMobileOptimization() {
        this.metrics.mobileOptimization = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            },
            touchSupport: 'ontouchstart' in window,
            orientation: screen.orientation ? screen.orientation.type : 'unknown',
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            touchTargets: this.checkTouchTargets(),
            timestamp: new Date().toISOString()
        };
    }

    startCarbonTracking() {
        // Track carbon footprint based on various factors
        setInterval(() => {
            this.calculateCarbonFootprint();
        }, 10000); // Every 10 seconds
    }

    processNavigationEntry(entry) {
        this.metrics.pageLoad.navigationEntry = {
            type: entry.type,
            redirectCount: entry.redirectCount,
            transferSize: entry.transferSize,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize
        };
    }

    processResourceEntry(entry) {
        const resourceMetric = {
            name: entry.name,
            type: this.getResourceType(entry.name),
            duration: Math.round(entry.duration),
            transferSize: entry.transferSize || 0,
            encodedBodySize: entry.encodedBodySize || 0,
            timestamp: new Date().toISOString()
        };

        this.metrics.apiCalls.push(resourceMetric);
        
        // Keep only last 100 entries to prevent memory bloat
        if (this.metrics.apiCalls.length > 100) {
            this.metrics.apiCalls = this.metrics.apiCalls.slice(-100);
        }
    }

    processPaintEntry(entry) {
        if (entry.name === 'first-contentful-paint') {
            this.metrics.pageLoad.firstContentfulPaint = Math.round(entry.startTime);
        } else if (entry.name === 'first-paint') {
            this.metrics.pageLoad.firstPaint = Math.round(entry.startTime);
        }
    }

    recordInteraction(type, event) {
        const interaction = {
            type: type,
            timestamp: Date.now(),
            target: event.target.tagName,
            x: event.clientX || 0,
            y: event.clientY || 0
        };

        this.metrics.userInteractions.push(interaction);
        
        // Keep only last 50 interactions
        if (this.metrics.userInteractions.length > 50) {
            this.metrics.userInteractions = this.metrics.userInteractions.slice(-50);
        }

        // Calculate interaction response time
        if (type === 'click' || type === 'touch') {
            this.measureInteractionResponse(event);
        }
    }

    measureInteractionResponse(event) {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
            const responseTime = performance.now() - startTime;
            if (responseTime > 100) {
                console.warn(`Slow interaction response: ${responseTime}ms`);
            }
        });
    }

    calculateCarbonFootprint() {
        // Carbon calculation based on:
        // - CPU usage (estimated from performance)
        // - Network usage (data transfer)
        // - Memory usage
        // - Time spent on page

        const timeOnPage = (performance.now() - this.startTime) / 1000; // seconds
        const networkUsage = this.getTotalNetworkUsage();
        const memoryUsage = this.metrics.resourceUsage.memoryUsed || 0;

        // Simplified carbon calculation (grams CO2)
        const cpuCarbon = timeOnPage * 0.0001; // 0.1mg per second
        const networkCarbon = networkUsage * 0.000006; // 6μg per byte
        const memoryCarbon = memoryUsage * 0.00001; // 10μg per MB

        this.metrics.carbonFootprint = cpuCarbon + networkCarbon + memoryCarbon;
        
        // Update carbon indicator if exists
        this.updateCarbonIndicator();
    }

    getTotalNetworkUsage() {
        return this.metrics.apiCalls.reduce((total, call) => {
            return total + (call.transferSize || 0);
        }, 0);
    }

    updateCarbonIndicator() {
        const indicator = document.getElementById('carbon-indicator');
        if (indicator) {
            const carbon = this.metrics.carbonFootprint;
            indicator.textContent = `🌱 ${carbon.toFixed(3)}g CO2`;
            
            // Update color based on carbon level
            if (carbon < 0.1) {
                indicator.style.background = '#059669'; // Green
            } else if (carbon < 0.5) {
                indicator.style.background = '#d97706'; // Orange
            } else {
                indicator.style.background = '#dc2626'; // Red
            }
        }
    }

    calculatePerformanceScore() {
        let score = 100;
        const load = this.metrics.pageLoad;

        // Deduct points for slow loading
        if (load.loadComplete > 3000) score -= 30;
        if (load.loadComplete > 5000) score -= 20;
        if (load.domContentLoaded > 2000) score -= 20;
        if (load.firstContentfulPaint > 2500) score -= 15;

        this.metrics.performanceScore = Math.max(score, 0);
        return this.metrics.performanceScore;
    }

    checkColorContrast() {
        // Simplified color contrast check
        const elements = document.querySelectorAll('*');
        let issues = 0;
        
        for (let i = 0; i < Math.min(elements.length, 20); i++) {
            const element = elements[i];
            const styles = window.getComputedStyle(element);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            
            if (color === backgroundColor && color !== 'rgba(0, 0, 0, 0)') {
                issues++;
            }
        }
        
        return { issues, elementsChecked: Math.min(elements.length, 20) };
    }

    checkKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        return {
            focusableCount: focusableElements.length,
            hasTabIndex: document.querySelectorAll('[tabindex]').length > 0
        };
    }

    checkTouchTargets() {
        const interactiveElements = document.querySelectorAll('button, a, input, [onclick]');
        let smallTargets = 0;
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                smallTargets++;
            }
        });
        
        return {
            total: interactiveElements.length,
            smallTargets: smallTargets,
            compliance: ((interactiveElements.length - smallTargets) / interactiveElements.length * 100).toFixed(1)
        };
    }

    getResourceType(url) {
        if (url.includes('.js')) return 'javascript';
        if (url.includes('.css')) return 'stylesheet';
        if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg')) return 'image';
        if (url.includes('/api/')) return 'api';
        return 'other';
    }

    getMetrics() {
        return {
            ...this.metrics,
            sessionDuration: Math.round((performance.now() - this.startTime) / 1000),
            timestamp: new Date().toISOString()
        };
    }

    generateReport() {
        const metrics = this.getMetrics();
        
        console.log("📊 PERFORMANCE REPORT");
        console.log("====================");
        console.log("⏱️  Page Load:", metrics.pageLoad);
        console.log("🌱 Carbon Footprint:", metrics.carbonFootprint.toFixed(3), "g CO2");
        console.log("📱 Mobile Optimization:", metrics.mobileOptimization);
        console.log("♿ Accessibility:", metrics.accessibility);
        console.log("💾 Resource Usage:", metrics.resourceUsage);
        console.log("🎯 Performance Score:", metrics.performanceScore);
        
        return metrics;
    }

    stop() {
        this.isMonitoring = false;
        
        // Disconnect observers
        Object.values(this.observers).forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        
        console.log("📊 Performance monitoring stopped");
    }
}

// Export for use
export { PerformanceMonitor };

// Global access
if (typeof window !== 'undefined') {
    window.PerformanceMonitor = PerformanceMonitor;
    
    // Auto-start monitoring
    window.performanceMonitor = new PerformanceMonitor();
    
    // Global function to get metrics
    window.getPerformanceMetrics = () => {
        return window.performanceMonitor.getMetrics();
    };
    
    // Global function to generate report
    window.generatePerformanceReport = () => {
        return window.performanceMonitor.generateReport();
    };
}
