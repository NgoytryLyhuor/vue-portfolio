<template>
    <div class="min-h-screen pt-12 sm:pt-16 pb-12 px-0 sm:px-4 lg:px-6 bg-gradient-to-br from-slate-50 via-red-50/20 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 overflow-x-hidden">
        <div class="max-w-7xl mx-auto">

            <!-- Top Hero & Live Today Banner -->
            <div class="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 p-4 sm:p-7 lg:p-8 text-white shadow-xl mb-4 sm:mb-8 overflow-hidden">
                <!-- Decorative subtle background circles -->
                <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                <div class="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-blue-400/20 blur-2xl pointer-events-none"></div>

                <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5">
                    <div class="min-w-0">
                        <div class="inline-flex flex-wrap items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] sm:text-sm font-medium border border-white/20 mb-2.5">
                            <span>🇰🇭</span>
                            <span>{{ isKhmer ? 'ប្រតិទិនច័ន្ទគតិ-សុរិយគតិខ្មែរ' : 'Official Khmer Chhankitek Calendar' }}</span>
                        </div>
                        <h1 class="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1.5 leading-tight">
                            {{ isKhmer ? 'ប្រតិទិនខ្មែរ • Khmer Calendar' : 'Khmer Calendar • ប្រតិទិនខ្មែរ' }}
                        </h1>
                        <p class="text-white/90 text-xs sm:text-base font-medium leading-relaxed break-words">
                            {{ isKhmer ? 'ថ្ងៃនេះ៖ ' : 'Today: ' }}{{ isKhmer ? todayBannerInfo.khmerLunarFullDate : todayBannerInfo.englishLunarFullDate }} • {{ isKhmer ? todayBannerInfo.khmerSolarFullDate : todayBannerInfo.englishSolarFullDate }}
                        </p>
                    </div>

                    <!-- Today Quick Status & Next Holiday Pill -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex items-stretch gap-2.5 sm:gap-3 w-full lg:w-auto">
                        <div class="min-w-0 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-3">
                            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-red-600 font-extrabold text-lg sm:text-xl flex flex-col items-center justify-center shadow shrink-0">
                                <span>{{ todayBannerInfo.day }}</span>
                            </div>
                            <div class="min-w-0">
                                <div class="text-[11px] sm:text-xs text-white/80 truncate">{{ isKhmer ? 'ស្ថានភាពថ្ងៃនេះ' : 'Today\'s Status' }}</div>
                                <div class="text-xs sm:text-sm font-bold flex items-center gap-1.5 mt-0.5 truncate">
                                    <span v-if="todayBannerInfo.isPublicHoliday" class="truncate">🔴 {{ isKhmer ? 'ថ្ងៃឈប់សម្រាកផ្លូវការ' : 'Public Holiday' }}</span>
                                    <span v-else-if="todayBannerInfo.isWeekend" class="truncate">🟠 {{ isKhmer ? 'ថ្ងៃចុងសប្តាហ៍' : 'Weekend' }}</span>
                                    <span v-else class="truncate">🟢 {{ isKhmer ? 'ថ្ងៃធ្វើការធម្មតា' : 'Working Day' }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="nextUpcomingHoliday" 
                            @click="jumpToHoliday(nextUpcomingHoliday)"
                            class="min-w-0 bg-black/20 hover:bg-black/30 cursor-pointer transition-all backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-3">
                            <div class="text-xl sm:text-2xl shrink-0">🎉</div>
                            <div class="min-w-0 flex-1">
                                <div class="text-[11px] sm:text-xs text-white/75 truncate">{{ isKhmer ? 'ថ្ងៃឈប់សម្រាកបន្ទាប់' : 'Next Holiday' }} ({{ nextUpcomingHoliday.daysUntil === 0 ? (isKhmer ? 'ថ្ងៃនេះ' : 'Today') : (isKhmer ? nextUpcomingHoliday.daysUntil + ' ថ្ងៃទៀត' : 'In ' + nextUpcomingHoliday.daysUntil + ' days') }})</div>
                                <div class="text-xs sm:text-sm font-bold truncate">{{ isKhmer ? nextUpcomingHoliday.khmer : nextUpcomingHoliday.english }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Monthly Workday / Holiday / Holy Day Stats & Filter Bar -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-5 sm:mb-6">
                <button @click="activeFilter = 'all'"
                    class="p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center gap-2.5 sm:gap-3 shadow-sm hover:shadow-md min-w-0"
                    :class="activeFilter === 'all' 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                        :class="activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'">
                        📅
                    </div>
                    <div class="min-w-0">
                        <div class="text-[11px] sm:text-xs opacity-80 truncate">{{ isKhmer ? 'ថ្ងៃសរុបក្នុងខែ' : 'Days in Month' }}</div>
                        <div class="text-base sm:text-xl font-bold leading-tight mt-0.5">{{ isKhmer ? toKhmerNumeral(monthStats.totalDays) + ' ថ្ងៃ' : monthStats.totalDays + ' days' }}</div>
                    </div>
                </button>

                <button @click="activeFilter = activeFilter === 'workday' ? 'all' : 'workday'"
                    class="p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center gap-2.5 sm:gap-3 shadow-sm hover:shadow-md min-w-0"
                    :class="activeFilter === 'workday' 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-500/20' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                        :class="activeFilter === 'workday' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'">
                        💼
                    </div>
                    <div class="min-w-0">
                        <div class="text-[11px] sm:text-xs opacity-80 truncate">{{ isKhmer ? 'ថ្ងៃធ្វើការ' : 'Working Days' }}</div>
                        <div class="text-base sm:text-xl font-bold leading-tight mt-0.5">{{ isKhmer ? toKhmerNumeral(monthStats.workingDays) + ' ថ្ងៃ' : monthStats.workingDays + ' days' }}</div>
                    </div>
                </button>

                <button @click="activeFilter = activeFilter === 'holiday' ? 'all' : 'holiday'"
                    class="p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center gap-2.5 sm:gap-3 shadow-sm hover:shadow-md min-w-0"
                    :class="activeFilter === 'holiday' 
                        ? 'bg-red-600 text-white border-red-600 shadow-red-500/20' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                        :class="activeFilter === 'holiday' ? 'bg-white/20 text-white' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'">
                        🎉
                    </div>
                    <div class="min-w-0">
                        <div class="text-[11px] sm:text-xs opacity-80 truncate">{{ isKhmer ? 'ថ្ងៃបុណ្យជាតិ' : 'Public Holidays' }}</div>
                        <div class="text-base sm:text-xl font-bold leading-tight mt-0.5">{{ isKhmer ? toKhmerNumeral(monthStats.publicHolidays) + ' ថ្ងៃ' : monthStats.publicHolidays + ' days' }}</div>
                    </div>
                </button>

                <button @click="activeFilter = activeFilter === 'holyday' ? 'all' : 'holyday'"
                    class="p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center gap-2.5 sm:gap-3 shadow-sm hover:shadow-md min-w-0"
                    :class="activeFilter === 'holyday' 
                        ? 'bg-amber-500 text-white border-amber-500 shadow-amber-500/20' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                        :class="activeFilter === 'holyday' ? 'bg-white/20 text-white' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'">
                        ☸️
                    </div>
                    <div class="min-w-0">
                        <div class="text-[11px] sm:text-xs opacity-80 truncate">{{ isKhmer ? 'ថ្ងៃឧបោសថសីល' : 'Buddhist Holy Days' }}</div>
                        <div class="text-base sm:text-xl font-bold leading-tight mt-0.5">{{ isKhmer ? toKhmerNumeral(monthStats.holyDays) + ' ថ្ងៃ' : monthStats.holyDays + ' days' }}</div>
                    </div>
                </button>
            </div>

            <!-- Main Two-Column Layout: Calendar Grid (Left 8 cols) + Selected Day & Holy Days Panel (Right 4 cols) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-6 sm:mb-8">

                <!-- Left Column: Calendar Grid -->
                <div class="lg:col-span-8 min-w-0">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden">
                        
                        <!-- Calendar Control Bar -->
                        <div class="p-3.5 sm:p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4">
                                
                                <!-- Month Title & Lunar Months -->
                                <div class="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                                    <button @click="previousMonth" 
                                        class="p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 active:scale-95 transition-all shrink-0"
                                        title="Previous Month">
                                        <ChevronLeftIcon class="h-5 w-5" />
                                    </button>

                                    <div class="text-center sm:text-left px-1 min-w-0">
                                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                                            <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                                {{ isKhmer ? `ខែ${currentSolarKhmerMonth} ${toKhmerNumeral(currentYear)}` : `${currentMonthName} ${currentYear}` }}
                                            </h2>
                                            <span v-if="isKhmer" class="text-xs sm:text-base font-semibold text-gray-500 dark:text-gray-400">
                                                ({{ currentMonthName }} {{ currentYear }})
                                            </span>
                                        </div>
                                        <p class="text-[11px] sm:text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                                            🌙 {{ isKhmer ? `${khmerMonthName} • ឆ្នាំ${currentZodiacKhmer} ព.ស. ${toKhmerNumeral(currentKhmerYear)}` : `Lunar: ${englishMonthName} • Year of the ${currentZodiacEnglish} • B.E. ${currentKhmerYear}` }}
                                        </p>
                                    </div>

                                    <button @click="nextMonth" 
                                        class="p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 active:scale-95 transition-all shrink-0"
                                        title="Next Month">
                                        <ChevronRightIcon class="h-5 w-5" />
                                    </button>
                                </div>

                                <!-- Quick Selectors (Month, Year, Today) -->
                                <div class="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
                                    <select :value="currentMonth" @change="onMonthSelect($event)"
                                        aria-label="Select Month"
                                        class="w-full sm:w-auto px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer truncate">
                                        <option v-for="(mName, mIdx) in solarKhmerMonths" :key="mIdx" :value="mIdx">
                                            {{ isKhmer ? mName + ' (' + englishMonthsShort[mIdx] + ')' : englishMonthsShort[mIdx] + ' (' + mName + ')' }}
                                        </option>
                                    </select>

                                    <select :value="currentYear" @change="onYearSelect($event)"
                                        aria-label="Select Year"
                                        class="w-full sm:w-auto px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer truncate">
                                        <option v-for="yr in yearOptions" :key="yr" :value="yr">
                                            {{ yr }} ({{ isKhmer ? 'ព.ស. ' + toKhmerNumeral(yr + 544) : 'B.E. ' + (yr + 544) }})
                                        </option>
                                    </select>

                                    <button @click="goToToday" 
                                        class="w-full sm:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5">
                                        <CalendarIcon class="h-4 w-4 shrink-0" />
                                        <span>{{ isKhmer ? 'ថ្ងៃនេះ' : 'Today' }}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Legend Bar -->
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-700/70 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                                <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                    <span class="inline-flex items-center gap-1">
                                        <span class="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                        <span>{{ isKhmer ? 'ថ្ងៃឈប់សម្រាក' : 'Holiday' }}</span>
                                    </span>
                                    <span class="inline-flex items-center gap-1">
                                        <span>☸️</span>
                                        <span>{{ isKhmer ? 'ថ្ងៃសីល' : 'Holy Day' }}</span>
                                    </span>
                                    <span class="inline-flex items-center gap-1">
                                        <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                                        <span>{{ isKhmer ? 'ពិធីបុណ្យ' : 'Observance' }}</span>
                                    </span>
                                    <span class="inline-flex items-center gap-1">
                                        <span class="w-2 h-2 rounded-full bg-orange-400 shrink-0"></span>
                                        <span>{{ isKhmer ? 'ចុងសប្តាហ៍' : 'Weekend' }}</span>
                                    </span>
                                </div>

                                <!-- Quick Date Jump Input -->
                                <div class="flex items-center justify-between sm:justify-end gap-2 bg-gray-100/80 dark:bg-gray-700/50 sm:bg-transparent px-2.5 py-1.5 sm:p-0 rounded-xl">
                                    <label for="quick-date-picker" class="text-xs font-medium text-gray-600 dark:text-gray-400 shrink-0">{{ isKhmer ? 'ទៅកាន់ថ្ងៃ៖' : 'Go to date:' }}</label>
                                    <input id="quick-date-picker" type="date" :value="selectedDateIso" @change="onQuickDateJump($event)"
                                        class="px-2 py-1 rounded-lg text-xs bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>

                        <!-- Day Names Header -->
                        <div class="grid grid-cols-7 bg-gray-50/90 dark:bg-gray-700/60 border-b border-gray-200/70 dark:border-gray-700">
                            <div v-for="(day, idx) in dayNames" :key="idx" 
                                class="py-2 sm:py-3 px-0.5 text-center min-w-0"
                                :class="idx === 0 ? 'text-red-600 dark:text-red-400' : idx === 6 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-200'">
                                <div class="text-[11px] sm:text-sm font-bold truncate">{{ isKhmer ? day.khmer : day.full }}</div>
                                <div class="text-[9px] sm:text-xs opacity-75 font-medium">{{ isKhmer ? day.khmer : day.short }}</div>
                            </div>
                        </div>

                        <!-- Calendar Grid -->
                        <div class="grid grid-cols-7">
                            <div v-for="(day, idx) in calendarDays" :key="idx"
                                @click="selectDate(day)"
                                class="min-h-[68px] sm:min-h-[96px] lg:min-h-[108px] p-1 sm:p-2 border-b border-r border-gray-100 dark:border-gray-700/70 relative group cursor-pointer transition-all duration-150 flex flex-col justify-between min-w-0 overflow-hidden"
                                :class="[
                                    idx % 7 === 6 ? 'border-r-0' : '',
                                    !day.isCurrentMonth ? 'bg-gray-50/60 dark:bg-gray-800/40 opacity-45 hover:opacity-75' : 'hover:bg-blue-50/40 dark:hover:bg-gray-700/40',
                                    day.isCurrentMonth && day.isPublicHoliday ? 'bg-red-50/40 dark:bg-red-900/15' : '',
                                    day.isCurrentMonth && day.isSelected ? 'ring-2 ring-inset ring-blue-600 dark:ring-blue-400 bg-blue-50/50 dark:bg-blue-900/20 z-10' : '',
                                    day.isCurrentMonth && !isDayMatchingFilter(day) ? 'opacity-25' : ''
                                ]">
                                
                                <!-- Top Row: Gregorian Date + Khmer Numeral & Icons -->
                                <div class="flex items-center justify-between gap-0.5 min-w-0">
                                    <div class="flex items-baseline gap-1 min-w-0">
                                        <span class="inline-flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-sm font-bold transition-all shrink-0"
                                            :class="[
                                                day.isToday ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm' : '',
                                                !day.isToday && day.isPublicHoliday ? 'text-red-600 dark:text-red-400 font-extrabold' : '',
                                                !day.isToday && !day.isPublicHoliday && idx % 7 === 0 ? 'text-red-500 dark:text-red-400' : '',
                                                !day.isToday && !day.isPublicHoliday && idx % 7 === 6 ? 'text-orange-500 dark:text-orange-400' : '',
                                                !day.isToday && !day.isPublicHoliday && idx % 7 !== 0 && idx % 7 !== 6 ? 'text-gray-800 dark:text-gray-200' : ''
                                            ]">
                                            {{ day.date }}
                                        </span>
                                        <span class="hidden sm:inline text-xs font-semibold text-gray-400 dark:text-gray-500">
                                            {{ toKhmerNumeral(day.date) }}
                                        </span>
                                    </div>

                                    <!-- Holy Day / Holiday Badges -->
                                    <div class="flex items-center gap-0.5 shrink-0">
                                        <span v-if="day.isHolyDay" class="text-[10px] sm:text-xs leading-none" title="ថ្ងៃឧបោសថសីល (Buddhist Holy Day)">☸️</span>
                                        <span v-if="day.lunarPhase" class="hidden sm:inline text-xs leading-none">{{ day.lunarPhase }}</span>
                                        <span v-if="day.isPublicHoliday" class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" title="ថ្ងៃឈប់សម្រាកផ្លូវការ"></span>
                                        <span v-else-if="day.holiday" class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" title="ពិធីបុណ្យប្រពៃណី"></span>
                                    </div>
                                </div>

                                <!-- Middle/Bottom Row: Lunar Day & Holiday Title -->
                                <div class="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1 min-w-0">
                                    <div v-if="day.lunarDay" 
                                        class="block px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[11px] font-semibold leading-tight max-w-full truncate text-center sm:text-left"
                                        :class="[
                                            day.lunarInfo && day.lunarInfo.dayNumber === 1 && day.lunarInfo.isWaxing
                                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                                                : day.isHolyDay
                                                    ? 'bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                                    : 'bg-blue-50 text-blue-700 dark:bg-gray-700/80 dark:text-blue-300'
                                        ]">
                                        {{ isKhmer ? day.lunarDay : (day.lunarInfo && day.lunarInfo.dayEnglish ? day.lunarInfo.dayEnglish : day.lunarDay) }}
                                    </div>

                                    <div v-if="day.holiday" 
                                        class="text-[8px] sm:text-[10px] font-bold leading-tight truncate sm:line-clamp-2 sm:whitespace-normal px-1 py-0.5 rounded"
                                        :class="day.isPublicHoliday 
                                            ? 'bg-red-100/80 text-red-700 dark:bg-red-900/40 dark:text-red-300' 
                                            : 'bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'">
                                        {{ isKhmer ? day.holiday.khmer : day.holiday.english }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Selected Date Inspector & Monthly Holy Days -->
                <div class="lg:col-span-4 space-y-5 sm:space-y-6 min-w-0">
                    
                    <!-- Selected Date Inspector Card -->
                    <div v-if="selectedDate" class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden">
                        <!-- Top Banner of Selected Day -->
                        <div class="p-4 sm:p-6 text-white relative overflow-hidden"
                            :class="selectedDate.isPublicHoliday 
                                ? 'bg-gradient-to-br from-red-600 via-rose-600 to-orange-600' 
                                : selectedDate.isWeekend 
                                    ? 'bg-gradient-to-br from-orange-500 via-amber-600 to-rose-600'
                                    : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-800'">
                            <div class="flex items-start justify-between gap-3">
                                <div class="min-w-0">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-white/20 backdrop-blur-sm mb-2">
                                        <span v-if="selectedDate.isPublicHoliday">🔴 {{ isKhmer ? 'ថ្ងៃឈប់សម្រាកផ្លូវការ' : 'Public Holiday' }}</span>
                                        <span v-else-if="selectedDate.isWeekend">🟠 {{ isKhmer ? 'ថ្ងៃឈប់សម្រាកចុងសប្តាហ៍' : 'Weekend' }}</span>
                                        <span v-else>🟢 {{ isKhmer ? 'ថ្ងៃធ្វើការធម្មតា' : 'Working Day' }}</span>
                                    </span>
                                    <h3 class="text-lg sm:text-2xl font-extrabold truncate">
                                        {{ isKhmer ? 'ថ្ងៃ' + selectedDate.weekdayKhmer + ' ទី' + toKhmerNumeral(selectedDate.date) : selectedDate.weekday + ', ' + selectedDate.monthShort + ' ' + selectedDate.date }}
                                    </h3>
                                    <p class="text-white/85 text-xs sm:text-sm mt-0.5">
                                        {{ selectedDate.fullDate }}
                                    </p>
                                </div>
                                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
                                    <span class="text-xl sm:text-2xl font-black leading-none">{{ isKhmer ? toKhmerNumeral(selectedDate.date) : selectedDate.date }}</span>
                                    <span class="text-[10px] sm:text-[11px] font-semibold opacity-90 mt-1">{{ selectedDate.date }} {{ selectedDate.monthShort }}</span>
                                </div>
                            </div>

                            <div v-if="selectedDate.isHolyDay" class="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/25 border border-amber-300/40 text-xs font-bold text-amber-100">
                                <span>☸️</span>
                                <span>{{ isKhmer ? 'ថ្ងៃឧបោសថសីល (' + selectedDate.lunarInfo.baseDay + ')' : 'Buddhist Holy Day (' + selectedDate.lunarInfo.baseDayEnglish + ')' }}</span>
                            </div>
                        </div>

                        <!-- Traditional Khmer Date Box with Copy Button -->
                        <div class="p-4 sm:p-6 space-y-4">
                            <div class="p-3 sm:p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200/70 dark:border-gray-600">
                                <div class="flex items-center justify-between gap-2 mb-1.5">
                                    <span class="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'កាលបរិច្ឆេទខ្មែរផ្លូវការ' : 'Official Khmer Date' }}</span>
                                    <button @click="copyKhmerDate"
                                        class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
                                        :class="copiedKhmerDate 
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' 
                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300'">
                                        <span>{{ copiedKhmerDate ? (isKhmer ? '✓ បានចម្លង' : '✓ Copied') : (isKhmer ? '📋 ចម្លង' : '📋 Copy') }}</span>
                                    </button>
                                </div>
                                <p class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-relaxed break-words">
                                    {{ isKhmer ? selectedDate.khmerLunarFullDate : selectedDate.englishLunarFullDate }}
                                </p>
                                <p class="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
                                    {{ isKhmer ? selectedDate.khmerSolarFullDate : selectedDate.englishSolarFullDate }}
                                </p>
                            </div>

                            <!-- 4-Card Lunar Attribute Breakdown -->
                            <div class="grid grid-cols-2 gap-2.5">
                                <div class="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 dark:bg-gray-700/40 border border-blue-100 dark:border-gray-700 min-w-0">
                                    <div class="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'ថ្ងៃច័ន្ទគតិ' : 'Lunar Day' }}</div>
                                    <div class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-0.5 flex items-center gap-1 truncate">
                                        <span>{{ isKhmer ? selectedDate.lunarInfo.baseDay : selectedDate.lunarInfo.baseDayEnglish }}</span>
                                        <span v-if="selectedDate.lunarInfo.phase">{{ selectedDate.lunarInfo.phase }}</span>
                                    </div>
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 dark:bg-gray-700/40 border border-blue-100 dark:border-gray-700 min-w-0">
                                    <div class="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'ខែច័ន្ទគតិ' : 'Lunar Month' }}</div>
                                    <div class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                                        {{ isKhmer ? 'ខែ' + selectedDate.lunarInfo.monthKhmer + ' (' + toKhmerNumeral(selectedDate.lunarInfo.monthLength) + 'ថ្ងៃ)' : selectedDate.lunarInfo.monthEnglish + ' (' + selectedDate.lunarInfo.monthLength + ' days)' }}
                                    </div>
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 dark:bg-gray-700/40 border border-blue-100 dark:border-gray-700 min-w-0">
                                    <div class="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'ឆ្នាំសត្វ និងស័ក' : 'Zodiac & Sak' }}</div>
                                    <div class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                                        {{ isKhmer ? 'ឆ្នាំ' + selectedDate.lunarInfo.zodiacKhmer + ' ' + selectedDate.lunarInfo.sakKhmer : 'Year of the ' + selectedDate.lunarInfo.zodiacEnglish + ' (' + selectedDate.lunarInfo.sakEnglish + ')' }}
                                    </div>
                                </div>
                                <div class="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 dark:bg-gray-700/40 border border-blue-100 dark:border-gray-700 min-w-0">
                                    <div class="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'ពុទ្ធសករាជ' : 'Buddhist Era' }}</div>
                                    <div class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                                        {{ isKhmer ? 'ព.ស. ' + toKhmerNumeral(selectedDate.lunarInfo.beYear) : 'B.E. ' + selectedDate.lunarInfo.beYear }}
                                    </div>
                                </div>
                            </div>

                            <!-- Holiday Detail Box if Present -->
                            <div v-if="selectedDate.holiday" 
                                class="p-3.5 sm:p-4 rounded-2xl border"
                                :class="selectedDate.isPublicHoliday 
                                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50' 
                                    : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50'">
                                <div class="flex items-start gap-3">
                                    <span class="text-xl sm:text-2xl shrink-0">{{ selectedDate.isPublicHoliday ? '🎉' : '🙏' }}</span>
                                    <div class="min-w-0">
                                        <div class="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                                            :class="selectedDate.isPublicHoliday ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'">
                                            {{ selectedDate.isPublicHoliday ? (isKhmer ? 'ថ្ងៃឈប់សម្រាកផ្លូវការ' : 'Official Public Holiday') : (isKhmer ? 'ពិធីបុណ្យប្រពៃណី' : 'Traditional Observance') }}
                                        </div>
                                        <p class="font-bold text-sm sm:text-base text-gray-900 dark:text-white break-words">
                                            {{ isKhmer ? selectedDate.holiday.khmer : selectedDate.holiday.english }}
                                        </p>
                                        <p class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5 break-words">
                                            {{ isKhmer ? selectedDate.holiday.english : selectedDate.holiday.khmer }}
                                        </p>
                                        <p v-if="selectedDate.holiday.description" class="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {{ selectedDate.holiday.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Buddhist Holy Days (ថ្ងៃឧបោសថសីល) in Current Month -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden">
                        <div class="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
                            <div class="flex items-center gap-2 min-w-0">
                                <span class="text-xl shrink-0">☸️</span>
                                <div class="min-w-0">
                                    <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                                        {{ isKhmer ? 'ថ្ងៃឧបោសថសីល ខែ' + currentSolarKhmerMonth : 'Buddhist Holy Days in ' + currentMonthName }}
                                    </h3>
                                    <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? 'ខែសីលក្នុង ' + currentSolarKhmerMonth + ' ' + toKhmerNumeral(currentYear) : 'Holy days in ' + currentMonthName + ' ' + currentYear }}</p>
                                </div>
                            </div>
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 shrink-0">
                                {{ isKhmer ? toKhmerNumeral(currentMonthHolyDays.length) + ' ថ្ងៃ' : currentMonthHolyDays.length + ' Days' }}
                            </span>
                        </div>
                        <div class="divide-y divide-gray-100 dark:divide-gray-700/60">
                            <button v-for="(hDay, idx) in currentMonthHolyDays" :key="idx"
                                @click="selectDate(hDay)"
                                class="w-full p-3.5 sm:px-5 flex items-center justify-between hover:bg-amber-50/50 dark:hover:bg-gray-700/50 transition-all text-left gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-xl bg-amber-100/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold text-sm flex flex-col items-center justify-center shrink-0">
                                        <span>{{ isKhmer ? toKhmerNumeral(hDay.date) : hDay.date }}</span>
                                        <span class="text-[9px] opacity-75">{{ hDay.date }}</span>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5 truncate">
                                            <span class="truncate">{{ isKhmer ? 'ថ្ងៃ' + hDay.weekdayKhmer + ' • ' + hDay.lunarInfo.baseDay : hDay.weekday + ' • ' + (hDay.lunarInfo.baseDayEnglish || hDay.lunarInfo.baseDay) }}</span>
                                            <span v-if="hDay.isToday" class="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full shrink-0">{{ isKhmer ? 'ថ្ងៃនេះ' : 'Today' }}</span>
                                        </div>
                                        <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                            {{ isKhmer ? 'ខែ' + hDay.lunarInfo.monthKhmer + ' • ' + toKhmerNumeral(hDay.date) + ' ' + currentSolarKhmerMonth : (hDay.lunarInfo.monthEnglish || hDay.lunarInfo.monthKhmer) + ' • ' + hDay.date + ' ' + currentMonthName }}
                                        </div>
                                    </div>
                                </div>
                                <span class="text-lg shrink-0">{{ hDay.lunarPhase }}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Holidays & Observances Explorer (Tabs: Upcoming vs Full Year) -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden mb-6 sm:mb-8">
                <div class="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4">
                    <div class="min-w-0">
                        <h2 class="text-base sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <SparklesIcon class="h-5 w-5 sm:h-6 sm:w-6 text-red-500 shrink-0" />
                            <span class="truncate">{{ isKhmer ? 'តារាងថ្ងៃបុណ្យជាតិ និងថ្ងៃឈប់សម្រាកផ្លូវការ' : 'Official Public Holidays & Observances' }}</span>
                        </h2>
                        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {{ isKhmer ? 'ចុចលើថ្ងៃបុណ្យណាមួយដើម្បីមើលក្នុងប្រតិទិន' : 'Tap any holiday to inspect in calendar' }}
                        </p>
                    </div>

                    <!-- View Mode Toggle & Search -->
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                        <div class="grid grid-cols-2 sm:inline-flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1">
                            <button @click="holidayTab = 'upcoming'"
                                class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center"
                                :class="holidayTab === 'upcoming' 
                                    ? 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 shadow-sm' 
                                    : 'text-gray-600 dark:text-gray-300'">
                                {{ isKhmer ? 'ថ្ងៃបុណ្យខាងមុខ' : 'Upcoming Holidays' }}
                            </button>
                            <button @click="holidayTab = 'year'"
                                class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center"
                                :class="holidayTab === 'year' 
                                    ? 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 shadow-sm' 
                                    : 'text-gray-600 dark:text-gray-300'">
                                {{ isKhmer ? 'ប្រចាំឆ្នាំ ' + toKhmerNumeral(currentYear) : 'Full Year ' + currentYear }}
                            </button>
                        </div>

                        <input v-model.trim="holidaySearch" type="text" :placeholder="isKhmer ? 'ស្វែងរកថ្ងៃបុណ្យ...' : 'Search holidays...'"
                            class="w-full sm:w-48 px-3 py-2 sm:py-1.5 rounded-xl text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-gray-100 dark:bg-gray-700">
                    <div v-for="(holiday, idx) in displayedHolidays" :key="idx"
                        @click="jumpToHoliday(holiday)"
                        class="p-3.5 sm:p-5 bg-white dark:bg-gray-800 hover:bg-blue-50/40 dark:hover:bg-gray-700/60 cursor-pointer transition-all flex items-center gap-3 sm:gap-4 min-w-0">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 border"
                            :class="holiday.isPast 
                                ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-400' 
                                : holiday.isPublicHoliday 
                                    ? 'bg-red-50 dark:bg-red-900/25 border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400'
                                    : 'bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400'">
                            <span class="text-base sm:text-xl font-extrabold leading-none">
                                {{ holiday.day }}
                            </span>
                            <span class="text-[10px] sm:text-xs font-semibold mt-0.5">
                                {{ holiday.monthShort }}
                            </span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap items-center gap-1.5 mb-0.5">
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold"
                                    :class="holiday.isPublicHoliday 
                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' 
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'">
                                    {{ holiday.isPublicHoliday ? (isKhmer ? 'ឈប់សម្រាក' : 'Public Holiday') : (isKhmer ? 'ប្រពៃណី (ធ្វើការ)' : 'Observance (Workday)') }}
                                </span>
                                <span class="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 truncate">• {{ isKhmer ? holiday.weekdayKhmer : holiday.weekdayName }} {{ isKhmer ? toKhmerNumeral(holiday.year) : holiday.year }}</span>
                            </div>
                            <p class="font-bold text-gray-900 dark:text-white text-xs sm:text-base truncate">
                                {{ isKhmer ? holiday.khmer : holiday.english }}
                            </p>
                            <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                                {{ isKhmer ? holiday.english : holiday.khmer }}
                            </p>
                        </div>

                        <div class="text-right flex-shrink-0">
                            <span v-if="holiday.daysUntil === 0" class="px-2 sm:px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-bold rounded-full">
                                {{ isKhmer ? 'ថ្ងៃនេះ!' : 'Today!' }}
                            </span>
                            <span v-else-if="holiday.daysUntil === 1" class="px-2 sm:px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] sm:text-xs font-bold rounded-full">
                                {{ isKhmer ? 'ថ្ងៃស្អែក' : 'Tomorrow' }}
                            </span>
                            <span v-else-if="holiday.daysUntil > 1" class="px-2 sm:px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs font-semibold rounded-full">
                                {{ isKhmer ? toKhmerNumeral(holiday.daysUntil) + ' ថ្ងៃទៀត' : 'In ' + holiday.daysUntil + ' days' }}
                            </span>
                            <span v-else class="text-[11px] text-gray-400">
                                {{ isKhmer ? 'បានកន្លង' : 'Passed' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Khmer Months Reference & Cultural Info -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                <div class="lg:col-span-7 min-w-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-200/80 dark:border-amber-800/60">
                    <h2 class="text-base sm:text-xl font-bold text-amber-900 dark:text-amber-200 mb-3.5 sm:mb-4 flex items-center gap-2">
                        <span class="text-xl sm:text-2xl shrink-0">📜</span>
                        <span>{{ isKhmer ? 'ខែច័ន្ទគតិខ្មែរទាំង ១២ ខែ' : '12 Khmer Lunar Months' }}</span>
                    </h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                        <div v-for="(month, idx) in khmerMonths" :key="idx"
                            class="p-2.5 sm:p-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-amber-100 dark:border-gray-700 hover:shadow-md transition-all min-w-0">
                            <div class="flex items-center justify-between">
                                <span class="text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-amber-400">{{ isKhmer ? 'ខែទី ' + toKhmerNumeral(idx + 1) : 'Month ' + (idx + 1) }}</span>
                                <span class="text-[10px] text-gray-400">{{ isKhmer ? month.days + ' ថ្ងៃ' : month.days + ' days' }}</span>
                            </div>
                            <div class="font-bold text-gray-900 dark:text-white text-sm sm:text-base mt-0.5 truncate">{{ isKhmer ? month.khmer : month.english }}</div>
                            <div class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{{ isKhmer ? month.english + ' • ' + month.gregorian : month.khmer + ' • ' + month.gregorian }}</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 min-w-0 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-200/80 dark:border-gray-700 flex flex-col justify-between space-y-4">
                    <div>
                        <h2 class="text-base sm:text-xl font-bold text-gray-900 dark:text-white mb-3.5 sm:mb-4 flex items-center gap-2">
                            <span class="text-xl sm:text-2xl shrink-0">🏛️</span>
                            <span>{{ isKhmer ? 'អំពីប្រតិទិនខ្មែរ' : 'About Khmer Calendar' }}</span>
                        </h2>
                        <div class="space-y-3">
                            <div class="p-3 sm:p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                <h3 class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1">{{ isKhmer ? '📅 ពុទ្ធសករាជ (ព.ស.) និងស័ក' : '📅 Buddhist Era (B.E.) & Sak' }}</h3>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {{ isKhmer ? 'ពុទ្ធសករាជផ្លាស់ប្តូរនៅថ្ងៃ ១រោច ខែពិសាខ (១ថ្ងៃក្រោយបុណ្យវិសាខបូជា) ចំណែកឯឆ្នាំសត្វទាំង ១២ និងស័កទាំង ១០ ផ្លាស់ប្តូរនៅថ្ងៃវារៈឡើងស័ក (ថ្ងៃទី៣ នៃបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ)។' : 'The Buddhist Era increments on the 1st waning day of Visakha (day after Visak Bochea), while the 12 Zodiac animals and 10 Sak change on the 3rd day of Khmer New Year (Veareak Laeng Sak).' }}
                                </p>
                            </div>
                            <div class="p-3 sm:p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                <h3 class="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-1">{{ isKhmer ? '☸️ ថ្ងៃឧបោសថសីល និងខ្នើត-រនោច' : '☸️ Buddhist Holy Days & Lunar Phases' }}</h3>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {{ isKhmer ? 'ក្នុងមួយខែច័ន្ទគតិមានថ្ងៃសីលចំនួន ៤ ថ្ងៃ គឺថ្ងៃ ៨កើត, ១៥កើត (ពេញបូណ៌មី), ៨រោច និងថ្ងៃ ១៤រោច (ខែខ្វះ ២៩ថ្ងៃ) ឬ ១៥រោច (ខែពេញ ៣០ថ្ងៃ)។' : 'Each lunar month has 4 holy days: the 8th waxing, 15th waxing (Full Moon), 8th waning, and 14th/15th waning (New Moon).' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="pt-3 border-t border-gray-100 dark:border-gray-700 text-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {{ isKhmer ? 'ប្រតិទិនខ្មែរ • គណនាតាមក្បួនឆន្ទគតិខ្មែរ និងអនុក្រឹត្យថ្ងៃឈប់សម្រាកផ្លូវការ • ព.ស. ' + toKhmerNumeral(currentKhmerYear) : 'Khmer Calendar • Calculated with Chhankitek rules & official Royal Decrees • B.E. ' + currentKhmerYear }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
    SparklesIcon
} from '@heroicons/vue/24/outline';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'KhmerCalendar',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        CalendarIcon,
        SparklesIcon
    },
    setup() {
        const { currentLang, isKhmer, isEnglish, setLanguage, t } = useLanguage();
        return {
            currentLang,
            isKhmer,
            isEnglish,
            setLanguage,
            t
        };
    },
    data() {
        return {
            currentDate: new Date(),
            selectedDate: null,
            activeFilter: 'all',
            holidayTab: 'upcoming',
            holidaySearch: '',
            copiedKhmerDate: false,
            dayNames: [
                { full: 'Sunday', short: 'Sun', khmer: 'អាទិត្យ' },
                { full: 'Monday', short: 'Mon', khmer: 'ចន្ទ' },
                { full: 'Tuesday', short: 'Tue', khmer: 'អង្គារ' },
                { full: 'Wednesday', short: 'Wed', khmer: 'ពុធ' },
                { full: 'Thursday', short: 'Thu', khmer: 'ព្រហស្បតិ៍' },
                { full: 'Friday', short: 'Fri', khmer: 'សុក្រ' },
                { full: 'Saturday', short: 'Sat', khmer: 'សៅរ៍' }
            ],
            englishMonthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            solarKhmerMonths: [
                'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
                'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
            ],
            lunarMonthKhmerMap: {
                'MĬKÔSĔR': 'មិគសិរ',
                'BŎSS': 'បុស្ស',
                'MÉAKH': 'មាឃ',
                'PHÂLKŬN': 'ផល្គុន',
                'CHÉTR': 'ចេត្រ',
                'VĬSAKH': 'ពិសាខ',
                'CHÉSTH': 'ជេស្ឋ',
                'ASATH': 'អាសាឍ',
                'BÂTHÂMSATH': 'បឋមាសាឍ',
                'TŬTĔYÉASATH': 'ទុតិយាសាឍ',
                'SRAPÔNÂ': 'ស្រាពណ៍',
                'PHÔTRÔBÂT': 'ភទ្របទ',
                'ÂSSŎCH': 'អស្សុជ',
                'KÂTDĔK': 'កក្តិក'
            },
            zodiacKhmerMap: {
                'JUTE': 'ជូត',
                'CHLOV': 'ឆ្លូវ',
                'KARL': 'ខាល',
                'THOS': 'ថោះ',
                'RORNG': 'រោង',
                'MASAGN': 'ម្សាញ់',
                'MOMEE': 'មមី',
                'MOMAY': 'មមែ',
                'VOKE': 'វក',
                'ROKA': 'រកា',
                'JOR': 'ច',
                'KAOR': 'កុរ'
            },
            zodiacEnglishMap: {
                'JUTE': 'Rat',
                'CHLOV': 'Ox',
                'KARL': 'Tiger',
                'THOS': 'Rabbit',
                'RORNG': 'Dragon',
                'MASAGN': 'Snake',
                'MOMEE': 'Horse',
                'MOMAY': 'Goat',
                'VOKE': 'Monkey',
                'ROKA': 'Rooster',
                'JOR': 'Dog',
                'KAOR': 'Pig'
            },
            sakKhmerList: [
                'ឯកស័ក',
                'ទោស័ក',
                'ត្រីស័ក',
                'ចត្វាស័ក',
                'បញ្ចស័ក',
                'ឆស័ក',
                'សប្តស័ក',
                'អដ្ឋស័ក',
                'នព្វស័ក',
                'សំរឹទ្ធិស័ក'
            ],
            sakEnglishList: [
                '1st Sak',
                '2nd Sak',
                '3rd Sak',
                '4th Sak',
                '5th Sak',
                '6th Sak',
                '7th Sak',
                '8th Sak',
                '9th Sak',
                '10th Sak'
            ],
            lunarMonthEnglishMap: {
                'MĬKÔSĔR': 'Mikosir',
                'BŎSS': 'Boss',
                'MÉAKH': 'Meakh',
                'PHÂLKŬN': 'Phalkun',
                'CHÉTR': 'Chaet',
                'VĬSAKH': 'Visakh',
                'CHÉSTH': 'Chesth',
                'ASATH': 'Asath',
                'BÂTHÂMSATH': '1st Asath',
                'TŬTĔYÉASATH': '2nd Asath',
                'SRAPÔNÂ': 'Srapon',
                'PHÔTRÔBÂT': 'Photrobot',
                'ÂSSŎCH': 'Asuj',
                'KÂTDĔK': 'Katdek'
            },
            khmerMonths: [
                { khmer: 'ខែមិគសិរ', english: 'Mikosir', gregorian: 'Nov-Dec', days: '២៩' },
                { khmer: 'ខែបុស្ស', english: 'Boss', gregorian: 'Dec-Jan', days: '៣០' },
                { khmer: 'ខែមាឃ', english: 'Meakh', gregorian: 'Jan-Feb', days: '២៩' },
                { khmer: 'ខែផល្គុន', english: 'Phalkun', gregorian: 'Feb-Mar', days: '៣០' },
                { khmer: 'ខែចេត្រ', english: 'Chaet', gregorian: 'Mar-Apr', days: '២៩' },
                { khmer: 'ខែពិសាខ', english: 'Visakh', gregorian: 'Apr-May', days: '៣០' },
                { khmer: 'ខែជេស្ឋ', english: 'Chesth', gregorian: 'May-Jun', days: '២៩/៣០' },
                { khmer: 'ខែអាសាឍ', english: 'Asath', gregorian: 'Jun-Jul', days: '៣០' },
                { khmer: 'ខែស្រាពណ៍', english: 'Srapon', gregorian: 'Jul-Aug', days: '២៩' },
                { khmer: 'ខែភទ្របទ', english: 'Photrobot', gregorian: 'Aug-Sep', days: '៣០' },
                { khmer: 'ខែអស្សុជ', english: 'Asuj', gregorian: 'Sep-Oct', days: '២៩' },
                { khmer: 'ខែកក្តិក', english: 'Katdek', gregorian: 'Oct-Nov', days: '៣០' }
            ],
            khmerNumerals: ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'],
            holidaysCache: {}
        };
    },
    computed: {
        yearOptions() {
            const base = new Date().getFullYear();
            const years = [];
            for (let y = base - 5; y <= base + 6; y++) {
                years.push(y);
            }
            return years;
        },
        currentYear() {
            return this.currentDate.getFullYear();
        },
        currentMonth() {
            return this.currentDate.getMonth();
        },
        referenceLunarData() {
            const refDay = this.selectedDate && this.selectedDate.month === this.currentMonth && this.selectedDate.year === this.currentYear
                ? this.selectedDate.date
                : 15;
            return this.calculateKhmerLunar(this.currentYear, this.currentMonth, refDay);
        },
        currentKhmerYear() {
            return this.referenceLunarData.years.BE;
        },
        currentZodiacKhmer() {
            return this.zodiacKhmerMap[this.referenceLunarData.zodiac] || '';
        },
        currentZodiacEnglish() {
            return this.zodiacEnglishMap[this.referenceLunarData.zodiac] || '';
        },
        currentSakKhmer() {
            return this.sakKhmerList[this.referenceLunarData.sequence] || '';
        },
        currentSakEnglish() {
            return this.sakEnglishList[this.referenceLunarData.sequence] || '';
        },
        currentMonthName() {
            return this.currentDate.toLocaleString('en-US', { month: 'long' });
        },
        currentSolarKhmerMonth() {
            return this.solarKhmerMonths[this.currentMonth];
        },
        khmerMonthName() {
            const firstDayLunar = this.calculateKhmerLunar(this.currentYear, this.currentMonth, 1);
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const lastDayLunar = this.calculateKhmerLunar(this.currentYear, this.currentMonth, daysInMonth);
            const firstKhmer = this.lunarMonthKhmerMap[firstDayLunar.month.name] || '';
            const lastKhmer = this.lunarMonthKhmerMap[lastDayLunar.month.name] || '';
            if (firstKhmer && lastKhmer && firstKhmer !== lastKhmer) {
                return `ខែ${firstKhmer} - ខែ${lastKhmer}`;
            }
            return `ខែ${firstKhmer}`;
        },
        englishMonthName() {
            const firstDayLunar = this.calculateKhmerLunar(this.currentYear, this.currentMonth, 1);
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const lastDayLunar = this.calculateKhmerLunar(this.currentYear, this.currentMonth, daysInMonth);
            const firstEn = this.lunarMonthEnglishMap[firstDayLunar.month.name] || '';
            const lastEn = this.lunarMonthEnglishMap[lastDayLunar.month.name] || '';
            if (firstEn && lastEn && firstEn !== lastEn) {
                return `${firstEn} - ${lastEn}`;
            }
            return `${firstEn}`;
        },
        todayBannerInfo() {
            const now = new Date();
            const y = now.getFullYear();
            const m = now.getMonth();
            const d = now.getDate();
            const dow = now.getDay();
            const lunarInfo = this.getLunarDay(y, m, d);
            const holiday = this.getHoliday(y, m + 1, d);
            return {
                day: d,
                khmerLunarFullDate: `ថ្ងៃ${this.dayNames[dow].khmer} ${lunarInfo.baseDay} ខែ${lunarInfo.monthKhmer} ឆ្នាំ${lunarInfo.zodiacKhmer} ${lunarInfo.sakKhmer} ព.ស. ${this.toKhmerNumeral(lunarInfo.beYear)}`,
                englishLunarFullDate: `${this.dayNames[dow].full}, ${lunarInfo.baseDayEnglish} of ${lunarInfo.monthEnglish}, Year of the ${lunarInfo.zodiacEnglish} (${lunarInfo.sakEnglish}), B.E. ${lunarInfo.beYear}`,
                khmerSolarFullDate: `ទី${this.toKhmerNumeral(d)} ខែ${this.solarKhmerMonths[m]} ឆ្នាំ${this.toKhmerNumeral(y)}`,
                englishSolarFullDate: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
                isPublicHoliday: !!(holiday && holiday.isPublicHoliday !== false),
                isWeekend: dow === 0 || dow === 6
            };
        },
        selectedDateIso() {
            if (!this.selectedDate) return '';
            const y = this.selectedDate.year;
            const m = String(this.selectedDate.month + 1).padStart(2, '0');
            const d = String(this.selectedDate.date).padStart(2, '0');
            return `${y}-${m}-${d}`;
        },
        calendarDays() {
            const year = this.currentYear;
            const month = this.currentMonth;
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDay = firstDay.getDay();
            
            const days = [];
            const today = new Date();
            
            // Previous month days
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (let i = startingDay - 1; i >= 0; i--) {
                days.push({
                    date: prevMonthLastDay - i,
                    isCurrentMonth: false,
                    isToday: false,
                    isSelected: false,
                    holiday: null,
                    isHoliday: false,
                    isPublicHoliday: false,
                    isWeekend: false,
                    isHolyDay: false,
                    lunarPhase: null,
                    lunarDay: ''
                });
            }
            
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const dateObj = new Date(year, month, i);
                const dow = dateObj.getDay();
                const isToday = today.getDate() === i && 
                               today.getMonth() === month && 
                               today.getFullYear() === year;
                
                const holiday = this.getHoliday(year, month + 1, i);
                const lunarData = this.getLunarDay(year, month, i);
                const isPublicHoliday = !!(holiday && holiday.isPublicHoliday !== false);
                const isWeekend = dow === 0 || dow === 6;
                
                days.push({
                    date: i,
                    weekday: this.dayNames[dow].full,
                    weekdayKhmer: this.dayNames[dow].khmer,
                    isCurrentMonth: true,
                    isToday,
                    isSelected: this.selectedDate && 
                               this.selectedDate.date === i && 
                               this.selectedDate.month === month &&
                               this.selectedDate.year === year,
                    holiday,
                    isHoliday: !!holiday,
                    isPublicHoliday,
                    isWeekend,
                    isWorkingDay: !isPublicHoliday && !isWeekend,
                    isHolyDay: lunarData.isHolyDay,
                    lunarPhase: lunarData.phase,
                    lunarDay: lunarData.day,
                    lunarInfo: lunarData
                });
            }
            
            // Next month days
            const remainingDays = 42 - days.length;
            for (let i = 1; i <= remainingDays; i++) {
                days.push({
                    date: i,
                    isCurrentMonth: false,
                    isToday: false,
                    isSelected: false,
                    holiday: null,
                    isHoliday: false,
                    isPublicHoliday: false,
                    isWeekend: false,
                    isHolyDay: false,
                    lunarPhase: null,
                    lunarDay: ''
                });
            }
            
            return days;
        },
        currentMonthDays() {
            return this.calendarDays.filter(d => d.isCurrentMonth);
        },
        currentMonthHolyDays() {
            return this.currentMonthDays.filter(d => d.isHolyDay);
        },
        monthStats() {
            const current = this.currentMonthDays;
            return {
                totalDays: current.length,
                workingDays: current.filter(d => d.isWorkingDay).length,
                publicHolidays: current.filter(d => d.isPublicHoliday).length,
                holyDays: current.filter(d => d.isHolyDay).length
            };
        },
        upcomingHolidays() {
            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const currentYear = todayMidnight.getFullYear();
            
            const allHolidays = [
                ...this.getHolidaysForYear(currentYear),
                ...this.getHolidaysForYear(currentYear + 1)
            ].filter(h => h.isPublicHoliday !== false);
            
            return allHolidays
                .map(h => this.EnrichHolidayItem(h, todayMidnight))
                .filter(h => h.daysUntil >= 0)
                .slice(0, 10);
        },
        nextUpcomingHoliday() {
            return this.upcomingHolidays.length > 0 ? this.upcomingHolidays[0] : null;
        },
        displayedHolidays() {
            const now = new Date();
            const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let list = [];
            if (this.holidayTab === 'year') {
                list = this.getHolidaysForYear(this.currentYear).map(h => this.EnrichHolidayItem(h, todayMidnight));
            } else {
                list = this.upcomingHolidays;
            }
            if (this.holidaySearch) {
                const q = this.holidaySearch.toLowerCase();
                list = list.filter(h => h.khmer.toLowerCase().includes(q) || h.english.toLowerCase().includes(q));
            }
            return list;
        }
    },
    methods: {
        EnrichHolidayItem(h, todayMidnight) {
            const holidayDate = new Date(h.year, h.month - 1, h.day);
            const timeDiff = holidayDate.getTime() - todayMidnight.getTime();
            const daysUntil = Math.round(timeDiff / (1000 * 60 * 60 * 24));
            return {
                ...h,
                day: h.day,
                monthShort: holidayDate.toLocaleString('en-US', { month: 'short' }),
                weekdayName: this.dayNames[holidayDate.getDay()].full,
                weekdayKhmer: `ថ្ងៃ${this.dayNames[holidayDate.getDay()].khmer}`,
                daysUntil,
                isPast: daysUntil < 0
            };
        },
        isDayMatchingFilter(day) {
            if (this.activeFilter === 'all') return true;
            if (this.activeFilter === 'workday') return day.isWorkingDay;
            if (this.activeFilter === 'holiday') return day.isPublicHoliday;
            if (this.activeFilter === 'holyday') return day.isHolyDay;
            return true;
        },
        toKhmerNumeral(num) {
            return String(num).split('').map(d => this.khmerNumerals[parseInt(d)] ?? d).join('');
        },
        // Timezone-independent Khmer Chhankitek lunar calculation
        calculateKhmerLunar(CE, monthZeroIndexed, dayOfMonth) {
            const aharakoune = y => (y * 292207 + 373) % 800;
            const harakoune = y => Math.floor((y * 292207 + 373) / 800) + 1;
            const avomane = y => (11 * harakoune(y) + 650) % 692;
            const regularLeap = y => (800 - aharakoune(y)) <= 207;

            const bodethey = y => {
                const ha = harakoune(y);
                return (ha + Math.floor((11 * ha + 650) / 692)) % 30;
            };

            const jaisLeap = y => {
                const b0 = bodethey(y);
                const b1 = bodethey(y + 1);
                return b0 > 24 || b0 < 6 || (b0 === 24 && b1 === 6) || (b0 === 25 && b1 === 5);
            };

            const isProtetinLeap = y => {
                const avomane0 = avomane(y);
                const avomane1 = avomane(y + 1);
                const normal = regularLeap(y);
                let value = normal && avomane0 < 127;
                if (!normal) {
                    if (avomane0 === 137 && avomane1 === 0) value = false;
                    else if (avomane0 < 138) value = true;
                }
                if (!value) value = isProtetinLeap(y - 1) && jaisLeap(y - 1);
                return value;
            };

            const greatLeap = y => {
                let value = isProtetinLeap(y);
                if (jaisLeap(y) && value) value = false;
                return value;
            };

            const daysInYear = year => {
                if (jaisLeap(year)) return 384;
                if (greatLeap(year)) return 355;
                return 354;
            };

            const monthsOfYear = year => {
                const ath = jaisLeap(year);
                const great = greatLeap(year);
                const items = [];
                for (let i = 0; i < 12 + (ath | 0); i++) {
                    let j = i;
                    if (ath && j >= 8) j--;
                    items.push(29 + ((j % 2 !== 0) | 0) + ((j === 6 && great) | 0));
                }
                return items;
            };

            let count = 0;
            let x = 1970 - 638 + 1;
            let yTarget = CE - 638;
            if (x > yTarget) {
                const tmp = x;
                x = yTarget;
                yTarget = tmp;
            }
            while (x < yTarget) count += daysInYear(x++);

            // Exact calendar days since 1970-11-29 (1 Keut Mikoser) in UTC
            const diffDays = Math.abs(
                Math.round((Date.UTC(CE, monthZeroIndexed, dayOfMonth) - Date.UTC(1970, 10, 29)) / 86400000)
            );

            let y = CE - 638;
            let day = Math.abs(diffDays - count) + 1;
            const BE = CE + 543 + ((day > 162) | 0);

            const len = daysInYear(y);
            if (day > len) {
                day -= len;
                y++;
            }

            let m = 0;
            const lengthOfYear = monthsOfYear(y);
            for (const monthLen of lengthOfYear) {
                if (day <= monthLen) break;
                day -= monthLen;
                m++;
            }

            // Khmer New Year (Virak Loeng Sak) transition in mid-April
            const newYearDates = this.getKhmerNewYearDays(CE);
            const loengSakDay = newYearDates[newYearDates.length - 1];
            const isBeforeLoengSak =
                monthZeroIndexed < 3 || (monthZeroIndexed === 3 && dayOfMonth < loengSakDay);
            const JE = (CE - 638) - (isBeforeLoengSak ? 1 : 0);

            const yearMonths = [
                'MĬKÔSĔR',
                'BŎSS',
                'MÉAKH',
                'PHÂLKŬN',
                'CHÉTR',
                'VĬSAKH',
                'CHÉSTH',
                'ASATH',
                'BÂTHÂMSATH',
                'TŬTĔYÉASATH',
                'SRAPÔNÂ',
                'PHÔTRÔBÂT',
                'ÂSSŎCH',
                'KÂTDĔK'
            ].filter((_, i) => {
                if (lengthOfYear.length === 12) return i !== 8 && i !== 9;
                return i !== 7;
            });

            const ZODIAC_YEARS = [
                'JUTE', 'CHLOV', 'KARL', 'THOS', 'RORNG', 'MASAGN',
                'MOMEE', 'MOMAY', 'VOKE', 'ROKA', 'JOR', 'KAOR'
            ];

            return {
                day,
                period: [((day - 1) % 15) + 1, day > 15 ? 'R' : 'K'],
                sequence: (((JE + 1) % 10) + 9) % 10,
                zodiac: ZODIAC_YEARS[(((JE + 1) % 12) + 10) % 12],
                years: { JE, CE, BE },
                length: len,
                monthLength: lengthOfYear[m],
                month: { name: yearMonths[m], index: m },
                months: yearMonths
            };
        },
        getKhmerNewYearDays(year) {
            if (year === 2024) return [13, 14, 15, 16];
            return [14, 15, 16];
        },
        // Generate accurate official Cambodian public holidays for any given year
        getHolidaysForYear(year) {
            if (this.holidaysCache[year]) {
                return this.holidaysCache[year];
            }

            const newYearDays = this.getKhmerNewYearDays(year);
            const fixedHolidays = [
                { month: 1, day: 1, khmer: 'ទិវាចូលឆ្នាំសកល', english: 'International New Year\'s Day', description: 'Official public holiday celebrating the start of the Gregorian calendar year.', isPublicHoliday: true },
                { month: 1, day: 7, khmer: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', english: 'Victory over Genocide Day', description: 'Commemorates the fall of the Khmer Rouge regime on January 7, 1979.', isPublicHoliday: true },
                { month: 3, day: 8, khmer: 'ទិវាអន្តរជាតិនារី', english: 'International Women\'s Day', description: 'Official public holiday celebrating women\'s rights and achievements.', isPublicHoliday: true },
                { month: 4, day: newYearDays[0], khmer: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ (ថ្ងៃមហាសង្ក្រាន្ត)', english: 'Khmer New Year (Maha Sangkran)', description: 'First official day of traditional Cambodian New Year celebrations.', isPublicHoliday: true },
                { month: 4, day: newYearDays[1], khmer: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ (ថ្ងៃវារៈវ័នបត)', english: 'Khmer New Year (Virak Vanabat)', description: 'Second official day of Cambodian New Year celebrations.', isPublicHoliday: true },
                { month: 4, day: newYearDays[2], khmer: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ (ថ្ងៃវារៈឡើងស័ក)', english: 'Khmer New Year (Virak Loeng Sak)', description: 'Third official day of Cambodian New Year marking the new Sak.', isPublicHoliday: true },
                { month: 5, day: 1, khmer: 'ទិវាពលកម្មអន្តរជាតិ', english: 'International Labor Day', description: 'Official public holiday honoring workers across Cambodia.', isPublicHoliday: true },
                { month: 5, day: 14, khmer: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះករុណាព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី', english: 'King Norodom Sihamoni\'s Birthday', description: 'Official public holiday celebrating the birthday of His Majesty King Norodom Sihamoni.', isPublicHoliday: true },
                { month: 6, day: 18, khmer: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី នរោត្តម មុនីនាថ សីហនុ', english: 'Queen Mother\'s Birthday', description: 'Official public holiday celebrating the birthday of Her Majesty Queen Mother Norodom Monineath Sihanouk.', isPublicHoliday: true },
                { month: 9, day: 24, khmer: 'ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ', english: 'Constitution Day', description: 'Official public holiday commemorating the promulgation of the 1993 Cambodian Constitution.', isPublicHoliday: true },
                { month: 10, day: 15, khmer: 'ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះករុណាព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ ព្រះបរមរតនកោដ្ឋ', english: 'Commemoration Day of King Father', description: 'Official public holiday honoring the late King Father Norodom Sihanouk.', isPublicHoliday: true },
                { month: 10, day: 29, khmer: 'ព្រះរាជពិធីបុណ្យគ្រងព្រះបរមរាជសម្បត្តិ', english: 'King\'s Coronation Day', description: 'Official public holiday marking the coronation of His Majesty King Norodom Sihamoni.', isPublicHoliday: true },
                { month: 11, day: 9, khmer: 'ទិវាបុណ្យឯករាជ្យជាតិ', english: 'National Independence Day', description: 'Official public holiday celebrating Cambodia\'s independence from France in 1953.', isPublicHoliday: true },
                { month: 12, day: 29, khmer: 'ទិវាសន្តិភាពនៅកម្ពុជា', english: 'Peace Day in Cambodia', description: 'Official public holiday celebrating complete peace and national reconciliation in Cambodia.', isPublicHoliday: true }
            ];

            if (newYearDays.length === 4) {
                fixedHolidays.push({
                    month: 4,
                    day: newYearDays[3],
                    khmer: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ (ថ្ងៃវារៈឡើងស័ក)',
                    english: 'Khmer New Year (Day 4)',
                    description: 'Final day of Khmer New Year celebrations.',
                    isPublicHoliday: true
                });
            }

            const byKey = {};
            for (const h of fixedHolidays) {
                const key = `${h.month}-${h.day}`;
                byKey[key] = { ...h, year };
            }

            // Scan every day of the year to find dynamic lunar holidays from Chhankitek
            for (let m = 0; m < 12; m++) {
                const daysInMonth = new Date(year, m + 1, 0).getDate();
                for (let d = 1; d <= daysInMonth; d++) {
                    const l = this.calculateKhmerLunar(year, m, d);
                    const pNum = l.period[0];
                    const pPhase = l.period[1];
                    const mName = l.month.name;
                    let lunarHoliday = null;

                    if (mName === 'MÉAKH' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យមាឃបូជា',
                            english: 'Meak Bochea Day',
                            description: 'Important Buddhist observance day on the full moon of Meakh (15 Keut Meakh).',
                            isPublicHoliday: false
                        };
                    } else if (mName === 'VĬSAKH' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យវិសាខបូជា',
                            english: 'Visak Bochea Day',
                            description: 'Official public holiday commemorating the birth, enlightenment, and Parinirvana of Lord Buddha (15 Keut Visakh).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'VĬSAKH' && pPhase === 'R' && pNum === 4) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យច្រត់ព្រះនង្គ័ល',
                            english: 'Royal Ploughing Ceremony',
                            description: 'Official public holiday and ancient royal ceremony marking the traditional start of the rice-growing season (4 Roach Visakh).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 1) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ថ្ងៃកាន់បិណ្ឌទី១',
                            english: 'Kan Ben (Day 1)',
                            description: 'First day of the 15-day Kan Ben / Pchum Ben religious period honoring ancestors (1 Roach Photrobot).',
                            isPublicHoliday: false
                        };
                    } else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 14) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃទី១)',
                            english: 'Pchum Ben Festival (Day 1)',
                            description: 'First official public holiday of the Pchum Ben Festival honoring ancestors (14 Roach Photrobot).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃភ្ជុំធំ)',
                            english: 'Pchum Ben Day (Main Day)',
                            description: 'Main day of Pchum Ben Festival when families gather at pagodas across Cambodia (15 Roach Photrobot).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'ÂSSŎCH' && pPhase === 'K' && pNum === 1) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃឆ្លង)',
                            english: 'Pchum Ben Festival (Final Day)',
                            description: 'Third and final official public holiday of the Pchum Ben Festival (1 Keut Asuj).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'KÂTDĔK' && pPhase === 'K' && pNum === 14) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក (ថ្ងៃទី១)',
                            english: 'Water Festival (Day 1)',
                            description: 'First official day of Bon Om Touk celebrating the reversal of the Tonle Sap River (14 Keut Katdek).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'KÂTDĔK' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក (ថ្ងៃទី២)',
                            english: 'Water Festival (Day 2 - Sampeah Preah Khae)',
                            description: 'Second official day of the Water Festival with boat races, illuminated floats, and Moon Salutation (15 Keut Katdek).',
                            isPublicHoliday: true
                        };
                    } else if (mName === 'KÂTDĔK' && pPhase === 'R' && pNum === 1) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក (ថ្ងៃទី៣)',
                            english: 'Water Festival (Final Day)',
                            description: 'Final official day of the Water Festival celebrations (1 Roach Katdek).',
                            isPublicHoliday: true
                        };
                    }

                    if (lunarHoliday) {
                        const key = `${lunarHoliday.month}-${lunarHoliday.day}`;
                        if (byKey[key]) {
                            byKey[key] = {
                                year,
                                month: lunarHoliday.month,
                                day: lunarHoliday.day,
                                khmer: `${byKey[key].khmer} និង${lunarHoliday.khmer}`,
                                english: `${byKey[key].english} & ${lunarHoliday.english}`,
                                description: `${byKey[key].description} ${lunarHoliday.description}`,
                                isPublicHoliday: byKey[key].isPublicHoliday || lunarHoliday.isPublicHoliday
                            };
                        } else {
                            byKey[key] = { ...lunarHoliday, year };
                        }
                    }
                }
            }

            const result = Object.values(byKey).sort((a, b) => {
                if (a.month === b.month) return a.day - b.day;
                return a.month - b.month;
            });
            this.holidaysCache[year] = result;
            return result;
        },
        getHoliday(year, month, day) {
            const holidays = this.getHolidaysForYear(year);
            return holidays.find(h => h.month === month && h.day === day) || null;
        },
        getLunarDay(year, month, day) {
            try {
                const lunarData = this.calculateKhmerLunar(year, month, day);
                const lunarDayNumber = lunarData.period[0];
                const isWaxing = lunarData.period[1] === 'K';
                const monthLength = lunarData.monthLength;
                const monthKhmer = this.lunarMonthKhmerMap[lunarData.month.name] || '';
                const lunarDayKhmer = this.toKhmerNumeral(lunarDayNumber);

                const isEndOfWaning = !isWaxing && ((monthLength === 29 && lunarDayNumber === 14) || (monthLength === 30 && lunarDayNumber === 15));
                const isHolyDay =
                    (isWaxing && (lunarDayNumber === 8 || lunarDayNumber === 15)) ||
                    (!isWaxing && lunarDayNumber === 8) ||
                    isEndOfWaning;

                let phase = null;
                if (isWaxing && lunarDayNumber === 8) {
                    phase = '🌓';
                } else if (isWaxing && lunarDayNumber === 15) {
                    phase = '🌕';
                } else if (!isWaxing && lunarDayNumber === 8) {
                    phase = '🌗';
                } else if (isEndOfWaning) {
                    phase = '🌑';
                }

                const baseLabel = `${lunarDayKhmer}${isWaxing ? 'កើត' : 'រោច'}`;
                const dayLabel = (isWaxing && lunarDayNumber === 1 && monthKhmer)
                    ? `${baseLabel} ${monthKhmer}`
                    : baseLabel;

                const monthEnglish = this.lunarMonthEnglishMap[lunarData.month.name] || '';
                const baseDayEnglish = `${lunarDayNumber} ${isWaxing ? 'Waxing' : 'Waning'}`;
                const dayLabelEnglish = (isWaxing && lunarDayNumber === 1 && monthEnglish)
                    ? `${baseDayEnglish} ${monthEnglish}`
                    : baseDayEnglish;

                return {
                    day: dayLabel,
                    baseDay: baseLabel,
                    dayEnglish: dayLabelEnglish,
                    baseDayEnglish,
                    phase,
                    isHolyDay,
                    dayNumber: lunarDayNumber,
                    isWaxing,
                    monthLength,
                    monthKhmer,
                    monthEnglish,
                    zodiacKhmer: this.zodiacKhmerMap[lunarData.zodiac] || '',
                    zodiacEnglish: this.zodiacEnglishMap[lunarData.zodiac] || '',
                    sakKhmer: this.sakKhmerList[lunarData.sequence] || '',
                    sakEnglish: this.sakEnglishList[lunarData.sequence] || '',
                    beYear: lunarData.years.BE
                };
            } catch (error) {
                console.error('Error calculating lunar day:', error);
                return {
                    day: '',
                    baseDay: '',
                    phase: null,
                    isHolyDay: false,
                    dayNumber: null
                };
            }
        },
        previousMonth() {
            this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
        },
        nextMonth() {
            this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
        },
        onMonthSelect(event) {
            const newMonth = parseInt(event.target.value, 10);
            if (!isNaN(newMonth)) {
                this.currentDate = new Date(this.currentYear, newMonth, 1);
            }
        },
        onYearSelect(event) {
            const newYear = parseInt(event.target.value, 10);
            if (!isNaN(newYear)) {
                this.currentDate = new Date(newYear, this.currentMonth, 1);
            }
        },
        onQuickDateJump(event) {
            const val = event.target.value;
            if (!val) return;
            const [y, m, d] = val.split('-').map(Number);
            if (!y || !m || !d) return;
            this.currentDate = new Date(y, m - 1, 1);
            const holiday = this.getHoliday(y, m, d);
            const lunarInfo = this.getLunarDay(y, m - 1, d);
            this.selectDate({
                date: d,
                isCurrentMonth: true,
                holiday,
                isPublicHoliday: !!(holiday && holiday.isPublicHoliday !== false),
                isHolyDay: lunarInfo.isHolyDay,
                lunarInfo
            });
        },
        jumpToHoliday(holiday) {
            const y = holiday.year || this.currentYear;
            const m = holiday.month - 1;
            const d = holiday.day;
            this.currentDate = new Date(y, m, 1);
            const holidayObj = this.getHoliday(y, holiday.month, d);
            const lunarInfo = this.getLunarDay(y, m, d);
            this.selectDate({
                date: d,
                isCurrentMonth: true,
                holiday: holidayObj,
                isPublicHoliday: !!(holidayObj && holidayObj.isPublicHoliday !== false),
                isHolyDay: lunarInfo.isHolyDay,
                lunarInfo
            });
        },
        async copyKhmerDate() {
            if (!this.selectedDate) return;
            const text = `${this.selectedDate.khmerLunarFullDate} ${this.selectedDate.khmerSolarFullDate}`;
            try {
                await navigator.clipboard.writeText(text);
                this.copiedKhmerDate = true;
                setTimeout(() => {
                    this.copiedKhmerDate = false;
                }, 2000);
            } catch (e) {
                console.error('Copy failed:', e);
            }
        },
        goToToday() {
            const now = new Date();
            this.currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
            const y = now.getFullYear();
            const m = now.getMonth();
            const d = now.getDate();
            const holiday = this.getHoliday(y, m + 1, d);
            const lunarInfo = this.getLunarDay(y, m, d);
            this.selectDate({
                date: d,
                isCurrentMonth: true,
                holiday,
                isPublicHoliday: !!(holiday && holiday.isPublicHoliday !== false),
                isHolyDay: lunarInfo.isHolyDay,
                lunarInfo
            });
        },
        selectDate(day) {
            if (!day.isCurrentMonth) return;
            
            const date = new Date(this.currentYear, this.currentMonth, day.date);
            const lunarInfo = day.lunarInfo || this.getLunarDay(this.currentYear, this.currentMonth, day.date);
            const dayOfWeek = date.getDay();
            const weekdayKhmer = this.dayNames[dayOfWeek].khmer;
            const solarMonthKhmer = this.solarKhmerMonths[this.currentMonth];
            
            this.selectedDate = {
                date: day.date,
                month: this.currentMonth,
                year: this.currentYear,
                weekday: this.dayNames[dayOfWeek].full,
                weekdayKhmer,
                monthShort: date.toLocaleString('en-US', { month: 'short' }),
                fullDate: date.toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                khmerLunarFullDate: `ថ្ងៃ${weekdayKhmer} ${lunarInfo.baseDay} ខែ${lunarInfo.monthKhmer} ឆ្នាំ${lunarInfo.zodiacKhmer} ${lunarInfo.sakKhmer} ព.ស. ${this.toKhmerNumeral(lunarInfo.beYear)}`,
                englishLunarFullDate: `${this.dayNames[dayOfWeek].full}, ${lunarInfo.baseDayEnglish} of ${lunarInfo.monthEnglish}, Year of the ${lunarInfo.zodiacEnglish} (${lunarInfo.sakEnglish}), B.E. ${lunarInfo.beYear}`,
                khmerSolarFullDate: `ត្រូវនឹងថ្ងៃទី${this.toKhmerNumeral(day.date)} ខែ${solarMonthKhmer} ឆ្នាំ${this.toKhmerNumeral(this.currentYear)}`,
                englishSolarFullDate: `Corresponds to ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
                holiday: day.holiday,
                isPublicHoliday: !!(day.holiday && day.holiday.isPublicHoliday !== false),
                isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
                isHolyDay: !!lunarInfo.isHolyDay,
                lunarInfo
            };
        }
    },
    mounted() {
        this.goToToday();
    }
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
