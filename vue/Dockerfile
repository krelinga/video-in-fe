# Multi-stage build for Vue.js application with Caddy

# Build stage
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application without environment variables
RUN npm run build

# Production stage with Caddy
FROM caddy:2-alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/caddy

# Copy Caddyfile for serving the Vue.js SPA
COPY Caddyfile /etc/caddy/Caddyfile

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Use custom entrypoint to generate config at runtime
ENTRYPOINT ["/entrypoint.sh"]