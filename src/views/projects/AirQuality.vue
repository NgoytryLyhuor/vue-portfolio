<template>
    <div class="py-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
        <div class="max-w-5xl mx-auto mt-10">

            <div class="flex flex-col items-center text-center mb-10 mt-10">
                <h1 class="text-3xl font-bold mb-6 text-center mb-0">
                    Phnom Penh Air Quality
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 pt-0"> Real-time air pollution monitoring and alerts
                </p>
                <span class="text-xs text-gray-500 dark:text-gray-400">Updated: {{ formattedTime }}</span>
                <button @click="fetchPollutionData"
                    class="mt-2 p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm hover:shadow-md transition-all">
                    <ArrowPathIcon class="h-5 w-5" :class="{ 'animate-spin': loading }" />
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Air Quality Index </h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">US EPA Standard</p>
                        </div>
                    </div>

                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                        </div>
                    </div>

                    <div v-else-if="pollutionData" class="text-center">
                        <div class="flex justify-center mb-2">
                            <div class="relative">
                                <svg width="180" height="180" viewBox="0 0 180 180" class="transform -rotate-90">
                                    <circle cx="90" cy="90" r="80" stroke="#e5e7eb" stroke-width="10" fill="none"
                                        class="dark:stroke-gray-700" />
                                    <circle cx="90" cy="90" r="80" :stroke="aqiGradientColor" stroke-width="10"
                                        stroke-linecap="round" fill="none" :stroke-dasharray="circumference"
                                        :stroke-dashoffset="circumference - (aqiPercentage * circumference)" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-5xl font-bold" :class="aqiTextColor">{{ pollutionData.aqius
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="px-4 py-2 rounded-full text-sm font-medium inline-block mb-3"
                            :class="aqiLevelClass">
                            {{ getAqiLevel(pollutionData.aqius) }}
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 px-4">
                            {{ getAqiDescription(pollutionData.aqius) }}
                        </p>
                    </div>

                    <div v-else class="text-center py-8 text-red-500">
                        Failed to load air quality data
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
                    <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Primary Pollutant</h2>

                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                        </div>
                    </div>

                    <div v-else-if="pollutionData" class="text-center">
                        <div class="mb-6">
                            <div class="w-[120px] h-[120px] mx-auto mb-4 flex items-center justify-center rounded-full"
                                :class="pollutantBgClass">
                                <span class="text-3xl font-bold" :class="pollutantTextClass">
                                    {{ formatPollutantShort(pollutionData.mainus) }}
                                </span>
                            </div>
                            <h3 class="text-xl font-semibold mb-1">{{ formatPollutantName(pollutionData.mainus) }}
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Main contributor to current AQI</p>
                        </div>

                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Health Advice</h4>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                                {{ getHealthAdvice(pollutionData.mainus, pollutionData.aqius) }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
                    <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Weather Conditions</h2>

                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                        </div>
                    </div>

                    <div v-else-if="weatherData" class="space-y-4">
                        <div class="flex items-center">
                            <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 dark:text-blue-300"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                                <p class="font-semibold">{{ weatherData.hu }}%</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 text-yellow-500 dark:text-yellow-300" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                                <p class="font-semibold">{{ weatherData.tp }}°C</p>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <div class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 text-purple-500 dark:text-purple-300" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                                <p class="font-semibold">{{ weatherData.ws }} m/s</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
                                <p class="font-semibold">{{ weatherData.pr }} hPa</p>
                            </div>
                        </div>

                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mt-4">
                            <div class="flex items-center">
                                <div class="mr-3 text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                    Wind direction: {{ getWindDirection(weatherData.wd) }} ({{ weatherData.wd }}°)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Updated Notification Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden" style="display: none;">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Air Quality Alerts</h2>

                    <div class="space-y-5">
                        <!-- Telegram ID Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Telegram ID or Username
                            </label>
                            <input v-model="notificationSettings.telegram_id" type="text"
                                placeholder="e.g. 123456789 or @username"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Enter your numeric Telegram ID (from @RawDataBot) or @username
                            </p>
                        </div>

                        <!-- Alert Threshold -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Alert Threshold
                            </label>
                            <select v-model="notificationSettings.alert_threshold"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                <option value="50">Good (AQI 50+)</option>
                                <option value="100">Moderate (AQI 100+)</option>
                                <option value="150">Unhealthy for Sensitive Groups (AQI 150+)</option>
                                <option value="200">Unhealthy (AQI 200+)</option>
                                <option value="300">Very Unhealthy (AQI 300+)</option>
                                <option value="400">Hazardous (AQI 400+)</option>
                            </select>
                        </div>

                        <!-- Save Button -->
                        <div class="pt-2">
                            <button @click="saveNotificationSettings" :disabled="savingSettings"
                                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="!savingSettings">Save Settings</span>
                                <span v-else class="flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Saving...
                                </span>
                            </button>
                        </div>

                        <!-- Status Messages -->
                        <div v-if="settingsSaved" class="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-green-500 dark:text-green-400"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p class="ml-2 text-sm text-green-700 dark:text-green-300">
                                    Settings saved successfully!
                                </p>
                            </div>
                        </div>

                        <div v-if="settingsError" class="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p class="ml-2 text-sm text-red-700 dark:text-red-300">
                                    {{ settingsError }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- coming soon -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2" align="center">Air Quality Telegram Auto Alerts</h2>
                    <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2" align="center">Coming Soon</h2>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Air Quality Monitor - Phnom Penh AQI dashboard
import {
    ArrowPathIcon
} from '@heroicons/vue/24/outline';
import axios from 'axios';
export default {
    name: 'AirQualityDashboard',
    components: {
        ArrowPathIcon
    },
    data() {
        return {
            loading: true,
            pollutionData: null,
            weatherData: null,
            lastUpdated: null,
            telegramId: '',
            alertThreshold: '100',
            alertsEnabled: false,
            savingSettings: false,
            settingsSaved: false,
            settingsError: null,
            apiEndpoint: 'https://api.airvisual.com/v2/city?city=Phnom%20Penh&state=Phnom%20Penh&country=Cambodia&key=fd0705c4-9945-44b6-95a0-c4cc8052cea9',
            circumference: 2 * Math.PI * 80,
            notificationSettings: {
                telegram_id: '',
                alert_threshold: '100',
                alerts_enabled: false
            },
        }
    },
    computed: {
        formattedTime() {
            return this.lastUpdated ? new Date(this.lastUpdated).toLocaleTimeString() : '--:--'
        },
        aqiPercentage() {
            if (!this.pollutionData) return 0
            // Scale AQI to 0-1 range (assuming max AQI of 500)
            return Math.min(this.pollutionData.aqius / 500, 1)
        },
        aqiGradientColor() {
            if (!this.pollutionData) return '#3b82f6' // Default blue
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return '#10B981' // Green
            if (aqi <= 100) return '#F59E0B' // Yellow
            if (aqi <= 150) return '#F97316' // Orange
            if (aqi <= 200) return '#EF4444' // Red
            if (aqi <= 300) return '#8B5CF6' // Purple
            return '#7F1D1D' // Maroon
        },
        aqiTextColor() {
            if (!this.pollutionData) return 'text-blue-500'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-500'
            if (aqi <= 100) return 'text-yellow-500'
            if (aqi <= 150) return 'text-orange-500'
            if (aqi <= 200) return 'text-red-500'
            if (aqi <= 300) return 'text-purple-500'
            return 'text-red-800 dark:text-red-600'
        },
        aqiLevelClass() {
            if (!this.pollutionData) return 'bg-blue-100 text-blue-800'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-green-100 text-green-800'
            if (aqi <= 100) return 'bg-yellow-100 text-yellow-800'
            if (aqi <= 150) return 'bg-orange-100 text-orange-800'
            if (aqi <= 200) return 'bg-red-100 text-red-800'
            if (aqi <= 300) return 'bg-purple-100 text-purple-800'
            return 'bg-red-800 text-white'
        },
        pollutantBgClass() {
            if (!this.pollutionData) return 'bg-gray-100'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-green-50'
            if (aqi <= 100) return 'bg-yellow-50'
            if (aqi <= 150) return 'bg-orange-50'
            if (aqi <= 200) return 'bg-red-50'
            if (aqi <= 300) return 'bg-purple-50'
            return 'bg-red-100'
        },
        pollutantTextClass() {
            if (!this.pollutionData) return 'text-gray-500'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-500'
            if (aqi <= 100) return 'text-yellow-500'
            if (aqi <= 150) return 'text-orange-500'
            if (aqi <= 200) return 'text-red-500'
            if (aqi <= 300) return 'text-purple-500'
            return 'text-red-600'
        }
    },
    created() {
        this.fetchPollutionData()
        this.loadSettings()
    },
    methods: {
        async fetchPollutionData() {
            this.loading = true
            try {
                const response = await fetch(this.apiEndpoint)
                if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

                const data = await response.json()
                if (data.status !== 'success') throw new Error('API returned unsuccessful status')

                this.pollutionData = data.data.current.pollution
                this.weatherData = data.data.current.weather
                this.lastUpdated = new Date(this.pollutionData.ts).toISOString()

                // Check if we should send alert
                if (this.alertsEnabled && this.telegramChatId &&
                    this.pollutionData.aqius >= parseInt(this.alertThreshold)) {
                    this.sendAlertNotification()
                }
            } catch (error) {
                console.error('Error fetching air quality data:', error)
                this.settingsError = 'Failed to fetch latest air quality data'
                setTimeout(() => this.settingsError = null, 5000)
            } finally {
                this.loading = false
            }
        },
        async sendAlertNotification() {
            if (!this.telegramId) return;

            try {
                const payload = {
                    recipient: this.telegramId, // assuming your backend expects `recipient`
                    aqi: this.pollutionData.aqius,
                    level: this.getAqiLevel(this.pollutionData.aqius),
                    threshold: this.alertThreshold,
                    timestamp: this.lastUpdated
                };

                const response = await axios.post('/api/notifications', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    console.log('Alert notification sent successfully');
                } else {
                    throw new Error('Notification failed to send');
                }

            } catch (error) {
                console.error('Error sending Telegram alert:', error);
                this.settingsError = 'Failed to send alert notification';
                setTimeout(() => this.settingsError = null, 5000);
            }
        },
        async saveNotificationSettings() {
            try {
                const response = await axios.post('/api/notifications/send-alert', {
                    telegram_id: this.notificationSettings.telegram_id,
                    aqi: this.pollutionData.aqius,
                    level: this.getAqiLevel(this.pollutionData.aqius),
                    threshold: this.notificationSettings.alert_threshold
                }, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.data.success) {
                    this.showSuccess('Test notification sent!');
                }
            } catch (error) {
                this.showError('Failed to send test notification');
            }
        },
        // Example API call to load settings
        async loadSettings() {
            try {
                const response = await axios.get('/api/notifications', {
                    params: {
                        telegram_id: this.notificationSettings.telegram_id
                    },
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.data.data) {
                    this.notificationSettings = response.data.data;
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        },

        // Helper methods
        showSuccess(message) {
            // Your success notification implementation
            console.log('Success:', message);
        },

        showError(message) {
            // Your error notification implementation
            console.error('Error:', message);
        },
        getAqiLevel(aqi) {
            if (aqi <= 50) return 'Good'
            if (aqi <= 100) return 'Moderate'
            if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
            if (aqi <= 200) return 'Unhealthy'
            if (aqi <= 300) return 'Very Unhealthy'
            return 'Hazardous'
        },
        getAqiDescription(aqi) {
            if (aqi <= 50) return 'Air quality is satisfactory with little risk to health.'
            if (aqi <= 100) return 'Acceptable quality, but some pollutants may affect sensitive individuals.'
            if (aqi <= 150) return 'Sensitive groups may experience health effects.'
            if (aqi <= 200) return 'Everyone may begin to experience health effects.'
            if (aqi <= 300) return 'Health alert: everyone may experience more serious effects.'
            return 'Emergency conditions with serious health effects for everyone.'
        },
        formatPollutantName(key) {
            const names = {
                p1: 'Particulate Matter (PM10)',
                p2: 'Fine Particulate Matter (PM2.5)',
                o3: 'Ozone (O₃)',
                n2: 'Nitrogen Dioxide (NO₂)',
                s2: 'Sulfur Dioxide (SO₂)',
                co: 'Carbon Monoxide (CO)'
            }
            return names[key] || key
        },
        formatPollutantShort(key) {
            const names = {
                p1: 'PM10',
                p2: 'PM2.5',
                o3: 'O₃',
                n2: 'NO₂',
                s2: 'SO₂',
                co: 'CO'
            }
            return names[key] || key
        },
        getHealthAdvice(pollutant, aqi) {
            if (aqi <= 50) return 'No health impacts expected. Enjoy outdoor activities.'

            let advice = ''
            if (pollutant === 'p2' || pollutant === 'p1') {
                advice = 'Consider reducing prolonged or heavy exertion outdoors. '
                if (aqi > 150) advice += 'Sensitive groups should avoid outdoor activities. '
                if (aqi > 200) advice += 'Everyone should reduce outdoor activities.'
            } else if (pollutant === 'o3') {
                advice = 'Limit prolonged outdoor exertion. '
                if (aqi > 150) advice += 'Especially important for children and people with lung disease.'
            } else if (pollutant === 'n2' || pollutant === 's2') {
                advice = 'People with respiratory conditions should take care. '
                if (aqi > 150) advice += 'Consider reducing outdoor activities.'
            } else if (pollutant === 'co') {
                advice = 'Avoid areas with heavy traffic. '
                if (aqi > 150) advice += 'People with heart disease may experience health effects.'
            } else {
                advice = 'Consider reducing outdoor activities if you experience symptoms.'
            }

            return advice || 'No specific health advice available for this pollutant level.'
        },
        getWindDirection(degrees) {
            if (degrees >= 337.5 || degrees < 22.5) return 'North'
            if (degrees >= 22.5 && degrees < 67.5) return 'Northeast'
            if (degrees >= 67.5 && degrees < 112.5) return 'East'
            if (degrees >= 112.5 && degrees < 157.5) return 'Southeast'
            if (degrees >= 157.5 && degrees < 202.5) return 'South'
            if (degrees >= 202.5 && degrees < 247.5) return 'Southwest'
            if (degrees >= 247.5 && degrees < 292.5) return 'West'
            return 'Northwest'
        }
    }
}
</script>

<style>
/* Smooth transitions for dark mode */
html {
    scroll-behavior: smooth;
    transition: background-color 0.3s ease;
}
</style>