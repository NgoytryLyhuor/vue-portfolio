<!-- AppFooter Component - Clean Modern Minimalist Footer -->
<template>
    <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 mt-auto transition-colors duration-300">
        <!-- Main Footer Directory Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Col 1: Identity & Bio -->
                <div class="space-y-4">
                    <div class="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                        {{ isKhmer ? 'គេហទំព័រផ្ទាល់ខ្លួន' : 'DEVELOPER PORTFOLIO' }}
                    </div>
                    <h3 class="text-base font-black uppercase text-slate-900 dark:text-white tracking-wider">
                        NGOYTRY LYHUOR
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                        {{ isKhmer 
                            ? 'អ្នកអភិវឌ្ឍន៍គេហទំព័រអាជីព ជំនាញលើការអភិវឌ្ឍ Frontend & Backend ជាមួយ Vue.js, JavaScript, PHP Laravel, Java និង Spring Boot។' 
                            : 'Full-stack software engineer specialized in building robust web applications, high-performance APIs, and interactive tools.' 
                        }}
                    </p>
                    <!-- Social Link Buttons (Subtle Rounded) -->
                    <div class="flex items-center gap-2 pt-1">
                        <a 
                            href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="p-2.5 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-500 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                            aria-label="LinkedIn Profile">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a 
                            href="https://github.com/NgoytryLyhuor" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="p-2.5 border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                            aria-label="GitHub Profile">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Col 2: Navigation Links -->
                <div>
                    <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                        {{ isKhmer ? 'ទំព័រចម្បង' : 'NAVIGATION' }}
                    </div>
                    <ul class="space-y-2 text-xs font-mono">
                        <li>
                            <router-link to="/" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">/</span> {{ isKhmer ? 'ទំព័រដើម (Home)' : 'Home' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/projects" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">/</span> {{ isKhmer ? 'គម្រោងការងារ (Projects)' : 'Projects' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">/</span> {{ isKhmer ? 'ប្រវត្តិរូប & បទពិសោធន៍ (About)' : 'About & Experience' }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Col 3: Interactive Tools -->
                <div>
                    <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                        {{ isKhmer ? 'ឧបករណ៍ & មុខងារ' : 'UTILITIES & TOOLS' }}
                    </div>
                    <ul class="space-y-2 text-xs font-mono">
                        <li>
                            <router-link to="/vehicle-tax" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">🚗</span> {{ isKhmer ? 'ពន្ធផ្លូវ & ឆៀកឡាន' : 'Vehicle Tax Calculator' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/fuel-prices" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">⛽</span> {{ isKhmer ? 'តាមដានតម្លៃប្រេងសាំង' : 'Fuel Price Tracker' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/traffic-fines" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">⚖️</span> {{ isKhmer ? 'ផាកពិន័យចរាចរណ៍' : 'Traffic Fines Lookup' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/public-services" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">🛂</span> {{ isKhmer ? 'សេវាសាធារណៈ & Passport' : 'Public Services & Passport' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/khmer-calendar" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">📅</span> {{ isKhmer ? 'ប្រតិទិនចន្ទគតិខ្មែរ' : 'Khmer Lunar Calendar' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/weather-app" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">⛅</span> {{ isKhmer ? 'ព្យាករណ៍ធាតុអាកាស' : 'Live Weather' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/air-quality" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">🍃</span> {{ isKhmer ? 'គុណភាពខ្យល់ AQI' : 'Air Quality Index' }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/currency-converter" @click="scrollToTop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                <span class="text-slate-400">💱</span> {{ isKhmer ? 'កម្មវិធីប្តូរប្រាក់ NBC' : 'Currency Converter' }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar (1px hairline) -->
            <div class="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
                <div>
                    © {{ currentYear }} NGOYTRY LYHUOR. {{ isKhmer ? 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' : 'ALL RIGHTS RESERVED.' }}
                </div>
                <div class="flex items-center gap-2">
                    <span>{{ isKhmer ? 'បង្កើតឡើងដោយ' : 'Built with' }} Vue.js & Tailwind CSS</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Modern Minimalist Footer
import { computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

const { isKhmer } = useLanguage();
const currentYear = computed(() => new Date().getFullYear());

const scrollToTop = () => {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
};
</script>
