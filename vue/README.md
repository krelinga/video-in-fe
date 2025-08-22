# .

# Vue.js Application

This directory contains a Vue.js application with TypeScript and Vite, created as requested in the project setup.

## Features

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** as development server and build tool
- **Vue Router** for client-side routing
- **Pinia** for state management
- **ESLint** and **Prettier** for code quality
- **Vitest** for unit testing
- **Playwright** for end-to-end testing
- **Docker** production deployment with **Caddy** web server

## Development

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

3. Build for production:
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run type-check` - Type check with TypeScript
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier

## Environment Variables

The application supports passing environment variables from the server to the client using a runtime configuration approach that allows changing values without rebuilding the Docker image.

### Setup

#### Development

Pass them directly when starting the dev server:
   ```bash
   FOO_VAR="your-development-value" npm run dev
   ```

#### Production (Docker)

Environment variables are passed at **runtime** using Docker's `-e` flag, allowing you to change values without rebuilding the image:

1. Using the provided script:
   ```bash
   FOO_VAR="your-production-value" bash run-docker.sh
   ```

2. Using Docker directly:
   ```bash
   # Build once
   docker build -t vue-app:latest .
   
   # Run with different environment variables as needed
   docker run -p 8080:80 -e FOO_VAR="production-value" vue-app:latest
   docker run -p 8080:80 -e FOO_VAR="staging-value" vue-app:latest
   ```

### How It Works

- **Development**: Uses a script that runs as part of `npm dev` to write a `envVars.js` file under `/public`.
- **Production**: Uses an init script that generates th `envVars.js` file at container startup with runtime environment variables

In either case, the `index.html` file references `envVars.js`.

### Usage in Code

Access environment variables in your Vue components:

```typescript
// In a Vue component - works in both development and production
const fooVar = window.envVars?.FOO_VAR
```

### Example

The application includes an `EnvironmentDisplay` component that demonstrates this functionality by showing the value of `FOO_VAR`.

## Docker Deployment

The application includes a production-ready Docker setup using Caddy as the web server.

### Building the Docker Image

```bash
docker build -t vue-app:latest .
```

### Running the Docker Container

```bash
docker run -p 8080:80 vue-app:latest
```

The application will be available at http://localhost:8080

### Docker Features

- **Multi-stage build** for optimized image size
- **Caddy** web server for production serving
- **Gzip compression** enabled
- **SPA routing** support (history mode)
- **Security headers** configured
- **Static asset caching** optimized

## Project Structure

```
vue/
├── src/
│   ├── components/     # Vue components
│   ├── views/          # Vue pages
│   ├── stores/         # Pinia stores
│   ├── router/         # Vue Router configuration
│   └── assets/         # Static assets
├── public/             # Public assets
├── e2e/               # End-to-end tests
├── Dockerfile         # Docker configuration
├── Caddyfile          # Caddy web server configuration
└── vite.config.ts     # Vite configuration
```

## Configuration

- **Vite config**: `vite.config.ts`
- **TypeScript config**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint config**: `eslint.config.ts`
- **Prettier config**: `.prettierrc.json`
- **Playwright config**: `playwright.config.ts`
- **Vitest config**: `vitest.config.ts`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
