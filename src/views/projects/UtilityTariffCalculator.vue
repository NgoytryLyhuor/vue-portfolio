<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'អាជ្ញាធរអគ្គិសនីកម្ពុជា (EAC) & រដ្ឋាករទឹកស្វយ័តក្រុងភ្នំពេញ (PPWSA)' : 'CAMBODIA EAC, EDC & PPWSA OFFICIAL TARIFF' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-amber-600 dark:text-amber-400 font-bold">2026 OFFICIAL TARIFFS</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">RATE: 1 USD ≈ {{ formatNumber(exchangeRate) }} ៛</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 rounded-md">
                                <span>⚡</span>
                                <span>{{ isKhmer ? 'ឧបករណ៍គណនាថ្លៃទឹក-ភ្លើងផ្លូវការ' : 'CAMBODIA UTILITY TARIFF CALCULATOR' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'គណនាថ្លៃភ្លើង (EDC) និងថ្លៃទឹកស្អាត (PPWSA)' : 'Cambodia Electricity (EDC) & Water (PPWSA) Bill Calculator' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'គណនាថ្លៃប្រើប្រាស់អគ្គិសនីកម្ពុជា (EDC) និងទឹកស្អាតរដ្ឋាករទឹក (PPWSA) តាមកាំពន្ធផ្លូវការជាក់ស្តែង ផ្ទៀងផ្ទាត់ថ្លៃកុងទ័រ ពិនិត្យថ្លៃម្ចាស់ផ្ទះជួលលើសកំណត់ និងប៉ាន់ស្មានការស៊ីភ្លើងនៃគ្រឿងបរិក្ខារក្នុងផ្ទះ។' 
                                    : 'Accurate tiered tariff calculation for Electricité du Cambodge (EDC) and Phnom Penh Water Supply Authority (PPWSA). Verify meter readings, detect landlord rental overcharges, and estimate appliance energy consumption.' }}
                            </p>
                        </div>

                        <!-- Quick Exchange Rate & Mode Card -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ isKhmer ? 'រូបិយប័ណ្ណបង្ហាញ' : 'Display Currency' }}</span>
                                <div class="inline-flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                    <button 
                                        @click="currencyMode = 'KHR'"
                                        class="px-2.5 py-1 rounded-md transition-all"
                                        :class="currencyMode === 'KHR' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                        KHR (៛)
                                    </button>
                                    <button 
                                        @click="currencyMode = 'USD'"
                                        class="px-2.5 py-1 rounded-md transition-all"
                                        :class="currencyMode === 'USD' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                        USD ($)
                                    </button>
                                </div>
                            </div>

                            <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                                <span class="text-slate-500 dark:text-slate-400">{{ isKhmer ? 'អត្រាប្តូរប្រាក់យោង' : 'Reference Rate' }}</span>
                                <span class="font-mono font-bold text-slate-800 dark:text-slate-200">1 $ = {{ formatNumber(exchangeRate) }} ៛</span>
                            </div>

                            <div class="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                <span>🛡️</span>
                                <span>{{ isKhmer ? 'កាំពន្ធប្រកាសផ្លូវការ ២០២៦' : 'Official 2026 Tiered Rates' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Tabs -->
                    <div class="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                        <button 
                            v-for="tab in availableTabs" 
                            :key="tab.id"
                            @click="activeTab = tab.id"
                            class="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                            :class="activeTab === tab.id 
                                ? 'bg-amber-500 text-white shadow-sm' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            <span>{{ tab.icon }}</span>
                            <span>{{ isKhmer ? tab.labelKhmer : tab.labelEnglish }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- ============================================================ -->
            <!-- TAB 1: EDC ELECTRICITY CALCULATOR                            -->
            <!-- ============================================================ -->
            <div v-if="activeTab === 'electricity'" class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                    <!-- Input Form Panel -->
                    <div class="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex items-center gap-2">
                                <span class="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-lg">⚡</span>
                                <div>
                                    <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'គណនាថ្លៃអគ្គិសនី (EDC)' : 'EDC Electricity Consumption' }}
                                    </h2>
                                    <p class="text-xs text-slate-500 dark:text-slate-400">
                                        {{ isKhmer ? 'អត្រាកាំពន្ធបង់តាមលំនៅឋាន ឬបន្ទប់ជួល' : 'Residential, worker rentals & commercial tariffs' }}
                                    </p>
                                </div>
                            </div>

                            <!-- Input Mode Toggle -->
                            <div class="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
                                <button 
                                    @click="elecInputMode = 'meter'"
                                    class="px-2.5 py-1 rounded-lg transition-all"
                                    :class="elecInputMode === 'meter' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'">
                                    {{ isKhmer ? 'លេខកុងទ័រ' : 'Meter Readings' }}
                                </button>
                                <button 
                                    @click="elecInputMode = 'direct'"
                                    class="px-2.5 py-1 rounded-lg transition-all"
                                    :class="elecInputMode === 'direct' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'">
                                    {{ isKhmer ? 'kWh ផ្ទាល់' : 'Direct kWh' }}
                                </button>
                            </div>
                        </div>

                        <!-- Customer Category Selector -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'ប្រភេទអតិថិជន / បណ្តាញប្រើប្រាស់' : 'Customer Category / Grid Type' }}
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button 
                                    v-for="cat in electricityCategories" 
                                    :key="cat.id"
                                    @click="elecCategory = cat.id"
                                    class="p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer"
                                    :class="elecCategory === cat.id 
                                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 shadow-xs' 
                                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'">
                                    <span class="text-lg shrink-0 mt-0.5">{{ cat.icon }}</span>
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs">{{ isKhmer ? cat.nameKhmer : cat.nameEnglish }}</div>
                                        <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{{ isKhmer ? cat.descKhmer : cat.descEnglish }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Meter Reading Inputs -->
                        <div v-if="elecInputMode === 'meter'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'លេខកុងទ័រចាស់ (ខែមុន)' : 'Previous Meter Reading' }}
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        v-model.number="elecMeterPrev" 
                                        placeholder="0"
                                        class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                    <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">kWh</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'លេខកុងទ័រថ្មី (ខែនេះ)' : 'Current Meter Reading' }}
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        v-model.number="elecMeterCurr" 
                                        placeholder="0"
                                        class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                    <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">kWh</span>
                                </div>
                            </div>
                        </div>

                        <!-- Direct kWh Input -->
                        <div v-else class="space-y-1 pt-2">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ចំនួនគីឡូវ៉ាត់ម៉ោងសរុប (kWh)' : 'Total Energy Consumed (kWh)' }}
                                </label>
                                <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">{{ calculatedElecKwh }} kWh</span>
                            </div>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    min="0" 
                                    step="1"
                                    v-model.number="elecDirectKwh" 
                                    placeholder="e.g. 150"
                                    class="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                <span class="absolute right-3 top-2.5 text-xs font-mono text-slate-400">kWh</span>
                            </div>

                            <!-- Quick preset buttons -->
                            <div class="flex flex-wrap items-center gap-1.5 pt-1.5">
                                <span class="text-[10px] text-slate-400 font-mono">{{ isKhmer ? 'តម្លៃធម្មតា៖' : 'Quick select:' }}</span>
                                <button 
                                    v-for="kwh in [45, 90, 150, 250, 400]" 
                                    :key="kwh"
                                    @click="elecDirectKwh = kwh"
                                    class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                    {{ kwh }} kWh
                                </button>
                            </div>
                        </div>

                        <!-- Rental Room Overcharge Verification Checkbox -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                            <label class="flex items-center gap-2 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    v-model="isRentalRoom"
                                    class="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 dark:border-slate-700" />
                                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ខ្ញុំស្នាក់នៅបន្ទប់ជួល / ផ្ទះជួល (ផ្ទៀងផ្ទាត់ថ្លៃម្ចាស់ផ្ទះគិត)' : 'I am renting a room/apartment (Verify landlord markup)' }}
                                </span>
                            </label>

                            <div v-if="isRentalRoom" class="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-2">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <label class="text-xs font-medium text-amber-900 dark:text-amber-200">
                                        {{ isKhmer ? 'ថ្លៃដែលម្ចាស់ផ្ទះគិតក្នុង ១ kWh (៛)៖' : 'Landlord charge per kWh (Riel):' }}
                                    </label>
                                    <div class="flex items-center gap-1.5">
                                        <input 
                                            type="number" 
                                            v-model.number="landlordRate"
                                            step="50"
                                            class="w-28 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-xs font-mono font-bold text-right focus:outline-none focus:ring-1 focus:ring-amber-500" />
                                        <span class="text-xs font-mono text-amber-800 dark:text-amber-300">៛/kWh</span>
                                    </div>
                                </div>
                                <div class="flex flex-wrap gap-1">
                                    <button 
                                        v-for="r in [1000, 1200, 1300, 1500]" 
                                        :key="r"
                                        @click="landlordRate = r"
                                        class="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                        {{ r }} ៛
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Bill Summary & Receipt Panel -->
                    <div class="lg:col-span-5 space-y-4">
                        <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'សង្ខេបវិក្កយបត្រអគ្គិសនី' : 'Electricity Bill Summary' }}
                                </span>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                                    {{ calculatedElecKwh }} kWh
                                </span>
                            </div>

                            <!-- Total Amount Display -->
                            <div class="text-center py-2 space-y-1">
                                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {{ isKhmer ? 'ទឹកប្រាក់ត្រូវបង់សរុប (រដ្ឋ/EDC)' : 'Total Official EDC Amount' }}
                                </div>
                                <div class="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                                    <span v-if="currencyMode === 'KHR'">{{ formatNumber(elecCalculation.totalRiel) }} <span class="text-xl text-amber-600 font-sans">៛</span></span>
                                    <span v-else>${{ elecCalculation.totalUsd.toFixed(2) }}</span>
                                </div>
                                <div class="text-xs font-mono text-slate-500 dark:text-slate-400">
                                    <span v-if="currencyMode === 'KHR'">≈ ${{ elecCalculation.totalUsd.toFixed(2) }} USD</span>
                                    <span v-else>≈ {{ formatNumber(elecCalculation.totalRiel) }} ៛ KHR</span>
                                </div>
                            </div>

                            <!-- Tier Breakdown Table -->
                            <div class="space-y-1.5 pt-2">
                                <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                                    {{ isKhmer ? 'ការគណនាតាមកាំពន្ធផ្លូវការ' : 'Official Tier Breakdown' }}
                                </div>
                                <div class="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    <div 
                                        v-for="(tier, idx) in elecCalculation.tiers" 
                                        :key="idx"
                                        class="p-2.5 flex items-center justify-between"
                                        :class="tier.kwh > 0 ? 'bg-slate-50/70 dark:bg-slate-950/40' : 'opacity-40'">
                                        <div class="min-w-0">
                                            <div class="font-bold text-slate-800 dark:text-slate-200">
                                                {{ tier.name }}
                                            </div>
                                            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                                {{ tier.kwh }} kWh × {{ formatNumber(tier.rate) }} ៛
                                            </div>
                                        </div>
                                        <div class="font-mono font-bold text-right text-slate-800 dark:text-slate-200">
                                            {{ formatNumber(tier.costRiel) }} ៛
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Landlord Overcharge Alert Box -->
                            <div v-if="isRentalRoom && landlordOvercharge.hasOvercharge" class="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/80 dark:bg-rose-950/30 space-y-2">
                                <div class="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                                    <span>⚠️</span>
                                    <span>{{ isKhmer ? 'ម្ចាស់ផ្ទះគិតថ្លៃលើសកំណត់ផ្លូវការ' : 'Landlord Rate Overcharge Detected' }}</span>
                                </div>
                                <div class="grid grid-cols-2 gap-2 text-xs">
                                    <div class="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60">
                                        <div class="text-[10px] text-slate-500">{{ isKhmer ? 'ថ្លៃម្ចាស់ផ្ទះយកសរុប' : 'Landlord Total' }}</div>
                                        <div class="font-mono font-bold text-slate-900 dark:text-white">{{ formatNumber(landlordOvercharge.landlordTotal) }} ៛</div>
                                    </div>
                                    <div class="p-2 rounded-lg bg-rose-100/70 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                                        <div class="text-[10px]">{{ isKhmer ? 'លើសថ្លៃរដ្ឋកំណត់' : 'Overcharged' }}</div>
                                        <div class="font-mono font-black">+{{ formatNumber(landlordOvercharge.overpaidRiel) }} ៛ (+{{ landlordOvercharge.percentDiff }}%)</div>
                                    </div>
                                </div>
                                <p class="text-[11px] text-rose-600 dark:text-rose-400 leading-normal">
                                    {{ isKhmer 
                                        ? 'តាមសេចក្តីប្រកាសរាជរដ្ឋាភិបាល ម្ចាស់បន្ទប់ជួលត្រូវគិតថ្លៃតាមតម្លៃរដ្ឋ (៤៨០៛ ឬ ៦១០៛)។ បើមានបញ្ហាអាចទាក់ទងទូរស័ព្ទទាន់ហេតុការណ៍ ១២៩៨។' 
                                        : 'Under Cambodian regulations, landlords are required to bill tenants at state rates (480-610 Riel/kWh). Call hotline 1298 for assistance.' }}
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="pt-2 flex items-center gap-2">
                                <button 
                                    @click="copyReceipt('elec')"
                                    class="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                    <span>{{ copiedReceipt === 'elec' ? '✓' : '📋' }}</span>
                                    <span>{{ copiedReceipt === 'elec' ? (isKhmer ? 'បានចម្លង!' : 'Copied!') : (isKhmer ? 'ចម្លងសង្ខេប' : 'Copy Summary') }}</span>
                                </button>
                                <button 
                                    @click="printReceipt"
                                    class="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                                    :title="isKhmer ? 'បោះពុម្ព' : 'Print'">
                                    <span>🖨️</span>
                                </button>
                            </div>
                        </div>

                        <!-- Official Tariff Reference Card -->
                        <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl text-xs space-y-2.5">
                            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <span>ℹ️</span>
                                <span>{{ isKhmer ? 'តារាងថ្លៃអគ្គិសនីលំនៅឋានផ្លូវការ (EDC)' : 'Official EDC Residential Tariffs' }}</span>
                            </div>
                            <div class="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី១ (១ - ១០ kWh)</span>
                                    <span class="font-bold text-amber-600 dark:text-amber-400">៣៨០ ៛/kWh</span>
                                </div>
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី២ (១១ - ៥០ kWh)</span>
                                    <span class="font-bold text-amber-600 dark:text-amber-400">៤៨០ ៛/kWh</span>
                                </div>
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី៣ (៥១ - ២០០ kWh)</span>
                                    <span class="font-bold text-amber-600 dark:text-amber-400">៦១០ ៛/kWh</span>
                                </div>
                                <div class="flex justify-between py-1">
                                    <span>កាំទី៤ (លើសពី ២០០ kWh)</span>
                                    <span class="font-bold text-amber-600 dark:text-amber-400">៧៣០ ៛/kWh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ============================================================ -->
            <!-- TAB 2: PPWSA CLEAN WATER CALCULATOR                          -->
            <!-- ============================================================ -->
            <div v-if="activeTab === 'water'" class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                    <!-- Input Form Panel -->
                    <div class="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex items-center gap-2">
                                <span class="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 text-lg">💧</span>
                                <div>
                                    <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'គណនាថ្លៃទឹកស្អាត (PPWSA)' : 'PPWSA Water Bill Calculation' }}
                                    </h2>
                                    <p class="text-xs text-slate-500 dark:text-slate-400">
                                        {{ isKhmer ? 'រដ្ឋាករទឹកស្វយ័តក្រុងភ្នំពេញ តាមកាំពន្ធម៉ែត្រគូប (m³)' : 'Phnom Penh Water Supply Authority tiered tariff' }}
                                    </p>
                                </div>
                            </div>

                            <!-- Input Mode Toggle -->
                            <div class="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
                                <button 
                                    @click="waterInputMode = 'meter'"
                                    class="px-2.5 py-1 rounded-lg transition-all"
                                    :class="waterInputMode === 'meter' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'">
                                    {{ isKhmer ? 'លេខកុងទ័រ' : 'Meter' }}
                                </button>
                                <button 
                                    @click="waterInputMode = 'direct'"
                                    class="px-2.5 py-1 rounded-lg transition-all"
                                    :class="waterInputMode === 'direct' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'">
                                    {{ isKhmer ? 'm³ ផ្ទាល់' : 'Direct m³' }}
                                </button>
                            </div>
                        </div>

                        <!-- Customer Category Selector -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'ប្រភេទអតិថិជនប្រើប្រាស់ទឹក' : 'Water Customer Category' }}
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <button 
                                    v-for="cat in waterCategories" 
                                    :key="cat.id"
                                    @click="waterCategory = cat.id"
                                    class="p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer"
                                    :class="waterCategory === cat.id 
                                        ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-200 shadow-xs' 
                                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'">
                                    <div class="flex items-center gap-1.5 font-bold text-xs">
                                        <span>{{ cat.icon }}</span>
                                        <span>{{ isKhmer ? cat.nameKhmer : cat.nameEnglish }}</span>
                                    </div>
                                    <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{{ isKhmer ? cat.descKhmer : cat.descEnglish }}</div>
                                </button>
                            </div>
                        </div>

                        <!-- Meter Reading Inputs -->
                        <div v-if="waterInputMode === 'meter'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'លេខកុងទ័រទឹកចាស់ (ខែមុន)' : 'Previous Water Meter (m³)' }}
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        v-model.number="waterMeterPrev" 
                                        placeholder="0"
                                        class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                    <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">m³</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'លេខកុងទ័រទឹកថ្មី (ខែនេះ)' : 'Current Water Meter (m³)' }}
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        v-model.number="waterMeterCurr" 
                                        placeholder="0"
                                        class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                    <span class="absolute right-3 top-2 text-xs font-mono text-slate-400">m³</span>
                                </div>
                            </div>
                        </div>

                        <!-- Direct m3 Input -->
                        <div v-else class="space-y-1 pt-2">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'បរិមាណទឹកប្រើប្រាស់សរុប (m³ / ម៉ែត្រគូប)' : 'Total Water Volume (m³)' }}
                                </label>
                                <span class="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{{ calculatedWaterM3 }} m³</span>
                            </div>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    min="0" 
                                    step="1"
                                    v-model.number="waterDirectM3" 
                                    placeholder="e.g. 18"
                                    class="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                <span class="absolute right-3 top-2.5 text-xs font-mono text-slate-400">m³</span>
                            </div>

                            <!-- Quick preset buttons -->
                            <div class="flex flex-wrap items-center gap-1.5 pt-1.5">
                                <span class="text-[10px] text-slate-400 font-mono">{{ isKhmer ? 'បរិមាណទូទៅ៖' : 'Quick select:' }}</span>
                                <button 
                                    v-for="m3 in [5, 12, 20, 35, 60]" 
                                    :key="m3"
                                    @click="waterDirectM3 = m3"
                                    class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                    {{ m3 }} m³
                                </button>
                            </div>
                        </div>

                        <!-- Additional PPWSA Surcharges (Meter diameter & Sanitation) -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                            <div class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'កម្រៃបន្ថែមលើវិក្កយបត្រផ្លូវការ PPWSA' : 'Standard PPWSA Official Surcharges' }}
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div>
                                        <div class="font-bold text-slate-800 dark:text-slate-200">{{ isKhmer ? 'ថ្លៃថែទាំបណ្តាញទឹកស្អុយ' : 'Sanitation Fee' }}</div>
                                        <div class="text-[10px] text-slate-500">{{ isKhmer ? '១០% នៃថ្លៃប្រើប្រាស់ទឹក' : '10% of water consumption' }}</div>
                                    </div>
                                    <span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">+10%</span>
                                </div>

                                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div>
                                        <div class="font-bold text-slate-800 dark:text-slate-200">{{ isKhmer ? 'ថ្លៃថែទាំកុងទ័រ (១៥mm)' : 'Meter Fee (15mm)' }}</div>
                                        <div class="text-[10px] text-slate-500">{{ isKhmer ? 'អត្រាថេរប្រចាំខែ' : 'Fixed monthly maintenance' }}</div>
                                    </div>
                                    <span class="font-mono font-bold text-slate-700 dark:text-slate-300">500 ៛</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Water Summary & Receipt Panel -->
                    <div class="lg:col-span-5 space-y-4">
                        <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'សង្ខេបវិក្កយបត្រទឹកស្អាត' : 'Water Bill Summary' }}
                                </span>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                                    {{ calculatedWaterM3 }} m³
                                </span>
                            </div>

                            <!-- Total Amount Display -->
                            <div class="text-center py-2 space-y-1">
                                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {{ isKhmer ? 'ទឹកប្រាក់ត្រូវបង់សរុប (PPWSA)' : 'Total Payable to PPWSA' }}
                                </div>
                                <div class="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                                    <span v-if="currencyMode === 'KHR'">{{ formatNumber(waterCalculation.grandTotalRiel) }} <span class="text-xl text-cyan-600 font-sans">៛</span></span>
                                    <span v-else>${{ waterCalculation.grandTotalUsd.toFixed(2) }}</span>
                                </div>
                                <div class="text-xs font-mono text-slate-500 dark:text-slate-400">
                                    <span v-if="currencyMode === 'KHR'">≈ ${{ waterCalculation.grandTotalUsd.toFixed(2) }} USD</span>
                                    <span v-else>≈ {{ formatNumber(waterCalculation.grandTotalRiel) }} ៛ KHR</span>
                                </div>
                            </div>

                            <!-- Tiered Breakdown & Surcharges -->
                            <div class="space-y-1.5 pt-2">
                                <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                                    {{ isKhmer ? 'លម្អិតកាំពន្ធទឹក និងកម្រៃផ្សេងៗ' : 'Tier & Surcharge Details' }}
                                </div>
                                <div class="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    <div 
                                        v-for="(tier, idx) in waterCalculation.tiers" 
                                        :key="idx"
                                        class="p-2.5 flex items-center justify-between"
                                        :class="tier.m3 > 0 ? 'bg-slate-50/70 dark:bg-slate-950/40' : 'opacity-40'">
                                        <div class="min-w-0">
                                            <div class="font-bold text-slate-800 dark:text-slate-200">
                                                {{ tier.name }}
                                            </div>
                                            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                                {{ tier.m3 }} m³ × {{ formatNumber(tier.rate) }} ៛
                                            </div>
                                        </div>
                                        <div class="font-mono font-bold text-right text-slate-800 dark:text-slate-200">
                                            {{ formatNumber(tier.costRiel) }} ៛
                                        </div>
                                    </div>

                                    <!-- Water Subtotal -->
                                    <div class="p-2.5 flex justify-between bg-slate-100/50 dark:bg-slate-800/40 font-semibold">
                                        <span>{{ isKhmer ? 'ថ្លៃទឹកប្រើប្រាស់សរុប' : 'Water Subtotal' }}</span>
                                        <span class="font-mono">{{ formatNumber(waterCalculation.waterSubtotalRiel) }} ៛</span>
                                    </div>

                                    <!-- Sanitation 10% -->
                                    <div class="p-2.5 flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400">{{ isKhmer ? 'ថ្លៃទឹកស្អុយ (១០%)' : 'Sanitation Fee (10%)' }}</span>
                                        <span class="font-mono text-cyan-600 dark:text-cyan-400">+{{ formatNumber(waterCalculation.sanitationRiel) }} ៛</span>
                                    </div>

                                    <!-- Meter maintenance -->
                                    <div class="p-2.5 flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400">{{ isKhmer ? 'ថ្លៃថែទាំកុងទ័រ' : 'Meter Maintenance' }}</span>
                                        <span class="font-mono text-slate-700 dark:text-slate-300">+{{ formatNumber(waterCalculation.meterFeeRiel) }} ៛</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="pt-2 flex items-center gap-2">
                                <button 
                                    @click="copyReceipt('water')"
                                    class="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                    <span>{{ copiedReceipt === 'water' ? '✓' : '📋' }}</span>
                                    <span>{{ copiedReceipt === 'water' ? (isKhmer ? 'បានចម្លង!' : 'Copied!') : (isKhmer ? 'ចម្លងសង្ខេប' : 'Copy Summary') }}</span>
                                </button>
                                <button 
                                    @click="printReceipt"
                                    class="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                                    :title="isKhmer ? 'បោះពុម្ព' : 'Print'">
                                    <span>🖨️</span>
                                </button>
                            </div>
                        </div>

                        <!-- Domestic PPWSA Tariff Reference -->
                        <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl text-xs space-y-2.5">
                            <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <span>ℹ️</span>
                                <span>{{ isKhmer ? 'តារាងកាំពន្ធទឹកលំនៅឋានផ្លូវការ (PPWSA)' : 'Official Domestic Water Tariffs' }}</span>
                            </div>
                            <div class="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី១ (១ - ៧ m³)</span>
                                    <span class="font-bold text-cyan-600 dark:text-cyan-400">៤០០ ៛/m³</span>
                                </div>
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី២ (៨ - ១៥ m³)</span>
                                    <span class="font-bold text-cyan-600 dark:text-cyan-400">៧២០ ៛/m³</span>
                                </div>
                                <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>កាំទី៣ (១៦ - ៥០ m³)</span>
                                    <span class="font-bold text-cyan-600 dark:text-cyan-400">១,០០០ ៛/m³</span>
                                </div>
                                <div class="flex justify-between py-1">
                                    <span>កាំទី៤ (លើសពី ៥០ m³)</span>
                                    <span class="font-bold text-cyan-600 dark:text-cyan-400">១,២៧០ ៛/m³</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ============================================================ -->
            <!-- TAB 3: APPLIANCE ENERGY CONSUMPTION ESTIMATOR                -->
            <!-- ============================================================ -->
            <div v-if="activeTab === 'appliances'" class="space-y-6">
                <!-- Summary HUD Box -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                                <span>🔌</span>
                                <span>{{ isKhmer ? 'ការប៉ាន់ស្មានគ្រឿងបរិក្ខារប្រើប្រាស់ក្នុងផ្ទះ' : 'Home Energy Consumption' }}</span>
                            </div>
                            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                                {{ isKhmer ? 'តើគ្រឿងអគ្គិសនីមួយណាស៊ីភ្លើងច្រើនជាងគេ?' : 'Which Appliance Consumes the Most Power?' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'កែសម្រួលម៉ោងប្រើប្រាស់ក្នុងមួយថ្ងៃ ដើម្បីដឹងថ្លៃភ្លើងប្រចាំខែប៉ាន់ស្មាន' : 'Adjust daily operating hours to estimate your monthly electricity cost' }}
                            </p>
                        </div>

                        <!-- Total Monthly Cost Meter -->
                        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-6 shrink-0">
                            <div>
                                <div class="text-[10px] font-mono uppercase text-slate-400">{{ isKhmer ? 'ថាមពលសរុប/ខែ' : 'Total Monthly Energy' }}</div>
                                <div class="text-xl font-black font-mono text-amber-600 dark:text-amber-400">{{ formatNumber(applianceTotalKwh) }} <span class="text-xs">kWh</span></div>
                            </div>
                            <div class="border-l border-slate-200 dark:border-slate-800 pl-6">
                                <div class="text-[10px] font-mono uppercase text-slate-400">{{ isKhmer ? 'ថ្លៃប៉ាន់ស្មាន/ខែ' : 'Est. Monthly Cost' }}</div>
                                <div class="text-xl font-black font-mono text-slate-900 dark:text-white">
                                    <span v-if="currencyMode === 'KHR'">{{ formatNumber(applianceTotalRiel) }} <span class="text-xs text-amber-600 font-sans">៛</span></span>
                                    <span v-else>${{ applianceTotalUsd.toFixed(2) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Appliances Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                        v-for="appliance in applianceList" 
                        :key="appliance.id"
                        class="p-4 rounded-2xl border transition-all space-y-3"
                        :class="appliance.hoursPerDay > 0 
                            ? 'border-amber-400/80 dark:border-amber-500/40 bg-white dark:bg-slate-900 shadow-sm' 
                            : 'border-slate-200 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-950/40 opacity-70'">
                        <div class="flex items-start justify-between gap-2">
                            <div class="flex items-center gap-2.5">
                                <span class="text-2xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">{{ appliance.icon }}</span>
                                <div>
                                    <div class="font-bold text-xs text-slate-900 dark:text-white">
                                        {{ isKhmer ? appliance.nameKhmer : appliance.nameEnglish }}
                                    </div>
                                    <div class="text-[10px] font-mono text-slate-400">
                                        {{ appliance.watts }} Watts ({{ (appliance.watts / 1000).toFixed(2) }} kW)
                                    </div>
                                </div>
                            </div>

                            <!-- Monthly Cost Badge -->
                            <div class="text-right shrink-0">
                                <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                                    {{ formatNumber(calculateApplianceMonthlyRiel(appliance)) }} ៛
                                </div>
                                <div class="text-[10px] text-slate-400 font-mono">
                                    {{ calculateApplianceMonthlyKwh(appliance) }} kWh/ខែ
                                </div>
                            </div>
                        </div>

                        <!-- Hours Slider & Controls -->
                        <div class="space-y-1.5 pt-1">
                            <div class="flex items-center justify-between text-xs">
                                <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ម៉ោងប្រើប្រាស់ក្នុង១ថ្ងៃ៖' : 'Daily Usage:' }}</span>
                                <span class="font-mono font-bold text-slate-800 dark:text-slate-200">{{ appliance.hoursPerDay }} {{ isKhmer ? 'ម៉ោង' : 'hours' }}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="24" 
                                step="0.5"
                                v-model.number="appliance.hoursPerDay"
                                class="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                            <div class="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>0h (បិទ)</span>
                                <span>6h</span>
                                <span>12h</span>
                                <span>24h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ============================================================ -->
            <!-- TAB 4: ENERGY & WATER SAVING TIPS & HOTLINES                 -->
            <!-- ============================================================ -->
            <div v-if="activeTab === 'tips'" class="space-y-6">
                <!-- Official Support & Hotlines -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-xl">📞</span>
                        <div>
                            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'លេខទូរស័ព្ទទាន់ហេតុការណ៍ & បណ្តាញផ្លូវការ' : 'Official Emergency Hotlines & Contacts' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'រាយការណ៍ពីបញ្ហាដាច់ភ្លើង ដាច់ទឹក ឬម្ចាស់ផ្ទះជួលយកថ្លៃលើសកំណត់' : 'Report power outages, water cuts, or illegal landlord overpricing' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        <!-- EDC Hotline -->
                        <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">⚡</span>
                                <div class="font-bold text-xs text-amber-900 dark:text-amber-200">{{ isKhmer ? 'អគ្គិសនីកម្ពុជា (EDC)' : 'Electricité du Cambodge' }}</div>
                            </div>
                            <div class="text-lg font-black font-mono text-amber-600 dark:text-amber-400">1298</div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? 'សេវា Call Center 24/7 ជួយដោះស្រាយបញ្ហាដាច់ចរន្ត និងសំណួរទូទៅ។' : '24/7 Call Center for outage response and customer inquiries.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">Telegram: @edccambodia</div>
                        </div>

                        <!-- PPWSA Hotline -->
                        <div class="p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/60 bg-cyan-50/50 dark:bg-cyan-950/20 space-y-2">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">💧</span>
                                <div class="font-bold text-xs text-cyan-900 dark:text-cyan-200">{{ isKhmer ? 'រដ្ឋាករទឹកស្វយ័ត (PPWSA)' : 'Phnom Penh Water' }}</div>
                            </div>
                            <div class="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">023 635 8080</div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? 'រាយការណ៍បែកទុយោទឹកស្អាត ទឹកមិនដើរ ឬស្នើសុំភ្ជាប់កុងទ័រថ្មី។' : 'Report water leaks, low pressure, or request new water connections.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">Hotline: 1363</div>
                        </div>

                        <!-- EAC Dispute Resolution -->
                        <div class="p-4 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">⚖️</span>
                                <div class="font-bold text-xs text-rose-900 dark:text-rose-200">{{ isKhmer ? 'អាជ្ញាធរអគ្គិសនី (EAC)' : 'Electricity Authority (EAC)' }}</div>
                            </div>
                            <div class="text-lg font-black font-mono text-rose-600 dark:text-rose-400">023 986 929</div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? 'ដាក់ពាក្យបណ្តឹងករណីម្ចាស់បន្ទប់ជួលគិតថ្លៃភ្លើងលើសតម្លៃរដ្ឋកំណត់។' : 'Lodge complaints for landlords charging illegal electricity markups.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">Website: eac.gov.kh</div>
                        </div>
                    </div>
                </div>

                <!-- Practical Saving Tips Grid -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span class="text-xl">💡</span>
                        <div>
                            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'គន្លឹះសន្សំសំចៃភ្លើង និងទឹក សម្រាប់អាកាសធាតុកម្ពុជា' : 'Electricity & Water Conservation Tips' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'អនុវត្តតាមការណែនាំទាំងនេះ អាចជួយកាត់បន្ថយថ្លៃភ្លើងប្រចាំខែពី ១៥% ទៅ ៣០%' : 'Practical habits that reduce monthly bills by 15% to 30%' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                            v-for="(tip, idx) in savingTips" 
                            :key="idx"
                            class="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-start gap-3">
                            <span class="text-2xl shrink-0 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">{{ tip.icon }}</span>
                            <div class="space-y-1">
                                <div class="font-bold text-xs text-slate-900 dark:text-white">{{ isKhmer ? tip.titleKhmer : tip.titleEnglish }}</div>
                                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ isKhmer ? tip.descKhmer : tip.descEnglish }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'UtilityTariffCalculator',
    setup() {
        const { isKhmer } = useLanguage();

        // State
        const activeTab = ref('electricity');
        const currencyMode = ref('KHR'); // 'KHR' or 'USD'
        const exchangeRate = ref(4100);
        const copiedReceipt = ref(null);

        // Electricity Calculator State
        const elecInputMode = ref('direct'); // 'meter' or 'direct'
        const elecCategory = ref('residential');
        const elecMeterPrev = ref(1200);
        const elecMeterCurr = ref(1385);
        const elecDirectKwh = ref(185);
        const isRentalRoom = ref(false);
        const landlordRate = ref(1200);

        // Water Calculator State
        const waterInputMode = ref('direct');
        const waterCategory = ref('domestic');
        const waterMeterPrev = ref(450);
        const waterMeterCurr = ref(468);
        const waterDirectM3 = ref(18);

        // Appliance List State
        const applianceList = ref([
            { id: 'ac1', nameKhmer: 'ម៉ាស៊ីនត្រជាក់ 1 HP Inverter', nameEnglish: 'Air Conditioner 1.0 HP Inverter', icon: '❄️', watts: 750, hoursPerDay: 8 },
            { id: 'ac15_non', nameKhmer: 'ម៉ាស៊ីនត្រជាក់ 1.5 HP ធម្មតា', nameEnglish: 'Air Conditioner 1.5 HP Non-Inv', icon: '❄️', watts: 1350, hoursPerDay: 0 },
            { id: 'fridge', nameKhmer: 'ទូទឹកកក ២ទ្វារ (Inverter)', nameEnglish: 'Refrigerator 2-Door Inverter', icon: '🧊', watts: 120, hoursPerDay: 24 },
            { id: 'fan', nameKhmer: 'កង្ហារឈរ (២ គ្រឿង)', nameEnglish: 'Standing Fan (2 units)', icon: '🌀', watts: 110, hoursPerDay: 12 },
            { id: 'water_heater', nameKhmer: 'ម៉ាស៊ីនទឹកក្តៅងូតទឹក', nameEnglish: 'Instant Water Heater', icon: '🚿', watts: 3500, hoursPerDay: 0.5 },
            { id: 'washer', nameKhmer: 'ម៉ាស៊ីនបោកខោអាវ', nameEnglish: 'Automatic Washing Machine', icon: '🧺', watts: 450, hoursPerDay: 1 },
            { id: 'rice_cooker', nameKhmer: 'ឆ្នាំងដាំបាយអគ្គិសនី', nameEnglish: 'Electric Rice Cooker', icon: '🍚', watts: 650, hoursPerDay: 1.5 },
            { id: 'induction', nameKhmer: 'ចង្ក្រានអគ្គិសនី / អាំងភ្លើង', nameEnglish: 'Induction / Infrared Cooker', icon: '🍳', watts: 1800, hoursPerDay: 1 },
            { id: 'tv', nameKhmer: 'ទូរទស្សន៍ Smart TV 55"', nameEnglish: 'Smart TV 55 Inch', icon: '📺', watts: 95, hoursPerDay: 5 },
            { id: 'pc', nameKhmer: 'កុំព្យូទ័រលើតុ Desktop PC', nameEnglish: 'Desktop PC + Monitor', icon: '🖥️', watts: 250, hoursPerDay: 4 },
            { id: 'laptop', nameKhmer: 'កុំព្យូទ័រយួរដៃ Laptop', nameEnglish: 'Laptop Computer', icon: '💻', watts: 65, hoursPerDay: 6 },
            { id: 'iron', nameKhmer: 'ឆ្នាំងអ៊ុតខោអាវ', nameEnglish: 'Electric Clothes Iron', icon: '👔', watts: 1200, hoursPerDay: 0.5 }
        ]);

        // Constants
        const availableTabs = [
            { id: 'electricity', labelKhmer: 'ថ្លៃភ្លើង (EDC)', labelEnglish: 'Electricity (EDC)', icon: '⚡' },
            { id: 'water', labelKhmer: 'ថ្លៃទឹកស្អាត (PPWSA)', labelEnglish: 'Clean Water (PPWSA)', icon: '💧' },
            { id: 'appliances', labelKhmer: 'ប៉ាន់ស្មានគ្រឿងអគ្គិសនី', labelEnglish: 'Appliance Estimator', icon: '🔌' },
            { id: 'tips', labelKhmer: 'គន្លឹះសន្សំ & ទំនាក់ទំនង', labelEnglish: 'Tips & Hotlines', icon: '💡' }
        ];

        const electricityCategories = [
            {
                id: 'residential',
                icon: '🏠',
                nameKhmer: 'លំនៅឋានទូទៅ (បណ្តាញជាតិ)',
                nameEnglish: 'Residential (National Grid)',
                descKhmer: 'កាំពន្ធ ៤ កម្រិត (៣៨០៛ / ៤៨០៛ / ៦១០៛ / ៧៣០៛)',
                descEnglish: 'Standard 4-tier subsidy rates'
            },
            {
                id: 'rental_room',
                icon: '🏢',
                nameKhmer: 'បន្ទប់ជួលកម្មករ / សិស្ស-និស្សិត',
                nameEnglish: 'Workers & Students Rental Rooms',
                descKhmer: 'អត្រាកំណត់ដោយរដ្ឋ (៤៨០៛ / ៦១០៛)',
                descEnglish: 'Regulated ceiling (480 / 610 Riel)'
            },
            {
                id: 'commercial',
                icon: '🏪',
                nameKhmer: 'អាជីវកម្មខ្នាតតូច / ហាងទំនិញ',
                nameEnglish: 'Small Commercial & Retail',
                descKhmer: 'អត្រាតង់ស្យុងទាប ៧៤០ ៛/kWh',
                descEnglish: 'Flat low voltage 740 Riel/kWh'
            },
            {
                id: 'agriculture',
                icon: '🌾',
                nameKhmer: 'កសិកម្មបូមទឹក (ម៉ោងយប់)',
                nameEnglish: 'Agricultural Irrigation (Night)',
                descKhmer: 'អត្រាពិសេស ៤៨០ ៛/kWh (៩យប់-៧ព្រឹក)',
                descEnglish: 'Night tariff 480 Riel/kWh'
            }
        ];

        const waterCategories = [
            {
                id: 'domestic',
                icon: '🏠',
                nameKhmer: 'លំនៅឋានប្រជាពលរដ្ឋ',
                nameEnglish: 'Domestic / Household',
                descKhmer: 'កាំពន្ធ ៤ កម្រិត (៤០០៛ - ១,២៧០៛/m³)',
                descEnglish: 'Tiered 400 - 1,270 Riel/m³'
            },
            {
                id: 'commercial',
                icon: '🏪',
                nameKhmer: 'អាជីវកម្ម & សិប្បកម្ម',
                nameEnglish: 'Business & Commercial',
                descKhmer: 'អត្រា ១,៩៥០ - ២,៤០០ ៛/m³',
                descEnglish: 'Commercial 1,950 - 2,400 Riel/m³'
            },
            {
                id: 'ministry',
                icon: '🏛️',
                nameKhmer: 'ស្ថាប័នរដ្ឋ & ស្ថានទូត',
                nameEnglish: 'Ministries & Institutions',
                descKhmer: 'អត្រាថេរ ២,៥០០ ៛/m³',
                descEnglish: 'Flat 2,500 Riel/m³'
            }
        ];

        const savingTips = [
            {
                icon: '❄️',
                titleKhmer: 'កំណត់ម៉ាស៊ីនត្រជាក់នៅសីតុណ្ហភាព ២៥°C ទៅ ២៦°C',
                titleEnglish: 'Set Air Conditioner to 25°C - 26°C with Fan',
                descKhmer: 'ការបញ្ចុះសីតុណ្ហភាពត្រឹម ១°C បន្ថែម (ឧ. ២០°C ជំនួស ២៥°C) ធ្វើឱ្យម៉ាស៊ីនស៊ីភ្លើងកើនឡើងពី ៧% ទៅ ១០%។ ប្រើកង្ហាររួមគ្នាជួយឱ្យត្រជាក់សព្វ និងសន្សំសំចៃខ្ពស់។',
                descEnglish: 'Every degree below 25°C increases AC power draw by 7-10%. Combining 26°C with a gentle standing fan delivers matching comfort while saving substantial electricity.'
            },
            {
                icon: '🧹',
                titleKhmer: 'លាងសម្អាតសំណាញ់ម៉ាស៊ីនត្រជាក់រៀងរាល់ ២-៣ ខែម្តង',
                titleEnglish: 'Clean AC Dust Filters Every 2 Months',
                descKhmer: 'ធូលីកកស្ទះលើតម្រងខ្យល់ ធ្វើឱ្យកង្ហារ និងម៉ូទ័របង្ខំចិត្តដំណើរការធ្ងន់ធ្ងរ ស៊ីភ្លើងលើសធម្មតា ១៥% និងងាយខូចម៉ាស៊ីន។',
                descEnglish: 'Clogged filters block airflow, forcing the compressor to work 15% harder. Regular self-cleaning takes 5 minutes and drastically cuts energy consumption.'
            },
            {
                icon: '🧊',
                titleKhmer: 'ពិនិត្យកៅស៊ូទ្វារទូទឹកកក និងកុំដាក់ម្ហូបក្តៅចូលភ្លាមៗ',
                titleEnglish: 'Check Refrigerator Door Gasket Seal',
                descKhmer: 'បើកៅស៊ូទ្វារទូទឹកកកធូរ ខ្យល់ត្រជាក់នឹងហៀរចេញជានិច្ច ធ្វើឱ្យម៉ូទ័រវិលមិនឈប់។ ទុកម្ហូបឱ្យត្រជាក់សិន ចាំដាក់ចូលក្នុងទូ។',
                descEnglish: 'Damaged rubber gaskets cause continuous cold air leakage. Never place steaming hot food directly inside the fridge.'
            },
            {
                icon: '🔌',
                titleKhmer: 'ដកឌុយគ្រឿងបរិក្ខារដែលមិនប្រើប្រាស់ (Vampire Power)',
                titleEnglish: 'Unplug Standby Chargers and Appliances',
                descKhmer: 'ក្បាលសាកទូរស័ព្ទ កុំព្យូទ័រ និងទូរទស្សន៍ ទោះបីបិទហើយ ក៏នៅតែបន្តបឺតភ្លើងស្ងាត់ៗ (Phantom load) ប្រមាណ ៥% ទៅ ៨% នៃវិក្កយបត្រខែ។',
                descEnglish: 'Chargers, smart TVs, and desktop monitors consume phantom energy even on standby. Turn off power strips when not in use.'
            },
            {
                icon: '🚿',
                titleKhmer: 'ប្រើក្បាលផ្កាឈូកទឹកសន្សំសំចៃ និងពិនិត្យទុយោលេចធ្លាយ',
                titleEnglish: 'Inspect Toilet Flappers & Fix Leaking Taps',
                descKhmer: 'ក្បាលរ៉ូប៊ីណេ ឬក្បាលបង្គន់លេចធ្លាយតិចៗ អាចបាត់បង់ទឹកស្អាតរហូតដល់ ២០០ ទៅ ៥០០ លីត្រក្នុងមួយថ្ងៃដោយមិនដឹងខ្លួន។',
                descEnglish: 'A silent toilet leak can waste 200-500 liters of clean water daily, quietly pushing your consumption into high tariff tiers.'
            },
            {
                icon: '💡',
                titleKhmer: 'ប្តូរមកប្រើអំពូល LED ទាំងអស់ក្នុងផ្ទះ',
                titleEnglish: 'Switch Completely to Modern LED Lighting',
                descKhmer: 'អំពូល LED ស៊ីភ្លើងតិចជាងអំពូលខ្សែរញ័រ (Incandescent) រហូតដល់ ៨០% និងមានអាយុកាលប្រើប្រាស់បានយូរជាង ៥ ដង។',
                descEnglish: 'LED bulbs consume up to 80% less electricity than incandescent lamps while producing virtually no heat in tropical rooms.'
            }
        ];

        // Computed Electricity Values
        const calculatedElecKwh = computed(() => {
            if (elecInputMode.value === 'meter') {
                const diff = (elecMeterCurr.value || 0) - (elecMeterPrev.value || 0);
                return Math.max(diff, 0);
            }
            return Math.max(elecDirectKwh.value || 0, 0);
        });

        const elecCalculation = computed(() => {
            const kwh = calculatedElecKwh.value;
            const category = elecCategory.value;

            // Worker / Student Rental room tariff under state Prakas
            if (category === 'rental_room') {
                let cost = 0;
                let t1 = 0;
                let t2 = 0;
                if (kwh <= 50) {
                    t1 = kwh;
                    cost = t1 * 480;
                } else {
                    t1 = 50;
                    t2 = kwh - 50;
                    cost = t1 * 480 + t2 * 610;
                }
                const tiers = [
                    { name: isKhmer.value ? 'កាំទី១ (១ - ៥០ kWh)' : 'Tier 1 (1 - 50 kWh)', kwh: t1, rate: 480, costRiel: t1 * 480 },
                    { name: isKhmer.value ? 'កាំទី២ (លើសពី ៥០ kWh)' : 'Tier 2 (> 50 kWh)', kwh: t2, rate: 610, costRiel: t2 * 610 }
                ];
                return {
                    totalRiel: cost,
                    totalUsd: cost / exchangeRate.value,
                    tiers
                };
            }

            // Commercial Flat
            if (category === 'commercial') {
                const rate = 740;
                const cost = kwh * rate;
                return {
                    totalRiel: cost,
                    totalUsd: cost / exchangeRate.value,
                    tiers: [{ name: isKhmer.value ? 'អាជីវកម្មខ្នាតតូច (៧៤០ ៛)' : 'Small Business Flat', kwh, rate, costRiel: cost }]
                };
            }

            // Agriculture Night Flat
            if (category === 'agriculture') {
                const rate = 480;
                const cost = kwh * rate;
                return {
                    totalRiel: cost,
                    totalUsd: cost / exchangeRate.value,
                    tiers: [{ name: isKhmer.value ? 'កសិកម្មបូមទឹកម៉ោងយប់' : 'Agricultural Night Pumping', kwh, rate, costRiel: cost }]
                };
            }

            // Standard Residential Tiered (EAC/EDC)
            // Tier 1: 1-10 kWh @ 380 Riel
            // Tier 2: 11-50 kWh @ 480 Riel
            // Tier 3: 51-200 kWh @ 610 Riel
            // Tier 4: >200 kWh @ 730 Riel
            let rem = kwh;
            const t1 = Math.min(rem, 10);
            rem = Math.max(rem - t1, 0);

            const t2 = Math.min(rem, 40); // 11 to 50
            rem = Math.max(rem - t2, 0);

            const t3 = Math.min(rem, 150); // 51 to 200
            rem = Math.max(rem - t3, 0);

            const t4 = rem; // > 200

            const c1 = t1 * 380;
            const c2 = t2 * 480;
            const c3 = t3 * 610;
            const c4 = t4 * 730;
            const totalRiel = c1 + c2 + c3 + c4;

            const tiers = [
                { name: isKhmer.value ? 'កាំទី១ (១ - ១០ kWh)' : 'Tier 1 (1 - 10 kWh)', kwh: t1, rate: 380, costRiel: c1 },
                { name: isKhmer.value ? 'កាំទី២ (១១ - ៥០ kWh)' : 'Tier 2 (11 - 50 kWh)', kwh: t2, rate: 480, costRiel: c2 },
                { name: isKhmer.value ? 'កាំទី៣ (៥១ - ២០០ kWh)' : 'Tier 3 (51 - 200 kWh)', kwh: t3, rate: 610, costRiel: c3 },
                { name: isKhmer.value ? 'កាំទី៤ (លើសពី ២០០ kWh)' : 'Tier 4 (> 200 kWh)', kwh: t4, rate: 730, costRiel: c4 }
            ];

            return {
                totalRiel,
                totalUsd: totalRiel / exchangeRate.value,
                tiers
            };
        });

        // Landlord Overcharge Calculation
        const landlordOvercharge = computed(() => {
            const kwh = calculatedElecKwh.value;
            const officialCost = elecCalculation.value.totalRiel;
            const landlordPrice = landlordRate.value || 0;
            const landlordTotal = kwh * landlordPrice;
            const overpaidRiel = Math.max(landlordTotal - officialCost, 0);
            const percentDiff = officialCost > 0 ? Math.round((overpaidRiel / officialCost) * 100) : 0;

            return {
                hasOvercharge: isRentalRoom.value && overpaidRiel > 0,
                landlordTotal,
                overpaidRiel,
                percentDiff
            };
        });

        // Computed Water Values
        const calculatedWaterM3 = computed(() => {
            if (waterInputMode.value === 'meter') {
                const diff = (waterMeterCurr.value || 0) - (waterMeterPrev.value || 0);
                return Math.max(diff, 0);
            }
            return Math.max(waterDirectM3.value || 0, 0);
        });

        const waterCalculation = computed(() => {
            const m3 = calculatedWaterM3.value;
            const category = waterCategory.value;

            // Commercial Flat/Tiers
            if (category === 'commercial') {
                const rate = 1950;
                const waterSubtotal = m3 * rate;
                const sanitation = Math.round(waterSubtotal * 0.10);
                const meterFee = 1000;
                const grandTotal = waterSubtotal + sanitation + meterFee;
                return {
                    waterSubtotalRiel: waterSubtotal,
                    sanitationRiel: sanitation,
                    meterFeeRiel: meterFee,
                    grandTotalRiel: grandTotal,
                    grandTotalUsd: grandTotal / exchangeRate.value,
                    tiers: [{ name: isKhmer.value ? 'អាជីវកម្ម & សិប្បកម្ម' : 'Commercial Tariff', m3, rate, costRiel: waterSubtotal }]
                };
            }

            // Ministry
            if (category === 'ministry') {
                const rate = 2500;
                const waterSubtotal = m3 * rate;
                const sanitation = Math.round(waterSubtotal * 0.10);
                const meterFee = 1500;
                const grandTotal = waterSubtotal + sanitation + meterFee;
                return {
                    waterSubtotalRiel: waterSubtotal,
                    sanitationRiel: sanitation,
                    meterFeeRiel: meterFee,
                    grandTotalRiel: grandTotal,
                    grandTotalUsd: grandTotal / exchangeRate.value,
                    tiers: [{ name: isKhmer.value ? 'ស្ថាប័នរដ្ឋ & ស្ថានទូត' : 'Public Ministries', m3, rate, costRiel: waterSubtotal }]
                };
            }

            // Standard Domestic PPWSA Tiered
            // Tier 1: 1 - 7 m3 @ 400 Riel
            // Tier 2: 8 - 15 m3 @ 720 Riel
            // Tier 3: 16 - 50 m3 @ 1,000 Riel
            // Tier 4: > 50 m3 @ 1,270 Riel
            let rem = m3;
            const t1 = Math.min(rem, 7);
            rem = Math.max(rem - t1, 0);

            const t2 = Math.min(rem, 8); // 8 to 15
            rem = Math.max(rem - t2, 0);

            const t3 = Math.min(rem, 35); // 16 to 50
            rem = Math.max(rem - t3, 0);

            const t4 = rem; // > 50

            const c1 = t1 * 400;
            const c2 = t2 * 720;
            const c3 = t3 * 1000;
            const c4 = t4 * 1270;
            const waterSubtotal = c1 + c2 + c3 + c4;
            const sanitation = Math.round(waterSubtotal * 0.10); // 10% sanitation surcharge
            const meterFee = 500; // Standard 15mm domestic meter maintenance
            const grandTotal = waterSubtotal + sanitation + meterFee;

            const tiers = [
                { name: isKhmer.value ? 'កាំទី១ (១ - ៧ m³)' : 'Tier 1 (1 - 7 m³)', m3: t1, rate: 400, costRiel: c1 },
                { name: isKhmer.value ? 'កាំទី២ (៨ - ១៥ m³)' : 'Tier 2 (8 - 15 m³)', m3: t2, rate: 720, costRiel: c2 },
                { name: isKhmer.value ? 'កាំទី៣ (១៦ - ៥០ m³)' : 'Tier 3 (16 - 50 m³)', m3: t3, rate: 1000, costRiel: c3 },
                { name: isKhmer.value ? 'កាំទី៤ (លើសពី ៥០ m³)' : 'Tier 4 (> 50 m³)', m3: t4, rate: 1270, costRiel: c4 }
            ];

            return {
                waterSubtotalRiel: waterSubtotal,
                sanitationRiel: sanitation,
                meterFeeRiel: meterFee,
                grandTotalRiel: grandTotal,
                grandTotalUsd: grandTotal / exchangeRate.value,
                tiers
            };
        });

        // Appliance Calculation Methods
        const calculateApplianceMonthlyKwh = (appliance) => {
            const dailyKwh = (appliance.watts * (appliance.hoursPerDay || 0)) / 1000;
            return Math.round(dailyKwh * 30);
        };

        const calculateApplianceMonthlyRiel = (appliance) => {
            const monthlyKwh = calculateApplianceMonthlyKwh(appliance);
            // Average residential rate in Cambodia ~ 610 Riel/kWh
            return Math.round(monthlyKwh * 610);
        };

        const applianceTotalKwh = computed(() => {
            return applianceList.value.reduce((sum, item) => sum + calculateApplianceMonthlyKwh(item), 0);
        });

        const applianceTotalRiel = computed(() => {
            return Math.round(applianceTotalKwh.value * 610);
        });

        const applianceTotalUsd = computed(() => {
            return applianceTotalRiel.value / exchangeRate.value;
        });

        // Utilities
        const formatNumber = (num) => {
            if (num === undefined || num === null || isNaN(num)) return '0';
            return Math.round(num).toLocaleString('en-US');
        };

        const copyReceipt = async (type) => {
            let text = '';
            const dateStr = new Date().toLocaleDateString('en-US');
            if (type === 'elec') {
                const calc = elecCalculation.value;
                text = `⚡ [វិក្កយបត្រអគ្គិសនីកម្ពុជា EDC - ប៉ាន់ស្មាន]\nកាលបរិច្ឆេទ៖ ${dateStr}\nការប្រើប្រាស់៖ ${calculatedElecKwh.value} kWh\nថ្លៃរដ្ឋត្រូវបង់៖ ${formatNumber(calc.totalRiel)} ៛ ($${calc.totalUsd.toFixed(2)})\n${isRentalRoom.value && landlordOvercharge.value.hasOvercharge ? `ថ្លៃម្ចាស់ផ្ទះជួល៖ ${formatNumber(landlordOvercharge.value.landlordTotal)} ៛ (លើស ${formatNumber(landlordOvercharge.value.overpaidRiel)} ៛)\n` : ''}គណនាតាម https://ngoytry-lyhuor.vercel.app/utility-calculator`;
            } else {
                const calc = waterCalculation.value;
                text = `💧 [វិក្កយបត្រទឹកស្អាតរដ្ឋាករទឹក PPWSA - ប៉ាន់ស្មាន]\nកាលបរិច្ឆេទ៖ ${dateStr}\nការប្រើប្រាស់៖ ${calculatedWaterM3.value} m³\nថ្លៃទឹកសរុប (រួមទឹកស្អុយ+ថែទាំ)៖ ${formatNumber(calc.grandTotalRiel)} ៛ ($${calc.grandTotalUsd.toFixed(2)})\nគណនាតាម https://ngoytry-lyhuor.vercel.app/utility-calculator`;
            }

            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(text);
                    copiedReceipt.value = type;
                    setTimeout(() => {
                        copiedReceipt.value = null;
                    }, 2500);
                }
            } catch (e) {
                console.error('Failed to copy receipt:', e);
            }
        };

        const printReceipt = () => {
            if (typeof window !== 'undefined') {
                window.print();
            }
        };

        return {
            isKhmer,
            activeTab,
            availableTabs,
            currencyMode,
            exchangeRate,
            copiedReceipt,
            electricityCategories,
            waterCategories,
            savingTips,
            // Electricity
            elecInputMode,
            elecCategory,
            elecMeterPrev,
            elecMeterCurr,
            elecDirectKwh,
            calculatedElecKwh,
            elecCalculation,
            isRentalRoom,
            landlordRate,
            landlordOvercharge,
            // Water
            waterInputMode,
            waterCategory,
            waterMeterPrev,
            waterMeterCurr,
            waterDirectM3,
            calculatedWaterM3,
            waterCalculation,
            // Appliances
            applianceList,
            calculateApplianceMonthlyKwh,
            calculateApplianceMonthlyRiel,
            applianceTotalKwh,
            applianceTotalRiel,
            applianceTotalUsd,
            // Helpers
            formatNumber,
            copyReceipt,
            printReceipt
        };
    }
};
</script>

<style scoped>
@media print {
    body * {
        visibility: hidden;
    }
    .border {
        border-color: #cbd5e1 !important;
    }
}
</style>
