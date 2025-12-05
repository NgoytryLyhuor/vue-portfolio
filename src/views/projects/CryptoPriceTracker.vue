<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-8 sm:mt-10">
                <div class="flex items-center justify-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Crypto Price Tracker
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Real-time cryptocurrency prices and market data
                </p>
            </div>

            <!-- Stats Overview Cards -->
            <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                    <div class="text-sm opacity-90 mb-1">Total Market Cap</div>
                    <div class="text-xl font-bold">{{ formatCurrency(totalMarketCap) }}</div>
                </div>
                <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
                    <div class="text-sm opacity-90 mb-1">24h Volume</div>
                    <div class="text-xl font-bold">{{ formatCurrency(totalVolume) }}</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
                    <div class="text-sm opacity-90 mb-1">Active Cryptos</div>
                    <div class="text-xl font-bold">{{ filteredCryptos.length }}</div>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
                    <div class="text-sm opacity-90 mb-1">BTC Dominance</div>
                    <div class="text-xl font-bold">{{ btcDominance }}%</div>
                </div>
            </div>

            <!-- Search and Filter Bar -->
            <div v-if="!loading && !error" class="mb-6 space-y-4">
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Search Input -->
                    <div class="flex-1 relative">
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Search cryptocurrencies (e.g., Bitcoin, BTC, Ethereum)..."
                            class="w-full px-4 py-3 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            aria-label="Search cryptocurrencies"
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

                    <!-- Sort Dropdown -->
                    <div class="relative">
                        <select 
                            v-model="sortBy" 
                            class="px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            aria-label="Sort cryptocurrencies"
                        >
                            <option value="market_cap_desc">Market Cap (High to Low)</option>
                            <option value="market_cap_asc">Market Cap (Low to High)</option>
                            <option value="price_desc">Price (High to Low)</option>
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="change_24h_desc">24h Change (High to Low)</option>
                            <option value="change_24h_asc">24h Change (Low to High)</option>
                            <option value="volume_desc">Volume (High to Low)</option>
                            <option value="name_asc">Name (A-Z)</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <!-- Refresh Button -->
                    <button 
                        @click="fetchCryptoData" 
                        :disabled="loading"
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        aria-label="Refresh prices"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span class="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                <!-- Price Range Filter -->
                <div class="flex flex-wrap items-center gap-4 text-sm">
                    <span class="text-gray-600 dark:text-gray-400 font-medium">Price Range:</span>
                    <button 
                        v-for="range in priceRanges" 
                        :key="range.value"
                        @click="selectedPriceRange = range.value"
                        :class="[
                            'px-4 py-2 rounded-lg transition-colors',
                            selectedPriceRange === range.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        ]"
                    >
                        {{ range.label }}
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16 sm:py-20">
                <div class="relative">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="mt-4 sm:mt-6 text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Loading cryptocurrency data...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center my-6 sm:my-8 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold mb-2">Error Loading Data</h2>
                <p class="opacity-90 mb-4 sm:mb-6 text-sm sm:text-base">{{ error }}</p>
                <button @click="fetchCryptoData"
                    class="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-red-500 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-sm sm:text-base">
                    Try Again
                </button>
            </div>

            <!-- Crypto List -->
            <div v-else class="space-y-4">
                <div v-if="filteredCryptos.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                    <p class="text-gray-600 dark:text-gray-400">No cryptocurrencies found matching your criteria.</p>
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div 
                        v-for="crypto in paginatedCryptos" 
                        :key="crypto.id"
                        class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                        @click="selectCrypto(crypto)"
                    >
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <!-- Left Section: Logo, Name, Symbol -->
                            <div class="flex items-center gap-4 flex-1">
                                <img 
                                    :src="crypto.image" 
                                    :alt="crypto.name"
                                    class="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                                    loading="lazy"
                                />
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                                            {{ crypto.name }}
                                        </h3>
                                        <span class="text-sm text-gray-500 dark:text-gray-400 uppercase">
                                            {{ crypto.symbol }}
                                        </span>
                                        <span v-if="crypto.market_cap_rank" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                            #{{ crypto.market_cap_rank }}
                                        </span>
                                    </div>
                                    <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span>Market Cap: {{ formatCurrency(crypto.market_cap) }}</span>
                                        <span class="hidden sm:inline">•</span>
                                        <span>Volume: {{ formatCurrency(crypto.total_volume) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Section: Price and Change -->
                            <div class="flex flex-col sm:items-end gap-2">
                                <div class="text-right">
                                    <div class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        {{ formatCurrency(crypto.current_price) }}
                                    </div>
                                    <div 
                                        class="text-sm font-medium flex items-center gap-1 justify-end"
                                        :class="crypto.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                                    >
                                        <svg v-if="crypto.price_change_percentage_24h >= 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                        </svg>
                                        {{ Math.abs(crypto.price_change_percentage_24h).toFixed(2) }}%
                                    </div>
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    24h: {{ formatCurrency(crypto.high_24h) }} / {{ formatCurrency(crypto.low_24h) }}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6">
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
        </div>

        <!-- Crypto Detail Modal -->
        <div 
            v-if="selectedCrypto" 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            @click="selectedCrypto = null"
        >
            <div 
                class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                @click.stop
            >
                <div class="p-6">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-4">
                            <img 
                                :src="selectedCrypto.image" 
                                :alt="selectedCrypto.name"
                                class="w-16 h-16 rounded-full"
                            />
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                    {{ selectedCrypto.name }}
                                </h2>
                                <p class="text-gray-600 dark:text-gray-400 uppercase">{{ selectedCrypto.symbol }}</p>
                            </div>
                        </div>
                        <button 
                            @click="selectedCrypto = null"
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Price Section -->
                    <div class="mb-6">
                        <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ formatCurrency(selectedCrypto.current_price) }}
                        </div>
                        <div 
                            class="text-lg font-medium flex items-center gap-2"
                            :class="selectedCrypto.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                        >
                            <svg v-if="selectedCrypto.price_change_percentage_24h >= 0" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                            {{ Math.abs(selectedCrypto.price_change_percentage_24h).toFixed(2) }}% (24h)
                        </div>
                    </div>

                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(selectedCrypto.market_cap) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Volume</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(selectedCrypto.total_volume) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">24h High</div>
                            <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ formatCurrency(selectedCrypto.high_24h) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Low</div>
                            <div class="text-lg font-bold text-red-600 dark:text-red-400">{{ formatCurrency(selectedCrypto.low_24h) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Circulating Supply</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatNumber(selectedCrypto.circulating_supply) }} {{ selectedCrypto.symbol.toUpperCase() }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Supply</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatNumber(selectedCrypto.total_supply) }} {{ selectedCrypto.symbol.toUpperCase() }}</div>
                        </div>
                    </div>

                    <!-- Additional Info -->
                    <div v-if="selectedCrypto.market_cap_rank" class="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Market Cap Rank:</strong> #{{ selectedCrypto.market_cap_rank }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Crypto Price Tracker - Real-time cryptocurrency prices
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import logger from '@/utils/logger'

