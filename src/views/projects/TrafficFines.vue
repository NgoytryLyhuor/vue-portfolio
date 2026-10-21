<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero HUD Section (Modern Tech Architectural with subtle rounded corners) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'អនុក្រឹត្យលេខ ៣៩ អនក្រ.បក • ច្បាប់ចរាចរណ៍ផ្លូវគោកកម្ពុជា' : 'CAMBODIA SUB-DECREE NO. 39 RNKR.BK • ROAD TRAFFIC LAW' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-rose-600 dark:text-rose-400 font-bold">
                            {{ isKhmer ? 'ប្រព័ន្ធកាត់ពិន្ទុប័ណ្ណបើកបរ (១២ ពិន្ទុ)' : '12-POINT DEMERIT SYSTEM' }}
                        </span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">{{ isKhmer ? 'លេខទូរស័ព្ទទាន់ហេតុការណ៍៖ 117' : 'POLICE HOTLINE: 117' }}</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-block px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-md">
                                {{ isKhmer ? 'តារាងផាកពិន័យផ្លូវការតាមច្បាប់' : 'OFFICIAL TRAFFIC PENALTY SCHEDULE' }}
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'ស្វែងរកការផាកពិន័យចរាចរណ៍ផ្លូវគោកនៅកម្ពុជា' : 'Cambodia Traffic Fines & Penalties Lookup' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ស្វែងរកកម្រិតផាកពិន័យជាប្រាក់រៀល និងដកពិន្ទុប័ណ្ណបើកបរ ផ្អែកតាមអនុក្រឹត្យលេខ ៣៩ អនក្រ.បក សម្រាប់រថយន្តទេសចរណ៍ ម៉ូតូ និងឡានដឹកទំនិញ ព្រមទាំងនីតិវិធីបង់ប្រាក់ត្រឹមត្រូវតាមច្បាប់។' 
                                    : 'Instant lookup for official fines in KHR and driver license demerit points based on Sub-Decree 39 for passenger cars, motorcycles, and heavy trucks with official payment protocol.' }}
                            </p>
                        </div>

                        <!-- 15-Day Payment Notice Box -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'កាលកំណត់បង់ប្រាក់ផាក' : 'Fine Payment Deadline' }}
                                </span>
                                <span class="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                    {{ isKhmer ? '១៥ ថ្ងៃ' : '15 Days' }}
                                </span>
                            </div>
                            <div class="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                                {{ isKhmer ? 'បង់ក្នុងរយៈពេល ១៥ ថ្ងៃ' : 'Pay within 15 Days' }}
                            </div>
                            <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer 
                                    ? 'លើសពី ១៥ ថ្ងៃ ប្រាក់ពិន័យនឹងកើនឡើងទ្វេដង (+១០០%), លើសពី ៣០ ថ្ងៃ កើន ៣ ដង (+២០០%), លើស ៦០ ថ្ងៃ បញ្ជូនទៅតុលាការ។' 
                                    : 'Overdue > 15 days doubles (+100%), > 30 days triples (+200%), and > 60 days results in municipal court prosecution.' }}
                            </p>
                        </div>
                    </div>

                    <!-- Navigation Sub-tabs -->
                    <div class="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pb-1.5 -mx-1 px-1">
                        <button v-for="tab in tabs" :key="tab.id"
                            @click="activeTab = tab.id"
                            class="px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider border rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            :class="activeTab === tab.id 
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white' 
                                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'">
                            <span>{{ tab.icon }}</span>
                            <span>{{ isKhmer ? tab.labelKhmer : tab.labelEn }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- TAB 1: VIOLATIONS SEARCH & LOOKUP (ស្វែងរកការផាកពិន័យ) -->
            <div v-show="activeTab === 'lookup'" class="space-y-6 sm:space-y-8">
                <!-- Search Bar & Vehicle Type Switcher Card -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
                    
                    <!-- Search Input -->
                    <div class="relative">
                        <input v-model="searchQuery" type="text"
                            :placeholder="isKhmer ? '🔍 វាយពាក្យស្វែងរក (ឧ. ស្តុប, មួក, ខ្សែក្រវាត់, ល្បឿន, ស្រវឹង, ទូរស័ព្ទ, ឆៀក, ប័ណ្ណបើកបរ...)' : '🔍 Search violation (e.g. red light, helmet, seatbelt, speeding, alcohol, phone, inspection, license...)'"
                            class="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-sm" />
                        <span class="absolute left-3.5 sm:left-4 top-3 sm:top-3.5 text-slate-400 text-base">⚖️</span>
                        <button v-if="searchQuery" @click="searchQuery = ''"
                            class="absolute right-4 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold">
                            ✕
                        </button>
                    </div>

                    <!-- Vehicle Type Filter Radio Buttons -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div class="text-[11px] sm:text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
                            {{ isKhmer ? 'ជ្រើសរើសប្រភេទមធ្យោបាយ៖' : 'Filter by Vehicle Type:' }}
                        </div>
                        <div class="grid grid-cols-3 sm:flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 w-full sm:w-auto">
                            <button v-for="vType in vehicleTypes" :key="vType.id"
                                @click="selectedVehicleType = vType.id"
                                class="px-2 sm:px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 text-center"
                                :class="selectedVehicleType === vType.id
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'">
                                <span>{{ vType.icon }}</span>
                                <span>{{ isKhmer ? vType.nameKhmer : vType.nameEn }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Category Pills -->
                    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1.5 -mx-1 px-1">
                        <button v-for="cat in categoryFilters" :key="cat.id"
                            @click="selectedCategory = cat.id"
                            class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border"
                            :class="selectedCategory === cat.id
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'">
                            <span>{{ cat.icon }}</span>
                            <span class="ml-1">{{ isKhmer ? cat.nameKhmer : cat.nameEn }}</span>
                        </button>
                    </div>
                </div>

                <!-- Results Counter & Fast Stats -->
                <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-1">
                    <span>
                        {{ isKhmer ? 'រកឃើញ (' + toKhmerNumeral(filteredViolations.length) + ') បទល្មើស' : 'Found (' + filteredViolations.length + ') violations' }}
                    </span>
                    <span class="text-rose-600 dark:text-rose-400 font-bold">
                        {{ isKhmer ? 'កម្រិតផាកពិន័យគិតជារៀល & ដុល្លារ' : 'Penalty amounts in KHR & USD' }}
                    </span>
                </div>

                <!-- Violations Grid Cards -->
                <div v-if="filteredViolations.length === 0" class="border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-12 text-center space-y-3">
                    <div class="text-3xl">🔍</div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {{ isKhmer ? 'មិនមានបទល្មើសដែលត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ' : 'No violations match your query' }}
                    </div>
                    <button @click="searchQuery = ''; selectedCategory = 'all'"
                        class="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg text-xs font-mono font-bold">
                        {{ isKhmer ? 'កំណត់តម្រងឡើងវិញ' : 'Reset filters' }}
                    </button>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div v-for="item in filteredViolations" :key="item.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-4 hover:border-rose-500 dark:hover:border-rose-500 transition-all flex flex-col justify-between">
                        <div class="space-y-3">
                            <!-- Header with Article & Tag -->
                            <div class="flex items-start justify-between gap-2">
                                <div class="flex items-center gap-2">
                                    <span class="text-xl">{{ item.categoryIcon }}</span>
                                    <div>
                                        <div class="text-[10px] font-mono font-bold uppercase text-slate-400">
                                            {{ item.legalArticle }}
                                        </div>
                                        <h3 class="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                                            {{ isKhmer ? item.titleKhmer : item.titleEn }}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <!-- Description -->
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? item.descKhmer : item.descEn }}
                            </p>

                            <!-- Fine Price Bar by selected vehicle type -->
                            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                                <div class="flex items-baseline justify-between">
                                    <div class="text-xs font-mono font-bold uppercase text-slate-500">
                                        {{ currentVehicleLabel }}
                                    </div>
                                    <div class="text-right">
                                        <span class="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 font-mono">
                                            {{ isKhmer ? toKhmerNumeral(formatKhr(getCurrentFineKhr(item))) : formatKhr(getCurrentFineKhr(item)) }} ៛
                                        </span>
                                        <span class="text-xs font-mono text-slate-500 ml-1">
                                            (≈ ${{ (getCurrentFineKhr(item) / 4000).toFixed(2) }})
                                        </span>
                                    </div>
                                </div>

                                <!-- Moto vs Car vs Truck quick compare strip -->
                                <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                                    <span>🏍️ {{ isKhmer ? toKhmerNumeral(formatKhr(item.fines.moto)) : formatKhr(item.fines.moto) }} ៛</span>
                                    <span>🚗 {{ isKhmer ? toKhmerNumeral(formatKhr(item.fines.car)) : formatKhr(item.fines.car) }} ៛</span>
                                    <span>🚛 {{ isKhmer ? toKhmerNumeral(formatKhr(item.fines.truck)) : formatKhr(item.fines.truck) }} ៛</span>
                                </div>
                            </div>
                        </div>

                        <!-- Footer Badges: Demerit Points & Vehicle Impound -->
                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                            <!-- Demerit point badge -->
                            <div class="flex items-center gap-1.5">
                                <span class="px-2 py-0.5 rounded text-[11px] font-bold"
                                    :class="item.demeritPoints > 0 
                                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'">
                                    {{ item.demeritPoints > 0 ? (isKhmer ? 'ដក ' + toKhmerNumeral(item.demeritPoints) + ' ពិន្ទុ' : '-' + item.demeritPoints + ' Points') : (isKhmer ? 'មិនដកពិន្ទុ' : 'No Demerit') }}
                                </span>
                                <span v-if="item.impoundRisk" class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                    {{ isKhmer ? '⚠️ ឃាត់យានយន្ត' : '⚠️ Vehicle Impound' }}
                                </span>
                            </div>

                            <span class="text-[11px] text-slate-400">
                                {{ isKhmer ? item.noteKhmer : item.noteEn }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 2: SPEED LIMITS & DRUNK DRIVING (ល្បឿនកំណត់ & ជាតិស្រវឹង) -->
            <div v-show="activeTab === 'limits'" class="space-y-6 sm:space-y-8">
                <!-- Drunk Driving Tiers Section -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🍺</span>
                        <div>
                            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'កម្រិតជាតិស្រវឹង និងទោសទណ្ឌតាមច្បាប់ (Drunk Driving Tiers)' : 'Cambodia Alcohol & Drunk Driving Penalty Matrix' }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ការវាស់ជាតិអាល់កុលតាមខ្យល់ដង្ហើម (mg/L) ឬក្នុងឈាម (g/L)' : 'Breathalyzer test (mg/L air) or blood test (g/L blood)' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <!-- Tier 1 -->
                        <div class="p-4 rounded-xl border border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 uppercase">
                                    {{ isKhmer ? 'កម្រិតស្រាល' : 'Tier 1' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                                    0.25 – 0.39 mg/L
                                </span>
                            </div>
                            <div class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ស្រវឹងស្រាល (មិនទាន់ដល់កម្រិតព្រហ្មទណ្ឌ)' : 'Mild Intoxication' }}
                            </div>
                            <div class="space-y-1 text-xs font-mono pt-1 text-slate-700 dark:text-slate-300">
                                <div>🏍️ ម៉ូតូ៖ <strong class="text-rose-600">២៥០,០០០ ៛</strong> (~$62.50)</div>
                                <div>🚗 ឡាន៖ <strong class="text-rose-600">៤០០,០០០ ៛</strong> (~$100.00)</div>
                                <div>🚛 ឡានធំ៖ <strong class="text-rose-600">៨០០,០០០ ៛</strong> (~$200.00)</div>
                                <div class="text-rose-600 dark:text-rose-400 pt-1 font-bold">⚠️ ដក ៤ ពិន្ទុប័ណ្ណបើកបរ</div>
                            </div>
                        </div>

                        <!-- Tier 2 -->
                        <div class="p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 uppercase">
                                    {{ isKhmer ? 'កម្រិតមធ្យម' : 'Tier 2' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">
                                    0.40 – 0.80 mg/L
                                </span>
                            </div>
                            <div class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ស្រវឹងកម្រិតខ្ពស់ (ឃាត់យានយន្ត)' : 'Moderate to Severe' }}
                            </div>
                            <div class="space-y-1 text-xs font-mono pt-1 text-slate-700 dark:text-slate-300">
                                <div>🏍️ ម៉ូតូ៖ <strong class="text-rose-600">១,០០០,០០០ ៛</strong> (~$250.00)</div>
                                <div>🚗 ឡាន៖ <strong class="text-rose-600">២,០០០,០០០ ៛</strong> (~$500.00)</div>
                                <div>🚛 ឡានធំ៖ <strong class="text-rose-600">៣,០០០,០០០ ៛</strong> (~$750.00)</div>
                                <div class="text-rose-600 dark:text-rose-400 pt-1 font-bold">⚠️ ដក ៦ ពិន្ទុ + ឃាត់យានយន្តទុក</div>
                            </div>
                        </div>

                        <!-- Tier 3 -->
                        <div class="p-4 rounded-xl border border-red-500 bg-red-100/50 dark:bg-red-950/40 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white uppercase">
                                    {{ isKhmer ? 'កម្រិតធ្ងន់ធ្ងរ' : 'Tier 3 (Crime)' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-red-700 dark:text-red-400">
                                    > 0.80 mg/L
                                </span>
                            </div>
                            <div class="text-sm font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ទោសព្រហ្មទណ្ឌ (ឃាត់ខ្លួន & ជាប់ពន្ធនាគារ)' : 'Criminal Level (Jail)' }}
                            </div>
                            <div class="space-y-1 text-xs font-mono pt-1 text-slate-700 dark:text-slate-300">
                                <div>🏍️ ម៉ូតូ៖ <strong class="text-red-600">២,០០០,០០០ ៛</strong></div>
                                <div>🚗 ឡាន៖ <strong class="text-red-600">៤,០០០,០០០ ៛</strong> (~$1,000)</div>
                                <div>🚛 ឡានធំ៖ <strong class="text-red-600">៦,០០០,០០០ ៛</strong></div>
                                <div class="text-red-600 font-bold pt-1">
                                    🚨 បញ្ជូនទៅតុលាការ + ជាប់ពន្ធនាគារ ១ ទៅ ៦ ខែ!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Speed Limits Official Guidelines Table -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <span class="text-2xl">⚡</span>
                        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            {{ isKhmer ? 'កម្រិតល្បឿនអតិបរមាអនុញ្ញាតលើផ្លូវសាធារណៈនៅកម្ពុជា' : 'Official Speed Limits by Road Classification in Cambodia' }}
                        </h3>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-xs font-mono">
                            <thead>
                                <tr class="text-slate-400 border-b border-slate-200 dark:border-slate-800 text-left">
                                    <th class="py-2.5 px-3 uppercase font-bold">{{ isKhmer ? 'ប្រភេទផ្លូវ' : 'Road Category' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-blue-600 dark:text-blue-400">🚗 {{ isKhmer ? 'ឡានទេសចរណ៍' : 'Passenger Car' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-amber-600 dark:text-amber-400">🏍️ {{ isKhmer ? 'ម៉ូតូ' : 'Motorcycle' }}</th>
                                    <th class="py-2.5 px-3 uppercase font-bold text-emerald-600 dark:text-emerald-400">🚛 {{ isKhmer ? 'ឡានធំ / ឡានដឹក' : 'Heavy Truck' }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                <tr>
                                    <td class="py-3 px-3 font-bold">
                                        {{ isKhmer ? 'ក្នុងទីប្រជុំជន (Urban / City Center)' : 'Built-up / Urban Area' }}
                                    </td>
                                    <td class="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">40 km/h</td>
                                    <td class="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold">30 km/h</td>
                                    <td class="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">30 km/h</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-3 font-bold">
                                        {{ isKhmer ? 'ក្រៅទីប្រជុំជន / ផ្លូវជាតិ (National Highway)' : 'Rural / National Highway' }}
                                    </td>
                                    <td class="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">90 km/h (80 km/h divided)</td>
                                    <td class="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold">70 km/h</td>
                                    <td class="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">60 km/h</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-3 font-bold">
                                        {{ isKhmer ? 'ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ (Expressway)' : 'Phnom Penh – Sihanoukville Expressway' }}
                                    </td>
                                    <td class="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">60 – 120 km/h</td>
                                    <td class="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold">100 km/h (≥ 500cc)</td>
                                    <td class="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">80 – 100 km/h</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 3: DEMERIT POINTS SYSTEM (ប្រព័ន្ធកាត់ពិន្ទុប័ណ្ណបើកបរ) -->
            <div v-show="activeTab === 'points'" class="space-y-6 sm:space-y-8">
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🪪</span>
                        <div>
                            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'ប្រព័ន្ធកាត់ពិន្ទុប័ណ្ណបើកបរ ១២ ពិន្ទុរបស់ក្រសួងសាធារណការ' : 'Cambodia 12-Point Driver Demerit Point System' }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'គ្រប់ប័ណ្ណបើកបរទាំងអស់មានពិន្ទុសរុប ១២ ពិន្ទុពេញ។ ពេលប្រព្រឹត្តល្មើស ប៉ូលិសនឹងស្កេន QR Code កាត់ពិន្ទុតាមទំហំកំហុស។' : 'Every driver license is issued with 12 points. Police scan the QR code to deduct points upon violations.' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                        <!-- 1 Point -->
                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                    -1 POINT
                                </span>
                            </div>
                            <div class="text-xs font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'កំហុសស្រាល' : 'Minor Infractions' }}
                            </div>
                            <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                                <li>{{ isKhmer ? 'មិនពាក់ខ្សែក្រវាត់ / មួក' : 'No seatbelt / helmet' }}</li>
                                <li>{{ isKhmer ? 'និយាយទូរស័ព្ទគ្មានកាស' : 'Phone without headset' }}</li>
                                <li>{{ isKhmer ? 'លើសល្បឿន < 20 km/h' : 'Speeding < 20 km/h' }}</li>
                                <li>{{ isKhmer ? 'បើកបរជាន់គំនូសស' : 'Crossing solid line' }}</li>
                            </ul>
                        </div>

                        <!-- 2 Points -->
                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                    -2 POINTS
                                </span>
                            </div>
                            <div class="text-xs font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'កំហុសមធ្យម' : 'Moderate Infractions' }}
                            </div>
                            <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                                <li>{{ isKhmer ? 'បំពានភ្លើងស្តុបក្រហម' : 'Running red light' }}</li>
                                <li>{{ isKhmer ? 'បើកបរបញ្ច្រាសទិស' : 'Driving wrong-way' }}</li>
                                <li>{{ isKhmer ? 'លើសល្បឿន 20–29 km/h' : 'Speeding 20–29 km/h' }}</li>
                                <li>{{ isKhmer ? 'វ៉ាជែងកន្លែងគ្រោះថ្នាក់' : 'Dangerous overtaking' }}</li>
                            </ul>
                        </div>

                        <!-- 3-4 Points -->
                        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                    -3 ទៅ -4 POINTS
                                </span>
                            </div>
                            <div class="text-xs font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'កំហុសធ្ងន់' : 'Severe Infractions' }}
                            </div>
                            <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                                <li>{{ isKhmer ? 'ជាតិស្រវឹង 0.25–0.39 mg/L' : 'DUI 0.25–0.39 mg/L' }}</li>
                                <li>{{ isKhmer ? 'លើសល្បឿន 30–39 km/h' : 'Speeding 30–39 km/h' }}</li>
                                <li>{{ isKhmer ? 'គេចវេះមិនឱ្យប៉ូលិសត្រួតពិនិត្យ' : 'Evading police check' }}</li>
                            </ul>
                        </div>

                        <!-- 6 Points & Revocation -->
                        <div class="p-4 rounded-xl border border-red-300 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white">
                                    -6 POINTS / អស់ពិន្ទុ
                                </span>
                            </div>
                            <div class="text-xs font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ព្យួរ ឬដកហូតប័ណ្ណបើកបរ' : 'License Revocation' }}
                            </div>
                            <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                                <li>{{ isKhmer ? 'ជាតិស្រវឹង > 0.40 mg/L' : 'DUI > 0.40 mg/L' }}</li>
                                <li>{{ isKhmer ? 'មានសារធាតុញៀនក្នុងខ្លួន' : 'Driving under drugs' }}</li>
                                <li>{{ isKhmer ? 'បើកបរអស់ពិន្ទុ ត្រូវរៀនឡើងវិញ' : 'Points hit 0: Retest required' }}</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Restoration of Points -->
                    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <div class="font-bold text-slate-800 dark:text-slate-200">
                            🔄 {{ isKhmer ? 'របៀបទទួលបានពិន្ទុមកវិញ (Point Restoration):' : 'How Demerit Points are Restored:' }}
                        </div>
                        <p>
                            {{ isKhmer 
                                ? 'ប្រសិនបើអ្នកមិនប្រព្រឹត្តល្មើសបន្ថែមសោះក្នុងរយៈពេល ១ ឆ្នាំ អ្នកនឹងទទួលបាន ៦ ពិន្ទុឡើងវិញ។ ប្រសិនបើគ្មានកំហុសសោះក្នុងរយៈពេល ២ ឆ្នាំ អ្នកនឹងទទួលបានពិន្ទុពេញ ១២ ឡើងវិញដោយស្វ័យប្រវត្តិ។' 
                                : 'If no infractions are committed for 1 full year, 6 points are restored. With zero violations for 2 consecutive years, the full 12-point balance is automatically restored.' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- TAB 4: PROTOCOLS & PAYMENT RIGHTS (នីតិវិធីបង់ប្រាក់ & សិទ្ធិអ្នកបើកបរ) -->
            <div v-show="activeTab === 'rights'" class="space-y-6 sm:space-y-8">
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <span class="text-2xl">📋</span>
                        <div>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                {{ isKhmer ? 'សិទ្ធិ និងកាតព្វកិច្ចរបស់អ្នកបើកបរពេលសមត្ថកិច្ចហៅត្រួតពិនិត្យ' : 'Driver Rights & Official Roadside Police Protocols' }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ការណែនាំផ្លូវការដើម្បីធានាតម្លាភាព និងភាពត្រឹមត្រូវតាមច្បាប់' : 'Official legal guidance for fair and transparent enforcement' }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div v-for="item in driverRights" :key="item.id"
                            class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="flex items-center gap-2">
                                <span class="text-lg">{{ item.icon }}</span>
                                <h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? item.titleKhmer : item.titleEn }}
                                </h4>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? item.descKhmer : item.descEn }}
                            </p>
                        </div>
                    </div>

                    <!-- Official Payment Channels -->
                    <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                        <div class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            {{ isKhmer ? 'កន្លែងដែលត្រូវទៅបង់ប្រាក់ផាកពិន័យផ្លូវការ៖' : 'Official Payment Methods & Locations:' }}
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                                <div class="font-bold text-blue-600 dark:text-blue-400">🏢 ស្នងការដ្ឋាននគរបាល</div>
                                <p class="text-slate-500">ការិយាល័យនគរបាលចរាចរណ៍ផ្លូវគោក នៃរាជធានី-ខេត្តដែលបានប្រព្រឹត្តល្មើស។</p>
                            </div>
                            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                                <div class="font-bold text-emerald-600 dark:text-emerald-400">📱 ធនាគារ & Online</div>
                                <p class="text-slate-500">បង់តាម App ធនាគារដៃគូ (ABA, Acleda, Wing) តាមរយៈលេខកូដប័ណ្ណផាកពិន័យ។</p>
                            </div>
                            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                                <div class="font-bold text-amber-600 dark:text-amber-400">🧾 បង្កាន់ដៃមានត្រា</div>
                                <p class="text-slate-500">ត្រូវតែមានលេខកូដស៊េរី ឈ្មោះសមត្ថកិច្ច និងត្រាក្រសួងមហាផ្ទៃត្រឹមត្រូវ។</p>
                            </div>
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
const activeTab = ref('lookup');

const tabs = [
    { id: 'lookup', icon: '⚖️', labelKhmer: 'ស្វែងរកការផាកពិន័យ', labelEn: 'Violations Search' },
    { id: 'limits', icon: '⚡', labelKhmer: 'ល្បឿនកំណត់ & ជាតិស្រវឹង', labelEn: 'Speed & Alcohol Matrix' },
    { id: 'points', icon: '🪪', labelKhmer: 'ប្រព័ន្ធកាត់ពិន្ទុ (១២ ពិន្ទុ)', labelEn: 'Demerit Point System' },
    { id: 'rights', icon: '📋', labelKhmer: 'នីតិវិធី & សិទ្ធិអ្នកបើកបរ', labelEn: 'Driver Rights & Protocols' }
];

// Vehicle Types Filter
const vehicleTypes = [
    { id: 'car', icon: '🚗', nameKhmer: 'រថយន្តទេសចរណ៍', nameEn: 'Passenger Car' },
    { id: 'moto', icon: '🏍️', nameKhmer: 'ម៉ូតូ / ត្រីចក្រយាន', nameEn: 'Motorcycle' },
    { id: 'truck', icon: '🚛', nameKhmer: 'រថយន្តធុនធ្ងន់', nameEn: 'Heavy Truck' }
];

const selectedVehicleType = ref('car');
const searchQuery = ref('');
const selectedCategory = ref('all');

const currentVehicleLabel = computed(() => {
    if (selectedVehicleType.value === 'car') {
        return isKhmer.value ? 'រថយន្តទេសចរណ៍ / គ្រួសារ' : 'Passenger Car';
    } else if (selectedVehicleType.value === 'moto') {
        return isKhmer.value ? 'ទោចក្រយានយន្ត (ម៉ូតូ)' : 'Motorcycle';
    } else {
        return isKhmer.value ? 'រថយន្តធុនធ្ងន់ / ឡានដឹក' : 'Heavy Truck / Bus';
    }
});

// Category Filters
const categoryFilters = [
    { id: 'all', icon: '🌟', nameKhmer: 'ទាំងអស់', nameEn: 'All' },
    { id: 'lights_signs', icon: '🚦', nameKhmer: 'ភ្លើងស្តុប & ស្លាកសញ្ញា', nameEn: 'Lights & Signs' },
    { id: 'helmet_belt', icon: '🛡️', nameKhmer: 'មួក & ខ្សែក្រវាត់', nameEn: 'Helmet & Seatbelt' },
    { id: 'speeding', icon: '⚡', nameKhmer: 'លើសល្បឿន', nameEn: 'Speeding' },
    { id: 'alcohol', icon: '🍺', nameKhmer: 'ជាតិស្រវឹង', nameEn: 'DUI / Alcohol' },
    { id: 'phone', icon: '📱', nameKhmer: 'ទូរស័ព្ទដៃ', nameEn: 'Phone Use' },
    { id: 'docs', icon: '🪪', nameKhmer: 'ឯកសារ ប័ណ្ណ & ឆៀក', nameEn: 'Docs & Inspection' },
    { id: 'overtake', icon: '⚠️', nameKhmer: 'បញ្ច្រាសទិស & វ៉ាជែង', nameEn: 'Wrong-Way & Overtake' },
    { id: 'equipment', icon: '💡', nameKhmer: 'ភ្លើង & បច្ចេកទេស', nameEn: 'Lights & Equipment' }
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

// Comprehensive Violations Database based on Sub-Decree No. 39 RNKR.BK
const violationsDatabase = [
    {
        id: 'red_light',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៨',
        category: 'lights_signs',
        categoryIcon: '🚦',
        titleKhmer: 'បើកបរបំពានភ្លើងសញ្ញាចរាចរណ៍ពណ៌ក្រហម (បំពានស្តុប)',
        titleEn: 'Running Red Traffic Light Violation',
        descKhmer: 'ការបើកបរឆ្លងកាត់ភ្លើងសញ្ញាក្រហម ឬមិនគោរពតាមភ្លើងសញ្ញាឈប់។ ជាមូលហេតុបង្កគ្រោះថ្នាក់ញឹកញាប់បំផុតនៅតាមបណ្តាផ្លូវបំបែក។',
        descEn: 'Failing to stop at a solid red traffic light or disregarding electronic intersection signals.',
        fines: { car: 180000, moto: 100000, truck: 375000 },
        demeritPoints: 2,
        impoundRisk: false,
        noteKhmer: 'កាត់ ២ ពិន្ទុពីប័ណ្ណបើកបរ',
        noteEn: '-2 Demerit points deducted'
    },
    {
        id: 'no_seatbelt',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'helmet_belt',
        categoryIcon: '🛡️',
        titleKhmer: 'អ្នកបើកបរ ឬអ្នករួមដំណើរខាងមុខមិនពាក់ខ្សែក្រវាត់សុវត្ថិភាព',
        titleEn: 'Driver or Front Passenger Not Wearing Seatbelt',
        descKhmer: 'ការមិនពាក់ខ្សែក្រវាត់សុវត្ថិភាពពេលរថយន្តកំពុងធ្វើចរាចរណ៍លើទ្រូងផ្លូវ។ ពិន័យលើអ្នកបើកបរ និងអ្នកអង្គុយក្បែរ។',
        descEn: 'Operating a motor vehicle without fastening safety belt. Applies to both driver and front-seat passenger.',
        fines: { car: 75000, moto: 0, truck: 150000 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'ពិន័យ ៧៥,០០០៛ ក្នុងម្នាក់',
        noteEn: '75,000 KHR per occupant'
    },
    {
        id: 'no_helmet',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៦',
        category: 'helmet_belt',
        categoryIcon: '🛡️',
        titleKhmer: 'អ្នកបើកបរ ឬអ្នករួមដំណើរលើម៉ូតូមិនពាក់មួកសុវត្ថិភាព',
        titleEn: 'Motorcycle Driver or Pillion Rider Without Safety Helmet',
        descKhmer: 'មិនពាក់មួក ឬពាក់មួកមិនត្រឹមត្រូវតាមស្តង់ដារ ឬមិនដាក់គន្លឹះខ្សែក្រោមចង្កា ពេលបើកបរម៉ូតូ។',
        descEn: 'Riding motorcycle or moped without strapped standard protective helmet. Enforced for both operator and passenger.',
        fines: { car: 0, moto: 60000, truck: 0 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'ពិន័យ ៦០,០០០៛ ក្នុងម្នាក់',
        noteEn: '60,000 KHR per rider'
    },
    {
        id: 'speed_1_19',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧ & ៨',
        category: 'speeding',
        categoryIcon: '⚡',
        titleKhmer: 'បើកបរលើសល្បឿនកំណត់ចាប់ពី ១ ដល់ ១៩ គីឡូម៉ែត្រ/ម៉ោង',
        titleEn: 'Exceeding Speed Limit by 1 to 19 km/h',
        descKhmer: 'ការបើកបរលើសល្បឿនដែលបានកំណត់ដោយស្លាកសញ្ញា ឬច្បាប់ក្នុងកម្រិតក្រោម ២០ គីឡូម៉ែត្រ/ម៉ោង។',
        descEn: 'Exceeding posted speed limit or urban maximum by 1 to 19 km/h captured via speed radar.',
        fines: { car: 120000, moto: 60000, truck: 250000 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'កាត់ ១ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-1 Demerit point'
    },
    {
        id: 'speed_20_29',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៨',
        category: 'speeding',
        categoryIcon: '⚡',
        titleKhmer: 'បើកបរលើសល្បឿនកំណត់ចាប់ពី ២០ ដល់ ២៩ គីឡូម៉ែត្រ/ម៉ោង',
        titleEn: 'Exceeding Speed Limit by 20 to 29 km/h',
        descKhmer: 'ការបើកបរល្បឿនលឿនលើសល្បឿនកំណត់ចន្លោះ ២០ ដល់ ២៩ គីឡូម៉ែត្រ/ម៉ោង។',
        descEn: 'Exceeding designated speed limit between 20 and 29 km/h.',
        fines: { car: 180000, moto: 90000, truck: 375000 },
        demeritPoints: 2,
        impoundRisk: false,
        noteKhmer: 'កាត់ ២ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-2 Demerit points'
    },
    {
        id: 'speed_30_39',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៩',
        category: 'speeding',
        categoryIcon: '⚡',
        titleKhmer: 'បើកបរលើសល្បឿនកំណត់ចាប់ពី ៣០ ដល់ ៣៩ គីឡូម៉ែត្រ/ម៉ោង',
        titleEn: 'Exceeding Speed Limit by 30 to 39 km/h',
        descKhmer: 'ការបើកបរលើសល្បឿនកំណត់ខ្លាំង បង្កគ្រោះថ្នាក់ខ្ពស់លើផ្លូវជាតិ ឬផ្លូវល្បឿនលឿន។',
        descEn: 'Severe speeding violation between 30 and 39 km/h above threshold.',
        fines: { car: 300000, moto: 150000, truck: 600000 },
        demeritPoints: 3,
        impoundRisk: false,
        noteKhmer: 'កាត់ ៣ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-3 Demerit points'
    },
    {
        id: 'speed_40_plus',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ១០',
        category: 'speeding',
        categoryIcon: '⚡',
        titleKhmer: 'បើកបរលើសល្បឿនកំណត់ចាប់ពី ៤០ គីឡូម៉ែត្រ/ម៉ោងឡើងទៅ',
        titleEn: 'Exceeding Speed Limit by 40+ km/h',
        descKhmer: 'ល្មើសល្បឿនកម្រិតធ្ងន់ធ្ងរបំផុត។ ក្រៅពីការផាកពិន័យ អាចប្រឈមនឹងការដកហូតប័ណ្ណបើកបរ និងបញ្ជូនទៅតុលាការ។',
        descEn: 'Extreme speeding over 40 km/h. Subject to maximum fines, heavy demerit loss, and judicial summons.',
        fines: { car: 600000, moto: 300000, truck: 1000000 },
        demeritPoints: 4,
        impoundRisk: true,
        noteKhmer: 'កាត់ ៤ ពិន្ទុ + អាចព្យួរប័ណ្ណ',
        noteEn: '-4 Demerit points + Suspended'
    },
    {
        id: 'alcohol_tier1',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ១០',
        category: 'alcohol',
        categoryIcon: '🍺',
        titleKhmer: 'បើកបរមានជាតិស្រវឹង ០.២៥ ដល់ ០.៣៩ mg/L ខ្យល់ដង្ហើម',
        titleEn: 'DUI: Alcohol Level 0.25 to 0.39 mg/L Breath',
        descKhmer: 'កម្រិតជាតិស្រវឹងស្រាល (ស្មើនឹង ០.៥០ ដល់ ០.៧៩ ក្រាម/លីត្រឈាម)។ ត្រូវផាកពិន័យជាប្រាក់ និងកាត់ ៤ ពិន្ទុ។',
        descEn: 'Breath alcohol concentration 0.25 – 0.39 mg/L (blood 0.50 – 0.79 g/L). High financial fine and points deduction.',
        fines: { car: 400000, moto: 250000, truck: 800000 },
        demeritPoints: 4,
        impoundRisk: false,
        noteKhmer: 'ដក ៤ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-4 Demerit points'
    },
    {
        id: 'alcohol_tier2',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ១១',
        category: 'alcohol',
        categoryIcon: '🍺',
        titleKhmer: 'បើកបរមានជាតិស្រវឹង ០.៤០ ដល់ ០.៨០ mg/L (កម្រិតខ្ពស់)',
        titleEn: 'DUI: Alcohol Level 0.40 to 0.80 mg/L Breath',
        descKhmer: 'កម្រិតជាតិស្រវឹងខ្ពស់។ ត្រូវផាកពិន័យធ្ងន់ កាត់ ៦ ពិន្ទុ និងឃាត់ទុកយានយន្តរហូតទាល់តែស្វាងស្រវឹង។',
        descEn: 'Substantial alcohol level 0.40 – 0.80 mg/L. Heavy fine, 6-point deduction, and vehicle impounded on site.',
        fines: { car: 2000000, moto: 1000000, truck: 3000000 },
        demeritPoints: 6,
        impoundRisk: true,
        noteKhmer: 'ដក ៦ ពិន្ទុ + ឃាត់យានយន្ត',
        noteEn: '-6 Points + Impound'
    },
    {
        id: 'alcohol_tier3',
        legalArticle: 'ច្បាប់ចរាចរណ៍ • មាត្រា ៧៧ & ៨២',
        category: 'alcohol',
        categoryIcon: '🍺',
        titleKhmer: 'បើកបរមានជាតិស្រវឹងលើសពី ០.៨០ mg/L (ទោសព្រហ្មទណ្ឌ)',
        titleEn: 'DUI Crime: Alcohol Level > 0.80 mg/L Breath',
        descKhmer: 'ស្រវឹងកម្រិតគ្រោះថ្នាក់បំផុត។ ត្រូវឃាត់ខ្លួនភ្លាមៗ បញ្ជូនទៅតុលាការ ផ្តន្ទាទោសពន្ធនាគារពី ១ ទៅ ៦ ខែ និងពិន័យជាប្រាក់។',
        descEn: 'Severe criminal DUI over 0.80 mg/L. Mandatory arrest, court prosecution, 1 to 6 months imprisonment.',
        fines: { car: 4000000, moto: 2000000, truck: 6000000 },
        demeritPoints: 6,
        impoundRisk: true,
        noteKhmer: 'ជាប់ពន្ធនាគារ ១-៦ ខែ + តុលាការ',
        noteEn: 'Jail 1–6 mos + Court'
    },
    {
        id: 'mobile_phone',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'phone',
        categoryIcon: '📱',
        titleKhmer: 'ប្រើប្រាស់ទូរស័ព្ទដៃដោយដៃពេលកំពុងបើកបរ (គ្មានឧបករណ៍ជំនួយ)',
        titleEn: 'Operating Handheld Mobile Phone While Driving',
        descKhmer: 'ការលើកទូរស័ព្ទនិយាយ ឬចុចផ្ញើសារដោយដៃផ្ទាល់ពេលកំពុងបញ្ជាចង្កូតរថយន្ត ឬម៉ូតូ ដោយមិនប្រើ Bluetooth/Earphone។',
        descEn: 'Holding or texting on a mobile device without certified hands-free system during vehicle operation.',
        fines: { car: 120000, moto: 80000, truck: 250000 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'កាត់ ១ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-1 Demerit point'
    },
    {
        id: 'wrong_way',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៨',
        category: 'overtake',
        categoryIcon: '⚠️',
        titleKhmer: 'បើកបរបញ្ច្រាសទិសចរាចរណ៍លើផ្លូវឯកទិស ឬផ្លូវមានសួនចែកទ្រូង',
        titleEn: 'Driving Wrong-Way on One-Way or Divided Road',
        descKhmer: 'ការបើកបរបញ្ច្រាសទិសចរាចរណ៍លើផ្លូវមួយ chiều ឬផ្លូវជាតិដែលមានសួនចែកទ្រូងផ្លូវ។',
        descEn: 'Driving opposite to designated traffic flow on one-way streets or dual-carriageway divided highways.',
        fines: { car: 180000, moto: 100000, truck: 375000 },
        demeritPoints: 2,
        impoundRisk: false,
        noteKhmer: 'កាត់ ២ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-2 Demerit points'
    },
    {
        id: 'dangerous_overtake',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៨',
        category: 'overtake',
        categoryIcon: '⚠️',
        titleKhmer: 'វ៉ាជែងប្រថុយប្រថានលើផ្លូវកោង លើស្ពាន ឬផ្លូវប្រសព្វ',
        titleEn: 'Hazardous Overtaking on Curves, Bridges, or Crossings',
        descKhmer: 'វ៉ាជែងនៅកន្លែងហាមឃាត់ ដែលគ្មានគំហើញច្បាស់លាស់ ដូចជាលើស្ពាន ផ្លូវកោង ឬផ្លូវប្រសព្វ។',
        descEn: 'Overtaking in blind zones, crests, bridges, or intersections where overtaking is legally prohibited.',
        fines: { car: 150000, moto: 80000, truck: 300000 },
        demeritPoints: 2,
        impoundRisk: false,
        noteKhmer: 'កាត់ ២ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-2 Demerit points'
    },
    {
        id: 'expired_inspection',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៨ & សេចក្តីប្រកាស MPWT',
        category: 'docs',
        categoryIcon: '🪪',
        titleKhmer: 'រថយន្តហួសកាលកំណត់ឆៀក (ផុតសុពលភាពត្រួតពិនិត្យលក្ខណៈបច្ចេកទេស)',
        titleEn: 'Driving with Expired Technical Inspection (Chheak)',
        descKhmer: 'រថយន្តមិនបានយកទៅឆៀកតាមកាលកំណត់។ ក្រៅពីប្រាក់ពិន័យគោល ១៨០,០០០ ៛ ត្រូវរងការផាកពិន័យបន្ថែម ៥០០ រៀលក្នុងមួយថ្ងៃយឺតយ៉ាវ! (ឡានធំ ២,០០០ ៛/ថ្ងៃ)។',
        descEn: 'Operating vehicle past vehicle inspection expiration date. Incurs a 180,000 KHR base fine plus 500 KHR/day overdue surcharge!',
        fines: { car: 180000, moto: 0, truck: 375000 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'ពិន័យ + ៥០០៛/ថ្ងៃយឺត',
        noteEn: '+500 KHR/day surcharge'
    },
    {
        id: 'no_license',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៩',
        category: 'docs',
        categoryIcon: '🪪',
        titleKhmer: 'បើកបរដោយគ្មានប័ណ្ណបើកបរ ឬប្រើប័ណ្ណបើកបរផុតសុពលភាព',
        titleEn: 'Driving Without Valid Driver License or Expired License',
        descKhmer: 'ការបញ្ជាយានយន្តដោយមិនមានប័ណ្ណបើកបរ ឬប្រើប័ណ្ណបើកបរខុសប្រភេទ ឬប័ណ្ណបើកបរបានផុតកំណត់សុពលភាព។',
        descEn: 'Operating vehicle without holding a valid Cambodian driver license or driving on an expired license.',
        fines: { car: 240000, moto: 120000, truck: 600000 },
        demeritPoints: 0,
        impoundRisk: true,
        noteKhmer: 'ឃាត់យានយន្តរហូតមានអ្នកមានប័ណ្ណមកយក',
        noteEn: 'Vehicle held until licensed driver arrives'
    },
    {
        id: 'no_registration_card',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'docs',
        categoryIcon: '🪪',
        titleKhmer: 'គ្មានប័ណ្ណសម្គាល់យានយន្ត (កាតគ្រី) ជាប់ខ្លួនពេលបើកបរ',
        titleEn: 'Driving Without Vehicle Registration Card (Katkri)',
        descKhmer: 'មិនមានកាតគ្រីច្បាប់ដើម ឬច្បាប់ថតចម្លងមានការបញ្ជាក់ត្រឹមត្រូវក្នុងរថយន្តដើម្បីបង្ហាញជូនសមត្ថកិច្ច។',
        descEn: 'Failing to carry original or certified copy of official vehicle registration card inside vehicle.',
        fines: { car: 120000, moto: 60000, truck: 250000 },
        demeritPoints: 0,
        impoundRisk: false,
        noteKhmer: 'ពិន័យ ១២០,០០០៛',
        noteEn: '120,000 KHR fine'
    },
    {
        id: 'no_plates',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៩',
        category: 'docs',
        categoryIcon: '🪪',
        titleKhmer: 'យានយន្តគ្មានស្លាកលេខ ឬបិទបាំងស្លាកលេខ',
        titleEn: 'Vehicle Without License Plates or Obscured Plates',
        descKhmer: 'ការបើកបររថយន្ត ឬម៉ូតូគ្មានស្លាកលេខ ឬប្រើស្លាកលេខក្លែងក្លាយ ឬបិទបាំងមិនឱ្យមើលឃើញលេខតួ/អក្សរ។',
        descEn: 'Operating motor vehicle without official registration plates or deliberately concealing plate numbers.',
        fines: { car: 240000, moto: 120000, truck: 500000 },
        demeritPoints: 1,
        impoundRisk: true,
        noteKhmer: 'ឃាត់យានយន្តបណ្តោះអាសន្ន',
        noteEn: 'Temporary impound'
    },
    {
        id: 'illegal_parking',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'overtake',
        categoryIcon: '⚠️',
        titleKhmer: 'ចតយានយន្តល្មើសច្បាប់ ឬបង្កការកកស្ទះចរាចរណ៍',
        titleEn: 'Illegal Parking Obstructing Traffic Flow',
        descKhmer: 'ចតនៅកន្លែងមានស្លាកហាមចត ចតលើគំនូសថ្មើរជើង ឬចតទន្ទឹមគ្នាបង្កឱ្យស្ទះផ្លូវសាធារណៈ។',
        descEn: 'Parking in designated "No Parking" zones, pedestrian crossings, or double-parking disrupting street flow.',
        fines: { car: 150000, moto: 50000, truck: 300000 },
        demeritPoints: 0,
        impoundRisk: false,
        noteKhmer: 'អាចត្រូវស្ទូចឡានយកទៅរក្សាទុក',
        noteEn: 'Subject to tow-away'
    },
    {
        id: 'headlights_night',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'equipment',
        categoryIcon: '💡',
        titleKhmer: 'មិនបើកភ្លើងបំភ្លឺពេលយប់ ឬភ្លើងបំភ្លឺមិនដំណើរការ',
        titleEn: 'Driving at Night Without Functional Headlights',
        descKhmer: 'ការបើកបរនៅពេលយប់ ឬពេលមេឃងងឹតដោយមិនបើកភ្លើង ឬភ្លើងរថយន្តខូចមិនគ្រប់គ្រង។',
        descEn: 'Driving during darkness or adverse weather without illuminating road-compliant headlamps.',
        fines: { car: 120000, moto: 60000, truck: 250000 },
        demeritPoints: 1,
        impoundRisk: false,
        noteKhmer: 'កាត់ ១ ពិន្ទុប័ណ្ណបើកបរ',
        noteEn: '-1 Demerit point'
    },
    {
        id: 'illegal_high_beams',
        legalArticle: 'អនុក្រឹត្យ ៣៩ • មាត្រា ៧',
        category: 'equipment',
        categoryIcon: '💡',
        titleKhmer: 'ប្រើប្រាស់ភ្លើងហ្វាខុសបច្ចេកទេស ឬបំពាក់អំពូល LED ចាំងភ្នែកខុសច្បាប់',
        titleEn: 'Misuse of High Beams or Installing Illegal Glaring LED Bars',
        descKhmer: 'បើកភ្លើងហ្វាចាំងចំរថយន្តមកពីមុខ ឬបំពាក់អំពូល LED កែច្នៃខុសស្តង់ដារដែលចាំងភ្នែកអ្នកបើកបរដទៃ។',
        descEn: 'Blinding approaching drivers with high beams or retrofitting unauthorized ultra-bright auxiliary LED bars.',
        fines: { car: 150000, moto: 80000, truck: 300000 },
        demeritPoints: 0,
        impoundRisk: false,
        noteKhmer: 'ត្រូវដោះអំពូលខុសច្បាប់ចេញភ្លាមៗ',
        noteEn: 'Must dismantle illegal light bars'
    }
];

const getCurrentFineKhr = (item) => {
    return item.fines[selectedVehicleType.value] || item.fines.car;
};

// Filtered Violations computed property
const filteredViolations = computed(() => {
    let list = violationsDatabase;

    // Filter by category
    if (selectedCategory.value !== 'all') {
        list = list.filter(item => item.category === selectedCategory.value);
    }

    // Filter by vehicle type (omit violations where fine is 0, like no_helmet for car)
    list = list.filter(item => item.fines[selectedVehicleType.value] > 0);

    // Filter by search query
    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase().replace(/\s+/g, '');
        list = list.filter(item => {
            const titleKhmer = (item.titleKhmer || '').toLowerCase().replace(/\s+/g, '');
            const titleEn = (item.titleEn || '').toLowerCase().replace(/\s+/g, '');
            const descKhmer = (item.descKhmer || '').toLowerCase().replace(/\s+/g, '');
            const descEn = (item.descEn || '').toLowerCase().replace(/\s+/g, '');
            const article = (item.legalArticle || '').toLowerCase().replace(/\s+/g, '');
            return titleKhmer.includes(q) || titleEn.includes(q) || descKhmer.includes(q) || descEn.includes(q) || article.includes(q);
        });
    }

    return list;
});

// Driver Rights & Roadside Protocols Data
const driverRights = [
    {
        id: 1,
        icon: '🧾',
        titleKhmer: '១. សិទ្ធិទទួលបានបង្កាន់ដៃផាកពិន័យផ្លូវការ',
        titleEn: '1. Right to Official Stamped Payment Receipt',
        descKhmer: 'នៅពេលសមត្ថកិច្ចធ្វើការផាកពិន័យ អ្នកបើកបរមានសិទ្ធិទាមទារសំបុត្រផាកពិន័យផ្លូវការដែលមានលេខកូដស៊េរី ឈ្មោះមន្ត្រីនគរបាល និងត្រាត្រឹមត្រូវ។ មិនត្រូវបង់ប្រាក់ដោយគ្មានបង្កាន់ដៃឡើយ។',
        descEn: 'Drivers are legally entitled to receive an official serial-numbered ticket featuring the officer badge ID and ministry seal. Never pay roadside cash without an official slip.'
    },
    {
        id: 2,
        icon: '⏳',
        titleKhmer: '២. រយៈពេលបង់ប្រាក់ ១៥ ថ្ងៃ',
        titleEn: '2. 15-Day Lawful Grace Period',
        descKhmer: 'អ្នកមានសិទ្ធិយកសំបុត្រផាកពិន័យទៅបង់នៅការិយាល័យនគរបាលចរាចរណ៍ ឬតាម App ធនាគារក្នុងរយៈពេល ១៥ ថ្ងៃ ដោយមិនចាំបាច់បង់ប្រាក់ភ្លាមៗនៅនឹងកន្លែងកើតហេតុឡើយ។',
        descEn: 'You hold the legal right to settle the fine within 15 days at traffic police headquarters or through mobile banking rather than paying on the road.'
    },
    {
        id: 3,
        icon: '📱',
        titleKhmer: '៣. ពិនិត្យពិន្ទុប័ណ្ណបើកបរលើ App MPWT Driver Care',
        titleEn: '3. Track Demerit Balance on MPWT App',
        descKhmer: 'អ្នកអាចទាញយកកម្មវិធី "Cambodia Driver Care" របស់ក្រសួងសាធារណការ និងដឹកជញ្ជូន ដើម្បីពិនិត្យមើលចំនួនពិន្ទុប័ណ្ណបើកបរដែលនៅសល់ និងប្រវត្តិល្មើសចរាចរណ៍បានគ្រប់ពេលវេលា។',
        descEn: 'Download the official MPWT "Driver Care" app to monitor remaining license demerit points and review roadside infringement records.'
    },
    {
        id: 4,
        icon: '⚖️',
        titleKhmer: '៤. សិទ្ធិតវ៉ាប្រសិនបើយល់ឃើញថាគ្មានកំហុស',
        titleEn: '4. Right to Contest Unjust Citations',
        descKhmer: 'ប្រសិនបើអ្នកយល់ថាមិនបានប្រព្រឹត្តល្មើសដូចការចោទប្រកាន់ អ្នកមានសិទ្ធិស្នើសុំពិនិត្យកាមេរ៉ាសុវត្ថិភាព ឬដាក់ពាក្យបណ្តឹងតវ៉ាទៅកាន់ស្នងការដ្ឋាននគរបាលរាជធានី-ខេត្ត។',
        descEn: 'If cited mistakenly, you possess the right to request speed camera proof or submit a written contestation to the municipal police department.'
    }
];
</script>
