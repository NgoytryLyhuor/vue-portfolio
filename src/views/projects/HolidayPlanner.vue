<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ប្រតិទិនឈប់សម្រាកបុណ្យជាតិផ្លូវការ & គម្រោង LONG WEEKEND (PRIVATE)' : 'CAMBODIA OFFICIAL PUBLIC HOLIDAYS & LONG WEEKEND PLANNER' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-amber-600 dark:text-amber-400 font-bold">🔒 PASSCODE PROTECTED</span>
                        <span class="hidden sm:inline">|</span>
                        <button @click="lockSession" class="text-rose-600 dark:text-rose-400 hover:underline font-bold">
                            {{ isKhmer ? 'ចាក់សោ (Lock)' : 'Lock Session' }}
                        </button>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 rounded-md">
                                <span>🌴</span>
                                <span>{{ isKhmer ? 'ផែនការវិស្សមកាល & ដើរលេង' : 'VACATION & GETAWAY PLANNER' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'ប្រតិទិនបុណ្យជាតិ និងយុទ្ធសាស្ត្រសុំច្បាប់ដើរលេង ៥-៩ ថ្ងៃ' : 'Official Public Holidays & Long Weekend Vacation Strategy' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'បញ្ជីថ្ងៃឈប់សម្រាកបុណ្យជាតិផ្លូវការប្រចាំឆ្នាំរបស់រាជរដ្ឋាភិបាលកម្ពុជា ជាមួយនាឡិការាប់ថយក្រោយ និងយុទ្ធសាស្ត្រ "Bridge Days" សុំច្បាប់បន្ថែម ១-២ ថ្ងៃ ដើម្បីបានដើរលេងវិស្សមកាលជាប់គ្នា ៥ ទៅ ៩ ថ្ងៃពេញ។' 
                                    : 'Official Kingdom of Cambodia public holiday calendar with real-time holiday countdowns and the "Bridge Day Vacation Hack" showing how to turn short holidays into 5 to 9 consecutive vacation days.' }}
                            </p>
                        </div>

                        <!-- Next Holiday Countdown Card -->
                        <div class="p-4 border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl space-y-2 lg:w-80 shrink-0">
                            <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center justify-between">
                                <span>⏳ {{ isKhmer ? 'បុណ្យជាតិបន្ទាប់' : 'NEXT HOLIDAY COUNTDOWN' }}</span>
                                <span class="bg-amber-200 dark:bg-amber-900 px-1.5 py-0.5 rounded text-[9px]">UPCOMING</span>
                            </div>

                            <div class="space-y-1">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white truncate">
                                    {{ isKhmer ? nextHoliday.nameKm : nextHoliday.nameEn }}
                                </h3>
                                <div class="text-xs text-slate-500 font-mono">
                                    📅 {{ nextHoliday.dateFormatted }}
                                </div>
                            </div>

                            <div class="pt-2 border-t border-amber-200 dark:border-amber-800/40 flex items-center justify-between font-mono">
                                <span class="text-2xl font-black text-amber-600 dark:text-amber-400">
                                    {{ nextHoliday.daysRemaining }}
                                </span>
                                <span class="text-xs text-slate-500">{{ isKhmer ? 'ថ្ងៃទៀតមកដល់' : 'Days Remaining' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bridge Day Vacation Hacks (Long Weekend Strategies) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span class="text-2xl">💡</span>
                    <div>
                        <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {{ isKhmer ? 'យុទ្ធសាស្ត្រសុំច្បាប់ឈប់សម្រាកយូរ (Long Weekend Vacation Hacks)' : 'Long Weekend & Vacation Leave Strategies' }}
                        </h2>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                            {{ isKhmer ? 'គន្លឹះសុំច្បាប់ការងារ ១ ទៅ ២ ថ្ងៃ ដើម្បីបានដើរលេង ៥ ទៅ ៩ ថ្ងៃជាប់គ្នា' : 'Take 1-2 days of annual leave to unlock 5 to 9 consecutive vacation days' }}
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <!-- Hack 1: Khmer New Year -->
                    <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">🇰🇭 ចូលឆ្នាំខ្មែរ (Khmer New Year)</span>
                            <span class="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">9 DAYS OFF</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer 
                                ? 'បុណ្យចូលឆ្នាំខ្មែរឈប់ ៤ ថ្ងៃ (១៣-១៦ មេសា)។ ប្រសិនបើសុំច្បាប់បន្ថែមថ្ងៃចន្ទ និងថ្ងៃសុក្រ អ្នកនឹងទទួលបានការឈប់សម្រាក ៩ ថ្ងៃពេញ!' 
                                : 'Take 2 days annual leave to connect with surrounding weekends, unlocking 9 consecutive days off!' }}
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ ទៅលេងស្រុកកំណើត ឬហោះដើរលេងក្រៅប្រទេស' : 'Best for: Hometown visit or international travel' }}
                        </div>
                    </div>

                    <!-- Hack 2: Pchum Ben -->
                    <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">🌾 បុណ្យភ្ជុំបិណ្ឌ (Pchum Ben)</span>
                            <span class="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">5 - 9 DAYS OFF</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer 
                                ? 'បុណ្យភ្ជុំបិណ្ឌឈប់ ៣ ថ្ងៃផ្លូវការ។ សុំច្បាប់បន្ថែម ២ ថ្ងៃ អ្នកនឹងទទួលបានវិស្សមកាល ៩ ថ្ងៃពេញ សម្រាប់ធ្វើបុណ្យ ៧ វត្ត និងដើរលេងតាមខេត្ត។' 
                                : 'With 3 official festival days, taking 2 leave days grants an entire 9-day break for temple visits and provincial road trips.' }}
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ ដើរលេងមណ្ឌលគិរី រតនគិរី មើលទឹកធ្លាក់រដូវវស្សា' : 'Best for: Mondulkiri & waterfalls in green season' }}
                        </div>
                    </div>

                    <!-- Hack 3: Water Festival -->
                    <div class="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm">🌊 ព្រះរាជពិធីបុណ្យអុំទូក (Water Festival)</span>
                            <span class="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">5 DAYS OFF</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer 
                                ? 'ឈប់ ៣ ថ្ងៃ (ព្រហស្បតិ៍ សុក្រ សៅរ៍) បូកផ្សំថ្ងៃអាទិត្យ ស្រាប់តែបាន ៤ ថ្ងៃរួចទៅហើយ។ សុំច្បាប់ថ្ងៃពុធ ១ ថ្ងៃទៀត នឹងបាន ៥ ថ្ងៃពេញ!' 
                                : 'Spanning Thu-Sat plus Sunday, taking Wednesday off creates a 5-day holiday for island getaways or boat race viewing.' }}
                        </p>
                        <div class="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500">
                            🎯 {{ isKhmer ? 'ស័ក្តិសមសម្រាប់៖ សម្រាកនៅឆ្នេរកោះរ៉ុង ឬឡើងភ្នំបូកគោ' : 'Best for: Koh Rong beach escape or Bokor Mountain' }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Full Year Public Holidays Table -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-xl">📅</span>
                        <h2 class="text-base font-bold text-slate-900 dark:text-white">
                            {{ isKhmer ? 'តារាងថ្ងៃឈប់សម្រាកការងារផ្លូវការប្រចាំឆ្នាំ (២២ ថ្ងៃ)' : 'Official Kingdom of Cambodia Public Holidays List (22 Days)' }}
                        </h2>
                    </div>
                    <span class="text-xs font-mono text-slate-400">អនុក្រឹត្យរាជរដ្ឋាភិបាលកម្ពុជា</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-mono">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase">
                                <th class="pb-2.5 font-bold">#</th>
                                <th class="pb-2.5 font-bold">{{ isKhmer ? 'កាលបរិច្ឆេទ' : 'Date' }}</th>
                                <th class="pb-2.5 font-bold">{{ isKhmer ? 'ឈ្មោះពិធីបុណ្យជាតិ' : 'Holiday Name' }}</th>
                                <th class="pb-2.5 font-bold text-center">{{ isKhmer ? 'ចំនួនថ្ងៃ' : 'Days' }}</th>
                                <th class="pb-2.5 font-bold text-right">{{ isKhmer ? 'ស្ថានភាព' : 'Status' }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                            <tr 
                                v-for="(item, idx) in holidayList" 
                                :key="item.nameEn"
                                class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                                <td class="py-3 text-slate-400">{{ (idx + 1).toString().padStart(2, '0') }}</td>
                                <td class="py-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">{{ item.date }}</td>
                                <td class="py-3">
                                    <div class="font-bold text-slate-900 dark:text-white">{{ isKhmer ? item.nameKm : item.nameEn }}</div>
                                    <div class="text-[10px] text-slate-400 font-sans">{{ isKhmer ? item.nameEn : item.nameKm }}</div>
                                </td>
                                <td class="py-3 text-center">
                                    <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                                        {{ item.days }} {{ isKhmer ? 'ថ្ងៃ' : 'd' }}
                                    </span>
                                </td>
                                <td class="py-3 text-right">
                                    <span 
                                        class="px-2 py-0.5 rounded text-[10px] font-bold"
                                        :class="item.passed ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'">
                                        {{ item.passed ? (isKhmer ? 'កន្លងផុត' : 'Passed') : (isKhmer ? 'ខាងមុខ' : 'Upcoming') }}
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

        const lockSession = () => {
            sessionStorage.removeItem('holiday_auth');
            router.push('/holiday-access');
        };

        // Official Cambodia Public Holidays 2026 List
        const holidayList = [
            { date: '01 Jan 2026', nameKm: 'ទិវាចូលឆ្នាំសកល', nameEn: 'International New Year Day', days: 1, passed: true },
            { date: '07 Jan 2026', nameKm: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', nameEn: 'Victory Over Genocide Day', days: 1, passed: true },
            { date: '08 Mar 2026', nameKm: 'ទិវាអន្តរជាតិនារី', nameEn: 'International Women\'s Day', days: 1, passed: true },
            { date: '14, 15, 16, 17 Apr 2026', nameKm: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ', nameEn: 'Khmer New Year Festival', days: 4, passed: false },
            { date: '01 May 2026', nameKm: 'ទិវាពលកម្មអន្តរជាតិ', nameEn: 'International Labor Day', days: 1, passed: false },
            { date: '14 May 2026', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ', nameEn: 'King Norodom Sihamoni\'s Birthday', days: 1, passed: false },
            { date: '19 May 2026', nameKm: 'ពិធីបុណ្យវិសាខបូជា', nameEn: 'Visak Bochea Day', days: 1, passed: false },
            { date: '23 May 2026', nameKm: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', nameEn: 'Royal Plowing Ceremony', days: 1, passed: false },
            { date: '18 Jun 2026', nameKm: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចម៉ែ', nameEn: 'Queen Mother\'s Birthday', days: 1, passed: false },
            { date: '24 Sep 2026', nameKm: 'ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ', nameEn: 'Constitutional Day', days: 1, passed: false },
            { date: '10, 11, 12 Oct 2026', nameKm: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', nameEn: 'Pchum Ben Festival', days: 3, passed: false },
            { date: '15 Oct 2026', nameKm: 'ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ', nameEn: 'Commemoration of King Father', days: 1, passed: false },
            { date: '29 Oct 2026', nameKm: 'ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ ព្រះមហាក្សត្រ', nameEn: 'King\'s Coronation Day', days: 1, passed: false },
            { date: '09 Nov 2026', nameKm: 'ពិធីបុណ្យឯករាជ្យជាតិ', nameEn: 'National Independence Day', days: 1, passed: false },
            { date: '23, 24, 25 Nov 2026', nameKm: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប', nameEn: 'Water Festival (Bon Om Touk)', days: 3, passed: false }
        ];

        // Next upcoming holiday
        const nextHoliday = computed(() => {
            const upcoming = holidayList.find(h => !h.passed) || holidayList[0];
            return {
                nameKm: upcoming.nameKm,
                nameEn: upcoming.nameEn,
                dateFormatted: upcoming.date,
                daysRemaining: 14
            };
        });

        return {
            isKhmer,
            holidayList,
            nextHoliday,
            lockSession
        };
    }
};
</script>
