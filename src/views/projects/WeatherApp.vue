<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
        <div class="max-w-3xl mx-auto">
            <!-- Header Section -->
            <div class="flex flex-col items-center text-center mb-5 mt-10">
                <div>
                    <h1 class="text-3xl font-bold mb-6 text-center">
                        Phnom Penh Weather
                    </h1>
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {{ new Date().toLocaleDateString('en-US', {
                            weekday: 'long', month: 'long', day: 'numeric'
                        }) }}
                    </p>
                </div>
                <button @click="fetchWeatherData"
                    class="mt-2 p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm hover:shadow-md transition-all">
                    <ArrowPathIcon class="h-5 w-5" :class="{ 'animate-spin': loading }" />
                </button>
            </div>


            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p class="text-gray-600 dark:text-gray-300">Fetching weather data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center my-8">
                <ExclamationCircleIcon class="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 class="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Failed to Load Weather Data</h2>
                <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
                <button @click="fetchWeatherData"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center mx-auto">
                    <ArrowPathIcon class="h-4 w-4 mr-2" />
                    Try Again
                </button>
            </div>

            <div v-else class="space-y-6">
                <!-- Current Weather Card -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <div class="p-5 sm:p-8">
                        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <!-- Main Weather Info -->
                            <div class="flex items-center w-full sm:w-auto">
                                <div class="text-6xl sm:text-7xl mr-4 sm:mr-6">
                                    <img v-if="currentWeather.icon"
                                        :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`"
                                        alt="Weather icon" class="w-16 h-16 sm:w-20 sm:h-20" />
                                </div>
                                <div>
                                    <div class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                                        {{ Math.round(currentWeather.temp) }}°C
                                    </div>
                                    <div class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 capitalize">
                                        {{ currentWeather.condition }}
                                    </div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">
                                        Feels like {{ Math.round(currentWeather.feels_like) }}°C
                                    </div>
                                </div>
                            </div>

                            <!-- Weather Details Grid -->
                            <div class="grid grid-cols-2 gap-4 w-full sm:w-auto">
                                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center">
                                    <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                                        <WindIcon class="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Wind</div>
                                        <div class="font-medium">{{ Math.round(currentWeather.wind_speed) }} km/h</div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center">
                                    <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                                        <WaterDropIcon class="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Humidity</div>
                                        <div class="font-medium">{{ currentWeather.humidity }}%</div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center">
                                    <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-3">
                                        <SunIcon class="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Sunrise</div>
                                        <div class="font-medium">{{ formatTime(currentWeather.sunrise) }}</div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center">
                                    <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3">
                                        <MoonIcon class="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Sunset</div>
                                        <div class="font-medium">{{ formatTime(currentWeather.sunset) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Season Indicator -->
                    <div
                        class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white flex flex-col sm:flex-row justify-between items-center">
                        <div class="flex items-center mb-2 sm:mb-0">
                            <CalendarIcon class="h-5 w-5 mr-2" />
                            <span class="font-medium">{{ currentSeason.name }}</span>
                        </div>
                        <div class="flex items-center w-full sm:w-auto">
                            <div class="w-24 sm:w-32 bg-blue-400/30 rounded-full h-2 mr-3">
                                <div class="bg-white h-2 rounded-full" :style="{ width: `${seasonProgress}%` }"></div>
                            </div>
                            <span class="text-sm font-bold">{{ seasonProgress }}% complete</span>
                        </div>
                    </div>
                </div>

                <!-- Hourly Forecast (Horizontal Scroll) -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <ClockIcon class="h-5 w-5 mr-2 text-blue-500" />
                        Today's Forecast
                    </h2>
                    <div class="overflow-x-auto pb-2">
                        <div class="flex space-x-4">
                            <div v-for="(hour, index) in hourlyForecast" :key="index"
                                class="flex flex-col items-center min-w-[60px]">
                                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {{ formatHour(hour.dt) }}
                                </div>
                                <img :src="`https://openweathermap.org/img/wn/${hour.icon}@2x.png`" alt="Weather icon"
                                    class="w-10 h-10 my-1" />
                                <div class="text-lg font-bold text-gray-900 dark:text-white">
                                    {{ Math.round(hour.temp) }}°
                                </div>
                                <div v-if="hour.rain > 0"
                                    class="text-xs text-blue-500 dark:text-blue-400 flex items-center">
                                    <WaterDropIcon class="h-3 w-3 mr-1" />
                                    {{ hour.rain }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 5-Day Forecast -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CalendarDaysIcon class="h-5 w-5 mr-2 text-blue-500" />
                        5-Day Forecast
                    </h2>
                    <div class="space-y-3">
                        <div v-for="(day, index) in forecast" :key="index"
                            class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <div class="flex items-center">
                                <div class="w-20 font-medium text-gray-700 dark:text-gray-300">
                                    {{ formatDay(day.dt) }}
                                </div>
                                <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" alt="Weather icon"
                                    class="w-10 h-10 mx-2" />
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm text-gray-500 dark:text-gray-400 mr-4 flex items-center"
                                    v-if="day.rain > 0">
                                    <WaterDropIcon class="h-3 w-3 mr-1" />
                                    {{ day.rain }}%
                                </div>
                                <div class="flex gap-2">
                                    <span class="font-bold text-gray-900 dark:text-white">{{ Math.round(day.max_temp)
                                        }}°</span>
                                    <span class="text-gray-500 dark:text-gray-400">{{ Math.round(day.min_temp)
                                        }}°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Weather Data -->
                <div class="grid grid-cols-1 gap-6">
                    <!-- Rainfall Chart -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <ChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
                            Monthly Rainfall
                        </h2>
                        <div class="h-48">
                            <div class="flex items-end h-full gap-1.5">
                                <div v-for="(month, index) in rainfallData" :key="index"
                                    class="flex-1 flex flex-col items-center group">
                                    <div class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-500"
                                        :style="{ height: `${month.rainfall * 0.4}px` }"
                                        :title="`${month.rainfall}mm in ${month.name}`"></div>
                                    <span class="text-xs mt-2 text-gray-500 dark:text-gray-400">{{ month.name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                            <span>Annual Total: {{ annualRainfall }}mm</span>
                            <span>Avg: {{ Math.round(annualRainfall / 12) }}mm</span>
                        </div>
                    </div>

                    <!-- Season Info -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <SparklesIcon class="h-5 w-5 mr-2 text-yellow-500" />
                            {{ currentSeason.name }} Tips
                        </h2>
                        <div class="space-y-3">
                            <div v-for="(item, index) in currentSeason.characteristics" :key="index"
                                class="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <CheckCircleIcon class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
                            </div>
                        </div>
                        <div
                            class="mt-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-100 dark:border-gray-600">
                            <h3 class="font-medium mb-2 flex items-center text-blue-800 dark:text-blue-300">
                                <LightBulbIcon class="h-5 w-5 mr-2" />
                                Agricultural Advice
                            </h3>
                            <p class="text-sm text-gray-700 dark:text-gray-300">{{ currentSeason.agricultural_advice }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Weather Alerts -->
                <div v-if="alerts.length > 0">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <ExclamationTriangleIcon class="h-5 w-5 mr-2 text-red-500" />
                        Weather Alerts
                    </h2>
                    <div class="space-y-3">
                        <div v-for="(alert, index) in alerts" :key="index"
                            class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 class="font-bold text-red-800 dark:text-red-200">{{ alert.title }}</h3>
                                <p class="text-sm text-red-700 dark:text-red-300 mt-1">{{ alert.description }}</p>
                                <p class="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center">
                                    <ClockIcon class="h-3 w-3 mr-1" />
                                    {{ alert.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer
                class="text-center text-xs text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>Data provided by OpenWeatherMap • Last updated: {{ new Date().toLocaleString() }}</p>
            </footer>
        </div>
    </div>
</template>

<script>
import {
    SunIcon,
    MoonIcon,
    WindIcon,
    WaterDropIcon,
    CalendarIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    SparklesIcon,
    CheckCircleIcon,
    LightBulbIcon,
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'PhnomPenhWeatherApp',
    components: {
        SunIcon,
        MoonIcon,
        WindIcon,
        WaterDropIcon,
        CalendarIcon,
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
                icon: ''
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
            alerts: []
        }
    },
    computed: {
        annualRainfall() {
            return this.rainfallData.reduce((sum, month) => sum + month.rainfall, 0);
        }
    },
    methods: {
        async fetchWeatherData() {
            this.loading = true;
            this.error = null;

            try {
                // Fetch current weather
                const currentWeatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                );

                if (!currentWeatherResponse.ok) {
                    throw new Error('Failed to fetch current weather data');
                }

                const currentData = await currentWeatherResponse.json();

                // Fetch forecast
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                );

                if (!forecastResponse.ok) {
                    throw new Error('Failed to fetch forecast data');
                }

                const forecastData = await forecastResponse.json();

                // Update current weather
                this.currentWeather = {
                    temp: currentData.main.temp,
                    feels_like: currentData.main.feels_like,
                    condition: currentData.weather[0].description,
                    wind_speed: currentData.wind.speed * 3.6, // Convert m/s to km/h
                    humidity: currentData.main.humidity,
                    sunrise: currentData.sys.sunrise * 1000,
                    sunset: currentData.sys.sunset * 1000,
                    icon: currentData.weather[0].icon
                };

                // Update hourly forecast (next 12 hours)
                this.hourlyForecast = forecastData.list.slice(0, 12).map(item => ({
                    dt: item.dt * 1000,
                    temp: item.main.temp,
                    icon: item.weather[0].icon,
                    rain: Math.round(item.pop * 100)
                }));

                // Update 5-day forecast
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

                Object.values(dailyForecasts).slice(0, 5).forEach(day => {
                    this.forecast.push({
                        dt: day.dt,
                        min_temp: Math.min(...day.temps),
                        max_temp: Math.max(...day.temps),
                        icon: day.icon,
                        condition: day.condition,
                        rain: Math.round(day.rain)
                    });
                });

                // Determine season
                this.updateSeason();

                // Check for alerts
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
            return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit' });
        },

        formatDay(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp * 1000);
            const today = new Date();

            if (date.toDateString() === today.toDateString()) {
                return 'Today';
            }

            return date.toLocaleDateString([], { weekday: 'short' });
        },

        updateSeason() {
            const month = new Date().getMonth();

            if (month >= 4 && month <= 9) {
                // Rainy season
                this.currentSeason = {
                    name: 'Rainy Season',
                    characteristics: [
                        'High humidity (75-90%)',
                        'Frequent afternoon thunderstorms',
                        'Average temperatures: 25-32°C',
                        'Peak rainfall in September/October'
                    ],
                    agricultural_advice: 'Ideal time for rice planting. Prepare for potential flooding in low-lying areas.'
                };

                this.seasonProgress = Math.round(((month - 4) / 6) * 100);
            } else {
                // Dry season
                this.currentSeason = {
                    name: 'Dry Season',
                    characteristics: [
                        'Lower humidity (50-70%)',
                        'Clear skies and sunshine',
                        'Temperatures range: 22-35°C',
                        'Cooler from November to January'
                    ],
                    agricultural_advice: 'Focus on irrigation for crops. Good time for harvesting rice and planting vegetables.'
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
/* Smooth transitions for interactive elements */
button,
.hover-scale {
    transition: all 0.2s ease;
}

button:hover {
    transform: translateY(-1px);
}

/* Custom scrollbar for hourly forecast */
::-webkit-scrollbar {
    height: 6px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

.dark ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>