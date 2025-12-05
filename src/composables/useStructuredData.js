// Composable for managing structured data (Schema.org JSON-LD)
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useStructuredData() {
    const route = useRoute()

    const addStructuredData = (data) => {
        // Remove existing script with same id
        const existingScript = document.getElementById('structured-data')
        if (existingScript) {
            existingScript.remove()
        }

        // Create new script tag
        const script = document.createElement('script')
        script.id = 'structured-data'
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(data)
        document.head.appendChild(script)
    }

    const getBreadcrumbData = (items) => {
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        }
    }

    const getArticleData = (article) => {
        if (!article) return null
        
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description || article.title,
            image: article.cover_image || article.social_image || '',
            datePublished: article.published_at,
            dateModified: article.published_at,
            author: {
                '@type': 'Person',
                name: article.user?.name || 'Ngoytry Lyhuor',
                url: article.user?.website_url || 'https://ngoytrylyhuor.vercel.app'
            },
            publisher: {
                '@type': 'Organization',
                name: 'Ngoytry Lyhuor',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://ngoytrylyhuor.vercel.app/logo.png'
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': article.url || `https://ngoytrylyhuor.vercel.app/blog/${article.id}`
            }
        }
    }

    const getProjectData = (projects) => {
        if (!projects || !Array.isArray(projects)) return null

        return {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Portfolio Projects',
            description: 'Collection of web development projects',
            itemListElement: projects.map((project, index) => ({
                '@type': 'SoftwareApplication',
                position: index + 1,
                name: project.title,
                description: project.description,
                url: project.demo_url,
                applicationCategory: 'WebApplication',
                operatingSystem: 'Web',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD'
                }
            }))
        }
    }

    return {
        addStructuredData,
        getBreadcrumbData,
        getArticleData,
        getProjectData
    }
}

