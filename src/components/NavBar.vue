<template>
    <nav
        class="fixed w-full bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 py-3.5 px-4 sm:px-6 lg:px-40 shadow-sm backdrop-blur-md z-50 transition-colors duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Brand / Logo -->
            <div class="flex items-center">
                <router-link to="/"
                    class="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 focus:outline-none"
                    aria-label="Home - Ngoytry Lyhuor Portfolio">
                    <div class="flex items-center">
                        <img 
                            src="../assets/logo.png" 
                            alt="Ngoytry Lyhuor Logo"
                            class="h-7 w-7 mr-3 transition-transform duration-200 hover:scale-105"
                            width="28"
                            height="28"
                            loading="eager"
                        >
                        <h1 class="text-[16px] font-bold tracking-tight dark:text-white">Ngoytry Lyhuor</h1>
                    </div>
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-6 ml-10">
                    <router-link 
                        v-for="link in standardNavLinks" 
                        :key="link.path" 
                        :to="link.path"
                        class="hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        :class="{ 'text-green-500 dark:text-green-400 font-semibold': $route.path === link.path }"
                        :aria-label="`Navigate to ${link.label}`"
                        :aria-current="$route.path === link.path ? 'page' : undefined"
                    >
                        {{ link.label }}
                    </router-link>

                    <!-- Other Features Dropdown (Desktop) -->
                    <div class="relative" ref="featuresDropdown">
                        <button @click.stop="toggleFeaturesMenu"
                            class="flex items-center hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2 py-1 rounded-md"
                            :class="{ 'text-green-500 dark:text-green-400 font-semibold': isFeatureActive }"
                            aria-label="Other Features" aria-haspopup="true" :aria-expanded="isFeaturesMenuOpen">
                            {{ isKhmer ? 'មុខងារផ្សេងៗ' : 'Other Features' }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-200" viewBox="0 0 20 20"
                                fill="currentColor" :class="{ 'transform rotate-180': isFeaturesMenuOpen }">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <!-- Features dropdown menu -->
                        <transition
                            enter-active-class="transition duration-200 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
                            enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                            enter-to-class="transform opacity-100 scale-100 translate-y-0"
                            leave-active-class="transition duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            leave-from-class="transform opacity-100 scale-100 translate-y-0"
                            leave-to-class="transform opacity-0 scale-95 -translate-y-2"
                        >
                            <div v-if="isFeaturesMenuOpen"
                                class="absolute left-0 w-56 rounded-2xl dark:bg-gray-800/95 mt-2 shadow-2xl z-50 border border-gray-200/80 dark:border-gray-700/80 bg-white/95 backdrop-blur-xl overflow-hidden p-1">
                                <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                    class="flex items-center px-3.5 py-2.5 text-sm rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 w-full text-left transition-all duration-150 cursor-pointer active:scale-95"
                                    :class="{ 'bg-gray-100 dark:bg-gray-700 font-semibold text-green-600 dark:text-green-400': $route.path === feature.path }"
                                    @click="selectFeature(feature.path, $event)">
                                    <component :is="feature.icon" class="h-5 w-5 mr-3 shrink-0 text-gray-500 dark:text-gray-400" />
                                    <span>{{ feature.label }}</span>
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Right Controls: Language Toggle, Theme Toggle & Mobile Hamburger -->
            <div class="flex items-center space-x-2">
                <!-- Language Toggle Button (KM / EN) -->
                <LanguageToggle class="inline-flex" />

                <!-- Theme Toggle Button -->
                <div class="relative" ref="themeDropdown">
                    <button @click.stop="toggleThemeMenu"
                        class="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors focus:outline-none"
                        aria-label="Toggle theme menu" aria-haspopup="true" :aria-expanded="isThemeMenuOpen">
                        <!-- Sun icon for light mode -->
                        <SunIcon v-if="currentTheme === 'light'" class="h-5 w-5 text-amber-500" />
                        <!-- Moon icon for dark mode -->
                        <MoonIcon v-else-if="currentTheme === 'dark'" class="h-5 w-5 text-indigo-400" />
                        <!-- ComputerDesktopIcon for system -->
                        <ComputerDesktopIcon v-else-if="currentTheme === 'system'" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>

                    <!-- Theme dropdown menu -->
                    <transition
                        enter-active-class="transition duration-200 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
                        enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                        enter-to-class="transform opacity-100 scale-100 translate-y-0"
                        leave-active-class="transition duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        leave-from-class="transform opacity-100 scale-100 translate-y-0"
                        leave-to-class="transform opacity-0 scale-95 -translate-y-2"
                    >
                        <div v-if="isThemeMenuOpen"
                            class="absolute right-0 w-40 rounded-2xl dark:bg-gray-800/95 mt-2 shadow-2xl z-50 border border-gray-200/80 dark:border-gray-700/80 bg-white/95 backdrop-blur-xl overflow-hidden p-1.5">
                            <button @click="setTheme('light')"
                                class="flex items-center px-3 py-2 text-xs rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 w-full text-left transition-all duration-150 active:scale-95"
                                :class="{ 'bg-gray-100 dark:bg-gray-700 font-semibold text-green-600 dark:text-green-400': currentTheme === 'light' }">
                                <SunIcon class="h-4 w-4 mr-2 text-amber-500" />
                                Light
                            </button>
                            <button @click="setTheme('dark')"
                                class="flex items-center px-3 py-2 text-xs rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 w-full text-left transition-all duration-150 active:scale-95"
                                :class="{ 'bg-gray-100 dark:bg-gray-700 font-semibold text-green-600 dark:text-green-400': currentTheme === 'dark' }">
                                <MoonIcon class="h-4 w-4 mr-2 text-indigo-400" />
                                Dark
                            </button>
                            <button @click="setTheme('system')"
                                class="flex items-center px-3 py-2 text-xs rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70 w-full text-left transition-all duration-150 active:scale-95"
                                :class="{ 'bg-gray-100 dark:bg-gray-700 font-semibold text-green-600 dark:text-green-400': currentTheme === 'system' }">
                                <ComputerDesktopIcon class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                System
                            </button>
                        </div>
                    </transition>
                </div>

                <!-- Clean Mobile Hamburger Button -->
                <button @click.stop="toggleMobileMenu"
                    class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors focus:outline-none"
                    aria-label="Toggle navigation menu"
                    :aria-expanded="isMobileMenuOpen">
                    <component :is="isMobileMenuOpen ? XMarkIcon : Bars3Icon" class="h-6 w-6 transition-transform duration-150" />
                </button>
            </div>
        </div>

        <!-- Full-screen Mobile Backdrop (Tap outside to close) -->
        <transition
            enter-active-class="transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isMobileMenuOpen"
                @click="isMobileMenuOpen = false"
                class="md:hidden fixed inset-0 top-[57px] bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40"
                aria-hidden="true" />
        </transition>

        <!-- Clean Slide-down Mobile Navigation Menu -->
        <transition
            enter-active-class="transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            enter-from-class="opacity-0 -translate-y-4 scale-[0.98]"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-3 scale-[0.98]"
        >
            <div v-if="isMobileMenuOpen"
                class="md:hidden absolute left-0 right-0 top-full w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div class="px-4 py-3 space-y-2">
                    <!-- Main Navigation Links -->
                    <div class="space-y-0.5">
                        <router-link v-for="link in standardNavLinks" :key="link.path" :to="link.path"
                            class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-colors cursor-pointer"
                            :class="[
                                $route.path === link.path
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 font-semibold'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                            ]"
                            @click="navigateAndClose(link.path)">
                            <component :is="link.icon" class="h-5 w-5" :class="$route.path === link.path ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'" />
                            <span>{{ link.label }}</span>
                        </router-link>
                    </div>

                    <!-- Other Features Section -->
                    <div class="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
                        <div class="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            {{ isKhmer ? 'មុខងារផ្សេងៗ' : 'Other Features' }}
                        </div>
                        <div class="space-y-0.5">
                            <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors cursor-pointer"
                                :class="[
                                    $route.path === feature.path
                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 font-semibold'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                                ]"
                                @click="navigateAndClose(feature.path)">
                                <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" :class="feature.badgeBg">
                                    <component :is="feature.icon" class="h-4 w-4" :class="feature.badgeText" />
                                </div>
                                <span>{{ feature.label }}</span>
                            </router-link>
                        </div>
                    </div>

                    <!-- Language Switcher Row in Mobile Menu -->
                    <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-3 py-2">
                        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ isKhmer ? 'ភាសា' : 'Language' }}</span>
                        <LanguageToggle />
                    </div>

                    <!-- Theme Switcher Row -->
                    <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-3 py-2">
                        <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ isKhmer ? 'ស្បែករចនា' : 'Theme' }}</span>
                        <div class="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl space-x-1">
                            <button @click="setTheme('light')"
                                class="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'light' ? 'bg-white dark:bg-gray-700 text-amber-500 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
                                aria-label="Light theme">
                                <SunIcon class="h-3.5 w-3.5" />
                                <span>Light</span>
                            </button>
                            <button @click="setTheme('dark')"
                                class="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'dark' ? 'bg-white dark:bg-gray-700 text-indigo-400 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
                                aria-label="Dark theme">
                                <MoonIcon class="h-3.5 w-3.5" />
                                <span>Dark</span>
                            </button>
                            <button @click="setTheme('system')"
                                class="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'system' ? 'bg-white dark:bg-gray-700 text-green-500 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
                                aria-label="System theme">
                                <ComputerDesktopIcon class="h-3.5 w-3.5" />
                                <span>Auto</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
