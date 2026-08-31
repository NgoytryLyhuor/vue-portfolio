<template>
    <div class="min-h-screen py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50/20 via-transparent to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-6 mt-8 sm:mt-10">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    ប្រតិទិនខ្មែរ
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Khmer Calendar • {{ currentKhmerYear }}
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
                                {{ currentMonthName }}
                            </h2>
                            <p class="text-white/80 text-sm sm:text-base">
                                {{ khmerMonthName }} • {{ currentYear }}
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
                        :class="idx === 0 ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'">
                        <span class="hidden sm:block">{{ day.full }}</span>
                        <span class="sm:hidden">{{ day.short }}</span>
                        <div class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">{{ day.khmer }}</div>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="grid grid-cols-7">
                    <div v-for="(day, idx) in calendarDays" :key="idx"
                        class="min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] p-1 sm:p-2 border-t border-r border-gray-100 dark:border-gray-700 relative group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                        :class="[
                            idx % 7 === 6 ? 'border-r-0' : '',
                            day.isCurrentMonth ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'
                        ]"
                        @click="selectDate(day)">
                        
                        <!-- Date Number -->
                        <div class="flex justify-between items-start">
                            <span class="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all"
                                :class="[
                                    day.isToday ? 'bg-red-500 text-white shadow-lg' : '',
                                    day.isSelected ? 'ring-2 ring-blue-500' : '',
                                    !day.isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 
                                        idx % 7 === 0 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300',
                                    day.isHoliday && day.isCurrentMonth ? 'text-red-500 font-bold' : ''
                                ]">
                                {{ day.date }}
                            </span>
                            
                            <!-- Holiday Indicator -->
                            <span v-if="day.isHoliday && day.isCurrentMonth" 
                                class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        </div>
                        
                        <!-- Khmer Date -->
                        <div v-if="day.isCurrentMonth" class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {{ toKhmerNumeral(day.date) }}
                        </div>
                        
                        <!-- Lunar Day Number -->
                        <div v-if="day.lunarDay && day.isCurrentMonth" 
                            class="text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                            ថ្ងៃ{{ day.lunarDay }}
                        </div>
                        
                        <!-- Holiday Name -->
                        <div v-if="day.holiday && day.isCurrentMonth" 
                            class="mt-1 text-[8px] sm:text-[10px] lg:text-xs text-red-600 dark:text-red-400 font-medium line-clamp-2">
                            {{ day.holiday.khmer }}
                        </div>
                        
                        <!-- Lunar Phase -->
                        <div v-if="day.lunarPhase && day.isCurrentMonth" 
                            class="absolute bottom-1 right-1 text-sm sm:text-base opacity-60">
                            {{ day.lunarPhase }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selected Date Info -->
            <div v-if="selectedDate" class="animate-scale-in bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 mb-6">
                <div class="flex items-start gap-4">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500 to-blue-600 flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span class="text-2xl sm:text-3xl font-bold">{{ selectedDate.date }}</span>
                        <span class="text-xs">{{ selectedDate.monthShort }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            {{ selectedDate.fullDate }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {{ selectedDate.khmerFullDate }}
                        </p>
                        <div v-if="selectedDate.holiday" class="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <div class="flex items-center gap-2">
                                <span class="text-xl">🎉</span>
                                <div>
                                    <p class="font-semibold text-red-700 dark:text-red-300">{{ selectedDate.holiday.khmer }}</p>
                                    <p class="text-sm text-red-600 dark:text-red-400">{{ selectedDate.holiday.english }}</p>
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
                        ថ្ងៃបុណ្យជាតិខាងមុខ
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Upcoming Holidays</span>
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
                                    {{ holiday.english }}
                                </p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <span v-if="holiday.daysUntil === 0" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                    ថ្ងៃនេះ!
                                </span>
                                <span v-else-if="holiday.daysUntil > 0" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {{ holiday.daysUntil }} ថ្ងៃទៀត
                                </span>
                                <span v-else class="text-xs text-gray-400">
                                    បានកន្លង
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
                    ខែខ្មែរ ១២ ខែ
                    <span class="text-sm font-normal text-amber-700 dark:text-amber-400">12 Khmer Months</span>
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
                            ប្រព័ន្ធប្រតិទិនខ្មែរប្រើពុទ្ធសករាជ ដែលចាប់ផ្តើមពីឆ្នាំព្រះពុទ្ធបរិនិព្វាន។ ឆ្នាំ {{ currentYear }} គ្រិស្តសករាជ គឺជាឆ្នាំ {{ currentKhmerYear }} ពុទ្ធសករាជ។
                        </p>
                    </div>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">🌙 ប្រតិទិនច័ន្ទគតិ</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            ប្រតិទិនខ្មែរប្រើប្រព័ន្ធច័ន្ទគតិ កំណត់ពីដំណាក់កាលព្រះច័ន្ទ។ បុណ្យភ្ជុំបិណ្ឌ និងបុណ្យសំខាន់ៗកំណត់ដោយប្រតិទិនច័ន្ទគតិ។
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <footer class="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>ប្រតិទិនខ្មែរ • Khmer Calendar • {{ currentKhmerYear }}</p>
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
import { lunar } from 'khmercal';

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
                { full: 'Monday', short: 'Mon', khmer: 'ច័ន្ទ' },
                { full: 'Tuesday', short: 'Tue', khmer: 'អង្គារ' },
                { full: 'Wednesday', short: 'Wed', khmer: 'ពុធ' },
                { full: 'Thursday', short: 'Thu', khmer: 'ព្រហស្បតិ៍' },
                { full: 'Friday', short: 'Fri', khmer: 'សុក្រ' },
                { full: 'Saturday', short: 'Sat', khmer: 'សៅរ៍' }
            ],
            khmerMonths: [
                { khmer: 'ខែមិគសិរ', english: 'Meak', gregorian: 'Dec-Jan' },
                { khmer: 'ខែបុស្ស', english: 'Bos', gregorian: 'Jan-Feb' },
                { khmer: 'ខែមាឃ', english: 'Meak', gregorian: 'Feb-Mar' },
                { khmer: 'ខែផល្គុន', english: 'Phalkun', gregorian: 'Mar-Apr' },
                { khmer: 'ខែចេត្រ', english: 'Chaet', gregorian: 'Apr-May' },
                { khmer: 'ខែពិសាខ', english: 'Pisak', gregorian: 'May-Jun' },
                { khmer: 'ខែជេស្ឋ', english: 'Ches', gregorian: 'Jun-Jul' },
                { khmer: 'ខែអាសាឍ', english: 'Asath', gregorian: 'Jul-Aug' },
                { khmer: 'ខែស្រាពណ៍', english: 'Srap', gregorian: 'Aug-Sep' },
                { khmer: 'ខែភទ្របទ', english: 'Phutrobot', gregorian: 'Sep-Oct' },
                { khmer: 'ខែអស្សុជ', english: 'Asuj', gregorian: 'Oct-Nov' },
                { khmer: 'ខែកក្តិក', english: 'Kakdek', gregorian: 'Nov-Dec' }
            ],
            khmerNumerals: ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'],
            holidays: [
                { month: 1, day: 1, khmer: 'ទិវាចូលឆ្នាំសកល', english: 'International New Year', description: 'Celebration of the new Gregorian calendar year' },
                { month: 1, day: 7, khmer: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', english: 'Victory over Genocide Day', description: 'Commemorates the fall of the Khmer Rouge regime in 1979' },
                { month: 2, day: 14, khmer: 'ទិវាក្ដីស្រឡាញ់', english: 'Valentine\'s Day', description: 'Day of love and romance' },
                { month: 3, day: 8, khmer: 'ទិវានារីអន្តរជាតិ', english: 'International Women\'s Day', description: 'Celebrating women\'s achievements' },
                { month: 4, day: 13, khmer: 'ចូលឆ្នាំថ្មីប្រពៃណីខ្មែរ', english: 'Khmer New Year (Day 1)', description: 'Maha Sangkran - First day of Khmer New Year celebrations' },
                { month: 4, day: 14, khmer: 'ចូលឆ្នាំថ្មីប្រពៃណីខ្មែរ', english: 'Khmer New Year (Day 2)', description: 'Virak Vanabat - Second day of Khmer New Year' },
                { month: 4, day: 15, khmer: 'ចូលឆ្នាំថ្មីប្រពៃណីខ្មែរ', english: 'Khmer New Year (Day 3)', description: 'Virak Loeng Sak - Third day of Khmer New Year' },
                { month: 5, day: 1, khmer: 'ទិវាពលកម្មអន្តរជាតិ', english: 'International Labor Day', description: 'Celebrating workers worldwide' },
                { month: 5, day: 13, khmer: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', english: 'Royal Ploughing Ceremony', description: 'Traditional ceremony marking the start of rice-growing season' },
                { month: 5, day: 14, khmer: 'ទិវាវិសាខបូជា', english: 'Visak Bochea Day', description: 'Buddha\'s birth, enlightenment, and death' },
                { month: 6, day: 1, khmer: 'ទិវាកុមារអន្តរជាតិ', english: 'International Children\'s Day', description: 'Celebrating children worldwide' },
                { month: 6, day: 18, khmer: 'ថ្ងៃកំណើតព្រះមហាក្សត្រិយានី', english: 'Queen\'s Birthday', description: 'Birthday of Queen Mother Norodom Monineath' },
                { month: 9, day: 24, khmer: 'ទិវារំលឹកសព្វព្រះអង្គ', english: 'Constitution Day', description: 'Commemoration of the 1993 Constitution' },
                { month: 10, day: 1, khmer: 'បុណ្យភ្ជុំបិណ្ឌ', english: 'Pchum Ben (Day 1)', description: 'Beginning of the 15-day Ancestors\' Day celebration' },
                { month: 10, day: 14, khmer: 'បុណ្យភ្ជុំបិណ្ឌ (ថ្ងៃចូល)', english: 'Pchum Ben Day', description: 'Main day of Pchum Ben - honoring ancestors' },
                { month: 10, day: 15, khmer: 'ទិវារំលឹកព្រះមហាវីរក្សត្រ', english: 'Commemoration of King Father', description: 'Memorial day for King Norodom Sihanouk' },
                { month: 10, day: 29, khmer: 'ព្រះរាជពិធីបុណ្យគោរពព្រះវិញ្ញាណក្ខន្ធ', english: 'King Coronation Day', description: 'Coronation of King Norodom Sihamoni' },
                { month: 11, day: 9, khmer: 'ទិវាឯករាជ្យជាតិ', english: 'Independence Day', description: 'Cambodia\'s independence from France in 1953' },
                { month: 11, day: 14, khmer: 'បុណ្យអុំទូក បណ្តែតប្រទីប សំពះព្រះខែ', english: 'Water Festival (Day 1)', description: 'Bon Om Touk - Celebrating the reversing of Tonle Sap' },
                { month: 11, day: 15, khmer: 'បុណ្យអុំទូក បណ្តែតប្រទីប សំពះព្រះខែ', english: 'Water Festival (Day 2)', description: 'Boat races and festivities continue' },
                { month: 11, day: 16, khmer: 'បុណ្យអុំទូក បណ្តែតប្រទីប សំពះព្រះខែ', english: 'Water Festival (Day 3)', description: 'Final day of Water Festival celebrations' },
                { month: 12, day: 10, khmer: 'ទិវាសិទ្ធិមនុស្សអន្តរជាតិ', english: 'International Human Rights Day', description: 'Celebrating human rights worldwide' }
            ]
        };
    },
    computed: {
        currentYear() {
            return this.currentDate.getFullYear();
        },
        currentMonth() {
            return this.currentDate.getMonth();
        },
        currentKhmerYear() {
            return this.currentYear + 544;
        },
        currentMonthName() {
            return this.currentDate.toLocaleString('en-US', { month: 'long' });
        },
        khmerMonthName() {
            // Approximate Khmer month based on Gregorian month
            const monthIndex = (this.currentMonth + 1) % 12;
            return this.khmerMonths[monthIndex].khmer;
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
                    lunarPhase: null
                });
            }
            
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const isToday = today.getDate() === i && 
                               today.getMonth() === month && 
                               today.getFullYear() === year;
                
                const holiday = this.getHoliday(month + 1, i);
                const lunarData = this.getLunarDay(year, month, i);
                
                days.push({
                    date: i,
                    isCurrentMonth: true,
                    isToday,
                    isSelected: this.selectedDate && 
                               this.selectedDate.date === i && 
                               this.selectedDate.month === month,
                    holiday,
                    isHoliday: !!holiday,
                    lunarPhase: lunarData.phase,
                    lunarDay: lunarData.day
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
                    lunarPhase: null
                });
            }
            
            return days;
        },
        upcomingHolidays() {
            const today = new Date();
            const currentYear = today.getFullYear();
            
            return this.holidays
                .map(h => {
                    const holidayDate = new Date(currentYear, h.month - 1, h.day);
                    const timeDiff = holidayDate.getTime() - today.getTime();
                    const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    
                    return {
                        ...h,
                        day: h.day,
                        monthShort: new Date(currentYear, h.month - 1, 1).toLocaleString('en-US', { month: 'short' }),
                        daysUntil,
                        isPast: daysUntil < 0
                    };
                })
                .sort((a, b) => {
                    if (a.month === b.month) return a.day - b.day;
                    return a.month - b.month;
                })
                .filter(h => h.daysUntil >= -7) // Show holidays from last week
                .slice(0, 8);
        }
    },
    methods: {
        toKhmerNumeral(num) {
            return String(num).split('').map(d => this.khmerNumerals[parseInt(d)]).join('');
        },
        getHoliday(month, day) {
            return this.holidays.find(h => h.month === month && h.day === day) || null;
        },
        // Calculate accurate lunar day number for Khmer calendar using khmercal library
        getLunarDay(year, month, day) {
            const date = new Date(year, month, day);
            date.setHours(12, 0, 0, 0); // Set to noon for consistency
            
            try {
                // Use khmercal library for accurate calculation
                const lunarData = lunar(date);
                
                // lunarData.period is [dayNumber, 'K' or 'R']
                // K = កើត (waxing), R = រោច (waning)
                // lunarData.day is the actual day of the lunar month (1-29/30)
                let lunarDayNumber = lunarData.period[0];
                let isWaxing = lunarData.period[1] === 'K';
                
                // For waning phase: Khmer calendar uses 1-14 for waning
                // If period[0] is 15 and it's waning, it's actually new moon (day 1 of next cycle)
                if (!isWaxing && lunarDayNumber === 15) {
                    // This is actually the new moon of the next cycle
                    lunarDayNumber = 1;
                    isWaxing = true; // New moon starts waxing phase
                } else if (!isWaxing) {
                    // For waning, keep the day number as is (1-14)
                    // The library already calculates this correctly
                }
                
                // Format lunar day with Khmer numerals
                const lunarDayKhmer = this.toKhmerNumeral(lunarDayNumber);
                
                // Determine phase emoji
                let phase = null;
                if (lunarDayNumber === 1 && isWaxing) {
                    phase = '🌑'; // New moon
                } else if (lunarDayNumber === 8 && isWaxing) {
                    phase = '🌓'; // First quarter
                } else if (lunarDayNumber === 15 && isWaxing) {
                    phase = '🌕'; // Full moon
                } else if (lunarDayNumber === 8 && !isWaxing) {
                    phase = '🌗'; // Last quarter
                } else if (lunarDayNumber === 1 && !isWaxing) {
                    // Day after full moon (first day of waning)
                    phase = null;
                }
                
                // Khmer calendar: កើត (waxing) and រោច (waning)
                const dayLabel = isWaxing ? `កើត ${lunarDayKhmer}` : `រោច ${lunarDayKhmer}`;
                
                return {
                    day: dayLabel,
                    phase: phase,
                    dayNumber: lunarDayNumber
                };
            } catch (error) {
                console.error('Error calculating lunar day:', error);
                return {
                    day: '',
                    phase: null,
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
            this.currentDate = new Date();
            this.selectDate({
                date: new Date().getDate(),
                isCurrentMonth: true,
                holiday: this.getHoliday(new Date().getMonth() + 1, new Date().getDate())
            });
        },
        selectDate(day) {
            if (!day.isCurrentMonth) return;
            
            const date = new Date(this.currentYear, this.currentMonth, day.date);
            
            this.selectedDate = {
                date: day.date,
                month: this.currentMonth,
                monthShort: date.toLocaleString('en-US', { month: 'short' }),
                fullDate: date.toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                khmerFullDate: `ថ្ងៃ${this.dayNames[date.getDay()].khmer} ទី${this.toKhmerNumeral(day.date)} ${this.khmerMonthName} ព.ស.${this.toKhmerNumeral(this.currentKhmerYear)}`,
                holiday: day.holiday
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

