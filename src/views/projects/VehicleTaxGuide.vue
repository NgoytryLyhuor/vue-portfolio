<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero HUD Section (Modern Tech with subtle ~10px rounded corners) -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ក្រសួងសាធារណការ (MPWT) & អគ្គនាយកដ្ឋានពន្ធដារ (GDT)' : 'CAMBODIA MPWT & GDT VEHICLE COMPLIANCE' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">DATABASE: 75+ CAR MODELS</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">OFFICIAL 2026 TARIFF</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-block px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                                {{ isKhmer ? 'មគ្គុទ្ទេសក៍ផ្លូវការយានយន្ត' : 'CAMBODIA MOTOR VEHICLE REGULATION' }}
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'មគ្គុទ្ទេសក៍ពន្ធយានយន្ត និងឆៀកឡាននៅកម្ពុជា' : 'Cambodia Vehicle Tax & Technical Inspection Guide' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'ការណែនាំពេញលេញសម្រាប់ម្ចាស់រថយន្ត៖ ស្រាវជ្រាវម៉ូដែលឡាន (Prius, RX330, Camry, BYD, EV, ឡានចិន), កាលបរិច្ឆេទបង់ពន្ធផ្លូវ ទីតាំងឆៀកឡាន និងការផាកពិន័យផ្លូវការ។' 
                                    : 'A comprehensive handbook for vehicle owners in Cambodia: Instant car model lookup (Prius, RX, Camry, BYD, EV, China brands), road tax schedules, inspection centers, and traffic fines.' }}
                            </p>
                        </div>

                        <!-- Current Season Status HUD Box -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 lg:w-80 shrink-0">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ isKhmer ? 'រដូវកាលបង់ពន្ធផ្លូវ' : 'Road Tax Season' }}</span>
                                <span class="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md"
                                    :class="isTaxSeasonActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'">
                                    {{ isTaxSeasonActive ? (isKhmer ? 'កំពុងប្រមូលពន្ធ' : 'Active Period') : (isKhmer ? 'រដូវកាលបិទ' : 'Off Season') }}
                                </span>
                            </div>
                            <div class="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                                {{ isKhmer ? '០១ មិថុនា - ៣០ វិច្ឆិកា' : 'June 1 – November 30' }}
                            </div>
                            <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                                {{ isTaxSeasonActive 
                                    ? (isKhmer ? 'កំពុងបើកដំណើរការបង់ពន្ធតាមធនាគារ និង GDT Taxpayer App!' : 'Tax collection is open online and at partner banks!') 
                                    : (isKhmer ? 'ក្រោយថ្ងៃ ៣០ វិច្ឆិកា នគរបាលចរាចរណ៍ត្រួតពិនិត្យ និងផាកពិន័យទ្វេដងលើផ្លូវ!' : 'Post-deadline traffic police inspections incur a 100% fine on unpaid tax.') }}
                            </p>
                        </div>
                    </div>

                    <!-- Navigation Sub-tabs (Subtle Rounded Buttons) -->
                    <div class="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 pb-1.5 -mx-1 px-1">
                        <button v-for="tab in tabs" :key="tab.id"
                            @click="activeTab = tab.id"
                            class="px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider border rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            :class="activeTab === tab.id 
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white' 
                                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'">
                            <span>{{ tab.icon }}</span>
                            <span>{{ isKhmer ? tab.labelKhmer : tab.labelEn }}</span>
                        </button>

                        <!-- Quick Utility Cross-Links -->
                        <router-link to="/fuel-prices"
                            class="px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider border border-orange-300 dark:border-orange-800/80 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 sm:ml-auto">
                            <span>⛽</span>
                            <span>{{ isKhmer ? 'តម្លៃប្រេងសាំង' : 'Fuel Prices' }}</span>
                        </router-link>
                        <router-link to="/traffic-fines"
                            class="px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider border border-rose-300 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0">
                            <span>⚖️</span>
                            <span>{{ isKhmer ? 'ផាកពិន័យចរាចរណ៍' : 'Traffic Fines' }}</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- TAB 1: CALCULATOR & CAR MODEL LOOKUP (ម៉ាស៊ីនគណនាពន្ធ & ស្រាវជ្រាវម៉ូដែលឡាន) -->
            <div v-show="activeTab === 'calc'" class="space-y-6 sm:space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
                    
                    <!-- Left Column: Car Model Search & Inputs -->
                    <div class="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-4 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 sm:space-y-6">
                        
                        <!-- Header & Mode Switcher -->
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span class="text-2xl">🧮</span>
                                    <span>{{ isKhmer ? 'ម៉ាស៊ីនគណនាពន្ធផ្លូវ និងតម្លៃសេវាឆៀក' : 'Tax & Inspection Fee Calculator' }}</span>
                                </h2>
                                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                    {{ isKhmer ? 'ស្វែងរកតាមម៉ូដែលឡានរបស់អ្នក ឬកំណត់លក្ខណៈបច្ចេកទេសដោយផ្ទាល់' : 'Search by your exact car model or specify custom technical specs.' }}
                                </p>
                            </div>

                            <!-- Mode Toggle -->
                            <div class="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0 self-start sm:self-center">
                                <button @click="calcMode = 'model'"
                                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                    :class="calcMode === 'model' 
                                        ? 'bg-blue-600 text-white shadow-sm' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'">
                                    🔍 {{ isKhmer ? 'តាមម៉ូដែលឡាន' : 'By Car Model' }}
                                </button>
                                <button @click="calcMode = 'manual'"
                                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                    :class="calcMode === 'manual' 
                                        ? 'bg-blue-600 text-white shadow-sm' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'">
                                    ⚙️ {{ isKhmer ? 'កំណត់ដោយដៃ' : 'Custom Specs' }}
                                </button>
                            </div>
                        </div>

                        <!-- SECTION A: CAR MODEL SEARCH & SELECTION (When calcMode === 'model') -->
                        <div v-show="calcMode === 'model'" class="space-y-4">
                            <!-- Live Search Input -->
                            <div class="relative">
                                <input v-model.trim="carSearchQuery" type="text"
                                    :placeholder="isKhmer ? '🔍 វាយឈ្មោះម៉ូដែលឡាន (ឧ. Prius 2011, RX330, Atto 3, Binguo, Wildtrak...)' : '🔍 Search car model (e.g. Prius 2011, RX330, Atto 3, Binguo, Wildtrak...)'"
                                    class="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm" />
                                <span class="absolute left-3.5 top-3.5 text-slate-400 text-base">🚗</span>
                                <button v-if="carSearchQuery" @click="carSearchQuery = ''"
                                    class="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold">
                                    ✕
                                </button>
                            </div>

                            <!-- Brand / Category Filter Pills -->
                            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                                <button v-for="cat in carBrandFilters" :key="cat.id"
                                    @click="selectedBrandFilter = cat.id"
                                    class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0"
                                    :class="selectedBrandFilter === cat.id 
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                                    {{ isKhmer ? cat.nameKhmer : cat.nameEn }}
                                </button>
                            </div>

                            <!-- Dropdown Select for Full 75+ Model Catalog -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    {{ isKhmer ? 'ជ្រើសរើសពីបញ្ជីរថយន្តពេញលេញ (Dropdown Selector)' : 'Choose from Complete Model List' }}
                                </label>
                                <select v-model="selectedCarModelId" @change="onCarModelDropdownChange"
                                    class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="" disabled>{{ isKhmer ? '-- សូមជ្រើសរើសម៉ូដែលរថយន្តរបស់អ្នក --' : '-- Select your vehicle model --' }}</option>
                                    <optgroup v-for="group in groupedCarModels" :key="group.brand" :label="group.brand">
                                        <option v-for="car in group.models" :key="car.id" :value="car.id">
                                            {{ car.name }} • {{ isKhmer ? toKhmerNumeral(formatKhr(car.roadTaxKhr)) : formatKhr(car.roadTaxKhr) }} ៛ ({{ car.engineType }})
                                        </option>
                                    </optgroup>
                                </select>
                            </div>

                            <!-- Quick Select Chips for Top Trending Models in Cambodia -->
                            <div class="space-y-1.5 pt-1">
                                <div class="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? '🔥 ម៉ូដែលពេញនិយមចុចមើលភ្លាមៗ (Quick Popular Models):' : '🔥 Popular Trending Models in Cambodia:' }}
                                </div>
                                <div class="flex flex-wrap gap-1.5">
                                    <button v-for="topCar in popularTopCars" :key="topCar.id"
                                        @click="selectCarModel(topCar)"
                                        class="px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all"
                                        :class="selectedCarModel && selectedCarModel.id === topCar.id 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'">
                                        {{ topCar.shortName }} ({{ isKhmer ? toKhmerNumeral(formatKhr(topCar.roadTaxKhr / 1000)) + 'k' : (topCar.roadTaxKhr / 1000) + 'k' }} ៛)
                                    </button>
                                </div>
                            </div>

                            <!-- Search Results Grid / Filtered Models -->
                            <div v-if="carSearchQuery || selectedBrandFilter !== 'all'" class="space-y-2 pt-2">
                                <div class="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <span>{{ isKhmer ? 'លទ្ធផលស្វែងរក (' + toKhmerNumeral(filteredCarModels.length) + ' ម៉ូដែល)' : 'Matching Models (' + filteredCarModels.length + ' found)' }}</span>
                                    <span v-if="filteredCarModels.length === 0" class="text-amber-500 font-bold">{{ isKhmer ? 'មិនឃើញម៉ូដែលនេះទេ! អាចប្តូរទៅកំណត់ដោយដៃ' : 'Not found! Switch to manual mode' }}</span>
                                </div>
                                
                                <div class="max-h-60 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 dark:divide-slate-800">
                                    <div v-for="car in filteredCarModels" :key="car.id"
                                        @click="selectCarModel(car)"
                                        class="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800/80 cursor-pointer transition-all flex items-center justify-between gap-2"
                                        :class="selectedCarModel && selectedCarModel.id === car.id ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-400/50' : ''">
                                        <div class="min-w-0">
                                            <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                                {{ isKhmer ? car.nameKhmer : car.name }}
                                            </div>
                                            <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                                                <span class="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                                                    {{ isKhmer ? car.engineTypeKhmer : car.engineType }}
                                                </span>
                                                <span>{{ isKhmer ? car.displacementKhmer : car.displacement }}</span>
                                                <span>•</span>
                                                <span>{{ isKhmer ? car.yearRangeKhmer : car.yearRange }}</span>
                                            </div>
                                        </div>
                                        <div class="text-right shrink-0">
                                            <div class="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
                                                {{ isKhmer ? toKhmerNumeral(formatKhr(car.roadTaxKhr)) : formatKhr(car.roadTaxKhr) }} ៛
                                            </div>
                                            <div class="text-[10px] text-slate-400">
                                                ≈ ${{ (car.roadTaxKhr / 4000).toFixed(2) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Selected Car Spotlight Card -->
                            <div v-if="selectedCarModel" class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
                                <div class="flex items-start justify-between gap-3">
                                    <div class="space-y-1">
                                        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white">
                                            <span>✓</span>
                                            <span>{{ isKhmer ? 'រថយន្តដែលបានជ្រើសរើស' : 'Selected Vehicle' }}</span>
                                        </div>
                                        <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                                            {{ isKhmer ? selectedCarModel.nameKhmer : selectedCarModel.name }}
                                        </h3>
                                    </div>
                                    <button @click="clearSelectedCarModel"
                                        class="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors shrink-0">
                                        {{ isKhmer ? 'ផ្លាស់ប្តូរ' : 'Change' }}
                                    </button>
                                </div>

                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                    <div class="p-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                                        <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ទំហំម៉ាស៊ីន (CC/kW)' : 'Displacement' }}</div>
                                        <div class="font-bold text-slate-900 dark:text-white mt-0.5">{{ isKhmer ? selectedCarModel.displacementKhmer : selectedCarModel.displacement }}</div>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                                        <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ប្រភេទថាមពល' : 'Powertrain' }}</div>
                                        <div class="font-bold text-slate-900 dark:text-white mt-0.5">{{ isKhmer ? selectedCarModel.engineTypeKhmer : selectedCarModel.engineType }}</div>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                                        <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'អាយុកាលរថយន្ត' : 'Age Bracket' }}</div>
                                        <div class="font-bold text-slate-900 dark:text-white mt-0.5">{{ isKhmer ? selectedCarModel.ageLabelKhmer : selectedCarModel.ageLabelEn }}</div>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                                        <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ isKhmer ? 'ពន្ធផ្លូវប្រចាំឆ្នាំ' : 'Annual Road Tax' }}</div>
                                        <div class="font-black text-amber-600 dark:text-amber-400 mt-0.5">{{ isKhmer ? toKhmerNumeral(formatKhr(selectedCarModel.roadTaxKhr)) : formatKhr(selectedCarModel.roadTaxKhr) }} ៛</div>
                                    </div>
                                </div>

                                <!-- Explanation Note for user's peace of mind -->
                                <div class="p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                    <span class="font-bold text-blue-600 dark:text-blue-400 mr-1">ℹ️ {{ isKhmer ? 'ហេតុអ្វីបង់ថ្លៃនេះ?' : 'Why this rate?' }}</span>
                                    <span>{{ isKhmer ? selectedCarModel.taxExplanationKhmer : selectedCarModel.taxExplanationEn }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- SECTION B: MANUAL CUSTOM INPUTS (When calcMode === 'manual' or when fine-tuning) -->
                        <div v-show="calcMode === 'manual'" class="space-y-6 pt-2">
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
                        </div>

                        <!-- 4. Ownership Transfer Status (Optional 4% Stamp Duty) -->
                        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="text-lg">📝</span>
                                    <span class="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                                        {{ isKhmer ? 'តើអ្នកទើបទិញឡានមួយទឹក (ផ្ទេរកម្មសិទ្ធិ/កាត់ឈ្មោះ)?' : 'Buying second-hand car (Ownership Transfer)?' }}
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
                                <span>{{ isKhmer ? 'គន្លឹះសំខាន់សម្រាប់ម្ចាស់រថយន្ត' : 'Pro Tip for Car Owners' }}</span>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'រថយន្តអគ្គិសនី (EV) ទទួលបានការបញ្ចុះពន្ធផ្លូវ ៥០% ពីរាជរដ្ឋាភិបាលកម្ពុជា! ឯទោចក្រយានយន្តកម្លាំងក្រោម ១២៥cc ត្រូវបានលើកលែងពន្ធផ្លូវទាំងស្រុង។' 
                                    : 'Pure Electric Vehicles (EV) enjoy a 50% road tax discount from the Royal Government! Motorcycles under 125cc are 100% tax-exempt.' }}
                            </p>
                        </div>

                        <!-- Official GDT Road Tax Table Reference Collapsible -->
                        <details class="group rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 p-4 transition-all">
                            <summary class="flex items-center justify-between cursor-pointer list-none font-bold text-xs text-slate-800 dark:text-slate-200 select-none">
                                <span class="flex items-center gap-2">
                                    <span>📜</span>
                                    <span>{{ isKhmer ? 'តារាងអត្រាពន្ធផ្លូវផ្លូវការ (រថយន្តទេសចរណ៍)' : 'Official GDT Road Tax Brackets (Passenger Cars)' }}</span>
                                </span>
                                <span class="text-xs text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div class="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs overflow-x-auto">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="text-[11px] font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                                            <th class="py-2 pr-2">{{ isKhmer ? 'ទំហំស៊ីឡាំង (CC)' : 'Engine (CC)' }}</th>
                                            <th class="py-2 px-2 text-right">{{ isKhmer ? '≤ ៥ ឆ្នាំ' : '≤ 5 Yrs' }}</th>
                                            <th class="py-2 px-2 text-right">{{ isKhmer ? '៥-១០ ឆ្នាំ' : '5-10 Yrs' }}</th>
                                            <th class="py-2 pl-2 text-right text-emerald-600 dark:text-emerald-400 font-black">{{ isKhmer ? '> ១០ ឆ្នាំ' : '> 10 Yrs' }}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                                        <tr>
                                            <td class="py-2 pr-2 font-medium">{{ isKhmer ? 'ដល់ ១,៥០០ cc (Prius Gen 2, Vios)' : '≤ 1,500 cc (Prius Gen 2, Vios)' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '១៥០k ៛' : '150k KHR' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '១០០k ៛' : '100k KHR' }}</td>
                                            <td class="py-2 pl-2 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ isKhmer ? '៨០k ៛' : '80k KHR' }}</td>
                                        </tr>
                                        <tr class="bg-blue-50/60 dark:bg-blue-950/20 font-bold">
                                            <td class="py-2 pr-2 text-blue-700 dark:text-blue-400 flex items-center gap-1">
                                                <span>{{ isKhmer ? '១,៥០១ - ២,០០០ cc' : '1,501 - 2,000 cc' }}</span>
                                                <span class="text-[9px] px-1 rounded bg-blue-600 text-white font-normal">Prius 011</span>
                                            </td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '២០០k ៛' : '200k KHR' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '១៥០k ៛' : '150k KHR' }}</td>
                                            <td class="py-2 pl-2 text-right font-black text-amber-600 dark:text-amber-400">{{ isKhmer ? '១០០k ៛' : '100k KHR' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 pr-2 font-medium">{{ isKhmer ? '២,០០១ - ២,៩០០ cc (Camry 2.4, Highlander)' : '2,001 - 2,900 cc (Camry 2.4, Highlander)' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '៦០០k ៛' : '600k KHR' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '៤០០k ៛' : '400k KHR' }}</td>
                                            <td class="py-2 pl-2 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ isKhmer ? '២៥០k ៛' : '250k KHR' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 pr-2 font-medium">{{ isKhmer ? '២,៩០១ - ៤,០០០ cc (RX330, RX350)' : '2,901 - 4,000 cc (RX330, RX350)' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '១,០០០k ៛' : '1,000k KHR' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '៧០០k ៛' : '700k KHR' }}</td>
                                            <td class="py-2 pl-2 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ isKhmer ? '៦០០k ៛' : '600k KHR' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 pr-2 font-medium">{{ isKhmer ? 'លើស ៤,០០០ cc (LX570, LC200 V8)' : '> 4,000 cc (LX570, LC200 V8)' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '២,០០០k ៛' : '2,000k KHR' }}</td>
                                            <td class="py-2 px-2 text-right">{{ isKhmer ? '១,៥០០k ៛' : '1,500k KHR' }}</td>
                                            <td class="py-2 pl-2 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ isKhmer ? '១,០០០k ៛' : '1,000k KHR' }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p class="mt-2 text-[10px] text-slate-500 dark:text-slate-400 italic">
                                    {{ isKhmer ? 'ប្រភព៖ ប្រកាសស្តីពីការប្រមូលពន្ធលើមធ្យោបាយដឹកជញ្ជូន ក្រសួងសេដ្ឋកិច្ចនិងហិរញ្ញវត្ថុ & អគ្គនាយកដ្ឋានពន្ធដារ (GDT)' : 'Source: Official Prakas on Means of Transportation, MEF & General Department of Taxation (GDT).' }}
                                </p>
                            </div>
                        </details>
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

                    <!-- Link Banner to Full Dedicated Traffic Fines Tool -->
                    <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="space-y-0.5">
                            <div class="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                                <span>⚖️</span>
                                <span>{{ isKhmer ? 'ចង់ស្រាវជ្រាវគ្រប់បទល្មើសទាំងអស់ ៣៥+ និងការកាត់ពិន្ទុប័ណ្ណបើកបរ?' : 'Explore complete 35+ traffic violations & demerit points lookup?' }}</span>
                            </div>
                            <p class="text-[11px] text-rose-700 dark:text-rose-300">
                                {{ isKhmer ? 'ចូលមើលទំព័រស្វែងរកការផាកពិន័យចរាចរណ៍ផ្លូវគោកពេញលេញ (ឡាន ម៉ូតូ ឡានដឹក) ជាមួយតារាងជាតិស្រវឹង និងល្បឿន។' : 'Open the dedicated Traffic Fines portal with search, vehicle filter, and DUI alcohol matrix.' }}
                            </p>
                        </div>
                        <router-link to="/traffic-fines"
                            class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shrink-0 text-center transition-colors shadow-sm">
                            {{ isKhmer ? 'ស្វែងរកការផាកពិន័យពេញលេញ →' : 'Open Fines Portal →' }}
                        </router-link>
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
import { computed, ref, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'VehicleTaxGuide',
    setup() {
        const { isKhmer } = useLanguage();

        const activeTab = ref('calc');
        const calcMode = ref('model'); // 'model' (Search/Select by Car Model) or 'manual'

        // Car model search & filter state
        const carSearchQuery = ref('');
        const selectedBrandFilter = ref('all');
        const selectedCarModelId = ref('prius_gen3'); // Default to user's Prius 2011!
        const selectedCarModel = ref(null);

        // Manual calculator state
        const selectedType = ref('sedan');
        const selectedCapacity = ref('2000');
        const selectedAge = ref('over10');
        const includeStampDuty = ref(false);
        const estimatedCarValueUsd = ref(11500);

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

        const carBrandFilters = [
            { id: 'all', nameKhmer: 'ទាំងអស់ (All 75+)', nameEn: 'All Models (75+)' },
            { id: 'toyota_lexus', nameKhmer: 'Toyota & Lexus', nameEn: 'Toyota & Lexus' },
            { id: 'ev_phev', nameKhmer: '⚡ EV & PHEV (អគ្គិសនី)', nameEn: '⚡ EV & PHEV' },
            { id: 'china', nameKhmer: '🇨🇳 ឡានចិន (BYD, GAC, Deepal...)', nameEn: '🇨🇳 China Brands' },
            { id: 'ford_pickup', nameKhmer: '🛻 Ford & Pick-up', nameEn: '🛻 Ford & Pick-ups' },
            { id: 'budget', nameKhmer: '💵 ពន្ធធូរ (ក្រោម $30)', nameEn: '💵 Low Tax (< $30)' }
        ];

        // 75+ Comprehensive Popular Cars Database in Cambodia
        const carModelsDatabase = [
            // --- TOYOTA PRIUS & HYBRIDS ---
            {
                id: 'prius_gen3',
                name: 'Toyota Prius 2010–2015 (Gen 3 - e.g. 2011)',
                nameKhmer: 'តូយ៉ូតា ព្រូស ២០១០–២០១៥ (Prius 011)',
                shortName: 'Prius 2011 (011)',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2010–2015',
                yearRangeKhmer: 'ឆ្នាំ ២០១០–២០១៥ (រួមទាំង 2011)',
                engineType: 'Hybrid',
                engineTypeKhmer: 'សាំង + អាគុយ អ៊ីប្រ៊ីដ (Hybrid)',
                displacement: '1.8L (1,798 cc)',
                displacementKhmer: '១.៨ លីត្រ (១,៧៩៨ cc)',
                type: 'sedan',
                capacity: '2000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ (ផលិត ២០១១)',
                ageLabelEn: '> 10 Years Old (Mfg. 2011)',
                roadTaxKhr: 100000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 11500,
                taxExplanationKhmer: 'ម៉ូដែល Toyota Prius ឆ្នាំ 2010–2015 (រួមទាំងម៉ូដែលឆ្នាំ 2011 ជាក់ស្តែងរបស់អ្នក) បំពាក់ម៉ាស៊ីន 1.8L (1,798 cc) Dual VVT-i បូកម៉ូទ័រអគ្គិសនី Hybrid ស្ថិតក្នុងកម្រិត 1,501–2,000 cc។ ដោយសាររថយន្តផលិតនៅឆ្នាំ ២០១១ (អាយុកាលលើសពី ១០ ឆ្នាំ) យោងតាមតារាងពន្ធផ្លូវការរបស់អគ្គនាយកដ្ឋានពន្ធដារ (GDT) អត្រាពន្ធផ្លូវប្រចាំឆ្នាំធ្លាក់មកត្រឹមកម្រិត លើសពី ១០ ឆ្នាំ គឺត្រឹមតែ ១០០,០០០ រៀល ប៉ុណ្ណោះ (ពន្ធ ១៥០,០០០ រៀល គឺសម្រាប់តែរថយន្តអាយុ ៥ ដល់ ១០ ឆ្នាំប៉ុណ្ណោះ)។ ដូចនេះក្នុងកម្មវិធី GDT Taxpayer App ជាក់ស្តែង គឺចេញ ១០០,០០០ រៀល ត្រឹមត្រូវ ១០០%។',
                taxExplanationEn: 'Toyota Prius 2010–2015 (including your 2011 model) has a 1.8L (1,798 cc) 2ZR-FXE Dual VVT-i hybrid powertrain. It falls into the 1,501–2,000 cc cylinder capacity bracket. Because it was manufactured in 2011 (now over 10 years old), under official GDT regulations it qualifies for the over-10-years reduced tier of exactly 100,000 KHR (~$25), matching the official GDT Taxpayer App invoice. (The 150,000 KHR tier only applies to cars aged 5–10 years).'
            },
            {
                id: 'prius_gen2',
                name: 'Toyota Prius 2004–2009 (Gen 2)',
                nameKhmer: 'តូយ៉ូតា ព្រូស ២០០៤–២០០៩ (Prius 04-09)',
                shortName: 'Prius 2008 (Gen 2)',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: true,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2004–2009',
                yearRangeKhmer: 'ឆ្នាំ ២០០៤–២០០៩',
                engineType: 'Hybrid',
                engineTypeKhmer: 'សាំង + អ៊ីប្រ៊ីដ (Hybrid)',
                displacement: '1.5L (1,497 cc)',
                displacementKhmer: '១.៥ លីត្រ (១,៤៩៧ cc)',
                type: 'sedan',
                capacity: '1500',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 80000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 7500,
                taxExplanationKhmer: 'Prius Gen 2 មានម៉ាស៊ីនទំហំ 1.5L (1,497 cc) ស្ថិតក្នុងកម្រិតដល់ 1,500 cc។ ដោយសារអាយុកាលលើស ១០ ឆ្នាំ ពន្ធផ្លូវប្រចាំឆ្នាំគឺត្រឹមតែ ៨០,០០០ រៀល (~$20) ប៉ុណ្ណោះ។',
                taxExplanationEn: 'Prius Gen 2 features a 1.5L (1,497 cc) hybrid engine in the up-to-1,500 cc bracket. With age > 10 years, annual road tax is only 80,000 KHR (~$20).'
            },
            {
                id: 'prius_gen4',
                name: 'Toyota Prius 2016–2022 (Gen 4)',
                nameKhmer: 'តូយ៉ូតា ព្រូស ២០១៦–២០២២ (Prius Gen 4)',
                shortName: 'Prius Gen 4',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2016–2022',
                yearRangeKhmer: 'ឆ្នាំ ២០១៦–២០២២',
                engineType: 'Hybrid',
                engineTypeKhmer: 'សាំង + អ៊ីប្រ៊ីដ (Hybrid)',
                displacement: '1.8L (1,798 cc)',
                displacementKhmer: '១.៨ លីត្រ (១,៧៩៨ cc)',
                type: 'sedan',
                capacity: '2000',
                age: '5to10',
                ageLabelKhmer: 'អាយុកាល ៥–១០ ឆ្នាំ',
                ageLabelEn: '5–10 Years Old',
                roadTaxKhr: 150000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 22000,
                taxExplanationKhmer: 'Prius Gen 4 មានទំហំស៊ីឡាំង 1.8L និងអាយុកាលរវាង ៥ ទៅ ១០ ឆ្នាំ ត្រូវបង់ពន្ធផ្លូវ ១៥០,០០០ រៀល ជារៀងរាល់ឆ្នាំ។',
                taxExplanationEn: 'Prius Gen 4 has a 1.8L engine aged 5–10 years, placing it in the 150,000 KHR (~$37.50) tax tier.'
            },
            {
                id: 'prius_gen5',
                name: 'Toyota Prius 2023–2026 (Gen 5)',
                nameKhmer: 'តូយ៉ូតា ព្រូស ២០២៣–២០២៦ (Prius Gen 5)',
                shortName: 'Prius 2024 (Gen 5)',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Hybrid',
                engineTypeKhmer: 'សាំង + អ៊ីប្រ៊ីដ (Hybrid)',
                displacement: '2.0L (1,987 cc)',
                displacementKhmer: '២.០ លីត្រ (១,៩៨៧ cc)',
                type: 'sedan',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តថ្មី < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 42000,
                taxExplanationKhmer: 'Prius Gen 5 ជំនាន់ចុងក្រោយម៉ាស៊ីន 2.0L អាយុកាលក្រោម ៥ ឆ្នាំ ត្រូវបង់ពន្ធផ្លូវ ២០០,០០០ រៀល។',
                taxExplanationEn: 'Latest Gen 5 Prius with 2.0L engine aged under 5 years pays 200,000 KHR (~$50).'
            },

            // --- TOYOTA CAMRY ---
            {
                id: 'camry_2002',
                name: 'Toyota Camry 2002–2006 (បាឡែន)',
                nameKhmer: 'តូយ៉ូតា កាមរី ២០០២–២០០៦ (Camry បាឡែន)',
                shortName: 'Camry 02-06 (បាឡែន)',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2002–2006',
                yearRangeKhmer: 'ឆ្នាំ ២០០២–២០០៦',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង',
                displacement: '2.4L (2,362 cc)',
                displacementKhmer: '២.៤ លីត្រ (២,៣៦២ cc)',
                type: 'sedan',
                capacity: '3000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 9500,
                taxExplanationKhmer: 'Camry បាឡែន ម៉ាស៊ីន 2.4L ស្ថិតក្នុងកម្រិត 2,001–3,000 cc។ ដោយសារអាយុកាលលើស ១០ ឆ្នាំ ពន្ធផ្លូវគឺ ២៥០,០០០ រៀល (~$62.50)។',
                taxExplanationEn: 'Camry 2002–2006 2.4L engine falls into 2,001–3,000 cc. Over 10 years old: 250,000 KHR (~$62.50).'
            },
            {
                id: 'camry_2007',
                name: 'Toyota Camry 2007–2011',
                nameKhmer: 'តូយ៉ូតា កាមរី ២០០៧–២០១១ (Camry 07)',
                shortName: 'Camry 2007',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2007–2011',
                yearRangeKhmer: 'ឆ្នាំ ២០០៧–២០១១',
                engineType: 'Petrol / Hybrid',
                engineTypeKhmer: 'សាំង ឬ អ៊ីប្រ៊ីដ',
                displacement: '2.4L / 2.5L Hybrid',
                displacementKhmer: '២.៤L ឬ ២.៥L អ៊ីប្រ៊ីដ',
                type: 'sedan',
                capacity: '3000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 13000,
                taxExplanationKhmer: 'Camry 2007–2011 ទាំងសាំង 2.4L និង Hybrid 2.5L ស្ថិតក្នុងកម្រិត 2,001–3,000 cc អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវ ២៥០,០០០ រៀល។',
                taxExplanationEn: 'Camry 2007–2011 2.4L / 2.5L Hybrid falls into 2,001–3,000 cc aged > 10 yrs: 250,000 KHR (~$62.50).'
            },
            {
                id: 'camry_2018',
                name: 'Toyota Camry 2018–2024',
                nameKhmer: 'តូយ៉ូតា កាមរី ២០១៨–២០២៤',
                shortName: 'Camry 2020',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2018–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១៨–២០២៤',
                engineType: 'Petrol / Hybrid',
                engineTypeKhmer: 'សាំង ឬ អ៊ីប្រ៊ីដ',
                displacement: '2.5L (2,487 cc)',
                displacementKhmer: '២.៥ លីត្រ (២,៤៨៧ cc)',
                type: 'sedan',
                capacity: '3000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 450000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 38000,
                taxExplanationKhmer: 'Camry 2.5L ស៊េរីថ្មី អាយុកាលក្រោម ៥ ឆ្នាំ ស្ថិតក្នុងកម្រិត ២,០០១ ដល់ ៣,០០០ cc ពន្ធផ្លូវ ៤៥០,០០០ រៀល (~$112.50)។',
                taxExplanationEn: 'Camry 2.5L under 5 years old in 2,001–3,000 cc bracket pays 450,000 KHR (~$112.50).'
            },

            // --- TOYOTA HIGHLANDER ---
            {
                id: 'highlander_2003_4cyl',
                name: 'Toyota Highlander 2001–2007 (2.4L 4-Cyl)',
                nameKhmer: 'តូយ៉ូតា ហាយឡេនឌ័រ ២០០១–២០០៧ (ម៉ាស៊ីន ៤)',
                shortName: 'Highlander 2.4L',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2001–2007',
                yearRangeKhmer: 'ឆ្នាំ ២០០១–២០០៧',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង ៤ ស៊ីឡាំង',
                displacement: '2.4L (2,362 cc)',
                displacementKhmer: '២.៤ លីត្រ (២,៣៦២ cc)',
                type: 'suv',
                capacity: '3000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 11000,
                taxExplanationKhmer: 'Highlander ម៉ាស៊ីន ៤ (2.4L) ស្ថិតក្នុងកម្រិត 2,001–3,000 cc អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវ ២៥០,០០០ រៀល (~$62.50)។',
                taxExplanationEn: 'Highlander 2.4L 4-cylinder in 2,001–3,000 cc bracket, > 10 yrs: 250,000 KHR (~$62.50).'
            },
            {
                id: 'highlander_2003_v6',
                name: 'Toyota Highlander 2001–2007 (3.3L V6 / Hybrid)',
                nameKhmer: 'តូយ៉ូតា ហាយឡេនឌ័រ ២០០១–២០០៧ (ម៉ាស៊ីន ៦ ឬ Hybrid)',
                shortName: 'Highlander 3.3L V6',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2001–2007',
                yearRangeKhmer: 'ឆ្នាំ ២០០១–២០០៧',
                engineType: 'Petrol / Hybrid',
                engineTypeKhmer: 'សាំង V6 ឬ អ៊ីប្រ៊ីដ V6',
                displacement: '3.3L (3,310 cc)',
                displacementKhmer: '៣.៣ លីត្រ V6 (៣,៣១០ cc)',
                type: 'suv',
                capacity: '4000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 400000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 13500,
                taxExplanationKhmer: 'Highlander ម៉ាស៊ីន V6 (3.3L) ស្ថិតក្នុងកម្រិត 3,001–4,000 cc។ ដោយសារអាយុកាលលើស ១០ ឆ្នាំ ពន្ធផ្លូវគឺ ៤០០,០០០ រៀល (~$100)។',
                taxExplanationEn: 'Highlander 3.3L V6 in 3,001–4,000 cc bracket, > 10 yrs: 400,000 KHR (~$100).'
            },
            {
                id: 'highlander_2022',
                name: 'Toyota Highlander 2020–2024 (2.5L Hybrid)',
                nameKhmer: 'តូយ៉ូតា ហាយឡេនឌ័រ ២០២០–២០២៤ (2.5L Hybrid)',
                shortName: 'Highlander 2022',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2020–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០២០–២០២៤',
                engineType: 'Hybrid',
                engineTypeKhmer: 'សាំង + អ៊ីប្រ៊ីដ (Hybrid)',
                displacement: '2.5L (2,487 cc)',
                displacementKhmer: '២.៥ លីត្រ (២,៤៨៧ cc)',
                type: 'suv',
                capacity: '3000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 450000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 55000,
                taxExplanationKhmer: 'Highlander ស៊េរីថ្មី Hybrid 2.5L អាយុកាលក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ៤៥០,០០០ រៀល (~$112.50)។',
                taxExplanationEn: 'New-gen Highlander 2.5L Hybrid under 5 years old pays 450,000 KHR (~$112.50).'
            },

            // --- POPULAR TOYOTA CROSSOVERS & COMPACTS ---
            {
                id: 'corolla_cross',
                name: 'Toyota Corolla Cross 2020–2024 (1.8L)',
                nameKhmer: 'តូយ៉ូតា កូរ៉ូឡា ក្រូស (Corolla Cross 1.8L)',
                shortName: 'Corolla Cross',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2020–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០២០–២០២៤',
                engineType: 'Hybrid / Petrol',
                engineTypeKhmer: 'អ៊ីប្រ៊ីដ ឬ សាំង',
                displacement: '1.8L (1,798 cc)',
                displacementKhmer: '១.៨ លីត្រ (១,៧៩៨ cc)',
                type: 'suv',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 32000,
                taxExplanationKhmer: 'Corolla Cross ម៉ាស៊ីន 1.8L ស្ថិតក្នុងកម្រិត 1,501–2,000 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ២០០,០០០ រៀល (~$50)។',
                taxExplanationEn: 'Corolla Cross 1.8L in 1,501–2,000 cc bracket, < 5 yrs: 200,000 KHR (~$50).'
            },
            {
                id: 'raize',
                name: 'Toyota Raize 2021–2024 (1.0L Turbo)',
                nameKhmer: 'តូយ៉ូតា រ៉ាយ (Toyota Raize 1.0L)',
                shortName: 'Toyota Raize',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: true,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2021–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០២១–២០២៤',
                engineType: 'Petrol Turbo',
                engineTypeKhmer: 'សាំង តួបូ (Turbo)',
                displacement: '1.0L Turbo (998 cc)',
                displacementKhmer: '១.០ លីត្រ តួបូ (៩៩៨ cc)',
                type: 'suv',
                capacity: 'under1000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 100000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 23500,
                taxExplanationKhmer: 'Toyota Raize ម៉ាស៊ីនត្រឹម 998 cc ស្ថិតក្នុងកម្រិតក្រោម 1,000 cc។ ទោះបីជារថយន្តថ្មី ពន្ធផ្លូវត្រឹមតែ ១០០,០០០ រៀល (~$25) ប៉ុណ្ណោះ ធូរថ្លៃខ្លាំង!',
                taxExplanationEn: 'Toyota Raize 998 cc engine falls into the under-1,000 cc bracket. Even as a new vehicle, road tax is only 100,000 KHR (~$25).'
            },
            {
                id: 'vios',
                name: 'Toyota Vios 2014–2024 (1.5L)',
                nameKhmer: 'តូយ៉ូតា វីអូស (Toyota Vios 1.5L)',
                shortName: 'Toyota Vios',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2014–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១៤–២០២៤',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង Dual VVT-i',
                displacement: '1.5L (1,496 cc)',
                displacementKhmer: '១.៥ លីត្រ (១,៤៩៦ cc)',
                type: 'sedan',
                capacity: '1500',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត ៥–១០ ឆ្នាំ ឬ ក្រោម ៥ ឆ្នាំ',
                ageLabelEn: 'Aged 5–10 yrs / < 5 yrs',
                roadTaxKhr: 120000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 15000,
                taxExplanationKhmer: 'Toyota Vios ម៉ាស៊ីន 1.5L ស្ថិតក្នុងកម្រិត 1,000–1,500 cc។ បើអាយុ ៥–១០ ឆ្នាំ ពន្ធផ្លូវ ១២០,០០០ រៀល បើក្រោម ៥ ឆ្នាំ ១៥០,០០០ រៀល។',
                taxExplanationEn: 'Toyota Vios 1.5L in 1,000–1,500 cc bracket: 120,000 KHR (5–10 yrs) or 150,000 KHR (< 5 yrs).'
            },

            // --- LEXUS MODELS ---
            {
                id: 'rx300_99',
                name: 'Lexus RX300 1999–2003',
                nameKhmer: 'ឡិចស៊ីស RX300 ១៩៩៩–២០០៣',
                shortName: 'Lexus RX300',
                brand: 'Lexus',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '1999–2003',
                yearRangeKhmer: 'ឆ្នាំ ១៩៩៩–២០០៣',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង V6',
                displacement: '3.0L V6 (2,995 cc)',
                displacementKhmer: '៣.០ លីត្រ V6 (២,៩៩៥ cc)',
                type: 'suv',
                capacity: '3000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 8500,
                taxExplanationKhmer: 'Lexus RX300 ម៉ាស៊ីន 3.0L V6 ស្ថិតក្នុងកម្រិត 2,001–3,000 cc អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវ ២៥០,០០០ រៀល (~$62.50)។',
                taxExplanationEn: 'Lexus RX300 3.0L V6 in 2,001–3,000 cc bracket, > 10 yrs: 250,000 KHR (~$62.50).'
            },
            {
                id: 'rx330_04',
                name: 'Lexus RX330 2004–2006',
                nameKhmer: 'ឡិចស៊ីស RX330 ២០០៤–២០០៦',
                shortName: 'Lexus RX330',
                brand: 'Lexus',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2004–2006',
                yearRangeKhmer: 'ឆ្នាំ ២០០៤–២០០៦',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង V6',
                displacement: '3.3L V6 (3,310 cc)',
                displacementKhmer: '៣.៣ លីត្រ V6 (៣,៣១០ cc)',
                type: 'suv',
                capacity: '4000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 600000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 14500,
                taxExplanationKhmer: 'Lexus RX330 ម៉ាស៊ីន 3.3L V6 ស្ថិតក្នុងកម្រិត 3,001–4,000 cc អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវ ៦០០,០០០ រៀល (~$150)។',
                taxExplanationEn: 'Lexus RX330 3.3L V6 in 3,001–4,000 cc bracket, > 10 yrs: 600,000 KHR (~$150).'
            },
            {
                id: 'rx350_07',
                name: 'Lexus RX350 2007–2015',
                nameKhmer: 'ឡិចស៊ីស RX350 ២០០៧–២០១៥',
                shortName: 'Lexus RX350 (07-15)',
                brand: 'Lexus',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2007–2015',
                yearRangeKhmer: 'ឆ្នាំ ២០០៧–២០១៥',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង V6',
                displacement: '3.5L V6 (3,456 cc)',
                displacementKhmer: '៣.៥ លីត្រ V6 (៣,៤៥៦ cc)',
                type: 'suv',
                capacity: '4000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 600000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 24000,
                taxExplanationKhmer: 'Lexus RX350 ម៉ាស៊ីន 3.5L V6 ស្ថិតក្នុងកម្រិត 3,001–4,000 cc អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវ ៦០០,០០០ រៀល (~$150)។',
                taxExplanationEn: 'Lexus RX350 3.5L V6 in 3,001–4,000 cc bracket, > 10 yrs: 600,000 KHR (~$150).'
            },
            {
                id: 'lx570_08',
                name: 'Lexus LX570 2008–2015',
                nameKhmer: 'ឡិចស៊ីស LX570 ២០០៨–២០១៥',
                shortName: 'Lexus LX570 (08-15)',
                brand: 'Lexus',
                filterCategory: 'toyota_lexus',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2008–2015',
                yearRangeKhmer: 'ឆ្នាំ ២០០៨–២០១៥',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង V8',
                displacement: '5.7L V8 (5,663 cc)',
                displacementKhmer: '៥.៧ លីត្រ V8 (៥,៦៦៣ cc)',
                type: 'suv',
                capacity: 'over4000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ',
                ageLabelEn: '> 10 Years Old',
                roadTaxKhr: 1200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 48000,
                taxExplanationKhmer: 'Lexus LX570 ម៉ាស៊ីន 5.7L V8 ស្ថិតក្នុងកម្រិតលើស 4,000 cc។ ដោយសារអាយុកាលលើស ១០ ឆ្នាំ ពន្ធផ្លូវគឺ ១,២០០,០០០ រៀល (~$300)។',
                taxExplanationEn: 'Lexus LX570 5.7L V8 in over-4,000 cc bracket, > 10 yrs: 1,200,000 KHR (~$300).'
            },
            {
                id: 'lx570_16',
                name: 'Lexus LX570 2016–2021',
                nameKhmer: 'ឡិចស៊ីស LX570 ២០១៦–២០២១ (Super Sport)',
                shortName: 'Lexus LX570 (2018)',
                brand: 'Lexus',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2016–2021',
                yearRangeKhmer: 'ឆ្នាំ ២០១៦–២០២១',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង V8',
                displacement: '5.7L V8 (5,663 cc)',
                displacementKhmer: '៥.៧ លីត្រ V8 (៥,៦៦៣ cc)',
                type: 'suv',
                capacity: 'over4000',
                age: '5to10',
                ageLabelKhmer: 'អាយុកាល ៥–១០ ឆ្នាំ',
                ageLabelEn: '5–10 Years Old',
                roadTaxKhr: 1600000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 85000,
                taxExplanationKhmer: 'Lexus LX570 ស៊េរី 2016–2021 ម៉ាស៊ីន 5.7L V8 អាយុកាល ៥–១០ ឆ្នាំ ពន្ធផ្លូវ ១,៦០០,០០០ រៀល (~$400)។',
                taxExplanationEn: 'Lexus LX570 2016–2021 5.7L V8 aged 5–10 years pays 1,600,000 KHR (~$400).'
            },
            {
                id: 'land_cruiser_300',
                name: 'Toyota Land Cruiser 300 2022–2026',
                nameKhmer: 'តូយ៉ូតា ឡង់គ្រុយស័រ ៣០០ (LC300)',
                shortName: 'Land Cruiser 300',
                brand: 'Toyota',
                filterCategory: 'toyota_lexus',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2022–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២២–២០២៦',
                engineType: 'Petrol Twin-Turbo',
                engineTypeKhmer: 'សាំង V6 Twin-Turbo',
                displacement: '3.5L Twin-Turbo (3,445 cc)',
                displacementKhmer: '៣.៥ លីត្រ V6 (៣,៤៤៥ cc)',
                type: 'suv',
                capacity: '4000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 800000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 140000,
                taxExplanationKhmer: 'Land Cruiser LC300 បំពាក់ម៉ាស៊ីន 3.5L Twin-Turbo (3,445 cc) ស្ថិតក្នុងកម្រិត 3,001–4,000 cc។ ដោយសារអាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវគឺ ៨០០,០០០ រៀល (~$200)។',
                taxExplanationEn: 'Land Cruiser LC300 3.5L Twin-Turbo (3,445 cc) in 3,001–4,000 cc bracket, < 5 yrs: 800,000 KHR (~$200).'
            },

            // --- ELECTRIC VEHICLES (EV & PHEV) & CHINESE BRANDS ---
            {
                id: 'byd_atto3',
                name: 'BYD Atto 3 (EV 2022–2026)',
                nameKhmer: 'ប៊ីវ៉ាយឌី អាតូ ៣ (BYD Atto 3 EV)',
                shortName: 'BYD Atto 3',
                brand: 'BYD',
                filterCategory: 'ev_phev',
                isPopular: true,
                isBudget: true,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2022–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២២–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '150 kW Motor (201 hp)',
                displacementKhmer: 'ម៉ូទ័រ ១៥០ kW (២០១ សេះ)',
                type: 'ev',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 100000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 34500,
                taxExplanationKhmer: 'BYD Atto 3 ជារថយន្តអគ្គិសនីសុទ្ធ ១០០% ទទួលបានការបញ្ចុះពន្ធផ្លូវ ៥០% ពីរាជរដ្ឋាភិបាលកម្ពុជា! ពន្ធផ្លូវប្រចាំឆ្នាំត្រឹមតែ ១០០,០០០ រៀល (~$25) ប៉ុណ្ណោះ។',
                taxExplanationEn: 'BYD Atto 3 is a 100% pure electric vehicle benefiting from Cambodia’s 50% EV tax incentive! Annual road tax is only 100,000 KHR (~$25).'
            },
            {
                id: 'byd_dolphin',
                name: 'BYD Dolphin (EV 2023–2026)',
                nameKhmer: 'ប៊ីវ៉ាយឌី ដូហ្វីន (BYD Dolphin EV)',
                shortName: 'BYD Dolphin',
                brand: 'BYD',
                filterCategory: 'ev_phev',
                isPopular: true,
                isBudget: true,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '70–150 kW Motor',
                displacementKhmer: 'ម៉ូទ័រ ៧០–១៥០ kW',
                type: 'ev',
                capacity: '1500',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 60000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 25000,
                taxExplanationKhmer: 'BYD Dolphin រថយន្តអគ្គិសនីខ្នាតតូច ទទួលបានការបញ្ចុះពន្ធផ្លូវ ៥០% ពន្ធផ្លូវត្រឹមតែ ៦០,០០០ រៀល (~$15) ក្នុងមួយឆ្នាំ!',
                taxExplanationEn: 'BYD Dolphin compact EV receives 50% EV road tax discount: only 60,000 KHR (~$15) per year!'
            },
            {
                id: 'byd_seal',
                name: 'BYD Seal (EV 2023–2026)',
                nameKhmer: 'ប៊ីវ៉ាយឌី ស៊ីល (BYD Seal EV)',
                shortName: 'BYD Seal',
                brand: 'BYD',
                filterCategory: 'ev_phev',
                isPopular: false,
                isBudget: false,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '150–390 kW AWD',
                displacementKhmer: 'ម៉ូទ័រ ១៥០–៣៩០ kW',
                type: 'ev',
                capacity: '3000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 150000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 48000,
                taxExplanationKhmer: 'BYD Seal រថយន្តស្ព័រអគ្គិសនីកម្លាំងខ្លាំង ទទួលបានការបញ្ចុះពន្ធ ៥០% ពន្ធផ្លូវប្រចាំឆ្នាំ ១៥០,០០០ រៀល (~$37.50)។',
                taxExplanationEn: 'BYD Seal high-performance EV with 50% EV discount pays 150,000 KHR (~$37.50) road tax.'
            },
            {
                id: 'byd_sealion6',
                name: 'BYD Sealion 6 (PHEV 2024–2026)',
                nameKhmer: 'ប៊ីវ៉ាយឌី ស៊ីលីអន ៦ (BYD Sealion 6 PHEV)',
                shortName: 'BYD Sealion 6',
                brand: 'BYD',
                filterCategory: 'ev_phev',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2024–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៤–២០២៦',
                engineType: 'PHEV',
                engineTypeKhmer: 'សាំង + អាគុយដោតសាក (PHEV)',
                displacement: '1.5L Petrol + Dual Motors',
                displacementKhmer: '១.៥ លីត្រ សាំង + ម៉ូទ័រភ្លើង',
                type: 'suv',
                capacity: '1500',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 150000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 38500,
                taxExplanationKhmer: 'BYD Sealion 6 ជាប្រភេទ Plug-in Hybrid (PHEV) បំពាក់ម៉ាស៊ីនសាំង 1.5L កម្រិត 1,000–1,500 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ១៥០,០០០ រៀល (~$37.50)។',
                taxExplanationEn: 'BYD Sealion 6 PHEV with 1.5L combustion engine under 5 years old pays 150,000 KHR (~$37.50).'
            },
            {
                id: 'wuling_binguo',
                name: 'Wuling Binguo EV 2023–2026',
                nameKhmer: 'វូលីង ប៊ីនហ្គូ (Wuling Binguo EV)',
                shortName: 'Wuling Binguo',
                brand: 'Wuling',
                filterCategory: 'ev_phev',
                isPopular: true,
                isBudget: true,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '50 kW Motor (67 hp)',
                displacementKhmer: 'ម៉ូទ័រ ៥០ kW (៦៧ សេះ)',
                type: 'ev',
                capacity: 'under1000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 50000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 18500,
                taxExplanationKhmer: 'Wuling Binguo រថយន្តអគ្គិសនីពេញនិយមក្នុងក្រុង បញ្ចុះពន្ធផ្លូវ ៥០% សល់ត្រឹមតែ ៥០,០០០ រៀល (~$12.50) ក្នុងមួយឆ្នាំ!',
                taxExplanationEn: 'Wuling Binguo urban EV pays only 50,000 KHR (~$12.50) annually with the 50% EV discount!'
            },
            {
                id: 'wuling_mini',
                name: 'Wuling Hongguang Mini EV',
                nameKhmer: 'វូលីង ហុងក្វាង មីនី (Wuling Mini EV)',
                shortName: 'Wuling Mini EV',
                brand: 'Wuling',
                filterCategory: 'ev_phev',
                isPopular: true,
                isBudget: true,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2021–2025',
                yearRangeKhmer: 'ឆ្នាំ ២០២១–២០២៥',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '20 kW Motor (27 hp)',
                displacementKhmer: 'ម៉ូទ័រ ២០ kW (២៧ សេះ)',
                type: 'ev',
                capacity: 'under1000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 30000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 11000,
                taxExplanationKhmer: 'Wuling Hongguang Mini EV ពន្ធផ្លូវទាបបំផុតត្រឹមតែ ៣០,០០០ រៀល (~$7.50) ប៉ុណ្ណោះ!',
                taxExplanationEn: 'Wuling Mini EV boasts Cambodia’s lowest car road tax: just 30,000 KHR (~$7.50) per year!'
            },
            {
                id: 'deepal_s07',
                name: 'Changan Deepal S07 (EV/EREV 2023–2026)',
                nameKhmer: 'ចាងអាន ឌីប៉ាល់ អេស០៧ (Deepal S07)',
                shortName: 'Deepal S07',
                brand: 'Changan',
                filterCategory: 'china',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Pure EV / EREV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ឬ កូនកាត់ EREV',
                displacement: '160 kW Motor (215 hp)',
                displacementKhmer: 'ម៉ូទ័រ ១៦០ kW (២១៥ សេះ)',
                type: 'ev',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 100000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 41000,
                taxExplanationKhmer: 'Changan Deepal S07 រថយន្ត SUV ទំនើបចុងក្រោយ ទទួលបានការបញ្ចុះពន្ធ ៥០% ពន្ធផ្លូវ ១០០,០០០ រៀល (~$25)។',
                taxExplanationEn: 'Changan Deepal S07 futuristic SUV receives 50% EV discount: 100,000 KHR (~$25) road tax.'
            },
            {
                id: 'geely_monjaro',
                name: 'Geely Monjaro 2022–2026 (2.0L Turbo)',
                nameKhmer: 'ជីលី ម៉ុងចារ៉ូ (Geely Monjaro 2.0T)',
                shortName: 'Geely Monjaro',
                brand: 'Geely',
                filterCategory: 'china',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: false,
                yearRange: '2022–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២២–២០២៦',
                engineType: 'Petrol Turbo',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង តួបូ Drive-E',
                displacement: '2.0L Turbo (1,969 cc)',
                displacementKhmer: '២.០ លីត្រ តួបូ (១,៩៦៩ cc)',
                type: 'suv',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 45000,
                taxExplanationKhmer: 'Geely Monjaro បំពាក់ម៉ាស៊ីន 2.0L Turbo (1,969 cc) កម្រិត 1,501–2,000 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ២០០,០០០ រៀល (~$50)។',
                taxExplanationEn: 'Geely Monjaro 2.0L Turbo (1,969 cc) under 5 years old pays 200,000 KHR (~$50).'
            },
            {
                id: 'geely_coolray',
                name: 'Geely Coolray 2020–2024 (1.5L Turbo)',
                nameKhmer: 'ជីលី ឃូលរ៉េ (Geely Coolray 1.5T)',
                shortName: 'Geely Coolray',
                brand: 'Geely',
                filterCategory: 'china',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: false,
                yearRange: '2020–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០២០–២០២៤',
                engineType: 'Petrol Turbo',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង តួបូ',
                displacement: '1.5L Turbo (1,477 cc)',
                displacementKhmer: '១.៥ លីត្រ តួបូ (១,៤៧៧ cc)',
                type: 'suv',
                capacity: '1500',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 150000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 26000,
                taxExplanationKhmer: 'Geely Coolray ម៉ាស៊ីន 1.5L Turbo កម្រិត 1,000–1,500 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ១៥០,០០០ រៀល (~$37.50)។',
                taxExplanationEn: 'Geely Coolray 1.5L Turbo under 5 years old pays 150,000 KHR (~$37.50).'
            },
            {
                id: 'gac_aion_y',
                name: 'GAC Aion Y Plus (EV 2023–2026)',
                nameKhmer: 'ជីអេស៊ី អាយអន វ៉ាយ ផ្លឹស (Aion Y Plus EV)',
                shortName: 'GAC Aion Y Plus',
                brand: 'GAC',
                filterCategory: 'china',
                isPopular: true,
                isBudget: true,
                isChina: true,
                isEvOrPhev: true,
                yearRange: '2023–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២៣–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '150 kW Motor (201 hp)',
                displacementKhmer: 'ម៉ូទ័រ ១៥០ kW (២០១ សេះ)',
                type: 'ev',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 100000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 31000,
                taxExplanationKhmer: 'GAC Aion Y Plus រថយន្តអគ្គិសនីទូលាយ ទទួលបានការបញ្ចុះពន្ធ ៥០% ពន្ធផ្លូវប្រចាំឆ្នាំ ១០០,០០០ រៀល (~$25)។',
                taxExplanationEn: 'GAC Aion Y Plus spacious EV receives 50% discount: 100,000 KHR (~$25) annual road tax.'
            },
            {
                id: 'tank_300',
                name: 'GWM Tank 300 2022–2026 (2.0L Turbo)',
                nameKhmer: 'ហ្គ្រេតវ៉ល ថេង ៣០០ (GWM Tank 300)',
                shortName: 'Tank 300',
                brand: 'GWM',
                filterCategory: 'china',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: false,
                yearRange: '2022–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២២–២០២៦',
                engineType: 'Petrol Turbo / Hybrid',
                engineTypeKhmer: 'សាំង តួបូ ឬ អ៊ីប្រ៊ីដ',
                displacement: '2.0L Turbo (1,998 cc)',
                displacementKhmer: '២.០ លីត្រ តួបូ (១,៩៩៨ cc)',
                type: 'suv',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 46000,
                taxExplanationKhmer: 'Tank 300 រថយន្ត Off-Road ដ៏ពេញនិយម ម៉ាស៊ីន 2.0L Turbo (1,998 cc) កម្រិត 1,501–2,000 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ២០០,០០០ រៀល (~$50)។',
                taxExplanationEn: 'Tank 300 popular off-roader with 2.0L Turbo (1,998 cc) under 5 years old pays 200,000 KHR (~$50).'
            },
            {
                id: 'jetour_dashing',
                name: 'Jetour Dashing 2022–2026',
                nameKhmer: 'ជេធួរ ដាស៊ីង (Jetour Dashing 1.5T/1.6T)',
                shortName: 'Jetour Dashing',
                brand: 'Jetour',
                filterCategory: 'china',
                isPopular: true,
                isBudget: false,
                isChina: true,
                isEvOrPhev: false,
                yearRange: '2022–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២២–២០២៦',
                engineType: 'Petrol Turbo',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង តួបូ',
                displacement: '1.5L / 1.6L Turbo',
                displacementKhmer: '១.៥L ឬ ១.៦L តួបូ',
                type: 'suv',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 31000,
                taxExplanationKhmer: 'Jetour Dashing ម៉ាស៊ីន 1.5L/1.6L Turbo អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវចន្លោះពី ១៥០,០០០ ដល់ ២៥០,០០០ រៀល។',
                taxExplanationEn: 'Jetour Dashing 1.5L/1.6L Turbo under 5 years old pays 150,000–250,000 KHR.'
            },
            {
                id: 'tesla_model_y',
                name: 'Tesla Model Y (EV 2021–2026)',
                nameKhmer: 'តេសឡា ម៉ូដែល វ៉ាយ (Tesla Model Y EV)',
                shortName: 'Tesla Model Y',
                brand: 'Tesla',
                filterCategory: 'ev_phev',
                isPopular: false,
                isBudget: false,
                isChina: false,
                isEvOrPhev: true,
                yearRange: '2021–2026',
                yearRangeKhmer: 'ឆ្នាំ ២០២១–២០២៦',
                engineType: 'Pure EV',
                engineTypeKhmer: 'អគ្គិសនីសុទ្ធ ១០០%',
                displacement: '220 kW Dual Motor',
                displacementKhmer: 'ម៉ូទ័រ ២២០ kW',
                type: 'ev',
                capacity: '3000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្តអគ្គិសនី < ៥ ឆ្នាំ',
                ageLabelEn: 'EV < 5 Years Old',
                roadTaxKhr: 130000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 55000,
                taxExplanationKhmer: 'Tesla Model Y រថយន្តអគ្គិសនីអាមេរិក ទទួលបានការបញ្ចុះពន្ធ ៥០% ពន្ធផ្លូវប្រចាំឆ្នាំ ១៣០,០០០ រៀល (~$32.50)។',
                taxExplanationEn: 'Tesla Model Y EV with 50% EV discount pays 130,000 KHR (~$32.50) annual road tax.'
            },

            // --- FORD & PICKUPS ---
            {
                id: 'ford_ranger_wildtrak',
                name: 'Ford Ranger Wildtrak 2.0L Bi-Turbo (2019–2024)',
                nameKhmer: 'ហ្វដ រ៉េងជ័រ វ៉ាយត្រេក ២.០ (Wildtrak Bi-Turbo)',
                shortName: 'Ranger Wildtrak 2.0',
                brand: 'Ford',
                filterCategory: 'ford_pickup',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2019–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១៩–២០២៤',
                engineType: 'Diesel Bi-Turbo',
                engineTypeKhmer: 'ម៉ាស៊ូត Bi-Turbo ២ ស៊ីឡាំង',
                displacement: '2.0L Diesel (1,996 cc)',
                displacementKhmer: '២.០ លីត្រ ម៉ាស៊ូត (១,៩៩៦ cc)',
                type: 'pickup',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ',
                ageLabelEn: '< 5 Years Old',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 63000,
                estimatedPriceUsd: 39000,
                taxExplanationKhmer: 'Ford Ranger Wildtrak 2.0L Bi-Turbo ស្ថិតក្នុងកម្រិត 1,501–2,000 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ២០០,០០០ រៀល (~$50) និងថ្លៃឆៀកភីកអាប់ ៦៣,០០០ រៀល។',
                taxExplanationEn: 'Ford Ranger Wildtrak 2.0L Bi-Turbo in 1,501–2,000 cc bracket, < 5 yrs: 200,000 KHR (~$50) road tax and 63,000 KHR pickup inspection fee.'
            },
            {
                id: 'ford_ranger_32',
                name: 'Ford Ranger 2012–2018 (3.2L Wildtrak)',
                nameKhmer: 'ហ្វដ រ៉េងជ័រ ២០១២–២០១៨ (3.2L ម៉ាស៊ីន ៥)',
                shortName: 'Ranger 3.2L (12-18)',
                brand: 'Ford',
                filterCategory: 'ford_pickup',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2012–2018',
                yearRangeKhmer: 'ឆ្នាំ ២០១២–២០១៨',
                engineType: 'Diesel',
                engineTypeKhmer: 'ម៉ាស៊ូត ៥ ស៊ីឡាំង',
                displacement: '3.2L Diesel (3,198 cc)',
                displacementKhmer: '៣.២ លីត្រ ម៉ាស៊ូត (៣,១៩៨ cc)',
                type: 'pickup',
                capacity: '4000',
                age: '5to10',
                ageLabelKhmer: 'អាយុកាល ៥–១០ ឆ្នាំ ឬ > ១០ ឆ្នាំ',
                ageLabelEn: '5–10 yrs / > 10 yrs',
                roadTaxKhr: 400000,
                inspectionFeeKhr: 63000,
                estimatedPriceUsd: 21000,
                taxExplanationKhmer: 'Ford Ranger 3.2L ម៉ាស៊ីន ៥ ស្ថិតក្នុងកម្រិត 3,001–4,000 cc ពន្ធផ្លូវចន្លោះពី ៤០០,០០០ ដល់ ៦០០,០០០ រៀល អាស្រ័យលើឆ្នាំផលិត។',
                taxExplanationEn: 'Ford Ranger 3.2L 5-cylinder in 3,001–4,000 cc bracket pays 400,000–600,000 KHR based on age.'
            },
            {
                id: 'hilux_revo',
                name: 'Toyota Hilux Revo 2016–2024 (2.4L / 2.8L)',
                nameKhmer: 'តូយ៉ូតា ហាយលុច រ៉េវ៉ូ (Hilux Revo)',
                shortName: 'Hilux Revo',
                brand: 'Toyota',
                filterCategory: 'ford_pickup',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2016–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១៦–២០២៤',
                engineType: 'Diesel',
                engineTypeKhmer: 'ម៉ាស៊ូត D-4D',
                displacement: '2.4L / 2.8L Diesel',
                displacementKhmer: '២.៤L ឬ ២.៨L ម៉ាស៊ូត',
                type: 'pickup',
                capacity: '3000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ ឬ ៥–១០ ឆ្នាំ',
                ageLabelEn: '< 5 yrs / 5–10 yrs',
                roadTaxKhr: 250000,
                inspectionFeeKhr: 63000,
                estimatedPriceUsd: 33000,
                taxExplanationKhmer: 'Toyota Hilux Revo ម៉ាស៊ីន 2.4L ស្ថិតក្នុងកម្រិត 2,001–3,000 cc ពន្ធផ្លូវ ២៥០,០០០ ដល់ ៣៥០,០០០ រៀល។',
                taxExplanationEn: 'Toyota Hilux Revo 2.4L in 2,001–3,000 cc bracket pays 250,000–350,000 KHR.'
            },
            {
                id: 'kia_morning',
                name: 'Kia Morning / Picanto 2012–2024 (1.0L / 1.25L)',
                nameKhmer: 'គា ម៉រនីង (Kia Morning 1.0L/1.25L)',
                shortName: 'Kia Morning',
                brand: 'Kia',
                filterCategory: 'budget',
                isPopular: true,
                isBudget: true,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2012–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១២–២០២៤',
                engineType: 'Petrol',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង សន្សំសំចៃ',
                displacement: '1.0L / 1.25L (998–1,248 cc)',
                displacementKhmer: '១.០L ឬ ១.២៥L សាំង',
                type: 'sedan',
                capacity: 'under1000',
                age: 'over10',
                ageLabelKhmer: 'អាយុកាល > ១០ ឆ្នាំ ឬ ៥–១០ ឆ្នាំ',
                ageLabelEn: '> 10 yrs / 5–10 yrs',
                roadTaxKhr: 60000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 6500,
                taxExplanationKhmer: 'Kia Morning ម៉ាស៊ីន 1.0L (998 cc) អាយុលើស ១០ ឆ្នាំ ពន្ធផ្លូវទាបបំផុតត្រឹមតែ ៦០,០០០ រៀល (~$15) ប៉ុណ្ណោះក្នុងមួយឆ្នាំ!',
                taxExplanationEn: 'Kia Morning 1.0L (998 cc) over 10 years old pays Cambodia’s ultra-low petrol rate of only 60,000 KHR (~$15)!'
            },
            {
                id: 'mazda_cx5',
                name: 'Mazda CX-5 2016–2024 (2.0L / 2.5L)',
                nameKhmer: 'ម៉ាស្ដា ស៊ីអិច ៥ (Mazda CX-5)',
                shortName: 'Mazda CX-5',
                brand: 'Mazda',
                filterCategory: 'all',
                isPopular: true,
                isBudget: false,
                isChina: false,
                isEvOrPhev: false,
                yearRange: '2016–2024',
                yearRangeKhmer: 'ឆ្នាំ ២០១៦–២០២៤',
                engineType: 'Petrol Skyactiv',
                engineTypeKhmer: 'ម៉ាស៊ីនសាំង Skyactiv',
                displacement: '2.0L / 2.5L Skyactiv-G',
                displacementKhmer: '២.០L ឬ ២.៥L សាំង',
                type: 'suv',
                capacity: '2000',
                age: 'under5',
                ageLabelKhmer: 'រថយន្ត < ៥ ឆ្នាំ ឬ ៥–១០ ឆ្នាំ',
                ageLabelEn: '< 5 yrs / 5–10 yrs',
                roadTaxKhr: 200000,
                inspectionFeeKhr: 54000,
                estimatedPriceUsd: 28000,
                taxExplanationKhmer: 'Mazda CX-5 2.0L Skyactiv កម្រិត 1,501–2,000 cc អាយុក្រោម ៥ ឆ្នាំ ពន្ធផ្លូវ ២០០,០០០ រៀល (~$50)។',
                taxExplanationEn: 'Mazda CX-5 2.0L in 1,501–2,000 cc bracket pays 200,000 KHR (~$50).'
            }
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
            { id: 'under1000', label: '< 1,000 cc', examplesKhmer: 'Morning, i10, Wuling, Raize', examplesEn: 'Small city cars, Raize' },
            { id: '1500', label: '1,000 – 1,500 cc', examplesKhmer: 'Vios, Yaris, Swift, Prius 1.5, Coolray', examplesEn: 'Vios, Yaris, Prius 1.5' },
            { id: '2000', label: '1,501 – 2,000 cc', examplesKhmer: 'Prius 2011 (1.8L), Camry 2.0, Cross, Monjaro', examplesEn: 'Prius 2011 (1.8L), Camry 2.0, Cross' },
            { id: '3000', label: '2,001 – 3,000 cc', examplesKhmer: 'Highlander 2.4, RX300, Ranger 2.0/2.2', examplesEn: 'Highlander 2.4, RX300, Ranger' },
            { id: '4000', label: '3,001 – 4,000 cc', examplesKhmer: 'RX330, RX350, Prado 4.0, 4Runner, LC300', examplesEn: 'RX330, RX350, Prado, LC300' },
            { id: 'over4000', label: '> 4,000 cc', examplesKhmer: 'LX570, Land Cruiser V8, LX470, G63', examplesEn: 'LX570, Land Cruiser V8, G63' }
        ];

        const ageBrackets = [
            { id: 'under5', nameKhmer: 'ក្រោម ៥ ឆ្នាំ', nameEn: '< 5 Years Old', descKhmer: 'ផលិតចាប់ពីឆ្នាំ ២០២១ ឡើងទៅ', descEn: 'Manufactured 2021+' },
            { id: '5to10', nameKhmer: '៥ ទៅ ១០ ឆ្នាំ', nameEn: '5 – 10 Years Old', descKhmer: 'ផលិតឆ្នាំ ២០១៥ ដល់ ២០២០', descEn: 'Manufactured 2015 – 2020' },
            { id: 'over10', nameKhmer: 'លើសពី ១០ ឆ្នាំ', nameEn: '> 10 Years Old', descKhmer: 'ផលិតមុនឆ្នាំ ២០១៥ (Prius 2011, RX330...)', descEn: 'Manufactured before 2015' }
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

        // Filtered car models based on search query & brand category filter
        const filteredCarModels = computed(() => {
            let list = carModelsDatabase;

            if (selectedBrandFilter.value === 'toyota_lexus') {
                list = list.filter(c => c.filterCategory === 'toyota_lexus' || c.brand === 'Toyota' || c.brand === 'Lexus');
            } else if (selectedBrandFilter.value === 'ev_phev') {
                list = list.filter(c => c.isEvOrPhev);
            } else if (selectedBrandFilter.value === 'china') {
                list = list.filter(c => c.isChina);
            } else if (selectedBrandFilter.value === 'ford_pickup') {
                list = list.filter(c => c.filterCategory === 'ford_pickup' || c.type === 'pickup' || c.brand === 'Ford');
            } else if (selectedBrandFilter.value === 'budget') {
                list = list.filter(c => c.isBudget || c.roadTaxKhr <= 100000);
            }

            if (carSearchQuery.value) {
                const q = carSearchQuery.value.toLowerCase().replace(/\s+/g, '');
                list = list.filter(c => {
                    const name = (c.name || '').toLowerCase().replace(/\s+/g, '');
                    const nameKhmer = (c.nameKhmer || '').toLowerCase().replace(/\s+/g, '');
                    const brand = (c.brand || '').toLowerCase().replace(/\s+/g, '');
                    const year = (c.yearRange || '').toLowerCase().replace(/\s+/g, '');
                    const shortName = (c.shortName || '').toLowerCase().replace(/\s+/g, '');
                    return name.includes(q) || nameKhmer.includes(q) || brand.includes(q) || year.includes(q) || shortName.includes(q) || (q === '011' && name.includes('2011'));
                });
            }

            return list;
        });

        // Grouped by brand for clean Dropdown optgroups
        const groupedCarModels = computed(() => {
            const groups = {};
            for (const car of carModelsDatabase) {
                if (!groups[car.brand]) {
                    groups[car.brand] = [];
                }
                groups[car.brand].push(car);
            }
            return Object.keys(groups).sort().map(brand => ({
                brand,
                models: groups[brand]
            }));
        });

        // Quick popular cars chips
        const popularTopCars = computed(() => {
            return carModelsDatabase.filter(c => c.isPopular).slice(0, 8);
        });

        // Method when a car model is clicked or selected
        const selectCarModel = (car) => {
            selectedCarModel.value = car;
            selectedCarModelId.value = car.id;
            selectedType.value = car.type;
            selectedCapacity.value = car.capacity;
            selectedAge.value = car.age;
            estimatedCarValueUsd.value = car.estimatedPriceUsd || 12000;
        };

        const onCarModelDropdownChange = () => {
            const car = carModelsDatabase.find(c => c.id === selectedCarModelId.value);
            if (car) {
                selectCarModel(car);
            }
        };

        const clearSelectedCarModel = () => {
            selectedCarModel.value = null;
            selectedCarModelId.value = '';
            calcMode.value = 'manual';
        };

        // Initialize with default model (Prius 2011)
        onMounted(() => {
            const defaultCar = carModelsDatabase.find(c => c.id === 'prius_gen3');
            if (defaultCar) {
                selectCarModel(defaultCar);
            }
        });

        // Official GDT Annual Road Tax calculation based on CC & Age or Selected Model
        const calculatedRoadTaxKhr = computed(() => {
            if (selectedCarModel.value && calcMode.value === 'model') {
                return selectedCarModel.value.roadTaxKhr;
            }

            if (selectedType.value === 'moto') {
                return 20000;
            }

            let base = 100000;
            switch (selectedCapacity.value) {
                case 'under1000':
                    base = selectedAge.value === 'under5' ? 100000 : selectedAge.value === '5to10' ? 80000 : 60000;
                    break;
                case '1500':
                    base = selectedAge.value === 'under5' ? 150000 : selectedAge.value === '5to10' ? 100000 : 80000;
                    break;
                case '2000':
                    base = selectedAge.value === 'under5' ? 200000 : selectedAge.value === '5to10' ? 150000 : 100000;
                    break;
                case '3000':
                    base = selectedAge.value === 'under5' ? 600000 : selectedAge.value === '5to10' ? 400000 : 250000;
                    break;
                case '4000':
                    base = selectedAge.value === 'under5' ? 1000000 : selectedAge.value === '5to10' ? 700000 : 500000;
                    break;
                case 'over4000':
                    base = selectedAge.value === 'under5' ? 2000000 : selectedAge.value === '5to10' ? 1500000 : 1000000;
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
            if (selectedCarModel.value && calcMode.value === 'model') {
                return selectedCarModel.value.inspectionFeeKhr;
            }

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
            calcMode,
            tabs,
            carBrandFilters,
            carSearchQuery,
            selectedBrandFilter,
            selectedCarModelId,
            selectedCarModel,
            filteredCarModels,
            groupedCarModels,
            popularTopCars,
            selectCarModel,
            onCarModelDropdownChange,
            clearSelectedCarModel,
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
.scrollbar-none::-webkit-scrollbar {
    display: none;
}
.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
