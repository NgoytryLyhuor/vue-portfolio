<template>
    <nav
        class="fixed w-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-40 shadow-sm border-b border-slate-200 dark:border-slate-800 backdrop-blur-md z-50 transition-colors duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Brand / Logo -->
            <div class="flex items-center min-w-0">
                <router-link to="/"
                    class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none flex items-center min-w-0"
                    aria-label="Home - Ngoytry Lyhuor Portfolio"
                    @click="selectStandardLink('/', $event)">
                    <div class="flex items-center min-w-0">
                        <img 
                            src="../assets/logo.png" 
                            alt="Ngoytry Lyhuor Logo"
                            class="h-6 w-6 sm:h-7 sm:w-7 mr-2 sm:mr-3 shrink-0 transition-transform duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700 p-0.5 rounded-md"
                            width="28"
                            height="28"
                            loading="eager"
                        >
                        <h1 class="text-xs sm:text-[15px] font-black tracking-tight dark:text-white uppercase truncate">Ngoytry Lyhuor</h1>
                    </div>
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-2 ml-10">
                    <router-link 
                        v-for="link in standardNavLinks" 
                        :key="link.path" 
                        :to="link.path"
                        class="hover:text-blue-600 dark:hover:text-blue-400 text-xs uppercase tracking-wider font-bold transition-all duration-200 px-3 py-1.5 rounded-md focus:outline-none border-b-2 border-transparent"
                        :class="{ 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-black': $route.path === link.path }"
                        :aria-label="`Navigate to ${link.label}`"
                        :aria-current="$route.path === link.path ? 'page' : undefined"
                        @click="selectStandardLink(link.path, $event)"
                    >
                        {{ link.label }}
                    </router-link>

                    <!-- Other Features Dropdown (Desktop) -->
                    <div class="relative" ref="featuresDropdown">
                        <button @click.stop="toggleFeaturesMenu"
                            class="flex items-center hover:text-blue-600 dark:hover:text-blue-400 text-xs uppercase tracking-wider font-bold transition-all duration-200 px-3 py-1.5 rounded-md border-b-2 border-transparent"
                            :class="{ 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-black': isFeatureActive }"
                            aria-label="Other Features" aria-haspopup="true" :aria-expanded="isFeaturesMenuOpen">
                            {{ isKhmer ? 'មុខងារផ្សេងៗ' : 'Other Features' }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1 transition-transform duration-200" viewBox="0 0 20 20"
                                fill="currentColor" :class="{ 'transform rotate-180': isFeaturesMenuOpen }">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>

                        <!-- Features dropdown menu -->
                        <transition
                            enter-active-class="transition duration-250 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
                            enter-from-class="opacity-0 -translate-y-2 scale-95 blur-[4px]"
                            enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
                            leave-active-class="transition duration-180 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
                            leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
                            leave-to-class="opacity-0 -translate-y-2 scale-95 blur-[2px]"
                        >
                            <div v-if="isFeaturesMenuOpen"
                                class="absolute left-0 w-72 rounded-xl dark:bg-slate-900 mt-2 shadow-2xl z-50 border border-slate-300 dark:border-slate-700 bg-white backdrop-blur-xl p-1.5 space-y-0.5 max-h-[75vh] overflow-y-auto">
                                <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                    class="flex items-center px-3.5 py-2.5 text-xs rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-left transition-all duration-150 cursor-pointer"
                                    :class="{ 'bg-slate-100 dark:bg-slate-800 font-bold text-blue-600 dark:text-blue-400': $route.path === feature.path }"
                                    @click="selectFeature(feature.path, $event)">
                                    <component :is="feature.icon" class="h-4 w-4 mr-3 shrink-0 text-slate-500 dark:text-slate-400" />
                                    <span>{{ feature.label }}</span>
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Right Controls: Language Toggle, Theme Toggle & Mobile Hamburger -->
            <div class="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                <!-- Desktop Update Available Button -->
                <button 
                    v-if="updateAvailable"
                    @click="applyUpdate"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-sm border border-blue-400/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer animate-pulse"
                    :title="isKhmer ? 'មានកំណែថ្មី! ចុចដើម្បី Update' : 'New version available! Click to update'">
                    <span>🚀</span>
                    <span class="hidden sm:inline">{{ isKhmer ? 'Update ថ្មី' : 'Update' }}</span>
                </button>

                <!-- Desktop Install App Button -->
                <button 
                    v-if="canInstall && !isInstalled"
                    @click="installApp"
                    class="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
                    :title="isKhmer ? 'ដំឡើងជា App លើទូរស័ព្ទ ឬកុំព្យូទ័រ' : 'Install as Desktop / Mobile App'">
                    <ArrowDownTrayIcon class="w-3.5 h-3.5" />
                    <span>{{ isKhmer ? 'ដំឡើង App' : 'Install App' }}</span>
                </button>

                <!-- Language Toggle Button (KM / EN) -->
                <LanguageToggle class="inline-flex" />

                <!-- Theme Toggle Button -->
                <div class="relative" ref="themeDropdown">
                    <button @click.stop="toggleThemeMenu"
                        class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors focus:outline-none"
                        aria-label="Toggle theme menu" aria-haspopup="true" :aria-expanded="isThemeMenuOpen">
                        <!-- Sun icon for light mode -->
                        <SunIcon v-if="currentTheme === 'light'" class="h-4 w-4 text-amber-500" />
                        <!-- Moon icon for dark mode -->
                        <MoonIcon v-else-if="currentTheme === 'dark'" class="h-4 w-4 text-indigo-400" />
                        <!-- ComputerDesktopIcon for system -->
                        <ComputerDesktopIcon v-else-if="currentTheme === 'system'" class="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </button>

                    <!-- Theme dropdown menu -->
                    <transition
                        enter-active-class="transition duration-250 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
                        enter-from-class="opacity-0 -translate-y-2 scale-95 blur-[4px]"
                        enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
                        leave-active-class="transition duration-180 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
                        leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
                        leave-to-class="opacity-0 -translate-y-2 scale-95 blur-[2px]"
                    >
                        <div v-if="isThemeMenuOpen"
                            class="absolute right-0 w-36 rounded-xl dark:bg-slate-900 mt-2 shadow-2xl z-50 border border-slate-300 dark:border-slate-700 bg-white backdrop-blur-xl p-1.5 space-y-0.5">
                            <button @click="setTheme('light')"
                                class="flex items-center px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-left transition-all"
                                :class="{ 'bg-slate-100 dark:bg-slate-800 font-bold text-blue-600 dark:text-blue-400': currentTheme === 'light' }">
                                <SunIcon class="h-4 w-4 mr-2 text-amber-500" />
                                {{ isKhmer ? 'ពន្លឺ' : 'Light' }}
                            </button>
                            <button @click="setTheme('dark')"
                                class="flex items-center px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-left transition-all"
                                :class="{ 'bg-slate-100 dark:bg-slate-800 font-bold text-blue-600 dark:text-blue-400': currentTheme === 'dark' }">
                                <MoonIcon class="h-4 w-4 mr-2 text-indigo-400" />
                                {{ isKhmer ? 'ងងឹត' : 'Dark' }}
                            </button>
                            <button @click="setTheme('system')"
                                class="flex items-center px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-left transition-all"
                                :class="{ 'bg-slate-100 dark:bg-slate-800 font-bold text-blue-600 dark:text-blue-400': currentTheme === 'system' }">
                                <ComputerDesktopIcon class="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400" />
                                {{ isKhmer ? 'ប្រព័ន្ធ' : 'System' }}
                            </button>
                        </div>
                    </transition>
                </div>

                <!-- Clean Mobile Hamburger Button -->
                <button @click.stop="toggleMobileMenu"
                    class="md:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
                    aria-label="Toggle navigation menu"
                    :aria-expanded="isMobileMenuOpen">
                    <component :is="isMobileMenuOpen ? XMarkIcon : Bars3Icon" class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-150" />
                </button>
            </div>
        </div>

        <!-- Full-screen Mobile Backdrop (Tap outside to close) -->
        <transition
            enter-active-class="transition-opacity duration-300 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isMobileMenuOpen"
                @click="isMobileMenuOpen = false"
                class="md:hidden fixed inset-0 top-[52px] sm:top-[57px] bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40"
                aria-hidden="true" />
        </transition>

        <!-- Clean Slide-down Mobile Navigation Menu -->
        <transition
            enter-active-class="transition duration-320 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
            enter-from-class="opacity-0 -translate-y-4 scale-[0.98] blur-[4px]"
            enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-active-class="transition duration-200 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
            leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-to-class="opacity-0 -translate-y-3 scale-[0.98] blur-[2px]"
        >
            <div v-if="isMobileMenuOpen"
                class="md:hidden absolute left-0 right-0 top-full w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                <div class="px-4 py-3 space-y-2">
                    <!-- Top Update Alert in Mobile Menu -->
                    <div v-if="updateAvailable" class="pb-1">
                        <button 
                            @click="handleApplyUpdate"
                            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-lg shadow-md text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.99] cursor-pointer animate-pulse">
                            <div class="flex items-center gap-2">
                                <span>🚀</span>
                                <span>{{ isKhmer ? 'មានកំណែថ្មី! ចុចដើម្បី Update' : 'New Update! Tap to Update' }}</span>
                            </div>
                            <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">UPDATE</span>
                        </button>
                    </div>

                    <!-- Main Navigation Links -->
                    <div class="space-y-1">
                        <router-link v-for="link in standardNavLinks" :key="link.path" :to="link.path"
                            class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-l-2"
                            :class="[
                                $route.path === link.path
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
                            ]"
                            @click="navigateAndClose(link.path)">
                            <component :is="link.icon" class="h-4 w-4" :class="$route.path === link.path ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'" />
                            <span>{{ link.label }}</span>
                        </router-link>
                    </div>

                    <!-- Other Features Section -->
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                        <div class="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {{ isKhmer ? 'មុខងារផ្សេងៗ' : 'Other Features' }}
                        </div>
                        <div class="space-y-1">
                            <router-link v-for="feature in featureLinks" :key="feature.path" :to="feature.path"
                                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border-l-2"
                                :class="[
                                    $route.path === feature.path
                                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
                                ]"
                                @click="navigateAndClose(feature.path)">
                                <div class="w-6 h-6 rounded-md flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700" :class="feature.badgeBg">
                                    <component :is="feature.icon" class="h-3.5 w-3.5" :class="feature.badgeText" />
                                </div>
                                <span>{{ feature.label }}</span>
                            </router-link>
                        </div>
                    </div>

                    <!-- Install Mobile App Action in Mobile Drawer -->
                    <div v-if="canInstall && !isInstalled" class="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button 
                            @click="handleMobileInstall"
                            class="w-full flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-sm text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.99] cursor-pointer">
                            <div class="flex items-center gap-2.5">
                                <ArrowDownTrayIcon class="w-4 h-4" />
                                <span>{{ isKhmer ? 'ដំឡើងជា App (Install App)' : 'Install as Mobile App' }}</span>
                            </div>
                            <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">PWA</span>
                        </button>
                    </div>

                    <!-- Check Update Action in Mobile Drawer -->
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button 
                            @click="handleMobileCheckUpdate"
                            :disabled="isCheckingUpdate"
                            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer disabled:opacity-60">
                            <div class="flex items-center gap-2">
                                <svg :class="{ 'animate-spin': isCheckingUpdate }" class="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>
                                    {{ isCheckingUpdate
                                        ? (isKhmer ? 'កំពុងពិនិត្យ...' : 'Checking...')
                                        : (updateStatus === 'up_to_date'
                                            ? (isKhmer ? '✓ កំណែចុងក្រោយ' : '✓ App is up to date')
                                            : (isKhmer ? 'ពិនិត្យកំណែអាប់ដេត' : 'Check for updates'))
                                    }}
                                </span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">{{ currentVersion }}</span>
                        </button>
                    </div>

                    <!-- Language Switcher Row in Mobile Menu -->
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 py-2">
                        <span class="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ភាសា' : 'Language' }}</span>
                        <LanguageToggle />
                    </div>

                    <!-- Theme Switcher Row -->
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 py-2">
                        <span class="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ស្បែករចនា' : 'Theme' }}</span>
                        <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-300 dark:border-slate-700 rounded-lg space-x-1">
                            <button @click="setTheme('light')"
                                class="px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'light' ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
                                aria-label="Light theme">
                                <SunIcon class="h-3.5 w-3.5" />
                                <span>{{ isKhmer ? 'ពន្លឺ' : 'Light' }}</span>
                            </button>
                            <button @click="setTheme('dark')"
                                class="px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'dark' ? 'bg-white dark:bg-slate-700 text-indigo-400 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
                                aria-label="Dark theme">
                                <MoonIcon class="h-3.5 w-3.5" />
                                <span>{{ isKhmer ? 'ងងឹត' : 'Dark' }}</span>
                            </button>
                            <button @click="setTheme('system')"
                                class="px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-all"
                                :class="currentTheme === 'system' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
                                aria-label="System theme">
                                <ComputerDesktopIcon class="h-3.5 w-3.5" />
                                <span>{{ isKhmer ? 'ប្រព័ន្ធ' : 'System' }}</span>
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
import { usePwaInstall } from '@/composables/usePwaInstall';
import { useAppUpdate } from '@/composables/useAppUpdate';
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
    XMarkIcon,
    TruckIcon,
    FireIcon,
    ShieldExclamationIcon,
    IdentificationIcon,
    BoltIcon,
    ArrowDownTrayIcon,
    QrCodeIcon,
    CalculatorIcon,
    BanknotesIcon,
    MapPinIcon,
    DocumentTextIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const { isKhmer } = useLanguage();
