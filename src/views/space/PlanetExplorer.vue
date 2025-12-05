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
                    class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
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
                            <div v-if="selectedPlanet.mass" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Mass</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.mass }}</div>
                            </div>
                            <div v-if="selectedPlanet.gravity" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Surface Gravity</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.gravity }}</div>
                            </div>
                            <div v-if="selectedPlanet.orbitalSpeed" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                                <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Orbital Speed</div>
                                <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{{ selectedPlanet.orbitalSpeed }}</div>
                            </div>
                        </div>

                        <!-- Detailed Description -->
                        <div class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Overview</h3>
                            <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{{ selectedPlanet.description }}</p>
                            <p v-if="selectedPlanet.detailedDescription" class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ selectedPlanet.detailedDescription }}</p>
                        </div>

                        <!-- Physical Characteristics -->
                        <div v-if="selectedPlanet.physicalCharacteristics" class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Physical Characteristics</h3>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                                    <div v-for="(value, key) in selectedPlanet.physicalCharacteristics" :key="key" class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400 font-medium">{{ key }}:</span>
                                        <span class="text-gray-900 dark:text-white text-right">{{ value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Atmospheric Composition -->
                        <div v-if="selectedPlanet.atmosphere" class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Atmospheric Composition</h3>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                                <p v-if="selectedPlanet.atmosphere.description" class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">{{ selectedPlanet.atmosphere.description }}</p>
                                <div v-if="selectedPlanet.atmosphere.composition" class="space-y-2">
                                    <div v-for="(percentage, gas) in selectedPlanet.atmosphere.composition" :key="gas" class="flex items-center gap-3">
                                        <div class="flex-1">
                                            <div class="flex justify-between mb-1">
                                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ gas }}</span>
                                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ percentage }}</span>
                                            </div>
                                            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: percentage }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Surface Features -->
                        <div v-if="selectedPlanet.surfaceFeatures" class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Surface Features</h3>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                                <ul class="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                    <li v-for="(feature, index) in selectedPlanet.surfaceFeatures" :key="index" class="flex items-start gap-2">
                                        <span class="text-blue-500 flex-shrink-0 mt-1">•</span>
                                        <span>{{ feature }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Exploration History -->
                        <div v-if="selectedPlanet.exploration" class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Exploration History</h3>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">{{ selectedPlanet.exploration.description }}</p>
                                <div v-if="selectedPlanet.exploration.missions" class="space-y-3">
                                    <div v-for="(mission, index) in selectedPlanet.exploration.missions" :key="index" class="border-l-4 border-blue-500 pl-3">
                                        <div class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{{ mission.name }}</div>
                                        <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ mission.year }} - {{ mission.description }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Comparison with Earth -->
                        <div v-if="selectedPlanet.comparison" class="mb-4 sm:mb-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Comparison with Earth</h3>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
                                <div class="space-y-3 text-sm sm:text-base">
                                    <div v-for="(value, key) in selectedPlanet.comparison" :key="key" class="flex justify-between items-center">
                                        <span class="text-gray-600 dark:text-gray-400 font-medium">{{ key }}:</span>
                                        <span class="text-gray-900 dark:text-white font-semibold">{{ value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Fun Facts -->
                        <div v-if="selectedPlanet.funFacts && selectedPlanet.funFacts.length > 0" 
                             class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-6 text-white">
                            <h3 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Interesting Facts
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
        type: 'Terrestrial Planet',
        color: '#8C7853',
        distance: '57.9 million km',
        diameter: '4,879 km',
        dayLength: '59 Earth days',
        yearLength: '88 Earth days',
        moons: 0,
        temperature: '427°C (day) / -173°C (night)',
        mass: '3.3 × 10²³ kg (0.055 Earths)',
        gravity: '3.7 m/s² (0.38× Earth)',
        orbitalSpeed: '47.4 km/s',
        description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations, with scorching hot days and freezing cold nights. Despite being closest to the Sun, it\'s not the hottest planet.',
        detailedDescription: `Mercury is the innermost planet in our solar system, orbiting the Sun at an average distance of 57.9 million kilometers. It's the smallest planet, only slightly larger than Earth's Moon, with a diameter of 4,879 kilometers.

The planet experiences the most extreme temperature variations in the solar system. During the day, surface temperatures can reach 427°C (800°F), hot enough to melt lead. However, at night, temperatures plummet to -173°C (-280°F) because Mercury has virtually no atmosphere to retain heat.

Mercury's surface is heavily cratered, similar to Earth's Moon, indicating it has been geologically inactive for billions of years. The planet has a large iron core that makes up about 75% of its radius, giving it a very high density despite its small size.

One of Mercury's most unique features is its 3:2 spin-orbit resonance - it rotates three times on its axis for every two orbits around the Sun. This means a day on Mercury (sunrise to sunrise) lasts 176 Earth days, while a single rotation takes 59 Earth days.`,
        physicalCharacteristics: {
            'Equatorial Radius': '2,439.7 km',
            'Polar Radius': '2,439.7 km',
            'Volume': '6.083 × 10¹⁰ km³ (0.056× Earth)',
            'Density': '5.427 g/cm³',
            'Surface Area': '74.8 million km²',
            'Axial Tilt': '0.034° (almost no tilt)',
            'Escape Velocity': '4.25 km/s'
        },
        atmosphere: {
            description: 'Mercury has an extremely thin exosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium. The atmosphere is so thin that atoms are more likely to collide with the surface than with each other.',
            composition: {
                'Oxygen': '42%',
                'Sodium': '29%',
                'Hydrogen': '22%',
                'Helium': '6%',
                'Potassium': '1%'
            }
        },
        surfaceFeatures: [
            'Caloris Basin - A massive impact crater 1,550 km in diameter',
            'Weird Terrain - Hilly, lineated landscape on the opposite side from Caloris',
            'Scarps (cliffs) - Up to 1 km high, formed as the planet cooled and contracted',
            'Smooth plains - Volcanic in origin, similar to lunar maria',
            'Heavily cratered surface - Similar to Earth\'s Moon',
            'Polar ice deposits - Water ice found in permanently shadowed craters'
        ],
        exploration: {
            description: 'Mercury has been visited by only two spacecraft: Mariner 10 (1974-1975) and MESSENGER (2004-2015). The BepiColombo mission, launched in 2018, is currently en route.',
            missions: [
                {
                    name: 'Mariner 10',
                    year: '1974-1975',
                    description: 'First spacecraft to visit Mercury, mapped 45% of the surface'
                },
                {
                    name: 'MESSENGER',
                    year: '2004-2015',
                    description: 'First spacecraft to orbit Mercury, completed full surface mapping and discovered water ice at poles'
                },
                {
                    name: 'BepiColombo',
                    year: '2018-Present',
                    description: 'Joint ESA-JAXA mission, will arrive at Mercury in 2025'
                }
            ]
        },
        comparison: {
            'Diameter': '0.38× Earth',
            'Mass': '0.055× Earth',
            'Volume': '0.056× Earth',
            'Surface Gravity': '0.38× Earth',
            'Distance from Sun': '0.39× Earth',
            'Orbital Period': '0.24× Earth (88 days)'
        },
        funFacts: [
            'A day on Mercury (sunrise to sunrise) is longer than its year!',
            'Mercury has no atmosphere to trap heat, causing extreme temperature swings.',
            'It\'s named after the Roman messenger god, known for speed.',
            'Mercury\'s core makes up 75% of its radius - the largest core relative to size.',
            'Despite being closest to the Sun, it\'s not the hottest planet (Venus is hotter).',
            'Mercury has water ice at its poles in permanently shadowed craters.',
            'The planet has a magnetic field, unusual for such a small, slow-rotating body.'
        ]
    },
    {
        name: 'Venus',
        symbol: '♀',
        type: 'Terrestrial Planet',
        color: '#FFC649',
        distance: '108.2 million km',
        diameter: '12,104 km',
        dayLength: '243 Earth days',
        yearLength: '225 Earth days',
        moons: 0,
        temperature: '462°C (average)',
        mass: '4.87 × 10²⁴ kg (0.815× Earth)',
        gravity: '8.87 m/s² (0.91× Earth)',
        orbitalSpeed: '35.0 km/s',
        description: 'Venus is the hottest planet in our solar system, even hotter than Mercury. It has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid. The surface pressure is 92 times that of Earth.',
        detailedDescription: `Venus is often called Earth's "sister planet" because of their similar size, mass, and proximity to the Sun. However, Venus is a hellish world with surface conditions that would instantly kill any human.

The planet has a thick, toxic atmosphere composed primarily of carbon dioxide (96.5%) with clouds of sulfuric acid. This creates an extreme greenhouse effect, trapping heat and raising surface temperatures to 462°C (864°F) - hot enough to melt lead. The atmospheric pressure at the surface is 92 times greater than Earth's, equivalent to being 900 meters underwater.

Venus rotates backwards (retrograde rotation) compared to most planets, and very slowly - a day on Venus (243 Earth days) is longer than its year (225 Earth days). This means the Sun rises in the west and sets in the east on Venus.

The surface is dominated by volcanic features, including thousands of volcanoes, some of which may still be active. The planet has vast plains, highland regions, and evidence of recent volcanic activity. Venus has no moons and no magnetic field.`,
        physicalCharacteristics: {
            'Equatorial Radius': '6,051.8 km',
            'Polar Radius': '6,051.8 km',
            'Volume': '9.284 × 10¹¹ km³ (0.857× Earth)',
            'Density': '5.243 g/cm³',
            'Surface Area': '460.2 million km²',
            'Axial Tilt': '177.3° (upside down)',
            'Escape Velocity': '10.36 km/s'
        },
        atmosphere: {
            description: 'Venus has a dense, toxic atmosphere composed mainly of carbon dioxide with clouds of sulfuric acid. The greenhouse effect makes it the hottest planet in the solar system.',
            composition: {
                'Carbon Dioxide': '96.5%',
                'Nitrogen': '3.5%',
                'Sulfur Dioxide': '0.015%',
                'Argon': '0.007%',
                'Water Vapor': '0.002%',
                'Carbon Monoxide': '0.0017%'
            }
        },
        surfaceFeatures: [
            'Volcanic plains covering about 80% of the surface',
            'Highland regions: Ishtar Terra and Aphrodite Terra',
            'Maxwell Montes - highest mountain (11 km high)',
            'Thousands of volcanoes, many potentially active',
            'Impact craters (fewer than expected due to thick atmosphere)',
            'Coronae - circular features formed by upwelling magma',
            'Tesserae - complex, highly deformed terrain'
        ],
        exploration: {
            description: 'Venus has been visited by numerous spacecraft, including orbiters, landers, and atmospheric probes. The Soviet Venera program achieved the first successful landings.',
            missions: [
                {
                    name: 'Venera 7',
                    year: '1970',
                    description: 'First successful landing on another planet, transmitted data for 23 minutes'
                },
                {
                    name: 'Venera 9',
                    year: '1975',
                    description: 'First spacecraft to return images from the surface of another planet'
                },
                {
                    name: 'Magellan',
                    year: '1990-1994',
                    description: 'Mapped 98% of Venus\'s surface using radar'
                },
                {
                    name: 'Venus Express',
                    year: '2006-2014',
                    description: 'ESA mission that studied the atmosphere and surface'
                },
                {
                    name: 'Akatsuki',
                    year: '2015-Present',
                    description: 'JAXA mission currently studying Venus\'s atmosphere'
                }
            ]
        },
        comparison: {
            'Diameter': '0.95× Earth',
            'Mass': '0.815× Earth',
            'Volume': '0.857× Earth',
            'Surface Gravity': '0.91× Earth',
            'Distance from Sun': '0.72× Earth',
            'Orbital Period': '0.62× Earth (225 days)'
        },
        funFacts: [
            'Venus rotates backwards compared to most planets.',
            'It\'s the brightest object in the night sky after the Moon.',
            'A day on Venus is longer than its year!',
            'Surface pressure is equivalent to being 900 meters underwater on Earth.',
            'Venus has no moons - unique among the inner planets.',
            'The planet may have had oceans billions of years ago.',
            'Venus is named after the Roman goddess of love and beauty.'
        ]
    },
    {
        name: 'Earth',
        symbol: '🌍',
        type: 'Terrestrial Planet',
        color: '#4A90E2',
        distance: '149.6 million km',
        diameter: '12,756 km',
        dayLength: '24 hours',
        yearLength: '365.25 days',
        moons: 1,
        temperature: '15°C (average)',
        mass: '5.97 × 10²⁴ kg',
        gravity: '9.81 m/s²',
        orbitalSpeed: '29.8 km/s',
        description: 'Earth is the only known planet with life. It has liquid water, a protective atmosphere, and a magnetic field that shields us from harmful solar radiation. About 71% of Earth\'s surface is covered by water.',
        detailedDescription: `Earth is the third planet from the Sun and the only astronomical object known to harbor life. It's the largest of the four terrestrial planets and the only planet in our solar system with liquid water on its surface.

The planet formed approximately 4.54 billion years ago. Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and trace amounts of other gases. This unique composition, along with Earth's distance from the Sun, allows for the existence of liquid water, which covers about 71% of the surface.

Earth has a strong magnetic field generated by its liquid iron core, which protects the planet from harmful solar radiation. The planet's axial tilt of 23.5° creates seasons as it orbits the Sun. Earth has one natural satellite, the Moon, which stabilizes Earth's axial tilt and creates tides.

The planet's surface is divided into tectonic plates that slowly move, creating mountains, volcanoes, and earthquakes. Earth's diverse ecosystems support millions of species, making it the only known planet with life.`,
        physicalCharacteristics: {
            'Equatorial Radius': '6,378.1 km',
            'Polar Radius': '6,356.8 km',
            'Volume': '1.083 × 10¹² km³',
            'Density': '5.514 g/cm³',
            'Surface Area': '510.1 million km²',
            'Axial Tilt': '23.44°',
            'Escape Velocity': '11.19 km/s',
            'Water Coverage': '71%'
        },
        atmosphere: {
            description: 'Earth\'s atmosphere is composed primarily of nitrogen and oxygen, with trace amounts of water vapor, carbon dioxide, and other gases. It protects life by absorbing harmful solar radiation.',
            composition: {
                'Nitrogen': '78.08%',
                'Oxygen': '20.95%',
                'Argon': '0.93%',
                'Carbon Dioxide': '0.04%',
                'Water Vapor': 'Variable (0-4%)',
                'Other Gases': 'Trace amounts'
            }
        },
        surfaceFeatures: [
            'Oceans covering 71% of the surface',
            'Continents: 7 major landmasses',
            'Mountain ranges: Himalayas, Andes, Rockies, Alps',
            'Deserts: Sahara, Gobi, Arabian, Antarctic',
            'Forests: Amazon, Taiga, Tropical rainforests',
            'Polar ice caps at North and South poles',
            'Volcanoes: ~1,500 potentially active',
            'Rivers, lakes, and diverse ecosystems'
        ],
        exploration: {
            description: 'Earth has been extensively studied from space. Thousands of satellites orbit Earth, monitoring weather, climate, and human activity. The International Space Station is a permanent human presence in space.',
            missions: [
                {
                    name: 'Sputnik 1',
                    year: '1957',
                    description: 'First artificial satellite, launched by the Soviet Union'
                },
                {
                    name: 'Apollo 11',
                    year: '1969',
                    description: 'First humans to land on the Moon'
                },
                {
                    name: 'International Space Station',
                    year: '1998-Present',
                    description: 'Largest human-made object in space, continuously occupied since 2000'
                },
                {
                    name: 'Hubble Space Telescope',
                    year: '1990-Present',
                    description: 'Revolutionary space telescope observing the universe'
                },
                {
                    name: 'James Webb Space Telescope',
                    year: '2021-Present',
                    description: 'Most powerful space telescope, studying distant galaxies and exoplanets'
                }
            ]
        },
        comparison: {
            'Diameter': '12,756 km (reference)',
            'Mass': '5.97 × 10²⁴ kg (reference)',
            'Volume': '1.083 × 10¹² km³ (reference)',
            'Surface Gravity': '9.81 m/s² (reference)',
            'Distance from Sun': '149.6 million km (reference)',
            'Orbital Period': '365.25 days (reference)'
        },
        funFacts: [
            'Earth is the only planet not named after a god.',
            '71% of Earth\'s surface is covered by water.',
            'Earth\'s core is as hot as the Sun\'s surface (~5,500°C).',
            'The planet is about 4.54 billion years old.',
            'Earth\'s magnetic field protects us from solar wind.',
            'The Moon stabilizes Earth\'s axial tilt, preventing extreme climate variations.',
            'Earth is the densest planet in the solar system.'
        ]
    },
    {
        name: 'Mars',
        symbol: '♂',
        type: 'Terrestrial Planet',
        color: '#CD5C5C',
        distance: '227.9 million km',
        diameter: '6,792 km',
        dayLength: '24.6 hours',
        yearLength: '687 days',
        moons: 2,
        temperature: '-65°C (average)',
        mass: '6.39 × 10²³ kg (0.107× Earth)',
        gravity: '3.71 m/s² (0.38× Earth)',
        orbitalSpeed: '24.1 km/s',
        description: 'Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano in the solar system (Olympus Mons) and evidence of ancient water flows. Scientists are exploring Mars for signs of past or present life.',
        detailedDescription: `Mars, the fourth planet from the Sun, is often called the "Red Planet" because iron oxide (rust) on its surface gives it a reddish appearance. Mars is about half the size of Earth and has a thin atmosphere composed mostly of carbon dioxide.

The planet has the largest volcano in the solar system - Olympus Mons, which is 21 km high and 600 km wide. Mars also features Valles Marineris, a canyon system that stretches 4,000 km long and up to 7 km deep, making it the largest canyon in the solar system.

Evidence suggests that Mars once had liquid water on its surface billions of years ago. Ancient river valleys, lake beds, and mineral deposits indicate a warmer, wetter past. Today, water exists primarily as ice in polar ice caps and possibly as liquid brines underground.

Mars has two small, irregularly shaped moons: Phobos and Deimos, which are likely captured asteroids. The planet experiences dust storms that can cover the entire planet and last for months.`,
        physicalCharacteristics: {
            'Equatorial Radius': '3,396.2 km',
            'Polar Radius': '3,376.2 km',
            'Volume': '1.631 × 10¹¹ km³ (0.151× Earth)',
            'Density': '3.934 g/cm³',
            'Surface Area': '144.8 million km²',
            'Axial Tilt': '25.19° (similar to Earth)',
            'Escape Velocity': '5.03 km/s',
            'Polar Ice Caps': 'Water and CO₂ ice'
        },
        atmosphere: {
            description: 'Mars has a thin atmosphere composed primarily of carbon dioxide. The low atmospheric pressure means liquid water cannot exist on the surface, but water ice is present at the poles.',
            composition: {
                'Carbon Dioxide': '95.32%',
                'Nitrogen': '2.7%',
                'Argon': '1.6%',
                'Oxygen': '0.13%',
                'Carbon Monoxide': '0.08%',
                'Water Vapor': '0.03%'
            }
        },
        surfaceFeatures: [
            'Olympus Mons - Largest volcano in solar system (21 km high)',
            'Valles Marineris - Largest canyon system (4,000 km long)',
            'Polar ice caps - Water and CO₂ ice',
            'Ancient river valleys and lake beds',
            'Impact craters - Some of the largest in solar system',
            'Dust storms - Can cover entire planet',
            'Tharsis region - Massive volcanic plateau',
            'Hellas Planitia - Largest impact basin'
        ],
        exploration: {
            description: 'Mars has been extensively explored by orbiters, landers, and rovers. Multiple countries have sent missions, with NASA\'s rovers making groundbreaking discoveries.',
            missions: [
                {
                    name: 'Viking 1 & 2',
                    year: '1976',
                    description: 'First successful Mars landings, searched for signs of life'
                },
                {
                    name: 'Mars Pathfinder',
                    year: '1997',
                    description: 'First successful rover mission (Sojourner)'
                },
                {
                    name: 'Mars Exploration Rovers',
                    year: '2004-2018',
                    description: 'Spirit and Opportunity rovers discovered evidence of past water'
                },
                {
                    name: 'Curiosity',
                    year: '2012-Present',
                    description: 'Largest rover, discovered evidence of ancient habitable environments'
                },
                {
                    name: 'Perseverance',
                    year: '2021-Present',
                    description: 'Searching for signs of ancient life, collecting samples for return to Earth'
                },
                {
                    name: 'Ingenuity',
                    year: '2021-Present',
                    description: 'First powered flight on another planet'
                }
            ]
        },
        comparison: {
            'Diameter': '0.53× Earth',
            'Mass': '0.107× Earth',
            'Volume': '0.151× Earth',
            'Surface Gravity': '0.38× Earth',
            'Distance from Sun': '1.52× Earth',
            'Orbital Period': '1.88× Earth (687 days)'
        },
        funFacts: [
            'Mars has the largest dust storms in the solar system.',
            'A day on Mars is very similar to a day on Earth (24.6 hours).',
            'Mars has two small moons: Phobos and Deimos.',
            'The planet may have had oceans covering one-third of its surface.',
            'Mars has the tallest volcano in the solar system (Olympus Mons).',
            'Evidence suggests Mars once had a thicker atmosphere and liquid water.',
            'Mars is named after the Roman god of war due to its red color.'
        ]
    },
    {
        name: 'Jupiter',
        symbol: '♃',
        type: 'Gas Giant',
        color: '#D8CA9D',
        distance: '778.5 million km',
        diameter: '142,984 km',
        dayLength: '9.9 hours',
        yearLength: '12 Earth years',
        moons: 95,
        temperature: '-110°C (cloud tops)',
        mass: '1.90 × 10²⁷ kg (318× Earth)',
        gravity: '24.79 m/s² (2.53× Earth)',
        orbitalSpeed: '13.1 km/s',
        description: 'Jupiter is the largest planet in our solar system. It\'s a gas giant made mostly of hydrogen and helium. The Great Red Spot is a giant storm that has been raging for at least 400 years. Jupiter acts as a "cosmic vacuum cleaner," protecting inner planets from asteroids.',
        detailedDescription: `Jupiter is the fifth planet from the Sun and the largest planet in our solar system. It's a gas giant composed primarily of hydrogen and helium, similar to the Sun but not massive enough to become a star. Jupiter is so large that it could fit all other planets inside it.

The planet is famous for its Great Red Spot, a giant storm larger than Earth that has been raging for at least 400 years. Jupiter has a complex atmosphere with colorful bands of clouds, storms, and weather patterns. The planet rotates faster than any other planet, completing a rotation in just 9.9 hours, which causes it to bulge at the equator.

Jupiter has a strong magnetic field, 20,000 times stronger than Earth's, creating intense radiation belts. The planet has at least 95 known moons, including the four largest: Io, Europa, Ganymede, and Callisto (the Galilean moons). Europa and Ganymede are of particular interest because they may have subsurface oceans that could harbor life.

Jupiter acts as a "cosmic vacuum cleaner," using its massive gravity to capture or deflect asteroids and comets that might otherwise threaten the inner planets.`,
        physicalCharacteristics: {
            'Equatorial Radius': '71,492 km',
            'Polar Radius': '66,854 km',
            'Volume': '1.431 × 10¹⁵ km³ (1,321× Earth)',
            'Density': '1.326 g/cm³',
            'Surface Area': '6.142 × 10¹⁰ km²',
            'Axial Tilt': '3.13°',
            'Escape Velocity': '59.5 km/s',
            'Magnetic Field': '20,000× stronger than Earth'
        },
        atmosphere: {
            description: 'Jupiter\'s atmosphere is composed primarily of hydrogen and helium, with clouds of ammonia, water, and other compounds creating colorful bands and storms.',
            composition: {
                'Hydrogen': '89.8%',
                'Helium': '10.2%',
                'Methane': '0.3%',
                'Ammonia': '0.026%',
                'Water Vapor': '0.0004%',
                'Other': 'Trace amounts'
            }
        },
        surfaceFeatures: [
            'Great Red Spot - Giant storm larger than Earth, 400+ years old',
            'Cloud bands - Alternating light and dark zones',
            'Polar auroras - Created by magnetic field',
            'Multiple storm systems - White ovals and brown barges',
            'Equatorial zone - Fast-moving jet streams',
            'Polar regions - Complex cloud formations',
            'No solid surface - Gas giant with liquid metallic hydrogen core'
        ],
        exploration: {
            description: 'Jupiter has been visited by multiple spacecraft, including flybys and orbiters. The Galileo mission was the first to orbit Jupiter, and Juno is currently studying the planet.',
            missions: [
                {
                    name: 'Pioneer 10 & 11',
                    year: '1973-1974',
                    description: 'First spacecraft to visit Jupiter, discovered the planet\'s magnetic field'
                },
                {
                    name: 'Voyager 1 & 2',
                    year: '1979',
                    description: 'Discovered Jupiter\'s rings and detailed moon observations'
                },
                {
                    name: 'Galileo',
                    year: '1995-2003',
                    description: 'First spacecraft to orbit Jupiter, studied the planet and its moons'
                },
                {
                    name: 'Juno',
                    year: '2016-Present',
                    description: 'Currently studying Jupiter\'s composition, gravity field, and magnetic field'
                },
                {
                    name: 'Europa Clipper',
                    year: '2024 (Planned)',
                    description: 'Future mission to study Jupiter\'s moon Europa for potential habitability'
                }
            ]
        },
        comparison: {
            'Diameter': '11.2× Earth',
            'Mass': '318× Earth',
            'Volume': '1,321× Earth',
            'Surface Gravity': '2.53× Earth',
            'Distance from Sun': '5.2× Earth',
            'Orbital Period': '11.86× Earth (12 years)'
        },
        funFacts: [
            'Jupiter has a Great Red Spot storm larger than Earth.',
            'It has at least 95 known moons, with more being discovered.',
            'Jupiter could fit all other planets inside it.',
            'The planet rotates faster than any other planet (9.9 hours).',
            'Jupiter\'s moon Europa may have a subsurface ocean with more water than Earth.',
            'The planet has faint rings discovered by Voyager 1.',
            'Jupiter acts as a "cosmic vacuum cleaner" protecting inner planets.'
        ]
    },
    {
        name: 'Saturn',
        symbol: '♄',
        type: 'Gas Giant',
        color: '#FAD5A5',
        distance: '1.43 billion km',
        diameter: '120,536 km',
        dayLength: '10.7 hours',
        yearLength: '29 Earth years',
        moons: 146,
        temperature: '-140°C (cloud tops)',
        mass: '5.68 × 10²⁶ kg (95× Earth)',
        gravity: '10.44 m/s² (1.07× Earth)',
        orbitalSpeed: '9.7 km/s',
        description: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It\'s less dense than water - if there were an ocean large enough, Saturn would float! The planet has beautiful cloud bands and numerous moons, including Titan, which is larger than Mercury.',
        detailedDescription: `Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. It's most famous for its spectacular ring system, which is made up of billions of ice and rock particles ranging from tiny grains to house-sized boulders.

Saturn is a gas giant composed primarily of hydrogen and helium. Despite its massive size, Saturn has the lowest density of all planets - only 0.687 g/cm³, less than water. This means if there were an ocean large enough, Saturn would float!

The planet has beautiful cloud bands similar to Jupiter but more subtle in color. Saturn rotates quickly, completing a rotation in 10.7 hours, which causes it to bulge at the equator. The planet has a strong magnetic field and generates more heat than it receives from the Sun.

Saturn has 146 known moons, with Titan being the largest - even bigger than Mercury. Titan has a thick atmosphere and lakes of liquid methane and ethane. Enceladus, another moon, has geysers spewing water ice into space, suggesting a subsurface ocean.`,
        physicalCharacteristics: {
            'Equatorial Radius': '60,268 km',
            'Polar Radius': '54,364 km',
            'Volume': '8.271 × 10¹⁴ km³ (763× Earth)',
            'Density': '0.687 g/cm³ (lowest of all planets)',
            'Surface Area': '4.27 × 10¹⁰ km²',
            'Axial Tilt': '26.73°',
            'Escape Velocity': '35.5 km/s',
            'Ring System': 'Extends up to 282,000 km from planet'
        },
        atmosphere: {
            description: 'Saturn\'s atmosphere is similar to Jupiter\'s, composed primarily of hydrogen and helium, with clouds of ammonia and water creating subtle bands.',
            composition: {
                'Hydrogen': '96.3%',
                'Helium': '3.25%',
                'Methane': '0.45%',
                'Ammonia': '0.0125%',
                'Water Vapor': '0.011%',
                'Other': 'Trace amounts'
            }
        },
        surfaceFeatures: [
            'Spectacular ring system - Billions of ice and rock particles',
            'Cloud bands - Subtle compared to Jupiter',
            'Hexagonal storm at north pole - Unique six-sided jet stream',
            'Polar auroras - Created by magnetic field',
            'Multiple ring divisions - Gaps created by moon resonances',
            'No solid surface - Gas giant with possible rocky core',
            'Fast rotation causes equatorial bulge'
        ],
        exploration: {
            description: 'Saturn has been visited by Pioneer 11, Voyager 1 & 2, and the Cassini-Huygens mission, which spent 13 years studying the planet and its moons.',
            missions: [
                {
                    name: 'Pioneer 11',
                    year: '1979',
                    description: 'First spacecraft to visit Saturn, discovered new moons and ring details'
                },
                {
                    name: 'Voyager 1 & 2',
                    year: '1980-1981',
                    description: 'Detailed study of Saturn, its rings, and moons'
                },
                {
                    name: 'Cassini-Huygens',
                    year: '2004-2017',
                    description: 'Spent 13 years orbiting Saturn, Huygens probe landed on Titan'
                },
                {
                    name: 'Dragonfly',
                    year: '2027 (Planned)',
                    description: 'Future mission to send a drone to explore Titan\'s surface'
                }
            ]
        },
        comparison: {
            'Diameter': '9.5× Earth',
            'Mass': '95× Earth',
            'Volume': '763× Earth',
            'Surface Gravity': '1.07× Earth',
            'Distance from Sun': '9.5× Earth',
            'Orbital Period': '29.5× Earth (29 years)'
        },
        funFacts: [
            'Saturn\'s rings are made mostly of ice particles.',
            'It has 146 known moons, with Titan being larger than Mercury.',
            'Saturn is less dense than water - it would float!',
            'The planet has a hexagonal storm at its north pole.',
            'Saturn\'s moon Enceladus has geysers spewing water ice.',
            'Titan has lakes of liquid methane and ethane.',
            'Saturn generates more heat than it receives from the Sun.'
        ]
    },
    {
        name: 'Uranus',
        symbol: '♅',
        type: 'Ice Giant',
        color: '#4FD0E7',
        distance: '2.87 billion km',
        diameter: '51,118 km',
        dayLength: '17.2 hours',
        yearLength: '84 Earth years',
        moons: 27,
        temperature: '-195°C',
        mass: '8.68 × 10²⁵ kg (14.5× Earth)',
        gravity: '8.69 m/s² (0.89× Earth)',
        orbitalSpeed: '6.8 km/s',
        description: 'Uranus is an ice giant composed mainly of water, methane, and ammonia ices. It rotates on its side, likely due to a collision in its past. The planet has a unique blue-green color due to methane in its atmosphere. It has faint rings and 27 known moons.',
        detailedDescription: `Uranus is the seventh planet from the Sun and the third-largest planet in our solar system. It's classified as an ice giant because it's composed mainly of water, methane, and ammonia ices surrounding a small rocky core.

The planet's most unique feature is its extreme axial tilt of 98 degrees - it rotates on its side! This means Uranus essentially rolls around the Sun rather than spinning upright. Scientists believe this was caused by a massive collision early in the planet's history.

Uranus has a unique blue-green color due to methane in its upper atmosphere, which absorbs red light and reflects blue-green light. The planet has a complex ring system (discovered in 1977) and 27 known moons, named after characters from Shakespeare and Alexander Pope.

Uranus has a very cold atmosphere, with temperatures dropping to -224°C in the upper atmosphere. The planet has faint cloud bands and storms, but they're much less prominent than on Jupiter or Saturn. Unlike other gas giants, Uranus doesn't generate much internal heat.`,
        physicalCharacteristics: {
            'Equatorial Radius': '25,559 km',
            'Polar Radius': '24,973 km',
            'Volume': '6.833 × 10¹³ km³ (63× Earth)',
            'Density': '1.271 g/cm³',
            'Surface Area': '8.116 × 10⁹ km²',
            'Axial Tilt': '97.77° (rotates on its side)',
            'Escape Velocity': '21.3 km/s',
            'Magnetic Field': 'Offset from rotation axis by 59°'
        },
        atmosphere: {
            description: 'Uranus\'s atmosphere is composed primarily of hydrogen and helium, with methane giving it a blue-green color. The atmosphere contains water, ammonia, and methane ices.',
            composition: {
                'Hydrogen': '83%',
                'Helium': '15%',
                'Methane': '2.3%',
                'Ammonia': 'Trace',
                'Water': 'Trace',
                'Hydrogen Sulfide': 'Trace'
            }
        },
        surfaceFeatures: [
            'No solid surface - Ice giant with possible rocky core',
            'Blue-green color from methane in atmosphere',
            'Faint cloud bands - Less prominent than Jupiter/Saturn',
            'Polar regions - Experience extreme seasons due to tilt',
            'Ring system - 13 known rings, discovered in 1977',
            'Magnetic field - Offset 59° from rotation axis',
            'Low internal heat - Colder than other gas giants'
        ],
        exploration: {
            description: 'Uranus has been visited by only one spacecraft: Voyager 2 in 1986. No future missions are currently planned, though proposals exist.',
            missions: [
                {
                    name: 'Voyager 2',
                    year: '1986',
                    description: 'Only spacecraft to visit Uranus, discovered 10 new moons and studied the planet\'s atmosphere and magnetic field'
                },
                {
                    name: 'Uranus Orbiter and Probe',
                    year: '2030s (Proposed)',
                    description: 'Proposed NASA mission to study Uranus in detail'
                }
            ]
        },
        comparison: {
            'Diameter': '4× Earth',
            'Mass': '14.5× Earth',
            'Volume': '63× Earth',
            'Surface Gravity': '0.89× Earth',
            'Distance from Sun': '19.2× Earth',
            'Orbital Period': '84× Earth (84 years)'
        },
        funFacts: [
            'Uranus rotates on its side at a 98-degree angle.',
            'It\'s the coldest planet in the solar system (-224°C).',
            'Uranus has faint rings discovered in 1977.',
            'The planet\'s moons are named after Shakespeare characters.',
            'Uranus doesn\'t generate much internal heat.',
            'A year on Uranus equals 84 Earth years.',
            'The planet was the first discovered with a telescope (1781).'
        ]
    },
    {
        name: 'Neptune',
        symbol: '♆',
        type: 'Ice Giant',
        color: '#4166F5',
        distance: '4.5 billion km',
        diameter: '49,528 km',
        dayLength: '16.1 hours',
        yearLength: '165 Earth years',
        moons: 16,
        temperature: '-200°C',
        mass: '1.02 × 10²⁶ kg (17× Earth)',
        gravity: '11.15 m/s² (1.14× Earth)',
        orbitalSpeed: '5.4 km/s',
        description: 'Neptune is the windiest planet with speeds up to 2,100 km/h. It\'s the farthest planet from the Sun and takes 165 Earth years to orbit once. The planet has a deep blue color due to methane in its atmosphere. Neptune was the first planet discovered through mathematical prediction.',
        detailedDescription: `Neptune is the eighth and farthest planet from the Sun, and the fourth-largest planet in our solar system. Like Uranus, it's an ice giant composed mainly of water, methane, and ammonia ices surrounding a rocky core.

Neptune has the fastest winds in the solar system, reaching speeds up to 2,100 km/h (1,300 mph) - nearly supersonic! These extreme winds are driven by the planet's internal heat, which generates more energy than it receives from the distant Sun.

The planet has a deep blue color, deeper than Uranus, due to higher concentrations of methane in its atmosphere. Neptune has active weather systems, including dark spots similar to Jupiter's Great Red Spot, though they appear and disappear more quickly.

Neptune has a complex ring system and 16 known moons. The largest moon, Triton, is unique - it orbits backwards (retrograde) and is geologically active with nitrogen geysers. Triton is likely a captured Kuiper Belt object.

Neptune was the first planet discovered through mathematical prediction rather than observation. Astronomers noticed irregularities in Uranus's orbit and predicted the existence of another planet, which was found in 1846.`,
        physicalCharacteristics: {
            'Equatorial Radius': '24,764 km',
            'Polar Radius': '24,341 km',
            'Volume': '6.254 × 10¹³ km³ (58× Earth)',
            'Density': '1.638 g/cm³',
            'Surface Area': '7.618 × 10⁹ km²',
            'Axial Tilt': '28.32°',
            'Escape Velocity': '23.5 km/s',
            'Wind Speed': 'Up to 2,100 km/h (fastest in solar system)'
        },
        atmosphere: {
            description: 'Neptune\'s atmosphere is composed primarily of hydrogen and helium, with methane giving it a deep blue color. The atmosphere contains water, ammonia, and methane ices.',
            composition: {
                'Hydrogen': '80%',
                'Helium': '19%',
                'Methane': '1.5%',
                'Ammonia': 'Trace',
                'Water': 'Trace',
                'Hydrogen Deuteride': 'Trace'
            }
        },
        surfaceFeatures: [
            'No solid surface - Ice giant with possible rocky core',
            'Deep blue color from methane in atmosphere',
            'Dark spots - Similar to Jupiter\'s Great Red Spot but temporary',
            'Fastest winds in solar system (up to 2,100 km/h)',
            'Ring system - Faint rings discovered by Voyager 2',
            'Active weather systems - Storms and cloud formations',
            'Internal heat source - Generates more energy than received from Sun'
        ],
        exploration: {
            description: 'Neptune has been visited by only one spacecraft: Voyager 2 in 1989. It remains the least explored planet in our solar system.',
            missions: [
                {
                    name: 'Voyager 2',
                    year: '1989',
                    description: 'Only spacecraft to visit Neptune, discovered the Great Dark Spot and studied the planet\'s atmosphere, rings, and moons'
                },
                {
                    name: 'Neptune Odyssey',
                    year: '2030s (Proposed)',
                    description: 'Proposed NASA mission to study Neptune and its moon Triton'
                }
            ]
        },
        comparison: {
            'Diameter': '3.9× Earth',
            'Mass': '17× Earth',
            'Volume': '58× Earth',
            'Surface Gravity': '1.14× Earth',
            'Distance from Sun': '30× Earth',
            'Orbital Period': '165× Earth (165 years)'
        },
        funFacts: [
            'Neptune has the fastest winds in the solar system (up to 2,100 km/h).',
            'It takes 165 Earth years to orbit the Sun once.',
            'Neptune was predicted mathematically before being observed.',
            'The planet has a deep blue color deeper than Uranus.',
            'Neptune\'s moon Triton orbits backwards and has nitrogen geysers.',
            'The planet generates more heat than it receives from the Sun.',
            'Neptune is the farthest planet from the Sun (since Pluto\'s reclassification).'
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
