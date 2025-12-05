<template>
    <div class="min-h-screen py-4 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-4xl mx-auto">
            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading event details...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
                <router-link to="/space-events" class="text-blue-600 dark:text-blue-400 underline">Back to Events</router-link>
            </div>

            <!-- Event Detail -->
            <div v-else-if="event" class="space-y-6">
                <!-- Back Button -->
                <button 
                    @click="$router.back()"
                    class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-sm font-medium">Back to Events</span>
                </button>

                <!-- Header -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex items-start gap-4 sm:gap-6 mb-6">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0"
                            :style="{ backgroundColor: event.color + '20' }">
                            {{ event.emoji }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {{ event.name }}
                            </h1>
                            <div class="flex flex-wrap items-center gap-3 mb-3">
                                <span 
                                    class="px-3 py-1 rounded-full text-sm font-semibold"
                                    :style="{ backgroundColor: event.color + '20', color: event.color }"
                                >
                                    {{ event.category }}
                                </span>
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ event.date }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Event Image (if available) -->
                    <div v-if="event.image" class="mb-6 rounded-lg overflow-hidden">
                        <img :src="event.image" :alt="event.name" class="w-full h-64 sm:h-96 object-cover" />
                    </div>

                    <!-- Full Description -->
                    <div class="mb-6">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">About This Event</h2>
                        <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {{ event.fullDescription || event.description }}
                        </p>
                    </div>

                    <!-- Event Details Grid -->
                    <div v-if="event.details && event.details.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div 
                            v-for="(detail, index) in event.details" 
                            :key="index"
                            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                        >
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Detail {{ index + 1 }}</div>
                            <div class="text-base font-semibold text-gray-900 dark:text-white">{{ detail }}</div>
                        </div>
                    </div>

                    <!-- Additional Information Sections -->
                    <div v-if="event.mission || event.rocket || event.pad || event.agency" class="space-y-4">
                        <!-- Mission Info -->
                        <div v-if="event.mission" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Mission Information</h3>
                            <div class="space-y-2 text-sm sm:text-base">
                                <div v-if="event.mission.name">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Mission Name:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.mission.name }}</span>
                                </div>
                                <div v-if="event.mission.description">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Description:</span>
                                    <p class="text-gray-600 dark:text-gray-400 mt-1">{{ event.mission.description }}</p>
                                </div>
                                <div v-if="event.mission.type">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Type:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.mission.type }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Rocket Info -->
                        <div v-if="event.rocket" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Rocket Information</h3>
                            <div class="space-y-2 text-sm sm:text-base">
                                <div v-if="event.rocket.configuration?.name">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Rocket:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.rocket.configuration.name }}</span>
                                </div>
                                <div v-if="event.rocket.configuration?.family">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Family:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.rocket.configuration.family }}</span>
                                </div>
                                <div v-if="event.rocket.configuration?.variant">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Variant:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.rocket.configuration.variant }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Launch Pad Info -->
                        <div v-if="event.pad" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Launch Location</h3>
                            <div class="space-y-2 text-sm sm:text-base">
                                <div v-if="event.pad.name">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Pad:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.pad.name }}</span>
                                </div>
                                <div v-if="event.pad.location?.name">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Location:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.pad.location.name }}</span>
                                </div>
                                <div v-if="event.pad.location?.country_code">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Country:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.pad.location.country_code }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Agency Info -->
                        <div v-if="event.agency" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Launch Agency</h3>
                            <div class="space-y-2 text-sm sm:text-base">
                                <div v-if="event.agency.name">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Agency:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.agency.name }}</span>
                                </div>
                                <div v-if="event.agency.type">
                                    <span class="font-semibold text-gray-700 dark:text-gray-300">Type:</span>
                                    <span class="text-gray-600 dark:text-gray-400 ml-2">{{ event.agency.type }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Video/Webcast -->
                    <div v-if="event.video || event.webcast" class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 sm:p-6 text-white">
                        <h3 class="text-lg font-bold mb-3">Watch Live</h3>
                        <div v-if="event.webcast" class="mb-2">
                            <span class="text-sm opacity-90">Webcast Available:</span>
                            <span class="ml-2 font-semibold">{{ event.webcast ? 'Yes' : 'No' }}</span>
                        </div>
                        <a 
                            v-if="event.video" 
                            :href="event.video" 
                            target="_blank"
                            class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 mt-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch Video
                        </a>
                    </div>

                    <!-- Status -->
                    <div v-if="event.status" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Status</h3>
                        <span class="px-3 py-1 rounded-full text-sm font-semibold"
                            :style="{ 
                                backgroundColor: event.status.abbrev === 'Go' ? '#10B98120' : '#F59E0B20',
                                color: event.status.abbrev === 'Go' ? '#10B981' : '#F59E0B'
                            }">
                            {{ event.status.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logger from '@/utils/logger'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref(null)
const event = ref(null)

// Enhanced event data with full descriptions
const enhancedEvents = {
    1: {
        id: 1,
        name: 'Geminids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'December 13-14, 2024',
        description: 'One of the best meteor showers of the year, producing up to 120 meteors per hour at peak.',
        fullDescription: `The Geminids meteor shower is one of the most spectacular annual meteor showers, known for producing bright, colorful meteors. Unlike most meteor showers that originate from comets, the Geminids come from an asteroid called 3200 Phaethon.

The shower typically peaks around December 13-14 each year, with the best viewing times being after midnight when the constellation Gemini is highest in the sky. At peak, observers can expect to see up to 120 meteors per hour under dark sky conditions.

The Geminids are particularly notable for their:
- Bright, colorful meteors (often yellow or green)
- Slow-moving meteors compared to other showers
- High meteor count at peak
- Visibility from both hemispheres

Best viewing tips:
- Find a dark location away from city lights
- Look towards the constellation Gemini (the radiant point)
- Be patient - allow your eyes 20-30 minutes to adjust to darkness
- Peak viewing is typically around 2:00 AM local time
- The shower is active from December 4-17, but peak is December 13-14`,
        details: ['Peak: Dec 14, 2:00 AM', '120 meteors/hour', 'Best viewing: After midnight', 'Active: Dec 4-17', 'Radiant: Gemini constellation']
    },
    2: {
        id: 2,
        name: 'Total Solar Eclipse',
        emoji: '🌑',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'April 8, 2024',
        description: 'A total solar eclipse visible across North America.',
        fullDescription: `A total solar eclipse occurs when the Moon passes directly between the Earth and the Sun, completely blocking the Sun's light. The April 8, 2024 eclipse will be visible across a path stretching from Mexico through the United States to Canada.

The path of totality (where the Sun is completely blocked) will be approximately 115 miles wide and will pass through:
- Mexico: Mazatlán, Durango, Torreón
- United States: Texas, Oklahoma, Arkansas, Missouri, Illinois, Kentucky, Indiana, Ohio, Pennsylvania, New York, Vermont, New Hampshire, Maine
- Canada: Southern Ontario, Quebec, New Brunswick, Prince Edward Island, Newfoundland

Key facts:
- Maximum duration of totality: ~4 minutes 28 seconds
- Next total solar eclipse in North America: 2044
- Partial eclipse visible outside the path of totality
- Safe viewing requires special eclipse glasses

Safety tips:
- NEVER look directly at the Sun without proper eye protection
- Use certified eclipse glasses (ISO 12312-2)
- Do not use regular sunglasses or cameras
- Only remove glasses during totality (when Sun is completely blocked)`,
        details: ['Duration: ~4 minutes', 'Path: Mexico → USA → Canada', 'Next: 2026', 'Width: 115 miles', 'Type: Total']
    },
    3: {
        id: 3,
        name: 'Jupiter Opposition',
        emoji: '♃',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'December 7, 2024',
        description: 'Jupiter at its closest approach to Earth.',
        fullDescription: `Jupiter opposition occurs when Jupiter, Earth, and the Sun are aligned, with Earth in the middle. This is the best time to observe Jupiter because:

- Jupiter is at its closest approach to Earth (~4 AU away)
- Jupiter is fully illuminated by the Sun
- Jupiter is visible all night long
- Jupiter appears larger and brighter than usual

During opposition, Jupiter can reach a magnitude of -2.9, making it one of the brightest objects in the night sky (only the Moon, Venus, and occasionally Mars are brighter).

What to observe:
- The four largest moons (Io, Europa, Ganymede, Callisto) visible with binoculars
- The Great Red Spot (a giant storm larger than Earth)
- Cloud bands and atmospheric features with a telescope
- Jupiter's rapid rotation (a day is only 9.9 hours)

Best viewing:
- Visible shortly after sunset until sunrise
- No special equipment needed to see it (visible to naked eye)
- Binoculars reveal the four largest moons
- Small telescope shows cloud bands and the Great Red Spot`,
        details: ['Brightest of the year', 'Visible all night', 'Great for telescopes', 'Magnitude: -2.9', 'Distance: ~4 AU']
    }
}

onMounted(() => {
    const eventId = route.params.id
    
    // Check if event was passed via router state
    if (route.state?.event) {
        event.value = route.state.event
        loading.value = false
        return
    }
    
    // Otherwise, find event by ID
    const foundEvent = enhancedEvents[eventId] || enhancedEvents[parseInt(eventId)]
    
    if (foundEvent) {
        event.value = foundEvent
        loading.value = false
    } else {
        error.value = 'Event not found'
        loading.value = false
    }
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

