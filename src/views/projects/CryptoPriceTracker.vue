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
                        Advanced Crypto Price Tracker
                    </h1>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Real-time prices, charts, predictions & technical analysis
                </p>
            </div>

            <!-- Stats Overview Cards -->
            <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div class="text-sm opacity-90 mb-1">Total Market Cap</div>
                    <div class="text-xl font-bold">{{ formatCurrency(totalMarketCap) }}</div>
                </div>
                <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div class="text-sm opacity-90 mb-1">24h Volume</div>
                    <div class="text-xl font-bold">{{ formatCurrency(totalVolume) }}</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div class="text-sm opacity-90 mb-1">Active Cryptos</div>
                    <div class="text-xl font-bold">{{ filteredCryptos.length }}</div>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
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
                        class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer transform hover:scale-[1.02]"
                        @click="selectCrypto(crypto)"
                    >
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <!-- Left Section: Logo, Name, Symbol -->
                            <div class="flex items-center gap-4 flex-1">
                                <img 
                                    :src="crypto.image" 
                                    :alt="crypto.name"
                                    class="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
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

        <!-- Advanced Crypto Detail Modal -->
        <div 
            v-if="selectedCrypto" 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            @click="selectedCrypto = null"
        >
            <div 
                class="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
                @click.stop
            >
                <div class="p-6">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-4">
                            <img 
                                :src="selectedCrypto.image" 
                                :alt="selectedCrypto.name"
                                class="w-16 h-16 rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
                            />
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                    {{ selectedCrypto.name }}
                                </h2>
                                <p class="text-gray-600 dark:text-gray-400 uppercase">{{ selectedCrypto.symbol }}</p>
                                <p v-if="selectedCrypto.market_cap_rank" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Rank #{{ selectedCrypto.market_cap_rank }}
                                </p>
                            </div>
                        </div>
                        <button 
                            @click="selectedCrypto = null"
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Price Section -->
                    <div class="mb-6">
                        <div class="flex items-baseline gap-4 mb-2">
                            <div class="text-4xl font-bold text-gray-900 dark:text-white">
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
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ new Date().toLocaleString() }}
                        </div>
                    </div>

                    <!-- Chart Section -->
                    <div v-if="chartLoading" class="mb-6 flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div class="text-center">
                            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p class="text-gray-600 dark:text-gray-400">Loading chart data...</p>
                        </div>
                    </div>
                    <div v-else-if="chartData" class="mb-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Price Chart</h3>
                            <div class="flex gap-2">
                                <button
                                    v-for="period in chartPeriods"
                                    :key="period.value"
                                    @click="selectedChartPeriod = period.value; fetchChartData()"
                                    :class="[
                                        'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                                        selectedChartPeriod === period.value
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                    ]"
                                >
                                    {{ period.label }}
                                </button>
                            </div>
                        </div>
                        <div class="h-64 sm:h-80">
                            <canvas ref="chartCanvas"></canvas>
                        </div>
                    </div>

                    <!-- Price Prediction Section -->
                    <div v-if="pricePrediction" class="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Price Prediction
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <div class="text-sm opacity-90 mb-1">7-Day Forecast</div>
                                <div class="text-2xl font-bold">{{ formatCurrency(pricePrediction.forecast7d) }}</div>
                                <div class="text-xs mt-1 opacity-80">
                                    {{ pricePrediction.change7d >= 0 ? '+' : '' }}{{ pricePrediction.change7d.toFixed(2) }}%
                                </div>
                            </div>
                            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <div class="text-sm opacity-90 mb-1">30-Day Forecast</div>
                                <div class="text-2xl font-bold">{{ formatCurrency(pricePrediction.forecast30d) }}</div>
                                <div class="text-xs mt-1 opacity-80">
                                    {{ pricePrediction.change30d >= 0 ? '+' : '' }}{{ pricePrediction.change30d.toFixed(2) }}%
                                </div>
                            </div>
                            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <div class="text-sm opacity-90 mb-1">Trend</div>
                                <div class="text-2xl font-bold">{{ pricePrediction.trend }}</div>
                                <div class="text-xs mt-1 opacity-80">
                                    Confidence: {{ pricePrediction.confidence }}%
                                </div>
                            </div>
                        </div>
                        <p class="text-xs mt-4 opacity-80 italic">
                            * Predictions are based on historical trends and technical analysis. Not financial advice.
                        </p>
                    </div>

                    <!-- Technical Indicators -->
                    <div v-if="technicalIndicators" class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technical Indicators</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">RSI (14)</div>
                                <div class="text-lg font-bold" :class="getRSIColor(technicalIndicators.rsi)">
                                    {{ technicalIndicators.rsi.toFixed(2) }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ getRSISignal(technicalIndicators.rsi) }}</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">MA (7)</div>
                                <div class="text-lg font-bold text-gray-900 dark:text-white">
                                    {{ formatCurrency(technicalIndicators.ma7) }}
                                </div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">MA (30)</div>
                                <div class="text-lg font-bold text-gray-900 dark:text-white">
                                    {{ formatCurrency(technicalIndicators.ma30) }}
                                </div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Volatility</div>
                                <div class="text-lg font-bold text-gray-900 dark:text-white">
                                    {{ technicalIndicators.volatility.toFixed(2) }}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(selectedCrypto.market_cap) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Volume</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(selectedCrypto.total_volume) }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Volume/Market Cap</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">
                                {{ ((selectedCrypto.total_volume / selectedCrypto.market_cap) * 100).toFixed(2) }}%
                            </div>
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
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Price Range</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">
                                {{ formatCurrency(selectedCrypto.low_24h) }} - {{ formatCurrency(selectedCrypto.high_24h) }}
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Circulating Supply</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatNumber(selectedCrypto.circulating_supply) }} {{ selectedCrypto.symbol.toUpperCase() }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Supply</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ formatNumber(selectedCrypto.total_supply) }} {{ selectedCrypto.symbol.toUpperCase() }}</div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Fully Diluted Valuation</div>
                            <div class="text-lg font-bold text-gray-900 dark:text-white">
                                {{ formatCurrency(selectedCrypto.total_supply * selectedCrypto.current_price) }}
                            </div>
                        </div>
                    </div>

                    <!-- Additional Price Changes -->
                    <div v-if="selectedCrypto.price_change_percentage_7d !== undefined || selectedCrypto.price_change_percentage_30d !== undefined" class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Changes</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">24h</div>
                                <div 
                                    class="text-lg font-bold"
                                    :class="selectedCrypto.price_change_percentage_24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                                >
                                    {{ selectedCrypto.price_change_percentage_24h >= 0 ? '+' : '' }}{{ selectedCrypto.price_change_percentage_24h.toFixed(2) }}%
                                </div>
                            </div>
                            <div v-if="selectedCrypto.price_change_percentage_7d !== undefined" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">7d</div>
                                <div 
                                    class="text-lg font-bold"
                                    :class="selectedCrypto.price_change_percentage_7d >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                                >
                                    {{ selectedCrypto.price_change_percentage_7d >= 0 ? '+' : '' }}{{ selectedCrypto.price_change_percentage_7d.toFixed(2) }}%
                                </div>
                            </div>
                            <div v-if="selectedCrypto.price_change_percentage_30d !== undefined" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">30d</div>
                                <div 
                                    class="text-lg font-bold"
                                    :class="selectedCrypto.price_change_percentage_30d >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                                >
                                    {{ selectedCrypto.price_change_percentage_30d >= 0 ? '+' : '' }}{{ selectedCrypto.price_change_percentage_30d.toFixed(2) }}%
                                </div>
                            </div>
                            <div v-if="selectedCrypto.price_change_percentage_1y !== undefined" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">1y</div>
                                <div 
                                    class="text-lg font-bold"
                                    :class="selectedCrypto.price_change_percentage_1y >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                                >
                                    {{ selectedCrypto.price_change_percentage_1y >= 0 ? '+' : '' }}{{ selectedCrypto.price_change_percentage_1y.toFixed(2) }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Advanced Crypto Price Tracker - Real-time prices, charts, predictions & technical analysis
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import logger from '@/utils/logger'

Chart.register(...registerables)

// Reactive state
const cryptos = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const sortBy = ref('market_cap_desc')
const selectedCrypto = ref(null)
const currentPage = ref(1)
const itemsPerPage = 20
const refreshInterval = ref(null)

// Chart state
const chartCanvas = ref(null)
const chartInstance = ref(null)
const chartData = ref(null)
const chartLoading = ref(false)
const selectedChartPeriod = ref('7')
const chartPeriods = [
    { value: '1', label: '24H' },
    { value: '7', label: '7D' },
    { value: '30', label: '30D' },
    { value: '90', label: '90D' },
    { value: '365', label: '1Y' }
]

// Prediction and indicators
const pricePrediction = ref(null)
const technicalIndicators = ref(null)

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
        // Using CoinGecko API with extended price change percentages
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y')
        
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

const fetchChartData = async () => {
    if (!selectedCrypto.value) return
    
    chartLoading.value = true
    
    try {
        const days = selectedChartPeriod.value
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCrypto.value.id}/market_chart?vs_currency=usd&days=${days}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        chartData.value = data
        
        // Calculate predictions and indicators
        calculatePredictions(data.prices)
        calculateTechnicalIndicators(data.prices)
        
        // Render chart
        await nextTick()
        renderChart(data.prices)
    } catch (err) {
        logger.error('Error fetching chart data:', err)
    } finally {
        chartLoading.value = false
    }
}

