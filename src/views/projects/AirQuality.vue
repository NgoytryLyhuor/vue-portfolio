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

            <!-- Telegram Notification Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Telegram Alerts</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when air quality is dangerous</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="telegramSettings.enabled" class="sr-only peer" @change="saveSettings">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    <div v-if="telegramSettings.enabled" class="space-y-4 mt-6">
                        <!-- Setup Instructions -->
                        <div class="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h3 class="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                How to Setup
                            </h3>
                            <ol class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                                <li>Open Telegram and search for <strong>@BotFather</strong></li>
                                <li>Send <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">/newbot</code> and follow instructions to create a bot</li>
                                <li>Copy the Bot Token and paste below</li>
                                <li>Search for <strong>@userinfobot</strong> and send any message to get your Chat ID</li>
                                <li>Enter your Chat ID below</li>
                            </ol>
                        </div>

                        <!-- Bot Token Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Bot Token
                            </label>
                            <input v-model="telegramSettings.botToken" type="password"
                                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                                @change="saveSettings">
                        </div>

                        <!-- Chat ID Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your Chat ID
                            </label>
                            <input v-model="telegramSettings.chatId" type="text"
                                placeholder="e.g. 123456789"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                                @change="saveSettings">
                        </div>

                        <!-- Alert Threshold -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Alert When AQI Reaches
                            </label>
                            <select v-model="telegramSettings.threshold"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                @change="saveSettings">
                                <option value="50">🟢 Good (AQI 50+)</option>
                                <option value="100">🟡 Moderate (AQI 100+)</option>
                                <option value="150">🟠 Unhealthy for Sensitive Groups (AQI 150+)</option>
                                <option value="200">🔴 Unhealthy (AQI 200+)</option>
                                <option value="300">🟣 Very Unhealthy (AQI 300+)</option>
                            </select>
                        </div>

                        <!-- Auto Check Interval -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Auto-Check Interval
                            </label>
                            <select v-model="telegramSettings.checkInterval"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                @change="updateAutoCheck">
                                <option value="0">🔴 Disabled (Manual only)</option>
                                <option value="5">⚡ Every 5 minutes</option>
                                <option value="10">🕐 Every 10 minutes</option>
                                <option value="30">🕑 Every 30 minutes</option>
                                <option value="60">🕐 Every 1 hour</option>
                            </select>
                        </div>

                        <!-- Auto-Check Status -->
                        <div v-if="telegramSettings.checkInterval > 0" class="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="relative">
                                        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <div class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                    <span class="text-sm font-medium text-green-700 dark:text-green-300">Auto-Check Active</span>
                                </div>
                                <span class="text-xs text-green-600 dark:text-green-400">
                                    Next check: {{ nextCheckTime }}
                                </span>
                            </div>
                            <p class="text-xs text-green-600 dark:text-green-400 mt-2">
                                🔔 Will automatically send alert if AQI ≥ {{ telegramSettings.threshold }}
                            </p>
                        </div>

                        <!-- Current Status -->
                        <div class="p-4 rounded-xl" :class="currentAqiStatus.bgClass">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium" :class="currentAqiStatus.textClass">Current AQI: {{ pollutionData?.aqius || '--' }}</p>
                                    <p class="text-xs" :class="currentAqiStatus.subTextClass">
                                        {{ pollutionData ? (pollutionData.aqius >= telegramSettings.threshold ? '⚠️ Above threshold - Alert would be sent' : '✅ Below threshold - No alert needed') : 'Loading...' }}
                                    </p>
                                </div>
                                <span class="text-2xl">{{ currentAqiStatus.emoji }}</span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3">
                            <button @click="sendTestAlert" :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                class="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                <span v-if="!sendingAlert" class="flex items-center gap-2">
                                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                    </svg>
                                    Send Test Alert
                                </span>
                                <span v-else class="flex items-center gap-2">
                                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            </button>
                            
                            <button @click="checkAndAlert" :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                class="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                <span class="flex items-center gap-2">
                                    <ArrowPathIcon class="h-5 w-5" />
                                    Check & Alert Now
                                </span>
                            </button>
                        </div>

                        <!-- Success/Error Messages -->
                        <div v-if="alertStatus.show" class="p-3 rounded-lg" :class="alertStatus.success ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'">
                            <div class="flex items-center gap-2">
                                <svg v-if="alertStatus.success" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <svg v-else class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                                <p class="text-sm" :class="alertStatus.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
                                    {{ alertStatus.message }}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Disabled State -->
                    <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
                        <svg class="h-12 w-12 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                        </svg>
                        <p class="text-sm">Enable alerts to receive notifications on Telegram</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Air Quality - Real-time AQI Monitor
