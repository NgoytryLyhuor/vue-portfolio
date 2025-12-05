<template>
    <div class="min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div class="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    លេងរៀនអក្សរខ្មែរ
                </h1>
                <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    Khmer Learning Games - Fun and Educational
                </p>
            </div>

            <!-- Game Selection -->
            <div v-if="!currentGame" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                    v-for="game in games"
                    :key="game.id"
                    @click="startGame(game.id)"
                    class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
                >
                    <div class="text-5xl sm:text-6xl mb-4 text-center">{{ game.icon }}</div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                        {{ game.name }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base">
                        {{ game.description }}
                    </p>
                </div>
            </div>

            <!-- Word Matching Game -->
            <div v-if="currentGame === 'matching'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Word Matching Game
                        </h2>
                        <div class="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
                            Score: {{ matchingScore }}
                        </div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                        <button
                            v-for="(card, index) in matchingCards"
                            :key="index"
                            @click="flipCard(index)"
                            :disabled="card.flipped || card.matched"
                            :class="[
                                'aspect-square rounded-lg sm:rounded-xl border-2 transition-all duration-300 transform hover:scale-105',
                                card.flipped || card.matched
                                    ? card.matched
                                        ? 'bg-green-100 dark:bg-green-900 border-green-500'
                                        : 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400',
                                card.flipped || card.matched ? '' : 'cursor-pointer'
                            ]"
                        >
                            <div v-if="card.flipped || card.matched" class="h-full flex items-center justify-center">
                                <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    {{ card.type === 'khmer' ? card.content : card.content }}
                                </span>
                            </div>
                            <div v-else class="h-full flex items-center justify-center">
                                <span class="text-4xl sm:text-5xl">❓</span>
                            </div>
                        </button>
                    </div>

                    <div v-if="matchingGameComplete" class="text-center">
                        <div class="text-6xl sm:text-7xl mb-4">🎉</div>
                        <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Congratulations!
                        </h3>
                        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
                            You matched all pairs!
                        </p>
                        <button
                            @click="resetMatchingGame"
                            class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                        >
                            Play Again
                        </button>
                    </div>

                    <button
                        v-if="!matchingGameComplete"
                        @click="resetMatchingGame"
                        class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg sm:rounded-xl font-medium transition-colors duration-200"
                    >
                        New Game
                    </button>
                </div>
            </div>

            <!-- Memory Game -->
            <div v-if="currentGame === 'memory'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Memory Game
                        </h2>
                        <div class="flex gap-4">
                            <div class="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
                                Moves: {{ memoryMoves }}
                            </div>
                            <div class="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400">
                                Matched: {{ memoryMatched }}/{{ memoryCards.length / 2 }}
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 mb-6">
                        <button
                            v-for="(card, index) in memoryCards"
                            :key="index"
                            @click="flipMemoryCard(index)"
                            :disabled="card.flipped || card.matched"
                            :class="[
                                'aspect-square rounded-lg sm:rounded-xl border-2 transition-all duration-300 transform hover:scale-105',
                                card.flipped || card.matched
                                    ? card.matched
                                        ? 'bg-green-100 dark:bg-green-900 border-green-500'
                                        : 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400',
                                card.flipped || card.matched ? '' : 'cursor-pointer'
                            ]"
                        >
                            <div v-if="card.flipped || card.matched" class="h-full flex items-center justify-center">
                                <span class="text-3xl sm:text-4xl md:text-5xl">{{ card.emoji }}</span>
                            </div>
                            <div v-else class="h-full flex items-center justify-center">
                                <span class="text-3xl sm:text-4xl">🃏</span>
                            </div>
                        </button>
                    </div>

                    <div v-if="memoryGameComplete" class="text-center">
                        <div class="text-6xl sm:text-7xl mb-4">🏆</div>
                        <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Excellent Memory!
                        </h3>
                        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
                            You completed the game in {{ memoryMoves }} moves!
                        </p>
                        <button
                            @click="resetMemoryGame"
                            class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                        >
                            Play Again
                        </button>
                    </div>

                    <button
                        v-if="!memoryGameComplete"
                        @click="resetMemoryGame"
                        class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg sm:rounded-xl font-medium transition-colors duration-200"
                    >
                        New Game
                    </button>
                </div>
            </div>

            <!-- Quiz Game -->
            <div v-if="currentGame === 'quiz'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <div v-if="!quizGameStarted" class="text-center">
                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                            Khmer Vocabulary Quiz
                        </h2>
                        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                            Test your knowledge of Khmer words!
                        </p>
                        <button
                            @click="startQuizGame"
                            class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                        >
                            Start Quiz
                        </button>
                    </div>

                    <div v-else>
                        <div class="mb-6">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Question {{ quizGameQuestion + 1 }} of {{ quizGameQuestions.length }}
                                </span>
                                <span class="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                                    Score: {{ quizGameScore }}/{{ quizGameQuestions.length }}
                                </span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
                                <div
                                    class="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                                    :style="{ width: `${((quizGameQuestion + 1) / quizGameQuestions.length) * 100}%` }"
                                ></div>
                            </div>
                        </div>

                        <div v-if="quizGameQuestion < quizGameQuestions.length" class="text-center mb-6">
                            <div class="text-5xl sm:text-6xl mb-4">{{ quizGameQuestions[quizGameQuestion].emoji }}</div>
                            <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {{ quizGameQuestions[quizGameQuestion].khmer }}
                            </p>
                            <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
                                What does this word mean?
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <button
                                    v-for="(option, index) in quizGameQuestions[quizGameQuestion].options"
                                    :key="index"
                                    @click="answerQuizGame(option)"
                                    :disabled="quizGameAnswered"
                                    :class="[
                                        'px-6 sm:px-8 py-4 sm:py-5 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg transition-all duration-200',
                                        quizGameAnswered && option === quizGameQuestions[quizGameQuestion].english
                                            ? 'bg-green-500 text-white'
                                            : quizGameAnswered && option !== quizGameQuestions[quizGameQuestion].english
                                            ? 'bg-red-500 text-white opacity-50'
                                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                                    ]"
                                >
                                    {{ option }}
                                </button>
                            </div>
                            <button
                                v-if="quizGameAnswered"
                                @click="nextQuizGameQuestion"
                                class="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                            >
                                {{ quizGameQuestion + 1 === quizGameQuestions.length ? 'See Results' : 'Next Question' }}
                            </button>
                        </div>

                        <div v-else class="text-center">
                            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                                Quiz Complete! 🎉
                            </h2>
                            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                                You scored {{ quizGameScore }} out of {{ quizGameQuestions.length }}
                            </p>
                            <button
                                @click="resetQuizGame"
                                class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back Button -->
            <div v-if="currentGame" class="text-center">
                <button
                    @click="currentGame = null"
                    class="px-6 sm:px-8 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg sm:rounded-xl font-medium text-lg sm:text-xl transition-colors duration-200"
                >
                    ← Back to Games
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const games = [
    {
        id: 'matching',
        name: 'Word Matching',
        description: 'Match Khmer words with their English meanings',
        icon: '🔗'
    },
    {
        id: 'memory',
        name: 'Memory Game',
        description: 'Find matching pairs of Khmer words',
        icon: '🧠'
    },
    {
        id: 'quiz',
        name: 'Vocabulary Quiz',
        description: 'Test your Khmer vocabulary knowledge',
        icon: '📝'
    }
]

