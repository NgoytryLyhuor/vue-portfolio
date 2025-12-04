<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-500">
        <!-- Header Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
            <!-- Title & View Toggle -->
            <div class="text-center mb-8">
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    Tech Toolbox
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Useful tools & live tech updates in one place
                </p>

                <!-- View Toggle -->
                <div class="inline-flex items-center p-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <button 
                        @click="currentView = 'tools'"
                        :class="[
                            'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                            currentView === 'tools' 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        ]"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Tools Portal
                    </button>
                    <button 
                        @click="currentView = 'dashboard'"
                        :class="[
                            'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                            currentView === 'dashboard' 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        ]"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        Dashboard
                    </button>
                </div>
            </div>
        </div>

        <!-- Tools Portal View -->
        <transition name="fade" mode="out-in">
            <div v-if="currentView === 'tools'" key="tools" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <!-- Search Bar -->
                <div class="max-w-xl mx-auto mb-10">
                    <div class="relative">
                        <input 
                            v-model="searchQuery"
                            type="text" 
                            placeholder="Search tools..."
                            class="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <svg class="w-6 h-6 absolute left-5 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Tools Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <router-link 
                        v-for="tool in filteredTools" 
                        :key="tool.path"
                        :to="tool.path"
                        class="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    >
                        <!-- Gradient Overlay -->
                        <div :class="['absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300', tool.gradient]"></div>
                        
                        <!-- Content -->
                        <div class="relative z-10">
                            <!-- Icon -->
                            <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300', tool.iconBg, 'group-hover:scale-110']">
                                <span class="text-3xl">{{ tool.icon }}</span>
                            </div>
                            
                            <!-- Title & Description -->
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white transition-colors">
                                {{ tool.name }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm group-hover:text-white/80 transition-colors">
                                {{ tool.description }}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mt-4">
                                <span 
                                    v-for="tag in tool.tags" 
                                    :key="tag"
                                    class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors"
                                >
                                    {{ tag }}
                                </span>
                            </div>

                            <!-- Arrow -->
                            <div class="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-white/20 transition-all">
                                <svg class="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- No Results -->
                <div v-if="filteredTools.length === 0" class="text-center py-16">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400">No tools found</h3>
                    <p class="text-gray-500 dark:text-gray-500 mt-2">Try a different search term</p>
                </div>
            </div>

            <!-- Dashboard View -->
            <div v-else key="dashboard" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <!-- Dashboard Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <!-- Weather Widget -->
                    <router-link to="/weather-app" class="md:col-span-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">Weather</h3>
                            <span class="text-4xl">{{ weatherData.icon }}</span>
                        </div>
                        <div class="text-5xl font-bold mb-2">{{ weatherData.temp }}°C</div>
                        <p class="text-white/80">{{ weatherData.city }}</p>
                        <p class="text-sm text-white/60 mt-2">{{ weatherData.condition }}</p>
                    </router-link>

                    <!-- Air Quality Widget -->
                    <router-link to="/air-quality" class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-gray-900 dark:text-white">Air Quality</h3>
                            <span class="text-2xl">🌬️</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <div :class="['text-4xl font-bold', aqiData.color]">{{ aqiData.value }}</div>
                            <div>
                                <div :class="['text-sm font-medium', aqiData.color]">{{ aqiData.level }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">Phnom Penh</div>
                            </div>
                        </div>
                        <div class="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div :class="['h-full rounded-full', aqiData.barColor]" :style="{ width: `${Math.min(aqiData.value / 3, 100)}%` }"></div>
                        </div>
                    </router-link>

                    <!-- Khmer Calendar Widget -->
                    <router-link to="/khmer-calendar" class="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">Khmer Calendar</h3>
                            <span class="text-2xl">📅</span>
                        </div>
                        <div class="text-4xl font-bold mb-1">{{ khmerDate.day }}</div>
                        <p class="text-white/80">{{ khmerDate.month }} {{ khmerDate.year }}</p>
                        <p class="text-sm text-white/60 mt-2">{{ khmerDate.khmerYear }}</p>
                    </router-link>

                    <!-- Tech News Widget -->
                    <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-bold text-gray-900 dark:text-white text-lg">📰 Tech News</h3>
                            <button @click="fetchArticles" class="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                Refresh
                            </button>
                        </div>
                        
                        <div v-if="loadingArticles" class="flex justify-center py-8">
                            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        
                        <div v-else class="space-y-4">
                            <a 
                                v-for="article in articles.slice(0, 4)" 
                                :key="article.id"
                                :href="article.url"
                                target="_blank"
                                class="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                            >
                                <img 
                                    v-if="article.cover_image" 
                                    :src="article.cover_image" 
                                    class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                    @error="(e) => e.target.style.display = 'none'"
                                />
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {{ article.title }}
                                    </h4>
                                    <div class="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span>{{ article.user?.name }}</span>
                                        <span>•</span>
                                        <span>❤️ {{ article.positive_reactions_count }}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Tools Grid -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-4">⚡ Quick Access</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <router-link 
                                v-for="tool in tools.slice(0, 6)" 
                                :key="tool.path"
                                :to="tool.path"
                                class="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                            >
                                <span class="text-2xl mb-1">{{ tool.icon }}</span>
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ tool.shortName || tool.name }}</span>
                            </router-link>
                        </div>
                    </div>

                    <!-- Currency Widget -->
                    <router-link to="/currency-exchange" class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">Currency</h3>
                            <span class="text-2xl">💱</span>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-white/80">USD → KHR</span>
                                <span class="font-bold">{{ currencyData.usdToKhr }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-white/80">EUR → USD</span>
                                <span class="font-bold">{{ currencyData.eurToUsd }}</span>
                            </div>
                        </div>
                    </router-link>

                    <!-- GitHub Stats Widget -->
                    <router-link to="/github-stats" class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">GitHub Stats</h3>
                            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                        </div>
                        <p class="text-white/70 text-sm">Explore GitHub profiles and repository statistics</p>
                        <div class="mt-4 flex items-center text-sm text-white/60">
                            <span>View Stats →</span>
                        </div>
                    </router-link>

                    <!-- IP Lookup Widget -->
                    <router-link to="/ip-lookup" class="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lg">IP Lookup</h3>
                            <span class="text-2xl">🌐</span>
                        </div>
                        <p class="text-white/70 text-sm">Find location and details of any IP address</p>
                        <div class="mt-4 flex items-center text-sm text-white/60">
                            <span>Lookup IP →</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            currentView: 'tools', // 'tools' or 'dashboard'
            searchQuery: '',
            articles: [],
            loadingArticles: true,
            tools: [
                {
                    name: 'Weather App',
                    shortName: 'Weather',
                    path: '/weather-app',
                    icon: '🌤️',
                    description: 'Real-time weather data with forecasts, seasonal info, and beautiful visualizations',
                    tags: ['API', 'Real-time', 'Cambodia'],
                    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
                    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
                },
                {
                    name: 'Air Quality',
                    shortName: 'Air',
                    path: '/air-quality',
                    icon: '🌬️',
                    description: 'Monitor air pollution levels in Phnom Penh with Telegram alerts',
                    tags: ['Health', 'Alerts', 'Telegram'],
                    iconBg: 'bg-green-100 dark:bg-green-900/50',
                    gradient: 'bg-gradient-to-br from-green-500 to-teal-500'
                },
                {
                    name: 'Khmer Calendar',
                    shortName: 'Calendar',
                    path: '/khmer-calendar',
                    icon: '📅',
                    description: 'Traditional Khmer calendar with holidays, lunar phases, and Buddhist dates',
                    tags: ['Cambodia', 'Culture', 'Holidays'],
                    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
                    gradient: 'bg-gradient-to-br from-amber-500 to-orange-500'
                },
                {
                    name: 'Currency Exchange',
                    shortName: 'Currency',
                    path: '/currency-exchange',
                    icon: '💱',
                    description: 'Live exchange rates and currency converter with 150+ currencies',
                    tags: ['Finance', 'Real-time', 'Global'],
                    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
                    gradient: 'bg-gradient-to-br from-emerald-500 to-green-600'
                },
                {
                    name: 'GitHub Stats',
                    shortName: 'GitHub',
                    path: '/github-stats',
                    icon: '🐙',
                    description: 'Explore GitHub profiles, repositories, and contribution statistics',
                    tags: ['Developer', 'Stats', 'API'],
                    iconBg: 'bg-gray-100 dark:bg-gray-700',
                    gradient: 'bg-gradient-to-br from-gray-700 to-gray-900'
                },
                {
                    name: 'IP Lookup',
                    shortName: 'IP',
                    path: '/ip-lookup',
                    icon: '🌐',
                    description: 'Find geolocation, ISP, and network details of any IP address',
                    tags: ['Network', 'Geolocation', 'Security'],
                    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
                    gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
                }
            ],
            // Dashboard data
            weatherData: {
                temp: '--',
                city: 'Phnom Penh',
                condition: 'Loading...',
                icon: '🌤️'
            },
            aqiData: {
                value: '--',
                level: 'Loading...',
                color: 'text-gray-500',
                barColor: 'bg-gray-400'
            },
            khmerDate: {
                day: new Date().getDate(),
                month: new Date().toLocaleString('en', { month: 'long' }),
                year: new Date().getFullYear(),
                khmerYear: `BE ${new Date().getFullYear() + 543}`
            },
            currencyData: {
                usdToKhr: '4,100',
                eurToUsd: '1.08'
            }
        }
    },
    computed: {
        filteredTools() {
            if (!this.searchQuery) return this.tools
            const query = this.searchQuery.toLowerCase()
            return this.tools.filter(tool => 
                tool.name.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }
    },
    mounted() {
        this.fetchArticles()
        this.fetchWeatherData()
        this.fetchAirQualityData()
        this.fetchCurrencyData()
    },
    methods: {
        async fetchArticles() {
            this.loadingArticles = true
            try {
                const response = await fetch('https://dev.to/api/articles?tag=programming&top=10')
                if (response.ok) {
                    this.articles = await response.json()
                }
            } catch (error) {
                console.error('Error fetching articles:', error)
            } finally {
                this.loadingArticles = false
            }
        },
        async fetchWeatherData() {
            try {
                const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Phnom%20Penh&appid=bd5e378503939ddaee76f12ad7a97608&units=metric')
                if (response.ok) {
                    const data = await response.json()
                    this.weatherData = {
                        temp: Math.round(data.main.temp),
                        city: 'Phnom Penh',
                        condition: data.weather[0].description,
                        icon: this.getWeatherIcon(data.weather[0].main)
                    }
                }
            } catch (error) {
                console.error('Error fetching weather:', error)
            }
        },
        async fetchAirQualityData() {
            try {
                const response = await fetch('https://api.airvisual.com/v2/city?city=Phnom%20Penh&state=Phnom%20Penh&country=Cambodia&key=fd0705c4-9945-44b6-95a0-c4cc8052cea9')
                if (response.ok) {
                    const data = await response.json()
                    const aqi = data.data.current.pollution.aqius
                    this.aqiData = {
                        value: aqi,
                        level: this.getAqiLevel(aqi),
                        color: this.getAqiColor(aqi),
                        barColor: this.getAqiBarColor(aqi)
                    }
                }
            } catch (error) {
                console.error('Error fetching AQI:', error)
            }
        },
        async fetchCurrencyData() {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
                if (response.ok) {
                    const data = await response.json()
                    this.currencyData = {
                        usdToKhr: Math.round(data.rates.KHR).toLocaleString(),
                        eurToUsd: (1 / data.rates.EUR).toFixed(2)
                    }
                }
            } catch (error) {
                console.error('Error fetching currency:', error)
            }
        },
        getWeatherIcon(condition) {
            const icons = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '❄️',
                'Mist': '🌫️',
                'Haze': '🌫️'
            }
            return icons[condition] || '🌤️'
        },
        getAqiLevel(aqi) {
            if (aqi <= 50) return 'Good'
            if (aqi <= 100) return 'Moderate'
            if (aqi <= 150) return 'Unhealthy (Sensitive)'
            if (aqi <= 200) return 'Unhealthy'
            if (aqi <= 300) return 'Very Unhealthy'
            return 'Hazardous'
        },
        getAqiColor(aqi) {
            if (aqi <= 50) return 'text-green-500'
            if (aqi <= 100) return 'text-yellow-500'
            if (aqi <= 150) return 'text-orange-500'
            if (aqi <= 200) return 'text-red-500'
            return 'text-purple-500'
        },
        getAqiBarColor(aqi) {
            if (aqi <= 50) return 'bg-green-500'
            if (aqi <= 100) return 'bg-yellow-500'
            if (aqi <= 150) return 'bg-orange-500'
            if (aqi <= 200) return 'bg-red-500'
            return 'bg-purple-500'
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
