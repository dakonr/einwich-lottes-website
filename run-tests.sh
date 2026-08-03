#!/usr/bin/env bash
# run-tests.sh - Local test runner for performance & accessibility
# Usage: ./run-tests.sh [a11y|lighthouse|all]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

SERVER_PID=""
PORT=3000

cleanup() {
  if [[ -n "$SERVER_PID" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    echo "🛑 Stopped HTTP server (PID: $SERVER_PID)"
  fi
}

trap cleanup EXIT INT TERM

start_server() {
  echo "🚀 Starting HTTP server on port $PORT..."
  python3 -m http.server "$PORT" > /dev/null 2>&1 &
  SERVER_PID=$!
  echo "   Server PID: $SERVER_PID"

  # Wait for server to be ready
  for i in {1..10}; do
    if curl -s "http://localhost:$PORT/" > /dev/null; then
      echo "✅ Server ready at http://localhost:$PORT"
      return 0
    fi
    sleep 0.5
  done
  echo "❌ Server failed to start" >&2
  exit 1
}

run_a11y() {
  echo ""
  echo "♿ Running accessibility audit (Playwright + axe-core)..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  npx playwright test
  echo "✅ Accessibility audit passed"
}

run_lighthouse() {
  echo ""
  echo "⚡ Running performance audit (Lighthouse CI)..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  npx lhci autorun
  echo "✅ Performance audit passed"
}

show_usage() {
  cat <<EOF
Usage: $0 [COMMAND]

Commands:
  a11y        Run accessibility audit only (Playwright + axe-core)
  lighthouse  Run performance audit only (Lighthouse CI)
  all         Run both audits (default)

Examples:
  $0              # Run both audits
  $0 a11y         # Accessibility only
  $0 lighthouse   # Performance only

Requirements:
  - Node.js >= 18
  - npm install (run once)
  - python3 (for HTTP server)
EOF
}

main() {
  local cmd="${1:-all}"

  case "$cmd" in
    a11y|accessibility)
      start_server
      run_a11y
      ;;
    lighthouse|perf|performance)
      start_server
      run_lighthouse
      ;;
    all|both)
      start_server
      run_a11y
      run_lighthouse
      ;;
    -h|--help|help)
      show_usage
      exit 0
      ;;
    *)
      echo "❌ Unknown command: $cmd" >&2
      show_usage
      exit 1
      ;;
  esac
}

main "$@"