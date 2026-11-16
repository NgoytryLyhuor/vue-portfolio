<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 py-4 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto space-y-6 sm:space-y-10">

            <!-- Header Section (Modern Architectural HUD with subtle rounded corners) -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-10 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'បណ្តុំស្នាដៃ & គម្រោងកម្មវិធី' : 'PROJECT SHOWCASE & ARCHIVE' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {{ filteredProjects.length }} {{ isKhmer ? 'គម្រោងបង្ហាញ' : 'PROJECTS LISTED' }}
                        </span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">INDEX // 2026</span>
                    </div>
                </div>

                <!-- Main Title & Bio -->
                <div class="py-4 sm:py-6 space-y-3 max-w-3xl">
                    <div class="inline-block px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                        {{ isKhmer ? 'ស្នាដៃអភិវឌ្ឍន៍ផ្ទាល់ខ្លួន & អតិថិជន' : 'CLIENT & PRODUCTION BUILDS' }}
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        {{ isKhmer ? 'គម្រោង និងស្នាដៃរបស់ខ្ញុំ' : 'FEATURED PROJECTS' }}
                    </h1>
                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {{ isKhmer 
                            ? 'ការប្រមូលផ្តុំនៃគម្រោងគេហទំព័រអតិថិជន ប្រព័ន្ធគ្រប់គ្រង Laravel Sanctum និងឧបករណ៍ឌីជីថលជាក់ស្តែងដែលខ្ញុំបានអភិវឌ្ឍដោយប្រើ Vue.js, Java, Spring Boot និង PHP Laravel។' 
                            : 'A curated catalog of client production systems, Sanctum-protected admin studios, and civic web applications built with Vue.js, Laravel, Java, and Tailwind CSS.' }}
                    </p>
                </div>

                <!-- Search Bar & Filters -->
                <div class="pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <div class="relative max-w-xl">
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            :placeholder="isKhmer ? 'ស្វែងរកគម្រោងតាមឈ្មោះ បច្ចេកវិទ្យា ឬការពិពណ៌នា...' : 'Search projects by title, stack, or keywords...'"
                            class="w-full px-4 py-2.5 pl-10 pr-10 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-mono rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                            aria-label="Search projects"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button 
                            v-if="searchQuery" 
                            @click="searchQuery = ''"
                            class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                            aria-label="Clear search">
                            ✕
                        </button>
                    </div>

                    <!-- Category Filter Chips (Subtle Rounded) -->
                    <div class="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-1.5 sm:gap-2 pt-2 pb-1.5 -mx-1 px-1">
                        <span class="text-[11px] font-mono text-slate-400 uppercase mr-1 whitespace-nowrap shrink-0">
                            {{ isKhmer ? 'ប្រភេទ៖' : 'CATEGORY:' }}
                        </span>
                        <button 
                            @click="activeCategory = 'all'" 
                            :class="[
                                'px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider border rounded-lg transition-all whitespace-nowrap shrink-0',
                                activeCategory.toLowerCase() === 'all'
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white font-bold'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                            ]">
                            {{ isKhmer ? 'ទាំងអស់ (ALL)' : 'ALL' }}
                        </button>
                        <button 
                            v-for="category in categories.filter(c => c !== 'All')" 
                            :key="category"
                            @click="activeCategory = category" 
                            :class="[
                                'px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider border rounded-lg transition-all whitespace-nowrap shrink-0',
                                activeCategory.toLowerCase() === category.toLowerCase()
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white font-bold'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                            ]">
                            {{ category }}
                        </button>
                    </div>
                </div>
            </section>

            <!-- Projects Grid -->
            <div>
                <div
                    v-if="filteredProjects.length > 0"
                    :class="filteredProjects.length === 1 ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'"
                >
                    <article 
                        v-for="project in filteredProjects" 
                        :key="project.id"
                        :class="[
                            'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-200 group',
                            filteredProjects.length === 1 ? 'grid grid-cols-1 lg:grid-cols-12' : 'flex flex-col',
                            { 'ring-2 ring-emerald-500/20 dark:ring-emerald-400/20': project.featured }
                        ]">

                        <!-- Image / Visual Preview Box -->
                        <div
                            :class="[
                                'bg-slate-100 dark:bg-slate-800 relative overflow-hidden border-slate-200 dark:border-slate-800',
                                filteredProjects.length === 1 ? 'h-56 sm:h-72 lg:h-full lg:min-h-[340px] lg:col-span-7 border-b lg:border-b-0 lg:border-r' : 'h-48 border-b'
                            ]">
                            <!-- Top Status & Featured Badges -->
                            <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                                <span v-if="project.status" class="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-blue-600 text-white uppercase tracking-wider rounded-md shadow-sm">
                                    {{ project.status }}
                                </span>
                                <span v-if="project.featured" class="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500 text-white uppercase tracking-wider rounded-md shadow-sm">
                                    ★ {{ isKhmer ? 'គម្រោងពិសេស' : 'FEATURED' }}
                                </span>
                            </div>

                            <!-- Real Screenshot Image -->
                            <img 
                                v-if="project.image"
                                :src="getProjectImage(project.image)" 
                                :alt="isKhmer && project.titleKm ? project.titleKm : project.title"
                                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                                @error="handleImageError"
                                loading="lazy"
                            />

                            <!-- Clean Architectural Visual Header for Built-in Tools -->
                            <div 
                                v-else
                                class="w-full h-full bg-gradient-to-br flex flex-col items-center justify-center p-6 relative group-hover:scale-105 transition-transform duration-500"
                                :class="project.accent || 'from-slate-800 to-slate-950'"
                            >
                                <div class="absolute inset-0 opacity-15" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 18px 18px;"></div>
                                <div class="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-3xl shadow-lg mb-2">
                                    {{ project.icon || '⚡' }}
                                </div>
                                <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-white/80">
                                    {{ project.technologies[0] }} // {{ project.category }}
                                </span>
                            </div>

                            <!-- Bottom Category Pill -->
                            <div class="absolute bottom-3 left-3 z-10 pointer-events-none">
                                <span class="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/90 text-white border border-slate-700 rounded-md backdrop-blur-sm">
                                    {{ project.category }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div
                            :class="[
                                'p-5 flex-1 flex flex-col justify-between space-y-4',
                                filteredProjects.length === 1 ? 'lg:col-span-5 sm:p-7' : ''
                            ]">
                            <div>
                                <h2
                                    :class="[
                                        'font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors',
                                        filteredProjects.length === 1 ? 'text-lg sm:text-xl' : 'text-base line-clamp-2'
                                    ]">
                                    {{ isKhmer && project.titleKm ? project.titleKm : project.title }}
                                </h2>
                                <p
                                    :class="[
                                        'text-slate-600 dark:text-slate-400 leading-relaxed',
                                        filteredProjects.length === 1 ? 'text-xs sm:text-sm' : 'text-xs line-clamp-3'
                                    ]">
                                    {{ isKhmer && project.descriptionKm ? project.descriptionKm : project.description }}
                                </p>
                            </div>

                            <!-- Technologies Badges -->
                            <div class="space-y-4">
                                <div class="flex flex-wrap gap-1.5">
                                    <span 
                                        v-for="tech in project.technologies" 
                                        :key="tech"
                                        class="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md">
                                        {{ tech }}
                                    </span>
                                </div>

                                <!-- Action Buttons -->
                                <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                                    <a 
                                        v-if="project.demo_url"
                                        :href="project.demo_url" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        class="flex-1 text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider border border-blue-600 rounded-lg transition-all whitespace-nowrap">
                                        {{ isKhmer ? 'ចូលមើលគេហទំព័រ →' : 'Visit Live Site →' }}
                                    </a>
                                    <router-link
                                        v-else-if="project.route"
                                        :to="project.route"
                                        class="flex-1 text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider border border-blue-600 rounded-lg transition-all whitespace-nowrap">
                                        {{ isKhmer ? 'បើកប្រើប្រាស់ →' : 'Open App →' }}
                                    </router-link>
                                    <a 
                                        v-if="project.admin_url" 
                                        :href="project.admin_url" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="py-2 px-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold uppercase border border-emerald-200 dark:border-emerald-800 rounded-lg transition-all whitespace-nowrap"
                                        :title="isKhmer ? 'ប្រព័ន្ធគ្រប់គ្រង Sanctum Protected Studio' : 'Sanctum Protected Admin Studio'">
                                        🔒 Studio
                                    </a>
                                    <a 
                                        v-if="shouldShowGithub(project)" 
                                        :href="project.github" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold uppercase border border-slate-300 dark:border-slate-700 rounded-lg transition-all whitespace-nowrap">
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Empty State -->
                <div v-else class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-3 rounded-2xl">
                    <div class="text-3xl text-slate-400">🔍</div>
                    <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">
                        {{ isKhmer ? 'រកមិនឃើញគម្រោងដែលត្រូវគ្នា' : 'No matching projects found' }}
                    </h3>
                    <p class="text-xs font-mono text-slate-500 max-w-sm mx-auto">
                        {{ isKhmer ? 'សូមសាកល្បងផ្លាស់ប្តូរពាក្យស្វែងរក ឬជ្រើសរើសប្រភេទផ្សេងទៀត។' : 'Try adjusting your search query or reset the category filter.' }}
                    </p>
                    <button 
                        @click="searchQuery = ''; activeCategory = 'all'"
                        class="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono uppercase font-bold border border-slate-900 dark:border-white rounded-lg hover:bg-blue-600 transition-colors">
                        {{ isKhmer ? 'កំណត់ឡើងវិញ' : 'Reset Filters' }}
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
// Projects Page - Static Local Data (No API Dependency)
import { ref, computed, onMounted } from 'vue'
import { projectsData } from '@/data/projects'
import { useStructuredData } from '@/composables/useStructuredData'
import { useLanguage } from '@/composables/useLanguage'

