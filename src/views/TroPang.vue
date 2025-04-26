<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 md:py-8 mt-10">
            <!-- Header Section (desktop) -->
            <div class="text-center mb-8">
                <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {{ t('pageTitle') }}
                </h1>
                <p class="max-w-2xl mx-auto text-sm text-gray-600 dark:text-gray-300">
                    {{ t('pageSubtitle') }}
                </p>
            </div>

            <div class="flex justify-end p-4">
                <button @click="toggleLanguage"
                    class="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm">
                    {{ currentLanguage === 'kh' ? 'English' : t('khmer') }}
                </button>
            </div>

            <!-- Current Round Form -->
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ t('currentRound') }}
                        </h2>
                        <button @click="showRoundForm = !showRoundForm"
                            class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-base text-sm rounded-md transition-colors duration-300 shadow-sm">
                            {{ showRoundForm ? t('showHide')[0] : t('showHide')[1] }}
                        </button>
                    </div>

                    <div v-if="showRoundForm" class="mt-4">
                        <div class="space-y-3">
                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('purchaseAmount') }}
                                </label>
                                <input v-model.number="currentRound.purchaseAmount" type="number"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>

                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('purchasePrice') }}
                                </label>
                                <input v-model.number="currentRound.purchasePrice" type="number"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>

                            <div>
                                <button @click="startNewRound"
                                    class="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm text-sm rounded-md transition-colors duration-300 shadow-sm">
                                    {{ t('startNewRound') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales Form -->
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        {{ t('recordSales') }}
                    </h2>

                    <div class="space-y-3">
                        <!-- Customer Info -->
                        <div>
                            <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                {{ t('customerName') }}
                            </label>
                            <input v-model="sale.customerName"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('quantity') }}
                                </label>
                                <input v-model.number="sale.amount" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>
                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('pricePerKg') }}
                                </label>
                                <input v-model.number="sale.pricePerKg" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>
                        </div>

                        <div>
                            <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                {{ t('paymentStatus') }}
                            </label>
                            <select v-model="sale.paymentStatus"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                                <option value="paid">{{ t('paymentOptions')[0] }}</option>
                                <option value="pending">{{ t('paymentOptions')[1] }}</option>
                            </select>
                        </div>

                        <div>
                            <button @click="addSale"
                                class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm text-sm rounded-md transition-colors duration-300 shadow-sm">
                                {{ t('addSale') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Current Round Summary -->
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ t('currentRoundSummary') }}
                        </h2>
                        <div class="flex gap-1" v-if="activeRound">
                            <button @click.stop="editRound(activeRound)"
                                class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300">
                                {{ t('edit') }}
                            </button>
                            <button @click.stop="confirmDeleteRound(activeRound.id)"
                                class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300">
                                {{ t('delete') }}
                            </button>
                        </div>
                    </div>

                    <div v-if="activeRound" class="grid grid-cols-2 gap-3">
                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('purchaseAmount') }}</p>
                            <p class="text-sm font-bold text-gray-900 dark:text-white">
                                {{ activeRound.purchase_amount }} kg
                            </p>
                            <p class="text-base text-gray-500 dark:text-gray-400">
                                ({{ formatCurrency(activeRound.purchase_price) }} ៛)
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('totalSold') }}</p>
                            <p class="text-sm font-bold text-gray-900 dark:text-white">
                                {{ soldAmount }} kg
                            </p>
                            <p class="text-base text-gray-500 dark:text-gray-400">
                                ({{ remainingAmount }} kg {{ t('remaining') }})
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('totalRevenue') }}</p>
                            <p class="text-sm font-bold text-gray-900 dark:text-white">
                                {{ formatCurrency(totalRevenue) }} ៛
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('profit') }}</p>
                            <p class="text-sm font-bold"
                                :class="estimatedProfit >= 0 ? 'text-green-600 dark:text-green-400 text-sm' : 'text-red-600 dark:text-red-400 text-sm'">
                                {{ formatCurrency(estimatedProfit) }} ៛
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('totalCustomers') }}</p>
                            <p class="text-sm font-bold text-gray-900 dark:text-white">
                                {{ totalCustomers }} {{ t('people') }}
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-base text-gray-500 dark:text-gray-400">{{ t('totalPaidAmount') }}</p>
                            <p class="text-sm font-bold text-green-600 dark:text-green-400">
                                {{ formatCurrency(totalPaidAmount) }} ៛
                            </p>
                        </div>
                    </div>

                    <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                        {{ t('noActiveRound') }}
                    </div>
                </div>
            </div>

            <!-- Sales Records -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                        {{ t('salesList') }} ({{ filteredSales.length }})
                    </h2>
                </div>

                <!-- Empty State -->
                <div v-if="filteredSales.length === 0"
                    class="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-sm text-sm text-gray-600 dark:text-gray-400 mb-1">{{ t('noSalesRecords') }}</h3>
                        <p class="text-base text-gray-500 dark:text-gray-500">{{ t('noSalesData') }}</p>
                    </div>
                </div>

                <!-- Sales List -->
                <div v-else class="space-y-3">
                    <div v-for="(sale, index) in filteredSales" :key="index"
                        class="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div class="p-4">
                            <div class="relative">
                                <div>
                                    <h3 class="text-base font-bold text-gray-900 dark:text-white">
                                        {{ sale.customer_name }} - {{ sale.amount }}kg
                                    </h3>
                                    <p class="text-base text-gray-600 dark:text-gray-400 mt-3">
                                        <span class="text-sm">{{ t('totalPrice') }}:</span> {{
                                            formatCurrency(sale.price) }} ៛ |
                                        <span class="text-sm">{{ t('status') }}: </span>
                                        <span
                                            :class="sale.payment_status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
                                            {{ sale.payment_status === 'paid' ? t('paymentOptions')[0] :
                                                t('paymentOptions')[1] }}
                                        </span>
                                    </p>
                                </div>
                                <div class="absolute top-0 right-0 flex flex-wrap gap-1">
                                    <button @click.stop="editSale(sale)"
                                        class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300">
                                        {{ t('edit') }}
                                    </button>
                                    <button @click.stop="confirmDeleteSale(sale.id)"
                                        class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300">
                                        {{ t('delete') }}
                                    </button>
                                </div>
                            </div>

                            <div class="mt-3 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                <p class="text-base text-gray-700 dark:text-gray-300">
                                    <span class="text-sm">{{ t('round') }}:</span> {{ t('round') }} {{
                                        getRoundNumber(sale.round_id) }} |
                                    <span class="text-sm">{{ t('pricePerKg') }}:</span> {{ formatCurrency(sale.price /
                                        sale.amount) }} ៛
                                </p>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {{ t('date') }}: {{ formatDate(sale.sale_date) || t('unknownDate') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rounds Summary -->
            <div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {{ t('allRoundsSummary') }}
                </h2>

                <div v-if="rounds.length > 0" class="space-y-3">
                    <div v-for="round in rounds" :key="round.id" @click="setActiveRound(round.id)"
                        class="bg-white dark:bg-gray-800 rounded-md shadow-sm p-4 border border-gray-200 dark:border-gray-700"
                        :class="{ 'ring-1 ring-blue-500': activeRound?.id === round.id }">

                        <div class="flex justify-between items-center ">
                            <h3 class="text-base font-bold text-gray-900 dark:text-white">
                                {{ t('round') }} {{ getRoundNumber(round.id) }}
                            </h3>
                            <div class="flex gap-1 items-center">
                                {{ t('totalProfit') }}
                                <span class="text-base px-2 py-1 rounded-full"
                                    :class="getRoundProfit(round.id) >= 0 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'">
                                    {{ formatCurrency(getRoundProfit(round.id)) }} ៛
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else
                    class="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-sm text-sm text-gray-600 dark:text-gray-400 mb-1">{{ t('noRounds') }}</h3>
                        <p class="text-base text-gray-500 dark:text-gray-500">{{ t('noRoundsData') }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Modal with enhanced animation -->
        <transition name="zoom-fade">
            <div v-if="showSuccessModal" @click.self="showSuccessModal = false"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default transform transition-all">
                    <div class="text-center">
                        <div
                            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 animate-bounce">
                            <svg class="h-6 w-6 text-green-600 dark:text-green-400 animate-ping" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-3 animate-fade-in">
                            {{ t('saleSavedSuccess') }}
                        </h3>
                        <div class="mt-4">
                            <button @click="showSuccessModal = false" type="button"
                                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-all duration-300 hover:scale-105">
                                {{ t('ok') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Error Modal with enhanced animation -->
        <transition name="zoom-fade">
            <div v-if="showErrorModal" @click.self="showErrorModal = false"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                    <div class="text-center">
                        <div
                            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 animate-pulse">
                            <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-3 animate-fade-in">
                            {{ errorTitle }}
                        </h3>
                        <div class="mt-2 animate-fade-in">
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                {{ errorMessage }}
                            </p>
                        </div>
                        <div class="mt-4">
                            <button @click="showErrorModal = false" type="button"
                                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-all duration-300 hover:scale-105">
                                {{ t('ok') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Delete Confirmation Modal with enhanced animation -->
        <transition name="slide-up-fade">
            <div v-if="showDeleteModal" @click.self="showDeleteModal = false"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3 animate-fade-in">
                        {{ t('confirmDeleteSale') }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 animate-fade-in">
                        {{ t('confirmDeleteSaleMessage') }}
                    </p>
                    <div class="flex justify-end space-x-2 animate-fade-in">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            {{ t('cancel') }}
                        </button>
                        <button @click="deleteSale"
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-all duration-300 hover:scale-105">
                            {{ t('delete') }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Edit Sale Modal with enhanced animation -->
        <transition name="slide-down-fade">
            <div v-if="showEditModal" @click.self="showEditModal = false"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-5 cursor-default">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 animate-fade-in">
                        {{ t('editSale') }}
                    </h3>

                    <div class="space-y-3 animate-fade-in">
                        <div>
                            <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                {{ t('customerName') }}
                            </label>
                            <input v-model="editingSale.customer_name"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('quantity') }}
                                </label>
                                <input v-model.number="editingSale.amount" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>
                            <div>
                                <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    {{ t('pricePerKg') }}
                                </label>
                                <input v-model.number="editingSale.pricePerKg" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>
                        </div>

                        <div>
                            <label class="block text-base text-sm text-gray-700 dark:text-gray-300 mb-1">
                                {{ t('paymentStatus') }}
                            </label>
                            <select v-model="editingSale.payment_status"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                                <option value="paid">{{ t('paymentOptions')[0] }}</option>
                                <option value="pending">{{ t('paymentOptions')[1] }}</option>
                            </select>
                        </div>

                        <div class="flex justify-end space-x-2 pt-3">
                            <button @click="showEditModal = false"
                                class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-base text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                                {{ t('cancel') }}
                            </button>
                            <button @click="updateSale"
                                class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-base text-sm rounded-md transition-colors duration-300">
                                {{ t('save') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Delete Round Confirmation Modal with enhanced animation -->
        <transition name="slide-up-fade">
            <div v-if="showDeleteRoundModal" @click.self="showDeleteRoundModal = false"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3 animate-fade-in">
                        {{ t('confirmDeleteRound') }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 animate-fade-in">
                        {{ t('confirmDeleteRoundMessage') }}
                    </p>
                    <div class="flex justify-end space-x-2 animate-fade-in">
                        <button @click="showDeleteRoundModal = false"
                            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            {{ t('cancel') }}
                        </button>
                        <button @click="deleteRound"
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-all duration-300 hover:scale-105">
                            {{ t('delete') }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    <!-- Edit Round Modal with enhanced animation -->
    <transition name="slide-down-fade">
        <div v-if="showEditRoundModal" @click.self="showEditRoundModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-5 cursor-default">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 animate-fade-in">
                    {{ t('editRound') }}
                </h3>

                <div class="space-y-3 animate-fade-in">
                    <div>
                        <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            {{ t('purchaseAmount') }}
                        </label>
                        <input v-model.number="editingRound.purchase_amount" type="number"
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div>
                        <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            {{ t('purchasePrice') }}
                        </label>
                        <input v-model.number="editingRound.purchase_price" type="number"
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div class="flex justify-end space-x-2 pt-3">
                        <button @click="showEditRoundModal = false"
                            class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                            {{ t('cancel') }}
                        </button>
                        <button @click="updateRound"
                            class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors duration-300">
                            {{ t('save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import axios from 'axios';

export default {
    name: 'TropangPage',
    data() {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        return {
            showRoundForm: false,
            showSuccessModal: false,
            showErrorModal: false,
            showDeleteModal: false,
            showEditRoundModal: false,
            editingRound: null,
            currentRound: {
                purchaseAmount: 0,
                purchasePrice: 0
            },
            sale: {
                customerName: '',
                amount: 0,
                pricePerKg: 0,
                paymentStatus: 'paid'
            },
            rounds: [],
            sales: [],
            activeRoundId: null,
            saleToDelete: null,
            errorTitle: '',
            errorMessage: '',
            showDeleteRoundModal: false,
            roundToDelete: null,
            editingSale: null,
            showEditModal: false,

            currentLanguage: savedLanguage || 'kh',
            translations: {
                kh: {
                    pageTitle: "ការតាមដានការលក់ - ត្រពាំង",
                    pageSubtitle: "កំណត់ត្រាការលក់ជាជើង និងការគណនាចំណេញ",
                    khmer: "ភាសាខ្មែរ",
                    currentRound: "ជើងលក់បច្ចុប្បន្ន",
                    showHide: ["លាក់", "បង្ហាញ"],
                    purchaseAmount: "ទំនិញទិញចូល (kg)",
                    purchasePrice: "តម្លៃទិញ (៛)",
                    startNewRound: "ចាប់ផ្តើមជើងថ្មី",
                    recordSales: "កត់ត្រាការលក់",
                    customerName: "ឈ្មោះអ្នកទិញ",
                    quantity: "បរិមាណ (kg)",
                    pricePerKg: "តម្លៃក្នុង១គីឡូ (៛)",
                    paymentStatus: "ស្ថានភាពបង់ប្រាក់",
                    paymentOptions: ["បានបង់", "មិនទាន់បង"],
                    addSale: "បញ្ចូលការលក់",
                    currentRoundSummary: "សរុបជើងបច្ចុប្បន្ន",
                    edit: "កែសម្រួល",
                    delete: "លុប",
                    totalSold: "សរុបលក់ហើយ",
                    remaining: "នៅសល់",
                    totalRevenue: "សរុបប្រាក់ចំណូល",
                    profit: "ចំណេញ",
                    totalCustomers: "ចំនួនអតិថិជនសរុប",
                    totalPaidAmount: "សរុបប្រាក់ដែលបានបង់",
                    people: "នាក់",
                    noActiveRound: "មិនទាន់មានជើងលក់ដែលកំពុងដំណើរការទេ។ សូមចាប់ផ្តើមជើងថ្មី។",
                    salesList: "បញ្ជីការលក់",
                    noSalesRecords: "មិនទាន់មានកំណត់ត្រាលក់ទេ",
                    noSalesData: "គ្មានទិន្នន័យលក់ត្រូវបានកត់ត្រានៅឡើយ។",
                    totalPrice: "តម្លៃសរុប",
                    status: "ស្ថានភាព",
                    round: "ជើងលក់",
                    date: "កាលបរិច្ឆេទ",
                    unknownDate: "មិនស្គាល់កាលបរិច្ឆេទ",
                    allRoundsSummary: "សរុបជើងលក់ទាំងអស់",
                    totalProfit: "សរុបប្រាក់ចំណេញ",
                    noRounds: "មិនទាន់មានជើងលក់ទេ",
                    noRoundsData: "គ្មានទិន្នន័យជើងលក់ត្រូវបានកត់ត្រានៅឡើយ។",
                    saleSavedSuccess: "ការលក់ត្រូវបានរក្សាទុកដោយជោគជ័យ!",
                    ok: "យល់ព្រម",
                    confirmDeleteSale: "បញ្ជាក់ការលុបការលក់",
                    confirmDeleteSaleMessage: "តើអ្នកពិតជាចង់លុបការលក់នេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
                    cancel: "បោះបង់",
                    editSale: "កែសម្រួលការលក់",
                    save: "រក្សាទុក",
                    confirmDeleteRound: "បញ្ជាក់ការលុបជើងលក់",
                    confirmDeleteRoundMessage: "តើអ្នកពិតជាចង់លុបជើងលក់នេះមែនទេ? ការលក់ទាំងអស់នៅក្នុងជើងនេះក៏នឹងត្រូវលុបផងដែរ។ សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
                    editRound: "កែសម្រួលជើងលក់"
                },
                en: {
                    pageTitle: "Sales Tracking - Tropang",
                    pageSubtitle: "Foot-based sales records and profit calculation",
                    khmer: "Khmer",
                    currentRound: "Current Round",
                    showHide: ["Hide", "Show"],
                    purchaseAmount: "Purchase Amount (kg)",
                    purchasePrice: "Purchase Price (៛)",
                    startNewRound: "Start New Round",
                    recordSales: "Record Sales",
                    customerName: "Customer Name",
                    quantity: "Quantity (kg)",
                    pricePerKg: "Price per kg (៛)",
                    paymentStatus: "Payment Status",
                    paymentOptions: ["Paid", "Pending"],
                    addSale: "Add Sale",
                    currentRoundSummary: "Current Round Summary",
                    edit: "Edit",
                    delete: "Delete",
                    totalSold: "Total Sold",
                    remaining: "Remaining",
                    totalRevenue: "Total Revenue",
                    profit: "Profit",
                    totalCustomers: "Total Customers",
                    totalPaidAmount: "Total Paid Amount",
                    people: "People",
                    noActiveRound: "No active sales round yet. Please start a new round.",
                    salesList: "Sales List",
                    noSalesRecords: "No Sales Records Yet",
                    noSalesData: "No sales data has been recorded yet.",
                    totalPrice: "Total Price",
                    status: "Status",
                    round: "Round",
                    date: "Date",
                    unknownDate: "Unknown Date",
                    allRoundsSummary: "All Rounds Summary",
                    totalProfit: "Total Profit",
                    noRounds: "No Rounds Yet",
                    noRoundsData: "No round data has been recorded yet.",
                    saleSavedSuccess: "Sale saved successfully!",
                    ok: "OK",
                    confirmDeleteSale: "Confirm Sale Deletion",
                    confirmDeleteSaleMessage: "Are you sure you want to delete this sale? This action cannot be undone.",
                    cancel: "Cancel",
                    editSale: "Edit Sale",
                    save: "Save",
                    confirmDeleteRound: "Confirm Round Deletion",
                    confirmDeleteRoundMessage: "Are you sure you want to delete this round? All sales in this round will also be deleted. This action cannot be undone.",
                    editRound: "Edit Round"
                }
            }
        };
    },
    computed: {
        activeRound() {
            return this.rounds.find(round => round.id === this.activeRoundId);
        },
        filteredSales() {
            return this.sales.filter(sale => sale.round_id === this.activeRoundId);
        },
        soldAmount() {
            return this.filteredSales.reduce((sum, sale) => sum + Number(sale.amount), 0);
        },
        remainingAmount() {
            if (!this.activeRound) return 0;
            return Number(this.activeRound.purchase_amount) - this.soldAmount;
        },
        totalRevenue() {
            return this.filteredSales.reduce((sum, sale) => sum + Number(sale.price), 0);
        },
        estimatedProfit() {
            if (!this.activeRound) return 0;
            return this.totalRevenue - Number(this.activeRound.purchase_price);
        },
        totalCustomers() {
            return this.filteredSales.length;
        },

        totalPaidAmount() {
            return this.filteredSales
                .filter(sale => sale.payment_status === 'paid')
                .reduce((sum, sale) => sum + Number(sale.price), 0);
        }
    },
    created() {
        // Load language preference from local storage if it wasn't set in data()
        if (!this.currentLanguage) {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                this.currentLanguage = savedLanguage;
            }
        }
        this.loadData();
    },
    methods: {
        toggleLanguage() {
            this.currentLanguage = this.currentLanguage === 'kh' ? 'en' : 'kh';
            // Save the selected language to local storage
            localStorage.setItem('selectedLanguage', this.currentLanguage);
        },
        t(key) {
            return this.translations[this.currentLanguage][key] || key;
        },

        showError(title, message) {
            this.errorTitle = title;
            this.errorMessage = message;
            this.showErrorModal = true;

        },
        async startNewRound() {
            if (!this.currentRound.purchaseAmount || !this.currentRound.purchasePrice) {
                this.showError('ព័ត៌មានមិនគ្រប់គ្រាន់', 'សូមបំពេញព័ត៌មានជើងលក់ជាមុនសិន!');
                return;
            }

            try {
                const response = await axios.post('/api/rounds', {
                    purchase_amount: Number(this.currentRound.purchaseAmount),
                    purchase_price: Number(this.currentRound.purchasePrice)
                });

                // Activate the new round
                await axios.post(`/api/rounds/${response.data.id}/activate`);

                // Reload data
                await this.loadData();

                // Reset form and show success
                this.showRoundForm = false;
                this.currentRound.purchaseAmount = 0;
                this.currentRound.purchasePrice = 0;
                this.showSuccessModal = true;
            } catch (error) {
                console.error('Error starting new round:', error);
                this.showError('កំហុស', 'មិនអាចចាប់ផ្តើមជើងថ្មីបានទេ។');
            }
        },
        confirmDeleteRound(roundId) {
            this.roundToDelete = roundId;
            this.showDeleteRoundModal = true;
        },
        async deleteRound() {
            if (!this.roundToDelete) return;

            try {
                // Delete the round
                await axios.delete(`/api/rounds/${this.roundToDelete}`);

                // Reload data
                await this.loadData();

                // If the deleted round was the active one, set active to another one if available
                if (this.roundToDelete === this.activeRoundId) {
                    if (this.rounds.length > 0) {
                        this.activeRoundId = this.rounds[0].id;
                    } else {
                        this.activeRoundId = null;
                    }
                }

                this.showDeleteRoundModal = false;
                this.roundToDelete = null;
            } catch (error) {
                console.error('Error deleting round:', error);
                this.showError('កំហុស', 'មិនអាចលុបជើងលក់បានទេ។');
                this.showDeleteRoundModal = false;
            }
        },
        async addSale() {
            if (!this.activeRoundId) {
                this.showError('ជើងលក់មិនត្រូវបានជ្រើសរើស', 'សូមចាប់ផ្តើមជើងលក់ជាមុនសិន!');
                return;
            }

            if (!this.sale.customerName || Number(this.sale.amount) <= 0 || Number(this.sale.pricePerKg) <= 0) {
                this.showError('ព័ត៌មានមិនគ្រប់គ្រាន់', 'សូមបំពេញព័ត៌មានការលក់ជាមុនសិន!');
                return;
            }

            const saleAmount = Number(this.sale.amount);
            if (saleAmount > this.remainingAmount) {
                this.showError('បរិមាណលើស', `មានតែ ${this.remainingAmount}kg នៅសល់ក្នុងជើងនេះ!`);
                return;
            }

            try {
                await axios.post('/api/sales', {
                    round_id: this.activeRoundId,
                    customer_name: this.sale.customerName,
                    amount: Number(this.sale.amount),
                    price: Number(this.sale.pricePerKg) * Number(this.sale.amount), // Calculate total price
                    payment_status: this.sale.paymentStatus
                });

                // Reload data and reset form
                await this.loadData();

                this.showSuccessModal = true;
                this.sale.customerName = '';
                this.sale.amount = 0;
                this.sale.pricePerKg = 0;
                this.sale.paymentStatus = 'paid';
            } catch (error) {
                console.error('Error adding sale:', error);
                this.showError('កំហុស', 'មិនអាចបញ្ចូលការលក់បានទេ។');
            }
        },
        // Add or update these methods for round editing
        editRound(round) {
            // Create a copy of the round to edit
            this.editingRound = {
                id: round.id,
                purchase_amount: round.purchase_amount,
                purchase_price: round.purchase_price
            };
            this.showEditRoundModal = true;
        },

        async updateRound() {
            if (!this.editingRound.purchase_amount || !this.editingRound.purchase_price) {
                this.showError('ព័ត៌មានមិនគ្រប់គ្រាន់', 'សូមបំពេញព័ត៌មានជើងលក់ជាមុនសិន!');
                return;
            }

            try {
                await axios.put(`/api/rounds/${this.editingRound.id}`, {
                    purchase_amount: Number(this.editingRound.purchase_amount),
                    purchase_price: Number(this.editingRound.purchase_price)
                });

                // Reload data
                await this.loadData();

                this.showEditRoundModal = false;
                this.editingRound = null;

                this.showSuccessModal = true;
            } catch (error) {
                console.error('Error updating round:', error);
                this.showError('កំហុស', 'មិនអាចកែសម្រួលជើងលក់បានទេ។');
            }
        },
        confirmDeleteSale(saleId) {
            this.saleToDelete = saleId;
            this.showDeleteModal = true;
        },
        editSale(sale) {
            console.log(sale);

            // Create a copy of the sale to edit
            this.editingSale = {
                id: sale.id,
                customer_name: sale.customer_name,
                amount: sale.amount,
                pricePerKg: sale.amount > 0 ? (sale.price / sale.amount) : 0, // Calculate price per kg
                payment_status: sale.payment_status,
                round_id: sale.round_id
            };
            this.showEditModal = true;
        },

        async updateSale() {

            console.log(this.editingSale);

            if (!this.editingSale.customer_name || Number(this.editingSale.amount) <= 0 || Number(this.editingSale.price) <= 0) {
                this.showError('ព័ត៌មានមិនគ្រប់គ្រាន់', 'សូមបំពេញព័ត៌មានការលក់ជាមុនសិន!');
                return;
            }

            try {
                await axios.put(`/api/sales/${this.editingSale.id}`, {
                    customer_name: this.editingSale.customer_name,
                    amount: Number(this.editingSale.amount),
                    price: Number(this.editingSale.pricePerKg) * Number(this.editingSale.amount),
                    payment_status: this.editingSale.payment_status
                });

                // Reload data
                await this.loadData();

                this.showEditModal = false;
                this.editingSale = null;

                this.showSuccessModal = true;
            } catch (error) {
                console.error('Error updating sale:', error);
                this.showError('កំហុស', 'មិនអាចកែសម្រួលការលក់បានទេ។');
            }
        },
        async deleteSale() {
            if (!this.saleToDelete) return;

            try {
                await axios.delete(`/api/sales/${this.saleToDelete}`);

                // Reload data
                await this.loadData();

                this.showDeleteModal = false;
                this.saleToDelete = null;
            } catch (error) {
                console.error('Error deleting sale:', error);
                this.showError('កំហុស', 'មិនអាចលុបការលក់បានទេ។');
                this.showDeleteModal = false;
            }
        },
        setActiveRound(roundId) {
            this.activeRoundId = roundId;
        },
        getRoundNumber(roundId) {
            const index = this.rounds.findIndex(round => round.id === roundId);
            return this.rounds.length - index;
        },
        getSoldAmount(roundId) {
            return this.sales
                .filter(sale => sale.round_id === roundId)
                .reduce((sum, sale) => sum + Number(sale.amount), 0);
        },
        getRoundRevenue(roundId) {
            return this.sales
                .filter(sale => sale.round_id === roundId)
                .reduce((sum, sale) => sum + Number(sale.price), 0);
        },
        getRoundProfit(roundId) {
            const round = this.rounds.find(r => r.id === roundId);
            if (!round) return 0;
            return this.getRoundRevenue(roundId) - Number(round.purchase_price);
        },
        formatCurrency(value) {
            // Ensure value is a number before formatting
            const numValue = Number(value);
            return isNaN(numValue) ? '0' : new Intl.NumberFormat('km-KH').format(Math.round(numValue));
        },
        formatDate(dateString) {
            if (!dateString) return 'មិនស្គាល់កាលបរិច្ឆេទ';

            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return 'កាលបរិច្ឆេទមិនត្រឹមត្រូវ';

                // Khmer month names
                const months = [
                    'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
                    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
                ];

                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'ល្ងាច' : 'ព្រឹក';

                // Convert to 12-hour format
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'

                return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
            } catch (error) {
                console.error('Error formatting date:', error);
                return dateString;
            }
        },
        async loadData() {
            try {
                // Load active round
                const activeRoundResponse = await axios.get('/api/current-round');
                
                if (activeRoundResponse.data) {
                    this.activeRoundId = activeRoundResponse.data.id;
                }

                // Load all rounds
                const roundsResponse = await axios.get('/api/rounds');
                this.rounds = roundsResponse.data;

                // Process sales data - get from rounds if nested
                let salesData = [];

                // Check if rounds contain nested sales data
                if (this.rounds.length > 0 && this.rounds[0].sales) {
                    // Extract sales from nested structure in rounds
                    this.rounds.forEach(round => {
                        if (Array.isArray(round.sales)) {
                            salesData = [...salesData, ...round.sales];
                        }
                    });
                } else {
                    // Fall back to separate sales API endpoint
                    const salesResponse = await axios.get('/api/sales');
                    salesData = salesResponse.data;
                }

                this.sales = salesData;

                // If no active round but we have rounds, set the most recent one as active
                if (!this.activeRoundId && this.rounds.length > 0) {
                    this.activeRoundId = this.rounds[0].id;
                }
            } catch (error) {
                console.error('Error loading data:', error);
                this.showError('កំហុស', 'មិនអាចទាញយកទិន្នន័យបានទេ។');
            }
        }
    }
};
</script>

<style scoped>
/* Custom styles if needed */
/* Animation styles */
.zoom-fade-enter-active,
.zoom-fade-leave-active {
    transition: all 0.3s ease;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.zoom-fade-enter-to,
.zoom-fade-leave-from {
    opacity: 1;
    transform: scale(1);
}

.shake-fade-enter-active {
    animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
}

.shake-fade-leave-active {
    transition: opacity 0.3s ease;
}

.shake-fade-enter-from,
.shake-fade-leave-to {
    opacity: 0;
}

.shake-fade-enter-to,
.shake-fade-leave-from {
    opacity: 1;
}

.slide-up-fade-enter-active,
.slide-up-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-up-fade-enter-from,
.slide-up-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.slide-up-fade-enter-to,
.slide-up-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.slide-down-fade-enter-active,
.slide-down-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-down-fade-enter-from,
.slide-down-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.slide-down-fade-enter-to,
.slide-down-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}

.animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes ping {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    75%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>