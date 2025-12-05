<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-8 sm:mt-10">
                <div class="flex items-center justify-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Places to Visit in Cambodia
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Discover amazing destinations, temples, beaches, and cultural sites across Cambodia
                </p>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg text-center">
                    <div class="text-2xl sm:text-3xl font-bold">{{ places.length }}</div>
                    <div class="text-xs sm:text-sm opacity-90 mt-1">Total Places</div>
                </div>
                <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg text-center">
                    <div class="text-2xl sm:text-3xl font-bold">{{ categories.length }}</div>
                    <div class="text-xs sm:text-sm opacity-90 mt-1">Categories</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg text-center">
                    <div class="text-2xl sm:text-3xl font-bold">{{ provinces.length }}</div>
                    <div class="text-xs sm:text-sm opacity-90 mt-1">Provinces</div>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg text-center">
                    <div class="text-2xl sm:text-3xl font-bold">{{ filteredPlaces.length }}</div>
                    <div class="text-xs sm:text-sm opacity-90 mt-1">Showing</div>
                </div>
            </div>

            <!-- Search and Filter Bar -->
            <div class="mb-6 space-y-4">
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Search Input -->
                    <div class="flex-1 relative">
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Search places (e.g., Angkor Wat, Phnom Penh, beaches)..."
                            class="w-full px-4 py-3 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            aria-label="Search places"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button 
                            v-if="searchQuery" 
                            @click="searchQuery = ''"
                            class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Clear search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Category Filter -->
                    <div class="relative">
                        <select 
                            v-model="selectedCategory" 
                            class="px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            aria-label="Filter by category"
                        >
                            <option value="all">All Categories</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <!-- Province Filter -->
                    <div class="relative">
                        <select 
                            v-model="selectedProvince" 
                            class="px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            aria-label="Filter by province"
                        >
                            <option value="all">All Provinces</option>
                            <option v-for="prov in provinces" :key="prov" :value="prov">{{ prov }}</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <!-- Category Pills -->
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">Quick Filters:</span>
                    <button 
                        v-for="cat in categories" 
                        :key="cat"
                        @click="selectedCategory = selectedCategory === cat ? 'all' : cat"
                        :class="[
                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                            selectedCategory === cat
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        ]"
                    >
                        {{ cat }}
                    </button>
                </div>
            </div>

            <!-- Places Grid -->
            <div v-if="filteredPlaces.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-600 dark:text-gray-400">No places found matching your criteria.</p>
                <button 
                    @click="resetFilters"
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Reset Filters
                </button>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                    v-for="place in paginatedPlaces" 
                    :key="place.id"
                    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                    @click="selectPlace(place)"
                >
                    <!-- Image -->
                    <div class="relative h-48 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-80"></div>
                        <div class="absolute top-4 left-4 z-10">
                            <span class="px-3 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-full text-xs font-medium shadow-lg">
                                {{ place.category }}
                            </span>
                        </div>
                        <div class="absolute bottom-4 left-4 right-4 z-10">
                            <h3 class="text-xl font-bold text-white mb-1 line-clamp-1">{{ place.name }}</h3>
                            <div class="flex items-center gap-2 text-white/90 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{{ place.province }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-5">
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {{ place.description }}
                        </p>
                        
                        <!-- Features -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span 
                                v-for="feature in place.features.slice(0, 3)" 
                                :key="feature"
                                class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                            >
                                {{ feature }}
                            </span>
                        </div>

                        <!-- Rating -->
                        <div v-if="place.rating" class="flex items-center gap-2">
                            <div class="flex items-center">
                                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" 
                                    class="h-4 w-4" 
                                    :class="i <= place.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">{{ place.rating }}/5</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
                <button 
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Previous page"
                >
                    Previous
                </button>
                <span class="px-4 py-2 text-gray-700 dark:text-gray-300">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button 
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>

        <!-- Place Detail Modal -->
        <div 
            v-if="selectedPlace" 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            @click="selectedPlace = null"
        >
            <div 
                class="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto"
                @click.stop
            >
                <div class="relative">
                    <!-- Header Image -->
                    <div class="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                        <div class="absolute inset-0 bg-black/20"></div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-full text-sm font-medium shadow-lg">
                                {{ selectedPlace.category }}
                            </span>
                        </div>
                        <div class="absolute bottom-6 left-6 right-6">
                            <h2 class="text-3xl font-bold text-white mb-2">{{ selectedPlace.name }}</h2>
                            <div class="flex items-center gap-2 text-white/90">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{{ selectedPlace.province }}</span>
                            </div>
                        </div>
                        <button 
                            @click="selectedPlace = null"
                            class="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <!-- Rating -->
                        <div v-if="selectedPlace.rating" class="flex items-center gap-2 mb-4">
                            <div class="flex items-center">
                                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" 
                                    class="h-5 w-5" 
                                    :class="i <= selectedPlace.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-gray-600 dark:text-gray-400">{{ selectedPlace.rating }}/5 Rating</span>
                        </div>

                        <!-- Description -->
                        <div class="mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h3>
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ selectedPlace.description }}</p>
                        </div>

                        <!-- Features -->
                        <div v-if="selectedPlace.features && selectedPlace.features.length > 0" class="mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Features & Highlights</h3>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div 
                                    v-for="feature in selectedPlace.features" 
                                    :key="feature"
                                    class="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm text-center"
                                >
                                    {{ feature }}
                                </div>
                            </div>
                        </div>

                        <!-- Best Time to Visit -->
                        <div v-if="selectedPlace.bestTime" class="mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Best Time to Visit</h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ selectedPlace.bestTime }}</p>
                        </div>

                        <!-- Tips -->
                        <div v-if="selectedPlace.tips && selectedPlace.tips.length > 0" class="mb-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Travel Tips</h3>
                            <ul class="space-y-2">
                                <li v-for="(tip, index) in selectedPlace.tips" :key="index" class="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ tip }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Location Info -->
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Location Information</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                <strong>Province:</strong> {{ selectedPlace.province }}
                            </p>
                            <p v-if="selectedPlace.distance" class="text-gray-600 dark:text-gray-300">
                                <strong>Distance from Phnom Penh:</strong> {{ selectedPlace.distance }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Cambodia Places to Visit - Tourist destinations and attractions
import { ref, computed, watch } from 'vue'

// Places data
const places = ref([
    {
        id: 1,
        name: 'Angkor Wat',
        category: 'Temple',
        province: 'Siem Reap',
        description: 'The largest religious monument in the world, Angkor Wat is a UNESCO World Heritage site and the symbol of Cambodia. Built in the 12th century, it represents the pinnacle of Khmer architecture.',
        features: ['UNESCO Site', 'Sunrise Views', 'Ancient Architecture', 'Photography', 'History'],
        rating: 5,
        bestTime: 'November to March (dry season)',
        tips: ['Visit early morning for sunrise', 'Wear comfortable shoes', 'Hire a guide for better understanding', 'Bring water and sunscreen'],
        distance: '315 km from Phnom Penh'
    },
    {
        id: 2,
        name: 'Bayon Temple',
        category: 'Temple',
        province: 'Siem Reap',
        description: 'Famous for its massive stone faces, Bayon Temple is located in the center of Angkor Thom. The temple features 216 smiling faces of Avalokiteshvara carved into its towers.',
        features: ['Stone Faces', 'Angkor Thom', 'Photography', 'History', 'Architecture'],
        rating: 5,
        bestTime: 'Early morning or late afternoon',
        tips: ['Best lighting in morning', 'Climb to upper level for views', 'Watch for monkeys'],
        distance: '315 km from Phnom Penh'
    },
    {
        id: 3,
        name: 'Ta Prohm',
        category: 'Temple',
        province: 'Siem Reap',
        description: 'Known as the "Tomb Raider Temple", Ta Prohm is famous for the massive tree roots that have grown over and through the temple ruins, creating a mystical atmosphere.',
        features: ['Tree Roots', 'Jungle Setting', 'Photography', 'Adventure', 'Nature'],
        rating: 5,
        bestTime: 'Morning for better photos',
        tips: ['Wear insect repellent', 'Be careful on uneven surfaces', 'Great for photography'],
        distance: '315 km from Phnom Penh'
    },
    {
        id: 4,
        name: 'Royal Palace',
        category: 'Historical Site',
        province: 'Phnom Penh',
        description: 'The Royal Palace of Cambodia is a complex of buildings that serves as the royal residence of the King of Cambodia. The palace features beautiful Khmer architecture and the Silver Pagoda.',
        features: ['Royal Residence', 'Silver Pagoda', 'Khmer Architecture', 'History', 'Photography'],
        rating: 4,
        bestTime: 'Morning (8 AM - 11 AM)',
        tips: ['Dress modestly', 'No photography inside some buildings', 'Allow 1-2 hours'],
        distance: 'In Phnom Penh city center'
    },
    {
        id: 5,
        name: 'Tuol Sleng Genocide Museum',
        category: 'Museum',
        province: 'Phnom Penh',
        description: 'A former high school turned into a security prison during the Khmer Rouge regime. Now a museum documenting the atrocities of that period.',
        features: ['History', 'Education', 'Memorial', 'Important History'],
        rating: 4,
        bestTime: 'Morning',
        tips: ['Emotionally intense', 'Audio guide recommended', 'Respectful behavior required'],
        distance: 'In Phnom Penh'
    },
    {
        id: 6,
        name: 'Killing Fields of Choeung Ek',
        category: 'Memorial',
        province: 'Phnom Penh',
        description: 'A memorial site where thousands of Cambodians were executed during the Khmer Rouge regime. Features a memorial stupa containing thousands of skulls.',
        features: ['Memorial', 'History', 'Education', 'Reflection'],
        rating: 4,
        bestTime: 'Morning',
        tips: ['Audio guide highly recommended', 'Emotionally moving', 'Respectful visit'],
        distance: '15 km from Phnom Penh'
    },
    {
        id: 7,
        name: 'Sihanoukville Beaches',
        category: 'Beach',
        province: 'Sihanoukville',
        description: 'Beautiful beaches along the Gulf of Thailand. Popular destinations include Otres Beach, Serendipity Beach, and Sokha Beach with white sand and clear waters.',
        features: ['Swimming', 'Water Sports', 'Relaxation', 'Sunset Views', 'Beach Activities'],
        rating: 4,
        bestTime: 'November to April (dry season)',
        tips: ['Bring sunscreen', 'Try fresh seafood', 'Watch for jellyfish', 'Enjoy sunset'],
        distance: '230 km from Phnom Penh'
    },
    {
        id: 8,
        name: 'Koh Rong Island',
        category: 'Island',
        province: 'Sihanoukville',
        description: 'A tropical paradise with pristine beaches, crystal-clear waters, and bioluminescent plankton. Perfect for relaxation and water activities.',
        features: ['Beaches', 'Snorkeling', 'Bioluminescence', 'Relaxation', 'Water Sports'],
        rating: 5,
        bestTime: 'November to April',
        tips: ['Book accommodation in advance', 'Bring cash', 'Try night swimming for bioluminescence', 'Respect the environment'],
        distance: '45 minutes by boat from Sihanoukville'
    },
    {
        id: 9,
        name: 'Battambang',
        category: 'City',
        province: 'Battambang',
        description: 'Cambodia\'s second-largest city, known for its French colonial architecture, bamboo train, and bat caves. A charming city with rich culture.',
        features: ['Bamboo Train', 'Bat Caves', 'Colonial Architecture', 'Culture', 'Local Life'],
        rating: 4,
        bestTime: 'November to March',
        tips: ['Ride the bamboo train', 'Visit bat cave at sunset', 'Explore colonial buildings', 'Try local food'],
        distance: '290 km from Phnom Penh'
    },
    {
        id: 10,
        name: 'Bamboo Train',
        category: 'Attraction',
        province: 'Battambang',
        description: 'A unique railway experience using a bamboo platform on wheels. One of Cambodia\'s most unusual and fun attractions.',
        features: ['Unique Experience', 'Adventure', 'Local Culture', 'Fun Activity'],
        rating: 4,
        bestTime: 'Dry season',
        tips: ['Hold on tight', 'Great for photos', 'Short but memorable ride'],
        distance: '290 km from Phnom Penh'
    },
    {
        id: 11,
        name: 'Kampot',
        category: 'City',
        province: 'Kampot',
        description: 'A charming riverside town famous for its pepper plantations, French colonial architecture, and relaxed atmosphere. Gateway to Bokor National Park.',
        features: ['Pepper Plantations', 'Riverside', 'Colonial Architecture', 'Relaxation', 'Food'],
        rating: 4,
        bestTime: 'November to March',
        tips: ['Visit pepper farms', 'Try Kampot pepper', 'Rent a motorbike', 'Enjoy riverside cafes'],
        distance: '148 km from Phnom Penh'
    },
    {
        id: 12,
        name: 'Bokor Hill Station',
        category: 'Historical Site',
        province: 'Kampot',
        description: 'An abandoned French hill station with stunning views, old casino, and church ruins. Located in Bokor National Park at 1,000 meters elevation.',
        features: ['Mountain Views', 'History', 'Abandoned Buildings', 'Cool Weather', 'Photography'],
        rating: 4,
        bestTime: 'Dry season (cooler weather)',
        tips: ['Bring warm clothes', 'Great for photography', 'Check road conditions', 'Enjoy the views'],
        distance: '37 km from Kampot'
    },
    {
        id: 13,
        name: 'Kep',
        category: 'Beach',
        province: 'Kep',
        description: 'A small coastal town known for its crab market, beaches, and relaxed atmosphere. Famous for fresh seafood, especially crab.',
        features: ['Crab Market', 'Seafood', 'Beaches', 'Relaxation', 'Food'],
        rating: 4,
        bestTime: 'November to April',
        tips: ['Try the crab', 'Visit crab market', 'Relax on the beach', 'Try local restaurants'],
        distance: '173 km from Phnom Penh'
    },
    {
        id: 14,
        name: 'Banteay Srei',
        category: 'Temple',
        province: 'Siem Reap',
        description: 'Known as the "Citadel of Women", this temple is famous for its intricate pink sandstone carvings. Considered the jewel of Khmer art.',
        features: ['Intricate Carvings', 'Pink Sandstone', 'Art', 'Photography', 'History'],
        rating: 5,
        bestTime: 'Morning for best lighting',
        tips: ['Smaller temple but beautiful', 'Allow 1 hour', 'Great for detailed photography'],
        distance: '25 km from Siem Reap'
    },
    {
        id: 15,
        name: 'Phnom Kulen',
        category: 'Natural Site',
        province: 'Siem Reap',
        description: 'A sacred mountain with waterfalls, ancient carvings, and a reclining Buddha. A popular day trip from Siem Reap.',
        features: ['Waterfalls', 'Sacred Site', 'Nature', 'Swimming', 'Hiking'],
        rating: 4,
        bestTime: 'Dry season',
        tips: ['Bring swimwear', 'Wear comfortable shoes', 'Allow full day', 'Respect sacred sites'],
        distance: '50 km from Siem Reap'
    },
    {
        id: 16,
        name: 'Tonle Sap Lake',
        category: 'Natural Site',
        province: 'Siem Reap',
        description: 'Southeast Asia\'s largest freshwater lake, home to floating villages and diverse wildlife. The lake changes dramatically between wet and dry seasons.',
        features: ['Floating Villages', 'Wildlife', 'Boat Tours', 'Culture', 'Nature'],
        rating: 4,
        bestTime: 'Wet season (June-October) for full lake',
        tips: ['Take boat tour', 'Visit floating village', 'Bring camera', 'Respect local communities'],
        distance: '15 km from Siem Reap'
    },
    {
        id: 17,
        name: 'Preah Vihear Temple',
        category: 'Temple',
        province: 'Preah Vihear',
        description: 'A stunning cliff-top temple on the border with Thailand. UNESCO World Heritage site with spectacular views and ancient architecture.',
        features: ['Cliff Top', 'UNESCO Site', 'Views', 'History', 'Architecture'],
        rating: 5,
        bestTime: 'Dry season',
        tips: ['Check border access', 'Bring passport', 'Great views', 'Allow half day'],
        distance: '400 km from Phnom Penh'
    },
    {
        id: 18,
        name: 'Kratie',
        category: 'City',
        province: 'Kratie',
        description: 'A riverside town on the Mekong River, famous for Irrawaddy dolphin watching. A peaceful town with colonial architecture.',
        features: ['Dolphin Watching', 'Mekong River', 'Riverside', 'Wildlife', 'Relaxation'],
        rating: 4,
        bestTime: 'Dry season (December-May)',
        tips: ['Dolphin watching tours', 'Early morning best', 'Respect dolphins', 'Enjoy riverside'],
        distance: '348 km from Phnom Penh'
    },
    {
        id: 19,
        name: 'Mondulkiri',
        category: 'Natural Site',
        province: 'Mondulkiri',
        description: 'Cambodia\'s largest and most sparsely populated province. Known for waterfalls, elephant sanctuaries, and hill tribe communities.',
        features: ['Waterfalls', 'Elephants', 'Hill Tribes', 'Nature', 'Adventure'],
        rating: 4,
        bestTime: 'Dry season',
        tips: ['Visit elephant sanctuary', 'See waterfalls', 'Respect local culture', 'Bring warm clothes'],
        distance: '370 km from Phnom Penh'
    },
    {
        id: 20,
        name: 'National Museum of Cambodia',
        category: 'Museum',
        province: 'Phnom Penh',
        description: 'Houses the world\'s largest collection of Khmer art, including sculptures, ceramics, and bronzes from different periods of Cambodian history.',
        features: ['Khmer Art', 'History', 'Education', 'Culture', 'Collections'],
        rating: 4,
        bestTime: 'Morning',
        tips: ['Audio guide available', 'Allow 1-2 hours', 'No photography inside', 'Great for history lovers'],
        distance: 'In Phnom Penh'
    }
])

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedProvince = ref('all')
const selectedPlace = ref(null)
const currentPage = ref(1)
const itemsPerPage = 12

// Computed properties
const categories = computed(() => {
    const cats = [...new Set(places.value.map(p => p.category))]
    return cats.sort()
})

const provinces = computed(() => {
    const provs = [...new Set(places.value.map(p => p.province))]
    return provs.sort()
})

const filteredPlaces = computed(() => {
    let filtered = [...places.value]

    // Filter by search query
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(place => 
            place.name.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query) ||
            place.province.toLowerCase().includes(query) ||
            place.category.toLowerCase().includes(query) ||
            (place.features && place.features.some(f => f.toLowerCase().includes(query)))
        )
    }

    // Filter by category
    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(place => place.category === selectedCategory.value)
    }

    // Filter by province
    if (selectedProvince.value !== 'all') {
        filtered = filtered.filter(place => place.province === selectedProvince.value)
    }

    return filtered
})

const paginatedPlaces = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredPlaces.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredPlaces.value.length / itemsPerPage)
})

// Methods
const selectPlace = (place) => {
    selectedPlace.value = place
}

const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedProvince.value = 'all'
    currentPage.value = 1
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory, selectedProvince], () => {
    currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