// Reactive state
const cryptos = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const sortBy = ref('market_cap_desc')
const selectedPriceRange = ref('all')
const selectedCrypto = ref(null)
const currentPage = ref(1)
const itemsPerPage = 20
const refreshInterval = ref(null)

// Price ranges
const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under_1', label: 'Under $1' },
    { value: '1_10', label: '$1 - $10' },
    { value: '10_100', label: '$10 - $100' },
    { value: '100_1000', label: '$100 - $1,000' },
    { value: 'over_1000', label: 'Over $1,000' }
]

// Computed properties
const filteredCryptos = computed(() => {
    let filtered = [...cryptos.value]

    // Filter by search query
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(crypto => 
            crypto.name.toLowerCase().includes(query) ||
            crypto.symbol.toLowerCase().includes(query)
        )
    }

    // Filter by price range
    if (selectedPriceRange.value !== 'all') {
        const price = (crypto) => crypto.current_price || 0
        switch (selectedPriceRange.value) {
            case 'under_1':
                filtered = filtered.filter(c => price(c) < 1)
                break
            case '1_10':
                filtered = filtered.filter(c => price(c) >= 1 && price(c) < 10)
                break
            case '10_100':
                filtered = filtered.filter(c => price(c) >= 10 && price(c) < 100)
                break
            case '100_1000':
                filtered = filtered.filter(c => price(c) >= 100 && price(c) < 1000)
                break
            case 'over_1000':
                filtered = filtered.filter(c => price(c) >= 1000)
                break
        }
    }

    // Sort
    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'market_cap_desc':
                return (b.market_cap || 0) - (a.market_cap || 0)
            case 'market_cap_asc':
                return (a.market_cap || 0) - (b.market_cap || 0)
            case 'price_desc':
                return (b.current_price || 0) - (a.current_price || 0)
            case 'price_asc':
                return (a.current_price || 0) - (b.current_price || 0)
            case 'change_24h_desc':
                return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
            case 'change_24h_asc':
                return (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
            case 'volume_desc':
                return (b.total_volume || 0) - (a.total_volume || 0)
            case 'name_asc':
                return a.name.localeCompare(b.name)
            default:
                return 0
        }
    })

    return filtered
})

const paginatedCryptos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredCryptos.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredCryptos.value.length / itemsPerPage)
})

const totalMarketCap = computed(() => {
    return cryptos.value.reduce((sum, crypto) => sum + (crypto.market_cap || 0), 0)
})

const totalVolume = computed(() => {
    return cryptos.value.reduce((sum, crypto) => sum + (crypto.total_volume || 0), 0)
})

const btcDominance = computed(() => {
    const btc = cryptos.value.find(c => c.id === 'bitcoin')
    if (!btc || !totalMarketCap.value) return 0
    return ((btc.market_cap / totalMarketCap.value) * 100).toFixed(2)
})

// Methods
const fetchCryptoData = async () => {
    loading.value = true
    error.value = null
    
    try {
        // Using CoinGecko API (free, no API key needed for basic usage)
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h')
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        cryptos.value = data
        currentPage.value = 1 // Reset to first page on new data
    } catch (err) {
        logger.error('Error fetching crypto data:', err)
        error.value = err.message || 'Failed to load cryptocurrency data. Please try again later.'
    } finally {
        loading.value = false
    }
}

const formatCurrency = (value) => {
    if (!value && value !== 0) return '$0.00'
    if (value < 0.01) return `$${value.toFixed(6)}`
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(value)
}

const formatNumber = (value) => {
    if (!value && value !== 0) return '0'
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
    }).format(value)
}

const selectCrypto = (crypto) => {
    selectedCrypto.value = crypto
}

// Watch for search/sort/filter changes to reset pagination
watch([searchQuery, sortBy, selectedPriceRange], () => {
    currentPage.value = 1
})

// Lifecycle hooks
onMounted(async () => {
    await fetchCryptoData()
    
    // Auto-refresh every 60 seconds
    refreshInterval.value = setInterval(() => {
        fetchCryptoData()
    }, 60000)
})

onBeforeUnmount(() => {
    if (refreshInterval.value) {
        clearInterval(refreshInterval.value)
    }
})
</script>

<style scoped>
/* Smooth animations */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
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

