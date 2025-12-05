// Router Configuration - Portfolio Navigation
import { createRouter, createWebHistory } from 'vue-router'
import api from '@/service/api'

// Lazy load components for better performance
const Home = () => import('../views/Home.vue')
const Projects = () => import('../views/ProjectView.vue')
const About = () => import('../views/About.vue')
const NotFound = () => import('../views/NotFound.vue')
const BlogDetail = () => import('@/views/BlogDetail.vue')
const WeatherApp = () => import('@/views/projects/WeatherApp.vue')
const AirQuality = () => import('@/views/projects/AirQuality.vue')
const KhmerCalendar = () => import('@/views/projects/KhmerCalendar.vue')
const CurrencyConverter = () => import('@/views/projects/CurrencyConverter.vue')
const CryptoPassword = () => import('@/views/projects/CryptoPassword.vue')
const CryptoPriceTracker = () => import('@/views/projects/CryptoPriceTracker.vue')
const PlanetExplorer = () => import('@/views/space/PlanetExplorer.vue')
const MoonPhase = () => import('@/views/space/MoonPhase.vue')
const ISSTracker = () => import('@/views/space/ISSTracker.vue')
const SpaceEvents = () => import('@/views/space/SpaceEvents.vue')
const SpaceEventDetail = () => import('@/views/space/SpaceEventDetail.vue')
const Login = () => import('@/views/auth/LoginView.vue')
const Dashboard = () => import('@/views/auth/DashboardView.vue')

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            showNavBar: true,
            title: '404 Not Found'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showNavBar: true,
            title: 'Ngoytry Lyhuor - Web Developer Portfolio',
            description: 'Blog articles about data science, technology, and web development. Explore tutorials, insights, and discoveries from a professional web developer based in Cambodia.',
            robots: 'index, follow'
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: BlogDetail,
        meta: {
            showNavBar: true,
            title: 'Article - Ngoytry Lyhuor',
            description: 'Read the full article',
            robots: 'index, follow'
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
            showNavBar: true,
            title: 'Projects - Ngoytry Lyhuor',
            description: 'Explore my portfolio of web development projects including Vue.js applications, weather apps, and interactive tools built with modern technologies.',
            robots: 'index, follow'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            showNavBar: true,
            title: 'About Me - Ngoytry Lyhuor',
            description: 'Professional web developer based in Cambodia. Specialized in frontend development, JavaScript, Vue.js, PHP, Laravel, Java, and Spring Boot.',
            robots: 'index, follow'
        }
    },
    {
        path: '/weather-app',
        name: 'weather-app',
        component: WeatherApp,
        meta: {
            showNavBar: true,
            title: 'Weather App - Phnom Penh Weather Forecast',
            description: 'Real-time weather forecast for Phnom Penh, Cambodia. Get current conditions, hourly and daily forecasts with detailed weather information.',
            robots: 'index, follow'
        }
    },
    {
        path: '/air-quality',
        name: 'air-quality',
        component: AirQuality,
        meta: {
            showNavBar: true,
            title: 'Air Quality Monitor - Phnom Penh AQI',
            description: 'Real-time air quality monitoring for Phnom Penh, Cambodia. Check current AQI, pollution levels, and health recommendations.',
            robots: 'index, follow'
        }
    },
    {
        path: '/khmer-calendar',
        name: 'khmer-calendar',
        component: KhmerCalendar,
        meta: {
            showNavBar: true,
            title: 'Khmer Calendar - Traditional Cambodian Calendar',
            description: 'Traditional Khmer calendar converter and calendar tool for Cambodian dates and holidays.',
            robots: 'index, follow'
        }
    },
    {
        path: '/currency-converter',
        name: 'currency-converter',
        component: CurrencyConverter,
        meta: {
            showNavBar: true,
            title: 'Currency Converter - Real-time Exchange Rates',
            description: 'Convert between currencies with real-time exchange rates. Support for USD, KHR, EUR, GBP, and 20+ currencies.',
            robots: 'index, follow'
        }
    },
    {
        path: '/crypto-tracker-password',
        name: 'crypto-tracker-password',
        component: CryptoPassword,
        meta: {
            showNavBar: false,
            title: 'Crypto Tracker - Password Protected',
            description: 'Password protected access to cryptocurrency price tracker',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/crypto-tracker',
        name: 'crypto-tracker',
        component: CryptoPriceTracker,
        meta: {
            showNavBar: true,
            title: 'Crypto Price Tracker - Real-time Cryptocurrency Prices',
            description: 'Real-time cryptocurrency prices, market data, and tracking for Bitcoin, Ethereum, and 250+ cryptocurrencies.',
            robots: 'noindex, nofollow',
            requiresCryptoAuth: true
        }
    },
    {
        path: '/planet-explorer',
        name: 'planet-explorer',
        component: PlanetExplorer,
        meta: {
            showNavBar: true,
            title: 'Planet Explorer - Explore Our Solar System',
            description: 'Explore planets in our solar system with detailed information, real-time positions, and interactive visualizations.',
            robots: 'index, follow'
        }
    },
    {
        path: '/moon-phase',
        name: 'moon-phase',
        component: MoonPhase,
        meta: {
            showNavBar: true,
            title: 'Moon Phase Tracker - Lunar Calendar & Phases',
            description: 'Track moon phases, view lunar calendar, moonrise and moonset times, and upcoming full moon dates.',
            robots: 'index, follow'
        }
    },
    {
        path: '/iss-tracker',
        name: 'iss-tracker',
        component: ISSTracker,
        meta: {
            showNavBar: true,
            title: 'ISS Tracker - International Space Station Live Position',
            description: 'Track the International Space Station in real-time. See current position, orbit path, and when ISS is visible from your location.',
            robots: 'index, follow'
        }
    },
    {
        path: '/space-events',
        name: 'space-events',
        component: SpaceEvents,
        meta: {
            showNavBar: true,
            title: 'Space Events Calendar - Meteor Showers, Eclipses & More',
            description: 'Upcoming space events including meteor showers, eclipses, planetary alignments, rocket launches, and astronomical phenomena.',
            robots: 'index, follow'
        }
    },
    {
        path: '/space-events/:id',
        name: 'space-event-detail',
        component: SpaceEventDetail,
        meta: {
            showNavBar: true,
            title: 'Space Event Details',
            description: 'Detailed information about space events',
            robots: 'index, follow'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            showNavBar: true,
            title: 'Login',
            description: 'Login to access the admin dashboard',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            showNavBar: false,
            title: 'Dashboard',
            description: 'Admin dashboard',
            robots: 'noindex, nofollow',
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Function to validate token
const validateToken = async () => {
    try {
        // Make a request to verify token validity using your /me endpoint
        const response = await api.get('/me')
        return response.data.status === true
    } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem('token')
        return false
    }
}

// Function to check crypto tracker authentication
const checkCryptoAuth = () => {
    return sessionStorage.getItem('crypto_tracker_auth') === 'true'
}

// Navigation guard for authentication and title updates
router.beforeEach(async (to, from, next) => {
    // Update page title
    document.title = to.meta.title || 'Ngoytry Lyhuor'
    
    // Check crypto tracker authentication
    if (to.meta.requiresCryptoAuth) {
        const isCryptoAuthenticated = checkCryptoAuth()
        if (!isCryptoAuthenticated) {
            // Not authenticated, redirect to password page
            next({ name: 'crypto-tracker-password' })
            return
        }
    }
    
    // Check authentication
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth) {
        if (!token) {
            // No token, redirect to login
            next({ name: 'Login' })
        } else {
            // Token exists, validate it
            const isValid = await validateToken()
            if (isValid) {
                next()
            } else {
                // Token is invalid, redirect to login
                next({ name: 'Login' })
            }
        }
    } else if (to.name === 'Login' && token) {
        // Check if token is still valid before redirecting to dashboard
        const isValid = await validateToken()
        if (isValid) {
            next({ name: 'Dashboard' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router