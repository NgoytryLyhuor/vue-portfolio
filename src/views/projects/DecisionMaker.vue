<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8 mt-8 sm:mt-10">
                <div class="flex items-center justify-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Decision Maker
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Make decisions easier with multiple decision-making tools
                </p>
            </div>

            <!-- Tool Selector Tabs -->
            <div class="mb-8">
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                    <button
                        v-for="tool in tools"
                        :key="tool.id"
                        @click="activeTool = tool.id"
                        :class="[
                            'px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-300 transform',
                            activeTool === tool.id
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102'
                        ]"
                    >
                        <div class="flex items-center gap-2">
                            <component :is="tool.icon" class="h-5 w-5" />
                            <span class="hidden sm:inline">{{ tool.name }}</span>
                            <span class="sm:hidden">{{ tool.shortName }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Coin Flip Tool -->
            <div v-if="activeTool === 'coin'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Coin Flip</h2>
                
                <div class="flex flex-col items-center justify-center min-h-[400px]">
                    <!-- Coin -->
                    <div 
                        class="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 cursor-pointer"
                        @click="flipCoin"
                        :class="{ 'pointer-events-none': isFlipping }"
                    >
                        <div 
                            class="absolute inset-0 transition-transform duration-1000"
                            :class="{
                                'transform rotate-y-180': isFlipping || coinResult === 'tails',
                                'transform rotate-y-0': !isFlipping && coinResult === 'heads'
                            }"
                            style="transform-style: preserve-3d;"
                        >
                            <!-- Heads Side -->
                            <div 
                                class="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center border-4 border-yellow-300"
                                style="backface-visibility: hidden;"
                            >
                                <div class="text-center">
                                    <div class="text-6xl sm:text-7xl mb-2">🪙</div>
                                    <div class="text-white font-bold text-xl">HEADS</div>
                                </div>
                            </div>
                            
                            <!-- Tails Side -->
                            <div 
                                class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-2xl flex items-center justify-center border-4 border-gray-300 transform rotate-y-180"
                                style="backface-visibility: hidden;"
                            >
                                <div class="text-center">
                                    <div class="text-6xl sm:text-7xl mb-2">🪙</div>
                                    <div class="text-white font-bold text-xl">TAILS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Result Display -->
                    <div v-if="coinResult" class="text-center mb-6">
                        <div 
                            class="inline-block px-6 py-3 rounded-xl text-2xl font-bold mb-2"
                            :class="coinResult === 'heads' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'"
                        >
                            {{ coinResult.toUpperCase() }}!
                        </div>
                        <p class="text-gray-600 dark:text-gray-400">Result: {{ coinResult === 'heads' ? 'Heads' : 'Tails' }}</p>
                    </div>

                    <!-- Flip Button -->
                    <button
                        @click="flipCoin"
                        :disabled="isFlipping"
                        class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': isFlipping }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {{ isFlipping ? 'Flipping...' : 'Flip Coin' }}
                    </button>

                    <!-- History -->
                    <div v-if="coinHistory.length > 0" class="mt-8 w-full max-w-md">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Flips</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            <span
                                v-for="(result, index) in coinHistory.slice(-10)"
                                :key="index"
                                class="px-3 py-1 rounded-lg text-sm font-medium"
                                :class="result === 'heads' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'"
                            >
                                {{ result === 'heads' ? 'H' : 'T' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Random Choice Picker / Wheel Spinner -->
            <div v-if="activeTool === 'choice'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Random Choice Picker</h2>
                
                <div class="max-w-2xl mx-auto">
                    <!-- Input Section -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Enter options (one per line or comma-separated)
                        </label>
                        <textarea
                            v-model="choiceInput"
                            rows="6"
                            placeholder="Option 1&#10;Option 2&#10;Option 3&#10;...&#10;&#10;Or: Option 1, Option 2, Option 3"
                            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        ></textarea>
                        <button
                            @click="parseChoices"
                            class="mt-3 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm"
                        >
                            Parse Options
                        </button>
                    </div>

                    <!-- Options List -->
                    <div v-if="choices.length > 0" class="mb-6">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Options ({{ choices.length }})
                            </h3>
                            <button
                                @click="clearChoices"
                                class="text-sm text-red-600 dark:text-red-400 hover:underline"
                            >
                                Clear All
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <div
                                v-for="(choice, index) in choices"
                                :key="index"
                                class="group relative"
                            >
                                <div
                                    class="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2"
                                    :class="{ 'ring-4 ring-yellow-400 scale-110': selectedChoice === choice && !isSpinning }"
                                >
                                    <span>{{ choice }}</span>
                                    <button
                                        @click="removeChoice(index)"
                                        class="opacity-0 group-hover:opacity-100 text-red-600 dark:text-red-400 hover:text-red-700 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Spinner Wheel -->
                    <div v-if="choices.length > 0" class="mb-6">
                        <div class="relative flex items-center justify-center">
                            <div 
                                class="relative w-64 h-64 sm:w-80 sm:h-80"
                                :class="{ 'pointer-events-none': isSpinning }"
                            >
                                <!-- Wheel -->
                                <svg
                                    class="w-full h-full transform transition-transform duration-5000"
                                    :style="{ transform: `rotate(${wheelRotation}deg)` }"
                                    viewBox="0 0 200 200"
                                >
                                    <g v-for="(choice, index) in choices" :key="index">
                                        <path
                                            :d="getWheelPath(index, choices.length)"
                                            :fill="getWheelColor(index)"
                                            stroke="white"
                                            stroke-width="2"
                                            class="transition-all duration-300"
                                            :class="{ 'opacity-80': selectedChoiceIndex === index && !isSpinning }"
                                        />
                                        <text
                                            :x="getTextX(index, choices.length)"
                                            :y="getTextY(index, choices.length)"
                                            text-anchor="middle"
                                            dominant-baseline="middle"
                                            class="text-xs font-bold fill-white pointer-events-none"
                                            transform="rotate(0)"
                                        >
                                            {{ choice.length > 15 ? choice.substring(0, 15) + '...' : choice }}
                                        </text>
                                    </g>
                                </svg>
                                
                                <!-- Center Circle -->
                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-gray-800 rounded-full border-4 border-purple-600 shadow-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                
                                <!-- Pointer -->
                                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                                    <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Spin Button -->
                    <div class="text-center">
                        <button
                            @click="spinWheel"
                            :disabled="choices.length < 2 || isSpinning"
                            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {{ isSpinning ? 'Spinning...' : 'Spin the Wheel!' }}
                        </button>
                    </div>

                    <!-- Selected Result -->
                    <div v-if="selectedChoice && !isSpinning" class="mt-6 text-center">
                        <div class="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg">
                            <div class="text-sm text-gray-700 mb-1">Selected:</div>
                            <div class="text-2xl font-bold text-gray-900">{{ selectedChoice }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Yes/No Decision Maker -->
            <div v-if="activeTool === 'yesno'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Yes or No?</h2>
                
                <div class="max-w-2xl mx-auto">
                    <!-- Question Input -->
                    <div class="mb-8">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            What's your question?
                        </label>
                        <input
                            v-model="question"
                            type="text"
                            placeholder="Should I go to the gym today?"
                            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            @keyup.enter="getYesNoAnswer"
                        />
                    </div>

                    <!-- Answer Display -->
                    <div v-if="yesNoAnswer" class="mb-8">
                        <div class="text-center">
                            <div 
                                class="inline-block px-8 py-6 rounded-2xl shadow-2xl mb-4 transform transition-all duration-500"
                                :class="yesNoAnswer === 'yes' 
                                    ? 'bg-gradient-to-br from-green-400 to-green-600 scale-110' 
                                    : 'bg-gradient-to-br from-red-400 to-red-600 scale-110'"
                            >
                                <div class="text-6xl sm:text-8xl font-bold text-white mb-2">
                                    {{ yesNoAnswer === 'yes' ? 'YES' : 'NO' }}
                                </div>
                            </div>
                            <p v-if="question" class="text-lg text-gray-700 dark:text-gray-300">
                                "{{ question }}"
                            </p>
                        </div>
                    </div>

                    <!-- Answer Button -->
                    <div class="text-center">
                        <button
                            @click="getYesNoAnswer"
                            :disabled="!question.trim()"
                            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Get Answer
                        </button>
                    </div>

                    <!-- Magic 8 Ball Style -->
                    <div v-if="yesNoAnswer" class="mt-8 text-center">
                        <div class="inline-block p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                💫 The decision has been made! {{ yesNoAnswer === 'yes' ? 'Go for it!' : 'Maybe reconsider...' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Number Generator -->
            <div v-if="activeTool === 'number'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Random Number Generator</h2>
                
                <div class="max-w-2xl mx-auto">
                    <!-- Range Inputs -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Minimum
                            </label>
                            <input
                                v-model.number="minNumber"
                                type="number"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Maximum
                            </label>
                            <input
                                v-model.number="maxNumber"
                                type="number"
                                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                    </div>

                    <!-- Quick Presets -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Quick Presets
                        </label>
                        <div class="flex flex-wrap gap-2">
                            <button
                                v-for="preset in numberPresets"
                                :key="preset.label"
                                @click="setNumberRange(preset.min, preset.max)"
                                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                            >
                                {{ preset.label }}
                            </button>
                        </div>
                    </div>

                    <!-- Generated Number Display -->
                    <div v-if="generatedNumber !== null" class="mb-6">
                        <div class="text-center">
                            <div class="inline-block px-12 py-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl transform transition-all duration-500 scale-105">
                                <div class="text-6xl sm:text-8xl font-bold text-white">
                                    {{ generatedNumber }}
                                </div>
                                <div class="text-white text-sm mt-2 opacity-90">
                                    Range: {{ minNumber }} - {{ maxNumber }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Generate Button -->
                    <div class="text-center">
                        <button
                            @click="generateNumber"
                            :disabled="minNumber >= maxNumber"
                            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Generate Random Number
                        </button>
                    </div>

                    <!-- History -->
                    <div v-if="numberHistory.length > 0" class="mt-8">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">Recent Numbers</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            <span
                                v-for="(num, index) in numberHistory.slice(-10)"
                                :key="index"
                                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium"
                            >
                                {{ num }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Decision Maker - Multiple decision-making tools
import { ref } from 'vue'

// Tool definitions
const tools = [
    {
        id: 'coin',
        name: 'Coin Flip',
        shortName: 'Coin',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
        }
    },
    {
        id: 'choice',
        name: 'Random Choice',
        shortName: 'Choice',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>`
        }
    },
    {
        id: 'yesno',
        name: 'Yes/No',
        shortName: 'Yes/No',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
        }
    },
    {
        id: 'number',
        name: 'Number',
        shortName: 'Number',
        icon: {
            template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>`
        }
    }
]

// Active tool
const activeTool = ref('coin')

// Coin Flip State
const coinResult = ref(null)
const isFlipping = ref(false)
const coinHistory = ref([])

// Random Choice State
const choiceInput = ref('')
const choices = ref([])
const selectedChoice = ref(null)
const selectedChoiceIndex = ref(null)
const isSpinning = ref(false)
const wheelRotation = ref(0)

// Yes/No State
const question = ref('')
const yesNoAnswer = ref(null)

// Number Generator State
const minNumber = ref(1)
const maxNumber = ref(100)
const generatedNumber = ref(null)
const numberHistory = ref([])
const numberPresets = [
    { label: '1-10', min: 1, max: 10 },
    { label: '1-100', min: 1, max: 100 },
    { label: '1-1000', min: 1, max: 1000 },
    { label: 'Dice (1-6)', min: 1, max: 6 },
    { label: 'Percent (0-100)', min: 0, max: 100 }
]

// Coin Flip Methods
const flipCoin = () => {
    if (isFlipping.value) return
    
    isFlipping.value = true
    coinResult.value = null
    
    // Simulate flip animation
    setTimeout(() => {
        const result = Math.random() < 0.5 ? 'heads' : 'tails'
        coinResult.value = result
        coinHistory.value.push(result)
        isFlipping.value = false
    }, 1000)
}

// Random Choice Methods
const parseChoices = () => {
    if (!choiceInput.value.trim()) return
    
    let parsed = []
    
    // Try comma-separated first
    if (choiceInput.value.includes(',')) {
        parsed = choiceInput.value.split(',').map(c => c.trim()).filter(c => c)
    } else {
        // Otherwise split by newlines
        parsed = choiceInput.value.split('\n').map(c => c.trim()).filter(c => c)
    }
    
    if (parsed.length > 0) {
        choices.value = [...choices.value, ...parsed]
        choiceInput.value = ''
    }
}

const removeChoice = (index) => {
    choices.value.splice(index, 1)
    if (selectedChoiceIndex.value === index) {
        selectedChoice.value = null
        selectedChoiceIndex.value = null
    }
}

const clearChoices = () => {
    choices.value = []
    selectedChoice.value = null
    selectedChoiceIndex.value = null
    choiceInput.value = ''
}

const spinWheel = () => {
    if (choices.value.length < 2 || isSpinning.value) return
    
    isSpinning.value = true
    selectedChoice.value = null
    selectedChoiceIndex.value = null
    
    // Random rotation (multiple full spins + random angle)
    const baseRotation = wheelRotation.value
    const spins = 5 + Math.random() * 3 // 5-8 full spins
    const randomAngle = Math.random() * 360
    const totalRotation = baseRotation + (spins * 360) + randomAngle
    
    wheelRotation.value = totalRotation
    
    // Calculate which choice is selected based on final rotation
    setTimeout(() => {
        const normalizedAngle = (360 - (totalRotation % 360)) % 360
        const segmentAngle = 360 / choices.value.length
        const selectedIndex = Math.floor(normalizedAngle / segmentAngle)
        
        selectedChoiceIndex.value = selectedIndex
        selectedChoice.value = choices.value[selectedIndex]
        isSpinning.value = false
    }, 5000)
}

const getWheelPath = (index, total) => {
    const angle = (360 / total) * index
    const nextAngle = (360 / total) * (index + 1)
    const radius = 100
    const centerX = 100
    const centerY = 100
    
    const startAngle = (angle - 90) * (Math.PI / 180)
    const endAngle = (nextAngle - 90) * (Math.PI / 180)
    
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)
    
    const largeArc = (nextAngle - angle) > 180 ? 1 : 0
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

const getWheelColor = (index) => {
    const colors = [
        '#8B5CF6', '#6366F1', '#3B82F6', '#06B6D4',
        '#10B981', '#84CC16', '#F59E0B', '#EF4444',
        '#EC4899', '#A855F7'
    ]
    return colors[index % colors.length]
}

const getTextX = (index, total) => {
    const angle = (360 / total) * (index + 0.5) - 90
    const radius = 70
    return 100 + radius * Math.cos(angle * (Math.PI / 180))
}

const getTextY = (index, total) => {
    const angle = (360 / total) * (index + 0.5) - 90
    const radius = 70
    return 100 + radius * Math.sin(angle * (Math.PI / 180))
}

// Yes/No Methods
const getYesNoAnswer = () => {
    if (!question.value.trim()) return
    
    // Random yes/no
    yesNoAnswer.value = Math.random() < 0.5 ? 'yes' : 'no'
}

// Number Generator Methods
const generateNumber = () => {
    if (minNumber.value >= maxNumber.value) return
    
    const min = Math.min(minNumber.value, maxNumber.value)
    const max = Math.max(minNumber.value, maxNumber.value)
    
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    generatedNumber.value = number
    numberHistory.value.push(number)
}

const setNumberRange = (min, max) => {
    minNumber.value = min
    maxNumber.value = max
}
</script>

<style scoped>
/* 3D Flip Animation */
@keyframes flip {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(180deg); }
}

/* Smooth transitions */
.transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scale hover effect */
.hover\:scale-102:hover {
    transform: scale(1.02);
}

/* Wheel animation */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

