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
const KhmerAlphabet = () => import('@/views/projects/KhmerAlphabet.vue')
const KhmerGames = () => import('@/views/projects/KhmerGames.vue')
const KhmerStories = () => import('@/views/projects/KhmerStories.vue')
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
        path: '/khmer-alphabet',
        name: 'khmer-alphabet',
        component: KhmerAlphabet,
        meta: {
            showNavBar: true,
            title: 'Khmer Alphabet Learning - Learn Khmer Letters',
            description: 'Interactive Khmer alphabet learning tool for children. Learn consonants, vowels, pronunciation, and practice writing.',
            robots: 'index, follow'
        }
    },
    {
        path: '/khmer-games',
        name: 'khmer-games',
        component: KhmerGames,
        meta: {
            showNavBar: true,
            title: 'Khmer Learning Games - Educational Games for Kids',
            description: 'Fun and educational Khmer learning games including word matching, memory games, and vocabulary quizzes for children.',
            robots: 'index, follow'
        }
    },
    {
        path: '/khmer-stories',
        name: 'khmer-stories',
        component: KhmerStories,
        meta: {
            showNavBar: true,
            title: 'Khmer Stories Library - Traditional Tales for Children',
            description: 'Collection of traditional Khmer stories, folktales, and moral stories for children. Read and learn about Khmer culture.',
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

// Navigation guard for authentication and title updates
router.beforeEach(async (to, from, next) => {
    // Update page title
    document.title = to.meta.title || 'Ngoytry Lyhuor'
    
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