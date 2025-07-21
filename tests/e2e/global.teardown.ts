import { test as teardown } from '@playwright/test';
import { exec } from 'child_process';

teardown('delete frontend image', async ({ }) => {
  console.log('Deleting frontend image...');
  await new Promise<void>((resolve, reject) => {
    exec('docker image rm video-in-fe-test', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error deleting image: ${stderr}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
});