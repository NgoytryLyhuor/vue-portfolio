<template>
    <div class="min-h-screen bg-slate-50/80 dark:bg-[#030816] text-slate-900 dark:text-slate-100 pb-20 pt-20 md:pt-24 relative overflow-hidden">
        <!-- Ambient Decorative Background Glows -->
        <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
            <div class="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/3 -left-32 w-[26rem] h-[26rem] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-emerald-500/10 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Top Header & Controls -->
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                <div>
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-3">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Cambodia &amp; Global FX Intelligence</span>
                        <span class="text-indigo-400 dark:text-indigo-500">•</span>
                        <span class="font-khmer">អត្រាប្តូរប្រាក់ និងរូបិយប័ណ្ណ</span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-3">
                        <span>Currency &amp; Dual-Cash Terminal</span>
                        <span class="text-lg sm:text-xl font-normal text-slate-500 dark:text-slate-400 hidden sm:inline">|</span>
                        <span class="text-base sm:text-lg font-semibold bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 dark:from-indigo-400 dark:via-sky-300 dark:to-emerald-400 bg-clip-text text-transparent">
                            Updated {{ formattedTime }}
                        </span>
                    </h1>
                </div>

                <!-- Right Controls: KHR Rate Mode & Refresh -->
                <div class="flex flex-wrap items-center gap-2.5">
                    <!-- Cambodia KHR Rate Mode Selector -->
                    <div class="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                        <button
                            v-for="mode in khrRateModes"
                            :key="mode.id"
                            @click="khrRateMode = mode.id"
                            :class="khrRateMode === mode.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                            class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                            :title="mode.desc"
                        >
                            {{ mode.label }}
                        </button>
                    </div>

                    <!-- Refresh Button -->
                    <button
                        @click="fetchExchangeRates"
                        :disabled="loading"
                        title="Refresh live exchange rates"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-500/20 transition-all disabled:opacity-50"
                    >
                        <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span class="hidden sm:inline">Refresh Rates</span>
                    </button>
                </div>
            </div>

            <!-- Popular Currency Corridor Quick-Pairs Bar -->
            <div class="mb-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <div class="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 shrink-0 flex items-center gap-1.5">
                        <span>💱</span>
                        <span>Quick Corridors:</span>
                    </span>
                    <button
                        v-for="pair in popularCorridors"
                        :key="`${pair.from}-${pair.to}`"
                        @click="selectPair(pair.from, pair.to)"
                        :class="[
                            fromCurrency === pair.from && toCurrency === pair.to
                                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20 border-transparent'
                                : 'bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:border-indigo-400/40'
                        ]"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0"
                    >
                        <span>{{ pair.emoji }}</span>
                        <span>{{ pair.from }} → {{ pair.to }}</span>
                        <span class="text-[11px] opacity-80 font-normal">({{ pair.label }})</span>
                    </button>
                </div>
            </div>

            <!-- Loading Skeleton State -->
            <div v-if="loading && Object.keys(rates).length === 0" class="space-y-6">
                <div class="h-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 animate-pulse flex flex-col justify-between">
                    <div class="flex justify-between">
                        <div class="h-8 w-56 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div class="h-10 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                        <div class="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>
                </div>
            </div>

            <!-- Warning / Cached Rate Notice -->
            <div v-if="error" class="mb-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-4 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3 text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                    <span class="text-xl">⚠️</span>
                    <span>{{ error }}</span>
                </div>
                <button
                    @click="fetchExchangeRates"
                    class="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0 transition-colors"
                >
                    Retry
                </button>
            </div>

            <!-- Main FX Dashboard -->
            <div v-if="Object.keys(rates).length > 0" class="space-y-6">
                <!-- Hero Interactive Converter & Cambodia Dual-Currency Split Banner -->
                <div class="relative rounded-3xl overflow-hidden shadow-xl border border-white/15 bg-gradient-to-br from-indigo-700 via-sky-700 to-teal-700 dark:from-indigo-900 dark:via-slate-900 dark:to-teal-950">
                    <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_60%)]"></div>
                    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div class="relative z-10 p-6 sm:p-8 lg:p-10 text-white">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            <!-- Left 7 Columns: Main Interactive Currency Converter -->
                            <div class="lg:col-span-7 flex flex-col justify-between space-y-5">
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <div class="flex items-center gap-2">
                                        <span class="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                                            Instant FX Calculator
                                        </span>
                                        <span class="text-xs text-white/80">
                                            1 {{ fromCurrency }} = <strong>{{ formatRatePrecision(exchangeRate) }} {{ toCurrency }}</strong>
                                        </span>
                                    </div>
                                    <button
                                        @click="copyConvertedValue"
                                        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/25 hover:bg-black/35 text-xs font-semibold transition-all"
                                    >
                                        <span>{{ copied ? '✅ Copied!' : '📋 Copy Result' }}</span>
                                    </button>
                                </div>

                                <!-- From / Swap / To Converter Inputs -->
                                <div class="space-y-3">
                                    <!-- FROM Box -->
                                    <div class="rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20">
                                        <div class="flex items-center justify-between text-xs text-white/80 font-semibold mb-2">
                                            <span>You Send / Convert From</span>
                                            <span>{{ getCurrencyMeta(fromCurrency).name }} ({{ getCurrencyMeta(fromCurrency).khmer }})</span>
                                        </div>
                                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                            <select
                                                v-model="fromCurrency"
                                                @change="convertCurrency"
                                                class="sm:w-44 px-3.5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 text-white font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
                                            >
                                                <option
                                                    v-for="curr in currencies"
                                                    :key="curr.code"
                                                    :value="curr.code"
                                                    class="bg-slate-900 text-white"
                                                >
                                                    {{ curr.flag }} {{ curr.code }} — {{ curr.name }}
                                                </option>
                                            </select>

                                            <div class="relative flex-1">
                                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-white/70">
                                                    {{ getCurrencyMeta(fromCurrency).symbol }}
                                                </span>
                                                <input
                                                    v-model.number="amount"
                                                    type="number"
                                                    step="any"
                                                    min="0"
                                                    placeholder="0.00"
                                                    @input="convertCurrency"
                                                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 text-white text-2xl sm:text-3xl font-black tracking-tight focus:outline-none focus:ring-2 focus:ring-sky-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Swap Button + Inverse Rate Row -->
                                    <div class="flex items-center justify-between px-2 -my-1">
                                        <span class="text-xs text-white/80 font-medium">
                                            Inverse: 1 {{ toCurrency }} = <strong>{{ formatRatePrecision(inverseExchangeRate) }} {{ fromCurrency }}</strong>
                                        </span>
                                        <button
                                            @click="swapCurrencies"
                                            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-indigo-900 hover:bg-sky-50 font-extrabold text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
                                            title="Swap From and To currencies"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                            <span>Swap Pair</span>
                                        </button>
                                    </div>

                                    <!-- TO Box -->
                                    <div class="rounded-2xl bg-black/25 backdrop-blur-md p-4 border border-white/25">
                                        <div class="flex items-center justify-between text-xs text-white/80 font-semibold mb-2">
                                            <span>Converted Amount</span>
                                            <span>{{ getCurrencyMeta(toCurrency).name }} ({{ getCurrencyMeta(toCurrency).khmer }})</span>
                                        </div>
                                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                            <select
                                                v-model="toCurrency"
                                                @change="convertCurrency"
                                                class="sm:w-44 px-3.5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 border border-white/20 text-white font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
                                            >
                                                <option
                                                    v-for="curr in currencies"
                                                    :key="curr.code"
                                                    :value="curr.code"
                                                    class="bg-slate-900 text-white"
                                                >
                                                    {{ curr.flag }} {{ curr.code }} — {{ curr.name }}
                                                </option>
                                            </select>

                                            <div class="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/20 flex items-baseline justify-between gap-2 overflow-x-auto">
                                                <span class="text-lg font-bold text-sky-200 shrink-0">{{ getCurrencyMeta(toCurrency).symbol }}</span>
                                                <span class="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                                    {{ formatCurrencyDisplay(convertedAmount, toCurrency) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Context-Aware Quick Amount Pills -->
                                <div>
                                    <div class="text-[11px] font-bold uppercase tracking-wider text-white/75 mb-2">
                                        Quick {{ fromCurrency }} Preset Amounts:
                                    </div>
                                    <div class="flex flex-wrap gap-2">
                                        <button
                                            v-for="preset in dynamicQuickAmounts"
                                            :key="preset.value"
                                            @click="amount = preset.value; convertCurrency()"
                                            :class="amount === preset.value ? 'bg-white text-indigo-950 shadow-md' : 'bg-white/15 hover:bg-white/25 text-white border-white/15'"
                                            class="px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all"
                                        >
                                            {{ preset.label }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right 5 Columns: Cambodia Dual-Currency (USD + KHR) Cash Split Helper -->
                            <div class="lg:col-span-5 flex flex-col justify-between gap-4 bg-black/25 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15">
                                <div>
                                    <div class="flex items-center justify-between gap-2 mb-1">
                                        <span class="text-xs uppercase tracking-wider text-emerald-300 font-bold">🇰🇭 Cambodia Dual-Currency Helper</span>
                                        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-white">
                                            $1 = {{ formatInteger(effectiveKhrPerUsd) }} ៛
                                        </span>
                                    </div>
                                    <h3 class="text-base sm:text-lg font-extrabold text-white">
                                        USD Bills + Khmer Riel Change Split
                                    </h3>
                                    <p class="text-xs text-white/75 mt-1 leading-relaxed">
                                        In Cambodia, whole dollars are paid in USD and fractional cents are settled in Khmer Riel (rounded to 100 ៛).
                                    </p>
                                </div>

                                <!-- Split Breakdown Visual Boxes -->
                                <div class="space-y-3 my-1">
                                    <div class="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
                                        <div>
                                            <span class="text-[11px] uppercase tracking-wider text-white/70 font-bold block">Total Value in USD &amp; KHR</span>
                                            <div class="text-lg font-extrabold text-white mt-0.5">
                                                ${{ formatCurrencyDisplay(equivalentUsdTotal, 'USD') }} USD
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <span class="text-[11px] text-white/70 block">Full Riel Equivalent</span>
                                            <div class="text-lg font-extrabold text-amber-300">
                                                {{ formatInteger(Math.round((equivalentUsdTotal * effectiveKhrPerUsd) / 100) * 100) }} ៛
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Mixed Cash Payment Box -->
                                    <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/25 to-teal-500/20 border border-emerald-300/30">
                                        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-200 mb-2">
                                            Recommended Cash Payment Split:
                                        </div>
                                        <div class="grid grid-cols-2 gap-3">
                                            <div class="p-3 rounded-xl bg-black/25 border border-white/10">
                                                <span class="text-xs text-white/70 block">🇺🇸 USD Banknotes</span>
                                                <strong class="text-2xl font-black text-white mt-0.5 block">
                                                    ${{ formatInteger(cambodiaCashSplit.usdWhole) }}
                                                </strong>
                                                <span class="text-[11px] text-emerald-200 mt-0.5 block">
                                                    {{ cambodiaCashSplit.usdBillsHint }}
                                                </span>
                                            </div>
                                            <div class="p-3 rounded-xl bg-black/25 border border-white/10">
                                                <span class="text-xs text-white/70 block">🇰🇭 Riel Fractional Change</span>
                                                <strong class="text-2xl font-black text-amber-300 mt-0.5 block">
                                                    {{ formatInteger(cambodiaCashSplit.khrRemainder) }} ៛
                                                </strong>
                                                <span class="text-[11px] text-amber-200/90 mt-0.5 block">
                                                    For ${{ cambodiaCashSplit.centsFormatted }} cents
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Retail Rate Selector Footer -->
                                <div class="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                                    <span>Active KHR Rate: <strong>{{ activeKhrModeLabel }}</strong></span>
                                    <button
                                        @click="selectPair('USD', 'KHR')"
                                        class="underline hover:text-white font-semibold"
                                    >
                                        Set USD → KHR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 12-Column Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <!-- LEFT 8 COLUMNS: Live Multi-Currency Board, Banknote Conversion Cheat-Sheet & Cross Matrix -->
                    <div class="lg:col-span-8 space-y-6">
                        <!-- 1. Multi-Currency Live Watchlist (Simultaneous Conversion) -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-indigo-500"></span>
                                        <span>Multi-Currency Live Watchlist</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Live value of <strong>{{ getCurrencyMeta(fromCurrency).symbol }}{{ formatCurrencyDisplay(amount || 1, fromCurrency) }} {{ fromCurrency }}</strong> across regional &amp; global currencies — click any card to select
                                    </p>
                                </div>
                                <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full self-start sm:self-auto">
                                    {{ currencies.length }} Currencies
                                </span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                <button
                                    v-for="curr in currencies"
                                    :key="curr.code"
                                    @click="setPopularCurrency(curr.code)"
                                    :class="[
                                        toCurrency === curr.code
                                            ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-sm'
                                            : fromCurrency === curr.code
                                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/40'
                                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                                    ]"
                                    class="p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group"
                                >
                                    <div class="flex items-center justify-between gap-2 mb-2">
                                        <div class="flex items-center gap-2">
                                            <span class="text-2xl">{{ curr.flag }}</span>
                                            <div>
                                                <div class="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                    <span>{{ curr.code }}</span>
                                                    <span
                                                        v-if="toCurrency === curr.code"
                                                        class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-600 text-white font-bold"
                                                    >
                                                        TO
                                                    </span>
                                                    <span
                                                        v-else-if="fromCurrency === curr.code"
                                                        class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold"
                                                    >
                                                        FROM
                                                    </span>
                                                </div>
                                                <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                                                    {{ curr.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <span class="font-khmer text-[11px] text-slate-400 dark:text-slate-500">{{ curr.khmer }}</span>
                                    </div>

                                    <div class="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-baseline justify-between gap-1">
                                        <span class="text-xs font-bold text-slate-400">{{ curr.symbol }}</span>
                                        <span class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
                                            {{ formatCurrencyDisplay((amount || 1) * getConversionRate(fromCurrency, curr.code), curr.code) }}
                                        </span>
                                    </div>
                                    <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 flex justify-between">
                                        <span>1 {{ fromCurrency }} = {{ formatRatePrecision(getConversionRate(fromCurrency, curr.code)) }} {{ curr.code }}</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Bidirectional Travel & Shopping Cheat-Sheet Table -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-emerald-500"></span>
                                        <span>Quick Pocket Conversion Table ({{ fromCurrency }} ⇄ {{ toCurrency }})</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Click any row to load that amount directly into the calculator
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Forward Table: FROM -> TO -->
                                <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                                    <div class="px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                                        <span class="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                                            {{ getCurrencyMeta(fromCurrency).flag }} {{ fromCurrency }} → {{ getCurrencyMeta(toCurrency).flag }} {{ toCurrency }}
                                        </span>
                                        <span class="text-[11px] text-slate-500">Rate: {{ formatRatePrecision(exchangeRate) }}</span>
                                    </div>
                                    <div class="divide-y divide-slate-100 dark:divide-slate-800/70">
                                        <button
                                            v-for="step in referenceTableSteps"
                                            :key="`fwd-${step}`"
                                            @click="amount = step; convertCurrency()"
                                            class="w-full px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <span class="font-semibold text-slate-700 dark:text-slate-300">
                                                {{ formatInteger(step) }} {{ fromCurrency }}
                                            </span>
                                            <span class="font-extrabold text-indigo-600 dark:text-indigo-400">
                                                {{ getCurrencyMeta(toCurrency).symbol }}{{ formatCurrencyDisplay(step * exchangeRate, toCurrency) }} {{ toCurrency }}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <!-- Reverse Table: TO -> FROM -->
                                <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                                    <div class="px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                                        <span class="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                                            {{ getCurrencyMeta(toCurrency).flag }} {{ toCurrency }} → {{ getCurrencyMeta(fromCurrency).flag }} {{ fromCurrency }}
                                        </span>
                                        <span class="text-[11px] text-slate-500">Rate: {{ formatRatePrecision(inverseExchangeRate) }}</span>
                                    </div>
                                    <div class="divide-y divide-slate-100 dark:divide-slate-800/70">
                                        <button
                                            v-for="step in reverseReferenceTableSteps"
                                            :key="`rev-${step}`"
                                            @click="swapCurrencies(); amount = step; convertCurrency()"
                                            class="w-full px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <span class="font-semibold text-slate-700 dark:text-slate-300">
                                                {{ formatInteger(step) }} {{ toCurrency }}
                                            </span>
                                            <span class="font-extrabold text-emerald-600 dark:text-emerald-400">
                                                {{ getCurrencyMeta(fromCurrency).symbol }}{{ formatCurrencyDisplay(step * inverseExchangeRate, fromCurrency) }} {{ fromCurrency }}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Regional Cross-Rate Matrix -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span class="w-2 h-5 rounded-full bg-sky-500"></span>
                                        <span>ASEAN &amp; Global Cross-Rate Matrix</span>
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Click any intersecting cell to switch your active currency pair
                                    </p>
                                </div>
                            </div>

                            <div class="overflow-x-auto scrollbar-thin">
                                <table class="w-full text-xs sm:text-sm border-collapse">
                                    <thead>
                                        <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                                            <th class="py-3 px-3 text-left font-bold">1 Unit ↓ =</th>
                                            <th
                                                v-for="col in matrixCurrencies"
                                                :key="`head-${col.code}`"
                                                class="py-3 px-3 text-right font-extrabold text-slate-800 dark:text-slate-200"
                                            >
                                                {{ col.flag }} {{ col.code }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
                                        <tr
                                            v-for="row in matrixCurrencies"
                                            :key="`row-${row.code}`"
                                            class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                                        >
                                            <td class="py-3 px-3 font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                                                {{ row.flag }} 1 {{ row.code }}
                                            </td>
                                            <td
                                                v-for="col in matrixCurrencies"
                                                :key="`${row.code}-${col.code}`"
                                                @click="row.code !== col.code && selectPair(row.code, col.code)"
                                                :class="[
                                                    row.code === col.code
                                                        ? 'text-slate-400 dark:text-slate-600 bg-slate-50/50 dark:bg-slate-900/40'
                                                        : fromCurrency === row.code && toCurrency === col.code
                                                        ? 'bg-indigo-600 text-white font-extrabold rounded-lg cursor-pointer'
                                                        : 'text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer font-semibold'
                                                ]"
                                                class="py-3 px-3 text-right whitespace-nowrap transition-colors"
                                            >
                                                {{ row.code === col.code ? '1.00' : formatMatrixCell(getConversionRate(row.code, col.code)) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT 4 COLUMNS: Khmer Riel Banknotes Guide & Smart Cambodia Payment Tips -->
                    <div class="lg:col-span-4 space-y-6">
                        <!-- 1. Cambodian Riel (KHR) Banknotes Visual Reference -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                            <div class="flex items-center justify-between mb-1">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span class="w-2 h-5 rounded-full bg-amber-500"></span>
                                    <span>Khmer Riel Banknote Guide</span>
                                </h3>
                                <span class="font-khmer text-xs font-bold text-amber-600 dark:text-amber-400">ប្រាក់រៀលខ្មែរ</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                Tap any banknote to convert that Riel denomination
                            </p>

                            <div class="space-y-2.5">
                                <button
                                    v-for="note in khrBanknotes"
                                    :key="note.value"
                                    @click="selectPair('KHR', 'USD'); amount = note.value; convertCurrency()"
                                    class="w-full p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 hover:bg-indigo-50/60 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-3 text-left transition-all"
                                >
                                    <div class="flex items-center gap-3">
                                        <span
                                            :class="note.badgeColor"
                                            class="w-14 py-1.5 rounded-xl text-center text-xs font-black text-white shadow-sm shrink-0"
                                        >
                                            {{ note.shortLabel }}
                                        </span>
                                        <div>
                                            <div class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                <span>{{ formatInteger(note.value) }} ៛</span>
                                                <span class="font-khmer text-xs font-normal text-slate-500 dark:text-slate-400">({{ note.khmer }})</span>
                                            </div>
                                            <div class="text-[11px] text-slate-500 dark:text-slate-400">{{ note.motif }}</div>
                                        </div>
                                    </div>
                                    <div class="text-right shrink-0">
                                        <span class="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block">
                                            ≈ ${{ (note.value / effectiveKhrPerUsd).toFixed(2) }}
                                        </span>
                                        <span class="text-[10px] text-slate-400">USD</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Practical Currency & Payment Tips in Cambodia -->
                        <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
                            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="w-2 h-5 rounded-full bg-teal-500"></span>
                                <span>Cambodia Money &amp; KHQR Tips</span>
                            </h3>

                            <div class="space-y-3">
                                <div
                                    v-for="(tip, idx) in cambodiaPaymentTips"
                                    :key="idx"
                                    class="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3"
                                >
                                    <span class="text-xl shrink-0 mt-0.5">{{ tip.icon }}</span>
                                    <div>
                                        <h4 class="text-xs font-bold text-slate-900 dark:text-white">{{ tip.title }}</h4>
                                        <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{{ tip.desc }}</p>
                                    </div>
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
import { ref, computed, onMounted } from 'vue';
import logger from '@/utils/logger';

// State
const loading = ref(true);
const error = ref(null);
const amount = ref(100);
const fromCurrency = ref('USD');
const toCurrency = ref('KHR');
const rates = ref({});
const baseCurrency = ref('USD');
const lastUpdated = ref(null);
const khrRateMode = ref('live'); // 'live' | '4000' | '4100'
const copied = ref(false);

const khrRateModes = [
    { id: 'live', label: 'Live Market', desc: 'Real-time international mid-market KHR rate' },
    { id: '4000', label: '4,000 ៛ (Street)', desc: 'Standard Cambodian street & cafe rate (1 USD = 4,000 KHR)' },
    { id: '4100', label: '4,100 ៛ (Retail)', desc: 'Common supermarket & retail rate (1 USD = 4,100 KHR)' }
];

const popularCorridors = [
    { from: 'USD', to: 'KHR', emoji: '🇺🇸→🇰🇭', label: 'Dollar to Riel' },
    { from: 'KHR', to: 'USD', emoji: '🇰🇭→🇺🇸', label: 'Riel to Dollar' },
    { from: 'THB', to: 'KHR', emoji: '🇹🇭→🇰🇭', label: 'Baht to Riel' },
    { from: 'CNY', to: 'USD', emoji: '🇨🇳→🇺🇸', label: 'Yuan to Dollar' },
    { from: 'VND', to: 'KHR', emoji: '🇻🇳→🇰🇭', label: 'Dong to Riel' },
    { from: 'EUR', to: 'USD', emoji: '🇪🇺→🇺🇸', label: 'Euro to Dollar' },
    { from: 'SGD', to: 'USD', emoji: '🇸🇬→🇺🇸', label: 'Sing$ to Dollar' }
];

const currencies = ref([
    { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar', khmer: 'ដុល្លារអាមេរិក' },
    { code: 'KHR', symbol: '៛', flag: '🇰🇭', name: 'Cambodian Riel', khmer: 'រៀលខ្មែរ' },
    { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'Thai Baht', khmer: 'បាតថៃ' },
    { code: 'VND', symbol: '₫', flag: '🇻🇳', name: 'Vietnamese Dong', khmer: 'ដុងវៀតណាម' },
    { code: 'CNY', symbol: '¥', flag: '🇨🇳', name: 'Chinese Yuan', khmer: 'យ៉ន់ចិន' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro', khmer: 'អឺរ៉ូ' },
    { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'Singapore Dollar', khmer: 'ដុល្លារសិង្ហបុរី' },
    { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Japanese Yen', khmer: 'យ៉េនជប៉ុន' },
    { code: 'KRW', symbol: '₩', flag: '🇰🇷', name: 'South Korean Won', khmer: 'វ៉ុនកូរ៉េ' },
    { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound', khmer: 'ផោនអង់គ្លេស' },
    { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar', khmer: 'ដុល្លារអូស្ត្រាលី' },
    { code: 'MYR', symbol: 'RM', flag: '🇲🇾', name: 'Malaysian Ringgit', khmer: 'រីងហ្គីតម៉ាឡេស៊ី' }
]);

const khrBanknotes = [
    { value: 100, shortLabel: '100 ៛', khmer: 'មួយរយរៀល', motif: 'Independence Monument & Preah Vihear', badgeColor: 'bg-orange-500' },
    { value: 500, shortLabel: '500 ៛', khmer: 'ប្រាំរយរៀល', motif: 'Kizuna & Tsubasa Mekong Bridges', badgeColor: 'bg-rose-500' },
    { value: 1000, shortLabel: '1K ៛', khmer: 'មួយពាន់រៀល', motif: 'Royal Palace Throne Hall & Kinnari', badgeColor: 'bg-sky-600' },
    { value: 2000, shortLabel: '2K ៛', khmer: 'ពីរពាន់រៀល', motif: 'Prasat Preah Vihear & Angkor Lion', badgeColor: 'bg-emerald-600' },
    { value: 5000, shortLabel: '5K ៛', khmer: 'ប្រាំពាន់រៀល', motif: 'Kampong Kdei Ancient Bridge', badgeColor: 'bg-purple-600' },
    { value: 10000, shortLabel: '10K ៛', khmer: 'មួយម៉ឺនរៀល', motif: 'Neak Pean Island Temple', badgeColor: 'bg-blue-600' },
    { value: 20000, shortLabel: '20K ៛', khmer: 'ពីរម៉ឺនរៀល', motif: 'Banteay Srei Temple Sanctuary', badgeColor: 'bg-pink-600' },
    { value: 50000, shortLabel: '50K ៛', khmer: 'ប្រាំម៉ឺនរៀល', motif: 'Bakong Temple & Baby Elephant', badgeColor: 'bg-amber-600' },
    { value: 100000, shortLabel: '100K ៛', khmer: 'មួយសែនរៀល', motif: 'Royal Family & Bayon Relief', badgeColor: 'bg-teal-700' }
];

const cambodiaPaymentTips = [
    {
        icon: '💵',
        title: 'Keep USD Banknotes Crisp & Untorn',
        desc: 'Merchants and banks in Cambodia frequently reject USD bills with even small tears, ink stamps, or heavy creases.'
    },
    {
        icon: '📱',
        title: 'NBC Bakong & KHQR Everywhere',
        desc: 'Almost every shop, tuk-tuk, and market stall accepts Bakong KHQR scans in both KHR and USD seamlessly.'
    },
    {
        icon: '🪙',
        title: 'No USD Coins Used in Circulation',
        desc: 'US coins are not used in Cambodia. Any change under $1.00 is always given in Khmer Riel notes (e.g., $0.50 = 2,000 ៛).'
    }
];

const getCurrencyMeta = (code) => {
    return (
        currencies.value.find(c => c.code === code) || {
            code,
            symbol: '',
            flag: '🌐',
            name: code,
            khmer: ''
        }
    );
};

// Effective rate map respecting the user's KHR rate mode override
const effectiveRates = computed(() => {
    const base = { ...rates.value };
    if (!base.USD) base.USD = 1;
    if (khrRateMode.value === '4000') {
        base.KHR = 4000;
    } else if (khrRateMode.value === '4100') {
        base.KHR = 4100;
    }
    return base;
});

const effectiveKhrPerUsd = computed(() => {
    return effectiveRates.value.KHR || 4050;
});

const activeKhrModeLabel = computed(() => {
    if (khrRateMode.value === '4000') return 'Street Standard (4,000 ៛/$1)';
    if (khrRateMode.value === '4100') return 'Retail Rate (4,100 ៛/$1)';
    return `Live Mid-Market (${Math.round(effectiveKhrPerUsd.value).toLocaleString()} ៛/$1)`;
});

const getConversionRate = (from, to) => {
    const r = effectiveRates.value;
    if (!r[from] || !r[to]) return 0;
    if (from === to) return 1;
    return r[to] / r[from];
};

const exchangeRate = computed(() => {
    return getConversionRate(fromCurrency.value, toCurrency.value);
});

const inverseExchangeRate = computed(() => {
    return getConversionRate(toCurrency.value, fromCurrency.value);
});

const convertedAmount = computed(() => {
    if (!amount.value || amount.value <= 0) return 0;
    return amount.value * exchangeRate.value;
});

const equivalentUsdTotal = computed(() => {
    if (!amount.value || amount.value <= 0) return 0;
    return amount.value * getConversionRate(fromCurrency.value, 'USD');
});

const cambodiaCashSplit = computed(() => {
    const totalUsd = equivalentUsdTotal.value;
    const usdWhole = Math.floor(totalUsd + 1e-6);
    const fractionalUsd = Math.max(0, totalUsd - usdWhole);
    const rawKhr = fractionalUsd * effectiveKhrPerUsd.value;
    const khrRemainder = Math.round(rawKhr / 100) * 100;

    let remaining = usdWhole;
    const bills = [100, 50, 20, 10, 5, 1];
    const parts = [];
    for (const bill of bills) {
        if (remaining >= bill) {
            const count = Math.floor(remaining / bill);
            remaining %= bill;
            parts.push(`${count}×$${bill}`);
        }
    }

    return {
        usdWhole,
        khrRemainder,
        centsFormatted: fractionalUsd.toFixed(2).slice(2),
        usdBillsHint: parts.length ? parts.slice(0, 3).join(' + ') : 'Pay in Riel notes'
    };
});

const dynamicQuickAmounts = computed(() => {
    if (fromCurrency.value === 'KHR' || fromCurrency.value === 'VND') {
        return [
            { value: 4000, label: '4,000' },
            { value: 10000, label: '10K' },
            { value: 20000, label: '20K' },
            { value: 50000, label: '50K' },
            { value: 100000, label: '100K' },
            { value: 500000, label: '500K' },
            { value: 1000000, label: '1M' }
        ];
    }
    return [
        { value: 1, label: '1' },
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
        { value: 500, label: '500' },
        { value: 1000, label: '1,000' }
    ];
});

const referenceTableSteps = computed(() => {
    if (fromCurrency.value === 'KHR' || fromCurrency.value === 'VND') {
        return [1000, 4000, 10000, 20000, 50000, 100000, 500000];
    }
    return [1, 5, 10, 20, 50, 100, 500];
});

const reverseReferenceTableSteps = computed(() => {
    if (toCurrency.value === 'KHR' || toCurrency.value === 'VND') {
        return [1000, 4000, 10000, 20000, 50000, 100000, 500000];
    }
    return [1, 5, 10, 20, 50, 100, 500];
});

const matrixCurrencies = computed(() => {
    return currencies.value.slice(0, 7);
});

const formattedTime = computed(() => {
    if (!lastUpdated.value) return 'Syncing...';
    return new Date(lastUpdated.value).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Formatting Helpers
const formatInteger = (val) => {
    if (!val && val !== 0) return '0';
    return Math.round(val).toLocaleString('en-US');
};

const formatCurrencyDisplay = (value, code = '') => {
    if (!value || value === 0) return '0.00';
    if (code === 'KHR' || code === 'VND' || code === 'KRW' || code === 'JPY') {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(value));
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const formatRatePrecision = (rate) => {
    if (!rate || rate === 0) return '0.00';
    if (rate >= 100) return rate.toFixed(2);
    if (rate >= 1) return rate.toFixed(4);
    return rate.toFixed(6);
};

const formatMatrixCell = (rate) => {
    if (!rate) return '—';
    if (rate >= 100) return Math.round(rate).toLocaleString('en-US');
    if (rate >= 1) return rate.toFixed(2);
    return rate.toFixed(4);
};

const selectPair = (from, to) => {
    fromCurrency.value = from;
    toCurrency.value = to;
    if ((from === 'KHR' || from === 'VND') && amount.value < 500) {
        amount.value = 40000;
    } else if (from !== 'KHR' && from !== 'VND' && amount.value >= 4000) {
        amount.value = 100;
    }
    convertCurrency();
};

const copyConvertedValue = async () => {
    try {
        const text = `${formatCurrencyDisplay(convertedAmount.value, toCurrency.value)} ${toCurrency.value}`;
        await navigator.clipboard.writeText(text);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (e) {
        logger.error('Copy failed:', e);
    }
};

const fetchExchangeRates = async () => {
    loading.value = true;
    error.value = null;

    try {
        const apiKey = process.env.VUE_APP_CURRENCY_API_KEY || '';
        const apiUrl = apiKey
            ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
            : 'https://api.exchangerate-api.com/v4/latest/USD';

        let response = await fetch(apiUrl);
        if (!response.ok) {
            logger.warn('Primary FX API failed, trying fallback...');
            response = await fetch('https://open.er-api.com/v6/latest/USD');
            if (!response.ok) {
                throw new Error(`FX API request failed with status ${response.status}.`);
            }
        }

        const data = await response.json();
        if (data.rates) {
            rates.value = { USD: 1, ...data.rates };
            baseCurrency.value = data.base || 'USD';
        } else if (data.result === 'success' && data.conversion_rates) {
            rates.value = data.conversion_rates;
            baseCurrency.value = 'USD';
        } else {
            throw new Error('Invalid exchange rate response format.');
        }

        lastUpdated.value = new Date().toISOString();
        localStorage.setItem(
            'currencyRates',
            JSON.stringify({
                rates: rates.value,
                baseCurrency: baseCurrency.value,
                lastUpdated: lastUpdated.value
            })
        );
    } catch (err) {
        logger.error('Error fetching exchange rates:', err);
        const cached = localStorage.getItem('currencyRates');
        if (cached) {
            try {
                const cachedData = JSON.parse(cached);
                rates.value = cachedData.rates || {};
                baseCurrency.value = cachedData.baseCurrency || 'USD';
                lastUpdated.value = cachedData.lastUpdated;
                error.value = `Showing cached rates from ${new Date(cachedData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
            } catch (e) {
                error.value = err.message || 'Unable to load exchange rates.';
            }
        } else {
            // Built-in fallback rates so the converter is never broken offline
            rates.value = {
                USD: 1,
                KHR: 4065,
                THB: 34.2,
                VND: 25300,
                CNY: 7.24,
                EUR: 0.92,
                SGD: 1.34,
                JPY: 152.4,
                KRW: 1380,
                GBP: 0.78,
                AUD: 1.52,
                MYR: 4.38
            };
            lastUpdated.value = new Date().toISOString();
            error.value = 'Live FX feed unreachable — using reference fallback rates.';
        }
    } finally {
        loading.value = false;
    }
};

const convertCurrency = () => {
    logger.log(`Converting ${amount.value} ${fromCurrency.value} to ${toCurrency.value}`);
};

const swapCurrencies = () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
};

const setPopularCurrency = (code) => {
    if (fromCurrency.value === code) {
        swapCurrencies();
        return;
    }
    toCurrency.value = code;
    convertCurrency();
};

onMounted(async () => {
    const cached = localStorage.getItem('currencyRates');
    if (cached) {
        try {
            const cachedData = JSON.parse(cached);
            if (cachedData.rates) {
                rates.value = cachedData.rates;
                baseCurrency.value = cachedData.baseCurrency || 'USD';
                lastUpdated.value = cachedData.lastUpdated;
                loading.value = false;
            }
        } catch (e) {
            logger.error('Error loading cached rates:', e);
        }
    }
    await fetchExchangeRates();
});
</script>

<style scoped>
.font-khmer {
    font-family: 'Kantumruy Pro', 'Hanuman', sans-serif;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}

.scrollbar-thin::-webkit-scrollbar {
    height: 5px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.35);
    border-radius: 9999px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.55);
}
</style>
