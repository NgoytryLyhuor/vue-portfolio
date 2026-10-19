<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero HUD Section (Modern Tech Architectural with subtle rounded corners) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ក្រសួងពាណិជ្ជកម្មកម្ពុជា (MOC) • សេចក្តីប្រកាសតម្លៃប្រេងផ្លូវការ' : 'CAMBODIA MINISTRY OF COMMERCE (MOC) • OFFICIAL FUEL TARIFF' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {{ isKhmer ? 'វដ្តតម្លៃ៖ ១០ ថ្ងៃម្តង' : '10-DAY TARIFF CYCLE' }}
                        </span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">{{ isKhmer ? 'បច្ចុប្បន្នភាពឆ្នាំ ២០២៦' : 'UPDATED 2026' }}</span>
                    </div>
                </div>

                <div class="pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                                {{ isKhmer ? 'តម្លៃប្រេងឥន្ធនៈលក់រាយនៅកម្ពុជា' : 'CAMBODIA RETAIL FUEL CEILING' }}
                            </div>
                            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'តាមដានតម្លៃប្រេងសាំងផ្លូវការ & គណនាថ្លៃធ្វើដំណើរ' : 'Cambodia Fuel Price Tracker & Road Trip Calculator' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'តារាងតម្លៃប្រេងសាំងធម្មតា ស៊ុបពែរ និងម៉ាស៊ូត ដែលចេញដោយក្រសួងពាណិជ្ជកម្ម រៀងរាល់ ១០ ថ្ងៃម្តង (ថ្ងៃទី ១, ១១, ២១) រួមជាមួយម៉ាស៊ីនគណនាថ្លៃសាំងធ្វើដំណើរតាមបណ្តាខេត្ត និងស្ថានីយប្រេងទូទាំងប្រទេស។' 
                                    : 'Real-time retail price ceiling for Regular EA92, Super EA95, and Diesel DO regulated by the Ministry of Commerce every 10 days, paired with an interactive Cambodia highway fuel cost calculator.' }}
                            </p>
                        </div>

                        <!-- Current Cycle Status Card -->
                        <div class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'វដ្តតម្លៃបច្ចុប្បន្ន' : 'Current Tariff Cycle' }}
                                </span>
                                <span class="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                    {{ isKhmer ? 'មានសុពលភាព' : 'Active' }}
                                </span>
                            </div>
                            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
                                {{ currentCycleDates }}
                            </div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800">
                                <span>{{ isKhmer ? 'កាលបរិច្ឆេទប្រកាសបន្ទាប់៖' : 'Next Revision Date:' }}</span>
                                <span class="font-bold font-mono text-blue-600 dark:text-blue-400">{{ nextRevisionDate }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Sub-tabs -->
                    <div class="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                        <button v-for="tab in tabs" :key="tab.id"
                            @click="activeTab = tab.id"
                            class="px-3.5 py-2 text-xs font-mono uppercase font-bold tracking-wider border rounded-lg transition-all flex items-center gap-2"
                            :class="activeTab === tab.id 
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white' 
                                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'">
                            <span>{{ tab.icon }}</span>
                            <span>{{ isKhmer ? tab.labelKhmer : tab.labelEn }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- TAB 1: OFFICIAL CURRENT FUEL PRICES & TREND (តម្លៃផ្លូវការបច្ចុប្បន្ន) -->
            <div v-show="activeTab === 'prices'" class="space-y-6 sm:space-y-8">
                <!-- 3 Top Fuel Price Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <!-- Regular Gasoline (EA92) -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                                    92
                                </span>
                                <div>
                                    <div class="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Regular Gas</div>
                                    <h3 class="text-base font-black text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'សាំងធម្មតា (EA92)' : 'Regular EA92' }}
                                    </h3>
                                </div>
                            </div>
                            <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                {{ isKhmer ? 'ពេញនិយមបំផុត' : 'Most Popular' }}
                            </span>
                        </div>

                        <div class="py-2 border-y border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                            <div>
                                <span class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(fuelPrices.regular.khr)) : formatKhr(fuelPrices.regular.khr) }}
                                </span>
                                <span class="text-sm font-bold text-slate-500 ml-1">៛ / {{ isKhmer ? 'លីត្រ' : 'L' }}</span>
                            </div>
                            <div class="text-right">
                                <div class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                                    ${{ fuelPrices.regular.usd.toFixed(2) }} / L
                                </div>
                                <div class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                                    <span>▼</span>
                                    <span>{{ isKhmer ? toKhmerNumeral(50) + ' ៛ (-1.2%)' : '-50 KHR (-1.2%)' }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer 
                                ? 'សមស្របសម្រាប់រថយន្តទូទៅដូចជា Prius 04-15, Vios, Camry, Morning, និងម៉ូតូស្ទើរគ្រប់ប្រភេទ។ កម្រិតអុកតាន 92 គ្រប់គ្រាន់ និងសន្សំសំចៃ។' 
                                : 'Ideal for Prius 2004-2015, Vios, Camry, Morning, and motorcycles. 92 octane standard provides solid combustion efficiency.' }}
                        </div>
                    </div>

                    <!-- Super Gasoline (EA95) -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 hover:border-amber-500 dark:hover:border-amber-500 transition-all">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                                    95
                                </span>
                                <div>
                                    <div class="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Super Gas</div>
                                    <h3 class="text-base font-black text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'សាំងស៊ុបពែរ (EA95)' : 'Super EA95' }}
                                    </h3>
                                </div>
                            </div>
                            <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                {{ isKhmer ? 'កម្រិតខ្ពស់' : 'Premium' }}
                            </span>
                        </div>

                        <div class="py-2 border-y border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                            <div>
                                <span class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(fuelPrices.super.khr)) : formatKhr(fuelPrices.super.khr) }}
                                </span>
                                <span class="text-sm font-bold text-slate-500 ml-1">៛ / {{ isKhmer ? 'លីត្រ' : 'L' }}</span>
                            </div>
                            <div class="text-right">
                                <div class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                                    ${{ fuelPrices.super.usd.toFixed(2) }} / L
                                </div>
                                <div class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-0.5">
                                    <span>▼</span>
                                    <span>{{ isKhmer ? toKhmerNumeral(50) + ' ៛ (-1.0%)' : '-50 KHR (-1.0%)' }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer 
                                ? 'សមស្របសម្រាប់រថយន្តទំនើប ម៉ាស៊ីន Turbo ឬ Compression ខ្ពស់ ដូចជា Lexus, BMW, Mercedes, Ford Ranger Turbo, Highlander ជំនាន់ថ្មី។' 
                                : 'Formulated for high-compression and turbocharged powerplants: Lexus, BMW, Mercedes-Benz, Ford Ranger Turbo, and new SUVs.' }}
                        </div>
                    </div>

                    <!-- Diesel (DO 50ppm) -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                                    DO
                                </span>
                                <div>
                                    <div class="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Diesel 50ppm</div>
                                    <h3 class="text-base font-black text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'ប្រេងម៉ាស៊ូត (DO 50ppm)' : 'Diesel DO 50ppm' }}
                                    </h3>
                                </div>
                            </div>
                            <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                {{ isKhmer ? 'សន្សំសំចៃ' : 'Heavy Duty' }}
                            </span>
                        </div>

                        <div class="py-2 border-y border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                            <div>
                                <span class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(fuelPrices.diesel.khr)) : formatKhr(fuelPrices.diesel.khr) }}
                                </span>
                                <span class="text-sm font-bold text-slate-500 ml-1">៛ / {{ isKhmer ? 'លីត្រ' : 'L' }}</span>
                            </div>
                            <div class="text-right">
                                <div class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                                    ${{ fuelPrices.diesel.usd.toFixed(2) }} / L
                                </div>
                                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-end gap-0.5">
                                    <span>—</span>
                                    <span>{{ isKhmer ? 'ថេរ (0%)' : 'Stable (0%)' }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer 
                                ? 'សមស្របសម្រាប់រថយន្តភីកអាប់ (Ford Ranger, Toyota Hilux, Isuzu D-Max), រថយន្តដឹកទំនិញ ឡានក្រុង និងគ្រឿងចក្រធុនធ្ងន់។' 
                                : 'Tailored for diesel pickups (Ford Ranger, Toyota Hilux, Isuzu D-Max), logistics haulers, buses, and commercial heavy trucks.' }}
                        </div>
                    </div>
                </div>

                <!-- MoC Price Ceiling Formula & Government Subsidy Notice -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="text-xl">🏛️</span>
                        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            {{ isKhmer ? 'របៀបដែលរាជរដ្ឋាភិបាលកម្ពុជាកំណត់តម្លៃប្រេងលក់រាយ' : 'How the Royal Government of Cambodia Regulates Fuel Tariffs' }}
                        </h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1.5">
                            <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                {{ isKhmer ? '១. វដ្តតម្លៃ ១០ ថ្ងៃម្តង' : '1. 10-Day Formula Cycle' }}
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ក្រសួងពាណិជ្ជកម្មគណនា និងប្រកាសតម្លៃពិដានរៀងរាល់ ១០ ថ្ងៃម្តង នៅថ្ងៃទី ០១, ថ្ងៃទី ១១ និងថ្ងៃទី ២១ នៃខែនីមួយៗ ដោយផ្អែកលើតម្លៃជាមធ្យមនៃទីផ្សារអន្តរជាតិសិង្ហបុរី (MOPS Platts)។' 
                                    : 'Recalculated on the 1st, 11th, and 21st of every month based on average Singapore Platts (MOPS) international oil prices.' }}
                            </p>
                        </div>

                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1.5">
                            <div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                {{ isKhmer ? '២. ការឧបត្ថម្ភធនរបស់រាជរដ្ឋាភិបាល' : '2. Government Fuel Subsidy' }}
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer 
                                    ? 'រាជរដ្ឋាភិបាលកម្ពុជាបន្តជួយសម្រួលបន្ទុកជីវភាពពលរដ្ឋ ដោយផ្តល់ការឧបត្ថម្ភធនបញ្ចុះតម្លៃ ៤ សេន/លីត្រ និងសហការជាមួយក្រុមហ៊ុនប្រេងឧបត្ថម្ភបន្ថែម ២.៥ សេន (សរុប ៦.៥ សេនដុល្លារ/លីត្រ)។' 
                                    : 'A state-backed price relief of $0.04/L plus $0.025/L corporate concession reduces local retail prices by $0.065/L below market parity.' }}
                            </p>
                        </div>

                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1.5">
                            <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                                {{ isKhmer ? '៣. ការផាកពិន័យបើលក់លើស' : '3. Ceiling Price Enforcement' }}
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer 
                                    ? 'គ្រប់ស្ថានីយប្រេងឥន្ធនៈទាំងអស់នៅកម្ពុជា មិនត្រូវបានអនុញ្ញាតឱ្យលក់លើសពីតម្លៃពិដាននេះឡើយ។ ស្ថានីយណាដែលលក់លើស នឹងត្រូវរងការពិន័យតាមច្បាប់ពីអគ្គនាយកដ្ឋាន ក.ប.ប. (CCF)។' 
                                    : 'No gas station may charge above the MoC ceiling. Stations selling above tariff face legal penalties from the CCF Directorate General.' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Recent Historical Fuel Cycles Table -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">📊</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                {{ isKhmer ? 'ប្រវត្តិតម្លៃប្រេង ៦ វដ្តចុងក្រោយ (ក្រសួងពាណិជ្ជកម្ម)' : 'Historical 6-Cycle MoC Tariff Trend' }}
                            </h3>
                        </div>
                        <span class="text-xs font-mono text-slate-400 uppercase">
                            {{ isKhmer ? 'គិតជារៀល/លីត្រ' : 'KHR / Liter' }}
                        </span>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-xs font-mono">
                            <thead>
                                <tr class="text-slate-400 border-b border-slate-200 dark:border-slate-800 text-left">
                                    <th class="py-2.5 px-3 uppercase font-bold">{{ isKhmer ? 'វដ្តកាលបរិច្ឆេទ' : 'Cycle Period' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-blue-600 dark:text-blue-400">{{ isKhmer ? 'សាំងធម្មតា (EA92)' : 'Regular EA92' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-amber-600 dark:text-amber-400">{{ isKhmer ? 'សាំងស៊ុបពែរ (EA95)' : 'Super EA95' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-emerald-600 dark:text-emerald-400">{{ isKhmer ? 'ម៉ាស៊ូត (DO)' : 'Diesel DO' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-right">{{ isKhmer ? 'ស្ថានភាព' : 'Status' }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                <tr v-for="cycle in historicalCycles" :key="cycle.period" 
                                    :class="cycle.isCurrent ? 'bg-blue-50/50 dark:bg-blue-950/20 font-bold' : ''">
                                    <td class="py-3 px-3 flex items-center gap-2">
                                        <span v-if="cycle.isCurrent" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                        <span>{{ isKhmer ? cycle.periodKhmer : cycle.periodEn }}</span>
                                    </td>
                                    <td class="py-3 px-3">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(cycle.regular)) : formatKhr(cycle.regular) }} ៛
                                    </td>
                                    <td class="py-3 px-3">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(cycle.super)) : formatKhr(cycle.super) }} ៛
                                    </td>
                                    <td class="py-3 px-3">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(cycle.diesel)) : formatKhr(cycle.diesel) }} ៛
                                    </td>
                                    <td class="py-3 px-3 text-right">
                                        <span v-if="cycle.isCurrent" class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                            {{ isKhmer ? 'បច្ចុប្បន្ន' : 'Current' }}
                                        </span>
                                        <span v-else class="text-slate-400 text-[10px]">
                                            {{ isKhmer ? 'ផុតកំណត់' : 'Archived' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 2: INTERACTIVE ROAD TRIP FUEL COST CALCULATOR (ម៉ាស៊ីនគណនាថ្លៃសាំងធ្វើដំណើរ) -->
            <div v-show="activeTab === 'calc'" class="space-y-6 sm:space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    
                    <!-- Left Column: Route Selection & Specs Inputs -->
                    <div class="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="text-2xl">🗺️</span>
                                <span>{{ isKhmer ? 'ម៉ាស៊ីនគណនាថ្លៃប្រេងធ្វើដំណើរតាមផ្លូវជាតិ' : 'Cambodia Road Trip Fuel Calculator' }}</span>
                            </h2>
                            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ជ្រើសរើសផ្លូវជាតិ ឬកំណត់ចម្ងាយផ្ទាល់ខ្លួន ដើម្បីដឹងបរិមាណលីត្រ និងថ្លៃសាំងសរុប' : 'Select a national route or custom distance to calculate exact fuel volume and trip costs.' }}
                            </p>
                        </div>

                        <!-- 1. Route Selector Presets -->
                        <div class="space-y-2">
                            <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? '១. ជ្រើសរើសគោលដៅធ្វើដំណើរ (Route Preset)' : '1. Select Travel Destination Route' }}
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button v-for="route in popularRoutes" :key="route.id"
                                    @click="selectRoute(route)"
                                    class="p-3 text-left border rounded-xl transition-all flex items-center justify-between group"
                                    :class="selectedRouteId === route.id
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'">
                                    <div>
                                        <div class="text-xs font-bold">{{ isKhmer ? route.nameKhmer : route.nameEn }}</div>
                                        <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400">{{ route.highway }}</div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                            {{ isKhmer ? toKhmerNumeral(route.distanceKm) : route.distanceKm }} km
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <!-- Custom Distance Input Option -->
                            <div class="pt-2 flex items-center gap-3">
                                <label class="text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0">
                                    {{ isKhmer ? 'ឬកំណត់ចម្ងាយផ្ទាល់ខ្លួន (km)៖' : 'Or Custom Distance (km):' }}
                                </label>
                                <input v-model.number="customDistanceKm" type="number" min="1" max="5000"
                                    class="w-32 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 150" />
                                <span class="text-xs text-slate-400 font-mono">km</span>
                            </div>
                        </div>

                        <!-- 2. Vehicle Model / Fuel Consumption Selector -->
                        <div class="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? '២. ប្រភេទរថយន្ត & កម្រិតស៊ីប្រេង (L/100km)' : '2. Vehicle Type & Fuel Consumption (L/100km)' }}
                            </label>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <button v-for="car in vehicleConsumptionPresets" :key="car.id"
                                    @click="selectedVehiclePreset = car.id; customConsumption = car.litersPer100km"
                                    class="p-2.5 text-left border rounded-xl transition-all"
                                    :class="selectedVehiclePreset === car.id
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'">
                                    <div class="text-base mb-1">{{ car.icon }}</div>
                                    <div class="text-xs font-bold truncate">{{ isKhmer ? car.nameKhmer : car.nameEn }}</div>
                                    <div class="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                                        {{ car.litersPer100km }} L / 100km
                                    </div>
                                </button>
                            </div>

                            <!-- Custom Consumption -->
                            <div class="pt-2 flex items-center gap-3">
                                <label class="text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0">
                                    {{ isKhmer ? 'កែសម្រួលកម្រិតស៊ីប្រេងជាក់ស្តែង៖' : 'Fine-tune fuel consumption:' }}
                                </label>
                                <input v-model.number="customConsumption" type="number" step="0.1" min="1" max="30"
                                    class="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <span class="text-xs text-slate-400 font-mono">L/100km ({{ kmPerLiter }} km/L)</span>
                            </div>
                        </div>

                        <!-- 3. Fuel Type Selection & Trip Options -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <!-- Fuel Type Choice -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    {{ isKhmer ? '៣. ប្រភេទប្រេងឥន្ធនៈ' : '3. Fuel Type' }}
                                </label>
                                <div class="grid grid-cols-3 gap-1.5">
                                    <button @click="selectedFuelType = 'regular'"
                                        class="py-2 px-1 text-center border rounded-lg text-xs font-bold transition-all"
                                        :class="selectedFuelType === 'regular'
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ isKhmer ? 'ធម្មតា EA92' : 'EA92' }}
                                    </button>
                                    <button @click="selectedFuelType = 'super'"
                                        class="py-2 px-1 text-center border rounded-lg text-xs font-bold transition-all"
                                        :class="selectedFuelType === 'super'
                                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ isKhmer ? 'ស៊ុបពែរ EA95' : 'EA95' }}
                                    </button>
                                    <button @click="selectedFuelType = 'diesel'"
                                        class="py-2 px-1 text-center border rounded-lg text-xs font-bold transition-all"
                                        :class="selectedFuelType === 'diesel'
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ isKhmer ? 'ម៉ាស៊ូត' : 'Diesel' }}
                                    </button>
                                </div>
                            </div>

                            <!-- Trip Direction (One-Way vs Round-Trip) -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    {{ isKhmer ? '៤. ទម្រង់ធ្វើដំណើរ' : '4. Direction' }}
                                </label>
                                <div class="grid grid-cols-2 gap-1.5">
                                    <button @click="isRoundTrip = false"
                                        class="py-2 text-center border rounded-lg text-xs font-bold transition-all"
                                        :class="!isRoundTrip
                                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ isKhmer ? 'ទៅមួយជើង (1 Way)' : 'One-way' }}
                                    </button>
                                    <button @click="isRoundTrip = true"
                                        class="py-2 text-center border rounded-lg text-xs font-bold transition-all"
                                        :class="isRoundTrip
                                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ isKhmer ? 'ទៅ-មក (Round-trip)' : 'Round-trip' }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 4. Passengers & Expressway Toll Checkbox -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <!-- Passenger Split -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    {{ isKhmer ? 'ចែកគ្នាចេញថ្លៃសាំង (ចំនួនអ្នកជិះ)' : 'Split with Passengers' }}
                                </label>
                                <div class="flex items-center gap-2">
                                    <button v-for="count in [1, 2, 3, 4, 5]" :key="count"
                                        @click="passengerCount = count"
                                        class="w-9 h-8 border rounded-lg text-xs font-bold transition-all"
                                        :class="passengerCount === count
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'">
                                        {{ count }}
                                    </button>
                                </div>
                            </div>

                            <!-- Expressway Toll Inclusion -->
                            <div v-if="selectedRouteId === 'pp_sihanoukville'" class="flex items-center gap-2 pt-4">
                                <input id="tollCheck" v-model="includeExpresswayToll" type="checkbox"
                                    class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700" />
                                <label for="tollCheck" class="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                                    {{ isKhmer ? 'បូកសោហ៊ុយផ្លូវល្បឿនលឿន ($12/ជើង)' : 'Include Expressway Toll ($12/way)' }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Calculation Summary Card -->
                    <div class="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                        <div class="border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl space-y-5">
                            <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                    <div class="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                                        {{ isKhmer ? 'សង្ខេបការគណនា' : 'CALCULATION SUMMARY' }}
                                    </div>
                                    <h3 class="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                                        {{ isKhmer ? 'ថ្លៃប្រេងសរុបសម្រាប់ការធ្វើដំណើរ' : 'Total Road Trip Cost' }}
                                    </h3>
                                </div>
                                <span class="text-3xl">⛽</span>
                            </div>

                            <!-- Big Output -->
                            <div class="space-y-1">
                                <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'ថ្លៃសាំងសរុប (រៀល & ដុល្លារ)៖' : 'Total Fuel Cost:' }}
                                </div>
                                <div class="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(calculatedTripCostKhr)) : formatKhr(calculatedTripCostKhr) }} ៛
                                </div>
                                <div class="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
                                    ≈ ${{ calculatedTripCostUsd.toFixed(2) }} USD
                                </div>
                            </div>

                            <!-- Detail Specs Breakdown List -->
                            <div class="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'ចម្ងាយសរុប៖' : 'Total Distance:' }}</span>
                                    <span class="font-bold text-slate-800 dark:text-slate-200">
                                        {{ isKhmer ? toKhmerNumeral(totalTripDistanceKm) : totalTripDistanceKm }} km 
                                        ({{ isRoundTrip ? (isKhmer ? 'ទៅ-មក' : 'Round-trip') : (isKhmer ? 'មួយជើង' : 'One-way') }})
                                    </span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'បរិមាណប្រេងត្រូវការ៖' : 'Fuel Needed:' }}</span>
                                    <span class="font-bold text-blue-600 dark:text-blue-400">
                                        {{ isKhmer ? toKhmerNumeral(calculatedFuelLiters.toFixed(1)) : calculatedFuelLiters.toFixed(1) }} {{ isKhmer ? 'លីត្រ' : 'Liters' }}
                                    </span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'ប្រភេទប្រេង & តម្លៃ៖' : 'Fuel Price:' }}</span>
                                    <span class="font-bold text-slate-800 dark:text-slate-200">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(unitFuelPriceKhr)) : formatKhr(unitFuelPriceKhr) }} ៛/L
                                    </span>
                                </div>

                                <div v-if="expresswayTollCostUsd > 0" class="flex justify-between text-amber-600 dark:text-amber-400">
                                    <span>{{ isKhmer ? 'សោហ៊ុយល្បឿនលឿន៖' : 'Expressway Toll:' }}</span>
                                    <span class="font-bold">${{ expresswayTollCostUsd }} USD</span>
                                </div>

                                <!-- Cost per person -->
                                <div v-if="passengerCount > 1" class="flex justify-between pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                                    <span>{{ isKhmer ? 'ម្នាក់ចេញត្រឹមតែ (' + toKhmerNumeral(passengerCount) + ' នាក់)៖' : 'Per Person (' + passengerCount + ' pax):' }}</span>
                                    <span>${{ costPerPassengerUsd.toFixed(2) }} ({{ isKhmer ? toKhmerNumeral(formatKhr(costPerPassengerKhr)) : formatKhr(costPerPassengerKhr) }} ៛)</span>
                                </div>
                            </div>

                            <!-- Helpful Notice Box -->
                            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                                <div class="font-bold text-slate-700 dark:text-slate-300">
                                    💡 {{ isKhmer ? 'ចំណាំពីការស៊ីសាំងជាក់ស្តែង៖' : 'Driving Conditions Note:' }}
                                </div>
                                <p>
                                    {{ isKhmer 
                                        ? 'ការបើកម៉ាស៊ីនត្រជាក់ខ្លាំង ការផ្ទុកទម្ងន់ធ្ងន់ និងការវ៉ាជែងញឹកញាប់លើផ្លូវជាតិ អាចបង្កើនការស៊ីប្រេងពី ១០% ទៅ ២០% លើសពីការគណនាទ្រឹស្តី។' 
                                        : 'Heavy AC usage, payload, and rapid overtaking on provincial highways can increase real consumption by 10-20%.' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 3: GAS STATIONS GUIDE (ស្ថានីយប្រេងឥន្ធនៈធំៗនៅកម្ពុជា) -->
            <div v-show="activeTab === 'stations'" class="space-y-6 sm:space-y-8">
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-3">
                    <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="text-2xl">🏪</span>
                        <span>{{ isKhmer ? 'បណ្តាញស្ថានីយប្រេងឥន្ធនៈឈានមុខគេនៅកម្ពុជា' : 'Leading Fuel Station Networks in Cambodia' }}</span>
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {{ isKhmer 
                            ? 'ការប្រៀបធៀបគុណភាពប្រេង ប្រព័ន្ធសន្សំពិន្ទុ ហាងទំនិញ និងសេវាកម្មបន្ទប់ទឹកនៅតាមបណ្តាស្ថានីយប្រេងល្បីៗទូទាំង ២៥ រាជធានី-ខេត្ត។' 
                            : 'Guide to major national and international retail fuel brands in Cambodia, including fuel additives, convenience stores, and loyalty programs.' }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div v-for="station in stationNetworks" :key="station.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between">
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2.5">
                                    <span class="text-2xl">{{ station.badge }}</span>
                                    <div>
                                        <h3 class="text-base font-black text-slate-900 dark:text-white">{{ station.name }}</h3>
                                        <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400">{{ station.origin }}</div>
                                    </div>
                                </div>
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {{ station.stationCount }}
                                </span>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? station.descKhmer : station.descEn }}
                            </p>

                            <!-- Highlights Badges -->
                            <div class="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div class="text-[10px] font-mono font-bold uppercase text-slate-400">
                                    {{ isKhmer ? 'ចំណុចលេចធ្លោ & សេវាកម្ម' : 'Key Amenities & Features' }}
                                </div>
                                <div class="flex flex-wrap gap-1.5">
                                    <span v-for="tag in (isKhmer ? station.tagsKhmer : station.tagsEn)" :key="tag"
                                        class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {{ isKhmer ? station.perkKhmer : station.perkEn }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 4: FUEL ECONOMY TIPS (គន្លឹះបើកបរសន្សំសំចៃប្រេង) -->
            <div v-show="activeTab === 'tips'" class="space-y-6 sm:space-y-8">
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-3">
                    <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="text-2xl">💡</span>
                        <span>{{ isKhmer ? 'គន្លឹះបច្ចេកទេសបើកបរសន្សំប្រេងនៅកម្ពុជា' : 'Engineering Guide: Maximizing Fuel Economy in Cambodia' }}</span>
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {{ isKhmer 
                            ? 'វិធីសាស្ត្រជាក់ស្តែងដែលត្រូវបានបញ្ជាក់ដោយវិស្វករយានយន្ត ជួយកាត់បន្ថយការចំណាយលើប្រេងសាំងរហូតដល់ ២០-៣០% ទាំងក្នុងក្រុង និងផ្លូវជាតិ។' 
                            : 'Scientifically validated driving habits and maintenance steps that cut fuel expenses by 20–30% in Cambodia traffic and highway conditions.' }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div v-for="tip in fuelSavingTips" :key="tip.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-3">
                        <div class="flex items-center gap-3">
                            <span class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                                {{ tip.icon }}
                            </span>
                            <div>
                                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? tip.titleKhmer : tip.titleEn }}
                                </h3>
                                <div class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                                    {{ isKhmer ? tip.savingsKhmer : tip.savingsEn }}
                                </div>
                            </div>
                        </div>

                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer ? tip.descKhmer : tip.descEn }}
                        </p>

                        <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-mono">
                            {{ isKhmer ? tip.actionKhmer : tip.actionEn }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const { isKhmer } = useLanguage();

// Tabs state
const activeTab = ref('prices');

const tabs = [
    { id: 'prices', icon: '⛽', labelKhmer: 'តម្លៃប្រេងផ្លូវការបច្ចុប្បន្ន', labelEn: 'Official Current Tariff' },
    { id: 'calc', icon: '🗺️', labelKhmer: 'ម៉ាស៊ីនគណនាថ្លៃធ្វើដំណើរ', labelEn: 'Road Trip Fuel Calculator' },
    { id: 'stations', icon: '🏪', labelKhmer: 'ស្ថានីយប្រេងធំៗនៅកម្ពុជា', labelEn: 'Gas Station Networks' },
    { id: 'tips', icon: '💡', labelKhmer: 'គន្លឹះសន្សំសំចៃប្រេង', labelEn: 'Fuel Economy Tips' }
];

// Khmer Numerals Helper
const toKhmerNumeral = (num) => {
    if (num === null || num === undefined) return '';
    const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    return String(num).replace(/[0-9]/g, (digit) => khmerDigits[parseInt(digit, 10)]);
};

const formatKhr = (val) => {
    if (val === null || val === undefined || isNaN(val)) return '0';
    return Number(val).toLocaleString('en-US');
};

// Current Official MoC Fuel Prices (KHR & USD)
const fuelPrices = ref({
    regular: { khr: 4050, usd: 1.01 },
    super: { khr: 4700, usd: 1.17 },
    diesel: { khr: 3950, usd: 0.98 }
});

// Calculate current cycle dates dynamically
const currentCycleDates = computed(() => {
    const now = new Date();
    const day = now.getDate();
    const monthKhmer = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'][now.getMonth()];
    const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.getMonth()];
    const year = now.getFullYear();

    if (day <= 10) {
        return isKhmer.value ? `០១ – ១០ ${monthKhmer} ${toKhmerNumeral(year)}` : `01 – 10 ${monthEn} ${year}`;
    } else if (day <= 20) {
        return isKhmer.value ? `១១ – ២០ ${monthKhmer} ${toKhmerNumeral(year)}` : `11 – 20 ${monthEn} ${year}`;
    } else {
        const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
        return isKhmer.value ? `២១ – ${toKhmerNumeral(lastDay)} ${monthKhmer} ${toKhmerNumeral(year)}` : `21 – ${lastDay} ${monthEn} ${year}`;
    }
});

