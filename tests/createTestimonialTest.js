import http from 'k6/http';
import { URLS } from '../config/urls.js';   
import { createTestimonialRequest } from '../requests/createTestimonialRequest.js';
import { validateCreateTestimonialResponse } from '../validators/createTestimonialValidator.js';
import { loginRequest } from '../requests/authRequest.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';

export const options = { 
    vus:TEST_CONFIG.vus,
    duration:TEST_CONFIG.duration,
    thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.95'],
  },
};

export default function createTestimonial(){
    const response = createTestimonialRequest(PAYLOADS.createTestimonial)
    //const response = http.post(URLS.createTestimonial, JSON.stringify(createTestimonialsRequestPayload), {
    //    headers: {
    //        'Content-Type': 'application/json',
    //    },
   // });
    validateCreateTestimonialResponse(response);


}
