import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import PasswordReset from './views/PasswordReset.vue'
import ConfirmPasswordReset from './views/ConfirmPasswordReset.vue'

// All paths for the app
const routes = [
    { path: '/', redirect: '/app' },
    { path: '/app', component: Home },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/password-reset', component: PasswordReset },
    { path: '/confirm-password-reset', component: ConfirmPasswordReset },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

// Create the router
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router