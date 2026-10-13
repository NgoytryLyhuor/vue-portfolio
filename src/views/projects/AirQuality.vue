<template>
    <div class="min-h-screen bg-slate-50/80 dark:bg-[#030816] text-slate-900 dark:text-slate-100 pb-20 pt-20 md:pt-24 relative overflow-hidden">
        <!-- Ambient Decorative Background Glows -->
        <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
            <div class="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/3 -left-32 w-[26rem] h-[26rem] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-teal-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Top Header & Controls -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-3">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Cambodia Air Quality &amp; Environmental Monitor</span>
                        <span class="text-emerald-400 dark:text-emerald-500">•</span>
                        <span class="font-khmer">គុណភាពខ្យល់ និងបរិស្ថានកម្ពុជា</span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-3">
                        <span>Air Quality Intelligence</span>
                        <span class="text-lg sm:text-xl font-normal text-slate-500 dark:text-slate-400 hidden sm:inline">|</span>
                        <span class="text-base sm:text-lg font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-500 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent">
                            {{ formattedDateTime }}
                        </span>
                    </h1>
                </div>

                <!-- Action Controls: GPS, AQI Standard Toggle, Temp Unit Toggle, Telegram & Refresh -->
                <div class="flex flex-wrap items-center gap-2.5">
                    <!-- My Location GPS Button -->
                    <button
                        @click="useMyLocation"
                        :disabled="locating || loading"
                        title="Find nearest air quality station to my location"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
                    >
                        <MapPinIcon class="w-4 h-4 text-emerald-500" :class="{ 'animate-bounce': locating }" />
                        <span>{{ locating ? 'Locating...' : 'Nearest Station' }}</span>
                    </button>

                    <!-- AQI Standard Toggle (US vs CN) -->
                    <div class="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                        <button
                            @click="aqiStandard = 'US'"
                            :class="aqiStandard === 'US' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            US AQI
                        </button>
                        <button
                            @click="aqiStandard = 'CN'"
                            :class="aqiStandard === 'CN' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            CN AQI
                        </button>
                    </div>

                    <!-- Temperature Unit Toggle (°C / °F) -->
                    <div class="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                        <button
                            @click="tempUnit = 'C'"
                            :class="tempUnit === 'C' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            °C
                        </button>
                        <button
                            @click="tempUnit = 'F'"
                            :class="tempUnit === 'F' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            °F
                        </button>
                    </div>

                    <!-- Telegram Alerts Quick Jump -->
                    <a
                        href="#telegram-alerts-panel"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold shadow-sm transition-all"
                    >
                        <span class="w-2 h-2 rounded-full" :class="telegramSettings.enabled ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'"></span>
                        <span class="hidden sm:inline">Telegram Alerts</span>
                    </a>

                    <!-- Refresh Button -->
                    <button
                        @click="fetchPollutionData"
                        :disabled="loading"
                        title="Refresh air quality data"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all disabled:opacity-50"
                    >
                        <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': loading }" />
                        <span class="hidden sm:inline">Refresh</span>
                    </button>
                </div>
            </div>

            <!-- Cambodia Monitoring Hubs Quick-Switcher -->
            <div class="mb-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <div class="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 shrink-0 flex items-center gap-1.5">
                        <span>🇰🇭</span>
                        <span>Monitoring Hubs:</span>
                    </span>
                    <button
                        v-for="hub in cambodiaHubs"
                        :key="hub.name"
                        @click="selectCambodiaHub(hub)"
                        :class="[
                            selectedHub.name === hub.name
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 border-transparent'
                                : 'bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:border-emerald-400/40'
                        ]"
                        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0"
                    >
                        <span>{{ hub.emoji }}</span>
                        <span>{{ hub.name }}</span>
                        <span class="font-khmer text-[11px] opacity-80">{{ hub.khmer }}</span>
                    </button>
                </div>
            </div>

            <!-- Loading Skeleton State -->
            <div v-if="loading && !pollutionData" class="space-y-6">
                <div class="h-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 animate-pulse flex flex-col justify-between">
                    <div class="flex justify-between">
                        <div class="space-y-3">
                            <div class="h-8 w-52 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div class="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                        <div class="h-24 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div v-for="i in 4" :key="i" class="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error && !pollutionData" class="rounded-3xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 p-8 text-center my-8 max-w-xl mx-auto">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Failed to Load Air Quality Data</h2>
                <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{{ error }}</p>
                <div class="flex flex-wrap justify-center gap-3">
                    <button
                        @click="selectCambodiaHub(cambodiaHubs[0])"
                        class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        Reset to Phnom Penh
                    </button>
                    <button
                        @click="fetchPollutionData"
                        class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': loading }" />
                        <span>Try Again</span>
                    </button>
                </div>
            </div>

            <!-- Main Air Quality Dashboard -->
            <div v-else-if="pollutionData" class="space-y-6">
                <!-- Hero AQI & Atmospheric Dispersion Banner -->
                <div class="relative rounded-3xl overflow-hidden shadow-xl border border-white/15" :class="heroBannerGradient">
                    <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_60%)]"></div>
                    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div class="relative z-10 p-6 sm:p-8 lg:p-10 text-white">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <!-- Left 7 Columns: Station Header, Circular AQI Gauge & Core Metrics -->
                            <div class="lg:col-span-7 space-y-6">
                                <!-- Station Name & Badges -->
                                <div class="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <div class="flex items-center gap-2.5 flex-wrap">
                                            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
                                                <MapPinIcon class="w-6 h-6 sm:w-7 sm:h-7 text-white/90 shrink-0" />
                                                <span>{{ selectedHub.name || cityInfo.city }}</span>
                                            </h2>
                                            <span v-if="selectedHub.khmer" class="font-khmer text-lg sm:text-xl font-semibold px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md">
                                                {{ selectedHub.khmer }}
                                            </span>
                                            <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/25 backdrop-blur-md">
                                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                                <span>Live Sensor</span>
                                            </span>
                                        </div>
                                        <p class="text-xs sm:text-sm text-white/85 mt-1.5 flex items-center gap-2 flex-wrap">
                                            <span>Station: {{ cityInfo.city }}, {{ cityInfo.country }}</span>
                                            <span>•</span>
                                            <span>{{ selectedHub.region }}</span>
                                            <span>•</span>
                                            <span>Updated {{ formattedTime }}</span>
                                        </p>
                                    </div>
                                </div>

                                <!-- Circular Gauge + Status Summary -->
                                <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                                    <!-- Animated Circular AQI Ring -->
                                    <div class="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0 bg-black/15 rounded-full p-2 backdrop-blur-sm border border-white/15">
                                        <svg viewBox="0 0 180 180" class="transform -rotate-90 w-full h-full">
                                            <circle
                                                cx="90"
                                                cy="90"
                                                r="76"
                                                stroke="rgba(255,255,255,0.2)"
                                                stroke-width="12"
                                                fill="none"
                                            />
                                            <circle
                                                cx="90"
                                                cy="90"
                                                r="76"
                                                stroke="#ffffff"
                                                stroke-width="12"
                                                stroke-linecap="round"
                                                fill="none"
                                                :stroke-dasharray="circumference"
                                                :stroke-dashoffset="circumference - (aqiPercentage * circumference)"
                                                class="transition-all duration-1000 ease-out drop-shadow-md"
                                            />
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                                            <span class="text-xs font-bold uppercase tracking-widest text-white/75">{{ aqiStandard }} AQI</span>
                                            <span class="text-5xl font-black tracking-tight leading-none my-0.5">{{ displayedAqiValue }}</span>
                                            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md mt-1">
                                                {{ aqiEmoji }} {{ getAqiLevel(pollutionData.aqius) }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Health Narrative & Primary Pollutant Summary -->
                                    <div class="flex-1 space-y-3 text-center sm:text-left">
                                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                                            <span>{{ aqiEmoji }}</span>
                                            <span>{{ aqiDescription?.title }}</span>
                                        </div>
                                        <p class="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
                                            {{ aqiDescription?.description }}
                                        </p>
                                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                            <span class="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-sm text-xs font-semibold">
                                                Main Pollutant: <strong>{{ formatPollutantShort(pollutionData.mainus) }}</strong> ({{ formatPollutantName(pollutionData.mainus) }})
                                            </span>
                                            <span class="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-sm text-xs font-semibold">
                                                Est. PM2.5: <strong>~{{ estimatedPm25 }} µg/m³</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- 4 Quick Hero Pills -->
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">US EPA AQI</div>
                                        <div class="text-2xl font-extrabold mt-0.5">{{ pollutionData.aqius }}</div>
                                        <div class="text-[11px] text-white/80 mt-0.5">{{ getAqiLevel(pollutionData.aqius) }}</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">China MEP AQI</div>
                                        <div class="text-2xl font-extrabold mt-0.5">{{ pollutionData.aqicn }}</div>
                                        <div class="text-[11px] text-white/80 mt-0.5"> Poll. {{ formatPollutantShort(pollutionData.maincn || pollutionData.mainus) }}</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">Est. PM2.5 Mass</div>
                                        <div class="text-2xl font-extrabold mt-0.5">{{ estimatedPm25 }} <span class="text-xs font-normal">µg/m³</span></div>
                                        <div class="text-[11px] text-white/80 mt-0.5">{{ pm25WhoComparison }}</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">Outdoor Safety</div>
                                        <div class="text-lg font-extrabold mt-0.5 truncate">{{ outdoorSafetyBadge }}</div>
                                        <div class="text-[11px] text-white/80 mt-0.5">{{ maskRecommendationShort }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right 5 Columns: Co-located Meteorology & Atmospheric Dispersion -->
                            <div class="lg:col-span-5 flex flex-col justify-between gap-4 bg-black/20 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-xs uppercase tracking-wider text-white/70 font-bold block">Co-Located Weather &amp; Airflow</span>
                                        <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">Pollutant Dispersion Conditions</h3>
                                    </div>
                                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
                                        {{ dispersionRating.label }}
                                    </span>
                                </div>

                                <div v-if="weatherData" class="flex items-center justify-between gap-4 py-3 border-y border-white/15">
                                    <div class="flex items-center gap-3">
                                        <img
                                            v-if="weatherIconUrl"
                                            :src="weatherIconUrl"
                                            alt="Weather condition"
                                            class="w-16 h-16 -my-2 drop-shadow-md"
                                        />
                                        <div>
                                            <div class="text-4xl font-black tracking-tight">
                                                {{ formatTemp(weatherData.tp) }}°<span class="text-xl font-bold opacity-80">{{ tempUnit }}</span>
                                            </div>
                                            <div class="text-xs text-white/80 mt-0.5">
                                                Ambient Station Temperature
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-xs text-white/75">Wind Speed</div>
                                        <div class="text-xl font-extrabold">{{ windSpeedKmh }} km/h</div>
                                        <div class="text-[11px] text-white/80">{{ getWindDirection(weatherData.wd) }} ({{ weatherData.wd }}°)</div>
                                    </div>
                                </div>

                                <!-- 4 Weather Telemetry Boxes -->
                                <div v-if="weatherData" class="grid grid-cols-2 gap-2.5 text-xs">
                                    <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                                        <span class="text-white/70 block">💧 Relative Humidity</span>
                                        <strong class="text-base font-extrabold text-white mt-0.5 block">{{ weatherData.hu }}%</strong>
                                        <span class="text-[11px] text-white/75">{{ weatherData.hu > 75 ? 'High moisture traps haze' : 'Moderate humidity' }}</span>
                                    </div>
                                    <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                                        <span class="text-white/70 block">💨 Wind Velocity</span>
                                        <strong class="text-base font-extrabold text-white mt-0.5 block">{{ weatherData.ws }} m/s</strong>
                                        <span class="text-[11px] text-white/75">{{ dispersionRating.note }}</span>
                                    </div>
                                    <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                                        <span class="text-white/70 block">⏲️ Barometric Pressure</span>
                                        <strong class="text-base font-extrabold text-white mt-0.5 block">{{ weatherData.pr }} hPa</strong>
                                        <span class="text-[11px] text-white/75">{{ weatherData.pr >= 1012 ? 'Stable air mass' : 'Low pressure trough' }}</span>
                                    </div>
                                    <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                                        <span class="text-white/70 block">🧭 Airflow Vector</span>
                                        <strong class="text-base font-extrabold text-white mt-0.5 block">{{ getWindDirection(weatherData.wd) }}</strong>
                                        <span class="text-[11px] text-white/75">Bearing {{ weatherData.wd }}°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 12-Column Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <!-- LEFT 8 COLUMNS: Interactive AQI Scale Explorer, Pollutant Guide & Telegram Automation -->
                    <div class="lg:col-span-8 space-y-6">
                        <!-- 1. Interactive AQI Scale & Health Category Explorer -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-emerald-500"></span>
                                        <span>Interactive AQI Scale &amp; Health Explorer</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Click any AQI tier below to inspect its health impact and protective protocol
                                    </p>
                                </div>
                                <span v-if="activeAqiLevel" class="text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto" :class="activeAqiLevel.badgeClass">
                                    Current: {{ activeAqiLevel.emoji }} {{ activeAqiLevel.name }} ({{ pollutionData.aqius }})
                                </span>
                            </div>

                            <!-- Spectrum Bar with Live Pin -->
                            <div class="relative pt-3 pb-7 px-1">
                                <div class="h-3.5 rounded-full overflow-hidden flex shadow-inner">
                                    <div class="flex-1 bg-emerald-500" title="Good (0-50)"></div>
                                    <div class="flex-1 bg-amber-400" title="Moderate (51-100)"></div>
                                    <div class="flex-1 bg-orange-500" title="Unhealthy for Sensitive Groups (101-150)"></div>
                                    <div class="flex-1 bg-red-500" title="Unhealthy (151-200)"></div>
                                    <div class="flex-1 bg-purple-600" title="Very Unhealthy (201-300)"></div>
                                    <div class="flex-[0.6] bg-rose-900" title="Hazardous (301-500)"></div>
                                </div>

                                <!-- Animated Marker Pin -->
                                <div
                                    class="absolute top-0 transform -translate-x-1/2 transition-all duration-700"
                                    :style="{ left: `${aqiMarkerPosition}%` }"
                                >
                                    <div class="px-2 py-0.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-extrabold shadow-md whitespace-nowrap">
                                        AQI {{ pollutionData.aqius }}
                                    </div>
                                    <div class="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900 dark:border-t-white mx-auto"></div>
                                </div>

                                <div class="flex justify-between mt-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                    <span>150</span>
                                    <span>200</span>
                                    <span>300</span>
                                    <span>500+</span>
                                </div>
                            </div>

                            <!-- 6 Interactive AQI Tier Cards -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                                <button
                                    v-for="(level, idx) in aqiLevels"
                                    :key="level.range"
                                    @click="selectedLevelIndex = idx"
                                    :class="[
                                        inspectedLevelIndex === idx
                                            ? level.activeClass + ' ring-2 ring-offset-2 dark:ring-offset-slate-900 shadow-md scale-[1.02]'
                                            : 'border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 opacity-80 hover:opacity-100'
                                    ]"
                                    class="rounded-2xl p-3 text-center border transition-all flex flex-col items-center justify-between"
                                >
                                    <span class="text-2xl">{{ level.emoji }}</span>
                                    <p class="text-[11px] font-bold mt-1.5 leading-tight" :class="level.textClass">{{ level.shortName || level.name }}</p>
                                    <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1">{{ level.range }}</span>
                                </button>
                            </div>

                            <!-- Selected Level Inspector Drawer -->
                            <div v-if="inspectedLevelDetails" class="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70">
                                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-2xl">{{ inspectedLevelDetails.emoji }}</span>
                                        <div>
                                            <h4 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                                                {{ inspectedLevelDetails.name }} (AQI {{ inspectedLevelDetails.range }})
                                            </h4>
                                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ inspectedLevelDetails.title }}</p>
                                        </div>
                                    </div>
                                    <span
                                        v-if="activeAqiLevel && activeAqiLevel.name === inspectedLevelDetails.name"
                                        class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                                    >
                                        Active Station Level
                                    </span>
                                </div>
                                <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                    {{ inspectedLevelDetails.description }}
                                </p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                        <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                                            <ShieldCheckIcon class="w-4 h-4 text-emerald-500" />
                                            <span>General Public Guidance</span>
                                        </div>
                                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ inspectedLevelDetails.recommendations }}</p>
                                    </div>
                                    <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                        <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                                            <UserGroupIcon class="w-4 h-4 text-amber-500" />
                                            <span>Sensitive Groups Protocol</span>
                                        </div>
                                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ inspectedLevelDetails.sensitiveGroups }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Pollutant Breakdown & Reference Encyclopedia -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-orange-500"></span>
                                        <span>Primary Pollutant &amp; Chemical Profile</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Dominant atmospheric pollutant and reference guide for major urban emissions
                                    </p>
                                </div>
                                <span class="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 self-start sm:self-auto">
                                    Dominant: {{ formatPollutantShort(pollutionData.mainus) }}
                                </span>
                            </div>

                            <!-- Active Primary Pollutant Highlight -->
                            <div class="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                                <div class="w-16 h-16 rounded-2xl bg-orange-500 text-white flex flex-col items-center justify-center font-black shrink-0 shadow-md shadow-orange-500/20">
                                    <span class="text-lg leading-none">{{ formatPollutantShort(pollutionData.mainus) }}</span>
                                    <span class="text-[10px] font-semibold opacity-85 mt-0.5">Primary</span>
                                </div>
                                <div class="flex-1">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h4 class="text-base font-extrabold text-slate-900 dark:text-white">
                                            {{ formatPollutantName(pollutionData.mainus) }}
                                        </h4>
                                        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            Est. ~{{ estimatedPm25 }} µg/m³
                                        </span>
                                    </div>
                                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                        {{ getHealthAdvice(pollutionData.mainus, pollutionData.aqius) }}
                                    </p>
                                </div>
                            </div>

                            <!-- 6 Major Pollutants Reference Cards -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div
                                    v-for="pol in pollutantCatalog"
                                    :key="pol.code"
                                    :class="pollutionData.mainus === pol.code ? 'border-orange-500/60 bg-orange-50/50 dark:bg-orange-950/20' : 'border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'"
                                    class="p-3.5 rounded-2xl border transition-all"
                                >
                                    <div class="flex items-center justify-between mb-1.5">
                                        <span class="text-sm font-extrabold text-slate-900 dark:text-white">{{ pol.symbol }}</span>
                                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                            {{ pol.size }}
                                        </span>
                                    </div>
                                    <div class="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{{ pol.name }}</div>
                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{{ pol.sources }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Telegram Real-Time Alert Automation Panel -->
                        <div id="telegram-alerts-panel" class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800">
                                <div class="flex items-center gap-3.5">
                                    <div class="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Telegram Automated AQI Alerts</h3>
                                            <span
                                                :class="telegramSettings.enabled ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'"
                                                class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                                            >
                                                {{ telegramSettings.enabled ? 'Active' : 'Disabled' }}
                                            </span>
                                        </div>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Receive instant Telegram bot notifications whenever {{ cityInfo.city }}'s AQI exceeds your safety threshold
                                        </p>
                                    </div>
                                </div>

                                <!-- Enable Switch -->
                                <label class="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                                    <input type="checkbox" v-model="telegramSettings.enabled" class="sr-only peer" @change="saveSettings" />
                                    <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-600"></div>
                                </label>
                            </div>

                            <!-- Enabled Configuration Form -->
                            <div v-if="telegramSettings.enabled" class="pt-5 space-y-5">
                                <!-- Collapsible Setup Guide -->
                                <div class="rounded-2xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/60 p-4">
                                    <button
                                        @click="showTelegramGuide = !showTelegramGuide"
                                        class="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-sky-900 dark:text-sky-200"
                                    >
                                        <span class="flex items-center gap-2">
                                            <span>🤖</span>
                                            <span>How to connect your Telegram Bot (4 quick steps)</span>
                                        </span>
                                        <span class="text-xs underline">{{ showTelegramGuide ? 'Hide guide' : 'Show guide' }}</span>
                                    </button>
                                    <ol v-if="showTelegramGuide" class="mt-3 text-xs text-sky-800 dark:text-sky-300 space-y-1.5 list-decimal list-inside leading-relaxed border-t border-sky-200/60 dark:border-sky-800/60 pt-3">
                                        <li>Open Telegram and message <strong>@BotFather</strong>, then send <code class="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900 font-mono">/newbot</code>.</li>
                                        <li>Copy the HTTP API <strong>Bot Token</strong> provided by BotFather and paste it below.</li>
                                        <li>Start a conversation with your new bot and message <strong>@userinfobot</strong> to get your numeric <strong>Chat ID</strong>.</li>
                                        <li>Click <strong>Send Test Alert</strong> below to verify your connection!</li>
                                    </ol>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Telegram Bot Token</label>
                                        <input
                                            v-model="telegramSettings.botToken"
                                            type="password"
                                            placeholder="123456789:ABCdefGHIjklMNO..."
                                            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            @change="saveSettings"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Telegram Chat ID</label>
                                        <input
                                            v-model="telegramSettings.chatId"
                                            type="text"
                                            placeholder="e.g. 123456789"
                                            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            @change="saveSettings"
                                        />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">AQI Alert Threshold</label>
                                        <select
                                            v-model="telegramSettings.threshold"
                                            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            @change="saveSettings"
                                        >
                                            <option value="50">🟢 Good (AQI 50+)</option>
                                            <option value="100">🟡 Moderate (AQI 100+)</option>
                                            <option value="150">🟠 Unhealthy for Sensitive (AQI 150+)</option>
                                            <option value="200">🔴 Unhealthy (AQI 200+)</option>
                                            <option value="300">🟣 Very Unhealthy (AQI 300+)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Auto-Check Frequency</label>
                                        <select
                                            v-model="telegramSettings.checkInterval"
                                            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            @change="updateAutoCheck"
                                        >
                                            <option value="0">🔴 Manual Only (Disabled)</option>
                                            <option value="5">⚡ Every 5 minutes</option>
                                            <option value="10">🕐 Every 10 minutes</option>
                                            <option value="30">🕑 Every 30 minutes</option>
                                            <option value="60">🕓 Every 1 hour</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Live Countdown Bar -->
                                <div v-if="Number(telegramSettings.checkInterval) > 0" class="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center justify-between">
                                    <div class="flex items-center gap-2.5">
                                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                                        <span class="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-200">Automated Background Monitoring Active</span>
                                    </div>
                                    <span class="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg">
                                        Next check: {{ nextCheckTime }}
                                    </span>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex flex-col sm:flex-row gap-3">
                                    <button
                                        @click="sendTestAlert"
                                        :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                        class="flex-1 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {{ sendingAlert ? 'Sending to Telegram...' : 'Send Test Alert' }}
                                    </button>
                                    <button
                                        @click="checkAndAlert"
                                        :disabled="sendingAlert || !telegramSettings.botToken || !telegramSettings.chatId"
                                        class="flex-1 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Evaluate Threshold Now
                                    </button>
                                </div>

                                <div
                                    v-if="alertStatus.show"
                                    class="p-3.5 rounded-xl text-xs sm:text-sm font-semibold"
                                    :class="alertStatus.success ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'"
                                >
                                    {{ alertStatus.message }}
                                </div>
                            </div>

                            <div v-else class="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                <span>Toggle the switch above to configure instant Telegram notifications when air pollution spikes.</span>
                                <button
                                    @click="telegramSettings.enabled = true; saveSettings()"
                                    class="px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold text-xs shrink-0 transition-colors"
                                >
                                    Configure Bot →
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT 4 COLUMNS: Smart Protective Actions & Station Telemetry -->
                    <div class="lg:col-span-4 space-y-6">
                        <!-- 1. Smart Health & Daily Protection Matrix -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                                <span class="w-2 h-5 rounded-full bg-teal-500"></span>
                                <span>Protective Action Matrix</span>
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                Real-time respiratory &amp; lifestyle recommendations for AQI {{ pollutionData.aqius }}
                            </p>

                            <div class="space-y-3">
                                <div
                                    v-for="(item, idx) in protectiveActions"
                                    :key="idx"
                                    class="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3"
                                >
                                    <div class="text-2xl shrink-0 mt-0.5">{{ item.icon }}</div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-xs font-bold text-slate-900 dark:text-white">{{ item.title }}</span>
                                            <span :class="item.badgeClass" class="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                                                {{ item.status }}
                                            </span>
                                        </div>
                                        <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                                            {{ item.advice }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. WHO PM2.5 Benchmark Card -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <BeakerIcon class="w-5 h-5 text-emerald-500" />
                                    <span>PM2.5 vs. WHO Guideline</span>
                                </h3>
                                <span class="text-xs font-bold text-slate-500 dark:text-slate-400">~{{ estimatedPm25 }} µg/m³</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                The World Health Organization (WHO) 24-hour safe guideline for fine particulate matter (PM2.5) is <strong>15 µg/m³</strong>.
                            </p>
                            <div class="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative mb-2">
                                <div
                                    class="h-full rounded-full transition-all duration-700"
                                    :class="estimatedPm25 <= 15 ? 'bg-emerald-500' : estimatedPm25 <= 35 ? 'bg-amber-500' : 'bg-red-500'"
                                    :style="{ width: `${Math.min(100, Math.max(8, (estimatedPm25 / 75) * 100))}%` }"
                                ></div>
                            </div>
                            <div class="flex justify-between text-[11px] text-slate-400 font-semibold">
                                <span>0 µg/m³</span>
                                <span class="text-emerald-600 dark:text-emerald-400">WHO Target: 15 µg/m³</span>
                                <span>75+ µg/m³</span>
                            </div>
                        </div>

                        <!-- 3. Station & Standard Telemetry Summary -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                <SunIcon class="w-5 h-5 text-amber-500" />
                                <span>Station Telemetry &amp; Source</span>
                            </h3>
                            <div class="space-y-2.5 text-xs">
                                <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-500 dark:text-slate-400">Selected Hub</span>
                                    <span class="font-bold text-slate-900 dark:text-white">{{ selectedHub.name }} ({{ selectedHub.khmer || cityInfo.country }})</span>
                                </div>
                                <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-500 dark:text-slate-400">Reporting Station</span>
                                    <span class="font-bold text-slate-900 dark:text-white">{{ cityInfo.city }}, {{ cityInfo.country }}</span>
                                </div>
                                <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-500 dark:text-slate-400">US EPA Standard</span>
                                    <span class="font-bold" :class="aqiTextColor">{{ pollutionData.aqius }} AQI ({{ getAqiLevel(pollutionData.aqius) }})</span>
                                </div>
                                <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-500 dark:text-slate-400">China MEP Standard</span>
                                    <span class="font-bold text-slate-900 dark:text-white">{{ pollutionData.aqicn }} AQI</span>
                                </div>
                                <div class="flex items-center justify-between py-2">
                                    <span class="text-slate-500 dark:text-slate-400">Sensor Timestamp</span>
                                    <span class="font-semibold text-slate-900 dark:text-white">{{ formattedDateTime }}</span>
                                </div>
                            </div>
                            <p class="mt-4 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                                Powered by IQAir AirVisual atmospheric monitoring network. Readings reflect real-time ambient particulate and gas telemetry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logger from '@/utils/logger';
import {
    ArrowPathIcon,
    MapPinIcon,
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
        SunIcon,
        BeakerIcon,
        ShieldCheckIcon,
        UserGroupIcon
    },
    data() {
        return {
            loading: true,
            locating: false,
            error: null,
            aqiStandard: 'US',
            tempUnit: 'C',
            selectedLevelIndex: null,
            showTelegramGuide: false,
            pollutionData: null,
            weatherData: null,
            lastUpdated: null,
            defaultApiKey: 'cc7e6c14-24ec-4805-9b37-653b33c3d0a5',
            cityInfo: { city: 'Phnom Penh', state: 'Phnom Penh', country: 'Cambodia' },
            selectedHub: {
                name: 'Phnom Penh',
                khmer: 'ភ្នំពេញ',
                lat: 11.5564,
                lon: 104.9282,
                emoji: '🏛️',
                region: 'Capital & Mekong Basin',
                isDefaultCity: true
            },
            cambodiaHubs: [
                { name: 'Phnom Penh', khmer: 'ភ្នំពេញ', lat: 11.5564, lon: 104.9282, emoji: '🏛️', region: 'Capital & Mekong Basin', isDefaultCity: true },
                { name: 'Siem Reap', khmer: 'សៀមរាប', lat: 13.3633, lon: 103.8564, emoji: '🛕', region: 'Angkor Heritage Zone' },
                { name: 'Sihanoukville', khmer: 'ព្រះសីហនុ', lat: 10.6275, lon: 103.5221, emoji: '🏖️', region: 'Coastal Maritime Zone' },
                { name: 'Battambang', khmer: 'បាត់ដំបង', lat: 13.0957, lon: 103.2022, emoji: '🌾', region: 'Northwest Plains' },
                { name: 'Kampot', khmer: 'កំពត', lat: 10.5942, lon: 104.1640, emoji: '🌶️', region: 'Bokor Foothills & Coast' },
                { name: 'Kep', khmer: 'កែប', lat: 10.4829, lon: 104.3167, emoji: '🦀', region: 'Southern Marine Park' },
                { name: 'Mondulkiri', khmer: 'មណ្ឌលគិរី', lat: 12.4558, lon: 107.1881, emoji: '🌲', region: 'Sen Monorom Highlands' },
                { name: 'Ratanakiri', khmer: 'រតនគិរី', lat: 13.7394, lon: 106.9872, emoji: '🌋', region: 'Northern Highland Forests' },
                { name: 'Kampong Cham', khmer: 'កំពង់ចាម', lat: 11.9934, lon: 105.4635, emoji: '🌉', region: 'Central Mekong Valley' },
                { name: 'Poipet', khmer: 'ប៉ោយប៉ែត', lat: 13.6580, lon: 102.5636, emoji: '🚉', region: 'Northwest Border Corridor' }
            ],
            pollutantCatalog: [
                { code: 'p2', symbol: 'PM2.5', name: 'Fine Particulate Matter', size: '≤ 2.5 µm', sources: 'Vehicle exhaust, biomass burning, construction dust & power plants.' },
                { code: 'p1', symbol: 'PM10', name: 'Coarse Particulate Matter', size: '≤ 10 µm', sources: 'Unpaved road dust, construction sites, agricultural burning & pollen.' },
                { code: 'o3', symbol: 'O₃', name: 'Ground-Level Ozone', size: 'Gas', sources: 'Formed when sunlight reacts with vehicle and industrial emissions.' },
                { code: 'n2', symbol: 'NO₂', name: 'Nitrogen Dioxide', size: 'Gas', sources: 'Motor vehicle traffic, diesel generators, and thermal power stations.' },
                { code: 's2', symbol: 'SO₂', name: 'Sulfur Dioxide', size: 'Gas', sources: 'Industrial fuel combustion and heavy marine/freight engines.' },
                { code: 'co', symbol: 'CO', name: 'Carbon Monoxide', size: 'Gas', sources: 'Incomplete combustion from congested traffic and charcoal stoves.' }
            ],
            circumference: 2 * Math.PI * 76,
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
                    shortName: 'Good',
                    range: '0–50',
                    min: 0,
                    max: 50,
                    emoji: '😊',
                    description: 'Air quality is satisfactory with little or no risk to health.',
                    badgeClass: 'bg-emerald-500 text-white',
                    textClass: 'text-emerald-700 dark:text-emerald-300',
                    activeClass: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-emerald-500/40'
                },
                {
                    name: 'Moderate',
                    shortName: 'Moderate',
                    range: '51–100',
                    min: 51,
                    max: 100,
                    emoji: '🙂',
                    description: 'Acceptable quality, though unusually sensitive individuals may notice mild effects.',
                    badgeClass: 'bg-amber-500 text-white',
                    textClass: 'text-amber-700 dark:text-amber-300',
                    activeClass: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-amber-500/40'
                },
                {
                    name: 'Unhealthy for Sensitive Groups',
                    shortName: 'Sensitive',
                    range: '101–150',
                    min: 101,
                    max: 150,
                    emoji: '😐',
                    description: 'Sensitive groups may experience respiratory symptoms during prolonged outdoor activity.',
                    badgeClass: 'bg-orange-500 text-white',
                    textClass: 'text-orange-700 dark:text-orange-300',
                    activeClass: 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 ring-orange-500/40'
                },
                {
                    name: 'Unhealthy',
                    shortName: 'Unhealthy',
                    range: '151–200',
                    min: 151,
                    max: 200,
                    emoji: '😷',
                    description: 'Everyone may begin to experience health effects; sensitive groups face higher risk.',
                    badgeClass: 'bg-red-500 text-white',
                    textClass: 'text-red-700 dark:text-red-300',
                    activeClass: 'border-red-500 bg-red-50 dark:bg-red-950/40 ring-red-500/40'
                },
                {
                    name: 'Very Unhealthy',
                    shortName: 'Very Unhealthy',
                    range: '201–300',
                    min: 201,
                    max: 300,
                    emoji: '🤢',
                    description: 'Health alert: everyone may experience more serious respiratory effects.',
                    badgeClass: 'bg-purple-600 text-white',
                    textClass: 'text-purple-700 dark:text-purple-300',
                    activeClass: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 ring-purple-500/40'
                },
                {
                    name: 'Hazardous',
                    shortName: 'Hazardous',
                    range: '301+',
                    min: 301,
                    max: 500,
                    emoji: '☠️',
                    description: 'Emergency conditions with serious health effects for the entire population.',
                    badgeClass: 'bg-rose-900 text-white',
                    textClass: 'text-rose-800 dark:text-rose-200',
                    activeClass: 'border-rose-800 bg-rose-100 dark:bg-rose-950/60 ring-rose-700/50'
                }
            ]
        };
    },
    computed: {
        displayedAqiValue() {
            if (!this.pollutionData) return 0;
            return this.aqiStandard === 'CN' ? this.pollutionData.aqicn : this.pollutionData.aqius;
        },
        formattedTime() {
            return this.lastUpdated ? new Date(this.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
        },
        formattedDateTime() {
            if (!this.lastUpdated) return 'Syncing live sensor...';
            return new Date(this.lastUpdated).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        weatherIconUrl() {
            if (!this.weatherData?.ic) return '';
            return `https://openweathermap.org/img/wn/${this.weatherData.ic}@2x.png`;
        },
        windSpeedKmh() {
            if (!this.weatherData?.ws) return 0;
            return Math.round(this.weatherData.ws * 3.6);
        },
        dispersionRating() {
            const ws = this.weatherData?.ws || 0;
            if (ws >= 4) {
                return { label: 'Strong Dispersion', note: 'Breeze actively clearing air' };
            }
            if (ws >= 2) {
                return { label: 'Moderate Airflow', note: 'Steady pollutant ventilation' };
            }
            return { label: 'Calm / Stagnant', note: 'Low wind allows particulates to linger' };
        },
        estimatedPm25() {
            if (!this.pollutionData) return 0;
            const aqi = this.pollutionData.aqius;
            if (aqi <= 50) return Math.round((aqi / 50) * 12 * 10) / 10;
            if (aqi <= 100) return Math.round((12.1 + ((aqi - 51) / 49) * (35.4 - 12.1)) * 10) / 10;
            if (aqi <= 150) return Math.round((35.5 + ((aqi - 101) / 49) * (55.4 - 35.5)) * 10) / 10;
            if (aqi <= 200) return Math.round((55.5 + ((aqi - 151) / 49) * (150.4 - 55.5)) * 10) / 10;
            if (aqi <= 300) return Math.round((150.5 + ((aqi - 201) / 99) * (250.4 - 150.5)) * 10) / 10;
            return Math.round(250.5 + (aqi - 300) * 0.8);
        },
        pm25WhoComparison() {
            const pm = this.estimatedPm25;
            if (pm <= 15) return 'Meets WHO 24h target';
            const ratio = (pm / 15).toFixed(1);
            return `${ratio}× WHO 24h guideline`;
        },
        outdoorSafetyBadge() {
            if (!this.pollutionData) return 'Checking';
            const aqi = this.pollutionData.aqius;
            if (aqi <= 50) return 'Safe Outdoors';
            if (aqi <= 100) return 'Generally Safe';
            if (aqi <= 150) return 'Limit Exertion';
            if (aqi <= 200) return 'Avoid Exertion';
            return 'Stay Indoors';
        },
        maskRecommendationShort() {
            if (!this.pollutionData) return '';
            const aqi = this.pollutionData.aqius;
            if (aqi <= 100) return 'No mask required';
            if (aqi <= 150) return 'KN95 for sensitive';
            return 'Wear KN95/N95 mask';
        },
        aqiDescription() {
            if (!this.pollutionData) return null;
            return this.getAqiDescription(this.pollutionData.aqius);
        },
        activeAqiLevel() {
            if (!this.pollutionData) return null;
            return (
                this.aqiLevels.find(
                    level => this.pollutionData.aqius >= level.min && this.pollutionData.aqius <= level.max
                ) || this.aqiLevels[this.aqiLevels.length - 1]
            );
        },
        inspectedLevelIndex() {
            if (this.selectedLevelIndex !== null) return this.selectedLevelIndex;
            if (!this.pollutionData) return 0;
            const idx = this.aqiLevels.findIndex(
                level => this.pollutionData.aqius >= level.min && this.pollutionData.aqius <= level.max
            );
            return idx >= 0 ? idx : 0;
        },
        inspectedLevelDetails() {
            const level = this.aqiLevels[this.inspectedLevelIndex] || this.aqiLevels[0];
            const desc = this.getAqiDescription(level.min + 5);
            return {
                ...level,
                ...desc
            };
        },
        aqiMarkerPosition() {
            if (!this.pollutionData) return 0;
            return Math.min(Math.max((this.pollutionData.aqius / 350) * 100, 3), 97);
        },
        aqiPercentage() {
            if (!this.pollutionData) return 0;
            return Math.min(Math.max(this.pollutionData.aqius / 300, 0.06), 1);
        },
        aqiEmoji() {
            if (!this.pollutionData) return '⏳';
            const aqi = this.pollutionData.aqius;
            if (aqi <= 50) return '😊';
            if (aqi <= 100) return '🙂';
            if (aqi <= 150) return '😐';
            if (aqi <= 200) return '😷';
            if (aqi <= 300) return '🤢';
            return '☠️';
        },
        heroBannerGradient() {
            if (!this.pollutionData) return 'bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-700';
            const aqi = this.pollutionData.aqius;
            if (aqi <= 50) return 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700';
            if (aqi <= 100) return 'bg-gradient-to-br from-amber-500 via-orange-500 to-teal-700';
            if (aqi <= 150) return 'bg-gradient-to-br from-orange-600 via-red-600 to-rose-800';
            if (aqi <= 200) return 'bg-gradient-to-br from-red-600 via-rose-700 to-slate-900';
            if (aqi <= 300) return 'bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-950';
            return 'bg-gradient-to-br from-rose-900 via-red-950 to-slate-950';
        },
        aqiTextColor() {
            if (!this.pollutionData) return 'text-emerald-600 dark:text-emerald-400';
            const aqi = this.pollutionData.aqius;
            if (aqi <= 50) return 'text-emerald-600 dark:text-emerald-400';
            if (aqi <= 100) return 'text-amber-600 dark:text-amber-400';
            if (aqi <= 150) return 'text-orange-600 dark:text-orange-400';
            if (aqi <= 200) return 'text-red-600 dark:text-red-400';
            if (aqi <= 300) return 'text-purple-600 dark:text-purple-400';
            return 'text-rose-800 dark:text-rose-300';
        },
        protectiveActions() {
            const aqi = this.pollutionData?.aqius || 0;
            return [
                {
                    icon: '😷',
                    title: 'Mask & Respirator Guidance',
                    status: aqi <= 100 ? 'Not Needed' : aqi <= 150 ? 'Sensitive Groups' : 'KN95 / N95 Required',
                    badgeClass:
                        aqi <= 100
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                            : aqi <= 150
                            ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                            : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
                    advice:
                        aqi <= 100
                            ? 'Clean ambient air — no respiratory mask is required for walking or commuting.'
                            : aqi <= 150
                            ? 'Consider wearing a fitted KN95 mask if commuting in heavy traffic or if you have asthma.'
                            : 'Wear a high-filtration KN95 or N95 respirator whenever stepping outdoors.'
                },
                {
                    icon: '🪟',
                    title: 'Home Ventilation & Windows',
                    status: aqi <= 85 ? 'Open Windows' : 'Keep Closed',
                    badgeClass:
                        aqi <= 85
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
                    advice:
                        aqi <= 85
                            ? 'Great time to open windows and circulate fresh breeze through indoor rooms.'
                            : 'Keep windows closed against outdoor haze and run a HEPA air purifier if available.'
                },
                {
                    icon: '🏃',
                    title: 'Outdoor Exercise & Sports',
                    status: aqi <= 50 ? 'Ideal' : aqi <= 100 ? 'Normal' : 'Indoor Workout',
                    badgeClass:
                        aqi <= 100
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
                    advice:
                        aqi <= 100
                            ? 'Safe for riverside jogging, cycling, and outdoor stadium sports.'
                            : 'Reduce heavy outdoor cardio exertion; opt for an indoor gym or light stretching.'
                },
                {
                    icon: '👶',
                    title: 'Children & Sensitive Groups',
                    status: aqi <= 50 ? 'No Restrictions' : aqi <= 100 ? 'Monitor' : 'Extra Care',
                    badgeClass:
                        aqi <= 50
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                            : aqi <= 100
                            ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300'
                            : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
                    advice:
                        aqi <= 100
                            ? 'Safe for school playground activities and family park visits.'
                            : 'Limit prolonged outdoor recess for children, elderly, and those with respiratory sensitivity.'
                }
            ];
        },
        nextCheckTime() {
            if (!this.nextCheckTimestamp) return '--:--';
            const now = this.currentTime;
            const diff = this.nextCheckTimestamp - now;
            if (diff <= 0) return 'Checking now...';
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
            if (minutes > 0) return `${minutes}m ${seconds}s`;
            return `${seconds}s`;
        }
    },
    created() {
        this.loadTelegramSettings();
        this.fetchPollutionData();
        this.startAutoCheck();
        this.startCountdown();
    },
    beforeUnmount() {
        this.stopAutoCheck();
        this.stopCountdown();
    },
    methods: {
        formatTemp(celsius) {
            if (celsius === undefined || celsius === null || Number.isNaN(celsius)) return 0;
            if (this.tempUnit === 'F') {
                return Math.round((celsius * 9) / 5 + 32);
            }
            return Math.round(celsius);
        },
        getApiUrl() {
            const apiKey = process.env.VUE_APP_AIR_QUALITY_API_KEY || this.defaultApiKey;
            if (this.selectedHub && !this.selectedHub.isDefaultCity && this.selectedHub.lat && this.selectedHub.lon) {
                return `https://api.airvisual.com/v2/nearest_city?lat=${this.selectedHub.lat}&lon=${this.selectedHub.lon}&key=${apiKey}`;
            }
            return `https://api.airvisual.com/v2/city?city=Phnom%20Penh&state=Phnom%20Penh&country=Cambodia&key=${apiKey}`;
        },
        selectCambodiaHub(hub) {
            this.selectedHub = { ...hub };
            this.selectedLevelIndex = null;
            this.fetchPollutionData();
        },
        useMyLocation() {
            if (!navigator.geolocation) {
                this.error = 'Geolocation is not supported by your browser.';
                return;
            }
            this.locating = true;
            navigator.geolocation.getCurrentPosition(
                pos => {
                    this.locating = false;
                    this.selectedHub = {
                        name: 'Nearest Station',
                        khmer: 'ស្ថានីយ៍ជិតបំផុត',
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                        emoji: '📍',
                        region: `GPS (${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E)`,
                        isDefaultCity: false
                    };
                    this.fetchPollutionData();
                },
                () => {
                    this.locating = false;
                    this.showAlertStatus(false, 'Location permission denied. Using selected Cambodia hub.');
                },
                { timeout: 10000 }
            );
        },
        async fetchPollutionData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch(this.getApiUrl());
                if (!response.ok) {
                    if (response.status === 402 || response.status === 429) {
                        throw new Error('API key payment required or rate limit exceeded. Please try again in a moment.');
                    }
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();
                if (data.status !== 'success' || !data.data?.current?.pollution) {
                    throw new Error(data.data?.message || 'API returned unsuccessful status');
                }
                this.cityInfo = {
                    city: data.data.city || this.selectedHub.name,
                    state: data.data.state || this.selectedHub.name,
                    country: data.data.country || 'Cambodia'
                };
                if (this.selectedHub.name === 'Nearest Station' && data.data.city) {
                    this.selectedHub.name = data.data.city;
                }
                this.pollutionData = data.data.current.pollution;
                this.weatherData = data.data.current.weather;
                this.lastUpdated = data.data.current.pollution.ts || new Date().toISOString();
                if (
                    this.telegramSettings.enabled &&
                    this.telegramSettings.botToken &&
                    this.telegramSettings.chatId &&
                    this.pollutionData?.aqius >= parseInt(this.telegramSettings.threshold)
                ) {
                    this.autoSendAlert();
                }
            } catch (error) {
                logger.error('Error fetching air quality data:', error);
                this.error = error.message || 'Failed to load air quality data. Please check your API key configuration and try again.';
            } finally {
                this.loading = false;
            }
        },
        getAqiDescription(aqi) {
            if (aqi <= 50) {
                return {
                    title: 'Excellent Air Quality',
                    description: 'The air is fresh and clean. Air pollution poses little or no risk to health — ideal for all outdoor activities.',
                    recommendations: 'Perfect conditions for outdoor exercise, cycling, and riverside walks. Open windows to ventilate indoor spaces naturally.',
                    sensitiveGroups: 'Everyone can safely enjoy outdoor activities without restrictions for any age group or respiratory condition.'
                };
            }
            if (aqi <= 100) {
                return {
                    title: 'Acceptable Air Quality',
                    description: 'Air quality is generally acceptable, though a small number of unusually sensitive individuals may notice mild respiratory irritation.',
                    recommendations: 'Most people can enjoy normal outdoor activities. Consider reducing intense prolonged exertion near heavy traffic.',
                    sensitiveGroups: 'Individuals with asthma or respiratory sensitivities should monitor symptoms during extended outdoor workouts.'
                };
            }
            if (aqi <= 150) {
                return {
                    title: 'Unhealthy for Sensitive Groups',
                    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
                    recommendations: 'Take more breaks during vigorous outdoor activities. Keep windows closed near busy roadways.',
                    sensitiveGroups: 'Children, elderly, and people with heart or lung disease should limit prolonged or heavy outdoor exertion.'
                };
            }
            if (aqi <= 200) {
                return {
                    title: 'Unhealthy Air Quality',
                    description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.',
                    recommendations: 'Avoid prolonged or heavy outdoor exertion. Wear a KN95/N95 respirator outdoors and run indoor air filtration.',
                    sensitiveGroups: 'Sensitive groups should avoid all outdoor physical activity and remain indoors in clean air.'
                };
            }
            if (aqi <= 300) {
                return {
                    title: 'Very Unhealthy Air Quality',
                    description: 'Health alert: everyone may experience more serious health effects from elevated particulate levels.',
                    recommendations: 'Avoid all outdoor physical activity. Keep windows sealed and use HEPA air purifiers indoors.',
                    sensitiveGroups: 'All sensitive groups must remain indoors and keep relief medication readily accessible.'
                };
            }
            return {
                title: 'Hazardous Air Quality',
                description: 'Health emergency conditions! The entire population is likely to be affected by severe pollution.',
                recommendations: 'Remain indoors with windows and doors sealed. Wear an N95 respirator if stepping outside is unavoidable.',
                sensitiveGroups: 'Extremely dangerous for all groups. Seek medical attention if experiencing shortness of breath or chest discomfort.'
            };
        },
        loadTelegramSettings() {
            const saved = localStorage.getItem('airQualityTelegramSettings');
            if (saved) {
                try {
                    this.telegramSettings = JSON.parse(saved);
                } catch (e) {
                    logger.error('Failed to load telegram settings:', e);
                }
            }
        },
        saveSettings() {
            localStorage.setItem('airQualityTelegramSettings', JSON.stringify(this.telegramSettings));
        },
        startAutoCheck() {
            this.stopAutoCheck();
            const interval = parseInt(this.telegramSettings.checkInterval);
            if (interval <= 0 || !this.telegramSettings.enabled) {
                this.nextCheckTimestamp = null;
                return;
            }
            const intervalMs = interval * 60 * 1000;
            this.nextCheckTimestamp = Date.now() + intervalMs;
            this.autoCheckTimer = setInterval(() => {
                this.performAutoCheck();
                this.nextCheckTimestamp = Date.now() + intervalMs;
            }, intervalMs);
        },
        startCountdown() {
            this.stopCountdown();
            this.countdownTimer = setInterval(() => {
                this.currentTime = Date.now();
            }, 1000);
        },
        stopCountdown() {
            if (this.countdownTimer) {
                clearInterval(this.countdownTimer);
                this.countdownTimer = null;
            }
        },
        stopAutoCheck() {
            if (this.autoCheckTimer) {
                clearInterval(this.autoCheckTimer);
                this.autoCheckTimer = null;
                this.nextCheckTimestamp = null;
            }
        },
        updateAutoCheck() {
            this.saveSettings();
            if (this.telegramSettings.enabled && parseInt(this.telegramSettings.checkInterval) > 0) {
                this.startAutoCheck();
                this.showAlertStatus(true, `✅ Auto-check enabled: every ${this.telegramSettings.checkInterval} minutes`);
            } else {
                this.stopAutoCheck();
                this.nextCheckTimestamp = null;
                this.showAlertStatus(true, '🔴 Auto-check disabled');
            }
        },
        async performAutoCheck() {
            try {
                const response = await fetch(this.getApiUrl());
                if (!response.ok) throw new Error('API request failed');
                const data = await response.json();
                if (data.status !== 'success' || !data.data?.current?.pollution) throw new Error('API returned unsuccessful');
                this.cityInfo = {
                    city: data.data.city,
                    state: data.data.state,
                    country: data.data.country
                };
                this.pollutionData = data.data.current.pollution;
                this.weatherData = data.data.current.weather;
                this.lastUpdated = data.data.current.pollution.ts || new Date().toISOString();
                const aqi = this.pollutionData.aqius;
                const threshold = parseInt(this.telegramSettings.threshold);
                if (aqi >= threshold) {
                    const lastAlertTime = localStorage.getItem('lastAirQualityAlert');
                    const oneHour = 60 * 60 * 1000;
                    if (!lastAlertTime || Date.now() - parseInt(lastAlertTime) >= oneHour) {
                        await this.sendDangerAlert(true);
                        localStorage.setItem('lastAirQualityAlert', Date.now().toString());
                    }
                }
            } catch (error) {
                logger.error('Auto-check error:', error);
            }
        },
        async sendTestAlert() {
            if (!this.telegramSettings.botToken || !this.telegramSettings.chatId) {
                this.showAlertStatus(false, 'Please enter Bot Token and Chat ID first');
                return;
            }
            this.sendingAlert = true;
            const message = `🧪 *Test Alert - Air Quality Monitor*\n\n✅ Your Telegram alerts are working!\n\n📊 *Current Status:*\n• AQI: ${this.pollutionData?.aqius || 'N/A'}\n• Level: ${this.pollutionData ? this.getAqiLevel(this.pollutionData.aqius) : 'N/A'}\n• Location: ${this.cityInfo.city}, ${this.cityInfo.country}\n\n⚙️ *Your Settings:*\n• Alert Threshold: AQI ${this.telegramSettings.threshold}+\n• Status: ${this.telegramSettings.enabled ? 'Enabled' : 'Disabled'}\n\n_You will receive alerts when AQI exceeds your threshold._`;
            await this.sendTelegramMessage(message);
        },
        async checkAndAlert() {
            if (!this.pollutionData) {
                this.showAlertStatus(false, 'No air quality data available');
                return;
            }
            if (this.pollutionData.aqius >= parseInt(this.telegramSettings.threshold)) {
                await this.sendDangerAlert();
            } else {
                this.showAlertStatus(true, `AQI is ${this.pollutionData.aqius} — below your threshold of ${this.telegramSettings.threshold}. No alert needed.`);
            }
        },
        async autoSendAlert() {
            const lastAlertTime = localStorage.getItem('lastAirQualityAlert');
            const oneHour = 60 * 60 * 1000;
            if (lastAlertTime && Date.now() - parseInt(lastAlertTime) < oneHour) {
                return;
            }
            await this.sendDangerAlert(true);
            localStorage.setItem('lastAirQualityAlert', Date.now().toString());
        },
        async sendDangerAlert(isAuto = false) {
            this.sendingAlert = true;
            const aqi = this.pollutionData.aqius;
            const level = this.getAqiLevel(aqi);
            const emoji = aqi <= 100 ? '🟡' : aqi <= 150 ? '🟠' : aqi <= 200 ? '🔴' : aqi <= 300 ? '🟣' : '☠️';
            const message = `${emoji} *AIR QUALITY ALERT* ${emoji}\n\n⚠️ *${level.toUpperCase()}*\n\n📊 *Current Readings:*\n• AQI: *${aqi}* (Threshold: ${this.telegramSettings.threshold})\n• Main Pollutant: ${this.formatPollutantName(this.pollutionData.mainus)}\n• Location: ${this.cityInfo.city}, ${this.cityInfo.country}\n\n🌡️ *Weather:*\n• Temperature: ${this.weatherData?.tp || 'N/A'}°C\n• Humidity: ${this.weatherData?.hu || 'N/A'}%\n• Wind: ${this.weatherData?.ws || 'N/A'} m/s\n\n💡 *Health Advice:*\n${this.getHealthAdvice(this.pollutionData.mainus, aqi)}\n\n⏰ Updated: ${new Date().toLocaleString()}\n${isAuto ? '_This is an automatic alert._' : ''}`;
            await this.sendTelegramMessage(message);
        },
        async sendTelegramMessage(message) {
            try {
                const url = `https://api.telegram.org/bot${this.telegramSettings.botToken}/sendMessage`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: this.telegramSettings.chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });
                const data = await response.json();
                if (data.ok) {
                    this.showAlertStatus(true, '✅ Alert sent to Telegram successfully!');
                } else {
                    throw new Error(data.description || 'Failed to send message');
                }
            } catch (error) {
                logger.error('Telegram API error:', error);
                this.showAlertStatus(false, `❌ Failed: ${error.message}`);
            } finally {
                this.sendingAlert = false;
            }
        },
        showAlertStatus(success, message) {
            this.alertStatus = { show: true, success, message };
            setTimeout(() => {
                this.alertStatus.show = false;
            }, 5000);
        },
        getAqiLevel(aqi) {
            if (aqi <= 50) return 'Good';
            if (aqi <= 100) return 'Moderate';
            if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
            if (aqi <= 200) return 'Unhealthy';
            if (aqi <= 300) return 'Very Unhealthy';
            return 'Hazardous';
        },
        formatPollutantName(key) {
            const names = {
                p1: 'Coarse Particulate Matter (PM10)',
                p2: 'Fine Particulate Matter (PM2.5)',
                o3: 'Ground-Level Ozone (O₃)',
                n2: 'Nitrogen Dioxide (NO₂)',
                s2: 'Sulfur Dioxide (SO₂)',
                co: 'Carbon Monoxide (CO)'
            };
            return names[key] || key;
        },
        formatPollutantShort(key) {
            const names = { p1: 'PM10', p2: 'PM2.5', o3: 'O₃', n2: 'NO₂', s2: 'SO₂', co: 'CO' };
            return names[key] || key || 'PM2.5';
        },
        getHealthAdvice(pollutant, aqi) {
            if (aqi <= 50) return 'Clean air quality — no health impacts expected. Enjoy all outdoor activities freely.';
            if (pollutant === 'p2' || pollutant === 'p1') {
                if (aqi <= 100) return 'Fine particles are within moderate limits. Sensitive individuals should avoid heavy traffic corridors.';
                if (aqi <= 150) return 'Elevated fine particulate matter — sensitive groups should reduce prolonged outdoor exertion.';
                return 'High particulate concentration — wear a fitted KN95/N95 respirator outdoors and run indoor HEPA filtration.';
            }
            if (pollutant === 'o3') {
                return 'Ground-level ozone peaks in sunny afternoon hours — schedule outdoor exercise for early morning.';
            }
            return 'Consider reducing prolonged outdoor exertion if you experience coughing or throat irritation.';
        },
        getWindDirection(degrees) {
            if (degrees === undefined || degrees === null) return 'Calm';
            if (degrees >= 337.5 || degrees < 22.5) return 'North';
            if (degrees >= 22.5 && degrees < 67.5) return 'Northeast';
            if (degrees >= 67.5 && degrees < 112.5) return 'East';
            if (degrees >= 112.5 && degrees < 157.5) return 'Southeast';
            if (degrees >= 157.5 && degrees < 202.5) return 'South';
            if (degrees >= 202.5 && degrees < 247.5) return 'Southwest';
            if (degrees >= 247.5 && degrees < 292.5) return 'West';
            return 'Northwest';
        }
    }
};
</script>

<style scoped>
.font-khmer {
    font-family: 'Kantumruy Pro', 'Hanuman', sans-serif;
}

.scrollbar-thin::-webkit-scrollbar {
    height: 5px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.35);
    border-radius: 9999px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.55);
}
</style>
