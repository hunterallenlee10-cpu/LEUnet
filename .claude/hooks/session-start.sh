#!/usr/bin/env bash
# SessionStart hook for Claude Code on the web.
#
# Remote sessions run in a fresh container each time, so anything documented as
# a "once per clone" step has to be redone here or it silently does not happen.
set -euo pipefail

# Local clones already have their own git identity and installed deps — only the
# throwaway web containers need this.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

# 1. Git identity.
#
# Web containers default to Claude <noreply@anthropic.com>. Vercel refuses to
# build a private-repo commit whose author is not a project member, and the
# Hobby plan cannot add members, so every commit authored that way blocks its
# own deployment. Author as the repo owner instead; the Co-Authored-By trailer
# in the commit message still records that Claude wrote the code.
#
# Only replaces the Anthropic default, so a real contributor's identity in a
# session of their own is left untouched.
current_email="$(git config user.email 2>/dev/null || echo "")"
if [ -z "$current_email" ] || [ "$current_email" = "noreply@anthropic.com" ]; then
  git config --local user.name "hunterallenlee10-cpu"
  git config --local user.email "hunterallenlee10@gmail.com"
fi

# 2. Stripe secret guard.
#
# .githooks/pre-commit runs scripts/check-secrets.sh to block commits carrying
# Stripe live/test keys, but core.hooksPath is per-clone and starts unset.
if [ -d .githooks ]; then
  git config --local core.hooksPath .githooks
fi

# 3. Dependencies, so `pnpm lint` and `pnpm build` work without a manual install.
# Plain `install` rather than `--frozen-lockfile` so the resolved store is reused
# when the container image is cached.
pnpm install
