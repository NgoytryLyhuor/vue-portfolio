<template>
    <div class="min-h-screen py-2 sm:py-4 px-3 sm:px-4 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
                    class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-3 sm:mb-4 px-2 py-1 -ml-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-sm font-medium">Back to Events</span>
                </button>

                <!-- Header -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0"
                            :style="{ backgroundColor: event.color + '20' }">
                            {{ event.emoji }}
                        </div>
                        <div class="flex-1 min-w-0 w-full">
                            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-2 break-words">
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
import { useRoute } from 'vue-router'

const route = useRoute()
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
    },
    4: {
        id: 4,
        name: 'Perseids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'August 12-13, 2026',
        description: 'The most popular meteor shower, known for its fast and bright meteors. Up to 100 meteors per hour at peak.',
        fullDescription: `The Perseids are one of the most popular meteor showers, occurring every August when Earth passes through the debris left by Comet Swift-Tuttle. Known for their fast and bright meteors, the Perseids can produce up to 100 meteors per hour at peak. The shower is active from mid-July to late August, with peak activity around August 12-13.

The Perseids are particularly notable for:
- Fast-moving meteors (up to 59 km/s)
- Bright fireballs that can outshine Venus
- Warm summer night viewing in the Northern Hemisphere
- High activity rate at peak

Best viewing tips:
- Find a dark location away from city lights
- Look towards the constellation Perseus (the radiant point)
- Allow your eyes 20-30 minutes to adjust to darkness
- Peak viewing is typically around 2:00 AM local time
- The shower is active from July 17 to August 24`,
        details: ['Peak: Aug 13, 2:00 AM', '100 meteors/hour', 'Warm summer nights', 'Active: Jul 17 - Aug 24', 'Radiant: Perseus']
    },
    5: {
        id: 5,
        name: 'Mars Opposition',
        emoji: '♂️',
        category: 'Planetary Events',
        color: '#EF4444',
        date: 'January 16, 2025',
        description: 'Mars will be at its closest approach to Earth, appearing larger and brighter than usual. Perfect for observing the Red Planet.',
        fullDescription: `Mars opposition occurs approximately every 26 months when Mars and Earth are on the same side of the Sun. During opposition, Mars is at its closest approach to Earth, making it appear larger and brighter in the night sky.

During opposition, Mars can reach a magnitude of approximately -2.9, making it one of the brightest objects in the night sky. Through a telescope, observers can see surface features like polar ice caps and dark surface markings.

What to observe:
- Polar ice caps (visible with moderate telescopes)
- Dark surface markings (Syrtis Major, etc.)
- The red-orange color of the Martian surface
- Phobos and Deimos (Mars' two moons) with large telescopes

Best viewing:
- Visible all night during opposition
- Naked eye visible as a bright red-orange dot
- Binoculars reveal the disc
- Small telescopes show surface features
- The opposition effect makes Mars appear brighter than at any other time`,
        details: ['Closest approach', 'Visible all night', 'Red-orange color', 'Occurs every 26 months', 'Best for telescopes']
    },
    6: {
        id: 6,
        name: 'Lunar Eclipse',
        emoji: '🌕',
        category: 'Eclipses',
        color: '#8B5CF6',
        date: 'March 3, 2026',
        description: 'A total lunar eclipse will be visible from parts of the Americas, Europe, and Africa.',
        fullDescription: `A total lunar eclipse occurs when the Moon passes completely into Earth's umbral shadow, causing the Moon to take on a reddish color often called a "Blood Moon."

During totality, the Moon doesn't go completely dark but instead takes on a coppery red color. This happens because Earth's atmosphere bends sunlight around the planet and onto the Moon. The exact color depends on the state of Earth's atmosphere — volcanic ash can make the eclipse darker red.

Key facts:
- The entire eclipse lasts about 5-6 hours
- Totality (full shadow) lasts about 1-1.5 hours
- Safe to view with naked eyes, binoculars, or telescopes
- The Moon's color during totality varies from coppery orange to deep red

Viewing tips:
- Visible to the naked eye — no special equipment needed
- Binoculars or a telescope will enhance the view
- Check local visibility times for your location
- The partial phases are visible even in light-polluted areas`,
        details: ['Total phase visible', 'Safe to view', 'Duration: ~5-6 hours', 'Visible: Americas, Europe', 'Blood Moon color']
    },
    7: {
        id: 7,
        name: 'Artemis III Mission',
        emoji: '🚀',
        category: 'Space Missions',
        color: '#10B981',
        date: 'September 2026',
        description: "NASA's Artemis III mission aims to land astronauts on the Moon for the first time since 1972, including the first woman and person of color.",
        fullDescription: `Artemis III is NASA's planned mission to return humans to the Moon, scheduled for September 2026. This historic mission will land astronauts near the lunar South Pole, an area never before explored by humans.

The mission will include the first woman and first person of color to walk on the Moon. The crew will conduct scientific research, test new technologies, and prepare for future Mars missions.

Mission highlights:
- First crewed lunar landing since Apollo 17 in 1972
- First woman and person of color on the Moon
- Landing near the lunar South Pole
- Duration of approximately 30 days
- Scientific experiments and sample collection
- Testing of new technologies for future missions`,
        details: ['First woman on Moon', 'Lunar South Pole', 'Historic mission', 'Duration: ~30 days', 'Crew: 4 astronauts']
    },
    8: {
        id: 8,
        name: 'Saturn Opposition',
        emoji: '♄',
        category: 'Planetary Events',
        color: '#F59E0B',
        date: 'September 21, 2026',
        description: 'Saturn will be at opposition, making it the best time to observe the ringed planet and its beautiful rings.',
        fullDescription: `Saturn opposition occurs when Saturn, Earth, and the Sun are aligned. During this time, Saturn is at its closest approach to Earth and fully illuminated, making it the best time to observe the ringed planet.

Saturn's spectacular ring system is most visible during opposition, and even a small telescope can reveal the rings and some of Saturn's largest moons like Titan.

What to observe:
- Saturn's spectacular ring system
- The Cassini Division (gap between the A and B rings)
- Titan, Saturn's largest moon
- Other moons: Rhea, Dione, Tethys, Enceladus
- Cloud bands on Saturn's surface (with larger telescopes)

Best viewing:
- Visible all night during opposition
- Magnitude: approximately 0.5
- Rings are tilted favorably for viewing
- Small telescope (60mm) shows rings clearly
- Larger telescopes (100mm+) show moon details and cloud bands`,
        details: ['Rings visible', 'Brightest of year', 'Great for telescopes', 'Magnitude: ~0.5', 'Rings tilt visible']
    },
    9: {
        id: 9,
        name: 'Quadrantids Meteor Shower',
        emoji: '☄️',
        category: 'Meteor Showers',
        color: '#3B82F6',
        date: 'January 3-4, 2026',
        description: 'The first major meteor shower of the year, known for bright fireball meteors. Peak rates of up to 120 meteors per hour.',
        fullDescription: `The Quadrantids are the first major meteor shower of the year, occurring in early January. Known for producing bright fireball meteors, the Quadrantids can reach peak rates of up to 120 meteors per hour. However, the peak is very narrow (only a few hours), so timing is crucial.

The shower originates from an asteroid called 2003 EH1. Unlike most meteor showers that come from comets, the Quadrantids are unique because they originate from an asteroid.

Best viewing tips:
- The peak is very narrow — only about 6 hours
- Best viewing is during the peak window
- Look towards the constellation Boötes (the radiant point)
- Find a dark location away from city lights
- Allow your eyes 20-30 minutes to adjust to darkness
- The shower is active from December 28 to January 12`,
        details: ['Peak: Jan 4, 3:00 AM', '120 meteors/hour', 'Short peak window', 'Active: Dec 28 - Jan 12', 'Fireball meteors']
    },
    10: {
        id: 10,
        name: 'James Webb Space Telescope Observations',
        emoji: '🔭',
        category: 'Space Missions',
        color: '#10B981',
        date: 'Ongoing',
        description: 'The JWST continues to make groundbreaking discoveries, observing distant galaxies, exoplanets, and the early universe.',
        fullDescription: `The James Webb Space Telescope (JWST) is NASA's premier space observatory, launched in December 2021. It continues to make groundbreaking discoveries, observing the universe in infrared light.

JWST studies distant galaxies, exoplanet atmospheres, star formation, and the early universe. Its observations have already revolutionized our understanding of the cosmos and continue to provide stunning images and scientific data.

Key capabilities:
- Infrared observations (can see through dust clouds)
- Observing the earliest galaxies (within 300 million years after the Big Bang)
- Studying exoplanet atmospheres for signs of habitability
- Observing star and planet formation in molecular clouds
- Deep field images revealing thousands of galaxies`,
        details: ['Deep space images', 'Exoplanet studies', 'Revolutionary science', 'Infrared observations', 'Launched: Dec 2021']
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
    
    // Check if it's a rocket launch (starts with 'launch-')
    if (eventId && eventId.startsWith('launch-')) {
        // Try to fetch rocket launch data
        fetch(`https://lldev.thespacedevs.com/2.2.0/launch/${eventId.replace('launch-', '')}/`)
            .then(response => response.json())
            .then(data => {
                event.value = {
                    id: `launch-${data.id}`,
                    name: data.name || 'Rocket Launch',
                    emoji: '🚀',
                    category: 'Rocket Launches',
                    color: '#10B981',
                    date: data.net ? new Date(data.net).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'TBD',
                    description: data.mission?.description || data.launch_service_provider?.description || 'Rocket launch mission.',
                    fullDescription: data.mission?.description || data.launch_service_provider?.description || 'Rocket launch mission.',
                    details: [
                        data.rocket?.configuration?.name || 'Rocket TBD',
                        data.pad?.location?.name || 'Location TBD',
                        data.status?.name || 'Scheduled'
                    ],
                    mission: data.mission,
                    rocket: data.rocket,
                    pad: data.pad,
                    agency: data.launch_service_provider,
                    image: data.image,
                    video: data.video_url,
                    webcast: data.webcast_live,
                    status: data.status
                }
                loading.value = false
            })
            .catch(() => {
                error.value = 'Event not found'
                loading.value = false
            })
        return
    }
    
    // Otherwise, find event by ID in static events
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