// NavBar Component - Site Navigation & Theme Toggle
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import analytics from '@/utils/analytics';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { useLanguage } from '@/composables/useLanguage';
import {
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
    CloudIcon,
    CalendarDaysIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    HomeIcon,
    BriefcaseIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const { isKhmer } = useLanguage();

// Refs
const currentTheme = ref('system');
const isThemeMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isFeaturesMenuOpen = ref(false);
const systemThemeIsDark = ref(false);
const mediaQuery = ref(null);
const themeDropdown = ref(null);
const featuresDropdown = ref(null);

// Feature links with clean Heroicon components and color accents
const featureLinks = computed(() => [
    {
        path: '/weather-app',
        label: isKhmer.value ? 'ព្យាករណ៍ធាតុអាកាស' : 'Weather App',
        icon: SunIcon,
        badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
        badgeText: 'text-amber-500 dark:text-amber-400'
    },
    {
        path: '/air-quality',
        label: isKhmer.value ? 'គុណភាពខ្យល់' : 'Air Quality',
        icon: CloudIcon,
        badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20',
        badgeText: 'text-sky-500 dark:text-sky-400'
    },
    {
        path: '/khmer-calendar',
        label: isKhmer.value ? 'ប្រតិទិនខ្មែរ' : 'Khmer Calendar',
        icon: CalendarDaysIcon,
        badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
        badgeText: 'text-rose-500 dark:text-rose-400'
    },
    {
        path: '/currency-converter',
        label: isKhmer.value ? 'ប្តូរប្រាក់' : 'Currency Converter',
        icon: CurrencyDollarIcon,
        badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        badgeText: 'text-emerald-500 dark:text-emerald-400'
    },
    {
        path: '/crypto-tracker-password',
        label: isKhmer.value ? 'តាមដានគ្រីបតូ' : 'Crypto Tracker',
        icon: ChartBarIcon,
        badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
        badgeText: 'text-indigo-500 dark:text-indigo-400'
    }
]);

// Computed properties
const standardNavLinks = computed(() => {
    return [
        { path: '/', label: isKhmer.value ? 'ទំព័រដើម' : 'Home', icon: HomeIcon },
        { path: '/projects', label: isKhmer.value ? 'គម្រោង' : 'Projects', icon: BriefcaseIcon },
        { path: '/about', label: isKhmer.value ? 'អំពីខ្ញុំ' : 'About', icon: UserIcon },
    ];
});

const isFeatureActive = computed(() => {
    return featureLinks.value.some(link => route.path === link.path || route.path === '/crypto-tracker');
});

// Single unified navigation handler that closes menus reliably
const navigateAndClose = (path) => {
    isFeaturesMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    isThemeMenuOpen.value = false;

    if (route.path !== path) {
        router.push(path);
    }
};

const selectFeature = (path, event) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey)) {
        return;
    }
    if (event) {
        event.preventDefault();
    }
    navigateAndClose(path);
};

