<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                        <span class="font-bold text-rose-600 dark:text-rose-400">
                            {{ isKhmer ? 'បណ្តាញមន្ទីរពេទ្យសង្គ្រោះបន្ទាន់ ២៥ រាជធានី-ខេត្តទូទាំងកម្ពុជា' : 'CAMBODIA 25 PROVINCES 24/7 EMERGENCY HOSPITAL DIRECTORY' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-rose-600 dark:text-rose-400 font-bold">SAMU 119 // TRAUMA CENTERS</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">AMBULANCE & NSSF HOSPITALS</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 rounded-md">
                                <span>🏥</span>
                                <span>{{ isKhmer ? 'សង្គ្រោះបន្ទាន់ពេលមានគ្រោះថ្នាក់' : 'ACCIDENT & TRAUMA DIRECTORY' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'បញ្ជីមន្ទីរពេទ្យសង្គ្រោះបន្ទាន់ & ឡានពេទ្យ ២៥ ខេត្ត-ក្រុង' : 'Cambodia 25 Provinces Emergency Hospitals & Ambulance Directory' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ស្វែងរកមន្ទីរពេទ្យបង្អែកជាតិ ខេត្ត-ក្រុង មន្ទីរពេទ្យកុមារ ធនាគារឈាម និងលេខទូរស័ព្ទហៅឡានពេទ្យសង្គ្រោះបន្ទាន់ ២៤/៧ ពេលជួបគ្រោះថ្នាក់ចរាចរណ៍ ឬករណីសង្គ្រោះជីវិតបន្ទាន់ ជាមួយប៊ូតុងចុចតេភ្លាមៗ និងទីតាំង Google Maps។' 
                                    : 'Quickly find 24/7 emergency referral hospitals, ambulance hotlines, pediatric trauma centers, and blood banks across all 25 Cambodian provinces for road accidents and critical medical emergencies.' }}
                            </p>
                        </div>

                        <!-- Top 1-Tap Critical Emergency Bar -->
                        <div class="p-4 border-2 border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center justify-between">
                                <span>🚨 {{ isKhmer ? 'ទូរស័ព្ទសង្គ្រោះបន្ទាន់ជាតិនានា' : 'NATIONAL AMBULANCE HOTLINE' }}</span>
                                <span class="text-[10px] bg-rose-200 dark:bg-rose-900 px-1.5 py-0.5 rounded">FREE 24/7</span>
                            </div>
                            
                            <a 
                                href="tel:119"
                                class="w-full flex items-center justify-between px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all active:scale-95 group">
                                <div class="flex items-center gap-2.5">
                                    <span class="text-2xl animate-bounce">🚑</span>
                                    <div>
                                        <div class="text-xs font-medium">{{ isKhmer ? 'ឡានពេទ្យសង្គ្រោះបន្ទាន់ SAMU' : 'National Ambulance (SAMU)' }}</div>
                                        <div class="text-2xl font-black font-mono tracking-wider">119</div>
                                    </div>
                                </div>
                                <span class="text-xs font-mono font-bold bg-white/20 px-2.5 py-1 rounded-lg group-hover:bg-white group-hover:text-rose-600 transition-colors">
                                    {{ isKhmer ? 'ចុចតេ' : 'CALL' }}
                                </span>
                            </a>

                            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                                <a 
                                    href="tel:023426948"
                                    class="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 rounded-lg text-center block transition-colors">
                                    <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'កាល់ម៉ែតបន្ទាន់' : 'Calmette 24/7' }}</div>
                                    <div class="font-bold text-slate-900 dark:text-white">023 426 948</div>
                                </a>
                                <a 
                                    href="tel:023722724"
                                    class="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 rounded-lg text-center block transition-colors">
                                    <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'គន្ធបុប្ផា (កុមារ)' : 'Kantha Bopha' }}</div>
                                    <div class="font-bold text-slate-900 dark:text-white">023 722 724</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- First-Aid Accident Protocol Card (Foldable) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                <div class="flex items-center justify-between cursor-pointer" @click="showFirstAid = !showFirstAid">
                    <div class="flex items-center gap-2.5">
                        <span class="text-xl">🩹</span>
                        <div>
                            <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ជំហានសង្គ្រោះបឋមពេលជួបគ្រោះថ្នាក់ចរាចរណ៍ (Road Accident First-Aid Protocol)' : 'Essential Road Accident First-Aid Protocol' }}
                            </h2>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'អ្វីដែលត្រូវធ្វើ និងអ្វីដែលមិនគួរធ្វើ ដើម្បីជួយសង្គ្រោះជនរងគ្រោះ' : 'Crucial do\'s and don\'ts before medical help arrives' }}
                            </p>
                        </div>
                    </div>
                    <button class="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 hover:underline">
                        {{ showFirstAid ? (isKhmer ? 'លាក់' : 'Hide') : (isKhmer ? 'បង្ហាញ' : 'Show') }}
                    </button>
                </div>

                <div v-show="showFirstAid" class="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs">
                    <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div class="font-bold text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1.5">
                            <span>1.</span>
                            <span>{{ isKhmer ? 'សុវត្ថិភាពកន្លែងកើតហេតុ' : 'Scene Safety' }}</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer ? 'ដាក់សញ្ញាព្រមាន ឬបើកភ្លើង Hazard ដើម្បីកុំឱ្យមានគ្រោះថ្នាក់ផ្ទួន។ មិនត្រូវឈរប្រមូលផ្តុំកណ្តាលផ្លូវឡើយ។' : 'Put hazard lights on or place road warning signs to prevent secondary collisions.' }}
                        </p>
                    </div>

                    <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div class="font-bold text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1.5">
                            <span>2.</span>
                            <span>{{ isKhmer ? 'ទូរស័ព្ទហៅ ១១៩ ជាបន្ទាន់' : 'Call 119 Immediately' }}</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer ? 'ផ្តល់ព័ត៌មានច្បាស់លាស់៖ ទីតាំងពិតប្រាកដ ចំនួនជនរងគ្រោះ និងស្ថានភាពរបួសធ្ងន់ស្រាល។' : 'Tell the dispatcher exact location, landmarks, number of victims, and visible injuries.' }}
                        </p>
                    </div>

                    <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div class="font-bold text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1.5">
                            <span>3.</span>
                            <span>{{ isKhmer ? 'កុំផ្លាស់ប្តូរក ឬឆ្អឹងខ្នង' : 'Do NOT Move Neck/Spine' }}</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer ? 'ហាមដាច់ខាតមិនឱ្យលើក ឬប្តូរទីតាំងកជនរងគ្រោះឡើយ ព្រោះអាចបណ្តាលឱ្យពិការ ឬគ្រោះថ្នាក់ដល់ជីវិត លើកលែងតែកន្លែងនោះមានភ្លើងឆេះ។' : 'Never twist or bend the victim’s spine or neck unless in imminent fire or explosion danger.' }}
                        </p>
                    </div>

                    <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div class="font-bold text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1.5">
                            <span>4.</span>
                            <span>{{ isKhmer ? 'សង្កត់ទប់ឈាមហូរខ្លាំង' : 'Control Heavy Bleeding' }}</span>
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {{ isKhmer ? 'ប្រើក្រណាត់ស្អាត ឬបង់រុំសង្កត់ផ្ទាល់លើមុខរបួសឱ្យជាប់ ដើម្បីទប់ការបាត់បង់ឈាមរហូតដល់គ្រូពេទ្យមកដល់។' : 'Apply firm, continuous direct pressure with a clean cloth over bleeding wounds.' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Search, Province Filter & Category Selectors -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <!-- Search Input -->
                    <div class="relative w-full sm:max-w-md">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            🔍
                        </span>
                        <input 
                            v-model="searchQuery"
                            type="text"
                            :placeholder="isKhmer ? 'ស្វែងរកឈ្មោះមន្ទីរពេទ្យ ខេត្ត-ក្រុង ឬលេខទូរស័ព្ទ...' : 'Search hospital by name, province, phone or service...'"
                            class="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-sans"
                        />
                        <button 
                            v-if="searchQuery" 
                            @click="searchQuery = ''"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600">
                            ✕
                        </button>
                    </div>

                    <!-- Type Filter -->
                    <div class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 text-xs">
                        <button 
                            @click="selectedCategory = 'ALL'"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap"
                            :class="selectedCategory === 'ALL' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? 'ទាំងអស់' : 'All Types' }}
                        </button>
                        <button 
                            @click="selectedCategory = 'REFERRAL'"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap"
                            :class="selectedCategory === 'REFERRAL' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? '🏥 ពេទ្យរដ្ឋ & បង្អែក' : 'Public Referral' }}
                        </button>
                        <button 
                            @click="selectedCategory = 'PEDIATRIC'"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap"
                            :class="selectedCategory === 'PEDIATRIC' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? '👶 ពេទ្យកុមារ' : 'Pediatric' }}
                        </button>
                        <button 
                            @click="selectedCategory = 'NSSF'"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap"
                            :class="selectedCategory === 'NSSF' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? '🛡️ ប.ស.ស (NSSF)' : 'NSSF Accepted' }}
                        </button>
                    </div>
                </div>

                <!-- 25 Provinces Filter Scrollable Pills -->
                <div class="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {{ isKhmer ? 'ជ្រើសរើសតាម ២៥ រាជធានី-ខេត្ត' : 'Filter by Province / City' }} ({{ filteredHospitals.length }} {{ isKhmer ? 'មន្ទីរពេទ្យ' : 'Hospitals' }})
                    </div>
                    <div class="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                        <button 
                            @click="selectedProvince = 'ALL'"
                            class="px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap shrink-0"
                            :class="selectedProvince === 'ALL' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? 'ទូទាំងប្រទេស (២៥ ខេត្ត)' : 'All 25 Provinces' }}
                        </button>
                        <button 
                            v-for="prov in provinceList" 
                            :key="prov.code"
                            @click="selectedProvince = prov.code"
                            class="px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap shrink-0"
                            :class="selectedProvince === prov.code ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? prov.nameKm : prov.nameEn }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Hospital Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                    v-for="hospital in filteredHospitals" 
                    :key="hospital.id"
                    class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-rose-400 dark:hover:border-rose-600 transition-all flex flex-col justify-between space-y-4 group">
                    
                    <div>
                        <!-- Header Badges -->
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <span class="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border" :class="getTypeBadge(hospital.type)">
                                {{ isKhmer ? hospital.typeKm : hospital.typeEn }}
                            </span>

                            <div class="flex items-center gap-1 shrink-0">
                                <span v-if="hospital.hasNssf" class="text-[9px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800" title="Accepted NSSF">
                                    ប.ស.ស / NSSF
                                </span>
                                <span class="text-[9px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                    24/7
                                </span>
                            </div>
                        </div>

                        <!-- Hospital Name -->
                        <div class="space-y-1">
                            <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                {{ isKhmer ? hospital.nameKm : hospital.nameEn }}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? hospital.nameEn : hospital.nameKm }}
                            </p>
                        </div>

                        <!-- Location & Details -->
                        <div class="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <div class="flex items-start gap-1.5">
                                <span class="shrink-0 text-slate-400">📍</span>
                                <span class="text-[11px] leading-relaxed">
                                    {{ isKhmer ? hospital.addressKm : hospital.addressEn }} ({{ isKhmer ? hospital.provinceKm : hospital.provinceEn }})
                                </span>
                            </div>

                            <div class="flex flex-wrap gap-1 pt-1">
                                <span 
                                    v-for="service in hospital.services" 
                                    :key="service"
                                    class="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">
                                    {{ service }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Action Buttons: Emergency Call + Google Map Link -->
                    <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        <!-- Primary Emergency Call Button -->
                        <a 
                            :href="'tel:' + hospital.emergencyPhone.replace(/[\s\-/]/g, '')"
                            class="w-full flex items-center justify-between px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-xs active:scale-98">
                            <div class="flex items-center gap-2">
                                <span>📞</span>
                                <span>{{ hospital.emergencyPhone }}</span>
                            </div>
                            <span class="text-[11px] bg-white/20 px-2 py-0.5 rounded">
                                {{ isKhmer ? 'ចុចហៅបន្ទាន់' : 'CALL NOW' }}
                            </span>
                        </a>

                        <div class="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                            <span v-if="hospital.altPhone" class="text-[11px] font-mono truncate max-w-[170px]" :title="hospital.altPhone">
                                ☎️ {{ hospital.altPhone }}
                            </span>
                            <span v-else class="text-[11px] font-mono text-slate-400">
                                🚨 24/7 ER Team
                            </span>

                            <a 
                                :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hospital.nameEn + ' ' + hospital.provinceEn + ' Cambodia')"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]">
                                <span>🗺️ {{ isKhmer ? 'ផែនទី Maps' : 'View Map' }}</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredHospitals.length === 0" class="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
                <p class="text-3xl mb-2">🏥</p>
                <p class="font-bold text-slate-700 dark:text-slate-200 text-sm">
                    {{ isKhmer ? 'រកមិនឃើញមន្ទីរពេទ្យដែលត្រូវនឹងការស្វែងរកទេ' : 'No hospital matched your search filter' }}
                </p>
                <p class="text-xs text-slate-500 mt-1">
                    {{ isKhmer ? 'សូមសាកល្បងជ្រើសរើស "ទូទាំងប្រទេស (២៥ ខេត្ត)" ឬវាយឈ្មោះខេត្តផ្សេងទៀត។' : 'Try switching back to "All 25 Provinces" or search a different keyword.' }}
                </p>
            </div>

            <!-- National Blood Bank & Donor Helpline -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">🩸</span>
                            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {{ isKhmer ? 'មជ្ឈមណ្ឌលជាតិផ្តល់ឈាម (National Blood Transfusion Center)' : 'National Blood Transfusion Center Cambodia' }}
                            </h3>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                            {{ isKhmer 
                                ? 'ពេលមានករណីគ្រោះថ្នាក់បាត់បង់ឈាមច្រើន ឬត្រូវការឈាមសង្គ្រោះបន្ទាន់ (A, B, AB, O, Rh-Negative) សូមទាក់ទងមជ្ឈមណ្ឌលជាតិផ្តល់ឈាមភ្លាមៗ។' 
                                : 'For emergency surgical blood transfusions, emergency blood requests, or blood donation helplines in Cambodia.' }}
                        </p>
                    </div>

                    <div class="flex flex-wrap items-center gap-2.5">
                        <a 
                            href="tel:023215949"
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold transition-colors shadow-xs">
                            📞 023 215 949
                        </a>
                        <a 
                            href="tel:092998000"
                            class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-mono font-bold transition-colors">
                            📞 092 998 000
                        </a>
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
    name: 'CambodiaHospitals',
    setup() {
        const { isKhmer } = useLanguage();

        const searchQuery = ref('');
        const selectedProvince = ref('ALL');
        const selectedCategory = ref('ALL');
        const showFirstAid = ref(true);

        // 25 Provinces list
        const provinceList = [
            { code: 'PP', nameKm: 'រាជធានីភ្នំពេញ', nameEn: 'Phnom Penh' },
            { code: 'SR', nameKm: 'សៀមរាប', nameEn: 'Siem Reap' },
            { code: 'BB', nameKm: 'បាត់ដំបង', nameEn: 'Battambang' },
            { code: 'SH', nameKm: 'ព្រះសីហនុ', nameEn: 'Sihanoukville' },
            { code: 'KC', nameKm: 'កំពង់ចាម', nameEn: 'Kampong Cham' },
            { code: 'KD', nameKm: 'កណ្តាល', nameEn: 'Kandal' },
            { code: 'KP', nameKm: 'កំពត', nameEn: 'Kampot' },
            { code: 'KS', nameKm: 'កំពង់ស្ពឺ', nameEn: 'Kampong Speu' },
            { code: 'KCH', nameKm: 'កំពង់ឆ្នាំង', nameEn: 'Kampong Chhnang' },
            { code: 'KT', nameKm: 'កំពង់ធំ', nameEn: 'Kampong Thom' },
            { code: 'TK', nameKm: 'តាកែវ', nameEn: 'Takeo' },
            { code: 'PV', nameKm: 'ព្រៃវែង', nameEn: 'Prey Veng' },
            { code: 'SVR', nameKm: 'ស្វាយរៀង', nameEn: 'Svay Rieng' },
            { code: 'BM', nameKm: 'បន្ទាយមានជ័យ', nameEn: 'Banteay Meanchey' },
            { code: 'PS', nameKm: 'ពោធិ៍សាត់', nameEn: 'Pursat' },
            { code: 'KR', nameKm: 'ក្រចេះ', nameEn: 'Kratie' },
            { code: 'KK', nameKm: 'កោះកុង', nameEn: 'Koh Kong' },
            { code: 'ST', nameKm: 'ស្ទឹងត្រែង', nameEn: 'Stung Treng' },
            { code: 'MK', nameKm: 'មណ្ឌលគិរី', nameEn: 'Mondulkiri' },
            { code: 'RK', nameKm: 'រតនគិរី', nameEn: 'Ratanakiri' },
            { code: 'PVH', nameKm: 'ព្រះវិហារ', nameEn: 'Preah Vihear' },
            { code: 'OMC', nameKm: 'ឧត្តរមានជ័យ', nameEn: 'Otdar Meanchey' },
            { code: 'KEP', nameKm: 'កែប', nameEn: 'Kep' },
            { code: 'PL', nameKm: 'ប៉ៃលិន', nameEn: 'Pailin' },
            { code: 'TKM', nameKm: 'ត្បូងឃ្មុំ', nameEn: 'Tboung Khmum' }
        ];

        // Comprehensive Hospital Dataset Covering all 25 provinces
        const hospitals = [
            // PHNOM PENH
            {
                id: 'pp-calmette',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យកាល់ម៉ែត (Calmette Hospital)',
                nameEn: 'Calmette Hospital Phnom Penh',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យជាតិកម្រិតខ្ពស់',
                typeEn: 'National Referral Hospital',
                hasNssf: true,
                emergencyPhone: '023 426 948',
                altPhone: '023 724 891 / 012 805 119',
                addressKm: 'មហាវិថីព្រះមុនីវង្ស សង្កាត់ស្រះចក ខណ្ឌដូនពេញ',
                addressEn: '#3 Monivong Blvd, Srah Chak, Daun Penh',
                services: ['Trauma Center', 'ICU', 'Cardiology', 'Surgery', 'Blood Bank']
            },
            {
                id: 'pp-russia',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យមិត្តភាពខ្មែរ-សូវៀត (ពេទ្យរុស្ស៊ី)',
                nameEn: 'Khmer-Soviet Friendship Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យជាតិកម្រិតខ្ពស់',
                typeEn: 'National Referral Hospital',
                hasNssf: true,
                emergencyPhone: '023 217 764',
                altPhone: '023 212 905',
                addressKm: 'ផ្លូវយោធពលខេមរភូមិន្ទ (ផ្លូវ ២៧១) ខណ្ឌចំការមន',
                addressEn: 'Street 271, Chamkarmon, Phnom Penh',
                services: ['Emergency 24/7', 'Trauma Surgery', 'NSSF', 'Infectious Diseases']
            },
            {
                id: 'pp-kantha',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យគន្ធបុប្ផា (Kantha Bopha I & IV)',
                nameEn: 'Kantha Bopha Children\'s Hospital Phnom Penh',
                type: 'PEDIATRIC',
                typeKm: 'មន្ទីរពេទ្យកុមារឥតគិតថ្លៃ',
                typeEn: 'Free Pediatric Emergency',
                hasNssf: false,
                emergencyPhone: '023 722 724',
                altPhone: '023 216 115',
                addressKm: 'ផ្លូវ ៤៧ ក្បែរវត្តភ្នំ និងវត្តបទុមវតី',
                addressEn: 'Street 47 near Wat Phnom, Daun Penh',
                services: ['Free Pediatric Emergency', 'NICU/PICU', 'Child Surgery']
            },
            {
                id: 'pp-pediatric',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យកុមារជាតិ (National Pediatric Hospital)',
                nameEn: 'National Pediatric Hospital (NPH)',
                type: 'PEDIATRIC',
                typeKm: 'មន្ទីរពេទ្យកុមារជាតិ',
                typeEn: 'National Children\'s Hospital',
                hasNssf: true,
                emergencyPhone: '023 884 924',
                altPhone: '012 884 924',
                addressKm: 'មហាវិថីសហព័ន្ធរុស្ស៊ី សង្កាត់ទឹកល្អក់១ ខណ្ឌទួលគោក',
                addressEn: 'Russian Federation Blvd, Tuol Kouk',
                services: ['Pediatric ICU', 'Child Trauma', 'NSSF']
            },
            {
                id: 'pp-kossamak',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យព្រះកុសុមៈ (ពេទ្យលោកសង្ឃ)',
                nameEn: 'Preah Kossamak Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យជាតិកម្រិតខ្ពស់',
                typeEn: 'National Referral Center',
                hasNssf: true,
                emergencyPhone: '023 882 018',
                altPhone: '012 884 414',
                addressKm: 'ផ្លូវ ២៧១ សង្កាត់ទឹកថ្លា ខណ្ឌសែនសុខ',
                addressEn: 'Street 271, Teuk Thla, Sen Sok',
                services: ['Trauma Center', 'Orthopedic Surgery', 'Emergency 24/7']
            },
            {
                id: 'pp-sunrise',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យសាន់រ៉ាយស៍ជប៉ុនភ្នំពេញ',
                nameEn: 'Sunrise Japan Hospital Phnom Penh',
                type: 'PRIVATE',
                typeKm: 'មន្ទីរពេទ្យឯកជនស្តង់ដារជប៉ុន',
                typeEn: 'Japanese Standard Emergency',
                hasNssf: false,
                emergencyPhone: '023 432 666',
                altPhone: '078 211 119',
                addressKm: 'ផ្លូវកូឡាអ៊ែត ជ្រោយចង្វារ',
                addressEn: 'Chroy Changvar, Phnom Penh',
                services: ['Stroke Center', 'Emergency Neurosurgery', 'Ambulance']
            },
            {
                id: 'pp-royal',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យរ៉ូយ៉ាល់ភ្នំពេញ (Royal Phnom Penh)',
                nameEn: 'Royal Phnom Penh Hospital',
                type: 'PRIVATE',
                typeKm: 'មន្ទីរពេទ្យអន្តរជាតិ (BDMS)',
                typeEn: 'International Hospital',
                hasNssf: false,
                emergencyPhone: '023 991 000',
                altPhone: '023 991 119',
                addressKm: '#888 មហាវិថីសហព័ន្ធរុស្ស៊ី ខណ្ឌពោធិ៍សែនជ័យ',
                addressEn: 'Russian Federation Blvd, Sen Sok / Por Senchey',
                services: ['Intl ER Trauma', 'Helicopter Dispatch', 'ICU']
            },
            {
                id: 'pp-choray',
                provinceCode: 'PP',
                provinceKm: 'រាជធានីភ្នំពេញ',
                provinceEn: 'Phnom Penh',
                nameKm: 'មន្ទីរពេទ្យចោរ៉ៃភ្នំពេញ (Cho Ray Phnom Penh)',
                nameEn: 'Cho Ray Phnom Penh Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យសង្គ្រោះបន្ទាន់ & វះកាត់',
                typeEn: 'Trauma & Emergency Center',
                hasNssf: true,
                emergencyPhone: '023 684 1001',
                altPhone: '023 684 1002',
                addressKm: 'ផ្លូវជាតិលេខ១ សង្កាត់និរោធ ខណ្ឌច្បារអំពៅ',
                addressEn: 'National Road 1, Niroth, Chbar Ampov',
                services: ['Trauma Center', 'NSSF', 'Highway Accident Response']
            },

            // SIEM REAP
            {
                id: 'sr-provincial',
                provinceCode: 'SR',
                provinceKm: 'ខេត្តសៀមរាប',
                provinceEn: 'Siem Reap',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តសៀមរាប',
                nameEn: 'Siem Reap Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '063 764 091',
                altPhone: '012 360 038',
                addressKm: 'ផ្លូវ ៧មករា ក្រុងសៀមរាប',
                addressEn: '7 Makara St, Siem Reap City',
                services: ['Emergency 24/7', 'Trauma', 'NSSF', 'Blood Transfusion']
            },
            {
                id: 'sr-kantha',
                provinceCode: 'SR',
                provinceKm: 'ខេត្តសៀមរាប',
                provinceEn: 'Siem Reap',
                nameKm: 'មន្ទីរពេទ្យជ័យវរ្ម័នទី៧ (គន្ធបុប្ផាទី៣)',
                nameEn: 'Jayavarman VII Hospital (Kantha Bopha III)',
                type: 'PEDIATRIC',
                typeKm: 'មន្ទីរពេទ្យកុមារឥតគិតថ្លៃ & សម្ភព',
                typeEn: 'Free Children & Maternity',
                hasNssf: false,
                emergencyPhone: '063 963 404',
                altPhone: '063 760 295',
                addressKm: 'ផ្លូវទៅអង្គរវត្ត ក្រុងសៀមរាប',
                addressEn: 'Road to Angkor Wat, Siem Reap',
                services: ['Free Pediatric ER', 'Maternity Emergency', 'NICU']
            },
            {
                id: 'sr-angkor-child',
                provinceCode: 'SR',
                provinceKm: 'ខេត្តសៀមរាប',
                provinceEn: 'Siem Reap',
                nameKm: 'មន្ទីរពេទ្យកុមារអង្គរ (Angkor Hospital for Children)',
                nameEn: 'Angkor Hospital for Children (AHC)',
                type: 'PEDIATRIC',
                typeKm: 'មន្ទីរពេទ្យកុមារមិនរកកម្រៃ',
                typeEn: 'Non-profit Pediatric Hospital',
                hasNssf: false,
                emergencyPhone: '063 963 409',
                altPhone: '012 963 409',
                addressKm: 'ផ្លូវទេពវង្ស ក្រុងសៀមរាប',
                addressEn: 'Tep Vong St, Siem Reap City',
                services: ['24/7 Pediatric ER', 'Intensive Care', 'Child Trauma']
            },

            // BATTAMBANG
            {
                id: 'bb-provincial',
                provinceCode: 'BB',
                provinceKm: 'ខេត្តបាត់ដំបង',
                provinceEn: 'Battambang',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តបាត់ដំបង',
                nameEn: 'Battambang Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '053 952 822',
                altPhone: '012 908 970',
                addressKm: 'ផ្លូវលេខ១ ក្រុងបាត់ដំបង',
                addressEn: 'Street 1, Battambang City',
                services: ['Emergency Trauma', 'NSSF', 'Surgical Ward', 'Blood Bank']
            },
            {
                id: 'bb-emergency',
                provinceCode: 'BB',
                provinceKm: 'ខេត្តបាត់ដំបង',
                provinceEn: 'Battambang',
                nameKm: 'មន្ទីរពេទ្យសង្គ្រោះបន្ទាន់បាត់ដំបង (Emergency Hospital)',
                nameEn: 'Emergency Trauma Center Battambang',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យសង្គ្រោះគ្រោះថ្នាក់',
                typeEn: 'Trauma & Surgical Center',
                hasNssf: true,
                emergencyPhone: '053 952 770',
                altPhone: '012 852 770',
                addressKm: 'ក្រុងបាត់ដំបង',
                addressEn: 'Battambang City',
                services: ['Trauma Surgery', 'Fractures & Wounds', '24/7 ER']
            },

            // PREAH SIHANOUK (SIHANOUKVILLE)
            {
                id: 'sh-provincial',
                provinceCode: 'SH',
                provinceKm: 'ខេត្តព្រះសីហនុ',
                provinceEn: 'Sihanoukville',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តព្រះសីហនុ',
                nameEn: 'Sihanoukville Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '034 933 607',
                altPhone: '012 822 555',
                addressKm: 'វិថី ៧មករា ក្រុងព្រះសីហនុ',
                addressEn: '7 Makara St, Sihanoukville City',
                services: ['Emergency Trauma', 'NSSF', 'Expressway Response', 'Surgery']
            },

            // KAMPONG CHAM
            {
                id: 'kc-provincial',
                provinceCode: 'KC',
                provinceKm: 'ខេត្តកំពង់ចាម',
                provinceEn: 'Kampong Cham',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកំពង់ចាម',
                nameEn: 'Kampong Cham Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '042 941 240',
                altPhone: '012 856 222',
                addressKm: 'ផ្លូវមាត់ទន្លេ ក្រុងកំពង់ចាម',
                addressEn: 'Riverside Rd, Kampong Cham City',
                services: ['Emergency 24/7', 'Trauma Center', 'NSSF', 'Blood Bank']
            },

            // KANDAL
            {
                id: 'kd-provincial',
                provinceCode: 'KD',
                provinceKm: 'ខេត្តកណ្តាល',
                provinceEn: 'Kandal',
                nameKm: 'មន្ទីរពេទ្យជ័យជំនះ (មន្ទីរពេទ្យខេត្តកណ្តាល)',
                nameEn: 'Chey Chumneas Hospital (Kandal Provincial)',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '024 985 240',
                altPhone: '012 852 240',
                addressKm: 'ក្រុងតាខ្មៅ ខេត្តកណ្តាល',
                addressEn: 'Ta Khmau City, Kandal Province',
                services: ['Emergency 24/7', 'Trauma Response', 'NSSF']
            },

            // KAMPOT
            {
                id: 'kp-provincial',
                provinceCode: 'KP',
                provinceKm: 'ខេត្តកំពត',
                provinceEn: 'Kampot',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកំពត',
                nameEn: 'Kampot Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '033 932 840',
                altPhone: '012 828 720',
                addressKm: 'ផ្លូវជាតិលេខ៣ ក្រុងកំពត',
                addressEn: 'National Road 3, Kampot City',
                services: ['Emergency 24/7', 'Trauma', 'NSSF']
            },
            {
                id: 'kp-sonja',
                provinceCode: 'KP',
                provinceKm: 'ខេត្តកំពត',
                provinceEn: 'Kampot',
                nameKm: 'មន្ទីរពេទ្យស៊ូនីញ៉ាឃៀល (Sonja Kill Memorial)',
                nameEn: 'Sonja Kill Memorial Hospital Kampot',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យសប្បុរសធម៌ស្តង់ដារអន្តរជាតិ',
                typeEn: 'Charity General Hospital',
                hasNssf: true,
                emergencyPhone: '078 903 000',
                altPhone: '077 666 752',
                addressKm: 'ផ្លូវជាតិលេខ៣ ស្រុកទឹកឈូ ខេត្តកំពត',
                addressEn: 'National Road 3, Tuek Chhou, Kampot',
                services: ['24/7 Emergency', 'Pediatrics', 'Trauma Surgery', 'NSSF']
            },

            // KAMPONG SPEU
            {
                id: 'ks-provincial',
                provinceCode: 'KS',
                provinceKm: 'ខេត្តកំពង់ស្ពឺ',
                provinceEn: 'Kampong Speu',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកំពង់ស្ពឺ',
                nameEn: 'Kampong Speu Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '025 987 114',
                altPhone: '012 856 114',
                addressKm: 'ក្រុងច្បារមន ខេត្តកំពង់ស្ពឺ',
                addressEn: 'Chbar Mon City, Kampong Speu',
                services: ['Emergency Trauma', 'National Road 4 Accidents', 'NSSF']
            },

            // KAMPONG CHHNANG
            {
                id: 'kch-provincial',
                provinceCode: 'KCH',
                provinceKm: 'ខេត្តកំពង់ឆ្នាំង',
                provinceEn: 'Kampong Chhnang',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកំពង់ឆ្នាំង',
                nameEn: 'Kampong Chhnang Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '026 988 240',
                altPhone: '012 888 240',
                addressKm: 'ក្រុងកំពង់ឆ្នាំង',
                addressEn: 'Kampong Chhnang City',
                services: ['Emergency 24/7', 'National Road 5 Accidents', 'NSSF']
            },

            // KAMPONG THOM
            {
                id: 'kt-provincial',
                provinceCode: 'KT',
                provinceKm: 'ខេត្តកំពង់ធំ',
                provinceEn: 'Kampong Thom',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកំពង់ធំ',
                nameEn: 'Kampong Thom Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '062 961 240',
                altPhone: '012 840 240',
                addressKm: 'ក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ',
                addressEn: 'Stueng Saen City, Kampong Thom',
                services: ['Emergency 24/7', 'National Road 6 Response', 'NSSF']
            },

            // TAKEO
            {
                id: 'tk-provincial',
                provinceCode: 'TK',
                provinceKm: 'ខេត្តតាកែវ',
                provinceEn: 'Takeo',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តតាកែវ',
                nameEn: 'Takeo Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '032 931 240',
                altPhone: '012 831 240',
                addressKm: 'ក្រុងដូនកែវ ខេត្តតាកែវ',
                addressEn: 'Doun Kaev City, Takeo',
                services: ['Emergency 24/7', 'Trauma Ward', 'NSSF']
            },

            // PREY VENG
            {
                id: 'pv-provincial',
                provinceCode: 'PV',
                provinceKm: 'ខេត្តព្រៃវែង',
                provinceEn: 'Prey Veng',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តព្រៃវែង',
                nameEn: 'Prey Veng Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '043 944 240',
                altPhone: '012 844 240',
                addressKm: 'ក្រុងព្រៃវែង ខេត្តព្រៃវែង',
                addressEn: 'Prey Veng City',
                services: ['Emergency 24/7', 'Trauma Care', 'NSSF']
            },

            // SVAY RIENG
            {
                id: 'svr-provincial',
                provinceCode: 'SVR',
                provinceKm: 'ខេត្តស្វាយរៀង',
                provinceEn: 'Svay Rieng',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តស្វាយរៀង',
                nameEn: 'Svay Rieng Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '044 945 240',
                altPhone: '012 845 240',
                addressKm: 'ក្រុងស្វាយរៀង',
                addressEn: 'Svay Rieng City',
                services: ['Emergency Trauma', 'National Road 1 Accidents', 'NSSF']
            },

            // BANTEAY MEANCHEY
            {
                id: 'bm-japan',
                provinceCode: 'BM',
                provinceKm: 'ខេត្តបន្ទាយមានជ័យ',
                provinceEn: 'Banteay Meanchey',
                nameKm: 'មន្ទីរពេទ្យមិត្តភាពកម្ពុជា-ជប៉ុន មង្គលបូរី',
                nameEn: 'Cambodia-Japan Friendship Mongkol Borei Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកម្រិតខ្ពស់',
                typeEn: 'Regional Referral Hospital',
                hasNssf: true,
                emergencyPhone: '054 958 840',
                altPhone: '012 858 840',
                addressKm: 'ស្រុកមង្គលបូរី ខេត្តបន្ទាយមានជ័យ',
                addressEn: 'Mongkol Borei, Banteay Meanchey',
                services: ['Trauma Center', 'Border ER Response', 'NSSF', 'ICU']
            },

            // PURSAT
            {
                id: 'ps-provincial',
                provinceCode: 'PS',
                provinceKm: 'ខេត្តពោធិ៍សាត់',
                provinceEn: 'Pursat',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តពោធិ៍សាត់ (សំពៅមាស)',
                nameEn: 'Pursat Provincial Referral Hospital (Sampov Meas)',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '052 951 240',
                altPhone: '012 851 240',
                addressKm: 'ក្រុងពោធិ៍សាត់',
                addressEn: 'Pursat City',
                services: ['Emergency 24/7', 'National Road 5 Response', 'NSSF']
            },

            // KRATIE
            {
                id: 'kr-provincial',
                provinceCode: 'KR',
                provinceKm: 'ខេត្តក្រចេះ',
                provinceEn: 'Kratie',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តក្រចេះ',
                nameEn: 'Kratie Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '072 971 240',
                altPhone: '012 871 240',
                addressKm: 'ក្រុងក្រចេះ',
                addressEn: 'Kratie City',
                services: ['Emergency Trauma', 'NSSF', 'General Surgery']
            },

            // KOH KONG
            {
                id: 'kk-provincial',
                provinceCode: 'KK',
                provinceKm: 'ខេត្តកោះកុង',
                provinceEn: 'Koh Kong',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកោះកុង',
                nameEn: 'Koh Kong Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '035 936 240',
                altPhone: '012 836 240',
                addressKm: 'ក្រុងខេមរភូមិន្ទ ខេត្តកោះកុង',
                addressEn: 'Khemara Phoumin City, Koh Kong',
                services: ['Emergency 24/7', 'National Road 48 Accidents', 'NSSF']
            },

            // STUNG TRENG
            {
                id: 'st-provincial',
                provinceCode: 'ST',
                provinceKm: 'ខេត្តស្ទឹងត្រែង',
                provinceEn: 'Stung Treng',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តស្ទឹងត្រែង',
                nameEn: 'Stung Treng Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '074 973 240',
                altPhone: '012 873 240',
                addressKm: 'ក្រុងស្ទឹងត្រែង',
                addressEn: 'Stung Treng City',
                services: ['Emergency 24/7', 'Regional Trauma', 'NSSF']
            },

            // MONDULKIRI
            {
                id: 'mk-provincial',
                provinceCode: 'MK',
                provinceKm: 'ខេត្តមណ្ឌលគិរី',
                provinceEn: 'Mondulkiri',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តមណ្ឌលគិរី',
                nameEn: 'Mondulkiri Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '073 972 240',
                altPhone: '012 872 240',
                addressKm: 'ក្រុងសែនមនោរម្យ ខេត្តមណ្ឌលគិរី',
                addressEn: 'Sen Monorom City, Mondulkiri',
                services: ['Emergency 24/7', 'Highland Response', 'NSSF']
            },

            // RATANAKIRI
            {
                id: 'rk-provincial',
                provinceCode: 'RK',
                provinceKm: 'ខេត្តរតនគិរី',
                provinceEn: 'Ratanakiri',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តរតនគិរី',
                nameEn: 'Ratanakiri Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '075 974 240',
                altPhone: '012 874 240',
                addressKm: 'ក្រុងបានលុង ខេត្តរតនគិរី',
                addressEn: 'Banlung City, Ratanakiri',
                services: ['Emergency 24/7', 'Trauma Ward', 'NSSF']
            },

            // PREAH VIHEAR
            {
                id: 'pvh-provincial',
                provinceCode: 'PVH',
                provinceKm: 'ខេត្តព្រះវិហារ',
                provinceEn: 'Preah Vihear',
                nameKm: 'មន្ទីរពេទ្យបង្អែក១៦មករា ខេត្តព្រះវិហារ',
                nameEn: '16 Makara Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '064 954 240',
                altPhone: '012 854 240',
                addressKm: 'ក្រុងត្បែងមានជ័យ ខេត្តព្រះវិហារ',
                addressEn: 'Tbeng Meanchey City, Preah Vihear',
                services: ['Emergency 24/7', 'Trauma Surgery', 'NSSF']
            },

            // OTDAR MEANCHEY
            {
                id: 'omc-provincial',
                provinceCode: 'OMC',
                provinceKm: 'ខេត្តឧត្តរមានជ័យ',
                provinceEn: 'Otdar Meanchey',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តឧត្តរមានជ័យ (សំរោង)',
                nameEn: 'Otdar Meanchey Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '065 956 240',
                altPhone: '012 856 240',
                addressKm: 'ក្រុងសំរោង ខេត្តឧត្តរមានជ័យ',
                addressEn: 'Samraong City, Otdar Meanchey',
                services: ['Emergency 24/7', 'Border Trauma Response', 'NSSF']
            },

            // KEP
            {
                id: 'kep-provincial',
                provinceCode: 'KEP',
                provinceKm: 'ខេត្តកែប',
                provinceEn: 'Kep',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តកែប',
                nameEn: 'Kep Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '036 937 240',
                altPhone: '012 837 240',
                addressKm: 'ក្រុងកែប ខេត្តកែប',
                addressEn: 'Kep City, Kep Province',
                services: ['Emergency 24/7', 'Coastal Accident Care', 'NSSF']
            },

            // PAILIN
            {
                id: 'pl-provincial',
                provinceCode: 'PL',
                provinceKm: 'ខេត្តប៉ៃលិន',
                provinceEn: 'Pailin',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តប៉ៃលិន',
                nameEn: 'Pailin Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '053 953 240',
                altPhone: '012 853 240',
                addressKm: 'ក្រុងប៉ៃលិន ខេត្តប៉ៃលិន',
                addressEn: 'Pailin City, Pailin Province',
                services: ['Emergency 24/7', 'Border Care', 'NSSF']
            },

            // TBOUNG KHMUM
            {
                id: 'tkm-provincial',
                provinceCode: 'TKM',
                provinceKm: 'ខេត្តត្បូងឃ្មុំ',
                provinceEn: 'Tboung Khmum',
                nameKm: 'មន្ទីរពេទ្យបង្អែកខេត្តត្បូងឃ្មុំ (ក្រុងសួង)',
                nameEn: 'Tboung Khmum Provincial Referral Hospital',
                type: 'REFERRAL',
                typeKm: 'មន្ទីរពេទ្យបង្អែកខេត្ត',
                typeEn: 'Provincial Referral Hospital',
                hasNssf: true,
                emergencyPhone: '042 942 240',
                altPhone: '012 842 240',
                addressKm: 'ក្រុងសួង ខេត្តត្បូងឃ្មុំ',
                addressEn: 'Suong City, Tboung Khmum',
                services: ['Emergency 24/7', 'Trauma Center', 'NSSF']
            }
        ];

        // Type badge class
        const getTypeBadge = (type) => {
            switch (type) {
                case 'PEDIATRIC':
                    return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
                case 'PRIVATE':
                    return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
                default:
                    return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
            }
        };

        // Filter hospitals
        const filteredHospitals = computed(() => {
            let list = hospitals;

            // Province filter
            if (selectedProvince.value !== 'ALL') {
                list = list.filter(h => h.provinceCode === selectedProvince.value);
            }

            // Category filter
            if (selectedCategory.value === 'REFERRAL') {
                list = list.filter(h => h.type === 'REFERRAL');
            } else if (selectedCategory.value === 'PEDIATRIC') {
                list = list.filter(h => h.type === 'PEDIATRIC');
            } else if (selectedCategory.value === 'NSSF') {
                list = list.filter(h => h.hasNssf);
            }

            // Search query
            if (searchQuery.value.trim()) {
                const q = searchQuery.value.toLowerCase().trim();
                list = list.filter(h => 
                    h.nameKm.toLowerCase().includes(q) ||
                    h.nameEn.toLowerCase().includes(q) ||
                    h.provinceKm.toLowerCase().includes(q) ||
                    h.provinceEn.toLowerCase().includes(q) ||
                    h.emergencyPhone.includes(q) ||
                    (h.altPhone && h.altPhone.includes(q)) ||
                    h.services.some(s => s.toLowerCase().includes(q))
                );
            }

            return list;
        });

        return {
            isKhmer,
            searchQuery,
            selectedProvince,
            selectedCategory,
            showFirstAid,
            provinceList,
            filteredHospitals,
            getTypeBadge
        };
    }
};
</script>
