#!/bin/bash
# SessionStart hook — makes graphify's codebase knowledge graph available in
# every Claude Code on the web session for this repo:
#   1. installs the graphifyy package (if missing)
#   2. installs the /graphify skill into the session's Claude config
#   3. (re)builds the graph in graphify-out/ from the current code
set -euo pipefail

# Only run in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Idempotent: only pip-install if the module isn't importable yet.
if ! python3 -c "import graphify" >/dev/null 2>&1; then
  pip install --quiet graphifyy
fi

# Install the /graphify skill into ~/.claude (per-container, so re-run each session).
python3 -m graphify install --platform claude

# Rebuild the code knowledge graph (fast, no LLM needed).
python3 -m graphify update .
