#! /usr/bin/bash
set -e

export NEXT_PUBLIC_IMG_URL_PREFIX="http://localhost:25004"
export NEXT_PUBLIC_BACKEND_URL="http://host.docker.internal:25004"
docker build -t video-in-fe .
docker run --rm \
    --env NEXT_PUBLIC_IMG_URL_PREFIX \
    --env NEXT_PUBLIC_BACKEND_URL \
    -it -p 3000:3000 --name video-in-fe video-in-fe
