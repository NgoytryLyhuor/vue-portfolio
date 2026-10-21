<!-- AppFooter Component - High-Performance Responsive Architecture Footer -->
<template>
    <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 mt-auto transition-colors duration-300">
        <!-- Main Footer Directory Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <!-- Col 1: Identity & Bio (lg:col-span-4) -->
                <div class="lg:col-span-4 space-y-4">
                    <div class="flex items-center gap-2">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>{{ isKhmer ? 'គេហទំព័រផ្ទាល់ខ្លួន' : 'DEVELOPER PORTFOLIO' }}</span>
                        </div>
                        <span class="text-[11px] font-mono text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">
                            {{ currentVersion }}
                        </span>
                    </div>

                    <div>
                        <h3 class="text-base font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            NGOYTRY LYHUOR
                        </h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                            Full-Stack Web Developer • Phnom Penh, Cambodia
                        </p>
                    </div>

                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                        {{ isKhmer 
                            ? 'អ្នកអភិវឌ្ឍន៍គេហទំព័រអាជីព ជំនាញលើការអភិវឌ្ឍ Frontend & Backend ជាមួយ Vue.js, JavaScript, PHP Laravel, Java និង Spring Boot ព្រមទាំងឧបករណ៍ឌីជីថលសម្រាប់ពលរដ្ឋកម្ពុជា។' 
                            : 'Full-stack software engineer specialized in building robust web applications, high-performance APIs, and interactive citizen utilities.' 
                        }}
                    </p>

                    <!-- Social Link Buttons -->
                    <div class="flex items-center gap-2 pt-1">
                        <a 
                            href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-500 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition-colors shadow-sm bg-white dark:bg-slate-900"
                            aria-label="LinkedIn Profile">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <span>LinkedIn</span>
                        </a>
                        <a 
                            href="https://github.com/NgoytryLyhuor" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition-colors shadow-sm bg-white dark:bg-slate-900"
                            aria-label="GitHub Profile">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

                <!-- Col 2: Navigation Links (lg:col-span-3) -->
                <div class="lg:col-span-3 space-y-3">
                    <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <span>{{ isKhmer ? 'ទំព័រចម្បង' : 'NAVIGATION' }}</span>
                        <span class="text-[10px] text-slate-400">03 PAGES</span>
                    </div>
                    <ul class="space-y-1.5 text-xs font-mono">
                        <li>
                            <router-link to="/" @click="scrollToTop" class="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                                <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span class="text-slate-400 dark:text-slate-600">/</span>
                                    <span>{{ isKhmer ? 'ទំព័រដើម (Home)' : 'Home' }}</span>
                                </span>
                                <span class="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors text-[10px]">→</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/projects" @click="scrollToTop" class="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                                <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span class="text-slate-400 dark:text-slate-600">/</span>
                                    <span>{{ isKhmer ? 'គម្រោងការងារ (Projects)' : 'Projects' }}</span>
                                </span>
                                <span class="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors text-[10px]">→</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about" @click="scrollToTop" class="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                                <span class="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <span class="text-slate-400 dark:text-slate-600">/</span>
                                    <span>{{ isKhmer ? 'ប្រវត្តិរូប & បទពិសោធន៍ (About)' : 'About & Experience' }}</span>
                                </span>
                                <span class="text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors text-[10px]">→</span>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Col 3: Interactive Utilities & Tools (lg:col-span-5) -->
                <div class="lg:col-span-5 space-y-3">
                    <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <span>{{ isKhmer ? 'ឧបករណ៍ & មុខងារ' : 'UTILITIES & TOOLS' }}</span>
                        <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold">15 TOOLS</span>
                    </div>

                    <!-- 2-Column Responsive Tactile Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <router-link
                            to="/vehicle-tax"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🚗</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'ពន្ធផ្លូវ & ឆៀកឡាន' : 'Vehicle Tax' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'គណនាពន្ធ និងតម្លៃឆៀក' : 'Tax & inspection' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/fuel-prices"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⛽</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'តម្លៃប្រេងសាំង' : 'Fuel Prices' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'តម្លៃផ្លូវការក្រសួងពាណិជ្ជកម្ម' : 'Ministry of Commerce' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/traffic-fines"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⚖️</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'ផាកពិន័យចរាចរណ៍' : 'Traffic Fines' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ស្វែងរកអនុក្រឹត្យលេខ ៣៩' : 'Sub-Decree 39 lookup' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/public-services"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🛂</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'សេវាសាធារណៈ & Passport' : 'Public Services' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'តម្លៃលិខិតឆ្លងដែន & ប័ណ្ណបើកបរ' : 'Passport & Driving license' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/khmer-calendar"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">📅</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'ប្រតិទិនខ្មែរ' : 'Khmer Calendar' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ចន្ទគតិ & ថ្ងៃសីល' : 'Lunar date & Buddhist days' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/weather-app"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⛅</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'ធាតុអាកាស' : 'Weather' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ព្យាករណ៍ទូទាំង ២៥ ខេត្តក្រុង' : '25 provinces live data' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/air-quality"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🍃</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'គុណភាពខ្យល់' : 'Air Quality' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'សន្ទស្សន៍ AQI & PM2.5' : 'AQI & PM2.5 monitoring' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/currency-converter"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">💱</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'ប្តូរប្រាក់ NBC' : 'Currency' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'អត្រាផ្លូវការធនាគារជាតិ' : 'National Bank rates' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/utility-calculator"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⚡</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                    {{ isKhmer ? 'ថ្លៃទឹក-ភ្លើង (EDC)' : 'Electricity & Water' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'គណនាអគ្គិសនី និងទឹកស្អាត' : 'EDC & PPWSA rates' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/khqr-bill-splitter"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🇰🇭</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                                    {{ isKhmer ? 'បាគង KHQR' : 'Bakong KHQR' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'បង្កើត KHQR & ចែកលុយ' : 'KHQR generator & split' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/salary-tax-calculator"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">💼</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                    {{ isKhmer ? 'ពន្ធលើប្រាក់ខែ' : 'Salary Tax & NSSF' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ពន្ធ GDT និង ប.ស.ស' : 'Official GDT brackets' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/bank-loan-calculator"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🏦</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {{ isKhmer ? 'កម្ចីទិញផ្ទះ & ឡាន' : 'Loan & Mortgage' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ការប្រាក់ថយ vs ស្មើ' : 'Amortization schedule' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/postal-codes"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">📮</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                    {{ isKhmer ? 'កូដប្រៃសណីយ៍ ២៥ ខេត្ត' : 'Postal & Hotlines' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'លេខកូដទិញទំនិញ & ១១៧' : 'Zip codes & Emergency' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/khmer-typing-test"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">⌨️</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                    {{ isKhmer ? 'តេស្តវាយអក្សរខ្មែរ' : 'Khmer Typing Test' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'វាស់ស្ទង់ល្បឿន WPM' : 'NiDA typing speed trainer' }}
                                </div>
                            </div>
                        </router-link>

                        <router-link
                            to="/cambodia-hospitals"
                            @click="scrollToTop"
                            class="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all flex items-center gap-2.5"
                        >
                            <span class="text-base shrink-0 p-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">🏥</span>
                            <div class="min-w-0 flex-1">
                                <div class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate">
                                    {{ isKhmer ? 'មន្ទីរពេទ្យ & សង្គ្រោះបន្ទាន់' : 'Hospitals & 119' }}
                                </div>
                                <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                    {{ isKhmer ? 'ពេទ្យ ២៥ ខេត្ត & ឡានពេទ្យ' : '25 provinces 24/7 ER' }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Bottom Responsive Action Bar -->
            <div class="mt-10 sm:mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
                <!-- Left: Copyright and Stack -->
                <div class="flex flex-col sm:flex-row items-center gap-2 text-slate-500 text-center sm:text-left">
                    <span>© {{ currentYear }} NGOYTRY LYHUOR. {{ isKhmer ? 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' : 'ALL RIGHTS RESERVED.' }}</span>
                    <span class="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                    <span class="text-[11px] text-slate-400 dark:text-slate-500">Vue.js & Tailwind CSS</span>
                </div>

                <!-- Right: Interactive Action Toolbar -->
                <div class="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                    <!-- 1. App Update Button -->
                    <button
                        v-if="updateAvailable"
                        @click="applyUpdate"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-sm border border-blue-400/40 transition-all active:scale-95 cursor-pointer animate-pulse"
                        :title="isKhmer ? 'មានកំណែថ្មី! ចុចដើម្បី Update ឥឡូវនេះ' : 'New version available! Click to update now'">
                        <span>🚀</span>
                        <span>{{ isKhmer ? 'Update ឥឡូវនេះ' : 'Update Now' }}</span>
                    </button>
                    <button
                        v-else
                        @click="checkForUpdate"
                        :disabled="isCheckingUpdate"
                        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer disabled:opacity-60 shadow-sm"
                        :title="isKhmer ? 'ពិនិត្យកំណែអាប់ដេតថ្មីនៃ App' : 'Check for new app updates'">
                        <svg :class="{ 'animate-spin': isCheckingUpdate }" class="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>
                            {{ isCheckingUpdate
                                ? (isKhmer ? 'កំពុងពិនិត្យ...' : 'Checking...')
                                : (updateStatus === 'up_to_date'
                                    ? (isKhmer ? '✓ កំណែចុងក្រោយ' : '✓ Up to Date')
                                    : (isKhmer ? 'ពិនិត្យ Update' : 'Check Updates'))
                            }}
                        </span>
                    </button>

                    <!-- 2. Install App Button -->
                    <button 
                        v-if="!isInstalled"
                        @click="installApp" 
                        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm"
                        :title="isKhmer ? 'ដំឡើងជា App លើទូរស័ព្ទ / កុំព្យូទ័រ' : 'Install as Mobile / Desktop App'">
                        <span>📲</span>
                        <span>{{ isKhmer ? 'ដំឡើង App' : 'Install App' }}</span>
                    </button>
                    <span v-else class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                        <span>✓</span>
                        <span>{{ isKhmer ? 'បានដំឡើង' : 'Installed' }}</span>
                    </span>

                    <!-- 3. Clear Cache Button -->
                    <button 
                        @click="clearCacheAndRefresh" 
                        :disabled="isClearingCache"
                        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer disabled:opacity-60 shadow-sm"
                        :title="isKhmer ? 'ជម្រះទិន្នន័យចាស់ (Cache) និងទាញយកទិន្នន័យថ្មីចុងក្រោយ' : 'Purge browser cache and reload latest deployment'">
                        <span>🧹</span>
                        <span>
                            {{ isClearingCache 
                                ? (isKhmer ? 'កំពុងជម្រះ...' : 'Clearing...') 
                                : (isKhmer ? 'ជម្រះ Cache' : 'Clear Cache') }}
                        </span>
                    </button>

                    <!-- 4. Scroll to Top Button -->
                    <button
                        @click="scrollToTop"
                        class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-500 dark:hover:border-slate-400 bg-white dark:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer shadow-sm"
                        :title="isKhmer ? 'រំកិលទៅលើគេហទំព័រវិញ' : 'Scroll to top'">
                        <span>↑</span>
                        <span>{{ isKhmer ? 'ទៅលើ' : 'Top' }}</span>
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// Modern Minimalist Responsive Footer
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { usePwaInstall } from '@/composables/usePwaInstall';
import { useAppUpdate } from '@/composables/useAppUpdate';

const { isKhmer } = useLanguage();
const { isInstalled, installApp } = usePwaInstall();
const {
    updateAvailable,
    isCheckingUpdate,
    updateStatus,
    currentVersion,
    checkForUpdate,
    applyUpdate
} = useAppUpdate();

const currentYear = computed(() => new Date().getFullYear());
const isClearingCache = ref(false);

const clearCacheAndRefresh = async () => {
    if (isClearingCache.value) return;
    isClearingCache.value = true;
    try {
        // 1. Delete all CacheStorage caches
        if (typeof window !== 'undefined' && 'caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
        }

        // 2. Unregister all service workers
        if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map(reg => reg.unregister()));
        }

        // 3. Clear session storage & local build etags
        if (typeof window !== 'undefined') {
            if (window.sessionStorage) window.sessionStorage.clear();
            localStorage.removeItem('app_build_etag');
            localStorage.removeItem('app_build_last_modified');
        }

        // 4. Hard reload page with cache bypass
        setTimeout(() => {
            window.location.reload();
        }, 300);
    } catch (err) {
        console.warn('Cache clearing error:', err);
        window.location.reload();
    }
};

const scrollToTop = () => {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
};
</script>
