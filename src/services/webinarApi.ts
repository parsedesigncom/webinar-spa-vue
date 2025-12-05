import { API_CONFIG } from '@/config';


export type WebinarConfigResponse = {
    response: {
        config: {
            pdlpf_option_webinar_application_startpage: number | null;
        };
        [id: string]: any;
    };
};

export type WebinarSubmissionData = {
    name: string;
    email: string;
    webinarDate?: string;
};

export async function submitWebinarForm(data: WebinarSubmissionData): Promise<any> {
    const url = API_CONFIG.webinarSubmitUrl;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Error sending form: ${res.status}`);
    }

    return res.json();
}

export async function fetchWebinarConfig(): Promise<WebinarConfigResponse> {
    const res = await fetch(API_CONFIG.webinarConfigUrl);

    if (!res.ok) {
        throw new Error(`Error loading webinar config: ${res.status}`);
    }

    return res.json();
}