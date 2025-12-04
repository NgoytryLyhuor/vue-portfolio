<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
        <div class="max-w-6xl mx-auto mt-16">
            <!-- Header -->
            <div class="text-center mb-10">
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Currency Exchange
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                    Real-time exchange rates for 150+ currencies
                </p>
            </div>

            <!-- Main Converter Card -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-700">
                <!-- Amount Input -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Amount</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">{{ getCurrencySymbol(fromCurrency) }}</span>
                        <input 
                            v-model.number="amount" 
                            type="number" 
                            min="0"
                            step="0.01"
                            class="w-full pl-14 pr-4 py-4 text-3xl font-bold bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <!-- Currency Selectors -->
                <div class="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
                    <!-- From Currency -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">From</label>
                        <div class="relative">
                            <select 
                                v-model="fromCurrency"
                                class="w-full p-4 pl-14 text-lg font-medium bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                            >
                                <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
                                    {{ currency.code }} - {{ currency.name }}
                                </option>
                            </select>
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">{{ getCurrencyFlag(fromCurrency) }}</span>
                            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <!-- Swap Button -->
                    <button 
                        @click="swapCurrencies"
                        class="w-14 h-14 mx-auto mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </button>

                    <!-- To Currency -->
                    <div class="relative">
                        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">To</label>
                        <div class="relative">
                            <select 
                                v-model="toCurrency"
                                class="w-full p-4 pl-14 text-lg font-medium bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                            >
                                <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
                                    {{ currency.code }} - {{ currency.name }}
                                </option>
                            </select>
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">{{ getCurrencyFlag(toCurrency) }}</span>
                            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Result Display -->
                <div v-if="!loading && convertedAmount !== null" class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p class="text-emerald-100 text-sm mb-1">{{ formatNumber(amount) }} {{ fromCurrency }} =</p>
                            <p class="text-4xl md:text-5xl font-bold">{{ formatNumber(convertedAmount) }} {{ toCurrency }}</p>
                            <p class="text-emerald-100 text-sm mt-2">1 {{ fromCurrency }} = {{ exchangeRate?.toFixed(6) }} {{ toCurrency }}</p>
                        </div>
                        <button 
                            @click="copyResult"
                            class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                        >
                            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {{ copied ? 'Copied!' : 'Copy' }}
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="text-center py-8">
                    <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500 mb-3"></div>
                    <p class="text-gray-600 dark:text-gray-400">Fetching rates...</p>
                </div>

                <!-- Error State -->
                <div v-if="error" class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mt-4">
                    {{ error }}
                </div>
            </div>

            <!-- Quick Convert Buttons -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="text-xl">⚡</span> Quick Convert
                </h3>
                <div class="flex flex-wrap gap-3">
                    <button 
                        v-for="quick in quickConversions" 
                        :key="quick.from + quick.to"
                        @click="setQuickConversion(quick)"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all duration-200',
                            fromCurrency === quick.from && toCurrency === quick.to
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        ]"
                    >
                        {{ quick.label }}
                    </button>
                </div>
            </div>

            <!-- Popular Rates Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div 
                    v-for="rate in popularRates" 
                    :key="rate.pair"
                    @click="setFromRate(rate)"
                    class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">{{ rate.fromFlag }}</span>
                            <span class="text-gray-400">→</span>
                            <span class="text-2xl">{{ rate.toFlag }}</span>
                        </div>
                        <span :class="[
                            'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full',
                            rate.trend > 0 ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' :
                            rate.trend < 0 ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        ]">
                            {{ rate.trend > 0 ? '↑' : rate.trend < 0 ? '↓' : '→' }}
                            {{ Math.abs(rate.trend).toFixed(2) }}%
                        </span>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ rate.pair }}</div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ rate.rate }}</div>
                </div>
            </div>

            <!-- All Currencies Table -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h3 class="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="text-2xl">🌍</span> All Exchange Rates
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">(Base: {{ baseCurrency }})</span>
                    </h3>
                    <div class="relative w-full sm:w-64">
                        <input 
                            v-model="searchCurrency"
                            type="text"
                            placeholder="Search currency..."
                            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        />
                        <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Base Currency Selector -->
                <div class="flex flex-wrap gap-2 mb-6">
                    <button 
                        v-for="base in ['USD', 'EUR', 'GBP', 'JPY', 'KHR']" 
                        :key="base"
                        @click="changeBaseCurrency(base)"
                        :class="[
                            'px-4 py-2 rounded-xl font-medium transition-all',
                            baseCurrency === base
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        ]"
                    >
                        {{ base }}
                    </button>
                </div>

                <!-- Rates Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <th class="pb-3 font-medium">Currency</th>
                                <th class="pb-3 font-medium">Code</th>
                                <th class="pb-3 font-medium text-right">Rate (1 {{ baseCurrency }})</th>
                                <th class="pb-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="currency in filteredCurrencies" 
                                :key="currency.code"
                                class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <td class="py-4">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl">{{ currency.flag }}</span>
                                        <span class="font-medium text-gray-900 dark:text-white">{{ currency.name }}</span>
                                    </div>
                                </td>
                                <td class="py-4 text-gray-600 dark:text-gray-400 font-mono">{{ currency.code }}</td>
                                <td class="py-4 text-right font-bold text-gray-900 dark:text-white">
                                    {{ formatRate(currency.rate) }}
                                </td>
                                <td class="py-4 text-right">
                                    <button 
                                        @click="convertToCurrency(currency.code)"
                                        class="px-3 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors"
                                    >
                                        Convert
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Show More -->
                <div v-if="filteredCurrencies.length > 20" class="text-center mt-4">
                    <button 
                        @click="showAllCurrencies = !showAllCurrencies"
                        class="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                    >
                        {{ showAllCurrencies ? 'Show Less' : `Show All (${allCurrencies.length})` }}
                    </button>
                </div>
            </div>

            <!-- Last Updated -->
            <div class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>Rates updated: {{ lastUpdated }}</p>
                <p class="mt-1">Data provided by ExchangeRate-API</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CurrencyExchange',
    data() {
        return {
            amount: 100,
            fromCurrency: 'USD',
            toCurrency: 'KHR',
            baseCurrency: 'USD',
            rates: {},
            loading: false,
            error: null,
            copied: false,
            searchCurrency: '',
            showAllCurrencies: false,
            lastUpdated: null,
            apiKey: '3f2821bad5ae9cf57118f68f',
            
            popularCurrencies: [
                { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
                { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
                { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
                { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
                { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭', symbol: '៛' },
                { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
                { code: 'THB', name: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
                { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳', symbol: '₫' },
                { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
                { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
                { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
                { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
                { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', symbol: 'Fr' },
                { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
                { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
                { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
                { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
                { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
                { code: 'TWD', name: 'Taiwan Dollar', flag: '🇹🇼', symbol: 'NT$' },
                { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
                { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
                { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
                { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
                { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
                { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽', symbol: '$' },
            ],

            quickConversions: [
                { from: 'USD', to: 'KHR', label: 'USD → KHR' },
                { from: 'USD', to: 'EUR', label: 'USD → EUR' },
                { from: 'EUR', to: 'USD', label: 'EUR → USD' },
                { from: 'USD', to: 'CNY', label: 'USD → CNY' },
                { from: 'USD', to: 'THB', label: 'USD → THB' },
                { from: 'GBP', to: 'USD', label: 'GBP → USD' },
                { from: 'USD', to: 'JPY', label: 'USD → JPY' },
                { from: 'CNY', to: 'KHR', label: 'CNY → KHR' },
            ]
        }
    },
    computed: {
        exchangeRate() {
            if (!this.rates[this.fromCurrency] || !this.rates[this.toCurrency]) return null
            if (this.baseCurrency === this.fromCurrency) {
                return this.rates[this.toCurrency]
            }
            return this.rates[this.toCurrency] / this.rates[this.fromCurrency]
        },
        convertedAmount() {
            if (!this.exchangeRate || !this.amount) return null
            return this.amount * this.exchangeRate
        },
        popularRates() {
            const pairs = [
                { from: 'USD', to: 'KHR', trend: 0.15 },
                { from: 'USD', to: 'EUR', trend: -0.23 },
                { from: 'USD', to: 'CNY', trend: 0.08 },
                { from: 'EUR', to: 'GBP', trend: 0.12 },
                { from: 'USD', to: 'THB', trend: -0.45 },
                { from: 'USD', to: 'JPY', trend: 0.67 },
            ]
            
            return pairs.map(pair => {
                const fromCurrency = this.popularCurrencies.find(c => c.code === pair.from)
                const toCurrency = this.popularCurrencies.find(c => c.code === pair.to)
                let rate = 0
                
                if (this.rates[pair.from] && this.rates[pair.to]) {
                    rate = this.rates[pair.to] / this.rates[pair.from]
                }
                
                return {
                    pair: `${pair.from} / ${pair.to}`,
                    from: pair.from,
                    to: pair.to,
                    fromFlag: fromCurrency?.flag || '🏳️',
                    toFlag: toCurrency?.flag || '🏳️',
                    rate: this.formatRate(rate),
                    trend: pair.trend
                }
            })
        },
        allCurrencies() {
            return this.popularCurrencies.map(currency => ({
                ...currency,
                rate: this.rates[currency.code] || 0
            }))
        },
        filteredCurrencies() {
            let currencies = this.allCurrencies.filter(c => c.code !== this.baseCurrency)
            
            if (this.searchCurrency) {
                const search = this.searchCurrency.toLowerCase()
                currencies = currencies.filter(c => 
                    c.code.toLowerCase().includes(search) ||
                    c.name.toLowerCase().includes(search)
                )
            }
            
            if (!this.showAllCurrencies && currencies.length > 10) {
                return currencies.slice(0, 10)
            }
            
            return currencies
        }
    },
    mounted() {
        this.fetchRates()
    },
    watch: {
        baseCurrency() {
            this.fetchRates()
        }
    },
    methods: {
        async fetchRates() {
            this.loading = true
            this.error = null
            
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${this.baseCurrency}`)
                const data = await response.json()
                
                if (data.result === 'error') {
                    throw new Error(data['error-type'])
                }
                
                this.rates = data.conversion_rates
                this.lastUpdated = new Date().toLocaleString()
            } catch (err) {
                console.error('Error fetching rates:', err)
                this.error = 'Failed to fetch exchange rates. Please try again.'
            } finally {
                this.loading = false
            }
        },
        swapCurrencies() {
            const temp = this.fromCurrency
            this.fromCurrency = this.toCurrency
            this.toCurrency = temp
        },
        setQuickConversion(quick) {
            this.fromCurrency = quick.from
            this.toCurrency = quick.to
        },
        setFromRate(rate) {
            this.fromCurrency = rate.from
            this.toCurrency = rate.to
        },
        changeBaseCurrency(code) {
            this.baseCurrency = code
        },
        convertToCurrency(code) {
            this.toCurrency = code
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        copyResult() {
            const text = `${this.formatNumber(this.amount)} ${this.fromCurrency} = ${this.formatNumber(this.convertedAmount)} ${this.toCurrency}`
            navigator.clipboard.writeText(text)
            this.copied = true
            setTimeout(() => this.copied = false, 2000)
        },
        getCurrencySymbol(code) {
            const currency = this.popularCurrencies.find(c => c.code === code)
            return currency?.symbol || code
        },
        getCurrencyFlag(code) {
            const currency = this.popularCurrencies.find(c => c.code === code)
            return currency?.flag || '🏳️'
        },
        formatNumber(num) {
            if (num === null || num === undefined) return '0'
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num)
        },
        formatRate(rate) {
            if (!rate) return '0.00'
            if (rate >= 1000) {
                return new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(rate)
            }
            if (rate >= 1) {
                return new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                }).format(rate)
            }
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6
            }).format(rate)
        }
    }
}
</script>

<style scoped>
/* Hide number input spinners */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 3px;
}

/* Animation */
@keyframes spin {
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
