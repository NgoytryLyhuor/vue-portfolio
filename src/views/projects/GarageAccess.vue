<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
        <div class="w-full max-w-2xl">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="px-8 py-6 sm:px-10 sm:py-8 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Private</p>
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">Lyhuor Garage Access</h1>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Unlock your private tools: Crypto Tracker + Prius 2011 maintenance.</p>
                    </div>
                    <div class="hidden sm:flex h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/40 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 8V6a2 2 0 114 0v2H8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div class="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 space-y-6">
                        <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>{{ errorMessage }}</div>
                        </div>

                        <form @submit.prevent="handleSubmit" class="space-y-4">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div class="relative">
                                <input
                                    id="garage-password"
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Enter private password"
                                    class="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    :class="{ 'border-red-500 dark:border-red-500': errorMessage }"
                                    autocomplete="current-password"
                                    autofocus
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>

                            <button
                                type="submit"
                                :disabled="loading || !password.trim()"
                                class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span v-if="!loading">Unlock Garage</span>
                                <span v-else>Verifying...</span>
                            </button>
                        </form>

                        <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M18 13V9a1 1 0 00-1-1h-4l-2-4-2 4H3a1 1 0 00-1 1v4a1 1 0 001 1h14a1 1 0 001-1z" />
                            </svg>
                            One password unlocks both Crypto Tracker + Prius maintenance (session only).
                        </div>

                        <div class="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2">
                            This is a client-side guard for convenience only. It does not provide real security — determined users can inspect the source.
                        </div>
                    </div>

                    <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Tools inside</p>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Garage Contents</h3>
                            </div>
                            <div class="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div class="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">Crypto Price Tracker</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Password-locked real-time prices</p>
                            </div>
                            <div class="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">Prius 2011 Maintenance</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Cambodia-ready reminders & specs</p>
                            </div>
                        </div>

                        <router-link to="/" class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to portfolio
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Private access page for Lyhuor's garage
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const loading = ref(false)

const GARAGE_PASSWORD = process.env.VUE_APP_GARAGE_PASSWORD || 'lyhuor'

const sanitizeRedirect = (path) => {
    if (!path || typeof path !== 'string') return null
    if (!path.startsWith('/') || path.startsWith('//')) return null
    if (path.includes('://')) return null
    return path
}

const redirectAfterUnlock = () => {
    const redirect = sanitizeRedirect(route.query.redirect)
    router.replace(redirect || '/garage')
}

const checkExistingSession = () => {
    if (sessionStorage.getItem('garage_auth') === 'true') {
        redirectAfterUnlock()
    }
}

const handleSubmit = async () => {
    errorMessage.value = ''
    if (!password.value.trim()) {
        errorMessage.value = 'Please enter the password'
        return
    }

    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 400))

    if (password.value.trim() === GARAGE_PASSWORD) {
        sessionStorage.setItem('garage_auth', 'true')
        // Also unlock crypto tracker so both tools are available
        sessionStorage.setItem('crypto_tracker_auth', 'true')
        redirectAfterUnlock()
    } else {
        errorMessage.value = 'Incorrect password. Try again.'
        password.value = ''
    }
    loading.value = false
}

onMounted(() => {
    checkExistingSession()
    const input = document.getElementById('garage-password')
    if (input) {
        input.focus()
    }
})
</script>

<style scoped>
input:focus {
    transition: all 0.2s ease-in-out;
}
</style>

