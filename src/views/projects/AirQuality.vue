<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
        <div class="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    Phnom Penh Air Quality
                </h1>
                <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2">
                    Real-time air pollution monitoring and alerts
                </p>
                <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last updated: {{ formattedTime }}</span>
                    <button @click="fetchPollutionData"
                        class="ml-2 p-1.5 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all"
                        aria-label="Refresh data"
                        title="Refresh air quality data">
                        <ArrowPathIcon class="h-4 w-4" :class="{ 'animate-spin': loading }" />
                    </button>
                </div>
            </div>

            <!-- Loading State - Improved -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="relative">
                    <div class="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div class="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                </div>
                <p class="mt-6 text-gray-600 dark:text-gray-400 font-medium text-base">Loading air quality data...</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-500">Please wait while we fetch the latest readings</p>
            </div>

            <!-- Main Content -->
            <div v-else class="space-y-6">
                <!-- Main AQI Card - Large and Prominent -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden">
                    <!-- Decorative Background -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl opacity-50"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/20 dark:to-green-900/20 rounded-full blur-2xl opacity-50"></div>
                    
                    <div class="relative z-10">
                        <div class="text-center mb-6">
                            <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Air Quality Index</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">US EPA Standard</p>
                        </div>

                        <div v-if="pollutionData" class="flex flex-col items-center">
                            <!-- Circular Progress -->
                            <div class="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mb-6">
                                <svg viewBox="0 0 180 180" class="transform -rotate-90 w-full h-full">
                                    <circle cx="90" cy="90" r="80" stroke="#e5e7eb" stroke-width="12" fill="none" class="dark:stroke-gray-700" />
                                    <circle cx="90" cy="90" r="80" :stroke="aqiGradientColor" stroke-width="12" stroke-linecap="round" fill="none" 
                                        :stroke-dasharray="circumference" :stroke-dashoffset="circumference - (aqiPercentage * circumference)" 
                                        class="transition-all duration-1000 ease-out" />
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-5xl sm:text-6xl lg:text-7xl font-bold" :class="aqiTextColor">{{ pollutionData.aqius }}</span>
                                    <span class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">AQI</span>
                                </div>
                            </div>

                            <!-- AQI Level Badge -->
                            <div class="px-6 py-3 rounded-full text-base sm:text-lg font-semibold inline-block mb-4 shadow-lg" :class="aqiLevelClass">
                                {{ getAqiLevel(pollutionData.aqius) }}
                            </div>
                            
                            <!-- Description -->
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4 text-center max-w-2xl">
                                {{ getAqiDescription(pollutionData.aqius) }}
                            </p>
                        </div>

                        <div v-else class="text-center py-12 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="font-semibold">Failed to load air quality data</p>
                        </div>
                    </div>
                </div>

                <!-- Secondary Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Primary Pollutant Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Primary Pollutant
                        </h2>

                        <div v-if="pollutionData" class="text-center">
                            <div class="mb-6">
                                <div class="w-32 h-32 mx-auto mb-4 flex items-center justify-center rounded-full shadow-lg" :class="pollutantBgClass">
                                    <span class="text-4xl font-bold" :class="pollutantTextClass">
                                        {{ formatPollutantShort(pollutionData.mainus) }}
                                    </span>
                                </div>
                                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    {{ formatPollutantName(pollutionData.mainus) }}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Main contributor to current AQI</p>
                            </div>

                            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Health Advice
                                </h4>
                                <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {{ getHealthAdvice(pollutionData.mainus, pollutionData.aqius) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Weather Conditions Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                            Weather Conditions
                        </h2>

                        <div v-if="weatherData" class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                                <div class="flex items-center gap-3">
                                    <div class="p-3 rounded-xl bg-blue-100 dark:bg-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ weatherData.hu }}%</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                                <div class="flex items-center gap-3">
                                    <div class="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ weatherData.tp }}°C</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                                <div class="flex items-center gap-3">
                                    <div class="p-3 rounded-xl bg-purple-100 dark:bg-purple-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ weatherData.ws }} m/s</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                <div class="flex items-center gap-3">
                                    <div class="p-3 rounded-xl bg-green-100 dark:bg-green-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
                                        <p class="text-xl font-bold text-gray-900 dark:text-white">{{ weatherData.pr }} hPa</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mt-4">
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                    </svg>
                                    <span>Wind direction: {{ getWindDirection(weatherData.wd) }} ({{ weatherData.wd }}°)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Telegram Notification Panel -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                                <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Telegram Alerts</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when air quality is dangerous</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="telegramSettings.enabled" class="sr-only peer" @change="saveSettings">
                            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <!-- Telegram Settings Content -->
                    <div v-if="telegramSettings.enabled" class="space-y-4">
                        <!-- Setup Instructions -->
                        <div class="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                How to Setup
                            </h3>
                            <ol class="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside leading-relaxed">
                                <li>Open Telegram and search for <strong>@BotFather</strong></li>
                                <li>Send <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">/newbot</code> and follow instructions</li>
                                <li>Copy the Bot Token and paste below</li>
                                <li>Search for <strong>@userinfobot</strong> to get your Chat ID</li>
                            </ol>
                        </div>

                        <!-- Input Fields -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bot Token</label>
                                <input v-model="telegramSettings.botToken" type="password" placeholder="123456789:ABCdef..."
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                                    @change="saveSettings">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chat ID</label>
                                <input v-model="telegramSettings.chatId" type="text" placeholder="e.g. 123456789"
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                                    @change="saveSettings">
                            </div>
                        </div>

                        <!-- Alert Settings -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alert Threshold</label>
                                <select v-model="telegramSettings.threshold" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm" @change="saveSettings">
                                    <option value="50">🟢 Good (AQI 50+)</option>
                                    <option value="100">🟡 Moderate (AQI 100+)</option>
                                    <option value="150">🟠 Unhealthy for Sensitive (AQI 150+)</option>
                                    <option value="200">🔴 Unhealthy (AQI 200+)</option>
                                    <option value="300">🟣 Very Unhealthy (AQI 300+)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auto-Check Interval</label>
                                <select v-model="telegramSettings.checkInterval" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm" @change="updateAutoCheck">
                                    <option value="0">🔴 Disabled</option>
                                    <option value="5">⚡ Every 5 minutes</option>
                                    <option value="10">🕐 Every 10 minutes</option>
                                    <option value="30">🕑 Every 30 minutes</option>
                                    <option value="60">🕐 Every 1 hour</option>
                                </select>
                            </div>
                        </div>

                        <!-- Status & Actions -->
                        <div v-if="telegramSettings.checkInterval > 0" class="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span class="text-sm font-medium text-green-700 dark:text-green-300">Auto-Check Active</span>
                                </div>
                                <span class="text-sm text-green-600 dark:text-green-400">Next check: {{ nextCheckTime }}</span>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <button @click="sendTestAlert" :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="!sendingAlert">Send Test Alert</span>
                                <span v-else class="flex items-center justify-center gap-2">
                                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            </button>
                            <button @click="checkAndAlert" :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                class="flex-1 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                Check Now
                            </button>
                        </div>

                        <!-- Alert Status -->
                        <div v-if="alertStatus.show" class="p-4 rounded-xl" :class="alertStatus.success ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'">
                            <p class="text-sm" :class="alertStatus.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
                                {{ alertStatus.message }}
                            </p>
                        </div>
                    </div>

                    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
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
import logger from '@/utils/logger'
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

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
            telegramSettings: {
                enabled: false,
                botToken: '',
                chatId: '',
                threshold: '150',
                checkInterval: '10'
            },
            sendingAlert: false,
            alertStatus: {
                show: false,
                success: false,
                message: ''
            },
            autoCheckTimer: null,
            nextCheckTimestamp: null,
            countdownTimer: null,
            currentTime: Date.now()
        }
    },
    computed: {
        formattedTime() {
            return this.lastUpdated ? new Date(this.lastUpdated).toLocaleTimeString() : '--:--'
        },
        aqiPercentage() {
            if (!this.pollutionData) return 0
            return Math.min(this.pollutionData.aqius / 500, 1)
        },
        aqiGradientColor() {
            if (!this.pollutionData) return '#3b82f6'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return '#10B981'
            if (aqi <= 100) return '#F59E0B'
            if (aqi <= 150) return '#F97316'
            if (aqi <= 200) return '#EF4444'
            if (aqi <= 300) return '#8B5CF6'
            return '#7F1D1D'
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
            if (!this.pollutionData) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            if (aqi <= 100) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            if (aqi <= 150) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
            if (aqi <= 200) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            if (aqi <= 300) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            return 'bg-red-800 text-white dark:bg-red-900 dark:text-red-100'
        },
        pollutantBgClass() {
            if (!this.pollutionData) return 'bg-gray-100 dark:bg-gray-700'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-green-50 dark:bg-green-900/30'
            if (aqi <= 100) return 'bg-yellow-50 dark:bg-yellow-900/30'
            if (aqi <= 150) return 'bg-orange-50 dark:bg-orange-900/30'
            if (aqi <= 200) return 'bg-red-50 dark:bg-red-900/30'
            if (aqi <= 300) return 'bg-purple-50 dark:bg-purple-900/30'
            return 'bg-red-100 dark:bg-red-900/50'
        },
        pollutantTextClass() {
            if (!this.pollutionData) return 'text-gray-500 dark:text-gray-400'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-500 dark:text-green-400'
            if (aqi <= 100) return 'text-yellow-500 dark:text-yellow-400'
            if (aqi <= 150) return 'text-orange-500 dark:text-orange-400'
            if (aqi <= 200) return 'text-red-500 dark:text-red-400'
            if (aqi <= 300) return 'text-purple-500 dark:text-purple-400'
            return 'text-red-600 dark:text-red-400'
        },
        nextCheckTime() {
            if (!this.nextCheckTimestamp) return '--:--'
            const now = this.currentTime
            const diff = this.nextCheckTimestamp - now
            if (diff <= 0) return 'Checking now...'
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)
            if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
            if (minutes > 0) return `${minutes}m ${seconds}s`
            return `${seconds}s`
        }
    },
    created() {
        this.loadTelegramSettings()
        this.fetchPollutionData()
        this.startAutoCheck()
        this.startCountdown()
    },
    beforeUnmount() {
        this.stopAutoCheck()
        this.stopCountdown()
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
                if (this.telegramSettings.enabled && this.telegramSettings.botToken && this.telegramSettings.chatId && this.pollutionData.aqius >= parseInt(this.telegramSettings.threshold)) {
                    this.autoSendAlert()
                }
            } catch (error) {
                logger.error('Error fetching air quality data:', error)
            } finally {
                this.loading = false
            }
        },
        loadTelegramSettings() {
            const saved = localStorage.getItem('airQualityTelegramSettings')
            if (saved) {
                try {
                    this.telegramSettings = JSON.parse(saved)
                } catch (e) {
                    logger.error('Failed to load telegram settings:', e)
                }
            }
        },
        saveSettings() {
            localStorage.setItem('airQualityTelegramSettings', JSON.stringify(this.telegramSettings))
        },
        startAutoCheck() {
            this.stopAutoCheck()
            const interval = parseInt(this.telegramSettings.checkInterval)
            if (interval <= 0 || !this.telegramSettings.enabled) {
                this.nextCheckTimestamp = null
                return
            }
            const intervalMs = interval * 60 * 1000
            this.nextCheckTimestamp = Date.now() + intervalMs
            this.autoCheckTimer = setInterval(() => {
                this.performAutoCheck()
                this.nextCheckTimestamp = Date.now() + intervalMs
            }, intervalMs)
            logger.log(`Auto-check started: every ${interval} minutes`)
        },
        startCountdown() {
            this.stopCountdown()
            this.countdownTimer = setInterval(() => {
                this.currentTime = Date.now()
            }, 1000)
        },
        stopCountdown() {
            if (this.countdownTimer) {
                clearInterval(this.countdownTimer)
                this.countdownTimer = null
            }
        },
        stopAutoCheck() {
            if (this.autoCheckTimer) {
                clearInterval(this.autoCheckTimer)
                this.autoCheckTimer = null
                this.nextCheckTimestamp = null
                logger.log('Auto-check stopped')
            }
        },
        updateAutoCheck() {
            this.saveSettings()
            if (this.telegramSettings.enabled && parseInt(this.telegramSettings.checkInterval) > 0) {
                this.startAutoCheck()
                this.showAlertStatus(true, `✅ Auto-check enabled: every ${this.telegramSettings.checkInterval} minutes`)
            } else {
                this.stopAutoCheck()
                this.nextCheckTimestamp = null
                this.showAlertStatus(true, '🔴 Auto-check disabled')
            }
        },
        async performAutoCheck() {
            logger.log('Performing auto-check...')
            try {
                const response = await fetch(this.apiEndpoint)
                if (!response.ok) throw new Error('API request failed')
                const data = await response.json()
                if (data.status !== 'success') throw new Error('API returned unsuccessful')
                this.pollutionData = data.data.current.pollution
                this.weatherData = data.data.current.weather
                this.lastUpdated = new Date(this.pollutionData.ts).toISOString()
                const aqi = this.pollutionData.aqius
                const threshold = parseInt(this.telegramSettings.threshold)
                logger.log(`Auto-check: AQI=${aqi}, Threshold=${threshold}`)
                if (aqi >= threshold) {
                    const lastAlertTime = localStorage.getItem('lastAirQualityAlert')
                    const oneHour = 60 * 60 * 1000
                    if (!lastAlertTime || (Date.now() - parseInt(lastAlertTime)) >= oneHour) {
                        logger.log('Sending automatic alert...')
                        await this.sendDangerAlert(true)
                        localStorage.setItem('lastAirQualityAlert', Date.now().toString())
                    }
                }
            } catch (error) {
                logger.error('Auto-check error:', error)
            }
        },
        async sendTestAlert() {
            if (!this.telegramSettings.botToken || !this.telegramSettings.chatId) {
                this.showAlertStatus(false, 'Please enter Bot Token and Chat ID first')
                return
            }
            this.sendingAlert = true
            const message = `🧪 *Test Alert - Air Quality Monitor*\n\n✅ Your Telegram alerts are working!\n\n📊 *Current Status:*\n• AQI: ${this.pollutionData?.aqius || 'N/A'}\n• Level: ${this.pollutionData ? this.getAqiLevel(this.pollutionData.aqius) : 'N/A'}\n• Location: Phnom Penh, Cambodia\n\n⚙️ *Your Settings:*\n• Alert Threshold: AQI ${this.telegramSettings.threshold}+\n• Status: ${this.telegramSettings.enabled ? 'Enabled' : 'Disabled'}\n\n_You will receive alerts when AQI exceeds your threshold._`
            await this.sendTelegramMessage(message)
        },
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
        async autoSendAlert() {
            const lastAlertTime = localStorage.getItem('lastAirQualityAlert')
            const oneHour = 60 * 60 * 1000
            if (lastAlertTime && (Date.now() - parseInt(lastAlertTime)) < oneHour) {
                logger.log('Alert already sent within the last hour, skipping...')
                return
            }
            await this.sendDangerAlert(true)
            localStorage.setItem('lastAirQualityAlert', Date.now().toString())
        },
        async sendDangerAlert(isAuto = false) {
            this.sendingAlert = true
            const aqi = this.pollutionData.aqius
            const level = this.getAqiLevel(aqi)
            const emoji = aqi <= 100 ? '🟡' : aqi <= 150 ? '🟠' : aqi <= 200 ? '🔴' : aqi <= 300 ? '🟣' : '☠️'
            const message = `${emoji} *AIR QUALITY ALERT* ${emoji}\n\n⚠️ *${level.toUpperCase()}*\n\n📊 *Current Readings:*\n• AQI: *${aqi}* (Threshold: ${this.telegramSettings.threshold})\n• Main Pollutant: ${this.formatPollutantName(this.pollutionData.mainus)}\n• Location: Phnom Penh, Cambodia\n\n🌡️ *Weather:*\n• Temperature: ${this.weatherData?.tp || 'N/A'}°C\n• Humidity: ${this.weatherData?.hu || 'N/A'}%\n• Wind: ${this.weatherData?.ws || 'N/A'} m/s\n\n💡 *Health Advice:*\n${this.getHealthAdvice(this.pollutionData.mainus, aqi)}\n\n⏰ Updated: ${new Date().toLocaleString()}\n${isAuto ? '_This is an automatic alert._' : ''}`
            await this.sendTelegramMessage(message)
        },
        async sendTelegramMessage(message) {
            try {
                const url = `https://api.telegram.org/bot${this.telegramSettings.botToken}/sendMessage`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                logger.error('Telegram API error:', error)
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
            const names = { p1: 'Particulate Matter (PM10)', p2: 'Fine Particulate Matter (PM2.5)', o3: 'Ozone (O₃)', n2: 'Nitrogen Dioxide (NO₂)', s2: 'Sulfur Dioxide (SO₂)', co: 'Carbon Monoxide (CO)' }
            return names[key] || key
        },
        formatPollutantShort(key) {
            const names = { p1: 'PM10', p2: 'PM2.5', o3: 'O₃', n2: 'NO₂', s2: 'SO₂', co: 'CO' }
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
html {
    scroll-behavior: smooth;
    transition: background-color 0.3s ease;
}
</style>