const nextRevisionDate = computed(() => {
    const now = new Date();
    const day = now.getDate();
    const monthKhmer = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'][now.getMonth()];
    const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.getMonth()];
    
    if (day <= 10) {
        return isKhmer.value ? `១១ ${monthKhmer}` : `11th ${monthEn}`;
    } else if (day <= 20) {
        return isKhmer.value ? `២១ ${monthKhmer}` : `21st ${monthEn}`;
    } else {
        const nextMonthIdx = (now.getMonth() + 1) % 12;
        const nextMonthKhmer = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'][nextMonthIdx];
        const nextMonthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][nextMonthIdx];
        return isKhmer.value ? `០១ ${nextMonthKhmer}` : `1st ${nextMonthEn}`;
    }
});

// Recent Historical MoC Cycles Table Data
const historicalCycles = [
    { period: 'current', periodKhmer: '១១ ដល់ ២០ មេសា ២០២៦', periodEn: 'Apr 11 – 20, 2026', regular: 4050, super: 4700, diesel: 3950, isCurrent: true },
    { period: 'c2', periodKhmer: '០១ ដល់ ១០ មេសា ២០២៦', periodEn: 'Apr 01 – 10, 2026', regular: 4100, super: 4750, diesel: 3950, isCurrent: false },
    { period: 'c3', periodKhmer: '២១ ដល់ ៣១ មីនា ២០២៦', periodEn: 'Mar 21 – 31, 2026', regular: 4150, super: 4800, diesel: 4000, isCurrent: false },
    { period: 'c4', periodKhmer: '១១ ដល់ ២០ មីនា ២០២៦', periodEn: 'Mar 11 – 20, 2026', regular: 4150, super: 4800, diesel: 4050, isCurrent: false },
    { period: 'c5', periodKhmer: '០១ ដល់ ១០ មីនា ២០២៦', periodEn: 'Mar 01 – 10, 2026', regular: 4200, super: 4850, diesel: 4100, isCurrent: false },
    { period: 'c6', periodKhmer: '២១ ដល់ ២៨ កុម្ភៈ ២០២៦', periodEn: 'Feb 21 – 28, 2026', regular: 4100, super: 4750, diesel: 4000, isCurrent: false }
];

