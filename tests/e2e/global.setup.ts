import { test as setup } from '@playwright/test';
import { GenericContainer } from 'testcontainers';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

setup('build frontend image', async ({ }) => {
    const uniqueId = uuidv4();
    const imageName = `video-in-fe-test-${uniqueId}`;
    process.env.VIDEO_IN_FE_IMAGE = imageName;
    console.log(`Building frontend image ${imageName} ...`);
    await GenericContainer.fromDockerfile(
      path.resolve(__dirname, '../../'),
      'Dockerfile'
    ).build(imageName, { deleteOnExit: false });
});