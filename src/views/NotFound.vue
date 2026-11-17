<template>
    <div class="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <div class="max-w-md w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-sm space-y-5">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-[11px] font-mono font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                <span>ERR // 404</span>
            </div>
            <h1 class="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-mono">404</h1>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ isKhmer ? 'សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាននៅក្នុងប្រព័ន្ធឡើយ។' : 'Oops, it looks like the page you\'re looking for doesn\'t exist.' }}
            </p>
            <div class="pt-2">
                <router-link
                    to="/"
                    class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                    <span>← {{ isKhmer ? 'ត្រឡប់ទៅទំព័រដើម' : 'Go to Homepage' }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
// 404 Error - Page Not Found
import { useLanguage } from '@/composables/useLanguage'

const { isKhmer } = useLanguage()
</script>
