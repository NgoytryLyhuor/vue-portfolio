<template>
    <nav
        class="fixed w-full bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 py-4 px-4 sm:px-6 lg:px-40 shadow-md backdrop-blur-sm z-50 transition-colors duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex">
                <router-link to="/"
                    class="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                    aria-label="Home">
                    <div class="flex items-center">
                        <img src="../assets/logo.png" alt="Logo"
                            class="h-7 w-7 mr-3 transition-transform duration-200 hover:scale-105">
                        <h1 class="text-[16px] font-bold dark:text-white">Ngoytry Lyhuor</h1>
                    </div>
                </router-link>
                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-6 ml-10">
                    <router-link v-for="link in standardNavLinks" :key="link.path" :to="link.path"
                        class="hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2 py-1 rounded-md"
                        :class="{ 'text-green-500 dark:text-green-400': $route.path === link.path }"
                        :aria-label="link.label">
                        {{ link.label }}
                    </router-link>

                    <!-- Other Features Dropdown -->
                    <div class="relative" ref="featuresDropdown">
                        <button @click="toggleFeaturesMenu"
                            class="flex items-center hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2 py-1 rounded-md"
                            :class="{ 'text-green-500 dark:text-green-400': isFeatureActive }"
                            aria-label="Other Features" aria-haspopup="true" :aria-expanded="isFeaturesMenuOpen">
                            Other Features
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                                fill="currentColor" :class="{ 'transform rotate-180': isFeaturesMenuOpen }">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <!-- Features dropdown menu -->
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <div v-if="isFeaturesMenuOpen"
                                class="absolute left-0 w-56 rounded-xl dark:bg-gray-800 mt-2 shadow-lg z-50 border dark:border-gray-700 bg-white overflow-hidden">
                                <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                    class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors duration-150"
                                    :class="{ 'bg-gray-100 dark:bg-gray-700': $route.path === feature.path }"
                                    @click="isFeaturesMenuOpen = false">
                                    <component :is="feature.icon" class="h-5 w-5 mr-3" />
                                    {{ feature.label }}
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-6">
                <!-- Theme Switcher -->
                <div class="relative" ref="themeDropdown">
                    <div class="flex items-center space-x-6">
                        <!-- Theme Switcher -->
                        <button @click="toggleThemeMenu"
                            class="flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Toggle theme menu" aria-haspopup="true" :aria-expanded="isThemeMenuOpen">
                            <!-- Sun icon for light mode -->
                            <svg v-if="currentTheme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                <path fill-rule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clip-rule="evenodd" />
                            </svg>
                            <!-- Moon icon for dark mode -->
                            <svg v-else-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            <!-- Computer icon for system -->
                            <svg v-else-if="currentTheme === 'system'" xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                <path fill-rule="evenodd"
                                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <!-- Theme dropdown menu -->
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <div v-if="isThemeMenuOpen"
                            class="absolute right-0 w-48 rounded-xl dark:bg-gray-800 mt-2 shadow-lg z-50 border dark:border-gray-700 bg-white overflow-hidden">
                            <button @click="setTheme('light')"
                                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-700': currentTheme === 'light' }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clip-rule="evenodd" />
                                </svg>
                                Light
                            </button>
                            <button @click="setTheme('dark')"
                                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-700': currentTheme === 'dark' }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                                Dark
                            </button>
                            <button @click="setTheme('system')"
                                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-700': currentTheme === 'system' }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                        clip-rule="evenodd" />
                                </svg>
                                System
                            </button>
                        </div>
                    </transition>
                </div>

                <!-- Mobile menu button -->
                <button @click="toggleMobileMenu"
                    class="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Toggle navigation menu" aria-expanded="isMobileMenuOpen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        <transition enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 -translate-y-2" enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150" leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-2">
            <div v-if="isMobileMenuOpen"
                class="md:hidden absolute left-0 right-0 top-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t dark:border-gray-700 shadow-lg">
                <div class="container mx-auto px-4 py-3 space-y-1">
                    <router-link v-for="link in standardNavLinks" :key="link.path" :to="link.path"
                        class="block py-3 px-4 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-lg"
                        :class="{
                            'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800 font-medium': $route.path === link.path,
                            'text-gray-700 dark:text-gray-300': $route.path !== link.path
                        }" @click="isMobileMenuOpen = false" :aria-label="link.label">
                        {{ link.label }}
                    </router-link>

                    <!-- Other Features section in mobile menu -->
                    <div class="py-1">
                        <button @click="toggleMobileFeatures"
                            class="flex items-center justify-between w-full py-3 px-4 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-lg"
                            :class="{
                                'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800 font-medium': isFeatureActive,
                                'text-gray-700 dark:text-gray-300': !isFeatureActive
                            }">
                            <span>Other Features</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20"
                                fill="currentColor" :class="{ 'transform rotate-180': isMobileFeaturesOpen }">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="transform opacity-0 -translate-y-2"
                            enter-to-class="transform opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="transform opacity-100 translate-y-0"
                            leave-to-class="transform opacity-0 -translate-y-2">
                            <div v-if="isMobileFeaturesOpen"
                                class="pl-4 space-y-1 mt-1 border-l-2 border-gray-200 dark:border-gray-700 ml-4">
                                <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                    class="flex items-center py-3 px-4 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-lg"
                                    :class="{
                                        'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800 font-medium': $route.path === feature.path,
                                        'text-gray-600 dark:text-gray-400': $route.path !== feature.path
                                    }" @click="isMobileMenuOpen = false">
                                    <component :is="feature.icon" class="h-5 w-5 mr-3" />
                                    {{ feature.label }}
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
// NavBar Component - Site Navigation & Theme Toggle
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Refs
const currentTheme = ref('system');
const isThemeMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isFeaturesMenuOpen = ref(false);
const isMobileFeaturesOpen = ref(false);
const systemThemeIsDark = ref(false);
const mediaQuery = ref(null);
const themeDropdown = ref(null);
const featuresDropdown = ref(null);

