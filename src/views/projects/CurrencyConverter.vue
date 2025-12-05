<template>
    <div class="min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 xl:px-8 text-gray-800 dark:text-gray-200">
        <div class="max-w-4xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-10 mt-4 sm:mt-6 lg:mt-10">
                <div class="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 mb-3 sm:mb-4 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-center">
                    Currency Converter
                </h1>
                <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 pt-0 px-2">
                    Real-time currency exchange rates and conversion
                </p>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Last updated: {{ formattedTime }}</span>
                <button @click="fetchExchangeRates"
                    class="mt-3 sm:mt-4 p-2 sm:p-2.5 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm hover:shadow-md transition-all touch-manipulation"
                    aria-label="Refresh exchange rates">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6 text-center">
                <div class="text-red-500 mb-2 text-lg font-semibold">⚠️ Error loading exchange rates</div>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
                <button @click="fetchExchangeRates"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>

            <!-- Converter -->
            <div v-else class="space-y-6">
                <!-- Converter Card -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                    <div class="space-y-6">
                        <!-- From Currency -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                From
                            </label>
                            <div class="flex gap-3">
                                <div class="flex-1">
                                    <input 
                                        v-model.number="amount" 
                                        type="number" 
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        @input="convertCurrency"
                                    />
                                </div>
                                <select 
                                    v-model="fromCurrency"
                                    @change="convertCurrency"
                                    class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                                >
                                    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                        {{ currency.code }} - {{ currency.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Swap Button -->
                        <div class="flex justify-center">
                            <button 
                                @click="swapCurrencies"
                                class="p-3 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors shadow-sm hover:shadow-md"
                                aria-label="Swap currencies"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>

                        <!-- To Currency -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                To
                            </label>
                            <div class="flex gap-3">
                                <div class="flex-1">
                                    <input 
                                        :value="convertedAmount.toFixed(2)" 
                                        type="text" 
                                        readonly
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-lg font-semibold"
                                    />
                                </div>
                                <select 
                                    v-model="toCurrency"
                                    @change="convertCurrency"
                                    class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                                >
                                    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                        {{ currency.code }} - {{ currency.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Exchange Rate Display -->
                        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div class="text-center">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    1 {{ fromCurrency }} = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    Last updated: {{ formattedTime }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Popular Currencies -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                    <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Popular Currencies
                    </h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        <button
                            v-for="popular in popularCurrencies"
                            :key="popular.code"
                            @click="setPopularCurrency(popular.code)"
                            class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left"
                            :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': toCurrency === popular.code }"
                        >
                            <div class="font-semibold text-gray-900 dark:text-white">{{ popular.code }}</div>
                            <div class="text-xs text-gray-600 dark:text-gray-400">{{ popular.name }}</div>
                            <div v-if="rates && rates[popular.code]" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                1 {{ fromCurrency }} = {{ exchangeRateForPopular(popular.code) }}
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Currency Info -->
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                    <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        💡 Currency Information
                    </h2>
                    <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <strong>Base Currency:</strong> {{ baseCurrency }} ({{ getCurrencyName(baseCurrency) }})
                        </p>
                        <p>
                            <strong>Total Currencies:</strong> {{ Object.keys(rates).length }} currencies supported
                        </p>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-4">
                            Exchange rates are updated daily. Rates are for informational purposes only and may differ from actual transaction rates.
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
    return new Date(lastUpdated.value).toLocaleString()
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

const fetchExchangeRates = async () => {
    loading.value = true
    error.value = null

    try {
        // Use free API: exchangerate-api.com (no key needed, free tier)
        // Fallback to exchangerate.host if needed
        const apiKey = process.env.VUE_APP_CURRENCY_API_KEY || ''
        
        let apiUrl = ''
        
        if (apiKey) {
            // Use exchangerate-api.com v6 if API key is provided
            apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        } else {
            // Use free API: exchangerate-api.com v4 (no key needed)
            apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'
        }

        let response = await fetch(apiUrl)
        let data = null
        
        // If primary API fails, try fallback
        if (!response.ok) {
            logger.warn('Primary API failed, trying fallback...')
            const fallbackUrl = 'https://api.exchangerate.host/latest?base=USD'
            response = await fetch(fallbackUrl)
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}. Please try again later.`)
            }
        }
        
        data = await response.json()
        
        // Handle different API response formats
        if (data.rates) {
            // exchangerate-api.com (v4/v6) or exchangerate.host format
            rates.value = { USD: 1, ...data.rates }
            baseCurrency.value = data.base || 'USD'
        } else if (data.result === 'success' && data.conversion_rates) {
            // exchangerate-api.com v6 format with conversion_rates
            rates.value = data.conversion_rates
            baseCurrency.value = 'USD'
        } else {
            // Log the actual response for debugging
            logger.error('Unexpected API response:', data)
            throw new Error('Invalid API response format. Please try again later.')
        }

        lastUpdated.value = new Date().toISOString()
        
        // Store in localStorage for offline use
        localStorage.setItem('currencyRates', JSON.stringify({
            rates: rates.value,
            baseCurrency: baseCurrency.value,
            lastUpdated: lastUpdated.value
        }))
        
        error.value = null // Clear any previous errors

    } catch (err) {
        logger.error('Error fetching exchange rates:', err)
        
        // Try to load from localStorage as fallback
        const cached = localStorage.getItem('currencyRates')
        if (cached) {
            try {
                const cachedData = JSON.parse(cached)
                const cacheAge = new Date() - new Date(cachedData.lastUpdated)
                
                // Use cache if less than 24 hours old
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
    // Conversion happens automatically via computed properties
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
    // Try to load cached rates first
    const cached = localStorage.getItem('currencyRates')
    if (cached) {
        try {
            const cachedData = JSON.parse(cached)
            const cacheAge = new Date() - new Date(cachedData.lastUpdated)
            // Use cache if less than 1 hour old
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

