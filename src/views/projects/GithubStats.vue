<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-10 mt-10">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 mb-4 shadow-lg">
                    <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </div>
                <h1 class="text-3xl font-bold mb-2">GitHub Stats</h1>
                <p class="text-gray-600 dark:text-gray-400">Explore GitHub profiles and statistics</p>
            </div>

            <!-- Search Box -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1 relative">
                        <AtSymbolIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            v-model="username" 
                            type="text" 
                            placeholder="Enter GitHub username (e.g. NgoytryLyhuor)"
                            @keyup.enter="fetchGithubData"
                            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <button 
                        @click="fetchGithubData"
                        :disabled="loading || !username.trim()"
                        class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                        <span v-if="loading" class="flex items-center">
                            <ArrowPathIcon class="h-5 w-5 mr-2 animate-spin" />
                            Loading...
                        </span>
                        <span v-else class="flex items-center">
                            <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
                            Search
                        </span>
                    </button>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
                <div class="flex items-center">
                    <ExclamationCircleIcon class="h-6 w-6 text-red-500 mr-3" />
                    <p class="text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
            </div>

            <!-- Results -->
            <div v-if="userData && !loading" class="space-y-6 animate-fade-in">
                <!-- Profile Card -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                    <!-- Background Pattern -->
                    <div class="absolute inset-0 opacity-5">
                        <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div class="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                    </div>
                    
                    <div class="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div class="relative">
                            <img 
                                :src="userData.avatar_url" 
                                :alt="userData.name"
                                class="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl"
                            />
                            <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-gray-900">
                                <CheckIcon class="h-4 w-4 text-white" />
                            </div>
                        </div>
                        
                        <div class="text-center sm:text-left flex-1">
                            <h2 class="text-2xl sm:text-3xl font-bold">{{ userData.name || userData.login }}</h2>
                            <p class="text-gray-400 text-lg">@{{ userData.login }}</p>
                            <p v-if="userData.bio" class="mt-3 text-gray-300 max-w-lg">{{ userData.bio }}</p>
                            
                            <div class="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-400">
                                <span v-if="userData.company" class="flex items-center">
                                    <BuildingOfficeIcon class="h-4 w-4 mr-1" />
                                    {{ userData.company }}
                                </span>
                                <span v-if="userData.location" class="flex items-center">
                                    <MapPinIcon class="h-4 w-4 mr-1" />
                                    {{ userData.location }}
                                </span>
                                <span v-if="userData.blog" class="flex items-center">
                                    <LinkIcon class="h-4 w-4 mr-1" />
                                    <a :href="userData.blog.startsWith('http') ? userData.blog : 'https://' + userData.blog" target="_blank" class="hover:text-purple-400 transition-colors">
                                        {{ userData.blog }}
                                    </a>
                                </span>
                            </div>

                            <a 
                                :href="userData.html_url" 
                                target="_blank"
                                class="inline-flex items-center mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View Profile
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:scale-105 transition-transform">
                        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ userData.public_repos }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Repositories</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:scale-105 transition-transform">
                        <div class="text-3xl font-bold text-pink-600 dark:text-pink-400">{{ userData.followers }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Followers</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:scale-105 transition-transform">
                        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ userData.following }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Following</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:scale-105 transition-transform">
                        <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ totalStars }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Stars</div>
                    </div>
                </div>

                <!-- Languages Chart -->
                <div v-if="languages.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CodeBracketIcon class="h-5 w-5 mr-2 text-purple-500" />
                        Top Languages
                    </h3>
                    
                    <!-- Language Bar -->
                    <div class="h-4 rounded-full overflow-hidden flex mb-4">
                        <div 
                            v-for="(lang, index) in languages.slice(0, 6)" 
                            :key="lang.name"
                            :style="{ width: lang.percentage + '%', backgroundColor: lang.color }"
                            class="transition-all duration-500"
                            :title="`${lang.name}: ${lang.percentage}%`">
                        </div>
                    </div>

                    <!-- Language Labels -->
                    <div class="flex flex-wrap gap-4">
                        <div 
                            v-for="lang in languages.slice(0, 6)" 
                            :key="lang.name"
                            class="flex items-center text-sm">
                            <span 
                                class="w-3 h-3 rounded-full mr-2"
                                :style="{ backgroundColor: lang.color }">
                            </span>
                            <span class="text-gray-700 dark:text-gray-300">{{ lang.name }}</span>
                            <span class="text-gray-400 ml-1">({{ lang.percentage }}%)</span>
                        </div>
                    </div>
                </div>

                <!-- Popular Repositories -->
                <div v-if="repos.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <StarIcon class="h-5 w-5 mr-2 text-yellow-500" />
                        Popular Repositories
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a 
                            v-for="repo in repos.slice(0, 6)" 
                            :key="repo.id"
                            :href="repo.html_url"
                            target="_blank"
                            class="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all group">
                            <div class="flex items-start justify-between">
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                        {{ repo.name }}
                                    </h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {{ repo.description || 'No description' }}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                                <span v-if="repo.language" class="flex items-center">
                                    <span 
                                        class="w-2 h-2 rounded-full mr-1"
                                        :style="{ backgroundColor: getLanguageColor(repo.language) }">
                                    </span>
                                    {{ repo.language }}
                                </span>
                                <span class="flex items-center">
                                    <StarIcon class="h-3.5 w-3.5 mr-1 text-yellow-500" />
                                    {{ repo.stargazers_count }}
                                </span>
                                <span class="flex items-center">
                                    <ArrowPathRoundedSquareIcon class="h-3.5 w-3.5 mr-1" />
                                    {{ repo.forks_count }}
                                </span>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Activity & Stats -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Account Info -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <InformationCircleIcon class="h-5 w-5 mr-2 text-blue-500" />
                            Account Info
                        </h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Member since</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(userData.created_at) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Last updated</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(userData.updated_at) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Public gists</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ userData.public_gists }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Account type</span>
                                <span class="font-medium text-gray-900 dark:text-white capitalize">{{ userData.type }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Contribution Stats -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <ChartBarIcon class="h-5 w-5 mr-2 text-green-500" />
                            Quick Stats
                        </h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Avg stars per repo</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ avgStars }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Total forks</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ totalForks }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Most used language</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ topLanguage }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Active years</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ activeYears }} years</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- GitHub Stats Image -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <ChartBarSquareIcon class="h-5 w-5 mr-2 text-purple-500" />
                        Contribution Graph
                    </h3>
                    <div class="flex flex-col items-center gap-4">
                        <img 
                            :src="`https://github-readme-stats.vercel.app/api?username=${userData.login}&show_icons=true&theme=${isDarkMode ? 'tokyonight' : 'default'}&hide_border=true&bg_color=${isDarkMode ? '1f2937' : 'ffffff'}`"
                            alt="GitHub Stats"
                            class="max-w-full rounded-lg"
                            loading="lazy"
                        />
                        <img 
                            :src="`https://github-readme-streak-stats.herokuapp.com/?user=${userData.login}&theme=${isDarkMode ? 'tokyonight' : 'default'}&hide_border=true&background=${isDarkMode ? '1f2937' : 'ffffff'}`"
                            alt="GitHub Streak"
                            class="max-w-full rounded-lg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                    <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Fetching GitHub data...</p>
            </div>

            <!-- Initial State -->
            <div v-if="!userData && !loading && !error" class="text-center py-16">
                <svg class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">Enter a GitHub username</h3>
                <p class="text-gray-500 dark:text-gray-500">Search for any GitHub profile to see their stats</p>
            </div>

            <!-- Footer -->
            <footer class="text-center text-xs text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>Powered by GitHub API • Stats images by github-readme-stats</p>
            </footer>
        </div>
    </div>