// Feature links
const featureLinks = [
    {
        path: '/weather-app',
        label: 'Weather App',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>`
        }
    },
    {
        path: '/currency-exchange',
        label: 'Currency Exchange',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>`
        }
    },
    {
        path: '/air-quality',
        label: 'Air Quality',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>`
        }
    },
    {
        path: '/ip-lookup',
        label: 'IP Lookup',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
            </svg>`
        }
    },
    {
        path: '/github-stats',
        label: 'GitHub Stats',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
            </svg>`
        }
    },
    {
        path: '/khmer-calendar',
        label: 'Khmer Calendar',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>`
        }
    }
];

// Computed properties
const standardNavLinks = computed(() => {
    return [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/about', label: 'About' },
    ];
});

const isFeatureActive = computed(() => {
    return featureLinks.some(link => route.path === link.path);
});

// Methods
const toggleThemeMenu = () => {
    isThemeMenuOpen.value = !isThemeMenuOpen.value;
    if (isThemeMenuOpen.value) {
        isFeaturesMenuOpen.value = false;
    }
};

const toggleFeaturesMenu = () => {
    isFeaturesMenuOpen.value = !isFeaturesMenuOpen.value;
    if (isFeaturesMenuOpen.value) {
        isThemeMenuOpen.value = false;
    }
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) {
        isThemeMenuOpen.value = false;
        isFeaturesMenuOpen.value = false;
    }
};

const toggleMobileFeatures = () => {
    isMobileFeaturesOpen.value = !isMobileFeaturesOpen.value;
};

const setTheme = (theme) => {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
    isThemeMenuOpen.value = false;

    // Dispatch event for other components to react to theme changes
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
};

const applyTheme = () => {
    const shouldBeDark = currentTheme.value === 'dark' ||
        (currentTheme.value === 'system' && systemThemeIsDark.value);

    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
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

    // Close features dropdown if clicked outside
    if (isFeaturesMenuOpen.value && featuresDropdown.value && !featuresDropdown.value.contains(event.target)) {
        isFeaturesMenuOpen.value = false;
    }

    // Close mobile menu if clicked outside
    if (isMobileMenuOpen.value && !event.target.closest('.md\\:hidden')) {
        isMobileMenuOpen.value = false;
    }
};

const handleKeyDown = (event) => {
    // Close menus on Escape key
    if (event.key === 'Escape') {
        if (isThemeMenuOpen.value) {
            isThemeMenuOpen.value = false;
        }
        if (isFeaturesMenuOpen.value) {
            isFeaturesMenuOpen.value = false;
        }
        if (isMobileMenuOpen.value) {
            isMobileMenuOpen.value = false;
        }
        if (isMobileFeaturesOpen.value) {
            isMobileFeaturesOpen.value = false;
        }
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
/* Smooth transitions for dark mode switch */
html {
    @apply transition-colors duration-300;
}

/* Improve focus styles for accessibility */
button:focus,
a:focus {
    @apply outline-none ring-2 ring-green-400 ring-opacity-50;
}
</style>