// Interactive Calculator State
const selectedRouteId = ref('pp_siemreap');
const customDistanceKm = ref(314);
const selectedVehiclePreset = ref('prius');
const customConsumption = ref(4.5);
const selectedFuelType = ref('regular');
const isRoundTrip = ref(false);
const passengerCount = ref(1);
const includeExpresswayToll = ref(false);

const popularRoutes = [
    { id: 'pp_siemreap', nameKhmer: 'ភ្នំពេញ ↔ សៀមរាប', nameEn: 'Phnom Penh ↔ Siem Reap', highway: 'ផ្លូវជាតិលេខ ៦ (NR6)', distanceKm: 314 },
    { id: 'pp_sihanoukville', nameKhmer: 'ភ្នំពេញ ↔ ព្រះសីហនុ', nameEn: 'Phnom Penh ↔ Sihanoukville', highway: 'ផ្លូវល្បឿនលឿន (Expressway)', distanceKm: 187 },
    { id: 'pp_kampot', nameKhmer: 'ភ្នំពេញ ↔ កំពត', nameEn: 'Phnom Penh ↔ Kampot', highway: 'ផ្លូវជាតិលេខ ៣ (NR3)', distanceKm: 148 },
    { id: 'pp_battambang', nameKhmer: 'ភ្នំពេញ ↔ បាត់ដំបង', nameEn: 'Phnom Penh ↔ Battambang', highway: 'ផ្លូវជាតិលេខ ៥ (NR5)', distanceKm: 291 },
    { id: 'pp_mondulkiri', nameKhmer: 'ភ្នំពេញ ↔ មណ្ឌលគិរី', nameEn: 'Phnom Penh ↔ Mondulkiri', highway: 'ផ្លូវជាតិលេខ ៧ & ៧៦', distanceKm: 375 },
    { id: 'pp_kep', nameKhmer: 'ភ្នំពេញ ↔ កែប', nameEn: 'Phnom Penh ↔ Kep', highway: 'ផ្លូវជាតិលេខ ៣៣', distanceKm: 165 },
    { id: 'pp_kohkong', nameKhmer: 'ភ្នំពេញ ↔ កោះកុង', nameEn: 'Phnom Penh ↔ Koh Kong', highway: 'ផ្លូវជាតិលេខ ៤ & ៤៨', distanceKm: 290 },
    { id: 'city_commute', nameKhmer: 'ជិះធ្វើការក្នុងក្រុង (១ ខែ)', nameEn: 'Monthly City Commute', highway: 'រាជធានីភ្នំពេញ', distanceKm: 350 }
];

