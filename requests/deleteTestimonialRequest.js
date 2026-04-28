
import http from 'k6/http';
import { URLS } from '../config/urls.js';

export function deleteTestimonialRequest(testimonialId, token) {
    const url = `${URLS.testimonials}/${testimonialId}`;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    return http.del(url, null, { headers });
}
