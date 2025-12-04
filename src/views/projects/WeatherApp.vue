<template>
    <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8 mt-10">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 mb-4 shadow-xl animate-pulse-slow">
                    <SunIcon class="h-8 w-8 text-white" />
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Weather Forecast
                </h1>
                <p class="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                    <MapPinIcon class="h-4 w-4" />
                    {{ location.name }}, Cambodia
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="relative">
                    <div class="w-20 h-20 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                    <div class="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <SunIcon class="h-8 w-8 text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p class="mt-6 text-gray-600 dark:text-gray-400 font-medium">Fetching weather data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white text-center my-8 shadow-xl">
                <ExclamationCircleIcon class="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h2 class="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                <p class="opacity-90 mb-6">{{ error }}</p>
                <button @click="fetchWeatherData"
                    class="px-6 py-3 bg-white text-red-500 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    <ArrowPathIcon class="h-5 w-5 inline mr-2" />
                    Try Again
                </button>
            </div>

            <!-- Weather Content -->
            <div v-else class="space-y-6 animate-fade-in">
                <!-- Main Weather Card -->
                <div class="relative overflow-hidden rounded-3xl shadow-2xl">
                    <!-- Dynamic Background -->
                    <div class="absolute inset-0" :class="weatherGradient"></div>
                    <div class="absolute inset-0 bg-black/10"></div>
                    
                    <!-- Floating Elements -->
                    <div class="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
                    <div class="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float-delayed"></div>
                    
                    <div class="relative p-6 sm:p-10 text-white">
                        <!-- Top Row - Location & Time -->
                        <div class="flex justify-between items-start mb-8">
                            <div>
                                <h2 class="text-2xl sm:text-3xl font-bold">{{ location.name }}</h2>
                                <p class="text-white/80">{{ currentDate }}</p>
                            </div>
                            <button @click="fetchWeatherData" 
                                class="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
                                <ArrowPathIcon class="h-5 w-5" :class="{ 'animate-spin': loading }" />
                            </button>
                        </div>

                        <!-- Main Weather Display -->
                        <div class="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
                            <!-- Left: Temperature & Icon -->
                            <div class="flex items-center gap-4">
                                <div class="relative">
                                    <img v-if="currentWeather.icon"
                                        :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`"
                                        alt="Weather icon" 
                                        class="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl" />
                                </div>
                                <div>
                                    <div class="text-7xl sm:text-8xl font-bold tracking-tighter">
                                        {{ Math.round(currentWeather.temp) }}°
                                    </div>
                                    <div class="text-xl sm:text-2xl capitalize opacity-90">
                                        {{ currentWeather.condition }}
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Weather Details -->
                            <div class="grid grid-cols-2 gap-4 w-full lg:w-auto">
                                <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-2 text-white/70 text-sm mb-1">
                                        <ArrowUpIcon class="h-4 w-4" />
                                        Feels Like
                                    </div>
                                    <div class="text-2xl font-bold">{{ Math.round(currentWeather.feels_like) }}°</div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-2 text-white/70 text-sm mb-1">
                                        <CloudIcon class="h-4 w-4" />
                                        Humidity
                                    </div>
                                    <div class="text-2xl font-bold">{{ currentWeather.humidity }}%</div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-2 text-white/70 text-sm mb-1">
                                        <WindIcon class="h-4 w-4" />
                                        Wind
                                    </div>
                                    <div class="text-2xl font-bold">{{ Math.round(currentWeather.wind_speed) }} <span class="text-sm">km/h</span></div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-2 text-white/70 text-sm mb-1">
                                        <EyeIcon class="h-4 w-4" />
                                        Visibility
                                    </div>
                                    <div class="text-2xl font-bold">{{ currentWeather.visibility }} <span class="text-sm">km</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Sun Times Bar -->
                        <div class="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <div class="p-2 bg-orange-400/30 rounded-lg">
                                        <SunIcon class="h-5 w-5 text-orange-300" />
                                    </div>
                                    <div>
                                        <p class="text-xs text-white/60">Sunrise</p>
                                        <p class="font-semibold">{{ formatTime(currentWeather.sunrise) }}</p>
                                    </div>
                                </div>
                                
                                <!-- Sun Progress Bar -->
                                <div class="flex-1 mx-6 relative">
                                    <div class="h-1 bg-white/20 rounded-full">
                                        <div class="h-1 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full transition-all duration-1000" 
                                             :style="{ width: sunProgress + '%' }"></div>
                                    </div>
                                    <div class="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                                         :style="{ left: sunProgress + '%' }">
                                        <div class="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 -ml-2 -mt-1.5"></div>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2">
                                    <div>
                                        <p class="text-xs text-white/60 text-right">Sunset</p>
                                        <p class="font-semibold">{{ formatTime(currentWeather.sunset) }}</p>
                                    </div>
                                    <div class="p-2 bg-indigo-400/30 rounded-lg">
                                        <MoonIcon class="h-5 w-5 text-indigo-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">Pressure</span>
                            <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <ChartBarIcon class="h-4 w-4 text-purple-500" />
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.pressure }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">hPa</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">UV Index</span>
                            <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <SunIcon class="h-4 w-4 text-orange-500" />
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ uvIndex }}</div>
                        <div class="text-xs" :class="uvLevelColor">{{ uvLevel }}</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">Dew Point</span>
                            <div class="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                <BeakerIcon class="h-4 w-4 text-cyan-500" />
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.dew_point }}°</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Celsius</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">Clouds</span>
                            <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <CloudIcon class="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.clouds }}%</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Coverage</div>
                    </div>
                </div>

                <!-- Hourly Forecast -->
                <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                        <ClockIcon class="h-6 w-6 mr-3 text-blue-500" />
                        24-Hour Forecast
                    </h2>
                    <div class="overflow-x-auto pb-2 -mx-2 px-2">
                        <div class="flex gap-3" style="min-width: max-content;">
                            <div v-for="(hour, idx) in hourlyForecast" :key="idx"
                                class="flex flex-col items-center p-4 rounded-2xl min-w-[80px] transition-all hover:scale-105"
                                :class="idx === 0 ? 'bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'">
                                <span class="text-sm font-medium" :class="idx === 0 ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
                                    {{ idx === 0 ? 'Now' : formatHour(hour.dt) }}
                                </span>
                                <img :src="`https://openweathermap.org/img/wn/${hour.icon}@2x.png`" 
                                     alt="Weather" class="w-12 h-12 my-1" />
                                <span class="text-xl font-bold" :class="idx === 0 ? 'text-white' : 'text-gray-900 dark:text-white'">
                                    {{ Math.round(hour.temp) }}°
                                </span>
                                <div v-if="hour.rain > 0" class="flex items-center gap-1 mt-1"
                                     :class="idx === 0 ? 'text-blue-200' : 'text-blue-500'">
                                    <CloudRainIcon class="h-3 w-3" />
                                    <span class="text-xs">{{ hour.rain }}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 7-Day Forecast -->
                <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                        <CalendarDaysIcon class="h-6 w-6 mr-3 text-green-500" />
                        7-Day Forecast
                    </h2>
                    <div class="space-y-2">
                        <div v-for="(day, idx) in forecast" :key="idx"
                            class="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-20 font-semibold text-gray-900 dark:text-white">
                                    {{ idx === 0 ? 'Today' : formatDay(day.dt) }}
                                </div>
                                <div class="flex items-center gap-2">
                                    <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" 
                                         alt="Weather" class="w-12 h-12 group-hover:scale-110 transition-transform" />
                                    <span class="text-sm text-gray-600 dark:text-gray-400 capitalize hidden sm:block">
                                        {{ day.condition }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div v-if="day.rain > 0" class="flex items-center gap-1 text-blue-500">
                                    <CloudRainIcon class="h-4 w-4" />
                                    <span class="text-sm">{{ day.rain }}%</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ Math.round(day.max_temp) }}°</span>
                                    <div class="w-16 h-2 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 rounded-full hidden sm:block"></div>
                                    <span class="text-lg text-gray-400">{{ Math.round(day.min_temp) }}°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Weather Details & Season Info Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Monthly Rainfall Chart -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                            <CloudRainIcon class="h-6 w-6 mr-3 text-blue-500" />
                            Monthly Rainfall
                        </h2>
                        <div class="h-44">
                            <div class="flex items-end h-full gap-2">
                                <div v-for="(month, idx) in rainfallData" :key="idx"
                                    class="flex-1 flex flex-col items-center group cursor-pointer">
                                    <div class="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                                        {{ month.rainfall }}mm
                                    </div>
                                    <div class="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                                        :class="currentMonth === idx ? 'bg-gradient-to-t from-blue-600 to-cyan-400' : 'bg-gradient-to-t from-blue-400 to-blue-300 dark:from-blue-600 dark:to-blue-500'"
                                        :style="{ height: `${(month.rainfall / 220) * 100}%` }">
                                    </div>
                                    <span class="text-xs mt-2 font-medium"
                                          :class="currentMonth === idx ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'">
                                        {{ month.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                Annual: <span class="font-semibold text-gray-900 dark:text-white">{{ annualRainfall }}mm</span>
                            </span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                Avg: <span class="font-semibold text-gray-900 dark:text-white">{{ Math.round(annualRainfall / 12) }}mm</span>
                            </span>
                        </div>
                    </div>

                    <!-- Season Info -->
                    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                            <SparklesIcon class="h-6 w-6 mr-3 text-yellow-500" />
                            {{ currentSeason.name }}
                        </h2>
                        
                        <!-- Season Progress -->
                        <div class="mb-6">
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-500 dark:text-gray-400">Season Progress</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ seasonProgress }}%</span>
                            </div>
                            <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000"
                                     :class="currentSeason.name === 'Rainy Season' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-orange-500 to-yellow-400'"
                                     :style="{ width: seasonProgress + '%' }">
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div v-for="(item, idx) in currentSeason.characteristics" :key="idx"
                                class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <CheckCircleIcon class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
                            </div>
                        </div>

                        <div class="mt-4 p-4 rounded-xl border-2 border-dashed"
                             :class="currentSeason.name === 'Rainy Season' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20' : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'">
                            <div class="flex items-center gap-2 mb-2">
                                <LightBulbIcon class="h-5 w-5 text-yellow-500" />
                                <span class="font-semibold text-gray-900 dark:text-white text-sm">Pro Tip</span>
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentSeason.agricultural_advice }}</p>
                        </div>
                    </div>
                </div>

                <!-- Weather Alerts -->
                <div v-if="alerts.length > 0" class="space-y-4">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                        <ExclamationTriangleIcon class="h-6 w-6 mr-3 text-red-500" />
                        Weather Alerts
                    </h2>
                    <div v-for="(alert, idx) in alerts" :key="idx"
                        class="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg animate-pulse-slow">
                        <div class="flex items-start gap-4">
                            <div class="p-2 bg-white/20 rounded-xl">
                                <ExclamationCircleIcon class="h-6 w-6" />
                            </div>
                            <div>
                                <h3 class="font-bold text-lg">{{ alert.title }}</h3>
                                <p class="text-white/90 mt-1">{{ alert.description }}</p>
                                <p class="text-white/70 text-sm mt-2 flex items-center gap-1">
                                    <ClockIcon class="h-4 w-4" />
                                    {{ alert.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>Data provided by OpenWeatherMap • Last updated: {{ lastUpdated }}</p>
            </footer>
        </div>
    </div>
</template>

<script>
// Weather App - Real-time Forecast Dashboard
import {
    SunIcon,
    MoonIcon,
    CloudIcon,
    MapPinIcon,
    EyeIcon,
    ArrowUpIcon,
    BeakerIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    SparklesIcon,
    CheckCircleIcon,
    LightBulbIcon,
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ArrowPathIcon,
    ArrowTrendingUpIcon
} from '@heroicons/vue/24/outline';

import { CloudIcon as CloudRainIcon } from '@heroicons/vue/24/solid';

export default {
    name: 'WeatherApp',
    components: {
        SunIcon,
        MoonIcon,
        CloudIcon,
        CloudRainIcon,
        WindIcon: ArrowTrendingUpIcon,
        MapPinIcon,
        EyeIcon,
        ArrowUpIcon,
        BeakerIcon,
        CalendarDaysIcon,
        ChartBarIcon,
        SparklesIcon,
        CheckCircleIcon,
        LightBulbIcon,
        ExclamationTriangleIcon,
        ExclamationCircleIcon,
        ClockIcon,
        ArrowPathIcon
    },
    data() {
        return {
            loading: true,
            error: null,
            apiKey: '3504abf6222f69d05c100fa0ef8165bb',
            location: { name: 'Phnom Penh', lat: 11.5564, lon: 104.9282 },
            currentWeather: {
                temp: 0,
                feels_like: 0,
                condition: '',
                wind_speed: 0,
                humidity: 0,
                sunrise: 0,
                sunset: 0,
                icon: '',
                pressure: 0,
                visibility: 0,
                dew_point: 0,
                clouds: 0
            },
            hourlyForecast: [],
            currentSeason: {
                name: 'Loading...',
                characteristics: [],
                agricultural_advice: ''
            },
            seasonProgress: 0,
            forecast: [],
            rainfallData: [
                { name: 'Jan', rainfall: 10 },
                { name: 'Feb', rainfall: 15 },
                { name: 'Mar', rainfall: 40 },
                { name: 'Apr', rainfall: 80 },
                { name: 'May', rainfall: 120 },
                { name: 'Jun', rainfall: 150 },
                { name: 'Jul', rainfall: 170 },
                { name: 'Aug', rainfall: 180 },
                { name: 'Sep', rainfall: 220 },
                { name: 'Oct', rainfall: 190 },
                { name: 'Nov', rainfall: 70 },
                { name: 'Dec', rainfall: 20 }
            ],
            alerts: [],
            uvIndex: 0,
            lastUpdated: ''
        }
    },
    computed: {
        annualRainfall() {
            return this.rainfallData.reduce((sum, month) => sum + month.rainfall, 0);
        },
        currentMonth() {
            return new Date().getMonth();
        },
        currentDate() {
            return new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        },
        weatherGradient() {
            const hour = new Date().getHours();
            if (hour >= 6 && hour < 12) {
                return 'bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500'; // Morning
            } else if (hour >= 12 && hour < 17) {
                return 'bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500'; // Afternoon
            } else if (hour >= 17 && hour < 20) {
                return 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600'; // Evening
            } else {
                return 'bg-gradient-to-br from-indigo-600 via-purple-700 to-gray-900'; // Night
            }
        },
        sunProgress() {
            if (!this.currentWeather.sunrise || !this.currentWeather.sunset) return 0;
            const now = Date.now();
            const sunrise = this.currentWeather.sunrise;
            const sunset = this.currentWeather.sunset;
            
            if (now < sunrise) return 0;
            if (now > sunset) return 100;
            
            return Math.round(((now - sunrise) / (sunset - sunrise)) * 100);
        },
        uvLevel() {
            if (this.uvIndex <= 2) return 'Low';
            if (this.uvIndex <= 5) return 'Moderate';
            if (this.uvIndex <= 7) return 'High';
            if (this.uvIndex <= 10) return 'Very High';
            return 'Extreme';
        },
        uvLevelColor() {
            if (this.uvIndex <= 2) return 'text-green-500';
            if (this.uvIndex <= 5) return 'text-yellow-500';
            if (this.uvIndex <= 7) return 'text-orange-500';
            if (this.uvIndex <= 10) return 'text-red-500';
            return 'text-purple-500';
        }
    },
    methods: {
        async fetchWeatherData() {
            this.loading = true;
            this.error = null;

            try {
                const currentWeatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                );

                if (!currentWeatherResponse.ok) {
                    throw new Error('Failed to fetch current weather data');
                }

                const currentData = await currentWeatherResponse.json();

                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                );

                if (!forecastResponse.ok) {
                    throw new Error('Failed to fetch forecast data');
                }

                const forecastData = await forecastResponse.json();

                // Calculate dew point
                const temp = currentData.main.temp;
                const humidity = currentData.main.humidity;
                const dewPoint = temp - ((100 - humidity) / 5);

                this.currentWeather = {
                    temp: currentData.main.temp,
                    feels_like: currentData.main.feels_like,
                    condition: currentData.weather[0].description,
                    wind_speed: currentData.wind.speed * 3.6,
                    humidity: currentData.main.humidity,
                    sunrise: currentData.sys.sunrise * 1000,
                    sunset: currentData.sys.sunset * 1000,
                    icon: currentData.weather[0].icon,
                    pressure: currentData.main.pressure,
                    visibility: Math.round((currentData.visibility || 10000) / 1000),
                    dew_point: Math.round(dewPoint),
                    clouds: currentData.clouds?.all || 0
                };

                // Estimate UV index based on time and cloud cover
                const hour = new Date().getHours();
                const cloudFactor = 1 - (this.currentWeather.clouds / 100) * 0.5;
                if (hour >= 10 && hour <= 16) {
                    this.uvIndex = Math.round(8 * cloudFactor);
                } else if (hour >= 7 && hour < 10 || hour > 16 && hour <= 19) {
                    this.uvIndex = Math.round(4 * cloudFactor);
                } else {
                    this.uvIndex = 0;
                }

                this.hourlyForecast = forecastData.list.slice(0, 12).map(item => ({
                    dt: item.dt * 1000,
                    temp: item.main.temp,
                    icon: item.weather[0].icon,
                    rain: Math.round(item.pop * 100)
                }));

                this.forecast = [];
                const dailyForecasts = {};

                forecastData.list.forEach(item => {
                    const date = new Date(item.dt * 1000).toDateString();

                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = {
                            dt: item.dt,
                            temps: [],
                            icon: item.weather[0].icon,
                            condition: item.weather[0].description,
                            rain: item.pop * 100
                        };
                    }

                    dailyForecasts[date].temps.push(item.main.temp);
                });

                Object.values(dailyForecasts).slice(0, 7).forEach(day => {
                    this.forecast.push({
                        dt: day.dt,
                        min_temp: Math.min(...day.temps),
                        max_temp: Math.max(...day.temps),
                        icon: day.icon,
                        condition: day.condition,
                        rain: Math.round(day.rain)
                    });
                });

                this.updateSeason();

                this.alerts = [];
                if (currentData.weather[0].main === 'Thunderstorm' ||
                    (currentData.weather[0].main === 'Rain' && currentData.rain && currentData.rain['1h'] > 10)) {
                    this.alerts.push({
                        title: 'Heavy Rain Warning',
                        description: `Heavy rainfall expected in ${this.location.name}. Potential for localized flooding.`,
                        time: `Issued: ${new Date().toLocaleString()}`
                    });
                }

                if (currentData.main.temp > 35) {
                    this.alerts.push({
                        title: 'Extreme Heat Advisory',
                        description: `Very high temperatures expected. Stay hydrated and avoid prolonged sun exposure.`,
                        time: `Issued: ${new Date().toLocaleString()}`
                    });
                }

                this.lastUpdated = new Date().toLocaleString();

            } catch (err) {
                console.error('Error fetching weather data:', err);
                this.error = err.message || 'Failed to load weather data. Please try again.';
            } finally {
                this.loading = false;
            }
        },

        formatTime(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },

        formatHour(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', hour12: true });
        },

        formatDay(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
        },

        updateSeason() {
            const month = new Date().getMonth();

            if (month >= 4 && month <= 9) {
                this.currentSeason = {
                    name: 'Rainy Season',
                    characteristics: [
                        'High humidity levels (75-90%)',
                        'Frequent afternoon thunderstorms',
                        'Average temperatures: 25-32°C',
                        'Peak rainfall in September/October'
                    ],
                    agricultural_advice: 'Ideal time for rice planting. Prepare for potential flooding in low-lying areas. Good time to collect rainwater.'
                };
                this.seasonProgress = Math.round(((month - 4) / 6) * 100);
            } else {
                this.currentSeason = {
                    name: 'Dry Season',
                    characteristics: [
                        'Lower humidity (50-70%)',
                        'Clear skies and sunshine',
                        'Temperatures range: 22-35°C',
                        'Cooler from November to January'
                    ],
                    agricultural_advice: 'Focus on irrigation for crops. Good time for harvesting rice and planting vegetables. Store water efficiently.'
                };
                this.seasonProgress = month < 4 ?
                    Math.round(((month + 2) / 6) * 100) :
                    Math.round(((month - 10) / 6) * 100);
            }
        }
    },
    mounted() {
        this.fetchWeatherData();
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
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

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 3s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-20px) scale(1.1);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes pulse-slow {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

/* Custom scrollbar */
::-webkit-scrollbar {
    height: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

.dark ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>

