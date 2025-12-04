<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-10">
                <h1 class="text-3xl font-bold mb-6 text-center mt-10">
                    Expense Tracker
                </h1>
                <p class="text-gray-500 dark:text-gray-400">Track your income and expenses with ease</p>
            </div>
            <div
                class="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-4 py-2.5 rounded-lg border border-amber-200 dark:border-amber-800 mb-6 text-xs flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                <div>
                    <span class="font-medium">Note:</span> Data is browser-only. <span class="font-medium">Not for
                        important records.</span>
                </div>
            </div>

            <!-- Loading indicator -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>

            <div v-else class="space-y-6">
                <!-- Balance Card -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Your Balance</h2>
                        <p class="text-4xl font-bold"
                            :class="totalBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            ${{ totalBalance.toFixed(2) }}
                        </p>
                    </div>
                    <div
                        class="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-700 bg-gray-50 dark:bg-gray-700">
                        <div class="p-4 text-center">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Income</p>
                            <p class="text-lg font-semibold text-green-600 dark:text-green-400">${{
                                totalIncome.toFixed(2) }}</p>
                        </div>
                        <div class="p-4 text-center">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
                            <p class="text-lg font-semibold text-red-600 dark:text-red-400">${{
                                Math.abs(totalExpense).toFixed(2) }}</p>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Add Transaction Form -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 class="text-xl font-semibold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                Add Transaction
                            </h2>
                        </div>
                        <div class="p-6">
                            <form @submit.prevent="addTransaction" class="space-y-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <input v-model="newTransaction.text" type="text" placeholder="e.g. Coffee" required
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 transition">
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                                    <input v-model="newTransaction.amount" type="number" step="0.01"
                                        placeholder="e.g. -20 or 100" required
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 transition">
                                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Negative for expense,
                                        positive for income</p>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select v-model="newTransaction.category"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 transition">
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <button type="submit" :disabled="submitting"
                                    class="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg v-if="submitting" xmlns="http://www.w3.org/2000/svg"
                                        class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    {{ submitting ? 'Processing...' : 'Add Transaction' }}
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Transaction History -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 class="text-xl font-semibold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fill-rule="evenodd"
                                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                        clip-rule="evenodd" />
                                </svg>
                                Transaction History
                            </h2>
                        </div>
                        <div class="divide-y divide-gray-100 dark:divide-gray-700">
                            <div v-if="transactions.length === 0" class="p-6 text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p class="mt-2">No transactions yet</p>
                            </div>
                            <div v-else class="max-h-96 overflow-y-auto">
                                <div v-for="(transaction, index) in transactions" :key="transaction.id || index"
                                    class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-350"
                                    :class="transaction.amount >= 0 ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="font-medium">{{ transaction.text }}</p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ transaction.category
                                            }} • {{ formatDate(transaction.date) }}</p>
                                        </div>
                                        <div class="flex items-center">
                                            <span class="font-semibold"
                                                :class="transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                                {{ transaction.amount >= 0 ? '+' : '' }}{{ transaction.amount.toFixed(2)
                                                }}
                                            </span>
                                            <button @click="promptDelete(index, transaction)"
                                                class="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                                                :disabled="deleting === transaction.id">
                                                <svg v-if="deleting !== transaction.id"
                                                    xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg"
                                                    class="animate-spin h-5 w-5 text-red-500" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status Message -->
            <transition name="slide-fade">
                <div v-if="statusMessage" class="fixed bottom-6 right-6 p-4 rounded-lg shadow-xl z-50 flex items-center"
                    :class="statusMessageType === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'">
                    <svg v-if="statusMessageType === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ statusMessage }}
                </div>
            </transition>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div class="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="text-lg font-semibold">Delete Transaction</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this transaction? This
                action cannot be undone.</p>
            <div class="flex justify-end space-x-3">
                <button @click="showDeleteModal = false"
                    class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Cancel
                </button>
                <button @click="confirmDelete"
                    class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center">
                    <svg v-if="deleting" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-4 w-4 mr-2"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {{ deleting === deleteCandidate?.id ? 'Deleting...' : 'Delete' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// Expense Tracker - Track income and expenses
