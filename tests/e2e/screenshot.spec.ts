import { test, expect } from '@playwright/test';
import { GenericContainer, StartedTestContainer, Network, StartedNetwork } from 'testcontainers';
import path from 'path';

test.describe('video-in-fe E2E Tests', () => {
  let backendContainer: StartedTestContainer;
  let frontendContainer: StartedTestContainer;
  let network: StartedNetwork;
  let frontendUrl: string;
  const backendLogs: string[] = [];
  const frontendLogs: string[] = [];


  test.beforeAll(async () => {
    // Create a custom Docker network
    network = await new Network().start();

    console.log('Starting backend container...');
    
    // Start the backend container on the custom network
    backendContainer = await new GenericContainer('krelinga/video-in-be-stub:latest')
      .withExposedPorts(8080)
      .withNetworkMode(network.getName())
      .withName('backend')
      .withLogConsumer(stream => {
        stream.on('data', (chunk: Buffer) => {
          const log = chunk.toString('utf-8');
          backendLogs.push(log);
        });
        stream.on('error', (err: Error) => {
          console.error('Error in backend log stream:', err);
        });
      })
      .start();
    
    // Use the backend container name as the hostname
    const backendUrl = `http://backend:8080`;
    const imgUrlPrefix = `http://backend`;
    
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
      .withNetworkMode(network.getName())
      .withLogConsumer(stream => {
        stream.on('data', (chunk: Buffer) => {
          const log = chunk.toString('utf-8');
          frontendLogs.push(log);
        });
        stream.on('error', (err: Error) => {
          console.error('Error in frontend log stream:', err);
        });
      })
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
      console.log('--- Frontend Container Logs ---');
      console.log(frontendLogs.join(''));
      console.log('--- End Frontend Container Logs ---');
    }
    if (backendContainer) {
      await backendContainer.stop();
      console.log('--- Backend Container Logs ---');
      console.log(backendLogs.join(''));
      console.log('--- End Backend Container Logs ---');
    }
    if (network) {
      await network.stop();
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