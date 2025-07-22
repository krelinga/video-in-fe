#!/bin/bash

# Post-create command for dev container setup
# This script installs npm dependencies and Playwright

set -e

echo "Installing npm dependencies..."
npm install

echo "Installing Playwright..."
npx playwright install

echo "Installing Playwright system dependencies..."
npx playwright install-deps

echo "Dev container setup complete!"