import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Business from '../views/Business.vue'
import NotFound from '../views/NotFound.vue'
import TroPang from '../views/TroPang.vue'
import ExpenseTracker from '../views/projects/ExpenseTracker.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '404 Not Found'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Ngoytry Lyhuor'
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
            title: 'Projects'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: 'About Me'
        }
    },
    {
        path: '/business',
        name: 'Business',
        component: Business,
        meta: {
            title: 'Business'
        }
    },
    {
        path: '/tropang',
        name: 'tropang',
        component: TroPang,
        meta: {
            title: 'Selling TroPang'
        }
    },
    {
        path: '/expense-tracker',
        name: 'expense-tracker',
        component: ExpenseTracker,
        meta: {
            title: 'Expense Tracker'
        }
    },
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// Add navigation guard to update title
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Ngoytry Lyhuor'
    next()
})

export default router