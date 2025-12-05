<template>
    <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
        <div class="max-w-5xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    បម្លែងកាលបរិច្ឆេទពុទ្ធសករាជ
                </h1>
                <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-2">
                    Buddhist Era Date Converter
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Convert between Gregorian (AD) and Buddhist Era (BE) calendars
                </p>
            </div>

            <!-- Current Date Display -->
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 text-white">
                <div class="text-center">
                    <p class="text-sm sm:text-base opacity-90 mb-2">Current Date</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                            <p class="text-xs opacity-80 mb-1">Gregorian (AD)</p>
                            <p class="text-2xl sm:text-3xl font-bold">{{ currentGregorianDate }}</p>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                            <p class="text-xs opacity-80 mb-1">Buddhist Era (BE)</p>
                            <p class="text-2xl sm:text-3xl font-bold">{{ currentBuddhistEra }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Converter Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-amber-200 dark:border-amber-800 mb-8">
                <!-- Instructions -->
                <div class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p class="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>How to use:</strong> Select conversion type, enter a date, and see the converted date instantly. Buddhist Era = Gregorian Year + 543</span>
                    </p>
                </div>

                <!-- Conversion Type Selector -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                        Conversion Type
                    </label>
                    <div class="grid grid-cols-2 gap-4">
                        <button
                            @click="conversionType = 'ad-to-be'"
                            class="p-4 rounded-xl border-2 transition-all text-center"
                            :class="conversionType === 'ad-to-be' 
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-md' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'"
                        >
                            <div class="font-semibold text-gray-900 dark:text-white mb-1">AD → BE</div>
                            <div class="text-xs text-gray-600 dark:text-gray-400">Gregorian to Buddhist Era</div>
                        </button>
                        <button
                            @click="conversionType = 'be-to-ad'"
                            class="p-4 rounded-xl border-2 transition-all text-center"
                            :class="conversionType === 'be-to-ad' 
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-md' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'"
                        >
                            <div class="font-semibold text-gray-900 dark:text-white mb-1">BE → AD</div>
                            <div class="text-xs text-gray-600 dark:text-gray-400">Buddhist Era to Gregorian</div>
                        </button>
                    </div>
                </div>

                <!-- Input Section -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                        {{ conversionType === 'ad-to-be' ? 'Enter Gregorian Date (AD)' : 'Enter Buddhist Era Date (BE)' }}
                    </label>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-2">Year</label>
                            <input 
                                v-model.number="inputYear"
                                type="number"
                                :placeholder="conversionType === 'ad-to-be' ? '2024' : '2567'"
                                class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                @input="convertDate"
                            />
                        </div>
                        <div>
                            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-2">Month</label>
                            <select 
                                v-model.number="inputMonth"
                                @change="convertDate"
                                class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-600 dark:text-gray-400 mb-2">Day</label>
                            <input 
                                v-model.number="inputDay"
                                type="number"
                                min="1"
                                :max="maxDaysInMonth"
                                placeholder="1"
                                class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                @input="convertDate"
                            />
                        </div>
                    </div>
                </div>

                <!-- Converted Result -->
                <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-700">
                    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-center">
                        Converted Date
                    </p>
                    <div class="text-center">
                        <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ convertedDate }}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ convertedDateFull }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Quick Convert Buttons -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Quick Convert
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Click to quickly convert common dates</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                        v-for="quick in quickDates"
                        :key="quick.label"
                        @click="setQuickDate(quick)"
                        class="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all text-center"
                    >
                        <div class="font-semibold text-gray-900 dark:text-white">{{ quick.label }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ quick.date }}</div>
                    </button>
                </div>
            </div>

            <!-- Important Buddhist Dates -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-200 dark:border-amber-800">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Important Buddhist Dates
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        v-for="date in importantDates"
                        :key="date.name"
                        class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-amber-200 dark:border-amber-800"
                    >
                        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ date.name }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ date.khmer }}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-amber-700 dark:text-amber-400">{{ date.ad }}</span>
                            <span class="text-sm font-semibold text-orange-700 dark:text-orange-400">{{ date.be }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Information Card -->
            <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About Buddhist Era
                </h2>
                <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                        <strong>ពុទ្ធសករាជ (Buddhist Era):</strong> The Buddhist Era calendar is used in Cambodia, Thailand, Laos, Myanmar, and Sri Lanka. It is 543 years ahead of the Gregorian calendar.
                    </p>
                    <p>
                        <strong>Formula:</strong> BE = AD + 543 (or AD = BE - 543)
                    </p>
                    <p>
                        <strong>Example:</strong> 2024 AD = 2567 BE
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        The Buddhist Era starts from the year of Buddha's parinirvana (passing away), which is traditionally calculated as 543 BCE in the Gregorian calendar.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const conversionType = ref('ad-to-be')
const inputYear = ref(new Date().getFullYear())
const inputMonth = ref(new Date().getMonth() + 1)
const inputDay = ref(new Date().getDate())

// Quick dates
const quickDates = ref([
    { label: 'Today', date: 'Today', year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    { label: 'New Year', date: 'Jan 1', year: new Date().getFullYear(), month: 1, day: 1 },
    { label: 'Buddha Day', date: 'May 15', year: new Date().getFullYear(), month: 5, day: 15 },
    { label: 'Khmer New Year', date: 'Apr 13-16', year: new Date().getFullYear(), month: 4, day: 14 }
])

// Important Buddhist dates
const importantDates = ref([
    {
        name: 'Vesak (Buddha Day)',
        khmer: 'វិសាខបូជា',
        ad: 'May 15, 2024',
        be: '2567 BE'
    },
    {
        name: 'Magha Puja',
        khmer: 'មាឃបូជា',
        ad: 'February 24, 2024',
        be: '2567 BE'
    },
    {
        name: 'Asalha Puja',
        khmer: 'អាសាឡ្ហបូជា',
        ad: 'July 20, 2024',
        be: '2567 BE'
    },
    {
        name: 'Pchum Ben',
        khmer: 'ភ្ជុំបិណ្ឌ',
        ad: 'October 2-4, 2024',
        be: '2567 BE'
    },
    {
        name: 'Khmer New Year',
        khmer: 'ចូលឆ្នាំថ្មី',
        ad: 'April 13-16, 2024',
        be: '2567 BE'
    },
    {
        name: 'Buddhist New Year',
        khmer: 'ចូលឆ្នាំពុទ្ធសករាជ',
        ad: 'April 14, 2024',
        be: '2567 BE'
    }
])

// Computed
const currentGregorianDate = computed(() => {
    const now = new Date()
    return now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
})

const currentBuddhistEra = computed(() => {
    const now = new Date()
    const beYear = now.getFullYear() + 543
    return `${now.getDate()} ${now.toLocaleDateString('en-US', { month: 'long' })} ${beYear} BE`
})

const maxDaysInMonth = computed(() => {
    return new Date(inputYear.value, inputMonth.value, 0).getDate()
})

const convertedDate = computed(() => {
    if (!inputYear.value || !inputMonth.value || !inputDay.value) {
        return 'Enter a date to convert'
    }

    if (conversionType.value === 'ad-to-be') {
        const beYear = inputYear.value + 543
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${inputDay.value} ${monthNames[inputMonth.value - 1]} ${beYear} BE`
    } else {
        const adYear = inputYear.value - 543
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${inputDay.value} ${monthNames[inputMonth.value - 1]} ${adYear} AD`
    }
})

const convertedDateFull = computed(() => {
    if (!inputYear.value || !inputMonth.value || !inputDay.value) {
        return ''
    }

    if (conversionType.value === 'ad-to-be') {
        const beYear = inputYear.value + 543
        return `Buddhist Era: Year ${beYear}`
    } else {
        const adYear = inputYear.value - 543
        return `Gregorian Calendar: Year ${adYear} AD`
    }
})

// Methods
const convertDate = () => {
    // Validation
    if (inputDay.value > maxDaysInMonth.value) {
        inputDay.value = maxDaysInMonth.value
    }
    if (inputDay.value < 1) {
        inputDay.value = 1
    }
    if (inputMonth.value < 1) {
        inputMonth.value = 1
    }
    if (inputMonth.value > 12) {
        inputMonth.value = 12
    }
}

const setQuickDate = (quick) => {
    inputYear.value = quick.year
    inputMonth.value = quick.month
    inputDay.value = quick.day
    convertDate()
}

// Lifecycle
onMounted(() => {
    convertDate()
})
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>

