import { loginRequest } from '../requests/authRequest.js';
import { createTestimonialRequest } from '../requests/createTestimonialRequest.js';
import { validateCreateTestimonialResponse } from '../validators/createTestimonialValidator.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { sleep } from 'k6';

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.95'],
    },
};

export default function createTestimonialTest(){

    
    const loginResponse = loginRequest(PAYLOADS.login);
    const token = loginResponse.json().data.token;

    const response = createTestimonialRequest(PAYLOADS.createTestimonial,token);


    validateCreateTestimonialResponse(response);

    sleep(TEST_CONFIG.sleepTime);
};