const vehicleConsumptionPresets = [
    { id: 'prius', icon: '🔋', nameKhmer: 'Toyota Prius (Hybrid)', nameEn: 'Toyota Prius (Hybrid)', litersPer100km: 4.5 },
    { id: 'eco_sedan', icon: '🚗', nameKhmer: 'Vios / Morning / Swift', nameEn: 'Eco Sedan / City Car', litersPer100km: 6.0 },
    { id: 'mid_sedan', icon: '🚘', nameKhmer: 'Camry / Accord / Mazda', nameEn: 'Mid-size Sedan', litersPer100km: 7.5 },
    { id: 'crossover', icon: '🚙', nameKhmer: 'Corolla Cross / RAV4', nameEn: 'Crossover Hybrid / SUV', litersPer100km: 5.5 },
    { id: 'large_suv', icon: '🏔️', nameKhmer: 'Highlander / RX330 / Prado', nameEn: 'Full-size SUV', litersPer100km: 10.5 },
    { id: 'pickup', icon: '🛻', nameKhmer: 'Ford Ranger / Hilux (Diesel)', nameEn: 'Pickup Truck (Diesel)', litersPer100km: 8.5 },
    { id: 'moto', icon: '🏍️', nameKhmer: 'ម៉ូតូ (Scoopy / Click / Wave)', nameEn: 'Motorcycle / Scooter', litersPer100km: 2.2 }
];

