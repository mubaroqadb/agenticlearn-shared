/**
 * AgenticLearn Green Computing Utilities
 * Optimized for minimal energy consumption and carbon footprint
 */

// Carbon Footprint Tracker
class CarbonTracker {
    constructor() {
        this.startTime = performance.now();
        this.apiCalls = 0;
        this.dataTransferred = 0;
        this.renderCount = 0;
        this.carbonFactor = 0.000001; // grams CO2 per operation
    }

    // Track API calls for carbon calculation
    trackAPICall(bytes = 1024) {
        this.apiCalls++;
        this.dataTransferred += bytes;
        this.updateCarbonIndicator();
    }

    // Track DOM renders
    trackRender() {
        this.renderCount++;
        this.updateCarbonIndicator();
    }

    // Calculate estimated carbon footprint
    calculateCarbon() {
        const runtime = (performance.now() - this.startTime) / 1000; // seconds
        const operations = this.apiCalls + this.renderCount;
        const dataKB = this.dataTransferred / 1024;
        
        // Simplified carbon calculation
        const carbon = (runtime * 0.1 + operations * 0.01 + dataKB * 0.001) * this.carbonFactor;
        return carbon;
    }

    // Update carbon indicator in UI
    updateCarbonIndicator() {
        const carbon = this.calculateCarbon();
        const indicator = document.getElementById('carbon-indicator');
        
        if (indicator) {
            indicator.textContent = `🌱 ${carbon.toFixed(6)}g CO2`;
            
            // Color coding based on carbon footprint
            indicator.className = 'carbon-indicator';
            if (carbon > 0.001) {
                indicator.classList.add('danger');
            } else if (carbon > 0.0005) {
                indicator.classList.add('warning');
            }
        }
    }

    // Get carbon report
    getReport() {
        return {
            runtime: (performance.now() - this.startTime) / 1000,
            apiCalls: this.apiCalls,
            dataTransferred: this.dataTransferred,
            renderCount: this.renderCount,
            carbonFootprint: this.calculateCarbon()
        };
    }
}

// Energy Efficient DOM Utilities
class GreenDOM {
    // Efficient element selection with caching
    static cache = new Map();
    
    static select(selector) {
        if (!this.cache.has(selector)) {
            this.cache.set(selector, document.querySelector(selector));
        }
        return this.cache.get(selector);
    }

    // Batch DOM updates to minimize reflows
    static batchUpdate(updates) {
        const fragment = document.createDocumentFragment();
        updates.forEach(update => {
            if (typeof update === 'function') {
                update(fragment);
            }
        });
        return fragment;
    }

    // Efficient event delegation
    static delegate(parent, selector, event, handler) {
        parent.addEventListener(event, (e) => {
            if (e.target.matches(selector)) {
                handler(e);
            }
        });
    }

    // Lazy loading for images and content
    static lazyLoad(selector) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    observer.unobserve(element);
                }
            });
        });

        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    }
}

// Green API Client - Optimized for minimal data transfer
class GreenAPIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.cache = new Map();
        this.carbonTracker = new CarbonTracker();
    }

    // Efficient fetch with caching and compression
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const cacheKey = `${url}_${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.cache.has(cacheKey) && !options.skipCache) {
            console.log('🌱 Cache hit:', endpoint);
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Track carbon footprint
            const contentLength = response.headers.get('content-length') || 1024;
            this.carbonTracker.trackAPICall(parseInt(contentLength));
            
            // Cache successful responses
            if (response.status === 200) {
                this.cache.set(cacheKey, data);
            }

            return data;
        } catch (error) {
            console.error('🌱 Green API Error:', error);
            throw error;
        }
    }

    // Clear cache to free memory
    clearCache() {
        this.cache.clear();
        console.log('🌱 Cache cleared');
    }

    // Get carbon report
    getCarbonReport() {
        return this.carbonTracker.getReport();
    }
}

// Performance Monitor for Green Computing
class GreenPerformance {
    static monitor() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }

        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                console.log('🌱 Memory:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
                });
            }, 30000); // Every 30 seconds
        }
    }

    // Optimize images for green computing
    static optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            // Add loading="lazy" for energy efficiency
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding="async" for better performance
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    }
}

// Initialize Green Computing
const greenComputing = {
    carbonTracker: new CarbonTracker(),
    dom: GreenDOM,
    performance: GreenPerformance,
    
    init() {
        // Add carbon indicator to page
        if (!document.getElementById('carbon-indicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'carbon-indicator';
            indicator.className = 'carbon-indicator';
            indicator.textContent = '🌱 0.000000g CO2';
            document.body.appendChild(indicator);
        }

        // Start performance monitoring
        this.performance.monitor();
        this.performance.optimizeImages();

        // Update carbon indicator every 5 seconds
        setInterval(() => {
            this.carbonTracker.updateCarbonIndicator();
        }, 5000);

        console.log('🌱 Green Computing initialized');
    }
};

// Export for ES6 modules
export { CarbonTracker, GreenDOM, GreenAPIClient, GreenPerformance, greenComputing };

// Auto-initialize if not using modules
if (typeof module === 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        greenComputing.init();
    });
}
