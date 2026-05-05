import { check } from 'k6';


export function validateLoginResponse(response) {
    const body = response.json();

    const result = check(response, {
        'status is 200': (r) => r.status === 200,
        'success is true': () => body?.success === true,
        'message is Login successful': () =>
            body?.message === 'Login successful',
        'token exists': () => !!body?.data?.token,
        'user email is correct': () =>
            body?.data?.user?.email?.toLowerCase() ===
            'tatalo.mkhize@example.com'.toLowerCase(),
    });

    if (!result) {
        console.error('❌ Login functional validation failed');
        console.error(`Status: ${response.status}`);
        console.error(`Body: ${response.body}`);
    }
}
