<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8">
        <div class="max-w-5xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    Currency Converter
                </h1>
                <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2">
                    Convert currencies with real-time exchange rates
                </p>
                <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last updated: {{ formattedTime }}</span>
                    <button @click="fetchExchangeRates"
                        class="ml-2 p-1.5 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all"
                        aria-label="Refresh rates"
                        title="Refresh exchange rates">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading exchange rates...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-6 text-center shadow-lg">
                <div class="text-red-500 mb-3 text-xl font-bold">⚠️ Error</div>
                <p class="text-gray-700 dark:text-gray-300 mb-6">{{ error }}</p>
                <button @click="fetchExchangeRates"
                    class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-md">
                    🔄 Try Again
                </button>
            </div>

            <!-- Main Converter -->
            <div v-else class="space-y-6">
                <!-- Converter Card - Large and Prominent -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
                    <!-- Instructions -->
                    <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <p class="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span><strong>How to use:</strong> Enter an amount, select currencies, and see the conversion instantly. Click the swap button to reverse currencies.</span>
                        </p>
                    </div>

                    <!-- From Currency Section -->
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                            💵 Convert From
                        </label>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <!-- Currency Selector -->
                            <div class="sm:w-48 flex-shrink-0">
                                <select 
                                    v-model="fromCurrency"
                                    @change="convertCurrency"
                                    class="w-full px-4 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                        {{ currency.code }}
                                    </option>
                                </select>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                                    {{ getCurrencyName(fromCurrency) }}
                                </p>
                            </div>
                            
                            <!-- Amount Input -->
                            <div class="flex-1">
                                <input 
                                    v-model.number="amount" 
                                    type="number" 
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter amount"
                                    class="w-full px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    @input="convertCurrency"
                                />
                                <div class="flex items-center justify-between mt-2">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Enter any amount
                                    </p>
                                    <div class="flex gap-2">
                                        <button @click="amount = 100" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">100</button>
                                        <button @click="amount = 1000" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">1K</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Swap Button -->
                    <div class="flex justify-center my-4">
                        <button 
                            @click="swapCurrencies"
                            class="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            aria-label="Swap currencies"
                            title="Swap currencies"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <!-- To Currency Section -->
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                            💰 Convert To
                        </label>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <!-- Currency Selector -->
                            <div class="sm:w-48 flex-shrink-0">
                                <select 
                                    v-model="toCurrency"
                                    @change="convertCurrency"
                                    class="w-full px-4 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                                >
                                    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                        {{ currency.code }}
                                    </option>
                                </select>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                                    {{ getCurrencyName(toCurrency) }}
                                </p>
                            </div>
                            
                            <!-- Converted Amount Display -->
                            <div class="flex-1">
                                <div class="w-full px-6 py-4 rounded-xl border-2 border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold">
                                    {{ formatCurrency(convertedAmount) }}
                                </div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                    Converted amount
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Exchange Rate Display - Prominent -->
                    <div class="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                        <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 text-center">
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide font-semibold">
                                Exchange Rate
                            </p>
                            <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                1 {{ fromCurrency }} = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Last updated: {{ formattedTime }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Quick Convert Buttons -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Quick Convert
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Click to quickly convert common amounts</p>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                            v-for="quick in quickAmounts"
                            :key="quick"
                            @click="amount = quick; convertCurrency()"
                            class="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-center"
                        >
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatNumber(quick) }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ fromCurrency }}</div>
                        </button>
                    </div>
                </div>

                <!-- Popular Currencies -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Popular Currencies
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Click to select as target currency</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        <button
                            v-for="popular in popularCurrencies"
                            :key="popular.code"
                            @click="setPopularCurrency(popular.code)"
                            class="p-4 rounded-xl border-2 transition-all text-left"
                            :class="toCurrency === popular.code 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'"
                        >
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-bold text-lg text-gray-900 dark:text-white">{{ popular.code }}</div>
                                <svg v-if="toCurrency === popular.code" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">{{ popular.name }}</div>
                            <div v-if="rates && rates[popular.code]" class="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                1 {{ fromCurrency }} = {{ exchangeRateForPopular(popular.code) }} {{ popular.code }}
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Info Card -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About Exchange Rates
                    </h2>
                    <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <strong>📊 Base Currency:</strong> {{ baseCurrency }} ({{ getCurrencyName(baseCurrency) }})
                        </p>
                        <p>
                            <strong>🌍 Supported:</strong> {{ Object.keys(rates).length }} currencies available
                        </p>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                            ⚠️ <strong>Disclaimer:</strong> Exchange rates are updated daily and are for informational purposes only. Actual transaction rates may vary. Rates are not guaranteed for financial transactions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import logger from '@/utils/logger'

// State
const loading = ref(true)
const error = ref(null)
const amount = ref(1)
const fromCurrency = ref('USD')
const toCurrency = ref('KHR')
const rates = ref({})
const baseCurrency = ref('USD')
const lastUpdated = ref(null)

