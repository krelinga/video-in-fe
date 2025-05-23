#! /usr/bin/bash
set -e

export NEXT_PUBLIC_IMG_URL_PREFIX="https://video-in-be.dev.i.krel.ing"
export NEXT_PUBLIC_BACKEND_URL="http://172.17.0.1:25004"
npm run dev