const { canInstall, isInstalled, installApp } = usePwaInstall();
const {
    updateAvailable,
    isCheckingUpdate,
    updateStatus,
    currentVersion,
    checkForUpdate,
    applyUpdate
} = useAppUpdate();

const handleMobileInstall = () => {
    isMobileMenuOpen.value = false;
    installApp();
};

const handleApplyUpdate = () => {
    isMobileMenuOpen.value = false;
    applyUpdate();
};

const handleMobileCheckUpdate = () => {
    checkForUpdate();
};

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
        path: '/vehicle-tax',
        label: isKhmer.value ? 'ពន្ធយានយន្ត & ឆៀក' : 'Cambodia Vehicle Tax',
        icon: TruckIcon,
        badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
        badgeText: 'text-blue-500 dark:text-blue-400'
    },
    {
        path: '/fuel-prices',
        label: isKhmer.value ? 'តាមដានតម្លៃប្រេងសាំង' : 'Fuel Price Tracker',
        icon: FireIcon,
        badgeBg: 'bg-orange-500/10 dark:bg-orange-500/20',
        badgeText: 'text-orange-500 dark:text-orange-400'
    },
    {
        path: '/traffic-fines',
        label: isKhmer.value ? 'ផាកពិន័យចរាចរណ៍' : 'Traffic Fines Lookup',
        icon: ShieldExclamationIcon,
        badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
        badgeText: 'text-rose-500 dark:text-rose-400'
    },
    {
        path: '/public-services',
        label: isKhmer.value ? 'សេវាសាធារណៈ & Passport' : 'Public Services & Passport',
        icon: IdentificationIcon,
        badgeBg: 'bg-teal-500/10 dark:bg-teal-500/20',
        badgeText: 'text-teal-500 dark:text-teal-400'
    },
    {
        path: '/utility-calculator',
        label: isKhmer.value ? 'ថ្លៃទឹក-ភ្លើង (EDC & PPWSA)' : 'Electricity & Water (EDC)',
        icon: BoltIcon,
        badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
        badgeText: 'text-amber-500 dark:text-amber-400'
    },
    {
        path: '/khqr-bill-splitter',
        label: isKhmer.value ? 'បង្កើត KHQR & ចែកលុយ' : 'Bakong KHQR & Bill Split',
        icon: QrCodeIcon,
        badgeBg: 'bg-red-500/10 dark:bg-red-500/20',
        badgeText: 'text-red-500 dark:text-red-400'
    },
    {
        path: '/salary-tax-calculator',
        label: isKhmer.value ? 'គណនាពន្ធលើប្រាក់បៀវត្ស' : 'Salary Tax & NSSF (GDT)',
        icon: CalculatorIcon,
        badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        badgeText: 'text-emerald-500 dark:text-emerald-400'
    },
    {
        path: '/bank-loan-calculator',
        label: isKhmer.value ? 'គណនាកម្ចីផ្ទះ & រំលស់ឡាន' : 'Bank Loan & Mortgage',
        icon: BanknotesIcon,
        badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
        badgeText: 'text-blue-500 dark:text-blue-400'
    },
    {
        path: '/postal-codes',
        label: isKhmer.value ? 'កូដប្រៃសណីយ៍ & សង្គ្រោះបន្ទាន់' : 'Postal Codes & Emergency',
        icon: MapPinIcon,
        badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
        badgeText: 'text-purple-500 dark:text-purple-400'
    },
    {
        path: '/khmer-typing-test',
        label: isKhmer.value ? 'តេស្តវាយអក្សរខ្មែរ' : 'Khmer Typing Speed Test',
        icon: DocumentTextIcon,
        badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
        badgeText: 'text-indigo-500 dark:text-indigo-400'
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

// Single unified navigation handler that closes menus reliably and scrolls to top
const navigateAndClose = (path) => {
    isFeaturesMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    isThemeMenuOpen.value = false;

    if (route.path !== path) {
        router.push(path).then(() => {
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        }).catch(() => {});
    } else {
        // Clicking menu of current page -> smooth scroll to top!
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
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