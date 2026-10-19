<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto space-y-10">

            <!-- Header Section (Modern Architectural HUD with subtle rounded corners) -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
                <!-- Meta HUD Bar -->
                <div class="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                <div class="py-6 space-y-3 max-w-3xl">
                    <div class="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-md">
                        {{ isKhmer ? 'ស្នាដៃអភិវឌ្ឍន៍ផ្ទាល់ខ្លួន' : 'ENGINEERING & PRODUCTION BUILDS' }}
                    </div>
                    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        {{ isKhmer ? 'គម្រោង និងស្នាដៃរបស់ខ្ញុំ' : 'FEATURED PROJECTS' }}
                    </h1>
                    <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {{ isKhmer 
                            ? 'ការប្រមូលផ្តុំនៃគម្រោងគេហទំព័រ កម្មវិធីជំនួយការ និងឧបករណ៍ជាក់ស្តែងដែលខ្ញុំបានអភិវឌ្ឍដោយប្រើ Vue.js, Java, Spring Boot, PHP Laravel និងបច្ចេកវិទ្យាទំនើបៗ។' 
                            : 'A curated catalog of production web applications, utility services, and open-source software built across modern stacks.' }}
                    </p>
                </div>

                <!-- Search Bar & Filters -->
                <div class="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
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
                    <div class="flex flex-wrap items-center gap-2 pt-2">
                        <span class="text-[11px] font-mono text-slate-400 uppercase mr-1">
                            {{ isKhmer ? 'ប្រភេទ៖' : 'CATEGORY:' }}
                        </span>
                        <button 
                            @click="activeCategory = 'all'" 
                            :class="[
                                'px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-lg transition-all',
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
                                'px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-lg transition-all',
                                activeCategory.toLowerCase() === category.toLowerCase()
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white font-bold'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                            ]">
                            {{ category }}
                        </button>
                    </div>
                </div>
            </section>

            <!-- Loading State -->
            <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoadingSkeleton v-for="i in 6" :key="i" type="project" />
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-8 text-center space-y-4 rounded-2xl">
                <div class="w-12 h-12 mx-auto text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-base font-bold text-red-600 dark:text-red-400">
                    {{ isKhmer ? 'មានបញ្ហាក្នុងការទាញទិន្នន័យគម្រោង' : 'Error loading projects' }}
                </h3>
                <p class="text-xs font-mono text-slate-600 dark:text-slate-400">{{ error }}</p>
                <button 
                    @click="fetchProjects"
                    class="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono uppercase font-bold border border-slate-900 dark:border-white rounded-lg hover:bg-blue-600 transition-colors">
                    {{ isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry Connection' }}
                </button>
            </div>

            <!-- Projects Grid -->
            <div v-else>
                <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <article 
                        v-for="project in filteredProjects" 
                        :key="project.id"
                        class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-200 group">

                        <!-- Image Preview Box -->
                        <div class="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                            <span v-if="project.status" class="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-600 text-white uppercase tracking-wider rounded-md z-10">
                                {{ formatCategory(project.status) }}
                            </span>
                            <img 
                                :src="getProjectImage(project.image)" 
                                :alt="project.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                @error="handleImageError"
                                loading="lazy"
                            >
                            <div class="absolute bottom-3 left-3 z-10">
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/90 text-white border border-slate-700 rounded-md">
                                    {{ project.category }}
                                </span>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                                <h2 class="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {{ project.title }}
                                </h2>
                                <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed" v-html="project.description"></p>
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
                                <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <a 
                                        v-if="project.demo_url"
                                        :href="project.demo_url" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        class="flex-1 text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider border border-blue-600 rounded-lg transition-all">
                                        {{ isKhmer ? 'ចូលមើលគេហទំព័រ →' : 'Visit Live Site →' }}
                                    </a>
                                    <a 
                                        v-if="shouldShowGithub(project)" 
                                        :href="project.github" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold uppercase border border-slate-300 dark:border-slate-700 rounded-lg transition-all">
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
// Projects Page - Architectural Sharp Tech Minimalist
import api from '@/service/api'
import { ref, computed, onMounted } from 'vue'
import logger from '@/utils/logger'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useStructuredData } from '@/composables/useStructuredData'
import { useLanguage } from '@/composables/useLanguage'

const { isKhmer } = useLanguage()

// Reactive state
const activeCategory = ref('all')
const searchQuery = ref('')
const projects = ref([])
const categories = ref([])
const isLoading = ref(true)
const error = ref(null)
const fallbackImage = ref(require('@/assets/no-image.jpg'))

// Methods
const getProjectImage = (imageUrl) => {
    if (!imageUrl) return fallbackImage.value
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
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

const fetchProjects = async () => {
    isLoading.value = true
    error.value = null
    try {
        const response = await api.get('/project')
        projects.value = response.data.data
        extractCategories()
    } catch (err) {
        logger.error('Error loading projects:', err)
        error.value = err.response?.data?.message || 'Failed to load projects. Please try again later.'
    } finally {
        isLoading.value = false
    }
}

const formatCategory = (category) => {
    if (!category) return ''
    
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

const extractCategories = () => {
    const allCategories = projects.value
        .map(project => project.category ? project.category.trim() : '')
        .filter(Boolean)
        .map(category => category.toLowerCase())

    const uniqueCategories = [...new Set(allCategories)]
    
    categories.value = uniqueCategories.map(category =>
        category.charAt(0).toUpperCase() + category.slice(1)
    )

    categories.value.sort()
    categories.value = ['All', ...categories.value.filter(c => c !== 'All')]
}

// Computed properties
const filteredProjects = computed(() => {
    if (!Array.isArray(projects.value)) return []

    let filtered = projects.value

    // Filter by category
    if (activeCategory.value !== 'all') {
        filtered = filtered.filter(project => {
            return project.category &&
                project.category.toLowerCase() === activeCategory.value.toLowerCase()
        })
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(project => {
            const title = (project.title || '').toLowerCase()
            const description = (project.description || '').toLowerCase()
            const technologies = Array.isArray(project.technologies) 
                ? project.technologies.join(' ').toLowerCase()
                : (project.technologies || '').toLowerCase()
            
            return title.includes(query) || 
                   description.includes(query) || 
                   technologies.includes(query)
        })
    }

    return filtered
})

// Lifecycle hook
onMounted(async () => {
    await fetchProjects()
    
    // Add structured data for projects
    if (projects.value && projects.value.length > 0) {
        const { addStructuredData, getProjectData, getBreadcrumbData } = useStructuredData()
        const structuredData = getProjectData(projects.value)
        if (structuredData) {
            addStructuredData(structuredData)
        }
        
        // Add breadcrumb structured data
        const breadcrumbData = getBreadcrumbData([
            { name: 'Home', url: 'https://ngoytrylyhuor.vercel.app/' },
            { name: 'Projects', url: 'https://ngoytrylyhuor.vercel.app/projects' }
        ])
        addStructuredData(breadcrumbData)
    }
})
</script>