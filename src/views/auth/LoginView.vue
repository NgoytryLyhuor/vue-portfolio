<template>
    <div class="mt-[80px] bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo/Brand Section -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                <p class="text-lg text-gray-600 dark:text-gray-300">
                    Sign in to your account to continue
                </p>
            </div>

            <!-- Login Form -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">

                <!-- Error Message -->
                <div v-if="generalError" class="p-3 mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span class="text-sm text-red-700 dark:text-red-300">{{ generalError }}</span>
                    </div>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <input 
                                v-model="form.email" 
                                type="email" 
                                id="email" 
                                required
                                :class="{
                                    'border-red-500 focus:ring-red-500': errors.email,
                                    'border-gray-300 dark:border-gray-600 focus:ring-blue-500': !errors.email
                                }"
                                class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 transition-colors duration-200"
                                placeholder="Enter your email"
                            />
                        </div>
                        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div class="relative">
                            <input 
                                v-model="form.password" 
                                :type="showPassword ? 'text' : 'password'" 
                                id="password" 
                                required
                                :class="{
                                    'border-red-500 focus:ring-red-500': errors.password,
                                    'border-gray-300 dark:border-gray-600 focus:ring-blue-500': !errors.password
                                }"
                                class="w-full px-4 py-3 pr-12 rounded-lg border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 transition-colors duration-200"
                                placeholder="Enter your password"
                            />
                            <button 
                                type="button" 
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input 
                                v-model="form.rememberMe" 
                                type="checkbox" 
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                        </label>
                        <a href="#" @click.prevent="showForgotPassword = true" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        :disabled="loading"
                        class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        <span v-if="loading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                        <span v-else>Sign In</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Forgot Password Modal -->
        <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reset Password</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                
                <form @submit.prevent="handleForgotPassword" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input 
                            v-model="forgotPasswordEmail" 
                            type="email" 
                            required
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div class="flex space-x-3">
                        <button type="submit" class="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                            Send Reset Link
                        </button>
                        <button type="button" @click="showForgotPassword = false" class="flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
// Login page - User authentication
import { ref } from 'vue'
import api from '@/service/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
    email: '',
    password: '',
    rememberMe: false
})

const errors = ref({})
const generalError = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showForgotPassword = ref(false)
const forgotPasswordEmail = ref('')

// Methods
const handleLogin = async () => {
    loading.value = true
    errors.value = {}
    generalError.value = ''

    try {
        if (!validateForm()) {
            loading.value = false
            return
        }

        const response = await api.post('/login', {
            email: form.value.email,
            password: form.value.password
        })

        if (response.data.status) {
            // Store the token
            const token = response.data.data.token
            localStorage.setItem('token', token)
            
            // Redirect to dashboard
            router.push({ name: 'Dashboard' })
        } else {
            generalError.value = response.data.message || 'Login failed. Please check your credentials.'
        }
        
    } catch (error) {
        if (error.response && error.response.data) {
            generalError.value = error.response.data.message || 'Login failed'
        } else {
            generalError.value = 'An error occurred during login'
        }
    } finally {
        loading.value = false
    }
}

const validateForm = () => {
    const formErrors = {}
    
    if (!form.value.email) {
        formErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
        formErrors.email = 'Please enter a valid email address'
    }
    
    if (!form.value.password) {
        formErrors.password = 'Password is required'
    } else if (form.value.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters'
    }
    
    errors.value = formErrors
    return Object.keys(formErrors).length === 0
}

const handleForgotPassword = async () => {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Show success message
        alert('Password reset link sent to your email!')
        showForgotPassword.value = false
        forgotPasswordEmail.value = ''
    } catch (error) {
        alert('Error sending reset link. Please try again.')
    }
}
</script>

<style scoped>
/* Custom focus styles */
input:focus, button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation for loading spinner */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Custom checkbox styles */
input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}

/* Smooth transitions */
.transition-colors {
    transition: all 0.2s ease-in-out;
}
</style>