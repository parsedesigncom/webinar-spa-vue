import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import TrippelView from "../views/TrippelView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/trippel', name: 'trippel', component: TrippelView },
    ],
})

export default router