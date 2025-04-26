<template>
    <nav class="fixed w-full bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 py-3 px-4 shadow-lg backdrop-blur-md z-50 transition-all duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo/Brand -->
            <router-link to="/" class="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200" aria-label="Home">
                <div class="flex items-center">
                    <img src="../assets/logo.png" alt="Logo" class="h-7 w-7 mr-3 transition-transform duration-200 hover:scale-110">
                    <h1 class="text-[16px] font-bold dark:text-white">Ngoytry Lyhuor</h1>
                </div>
            </router-link>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex space-x-6 ml-10">
                <router-link 
                    v-for="link in navLinks" 
                    :key="link.path" 
                    :to="link.path"
                    class="relative hover:text-green-500 dark:hover:text-green-400 text-[14px] transition-colors duration-200 px-3 py-1 rounded-md group"
                    :class="{ 'text-green-500 dark:text-green-400': $route.path === link.path }"
                    :aria-label="link.label">
                    {{ link.label }}
                    <span 
                        class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 dark:bg-green-400 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"
                        :class="{ 'w-3/4 left-1/8': $route.path === link.path }">
                    </span>
                </router-link>
            </div>

            <!-- Right side controls -->
            <div class="flex items-center space-x-4">
                <!-- Theme Switcher - Compact for mobile -->
                <button 
                    @click="toggleTheme"
                    class="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Toggle theme">
                    <svg v-if="effectiveTheme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                </button>

                <!-- Mobile menu button - Animated hamburger -->
                <button 
                    @click="toggleMobileMenu"
                    class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                    aria-label="Toggle navigation menu" 
                    :aria-expanded="isMobileMenuOpen">
                    <span 
                        class="block w-6 h-0.5 bg-current transition-all duration-300 transform"
                        :class="{
                            'translate-y-1.5 rotate-45': isMobileMenuOpen,
                            'mb-1.5': !isMobileMenuOpen
                        }">
                    </span>
                    <span 
                        class="block w-6 h-0.5 bg-current transition-all duration-300"
                        :class="{
                            'opacity-0': isMobileMenuOpen,
                            'mb-1.5': !isMobileMenuOpen
                        }">
                    </span>
                    <span 
                        class="block w-6 h-0.5 bg-current transition-all duration-300 transform"
                        :class="{
                            '-translate-y-1.5 -rotate-45': isMobileMenuOpen
                        }">
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile menu - Full screen overlay -->
        <transition 
            enter-active-class="transition-opacity ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div 
                v-if="isMobileMenuOpen"
                class="md:hidden fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 mt-16"
                @click="isMobileMenuOpen = false">
            </div>
        </transition>

        <!-- Mobile menu content - Slide in from right -->
        <transition
            enter-active-class="transition-transform ease-out duration-200"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform ease-in duration-150"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full">
            <div 
                v-if="isMobileMenuOpen"
                class="md:hidden fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto">
                <div class="p-4 space-y-2">
                    <router-link 
                        v-for="link in navLinks" 
                        :key="link.path" 
                        :to="link.path"
                        class="flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200"
                        :class="{
                            'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800': $route.path === link.path,
                            'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800': $route.path !== link.path
                        }"
                        @click="isMobileMenuOpen = false">
                        <span class="mr-3">{{ link.label }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto opacity-70" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </router-link>
                </div>
                
                <!-- Theme selector in mobile menu -->
                <div class="p-4 border-t dark:border-gray-800 mt-4">
                    <h3 class="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">THEME</h3>
                    <button 
                        @click="setTheme('light')"
                        class="flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors duration-200"
                        :class="{
                            'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800': effectiveTheme === 'light',
                            'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800': effectiveTheme !== 'light'
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                        </svg>
                        Light
                    </button>
                    <button 
                        @click="setTheme('dark')"
                        class="flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors duration-200"
                        :class="{
                            'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800': effectiveTheme === 'dark',
                            'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800': effectiveTheme !== 'dark'
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        Dark
                    </button>
                    <button 
                        @click="setTheme('system')"
                        class="flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors duration-200"
                        :class="{
                            'text-green-500 dark:text-green-400 bg-gray-100 dark:bg-gray-800': currentTheme === 'system',
                            'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800': currentTheme !== 'system'
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                        </svg>
                        System
                    </button>
                </div>
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
            isMobileMenuOpen: false,
            systemThemeIsDark: false,
            mediaQuery: null,
        }
    },
    computed: {
        effectiveTheme() {
            if (this.currentTheme === 'system') {
                return this.systemThemeIsDark ? 'dark' : 'light';
            }
            return this.currentTheme;
        },
        navLinks() {
            const links = [
                { path: '/', label: 'Home' },
                { path: '/projects', label: 'Projects' },
                { path: '/about', label: 'About' }
            ];
            
            if (process.env.NODE_ENV === 'development') {
                links.push({ path: '/business', label: 'Business' });
            }
            
            return links;
        }
    },
    mounted() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }

        this.detectSystemTheme();
        this.applyTheme();

        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);

        document.addEventListener('click', this.closeMenusOnClickOutside);
        document.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
        }
        document.removeEventListener('click', this.closeMenusOnClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        toggleTheme() {
            const themes = ['system', 'light', 'dark'];
            const currentIndex = themes.indexOf(this.currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            this.setTheme(themes[nextIndex]);
        },
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        setTheme(theme) {
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
            this.applyTheme();
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
            if (this.isMobileMenuOpen && !event.target.closest('.md\\:hidden')) {
                this.isMobileMenuOpen = false;
            }
        },
        handleKeyDown(event) {
            if (event.key === 'Escape' && this.isMobileMenuOpen) {
                this.isMobileMenuOpen = false;
            }
        }
    }
}
</script>

<style scoped>
/* Smooth transitions */
nav, button, a, svg {
    @apply transition-all duration-200;
}

/* Improve focus styles */
button:focus, a:focus {
    @apply outline-none ring-2 ring-green-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900;
}

/* Custom scrollbar for mobile menu */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
}
::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}
</style>