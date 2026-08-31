<template>
    <div class="min-h-screen bg-gradient-to-b from-sky-50/30 via-transparent to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
        <div class="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-6 sm:mb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 shadow-sm">
                    <MapPinIcon class="h-3.5 w-3.5 text-sky-500" />
                    <span>{{ cityInfo.city }}, {{ cityInfo.country }}</span>
                    <span v-if="pollutionData" class="flex items-center gap-1.5 pl-2 border-l border-gray-200 dark:border-gray-600">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Live
                    </span>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Air Quality Monitor
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3">
                    Real-time pollution readings and health advisories
                </p>
                <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <ClockIcon class="h-4 w-4" />
                    <span>{{ formattedDateTime }}</span>
                    <button @click="fetchPollutionData"
                        class="ml-1 p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                        aria-label="Refresh data"
                        title="Refresh air quality data">
                        <ArrowPathIcon class="h-4 w-4" :class="{ 'animate-spin': loading }" />
                    </button>
                </div>
            </div>

            <!-- Loading State - Shimmer Skeleton -->
            <div v-if="loading" class="space-y-5 sm:space-y-6 py-4">
                <!-- Skeleton: Dashboard Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
                    <div class="lg:col-span-3 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                            <div class="space-y-2">
                                <div class="h-6 w-32 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-5 w-56 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-3 w-44 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            </div>
                            <div class="flex gap-3">
                                <div class="h-16 w-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-16 w-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row items-center gap-6">
                            <div class="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer flex-shrink-0"></div>
                            <div class="flex-1 w-full space-y-3">
                                <div class="h-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="grid grid-cols-2 gap-2.5">
                                    <div class="h-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                    <div class="h-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="h-5 w-5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-5 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        </div>
                        <div class="h-24 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        <div class="grid grid-cols-2 gap-2.5">
                            <div class="h-16 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-16 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-16 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-16 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        </div>
                    </div>
                </div>
                <!-- Skeleton: AQI Scale Bar -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-5 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        <div class="h-6 w-28 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                    </div>
                    <div class="h-3 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer mb-6"></div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        <div v-for="n in 6" :key="n" class="h-20 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                    </div>
                </div>
                <!-- Skeleton: Pollutant & Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="h-5 w-5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-5 w-36 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-20 h-20 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer flex-shrink-0"></div>
                            <div class="flex-1 space-y-2">
                                <div class="h-5 w-40 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-3 w-56 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-16 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="h-5 w-5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            <div class="h-5 w-36 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                        </div>
                        <div class="space-y-3">
                            <div v-for="n in 4" :key="n" class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <div class="h-3 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                                <div class="h-4 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-lg mx-auto border border-red-200 dark:border-red-900/50">
                <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to Load Air Quality Data</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {{ error }}
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <button @click="fetchPollutionData" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                        <ArrowPathIcon class="h-4 w-4" :class="{ 'animate-spin': loading }" />
                        Try Again
                    </button>
                    <router-link to="/" class="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all">
                        Back to Home
                    </router-link>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else class="space-y-5 sm:space-y-6 animate-fade-in">
                <!-- Dashboard -->
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 animate-fade-in-up" style="animation-delay: 0ms">
                    <!-- AQI Panel -->
                    <div class="lg:col-span-3 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 lg:p-8 border-2 relative overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl" :class="aqiCardClass">
                        <div class="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-30" :class="aqiDecorativeBg"></div>
                        <div class="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl opacity-20" :class="aqiDecorativeBg"></div>

                        <div class="relative z-10">
                            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                <div>
                                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold shadow-md mb-2" :class="aqiLevelClass">
                                        <span>{{ aqiEmoji }}</span>
                                        <span>{{ getAqiLevel(pollutionData.aqius) }}</span>
                                    </div>
                                    <h2 class="text-lg sm:text-xl font-semibold" :class="aqiTitleColor">US EPA Air Quality Index</h2>
                                    <p class="text-xs mt-0.5" :class="aqiSubtitleColor">Primary standard for health advisories</p>
                                </div>
                                <div class="flex gap-3">
                                    <div class="text-center px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border" :class="aqiBorderColor">
                                        <p class="text-[10px] uppercase tracking-wide font-semibold" :class="aqiSubtitleColor">US AQI</p>
                                        <p class="text-2xl font-bold" :class="aqiTextColor">{{ pollutionData.aqius }}</p>
                                    </div>
                                    <div class="text-center px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                                        <p class="text-[10px] uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400">CN AQI</p>
                                        <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">{{ pollutionData.aqicn }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col sm:flex-row items-center gap-6">
                                <div class="relative w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0">
                                    <svg viewBox="0 0 180 180" class="transform -rotate-90 w-full h-full">
                                        <circle cx="90" cy="90" r="80" stroke="rgba(255,255,255,0.25)" stroke-width="12" fill="none" />
                                        <circle cx="90" cy="90" r="80" :stroke="aqiGradientColor" stroke-width="12" stroke-linecap="round" fill="none"
                                            :stroke-dasharray="circumference" :stroke-dashoffset="circumference - (aqiPercentage * circumference)"
                                            class="transition-all duration-1000 ease-out drop-shadow-lg" />
                                    </svg>
                                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                                        <span class="text-4xl sm:text-5xl font-bold drop-shadow-lg" :class="aqiTextColor">{{ pollutionData.aqius }}</span>
                                        <span class="text-xs mt-0.5 drop-shadow" :class="aqiSubtitleColor">AQI</span>
                                    </div>
                                </div>

                                <div v-if="aqiDescription" class="flex-1 w-full space-y-2.5">
                                    <div class="rounded-xl p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border" :class="aqiBorderColor">
                                        <p class="text-sm font-semibold mb-1" :class="aqiTitleColor">{{ aqiDescription.title }}</p>
                                        <p class="text-xs leading-relaxed" :class="aqiSubtitleColor">{{ aqiDescription.description }}</p>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        <div class="rounded-xl p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/50 dark:border-gray-700">
                                            <p class="text-[10px] uppercase tracking-wide font-semibold mb-1 flex items-center gap-1" :class="aqiSubtitleColor">
                                                <ShieldCheckIcon class="h-3.5 w-3.5" /> Advice
                                            </p>
                                            <p class="text-xs leading-relaxed" :class="aqiSubtitleColor">{{ aqiDescription.recommendations }}</p>
                                        </div>
                                        <div class="rounded-xl p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/50 dark:border-gray-700">
                                            <p class="text-[10px] uppercase tracking-wide font-semibold mb-1 flex items-center gap-1" :class="aqiSubtitleColor">
                                                <UserGroupIcon class="h-3.5 w-3.5" /> Sensitive Groups
                                            </p>
                                            <p class="text-xs leading-relaxed" :class="aqiSubtitleColor">{{ aqiDescription.sensitiveGroups }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Weather Panel -->
                    <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-base font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                <CloudIcon class="h-5 w-5 text-sky-500" />
                                Current Weather
                            </h2>
                            <span class="text-xs text-gray-400 dark:text-gray-500">{{ cityInfo.state }}</span>
                        </div>

                        <div v-if="weatherData" class="flex-1 flex flex-col">
                            <div class="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
                                <img v-if="weatherIconUrl" :src="weatherIconUrl" alt="Weather" class="w-16 h-16 drop-shadow-md" />
                                <div>
                                    <p class="text-4xl font-bold text-gray-900 dark:text-white">{{ weatherData.tp }}°<span class="text-xl">C</span></p>
                                    <p v-if="weatherData.heatIndex" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        Feels like {{ weatherData.heatIndex }}°C
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-2.5 flex-1">
                                <div class="rounded-xl p-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50">
                                    <p class="text-[10px] uppercase tracking-wide text-sky-600 dark:text-sky-400 font-semibold mb-1">Humidity</p>
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">{{ weatherData.hu }}%</p>
                                </div>
                                <div class="rounded-xl p-3 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/50">
                                    <p class="text-[10px] uppercase tracking-wide text-violet-600 dark:text-violet-400 font-semibold mb-1">Wind</p>
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">{{ weatherData.ws }} <span class="text-xs font-normal">m/s</span></p>
                                </div>
                                <div class="rounded-xl p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                                    <p class="text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Pressure</p>
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">{{ weatherData.pr }} <span class="text-xs font-normal">hPa</span></p>
                                </div>
                                <div class="rounded-xl p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50">
                                    <p class="text-[10px] uppercase tracking-wide text-amber-600 dark:text-amber-400 font-semibold mb-1">Direction</p>
                                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ getWindDirection(weatherData.wd) }}</p>
                                    <p class="text-[10px] text-gray-400">{{ weatherData.wd }}°</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AQI Scale Bar -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 100ms">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-base font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                            <span class="w-1 h-5 bg-sky-500 rounded-full inline-block"></span>
                            AQI Scale
                        </h2>
                        <span v-if="activeAqiLevel" class="text-xs font-semibold px-2.5 py-1 rounded-full" :class="activeAqiLevel.badgeClass">
                            {{ activeAqiLevel.emoji }} {{ activeAqiLevel.name }}
                        </span>
                    </div>
                    <div class="relative pt-2 pb-8">
                        <div class="h-3 rounded-full overflow-hidden flex">
                            <div class="flex-1 bg-green-500"></div>
                            <div class="flex-1 bg-yellow-400"></div>
                            <div class="flex-1 bg-orange-500"></div>
                            <div class="flex-1 bg-red-500"></div>
                            <div class="flex-1 bg-purple-500"></div>
                            <div class="flex-[0.4] bg-red-900"></div>
                        </div>
                        <div class="absolute top-0 transform -translate-x-1/2 transition-all duration-700"
                            :style="{ left: aqiMarkerPosition + '%' }">
                            <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-800 dark:border-t-white mx-auto"></div>
                            <div class="mt-1 px-2 py-0.5 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold whitespace-nowrap">
                                {{ pollutionData.aqius }}
                            </div>
                        </div>
                        <div class="flex justify-between mt-2 text-[10px] text-gray-400 dark:text-gray-500">
                            <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300</span><span>500+</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        <div v-for="level in aqiLevels" :key="level.range"
                            class="rounded-xl p-2.5 text-center border transition-all duration-300 hover:scale-105"
                            :class="pollutionData && pollutionData.aqius >= level.min && pollutionData.aqius <= level.max
                                ? level.activeClass + ' ring-2 ring-offset-1 dark:ring-offset-gray-800 shadow-lg'
                                : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-60'">
                            <span class="text-lg">{{ level.emoji }}</span>
                            <p class="text-[10px] font-bold mt-0.5" :class="level.textClass">{{ level.name }}</p>
                            <p class="text-[9px] text-gray-400">{{ level.range }}</p>
                        </div>
                    </div>
                </div>

                <!-- Pollutant & Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 animate-fade-in-up" style="animation-delay: 200ms">
                    <!-- Primary Pollutant -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
                        <h2 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                            <span class="w-1 h-5 bg-orange-500 rounded-full inline-block"></span>
                            <BeakerIcon class="h-5 w-5 text-orange-500" />
                            Primary Pollutant
                        </h2>
                        <div v-if="pollutionData" class="flex items-start gap-4">
                            <div class="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-2xl shadow-md" :class="pollutantBgClass">
                                <span class="text-xl font-bold" :class="pollutantTextClass">
                                    {{ formatPollutantShort(pollutionData.mainus) }}
                                </span>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                    {{ formatPollutantName(pollutionData.mainus) }}
                                </h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Main contributor to the current AQI reading</p>
                                <div class="rounded-xl p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50">
                                    <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {{ getHealthAdvice(pollutionData.mainus, pollutionData.aqius) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Data Info -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
                        <h2 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                            <span class="w-1 h-5 bg-amber-500 rounded-full inline-block"></span>
                            <SunIcon class="h-5 w-5 text-amber-500" />
                            About This Data
                        </h2>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span class="text-xs text-gray-500 dark:text-gray-400">Location</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ cityInfo.city }}, {{ cityInfo.country }}</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span class="text-xs text-gray-500 dark:text-gray-400">US AQI Standard</span>
                                <span class="text-sm font-medium" :class="aqiTextColor">{{ pollutionData.aqius }} — {{ getAqiLevel(pollutionData.aqius) }}</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                                <span class="text-xs text-gray-500 dark:text-gray-400">China AQI Standard</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ pollutionData.aqicn }}</span>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-xs text-gray-500 dark:text-gray-400">Last Reading</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formattedDateTime }}</span>
                            </div>
                        </div>
                        <p class="mt-4 text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
                            Data provided by IQAir AirVisual API. Readings are updated hourly and reflect ambient air quality in {{ cityInfo.city }}.
                        </p>
                    </div>
                </div>

                <!-- Telegram Notification Panel -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 300ms">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div class="flex items-center gap-2">
                            <span class="w-1 h-5 bg-blue-500 rounded-full inline-block"></span>
                            <div class="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-xl">
                                <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Telegram Alerts</h2>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Get notified when air quality is dangerous</p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer group">
                            <input type="checkbox" v-model="telegramSettings.enabled" class="sr-only peer" @change="saveSettings">
                            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600 transition-colors duration-300"></div>
                        </label>
                    </div>

                    <div v-if="telegramSettings.enabled" class="space-y-4">
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

                        <div v-if="alertStatus.show" class="p-4 rounded-xl" :class="alertStatus.success ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'">
                            <p class="text-sm" :class="alertStatus.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
                                {{ alertStatus.message }}
                            </p>
                        </div>
                    </div>

                    <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
                        <svg class="h-10 w-10 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                        </svg>
                        <p class="text-xs">Enable alerts to receive notifications on Telegram</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logger from '@/utils/logger'
