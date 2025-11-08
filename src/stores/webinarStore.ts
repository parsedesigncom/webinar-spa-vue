import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchWebinarConfig, type WebinarConfigResponse } from '@/services/webinarApi';

export const useWebinarStore = defineStore('webinar', () => {
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // aus der API
    const config = ref<WebinarConfigResponse['response']['config'] | null>(null);
    const webinars = ref<Record<string, any>>({});

    const startWebinarId = computed(() =>
        config.value?.pdlpf_option_webinar_application_startpage ?? null,
    );

    const startWebinar = computed(() => {
        // 1. If a start page is set in the config and we know this webinar → take it
        if (startWebinarId.value && webinars.value[startWebinarId.value]) {
            return webinars.value[startWebinarId.value];
        }

        // 2. Else fallback: first upcoming webinar
        return upcomingWebinars.value[0] ?? null;
    });


    const upcomingWebinars = computed(() => {
        const now = new Date();

        return Object.values(webinars.value)
            .map(webinar => ({
                webinar,
                date: getWebinarDate(webinar),
            }))
            .filter(item => item.date && item.date >= now)
            .sort((a, b) => a.date!.getTime() - b.date!.getTime())
            .map(item => item.webinar);
    });


    function getWebinarDate(webinar: any): Date | null {
        const raw = webinar.pdlpfw_webinar_date;
        if (!raw) return null;

        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    }


    async function loadWebinarConfig() {
        isLoading.value = true;
        error.value = null;

        try {
            const data = await fetchWebinarConfig();

            // config part
            config.value = data.response.config;

            // store remaining keys as webinars
            const { config: _cfg, ...rest } = data.response;
            webinars.value = rest;
        } catch (e: any) {
            error.value = e?.message ?? 'Error loading webinar config';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        error,
        config,
        webinars,
        startWebinarId,
        startWebinar,
        upcomingWebinars,
        loadWebinarConfig,
    };

});
