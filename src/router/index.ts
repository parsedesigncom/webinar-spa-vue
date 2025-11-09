import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from "@/views/HomeView.vue"
/**
 * Route Definitions
 * RouteRecordRaw is a TypeScript type from vue-router that describes
 * RouteRecordRaw is a TypeScript type from vue-router that describes
 */

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        /**
         * Dynamic route for individual webinars via their slug
         * Example: /le-26-chiavi-per-mantenerci-in-armonia-2025-11-23-200000
         */
        path: '/:slug',
        name: 'webinar-by-slug',
        component: HomeView,
        /**
         * props: true ensures that the URL parameter "slug"
         * is passed as a prop to the component.
         * (Later we can use this prop in HomeView or a new WebinarView
         * to find the corresponding webinar.)
         */
        props: true,
    },
];

/**
 * Create Router
 * createWebHistory() enables "History Mode" (clean URLs without #).
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router