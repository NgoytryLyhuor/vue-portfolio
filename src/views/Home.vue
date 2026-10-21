<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-12">
            <!-- Hero HUD Section (Modern Tech with subtle rounded corners) -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-10 relative overflow-hidden shadow-sm">
                <!-- Top HUD Meta Bar -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ភ្នំពេញ កម្ពុជា' : 'PHNOM PENH, CAMBODIA' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span>{{ isKhmer ? 'បច្ចេកវិទ្យា៖ VUE 3 / JAVA / LARAVEL' : 'STACK: VUE 3 / JAVA / LARAVEL' }}</span>
                    </div>
                </div>

                <!-- Main Hero Headline -->
                <div class="py-4 sm:py-8 space-y-3 sm:space-y-4 max-w-4xl">
                    <div class="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                        {{ isKhmer ? 'អ្នកអភិវឌ្ឍន៍គេហទំព័រ & ប្រព័ន្ធកម្មវិធី FULL-STACK' : 'FULL-STACK WEB & SOFTWARE ENGINEER' }}
                    </div>
                    <h1 class="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                        NGOYTRY LYHUOR
                    </h1>
                    <p class="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                        {{ isKhmer 
                            ? 'សូមស្វាគមន៍មកកាន់គេហទំព័រផ្ទាល់ខ្លួន! ខ្ញុំជាអ្នកបង្កើតកម្មវិធីដែលផ្តោតលើភាពជាក់ស្តែង ទំនើប និងប្រសិទ្ធភាពខ្ពស់ ជាមួយបទពិសោធន៍លើ Vue.js 3, JavaScript, PHP, Laravel, Java និង Spring Boot។' 
                            : 'Welcome to my digital workspace. Building resilient web systems, interactive tools, and data-driven solutions with Vue.js 3, modern JavaScript, Java, Spring Boot, and Laravel.' }}
                    </p>

                    <!-- Call-to-action Action Buttons -->
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3">
                        <router-link to="/projects"
                            class="px-4 sm:px-5 py-2.5 text-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider border border-slate-900 dark:border-white hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-500 rounded-lg transition-all">
                            {{ isKhmer ? 'ពិនិត្យមើលគម្រោង →' : 'Explore Projects →' }}
                        </router-link>
                        <router-link to="/about"
                            class="px-4 sm:px-5 py-2.5 text-center bg-transparent text-slate-800 dark:text-slate-200 text-xs font-mono font-bold uppercase tracking-wider border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                            {{ isKhmer ? 'ប្រវត្តិរូប & បទពិសោធន៍' : 'About & Experience' }}
                        </router-link>
                        <router-link to="/vehicle-tax"
                            class="px-4 sm:px-5 py-2.5 text-center bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider border border-blue-300 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-all">
                            {{ isKhmer ? '🧮 ម៉ាស៊ីនគណនាពន្ធឡាន' : '🧮 Cambodia Vehicle Tax' }}
                        </router-link>
                    </div>
                </div>

                <!-- Flagship Tools Fast Access Grid -->
                <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                        {{ isKhmer ? 'ឧបករណ៍ និងមុខងារពិសេសៗប្រចាំគេហទំព័រ' : 'Featured Interactive Tools' }}
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        <router-link to="/vehicle-tax"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">🚗</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {{ isKhmer ? 'ពន្ធផ្លូវ & ឆៀកឡាន' : 'Vehicle Tax & Inspection' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'គណនាពន្ធ ៧៥+ ម៉ូដែល (Prius, EV, Lexus)' : '75+ Car Models database, Prius 011, EV discount' }}
                            </p>
                        </router-link>

                        <router-link to="/fuel-prices"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-orange-500 dark:hover:border-orange-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">⛽</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                                {{ isKhmer ? 'តាមដានតម្លៃប្រេងសាំង' : 'Official Fuel Prices' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'តម្លៃសាំងក្រសួងពាណិជ្ជកម្ម & គណនាថ្លៃធ្វើដំណើរ' : 'MoC retail fuel tariff & highway trip calculator' }}
                            </p>
                        </router-link>

                        <router-link to="/traffic-fines"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-rose-500 dark:hover:border-rose-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">⚖️</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                                {{ isKhmer ? 'ផាកពិន័យចរាចរណ៍ផ្លូវគោក' : 'Traffic Fines & Penalties' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'អនុក្រឹត្យ ៣៩ កម្រិតផាកពិន័យ & ដកពិន្ទុប័ណ្ណបើកបរ' : 'Sub-Decree 39 fines matrix & license demerit points' }}
                            </p>
                        </router-link>

                        <router-link to="/public-services"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-teal-500 dark:hover:border-teal-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">🪪</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                                {{ isKhmer ? 'សេវាសាធារណៈ & Passport' : 'Public Services & Passport' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'តម្លៃ Passport, ប្តូរប័ណ្ណបើកបរ Aeon & អត្តសញ្ញាណប័ណ្ណ' : 'Passport fees, Aeon license renewals & ID card guide' }}
                            </p>
                        </router-link>

                        <router-link to="/khmer-calendar"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">📅</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {{ isKhmer ? 'ប្រតិទិនចន្ទគតិខ្មែរ' : 'Khmer Lunar Calendar' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'ឆែកមើលថ្ងៃសីល បុណ្យជាតិ និងរាសីចក្រ' : 'Traditional Buddhist Holy Days & Moon Phases' }}
                            </p>
                        </router-link>

                        <router-link to="/weather-app"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-sky-500 dark:hover:border-sky-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">⛅</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                                {{ isKhmer ? 'ធាតុអាកាស & គុណភាពខ្យល់' : 'Weather & Air Quality' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'ព្យាករណ៍អាកាសធាតុផ្ទាល់ និងសន្ទស្សន៍ PM2.5' : 'Live weather conditions, AQI index & forecast' }}
                            </p>
                        </router-link>

                        <router-link to="/currency-converter"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-amber-500 dark:hover:border-amber-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">💱</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                {{ isKhmer ? 'កម្មវិធីប្តូរប្រាក់រហ័ស' : 'Currency Converter' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'អត្រាប្តូរប្រាក់ផ្លូវការធនាគារជាតិ NBC' : 'Live NBC bank exchange rates KHR/USD/THB' }}
                            </p>
                        </router-link>

                        <router-link to="/utility-calculator"
                            class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl hover:border-amber-500 dark:hover:border-amber-500 transition-all group block">
                            <div class="text-xl mb-1 group-hover:scale-105 transition-transform">⚡</div>
                            <div class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                {{ isKhmer ? 'ថ្លៃទឹក-ភ្លើង (EDC & PPWSA)' : 'Electricity & Water (EDC)' }}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ isKhmer ? 'គណនាថ្លៃភ្លើង EDC ទឹកស្អាត & ឆែកថ្លៃបន្ទប់ជួល' : 'Official tiered EDC & PPWSA bill and rental checker' }}
                            </p>
                        </router-link>
                    </div>
                </div>
            </section>

            <!-- Technical Articles & Engineering Journal Section -->
            <section class="space-y-6">
                <!-- Section Header -->
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <div class="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            {{ isKhmer ? 'អត្ថបទបច្ចេកវិទ្យា & ការស្រាវជ្រាវ' : 'TECHNICAL ARTICLES & RESEARCH' }}
                        </div>
                        <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                            {{ isKhmer ? 'កម្រងអត្ថបទបច្ចេកវិទ្យាពី Dev.to' : 'Engineering Journal Feed' }}
                        </h2>
                    </div>

                    <!-- Search Input (Modern Subtle Rounded) -->
                    <div class="relative w-full sm:w-80">
                        <input v-model="searchQuery" type="text" :placeholder="isKhmer ? 'ស្វែងរកអត្ថបទ...' : 'Search articles...'"
                            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors shadow-sm" />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute right-3 top-2.5 text-slate-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Tag Filter Section (Subtle Rounded Badges) -->
                <div class="flex flex-wrap items-center gap-1.5 pb-2">
                    <button @click="resetFilters" 
                        class="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all border"
                        :class="selectedTags.length === 0
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'">
                        {{ isKhmer ? 'ទាំងអស់' : 'All' }}
                    </button>

                    <button v-for="tag in popularTags" :key="tag" @click="toggleTag(tag)"
                        class="px-3 py-1 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all border"
                        :class="selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400'">
                        #{{ tag }}
                    </button>
                </div>

                <!-- Loading state -->
                <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <LoadingSkeleton v-for="i in 6" :key="i" type="article" />
                </div>

                <!-- Error state -->
                <div v-if="error" class="text-center py-12 border border-dashed border-red-300 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 p-8 rounded-2xl">
                    <div class="text-red-500 font-bold mb-2">{{ isKhmer ? '⚠️ មិនអាចទាញយកទិន្នន័យបានទេ' : '⚠️ Error loading articles' }}</div>
                    <p class="text-xs text-slate-600 dark:text-slate-400">{{ error }}</p>
                    <button @click="fetchArticles"
                        class="mt-4 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase rounded-lg border border-slate-900 dark:border-white hover:bg-blue-600 transition-colors">
                        {{ isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry' }}
                    </button>
                </div>

                <!-- Articles grid (Clean Modern Cards with ~10px rounding) -->
                <div v-if="!loading && !error">
                    <div v-if="filteredArticles.length === 0" class="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 p-8 rounded-2xl">
                        <p class="text-sm text-slate-600 dark:text-slate-400">{{ isKhmer ? 'មិនមានអត្ថបទដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរករបស់អ្នកឡើយ' : 'No articles found matching your criteria' }}</p>
                        <button @click="resetFilters"
                            class="mt-4 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase rounded-lg border border-slate-900 dark:border-white hover:bg-blue-600 transition-colors">
                            {{ isKhmer ? 'កំណត់តម្រងឡើងវិញ' : 'Reset filters' }}
                        </button>
                    </div>

                    <div v-else class="space-y-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <article v-for="article in paginatedArticles" :key="article.id"
                                class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group p-5">
                                <div class="space-y-3">
                                    <!-- Author & Date Header -->
                                    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <div class="flex items-center gap-2">
                                            <img 
                                                v-if="article.user.profile_image" 
                                                :src="article.user.profile_image"
                                                :alt="`${article.user.name}'s profile`" 
                                                class="w-6 h-6 rounded-md border border-slate-300 dark:border-slate-700 object-cover"
                                                loading="lazy"
                                            >
                                            <span class="font-medium text-[11px] truncate max-w-[120px]">{{ article.user.name }}</span>
                                        </div>
                                        <span class="font-mono text-[10px]">{{ formatDate(article.published_at) }}</span>
                                    </div>

                                    <!-- Title -->
                                    <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                                        <a :href="article.url" target="_blank"
                                            class="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                            {{ article.title }}
                                        </a>
                                    </h3>

                                    <!-- Tags List -->
                                    <div class="flex flex-wrap gap-1">
                                        <span v-for="tag in article.tag_list.slice(0, 3)" :key="tag" @click="toggleTag(tag)"
                                            class="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700">
                                            #{{ tag }}
                                        </span>
                                    </div>

                                    <!-- Description -->
                                    <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                        {{ article.description || 'No description available' }}
                                    </p>
                                </div>

                                <!-- Card Footer -->
                                <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                                    <span class="flex items-center text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-rose-500" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        </svg>
                                        {{ article.positive_reactions_count }}
                                    </span>
                                    <a :href="article.url" target="_blank"
                                        class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        <span>{{ isKhmer ? 'អានបន្ថែម' : 'Read' }}</span>
                                        <span>→</span>
                                    </a>
                                </div>
                            </article>
                        </div>

                        <!-- Pagination Controls (Subtle Rounded Buttons) -->
                        <div v-if="totalPages > 1" class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center items-center gap-2">
                            <button 
                                @click="currentPage = Math.max(1, currentPage - 1)"
                                :disabled="currentPage === 1"
                                class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Previous page"
                            >
                                {{ isKhmer ? '← ថយក្រោយ' : '← Previous' }}
                            </button>
                            <span class="px-4 py-2 text-xs font-mono text-slate-600 dark:text-slate-400 border border-transparent">
                                {{ isKhmer ? ('ទំព័រ ' + currentPage + ' / ' + totalPages) : ('Page ' + currentPage + ' / ' + totalPages) }}
                            </span>
                            <button 
                                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                                :disabled="currentPage === totalPages"
                                class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Next page"
                            >
                                {{ isKhmer ? 'បន្ទាប់ →' : 'Next →' }}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
// Home Page - Dev.to Blog Articles Feed
import logger from '@/utils/logger'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useLanguage } from '@/composables/useLanguage'

export default {
    components: {
        LoadingSkeleton
    },
    name: 'BlogView',
    setup() {
        const { isKhmer } = useLanguage();
        return { isKhmer };
    },
    data() {
        return {
            articles: [],
            loading: true,
            error: null,
            selectedTags: [],
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 12
        }
    },
    computed: {
        allTags() {
            // Extract all tags from articles and count occurrences
            const tagCounts = {};
            this.articles.forEach(article => {
                article.tag_list.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });
            return tagCounts;
        },
        popularTags() {
            // Get top 10 most popular tags
            return Object.entries(this.allTags)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([tag]) => tag);
        },
        filteredArticles() {
            let filtered = this.articles;

            // Filter by selected tags
            if (this.selectedTags.length > 0) {
                filtered = filtered.filter(article => this.selectedTags.some(tag => article.tag_list.includes(tag)));
            }

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    (article.description && article.description.toLowerCase().includes(query)) ||
                    article.tag_list.some(tag => tag.toLowerCase().includes(query)));
            }

            // Sort by date (newest first)
            return filtered.sort((a, b) => {
                return new Date(b.published_at) - new Date(a.published_at);
            });
        },
        paginatedArticles() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredArticles.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
        }
    },
    async mounted() {
        await this.fetchArticles();
    },
    methods: {
        async fetchArticles() {
            this.loading = true;
            this.error = null;

            try {
                // Fetch top articles from dev.to with data science tag
                const response = await fetch('https://dev.to/api/articles?tag=datascience&top=30');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const articles = await response.json();
                // Sort articles by date (newest first)
                this.articles = articles.sort((a, b) => {
                    return new Date(b.published_at) - new Date(a.published_at);
                });
            } catch (err) {
                logger.error('Error fetching articles:', err);
                this.error = err.message || 'Failed to load articles';
            } finally {
                this.loading = false;
            }
        },
        toggleTag(tag) {
            if (this.selectedTags.includes(tag)) {
                this.selectedTags = this.selectedTags.filter(t => t !== tag);
            } else {
                this.selectedTags = [...this.selectedTags, tag];
            }
            this.currentPage = 1; // Reset to first page when filtering
        },
        resetFilters() {
            this.selectedTags = [];
            this.searchQuery = '';
            this.currentPage = 1;
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    }
}
</script>

<style scoped>
/* Line clamping for text */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Better focus styles */
a:focus,
button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Animation for loading spinner */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Smooth transitions for tag buttons */
.tag-transition {
    transition: all 0.2s ease-in-out;
}
</style>