const renderChart = (prices) => {
    if (!chartCanvas.value) return
    
    // Destroy existing chart
    if (chartInstance.value) {
        chartInstance.value.destroy()
    }
    
    const labels = prices.map((_, index) => {
        const date = new Date(prices[index][0])
        if (selectedChartPeriod.value === '1') {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        } else if (selectedChartPeriod.value === '7' || selectedChartPeriod.value === '30') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
        }
    })
    
    const priceValues = prices.map(p => p[1])
    const isPositive = priceValues[priceValues.length - 1] >= priceValues[0]
    
    const ctx = chartCanvas.value.getContext('2d')
    chartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price (USD)',
                data: priceValues,
                borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                backgroundColor: isPositive 
                    ? 'rgba(34, 197, 94, 0.1)' 
                    : 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 6
                            })
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 8,
                        color: document.documentElement.classList.contains('dark')
                            ? 'rgba(255, 255, 255, 0.5)' 
                            : 'rgba(0, 0, 0, 0.5)'
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: document.documentElement.classList.contains('dark')
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        },
                        color: document.documentElement.classList.contains('dark')
                            ? 'rgba(255, 255, 255, 0.5)' 
                            : 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    })
}

const calculatePredictions = (prices) => {
    if (!prices || prices.length < 2) return
    
    const priceValues = prices.map(p => p[1])
    const currentPrice = priceValues[priceValues.length - 1]
    
    // Calculate moving averages
    const ma7 = calculateMA(priceValues, 7)
    const ma30 = calculateMA(priceValues, Math.min(30, priceValues.length))
    
    // Calculate trend
    const recentTrend = (priceValues[priceValues.length - 1] - priceValues[Math.max(0, priceValues.length - 7)]) / priceValues[Math.max(0, priceValues.length - 7)]
    const avgTrend = (priceValues[priceValues.length - 1] - priceValues[0]) / priceValues[0]
    
    // Simple linear regression for prediction
    const n = priceValues.length
    const sumX = (n * (n + 1)) / 2
    const sumY = priceValues.reduce((a, b) => a + b, 0)
    const sumXY = priceValues.reduce((sum, y, i) => sum + (i + 1) * y, 0)
    const sumXX = (n * (n + 1) * (2 * n + 1)) / 6
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    
    // Predictions
    const forecast7d = currentPrice + (slope * 7)
    const forecast30d = currentPrice + (slope * 30)
    
    const change7d = ((forecast7d - currentPrice) / currentPrice) * 100
    const change30d = ((forecast30d - currentPrice) / currentPrice) * 100
    
    // Determine trend
    let trend = 'Neutral'
    if (slope > 0 && recentTrend > 0.05) trend = 'Bullish'
    else if (slope < 0 && recentTrend < -0.05) trend = 'Bearish'
    
    // Calculate confidence based on volatility
    const volatility = calculateVolatility(priceValues)
    const confidence = Math.max(50, Math.min(95, 100 - volatility * 2))
    
    pricePrediction.value = {
        forecast7d: Math.max(0, forecast7d),
        forecast30d: Math.max(0, forecast30d),
        change7d,
        change30d,
        trend,
        confidence: Math.round(confidence)
    }
}

