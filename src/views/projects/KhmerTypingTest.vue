<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-5xl mx-auto space-y-6 sm:space-y-8">

            <!-- Hero Section -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'តេស្តល្បឿនវាយអក្សរខ្មែរ UNICODE & NIDA KEYBOARD' : 'KHMER UNICODE TYPING SPEED TEST' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">WPM // CPM // ACCURACY</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="hidden sm:inline">LIVE CHARACTER HIGHLIGHT</span>
                    </div>
                </div>

                <div class="pt-5 sm:pt-6">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                        <div class="max-w-2xl space-y-3">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 rounded-md">
                                <span>⌨️</span>
                                <span>{{ isKhmer ? 'ហ្វឹកហាត់វាយអត្ថបទខ្មែរ' : 'KHMER TYPING TRAINER' }}</span>
                            </div>
                            <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {{ isKhmer ? 'តេស្តវាស់ល្បឿន និងភាពសុក្រឹតនៃការវាយអក្សរខ្មែរ' : 'Khmer Unicode Typing Speed & Accuracy Test' }}
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ isKhmer 
                                    ? 'វាស់ស្ទង់សមត្ថភាពវាយក្តារចុចខ្មែរ (Khmer NiDA) របស់អ្នកជាមួយពាក្យ ឃ្លា និងសុភាសិតខ្មែរ។ បង្ហាញល្បឿន WPM, CPM, ភាពសុក្រឹត (Accuracy) និងពិន្ទុកម្រិត Rank ដោយផ្ទាល់ភ្លាមៗ។' 
                                    : 'Test and improve your Khmer Unicode typing proficiency. Features live WPM/CPM calculation, keystroke accuracy tracking, NiDA subscript guidelines, and ranking benchmarks.' }}
                            </p>
                        </div>

                        <!-- Settings & Durations -->
                        <div class="p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-3 lg:w-72 shrink-0">
                            <!-- Duration Selector -->
                            <div>
                                <label class="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                                    {{ isKhmer ? 'កំណត់រយៈពេល' : 'Duration' }}
                                </label>
                                <div class="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold font-mono">
                                    <button 
                                        v-for="time in [30, 60, 120]" 
                                        :key="time"
                                        @click="setDuration(time)"
                                        :disabled="isActive"
                                        class="py-1 px-2 rounded-lg transition-all"
                                        :class="selectedDuration === time ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 disabled:opacity-50'">
                                        {{ time }}s
                                    </button>
                                </div>
                            </div>

                            <!-- Difficulty Selector -->
                            <div>
                                <label class="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                                    {{ isKhmer ? 'កម្រិតពិបាក' : 'Difficulty' }}
                                </label>
                                <div class="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-[11px] font-bold">
                                    <button 
                                        @click="setDifficulty('easy')"
                                        :disabled="isActive"
                                        class="py-1 px-1.5 rounded-lg transition-all"
                                        :class="difficulty === 'easy' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 disabled:opacity-50'">
                                        {{ isKhmer ? 'ងាយ' : 'Easy' }}
                                    </button>
                                    <button 
                                        @click="setDifficulty('medium')"
                                        :disabled="isActive"
                                        class="py-1 px-1.5 rounded-lg transition-all"
                                        :class="difficulty === 'medium' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 disabled:opacity-50'">
                                        {{ isKhmer ? 'មធ្យម' : 'Medium' }}
                                    </button>
                                    <button 
                                        @click="setDifficulty('proverb')"
                                        :disabled="isActive"
                                        class="py-1 px-1.5 rounded-lg transition-all"
                                        :class="difficulty === 'proverb' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 disabled:opacity-50'">
                                        {{ isKhmer ? 'សុភាសិត' : 'Hard' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Real-time Score Board -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <!-- Time Remaining -->
                <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs text-center space-y-1">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        {{ isKhmer ? 'ពេលវេលានៅសល់' : 'TIME REMAINING' }}
                    </span>
                    <div class="text-2xl sm:text-3xl font-black font-mono" :class="timeLeft <= 10 && isActive ? 'text-rose-500 animate-pulse' : 'text-slate-900 dark:text-white'">
                        {{ timeLeft }}<span class="text-sm font-normal text-slate-400">s</span>
                    </div>
                </div>

                <!-- Live WPM -->
                <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs text-center space-y-1">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        {{ isKhmer ? 'ពាក្យក្នុង១នាទី (WPM)' : 'WORDS / MIN' }}
                    </span>
                    <div class="text-2xl sm:text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                        {{ liveWpm }}
                    </div>
                </div>

                <!-- Live CPM -->
                <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs text-center space-y-1">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        {{ isKhmer ? 'តួអក្សរក្នុង១នាទី (CPM)' : 'CHARS / MIN' }}
                    </span>
                    <div class="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {{ liveCpm }}
                    </div>
                </div>

                <!-- Accuracy -->
                <div class="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs text-center space-y-1">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        {{ isKhmer ? 'ភាពសុក្រឹត' : 'ACCURACY' }}
                    </span>
                    <div class="text-2xl sm:text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                        {{ accuracy }}<span class="text-sm font-normal">%</span>
                    </div>
                </div>
            </div>

            <!-- Interactive Typing Arena -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-8 shadow-sm space-y-5">
                
                <!-- Target Text Display with Character Highlighting -->
                <div 
                    @click="focusInput"
                    class="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-lg sm:text-2xl leading-loose font-normal select-none cursor-text tracking-wide relative min-h-[140px]">
                    
                    <span 
                        v-for="(char, index) in targetChars" 
                        :key="index"
                        :class="getCharClass(index)">
                        {{ char }}
                    </span>

                    <!-- Pulsing Cursor Indicator -->
                    <span 
                        v-if="!isFinished" 
                        class="inline-block w-0.5 h-6 bg-indigo-500 animate-pulse ml-0.5 align-middle">
                    </span>
                </div>

                <!-- User Input Field (Real-time tracking) -->
                <div class="space-y-2">
                    <div class="relative">
                        <input 
                            ref="typingInput"
                            v-model="userInput"
                            @input="handleInput"
                            @keydown="handleKeyDown"
                            :disabled="isFinished"
                            type="text"
                            :placeholder="isKhmer ? 'ចាប់ផ្តើមវាយនៅទីនេះ ដើម្បីដំណើរការកម្មវិធី...' : 'Start typing here to begin test...'"
                            class="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border-2 rounded-xl text-base sm:text-lg focus:outline-none transition-all font-sans"
                            :class="inputBorderClass"
                        />
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                            {{ userInput.length }} / {{ targetText.length }}
                        </div>
                    </div>

                    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center gap-1">
                                <span class="w-2.5 h-2.5 bg-emerald-500 rounded-sm inline-block"></span>
                                {{ isKhmer ? 'ត្រូវ' : 'Correct' }} ({{ correctCount }})
                            </span>
                            <span class="flex items-center gap-1">
                                <span class="w-2.5 h-2.5 bg-rose-500 rounded-sm inline-block"></span>
                                {{ isKhmer ? 'ខុស' : 'Incorrect' }} ({{ errorCount }})
                            </span>
                        </div>
                        <button 
                            @click="restartTest"
                            class="hover:text-indigo-600 dark:hover:text-indigo-400 font-mono font-bold flex items-center gap-1 transition-colors">
                            <span>🔄</span>
                            <span>{{ isKhmer ? 'ចាប់ផ្តើមឡើងវិញ (Restart)' : 'Restart' }}</span>
                        </button>
                    </div>
                </div>

                <!-- Test Finished Result Banner -->
                <div v-if="isFinished" class="p-6 border-2 border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                    <div class="inline-block p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-3xl">
                        {{ rankData.badge }}
                    </div>
                    <div>
                        <span class="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                            {{ isKhmer ? 'លទ្ធផលតេស្តរបស់អ្នក' : 'TEST COMPLETED' }}
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                            {{ isKhmer ? rankData.titleKm : rankData.titleEn }} ({{ rankData.rank }})
                        </h2>
                        <p class="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
                            {{ isKhmer ? rankData.descKm : rankData.descEn }}
                        </p>
                    </div>

                    <!-- Final Stats Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto text-xs font-mono">
                        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
                            <span class="text-slate-400 block text-[10px]">SPEED</span>
                            <strong class="text-lg text-indigo-600 dark:text-indigo-400">{{ liveWpm }} WPM</strong>
                        </div>
                        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
                            <span class="text-slate-400 block text-[10px]">CHARACTERS</span>
                            <strong class="text-lg text-emerald-600 dark:text-emerald-400">{{ liveCpm }} CPM</strong>
                        </div>
                        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
                            <span class="text-slate-400 block text-[10px]">ACCURACY</span>
                            <strong class="text-lg text-blue-600 dark:text-blue-400">{{ accuracy }}%</strong>
                        </div>
                        <div class="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/60">
                            <span class="text-slate-400 block text-[10px]">ERRORS</span>
                            <strong class="text-lg text-rose-500">{{ errorCount }}</strong>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button 
                            @click="restartTest"
                            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-xs">
                            🔄 {{ isKhmer ? 'សាកល្បងម្តងទៀត' : 'Try Again' }}
                        </button>
                        <button 
                            @click="loadNextPrompt"
                            class="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold font-mono transition-colors">
                            ⏭️ {{ isKhmer ? 'អត្ថបទបន្ទាប់' : 'Next Text' }}
                        </button>
                        <button 
                            @click="copyScore"
                            class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold font-mono transition-colors">
                            📋 {{ copiedScore ? (isKhmer ? 'ចម្លងរួច!' : 'Copied!') : (isKhmer ? 'ចែករំលែកពិន្ទុ' : 'Copy Score') }}
                        </button>
                    </div>
                </div>

            </div>

            <!-- Khmer NiDA Keyboard Helper & Cheat Sheet -->
            <div class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-lg">💡</span>
                        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {{ isKhmer ? 'គន្លឹះវាយអក្សរខ្មែរ (Khmer NiDA Keyboard Rules)' : 'Khmer NiDA Keyboard Rules & Shortcuts' }}
                        </h3>
                    </div>
                    <button 
                        @click="showKeyboardTips = !showKeyboardTips"
                        class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        {{ showKeyboardTips ? (isKhmer ? 'លាក់' : 'Hide') : (isKhmer ? 'បង្ហាញ' : 'Show') }}
                    </button>
                </div>

                <div v-show="showKeyboardTips" class="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    <!-- Rule 1: Subscript (ជើង) -->
                    <div class="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <div class="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                            1. របៀបវាយជើងអក្សរ (Subscripts)
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            ចុចអក្សរ <kbd class="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded font-mono font-bold">j</kbd> បន្ទាប់មកចុចព្យញ្ជនៈដែលចង់ធ្វើជាជើង។
                        </p>
                        <div class="font-mono text-[11px] text-slate-500 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                            ឧទាហរណ៍៖ j + k = <strong>្ក</strong> | j + m = <strong>្ម</strong>
                        </div>
                    </div>

                    <!-- Rule 2: Independent Vowels -->
                    <div class="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <div class="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            2. ស្រៈពេញតួ (Independent)
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            ប្រើប្រាស់ Shift រួមជាមួយអក្សរធំ៖
                        </p>
                        <div class="font-mono text-[11px] text-slate-500 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                            Shift + E = <strong>ឯ</strong> | Shift + I = <strong>ឪ</strong> | Shift + U = <strong>ឧ</strong>
                        </div>
                    </div>

                    <!-- Rule 3: Zero-Width Space -->
                    <div class="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <div class="font-bold text-amber-600 dark:text-amber-400 font-mono">
                            3. ដកឃ្លាមិនឃើញ (ZWSP)
                        </div>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            ចុច <kbd class="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded font-mono font-bold">Shift + Space</kbd> ដើម្បីខណ្ឌពាក្យមិនឱ្យដាច់បន្ទាត់ខុសក្បួន។
                        </p>
                        <div class="font-mono text-[11px] text-slate-500 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                            ប្រើរវាងពាក្យដើម្បីសម្រួលដល់ការកាត់បន្ទាត់
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

export default {
    name: 'KhmerTypingTest',
    setup() {
        const { isKhmer } = useLanguage();

        // Datasets of Khmer texts for typing
        const prompts = {
            easy: [
                'សួស្តី ប្រទេសកម្ពុជា គឺជាទឹកដីសុវណ្ណភូមិដ៏ស្រស់ស្អាត មានប្រាសាទបុរាណ និងវប្បធម៌យូរលង់ណាស់មកហើយ។',
                'ការសិក្សារៀនសូត្រ គឺជាស្ពានចម្លងមនុស្សទៅកាន់អនាគតដ៏ភ្លឺស្វាង និងភាពជោគជ័យក្នុងជីវិត។',
                'សន្តិភាព និងស្ថិរភាព គឺជាគ្រឹះដ៏រឹងមាំក្នុងការអភិវឌ្ឍសង្គមជាតិ និងសេដ្ឋកិច្ចឱ្យរីកចម្រើន។',
                'មិត្តល្អ គឺជាអ្នកដែលតែងតែជួយយកអាសា និងលើកទឹកចិត្តយើងនៅពេលជួបការលំបាក។'
            ],
            medium: [
                'ការរីកចម្រើននៃបច្ចេកវិទ្យាឌីជីថលនៅកម្ពុជា កំពុងជួយសម្រួលដល់ការរស់នៅប្រចាំថ្ងៃ និងការទូទាត់ប្រាក់តាមប្រព័ន្ធបាគង។',
                'យុវជនគឺជាទំពាំងស្នងឫស្សី និងជាកម្លាំងចលករដ៏មានឥទ្ធិពល ក្នុងការកសាងសង្គមឱ្យមានការច្នៃប្រឌិត និងការរីកចម្រើន។',
                'ការអានសៀវភៅជួយបើកទូលាយការគិត បង្កើនចំណេះដឹង និងជួយឱ្យយើងយល់ដឹងកាន់តែច្បាស់ពីពិភពលោកជុំវិញខ្លួន។',
                'ការអភិរក្សបរិស្ថាន ការដាំដើមឈើ និងការកាត់បន្ថយប្លាស្ទិក គឺជាកាតព្វកិច្ចរបស់យើងទាំងអស់គ្នា ដើម្បីភពផែនដី។'
            ],
            proverb: [
                'ចេះឯងឲ្យក្រែងចេះគេ ទឹកជ្រៅស្ងាត់ស្ងៀម យល់ជ្រៅចេះគិត កុំអាងកម្លាំងមើលងាយអ្នកទន់ខ្សោយ។',
                'ធ្វើស្រែទាន់ក្តៅដី ចង់ស្រីទាន់ក្តៅចិត្ត ចង់ចេះឲ្យខំរៀន ចង់មានឲ្យខំរក្សាទ្រព្យសម្បត្តិ។',
                'ចំណេះជាទ្រព្យ មិនចេះបាត់បង់ ទោះបីជួបព្យុះភ្លៀងយ៉ាងណា ក៏ចំណេះនៅតែតាមការពារខ្លួនជានិច្ច។',
                'កុំទុកចិត្តមេឃ កុំទុកចិត្តផ្កាយ កុំទុកចិត្តស្រីមេម៉ាយ កុំទុកចិត្តម្តាយក្មេក បង្កើនការប្រុងប្រយ័ត្នក្នុងជីវិត។'
            ]
        };

        // State
        const selectedDuration = ref(60);
        const difficulty = ref('medium');
        const targetText = ref('');
        const userInput = ref('');
        const timeLeft = ref(60);
        const isActive = ref(false);
        const isFinished = ref(false);
        const showKeyboardTips = ref(true);
        const copiedScore = ref(false);

        const typingInput = ref(null);
        let timer = null;
        let startTime = null;

        // Pick prompt
        const loadPrompt = () => {
            const list = prompts[difficulty.value];
            const random = list[Math.floor(Math.random() * list.length)];
            targetText.value = random;
            userInput.value = '';
            timeLeft.value = selectedDuration.value;
            isActive.value = false;
            isFinished.value = false;
            if (timer) clearInterval(timer);
        };

        const loadNextPrompt = () => {
            loadPrompt();
            focusInput();
        };

        const setDuration = (time) => {
            selectedDuration.value = time;
            timeLeft.value = time;
        };

        const setDifficulty = (diff) => {
            difficulty.value = diff;
            loadPrompt();
        };

        const focusInput = () => {
            if (typingInput.value) {
                typingInput.value.focus();
            }
        };

        // Target chars array
        const targetChars = computed(() => {
            return targetText.value.split('');
        });

        // Input handler
        const handleInput = () => {
            if (!isActive.value && !isFinished.value && userInput.value.length > 0) {
                // Start timer on first character
                isActive.value = true;
                startTime = Date.now();
                timer = setInterval(() => {
                    if (timeLeft.value > 0) {
                        timeLeft.value--;
                    } else {
                        finishTest();
                    }
                }, 1000);
            }

            // If user typed the entire target text
            if (userInput.value.length >= targetText.value.length) {
                finishTest();
            }
        };

        const handleKeyDown = (e) => {
            if (isFinished.value) {
                if (e.key === 'Enter') {
                    restartTest();
                }
            }
        };

        const finishTest = () => {
            isFinished.value = true;
            isActive.value = false;
            if (timer) clearInterval(timer);
        };

        const restartTest = () => {
            loadPrompt();
            focusInput();
        };

        // Evaluation metrics
        const correctCount = computed(() => {
            let correct = 0;
            const userChars = userInput.value.split('');
            for (let i = 0; i < userChars.length; i++) {
                if (userChars[i] === targetChars.value[i]) {
                    correct++;
                }
            }
            return correct;
        });

        const errorCount = computed(() => {
            let errors = 0;
            const userChars = userInput.value.split('');
            for (let i = 0; i < userChars.length; i++) {
                if (userChars[i] !== targetChars.value[i]) {
                    errors++;
                }
            }
            return errors;
        });

        const accuracy = computed(() => {
            if (userInput.value.length === 0) return 100;
            const acc = (correctCount.value / userInput.value.length) * 100;
            return Math.max(0, Math.round(acc));
        });

        const elapsedMinutes = computed(() => {
            const timeSpent = selectedDuration.value - timeLeft.value;
            return Math.max(timeSpent / 60, 1 / 60);
        });

        const liveCpm = computed(() => {
            if (!isActive.value && !isFinished.value) return 0;
            const cpm = Math.round(correctCount.value / elapsedMinutes.value);
            return isNaN(cpm) ? 0 : cpm;
        });

        const liveWpm = computed(() => {
            // Standard: 5 characters per word
            if (!isActive.value && !isFinished.value) return 0;
            const wpm = Math.round((correctCount.value / 5) / elapsedMinutes.value);
            return isNaN(wpm) ? 0 : wpm;
        });

        // Styling for target characters
        const getCharClass = (index) => {
            const typedChar = userInput.value[index];
            if (typedChar === undefined) {
                // Not typed yet
                return 'text-slate-400 dark:text-slate-500';
            }
            if (typedChar === targetChars.value[index]) {
                // Correctly typed
                return 'text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 rounded-xs';
            }
            // Error
            return 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 underline rounded-xs';
        };

        // Border class for input
        const inputBorderClass = computed(() => {
            if (isFinished.value) return 'border-indigo-500 bg-indigo-50/20';
            if (errorCount.value > 0) return 'border-rose-400 focus:border-rose-500';
            return 'border-slate-200 dark:border-slate-800 focus:border-indigo-500';
        });

        // Rank Badge Calculation
        const rankData = computed(() => {
            const wpm = liveWpm.value;
            if (wpm >= 50) {
                return {
                    rank: 'Rank S',
                    badge: '🏆',
                    titleKm: 'កំពូលអ្នកវាយអក្សរខ្មែរ (Grandmaster Typist)',
                    titleEn: 'Grandmaster Khmer Typist',
                    descKm: 'ល្បឿនរបស់អ្នកគឺលឿនខ្លាំងណាស់ លើសពីកម្រិតមធ្យមទូទៅ!',
                    descEn: 'Exceptional speed! You type Khmer Unicode with lightning speed and mastery.'
                };
            } else if (wpm >= 35) {
                return {
                    rank: 'Rank A',
                    badge: '⚡',
                    titleKm: 'អ្នកជំនាញកម្រិតខ្ពស់ (Expert Typist)',
                    titleEn: 'Expert Khmer Typist',
                    descKm: 'ល្បឿនរបស់អ្នកស្ថិតក្នុងកម្រិតការងាររដ្ឋបាល និងសារព័ត៌មានយ៉ាងស្ទាត់ជំនាញ!',
                    descEn: 'Great job! Your typing speed is fast enough for professional transcription.'
                };
            } else if (wpm >= 20) {
                return {
                    rank: 'Rank B',
                    badge: '🎯',
                    titleKm: 'កម្រិតមធ្យមសមរម្យ (Intermediate)',
                    titleEn: 'Intermediate Typist',
                    descKm: 'អ្នកអាចវាយអត្ថបទខ្មែរបានល្អ បន្តហាត់បន្ថែមទៀតដើម្បីឈានដល់កម្រិតជំនាញ!',
                    descEn: 'Solid performance. Keep practicing NiDA subscripts to boost your WPM further.'
                };
            } else {
                return {
                    rank: 'Rank C',
                    badge: '🌱',
                    titleKm: 'អ្នកទើបចាប់ផ្តើម (Beginner)',
                    titleEn: 'Beginner Typist',
                    descKm: 'កុំបារម្ភ! ការវាយអក្សរខ្មែរត្រូវការការចងចាំទីតាំងជើង (j) និងស្រៈ បន្តអនុវត្តរាល់ថ្ងៃ!',
                    descEn: 'Keep going! Practice the j + consonant subscript combinations daily.'
                };
            }
        });

        // Copy Score Card
        const copyScore = async () => {
            const text = `⌨️ Khmer Typing Speed Test Result:
🏆 Rank: ${rankData.value.rank} (${rankData.value.titleEn})
⚡ Speed: ${liveWpm.value} WPM (${liveCpm.value} CPM)
🎯 Accuracy: ${accuracy.value}%
⏱️ Duration: ${selectedDuration.value}s
Test your Khmer typing speed at: https://ngoytry-lyhuor.vercel.app/khmer-typing-test`;

            try {
                await navigator.clipboard.writeText(text);
                copiedScore.value = true;
                setTimeout(() => {
                    copiedScore.value = false;
                }, 2000);
            } catch (err) {
                console.error(err);
            }
        };

        onMounted(() => {
            loadPrompt();
        });

        onUnmounted(() => {
            if (timer) clearInterval(timer);
        });

        return {
            isKhmer,
            selectedDuration,
            difficulty,
            targetText,
            userInput,
            timeLeft,
            isActive,
            isFinished,
            showKeyboardTips,
            copiedScore,
            typingInput,
            targetChars,
            correctCount,
            errorCount,
            accuracy,
            liveCpm,
            liveWpm,
            rankData,
            inputBorderClass,
            getCharClass,
            handleInput,
            handleKeyDown,
            restartTest,
            loadNextPrompt,
            setDuration,
            setDifficulty,
            focusInput,
            copyScore
        };
    }
};
</script>
