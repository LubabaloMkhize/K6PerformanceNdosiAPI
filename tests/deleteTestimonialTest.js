import { sleep } from 'k6';
import { loginRequest } from '../requests/authRequest.js';
import { createTestimonialRequest } from '../requests/createTestimonialRequest.js';
import { deleteTestimonialRequest } from '../requests/deleteTestimonialRequest.js';
import { validateDeleteTestimonialResponse } from '../validators/deleteTestimonialValidator.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.95'],
        http_req_duration: ['p(95)<9000'],
    },
};

export default function deleteTestimonialTest() {

    
    const loginResponse = loginRequest(PAYLOADS.login);
    const token = loginResponse.json().data.token;

    
    const createResponse = createTestimonialRequest(
        PAYLOADS.createTestimonial,
        token
    );

    const testimonialId = createResponse.json().data.Id;

    
    const deleteResponse = deleteTestimonialRequest(
        testimonialId,
        token
    );

   
    validateDeleteTestimonialResponse(deleteResponse);

    sleep(TEST_CONFIG.sleepTime);
}
export function handleSummary(data) {
  return {
    "k6-results/DeleteTestimonialreport.html": htmlReport(data),
  };
}