<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-12">
        <div class="max-w-md w-full">
            <!-- Card -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 border-t-4 border-t-emerald-500">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="flex justify-center mb-4">
                        <div class="bg-emerald-100 dark:bg-emerald-950/60 rounded-full p-4 border border-emerald-200 dark:border-emerald-800">
                            <span class="text-3xl">🌴</span>
                        </div>
                    </div>
                    <div class="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-md mb-2">
                        {{ isKhmer ? 'កន្លែងឯកជន • PRIVATE ACCESS' : 'PROTECTED ACCESS' }}
                    </div>
                    <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {{ isKhmer ? 'ប្រតិទិនឈប់សម្រាក & គម្រោង Long Weekend' : 'Cambodia Holiday & Long Weekend Planner' }}
                    </h1>
                    <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                        {{ isKhmer ? 'សូមបញ្ចូលលេខសម្ងាត់ Passcode ដើម្បីចូលមើលទិន្នន័យ' : 'Enter passcode to access vacation planner' }}
                    </p>
                </div>

                <!-- Error Message -->
                <div 
                    v-if="errorMessage" 
                    class="mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
                    <span>⚠️</span>
                    <p>{{ errorMessage }}</p>
                </div>

                <!-- Password Form -->
                <form @submit.prevent="handleSubmit" class="space-y-5">
                    <div>
                        <label for="password" class="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                            {{ isKhmer ? 'លេខសម្ងាត់ (Passcode)' : 'Passcode' }}
                        </label>
                        <div class="relative">
                            <input 
                                id="password"
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                :placeholder="isKhmer ? 'បញ្ចូលលេខកូដ...' : 'Enter passcode'"
                                class="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono transition-all"
                                :class="{ 'border-red-500': errorMessage }"
                                autocomplete="current-password"
                                autofocus
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-mono">
                                {{ showPassword ? 'HIDE' : 'SHOW' }}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="loading || !password.trim()"
                        class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-98">
                        <span v-if="!loading">🔓 {{ isKhmer ? 'ចូលមើលគម្រោង' : 'Unlock Vacation Planner' }}</span>
                        <span v-else>Verifying...</span>
                    </button>
                </form>

                <!-- Back to Home -->
                <div class="mt-6 text-center">
                    <router-link 
                        to="/"
                        class="text-xs text-slate-500 hover:text-emerald-600 transition-colors font-mono">
                        ← {{ isKhmer ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Home' }}
                    </router-link>
                </div>
            </div>

            <!-- Security hint -->
            <p class="text-[11px] text-center text-slate-400 mt-4 font-mono">
                🔒 Private workspace for Lyhuor • Session secured
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';

const router = useRouter();
const { isKhmer } = useLanguage();

const HOLIDAY_PASSWORD = process.env.VUE_APP_GARAGE_PASSWORD || process.env.VUE_APP_CRYPTO_PASSWORD || 'lyhuor';

const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');
const loading = ref(false);

const checkAuth = () => {
    if (sessionStorage.getItem('holiday_auth') === 'true') {
        router.replace('/holiday-planner');
    }
};

const handleSubmit = async () => {
    errorMessage.value = '';
    if (!password.value.trim()) {
        errorMessage.value = isKhmer.value ? 'សូមបញ្ចូលលេខសម្ងាត់' : 'Please enter passcode';
        return;
    }

    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
        if (password.value.trim() === HOLIDAY_PASSWORD) {
            sessionStorage.setItem('holiday_auth', 'true');
            router.push('/holiday-planner');
        } else {
            errorMessage.value = isKhmer.value ? 'លេខសម្ងាត់មិនត្រឹមត្រូវទេ សូមសាកល្បងម្តងទៀត' : 'Incorrect passcode. Please try again.';
            password.value = '';
        }
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    checkAuth();
});
</script>
