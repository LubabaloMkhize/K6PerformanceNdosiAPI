import http from 'k6/http';
import { getProfile} from '../requests/profileRequest.js';
import {validateLoginResponse} from  '../validators/authValidator.js';
import { loginRequest } from '../requests/authRequest.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';

export const options = { 
    vus:TEST_CONFIG.vus,
    duration:TEST_CONFIG.duration,
    thresholds: {
    http_req_duration: ['p(95)<9000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.95'],
  },
};

export default function(){
    const loginRequestPayload = loginRequest(PAYLOADS.login)
    validateLoginResponse(loginRequestPayload);

    const body = loginRequestPayload.json();
    const token = body.data.token;

    const response = getProfile(token)

    console.log(response.body)

}