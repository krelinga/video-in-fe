#!/bin/sh

# Generate config.js with runtime environment variables
cat > /usr/share/caddy/config.js << EOF
window.config = {
  FOO_VAR: "${FOO_VAR:-}"
};
EOF

# Start Caddy
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile