#!/bin/bash
# Arcanea Ecosystem - Clone missing repositories from the registry
# Usage: ./scripts/clone-all.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ECOSYSTEM_DIR="$(dirname "$SCRIPT_DIR")"
REPOS_FILE="$ECOSYSTEM_DIR/repos.json"

if ! command -v jq &> /dev/null; then
  echo "jq is required but not installed."
  exit 1
fi

echo "Arcanea Ecosystem Clone"
echo "======================="
echo ""

clone_repo() {
  local name=$1
  local url=$2
  local pathValue=$3

  if [ "$pathValue" = ".." ]; then
    echo "skip  $name  -> platform root already present"
    return
  fi

  local targetDir
  targetDir="$(cd "$ECOSYSTEM_DIR" && cd "$(dirname "$pathValue")" 2>/dev/null || pwd)/$(basename "$pathValue")"

  if [ -d "$targetDir/.git" ]; then
    echo "keep  $name  -> $pathValue"
    return
  fi

  echo "clone $name  -> $pathValue"
  mkdir -p "$(dirname "$targetDir")"
  git clone "$url" "$targetDir"
}

jq -r '
  .repositories
  | to_entries[]
  | .key as $group
  | .value[]
  | "\($group)|\(.name)|\(.url)|\(.path)"
' "$REPOS_FILE" | while IFS='|' read -r group name url pathValue; do
  clone_repo "$name" "$url" "$pathValue"
done

echo ""
echo "Done. Run node ./scripts/status-all.mjs next."
