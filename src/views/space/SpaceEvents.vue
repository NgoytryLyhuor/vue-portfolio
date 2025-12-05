<template>
    <div class="min-h-screen py-2 sm:py-4 px-3 sm:px-4 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-4 sm:mb-6 mt-2 sm:mt-4 lg:mt-6">
                <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    📅 Space Events Calendar
                </h1>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Upcoming astronomical events
                </p>
            </div>

            <!-- Filter Tabs - Mobile Optimized -->
            <div class="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center px-2">
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

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-12">
                <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading events...</p>
            </div>

            <!-- Events List - Mobile Optimized -->
            <div v-else class="space-y-3 sm:space-y-4 px-2">
                <div 
                    v-for="event in filteredEvents" 
                    :key="event.id"
                    @click="viewEventDetail(event)"
                    class="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 cursor-pointer active:scale-[0.98]"
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
                            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{{ event.description }}</p>
                            <div v-if="event.details" class="flex flex-wrap gap-2 mb-3">
                                <div 
                                    v-for="(detail, index) in event.details.slice(0, 3)" 
                                    :key="index"
                                    class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                                >
                                    {{ detail }}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                                <span>Read more</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logger from '@/utils/logger'

const router = useRouter()
const loading = ref(false)
const selectedCategory = ref('All')
const categories = ['All', 'Meteor Showers', 'Eclipses', 'Planetary Events', 'Rocket Launches', 'Space Missions']
const rocketLaunches = ref([])

const events = [
    {
        id: 1,
        name: 'Geminids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'December 13-14, 2024',
        description: 'One of the best meteor showers of the year, producing up to 120 meteors per hour at peak. The Geminids are known for their bright, colorful meteors.',
        fullDescription: 'The Geminids meteor shower is one of the most spectacular annual meteor showers, known for producing bright, colorful meteors. Unlike most meteor showers that originate from comets, the Geminids come from an asteroid called 3200 Phaethon. The shower typically peaks around December 13-14 each year, with the best viewing times being after midnight when the constellation Gemini is highest in the sky.',
        details: ['Peak: Dec 14, 2:00 AM', '120 meteors/hour', 'Best viewing: After midnight', 'Active: Dec 4-17', 'Radiant: Gemini']
    },
    {
        id: 2,
        name: 'Total Solar Eclipse',
        emoji: '🌑',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'April 8, 2024',
        description: 'A total solar eclipse will be visible across North America. The path of totality will stretch from Mexico through the United States to Canada.',
        fullDescription: 'A total solar eclipse occurs when the Moon passes directly between the Earth and the Sun, completely blocking the Sun\'s light. The April 8, 2024 eclipse will be visible across a path stretching from Mexico through the United States to Canada. The path of totality will be approximately 115 miles wide with a maximum duration of about 4 minutes 28 seconds.',
        details: ['Duration: ~4 minutes', 'Path: Mexico → USA → Canada', 'Next: 2026', 'Width: 115 miles', 'Type: Total']
    },
    {
        id: 3,
        name: 'Jupiter Opposition',
        emoji: '♃',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'December 7, 2024',
        description: 'Jupiter will be at its closest approach to Earth and fully illuminated by the Sun, making it the best time to observe the gas giant.',
        fullDescription: 'Jupiter opposition occurs when Jupiter, Earth, and the Sun are aligned, with Earth in the middle. This is the best time to observe Jupiter because it is at its closest approach to Earth, fully illuminated by the Sun, and visible all night long. During opposition, Jupiter can reach a magnitude of -2.9, making it one of the brightest objects in the night sky.',
        details: ['Brightest of the year', 'Visible all night', 'Great for telescopes', 'Magnitude: -2.9', 'Distance: ~4 AU']
    },
    {
        id: 4,
        name: 'Perseids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'August 12-13, 2024',
        description: 'The most popular meteor shower, known for its fast and bright meteors. Up to 100 meteors per hour at peak.',
        fullDescription: 'The Perseids are one of the most popular meteor showers, occurring every August when Earth passes through the debris left by Comet Swift-Tuttle. Known for their fast and bright meteors, the Perseids can produce up to 100 meteors per hour at peak. The shower is active from mid-July to late August, with peak activity around August 12-13.',
        details: ['Peak: Aug 13, 2:00 AM', '100 meteors/hour', 'Warm summer nights', 'Active: Jul 17 - Aug 24', 'Radiant: Perseus']
    },
    {
        id: 5,
        name: 'Mars Opposition',
        emoji: '♂️',
        category: 'Planetary Events',
        color: '#EF4444',
        date: 'January 15, 2025',
        description: 'Mars will be at its closest approach to Earth, appearing larger and brighter than usual. Perfect for observing the Red Planet.',
        fullDescription: 'Mars opposition occurs approximately every 26 months when Mars and Earth are on the same side of the Sun. During opposition, Mars is at its closest approach to Earth, making it appear larger and brighter in the night sky. This is the best time to observe the Red Planet, when surface features like polar ice caps and dark surface markings are more visible through telescopes.',
        details: ['Closest approach', 'Visible all night', 'Red-orange color', 'Occurs every 26 months', 'Best for telescopes']
    },
    {
        id: 6,
        name: 'Lunar Eclipse',
        emoji: '🌕',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'March 25, 2024',
        description: 'A penumbral lunar eclipse will be visible from parts of North America, Europe, and Africa.',
        fullDescription: 'A penumbral lunar eclipse occurs when the Moon passes through Earth\'s penumbral shadow (the outer, lighter part of Earth\'s shadow). Unlike a total lunar eclipse, the Moon doesn\'t turn red but appears slightly dimmed. This type of eclipse is more subtle and may be difficult to notice without careful observation.',
        details: ['Penumbral type', 'Visible: Americas, Europe', 'Duration: ~4 hours', 'Subtle effect', 'Safe to view']
    },
    {
        id: 7,
        name: 'Artemis III Mission',
        emoji: '🚀',
        category: 'Space Missions',
        color: '#10B981',
        date: 'September 2026',
        description: 'NASA\'s Artemis III mission aims to land astronauts on the Moon for the first time since 1972, including the first woman and person of color.',
        fullDescription: 'Artemis III is NASA\'s planned mission to return humans to the Moon, scheduled for September 2026. This historic mission will land astronauts near the lunar South Pole, an area never before explored by humans. The mission will include the first woman and first person of color to walk on the Moon. The crew will conduct scientific research, test new technologies, and prepare for future Mars missions.',
        details: ['First woman on Moon', 'Lunar South Pole', 'Historic mission', 'Duration: ~30 days', 'Crew: 4 astronauts']
    },
    {
        id: 8,
        name: 'Saturn Opposition',
        emoji: '♄',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'September 8, 2024',
        description: 'Saturn will be at opposition, making it the best time to observe the ringed planet and its beautiful rings.',
        fullDescription: 'Saturn opposition occurs when Saturn, Earth, and the Sun are aligned. During this time, Saturn is at its closest approach to Earth and fully illuminated, making it the best time to observe the ringed planet. Saturn\'s spectacular ring system is most visible during opposition, and even a small telescope can reveal the rings and some of Saturn\'s largest moons like Titan.',
        details: ['Rings visible', 'Brightest of year', 'Great for telescopes', 'Magnitude: ~0.5', 'Rings tilt visible']
    },
    {
        id: 9,
        name: 'Quadrantids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'January 3-4, 2025',
        description: 'The first major meteor shower of the year, known for bright fireball meteors. Peak rates of up to 120 meteors per hour.',
        fullDescription: 'The Quadrantids are the first major meteor shower of the year, occurring in early January. Known for producing bright fireball meteors, the Quadrantids can reach peak rates of up to 120 meteors per hour. However, the peak is very narrow (only a few hours), so timing is crucial. The shower originates from an asteroid called 2003 EH1.',
        details: ['Peak: Jan 4, 3:00 AM', '120 meteors/hour', 'Short peak window', 'Active: Dec 28 - Jan 12', 'Fireball meteors']
    },
    {
        id: 10,
        name: 'James Webb Space Telescope Observations',
        emoji: '🔭',
        category: 'Space Missions',
        color: '#10B981',
        date: 'Ongoing',
        description: 'The JWST continues to make groundbreaking discoveries, observing distant galaxies, exoplanets, and the early universe.',
        fullDescription: 'The James Webb Space Telescope (JWST) is NASA\'s premier space observatory, launched in December 2021. It continues to make groundbreaking discoveries, observing the universe in infrared light. JWST studies distant galaxies, exoplanet atmospheres, star formation, and the early universe. Its observations have already revolutionized our understanding of the cosmos and continue to provide stunning images and scientific data.',
        details: ['Deep space images', 'Exoplanet studies', 'Revolutionary science', 'Infrared observations', 'Launched: Dec 2021']
    }
]

