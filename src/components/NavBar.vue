<template>
    <nav class="fixed w-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-4 shadow-md backdrop-blur-sm z-50">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                <div class="flex items-center">
                    <img src="../assets/logo.png" alt="Logo" class="h-8 w-auto mr-4">
                    <h1 class="text-xl font-bold">Ngoytry Lyhuor</h1>
                </div>
            </router-link>
            <div class="flex items-center space-x-6">
                <div class="hidden md:flex space-x-4">
                    <router-link to="/" class="hover:text-green-500 dark:hover:text-green-400 transition-colors">Home</router-link>
                    <router-link to="/projects" class="hover:text-green-500 dark:hover:text-green-400 transition-colors">Projects</router-link>
                    <router-link to="/about" class="hover:text-green-500 dark:hover:text-green-400 transition-colors">About</router-link>
                </div>

                <!-- Theme Switcher -->
                <div class="relative" ref="themeDropdown">
                    <button @click="toggleThemeMenu" class="flex items-center hover:text-green-500 dark:hover:text-green-400 transition-colors">
                        <!-- Sun icon for light mode -->
                        <svg v-if="effectiveTheme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd" />
                        </svg>
                        <!-- Moon icon for dark mode -->
                        <svg v-else-if="effectiveTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        <!-- Computer icon for system -->
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <!-- Theme dropdown menu -->
                    <div v-if="isThemeMenuOpen" class="absolute right-0 w-48 bg-white/90 dark:bg-gray-800/90 mt-6 shadow-lg z-50 border dark:border-gray-600 dark:bg-dark-bg">
                        <button @click="setTheme('light')" class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                            </svg>
                            Light
                        </button>
                        <button @click="setTheme('dark')" class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            Dark
                        </button>
                        <button @click="setTheme('system')" class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                            </svg>
                            System
                        </button>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <button @click="toggleMobileMenu" class="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden py-2 px-4 space-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <router-link to="/" class="block hover:text-green-500 dark:hover:text-green-400 py-2 transition-colors" @click="isMobileMenuOpen = false">Home</router-link>
            <router-link to="/projects" class="block hover:text-green-500 dark:hover:text-green-400 py-2 transition-colors" @click="isMobileMenuOpen = false">Projects</router-link>
            <router-link to="/about" class="block hover:text-green-500 dark:hover:text-green-400 py-2 transition-colors" @click="isMobileMenuOpen = false">About</router-link>
        </div>
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
            mediaQuery: null
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
        if (savedTheme) {
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
        
        // Use the appropriate event listener method based on browser support
        if (this.mediaQuery.addEventListener) {
            this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
        } else {
            // Fallback for older browsers
            this.mediaQuery.addListener(this.handleSystemThemeChange);
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', this.closeMenusOnClickOutside);
    },
    beforeUnmount() {
        // Clean up event listeners
        if (this.mediaQuery) {
            if (this.mediaQuery.removeEventListener) {
                this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
            } else {
                this.mediaQuery.removeListener(this.handleSystemThemeChange);
            }
        }
        document.removeEventListener('click', this.closeMenusOnClickOutside);
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
        }
    }
}
</script>

<style scoped>
    /* Add this to your style section if backdrop-filter isn't working */
    .backdrop-blur-sm {
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
</style>