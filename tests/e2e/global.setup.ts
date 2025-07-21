import { test as setup } from '@playwright/test';
import { GenericContainer } from 'testcontainers';
import path from 'path';

setup('build frontend image', async ({ }) => {
    console.log('Building frontend image...');
    await GenericContainer.fromDockerfile(
      path.resolve(__dirname, '../../'),
      'Dockerfile'
    ).build('video-in-fe-test', { deleteOnExit: false});
});