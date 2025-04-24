<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    ការគ្រប់គ្រងអាជីវកម្ម
                </h1>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    កំណត់ត្រានៃការលក់ផលិតផល និងសេវាកម្ម
                </p>
            </div>

            <!-- Sales Form -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-16 border border-gray-200 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Sale Info -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ព័ត៌មានលក់
                        </label>
                        <input 
                            v-model="saleInfo" 
                            placeholder="First sell have 20kg"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                    </div>

                    <!-- Buyer Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ឈ្មោះអ្នកទិញ
                        </label>
                        <input 
                            v-model="buyerName" 
                            placeholder="Dara"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                    </div>

                    <!-- Price -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            តម្លៃ (៛)
                        </label>
                        <input 
                            v-model="price" 
                            placeholder="25000 ៛"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                    </div>
                </div>

                <div class="mt-6 flex justify-end">
                    <button 
                        @click="addSale"
                        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-sm"
                    >
                        បញ្ចូលកំណត់ត្រា
                    </button>
                </div>
            </div>

            <!-- Sales Records -->
            <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    បញ្ជីកំណត់ត្រាលក់
                </h2>

                <!-- Empty State -->
                <div v-if="sales.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="mx-auto max-w-md">
                        <div class="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">មិនទាន់មានកំណត់ត្រាលក់ទេ</h3>
                        <p class="text-gray-500 dark:text-gray-500">គ្មានទិន្នន័យលក់ត្រូវបានកត់ត្រានៅឡើយ។</p>
                    </div>
                </div>

                <!-- Sales List -->
                <div v-else class="space-y-4">
                    <div v-for="(sale, index) in sales" :key="index" 
                         class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div class="p-6">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                                        {{ sale.info }}
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <span class="font-medium">អ្នកទិញ:</span> {{ sale.buyer }} | 
                                        <span class="font-medium">តម្លៃ:</span> {{ sale.price }}
                                    </p>
                                </div>
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                    លក់ដាច់
                                </span>
                            </div>

                            <div class="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    <span class="font-medium">ទិន្នន័យ:</span> 1kg | {{ sale.price }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BusinessPage',
    data() {
        return {
            saleInfo: 'First sell have 20kg',
            buyerName: 'Dara',
            price: '25000 ៛',
            sales: []
        }
    },
    methods: {
        addSale() {
            if (this.saleInfo && this.buyerName && this.price) {
                this.sales.unshift({
                    info: this.saleInfo,
                    buyer: this.buyerName,
                    price: this.price
                });
                // Reset form (optional)
                // this.saleInfo = '';
                // this.buyerName = '';
                // this.price = '';
            }
        }
    }
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>