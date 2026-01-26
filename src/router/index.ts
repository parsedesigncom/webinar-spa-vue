import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from "@/views/HomeView.vue"
import { useWebinarStore } from '@/stores/webinarStore';

async function fetchWebinarSlugById(id: string): Promise<string | null> {
    // Beispiel:
    // const res = await axios.get(`/api/webinars/${id}`);
    // return res.data?.slug ?? null;
    alert(id)

    return 'test-samani-2026-03-31-150000'; // <- TODO: implementieren
    //return null; // <- TODO: implementieren
}

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
        path: '/w/:id(\\d+)',
        name: 'webinar-by-id',
        component: { template: '' },

        beforeEnter: async (to) => {
            const store = useWebinarStore();
            const id = String(to.params.id);

            // Falls noch nicht geladen: laden
            // (hier reicht "wenn leer", weil du ansonsten immer wieder lädst)
            if (!store.config && Object.keys(store.webinars).length === 0) {
                await store.loadWebinarConfig();
            }

            const slug = store.getWebinarSlugById(id);

            if (!slug) {
                return { name: 'home' }; // oder not-found
            }

            return {
                name: 'webinar-by-slug',
                params: { slug },
                query: to.query,
                hash: to.hash,
                replace: true,
            };
        },
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
    }
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