const selectRoute = (route) => {
    selectedRouteId.value = route.id;
    customDistanceKm.value = route.distanceKm;
    if (route.id === 'pp_sihanoukville') {
        includeExpresswayToll.value = true;
    } else {
        includeExpresswayToll.value = false;
    }
};

// Computed Calculator Outputs
const kmPerLiter = computed(() => {
    if (!customConsumption.value || customConsumption.value <= 0) return 0;
    return (100 / customConsumption.value).toFixed(1);
});

const totalTripDistanceKm = computed(() => {
    const base = customDistanceKm.value || 0;
    return isRoundTrip.value ? base * 2 : base;
});

const calculatedFuelLiters = computed(() => {
    const distance = totalTripDistanceKm.value;
    const rate = customConsumption.value || 5.0;
    return (distance / 100) * rate;
});

const unitFuelPriceKhr = computed(() => {
    return fuelPrices.value[selectedFuelType.value]?.khr || 4050;
});

const unitFuelPriceUsd = computed(() => {
    return fuelPrices.value[selectedFuelType.value]?.usd || 1.01;
});

const expresswayTollCostUsd = computed(() => {
    if (selectedRouteId.value === 'pp_sihanoukville' && includeExpresswayToll.value) {
        return isRoundTrip.value ? 24 : 12;
    }
    return 0;
});

