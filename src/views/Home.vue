<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
            <!-- Page Header -->
            <div class="mb-10 text-center">
                <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Blog Articles</h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Thoughts, tutorials, and discoveries on technology, data science, and more.
                </p>
            </div>

            <!-- Category Filters -->
            <div class="mb-8 flex flex-wrap justify-center gap-3">
                <button v-for="category in categories" :key="category" @click="toggleCategory(category)" :class="[ 'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300', selectedCategories.includes(category) ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm']">
                    {{ category }}
                </button>
            </div>

            <!-- Blog Posts Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <article v-for="(post, index) in filteredPosts" :key="index" class="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <div class="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
                        <span v-if="post.year" class="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 z-10">
                            {{ post.year }}
                        </span>
                        <div class="absolute bottom-4 left-4">
                            <span class="text-sm inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm">
                                {{ post.category || 'General' }}
                            </span>
                        </div>
                    </div>

                    <div class="p-6 flex-1 flex flex-col">
                        <div class="flex-1">
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                <a :href="post.link" class="hover:text-blue-600 text-base dark:hover:text-blue-400 transition-colors duration-300">
                                    {{ post.title }}
                                </a>
                            </h2>
                            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                                {{ post.excerpt || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }}
                            </p>
                        </div>

                        <div
                            class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <span class="text-sm text-gray-500 dark:text-gray-400">
                                {{ formatDate(post.date) }}
                            </span>
                            <a :href="post.link" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 flex items-center">
                                Read more
                                <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Empty State -->
            <div v-if="filteredPosts.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">No posts found</h3>
                <p class="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                <button @click="resetFilters" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                    Reset filters
                </button>
            </div>
        </main>
    </div>

    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Latest Updates</h2>
        <div class="columns-1 md:columns-2 lg:columns-3 gap-6">
            <div v-for="item in feedItems" :key="item.guid" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 break-inside-avoid">
                <div class="p-6">
                    <h3 class="text-xl mb-2 dark:text-white">
                        <a :href="item.link" target="_blank" class="hover:text-blue-600 text-base dark:hover:text-blue-400 transition-colors duration-300">
                            {{ item.title }}
                        </a>
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">{{ item.description }}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span class="text-sm">{{ formatDate(item.pubDate) }}</span>
                        <a :href="item.link" target="_blank" class="text-green-500 hover:text-green-600 font-medium">
                            Read more →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogView',
    data() {
        return {
            selectedCategories: [],
            blogPosts: [
                {
                    year: '2025',
                    title: 'Preliminary Knowledge Statistics Part II - Interactive Notebook',
                    date: '2025-04-20',
                    link: '#',
                    category: 'Statistics',
                    excerpt: 'Deep dive into statistical methods with interactive Jupyter notebooks'
                },
                {
                    title: 'Preliminary Knowledge Statistics - Interactive Notebook',
                    date: '2025-04-19',
                    link: '#',
                    category: 'Statistics',
                    excerpt: 'Introduction to fundamental statistics concepts with practical examples'
                },
                {
                    title: 'Linear Regression Uncertainty Simulation',
                    date: '2025-04-17',
                    link: '#',
                    category: 'Data Science',
                    excerpt: 'Visualizing and understanding uncertainty in linear regression models'
                },
                {
                    title: 'A New Year Wish from the Federation of Cambodian Startups',
                    date: '2025-04-13',
                    link: '#',
                    category: 'Announcement',
                    excerpt: 'Celebrating the new year with the Cambodian startup community'
                },
                {
                    title: 'Our manuscript has been accepted in the CITA 2025',
                    date: '2025-04-13',
                    link: '#',
                    category: 'Research',
                    excerpt: 'Exciting news about our latest research publication'
                },
                {
                    title: 'Interested in building a Khmer spell-checking software?',
                    date: '2025-04-10',
                    link: '#',
                    category: 'NLP',
                    excerpt: 'Exploring the challenges and solutions for Khmer language processing'
                }
            ],
            feedItems: []
        }
    },
    computed: {
        categories() {
            return [...new Set(this.blogPosts.map(post => post.category))].sort()
        },
        filteredPosts() {
            if (this.selectedCategories.length === 0) return this.blogPosts
            return this.blogPosts.filter(post =>
                this.selectedCategories.includes(post.category)
            )
        }
    },
    async mounted() {
        try {
            const response = await fetch('https://rinabuoy.vercel.app/rss.xml');
            const xmlText = await response.text();
            this.feedItems = this.parseRss(xmlText);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    },
    methods: {
        toggleCategory(category) {
            if (this.selectedCategories.includes(category)) {
                this.selectedCategories = this.selectedCategories.filter(c => c !== category)
            } else {
                this.selectedCategories = [...this.selectedCategories, category]
            }
        },
        resetFilters() {
            this.selectedCategories = []
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' }
            return new Date(dateString).toLocaleDateString(undefined, options)
        },
        parseRss(xmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            const items = xmlDoc.querySelectorAll('item');
            return Array.from(items).map(item => ({
                title: item.querySelector('title').textContent,
                description: item.querySelector('description').textContent,
                link: item.querySelector('link').textContent,
                guid: item.querySelector('guid').textContent,
                pubDate: item.querySelector('pubDate').textContent
            }));
        },
    }
}
</script>

<style scoped>
/* Line clamping for text */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Better focus styles */
a:focus,
button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

</style>