const fetchRocketLaunches = async () => {
    loading.value = true
    try {
        // Using The Space Devs API (free, no API key needed for basic usage)
        const response = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&mode=detailed')
        
        if (response.ok) {
            const data = await response.json()
            if (data.results) {
                rocketLaunches.value = data.results.map((launch) => ({
                    id: `launch-${launch.id}`,
                    name: launch.name || 'Upcoming Launch',
                    emoji: '🚀',
                    category: 'Rocket Launches',
                    color: '#10B981',
                    date: launch.net ? new Date(launch.net).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'TBD',
                    description: launch.mission?.description || launch.launch_service_provider?.description || 'Upcoming rocket launch mission.',
                    details: [
                        launch.rocket?.configuration?.name || 'Rocket TBD',
                        launch.pad?.location?.name || 'Location TBD',
                        launch.status?.name || 'Scheduled'
                    ],
                    fullDescription: launch.mission?.description || launch.launch_service_provider?.description || 'Upcoming rocket launch mission.',
                    mission: launch.mission,
                    rocket: launch.rocket,
                    pad: launch.pad,
                    agency: launch.launch_service_provider,
                    image: launch.image,
                    video: launch.video_url,
                    webcast: launch.webcast_live,
                    status: launch.status
                }))
            }
        }
    } catch (err) {
        logger.error('Error fetching rocket launches:', err)
        // Continue with static events if API fails
    } finally {
        loading.value = false
    }
}

const allEvents = computed(() => {
    return [...events, ...rocketLaunches.value]
})

const filteredEvents = computed(() => {
    const eventsToFilter = allEvents.value
    if (selectedCategory.value === 'All') {
        return eventsToFilter.sort((a, b) => {
            // Sort by date (upcoming first)
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA - dateB
        })
    }
    return eventsToFilter
        .filter(event => event.category === selectedCategory.value)
        .sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA - dateB
        })
})

const viewEventDetail = (event) => {
    // Navigate to detail page with event data
    router.push({
        name: 'space-event-detail',
        params: { id: event.id },
        state: { event }
    })
}

onMounted(() => {
    fetchRocketLaunches()
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
