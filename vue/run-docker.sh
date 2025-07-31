#!/bin/bash

# Build and run Vue.js application with Docker

set -e

IMAGE_NAME="vue-app"
CONTAINER_NAME="vue-app-container"
PORT="8080"

# Get FOO_VAR from environment or use default
FOO_VAR="${FOO_VAR:-default-value}"

echo "Building Docker image with FOO_VAR=$FOO_VAR..."
docker build --build-arg FOO_VAR="$FOO_VAR" -t $IMAGE_NAME:latest .

echo "Stopping any existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "Starting container..."
docker run -d --name $CONTAINER_NAME -p $PORT:80 $IMAGE_NAME:latest

echo "Vue.js application is running at http://localhost:$PORT"
echo "To stop the container, run: docker stop $CONTAINER_NAME"