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

            <!-- Tag Filter Section -->
            <div class="mb-8">
                <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
                    <button @click="resetFilters" :class="{
                        'bg-blue-500 text-white': selectedTags.length === 0,
                        'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300': selectedTags.length > 0
                    }"
                        class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white">
                        All Articles
                    </button>

                    <button v-for="tag in popularTags" :key="tag" @click="toggleTag(tag)" :class="{
                        'bg-blue-500 text-white': selectedTags.includes(tag),
                        'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300': !selectedTags.includes(tag)
                    }"
                        class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white">
                        {{ tag }}
                    </button>
                </div>

                <div class="text-center">
                    <div class="relative max-w-md mx-auto">
                        <input v-model="searchQuery" type="text" placeholder="Search articles..."
                            class="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="columns-1 md:columns-2 lg:columns-3 gap-6">
                <LoadingSkeleton v-for="i in 6" :key="i" type="article" />
            </div>

            <!-- Error state -->
            <div v-if="error" class="text-center py-10">
                <div class="text-red-500 mb-2">⚠️ Error loading articles</div>
                <p class="text-gray-600 dark:text-gray-300">{{ error }}</p>
                <button @click="fetchArticles"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Retry
                </button>
            </div>

            <!-- Articles grid -->
            <div v-if="!loading && !error">
                <div v-if="filteredArticles.length === 0" class="text-center py-10">
                    <p class="text-gray-600 dark:text-gray-300">No articles found matching your criteria</p>
                    <button @click="resetFilters"
                        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Reset filters
                    </button>
                </div>

                <div v-else>
                    <div class="columns-1 md:columns-2 lg:columns-3 gap-6">
                        <div v-for="article in paginatedArticles" :key="article.id"
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 break-inside-avoid">
                        <div class="p-6">
                            <div class="flex items-center mb-3">
                                <img 
                                    v-if="article.user.profile_image" 
                                    :src="article.user.profile_image"
                                    :alt="`${article.user.name}'s profile`" 
                                    class="w-8 h-8 rounded-full mr-2"
                                    loading="lazy"
                                >
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ article.user.name }}</span>
                            </div>
                            <h3 class="text-xl mb-2 dark:text-white">
                                <a :href="article.url" target="_blank"
                                    class="hover:text-blue-600 hover:underline text-base dark:hover:text-blue-400 transition-colors duration-300">
                                    {{ article.title }}
                                </a>
                            </h3>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span v-for="tag in article.tag_list.slice(0, 3)" :key="tag" @click="toggleTag(tag)"
                                    class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors">
                                    {{ tag }}
                                </span>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">{{ article.description
                                || 'No description available' }}</p>
                            <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-sm">{{ formatDate(article.published_at) }}</span>
                                <div class="flex items-center">
                                    <span class="mr-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
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
                    
                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
                        <button 
                            @click="currentPage = Math.max(1, currentPage - 1)"
                            :disabled="currentPage === 1"
                            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Previous page"
                        >
                            Previous
                        </button>
                        <span class="px-4 py-2 text-gray-700 dark:text-gray-300">
                            Page {{ currentPage }} of {{ totalPages }}
                        </span>
                        <button 
                            @click="currentPage = Math.min(totalPages, currentPage + 1)"
                            :disabled="currentPage === totalPages"
                            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// Home Page - Dev.to Blog Articles Feed
import logger from '@/utils/logger'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

export default {
    components: {
        LoadingSkeleton
    },
    name: 'BlogView',
    data() {
        return {
            articles: [],
            loading: true,
            error: null,
            selectedTags: [],
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 12
        }
    },
    computed: {
        allTags() {
            // Extract all tags from articles and count occurrences
            const tagCounts = {};
            this.articles.forEach(article => {
                article.tag_list.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });
            return tagCounts;
        },
        popularTags() {
            // Get top 10 most popular tags
            return Object.entries(this.allTags)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([tag]) => tag);
        },
        filteredArticles() {
            let filtered = this.articles;

            // Filter by selected tags
            if (this.selectedTags.length > 0) {
                filtered = filtered.filter(article => this.selectedTags.some(tag => article.tag_list.includes(tag)));
            }

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    (article.description && article.description.toLowerCase().includes(query)) ||
                    article.tag_list.some(tag => tag.toLowerCase().includes(query)));
            }

            // Sort by date (newest first)
            return filtered.sort((a, b) => {
                return new Date(b.published_at) - new Date(a.published_at);
            });
        },
        paginatedArticles() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredArticles.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
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

                const articles = await response.json();
                // Sort articles by date (newest first)
                this.articles = articles.sort((a, b) => {
                    return new Date(b.published_at) - new Date(a.published_at);
                });
            } catch (err) {
                logger.error('Error fetching articles:', err);
                this.error = err.message || 'Failed to load articles';
            } finally {
                this.loading = false;
            }
        },
        toggleTag(tag) {
            if (this.selectedTags.includes(tag)) {
                this.selectedTags = this.selectedTags.filter(t => t !== tag);
            } else {
                this.selectedTags = [...this.selectedTags, tag];
            }
            this.currentPage = 1; // Reset to first page when filtering
        },
        resetFilters() {
            this.selectedTags = [];
            this.searchQuery = '';
            this.currentPage = 1;
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
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Smooth transitions for tag buttons */
.tag-transition {
    transition: all 0.2s ease-in-out;
}
</style>