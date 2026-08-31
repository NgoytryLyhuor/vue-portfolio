<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/40 to-pink-50/80 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <!-- Enhanced Header -->
            <div class="text-center mb-6 sm:mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg mb-4 sm:mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                    Currency Converter
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    Real-time exchange rates • Instant conversion
                </p>
                <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ formattedTime }}</span>
                    <button @click="fetchExchangeRates"
                        class="ml-1 p-1.5 rounded-lg bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                        aria-label="Refresh rates"
                        title="Refresh exchange rates">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16 sm:py-20">
                <div class="relative">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div class="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <p class="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Loading exchange rates...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 text-center shadow-lg">
                <div class="text-red-500 mb-3 text-lg sm:text-xl font-bold flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Error
                </div>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">{{ error }}</p>
                <button @click="fetchExchangeRates"
                    class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                    🔄 Try Again
                </button>
            </div>

            <!-- Main Converter -->
            <div v-else class="space-y-5 sm:space-y-6">
                <!-- Enhanced Converter Card -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 animate-fade-in-up" style="animation-delay: 0ms; border-top: 4px solid transparent; border-image: linear-gradient(to right, #3b82f6, #a855f7, #ec4899) 1;">
                    <!-- From Currency -->
                    <div class="mb-4 sm:mb-5">
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            From
                        </label>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <select 
                                v-model="fromCurrency"
                                @change="convertCurrency"
                                class="w-full sm:w-32 px-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
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
                                class="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white text-xl sm:text-2xl lg:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                                @input="convertCurrency"
                            />
                        </div>
                    </div>

                    <!-- Swap Button -->
                    <div class="flex justify-center my-3 sm:my-4">
                        <button 
                            @click="swapCurrencies"
                            class="p-3 sm:p-3.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-90 hover:ring-4 hover:ring-purple-200 dark:hover:ring-purple-800"
                            aria-label="Swap currencies"
                            title="Swap currencies"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <!-- To Currency -->
                    <div class="mb-4 sm:mb-5">
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            To
                        </label>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <select 
                                v-model="toCurrency"
                                @change="convertCurrency"
                                class="w-full sm:w-32 px-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                                    {{ currency.code }}
                                </option>
                            </select>
                            <div class="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-blue-400 dark:border-blue-500 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 text-gray-900 dark:text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-md">
                                {{ formatCurrency(convertedAmount) }}
                            </div>
                        </div>
                    </div>

                    <!-- Exchange Rate - Enhanced -->
                    <div class="pt-4 sm:pt-5 border-t-2 border-gray-200 dark:border-gray-700">
                        <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-3 sm:p-4 text-center">
                            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide font-semibold">
                                Exchange Rate
                            </p>
                            <p class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                                1 {{ fromCurrency }} = <span class="text-blue-600 dark:text-blue-400">{{ exchangeRate.toFixed(4) }}</span> {{ toCurrency }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Quick Convert Buttons - Enhanced -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 100ms">
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-center font-semibold">Quick amounts</p>
                    <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
                        <button
                            v-for="quick in quickAmounts"
                            :key="quick"
                            @click="amount = quick; convertCurrency()"
                            class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all text-sm sm:text-base font-bold text-gray-900 dark:text-white shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                        >
                            {{ formatNumber(quick) }}
                        </button>
                    </div>
                </div>

                <!-- Popular Currencies - Enhanced -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 200ms">
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-center font-semibold">Select currency</p>
                    <div class="flex gap-3 sm:gap-4 justify-center">
                        <button
                            v-for="popular in popularCurrencies"
                            :key="popular.code"
                            @click="setPopularCurrency(popular.code)"
                            class="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border-2 transition-all text-sm sm:text-base font-bold shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                            :class="toCurrency === popular.code 
                                ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 text-gray-900 dark:text-white'"
                        >
                            {{ popular.code }}
                        </button>
                    </div>
                </div>

                <!-- Exchange Rate Comparison Chart -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 300ms">
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Exchange Rate Comparison
                    </h3>
                    <div class="space-y-4">
                        <div v-for="currency in currencies" :key="currency.code" class="relative">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full" :class="getCurrencyColor(currency.code)"></div>
                                    <span class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{{ currency.code }}</span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ currency.name }}</span>
                                </div>
                                <span class="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                    {{ getRateDisplay(currency.code) }}
                                </span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 overflow-hidden">
                                <div 
                                    class="h-full rounded-full transition-all duration-700 ease-in-out"
                                    :class="getCurrencyColor(currency.code)"
                                    :style="{ width: getBarWidth(currency.code) + '%' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Currency Strength Widget -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 animate-fade-in-up" style="animation-delay: 400ms">
                    <div 
                        v-for="currency in currencies" 
                        :key="currency.code"
                        class="bg-gradient-to-br rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        :class="getCurrencyGradient(currency.code)"
                    >
                        <div class="shimmer absolute inset-0 pointer-events-none"></div>
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center">
                                <span class="text-lg sm:text-xl font-bold text-white">{{ currency.code }}</span>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-white/80">Rate vs USD</p>
                                <p class="text-lg sm:text-xl font-bold text-white">{{ getRateDisplay(currency.code) }}</p>
                            </div>
                        </div>
                        <div class="pt-3 border-t border-white/20">
                            <p class="text-xs text-white/90 mb-1">{{ currency.name }}</p>
                            <div class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span class="text-xs text-white/80">Base: USD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Conversion Matrix Widget -->
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-200 dark:border-gray-700 animate-fade-in-up" style="animation-delay: 500ms">
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                        </svg>
                        Conversion Matrix
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm sm:text-base">
                            <thead>
                                <tr class="border-b-2 border-gray-200 dark:border-gray-700">
                                    <th class="text-left py-2 sm:py-3 px-2 sm:px-3 text-gray-600 dark:text-gray-400 font-semibold"></th>
                                    <th v-for="currency in currencies" :key="currency.code" class="text-center py-2 sm:py-3 px-2 sm:px-3 text-gray-900 dark:text-white font-bold">
                                        {{ currency.code }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="from in currencies" :key="from.code" class="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td class="py-2 sm:py-3 px-2 sm:px-3 font-semibold text-gray-900 dark:text-white">
                                        {{ from.code }}
                                    </td>
                                    <td v-for="to in currencies" :key="to.code" class="text-center py-2 sm:py-3 px-2 sm:px-3">
                                        <span v-if="from.code === to.code" class="text-gray-400 dark:text-gray-500 font-bold">1.0000</span>
                                        <span v-else class="text-gray-900 dark:text-white font-semibold">
                                            {{ getConversionRate(from.code, to.code).toFixed(4) }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Info Card - Enhanced -->
                <div class="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-purple-200 dark:border-purple-800 animate-fade-in-up" style="animation-delay: 600ms">
                    <div class="flex items-start gap-3 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="flex-1">
                            <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1">
                                Base Currency: <span class="text-purple-600 dark:text-purple-400">{{ baseCurrency }}</span>
                            </p>
                            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                {{ Object.keys(rates).length }} currencies available
                            </p>
                        </div>
                    </div>
                    <div class="pt-3 border-t border-purple-200 dark:border-purple-700">
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Rates are for reference only. Actual transaction rates may vary.</span>
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

// Popular currencies (only 3: Khmer, USA, China)
const popularCurrencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'KHR', name: 'Cambodian Riel' },
    { code: 'CNY', name: 'Chinese Yuan' }
]

