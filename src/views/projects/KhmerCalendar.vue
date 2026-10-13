<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50/20 via-transparent to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-8 sm:mt-10">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    ប្រតិទិនខ្មែរ
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Khmer Calendar • ឆ្នាំ{{ currentZodiacKhmer }} {{ currentSakKhmer }} ព.ស. {{ toKhmerNumeral(currentKhmerYear) }} ({{ currentKhmerYear }} BE)
                </p>
            </div>

            <!-- Main Calendar Card -->
            <div class="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6" style="animation-delay: 0ms">
                <!-- Calendar Header -->
                <div class="bg-gradient-to-r from-red-600 via-rose-500 to-blue-600 p-4 sm:p-6 shadow-lg shadow-red-500/20">
                    <div class="flex items-center justify-between">
                        <button @click="previousMonth" 
                            class="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 active:scale-95 transition-all duration-200">
                            <ChevronLeftIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </button>
                        
                        <div class="text-center">
                            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                                {{ currentMonthName }} {{ currentYear }}
                            </h2>
                            <p class="text-white/90 text-sm sm:text-base mt-0.5">
                                {{ khmerMonthName }} • ខែ{{ currentSolarKhmerMonth }} ឆ្នាំ{{ toKhmerNumeral(currentYear) }}
                            </p>
                        </div>
                        
                        <button @click="nextMonth" 
                            class="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 active:scale-95 transition-all duration-200">
                            <ChevronRightIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </button>
                    </div>
                    
                    <!-- Today Button -->
                    <div class="flex justify-center mt-4">
                        <button @click="goToToday" 
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2">
                            <CalendarIcon class="h-4 w-4" />
                            ថ្ងៃនេះ (Today)
                        </button>
                    </div>
                </div>

                <!-- Day Names Header -->
                <div class="grid grid-cols-7 bg-gray-50 dark:bg-gray-700/50">
                    <div v-for="(day, idx) in dayNames" :key="idx" 
                        class="py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold"
                        :class="idx === 0 ? 'text-red-500' : idx === 6 ? 'text-orange-500 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'">
                        <span class="hidden sm:block">{{ day.full }}</span>
                        <span class="sm:hidden">{{ day.short }}</span>
                        <div class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">{{ day.khmer }}</div>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="grid grid-cols-7">
                    <div v-for="(day, idx) in calendarDays" :key="idx"
                        class="min-h-[68px] sm:min-h-[85px] lg:min-h-[105px] p-1 sm:p-2 border-t border-r border-gray-100 dark:border-gray-700 relative group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                        :class="[
                            idx % 7 === 6 ? 'border-r-0' : '',
                            day.isCurrentMonth ? '' : 'bg-gray-50/50 dark:bg-gray-800/50',
                            day.isPublicHoliday && day.isCurrentMonth ? 'bg-red-50/30 dark:bg-red-900/10' : ''
                        ]"
                        @click="selectDate(day)">
                        
                        <!-- Date Number -->
                        <div class="flex justify-between items-start">
                            <span class="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all"
                                :class="[
                                    day.isToday ? 'bg-red-500 text-white shadow-lg font-bold' : '',
                                    day.isSelected && !day.isToday ? 'ring-2 ring-blue-500' : '',
                                    !day.isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 
                                        day.isPublicHoliday ? 'text-red-600 dark:text-red-400 font-bold' :
                                        idx % 7 === 0 ? 'text-red-500' :
                                        idx % 7 === 6 ? 'text-orange-500 dark:text-orange-400' :
                                        'text-gray-700 dark:text-gray-300'
                                ]">
                                {{ day.date }}
                            </span>
                            
                            <!-- Holiday / Holy Day Indicator -->
                            <div class="flex items-center gap-1">
                                <span v-if="day.isHolyDay && day.isCurrentMonth" 
                                    class="text-[10px] sm:text-xs" title="ថ្ងៃសីល (Buddhist Holy Day)">☸️</span>
                                <span v-if="day.isPublicHoliday && day.isCurrentMonth" 
                                    class="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="ថ្ងៃឈប់សម្រាកផ្លូវការ (Public Holiday)"></span>
                                <span v-else-if="day.holiday && day.isCurrentMonth" 
                                    class="w-2 h-2 rounded-full bg-amber-500" title="ពិធីបុណ្យប្រពៃណី (Traditional Observance)"></span>
                            </div>
                        </div>
                        
                        <!-- Khmer Date Numeral -->
                        <div v-if="day.isCurrentMonth" class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {{ toKhmerNumeral(day.date) }}
                        </div>
                        
                        <!-- Lunar Day Number -->
                        <div v-if="day.lunarDay && day.isCurrentMonth" 
                            class="text-[9px] sm:text-[10px] font-medium mt-0.5 truncate"
                            :class="day.isHolyDay ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-blue-600 dark:text-blue-400'">
                            {{ day.lunarDay }}
                        </div>
                        
                        <!-- Holiday Name -->
                        <div v-if="day.holiday && day.isCurrentMonth" 
                            class="mt-1 text-[8px] sm:text-[10px] lg:text-xs font-medium line-clamp-2"
                            :class="day.isPublicHoliday ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'">
                            {{ day.holiday.khmer }}
                        </div>
                        
                        <!-- Lunar Phase -->
                        <div v-if="day.lunarPhase && day.isCurrentMonth" 
                            class="absolute bottom-1 right-1 text-xs sm:text-sm opacity-75">
                            {{ day.lunarPhase }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selected Date Info -->
            <div v-if="selectedDate" class="animate-scale-in bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 mb-6">
                <div class="flex flex-col sm:flex-row items-start gap-4">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span class="text-2xl sm:text-3xl font-bold">{{ selectedDate.date }}</span>
                        <span class="text-xs">{{ selectedDate.monthShort }}</span>
                    </div>
                    <div class="flex-1 min-w-0 w-full">
                        <div class="flex flex-wrap items-center gap-2 mb-1">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                {{ selectedDate.fullDate }}
                            </h3>
                            <!-- Work Day / Holiday Status Badge -->
                            <span v-if="selectedDate.isPublicHoliday"
                                class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                🔴 ថ្ងៃឈប់សម្រាកផ្លូវការ (Public Holiday)
                            </span>
                            <span v-else-if="selectedDate.isWeekend"
                                class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                                🟠 ថ្ងៃចុងសប្តាហ៍ (Weekend)
                            </span>
                            <span v-else
                                class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                🟢 ថ្ងៃធ្វើការធម្មតា (Working Day)
                            </span>
                            <span v-if="selectedDate.isHolyDay"
                                class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                ☸️ ថ្ងៃឧបោសថសីល (Holy Day)
                            </span>
                        </div>
                        <p class="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                            {{ selectedDate.khmerLunarFullDate }}
                        </p>
                        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {{ selectedDate.khmerSolarFullDate }}
                        </p>
                        <div v-if="selectedDate.holiday" 
                            class="mt-3 p-3 rounded-xl border"
                            :class="selectedDate.isPublicHoliday 
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40' 
                                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40'">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">{{ selectedDate.isPublicHoliday ? '🎉' : '🙏' }}</span>
                                <div>
                                    <p class="font-semibold" :class="selectedDate.isPublicHoliday ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'">
                                        {{ selectedDate.holiday.khmer }}
                                    </p>
                                    <p class="text-sm" :class="selectedDate.isPublicHoliday ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'">
                                        {{ selectedDate.holiday.english }}
                                    </p>
                                </div>
                            </div>
                            <p v-if="selectedDate.holiday.description" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {{ selectedDate.holiday.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Upcoming Holidays -->
            <div class="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6" style="animation-delay: 200ms">
                <div class="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <SparklesIcon class="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                        ថ្ងៃបុណ្យជាតិ និងថ្ងៃឈប់សម្រាកខាងមុខ
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Upcoming Official Holidays</span>
                    </h2>
                </div>
                <div class="divide-y divide-gray-100 dark:divide-gray-700">
                    <div v-for="(holiday, idx) in upcomingHolidays" :key="idx"
                        class="p-4 sm:p-5 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-blue-50/50 dark:hover:from-red-900/10 dark:hover:to-blue-900/10 transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                                :class="holiday.isPast ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gradient-to-br from-red-100 to-blue-100 dark:from-red-900/30 dark:to-blue-900/30'">
                                <span class="text-lg sm:text-xl font-bold" :class="holiday.isPast ? 'text-gray-400' : 'text-red-600 dark:text-red-400'">
                                    {{ holiday.day }}
                                </span>
                                <span class="text-[10px] sm:text-xs" :class="holiday.isPast ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'">
                                    {{ holiday.monthShort }}
                                </span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                    {{ holiday.khmer }}
                                </p>
                                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {{ holiday.english }} • {{ holiday.weekdayName }}
                                </p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <span v-if="holiday.daysUntil === 0" class="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                    ថ្ងៃនេះ! (Today)
                                </span>
                                <span v-else-if="holiday.daysUntil === 1" class="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                    ថ្ងៃស្អែក (Tomorrow)
                                </span>
                                <span v-else-if="holiday.daysUntil > 1" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {{ toKhmerNumeral(holiday.daysUntil) }} ថ្ងៃទៀត ({{ holiday.daysUntil }}d)
                                </span>
                                <span v-else class="text-xs text-gray-400">
                                    បានកន្លង ({{ Math.abs(holiday.daysUntil) }}d ago)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Khmer Months Reference -->
            <div class="animate-fade-in-up bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800 mb-6" style="animation-delay: 300ms">
                <h2 class="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📜</span>
                    ខែខ្មែរទាំង ១២ ខែ
                    <span class="text-sm font-normal text-amber-700 dark:text-amber-400">12 Khmer Lunar Months</span>
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    <div v-for="(month, idx) in khmerMonths" :key="idx"
                        class="p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl animate-fade-in-up hover:bg-white dark:hover:bg-gray-700/80 hover:shadow-md transition-all duration-200"
                        :style="{ animationDelay: (idx * 50) + 'ms' }">
                        <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ month.khmer }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ month.english }}</div>
                        <div class="text-[10px] text-amber-600 dark:text-amber-400 mt-1">{{ month.gregorian }}</div>
                    </div>
                </div>
            </div>

            <!-- Cultural Info -->
            <div class="animate-fade-in-up bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700" style="animation-delay: 400ms">
                <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span class="text-2xl">🏛️</span>
                    ព័ត៌មានប្រតិទិនខ្មែរ
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">📅 ព.ស. (ពុទ្ធសករាជ)</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            ប្រព័ន្ធប្រតិទិនខ្មែរប្រើពុទ្ធសករាជ ដែលរាប់ចាប់ពីថ្ងៃព្រះពុទ្ធបរិនិព្វាន និងផ្លាស់ប្តូរនៅថ្ងៃ ១រោច ខែពិសាខ (ក្រោយថ្ងៃវិសាខបូជា)។ បច្ចុប្បន្នគឺ ព.ស. {{ toKhmerNumeral(currentKhmerYear) }} ({{ currentKhmerYear }} BE)។
                        </p>
                    </div>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">🌙 ប្រតិទិនច័ន្ទគតិខ្មែរ (ឆន្ទគតិ)</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            ប្រតិទិនខ្មែរគណនាតាមដំណើរព្រះច័ន្ទ (ខ្នើត និងរនោច)។ ថ្ងៃបុណ្យជាតិសំខាន់ៗដូចជា បុណ្យវិសាខបូជា ច្រត់ព្រះនង្គ័ល ភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក ត្រូវបានកំណត់តាមប្រតិទិនច័ន្ទគតិ និងអនុក្រឹត្យរាជរដ្ឋាភិបាល។
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>ប្រតិទិនខ្មែរ • Khmer Calendar • ព.ស. {{ toKhmerNumeral(currentKhmerYear) }}</p>
            </footer>
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

