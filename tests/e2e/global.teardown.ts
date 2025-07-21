import { test as teardown } from '@playwright/test';

teardown('placeholder teardown', async ({ }) => {
  console.log('Running placeholder teardown');
});