<!-- App.vue - Vue Portfolio Main Component -->
<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-500 ease-in-out flex flex-col">
      <NavBar v-if="route.meta.showNavBar" />
      <main class="w-full flex-grow pb-8" :class="{ 'pt-14 sm:pt-16': route.meta.showNavBar }">
        <router-view v-slot="{ Component, route: currentRoute }">
          <transition name="ios-page" mode="out-in" @before-enter="onPageBeforeEnter">
            <component :is="Component" :key="currentRoute.path" />
          </transition>
        </router-view>
      </main>
      <AppFooter />
      <InstallAppBanner />
      <AppUpdateBanner />
    </div>
  </ErrorBoundary>
</template>

<script setup>
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import AppFooter from './components/Footer.vue';
import InstallAppBanner from './components/InstallAppBanner.vue';
import AppUpdateBanner from './components/AppUpdateBanner.vue';
import { useMetaTags } from './composables/useMetaTags';

const route = useRoute();
useMetaTags(); // Initialize meta tags management

const onPageBeforeEnter = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};
</script>

<style>
/* Subtle micro-radius (~4px) for crisp modern finish without excessive rounding */
.rounded-3xl, .rounded-2xl, .rounded-xl, .rounded-lg, .rounded-md, .rounded {
  border-radius: 4px !important;
}

button:not(.rounded-full),
input, select, textarea {
  border-radius: 4px;
}

/* Custom Clean Minimalist Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.35);
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}

/* Hide scrollbar for Chrome, Safari, Opera and mobile browsers */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
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