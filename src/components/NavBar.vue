<template>
    <nav
        class="fixed w-full bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 py-3.5 px-4 sm:px-6 lg:px-40 shadow-sm backdrop-blur-md z-50 transition-colors duration-300">
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
                        class="hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        :class="{ 'text-green-500 dark:text-green-400 font-semibold': $route.path === link.path }"
                        :aria-label="`Navigate to ${link.label}`"
                        :aria-current="$route.path === link.path ? 'page' : undefined"
                    >
                        {{ link.label }}
                    </router-link>

                    <!-- Other Features Dropdown (Desktop) -->
                    <div class="relative" ref="featuresDropdown">
                        <button @click="toggleFeaturesMenu"
                            class="flex items-center hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2.5 py-1.5 rounded-lg"
                            :class="{ 'text-green-500 dark:text-green-400 font-semibold': isFeatureActive }"
                            aria-label="Other Features" aria-haspopup="true" :aria-expanded="isFeaturesMenuOpen">
                            Other Features
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-200" viewBox="0 0 20 20"
                                fill="currentColor" :class="{ 'transform rotate-180': isFeaturesMenuOpen }">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <!-- Features dropdown menu -->
                        <transition enter-active-class="transition ease-out duration-150"
                            enter-from-class="transform opacity-0 scale-95 -translate-y-1"
                            enter-to-class="transform opacity-100 scale-100 translate-y-0"
                            leave-active-class="transition ease-in duration-100"
                            leave-from-class="transform opacity-100 scale-100 translate-y-0"
                            leave-to-class="transform opacity-0 scale-95 -translate-y-1">
                            <div v-if="isFeaturesMenuOpen"
                                class="absolute left-0 w-72 rounded-2xl dark:bg-gray-900 mt-2 shadow-2xl z-50 border border-gray-200/80 dark:border-gray-800 bg-white/95 backdrop-blur-xl overflow-hidden p-2 space-y-1">
                                <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                    class="flex items-center px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer group"
                                    :class="[
                                        $route.path === feature.path
                                            ? 'bg-green-500/10 border border-green-500/20'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 border border-transparent'
                                    ]"
                                    @click="selectFeature(feature.path, $event)">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 transition-transform group-hover:scale-105" :class="feature.badgeBg">
                                        <component :is="feature.icon" class="h-4 w-4" :class="feature.badgeText" />
                                    </div>
                                    <div class="flex flex-col truncate">
                                        <span class="text-xs font-semibold leading-tight" :class="$route.path === feature.path ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'">{{ feature.label }}</span>
                                        <span class="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{{ feature.desc }}</span>
                                    </div>
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Right Controls: Theme Switcher + Mobile Menu Button -->
            <div class="flex items-center space-x-2 sm:space-x-3">
                <!-- Theme Switcher Dropdown (Desktop & Top Bar) -->
                <div class="relative" ref="themeDropdown">
                    <button @click="toggleThemeMenu"
                        class="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100/90 hover:bg-gray-200/90 dark:bg-gray-800/90 dark:hover:bg-gray-700/90 border border-gray-200/70 dark:border-gray-700/70 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-all duration-200 active:scale-95 shadow-sm"
                        aria-label="Toggle theme menu" aria-haspopup="true" :aria-expanded="isThemeMenuOpen">
                        <!-- Sun icon for light mode -->
                        <SunIcon v-if="currentTheme === 'light'" class="h-5 w-5 text-amber-500" />
                        <!-- Moon icon for dark mode -->
                        <MoonIcon v-else-if="currentTheme === 'dark'" class="h-5 w-5 text-indigo-400" />
                        <!-- ComputerDesktopIcon for system -->
                        <ComputerDesktopIcon v-else-if="currentTheme === 'system'" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>

                    <!-- Theme dropdown menu -->
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95 -translate-y-1" enter-to-class="transform opacity-100 scale-100 translate-y-0"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100 translate-y-0"
                        leave-to-class="transform opacity-0 scale-95 -translate-y-1">
                        <div v-if="isThemeMenuOpen"
                            class="absolute right-0 w-44 rounded-2xl dark:bg-gray-900 mt-2 shadow-2xl z-50 border border-gray-200/80 dark:border-gray-800 bg-white/95 backdrop-blur-xl overflow-hidden p-1.5 space-y-0.5">
                            <button @click="setTheme('light')"
                                class="flex items-center px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 font-semibold': currentTheme === 'light' }">
                                <SunIcon class="h-4 w-4 mr-2.5 text-amber-500" />
                                Light
                            </button>
                            <button @click="setTheme('dark')"
                                class="flex items-center px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 font-semibold': currentTheme === 'dark' }">
                                <MoonIcon class="h-4 w-4 mr-2.5 text-indigo-400" />
                                Dark
                            </button>
                            <button @click="setTheme('system')"
                                class="flex items-center px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left transition-colors duration-150"
                                :class="{ 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 font-semibold': currentTheme === 'system' }">
                                <ComputerDesktopIcon class="h-4 w-4 mr-2.5 text-gray-500 dark:text-gray-400" />
                                System
                            </button>
                        </div>
                    </transition>
                </div>

                <!-- Modern Mobile Menu Toggle Button -->
                <button @click="toggleMobileMenu"
                    ref="mobileMenuButton"
                    class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100/90 hover:bg-gray-200/90 dark:bg-gray-800/90 dark:hover:bg-gray-700/90 border border-gray-200/70 dark:border-gray-700/70 text-gray-700 dark:text-gray-200 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    aria-label="Toggle navigation menu"
                    :aria-expanded="isMobileMenuOpen">
                    <component :is="isMobileMenuOpen ? XMarkIcon : Bars3Icon" class="h-5 w-5 transition-transform duration-200" />
                </button>
            </div>
        </div>

        <!-- Mobile Backdrop Dimmer -->
        <transition enter-active-class="transition-opacity ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="isMobileMenuOpen"
                @click="isMobileMenuOpen = false"
                class="md:hidden fixed inset-0 top-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm -z-10"
                aria-hidden="true" />
        </transition>

        <!-- Redesigned Modern Mobile Navigation Sheet -->
        <transition enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 -translate-y-2 scale-98"
            enter-to-class="transform opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 translate-y-0 scale-100"
            leave-to-class="transform opacity-0 -translate-y-2 scale-98">
            <div v-if="isMobileMenuOpen"
                ref="mobileMenuContainer"
                class="md:hidden absolute left-3 right-3 sm:left-6 sm:right-6 top-[calc(100%+0.5rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-2xl overflow-hidden max-h-[calc(100vh-5.5rem)] flex flex-col z-50">
                
                <!-- Drawer Header / Profile Brand -->
                <div class="p-3.5 pb-3 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between shrink-0">
                    <div class="flex items-center space-x-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 p-0.5 shadow-sm">
                            <img 
                                src="../assets/logo.png" 
                                alt="Ngoytry Lyhuor Logo"
                                class="w-full h-full rounded-[10px] bg-white dark:bg-gray-900 object-contain p-1"
                                width="36"
                                height="36"
                            >
                        </div>
                        <div>
                            <h2 class="text-sm font-bold text-gray-900 dark:text-white leading-tight">Ngoytry Lyhuor</h2>
                            <div class="flex items-center space-x-1.5 mt-0.5">
                                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span class="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Software Engineer</span>
                            </div>
                        </div>
                    </div>
                    <button @click="isMobileMenuOpen = false"
                        class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close menu">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>

                <!-- Scrollable Menu Content -->
                <div class="overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/80">
                    <!-- Standard Navigation Links -->
                    <div class="p-3 space-y-1">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-1">
                            Navigation
                        </div>
                        <router-link v-for="link in standardNavLinks" :key="link.path" :to="link.path"
                            class="flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 cursor-pointer"
                            :class="[
                                $route.path === link.path
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 font-semibold border border-green-500/20'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 border border-transparent'
                            ]"
                            @click="selectStandardLink(link.path, $event)">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                    :class="$route.path === link.path ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'">
                                    <component :is="link.icon" class="h-4 w-4" />
                                </div>
                                <span>{{ link.label }}</span>
                            </div>
                            <ChevronRightIcon class="h-4 w-4" :class="$route.path === link.path ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'" />
                        </router-link>
                    </div>

                    <!-- Web Tools & Apps Section -->
                    <div class="p-3 space-y-1">
                        <div class="flex items-center justify-between px-2 py-1">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                Web Tools & Apps
                            </span>
                            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                                5 Live
                            </span>
                        </div>
                        <div class="grid grid-cols-1 gap-1">
                            <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                class="group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer"
                                :class="[
                                    $route.path === feature.path
                                        ? 'bg-green-500/10 border border-green-500/20'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/60 border border-transparent'
                                ]"
                                @click="selectFeature(feature.path, $event)">
                                <div class="flex items-center space-x-3 min-w-0">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" :class="feature.badgeBg">
                                        <component :is="feature.icon" class="h-4 w-4" :class="feature.badgeText" />
                                    </div>
                                    <div class="truncate">
                                        <div class="text-[13px] font-medium leading-tight" :class="$route.path === feature.path ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-800 dark:text-gray-200'">
                                            {{ feature.label }}
                                        </div>
                                        <div class="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
                                            {{ feature.desc }}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRightIcon class="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" :class="$route.path === feature.path ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'" />
                            </router-link>
                        </div>
                    </div>

                    <!-- Appearance / Theme Selector -->
                    <div class="p-3">
                        <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 mb-2">
                            Appearance
                        </div>
                        <div class="grid grid-cols-3 gap-1.5 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
                            <button @click="setTheme('light')"
                                class="flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all"
                                :class="currentTheme === 'light' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'">
                                <SunIcon class="h-3.5 w-3.5 text-amber-500" />
                                <span>Light</span>
                            </button>
                            <button @click="setTheme('dark')"
                                class="flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all"
                                :class="currentTheme === 'dark' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'">
                                <MoonIcon class="h-3.5 w-3.5 text-indigo-400" />
                                <span>Dark</span>
                            </button>
                            <button @click="setTheme('system')"
                                class="flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all"
                                :class="currentTheme === 'system' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'">
                                <ComputerDesktopIcon class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                <span>Auto</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Drawer Footer with Social Links -->
                <div class="px-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 shrink-0">
                    <span class="text-[11px]">© {{ new Date().getFullYear() }} Ngoytry Lyhuor</span>
                    <div class="flex items-center space-x-3">
                        <a href="https://github.com/NgoytryLyhuor" target="_blank" rel="noopener noreferrer"
                            class="p-1 rounded-md text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            aria-label="GitHub Profile">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" target="_blank" rel="noopener noreferrer"
                            class="p-1 rounded-md text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            aria-label="LinkedIn Profile">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
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
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();

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
const mobileMenuContainer = ref(null);
const mobileMenuButton = ref(null);

