// src/config.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_WEBINAR_CONFIG_ENDPOINT = import.meta.env.VITE_API_WEBINAR_CONFIG_ENDPOINT as string;

// Fallback / kleine Sicherheit
if (!API_BASE_URL) {
    console.warn('VITE_API_BASE_URL is not set!');
}

export const API_CONFIG = {
    baseUrl: API_BASE_URL,
    webinarConfigUrl: API_BASE_URL + API_WEBINAR_CONFIG_ENDPOINT,
};