// Quick convert amounts
const quickAmounts = [1, 10, 100, 1000]

// Popular currencies (Cambodia-focused)
const popularCurrencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'KHR', name: 'Cambodian Riel' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'VND', name: 'Vietnamese Dong' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'INR', name: 'Indian Rupee' }
]

// All available currencies
const currencies = ref([
    { code: 'USD', name: 'US Dollar' },
    { code: 'KHR', name: 'Cambodian Riel' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'VND', name: 'Vietnamese Dong' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'RUB', name: 'Russian Ruble' }
])

// Computed
const exchangeRate = computed(() => {
    if (!rates.value[fromCurrency.value] || !rates.value[toCurrency.value]) return 0
    return rates.value[toCurrency.value] / rates.value[fromCurrency.value]
})

const convertedAmount = computed(() => {
    if (!amount.value || amount.value <= 0) return 0
    return amount.value * exchangeRate.value
})

const formattedTime = computed(() => {
    if (!lastUpdated.value) return 'Never'
    return new Date(lastUpdated.value).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
})

// Methods
const getCurrencyName = (code) => {
    const currency = currencies.value.find(c => c.code === code)
    return currency ? currency.name : code
}

const exchangeRateForPopular = (code) => {
    if (!rates.value[code] || !rates.value[fromCurrency.value]) return '0.0000'
    const rate = rates.value[code] / rates.value[fromCurrency.value]
    return rate.toFixed(4)
}

const formatCurrency = (value) => {
    if (!value || value === 0) return '0.00'
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}

const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
    return num.toString()
}

const fetchExchangeRates = async () => {
    loading.value = true
    error.value = null

    try {
        const apiKey = process.env.VUE_APP_CURRENCY_API_KEY || ''
        let apiUrl = ''
        
        if (apiKey) {
            apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        } else {
            apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'
        }

        let response = await fetch(apiUrl)
        let data = null
        
        if (!response.ok) {
            logger.warn('Primary API failed, trying fallback...')
            const fallbackUrl = 'https://api.exchangerate.host/latest?base=USD'
            response = await fetch(fallbackUrl)
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}. Please try again later.`)
            }
        }
        
        data = await response.json()
        
        if (data.rates) {
            rates.value = { USD: 1, ...data.rates }
            baseCurrency.value = data.base || 'USD'
        } else if (data.result === 'success' && data.conversion_rates) {
            rates.value = data.conversion_rates
            baseCurrency.value = 'USD'
        } else {
            logger.error('Unexpected API response:', data)
            throw new Error('Invalid API response format. Please try again later.')
        }

        lastUpdated.value = new Date().toISOString()
        
        localStorage.setItem('currencyRates', JSON.stringify({
            rates: rates.value,
            baseCurrency: baseCurrency.value,
            lastUpdated: lastUpdated.value
        }))
        
        error.value = null

    } catch (err) {
        logger.error('Error fetching exchange rates:', err)
        
        const cached = localStorage.getItem('currencyRates')
        if (cached) {
            try {
                const cachedData = JSON.parse(cached)
                const cacheAge = new Date() - new Date(cachedData.lastUpdated)
                
                if (cacheAge < 86400000) {
                    rates.value = cachedData.rates || {}
                    baseCurrency.value = cachedData.baseCurrency || 'USD'
                    lastUpdated.value = cachedData.lastUpdated
                    error.value = 'Using cached rates (last updated: ' + new Date(cachedData.lastUpdated).toLocaleString() + '). ' + err.message
                } else {
                    error.value = 'Failed to fetch fresh rates. Cache expired. ' + err.message
                }
            } catch (e) {
                error.value = err.message || 'Failed to load exchange rates. Please check your internet connection.'
            }
        } else {
            error.value = err.message || 'Failed to load exchange rates. Please check your internet connection and try again.'
        }
    } finally {
        loading.value = false
    }
}

const convertCurrency = () => {
    logger.log(`Converting ${amount.value} ${fromCurrency.value} to ${toCurrency.value}`)
}

const swapCurrencies = () => {
    const temp = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = temp
    convertCurrency()
}

const setPopularCurrency = (code) => {
    toCurrency.value = code
    convertCurrency()
}

// Lifecycle
onMounted(async () => {
    const cached = localStorage.getItem('currencyRates')
    if (cached) {
        try {
            const cachedData = JSON.parse(cached)
            const cacheAge = new Date() - new Date(cachedData.lastUpdated)
            if (cacheAge < 3600000) {
                rates.value = cachedData.rates || {}
                baseCurrency.value = cachedData.baseCurrency || 'USD'
                lastUpdated.value = cachedData.lastUpdated
                loading.value = false
            }
        } catch (e) {
            logger.error('Error loading cached rates:', e)
        }
    }
    
    await fetchExchangeRates()
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
