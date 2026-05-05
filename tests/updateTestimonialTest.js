import { sleep } from 'k6';
import { loginRequest } from '../requests/authRequest.js';
import { createTestimonialRequest } from '../requests/createTestimonialRequest.js';
import { updateTestimonialRequest } from '../requests/updateTestimonialRequest.js';
import { validateUpdateTestimonialResponse } from '../validators/updateTestimonialValidator.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.95'],
        http_req_duration: ['p(95)<5000'],
    },
};

export default function updateTestimonialTest() {

    
    const loginResponse = loginRequest(PAYLOADS.login);
    const token = loginResponse.json().data.token;

    
    const createResponse = createTestimonialRequest(
        PAYLOADS.createTestimonial,
        token
    );

    const testimonialId = createResponse.json().data.Id;

   
    const updateResponse = updateTestimonialRequest(
        testimonialId,
        PAYLOADS.updateTestimonial,
        token
    );

    
    validateUpdateTestimonialResponse(updateResponse);

    sleep(TEST_CONFIG.sleepTime);
}