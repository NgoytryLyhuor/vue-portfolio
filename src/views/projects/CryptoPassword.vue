<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
        <div class="max-w-md w-full">
            <!-- Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="flex justify-center mb-4">
                        <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Protected Access
                    </h1>
                    <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Enter password to access Crypto Price Tracker
                    </p>
                </div>

                <!-- Error Message -->
                <div 
                    v-if="errorMessage" 
                    class="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-red-600 dark:text-red-400 text-sm">{{ errorMessage }}</p>
                </div>

                <!-- Password Form -->
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div class="relative">
                            <input 
                                id="password"
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter password"
                                class="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                :class="{ 'border-red-500 dark:border-red-500': errorMessage }"
                                autocomplete="current-password"
                                autofocus
                                aria-label="Password input"
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                aria-label="Toggle password visibility"
                            >
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="loading || !password.trim()"
                        class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
                    >
                        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span v-if="!loading">Access Tracker</span>
                        <span v-else>Verifying...</span>
                    </button>
                </form>

                <!-- Back Link -->
                <div class="mt-6 text-center">
                    <router-link 
                        to="/"
                        class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </router-link>
                </div>
            </div>

            <!-- Security Notice -->
            <div class="mt-6 text-center space-y-2">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    🔒 This page is password protected for authorized access only
                </p>
                <p class="text-xs text-amber-600 dark:text-amber-400">
                    ⚠️ This is a client-side guard only — it does not provide real security. Use server-side auth for actual protection.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
// Password Protection Page for Crypto Tracker
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logger from '@/utils/logger'

const router = useRouter()

// Password constant - NOTE: This is a client-side guard only.
// Determined users can inspect the source. Use server-side auth for real protection.
const CRYPTO_PASSWORD = process.env.VUE_APP_CRYPTO_PASSWORD || 'lyhuor'

// Reactive state
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const loading = ref(false)

// Check if already authenticated
const checkAuth = () => {
    const isAuthenticated = sessionStorage.getItem('crypto_tracker_auth')
    if (isAuthenticated === 'true') {
        // Redirect to crypto tracker
        router.replace('/crypto-tracker')
    }
}

// Handle form submission
const handleSubmit = async () => {
    errorMessage.value = ''
    
    if (!password.value.trim()) {
        errorMessage.value = 'Please enter a password'
        return
    }

    loading.value = true

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
        if (password.value.trim() === CRYPTO_PASSWORD) {
            // Store authentication in sessionStorage (cleared when browser closes)
            sessionStorage.setItem('crypto_tracker_auth', 'true')
            
            // Redirect to crypto tracker
            router.push('/crypto-tracker')
        } else {
            errorMessage.value = 'Incorrect password. Please try again.'
            password.value = ''
        }
    } catch (err) {
        logger.error('Password verification error:', err)
        errorMessage.value = 'An error occurred. Please try again.'
    } finally {
        loading.value = false
    }
}

// Handle Enter key
const handleKeyPress = (event) => {
    if (event.key === 'Enter' && password.value.trim()) {
        handleSubmit()
    }
}

onMounted(() => {
    checkAuth()
    // Focus password input
    const passwordInput = document.getElementById('password')
    if (passwordInput) {
        passwordInput.focus()
    }
    
    // Add keyboard listener
    document.addEventListener('keydown', handleKeyPress)
    
    return () => {
        document.removeEventListener('keydown', handleKeyPress)
    }
})
</script>

<style scoped>
/* Smooth transitions */
input:focus {
    transition: all 0.2s ease-in-out;
}

/* Animation for error shake */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.border-red-500 {
    animation: shake 0.3s ease-in-out;
}
</style>

