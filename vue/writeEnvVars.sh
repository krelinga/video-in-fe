#!/bin/sh

readonly out_path="$1"

if [[ -z "$out_path" ]]; then
    echo "Error: Output path not specified."
    exit 1
fi

cat <<EOF > "$out_path"
window.envVars = {
    FOO_VAR: "${FOO_VAR}"
}
EOF