const currentGame = ref(null)

// Word Matching Game State
const matchingCards = ref([])
const matchingScore = ref(0)
const flippedCards = ref([])

const matchingWords = [
    { khmer: 'កូន', english: 'child' },
    { khmer: 'ផ្ទះ', english: 'house' },
    { khmer: 'ទឹក', english: 'water' },
    { khmer: 'ឈើ', english: 'tree' },
    { khmer: 'ឆ្កែ', english: 'dog' },
    { khmer: 'ចេក', english: 'banana' },
    { khmer: 'គោ', english: 'cow' },
    { khmer: 'ខ្លា', english: 'tiger' }
]

const matchingGameComplete = computed(() => {
    return matchingCards.value.length > 0 && matchingCards.value.every(card => card.matched)
})

// Memory Game State
const memoryCards = ref([])
const memoryMoves = ref(0)
const memoryMatched = ref(0)
const memoryFlippedCards = ref([])

const memoryWords = [
    { khmer: 'កូន', emoji: '👶' },
    { khmer: 'ផ្ទះ', emoji: '🏠' },
    { khmer: 'ទឹក', emoji: '💧' },
    { khmer: 'ឈើ', emoji: '🌳' },
    { khmer: 'ឆ្កែ', emoji: '🐕' },
    { khmer: 'ចេក', emoji: '🍌' }
]

const memoryGameComplete = computed(() => {
    return memoryCards.value.length > 0 && memoryCards.value.every(card => card.matched)
})

// Quiz Game State
const quizGameStarted = ref(false)
const quizGameQuestions = ref([])
const quizGameQuestion = ref(0)
const quizGameScore = ref(0)
const quizGameAnswered = ref(false)

const quizWords = [
    { khmer: 'កូន', english: 'child', emoji: '👶' },
    { khmer: 'ផ្ទះ', english: 'house', emoji: '🏠' },
    { khmer: 'ទឹក', english: 'water', emoji: '💧' },
    { khmer: 'ឈើ', english: 'tree', emoji: '🌳' },
    { khmer: 'ឆ្កែ', english: 'dog', emoji: '🐕' },
    { khmer: 'ចេក', english: 'banana', emoji: '🍌' },
    { khmer: 'គោ', english: 'cow', emoji: '🐄' },
    { khmer: 'ខ្លា', english: 'tiger', emoji: '🐅' },
    { khmer: 'មេ', english: 'mother', emoji: '👩' },
    { khmer: 'ឪពុក', english: 'father', emoji: '👨' }
]

