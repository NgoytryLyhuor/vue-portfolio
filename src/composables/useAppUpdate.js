// useAppUpdate.js - Composable to monitor PWA & service worker updates and allow instant 1-tap app refresh
import { ref, onMounted } from 'vue';
import { APP_VERSION, BUILD_TIMESTAMP } from '@/version';

const updateAvailable = ref(false);
const isCheckingUpdate = ref(false);
const updateStatus = ref(null); // 'checking' | 'updated' | 'up_to_date' | 'error' | null
const lastCheckedTime = ref(null);
const currentVersion = ref(APP_VERSION);
let swRegistration = null;

export function useAppUpdate() {
    // 1. Check version.json endpoint on the server
    const checkVersionEndpoint = async () => {
        if (typeof window === 'undefined') return false;

        try {
            const res = await fetch(`/version.json?_t=${Date.now()}`, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });

            if (!res.ok) return false;

            const serverData = await res.json();
            if (!serverData) return false;

            // Check if server version or build time is newer
            const isNewerVersion = serverData.version && serverData.version !== APP_VERSION;
            const isNewerBuild = serverData.buildTime && serverData.buildTime > BUILD_TIMESTAMP;

            if (isNewerVersion || isNewerBuild) {
                console.log('[AppUpdate] Newer version detected on server:', serverData.version, 'Local:', APP_VERSION);
                updateAvailable.value = true;
                return true;
            }

            return false;
        } catch (err) {
            console.warn('[AppUpdate] Version endpoint check warning:', err);
            return false;
        }
    };

    // 2. Check if a service worker update is waiting or available
    const checkServiceWorkerUpdate = async () => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return false;
        }

        try {
            if (!swRegistration) {
                swRegistration = await navigator.serviceWorker.getRegistration();
            }

            if (!swRegistration) return false;

            // Check if there is already a waiting worker
            if (swRegistration.waiting) {
                updateAvailable.value = true;
                return true;
            }

            // Trigger check on the server
            await swRegistration.update();

            if (swRegistration.waiting) {
                updateAvailable.value = true;
                return true;
            }

            return false;
        } catch (err) {
            console.warn('[AppUpdate] SW check warning:', err);
            return false;
        }
    };

    // 3. User or automatic trigger to check for updates
    const checkForUpdate = async () => {
        if (isCheckingUpdate.value) return;

        isCheckingUpdate.value = true;
        updateStatus.value = 'checking';

        try {
            const versionHasUpdate = await checkVersionEndpoint();
            const swHasUpdate = await checkServiceWorkerUpdate();

            lastCheckedTime.value = new Date();

            if (versionHasUpdate || swHasUpdate || updateAvailable.value) {
                updateAvailable.value = true;
                updateStatus.value = 'updated';
            } else {
                updateStatus.value = 'up_to_date';
                setTimeout(() => {
                    if (updateStatus.value === 'up_to_date') {
                        updateStatus.value = null;
                    }
                }, 3500);
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

    // 4. Apply the update: nuke old caches, activate new SW, and hard reload with cache buster
    const applyUpdate = async () => {
        try {
            if (typeof window !== 'undefined') {
                // Post skip waiting to any waiting service worker
                if (swRegistration && swRegistration.waiting) {
                    swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
                }

                // Delete all caches in CacheStorage
                if ('caches' in window) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map(key => caches.delete(key)));
                }

                // Clear sessionStorage
                if (window.sessionStorage) {
                    window.sessionStorage.clear();
                }

                // Clear stored etags
                localStorage.removeItem('app_build_etag');
                localStorage.removeItem('app_build_last_modified');

                // Force hard reload bypassing cache
                const freshUrl = window.location.origin + window.location.pathname + '?_fresh=' + Date.now();
                window.location.replace(freshUrl);
            }
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

        // Listen for SW broadcast messages
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && (event.data.type === 'UPDATE_AVAILABLE' || event.data.type === 'CONTROLLER_ACTIVE')) {
                    console.log('[AppUpdate] Received SW update message');
                    updateAvailable.value = true;
                }
            });

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
                            if (newWorker.state === 'installed') {
                                updateAvailable.value = true;
                            }
                        });
                    }
                });
            });
        }

        // Run immediate version check right after mount
        checkVersionEndpoint();

        // Also check SW after 1 second
        setTimeout(() => {
            checkServiceWorkerUpdate();
            checkVersionEndpoint();
        }, 1200);

        // Automatic background check on visibility change (user returns to app)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                checkVersionEndpoint();
                checkServiceWorkerUpdate();
            }
        });

        // Periodic check every 30 seconds
        const intervalId = setInterval(() => {
            checkVersionEndpoint();
        }, 30000);

        window.addEventListener('beforeunload', () => {
            clearInterval(intervalId);
        });
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
