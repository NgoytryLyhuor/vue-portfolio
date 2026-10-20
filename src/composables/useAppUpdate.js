// useAppUpdate.js - Composable to monitor PWA & service worker updates and allow instant 1-tap app refresh
import { ref, onMounted } from 'vue';

const updateAvailable = ref(false);
const isCheckingUpdate = ref(false);
const updateStatus = ref(null); // 'checking' | 'updated' | 'up_to_date' | 'error' | null
const lastCheckedTime = ref(null);
const currentVersion = ref('v4.1.0');
let swRegistration = null;

export function useAppUpdate() {
    // Check if a service worker update is waiting or available
    const checkServiceWorkerUpdate = async () => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return false;
        }

        try {
            if (!swRegistration) {
                swRegistration = await navigator.serviceWorker.getRegistration();
            }

            if (!swRegistration) return false;

            // 1. Check if there is already a waiting worker
            if (swRegistration.waiting) {
                updateAvailable.value = true;
                return true;
            }

            // 2. Trigger check on the server
            await swRegistration.update();

            if (swRegistration.waiting) {
                updateAvailable.value = true;
                return true;
            }

            return false;
        } catch (err) {
            console.warn('[AppUpdate] SW check error:', err);
            return false;
        }
    };

    // Check server ETag/hash to see if a newer build was deployed
    const checkServerBuildUpdate = async () => {
        if (typeof window === 'undefined') return false;

        try {
            // Fetch root HTML with cache-busting param and no-cache headers
            const response = await fetch(`/?_t=${Date.now()}`, {
                method: 'HEAD',
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });

            const newEtag = response.headers.get('etag');
            const newLastModified = response.headers.get('last-modified');
            const storedEtag = localStorage.getItem('app_build_etag');
            const storedModified = localStorage.getItem('app_build_last_modified');

            if (newEtag && storedEtag && newEtag !== storedEtag) {
                updateAvailable.value = true;
                return true;
            }

            if (newLastModified && storedModified && newLastModified !== storedModified) {
                updateAvailable.value = true;
                return true;
            }

            // Save initial values if not present
            if (newEtag && !storedEtag) {
                localStorage.setItem('app_build_etag', newEtag);
            }
            if (newLastModified && !storedModified) {
                localStorage.setItem('app_build_last_modified', newLastModified);
            }

            return false;
        } catch (err) {
            console.warn('[AppUpdate] Server build check warning:', err);
            return false;
        }
    };

    // User or automatic trigger to check for updates
    const checkForUpdate = async () => {
        if (isCheckingUpdate.value) return;

        isCheckingUpdate.value = true;
        updateStatus.value = 'checking';

        try {
            const swHasUpdate = await checkServiceWorkerUpdate();
            const serverHasUpdate = await checkServerBuildUpdate();

            lastCheckedTime.value = new Date();

            if (swHasUpdate || serverHasUpdate || updateAvailable.value) {
                updateAvailable.value = true;
                updateStatus.value = 'updated';
            } else {
                updateStatus.value = 'up_to_date';
                setTimeout(() => {
                    if (updateStatus.value === 'up_to_date') {
                        updateStatus.value = null;
                    }
                }, 4000);
            }
        } catch (err) {
            console.warn('[AppUpdate] Check error:', err);
            updateStatus.value = 'error';
            setTimeout(() => {
                if (updateStatus.value === 'error') {
                    updateStatus.value = null;
                }
            }, 3000);
        } finally {
            isCheckingUpdate.value = false;
        }
    };

    // Apply the update: trigger service worker skipWaiting and hard reload
    const applyUpdate = async () => {
        try {
            if (swRegistration && swRegistration.waiting) {
                swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }

            // Clear sessionStorage to discard any stale state
            if (typeof window !== 'undefined' && window.sessionStorage) {
                window.sessionStorage.clear();
            }

            // Refresh localStorage deployment stamps
            localStorage.removeItem('app_build_etag');
            localStorage.removeItem('app_build_last_modified');

            // Hard reload to load latest chunks
            setTimeout(() => {
                window.location.reload();
            }, 250);
        } catch (err) {
            console.warn('[AppUpdate] Apply update error:', err);
            window.location.reload();
        }
    };

    const dismissNotification = () => {
        updateAvailable.value = false;
    };

    onMounted(() => {
        if (typeof window === 'undefined') return;

        // Listen for new service worker controller taking over
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then((reg) => {
                swRegistration = reg;
                if (!reg) return;

                if (reg.waiting) {
                    updateAvailable.value = true;
                }

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                updateAvailable.value = true;
                            }
                        });
                    }
                });
            });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                // If controller changes, ensure page reflects the newest assets
                console.log('[AppUpdate] New Service Worker active.');
            });
        }

        // Automatic background check when app resumes focus or tab becomes visible
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                checkServiceWorkerUpdate();
            }
        });

        // Initial silent check after 3 seconds of page load
        setTimeout(() => {
            checkServiceWorkerUpdate();
        }, 3000);
    });

    return {
        updateAvailable,
        isCheckingUpdate,
        updateStatus,
        lastCheckedTime,
        currentVersion,
        checkForUpdate,
        applyUpdate,
        dismissNotification
    };
}
