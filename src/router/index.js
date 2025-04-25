import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Business from '../views/Business.vue'
import NotFound from '../views/NotFound.vue'
import TroPang from '../views/TroPang.vue'

const routes = [
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
            title: 'About'
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
    // Add the 404 route as the last route
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '404 Not Found'
        }
    }
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