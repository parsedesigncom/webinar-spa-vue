import { API_CONFIG } from '@/config';


export type WebinarConfigResponse = {
    response: {
        config: {
            pdlpf_option_webinar_application_startpage: number | null;
        };
        [id: string]: any;
    };
};

export async function fetchWebinarConfig(): Promise<WebinarConfigResponse> {
    const res = await fetch(API_CONFIG.webinarConfigUrl);

    if (!res.ok) {
        throw new Error(`Error loading webinar config: ${res.status}`);
    }

    return res.json();
}