const selectStandardLink = (path, event) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey)) {
        return;
    }
    if (event) {
        event.preventDefault();
    }
    navigateAndClose(path);
};

// Auto-close all menus on route change
watch(() => route.fullPath, () => {
    isFeaturesMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    isThemeMenuOpen.value = false;
});

// Toggle functions
const toggleThemeMenu = () => {
    isThemeMenuOpen.value = !isThemeMenuOpen.value;
    if (isThemeMenuOpen.value) {
        isFeaturesMenuOpen.value = false;
        isMobileMenuOpen.value = false;
    }
};

const toggleFeaturesMenu = () => {
    isFeaturesMenuOpen.value = !isFeaturesMenuOpen.value;
    if (isFeaturesMenuOpen.value) {
        isThemeMenuOpen.value = false;
        isMobileMenuOpen.value = false;
    }
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        isThemeMenuOpen.value = false;
        isFeaturesMenuOpen.value = false;
    }
};

const setTheme = (theme) => {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('theme-timestamp', Date.now().toString());
    applyTheme();
    isThemeMenuOpen.value = false;

    // Track theme change in analytics
    analytics.trackThemeChange(theme);

    // Dispatch event for other components to react to theme changes
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
};

const applyTheme = () => {
    const shouldBeDark = currentTheme.value === 'dark' ||
        (currentTheme.value === 'system' && systemThemeIsDark.value);

    // Prevent flash of wrong theme by applying immediately
    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Add transition class for smooth theme switching (only after initial load)
    const themeTimestamp = localStorage.getItem('theme-timestamp');
    const isInitialLoad = !themeTimestamp || (Date.now() - parseInt(themeTimestamp)) < 1000;
    
    if (!isInitialLoad) {
        document.documentElement.classList.add('theme-transition');
        
        requestAnimationFrame(() => {
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 600);
        });
    }

    // Update meta theme-color for mobile browsers
    const themeColor = shouldBeDark ? '#111827' : '#ffffff';
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', themeColor);
};

