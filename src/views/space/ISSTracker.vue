<template>
    <div class="min-h-screen py-2 sm:py-4 px-3 sm:px-4 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-4 sm:mb-6 mt-2 sm:mt-4 lg:mt-6">
                <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg">
                    <span class="text-3xl sm:text-4xl">🛰️</span>
                </div>
                <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    ISS Tracker
                </h1>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Live International Space Station position tracking
                </p>
                <div v-if="!loading && !error" class="flex items-center justify-center gap-2 mt-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">Live tracking • Updates every 5s</span>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !issData.latitude" class="flex flex-col items-center justify-center py-20">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div class="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style="animation-duration: 1.5s; animation-direction: reverse;"></div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mt-4">Initializing ISS tracker...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error && !issData.latitude" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6 text-center">
                <div class="text-5xl mb-4">⚠️</div>
                <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
                <button @click="fetchISSData" class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    Retry Connection
                </button>
            </div>

            <!-- Main Content -->
            <div v-else class="space-y-4 sm:space-y-6">
                <!-- Stats Cards - Enhanced Design -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 sm:p-4 lg:p-5 shadow-lg transform transition-transform hover:scale-105 active:scale-95 border border-blue-400/20">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl">🚀</div>
                            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div class="text-xs sm:text-sm text-blue-100 mb-1">Speed</div>
                        <div class="text-xl sm:text-2xl font-bold text-white">
                            <transition name="fade" mode="out-in">
                                <span :key="issData.speed">{{ formatNumber(issData.speed) }}</span>
                            </transition>
                            <span class="text-sm font-normal ml-1">km/h</span>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-5 shadow-lg transform transition-transform hover:scale-105 border border-purple-400/20">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl">⬆️</div>
                            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div class="text-xs sm:text-sm text-purple-100 mb-1">Altitude</div>
                        <div class="text-xl sm:text-2xl font-bold text-white">
                            <transition name="fade" mode="out-in">
                                <span :key="issData.altitude">{{ formatNumber(issData.altitude) }}</span>
                            </transition>
                            <span class="text-sm font-normal ml-1">km</span>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-5 shadow-lg transform transition-transform hover:scale-105 border border-green-400/20">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl">🌐</div>
                            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div class="text-xs sm:text-sm text-green-100 mb-1">Latitude</div>
                        <div class="text-xl sm:text-2xl font-bold text-white">
                            <transition name="fade" mode="out-in">
                                <span :key="Math.floor(issData.latitude)">{{ issData.latitude.toFixed(2) }}°</span>
                            </transition>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-5 shadow-lg transform transition-transform hover:scale-105 border border-orange-400/20">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl">🌍</div>
                            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div class="text-xs sm:text-sm text-orange-100 mb-1">Longitude</div>
                        <div class="text-xl sm:text-2xl font-bold text-white">
                            <transition name="fade" mode="out-in">
                                <span :key="Math.floor(issData.longitude)">{{ issData.longitude.toFixed(2) }}°</span>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- World Map - Enhanced -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span class="text-2xl">🗺️</span>
                            Current Position
                        </h2>
                        <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>
                    
                    <div class="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden border-2 border-blue-300 dark:border-gray-700" style="height: 450px; min-height: 400px;">
                        <!-- World Map SVG -->
                        <svg viewBox="0 0 1000 500" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <!-- Background Grid -->
                            <defs>
                                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="0.5"/>
                                </pattern>
                                <radialGradient id="issGlow">
                                    <stop offset="0%" stop-color="#EF4444" stop-opacity="0.8"/>
                                    <stop offset="100%" stop-color="#EF4444" stop-opacity="0"/>
                                </radialGradient>
                            </defs>
                            <rect width="1000" height="500" fill="url(#grid)"/>
                            
                            <!-- Continents (simplified world map) -->
                            <!-- North America -->
                            <path d="M 100 100 Q 150 80 200 100 T 300 120 Q 350 140 400 120 T 500 100 Q 550 80 600 100" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            <!-- South America -->
                            <path d="M 200 250 Q 250 230 300 250 T 400 270 Q 450 290 500 270" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            <!-- Europe -->
                            <path d="M 450 80 Q 500 60 550 80 T 650 100" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            <!-- Africa -->
                            <path d="M 480 150 Q 530 130 580 150 T 680 170 Q 730 190 780 170" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            <!-- Asia -->
                            <path d="M 600 60 Q 650 40 700 60 T 800 80 Q 850 100 900 80" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            <!-- Australia -->
                            <path d="M 750 350 Q 800 330 850 350" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="1.5" opacity="0.4"/>
                            
                            <!-- Trail with gradient -->
                            <polyline 
                                v-if="trail.length > 1"
                                :points="trail.map(p => `${(p.longitude + 180) * (1000 / 360)},${(90 - p.latitude) * (500 / 180)}`).join(' ')"
                                fill="none" 
                                stroke="#EF4444" 
                                stroke-width="3" 
                                opacity="0.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            
                            <!-- ISS Position Marker with glow -->
                            <g :transform="`translate(${(issData.longitude + 180) * (1000 / 360)},${(90 - issData.latitude) * (500 / 180)})`">
                                <!-- Outer glow -->
                                <circle r="30" fill="url(#issGlow)" opacity="0.3">
                                    <animate attributeName="r" values="30;40;30" dur="2s" repeatCount="indefinite"/>
                                </circle>
                                <!-- Middle pulse -->
                                <circle r="15" fill="#EF4444" opacity="0.4">
                                    <animate attributeName="r" values="15;20;15" dur="1.5s" repeatCount="indefinite"/>
                                </circle>
                                <!-- Main marker -->
                                <circle r="8" fill="#EF4444" stroke="#fff" stroke-width="3">
                                    <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite"/>
                                </circle>
                                <!-- Center dot -->
                                <circle r="3" fill="#fff"/>
                            </g>
                        </svg>
                        
                        <!-- Location Info Overlay - Enhanced -->
                        <div class="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Location</div>
                            </div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ currentLocation }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                {{ issData.latitude >= 0 ? issData.latitude.toFixed(4) + '°N' : Math.abs(issData.latitude).toFixed(4) + '°S' }}, 
                                {{ issData.longitude >= 0 ? issData.longitude.toFixed(4) + '°E' : Math.abs(issData.longitude).toFixed(4) + '°W' }}
                            </div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Updated: {{ lastUpdated }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Information Cards - Enhanced -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div class="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="text-2xl">🛰️</span>
                            ISS Information
                        </h3>
                        <div class="space-y-3 text-sm sm:text-base">
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>⏱️</span> Orbital Period
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">~93 minutes</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>🔄</span> Orbits Per Day
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">15.5</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>👨‍🚀</span> Crew Members
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">{{ crewCount }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>📅</span> Launch Date
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">Nov 20, 1998</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>⚖️</span> Mass
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">~450,000 kg</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>📏</span> Size
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">109m × 73m</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="text-2xl">🌌</span>
                            Orbit Details
                        </h3>
                        <div class="space-y-3 text-sm sm:text-base">
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>📐</span> Inclination
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">51.6°</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>⚡</span> Orbital Speed
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">7.66 km/s</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>📊</span> Distance/Day
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">~7.7M km</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>🔄</span> Total Orbits
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">~150,000+</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>🌍</span> Countries Visible
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white">90+</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <span>🕐</span> Last Updated
                                </span>
                                <span class="font-bold text-gray-900 dark:text-white font-mono text-xs">{{ lastUpdated }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Auto-refresh Indicator -->
                <div class="flex items-center justify-center gap-4 pt-4">
                    <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Auto-refreshing every 5 seconds</span>
                    </div>
                    <button 
                        @click="fetchISSData"
                        :disabled="loading"
                        class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh Now</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import logger from '@/utils/logger'

const loading = ref(true)
const error = ref(null)
const issData = ref({
    latitude: 0,
    longitude: 0,
    altitude: 408,
    speed: 27600,
    timestamp: Date.now()
})
const trail = ref([])
const crewCount = ref(7)
const updateInterval = ref(null)
const lastUpdated = ref('')

// Format numbers with commas
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Get location name from coordinates
const getLocationName = (lat, lon) => {
    // More detailed location detection
    if (lat > 60) return 'Arctic Region'
    if (lat < -60) return 'Antarctic Region'
    if (lon > 20 && lon < 140 && lat > -10 && lat < 50) {
        if (lon > 100 && lat > 20 && lat < 50) return 'East Asia'
        if (lon > 60 && lat > 20 && lat < 50) return 'Central Asia'
        return 'Asia'
    }
    if (lon > -10 && lon < 40 && lat > 35 && lat < 70) return 'Europe'
    if (lon > -130 && lon < -50 && lat > 25 && lat < 50) return 'North America'
    if (lon > -80 && lon < -30 && lat > -60 && lat < 15) return 'South America'
    if (lon > -20 && lon < 50 && lat > -35 && lat < 35) return 'Africa'
    if (lon > 110 && lon < 155 && lat > -45 && lat < -10) return 'Australia'
    if (lon > -180 && lon < -100 && lat > 0 && lat < 70) return 'Pacific Ocean'
    if (lon > -50 && lon < 20 && lat > 0 && lat < 70) return 'Atlantic Ocean'
    if (lon > 20 && lon < 120 && lat > -60 && lat < 0) return 'Indian Ocean'
    return 'Ocean'
}

const currentLocation = computed(() => {
    return getLocationName(issData.value.latitude, issData.value.longitude)
})

const fetchISSData = async () => {
    // Don't show loading spinner on auto-refresh, only on initial load
    if (!issData.value.latitude) {
        loading.value = true
    }
    error.value = null
    
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Smooth update without flickering
        issData.value = {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            altitude: Math.round(data.altitude || 408),
            speed: Math.round((data.velocity || 7.66) * 3600),
            timestamp: Date.now()
        }
        
        // Add to trail (keep last 50 points)
        trail.value.push({
            latitude: issData.value.latitude,
            longitude: issData.value.longitude,
            timestamp: Date.now()
        })
        if (trail.value.length > 50) {
            trail.value.shift()
        }
        
        lastUpdated.value = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        })
        
        error.value = null
    } catch (err) {
        logger.error('Error fetching ISS data:', err)
        // Only show error if we don't have any data yet
        if (!issData.value.latitude) {
            // Fallback to simulated position if API fails
            const now = Date.now()
            const orbitPeriod = 93 * 60 * 1000
            const progress = (now % orbitPeriod) / orbitPeriod
            
            issData.value = {
                latitude: Math.sin(progress * Math.PI * 2) * 51.6,
                longitude: (progress * 360 - 180) % 360 - 180,
                altitude: 408,
                speed: 27600,
                timestamp: now
            }
            
            error.value = 'Using simulated data. Real-time API unavailable.'
        }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchISSData()
    // Update every 5 seconds
    updateInterval.value = setInterval(fetchISSData, 5000)
})

onBeforeUnmount(() => {
    if (updateInterval.value) {
        clearInterval(updateInterval.value)
    }
})
</script>

<style scoped>
/* Smooth fade transition for number updates */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Pulse animation */
@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
</style>