</template>

<script>
// GitHub Stats - Explore GitHub profiles and statistics
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    LinkIcon,
    BuildingOfficeIcon,
    StarIcon,
    CodeBracketIcon,
    ChartBarIcon,
    ChartBarSquareIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    ArrowPathIcon,
    CheckIcon,
    ArrowPathRoundedSquareIcon,
    AtSymbolIcon
} from '@heroicons/vue/24/outline'

export default {
    name: 'GithubStats',
    components: {
        MagnifyingGlassIcon,
        MapPinIcon,
        LinkIcon,
        BuildingOfficeIcon,
        StarIcon,
        CodeBracketIcon,
        ChartBarIcon,
        ChartBarSquareIcon,
        InformationCircleIcon,
        ExclamationCircleIcon,
        ArrowPathIcon,
        CheckIcon,
        ArrowPathRoundedSquareIcon,
        AtSymbolIcon
    },
    data() {
        return {
            username: 'NgoytryLyhuor',
            userData: null,
            repos: [],
            languages: [],
            loading: false,
            error: null,
            isDarkMode: false,
            languageColors: {
                JavaScript: '#f1e05a',
                TypeScript: '#2b7489',
                Python: '#3572A5',
                Java: '#b07219',
                'C++': '#f34b7d',
                C: '#555555',
                'C#': '#178600',
                PHP: '#4F5D95',
                Ruby: '#701516',
                Go: '#00ADD8',
                Swift: '#ffac45',
                Kotlin: '#F18E33',
                Rust: '#dea584',
                Vue: '#41b883',
                HTML: '#e34c26',
                CSS: '#563d7c',
                SCSS: '#c6538c',
                Shell: '#89e051',
                Dart: '#00B4AB',
                R: '#198CE7',
                Scala: '#c22d40',
                Lua: '#000080',
                Perl: '#0298c3',
                Haskell: '#5e5086',
                Elixir: '#6e4a7e',
                Clojure: '#db5855',
                Erlang: '#B83998',
                Julia: '#a270ba',
                'Objective-C': '#438eff',
                Assembly: '#6E4C13',
                MATLAB: '#e16737',
                PowerShell: '#012456',
                Groovy: '#e69f56',
                CoffeeScript: '#244776',
                TeX: '#3D6117',
                Vim: '#199f4b',
                Dockerfile: '#384d54',
                Makefile: '#427819',
                Blade: '#f7523f',
            }
        }
    },
    computed: {
        totalStars() {
            return this.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        },
        totalForks() {
            return this.repos.reduce((sum, repo) => sum + repo.forks_count, 0)
        },
        avgStars() {
            if (this.repos.length === 0) return 0
            return (this.totalStars / this.repos.length).toFixed(1)
        },
        topLanguage() {
            return this.languages.length > 0 ? this.languages[0].name : 'N/A'
        },
        activeYears() {
            if (!this.userData) return 0
            const created = new Date(this.userData.created_at)
            const now = new Date()
            return Math.floor((now - created) / (1000 * 60 * 60 * 24 * 365))
        }
    },
    mounted() {
        this.checkDarkMode()
        window.addEventListener('theme-changed', this.checkDarkMode)
        // Auto-fetch on mount
        this.fetchGithubData()
    },
    beforeUnmount() {
        window.removeEventListener('theme-changed', this.checkDarkMode)
    },
    methods: {
        checkDarkMode() {
            this.isDarkMode = document.documentElement.classList.contains('dark')
        },
        async fetchGithubData() {
            if (!this.username.trim()) return

            this.loading = true
            this.error = null
            this.userData = null
            this.repos = []
            this.languages = []

            try {
                // Fetch user data
                const userResponse = await fetch(`https://api.github.com/users/${this.username}`)
                if (!userResponse.ok) {
                    if (userResponse.status === 404) {
                        throw new Error('User not found. Please check the username.')
                    }
                    throw new Error('Failed to fetch user data')
                }
                this.userData = await userResponse.json()

                // Fetch repos
                const reposResponse = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=stars&direction=desc`)
                if (reposResponse.ok) {
                    this.repos = await reposResponse.json()
                    this.calculateLanguages()
                }

            } catch (err) {
                console.error('GitHub API error:', err)
                this.error = err.message || 'Failed to fetch GitHub data. Please try again.'
            } finally {
                this.loading = false
            }
        },
        calculateLanguages() {
            const langCount = {}
            
            this.repos.forEach(repo => {
                if (repo.language) {
                    langCount[repo.language] = (langCount[repo.language] || 0) + 1
                }
            })

            const total = Object.values(langCount).reduce((a, b) => a + b, 0)
            
            this.languages = Object.entries(langCount)
                .map(([name, count]) => ({
                    name,
                    count,
                    percentage: ((count / total) * 100).toFixed(1),
                    color: this.getLanguageColor(name)
                }))
                .sort((a, b) => b.count - a.count)
        },
        getLanguageColor(language) {
            return this.languageColors[language] || '#8b8b8b'
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(dateString).toLocaleDateString('en-US', options)
        }
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

