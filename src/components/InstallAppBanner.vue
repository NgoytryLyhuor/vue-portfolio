<!-- InstallAppBanner.vue - PWA Installation Prompt & iOS Walkthrough Modal -->
<template>
  <div>
    <!-- Floating Install Prompt Banner -->
    <transition
      enter-active-class="transition duration-350 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
      enter-from-class="opacity-0 translate-y-6 scale-95 blur-[4px]"
      enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
      leave-active-class="transition duration-220 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
      leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
      leave-to-class="opacity-0 translate-y-4 scale-95 blur-[2px]"
    >
      <div
        v-if="canInstall && !isInstalled && !isBannerDismissed"
        class="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-2xl p-3.5 sm:p-4 rounded-xl text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-label="Install Application"
      >
        <div class="flex items-start gap-3">
          <!-- App Icon -->
          <img
            src="/pwa-192x192.png"
            alt="Lyhuor App Icon"
            class="w-11 h-11 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 object-cover"
            width="44"
            height="44"
          />

          <!-- Text Details -->
          <div class="flex-1 min-w-0 pr-1">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-black tracking-tight text-slate-900 dark:text-white uppercase truncate">
                {{ isKhmer ? 'ដំឡើង Lyhuor App' : 'Install Lyhuor App' }}
              </h4>
              <button
                @click="dismissBanner"
                class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded transition-colors -mr-1 -mt-1"
                aria-label="Dismiss banner"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
              {{ isKhmer 
                ? 'ទាញយកដាក់លើអេក្រង់ទូរស័ព្ទ ដើម្បីបើកប្រើប្រាស់រហ័ស ដូច App ផ្ទាល់!' 
                : 'Add to your home screen for quick, offline-ready native app experience.' 
              }}
            </p>

            <!-- Actions -->
            <div class="mt-2.5 flex items-center gap-2">
              <button
                @click="handleInstallClick"
                class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md transition-colors shadow-sm cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{{ isKhmer ? 'ដំឡើងឥឡូវនេះ' : 'Install Now' }}</span>
              </button>
              <button
                @click="dismissBanner"
                class="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {{ isKhmer ? 'ពេលក្រោយ' : 'Later' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- iOS "Add to Home Screen" Walkthrough Modal -->
    <transition
      enter-active-class="transition duration-320 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
      enter-from-class="opacity-0 scale-95 blur-[4px]"
      enter-to-class="opacity-100 scale-100 blur-0"
      leave-active-class="transition duration-200 ease-[cubic-bezier(0.2,0.9,0.1,1)]"
      leave-from-class="opacity-100 scale-100 blur-0"
      leave-to-class="opacity-0 scale-95 blur-[2px]"
    >
      <div
        v-if="showIosGuide"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeIosGuide"
        role="dialog"
        aria-modal="true"
        aria-label="iOS Install Instructions"
      >
        <div class="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl rounded-2xl p-5 text-slate-800 dark:text-slate-100 space-y-4">
          <!-- Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-2.5">
              <img
                src="/pwa-192x192.png"
                alt="App Icon"
                class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h3 class="text-sm font-black uppercase text-slate-900 dark:text-white">
                  {{ isKhmer ? 'របៀបដំឡើងលើ iPhone / iPad' : 'Install on iPhone / iPad' }}
                </h3>
                <p class="text-[10px] font-mono text-slate-500">Safari Browser • PWA</p>
              </div>
            </div>
            <button
              @click="closeIosGuide"
              class="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Step by Step Visual Guide -->
          <div class="space-y-3 text-xs">
            <!-- Step 1 -->
            <div class="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  {{ isKhmer ? 'ចុចប៊ូតុង Share (ចែករំលែក)' : 'Tap the Share Button' }}
                </p>
                <p class="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                  {{ isKhmer 
                    ? 'ចុចរូបសញ្ញា Share នៅបាតក្រោមបង្អួច Safari (ឬខាងលើសម្រាប់ iPad)' 
                    : 'Tap the Share icon at the bottom toolbar of Safari (or top on iPad).' 
                  }}
                </p>
                <div class="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded text-[11px] font-medium border border-blue-200 dark:border-blue-800">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share (⎋ / ចែករំលែក)</span>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  {{ isKhmer ? 'ជ្រើសរើស "បន្ថែមទៅអេក្រង់ដើម"' : 'Select "Add to Home Screen"' }}
                </p>
                <p class="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                  {{ isKhmer 
                    ? 'អូសចុះក្រោមក្នុងបញ្ជី រួចចុចលើជម្រើស Add to Home Screen' 
                    : 'Scroll down the share sheet and tap "Add to Home Screen".' 
                  }}
                </p>
                <div class="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded text-[11px] font-medium border border-emerald-200 dark:border-emerald-800">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add to Home Screen ➕</span>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div class="flex-1">
                <p class="font-bold text-slate-900 dark:text-white">
                  {{ isKhmer ? 'ចុចពាក្យ "Add" (បន្ថែម)' : 'Tap "Add" in top-right' }}
                </p>
                <p class="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                  {{ isKhmer 
                    ? 'ចុច Add នៅជ្រុងខាងលើស្តាំ ដើម្បីបញ្ចប់ការដំឡើង' 
                    : 'Confirm by tapping "Add" in the top-right corner.' 
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bottom Button -->
          <div class="pt-2">
            <button
              @click="closeIosGuide"
              class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
            >
              {{ isKhmer ? 'ខ្ញុំបានយល់ហើយ (Got It)' : 'Got It' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { usePwaInstall } from '@/composables/usePwaInstall';
import { useLanguage } from '@/composables/useLanguage';

const { isKhmer } = useLanguage();
const {
  canInstall,
  isInstalled,
  isIos,
  showIosGuide,
  isBannerDismissed,
  installApp,
  dismissBanner,
  closeIosGuide
} = usePwaInstall();

const handleInstallClick = async () => {
  await installApp();
};
</script>
