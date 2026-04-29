# Ndosi API K6 Performance Tests

A lightweight K6-based performance test suite for Ndosi API endpoints.

## Overview

This repository contains performance tests for the Ndosi API using K6. It covers:

- Login endpoint performance
- Profile endpoint performance
- Create testimonial flow
- Update testimonial flow
- Delete testimonial flow

The tests are organized with reusable request helpers, payload definitions, and response validators.

## Repository Structure

- `config/`
  - `constants.js` — test configuration and shared request headers
  - `urls.js` — API endpoint URLs
- `data/`
  - `payloads.js` — request payloads for login and testimonial actions
- `requests/`
  - API request functions for login, profile, and testimonial operations
- `validators/`
  - Response validation helpers for login and testimonial endpoints
- `tests/`
  - K6 scenario scripts: `loginTest.js`, `profileTest.js`, `createTestimonialTest.js`, `updateTestimonialTest.js`, `deleteTestimonialTest.js`
- `.github/workflows/`
  - GitHub Actions workflow for running the K6 tests and uploading results

## Prerequisites

- Install [k6](https://k6.io/docs/getting-started/installation/)
- Clone the repository

## Running Tests Locally

From the repository root, run a specific test with K6:

```bash
k6 run tests/loginTest.js
```

Or run another scenario:

```bash
k6 run tests/profileTest.js
k6 run tests/createTestimonialTest.js
k6 run tests/updateTestimonialTest.js
k6 run tests/deleteTestimonialTest.js
```

## GitHub Actions

The GitHub Actions workflow is defined in `.github/workflows/NdosiAPIK6Perfomance.yml`.
It runs performance tests, exports JSON results, generates web dashboard reports, and uploads artifacts.

## Configuration

- `config/urls.js` contains the target API endpoints.
- `config/constants.js` contains default K6 test settings:
  - `vus` — virtual users
  - `duration` — test duration
  - `sleepTime` — pause between iterations

If you want to run against a different environment, update `config/urls.js` or modify the workflow to pass a runtime base URL.

## Notes

- The login test is reused in several scenarios to obtain a Bearer token.
- Validator functions ensure expected response status, success state, and payload structure.
- The workflow currently saves results to `./k6-results/` and uploads them as build artifacts.

## Contact

Update the repository documentation as needed to match your actual environment and test parameters.
