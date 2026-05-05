import http from 'k6/http';
import { URLS } from '../config/urls.js';
import {HEADERS} from '../config/constants.js';

export function createTestimonialRequest(payload, token) {
    const url = URLS.testimonials; 
    const body = JSON.stringify(payload);

    const headers = token ? {...HEADERS, Authorization: `Bearer ${token}`} : HEADERS;

    return http.post(url, body, { headers });
}