// Performance Optimizer - Green Computing Enhancement
class PerformanceOptimizer {
    constructor() {
        this.optimizations = {
            imageOptimization: false,
            lazyLoading: false,
            caching: false,
            compression: false,
            prefetching: false,
            serviceWorker: false
        };
        
        this.settings = {
            enableLazyLoading: true,
            enableImageOptimization: true,
            enableCaching: true,
            enablePrefetching: true,
            enableServiceWorker: true,
            carbonThreshold: 1.0 // grams CO2
        };
        
        console.log("⚡ Performance Optimizer initialized");
        this.init();
    }

    async init() {
        // Apply optimizations in order of impact
        await this.optimizeImages();
        await this.enableLazyLoading();
        await this.setupCaching();
        await this.enablePrefetching();
        await this.registerServiceWorker();
        await this.optimizeCSS();
        await this.optimizeJavaScript();
        
        this.monitorPerformance();
        console.log("✅ Performance optimizations applied");
    }

    async optimizeImages() {
        if (!this.settings.enableImageOptimization) return;
        
        try {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Add loading="lazy" for modern browsers
                if ('loading' in HTMLImageElement.prototype) {
                    img.loading = 'lazy';
                }
                
                // Optimize image format based on browser support
                this.optimizeImageFormat(img);
                
                // Add responsive image attributes
                this.makeImageResponsive(img);
            });
            