// All available currencies (only 3)
const currencies = ref([
    { code: 'USD', name: 'US Dollar' },
    { code: 'KHR', name: 'Cambodian Riel' },
    { code: 'CNY', name: 'Chinese Yuan' }
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

const getRateDisplay = (code) => {
    if (!rates.value[code] || !rates.value['USD']) return '0.0000'
    const rate = rates.value[code] / rates.value['USD']
    return rate.toFixed(4)
}

const getBarWidth = (code) => {
    if (!rates.value[code] || !rates.value['USD']) return 0
    const currentRate = rates.value[code] / rates.value['USD']
    
    // Normalize to show relative strength
    if (code === 'USD') return 100
    
    // Calculate max rate for normalization
    const allRates = currencies.value.map(c => {
        if (!rates.value[c.code] || !rates.value['USD']) return 0
        return rates.value[c.code] / rates.value['USD']
    })
    const maxRate = Math.max(...allRates)
    
    if (maxRate === 0) return 0
    return (currentRate / maxRate) * 100
}

const getCurrencyColor = (code) => {
    const colors = {
        'USD': 'bg-gradient-to-r from-blue-500 to-blue-600',
        'KHR': 'bg-gradient-to-r from-red-500 to-red-600',
        'CNY': 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    }
    return colors[code] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

const getCurrencyGradient = (code) => {
    const gradients = {
        'USD': 'from-blue-500 to-blue-600',
        'KHR': 'from-red-500 to-red-600',
        'CNY': 'from-yellow-500 to-yellow-600'
    }
    return gradients[code] || 'from-gray-500 to-gray-600'
}

const getConversionRate = (from, to) => {
    if (!rates.value[from] || !rates.value[to]) return 0
    if (from === to) return 1
    return rates.value[to] / rates.value[from]
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

/* Staggered entrance animation */
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Shimmer effect for gradient cards */
.shimmer {
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.15) 50%,
        transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
