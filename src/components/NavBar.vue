<template>
    <nav :class="[
        'fixed w-full z-50 transition-all duration-500',
        isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg py-2' 
            : 'bg-transparent py-4'
    ]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <!-- Logo -->
                <router-link to="/" class="flex items-center gap-3 group">
                    <div class="relative">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <span class="text-white font-bold text-lg">T</span>
                        </div>
                        <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    </div>
                    <div class="hidden sm:block">
                        <h1 class="font-bold text-gray-900 dark:text-white text-lg">Tech Toolbox</h1>
                        <p class="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">by Ngoytry</p>
                    </div>
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-1">
                    <!-- Main Nav Links -->
                    <router-link 
                        v-for="link in mainLinks" 
                        :key="link.path" 
                        :to="link.path"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300',
                            $route.path === link.path
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        ]"
                    >
                        {{ link.label }}
                    </router-link>

                    <!-- Tools Dropdown -->
                    <div class="relative" ref="toolsDropdown">
                        <button 
                            @click="toggleToolsMenu"
                            :class="[
                                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300',
                                isToolActive || isToolsMenuOpen
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            ]"
                        >
                            <span>🛠️</span>
                            Tools
                            <svg 
                                class="w-4 h-4 transition-transform duration-300" 
                                :class="{ 'rotate-180': isToolsMenuOpen }"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Tools Dropdown Menu -->
                        <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-2 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-2 scale-95"
                        >
                            <div 
                                v-if="isToolsMenuOpen"
                                class="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                                <div class="p-2">
                                    <router-link 
                                        v-for="tool in toolLinks" 
                                        :key="tool.path"
                                        :to="tool.path"
                                        @click="isToolsMenuOpen = false"
                                        :class="[
                                            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                            $route.path === tool.path
                                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                        ]"
                                    >
                                        <span class="text-2xl group-hover:scale-110 transition-transform">{{ tool.icon }}</span>
                                        <div class="flex-1">
                                            <p class="font-medium text-gray-900 dark:text-white text-sm">{{ tool.label }}</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ tool.description }}</p>
                                        </div>
                                        <svg 
                                            class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </router-link>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

                <!-- Right Side Actions -->
                <div class="flex items-center gap-2">
                    <!-- Theme Toggle -->
                    <div class="relative" ref="themeDropdown">
                        <button 
                            @click="toggleThemeMenu"
                            class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
                        >
                            <transition name="theme-icon" mode="out-in">
                                <svg v-if="currentTheme === 'light'" key="light" class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                                </svg>
                                <svg v-else-if="currentTheme === 'dark'" key="dark" class="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                                <svg v-else key="system" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                                </svg>
                            </transition>
                        </button>

                        <!-- Theme Menu -->
                        <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-2 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-2 scale-95"
                        >
                            <div 
                                v-if="isThemeMenuOpen"
                                class="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden p-2"
                            >
                                <button 
                                    v-for="theme in themes" 
                                    :key="theme.value"
                                    @click="setTheme(theme.value)"
                                    :class="[
                                        'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                        currentTheme === theme.value
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    ]"
                                >
                                    <span class="text-lg">{{ theme.icon }}</span>
                                    {{ theme.label }}
                                </button>
                            </div>
                        </transition>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button 
                        @click="toggleMobileMenu"
                        class="md:hidden w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300"
                    >
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                v-if="!isMobileMenuOpen" 
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M4 6h16M4 12h16M4 18h16" 
                            />
                            <path 
                                v-else 
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
        >
            <div 
                v-if="isMobileMenuOpen"
                class="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 shadow-2xl"
            >
                <div class="max-w-7xl mx-auto px-4 py-4 space-y-2">
                    <!-- Main Links -->
                    <router-link 
                        v-for="link in mainLinks" 
                        :key="link.path"
                        :to="link.path"
                        @click="isMobileMenuOpen = false"
                        :class="[
                            'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                            $route.path === link.path
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        ]"
                    >
                        <span class="text-xl">{{ link.icon }}</span>
                        {{ link.label }}
                    </router-link>

                    <!-- Divider -->
                    <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    <!-- Tools Section -->
                    <p class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        🛠️ Tools
                    </p>
                    
                    <div class="grid grid-cols-2 gap-2">
                        <router-link 
                            v-for="tool in toolLinks" 
                            :key="tool.path"
                            :to="tool.path"
                            @click="isMobileMenuOpen = false"
                            :class="[
                                'flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200',
                                $route.path === tool.path
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            ]"
                        >
                            <span class="text-2xl">{{ tool.icon }}</span>
                            <span class="text-xs font-medium">{{ tool.label }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// State
const isScrolled = ref(false);
const currentTheme = ref('system');
const isThemeMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isToolsMenuOpen = ref(false);
const systemThemeIsDark = ref(false);
const mediaQuery = ref(null);
const themeDropdown = ref(null);
const toolsDropdown = ref(null);

// Data
const mainLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/projects', label: 'Projects', icon: '💼' },
    { path: '/about', label: 'About', icon: '👤' },
];

const toolLinks = [
    { path: '/weather-app', label: 'Weather', icon: '🌤️', description: 'Real-time forecasts' },
    { path: '/currency-exchange', label: 'Currency', icon: '💱', description: '150+ currencies' },
    { path: '/air-quality', label: 'Air Quality', icon: '🌬️', description: 'AQI monitoring' },
    { path: '/khmer-calendar', label: 'Khmer Calendar', icon: '📅', description: 'Buddhist dates' },
    { path: '/github-stats', label: 'GitHub Stats', icon: '🐙', description: 'Profile analytics' },
    { path: '/ip-lookup', label: 'IP Lookup', icon: '🌐', description: 'Geolocation finder' },
];

const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
];

// Computed
const isToolActive = computed(() => {
    return toolLinks.some(tool => route.path === tool.path);
});

// Methods
const toggleThemeMenu = () => {
    isThemeMenuOpen.value = !isThemeMenuOpen.value;
    isToolsMenuOpen.value = false;
};

const toggleToolsMenu = () => {
    isToolsMenuOpen.value = !isToolsMenuOpen.value;
    isThemeMenuOpen.value = false;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    isThemeMenuOpen.value = false;
    isToolsMenuOpen.value = false;
};

const setTheme = (theme) => {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
    isThemeMenuOpen.value = false;
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

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

const closeMenusOnClickOutside = (event) => {
    if (isThemeMenuOpen.value && themeDropdown.value && !themeDropdown.value.contains(event.target)) {
        isThemeMenuOpen.value = false;
    }
    if (isToolsMenuOpen.value && toolsDropdown.value && !toolsDropdown.value.contains(event.target)) {
        isToolsMenuOpen.value = false;
    }
};

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        isThemeMenuOpen.value = false;
        isToolsMenuOpen.value = false;
        isMobileMenuOpen.value = false;
    }
};

// Lifecycle
onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        currentTheme.value = savedTheme;
    }

    detectSystemTheme();
    applyTheme();
    handleScroll();

    mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.value.addEventListener('change', handleSystemThemeChange);
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', closeMenusOnClickOutside);
    document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
    if (mediaQuery.value) {
        mediaQuery.value.removeEventListener('change', handleSystemThemeChange);
    }
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', closeMenusOnClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
    transition: all 0.2s ease;
}

.theme-icon-enter-from {
    opacity: 0;
    transform: rotate(-90deg) scale(0);
}

.theme-icon-leave-to {
    opacity: 0;
    transform: rotate(90deg) scale(0);
}
</style>
