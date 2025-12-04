<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
            <!-- Hero Section -->
            <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-stone-900/80 to-amber-900/90"></div>
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=1200')] bg-cover bg-center opacity-40"></div>
                
                <div class="relative p-6 sm:p-10 lg:p-16 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4 sm:mb-6 shadow-xl">
                        <span class="text-3xl sm:text-4xl">🏛️</span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                        រុករកអង្គរ
                    </h1>
                    <p class="text-lg sm:text-xl lg:text-2xl text-amber-200 mb-2">
                        Angkor Explorer
                    </p>
                    <p class="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                        Discover the magnificent temples of the Khmer Empire, a UNESCO World Heritage Site and one of the most important archaeological sites in Southeast Asia.
                    </p>
                    
                    <!-- Quick Stats -->
                    <div class="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-amber-400">400+</div>
                            <div class="text-xs sm:text-sm text-white/60">Square km Area</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-amber-400">1000+</div>
                            <div class="text-xs sm:text-sm text-white/60">Temples</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-amber-400">802 AD</div>
                            <div class="text-xs sm:text-sm text-white/60">Founded</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl sm:text-3xl font-bold text-amber-400">1992</div>
                            <div class="text-xs sm:text-sm text-white/60">UNESCO Listed</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <button v-for="category in categories" :key="category.id"
                    @click="activeCategory = category.id"
                    class="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all"
                    :class="activeCategory === category.id 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'">
                    {{ category.icon }} {{ category.name }}
                </button>
            </div>

            <!-- Temples Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div v-for="temple in filteredTemples" :key="temple.id"
                    @click="selectedTemple = temple"
                    class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    
                    <!-- Temple Image -->
                    <div class="relative h-48 sm:h-56 overflow-hidden">
                        <img :src="temple.image" :alt="temple.name" 
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        <!-- Category Badge -->
                        <div class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200">
                            {{ getCategoryIcon(temple.category) }} {{ temple.category }}
                        </div>
                        
                        <!-- UNESCO Badge -->
                        <div v-if="temple.unesco" class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                            🌍 UNESCO
                        </div>
                        
                        <!-- Temple Name Overlay -->
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                            <h3 class="text-lg sm:text-xl font-bold text-white">{{ temple.name }}</h3>
                            <p class="text-amber-300 text-sm">{{ temple.khmerName }}</p>
                        </div>
                    </div>
                    
                    <!-- Temple Info -->
                    <div class="p-4">
                        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span class="flex items-center gap-1">
                                <CalendarIcon class="h-4 w-4" />
                                {{ temple.builtYear }}
                            </span>
                            <span class="flex items-center gap-1">
                                <UserIcon class="h-4 w-4" />
                                {{ temple.builtBy }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {{ temple.shortDescription }}
                        </p>
                        <div class="mt-3 flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium group-hover:text-amber-700 dark:group-hover:text-amber-300">
                            Explore Temple
                            <ArrowRightIcon class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- History Timeline -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span class="text-2xl">📜</span>
                    ប្រវត្តិសាស្រ្តអង្គរ
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">History of Angkor</span>
                </h2>
                
                <div class="relative">
                    <!-- Timeline Line -->
                    <div class="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500"></div>
                    
                    <!-- Timeline Items -->
                    <div class="space-y-6 sm:space-y-8">
                        <div v-for="(event, idx) in timeline" :key="idx" class="relative pl-10 sm:pl-20">
                            <div class="absolute left-2 sm:left-6 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-gray-800 shadow"></div>
                            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-5">
                                <div class="text-amber-600 dark:text-amber-400 font-bold text-sm sm:text-base mb-1">{{ event.year }}</div>
                                <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1">{{ event.title }}</div>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ event.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fun Facts -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mb-8 border border-amber-200 dark:border-amber-800">
                <h2 class="text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-200 mb-6 flex items-center gap-3">
                    <span class="text-2xl">💡</span>
                    ការពិតគួរឱ្យចាប់អារម្មណ៍
                    <span class="text-sm font-normal text-amber-700 dark:text-amber-400">Amazing Facts</span>
                </h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="(fact, idx) in facts" :key="idx"
                        class="flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                        <span class="text-2xl flex-shrink-0">{{ fact.icon }}</span>
                        <div>
                            <h3 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ fact.title }}</h3>
                            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{{ fact.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Visitor Tips -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span class="text-2xl">🎒</span>
                    គន្លឹះសម្រាប់ភ្ញៀវទេសចរ
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Visitor Tips</span>
                </h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="(tip, idx) in tips" :key="idx"
                        class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl">{{ tip.icon }}</span>
                            <h3 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ tip.title }}</h3>
                        </div>
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ tip.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>រុករកអង្គរ • Angkor Explorer • UNESCO World Heritage Site</p>
            </footer>
        </div>

        <!-- Temple Detail Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="selectedTemple" 
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    @click.self="selectedTemple = null">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <!-- Modal Header Image -->
                        <div class="relative h-56 sm:h-72">
                            <img :src="selectedTemple.image" :alt="selectedTemple.name" 
                                class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            <!-- Close Button -->
                            <button @click="selectedTemple = null"
                                class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all">
                                <XMarkIcon class="h-6 w-6 text-white" />
                            </button>
                            
                            <!-- Temple Name -->
                            <div class="absolute bottom-0 left-0 right-0 p-6">
                                <h2 class="text-2xl sm:text-3xl font-bold text-white">{{ selectedTemple.name }}</h2>
                                <p class="text-amber-300 text-lg">{{ selectedTemple.khmerName }}</p>
                            </div>
                        </div>
                        
                        <!-- Modal Content -->
                        <div class="p-6 sm:p-8">
                            <!-- Quick Info -->
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div class="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div class="text-amber-600 dark:text-amber-400 font-bold">{{ selectedTemple.builtYear }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">Built</div>
                                </div>
                                <div class="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div class="text-amber-600 dark:text-amber-400 font-bold">{{ selectedTemple.builtBy }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">King</div>
                                </div>
                                <div class="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div class="text-amber-600 dark:text-amber-400 font-bold">{{ selectedTemple.religion }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">Religion</div>
                                </div>
                                <div class="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div class="text-amber-600 dark:text-amber-400 font-bold">{{ selectedTemple.style }}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">Style</div>
                                </div>
                            </div>
                            
                            <!-- Description -->
                            <div class="mb-6">
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
                                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {{ selectedTemple.description }}
                                </p>
                            </div>
                            
                            <!-- Highlights -->
                            <div class="mb-6">
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Highlights</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="(highlight, idx) in selectedTemple.highlights" :key="idx"
                                        class="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                                        ✨ {{ highlight }}
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Best Time to Visit -->
                            <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                                <h3 class="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                                    <span>🌅</span> Best Time to Visit
                                </h3>
                                <p class="text-sm text-amber-800 dark:text-amber-300">{{ selectedTemple.bestTime }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script>
import {
    CalendarIcon,
    UserIcon,
    ArrowRightIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'AngkorExplorer',
    components: {
        CalendarIcon,
        UserIcon,
        ArrowRightIcon,
        XMarkIcon
    },
    data() {
        return {
            activeCategory: 'all',
            selectedTemple: null,
            categories: [
                { id: 'all', name: 'All Temples', icon: '🏛️' },
                { id: 'hindu', name: 'Hindu', icon: '🕉️' },
                { id: 'buddhist', name: 'Buddhist', icon: '☸️' },
                { id: 'mountain', name: 'Temple Mountain', icon: '⛰️' },
                { id: 'monastery', name: 'Monastery', icon: '🏯' }
            ],
            temples: [
                {
                    id: 1,
                    name: 'Angkor Wat',
                    khmerName: 'អង្គរវត្ត',
                    category: 'hindu',
                    image: 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=800',
                    builtYear: '12th Century',
                    builtBy: 'Suryavarman II',
                    religion: 'Hindu → Buddhist',
                    style: 'Angkor Wat',
                    unesco: true,
                    shortDescription: 'The largest religious monument in the world, originally dedicated to Vishnu.',
                    description: 'Angkor Wat is the crown jewel of Khmer architecture and the largest religious monument in the world, covering 162.6 hectares. Built by King Suryavarman II in the early 12th century as his state temple and capital city, it was originally dedicated to the Hindu god Vishnu. The temple is admired for the grandeur and harmony of its architecture, extensive bas-reliefs, and numerous devatas (guardian spirits) adorning its walls.',
                    highlights: ['Sunrise views', 'Bas-relief galleries', 'Central tower', 'Reflecting pools', 'Apsara carvings'],
                    bestTime: 'Sunrise (5:00-6:30 AM) for iconic photos, or late afternoon (3:00-5:30 PM) for golden light and fewer crowds.'
                },
                {
                    id: 2,
                    name: 'Bayon',
                    khmerName: 'បាយ័ន',
                    category: 'buddhist',
                    image: 'https://images.unsplash.com/photo-1569321584421-5cced4851620?w=800',
                    builtYear: 'Late 12th Century',
                    builtBy: 'Jayavarman VII',
                    religion: 'Buddhist',
                    style: 'Bayon',
                    unesco: true,
                    shortDescription: 'Famous for its serene and massive stone faces on its towers.',
                    description: 'The Bayon is a richly decorated Khmer temple built in the late 12th century by King Jayavarman VII as the centerpiece of Angkor Thom. Its most distinctive feature is the multitude of serene and smiling stone faces on the many towers, which are thought to represent the bodhisattva Avalokiteshvara or perhaps Jayavarman VII himself.',
                    highlights: ['216 giant stone faces', 'Bas-relief galleries', 'Central sanctuary', 'Morning light on faces'],
                    bestTime: 'Early morning (7:00-9:00 AM) when sunlight illuminates the stone faces beautifully.'
                },
                {
                    id: 3,
                    name: 'Ta Prohm',
                    khmerName: 'តាព្រហ្ម',
                    category: 'monastery',
                    image: 'https://images.unsplash.com/photo-1575842231957-3d2c2a2c3c5c?w=800',
                    builtYear: '1186 AD',
                    builtBy: 'Jayavarman VII',
                    religion: 'Buddhist',
                    style: 'Bayon',
                    unesco: true,
                    shortDescription: 'The "Tomb Raider" temple, famous for trees growing through ruins.',
                    description: 'Ta Prohm was built as a Buddhist monastery and university. Unlike most Angkorian temples, it has been left largely as it was found, with trees growing out of the ruins. The photogenic and atmospheric combination of trees growing over the temple has made it one of Angkor\'s most popular temples.',
                    highlights: ['Giant tree roots', 'Tomb Raider filming location', 'Atmospheric ruins', 'Jungle setting'],
                    bestTime: 'Late morning (9:00-11:00 AM) or early afternoon for dramatic shadows through the trees.'
                },
                {
                    id: 4,
                    name: 'Banteay Srei',
                    khmerName: 'បន្ទាយស្រី',
                    category: 'hindu',
                    image: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800',
                    builtYear: '967 AD',
                    builtBy: 'Yajnavaraha',
                    religion: 'Hindu',
                    style: 'Banteay Srei',
                    unesco: true,
                    shortDescription: 'The "Citadel of Women", known for intricate pink sandstone carvings.',
                    description: 'Banteay Srei is a 10th-century Cambodian temple dedicated to the Hindu god Shiva. Built largely of red sandstone, it features elaborate decorative wall carvings. The temple is known as the "Citadel of Women" or "Citadel of Beauty" due to the intricate carvings and its small size.',
                    highlights: ['Pink sandstone', 'Intricate carvings', 'Miniature size', 'Devata sculptures'],
                    bestTime: 'Morning (8:00-10:00 AM) when the pink sandstone glows in the soft light.'
                },
                {
                    id: 5,
                    name: 'Preah Khan',
                    khmerName: 'ព្រះខ័ន',
                    category: 'monastery',
                    image: 'https://images.unsplash.com/photo-1606576225264-7a6e50a2e0e6?w=800',
                    builtYear: '1191 AD',
                    builtBy: 'Jayavarman VII',
                    religion: 'Buddhist',
                    style: 'Bayon',
                    unesco: true,
                    shortDescription: 'A vast complex that once housed over 100,000 officials and servants.',
                    description: 'Preah Khan, meaning "Sacred Sword", was built to honor Jayavarman VII\'s father. It served as a temporary residence while Angkor Thom was being rebuilt. The temple covers a large area and includes a complex network of passageways, chambers, and courtyards.',
                    highlights: ['Hall of Dancers', 'Two-story building', 'Tree-covered galleries', 'Sword inscription'],
                    bestTime: 'Morning to early afternoon to explore the extensive complex.'
                },
                {
                    id: 6,
                    name: 'Baphuon',
                    khmerName: 'បាភួន',
                    category: 'mountain',
                    image: 'https://images.unsplash.com/photo-1584286595398-a59511e0649f?w=800',
                    builtYear: '11th Century',
                    builtBy: 'Udayadityavarman II',
                    religion: 'Hindu',
                    style: 'Baphuon',
                    unesco: true,
                    shortDescription: 'A three-tiered temple mountain dedicated to the Hindu God Shiva.',
                    description: 'Baphuon is a temple located in Angkor Thom, northwest of the Bayon. Built in the mid-11th century, it is a three-tiered temple mountain built as the state temple of Udayadityavarman II. The temple was dedicated to the Hindu God Shiva and features a massive reclining Buddha on its west side.',
                    highlights: ['Temple mountain', 'Reclining Buddha', 'Bas-reliefs', 'Elevated walkway'],
                    bestTime: 'Afternoon for the best light on the western reclining Buddha.'
                },
                {
                    id: 7,
                    name: 'Angkor Thom',
                    khmerName: 'អង្គរធំ',
                    category: 'buddhist',
                    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
                    builtYear: 'Late 12th Century',
                    builtBy: 'Jayavarman VII',
                    religion: 'Buddhist',
                    style: 'Bayon',
                    unesco: true,
                    shortDescription: 'The great walled city that was the last capital of the Khmer Empire.',
                    description: 'Angkor Thom was the last and most enduring capital city of the Khmer empire. It was established by King Jayavarman VII and covers an area of 9 km², within which are located several monuments and temples including the Bayon, Baphuon, and the Terrace of the Elephants.',
                    highlights: ['South Gate', 'Victory Gate', 'Terrace of Elephants', 'Terrace of the Leper King'],
                    bestTime: 'Morning for the South Gate, spend the full day exploring the complex.'
                },
                {
                    id: 8,
                    name: 'Pre Rup',
                    khmerName: 'ប្រែរូប',
                    category: 'mountain',
                    image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800',
                    builtYear: '961 AD',
                    builtBy: 'Rajendravarman II',
                    religion: 'Hindu',
                    style: 'Pre Rup',
                    unesco: true,
                    shortDescription: 'A temple mountain with five lotus towers, perfect for sunset views.',
                    description: 'Pre Rup is a Hindu temple dedicated to Shiva, built as the state temple of Khmer king Rajendravarman. The temple\'s name means "turn the body" and refers to a traditional cremation ritual. Its elevated position makes it one of the best spots in Angkor to watch the sunset.',
                    highlights: ['Sunset views', 'Five towers', 'Brick construction', 'Cremation site'],
                    bestTime: 'Sunset (5:00-6:00 PM) for spectacular views over the surrounding jungle.'
                },
                {
                    id: 9,
                    name: 'Neak Pean',
                    khmerName: 'នាគព័ន្ធ',
                    category: 'buddhist',
                    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800',
                    builtYear: 'Late 12th Century',
                    builtBy: 'Jayavarman VII',
                    religion: 'Buddhist',
                    style: 'Bayon',
                    unesco: true,
                    shortDescription: 'An island temple with healing pools, symbolizing the sacred Himalayan lake.',
                    description: 'Neak Pean is a small temple built on a circular island in the center of a large artificial pond called Jayatataka. It was built by King Jayavarman VII as a Buddhist temple symbolizing Anavatapta, the mythical lake in the Himalayas whose waters are believed to cure all illness.',
                    highlights: ['Island temple', 'Healing pools', 'Horse sculpture', 'Circular design'],
                    bestTime: 'Morning when the pools are calm and reflective.'
                }
            ],
            timeline: [
                { year: '802 AD', title: 'Foundation of the Khmer Empire', description: 'Jayavarman II declares independence from Java and establishes the Khmer Empire, proclaiming himself "god-king" (devaraja).' },
                { year: '889 AD', title: 'Yasovarman I Builds Angkor', description: 'King Yasovarman I moves the capital to Angkor and builds the first temples and the great Eastern Baray reservoir.' },
                { year: '1113-1150 AD', title: 'Angkor Wat Construction', description: 'King Suryavarman II builds Angkor Wat, the largest religious monument ever constructed, dedicated to Vishnu.' },
                { year: '1181-1219 AD', title: 'Jayavarman VII\'s Reign', description: 'The greatest Khmer king builds Angkor Thom, Bayon, Ta Prohm, and converts the empire to Buddhism.' },
                { year: '1431 AD', title: 'Fall of Angkor', description: 'The Ayutthaya Kingdom sacks Angkor, leading to the gradual abandonment of the city.' },
                { year: '1860 AD', title: 'Western Rediscovery', description: 'French explorer Henri Mouhot brings Angkor to Western attention, sparking global interest.' },
                { year: '1992 AD', title: 'UNESCO World Heritage', description: 'Angkor is inscribed as a UNESCO World Heritage Site, ensuring its protection for future generations.' }
            ],
            facts: [
                { icon: '🏗️', title: 'Largest Religious Monument', description: 'Angkor Wat covers 162.6 hectares, making it the largest religious monument in the world.' },
                { icon: '🌅', title: 'Perfect Alignment', description: 'Angkor Wat is precisely aligned with the spring equinox sunrise.' },
                { icon: '👥', title: 'Massive Workforce', description: 'An estimated 300,000 workers and 6,000 elephants built Angkor Wat over 30 years.' },
                { icon: '🗿', title: 'Countless Apsaras', description: 'Over 3,000 apsara (celestial dancers) are carved into the walls of Angkor Wat.' },
                { icon: '🌊', title: 'Advanced Hydraulics', description: 'The Khmer built sophisticated water management systems including huge reservoirs called barays.' },
                { icon: '🏰', title: 'Population Center', description: 'At its peak, Angkor was the largest pre-industrial city in the world with nearly 1 million residents.' }
            ],
            tips: [
                { icon: '🎫', title: 'Buy Pass Early', description: 'Purchase your Angkor Pass the afternoon before to enter at sunrise next day.' },
                { icon: '🌅', title: 'Start at Sunrise', description: 'Arrive at Angkor Wat by 5 AM for the iconic sunrise reflection shot.' },
                { icon: '👗', title: 'Dress Modestly', description: 'Cover shoulders and knees when visiting temples out of respect.' },
                { icon: '💧', title: 'Stay Hydrated', description: 'Bring plenty of water - temples can be hot and involve lots of walking.' },
                { icon: '🚐', title: 'Hire a Guide', description: 'Local guides provide invaluable historical context and photography tips.' },
                { icon: '📱', title: 'Download Maps', description: 'Download offline maps as internet can be spotty at remote temples.' }
            ]
        };
    },
    computed: {
        filteredTemples() {
            if (this.activeCategory === 'all') {
                return this.temples;
            }
            return this.temples.filter(t => t.category === this.activeCategory);
        }
    },
    methods: {
        getCategoryIcon(category) {
            const cat = this.categories.find(c => c.id === category);
            return cat ? cat.icon : '🏛️';
        }
    }
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
    transform: scale(0.95);
}
</style>

