<template>
    <div class="min-h-screen py-4 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-4 sm:mt-6">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    🛰️ ISS Tracker
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Live International Space Station position
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-12">
                <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading ISS data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                <p class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
                <button @click="fetchISSData" class="mt-2 text-sm text-red-600 dark:text-red-400 underline">Retry</button>
            </div>

            <!-- Main Content -->
            <div v-else class="space-y-4 sm:space-y-6">
                <!-- Stats Cards - Mobile Optimized -->
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Speed</div>
                        <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ issData.speed }} km/h</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Altitude</div>
                        <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ issData.altitude }} km</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Latitude</div>
                        <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ issData.latitude }}°</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Longitude</div>
                        <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ issData.longitude }}°</div>
                    </div>
                </div>

                <!-- World Map -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Current Position</h2>
                    <div class="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden" style="height: 400px;">
                        <!-- World Map SVG -->
                        <svg viewBox="0 0 1000 500" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <!-- Continents (simplified) -->
                            <path d="M150,200 Q200,150 250,180 T350,200 Q400,220 450,200 T550,200 Q600,180 650,200 T750,200 Q800,220 850,200" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" opacity="0.3"/>
                            <path d="M200,300 Q250,280 300,300 T400,320 Q450,340 500,320 T600,300 Q650,280 700,300" 
                                  fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" opacity="0.3"/>
                            
                            <!-- ISS Position Marker -->
                            <circle 
                                :cx="(issData.longitude + 180) * (1000 / 360)" 
                                :cy="(90 - issData.latitude) * (500 / 180)"
                                r="8" 
                                fill="#EF4444" 
                                stroke="#fff" 
                                stroke-width="2"
                                class="animate-pulse"
                            >
                                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <circle 
                                :cx="(issData.longitude + 180) * (1000 / 360)" 
                                :cy="(90 - issData.latitude) * (500 / 180)"
                                r="20" 
                                fill="#EF4444" 
                                opacity="0.2"
                                class="animate-ping"
                            />
                            
                            <!-- Trail -->
                            <polyline 
                                v-if="trail.length > 1"
                                :points="trail.map(p => `${(p.longitude + 180) * (1000 / 360)},${(90 - p.latitude) * (500 / 180)}`).join(' ')"
                                fill="none" 
                                stroke="#EF4444" 
                                stroke-width="2" 
                                opacity="0.5"
                                stroke-dasharray="5,5"
                            />
                        </svg>
                        
                        <!-- Location Info Overlay -->
                        <div class="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Location</div>
                            <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentLocation }}</div>
                            <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {{ issData.latitude.toFixed(2) }}°N, {{ issData.longitude.toFixed(2) }}°E
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Info -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">ISS Information</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Orbital Period:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">~93 minutes</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Orbits Per Day:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">15.5</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Crew Members:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ crewCount }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Launch Date:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">Nov 20, 1998</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Mass:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">~450,000 kg</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Size:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">109m × 73m</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Orbit Details</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Inclination:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">51.6°</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Orbital Speed:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">7.66 km/s</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Distance Traveled:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">~7.7M km/day</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Total Orbits:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">~150,000+</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Countries Visible:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">90+</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Last Updated:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ lastUpdated }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Refresh Button -->
                <div class="flex justify-center">
                    <button 
                        @click="fetchISSData"
                        :disabled="loading"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Position
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

// Get location name from coordinates
const getLocationName = (lat, lon) => {
    // Simplified location detection
    if (lat > 60) return 'Arctic Region'
    if (lat < -60) return 'Antarctic Region'
    if (lon > 20 && lon < 140 && lat > -10 && lat < 50) return 'Asia'
    if (lon > -10 && lon < 40 && lat > 35 && lat < 70) return 'Europe'
    if (lon > -130 && lon < -50 && lat > 25 && lat < 50) return 'North America'
    if (lon > -80 && lon < -30 && lat > -60 && lat < 15) return 'South America'
    if (lon > -20 && lon < 50 && lat > -35 && lat < 35) return 'Africa'
    if (lon > 110 && lon < 155 && lat > -45 && lat < -10) return 'Australia'
    if (lon > -180 && lon < -100 && lat > 0 && lat < 70) return 'Pacific Ocean'
    if (lon > -50 && lon < 20 && lat > 0 && lat < 70) return 'Atlantic Ocean'
    return 'Ocean'
}

const currentLocation = computed(() => {
    return getLocationName(issData.value.latitude, issData.value.longitude)
})

const fetchISSData = async () => {
    loading.value = true
    error.value = null
    
    try {
        // Using Open Notify API via proxy or direct fetch
        // Note: If CORS issues occur, you may need a proxy server
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        
        if (!response.ok) {
            // Fallback to simulated data if API fails
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        issData.value = {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            altitude: Math.round(data.altitude || 408),
            speed: Math.round((data.velocity || 7.66) * 3600), // Convert km/s to km/h
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
    } catch (err) {
        logger.error('Error fetching ISS data:', err)
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
@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
