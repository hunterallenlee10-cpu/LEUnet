#!/usr/bin/env bash
# Blocks commits that contain Stripe API keys or webhook signing secrets.
#
# Enable once per clone:
#   git config core.hooksPath .githooks
#
# Run manually against the whole tree:
#   ./scripts/check-secrets.sh --all

set -uo pipefail

# sk_live / rk_live are live keys. sk_test / rk_test are test keys — still never
# belong in source. whsec_ is a webhook signing secret.
PATTERN='(sk|rk)_(live|test)_[A-Za-z0-9]{16,}|whsec_[A-Za-z0-9]{16,}'

if [ "${1:-}" = "--all" ]; then
  matches=$(git grep -nIE "$PATTERN" -- \
    ':!scripts/check-secrets.sh' ':!.env.example' ':!docs/STRIPE.md' 2>/dev/null)
else
  files=$(git diff --cached --name-only --diff-filter=ACM)
  [ -z "$files" ] && exit 0

  matches=""
  while IFS= read -r file; do
    case "$file" in
      scripts/check-secrets.sh|.env.example|docs/STRIPE.md) continue ;;
    esac
    [ -f "$file" ] || continue
    hit=$(git diff --cached -U0 -- "$file" | grep -E "^\+" | grep -EI "$PATTERN" || true)
    if [ -n "$hit" ]; then
      matches="${matches}${file}:\n${hit}\n"
    fi
  done <<< "$files"
fi

if [ -n "$matches" ]; then
  echo "ERROR: a Stripe key or webhook secret appears in your staged changes."
  echo ""
  printf '%b' "$matches"
  echo ""
  echo "Move it to an environment variable. If this key was ever committed or"
  echo "pushed, roll it now at https://dashboard.stripe.com/apikeys"
  exit 1
fi

exit 0
