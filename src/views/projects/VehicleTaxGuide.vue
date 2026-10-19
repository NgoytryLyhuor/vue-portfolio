<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white shadow-2xl border border-blue-500/20">
                <!-- Background decorative elements -->
                <div class="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
                <div class="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

                <div class="relative z-10 p-5 sm:p-8 lg:p-10">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold border border-white/20">
                                <span>🇰🇭</span>
                                <span>{{ isKhmer ? 'ក្រសួងសាធារណការ (MPWT) & អគ្គនាយកដ្ឋានពន្ធដារ (GDT)' : 'Cambodia MPWT & GDT Vehicle Compliance' }}</span>
                            </div>
                            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                                {{ isKhmer ? 'មគ្គុទ្ទេសក៍ពន្ធយានយន្ត និងឆៀកឡាននៅកម្ពុជា' : 'Cambodia Vehicle Tax & Technical Inspection Guide' }}
                            </h1>
                            <p class="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ការណែនាំពេញលេញសម្រាប់ម្ចាស់រថយន្តថ្មី៖ កាលបរិច្ឆេទបង់ពន្ធផ្លូវ ទីតាំង និងធនាគារដៃគូ កាលវិភាគឆៀកឡាន ការផាកពិន័យចរាចរណ៍ និងម៉ាស៊ីនគណនាប្រាក់ពន្ធជាក់ស្តែង។' 
                                    : 'A comprehensive handbook for vehicle owners in Cambodia: Annual road tax schedule, payment locations, technical inspection (Chheak) rules, traffic fines, and instant cost calculators.' }}
                            </p>
                        </div>

                        <!-- Current Season Status Pill -->
                        <div class="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-semibold text-blue-200">{{ isKhmer ? 'រដូវកាលបង់ពន្ធផ្លូវ' : 'Road Tax Season' }}</span>
                                <span class="px-2 py-0.5 rounded-full text-[11px] font-bold"
                                    :class="isTaxSeasonActive ? 'bg-emerald-400/30 text-emerald-200 border border-emerald-400/40' : 'bg-amber-400/30 text-amber-200 border border-amber-400/40'">
                                    {{ isTaxSeasonActive ? (isKhmer ? 'កំពុងប្រមូលពន្ធ' : 'Active Period') : (isKhmer ? 'រដូវកាលបិទ' : 'Off Season') }}
                                </span>
                            </div>
                            <div class="text-lg font-bold text-white">
                                {{ isKhmer ? '០១ មិថុនា - ៣០ វិច្ឆិកា' : 'June 1 – November 30' }}
                            </div>
                            <p class="text-xs text-blue-100/80">
                                {{ isTaxSeasonActive 
                                    ? (isKhmer ? 'កំពុងបើកដំណើរការបង់ពន្ធតាមធនាគារ និង GDT Taxpayer App!' : 'Tax collection is open online and at partner banks!') 
                                    : (isKhmer ? 'ក្រោយថ្ងៃ ៣០ វិច្ឆិកា នគរបាលចរាចរណ៍ត្រួតពិនិត្យ និងផាកពិន័យទ្វេដងលើផ្លូវ!' : 'Post-deadline traffic police inspections incur a 100% fine on unpaid tax.') }}
                            </p>
                        </div>
                    </div>

                    <!-- Navigation Sub-tabs -->
                    <div class="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-2">
                        <button v-for="tab in tabs" :key="tab.id"
                            @click="activeTab = tab.id"
                            class="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2"
                            :class="activeTab === tab.id 
                                ? 'bg-white text-blue-900 shadow-lg scale-102' 
                                : 'bg-white/10 text-white/90 hover:bg-white/20'">
                            <span>{{ tab.icon }}</span>
                            <span>{{ isKhmer ? tab.labelKhmer : tab.labelEn }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- TAB 1: CALCULATOR (ម៉ាស៊ីនគណនាពន្ធ និងថ្លៃសេវា) -->
            <div v-show="activeTab === 'calc'" class="space-y-6 sm:space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    
                    <!-- Left Column: Inputs & Selector -->
                    <div class="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                        <div>
                            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="text-2xl">🧮</span>
                                <span>{{ isKhmer ? 'ម៉ាស៊ីនគណនាពន្ធផ្លូវ និងតម្លៃសេវាឆៀក' : 'Tax & Inspection Fee Calculator' }}</span>
                            </h2>
                            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ជ្រើសរើសព័ត៌មានរថយន្តរបស់អ្នក ដើម្បីគណនាពន្ធផ្លូវប្រចាំឆ្នាំ ថ្លៃសេវាឆៀក និងពន្ធប្រថាប់ត្រាផ្ទេរកម្មសិទ្ធិ' : 'Configure your vehicle specifications to estimate road tax, inspection fees, and transfer stamp duties.' }}
                            </p>
                        </div>

                        <!-- 1. Vehicle Type Selection -->
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                {{ isKhmer ? '១. ប្រភេទយានយន្ត' : '1. Vehicle Type' }}
                            </label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                <button v-for="type in vehicleTypes" :key="type.id"
                                    @click="selectedType = type.id"
                                    class="p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between"
                                    :class="selectedType === type.id 
                                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20' 
                                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'">
                                    <span class="text-2xl mb-1.5">{{ type.icon }}</span>
                                    <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                                        {{ isKhmer ? type.nameKhmer : type.nameEn }}
                                    </div>
                                    <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                        {{ isKhmer ? type.subKhmer : type.subEn }}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Engine Cylinder Displacement (CC) or Power (kW) -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                    {{ isKhmer ? '២. ទំហំស៊ីឡាំងម៉ាស៊ីន (CC)' : '2. Engine Capacity (CC)' }}
                                </label>
                                <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    {{ selectedCapacityLabel }}
                                </span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <button v-for="cap in capacityOptions" :key="cap.id"
                                    @click="selectedCapacity = cap.id"
                                    class="p-2.5 rounded-xl border text-left transition-all"
                                    :class="selectedCapacity === cap.id 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold' 
                                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'">
                                    <div class="text-xs font-bold">{{ cap.label }}</div>
                                    <div class="text-[10px] opacity-80 truncate">{{ isKhmer ? cap.examplesKhmer : cap.examplesEn }}</div>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Vehicle Manufacturing Year / Age Bracket -->
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                {{ isKhmer ? '៣. ឆ្នាំផលិត ឬអាយុកាលរថយន្ត' : '3. Year of Manufacture / Vehicle Age' }}
                            </label>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <button v-for="age in ageBrackets" :key="age.id"
                                    @click="selectedAge = age.id"
                                    class="p-3 rounded-2xl border text-left transition-all"
                                    :class="selectedAge === age.id 
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20' 
                                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'">
                                    <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                        {{ isKhmer ? age.nameKhmer : age.nameEn }}
                                    </div>
                                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        {{ isKhmer ? age.descKhmer : age.descEn }}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- 4. Ownership Transfer Status (Optional Stamp Duty) -->
                        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="text-lg">📝</span>
                                    <span class="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                                        {{ isKhmer ? 'តើអ្នកទើបទិញឡានមួយទឹក (ផ្ទេរកម្មសិទ្ធិ)?' : 'Buying second-hand car (Ownership Transfer)?' }}
                                    </span>
                                </div>
                                <input type="checkbox" v-model="includeStampDuty" class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            </div>

                            <div v-if="includeStampDuty" class="space-y-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/40">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-amber-900 dark:text-amber-300 font-semibold">
                                        {{ isKhmer ? 'តម្លៃប៉ាន់ស្មានយានយន្ត (ពន្ធប្រថាប់ត្រា ៤%)' : 'Estimated Valuation Base (4% Stamp Duty)' }}
                                    </span>
                                    <span class="font-bold text-amber-900 dark:text-amber-200">${{ estimatedCarValueUsd.toLocaleString() }}</span>
                                </div>
                                <input type="range" v-model.number="estimatedCarValueUsd" min="3000" max="80000" step="500"
                                    class="w-full accent-amber-600 cursor-pointer" />
                                <p class="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                                    {{ isKhmer 
                                        ? 'អនុលោមតាមប្រកាសរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ ការផ្ទេរកម្មសិទ្ធិត្រូវបង់ពន្ធប្រថាប់ត្រា ៤% ផ្អែកលើតារាងតម្លៃគោលរបស់ពន្ធដារ។' 
                                        : 'Ownership transfers require a 4% stamp duty based on GDT market valuation base tables.' }}
                                </p>
                            </div>
                        </div>

                    </div>

                    <!-- Right Column: Live Calculation Breakdown Card -->
                    <div class="lg:col-span-5 space-y-5 sticky top-24">
                        <div class="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-indigo-500/30 space-y-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                                    {{ isKhmer ? 'លទ្ធផលនៃការគណនាប៉ាន់ស្មាន' : 'Estimated Cost Summary' }}
                                </div>
                                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                                    {{ isKhmer ? 'ផ្លូវការនៅកម្ពុជា' : 'Official Rates' }}
                                </span>
                            </div>

                            <!-- Primary Highlight: Annual Road Tax -->
                            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                                <div class="text-xs text-indigo-200 flex items-center justify-between">
                                    <span>{{ isKhmer ? 'ពន្ធផ្លូវប្រចាំឆ្នាំ (Annual Road Tax)' : 'Annual Road Tax' }}</span>
                                    <span class="text-[11px] opacity-75">{{ isKhmer ? 'បង់រៀងរាល់ឆ្នាំ' : 'Yearly' }}</span>
                                </div>
                                <div class="flex items-baseline justify-between">
                                    <div class="text-3xl sm:text-4xl font-black text-amber-300">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(calculatedRoadTaxKhr)) : formatKhr(calculatedRoadTaxKhr) }} ៛
                                    </div>
                                    <div class="text-sm font-semibold text-white/80">
                                        ≈ ${{ (calculatedRoadTaxKhr / 4000).toFixed(2) }}
                                    </div>
                                </div>
                                <div class="text-[11px] text-white/70">
                                    {{ isKhmer 
                                        ? 'ផុតកំណត់ថ្ងៃ ៣០ វិច្ឆិកា ជារៀងរាល់ឆ្នាំ។ ក្រោយកាលបរិច្ឆេទនេះ នឹងរងការពិន័យស្មើនឹង ១០០% នៃប្រាក់ពន្ធ!' 
                                        : 'Due by Nov 30 annually. Unpaid tax after deadline incurs a 100% fine.' }}
                                </div>
                            </div>

                            <!-- Secondary Row: Technical Inspection Fee & Cycle -->
                            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                                <div class="text-xs text-indigo-200 flex items-center justify-between">
                                    <span>{{ isKhmer ? 'ថ្លៃសេវាឆៀកឡាន (Technical Inspection)' : 'Technical Inspection Fee' }}</span>
                                    <span class="text-[11px] font-semibold text-emerald-300">{{ inspectionCycleLabel }}</span>
                                </div>
                                <div class="flex items-baseline justify-between">
                                    <div class="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(calculatedInspectionFeeKhr)) : formatKhr(calculatedInspectionFeeKhr) }} ៛
                                    </div>
                                    <div class="text-sm font-semibold text-white/80">
                                        ≈ ${{ (calculatedInspectionFeeKhr / 4000).toFixed(2) }}
                                    </div>
                                </div>
                                <div class="text-[11px] text-white/70">
                                    {{ isKhmer ? 'ពិន័យយឺតយ៉ាវ៖ ៥០០ រៀល / ថ្ងៃ គិតចាប់ពីថ្ងៃផុតកំណត់លើសន្លឹកឆៀក!' : 'Late inspection penalty: 500 KHR/day past sticker expiration.' }}
                                </div>
                            </div>

                            <!-- Transfer Stamp Duty if enabled -->
                            <div v-if="includeStampDuty" class="p-4 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 space-y-1">
                                <div class="text-xs text-amber-200 flex items-center justify-between">
                                    <span>{{ isKhmer ? 'ពន្ធប្រថាប់ត្រាផ្ទេរកម្មសិទ្ធិ ៤%' : '4% Ownership Transfer Stamp Duty' }}</span>
                                    <span class="text-[11px] text-amber-300">{{ isKhmer ? 'បង់តែម្តងពេលទិញ' : 'One-time' }}</span>
                                </div>
                                <div class="flex items-baseline justify-between">
                                    <div class="text-2xl font-bold text-amber-300">
                                        ${{ (estimatedCarValueUsd * 0.04).toLocaleString() }}
                                    </div>
                                    <div class="text-xs text-white/80">
                                        ≈ {{ isKhmer ? toKhmerNumeral(formatKhr(estimatedCarValueUsd * 0.04 * 4000)) : formatKhr(estimatedCarValueUsd * 0.04 * 4000) }} ៛
                                    </div>
                                </div>
                            </div>

                            <!-- Total Estimated Upkeep -->
                            <div class="pt-4 border-t border-white/20 flex items-center justify-between">
                                <div>
                                    <div class="text-xs font-semibold text-indigo-200">{{ isKhmer ? 'សរុបការចំណាយចាំបាច់' : 'Total Required Outlay' }}</div>
                                    <div class="text-[11px] text-white/60">{{ isKhmer ? 'ពន្ធផ្លូវ + ថ្លៃឆៀកដំបូង' : 'Road tax + initial inspection' }}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xl sm:text-2xl font-black text-white">
                                        ≈ ${{ ((calculatedRoadTaxKhr + calculatedInspectionFeeKhr) / 4000 + (includeStampDuty ? estimatedCarValueUsd * 0.04 : 0)).toFixed(2) }}
                                    </div>
                                    <div class="text-[11px] text-indigo-300">
                                        {{ isKhmer ? toKhmerNumeral(formatKhr(calculatedRoadTaxKhr + calculatedInspectionFeeKhr + (includeStampDuty ? estimatedCarValueUsd * 0.04 * 4000 : 0))) : formatKhr(calculatedRoadTaxKhr + calculatedInspectionFeeKhr + (includeStampDuty ? estimatedCarValueUsd * 0.04 * 4000 : 0)) }} ៛
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Pro-Tip Box -->
                        <div class="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-slate-800/60 border border-blue-200 dark:border-slate-700 space-y-2">
                            <div class="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300">
                                <span>💡</span>
                                <span>{{ isKhmer ? 'គន្លឹះសំខាន់សម្រាប់ម្ចាស់រថយន្តថ្មី' : 'Pro Tip for New Car Owners' }}</span>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'រថយន្តអគ្គិសនី (EV) ទទួលបានការបញ្ចុះពន្ធផ្លូវ ៥០% ពីរាជរដ្ឋាភិបាលកម្ពុជា! ឯទោចក្រយានយន្តកម្លាំងក្រោម ១២៥cc ត្រូវបានលើកលែងពន្ធផ្លូវទាំងស្រុង។' 
                                    : 'Pure Electric Vehicles (EV) enjoy a 50% road tax discount from the Royal Government! Motorcycles under 125cc are 100% tax-exempt.' }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- TAB 2: DUE DATE TRACKER & PENALTY CHECKER (ឧបករណ៍តាមដានថ្ងៃផុតកំណត់ និងផាកពិន័យ) -->
            <div v-show="activeTab === 'tracker'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                    <div>
                        <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span class="text-2xl">⏱️</span>
                            <span>{{ isKhmer ? 'ឧបករណ៍ពិនិត្យកាលបរិច្ឆេទផុតកំណត់ និងការផាកពិន័យយឺតយ៉ាវ' : 'Expiration Tracker & Late Fine Calculator' }}</span>
                        </h2>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {{ isKhmer 
                                ? 'បញ្ចូលកាលបរិច្ឆេទឆៀកចុងក្រោយដែលបានបោះពុម្ពលើកញ្ចក់រថយន្តរបស់អ្នក ដើម្បីពិនិត្យថ្ងៃផុតកំណត់ និងគណនាប្រាក់ពិន័យបើហួសកាលបរិច្ឆេទ' 
                                : 'Enter the inspection date from your windshield sticker to check remaining validity and calculate potential late penalties.' }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <!-- Date Input -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                                {{ isKhmer ? 'កាលបរិច្ឆេទឆៀកលើកចុងក្រោយ' : 'Last Inspection Date' }}
                            </label>
                            <input type="date" v-model="trackerDate"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span class="text-[11px] text-slate-400">
                                {{ isKhmer ? 'មើលលើសន្លឹកវិញ្ញាបនបត្រ ឬតែមឆៀកលើកញ្ចក់' : 'Check date printed on your windshield certificate' }}
                            </span>
                        </div>

                        <!-- Vehicle Status -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                                {{ isKhmer ? 'ស្ថានភាពរថយន្ត' : 'Vehicle Condition' }}
                            </label>
                            <select v-model="trackerVehicleCondition"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="used">{{ isKhmer ? 'រថយន្តប្រើប្រាស់ទូទៅ (សុពលភាព ២ ឆ្នាំ)' : 'Personal Used Car (2 Years Validity)' }}</option>
                                <option value="brand_new">{{ isKhmer ? 'រថយន្តថ្មីខ្លាញ់គោ (សុពលភាព ៤ ឆ្នាំដំបូង)' : 'Brand New Car (4 Years Initial Validity)' }}</option>
                                <option value="commercial">{{ isKhmer ? 'រថយន្តប្រកបអាជីវកម្ម / ដឹកទំនិញ (សុពលភាព ១ ឆ្នាំ)' : 'Commercial / Cargo (1 Year Validity)' }}</option>
                            </select>
                        </div>

                        <!-- Last Road Tax Year -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                                {{ isKhmer ? 'ឆ្នាំបង់ពន្ធផ្លូវចុងក្រោយ' : 'Last Road Tax Paid Year' }}
                            </label>
                            <select v-model="trackerRoadTaxYear"
                                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option :value="currentYear">{{ currentYear }} ({{ isKhmer ? 'បានបង់រួចរាល់' : 'Paid' }})</option>
                                <option :value="currentYear - 1">{{ currentYear - 1 }} ({{ isKhmer ? 'មិនទាន់បង់ឆ្នាំនេះ' : 'Pending This Year' }})</option>
                                <option :value="currentYear - 2">{{ currentYear - 2 }} ({{ isKhmer ? 'ខកខាន ២ ឆ្នាំ' : '2 Years Behind' }})</option>
                            </select>
                        </div>
                    </div>

                    <!-- Tracker Result Display -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <!-- Inspection Status Card -->
                        <div class="p-5 rounded-2xl border transition-all"
                            :class="inspectionStatusClasses">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2">
                                    <span class="text-2xl">{{ inspectionStatusIcon }}</span>
                                    <div class="font-bold text-sm sm:text-base">
                                        {{ isKhmer ? 'ស្ថានភាពឆៀកឡាន (Technical Inspection)' : 'Inspection Status' }}
                                    </div>
                                </div>
                                <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                                    :class="inspectionStatusBadgeClass">
                                    {{ inspectionStatusText }}
                                </span>
                            </div>

                            <div class="space-y-2 text-xs sm:text-sm">
                                <div class="flex justify-between">
                                    <span class="opacity-80">{{ isKhmer ? 'កាលបរិច្ឆេទផុតកំណត់៖' : 'Expiration Date:' }}</span>
                                    <span class="font-bold">{{ formattedInspectionExpiry }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="opacity-80">{{ isKhmer ? 'គម្លាតពេលវេលា៖' : 'Time Remaining:' }}</span>
                                    <span class="font-bold">{{ inspectionDaysRemainingText }}</span>
                                </div>
                                
                                <!-- Late penalty calculation if overdue -->
                                <div v-if="inspectionDaysOverdue > 0" class="pt-2 border-t border-red-300 dark:border-red-800 mt-2">
                                    <div class="flex justify-between font-extrabold text-red-600 dark:text-red-400">
                                        <span>{{ isKhmer ? 'ប្រាក់ពិន័យយឺតយ៉ាវ (៥០០៛/ថ្ងៃ)៖' : 'Accumulated Late Fine (500៛/day):' }}</span>
                                        <span>{{ isKhmer ? toKhmerNumeral(formatKhr(inspectionDaysOverdue * 500)) : formatKhr(inspectionDaysOverdue * 500) }} ៛</span>
                                    </div>
                                    <p class="text-[11px] text-red-500 dark:text-red-400 mt-1">
                                        {{ isKhmer 
                                            ? 'យោងតាមច្បាប់ចរាចរណ៍ផ្លូវគោក ក្រៅពីប្រាក់ពិន័យ ៥០០រៀល/ថ្ងៃនៅមណ្ឌលឆៀក ប្រសិនបើបើកបរលើផ្លូវសាធារណៈនឹងត្រូវនគរបាលផាកពិន័យពី ១៥០,០០០ ដល់ ៣០០,០០០ រៀលបន្ថែម!' 
                                            : 'Besides the 500 KHR/day inspection center delay fee, driving with expired inspection on public roads risks a 150,000–300,000 KHR traffic police fine!' }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Road Tax Status Card -->
                        <div class="p-5 rounded-2xl border transition-all"
                            :class="roadTaxStatusClasses">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-2">
                                    <span class="text-2xl">{{ roadTaxStatusIcon }}</span>
                                    <div class="font-bold text-sm sm:text-base">
                                        {{ isKhmer ? 'ស្ថានភាពពន្ធផ្លូវ (Annual Road Tax)' : 'Road Tax Status' }}
                                    </div>
                                </div>
                                <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                                    :class="roadTaxStatusBadgeClass">
                                    {{ roadTaxStatusText }}
                                </span>
                            </div>

                            <div class="space-y-2 text-xs sm:text-sm">
                                <div class="flex justify-between">
                                    <span class="opacity-80">{{ isKhmer ? 'ឆ្នាំបង់ពន្ធ៖' : 'Tax Year:' }}</span>
                                    <span class="font-bold">{{ currentYear }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="opacity-80">{{ isKhmer ? 'កាលបរិច្ឆេទឱសានវាទ៖' : 'Official Deadline:' }}</span>
                                    <span class="font-bold">{{ isKhmer ? '៣០ វិច្ឆិកា ' + toKhmerNumeral(currentYear) : 'November 30, ' + currentYear }}</span>
                                </div>
                                <div class="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                                    <p class="leading-relaxed">
                                        {{ roadTaxGuidanceText }}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- TAB 3: STEP-BY-STEP NEW CAR OWNER GUIDE (មគ្គុទ្ទេសក៍ជាក់ស្តែង) -->
            <div v-show="activeTab === 'guide'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                    <div>
                        <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span class="text-2xl">🚗</span>
                            <span>{{ isKhmer ? 'មគ្គុទ្ទេសក៍ ៤ ជំហានជាក់ស្តែង សម្រាប់អ្នកទើបមានរថយន្តលើកដំបូង' : '4-Step Practical Checklist for New Car Owners' }}</span>
                        </h2>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {{ isKhmer 
                                ? 'តើត្រូវធ្វើដូចម្តេចខ្លះពេលទើបមានរថយន្ត? នេះជាកម្រងព័ត៌មានលម្អិតពីកាតគ្រី ឆៀក ពន្ធផ្លូវ និងឯកសារត្រូវទុកក្នុងរថយន្តជានិច្ច' 
                                : 'Essential walkthrough for first-time vehicle buyers in Cambodia: registrations, inspection stickers, tax payments, and glovebox documents.' }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <div v-for="step in beginnerSteps" :key="step.number"
                            class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3.5 hover:shadow-md transition-all">
                            <div class="flex items-center justify-between">
                                <span class="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                                    {{ isKhmer ? toKhmerNumeral(step.number) : step.number }}
                                </span>
                                <span class="text-2xl">{{ step.icon }}</span>
                            </div>
                            <h3 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                                {{ isKhmer ? step.titleKhmer : step.titleEn }}
                            </h3>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer ? step.descKhmer : step.descEn }}
                            </p>
                            <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs">
                                <div class="font-bold text-blue-600 dark:text-blue-400">
                                    {{ isKhmer ? '📌 ចំណុចសំខាន់៖' : '📌 Crucial Requirement:' }}
                                </div>
                                <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs">
                                    <li v-for="(item, i) in (isKhmer ? step.pointsKhmer : step.pointsEn)" :key="i">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 4: INSPECTION CENTERS & PAYMENT LOCATIONS (ទីតាំងមណ្ឌលឆៀក និងបណ្តាញបង់ពន្ធ) -->
            <div v-show="activeTab === 'locations'" class="space-y-6 sm:space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    
                    <!-- Left: Technical Inspection Centers -->
                    <div class="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span>🏢</span>
                                    <span>{{ isKhmer ? 'មណ្ឌលត្រួតពិនិត្យលក្ខណៈបច្ចេកទេស (មណ្ឌលឆៀក)' : 'Official MPWT Inspection Centers' }}</span>
                                </h3>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {{ isKhmer ? 'ទីតាំងមណ្ឌលឆៀកផ្លូវការរបស់ក្រសួងសាធារណការនៅភ្នំពេញ និងតាមបណ្តាខេត្ត' : 'Certified MPWT vehicle testing stations in Phnom Penh and provinces.' }}
                                </p>
                            </div>
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shrink-0">
                                {{ isKhmer ? '៨:០០ ព្រឹក - ៥:០០ ល្ងាច' : '8:00 AM - 5:00 PM' }}
                            </span>
                        </div>

                        <div class="space-y-3">
                            <div v-for="(center, idx) in inspectionCenters" :key="idx"
                                class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:border-blue-300 transition-all space-y-2">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                        {{ isKhmer ? center.nameKhmer : center.nameEn }}
                                    </div>
                                    <span class="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                                        {{ isKhmer ? center.cityKhmer : center.cityEn }}
                                    </span>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                    <span>📍</span>
                                    <span>{{ isKhmer ? center.addressKhmer : center.addressEn }}</span>
                                </p>
                                <div class="flex items-center gap-4 text-xs font-medium text-blue-600 dark:text-blue-400 pt-1">
                                    <span class="flex items-center gap-1">
                                        <span>📞</span>
                                        <span>{{ center.phone }}</span>
                                    </span>
                                    <span v-if="center.features" class="text-slate-400 dark:text-slate-500 text-[11px] truncate">
                                        • {{ isKhmer ? center.featuresKhmer : center.featuresEn }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Online Booking Note -->
                        <div class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between gap-3">
                            <div>
                                <span class="font-bold">{{ isKhmer ? '🌐 កក់លេខកាតឆៀកតាមអនឡាញ៖' : '🌐 Book Inspection Online:' }}</span>
                                <span class="block text-[11px] text-indigo-700 dark:text-indigo-300 mt-0.5">
                                    techinspection.mpwt.gov.kh
                                </span>
                            </div>
                            <a href="https://techinspection.mpwt.gov.kh" target="_blank" rel="noopener noreferrer"
                                class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all shrink-0">
                                {{ isKhmer ? 'ចូលទៅកាន់' : 'Open' }} ↗
                            </a>
                        </div>
                    </div>

                    <!-- Right: Bank Payment Channels & GDT App -->
                    <div class="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
                        <div>
                            <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span>🏦</span>
                                <span>{{ isKhmer ? 'ធនាគារដៃគូ និងកម្មវិធី GDT Taxpayer' : 'Partner Banks & GDT App' }}</span>
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {{ isKhmer ? 'កន្លែង និងមធ្យោបាយបង់ពន្ធផ្លូវផ្លូវការ' : 'Official channels to settle annual road tax in Cambodia.' }}
                            </p>
                        </div>

                        <!-- GDT Taxpayer App Highlight -->
                        <div class="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-2.5 shadow-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
                                    📱
                                </div>
                                <div class="min-w-0">
                                    <div class="font-bold text-sm">GDT Taxpayer App</div>
                                    <div class="text-[11px] text-blue-100">
                                        {{ isKhmer ? 'កម្មវិធីទូរស័ព្ទរបស់អគ្គនាយកដ្ឋានពន្ធដារ' : 'Official GDT Mobile Application' }}
                                    </div>
                                </div>
                            </div>
                            <p class="text-xs text-blue-100/90 leading-relaxed">
                                {{ isKhmer 
                                    ? 'អាចស្កេនកាតគ្រីយានយន្ត បង់ពន្ធតាមអនឡាញ និងជ្រើសរើសឲ្យដឹកជញ្ជូនតែមពន្ធផ្លូវមកដល់ផ្ទះ ឬទៅយកនៅសាខាពន្ធដារ!' 
                                    : 'Scan your vehicle QR, pay taxes online, and request home delivery of your road tax sticker.' }}
                            </p>
                        </div>

                        <!-- Partner Bank List -->
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500">
                                {{ isKhmer ? 'ធនាគារដៃគូផ្លូវការ (បង់នៅបញ្ជរ ឬតាម Mobile Banking)' : 'Official Partner Banks' }}
                            </label>
                            <div class="grid grid-cols-2 gap-2 text-xs">
                                <div v-for="bank in partnerBanks" :key="bank.name"
                                    class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2">
                                    <span class="text-base">{{ bank.icon }}</span>
                                    <span class="font-bold text-slate-800 dark:text-slate-200 truncate">{{ bank.name }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Tax Hotline Contact -->
                        <div class="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>☎️</span>
                                <span>{{ isKhmer ? 'លេខទូរស័ព្ទទំនាក់ទំនងសាកសួរពន្ធដារ' : 'Official Support Hotlines' }}</span>
                            </div>
                            <div class="text-slate-600 dark:text-slate-300 space-y-1 text-[11px]">
                                <div>• {{ isKhmer ? 'អគ្គនាយកដ្ឋានពន្ធដារ (GDT Hotline)៖ ' : 'GDT Tax Support: ' }} <strong class="text-blue-600 dark:text-blue-400">1121</strong></div>
                                <div>• {{ isKhmer ? 'ក្រសួងសាធារណការ (MPWT Hotline)៖ ' : 'MPWT Public Works: ' }} <strong class="text-blue-600 dark:text-blue-400">1275</strong></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- TAB 5: TRAFFIC POLICE FINES (ការផាកពិន័យចរាចរណ៍ - អនុក្រឹត្យ ៣៩) -->
            <div v-show="activeTab === 'fines'" class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                    <div>
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span class="text-2xl">👮‍♂️</span>
                                <span>{{ isKhmer ? 'តារាងផាកពិន័យចរាចរណ៍ពាក់ព័ន្ធយានយន្ត (អនុក្រឹត្យលេខ ៣៩)' : 'Road Traffic Police Penalties (Sub-Decree No. 39)' }}</span>
                            </h2>
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                {{ isKhmer ? 'ផាកពិន័យតាមផ្លូវ' : 'Roadside Enforcement' }}
                            </span>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {{ isKhmer 
                                ? 'កម្រិតប្រាក់ពិន័យផ្លូវការរបស់នគរបាលចរាចរណ៍ផ្លូវគោក ដែលម្ចាស់រថយន្តគ្រប់រូបត្រូវដឹង ដើម្បីការពារសិទ្ធិ និងគោរពច្បាប់' 
                                : 'Official monetary fines enforced by traffic police under Cambodian traffic regulations.' }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="(fine, idx) in trafficFines" :key="idx"
                            class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                            <div class="flex items-start justify-between gap-2">
                                <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                    {{ isKhmer ? fine.offenseKhmer : fine.offenseEn }}
                                </div>
                                <span class="text-xl shrink-0">{{ fine.icon }}</span>
                            </div>
                            <div class="text-base sm:text-lg font-black text-red-600 dark:text-red-400">
                                {{ isKhmer ? fine.fineKhmer : fine.fineEn }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                {{ isKhmer ? fine.detailsKhmer : fine.detailsEn }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Disclaimer & Authority References -->
            <div class="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div>
                    {{ isKhmer 
                        ? 'ទិន្នន័យត្រូវបានចងក្រងផ្អែកលើអនុក្រឹត្យលេខ ៣៩ ស្តីពីការពិន័យអន្តរកាលចរាចរណ៍ផ្លូវគោក និងប្រកាសប្រមូលពន្ធមធ្យោបាយដឹកជញ្ជូនរបស់អគ្គនាយកដ្ឋានពន្ធដារ (GDT)។' 
                        : 'Information compiled in accordance with Sub-Decree No. 39 on Road Traffic Penalties and General Department of Taxation (GDT) annual vehicle tax schedules.' }}
                </div>
                <div class="text-[11px] text-slate-400 dark:text-slate-500">
                    {{ isKhmer ? 'រៀបចំដោយ Ngoytry Lyhuor សម្រាប់ប្រជាពលរដ្ឋ និងម្ចាស់យានយន្តនៅកម្ពុជា' : 'Crafted by Ngoytry Lyhuor for vehicle owners across Cambodia' }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'VehicleTaxGuide',
    setup() {
        const { isKhmer } = useLanguage();

        const activeTab = ref('calc');

        // Calculator state
        const selectedType = ref('sedan');
        const selectedCapacity = ref('1500');
        const selectedAge = ref('over10');
        const includeStampDuty = ref(false);
        const estimatedCarValueUsd = ref(12000);

        // Tracker state
        const trackerDate = ref(new Date().toISOString().split('T')[0]);
        const trackerVehicleCondition = ref('used');
        const currentYear = new Date().getFullYear();
        const trackerRoadTaxYear = ref(currentYear);

        const tabs = [
            { id: 'calc', icon: '🧮', labelKhmer: 'ម៉ាស៊ីនគណនាពន្ធ & ឆៀក', labelEn: 'Tax Calculator' },
            { id: 'tracker', icon: '⏱️', labelKhmer: 'ពិនិត្យថ្ងៃផុតកំណត់ & ផាកពិន័យ', labelEn: 'Due Date Tracker' },
            { id: 'guide', icon: '🚗', labelKhmer: 'មគ្គុទ្ទេសក៍ម្ចាស់ឡានថ្មី', labelEn: 'New Owner Guide' },
            { id: 'locations', icon: '🏢', labelKhmer: 'មណ្ឌលឆៀក & ធនាគារ', labelEn: 'Centers & Banks' },
            { id: 'fines', icon: '👮‍♂️', labelKhmer: 'ការផាកពិន័យចរាចរណ៍', labelEn: 'Traffic Fines' }
        ];

        const vehicleTypes = [
            { id: 'sedan', icon: '🚗', nameKhmer: 'ទេសចរណ៍ / គ្រួសារ', nameEn: 'Sedan / Hatchback', subKhmer: 'ក្រោម ៩ កៅអី', subEn: 'Under 9 seats' },
            { id: 'suv', icon: '🚙', nameKhmer: 'SUV / Crossover', nameEn: 'SUV / Crossover', subKhmer: 'ឡានខ្ពស់ / ទេសចរណ៍', subEn: 'Family SUV' },
            { id: 'pickup', icon: '🛻', nameKhmer: 'ភីកអាប់ (Pick-up)', nameEn: 'Pick-up Truck', subKhmer: 'Ford, Hilux, etc.', subEn: 'Payload < 1 Ton' },
            { id: 'ev', icon: '⚡', nameKhmer: 'អគ្គិសនីសុទ្ធ (EV)', nameEn: 'Pure Electric (EV)', subKhmer: 'បញ្ចុះពន្ធ ៥០%', subEn: '50% Tax Discount' },
            { id: 'truck_light', icon: '🚚', nameKhmer: 'ដឹកទំនិញស្រាល', nameEn: 'Light Truck', subKhmer: 'ក្រោម ៣.៥ តោន', subEn: 'Under 3.5 Tons' },
            { id: 'truck_heavy', icon: '🚛', nameKhmer: 'ដឹកទំនិញធ្ងន់', nameEn: 'Heavy Truck', subKhmer: 'លើស ៣.៥ តោន', subEn: 'Over 3.5 Tons' },
            { id: 'bus', icon: '🚌', nameKhmer: 'ដឹកអ្នកដំណើរ', nameEn: 'Bus / Van', subKhmer: '១២-២៥ កៅអី', subEn: '12-25 Seats' },
            { id: 'moto', icon: '🏍️', nameKhmer: 'ម៉ូតូ / ម៉ូតូធំ', nameEn: 'Motorcycle', subKhmer: 'លើស ១២៥cc', subEn: '> 125cc' }
        ];

        const capacityOptions = [
            { id: 'under1000', label: '< 1,000 cc', examplesKhmer: 'Morning, i10, Wuling', examplesEn: 'Small city cars' },
            { id: '1500', label: '1,000 – 1,500 cc', examplesKhmer: 'Vios, Yaris, Swift, Prius 1.5', examplesEn: 'Vios, Yaris, Prius 1.5' },
            { id: '2000', label: '1,501 – 2,000 cc', examplesKhmer: 'Camry 2.0, Prius 1.8, Civic, Cross', examplesEn: 'Camry 2.0, Prius 1.8, Civic' },
            { id: '3000', label: '2,001 – 3,000 cc', examplesKhmer: 'Highlander, RX300/350, Ranger', examplesEn: 'Highlander, RX300, Ranger' },
            { id: '4000', label: '3,001 – 4,000 cc', examplesKhmer: 'Prado 4.0, 4Runner, Tundra', examplesEn: 'Prado, 4Runner, V6' },
            { id: 'over4000', label: '> 4,000 cc', examplesKhmer: 'LX570, Land Cruiser V8, G63', examplesEn: 'LX570, Land Cruiser V8' }
        ];

        const ageBrackets = [
            { id: 'under5', nameKhmer: 'ក្រោម ៥ ឆ្នាំ', nameEn: '< 5 Years Old', descKhmer: 'ផលិតចាប់ពីឆ្នាំ ២០២១ ឡើងទៅ', descEn: 'Manufactured 2021+' },
            { id: '5to10', nameKhmer: '៥ ទៅ ១០ ឆ្នាំ', nameEn: '5 – 10 Years Old', descKhmer: 'ផលិតឆ្នាំ ២០១៥ ដល់ ២០២០', descEn: 'Manufactured 2015 – 2020' },
            { id: 'over10', nameKhmer: 'លើសពី ១០ ឆ្នាំ', nameEn: '> 10 Years Old', descKhmer: 'ផលិតមុនឆ្នាំ ២០១៥ (Prius, RX...)', descEn: 'Manufactured before 2015' }
        ];

        const isTaxSeasonActive = computed(() => {
            const now = new Date();
            const month = now.getMonth(); // 0-indexed (5 = June, 10 = Nov)
            return month >= 5 && month <= 10;
        });

        const selectedCapacityLabel = computed(() => {
            const opt = capacityOptions.find(c => c.id === selectedCapacity.value);
            return opt ? opt.label : '';
        });

        // Official GDT Annual Road Tax calculation based on CC & Age
        const calculatedRoadTaxKhr = computed(() => {
            if (selectedType.value === 'moto') {
                return 20000;
            }

            let base = 100000;
            switch (selectedCapacity.value) {
                case 'under1000':
                    base = selectedAge.value === 'under5' ? 100000 : selectedAge.value === '5to10' ? 80000 : 60000;
                    break;
                case '1500':
                    base = selectedAge.value === 'under5' ? 150000 : selectedAge.value === '5to10' ? 120000 : 100000;
                    break;
                case '2000':
                    base = selectedAge.value === 'under5' ? 250000 : selectedAge.value === '5to10' ? 200000 : 150000;
                    break;
                case '3000':
                    base = selectedAge.value === 'under5' ? 450000 : selectedAge.value === '5to10' ? 350000 : 250000;
                    break;
                case '4000':
                    base = selectedAge.value === 'under5' ? 800000 : selectedAge.value === '5to10' ? 600000 : 400000;
                    break;
                case 'over4000':
                    base = selectedAge.value === 'under5' ? 2000000 : selectedAge.value === '5to10' ? 1600000 : 1200000;
                    break;
            }

            if (selectedType.value === 'ev') {
                base = Math.round(base * 0.5); // 50% discount for EVs
            } else if (selectedType.value === 'truck_heavy') {
                base = Math.max(base, 500000);
            } else if (selectedType.value === 'bus') {
                base = Math.max(base, 300000);
            }

            return base;
        });

        // Official MPWT Technical Inspection Fee
        const calculatedInspectionFeeKhr = computed(() => {
            switch (selectedType.value) {
                case 'moto':
                    return 0;
                case 'sedan':
                case 'suv':
                case 'ev':
                    return 54000;
                case 'pickup':
                case 'truck_light':
                    return 63000;
                case 'truck_heavy':
                    return 120000;
                case 'bus':
                    return 84000;
                default:
                    return 54000;
            }
        });

        const inspectionCycleLabel = computed(() => {
            if (selectedType.value === 'moto') return isKhmer.value ? 'មិនតម្រូវឆៀក' : 'No Inspection';
            if (selectedAge.value === 'under5') return isKhmer.value ? 'រៀងរាល់ ៤ ឆ្នាំ (ឡានថ្មី)' : 'Every 4 Years (New)';
            if (selectedType.value === 'truck_heavy' || selectedType.value === 'bus') return isKhmer.value ? 'រៀងរាល់ ៦ ខែ / ១ ឆ្នាំ' : 'Every 6-12 Months';
            return isKhmer.value ? 'រៀងរាល់ ២ ឆ្នាំម្តង' : 'Every 2 Years';
        });

        // Tracker calculation
        const inspectionExpirationDate = computed(() => {
            if (!trackerDate.value) return new Date();
            const d = new Date(trackerDate.value);
            if (trackerVehicleCondition.value === 'brand_new') {
                d.setFullYear(d.getFullYear() + 4);
            } else if (trackerVehicleCondition.value === 'commercial') {
                d.setFullYear(d.getFullYear() + 1);
            } else {
                d.setFullYear(d.getFullYear() + 2);
            }
            return d;
        });

        const formattedInspectionExpiry = computed(() => {
            const exp = inspectionExpirationDate.value;
            if (isKhmer.value) {
                const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
                return `${toKhmerNumeral(exp.getDate())} ${months[exp.getMonth()]} ${toKhmerNumeral(exp.getFullYear())}`;
            }
            return exp.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        });

        const inspectionDiffDays = computed(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const exp = new Date(inspectionExpirationDate.value);
            exp.setHours(0, 0, 0, 0);
            const diffTime = exp.getTime() - today.getTime();
            return Math.round(diffTime / (1000 * 60 * 60 * 24));
        });

        const inspectionDaysOverdue = computed(() => {
            return inspectionDiffDays.value < 0 ? Math.abs(inspectionDiffDays.value) : 0;
        });

        const inspectionDaysRemainingText = computed(() => {
            const diff = inspectionDiffDays.value;
            if (diff > 0) {
                return isKhmer.value ? `នៅសល់ ${toKhmerNumeral(diff)} ថ្ងៃទៀត` : `${diff} days remaining`;
            } else if (diff === 0) {
                return isKhmer.value ? 'ផុតកំណត់ថ្ងៃនេះ!' : 'Expires today!';
            }
            return isKhmer.value ? `ហួសកាលកំណត់ ${toKhmerNumeral(Math.abs(diff))} ថ្ងៃ` : `Expired ${Math.abs(diff)} days ago`;
        });

        const inspectionStatusText = computed(() => {
            const diff = inspectionDiffDays.value;
            if (diff > 30) return isKhmer.value ? 'មានសុពលភាព' : 'Valid';
            if (diff >= 0) return isKhmer.value ? 'ជិតដល់ថ្ងៃផុតកំណត់' : 'Due Soon';
            return isKhmer.value ? 'ហួសសុពលភាព' : 'Expired';
        });

        const inspectionStatusClasses = computed(() => {
            const diff = inspectionDiffDays.value;
            if (diff > 30) return 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200';
            if (diff >= 0) return 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200';
            return 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200';
        });

        const inspectionStatusBadgeClass = computed(() => {
            const diff = inspectionDiffDays.value;
            if (diff > 30) return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300';
            if (diff >= 0) return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300';
            return 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300';
        });

        const inspectionStatusIcon = computed(() => {
            const diff = inspectionDiffDays.value;
            if (diff > 30) return '✅';
            if (diff >= 0) return '⚠️';
            return '🚨';
        });

        const roadTaxStatusClasses = computed(() => {
            if (trackerRoadTaxYear.value === currentYear) {
                return 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200';
            }
            if (isTaxSeasonActive.value) {
                return 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200';
            }
            return 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200';
        });

        const roadTaxStatusBadgeClass = computed(() => {
            if (trackerRoadTaxYear.value === currentYear) {
                return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300';
            }
            if (isTaxSeasonActive.value) {
                return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300';
            }
            return 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300';
        });

        const roadTaxStatusIcon = computed(() => {
            if (trackerRoadTaxYear.value === currentYear) return '🛡️';
            if (isTaxSeasonActive.value) return '📅';
            return '⚠️';
        });

        const roadTaxStatusText = computed(() => {
            if (trackerRoadTaxYear.value === currentYear) {
                return isKhmer.value ? 'បានបង់រួច' : 'Paid';
            }
            if (isTaxSeasonActive.value) {
                return isKhmer.value ? 'ដល់រដូវកាលបង់ពន្ធ' : 'Action Required';
            }
            return isKhmer.value ? 'យឺតយ៉ាវ / ប្រឈមការពិន័យ' : 'Overdue / Fine Risk';
        });

        const roadTaxGuidanceText = computed(() => {
            if (trackerRoadTaxYear.value === currentYear) {
                return isKhmer.value 
                    ? 'អ្នកបានបង់ពន្ធផ្លូវឆ្នាំនេះរួចរាល់ហើយ! សូមបិទតែមពន្ធផ្លូវលើកញ្ចក់រថយន្តខាងមុខឲ្យបានត្រឹមត្រូវ។' 
                    : 'You have paid the road tax for this year. Keep the tax sticker affixed to your windshield.';
            }
            if (isTaxSeasonActive.value) {
                return isKhmer.value 
                    ? 'រដូវកាលប្រមូលពន្ធកំពុងបើកដំណើរការ! សូមបង់ពន្ធតាម GDT Taxpayer App ឬធនាគារដៃគូមុនថ្ងៃ ៣០ វិច្ឆិកា ដើម្បីជៀសវាងការពិន័យ។' 
                    : 'The collection window is active. Settle via GDT Taxpayer App or partner banks before Nov 30 to avoid 100% fine.';
            }
            return isKhmer.value 
                ? 'កាលបរិច្ឆេទឱសានវាទបានកន្លងផុត! នគរបាលចរាចរណ៍នឹងផាកពិន័យស្មើនឹង ១០០% នៃប្រាក់ពន្ធត្រូវបង់ + ប្រាក់ពន្ធដើម។' 
                : 'The deadline has passed. Late payments incur a statutory 100% fine on top of the original tax.';
        });

        const beginnerSteps = [
            {
                number: 1,
                icon: '🪪',
                titleKhmer: 'ពិនិត្យកាតគ្រី និងស្លាកលេខរថយន្ត',
                titleEn: 'Check Vehicle ID Card (Katkri) & Plates',
                descKhmer: 'កាតគ្រីគឺជាអត្តសញ្ញាណប័ណ្ណផ្លូវការរបស់រថយន្ត។ សូមពិនិត្យមើលលេខតួ (VIN) លេខម៉ាស៊ីន ទំហំស៊ីឡាំង (CC) និងឈ្មោះម្ចាស់កម្មសិទ្ធិ។',
                descEn: 'The Vehicle Registration Card is your car’s official ID. Confirm the Chassis/VIN number, engine displacement (CC), and owner name.',
                pointsKhmer: [
                    'ត្រូវប្រាកដថាទទួលបានកាតគ្រីច្បាប់ដើមពីអ្នកលក់',
                    'ពិនិត្យទំហំស៊ីឡាំង (CC) ដើម្បីដឹងថ្លៃពន្ធផ្លូវ',
                    'ត្រូវថតចម្លង (Copy) ទុកក្នុងឡានជានិច្ច'
                ],
                pointsEn: [
                    'Ensure you receive the original vehicle ID card from seller',
                    'Confirm engine CC to know your annual tax bracket',
                    'Keep a certified copy inside the glovebox at all times'
                ]
            },
            {
                number: 2,
                icon: '🔧',
                titleKhmer: 'យកឡានទៅឆៀក (ត្រួតពិនិត្យលក្ខណៈបច្ចេកទេស)',
                titleEn: 'Complete Technical Inspection (Chheak)',
                descKhmer: 'រថយន្តប្រើប្រាស់ផ្ទាល់ខ្លួនត្រូវយកទៅឆៀករៀងរាល់ ២ ឆ្នាំម្តង (ឡានថ្មី ៤ឆ្នាំដំបូង) នៅមណ្ឌលឆៀកផ្លូវការរបស់ក្រសួងសាធារណការ។',
                descEn: 'Personal vehicles must undergo technical inspection every 2 years (4 years for brand-new cars) at MPWT certified centers.',
                pointsKhmer: [
                    'ឯកសារយកទៅ៖ កាតគ្រីច្បាប់ដើម + លុយ ៥៤,០០០ រៀល',
                    'គេត្រួតពិនិត្យ៖ ហ្វ្រាំង ចង្កូត ភ្លើងកូដ-ហ្វា-ស៊ីញ៉ូ សំបកកង់ ផ្សែងពុល',
                    'បិទតែមឆៀកនៅកៀនកញ្ចក់រថយន្តខាងមុខ',
                    'ពិន័យ ៥០០ រៀល/ថ្ងៃ បើឆៀកហួសកាលកំណត់'
                ],
                pointsEn: [
                    'Bring: Original Vehicle ID card + 54,000 KHR fee',
                    'Testing items: Brakes, steering, high/low beams, tires, exhaust',
                    'Affix the sticker to the top corner of the front windshield',
                    'Overdue fine: 500 KHR/day past expiration date'
                ]
            },
            {
                number: 3,
                icon: '🧾',
                titleKhmer: 'បង់ពន្ធផ្លូវប្រចាំឆ្នាំ (១ មិថុនា - ៣០ វិច្ឆិកា)',
                titleEn: 'Pay Annual Road Tax (June 1 – Nov 30)',
                descKhmer: 'ពន្ធលើមធ្យោបាយដឹកជញ្ជូនត្រូវបង់ជារៀងរាល់ឆ្នាំនៅចន្លោះខែមិថុនា ដល់ខែវិច្ឆិកា។ អាចបង់តាម ABA, Acleda, Canadia, Wing ឬ GDT App។',
                descEn: 'Vehicle road tax must be settled annually between June 1 and Nov 30 via partner banks or the GDT Taxpayer mobile app.',
                pointsKhmer: [
                    'ឯកសារយកទៅ៖ កាតគ្រី + លិខិតឆៀកមានសុពលភាព + បង្កាន់ដៃពន្ធចាស់',
                    'ក្រោយបង់រួច នឹងទទួលបានតែមពន្ធផ្លូវពណ៌ប្រចាំឆ្នាំ',
                    'បិទតែមពន្ធផ្លូវលើកញ្ចក់មុខ ជិតតែមឆៀក',
                    'ក្រោយថ្ងៃ ៣០ វិច្ឆិកា នគរបាលផាកពិន័យទ្វេដងលើផ្លូវ'
                ],
                pointsEn: [
                    'Required: Vehicle ID copy + valid inspection slip + old tax slip',
                    'Receive color-coded annual road tax windshield sticker',
                    'Affix beside the technical inspection sticker on windshield',
                    'After Nov 30, traffic police enforce 100% penalty on road'
                ]
            },
            {
                number: 4,
                icon: '📁',
                titleKhmer: 'ឯកសារត្រូវទុកក្នុងរថយន្តជានិច្ច',
                titleEn: 'Essential Documents in Your Car at All Times',
                descKhmer: 'នៅពេលបើកបរលើផ្លូវសាធារណៈនៅកម្ពុជា អ្នកត្រូវមានឯកសារសំខាន់ៗ ៤ ជាប់ក្នុងរថយន្តជានិច្ច ដើម្បីបង្ហាញជូនសមត្ថកិច្ចពេលត្រួតពិនិត្យ។',
                descEn: 'Whenever driving in Cambodia, always store these four vital documents inside your vehicle glovebox to avoid roadside penalties.',
                pointsKhmer: [
                    '១. ប័ណ្ណបើកបរមានសុពលភាព (Driver License)',
                    '២. កាតគ្រីរថយន្ត (ច្បាប់ដើម ឬច្បាប់ថតចម្លងមានបញ្ជាក់)',
                    '៣. វិញ្ញាបនបត្រឆៀកឡាន (សន្លឹកឆៀកច្បាប់ដើម)',
                    '៤. បង្កាន់ដៃបង់ពន្ធផ្លូវចុងក្រោយ (Tax Receipt)'
                ],
                pointsEn: [
                    '1. Valid Cambodian Driver’s License',
                    '2. Vehicle Registration Card (Original or certified copy)',
                    '3. Valid Technical Inspection Certificate',
                    '4. Latest Annual Road Tax receipt & sticker'
                ]
            }
        ];

        const inspectionCenters = [
            {
                nameKhmer: 'មណ្ឌលឆៀកបឹងបៃតង (Camko City)',
                nameEn: 'Boeng Baitong Inspection Center (Camko)',
                cityKhmer: 'ភ្នំពេញ',
                cityEn: 'Phnom Penh',
                addressKhmer: 'ផ្លូវលេខ ១៩៦២ សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ (ជិត Camko City)',
                addressEn: 'Street 1962, Sangkat Phnom Penh Thmey, Khan Sen Sok',
                phone: '012 990 222 / 023 888 888',
                featuresKhmer: 'មានគន្លងឆៀក ៤ គន្លង ទូលាយ និងរហ័ស',
                featuresEn: '4 inspection lanes, fast processing'
            },
            {
                nameKhmer: 'មណ្ឌលឆៀកជ្រោយចង្វារ',
                nameEn: 'Chrouy Changvar Inspection Center',
                cityKhmer: 'ភ្នំពេញ',
                cityEn: 'Phnom Penh',
                addressKhmer: 'ផ្លូវជាតិលេខ ៦A សង្កាត់ព្រែកលៀប ខណ្ឌជ្រោយចង្វារ',
                addressEn: 'National Road 6A, Sangkat Prek Lieb, Khan Chrouy Changvar',
                phone: '012 888 777',
                featuresKhmer: 'ងាយស្រួលសម្រាប់អ្នកនៅប៉ែកខាងកើតទន្លេសាប',
                featuresEn: 'Convenient for NR6A commuters'
            },
            {
                nameKhmer: 'មណ្ឌលឆៀកស្ទឹងមានជ័យ (ផ្សារដីហុយ)',
                nameEn: 'Stung Meanchey Inspection Center',
                cityKhmer: 'ភ្នំពេញ',
                cityEn: 'Phnom Penh',
                addressKhmer: 'ផ្លូវ ២១៧ សង្កាត់ស្ទឹងមានជ័យ ខណ្ឌមានជ័យ',
                addressEn: 'Street 217, Sangkat Stung Meanchey, Khan Meanchey',
                phone: '012 555 333',
                featuresKhmer: 'មណ្ឌលចាស់ទុំ បម្រើសេវាយូរឆ្នាំ',
                featuresEn: 'Established hub with full heavy-vehicle testing'
            },
            {
                nameKhmer: 'មណ្ឌលឆៀកខេត្តសៀមរាប',
                nameEn: 'Siem Reap Technical Inspection Center',
                cityKhmer: 'សៀមរាប',
                cityEn: 'Siem Reap',
                addressKhmer: 'ផ្លូវជាតិលេខ ៦ ក្រុងសៀមរាប',
                addressEn: 'National Road 6, Krong Siem Reap',
                phone: '063 760 000',
                featuresKhmer: 'បម្រើសេវាខេត្តសៀមរាប និងខេត្តជិតខាង',
                featuresEn: 'Serving Siem Reap and surrounding provinces'
            },
            {
                nameKhmer: 'មណ្ឌលឆៀកខេត្តបាត់ដំបង',
                nameEn: 'Battambang Technical Inspection Center',
                cityKhmer: 'បាត់ដំបង',
                cityEn: 'Battambang',
                addressKhmer: 'ផ្លូវជាតិលេខ ៥ ក្រុងបាត់ដំបង',
                addressEn: 'National Road 5, Krong Battambang',
                phone: '053 952 000',
                featuresKhmer: 'មណ្ឌលធំប្រចាំតំបន់ពាយព្យ',
                featuresEn: 'Major hub for North-West Cambodia'
            },
            {
                nameKhmer: 'មណ្ឌលឆៀកខេត្តព្រះសីហនុ',
                nameEn: 'Preah Sihanouk Inspection Center',
                cityKhmer: 'ព្រះសីហនុ',
                cityEn: 'Preah Sihanouk',
                addressKhmer: 'ផ្លូវជាតិលេខ ៤ ក្រុងព្រះសីហនុ',
                addressEn: 'National Road 4, Krong Preah Sihanouk',
                phone: '034 933 000',
                featuresKhmer: 'បម្រើរថយន្តដឹកកុងតឺន័រ និងរថយន្តទេសចរណ៍',
                featuresEn: 'Full support for container haulers & passenger cars'
            }
        ];

        const partnerBanks = [
            { name: 'ABA Bank', icon: '🏦' },
            { name: 'ACLEDA Bank', icon: '🏛️' },
            { name: 'Canadia Bank', icon: '🏢' },
            { name: 'Wing Bank', icon: '💳' },
            { name: 'Sathapana Bank', icon: '🏦' },
            { name: 'FTB Bank', icon: '🏛️' },
            { name: 'Campu Bank', icon: '🏢' },
            { name: 'J Trust Royal Bank', icon: '💳' }
        ];

        const trafficFines = [
            {
                icon: '🚨',
                offenseKhmer: 'អត់តែមពន្ធផ្លូវ ឬមិនបានបង់ពន្ធផ្លូវ',
                offenseEn: 'Driving Without Valid Road Tax Sticker',
                fineKhmer: 'ពិន័យ ១០០% នៃប្រាក់ពន្ធ',
                fineEn: '100% fine on unpaid tax amount',
                detailsKhmer: 'ត្រូវបង់ប្រាក់ពិន័យស្មើនឹង ១០០% នៃប្រាក់ពន្ធត្រូវបង់ បូករួមជាមួយប្រាក់ពន្ធដើម និងកាតព្វកិច្ចបិទតែមពន្ធ។',
                detailsEn: 'Liable for 100% statutory penalty plus original tax fee and mandatory sticker collection.'
            },
            {
                icon: '🛠️',
                offenseKhmer: 'ឆៀកហួសសុពលភាព (Expired Chheak)',
                offenseEn: 'Driving with Expired Inspection Sticker',
                fineKhmer: '១៥០,០០០ - ៣០០,០០០ រៀល',
                fineEn: '150,000 – 300,000 KHR (~$37 - $75)',
                detailsKhmer: 'ផាកពិន័យតាមផ្លូវដោយនគរបាលចរាចរណ៍ បូកបន្ថែមប្រាក់ពិន័យ ៥០០រៀល/ថ្ងៃ នៅពេលយកឡានទៅឆៀក។',
                detailsEn: 'Roadside police fine under Sub-Decree 39 plus 500 KHR per day delay fine at inspection station.'
            },
            {
                icon: '🪪',
                offenseKhmer: 'អត់កាតគ្រីយានយន្ត (Missing Vehicle ID)',
                offenseEn: 'Driving without Vehicle Registration Card',
                fineKhmer: '១២០,០០០ - ១៨០,០០០ រៀល',
                fineEn: '120,000 – 180,000 KHR (~$30 - $45)',
                detailsKhmer: 'មិនមានកាតគ្រីច្បាប់ដើម ឬច្បាប់ថតចម្លងបញ្ជាក់ត្រឹមត្រូវបង្ហាញជូនសមត្ថកិច្ច។',
                detailsEn: 'Failure to produce the original or certified copy of the registration certificate.'
            },
            {
                icon: '🎫',
                offenseKhmer: 'អត់ប័ណ្ណបើកបរ (Driving without License)',
                offenseEn: 'Driving without Valid Driver’s License',
                fineKhmer: '១២០,០០០ - ២៤០,០០០ រៀល',
                fineEn: '120,000 – 240,000 KHR (~$30 - $60)',
                detailsKhmer: 'បើកបរដោយគ្មានប័ណ្ណបើកបរ ឬប័ណ្ណបើកបរហួសសុពលភាព។ អាចប្រឈមការឃាត់ទុកយានយន្តបណ្តោះអាសន្ន។',
                detailsEn: 'Driving with an expired license or uncertified class. Vehicle may be temporarily impounded.'
            },
            {
                icon: '🛑',
                offenseKhmer: 'ល្មើសភ្លើងសញ្ញាចរាចរណ៍ (ភ្លើងក្រហម)',
                offenseEn: 'Disobeying Traffic Signal (Red Light)',
                fineKhmer: '១៥០,០០០ រៀល',
                fineEn: '150,000 KHR (~$37.50)',
                detailsKhmer: 'បើកបរឆ្លងកាត់ស្តុបភ្លើងក្រហម ឬមិនឈប់តាមសញ្ញាបង្គាប់របស់នគរបាលចរាចរណ៍។',
                detailsEn: 'Running a red traffic signal light or ignoring authorized officer hand directions.'
            },
            {
                icon: '🎗️',
                offenseKhmer: 'មិនពាក់ខ្សែក្រវ៉ាត់សុវត្ថិភាព',
                offenseEn: 'Failure to Fasten Seatbelt',
                fineKhmer: '៧៥,០០០ រៀល',
                fineEn: '75,000 KHR (~$18.75)',
                detailsKhmer: 'អ្នកបើកបរ និងអ្នករួមដំណើរនៅកៅអីខាងមុខ ត្រូវតែពាក់ខ្សែក្រវ៉ាត់សុវត្ថិភាពជាដាច់ខាត។',
                detailsEn: 'Driver and front-seat passengers must strictly fasten safety belts during transit.'
            }
        ];

        const formatKhr = (val) => {
            return Number(val).toLocaleString();
        };

        const toKhmerNumeral = (num) => {
            const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
            return String(num).split('').map(char => {
                const digit = parseInt(char, 10);
                return isNaN(digit) ? char : khmerDigits[digit];
            }).join('');
        };

        return {
            isKhmer,
            activeTab,
            tabs,
            vehicleTypes,
            selectedType,
            capacityOptions,
            selectedCapacity,
            selectedCapacityLabel,
            ageBrackets,
            selectedAge,
            includeStampDuty,
            estimatedCarValueUsd,
            calculatedRoadTaxKhr,
            calculatedInspectionFeeKhr,
            inspectionCycleLabel,
            isTaxSeasonActive,
            currentYear,
            trackerDate,
            trackerVehicleCondition,
            trackerRoadTaxYear,
            inspectionExpirationDate,
            formattedInspectionExpiry,
            inspectionDiffDays,
            inspectionDaysOverdue,
            inspectionDaysRemainingText,
            inspectionStatusText,
            inspectionStatusClasses,
            inspectionStatusBadgeClass,
            inspectionStatusIcon,
            roadTaxStatusClasses,
            roadTaxStatusBadgeClass,
            roadTaxStatusIcon,
            roadTaxStatusText,
            roadTaxGuidanceText,
            beginnerSteps,
            inspectionCenters,
            partnerBanks,
            trafficFines,
            formatKhr,
            toKhmerNumeral
        };
    }
};
</script>

<style scoped>
/* Smooth transitions */
.scale-102 {
    transform: scale(1.02);
}
</style>
