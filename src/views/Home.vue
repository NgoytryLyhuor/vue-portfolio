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

            <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Loading state -->
                <div v-if="loading" class="text-center py-10">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p class="mt-2 text-gray-600 dark:text-gray-300">Loading articles...</p>
                </div>

                <!-- Error state -->
                <div v-if="error" class="text-center py-10">
                    <div class="text-red-500 mb-2">⚠️ Error loading articles</div>
                    <p class="text-gray-600 dark:text-gray-300">{{ error }}</p>
                    <button @click="fetchArticles" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Retry
                    </button>
                </div>

                <!-- Articles grid -->
                <div v-if="!loading && !error" class="columns-1 md:columns-2 lg:columns-3 gap-6">
                    <div v-for="article in articles" :key="article.id"
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 break-inside-avoid">
                        <div class="p-6">
                            <div class="flex items-center mb-3">
                                <img v-if="article.user.profile_image" :src="article.user.profile_image" :alt="article.user.name" class="w-8 h-8 rounded-full mr-2">
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ article.user.name }}</span>
                            </div>
                            <h3 class="text-xl mb-2 dark:text-white">
                                <a :href="article.url" target="_blank"
                                    class="hover:text-blue-600 text-base dark:hover:text-blue-400 transition-colors duration-300">
                                    {{ article.title }}
                                </a>
                            </h3>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span v-for="tag in article.tag_list.slice(0, 3)" :key="tag" 
                                    class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    {{ tag }}
                                </span>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">{{ article.description || 'No description available' }}</p>
                            <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-sm">{{ formatDate(article.published_at) }}</span>
                                <div class="flex items-center">
                                    <span class="mr-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        {{ article.positive_reactions_count }}
                                    </span>
                                    <a :href="article.url" target="_blank"
                                        class="text-green-500 hover:text-green-600 font-medium">
                                        Read more →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'BlogView',
    data() {
        return {
            articles: [],
            loading: true,
            error: null,
            selectedCategories: []
        }
    },
    computed: {
        categories() {
            // Extract unique tags from all articles
            const allTags = this.articles.flatMap(article => article.tag_list);
            return [...new Set(allTags)].sort();
        },
        filteredPosts() {
            if (this.selectedCategories.length === 0) return this.articles;
            return this.articles.filter(article =>
                this.selectedCategories.some(tag => article.tag_list.includes(tag))
            );
        }
    },
    async mounted() {
        await this.fetchArticles();
    },
    methods: {
        async fetchArticles() {
            this.loading = true;
            this.error = null;
            
            try {
                // Fetch top articles from dev.to with data science tag
                const response = await fetch('https://dev.to/api/articles?tag=datascience&top=30');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                this.articles = await response.json();
            } catch (err) {
                console.error('Error fetching articles:', err);
                this.error = err.message || 'Failed to load articles';
            } finally {
                this.loading = false;
            }
        },
        toggleCategory(category) {
            if (this.selectedCategories.includes(category)) {
                this.selectedCategories = this.selectedCategories.filter(c => c !== category);
            } else {
                this.selectedCategories = [...this.selectedCategories, category];
            }
        },
        resetFilters() {
            this.selectedCategories = [];
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
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

/* Animation for loading spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
.animate-spin {
    animation: spin 1s linear infinite;
}
</style>