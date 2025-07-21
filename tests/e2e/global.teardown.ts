import { test as teardown } from '@playwright/test';
import { exec } from 'child_process';

teardown('delete frontend image', async ({ }) => {
  const imageName = process.env.VIDEO_IN_FE_IMAGE;
  console.log(`Deleting frontend image ${imageName} ...`);
  await new Promise<void>((resolve, reject) => {
    exec(`docker image rm ${imageName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error deleting image: ${stderr}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
});