            this.optimizations.imageOptimization = true;
            console.log("🖼️ Image optimization applied to", images.length, "images");
            
        } catch (error) {
            console.warn("Image optimization failed:", error);
        }
    }

    optimizeImageFormat(img) {
        // Check for WebP support
        if (this.supportsWebP()) {
            const src = img.src;
            if (src && !src.includes('.webp') && !src.includes('data:')) {
                // Convert to WebP if possible (this would need server support)
                // For now, just add WebP preference
                img.dataset.preferredFormat = 'webp';
            }
        }
    }

    makeImageResponsive(img) {
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            // Add responsive attributes
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    async enableLazyLoading() {
        if (!this.settings.enableLazyLoading) return;
        
        try {
            // Lazy load images that don't have native support
            const images = document.querySelectorAll('img:not([loading="lazy"])');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            observer.unobserve(img);
                        }
                    });
                });

                images.forEach(img => {
                    if (img.src && !img.dataset.src) {
                        img.dataset.src = img.src;
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiLz48L3N2Zz4=';
                    }
                    imageObserver.observe(img);
                });
            }
            
            // Lazy load other content
            this.lazyLoadContent();
            
            this.optimizations.lazyLoading = true;
            console.log("🔄 Lazy loading enabled for", images.length, "images");
            
        } catch (error) {
            console.warn("Lazy loading setup failed:", error);
        }
    }

    lazyLoadContent() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        if ('IntersectionObserver' in window && lazyElements.length > 0) {
            const contentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const content = element.dataset.lazy;
                        
                        if (content) {
                            element.innerHTML = content;
                            element.removeAttribute('data-lazy');
                        }
                        
                        contentObserver.unobserve(element);
                    }
                });
            });

            lazyElements.forEach(element => {
                contentObserver.observe(element);
            });
        }
    }

    async setupCaching() {
        if (!this.settings.enableCaching) return;
        
        try {
            // Setup localStorage caching for API responses
            this.setupAPICache();
            
            // Setup sessionStorage for temporary data
            this.setupSessionCache();
            
            // Setup memory cache for frequently accessed data
            this.setupMemoryCache();
            
            this.optimizations.caching = true;
            console.log("💾 Caching system enabled");
            
        } catch (error) {
            console.warn("Caching setup failed:", error);
        }
    }

    setupAPICache() {
        // Intercept fetch requests for caching
        const originalFetch = window.fetch;
        
        window.fetch = async function(url, options = {}) {
            const method = options.method || 'GET';
            
            // Only cache GET requests
            if (method === 'GET' && url.includes('/api/')) {
                const cacheKey = `api_cache_${url}`;
                const cached = localStorage.getItem(cacheKey);
                
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    const age = Date.now() - timestamp;
                    
                    // Cache for 5 minutes
                    if (age < 300000) {
                        console.log("📦 Using cached response for", url);
                        return Promise.resolve(new Response(JSON.stringify(data)));
                    }
                }
                
                // Make request and cache response
                const response = await originalFetch(url, options);
                const clonedResponse = response.clone();
                
                if (response.ok) {
                    try {
                        const data = await clonedResponse.json();
                        localStorage.setItem(cacheKey, JSON.stringify({
                            data: data,
                            timestamp: Date.now()
                        }));
                    } catch (e) {
                        // Not JSON, skip caching
                    }
                }
                
                return response;
            }
            
            return originalFetch(url, options);
        };
    }

    setupSessionCache() {
        // Cache form data and user preferences
        window.addEventListener('beforeunload', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach((form, index) => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                sessionStorage.setItem(`form_${index}`, JSON.stringify(data));
            });
        });
    }

    setupMemoryCache() {
        // Simple in-memory cache for frequently accessed data
        window.memoryCache = new Map();
        
        window.cacheGet = (key) => {
            const item = window.memoryCache.get(key);
            if (item && Date.now() - item.timestamp < 60000) { // 1 minute
                return item.data;
            }
            return null;
        };
        
        window.cacheSet = (key, data) => {
            window.memoryCache.set(key, {
                data: data,
                timestamp: Date.now()
            });
            
            // Limit cache size
            if (window.memoryCache.size > 50) {
                const firstKey = window.memoryCache.keys().next().value;
                window.memoryCache.delete(firstKey);
            }
        };
    }

    async enablePrefetching() {
        if (!this.settings.enablePrefetching) return;
        
        try {
            // Prefetch critical resources
            this.prefetchCriticalResources();
            
            // Prefetch on hover for links
            this.setupHoverPrefetch();
            
            // Prefetch next likely pages
            this.prefetchLikelyPages();
            
            this.optimizations.prefetching = true;
            console.log("🚀 Prefetching enabled");
            
        } catch (error) {
            console.warn("Prefetching setup failed:", error);
        }
    }

    prefetchCriticalResources() {
        const criticalResources = [
            'https://mubaroqadb.github.io/agenticlearn-shared/js/api-client.js',
            'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        ];
        
        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    setupHoverPrefetch() {
        document.addEventListener('mouseover', (event) => {
            if (event.target.tagName === 'A' && event.target.href) {
                const url = event.target.href;
                if (url.includes(window.location.origin)) {
                    this.prefetchPage(url);
                }
            }
        });
    }

    prefetchLikelyPages() {
        // Prefetch likely next pages based on current page
        const currentPath = window.location.pathname;
        let nextPages = [];
        
        if (currentPath.includes('assessment')) {
            nextPages = ['index.html', 'goal-setting.html'];
        } else if (currentPath.includes('index')) {
            nextPages = ['assessment.html'];
        }
        
        nextPages.forEach(page => {
            this.prefetchPage(page);
        });
    }

    prefetchPage(url) {
        if (!document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        }
    }

    async registerServiceWorker() {
        if (!this.settings.enableServiceWorker || !('serviceWorker' in navigator)) return;
        
        try {
            // Register service worker for caching and offline support
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log("👷 Service Worker registered:", registration);
            
            this.optimizations.serviceWorker = true;
            
        } catch (error) {
            console.warn("Service Worker registration failed:", error);
        }
    }

    async optimizeCSS() {
        try {
            // Remove unused CSS (simplified version)
            this.removeUnusedCSS();
            
            // Optimize CSS delivery
            this.optimizeCSSDelivery();
            
            console.log("🎨 CSS optimization applied");
            
        } catch (error) {
            console.warn("CSS optimization failed:", error);
        }
    }

    removeUnusedCSS() {
        // This is a simplified version - in production, use tools like PurgeCSS
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        stylesheets.forEach(stylesheet => {
            // Add media queries for non-critical CSS
            if (!stylesheet.href.includes('critical')) {
                stylesheet.media = 'print';
                stylesheet.onload = function() {
                    this.media = 'all';
                };
            }
        });
    }

    optimizeCSSDelivery() {
        // Inline critical CSS and defer non-critical
        const criticalCSS = `
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
            .btn { padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    async optimizeJavaScript() {
        try {
            // Defer non-critical JavaScript
            this.deferNonCriticalJS();
            
            // Optimize event listeners
            this.optimizeEventListeners();
            
            console.log("⚡ JavaScript optimization applied");
            
        } catch (error) {
            console.warn("JavaScript optimization failed:", error);
        }
    }

    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[src]');
        
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.defer && !script.async) {
                script.defer = true;
            }
        });
    }

    optimizeEventListeners() {
        // Use passive listeners for better performance
        const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
        
        passiveEvents.forEach(eventType => {
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            
            EventTarget.prototype.addEventListener = function(type, listener, options) {
                if (passiveEvents.includes(type) && typeof options !== 'object') {
                    options = { passive: true };
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
        });
    }

    monitorPerformance() {
        // Monitor performance and adjust optimizations
        setInterval(() => {
            const metrics = this.getPerformanceMetrics();
            
            if (metrics.carbonFootprint > this.settings.carbonThreshold) {
                console.warn("🌱 Carbon threshold exceeded, applying additional optimizations");
                this.applyEmergencyOptimizations();
            }
            
        }, 30000); // Check every 30 seconds
    }

    applyEmergencyOptimizations() {
        // Reduce quality/features to lower carbon footprint
        console.log("🚨 Applying emergency optimizations");
        
        // Reduce animation frame rate
        this.reduceAnimations();
        
        // Pause non-essential features
        this.pauseNonEssentialFeatures();
        
        // Clear caches to free memory
        this.clearCaches();
    }

    reduceAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    pauseNonEssentialFeatures() {
        // Pause auto-refresh, polling, etc.
        window.dispatchEvent(new CustomEvent('pauseNonEssential'));
    }

    clearCaches() {
        // Clear memory cache
        if (window.memoryCache) {
            window.memoryCache.clear();
        }
        
        // Clear old localStorage entries
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('api_cache_')) {
                const item = localStorage.getItem(key);
                try {
                    const { timestamp } = JSON.parse(item);
                    if (Date.now() - timestamp > 300000) { // 5 minutes
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        }
    }

    getPerformanceMetrics() {
        return {
            carbonFootprint: window.performanceMonitor?.metrics.carbonFootprint || 0,
            memoryUsage: performance.memory?.usedJSHeapSize || 0,
            optimizations: this.optimizations
        };
    }

    getOptimizationStatus() {
        return {
            optimizations: this.optimizations,
            settings: this.settings,
            metrics: this.getPerformanceMetrics()
        };
    }
}

// Export for use
export { PerformanceOptimizer };

// Global access and auto-start
if (typeof window !== 'undefined') {
    window.PerformanceOptimizer = PerformanceOptimizer;
    
    // Auto-start optimization
    window.performanceOptimizer = new PerformanceOptimizer();
    
    // Global function to get optimization status
    window.getOptimizationStatus = () => {
        return window.performanceOptimizer.getOptimizationStatus();
    };
}