const calculatedTripCostKhr = computed(() => {
    const fuelCost = calculatedFuelLiters.value * unitFuelPriceKhr.value;
    const tollKhr = expresswayTollCostUsd.value * 4000;
    return Math.round(fuelCost + tollKhr);
});

const calculatedTripCostUsd = computed(() => {
    const fuelCost = calculatedFuelLiters.value * unitFuelPriceUsd.value;
    return fuelCost + expresswayTollCostUsd.value;
});

const costPerPassengerUsd = computed(() => {
    const count = passengerCount.value || 1;
    return calculatedTripCostUsd.value / count;
});

const costPerPassengerKhr = computed(() => {
    const count = passengerCount.value || 1;
    return Math.round(calculatedTripCostKhr.value / count);
});

// Major Station Networks Data
const stationNetworks = [
    {
        id: 'tela',
        name: 'Tela (តេឡា)',
        origin: 'Cambodia National Brand',
        badge: '🇰🇭',
        stationCount: '2,000+ ស្ថានីយទូទាំងប្រទេស',
        descKhmer: 'ក្រុមហ៊ុនប្រេងឥន្ធនៈជាតិកម្ពុជាធំជាងគេបង្អស់ មានស្ថានីយគ្រប់ដណ្តប់គ្រប់រាជធានី-ខេត្ត រហូតដល់ទីប្រជុំជនស្រុកជនបទ។',
        descEn: 'Cambodia’s largest national fuel network with extensive station presence across all 25 provinces down to rural districts.',
        tagsKhmer: ['បណ្តាញធំជាងគេ', 'Tela Mart', 'សន្សំពិន្ទុ Tela Card', 'បន្ទប់ទឹកស្អាត'],
        tagsEn: ['Largest Network', 'Tela Mart', 'Tela Loyalty Card', 'Clean Restrooms'],
        perkKhmer: '⭐ ងាយស្រួលរកបំផុតពេលធ្វើដំណើរផ្លូវជាតិឆ្ងាយៗ',
        perkEn: '⭐ Most accessible along remote national highways'
    },
    {
        id: 'ptt',
        name: 'PTT Cambodia (ភីធីធី)',
        origin: 'Thailand (PTT Group)',
        badge: '🇹🇭',
        stationCount: '170+ ស្ថានីយគំរូ',
        descKhmer: 'ស្ថានីយប្រេងស្តង់ដារថៃដ៏ពេញនិយមបំផុតសម្រាប់អ្នកធ្វើដំណើរ ផ្តល់នូវបរិស្ថានស្អាត បន្ទប់ទឹកទំនើប និងហាងទំនិញពេញលេញ។',
        descEn: 'Highly favored Thai retail stations providing immaculate rest facilities, Cafe Amazon, and 7-Eleven franchises.',
        tagsKhmer: ['Cafe Amazon', '7-Eleven', 'បន្ទប់ទឹកស្អាតខ្លាំង', 'ប្រេងស្តង់ដារអន្តរជាតិ'],
        tagsEn: ['Cafe Amazon', '7-Eleven', 'Pristine Restrooms', 'Thai Premium Fuel'],
        perkKhmer: '⭐ កន្លែងឈប់សម្រាក (Rest Stop) លេខមួយសម្រាប់ការធ្វើដំណើរ',
        perkEn: '⭐ Number one rest-stop destination for road trips'
    },
    {
        id: 'total',
        name: 'TotalEnergies (តូតាល់)',
        origin: 'France (International)',
        badge: '🇫🇷',
        stationCount: '120+ ស្ថានីយ',
        descKhmer: 'ប្រេងឥន្ធនៈស្តង់ដារអឺរ៉ុបជាមួយរូបមន្ត Excellium ដែលជួយលាងសម្អាតម៉ាស៊ីន និងការពារកាកសំណល់កាបូនក្នុងស៊ីឡាំង។',
        descEn: 'French multi-energy giant offering Excellium additive fuels designed to clean engines and suppress carbon buildup.',
        tagsKhmer: ['Excellium Fuel', 'Bonjour Mart', 'Wash Station', 'កាត TotalEnergies'],
        tagsEn: ['Excellium Fuel', 'Bonjour Mart', 'Wash Service', 'Fleet Fuel Cards'],
        perkKhmer: '⭐ ពេញនិយមបំផុតសម្រាប់រថយន្តទំនើប និងម៉ាស៊ីន Turbo',
        perkEn: '⭐ Preferred by luxury vehicles & turbo engines'
    },
    {
        id: 'caltex',
        name: 'Caltex Cambodia (កាល់តិច)',
        origin: 'USA (Chevron Corporation)',
        badge: '🇺🇸',
        stationCount: '50+ ស្ថានីយ',
        descKhmer: 'ប្រេងឥន្ធនៈបំពាក់បច្ចេកវិទ្យា Techron ជួយការពារម៉ាស៊ីនពីការកកស្ទះ និងបង្កើនសន្ទុះបើកបរយ៉ាងរលូន។',
        descEn: 'Chevron’s retail network featuring patented Techron fuel additives for combustion chamber cleanliness.',
        tagsKhmer: ['Techron Additive', 'Star Mart', 'TrueMoney / ABA Pay', 'ប្រេងម៉ាស៊ីន Havoline'],
        tagsEn: ['Techron Additive', 'Star Mart', 'ABA Pay / TrueMoney', 'Havoline Lubricants'],
        perkKhmer: '⭐ ជម្រើសកំពូលសម្រាប់ថែរក្សាម៉ាស៊ីនរថយន្ត និងម៉ូតូ',
        perkEn: '⭐ Renowned for engine protection & longevity'
    },
    {
        id: 'sokimex',
        name: 'Sokimex (សូគីម៉ិច)',
        origin: 'Cambodia',
        badge: '🇰🇭',
        stationCount: '1,000+ ស្ថានីយ & ដេប៉ូ',
        descKhmer: 'ម៉ាកយីហោប្រេងកម្ពុជាដ៏យូរអង្វែង មានដេប៉ូចែកចាយប្រេង និងស្ថានីយច្រើនកន្លែងតាមបណ្តោយផ្លូវជាតិសំខាន់ៗ។',
        descEn: 'Longstanding Cambodian petroleum distributor with widespread depots and highway stations across rural corridors.',
        tagsKhmer: ['ដេប៉ូតាមបណ្តាខេត្ត', 'តម្លៃសមរម្យ', 'ស្ថានីយទូទាំងប្រទេស'],
        tagsEn: ['Provincial Depots', 'Competitive Pricing', 'Nationwide Network'],
        perkKhmer: '⭐ វត្តមានទូលំទូលាយតាមតំបន់កសិកម្ម និងជាយក្រុង',
        perkEn: '⭐ Broad presence across agricultural & provincial areas'
    },
    {
        id: 'bright',
        name: 'Bright Petroleum (ប្រាយ)',
        origin: 'Cambodia',
        badge: '🇰🇭',
        stationCount: '60+ ស្ថានីយរីកចម្រើន',
        descKhmer: 'បណ្តាញស្ថានីយក្នុងស្រុកដែលកំពុងរីកចម្រើនយ៉ាងឆាប់រហ័ស ជាមួយការតុបតែងស្អាត និងសេវាកម្មរហ័សទាន់ចិត្ត។',
        descEn: 'Fast-expanding modern domestic station brand featuring updated facilities and speedy attendant service.',
        tagsKhmer: ['ស្ថានីយថ្មីទំនើប', 'កាហ្វេ & ម៉ាត', 'សេវាកម្មរហ័ស'],
        tagsEn: ['Modern Facilities', 'Cafe & Mart', 'Fast Service'],
        perkKhmer: '⭐ ស្ថានីយរចនាបទថ្មី និងសេវាកម្មរួសរាយរាក់ទាក់',
        perkEn: '⭐ Fresh station aesthetic and friendly attendants'
    }
];

