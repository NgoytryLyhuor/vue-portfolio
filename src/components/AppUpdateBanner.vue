<!-- AppUpdateBanner.vue - Prominent Notification when a new App version is available -->
<template>
  <transition
    enter-active-class="transition duration-350 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
    enter-from-class="opacity-0 translate-y-6 sm:-translate-y-5 scale-95 blur-[4px]"
    enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
    leave-active-class="transition duration-220 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
    leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
    leave-to-class="opacity-0 translate-y-6 sm:-translate-y-4 scale-95 blur-[2px]"
  >
    <div
      v-if="updateAvailable"
      class="fixed bottom-4 left-3 right-3 sm:bottom-auto sm:top-20 sm:left-auto sm:right-6 sm:w-96 z-[9999] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl p-4 sm:p-4.5 rounded-2xl border-2 border-white/20 backdrop-blur-xl animate-bounce-slight"
      role="alert"
      aria-live="polite"
    >
      <div class="flex items-start gap-3">
        <!-- Animated Update Rocket Icon -->
        <div class="relative shrink-0 mt-0.5">
          <div class="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-xl shadow-inner">
            <span>🚀</span>
          </div>
          <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0 pr-1">
          <div class="flex items-center justify-between">
            <h4 class="text-xs sm:text-sm font-black uppercase tracking-wider text-white truncate flex items-center gap-1.5">
              <span>{{ isKhmer ? 'មានកំណែថ្មី! (Update Available)' : 'New Update Available' }}</span>
              <span class="text-[9px] bg-emerald-400 text-slate-900 font-bold px-1.5 py-0.2 rounded font-mono">NEW</span>
            </h4>
            <button
              @click="dismissNotification"
              class="text-white/70 hover:text-white p-1 -mr-1 -mt-1 transition-colors touch-manipulation"
              aria-label="Close update notification"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-[11px] sm:text-xs text-white/95 mt-1 leading-snug">
            {{ isKhmer
              ? 'កំណែចុងក្រោយត្រូវបានដាក់ឱ្យដំណើរការ។ សូមចុចប៊ូតុងខាងក្រោមដើម្បី Refresh យកមុខងារថ្មីៗ!'
              : 'A newer version has been deployed. Tap below to refresh and load the latest features instantly!'
            }}
          </p>

          <!-- Action Buttons -->
          <div class="mt-3 flex items-center gap-2">
            <button
              @click="applyUpdate"
              class="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white text-blue-700 hover:bg-blue-50 active:scale-95 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer touch-manipulation font-mono"
            >
              <svg class="w-4 h-4 animate-spin text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ isKhmer ? 'Update & Refresh ឥឡូវនេះ' : 'Refresh Now' }}</span>
            </button>

            <button
              @click="dismissNotification"
              class="px-3 py-2 text-xs text-white/80 hover:text-white transition-colors cursor-pointer touch-manipulation"
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

<style scoped>
@keyframes bounceSlight {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.animate-bounce-slight {
  animation: bounceSlight 3s ease-in-out infinite;
}
</style>
