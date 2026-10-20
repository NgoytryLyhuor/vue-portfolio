// PWA Install Composable - Manages app installation prompt for Android, iOS & Desktop
import { ref, onMounted } from 'vue';

const deferredPrompt = ref(null);
const canInstall = ref(false);
const isInstalled = ref(false);
const isIos = ref(false);
const showIosGuide = ref(false);
const isBannerDismissed = ref(false);

export function usePwaInstall() {
    onMounted(() => {
        if (typeof window === 'undefined') return;

        // Check if already running as standalone PWA
        const isStandalone = window.navigator.standalone === true || 
            window.matchMedia('(display-mode: standalone)').matches ||
            window.matchMedia('(display-mode: window-controls-overlay)').matches;

        if (isStandalone) {
            isInstalled.value = true;
            canInstall.value = false;
            return;
        }

        // Check if iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
        if (isAppleDevice && !isStandalone) {
            isIos.value = true;
            // On iOS, can always trigger manual Add-to-Home-Screen guide
            canInstall.value = true;
        }

        // Check if previously dismissed banner within 7 days
        const dismissedTimestamp = localStorage.getItem('pwa_install_dismissed');
        if (dismissedTimestamp) {
            const daysSinceDismissed = (Date.now() - parseInt(dismissedTimestamp, 10)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) {
                isBannerDismissed.value = true;
            }
        }

        // Android / Desktop beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt.value = e;
            canInstall.value = true;
        });

        // App installed event
        window.addEventListener('appinstalled', () => {
            isInstalled.value = true;
            canInstall.value = false;
            deferredPrompt.value = null;
            showIosGuide.value = false;
            localStorage.setItem('pwa_is_installed', 'true');
        });
    });

    const installApp = async () => {
        // If iOS, open the step-by-step guidance modal
        if (isIos.value) {
            showIosGuide.value = true;
            return { outcome: 'ios_guide' };
        }

        // If Android / Desktop with deferredPrompt
        if (deferredPrompt.value) {
            deferredPrompt.value.prompt();
            const choiceResult = await deferredPrompt.value.userChoice;
            if (choiceResult.outcome === 'accepted') {
                isInstalled.value = true;
                canInstall.value = false;
            }
            deferredPrompt.value = null;
            return choiceResult;
        } else {
            // Fallback for browsers that support manual add
            showIosGuide.value = true;
            return { outcome: 'manual_guide' };
        }
    };

    const dismissBanner = () => {
        isBannerDismissed.value = true;
        localStorage.setItem('pwa_install_dismissed', Date.now().toString());
    };

    const closeIosGuide = () => {
        showIosGuide.value = false;
    };

    return {
        canInstall,
        isInstalled,
        isIos,
        showIosGuide,
        isBannerDismissed,
        installApp,
        dismissBanner,
        closeIosGuide
    };
}
