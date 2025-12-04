<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    My Projects
                </h1>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    A collection of my work across different technologies and domains
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div class="w-24 h-24 mx-auto mb-6 text-red-500 dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-xl font-medium text-red-600 dark:text-red-400 mb-2">Error loading projects</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
                <button @click="fetchProjects"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Retry
                </button>
            </div>

            <!-- Content -->
            <div v-else>
                <!-- Category Filters -->
                <div class="mb-16">
                    <div class="mb-8 flex flex-wrap justify-center gap-3">
                        <button @click="activeCategory = 'all'" :class="[
                            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform',
                            activeCategory.toLowerCase() === 'all'
                                ? 'bg-blue-600 text-white shadow-md scale-105'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105 shadow-sm',
                            { 'animate-pulse-click': activeCategory.toLowerCase() === 'all' }
                        ]">
                            All
                        </button>
                        <button v-for="category in categories.filter(c => c !== 'All')" :key="category"
                            @click="activeCategory = category" :class="[
                                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform',
                                activeCategory.toLowerCase() === category.toLowerCase()
                                    ? 'bg-blue-600 text-white shadow-md scale-105'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105 shadow-sm',
                                { 'animate-pulse-click': activeCategory.toLowerCase() === category.toLowerCase() }
                            ]">
                            {{ category }}
                        </button>
                    </div>
                </div>

                <!-- Projects Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article v-for="project in filteredProjects" :key="project.id" class="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">

                        <div class="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20">
                            </div>
                            <span v-if="project.status" class="absolute font-bold top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 z-10">
                                {{ formatCategory(project.status) }}
                            </span>
                            <img :src="getProjectImage(project.image)" :alt="project.title"
                                class="w-full h-full object-cover" @error="handleImageError">
                            <div class="absolute bottom-4 left-4">
                                <span
                                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm">
                                    {{ project.category }}
                                </span>
                            </div>
                        </div>

                        <div class="p-6 flex-1 flex flex-col">
                            <div class="flex-1">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                    {{ project.title }}
                                </h2>
                                <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm" v-html="project.description"></p>
                            </div>

                            <div class="flex flex-wrap gap-2 mb-5">
                                <span v-for="tech in project.technologies" :key="tech"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                    {{ tech }}
                                </span>
                            </div>

                            <div
                                class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
                                <a :href="project.demo_url" target="_blank" rel="noopener noreferrer"
                                    class="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm">
                                    Visit Site
                                </a>
                                <a v-if="shouldShowGithub(project)" :href="project.github" target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex-1 text-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-300 text-sm dark:bg-gray-700 dark:hover:bg-gray-600">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Empty State -->
                <div v-if="!isLoading && filteredProjects.length === 0" class="text-center py-12">
                    <div class="mx-auto max-w-md">
                        <div class="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">No projects found</h3>
                        <p class="text-gray-500 dark:text-gray-500">We couldn't find any projects matching this
                            category.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Projects Page - Portfolio Showcase Gallery
import api from '@/service/api'
import { ref, computed, onMounted } from 'vue'

// Reactive state
const activeCategory = ref('all')
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
        console.log(projects.value)
    } catch (err) {
        console.error('Error loading projects:', err)
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

    if (activeCategory.value === 'all') {
        return projects.value
    }

    return projects.value.filter(project => {
        return project.category &&
            project.category.toLowerCase() === activeCategory.value.toLowerCase()
    })
})

// Lifecycle hook
onMounted(async () => {
    await fetchProjects()
})
</script>