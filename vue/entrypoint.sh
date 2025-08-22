#!/bin/sh

if ! /writeEnvVars.sh /usr/share/caddy/envVars.js; then
  echo "Error: /writeEnvVars.sh failed." >&2
  exit 1
fi

# Start Caddy
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile