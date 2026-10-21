<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-8 select-none transition-colors duration-300">
        <div class="w-full max-w-sm">

            <!-- Card Container -->
            <div 
                class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-all"
                :class="{ 'animate-shake': isShaking }">
                
                <!-- Ambient Top Glow -->
                <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 bg-emerald-500/10 dark:bg-emerald-500/20 blur-2xl rounded-full pointer-events-none"></div>

                <!-- Header -->
                <div class="text-center space-y-2 relative">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-2xl shadow-xs">
                        <span>🌴</span>
                    </div>

                    <div class="pt-1">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                            <span>🔒</span>
                            <span>{{ isKhmer ? 'កន្លែងឯកជន' : 'PRIVATE ACCESS' }}</span>
                        </div>
                        <h1 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
                            {{ isKhmer ? 'ប្រតិទិនបុណ្យជាតិ & ដើរលេង' : 'Holiday & Long Weekend Planner' }}
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {{ isKhmer ? 'សូមចុចលេខកូដសម្ងាត់ ៤ ខ្ទង់' : 'Enter 4-digit security PIN to unlock' }}
                        </p>
                    </div>
                </div>

                <!-- 4-Digit PIN Indicators -->
                <div class="my-6 sm:my-8 flex items-center justify-center gap-4">
                    <div 
                        v-for="(digit, index) in 4" 
                        :key="index"
                        class="w-4 h-4 rounded-full transition-all duration-200"
                        :class="getDotClass(index)">
                    </div>
                </div>

                <!-- Error / Feedback Message -->
                <div class="min-h-[22px] text-center mb-3">
                    <p 
                        v-if="errorMessage" 
                        class="text-xs font-mono font-bold text-rose-500 dark:text-rose-400 animate-fade-in flex items-center justify-center gap-1">
                        <span>⚠️</span>
                        <span>{{ errorMessage }}</span>
                    </p>
                    <p 
                        v-else-if="isSuccess" 
                        class="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 flex items-center justify-center gap-1">
                        <span>✓</span>
                        <span>{{ isKhmer ? 'លេខកូដត្រឹមត្រូវ! កំពុងបើក...' : 'Access Granted! Opening...' }}</span>
                    </p>
                    <p v-else class="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        {{ isKhmer ? 'ចុចលើក្ដារចុច ឬចុចលេខលើអេក្រង់' : 'Use on-screen keypad or physical keys' }}
                    </p>
                </div>

                <!-- Tactile Numeric Keypad (3x4 Grid) -->
                <div class="grid grid-cols-3 gap-3 sm:gap-3.5 max-w-[260px] mx-auto">
                    <button 
                        v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]" 
                        :key="num"
                        @click="handleKeyPress(num.toString())"
                        :disabled="isSuccess"
                        class="h-14 sm:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-800 active:scale-90 active:bg-emerald-100 text-slate-800 dark:text-slate-100 font-mono font-bold text-xl sm:text-2xl transition-all duration-100 shadow-xs focus:outline-none flex items-center justify-center disabled:opacity-50">
                        {{ num }}
                    </button>

                    <!-- Clear (C) -->
                    <button 
                        @click="clearPin"
                        :disabled="isSuccess || pin.length === 0"
                        class="h-14 sm:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 text-slate-500 dark:text-slate-400 font-mono font-bold text-sm transition-all duration-100 shadow-xs focus:outline-none flex items-center justify-center disabled:opacity-40">
                        {{ isKhmer ? 'លុប' : 'CLR' }}
                    </button>

                    <!-- 0 -->
                    <button 
                        @click="handleKeyPress('0')"
                        :disabled="isSuccess"
                        class="h-14 sm:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-800 active:scale-90 active:bg-emerald-100 text-slate-800 dark:text-slate-100 font-mono font-bold text-xl sm:text-2xl transition-all duration-100 shadow-xs focus:outline-none flex items-center justify-center disabled:opacity-50">
                        0
                    </button>

                    <!-- Backspace (⌫) -->
                    <button 
                        @click="backspace"
                        :disabled="isSuccess || pin.length === 0"
                        class="h-14 sm:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 text-slate-600 dark:text-slate-300 font-mono font-bold text-lg transition-all duration-100 shadow-xs focus:outline-none flex items-center justify-center disabled:opacity-40"
                        aria-label="Delete last digit">
                        ⌫
                    </button>
                </div>

                <!-- Footer Back Navigation -->
                <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
                    <router-link 
                        to="/"
                        class="text-xs font-mono text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                        ← {{ isKhmer ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Home' }}
                    </router-link>
                </div>
            </div>

            <!-- Passcode Hint Note -->
            <p class="text-[11px] text-center text-slate-400 mt-4 font-mono">
                🔒 Security Passcode: <span class="font-bold text-slate-600 dark:text-slate-300">5503</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';

const router = useRouter();
const { isKhmer } = useLanguage();

// Correct passcode requested by user
const TARGET_PASSCODE = '5503';
const BACKUP_PASSCODE = 'lyhuor';

const pin = ref('');
const errorMessage = ref('');
const isShaking = ref(false);
const isSuccess = ref(false);

// Styling for 4 indicator dots
const getDotClass = (index) => {
    if (isSuccess.value) {
        return 'bg-emerald-500 border-2 border-emerald-500 shadow-md shadow-emerald-500/50 scale-125';
    }
    if (errorMessage.value) {
        return 'bg-rose-500 border-2 border-rose-500 shadow-sm shadow-rose-500/40';
    }
    if (index < pin.value.length) {
        return 'bg-emerald-500 border-2 border-emerald-500 scale-110 shadow-sm shadow-emerald-500/30';
    }
    return 'border-2 border-slate-300 dark:border-slate-700 bg-transparent';
};

// Key press handler
const handleKeyPress = (num) => {
    if (isSuccess.value || pin.value.length >= 4) return;
    errorMessage.value = '';

    pin.value += num;

    // Check automatically when 4 digits are reached
    if (pin.value.length === 4) {
        verifyPin();
    }
};

// Backspace
const backspace = () => {
    if (isSuccess.value || pin.value.length === 0) return;
    errorMessage.value = '';
    pin.value = pin.value.slice(0, -1);
};

// Clear
const clearPin = () => {
    if (isSuccess.value) return;
    errorMessage.value = '';
    pin.value = '';
};

// Verify PIN
const verifyPin = async () => {
    if (pin.value === TARGET_PASSCODE || pin.value === BACKUP_PASSCODE) {
        // Success
        isSuccess.value = true;
        errorMessage.value = '';
        sessionStorage.setItem('holiday_auth', 'true');

        setTimeout(() => {
            router.push('/holiday-planner');
        }, 500);
    } else {
        // Incorrect PIN
        isShaking.value = true;
        errorMessage.value = isKhmer.value ? 'លេខសម្ងាត់មិនត្រឹមត្រូវទេ' : 'Incorrect Passcode';

        setTimeout(() => {
            isShaking.value = false;
            pin.value = '';
        }, 600);
    }
};

// Physical keyboard listener
const handleKeyDown = (event) => {
    if (isSuccess.value) return;

    if (/^[0-9]$/.test(event.key)) {
        handleKeyPress(event.key);
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape' || event.key === 'Delete') {
        clearPin();
    }
};

onMounted(() => {
    // If already authenticated, redirect directly
    if (sessionStorage.getItem('holiday_auth') === 'true') {
        router.replace('/holiday-planner');
        return;
    }
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
}

.animate-shake {
    animation: shake 0.4s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-3px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}
</style>
