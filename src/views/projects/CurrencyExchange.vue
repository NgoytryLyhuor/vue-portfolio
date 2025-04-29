<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-100 font-sans">
        <!-- Currency Rates Section -->
        <div class="max-w-4xl mx-auto mb-12">
            <div class="text-center mb-10">
                <h1 class="text-3xl font-bold mb-6 text-center mt-10">
                    Live Currency Exchange
                </h1>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <div
                    class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-3">
                </div>
                <p class="text-gray-600 dark:text-gray-400">Loading rates...</p>
            </div>

            <!-- Error State -->
            <div v-if="error"
                class="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6 shadow-sm">
                {{ error }}
            </div>

            <!-- Rate Cards -->
            <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div v-for="rate in currencyRates" :key="rate.pair"
                    class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold text-lg">{{ rate.pair }}</span>
                        <span class="flex items-center gap-1 text-sm" :class="{
                            'text-green-500': rate.change > 0,
                            'text-red-500': rate.change < 0,
                            'text-gray-500': rate.change === 0
                        }">
                            <span>{{ rate.change > 0 ? '↑' : rate.change < 0 ? '↓' : '→' }}</span>
                                    <span>{{ Math.abs(rate.change) }}%</span>
                            </span>
                    </div>
                    <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ rate.rate }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Updated: {{ rate.updated }}
                    </div>
                </div>
            </div>

            <!-- Currency Converter -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 class="font-semibold text-lg mb-4">Currency Converter</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="relative">
                        <input v-model.number="convertAmount" type="number" min="0" step="0.01"
                            placeholder="Enter amount"
                            class="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
                    </div>
                    <div class="flex items-center gap-3">
                        <select v-model="convertFrom"
                            class="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="USD">USD ($)</option>
                            <option value="CNY">CNY (¥)</option>
                            <option value="KHR">KHR (៛)</option>
                        </select>
                        <span class="text-gray-500 dark:text-gray-400">→</span>
                        <select v-model="convertTo"
                            class="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="KHR">KHR (៛)</option>
                            <option value="USD">USD ($)</option>
                            <option value="CNY">CNY (¥)</option>
                        </select>
                    </div>
                    <div v-if="convertedResult !== null"
                        class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span class="font-semibold text-lg text-indigo-600 dark:text-indigo-400">
                            {{ convertedResult }} {{ convertTo }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CVTemplate',
    data() {
        return {
            currencyRates: [],
            loading: false,
            error: null,
            baseCurrency: 'USD',
            lastUpdated: null,
            convertAmount: 1,
            convertFrom: 'USD',
            convertTo: 'KHR',
            convertedResult: null,
            apiKey: '3f2821bad5ae9cf57118f68f',
            apiUrl: 'https://v6.exchangerate-api.com/v6/'
        }
    },
    mounted() {
        this.fetchCurrencyRates();
        this.convertCurrency();
    },
    watch: {
        convertAmount() {
            this.convertCurrency();
        },
        convertFrom() {
            this.convertCurrency();
        },
        convertTo() {
            this.convertCurrency();
        }
    },
    methods: {
        async fetchCurrencyRates() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch(`${this.apiUrl}${this.apiKey}/latest/${this.baseCurrency}`);
                const data = await response.json();
                if (data.result === 'error') throw new Error(data['error-type']);
                this.processRates(data.conversion_rates);
                this.lastUpdated = new Date().toLocaleString();
            } catch (err) {
                console.error('Error fetching rates:', err);
                this.error = 'Failed to fetch rates. Please try again.';
            } finally {
                this.loading = false;
            }
        },
        processRates(rates) {
            const usdToKhr = 4050;
            this.currencyRates = [
                {
                    pair: 'USD → KHR',
                    rate: (rates.KHR || usdToKhr).toLocaleString() + ' ៛',
                    change: 0.2,
                    updated: this.lastUpdated
                },
                {
                    pair: 'CNY → KHR',
                    rate: ((rates.KHR || usdToKhr) / (rates.CNY || 7.23)).toFixed(0).toLocaleString() + ' ៛',
                    change: -0.1,
                    updated: this.lastUpdated
                },
                {
                    pair: 'USD → CNY',
                    rate: rates.CNY ? rates.CNY.toFixed(2) + ' ¥' : '7.23 ¥',
                    change: 0.3,
                    updated: this.lastUpdated
                }
            ];
        },
        async convertCurrency() {
            if (this.convertAmount <= 0) {
                this.convertedResult = null;
                return;
            }
            this.error = null;
            try {
                const usdToKhr = 4050;
                const cnyToKhr = 560;
                if (this.convertFrom === 'USD' && this.convertTo === 'KHR') {
                    this.convertedResult = (this.convertAmount * usdToKhr).toLocaleString();
                } else if (this.convertFrom === 'CNY' && this.convertTo === 'KHR') {
                    this.convertedResult = (this.convertAmount * cnyToKhr).toLocaleString();
                } else if (this.convertFrom === 'KHR' && this.convertTo === 'USD') {
                    this.convertedResult = (this.convertAmount / usdToKhr).toFixed(4);
                } else if (this.convertFrom === 'KHR' && this.convertTo === 'CNY') {
                    this.convertedResult = (this.convertAmount / cnyToKhr).toFixed(4);
                } else {
                    const response = await fetch(
                        `${this.apiUrl}${this.apiKey}/pair/${this.convertFrom}/${this.convertTo}/${this.convertAmount}`
                    );
                    const data = await response.json();
                    if (data.result === 'error') throw new Error(data['error-type']);
                    this.convertedResult = data.conversion_result.toFixed(4);
                }
            } catch (err) {
                console.error('Conversion error:', err);
                this.error = 'Conversion failed. Please try again.';
            }
        }
    }
}
</script>

<style scoped>
/* Add smooth transitions for interactive elements */
select,
input {
    transition: all 0.2s ease-in-out;
}

/* Enhance focus states */
input:focus,
select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Custom spinner animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>