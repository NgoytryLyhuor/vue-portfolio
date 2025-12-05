<template>
    <div class="animate-pulse">
        <!-- Card Skeleton -->
        <div v-if="type === 'card'" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div class="p-6">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>

        <!-- Article Skeleton -->
        <div v-else-if="type === 'article'" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 break-inside-avoid">
            <div class="p-6">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div class="flex gap-2 mb-3">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
                </div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>

        <!-- Project Skeleton -->
        <div v-else-if="type === 'project'" class="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div class="p-6 flex-1 flex flex-col">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                <div class="flex gap-2 mb-5">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                </div>
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>

        <!-- Text Skeleton -->
        <div v-else-if="type === 'text'" class="space-y-2">
            <div v-for="i in lines" :key="i" 
                :class="[
                    'h-4 bg-gray-200 dark:bg-gray-700 rounded',
                    i === lines ? 'w-3/4' : 'w-full'
                ]">
            </div>
        </div>

        <!-- Spinner (fallback) -->
        <div v-else class="flex items-center justify-center py-10">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'card',
        validator: (value) => ['card', 'article', 'project', 'text', 'spinner'].includes(value)
    },
    lines: {
        type: Number,
        default: 3
    }
})
</script>

<style scoped>
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

