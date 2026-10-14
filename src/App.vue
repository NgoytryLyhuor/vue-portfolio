<!-- App.vue - Vue Portfolio Main Component -->
<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-all duration-500 ease-in-out flex flex-col">
      <NavBar v-if="route.meta.showNavBar" />
      <main class="container mx-auto px-4 py-8 transition-all duration-500 ease-in-out flex-grow">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </ErrorBoundary>
</template>

<script setup>
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import AppFooter from './components/Footer.vue';
import { useMetaTags } from './composables/useMetaTags';

const route = useRoute();
useMetaTags(); // Initialize meta tags management
</script>

<style>
.language-changing main {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.85;
  transform: translateY(1px);
}
</style>