import {
    ArrowPathIcon,
    MapPinIcon,
    ClockIcon,
    CloudIcon,
    SunIcon,
    BeakerIcon,
    ShieldCheckIcon,
    UserGroupIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'AirQualityDashboard',
    components: {
        ArrowPathIcon,
        MapPinIcon,
        ClockIcon,
        CloudIcon,
        SunIcon,
        BeakerIcon,
        ShieldCheckIcon,
        UserGroupIcon
    },
    data() {
        return {
            loading: true,
            error: null,
            pollutionData: null,
            weatherData: null,
            lastUpdated: null,
            defaultApiKey: 'cc7e6c14-24ec-4805-9b37-653b33c3d0a5',
            cityInfo: { city: 'Phnom Penh', state: 'Phnom Penh', country: 'Cambodia' },
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
            currentTime: Date.now(),
            aqiLevels: [
                {
                    name: 'Good',
                    range: '0-50',
                    min: 0,
                    max: 50,
                    emoji: '😊',
                    description: 'Air quality is satisfactory with little risk to health.',
                    badgeClass: 'bg-green-500 text-white',
                    textClass: 'text-green-700 dark:text-green-300',
                    subTextClass: 'text-green-600 dark:text-green-400',
                    activeClass: 'border-green-500 bg-green-50 dark:bg-green-900/30',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                },
                {
                    name: 'Moderate',
                    range: '51-100',
                    min: 51,
                    max: 100,
                    emoji: '🙂',
                    description: 'Acceptable quality, but some pollutants may affect sensitive individuals.',
                    badgeClass: 'bg-yellow-500 text-white',
                    textClass: 'text-yellow-700 dark:text-yellow-300',
                    subTextClass: 'text-yellow-600 dark:text-yellow-400',
                    activeClass: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                },
                {
                    name: 'Unhealthy for Sensitive Groups',
                    range: '101-150',
                    min: 101,
                    max: 150,
                    emoji: '😐',
                    description: 'Sensitive groups may experience health effects.',
                    badgeClass: 'bg-orange-500 text-white',
                    textClass: 'text-orange-700 dark:text-orange-300',
                    subTextClass: 'text-orange-600 dark:text-orange-400',
                    activeClass: 'border-orange-500 bg-orange-50 dark:bg-orange-900/30',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                },
                {
                    name: 'Unhealthy',
                    range: '151-200',
                    min: 151,
                    max: 200,
                    emoji: '😷',
                    description: 'Everyone may begin to experience health effects.',
                    badgeClass: 'bg-red-500 text-white',
                    textClass: 'text-red-700 dark:text-red-300',
                    subTextClass: 'text-red-600 dark:text-red-400',
                    activeClass: 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                },
                {
                    name: 'Very Unhealthy',
                    range: '201-300',
                    min: 201,
                    max: 300,
                    emoji: '🤢',
                    description: 'Health alert: everyone may experience more serious effects.',
                    badgeClass: 'bg-purple-500 text-white',
                    textClass: 'text-purple-700 dark:text-purple-300',
                    subTextClass: 'text-purple-600 dark:text-purple-400',
                    activeClass: 'border-purple-500 bg-purple-50 dark:bg-purple-900/30',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                },
                {
                    name: 'Hazardous',
                    range: '301+',
                    min: 301,
                    max: 500,
                    emoji: '☠️',
                    description: 'Emergency conditions with serious health effects for everyone.',
                    badgeClass: 'bg-red-800 text-white',
                    textClass: 'text-red-800 dark:text-red-200',
                    subTextClass: 'text-red-700 dark:text-red-300',
                    activeClass: 'border-red-800 bg-red-100 dark:bg-red-900/50',
                    inactiveClass: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }
            ]
        }
    },
    computed: {
        formattedTime() {
            return this.lastUpdated ? new Date(this.lastUpdated).toLocaleTimeString() : '--:--'
        },
        formattedDateTime() {
            if (!this.lastUpdated) return 'Waiting for data...'
            return new Date(this.lastUpdated).toLocaleString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        weatherIconUrl() {
            if (!this.weatherData?.ic) return ''
            return `https://openweathermap.org/img/wn/${this.weatherData.ic}@2x.png`
        },
        aqiDescription() {
            if (!this.pollutionData) return null
            return this.getAqiDescription(this.pollutionData.aqius)
        },
        activeAqiLevel() {
            if (!this.pollutionData) return null
            return this.aqiLevels.find(
                level => this.pollutionData.aqius >= level.min && this.pollutionData.aqius <= level.max
            )
        },
        aqiMarkerPosition() {
            if (!this.pollutionData) return 0
            return Math.min(Math.max((this.pollutionData.aqius / 500) * 100, 2), 98)
        },
        aqiPercentage() {
            if (!this.pollutionData) return 0
            return Math.min(this.pollutionData.aqius / 500, 1)
        },
        aqiEmoji() {
            if (!this.pollutionData) return '⏳'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return '😊'
            if (aqi <= 100) return '🙂'
            if (aqi <= 150) return '😐'
            if (aqi <= 200) return '😷'
            if (aqi <= 300) return '🤢'
            return '☠️'
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
        aqiCardClass() {
            if (!this.pollutionData) return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-300 dark:border-green-700'
            if (aqi <= 100) return 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border-yellow-300 dark:border-yellow-700'
            if (aqi <= 150) return 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 border-orange-300 dark:border-orange-700'
            if (aqi <= 200) return 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-300 dark:border-red-700'
            if (aqi <= 300) return 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 border-purple-300 dark:border-purple-700'
            return 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 border-red-500 dark:border-red-600'
        },
        aqiDecorativeBg() {
            if (!this.pollutionData) return 'bg-blue-100 dark:bg-blue-900'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'bg-green-200 dark:bg-green-900'
            if (aqi <= 100) return 'bg-yellow-200 dark:bg-yellow-900'
            if (aqi <= 150) return 'bg-orange-200 dark:bg-orange-900'
            if (aqi <= 200) return 'bg-red-200 dark:bg-red-900'
            if (aqi <= 300) return 'bg-purple-200 dark:bg-purple-900'
            return 'bg-red-300 dark:bg-red-800'
        },
        aqiTextColor() {
            if (!this.pollutionData) return 'text-blue-500 dark:text-blue-400'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-600 dark:text-green-400'
            if (aqi <= 100) return 'text-yellow-600 dark:text-yellow-400'
            if (aqi <= 150) return 'text-orange-600 dark:text-orange-400'
            if (aqi <= 200) return 'text-red-600 dark:text-red-400'
            if (aqi <= 300) return 'text-purple-600 dark:text-purple-400'
            return 'text-red-800 dark:text-red-300'
        },
        aqiTitleColor() {
            if (!this.pollutionData) return 'text-gray-900 dark:text-white'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-800 dark:text-green-200'
            if (aqi <= 100) return 'text-yellow-800 dark:text-yellow-200'
            if (aqi <= 150) return 'text-orange-800 dark:text-orange-200'
            if (aqi <= 200) return 'text-red-800 dark:text-red-200'
            if (aqi <= 300) return 'text-purple-800 dark:text-purple-200'
            return 'text-red-900 dark:text-red-100'
        },
        aqiSubtitleColor() {
            if (!this.pollutionData) return 'text-gray-600 dark:text-gray-400'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-700 dark:text-green-300'
            if (aqi <= 100) return 'text-yellow-700 dark:text-yellow-300'
            if (aqi <= 150) return 'text-orange-700 dark:text-orange-300'
            if (aqi <= 200) return 'text-red-700 dark:text-red-300'
            if (aqi <= 300) return 'text-purple-700 dark:text-purple-300'
            return 'text-red-800 dark:text-red-200'
        },
        aqiIconColor() {
            if (!this.pollutionData) return 'text-blue-500 dark:text-blue-400'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'text-green-500 dark:text-green-400'
            if (aqi <= 100) return 'text-yellow-500 dark:text-yellow-400'
            if (aqi <= 150) return 'text-orange-500 dark:text-orange-400'
            if (aqi <= 200) return 'text-red-500 dark:text-red-400'
            if (aqi <= 300) return 'text-purple-500 dark:text-purple-400'
            return 'text-red-600 dark:text-red-400'
        },
        aqiBorderColor() {
            if (!this.pollutionData) return 'border-gray-200 dark:border-gray-700'
            const aqi = this.pollutionData.aqius
            if (aqi <= 50) return 'border-green-300 dark:border-green-700'
            if (aqi <= 100) return 'border-yellow-300 dark:border-yellow-700'
            if (aqi <= 150) return 'border-orange-300 dark:border-orange-700'
            if (aqi <= 200) return 'border-red-300 dark:border-red-700'
            if (aqi <= 300) return 'border-purple-300 dark:border-purple-700'
            return 'border-red-500 dark:border-red-600'
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
        getApiUrl() {
            const apiKey = process.env.VUE_APP_AIR_QUALITY_API_KEY || this.defaultApiKey
            return `https://api.airvisual.com/v2/city?city=Phnom%20Penh&state=Phnom%20Penh&country=Cambodia&key=${apiKey}`
        },
        async fetchPollutionData() {
            this.loading = true
            this.error = null
            try {
                const response = await fetch(this.getApiUrl())
                if (!response.ok) {
                    if (response.status === 402) {
                        throw new Error('API key payment required or rate limit exceeded. Please configure a valid VUE_APP_AIR_QUALITY_API_KEY in your environment variables.')
                    }
                    throw new Error(`API request failed with status ${response.status}`)
                }
                const data = await response.json()
                if (data.status !== 'success') {
                    throw new Error(data.data?.message || 'API returned unsuccessful status')
                }
                this.cityInfo = {
                    city: data.data.city,
                    state: data.data.state,
                    country: data.data.country
                }
                this.pollutionData = data.data.current.pollution
                this.weatherData = data.data.current.weather
                this.lastUpdated = data.data.current.pollution.ts || new Date().toISOString()
                if (this.telegramSettings.enabled && this.telegramSettings.botToken && this.telegramSettings.chatId && this.pollutionData?.aqius >= parseInt(this.telegramSettings.threshold)) {
                    this.autoSendAlert()
                }
            } catch (error) {
                logger.error('Error fetching air quality data:', error)
                this.error = error.message || 'Failed to load air quality data. Please check your API key configuration and try again.'
                this.pollutionData = null
                this.weatherData = null
            } finally {
                this.loading = false
            }
        },
        getAqiDescription(aqi) {
            if (aqi <= 50) {
                return {
                    title: 'Excellent Air Quality',
                    description: 'The air quality is in the safe range. Air pollution poses little or no risk to your health. You can safely enjoy outdoor activities without concern.',
                    recommendations: 'Perfect conditions for outdoor activities! Feel free to exercise, play sports, or spend time outside. No special precautions needed.',
                    sensitiveGroups: 'Everyone can safely enjoy outdoor activities. No restrictions for any age group or health condition.'
                }
            }
            if (aqi <= 100) {
                return {
                    title: 'Acceptable Air Quality',
                    description: 'Air quality is generally acceptable for most people. However, some pollutants may cause minor breathing discomfort for unusually sensitive individuals.',
                    recommendations: 'Most people can continue normal outdoor activities. If you experience unusual coughing or throat irritation, consider reducing prolonged outdoor exertion.',
                    sensitiveGroups: 'People with respiratory conditions, children, and elderly should monitor symptoms. Reduce outdoor activities if experiencing discomfort.'
                }
            }
            if (aqi <= 150) {
                return {
                    title: 'Unhealthy for Sensitive Groups',
                    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected, but some may experience minor symptoms.',
                    recommendations: 'Sensitive groups should reduce prolonged or heavy outdoor exertion. Everyone else can continue normal activities but should watch for symptoms.',
                    sensitiveGroups: 'Children, elderly, and people with heart or lung disease should avoid prolonged outdoor activities. Asthmatics should carry medication.'
                }
            }
            if (aqi <= 200) {
                return {
                    title: 'Unhealthy Air Quality',
                    description: 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.',
                    recommendations: 'Everyone should reduce prolonged or heavy outdoor exertion. Sensitive groups should avoid all outdoor activities. Stay indoors if possible.',
                    sensitiveGroups: 'Sensitive groups should avoid all outdoor activities. Children, elderly, and people with respiratory or heart conditions are at higher risk.'
                }
            }
            if (aqi <= 300) {
                return {
                    title: 'Very Unhealthy Air Quality',
                    description: 'Health alert: everyone may experience more serious health effects. This is a dangerous level of air pollution.',
                    recommendations: 'Everyone should avoid prolonged outdoor activities. Sensitive groups should remain indoors. Close windows and use air purifiers if available.',
                    sensitiveGroups: 'All sensitive groups must stay indoors. This level is dangerous for children, elderly, pregnant women, and people with any respiratory or heart conditions.'
                }
            }
            return {
                title: 'Hazardous Air Quality',
                description: 'Emergency conditions! The entire population is likely to be affected. This is a health emergency with serious effects for everyone.',
                recommendations: 'Everyone should avoid all outdoor activities. Stay indoors with windows closed. Use air purifiers. Consider wearing N95 masks if you must go outside.',
                sensitiveGroups: 'This is extremely dangerous for everyone, especially sensitive groups. Seek medical attention if experiencing severe symptoms. Consider evacuating if possible.'
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
                const response = await fetch(this.getApiUrl())
                if (!response.ok) throw new Error('API request failed')
                const data = await response.json()
                if (data.status !== 'success') throw new Error('API returned unsuccessful')
                this.cityInfo = {
                    city: data.data.city,
                    state: data.data.state,
                    country: data.data.country
                }
                this.pollutionData = data.data.current.pollution
                this.weatherData = data.data.current.weather
                this.lastUpdated = data.data.current.pollution.ts || new Date().toISOString()
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

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out both;
}

.animate-shimmer {
    animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(16px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
