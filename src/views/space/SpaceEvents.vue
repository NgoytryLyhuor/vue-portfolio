<template>
    <div class="min-h-screen py-4 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-4 sm:mt-6">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    📅 Space Events Calendar
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Upcoming astronomical events
                </p>
            </div>

            <!-- Filter Tabs - Mobile Optimized -->
            <div class="flex flex-wrap gap-2 mb-6 justify-center">
                <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                        'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                        selectedCategory === category
                            ? 'bg-purple-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    ]"
                >
                    {{ category }}
                </button>
            </div>

            <!-- Events List - Mobile Optimized -->
            <div class="space-y-3 sm:space-y-4">
                <div 
                    v-for="event in filteredEvents" 
                    :key="event.id"
                    class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                    <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <!-- Event Icon -->
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl"
                                :style="{ backgroundColor: event.color + '20' }">
                                {{ event.emoji }}
                            </div>
                        </div>

                        <!-- Event Info -->
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <div class="flex-1 min-w-0">
                                    <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                                        {{ event.name }}
                                    </h3>
                                    <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {{ event.date }}
                                    </div>
                                </div>
                                <span 
                                    class="px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 w-fit"
                                    :style="{ backgroundColor: event.color + '20', color: event.color }"
                                >
                                    {{ event.category }}
                                </span>
                            </div>
                            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">{{ event.description }}</p>
                            <div v-if="event.details" class="flex flex-wrap gap-2">
                                <div 
                                    v-for="(detail, index) in event.details" 
                                    :key="index"
                                    class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                                >
                                    {{ detail }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredEvents.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div class="text-5xl sm:text-6xl mb-4">🔭</div>
                <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">No events found in this category</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('All')
const categories = ['All', 'Meteor Showers', 'Eclipses', 'Planetary Events', 'Rocket Launches', 'Space Missions']

const events = [
    {
        id: 1,
        name: 'Geminids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'December 13-14, 2024',
        description: 'One of the best meteor showers of the year, producing up to 120 meteors per hour at peak. The Geminids are known for their bright, colorful meteors.',
        details: ['Peak: Dec 14, 2:00 AM', '120 meteors/hour', 'Best viewing: After midnight']
    },
    {
        id: 2,
        name: 'Total Solar Eclipse',
        emoji: '🌑',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'April 8, 2024',
        description: 'A total solar eclipse will be visible across North America. The path of totality will stretch from Mexico through the United States to Canada.',
        details: ['Duration: ~4 minutes', 'Path: Mexico → USA → Canada', 'Next: 2026']
    },
    {
        id: 3,
        name: 'Jupiter Opposition',
        emoji: '♃',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'December 7, 2024',
        description: 'Jupiter will be at its closest approach to Earth and fully illuminated by the Sun, making it the best time to observe the gas giant.',
        details: ['Brightest of the year', 'Visible all night', 'Great for telescopes']
    },
    {
        id: 4,
        name: 'Perseids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'August 12-13, 2024',
        description: 'The most popular meteor shower, known for its fast and bright meteors. Up to 100 meteors per hour at peak.',
        details: ['Peak: Aug 13, 2:00 AM', '100 meteors/hour', 'Warm summer nights']
    },
    {
        id: 5,
        name: 'Mars Opposition',
        emoji: '♂️',
        category: 'Planetary Events',
        color: '#EF4444',
        date: 'January 15, 2025',
        description: 'Mars will be at its closest approach to Earth, appearing larger and brighter than usual. Perfect for observing the Red Planet.',
        details: ['Closest approach', 'Visible all night', 'Red-orange color']
    },
    {
        id: 6,
        name: 'Lunar Eclipse',
        emoji: '🌕',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'March 25, 2024',
        description: 'A penumbral lunar eclipse will be visible from parts of North America, Europe, and Africa.',
        details: ['Penumbral type', 'Visible: Americas, Europe', 'Duration: ~4 hours']
    },
    {
        id: 7,
        name: 'Artemis III Mission',
        emoji: '🚀',
        category: 'Space Missions',
        color: '#10B981',
        date: 'September 2026',
        description: 'NASA\'s Artemis III mission aims to land astronauts on the Moon for the first time since 1972, including the first woman and person of color.',
        details: ['First woman on Moon', 'Lunar South Pole', 'Historic mission']
    },
    {
        id: 8,
        name: 'Saturn Opposition',
        emoji: '♄',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'September 8, 2024',
        description: 'Saturn will be at opposition, making it the best time to observe the ringed planet and its beautiful rings.',
        details: ['Rings visible', 'Brightest of year', 'Great for telescopes']
    },
    {
        id: 9,
        name: 'Quadrantids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'January 3-4, 2025',
        description: 'The first major meteor shower of the year, known for bright fireball meteors. Peak rates of up to 120 meteors per hour.',
        details: ['Peak: Jan 4, 3:00 AM', '120 meteors/hour', 'Short peak window']
    },
    {
        id: 10,
        name: 'James Webb Space Telescope Observations',
        emoji: '🔭',
        category: 'Space Missions',
        color: '#10B981',
        date: 'Ongoing',
        description: 'The JWST continues to make groundbreaking discoveries, observing distant galaxies, exoplanets, and the early universe.',
        details: ['Deep space images', 'Exoplanet studies', 'Revolutionary science']
    }
]

const filteredEvents = computed(() => {
    if (selectedCategory.value === 'All') {
        return events
    }
    return events.filter(event => event.category === selectedCategory.value)
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
