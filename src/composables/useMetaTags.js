// Composable for managing dynamic meta tags
import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useMetaTags() {
    const route = useRoute()

    const updateMetaTags = (meta) => {
        const siteUrl = process.env.VUE_APP_SITE_URL || 'https://ngoytrylyhuor.vercel.app'
        const defaultImage = `${siteUrl}/seo-img.jpg`
        
        const {
            title = 'Ngoytry Lyhuor',
            description = 'Professional web developer based in Cambodia. Portfolio showcasing projects in frontend development, JavaScript, and modern frameworks.',
            image = defaultImage,
            url = siteUrl,
            type = 'website'
        } = meta

        // Update document title
        document.title = title

        // Update or create meta tags
        const updateMetaTag = (name, content, attribute = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`)
            if (!element) {
                element = document.createElement('meta')
                element.setAttribute(attribute, name)
                document.head.appendChild(element)
            }
            element.setAttribute('content', content)
        }

        // Basic meta tags
        updateMetaTag('description', description)
        updateMetaTag('author', 'Ngoytry Lyhuor')
        
        // Robots meta tag
        if (meta.robots) {
            updateMetaTag('robots', meta.robots)
        } else {
            updateMetaTag('robots', 'index, follow')
        }

        // Open Graph tags
        updateMetaTag('og:title', title, 'property')
        updateMetaTag('og:description', description, 'property')
        updateMetaTag('og:image', image, 'property')
        updateMetaTag('og:url', url + route.path, 'property')
        updateMetaTag('og:type', type, 'property')
        updateMetaTag('og:site_name', 'Ngoytry Lyhuor Portfolio', 'property')

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image')
        updateMetaTag('twitter:title', title)
        updateMetaTag('twitter:description', description)
        updateMetaTag('twitter:image', image)

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', url + route.path)
    }

    // Watch route changes and update meta tags
    watch(
        () => route.meta,
        (meta) => {
            if (meta.title || meta.description) {
                updateMetaTags({
                    title: meta.title || 'Ngoytry Lyhuor',
                    description: meta.description || 'Professional web developer based in Cambodia.',
                    image: meta.image,
                    robots: meta.robots
                })
            }
        },
        { immediate: true }
    )

    return { updateMetaTags }
}