const { isKhmer } = useLanguage()

// Reactive state loaded directly from static catalog
const activeCategory = ref('all')
const searchQuery = ref('')
const projects = ref(projectsData)
const fallbackImage = ref(require('@/assets/no-image.jpg'))

// Extract unique categories dynamically from static list
const categories = computed(() => {
    const allCategories = projects.value
        .map(project => project.category ? project.category.trim() : '')
        .filter(Boolean)

    const uniqueCategories = [...new Set(allCategories)]
    uniqueCategories.sort()
    return ['All', ...uniqueCategories.filter(c => c.toLowerCase() !== 'all')]
})

// Methods
const getProjectImage = (imageUrl) => {
    if (!imageUrl) return fallbackImage.value
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
        return imageUrl
    }
    try {
        return require(`@/assets/${imageUrl}`)
    } catch {
        return fallbackImage.value
    }
}

const handleImageError = (event) => {
    event.target.src = fallbackImage.value
}

const shouldShowGithub = (project) => {
    return project.showGithub !== false &&
        project.github &&
        project.github !== '#' &&
        !project.github.includes('undefined')
}

// Computed properties
const filteredProjects = computed(() => {
    if (!Array.isArray(projects.value)) return []

    let filtered = projects.value

    // Filter by category
    if (activeCategory.value.toLowerCase() !== 'all') {
        filtered = filtered.filter(project => {
            return project.category &&
                project.category.toLowerCase() === activeCategory.value.toLowerCase()
        })
    }

    // Filter by search query (supports English & Khmer)
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(project => {
            const title = (project.title || '').toLowerCase()
            const titleKm = (project.titleKm || '').toLowerCase()
            const description = (project.description || '').toLowerCase()
            const descriptionKm = (project.descriptionKm || '').toLowerCase()
            const technologies = Array.isArray(project.technologies) 
                ? project.technologies.join(' ').toLowerCase()
                : (project.technologies || '').toLowerCase()
            
            return title.includes(query) || 
                   titleKm.includes(query) ||
                   description.includes(query) || 
                   descriptionKm.includes(query) ||
                   technologies.includes(query)
        })
    }

    return filtered
})

// Lifecycle hook
onMounted(() => {
    if (projects.value && projects.value.length > 0) {
        const { addStructuredData, getProjectData, getBreadcrumbData } = useStructuredData()
        const structuredData = getProjectData(projects.value)
        if (structuredData) {
            addStructuredData(structuredData)
        }
        
        const breadcrumbData = getBreadcrumbData([
            { name: 'Home', url: 'https://ngoytrylyhuor.vercel.app/' },
            { name: 'Projects', url: 'https://ngoytrylyhuor.vercel.app/projects' }
        ])
        addStructuredData(breadcrumbData)
    }
})
</script>
