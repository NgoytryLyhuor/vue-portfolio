<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-3 sm:px-4">
        <div class="max-w-2xl mx-auto mt-2 sm:mt-4">
            <!-- Compact Header -->
            <div class="text-center mb-4 sm:mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Currency Converter
                </h1>
                <div class="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ formattedTime }}</span>
                    <button @click="fetchExchangeRates"
                        class="p-1 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all"
                        aria-label="Refresh rates">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-12">
                <div class="relative">
                    <div class="w-12 h-12 border-3 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div class="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading rates...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4 text-center">
                <div class="text-red-500 mb-2 text-sm font-bold">⚠️ Error</div>
                <p class="text-xs text-gray-700 dark:text-gray-300 mb-3">{{ error }}</p>
                <button @click="fetchExchangeRates"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    🔄 Try Again
                </button>
            </div>

            <!-- Main Converter -->
            <div v-else class="space-y-4">
                <!-- Compact Converter Card -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <!-- From Currency -->
                    <div class="mb-3">
                        <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">From</label>
                        <div class="flex gap-2">
                            <select 
                                v-model="fromCurrency"
                                @change="convertCurrency"
                                class="w-24 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                    {{ currency.code }}
                                </option>
                            </select>
                            <input 
                                v-model.number="amount" 
                                type="number" 
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                class="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                @input="convertCurrency"
                            />
                        </div>
                    </div>

                    <!-- Swap Button -->
                    <div class="flex justify-center my-2">
                        <button 
                            @click="swapCurrencies"
                            class="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
                            aria-label="Swap currencies"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <!-- To Currency -->
                    <div class="mb-3">
                        <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">To</label>
                        <div class="flex gap-2">
                            <select 
                                v-model="toCurrency"
                                @change="convertCurrency"
                                class="w-24 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                    {{ currency.code }}
                                </option>
                            </select>
                            <div class="flex-1 px-3 py-2.5 rounded-lg border-2 border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-white text-lg font-bold">
                                {{ formatCurrency(convertedAmount) }}
                            </div>
                        </div>
                    </div>

                    <!-- Exchange Rate - Compact -->
                    <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-xs text-center text-gray-600 dark:text-gray-400">
                            <span class="font-semibold">1 {{ fromCurrency }} = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}</span>
                        </p>
                    </div>
                </div>

                <!-- Quick Convert Buttons - Compact -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 text-center">Quick amounts</p>
                    <div class="flex gap-2 justify-center">
                        <button
                            v-for="quick in quickAmounts"
                            :key="quick"
                            @click="amount = quick; convertCurrency()"
                            class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-xs font-semibold text-gray-900 dark:text-white"
                        >
                            {{ formatNumber(quick) }}
                        </button>
                    </div>
                </div>

                <!-- Popular Currencies - Horizontal Scroll -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 text-center">Popular currencies</p>
                    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            v-for="popular in popularCurrencies"
                            :key="popular.code"
                            @click="setPopularCurrency(popular.code)"
                            class="px-3 py-2 rounded-lg border transition-all flex-shrink-0 text-xs font-semibold"
                            :class="toCurrency === popular.code 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white'"
                        >
                            {{ popular.code }}
                        </button>
                    </div>
                </div>

                <!-- Info Card - Compact -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-3 border border-purple-200 dark:border-purple-800">
                    <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                        <p class="font-semibold">Base: {{ baseCurrency }} • {{ Object.keys(rates).length }} currencies</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-purple-200 dark:border-purple-700">
                            ⚠️ Rates are for reference only. Actual rates may vary.
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

/* Hide scrollbar for horizontal scroll */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
