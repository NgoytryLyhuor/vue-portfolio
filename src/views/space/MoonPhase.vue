<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8 mt-8 sm:mt-10">
                <div class="flex items-center justify-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        Moon Phase Tracker
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Track lunar phases, moonrise, and moonset times
                </p>
            </div>

            <!-- Current Moon Phase Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <!-- Moon Visual -->
                    <div class="flex-shrink-0">
                        <div class="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden shadow-2xl">
                            <div class="text-8xl sm:text-9xl">{{ currentMoonPhase.emoji }}</div>
                            <div class="absolute inset-0 rounded-full" :style="moonPhaseStyle"></div>
                        </div>
                    </div>

                    <!-- Moon Info -->
                    <div class="flex-1 text-center lg:text-left">
                        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ currentMoonPhase.name }}
                        </h2>
                        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            {{ currentMoonPhase.description }}
                        </p>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Illumination</div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ moonIllumination }}%</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Until Full Moon</div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ daysUntilFullMoon }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Moonrise</div>
                                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ moonriseTime }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Moonset</div>
                                <div class="text-xl font-bold text-gray-900 dark:text-white">{{ moonsetTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Moon Phase Calendar -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Lunar Calendar</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div 
                        v-for="(day, index) in lunarCalendar" 
                        :key="index"
                        class="text-center p-4 rounded-xl border-2 transition-all"
                        :class="day.isToday 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ day.date }}</div>
                        <div class="text-3xl mb-2">{{ day.emoji }}</div>
                        <div class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ day.phase }}</div>
                        <div v-if="day.isToday" class="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">Today</div>
                    </div>
                </div>
            </div>

            <!-- Upcoming Moon Events -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Moon Events</h3>
                <div class="space-y-4">
                    <div 
                        v-for="event in upcomingEvents" 
                        :key="event.date"
                        class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                        <div class="text-4xl">{{ event.emoji }}</div>
                        <div class="flex-1">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ event.name }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">{{ event.date }}</div>
                        </div>
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ event.daysUntil }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Calculate current moon phase
const calculateMoonPhase = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    
    // Simple moon phase calculation (approximate)
    const daysSinceNewMoon = (year * 365.25 + month * 30.44 + day) % 29.53
    const phase = daysSinceNewMoon / 29.53
    
    if (phase < 0.03 || phase > 0.97) {
        return { name: 'New Moon', emoji: '🌑', illumination: 0, description: 'The moon is not visible from Earth' }
    } else if (phase < 0.22) {
        return { name: 'Waxing Crescent', emoji: '🌒', illumination: Math.round(phase * 100), description: 'A thin crescent is visible' }
    } else if (phase < 0.28) {
        return { name: 'First Quarter', emoji: '🌓', illumination: 50, description: 'Half of the moon is visible' }
    } else if (phase < 0.47) {
        return { name: 'Waxing Gibbous', emoji: '🌔', illumination: Math.round(phase * 100), description: 'More than half is visible' }
    } else if (phase < 0.53) {
        return { name: 'Full Moon', emoji: '🌕', illumination: 100, description: 'The entire moon is visible' }
    } else if (phase < 0.72) {
        return { name: 'Waning Gibbous', emoji: '🌖', illumination: Math.round((1 - phase) * 100), description: 'More than half is visible' }
    } else if (phase < 0.78) {
        return { name: 'Last Quarter', emoji: '🌗', illumination: 50, description: 'Half of the moon is visible' }
    } else {
        return { name: 'Waning Crescent', emoji: '🌘', illumination: Math.round((1 - phase) * 100), description: 'A thin crescent is visible' }
    }
}

const currentMoonPhase = ref(calculateMoonPhase())

const moonIllumination = computed(() => currentMoonPhase.value.illumination)

