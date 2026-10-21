<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Header -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'លេខកូដប្រៃសណីយ៍កម្ពុជា ២៥ រាជធានី-ខេត្ត & លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់' : 'CAMBODIA 25 PROVINCES POSTAL CODES & EMERGENCY DIRECTORY' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">MPTC // CAMBODIA POST</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">OFFICIAL 5-DIGIT ZIP CODES</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-md">
                                <span>📮</span>
                                <span>{{ isKhmer ? 'បញ្ជីលេខកូដប្រៃសណីយ៍ & លេខសង្គ្រោះបន្ទាន់' : 'POSTAL CODES & EMERGENCY HOTLINES' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'ស្វែងរកលេខកូដប្រៃសណីយ៍ ២៥ ខេត្ត-ក្រុង និងលេខទូរស័ព្ទសង្គ្រោះបន្ទាន់' : 'Cambodia 25 Provinces Postal Code & Emergency Directory' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ស្វែងរកលេខកូដប្រៃសណីយ៍ផ្លូវការ (Zip/Postal Code) សម្រាប់បំពេញទិញទំនិញអនឡាញ (AliExpress, Amazon, eBay), សេវាបញ្ញើអន្តរជាតិ (DHL, FedEx, UPS) និងលេខទូរស័ព្ទទាន់ហេតុការណ៍សង្គ្រោះបន្ទាន់កម្ពុជា ២៤/៧។' 
                                    : 'Lookup official Cambodia 5-digit postal codes for international e-commerce delivery (AliExpress, Amazon, DHL, FedEx) and 24/7 nationwide emergency hotlines (Police, Fire, SAMU Ambulance).' }}
                            </p>
                        </div>

                        <!-- Quick Tab Selector -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ជ្រើសរើសផ្នែក' : 'Directory View' }}
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="activeTab = 'postal'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeTab === 'postal' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '📮 លេខកូដប្រៃសណីយ៍' : '📮 Postal Codes' }}
                                </button>
                                <button 
                                    @click="activeTab = 'emergency'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeTab === 'emergency' ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? '🚨 សង្គ្រោះបន្ទាន់' : '🚨 Emergency' }}
                                </button>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <span>⚡</span>
                                <span>{{ activeTab === 'postal' ? (isKhmer ? 'មាន ២៥ ខេត្ត-ក្រុង & ខណ្ឌ/ស្រុក' : '25 Provinces & all districts') : (isKhmer ? 'ទូរស័ព្ទហៅឥតគិតថ្លៃ ២៤/៧' : 'Free 24/7 Toll-free hotlines') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 1: POSTAL CODES -->
            <div v-if="activeTab === 'postal'" class="space-y-6">
                
                <!-- Search & Filters -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                    <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <!-- Search Bar -->
                        <div class="relative w-full sm:max-w-md">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                🔍
                            </span>
                            <input 
                                v-model="searchQuery"
                                type="text"
                                :placeholder="isKhmer ? 'ស្វែងរកតាមឈ្មោះខេត្ត ខណ្ឌ ស្រុក ឬលេខកូដ...' : 'Search by province, district, khan or code...'"
                                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                            />
                            <button 
                                v-if="searchQuery" 
                                @click="searchQuery = ''"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600">
                                ✕
                            </button>
                        </div>

                        <!-- Results Counter -->
                        <div class="text-xs font-mono text-slate-500 dark:text-slate-400 self-end sm:self-center">
                            {{ isKhmer ? `រកឃើញ ${filteredDistricts.length} ទីតាំង` : `Found ${filteredDistricts.length} locations` }}
                        </div>
                    </div>

                    <!-- Quick Province Filter Pills -->
                    <div class="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                        <button 
                            @click="selectedProvince = 'ALL'"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap shrink-0"
                            :class="selectedProvince === 'ALL' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? 'ទាំងអស់ (២៥ ខេត្ត)' : 'All 25 Provinces' }}
                        </button>
                        <button 
                            v-for="prov in topProvinces" 
                            :key="prov.code"
                            @click="selectedProvince = prov.code"
                            class="px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap shrink-0"
                            :class="selectedProvince === prov.code ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                            {{ isKhmer ? prov.nameKm : prov.nameEn }} ({{ prov.code }})
                        </button>
                    </div>
                </div>

                <!-- Postal Codes Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                        v-for="item in filteredDistricts" 
                        :key="item.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all flex flex-col justify-between group">
                        
                        <div>
                            <div class="flex items-start justify-between gap-2">
                                <div class="space-y-1">
                                    <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                                        {{ isKhmer ? item.provinceKm : item.provinceEn }}
                                    </span>
                                    <h3 class="text-base font-bold text-slate-900 dark:text-white pt-1">
                                        {{ isKhmer ? item.nameKm : item.nameEn }}
                                    </h3>
                                    <p class="text-xs text-slate-500 dark:text-slate-400">
                                        {{ isKhmer ? item.nameEn : item.nameKm }}
                                    </p>
                                </div>

                                <!-- Postal Code Badge -->
                                <div class="text-right">
                                    <span class="text-lg font-mono font-black text-slate-900 dark:text-white tracking-wider block">
                                        {{ item.postalCode }}
                                    </span>
                                    <span class="text-[9px] font-mono uppercase text-slate-400">ZIP CODE</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Bar -->
                        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span class="text-[11px] text-slate-400">
                                {{ item.type === 'khan' ? (isKhmer ? 'ខណ្ឌ' : 'Khan') : (isKhmer ? 'ស្រុក/ក្រុង' : 'District/City') }}
                            </span>
                            <button 
                                @click="copyCode(item.postalCode, item.id)"
                                class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all"
                                :class="copiedId === item.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400'">
                                <span>{{ copiedId === item.id ? '✓' : '📋' }}</span>
                                <span>{{ copiedId === item.id ? (isKhmer ? 'ចម្លងរួច!' : 'Copied!') : (isKhmer ? 'ចម្លងកូដ' : 'Copy') }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredDistricts.length === 0" class="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
                    <p class="text-3xl mb-2">🔍</p>
                    <p class="font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {{ isKhmer ? 'រកមិនឃើញទីតាំងដែលត្រូវនឹងការស្វែងរកទេ' : 'No locations matched your search query' }}
                    </p>
                    <p class="text-xs text-slate-500 mt-1">
                        {{ isKhmer ? 'សូមសាកល្បងវាយឈ្មោះជាភាសាខ្មែរ ឬអង់គ្លេស ឧទាហរណ៍៖ "Chamkarmon", "Siem Reap", "12000"' : 'Try searching in Khmer or English e.g. "Chamkarmon", "Siem Reap", "12000"' }}
                    </p>
                </div>

                <!-- International Shipping Format Guide -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-lg">📦</span>
                        <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {{ isKhmer ? 'របៀបសរសេរអាសយដ្ឋានផ្ញើឥវ៉ាន់មកកម្ពុជា (AliExpress, Amazon, DHL, FedEx)' : 'Standard Cambodia Address Format for International Parcels' }}
                        </h2>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div class="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 border border-slate-200 dark:border-slate-800">
                            <span class="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">
                                {{ isKhmer ? 'គំរូទូទៅ (Example Template)' : 'General Template' }}
                            </span>
                            <div class="font-mono text-[11px] space-y-1 text-slate-700 dark:text-slate-300 leading-relaxed">
                                <div><strong>Name:</strong> [Your Full Name]</div>
                                <div><strong>Street Address:</strong> House #..., St. ..., Sangkat ...</div>
                                <div><strong>City/District:</strong> Khan ..., Phnom Penh (or Province)</div>
                                <div><strong>State/Province:</strong> Phnom Penh (or Siem Reap, etc.)</div>
                                <div><strong>Postal / Zip Code:</strong> 12000 (or your 5-digit code)</div>
                                <div><strong>Country:</strong> Cambodia</div>
                                <div><strong>Phone Number:</strong> +855 12 345 678 (Very Important!)</div>
                            </div>
                        </div>

                        <div class="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 border border-slate-200 dark:border-slate-800">
                            <span class="font-bold text-blue-600 dark:text-blue-400 block font-mono">
                                {{ isKhmer ? 'គន្លឹះសំខាន់ពេលកុម្ម៉ង់ឥវ៉ាន់ក្រៅប្រទេស' : 'Key Delivery Tips' }}
                            </span>
                            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                                <li>{{ isKhmer ? 'តែងតែដាក់លេខទូរស័ព្ទកម្ពុជា (+855) ដែលអាចតេចូល ដើម្បីអ្នកដឹកទំនិញងាយស្រួលទាក់ទង។' : 'Always include a working phone number with +855 country code for courier calls.' }}</li>
                                <li>{{ isKhmer ? 'បើវេបសាយទាមទារ Zip Code ៥ ខ្ទង់ សម្រាប់ភ្នំពេញ អាចប្រើ 12000 បានទូទៅ។' : 'If a website requires a general 5-digit postal code, 12000 is widely accepted for Phnom Penh.' }}</li>
                                <li>{{ isKhmer ? 'សម្រាប់ខេត្ត អាចប្រើលេខកូដខេត្តគោល (ឧ. 17000 សម្រាប់សៀមរាប, 18000 សម្រាប់ព្រះសីហនុ)។' : 'For provinces, use the province master zip code (e.g., 17000 for Siem Reap, 18000 for Sihanoukville).' }}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <!-- TAB 2: EMERGENCY DIRECTORY -->
            <div v-else class="space-y-6">
                <!-- Top 3 Critical Numbers -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <!-- Police 117 -->
                    <div class="p-5 border-2 border-red-500/40 bg-gradient-to-br from-red-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 rounded-2xl shadow-sm space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-3xl">👮</span>
                            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold">24/7 FREE</span>
                        </div>
                        <div>
                            <div class="text-3xl font-black font-mono text-red-600 dark:text-red-400">117</div>
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white mt-1">
                                {{ isKhmer ? 'នគរបាលជាតិ (ប៉ូលិស)' : 'National Police Emergency' }}
                            </h3>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {{ isKhmer ? 'សម្រាប់ករណីចោរកម្ម អំពើហិង្សា និងគ្រោះថ្នាក់សន្តិសុខបន្ទាន់' : 'Robbery, security incidents, violent crime' }}
                            </p>
                        </div>
                        <a 
                            href="tel:117"
                            class="block w-full text-center py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-xs">
                            📞 {{ isKhmer ? 'ចុចទូរស័ព្ទហៅ ១១៧' : 'Call 117 Now' }}
                        </a>
                    </div>

                    <!-- Fire 118 -->
                    <div class="p-5 border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 rounded-2xl shadow-sm space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-3xl">🚒</span>
                            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold">24/7 FREE</span>
                        </div>
                        <div>
                            <div class="text-3xl font-black font-mono text-amber-600 dark:text-amber-400">118</div>
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white mt-1">
                                {{ isKhmer ? 'ពន្លត់អគ្គិភ័យ' : 'Fire Rescue Hotline' }}
                            </h3>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {{ isKhmer ? 'សង្គ្រោះអគ្គិភ័យ គ្រោះមហន្តរាយភ្លើងឆេះទូទាំងប្រទេស' : 'Nationwide fire department & rescue team' }}
                            </p>
                        </div>
                        <a 
                            href="tel:118"
                            class="block w-full text-center py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-xs">
                            📞 {{ isKhmer ? 'ចុចទូរស័ព្ទហៅ ១១៨' : 'Call 118 Now' }}
                        </a>
                    </div>

                    <!-- SAMU Ambulance 119 -->
                    <div class="p-5 border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 rounded-2xl shadow-sm space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-3xl">🚑</span>
                            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">24/7 FREE</span>
                        </div>
                        <div>
                            <div class="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">119</div>
                            <h3 class="text-sm font-bold text-slate-900 dark:text-white mt-1">
                                {{ isKhmer ? 'រថយន្តសង្គ្រោះបន្ទាន់ SAMU' : 'SAMU Medical Ambulance' }}
                            </h3>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {{ isKhmer ? 'សង្គ្រោះអ្នកជំងឺធ្ងន់ធ្ងរ និងគ្រោះថ្នាក់ចរាចរណ៍' : 'Emergency medical assistance & ambulance dispatch' }}
                            </p>
                        </div>
                        <a 
                            href="tel:119"
                            class="block w-full text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-xs">
                            📞 {{ isKhmer ? 'ចុចទូរស័ព្ទហៅ ១១៩' : 'Call 119 Now' }}
                        </a>
                    </div>
                </div>

                <!-- Nationwide Emergency & Public Hotline Directory -->
                <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>☎️</span>
                            <span>{{ isKhmer ? 'បញ្ជីលេខទូរស័ព្ទជំនួយ និងសង្គ្រោះបន្ទាន់ផ្សេងទៀត' : 'Other Essential Public Emergency & Support Hotlines' }}</span>
                        </h2>
                        <span class="text-xs text-slate-400 font-mono">{{ emergencyList.length }} Contacts</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div 
                            v-for="contact in emergencyList" 
                            :key="contact.phone"
                            class="p-3.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 hover:border-slate-400 dark:hover:border-slate-600 transition-all">
                            
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <span class="text-base mr-1.5">{{ contact.icon }}</span>
                                    <span class="text-xs font-bold text-slate-900 dark:text-white">
                                        {{ isKhmer ? contact.nameKm : contact.nameEn }}
                                    </span>
                                </div>
                                <span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                                    {{ contact.category }}
                                </span>
                            </div>

                            <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                {{ isKhmer ? contact.descKm : contact.descEn }}
                            </p>

                            <div class="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                                <span class="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                                    {{ contact.phone }}
                                </span>
                                <a 
                                    :href="'tel:' + contact.phone.replace(/\s+/g, '')"
                                    class="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-mono font-bold text-slate-700 dark:text-slate-200 transition-colors">
                                    📞 {{ isKhmer ? 'ហៅ' : 'Call' }}
                                </a>
                            </div>
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
    name: 'PostalCodesDirectory',
    setup() {
        const { isKhmer } = useLanguage();

        const activeTab = ref('postal'); // 'postal' or 'emergency'
        const searchQuery = ref('');
        const selectedProvince = ref('ALL');
        const copiedId = ref(null);

        // Top provinces for filter buttons
        const topProvinces = [
            { code: '12000', nameKm: 'រាជធានីភ្នំពេញ', nameEn: 'Phnom Penh' },
            { code: '17000', nameKm: 'ខេត្តសៀមរាប', nameEn: 'Siem Reap' },
            { code: '18000', nameKm: 'ខេត្តព្រះសីហនុ', nameEn: 'Sihanoukville' },
            { code: '02000', nameKm: 'ខេត្តបាត់ដំបង', nameEn: 'Battambang' },
            { code: '08000', nameKm: 'ខេត្តកណ្តាល', nameEn: 'Kandal' },
            { code: '07000', nameKm: 'ខេត្តកំពត', nameEn: 'Kampot' },
            { code: '03000', nameKm: 'ខេត្តកំពង់ចាម', nameEn: 'Kampong Cham' }
        ];

        // Comprehensive Postal Code Directory (All 25 Provinces & Major Districts/Khans)
        const allDistricts = [
            // Phnom Penh (12000)
            { id: 'pp-1', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌចំការមន', nameEn: 'Khan Chamkarmon', postalCode: '120101', type: 'khan' },
            { id: 'pp-2', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌដូនពេញ', nameEn: 'Khan Doun Penh', postalCode: '120201', type: 'khan' },
            { id: 'pp-3', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌ៧មករា', nameEn: 'Khan 7 Makara', postalCode: '120301', type: 'khan' },
            { id: 'pp-4', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌទួលគោក', nameEn: 'Khan Tuol Kouk', postalCode: '120401', type: 'khan' },
            { id: 'pp-5', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌដង្កោ', nameEn: 'Khan Dangkao', postalCode: '120501', type: 'khan' },
            { id: 'pp-6', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌមានជ័យ', nameEn: 'Khan Mean Chey', postalCode: '120601', type: 'khan' },
            { id: 'pp-7', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌឫស្សីកែវ', nameEn: 'Khan Russey Keo', postalCode: '120701', type: 'khan' },
            { id: 'pp-8', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌសែនសុខ', nameEn: 'Khan Sen Sok', postalCode: '120801', type: 'khan' },
            { id: 'pp-9', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌជ្រោយចង្វារ', nameEn: 'Khan Chroy Changvar', postalCode: '120901', type: 'khan' },
            { id: 'pp-10', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌព្រែកព្នៅ', nameEn: 'Khan Prek Pnov', postalCode: '121001', type: 'khan' },
            { id: 'pp-11', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌច្បារអំពៅ', nameEn: 'Khan Chbar Ampov', postalCode: '121101', type: 'khan' },
            { id: 'pp-12', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌបឹងកេងកង', nameEn: 'Khan Boeng Keng Kang', postalCode: '120102', type: 'khan' },
            { id: 'pp-13', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌកំបូល', nameEn: 'Khan Kamboul', postalCode: '121301', type: 'khan' },
            { id: 'pp-14', provinceCode: '12000', provinceKm: 'រាជធានីភ្នំពេញ', provinceEn: 'Phnom Penh', nameKm: 'ខណ្ឌពោធិ៍សែនជ័យ', nameEn: 'Khan Pou Senchey', postalCode: '121201', type: 'khan' },

            // Kandal (08000)
            { id: 'kd-1', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ក្រុងតាខ្មៅ', nameEn: 'Ta Khmau City', postalCode: '080101', type: 'city' },
            { id: 'kd-2', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកកណ្តាលស្ទឹង', nameEn: 'Kandal Stueng', postalCode: '080201', type: 'district' },
            { id: 'kd-3', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកកៀនស្វាយ', nameEn: 'Kien Svay', postalCode: '080301', type: 'district' },
            { id: 'kd-4', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកខ្សាច់កណ្តាល', nameEn: 'Khsach Kandal', postalCode: '080401', type: 'district' },
            { id: 'kd-5', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកកោះធំ', nameEn: 'Koh Thom', postalCode: '080501', type: 'district' },
            { id: 'kd-6', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកអង្គស្នួល', nameEn: 'Angk Snuol', postalCode: '080901', type: 'district' },
            { id: 'kd-7', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកពញាឮ', nameEn: 'Ponhea Lueu', postalCode: '081001', type: 'district' },
            { id: 'kd-8', provinceCode: '08000', provinceKm: 'ខេត្តកណ្តាល', provinceEn: 'Kandal', nameKm: 'ស្រុកស្អាង', nameEn: 'Sa\'ang', postalCode: '081101', type: 'district' },

            // Siem Reap (17000)
            { id: 'sr-1', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ក្រុងសៀមរាប', nameEn: 'Siem Reap City', postalCode: '171201', type: 'city' },
            { id: 'sr-2', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ស្រុកបន្ទាយស្រី', nameEn: 'Banteay Srei', postalCode: '170301', type: 'district' },
            { id: 'sr-3', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ស្រុកប្រាសាទបាគង', nameEn: 'Prasat Bakong', postalCode: '170701', type: 'district' },
            { id: 'sr-4', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ស្រុកពួក', nameEn: 'Puok', postalCode: '170601', type: 'district' },
            { id: 'sr-5', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ស្រុកជីក្រែង', nameEn: 'Chi Kraeng', postalCode: '170401', type: 'district' },
            { id: 'sr-6', provinceCode: '17000', provinceKm: 'ខេត្តសៀមរាប', provinceEn: 'Siem Reap', nameKm: 'ស្រុកសូទ្រនិគម', nameEn: 'Soutr Nikom', postalCode: '170801', type: 'district' },

            // Battambang (02000)
            { id: 'bb-1', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ក្រុងបាត់ដំបង', nameEn: 'Battambang City', postalCode: '020101', type: 'city' },
            { id: 'bb-2', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ស្រុកបាណន់', nameEn: 'Banan', postalCode: '020201', type: 'district' },
            { id: 'bb-3', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ស្រុកថ្មគោល', nameEn: 'Thma Koul', postalCode: '020301', type: 'district' },
            { id: 'bb-4', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ស្រុកបវេល', nameEn: 'Bavel', postalCode: '020401', type: 'district' },
            { id: 'bb-5', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ស្រុកមោងឫស្សី', nameEn: 'Moung Ruessei', postalCode: '020601', type: 'district' },
            { id: 'bb-6', provinceCode: '02000', provinceKm: 'ខេត្តបាត់ដំបង', provinceEn: 'Battambang', nameKm: 'ស្រុកសង្កែ', nameEn: 'Sangkae', postalCode: '020801', type: 'district' },

            // Preah Sihanouk (18000)
            { id: 'sh-1', provinceCode: '18000', provinceKm: 'ខេត្តព្រះសីហនុ', provinceEn: 'Sihanoukville', nameKm: 'ក្រុងព្រះសីហនុ', nameEn: 'Preah Sihanouk City', postalCode: '180101', type: 'city' },
            { id: 'sh-2', provinceCode: '18000', provinceKm: 'ខេត្តព្រះសីហនុ', provinceEn: 'Sihanoukville', nameKm: 'ស្រុកព្រៃនប់', nameEn: 'Prey Nob', postalCode: '180201', type: 'district' },
            { id: 'sh-3', provinceCode: '18000', provinceKm: 'ខេត្តព្រះសីហនុ', provinceEn: 'Sihanoukville', nameKm: 'ស្រុកស្ទឹងហាវ', nameEn: 'Stueng Hav', postalCode: '180301', type: 'district' },
            { id: 'sh-4', provinceCode: '18000', provinceKm: 'ខេត្តព្រះសីហនុ', provinceEn: 'Sihanoukville', nameKm: 'ក្រុងកោះរ៉ុង', nameEn: 'Koh Rong City', postalCode: '180501', type: 'city' },

            // Kampot (07000)
            { id: 'kp-1', provinceCode: '07000', provinceKm: 'ខេត្តកំពត', provinceEn: 'Kampot', nameKm: 'ក្រុងកំពត', nameEn: 'Kampot City', postalCode: '070101', type: 'city' },
            { id: 'kp-2', provinceCode: '07000', provinceKm: 'ខេត្តកំពត', provinceEn: 'Kampot', nameKm: 'ស្រុកទឹកឈូ', nameEn: 'Tuek Chhou', postalCode: '070801', type: 'district' },
            { id: 'kp-3', provinceCode: '07000', provinceKm: 'ខេត្តកំពត', provinceEn: 'Kampot', nameKm: 'ស្រុកកំពង់ត្រាច', nameEn: 'Kampong Trach', postalCode: '070701', type: 'district' },
            { id: 'kp-4', provinceCode: '07000', provinceKm: 'ខេត្តកំពត', provinceEn: 'Kampot', nameKm: 'ស្រុកឈូក', nameEn: 'Chhouk', postalCode: '070401', type: 'district' },

            // Kampong Cham (03000)
            { id: 'kc-1', provinceCode: '03000', provinceKm: 'ខេត្តកំពង់ចាម', provinceEn: 'Kampong Cham', nameKm: 'ក្រុងកំពង់ចាម', nameEn: 'Kampong Cham City', postalCode: '030101', type: 'city' },
            { id: 'kc-2', provinceCode: '03000', provinceKm: 'ខេត្តកំពង់ចាម', provinceEn: 'Kampong Cham', nameKm: 'ស្រុកបាធាយ', nameEn: 'Batheay', postalCode: '030201', type: 'district' },
            { id: 'kc-3', provinceCode: '03000', provinceKm: 'ខេត្តកំពង់ចាម', provinceEn: 'Kampong Cham', nameKm: 'ស្រុកជើងព្រៃ', nameEn: 'Cheung Prey', postalCode: '030401', type: 'district' },
            { id: 'kc-4', provinceCode: '03000', provinceKm: 'ខេត្តកំពង់ចាម', provinceEn: 'Kampong Cham', nameKm: 'ស្រុកព្រៃឈរ', nameEn: 'Prey Chhor', postalCode: '030701', type: 'district' },

            // Kampong Speu (05000)
            { id: 'ks-1', provinceCode: '05000', provinceKm: 'ខេត្តកំពង់ស្ពឺ', provinceEn: 'Kampong Speu', nameKm: 'ក្រុងច្បារមន', nameEn: 'Chbar Mon City', postalCode: '050101', type: 'city' },
            { id: 'ks-2', provinceCode: '05000', provinceKm: 'ខេត្តកំពង់ស្ពឺ', provinceEn: 'Kampong Speu', nameKm: 'ស្រុកឧដុង្គ', nameEn: 'Odongk', postalCode: '050501', type: 'district' },
            { id: 'ks-3', provinceCode: '05000', provinceKm: 'ខេត្តកំពង់ស្ពឺ', provinceEn: 'Kampong Speu', nameKm: 'ស្រុកភ្នំស្រួច', nameEn: 'Phnom Sruoch', postalCode: '050601', type: 'district' },

            // Kampong Chhnang (04000)
            { id: 'kch-1', provinceCode: '04000', provinceKm: 'ខេត្តកំពង់ឆ្នាំង', provinceEn: 'Kampong Chhnang', nameKm: 'ក្រុងកំពង់ឆ្នាំង', nameEn: 'Kampong Chhnang City', postalCode: '040101', type: 'city' },
            { id: 'kch-2', provinceCode: '04000', provinceKm: 'ខេត្តកំពង់ឆ្នាំង', provinceEn: 'Kampong Chhnang', nameKm: 'ស្រុករលាប្អៀរ', nameEn: 'Rolea B\'ier', postalCode: '040601', type: 'district' },

            // Kampong Thom (06000)
            { id: 'kt-1', provinceCode: '06000', provinceKm: 'ខេត្តកំពង់ធំ', provinceEn: 'Kampong Thom', nameKm: 'ក្រុងស្ទឹងសែន', nameEn: 'Stueng Saen City', postalCode: '060101', type: 'city' },
            { id: 'kt-2', provinceCode: '06000', provinceKm: 'ខេត្តកំពង់ធំ', provinceEn: 'Kampong Thom', nameKm: 'ស្រុកបារាយណ៍', nameEn: 'Baray', postalCode: '060201', type: 'district' },

            // Takeo (21000)
            { id: 'tk-1', provinceCode: '21000', provinceKm: 'ខេត្តតាកែវ', provinceEn: 'Takeo', nameKm: 'ក្រុងដូនកែវ', nameEn: 'Doun Kaev City', postalCode: '210101', type: 'city' },
            { id: 'tk-2', provinceCode: '21000', provinceKm: 'ខេត្តតាកែវ', provinceEn: 'Takeo', nameKm: 'ស្រុកបាទី', nameEn: 'Bati', postalCode: '210301', type: 'district' },
            { id: 'tk-3', provinceCode: '21000', provinceKm: 'ខេត្តតាកែវ', provinceEn: 'Takeo', nameKm: 'ស្រុកត្រាំកក់', nameEn: 'Tram Kak', postalCode: '210901', type: 'district' },

            // Prey Veng (14000)
            { id: 'pv-1', provinceCode: '14000', provinceKm: 'ខេត្តព្រៃវែង', provinceEn: 'Prey Veng', nameKm: 'ក្រុងព្រៃវែង', nameEn: 'Prey Veng City', postalCode: '140101', type: 'city' },
            { id: 'pv-2', provinceCode: '14000', provinceKm: 'ខេត្តព្រៃវែង', provinceEn: 'Prey Veng', nameKm: 'ស្រុកស្វាយអន្ធរ', nameEn: 'Svay Antor', postalCode: '141101', type: 'district' },

            // Svay Rieng (20000)
            { id: 'sr-r1', provinceCode: '20000', provinceKm: 'ខេត្តស្វាយរៀង', provinceEn: 'Svay Rieng', nameKm: 'ក្រុងស្វាយរៀង', nameEn: 'Svay Rieng City', postalCode: '200101', type: 'city' },
            { id: 'sr-r2', provinceCode: '20000', provinceKm: 'ខេត្តស្វាយរៀង', provinceEn: 'Svay Rieng', nameKm: 'ក្រុងបាវិត', nameEn: 'Bavet City', postalCode: '200801', type: 'city' },

            // Banteay Meanchey (01000)
            { id: 'bm-1', provinceCode: '01000', provinceKm: 'ខេត្តបន្ទាយមានជ័យ', provinceEn: 'Banteay Meanchey', nameKm: 'ក្រុងសិរីសោភ័ណ', nameEn: 'Serei Saophoan City', postalCode: '010101', type: 'city' },
            { id: 'bm-2', provinceCode: '01000', provinceKm: 'ខេត្តបន្ទាយមានជ័យ', provinceEn: 'Banteay Meanchey', nameKm: 'ក្រុងប៉ោយប៉ែត', nameEn: 'Poipet City', postalCode: '010901', type: 'city' },

            // Pursat (15000)
            { id: 'ps-1', provinceCode: '15000', provinceKm: 'ខេត្តពោធិ៍សាត់', provinceEn: 'Pursat', nameKm: 'ក្រុងពោធិ៍សាត់', nameEn: 'Pursat City', postalCode: '150101', type: 'city' },

            // Kratie (10000)
            { id: 'kr-1', provinceCode: '10000', provinceKm: 'ខេត្តក្រចេះ', provinceEn: 'Kratie', nameKm: 'ក្រុងក្រចេះ', nameEn: 'Kratie City', postalCode: '100101', type: 'city' },

            // Koh Kong (09000)
            { id: 'kk-1', provinceCode: '09000', provinceKm: 'ខេត្តកោះកុង', provinceEn: 'Koh Kong', nameKm: 'ក្រុងខេមរភូមិន្ទ', nameEn: 'Khemara Phoumin City', postalCode: '090101', type: 'city' },

            // Stung Treng (19000)
            { id: 'st-1', provinceCode: '19000', provinceKm: 'ខេត្តស្ទឹងត្រែង', provinceEn: 'Stung Treng', nameKm: 'ក្រុងស្ទឹងត្រែង', nameEn: 'Stung Treng City', postalCode: '190101', type: 'city' },

            // Mondulkiri (11000)
            { id: 'mk-1', provinceCode: '11000', provinceKm: 'ខេត្តមណ្ឌលគិរី', provinceEn: 'Mondulkiri', nameKm: 'ក្រុងសែនមនោរម្យ', nameEn: 'Sen Monorom City', postalCode: '110101', type: 'city' },

            // Ratanakiri (16000)
            { id: 'rk-1', provinceCode: '16000', provinceKm: 'ខេត្តរតនគិរី', provinceEn: 'Ratanakiri', nameKm: 'ក្រុងបានលុង', nameEn: 'Banlung City', postalCode: '160101', type: 'city' },

            // Preah Vihear (13000)
            { id: 'pvh-1', provinceCode: '13000', provinceKm: 'ខេត្តព្រះវិហារ', provinceEn: 'Preah Vihear', nameKm: 'ក្រុងត្បែងមានជ័យ', nameEn: 'Tbeng Meanchey City', postalCode: '130101', type: 'city' },

            // Otdar Meanchey (22000)
            { id: 'omc-1', provinceCode: '22000', provinceKm: 'ខេត្តឧត្តរមានជ័យ', provinceEn: 'Otdar Meanchey', nameKm: 'ក្រុងសំរោង', nameEn: 'Samraong City', postalCode: '220101', type: 'city' },

            // Kep (23000)
            { id: 'kep-1', provinceCode: '23000', provinceKm: 'ខេត្តកែប', provinceEn: 'Kep', nameKm: 'ក្រុងកែប', nameEn: 'Kep City', postalCode: '230101', type: 'city' },

            // Pailin (24000)
            { id: 'pl-1', provinceCode: '24000', provinceKm: 'ខេត្តប៉ៃលិន', provinceEn: 'Pailin', nameKm: 'ក្រុងប៉ៃលិន', nameEn: 'Pailin City', postalCode: '240101', type: 'city' },

            // Tboung Khmum (25000)
            { id: 'tkm-1', provinceCode: '25000', provinceKm: 'ខេត្តត្បូងឃ្មុំ', provinceEn: 'Tboung Khmum', nameKm: 'ក្រុងសួង', nameEn: 'Suong City', postalCode: '250101', type: 'city' }
        ];

        // Emergency Numbers
        const emergencyList = [
            {
                nameKm: 'នគរបាលចរាចរណ៍ជាតិ',
                nameEn: 'National Traffic Police',
                phone: '1288',
                category: 'TRAFFIC',
                icon: '🚦',
                descKm: 'សម្រាប់រាយការណ៍គ្រោះថ្នាក់ចរាចរណ៍ ឬការកកស្ទះលើផ្លូវជាតិ',
                descEn: 'Report road accidents and severe traffic issues'
            },
            {
                nameKm: 'ខ្សែទូរស័ព្ទជំនួយកុមារកម្ពុជា',
                nameEn: 'Child Helpline Cambodia',
                phone: '1280',
                category: 'CHILD',
                icon: '🧒',
                descKm: 'ប្រឹក្សា និងជួយសង្គ្រោះកុមាររងអំពើហិង្សា ឬការរំលោភបំពាន',
                descEn: 'Support and counseling for child abuse and rights protection'
            },
            {
                nameKm: 'នគរបាលប្រឆាំងការជួញដូរមនុស្ស',
                nameEn: 'Anti-Human Trafficking Hotline',
                phone: '1284',
                category: 'SECURITY',
                icon: '🛡️',
                descKm: 'រាយការណ៍អំពើជួញដូរមនុស្ស និងពលកម្មកុមារបន្ទាន់',
                descEn: 'Report human trafficking and forced labor emergencies'
            },
            {
                nameKm: 'ក្រសួងសុខាភិបាល (CDC)',
                nameEn: 'Ministry of Health Disease Control',
                phone: '115',
                category: 'HEALTH',
                icon: '🏥',
                descKm: 'រាយការណ៍ជំងឺឆ្លងរាតត្បាត និងព័ត៌មានសុខាភិបាលជាតិ',
                descEn: 'Information on infectious outbreaks and nationwide health'
            },
            {
                nameKm: 'នគរបាលទេសចរណ៍ភ្នំពេញ',
                nameEn: 'Phnom Penh Tourist Police',
                phone: '023 724 793',
                category: 'TOURISM',
                icon: '🗺️',
                descKm: 'ជួយសម្របសម្រួលភ្ញៀវទេសចរជាតិ និងអន្តរជាតិជួបបញ្ហា',
                descEn: 'Assistance for domestic and international travelers'
            },
            {
                nameKm: 'កាកបាទក្រហមកម្ពុជា',
                nameEn: 'Cambodian Red Cross',
                phone: '023 212 876',
                category: 'AID',
                icon: '⛑️',
                descKm: 'សង្គ្រោះគ្រោះមហន្តរាយធម្មជាតិ ទឹកជំនន់ និងអំណោយសប្បុរសធម៌',
                descEn: 'Natural disaster response and humanitarian relief'
            },
            {
                nameKm: 'អគ្គិសនីកម្ពុជា (EDC)',
                nameEn: 'Electricite du Cambodge (EDC)',
                phone: '1298',
                category: 'UTILITY',
                icon: '⚡',
                descKm: 'រាយការណ៍ដាច់ចរន្តអគ្គិសនី ឬគ្រោះថ្នាក់បណ្តាញភ្លើង',
                descEn: 'Report power outages and electrical hazards'
            },
            {
                nameKm: 'រដ្ឋាករទឹកស្វយ័តក្រុងភ្នំពេញ (PPWSA)',
                nameEn: 'Phnom Penh Water Supply',
                phone: '023 724 046',
                category: 'UTILITY',
                icon: '💧',
                descKm: 'រាយការណ៍បែកទុយោទឹកស្អាត ឬបញ្ហាផ្គត់ផ្គង់ទឹក',
                descEn: 'Clean water supply emergencies and pipe leaks'
            }
        ];

        // Filtered Districts
        const filteredDistricts = computed(() => {
            let list = allDistricts;

            if (selectedProvince.value !== 'ALL') {
                list = list.filter(item => item.provinceCode === selectedProvince.value);
            }

            if (searchQuery.value.trim()) {
                const q = searchQuery.value.toLowerCase().trim();
                list = list.filter(item => 
                    item.nameKm.toLowerCase().includes(q) ||
                    item.nameEn.toLowerCase().includes(q) ||
                    item.provinceKm.toLowerCase().includes(q) ||
                    item.provinceEn.toLowerCase().includes(q) ||
                    item.postalCode.includes(q)
                );
            }

            return list;
        });

        // Copy Code
        const copyCode = async (code, id) => {
            try {
                await navigator.clipboard.writeText(code);
                copiedId.value = id;
                setTimeout(() => {
                    if (copiedId.value === id) copiedId.value = null;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        };

        return {
            isKhmer,
            activeTab,
            searchQuery,
            selectedProvince,
            topProvinces,
            filteredDistricts,
            copiedId,
            copyCode,
            emergencyList
        };
    }
};
</script>
