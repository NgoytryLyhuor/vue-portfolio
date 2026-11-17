<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <main class="max-w-4xl mx-auto space-y-6">
            <!-- Loading State -->
            <div v-if="loading" class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8">
                <LoadingSkeleton type="text" :lines="10" />
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="border border-red-200 dark:border-red-900/60 bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 text-center shadow-sm space-y-4">
                <div class="text-red-500 text-5xl">⚠️</div>
                <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {{ isKhmer ? 'រកមិនឃើញអត្ថបទ' : 'Article Not Found' }}
                </h2>
                <p class="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">{{ error }}</p>
                <router-link 
                    to="/"
                    class="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                    ← {{ isKhmer ? 'ត្រឡប់ទៅទំព័រដើម' : 'Back to Home' }}
                </router-link>
            </div>

            <!-- Article Content -->
            <article v-else-if="article" class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden">
                <!-- Header -->
                <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
                    <div class="flex items-center mb-4">
                        <img 
                            v-if="article.user.profile_image" 
                            :src="article.user.profile_image"
                            :alt="`${article.user.name}'s profile`" 
                            class="w-10 h-10 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 mr-3"
                            loading="lazy"
                        >
                        <div>
                            <p class="font-bold text-slate-900 dark:text-white text-sm">{{ article.user.name }}</p>
                            <p class="text-xs font-mono text-slate-500 dark:text-slate-400">{{ formatDate(article.published_at) }}</p>
                        </div>
                    </div>
                    <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        {{ article.title }}
                    </h1>
                    <div class="flex flex-wrap gap-2">
                        <span 
                            v-for="tag in article.tag_list" 
                            :key="tag"
                            class="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                        >
                            #{{ tag }}
                        </span>
                    </div>
                </div>

                <!-- Sanitized Article Body -->
                <div class="p-6 sm:p-8 prose prose-lg dark:prose-invert max-w-none">
                    <div v-html="sanitizedBodyHtml" class="article-content"></div>
                </div>

                <!-- Footer -->
                <div class="p-6 sm:p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                {{ article.positive_reactions_count }} reactions
                            </div>
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {{ article.comments_count }} comments
                            </div>
                        </div>
                        <a 
                            :href="article.url" 
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors"
                            aria-label="Read full article on Dev.to"
                        >
                            {{ isKhmer ? 'អាននៅលើ Dev.to →' : 'Read on Dev.to →' }}
                        </a>
                    </div>
                </div>
            </article>

            <!-- Back Button -->
            <div>
                <router-link 
                    to="/"
                    class="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    {{ isKhmer ? 'ត្រឡប់ទៅអត្ថបទទាំងអស់' : 'Back to Articles' }}
                </router-link>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DOMPurify from 'dompurify'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import logger from '@/utils/logger'
import { useLanguage } from '@/composables/useLanguage'
import { useMetaTags } from '@/composables/useMetaTags'
import { useStructuredData } from '@/composables/useStructuredData'

const route = useRoute()
const { isKhmer } = useLanguage()
const article = ref(null)
const loading = ref(true)
const error = ref(null)

// Sanitize external HTML before rendering via v-html to prevent XSS
const sanitizedBodyHtml = computed(() => {
    if (!article.value?.body_html) return ''
    return DOMPurify.sanitize(article.value.body_html, {
        USE_PROFILES: { html: true }
    })
})

const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(async () => {
    const articleId = route.params.id
    if (!articleId) {
        error.value = 'Article ID is required'
        loading.value = false
        return
    }

    try {
        // Fetch article from Dev.to API
        const response = await fetch(`https://dev.to/api/articles/${articleId}`)
        if (!response.ok) {
            throw new Error('Article not found')
        }
        article.value = await response.json()
        
        // Update meta tags for SEO
        if (article.value) {
            const siteUrl = process.env.VUE_APP_SITE_URL || 'https://ngoytry-lyhuor.vercel.app'
            const { updateMetaTags } = useMetaTags()
            updateMetaTags({
                title: `${article.value.title} - Ngoytry Lyhuor`,
                description: article.value.description || article.value.title,
                image: article.value.cover_image || article.value.social_image || `${siteUrl}/seo-img.jpg`,
                type: 'article',
                robots: 'index, follow'
            })
            
            // Add structured data for article
            const { addStructuredData, getArticleData, getBreadcrumbData } = useStructuredData()
            const articleData = getArticleData(article.value)
            if (articleData) {
                addStructuredData(articleData)
            }
            
            // Add breadcrumb structured data
            const breadcrumbData = getBreadcrumbData([
                { name: 'Home', url: `${siteUrl}/` },
                { name: 'Blog', url: `${siteUrl}/` },
                { name: article.value.title, url: article.value.url || `${siteUrl}/blog/${articleId}` }
            ])
            addStructuredData(breadcrumbData)
        }
    } catch (err) {
        logger.error('Error fetching article:', err)
        error.value = err.message || 'Failed to load article'
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.article-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 1.5rem 0;
}

.article-content :deep(pre) {
    background: #0f172a;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 1.5rem 0;
}

.article-content :deep(code) {
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
}

.dark .article-content :deep(code) {
    background: #1e293b;
    color: #e2e8f0;
}
</style>
