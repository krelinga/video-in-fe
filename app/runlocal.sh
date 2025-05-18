#! /usr/bin/bash
set -e

export NEXT_PUBLIC_IMG_URL_PREFIX="http://localhost:25004"
export NEXT_PUBLIC_BACKEND_URL="http://host.docker.internal:25004"
npm run dev