import {
    ArrowPathIcon
} from '@heroicons/vue/24/outline';
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
            apiEndpoint: 'https://api.airvisual.com/v2/city?city=Phnom%20Penh&state=Phnom%20Penh&country=Cambodia&key=fd0705c4-9945-44b6-95a0-c4cc8052cea9',
            circumference: 2 * Math.PI * 80,
            // Telegram Settings
            telegramSettings: {
                enabled: false,
                botToken: '',
                chatId: '',
                threshold: '150',
                checkInterval: '10' // minutes (0 = disabled)
            },
            sendingAlert: false,
            alertStatus: {
                show: false,
                success: false,
                message: ''
            },
            autoCheckTimer: null,
            nextCheckTimestamp: null
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
        },
        currentAqiStatus() {
            if (!this.pollutionData) {
                return {
                    emoji: '⏳',
                    bgClass: 'bg-gray-100 dark:bg-gray-700',
                    textClass: 'text-gray-700 dark:text-gray-300',
                    subTextClass: 'text-gray-500 dark:text-gray-400'
                }
            }
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return { emoji: '😊', bgClass: 'bg-green-50 dark:bg-green-900/30', textClass: 'text-green-700 dark:text-green-300', subTextClass: 'text-green-600 dark:text-green-400' }
            if (aqi <= 100) return { emoji: '🙂', bgClass: 'bg-yellow-50 dark:bg-yellow-900/30', textClass: 'text-yellow-700 dark:text-yellow-300', subTextClass: 'text-yellow-600 dark:text-yellow-400' }
            if (aqi <= 150) return { emoji: '😐', bgClass: 'bg-orange-50 dark:bg-orange-900/30', textClass: 'text-orange-700 dark:text-orange-300', subTextClass: 'text-orange-600 dark:text-orange-400' }
            if (aqi <= 200) return { emoji: '😷', bgClass: 'bg-red-50 dark:bg-red-900/30', textClass: 'text-red-700 dark:text-red-300', subTextClass: 'text-red-600 dark:text-red-400' }
            if (aqi <= 300) return { emoji: '🤢', bgClass: 'bg-purple-50 dark:bg-purple-900/30', textClass: 'text-purple-700 dark:text-purple-300', subTextClass: 'text-purple-600 dark:text-purple-400' }
            return { emoji: '☠️', bgClass: 'bg-red-100 dark:bg-red-900/50', textClass: 'text-red-800 dark:text-red-200', subTextClass: 'text-red-700 dark:text-red-300' }
        },
        nextCheckTime() {
            if (!this.nextCheckTimestamp) return '--:--'
            return new Date(this.nextCheckTimestamp).toLocaleTimeString()
        }
    },
    created() {
        this.loadTelegramSettings()
        this.fetchPollutionData()
        this.startAutoCheck()
    },
    beforeUnmount() {
        this.stopAutoCheck()
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

                // Auto-check and send alert if enabled and above threshold
                if (this.telegramSettings.enabled && 
                    this.telegramSettings.botToken && 
                    this.telegramSettings.chatId &&
                    this.pollutionData.aqius >= parseInt(this.telegramSettings.threshold)) {
                    this.autoSendAlert()
                }
            } catch (error) {
                console.error('Error fetching air quality data:', error)
            } finally {
                this.loading = false
            }
        },

        // Load settings from localStorage
        loadTelegramSettings() {
            const saved = localStorage.getItem('airQualityTelegramSettings')
            if (saved) {
                try {
                    this.telegramSettings = JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to load telegram settings:', e)
                }
            }
        },

        // Save settings to localStorage
        saveSettings() {
            localStorage.setItem('airQualityTelegramSettings', JSON.stringify(this.telegramSettings))
        },

        // Start auto-check timer
        startAutoCheck() {
            this.stopAutoCheck() // Clear any existing timer
            
            const interval = parseInt(this.telegramSettings.checkInterval)
            if (interval <= 0 || !this.telegramSettings.enabled) return
            
            const intervalMs = interval * 60 * 1000 // Convert minutes to ms
            this.nextCheckTimestamp = Date.now() + intervalMs
            
            this.autoCheckTimer = setInterval(() => {
                this.performAutoCheck()
                this.nextCheckTimestamp = Date.now() + intervalMs
            }, intervalMs)
            
            console.log(`Auto-check started: every ${interval} minutes`)
        },

        // Stop auto-check timer
        stopAutoCheck() {
            if (this.autoCheckTimer) {
                clearInterval(this.autoCheckTimer)
                this.autoCheckTimer = null
                this.nextCheckTimestamp = null
                console.log('Auto-check stopped')
            }
        },

        // Update auto-check when settings change
        updateAutoCheck() {
            this.saveSettings()
            if (this.telegramSettings.enabled && parseInt(this.telegramSettings.checkInterval) > 0) {
                this.startAutoCheck()
                this.showAlertStatus(true, `✅ Auto-check enabled: every ${this.telegramSettings.checkInterval} minutes`)
            } else {
                this.stopAutoCheck()
                this.showAlertStatus(true, '🔴 Auto-check disabled')
            }
        },

        // Perform automatic check and alert
        async performAutoCheck() {
            console.log('Performing auto-check...')
            
            // First, fetch fresh data
            try {
                const response = await fetch(this.apiEndpoint)
                if (!response.ok) throw new Error('API request failed')
                
                const data = await response.json()
                if (data.status !== 'success') throw new Error('API returned unsuccessful')
                
                this.pollutionData = data.data.current.pollution
                this.weatherData = data.data.current.weather
                this.lastUpdated = new Date(this.pollutionData.ts).toISOString()
                
                // Check if AQI exceeds threshold
                const aqi = this.pollutionData.aqius
                const threshold = parseInt(this.telegramSettings.threshold)
                
                console.log(`Auto-check: AQI=${aqi}, Threshold=${threshold}`)
                
                if (aqi >= threshold) {
                    // Check cooldown (1 hour between alerts)
                    const lastAlertTime = localStorage.getItem('lastAirQualityAlert')
                    const oneHour = 60 * 60 * 1000
                    
                    if (!lastAlertTime || (Date.now() - parseInt(lastAlertTime)) >= oneHour) {
                        console.log('Sending automatic alert...')
                        await this.sendDangerAlert(true)
                        localStorage.setItem('lastAirQualityAlert', Date.now().toString())
                    } else {
                        const minutesLeft = Math.ceil((oneHour - (Date.now() - parseInt(lastAlertTime))) / 60000)
                        console.log(`Alert cooldown: ${minutesLeft} minutes remaining`)
                    }
                }
            } catch (error) {
                console.error('Auto-check error:', error)
            }
        },

        // Send test alert to verify setup
        async sendTestAlert() {
            if (!this.telegramSettings.botToken || !this.telegramSettings.chatId) {
                this.showAlertStatus(false, 'Please enter Bot Token and Chat ID first')
                return
            }

            this.sendingAlert = true
            
            const message = `🧪 *Test Alert - Air Quality Monitor*

✅ Your Telegram alerts are working!

📊 *Current Status:*
• AQI: ${this.pollutionData?.aqius || 'N/A'}
• Level: ${this.pollutionData ? this.getAqiLevel(this.pollutionData.aqius) : 'N/A'}
• Location: Phnom Penh, Cambodia

⚙️ *Your Settings:*
• Alert Threshold: AQI ${this.telegramSettings.threshold}+
• Status: ${this.telegramSettings.enabled ? 'Enabled' : 'Disabled'}

_You will receive alerts when AQI exceeds your threshold._`

            await this.sendTelegramMessage(message)
        },

        // Check current AQI and send alert if above threshold
        async checkAndAlert() {
            if (!this.pollutionData) {
                this.showAlertStatus(false, 'No air quality data available')
                return
            }

            if (this.pollutionData.aqius >= parseInt(this.telegramSettings.threshold)) {
                await this.sendDangerAlert()
            } else {
                this.showAlertStatus(true, `AQI is ${this.pollutionData.aqius} - below your threshold of ${this.telegramSettings.threshold}. No alert needed.`)
            }
        },

        // Auto-send alert (called when data refreshes)
        async autoSendAlert() {
            // Check if we already sent an alert recently (within 1 hour)
            const lastAlertTime = localStorage.getItem('lastAirQualityAlert')
            const oneHour = 60 * 60 * 1000
            
            if (lastAlertTime && (Date.now() - parseInt(lastAlertTime)) < oneHour) {
                console.log('Alert already sent within the last hour, skipping...')
                return
            }

            await this.sendDangerAlert(true)
            localStorage.setItem('lastAirQualityAlert', Date.now().toString())
        },

        // Send danger alert
        async sendDangerAlert(isAuto = false) {
            this.sendingAlert = true

            const aqi = this.pollutionData.aqius
            const level = this.getAqiLevel(aqi)
            const emoji = aqi <= 100 ? '🟡' : aqi <= 150 ? '🟠' : aqi <= 200 ? '🔴' : aqi <= 300 ? '🟣' : '☠️'

            const message = `${emoji} *AIR QUALITY ALERT* ${emoji}

⚠️ *${level.toUpperCase()}*

📊 *Current Readings:*
• AQI: *${aqi}* (Threshold: ${this.telegramSettings.threshold})
• Main Pollutant: ${this.formatPollutantName(this.pollutionData.mainus)}
• Location: Phnom Penh, Cambodia

🌡️ *Weather:*
• Temperature: ${this.weatherData?.tp || 'N/A'}°C
• Humidity: ${this.weatherData?.hu || 'N/A'}%
• Wind: ${this.weatherData?.ws || 'N/A'} m/s

💡 *Health Advice:*
${this.getHealthAdvice(this.pollutionData.mainus, aqi)}

⏰ Updated: ${new Date().toLocaleString()}
${isAuto ? '_This is an automatic alert._' : ''}`

            await this.sendTelegramMessage(message)
        },

        // Send message via Telegram Bot API
        async sendTelegramMessage(message) {
            try {
                const url = `https://api.telegram.org/bot${this.telegramSettings.botToken}/sendMessage`
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: this.telegramSettings.chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                })

                const data = await response.json()

                if (data.ok) {
                    this.showAlertStatus(true, '✅ Alert sent to Telegram successfully!')
                } else {
                    throw new Error(data.description || 'Failed to send message')
                }
            } catch (error) {
                console.error('Telegram API error:', error)
                this.showAlertStatus(false, `❌ Failed: ${error.message}`)
            } finally {
                this.sendingAlert = false
            }
        },

        showAlertStatus(success, message) {
            this.alertStatus = { show: true, success, message }
            setTimeout(() => {
                this.alertStatus.show = false
            }, 5000)
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