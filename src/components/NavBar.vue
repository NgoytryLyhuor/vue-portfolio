<template>
    <nav class="fixed w-full bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 py-4 px-4 sm:px-6 lg:px-40 shadow-md backdrop-blur-sm z-50 transition-colors duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex">
                <router-link to="/"
                    class="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                    aria-label="Home">
                    <div class="flex items-center">
                        <img src="../assets/logo.png" alt="Logo"
                            class="h-6 w-6 mr-3 transition-transform duration-200 hover:scale-105">
                        <h1 class="text-[16px] font-bold dark:text-white">Ngoytry Lyhuor</h1>
                    </div>
                </router-link>
                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-6 ml-10">
                    <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
                        class="hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-2 py-1 rounded-md"
                        :class="{ 'text-green-500 dark:text-green-400': $route.path === link.path }"
                        :aria-label="link.label">
                        {{ link.label }}
                    </router-link>
                </div>
            </div>

            <div class="flex items-center space-x-6">
                <!-- Theme Switcher -->
                <div class="relative" ref="themeDropdown">
                    <div class="flex items-center space-x-6">
                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-700 dark:text-gray-300 [&_svg]:size-4 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>

                        <!-- GitHub -->
                        <a href="https://github.com/NgoytryLyhuor" target="_blank" rel="noopener noreferrer"
                            class="text-gray-700 dark:text-gray-300 [&_svg]:size-4 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>

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
                class="md:hidden py-2 px-4 space-y-2 mt-4 bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm border-t dark:border-gray-700">
                <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
                    class="block hover:text-green-500 dark:hover:text-green-400 py-3 px-2 transition-colors duration-200 rounded-md"
                    :class="{ 'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800': $route.path === link.path }"
                    @click="isMobileMenuOpen = false" :aria-label="link.label">
                    {{ link.label }}
                </router-link>
            </div>
        </transition>
    </nav>
</template>

<script>
export default {
    name: 'NavBarComponent',
    data() {
        return {
            currentTheme: 'system',
            isThemeMenuOpen: false,
            isMobileMenuOpen: false,
            systemThemeIsDark: false,
            mediaQuery: null,
            navLinks: [
                { path: '/', label: 'Home' },
                { path: '/projects', label: 'Projects' },
                { path: '/about', label: 'About' }
            ]
        }
    },
    computed: {
        effectiveTheme() {
            if (this.currentTheme === 'system') {
                return this.systemThemeIsDark ? 'dark' : 'light';
            }
            return this.currentTheme;
        }
    },
    mounted() {
        // Initialize theme from localStorage or default to system
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = 'system';
        }

        // Detect system preference
        this.detectSystemTheme();

        // Apply the theme
        this.applyTheme();

        // Add event listener for system theme changes
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);

        // Close dropdowns when clicking outside
        document.addEventListener('click', this.closeMenusOnClickOutside);
        document.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        // Clean up event listeners
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
        }
        document.removeEventListener('click', this.closeMenusOnClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        toggleThemeMenu() {
            this.isThemeMenuOpen = !this.isThemeMenuOpen;
            if (this.isThemeMenuOpen) {
                this.isMobileMenuOpen = false;
            }
        },
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            if (this.isMobileMenuOpen) {
                this.isThemeMenuOpen = false;
            }
        },
        setTheme(theme) {
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
            this.applyTheme();
            this.isThemeMenuOpen = false;

            // Dispatch event for other components to react to theme changes
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
        },
        applyTheme() {
            const shouldBeDark = this.currentTheme === 'dark' ||
                (this.currentTheme === 'system' && this.systemThemeIsDark);

            if (shouldBeDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        detectSystemTheme() {
            this.systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        },
        handleSystemThemeChange(e) {
            this.systemThemeIsDark = e.matches;
            if (this.currentTheme === 'system') {
                this.applyTheme();
            }
        },
        closeMenusOnClickOutside(event) {
            if (this.isThemeMenuOpen && this.$refs.themeDropdown && !this.$refs.themeDropdown.contains(event.target)) {
                this.isThemeMenuOpen = false;
            }

            if (this.isMobileMenuOpen && !event.target.closest('.md\\:hidden')) {
                this.isMobileMenuOpen = false;
            }
        },
        handleKeyDown(event) {
            // Close menus on Escape key
            if (event.key === 'Escape') {
                if (this.isThemeMenuOpen) {
                    this.isThemeMenuOpen = false;
                }
                if (this.isMobileMenuOpen) {
                    this.isMobileMenuOpen = false;
                }
            }
        }
    }
}
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