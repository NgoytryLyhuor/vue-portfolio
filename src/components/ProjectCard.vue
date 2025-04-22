<!-- components/ProjectCard.vue -->
<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
        <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
        <div class="p-6">
            <h3 class="text-xl font-bold mb-2 dark:text-white">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="(tech, index) in project.technologies" :key="index"
                    class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-full">
                    {{ tech }}
                </span>
            </div>
            <div class="flex justify-between">
                <a :href="project.demo" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Live
                    Demo</a>
                <a :href="project.github" target="_blank"
                    class="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCardComponent',
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>