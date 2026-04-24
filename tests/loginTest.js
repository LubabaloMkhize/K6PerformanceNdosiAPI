import http from 'k6/http';
import { loginRequest } from '../requests/authRequest.js';
import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';
import {validateLoginResponse} from  '../validators/authValidator.js';

export const options = { 
    vus:TEST_CONFIG.vus,
    duration:TEST_CONFIG.duration,
};

export default function loginTest(){
    const response = loginRequest(PAYLOADS.login);

    validateLoginResponse(response);
    sleep(TEST_CONFIG.sleepTime);
}