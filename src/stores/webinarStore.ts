import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchWebinarConfig, type WebinarConfigResponse } from '@/services/webinarApi';

export type WebinarItem = {
    id?: number;
    slug?: string;
    post_name?: string;
    permalink?: string;
    pdlpfw_template_number?: string;
    pdlpfw_webinar_date?: string;
    [key: string]: any;
};

type WebinarMap = Record<string, WebinarItem>;


export const useWebinarStore = defineStore('webinar', () => {
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // aus der API
    const config = ref<WebinarConfigResponse['response']['config'] | null>(null);
    const webinars = ref<WebinarMap>({});


    /**
     * Start webinar ID from configuration (or null)
     */
    const startWebinarId = computed<number | null>(() =>
        config.value?.pdlpf_option_webinar_application_startpage ?? null,
    );

    /**
     * All webinars as array (helpful for loops)
     */
    const webinarsArray = computed<WebinarItem[]>(() => Object.values(webinars.value));

    /**
     * Read webinar date (pdlpfw_webinar_date)
     */
    function getWebinarDate(webinar: WebinarItem): Date | null {
        const raw = webinar.pdlpfw_webinar_date;
        if (!raw) return null;

        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    }

    /**
     * All upcoming webinars (sorted ascending by date)
     */
    const upcomingWebinars = computed<WebinarItem[]>(() => {
        const now = new Date();

        return webinarsArray.value
            .map(webinar => ({
                webinar,
                date: getWebinarDate(webinar),
            }))
            .filter(item => item.date && item.date >= now)
            .sort((a, b) => a.date!.getTime() - b.date!.getTime())
            .map(item => item.webinar);
    });


    /**
     * Start webinar:
     * 1. If set and available in the config → use this webinar
     * 2. Otherwise use first upcoming webinar
     */
    const startWebinar = computed<WebinarItem | null>(() => {
        const id = startWebinarId.value;

        if (id !== null) {
            const key = String(id); // JSON keys are strings
            if (webinars.value[key]) {
                return webinars.value[key];
            }
        }

        return upcomingWebinars.value[0] ?? null;
    });

    /**
     * Get a webinar's slug (for routes like /my-webinar-slug)
     */
    function getWebinarSlug(webinar: WebinarItem | null | undefined): string | null {
        if (!webinar) return null;

        if (typeof webinar.slug === 'string' && webinar.slug.length > 0) {
            return webinar.slug;
        }

        return null;
    }

    /**
     * Map: slug -> Webinar
     * Used to quickly resolve webinars by slug later in the router/view.
     */
    const webinarsBySlug = computed<Record<string, WebinarItem>>(() => {
        const map: Record<string, WebinarItem> = {};

        Object.values(webinars.value).forEach(webinar => {
            const slug = getWebinarSlug(webinar);
            if (slug) {
                map[slug] = webinar;
            }
        });

        return map;
    });

    /**
     * Slug of the start webinar (e.g. for canonical links, router etc.)
     */
    const startWebinarSlug = computed<string | null>(() =>
        getWebinarSlug(startWebinar.value),
    );

    /**
     * Get template number from a webinar.
     * Fallback: "w01" if nothing is set.
     */
    function getTemplateNumber(webinar: WebinarItem | null | undefined): string {
        const raw = webinar?.pdlpfw_template_number;
        if (typeof raw === 'string' && raw.trim() !== '') {
            return raw.trim();
        }

        // Default-Template
        return 'w01';
    }
    
     /**
     * Template number for the start webinar
     * -> later in View: switch/case "w01", "w02", ...
     */
    const startWebinarTemplateNumber = computed<string>(() =>
        getTemplateNumber(startWebinar.value),
    );

     /**
     * Resolve template number by slug.
     * Useful for the detail route /:slug.
     */
    function getTemplateNumberBySlug(slug: string): string | null {
        const webinar = getWebinarBySlug(slug);
        if (!webinar) return null;
        return getTemplateNumber(webinar);
    }

    /**
     * API call: Load config and webinars
     */
    async function loadWebinarConfig() {
        isLoading.value = true;
        error.value = null;

        try {
            const data = await fetchWebinarConfig();

            // Config-Teil
            config.value = data.response.config;

            // restliche Keys sind Webinare (ID -> Webinar-Objekt)
            const { config: _cfg, ...rest } = data.response;
            webinars.value = rest as WebinarMap;
        } catch (e: any) {
            error.value = e?.message ?? 'Error loading webinar config';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        // state
        isLoading,
        error,
        config,
        webinars,
        // Listen / Maps
        webinarsArray,
        webinarsBySlug,
        // Start-Webinar
        startWebinarId,
        startWebinar,
        startWebinarSlug,
        startWebinarTemplateNumber,
        // Derivate
        upcomingWebinars,
        // Helper
        getWebinarBySlug,
        getTemplateNumberBySlug,
        getTemplateNumber,
        // Actions
        loadWebinarConfig,
    };

});