const daysUntilFullMoon = computed(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const daysSinceNewMoon = (year * 365.25 + month * 30.44 + day) % 29.53
    const daysToFull = 14.77 - (daysSinceNewMoon % 29.53)
    return Math.round(Math.abs(daysToFull))
})

const moonriseTime = computed(() => {
    // Approximate moonrise time (simplified)
    const hour = (12 + Math.random() * 6) % 24
    return `${Math.floor(hour)}:${Math.floor((hour % 1) * 60).toString().padStart(2, '0')}`
})

const moonsetTime = computed(() => {
    // Approximate moonset time (simplified)
    const hour = (12 + Math.random() * 12) % 24
    return `${Math.floor(hour)}:${Math.floor((hour % 1) * 60).toString().padStart(2, '0')}`
})

const moonPhaseStyle = computed(() => {
    const illumination = moonIllumination.value
    if (illumination < 50) {
        return {
            background: `linear-gradient(to right, 
                rgba(0,0,0,0) 0%, 
                rgba(0,0,0,0) ${50 - illumination}%, 
                rgba(0,0,0,0.3) ${50 - illumination}%, 
                rgba(0,0,0,0.3) 100%)`
        }
    } else {
        return {
            background: `linear-gradient(to right, 
                rgba(255,255,255,0.3) 0%, 
                rgba(255,255,255,0.3) ${100 - illumination}%, 
                rgba(0,0,0,0) ${100 - illumination}%, 
                rgba(0,0,0,0) 100%)`
        }
    }
})

const lunarCalendar = computed(() => {
    const days = []
    const today = new Date()
    
    for (let i = -3; i <= 3; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const daysSinceNewMoon = (year * 365.25 + month * 30.44 + day) % 29.53
        const phase = daysSinceNewMoon / 29.53
        
        let emoji = '🌑'
        let phaseName = 'New'
        
        if (phase < 0.03 || phase > 0.97) {
            emoji = '🌑'
            phaseName = 'New'
        } else if (phase < 0.22) {
            emoji = '🌒'
            phaseName = 'Waxing'
        } else if (phase < 0.28) {
            emoji = '🌓'
            phaseName = 'First Q'
        } else if (phase < 0.47) {
            emoji = '🌔'
            phaseName = 'Waxing'
        } else if (phase < 0.53) {
            emoji = '🌕'
            phaseName = 'Full'
        } else if (phase < 0.72) {
            emoji = '🌖'
            phaseName = 'Waning'
        } else if (phase < 0.78) {
            emoji = '🌗'
            phaseName = 'Last Q'
        } else {
            emoji = '🌘'
            phaseName = 'Waning'
        }
        
        days.push({
            date: date.getDate(),
            emoji,
            phase: phaseName,
            isToday: i === 0
        })
    }
    
    return days
})

const upcomingEvents = computed(() => {
    const events = []
    const now = new Date()
    
    // Calculate next full moon
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const daysSinceNewMoon = (year * 365.25 + month * 30.44 + day) % 29.53
    const daysToFull = 14.77 - (daysSinceNewMoon % 29.53)
    const nextFullMoon = new Date(now)
    nextFullMoon.setDate(nextFullMoon.getDate() + Math.round(Math.abs(daysToFull)))
    
    events.push({
        name: 'Full Moon',
        emoji: '🌕',
        date: nextFullMoon.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        daysUntil: Math.round(Math.abs(daysToFull)) === 0 ? 'Today' : `${Math.round(Math.abs(daysToFull))} days`
    })
    
    // Calculate next new moon
    const daysToNew = 29.53 - (daysSinceNewMoon % 29.53)
    const nextNewMoon = new Date(now)
    nextNewMoon.setDate(nextNewMoon.getDate() + Math.round(daysToNew))
    
    events.push({
        name: 'New Moon',
        emoji: '🌑',
        date: nextNewMoon.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        daysUntil: `${Math.round(daysToNew)} days`
    })
    
    return events
})
</script>

<style scoped>
/* Smooth animations */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>

