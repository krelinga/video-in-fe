import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests to prevent running multiple test containers at once. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Set timeout for the entire test suite to accommodate container setup */
  timeout: 10 * 60 * 1000, // 10 minutes per test
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Configure browser to use dark mode */
    colorScheme: 'dark',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global_setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'global_teardown',
    },
    {
      name: 'global_teardown',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'desktop_chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['global_setup'],
    },
    {
      name: 'desktop_safari',
      use: { browserName: 'webkit' },
      dependencies: ['global_setup'],
    },
    {
      name: 'mobile_safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 15 Plus'],
      },
      dependencies: ['global_setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});