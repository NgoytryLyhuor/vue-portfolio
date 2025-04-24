<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    My Projects
                </h1>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    A collection of my work across different technologies and domains
                </p>
            </div>

            <!-- Category Filters - Using your button style -->
            <div class="mb-16">
                <div class="mb-8 flex flex-wrap justify-center gap-3">
                    <button @click="activeCategory = 'all'" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                        activeCategory === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
                    ]">
                        All
                    </button>
                    <button v-for="category in categories" :key="category" @click="activeCategory = category" :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                        activeCategory === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
                    ]">
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <article v-for="project in filteredProjects" :key="project.id"
                    class="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <div class="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
                        <img :src="isExternalImage(project.image) ? project.image : require(`@/assets/${project.image}`)"
                            :alt="project.title" class="w-full h-full object-cover" @error="handleImageError">
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
                            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                                {{ project.description }}
                            </p>
                        </div>

                        <div class="flex flex-wrap gap-2 mb-5">
                            <span v-for="tech in project.technologies" :key="tech"
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                {{ tech }}
                            </span>
                        </div>

                        <div
                            class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
                            <a :href="project.demo"
                                class="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm">
                                Live Demo
                            </a>
                            <a :href="project.github"
                                class="flex-1 text-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-300 text-sm dark:bg-gray-700 dark:hover:bg-gray-600">
                                GitHub
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Empty State -->
            <div v-if="filteredProjects.length === 0" class="text-center py-12">
                <div class="mx-auto max-w-md">
                    <div class="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">No projects found</h3>
                    <p class="text-gray-500 dark:text-gray-500">We couldn't find any projects matching this category.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectsView',
    data() {
        return {
            activeCategory: 'all',
            projects: [
                {
                    id: 1,
                    title: 'Consatech Cambodia - Company Website',
                    description: 'A professional business website for Consatech Cambodia showcasing their services, company information, and contact details. Built with responsive design for optimal viewing on all devices.',
                    image: 'consatech-cambodia.png',
                    technologies: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'JavaScript'],
                    category: 'Business Website',
                    demo: 'https://www.consatech-cambodia.com',
                    github: '#'
                },
                {
                    id: 2,
                    title: 'Task Manager App',
                    description: 'A productivity application with drag-and-drop functionality, task categorization, and real-time updates across devices.',
                    image: 'norkor-architecture.jpg',
                    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
                    category: 'Web App',
                    demo: '#',
                    github: '#'
                },
            ],
            fallbackImage: require('@/assets/no-image.jpg') // Add a fallback image
        }
    },
    methods: {
        isExternalImage(url) {
            return url.startsWith('http://') || url.startsWith('https://');
        },
        handleImageError(event) {
            event.target.src = this.fallbackImage;
        }
    },
    computed: {
        categories() {
            return [...new Set(this.projects.map(project => project.category))];
        },
        filteredProjects() {
            if (this.activeCategory === 'all') {
                return this.projects;
            }
            return this.projects.filter(project => project.category === this.activeCategory);
        }
    }
}
</script>