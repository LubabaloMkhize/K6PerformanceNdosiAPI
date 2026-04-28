import http from 'k6/http';
import { URLS } from '../config/urls.js';

export function createTestimonialRequest(payload, token) {
    const url = URLS.testimonials; 
    const body = JSON.stringify(payload);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    return http.post(url, body, { headers });
}