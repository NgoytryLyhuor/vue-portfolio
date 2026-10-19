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
                            {{ isKhmer ? 'ក្រសួងមហាផ្ទៃ (GDI) & ក្រសួងសាធារណការ (MPWT)' : 'CAMBODIA GDI (INTERIOR) & MPWT PUBLIC SERVICES' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {{ isKhmer ? 'តម្លៃផ្លូវការរដ្ឋ ២០២៦' : 'OFFICIAL 2026 TARIFF' }}
                        </span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">{{ isKhmer ? 'លេខទូរស័ព្ទព័ត៌មាន៖ 1271 / 1275' : 'CITIZEN HOTLINES: 1271 / 1275' }}</span>
                    </div>
                </div>

                <div class="pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                                {{ isKhmer ? 'មគ្គុទ្ទេសក៍សេវាសាធារណៈ & តម្លៃផ្លូវការ' : 'CAMBODIA CITIZEN PUBLIC SERVICES DIRECTORY' }}
                            </div>
                            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'មគ្គុទ្ទេសក៍សេវាសាធារណៈកម្ពុជា (Passport, ប័ណ្ណបើកបរ & អត្តសញ្ញាណប័ណ្ណ)' : 'Cambodia Public Services Guide: Passport, Driver License & National ID' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ការណែនាំពេញលេញអំពីតម្លៃសេវាផ្លូវការ រយៈពេលរង់ចាំ ឯកសារតម្រូវចាំបាច់ និងទីតាំងផ្តល់សេវាងាយស្រួលបំផុត (ផ្សារទំនើប អ៊ីអន ១, អ៊ីអន ២, ជីប ម៉ុង ២៧១ និងទីស្នាក់ការកណ្តាល) ដោយគ្មានការបង់ថ្លៃលើសច្បាប់។' 
                                    : 'A complete handbook on official government fees, turnaround times, required document checklists, and fastest service locations (Aeon Mall 1, Aeon Mall 2, Chip Mong 271, and GDI headquarters).' }}
                            </p>
                        </div>

                        <!-- Top Service Hotspots Box -->
                        <div class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'ទីតាំងរហ័ស ៧ ថ្ងៃ/សប្តាហ៍' : 'Weekend Public Centers' }}
                                </span>
                                <span class="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                    {{ isKhmer ? 'បើកចុងសប្តាហ៍' : 'Open 7 Days' }}
                                </span>
                            </div>
                            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
                                {{ isKhmer ? 'អ៊ីអន ១ & អ៊ីអន ២ សែនសុខ' : 'Aeon 1 & Aeon 2 Sen Sok' }}
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer 
                                    ? 'មជ្ឈមណ្ឌលផ្តល់សេវាសាធារណៈនៅផ្សារទំនើប អ៊ីអន ១ និង ២ បើកបម្រើសេវា ៧ ថ្ងៃក្នុងមួយសប្តាហ៍ (ម៉ោង ៩:០០ ព្រឹក - ៨:០០ យប់) ធ្វើភ្លាមបានភ្លាម!' 
                                    : 'Public service branches inside Aeon Mall 1 & 2 operate 7 days a week (9:00 AM – 8:00 PM), processing license renewals in 15–20 minutes.' }}
                            </p>
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

            <!-- TAB 1: PASSPORT GUIDE (លិខិតឆ្លងដែនកម្ពុជា) -->
            <div v-show="activeTab === 'passport'" class="space-y-6 sm:space-y-8">
                <!-- Tariff & Processing Speed Cards -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">📘</span>
                            <div>
                                <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                    {{ isKhmer ? 'តារាងតម្លៃផ្លូវការ និងរយៈពេលធ្វើលិខិតឆ្លងដែនកម្ពុជា' : 'Official Cambodian Passport Tariff & Turnaround Times' }}
                                </h2>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'កំណត់ដោយអគ្គនាយកដ្ឋានអត្តសញ្ញាណកម្ម (GDI) ក្រសួងមហាផ្ទៃ' : 'Regulated by General Department of Identification, Ministry of Interior' }}
                                </p>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {{ isKhmer ? 'សុពលភាព ១០ ឆ្នាំ' : '10-Year Validity' }}
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                        <!-- Option 1: Regular Service -->
                        <div class="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-5 space-y-3 hover:border-blue-500 transition-all">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'សេវាធម្មតា' : 'Regular Service' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-slate-500">
                                    {{ isKhmer ? '២០ ថ្ងៃធ្វើការ' : '20 Work Days' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                                    $100 <span class="text-xs font-normal text-slate-500">USD</span>
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ {{ isKhmer ? toKhmerNumeral(formatKhr(400000)) : formatKhr(400000) }} ៛ ({{ isKhmer ? 'មនុស្សពេញវ័យ' : 'Adults' }})
                                </div>
                                <div class="text-xs font-mono text-slate-400">
                                    កុមារ < ៥ ឆ្នាំ៖ $80 (សុពលភាព ៥ ឆ្នាំ)
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-2">
                                {{ isKhmer ? 'សន្សំសំចៃបំផុតសម្រាប់អ្នកដែលមិនប្រញាប់ចេញដំណើរទៅក្រៅប្រទេសបន្ទាន់។' : 'Most economical option when travel plans are not immediate.' }}
                            </p>
                        </div>

                        <!-- Option 2: Expedited 10 Days -->
                        <div class="border border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-5 space-y-3 hover:border-amber-500 transition-all">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                                    {{ isKhmer ? 'សេវាបន្ទាន់មធ្យម' : 'Expedited 10-Day' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                                    {{ isKhmer ? '១០ ថ្ងៃធ្វើការ' : '10 Work Days' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                                    $150 <span class="text-xs font-normal text-slate-500">USD</span>
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ {{ isKhmer ? toKhmerNumeral(formatKhr(600000)) : formatKhr(600000) }} ៛ ({{ isKhmer ? 'មនុស្សពេញវ័យ' : 'Adults' }})
                                </div>
                                <div class="text-xs font-mono text-slate-400">
                                    កុមារ < ៥ ឆ្នាំ៖ $120
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-amber-200 dark:border-amber-900/50 pt-2">
                                {{ isKhmer ? 'សមស្របសម្រាប់អ្នកដែលមានគម្រោងដើរកម្សាន្ត ឬបំពេញបេសកកម្មក្នុងពេលឆាប់ៗ។' : 'Suitable for business or holiday departures within two weeks.' }}
                            </p>
                        </div>

                        <!-- Option 3: Super Express 1 Day -->
                        <div class="border border-rose-300 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20 rounded-xl p-5 space-y-3 hover:border-rose-500 transition-all">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                                    {{ isKhmer ? 'សេវាបន្ទាន់ពិសេស' : 'Super Express 1-Day' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">
                                    {{ isKhmer ? '១ ថ្ងៃធ្វើការ' : '1 Work Day' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                                    $200 <span class="text-xs font-normal text-slate-500">USD</span>
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ {{ isKhmer ? toKhmerNumeral(formatKhr(800000)) : formatKhr(800000) }} ៛ ({{ isKhmer ? 'មនុស្សពេញវ័យ' : 'Adults' }})
                                </div>
                                <div class="text-xs font-mono text-slate-400">
                                    កុមារ < ៥ ឆ្នាំ៖ $160
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-rose-200 dark:border-rose-900/50 pt-2">
                                {{ isKhmer ? 'សម្រាប់ករណីបន្ទាន់បំផុត៖ ទៅព្យាបាលជំងឺនៅក្រៅប្រទេស ឬចេញដំណើរភ្លាមៗ។' : 'Crucial for medical emergencies or urgent diplomatic/business travel.' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Required Documents Checklist for Passport -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Adult Requirements -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">🧑</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                                {{ isKhmer ? 'ឯកសារសម្រាប់មនុស្សពេញវ័យ (អាយុចាប់ពី ១៨ ឆ្នាំ)' : 'Required Documents: Adults (18+)' }}
                            </h3>
                        </div>

                        <ul class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើម' : 'Original Cambodian National ID Card' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ត្រូវមានសុពលភាព មិនទាន់ផុតកំណត់ និងមិនបាក់បែក។' : 'Must be valid and undamaged.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សៀវភៅស្នាក់នៅ (ក២) ឬសៀវភៅគ្រួសារ (ក៤)' : 'Residence (K2) or Family (K4) Book' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ច្បាប់ដើម ឬច្បាប់ថតចម្លងមានការបញ្ជាក់ត្រឹមត្រូវពីសាលាសង្កាត់។' : 'Original or certified copy from commune hall.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'លិខិតឆ្លងដែនចាស់ (ករណីធ្វើថ្មីជំនួសចាស់)' : 'Old Passport (if renewing)' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'យកទៅដើម្បីឱ្យមន្ត្រីកាត់ជ្រុងលុបចោល។' : 'Required for invalidation/clipping.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 font-bold">ℹ️</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'រូបថត៖ ថតផ្ទាល់នៅកន្លែងធ្វើ (មិនបាច់យកទៅទេ)' : 'Photos: Taken directly at center' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ស្លៀកពាក់អាវមានក សុភាពរាបសារ (មិនពាក់អាវវាលក្លៀក)។' : 'Wear formal collared shirts; no tank tops.' }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- Under 18 Requirements -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">🧒</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                                {{ isKhmer ? 'ឯកសារសម្រាប់កុមារ (អាយុក្រោម ១៨ ឆ្នាំ)' : 'Required Documents: Minors (< 18)' }}
                            </h3>
                        </div>

                        <ul class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សំបុត្រកំណើតច្បាប់ដើម' : 'Original Birth Certificate' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'សំបុត្រកំណើត ឬសំបុត្របញ្ជាក់កំណើតច្បាប់ដើម។' : 'Original civil birth certificate.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សៀវភៅស្នាក់នៅ ឬសៀវភៅគ្រួសាររបស់ឪពុកម្តាយ' : 'Parent’s Family / Residence Book' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ដែលកុមារមានឈ្មោះក្នុងសៀវភៅនោះ។' : 'Showing the child listed as family member.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'អត្តសញ្ញាណប័ណ្ណរបស់ឪពុក ឬម្តាយ' : 'Parent’s Original National ID Card' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ឪពុក ឬម្តាយត្រូវមកជាមួយកុមារដោយផ្ទាល់។' : 'Parent must physically accompany child.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 font-bold">ℹ️</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'លិខិតយល់ព្រមពីឪពុកម្តាយ' : 'Parental Consent Form' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'បំពេញ និងផ្តិតមេដៃនៅនឹងកន្លែងផ្តល់សេវា។' : 'Signed/thumbprinted at the service window.' }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Passport Service Locations List -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <span class="text-xl">📍</span>
                        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                            {{ isKhmer ? 'ទីតាំងផ្តល់សេវាលិខិតឆ្លងដែនផ្លូវការ' : 'Official Passport Issuance Centers' }}
                        </h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="loc in passportLocations" :key="loc.name"
                            class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between">
                                <span>{{ isKhmer ? loc.nameKhmer : loc.nameEn }}</span>
                                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">{{ loc.city }}</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? loc.addressKhmer : loc.addressEn }}
                            </p>
                            <div class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                                🕒 {{ isKhmer ? loc.hoursKhmer : loc.hoursEn }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 2: DRIVER'S LICENSE GUIDE (ប័ណ្ណបើកបរយានយន្ត) -->
            <div v-show="activeTab === 'license'" class="space-y-6 sm:space-y-8">
                <!-- Tariff & Fast Renewal Cards -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">🪪</span>
                            <div>
                                <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                    {{ isKhmer ? 'តម្លៃសេវា និងនីតិវិធីប្តូរ / ពន្យារប័ណ្ណបើកបរ (MPWT)' : 'Driver License Renewal Fees & Fast Processing' }}
                                </h2>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'សេវាផ្ទាល់រហ័សទាន់ចិត្តនៅផ្សារទំនើប អ៊ីអន ១, អ៊ីអន ២ និង ជីប ម៉ុង ២៧១' : 'Instant walk-in service at Aeon Mall 1, Aeon Mall 2, and Chip Mong 271' }}
                                </p>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            {{ isKhmer ? 'ធ្វើភ្លាមបានភ្លាម (~១៥ នាទី)' : '15-Minute Service' }}
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                        <!-- License Renewal -->
                        <div class="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-5 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ប្តូរ / ពន្យារប័ណ្ណបើកបរ' : 'License Renewal' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                    {{ isKhmer ? '១៥-២០ នាទី' : '15-20 Mins' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(40000)) : formatKhr(40000) }} ៛
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ $10.00 USD ({{ isKhmer ? 'សេវារដ្ឋ ៣០,០០០៛ + ពិនិត្យសុខភាព ១០,០០០៛' : '30k fee + 10k health check' }})
                                </div>
                                <div class="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                                    {{ isKhmer ? 'សុពលភាព ១០ ឆ្នាំពេញ' : '10-Year Full Validity' }}
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-2">
                                {{ isKhmer ? 'សម្រាប់ប័ណ្ណប្រភេទ «ខ» (ឡានទេសចរណ៍)។ អាចពន្យារមុនថ្ងៃផុតកំណត់រហូតដល់ ៣ ខែ។' : 'For Type B passenger car licenses. Eligible for renewal up to 3 months prior to expiry.' }}
                            </p>
                        </div>

                        <!-- New Exam -->
                        <div class="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-5 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ប្រឡងយកប័ណ្ណថ្មី' : 'New License Exam' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-slate-500">
                                    {{ isKhmer ? 'ប្រឡងទ្រឹស្តី & បើកបរ' : 'Theory & Practical' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(100000)) : formatKhr(100000) }} ៛
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ $25.00 USD ({{ isKhmer ? 'សេវាប្រឡង ៩០,០០០៛ + សុខភាព ១០,០០០៛' : '90k exam + 10k health check' }})
                                </div>
                                <div class="text-xs font-mono text-slate-400">
                                    ម៉ូតូធំ (> 125cc ប្រភេទ ក)៖ ៥០,០០០ ៛ (~$12.50)
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-2">
                                {{ isKhmer ? 'ប្រឡងវិញ្ញាសាទ្រឹស្តីកុំព្យូទ័រ និងការបើកបរជាក់ស្តែងលើទីលានក្រសួងសាធារណការ។' : 'Computer theory quiz followed by closed-circuit driving exam.' }}
                            </p>
                        </div>

                        <!-- Foreign License Conversion -->
                        <div class="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-5 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ប្តូរប័ណ្ណបរទេស ទៅខ្មែរ' : 'Foreign License Conversion' }}
                                </span>
                                <span class="text-xs font-mono font-bold text-slate-500">
                                    {{ isKhmer ? 'សុពលភាព ១ ឆ្នាំ' : '1-Year Validity' }}
                                </span>
                            </div>

                            <div class="space-y-1">
                                <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                                    {{ isKhmer ? toKhmerNumeral(formatKhr(40000)) : formatKhr(40000) }} ៛
                                </div>
                                <div class="text-xs font-mono text-slate-500">
                                    ≈ $10.00 USD ({{ isKhmer ? 'សម្រាប់ជនបរទេសមានទិដ្ឋាការស្របច្បាប់' : 'For expats with valid visa' }})
                                </div>
                                <div class="text-xs font-mono text-slate-400">
                                    តម្រូវឱ្យមានលិខិតបកប្រែប័ណ្ណបើកបរ
                                </div>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-2">
                                {{ isKhmer ? 'អាចប្តូរបានភ្លាមៗដោយមិនបាច់ប្រឡងឡើងវិញ សម្រាប់ប័ណ្ណបើកបរអន្តរជាតិដែលនៅមានសុពលភាព។' : 'Direct conversion without exam for holders of certified valid foreign licenses.' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Mall Centers & MPWT Branches -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                    <div class="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <span class="text-xl">🏬</span>
                        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                            {{ isKhmer ? 'មជ្ឈមណ្ឌលផ្តល់សេវាប័ណ្ណបើកបរក្នុងផ្សារទំនើប (បើក ៧ ថ្ងៃ/សប្តាហ៍)' : 'Mall Service Centers (Open 7 Days a Week, 9 AM – 8 PM)' }}
                        </h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="mall in licenseCenters" :key="mall.nameKhmer"
                            class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                            <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between">
                                <span>{{ isKhmer ? mall.nameKhmer : mall.nameEn }}</span>
                                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                                    {{ mall.floor }}
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? mall.addressKhmer : mall.addressEn }}
                            </p>
                            <div class="text-[11px] font-mono text-blue-600 dark:text-blue-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                                ⚡ {{ isKhmer ? mall.highlightKhmer : mall.highlightEn }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 3: NATIONAL ID CARD (អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ) -->
            <div v-show="activeTab === 'idcard'" class="space-y-6 sm:space-y-8">
                <!-- Zero Cost Notice -->
                <div class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">🎉</span>
                        <div>
                            <h3 class="text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200">
                                {{ isKhmer ? 'សេវាឥតគិតថ្លៃ ១០០% (FREE ០ រៀល)' : '100% Free of Charge (0 KHR)' }}
                            </h3>
                            <p class="text-xs text-emerald-700 dark:text-emerald-300">
                                {{ isKhmer 
                                    ? 'រាជរដ្ឋាភិបាលកម្ពុជាមិនយកប្រាក់កម្រៃសេវាក្នុងការធ្វើអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរឡើយ។ បើមានការទារប្រាក់ សូមរាយការណ៍ទៅលេខ 1271!' 
                                    : 'The Royal Government of Cambodia charges ZERO fee for the National ID Card. Report any fee solicitation to hotline 1271.' }}
                            </p>
                        </div>
                    </div>
                    <div class="shrink-0 text-right">
                        <span class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase bg-emerald-600 text-white">
                            {{ isKhmer ? 'តម្លៃផ្លូវការ៖ ០ ៛' : 'Official Fee: $0' }}
                        </span>
                    </div>
                </div>

                <!-- Guidelines & Steps -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">📋</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                                {{ isKhmer ? 'លក្ខខណ្ឌ និងឯកសារតម្រូវ' : 'Eligibility & Required Documents' }}
                            </h3>
                        </div>

                        <ul class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'អាយុចាប់ពី ១៥ ឆ្នាំឡើងទៅ' : 'Age 15 Years or Older' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ជាកាតព្វកិច្ចរបស់ពលរដ្ឋគ្រប់រូបត្រូវមានអត្តសញ្ញាណប័ណ្ណ។' : 'Statutory obligation for all Cambodian citizens.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សំបុត្រកំណើតច្បាប់ដើម' : 'Original Birth Certificate' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ឬសំបុត្របញ្ជាក់កំណើតដែលចេញដោយអាជ្ញាធរមានសមត្ថកិច្ច។' : 'Official civil registry birth document.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សៀវភៅស្នាក់នៅ (ក២) ឬសៀវភៅគ្រួសារ (ក៤)' : 'Family (K4) or Residence (K2) Book' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ច្បាប់ដើមដែលបញ្ជាក់ពីទីលំនៅអចិន្ត្រៃយ៍។' : 'Proof of registered permanent address.' }}</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500 font-bold">✓</span>
                                <div>
                                    <strong class="text-slate-900 dark:text-white">{{ isKhmer ? 'សុពលភាព ១០ ឆ្នាំ' : '10-Year Validity' }}</strong>
                                    <p class="text-[11px] text-slate-500">{{ isKhmer ? 'ត្រូវពន្យារ ឬធ្វើថ្មីមុនថ្ងៃផុតកំណត់។' : 'Renew before expiration date on front.' }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm space-y-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">📍</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase">
                                {{ isKhmer ? 'កន្លែងដែលត្រូវទៅធ្វើ' : 'Where to Apply' }}
                            </h3>
                        </div>

                        <ul class="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                            <li class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <strong class="text-slate-900 dark:text-white block">{{ isKhmer ? '១. ប៉ុស្តិ៍នគរបាលរដ្ឋបាលឃុំ-សង្កាត់' : '1. Local Commune Police Post' }}</strong>
                                <span class="text-[11px] text-slate-500">{{ isKhmer ? 'នៅសង្កាត់ដែលអ្នកមានឈ្មោះក្នុងសៀវភៅគ្រួសារ (ចន្ទ-សុក្រ ម៉ោងរដ្ឋបាល)។' : 'At the commune/sangkat of your registered residence.' }}</span>
                            </li>
                            <li class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <strong class="text-slate-900 dark:text-white block">{{ isKhmer ? '២. អធិការដ្ឋាននគរបាលក្រុង-ស្រុក-ខណ្ឌ' : '2. Municipal/District Police Inspectorate' }}</strong>
                                <span class="text-[11px] text-slate-500">{{ isKhmer ? 'ការិយាល័យអត្តសញ្ញាណកម្មប្រចាំខណ្ឌ ឬស្រុករបស់អ្នក។' : 'District identification office.' }}</span>
                            </li>
                            <li class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <strong class="text-slate-900 dark:text-white block">{{ isKhmer ? '៣. ផ្សារទំនើប អ៊ីអន ២ សែនសុខ' : '3. Aeon Mall Sen Sok City (Level 2)' }}</strong>
                                <span class="text-[11px] text-slate-500">{{ isKhmer ? 'មជ្ឈមណ្ឌលសេវាសាធារណៈជាន់ទី ២ (បើក ៧ ថ្ងៃ/សប្តាហ៍ ម៉ោង ៩:០០ ព្រឹក - ៨:០០ យប់)។' : 'Level 2 public center, open 7 days a week including weekends.' }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- TAB 4: INTERACTIVE SERVICE COST & TURNAROUND CALCULATOR -->
            <div v-show="activeTab === 'calc'" class="space-y-6 sm:space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    
                    <!-- Left Column: Service Selector -->
                    <div class="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="text-2xl">🧮</span>
                                <span>{{ isKhmer ? 'ម៉ាស៊ីនគណនាតម្លៃសេវា & រយៈពេលរង់ចាំ' : 'Service Fee & Processing Days Calculator' }}</span>
                            </h2>
                            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ជ្រើសរើសប្រភេទសេវាដែលអ្នកចង់ធ្វើ ដើម្បីដឹងតម្លៃផ្លូវការ រយៈពេលបាន និងឯកសារត្រូវយកទៅ' : 'Select your desired government service to view exact fee breakdown, processing days, and document prep.' }}
                            </p>
                        </div>

                        <!-- Service Category Pills -->
                        <div class="space-y-2">
                            <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? '១. ជ្រើសរើសសេវាសាធារណៈ' : '1. Select Public Service' }}
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <button v-for="cat in serviceCategories" :key="cat.id"
                                    @click="selectedServiceCat = cat.id; onServiceCatChange()"
                                    class="p-3 text-left border rounded-xl transition-all flex items-center gap-3"
                                    :class="selectedServiceCat === cat.id
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'">
                                    <span class="text-2xl">{{ cat.icon }}</span>
                                    <div>
                                        <div class="text-xs font-bold">{{ isKhmer ? cat.nameKhmer : cat.nameEn }}</div>
                                        <div class="text-[11px] text-slate-400">{{ cat.agency }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Sub-Option Selector -->
                        <div class="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <label class="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? '២. ជ្រើសរើសល្បឿនសេវា ឬប្រភេទប័ណ្ណ' : '2. Select Service Tier / Speed' }}
                            </label>
                            <div class="space-y-2">
                                <button v-for="sub in currentSubOptions" :key="sub.id"
                                    @click="selectedSubOptionId = sub.id"
                                    class="w-full p-3 text-left border rounded-xl transition-all flex items-center justify-between"
                                    :class="selectedSubOptionId === sub.id
                                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'">
                                    <div>
                                        <div class="text-xs font-bold">{{ isKhmer ? sub.nameKhmer : sub.nameEn }}</div>
                                        <div class="text-[11px] text-slate-500 dark:text-slate-400">{{ isKhmer ? sub.descKhmer : sub.descEn }}</div>
                                    </div>
                                    <div class="text-right shrink-0 ml-3">
                                        <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                            {{ sub.priceUsd > 0 ? '$' + sub.priceUsd + ' USD' : (isKhmer ? 'ឥតគិតថ្លៃ (០៛)' : 'FREE ($0)') }}
                                        </div>
                                        <div class="text-[10px] font-mono text-slate-400">
                                            {{ isKhmer ? sub.timeKhmer : sub.timeEn }}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Fast Checklist -->
                        <div class="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                            <div class="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                {{ isKhmer ? '៣. ផ្ទៀងផ្ទាត់ឯកសារមុនចេញដំណើរ (Checklist)' : '3. Document Preparation Checklist' }}
                            </div>
                            <div class="space-y-1.5">
                                <label v-for="(item, idx) in activeChecklist" :key="idx"
                                    class="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer text-xs">
                                    <input type="checkbox" class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700" />
                                    <span class="text-slate-800 dark:text-slate-200">{{ isKhmer ? item.khmer : item.en }}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Calculation Summary Sticky Card -->
                    <div class="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                        <div class="border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl space-y-5">
                            <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                    <div class="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                                        {{ isKhmer ? 'សង្ខេបតម្លៃសេវារដ្ឋ' : 'GOVERNMENT TARIFF' }}
                                    </div>
                                    <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                                        {{ isKhmer ? currentSelectedData.nameKhmer : currentSelectedData.nameEn }}
                                    </h3>
                                </div>
                                <span class="text-3xl">{{ currentSelectedCategoryIcon }}</span>
                            </div>

                            <!-- Big Output -->
                            <div class="space-y-1">
                                <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'តម្លៃសេវាផ្លូវការ៖' : 'Official Statutory Fee:' }}
                                </div>
                                <div class="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
                                    {{ currentSelectedData.priceUsd > 0 ? '$' + currentSelectedData.priceUsd + ' USD' : (isKhmer ? '០ រៀល (ឥតគិតថ្លៃ)' : 'FREE ($0)') }}
                                </div>
                                <div class="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
                                    ≈ {{ isKhmer ? toKhmerNumeral(formatKhr(currentSelectedData.priceKhr)) : formatKhr(currentSelectedData.priceKhr) }} ៛
                                </div>
                            </div>

                            <!-- Breakdown Specs -->
                            <div class="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'រយៈពេលរង់ចាំ៖' : 'Processing Time:' }}</span>
                                    <span class="font-bold text-emerald-600 dark:text-emerald-400">
                                        {{ isKhmer ? currentSelectedData.timeKhmer : currentSelectedData.timeEn }}
                                    </span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'សុពលភាព៖' : 'Validity:' }}</span>
                                    <span class="font-bold text-slate-800 dark:text-slate-200">
                                        {{ isKhmer ? currentSelectedData.validityKhmer : currentSelectedData.validityEn }}
                                    </span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'ស្ថាប័នចេញប័ណ្ណ៖' : 'Issuing Authority:' }}</span>
                                    <span class="font-bold text-slate-800 dark:text-slate-200">
                                        {{ currentSelectedData.agency }}
                                    </span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-slate-500">{{ isKhmer ? 'ទីតាំងងាយស្រួលបំផុត៖' : 'Recommended Venue:' }}</span>
                                    <span class="font-bold text-blue-600 dark:text-blue-400 text-right max-w-[180px] truncate">
                                        {{ isKhmer ? currentSelectedData.recommendedLocKhmer : currentSelectedData.recommendedLocEn }}
                                    </span>
                                </div>
                            </div>

                            <!-- Anti-Corruption Advice -->
                            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                                    🛡️ {{ isKhmer ? 'ការពារសិទ្ធិ និងជៀសវាងចំណាយលើស៖' : 'Citizen Rights & Anti-Graft:' }}
                                </div>
                                <p>
                                    {{ isKhmer 
                                        ? 'សូមទាមទារបង្កាន់ដៃបង់ប្រាក់ផ្លូវការគ្រប់ពេល។ ប្រសិនបើមានជនណាទារប្រាក់ក្រៅផ្លូវការ សូមទូរស័ព្ទទៅអង្គភាពប្រឆាំងអំពើពុករលួយ (ACU) 023 226 888។' 
                                        : 'Always insist on official treasury receipts. Report unauthorized fees to the Anti-Corruption Unit (ACU) 023 226 888.' }}
                                </p>
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
const activeTab = ref('passport');

const tabs = [
    { id: 'passport', icon: '📘', labelKhmer: 'លិខិតឆ្លងដែន (Passport)', labelEn: 'Passport Guide' },
    { id: 'license', icon: '🪪', labelKhmer: 'ប័ណ្ណបើកបរ (Driver License)', labelEn: 'Driver License' },
    { id: 'idcard', icon: '🆔', labelKhmer: 'អត្តសញ្ញាណប័ណ្ណ (National ID)', labelEn: 'National ID Card' },
    { id: 'calc', icon: '🧮', labelKhmer: 'ម៉ាស៊ីនគណនាតម្លៃសេវា', labelEn: 'Fee & Days Calculator' }
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

// Passport Locations
const passportLocations = [
    {
        nameKhmer: 'ទីស្នាក់ការកណ្តាល ច្បារអំពៅ',
        nameEn: 'GDI Chbar Ampov Headquarters',
        city: 'Phnom Penh',
        addressKhmer: 'ភូមិតាងៅ សង្កាត់និរោធ ខណ្ឌច្បារអំពៅ (ផ្លូវជាតិលេខ ១)',
        addressEn: 'Ta Ngov Village, Sangkat Niroth, Khan Chbar Ampov (NR1)',
        hoursKhmer: 'ចន្ទ - សុក្រ (ម៉ោង ៧:៣០ ព្រឹក - ៥:០០ ល្ងាច)',
        hoursEn: 'Mon – Fri (7:30 AM – 5:00 PM)'
    },
    {
        nameKhmer: 'ផ្សារទំនើប អ៊ីអន ២ សែនសុខ',
        nameEn: 'Aeon Mall Sen Sok City (Level 2)',
        city: 'Phnom Penh',
        addressKhmer: 'ជាន់ទី ២ ផ្សារទំនើប អ៊ីអន ២ ខណ្ឌសែនសុខ',
        addressEn: 'Level 2, Aeon Mall Sen Sok City, Khan Sen Sok',
        hoursKhmer: 'ចន្ទ - អាទិត្យ (ម៉ោង ៩:០០ ព្រឹក - ៨:០០ យប់ គ្មានថ្ងៃឈប់)',
        hoursEn: 'Mon – Sun (9:00 AM – 8:00 PM Open 7 Days)'
    },
    {
        nameKhmer: 'ផ្សារទំនើប ហេរីថេក វ៉ក សៀមរាប',
        nameEn: 'The Heritage Walk, Siem Reap',
        city: 'Siem Reap',
        addressKhmer: 'ផ្លូវជាតិលេខ ៦ ក្រុងសៀមរាប ខេត្តសៀមរាប',
        addressEn: 'National Road 6, Krong Siem Reap',
        hoursKhmer: 'ចន្ទ - សុក្រ (ម៉ោង ៨:០០ ព្រឹក - ៥:០០ ល្ងាច)',
        hoursEn: 'Mon – Fri (8:00 AM – 5:00 PM)'
    }
];

// Driver License Mall Centers
const licenseCenters = [
    {
        nameKhmer: 'ផ្សារទំនើប អ៊ីអន ម៉ល ១ (ភ្នំពេញ)',
        nameEn: 'Aeon Mall Phnom Penh (Aeon 1)',
        floor: 'Level 2',
        addressKhmer: 'ជាន់ទី ២ ក្បែររោងកុន Major Cineplex ផ្លូវសម្តេចហ៊ុនសែន',
        addressEn: 'Level 2 beside Major Cineplex, Samdech Hun Sen Blvd',
        highlightKhmer: 'ប្តូរ និងពន្យារប័ណ្ណបើកបរភ្លាមៗក្នុងរយៈពេល ១៥-២០ នាទី',
        highlightEn: 'Express walk-in renewals completed in 15–20 minutes'
    },
    {
        nameKhmer: 'ផ្សារទំនើប អ៊ីអន ២ សែនសុខ',
        nameEn: 'Aeon Mall Sen Sok City (Aeon 2)',
        floor: 'Level 2',
        addressKhmer: 'ជាន់ទី ២ ផ្នែកមជ្ឈមណ្ឌលសេវាសាធារណៈ ខណ្ឌសែនសុខ',
        addressEn: 'Level 2 Public Service Center, Khan Sen Sok',
        highlightKhmer: 'មានទាំងសេវាប័ណ្ណបើកបរ លិខិតឆ្លងដែន និងអត្តសញ្ញាណប័ណ្ណ',
        highlightEn: 'Combined hub for licenses, passports, and ID cards'
    },
    {
        nameKhmer: 'ផ្សារទំនើប ជីប ម៉ុង ២៧១ មេហ្គាម៉ល',
        nameEn: 'Chip Mong 271 Mega Mall',
        floor: 'Level 3',
        addressKhmer: 'ជាន់ទី ៣ ផ្សារទំនើប ជីប ម៉ុង ផ្លូវ ២៧១ ខណ្ឌមានជ័យ',
        addressEn: 'Level 3, Chip Mong 271 Mega Mall, Street 271',
        highlightKhmer: 'ទីតាំងធំទូលាយ ចំណតឡានស្រួល និងសេវាកម្មរហ័សទាន់ចិត្ត',
        highlightEn: 'Spacious branch with ample parking and quick turnaround'
    }
];

// Interactive Calculator State
const selectedServiceCat = ref('passport');
const selectedSubOptionId = ref('pass_reg');

const serviceCategories = [
    { id: 'passport', icon: '📘', nameKhmer: 'លិខិតឆ្លងដែន', nameEn: 'Passport', agency: 'ក្រសួងមហាផ្ទៃ (GDI)' },
    { id: 'license', icon: '🪪', nameKhmer: 'ប័ណ្ណបើកបរ', nameEn: 'Driver License', agency: 'ក្រសួងសាធារណការ (MPWT)' },
    { id: 'idcard', icon: '🆔', nameKhmer: 'អត្តសញ្ញាណប័ណ្ណ', nameEn: 'National ID', agency: 'ក្រសួងមហាផ្ទៃ (GDI)' }
];

const serviceOptionsCatalog = {
    passport: [
        {
            id: 'pass_reg',
            nameKhmer: 'លិខិតឆ្លងដែនសេវាធម្មតា (មនុស្សពេញវ័យ)',
            nameEn: 'Regular Passport (Adult 18+)',
            descKhmer: 'រយៈពេល ២០ ថ្ងៃធ្វើការ សុពលភាព ១០ ឆ្នាំពេញ',
            descEn: '20 working days turnaround, 10-year validity',
            priceUsd: 100,
            priceKhr: 400000,
            timeKhmer: '២០ ថ្ងៃធ្វើការ',
            timeEn: '20 working days',
            validityKhmer: '១០ ឆ្នាំ',
            validityEn: '10 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'អ៊ីអន ២ សែនសុខ ឬ ច្បារអំពៅ',
            recommendedLocEn: 'Aeon 2 Sen Sok or Chbar Ampov',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើមមានសុពលភាព', en: 'Original valid Cambodian National ID' },
                { khmer: 'សៀវភៅស្នាក់នៅ (ក២) ឬសៀវភៅគ្រួសារ (ក៤) ច្បាប់ដើម', en: 'Original Residence or Family Book' },
                { khmer: 'លិខិតឆ្លងដែនចាស់ (ប្រសិនបើជាករណីធ្វើថ្មីជំនួសចាស់)', en: 'Old Passport (if renewing)' },
                { khmer: 'ថវិកា ១០០ ដុល្លារ (សេវារដ្ឋផ្លូវការ)', en: '$100 USD exact fee' }
            ]
        },
        {
            id: 'pass_exp10',
            nameKhmer: 'លិខិតឆ្លងដែនបន្ទាន់មធ្យម (១០ ថ្ងៃ)',
            nameEn: 'Expedited 10-Day Passport (Adult)',
            descKhmer: 'រយៈពេល ១០ ថ្ងៃធ្វើការ សុពលភាព ១០ ឆ្នាំពេញ',
            descEn: '10 working days turnaround, 10-year validity',
            priceUsd: 150,
            priceKhr: 600000,
            timeKhmer: '១០ ថ្ងៃធ្វើការ',
            timeEn: '10 working days',
            validityKhmer: '១០ ឆ្នាំ',
            validityEn: '10 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'ទីស្នាក់ការកណ្តាល ច្បារអំពៅ',
            recommendedLocEn: 'GDI Chbar Ampov HQ',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើមមានសុពលភាព', en: 'Original valid Cambodian National ID' },
                { khmer: 'សៀវភៅស្នាក់នៅ ឬសៀវភៅគ្រួសារច្បាប់ដើម', en: 'Original Residence or Family Book' },
                { khmer: 'ថវិកា ១៥០ ដុល្លារ', en: '$150 USD fee' }
            ]
        },
        {
            id: 'pass_exp1',
            nameKhmer: 'លិខិតឆ្លងដែនបន្ទាន់ពិសេស (១ ថ្ងៃ)',
            nameEn: 'Super Express 1-Day Passport (Adult)',
            descKhmer: 'រយៈពេល ១ ថ្ងៃធ្វើការ (ទទួលនៅព្រឹកស្អែក)',
            descEn: '1 working day (collect next morning)',
            priceUsd: 200,
            priceKhr: 800000,
            timeKhmer: '១ ថ្ងៃធ្វើការ',
            timeEn: '1 working day',
            validityKhmer: '១០ ឆ្នាំ',
            validityEn: '10 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'ទីស្នាក់ការកណ្តាល ច្បារអំពៅ',
            recommendedLocEn: 'GDI Chbar Ampov HQ',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើមមានសុពលភាព', en: 'Original valid Cambodian National ID' },
                { khmer: 'សៀវភៅស្នាក់នៅ ឬសៀវភៅគ្រួសារច្បាប់ដើម', en: 'Original Residence or Family Book' },
                { khmer: 'ថវិកា ២០០ ដុល្លារ', en: '$200 USD fee' }
            ]
        },
        {
            id: 'pass_child',
            nameKhmer: 'លិខិតឆ្លងដែនកុមារ (អាយុក្រោម ៥ ឆ្នាំ)',
            nameEn: 'Child Passport (< 5 Years Old)',
            descKhmer: 'រយៈពេល ២០ ថ្ងៃធ្វើការ សុពលភាព ៥ ឆ្នាំ',
            descEn: '20 working days turnaround, 5-year validity',
            priceUsd: 80,
            priceKhr: 320000,
            timeKhmer: '២០ ថ្ងៃធ្វើការ',
            timeEn: '20 working days',
            validityKhmer: '៥ ឆ្នាំ',
            validityEn: '5 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'អ៊ីអន ២ សែនសុខ ឬ ច្បារអំពៅ',
            recommendedLocEn: 'Aeon 2 Sen Sok or Chbar Ampov',
            checklist: [
                { khmer: 'សំបុត្រកំណើតច្បាប់ដើមរបស់កុមារ', en: 'Original Birth Certificate of child' },
                { khmer: 'សៀវភៅគ្រួសារ ឬសៀវភៅស្នាក់នៅរបស់ឪពុកម្តាយ', en: 'Parent Family or Residence Book' },
                { khmer: 'អត្តសញ្ញាណប័ណ្ណរបស់ឪពុក ឬម្តាយ', en: 'Parent Original National ID' },
                { khmer: 'វត្តមានកុមារ និងឪពុកម្តាយដោយផ្ទាល់', en: 'Physical presence of child and parent' }
            ]
        }
    ],
    license: [
        {
            id: 'lic_renew',
            nameKhmer: 'ប្តូរ / ពន្យារប័ណ្ណបើកបររថយន្ត (ប្រភេទ ខ)',
            nameEn: 'Driver License Renewal (Type B - Car)',
            descKhmer: 'ធ្វើភ្លាមបានភ្លាមនៅផ្សារទំនើប អ៊ីអន ១, អ៊ីអន ២ ឬ ជីប ម៉ុង',
            descEn: 'Instant walk-in renewal at Aeon 1, Aeon 2, or Chip Mong',
            priceUsd: 10,
            priceKhr: 40000,
            timeKhmer: '១៥ ទៅ ២០ នាទី',
            timeEn: '15 to 20 minutes',
            validityKhmer: '១០ ឆ្នាំពេញ',
            validityEn: '10 years',
            agency: 'MPWT ក្រសួងសាធារណការ',
            recommendedLocKhmer: 'អ៊ីអន ១, អ៊ីអន ២ ឬ ជីប ម៉ុង ២៧១',
            recommendedLocEn: 'Aeon 1, Aeon 2, or Chip Mong 271',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើមមានសុពលភាព', en: 'Original valid Cambodian National ID' },
                { khmer: 'ប័ណ្ណបើកបរចាស់ដែលត្រូវពន្យារ', en: 'Old Driver License to be renewed' },
                { khmer: 'ពិនិត្យសុខភាពភ្នែក/កាយសម្បទានៅនឹងកន្លែង (១០,០០០ ៛)', en: 'On-site medical checkup (10,000 KHR)' },
                { khmer: 'ប្រាក់សរុប ៤០,០០០ រៀល (~$10)', en: 'Total fee 40,000 KHR (~$10)' }
            ]
        },
        {
            id: 'lic_exam_car',
            nameKhmer: 'ប្រឡងយកប័ណ្ណបើកបររថយន្តថ្មី (ប្រភេទ ខ)',
            nameEn: 'New Car Driver License Exam (Type B)',
            descKhmer: 'ប្រឡងវិញ្ញាសាទ្រឹស្តីកុំព្យូទ័រ និងការបើកបរជាក់ស្តែង',
            descEn: 'Theory computer test and practical driving exam',
            priceUsd: 25,
            priceKhr: 100000,
            timeKhmer: 'តាមកាលវិភាគប្រឡង',
            timeEn: 'Per scheduled exam date',
            validityKhmer: '១០ ឆ្នាំពេញ',
            validityEn: '10 years',
            agency: 'MPWT ក្រសួងសាធារណការ',
            recommendedLocKhmer: 'មន្ទីរសាធារណការ ឬមណ្ឌលប្រឡងក្រសួង',
            recommendedLocEn: 'MPWT Official Driving Exam Centers',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើម', en: 'Original valid Cambodian National ID' },
                { khmer: 'សៀវភៅគ្រួសារ ឬសៀវភៅស្នាក់នៅ', en: 'Family or Residence Book' },
                { khmer: 'លិខិតបញ្ជាក់សុខភាពកាយសម្បទា', en: 'Certified medical health certificate' },
                { khmer: 'រូបថត 4x6 ផ្ទៃខាងក្រោយពណ៌ស ចំនួន ៣ សន្លឹក', en: '3 white background 4x6 photos' }
            ]
        },
        {
            id: 'lic_exam_moto',
            nameKhmer: 'ប្រឡងយកប័ណ្ណម៉ូតូធំ (> 125cc ប្រភេទ ក)',
            nameEn: 'Motorcycle License Exam (> 125cc Type A)',
            descKhmer: 'សម្រាប់ម៉ូតូកម្លាំងលើសពី ១២៥cc ឡើងទៅ',
            descEn: 'Required for motorcycles with displacement over 125cc',
            priceUsd: 12.5,
            priceKhr: 50000,
            timeKhmer: 'តាមកាលវិភាគប្រឡង',
            timeEn: 'Per scheduled exam date',
            validityKhmer: '១០ ឆ្នាំ',
            validityEn: '10 years',
            agency: 'MPWT ក្រសួងសាធារណការ',
            recommendedLocKhmer: 'មន្ទីរសាធារណការរាជធានី-ខេត្ត',
            recommendedLocEn: 'MPWT Provincial Departments',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ (CNID) ច្បាប់ដើម', en: 'Original valid Cambodian National ID' },
                { khmer: 'លិខិតបញ្ជាក់កាយសម្បទា', en: 'Health and vision check' },
                { khmer: 'ប្រាក់សេវា ៥០,០០០ រៀល', en: '50,000 KHR fee' }
            ]
        }
    ],
    idcard: [
        {
            id: 'id_new',
            nameKhmer: 'ធ្វើអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរថ្មី (អាយុ ១៥ ឆ្នាំឡើង)',
            nameEn: 'New National ID Card (Age 15+)',
            descKhmer: 'សេវាឥតគិតថ្លៃ ១០០% ពីរាជរដ្ឋាភិបាល (FREE ០៛)',
            descEn: '100% Free of charge from the Royal Government ($0)',
            priceUsd: 0,
            priceKhr: 0,
            timeKhmer: '៣០ ទៅ ៤៥ ថ្ងៃ',
            timeEn: '30 to 45 days',
            validityKhmer: '១០ ឆ្នាំពេញ',
            validityEn: '10 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'ប៉ុស្តិ៍នគរបាលរដ្ឋបាលឃុំ-សង្កាត់ ឬ អ៊ីអន ២',
            recommendedLocEn: 'Commune Police Post or Aeon 2',
            checklist: [
                { khmer: 'សំបុត្រកំណើត ឬសំបុត្របញ្ជាក់កំណើតច្បាប់ដើម', en: 'Original civil birth certificate' },
                { khmer: 'សៀវភៅគ្រួសារ (ក៤) ឬសៀវភៅស្នាក់នៅ (ក២) ច្បាប់ដើម', en: 'Original Family (K4) or Residence (K2) book' },
                { khmer: 'អាយុគ្រប់ ១៥ ឆ្នាំឡើងទៅ', en: 'Must be 15 years old or above' },
                { khmer: 'ឥតគិតថ្លៃ (ហាមបង់ប្រាក់)', en: 'Zero fee (Do not pay any cash)' }
            ]
        },
        {
            id: 'id_renew',
            nameKhmer: 'ពន្យារ ឬប្តូរអត្តសញ្ញាណប័ណ្ណផុតកំណត់/ខូច',
            nameEn: 'National ID Card Renewal / Replacement',
            descKhmer: 'សេវាឥតគិតថ្លៃ (FREE ០៛)',
            descEn: 'Free of charge ($0)',
            priceUsd: 0,
            priceKhr: 0,
            timeKhmer: '៣០ ទៅ ៤៥ ថ្ងៃ',
            timeEn: '30 to 45 days',
            validityKhmer: '១០ ឆ្នាំពេញ',
            validityEn: '10 years',
            agency: 'GDI ក្រសួងមហាផ្ទៃ',
            recommendedLocKhmer: 'ប៉ុស្តិ៍នគរបាលសង្កាត់ ឬ អ៊ីអន ២ សែនសុខ',
            recommendedLocEn: 'Commune Police Post or Aeon 2 Sen Sok',
            checklist: [
                { khmer: 'អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរចាស់', en: 'Old expired or damaged National ID' },
                { khmer: 'សៀវភៅស្នាក់នៅ ឬសៀវភៅគ្រួសារច្បាប់ដើម', en: 'Original Family or Residence book' },
                { khmer: 'សំបុត្រកំណើតច្បាប់ដើម', en: 'Original Birth certificate' }
            ]
        }
    ]
};

const currentSubOptions = computed(() => {
    return serviceOptionsCatalog[selectedServiceCat.value] || [];
});

const onServiceCatChange = () => {
    const list = currentSubOptions.value;
    if (list.length > 0) {
        selectedSubOptionId.value = list[0].id;
    }
};

const currentSelectedData = computed(() => {
    const list = currentSubOptions.value;
    const found = list.find(item => item.id === selectedSubOptionId.value);
    return found || list[0] || {};
});

const currentSelectedCategoryIcon = computed(() => {
    const cat = serviceCategories.find(c => c.id === selectedServiceCat.value);
    return cat ? cat.icon : '📋';
});

const activeChecklist = computed(() => {
    return currentSelectedData.value.checklist || [];
});
</script>
