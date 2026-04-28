import { check } from 'k6';

export function validateCreateTestimonialResponse(response) {
    const body = response.json();

    const result = check(response, {
        'status is 200': (r) => r.status === 200,

        'success is true': () => body.success === true,

        'message is correct': () =>
            body.message === 'Testimonial created successfully',

        'testimonial id exists': () =>
            body.data && body.data.Id !== undefined,

        'isPublic is true (1)': () =>
            body.data && body.data.IsPublic === 1,

        'status is pending': () =>
            body.data && body.data.Status === 'pending',

        'created date exists': () =>
            body.data && body.data.CreatedAt !== undefined,

        'response time < 2s': (r) =>
            r.timings.duration < 2000,
    });

    if (!result) {
        console.error('Create Testimonial validation failed');
        console.error(`Status: ${response.status}`);
        console.error(`Body: ${response.body}`);
    }
}
