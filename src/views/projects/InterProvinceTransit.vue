<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'តារាងតម្លៃធ្វើដំណើរ រថភ្លើង ឡានក្រុងភ្នំពេញ-ខេត្ត & ទូកល្បឿនលឿន' : 'CAMBODIA INTER-PROVINCE TRANSIT, RAILWAY & FERRY DIRECTORY' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">ROYAL RAILWAY // BUS // SPEED FERRY</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">OFFICIAL SCHEDULES & FARES</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 rounded-md">
                                <span>🚆</span>
                                <span>{{ isKhmer ? 'មគ្គុទ្ទេសក៍ធ្វើដំណើរអន្តរខេត្ត' : 'INTER-PROVINCE TRANSIT GUIDE' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'កាលវិភាគ & តម្លៃសំបុត្ររថភ្លើង ឡានក្រុង និងទូកកោះ' : 'Cambodia Inter-Province Transit, Railway & Island Ferry Guide' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ស្វែងរកតម្លៃសំបុត្រ និងកាលវិភាគរថភ្លើង Royal Railway កម្ពុជា (ខ្សែខាងត្បូង និងខាងជើង) ឡានក្រុង/វ៉ាន់ VIP ពីរាជធានីភ្នំពេញទៅ ២៥ ខេត្ត និងទូកល្បឿនលឿនទៅកោះរ៉ុង/កោះរ៉ុងសន្លឹម ជាមួយលេខទូរស័ព្ទកក់សំបុត្រផ្ទាល់។' 
                                    : 'Lookup official passenger train timetables (Royal Railway), inter-province express bus and VIP van fares across all 25 provinces, and high-speed island ferries to Koh Rong with direct booking operator hotlines.' }}
                            </p>
                        </div>

                        <!-- Mode Filter Selector -->
                        <div class="p-3 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 lg:w-80 shrink-0 w-full">
                            <div class="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'មធ្យោបាយធ្វើដំណើរ' : 'Transit Category' }}
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="activeTransitMode = 'all'"
                                    class="py-1.5 px-2 rounded-lg text-center transition-all touch-manipulation"
                                    :class="activeTransitMode === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? 'ទាំងអស់' : 'All' }}
                                </button>
                                <button 
                                    @click="activeTransitMode = 'train'"
                                    class="py-1.5 px-2 rounded-lg text-center transition-all touch-manipulation"
                                    :class="activeTransitMode === 'train' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '🚆 រថភ្លើង' : 'Train' }}
                                </button>
                                <button 
                                    @click="activeTransitMode = 'bus'"
                                    class="py-1.5 px-2 rounded-lg text-center transition-all touch-manipulation"
                                    :class="activeTransitMode === 'bus' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '🚌 ឡានក្រុង' : 'Bus' }}
                                </button>
                                <button 
                                    @click="activeTransitMode = 'ferry'"
                                    class="py-1.5 px-2 rounded-lg text-center transition-all touch-manipulation"
                                    :class="activeTransitMode === 'ferry' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '🚤 ទូកកោះ' : 'Ferry' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 1: ROYAL RAILWAY CAMBODIA -->
            <div v-if="activeTransitMode === 'all' || activeTransitMode === 'train'" class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🚆</span>
                        <div>
                            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'រថភ្លើងដឹកអ្នកដំណើរ Royal Railway កម្ពុជា' : 'Royal Railway Passenger Train Schedule & Fares' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'មានម៉ាស៊ីនត្រជាក់ វាំងនន និងកន្លែងសាកថ្មទូរស័ព្ទ (ស្ថានីយរថភ្លើងភ្នំពេញ)' : 'Air-conditioned coaches with phone chargers, departing Phnom Penh Railway Station' }}
                            </p>
                        </div>
                    </div>
                    <a 
                        href="tel:078888582"
                        class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono font-bold transition-colors shadow-xs active:scale-95 touch-manipulation w-full sm:w-auto">
                        📞 {{ isKhmer ? 'កក់សំបុត្ររថភ្លើង 078 888 582' : 'Call Booking 078 888 582' }}
                    </a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Southern Line -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs space-y-4">
                        <div class="flex items-start justify-between">
                            <div>
                                <span class="text-[10px] font-mono uppercase tracking-wider font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                    SOUTHERN LINE // ខ្សែខាងត្បូង
                                </span>
                                <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1">
                                    {{ isKhmer ? 'ភ្នំពេញ ⇄ តាកែវ ⇄ កំពត ⇄ កែប ⇄ ព្រះសីហនុ' : 'Phnom Penh ⇄ Takeo ⇄ Kampot ⇄ Kep ⇄ Sihanoukville' }}
                                </h3>
                            </div>
                            <span class="text-lg font-mono font-black text-blue-600 dark:text-blue-400">$9 - $10</span>
                        </div>

                        <div class="space-y-2 text-xs">
                            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                                <div class="font-bold text-slate-700 dark:text-slate-300 font-mono">
                                    ⏰ {{ isKhmer ? 'កាលវិភាគចេញដំណើរ' : 'Departure Schedule' }}
                                </div>
                                <div class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                                    <div>• <strong>Phnom Penh ➔ Sihanoukville:</strong> 07:00 AM Daily (Arrival ~12:40 PM)</div>
                                    <div>• <strong>Sihanoukville ➔ Phnom Penh:</strong> 02:00 PM Daily (Arrival ~07:40 PM)</div>
                                    <div>• <strong>Friday Extra:</strong> 02:30 PM & Sunday Return</div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-1 sm:gap-2 text-center text-[10px] sm:text-[11px] font-mono">
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">TAKEO</span>
                                    <strong class="text-[10px] sm:text-xs">$6 / 24k៛</strong>
                                </div>
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">KAMPOT</span>
                                    <strong class="text-[10px] sm:text-xs">$8 / 32k៛</strong>
                                </div>
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">SIHANOUK</span>
                                    <strong class="text-[10px] sm:text-xs">$10 / 40k៛</strong>
                                </div>
                            </div>
                        </div>

                        <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                            <span class="text-slate-400">⏱️ {{ isKhmer ? 'រយៈពេល៖ ~៥ ម៉ោង ៤០ នាទី' : 'Duration: ~5h 40m' }}</span>
                            <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">✓ ទេសភាពធម្មជាតិភ្នំបូកគោ</span>
                        </div>
                    </div>

                    <!-- Northern Line -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs space-y-4">
                        <div class="flex items-start justify-between">
                            <div>
                                <span class="text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                    NORTHERN LINE // ខ្សែខាងជើង
                                </span>
                                <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1">
                                    {{ isKhmer ? 'ភ្នំពេញ ⇄ ពោធិ៍សាត់ ⇄ បាត់ដំបង ⇄ ប៉ោយប៉ែត' : 'Phnom Penh ⇄ Pursat ⇄ Battambang ⇄ Poipet Border' }}
                                </h3>
                            </div>
                            <span class="text-lg font-mono font-black text-amber-600 dark:text-amber-400">$7 - $10</span>
                        </div>

                        <div class="space-y-2 text-xs">
                            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                                <div class="font-bold text-slate-700 dark:text-slate-300 font-mono">
                                    ⏰ {{ isKhmer ? 'កាលវិភាគចេញដំណើរ' : 'Departure Schedule' }}
                                </div>
                                <div class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                                    <div>• <strong>Phnom Penh ➔ Battambang:</strong> 06:40 AM (Arrival ~01:00 PM)</div>
                                    <div>• <strong>Battambang ➔ Phnom Penh:</strong> 03:00 PM (Arrival ~09:30 PM)</div>
                                    <div>• <strong>Extension:</strong> Battambang to Poipet Border ($3)</div>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-1 sm:gap-2 text-center text-[10px] sm:text-[11px] font-mono">
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">PURSAT</span>
                                    <strong class="text-[10px] sm:text-xs">$7 / 28k៛</strong>
                                </div>
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">BATTAMBANG</span>
                                    <strong class="text-[10px] sm:text-xs">$8 / 32k៛</strong>
                                </div>
                                <div class="p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <span class="text-slate-400 block text-[9px]">POIPET</span>
                                    <strong class="text-[10px] sm:text-xs">$10 / 40k៛</strong>
                                </div>
                            </div>
                        </div>

                        <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                            <span class="text-slate-400">⏱️ {{ isKhmer ? 'រយៈពេល៖ ~៦ ម៉ោង ២០ នាទី' : 'Duration: ~6h 20m' }}</span>
                            <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">✓ មានទូរផ្ទុកម៉ូតូ & កង់</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: INTER-PROVINCIAL BUSES & EXPRESS VANS -->
            <div v-if="activeTransitMode === 'all' || activeTransitMode === 'bus'" class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🚌</span>
                        <div>
                            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ឡានក្រុង VIP & វ៉ាន់អន្តរខេត្ត (ភ្នំពេញ ទៅកាន់ខេត្តនានា)' : 'Inter-Province VIP Bus & Express Van Directory' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'តម្លៃសំបុត្រ រយៈពេលធ្វើដំណើរ និងលេខទូរស័ព្ទកក់សំបុត្រក្រុមហ៊ុនធំៗ' : 'Fares, trip durations, and direct booking numbers' }}
                            </p>
                        </div>
                    </div>

                    <!-- Destination search -->
                    <div class="w-full sm:w-64">
                        <input 
                            v-model="busSearchQuery"
                            type="text"
                            :placeholder="isKhmer ? 'ស្វែងរកខេត្តគោលដៅ (ឧ. សៀមរាប)...' : 'Filter destination (e.g. Siem Reap)...'"
                            class="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                        v-for="route in filteredBusRoutes" 
                        :key="route.destination"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between space-y-3">
                        
                        <div>
                            <div class="flex items-start justify-between gap-2">
                                <div class="min-w-0 flex-1">
                                    <span class="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                                        PHNOM PENH ➔ {{ route.code }}
                                    </span>
                                    <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                                        {{ isKhmer ? route.destinationKm : route.destinationEn }}
                                    </h3>
                                </div>
                                <div class="text-right shrink-0">
                                    <span class="text-sm sm:text-base font-mono font-black text-blue-600 dark:text-blue-400 block">{{ route.priceRange }}</span>
                                    <span class="text-[9px] font-mono text-slate-400">{{ route.duration }}</span>
                                </div>
                            </div>

                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {{ isKhmer ? route.descKm : route.descEn }}
                            </p>
                        </div>

                        <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div class="text-[11px] font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between">
                                <span>{{ isKhmer ? 'ក្រុមហ៊ុនពេញនិយម៖' : 'Top Operators:' }}</span>
                                <span class="font-bold text-slate-800 dark:text-slate-200">{{ route.operators }}</span>
                            </div>

                            <div class="flex items-center gap-2">
                                <a 
                                    :href="'tel:' + route.contact.replace(/[\s-]/g, '')"
                                    class="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-bold text-center transition-colors shadow-xs">
                                    📞 {{ route.contact }}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- SECTION 3: ISLAND SPEED FERRY -->
            <div v-if="activeTransitMode === 'all' || activeTransitMode === 'ferry'" class="space-y-4">
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <span class="text-2xl">🚤</span>
                        <div>
                            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ទូកល្បឿនលឿនទៅកាន់កោះរ៉ុង & កោះរ៉ុងសន្លឹម (Island Speed Ferry)' : 'Sihanoukville ⇄ Koh Rong & Koh Rong Sanloem Fast Ferry' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ចេញពីផែទេសចរណ៍ក្រុងព្រះសីហនុ (Ochheuteal Pier / Port)' : 'Departing Sihanoukville Autonomous Tourism Pier' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <!-- Buva Sea -->
                        <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-slate-900 dark:text-white font-mono">Buva Sea Cambodia</span>
                                <span class="font-bold text-blue-600 dark:text-blue-400 font-mono">$25 Return</span>
                            </div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? 'ទូកទំនើបល្បឿនលឿន កៅអីស្រួល បំពាក់អាវពោងសុវត្ថិភាពគ្រប់កៅអី។' : 'Modern speed ferries equipped with life vests and shaded seating.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">
                                ⏰ 08:30, 11:30, 14:30, 17:00
                            </div>
                            <a href="tel:0978880009" class="block w-full py-1.5 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                                📞 097 888 0009
                            </a>
                        </div>

                        <!-- GTVC -->
                        <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-slate-900 dark:text-white font-mono">GTVC Speedboat</span>
                                <span class="font-bold text-blue-600 dark:text-blue-400 font-mono">$25 Return</span>
                            </div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? 'ចេញពីផែស្វយ័តក្រុងព្រះសីហនុ ទៅកោះរ៉ុង និងឆ្នេរសារ៉ាសិន។' : 'Direct transfer to Koh Touch, Long Set Beach and Saracen Bay.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">
                                ⏰ 08:00, 11:00, 14:00, 16:30
                            </div>
                            <a href="tel:0966453666" class="block w-full py-1.5 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                                📞 096 645 3666
                            </a>
                        </div>

                        <!-- Island Speed Ferry -->
                        <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-slate-900 dark:text-white font-mono">Island Speed Ferry</span>
                                <span class="font-bold text-blue-600 dark:text-blue-400 font-mono">$25 Return</span>
                            </div>
                            <p class="text-[11px] text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? 'កាតាម៉ារ៉ាន់ធំ ទប់រលកបានល្អ មិនងាយវិលមុខ ឬរលកធំ។' : 'Large stable catamaran speedboat suitable for all weather conditions.' }}
                            </p>
                            <div class="text-[10px] font-mono text-slate-500">
                                ⏰ 09:00, 12:00, 15:00
                            </div>
                            <a href="tel:012527796" class="block w-full py-1.5 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                                📞 012 527 796
                            </a>
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
    name: 'InterProvinceTransit',
    setup() {
        const { isKhmer } = useLanguage();

        const activeTransitMode = ref('all'); // 'all', 'train', 'bus', 'ferry'
        const busSearchQuery = ref('');

        // Inter-province bus routes database
        const busRoutes = [
            {
                code: 'SIEM REAP',
                destinationKm: 'ខេត្តសៀមរាប (Siem Reap / Angkor)',
                destinationEn: 'Siem Reap (Angkor Wat)',
                priceRange: '$11 - $17',
                duration: '5 - 6 Hours',
                operators: 'VET, Giant Ibis, Larryta, Mey Hong',
                contact: '081 911 911',
                descKm: 'រថយន្តក្រុង VIP Night Bus (គ្រែគេង) និង Van VIP ចេញដំណើររៀងរាល់ ១ ម៉ោងម្តង។',
                descEn: 'Frequent departures including VIP sleeping buses and fast express vans via NR6.'
            },
            {
                code: 'SIHANOUKVILLE',
                destinationKm: 'ខេត្តព្រះសីហនុ (Sihanoukville Expressway)',
                destinationEn: 'Sihanoukville (Expressway)',
                priceRange: '$10 - $14',
                duration: '2.5 Hours',
                operators: 'Larryta, VET, Mey Hong',
                contact: '012 898 989',
                descKm: 'ធ្វើដំណើរតាមផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ ចំណាយពេលត្រឹមតែ ២ ម៉ោងកន្លះប៉ុណ្ណោះ។',
                descEn: 'Express transit via Phnom Penh - Sihanoukville Expressway in just 2.5 hours.'
            },
            {
                code: 'BATTAMBANG',
                destinationKm: 'ខេត្តបាត់ដំបង (Battambang)',
                destinationEn: 'Battambang City',
                priceRange: '$11 - $14',
                duration: '4.5 - 5 Hours',
                operators: 'VET, Capitol, Sorya, Mey Hong',
                contact: '023 214 024',
                descKm: 'ធ្វើដំណើរតាមផ្លូវជាតិលេខ៥ ថ្មី ផ្លូវធំទូលាយ និងមានផាសុកភាព។',
                descEn: 'Comfortable ride along the upgraded 4-lane National Road 5.'
            },
            {
                code: 'MONDULKIRI',
                destinationKm: 'ខេត្តមណ្ឌលគិរី (Mondulkiri / Sen Monorom)',
                destinationEn: 'Mondulkiri (Highland)',
                priceRange: '$15 - $20',
                duration: '6 - 7 Hours',
                operators: 'VET, Rithya Mondulkiri Express',
                contact: '097 788 8877',
                descKm: 'រថយន្តវ៉ាន់ VIP កៅអីធំទូលាយ ឡើងតំបន់ភ្នំទឹកធ្លាក់ និងដែនជម្រកសត្វព្រៃ។',
                descEn: 'Scenic highland route to Sen Monorom waterfalls and elephant sanctuaries.'
            },
            {
                code: 'KAMPOT',
                destinationKm: 'ខេត្តកំពត & កែប (Kampot & Kep)',
                destinationEn: 'Kampot & Kep City',
                priceRange: '$8 - $11',
                duration: '2.5 - 3 Hours',
                operators: 'Giant Ibis, Ekareach, Champa Express',
                contact: '095 777 888',
                descKm: 'ធ្វើដំណើរតាមផ្លូវជាតិលេខ៣ កម្រាលកៅស៊ូស្អាត លឿន និងសុវត្ថិភាព។',
                descEn: 'Smooth trip via National Road 3 to Kampot pepper plantations and crab market.'
            },
            {
                code: 'POIPET',
                destinationKm: 'ក្រុងប៉ោយប៉ែត (Poipet / Thai Border)',
                destinationEn: 'Poipet (Cambodia-Thailand Border)',
                priceRange: '$14 - $18',
                duration: '7 - 8 Hours',
                operators: 'VET, Capitol, Virak Buntham',
                contact: '081 911 911',
                descKm: 'សម្រាប់អ្នកដំណើរឆ្លងកាត់ព្រំដែនកម្ពុជា-ថៃ ទៅកាន់ទីក្រុងបាងកក។',
                descEn: 'Direct border transit connection to Aranyaprathet and Bangkok.'
            },
            {
                code: 'BAVET',
                destinationKm: 'ក្រុងបាវិត (Bavet / Vietnam Border)',
                destinationEn: 'Bavet (Cambodia-Vietnam Border)',
                priceRange: '$10 - $14',
                duration: '3.5 - 4 Hours',
                operators: 'Giant Ibis, Kumho Samco, Sapaco',
                contact: '023 999 333',
                descKm: 'ធ្វើដំណើរតាមផ្លូវជាតិលេខ១ ឆ្លងកាត់ស្ពានអ្នកលឿង ទៅកាន់ទីក្រុងហូជីមិញ។',
                descEn: 'Direct route via Neak Loeung Bridge to Moc Bai and Ho Chi Minh City.'
            },
            {
                code: 'KOH KONG',
                destinationKm: 'ខេត្តកោះកុង (Koh Kong City)',
                destinationEn: 'Koh Kong (Eco-Tourism)',
                priceRange: '$12 - $16',
                duration: '5 - 6 Hours',
                operators: 'Virak Buntham, Sorya',
                contact: '081 911 911',
                descKm: 'ធ្វើដំណើរតាមផ្លូវជាតិលេខ៤៨ ឆ្លងកាត់ព្រៃព្រឹក្សាជួរភ្នំក្រវាញ។',
                descEn: 'Scenic transit across Cardamom Mountains eco-tourism corridor.'
            }
        ];

        // Filter bus routes
        const filteredBusRoutes = computed(() => {
            if (!busSearchQuery.value.trim()) return busRoutes;
            const q = busSearchQuery.value.toLowerCase().trim();
            return busRoutes.filter(r => 
                r.destinationKm.toLowerCase().includes(q) ||
                r.destinationEn.toLowerCase().includes(q) ||
                r.code.toLowerCase().includes(q)
            );
        });

        return {
            isKhmer,
            activeTransitMode,
            busSearchQuery,
            filteredBusRoutes
        };
    }
};
</script>
