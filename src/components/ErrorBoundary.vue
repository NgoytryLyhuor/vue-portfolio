<template>
    <div v-if="hasError" class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">{{ errorMessage }}</p>
            <div class="flex gap-3 justify-center">
                <button 
                    @click="retry" 
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
                <button 
                    @click="goHome" 
                    class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Go Home
                </button>
            </div>
            <details v-if="error" class="mt-6 text-left">
                <summary class="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">Error Details</summary>
                <pre class="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-40 text-gray-800 dark:text-gray-300">{{ errorDetails }}</pre>
            </details>
        </div>
    </div>
    <slot v-else />
</template>

<script setup>
import { ref, computed, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import logger from '@/utils/logger'

const router = useRouter()
const hasError = ref(false)
const error = ref(null)
const errorMessage = ref('An unexpected error occurred')

const errorDetails = computed(() => {
    if (!error.value) return ''
    return JSON.stringify({
        message: error.value.message,
        stack: error.value.stack,
        name: error.value.name
    }, null, 2)
})

onErrorCaptured((err, instance, info) => {
    hasError.value = true
    error.value = err
    errorMessage.value = err.message || 'An unexpected error occurred'
    logger.error('Error caught by boundary:', err, info)
    return false // Prevent error from propagating
})

const retry = () => {
    hasError.value = false
    error.value = null
    window.location.reload()
}

const goHome = () => {
    router.push('/')
    hasError.value = false
    error.value = null
}
</script>

