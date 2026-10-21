<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'អគ្គនាយកដ្ឋានពន្ធដារ (GDT) & បេឡាជាតិសន្តិសុខសង្គម (NSSF)' : 'CAMBODIA GDT SALARY TAX & NSSF PENSION' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">2026 BRACKETS</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">1 USD ≈ {{ formatNumber(exchangeRate) }} ៛</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-md">
                                <span>💼</span>
                                <span>{{ isKhmer ? 'គណនាពន្ធលើប្រាក់បៀវត្សរ៍ & ប.ស.ស' : 'CAMBODIA SALARY TAX & NSSF CALCULATOR' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'គណនាប្រាក់បៀវត្សរ៍សុទ្ធ និងពន្ធលើប្រាក់ខែ' : 'Cambodia Net Salary & Salary Tax Calculator' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'គណនាប្រាក់ខែក្នុងដៃ (Net Take-home Salary) តាមកាំពន្ធប្រកាសផ្លូវការរបស់អគ្គនាយកដ្ឋានពន្ធដារ (០% ទៅ ២០%), ការកាត់វិភាគទានសោធន ប.ស.ស (NSSF), និងការកាត់បន្ថយបន្ទុកគ្រួសារ (ប្តី/ប្រពន្ធ និងកូនក្នុងបន្ទុក)។' 
                                    : 'Accurate calculation of Net Take-home Salary based on official Cambodian GDT progressive tax brackets (0% - 20%), NSSF pension deductions, and dependent family relief allowances.' }}
                            </p>
                        </div>

                        <!-- Calculation Mode Selector -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'របៀបគណនា' : 'Calculation Mode' }}
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="calcDirection = 'grossToNet'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="calcDirection === 'grossToNet' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    Gross → Net
                                </button>
                                <button 
                                    @click="calcDirection = 'netToGross'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="calcDirection === 'netToGross' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    Net → Gross
                                </button>
                            </div>

                            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-800">
                                <span class="text-slate-500 dark:text-slate-400">{{ isKhmer ? 'រូបិយប័ណ្ណបញ្ចូល' : 'Input Currency' }}</span>
                                <div class="inline-flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-bold font-mono">
                                    <button 
                                        @click="inputCurrency = 'USD'"
                                        class="px-2 py-0.5 rounded-md transition-all"
                                        :class="inputCurrency === 'USD' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-xs' : 'text-slate-500'">
                                        USD ($)
                                    </button>
                                    <button 
                                        @click="inputCurrency = 'KHR'"
                                        class="px-2 py-0.5 rounded-md transition-all"
                                        :class="inputCurrency === 'KHR' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-xs' : 'text-slate-500'">
                                        KHR (៛)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Calculation Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                <!-- Input Controls Panel -->
                <div class="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-lg">💰</span>
                            <div>
                                <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                    {{ calcDirection === 'grossToNet' 
                                        ? (isKhmer ? 'បញ្ចូលប្រាក់ខែសរុប (Gross Salary)' : 'Enter Gross Monthly Salary') 
                                        : (isKhmer ? 'បញ្ចូលប្រាក់ខែចង់បានក្នុងដៃ (Net Salary)' : 'Enter Desired Net Salary') }}
                                </h2>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'គណនាដោយស្វ័យប្រវត្តិតាមច្បាប់ពន្ធដារ និង ប.ស.ស កម្ពុជា' : 'Calculated automatically per Cambodia tax law & NSSF' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Salary Input Box -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {{ calcDirection === 'grossToNet' ? (isKhmer ? 'ប្រាក់បៀវត្សរ៍សរុបប្រចាំខែ (Gross)' : 'Monthly Gross Salary') : (isKhmer ? 'ប្រាក់ខែក្នុងដៃចង់បាន (Net)' : 'Target Net Salary') }} *
                        </label>
                        <div class="relative">
                            <input 
                                type="number" 
                                min="0" 
                                :step="inputCurrency === 'USD' ? '10' : '10000'"
                                v-model.number="salaryInput"
                                placeholder="e.g. 800"
                                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            <span class="absolute right-3.5 top-3 text-sm font-mono font-bold text-slate-400">{{ inputCurrency }}</span>
                        </div>

                        <!-- Quick Presets -->
                        <div class="flex flex-wrap items-center gap-1.5 pt-1">
                            <span class="text-[10px] text-slate-400 font-mono">{{ isKhmer ? 'ប្រាក់ខែរហ័ស៖' : 'Presets:' }}</span>
                            <button 
                                v-for="amt in (inputCurrency === 'USD' ? [300, 500, 800, 1200, 2000, 3500] : [1200000, 2000000, 3500000, 5000000, 8000000])" 
                                :key="amt"
                                @click="salaryInput = amt"
                                class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                {{ inputCurrency === 'USD' ? `$${amt}` : `${amt.toLocaleString()} ៛` }}
                            </button>
                        </div>
                    </div>

                    <!-- Residency Status -->
                    <div class="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {{ isKhmer ? 'ស្ថានភាពស្នាក់នៅ (Residency Status)' : 'Tax Residency Status' }}
                        </label>
                        <div class="grid grid-cols-2 gap-2">
                            <button 
                                @click="isResident = true"
                                class="p-3 rounded-xl border text-left transition-all cursor-pointer"
                                :class="isResident ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'">
                                <div class="font-bold text-xs">{{ isKhmer ? 'និវាសនជន (Resident)' : 'Resident Taxpayer' }}</div>
                                <div class="text-[10px] opacity-75 mt-0.5">{{ isKhmer ? 'កាំពន្ធពី ០% ទៅ ២០% + បន្ទុកគ្រួសារ' : 'Progressive 0% - 20% rates' }}</div>
                            </button>
                            <button 
                                @click="isResident = false"
                                class="p-3 rounded-xl border text-left transition-all cursor-pointer"
                                :class="!isResident ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'">
                                <div class="font-bold text-xs">{{ isKhmer ? 'អនិវាសនជន (Non-Resident)' : 'Non-Resident' }}</div>
                                <div class="text-[10px] opacity-75 mt-0.5">{{ isKhmer ? 'អត្រាថេរ ២០% លើប្រាក់ខែសរុប' : 'Flat 20% on gross salary' }}</div>
                            </button>
                        </div>
                    </div>

                    <!-- Family Allowances / Dependents (For Residents) -->
                    <div v-if="isResident" class="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div class="flex items-center justify-between">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'ការកាត់បន្ថយបន្ទុកគ្រួសារ (១៥០,០០០ ៛ / ម្នាក់)' : 'Family Dependent Relief (150,000 KHR / person)' }}
                            </label>
                            <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                -{{ formatNumber(totalDependentReliefKhr) }} ៛
                            </span>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <!-- Non-working Spouse -->
                            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                                <label class="flex items-center gap-2 cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
                                    <input type="checkbox" v-model="hasNonWorkingSpouse" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                                    <span>{{ isKhmer ? 'ប្តី/ប្រពន្ធក្នុងបន្ទុក (គ្មានការងារ)' : 'Non-working spouse' }}</span>
                                </label>
                                <div class="text-[10px] text-slate-400">
                                    {{ isKhmer ? 'កាត់បន្ថយ ១៥០,០០០ ៛ ក្នុងមួយខែ' : 'Relief of 150,000 KHR/month' }}
                                </div>
                            </div>

                            <!-- Children -->
                            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <span class="font-semibold text-slate-800 dark:text-slate-200">{{ isKhmer ? 'កូនក្នុងបន្ទុក' : 'Dependent children' }}</span>
                                    <div class="flex items-center gap-2">
                                        <button 
                                            @click="childrenCount = Math.max(0, childrenCount - 1)"
                                            class="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold font-mono hover:bg-slate-300">
                                            -
                                        </button>
                                        <span class="font-mono font-bold w-4 text-center">{{ childrenCount }}</span>
                                        <button 
                                            @click="childrenCount = Math.min(10, childrenCount + 1)"
                                            class="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold font-mono hover:bg-slate-300">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div class="text-[10px] text-slate-400">
                                    {{ isKhmer ? 'កូនអាយុក្រោម ១៤ ឆ្នាំ (ឬ ២៥ ឆ្នាំបើកំពុងរៀន)' : 'Children ≤14 yrs (or ≤25 yrs if students)' }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- NSSF Pension Option -->
                    <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                            <input type="checkbox" v-model="deductNssf" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                            <span>{{ isKhmer ? 'កាត់វិភាគទានសោធន ប.ស.ស (NSSF Pension Scheme ២%)' : 'Deduct NSSF Employee Pension (2%)' }}</span>
                        </label>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer 
                                ? 'កម្មករនិយោជិតបង់ ២% នៃប្រាក់បៀវត្សរ៍ជាប់កាតព្វកិច្ច (ពិដានអតិបរមា ២៤,០០០ ៛ / ខែ)។ និយោជកបង់ ២% បន្ថែមទៀត។' 
                                : 'Employee pays 2% capped at 24,000 KHR/month (~$5.85). The employer contributes matching 2% + 2.6% healthcare.' }}
                        </p>
                    </div>

                </div>

                <!-- Right Results & Breakdown Panel -->
                <div class="lg:col-span-5 space-y-4">
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'លទ្ធផលគណនាប្រាក់ខែ' : 'Salary Summary' }}
                            </span>
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                GDT CAMBODIA
                            </span>
                        </div>

                        <!-- Net Take-Home Highlight -->
                        <div class="text-center py-2 space-y-1">
                            <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {{ isKhmer ? 'ប្រាក់ខែក្នុងដៃពិតប្រាកដ (Net Take-home Salary)' : 'Net Take-Home Salary' }}
                            </div>
                            <div class="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                                ${{ netSalaryUsd.toFixed(2) }}
                            </div>
                            <div class="text-xs font-mono text-slate-500 dark:text-slate-400">
                                ≈ {{ formatNumber(netSalaryKhr) }} ៛ KHR
                            </div>
                        </div>

                        <!-- Itemized Summary List -->
                        <div class="rounded-xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                            <!-- Gross Salary -->
                            <div class="p-2.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
                                <span class="font-bold text-slate-700 dark:text-slate-300">{{ isKhmer ? 'ប្រាក់បៀវត្សរ៍សរុប (Gross)' : 'Gross Monthly Salary' }}</span>
                                <div class="text-right font-mono font-bold">
                                    <div>${{ grossSalaryUsd.toFixed(2) }}</div>
                                    <div class="text-[10px] text-slate-400 font-normal">{{ formatNumber(grossSalaryKhr) }} ៛</div>
                                </div>
                            </div>

                            <!-- NSSF Deduction -->
                            <div class="p-2.5 flex items-center justify-between">
                                <div>
                                    <div class="text-slate-700 dark:text-slate-300">{{ isKhmer ? 'វិភាគទានសោធន ប.ស.ស (២%)' : 'NSSF Pension (2%)' }}</div>
                                    <div class="text-[10px] text-slate-400">{{ isKhmer ? 'ពិដាន ២៤,០០០ ៛' : 'Capped at 24k KHR' }}</div>
                                </div>
                                <div class="text-right font-mono text-rose-600 dark:text-rose-400 font-bold">
                                    <div>-${{ nssfDeductionUsd.toFixed(2) }}</div>
                                    <div class="text-[10px] font-normal">-{{ formatNumber(nssfDeductionKhr) }} ៛</div>
                                </div>
                            </div>

                            <!-- Family Relief -->
                            <div v-if="isResident && totalDependentReliefKhr > 0" class="p-2.5 flex items-center justify-between">
                                <span class="text-slate-700 dark:text-slate-300">{{ isKhmer ? 'កាត់បន្ថយបន្ទុកគ្រួសារ' : 'Family Dependent Relief' }}</span>
                                <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">-{{ formatNumber(totalDependentReliefKhr) }} ៛</span>
                            </div>

                            <!-- Taxable Base -->
                            <div class="p-2.5 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/20">
                                <span class="text-slate-600 dark:text-slate-400">{{ isKhmer ? 'មូលដ្ឋានគិតពន្ធ (Taxable Base)' : 'Taxable Base' }}</span>
                                <span class="font-mono font-bold text-slate-800 dark:text-slate-200">{{ formatNumber(taxableBaseKhr) }} ៛</span>
                            </div>

                            <!-- Tax on Salary Amount -->
                            <div class="p-2.5 flex items-center justify-between bg-rose-50/50 dark:bg-rose-950/20">
                                <div>
                                    <span class="font-bold text-rose-700 dark:text-rose-400">{{ isKhmer ? 'ពន្ធលើប្រាក់បៀវត្សរ៍ (TOS)' : 'Tax on Salary (GDT)' }}</span>
                                    <div class="text-[10px] text-slate-400 font-mono">{{ effectiveTaxRate }}% effective</div>
                                </div>
                                <div class="text-right font-mono text-rose-600 dark:text-rose-400 font-bold">
                                    <div>-${{ taxOnSalaryUsd.toFixed(2) }}</div>
                                    <div class="text-[10px] font-normal">-{{ formatNumber(taxOnSalaryKhr) }} ៛</div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="pt-2 flex items-center gap-2">
                            <button 
                                @click="copySalarySlip"
                                class="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                                <span>{{ copiedSlip ? '✓' : '📋' }}</span>
                                <span>{{ copiedSlip ? (isKhmer ? 'បានចម្លង!' : 'Copied!') : (isKhmer ? 'ចម្លងលទ្ធផល' : 'Copy Salary Slip') }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Tax Bracket Reference Table -->
                    <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl text-xs space-y-2">
                        <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <span>🏛️</span>
                            <span>{{ isKhmer ? 'តារាងកាំពន្ធប្រាក់បៀវត្សរ៍កម្ពុជា (GDT)' : 'Official GDT Progressive Brackets' }}</span>
                        </div>
                        <div class="space-y-1 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                <span>0 ដល់ 1,500,000 ៛</span>
                                <span class="font-bold text-emerald-600">0%</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                <span>1,500,001 ដល់ 2,000,000 ៛</span>
                                <span class="font-bold text-emerald-600">5%</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                <span>2,000,001 ដល់ 8,500,000 ៛</span>
                                <span class="font-bold text-emerald-600">10%</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                                <span>8,500,001 ដល់ 12,500,000 ៛</span>
                                <span class="font-bold text-emerald-600">15%</span>
                            </div>
                            <div class="flex justify-between py-1">
                                <span>លើសពី 12,500,000 ៛</span>
                                <span class="font-bold text-rose-600">20%</span>
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
    name: 'SalaryTaxCalculator',
    setup() {
        const { isKhmer } = useLanguage();

        // State
        const calcDirection = ref('grossToNet'); // 'grossToNet' or 'netToGross'
        const inputCurrency = ref('USD'); // 'USD' or 'KHR'
        const salaryInput = ref(1000);
        const exchangeRate = ref(4100);
        const isResident = ref(true);
        const hasNonWorkingSpouse = ref(false);
        const childrenCount = ref(0);
        const deductNssf = ref(true);
        const copiedSlip = ref(false);

        // Dependent relief: 150,000 KHR per dependent
        const totalDependentReliefKhr = computed(() => {
            if (!isResident.value) return 0;
            let count = childrenCount.value || 0;
            if (hasNonWorkingSpouse.value) count += 1;
            return count * 150000;
        });

        // Convert salary input to KHR
        const inputSalaryInKhr = computed(() => {
            const raw = salaryInput.value || 0;
            return inputCurrency.value === 'USD' ? raw * exchangeRate.value : raw;
        });

        // Compute Tax on Salary using GDT Progressive formula
        const calculateTaxOnSalaryKhr = (taxableBase) => {
            if (taxableBase <= 0) return 0;
            if (!isResident.value) {
                // Non-residents pay flat 20% on gross salary
                return taxableBase * 0.20;
            }

            if (taxableBase <= 1500000) {
                return 0;
            } else if (taxableBase <= 2000000) {
                return (taxableBase * 0.05) - 75000;
            } else if (taxableBase <= 8500000) {
                return (taxableBase * 0.10) - 175000;
            } else if (taxableBase <= 12500000) {
                return (taxableBase * 0.15) - 600000;
            } else {
                return (taxableBase * 0.20) - 1225000;
            }
        };

        // NSSF Calculation
        const calculateNssfKhr = (grossKhr) => {
            if (!deductNssf.value) return 0;
            // NSSF pension: 2% of salary, capped at wage ceiling 1,200,000 KHR
            const contributoryWage = Math.min(grossKhr, 1200000);
            return Math.round(contributoryWage * 0.02);
        };

        // Calculations for Gross to Net and Net to Gross
        const computedResults = computed(() => {
            if (calcDirection.value === 'grossToNet') {
                const grossKhr = inputSalaryInKhr.value;
                const nssfKhr = calculateNssfKhr(grossKhr);
                const taxableBaseKhr = Math.max(0, grossKhr - nssfKhr - totalDependentReliefKhr.value);
                const taxKhr = calculateTaxOnSalaryKhr(taxableBaseKhr);
                const netKhr = Math.max(0, grossKhr - nssfKhr - taxKhr);

                return {
                    grossKhr,
                    nssfKhr,
                    taxableBaseKhr,
                    taxKhr,
                    netKhr
                };
            } else {
                // Net to Gross: iterative binary search approximation
                const targetNet = inputSalaryInKhr.value;
                let low = targetNet;
                let high = targetNet * 1.5 + 5000000;
                let grossKhr = targetNet;

                for (let i = 0; i < 40; i++) {
                    const mid = (low + high) / 2;
                    const nssf = calculateNssfKhr(mid);
                    const base = Math.max(0, mid - nssf - totalDependentReliefKhr.value);
                    const tax = calculateTaxOnSalaryKhr(base);
                    const net = mid - nssf - tax;

                    if (Math.abs(net - targetNet) < 5) {
                        grossKhr = mid;
                        break;
                    }
                    if (net < targetNet) {
                        low = mid;
                    } else {
                        high = mid;
                    }
                    grossKhr = mid;
                }

                const nssfKhr = calculateNssfKhr(grossKhr);
                const taxableBaseKhr = Math.max(0, grossKhr - nssfKhr - totalDependentReliefKhr.value);
                const taxKhr = calculateTaxOnSalaryKhr(taxableBaseKhr);

                return {
                    grossKhr,
                    nssfKhr,
                    taxableBaseKhr,
                    taxKhr,
                    netKhr: targetNet
                };
            }
        });

        const grossSalaryKhr = computed(() => computedResults.value.grossKhr);
        const grossSalaryUsd = computed(() => grossSalaryKhr.value / exchangeRate.value);

        const netSalaryKhr = computed(() => computedResults.value.netKhr);
        const netSalaryUsd = computed(() => netSalaryKhr.value / exchangeRate.value);

        const nssfDeductionKhr = computed(() => computedResults.value.nssfKhr);
        const nssfDeductionUsd = computed(() => nssfDeductionKhr.value / exchangeRate.value);

        const taxableBaseKhr = computed(() => computedResults.value.taxableBaseKhr);

        const taxOnSalaryKhr = computed(() => computedResults.value.taxKhr);
        const taxOnSalaryUsd = computed(() => taxOnSalaryKhr.value / exchangeRate.value);

        const effectiveTaxRate = computed(() => {
            if (grossSalaryKhr.value <= 0) return '0.0';
            return ((taxOnSalaryKhr.value / grossSalaryKhr.value) * 100).toFixed(1);
        });

        const formatNumber = (num) => {
            if (num === undefined || num === null || isNaN(num)) return '0';
            return Math.round(num).toLocaleString('en-US');
        };

        const copySalarySlip = async () => {
            const dateStr = new Date().toLocaleDateString('en-US');
            const text = `💼 [សន្លឹកបើកប្រាក់បៀវត្សរ៍ / Cambodia Salary Slip]\n` +
                         `📅 កាលបរិច្ឆេទ៖ ${dateStr}\n` +
                         `💰 ប្រាក់ខែសរុប (Gross)៖ $${grossSalaryUsd.value.toFixed(2)} (${formatNumber(grossSalaryKhr.value)} ៛)\n` +
                         `🛡️ កាត់វិភាគទាន ប.ស.ស (NSSF ២%)៖ -$${nssfDeductionUsd.value.toFixed(2)} (-${formatNumber(nssfDeductionKhr.value)} ៛)\n` +
                         `🏛️ ពន្ធលើប្រាក់បៀវត្សរ៍ (GDT TOS)៖ -$${taxOnSalaryUsd.value.toFixed(2)} (-${formatNumber(taxOnSalaryKhr.value)} ៛)\n` +
                         `💵 ប្រាក់ខែក្នុងដៃពិតប្រាកដ (Net)៖ $${netSalaryUsd.value.toFixed(2)} (${formatNumber(netSalaryKhr.value)} ៛)\n` +
                         `🔗 គណនាតាម៖ https://ngoytry-lyhuor.vercel.app/salary-tax-calculator`;

            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(text);
                    copiedSlip.value = true;
                    setTimeout(() => copiedSlip.value = false, 2500);
                }
            } catch (e) {
                console.error('Copy failed:', e);
            }
        };

        return {
            isKhmer,
            calcDirection,
            inputCurrency,
            salaryInput,
            exchangeRate,
            isResident,
            hasNonWorkingSpouse,
            childrenCount,
            deductNssf,
            copiedSlip,
            totalDependentReliefKhr,
            grossSalaryKhr,
            grossSalaryUsd,
            netSalaryKhr,
            netSalaryUsd,
            nssfDeductionKhr,
            nssfDeductionUsd,
            taxableBaseKhr,
            taxOnSalaryKhr,
            taxOnSalaryUsd,
            effectiveTaxRate,
            formatNumber,
            copySalarySlip
        };
    }
};
</script>
