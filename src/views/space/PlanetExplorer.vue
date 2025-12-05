<template>
    <div class="min-h-screen py-4 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-4 sm:mt-6">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    🌌 Planet Explorer
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Explore planets in our solar system
                </p>
            </div>

            <!-- Planet Grid - Mobile Optimized -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div 
                    v-for="planet in planets" 
                    :key="planet.name"
                    @click="selectPlanet(planet)"
                    class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                    <!-- Planet Visual -->
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0"
                            :style="{ 
                                backgroundColor: planet.color + '20', 
                                color: planet.color,
                                boxShadow: `0 0 20px ${planet.color}40`
                            }">
                            {{ planet.symbol }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">{{ planet.name }}</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ planet.type }}</p>
                        </div>
                    </div>
                    
                    <!-- Quick Info -->
                    <div class="space-y-1.5 text-xs sm:text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Distance:</span>
                            <span class="font-semibold text-gray-900 dark:text-white text-right">{{ planet.distance }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Size:</span>
                            <span class="font-semibold text-gray-900 dark:text-white text-right">{{ planet.diameter }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selected Planet Detail Modal -->
            <div 
                v-if="selectedPlanet"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
                @click="selectedPlanet = null"
            >
                <div 
                    class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
                    @click.stop
                >
                    <div class="p-4 sm:p-6">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <div class="flex items-center gap-3 sm:gap-4">
                                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0"
                                    :style="{ 
                                        backgroundColor: selectedPlanet.color + '20', 
                                        color: selectedPlanet.color,
                                        boxShadow: `0 0 30px ${selectedPlanet.color}40`
                                    }">
                                    {{ selectedPlanet.symbol }}
                                </div>
                                <div>
                                    <h2 class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                        {{ selectedPlanet.name }}
                                    </h2>
                                    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">{{ selectedPlanet.type }}</p>
                                </div>
                            </div>
                            <button 
                                @click="selectedPlanet = null"
                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Planet Info Grid - Mobile Responsive -->
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Distance from Sun</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.distance }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Diameter</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.diameter }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Day Length</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.dayLength }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Year Length</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.yearLength }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Moons</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.moons }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.temperature }}</div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">About {{ selectedPlanet.name }}</h3>
                            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedPlanet.description }}</p>
                        </div>

                        <!-- Fun Facts -->
                        <div v-if="selectedPlanet.funFacts && selectedPlanet.funFacts.length > 0" 
                             class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-6 text-white">
                            <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Fun Facts
                            </h3>
                            <ul class="space-y-2 text-sm sm:text-base">
                                <li v-for="(fact, index) in selectedPlanet.funFacts" :key="index" class="flex items-start gap-2">
                                    <span class="text-yellow-300 flex-shrink-0">★</span>
                                    <span>{{ fact }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPlanet = ref(null)

const planets = [
    {
        name: 'Mercury',
        symbol: '☿',
        type: 'Terrestrial',
        color: '#8C7853',
        distance: '57.9M km',
        diameter: '4,879 km',
        dayLength: '59 days',
        yearLength: '88 days',
        moons: 0,
        temperature: '427°C / -173°C',
        description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations, with scorching hot days and freezing cold nights. Despite being closest to the Sun, it\'s not the hottest planet.',
        funFacts: [
            'A day on Mercury is longer than its year!',
            'Mercury has no atmosphere to trap heat.',
            'It\'s named after the Roman messenger god.'
        ]
    },
    {
        name: 'Venus',
        symbol: '♀',
        type: 'Terrestrial',
        color: '#FFC649',
        distance: '108.2M km',
        diameter: '12,104 km',
        dayLength: '243 days',
        yearLength: '225 days',
        moons: 0,
        temperature: '462°C',
        description: 'Venus is the hottest planet in our solar system, even hotter than Mercury. It has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid. The surface pressure is 92 times that of Earth.',
        funFacts: [
            'Venus rotates backwards compared to most planets.',
            'It\'s the brightest object in the night sky after the Moon.',
            'A day on Venus is longer than its year!'
        ]
    },
    {
        name: 'Earth',
        symbol: '🌍',
        type: 'Terrestrial',
        color: '#4A90E2',
        distance: '149.6M km',
        diameter: '12,756 km',
        dayLength: '24 hours',
        yearLength: '365.25 days',
        moons: 1,
        temperature: '15°C avg',
        description: 'Earth is the only known planet with life. It has liquid water, a protective atmosphere, and a magnetic field that shields us from harmful solar radiation. About 71% of Earth\'s surface is covered by water.',
        funFacts: [
            'Earth is the only planet not named after a god.',
            '71% of Earth\'s surface is covered by water.',
            'Earth\'s core is as hot as the Sun\'s surface.'
        ]
    },
    {
        name: 'Mars',
        symbol: '♂',
        type: 'Terrestrial',
        color: '#CD5C5C',
        distance: '227.9M km',
        diameter: '6,792 km',
        dayLength: '24.6 hours',
        yearLength: '687 days',
        moons: 2,
        temperature: '-65°C avg',
        description: 'Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano in the solar system (Olympus Mons) and evidence of ancient water flows. Scientists are exploring Mars for signs of past or present life.',
        funFacts: [
            'Mars has the largest dust storms in the solar system.',
            'A day on Mars is very similar to a day on Earth.',
            'Mars has two small moons: Phobos and Deimos.'
        ]
    },
    {
        name: 'Jupiter',
        symbol: '♃',
        type: 'Gas Giant',
        color: '#D8CA9D',
        distance: '778.5M km',
        diameter: '142,984 km',
        dayLength: '9.9 hours',
        yearLength: '12 years',
        moons: 95,
        temperature: '-110°C',
        description: 'Jupiter is the largest planet in our solar system. It\'s a gas giant made mostly of hydrogen and helium. The Great Red Spot is a giant storm that has been raging for at least 400 years. Jupiter acts as a "cosmic vacuum cleaner," protecting inner planets from asteroids.',
        funFacts: [
            'Jupiter has a Great Red Spot storm larger than Earth.',
            'It has at least 95 known moons.',
            'Jupiter could fit all other planets inside it.'
        ]
    },
    {
        name: 'Saturn',
        symbol: '♄',
        type: 'Gas Giant',
        color: '#FAD5A5',
        distance: '1.43B km',
        diameter: '120,536 km',
        dayLength: '10.7 hours',
        yearLength: '29 years',
        moons: 146,
        temperature: '-140°C',
        description: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It\'s less dense than water - if there were an ocean large enough, Saturn would float! The planet has beautiful cloud bands and numerous moons, including Titan, which is larger than Mercury.',
        funFacts: [
            'Saturn\'s rings are made mostly of ice particles.',
            'It has 146 known moons.',
            'Saturn is less dense than water - it would float!'
        ]
    },
    {
        name: 'Uranus',
        symbol: '♅',
        type: 'Ice Giant',
        color: '#4FD0E7',
        distance: '2.87B km',
        diameter: '51,118 km',
        dayLength: '17.2 hours',
        yearLength: '84 years',
        moons: 27,
        temperature: '-195°C',
        description: 'Uranus is an ice giant composed mainly of water, methane, and ammonia ices. It rotates on its side, likely due to a collision in its past. The planet has a unique blue-green color due to methane in its atmosphere. It has faint rings and 27 known moons.',
        funFacts: [
            'Uranus rotates on its side at a 98-degree angle.',
            'It\'s the coldest planet in the solar system.',
            'Uranus has faint rings discovered in 1977.'
        ]
    },
    {
        name: 'Neptune',
        symbol: '♆',
        type: 'Ice Giant',
        color: '#4166F5',
        distance: '4.5B km',
        diameter: '49,528 km',
        dayLength: '16.1 hours',
        yearLength: '165 years',
        moons: 16,
        temperature: '-200°C',
        description: 'Neptune is the windiest planet with speeds up to 2,100 km/h. It\'s the farthest planet from the Sun and takes 165 Earth years to orbit once. The planet has a deep blue color due to methane in its atmosphere. Neptune was the first planet discovered through mathematical prediction.',
        funFacts: [
            'Neptune has the fastest winds in the solar system.',
            'It takes 165 Earth years to orbit the Sun once.',
            'Neptune was predicted mathematically before being observed.'
        ]
    }
]

const selectPlanet = (planet) => {
    selectedPlanet.value = planet
}
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
