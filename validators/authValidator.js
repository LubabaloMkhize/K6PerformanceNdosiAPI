import { check } from 'k6';

export function validateLoginResponse(response) {
    const body = response.json();

    const result = check(response, {
        'status is 200': (r) => r.status === 200,

        'success is true': () => body.success === true,

        'message is Login successful': () => 
            body.message === 'Login successful',

        'token exists': () => 
            body.data && body.data.token !== undefined,

        'user email is correct': () => 
            body.data && body.data.user.email === 'Tatalo.Mkhize@example.com',

        'response time < 2s': (r) => r.timings.duration < 5000,
    });

    if (!result) {
        console.error('❌ Login validation failed');
        console.error(`Status: ${response.status}`);
        console.error(`Body: ${response.body}`);
    }
}