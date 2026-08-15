import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment file based on ENV
dotenv.config({
  path: `src/env/.env.${process.env.ENV}`
});

export default defineConfig({
  testDir: './tests',

  // Run test files in parallel
  fullyParallel: true,

  // Fail CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Use fewer workers in CI for stability
  workers: process.env.CI ? 2 : undefined,

  // Reports
  reporter: [
  ['html'],
  [
    'allure-playwright',
    {
      resultsDir: 'allure-results',
      detail:true
    }
  ]
],

  use: {
    // URL from .env.UAT / .env.QA etc.
    baseURL: process.env.URL,

    // Headed locally, headless on CI
    headless: true,

    // Capture trace on retry
    trace: 'on-first-retry',

    // Screenshot when test fails
    screenshot: 'only-on-failure',

    // Video when test fails
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});