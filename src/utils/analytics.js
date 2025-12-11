// Analytics Utility - Privacy-friendly analytics tracking
// Supports Google Analytics 4 and custom event tracking

class Analytics {
    constructor() {
        // Use existing GA ID from index.html or environment variable
        this.gaId = process.env.VUE_APP_GA_ID || 'G-KZ6TPEPK8G';
        // Enable analytics in production or if GA is already loaded
        this.isEnabled = process.env.NODE_ENV === 'production' || typeof window !== 'undefined' && window.gtag;
        this.initialized = false;
    }

    // Initialize analytics
    init() {
        if (this.initialized) {
            return;
        }

        // Check if Google Analytics is already loaded (from index.html)
        if (window.gtag && window.dataLayer) {
            console.log('[Analytics] Google Analytics already loaded');
            this.isEnabled = true;
            this.initialized = true;
            this.trackPageView(window.location.pathname);
            return;
        }

        // Load Google Analytics script if GA ID is provided
        if (this.gaId && this.isEnabled) {
            this.loadGoogleAnalytics();
        }

        this.initialized = true;
        this.trackEvent('page_view', { page: window.location.pathname });
    }

    // Load Google Analytics 4
    loadGoogleAnalytics() {
        // Check if already loaded
        if (window.gtag) {
            return;
        }

        // Create script element
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script1);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', this.gaId, {
            page_path: window.location.pathname,
            anonymize_ip: true, // Privacy-friendly
        });

        window.gtag = gtag;
    }

    // Track page view
    trackPageView(path) {
        const pagePath = path || window.location.pathname;

        // Use existing gtag if available (from index.html)
        if (window.gtag) {
            const gaId = this.gaId || 'G-KZ6TPEPK8G'; // Use existing GA ID from index.html if available
            window.gtag('config', gaId, {
                page_path: pagePath,
                anonymize_ip: true,
            });
        }

        // Also log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Analytics] Page view:', pagePath);
        }
    }

    // Track custom event
    trackEvent(eventName, eventParams = {}) {
        if (window.gtag) {
            window.gtag('event', eventName, {
                ...eventParams,
                timestamp: new Date().toISOString(),
            });
        }

        // Also log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Analytics] Event:', eventName, eventParams);
        }
    }

    // Track button clicks
    trackClick(buttonName, location = 'unknown') {
        this.trackEvent('click', {
            button_name: buttonName,
            location: location,
        });
    }

    // Track external link clicks
    trackExternalLink(url) {
        this.trackEvent('external_link_click', {
            link_url: url,
        });
    }

    // Track download events
    trackDownload(fileName) {
        this.trackEvent('file_download', {
            file_name: fileName,
        });
    }

    // Track search queries
    trackSearch(query, resultsCount = 0) {
        this.trackEvent('search', {
            search_term: query,
            results_count: resultsCount,
        });
    }

    // Track form submissions
    trackFormSubmit(formName, success = true) {
        this.trackEvent('form_submit', {
            form_name: formName,
            success: success,
        });
    }

    // Track theme changes
    trackThemeChange(theme) {
        this.trackEvent('theme_change', {
            theme: theme,
        });
    }

    // Track project views
    trackProjectView(projectName) {
        this.trackEvent('project_view', {
            project_name: projectName,
        });
    }

    // Track blog article views
    trackArticleView(articleId, articleTitle) {
        this.trackEvent('article_view', {
            article_id: articleId,
            article_title: articleTitle,
        });
    }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;

