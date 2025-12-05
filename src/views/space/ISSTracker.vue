<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8 mt-8 sm:mt-10">
                <div class="flex items-center justify-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        ISS Tracker
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Track the International Space Station in real-time
                </p>
            </div>

            <!-- ISS Info Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Speed</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ issSpeed }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Altitude</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ issAltitude }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Orbits Per Day</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">15.5</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Crew Members</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ crewCount }}</div>
                </div>
            </div>

            <!-- World Map with ISS Position -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Current Position</h3>
                <div class="relative bg-gray-100 dark:bg-gray-700 rounded-xl h-96 overflow-hidden">
                    <!-- Simplified world map representation -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <div class="text-6xl mb-4">🌍</div>
                            <div class="text-lg text-gray-600 dark:text-gray-400 mb-2">ISS Current Location</div>
                            <div class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ currentPosition.latitude.toFixed(2) }}°N, {{ currentPosition.longitude.toFixed(2) }}°E
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Over: {{ currentLocation }}
                            </div>
                        </div>
                    </div>
                    <!-- ISS Icon moving -->
                    <div 
                        class="absolute text-4xl animate-pulse"
                        :style="{ 
                            left: `${(currentPosition.longitude + 180) / 360 * 100}%`,
                            top: `${(90 - currentPosition.latitude) / 180 * 100}%`,
                            transform: 'translate(-50%, -50%)'
                        }"
                    >
                        🛰️
                    </div>
                </div>
            </div>

            <!-- Next Passes -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Next Visible Passes</h3>
                <div class="space-y-4">
                    <div 
                        v-for="(pass, index) in nextPasses" 
                        :key="index"
                        class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                        <div class="flex items-center gap-4">
                            <div class="text-3xl">🛰️</div>
                            <div>
                                <div class="font-semibold text-gray-900 dark:text-white">{{ pass.date }}</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">{{ pass.time }}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ pass.duration }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ISS Facts -->
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    ISS Facts
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-sm opacity-90 mb-1">Launch Date</div>
                        <div class="text-xl font-bold">November 20, 1998</div>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-sm opacity-90 mb-1">Orbital Period</div>
                        <div class="text-xl font-bold">~93 minutes</div>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-sm opacity-90 mb-1">Mass</div>
                        <div class="text-xl font-bold">~450,000 kg</div>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div class="text-sm opacity-90 mb-1">Size</div>
                        <div class="text-xl font-bold">109m × 73m</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const issSpeed = ref('27,600 km/h')
const issAltitude = ref('408 km')
const crewCount = ref(7)
const currentPosition = ref({ latitude: 0, longitude: 0 })
const currentLocation = ref('Loading...')
const updateInterval = ref(null)

const locations = [
    'Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Asia', 'Europe', 
    'North America', 'South America', 'Africa', 'Australia', 'Arctic Ocean'
]

const nextPasses = ref([
    { date: 'Today', time: '18:45', duration: '6 min' },
    { date: 'Tomorrow', time: '20:12', duration: '4 min' },
    { date: 'Tomorrow', time: '21:48', duration: '5 min' }
])

const updateISSPosition = () => {
    // Simulate ISS movement (orbits Earth every ~93 minutes)
    const now = Date.now()
    const orbitPeriod = 93 * 60 * 1000 // 93 minutes in milliseconds
    const progress = (now % orbitPeriod) / orbitPeriod
    
    // ISS orbit: ~51.6° inclination, moves west to east
    currentPosition.value = {
        latitude: Math.sin(progress * Math.PI * 2) * 51.6,
        longitude: (progress * 360 - 180) % 360 - 180
    }
    
    // Update location name (simplified)
    const locationIndex = Math.floor(Math.abs(currentPosition.value.longitude) / 36)
    currentLocation.value = locations[locationIndex % locations.length]
}

onMounted(() => {
    updateISSPosition()
    updateInterval.value = setInterval(updateISSPosition, 1000) // Update every second
})

onBeforeUnmount(() => {
    if (updateInterval.value) {
        clearInterval(updateInterval.value)
    }
})
</script>

<style scoped>
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

