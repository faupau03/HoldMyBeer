import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ResetPassword from './views/ResetPassword.vue'

// All paths for the app
const routes = [
    { path: '/', redirect: '/app' },
    { path: '/app', component: Home },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/reset-password', component: ResetPassword },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

// Create the router
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router