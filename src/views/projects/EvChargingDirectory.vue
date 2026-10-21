<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-emerald-600 dark:text-emerald-400">
                            {{ isKhmer ? 'បណ្តាញស្ថានីយ៍សាកឡានអគ្គិសនី EV & គណនាការសន្សំប្រាក់' : 'CAMBODIA EV CHARGING STATIONS & FUEL SAVINGS CALCULATOR' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">EDC // TOTAL // CALTEX // PTT</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">DC FAST CHARGE (60KW - 160KW)</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-md">
                                <span>⚡</span>
                                <span>{{ isKhmer ? 'បច្ចេកវិទ្យាឡានអគ្គិសនីកម្ពុជា' : 'CAMBODIA ELECTRIC VEHICLES' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'ស្វែងរកស្ថានីយ៍សាកអាគុយ EV និងគណនាប្រៀបធៀបថ្លៃសាំង' : 'Cambodia EV Charging Stations & Cost Saver Calculator' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ស្វែងរកទីតាំងស្ថានីយ៍សាកឡានអគ្គិសនី DC Fast Charger ទូទាំងរាជធានីភ្នំពេញ ខេត្តនានា និងផ្លូវល្បឿនលឿន (EDC, TotalEnergies, Caltex, PTT, Aeon Mall) ព្រមទាំងម៉ាស៊ីនគណនាប្រៀបធៀបការចំណាយជាក់ស្តែងរវាងឡាន EV និងឡានចាក់សាំង។' 
                                    : 'Find public DC fast and AC EV charging stations across Cambodia (Phnom Penh, Expressway, Siem Reap, Battambang) and calculate exact monthly/annual financial savings comparing EVs against gasoline vehicles.' }}
                            </p>
                        </div>

                        <!-- Mode Switcher -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ជ្រើសរើសផ្នែក' : 'Select Tool Section' }}
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="activeTab = 'stations'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeTab === 'stations' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '⚡ ស្ថានីយ៍សាក' : '⚡ Stations' }}
                                </button>
                                <button 
                                    @click="activeTab = 'calculator'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeTab === 'calculator' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '💰 គណនាការសន្សំ' : '💰 Cost Saver' }}
                                </button>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <span>🔋</span>
                                <span>{{ activeTab === 'stations' ? (isKhmer ? 'មានទិន្នន័យ ៤០+ ទីតាំងទូទាំងប្រទេស' : '40+ nationwide fast charging hubs') : (isKhmer ? 'គណនាប្រៀបធៀបចំណេញក្នុង១ខែ' : 'Calculate real monthly savings') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 1: CHARGING STATIONS DIRECTORY -->
            <div v-if="activeTab === 'stations'" class="space-y-6">
                <!-- Search & Filters -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
                    <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
                        <!-- Search Box -->
                        <div class="relative w-full sm:max-w-md">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                🔍
                            </span>
                            <input 
                                v-model="searchStation"
                                type="text"
                                :placeholder="isKhmer ? 'ស្វែងរកទីតាំង (ឧ. EDC, Total, Expressway, Aeon)...' : 'Search station (e.g. EDC, Total, Expressway, Aeon)...'"
                                class="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                            />
                        </div>

                        <!-- Brand filter pills -->
                        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs w-full sm:w-auto no-scrollbar">
                            <button 
                                @click="selectedBrand = 'ALL'"
                                class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap touch-manipulation"
                                :class="selectedBrand === 'ALL' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                                {{ isKhmer ? 'ទាំងអស់' : 'All Brands' }}
                            </button>
                            <button 
                                v-for="brand in ['EDC', 'TotalEnergies', 'Caltex', 'PTT', 'Aeon']"
                                :key="brand"
                                @click="selectedBrand = brand"
                                class="px-2.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap touch-manipulation"
                                :class="selectedBrand === brand ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                                {{ brand }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stations Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                        v-for="station in filteredStations" 
                        :key="station.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all flex flex-col justify-between space-y-4 group">
                        
                        <div>
                            <div class="flex items-start justify-between gap-2 mb-2">
                                <span class="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border" :class="getBrandBadge(station.brand)">
                                    {{ station.brand }}
                                </span>
                                <span class="text-[9px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                    {{ station.speedType }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {{ isKhmer ? station.nameKm : station.nameEn }}
                                </h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    📍 {{ isKhmer ? station.locationKm : station.locationEn }}
                                </p>
                            </div>

                            <!-- Specs & Plugs -->
                            <div class="mt-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                                <div class="flex items-center justify-between text-[11px]">
                                    <span class="text-slate-400">POWER:</span>
                                    <strong class="text-emerald-600 dark:text-emerald-400">{{ station.power }}</strong>
                                </div>
                                <div class="flex items-center justify-between text-[11px]">
                                    <span class="text-slate-400">CONNECTORS:</span>
                                    <span class="text-slate-700 dark:text-slate-300 font-bold">{{ station.plugs }}</span>
                                </div>
                                <div class="flex items-center justify-between text-[11px]">
                                    <span class="text-slate-400">PRICE:</span>
                                    <span class="text-slate-700 dark:text-slate-300">{{ station.price }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Map Link Button -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                            <span class="text-[11px] font-mono text-slate-400">
                                🕒 {{ station.hours }}
                            </span>
                            <a 
                                :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(station.nameEn + ' ' + station.locationEn + ' Cambodia')"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 rounded-lg font-mono font-bold transition-colors">
                                <span>🗺️</span>
                                <span>{{ isKhmer ? 'ផែនទី Maps' : 'View Map' }}</span>
                            </a>
                        </div>

                    </div>
                </div>

                <!-- Expressway Special Route Card -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🛣️</span>
                        <div>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ស្ថានីយ៍សាកឡាន EV លើផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ (Expressway Rest Areas)' : 'Phnom Penh - Sihanoukville Expressway EV Charging Hubs' }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'មិនបាច់បារម្ភរឿងអស់អាគុយកណ្តាលផ្លូវ (ចម្ងាយសរុប ១៨៧ គ.ម)' : 'Never run out of charge on the 187km expressway' }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                            <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono">1. កន្លែងឈប់សម្រាក Km 63 (កំពង់ស្ពឺ)</span>
                            <p class="text-[11px] text-slate-600 dark:text-slate-300">
                                មានឧបករណ៍សាកល្បឿនលឿន DC Fast Charger 120kW ទាំងសងខាងផ្លូវ (ទៅ និងមក) សាកត្រឹម ២០-៣០ នាទី បាន ៨០%។
                            </p>
                        </div>
                        <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                            <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono">2. កន្លែងឈប់សម្រាក Km 109 (ព្រះសីហនុ)</span>
                            <p class="text-[11px] text-slate-600 dark:text-slate-300">
                                ស្ថានីយ៍សាកល្បឿនលឿន DC Fast 120kW ព្រមទាំងអាហារដ្ឋាន កាហ្វេ និងបន្ទប់ទឹកស្អាត។
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 2: COST SAVER CALCULATOR -->
            <div v-else class="space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <!-- Calculator Inputs -->
                    <div class="lg:col-span-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <h2 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                                ⚙️ {{ isKhmer ? 'ព័ត៌មាននៃការបើកបរប្រចាំថ្ងៃ' : 'DRIVING PARAMETERS' }}
                            </h2>
                            <button 
                                @click="resetDefaults" 
                                class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-mono">
                                ↺ {{ isKhmer ? 'កំណត់ឡើងវិញ' : 'Reset' }}
                            </button>
                        </div>

                        <!-- Daily Distance -->
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between text-xs">
                                <label class="font-bold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ចម្ងាយបើកបរប្រចាំថ្ងៃ' : 'Daily Driving Distance' }}
                                </label>
                                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ dailyDistance }} km / ថ្ងៃ</span>
                            </div>
                            <input 
                                v-model.number="dailyDistance" 
                                type="range" 
                                min="10" 
                                max="200" 
                                step="5"
                                class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>

                        <!-- EV Battery Consumption -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'កម្រិតប្រើប្រាស់ថាមពលអគ្គិសនីរបស់ EV (kWh / 100km)' : 'EV Efficiency (kWh / 100km)' }}
                            </label>
                            <input 
                                v-model.number="evEfficiency" 
                                type="number" 
                                step="0.5"
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono"
                            />
                            <p class="text-[10px] text-slate-400">BYD Atto 3 ~15 kWh | Tesla Model Y ~16 kWh | Wuling ~11 kWh</p>
                        </div>

                        <!-- Electricity Rate -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'ថ្លៃភ្លើងសាក ($/kWh)' : 'Electricity Rate ($/kWh)' }}
                            </label>
                            <input 
                                v-model.number="electricRate" 
                                type="number" 
                                step="0.01"
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono"
                            />
                            <p class="text-[10px] text-slate-400">សាកនៅផ្ទះ ~$0.18 - $0.20 | ស្ថានីយ៍សាធារណៈ ~$0.25 - $0.32</p>
                        </div>

                        <!-- Gasoline Car Fuel Economy -->
                        <div class="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'កម្រិតស៊ីសាំងរបស់រថយន្តធម្មតា (Liters / 100km)' : 'Gasoline Car Fuel (L / 100km)' }}
                            </label>
                            <input 
                                v-model.number="gasEfficiency" 
                                type="number" 
                                step="0.5"
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono"
                            />
                            <p class="text-[10px] text-slate-400">Prius 2011 ~5.5L | Sedan ~7.5L | SUV/Lexus ~10-12L</p>
                        </div>

                        <!-- Gasoline Price -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'តម្លៃសាំងបច្ចុប្បន្ន ($/Liter)' : 'Gasoline Price ($/Liter)' }}
                            </label>
                            <input 
                                v-model.number="gasPrice" 
                                type="number" 
                                step="0.05"
                                class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono"
                            />
                            <p class="text-[10px] text-slate-400">តម្លៃផ្លូវការក្រសួងពាណិជ្ជកម្ម ~$1.05 / លីត្រ (4,300៛)</p>
                        </div>
                    </div>

                    <!-- Comparison Results Dashboard -->
                    <div class="lg:col-span-7 space-y-4">
                        <!-- Big Money Saved Callout -->
                        <div class="p-4 sm:p-6 border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 rounded-2xl shadow-xs space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    {{ isKhmer ? 'ទឹកប្រាក់ដែលអ្នកសន្សំបាន' : 'TOTAL MONEY SAVED BY DRIVING EV' }}
                                </span>
                                <span class="text-xl sm:text-2xl">💰</span>
                            </div>
                            <div class="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                                +${{ formatNumber(monthlySavings) }} <span class="text-base sm:text-lg font-normal text-slate-500">/ {{ isKhmer ? 'ខែ' : 'mo' }}</span>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-300">
                                {{ isKhmer 
                                    ? `បើកបរ ${dailyDistance} គ.ម ក្នុង១ថ្ងៃ អ្នកនឹងសន្សំបានប្រមាណ $${formatNumber(annualSavings)} ក្នុង១ឆ្នាំ ឬ $${formatNumber(fiveYearSavings)} ក្នុងរយៈពេល ៥ ឆ្នាំ!` 
                                    : `Driving ${dailyDistance} km/day saves you ~$${formatNumber(annualSavings)} per year or ~$${formatNumber(fiveYearSavings)} over 5 years!` }}
                            </p>
                        </div>

                        <!-- Side by Side Monthly Cost Cards -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                            <!-- EV Cost Card -->
                            <div class="p-4 border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-emerald-700 dark:text-emerald-300">⚡ ឡានអគ្គិសនី EV</span>
                                    <span class="text-[10px] text-emerald-600">CHEAP</span>
                                </div>
                                <div>
                                    <span class="text-2xl font-black text-slate-900 dark:text-white block">${{ formatNumber(monthlyEvCost) }}</span>
                                    <span class="text-[10px] text-slate-400">ថ្លៃភ្លើងក្នុង១ខែ (Monthly Charge)</span>
                                </div>
                                <div class="pt-2 border-t border-emerald-200 dark:border-emerald-800/40 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                                    <div>• ក្នុង១ថ្ងៃ៖ <strong>${{ formatNumber(dailyEvCost) }}</strong></div>
                                    <div>• ក្នុង១ឆ្នាំ៖ <strong>${{ formatNumber(annualEvCost) }}</strong></div>
                                    <div>• ចំណាយក្នុង១គ.ម៖ <strong>${{ (monthlyEvCost / (dailyDistance * 30)).toFixed(3) }} / km</strong></div>
                                </div>
                            </div>

                            <!-- Gasoline Car Cost Card -->
                            <div class="p-4 border border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-rose-700 dark:text-rose-300">⛽ ឡានចាក់សាំងធម្មតា</span>
                                    <span class="text-[10px] text-rose-500">EXPENSIVE</span>
                                </div>
                                <div>
                                    <span class="text-2xl font-black text-slate-900 dark:text-white block">${{ formatNumber(monthlyGasCost) }}</span>
                                    <span class="text-[10px] text-slate-400">ថ្លៃសាំងក្នុង១ខែ (Monthly Gas)</span>
                                </div>
                                <div class="pt-2 border-t border-rose-200 dark:border-rose-800/40 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                                    <div>• ក្នុង១ថ្ងៃ៖ <strong>${{ formatNumber(dailyGasCost) }}</strong></div>
                                    <div>• ក្នុង១ឆ្នាំ៖ <strong>${{ formatNumber(annualGasCost) }}</strong></div>
                                    <div>• ចំណាយក្នុង១គ.ម៖ <strong>${{ (monthlyGasCost / (dailyDistance * 30)).toFixed(3) }} / km</strong></div>
                                </div>
                            </div>
                        </div>

                        <!-- Environmental Benefit -->
                        <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-between text-xs">
                            <div class="flex items-center gap-2.5">
                                <span class="text-2xl">🌱</span>
                                <div>
                                    <div class="font-bold text-slate-900 dark:text-white">{{ isKhmer ? 'កាត់បន្ថយការបំភាយឧស្ម័នកាបូនិច (CO2)' : 'Carbon Emission Reduction' }}</div>
                                    <div class="text-[11px] text-slate-500">{{ isKhmer ? 'ជួយកាត់បន្ថយការបំពុលបរិយាកាសក្នុងទីក្រុង' : 'Clean green air for Cambodian cities' }}</div>
                                </div>
                            </div>
                            <span class="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                -{{ formatNumber(co2Saved) }} kg / ឆ្នាំ
                            </span>
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
    name: 'EvChargingDirectory',
    setup() {
        const { isKhmer } = useLanguage();

        const activeTab = ref('stations'); // 'stations' or 'calculator'
        const searchStation = ref('');
        const selectedBrand = ref('ALL');

        // Calculator states
        const dailyDistance = ref(45);
        const evEfficiency = ref(15); // 15 kWh / 100km
        const electricRate = ref(0.25); // $0.25 / kWh
        const gasEfficiency = ref(8.5); // 8.5 L / 100km
        const gasPrice = ref(1.05); // $1.05 / L

        const resetDefaults = () => {
            dailyDistance.value = 45;
            evEfficiency.value = 15;
            electricRate.value = 0.25;
            gasEfficiency.value = 8.5;
            gasPrice.value = 1.05;
        };

        // Calculations
        const dailyEvCost = computed(() => {
            return (dailyDistance.value / 100) * evEfficiency.value * electricRate.value;
        });

        const monthlyEvCost = computed(() => dailyEvCost.value * 30);
        const annualEvCost = computed(() => dailyEvCost.value * 365);

        const dailyGasCost = computed(() => {
            return (dailyDistance.value / 100) * gasEfficiency.value * gasPrice.value;
        });

        const monthlyGasCost = computed(() => dailyGasCost.value * 30);
        const annualGasCost = computed(() => dailyGasCost.value * 365);

        const monthlySavings = computed(() => Math.max(0, monthlyGasCost.value - monthlyEvCost.value));
        const annualSavings = computed(() => Math.max(0, annualGasCost.value - annualEvCost.value));
        const fiveYearSavings = computed(() => annualSavings.value * 5);

        // CO2 saved: ~2.31 kg CO2 per liter of gasoline
        const co2Saved = computed(() => {
            const annualLiters = (dailyDistance.value / 100) * gasEfficiency.value * 365;
            return Math.round(annualLiters * 2.31);
        });

        const formatNumber = (val) => {
            return Math.round(val).toLocaleString();
        };

        // EV Charging Stations Database
        const stations = [
            {
                id: 'edc-wat-phnom',
                brand: 'EDC',
                nameKm: 'ស្ថានីយ៍សាក EV អគ្គិសនីកម្ពុជា (វត្តភ្នំ)',
                nameEn: 'EDC Headquarter EV Station Wat Phnom',
                locationKm: 'ក្បែររង្វង់មូលវត្តភ្នំ ដូនពេញ ភ្នំពេញ',
                locationEn: 'Near Wat Phnom, Daun Penh, Phnom Penh',
                power: '120 kW (DC Fast)',
                speedType: 'DC FAST 120kW',
                plugs: 'CCS2 / GB/T',
                price: '~1,200 KHR / kWh',
                hours: '24/7'
            },
            {
                id: 'total-chamkarmon',
                brand: 'TotalEnergies',
                nameKm: 'TotalEnergies ស្ថានីយ៍ព្រះមុនីវង្ស (បឹងកេងកង)',
                nameEn: 'TotalEnergies Monivong EV Charging Station',
                locationKm: 'មហាវិថីព្រះមុនីវង្ស បឹងកេងកង ភ្នំពេញ',
                locationEn: 'Monivong Blvd, Boeng Keng Kang, Phnom Penh',
                power: '60 kW (DC Fast)',
                speedType: 'DC FAST 60kW',
                plugs: 'CCS2 / Type 2',
                price: '$0.30 / kWh',
                hours: '24/7'
            },
            {
                id: 'expressway-km63',
                brand: 'TotalEnergies',
                nameKm: 'ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ Km 63',
                nameEn: 'Expressway Rest Area Km 63 Charging Hub',
                locationKm: 'កន្លែងឈប់សម្រាក Km 63 កំពង់ស្ពឺ (សងខាងផ្លូវ)',
                locationEn: 'Expressway Service Area Km 63, Kampong Speu',
                power: '120 kW (DC Fast)',
                speedType: 'DC FAST 120kW',
                plugs: 'CCS2 / GB/T',
                price: '$0.35 / kWh',
                hours: '24/7'
            },
            {
                id: 'expressway-km109',
                brand: 'TotalEnergies',
                nameKm: 'ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ Km 109',
                nameEn: 'Expressway Rest Area Km 109 Charging Hub',
                locationKm: 'កន្លែងឈប់សម្រាក Km 109 ព្រះសីហនុ',
                locationEn: 'Expressway Service Area Km 109, Preah Sihanouk',
                power: '120 kW (DC Fast)',
                speedType: 'DC FAST 120kW',
                plugs: 'CCS2 / GB/T',
                price: '$0.35 / kWh',
                hours: '24/7'
            },
            {
                id: 'caltex-toul-kork',
                brand: 'Caltex',
                nameKm: 'Caltex Toul Kork EV Power Station',
                nameEn: 'Caltex Toul Kork EV Charging',
                locationKm: 'ផ្លូវ ៣១៥ ទួលគោក ភ្នំពេញ',
                locationEn: 'Street 315, Toul Kork, Phnom Penh',
                power: '50 kW (DC Fast)',
                speedType: 'DC FAST 50kW',
                plugs: 'CCS2',
                price: '$0.28 / kWh',
                hours: '06:00 - 22:00'
            },
            {
                id: 'ptt-nr5',
                brand: 'PTT',
                nameKm: 'PTT Station ផ្លូវជាតិលេខ៥ (ព្រែកព្នៅ)',
                nameEn: 'PTT Prek Pnov National Road 5 EV Station',
                locationKm: 'ផ្លូវជាតិលេខ៥ ព្រែកព្នៅ ភ្នំពេញ',
                locationEn: 'National Road 5, Prek Pnov, Phnom Penh',
                power: '60 kW (DC Fast)',
                speedType: 'DC FAST 60kW',
                plugs: 'CCS2 / Type 2',
                price: '$0.29 / kWh',
                hours: '24/7'
            },
            {
                id: 'aeon-sen-sok',
                brand: 'Aeon',
                nameKm: 'ផ្សារទំនើប អុីអន សែនសុខ (Aeon 2 Parking)',
                nameEn: 'Aeon Mall Sen Sok City EV Charging',
                locationKm: 'ចំណតរថយន្ត Aeon 2 សែនសុខ ភ្នំពេញ',
                locationEn: 'Aeon 2 Parking Lot, Sen Sok, Phnom Penh',
                power: '22 kW (AC & DC)',
                speedType: 'FAST & AC',
                plugs: 'Type 2 / CCS2',
                price: '$0.25 / kWh',
                hours: '09:00 - 22:00'
            },
            {
                id: 'edc-siem-reap',
                brand: 'EDC',
                nameKm: 'អគ្គិសនីកម្ពុជា ខេត្តសៀមរាប',
                nameEn: 'EDC Siem Reap Provincial EV Hub',
                locationKm: 'ក្រុងសៀមរាប ក្បែរមន្ទីរពេទ្យបង្អែក',
                locationEn: 'Siem Reap City Center',
                power: '60 kW (DC Fast)',
                speedType: 'DC FAST 60kW',
                plugs: 'CCS2 / GB/T',
                price: '~1,400 KHR / kWh',
                hours: '24/7'
            },
            {
                id: 'edc-battambang',
                brand: 'EDC',
                nameKm: 'អគ្គិសនីកម្ពុជា ខេត្តបាត់ដំបង',
                nameEn: 'EDC Battambang Provincial EV Station',
                locationKm: 'ក្រុងបាត់ដំបង ផ្លូវលេខ១',
                locationEn: 'Battambang City, Street 1',
                power: '60 kW (DC Fast)',
                speedType: 'DC FAST 60kW',
                plugs: 'CCS2 / GB/T',
                price: '~1,400 KHR / kWh',
                hours: '24/7'
            }
        ];

        const getBrandBadge = (brand) => {
            switch (brand) {
                case 'EDC': return 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
                case 'TotalEnergies': return 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
                case 'Caltex': return 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
                case 'PTT': return 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800';
                default: return 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
            }
        };

        const filteredStations = computed(() => {
            let list = stations;
            if (selectedBrand.value !== 'ALL') {
                list = list.filter(s => s.brand === selectedBrand.value);
            }
            if (searchStation.value.trim()) {
                const q = searchStation.value.toLowerCase().trim();
                list = list.filter(s => 
                    s.nameKm.toLowerCase().includes(q) ||
                    s.nameEn.toLowerCase().includes(q) ||
                    s.locationKm.toLowerCase().includes(q) ||
                    s.locationEn.toLowerCase().includes(q) ||
                    s.brand.toLowerCase().includes(q)
                );
            }
            return list;
        });

        return {
            isKhmer,
            activeTab,
            searchStation,
            selectedBrand,
            dailyDistance,
            evEfficiency,
            electricRate,
            gasEfficiency,
            gasPrice,
            resetDefaults,
            dailyEvCost,
            monthlyEvCost,
            annualEvCost,
            dailyGasCost,
            monthlyGasCost,
            annualGasCost,
            monthlySavings,
            annualSavings,
            fiveYearSavings,
            co2Saved,
            formatNumber,
            filteredStations,
            getBrandBadge
        };
    }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
button {
    -webkit-tap-highlight-color: transparent;
}
</style>
