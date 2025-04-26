<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-200 tracking-tight animate-fade-in">
                    អាជីវកម្មរបស់អ្នក
                </h1>
                <div class="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                <p class="max-w-2xl mx-auto mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    គ្រប់គ្រងអាជីវកម្មរបស់អ្នកជាមួយនឹងភាពងាយស្រួល និងប្រសិទ្ធភាព
                </p>
            </div>

            <!-- Business Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Tropang Business Card -->
                <div v-if="businessData"
                    class="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    @click="navigateTo('tropang')">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative p-5">
                        <div class="flex items-center mb-4">
                            <div class="p-2 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">ត្រពាំង</h2>
                                <p class="text-xs font-medium text-blue-500 dark:text-blue-400">សកម្ម</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                            តាមដានការលក់ និងចំណេញប្រចាំថ្ងៃរបស់អ្នក
                        </p>
                        <div class="grid grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <div class="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                                <p class="font-semibold text-gray-900 dark:text-white">{{ businessData.activeRounds }}</p>
                                <p>ជើងសកម្ម</p>
                            </div>
                            <div class="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                                <p class="font-semibold text-gray-900 dark:text-white">{{ businessData.todaySales }}</p>
                                <p>ការលក់ថ្ងៃនេះ</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-500 px-5 py-3 text-white">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium">ចំណូលថ្ងៃនេះ</span>
                            <span class="text-base font-bold animate-pulse">៛{{ formatCurrency(businessData.todayRevenue) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-5">
                    <div class="animate-pulse space-y-3">
                        <div class="flex items-center">
                            <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                            <div class="space-y-2">
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                            </div>
                        </div>
                        <div class="h-2差点-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="space-y-2">
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                            </div>
                            <div class="space-y-2">
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                            </div>
                        </div>
                        <div class="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between">
                                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity Section -->
            <div class="mt-16">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">សកម្មភាពថ្មីៗ</h2>
                    <button @click="viewAllActivities" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                        មើលទាំងអស់ →
                    </button>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                    <ul class="divide-y divide-gray-100 dark:divide-gray-700">
                        <li v-for="(activity, index) in visibleActivities" :key="index" class="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200 group">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 mr-3 p-2 rounded-full transition-transform duration-200 group-hover:scale-110" :class="getActivityIconColor(activity.type).bg">
                                    <component :is="getActivityIcon(activity.type)" class="h-5 w-5" :class="getActivityIconColor(activity.type).text" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                                </div>
                                <div class="ml-3 flex-shrink-0">
                                    <p class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                        {{ formatTimeAgo(activity.timestamp) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-if="showLoadMore" class="bg-gray-50 dark:bg-gray-700/20 px-5 py-3 text-center border-t border-gray-100 dark:border-gray-700">
                        <button @click="loadMoreActivities" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                            បង្ហាញបន្ថែម
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
} from '@heroicons/vue/24/outline';
import axios from 'axios';

export default {
    name: 'EnhancedBusinessPageWithAPI',
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
                color: 'blue'
            },
            colorOptions: [
                { value: 'blue', bg: 'bg-blue-500' },
                { value: 'indigo', bg: 'bg-indigo-500' },
                { value: 'green', bg: 'bg-green-500' },
                { value: 'purple', bg: 'bg-purple-500' },
                { value: 'red', bg: 'bg-red-500' },
                { value: 'orange', bg: 'bg-orange-500' },
            ],
            recentActivities: [],
            businessData: null,
            loading: true,
            activityLimit: 5,
            showAllActivities: false
        };
    },
    async created() {
        await this.fetchBusinessData();
        await this.fetchRecentActivities();
    },
    computed: {
        visibleActivities() {
            return this.showAllActivities 
                ? this.recentActivities 
                : this.recentActivities.slice(0, this.activityLimit);
        },
        showLoadMore() {
            return !this.showAllActivities && this.recentActivities.length > this.activityLimit;
        }
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
                    bg: 'bg-green-500/10',
                    text: 'text-green-500'
                };
                case 'round': return {
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-500'
                };
                case 'payment': return {
                    bg: 'bg-purple-500/10',
                    text: 'text-purple-500'
                };
                case 'business': return {
                    bg: 'bg-indigo-500/10',
                    text: 'text-indigo-500'
                };
                default: return {
                    bg: 'bg-gray-500/10',
                    text: 'text-gray-500'
                };
            }
        },
        viewAllActivities() {
            this.showAllActivities = true;
        },
        loadMoreActivities() {
            this.activityLimit += 5;
        },
        async fetchAllActivities() {
            try {
                const response = await axios.get('/api/activities', {
                    params: {
                        limit: 100,
                        sort: 'created_at',
                        order: 'desc'
                    },
                    headers: {
                        'Authorization': 'Bearer YOUR_API_TOKEN',
                        'Accept': 'application/json'
                    }
                });
                this.recentActivities = response.data || [];
            } catch (error) {
                console.error('Error fetching all activities:', error);
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
                const roundsResponse = await axios.get('/api/rounds', {
                    headers: {
                        'Authorization': 'Bearer YOUR_API_TOKEN',
                        'Accept': 'application/json'
                    }
                });
                const today = new Date().toISOString().split('T')[0];
                const salesResponse = await axios.get('/api/sales', {
                    params: { date: today },
                    headers: {
                        'Authorization': 'Bearer YOUR_API_TOKEN',
                        'Accept': 'application/json'
                    }
                });
                const todayRevenue = salesResponse.data.reduce((sum, sale) => sum + Number(sale.price), 0);
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
                this.businessData = {
                    activeRounds: 3,
                    todaySales: 12,
                    todayRevenue: 1250000
                };
            } finally {
                this.loading = false;
            }
        },
        async fetchRecentActivities() {
            try {
                // Fetch recent rounds
                const roundsResponse = await axios.get('/api/rounds', {
                    headers: {
                        'Authorization': 'Bearer YOUR_API_TOKEN',
                        'Accept': 'application/json'
                    }
                });

                // Fetch recent sales
                const salesResponse = await axios.get('/api/sales', {
                    headers: {
                        'Authorization': 'Bearer YOUR_API_TOKEN',
                        'Accept': 'application/json'
                    }
                });

                // Process rounds into activities
                const roundsActivities = roundsResponse.data.slice(0, 3).map(round => ({
                    type: 'round',
                    title: 'ជើងលក់ថ្មី - ត្រពាំង',
                    description: `ចាប់ផ្តើមជើងលក់ថ្មី ${round.purchase_amount}kg ក្នុងតម្លៃ ៛${this.formatCurrency(round.purchase_price)}`,
                    timestamp: round.created_at
                }));

                // Process sales into activities
                const salesActivities = salesResponse.data.slice(0, 5).map(sale => ({
                    type: 'sale',
                    title: 'ការលក់ថ្មី - ត្រពាំង',
                    description: `បានលក់ ${sale.amount}kg ទៅកាន់ ${sale.customer_name} ក្នុងតម្លៃ ៛${this.formatCurrency(sale.price)}`,
                    timestamp: sale.created_at || sale.sale_date
                }));

                // Combine and sort activities by timestamp
                this.recentActivities = [...salesActivities, ...roundsActivities]
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 5);

            } catch (error) {
                console.error('Error fetching recent activities from API:', error);

                // Fallback to mock data
                this.recentActivities = [
                    {
                        type: 'sale',
                        title: 'ការលក់ថ្មីនៅត្រពាំង',
                        description: 'លក់បាន 25kg ទៅកាន់ លោក �សុខា ក្នុងតម្លៃ ៛500,000',
                        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
                    },
                    {
                        type: 'sale',
                        title: 'ការលក់ថ្មីនៅត្រពាំង',
                        description: 'លក់បាន 18kg ទៅកាន់ លោក វណ្ណា ក្នុងតម្លៃ ៛360,000',
                        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
                    },
                    {
                        type: 'round',
                        title: 'ជើងលក់ថ្មី - ត្រពាំង',
                        description: 'ចាប់ផ្តើមជើងលក់ថ្មី 100kg ក្នុងតម្លៃ ៛2,000,000',
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
                    },
                    {
                        type: 'payment',
                        title: 'ការទូទាត់',
                        description: 'ទូទាត់ថ្លៃដីធ្លី ៛1,200,000',
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
                    },
                    {
                        type: 'business',
                        title: 'អាជីវកម្មថ្មី',
                        description: 'បានបន្ថែមអាជីវកម្ម ហាងកាហ្វេ',
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
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
                color: 'blue'
            };
            this.showAddBusinessModal = false;
        }
    }
}
</script>

<style scoped>
html {
    @apply transition-colors duration-300;
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
</style>