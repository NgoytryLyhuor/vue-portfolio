<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-3 sm:py-8 px-2.5 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-4 sm:space-y-6">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-7 relative overflow-hidden shadow-xs">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-5 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200 truncate">
                            {{ isKhmer ? 'ប្រតិទិនបុណ្យជាតិផ្លូវការ & គម្រោង LONG WEEKEND' : 'CAMBODIA OFFICIAL PUBLIC HOLIDAYS & PLANNER' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3">
                        <span class="font-mono text-amber-600 dark:text-amber-400 font-bold text-[10px] sm:text-xs">🔒 PRIVATE</span>
                        <span>|</span>
                        <button @click="lockSession" class="text-rose-600 dark:text-rose-400 hover:underline font-bold text-[10px] sm:text-xs">
                            {{ isKhmer ? 'ចាក់សោ (Lock)' : 'Lock' }}
                        </button>
                    </div>
                </div>

                <div class="pt-4 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
                        <div class="max-w-3xl space-y-2.5 sm:space-y-3">
                            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <div class="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 rounded-md">
                                    <span>🌴</span>
                                    <span>{{ isKhmer ? 'ផែនការវិស្សមកាល' : 'VACATION PLANNER' }}</span>
                                </div>

                                <!-- Sub-decree Badge -->
                                <div class="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                                    <span>📜</span>
                                    <span>{{ currentSubDecree }}</span>
                                </div>
                            </div>

                            <h1 class="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                                {{ isKhmer ? `ប្រតិទិនបុណ្យជាតិឆ្នាំ ${toKhmerNumeral(selectedYear)} & យុទ្ធសាស្ត្រសុំច្បាប់ ៥-៩ ថ្ងៃ` : `Cambodia Public Holidays ${selectedYear} & Long Weekend Planner` }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? `បញ្ជីថ្ងៃឈប់សម្រាកបុណ្យជាតិផ្លូវការចំនួន ២២ ថ្ងៃ ស្របតាមអនុក្រឹត្យរាជរដ្ឋាភិបាលកម្ពុជា ជាមួយនាឡិការាប់ថយក្រោយជាក់ស្តែង និងយុទ្ធសាស្ត្រ "Bridge Days" សុំច្បាប់បន្ថែម ១-២ ថ្ងៃ ដើម្បីបានដើរលេង ៥ ទៅ ៩ ថ្ងៃពេញ។` 
                                    : `Official 22-day public holiday calendar authorized by Royal Government Sub-Decree with live countdown and "Bridge Day" strategies to unlock 5 to 9 consecutive vacation days.` }}
                            </p>

                            <!-- Year Switcher (Mobile Responsive Segmented Control) -->
                            <div class="pt-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                <span class="text-[11px] sm:text-xs font-mono font-bold text-slate-500">{{ isKhmer ? 'ជ្រើសរើសឆ្នាំ៖' : 'Select Year:' }}</span>
                                <div class="grid grid-cols-2 sm:inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold w-full sm:w-auto">
                                    <button 
                                        @click="selectedYear = 2026"
                                        class="py-1.5 px-3 rounded-lg text-center transition-all"
                                        :class="selectedYear === 2026 ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'">
                                        {{ isKhmer ? 'ឆ្នាំ ២០២៦ (ផ្លូវការ)' : 'Year 2026' }}
                                    </button>
                                    <button 
                                        @click="selectedYear = 2025"
                                        class="py-1.5 px-3 rounded-lg text-center transition-all"
                                        :class="selectedYear === 2025 ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'">
                                        {{ isKhmer ? 'ឆ្នាំ ២០២៥ (ផ្លូវការ)' : 'Year 2025' }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Next Holiday Countdown Card (Dynamic Live Date) -->
                        <div class="p-4 sm:p-5 border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl space-y-2.5 lg:w-80 shrink-0 w-full">
                            <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center justify-between">
                                <span>⏳ {{ isKhmer ? 'បុណ្យជាតិបន្ទាប់' : 'NEXT HOLIDAY COUNTDOWN' }}</span>
                                <span 
                                    class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                                    :class="nextHoliday.isToday ? 'bg-emerald-500 text-white animate-pulse' : 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'">
                                    {{ nextHoliday.isToday ? (isKhmer ? 'ថ្ងៃនេះ' : 'TODAY') : 'UPCOMING' }}
                                </span>
                            </div>

                            <div class="space-y-0.5">
                                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                                    {{ isKhmer ? nextHoliday.nameKm : nextHoliday.nameEn }}
                                </h3>
                                <div class="text-[11px] sm:text-xs text-slate-500 font-mono">
                                    📅 {{ nextHoliday.dateFormatted }} ({{ isKhmer ? nextHoliday.dayOfWeekKm : nextHoliday.dayOfWeekEn }})
                                </div>
                            </div>

                            <div class="pt-2 border-t border-amber-200 dark:border-amber-800/40 flex items-center justify-between font-mono">
                                <div>
                                    <span v-if="nextHoliday.isToday" class="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                                        🎉 {{ isKhmer ? 'កំពុងឈប់សម្រាក' : 'Holiday Today!' }}
                                    </span>
                                    <span v-else class="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                                        {{ isKhmer ? toKhmerNumeral(nextHoliday.daysRemaining) : nextHoliday.daysRemaining }}
                                    </span>
                                </div>
                                <span class="text-xs text-slate-500">
                                    {{ nextHoliday.isToday ? (isKhmer ? 'រីករាយថ្ងៃឈប់សម្រាក' : 'Enjoy your day!') : (isKhmer ? 'ថ្ងៃទៀតមកដល់' : 'Days Remaining') }}
                                </span>
                            </div>

                            <div class="text-[10px] font-mono text-slate-400 dark:text-slate-500 border-t border-amber-200/50 dark:border-amber-800/30 pt-1.5 flex items-center justify-between">
                                <span>{{ isKhmer ? 'ថ្ងៃនេះ៖' : 'Today:' }} {{ todayDateString }}</span>
                                <span class="text-amber-600 dark:text-amber-400 font-bold">{{ nextHoliday.days }} {{ isKhmer ? 'ថ្ងៃឈប់' : 'days off' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bridge Day Vacation Hacks (Long Weekend Strategies) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span class="text-xl sm:text-2xl">💡</span>
                    <div>
                        <h2 class="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
                            {{ isKhmer ? `យុទ្ធសាស្ត្រសុំច្បាប់ឈប់សម្រាកយូរ ឆ្នាំ ${toKhmerNumeral(selectedYear)} (Vacation Hacks)` : `Long Weekend & Leave Strategies (${selectedYear})` }}
                        </h2>
                        <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                            {{ isKhmer ? 'គន្លឹះសុំច្បាប់ការងារ ១ ទៅ ២ ថ្ងៃ ដើម្បីបានដើរលេង ៥ ទៅ ៩ ថ្ងៃជាប់គ្នា' : 'Take 1-2 leave days to unlock 5 to 9 consecutive vacation days' }}
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs">
                    <!-- Hack 1: Khmer New Year -->
                    <div class="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs sm:text-sm">🇰🇭 {{ isKhmer ? 'ចូលឆ្នាំខ្មែរ' : 'Khmer New Year' }}</span>
                            <span class="text-[9px] sm:text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">9 DAYS OFF</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span v-if="selectedYear === 2026">
                                {{ isKhmer 
                                    ? 'បុណ្យចូលឆ្នាំ ២០២៦ ឈប់ ៣ ថ្ងៃ (អង្គារ ពុធ ព្រហស្បតិ៍ ១៤-១៦ មេសា)។ សុំច្បាប់បន្ថែមថ្ងៃចន្ទ (១៣) និងសុក្រ (១៧) នឹងទទួលបានការឈប់សម្រាក ៩ ថ្ងៃពេញ (១១ ដល់ ១៩ មេសា)!' 
                                    : 'Khmer New Year 2026 spans Tue-Thu (14-16 Apr). Taking Monday (13) & Friday (17) off unlocks 9 consecutive vacation days (11-19 Apr)!' }}
                            </span>
                            <span v-else>
                                {{ isKhmer 
                                    ? 'បុណ្យចូលឆ្នាំ ២០២៥ ឈប់ ៣ ថ្ងៃ (ចន្ទ អង្គារ ពុធ ១៤-១៦ មេសា)។ សុំច្បាប់បន្ថែមថ្ងៃព្រហស្បតិ៍ (១៧) និងសុក្រ (១៨) នឹងទទួលបានការឈប់សម្រាក ៩ ថ្ងៃពេញ (១២ ដល់ ២០ មេសា)!' 
                                    : 'Khmer New Year 2025 spans Mon-Wed (14-16 Apr). Taking Thursday (17) & Friday (18) off yields 9 consecutive vacation days (12-20 Apr)!' }}
                            </span>
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[9px] sm:text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ ទៅលេងស្រុកកំណើត ជួបជុំគ្រួសារ ឬហោះដើរលេងក្រៅប្រទេស' : 'Best for: Hometown visit, family reunion, or overseas trip' }}
                        </div>
                    </div>

                    <!-- Hack 2: Pchum Ben -->
                    <div class="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-xs sm:text-sm">🌾 {{ isKhmer ? 'បុណ្យភ្ជុំបិណ្ឌ' : 'Pchum Ben' }}</span>
                            <span class="text-[9px] sm:text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                                {{ selectedYear === 2026 ? '5 - 9 DAYS OFF' : '9 DAYS OFF' }}
                            </span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span v-if="selectedYear === 2026">
                                {{ isKhmer 
                                    ? 'បុណ្យភ្ជុំបិណ្ឌ ២០២៦ ឈប់ ៣ ថ្ងៃ (សៅរ៍ អាទិត្យ ចន្ទ ១០-១២ តុលា)។ ដោយសារត្រូវចំថ្ងៃចុងសប្តាហ៍ សុំច្បាប់បន្ថែមថ្ងៃអង្គារ-ពុធ ឬសុំ ៤ ថ្ងៃ ដើម្បីបានវិស្សមកាល ៩ ថ្ងៃពេញ!' 
                                    : 'Pchum Ben 2026 falls on Sat-Mon (10-12 Oct). Adding Tue-Wed grants a 5-day holiday, or taking 4 leave days unlocks an entire 9-day break!' }}
                            </span>
                            <span v-else>
                                {{ isKhmer 
                                    ? 'បុណ្យភ្ជុំបិណ្ឌ ២០២៥ ឈប់ ៣ ថ្ងៃ (អាទិត្យ ចន្ទ អង្គារ ២១-២៣ កញ្ញា)។ សុំច្បាប់បន្ថែមថ្ងៃពុធ-សុក្រ (២៤-២៦) អ្នកនឹងទទួលបានវិស្សមកាល ៩ ថ្ងៃពេញ!' 
                                    : 'Pchum Ben 2025 falls on Sun-Tue (21-23 Sep). Adding Wed-Fri creates a massive 9-day autumn vacation!' }}
                            </span>
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[9px] sm:text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ ដើរលេងមណ្ឌលគិរី រតនគិរី មើលទឹកធ្លាក់ និងធ្វើបុណ្យ ៧ វត្ត' : 'Best for: Mondulkiri, Ratanakiri waterfalls, & temple tours' }}
                        </div>
                    </div>

                    <!-- Hack 3: Water Festival -->
                    <div class="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-blue-600 dark:text-blue-400 font-mono text-xs sm:text-sm">🌊 {{ isKhmer ? 'ពិធីបុណ្យអុំទូក' : 'Water Festival' }}</span>
                            <span class="text-[9px] sm:text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                                {{ selectedYear === 2026 ? '9 DAYS OFF' : '6 - 9 DAYS OFF' }}
                            </span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span v-if="selectedYear === 2026">
                                {{ isKhmer 
                                    ? 'បុណ្យអុំទូក ២០២៦ ឈប់ ៣ ថ្ងៃ (ចន្ទ អង្គារ ពុធ ២៣-២៥ វិច្ឆិកា)។ សុំច្បាប់បន្ថែម ២ ថ្ងៃ (ព្រហស្បតិ៍-សុក្រ ២៦-២៧) នឹងបានសម្រាក ៩ ថ្ងៃពេញ (២១ ដល់ ២៩ វិច្ឆិកា)!' 
                                    : 'Water Festival 2026 falls on Mon-Wed (23-25 Nov). Taking Thursday & Friday (26-27 Nov) yields a full 9-day island holiday!' }}
                            </span>
                            <span v-else>
                                {{ isKhmer 
                                    ? 'បុណ្យអុំទូក ២០២៥ ឈប់ ៣ ថ្ងៃ (អង្គារ ពុធ ព្រហស្បតិ៍ ០៤-០៦ វិច្ឆិកា)។ សុំច្បាប់បន្ថែមថ្ងៃចន្ទ (០៣) និងសុក្រ (០៧) នឹងបានឈប់សម្រាក ៩ ថ្ងៃពេញ (០១ ដល់ ០៩ វិច្ឆិកា)!' 
                                    : 'Water Festival 2025 falls on Tue-Thu (04-06 Nov). Taking Monday & Friday off provides 9 days off (01-09 Nov)!' }}
                            </span>
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[9px] sm:text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ សម្រាកនៅឆ្នេរកោះរ៉ុង មើលការប្រណាំងទូក ឬឡើងភ្នំបូកគោ' : 'Best for: Koh Rong beaches, boat races, or Bokor Mountain' }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Full Year Public Holidays Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-xs space-y-3.5 sm:space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-xl">📅</span>
                        <div>
                            <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? `តារាងថ្ងៃឈប់សម្រាកផ្លូវការ ឆ្នាំ ${toKhmerNumeral(selectedYear)} (២២ ថ្ងៃ)` : `Official Public Holidays Calendar ${selectedYear} (22 Days)` }}
                            </h2>
                            <p class="text-[11px] text-slate-400">
                                {{ currentSubDecree }} • {{ isKhmer ? 'ស្របតាមច្បាប់ការងាររាជរដ្ឋាភិបាលកម្ពុជា' : 'Kingdom of Cambodia Official Calendar' }}
                            </p>
                        </div>
                    </div>

                    <!-- Search & Filter Controls (Mobile Friendly Grid) -->
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                        <!-- Status Filter -->
                        <div class="grid grid-cols-3 sm:inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono font-medium">
                            <button 
                                @click="statusFilter = 'all'"
                                class="py-1 px-2.5 rounded text-center transition-all"
                                :class="statusFilter === 'all' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold' : 'text-slate-500'">
                                {{ isKhmer ? 'ទាំងអស់' : 'All' }}
                            </button>
                            <button 
                                @click="statusFilter = 'upcoming'"
                                class="py-1 px-2.5 rounded text-center transition-all"
                                :class="statusFilter === 'upcoming' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold' : 'text-slate-500'">
                                {{ isKhmer ? 'ខាងមុខ' : 'Upcoming' }}
                            </button>
                            <button 
                                @click="statusFilter = 'passed'"
                                class="py-1 px-2.5 rounded text-center transition-all"
                                :class="statusFilter === 'passed' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold' : 'text-slate-500'">
                                {{ isKhmer ? 'កន្លងផុត' : 'Passed' }}
                            </button>
                        </div>

                        <!-- Search Box -->
                        <div class="w-full sm:w-44">
                            <input 
                                v-model="searchQuery"
                                type="text"
                                :placeholder="isKhmer ? 'ស្វែងរកបុណ្យជាតិ...' : 'Search holiday...'"
                                class="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                            />
                        </div>
                    </div>
                </div>

                <!-- 1. MOBILE RESPONSIVE CARD VIEW (< sm: Oppo / Phone screen) -->
                <div class="block sm:hidden space-y-2.5">
                    <div 
                        v-for="(item, idx) in filteredHolidayList" 
                        :key="'mob-' + item.id"
                        class="p-3.5 rounded-xl border transition-all"
                        :class="item.isToday 
                            ? 'bg-amber-500/10 border-amber-500/40 shadow-xs' 
                            : 'bg-slate-50/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800'">
                        
                        <!-- Top Meta Row: Date & Status Badge -->
                        <div class="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                            <div class="flex items-center gap-1.5">
                                <span class="text-[10px] font-bold text-slate-400">#{{ (idx + 1).toString().padStart(2, '0') }}</span>
                                <span class="font-bold text-slate-900 dark:text-white">{{ item.dateFormatted }}</span>
                            </div>
                            
                            <!-- Status Badge -->
                            <span 
                                v-if="item.isToday"
                                class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse">
                                🎉 {{ isKhmer ? 'ថ្ងៃនេះ' : 'Today' }}
                            </span>
                            <span 
                                v-else-if="item.passed"
                                class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-400">
                                {{ isKhmer ? 'កន្លងផុត' : 'Passed' }}
                            </span>
                            <span 
                                v-else
                                class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                {{ item.daysRemaining === 1 ? (isKhmer ? 'ស្អែកនេះ' : 'Tomorrow') : (isKhmer ? `${toKhmerNumeral(item.daysRemaining)} ថ្ងៃទៀត` : `In ${item.daysRemaining}d`) }}
                            </span>
                        </div>

                        <!-- Holiday Name -->
                        <div class="space-y-0.5">
                            <h4 class="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                {{ isKhmer ? item.nameKm : item.nameEn }}
                            </h4>
                            <p class="text-[10px] text-slate-400">
                                {{ isKhmer ? item.nameEn : item.nameKm }}
                            </p>
                        </div>

                        <!-- Bottom Sub-details Row -->
                        <div class="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span class="flex items-center gap-1">
                                <span>🗓️</span>
                                <span>{{ isKhmer ? item.dayOfWeekKm : item.dayOfWeekEn }}</span>
                            </span>
                            <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? toKhmerNumeral(item.days) : item.days }} {{ isKhmer ? 'ថ្ងៃ' : 'days off' }}
                            </span>
                        </div>
                    </div>

                    <div v-if="filteredHolidayList.length === 0" class="text-center py-6 text-xs text-slate-400 font-mono">
                        {{ isKhmer ? 'មិនមានទិន្នន័យពិធីបុណ្យជាតិត្រូវគ្នានឹងការស្វែងរកឡើយ' : 'No public holidays match your search criteria' }}
                    </div>
                </div>

                <!-- 2. DESKTOP FULL TABLE VIEW (hidden on mobile, visible on sm and up) -->
                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full text-left text-xs font-mono">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase">
                                <th class="pb-2.5 font-bold">#</th>
                                <th class="pb-2.5 font-bold">{{ isKhmer ? 'កាលបរិច្ឆេទ' : 'Date' }}</th>
                                <th class="pb-2.5 font-bold">{{ isKhmer ? 'ថ្ងៃនៃសប្តាហ៍' : 'Day' }}</th>
                                <th class="pb-2.5 font-bold">{{ isKhmer ? 'ឈ្មោះពិធីបុណ្យជាតិ' : 'Holiday Name' }}</th>
                                <th class="pb-2.5 font-bold text-center">{{ isKhmer ? 'ចំនួនថ្ងៃ' : 'Days' }}</th>
                                <th class="pb-2.5 font-bold text-right">{{ isKhmer ? 'ស្ថានភាព' : 'Status' }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                            <tr 
                                v-for="(item, idx) in filteredHolidayList" 
                                :key="'dt-' + item.id"
                                class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                                :class="{'bg-amber-50/30 dark:bg-amber-950/20': item.isToday}">
                                <td class="py-3 text-slate-400">{{ (idx + 1).toString().padStart(2, '0') }}</td>
                                <td class="py-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                                    {{ item.dateFormatted }}
                                </td>
                                <td class="py-3 text-slate-500 whitespace-nowrap">
                                    {{ isKhmer ? item.dayOfWeekKm : item.dayOfWeekEn }}
                                </td>
                                <td class="py-3">
                                    <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span>{{ isKhmer ? item.nameKm : item.nameEn }}</span>
                                        <span v-if="item.isToday" class="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-sans font-bold">
                                            {{ isKhmer ? 'ថ្ងៃនេះ' : 'TODAY' }}
                                        </span>
                                    </div>
                                    <div class="text-[10px] text-slate-400 font-sans">{{ isKhmer ? item.nameEn : item.nameKm }}</div>
                                </td>
                                <td class="py-3 text-center">
                                    <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                                        {{ isKhmer ? toKhmerNumeral(item.days) : item.days }} {{ isKhmer ? 'ថ្ងៃ' : 'd' }}
                                    </span>
                                </td>
                                <td class="py-3 text-right whitespace-nowrap">
                                    <span 
                                        v-if="item.isToday"
                                        class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse">
                                        🎉 {{ isKhmer ? 'ថ្ងៃនេះ' : 'Today' }}
                                    </span>
                                    <span 
                                        v-else-if="item.passed"
                                        class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-400">
                                        {{ isKhmer ? 'កន្លងផុត' : 'Passed' }}
                                    </span>
                                    <span 
                                        v-else
                                        class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                        {{ item.daysRemaining === 1 ? (isKhmer ? 'ស្អែកនេះ' : 'Tomorrow') : (isKhmer ? `${toKhmerNumeral(item.daysRemaining)} ថ្ងៃទៀត` : `In ${item.daysRemaining} days`) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'HolidayPlanner',
    setup() {
        const router = useRouter();
        const { isKhmer } = useLanguage();

        // Helper to convert Arabic numerals to Khmer numerals
        const toKhmerNumeral = (num) => {
            if (num === undefined || num === null) return '';
            const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
            return String(num).replace(/[0-9]/g, (d) => khmerDigits[parseInt(d, 10)]);
        };

        const lockSession = () => {
            sessionStorage.removeItem('holiday_auth');
            router.push('/holiday-access');
        };

        // Determine current year (default to 2026 or current year)
        const currentYear = new Date().getFullYear();
        const selectedYear = ref(currentYear >= 2026 ? 2026 : (currentYear === 2025 ? 2025 : 2026));

        const searchQuery = ref('');
        const statusFilter = ref('all'); // 'all', 'upcoming', 'passed'

        // Official Cambodia Public Holidays Database
        // 2026: Sub-Decree No. 167 (អនុក្រឹត្យលេខ ១៦៧ អនក្រ.បក)
        const holidays2026 = [
            { id: 1, month: 1, startDay: 1, endDay: 1, dateFormatted: '01 Jan 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ទិវាចូលឆ្នាំសកល', nameEn: 'International New Year Day', days: 1 },
            { id: 2, month: 1, startDay: 7, endDay: 7, dateFormatted: '07 Jan 2026', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', nameEn: 'Victory Over Genocide Day', days: 1 },
            { id: 3, month: 3, startDay: 8, endDay: 8, dateFormatted: '08 Mar 2026', dayOfWeekKm: 'អាទិត្យ', dayOfWeekEn: 'Sunday', nameKm: 'ទិវាអន្តរជាតិនារី', nameEn: 'International Women\'s Day', days: 1 },
            { id: 4, month: 4, startDay: 14, endDay: 16, dateFormatted: '14, 15, 16 Apr 2026', dayOfWeekKm: 'អង្គារ - ព្រហស្បតិ៍', dayOfWeekEn: 'Tue - Thu', nameKm: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ', nameEn: 'Khmer New Year Festival', days: 3 },
            { id: 5, month: 5, startDay: 1, endDay: 1, dateFormatted: '01 May 2026', dayOfWeekKm: 'សុក្រ', dayOfWeekEn: 'Friday', nameKm: 'ទិវាពលកម្មអន្តរជាតិ & បុណ្យវិសាខបូជា', nameEn: 'International Labor Day & Visak Bochea', days: 1 },
            { id: 6, month: 5, startDay: 5, endDay: 5, dateFormatted: '05 May 2026', dayOfWeekKm: 'អង្គារ', dayOfWeekEn: 'Tuesday', nameKm: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', nameEn: 'Royal Plowing Ceremony', days: 1 },
            { id: 7, month: 5, startDay: 14, endDay: 14, dateFormatted: '14 May 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ', nameEn: 'King Norodom Sihamoni\'s Birthday', days: 1 },
            { id: 8, month: 6, startDay: 18, endDay: 18, dateFormatted: '18 Jun 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចម៉ែ', nameEn: 'Queen Mother\'s Birthday', days: 1 },
            { id: 9, month: 9, startDay: 24, endDay: 24, dateFormatted: '24 Sep 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ', nameEn: 'Constitutional Day', days: 1 },
            { id: 10, month: 10, startDay: 10, endDay: 12, dateFormatted: '10, 11, 12 Oct 2026', dayOfWeekKm: 'សៅរ៍ - ចន្ទ', dayOfWeekEn: 'Sat - Mon', nameKm: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival', days: 3 },
            { id: 11, month: 10, startDay: 15, endDay: 15, dateFormatted: '15 Oct 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ', nameEn: 'Commemoration of King Father', days: 1 },
            { id: 12, month: 10, startDay: 29, endDay: 29, dateFormatted: '29 Oct 2026', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ ព្រះមហាក្សត្រ', nameEn: 'King\'s Coronation Day', days: 1 },
            { id: 13, month: 11, startDay: 9, endDay: 9, dateFormatted: '09 Nov 2026', dayOfWeekKm: 'ចន្ទ', dayOfWeekEn: 'Monday', nameKm: 'ពិធីបុណ្យឯករាជ្យជាតិ', nameEn: 'National Independence Day', days: 1 },
            { id: 14, month: 11, startDay: 23, endDay: 25, dateFormatted: '23, 24, 25 Nov 2026', dayOfWeekKm: 'ចន្ទ - ពុធ', dayOfWeekEn: 'Mon - Wed', nameKm: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក', nameEn: 'Water Festival (Bon Om Touk)', days: 3 },
            { id: 15, month: 12, startDay: 29, endDay: 29, dateFormatted: '29 Dec 2026', dayOfWeekKm: 'អង្គារ', dayOfWeekEn: 'Tuesday', nameKm: 'ទិវាសន្តិភាពនៅកម្ពុជា', nameEn: 'Peace Day in Cambodia', days: 1 }
        ];

        // 2025: Sub-Decree No. 204 (អនុក្រឹត្យលេខ ២០៤ អនក្រ.បក)
        const holidays2025 = [
            { id: 1, month: 1, startDay: 1, endDay: 1, dateFormatted: '01 Jan 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ទិវាចូលឆ្នាំសកល', nameEn: 'International New Year Day', days: 1 },
            { id: 2, month: 1, startDay: 7, endDay: 7, dateFormatted: '07 Jan 2025', dayOfWeekKm: 'អង្គារ', dayOfWeekEn: 'Tuesday', nameKm: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', nameEn: 'Victory Over Genocide Day', days: 1 },
            { id: 3, month: 3, startDay: 8, endDay: 8, dateFormatted: '08 Mar 2025', dayOfWeekKm: 'សៅរ៍', dayOfWeekEn: 'Saturday', nameKm: 'ទិវាអន្តរជាតិនារី', nameEn: 'International Women\'s Day', days: 1 },
            { id: 4, month: 4, startDay: 14, endDay: 16, dateFormatted: '14, 15, 16 Apr 2025', dayOfWeekKm: 'ចន្ទ - ពុធ', dayOfWeekEn: 'Mon - Wed', nameKm: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ', nameEn: 'Khmer New Year Festival', days: 3 },
            { id: 5, month: 5, startDay: 1, endDay: 1, dateFormatted: '01 May 2025', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ទិវាពលកម្មអន្តរជាតិ', nameEn: 'International Labor Day', days: 1 },
            { id: 6, month: 5, startDay: 11, endDay: 11, dateFormatted: '11 May 2025', dayOfWeekKm: 'អាទិត្យ', dayOfWeekEn: 'Sunday', nameKm: 'ពិធីបុណ្យវិសាខបូជា', nameEn: 'Visak Bochea Day', days: 1 },
            { id: 7, month: 5, startDay: 14, endDay: 14, dateFormatted: '14 May 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ', nameEn: 'King Norodom Sihamoni\'s Birthday', days: 1 },
            { id: 8, month: 5, startDay: 15, endDay: 15, dateFormatted: '15 May 2025', dayOfWeekKm: 'ព្រហស្បតិ៍', dayOfWeekEn: 'Thursday', nameKm: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', nameEn: 'Royal Plowing Ceremony', days: 1 },
            { id: 9, month: 6, startDay: 18, endDay: 18, dateFormatted: '18 Jun 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចម៉ែ', nameEn: 'Queen Mother\'s Birthday', days: 1 },
            { id: 10, month: 9, startDay: 21, endDay: 23, dateFormatted: '21, 22, 23 Sep 2025', dayOfWeekKm: 'អាទិត្យ - អង្គារ', dayOfWeekEn: 'Sun - Tue', nameKm: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival', days: 3 },
            { id: 11, month: 9, startDay: 24, endDay: 24, dateFormatted: '24 Sep 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ', nameEn: 'Constitutional Day', days: 1 },
            { id: 12, month: 10, startDay: 15, endDay: 15, dateFormatted: '15 Oct 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ', nameEn: 'Commemoration of King Father', days: 1 },
            { id: 13, month: 10, startDay: 29, endDay: 29, dateFormatted: '29 Oct 2025', dayOfWeekKm: 'ពុធ', dayOfWeekEn: 'Wednesday', nameKm: 'ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ ព្រះមហាក្សត្រ', nameEn: 'King\'s Coronation Day', days: 1 },
            { id: 14, month: 11, startDay: 4, endDay: 6, dateFormatted: '04, 05, 06 Nov 2025', dayOfWeekKm: 'អង្គារ - ព្រហស្បតិ៍', dayOfWeekEn: 'Tue - Thu', nameKm: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក', nameEn: 'Water Festival (Bon Om Touk)', days: 3 },
            { id: 15, month: 11, startDay: 9, endDay: 9, dateFormatted: '09 Nov 2025', dayOfWeekKm: 'អាទិត្យ', dayOfWeekEn: 'Sunday', nameKm: 'ពិធីបុណ្យឯករាជ្យជាតិ', nameEn: 'National Independence Day', days: 1 },
            { id: 16, month: 12, startDay: 29, endDay: 29, dateFormatted: '29 Dec 2025', dayOfWeekKm: 'ចន្ទ', dayOfWeekEn: 'Monday', nameKm: 'ទិវាសន្តិភាពនៅកម្ពុជា', nameEn: 'Peace Day in Cambodia', days: 1 }
        ];

        const currentSubDecree = computed(() => {
            return selectedYear.value === 2026
                ? (isKhmer.value ? 'អនុក្រឹត្យលេខ ១៦៧ អនក្រ.បក' : 'Sub-Decree No. 167')
                : (isKhmer.value ? 'អនុក្រឹត្យលេខ ២០៤ អនក្រ.បក' : 'Sub-Decree No. 204');
        });

        const todayDateString = computed(() => {
            const now = new Date();
            const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthsKm = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
            const d = now.getDate();
            const m = now.getMonth();
            const y = now.getFullYear();
            if (isKhmer.value) {
                return `${toKhmerNumeral(d)} ${monthsKm[m]} ${toKhmerNumeral(y)}`;
            }
            return `${d.toString().padStart(2, '0')} ${monthsEn[m]} ${y}`;
        });

        // Compute dynamic statuses for the selected year
        const processedHolidays = computed(() => {
            const rawList = selectedYear.value === 2026 ? holidays2026 : holidays2025;
            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

            return rawList.map(h => {
                const startMidnight = new Date(selectedYear.value, h.month - 1, h.startDay).getTime();
                const endMidnight = new Date(selectedYear.value, h.month - 1, h.endDay, 23, 59, 59, 999).getTime();

                const isToday = now.getTime() >= startMidnight && now.getTime() <= endMidnight;
                const isPassed = now.getTime() > endMidnight;
                const isUpcoming = now.getTime() < startMidnight;
                const daysRemaining = Math.max(0, Math.ceil((startMidnight - todayMidnight) / (1000 * 60 * 60 * 24)));

                return {
                    ...h,
                    isToday,
                    passed: isPassed,
                    isUpcoming,
                    daysRemaining
                };
            });
        });

        // Filtered holiday list based on search and status
        const filteredHolidayList = computed(() => {
            let list = processedHolidays.value;

            if (statusFilter.value === 'upcoming') {
                list = list.filter(h => h.isUpcoming || h.isToday);
            } else if (statusFilter.value === 'passed') {
                list = list.filter(h => h.passed);
            }

            if (searchQuery.value.trim()) {
                const q = searchQuery.value.toLowerCase().trim();
                list = list.filter(h => 
                    h.nameKm.toLowerCase().includes(q) ||
                    h.nameEn.toLowerCase().includes(q) ||
                    h.dateFormatted.toLowerCase().includes(q) ||
                    h.dayOfWeekKm.toLowerCase().includes(q) ||
                    h.dayOfWeekEn.toLowerCase().includes(q)
                );
            }

            return list;
        });

        // Dynamic Next Holiday Countdown (real-time from current date)
        const nextHoliday = computed(() => {
            const list = processedHolidays.value;
            // 1. Check if today is a holiday
            const todayHol = list.find(h => h.isToday);
            if (todayHol) {
                return {
                    ...todayHol,
                    daysRemaining: 0
                };
            }

            // 2. Find first upcoming holiday in this year
            const upcoming = list.find(h => h.isUpcoming);
            if (upcoming) {
                return upcoming;
            }

            // 3. If all passed in selected year, return the first holiday of the list or next year
            return list[0];
        });

        return {
            isKhmer,
            toKhmerNumeral,
            selectedYear,
            currentSubDecree,
            todayDateString,
            searchQuery,
            statusFilter,
            filteredHolidayList,
            nextHoliday,
            lockSession
        };
    }
};
</script>
