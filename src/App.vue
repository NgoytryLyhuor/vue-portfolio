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