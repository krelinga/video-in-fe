# End-to-End Tests

This directory contains Playwright end-to-end tests for the video-in-fe application.

## Overview

The e2e tests use [Testcontainers](https://testcontainers.com/) to orchestrate the full application stack:

- **Backend**: Uses the `krelinga/video-in-be-stub:latest` Docker image from Docker Hub
- **Frontend**: Builds the frontend Docker image from the current repository

## Running Tests

```bash
npm run test:e2e
```

## Test Structure

### `screenshot.spec.ts`
- Starts the backend container (video-in-be-stub) on port 8080
- Builds and starts the frontend container with proper environment variables:
  - `NEXT_PUBLIC_BACKEND_URL`: Points to the backend container
  - `NEXT_PUBLIC_IMG_URL_PREFIX`: Base URL for image assets
- Takes a full-page screenshot of the homepage
- Saves screenshots to `tests/e2e/screenshots/`

## Requirements

- Docker must be available and running
- Node.js and npm
- Sufficient disk space for building Docker images

## Test Duration

Tests typically take 2-4 minutes to complete due to:
- Pulling the backend Docker image
- Building the frontend Docker image
- Starting both containers
- Page loading and screenshot capture

## Screenshots

Screenshots are saved to `tests/e2e/screenshots/` and are committed to the repository for visual regression testing.

## Extending Tests

To add more pages:
1. Add new test cases to the existing spec file
2. Use `page.goto()` to navigate to different routes
3. Take screenshots with descriptive names
4. Ensure proper cleanup in `afterAll()`