<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-8 sm:mt-10">
                <div class="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 mb-3 sm:mb-4 shadow-xl">
                    <SunIcon class="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    Weather Forecast
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1 sm:gap-2">
                    <MapPinIcon class="h-4 w-4" />
                    {{ location.name }}, Cambodia
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16 sm:py-20">
                <div class="relative">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <SunIcon class="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p class="mt-4 sm:mt-6 text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Fetching weather data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center my-6 sm:my-8 shadow-xl mx-2">
                <ExclamationCircleIcon class="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-80" />
                <h2 class="text-xl sm:text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                <p class="opacity-90 mb-4 sm:mb-6 text-sm sm:text-base">{{ error }}</p>
                <button @click="fetchWeatherData"
                    class="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-red-500 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-sm sm:text-base">
                    <ArrowPathIcon class="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                    Try Again
                </button>
            </div>

            <!-- Weather Content -->
            <div v-else class="space-y-4 sm:space-y-6 animate-fade-in">
                <!-- Main Weather Card -->
                <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                    <!-- Dynamic Background -->
                    <div class="absolute inset-0" :class="weatherGradient"></div>
                    <div class="absolute inset-0 bg-black/10"></div>
                    
                    <!-- Floating Elements - Hidden on mobile for performance -->
                    <div class="hidden sm:block absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
                    <div class="hidden sm:block absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float-delayed"></div>
                    
                    <div class="relative p-4 sm:p-6 lg:p-10 text-white">
                        <!-- Top Row - Location & Time -->
                        <div class="flex justify-between items-start mb-4 sm:mb-6 lg:mb-8">
                            <div>
                                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold">{{ location.name }}</h2>
                                <p class="text-white/80 text-xs sm:text-sm lg:text-base">{{ currentDate }}</p>
                            </div>
                            <button @click="fetchWeatherData" 
                                class="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl hover:bg-white/30 transition-all">
                                <ArrowPathIcon class="h-4 w-4 sm:h-5 sm:w-5" :class="{ 'animate-spin': loading }" />
                            </button>
                        </div>

                        <!-- Main Weather Display - Stack on mobile -->
                        <div class="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
                            <!-- Temperature & Icon - Centered on mobile -->
                            <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                                <div class="relative">
                                    <img v-if="currentWeather.icon"
                                        :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`"
                                        alt="Weather icon" 
                                        class="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 drop-shadow-2xl" />
                                </div>
                                <div>
                                    <div class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter">
                                        {{ Math.round(currentWeather.temp) }}°
                                    </div>
                                    <div class="text-lg sm:text-xl lg:text-2xl capitalize opacity-90">
                                        {{ currentWeather.condition }}
                                    </div>
                                </div>
                            </div>

                            <!-- Weather Stats Grid - Full width on mobile -->
                            <div class="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full max-w-md">
                                <div class="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm mb-0.5 sm:mb-1">
                                        <ArrowUpIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                        Feels Like
                                    </div>
                                    <div class="text-xl sm:text-2xl font-bold">{{ Math.round(currentWeather.feels_like) }}°</div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm mb-0.5 sm:mb-1">
                                        <CloudIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                        Humidity
                                    </div>
                                    <div class="text-xl sm:text-2xl font-bold">{{ currentWeather.humidity }}%</div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm mb-0.5 sm:mb-1">
                                        <WindIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                        Wind
                                    </div>
                                    <div class="text-xl sm:text-2xl font-bold">{{ Math.round(currentWeather.wind_speed) }} <span class="text-xs sm:text-sm">km/h</span></div>
                                </div>
                                <div class="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/30 transition-all">
                                    <div class="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm mb-0.5 sm:mb-1">
                                        <EyeIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                        Visibility
                                    </div>
                                    <div class="text-xl sm:text-2xl font-bold">{{ currentWeather.visibility }} <span class="text-xs sm:text-sm">km</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Sun Times Bar -->
                        <div class="mt-4 sm:mt-6 lg:mt-8 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <div class="flex justify-between items-center gap-2 sm:gap-4">
                                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                    <div class="p-1.5 sm:p-2 bg-orange-400/30 rounded-lg">
                                        <SunIcon class="h-4 w-4 sm:h-5 sm:w-5 text-orange-300" />
                                    </div>
                                    <div class="min-w-0">
                                        <p class="text-[10px] sm:text-xs text-white/60">Sunrise</p>
                                        <p class="font-semibold text-xs sm:text-sm lg:text-base">{{ formatTime(currentWeather.sunrise) }}</p>
                                    </div>
                                </div>
                                
                                <!-- Sun Progress Bar -->
                                <div class="flex-1 mx-2 sm:mx-4 lg:mx-6 relative hidden xs:block">
                                    <div class="h-1 bg-white/20 rounded-full">
                                        <div class="h-1 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full transition-all duration-1000" 
                                             :style="{ width: sunProgress + '%' }"></div>
                                    </div>
                                    <div class="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                                         :style="{ left: sunProgress + '%' }">
                                        <div class="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 -ml-1.5 sm:-ml-2 -mt-1 sm:-mt-1.5"></div>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                    <div class="min-w-0 text-right">
                                        <p class="text-[10px] sm:text-xs text-white/60">Sunset</p>
                                        <p class="font-semibold text-xs sm:text-sm lg:text-base">{{ formatTime(currentWeather.sunset) }}</p>
                                    </div>
                                    <div class="p-1.5 sm:p-2 bg-indigo-400/30 rounded-lg">
                                        <MoonIcon class="h-4 w-4 sm:h-5 sm:w-5 text-indigo-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats Grid - 2x2 on mobile, 4 columns on tablet+ -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform">
                        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Pressure</span>
                            <div class="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <ChartBarIcon class="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                            </div>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.pressure }}</div>
                        <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">hPa</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform">
                        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">UV Index</span>
                            <div class="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <SunIcon class="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                            </div>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ uvIndex }}</div>
                        <div class="text-[10px] sm:text-xs" :class="uvLevelColor">{{ uvLevel }}</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform">
                        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Dew Point</span>
                            <div class="p-1.5 sm:p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                <BeakerIcon class="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                            </div>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.dew_point }}°</div>
                        <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Celsius</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform">
                        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                            <span class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Clouds</span>
                            <div class="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <CloudIcon class="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            </div>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ currentWeather.clouds }}%</div>
                        <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Coverage</div>
                    </div>
                </div>

                <!-- Hourly Forecast -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 dark:border-gray-700">
                    <h2 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-5 flex items-center">
                        <ClockIcon class="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-500" />
                        24-Hour Forecast
                    </h2>
                    <div class="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
                        <div class="flex gap-2 sm:gap-3" style="min-width: max-content;">
                            <div v-for="(hour, idx) in hourlyForecast" :key="idx"
                                class="flex flex-col items-center p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl min-w-[65px] sm:min-w-[75px] lg:min-w-[80px] transition-all"
                                :class="idx === 0 ? 'bg-gradient-to-b from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'">
                                <span class="text-[10px] sm:text-xs lg:text-sm font-medium" :class="idx === 0 ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
                                    {{ idx === 0 ? 'Now' : formatHour(hour.dt) }}
                                </span>
                                <img :src="`https://openweathermap.org/img/wn/${hour.icon}@2x.png`" 
                                     alt="Weather" class="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 my-0.5 sm:my-1" />
                                <span class="text-base sm:text-lg lg:text-xl font-bold" :class="idx === 0 ? 'text-white' : 'text-gray-900 dark:text-white'">
                                    {{ Math.round(hour.temp) }}°
                                </span>
                                <div v-if="hour.rain > 0" class="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1"
                                     :class="idx === 0 ? 'text-blue-200' : 'text-blue-500'">
                                    <CloudRainIcon class="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    <span class="text-[10px] sm:text-xs">{{ hour.rain }}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 7-Day Forecast -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-5 lg:p-6 border border-gray-100 dark:border-gray-700">
                    <h2 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-5 flex items-center">
                        <CalendarDaysIcon class="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-green-500" />
                        7-Day Forecast
                    </h2>
                    <div class="space-y-1.5 sm:space-y-2">
                        <div v-for="(day, idx) in forecast" :key="idx"
                            class="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group">
                            <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
                                <div class="w-14 sm:w-16 lg:w-20 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base truncate">
                                    {{ idx === 0 ? 'Today' : formatDay(day.dt) }}
                                </div>
                                <div class="flex items-center gap-1 sm:gap-2">
                                    <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" 
                                         alt="Weather" class="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform flex-shrink-0" />
                                    <span class="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400 capitalize hidden md:block truncate max-w-[100px] lg:max-w-[150px]">
                                        {{ day.condition }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-2 sm:gap-3 lg:gap-4">
                                <div v-if="day.rain > 0" class="flex items-center gap-0.5 sm:gap-1 text-blue-500">
                                    <CloudRainIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span class="text-[10px] sm:text-xs lg:text-sm">{{ day.rain }}%</span>
                                </div>
                                <div class="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                                    <span class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">{{ Math.round(day.max_temp) }}°</span>
                                    <div class="w-8 sm:w-12 lg:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 rounded-full hidden sm:block"></div>
                                    <span class="text-sm sm:text-base lg:text-lg text-gray-400">{{ Math.round(day.min_temp) }}°</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Season Info - Full Width Enhanced -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <!-- Season Header with Gradient -->
                        <div class="p-4 sm:p-5 lg:p-6" :class="currentSeason.name === 'Rainy Season' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-orange-500 to-yellow-500'">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 sm:gap-3">
                                    <div class="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                        <SparklesIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-white">{{ currentSeason.name }}</h2>
                                        <p class="text-white/80 text-xs sm:text-sm">{{ currentSeason.dateRange }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl sm:text-3xl font-bold text-white">{{ seasonProgress }}%</div>
                                    <div class="text-white/70 text-[10px] sm:text-xs">Complete</div>
                                </div>
                            </div>
                            <!-- Progress Bar -->
                            <div class="mt-3 sm:mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
                                <div class="h-full bg-white rounded-full transition-all duration-1000" :style="{ width: seasonProgress + '%' }"></div>
                            </div>
                            <div class="flex justify-between mt-1.5 text-[10px] sm:text-xs text-white/70">
                                <span>{{ currentSeason.startMonth }}</span>
                                <span>{{ currentSeason.endMonth }}</span>
                            </div>
                        </div>

                        <div class="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                            <!-- Weather Characteristics -->
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                                    <CloudIcon class="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                                    Weather Characteristics
                                </h3>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    <div v-for="(item, idx) in currentSeason.characteristics" :key="idx"
                                        class="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl">
                                        <CheckCircleIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- What to Expect -->
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                                    <CalendarDaysIcon class="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                                    What to Expect
                                </h3>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ currentSeason.description }}</p>
                            </div>

                            <!-- Best Activities -->
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                                    <StarIcon class="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                                    Best Activities
                                </h3>
                                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                                    <span v-for="(activity, idx) in currentSeason.activities" :key="idx"
                                        class="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full"
                                        :class="currentSeason.name === 'Rainy Season' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'">
                                        {{ activity }}
                                    </span>
                                </div>
                            </div>

                            <!-- What to Wear -->
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                                    <ShirtIcon class="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                                    What to Wear
                                </h3>
                                <div class="grid grid-cols-2 gap-2 sm:gap-3">
                                    <div v-for="(item, idx) in currentSeason.clothing" :key="idx"
                                        class="flex items-center gap-2 p-2 sm:p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                        <span>{{ item.icon }}</span>
                                        <span>{{ item.name }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Health Tips -->
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                                    <HeartIcon class="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                    Health Tips
                                </h3>
                                <div class="space-y-2">
                                    <div v-for="(tip, idx) in currentSeason.healthTips" :key="idx"
                                        class="flex items-start gap-2 sm:gap-3">
                                        <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0"
                                             :class="currentSeason.name === 'Rainy Season' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'">
                                            {{ idx + 1 }}
                                        </div>
                                        <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ tip }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Agriculture Advice -->
                            <div class="p-3 sm:p-4 rounded-xl border-2 border-dashed"
                                 :class="currentSeason.name === 'Rainy Season' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20' : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'">
                                <div class="flex items-center gap-2 mb-2 sm:mb-3">
                                    <div class="p-1.5 sm:p-2 rounded-lg" :class="currentSeason.name === 'Rainy Season' ? 'bg-blue-200 dark:bg-blue-800' : 'bg-orange-200 dark:bg-orange-800'">
                                        <SeedlingIcon class="h-4 w-4 sm:h-5 sm:w-5" :class="currentSeason.name === 'Rainy Season' ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'" />
                                    </div>
                                    <span class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Agriculture Guide</span>
                                </div>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">{{ currentSeason.agricultural_advice }}</p>
                                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                                    <span v-for="(crop, idx) in currentSeason.crops" :key="idx"
                                        class="px-2 py-1 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                        🌱 {{ crop }}
                                    </span>
                                </div>
                            </div>

                            <!-- Travel Tips -->
                            <div class="p-3 sm:p-4 rounded-xl bg-gradient-to-r" :class="currentSeason.name === 'Rainy Season' ? 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' : 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20'">
                                <div class="flex items-center gap-2 mb-2 sm:mb-3">
                                    <MapPinIcon class="h-4 w-4 sm:h-5 sm:w-5" :class="currentSeason.name === 'Rainy Season' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'" />
                                    <span class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Travel Tips</span>
                                </div>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ currentSeason.travelTips }}</p>
                            </div>

                            <!-- Childhood Memories Section -->
                            <div v-if="currentSeason.childhoodMemories" class="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800">
                                <div class="flex items-center gap-2 mb-3 sm:mb-4">
                                    <span class="text-2xl">🌅</span>
                                    <span class="font-bold text-amber-900 dark:text-amber-200 text-base sm:text-lg">Memories of Cambodia</span>
                                </div>
                                <p class="text-sm sm:text-base text-amber-800 dark:text-amber-300 leading-relaxed mb-4 italic">{{ currentSeason.childhoodMemories.intro }}</p>
                                
                                <div class="space-y-3 sm:space-y-4">
                                    <div v-for="(memory, idx) in currentSeason.childhoodMemories.moments" :key="idx"
                                        class="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                                        <span class="text-xl sm:text-2xl flex-shrink-0">{{ memory.icon }}</span>
                                        <div>
                                            <span class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ memory.title }}</span>
                                            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">{{ memory.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Traditional Foods -->
                            <div v-if="currentSeason.traditionalFoods" class="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                                <div class="flex items-center gap-2 mb-3 sm:mb-4">
                                    <span class="text-2xl">🍜</span>
                                    <span class="font-bold text-red-900 dark:text-red-200 text-base sm:text-lg">Seasonal Foods & Treats</span>
                                </div>
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                    <div v-for="(food, idx) in currentSeason.traditionalFoods" :key="idx"
                                        class="flex items-center gap-2 p-2.5 sm:p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                                        <span class="text-lg sm:text-xl">{{ food.icon }}</span>
                                        <div>
                                            <span class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{{ food.name }}</span>
                                            <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{{ food.desc }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Fun Fact -->
                            <div class="flex items-start gap-3 p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <div class="p-1.5 sm:p-2 bg-purple-200 dark:bg-purple-800 rounded-lg flex-shrink-0">
                                    <LightBulbIcon class="h-4 w-4 sm:h-5 sm:w-5 text-purple-700 dark:text-purple-300" />
                                </div>
                                <div>
                                    <span class="font-semibold text-purple-900 dark:text-purple-200 text-sm sm:text-base">Did You Know?</span>
                                    <p class="text-xs sm:text-sm text-purple-700 dark:text-purple-300 mt-1">{{ currentSeason.funFact }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                <!-- Weather Alerts -->
                <div v-if="alerts.length > 0" class="space-y-3 sm:space-y-4">
                    <h2 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white flex items-center">
                        <ExclamationTriangleIcon class="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-red-500" />
                        Weather Alerts
                    </h2>
                    <div v-for="(alert, idx) in alerts" :key="idx"
                        class="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg">
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div class="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl flex-shrink-0">
                                <ExclamationCircleIcon class="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="font-bold text-sm sm:text-base lg:text-lg">{{ alert.title }}</h3>
                                <p class="text-white/90 mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base">{{ alert.description }}</p>
                                <p class="text-white/70 text-[10px] sm:text-xs lg:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                                    <ClockIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                                    {{ alert.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="text-center text-[10px] sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
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
    ArrowTrendingUpIcon,
    StarIcon,
    HeartIcon,
    UserIcon
} from '@heroicons/vue/24/outline';

import { CloudIcon as CloudRainIcon } from '@heroicons/vue/24/solid';
import logger from '@/utils/logger';

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
        ArrowPathIcon,
        StarIcon,
        HeartIcon,
        ShirtIcon: UserIcon,
        SeedlingIcon: SparklesIcon
    },
    data() {
        return {
            loading: true,
            error: null,
            apiKey: process.env.VUE_APP_WEATHER_API_KEY || '',
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
                dateRange: '',
                startMonth: '',
                endMonth: '',
                description: '',
                characteristics: [],
                activities: [],
                clothing: [],
                healthTips: [],
                agricultural_advice: '',
                crops: [],
                travelTips: '',
                funFact: ''
            },
            seasonProgress: 0,
            forecast: [],
            alerts: [],
            uvIndex: 0,
            lastUpdated: ''
        }
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
        weatherGradient() {
            const hour = new Date().getHours();
            if (hour >= 6 && hour < 12) {
                return 'bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500';
            } else if (hour >= 12 && hour < 17) {
                return 'bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500';
            } else if (hour >= 17 && hour < 20) {
                return 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600';
            } else {
                return 'bg-gradient-to-br from-indigo-600 via-purple-700 to-gray-900';
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
                logger.error('Error fetching weather data:', err);
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
            return date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
        },

        updateSeason() {
            const month = new Date().getMonth();

            if (month >= 4 && month <= 9) {
                // Rainy Season (May - October)
                this.currentSeason = {
                    name: 'Rainy Season',
                    dateRange: 'May - October',
                    startMonth: 'May',
                    endMonth: 'October',
                    description: 'The monsoon season brings life-giving rains to Cambodia. Expect daily afternoon thunderstorms, lush green landscapes, and dramatic skies. The Mekong River swells, and Tonle Sap reverses its flow. Mornings are often clear and beautiful, perfect for outdoor activities before the afternoon rains.',
                    characteristics: [
                        'High humidity levels (75-90%)',
                        'Daily afternoon thunderstorms',
                        'Average temperature: 25-32°C',
                        'Heavy rainfall in September',
                        'Lush green vegetation',
                        'Occasional flooding in lowlands'
                    ],
                    activities: [
                        'Morning temple visits',
                        'Indoor museums',
                        'Spa & wellness',
                        'Cooking classes',
                        'Photography (dramatic skies)',
                        'River cruises',
                        'Waterfall visits'
                    ],
                    clothing: [
                        { icon: '☔', name: 'Rain jacket' },
                        { icon: '👟', name: 'Waterproof shoes' },
                        { icon: '🩴', name: 'Quick-dry sandals' },
                        { icon: '👕', name: 'Light breathable clothes' },
                        { icon: '🎒', name: 'Waterproof bag' },
                        { icon: '🧴', name: 'Insect repellent' }
                    ],
                    healthTips: [
                        'Stay hydrated despite the humidity - drink plenty of water',
                        'Use mosquito repellent, especially in the evenings',
                        'Be cautious of slippery surfaces after rain',
                        'Keep medications dry in waterproof containers',
                        'Watch for flash floods in low-lying areas'
                    ],
                    agricultural_advice: 'This is the prime rice planting season in Cambodia. Farmers transplant rice seedlings as paddies fill with rainwater. The abundant moisture supports rapid crop growth. Prepare drainage systems to prevent waterlogging and monitor for fungal diseases that thrive in humid conditions.',
                    crops: ['Rice (main crop)', 'Corn', 'Soybeans', 'Mung beans', 'Water spinach', 'Lotus'],
                    travelTips: 'Book accommodations with covered areas. Plan outdoor activities for mornings. Carry a compact umbrella always. Roads may be muddy in rural areas. Fewer tourists mean better prices and less crowded attractions!',
                    funFact: 'During rainy season, the Tonle Sap Lake expands from 2,500 km² to over 16,000 km² - making it one of the most productive freshwater fisheries in the world!'
                };
                this.seasonProgress = Math.round(((month - 4) / 6) * 100);
            } else {
                // Dry Season (November - April)
                this.currentSeason = {
                    name: 'Dry Season',
                    dateRange: 'November - April',
                    startMonth: 'November',
                    endMonth: 'April',
                    description: 'The dry season is Cambodia\'s golden time - when the land rests after the monsoon\'s blessing. From November\'s cool breezes that sweep away the last rains, through the festive spirit of Khmer New Year in April, this season holds the heart of Cambodian life. The rice paddies turn golden, then bare after harvest. Village roads become dusty paths where children play barefoot until sunset. The air smells of burning rice straw, ripe mangoes, and grandmother\'s cooking. It\'s the season of weddings, festivals, and families gathering under the stars.',
                    characteristics: [
                        'Cool morning mist over rice paddies',
                        'Golden sunsets painting the sky orange and pink',
                        'Clear starry nights perfect for storytelling',
                        'Gentle breezes carrying the scent of jasmine',
                        'Warm afternoons under mango tree shade',
                        'Dusty red earth roads in the countryside'
                    ],
                    activities: [
                        'Watching sunrise at Angkor Wat',
                        'Cycling through village roads',
                        'Kite flying with children',
                        'Temple festivals & ceremonies',
                        'Traditional wedding celebrations',
                        'Night markets & street food',
                        'Fishing in Tonle Sap',
                        'Khmer New Year festivities'
                    ],
                    clothing: [
                        { icon: '🧢', name: 'Krama (traditional scarf)' },
                        { icon: '👕', name: 'Light cotton sampot' },
                        { icon: '🩴', name: 'Rubber sandals' },
                        { icon: '🕶️', name: 'Sunglasses' },
                        { icon: '👒', name: 'Straw hat' },
                        { icon: '🧴', name: 'Coconut oil for skin' }
                    ],
                    healthTips: [
                        'Wake early to enjoy the cool morning air before the heat rises',
                        'Rest during the hottest hours (12pm-3pm) like our grandparents did',
                        'Drink fresh coconut water and sugarcane juice to stay cool',
                        'Take cool baths in the afternoon to refresh',
                        'Eat seasonal fruits: mango, rambutan, longan, and durian'
                    ],
                    agricultural_advice: 'This is harvest time - the reward for a year\'s hard work. Families gather to cut rice by hand, bundle the stalks, and thresh the grains. The smell of freshly harvested rice fills the air. After harvest, farmers burn the stubble, preparing fields for the next cycle. It\'s also time to tend fruit orchards - mango, jackfruit, and coconut trees bear their sweetest fruits.',
                    crops: ['Rice (harvest)', 'Mangoes', 'Palm sugar', 'Cashews', 'Watermelon', 'Corn'],
                    travelTips: 'Visit during Khmer New Year (April 13-16) for the most vibrant cultural experience. The Water Festival in November features spectacular boat races on the Tonle Sap. December-February offers perfect weather for temple exploration. Wake before dawn to catch the magical sunrise at Angkor Wat - a moment that stays with you forever.',
                    funFact: 'During Khmer New Year, Cambodians build sand mountains at pagodas, each grain representing a wish or merit. Families splash water on elders as a blessing, and the whole country becomes one big celebration of life, family, and gratitude.',
                    childhoodMemories: {
                        intro: 'The dry season brings back the warmest memories of growing up in Cambodia - when life moved slower, families gathered closer, and every sunset felt like a gift from the ancestors...',
                        moments: [
                            {
                                icon: '🌅',
                                title: 'Morning Rice Fields',
                                description: 'Waking up to the mist hovering over golden rice paddies. Grandfather already in the field, checking the crops. The sound of roosters and the smell of mother\'s rice porridge cooking.'
                            },
                            {
                                icon: '🪁',
                                title: 'Kite Flying Season',
                                description: 'Running through harvested fields with homemade kites made from bamboo and newspaper. The sky filled with colors as children competed to fly the highest. The string cutting your fingers but you didn\'t care.'
                            },
                            {
                                icon: '🥭',
                                title: 'Mango Tree Adventures',
                                description: 'Climbing the old mango tree in grandmother\'s yard. Eating green mangoes with salt and chili. Getting scolded for eating too many but sneaking back for more.'
                            },
                            {
                                icon: '🌙',
                                title: 'Stories Under the Stars',
                                description: 'Sleeping on bamboo beds outside because it was too hot inside. Grandmother telling stories of Apsara dancers and ancient kings. Counting stars until sleep came.'
                            },
                            {
                                icon: '🎪',
                                title: 'Pagoda Festivals',
                                description: 'The excitement of Pchum Ben and temple fairs. Colorful lights, traditional music, and the smell of grilled meat. Saving coins all year for this moment.'
                            },
                            {
                                icon: '💧',
                                title: 'Water Festival Magic',
                                description: 'Traveling to Phnom Penh for Bon Om Touk. The river alive with decorated boats racing. Fireworks painting the night sky. Feeling like the whole country was celebrating together.'
                            },
                            {
                                icon: '🏠',
                                title: 'Village Evenings',
                                description: 'Playing hide and seek until mother called for dinner. The sound of monks chanting from the nearby pagoda. Fireflies dancing in the darkness like tiny spirits.'
                            },
                            {
                                icon: '🎊',
                                title: 'Khmer New Year Joy',
                                description: 'New clothes, visiting relatives, building sand stupas at the temple. Water splashing everywhere. The whole village dancing to traditional music. A time when worries disappeared.'
                            }
                        ]
                    },
                    traditionalFoods: [
                        { icon: '🍚', name: 'Bai Sach Chrouk', desc: 'Grilled pork & rice' },
                        { icon: '🥥', name: 'Nom Krok', desc: 'Coconut rice cakes' },
                        { icon: '🥭', name: 'Svay Chrouk', desc: 'Green mango salad' },
                        { icon: '🍢', name: 'Sach Ko Ang', desc: 'Grilled beef skewers' },
                        { icon: '🧁', name: 'Num Ansorm', desc: 'Sticky rice cake' },
                        { icon: '🥤', name: 'Tuk Ampov', desc: 'Fresh sugarcane juice' },
                        { icon: '🍌', name: 'Chek Chien', desc: 'Fried bananas' },
                        { icon: '🍜', name: 'Kuy Teav', desc: 'Morning noodle soup' },
                        { icon: '🥜', name: 'Sandek Neung', desc: 'Steamed peanuts' }
                    ]
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

/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>
