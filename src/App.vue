<!-- App.vue - Vue Portfolio Main Component -->
<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-500 ease-in-out flex flex-col">
      <NavBar v-if="route.meta.showNavBar" />
      <main class="container mx-auto px-4 py-8 flex-grow">
        <router-view v-slot="{ Component, route: currentRoute }">
          <transition name="ios-page" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </transition>
        </router-view>
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
/* Global Sharp Architecture Aesthetic (Strictly No Rounded Corners) */
*, *::before, *::after {
  border-radius: 0px !important;
}

/* Custom Sharp Minimalist Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.35);
  border-radius: 0px !important;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}

/* iOS 27 / Apple Fluid Page Transitions */
.ios-page-enter-active {
  transition: opacity 0.32s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.32s cubic-bezier(0.25, 1, 0.5, 1);
}
.ios-page-leave-active {
  transition: opacity 0.18s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.18s cubic-bezier(0.25, 1, 0.5, 1);
}
.ios-page-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.996);
}
.ios-page-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.996);
}

.language-changing main {
  transition: opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1), transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0.85;
  transform: scale(0.998);
}
</style>