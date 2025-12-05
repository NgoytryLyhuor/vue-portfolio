<template>
    <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
        <div class="max-w-5xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    ព្រះធម៌ និង ពាក្យសំដី
                </h1>
                <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-2">
                    Buddhist Dharma & Quotes
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Daily wisdom and teachings from Buddhist tradition
                </p>
            </div>

            <!-- Main Quote Card -->
            <div class="mb-8">
                <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-amber-200 dark:border-amber-800 relative overflow-hidden">
                    <!-- Decorative Elements -->
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-50"></div>
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-2xl opacity-50"></div>
                    
                    <div class="relative z-10">
                        <!-- Quote Icon -->
                        <div class="flex justify-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Quote Text -->
                        <div class="text-center mb-6">
                            <p class="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed mb-4 italic">
                                "{{ currentQuote.text }}"
                            </p>
                            <div class="flex items-center justify-center gap-2">
                                <div class="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1 max-w-xs"></div>
                                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                                <div class="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1 max-w-xs"></div>
                            </div>
                        </div>

                        <!-- Quote Source -->
                        <div class="text-center">
                            <p class="text-lg font-semibold text-amber-700 dark:text-amber-400 mb-1">
                                {{ currentQuote.source }}
                            </p>
                            <p v-if="currentQuote.translation" class="text-sm text-gray-600 dark:text-gray-400">
                                {{ currentQuote.translation }}
                            </p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-center gap-4 mt-8">
                            <button 
                                @click="getRandomQuote"
                                class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                New Quote
                            </button>
                            <button 
                                @click="shareQuote"
                                class="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-md font-semibold flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Categories -->
            <div class="mb-8">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Categories
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="filterByCategory(category)"
                        class="p-4 rounded-xl border-2 transition-all text-center"
                        :class="selectedCategory === category 
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-md' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20'"
                    >
                        <div class="font-semibold text-gray-900 dark:text-white">{{ category }}</div>
                    </button>
                </div>
            </div>

            <!-- Quote Collection -->
            <div class="mb-8">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    More Quotes
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        v-for="(quote, index) in filteredQuotes"
                        :key="index"
                        @click="setCurrentQuote(quote)"
                        class="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <p class="text-gray-800 dark:text-gray-200 mb-4 line-clamp-3 italic">
                            "{{ quote.text }}"
                        </p>
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-semibold text-amber-700 dark:text-amber-400">
                                {{ quote.source }}
                            </p>
                            <span class="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                                {{ quote.category }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dharma Terms Glossary -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-200 dark:border-amber-800">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Dharma Terms Glossary
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        v-for="term in dharmaTerms"
                        :key="term.term"
                        class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800"
                    >
                        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-1">
                            {{ term.term }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {{ term.language }}
                        </p>
                        <p class="text-gray-700 dark:text-gray-300">
                            {{ term.meaning }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const selectedCategory = ref('All')
const currentQuote = ref({})

// Categories
const categories = ['All', 'Wisdom', 'Compassion', 'Mindfulness', 'Peace', 'Life', 'Suffering', 'Enlightenment']

// Quotes Database
const quotes = ref([
    {
        text: "Peace comes from within. Do not seek it without.",
        source: "Buddha",
        translation: "សន្តិភាពមកពីខាងក្នុង។ កុំស្វែងរកវាពីខាងក្រៅ។",
        category: "Peace"
    },
    {
        text: "The mind is everything. What you think you become.",
        source: "Buddha",
        translation: "ចិត្តគឺជាអ្វីៗទាំងអស់។ អ្វីដែលអ្នកគិត អ្នកនឹងក្លាយជា។",
        category: "Mindfulness"
    },
    {
        text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
        source: "Buddha",
        translation: "របស់បីយ៉ាងមិនអាចលាក់បាំងបានយូរ: ព្រះអាទិត្យ, ព្រះច័ន្ទ, និងការពិត។",
        category: "Wisdom"
    },
    {
        text: "You will not be punished for your anger, you will be punished by your anger.",
        source: "Buddha",
        translation: "អ្នកនឹងមិនត្រូវបានដាក់ទណ្ឌកម្មដោយសារកំហឹងរបស់អ្នកទេ ប៉ុន្តែអ្នកនឹងត្រូវបានដាក់ទណ្ឌកម្មដោយកំហឹងរបស់អ្នក។",
        category: "Wisdom"
    },
    {
        text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
        source: "Buddha",
        translation: "ការកាន់កំហឹងគឺដូចជាការចាប់ធ្យូងកំដៅដោយមានបំណងបោះទៅអ្នកដទៃ; អ្នកគឺជាអ្នកដែលត្រូវបានដុត។",
        category: "Wisdom"
    },
    {
        text: "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.",
        source: "Dalai Lama",
        translation: "ប្រសិនបើអ្នកចង់ឱ្យអ្នកដទៃសប្បាយចិត្ត សូមអនុវត្តករុណា។ ប្រសិនបើអ្នកចង់សប្បាយចិត្ត សូមអនុវត្តករុណា។",
        category: "Compassion"
    },
    {
        text: "The root of suffering is attachment.",
        source: "Buddha",
        translation: "ឫសគល់នៃការឈឺចាប់គឺការភ្ជាប់។",
        category: "Suffering"
    },
    {
        text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        source: "Buddha",
        translation: "កុំរស់នៅក្នុងអតីតកាល កុំសុបិន្តអំពីអនាគត សូមផ្តោតចិត្តលើបច្ចុប្បន្ន។",
        category: "Mindfulness"
    },
    {
        text: "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
        source: "Buddha",
        translation: "មន្ទីរ៉ាពាន់អាចត្រូវបានអុជពីពន្លឺមួយ ហើយអាយុរបស់ពន្លឺនឹងមិនខ្លីទេ។ សុភមង្គលមិនថយចុះដោយការចែករំលែក។",
        category: "Compassion"
    },
    {
        text: "We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.",
        source: "Buddha",
        translation: "យើងគឺជាអ្វីដែលយើងគិត។ អ្វីៗទាំងអស់ដែលយើងគឺជាការកើតឡើងជាមួយនឹងគំនិតរបស់យើង។ ជាមួយនឹងគំនិតរបស់យើង យើងបង្កើតពិភពលោក។",
        category: "Mindfulness"
    },
    {
        text: "The way is not in the sky. The way is in the heart.",
        source: "Buddha",
        translation: "ផ្លូវមិននៅក្នុងមេឃទេ។ ផ្លូវនៅក្នុងចិត្ត។",
        category: "Enlightenment"
    },
    {
        text: "To understand everything is to forgive everything.",
        source: "Buddha",
        translation: "ការយល់ដឹងអ្វីៗទាំងអស់គឺជាការអភ័យទោសអ្វីៗទាំងអស់។",
        category: "Compassion"
    },
    {
        text: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.",
        source: "Buddha",
        translation: "នៅទីបញ្ចប់ មានតែបីយ៉ាងដែលសំខាន់: អ្នកស្រលាញ់ប៉ុណ្ណា អ្នករស់នៅដោយទន់ភ្លន់ប៉ុណ្ណា និងអ្នកបោះបង់អ្វីៗដែលមិនមែនសម្រាប់អ្នកដោយឆើតឆាយប៉ុណ្ណា។",
        category: "Life"
    },
    {
        text: "Your work is to discover your world and then with all your heart give yourself to it.",
        source: "Buddha",
        translation: "ការងាររបស់អ្នកគឺការរកឃើញពិភពលោករបស់អ្នក ហើយបន្ទាប់មកដោយចិត្តទាំងមូលផ្តល់ខ្លួនអ្នកឱ្យវា។",
        category: "Life"
    },
    {
        text: "The secret of health for both mind and body is not to mourn for the past, worry about the future, but to live the present moment wisely and earnestly.",
        source: "Buddha",
        translation: "អាថ៌កំបាំងនៃសុខភាពសម្រាប់ទាំងចិត្តនិងរាងកាយគឺមិនត្រូវសោកស្តាយចំពោះអតីតកាល ព្រួយបារម្ភអំពីអនាគត ប៉ុន្តែដើម្បីរស់នៅក្នុងបច្ចុប្បន្នដោយប្រាជ្ញា និងដោយចិត្តជ្រះថ្លា។",
        category: "Mindfulness"
    }
])

// Dharma Terms
const dharmaTerms = ref([
    {
        term: "Dharma",
        language: "Pali/Sanskrit: धर्म",
        meaning: "The teachings of the Buddha; the universal truth or law"
    },
    {
        term: "Karma",
        language: "Pali/Sanskrit: कर्म",
        meaning: "Action and its consequences; the law of cause and effect"
    },
    {
        term: "Nirvana",
        language: "Pali/Sanskrit: निर्वाण",
        meaning: "The ultimate goal of Buddhism; liberation from suffering"
    },
    {
        term: "Sangha",
        language: "Pali/Sanskrit: संघ",
        meaning: "The Buddhist community of monks, nuns, and lay practitioners"
    },
    {
        term: "Buddha",
        language: "Pali/Sanskrit: बुद्ध",
        meaning: "The awakened one; one who has achieved enlightenment"
    },
    {
        term: "Bodhisattva",
        language: "Sanskrit: बोधिसत्त्व",
        meaning: "One who seeks enlightenment for the benefit of all beings"
    },
    {
        term: "Metta",
        language: "Pali: मेत्ता",
        meaning: "Loving-kindness; unconditional love and compassion"
    },
    {
        term: "Dukkha",
        language: "Pali: दुक्ख",
        meaning: "Suffering, unsatisfactoriness, or stress"
    },
    {
        term: "Anicca",
        language: "Pali: अनिच्च",
        meaning: "Impermanence; the truth that all things are constantly changing"
    },
    {
        term: "Anatta",
        language: "Pali: अनत्त",
        meaning: "Non-self; the truth that there is no permanent, unchanging self"
    },
    {
        term: "Sati",
        language: "Pali: सति",
        meaning: "Mindfulness; awareness of the present moment"
    },
    {
        term: "Karuna",
        language: "Pali: करुणा",
        meaning: "Compassion; the wish for others to be free from suffering"
    }
])

// Computed
const filteredQuotes = computed(() => {
    if (selectedCategory.value === 'All') {
        return quotes.value
    }
    return quotes.value.filter(quote => quote.category === selectedCategory.value)
})

// Methods
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.value.length)
    currentQuote.value = quotes.value[randomIndex]
}

const setCurrentQuote = (quote) => {
    currentQuote.value = quote
}

const filterByCategory = (category) => {
    selectedCategory.value = category
}

const shareQuote = () => {
    const text = `"${currentQuote.value.text}" - ${currentQuote.value.source}`
    if (navigator.share) {
        navigator.share({
            title: 'Buddhist Quote',
            text: text
        }).catch(err => console.log('Error sharing', err))
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Quote copied to clipboard!')
        })
    }
}

// Lifecycle
onMounted(() => {
    getRandomQuote()
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