const calculateTechnicalIndicators = (prices) => {
    if (!prices || prices.length < 2) return
    
    const priceValues = prices.map(p => p[1])
    
    // Calculate RSI
    const rsi = calculateRSI(priceValues, 14)
    
    // Calculate Moving Averages
    const ma7 = calculateMA(priceValues, 7)
    const ma30 = calculateMA(priceValues, Math.min(30, priceValues.length))
    
    // Calculate Volatility
    const volatility = calculateVolatility(priceValues)
    
    technicalIndicators.value = {
        rsi: rsi || 50,
        ma7: ma7 || priceValues[priceValues.length - 1],
        ma30: ma30 || priceValues[priceValues.length - 1],
        volatility: volatility || 0
    }
}

const calculateRSI = (prices, period = 14) => {
    if (prices.length < period + 1) return null
    
    const gains = []
    const losses = []
    
    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1]
        if (change > 0) {
            gains.push(change)
            losses.push(0)
        } else {
            gains.push(0)
            losses.push(Math.abs(change))
        }
    }
    
    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period
    
    if (avgLoss === 0) return 100
    
    const rs = avgGain / avgLoss
    return 100 - (100 / (1 + rs))
}

const calculateMA = (prices, period) => {
    if (prices.length < period) return null
    const slice = prices.slice(-period)
    return slice.reduce((a, b) => a + b, 0) / slice.length
}

const calculateVolatility = (prices) => {
    if (prices.length < 2) return 0
    
    const returns = []
    for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
    }
    
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length
    const stdDev = Math.sqrt(variance)
    
    return stdDev * 100 // Convert to percentage
}

const getRSIColor = (rsi) => {
    if (rsi >= 70) return 'text-red-600 dark:text-red-400'
    if (rsi <= 30) return 'text-green-600 dark:text-green-400'
    return 'text-gray-900 dark:text-white'
}

const getRSISignal = (rsi) => {
    if (rsi >= 70) return 'Overbought'
    if (rsi <= 30) return 'Oversold'
    return 'Neutral'
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

const selectCrypto = async (crypto) => {
    selectedCrypto.value = crypto
    chartData.value = null
    pricePrediction.value = null
    technicalIndicators.value = null
    
    // Destroy existing chart
    if (chartInstance.value) {
        chartInstance.value.destroy()
        chartInstance.value = null
    }
    
    // Fetch chart data
    await fetchChartData()
}

// Watch for search/sort changes to reset pagination
watch([searchQuery, sortBy], () => {
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
    if (chartInstance.value) {
        chartInstance.value.destroy()
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
