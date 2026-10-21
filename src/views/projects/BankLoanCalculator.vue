<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'គណនាប្រាក់កម្ចីទិញផ្ទះ & រំលស់ធនាគារកម្ពុជា' : 'CAMBODIA BANK LOAN & MORTGAGE AMORTIZATION' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">ABA // ACLEDA // CANADIA</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">DECLINING VS FLAT RATES</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 rounded-md">
                                <span>🏦</span>
                                <span>{{ isKhmer ? 'ម៉ាស៊ីនគណនាប្រាក់កម្ចី & ការប្រាក់' : 'LOAN & MORTGAGE ENGINE' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'គណនាប្រាក់កម្ចីទិញផ្ទះ បុរី និងរំលស់ឡាន' : 'Cambodia Housing Mortgage & Loan Calculator' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'គណនាប្រាក់បង់ប្រចាំខែ ការប្រាក់សរុប និងតារាងរំលស់ប្រចាំខែ (Amortization Schedule) សម្រាប់កម្ចីទិញផ្ទះបុរី ខុនដូ ទិញឡាន ឬកម្ចីអាជីវកម្ម ដោយប្រៀបធៀបរវាងការប្រាក់ថយ (Declining Balance) និងការប្រាក់ស្មើ (Flat Rate)។' 
                                    : 'Calculate monthly bank installments, total interest paid, and full monthly amortization schedules for borey homes, condos, vehicle loans, and business financing with declining and flat interest models.' }}
                            </p>
                        </div>

                        <!-- Loan Type Selector -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ប្រភេទកម្ចី' : 'Loan Category' }}
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="loanCategory = 'home'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="loanCategory === 'home' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? 'ផ្ទះ/បុរី' : 'Home' }}
                                </button>
                                <button 
                                    @click="loanCategory = 'car'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="loanCategory === 'car' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? 'ឡាន/យានយន្ត' : 'Auto' }}
                                </button>
                            </div>
                            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-800">
                                <span class="text-slate-500 dark:text-slate-400">{{ isKhmer ? 'រូបិយប័ណ្ណ' : 'Currency' }}</span>
                                <div class="inline-flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-bold font-mono">
                                    <button 
                                        @click="currency = 'USD'"
                                        class="px-2 py-0.5 rounded-md transition-all"
                                        :class="currency === 'USD' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-500'">
                                        USD ($)
                                    </button>
                                    <button 
                                        @click="currency = 'KHR'"
                                        class="px-2 py-0.5 rounded-md transition-all"
                                        :class="currency === 'KHR' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-500'">
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
                <!-- Inputs Panel -->
                <div class="lg:col-span-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-lg">📊</span>
                            <div>
                                <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'ព័ត៌មានលម្អិតនៃប្រាក់កម្ចី' : 'Loan Input Parameters' }}
                                </h2>
                                <p class="text-xs text-slate-500 dark:text-slate-400">
                                    {{ isKhmer ? 'កែប្រែទំហំកម្ចី ការប្រាក់ និងរយៈពេលខ្ចី' : 'Adjust principal, rate, and tenure' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Interest Type: Declining vs Flat -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {{ isKhmer ? 'វិធីសាស្ត្រគិតការប្រាក់ (Interest Calculation Method)' : 'Interest Method' }}
                        </label>
                        <div class="grid grid-cols-2 gap-2">
                            <button 
                                @click="interestMethod = 'declining'"
                                class="p-3 rounded-xl border text-left transition-all cursor-pointer"
                                :class="interestMethod === 'declining' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'">
                                <div class="font-bold text-xs">{{ isKhmer ? 'ការប្រាក់ថយ (Declining)' : 'Declining Balance' }}</div>
                                <div class="text-[10px] opacity-75 mt-0.5">{{ isKhmer ? 'ស្តង់ដារកម្ចីផ្ទះបុរី ធនាគារ ABA/Canadia' : 'Standard mortgage method' }}</div>
                            </button>
                            <button 
                                @click="interestMethod = 'flat'"
                                class="p-3 rounded-xl border text-left transition-all cursor-pointer"
                                :class="interestMethod === 'flat' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'">
                                <div class="font-bold text-xs">{{ isKhmer ? 'ការប្រាក់ស្មើ (Flat Rate)' : 'Flat Rate' }}</div>
                                <div class="text-[10px] opacity-75 mt-0.5">{{ isKhmer ? 'ទូទៅសម្រាប់កម្ចីទិញឡាន/មីក្រូហិរញ្ញវត្ថុ' : 'Auto / microfinance loans' }}</div>
                            </button>
                        </div>
                    </div>

                    <!-- Loan Amount -->
                    <div class="space-y-1">
                        <div class="flex items-center justify-between">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'ទំហំប្រាក់កម្ចី (Loan Principal)' : 'Loan Principal' }} *
                            </label>
                            <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(loanAmount) }}</span>
                        </div>
                        <div class="relative">
                            <input 
                                type="number" 
                                min="100" 
                                :step="currency === 'USD' ? '1000' : '5000000'"
                                v-model.number="loanAmount"
                                class="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <span class="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-400">{{ currency }}</span>
                        </div>

                        <!-- Presets -->
                        <div class="flex flex-wrap items-center gap-1.5 pt-1">
                            <button 
                                v-for="amt in (currency === 'USD' ? [15000, 30000, 50000, 80000, 120000] : [60000000, 120000000, 200000000, 400000000])" 
                                :key="amt"
                                @click="loanAmount = amt"
                                class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                {{ formatCurrency(amt) }}
                            </button>
                        </div>
                    </div>

                    <!-- Interest Rate & Duration Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <!-- Annual Interest Rate -->
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'អត្រាការប្រាក់ (% ក្នុង១ឆ្នាំ)' : 'Annual Interest Rate (%)' }} *
                            </label>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    min="0.1" 
                                    max="36" 
                                    step="0.1"
                                    v-model.number="annualRate"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <span class="absolute right-3 top-2 text-xs font-mono font-bold text-slate-400">% / ឆ្នាំ</span>
                            </div>
                            <div class="flex gap-1 pt-0.5">
                                <button v-for="r in [6.5, 7.5, 8.5, 9.5]" :key="r" @click="annualRate = r" class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{{ r }}%</button>
                            </div>
                        </div>

                        <!-- Loan Tenure in Years -->
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'រយៈពេលកម្ចី (ឆ្នាំ)' : 'Loan Tenure (Years)' }} *
                            </label>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="30" 
                                    v-model.number="tenureYears"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <span class="absolute right-3 top-2 text-xs font-mono font-bold text-slate-400">{{ tenureYears * 12 }} ខែ</span>
                            </div>
                            <div class="flex gap-1 pt-0.5">
                                <button v-for="y in [5, 10, 15, 20, 25]" :key="y" @click="tenureYears = y" class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{{ y }} ឆ្នាំ</button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Results & Installment Summary -->
                <div class="lg:col-span-6 space-y-4">
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <span class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'លទ្ធផលនៃការបង់ប្រាក់' : 'Repayment Summary' }}
                            </span>
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                                {{ interestMethod }}
                            </span>
                        </div>

                        <!-- Monthly Installment Highlight -->
                        <div class="text-center py-2 space-y-1">
                            <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {{ isKhmer ? 'ប្រាក់ត្រូវបង់ប្រចាំខែ (Monthly Installment)' : 'Monthly Payment Installment' }}
                            </div>
                            <div class="text-3xl sm:text-4xl font-black font-mono text-blue-600 dark:text-blue-400">
                                {{ formatCurrency(loanResults.monthlyPayment) }}
                            </div>
                            <div class="text-[11px] font-mono text-slate-400">
                                {{ isKhmer ? `សម្រាប់រយៈពេល ${tenureYears} ឆ្នាំ (${tenureYears * 12} ខែ)` : `For ${tenureYears} years (${tenureYears * 12} payments)` }}
                            </div>
                        </div>

                        <!-- Breakdown Cards -->
                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-0.5">
                                <div class="text-slate-400 text-[10px] font-mono uppercase">{{ isKhmer ? 'ការប្រាក់សរុប' : 'Total Interest' }}</div>
                                <div class="text-base font-black font-mono text-rose-600 dark:text-rose-400">{{ formatCurrency(loanResults.totalInterest) }}</div>
                                <div class="text-[10px] text-slate-400 font-mono">{{ ((loanResults.totalInterest / loanAmount) * 100).toFixed(1) }}% of principal</div>
                            </div>

                            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-0.5">
                                <div class="text-slate-400 text-[10px] font-mono uppercase">{{ isKhmer ? 'ទឹកប្រាក់សងសរុប' : 'Total Repayment' }}</div>
                                <div class="text-base font-black font-mono text-slate-900 dark:text-white">{{ formatCurrency(loanResults.totalPayment) }}</div>
                                <div class="text-[10px] text-slate-400 font-mono">Principal + Interest</div>
                            </div>
                        </div>

                        <!-- Visual Ratio Bar -->
                        <div class="space-y-1.5 pt-1">
                            <div class="flex justify-between text-[11px] font-mono">
                                <span class="text-blue-600 font-bold">Principal ({{ ((loanAmount / loanResults.totalPayment) * 100).toFixed(0) }}%)</span>
                                <span class="text-rose-600 font-bold">Interest ({{ ((loanResults.totalInterest / loanResults.totalPayment) * 100).toFixed(0) }}%)</span>
                            </div>
                            <div class="w-full h-2.5 rounded-full bg-rose-500 overflow-hidden flex">
                                <div class="h-full bg-blue-600" :style="{ width: `${(loanAmount / loanResults.totalPayment) * 100}%` }"></div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="pt-2 flex items-center gap-2">
                            <button 
                                @click="showSchedule = !showSchedule"
                                class="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                                <span>📅</span>
                                <span>{{ showSchedule ? (isKhmer ? 'លាក់តារាងបង់ប្រចាំខែ' : 'Hide Amortization Table') : (isKhmer ? 'មើលតារាងរំលស់ប្រចាំខែ' : 'View Monthly Schedule') }}</span>
                            </button>
                            <button 
                                @click="exportCsv"
                                class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 cursor-pointer"
                                :title="isKhmer ? 'ទាញយកតារាងជា Excel / CSV' : 'Export CSV'">
                                <span>📥</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Amortization Schedule Table (Collapsible) -->
            <div v-if="showSchedule" class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div class="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <span>🗓️</span>
                        <span>{{ isKhmer ? 'តារាងកាលវិភាគបង់រំលស់ប្រចាំខែ (Amortization Schedule)' : 'Monthly Payment Schedule' }}</span>
                    </div>
                    <span class="text-xs font-mono text-slate-400">{{ tenureYears * 12 }} Payments</span>
                </div>

                <div class="max-h-96 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table class="w-full text-left text-xs font-mono">
                        <thead class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 sticky top-0">
                            <tr>
                                <th class="p-2.5">#</th>
                                <th class="p-2.5">{{ isKhmer ? 'សមតុល្យដើមគ្រា' : 'Beg. Balance' }}</th>
                                <th class="p-2.5">{{ isKhmer ? 'ប្រាក់ត្រូវបង់' : 'Payment' }}</th>
                                <th class="p-2.5 text-blue-600 dark:text-blue-400">{{ isKhmer ? 'ប្រាក់ដើម' : 'Principal' }}</th>
                                <th class="p-2.5 text-rose-600 dark:text-rose-400">{{ isKhmer ? 'ការប្រាក់' : 'Interest' }}</th>
                                <th class="p-2.5">{{ isKhmer ? 'សមតុល្យចុងគ្រា' : 'Ending Balance' }}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                            <tr v-for="row in amortizationSchedule.slice(0, 120)" :key="row.month" class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td class="p-2 font-bold">{{ row.month }}</td>
                                <td class="p-2">{{ formatCurrency(row.beginning) }}</td>
                                <td class="p-2 font-bold">{{ formatCurrency(row.payment) }}</td>
                                <td class="p-2 text-blue-600 dark:text-blue-400 font-bold">{{ formatCurrency(row.principal) }}</td>
                                <td class="p-2 text-rose-600 dark:text-rose-400 font-bold">{{ formatCurrency(row.interest) }}</td>
                                <td class="p-2">{{ formatCurrency(row.ending) }}</td>
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
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'BankLoanCalculator',
    setup() {
        const { isKhmer } = useLanguage();

        // State
        const loanCategory = ref('home');
        const currency = ref('USD');
        const interestMethod = ref('declining'); // 'declining' or 'flat'
        const loanAmount = ref(50000);
        const annualRate = ref(7.5);
        const tenureYears = ref(15);
        const showSchedule = ref(false);

        const formatCurrency = (val) => {
            if (val === undefined || val === null || isNaN(val)) return '0';
            if (currency.value === 'USD') return `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            return `${Math.round(val).toLocaleString('en-US')} ៛`;
        };

        const loanResults = computed(() => {
            const P = loanAmount.value || 0;
            const r = (annualRate.value || 0) / 100 / 12; // Monthly interest rate
            const n = Math.max((tenureYears.value || 1) * 12, 1); // Total months

            if (P <= 0 || r <= 0) {
                return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
            }

            if (interestMethod.value === 'flat') {
                // Flat rate formula
                const totalInterest = P * ((annualRate.value || 0) / 100) * (tenureYears.value || 1);
                const totalPayment = P + totalInterest;
                const monthlyPayment = totalPayment / n;
                return { monthlyPayment, totalInterest, totalPayment };
            } else {
                // Declining balance amortization (EMI)
                // PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
                const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
                const totalPayment = monthlyPayment * n;
                const totalInterest = totalPayment - P;
                return { monthlyPayment, totalInterest, totalPayment };
            }
        });

        const amortizationSchedule = computed(() => {
            const P = loanAmount.value || 0;
            const r = (annualRate.value || 0) / 100 / 12;
            const n = Math.max((tenureYears.value || 1) * 12, 1);
            const schedule = [];

            if (P <= 0) return schedule;

            let balance = P;
            const monthlyPayment = loanResults.value.monthlyPayment;

            if (interestMethod.value === 'flat') {
                const monthlyPrincipal = P / n;
                const monthlyInterest = loanResults.value.totalInterest / n;
                for (let i = 1; i <= n; i++) {
                    const beg = balance;
                    balance = Math.max(0, balance - monthlyPrincipal);
                    schedule.push({
                        month: i,
                        beginning: beg,
                        payment: monthlyPayment,
                        principal: monthlyPrincipal,
                        interest: monthlyInterest,
                        ending: balance
                    });
                }
            } else {
                for (let i = 1; i <= n; i++) {
                    const beg = balance;
                    const interest = beg * r;
                    const principal = monthlyPayment - interest;
                    balance = Math.max(0, beg - principal);
                    schedule.push({
                        month: i,
                        beginning: beg,
                        payment: monthlyPayment,
                        principal,
                        interest,
                        ending: balance
                    });
                }
            }

            return schedule;
        });

        const exportCsv = () => {
            const rows = [
                ['Month', 'Beginning Balance', 'Payment', 'Principal', 'Interest', 'Ending Balance']
            ];
            amortizationSchedule.value.forEach(r => {
                rows.push([r.month, r.beginning.toFixed(2), r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.ending.toFixed(2)]);
            });

            const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `loan_schedule_${loanAmount.value}_${tenureYears.value}yr.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return {
            isKhmer,
            loanCategory,
            currency,
            interestMethod,
            loanAmount,
            annualRate,
            tenureYears,
            showSchedule,
            formatCurrency,
            loanResults,
            amortizationSchedule,
            exportCsv
        };
    }
};
</script>
