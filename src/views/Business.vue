<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    អាជីវកម្មរបស់ខ្ញុំ
                </h1>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    ជ្រើសរើសអាជីវកម្មដើម្បីចាប់ផ្តើមការតាមដាន
                </p>
            </div>

            <!-- Business Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Tropang Business Card -->
                <div v-if="businessData" 
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    @click="navigateTo('tropang')">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div
                                class="p-3 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">ត្រពាំង</h2>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            ការតាមដានការលក់ត្រពាំង និងការគណនាចំណេញ
                        </p>
                        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>ជើងសកម្ម: {{ businessData.activeRounds }}</span>
                            <span>ការលក់ថ្ងៃនេះ: {{ businessData.todaySales }}</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">ចំណូលសរុបថ្ងៃនេះ</span>
                            <span class="text-lg font-bold text-green-600 dark:text-green-400">៛{{ formatCurrency(businessData.todayRevenue) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
                    <div class="animate-pulse">
                        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
                        <div class="flex justify-between">
                            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity Section -->
            <div class="mt-16">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    សកម្មភាពថ្មីៗ
                </h2>

                <div
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li v-for="(activity, index) in recentActivities" :key="index"
                            class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 mr-4" :class="getActivityIconColor(activity.type).bg">
                                    <component :is="getActivityIcon(activity.type)" class="h-6 w-6"
                                        :class="getActivityIconColor(activity.type).text" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {{ activity.title }}
                                    </p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ activity.description }}
                                    </p>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        {{ formatTimeAgo(activity.timestamp) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Add Business Modal -->
        <!-- ... (keep existing modal code) ... -->
    </div>
</template>

<script>
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    UserAddIcon,
    ChartBarIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios';

export default {
    name: 'BusinessPage',
    components: {
        ArrowUpIcon,
        ArrowDownIcon,
        ShoppingBagIcon,
        CurrencyDollarIcon,
        UserAddIcon,
        ChartBarIcon
    },
    data() {
        return {
            showAddBusinessModal: false,
            newBusiness: {
                name: '',
                type: 'product',
                color: 'orange'
            },
            colorOptions: [
                { value: 'orange', bg: 'bg-orange-500' },
                { value: 'blue', bg: 'bg-blue-500' },
                { value: 'green', bg: 'bg-green-500' },
                { value: 'purple', bg: 'bg-purple-500' },
                { value: 'red', bg: 'bg-red-500' },
                { value: 'indigo', bg: 'bg-indigo-500' },
            ],
            recentActivities: [],
            businessData: null,
            loading: true
        };
    },
    async created() {
        await this.fetchBusinessData();
        await this.fetchRecentActivities();
    },
    methods: {
        navigateTo(routeName) {
            this.$router.push({ name: routeName });
        },
        getActivityIcon(type) {
            switch (type) {
                case 'sale': return ShoppingBagIcon;
                case 'round': return ChartBarIcon;
                case 'payment': return CurrencyDollarIcon;
                case 'business': return UserAddIcon;
                default: return ArrowUpIcon;
            }
        },
        getActivityIconColor(type) {
            switch (type) {
                case 'sale': return {
                    bg: 'bg-green-100 dark:bg-green-900',
                    text: 'text-green-600 dark:text-green-300'
                };
                case 'round': return {
                    bg: 'bg-blue-100 dark:bg-blue-900',
                    text: 'text-blue-600 dark:text-blue-300'
                };
                case 'payment': return {
                    bg: 'bg-purple-100 dark:bg-purple-900',
                    text: 'text-purple-600 dark:text-purple-300'
                };
                case 'business': return {
                    bg: 'bg-orange-100 dark:bg-orange-900',
                    text: 'text-orange-600 dark:text-orange-300'
                };
                default: return {
                    bg: 'bg-gray-100 dark:bg-gray-700',
                    text: 'text-gray-600 dark:text-gray-300'
                };
            }
        },
        formatTimeAgo(timestamp) {
            const now = new Date();
            const date = new Date(timestamp);
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) return 'មុននេះបន្តិច';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} នាទីមុន`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ម៉ោងមុន`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ថ្ងៃមុន`;

            // Khmer month names
            const months = [
                'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
                'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
            ];

            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('km-KH').format(Math.round(value));
        },
        async fetchBusinessData() {
            try {
                this.loading = true;
                
                // Fetch all rounds
                const roundsResponse = await axios.get('/api/rounds');
                
                // Fetch today's sales
                const today = new Date().toISOString().split('T')[0];
                const salesResponse = await axios.get(`/api/sales?date=${today}`);
                
                // Calculate today's revenue
                const todayRevenue = salesResponse.data.reduce((sum, sale) => sum + Number(sale.price), 0);
                
                // Count active rounds (assuming active rounds are those with remaining amount)
                const activeRounds = roundsResponse.data.filter(round => {
                    const sales = round.sales || [];
                    const soldAmount = sales.reduce((sum, sale) => sum + Number(sale.amount), 0);
                    return soldAmount < Number(round.purchase_amount);
                }).length;
                
                this.businessData = {
                    activeRounds,
                    todaySales: salesResponse.data.length,
                    todayRevenue
                };
                
            } catch (error) {
                console.error('Error fetching business data:', error);
                // Fallback to default values if API fails
                this.businessData = {
                    activeRounds: 0,
                    todaySales: 0,
                    todayRevenue: 0
                };
            } finally {
                this.loading = false;
            }
        },
        async fetchRecentActivities() {
            try {
                // Fetch recent sales
                const salesResponse = await axios.get('/api/sales?_limit=5&_sort=created_at&_order=desc');
                
                // Fetch recent rounds
                const roundsResponse = await axios.get('/api/rounds?_limit=3&_sort=created_at&_order=desc');
                
                // Transform data into activity format
                const salesActivities = salesResponse.data.map(sale => ({
                    type: 'sale',
                    title: 'ការលក់ថ្មី - ត្រពាំង',
                    description: `បានលក់ ${sale.amount}kg ទៅកាន់ ${sale.customer_name} ក្នុងតម្លៃ ៛${this.formatCurrency(sale.price)}`,
                    timestamp: sale.created_at || sale.date
                }));
                
                const roundsActivities = roundsResponse.data.map(round => ({
                    type: 'round',
                    title: 'ជើងលក់ថ្មី - ត្រពាំង',
                    description: `ចាប់ផ្តើមជើងលក់ថ្មី ${round.purchase_amount}kg ក្នុងតម្លៃ ៛${this.formatCurrency(round.purchase_price)}`,
                    timestamp: round.created_at
                }));
                
                // Combine and sort activities by timestamp
                this.recentActivities = [...salesActivities, ...roundsActivities]
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 5);
                
            } catch (error) {
                console.error('Error fetching recent activities:', error);
                // Fallback to default activities if API fails
                this.recentActivities = [
                    {
                        type: 'sale',
                        title: 'ការលក់ថ្មីនៅត្រពាំង',
                        description: 'លក់បាន 25kg ទៅកាន់ លោក សុខា ក្នុងតម្លៃ ៛500,000',
                        timestamp: new Date().toISOString()
                    }
                ];
            }
        },
        addNewBusiness() {
            if (!this.newBusiness.name) {
                return;
            }

            this.recentActivities.unshift({
                type: 'business',
                title: 'អាជីវកម្មថ្មី',
                description: `បានបន្ថែមអាជីវកម្ម ${this.newBusiness.name}`,
                timestamp: new Date().toISOString()
            });

            this.newBusiness = {
                name: '',
                type: 'product',
                color: 'orange'
            };
            this.showAddBusinessModal = false;
        }
    }
}
</script>

<style scoped>
/* Keep existing styles */
</style>