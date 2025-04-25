<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="md:hidden sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm p-4 border-b border-gray-200 dark:border-gray-700 mt-10">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                ការតាមដានការលក់ - ត្រពាំង
            </h1>
        </div>

        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 md:py-8 mt-10">
            <!-- Header Section (desktop) -->
            <div class="hidden md:block text-center mb-8">
                <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                    ការតាមដានការលក់ - ត្រពាំង
                </h1>
                <p class="max-w-2xl mx-auto text-md text-gray-600 dark:text-gray-300">
                    កំណត់ត្រាការលក់ជាជើង និងការគណនាចំណេញ
                </p>
            </div>

            <!-- Current Round Form -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                            ជើងលក់បច្ចុប្បន្ន
                        </h2>
                        <button @click="showRoundForm = !showRoundForm"
                            class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-300 shadow-sm">
                            {{ showRoundForm ? 'លាក់' : 'បង្ហាញ' }}
                        </button>
                    </div>

                    <div v-if="showRoundForm" class="mt-4">
                        <div class="space-y-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    ទំនិញទិញចូល (kg)
                                </label>
                                <input v-model.number="currentRound.purchaseAmount" type="number" 
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    តម្លៃទិញ (៛)
                                </label>
                                <input v-model.number="currentRound.purchasePrice" type="number" 
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>

                            <div>
                                <button @click="startNewRound"
                                    class="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-300 shadow-sm">
                                    ចាប់ផ្តើមជើងថ្មី
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales Form -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        កត់ត្រាការលក់
                    </h2>

                    <div class="space-y-3">
                        <!-- Customer Info -->
                        <div>
                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                ឈ្មោះអ្នកទិញ
                            </label>
                            <input v-model="sale.customerName" 
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    បរិមាណ (kg)
                                </label>
                                <input v-model.number="sale.amount" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>

                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    តម្លៃ (៛)
                                </label>
                                <input v-model.number="sale.price" type="number" placeholder="0"
                                    class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                ស្ថានភាពបង់ប្រាក់
                            </label>
                            <select v-model="sale.paymentStatus"
                                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                                <option value="paid">បានបង់</option>
                                <option value="pending">មិនទាន់បង</option>
                            </select>
                        </div>

                        <div>
                            <button @click="addSale"
                                class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300 shadow-sm">
                                បញ្ចូលការលក់
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Current Round Summary -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        សរុបជើងបច្ចុប្បន្ន
                    </h2>

                    <div v-if="activeRound" class="grid grid-cols-2 gap-3">
                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-xs text-gray-500 dark:text-gray-400">ទំនិញទិញចូល</p>
                            <p class="text-md font-bold text-gray-900 dark:text-white">
                                {{ activeRound.purchase_amount }} kg
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-xs text-gray-500 dark:text-gray-400">សរុបលក់ហើយ</p>
                            <p class="text-md font-bold text-gray-900 dark:text-white">
                                {{ soldAmount }} kg
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                ({{ remainingAmount }} kg នៅសល់)
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-xs text-gray-500 dark:text-gray-400">សរុបប្រាក់ចំណូល</p>
                            <p class="text-md font-bold text-gray-900 dark:text-white">
                                {{ formatCurrency(totalRevenue) }} ៛
                            </p>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <p class="text-xs text-gray-500 dark:text-gray-400">ចំណេញប៉ាន់ស្មាន</p>
                            <p class="text-md font-bold"
                                :class="estimatedProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                {{ formatCurrency(estimatedProfit) }} ៛
                            </p>
                        </div>
                    </div>

                    <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                        មិនទាន់មានជើងលក់ដែលកំពុងដំណើរការទេ។ សូមចាប់ផ្តើមជើងថ្មី។
                    </div>
                </div>
            </div>

            <!-- Sales Records -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                        បញ្ជីការលក់ ({{ filteredSales.length }})
                    </h2>
                </div>

                <!-- Empty State -->
                <div v-if="filteredSales.length === 0"
                    class="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-md font-medium text-gray-600 dark:text-gray-400 mb-1">មិនទាន់មានកំណត់ត្រាលក់ទេ</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-500">គ្មានទិន្នន័យលក់ត្រូវបានកត់ត្រានៅឡើយ។</p>
                    </div>
                </div>

                <!-- Sales List -->
                <div v-else class="space-y-3">
                    <div v-for="(sale, index) in filteredSales" :key="index"
                        class="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div class="p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-md font-bold text-gray-900 dark:text-white">
                                        {{ sale.customer_name }} - {{ sale.amount }}kg
                                    </h3>
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        <span class="font-medium">តម្លៃសរុប:</span> {{ formatCurrency(sale.price) }} ៛ |
                                        <span class="font-medium">ស្ថានភាព: </span>
                                        <span
                                            :class="sale.payment_status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
                                            {{ sale.payment_status === 'paid' ? 'បានបង់' : 'មិនទាន់បង' }}
                                        </span>
                                    </p>
                                </div>
                                <div class="flex gap-1">
                                    <button @click.stop="confirmDeleteSale(sale.id)"
                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300">
                                        លុប
                                    </button>
                                </div>
                            </div>

                            <div class="mt-3 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                <p class="text-xs text-gray-700 dark:text-gray-300">
                                    <span class="font-medium">ជើងលក់:</span> ទី{{ getRoundNumber(sale.round_id) }} |
                                    <span class="font-medium">តម្លៃ/kg:</span> {{
                                        formatCurrency(sale.price / sale.amount) }} ៛
                                </p>
                                <p class="text-2xs text-gray-500 dark:text-gray-400 mt-1">
                                    កាលបរិច្ឆេទ: {{ formatDate(sale.sale_date) || 'មិនស្គាល់កាលបរិច្ឆេទ' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rounds Summary -->
            <div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    សរុបជើងលក់ទាំងអស់
                </h2>

                <div v-if="rounds.length > 0" class="space-y-3">
                    <div v-for="round in rounds" :key="round.id" @click="setActiveRound(round.id)"
                        class="bg-white dark:bg-gray-800 rounded-md shadow-sm p-4 border border-gray-200 dark:border-gray-700"
                        :class="{ 'ring-1 ring-blue-500': activeRound?.id === round.id }">

                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-md font-bold text-gray-900 dark:text-white">
                                ទី{{ getRoundNumber(round.id) }}
                            </h3>
                            <div class="flex gap-1 items-center">
                                <span class="text-xs px-2 py-1 rounded-full"
                                    :class="getRoundProfit(round.id) >= 0 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'">
                                    {{ formatCurrency(getRoundProfit(round.id)) }} ៛
                                </span>
                                <button @click.stop="confirmDeleteRound(round.id)"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300">
                                    លុប
                                </button>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">ទិញចូល</p>
                                <p class="text-gray-900 dark:text-white">
                                    {{ round.purchase_amount }} kg
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    {{ formatCurrency(round.purchase_price) }} ៛
                                </p>
                            </div>

                            <div>
                                <p class="text-gray-500 dark:text-gray-400">សរុបលក់</p>
                                <p class="text-gray-900 dark:text-white">
                                    {{ getSoldAmount(round.id) }} kg
                                </p>
                            </div>

                            <div>
                                <p class="text-gray-500 dark:text-gray-400">ចំណូល</p>
                                <p class="text-gray-900 dark:text-white">
                                    {{ formatCurrency(getRoundRevenue(round.id)) }} ៛
                                </p>
                            </div>

                            <div>
                                <p class="text-gray-500 dark:text-gray-400">ស្ថានភាព</p>
                                <p class="text-gray-900 dark:text-white">
                                    {{ Math.round((getSoldAmount(round.id) / round.purchase_amount) * 100) }}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else
                    class="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-md font-medium text-gray-600 dark:text-gray-400 mb-1">មិនទាន់មានជើងលក់ទេ</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-500">គ្មានទិន្នន័យជើងលក់ត្រូវបានកត់ត្រានៅឡើយ។</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" @click.self="showSuccessModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                <div class="text-center">
                    <div
                        class="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900">
                        <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-md font-medium text-gray-900 dark:text-white mt-3">
                        ការលក់ត្រូវបានរក្សាទុកដោយជោគជ័យ!
                    </h3>
                    <div class="mt-4">
                        <button @click="showSuccessModal = false" type="button"
                            class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300">
                            យល់ព្រម
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Modal -->
        <div v-if="showErrorModal" @click.self="showErrorModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100 dark:bg-red-900">
                        <svg class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-md font-medium text-gray-900 dark:text-white mt-3">
                        {{ errorTitle }}
                    </h3>
                    <div class="mt-2">
                        <p class="text-xs text-gray-600 dark:text-gray-300">
                            {{ errorMessage }}
                        </p>
                    </div>
                    <div class="mt-4">
                        <button @click="showErrorModal = false" type="button"
                            class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300">
                            យល់ព្រម
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" @click.self="showDeleteModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                <h3 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                    បញ្ជាក់ការលុបការលក់
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-300 mb-4">
                    តើអ្នកពិតជាចង់លុបការលក់នេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
                </p>
                <div class="flex justify-end space-x-2">
                    <button @click="showDeleteModal = false"
                        class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                        បោះបង់
                    </button>
                    <button @click="deleteSale"
                        class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors duration-300">
                        លុប
                    </button>
                </div>
            </div>
        </div>

        <!-- Delete Round Confirmation Modal -->
        <div v-if="showDeleteRoundModal" @click.self="showDeleteRoundModal = false"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 cursor-pointer">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full p-5 cursor-default">
                <h3 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                    បញ្ជាក់ការលុបជើងលក់
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-300 mb-4">
                    តើអ្នកពិតជាចង់លុបជើងលក់នេះមែនទេ? ការលក់ទាំងអស់នៅក្នុងជើងនេះក៏នឹងត្រូវលុបផងដែរ។
                    សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
                </p>
                <div class="flex justify-end space-x-2">
                    <button @click="showDeleteRoundModal = false"
                        class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                        បោះបង់
                    </button>
                    <button @click="deleteRound"
                        class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors duration-300">
                        លុប
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'TropangPage',
    data() {
        return {
            showRoundForm: false,
            showSuccessModal: false,
            showErrorModal: false,
            showDeleteModal: false,
            currentRound: {
                purchaseAmount: 0,
                purchasePrice: 0
            },
            sale: {
                customerName: '',
                amount: 0,
                price: 0,
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
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        showError(title, message) {
            this.errorTitle = title;
            this.errorMessage = message;
            this.showErrorModal = true;

            // Auto-close after 1.5 seconds
            setTimeout(() => {
                this.showErrorModal = false;
            }, 3000);
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
                setTimeout(() => {
                    this.showSuccessModal = false;
                }, 3000);
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

            if (!this.sale.customerName || Number(this.sale.amount) <= 0 || Number(this.sale.price) <= 0) {
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
                    price: Number(this.sale.price),
                    payment_status: this.sale.paymentStatus
                });

                // Reload data and reset form
                await this.loadData();

                this.showSuccessModal = true;
                setTimeout(() => {
                    this.showSuccessModal = false;
                }, 3000);
                this.sale.customerName = '';
                this.sale.amount = 0;
                this.sale.price = 0;
                this.sale.paymentStatus = 'paid';
            } catch (error) {
                console.error('Error adding sale:', error);
                this.showError('កំហុស', 'មិនអាចបញ្ចូលការលក់បានទេ។');
            }
        },
        confirmDeleteSale(saleId) {
            this.saleToDelete = saleId;
            this.showDeleteModal = true;
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
</style>