<template>
    <div
        class="relative inline-flex items-center p-0.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-inner select-none transition-all duration-300 shrink-0"
        role="group"
        aria-label="Language selector"
    >
        <!-- Smooth Sliding Background Pill -->
        <div
            class="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-lg shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] pointer-events-none"
            :class="[
                currentLang === 'km'
                    ? 'left-0.5 translate-x-0 bg-gradient-to-r from-red-600 via-indigo-600 to-blue-700 shadow-indigo-500/20'
                    : 'left-0.5 translate-x-[calc(100%)] bg-gradient-to-r from-blue-600 to-sky-600 shadow-blue-500/20'
            ]"
        ></div>

        <!-- Khmer Button -->
        <button
            type="button"
            @click="setLanguage('km')"
            class="relative z-10 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 outline-none focus:outline-none"
            :class="[
                currentLang === 'km'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
            title="ប្តូរទៅភាសាខ្មែរ (Default)"
            :aria-pressed="currentLang === 'km'"
        >
            <span class="text-xs transition-transform duration-300" :class="{ 'scale-110': currentLang === 'km' }">🇰🇭</span>
            <span class="tracking-wide">ខ្មែរ</span>
        </button>

        <!-- English Button -->
        <button
            type="button"
            @click="setLanguage('en')"
            class="relative z-10 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 outline-none focus:outline-none"
            :class="[
                currentLang === 'en'
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
            title="Switch to English"
            :aria-pressed="currentLang === 'en'"
        >
            <span class="text-xs transition-transform duration-300" :class="{ 'scale-110': currentLang === 'en' }">🇬🇧</span>
            <span class="tracking-wide">EN</span>
        </button>
    </div>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage';

const { currentLang, setLanguage } = useLanguage();
</script>

<style scoped>
button:active {
    transform: scale(0.95);
}
</style>
