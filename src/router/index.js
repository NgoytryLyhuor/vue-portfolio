import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/ProjectView.vue'
import About from '../views/About.vue'
import Business from '../views/Business.vue'
import NotFound from '../views/NotFound.vue'
import TroPang from '../views/TroPang.vue'
import ExpenseTracker from '../views/projects/ExpenseTracker.vue'
import WeatherApp from '@/views/projects/WeatherApp.vue'
import CurrencyExchange from '@/views/projects/CurrencyExchange.vue'
import AirQuality from '@/views/projects/AirQuality.vue'
import Login from '@/views/auth/LoginView.vue'
import Dashboard from '@/views/auth/DashboardView.vue'

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
        path: '/business',
        name: 'Business',
        component: Business,
        meta: {
            showNavBar: true,
            title: 'Business'
        }
    },
    {
        path: '/tropang',
        name: 'tropang',
        component: TroPang,
        meta: {
            showNavBar: true,
            title: 'Selling TroPang'
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

// Navigation guard for authentication and title updates
router.beforeEach((to, from, next) => {
    // Update page title
    document.title = to.meta.title || 'Ngoytry Lyhuor'
    
    // Check authentication
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !token) {
        // Redirect to login if route requires auth but no token exists
        next({ name: 'Login' })
    } else if (to.name === 'Login' && token) {
        // Redirect to dashboard if already logged in and trying to access login
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})

export default router