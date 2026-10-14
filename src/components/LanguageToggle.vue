<template>
    <div class="inline-flex items-center p-1 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm shrink-0">
        <button
            type="button"
            @click="setLanguage('km')"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
            :class="[
                currentLang === 'km'
                    ? 'bg-gradient-to-r from-red-600 to-blue-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
            title="ប្តូរទៅភាសាខ្មែរ (Default)"
        >
            <span class="text-xs">🇰🇭</span>
            <span>ខ្មែរ</span>
        </button>
        <button
            type="button"
            @click="setLanguage('en')"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
            :class="[
                currentLang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
            title="Switch to English"
        >
            <span class="text-xs">🇬🇧</span>
            <span>EN</span>
        </button>
    </div>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage';

const { currentLang, setLanguage } = useLanguage();
</script>