export default {
    name: 'KhmerCalendar',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        CalendarIcon,
        SparklesIcon
    },
    data() {
        return {
            currentDate: new Date(),
            selectedDate: null,
            dayNames: [
                { full: 'Sunday', short: 'Sun', khmer: 'អាទិត្យ' },
                { full: 'Monday', short: 'Mon', khmer: 'ចន្ទ' },
                { full: 'Tuesday', short: 'Tue', khmer: 'អង្គារ' },
                { full: 'Wednesday', short: 'Wed', khmer: 'ពុធ' },
                { full: 'Thursday', short: 'Thu', khmer: 'ព្រហស្បតិ៍' },
                { full: 'Friday', short: 'Fri', khmer: 'សុក្រ' },
                { full: 'Saturday', short: 'Sat', khmer: 'សៅរ៍' }
            ],
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
            khmerMonths: [
                { khmer: 'ខែមិគសិរ', english: 'Mikosir', gregorian: 'Nov-Dec' },
                { khmer: 'ខែបុស្ស', english: 'Boss', gregorian: 'Dec-Jan' },
                { khmer: 'ខែមាឃ', english: 'Meakh', gregorian: 'Jan-Feb' },
                { khmer: 'ខែផល្គុន', english: 'Phalkun', gregorian: 'Feb-Mar' },
                { khmer: 'ខែចេត្រ', english: 'Chaet', gregorian: 'Mar-Apr' },
                { khmer: 'ខែពិសាខ', english: 'Visakh', gregorian: 'Apr-May' },
                { khmer: 'ខែជេស្ឋ', english: 'Chesth', gregorian: 'May-Jun' },
                { khmer: 'ខែអាសាឍ', english: 'Asath', gregorian: 'Jun-Jul' },
                { khmer: 'ខែស្រាពណ៍', english: 'Srapon', gregorian: 'Jul-Aug' },
                { khmer: 'ខែភទ្របទ', english: 'Photrobot', gregorian: 'Aug-Sep' },
                { khmer: 'ខែអស្សុជ', english: 'Asuj', gregorian: 'Sep-Oct' },
                { khmer: 'ខែកក្តិក', english: 'Katdek', gregorian: 'Oct-Nov' }
            ],
            khmerNumerals: ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'],
            holidaysCache: {}
        };
    },
    computed: {
        currentYear() {
            return this.currentDate.getFullYear();
        },
        currentMonth() {
            return this.currentDate.getMonth();
        },
        referenceLunarData() {
            const refDay = this.selectedDate ? this.selectedDate.date : 15;
            return this.calculateKhmerLunar(this.currentYear, this.currentMonth, refDay);
        },
        currentKhmerYear() {
            return this.referenceLunarData.years.BE;
        },
        currentZodiacKhmer() {
            return this.zodiacKhmerMap[this.referenceLunarData.zodiac] || '';
        },
        currentSakKhmer() {
            return this.sakKhmerList[this.referenceLunarData.sequence] || '';
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
                    isHolyDay: false,
                    lunarPhase: null,
                    lunarDay: ''
                });
            }
            
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const isToday = today.getDate() === i && 
                               today.getMonth() === month && 
                               today.getFullYear() === year;
                
                const holiday = this.getHoliday(year, month + 1, i);
                const lunarData = this.getLunarDay(year, month, i);
                
                days.push({
                    date: i,
                    isCurrentMonth: true,
                    isToday,
                    isSelected: this.selectedDate && 
                               this.selectedDate.date === i && 
                               this.selectedDate.month === month &&
                               this.selectedDate.year === year,
                    holiday,
                    isHoliday: !!holiday,
                    isPublicHoliday: !!(holiday && holiday.isPublicHoliday !== false),
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
                    isHolyDay: false,
                    lunarPhase: null,
                    lunarDay: ''
                });
            }
            
            return days;
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
                .map(h => {
                    const holidayDate = new Date(h.year, h.month - 1, h.day);
                    const timeDiff = holidayDate.getTime() - todayMidnight.getTime();
                    const daysUntil = Math.round(timeDiff / (1000 * 60 * 60 * 24));
                    
                    return {
                        ...h,
                        day: h.day,
                        monthShort: holidayDate.toLocaleString('en-US', { month: 'short' }),
                        weekdayName: `ថ្ងៃ${this.dayNames[holidayDate.getDay()].khmer}`,
                        daysUntil,
                        isPast: daysUntil < 0
                    };
                })
                .filter(h => h.daysUntil >= -5)
                .slice(0, 8);
        }
    },
    methods: {
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
                    const pPhase = l.period[1]; // 'K' or 'R'
                    const mName = l.month.name;
                    let lunarHoliday = null;

                    // 1. Meak Bochea Day (15 Keut Meakh - Traditional Buddhist observance)
                    if (mName === 'MÉAKH' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យមាឃបូជា',
                            english: 'Meak Bochea Day',
                            description: 'Important Buddhist observance day on the full moon of Meakh (15 Keut Meakh).',
                            isPublicHoliday: false
                        };
                    }
                    // 2. Visak Bochea Day (15 Keut Visakh - Official Public Holiday)
                    else if (mName === 'VĬSAKH' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យវិសាខបូជា',
                            english: 'Visak Bochea Day',
                            description: 'Official public holiday commemorating the birth, enlightenment, and Parinirvana of Lord Buddha (15 Keut Visakh).',
                            isPublicHoliday: true
                        };
                    }
                    // 3. Royal Ploughing Ceremony (4 Roach Visakh - Official Public Holiday)
                    else if (mName === 'VĬSAKH' && pPhase === 'R' && pNum === 4) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យច្រត់ព្រះនង្គ័ល',
                            english: 'Royal Ploughing Ceremony',
                            description: 'Official public holiday and ancient royal ceremony marking the traditional start of the rice-growing season (4 Roach Visakh).',
                            isPublicHoliday: true
                        };
                    }
                    // 4. Kan Ben Day 1 (1 Roach Photrobot - Traditional start of Pchum Ben season)
                    else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 1) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ថ្ងៃកាន់បិណ្ឌទី១',
                            english: 'Kan Ben (Day 1)',
                            description: 'First day of the 15-day Kan Ben / Pchum Ben religious period honoring ancestors (1 Roach Photrobot).',
                            isPublicHoliday: false
                        };
                    }
                    // 5. Pchum Ben Festival (14 Roach Photrobot, 15 Roach Photrobot, 1 Keut Asuj - 3 Official Public Holidays)
                    else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 14) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃទី១)',
                            english: 'Pchum Ben Festival (Day 1)',
                            description: 'First official public holiday of the Pchum Ben Festival honoring ancestors (14 Roach Photrobot).',
                            isPublicHoliday: true
                        };
                    }
                    else if (mName === 'PHÔTRÔBÂT' && pPhase === 'R' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃភ្ជុំធំ)',
                            english: 'Pchum Ben Day (Main Day)',
                            description: 'Main day of Pchum Ben Festival when families gather at pagodas across Cambodia (15 Roach Photrobot).',
                            isPublicHoliday: true
                        };
                    }
                    else if (mName === 'ÂSSŎCH' && pPhase === 'K' && pNum === 1) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃឆ្លង)',
                            english: 'Pchum Ben Festival (Final Day)',
                            description: 'Third and final official public holiday of the Pchum Ben Festival (1 Keut Asuj).',
                            isPublicHoliday: true
                        };
                    }
                    // 6. Water Festival / Bon Om Touk (14 Keut Katdek, 15 Keut Katdek, 1 Roach Katdek - 3 Official Public Holidays)
                    else if (mName === 'KÂTDĔK' && pPhase === 'K' && pNum === 14) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក (ថ្ងៃទី១)',
                            english: 'Water Festival (Day 1)',
                            description: 'First official day of Bon Om Touk celebrating the reversal of the Tonle Sap River (14 Keut Katdek).',
                            isPublicHoliday: true
                        };
                    }
                    else if (mName === 'KÂTDĔK' && pPhase === 'K' && pNum === 15) {
                        lunarHoliday = {
                            month: m + 1,
                            day: d,
                            khmer: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ អកអំបុក (ថ្ងៃទី២)',
                            english: 'Water Festival (Day 2 - Sampeah Preah Khae)',
                            description: 'Second official day of the Water Festival with boat races, illuminated floats, and Moon Salutation (15 Keut Katdek).',
                            isPublicHoliday: true
                        };
                    }
                    else if (mName === 'KÂTDĔK' && pPhase === 'R' && pNum === 1) {
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
                            // Merge overlapping solar & lunar holidays (e.g., May 1, 2026: Labor Day + Visak Bochea Day)
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
        // Calculate accurate lunar day for Khmer calendar
        getLunarDay(year, month, day) {
            try {
                const lunarData = this.calculateKhmerLunar(year, month, day);
                const lunarDayNumber = lunarData.period[0];
                const isWaxing = lunarData.period[1] === 'K';
                const monthLength = lunarData.monthLength;
                const monthKhmer = this.lunarMonthKhmerMap[lunarData.month.name] || '';
                const lunarDayKhmer = this.toKhmerNumeral(lunarDayNumber);

                // Determine Buddhist Holy Days (ថ្ងៃសីល) and Moon Phase
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

                // Traditional Khmer format: numeral before កើត/រោច (e.g., ១កើត, ១៥រោច)
                const baseLabel = `${lunarDayKhmer}${isWaxing ? 'កើត' : 'រោច'}`;
                const dayLabel = (isWaxing && lunarDayNumber === 1 && monthKhmer)
                    ? `${baseLabel} ${monthKhmer}`
                    : baseLabel;

                return {
                    day: dayLabel,
                    baseDay: baseLabel,
                    phase,
                    isHolyDay,
                    dayNumber: lunarDayNumber,
                    isWaxing,
                    monthKhmer,
                    zodiacKhmer: this.zodiacKhmerMap[lunarData.zodiac] || '',
                    sakKhmer: this.sakKhmerList[lunarData.sequence] || '',
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
                monthShort: date.toLocaleString('en-US', { month: 'short' }),
                fullDate: date.toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                khmerLunarFullDate: `ថ្ងៃ${weekdayKhmer} ${lunarInfo.baseDay} ខែ${lunarInfo.monthKhmer} ឆ្នាំ${lunarInfo.zodiacKhmer} ${lunarInfo.sakKhmer} ព.ស. ${this.toKhmerNumeral(lunarInfo.beYear)}`,
                khmerSolarFullDate: `ត្រូវនឹងថ្ងៃទី${this.toKhmerNumeral(day.date)} ខែ${solarMonthKhmer} ឆ្នាំ${this.toKhmerNumeral(this.currentYear)}`,
                holiday: day.holiday,
                isPublicHoliday: !!(day.holiday && day.holiday.isPublicHoliday !== false),
                isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
                isHolyDay: !!lunarInfo.isHolyDay
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
