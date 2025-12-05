<template>
    <div class="min-h-screen py-4 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-4 sm:mt-6">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    🌙 Moon Phase Tracker
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Track lunar phases and moon times
                </p>
            </div>

            <!-- Current Moon Phase Card - Mobile Optimized -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-6 border border-gray-200 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <!-- Moon Visual -->
                    <div class="flex-shrink-0">
                        <div class="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden shadow-xl">
                            <div class="text-6xl sm:text-8xl">{{ currentMoonPhase.emoji }}</div>
                            <div class="absolute inset-0 rounded-full" :style="moonPhaseStyle"></div>
                        </div>
                    </div>

                    <!-- Moon Info -->
                    <div class="flex-1 text-center sm:text-left w-full">
                        <h2 class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ currentMoonPhase.name }}
                        </h2>
                        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                            {{ currentMoonPhase.description }}
                        </p>

                        <div class="grid grid-cols-2 gap-3 sm:gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Illumination</div>
                                <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ moonIllumination }}%</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Days to Full</div>
                                <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ daysUntilFullMoon }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Moonrise</div>
                                <div class="text-base sm:text-xl font-bold text-gray-900 dark:text-white">{{ moonriseTime }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Moonset</div>
                                <div class="text-base sm:text-xl font-bold text-gray-900 dark:text-white">{{ moonsetTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Moon Phase Calendar - Mobile Optimized -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Lunar Calendar</h3>
                <div class="grid grid-cols-7 gap-2 sm:gap-3">
                    <div 
                        v-for="(day, index) in lunarCalendar" 
                        :key="index"
                        class="text-center p-2 sm:p-3 rounded-lg border-2 transition-all"
                        :class="day.isToday 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700'"
                    >
                        <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ day.date }}</div>
                        <div class="text-2xl sm:text-3xl mb-1">{{ day.emoji }}</div>
                        <div class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ day.phase }}</div>
                        <div v-if="day.isToday" class="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">Today</div>
                    </div>
                </div>
            </div>

            <!-- Upcoming Moon Events -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                <div class="space-y-3">
                    <div 
                        v-for="event in upcomingEvents" 
                        :key="event.date"
                        class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                        <div class="text-3xl sm:text-4xl flex-shrink-0">{{ event.emoji }}</div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{{ event.name }}</div>
                            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ event.date }}</div>
                        </div>
                        <div class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">{{ event.daysUntil }}</div>
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
    const hour = (12 + Math.random() * 6) % 24
    return `${Math.floor(hour)}:${Math.floor((hour % 1) * 60).toString().padStart(2, '0')}`
})

const moonsetTime = computed(() => {
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
            phaseName = 'Wax'
        } else if (phase < 0.28) {
            emoji = '🌓'
            phaseName = '1Q'
        } else if (phase < 0.47) {
            emoji = '🌔'
            phaseName = 'Wax'
        } else if (phase < 0.53) {
            emoji = '🌕'
            phaseName = 'Full'
        } else if (phase < 0.72) {
            emoji = '🌖'
            phaseName = 'Wan'
        } else if (phase < 0.78) {
            emoji = '🌗'
            phaseName = 'LQ'
        } else {
            emoji = '🌘'
            phaseName = 'Wan'
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
        date: nextFullMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysUntil: Math.round(Math.abs(daysToFull)) === 0 ? 'Today' : `${Math.round(Math.abs(daysToFull))} days`
    })
    
    const daysToNew = 29.53 - (daysSinceNewMoon % 29.53)
    const nextNewMoon = new Date(now)
    nextNewMoon.setDate(nextNewMoon.getDate() + Math.round(daysToNew))
    
    events.push({
        name: 'New Moon',
        emoji: '🌑',
        date: nextNewMoon.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysUntil: `${Math.round(daysToNew)} days`
    })
    
    return events
})
</script>

<style scoped>
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
</style>
