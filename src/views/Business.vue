<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    ការតាមដានការលក់
                </h1>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    កំណត់ត្រាការលក់ជាវគ្គ និងការគណនាចំណេញ
                </p>
            </div>

            <!-- Current Round Form -->
            <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-12 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    វគ្គលក់បច្ចុប្បន្ន
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <!-- Purchase Info -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ទំនិញទិញចូល (kg)
                        </label>
                        <input v-model.number="currentRound.purchaseAmount" type="number" placeholder="20"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            តម្លៃទិញ (៛)
                        </label>
                        <input v-model.number="currentRound.purchasePrice" type="number" placeholder="200000"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            តម្លៃលក់ (៛/kg)
                        </label>
                        <input v-model.number="currentRound.sellPricePerKg" type="number" placeholder="17250"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div class="flex items-end">
                        <button @click="startNewRound"
                            class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-sm">
                            ចាប់ផ្តើមវគ្គថ្មី
                        </button>
                    </div>
                </div>
            </div>

            <!-- Sales Form -->
            <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-12 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    កត់ត្រាការលក់
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <!-- Customer Info -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ឈ្មោះអ្នកទិញ
                        </label>
                        <input v-model="sale.customerName" placeholder=""
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            បរិមាណ (kg)
                        </label>
                        <input v-model.number="sale.amount" type="number" placeholder="5"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ស្ថានភាពបង់ប្រាក់
                        </label>
                        <select v-model="sale.paymentStatus"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300">
                            <option value="paid">បានបង់</option>
                            <option value="pending">មិនទាន់បង</option>
                        </select>
                    </div>

                    <div class="flex items-end">
                        <button @click="addSale"
                            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-sm">
                            បញ្ចូលការលក់
                        </button>
                    </div>
                </div>
            </div>

            <!-- Current Round Summary -->
            <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-12 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    សរុបវគ្គបច្ចុប្បន្ន
                </h2>

                <div v-if="activeRound" class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="text-sm text-gray-500 dark:text-gray-400">ទំនិញទិញចូល</p>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ activeRound.purchaseAmount }} kg
                        </p>
                    </div>

                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="text-sm text-gray-500 dark:text-gray-400">សរុបលក់ហើយ</p>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ soldAmount }} kg ({{ remainingAmount }} kg នៅសល់)
                        </p>
                    </div>

                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="text-sm text-gray-500 dark:text-gray-400">សរុបប្រាក់ចំណូល</p>
                        <p class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ formatCurrency(totalRevenue) }} ៛
                        </p>
                    </div>

                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="text-sm text-gray-500 dark:text-gray-400">ចំណេញប៉ាន់ស្មាន</p>
                        <p class="text-xl font-bold"
                            :class="estimatedProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            {{ formatCurrency(estimatedProfit) }} ៛
                        </p>
                    </div>
                </div>

                <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
                    មិនទាន់មានវគ្គលក់ដែលកំពុងដំណើរការទេ។ សូមចាប់ផ្តើមវគ្គថ្មី។
                </div>
            </div>

            <!-- Sales Records -->
            <div class="mb-12">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        បញ្ជីការលក់ ({{ filteredSales.length }})
                    </h2>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        ទិន្នន័យត្រូវបានរក្សាទុកក្នុងឧបករណ៍របស់អ្នក
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredSales.length === 0"
                    class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">មិនទាន់មានកំណត់ត្រាលក់ទេ
                        </h3>
                        <p class="text-gray-500 dark:text-gray-500">គ្មានទិន្នន័យលក់ត្រូវបានកត់ត្រានៅឡើយ។</p>
                    </div>
                </div>

                <!-- Sales List -->
                <div v-else class="space-y-4">
                    <div v-for="(sale, index) in filteredSales" :key="index"
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div class="p-6">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                                        {{ sale.customerName }} - {{ sale.amount }}kg
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <span class="font-medium">តម្លៃសរុប:</span> {{ formatCurrency(sale.amount *
                                        activeRound.sellPricePerKg) }} ៛ |
                                        <span class="font-medium">ស្ថានភាព:</span>
                                        <span
                                            :class="sale.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
                                            {{ sale.paymentStatus === 'paid' ? 'បានបង់' : 'មិនទាន់បង' }}
                                        </span>
                                    </p>
                                </div>
                                <div class="flex gap-2">
                                    <button @click="confirmDeleteSale(sale.id)"
                                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300">
                                        លុប
                                    </button>
                                </div>
                            </div>

                            <div class="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    <span class="font-medium">វគ្គលក់:</span> ទី{{ getRoundNumber(sale.roundId) }} |
                                    <span class="font-medium">តម្លៃ/kg:</span> {{
                                    formatCurrency(activeRound.sellPricePerKg) }} ៛
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    កាលបរិច្ឆេទ: {{ formatDate(sale.date) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rounds Summary -->
            <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    សរុបវគ្គលក់ទាំងអស់
                </h2>

                <div v-if="rounds.length > 0"
                    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-gray-600 rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    វគ្គលក់
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ទំនិញទិញចូល
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    សរុបលក់
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ចំណូល
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ចំណេញ
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr v-for="round in rounds" :key="round.id" @click="setActiveRound(round.id)"
                                :class="{ 'bg-blue-50 dark:bg-gray-700 cursor-pointer': activeRound?.id === round.id, 'cursor-pointer': true }">
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    ទី{{ getRoundNumber(round.id) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {{ round.purchaseAmount }} kg ({{ formatCurrency(round.purchasePrice) }} ៛)
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {{ getSoldAmount(round.id) }} kg
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {{ formatCurrency(getRoundRevenue(round.id)) }} ៛
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                    :class="getRoundProfit(round.id) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                    {{ formatCurrency(getRoundProfit(round.id)) }} ៛
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else
                    class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">មិនទាន់មានវគ្គលក់ទេ</h3>
                        <p class="text-gray-500 dark:text-gray-500">គ្មានទិន្នន័យវគ្គលក់ត្រូវបានកត់ត្រានៅឡើយ។</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    បញ្ជាក់ការលុបការលក់
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6">
                    តើអ្នកពិតជាចង់លុបការលក់នេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
                </p>
                <div class="flex justify-end space-x-3">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                        បោះបង់
                    </button>
                    <button @click="deleteSale"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm transition-colors duration-300">
                        លុប
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BusinessPage',
    data() {
        return {
            currentRound: {
                purchaseAmount: 0,
                purchasePrice: 0,
                sellPricePerKg: 0
            },
            sale: {
                customerName: '',
                amount: 0,
                paymentStatus: ''
            },
            rounds: [],
            sales: [],
            activeRoundId: null,
            showDeleteModal: false,
            saleToDelete: null
        };
    },
    computed: {
        activeRound() {
            return this.rounds.find(round => round.id === this.activeRoundId);
        },
        filteredSales() {
            return this.sales.filter(sale => sale.roundId === this.activeRoundId);
        },
        soldAmount() {
            return this.filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
        },
        remainingAmount() {
            return this.activeRound ? this.activeRound.purchaseAmount - this.soldAmount : 0;
        },
        totalRevenue() {
            return this.filteredSales.reduce((sum, sale) => sum + (sale.amount * this.activeRound.sellPricePerKg), 0);
        },
        estimatedProfit() {
            if (!this.activeRound) return 0;
            return this.totalRevenue - this.activeRound.purchasePrice;
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        startNewRound() {
            if (!this.currentRound.purchaseAmount || !this.currentRound.purchasePrice || !this.currentRound.sellPricePerKg) {
                alert('សូមបំពេញព័ត៌មានវគ្គលក់ជាមុនសិន!');
                return;
            }

            const newRound = {
                id: uuidv4(),
                ...this.currentRound,
                startDate: new Date().toISOString()
            };

            this.rounds.unshift(newRound);
            this.activeRoundId = newRound.id;
            this.saveData();
        },
        addSale() {
            if (!this.activeRoundId) {
                alert('សូមចាប់ផ្តើមវគ្គលក់ជាមុនសិន!');
                return;
            }

            if (!this.sale.customerName || !this.sale.amount) {
                alert('សូមបំពេញព័ត៌មានការលក់ជាមុនសិន!');
                return;
            }

            if (this.sale.amount > this.remainingAmount) {
                alert(`មានតែ ${this.remainingAmount}kg នៅសល់ក្នុងវគ្គនេះ!`);
                return;
            }

            const newSale = {
                id: uuidv4(),
                roundId: this.activeRoundId,
                customerName: this.sale.customerName,
                amount: this.sale.amount,
                paymentStatus: this.sale.paymentStatus,
                date: new Date().toISOString()
            };

            this.sales.unshift(newSale);
            this.saveData();
        },
        confirmDeleteSale(saleId) {
            this.saleToDelete = saleId;
            this.showDeleteModal = true;
        },
        deleteSale() {
            const index = this.sales.findIndex(sale => sale.id === this.saleToDelete);
            if (index !== -1) {
                this.sales.splice(index, 1);
                this.saveData();
            }
            this.showDeleteModal = false;
            this.saleToDelete = null;
        },
        setActiveRound(roundId) {
            this.activeRoundId = roundId;
        },
        getRoundNumber(roundId) {
            const index = this.rounds.findIndex(round => round.id === roundId);
            return this.rounds.length - index;
        },
        getSoldAmount(roundId) {
            return this.sales.filter(sale => sale.roundId === roundId)
                .reduce((sum, sale) => sum + sale.amount, 0);
        },
        getRoundRevenue(roundId) {
            const round = this.rounds.find(r => r.id === roundId);
            if (!round) return 0;

            return this.sales.filter(sale => sale.roundId === roundId)
                .reduce((sum, sale) => sum + (sale.amount * round.sellPricePerKg), 0);
        },
        getRoundProfit(roundId) {
            const round = this.rounds.find(r => r.id === roundId);
            if (!round) return 0;

            return this.getRoundRevenue(roundId) - round.purchasePrice;
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('km-KH').format(value);
        },
        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('km-KH', options);
        },
        saveData() {
            localStorage.setItem('businessRounds', JSON.stringify(this.rounds));
            localStorage.setItem('businessSales', JSON.stringify(this.sales));
            localStorage.setItem('activeRoundId', this.activeRoundId);
        },
        loadData() {
            const savedRounds = localStorage.getItem('businessRounds');
            const savedSales = localStorage.getItem('businessSales');
            const savedActiveRoundId = localStorage.getItem('activeRoundId');

            if (savedRounds) this.rounds = JSON.parse(savedRounds);
            if (savedSales) this.sales = JSON.parse(savedSales);
            if (savedActiveRoundId) this.activeRoundId = savedActiveRoundId;

            // If no active round but we have rounds, set the first one as active
            if (!this.activeRoundId && this.rounds.length > 0) {
                this.activeRoundId = this.rounds[0].id;
            }
        }
    }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>