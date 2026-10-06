#!/usr/bin/env bash
# Elaris Theme - Shell / Bash Demo
# Demonstrates variables, conditionals, functions, loops, and exits.

set -euo pipefail

THEME_IDENTIFIER="Elaris"
OUTPUT_DIR="./out"

echo_info() {
  local msg="$1"
  printf "\033[38;2;91;75;219m[%s]\033[0m %s\n" "${THEME_IDENTIFIER}" "${msg}"
}

echo_alert() {
  local err="$1"
  printf "\033[38;2;201;54;69m[ALERT]\033[0m %s\n" "${err}" >&2
}

verify_theme_artifacts() {
  echo_info "Validating daylight theme assets..."

  if [[ ! -f "themes/elaris-color-theme.json" ]]; then
    echo_alert "Missing primary theme JSON file!"
    exit 1
  fi

  echo_info "Theme integrity verified successfully."
}

verify_theme_artifacts