// Feature links with clean Heroicon components and color badges
const featureLinks = [
    {
        path: '/weather-app',
        label: 'Weather App',
        desc: 'Forecasts, radar & alerts',
        icon: SunIcon,
        badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20',
        badgeText: 'text-amber-500 dark:text-amber-400'
    },
    {
        path: '/air-quality',
        label: 'Air Quality',
        desc: 'Real-time AQI & PM2.5 levels',
        icon: CloudIcon,
        badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20',
        badgeText: 'text-sky-500 dark:text-sky-400'
    },
    {
        path: '/khmer-calendar',
        label: 'Khmer Calendar',
        desc: 'Traditional lunar dates & holidays',
        icon: CalendarDaysIcon,
        badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20',
        badgeText: 'text-rose-500 dark:text-rose-400'
    },
    {
        path: '/currency-converter',
        label: 'Currency Converter',
        desc: 'Live NBC & global FX rates',
        icon: CurrencyDollarIcon,
        badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20',
        badgeText: 'text-emerald-500 dark:text-emerald-400'
    },
    {
        path: '/crypto-tracker-password',
        label: 'Crypto Tracker',
        desc: 'Live prices & market stats',
        icon: ChartBarIcon,
        badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20',
        badgeText: 'text-indigo-500 dark:text-indigo-400'
    }
];

