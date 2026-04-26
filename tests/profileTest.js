import http from 'k6/http';
import { getProfile} from '../requests/profileRequest.js';
import {validateLoginResponse} from  '../validators/authValidator.js';
import { loginRequest } from '../requests/authRequest.js';
import { TEST_CONFIG } from '../config/constants.js';
import { PAYLOADS } from '../data/payloads.js';

export const options = { 
    vus:TEST_CONFIG.vus,
    duration:TEST_CONFIG.duration,
};

export default function(){
    const loginRequestPayload = loginRequest(PAYLOADS.login)
    validateLoginResponse(loginRequestPayload);

    const body = loginRequestPayload.json();
    const token = body.data.token;

    const response = getProfile(token)

    console.log(response.body)

}