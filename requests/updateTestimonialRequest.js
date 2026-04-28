import http from 'k6/http';
import { URLS } from '../config/urls.js';

export function updateTestimonialRequest(testimonialId, payload, token) {
    const url = `${URLS.testimonials}/${testimonialId}`;
    const body = JSON.stringify(payload);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    return http.put(url, body, { headers });
}
