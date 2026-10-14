import { ref, computed } from 'vue';

// Default language is 'km' (Khmer) as requested
const getInitialLanguage = () => {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('preferred_language');
        if (stored === 'km' || stored === 'en') {
            return stored;
        }
    }
    // Default to Khmer
    return 'km';
};

const currentLang = ref(getInitialLanguage());

export function useLanguage() {
    const isKhmer = computed(() => currentLang.value === 'km');
    const isEnglish = computed(() => currentLang.value === 'en');

    const setLanguage = (lang) => {
        if (lang === 'km' || lang === 'en') {
            currentLang.value = lang;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('preferred_language', lang);
            }
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
            }
        }
    };

    const toggleLanguage = () => {
        setLanguage(currentLang.value === 'km' ? 'en' : 'km');
    };

    /**
     * Translate helper
     * @param {Object|string} obj - { km: '...', en: '...' }
     */
    const t = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[currentLang.value] || obj.km || obj.en || '';
    };

    return {
        currentLang,
        isKhmer,
        isEnglish,
        setLanguage,
        toggleLanguage,
        t
    };
}
export default useLanguage;
