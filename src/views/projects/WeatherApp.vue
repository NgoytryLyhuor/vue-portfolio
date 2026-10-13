<template>
    <div class="min-h-screen bg-slate-50/80 dark:bg-[#030816] text-slate-900 dark:text-slate-100 pb-20 pt-20 md:pt-24 relative overflow-hidden">
        <!-- Ambient Decorative Background Glows -->
        <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
            <div class="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/3 -left-32 w-[26rem] h-[26rem] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-amber-500/10 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Top Header & Controls -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-400/10 border border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide uppercase mb-3">
                        <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                        <span>Cambodia Weather &amp; Seasonal Intelligence</span>
                        <span class="text-sky-400 dark:text-sky-500">•</span>
                        <span class="font-khmer">ឧតុនិយម និងរដូវកាលកម្ពុជា</span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-3">
                        <span>Atmospheric Forecast</span>
                        <span class="text-lg sm:text-xl font-normal text-slate-500 dark:text-slate-400 hidden sm:inline">|</span>
                        <span class="text-lg sm:text-xl font-semibold bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-500 dark:from-sky-400 dark:via-indigo-400 dark:to-teal-300 bg-clip-text text-transparent">
                            {{ currentDate }}
                        </span>
                    </h1>
                </div>

                <!-- Search, GPS, Unit Toggle & Refresh -->
                <div class="flex flex-wrap items-center gap-2.5">
                    <form @submit.prevent="searchCity" class="relative flex-1 sm:flex-initial sm:w-64">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search any city..."
                            class="w-full pl-9 pr-16 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-sm transition-all"
                        />
                        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button
                            v-if="searchQuery.trim()"
                            type="submit"
                            class="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
                        >
                            Go
                        </button>
                    </form>

                    <!-- My Location GPS Button -->
                    <button
                        @click="useMyLocation"
                        :disabled="locating || loading"
                        title="Use my current location"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
                    >
                        <svg class="w-4 h-4 text-sky-500" :class="{ 'animate-spin': locating }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="hidden sm:inline">{{ locating ? 'Locating...' : 'My Location' }}</span>
                    </button>

                    <!-- Temperature Unit Toggle (°C / °F) -->
                    <div class="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                        <button
                            @click="unit = 'C'"
                            :class="unit === 'C' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            °C
                        </button>
                        <button
                            @click="unit = 'F'"
                            :class="unit === 'F' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                            °F
                        </button>
                    </div>

                    <!-- Refresh Button -->
                    <button
                        @click="fetchWeatherData"
                        :disabled="loading"
                        title="Refresh weather data"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-sky-500/20 transition-all disabled:opacity-50"
                    >
                        <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span class="hidden sm:inline">Refresh</span>
                    </button>
                </div>
            </div>

            <!-- Cambodia Quick-Select Cities Bar -->
            <div class="mb-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <div class="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 shrink-0 flex items-center gap-1.5">
                        <span>🇰🇭</span>
                        <span>Cambodia Hubs:</span>
                    </span>
                    <button
                        v-for="city in cambodiaCities"
                        :key="city.name"
                        @click="selectPresetCity(city)"
                        :class="[
                            location.name.toLowerCase() === city.name.toLowerCase()
                                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 border-transparent'
                                : 'bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-400/40'
                        ]"
                        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0"
                    >
                        <span>{{ city.emoji }}</span>
                        <span>{{ city.name }}</span>
                        <span class="font-khmer text-[11px] opacity-80">{{ city.khmer }}</span>
                    </button>
                </div>
            </div>

            <!-- Loading Skeleton State -->
            <div v-if="loading && !currentWeather.icon" class="space-y-6">
                <div class="h-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 animate-pulse flex flex-col justify-between">
                    <div class="flex justify-between">
                        <div class="space-y-3">
                            <div class="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            <div class="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                        <div class="h-20 w-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div v-for="i in 4" :key="i" class="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>
                </div>
            </div>

            <!-- Error Banner -->
            <div v-else-if="error" class="rounded-3xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 p-8 text-center my-8">
                <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Unable to Load Weather Data</h2>
                <p class="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">{{ error }}</p>
                <div class="flex justify-center gap-3">
                    <button @click="selectPresetCity(cambodiaCities[0])" class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        Reset to Phnom Penh
                    </button>
                    <button @click="fetchWeatherData" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-colors">
                        Try Again
                    </button>
                </div>
            </div>

            <!-- Main Weather Dashboard -->
            <div v-else class="space-y-6">
                <!-- Active Weather Alerts Banner (if any) -->
                <div v-if="alerts.length > 0" class="rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-start gap-3.5">
                        <div class="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div class="space-y-1">
                            <div v-for="(alert, index) in alerts" :key="index">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">{{ alert.title }}</span>
                                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold">{{ alert.time }}</span>
                                </div>
                                <p class="text-xs sm:text-sm text-amber-800/90 dark:text-amber-200/80">{{ alert.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hero Weather & Solar Arc Card -->
                <div class="relative rounded-3xl overflow-hidden shadow-xl border border-white/15" :class="weatherGradient">
                    <!-- Decorative Pattern Overlay -->
                    <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_60%)]"></div>
                    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div class="relative z-10 p-6 sm:p-8 lg:p-10 text-white">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <!-- Left: Location & Primary Temperature -->
                            <div class="lg:col-span-7 space-y-6">
                                <div class="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <div class="flex items-center gap-2.5 flex-wrap">
                                            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
                                                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-sky-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                </svg>
                                                <span>{{ location.name }}</span>
                                            </h2>
                                            <span v-if="location.khmer" class="font-khmer text-lg sm:text-xl font-semibold px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md">
                                                {{ location.khmer }}
                                            </span>
                                            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-md">
                                                {{ location.country || 'KH' }}
                                            </span>
                                        </div>
                                        <p class="text-xs sm:text-sm text-white/80 mt-1.5 flex items-center gap-3 flex-wrap">
                                            <span v-if="location.region">{{ location.region }}</span>
                                            <span>•</span>
                                            <span>Lat {{ Number(location.lat).toFixed(2) }}°N, Lon {{ Number(location.lon).toFixed(2) }}°E</span>
                                            <span v-if="lastUpdated" class="hidden sm:inline">• Updated {{ lastUpdated }}</span>
                                        </p>
                                    </div>
                                </div>

                                <!-- Big Temperature & Weather Icon Row -->
                                <div class="flex flex-wrap items-center gap-6 sm:gap-8">
                                    <div class="flex items-center gap-3">
                                        <img
                                            v-if="currentWeather.icon"
                                            :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`"
                                            :alt="currentWeather.condition"
                                            class="w-24 h-24 sm:w-28 sm:h-28 -my-4 drop-shadow-lg"
                                        />
                                        <div>
                                            <div class="text-6xl sm:text-7xl font-black tracking-tighter leading-none">
                                                {{ formatTemp(currentWeather.temp) }}°<span class="text-3xl sm:text-4xl font-bold opacity-80">{{ unit }}</span>
                                            </div>
                                            <p class="text-lg sm:text-xl font-bold capitalize mt-1 text-white/95">
                                                {{ currentWeather.condition }}
                                            </p>
                                        </div>
                                    </div>

                                    <!-- High/Low & Comfort Pills -->
                                    <div class="flex flex-col gap-2 pl-0 sm:pl-6 sm:border-l border-white/20">
                                        <div class="flex items-center gap-3 text-sm font-semibold">
                                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm">
                                                <span class="text-amber-200">↑</span> H: {{ formatTemp(todayMaxTemp) }}°
                                            </span>
                                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm">
                                                <span class="text-sky-200">↓</span> L: {{ formatTemp(todayMinTemp) }}°
                                            </span>
                                        </div>
                                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-sm text-xs sm:text-sm font-medium">
                                            <span>Feels like <strong class="font-bold">{{ formatTemp(currentWeather.feels_like) }}°{{ unit }}</strong></span>
                                            <span>•</span>
                                            <span class="font-semibold text-amber-200">{{ thermalComfortLabel }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- 4 Quick Hero Metrics -->
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">Humidity</div>
                                        <div class="text-xl font-extrabold mt-0.5">{{ currentWeather.humidity }}%</div>
                                        <div class="text-[11px] text-white/80 mt-0.5">Dew point {{ formatTemp(currentWeather.dew_point) }}°</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">Wind &amp; Dir</div>
                                        <div class="text-xl font-extrabold mt-0.5">{{ Math.round(currentWeather.wind_speed) }} <span class="text-xs font-normal">km/h</span></div>
                                        <div class="text-[11px] text-white/80 mt-0.5">From {{ windDirectionCardinal }} ({{ currentWeather.wind_deg }}°)</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">UV Index</div>
                                        <div class="text-xl font-extrabold mt-0.5">{{ uvIndex }} <span class="text-xs font-semibold px-1.5 py-0.5 rounded bg-black/20">{{ uvLevel }}</span></div>
                                        <div class="text-[11px] text-white/80 mt-0.5">Clouds {{ currentWeather.clouds }}%</div>
                                    </div>
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-3.5 border border-white/15">
                                        <div class="text-xs text-white/75 font-medium">Visibility</div>
                                        <div class="text-xl font-extrabold mt-0.5">{{ currentWeather.visibility }} <span class="text-xs font-normal">km</span></div>
                                        <div class="text-[11px] text-white/80 mt-0.5">{{ currentWeather.pressure }} hPa</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Daylight & Solar Arc Tracker + Season Quick Badge -->
                            <div class="lg:col-span-5 flex flex-col justify-between gap-4 bg-black/20 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-xs uppercase tracking-wider text-white/70 font-bold block">Solar Cycle &amp; Daylight</span>
                                        <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">{{ daylightDuration }} of Daylight</h3>
                                    </div>
                                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 border border-amber-300/30 text-amber-200">
                                        {{ sunStatusLabel }}
                                    </span>
                                </div>

                                <!-- Visual Sun Arc / Progress -->
                                <div class="my-2">
                                    <div class="flex justify-between text-xs font-semibold text-white/90 mb-2">
                                        <div class="flex items-center gap-1.5">
                                            <span class="text-base">🌅</span>
                                            <div>
                                                <div class="text-[10px] uppercase text-white/60">Sunrise</div>
                                                <div>{{ formatTime(currentWeather.sunrise) }}</div>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-[10px] uppercase text-white/60">Solar Noon</div>
                                            <div>{{ solarNoonTime }}</div>
                                        </div>
                                        <div class="flex items-center gap-1.5 text-right">
                                            <div>
                                                <div class="text-[10px] uppercase text-white/60">Sunset</div>
                                                <div>{{ formatTime(currentWeather.sunset) }}</div>
                                            </div>
                                            <span class="text-base">🌇</span>
                                        </div>
                                    </div>

                                    <!-- Progress Bar with Glowing Sun -->
                                    <div class="relative h-3 bg-white/15 rounded-full overflow-visible mt-3">
                                        <div
                                            class="h-full bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 rounded-full transition-all duration-700"
                                            :style="{ width: `${sunProgress}%` }"
                                        ></div>
                                        <div
                                            class="w-5 h-5 rounded-full bg-amber-300 border-2 border-white shadow-lg shadow-amber-300/60 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700"
                                            :style="{ left: `${Math.min(98, Math.max(2, sunProgress))}%` }"
                                        ></div>
                                    </div>
                                    <div class="flex justify-between text-[11px] text-white/75 mt-2">
                                        <span>Daylight progress: {{ sunProgress }}%</span>
                                        <span>Cambodia Season: <strong>{{ currentSeason.name }}</strong></span>
                                    </div>
                                </div>

                                <!-- Quick Cambodian Season Summary Pill -->
                                <div class="rounded-xl bg-white/10 p-3.5 border border-white/10 flex items-center justify-between gap-3">
                                    <div class="flex items-center gap-3">
                                        <div class="text-2xl">{{ isRainySeason ? '🌧️' : '☀️' }}</div>
                                        <div>
                                            <div class="text-xs font-bold text-white flex items-center gap-2">
                                                <span>{{ currentSeason.name }}</span>
                                                <span class="text-[11px] font-normal text-white/75">({{ currentSeason.dateRange }})</span>
                                            </div>
                                            <p class="text-xs text-white/80 line-clamp-1 mt-0.5">
                                                {{ isRainySeason ? 'Monsoon rains, lush green landscapes & afternoon showers' : 'Golden harvest skies, cool mornings & festive evenings' }}
                                            </p>
                                        </div>
                                    </div>
                                    <a href="#cambodia-season-guide" class="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold shrink-0 transition-colors">
                                        Guide ↓
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 12-Column Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <!-- LEFT 8 COLUMNS: Hourly Forecast, 7-Day Interactive Forecast & Cambodian Season Guide -->
                    <div class="lg:col-span-8 space-y-6">
                        <!-- 1. 24-Hour (3-Hour Step) Forecast Card -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-sky-500"></span>
                                        <span>Upcoming 3-Hour Interval Forecast</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Track temperature shifts, rain probability, and wind speed over the next 36 hours
                                    </p>
                                </div>

                                <!-- Metric Filter Pills -->
                                <div class="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 self-start sm:self-auto">
                                    <button
                                        v-for="mode in hourlyModes"
                                        :key="mode.id"
                                        @click="hourlyViewMode = mode.id"
                                        :class="hourlyViewMode === mode.id ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'"
                                        class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                                    >
                                        {{ mode.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Horizontal Scrollable Hourly Cards -->
                            <div class="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
                                <div
                                    v-for="(hour, idx) in hourlyForecast"
                                    :key="idx"
                                    :class="idx === 0 ? 'bg-gradient-to-b from-sky-500/15 to-indigo-500/10 border-sky-500/40 dark:border-sky-400/40' : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/50'"
                                    class="min-w-[104px] rounded-2xl p-3.5 border flex flex-col items-center text-center transition-all hover:-translate-y-0.5 shrink-0"
                                >
                                    <span class="text-xs font-bold" :class="idx === 0 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-300'">
                                        {{ idx === 0 ? 'Next' : formatHour(hour.dt) }}
                                    </span>
                                    <span class="text-[10px] text-slate-400 dark:text-slate-500">{{ formatShortDate(hour.dt) }}</span>

                                    <img
                                        :src="`https://openweathermap.org/img/wn/${hour.icon}@2x.png`"
                                        :alt="hour.condition"
                                        class="w-12 h-12 my-1"
                                    />

                                    <!-- Mode-specific Primary Display -->
                                    <div v-if="hourlyViewMode === 'temp'" class="text-lg font-extrabold text-slate-900 dark:text-white">
                                        {{ formatTemp(hour.temp) }}°
                                    </div>
                                    <div v-else-if="hourlyViewMode === 'rain'" class="text-base font-extrabold text-sky-600 dark:text-sky-400">
                                        💧 {{ hour.rain }}%
                                    </div>
                                    <div v-else-if="hourlyViewMode === 'wind'" class="text-sm font-extrabold text-teal-600 dark:text-teal-400">
                                        💨 {{ hour.wind }} km/h
                                    </div>

                                    <!-- Secondary Badge -->
                                    <div class="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 w-full flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                        <span class="flex items-center gap-0.5 text-sky-600 dark:text-sky-400 font-semibold">
                                            💧 {{ hour.rain }}%
                                        </span>
                                        <span>{{ formatTemp(hour.temp) }}°</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Multi-Day Forecast with Interactive Day Inspector -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-indigo-500"></span>
                                        <span>Multi-Day Outlook &amp; Day Inspector</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Click any day below to inspect its detailed temperature range and conditions
                                    </p>
                                </div>
                                <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full self-start sm:self-auto">
                                    {{ forecast.length }}-Day Forecast
                                </span>
                            </div>

                            <div class="space-y-2.5">
                                <div
                                    v-for="(day, index) in forecast"
                                    :key="index"
                                    @click="selectedDayIndex = selectedDayIndex === index ? null : index"
                                    :class="[
                                        selectedDayIndex === index
                                            ? 'bg-sky-50/90 dark:bg-sky-950/30 border-sky-400/60 dark:border-sky-500/50 shadow-sm'
                                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                                    ]"
                                    class="rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer"
                                >
                                    <div class="grid grid-cols-12 items-center gap-2 sm:gap-4">
                                        <!-- Day Name & Date -->
                                        <div class="col-span-4 sm:col-span-3 flex items-center gap-2.5">
                                            <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                                                :class="index === 0 ? 'bg-sky-600 text-white' : 'bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300'">
                                                {{ index === 0 ? 'NOW' : formatWeekdayShort(day.dt) }}
                                            </div>
                                            <div class="min-w-0">
                                                <div class="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                    {{ index === 0 ? 'Today' : formatDayFull(day.dt) }}
                                                </div>
                                                <div class="text-[11px] text-slate-500 dark:text-slate-400 capitalize truncate">
                                                    {{ day.condition }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Icon & Rain Probability -->
                                        <div class="col-span-3 sm:col-span-3 flex items-center justify-center gap-2">
                                            <img
                                                :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
                                                :alt="day.condition"
                                                class="w-10 h-10 -my-1"
                                            />
                                            <span
                                                class="text-xs font-bold px-2 py-0.5 rounded-full"
                                                :class="day.rain >= 50 ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300' : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'"
                                            >
                                                💧 {{ day.rain }}%
                                            </span>
                                        </div>

                                        <!-- Visual Min-Max Temperature Range Bar -->
                                        <div class="col-span-5 sm:col-span-6 flex items-center gap-2.5 sm:gap-3">
                                            <span class="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 w-9 text-right">
                                                {{ formatTemp(day.min_temp) }}°
                                            </span>
                                            <div class="flex-1 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700/80 relative overflow-hidden">
                                                <div
                                                    class="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-orange-500"
                                                    :style="getTempBarStyle(day.min_temp, day.max_temp)"
                                                ></div>
                                            </div>
                                            <span class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white w-9">
                                                {{ formatTemp(day.max_temp) }}°
                                            </span>
                                            <svg
                                                class="w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 hidden sm:block"
                                                :class="{ 'rotate-180 text-sky-500': selectedDayIndex === index }"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Expanded Day Details Drawer -->
                                    <div v-if="selectedDayIndex === index" class="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                        <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                            <span class="text-slate-400 block">Temperature Range</span>
                                            <strong class="text-sm text-slate-800 dark:text-slate-100 mt-0.5 block">
                                                {{ formatTemp(day.min_temp) }}°{{ unit }} – {{ formatTemp(day.max_temp) }}°{{ unit }}
                                            </strong>
                                        </div>
                                        <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                            <span class="text-slate-400 block">Rain Probability</span>
                                            <strong class="text-sm text-sky-600 dark:text-sky-400 mt-0.5 block">
                                                {{ day.rain }}% ({{ day.rain >= 60 ? 'Likely showers' : day.rain >= 30 ? 'Scattered chance' : 'Mostly dry' }})
                                            </strong>
                                        </div>
                                        <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                            <span class="text-slate-400 block">Avg Humidity</span>
                                            <strong class="text-sm text-slate-800 dark:text-slate-100 mt-0.5 block">
                                                {{ day.humidity || currentWeather.humidity }}%
                                            </strong>
                                        </div>
                                        <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800">
                                            <span class="text-slate-400 block">Max Wind Speed</span>
                                            <strong class="text-sm text-slate-800 dark:text-slate-100 mt-0.5 block">
                                                {{ day.wind || Math.round(currentWeather.wind_speed) }} km/h
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Cambodian Seasonal Living & Cultural Guide (Tabbed Interactive Experience) -->
                        <div id="cambodia-season-guide" class="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
                            <!-- Banner Header -->
                            <div class="p-6 sm:p-7 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white relative overflow-hidden">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                                    <div>
                                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
                                            <span>🇰🇭 Cambodian Climate &amp; Heritage</span>
                                            <span>•</span>
                                            <span>{{ activeSeasonData.dateRange }}</span>
                                        </div>
                                        <h3 class="text-2xl sm:text-3xl font-extrabold flex items-center gap-2.5">
                                            <span>{{ activeSeasonKey === 'rainy' ? '🌧️' : '☀️' }}</span>
                                            <span>{{ activeSeasonData.name }}</span>
                                            <span class="font-khmer text-lg sm:text-xl font-normal opacity-90">
                                                ({{ activeSeasonKey === 'rainy' ? 'រដូវវស្សា' : 'រដូវប្រាំង' }})
                                            </span>
                                        </h3>
                                    </div>

                                    <!-- Switch Season Preview Buttons -->
                                    <div class="inline-flex items-center p-1 rounded-xl bg-black/25 backdrop-blur-md self-start sm:self-auto">
                                        <button
                                            @click="selectedSeasonOverride = 'dry'"
                                            :class="activeSeasonKey === 'dry' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'"
                                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                                        >
                                            <span>☀️</span>
                                            <span>Dry Season</span>
                                        </button>
                                        <button
                                            @click="selectedSeasonOverride = 'rainy'"
                                            :class="activeSeasonKey === 'rainy' ? 'bg-sky-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'"
                                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                                        >
                                            <span>🌧️</span>
                                            <span>Rainy Season</span>
                                        </button>
                                    </div>
                                </div>

                                <!-- Season Timeline Progress -->
                                <div class="mt-5 pt-4 border-t border-white/15 relative z-10">
                                    <div class="flex justify-between text-xs font-semibold text-white/90 mb-1.5">
                                        <span>Starts: {{ activeSeasonData.startMonth }}</span>
                                        <span>Current Season Progress: {{ seasonProgress }}%</span>
                                        <span>Ends: {{ activeSeasonData.endMonth }}</span>
                                    </div>
                                    <div class="h-2 bg-black/25 rounded-full overflow-hidden">
                                        <div
                                            class="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-500"
                                            :style="{ width: `${seasonProgress}%` }"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Interactive Tabs Navigation -->
                            <div class="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-slate-50/60 dark:bg-slate-900/50 flex gap-1 overflow-x-auto scrollbar-thin">
                                <button
                                    v-for="tab in seasonTabs"
                                    :key="tab.id"
                                    @click="activeSeasonTab = tab.id"
                                    :class="[
                                        activeSeasonTab === tab.id
                                            ? 'border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300 font-bold'
                                            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                                    ]"
                                    class="py-3.5 px-4 border-b-2 text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all"
                                >
                                    <span>{{ tab.icon }}</span>
                                    <span>{{ tab.label }}</span>
                                </button>
                            </div>

                            <!-- Tab Content Body -->
                            <div class="p-6">
                                <!-- TAB 1: Overview & Activities -->
                                <div v-if="activeSeasonTab === 'overview'" class="space-y-6">
                                    <p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {{ activeSeasonData.description }}
                                    </p>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <!-- Key Characteristics -->
                                        <div class="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200/70 dark:border-slate-700/60">
                                            <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                                <span>✨</span>
                                                <span>Season Characteristics</span>
                                            </h4>
                                            <ul class="space-y-2">
                                                <li
                                                    v-for="(item, i) in activeSeasonData.characteristics"
                                                    :key="i"
                                                    class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2"
                                                >
                                                    <span class="text-teal-500 font-bold mt-0.5">•</span>
                                                    <span>{{ item }}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- Recommended Activities -->
                                        <div class="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200/70 dark:border-slate-700/60">
                                            <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                                <span>🎯</span>
                                                <span>Best Seasonal Activities</span>
                                            </h4>
                                            <div class="flex flex-wrap gap-2">
                                                <span
                                                    v-for="(act, i) in activeSeasonData.activities"
                                                    :key="i"
                                                    class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-sm"
                                                >
                                                    {{ act }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Fun Fact Callout -->
                                    <div class="rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-sky-500/10 border border-teal-500/25 p-4 flex items-start gap-3.5">
                                        <span class="text-2xl shrink-0">💡</span>
                                        <div>
                                            <div class="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Did You Know?</div>
                                            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5">{{ activeSeasonData.funFact }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- TAB 2: Health & Wardrobe -->
                                <div v-else-if="activeSeasonTab === 'health'" class="space-y-6">
                                    <div>
                                        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <span>👕</span>
                                            <span>Recommended Cambodian Wardrobe &amp; Essentials</span>
                                        </h4>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            <div
                                                v-for="(item, i) in activeSeasonData.clothing"
                                                :key="i"
                                                class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3"
                                            >
                                                <span class="text-2xl">{{ item.icon }}</span>
                                                <span class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{{ item.name }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 p-5">
                                        <h4 class="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center gap-2">
                                            <span>🩺</span>
                                            <span>Seasonal Wellness &amp; Safety Tips</span>
                                        </h4>
                                        <ul class="space-y-2.5">
                                            <li
                                                v-for="(tip, i) in activeSeasonData.healthTips"
                                                :key="i"
                                                class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                                            >
                                                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                                    {{ i + 1 }}
                                                </span>
                                                <span>{{ tip }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- TAB 3: Agriculture & Travel -->
                                <div v-else-if="activeSeasonTab === 'agriculture'" class="space-y-5">
                                    <div class="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/50 p-5">
                                        <h4 class="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                                            <span>🌾</span>
                                            <span>Agricultural Cycle &amp; Farming Wisdom</span>
                                        </h4>
                                        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                            {{ activeSeasonData.agricultural_advice }}
                                        </p>
                                        <div class="flex flex-wrap items-center gap-2">
                                            <span class="text-xs font-bold text-amber-800 dark:text-amber-300">Key Crops &amp; Harvest:</span>
                                            <span
                                                v-for="(crop, i) in activeSeasonData.crops"
                                                :key="i"
                                                class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-amber-200 dark:border-amber-800/60"
                                            >
                                                🌱 {{ crop }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-800/50 p-5">
                                        <h4 class="text-sm font-bold text-sky-900 dark:text-sky-300 mb-2 flex items-center gap-2">
                                            <span>🧭</span>
                                            <span>Traveler's Advisory across Cambodia</span>
                                        </h4>
                                        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {{ activeSeasonData.travelTips }}
                                        </p>
                                    </div>
                                </div>

                                <!-- TAB 4: Cambodian Memories & Street Food -->
                                <div v-else-if="activeSeasonTab === 'culture'" class="space-y-6">
                                    <div>
                                        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                            <span>🍜</span>
                                            <span>Beloved Cambodian Seasonal Street Foods &amp; Dishes</span>
                                        </h4>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                            Iconic flavors enjoyed across Cambodian markets and family kitchens
                                        </p>
                                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div
                                                v-for="(food, i) in culturalFoods"
                                                :key="i"
                                                class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3"
                                            >
                                                <span class="text-2xl">{{ food.icon }}</span>
                                                <div>
                                                    <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{{ food.name }}</div>
                                                    <div class="text-[11px] text-slate-500 dark:text-slate-400">{{ food.desc }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                            <span>🏮</span>
                                            <span>Nostalgic Cambodian Countryside Memories</span>
                                        </h4>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                            {{ culturalMemories.intro }}
                                        </p>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div
                                                v-for="(moment, i) in culturalMemories.moments"
                                                :key="i"
                                                class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60"
                                            >
                                                <div class="flex items-center gap-2.5 mb-1.5">
                                                    <span class="text-xl">{{ moment.icon }}</span>
                                                    <h5 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{{ moment.title }}</h5>
                                                </div>
                                                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {{ moment.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT 4 COLUMNS: Outdoor Activity Comfort Advisories & Detailed Telemetry -->
                    <div class="lg:col-span-4 space-y-6">
                        <!-- 1. Smart Daily Activity & Comfort Planner -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                                <span class="w-2 h-5 rounded-full bg-emerald-500"></span>
                                <span>Smart Lifestyle Advisories</span>
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                Real-time guidance based on {{ location.name }}'s current atmosphere
                            </p>

                            <div class="space-y-3">
                                <div
                                    v-for="(item, idx) in lifestyleAdvisories"
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

                        <!-- 2. Detailed Atmospheric Telemetry Cards -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="w-2 h-5 rounded-full bg-amber-500"></span>
                                <span>Atmospheric Telemetry</span>
                            </h3>

                            <!-- UV Index Gauge Card -->
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">☀️ UV Radiation Index</span>
                                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700" :class="uvLevelColor">
                                        {{ uvIndex }} • {{ uvLevel }}
                                    </span>
                                </div>
                                <div class="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-orange-500 to-purple-600 relative my-2.5">
                                    <div
                                        class="w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                        :style="{ left: `${Math.min(96, Math.max(4, (uvIndex / 11) * 100))}%` }"
                                    ></div>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                    {{ uvIndex >= 6 ? 'High solar intensity — wear sunglasses, hat, and SPF 30+ sunscreen.' : uvIndex >= 3 ? 'Moderate UV — seek shade during midday hours.' : 'Low UV index — safe for outdoor activities without extra sun protection.' }}
                                </p>
                            </div>

                            <!-- Wind Speed & Compass Card -->
                            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
                                <div>
                                    <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">🧭 Wind &amp; Vector</span>
                                    <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {{ Math.round(currentWeather.wind_speed) }} <span class="text-xs font-normal text-slate-500">km/h</span>
                                    </div>
                                    <div class="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                        Direction: <strong>{{ windDirectionCardinal }}</strong> ({{ currentWeather.wind_deg }}°)
                                    </div>
                                    <div v-if="currentWeather.wind_gust" class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        Gusts up to {{ Math.round(currentWeather.wind_gust) }} km/h
                                    </div>
                                </div>

                                <!-- Visual Compass Dial -->
                                <div class="w-16 h-16 rounded-full border-2 border-slate-300 dark:border-slate-600 relative flex items-center justify-center bg-white dark:bg-slate-900 shrink-0">
                                    <span class="absolute top-0.5 text-[9px] font-bold text-sky-500">N</span>
                                    <span class="absolute bottom-0.5 text-[9px] font-bold text-slate-400">S</span>
                                    <span class="absolute right-1 text-[9px] font-bold text-slate-400">E</span>
                                    <span class="absolute left-1 text-[9px] font-bold text-slate-400">W</span>
                                    <div
                                        class="w-1 h-6 bg-gradient-to-t from-slate-400 to-sky-500 rounded-full origin-center transition-transform duration-500"
                                        :style="{ transform: `rotate(${currentWeather.wind_deg || 0}deg)` }"
                                    ></div>
                                </div>
                            </div>

                            <!-- 2x2 Secondary Telemetry Grid -->
                            <div class="grid grid-cols-2 gap-3">
                                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <span class="text-[11px] font-bold uppercase text-slate-400 block">💧 Dew Point</span>
                                    <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {{ formatTemp(currentWeather.dew_point) }}°{{ unit }}
                                    </div>
                                    <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                                        {{ currentWeather.dew_point >= 24 ? 'Very Muggy' : currentWeather.dew_point >= 20 ? 'Humid & Sticky' : 'Comfortable' }}
                                    </span>
                                </div>

                                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <span class="text-[11px] font-bold uppercase text-slate-400 block">⏲️ Pressure</span>
                                    <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {{ currentWeather.pressure }} <span class="text-xs font-normal">hPa</span>
                                    </div>
                                    <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                                        {{ currentWeather.pressure < 1008 ? 'Low (Unsettled)' : currentWeather.pressure > 1015 ? 'High (Stable)' : 'Normal Tropical' }}
                                    </span>
                                </div>

                                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <span class="text-[11px] font-bold uppercase text-slate-400 block">☁️ Cloud Cover</span>
                                    <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {{ currentWeather.clouds }}%
                                    </div>
                                    <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                                        {{ currentWeather.clouds > 75 ? 'Overcast sky' : currentWeather.clouds > 35 ? 'Partly cloudy' : 'Mostly clear' }}
                                    </span>
                                </div>

                                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                                    <span class="text-[11px] font-bold uppercase text-slate-400 block">👁️ Visibility</span>
                                    <div class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                                        {{ currentWeather.visibility }} <span class="text-xs font-normal">km</span>
                                    </div>
                                    <span class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                                        {{ currentWeather.visibility >= 9 ? 'Crystal clear' : currentWeather.visibility >= 5 ? 'Moderate haze' : 'Low visibility' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logger from '@/utils/logger';

const SEASON_CATALOG = {
    rainy: {
        name: 'Rainy Season',
        dateRange: 'May - October',
        startMonth: 'May',
        endMonth: 'October',
        description: 'The monsoon season brings life-giving rains to Cambodia. Expect warm, clear mornings followed by dramatic afternoon showers and lush emerald-green rice paddies. The Mekong River swells and reverses the flow of the Tonle Sap Lake, nourishing fisheries and forests across the Kingdom.',
        characteristics: [
            'High humidity levels (75–90%)',
            'Refreshing afternoon monsoon showers',
            'Average temperature: 25–32°C',
            'Peak rainfall in September & October',
            'Vibrant emerald-green countryside & temples',
            'Dramatic cloudscapes ideal for photography'
        ],
        activities: [
            'Morning Angkor temple visits',
            'National Museum & indoor galleries',
            'Khmer traditional spa & wellness',
            'Cambodian cooking classes',
            'Dramatic sky & reflection photography',
            'Tonle Sap floating village cruises',
            'Kulén & Mondulkiri waterfall trips'
        ],
        clothing: [
            { icon: '☔', name: 'Compact umbrella / poncho' },
            { icon: '👟', name: 'Water-resistant footwear' },
            { icon: '🩴', name: 'Quick-dry sandals' },
            { icon: '👕', name: 'Breathable cotton / linen' },
            { icon: '🎒', name: 'Dry bag for electronics' },
            { icon: '🧴', name: 'Natural mosquito repellent' }
        ],
        healthTips: [
            'Stay hydrated despite the humidity — drink plenty of clean water and coconut water',
            'Apply mosquito repellent, especially at dawn and dusk',
            'Walk carefully on ancient sandstone temple steps after rain showers',
            'Keep electronics and travel documents in a zip-pouch or waterproof bag',
            'Plan outdoor excursions for the bright, clear morning hours (6 AM – 1 PM)'
        ],
        agricultural_advice: 'This is the primary rice-planting season across Cambodia. Farmers transplant vibrant green rice seedlings as paddies fill with rainwater. Abundant moisture supports rapid crop growth; farmers maintain dike channels to manage water levels cleanly.',
        crops: ['Wet-season Rice (main crop)', 'Corn', 'Soybeans', 'Mung beans', 'Morning Glory (Water Spinach)', 'Sacred Lotus'],
        travelTips: 'Plan temple explorations and outdoor sightseeing for the mornings. Carry a light rain jacket or umbrella for brief afternoon downpours. Fewer international crowds mean serene temples and great hospitality deals!',
        funFact: 'During the rainy season, the Tonle Sap Lake expands more than fivefold — from 2,500 km² to over 16,000 km² — making it one of the most productive freshwater ecosystems on Earth!'
    },
    dry: {
        name: 'Dry Season',
        dateRange: 'November - April',
        startMonth: 'November',
        endMonth: 'April',
        description: 'The dry season is Cambodia\'s golden time — when cool northeast breezes sweep across golden rice fields ready for harvest. From the joyous Water Festival (Bon Om Touk) in November to Khmer New Year celebrations in April, blue skies and starry evenings define village and city life alike.',
        characteristics: [
            'Cool, crisp morning breezes (especially Nov–Jan)',
            'Golden sunsets painting the sky orange and magenta',
            'Clear, starry nights ideal for outdoor dining',
            'Warm tropical afternoons (Feb–April)',
            'Golden rice harvest landscapes across the plains',
            'Calm turquoise waters along the southern coast & islands'
        ],
        activities: [
            'Sunrise at Angkor Wat',
            'Cycling through countryside villages',
            'Kite flying over harvested fields',
            'Pagoda festivals & wedding celebrations',
            'Riverside night markets & street food',
            'Island hopping in Koh Rong & Kampot',
            'Khmer New Year festivities (April)'
        ],
        clothing: [
            { icon: '🧣', name: 'Krama (traditional checkered scarf)' },
            { icon: '👕', name: 'Light breathable cotton clothes' },
            { icon: '🩴', name: 'Comfortable walking sandals' },
            { icon: '🕶️', name: 'UV-blocking sunglasses' },
            { icon: '👒', name: 'Wide-brimmed sun hat' },
            { icon: '🧴', name: 'Broad-spectrum SPF sunscreen' }
        ],
        healthTips: [
            'Wake early to enjoy the cool morning air before midday warmth builds',
            'Take a shaded rest or indoor break during peak sun hours (12 PM – 3 PM)',
            'Refresh with fresh young coconut water and pressed sugarcane juice (Tuk Ampov)',
            'Use a damp Krama scarf to stay cool while cycling or exploring temples',
            'Enjoy vitamin-rich seasonal fruits: ripe mango, jackfruit, longan, and watermelon'
        ],
        agricultural_advice: 'This is the grand harvest season — the reward for a year of dedication. Families gather to harvest golden rice stalks, bundle them, and store fragrant new grain. Fruit orchards of mango, cashew, and sugar palm reach peak sweetness.',
        crops: ['Fragrant Jasmine Rice (harvest)', 'Keo Romeat Mangoes', 'Palm Sugar', 'Cashew Nuts', 'Watermelon', 'Sweet Corn'],
        travelTips: 'December through February offers the coolest, most comfortable weather for intensive temple trekking and cycling. Book coastal resorts and Siem Reap stays early, and don\'t miss Bon Om Touk in November or Choul Chnam Thmey in April!',
        funFact: 'During Khmer New Year in April, Cambodians build ornate sand stupas at pagodas — each grain of sand symbolizing a wish for merit, peace, and prosperity for family and community.'
    }
};

const CULTURAL_MEMORIES = {
    intro: 'Across both seasons, Cambodian weather shapes cherished family traditions, village rhythms, and timeless childhood memories...',
    moments: [
        {
            icon: '🌅',
            title: 'Morning Mist Over Rice Paddies',
            description: 'Waking up to cool mist hovering over emerald or golden fields while roosters crow and the aroma of steaming Bobor (rice porridge) fills the kitchen.'
        },
        {
            icon: '🪁',
            title: 'Kite Flying in the Harvest Breeze',
            description: 'Running across open fields with handmade bamboo kites (Khlaeng Ek) humming in the wind as children compete to fly the highest before sunset.'
        },
        {
            icon: '🥭',
            title: 'Afternoon Mango Tree Shade',
            description: 'Gathering under grandmother\'s big mango tree during warm afternoons, sharing crisp green mango slices dipped in chili-salt.'
        },
        {
            icon: '💧',
            title: 'Bon Om Touk & River Celebrations',
            description: 'Watching brightly painted longboats race along the Tonle Sap and Mekong rivers while fireworks illuminate the evening sky.'
        }
    ]
};

const TRADITIONAL_FOODS = [
    { icon: '🍚', name: 'Bai Sach Chrouk', desc: 'Charcoal-grilled pork & broken rice' },
    { icon: '🍜', name: 'Nom Banh Chok', desc: 'Khmer rice noodles with green fish curry' },
    { icon: '🥥', name: 'Nom Krok', desc: 'Crispy coconut & scallion rice cakes' },
    { icon: '🥭', name: 'Svay Kralok', desc: 'Fresh green mango with chili salt' },
    { icon: '🥤', name: 'Tuk Ampov', desc: 'Iced kumquat sugarcane juice' },
    { icon: '🍲', name: 'Kuy Teav', desc: 'Aromatic morning pork-bone noodle soup' }
];

export default {
    name: 'WeatherApp',
    data() {
        return {
            apiKey: process.env.VUE_APP_WEATHER_API_KEY || '3504abf6222f69d05c100fa0ef8165bb',
            loading: true,
            locating: false,
            error: null,
            unit: 'C',
            searchQuery: '',
            hourlyViewMode: 'temp',
            selectedDayIndex: 0,
            activeSeasonTab: 'overview',
            selectedSeasonOverride: null,
            hourlyModes: [
                { id: 'temp', label: 'Temp' },
                { id: 'rain', label: 'Rain %' },
                { id: 'wind', label: 'Wind' }
            ],
            seasonTabs: [
                { id: 'overview', label: 'Overview & Activities', icon: '🌿' },
                { id: 'health', label: 'Wardrobe & Wellness', icon: '👕' },
                { id: 'agriculture', label: 'Farming & Travel', icon: '🌾' },
                { id: 'culture', label: 'Memories & Street Food', icon: '🍜' }
            ],
            cambodiaCities: [
                { name: 'Phnom Penh', khmer: 'ភ្នំពេញ', lat: 11.5564, lon: 104.9282, emoji: '🏛️', region: 'Capital & Mekong Confluence' },
                { name: 'Siem Reap', khmer: 'សៀមរាប', lat: 13.3633, lon: 103.8564, emoji: '🛕', region: 'Angkor Archaeological Park' },
                { name: 'Sihanoukville', khmer: 'ព្រះសីហនុ', lat: 10.6275, lon: 103.5221, emoji: '🏖️', region: 'Gulf of Thailand Coast' },
                { name: 'Battambang', khmer: 'បាត់ដំបង', lat: 13.0957, lon: 103.2022, emoji: '🌾', region: 'Northwest Rice Bowl' },
                { name: 'Kampot', khmer: 'កំពត', lat: 10.5942, lon: 104.1640, emoji: '🌶️', region: 'Bokor Mountain & Pepper Coast' },
                { name: 'Kep', khmer: 'កែប', lat: 10.4829, lon: 104.3167, emoji: '🦀', region: 'Coastal Sanctuary' },
                { name: 'Mondulkiri', khmer: 'មណ្ឌលគិរី', lat: 12.4558, lon: 107.1881, emoji: '🌲', region: 'Eastern Highlands (Sen Monorom)' },
                { name: 'Ratanakiri', khmer: 'រតនគិរី', lat: 13.7394, lon: 106.9872, emoji: '🌋', region: 'Yeak Laom Volcanic Lake' },
                { name: 'Kampong Cham', khmer: 'កំពង់ចាម', lat: 11.9934, lon: 105.4635, emoji: '🌉', region: 'Central Mekong Heartland' },
                { name: 'Poipet', khmer: 'ប៉ោយប៉ែត', lat: 13.6580, lon: 102.5636, emoji: '🚉', region: 'Banteay Meanchey Border Hub' }
            ],
            location: {
                name: 'Phnom Penh',
                khmer: 'ភ្នំពេញ',
                country: 'KH',
                region: 'Capital & Mekong Confluence',
                lat: 11.5564,
                lon: 104.9282
            },
            currentWeather: {
                temp: 0,
                feels_like: 0,
                condition: '',
                wind_speed: 0,
                wind_deg: 0,
                wind_gust: 0,
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
            currentSeason: SEASON_CATALOG.dry,
            seasonProgress: 0,
            forecast: [],
            alerts: [],
            uvIndex: 0,
            lastUpdated: '',
            culturalMemories: CULTURAL_MEMORIES,
            culturalFoods: TRADITIONAL_FOODS
        };
    },
    computed: {
        currentDate() {
            return new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        },
        isRainySeason() {
            const month = new Date().getMonth();
            return month >= 4 && month <= 9;
        },
        activeSeasonKey() {
            if (this.selectedSeasonOverride) return this.selectedSeasonOverride;
            return this.isRainySeason ? 'rainy' : 'dry';
        },
        activeSeasonData() {
            return SEASON_CATALOG[this.activeSeasonKey] || this.currentSeason;
        },
        weatherGradient() {
            const hour = new Date().getHours();
            const cond = (this.currentWeather.condition || '').toLowerCase();
            if (cond.includes('rain') || cond.includes('thunder') || cond.includes('drizzle')) {
                return 'bg-gradient-to-br from-slate-700 via-sky-800 to-indigo-900';
            }
            if (hour >= 6 && hour < 11) {
                return 'bg-gradient-to-br from-sky-500 via-teal-500 to-indigo-600';
            } else if (hour >= 11 && hour < 17) {
                return 'bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700';
            } else if (hour >= 17 && hour < 19) {
                return 'bg-gradient-to-br from-orange-500 via-rose-500 to-indigo-800';
            } else {
                return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950';
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
        daylightDuration() {
            if (!this.currentWeather.sunrise || !this.currentWeather.sunset) return '12h 00m';
            const diffMins = Math.round((this.currentWeather.sunset - this.currentWeather.sunrise) / 60000);
            const hrs = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return `${hrs}h ${mins}m`;
        },
        solarNoonTime() {
            if (!this.currentWeather.sunrise || !this.currentWeather.sunset) return '12:00 PM';
            const mid = (this.currentWeather.sunrise + this.currentWeather.sunset) / 2;
            return this.formatTime(mid);
        },
        sunStatusLabel() {
            const now = Date.now();
            if (!this.currentWeather.sunrise || !this.currentWeather.sunset) return 'Daytime';
            if (now < this.currentWeather.sunrise) return 'Pre-Dawn';
            if (now > this.currentWeather.sunset) return 'Nighttime';
            const remainingMins = Math.round((this.currentWeather.sunset - now) / 60000);
            const hrs = Math.floor(remainingMins / 60);
            const mins = remainingMins % 60;
            return hrs > 0 ? `${hrs}h ${mins}m until sunset` : `${mins}m until sunset`;
        },
        windDirectionCardinal() {
            const deg = this.currentWeather.wind_deg || 0;
            const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            return dirs[Math.round(deg / 45) % 8];
        },
        todayMaxTemp() {
            if (this.forecast.length > 0) {
                return Math.max(this.currentWeather.temp, this.forecast[0].max_temp);
            }
            return this.currentWeather.temp;
        },
        todayMinTemp() {
            if (this.forecast.length > 0) {
                return Math.min(this.currentWeather.temp, this.forecast[0].min_temp);
            }
            return this.currentWeather.temp;
        },
        weekMinTemp() {
            if (!this.forecast.length) return 20;
            return Math.min(...this.forecast.map(d => d.min_temp));
        },
        weekMaxTemp() {
            if (!this.forecast.length) return 35;
            return Math.max(...this.forecast.map(d => d.max_temp));
        },
        thermalComfortLabel() {
            const fl = this.currentWeather.feels_like;
            if (fl >= 38) return 'Very Hot & Humid';
            if (fl >= 33) return 'Warm Tropical Heat';
            if (fl >= 26) return 'Pleasant & Warm';
            if (fl >= 20) return 'Cool & Refreshing';
            return 'Crisp Highland Air';
        },
        uvLevel() {
            if (this.uvIndex <= 2) return 'Low';
            if (this.uvIndex <= 5) return 'Moderate';
            if (this.uvIndex <= 7) return 'High';
            if (this.uvIndex <= 10) return 'Very High';
            return 'Extreme';
        },
        uvLevelColor() {
            if (this.uvIndex <= 2) return 'text-emerald-600 dark:text-emerald-400';
            if (this.uvIndex <= 5) return 'text-amber-600 dark:text-amber-400';
            if (this.uvIndex <= 7) return 'text-orange-600 dark:text-orange-400';
            if (this.uvIndex <= 10) return 'text-red-600 dark:text-red-400';
            return 'text-purple-600 dark:text-purple-400';
        },
        lifestyleAdvisories() {
            const nextRain = this.hourlyForecast.length ? Math.max(...this.hourlyForecast.slice(0, 3).map(h => h.rain)) : 0;
            const temp = this.currentWeather.temp;
            const wind = this.currentWeather.wind_speed;

            return [
                {
                    icon: '☔',
                    title: 'Umbrella & Rain Check',
                    status: nextRain >= 50 ? 'Carry Umbrella' : nextRain >= 25 ? 'Light Chance' : 'Clear Skies',
                    badgeClass: nextRain >= 50
                        ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300'
                        : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
                    advice: nextRain >= 50
                        ? `Up to ${nextRain}% rain probability in the coming hours. Pack a rain poncho or umbrella.`
                        : 'Low chance of rain over the next 6–9 hours — great for walking and temple visits.'
                },
                {
                    icon: '🚴',
                    title: 'Outdoor Exercise & Cycling',
                    status: temp > 34 ? 'Early Morning Best' : nextRain >= 60 ? 'Wait for Clearing' : 'Great Conditions',
                    badgeClass: temp > 34 || nextRain >= 60
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
                    advice: temp > 34
                        ? 'High heat index right now. Schedule runs or cycling before 9 AM or after 5 PM.'
                        : `Comfortable ${Math.round(wind)} km/h breeze for cycling, jogging, or riverside walks.`
                },
                {
                    icon: '📸',
                    title: 'Temple & Golden Hour Light',
                    status: this.currentWeather.clouds <= 65 ? 'Crisp Light' : 'Soft Diffused',
                    badgeClass: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
                    advice: `Sunset today at ${this.formatTime(this.currentWeather.sunset)} — ${this.currentWeather.clouds <= 65 ? 'expect warm golden hour reflections.' : 'dramatic clouds create moody silhouettes.'}`
                },
                {
                    icon: '👕',
                    title: 'Laundry & Drying Index',
                    status: nextRain < 30 && this.currentWeather.humidity < 80 ? 'Fast Drying' : 'Indoor Recommended',
                    badgeClass: nextRain < 30 && this.currentWeather.humidity < 80
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
                    advice: nextRain < 30 && this.currentWeather.humidity < 80
                        ? 'Warm air and steady breeze will dry clothes quickly outdoors.'
                        : 'Higher humidity or shower risk — dry laundry under a covered balcony.'
                }
            ];
        }
    },
    methods: {
        formatTemp(celsius) {
            if (celsius === undefined || celsius === null || Number.isNaN(celsius)) return 0;
            if (this.unit === 'F') {
                return Math.round((celsius * 9) / 5 + 32);
            }
            return Math.round(celsius);
        },
        getTempBarStyle(min, max) {
            const range = Math.max(1, this.weekMaxTemp - this.weekMinTemp);
            const left = Math.max(0, Math.min(90, ((min - this.weekMinTemp) / range) * 100));
            const width = Math.max(12, Math.min(100 - left, ((max - min) / range) * 100));
            return {
                left: `${left}%`,
                width: `${width}%`
            };
        },
        selectPresetCity(city) {
            this.location = {
                name: city.name,
                khmer: city.khmer,
                country: 'KH',
                region: city.region,
                lat: city.lat,
                lon: city.lon
            };
            this.searchQuery = '';
            this.fetchWeatherData();
        },
        async searchCity() {
            const q = this.searchQuery.trim();
            if (!q) return;

            const preset = this.cambodiaCities.find(
                c => c.name.toLowerCase() === q.toLowerCase()
            );
            if (preset) {
                this.selectPresetCity(preset);
                return;
            }

            this.loading = true;
            this.error = null;
            try {
                const geoRes = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${this.apiKey}`
                );
                if (!geoRes.ok) throw new Error('City lookup failed');
                const geoData = await geoRes.json();
                if (!geoData || geoData.length === 0) {
                    throw new Error(`Could not find weather station for "${q}". Try another city name.`);
                }
                const place = geoData[0];
                const matchedKhmer = this.cambodiaCities.find(
                    c => c.name.toLowerCase() === place.name.toLowerCase()
                );
                this.location = {
                    name: place.name,
                    khmer: matchedKhmer ? matchedKhmer.khmer : '',
                    country: place.country || '',
                    region: place.state || (place.country === 'KH' ? 'Cambodia' : place.country),
                    lat: place.lat,
                    lon: place.lon
                };
                this.searchQuery = '';
                await this.fetchWeatherData();
            } catch (err) {
                this.loading = false;
                this.error = err.message || 'Unable to find that city.';
            }
        },
        useMyLocation() {
            if (!navigator.geolocation) {
                this.error = 'Geolocation is not supported by your browser.';
                return;
            }
            this.locating = true;
            navigator.geolocation.getCurrentPosition(
                async pos => {
                    this.locating = false;
                    this.location = {
                        name: 'My Location',
                        khmer: '',
                        country: '',
                        region: 'GPS Coordinates',
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    };
                    await this.fetchWeatherData(true);
                },
                () => {
                    this.locating = false;
                    this.error = 'Location permission denied. Please select a city above or search by name.';
                },
                { timeout: 10000 }
            );
        },
        async fetchWeatherData(updateNameFromApi = false) {
            this.loading = true;
            this.error = null;

            if (!this.apiKey || this.apiKey.trim() === '') {
                this.loading = false;
                this.error = 'Weather API key is not configured. Please add VUE_APP_WEATHER_API_KEY to your .env file.';
                logger.error('Weather API key is missing');
                return;
            }

            try {
                const [currentWeatherResponse, forecastResponse] = await Promise.all([
                    fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                    ),
                    fetch(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&appid=${this.apiKey}`
                    )
                ]);

                if (!currentWeatherResponse.ok) {
                    const errorData = await currentWeatherResponse.json().catch(() => ({}));
                    if (currentWeatherResponse.status === 401) {
                        throw new Error('Invalid API key. Please check your VUE_APP_WEATHER_API_KEY in .env file.');
                    }
                    throw new Error(errorData.message || 'Failed to fetch current weather data');
                }

                if (!forecastResponse.ok) {
                    throw new Error('Failed to fetch forecast data');
                }

                const currentData = await currentWeatherResponse.json();
                const forecastData = await forecastResponse.json();

                if (updateNameFromApi && currentData.name) {
                    this.location.name = currentData.name;
                    this.location.country = currentData.sys?.country || '';
                }

                const temp = currentData.main.temp;
                const humidity = currentData.main.humidity;
                const dewPoint = temp - (100 - humidity) / 5;

                this.currentWeather = {
                    temp: currentData.main.temp,
                    feels_like: currentData.main.feels_like,
                    condition: currentData.weather[0].description,
                    wind_speed: (currentData.wind.speed || 0) * 3.6,
                    wind_deg: currentData.wind.deg || 0,
                    wind_gust: currentData.wind.gust ? currentData.wind.gust * 3.6 : 0,
                    humidity: currentData.main.humidity,
                    sunrise: currentData.sys.sunrise * 1000,
                    sunset: currentData.sys.sunset * 1000,
                    icon: currentData.weather[0].icon,
                    pressure: currentData.main.pressure,
                    visibility: Math.round((currentData.visibility || 10000) / 1000),
                    dew_point: Math.round(dewPoint),
                    clouds: currentData.clouds?.all || 0
                };

                const hour = new Date().getHours();
                const cloudFactor = 1 - (this.currentWeather.clouds / 100) * 0.5;
                if (hour >= 10 && hour <= 15) {
                    this.uvIndex = Math.round(9 * cloudFactor);
                } else if ((hour >= 7 && hour < 10) || (hour > 15 && hour <= 18)) {
                    this.uvIndex = Math.round(4 * cloudFactor);
                } else {
                    this.uvIndex = 0;
                }

                this.hourlyForecast = forecastData.list.slice(0, 12).map(item => ({
                    dt: item.dt * 1000,
                    temp: item.main.temp,
                    icon: item.weather[0].icon,
                    condition: item.weather[0].description,
                    rain: Math.round((item.pop || 0) * 100),
                    wind: Math.round((item.wind?.speed || 0) * 3.6)
                }));

                const dailyForecasts = {};
                forecastData.list.forEach(item => {
                    const date = new Date(item.dt * 1000).toDateString();
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = {
                            dt: item.dt,
                            temps: [],
                            humidities: [],
                            winds: [],
                            icon: item.weather[0].icon,
                            condition: item.weather[0].description,
                            rain: (item.pop || 0) * 100
                        };
                    }
                    dailyForecasts[date].temps.push(item.main.temp);
                    dailyForecasts[date].humidities.push(item.main.humidity);
                    dailyForecasts[date].winds.push((item.wind?.speed || 0) * 3.6);
                    if ((item.pop || 0) * 100 > dailyForecasts[date].rain) {
                        dailyForecasts[date].rain = (item.pop || 0) * 100;
                    }
                    const itemHour = new Date(item.dt * 1000).getHours();
                    if (itemHour >= 11 && itemHour <= 15) {
                        dailyForecasts[date].icon = item.weather[0].icon;
                        dailyForecasts[date].condition = item.weather[0].description;
                    }
                });

                this.forecast = Object.values(dailyForecasts)
                    .slice(0, 6)
                    .map(day => ({
                        dt: day.dt,
                        min_temp: Math.min(...day.temps),
                        max_temp: Math.max(...day.temps),
                        humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
                        wind: Math.round(Math.max(...day.winds)),
                        icon: day.icon,
                        condition: day.condition,
                        rain: Math.round(day.rain)
                    }));

                this.updateSeason();

                this.alerts = [];
                if (
                    currentData.weather[0].main === 'Thunderstorm' ||
                    (currentData.weather[0].main === 'Rain' && currentData.rain && currentData.rain['1h'] > 10)
                ) {
                    this.alerts.push({
                        title: 'Heavy Monsoon Rain Advisory',
                        description: `Heavy rainfall detected around ${this.location.name}. Watch for localized street flooding and slippery roads.`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                }

                if (currentData.main.temp >= 35 || currentData.main.feels_like >= 39) {
                    this.alerts.push({
                        title: 'High Tropical Heat Advisory',
                        description: `Feels-like temperature reaches ${this.formatTemp(currentData.main.feels_like)}°${this.unit}. Stay hydrated and limit midday sun exposure.`,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                }

                this.lastUpdated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch (err) {
                logger.error('Error fetching weather data:', err);
                this.error =
                    err.message ||
                    'Failed to load weather data. Please check your API key configuration and try again.';
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
        formatShortDate(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
        formatWeekdayShort(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        },
        formatDayFull(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        },
        updateSeason() {
            const month = new Date().getMonth();
            if (month >= 4 && month <= 9) {
                this.currentSeason = SEASON_CATALOG.rainy;
                this.seasonProgress = Math.min(100, Math.max(8, Math.round(((month - 4 + 0.5) / 6) * 100)));
            } else {
                this.currentSeason = SEASON_CATALOG.dry;
                const dryIndex = month >= 10 ? month - 10 : month + 2;
                this.seasonProgress = Math.min(100, Math.max(8, Math.round(((dryIndex + 0.5) / 6) * 100)));
            }
        }
    },
    mounted() {
        this.updateSeason();
        this.fetchWeatherData();
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
