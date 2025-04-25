<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 duration-500 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <div class="relative inline-block">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                        អាជីវកម្មរបស់ខ្ញុំ
                    </h1>
                    <div
                        class="absolute -bottom-1 left-0 w-full h-2 bg-orange-200 dark:bg-orange-800 opacity-60 rounded-full z-0">
                    </div>
                </div>
                <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mt-6">
                    ជ្រើសរើសអាជីវកម្មដើម្បីចាប់ផ្តើមការតាមដាន
                </p>
            </div>

            <!-- Business Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Tropang Business Card -->
                <div v-if="businessData"
                    class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative"
                    @click="navigateTo('tropang')">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    <div class="p-6">
                        <div class="flex items-center mb-6">
                            <div
                                class="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800 text-orange-600 dark:text-orange-300 mr-4 shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">ត្រពាំង</h2>
                                <p class="text-sm text-orange-500 dark:text-orange-400">អាជីវកម្មសកម្ម</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            ការតាមដានការលក់ត្រពាំង និងការគណនាចំណេញ
                        </p>
                        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <div class="text-center">
                                <p class="font-semibold text-gray-700 dark:text-gray-200">{{ businessData.activeRounds
                                }}</p>
                                <p>ជើងសកម្ម</p>
                            </div>
                            <div class="text-center">
                                <p class="font-semibold text-gray-700 dark:text-gray-200">{{ businessData.todaySales }}
                                </p>
                                <p>ការលក់ថ្ងៃនេះ</p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">ចំណូលសរុបថ្ងៃនេះ</span>
                            <span class="text-lg font-bold text-green-600 dark:text-green-400 animate-pulse">៛{{
                                formatCurrency(businessData.todayRevenue) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
                    <div class="animate-pulse space-y-4">
                        <div class="flex items-center">
                            <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl mr-4"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                        </div>
                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="flex justify-between pt-4">
                            <div class="space-y-2">
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                            <div class="space-y-2">
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                        </div>
                        <div class="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between">
                                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity Section -->
            <div class="mt-20">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white relative inline-block">
                        <span class="relative z-10">សកម្មភាពថ្មីៗ</span>
                        <span
                            class="absolute bottom-0 left-0 w-full h-1.5 bg-orange-200 dark:bg-orange-800 opacity-60 rounded-full z-0"></span>
                    </h2>
                    <button @click="viewAllActivities"
                        class="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                        មើលទាំងអស់
                    </button>
                </div>

                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <ul class="divide-y divide-gray-100 dark:divide-gray-700">
                        <li v-for="(activity, index) in visibleActivities" :key="index"
                            class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 group">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 mr-4 mt-1 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                                    :class="getActivityIconColor(activity.type).bg">
                                    <component :is="getActivityIcon(activity.type)" class="h-5 w-5"
                                        :class="getActivityIconColor(activity.type).text" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                                        {{ activity.title }}
                                    </p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {{ activity.description }}
                                    </p>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                    <p
                                        class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                        {{ formatTimeAgo(activity.timestamp) }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-if="showLoadMore"
                        class="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 text-center border-t border-gray-100 dark:border-gray-700">
                        <button @click="loadMoreActivities"
                            class="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                            បង្ហាញច្រើនទៀត
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
                    bg: 'bg-green-100 dark:bg-green-900/70 group-hover:bg-green-200 dark:group-hover:bg-green-800/90',
                    text: 'text-green-600 dark:text-green-300'
                };
                case 'round': return {
                    bg: 'bg-blue-100 dark:bg-blue-900/70 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/90',
                    text: 'text-blue-600 dark:text-blue-300'
                };
                case 'payment': return {
                    bg: 'bg-purple-100 dark:bg-purple-900/70 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/90',
                    text: 'text-purple-600 dark:text-purple-300'
                };
                case 'business': return {
                    bg: 'bg-orange-100 dark:bg-orange-900/70 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/90',
                    text: 'text-orange-600 dark:text-orange-300'
                };
                default: return {
                    bg: 'bg-gray-100 dark:bg-gray-700/70 group-hover:bg-gray-200 dark:group-hover:bg-gray-600/90',
                    text: 'text-gray-600 dark:text-gray-300'
                };
            }
        },
        viewAllActivities() {
            this.showAllActivities = true;
            // Alternatively: navigate to a dedicated activities page
            // this.$router.push('/activities');
        },
        
        loadMoreActivities() {
            this.activityLimit += 5;
        },
        
        async fetchAllActivities() {
            try {
                const response = await axios.get('/api/activities');
                this.recentActivities = response.data;
            } catch (error) {
                console.error('Error fetching activities:', error);
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
                color: 'orange'
            };
            this.showAddBusinessModal = false;
        }
    }
}
</script>

<style scoped>
/* Smooth transitions for dark mode */
html {
    @apply transition-colors duration-300;
}
</style>