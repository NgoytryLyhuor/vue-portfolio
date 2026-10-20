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
/* ========================================================
   OriginOS 4 & ColorOS 14 Fluid Motion & Physics Engine
   Natural springs, tactile touch feedback & buttery smooth transitions
   ======================================================== */

:root {
  --ease-fluid: cubic-bezier(0.2, 0.9, 0.1, 1);
  --ease-spring: cubic-bezier(0.34, 1.35, 0.64, 1);
  --ease-gentle: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
}

/* 1. Global Smooth Scrolling, Touch Physics & High-DPI Font Rendering */
html {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Eliminate default clumsy grey tap highlight box on mobile touchscreens */
*, *::before, *::after {
  -webkit-tap-highlight-color: transparent !important;
}

/* Subtle micro-radius (~4px) for crisp modern architectural finish */
.rounded-3xl, .rounded-2xl, .rounded-xl, .rounded-lg, .rounded-md, .rounded {
  border-radius: 4px !important;
}

button:not(.rounded-full),
input, select, textarea {
  border-radius: 4px;
}

/* 2. Tactile Button & Link Physical Touch Response (OriginOS Click Feedback) */
button, 
a,
[role="button"],
input[type="button"],
input[type="submit"] {
  will-change: transform;
  transition: transform 0.32s cubic-bezier(0.34, 1.35, 0.64, 1),
              box-shadow 0.28s cubic-bezier(0.2, 0.9, 0.1, 1),
              background-color 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              color 0.22s cubic-bezier(0.25, 1, 0.5, 1),
              filter 0.22s ease;
}

/* Elastic tactile touch & click compression like ColorOS / OriginOS */
button:active:not(:disabled),
a:active,
[role="button"]:active:not([aria-disabled="true"]) {
  transform: scale(0.965) translateY(0.5px) !important;
  filter: brightness(0.96);
  transition: transform 0.12s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.12s ease !important;
}

/* Dark mode active press subtle glow */
.dark button:active:not(:disabled),
.dark a:active,
.dark [role="button"]:active {
  filter: brightness(1.08);
}

/* 3. ColorOS Aquamorphic Fluid Cards & Tactile Hover Physics */
.group:hover,
[class*="hover:border-"]:hover {
  transition: transform 0.32s cubic-bezier(0.34, 1.35, 0.64, 1),
              box-shadow 0.32s cubic-bezier(0.2, 0.9, 0.1, 1),
              border-color 0.25s ease;
}

/* 4. OriginOS Minimalist Pill Scrollbars */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 9999px;
  transition: background 0.3s ease, width 0.3s ease;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.65);
}
.dark ::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(96, 165, 250, 0.6);
}

/* Hide scrollbar for Chrome, Safari, Opera and mobile browsers */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 5. OriginOS & ColorOS Fluid Cloud Page Transitions */
.ios-page-enter-active {
  transition: opacity 0.36s cubic-bezier(0.2, 0.9, 0.1, 1),
              transform 0.36s cubic-bezier(0.2, 0.9, 0.1, 1),
              filter 0.36s cubic-bezier(0.2, 0.9, 0.1, 1);
  will-change: transform, opacity, filter;
}
.ios-page-leave-active {
  transition: opacity 0.18s cubic-bezier(0.2, 0.9, 0.1, 1),
              transform 0.18s cubic-bezier(0.2, 0.9, 0.1, 1),
              filter 0.18s cubic-bezier(0.2, 0.9, 0.1, 1);
  will-change: transform, opacity, filter;
}
.ios-page-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.986);
  filter: blur(5px);
}
.ios-page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
  filter: blur(2px);
}

/* Language switching fluid morphing */
.language-changing main {
  transition: opacity 0.28s cubic-bezier(0.2, 0.9, 0.1, 1), 
              transform 0.28s cubic-bezier(0.2, 0.9, 0.1, 1),
              filter 0.28s cubic-bezier(0.2, 0.9, 0.1, 1);
  opacity: 0.85;
  transform: scale(0.995);
  filter: blur(0.5px);
}

/* 6. Subtle ColorOS Focus Rings */
:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6) !important;
  outline-offset: 2px !important;
  transition: outline 0.15s ease;
}
</style>