const startGame = (gameId) => {
    currentGame.value = gameId
    if (gameId === 'matching') {
        resetMatchingGame()
    } else if (gameId === 'memory') {
        resetMemoryGame()
    } else if (gameId === 'quiz') {
        resetQuizGame()
    }
}

// Word Matching Game Functions
const resetMatchingGame = () => {
    const allCards = []
    matchingWords.forEach(word => {
        allCards.push({ content: word.khmer, type: 'khmer', flipped: false, matched: false })
        allCards.push({ content: word.english, type: 'english', flipped: false, matched: false })
    })
    matchingCards.value = allCards.sort(() => Math.random() - 0.5)
    matchingScore.value = 0
    flippedCards.value = []
}

const flipCard = (index) => {
    const card = matchingCards.value[index]
    if (card.flipped || card.matched) return

    card.flipped = true
    flippedCards.value.push({ index, card })

    if (flippedCards.value.length === 2) {
        const [first, second] = flippedCards.value
        const firstCard = matchingCards.value[first.index]
        const secondCard = matchingCards.value[second.index]

        // Check if they match
        const firstWord = matchingWords.find(w => w.khmer === firstCard.content || w.english === firstCard.content)
        const secondWord = matchingWords.find(w => w.khmer === secondCard.content || w.english === secondCard.content)

        if (firstWord && secondWord && firstWord === secondWord && firstCard.type !== secondCard.type) {
            // Match found
            setTimeout(() => {
                firstCard.matched = true
                secondCard.matched = true
                matchingScore.value++
                flippedCards.value = []
            }, 500)
        } else {
            // No match
            setTimeout(() => {
                firstCard.flipped = false
                secondCard.flipped = false
                flippedCards.value = []
            }, 1000)
        }
    }
}

// Memory Game Functions
const resetMemoryGame = () => {
    const allCards = []
    memoryWords.forEach(word => {
        allCards.push({ emoji: word.emoji, khmer: word.khmer, flipped: false, matched: false })
        allCards.push({ emoji: word.emoji, khmer: word.khmer, flipped: false, matched: false })
    })
    memoryCards.value = allCards.sort(() => Math.random() - 0.5)
    memoryMoves.value = 0
    memoryMatched.value = 0
    memoryFlippedCards.value = []
}

const flipMemoryCard = (index) => {
    const card = memoryCards.value[index]
    if (card.flipped || card.matched) return

    card.flipped = true
    memoryFlippedCards.value.push({ index, card })
    memoryMoves.value++

    if (memoryFlippedCards.value.length === 2) {
        const [first, second] = memoryFlippedCards.value
        const firstCard = memoryCards.value[first.index]
        const secondCard = memoryCards.value[second.index]

        if (firstCard.emoji === secondCard.emoji) {
            // Match found
            setTimeout(() => {
                firstCard.matched = true
                secondCard.matched = true
                memoryMatched.value++
                memoryFlippedCards.value = []
            }, 500)
        } else {
            // No match
            setTimeout(() => {
                firstCard.flipped = false
                secondCard.flipped = false
                memoryFlippedCards.value = []
            }, 1000)
        }
    }
}

// Quiz Game Functions
const startQuizGame = () => {
    quizGameStarted.value = true
    quizGameScore.value = 0
    quizGameQuestion.value = 0
    quizGameAnswered.value = false

    const shuffled = [...quizWords].sort(() => 0.5 - Math.random())
    quizGameQuestions.value = shuffled.slice(0, 5).map(word => {
        const wrongOptions = quizWords
            .filter(w => w.english !== word.english)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(w => w.english)

        return {
            ...word,
            options: [...wrongOptions, word.english].sort(() => 0.5 - Math.random())
        }
    })
}

const answerQuizGame = (answer) => {
    if (quizGameAnswered.value) return

    quizGameAnswered.value = true
    if (answer === quizGameQuestions.value[quizGameQuestion.value].english) {
        quizGameScore.value++
    }
}

const nextQuizGameQuestion = () => {
    if (quizGameQuestion.value < quizGameQuestions.value.length - 1) {
        quizGameQuestion.value++
        quizGameAnswered.value = false
    }
}

const resetQuizGame = () => {
    quizGameStarted.value = false
    quizGameQuestions.value = []
    quizGameQuestion.value = 0
    quizGameScore.value = 0
    quizGameAnswered.value = false
}
</script>

<style scoped>
/* Khmer font support */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&display=swap');

* {
    font-family: 'Noto Sans Khmer', 'Kantumruy Pro', sans-serif;
}
</style>