// Fuel Economy Tips Data
const fuelSavingTips = [
    {
        id: 1,
        icon: '❄️',
        titleKhmer: 'គ្រប់គ្រងម៉ាស៊ីនត្រជាក់ (AC) ក្នុងកម្តៅថ្ងៃ',
        titleEn: 'Smart AC Temperature Management',
        savingsKhmer: 'សន្សំបាន ៥% ទៅ ១២% នៃប្រេងសាំង',
        savingsEn: 'Saves 5% to 12% Fuel',
        descKhmer: 'នៅកម្ពុជា អាកាសធាតុក្តៅខ្លាំងធ្វើឱ្យ Compressors ម៉ាស៊ីនត្រជាក់ធ្វើការធ្ងន់។ ការកំណត់សីតុណ្ហភាព ២៣°-២៤°C និងចតឡានក្រោមម្លប់ ជួយកាត់បន្ថយបន្ទុកម៉ាស៊ីនបានយ៉ាងច្រើន។',
        descEn: 'In Cambodia’s tropical heat, maxing out the AC compressor forces the engine to burn substantially more fuel. Setting the cabin climate to 24°C saves fuel significantly.',
        actionKhmer: 'អនុវត្ត៖ បើកកញ្ចក់បញ្ចេញកម្តៅ ៣០ វិនាទីមុនចេញដំណើរ និងកំណត់កម្រិតត្រជាក់ល្មម។',
        actionEn: 'Action: Roll down windows for 30s before moving off to vent hot air before blasting AC.'
    },
    {
        id: 2,
        icon: '🛞',
        titleKhmer: 'ពិនិត្យសម្ពាធខ្យល់កង់រថយន្តឱ្យបានត្រឹមត្រូវ',
        titleEn: 'Maintain Proper Tire Inflation',
        savingsKhmer: 'សន្សំបាន ៣% ទៅ ៧% នៃប្រេងសាំង',
        savingsEn: 'Saves 3% to 7% Fuel',
        descKhmer: 'កង់ឡានដែលខ្វះខ្យល់តែ ២-៣ PSI នឹងបង្កើតកកិតខ្លាំងលើថ្នល់ជាតិ ធ្វើឱ្យឡានធ្ងន់ និងស៊ីសាំងច្រើន ថែមទាំងឆាប់សឹករេចរឹលសំបកកង់ទៀតផង។',
        descEn: 'Underinflated tires dramatically increase rolling resistance on Cambodian asphalt, reducing fuel economy and causing premature tire wear.',
        actionKhmer: 'អនុវត្ត៖ ពិនិត្យខ្យល់កង់រៀងរាល់ ២ សប្តាហ៍ម្តង (Prius 35 PSI មុខ / 33 PSI ក្រោយ)។',
        actionEn: 'Action: Check tire pressure bi-weekly (Prius: 35 PSI front / 33 PSI rear).'
    },
    {
        id: 3,
        icon: '⚡',
        titleKhmer: 'ជៀសវាងការជាន់ហ្គែរបន្ទាន់ & ជាន់ហ្វ្រាំងខ្លាំង',
        titleEn: 'Smooth Acceleration & Engine Coasting',
        savingsKhmer: 'សន្សំបាន ១០% ទៅ ១៥% នៃប្រេងសាំង',
        savingsEn: 'Saves 10% to 15% Fuel',
        descKhmer: 'ការជាន់ហ្គែរបង្កើនល្បឿនខ្លាំងៗ (Rabbit start) នៅភ្លើងស្តុបភ្នំពេញ បង្កើនការបាញ់ប្រេងទ្វេដង។ ការបើកបរបែប Smooth និងមើលស្ថានការណ៍ពីចម្ងាយជួយសន្សំប្រេងបានច្រើនបំផុត។',
        descEn: 'Aggressive acceleration away from traffic lights injects rich fuel mixtures. Anticipating traffic stops and coasting gently preserves momentum.',
        actionKhmer: 'អនុវត្ត៖ ជាន់ហ្គែរសន្សឹមៗ និងដកជើងឱ្យឡានរអិល (Glide) ពេលឃើញស្តុបក្រហមពីចម្ងាយ។',
        actionEn: 'Action: Accelerate progressively and glide toward red lights rather than hard-braking.'
    },
    {
        id: 4,
        icon: '⛽',
        titleKhmer: 'ចាក់ប្រេងត្រូវតាមកម្រិតអុកតានរបស់ម៉ាស៊ីន',
        titleEn: 'Select Correct Octane Rating (EA92 vs EA95)',
        savingsKhmer: 'ការពារម៉ាស៊ីន និងសន្សំការចំណាយ',
        savingsEn: 'Protects Engine & Prevents Waste',
        descKhmer: 'ឡានធម្មតាដូចជា Prius 04-15 ឬ Vios ត្រូវបានផលិតឡើងសម្រាប់កម្រិត Octane 87-92 ដូច្នេះការចាក់ EA92 គឺគ្រប់គ្រាន់ និងសន្សំសំចៃបំផុត។ រីឯឡាន Turbo ទើបត្រូវការចាំបាច់នូវ EA95។',
        descEn: 'Vehicles engineered for regular gasoline (Prius, Vios, Camry) gain zero extra horsepower from EA95; EA92 is optimal. Reserve EA95 for turbocharged and high-compression engines.',
        actionKhmer: 'អនុវត្ត៖ ពិនិត្យសៀវភៅណែនាំរថយន្ត ឬគម្របធុងសាំង ដើម្បីដឹងកម្រិតអុកតានពិតប្រាកដ។',
        actionEn: 'Action: Check your car manual or fuel door label for manufacturer octane specifications.'
    }
];
</script>
