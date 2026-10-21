<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-7xl mx-auto space-y-5 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ស្តង់ដារទូទាត់ជាតិបាគង KHQR (EMVCo)' : 'NATIONAL BANK OF CAMBODIA BAKONG KHQR' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-red-600 dark:text-red-400 font-bold">KHQR GENERATOR // BILL SPLIT</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">100% CLIENT-SIDE OFFLINE</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-3xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 rounded-md">
                                <span>🇰🇭</span>
                                <span>{{ isKhmer ? 'ម៉ាស៊ីនបង្កើត KHQR & ចែកវិក្កយបត្រ' : 'BAKONG KHQR & BILL SPLITTER' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'បង្កើតកូដបាគង KHQR និងចែកលុយញ៉ាំបាយ' : 'Bakong KHQR Generator & Group Bill Splitter' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'បង្កើតកូដទូទាត់ KHQR ផ្លូវការស្របតាមស្តង់ដារ EMVCo ធនាគារជាតិនៃកម្ពុជា (ស្កេនបានគ្រប់ធនាគារ ABA, ACLEDA, Wing, Canadia...) និងឧបករណ៍ចែកវិក្កយបត្រញ៉ាំបាយជាមួយមិត្តភក្តិ រួមទាំងបង្កាន់ដៃចែកលុយក្នុង Telegram។' 
                                    : 'Generate official EMVCo-compliant Bakong KHQR payment codes accepted by all Cambodian banking apps. Includes an interactive group dining bill splitter and downloadable receipt cards.' }}
                            </p>
                        </div>

                        <!-- Mode Switcher -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-80 shrink-0">
                            <div class="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {{ isKhmer ? 'ជ្រើសរើសរបៀបប្រើប្រាស់' : 'Select Tool Mode' }}
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="activeMode = 'single'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeMode === 'single' ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? 'បង្កើត KHQR' : 'Quick KHQR' }}
                                </button>
                                <button 
                                    @click="activeMode = 'split'"
                                    class="py-1.5 px-2 rounded-lg transition-all"
                                    :class="activeMode === 'split' ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'">
                                    {{ isKhmer ? 'ចែកវិក្កយបត្រ' : 'Split Bill' }}
                                </button>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <span>🔒</span>
                                <span>{{ isKhmer ? 'សុវត្ថិភាព ១០០% មិនរក្សាទុកទិន្នន័យ' : '100% Private - Processed in your browser' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                <!-- Left Input Panel -->
                <div class="lg:col-span-7 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 space-y-5 shadow-sm">
                    
                    <!-- Account & Merchant Details -->
                    <div class="space-y-3.5">
                        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <span>💳</span>
                                <span>{{ isKhmer ? 'ព័ត៌មានគណនីទទួលប្រាក់' : 'Recipient Account Information' }}</span>
                            </div>
                            <span class="text-[11px] font-mono text-red-600 dark:text-red-400 font-semibold">BAKONG ID</span>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'Bakong Account ID / លេខទូរស័ព្ទ' : 'Bakong ID or Phone Number' }} *
                                </label>
                                <input 
                                    type="text" 
                                    v-model="bakongId" 
                                    placeholder="e.g. john_doe@abaa or 85512345678"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                                <div class="text-[10px] text-slate-400">
                                    {{ isKhmer ? 'ឧ. xxx@abaa, xxx@aclb, 85512345678@wing' : 'e.g. your_name@abaa or 855xxxxxxxx' }}
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ឈ្មោះគណនីទទួល' : 'Recipient / Merchant Name' }} *
                                </label>
                                <input 
                                    type="text" 
                                    v-model="merchantName" 
                                    placeholder="e.g. SOK CHANTHA"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>
                        </div>

                        <!-- Currency Selector -->
                        <div class="flex items-center justify-between pt-1">
                            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ isKhmer ? 'រូបិយប័ណ្ណទូទាត់' : 'Payment Currency' }}</span>
                            <div class="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold font-mono">
                                <button 
                                    @click="currency = 'USD'" 
                                    class="px-3 py-1 rounded-lg transition-all"
                                    :class="currency === 'USD' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500'">
                                    USD ($)
                                </button>
                                <button 
                                    @click="currency = 'KHR'" 
                                    class="px-3 py-1 rounded-lg transition-all"
                                    :class="currency === 'KHR' ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-500'">
                                    KHR (៛)
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Mode 1: Quick Single KHQR Input -->
                    <div v-if="activeMode === 'single'" class="space-y-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <span>💵</span>
                            <span>{{ isKhmer ? 'ចំនួនទឹកប្រាក់' : 'Amount' }}</span>
                        </div>
                        <div class="space-y-1">
                            <div class="relative">
                                <input 
                                    type="number" 
                                    min="0"
                                    :step="currency === 'USD' ? '0.01' : '100'"
                                    v-model.number="singleAmount"
                                    placeholder="Optional (Leave empty for open amount)"
                                    class="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                                <span class="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-400">{{ currency }}</span>
                            </div>
                        </div>

                        <!-- Preset amounts -->
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span class="text-[10px] text-slate-400 font-mono">{{ isKhmer ? 'ទឹកប្រាក់រហ័ស៖' : 'Quick select:' }}</span>
                            <button 
                                v-for="amt in (currency === 'USD' ? [1, 2.5, 5, 10, 20, 50] : [5000, 10000, 20000, 40000, 100000])" 
                                :key="amt"
                                @click="singleAmount = amt"
                                class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                {{ currency === 'USD' ? `$${amt}` : `${amt.toLocaleString()} ៛` }}
                            </button>
                        </div>
                    </div>

                    <!-- Mode 2: Group Bill Splitter Input -->
                    <div v-else class="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div class="flex items-center justify-between">
                            <div class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <span>🍽️</span>
                                <span>{{ isKhmer ? 'ព័ត៌មានវិក្កយបត្រញ៉ាំបាយ' : 'Dining Bill Breakdown' }}</span>
                            </div>
                            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold">
                                {{ splitCount }} {{ isKhmer ? 'នាក់' : 'people' }}
                            </span>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'សរុបថ្លៃម្ហូប/វិក្កយបត្រ' : 'Bill Subtotal' }} *
                                </label>
                                <input 
                                    type="number" 
                                    min="0"
                                    :step="currency === 'USD' ? '0.01' : '100'"
                                    v-model.number="billSubtotal"
                                    placeholder="0"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'ចំនួនមនុស្សចែក (នាក់)' : 'Split Count' }} *
                                </label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="50"
                                    v-model.number="splitCount"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {{ isKhmer ? 'Service / Tip (%)' : 'Service / Tip (%)' }}
                                </label>
                                <input 
                                    type="number" 
                                    min="0"
                                    max="50"
                                    v-model.number="billTipPercent"
                                    placeholder="0"
                                    class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>
                        </div>

                        <!-- Split Count Quick Steppers -->
                        <div class="flex items-center gap-1.5">
                            <span class="text-[10px] text-slate-400 font-mono">{{ isKhmer ? 'ចំនួននាក់រហ័ស៖' : 'Quick split:' }}</span>
                            <button 
                                v-for="cnt in [2, 3, 4, 5, 6, 8, 10]" 
                                :key="cnt"
                                @click="splitCount = cnt"
                                class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors">
                                {{ cnt }}
                            </button>
                        </div>
                    </div>

                    <!-- Custom Note / Bill Label -->
                    <div class="space-y-1 pt-1">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {{ isKhmer ? 'ចំណាំ / ឈ្មោះវិក្កយបត្រ (បង្ហាញក្នុងបង្កាន់ដៃ)' : 'Note / Bill Purpose (Shown on receipt)' }}
                        </label>
                        <input 
                            type="text" 
                            v-model="billNote"
                            placeholder="e.g. Lunch at Brown Coffee / Dinner with team"
                            class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>

                </div>

                <!-- Right Preview & Card Panel -->
                <div class="lg:col-span-5 space-y-4">
                    <!-- KHQR Display Card -->
                    <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm space-y-4 text-center">
                        <!-- Card Header -->
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                                <span class="font-black tracking-tight text-xs uppercase font-mono text-red-600 dark:text-red-400">KHQR</span>
                            </div>
                            <span class="text-[10px] font-mono text-slate-400">BAKONG STANDARD</span>
                        </div>

                        <!-- Amount Display for Split or Single -->
                        <div class="space-y-1">
                            <div class="text-xs text-slate-400 font-mono uppercase">
                                {{ activeMode === 'split' ? (isKhmer ? 'ម្នាក់ៗត្រូវបង់' : 'Per Person Amount') : (isKhmer ? 'ទឹកប្រាក់ទូទាត់' : 'Payment Amount') }}
                            </div>
                            <div class="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                                <span v-if="currency === 'USD'">${{ finalPayAmount.toFixed(2) }}</span>
                                <span v-else>{{ Math.round(finalPayAmount).toLocaleString() }} <span class="text-base text-red-600 font-sans">៛</span></span>
                            </div>
                            <div v-if="activeMode === 'split'" class="text-[11px] text-slate-400 font-mono">
                                {{ isKhmer ? `(សរុប ${formatCurrency(totalBillWithTip)} ចែក ${splitCount} នាក់)` : `(Total ${formatCurrency(totalBillWithTip)} split by ${splitCount})` }}
                            </div>
                        </div>

                        <!-- QR Code Frame -->
                        <div class="p-3 bg-gradient-to-b from-red-600 to-red-700 rounded-2xl inline-block shadow-md">
                            <div class="bg-white p-3 rounded-xl">
                                <img 
                                    v-if="qrDataUrl" 
                                    :src="qrDataUrl" 
                                    alt="Bakong KHQR" 
                                    class="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain" />
                                <div v-else class="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-xs text-slate-400 font-mono">
                                    {{ isKhmer ? 'សូមបញ្ចូល Bakong ID...' : 'Enter Bakong ID to generate...' }}
                                </div>
                            </div>
                        </div>

                        <!-- Recipient Tag -->
                        <div class="text-xs space-y-0.5 font-mono">
                            <div class="font-bold text-slate-900 dark:text-white uppercase">{{ merchantName || 'RECIPIENT NAME' }}</div>
                            <div class="text-[11px] text-slate-400 truncate max-w-xs mx-auto">{{ bakongId || 'account@bank' }}</div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-2 pt-2">
                            <button 
                                @click="downloadQr"
                                :disabled="!qrDataUrl"
                                class="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                                <span>📥</span>
                                <span>{{ isKhmer ? 'ទាញយក QR' : 'Download QR' }}</span>
                            </button>
                            <button 
                                @click="copyShareText"
                                class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                                <span>{{ copied ? '✓' : '📋' }}</span>
                                <span>{{ copied ? (isKhmer ? 'បានចម្លង!' : 'Copied!') : (isKhmer ? 'ចម្លងវិក្កយបត្រ' : 'Copy Bill') }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Scan Instructions Card -->
                    <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl text-xs space-y-2">
                        <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <span>📲</span>
                            <span>{{ isKhmer ? 'របៀបស្កេនទូទាត់' : 'How to Pay via KHQR' }}</span>
                        </div>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                            {{ isKhmer 
                                ? 'បើកកម្មវិធីធនាគារណាមួយនៅក្នុងទូរស័ព្ទរបស់អ្នក (ABA Mobile, ACLEDA, Wing, Canadia, Bakong App...) ហើយចុចលើប៊ូតុង QR ដើម្បីស្កេនទូទាត់ប្រាក់ភ្លាមៗ។' 
                                : 'Open any Cambodian mobile banking app (ABA, ACLEDA, Wing, Canadia, etc.) and scan this KHQR code to send the exact split amount immediately.' }}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import QRCode from 'qrcode';

export default {
    name: 'KhqrBillSplitter',
    setup() {
        const { isKhmer } = useLanguage();

        // State
        const activeMode = ref('single'); // 'single' or 'split'
        const bakongId = ref('ngoytry_lyhuor@abaa');
        const merchantName = ref('NGOYTRY LYHUOR');
        const currency = ref('USD');
        const singleAmount = ref(5);
        const billSubtotal = ref(20);
        const splitCount = ref(4);
        const billTipPercent = ref(0);
        const billNote = ref('');
        const qrDataUrl = ref('');
        const copied = ref(false);

        // CRC16 CCITT-FALSE Checksum for EMVCo
        const calculateCrc16 = (data) => {
            let crc = 0xFFFF;
            for (let i = 0; i < data.length; i++) {
                crc ^= (data.charCodeAt(i) << 8);
                for (let j = 0; j < 8; j++) {
                    if ((crc & 0x8000) !== 0) {
                        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
                    } else {
                        crc = (crc << 1) & 0xFFFF;
                    }
                }
            }
            return crc.toString(16).toUpperCase().padStart(4, '0');
        };

        const tlv = (tag, val) => {
            const strVal = String(val);
            const len = String(strVal.length).padStart(2, '0');
            return tag + len + strVal;
        };

        const totalBillWithTip = computed(() => {
            const sub = billSubtotal.value || 0;
            const tip = (sub * (billTipPercent.value || 0)) / 100;
            return sub + tip;
        });

        const finalPayAmount = computed(() => {
            if (activeMode.value === 'split') {
                const count = Math.max(splitCount.value || 1, 1);
                const perPerson = totalBillWithTip.value / count;
                return currency.value === 'USD' ? Number(perPerson.toFixed(2)) : Math.round(perPerson);
            }
            return singleAmount.value || 0;
        });

        // Generate official EMVCo Bakong KHQR String
        const generateKhqrString = () => {
            if (!bakongId.value) return '';

            let sub29 = tlv('00', 'bakong@nbc.gov.kh');
            sub29 += tlv('01', bakongId.value);

            let raw = '';
            raw += tlv('00', '01'); // Payload format indicator
            raw += tlv('01', finalPayAmount.value > 0 ? '12' : '11'); // 12 dynamic, 11 static
            raw += tlv('29', sub29);
            raw += tlv('52', '5999'); // Merchant Category Code
            raw += tlv('53', currency.value === 'KHR' ? '116' : '840'); // Currency code
            
            if (finalPayAmount.value > 0) {
                const amtStr = currency.value === 'USD' 
                    ? finalPayAmount.value.toFixed(2) 
                    : String(Math.round(finalPayAmount.value));
                raw += tlv('54', amtStr);
            }

            raw += tlv('58', 'KH'); // Country code
            raw += tlv('59', (merchantName.value || 'Merchant').substring(0, 25)); // Merchant Name
            raw += tlv('60', 'Phnom Penh'); // City

            if (billNote.value) {
                raw += tlv('62', tlv('01', billNote.value.substring(0, 25)));
            }

            raw += '6304';
            const checksum = calculateCrc16(raw);
            return raw + checksum;
        };

        const renderQrCode = async () => {
            const khqr = generateKhqrString();
            if (!khqr) {
                qrDataUrl.value = '';
                return;
            }

            try {
                const url = await QRCode.toDataURL(khqr, {
                    width: 320,
                    margin: 1,
                    color: {
                        dark: '#0f172a',
                        light: '#ffffff'
                    }
                });
                qrDataUrl.value = url;
            } catch (err) {
                console.error('Failed to render KHQR:', err);
                qrDataUrl.value = '';
            }
        };

        watch([bakongId, merchantName, currency, singleAmount, billSubtotal, splitCount, billTipPercent, billNote, activeMode], () => {
            renderQrCode();
        });

        onMounted(() => {
            renderQrCode();
        });

        const formatCurrency = (val) => {
            if (currency.value === 'USD') return `$${Number(val).toFixed(2)}`;
            return `${Math.round(val).toLocaleString()} ៛`;
        };

        const downloadQr = () => {
            if (!qrDataUrl.value) return;
            const a = document.createElement('a');
            a.href = qrDataUrl.value;
            a.download = `KHQR_${(merchantName.value || 'Payment').replace(/\s+/g, '_')}_${finalPayAmount.value}${currency.value}.png`;
            a.click();
        };

        const copyShareText = async () => {
            const dateStr = new Date().toLocaleDateString('en-US');
            let text = '';
            if (activeMode.value === 'split') {
                text = `🍽️ [វិក្កយបត្រញ៉ាំបាយ / Dining Bill Split]\n` +
                       `📅 កាលបរិច្ឆេទ៖ ${dateStr}\n` +
                       (billNote.value ? `📝 ចំណាំ៖ ${billNote.value}\n` : '') +
                       `💰 សរុបវិក្កយបត្រ៖ ${formatCurrency(totalBillWithTip.value)}\n` +
                       `👥 ចំនួនអ្នកញ៉ាំ៖ ${splitCount.value} នាក់\n` +
                       `👉 ម្នាក់ៗត្រូវបង់៖ ${formatCurrency(finalPayAmount.value)}\n` +
                       `📲 ស្កេនទូទាត់តាម Bakong KHQR៖ ${bakongId.value} (${merchantName.value})\n` +
                       `🔗 គណនាតាម៖ https://ngoytry-lyhuor.vercel.app/khqr-bill-splitter`;
            } else {
                text = `🇰🇭 [Bakong KHQR Payment Request]\n` +
                       `👤 គណនីទទួល៖ ${merchantName.value} (${bakongId.value})\n` +
                       `💵 ទឹកប្រាក់៖ ${formatCurrency(finalPayAmount.value)}\n` +
                       (billNote.value ? `📝 ចំណាំ៖ ${billNote.value}\n` : '') +
                       `🔗 បង្កើតកូដ KHQR ដោយឥតគិតថ្លៃ៖ https://ngoytry-lyhuor.vercel.app/khqr-bill-splitter`;
            }

            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(text);
                    copied.value = true;
                    setTimeout(() => copied.value = false, 2500);
                }
            } catch (err) {
                console.error('Copy failed:', err);
            }
        };

        return {
            isKhmer,
            activeMode,
            bakongId,
            merchantName,
            currency,
            singleAmount,
            billSubtotal,
            splitCount,
            billTipPercent,
            billNote,
            qrDataUrl,
            copied,
            totalBillWithTip,
            finalPayAmount,
            formatCurrency,
            downloadQr,
            copyShareText
        };
    }
};
</script>