const detectSystemTheme = () => {
    systemThemeIsDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const handleSystemThemeChange = (e) => {
    systemThemeIsDark.value = e.matches;
    if (currentTheme.value === 'system') {
        applyTheme();
    }
};

const closeMenusOnClickOutside = (event) => {
    // Close theme dropdown if clicked outside
    if (isThemeMenuOpen.value && themeDropdown.value && !themeDropdown.value.contains(event.target)) {
        isThemeMenuOpen.value = false;
    }

    // Close desktop features dropdown if clicked outside
    if (isFeaturesMenuOpen.value && featuresDropdown.value && !featuresDropdown.value.contains(event.target)) {
        isFeaturesMenuOpen.value = false;
    }
};

const handleKeyDown = (event) => {
    // Close menus on Escape key
    if (event.key === 'Escape') {
        isThemeMenuOpen.value = false;
        isFeaturesMenuOpen.value = false;
        isMobileMenuOpen.value = false;
    }
};

// Lifecycle hooks
onMounted(() => {
    // Initialize theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        currentTheme.value = savedTheme;
    } else {
        currentTheme.value = 'system';
    }

    // Detect system preference
    detectSystemTheme();

    // Apply the theme
    applyTheme();

    // Add event listener for system theme changes
    mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.value.addEventListener('change', handleSystemThemeChange);

    // Close dropdowns when clicking outside
    document.addEventListener('click', closeMenusOnClickOutside);
    document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
    // Clean up event listeners
    if (mediaQuery.value) {
        mediaQuery.value.removeEventListener('change', handleSystemThemeChange);
    }
    document.removeEventListener('click', closeMenusOnClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
/* Improve focus styles for accessibility */
button:focus,
a:focus {
    @apply outline-none ring-2 ring-green-400 ring-opacity-50;
}
</style>

<style>
/* Global smooth theme transition */
html.theme-transition,
html.theme-transition *,
html.theme-transition *::before,
html.theme-transition *::after {
    transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                fill 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                stroke 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transition-delay: 0s !important;
}

/* Ensure smooth transitions for common elements */
html {
    transition: background-color 0.3s ease, color 0.3s ease;
}

body {
    transition: background-color 0.3s ease, color 0.3s ease;
}
</style>