import axios from 'axios';

export default {
    name: 'ExpenseTracker',
    data() {
        return {
            newTransaction: {
                text: '',
                amount: '',
                category: 'Food',
                date: new Date()
            },
            transactions: [],
            loading: true,
            submitting: false,
            deleting: null,
            statusMessage: '',
            statusMessageType: 'success',
            statusMessageTimeout: null,
            showDeleteModal: false,
            deleteCandidate: null,
        }
    },
    created() {
        this.fetchTransactions();
    },
    computed: {
        totalBalance() {
            return this.transactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        },
        totalIncome() {
            return this.transactions
                .filter(t => parseFloat(t.amount) > 0)
                .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        },
        totalExpense() {
            return this.transactions
                .filter(t => parseFloat(t.amount) < 0)
                .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        }
    },
    methods: {
        async fetchTransactions() {
            this.loading = true;
            this.loadFromLocalStorage();
            this.loading = false;
        },

        async addTransaction() {
            // Validate input
            if (!this.newTransaction.text || this.newTransaction.amount === '') {
                this.showStatus('Please fill in all fields', 'error');
                return;
            }

            this.submitting = true;

            // Create a new transaction object for API
            const transactionData = {
                text: this.newTransaction.text,
                amount: parseFloat(this.newTransaction.amount),
                category: this.newTransaction.category
                // Note: API will add date and ID
            };

            try {
                // Save to API first
                const response = await axios.post('/api/expenses', transactionData);

                // Get the saved transaction with server-generated ID
                const savedTransaction = response.data;

                // Add to transactions array
                this.transactions.unshift(savedTransaction);

                // Then save to local storage
                this.saveToLocalStorage();

                this.showStatus('Transaction added successfully!');
            } catch (error) {
                console.error('Error adding transaction:', error);

                // Create local version with temporary ID for local storage only
                const localTransaction = {
                    ...this.newTransaction,
                    id: 'temp_' + Date.now(),
                    amount: parseFloat(this.newTransaction.amount),
                    date: new Date().toISOString().split('T')[0]
                };

                // Save locally anyway
                this.transactions.unshift(localTransaction);
                this.saveToLocalStorage();
            } finally {
                // Reset form
                this.newTransaction = {
                    text: '',
                    amount: '',
                    category: 'Food',
                    date: new Date()
                };
                this.submitting = false;
            }
        },

        promptDelete(index, transaction) {
            this.deleteCandidate = { index, ...transaction };
            this.showDeleteModal = true;
        },

        async confirmDelete() {
            if (!this.deleteCandidate) return;

            this.deleting = this.deleteCandidate.id;
            try {
                this.transactions.splice(this.deleteCandidate.index, 1);
                this.saveToLocalStorage();
                this.showStatus('Transaction deleted');
            } catch (error) {
                this.showStatus('Failed to delete transaction', 'error');
            } finally {
                this.deleting = null;
                this.showDeleteModal = false;
                this.deleteCandidate = null;
            }
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        saveToLocalStorage() {
            localStorage.setItem('expenseTracker', JSON.stringify(this.transactions));
        },

        loadFromLocalStorage() {
            const saved = localStorage.getItem('expenseTracker');
            this.transactions = saved ? JSON.parse(saved) : [];
        },

        showStatus(message, type = 'success') {
            // Clear any existing timeout
            if (this.statusMessageTimeout) {
                clearTimeout(this.statusMessageTimeout);
            }

            // Set new message
            this.statusMessage = message;
            this.statusMessageType = type;

            // Auto-hide after 3 seconds
            this.statusMessageTimeout = setTimeout(() => {
                this.statusMessage = '';
            }, 3000);
        }
    }
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
    transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>