// Computed properties
const standardNavLinks = computed(() => {
    return [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/projects', label: 'Projects', icon: BriefcaseIcon },
        { path: '/about', label: 'About', icon: UserIcon },
    ];
});

const isFeatureActive = computed(() => {
    return featureLinks.some(link => route.path === link.path || route.path === '/crypto-tracker');
});

// Navigation handlers that reliably push route and close menus
const selectFeature = (path, event) => {
    isFeaturesMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    isMobileFeaturesOpen.value = false;

    // Allow opening in new tab when modifier key (Ctrl/Cmd/Shift) is held
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey)) {
        return;
    }

    if (event) {
        event.preventDefault();
    }

    if (route.path !== path) {
        router.push(path);
    }
};

const selectStandardLink = (path, event) => {
    isMobileMenuOpen.value = false;

    if (event && (event.metaKey || event.ctrlKey || event.shiftKey)) {
        return;
    }

    if (event) {
        event.preventDefault();
    }

    if (route.path !== path) {
        router.push(path);
    }
};

// Body scroll locking when mobile menu is active
watch(isMobileMenuOpen, (isOpen) => {
    if (typeof document !== 'undefined') {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
});

// Auto-close all menus on route change
watch(() => route.fullPath, () => {
    isFeaturesMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    isMobileFeaturesOpen.value = false;
    isThemeMenuOpen.value = false;
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
        
        // Use requestAnimationFrame for smoother transition
        requestAnimationFrame(() => {
            // Remove transition class after animation completes
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

    // Close features dropdown if clicked outside
    if (isFeaturesMenuOpen.value && featuresDropdown.value && !featuresDropdown.value.contains(event.target)) {
        isFeaturesMenuOpen.value = false;
    }

    // Close mobile menu if clicked outside both container and toggle button
    if (
        isMobileMenuOpen.value &&
        mobileMenuContainer.value &&
        !mobileMenuContainer.value.contains(event.target) &&
        mobileMenuButton.value &&
        !mobileMenuButton.value.contains(event.target)
    ) {
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
    // Restore body overflow
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }

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