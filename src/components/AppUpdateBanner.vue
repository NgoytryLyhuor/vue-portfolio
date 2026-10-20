<!-- AppUpdateBanner.vue - Floating Notification when a new App version is available -->
<template>
  <transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0 -translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-4 scale-95"
  >
    <div
      v-if="updateAvailable"
      class="fixed top-16 sm:top-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl p-3.5 sm:p-4 rounded-xl border border-blue-400/40 backdrop-blur-md"
      role="alert"
      aria-live="polite"
    >
      <div class="flex items-start gap-3">
        <!-- Animated Update Icon -->
        <div class="relative shrink-0 mt-0.5">
          <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
          </span>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0 pr-1">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-black uppercase tracking-wider text-white truncate">
              {{ isKhmer ? '🚀 មានកំណែថ្មី! (Update Available)' : '🚀 New Update Available' }}
            </h4>
            <button
              @click="dismissNotification"
              class="text-white/70 hover:text-white p-0.5 -mr-1 -mt-1 transition-colors"
              aria-label="Close update notification"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-[11px] text-white/90 mt-0.5 leading-snug">
            {{ isKhmer
              ? 'កំណែថ្មីនៃគេហទំព័រ / App ត្រូវបានដាក់ឱ្យដំណើរការ។ សូមចុច Update ដើម្បីទទួលបានមុខងារចុងក្រោយ!'
              : 'A newer version of the app is ready. Refresh now to experience the latest features and fixes!'
            }}
          </p>

          <!-- Action Buttons -->
          <div class="mt-2.5 flex items-center gap-2">
            <button
              @click="applyUpdate"
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ isKhmer ? 'Update ឥឡូវនេះ' : 'Update Now' }}</span>
            </button>
            <button
              @click="dismissNotification"
              class="px-2.5 py-1.5 text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {{ isKhmer ? 'ពេលក្រោយ' : 'Later' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useAppUpdate } from '@/composables/useAppUpdate';
import { useLanguage } from '@/composables/useLanguage';

const { isKhmer } = useLanguage();
const { updateAvailable, applyUpdate, dismissNotification } = useAppUpdate();
</script>
