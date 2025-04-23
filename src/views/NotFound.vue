<template>
    <div class="mt-[170px] flex flex-col items-center justify-center transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h1 class="text-9xl font-bold mb-4 text-center dark:text-white">404</h1>
        <p class="text-xl mb-8 text-center">Oops, it looks like the page you're looking for doesn't exist.</p>
        <router-link to="/" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Go to Homepage
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>