// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'

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