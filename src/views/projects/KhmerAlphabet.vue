<template>
    <div class="min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div class="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    រៀនអក្សរខ្មែរ
                </h1>
                <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    Learn Khmer Alphabet - Interactive Learning for Children
                </p>
            </div>

            <!-- Mode Toggle -->
            <div class="flex justify-center mb-6 sm:mb-8">
                <div class="inline-flex rounded-lg bg-white dark:bg-gray-800 p-1 shadow-md border border-gray-200 dark:border-gray-700">
                    <button
                        @click="currentMode = 'learn'"
                        :class="[
                            'px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200',
                            currentMode === 'learn'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                    >
                        Learn
                    </button>
                    <button
                        @click="currentMode = 'practice'"
                        :class="[
                            'px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200',
                            currentMode === 'practice'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                    >
                        Practice
                    </button>
                    <button
                        @click="currentMode = 'quiz'"
                        :class="[
                            'px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200',
                            currentMode === 'quiz'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                    >
                        Quiz
                    </button>
                </div>
            </div>

            <!-- Learn Mode -->
            <div v-if="currentMode === 'learn'" class="space-y-6 sm:space-y-8">
                <!-- Alphabet Grid -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                        Khmer Consonants (ព្យញ្ជនៈ)
                    </h2>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4">
                        <button
                            v-for="(letter, index) in consonants"
                            :key="index"
                            @click="selectLetter(letter)"
                            :class="[
                                'aspect-square flex flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md',
                                selectedLetter?.khmer === letter.khmer
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md scale-105'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            ]"
                        >
                            <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {{ letter.khmer }}
                            </span>
                            <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {{ letter.roman }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Vowels -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                        Khmer Vowels (ស្រៈ)
                    </h2>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4">
                        <button
                            v-for="(vowel, index) in vowels"
                            :key="index"
                            @click="selectLetter(vowel)"
                            :class="[
                                'aspect-square flex flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md',
                                selectedLetter?.khmer === vowel.khmer
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md scale-105'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            ]"
                        >
                            <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {{ vowel.khmer }}
                            </span>
                            <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {{ vowel.roman }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Selected Letter Details -->
                <div v-if="selectedLetter" class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
                    <div class="text-center mb-4 sm:mb-6">
                        <div class="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                            {{ selectedLetter.khmer }}
                        </div>
                        <div class="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                            {{ selectedLetter.roman }}
                        </div>
                        <div class="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                            {{ selectedLetter.name }}
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5">
                            <h3 class="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Pronunciation</h3>
                            <p class="text-base sm:text-lg text-gray-900 dark:text-white">{{ selectedLetter.pronunciation }}</p>
                        </div>
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5">
                            <h3 class="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Example Word</h3>
                            <p class="text-base sm:text-lg text-gray-900 dark:text-white">
                                <span class="text-2xl">{{ selectedLetter.example?.khmer }}</span>
                                <span class="text-gray-500 dark:text-gray-400 ml-2">({{ selectedLetter.example?.english }})</span>
                            </p>
                        </div>
                    </div>
                    <button
                        @click="playPronunciation"
                        class="mt-4 sm:mt-6 w-full sm:w-auto mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-base sm:text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Listen to Pronunciation
                    </button>
                </div>
            </div>

            <!-- Practice Mode -->
            <div v-if="currentMode === 'practice'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                        Writing Practice
                    </h2>
                    <div class="text-center mb-6 sm:mb-8">
                        <div class="text-7xl sm:text-8xl md:text-9xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                            {{ practiceLetter?.khmer }}
                        </div>
                        <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                            {{ practiceLetter?.roman }} - {{ practiceLetter?.name }}
                        </p>
                        <div class="flex justify-center gap-3 sm:gap-4">
                            <button
                                @click="getRandomPracticeLetter"
                                class="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                New Letter
                            </button>
                            <button
                                @click="showStrokeOrder = !showStrokeOrder"
                                class="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                {{ showStrokeOrder ? 'Hide' : 'Show' }} Stroke Order
                            </button>
                        </div>
                    </div>
                    <div v-if="showStrokeOrder && practiceLetter" class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 sm:p-6">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                            Stroke Order Guide
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            {{ practiceLetter.strokeOrder || 'Practice writing this letter by following the traditional stroke order. Start from top to bottom, left to right.' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Quiz Mode -->
            <div v-if="currentMode === 'quiz'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <div v-if="!quizStarted" class="text-center">
                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                            Khmer Alphabet Quiz
                        </h2>
                        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                            Test your knowledge of Khmer letters!
                        </p>
                        <button
                            @click="startQuiz"
                            class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                        >
                            Start Quiz
                        </button>
                    </div>

                    <div v-else>
                        <div class="mb-6 sm:mb-8">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Question {{ currentQuestion + 1 }} of {{ quizQuestions.length }}
                                </span>
                                <span class="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                                    Score: {{ quizScore }}/{{ quizQuestions.length }}
                                </span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                                <div
                                    class="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                                    :style="{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }"
                                ></div>
                            </div>
                        </div>

                        <div v-if="currentQuestion < quizQuestions.length" class="text-center mb-6 sm:mb-8">
                            <div class="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                                {{ quizQuestions[currentQuestion].letter.khmer }}
                            </div>
                            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                                What is this letter?
                            </p>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <button
                                    v-for="(option, index) in quizQuestions[currentQuestion].options"
                                    :key="index"
                                    @click="answerQuiz(option)"
                                    :disabled="quizAnswered"
                                    :class="[
                                        'px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg transition-all duration-200',
                                        quizAnswered && option === quizQuestions[currentQuestion].letter.roman
                                            ? 'bg-green-500 text-white'
                                            : quizAnswered && option !== quizQuestions[currentQuestion].letter.roman
                                            ? 'bg-red-500 text-white opacity-50'
                                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                                    ]"
                                >
                                    {{ option }}
                                </button>
                            </div>
                            <button
                                v-if="quizAnswered"
                                @click="nextQuestion"
                                class="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                            >
                                {{ currentQuestion + 1 === quizQuestions.length ? 'See Results' : 'Next Question' }}
                            </button>
                        </div>

                        <div v-else class="text-center">
                            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                                Quiz Complete! 🎉
                            </h2>
                            <div class="text-5xl sm:text-6xl mb-4 sm:mb-6">
                                {{ getQuizEmoji() }}
                            </div>
                            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                                You scored {{ quizScore }} out of {{ quizQuestions.length }}
                            </p>
                            <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                                {{ getQuizMessage() }}
                            </p>
                            <button
                                @click="resetQuiz"
                                class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Khmer consonants data
const consonants = [
    { khmer: 'ក', roman: 'ka', name: 'Ka', pronunciation: 'kah', example: { khmer: 'កូន', english: 'child' } },
    { khmer: 'ខ', roman: 'kha', name: 'Kha', pronunciation: 'kah', example: { khmer: 'ខ្លា', english: 'tiger' } },
    { khmer: 'គ', roman: 'ko', name: 'Ko', pronunciation: 'ko', example: { khmer: 'គោ', english: 'cow' } },
    { khmer: 'ឃ', roman: 'kho', name: 'Kho', pronunciation: 'kho', example: { khmer: 'ឃ្លា', english: 'phrase' } },
    { khmer: 'ង', roman: 'ngo', name: 'Ngo', pronunciation: 'ngo', example: { khmer: 'ងារ', english: 'title' } },
    { khmer: 'ច', roman: 'cha', name: 'Cha', pronunciation: 'chah', example: { khmer: 'ចេក', english: 'banana' } },
    { khmer: 'ឆ', roman: 'chha', name: 'Chha', pronunciation: 'chhah', example: { khmer: 'ឆ្កែ', english: 'dog' } },
    { khmer: 'ជ', roman: 'cho', name: 'Cho', pronunciation: 'cho', example: { khmer: 'ជើង', english: 'leg' } },
    { khmer: 'ឈ', roman: 'chho', name: 'Chho', pronunciation: 'chho', example: { khmer: 'ឈើ', english: 'tree' } },
    { khmer: 'ញ', roman: 'nho', name: 'Nho', pronunciation: 'nho', example: { khmer: 'ញញឹម', english: 'smile' } },
    { khmer: 'ដ', roman: 'da', name: 'Da', pronunciation: 'dah', example: { khmer: 'ដើម', english: 'origin' } },
    { khmer: 'ឋ', roman: 'tha', name: 'Tha', pronunciation: 'thah', example: { khmer: 'ឋាន', english: 'place' } },
    { khmer: 'ឌ', roman: 'do', name: 'Do', pronunciation: 'do', example: { khmer: 'ឌិន', english: 'drum' } },
    { khmer: 'ឍ', roman: 'tho', name: 'Tho', pronunciation: 'tho', example: { khmer: 'ឍារ', english: 'flag' } },
    { khmer: 'ណ', roman: 'na', name: 'Na', pronunciation: 'nah', example: { khmer: 'ណាត់', english: 'appointment' } },
    { khmer: 'ត', roman: 'ta', name: 'Ta', pronunciation: 'tah', example: { khmer: 'តាម', english: 'follow' } },
    { khmer: 'ថ', roman: 'tha', name: 'Tha', pronunciation: 'thah', example: { khmer: 'ថ្ងៃ', english: 'day' } },
    { khmer: 'ទ', roman: 'to', name: 'To', pronunciation: 'to', example: { khmer: 'ទឹក', english: 'water' } },
    { khmer: 'ធ', roman: 'tho', name: 'Tho', pronunciation: 'tho', example: { khmer: 'ធ្វើ', english: 'do' } },
    { khmer: 'ន', roman: 'no', name: 'No', pronunciation: 'no', example: { khmer: 'នាង', english: 'she' } },
    { khmer: 'ប', roman: 'ba', name: 'Ba', pronunciation: 'bah', example: { khmer: 'បាទ', english: 'yes' } },
    { khmer: 'ផ', roman: 'pha', name: 'Pha', pronunciation: 'phah', example: { khmer: 'ផ្ទះ', english: 'house' } },
    { khmer: 'ព', roman: 'po', name: 'Po', pronunciation: 'po', example: { khmer: 'ពួក', english: 'group' } },
    { khmer: 'ភ', roman: 'pho', name: 'Pho', pronunciation: 'pho', example: { khmer: 'ភាសា', english: 'language' } },
    { khmer: 'ម', roman: 'mo', name: 'Mo', pronunciation: 'mo', example: { khmer: 'ម៉ាក់', english: 'mother' } },
    { khmer: 'យ', roman: 'yo', name: 'Yo', pronunciation: 'yo', example: { khmer: 'យើង', english: 'we' } },
    { khmer: 'រ', roman: 'ro', name: 'Ro', pronunciation: 'ro', example: { khmer: 'រៀន', english: 'learn' } },
    { khmer: 'ល', roman: 'lo', name: 'Lo', pronunciation: 'lo', example: { khmer: 'លេង', english: 'play' } },
    { khmer: 'វ', roman: 'vo', name: 'Vo', pronunciation: 'vo', example: { khmer: 'វិញ', english: 'again' } },
    { khmer: 'ឝ', roman: 'sha', name: 'Sha', pronunciation: 'shah', example: { khmer: 'ឝាន', english: 'palace' } },
    { khmer: 'ឞ', roman: 'ssa', name: 'Ssa', pronunciation: 'ssah', example: { khmer: 'ឞាន', english: 'palace' } },
    { khmer: 'ស', roman: 'sa', name: 'Sa', pronunciation: 'sah', example: { khmer: 'ស្តេច', english: 'king' } },
    { khmer: 'ហ', roman: 'ha', name: 'Ha', pronunciation: 'hah', example: { khmer: 'ហាង', english: 'shop' } },
    { khmer: 'ឡ', roman: 'la', name: 'La', pronunciation: 'lah', example: { khmer: 'ឡាន', english: 'car' } },
    { khmer: 'អ', roman: 'a', name: 'A', pronunciation: 'ah', example: { khmer: 'អាប់', english: 'down' } }
]

// Khmer vowels data
const vowels = [
    { khmer: 'ា', roman: 'aa', name: 'Aa', pronunciation: 'ah', example: { khmer: 'កា', english: 'ka' } },
    { khmer: 'ិ', roman: 'i', name: 'I', pronunciation: 'ee', example: { khmer: 'កិ', english: 'ki' } },
    { khmer: 'ី', roman: 'ii', name: 'Ii', pronunciation: 'ee', example: { khmer: 'កី', english: 'kii' } },
    { khmer: 'ុ', roman: 'u', name: 'U', pronunciation: 'oo', example: { khmer: 'កុ', english: 'ku' } },
    { khmer: 'ូ', roman: 'uu', name: 'Uu', pronunciation: 'oo', example: { khmer: 'កូ', english: 'kuu' } },
    { khmer: 'ួ', roman: 'ua', name: 'Ua', pronunciation: 'uah', example: { khmer: 'កួ', english: 'kua' } },
    { khmer: 'ើ', roman: 'oe', name: 'Oe', pronunciation: 'oe', example: { khmer: 'កើ', english: 'koe' } },
    { khmer: 'ឿ', roman: 'ue', name: 'Ue', pronunciation: 'ue', example: { khmer: 'កឿ', english: 'kue' } },
    { khmer: 'ៀ', roman: 'ie', name: 'Ie', pronunciation: 'ie', example: { khmer: 'កៀ', english: 'kie' } },
    { khmer: 'េ', roman: 'e', name: 'E', pronunciation: 'eh', example: { khmer: 'កេ', english: 'ke' } },
    { khmer: 'ែ', roman: 'ae', name: 'Ae', pronunciation: 'ae', example: { khmer: 'កែ', english: 'kae' } },
    { khmer: 'ៃ', roman: 'ai', name: 'Ai', pronunciation: 'ai', example: { khmer: 'កៃ', english: 'kai' } },
    { khmer: 'ោ', roman: 'oo', name: 'Oo', pronunciation: 'oh', example: { khmer: 'កោ', english: 'koo' } },
    { khmer: 'ៅ', roman: 'au', name: 'Au', pronunciation: 'ow', example: { khmer: 'កៅ', english: 'kau' } },
    { khmer: 'ុំ', roman: 'om', name: 'Om', pronunciation: 'om', example: { khmer: 'កុំ', english: 'kom' } },
    { khmer: 'ំ', roman: 'am', name: 'Am', pronunciation: 'am', example: { khmer: 'កំ', english: 'kam' } },
    { khmer: 'ាំ', roman: 'aam', name: 'Aam', pronunciation: 'aam', example: { khmer: 'កាំ', english: 'kaam' } },
    { khmer: 'ះ', roman: 'ah', name: 'Ah', pronunciation: 'ah', example: { khmer: 'កះ', english: 'kah' } }
]

const currentMode = ref('learn')
const selectedLetter = ref(null)
const practiceLetter = ref(null)
const showStrokeOrder = ref(false)

// Quiz state
const quizStarted = ref(false)
const quizQuestions = ref([])
const currentQuestion = ref(0)
const quizScore = ref(0)
const quizAnswered = ref(false)

const allLetters = computed(() => [...consonants, ...vowels])

const selectLetter = (letter) => {
    selectedLetter.value = letter
}

const playPronunciation = () => {
    // Use Web Speech API for pronunciation
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(selectedLetter.value.pronunciation)
        utterance.lang = 'km-KH' // Khmer language
        utterance.rate = 0.8
        speechSynthesis.speak(utterance)
    } else {
        alert(`Pronunciation: ${selectedLetter.value.pronunciation}`)
    }
}

const getRandomPracticeLetter = () => {
    const randomIndex = Math.floor(Math.random() * allLetters.value.length)
    practiceLetter.value = allLetters.value[randomIndex]
    showStrokeOrder.value = false
}

const startQuiz = () => {
    quizStarted.value = true
    quizScore.value = 0
    currentQuestion.value = 0
    quizAnswered.value = false
    
    // Generate random quiz questions
    const shuffled = [...allLetters.value].sort(() => 0.5 - Math.random())
    quizQuestions.value = shuffled.slice(0, 10).map(letter => {
        const wrongOptions = allLetters.value
            .filter(l => l.roman !== letter.roman)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(l => l.roman)
        
        return {
            letter,
            options: [...wrongOptions, letter.roman].sort(() => 0.5 - Math.random())
        }
    })
}

const answerQuiz = (answer) => {
    if (quizAnswered.value) return
    
    quizAnswered.value = true
    if (answer === quizQuestions.value[currentQuestion.value].letter.roman) {
        quizScore.value++
    }
}

const nextQuestion = () => {
    if (currentQuestion.value < quizQuestions.value.length - 1) {
        currentQuestion.value++
        quizAnswered.value = false
    }
}

const resetQuiz = () => {
    quizStarted.value = false
    quizQuestions.value = []
    currentQuestion.value = 0
    quizScore.value = 0
    quizAnswered.value = false
}

const getQuizEmoji = () => {
    const percentage = (quizScore.value / quizQuestions.value.length) * 100
    if (percentage === 100) return '🏆'
    if (percentage >= 80) return '🎉'
    if (percentage >= 60) return '👍'
    return '💪'
}

const getQuizMessage = () => {
    const percentage = (quizScore.value / quizQuestions.value.length) * 100
    if (percentage === 100) return 'Perfect! You know all the letters!'
    if (percentage >= 80) return 'Excellent! Keep practicing!'
    if (percentage >= 60) return 'Good job! Practice more to improve!'
    return 'Keep learning! You\'ll get better!'
}

onMounted(() => {
    getRandomPracticeLetter()
})
</script>

<style scoped>
/* Khmer font support */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&display=swap');

* {
    font-family: 'Noto Sans Khmer', 'Kantumruy Pro', sans-serif;
}
</style>

