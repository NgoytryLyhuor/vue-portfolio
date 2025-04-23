<template>
    <div class="dark:bg-gray-900 min-h-screen py-12 px-4 transition-colors duration-300">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold mb-8 text-center dark:text-white">My Projects</h1>

            <!-- Category Filters -->
            <div class="mb-12">
                <div class="flex flex-wrap justify-center gap-3 mb-6">
                    <button 
                        @click="activeCategory = 'all'" 
                        :class="[
                            'px-4 py-2 rounded-full transition-all duration-200 font-medium',
                            activeCategory === 'all'
                                ? 'bg-green-500 text-white dark:bg-green-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        ]"
                    >
                        All
                    </button>
                    <button 
                        v-for="category in categories" :key="category" @click="activeCategory = category" 
                        :class="[ 'px-4 py-2 rounded-full transition-all duration-200 font-medium', activeCategory === category
                                ? 'bg-green-500 text-white dark:bg-green-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                    v-for="project in filteredProjects" 
                    :key="project.id" 
                    :project="project" 
                    class="transition-transform duration-300 hover:scale-[1.02]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue';

export default {
    name: 'ProjectsView',
    components: {
        ProjectCard
    },
    data() {
        return {
            activeCategory: 'all',
            projects: [
                {
                    id: 1,
                    title: 'E-commerce Website',
                    description: 'A fully responsive e-commerce platform built with Vue and Tailwind',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Tailwind CSS', 'Vuex'],
                    category: 'Web App',
                    demo: '#',
                    github: '#'
                },
                {
                    id: 2,
                    title: 'Task Manager App',
                    description: 'A productivity app with drag-and-drop functionality',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
                    category: 'Web App',
                    demo: '#',
                    github: '#'
                },
                {
                    id: 3,
                    title: 'Weather Dashboard',
                    description: 'Real-time weather information using a third-party API',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Axios', 'OpenWeather API'],
                    category: 'API Integration',
                    demo: '#',
                    github: '#'
                },
                {
                    id: 4,
                    title: 'Portfolio Website',
                    description: 'Personal portfolio website to showcase projects',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Tailwind CSS', 'Vite'],
                    category: 'Static Website',
                    demo: '#',
                    github: '#'
                },
                {
                    id: 5,
                    title: 'Movie Database App',
                    description: 'Browse and search for movies using TMDB API',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Vuex', 'TMDB API'],
                    category: 'API Integration',
                    demo: '#',
                    github: '#'
                },
                {
                    id: 6,
                    title: 'Recipe Finder',
                    description: 'Search and save your favorite recipes',
                    image: 'https://i.pinimg.com/736x/b8/2b/4a/b82b4a890c04a3c817fdfa3db051b4d1.jpg',
                    technologies: ['Vue.js', 'Vuex', 'Firebase'],
                    category: 'Web App',
                    demo: '#',
                    github: '#'
                }
            ]
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