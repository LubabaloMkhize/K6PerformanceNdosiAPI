import { check } from 'k6';

export function validateDeleteTestimonialResponse(response) {
    let body = null;

    if (response.body) {
        try {
            body = response.json();
        } catch (e) {
            // some DELETE responses return no JSON body
        }
    }

    const result = check(response, {
        'status is 200 or 204': (r) =>
            r.status === 200 || r.status === 204,

        'success is true (if body exists)': () =>
            body ? body.success === true : true,

        'delete message is correct (if body exists)': () =>
            body && body.message
                ? body.message.toLowerCase().includes('deleted')
                : true,

        'response time < 2s': (r) =>
            r.timings.duration < 2000,
    });

    if (!result) {
        console.error('Delete Testimonial validation failed');
        console.error(`Status: ${response.status}`);
        console.error(`Body: ${response.body}`);
    }
}
