// Vue Router configuration - Portfolio routes
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/ProjectView.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import ExpenseTracker from '../views/projects/ExpenseTracker.vue'
import WeatherApp from '@/views/projects/WeatherApp.vue'
import CurrencyExchange from '@/views/projects/CurrencyExchange.vue'
import AirQuality from '@/views/projects/AirQuality.vue'
import IpLookup from '@/views/projects/IpLookup.vue'
import GithubStats from '@/views/projects/GithubStats.vue'
import Login from '@/views/auth/LoginView.vue'
import Dashboard from '@/views/auth/DashboardView.vue'
import api from '@/service/api'

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
            title: 'Ngoytry Lyhuor'
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
            showNavBar: true,
            title: 'Projects'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            showNavBar: true,
            title: 'About Me'
        }
    },
    {
        path: '/expense-tracker',
        name: 'expense-tracker',
        component: ExpenseTracker,
        meta: {
            showNavBar: true,
            title: 'Expense Tracker'
        }
    },
    {
        path: '/weather-app',
        name: 'weather-app',
        component: WeatherApp,
        meta: {
            showNavBar: true,
            title: 'Weather App'
        }
    },
    {
        path: '/currency-exchange',
        name: 'currency-exchange',
        component: CurrencyExchange,
        meta: {
            showNavBar: true,
            title: 'Currency Exchange'
        }
    },
    {
        path: '/air-quality',
        name: 'air-quality',
        component: AirQuality,
        meta: {
            showNavBar: true,
            title: 'Air Quality'
        }
    },
    {
        path: '/ip-lookup',
        name: 'ip-lookup',
        component: IpLookup,
        meta: {
            showNavBar: true,
            title: 'IP Address Lookup'
        }
    },
    {
        path: '/github-stats',
        name: 'github-stats',
        component: GithubStats,
        meta: {
            showNavBar: true,
            title: 'GitHub Stats'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            showNavBar: true,
            title: 'Login'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            showNavBar: false,
            title: 'Dashboard',
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