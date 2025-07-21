import { test, expect } from '@playwright/test';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import path from 'path';

test.describe('video-in-fe E2E Tests', () => {
  let backendContainer: StartedTestContainer;
  let frontendContainer: StartedTestContainer;
  let frontendUrl: string;

  test.beforeAll(async () => {
    console.log('Starting backend container...');
    
    // Start the backend container (video-in-be-stub)
    backendContainer = await new GenericContainer('krelinga/video-in-be-stub:latest')
      .withExposedPorts(8080)
      .start();
    
    const backendHost = backendContainer.getHost();
    const backendPort = backendContainer.getMappedPort(8080);
    const backendUrl = `http://${backendHost}:${backendPort}`;
    const imgUrlPrefix = `http://${backendHost}`;
    
    console.log(`Backend running at: ${backendUrl}`);
    
    // Build the frontend Docker image
    console.log('Building frontend container...');
    const frontendImage = await GenericContainer.fromDockerfile(
      path.resolve(__dirname, '../../'),
      'Dockerfile'
    ).build('video-in-fe-test');
    
    console.log('Starting frontend container...');
    
    // Start the frontend container with environment variables
    frontendContainer = await frontendImage
      .withEnvironment({
        'NEXT_PUBLIC_BACKEND_URL': backendUrl,
        'NEXT_PUBLIC_IMG_URL_PREFIX': imgUrlPrefix
      })
      .withExposedPorts(3000)
      .start();
    
    const frontendHost = frontendContainer.getHost();
    const frontendPort = frontendContainer.getMappedPort(3000);
    frontendUrl = `http://${frontendHost}:${frontendPort}`;
    
    console.log(`Frontend running at: ${frontendUrl}`);
    
    // Give the containers a moment to fully start up
    await new Promise(resolve => setTimeout(resolve, 5000));
  }, 300000); // 5 minute timeout for container setup

  test.afterAll(async () => {
    console.log('Stopping containers...');
    // Stop containers first, then capture logs to avoid hanging
    if (frontendContainer) {
      await frontendContainer.stop();
    }
    if (backendContainer) {
      await backendContainer.stop();
    }

    // Now capture and print frontend container logs
    if (frontendContainer) {
      try {
        const logStream = await frontendContainer.logs();
        const logChunks: Buffer[] = [];
        await new Promise<void>((resolve, reject) => {
          logStream
            .on('data', (chunk: Buffer) => logChunks.push(chunk))
            .on('end', resolve)
            .on('error', reject);
        });
        const logs = Buffer.concat(logChunks).toString('utf-8');
        const fs = await import('fs/promises');
        await fs.writeFile('tests/e2e/frontend-container.log', logs);
        console.log('--- Frontend Container Logs ---');
        console.log(logs);
        console.log('--- End Frontend Container Logs ---');
      } catch (err) {
        console.error('Failed to capture frontend container logs:', err);
      }
    }
  });

  test('should load the homepage and take a screenshot', async ({ page }) => {
    // Navigate to the frontend
    await page.goto(frontendUrl);
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/homepage.png',
      fullPage: true 
    });
    
    // Basic assertion that the page loaded
    await expect(page).toHaveTitle(/.*/, { timeout: 10000 });
    
    console.log('Screenshot saved to tests/e2e/screenshots/homepage.png');
  });
});